import type { LessonGuide } from "./types";

export const factorizationGuide: LessonGuide = {
  id: "carpanlara-ayirma",
  minutes: 65,
  objectives: [
    "Terim, katsayı ve çarpanı ayır; dağıtma işlemini iki yönde kullan.",
    "Ortak çarpan, gruplama ve uygun özdeşliği gerekçesiyle seç.",
    "İkinci dereceden ifadede orta terimi ve çarpımı birlikte denetle.",
    "Değişken değiştirme, sıfır çarpım ve rasyonel ifadelerde tanım koşullarını koru.",
  ],
  sections: [
    {
      title: "Çarpanlara ayırma, aynı ifadeyi başka yapıda görmektir",
      paragraphs: [
        "6x+9 ifadesinde iki terim vardır; 3(2x+3) aynı ifadenin çarpım biçimidir. Açılmış biçim toplama ilişkisini, çarpım biçimi ortak yapıyı gösterir. Burada 3 ve 2x+3 çarpandır. Bir ifadenin terimleri ile çarpanları aynı şey değildir: x²−4’ün terimleri x² ve −4, çarpanları x−2 ve x+2 olabilir.",
        "Dağıtma a(b+c)=ab+ac eşitliğini verir. Çarpanlara ayırırken bu ilişkiyi ters yönde okuruz. Değişen ifade değeri değil, yazılış biçimidir; eşitlik izin verilen bütün değişken değerlerinde korunmalıdır. x=2 için iki ifadenin aynı çıkması iyi bir hata kontrolüdür fakat tek başına özdeşlik kanıtı değildir. Asıl denetim çarpımı açıp bütün katsayıların eski hâle dönmesidir.",
      ],
    },
    {
      title: "İlk bakış: bütün terimlerde ortak ne var?",
      paragraphs: [
        "Katsayıların ortak bölenini ve her terimde bulunan değişkenleri ara. Ortak değişkenin en küçük üssü dışarı alınabilir: 12x³y−18x²y²=6x²y(2x−3y). Çünkü her terimi 6x²y ile çarpılmış bir ifade olarak yeniden yazabiliriz. Sonradan çarparak 12x³y ve −18x²y² terimlerinin ikisini de geri elde et.",
        "Bir terimin tamamı dışarı aldığın çarpana eşitse parantez içinde 1 kalır: 5x²+5x=5x(x+1). Ortak çarpan bazen bir parantezin tamamıdır: (x−2)(x+5)+3(x−2)=(x−2)(x+8). Dışarı alınan çarpan kaybolmaz; yalnız içeride tekrar yazılmaz. Sayısal ortak böleni en büyük seçmek işlemi kısaltır; daha küçük bir ortak çarpanla başlamak eşitliği bozmaz ama işi yarım bırakabilir.",
      ],
    },
    {
      title: "Eksi işareti de ortak çarpan olabilir",
      paragraphs: [
        "−4x²+8x=−4x(x−2) yazılabilir. −4x dışarı alınırken içerdeki her bölümün işaretini ayrı düşün. Özellikle a−b=−(b−a) olduğundan ters sıradaki parantezleri eşitlemek için bir eksi gerekir. 2(x−3)−x(3−x)=2(x−3)+x(x−3)=(x−3)(x+2).",
        "Parantezin yalnız ilk işaretini değiştirme: −(x−5)=−x+5’tir. İşaret şüphesinde x=0 gibi uygun bir değer yanlışlığı çabuk gösterebilir; ancak doğru genel biçim yine dağıtma ile doğrulanır. Baştaki eksi ve her parantezin sınırını satır satır korumak çoğu işlem hatasını önler.",
      ],
    },
    {
      title: "Gruplandırmada hedef, aynı parantezi iki kez üretmektir",
      paragraphs: [
        "ax+ay+bx+by ifadesinde bütün dört terimde ortak değişken olmayabilir. İlk iki terimi a(x+y), son ikisini b(x+y) yapınca yeni ortak çarpan x+y olur: (a+b)(x+y). Gruplandırma yalnız yan yana duran ilk iki terimi seçmek değildir; toplamadaki terimler işaretleriyle birlikte yer değiştirebilir.",
        "x³−2x²+3x−6 için x²(x−2)+3(x−2)=(x−2)(x²+3). Buna karşılık gruplardan x−2 ve x+2 çıktıysa bunlar aynı parantez değildir. Ortaklaştırmadan önce işareti veya gruplamayı yeniden denetle. Dört terim her zaman kolay bir gruplama bulacağını garanti etmez; amaç eşitliği koruyarak ortak yapı aramaktır.",
      ],
    },
    {
      title: "Tam karede uçlar kadar orta terim de önemlidir",
      paragraphs: [
        "(a+b)²=a²+2ab+b² ve (a−b)²=a²−2ab+b². İki ayrı çarpımdan ab ve ba geldiği için orta terim 2ab olur. x²+6x+9=(x+3)²; çünkü x² ve 9 kare, 6x de 2·x·3’tür. Yalnız ilk ve son terimin kare olması yetmez: x²+9, (x+3)² değildir; 6x eksiktir.",
        "4x²−12x+9=(2x−3)² örneğinde hem katsayıların köklerini hem orta terimin işaretini kontrol et. Üç terimli bir toplamın karesinde (a+b+c)²=a²+b²+c²+2ab+2ac+2bc; ikili çarpımlar atlanmaz. Ters yönde verilen a+b ve ab bilgilerinden a²+b²=(a+b)²−2ab kurulabilir; her zaman a ile b’yi tek tek bulmak gerekmez.",
      ],
    },
    {
      title: "İki kare farkı: toplam ile farkın çarpımı",
      paragraphs: [
        "a²−b²=(a−b)(a+b). Açılımda +ab ve −ab birbirini götürür. 9x²−16=(3x−4)(3x+4). Önce ortak çarpan varsa onu çıkar: 2x³−18x=2x(x²−9)=2x(x−3)(x+3). Çarpanlara ayırma ilk parantezden sonra bitecek diye bir kural yoktur; yeni çarpanların yapısını da incele.",
        "a²+b² ifadesine aynı kural uygulanmaz: (a−b)(a+b) kareler toplamı değil farkıdır. Gerçek sayılarla çalışırken x²+4, gerçek katsayılı iki doğrusal çarpana ayrılamaz. ‘Daha fazla ayrılamıyor’ yargısı sayı alanına bağlıdır; x²−2 tam sayı katsayılı doğrusal çarpanlara ayrılmaz ama gerçek sayılarda (x−√2)(x+√2) yazılır. Bu dersteki geometri modeli a>b>0 içindir; cebirsel özdeşliğin kendisi bütün gerçek a,b için geçerlidir.",
      ],
    },
    {
      title: "Küpler: benzer görünen iki farklı aile",
      paragraphs: [
        "Küp açılımları (a+b)³=a³+3a²b+3ab²+b³ ve (a−b)³=a³−3a²b+3ab²−b³’tür. Buna karşılık iki küpün toplamı a³+b³=(a+b)(a²−ab+b²), farkı a³−b³=(a−b)(a²+ab+b²) olur. Toplamın küpü ile küpler toplamını aynı formül sanma.",
        "x³+8=(x+2)(x²−2x+4); x³−27=(x−3)(x²+3x+9). İlk parantezdeki işaret dıştaki toplam/farkla aynı, ikinci parantezin orta terimindeki işaret ters olur; son terim +b² kalır. Ezberin yanına kısa bir açılım kontrolü koy: küplerde ara terimler birbirini götürmeli. a³+b³+c³−3abc=(a+b+c)(a²+b²+c²−ab−ac−bc); özellikle a+b+c=0 ise a³+b³+c³=3abc sonucu gelir. Bu koşul olmadan son sonuç kullanılamaz.",
      ],
    },
    {
      title: "x²+bx+c için toplam ve çarpımı birlikte ara",
      paragraphs: [
        "(x+p)(x+q)=x²+(p+q)x+pq. Bu yüzden x²+bx+c’yi bu biçimde ayırmak için p+q=b ve pq=c koşulları aynı anda sağlanır. x²−x−12’de çarpımı −12, toplamı −1 olan sayılar −4 ve 3’tür; sonuç (x−4)(x+3). Yalnız çarpımı tutan bir ikili orta terimi yanlış yapabilir.",
        "c>0 ise p ve q aynı işaretli; toplam b onların ortak işaretini belirler. c<0 ise zıt işaretli iki sayı aranır; mutlak büyüklüklerden hangisinin büyük olduğunu toplamın işareti söyler. c=0 ise x ortak çarpandır: x²+7x=x(x+7). Her üç terimli ifade tam sayılı p,q ile ayrılmaz; bulamadığında rastgele ikili seçme. Modelde p,q’yu değiştirip oluşan b ve c’yi eşzamanlı izle.",
      ],
    },
    {
      title: "Baş katsayı 1 değilse çapraz terimlerin toplamını denetle",
      paragraphs: [
        "(px+m)(tx+n)=ptx²+(pn+mt)x+mn. Dolayısıyla a=pt, b=pn+mt, c=mn olmalıdır. 6x²+x−2 için (3x+2)(2x−1) seçildiğinde çapraz terimler −3x+4x=x olur. Uç çarpımların doğru olması tek başına yeterli değildir; ortanca katsayı da geri gelmelidir.",
        "Orta terimi ayırma aynı denetimin düzenli yoludur. 6x²+x−2’de a·c=−12, toplamı 1 olan sayılar 4 ve −3: 6x²+4x−3x−2=2x(3x+2)−1(3x+2). Sonuç (3x+2)(2x−1). Önce ortak katsayı varsa dışarı almak daha küçük sayılarla çalıştırır. Sıfır veya negatif baş katsayıyı sessizce yok etme; her dönüşümde katsayıyı koru.",
      ],
    },
    {
      title: "Değişken değiştirirken geri dönüşü unutma",
      paragraphs: [
        "Aynı ifade tekrar ediyorsa ona geçici bir ad ver. (x²+x)²−5(x²+x)+6 için u=x²+x yazılır; u²−5u+6=(u−2)(u−3). Sonra u yerine mutlaka x²+x geri konur. Çarpanlar x²+x−2 ve x²+x−3’tür; birincisi ayrıca (x+2)(x−1) olur. İkincisini tam sayı çarpanlarla zorla ayırmak gerekmez.",
        "x⁴−5x²+4 için u=x² seçimi (u−1)(u−4) verir; geri dönüş ve iki kare farkıyla (x−1)(x+1)(x−2)(x+2) bulunur. İşlem yalnız ifadeyi dönüştürüyorsa u’nun koşuluyla kök elemek gerekmez; fakat bir denklemde u=x² kullanılıyorsa u≥0 koşulu gerçek çözüme dönüşte önemlidir. İfade dönüştürme ile denklem çözme görevlerini ayır.",
      ],
    },
    {
      title: "Çarpım sıfırsa neden her çarpanı ayrı inceleriz?",
      paragraphs: [
        "Gerçek sayılarda A·B=0 ancak A=0 veya B=0 olduğunda gerçekleşir. (x−2)(x+5)=0 denkleminin çözümleri x=2 ve x=−5’tir. Bu sonuç ‘her iki çarpan aynı anda sıfırdır’ demek değildir. Çarpım 6 olduğunda çarpanları tek tek 6’ya eşitleyemezsin.",
        "x²=4x → x(x−4)=0 denklemini doğrudan x’e bölmek x=0 çözümünü kaybettirir. Çarpanlara ayırıp sıfır çarpım kuralı kullanmak iki kökü de korur. Polinom için P(r)=0 ise x−r bir çarpandır; bu bağ, kök verildiğinde çarpan bulmayı kolaylaştırır. Özdeşlik P(x)=Q(x) bütün izinli x’lerde, bir denklem ise yalnız çözümlerinde eşittir; bu kavramları karıştırma.",
      ],
    },
    {
      title: "Sadeleşen çarpanın yasak değeri geri gelmez",
      paragraphs: [
        "(x²−9)/(x−3) ifadesinin başlangıç koşulu x≠3’tür. Payı (x−3)(x+3) yazıp ortak çarpanı sadeleştirince x+3 kalır; fakat hâlâ x≠3. Sadeleşmiş biçim başlangıç ifadesinin tanımsız olduğu noktaya yeni bir değer vermez. Koşulu en başta not edip her satırda yanında taşımak güvenilir bir alışkanlıktır.",
        "Toplamın içindeki terimler sadeleştirilmez: (x+3)/x, 1+3 değildir; x≠0 için 1+3/x’tir. Önce pay ve paydayı çarpım hâline getir. Denklem çözerken de önce başlangıç paydasını sıfır yapan değerleri dışla, sonra bulunan adayları ilk ifadeye koy. Bir çarpana bölmek ve sıfır çarpım kuralını kullanmak farklı işlemlerdir.",
      ],
    },
    {
      title: "Yöntemi nasıl seçer, çözümü nasıl geri kontrol edersin?",
      paragraphs: [
        "Önce ortak çarpana bak; sonra terim sayısı ve üs düzenini incele. İki terimde kare/küp farkı veya küp toplamı, üç terimde tam kare ya da ikinci dereceden yapı, dört terimde uygun gruplama denenebilir. Tekrarlanan bileşik ifadeler değişken değiştirmeye işaret edebilir. Bu bir karar desteğidir; her ifadeyi yalnız terim sayısına bakarak sınıflandıran kesin kural değildir.",
        "Son çarpımı aç: bütün üsler, katsayılar ve işaretler başlangıçla aynı mı? Ortak sayı, değişken veya parantez dışarıda unutuldu mu? Çarpanlardan biri daha ayrılabiliyor mu? Görev denklemse bütün kökler ve tanım koşulları, görev rasyonel ifadeyse başlangıç yasak değerleri korundu mu? Yanlışta yalnız son cevabı ezberlemek yerine hangi kararın hatalı olduğunu bir cümleyle açıklayıp benzer yapıyı yeniden dene.",
      ],
    },
  ],
  examples: [
    {
      title: "Ortak çarpanı sonuna kadar izle",
      prompt: "12x³−27x ifadesini tam sayı katsayılı çarpanlarına ayır.",
      strategy: "Önce 3x’i, sonra kalan iki kare farkını gör.",
      steps: [
        {
          label: "Ortak yapı",
          expression: "12x³−27x=3x(4x²−9)",
          explanation: "Her iki terimdeki 3 ve x korunur.",
        },
        {
          label: "Yeni parantezi incele",
          expression: "4x²−9=(2x−3)(2x+3)",
          explanation: "Uçlar (2x)² ve 3²’dir.",
        },
      ],
      answer: "3x(2x−3)(2x+3)",
      check: "3x(4x²−9)=12x³−27x.",
      pitfall: "İlk ortak çarpanı dışarı alıp 4x²−9’u incelemeden bitirme.",
    },
    {
      title: "Ters parantezin işaretini düzelt",
      prompt: "x(x−4)+2(4−x) ifadesini çarpanlarına ayır.",
      strategy: "4−x=−(x−4) yazıp aynı parantezi üret.",
      steps: [
        {
          label: "İşareti koru",
          expression: "x(x−4)−2(x−4)",
          explanation: "İkinci terimdeki bütün parantezin işareti ters döner.",
        },
        {
          label: "Ortak parantez",
          expression: "(x−4)(x−2)",
          explanation: "x−4 ortak çarpandır.",
        },
      ],
      answer: "(x−4)(x−2)",
      check: "Açılım x²−6x+8; başlangıç açılımı da aynıdır.",
      pitfall: "4−x yerine doğrudan x−4 yazma.",
    },
    {
      title: "Dört terimden iki ortak yapı çıkar",
      prompt: "x³+3x²−4x−12 ifadesini çarpanlarına ayır.",
      strategy: "İki grupta x+3 üret, sonra iki kare farkını sürdür.",
      steps: [
        {
          label: "Grupla",
          expression: "x²(x+3)−4(x+3)",
          explanation: "−4 ikinci grubun her iki terimini üretir.",
        },
        {
          label: "Ortaklaştır ve tamamla",
          expression: "(x+3)(x²−4)=(x+3)(x−2)(x+2)",
          explanation: "x²−4 ayrıca ayrılır.",
        },
      ],
      answer: "(x+3)(x−2)(x+2)",
      check: "(x+3)(x²−4)=x³+3x²−4x−12.",
      pitfall: "İkinci grupta −4x−12’yi −4(x−3) yapma.",
    },
    {
      title: "Tam karenin orta terimini denetle",
      prompt: "9x²−24x+16 ifadesini çarpanlarına ayır.",
      strategy: "3x ve 4’ü aday kökler olarak al, 2·3x·4 çarpımını kontrol et.",
      steps: [
        {
          label: "Uçlar",
          expression: "9x²=(3x)²;16=4²",
          explanation: "Yalnız uçları görmek henüz yeterli değildir.",
        },
        {
          label: "Orta terim",
          expression: "−2·3x·4=−24x",
          explanation: "Eksi tam kare koşulu sağlanır.",
        },
      ],
      answer: "(3x−4)²",
      check: "(3x−4)(3x−4)=9x²−24x+16.",
      pitfall: "(3x−4)² yerine 9x²−16 yazmak orta terimi siler.",
    },
    {
      title: "Baş katsayı bir değil",
      prompt: "6x²+x−2 ifadesini çarpanlarına ayır.",
      strategy: "Çarpımı −12 ve toplamı 1 olan 4 ile −3’ü kullan.",
      steps: [
        {
          label: "Orta terimi ayır",
          expression: "6x²+4x−3x−2",
          explanation: "4x−3x=x olduğundan ifade değişmedi.",
        },
        {
          label: "Grupla",
          expression: "2x(3x+2)−(3x+2)",
          explanation: "İkinci grupta −1 dışarıdadır.",
        },
        {
          label: "Ortaklaştır",
          expression: "(3x+2)(2x−1)",
          explanation: "Çapraz terimler −3x+4x=x olur.",
        },
      ],
      answer: "(3x+2)(2x−1)",
      check: "6x²−3x+4x−2=6x²+x−2.",
      pitfall:
        "Uç çarpımları sağlayan ama orta katsayısı başka olan ikiliyi kabul etme.",
    },
    {
      title: "Küp farkında ara terimleri yok et",
      prompt: "8x³−27 ifadesini çarpanlarına ayır.",
      strategy: "a=2x ve b=3 alıp a³−b³ kullan.",
      steps: [
        {
          label: "Küp tabanları",
          expression: "8x³=(2x)³;27=3³",
          explanation: "İlk çarpan 2x−3’tür.",
        },
        {
          label: "İkinci çarpan",
          expression: "(2x)²+(2x)·3+3²=4x²+6x+9",
          explanation: "İkinci çarpanda orta terim pozitiftir.",
        },
      ],
      answer: "(2x−3)(4x²+6x+9)",
      check: "Ara x² ve x terimleri açılımda birbirini götürür; 8x³−27 kalır.",
      pitfall: "Küp farkını (2x−3)³ sanma.",
    },
    {
      title: "Geçici değişkeni geri koy",
      prompt:
        "x⁴−10x²+9 ifadesini gerçek katsayılı doğrusal çarpanlarına ayır.",
      strategy: "Önce u=x² ile ikinci derece yapıyı çöz.",
      steps: [
        {
          label: "Yeni ad",
          expression: "u²−10u+9=(u−1)(u−9)",
          explanation:
            "1 ve 9’un toplamı 10, çarpımı 9; ikisi de eksi işaretle yerleşir.",
        },
        {
          label: "Geri dön",
          expression: "(x²−1)(x²−9)",
          explanation: "u’nun yerine x² geri yazılır.",
        },
        {
          label: "Tamamla",
          expression: "(x−1)(x+1)(x−3)(x+3)",
          explanation: "İki çarpan da iki kare farkıdır.",
        },
      ],
      answer: "(x−1)(x+1)(x−3)(x+3)",
      check: "(x²−1)(x²−9)=x⁴−10x²+9.",
      pitfall: "u ile bulunan çarpanları x’e dönmeden son cevap diye bırakma.",
    },
    {
      title: "Sıfıra bölersen kök kaybedersin",
      prompt: "x²−5x=0 denklemini gerçek sayılarda çöz.",
      strategy: "x’e bölmek yerine ortak x’i dışarı al.",
      steps: [
        {
          label: "Çarpım",
          expression: "x(x−5)=0",
          explanation: "Çarpımın sıfır olması için en az bir çarpan sıfırdır.",
        },
        {
          label: "İki olasılık",
          expression: "x=0 veya x−5=0",
          explanation: "Sıfır çarpım kuralı iki kökü de korur.",
        },
      ],
      answer: "ÇK={0,5}",
      check: "0²−5·0=0;5²−5·5=0.",
      pitfall: "x’e doğrudan bölmek 0’ı kaybettirir.",
    },
    {
      title: "Sadeleşme koşulu silemez",
      prompt: "(x²−16)/(x−4) ifadesini sadeleştir ve tanım koşulunu yaz.",
      strategy: "İlk paydayı incele, sonra payı çarpım hâline getir.",
      steps: [
        {
          label: "Koşul",
          expression: "x≠4",
          explanation: "Başlangıçta payda sıfır olamaz.",
        },
        {
          label: "Çarpanlara ayır",
          expression: "[(x−4)(x+4)]/(x−4)=x+4",
          explanation: "Sadeleşme yalnız x−4 sıfırdan farklıyken geçerlidir.",
        },
      ],
      answer: "x+4, x≠4",
      check: "x=2 için başlangıç −12/−2=6, son biçim de 6.",
      pitfall: "x=4 için yeni biçim 8 verdi diye ilk ifadeye 8 değeri atama.",
    },
    {
      title: "İki sayıyı tek tek bulmadan ilerle",
      prompt: "Gerçek a,b sayıları için a+b=7 ve ab=10. a²+b² kaçtır?",
      strategy: "Toplamın karesinde iki kez gelen ab’yi ayır.",
      steps: [
        {
          label: "Özdeşlik",
          expression: "(a+b)²=a²+2ab+b²",
          explanation: "a²+b²’yi yalnızlaştır.",
        },
        {
          label: "Yerine koy",
          expression: "a²+b²=7²−2·10=29",
          explanation: "İstenen simetrik ifade verilerden doğrudan bulunur.",
        },
      ],
      answer: "29",
      check:
        "a,b için 2 ve 5 mümkün;4+25=29. Bu yalnız sonuç kontrolüdür, çözüm özdeşlikten gelir.",
      pitfall: "Toplamın karesini a²+b² sanıp 49 yazma.",
    },
  ],
  recall: [
    {
      prompt: "Terim ile çarpan neden aynı şey değildir?",
      answer:
        "Terimler toplama/çıkarma ile ayrılır; çarpanlar çarpım yapısının parçalarıdır. x²−4’ün çarpım biçimi (x−2)(x+2)’dir.",
    },
    {
      prompt: "x²+bx+c’de iki sayı seçerken iki koşul nedir?",
      answer:
        "Toplamları b, çarpımları c olmalı; çarpımı açınca orta terim de geri gelmeli.",
    },
    {
      prompt: "x(x−3)=0 denkleminde x’e bölmek neden tehlikelidir?",
      answer:
        "x=0 olasılığını baştan dışlar; sıfır çarpım kuralı 0 ve 3 köklerini birlikte korur.",
    },
    {
      prompt: "Sadeleşen paydanın yasak değeri ne olur?",
      answer:
        "Başlangıç tanım koşulunda kalır; sadeleştirme başlangıçta tanımsız noktayı tanımlı yapmaz.",
    },
    {
      prompt: "Tek bir sayısal deneme özdeşliği kanıtlar mı?",
      answer:
        "Hayır. Yanlışlığı gösterebilir; genel doğrulama açılım ve katsayı eşitliğinden gelir.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri PDF s.98–102 (ortak çarpan, gruplama, kare/küp özdeşlikleri, üç terim, değişken değiştirme), s.103 rasyonel ifadeler ve s.105 çarpanlarla denklem çözümü; OGM 10. Sınıf Çarpanlara Ayırma Yöntemleri sunusu PDF s.2–9 ve OGM Video Ders Notu Çarpanlara Ayırma–Polinomlar dosyasının ortak çarpan, gruplama, özdeşlik, ikinci derece ve değişken değiştirme metinleriyle karşılaştırılan özgün anlatım. Model ve bütün çözümlü örnekler uygulama için yazılmıştır; resmî sınav sorusu değildir.",
};
