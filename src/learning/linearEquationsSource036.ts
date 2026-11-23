import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet, CheatSection } from "./cheatsheetContent";
interface Linear036Item extends QuestionGuidance { code:string; prompt:string; options:string[] }
interface Linear036Pack { id:string; title:string; minutes:number; source:string; sections:(GuideSection&{code:string})[]; examples:(WorkedExample&{code:string})[]; recall:{prompt:string;answer:string}[]; items:Linear036Item[]; sheet:CheatSection[] }
// Source036 companion teaching; application, publication and PDF-closure evidence remain separate.
export const linearEquationsSource036Pack:Linear036Pack = {
  "id": "tyt-mat-dogrusal-denklemler-kaynak-036",
  "title": "Birinci dereceden denklemler: eşitliği koru, modeli kur",
  "minutes": 150,
  "sections": [
    {
      "code": "S01",
      "title": "Eşittir işareti bir ilişki kurar",
      "paragraphs": [
        "3+4 bir sayısal ifade, 3+4=7 iki ifadenin aynı değeri verdiğini bildiren bir eşitliktir. x, değeri aranabilen bir değişken; 2x+3 ise x’e bağlı bir ifadedir. 2x+3 tek başına denklem değildir. 2x+3=11, içinde değişken bulunan bir eşitlik ve bu ünite için bir denklemdir. 2x, 2×x anlamına gelir; 2+x ile aynı değildir.",
        "Denklemi çözmek, x’i tahmin edip bırakmak değil, eşitliği doğru yapan bütün izinli değerleri bulmaktır. 2×4+3=11 olduğundan 4 bir köktür. x=3 denenirse sol 9, sağ 11 olur; 3 kök değildir. Aynı x değeri eşitliğin bütün x’lerine yazılır. = eşit, ≠ eşit değil, ℝ gerçek sayılar, ∅ boş küme, ÇK çözüm kümesi demektir."
      ]
    },
    {
      "code": "S02",
      "title": "Kök ile çözüm kümesini ayır",
      "paragraphs": [
        "Bir kök bir sayıdır; çözüm kümesi bütün köklerin kümesidir. x=4 ile ÇK={4} aynı tek çözümlü durumu iki farklı dille anlatır. {0}, yalnız 0 sayısını içerir; ∅ hiçbir sayı içermez. Bu ikisini aynı görmek, çözümlü bir denklemi çözümsüz sanmana yol açar.",
        "Başta sayı alanını oku. Bu ünitede aksi söylenmedikçe x gerçek sayıdır. Bilet adedi gibi bağlamlarda ayrıca tam sayı, pozitiflik veya 0≤x≤toplam koşulu gerekir. Cebirsel kök bu koşulu sağlamıyorsa problemde geçerli çözüm yoktur; kesirli insan sayısı veya 80,7. adım kabul edilmez."
      ]
    },
    {
      "code": "S03",
      "title": "Katsayı sıfır olduğunda tür değişir",
      "paragraphs": [
        "ax+b=0 biçiminde a ve b sabit gerçek sayılar, x değişkendir. a≠0 ise x’in katsayısına bölerek tek kök x=−b/a bulunur. a=0 olduğunda denklem artık birinci dereceden değildir. 0x=0 her gerçek sayıda doğru; 0x=7 her gerçek sayıda yanlıştır.",
        "Her denklemde hemen bölmeye başlama. Sadeleştirmeden sonra Ax=B biçiminde A≠0 ise bir kök; A=0 ve B=0 ise ℝ; A=0 ve B≠0 ise ∅ çıkar. Hem x’li terimlerin hem sabitlerin eşit olması, yalnız x=0 bulmak değil bütün x’lerin çalışmasıdır."
      ],
      "table": {
        "headers": [
          "Son durum",
          "Gerekçe",
          "ÇK"
        ],
        "rows": [
          [
            "5x=20",
            "5 sıfır değil, x=4",
            "{4}"
          ],
          [
            "0x=0",
            "Her x için 0=0",
            "ℝ"
          ],
          [
            "0x=7",
            "0 hiçbir x için 7 olmaz",
            "∅"
          ]
        ]
      }
    },
    {
      "code": "S04",
      "title": "İki tarafa aynı toplama veya çıkarma",
      "paragraphs": [
        "x+5=12’de +5 etkisini kaldırmak için eşitliğin iki tarafından da 5 çıkar: x+5−5=12−5, böylece x=7. İşlemi yalnız solda yaparsan iki taraf arasındaki eşitliği garanti edemezsin. “Karşıya geçince işaret değişti” cümlesinin arkasında bu iki taraflı işlem vardır.",
        "3x+5=20 için iki taraftan 5 çıkarınca 3x=15 olur. +5’in öbür tarafta −5 gibi görünmesi bir taşıma sihri değil, iki tarafa −5 eklemenin kısa yazımıdır. Çıkarma da negatif bir sayı eklemektir; bu işlem her gerçek sayı için geri alınabilir."
      ]
    },
    {
      "code": "S05",
      "title": "Çarpma ve bölmede tersinirlik koşulu",
      "paragraphs": [
        "İki tarafı aynı sıfır olmayan sayıyla çarpmak veya bölmek çözüm kümesini korur; işlemin tersi vardır. x/3=4’ü 3 ile çarpınca x=12, 4x=20’yi 4’e bölünce x=5 olur. Sıfıra bölme tanımsızdır. Çözerken değişkenli bir ifadeye bölmek de o ifadenin sıfır olabileceğini ayrıca incelemeyi gerektirir.",
        "İki doğru eşit taraf 0 ile çarpıldığında yine eşit olur; fakat bu dönüşüm aynı çözüm kümesini korumaz. x=1’i 0 ile çarparsan 0=0 elde edilir ve x bilgisi kaybolur. Bu yüzden çözüm zincirinde “aynı sayıyla çarp” kuralına sıfır olmayan koşulu eklenir. “Doğru eşitlikten doğru eşitlik çıkması” ile “eşdeğer denklem” aynı iddia değildir."
      ]
    },
    {
      "code": "S06",
      "title": "Görsel modelde iki tarafı birlikte izle",
      "paragraphs": [
        "3x+6=24’ü üç eş x parçası ve altı birimlik ek olarak düşün. Önce iki taraftan 6 çıkar: 3x=18. Ardından iki tarafı 3’e böl: x=6. Görsel keşifte x’i değiştirerek sol ve sağ sayıları karşılaştır; eşit oldukları yerde kökü görürsün.",
        "İnteraktif kutular işaretli cebir parçalarıdır; negatif sayıları fiziksel negatif kütle gibi yorumlama. Sayı çizgisindeki konum ve metin sonucu aynı hesaptan gelir. Birkaç deneme tek kökü fark etmeyi sağlar; bütün çözüm kümesi için cebirsel tür ayrımı da yapılır. Keşif yapmak bağımsız doğru cevap, ustalık veya XP üretmez."
      ]
    },
    {
      "code": "S07",
      "title": "Dağıtmayı her terime uygula",
      "paragraphs": [
        "k(a+b)=ka+kb dağıtma özelliğidir. 3(x−2)=3x−6; yalnız x’i çarpıp 3x−2 yazmak yanlış olur. Negatif dış katsayıda her işareti açık çarp: −2(x−3)=−2×x+(−2)×(−3)=−2x+6.",
        "Parantezin içi bir bütündür. 4(x−3) ile 4x−3 eşit ifadeler değildir: x=0 için ilki −12, ikincisi −3 verir. İki ifadenin farklılığını tek karşı örnek kanıtlar; bir değerde aynı çıkması ise her x’te aynı olduklarını tek başına kanıtlamaz."
      ]
    },
    {
      "code": "S08",
      "title": "İki tarafta x varsa aynı terimi çıkar",
      "paragraphs": [
        "4x−12=2x+10’da iki taraftan 2x çıkar: 2x−12=10. İki tarafa 12 ekle: 2x=22. İkiye böl: x=11. x’li terimi ve sabiti aynı anda zihinden geçirirken işaret hatası yapıyorsan bir satırda yalnız bir işlemi açık yaz.",
        "Genel ax+b=cx+d eşitliğinde iki taraftan cx ve b çıkarılınca (a−c)x=d−b olur. a=c durumunda x’li terim yok olur; bölmeden önce sabitlerin eşitliğine bak. İnteraktif görünüm katsayıları eşitlemene ve tek çözümün özdeşlik ya da çelişkiye dönüşmesini görmene izin verir."
      ]
    },
    {
      "code": "S09",
      "title": "İlk eşitlikte kontrol et",
      "paragraphs": [
        "Bir parantez hatası yaptıktan sonra türettiğin yanlış son satıra kökü koyarsan o yanlış satır yine doğru çıkabilir. Bu, başlangıç sorusunu çözdüğünü göstermez. Bulduğun değeri başlangıçtaki sol ve sağ ifadelere ayrı ayrı yaz ve iki sayıyı karşılaştır.",
        "4(x−3)=2x+10 için x=11 denemesi solda 4×8=32, sağda 22+10=32 verir. Kontrol ayrıca istenen birim ve sayı alanını kapsar: 6 yetişkin ve 6 öğrenci toplam 12 kişi eder; 780 TL şartı da ayrıca doğrulanır."
      ]
    },
    {
      "code": "S10",
      "title": "Çözümün beş duraklı düzeni",
      "paragraphs": [
        "Önce tanı: eşitlik, sayı alanı ve değişkenin yerini belirle. Sonra aç: parantezleri her terime dağıt, kesir çizgisinin bütün payını koru. Ardından topla: benzer terimleri birleştir ve iki tarafa aynı işlemlerle Ax=B’ye ulaş. Bölmeden önce A=0 türünü ayır. Son olarak ilk denklemde kontrol et.",
        "Sadece “en büyük kuvvet 1” demek her görünen ifadeyi doğrudan doğrusal yapmaz; değişkenin paydada olması ayrıca tanım koşulu gerektirir. İki bilinmeyenli doğrusal sistemleri bu rehberin devamında göreceksin. Mutlak değer ve ikinci derece denklemler kendi konu anlatımlarındadır. Sadeleşerek doğrusal koşula inen kesirli örneklerde baştaki yasak değer saklanır."
      ]
    },
    {
      "code": "S11",
      "title": "Kesir çizgisinin tamamını oku",
      "paragraphs": [
        "(x+3)/2, x+3 toplamının yarısıdır; x+3/2 ise yalnız 3’ün yarısının x’e eklenmesidir. x=1 için ilk ifade 2, ikincisi 5/2 olur. Düz metinde payın bütününü parantezle; kesir çizgisinin kapsamını gözden kaybetme.",
        "(x−1)/3+(x+2)/2=6’da paydalar sabit, sıfır olmayan 3 ve 2’dir. İki tarafı 6 ile çarpmak soldaki iki terimi ve sağdaki 6’yı birlikte etkiler: 2(x−1)+3(x+2)=36. “Paydaları sil” ezberi yerine hangi bütün tarafı hangi sayıyla çarptığını söyle."
      ]
    },
    {
      "code": "S12",
      "title": "Ortak kat kısa yolunun gerekçesi",
      "paragraphs": [
        "6, hem 2’nin hem 3’ün katıdır; 6/3=2 ve 6/2=3 çarpanları kalır. 2x−2+3x+6=36 → 5x+4=36 → 5x=32 → x=32/5. Kesirli bir kök bir gerçek sayı denkleminde tamamen geçerlidir; zorla tam sayıya yuvarlanmaz.",
        "Çıkarma varsa ikinci payın bütününü koru. (x+2)/4−(x−1)/3=1 için 12 ile çarpınca 3(x+2)−4(x−1)=12 olur. −4(x−1), −4x+4’tür. Bu artı 4’ün kaybı kökü değiştirir. İnteraktif payda görünümü aynı ortak katı ve iki ayrı çarpanı hesaplar."
      ]
    },
    {
      "code": "S13",
      "title": "Paydada değişken varsa yasak değeri sakla",
      "paragraphs": [
        "(x+1)/(x−1)=2’de x≠1 şartı başlangıçta yazılır. İzinli x’lerde iki tarafı x−1 ile çarp: x+1=2x−2, buradan x=3. 3 yasak değil; başlangıçta 4/2=2 verir. Bu kesirli denklem, alanı korunarak doğrusal bir koşula dönüştürülen yardımcı örnektir.",
        "(x−1)/(x−1)=2’de aynı işlem x=1 adayı çıkarır; fakat başlangıç paydası 0 olur. Bu aday atılır ve çözüm kümesi ∅’dir. Buna karşılık (x−1)/(x−1)=1, x≠1 olan bütün gerçek sayılar için doğrudur; cevap ℝ değil, ℝ’den 1’in çıkarılmasıdır. Sadeleştirme baştaki tanımsızlığı onarmaz."
      ]
    },
    {
      "code": "S14",
      "title": "Özdeşlik bir özel değere indirgenmez",
      "paragraphs": [
        "3(x+2)=3x+6 iki tarafta da aynı 3x+6 ifadesidir. Çıkarma sonunda 0=0 gelir; her gerçek x sağlar. x=0 deneyip doğru bulmak, yalnız 0’ın çözüm olduğunu söylemez. Bütün değerlerin çalışması, iki ifadenin cebirsel özdeşliğinden anlaşılır.",
        "5(x−2)=5x−10 ve 4(x+3)=4x+12 de aynı türdedir. ÇK=ℝ yazılır. Her sayı çözüm demek, bağlamın sayı alanını unutmak değildir: başta x doğal sayı denseydi çözümler o alanın bütün elemanları olurdu."
      ]
    },
    {
      "code": "S15",
      "title": "Çelişkide bilinmeyene yeni değer arama",
      "paragraphs": [
        "2(x−1)=2x+5 açılınca 2x−2=2x+5; iki taraftan 2x çıkarınca −2=5 kalır. Bu eşitlik yanlış ve artık x’e bağlı değildir. Hiçbir x bunu değiştiremez; ÇK=∅.",
        "4(x−3)=4x+10 için aynı mantık −12=10 çelişkisini verir. Son satırdaki sabitlerden birini x diye yazma, 0’a bölme ve “x’ler gitti, x=0” deme. 0x=B’de B≠0 ise kök yoktur; B=0 ise bütün alan çözümdür."
      ]
    },
    {
      "code": "S16",
      "title": "Parametreyi önce durumlara ayır",
      "paragraphs": [
        "k(x−1)=2x−k’de k, denklem çözülürken sabit tutulan bir parametredir. Dağıt: kx−k=2x−k. İki tarafa k ekle ve 2x çıkar: (k−2)x=0. Şimdi k−2’nin sıfır olup olmadığını ayır.",
        "k≠2 için sıfır olmayan k−2’ye bölünür, x=0 tek köktür. k=2 için 0x=0 çıkar ve her gerçek x çözümdür. Doğrudan k−2’ye bölüp yalnız x=0 demek k=2 durumunu kaybettirir. İnteraktif iki taraf modelinde a=c ve b=d seçmek bu ayrımı görselleştirir."
      ]
    },
    {
      "code": "S17",
      "title": "Sözcüklerin sırası parantezi belirler",
      "paragraphs": [
        "“Bir sayının 3 katının 5 fazlası” 3x+5; “bir sayının 5 fazlasının 3 katı” 3(x+5)’tir. İlkinde üç katı aldıktan sonra 5 eklenir; ikincisinde x+5 bütünü üçle çarpılır. Sözcük sırası bir işlem ağacı gibi içten dışa okunur.",
        "“Bir sayının yarısının 4 eksiği” x/2−4; “bir sayının 4 eksiğinin yarısı” (x−4)/2 olur. “Bir sayının 7 eksiği 20’dir” sözünde “dir” eşitlik ilişkisini kurar: x−7=20. Sayılardan önce bilinmeyeni, ardından her grubun anlamını yaz."
      ]
    },
    {
      "code": "S18",
      "title": "Benzer iki üçte bir ifadesi",
      "paragraphs": [
        "“Bir sayının üçte birinin 4 fazlası 11” x/3+4=11 demektir. İki taraftan 4 çıkarınca x/3=7; üçle çarpınca x=21 bulunur. “Bir sayının 4 fazlasının üçte biri 11” ise (x+4)/3=11’dir; üçle çarpınca x+4=33 ve x=29 olur.",
        "İki model yalnız bir kelime dizilişiyle ayrılır ama kökleri farklıdır. İlk cümlede 21/3+4=11, ikinci cümlede (29+4)/3=11 doğrulanır. Cümleyi tek tek işlem anahtarlarına çevirmek yerine hangi niceliğin üçe bölündüğünü açıkça söyle."
      ]
    },
    {
      "code": "S19",
      "title": "İlişkiyi birimle kur",
      "paragraphs": [
        "Bir problemde x’in neyi ölçtüğünü başta yaz: kişi adedi mi, TL cinsinden ücret mi, adım numarası mı? TL ile kuruş, dakika ile saat aynı tür nicelikler olsa da önce ortak birime çevrilir. 150 kuruş=1,50 TL’dir; 150 ile 1,50’yi doğrudan aynı birimdeymiş gibi toplama.",
        "Bir sayının 4 katının 7 fazlası, 2 katının 19 fazlasına eşitse 4x+7=2x+19 kurulur. İki taraftan 2x çıkar, ardından 7 çıkar, ikiye böl: x=6. Sözel kontrolde iki ifade de 31 verir. Rastgele sayıları çarpıp toplamak yerine eşit olan iki niceliği belirlemek çözümü yönetir."
      ]
    },
    {
      "code": "S20",
      "title": "İki grubun toplamını tek bilinmeyenle koru",
      "paragraphs": [
        "Yetişkin bileti 80 TL, öğrenci bileti 50 TL; toplam 12 kişi 780 TL ödüyor. Yetişkin sayısı x ise öğrenci sayısı 12−x olur. Her grubun kişi sayısı ile kendi fiyatı çarpılır: 80x+50(12−x)=780.",
        "Dağıtınca 30x+600=780 → x=6. 6 yetişkin ve 6 öğrenci hem 12 kişi hem 780 TL koşulunu sağlar. 80x+50x yazmak iki gruba aynı adedi verip toplam koşulunu kaybettirir. Kökün 0≤x≤12 aralığında bir tam sayı olması gerekir; 780 yerine 781 TL seçilirse kesirli aday gerçek bilet sayısı vermez."
      ]
    },
    {
      "code": "S21",
      "title": "Adet belli, fiyat farkı belli",
      "paragraphs": [
        "İki yetişkin ve üç öğrenci bileti toplam 390 TL; yetişkin bileti öğrenci biletinden 45 TL pahalı olsun. Öğrenci fiyatı s TL ise yetişkin s+45 TL’dir. Toplam denklem 2(s+45)+3s=390; 5s+90=390 → s=60 TL olur.",
        "Yetişkin 105 TL’dir; 2×105+3×60=390 ve 105−60=45 iki koşulu da sağlar. 45 farkının sadece bir bilet için değil her yetişkin biletine uygulandığını gör: iki yetişkin olduğundan toplam fark katkısı 90 TL’dir. Bu soruda x fiyat olduğu için kesirli TL miktarı sırf kesir diye reddedilmez; para alt birimi ve problem koşulu ayrıca okunur."
      ]
    },
    {
      "code": "S22",
      "title": "Sabit artışta geçiş sayısı n−1",
      "paragraphs": [
        "İlk adımın değeri a₁, her geçişte eklenen sabit sayı d ise n. adım aₙ=a₁+d(n−1) olur. 1. adımdan 1. adıma sıfır geçiş; 1. adımdan 4. adıma üç geçiş vardır. n=1 yazıldığında sonuç a₁ olmalı; bu küçük uç kontrolü bir kaymayı hemen yakalar.",
        "Özgün öğretim modeli: ilk adım 1, sabit artış 3, hedef terim 241. 1+3(n−1)=241 → 3(n−1)=240 → n=81. Bu model için ilk terim 2 olsaydı n=242/3 bulunurdu ve pozitif tam sayı bir adım olmazdı. “Yaklaşık 81” diye yuvarlamak eşitliği bozar."
      ]
    },
    {
      "code": "S23",
      "title": "Sabit artış ile katlanmayı karıştırma",
      "paragraphs": [
        "Kuralı “her geçişte 3 ekle” diye verilen 1,4,7,… modelinde farklar 3,3,…; bu doğrusal örüntüdür. Kuralı “her yeni katmanı öncekinin iki katı yap” diye verilen 1,2,4,… modelinde oran 2,2,…; farklar 1,2,… olduğundan sabit artış yoktur. Yalnız birkaç sayısal terim bütün gelecek için tek bir kuralı ispatlamaz; burada üretim kuralı da açıkça verilmiştir. Benzer bir dallanma resmi aynı cebirsel kural anlamına gelmez.",
        "2024 TYT Temel Matematik 17’de 30 günlük yürüyüş süresi 2. günden 15. güne kadar her gün 1 dakika artar. 16. günden başlayarak her gün 1 dakika azalır. İlk gün x dakikaysa 15. gün x+14, 16. gün x+13, 30. gün x−1 olur. İlk 15 günün toplamı 15x+105, son 15 gününki 15x+90’dır. 30x+195=1395 denklemi x=40 dakika verir. İlk 15 gün 705, son 15 gün 690 dakika eder. Tepe süresini yalnız 15. günde say."
      ]
    },
    {
      "code": "S24",
      "title": "Ortak çarpanı bütün taraf üzerinde küçült",
      "paragraphs": [
        "6(x−2)=3x+12’de iki tarafı 3’e böl: 2(x−2)=x+4. Katsayılar küçülür; dağıtınca 2x−4=x+4 ve x=8 olur. Dağıtarak 6x−12=3x+12 yoluyla çözmek de aynı kökü verir. Daha kısa yol, aynı geçerli adımları daha küçük sayılarla kurabilir.",
        "6x−2=3x+12’de yalnız 6x’i üçe bölmek yanlış olur. İki tarafın bütününü üçe bölmek ise tamamen geçerlidir: 2x−2/3=x+4; sadece bütün katsayılar tam sayıya sadeleşmediği için aynı pratik avantajı sunmaz. Normal yoldan 3x=14 ve x=14/3 elde edilir. “Ortak çarpan yoksa bölmek yasak” gibi yanlış bir kural çıkarma."
      ]
    },
    {
      "code": "S25",
      "title": "Kısa yolun doğruluk ölçütü",
      "paragraphs": [
        "Önce hangi yapıyla karşılaştığını belirle: ax+b=c’de sabiti ayır; ortak çarpan varsa bütün tarafı küçült; parantezde her terime dağıt; sabit paydalarda ortak kat kullan; sözel durumda ilişkiyi ve birimi kur; sabit artışta ilk terimi ve n−1 geçişi koru. Tek bir anahtar sözcük her soruda aynı işlemi seçtirmez.",
        "İki yöntem aynı başlangıç koşullarını, sayı alanını ve eşitliği koruyorsa ikisi de geçerlidir. Bir terimi atlamak, sıfır koşulunu gizlemek veya ilk denklem kontrolünü engellemek kısa yol değildir. Kişisel hız veya net artışı ölçülmedi; daha az satır yazmak tek başına daha iyi öğrenme kanıtı sayılmaz."
      ]
    },
    {
      "code": "S26",
      "title": "İlk bozulan satırı bul ve onar",
      "paragraphs": [
        "3(x−2)=12 → 3x−2=12 zincirinde ilk hata dağıtmadır; doğru açılış 3x−6=12. 4x+7=2x+19 → 2x=26 zincirinde 7 yanlış işlem görmüştür; iki taraftan 7 çıkarınca 2x=12 olmalı. Sonuç sayısını ezberlemek yerine hatanın ilk oluştuğu eşitliği düzelt.",
        "5(x−2)=5x−10 için yalnız x=0 demek özdeşliği tek değere indirger. aₙ=3n yazıp ilk terimi 1 kabul etmek başlangıcı kaydırır. Her onarımdan sonra ilk denklem, sayı alanı ve birim kontrolünü yeniden yap; doğru sonuca tesadüfen ulaşılmış olması bozuk yöntemi geçerli yapmaz."
      ]
    },
    {
      "code": "S27",
      "title": "Desteği azaltarak farklı bağlamda dene",
      "paragraphs": [
        "İlk örnekte bütün işlem ve nedenleri oku. Sonraki örnekte yalnız ilk hamleyi aç ve ara satırları kendin yaz. Ardından notu kapatarak soruyu çöz, bulduğun değeri başlangıçta kontrol et ve kendi gerekçeni verilen çözümle karşılaştır. Yardım alarak çözmek değerlidir; bağımsız çözümle aynı kayıt değildir.",
        "Bir yanlışta soruyu hemen baştan ezberleme: dağıtma mı, işaret mi, tanım koşulu mu, model mi bozulduğunu ayır. Aynı yapıyı farklı sayıda ve farklı bağlamda yeniden kur. Görsele bakmak, süre doldurmak veya “çalıştım” demek otomatik ustalık/XP sayılmaz; tekrarlar öğrenme gününü 1 sayan 3/7/21 düzeninde uygulamanın kayıtlarıyla izlenir."
      ]
    },
    {
      "code": "S28",
      "title": "İki koşulu aynı sayı çiftiyle sağla",
      "paragraphs": [
        "Bir masada elma ve armut olduğunu düşün. Elma adedine x, armut adedine y diyelim. x ve y iki ayrı bilinmeyendir. x+y=5, ikisinin toplamını söyler. Bu koşulla (0, 5), (1, 4) ve (3, 2) gibi birçok çift mümkündür. Parantezde ilk sayı x’in, ikinci sayı y’nin değeridir. Bu yüzden (3, 2) ve (2, 3) iki farklı durumdur.",
        "İkinci koşul x−y=1 olursa, elma sayısı armuttan bir fazladır. (3, 2) için 3+2=5 ve 3−2=1, ikisi de doğru. (2, 3) için toplam yine 5 fakat 2−3=−1. Denklem sistemi, aynı bilinmeyenlerin aynı değerleriyle birden çok koşulu birlikte ister. Tek denklemin çözümünü sistemin çözümü saymadan önce öteki koşulu denetle.",
        "Yaş, para ve uzunlukta bilinmeyenlerin birimlerini yaz. Adetlerde negatif ve kesirli değerler genellikle kabul edilmez. Denklem sistemi önce cebirsel adayları verir. Bulduğun çifti iki eşitliğe ve metindeki sayı alanına ayrı ayrı geri koy."
      ]
    },
    {
      "code": "S29",
      "title": "Bir doğruyu iki noktadan çiz",
      "paragraphs": [
        "Yatay eksen x’in, düşey eksen y’nin değerini gösterir. (3, 2) noktasına ulaşmak için başlangıçtan 3 birim sağa, 2 birim yukarı git. Eşit çizgi aralıkları kullan. ax+by=c biçiminde a ve b, sırasıyla x’in ve y’nin katsayıları, c sabit sayıdır. a ile b aynı anda sıfır değilse denklemin gerçek sayı çiftleri bir doğru oluşturur.",
        "x+y=5 için x=0 yazınca y=5, y=0 yazınca x=5 olur. (0, 5) ve (5, 0) noktalarını birleştir. x−y=1 için x=0 iken y=−1, y=0 iken x=1. İkinci doğru (0, −1) ile (1, 0) üzerinden geçer. İki doğrunun kesiştiği (3, 2) noktasını ilk iki denklemde doğrula. Kesik ve düz çizgiyle denklemler ayırt edilebilir.",
        "x=2 doğrusu düşeydir. Örneğin (2, 0) ile (2, 3) aynı doğru üzerindedir. y=3 doğrusu yataydır ve (0, 3) ile (2, 3) üzerinden geçer. İki eksen kesişimi yöntemi ayrı iki nokta üretmezse başka bir değer seç. Örneğin x+y=0 iki ekseni de (0, 0)’da keser, ikinci nokta olarak (1, −1) kullanılabilir."
      ]
    },
    {
      "code": "S30",
      "title": "Bir bilinmeyenin yerine eşit ifadeyi yaz",
      "paragraphs": [
        "Yerine koyma, aynı sayıyı eşit bir ifadeyle değiştirmektir. x+y=7 denkleminden iki taraftan x çıkararak y=7−x elde et. 2x−y=5 denklemindeki y yerine 7−x yazınca yalnız x kalır. Parantez y’nin bütün değerini temsil eder. 2x−(7−x)=5 açıldığında 2x−7+x=5 olur.",
        "Buradan x=4 bulunur. y=7−x bağıntısına dönünce y=3. Yerine koyduğun eşitliği elde tutmak ikinci bilinmeyeni geri bulmanı sağlar. y=7−x ifadesini çıkarıldığı x+y=7 denklemine koyarsan 7=7 olur. Bu satır, ikinci koşulu hiç kullanmadığı için ortak çifti seçemez.",
        "Bir terimi ayırmak için bölüyorsan katsayının sıfır olmadığını denetle. y=x+1 gibi bir bilinmeyen önceden ayrılmışsa yerine koyma kısa bir başlangıçtır. Eşitliği değiştirdikten sonra bulduğun x ve y’yi ilk biçimlerde kontrol et."
      ]
    },
    {
      "code": "S31",
      "title": "Toplayarak veya çıkararak bir bilinmeyeni yok et",
      "paragraphs": [
        "İki doğru eşitlikte sol tarafları kendi arasında, sağ tarafları kendi arasında toplarsan yeni eşitlik de doğrudur. Aynı işlem çıkarma için geçerlidir. Örneğin x+2y=8 ve x−y=2 denklemlerinde x katsayıları eşit. İkinci eşitliği ilkinden çıkarırsan x−x=0 ve 2y−(−y)=3y kalır. Sağda 8−2=6 olduğundan y=2 bulunur.",
        "İki katsayı zıt ve aynı büyüklükteyse topla. Gerekirse bir denklemin iki tarafının tamamını aynı sıfır olmayan sayıyla çarp. 2x+3y=12’yi 2 ile ve 3x−2y=5’i 3 ile çarpınca 4x+6y=24 ve 9x−6y=15 olur. Topladığında y gider, 13x=39 kalır. 12’yi çarpmayı unutursan daha ilk satırda denklemi bozarsın.",
        "Yok edilen bilinmeyeni geri bulmak için başlangıç denklemlerinden birini sakla. Burada 13x=39, x’i belirler ve y hakkında tek başına hiçbir şey söylemez. x=3’ü 2x+3y=12’ye koyunca y=2 olur. Son çift hem 6+6=12’yi hem 9−4=5’i sağlamalıdır."
      ]
    },
    {
      "code": "S32",
      "title": "Denklem sistemi hangi çözüm türünü veriyor?",
      "paragraphs": [
        "İki denklem de gerçek bir doğruysa üç durum vardır. Kesişim tek noktadaysa tek bir sayı çifti bulunur. Farklı paralel doğruların ortak noktası yoktur. Çakışan doğruların bütün noktaları ortaktır, ancak bu noktalar yalnız o doğru üzerindedir. Örneğin x+y=4 ve 2x+2y=8 aynı doğruyu verir. (0, 4) ve (3, 1) çözümdür, (0, 0) çözüm değildir.",
        "Bir katsayıyı yok ettikten sonra 0=0 kalması o yeni satırın her çift için doğru olduğunu gösterir. Elde kalan bağımsız denklemi yine kullan. x+y=4 ve 2x+2y=9 denklemlerinde ilk satırı ikiyle çarpıp karşılaştırınca 8=9 kalır. Çelişki varsa hiçbir çift iki koşulu birden sağlayamaz.",
        "a ve b sıfırsa ax+by=c bir doğru denklemi olmaz. 0x+0y=0 her çifte izin verir ve öteki denklem çözüm kümesini belirler. 0x+0y=5 hiçbir çifte izin vermez. İki denklem de 0=0 ise sistemin çözümü bütün gerçek sayı çiftleridir. Bütçe örneğinde A ve B’nin negatif olamayacağı söylenirse A+B=4 doğrusunun sadece (0, 4) ile (4, 0) arasındaki parçası kalır."
      ],
      "table": {
        "headers": [
          "İki gerçek doğrunun durumu",
          "Cebirsel işaret",
          "Ortak çözüm"
        ],
        "rows": [
          [
            "Bir noktada kesişir",
            "Her bilinmeyen tek değere belirlenir.",
            "Bir sıralı ikili"
          ],
          [
            "Paralel ve farklı",
            "Yok etmede 0=3 gibi yanlış eşitlik kalır.",
            "Boş küme ∅"
          ],
          [
            "Çakışır",
            "Bir satır ötekinin sıfır olmayan katıdır.",
            "Aynı doğru üzerindeki sonsuz çift"
          ]
        ]
      }
    },
    {
      "code": "S33",
      "title": "Katsayıların çapraz farkı neyi söyler?",
      "paragraphs": [
        "ax+by=c ve dx+ey=f yazalım. Katsayılar x ile y’nin önündeki sayılardır. İlk denklemi e, ikincisini b ile çarpıp ikincisini ilkinden çıkarınca y gider. Elde edilen eşitlik (ae−bd)x=ce−bf olur. Buradaki a×e−b×d farkına katsayı determinantı denir ve Δ ile gösterilebilir. Eşitlikten çıkarılan bu bilgi başlangıç denklemlerini denetlemenin kısa bir yoludur.",
        "Δ sıfırdan farklıysa x=(ce−bf)/Δ olur. Öteki bilinmeyen de aynı yöntemle y=(af−cd)/Δ olur. x katsayısını yok etmek için ikinci eşitliği a ile, ilkini d ile çarp ve ilkini ikinciden çıkar. Böylece (ae−bd)y=af−cd çıkar. x ve y’yi iki başlangıç eşitliğinde denetle. Sıfır katsayı bulunan bir satır da bu yönteme girebilir. Türetilen sonuçları başlangıç satırlarının yerine tek başlarına koyma.",
        "Δ=0 ise bu formüllerle bölme yapılamaz. Her iki denklem birer doğruysa (a,b) ve (d,e) katsayı çiftlerinden biri diğerinin sıfırdan farklı katıdır. Bir katsayı sıfır olsa da çiftleri karşılaştırmak için ona bölmen gerekmez. Sağ sabitlerin de aynı çarpanı taşıyıp taşımadığını yok etme ile denetle. Örneğin x+y=4’ün iki katından 2x+2y=8’i çıkarınca 0=0 kalır. İkinci eşitliğin sağında 9 varsa aynı işlem 0=−1 verir. Bir satırın iki katsayısı da sıfırsa önce o satırı değerlendir."
      ]
    },
    {
      "code": "S34",
      "title": "Parametre değişince çözüm türünü yeniden kontrol et",
      "paragraphs": [
        "k, denklemlerin katsayısı olarak önce değeri seçilebilen bir parametredir. Her k için kx+2y=6 ve 2x+ky=6 sistemini düşünüyoruz. Çözülmesi istenen çift x ile y’dir. k değiştiğinde doğruların eğimi ve kesişim durumu değişebilir.",
        "k=2 seçilirse iki eşitlik de 2x+2y=6 olur. Çözüm x+y=3 doğrusu üzerindeki bütün çiftlerdir. k=−2 seçilirse iki eşitliği topladığında 0=12 kalır. Bu k değerinde çözüm yoktur. Özel değerleri ayırmadan k−2 veya k+2 ile bölmek, sıfıra bölme riskini gizler.",
        "k≠2 ve k≠−2 iken birinci denklemden ikinciyi çıkar. (k−2)(x−y)=0 olduğundan x=y. Böylece (k+2)x=6, x=y=6/(k+2). Örneğin k=1 iken x=y=2 ve iki denklem de 6 verir. Δ=k²−4=(k−2)(k+2) de özel değerlerin niçin tam olarak 2 ile −2 olduğunu gösterir."
      ]
    },
    {
      "code": "S35",
      "title": "Paydada değişken varsa kökü başlangıç alanına geri koy",
      "paragraphs": [
        "(x+2)/(x−1)=2 denkleminde x=1 yasaktır. Diğer x değerlerinde iki tarafı x−1 ile çarparsak x+2=2x−2, buradan x=4. Başlangıçta 6/3=2 ve payda sıfır olmadığı için 4 geçerli köktür.",
        "(2x−2)/(x−1)=3 için yine x≠1 gerekir. Payda ile çarpınca 2x−2=3x−3, cebirsel aday x=1 olur. Bu aday başlangıç kesrini tanımsız yaptığından çözüm kümesi ∅. Doğrudan kontrol: izinli her x için 2x−2=2(x−1) ve kesrin değeri 2, dolayısıyla 3 olamaz.",
        "Bir dönüşüm yalnız yazdığın sayı alanında eşdeğerdir. Paydadan kurtulduğunda yasak değer görünmez olabilir. İşlem sonuna kadar x≠1 koşulunu kenarda tut."
      ]
    },
    {
      "code": "S36",
      "title": "Fiyat ve aktarım problemlerinde iki bağıntı yaz",
      "paragraphs": [
        "Bir defterin birim fiyatı d TL, bir kalemin birim fiyatı k TL olsun. İki defterle üç kalem 31 TL, üç defterle iki kalem 34 TL ise 2d+3k=31 ve 3d+2k=34. Çarpanlar alınan adet, katsayının yanındaki bilinmeyen ise bir ürünün fiyatıdır. Her terimin birimi TL olur. Birinci eşitliğin üç katından ikincinin iki katını çıkarınca 5k=25 elde edilir. k=5, d=8. İki alışverişi 16+15=31 ve 24+10=34 biçiminde geri kontrol et.",
        "Aktarımda iki nicelik zıt yönde değişir. Özgün örnekte A ve B kaplarında toplam 26 L var. A’dan B’ye 4 L aktarılınca ikisi eşit oluyor. Başlangıç miktarları a ve b litre ise a+b=26, a−4=b+4. İkinci eşitlik a−b=8 olur. Toplamla birleştirince a=17 ve b=9 çıkar. Son durumda iki kapta 13’er litre var, toplam yine 26 L.",
        "Aktaran kapta aktarılacak kadar su bulunmalı. İki kaptaki başlangıç miktarları da negatif olamaz. Fiyatla çalışırken aynı ürünün iki alışverişteki birim fiyatı sabit kalır. Yalnız toplamı veya yalnız farkı bilmek, iki başlangıç miktarını birden bulmaya yetmez."
      ]
    },
    {
      "code": "S37",
      "title": "Tek bilinmeyende uygun ilk hamleyi seç",
      "paragraphs": [
        "İki tarafı aynı sıfır olmayan sayıyla çarpıp geri dönebilirsin. Örneğin x=3 eşitliğini 0 ile çarparsan 0=0 elde edersin, ama yeni satır x’i tek bir değere belirlemez. Aynı kural bir katsayıya bölmeden önce de geçerlidir.",
        "aₙ gösterimi n’inci terim, a₁ ilk terim ve d her geçişte eklenen sabit sayıdır. İlk terim 4, d=3 ise a₅=4+3×4=16. Beşinci terime ulaşmak için dört kez artış yapılır. Artışların sayısını ve her artışın büyüklüğünü ayrı yaz.",
        "Tabloda her satır önce geçerli bir yol, sonra tek koşulu bozduğunda ne değiştiğini, son olarak aynı fikrin başka bir kullanımını gösterir. Sonuçları baştaki eşitliğe yazarak denetle."
      ],
      "table": {
        "headers": [
          "Yöntem",
          "Geçerli koşul",
          "Yakın hata",
          "Başka bağlam"
        ],
        "rows": [
          [
            "Sabiti ayır",
            "3x+2=17. 2 çıkar, 3’e böl, x=5.",
            "0x+2=17 için 0’a bölünmez. 2=17 çelişkisi kalır.",
            "2 L başlangıçlı depo dakikada 3 L alır. 2+3t=17, t=5 dakika."
          ],
          [
            "Bütün tarafı böl",
            "6(x−2)=3x+12. İki tarafı 3’e böl. x=8 ve 36=36.",
            "6x−2=3x+12’de tek başına 6x’i bölme. 3x=14 ve x=14/3.",
            "Kargo bedelleri 6(t−2) TL ve 3t+12 TL. Eşitlik t=8’de iki bedeli 36 TL yapar."
          ],
          [
            "Parantezi dağıt",
            "2−3(x−1)=11. 2−3x+3=11, x=−2.",
            "−3(x−1) açılınca −3x+3 olur. x=0 için doğru değer 3’tür. Yanlış açılım −3x−1 ise aynı denemede −1 verir.",
            "5 pakette her biri n−2 parça, toplam 35. 5(n−2)=35, n=9."
          ],
          [
            "Paydalarla çalış",
            "(x−1)/2+(x+1)/3=4. 6 ile çarp, 5x−1=24, x=5.",
            "(x−1)/(x−1)=2’de x≠1. Payda ile çarpınca çıkan x=1 başlangıçta yasaktır.",
            "İki iş süresi x/2 ve x/3 saat. Toplam 5 saatse x=6, süreler 3 ve 2 saattir."
          ],
          [
            "Bilinmeyeni birimle tanımla",
            "9 ürün 5 veya 8 TL, toplam 54 TL. 5(9−x)+8x=54, x=3 pahalı ürün.",
            "5(9−x)+8=54 yazmak bir pahalı ürünün ücretini sayar. x tane varsa ücret 8x.",
            "7 araç 10 ya da 14 koltuklu, toplam 82. 10(7−x)+14x=82, x=3 büyük araç."
          ],
          [
            "Sabit artışı say",
            "İlk 4, artış 3. 4+3(n−1)=31, n=10.",
            "4, 7, 11, 16 dizisinde artışlar 3, 4, 5. Sabit 3 varsayımı üçüncü terimi 10 yapar.",
            "İlk sırada 12 koltuk, her sonraki sırada 2 fazla. 12+2(n−1)=30, n=10."
          ]
        ]
      }
    },
    {
      "code": "S38",
      "title": "İki bilinmeyende yöntemin koşulunu karşılaştır",
      "paragraphs": [
        "Bir bilinmeyen zaten yalnızsa yerine koymayla başla. Aynı veya zıt bir katsayı görünüyorsa, eşitlikleri çıkararak veya toplayarak yok etme kısa olabilir. Sadeleştirdikten sonra ikinci bilinmeyen için bir başlangıç eşitliğine dön ve iki koşulu kontrol et.",
        "Katsayılar ve sabit aynı oranda değişiyorsa aynı doğruyu yeniden yazmış olabilirsin. Sadece katsayılar aynı orandaysa sağ tarafta çelişki oluşabilir. Grafikteki noktaları denkleme koyarak aynı çizgiyi veya ayrı paralel çizgileri sınayabilirsin."
      ],
      "table": {
        "headers": [
          "Yöntem",
          "Geçerli örnek",
          "Yakın hata",
          "Başka bağlam"
        ],
        "rows": [
          [
            "Yerine koyma",
            "y=x+1 ve x+y=7. x+(x+1)=7, (x, y)=(3, 4).",
            "y=x+1’i yine kendisine koymak x+1=x+1 verir. Toplam koşulu kullanılmadı.",
            "Kırmızı sayısı maviden 1 fazla, toplam 7. k=m+1 ve k+m=7, m=3, k=4."
          ],
          [
            "Yok etme",
            "x+2y=8 ve x−y=2. İkinciyi çıkar. 3y=6, (x, y)=(4, 2).",
            "Bu iki satırı toplarsan 2y−y=y kalır. Aynı x katsayılarını yok etmek için çıkar.",
            "Bir ürünün bedeli x TL, ek işlem tutarı y TL. İki ek işlemle alış 8 TL, aynı tutarda bir indirimle alış 2 TL. x=4 ve y=2."
          ],
          [
            "Çözüm türü",
            "x+y=4 ve 2x+2y=8 aynı doğru. y=4−x olduğunda iki koşul sağlanır.",
            "İkinci sabit 9 olursa ilk denklemin iki katı ile 8=9 çelişkisi çıkar.",
            "Bütçede A+B=4, 2A+2B=8. A,B≥0 ise (0, 4) ve (4, 0) arasındaki doğru parçası kalır."
          ]
        ]
      }
    },
    {
      "code": "S39",
      "title": "Prova · Tek bilinmeyenli ilk yedi soru",
      "paragraphs": [
        "Önce 1–7’yi, sonra ikinci prova sayfasındaki 8–14’ü çöz. Her soruda ilk işlemini ve nedenini yaz. Bir sayıyı kök olarak bulduğunda ilk eşitliğe dön. Bir çözüm kümesi isteniyorsa tek bir örnek değeriyle yetinme.",
        "İlk denemeyi süre tutmadan yapabilirsin. Takılırsan önce yalnız ilk hamleyi yaz. Çözümleri bütün istemleri gördükten sonra aç."
      ],
      "table": {
        "headers": [
          "Soru",
          "İstem"
        ],
        "rows": [
          [
            "1. soru",
            "x gerçek sayı. 7x−9=40 denklemini çöz ve başlangıçta denetle."
          ],
          [
            "2. soru",
            "x gerçek sayı. 3(2x−5)=x+20 denklemini çöz. İlk eşitliğin iki tarafını ayrı ayrı hesapla."
          ],
          [
            "3. soru",
            "x gerçek sayı. (x+2)/4−(x−1)/3=1 denklemini çöz."
          ],
          [
            "4. soru",
            "x gerçek sayı. 5(x−2)=5x−10 denkleminin çözüm kümesini belirle."
          ],
          [
            "5. soru",
            "Bir sayının üçte birinin 4 fazlası 11. Sayı kaçtır?"
          ],
          [
            "6. soru",
            "Bir örüntünün ilk terimi 5 ve her sonraki terimi bir öncekinden 4 fazla. Terim 69 olduğunda sıra numarası nedir?"
          ],
          [
            "7. soru",
            "İki yetişkin ve üç öğrenci bileti 390 TL. Yetişkin bileti öğrenci biletinden 45 TL pahalı. Bir öğrenci bileti kaç TL?"
          ]
        ]
      }
    },
    {
      "code": "S40",
      "title": "Prova · Ortak koşul, grafik ve aktarım",
      "paragraphs": [
        "8–14. sorularda adımları görünür yaz. Bir sistemde bulduğun çifti her iki denklemde denetle. Değişken paydada baştaki yasak değeri yaz, para ve miktar sorusunda birimleri koru.",
        "Çözüm bölümüne geçmeden iki kısa başlangıcı dene. İlkinde hazır eşitlikten iki tarafta hangi terimi çıkaracağını bul. İkincide iki denklem toplandığında kalan katsayıyı belirle. İki durumda da kendi yerine koyma kontrolünü yaz.",
        "4x+7=2x+19 ile başla. İki taraftan ____ çıkarınca 2x+7=19. Ardından ____ çıkar, ____’ye böl. Bulduğun değeri ilk iki ifadede denetle.",
        "x+y=9 ve 2x−y=3. Toplayınca ____×x=12. x=____, y=____. İki eşitlikte de denetle."
      ],
      "table": {
        "headers": [
          "Soru",
          "İstem"
        ],
        "rows": [
          [
            "8. soru",
            "x+y=8 ve 2x−y=7 sisteminin çözümünü bul. Çifti her iki denklemde denetle."
          ],
          [
            "9. soru",
            "Birinci sistem x−2y=3 ve 2x−4y=6. İkinci sistemde ilk denklem aynı, diğeri 2x−4y=7. Çözüm kümelerini karşılaştır."
          ],
          [
            "10. soru",
            "x gerçek sayı. (3x−6)/(x−2)=4 denklemini çöz. İlk satırda paydayı sıfır yapan değeri yaz."
          ],
          [
            "11. soru",
            "Aynı tarifede 2 tam ve 3 indirimli giriş 230 TL, 3 tam ve 2 indirimli giriş 270 TL. Her türün birim fiyatını bul."
          ],
          [
            "12. soru",
            "4(x+3)=4x+12 denkleminin gerçek çözüm kümesi nedir? Yalnız x=0 demek neden yetmez?"
          ],
          [
            "13. soru",
            "x+y=6 ve x−y=2 doğrularının ortak noktasını hesapla. x+y=6 doğrusu üzerinde iki ayrı nokta daha yaz."
          ],
          [
            "14. soru",
            "A ve B depolarında toplam 18 L su var. A’dan B’ye 3 L aktarılınca miktarlar eşit oluyor. Başlangıçtaki iki miktarı ve son toplamı bul."
          ]
        ]
      }
    }
  ],
  "examples": [
    {
      "code": "E01",
      "title": "Bir kökü gerçekten denetle",
      "prompt": "2x+3=11 denklemini gerçek sayılarda çöz.",
      "strategy": "Önce +3 etkisini iki taraftan kaldır.",
      "steps": [
        {
          "label": "Sabitleri ayır",
          "explanation": "İki taraftan 3 çıkarmak eşitliği korur.",
          "expression": "2x+3−3=11−3"
        },
        {
          "label": "Katsayıyı kaldır",
          "explanation": "2 sıfır olmadığı için iki tarafı 2’ye bölebilirsin.",
          "expression": "2x=8 → x=4"
        }
      ],
      "answer": "ÇK={4}",
      "check": "2×4+3=11.",
      "pitfall": "2x’i 2+x sanma; x=3 denemesinde 9≠11 olur."
    },
    {
      "code": "E02",
      "title": "Üç eş parçanın değerini bul",
      "prompt": "3x+6=24 denklemini çöz.",
      "strategy": "Önce altı birimi iki taraftan çıkar.",
      "steps": [
        {
          "label": "Ek kısmı kaldır",
          "explanation": "Üç eş x parçasına toplam 18 kalır.",
          "expression": "3x+6−6=24−6 → 3x=18"
        },
        {
          "label": "Eş böl",
          "explanation": "Her parça aynı olduğundan 18 üç eş gruba bölünür.",
          "expression": "x=18/3=6"
        }
      ],
      "answer": "x=6",
      "check": "3×6+6=24.",
      "pitfall": "Sağ tarafı 6 ile değiştirmeden soldaki +6’yı silme."
    },
    {
      "code": "E03",
      "title": "Negatif sabitin ters etkisi",
      "prompt": "5x−7=18 denklemini çöz.",
      "strategy": "İki tarafa 7 ekleyerek başla.",
      "steps": [
        {
          "label": "Yediyi ekle",
          "explanation": "−7 ile +7 birbirini götürür; sağ taraf da değişir.",
          "expression": "5x−7+7=18+7 → 5x=25"
        },
        {
          "label": "Beşe böl",
          "explanation": "5 sıfır değildir.",
          "expression": "x=25/5=5"
        }
      ],
      "answer": "x=5",
      "check": "5×5−7=18.",
      "pitfall": "18−7 yaparsan doğru ters işlemi uygulamamış olursun."
    },
    {
      "code": "E04",
      "title": "Parantezi aç, iki taraftaki x’i ayır",
      "prompt": "4(x−3)=2x+10 denklemini çöz.",
      "strategy": "Önce her parantez terimini 4 ile çarp.",
      "steps": [
        {
          "label": "Dağıt",
          "explanation": "4, x’e ve −3’e ayrı uygulanır.",
          "expression": "4x−12=2x+10"
        },
        {
          "label": "İki taraftan 2x çıkar",
          "explanation": "Her iki x’li ifade arasındaki fark 2x olur.",
          "expression": "2x−12=10"
        },
        {
          "label": "On iki ekle",
          "explanation": "İki tarafa +12 uygulanır.",
          "expression": "2x=22"
        },
        {
          "label": "İkiye böl",
          "explanation": "Sıfır olmayan 2’ye bölünür.",
          "expression": "x=11"
        }
      ],
      "answer": "x=11",
      "check": "4(11−3)=32 ve 2×11+10=32.",
      "pitfall": "4(x−3)’ü 4x−3 diye açmak farklı bir denklem üretir."
    },
    {
      "code": "E05",
      "title": "Aynı denklemi daha küçük katsayıyla çöz",
      "prompt": "4(x−3)=2x+10 denklemini önce ikiye bölerek çöz.",
      "strategy": "Sağ taraftaki iki terimin de 2’ye bölündüğünü göster.",
      "steps": [
        {
          "label": "Bütün iki tarafı küçült",
          "explanation": "(2x+10)/2=x+5; yalnız 2x değil, +10 da bölünür.",
          "expression": "2(x−3)=x+5"
        },
        {
          "label": "Dağıt ve topla",
          "explanation": "İki taraftan x çıkar.",
          "expression": "2x−6=x+5 → x−6=5"
        },
        {
          "label": "Altıyı ekle",
          "explanation": "İki tarafın +6 ile değişimi eşitliği korur.",
          "expression": "x=11"
        }
      ],
      "answer": "x=11",
      "check": "İlk denklemde iki taraf 32’dir; önceki yolun köküyle aynı.",
      "pitfall": "Bu yöntem geçerlidir; fakat her denklemde önce bölmek işlem sayısını azaltmaz."
    },
    {
      "code": "E06",
      "title": "İki sabit paydayı bir çarpımla yönet",
      "prompt": "(x−1)/3+(x+2)/2=6 denklemini çöz.",
      "strategy": "Paydaların ortak katı 6 ile bütün iki tarafı çarp.",
      "steps": [
        {
          "label": "Ortak katla çarp",
          "explanation": "6/3=2 ve 6/2=3; sağdaki 6 da 6 ile çarpılır.",
          "expression": "2(x−1)+3(x+2)=36"
        },
        {
          "label": "Parantezleri aç",
          "explanation": "Her çarpan kendi payının tamamına dağılır.",
          "expression": "2x−2+3x+6=36"
        },
        {
          "label": "Benzerleri topla",
          "explanation": "Sabitlerin toplamı −2+6=4’tür.",
          "expression": "5x+4=36 → 5x=32"
        },
        {
          "label": "Beşe böl",
          "explanation": "Kesirli kök gerçek sayılarda geçerlidir.",
          "expression": "x=32/5"
        }
      ],
      "answer": "x=32/5",
      "check": "İlk kesirler 9/5 ve 21/5; toplam 30/5=6.",
      "pitfall": "Sadece paydalara çizgi atıp sağ tarafı aynı bırakmak eşitliği korumaz."
    },
    {
      "code": "E07",
      "title": "Özdeşlikte bütün kökleri gör",
      "prompt": "3(x+2)=3x+6 denkleminin çözüm kümesini bul.",
      "strategy": "İki taraftaki ifadeleri sadeleştir.",
      "steps": [
        {
          "label": "Dağıt",
          "explanation": "İki taraf aynı ifadeye dönüştü.",
          "expression": "3x+6=3x+6"
        },
        {
          "label": "Eş ifadeleri çıkar",
          "explanation": "Bu doğru eşitlik x’in her gerçek değerinde geçerlidir.",
          "expression": "0=0"
        }
      ],
      "answer": "ÇK=ℝ",
      "check": "x=0 da x=7 de çalışır; asıl kanıt iki ifadenin cebirsel özdeşliğidir.",
      "pitfall": "Yalnız denediğin x=0’ı cevap verme; istenen bütün çözüm kümesidir."
    },
    {
      "code": "E08",
      "title": "x yok olurken yanlış bir eşitlik kalırsa",
      "prompt": "2(x−1)=2x+5 denkleminin çözüm kümesini bul.",
      "strategy": "Dağıttıktan sonra iki taraftan 2x çıkar.",
      "steps": [
        {
          "label": "Dağıt",
          "explanation": "2×(−1)=−2.",
          "expression": "2x−2=2x+5"
        },
        {
          "label": "x’leri çıkar",
          "explanation": "Son satır x’ten bağımsız ve yanlıştır.",
          "expression": "−2=5"
        }
      ],
      "answer": "ÇK=∅",
      "check": "Her x’te sol taraf sağdan 7 küçüktür; eşit olamaz.",
      "pitfall": "x’lerin kaybolması her zaman bütün sayılar çözüm demek değildir; sabitleri karşılaştır."
    },
    {
      "code": "E09",
      "title": "Bölmeden önce parametrenin sıfır durumunu ayır",
      "prompt": "k gerçek parametre olmak üzere k(x−1)=2x−k denklemini çöz.",
      "strategy": "k−2’ye hemen bölme; iki durumu koru.",
      "steps": [
        {
          "label": "Dağıt ve topla",
          "explanation": "İki tarafa k ekleyip 2x çıkarırsın.",
          "expression": "kx−k=2x−k → (k−2)x=0"
        },
        {
          "label": "Sıfır olmayan katsayı",
          "explanation": "Bu durumda k−2’ye bölme geçerlidir.",
          "expression": "k≠2 ise x=0"
        },
        {
          "label": "Sıfır katsayı",
          "explanation": "Bu durumda her gerçek x eşitliği sağlar.",
          "expression": "k=2 ise 0x=0"
        }
      ],
      "answer": "k≠2: ÇK={0}; k=2: ÇK=ℝ",
      "check": "k=2’de başlangıç 2x−2=2x−2 olur; k=3’te x=0 iki tarafta −3 verir.",
      "pitfall": "k−2’ye koşulsuz bölmek k=2 durumunu kaybettirir."
    },
    {
      "code": "E10",
      "title": "İki bilet grubunu tek bilinmeyenle kur",
      "prompt": "Yetişkin bileti 80 TL, öğrenci bileti 50 TL. Toplam 12 kişi 780 TL ödüyor. Yetişkin sayısı kaçtır?",
      "strategy": "x yetişkin sayısıysa öğrenci sayısını 12−x yaz.",
      "steps": [
        {
          "label": "Grupları kur",
          "explanation": "Her grubun adedi kendi TL fiyatıyla çarpılır.",
          "expression": "80x+50(12−x)=780"
        },
        {
          "label": "Dağıt ve birleştir",
          "explanation": "Öğrenci adedindeki −x, −50x katkısını verir.",
          "expression": "80x+600−50x=780 → 30x=180"
        },
        {
          "label": "Çöz ve alana bak",
          "explanation": "0≤6≤12 ve 6 tam sayıdır.",
          "expression": "x=6"
        }
      ],
      "answer": "6 yetişkin, 6 öğrenci",
      "check": "6+6=12; 6×80+6×50=780 TL.",
      "pitfall": "İki grubu da x saymak toplam 12 kişi şartını kaybettirir."
    },
    {
      "code": "E11",
      "title": "Desteği azaltılmış sözel denklem",
      "prompt": "Bir sayının 4 katının 7 fazlası, aynı sayının 2 katının 19 fazlasına eşittir. Sayı kaçtır?",
      "strategy": "Önce hangi iki niceliğin eşit olduğunu yaz.",
      "steps": [
        {
          "label": "Model",
          "explanation": "İki tarafta da aynı bilinmeyen sayı kullanılır.",
          "expression": "4x+7=2x+19"
        },
        {
          "label": "x’leri azalt",
          "explanation": "İki taraftan 2x çıkar.",
          "expression": "2x+7=19"
        },
        {
          "label": "Sabiti kaldır",
          "explanation": "İki taraftan 7 çıkar.",
          "expression": "2x=12"
        },
        {
          "label": "Yalnız bırak",
          "explanation": "İkiyi sıfır olmayan katsayı olarak böl.",
          "expression": "x=6"
        }
      ],
      "answer": "x=6",
      "check": "4×6+7=31; 2×6+19=31.",
      "pitfall": "19+7 yapıp 26’ya gitme; +7 etkisini −7 ile kaldır."
    },
    {
      "code": "E12",
      "title": "Ortak çarpanı bütün tarafta azalt",
      "prompt": "6(x−2)=3x+12 denklemini çöz.",
      "strategy": "Her iki tarafın tamamını 3’e böl.",
      "steps": [
        {
          "label": "Ortak çarpanı azalt",
          "explanation": "Solun dış katsayısı ve sağın iki terimi birlikte bölünür.",
          "expression": "2(x−2)=x+4"
        },
        {
          "label": "Dağıt",
          "explanation": "2×(−2)=−4.",
          "expression": "2x−4=x+4"
        },
        {
          "label": "Topla",
          "explanation": "İki taraftan x çıkar, 4 ekle.",
          "expression": "x=8"
        }
      ],
      "answer": "x=8",
      "check": "6(8−2)=36; 3×8+12=36.",
      "pitfall": "Ortak çarpanı iptal etmek yalnız bir seçilmiş terimi bölmek değildir."
    },
    {
      "code": "E13",
      "title": "Yakın görünen örnekte bütün tarafı koru",
      "prompt": "6x−2=3x+12 denklemini çöz; iki tarafı 3’e bölmenin geçerli olup olmadığını açıkla.",
      "strategy": "İlk denklemde benzer terimleri ayır; bölme karşılaştırmasını ayrıca yap.",
      "steps": [
        {
          "label": "Normal yol",
          "explanation": "İki taraftan 3x çıkar, ardından 2 ekle.",
          "expression": "3x−2=12 → 3x=14"
        },
        {
          "label": "Kök",
          "explanation": "Son katsayı 3 sıfır değildir.",
          "expression": "x=14/3"
        },
        {
          "label": "Geçerli bölme yolu",
          "explanation": "Bütün iki taraf 3’e bölünürse −2 de üçe bölünür; bu adım geçerlidir.",
          "expression": "2x−2/3=x+4"
        }
      ],
      "answer": "x=14/3; bütün iki tarafı 3’e bölmek geçerli",
      "check": "6×14/3−2=26; 3×14/3+12=26.",
      "pitfall": "2x−2=x+4 yazmak yalnız bazı terimleri bölmüş olur ve geçersizdir."
    },
    {
      "code": "E14",
      "title": "Eksi terimi kaldır",
      "prompt": "7x−9=40 denklemini çöz.",
      "strategy": "İki tarafa 9 ekle.",
      "steps": [
        {
          "label": "Dokuzu ekle",
          "explanation": "−9 etkisi +9 ile kaldırılır.",
          "expression": "7x=49"
        },
        {
          "label": "Yediye böl",
          "explanation": "49/7=7.",
          "expression": "x=7"
        }
      ],
      "answer": "x=7",
      "check": "7×7−9=40.",
      "pitfall": "40−9 yapma; −9’un ters işlemi +9’dur."
    },
    {
      "code": "E15",
      "title": "Önce dağıtmayı tam yap",
      "prompt": "3(2x−5)=x+20 denklemini çöz.",
      "strategy": "3’ü 2x ve −5’in ikisine uygula.",
      "steps": [
        {
          "label": "Dağıt",
          "explanation": "3×2x=6x ve 3×(−5)=−15.",
          "expression": "6x−15=x+20"
        },
        {
          "label": "x’leri ve sabitleri ayır",
          "explanation": "İki taraftan x çıkar ve 15 ekle.",
          "expression": "5x=35"
        },
        {
          "label": "Katsayıyı kaldır",
          "explanation": "5 sıfır olmadığı için bölme yapılır.",
          "expression": "x=7"
        }
      ],
      "answer": "x=7",
      "check": "3(2×7−5)=27; 7+20=27.",
      "pitfall": "3(2x−5)’i 6x−5 diye açmak ilk hatadır."
    },
    {
      "code": "E16",
      "title": "Kesirli çıkarmada ikinci payı birlikte değiştir",
      "prompt": "(x+2)/4−(x−1)/3=1 denklemini çöz.",
      "strategy": "İki tarafı 12 ile çarp, eksi işaretini ikinci parantezle birlikte tut.",
      "steps": [
        {
          "label": "Ortak kat",
          "explanation": "12/4=3, 12/3=4.",
          "expression": "3(x+2)−4(x−1)=12"
        },
        {
          "label": "Dağıt",
          "explanation": "−4×(−1)=+4.",
          "expression": "3x+6−4x+4=12"
        },
        {
          "label": "Topla ve çöz",
          "explanation": "Son adımda iki taraf −1’e bölünür.",
          "expression": "−x+10=12 → −x=2 → x=−2"
        }
      ],
      "answer": "x=−2",
      "check": "İlk kesirler 0/4 ve −3/3; 0−(−1)=1.",
      "pitfall": "İkinci paya eksi dağıtılırken +4’ü −4 yazma."
    },
    {
      "code": "E17",
      "title": "Bir değer bulmak yerine küme belirle",
      "prompt": "5(x−2)=5x−10 denkleminin çözüm kümesini bul.",
      "strategy": "Sol tarafı açıp iki tarafın aynı olduğunu göster.",
      "steps": [
        {
          "label": "Dağıt",
          "explanation": "Bütün terimler aynı.",
          "expression": "5x−10=5x−10"
        },
        {
          "label": "Çıkar",
          "explanation": "Her gerçek x başlangıç eşitliğini sağlar.",
          "expression": "0=0"
        }
      ],
      "answer": "ÇK=ℝ",
      "check": "x=0 yalnız bir örnek; 5x−10 ifadesinin iki tarafta aynı olması bütün değerleri kapsar.",
      "pitfall": "Cevap {0} değildir; bu yalnız çözümlerin küçük bir alt kümesidir."
    },
    {
      "code": "E18",
      "title": "Üçte biri alındıktan sonra ekle",
      "prompt": "Bir sayının üçte birinin 4 fazlası 11’dir. Sayıyı bul.",
      "strategy": "Dilimlenen niceliğin x olduğunu belirle.",
      "steps": [
        {
          "label": "Model",
          "explanation": "4 ekleme üçte birden sonra yapılır.",
          "expression": "x/3+4=11"
        },
        {
          "label": "Dördü çıkar",
          "explanation": "İki taraftan 4 çıkarılır.",
          "expression": "x/3=7"
        },
        {
          "label": "Üçle çarp",
          "explanation": "Paydadaki 3 sıfır değildir.",
          "expression": "x=21"
        }
      ],
      "answer": "21",
      "check": "21/3+4=7+4=11.",
      "pitfall": "(x+4)/3 yazarsan başka bir cümleyi modelliyorsun."
    },
    {
      "code": "E19",
      "title": "Örüntüde başlangıç artış değildir",
      "prompt": "İlk terimi 5 olan bir örüntü her adımda 4 artıyor. Terim 69 olduğunda adım kaçtır?",
      "strategy": "n−1 geçiş olduğunu başta yaz.",
      "steps": [
        {
          "label": "Model",
          "explanation": "İlk değer 5, her geçiş 4 ekler.",
          "expression": "5+4(n−1)=69"
        },
        {
          "label": "Başlangıcı çıkar",
          "explanation": "İki taraftan 5 çıkarılır.",
          "expression": "4(n−1)=64"
        },
        {
          "label": "Geçiş ve adım",
          "explanation": "16 geçiş için 17 adım vardır.",
          "expression": "n−1=16 → n=17"
        }
      ],
      "answer": "17. adım",
      "check": "5+4×16=69; n=1 koyunca 5 çıkar.",
      "pitfall": "4n+5 yazmak ilk adımı 9 yapar ve bir adım kaydırır."
    },
    {
      "code": "E20",
      "title": "Bilinen fiyat farkını her bilete uygula",
      "prompt": "İki yetişkin ve üç öğrenci bileti 390 TL. Yetişkin bileti öğrenci biletinden 45 TL pahalıdır. Öğrenci bileti kaç TL?",
      "strategy": "s öğrenci fiyatı olsun; yetişkin s+45 olur.",
      "steps": [
        {
          "label": "Model",
          "explanation": "İki yetişkinin her birinin farkı 45 TL’dir.",
          "expression": "2(s+45)+3s=390"
        },
        {
          "label": "Dağıt",
          "explanation": "2×45=90.",
          "expression": "5s+90=390"
        },
        {
          "label": "Çöz",
          "explanation": "İki taraftan 90 çıkar, 5’e böl.",
          "expression": "5s=300 → s=60"
        }
      ],
      "answer": "60 TL",
      "check": "Yetişkin 105 TL; 2×105+3×60=390 TL.",
      "pitfall": "Toplam farkı 45 sanmak yetişkin adedini unutmak olur."
    },
    {
      "code": "E21",
      "title": "Başlangıç değişince tam sayı adımı kalıyor mu?",
      "prompt": "İlk terim 2, sabit artış 3 olan örüntüde tam olarak 241 değerine ulaşılan pozitif tam sayı adımı var mı?",
      "strategy": "Modeli değiştirdikten sonra n’nin sayı alanını denetle.",
      "steps": [
        {
          "label": "Doğru başlangıç",
          "explanation": "İlk adım artık 2’dir.",
          "expression": "2+3(n−1)=241"
        },
        {
          "label": "Cebirsel aday",
          "explanation": "Bölme doğru ama sonuç tam sayı değil.",
          "expression": "3n−1=241 → n=242/3"
        },
        {
          "label": "Adım koşulu",
          "explanation": "Bu modelde hedef 241’e tam bir adımda ulaşılmaz.",
          "expression": "242/3∉pozitif tam sayılar"
        }
      ],
      "answer": "Pozitif tam sayı adımı yok",
      "check": "80. adım 239, 81. adım 242; aralarında 241 bulunur ama adım numarası kesirli olamaz.",
      "pitfall": "242/3’ü 81’e yuvarlayıp eşitliğin sağlandığını sanma."
    },
    {
      "code": "E22",
      "title": "Katlanma örüntüsünü doğrusal modelden ayır",
      "prompt": "Yeni katman adedi 1,2,4,… olan iki katlanmalı modelde ilk 12 katmanın toplamı ile ilk 10 katmanın toplamı arasındaki farkı bul.",
      "strategy": "İlk 10 ortak katmanı çıkar; kalan iki katmanı say.",
      "steps": [
        {
          "label": "Katman kuralı",
          "explanation": "İlk katman 2⁰=1, ikinci 2¹=2, üçüncü 2²=4.",
          "expression": "k. katmanda 2^(k−1)"
        },
        {
          "label": "Ortak kısmı kaldır",
          "explanation": "11. ve 12. katman kalır; bütün toplamı ayrıca hesaplamak gerekmez.",
          "expression": "T₁₂−T₁₀=2¹⁰+2¹¹"
        },
        {
          "label": "Ortak çarpan",
          "explanation": "2¹¹=2×2¹⁰ olduğundan ortak çarpan çıkarılır.",
          "expression": "2¹⁰(1+2)=3×2¹⁰=3072"
        }
      ],
      "answer": "3072",
      "check": "İlk üç katman 1+2+4=7; sabit +3 artış modeli bu veriyi sağlamaz.",
      "pitfall": "Bu özgün sayı modeli resmî şeklin yeniden basımı değildir; sabit artıştaki 81 sonucunu buraya taşıma."
    },
    {
      "code": "E23",
      "title": "Aday kökü başlangıç alanından geçir",
      "prompt": "(x−1)/(x−1)=2 denklemini gerçek sayılarda çöz.",
      "strategy": "Önce paydayı sıfır yapan değeri çıkar.",
      "steps": [
        {
          "label": "Alan",
          "explanation": "Payda 0 olamaz.",
          "expression": "x≠1"
        },
        {
          "label": "İzinli alanda çarp",
          "explanation": "Çarpma yalnız x−1≠0 iken tersinirdir.",
          "expression": "x−1=2x−2 → x=1"
        },
        {
          "label": "Adayı ele",
          "explanation": "Başlangıç ifadesi 0/0 olur; bir çözüm değildir.",
          "expression": "x=1 yasak"
        }
      ],
      "answer": "ÇK=∅",
      "check": "İzinli her x için sol taraf 1’dir; 2 olamaz.",
      "pitfall": "Sadeleştirme, başlangıçta yasak olan 1’i geri getirmez."
    },
    {
      "code": "E24",
      "title": "Negatif dış katsayıda iki çarpımı da göster",
      "prompt": "−2(x−3)=10 denklemini çöz.",
      "strategy": "−2’yi x ve −3 ile ayrı çarp.",
      "steps": [
        {
          "label": "Dağıt",
          "explanation": "İki negatif çarpan pozitif +6 verir.",
          "expression": "−2x+6=10"
        },
        {
          "label": "Altıyı çıkar",
          "explanation": "İki taraftan 6 çıkar.",
          "expression": "−2x=4"
        },
        {
          "label": "Negatif katsayıya böl",
          "explanation": "Sıfır olmayan −2’ye bölme geçerlidir.",
          "expression": "x=−2"
        }
      ],
      "answer": "x=−2",
      "check": "−2(−2−3)=−2×(−5)=10.",
      "pitfall": "−2(x−3)=−2x−6 açılışı işaret hatasıdır."
    },
    {
      "code": "E25",
      "title": "Bir sözcük parantezi değiştirir",
      "prompt": "Bir sayının 4 fazlasının üçte biri 11 ise sayı kaçtır?",
      "strategy": "Önce x+4 bütününü oluştur; sonra üçe böl.",
      "steps": [
        {
          "label": "Model",
          "explanation": "“4 fazlasının” ifadesi bölünen bütünün x+4 olduğunu söyler.",
          "expression": "(x+4)/3=11"
        },
        {
          "label": "Üçle çarp",
          "explanation": "Paydanın etkisi iki tarafa 3 uygulayarak kaldırılır.",
          "expression": "x+4=33"
        },
        {
          "label": "Dördü çıkar",
          "explanation": "33−4=29.",
          "expression": "x=29"
        }
      ],
      "answer": "29",
      "check": "(29+4)/3=33/3=11.",
      "pitfall": "x/3+4=11 modeli farklı bir cümleye ait olup 21 sonucunu verir."
    },
    {
      "code": "E26",
      "title": "Aynı toplam ile farklı çözüm türü",
      "prompt": "4(x−3)=4x+10 denkleminin çözüm kümesini bul.",
      "strategy": "İki tarafın x katsayısı aynı olduğunda sabitleri karşılaştır.",
      "steps": [
        {
          "label": "Dağıt",
          "explanation": "Solun sabiti −12, sağın sabiti +10.",
          "expression": "4x−12=4x+10"
        },
        {
          "label": "x’leri çıkar",
          "explanation": "Yanlış ve x’ten bağımsız eşitlik kalır.",
          "expression": "−12=10"
        }
      ],
      "answer": "ÇK=∅",
      "check": "Her x için iki taraf arasındaki fark −22’dir; hiç sıfır olmaz.",
      "pitfall": "İki tarafta 4x görülmesi tek başına özdeşlik değildir; sabitler de aynı olmalıdır."
    },
    {
      "code": "E27",
      "title": "İki doğruyu çiz ve ortak noktayı denetle",
      "prompt": "x+y=5 ve x−y=1 doğrularını her biri için iki nokta seçerek çiz. Ortak noktayı bul ve iki denklemde kontrol et.",
      "strategy": "Her denklemde sırayla x=0 ve y=0 yazarak iki nokta bul.",
      "steps": [
        {
          "label": "Birinci doğrunun iki noktasını seç",
          "expression": "(0, 5) ve (5, 0)",
          "explanation": "İki çiftin de bileşenleri toplandığında 5 olur."
        },
        {
          "label": "İkinci doğrunun iki noktasını seç",
          "expression": "(0, −1) ve (1, 0)",
          "explanation": "Her iki çiftte x−y=1. İki ayrı çift ikinci doğrunun yönünü belirler."
        },
        {
          "label": "Kesişim değerini eşitlikle doğrula",
          "expression": "2x=6, x=3, y=2",
          "explanation": "İki başlangıç denklemini topladığında y gider. x=3 iken ilk koşul y=2 verir."
        }
      ],
      "answer": "Kesişim (3, 2). ÇK={(3, 2)}.",
      "check": "3+2=5 ve 3−2=1. Her iki koşul aynı çiftle sağlanır.",
      "pitfall": "(2, 3) birinci doğru üzerindedir. 2−3=−1 olduğu için ortak nokta değildir."
    },
    {
      "code": "E28",
      "title": "İkinci eşitlikte yerine koy",
      "prompt": "x+y=7 ve 2x−y=5 sistemini yerine koymayla çöz.",
      "strategy": "İlk denklemde y’yi yalnız bırak, bulduğun ifadeyi ikinci denkleme taşı.",
      "steps": [
        {
          "label": "Birinci bağıntıdan y’yi ayır",
          "expression": "y=7−x",
          "explanation": "İlk denklemin iki tarafından x çıkar."
        },
        {
          "label": "İkinci denklemde parantezi aç",
          "expression": "2x−(7−x)=5 → 3x−7=5",
          "explanation": "− işareti hem 7’ye hem −x’e uygulanır. Böylece ikinci x terimi pozitif olur."
        },
        {
          "label": "x’i bul, sonra y’ye dön",
          "expression": "3x=12, x=4, y=7−4=3",
          "explanation": "Birinci eşitlik kalan bilinmeyenin değerini belirler."
        }
      ],
      "answer": "ÇK={(4, 3)}.",
      "check": "4+3=7 ve 2×4−3=5.",
      "pitfall": "y=7−x’i tekrar ilk denkleme koyunca 7=7 çıkar. Bu işlem ikinci koşulu kullanmaz."
    },
    {
      "code": "E29",
      "title": "Bütün denklemi çarp ve zıt katsayıları topla",
      "prompt": "2x+3y=12 ve 3x−2y=5 sistemini y terimini yok ederek çöz.",
      "strategy": "3 ile −2’nin büyüklüğünü aynı sayı yap. Çarpanı sağ tarafa da uygula.",
      "steps": [
        {
          "label": "İlk satırı 2, ikinciyi 3 ile çarp",
          "expression": "4x+6y=24 ve 9x−6y=15",
          "explanation": "Her eşitliğin iki tarafı kendi çarpanıyla değiştirilir."
        },
        {
          "label": "Satırları topla",
          "expression": "13x=39, x=3",
          "explanation": "6y ile −6y birbirini götürür. Sağ tarafta 24 ile 15 toplanır."
        },
        {
          "label": "Korunan bir eşitlikle y’yi bul",
          "expression": "2×3+3y=12, y=2",
          "explanation": "Toplam satırı yalnız x’i verirdi. İlk denklemi sakladığımız için y’yi bulabiliyoruz."
        }
      ],
      "answer": "ÇK={(3, 2)}.",
      "check": "2×3+3×2=12 ve 3×3−2×2=5.",
      "pitfall": "Satırın yalnız y terimini çarpma. Bir denklemi toplama sonucuyla değiştiriyorsan diğerini kaybetme."
    },
    {
      "code": "E30",
      "title": "Eşit katsayıları çıkararak kaldır",
      "prompt": "x+2y=8 ve x−y=2 sistemini çöz. Bu iki satırı toplamanın y’yi neden yok etmediğini de açıkla.",
      "strategy": "İki x katsayısı aynı. İkinci eşitliği bütün olarak ilkinden çıkar.",
      "steps": [
        {
          "label": "İkinci satırı ilkinden çıkar",
          "expression": "(x+2y)−(x−y)=8−2 → 3y=6",
          "explanation": "x−x=0 ve 2y−(−y)=3y olur. İkisini toplamak 2y−y=y bırakır."
        },
        {
          "label": "y’yi sonraki kontrolde kullan",
          "expression": "y=2, x−2=2, x=4",
          "explanation": "Başlangıçtaki ikinci denklem x’i verir."
        }
      ],
      "answer": "ÇK={(4, 2)}.",
      "check": "4+2×2=8 ve 4−2=2.",
      "pitfall": "Bir parantezi çıkarırken parantezdeki bütün terimlerin işareti hesaba katılır."
    },
    {
      "code": "E31",
      "title": "Sabit değişince çakışma ve paralelliği ayır",
      "prompt": "x+y=4 denklemini önce 2x+2y=8, sonra 2x+2y=9 ile ayrı ayrı sistem yap. İki çözüm kümesini karşılaştır. İlk sistemde x ve y negatif olamazsa hangi bölüm kalır?",
      "strategy": "Birinci denklemin iki katını yaz, ikinci denklemle karşılaştır.",
      "steps": [
        {
          "label": "İki eşitlik de 8 verirse",
          "expression": "x+y=4 → 2x+2y=8",
          "explanation": "Aynı doğru iki kez verilir. y=4−x ile her x’e karşılık bir çift vardır."
        },
        {
          "label": "Diğer sabit 9 olursa",
          "expression": "2x+2y=8 ve 2x+2y=9",
          "explanation": "Aynı sol taraf iki farklı değer alamaz. Ortak nokta yoktur."
        },
        {
          "label": "Sayı alanını daralt",
          "expression": "0≤x≤4, y=4−x",
          "explanation": "x ve y negatif değilse aynı doğrunun (0, 4) ile (4, 0) arasındaki parçası kalır."
        }
      ],
      "answer": "İlk sistemin çözümleri aynı doğru üzerinde sonsuzdur. İkinci sistemin çözümü yoktur. Negatif olmayan koşul ilk doğruyu kapalı bir parçaya sınırlar.",
      "check": "(1, 3) ilk sistemde 4 ve 8 verir. (0, 0) ilk sistemi sağlamaz.",
      "pitfall": "Sonsuz çözüm, düzlemdeki her çiftin çözüm olduğu anlamına gelmez."
    },
    {
      "code": "E32",
      "title": "Çapraz katsayı farkıyla tek çözümü bul",
      "prompt": "2x+y=7 ve x−y=2 denklemlerini katsayıların çapraz farkıyla çöz.",
      "strategy": "a=2, b=1, c=7 ve d=1, e=−1, f=2 değerlerini satır sırasıyla yaz.",
      "steps": [
        {
          "label": "Bölmenin tanımlı olduğunu gör",
          "expression": "Δ=2×(−1)−1×1=−3",
          "explanation": "Δ sıfır olmadığı için iki bilinmeyen de tek değere belirlenir."
        },
        {
          "label": "Önce x’i, sonra y’yi hesapla",
          "expression": "x=(7×(−1)−1×2)/(−3)=3; y=(2×2−7×1)/(−3)=1",
          "explanation": "x’in payını y’yi yok eden işlemden, y’nin payını x’i yok eden işlemden bul."
        }
      ],
      "answer": "ÇK={(3, 1)}.",
      "check": "2×3+1=7 ve 3−1=2.",
      "pitfall": "Sağ sabitleri x ve y’nin katsayılarıyla karıştırma. Δ=0 olsaydı bölme yerine çözüm türü denetimi gerekirdi."
    },
    {
      "code": "E33",
      "title": "Parametrede iki sınır durumunu ayrı çöz",
      "prompt": "Gerçek k için kx+2y=6, 2x+ky=6 sistemini çöz. k=2 ve k=−2 için çözüm türünü ayrıca yaz.",
      "strategy": "k−2 veya k+2 ile bölmeden önce bu iki çarpanın ne zaman sıfır olduğunu bul.",
      "steps": [
        {
          "label": "k=2 ile k=−2’yi doğrudan yaz",
          "expression": "k=2 → x+y=3; k=−2 → 0=12",
          "explanation": "k=2 iken iki satır aynı doğrultudadır ve aynı doğruyu verir. k=−2 iken iki satırın toplamı çelişir."
        },
        {
          "label": "Diğer değerlerde önce farkı al",
          "expression": "(k−2)(x−y)=0 → x=y",
          "explanation": "İki satırı çıkar. Bu durumda k−2 sıfır değildir ve bölünebilir."
        },
        {
          "label": "Birinci koşula geri dön",
          "expression": "(k+2)x=6 → x=y=6/(k+2)",
          "explanation": "k+2 de sıfır olmadığı için iki değer belirlenir."
        }
      ],
      "answer": "k=2 iken x+y=3 doğrusu, k=−2 iken ∅, diğer değerlerde tek çift (6/(k+2), 6/(k+2)).",
      "check": "k=1’de (2, 2) iki eşitlikte de 6 verir. Diğer izinli k değerlerinde her sol taraf (k+2)×6/(k+2)=6.",
      "pitfall": "Genel ifadeyi önce bulup k=−2 için 6/0 yazma. k=2’de tek çift seçmek aynı doğru üzerindeki diğer çözümleri atlar."
    },
    {
      "code": "E34",
      "title": "İki alışverişten birim fiyatları çıkar",
      "prompt": "Bir alışverişte 2 defter ve 3 kalem toplam 31 TL. Aynı birim fiyatlarla 3 defter ve 2 kalem 34 TL. Bir defter ve bir kalem kaç TL?",
      "strategy": "Defter fiyatına d, kalem fiyatına k de. Her toplamı ayrı yaz.",
      "steps": [
        {
          "label": "Alışverişleri ayrı eşitlik kur",
          "expression": "2d+3k=31 ve 3d+2k=34",
          "explanation": "Adet ile o ürünün birim fiyatının çarpımı TL cinsinden giderdir."
        },
        {
          "label": "Defter katsayılarını eşitle ve çıkar",
          "expression": "(6d+9k)−(6d+4k)=93−68 → 5k=25",
          "explanation": "İlk denklem üç katına, ikinci denklem iki katına çıkar. Eşit d katsayıları çıkarıldığında kalemin fiyatı belirlenir."
        },
        {
          "label": "Defter fiyatını geri bul",
          "expression": "k=5, 2d+15=31, d=8",
          "explanation": "İlk toplamı 5 TL kalem fiyatıyla kurunca 2 defterin bedeli 16 TL olur."
        }
      ],
      "answer": "Bir defter 8 TL, bir kalem 5 TL.",
      "check": "2×8+3×5=31 TL ve 3×8+2×5=34 TL.",
      "pitfall": "Toplamları ürün adediyle karıştırma. Bu sayılar varsayımsal alıştırma fiyatlarıdır."
    },
    {
      "code": "E35",
      "title": "Bir kökün geçerli, ötekinin yasak olduğunu ayır",
      "prompt": "(x+2)/(x−1)=2 ve (2x−2)/(x−1)=3 denklemlerini ayrı ayrı çöz. Her iki denklem için başlangıç koşulunu yaz.",
      "strategy": "Paydayı sıfır yapan değeri işleme başlamadan ayır.",
      "steps": [
        {
          "label": "İki başlangıç alanını yaz",
          "expression": "x−1≠0 → x≠1",
          "explanation": "Her iki kesirde payda aynıdır."
        },
        {
          "label": "Birinci denklemde payda ile çarp",
          "expression": "x+2=2(x−1) → x=4",
          "explanation": "4 izinli ve 6/3=2 olduğundan geçerli bir köktür."
        },
        {
          "label": "İkinci denklemde adayı ele",
          "expression": "2x−2=3(x−1) → x=1",
          "explanation": "Bu aday başlangıç kesrinin paydasını sıfır yapar. İzinli x’lerde kesir zaten 2 olduğu için 3 olamaz."
        }
      ],
      "answer": "Birinci ÇK={4}, ikinci ÇK=∅.",
      "check": "İzinli 4 birinci eşitliği sağlar. İkinci denklemde yasak 1 denemesi 0/0 üretir.",
      "pitfall": "Payda sadeleştiğinde başlangıçtaki bilginin de silindiğini sanma."
    },
    {
      "code": "E36",
      "title": "Aktarımda toplamı ve farkı ayrı kur",
      "prompt": "A ve B kaplarında toplam 26 L su var. A’dan B’ye 4 L aktarılınca miktarlar eşit oluyor. Başlangıçta her kapta kaç litre vardı?",
      "strategy": "Toplam için başlangıç miktarlarını, eşitlik için aktarım sonrasını kullan.",
      "steps": [
        {
          "label": "Başlangıç miktarlarını yaz",
          "expression": "a+b=26",
          "explanation": "a ve b başlangıçtaki litre miktarlarıdır. Aktarım toplamı değiştirmez."
        },
        {
          "label": "Son durumu denkleme çevir",
          "expression": "a−4=b+4 → a−b=8",
          "explanation": "A’dan 4 L azaldığı sırada B’ye 4 L eklenir."
        },
        {
          "label": "İki eşitliği birleştir",
          "expression": "2a=34, a=17, b=9",
          "explanation": "Toplama, b’yi yok eder. İlk toplamdan b=9 elde edilir."
        }
      ],
      "answer": "A’da 17 L, B’de 9 L vardı.",
      "check": "17−4=13 ve 9+4=13. Son toplam 26 L, A’da aktarım için yeterli su var.",
      "pitfall": "Aktarım miktarı 4 L’dir ama başlangıç farkı 8 L’dir. Biri azalırken öteki artar."
    },
    {
      "code": "E37",
      "title": "Prova çözümlerini sırayla aç",
      "prompt": "Provanın 14 sorusunu ve iki kısa başlangıcı denediysen her çözümü sırayla aç.",
      "strategy": "Kendi ilk adımını yazdıktan sonra ilk farklı satırı bul. Bir yöntem farklı olsa da ilk denklemleri koruyorsa geçerli olabilir.",
      "steps": [
        {
          "label": "1. soru",
          "explanation": "İki tarafa 9 ekle. 7x=49. 7’ye böl. Denetim 7×7−9=40. x=7."
        },
        {
          "label": "2. soru",
          "explanation": "Dağıtınca 6x−15=x+20 olur. İki taraftan x çıkar, 15 ekle. 5x=35, x=7. Sol 3(14−5)=27, sağ 7+20=27. x=7."
        },
        {
          "label": "3. soru",
          "explanation": "4 ve 3’ün ortak katı olan 12 ile iki tarafı çarp. 3(x+2)−4(x−1)=12. İkinci payın tamamını çıkar. −x+10=12, x=−2. Denetim 0/4−(−3)/3=1. x=−2."
        },
        {
          "label": "4. soru",
          "explanation": "Solda 5x−10 elde edilir ve iki taraf aynı ifadeye dönüşür. İki taraftan 5x−10 çıkarınca 0=0 kalır. Bütün gerçek sayılar koşulu sağlar. ÇK=ℝ."
        },
        {
          "label": "5. soru",
          "explanation": "Önce üçte biri, sonra 4 fazlası. x/3+4=11. 4 çıkarınca x/3=7. Üçle çarpınca x=21. Denetim 21/3+4=11. 21."
        },
        {
          "label": "6. soru",
          "explanation": "İlk terimde henüz artış yok. n. terim 5+4(n−1). 5+4(n−1)=69, 4(n−1)=64, n=17. 16 geçişte 16×4 artar ve 5+64=69. 17. sıra."
        },
        {
          "label": "7. soru",
          "explanation": "Öğrenci s TL ise yetişkin s+45 TL. 2(s+45)+3s=390. 5s+90=390, 5s=300, s=60. Yetişkin 105 TL. 2×105+3×60=390 ve fark 45 TL. 60 TL."
        },
        {
          "label": "8. soru",
          "explanation": "y ve −y’yi yok etmek için iki satırı topla. 3x=15. x=5’i ilk denklemde kullan. y=8−5=3. 5+3=8 ve 2×5−3=7. ÇK={(5, 3)}."
        },
        {
          "label": "9. soru",
          "explanation": "İlk eşitliği ikiyle çarpınca 2x−4y=6. Birinci sistemde bu, diğer eşitliğin aynısıdır. Birinci sistemin her çözümü x=3+2y doğrusu üzerindedir. Örneğin (3, 0) ve (5, 1) çözüm, (0, 0) çözüm değildir. İkinci sistem aynı sol tarafın 6 ve 7 olmasını ister. Bu çelişki ortak çifti eler. İlkinde x=3+2y doğrusu üzerinde sonsuz çift. İkincide ∅."
        },
        {
          "label": "10. soru",
          "explanation": "x=2’de payda sıfır. Yalnız x≠2 için payda ile çarpılabilir. 3x−6=4x−8, aday x=2. Başlangıçta yasak olduğu için elenir. İzinli her x’te kesir 3(x−2)/(x−2)=3 olur. Bu yüzden 4 olamaz. x≠2. ÇK=∅."
        },
        {
          "label": "11. soru",
          "explanation": "t tam, s indirimli fiyat olsun. 2t+3s=230 ve 3t+2s=270. İlk eşitliği 3, ikincisini 2 ile çarp. İlkinden ikinciyi çıkar: 5s=150, s=30. 2t+90=230 olduğundan t=70. Her iki toplam 140+90=230 ve 210+60=270. Tam 70 TL, indirimli 30 TL."
        },
        {
          "label": "12. soru",
          "explanation": "Sol taraf 4x+12 olur. Aynı ifade iki tarafta bulunur. Kalan 0=0 bütün gerçek sayılar için doğrudur. 0 bir çözümdür, 1 ve −5 de çözümdür. ÇK=ℝ."
        },
        {
          "label": "13. soru",
          "explanation": "Toplayınca 2x=8, x=4. x+y=6’da y=2. 4+2=6 ve 4−2=2. İki eşitlik aynı çifti kabul eder. x=0 seçince y=6. y=0 seçince x=6. İkisi de ilk doğru üzerinde. Kesişim (4, 2). Örnek iki ayrı nokta (0, 6) ve (6, 0)."
        },
        {
          "label": "14. soru",
          "explanation": "a ve b başlangıç litreleri. a+b=18. Aktarım sonrası a−3=b+3, dolayısıyla a−b=6. a en az 3 L olmalı. İki eşitliği topla. 2a=24, a=12 ve b=6. 12−3=9, 6+3=9. Toplam 9+9=18 L. A başlangıç 12 L, B başlangıç 6 L. Aktarımdan sonra toplam 18 L."
        },
        {
          "label": "İlk kısa başlangıç",
          "explanation": "İki taraftan 2x çıkar. 2x+7=19. 7 çıkarınca 2x=12, 2’ye bölünce x=6. 4×6+7=31 ve 2×6+19=31. Boşluklar 2x, 7, 2. x=6."
        },
        {
          "label": "İkinci kısa başlangıç",
          "explanation": "İki denklemi topla. Sağda 9+3=12, solda y−y=0 ve 3x. 3x=12 ile x=4. İlk eşitliğe dön, y=9−4=5. 4+5=9 ve 2×4−5=3. Boşluklar 3, 4, 5. ÇK={(4, 5)}."
        }
      ],
      "answer": "Her çözümün ilk denklem, sayı alanı ve birim koşullarını karşılaştır.",
      "check": "Çözüm türü sorusunda tek bir örnek çift yerine bütün kümeyi belirttiğini kontrol et.",
      "pitfall": "Yalnız son sayıyı kontrol etmek, yanlış yöntem veya unutulan tanım koşulunu gizleyebilir."
    }
  ],
  "recall": [
    {
      "prompt": "2x+3 tek başına neden denklem değildir?",
      "answer": "İki ifade arasında eşitlik ilişkisi yoktur. 2x+3=11 ise bir denklemdir."
    },
    {
      "prompt": "Ax=B’de bölmeden önce hangi üç türü ayırırsın?",
      "answer": "A≠0: tek kök B/A. A=0, B=0: bütün izinli değerler. A=0, B≠0: hiç çözüm yok."
    },
    {
      "prompt": "“Karşıya geçince işaret değişti”nin açık işlemi nedir?",
      "answer": "Aynı terimi iki taraftan çıkarmak veya iki tarafa eklemektir."
    },
    {
      "prompt": "0 ile çarpmak neden eşdeğer çözüm adımı değildir?",
      "answer": "Bilgi kaybettirir: x=1’den 0=0 çıkar; yeni eşitlik x=2’yi de kabul eder."
    },
    {
      "prompt": "−2(x−3) neden −2x+6 olur?",
      "answer": "−2 her iki terimi çarpar; (−2)×(−3)=+6."
    },
    {
      "prompt": "Kökü neden ilk denklemde denetlersin?",
      "answer": "Erken parantez veya işaret hatasını son yanlış satır gizleyebilir; başlangıçtaki iki tarafın gerçek eşitliği sınanır."
    },
    {
      "prompt": "(x+3)/2 ile x+3/2 arasındaki fark nedir?",
      "answer": "İlkinde x+3 bütünü ikiye bölünür; ikincisinde yalnız 3 bölünür."
    },
    {
      "prompt": "Kesirli denklem 6 ile çarpıldığında hangi terimler etkilenir?",
      "answer": "Her iki tarafın tamamı; soldaki her terim ve sağdaki bütün ifade."
    },
    {
      "prompt": "Özdeşlikte ÇK neden yalnız {0} değildir?",
      "answer": "0 bir örnektir; iki ifade her izinli değişkende aynı olduğundan bütün alan çözümdür."
    },
    {
      "prompt": "k−2’ye bölmeden önce neyi incelersin?",
      "answer": "k=2 durumunu ayırırsın; sıfıra bölünmez ve bu durum özdeşlik verebilir."
    },
    {
      "prompt": "Bir sayının 4 fazlasının üçte birini nasıl yazarsın?",
      "answer": "(x+4)/3; x/3+4 farklı sözcük sırasıdır."
    },
    {
      "prompt": "12 kişinin yetişkini x ise öğrenci sayısı nedir?",
      "answer": "12−x; iki grubun toplamı 12 korunur."
    },
    {
      "prompt": "İlk adımdan n. adıma kaç geçiş vardır?",
      "answer": "n−1; n=1’de 0 geçiş, doğru ilk terimi verir."
    },
    {
      "prompt": "İlk 2, artış +3, hedef 241 için n=242/3 neden kabul edilmez?",
      "answer": "Adım numarası pozitif tam sayı olmalı; yuvarlamak hedef eşitliğini bozar."
    },
    {
      "prompt": "6x−2=3x+12’nin bütün iki tarafını 3’e bölmek yasak mı?",
      "answer": "Hayır; doğru yeni eşitlik 2x−2/3=x+4. Yalnız seçilmiş 6x terimini bölmek yanlıştır."
    },
    {
      "prompt": "Sadeleşen paydanın yasak değeri sonradan geri gelir mi?",
      "answer": "Hayır; başlangıçtaki paydanın 0 olamama koşulu bütün çözüm boyunca korunur."
    },
    {
      "prompt": "1,2,4 katmanları neden +3 sabit artış modeliyle çözülmez?",
      "answer": "Farklar 1 ve 2; sabit artış yok. Ardışık oran 2, ikiye katlanma var; resmî 2024 sorusu da bu ayrımı gerektirir."
    },
    {
      "prompt": "Bir yöntem daha az satırsa her zaman daha iyi midir?",
      "answer": "Hayır; bütün terim, tanım koşulu, sayı alanı ve ilk denklem kontrolünü korumalıdır. Kişisel hız etkisi ayrıca ölçülür."
    },
    {
      "prompt": "Bir çift yalnız bir denklemi sağlıyorsa sistem niçin henüz çözülmüş sayılmaz?",
      "answer": "Sistem bütün denklemlerin aynı x ve y değerleriyle birlikte sağlanmasını ister. Öteki eşitliği ayrıca kontrol et."
    },
    {
      "prompt": "Bir doğru için eksen kesişimleri aynı nokta çıkarsa ne yaparsın?",
      "answer": "Başka bir x veya y seçip ikinci bir çözüm çifti bulursun. Örneğin x+y=0 için (0, 0) yanında (1, −1)."
    },
    {
      "prompt": "Yerine koyarken eşit ifadeyi hangi denkleme yazarsın?",
      "answer": "İfadeyi çıkardığın denklemi sakla ve öteki başlangıç denkleminde kullan. Sonra saklanan eşitlikle kalan değeri bul."
    },
    {
      "prompt": "İki denklemin y katsayıları eşit veya zıt ise hangi işlem yapabilirsin?",
      "answer": "Eşit katsayıları çıkararak, zıt ve eşit büyüklükte olanları toplayarak yok edebilirsin. Sağ taraflara da aynı işlemi uygula."
    },
    {
      "prompt": "Yok etme sonunda tek denklem kalınca öteki satırı neden saklarsın?",
      "answer": "Tek kalan denklem genellikle yalnız bir bilinmeyeni belirler. Öteki değeri geri bulmak için başlangıç denklemlerinden birini kullan."
    },
    {
      "prompt": "Çakışan iki doğru bütün düzlemde çözüm verir mi?",
      "answer": "Hayır. Her çözüm ortak doğrunun üzerindedir. Örneğin x+y=4 doğrusu için (0, 0) çözüm değildir."
    },
    {
      "prompt": "kx+2y=6 ve 2x+ky=6 sisteminde hangi k değerlerini önce ayırırsın?",
      "answer": "k=2’de aynı doğru ve sonsuz çözüm, k=−2’de 0=12 çelişkisi. Diğer değerlerde x=y=6/(k+2)."
    },
    {
      "prompt": "Bir miktar A’dan B’ye taşındığında hangi iki satır yazılır?",
      "answer": "Toplam korunuyorsa ilk toplamı ayrı yaz. A’dan götürülen miktarı çıkar ve B’ye ekle. Son iki miktarın ilişkisini ikinci eşitlikte kur."
    }
  ],
  "items": [
    {
      "code": "Q01",
      "prompt": "x gerçek sayı olmak üzere 5x−7=18 denkleminin kökü kaçtır?",
      "options": [
        "5",
        "11/5",
        "18/5",
        "-5",
        "25"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "İki tarafa 7 ekle.",
      "steps": [
        "5x−7+7=18+7 → 5x=25.",
        "5 sıfır değil; iki tarafı 5’e böl: x=5."
      ],
      "optionReasons": [
        "x=5 için ilk eşitliğin sol tarafı 18, sağ tarafı 18 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=11/5 için ilk eşitliğin sol tarafı 4, sağ tarafı 18 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=18/5 için ilk eşitliğin sol tarafı 11, sağ tarafı 18 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-5 için ilk eşitliğin sol tarafı -32, sağ tarafı 18 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=25 için ilk eşitliğin sol tarafı 118, sağ tarafı 18 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "−7’yi kaldırırken 18−7 yapma.",
      "check": "x=5 ilk denkleme yazılınca sol=18, sağ=18; eşitlik sağlanır."
    },
    {
      "code": "Q02",
      "prompt": "x gerçek sayı olmak üzere 3x+6=24 denkleminin kökü kaçtır?",
      "options": [
        "6",
        "10",
        "8",
        "18",
        "2"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "İki taraftan 6 çıkar.",
      "steps": [
        "3x+6−6=24−6 → 3x=18.",
        "İki tarafı 3’e böl: x=6."
      ],
      "optionReasons": [
        "x=6 için ilk eşitliğin sol tarafı 24, sağ tarafı 24 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=10 için ilk eşitliğin sol tarafı 36, sağ tarafı 24 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=8 için ilk eşitliğin sol tarafı 30, sağ tarafı 24 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=18 için ilk eşitliğin sol tarafı 60, sağ tarafı 24 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=2 için ilk eşitliğin sol tarafı 12, sağ tarafı 24 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "Sağdaki 24’ü değiştirmeden soldaki +6’yı silme.",
      "check": "x=6 ilk denkleme yazılınca sol=24, sağ=24; eşitlik sağlanır."
    },
    {
      "code": "Q03",
      "prompt": "x gerçek sayı olmak üzere 4(x−3)=2x+10 denkleminin kökü kaçtır?",
      "options": [
        "11",
        "13/2",
        "-1",
        "5",
        "22"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "4’ü parantezdeki iki terime de dağıt.",
      "steps": [
        "4x−12=2x+10.",
        "İki taraftan 2x çıkar: 2x−12=10.",
        "İki tarafa 12 ekle: 2x=22; ikiye böl: x=11."
      ],
      "optionReasons": [
        "x=11 için ilk eşitliğin sol tarafı 32, sağ tarafı 32 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=13/2 için ilk eşitliğin sol tarafı 14, sağ tarafı 23 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-1 için ilk eşitliğin sol tarafı -16, sağ tarafı 8 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=5 için ilk eşitliğin sol tarafı 8, sağ tarafı 20 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=22 için ilk eşitliğin sol tarafı 76, sağ tarafı 54 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "4(x−3)’ü 4x−3 yazma.",
      "check": "x=11 ilk denkleme yazılınca sol=32, sağ=32; eşitlik sağlanır."
    },
    {
      "code": "Q04",
      "prompt": "x gerçek sayı olmak üzere (x−1)/3+(x+2)/2=6 denkleminin kökü kaçtır?",
      "options": [
        "32/5",
        "6",
        "4",
        "36/5",
        "-32/5"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "İki tarafın tamamını 6 ile çarp.",
      "steps": [
        "2(x−1)+3(x+2)=36.",
        "2x−2+3x+6=36 → 5x+4=36.",
        "5x=32 → x=32/5."
      ],
      "optionReasons": [
        "x=32/5 için ilk eşitliğin sol tarafı 6, sağ tarafı 6 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=6 için ilk eşitliğin sol tarafı 17/3, sağ tarafı 6 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=4 için ilk eşitliğin sol tarafı 4, sağ tarafı 6 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=36/5 için ilk eşitliğin sol tarafı 20/3, sağ tarafı 6 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-32/5 için ilk eşitliğin sol tarafı -14/3, sağ tarafı 6 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "Sadece paydaları silip sağdaki 6’yı aynı bırakma.",
      "check": "x=32/5 ilk denkleme yazılınca sol=6, sağ=6; eşitlik sağlanır."
    },
    {
      "code": "Q05",
      "prompt": "x gerçek sayı olmak üzere 7x−9=40 denkleminin kökü kaçtır?",
      "options": [
        "7",
        "31/7",
        "40/7",
        "49",
        "-7"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "İki tarafa 9 ekle.",
      "steps": [
        "7x=49.",
        "İki tarafı 7’ye böl: x=7."
      ],
      "optionReasons": [
        "x=7 için ilk eşitliğin sol tarafı 40, sağ tarafı 40 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=31/7 için ilk eşitliğin sol tarafı 22, sağ tarafı 40 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=40/7 için ilk eşitliğin sol tarafı 31, sağ tarafı 40 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=49 için ilk eşitliğin sol tarafı 334, sağ tarafı 40 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-7 için ilk eşitliğin sol tarafı -58, sağ tarafı 40 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "−9’un ters etkisini +9 ile kaldır.",
      "check": "x=7 ilk denkleme yazılınca sol=40, sağ=40; eşitlik sağlanır."
    },
    {
      "code": "Q06",
      "prompt": "x gerçek sayı olmak üzere 3(2x−5)=x+20 denkleminin kökü kaçtır?",
      "options": [
        "7",
        "5",
        "1",
        "25/6",
        "35"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Önce 3’ü 2x ve −5 ile ayrı çarp.",
      "steps": [
        "6x−15=x+20.",
        "İki taraftan x çıkar, 15 ekle: 5x=35.",
        "İki tarafı 5’e böl: x=7."
      ],
      "optionReasons": [
        "x=7 için ilk eşitliğin sol tarafı 27, sağ tarafı 27 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=5 için ilk eşitliğin sol tarafı 15, sağ tarafı 25 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=1 için ilk eşitliğin sol tarafı -9, sağ tarafı 21 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=25/6 için ilk eşitliğin sol tarafı 10, sağ tarafı 145/6 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=35 için ilk eşitliğin sol tarafı 195, sağ tarafı 55 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "3(2x−5)’i 6x−5 yazmak dağıtma hatasıdır.",
      "check": "x=7 ilk denkleme yazılınca sol=27, sağ=27; eşitlik sağlanır."
    },
    {
      "code": "Q07",
      "prompt": "x gerçek sayı olmak üzere (x+2)/4−(x−1)/3=1 denkleminin kökü kaçtır?",
      "options": [
        "-2",
        "2",
        "-10",
        "10",
        "2/3"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "İki tarafı 12 ile çarp; ikinci payın başındaki eksiyi koru.",
      "steps": [
        "3(x+2)−4(x−1)=12.",
        "3x+6−4x+4=12 → −x+10=12.",
        "−x=2 → x=−2."
      ],
      "optionReasons": [
        "x=-2 için ilk eşitliğin sol tarafı 1, sağ tarafı 1 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=2 için ilk eşitliğin sol tarafı 2/3, sağ tarafı 1 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-10 için ilk eşitliğin sol tarafı 5/3, sağ tarafı 1 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=10 için ilk eşitliğin sol tarafı 0, sağ tarafı 1 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=2/3 için ilk eşitliğin sol tarafı 7/9, sağ tarafı 1 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "−4(x−1) açılımındaki +4’ü −4 yapma.",
      "check": "x=-2 ilk denkleme yazılınca sol=1, sağ=1; eşitlik sağlanır."
    },
    {
      "code": "Q08",
      "prompt": "x gerçek sayı olmak üzere −2(x−3)=10 denkleminin kökü kaçtır?",
      "options": [
        "-2",
        "-8",
        "2",
        "8",
        "-5"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Dağıtmada (−2)×(−3)=+6 olduğunu yaz.",
      "steps": [
        "−2x+6=10.",
        "İki taraftan 6 çıkar: −2x=4.",
        "İki tarafı −2’ye böl: x=−2."
      ],
      "optionReasons": [
        "x=-2 için ilk eşitliğin sol tarafı 10, sağ tarafı 10 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=-8 için ilk eşitliğin sol tarafı 22, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=2 için ilk eşitliğin sol tarafı 2, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=8 için ilk eşitliğin sol tarafı -10, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-5 için ilk eşitliğin sol tarafı 16, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "Negatif dış katsayı sadece x’i değil her terimi çarpar.",
      "check": "x=-2 ilk denkleme yazılınca sol=10, sağ=10; eşitlik sağlanır."
    },
    {
      "code": "Q09",
      "prompt": "Bir sayının 4 katının 7 fazlası, aynı sayının 2 katının 19 fazlasına eşittir. Sayı kaçtır?",
      "options": [
        "6",
        "13",
        "3",
        "12",
        "-6"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Aynı sayıyı iki tarafta da x ile göster: 4x+7=2x+19.",
      "steps": [
        "İki taraftan 2x çıkar: 2x+7=19.",
        "İki taraftan 7 çıkar: 2x=12.",
        "İkiye böl: x=6."
      ],
      "optionReasons": [
        "x=6 için ilk eşitliğin sol tarafı 31, sağ tarafı 31 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=13 için ilk eşitliğin sol tarafı 59, sağ tarafı 45 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=3 için ilk eşitliğin sol tarafı 19, sağ tarafı 25 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=12 için ilk eşitliğin sol tarafı 55, sağ tarafı 43 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-6 için ilk eşitliğin sol tarafı -17, sağ tarafı 7 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "19+7=26 yapma; +7 etkisini iki taraftan 7 çıkararak kaldır.",
      "check": "x=6 ilk denkleme yazılınca sol=31, sağ=31; eşitlik sağlanır."
    },
    {
      "code": "Q10",
      "prompt": "Bir sayının üçte birinin 4 fazlası 11’dir. Bu sayı kaçtır?",
      "options": [
        "21",
        "29",
        "5",
        "33",
        "15"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Üçte biri alınan nicelik sayının kendisi: x/3+4=11.",
      "steps": [
        "x/3=7.",
        "İki tarafı 3 ile çarp: x=21."
      ],
      "optionReasons": [
        "x=21 için ilk eşitliğin sol tarafı 11, sağ tarafı 11 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=29 için ilk eşitliğin sol tarafı 41/3, sağ tarafı 11 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=5 için ilk eşitliğin sol tarafı 17/3, sağ tarafı 11 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=33 için ilk eşitliğin sol tarafı 15, sağ tarafı 11 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=15 için ilk eşitliğin sol tarafı 9, sağ tarafı 11 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "(x+4)/3 başka bir sözel ifadenin modelidir.",
      "check": "x=21 ilk denkleme yazılınca sol=11, sağ=11; eşitlik sağlanır."
    },
    {
      "code": "Q11",
      "prompt": "Bir sayının 4 fazlasının üçte biri 11’dir. Bu sayı kaçtır?",
      "options": [
        "29",
        "21",
        "37",
        "7/3",
        "33"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Önce x+4’ün tamamını üçe böl: (x+4)/3=11.",
      "steps": [
        "İki tarafı 3 ile çarp: x+4=33.",
        "İki taraftan 4 çıkar: x=29."
      ],
      "optionReasons": [
        "x=29 için ilk eşitliğin sol tarafı 11, sağ tarafı 11 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=21 için ilk eşitliğin sol tarafı 25/3, sağ tarafı 11 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=37 için ilk eşitliğin sol tarafı 41/3, sağ tarafı 11 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=7/3 için ilk eşitliğin sol tarafı 19/9, sağ tarafı 11 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=33 için ilk eşitliğin sol tarafı 37/3, sağ tarafı 11 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "Üçte bir almayı yalnız x’e uygulayıp +4’ü dışarıda bırakma.",
      "check": "x=29 ilk denkleme yazılınca sol=11, sağ=11; eşitlik sağlanır."
    },
    {
      "code": "Q12",
      "prompt": "Bir sayının 3 katının 5 fazlası 20’dir. Sayı kaçtır?",
      "options": [
        "5",
        "5/3",
        "25/3",
        "15",
        "0"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Cümleyi 3x+5=20 olarak kur.",
      "steps": [
        "İki taraftan 5 çıkar: 3x=15.",
        "İki tarafı 3’e böl: x=5."
      ],
      "optionReasons": [
        "x=5 için ilk eşitliğin sol tarafı 20, sağ tarafı 20 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=5/3 için ilk eşitliğin sol tarafı 10, sağ tarafı 20 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=25/3 için ilk eşitliğin sol tarafı 30, sağ tarafı 20 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=15 için ilk eşitliğin sol tarafı 50, sağ tarafı 20 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=0 için ilk eşitliğin sol tarafı 5, sağ tarafı 20 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "“5 fazlasının 3 katı” denmediği için 3(x+5) yazma.",
      "check": "x=5 ilk denkleme yazılınca sol=20, sağ=20; eşitlik sağlanır."
    },
    {
      "code": "Q13",
      "prompt": "Bir sayının 5 fazlasının 3 katı 30’dur. Sayı kaçtır?",
      "options": [
        "5",
        "25/3",
        "15",
        "10",
        "-5"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Üçle çarpılan bütün x+5’tir: 3(x+5)=30.",
      "steps": [
        "İki tarafı 3’e böl: x+5=10.",
        "İki taraftan 5 çıkar: x=5."
      ],
      "optionReasons": [
        "x=5 için ilk eşitliğin sol tarafı 30, sağ tarafı 30 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=25/3 için ilk eşitliğin sol tarafı 40, sağ tarafı 30 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=15 için ilk eşitliğin sol tarafı 60, sağ tarafı 30 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=10 için ilk eşitliğin sol tarafı 45, sağ tarafı 30 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-5 için ilk eşitliğin sol tarafı 0, sağ tarafı 30 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "3x+5 modeli bu cümledeki parantezi kaybettirir.",
      "check": "x=5 ilk denkleme yazılınca sol=30, sağ=30; eşitlik sağlanır."
    },
    {
      "code": "Q14",
      "prompt": "Bir sayının yarısının 4 eksiği 7’dir. Sayı kaçtır?",
      "options": [
        "22",
        "18",
        "6",
        "14",
        "3"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Yarıdan sonra 4 çıkarılır: x/2−4=7.",
      "steps": [
        "İki tarafa 4 ekle: x/2=11.",
        "İki tarafı 2 ile çarp: x=22."
      ],
      "optionReasons": [
        "x=22 için ilk eşitliğin sol tarafı 7, sağ tarafı 7 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=18 için ilk eşitliğin sol tarafı 5, sağ tarafı 7 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=6 için ilk eşitliğin sol tarafı -1, sağ tarafı 7 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=14 için ilk eşitliğin sol tarafı 3, sağ tarafı 7 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=3 için ilk eşitliğin sol tarafı -5/2, sağ tarafı 7 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "(x−4)/2 modeli farklı sıradaki işlemleri anlatır.",
      "check": "x=22 ilk denkleme yazılınca sol=7, sağ=7; eşitlik sağlanır."
    },
    {
      "code": "Q15",
      "prompt": "Bir sayının 4 eksiğinin yarısı 7’dir. Sayı kaçtır?",
      "options": [
        "18",
        "22",
        "10",
        "14",
        "6"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Önce sayıdan 4 çıkarılır: (x−4)/2=7.",
      "steps": [
        "İki tarafı 2 ile çarp: x−4=14.",
        "İki tarafa 4 ekle: x=18."
      ],
      "optionReasons": [
        "x=18 için ilk eşitliğin sol tarafı 7, sağ tarafı 7 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=22 için ilk eşitliğin sol tarafı 9, sağ tarafı 7 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=10 için ilk eşitliğin sol tarafı 3, sağ tarafı 7 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=14 için ilk eşitliğin sol tarafı 5, sağ tarafı 7 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=6 için ilk eşitliğin sol tarafı 1, sağ tarafı 7 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "x/2−4 yazmak çıkarılan 4’ün de ikiye bölündüğünü unutmak olur.",
      "check": "x=18 ilk denkleme yazılınca sol=7, sağ=7; eşitlik sağlanır."
    },
    {
      "code": "Q16",
      "prompt": "Bir sayının 7 eksiği 20’dir. Sayı kaçtır?",
      "options": [
        "27",
        "13",
        "140",
        "20",
        "-27"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Eşitliği x−7=20 olarak kur.",
      "steps": [
        "İki tarafa 7 ekle: x=27.",
        "İlk cümlede 27−7=20 denetlenir."
      ],
      "optionReasons": [
        "x=27 için ilk eşitliğin sol tarafı 20, sağ tarafı 20 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=13 için ilk eşitliğin sol tarafı 6, sağ tarafı 20 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=140 için ilk eşitliğin sol tarafı 133, sağ tarafı 20 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=20 için ilk eşitliğin sol tarafı 13, sağ tarafı 20 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-27 için ilk eşitliğin sol tarafı -34, sağ tarafı 20 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "20−7 yapmak ters işlemi karıştırır.",
      "check": "x=27 ilk denkleme yazılınca sol=20, sağ=20; eşitlik sağlanır."
    },
    {
      "code": "Q17",
      "prompt": "x gerçek sayı olmak üzere 6(x−2)=3x+12 denkleminin kökü kaçtır?",
      "options": [
        "8",
        "14/3",
        "4",
        "6",
        "24"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Bütün iki tarafı 3’e böl: 2(x−2)=x+4.",
      "steps": [
        "Dağıt: 2x−4=x+4.",
        "İki taraftan x çıkar ve 4 ekle: x=8."
      ],
      "optionReasons": [
        "x=8 için ilk eşitliğin sol tarafı 36, sağ tarafı 36 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=14/3 için ilk eşitliğin sol tarafı 16, sağ tarafı 26 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=4 için ilk eşitliğin sol tarafı 12, sağ tarafı 24 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=6 için ilk eşitliğin sol tarafı 24, sağ tarafı 30 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=24 için ilk eşitliğin sol tarafı 132, sağ tarafı 84 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "−2’yi dış katsayıyla çarpmayı unutma.",
      "check": "x=8 ilk denkleme yazılınca sol=36, sağ=36; eşitlik sağlanır."
    },
    {
      "code": "Q18",
      "prompt": "x gerçek sayı olmak üzere 6x−2=3x+12 denkleminin kökü kaçtır?",
      "options": [
        "14/3",
        "8",
        "14",
        "10/3",
        "-14/3"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "İki taraftan 3x çıkar ve 2 ekle.",
      "steps": [
        "3x−2=12.",
        "3x=14 → x=14/3."
      ],
      "optionReasons": [
        "x=14/3 için ilk eşitliğin sol tarafı 26, sağ tarafı 26 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=8 için ilk eşitliğin sol tarafı 46, sağ tarafı 36 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=14 için ilk eşitliğin sol tarafı 82, sağ tarafı 54 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=10/3 için ilk eşitliğin sol tarafı 18, sağ tarafı 22 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-14/3 için ilk eşitliğin sol tarafı -30, sağ tarafı -2 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "Yalnız 6x’i 3’e bölmek geçersizdir; bütün tarafı bölmek ise kesirlerle geçerli bir yoldur.",
      "check": "x=14/3 ilk denkleme yazılınca sol=26, sağ=26; eşitlik sağlanır."
    },
    {
      "code": "Q19",
      "prompt": "Bir sayının 6 katının 2 eksiği, aynı sayının 3 katının 12 fazlasına eşittir. Sayı kaçtır?",
      "options": [
        "14/3",
        "8",
        "2",
        "14",
        "-2"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "İki niceliği 6x−2 ve 3x+12 olarak yaz.",
      "steps": [
        "6x−2=3x+12.",
        "İki taraftan 3x çıkar, 2 ekle: 3x=14.",
        "x=14/3."
      ],
      "optionReasons": [
        "x=14/3 için ilk eşitliğin sol tarafı 26, sağ tarafı 26 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=8 için ilk eşitliğin sol tarafı 46, sağ tarafı 36 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=2 için ilk eşitliğin sol tarafı 10, sağ tarafı 18 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=14 için ilk eşitliğin sol tarafı 82, sağ tarafı 54 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-2 için ilk eşitliğin sol tarafı -14, sağ tarafı 6 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "İlk ifade 6(x−2) değil, 6x−2’dir.",
      "check": "x=14/3 ilk denkleme yazılınca sol=26, sağ=26; eşitlik sağlanır."
    },
    {
      "code": "Q20",
      "prompt": "x gerçek sayı olmak üzere 3(x−2)=12 denkleminin kökü kaçtır?",
      "options": [
        "6",
        "14/3",
        "4",
        "10",
        "18"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Önce bütün iki tarafı 3’e böl veya 3’ü iki terime dağıt.",
      "steps": [
        "x−2=4.",
        "İki tarafa 2 ekle: x=6."
      ],
      "optionReasons": [
        "x=6 için ilk eşitliğin sol tarafı 12, sağ tarafı 12 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=14/3 için ilk eşitliğin sol tarafı 8, sağ tarafı 12 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=4 için ilk eşitliğin sol tarafı 6, sağ tarafı 12 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=10 için ilk eşitliğin sol tarafı 24, sağ tarafı 12 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=18 için ilk eşitliğin sol tarafı 48, sağ tarafı 12 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "3x−2=12 yanlış açılımından başlama.",
      "check": "x=6 ilk denkleme yazılınca sol=12, sağ=12; eşitlik sağlanır."
    },
    {
      "code": "Q21",
      "prompt": "Yetişkin bileti 80 TL, öğrenci bileti 50 TL. Toplam 12 kişinin ödediği ücret 780 TL olduğuna göre yetişkin sayısı kaçtır?",
      "options": [
        "6",
        "12",
        "5",
        "9",
        "3"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "x yetişkin, 12−x öğrenci olsun: 80x+50(12−x)=780.",
      "steps": [
        "80x+600−50x=780 → 30x+600=780.",
        "30x=180 → x=6.",
        "6 tam sayı ve 0≤6≤12; öğrenci sayısı da 6."
      ],
      "optionReasons": [
        "x=6 için ilk eşitliğin sol tarafı 780, sağ tarafı 780 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=12 için ilk eşitliğin sol tarafı 960, sağ tarafı 780 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=5 için ilk eşitliğin sol tarafı 750, sağ tarafı 780 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=9 için ilk eşitliğin sol tarafı 870, sağ tarafı 780 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=3 için ilk eşitliğin sol tarafı 690, sağ tarafı 780 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "İki grubun adedini aynı x ile vermek toplam kişi koşulunu bozar.",
      "check": "x=6 ilk denkleme yazılınca sol=780, sağ=780; eşitlik sağlanır."
    },
    {
      "code": "Q22",
      "prompt": "İki yetişkin ve üç öğrenci bileti toplam 390 TL. Yetişkin bileti öğrenci biletinden 45 TL pahalıdır. Öğrenci bileti kaç TL?",
      "options": [
        "60",
        "69",
        "78",
        "105",
        "45"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "s öğrenci ücretiyse yetişkin s+45: 2(s+45)+3s=390.",
      "steps": [
        "2s+90+3s=390 → 5s+90=390.",
        "5s=300 → s=60.",
        "Yetişkin 105 TL; fiyat farkı ve toplam ücret denetlenir."
      ],
      "optionReasons": [
        "s=60 için ilk modelin sol tarafı 390, sağ tarafı 390 olur. İki değer aynı ve sorunun sayı alanı uygun olduğundan bu seçenek doğrudur.",
        "s=69 için ilk modelin sol tarafı 435, sağ tarafı 390 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz.",
        "s=78 için ilk modelin sol tarafı 480, sağ tarafı 390 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz.",
        "s=105 için ilk modelin sol tarafı 615, sağ tarafı 390 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz.",
        "s=45 için ilk modelin sol tarafı 315, sağ tarafı 390 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz."
      ],
      "commonError": "İki yetişkinin toplam fark katkısı 2×45=90 TL’dir; yalnız 45 ekleme.",
      "check": "s=60 ilk modele yazılınca sol=390, sağ=390; eşitlik ve sayı alanı koşulu sağlanır."
    },
    {
      "code": "Q23",
      "prompt": "İlk terimi 5, her adımda artışı 4 olan bir örüntüde terim 69 olduğunda adım numarası kaçtır?",
      "options": [
        "17",
        "16",
        "18",
        "69/4",
        "69"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Pozitif tam sayı adımına n de; 5+4(n−1)=69.",
      "steps": [
        "4(n−1)=64.",
        "n−1=16 → n=17.",
        "n pozitif tam sayı; 5+4×16=69."
      ],
      "optionReasons": [
        "n=17 için ilk modelin sol tarafı 69, sağ tarafı 69 olur. İki değer aynı ve sorunun sayı alanı uygun olduğundan bu seçenek doğrudur.",
        "n=16 için ilk modelin sol tarafı 65, sağ tarafı 69 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz.",
        "n=18 için ilk modelin sol tarafı 73, sağ tarafı 69 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz.",
        "n=69/4 için ilk modelin sol tarafı 70, sağ tarafı 69 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz. Ayrıca 69/4 tam sayı bir adım değildir.",
        "n=69 için ilk modelin sol tarafı 277, sağ tarafı 69 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz."
      ],
      "commonError": "Artış sayısı n değil n−1’dir.",
      "check": "n=17 ilk modele yazılınca sol=69, sağ=69; eşitlik ve sayı alanı koşulu sağlanır."
    },
    {
      "code": "Q24",
      "prompt": "Özgün öğretim modelinde ilk terim 1, her adımda sabit artış 3’tür. Terim 241 olduğunda pozitif tam sayı adımı kaçtır?",
      "options": [
        "81",
        "80",
        "241/3",
        "82",
        "240"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Başlangıcı ayrı koru: 1+3(n−1)=241.",
      "steps": [
        "3n−2=241 → 3n=243.",
        "n=81; 1+3×80=241."
      ],
      "optionReasons": [
        "n=81 için ilk modelin sol tarafı 241, sağ tarafı 241 olur. İki değer aynı ve sorunun sayı alanı uygun olduğundan bu seçenek doğrudur.",
        "n=80 için ilk modelin sol tarafı 238, sağ tarafı 241 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz.",
        "n=241/3 için ilk modelin sol tarafı 239, sağ tarafı 241 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz.",
        "n=82 için ilk modelin sol tarafı 244, sağ tarafı 241 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz.",
        "n=240 için ilk modelin sol tarafı 718, sağ tarafı 241 olur. İki değer farklı olduğundan bu seçenek verilen koşulu sağlamaz."
      ],
      "commonError": "Bu sabit artış modeli, 2024 TYT’deki katlanmalı mandal sorusu diye sunulmaz.",
      "check": "n=81 ilk modele yazılınca sol=241, sağ=241; eşitlik ve sayı alanı koşulu sağlanır."
    },
    {
      "code": "Q25",
      "prompt": "x gerçek sayı olmak üzere (x+1)/(x−1)=2 denkleminin izinli kökü kaçtır?",
      "options": [
        "3",
        "1",
        "0",
        "-1",
        "2"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Önce x≠1 yaz; izinli alanda x−1 ile çarp.",
      "steps": [
        "x+1=2(x−1) → x+1=2x−2.",
        "x=3.",
        "3≠1; ilk ifadede (3+1)/(3−1)=2."
      ],
      "optionReasons": [
        "x=3 için ilk eşitliğin sol tarafı 2, sağ tarafı 2 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=1 için payda 1−1=0 olur; başlangıç ifadesi tanımsızdır. Bu seçenek bir kök değildir.",
        "x=0 için ilk eşitliğin sol tarafı -1, sağ tarafı 2 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-1 için ilk eşitliğin sol tarafı 0, sağ tarafı 2 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=2 için ilk eşitliğin sol tarafı 3, sağ tarafı 2 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "Paydası 0 olan x=1 bir kök değildir; tanım koşulunu atlama.",
      "check": "x=3 ilk denkleme yazılınca sol=2, sağ=2; eşitlik sağlanır."
    },
    {
      "code": "Q26",
      "prompt": "x gerçek sayı olmak üzere (2x+3)/5=3 denkleminin kökü kaçtır?",
      "options": [
        "6",
        "0",
        "3",
        "9",
        "3/5"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "İki tarafı 5 ile çarp; bütün payı koru.",
      "steps": [
        "2x+3=15.",
        "2x=12 → x=6."
      ],
      "optionReasons": [
        "x=6 için ilk eşitliğin sol tarafı 3, sağ tarafı 3 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=0 için ilk eşitliğin sol tarafı 3/5, sağ tarafı 3 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=3 için ilk eşitliğin sol tarafı 9/5, sağ tarafı 3 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=9 için ilk eşitliğin sol tarafı 21/5, sağ tarafı 3 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=3/5 için ilk eşitliğin sol tarafı 21/25, sağ tarafı 3 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "Kesir çizgisini yalnız +3’e uygulayıp 2x+3/5 diye okuma.",
      "check": "x=6 ilk denkleme yazılınca sol=3, sağ=3; eşitlik sağlanır."
    },
    {
      "code": "Q27",
      "prompt": "x gerçek sayı olmak üzere 2(x+3)=10 denkleminin kökü kaçtır?",
      "options": [
        "2",
        "7/2",
        "8",
        "5",
        "-2"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "Bütün iki tarafı 2’ye böl: x+3=5.",
      "steps": [
        "x+3=5.",
        "İki taraftan 3 çıkar: x=2."
      ],
      "optionReasons": [
        "x=2 için ilk eşitliğin sol tarafı 10, sağ tarafı 10 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=7/2 için ilk eşitliğin sol tarafı 13, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=8 için ilk eşitliğin sol tarafı 22, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=5 için ilk eşitliğin sol tarafı 16, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=-2 için ilk eşitliğin sol tarafı 2, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "2x+3=10 farklı bir denklemdir.",
      "check": "x=2 ilk denkleme yazılınca sol=10, sağ=10; eşitlik sağlanır."
    },
    {
      "code": "Q28",
      "prompt": "x gerçek sayı olmak üzere 2x+3=10 denkleminin kökü kaçtır?",
      "options": [
        "7/2",
        "2",
        "7",
        "13/2",
        "5"
      ],
      "knowledge": [
        "Denklemin çözümü ilk eşitliği doğru yapan gerçek sayıdır.",
        "İki tarafta aynı toplama/çıkarma ve sıfır olmayan aynı sayıyla çarpma/bölme çözüm kümesini korur."
      ],
      "strategy": "İki taraftan 3 çıkar: 2x=7.",
      "steps": [
        "2x=7.",
        "İki tarafı 2’ye böl: x=7/2."
      ],
      "optionReasons": [
        "x=7/2 için ilk eşitliğin sol tarafı 10, sağ tarafı 10 olur. İki değer aynı olduğundan bu değer köktür; sıfır olmayan son katsayı tek çözüm verir.",
        "x=2 için ilk eşitliğin sol tarafı 7, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=7 için ilk eşitliğin sol tarafı 17, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=13/2 için ilk eşitliğin sol tarafı 16, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz.",
        "x=5 için ilk eşitliğin sol tarafı 13, sağ tarafı 10 olur. İki değer farklı olduğundan bu seçenek verilen denklemi sağlamaz."
      ],
      "commonError": "Yalnız 2x terimini ikiye bölüp +3 ve sağ tarafı değişmeden bırakma.",
      "check": "x=7/2 ilk denkleme yazılınca sol=10, sağ=10; eşitlik sağlanır."
    },
    {
      "code": "Q29",
      "prompt": "x gerçek sayı olmak üzere 3(x+2)=3x+6 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "ℝ",
        "∅",
        "{0}",
        "{2}",
        "{−2}"
      ],
      "knowledge": [
        "İki taraf aynı cebirsel ifadeye dönüşürse her izinli x çözüm olur."
      ],
      "strategy": "Sol tarafı dağıt ve iki tarafı karşılaştır.",
      "steps": [
        "3x+6=3x+6.",
        "İki taraftan aynı ifade çıkarılınca 0=0; her gerçek x çalışır."
      ],
      "optionReasons": [
        "İki taraf her x için aynı olduğundan bütün gerçek sayılar çözüm kümesidir.",
        "∅ hiçbir kök yok demektir; örneğin x=0 eşitliği sağlar.",
        "0 bir köktür ama tek kök değildir; x=1 de çalışır.",
        "2 bir köktür ama bütün küme yalnız 2’den oluşmaz.",
        "−2 bir köktür ama bütün gerçek sayılar da çalışır."
      ],
      "commonError": "Özdeşliği denenen tek bir kökle sınırlandırma.",
      "check": "Her x için iki tarafta 3x+6 var; ÇK=ℝ."
    },
    {
      "code": "Q30",
      "prompt": "x gerçek sayı olmak üzere 2(x−1)=2x+5 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "ℝ",
        "{0}",
        "{−7}",
        "{7}"
      ],
      "knowledge": [
        "0x sıfırdır; sıfır olmayan sabite eşit olamaz."
      ],
      "strategy": "Dağıt ve iki taraftan 2x çıkar.",
      "steps": [
        "2x−2=2x+5.",
        "−2=5 yanlış eşitliği çıkar; hiçbir gerçek x çözüm değildir."
      ],
      "optionReasons": [
        "x’ten bağımsız yanlış eşitlik kaldığından hiç çözüm yoktur.",
        "ℝ için her x’in çalışması gerekirdi; sabitler −2 ve 5 farklıdır.",
        "x=0 için sol −2, sağ 5’tir; eşit değiller.",
        "x=−7 için sol −16, sağ −9’dur; eşit değiller.",
        "x=7 için sol 12, sağ 19’dur; eşit değiller."
      ],
      "commonError": "x’lerin yok olmasını otomatik özdeşlik sanma.",
      "check": "Sol taraf her x’te sağdan 7 eksiktir; fark 0 olamaz."
    },
    {
      "code": "Q31",
      "prompt": "x gerçek sayı olmak üzere 5(x−2)=5x−10 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "ℝ",
        "{0}",
        "∅",
        "{2}",
        "{10}"
      ],
      "knowledge": [
        "Çözüm kümesi yalnız bir kökü değil bütün kökleri içerir."
      ],
      "strategy": "İki ifadeyi aynı sade biçime getir.",
      "steps": [
        "5x−10=5x−10.",
        "0=0 her x için doğru; ÇK=ℝ."
      ],
      "optionReasons": [
        "Her iki tarafta aynı 5x−10 var, bütün gerçek sayılar çözüm.",
        "0 eşitliği sağlar fakat tek değildir; örneğin 1 de sağlar.",
        "Çözüm yok iddiası x=0 karşı örneğiyle çürür.",
        "2 için doğru olması tek çözüm 2 demek değildir.",
        "10 için doğru olması bütün diğer gerçek sayıları elemez."
      ],
      "commonError": "Özdeşlikten x=0 diye tek değer çıkarma.",
      "check": "Değişkenin bütün katsayıları ve sabitleri iki tarafta aynıdır."
    },
    {
      "code": "Q32",
      "prompt": "x gerçek sayı olmak üzere 4(x+3)=4x+12 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "ℝ",
        "∅",
        "{0}",
        "{3}",
        "{−3}"
      ],
      "knowledge": [
        "Parantez açıldığında her x’te aynı ifade özdeşliktir."
      ],
      "strategy": "4’ü iki terime dağıt.",
      "steps": [
        "4x+12=4x+12.",
        "İki taraftan aynı ifade çıkarınca 0=0; her gerçek x çözüm."
      ],
      "optionReasons": [
        "Sol ve sağ her x için aynı olduğundan ÇK=ℝ.",
        "∅ olamaz; x=0 için 12=12 sağlanır.",
        "0 çözümdür fakat 1 de çözümdür; tek elemanlı küme eksiktir.",
        "3 çözümdür fakat diğer gerçek sayılar da çözüm olduğundan eksiktir.",
        "−3 çözümdür fakat yalnız bu sayıyı yazmak kümenin tamamını vermez."
      ],
      "commonError": "Bir özel değerin çalışmasını tek çözüm kanıtı sayma.",
      "check": "Dağıtılmış iki tarafın bütün terimleri aynıdır."
    },
    {
      "code": "Q33",
      "prompt": "x gerçek sayı olmak üzere 4(x−3)=4x+10 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "ℝ",
        "{0}",
        "{−22}",
        "{22}"
      ],
      "knowledge": [
        "x katsayıları eşit olsa da sabitler farklıysa çözüm yoktur."
      ],
      "strategy": "Dağıt, iki taraftan 4x çıkar.",
      "steps": [
        "4x−12=4x+10.",
        "−12=10 yanlış; x’ten bağımsız bu fark giderilemez."
      ],
      "optionReasons": [
        "−12=10 yanlış olduğundan hiçbir gerçek sayı çözüm değildir.",
        "Her x için doğru olması için sabitlerin eşit olması gerekirdi.",
        "x=0 için −12≠10.",
        "x=−22 için sol −100, sağ −78; eşit değil.",
        "x=22 için sol 76, sağ 98; eşit değil."
      ],
      "commonError": "İki tarafta aynı 4x var diye sabitleri görmezden gelme.",
      "check": "Sol−sağ her x için −22’dir; hiçbir zaman 0 değildir."
    },
    {
      "code": "Q34",
      "prompt": "k gerçek parametre olmak üzere k(x−1)=2x−k denklemi için, her k≠2 değerinde daima geçerli kök ifadesi hangisidir?",
      "options": [
        "0",
        "2",
        "k",
        "k−2",
        "−k"
      ],
      "knowledge": [
        "Parametre için verilen k≠2 koşulu, k−2’ye bölmeyi geçerli yapar."
      ],
      "strategy": "Dağıtıp aynı sabitleri götür.",
      "steps": [
        "kx−k=2x−k → (k−2)x=0.",
        "k≠2 olduğundan iki taraf k−2’ye bölünür: x=0."
      ],
      "optionReasons": [
        "Sıfır olmayan k−2 ile çarpımı 0 yapan tek x=0’dır.",
        "x=2 yazınca 2(k−2)=0 gerekir; bu k=2 olur ve verilen koşula aykırıdır.",
        "Bazı k değerlerinde tesadüfen çalışabilir; bütün k≠2 için kök değildir. Örneğin k=3’te x=3 çalışmaz.",
        "Örneğin k=3’te x=1 verir ve (3−2)×1≠0; genel kök değildir.",
        "Örneğin k=3’te x=−3 verir ve (3−2)×(−3)≠0; genel kök değildir."
      ],
      "commonError": "k’ye göre bir seçenek seçmek yerine verilen koşulla tek kökü belirle.",
      "check": "x=0 için her iki taraf −k olur; k≠2 de tekliği sağlar."
    },
    {
      "code": "Q35",
      "prompt": "k=2 iken k(x−1)=2x−k denkleminin gerçek çözüm kümesi hangisidir?",
      "options": [
        "ℝ",
        "{0}",
        "∅",
        "{2}",
        "{−2}"
      ],
      "knowledge": [
        "Bir parametrenin sıfır katsayı yaptığı özel durum ayrıca değerlendirilir."
      ],
      "strategy": "Önce k yerine 2 koy.",
      "steps": [
        "2(x−1)=2x−2.",
        "2x−2=2x−2 → 0=0; her gerçek x çalışır."
      ],
      "optionReasons": [
        "k=2 durumunda başlangıç eşitliği özdeşliktir; ÇK=ℝ.",
        "0 çalışır fakat bütün diğer gerçek sayılar da çalıştığından eksiktir.",
        "Çözüm yok denemez; iki taraf aynıdır.",
        "2 çalışır fakat bütün çözüm kümesini yalnız 2 ile sınırlamak yanlıştır.",
        "−2 çalışır fakat bütün çözüm kümesini yalnız −2 ile sınırlamak yanlıştır."
      ],
      "commonError": "k−2=0’a bölerek bu durumu kaybetme.",
      "check": "k=2 için sol ve sağ her x’te 2x−2’dir."
    },
    {
      "code": "Q36",
      "prompt": "İlk terimi 2, sabit artışı 3 olan bir örüntüde terimin tam 241 olduğu pozitif tam sayı adımı için hangisi doğrudur?",
      "options": [
        "Böyle bir pozitif tam sayı adımı yoktur.",
        "81. adım",
        "80. adım",
        "82. adım",
        "239. adım"
      ],
      "knowledge": [
        "Adım numarası pozitif tam sayıdır; cebirsel bir kesri yuvarlamak eşitliği korumaz."
      ],
      "strategy": "2+3(n−1)=241 kur.",
      "steps": [
        "3n−1=241 → 3n=242 → n=242/3.",
        "242/3 tam sayı değil; pozitif tam sayı adımı yok."
      ],
      "optionReasons": [
        "Cebirsel aday 242/3 tam sayı olmadığı için koşullu soruda uygun adım yoktur.",
        "81. adım 2+3×80=242 verir; 241 değil.",
        "80. adım 2+3×79=239 verir; 241 değil.",
        "82. adım 2+3×81=245 verir; 241 değil.",
        "239. adım 2+3×238=716 verir; 241 değil."
      ],
      "commonError": "Kesirli adımı 81’e yuvarlama; modeli yanlış sayıya uydurmuş olursun.",
      "check": "Ardışık 80. ve 81. değerleri 239 ve 242; 241 bu sabit artış dizisinde yok."
    },
    {
      "code": "Q37",
      "prompt": "x gerçek sayı olmak üzere (x−1)/(x−1)=2 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "∅",
        "{1}",
        "ℝ",
        "ℝ’den 1 çıkarılmış küme",
        "{2}"
      ],
      "knowledge": [
        "Payda 0 olamaz; sadeleşme yasak değeri geri getirmez."
      ],
      "strategy": "Önce x≠1 yaz ve izinli değerlerde sol tarafı incele.",
      "steps": [
        "x≠1 için (x−1)/(x−1)=1.",
        "1=2 olamaz; aday çıkaran çarpma yolunda x=1 de başta yasaktır."
      ],
      "optionReasons": [
        "İzinli her x’te sol 1, sağ 2; hiçbir kök yoktur.",
        "x=1 için başlangıç paydası 0 olur; tanımsızdır.",
        "Her gerçek sayı olamaz; x=1 yasak, ötekilerde 1≠2.",
        "Bu küme (x−1)/(x−1)=1 denkleminin çözümüdür; sağ taraf burada 2.",
        "x=2 için 1/1=1≠2."
      ],
      "commonError": "Paydayla çarpınca çıkan x=1’i alan kontrolü olmadan kabul etme.",
      "check": "Hem tanımsız x=1 elenir hem kalan bütün değerlerde sol 1’dir."
    },
    {
      "code": "Q38",
      "prompt": "x gerçek sayı olmak üzere (x−1)/(x−1)=1 denkleminin çözüm kümesi hangisidir?",
      "options": [
        "ℝ’den 1 çıkarılmış küme",
        "ℝ",
        "∅",
        "{1}",
        "{0}"
      ],
      "knowledge": [
        "Başlangıçtaki sıfır olmayan payda koşulu özdeşlikte de korunur."
      ],
      "strategy": "Önce x≠1 koşulunu yaz.",
      "steps": [
        "x≠1 olan her x’te sol 1’dir.",
        "Bütün izinli değerler sağlar; yalnız x=1 tanımsızdır."
      ],
      "optionReasons": [
        "1 dışındaki bütün gerçek sayılarda eşitlik 1=1 olur.",
        "ℝ, tanımsız x=1’i de içerdiğinden fazla büyüktür.",
        "Çözüm yok değildir; örneğin x=0 için (−1)/(−1)=1.",
        "x=1 çözüm değil, tam tersine yasak değerdir.",
        "0 çözümdür ama 2,3 ve diğer izinli değerler de çözümdür."
      ],
      "commonError": "“0=0 çıktı” diye baştaki payda koşulunu silme.",
      "check": "x=1’de 0/0 tanımsız; izinli her başka x’te oran 1."
    },
    {
      "code": "Q39",
      "prompt": "x=1 denkleminin iki tarafı 0 ile çarpılarak 0=0 yazılıyor. Bu işlem çözüm kümesi hakkında ne yapar?",
      "options": [
        "Başlangıç çözüm bilgisini kaybettirir; iki denklem eşdeğer değildir.",
        "Çözüm kümesini aynen korur.",
        "Başlangıç denklemini çözümsüz yapar.",
        "Yeni denklem yalnız x=0 için doğrudur.",
        "İşlem sıfıra bölme olduğu için tanımsızdır."
      ],
      "knowledge": [
        "0 ile çarpma tanımlıdır, fakat tersiyle başlangıç bilgisi geri alınamaz."
      ],
      "strategy": "İki denklemin bütün çözümlerini ayrı karşılaştır.",
      "steps": [
        "x=1’in ÇK’si {1}.",
        "0=0’ın ÇK’si ℝ; örneğin x=2 yeni eşitliği sağlar ama ilkini sağlamaz."
      ],
      "optionReasons": [
        "{1} ve ℝ aynı küme olmadığından eşdeğerlik kaybolur.",
        "x=2 karşı örnektir: 0=0 doğru ama 2=1 yanlış.",
        "0=0 çözümsüz değil, her gerçek sayı için doğrudur.",
        "0=0 x’e bağlı değildir; yalnız 0 değil her x için doğrudur.",
        "Yapılan işlem 0 ile çarpmadır ve tanımlıdır; sıfıra bölme yapılmadı."
      ],
      "commonError": "“İki taraf yine eşit” ifadesini “aynı çözüm kümesi” diye genelleme.",
      "check": "Yeni denklem daha fazla x’i kabul eder; bu yüzden çözüm zincirinde sıfır olmayan çarpan istenir."
    },
    {
      "code": "Q40",
      "prompt": "6x−2=3x+12 denkleminin iki tarafının tamamı 3’e bölünürse doğru yeni eşitlik hangisidir?",
      "options": [
        "2x−2/3=x+4",
        "2x−2=x+4",
        "2x−2=3x+12",
        "6x−2=x+4",
        "2x−6=x+4"
      ],
      "knowledge": [
        "Bir tarafın tamamını bölmek, o tarafın her terimini bölmektir."
      ],
      "strategy": "Sol ve sağdaki iki terimi ayrı ayrı 3’e böl.",
      "steps": [
        "(6x−2)/3=(3x+12)/3.",
        "6x/3−2/3=3x/3+12/3 → 2x−2/3=x+4."
      ],
      "optionReasons": [
        "Solun iki terimi ve sağın iki terimi birlikte 3’e bölünmüştür.",
        "Soldaki −2 bölünmeden bırakılmış; doğru terim −2/3 olmalı.",
        "Sağ taraf hiç bölünmemiş ve solda −2 de korunmuş; iki taraflı işlem yok.",
        "Yalnız sağ taraf bölünmüş, sol tarafın tamamı aynı bırakılmış.",
        "−2’yi 3’e bölmek −6 değil, −2/3 verir."
      ],
      "commonError": "Ortak tam sayı çarpanı görünmese bile bütün tarafı sıfır olmayan sayıya bölmek geçerlidir.",
      "check": "Yeni eşitlik tekrar 3 ile çarpıldığında tam başlangıç denklemine döner."
    },
    {
      "code": "Q41",
      "prompt": "3(x−2)=12 → 3x−2=12 → 3x=14 zincirinde ilk bozulan adım hangisidir?",
      "options": [
        "3(x−2)’nin 3x−2 diye açılması",
        "Her iki tarafa 2 eklenmesi",
        "Denklemin başta parantez içermesi",
        "x’in gerçek sayı kabul edilmesi",
        "Son satırda x bulunması"
      ],
      "knowledge": [
        "Dağıtma bütün parantez terimlerine uygulanır."
      ],
      "strategy": "İlk iki satırı dağıtma özelliğiyle karşılaştır.",
      "steps": [
        "3(x−2)=3x−6 olmalı.",
        "İlk satırdan 3x−2’ye geçiş yanlıştır; sonraki +2 işlemi o yanlış denkleme göre yapılıyor."
      ],
      "optionReasons": [
        "3 hem x’e hem −2’ye dağılmalı; doğru sabit −6.",
        "İki tarafa 2 eklemek kendi başına geçerlidir; ilk hata daha önceki dağıtmadır.",
        "Parantezli denklemler geçerlidir; hata parantezi yanlış açmaktır.",
        "Gerçek sayı alanı bu problem için uygundur.",
        "Son satırda bilinmeyen bulunması hata değildir; dağıtma daha önce bozuldu."
      ],
      "commonError": "Yanlış köke bakıp sadece son satırı düzeltme; ilk eşit olmayan geçişi onar.",
      "check": "Doğru zincir 3x−6=12 → 3x=18 → x=6; ilk denklemde 12=12."
    },
    {
      "code": "Q42",
      "prompt": "Her yeni katman adedi bir önceki katmandakinin iki katıdır. İlk katman adetleri 1,2,4,8,… olduğuna göre hangi açıklama doğrudur?",
      "options": [
        "Sabit +3 artış yoktur; ardışık katmanlar iki katına çıkar.",
        "Her geçişte tam 3 eklenir.",
        "n. katman her zaman 3n−2’dir.",
        "İlk üç katmanın toplamı 12’dir.",
        "İlk katmandan dördüncüye dört geçiş vardır."
      ],
      "knowledge": [
        "Sabit fark ile sabit oran farklı örüntü türleridir."
      ],
      "strategy": "Ardışık farkları ve oranları ayrı hesapla.",
      "steps": [
        "Farklar 1, 2, 4; sabit değil.",
        "Oranlar 2/1=2, 4/2=2, 8/4=2; sabit çarpan 2."
      ],
      "optionReasons": [
        "Farklar sabit değil, oran 2; model katlanmadır.",
        "İlk geçiş 1, ikincisi 2 ekler; her defasında 3 değildir.",
        "n=2 için 3n−2=4 verir ama gerçek ikinci katman 2; model uyuşmaz.",
        "1+2+4=7; 12 değil.",
        "1→2→3→4 arasında 3 geçiş vardır; 4 değil."
      ],
      "commonError": "Benzer şekil veya kaynak başlığına bakıp sabit artış varsayma.",
      "check": "İlk üç veri kendi modelinde 1,2,4 ve toplam 7 vermeli."
    },
    {
      "code": "Q43",
      "prompt": "x ve y gerçek sayı. x+y=8 ve 2x−y=7 denklemlerinin ortak çözümü (x, y) hangisidir?",
      "options": [
        "(5, 3)",
        "(3, 5)",
        "(4, 4)",
        "(5, −3)",
        "(7, 1)"
      ],
      "knowledge": [
        "Çözüm çifti ilk ve ikinci eşitliği birden sağlamalıdır.",
        "y ile −y zıt katsayılı olduğu için eşitlikler toplandığında yok olur."
      ],
      "strategy": "İki başlangıç eşitliğini topla. x’i bulduktan sonra ilk eşitlikten y’yi çıkar.",
      "steps": [
        "Toplama 3x=15 verir. x=5.",
        "İlk eşitlikte 5+y=8, y=3.",
        "İlk eşitlik 5+3=8, ikinci 2×5−3=7."
      ],
      "optionReasons": [
        "(5, 3) hem toplam 8’i hem ikinci eşitlikte 7’yi verir.",
        "(3, 5) toplamı 8, ikinci eşitlikte 6−5=1. Sıralamayı değiştirmek çözümü bozar.",
        "(4, 4) toplamı 8, ikinci eşitlikte 8−4=4.",
        "(5, −3) toplamı 2, ikinci eşitlikte 10−(−3)=13.",
        "(7, 1) toplamı 8, ikinci eşitlikte 14−1=13."
      ],
      "commonError": "Yalnız toplam 8’e bakıp ikinci eşitliği denetlemeyi atlama.",
      "check": "5+3=8 ve 2×5−3=7. Elde edilen 3x=15 x’i ve ilk denklem de y’yi tek değere belirler."
    },
    {
      "code": "Q44",
      "prompt": "Birinci sistem x−2y=3 ile 2x−4y=6, ikinci sistem x−2y=3 ile 2x−4y=7 denklemlerinden oluşuyor. İlk ve ikinci sistemin çözüm kümeleri sırasıyla hangisidir?",
      "options": [
        "x=3+2y doğrusu üzerindeki bütün çiftler ve ∅",
        "Yalnız (3, 0) ve ∅",
        "Bütün gerçek sayı çiftleri ve ∅",
        "∅ ve x=3+2y doğrusu üzerindeki bütün çiftler",
        "İki sistem için de x=3+2y doğrusu üzerindeki bütün çiftler"
      ],
      "knowledge": [
        "Bir denklemin iki tarafının tamamını sıfır olmayan sayıyla çarpmak çözüm kümesini korur.",
        "Aynı sol ifade iki farklı sayı olamaz."
      ],
      "strategy": "İlk denklemin tamamını ikiyle çarp ve iki sistemde sağ taraftaki değerle karşılaştır.",
      "steps": [
        "İkiyle çarpınca 2x−4y=6 olur.",
        "Birinci sistem aynı koşulu iki kez veriyor. x−2y=3 doğrusundaki bütün çiftler çözümdür.",
        "İkinci sistem 2x−4y için 6 ve 7’yi aynı anda ister. Çelişki nedeniyle çözüm yoktur."
      ],
      "optionReasons": [
        "İlk sistem çakışan doğruları, ikinci sistem ayrı paralel doğruları verir.",
        "(3, 0) bir çözümdür. (5, 1) gibi başka çiftler de ilk sistemi sağlar.",
        "İlk sistemin çözümü bir doğru üzerindedir. (0, 0) ilk denklemi sağlamaz.",
        "Birinci sistemin sağ tarafı orantılı, ikincininki farklıdır. Çözüm türleri ters yazılmış.",
        "İkinci sağ taraf 7 olunca aynı sol tarafın 6 da olması gerekir. İlk doğru bu yeni eşitliği sağlamaz."
      ],
      "commonError": "Yalnız x ve y katsayılarının oranına bakma. Sağ sabitlerin oranını da denetle.",
      "check": "(3, 0) ilk çifti sağlar. İkinci sistemin eşitliklerini karşılaştırınca 6=7 gerekir."
    },
    {
      "code": "Q45",
      "prompt": "x gerçek sayı. (3x−6)/(x−2)=4 denklemi için başlangıç tanım koşulu ve çözüm kümesi hangisidir?",
      "options": [
        "x≠2, ÇK=∅",
        "x≠2, ÇK={2}",
        "x≠2, ÇK=ℝ∖{2}",
        "x≠0, ÇK={2}",
        "Kısıt yok, ÇK={2}"
      ],
      "knowledge": [
        "Kesrin paydası sıfır olamaz.",
        "Bir aday hem dönüştürülen eşitliğe hem ilk denklemin tanım alanına uymalıdır."
      ],
      "strategy": "Önce paydayı sıfır yapan değeri ayır. Sonra izinli değerlerde sol tarafın neye eşit olduğuna bak.",
      "steps": [
        "Payda x−2, bu yüzden x≠2.",
        "İzinli x’te 3x−6=3(x−2) olduğundan sol taraf 3 olur.",
        "3, 4’e eşit değildir. Payda ile çarparak çıkan x=2 adayı da tanımsız olduğu için elenir."
      ],
      "optionReasons": [
        "x=2 tanım dışıdır. Her izinli değer sol tarafı 3 yapar, bu yüzden çözüm yoktur.",
        "Aday 2 baştaki x≠2 koşulunu sağlayamaz.",
        "Bütün izinli değerler sol tarafı 3 yapar. Sağ taraf 4 olduğu için bunların hiçbiri çözüm değildir.",
        "x=0’da payda −2, kesir tanımlıdır. Tanımsız olan 2’dir.",
        "x=2 için 0/0 oluşur. Tanımsız aday ilk eşitliği sağlayamaz."
      ],
      "commonError": "Paydayı sadeleştirdiğinde x≠2 koşulunu silme.",
      "check": "x=0 denemesinde (−6)/(−2)=3. Her izinli x aynı nedenle 3 verir."
    },
    {
      "code": "Q46",
      "prompt": "Bir sergide 2 tam ve 3 indirimli bilet 230 TL, 3 tam ve 2 indirimli bilet 270 TL. İki alışverişte de her türün birim fiyatı aynı. Tam ve indirimli birim fiyatları sırasıyla kaç TL?",
      "options": [
        "70 ve 30",
        "30 ve 70",
        "65 ve 35",
        "75 ve 25",
        "60 ve 40"
      ],
      "knowledge": [
        "Toplam ücret, her türün adedi ile birim fiyatının çarpımlarının toplamıdır.",
        "İki alışveriş aynı bilinmeyen fiyatlarla ayrı denklem verir."
      ],
      "strategy": "t tam, s indirimli fiyat olsun. İki alışverişi eşitlik yap ve t katsayılarını eşitle.",
      "steps": [
        "2t+3s=230 ve 3t+2s=270.",
        "İlki 3, ikincisi 2 ile çarpılır. İlk yeni satırdan ikinciyi çıkar: 5s=150, s=30.",
        "2t+90=230, t=70."
      ],
      "optionReasons": [
        "2×70+3×30=230 ve 3×70+2×30=270. Her iki toplam tutar.",
        "2×30+3×70=270 ve 3×30+2×70=230. İki fiyatın sırası ters.",
        "2×65+3×35=235, 3×65+2×35=265. İki toplam da yanlış.",
        "2×75+3×25=225, 3×75+2×25=275. İki farkı açıklamaz.",
        "2×60+3×40=240, 3×60+2×40=260. Fiyatlar toplamları sağlamaz."
      ],
      "commonError": "Fiyatları adet sırasıyla eşleştir. Tam fiyatı ve indirimli fiyatı yer değiştirme.",
      "check": "İki tam biletin toplamı 140 TL ve üç indirimli biletin toplamı 90 TL. İkinci alışta 210+60=270 TL."
    },
    {
      "code": "Q47",
      "prompt": "x+y=6 ve x−y=2 doğrularının kesişimini bul. Hangi seçenekte hem doğru kesişim hem x+y=6 doğrusu üzerinde çizime uygun iki ayrı nokta verilmiştir?",
      "options": [
        "Kesişim (4, 2). Noktalar (0, 6) ve (6, 0).",
        "Kesişim (2, 4). Noktalar (0, 6) ve (6, 0).",
        "Kesişim (4, 2). Noktalar (0, −2) ve (2, 0).",
        "Kesişim (3, 3). Noktalar (0, 6) ve (3, 3).",
        "Kesişim (4, 2). Noktalar (0, 6) ve (0, 6)."
      ],
      "knowledge": [
        "Kesişim iki eşitliği birlikte sağlar.",
        "Bir doğruyu çizmek için üzerinde iki ayrı nokta bulunabilir."
      ],
      "strategy": "İki eşitliği toplayarak kesişimi bul. İlk eşitlikte sırayla x=0 ve y=0 dene.",
      "steps": [
        "Toplama 2x=8 verir. x=4 ve x+y=6’dan y=2.",
        "x=0 iken y=6 ve y=0 iken x=6. Bu noktalar farklıdır.",
        "Kesişimin iki eşitliği sağladığını denetle."
      ],
      "optionReasons": [
        "(4, 2) için toplam 6 ve fark 2. İki diğer noktanın da toplamı 6.",
        "(2, 4) toplamı 6 fakat farkı −2, kesişim değildir.",
        "(0, −2) ile (2, 0) ikinci doğrunun üzerindedir. Toplamları 6 değildir.",
        "(3, 3) toplamı 6 fakat farkı 0, kesişim değildir.",
        "Kesişim doğru fakat aynı nokta iki kez yazılmış. İki ayrı nokta gerekir."
      ],
      "commonError": "İlk doğru için ikinci doğrunun eksen kesişimlerini seçme.",
      "check": "4+2=6 ve 4−2=2. (0, 6) ve (6, 0) için x+y=6."
    },
    {
      "code": "Q48",
      "prompt": "A ve B depolarında başlangıçta toplam 18 L su var. A’dan B’ye kayıpsız 3 L aktarılınca miktarlar eşit oluyor. Başlangıçta A ve B sırasıyla kaç litreydi?",
      "options": [
        "12 L ve 6 L",
        "6 L ve 12 L",
        "9 L ve 9 L",
        "10,5 L ve 7,5 L",
        "15 L ve 3 L"
      ],
      "knowledge": [
        "Kayıpsız aktarım ilk kaptan azaltıp ötekine aynı miktarı ekler.",
        "Aktarılan su iki kap arasındaki dağılımı değiştirir, toplamı korur."
      ],
      "strategy": "İlk toplamı ayrı yaz, eşitlenmeyi aktarım sonrası iki ifadeyle kur.",
      "steps": [
        "a+b=18. Aktarımdan sonra a−3=b+3.",
        "İkinci denklem a−b=6. Toplayınca 2a=24, a=12 ve b=6.",
        "Kontrol 12−3=9 ve 6+3=9."
      ],
      "optionReasons": [
        "Aktarım sonrası 9 ve 9 L vardır. Toplam başta ve sonda 18 L.",
        "A’dan B’ye aktarım sonrası 3 ve 15 L olur.",
        "9 ve 9 L başlangıçta eşit olsa bile aktarım sonrası 6 ve 12 L olur.",
        "İlk fark 3 L, aktarımın iki kap üzerindeki toplam fark etkisi 6 L. Sonuç 7,5 ve 10,5 L olur.",
        "Aktarım sonrası 12 ve 6 L kalır, eşitlenmez."
      ],
      "commonError": "a−b=3 yazma. Bir tarafa 3 eklenip ötekinden 3 çıkarıldığı için fark etkisi 6 L’dir.",
      "check": "12≥3 koşulu sağlanır. Son toplam 9+9=18 L."
    },
    {
      "code": "Q49",
      "prompt": "Aynı x ve y için x+y=7 ve x−y=3 veriliyor. (x, y) sıralı ikilisi hangisidir?",
      "options": [
        "(5, 2)",
        "(2, 5)",
        "(4, 3)",
        "(3, 0)",
        "(7, 0)"
      ],
      "knowledge": [
        "Sıralı ikilinin ilk bileşeni x, ikincisi y’dir.",
        "Bir çiftin hem toplamı 7 hem x’ten y çıkarılınca 3 olmalıdır."
      ],
      "strategy": "Toplamı 7 olan seçenekleri ayır. Sonra her çiftte birinci bileşenden ikinciyi çıkar.",
      "steps": [
        "Toplamı 7 olanlar (5, 2), (2, 5), (4, 3), (7, 0).",
        "Farkları sırasıyla 3, −3, 1 ve 7. Yalnız ilki farkı da sağlar."
      ],
      "optionReasons": [
        "5+2=7 ve 5−2=3, iki koşul birlikte sağlanır.",
        "2+5=7 fakat 2−5=−3 olur. Bileşenleri yer değiştirince farkın işareti değişir.",
        "4+3=7 fakat 4−3=1.",
        "3−0=3 fakat 3+0=3, toplam koşulu eksik.",
        "7+0=7 fakat 7−0=7, fark koşulu eksik."
      ],
      "commonError": "İki bileşeni sıradan bağımsız bir küme gibi okuma.",
      "check": "Denklemleri toplayınca 2x=10, x=5 ve y=2 bulunur."
    },
    {
      "code": "Q50",
      "prompt": "x+2y=8 ve x−2y=4 sisteminin iki eşitliği toplanınca 2x=12 çıkıyor. Sistemin çözümünü tamamlamak için hangi adım geçerlidir?",
      "options": [
        "x=6’yı x+2y=8’de kullanıp y=1 bulmak",
        "Yalnız 2x=12 ile her y’nin çözüm olduğunu söylemek",
        "x=6 için y’yi ikinci eşitlikte 5 almak",
        "İlk satırda 2y’yi sıfıra eşitlemek",
        "Toplamda 2y terimini bırakıp 2x+2y=12 yazmak"
      ],
      "knowledge": [
        "İki eşitlikten çıkarılan tek denklem yeni bir gerekli koşul verir.",
        "Bir bilinmeyen yok olursa değerini, o bilinmeyenin katsayısı sıfır olmayan bir başlangıç eşitliğinden bulursun."
      ],
      "strategy": "2x=12’den x’i bul. İlk iki denklemden birinde x’i yerine koy.",
      "steps": [
        "Toplamda y katsayıları 2 ve −2 birbirini götürür. 2x=12, x=6.",
        "6+2y=8’den 2y=2, y=1.",
        "İkinci denklemde 6−2×1=4."
      ],
      "optionReasons": [
        "İlk satırdan y=1 bulunur ve ikinci satır da bu çifti doğrular.",
        "2x=12 tek başına y’yi söylemez. İki başlangıç denklemi y’yi ayrıca sınırlar.",
        "6−2×5=−4 olur. İkinci eşitliğin sağı 4’tür.",
        "y terimleri iki denklem toplanınca birbirini götürür. Bu, başlangıçtaki 2y’nin 0 olduğu anlamına gelmez.",
        "2y ile −2y’nin toplamı 0’dır. Bu nedenle solda yalnız 2x kalır."
      ],
      "commonError": "Toplam yeni satırında y’nin görünmemesini, ilk iki eşitlikte y’nin serbestliği sanma.",
      "check": "6+2×1=8 ve 6−2×1=4."
    },
    {
      "code": "Q51",
      "prompt": "3x+2y=13 ve x−y=1 sistemi için Δ, ilk satırın x katsayısı ile ikinci satırın y katsayısının çarpımından ilk satırın y katsayısı ile ikinci satırın x katsayısının çarpımının çıkarılmasıdır. Δ ve ortak çözüm sırasıyla hangisidir?",
      "options": [
        "−5 ve (3, 2)",
        "−5 ve (2, 3)",
        "5 ve (3, 2)",
        "−5 ve (4, 1)",
        "0 ve ∅"
      ],
      "knowledge": [
        "Yok etmeden gelen Δ=ae−bd, yazılan denklem sırasına göre işaret taşır.",
        "Çözümü ilk iki eşitlikte kontrol et."
      ],
      "strategy": "3, 2, 1 ve −1’in çapraz çarpım farkını yaz. Ardından ikinci eşitlikten y=x−1 koy.",
      "steps": [
        "Δ=3×(−1)−2×1=−5.",
        "Denklem 3x+2(x−1)=13 olur. 5x−2=13, x=3, y=2.",
        "3×3+2×2=13 ve 3−2=1."
      ],
      "optionReasons": [
        "−3−2=−5 ve (3, 2) her iki eşitliği sağlar.",
        "Δ doğru. (2, 3) ilk eşitlikte 12 ve ikincide −1 verir.",
        "Ortak çift doğru. Verilen çarpım sırasıyla Δ=−5 olur, 5 değil.",
        "Δ doğru. (4, 1) ilk eşitlikte 14 ve ikincide 3 verir.",
        "Verilen çapraz çarpımlar −3 ve 2’dir, fark sıfır değildir. Ortak çözüm vardır."
      ],
      "commonError": "İkinci satırın y katsayısı −1’dir. Eksi işaretini çarpıma dahil et.",
      "check": "Yok etme ile de ilk denkleme ikincisinin iki katını ekleyince 5x=15 çıkar."
    },
    {
      "code": "Q52",
      "prompt": "kx+2y=6 ve 2x+ky=6 sisteminde k gerçek bir katsayıdır. k=2, k=−2 ve k=−3 için sonuçlar sırasıyla hangisidir?",
      "options": [
        "x+y=3 doğrusu, ∅, (−6, −6)",
        "(3/2, 3/2), ∅, (−6, −6)",
        "x+y=3 doğrusu, ∅, (6, 6)",
        "∅, x+y=3 doğrusu, (−6, −6)",
        "x+y=3 doğrusu, x+y=3 doğrusu, ∅"
      ],
      "knowledge": [
        "Bir parametre katsayıyı değiştirerek sistemin türünü değiştirebilir.",
        "Sıfır olabilecek bir katsayıyla bölmeden önce özel değeri dene."
      ],
      "strategy": "2 ve −2’yi doğrudan yerine koy. −3 için iki eşitliği topla ya da çıkar.",
      "steps": [
        "k=2’de her iki eşitlik 2x+2y=6. x+y=3 üzerindeki bütün çiftler çözüm.",
        "k=−2’de iki eşitliği toplayınca 0=12. Çözüm yok.",
        "k=−3’te çıkarınca x=y. (−3+2)x=6, x=y=−6."
      ],
      "optionReasons": [
        "2 aynı doğruyu, −2 çelişkiyi ve −3 tek çifti verir.",
        "(3/2, 3/2), k=2’de bir çözümdür. Örneğin (0, 3) de çözümdür.",
        "k=−3’te (6, 6) her iki sol tarafı −6 yapar, sağ taraf 6’dır.",
        "İlk iki tür yer değiştirmiş. k=2’de çakışma, k=−2’de 0=12 vardır.",
        "k=−2 boş, k=−3 için (−6, −6) her iki eşitliği sağlar."
      ],
      "commonError": "k−2’ye doğrudan bölüp k=2’deki bütün çözümleri kaybetme.",
      "check": "k=−3 ve (−6, −6) için iki sol taraf da 18−12=6."
    }
  ],
  "sheet": [
    {
      "title": "Denklem ve bütün kökler",
      "text": [
        "İfade: 2x+3. Denklem: 2x+3=11. Kök 4, ÇK={4}. {0}≠∅. Sayı alanını başta yaz.",
        "ax+b=cx+d → (a−c)x=d−b. Katsayı ≠0: tek kök; katsayı 0 ve sağ 0: bütün izinli değerler; katsayı 0 ve sağ ≠0: ∅."
      ]
    },
    {
      "title": "Eşdeğer dönüşüm",
      "text": [
        "İki tarafa aynı toplama veya çıkarma; iki tarafı aynı sıfır olmayan sayıyla çarpma veya bölme. 0 ile çarpma bilgi kaybettirir; 0’a bölme tanımsızdır.",
        "“Taşıma” yerine iki taraflı işlemi söyle. Kökü ilk eşitliğin iki tarafında ayrı denetle."
      ]
    },
    {
      "title": "Parantez ve işaret",
      "text": [
        "k(a+b)=ka+kb. 3(x−2)=3x−6; −2(x−3)=−2x+6.",
        "4(x−3)=2x+10 → 4x−12=2x+10 → 2x=22 → x=11. Önce bütün iki tarafı 2’ye bölmek de aynı kökü verir."
      ]
    },
    {
      "title": "Kesir ve tanım koşulu",
      "text": [
        "(x+3)/2, x+3/2 ile aynı değildir. Sabit paydalarda sıfır olmayan ortak katla her iki tarafın tamamını çarp.",
        "(x−1)/3+(x+2)/2=6 → 2(x−1)+3(x+2)=36 → 5x=32 → x=32/5.",
        "Paydada değişken varsa yasak değeri başta yaz; sadeleşse bile koru. (x−1)/(x−1)=2 için x=1 adayı yasaktır, ÇK=∅."
      ]
    },
    {
      "title": "Özdeşlik, çelişki ve parametre",
      "text": [
        "3(x+2)=3x+6 → 0=0 → ℝ. 2(x−1)=2x+5 → −2=5 → ∅.",
        "k(x−1)=2x−k → (k−2)x=0. k≠2: x=0; k=2: bütün gerçek x. Sıfır olabilecek ifadeye koşulsuz bölme."
      ]
    },
    {
      "title": "Sözel sırayı koru",
      "text": [
        "3 katının 5 fazlası: 3x+5. 5 fazlasının 3 katı: 3(x+5). Yarısının 4 eksiği: x/2−4; 4 eksiğinin yarısı: (x−4)/2.",
        "Üçte birinin 4 fazlası 11: x/3+4=11 → x=21. 4 fazlasının üçte biri 11: (x+4)/3=11 → x=29. Birimleri ortak hale getir."
      ]
    },
    {
      "title": "Bilette adet ve fiyat",
      "text": [
        "12 kişi, 80/50 TL, toplam 780 TL: x yetişkin, 12−x öğrenci; 80x+50(12−x)=780 → 6 yetişkin, 6 öğrenci. Adet tam sayı ve 0 ile 12 arasında olmalı.",
        "2 yetişkin, 3 öğrenci, 45 TL fark, 390 TL toplam: 2(s+45)+3s=390 → s=60, yetişkin 105 TL. Her yetişkin için farkı ayrı say."
      ]
    },
    {
      "title": "Sabit artışın başlangıcı",
      "text": [
        "aₙ=a₁+d(n−1). n=1 kontrolü a₁ vermeli. İlk 5, artış 4, hedef 69 → n=17.",
        "Özgün ilk 1, +3 artış, hedef 241 → n=81. İlk 2 olsaydı n=242/3, pozitif tam sayı adımı yok. 2024 TYT 17’de ilk gün x, 15. gün x+14, 16. gün x+13. İki 15 günlük toplamı birleştir: (15x+105)+(15x+90)=1395, x=40 dakika."
      ]
    },
    {
      "title": "Geçerli kısa yol ve yakın örnek",
      "text": [
        "6(x−2)=3x+12 → iki tarafı 3’e böl → 2(x−2)=x+4 → x=8.",
        "6x−2=3x+12 → x=14/3. İki tarafı 3’e bölmek yine geçerli: 2x−2/3=x+4. Yalnız 6x’i bölmek geçersiz. Bütün terimleri ve koşulları koruyan yolu seç."
      ]
    },
    {
      "title": "İlk hatayı onar",
      "text": [
        "3(x−2)=12 → 3x−2 ilk dağıtma hatası; doğru açılım 3x−6. 4x+7=2x+19 → 2x=26 yanlış; doğru 2x=12.",
        "Özdeşlikte yalnız x=0 deme; örüntüde artış sayısının n−1 olduğunu gör; başlangıç denklemi, birim ve sayı alanı kontrolünü yenile."
      ]
    },
    {
      "title": "Sistem kur ve iki eşitliği denetle",
      "text": [
        "(x, y) sırasıyla iki bilinmeyenin değeridir. Ortak çözüm her iki eşitliği sağlar. x+y=5 ve x−y=1 için (3, 2) çözüm, (2, 3) yalnız ilk denklemin çözümüdür.",
        "x+y=5 doğrusunda (0, 5) ve (5, 0), x−y=1 doğrusunda (0, −1) ve (1, 0) noktalarını birleştir. Düşey x=2 ve yatay y=3 doğruları da aynı iki nokta kuralına uyar.",
        "Kesişme bir çift, farklı paralel doğrular boş küme, çakışma ortak doğru üzerinde sonsuz çift verir. 0=0 her çifti kabul eden satır, 0=5 bütün çiftleri eleyen satırdır."
      ]
    },
    {
      "title": "Yerine koy, yok et, çapraz farkı denetle",
      "text": [
        "Bir bilinmeyen yalnızsa değerini öteki denklemde kullan. x+y=7 → y=7−x. 2x−y=5’te 2x−(7−x)=5 olur. (4, 3) çiftini her iki eşitlikte denetle.",
        "Eşit katsayıyı çıkar, zıt katsayıyı topla. Gerekirse bir eşitliğin iki tarafının tamamını sıfır olmayan aynı sayıyla çarp. Bir başlangıç eşitliğini sakla ve diğer bilinmeyene geri dön.",
        "ax+by=c ve dx+ey=f için Δ=ae−bd. Δ≠0 ise x=(ce−bf)/Δ, y=(af−cd)/Δ. Δ=0 iken bölme yapma, sabitlerle birlikte çözüm türünü belirle."
      ]
    },
    {
      "title": "Parametre, fiyat ve aktarım",
      "text": [
        "kx+2y=6 ve 2x+ky=6 sisteminde k=2 → aynı doğru x+y=3. k=−2 → 0=12, çözüm yok. Diğer k’larda x=y=6/(k+2). Katsayıyla bölmeden önce özel durumları ayır.",
        "2 defter ile 3 kalem 31 TL, 3 defter ile 2 kalem 34 TL. 2d+3k=31 ve 3d+2k=34. Birinciyi 3, ikinciyi 2 ile çarp ve çıkar. k=5 ve d=8 TL. İki toplamı geri hesapla.",
        "26 L toplamın 4 L’si A’dan B’ye geçince miktarlar eşitse a+b=26 ve a−4=b+4. a−b=8, başlangıç 17 ve 9 L. Son 13 ve 13 L. Hacim aktarımda korunur."
      ]
    },
    {
      "title": "Tek bilinmeyende yöntemi seç",
      "text": [
        "3x+2=17’de sabiti çıkar, x=5. 0x+2=17 için sıfıra bölme, çözüm yoktur. 2 L başlangıç ve dakikada 3 L artışla 17 L’ye ulaşmak için 5 dakika gerekir.",
        "6(x−2)=3x+12’de iki tarafı 3’e böl ve x=8 bul. 6x−2=3x+12’de yalnız 6x’i bölme. Doğru sonuç 14/3. Kargo maliyetleri 6(t−2) ve 3t+12 olduğunda t=8 için iki bedel 36 TL.",
        "2−3(x−1)=11’de açılım 2−3x+3, kök −2. −3(x−1)’de x=0 koyduğunda +3 çıkar. Beş paketin her birinde n−2 parça varsa 5(n−2)=35 koşulu n=9 verir.",
        "(x−1)/2+(x+1)/3=4 için 6 ile çarp ve x=5 bul. (x−1)/(x−1)=2 için cebirsel aday x=1 başlangıçta yasaktır. x/2 ve x/3 saat toplam 5 saat ise x=6.",
        "9 ürün 5 ya da 8 TL ve toplam 54 TL ise 5(9−x)+8x=54, x=3. 8x yerine 8, bir ürünü sayar. 7 araç 10 ya da 14 koltuk ve toplam 82 ise 10(7−x)+14x=82, x=3 büyük araç.",
        "İlk terim 4, artış 3, hedef 31 ise n=10. 4, 7, 11, 16’da artışlar 3, 4, 5 olduğu için bir ortak d yoktur. İlk sıra 12 ve her sıra 2 fazla ise 30 koltuklu sıra 10. sıradır."
      ]
    },
    {
      "title": "İki bilinmeyende yöntemin sınırı",
      "text": [
        "y=x+1 ve x+y=7 → (3, 4). İkinci denklem yerine y=x+1’i yeniden kullanmak yalnız özdeşlik verir. Kırmızı adedi maviden 1 fazla ve toplam 7 ise mavi 3, kırmızı 4’tür.",
        "x+2y=8 ve x−y=2 için çıkar: 3y=6, (4, 2). Toplarsan y kalır. Bir ürün iki y tutarı eklenince 8 TL, bir y tutarı indirilince 2 TL ise ürün 4 TL ve tutar 2 TL.",
        "x+y=4 ile 2x+2y=8 çakışır. Sağ sabit 9 olursa çözüm yoktur. A ve B negatif olmayan bütçe tutarıysa A+B=4, (0, 4) ile (4, 0) arasındaki doğru parçasına daralır."
      ]
    }
  ],
  "source": "Aurelia TYT Birinci Dereceden Denklemler kopya kağıdı, 19 Kasım 2026. Format V5, içerik 1.3 ve 18 fiziksel sayfanın öğretim uyarlaması. Sistem kavramı ve yöntemleri MEB OGM Matematik 9, Ünite 3 basılı 129–132 / HTML 51–54 ile karşılaştırıldı. 2024 TYT Temel Matematik 17’nin fiziksel PDF sayfası 29, basılı sayfası 27 ve anahtarı 43. C seçeneği 40 dakikadır. Bu bölümün çözüm açıklaması özgün öğretim anlatımıdır. Kaynakta ÖSYM arşiv taraması kısmi olarak kayıtlıdır."
};
const source010SummaryExamples = [
  {
    "title": "Kesişimi iki koşulla doğrula",
    "prompt": "x+y=5 ve x−y=1 doğruları nerede kesişir? Her denklem için çizimde kullanabileceğin iki nokta yaz.",
    "steps": [
      "İlk doğru (0, 5) ve (5, 0). İkinci doğru (0, −1) ve (1, 0).",
      "İki eşitliği toplayınca 2x=6 olur. x=3 ve y=2.",
      "3+2=5 ve 3−2=1 ile iki koşulu da denetle."
    ],
    "answer": "Ortak nokta (3, 2)."
  },
  {
    "title": "Önce özel katsayıları ayır",
    "prompt": "kx+2y=6 ve 2x+ky=6 sisteminde k=2, k=−2 ve diğer değerlerin çözüm türünü ayır.",
    "steps": [
      "k=2’de iki eşitlik de x+y=3 doğrusudur.",
      "k=−2’de toplama 0=12 verir, ortak çözüm yoktur.",
      "Diğer k’larda çıkarınca (k−2)(x−y)=0. x=y ve (k+2)x=6."
    ],
    "answer": "k=2 aynı doğru. k=−2 boş küme. Diğer k’larda (6/(k+2), 6/(k+2))."
  }
];
const source010SummaryRecall = [
  {
    "prompt": "Çakışma hangi noktaları çözüm yapar?",
    "answer": "Yalnız ortak doğru üzerindeki bütün noktaları."
  },
  {
    "prompt": "Δ sıfırsa ilk kontrol nedir?",
    "answer": "0’a bölme. Sıfır katsayılı satırı ayır ve öteki durumlarda katsayılar kadar sabitlerin de orantılı olup olmadığına bak."
  },
  {
    "prompt": "Aktarım a−4=b+4 ise ilk fark kaçtır?",
    "answer": "a−b=8. Bir kap 4 azalırken öteki 4 artar."
  }
];
const pack=linearEquationsSource036Pack;
const objectives=["Eşdeğer işlemleri koşullarıyla uygula; tek çözüm, özdeşlik ve çelişkiyi ayır.","Parantez, kesir ve parametreyi ilk denklem ve tanım koşuluyla denetle.","Sözel ilişkileri, bilet modellerini ve sabit artışı birim/sayı alanıyla kur; yakın hatayı açıkla.","İki bilinmeyeni grafik, yerine koyma ve yok etmeyle çöz. Ortak çifti her iki denklemde denetle."];
export const linearEquationsSource036Guides:LessonGuide[]=[{id:pack.id,minutes:pack.minutes,source:pack.source,objectives,sections:pack.sections,examples:pack.examples,recall:pack.recall}];
export const linearEquationsSource036Lessons:Lesson[]=[{id:pack.id,title:txt(pack.title),subjectId:"tyt-matematik",minutes:pack.minutes,objectives:objectives.map(txt),source:txt(pack.source),tags:["kaynakli-anlatim","Özgün öğretim soruları"],body:pack.sections.map((s)=>({title:txt(s.title),text:txt(s.paragraphs.join("\n\n"))})),questions:pack.items.map((item,index):Question=>{const order=item.options.map((_,i)=>(i+((2*index+1)%5))%5);return{id:`f036-${pack.id}-${index+1}`,prompt:txt(item.prompt),options:order.map((i)=>txt(item.options[i])),answer:order.indexOf(0),hint:txt(item.strategy),explanation:txt(item.steps.join(" ")+" Denetim: "+item.check),skill:pack.id,guidance:{knowledge:item.knowledge,strategy:item.strategy,steps:item.steps,optionReasons:order.map((i)=>item.optionReasons[i]),commonError:item.commonError,check:item.check}};})}];
export const linearEquationsSource036Sheets:CheatSheet[]=[{topicId:`topic-${pack.id}`,lessonId:pack.id,title:pack.title,subjectId:"tyt-matematik",sections:pack.sheet,cautions:["Sıfırla çarpma çözüm bilgisini kaybettirir; sıfıra bölünmez.","Payda ve sayı alanı koşulları sadeleşse bile korunur.","Sabit artış ile katlanma farklıdır; resmî atıf gerçek kitapçık/anahtarla doğrulanır."],examples:[...[pack.examples[5],pack.examples[18]].map((e)=>({title:e.title,prompt:e.prompt,steps:e.steps.map((s)=>s.explanation),answer:e.answer})),...source010SummaryExamples],recall:[...pack.recall.slice(0,4),...source010SummaryRecall],source:pack.source}];
