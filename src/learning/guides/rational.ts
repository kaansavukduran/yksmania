import type { LessonGuide } from "./types";
export const rationalGuide: LessonGuide = {
  id: "rasyonel-sayilar",
  minutes: 45,
  objectives: [
    "Rasyonel sayıyı tanımla; sıfır, işaret ve tanım koşullarını gerekçelendir.",
    "Denk kesri modelle, dört işlemi ve çok katlı kesirleri adım adım çöz.",
    "Pozitif ve negatif kesirleri uygun yöntemle sırala.",
    "Sonlu ve devirli ondalıkları kesre dönüştür; bütünün değiştiği problemleri kur.",
  ],
  sections: [
    {
      title: "Rasyonel sayı neyi anlatır?",
      paragraphs: [
        "Bir sayı, a ve b tam sayı ve b sıfırdan farklı olmak üzere a/b biçiminde yazılabiliyorsa rasyoneldir. ℚ bu sayıların kümesidir. Kesir çizgisi bölme işlemi ve aynı zamanda bir gruplama işaretidir: (a+c)/(b+d) ifadesinde bütün pay, bütün paydaya bölünür. Rasyonel olmak yalnız ‘tam bölünmemek’ anlamına gelmez; −5=−5/1 ve 0=0/7 olduğundan tam sayılar da rasyoneldir.",
        "Payda neden sıfır olamaz? a/b=c demek b×c=a eşitliğini gerektirir. a sıfır değilken 0×c=a sağlayan bir c yoktur. 0/0 içinse her c aynı çarpımı verir; bölme tek bir sonuç belirleyemez. Bu nedenle 0/0’a da 1 veya 0 değeri atanmaz. Payın sıfır olmasıyla paydanın sıfır olması farklı durumlardır.",
        "Sayı ile yazılışını ayır: 1/2, 2/4 ve 0,5 aynı sayıdır. √9=3 rasyoneldir; kök işareti tek başına irrasyonellik kanıtı değildir. √2 ve π rasyonel değildir. Sonsuz ondalıkların hepsi irrasyonel değildir: 1/3=0,333… rasyoneldir.",
      ],
    },
    {
      title: "Aynı bütünü eş parçalara böl",
      paragraphs: [
        "Bir bütün dört eş parçaya ayrıldığında her parçanın büyüklüğü 1/4’tür. Üç parça alınırsa 3/4 elde edilir. Pay kaç parça aldığımızı, pozitif payda bir bütünün kaç eş parçaya bölündüğünü gösterir. Farklı büyüklükte iki bütündeki 1/2’ler eşit alan veya kütle olmak zorunda değildir; kesir aynı oranı belirtir.",
        "Aşağıdaki modelde pay ve paydayı değiştir. Bir bütünün boyutu sabitken payda büyüdükçe parçalar küçülür. Negatif göster seçeneği miktarın sıfırın hangi tarafında olduğunu değiştirir; parçaların sayısı veya mutlak büyüklüğü değişmez. Bu model 0 ile 1 arasındaki büyüklükleri görselleştirir; bileşik kesirler için sayı doğrusunda birden çok bütün gerekir.",
      ],
    },
    {
      title: "Denk kesir, sadeleştirme ve genişletme",
      paragraphs: [
        "Payı ve paydayı aynı sıfır olmayan k sayısıyla çarpmak değeri korur: (a×k)/(b×k)=a/b. Pozitif parça modelinde 3/4’ün her çeyreğini ikiye bölmek altı sekizlik verir: 3/4=6/8. Eşitliğin nedeni, alınan miktarın ve bütünün aynı oranda yeniden bölünmesidir. Sadece payı veya sadece paydayı değiştirmek genellikle sayıyı değiştirir.",
        "Sadeleştirme ortak çarpana bölmektir. 18/24 için iki sayı da 6’ya bölünür ve 3/4 bulunur. Sade kesirde pay ve paydanın mutlak değerlerinin 1’den büyük ortak böleni yoktur. 0/b için b≠0 koşulu unutulmadan sonuç 0’dır. Bir kesrin rasyonel olması için sade yazılması gerekmez.",
        "Toplamın tek terimi çizilmez. (6+3)/3=9/3=3 iken 6’yı 3 ile sadeleştirip 2+3 yazmak 5 verir ve yanlıştır. Güvenli yol bütün payı hesaplamak veya bölmeyi iki terime dağıtmaktır: 6/3+3/3=2+1. Cebirli bir kesirde sadeleştirme yapılınca başlangıçtaki yasak değerler de korunur.",
      ],
    },
    {
      title: "İşaret ve kesir türleri",
      paragraphs: [
        "Bir negatif işaret kesrin önüne taşınabilir: (−a)/b=a/(−b)=−(a/b). İki negatif işaretin bölümünde sonuç pozitiftir. Sıralama yaparken paydayı pozitif yazmak karşılaştırma yönünü izlemeyi kolaylaştırır. Örneğin 3/(−4)=−3/4 olur.",
        "Mutlak pay mutlak paydadan küçükse basit kesir, büyük veya eşitse bileşik kesir denir. −3/5 basit; 7/4 ve 4/4 bileşiktir. Tam sayılı kesir 2 tam 1/3, 2+1/3=7/3 anlamına gelir. Negatif tam sayılı yazımı açık parantezle oku: −(2+1/3)=−7/3; −2+1/3 ise −5/3’tür. Çarpma ve bölmeden önce tam sayılı gösterimi bileşik kesre çevirmek hata riskini azaltır.",
      ],
    },
    {
      title: "Toplama ve çıkarma neden ortak payda ister?",
      paragraphs: [
        "Yarım ile üçte bir farklı büyüklükte parçalardır. Bunları doğrudan ‘iki parça’ diye toplayamayız. Her iki bütün de altıya ayrılırsa 1/2=3/6 ve 1/3=2/6 olur; toplam 5/6’dır. Paydalar eşitlendiğinde yalnız paylar toplanır, çünkü parça boyu artık ortaktır. Paydaların EKOK’unu seçmek genellikle küçük sayılarla çalıştırır; başka bir ortak kat da doğrudur.",
        "Genel olarak a/b+c/d=(ad+bc)/(bd), b ve d sıfırdan farklıdır. Çıkarmada çıkarılan payın tamamını parantezle koru: 1/2−(−1/3)=1/2+1/3. 1/2+1/3=2/5 yanlışını yalnız kuralla değil büyüklükle de yakalayabilirsin: iki pozitif sayı toplanınca sonuç her birinden büyük olmalıdır; 2/5 ise 1/2’den küçüktür.",
      ],
    },
    {
      title: "Çarpma, bölme ve işlem sırası",
      paragraphs: [
        "Kesirlerin çarpımında paylar ve paydalar çarpılır: (a/b)×(c/d)=ac/bd. Çarpanlar arasında işlemden önce sadeleştirme yapılabilir. 2/3’ün 3/4’ü, bir bütünün 1/2’sidir. Ancak ‘çarpma büyütür’ genellemesi yanlıştır; pozitif bir sayıyı 0 ile 1 arasındaki bir sayıyla çarpmak küçültür.",
        "Bir kesre bölmek, bölenin çarpma işlemine göre tersiyle çarpmaktır: (a/b)÷(c/d)=(a/b)×(d/c). Burada b≠0, d≠0 ve ayrıca c≠0 olmalıdır; sıfıra bölünemez. Tersi alınan ilk kesir değil bölen kesirdir. Sonucu bölenle çarptığında başlangıçtaki bölüneni bulman gerekir.",
        "Önce parantez, sonra üsler; ardından aynı öncelikte çarpma ve bölme soldan sağa, sonra toplama ve çıkarma yürütülür. (1/2)÷(1/4)×2=2×2=4’tür. Çok katlı kesirde uzun çizgi üst ve altın tamamını gruplar. Alt ifadenin sıfır olmadığı, sadeleşmeden önce kontrol edilir.",
      ],
    },
    {
      title: "Sıralamada yöntemi koşula göre seç",
      paragraphs: [
        "Paydaları aynı pozitif sayıysa payı büyük olan kesir büyüktür; bu kural negatif paylarda da geçerlidir: −3/8>−5/8. Paylar aynı pozitif sayı, paydalar pozitifse küçük payda büyük kesir verir: 3/4>3/7. Negatif payda işareti taşınmadan bu kısa yol uygulanmaz; −3/4<−3/7’dir.",
        "Paydalar pozitifken çapraz çarpım güvenlidir: a/b<c/d ile ad<bc eşdeğerdir. Çünkü eşitsizliği pozitif bd ile çarparsın. Ortak payda yöntemi aynı fikri açık gösterir: 5/8=15/24 ve 7/12=14/24. Ondalık gösterimi kullanmak da mümkündür; fakat yuvarlatılmış yakın değerlerden kesin eşitlik kararı verme.",
        "0 ile 1 arasındaki kesirler için 1’e eksik miktarını karşılaştırabilirsin. 7/8’in eksiği 1/8, 11/12’nin eksiği 1/12 olduğundan 11/12 büyüktür. Eksiklerin payları farklıysa yalnız paydalara bakmak yeterli değildir. Sayı doğrusunda sağdaki sayı büyüktür; sıfıra uzaklığı büyük olan negatif sayı daha küçüktür.",
      ],
    },
    {
      title: "İki rasyonel sayı arasında yeni bir sayı bul",
      paragraphs: [
        "a<b ise (a+b)/2 iki sayının arasındadır. Uzaklıkların ikisi de (b−a)/2 olur. İki farklı rasyonelin arasında tek bir sayı değil sonsuz sayıda rasyonel bulunur: bulduğun ara sayı ile uçlardan birinin ortalamasını yeniden alabilirsin. Bu özellik rasyonel sayıların yoğunluğudur; sayı doğrusundaki bütün noktaların rasyonel olduğu anlamına gelmez.",
        "Sayı doğrusunda eş aralık sayısını doğru say: 0 ile 1 arasında dört eş parça varsa her adım 1/4’tür. İşaret sayısıyla aralık sayısı aynı değildir; beş sınır işareti dört aralık oluşturur. Bileşik kesir 7/4=1+3/4 olduğu için 1 ile 2 arasında yer alır.",
      ],
    },
    {
      title: "Sonlu ve devirli ondalık gösterim",
      paragraphs: [
        "0,375=375/1000=3/8. Kesir ondalığa çevrilirken pay paydaya bölünür veya payda 10’un kuvvetine genişletilir. Sadeleştirilmiş pozitif paydada yalnız 2 ve 5 asal çarpanları bulunuyorsa açılım sonludur: 3/20=0,15. Paydanın doğrudan 10’un kuvveti olmaması devretme kanıtı değildir; 1/4=0,25 karşı örnektir.",
        "Devirli gösterimde belirli bir basamak grubu sonsuza kadar tekrar eder. x=0,272727… için 100x=27,272727… yazılır; iki eşitlik çıkarılınca 99x=27 ve x=3/11 bulunur. Devirden önce basamak varsa iki kaydırmayı devreden kuyruklar aynı hizaya gelecek şekilde seç: x=0,1666… için 100x−10x=15, yani x=1/6. 0,1667 yuvarlanmış bir değerdir, 1/6’ya tam eşit değildir.",
      ],
    },
    {
      title: "Problemlerde bütün ne?",
      paragraphs: [
        "‘Kalanın üçte biri’ ile ‘başlangıcın üçte biri’ aynı miktar değildir. Önce bütünün ne olduğunu birimle yaz. Bir işin önce 1/4’ü, sonra kalanın 1/3’ü yapılıyorsa ikinci miktar (3/4)×(1/3)=1/4’tür; toplam yapılan 1/2 olur. Sorunun istediği ‘yapılan’ yerine ‘kalan’ ise son adımda bütünle farkı alınır.",
        "Oran yalnız doğru iki büyüklük arasında kurulur. Dolu kabın kütlesiyle kısmen dolu kabın kütlesini karşılaştırmak su doluluğunu vermez; önce ortak boş kabın kütlesini çıkar. Birimlerin aynı olması gerekir. Yaklaşık büyüklük kontrolü, ters işlem ve başlangıç verisine geri koyma üç ayrı hata denetimidir.",
      ],
    },
  ],
  examples: [
    {
      title: "Toplamayı iki yoldan denetle",
      prompt: "3/4 − 5/6 + 1/3 işleminin değerini bul.",
      strategy: "Önce ortak parçayı seç; sonra işaretli payları topla.",
      steps: [
        {
          label: "Ortak payda",
          explanation: "4, 6 ve 3’ün en küçük ortak katı 12’dir.",
          expression: "3/4=9/12; 5/6=10/12; 1/3=4/12",
        },
        {
          label: "İşaretleri koru",
          explanation: "Ortak payda aynen kalır; ortadaki terim çıkarılır.",
          expression: "(9−10+4)/12=3/12",
        },
        {
          label: "Sadeleştir",
          explanation: "Pay ve paydayı ortak 3 çarpanına böl.",
          expression: "3/12=1/4",
        },
      ],
      answer: "1/4",
      check: "Önce −5/6+1/3=−1/2 bulursan 3/4−1/2 yine 1/4 verir.",
      pitfall:
        "Paydaları toplamak veya −5/6’nın işaretini kaybetmek işlemin değerini değiştirir.",
    },
    {
      title: "Bölmeyi ters işlemle doğrula",
      prompt: "(3/5) ÷ (9/10) işlemini yap.",
      strategy: "Bölen sıfır değil; yalnız böleni ters çevir.",
      steps: [
        {
          label: "Bölmeyi çarpmaya dönüştür",
          explanation: "9/10’un çarpımsal tersi 10/9’dur.",
          expression: "(3/5)×(10/9)",
        },
        {
          label: "Çarpanları sadeleştir",
          explanation: "3 ile 9’u 3’e, 10 ile 5’i 5’e böl.",
          expression: "(1×2)/(1×3)=2/3",
        },
      ],
      answer: "2/3",
      check:
        "(2/3)×(9/10)=3/5. Pozitif ve 1’den küçük bölen, bu örnekte sonucu büyütür.",
      pitfall: "İlk kesri ters çevirme. Bölme her zaman küçültmez.",
    },
    {
      title: "Uzun kesir çizgisini parantez gibi oku",
      prompt: "(1−1/3)/(1+1/2) ifadesini hesapla.",
      strategy: "Pay ve paydayı ayrı ayrı tamamla; sonra iki sonucu böl.",
      steps: [
        {
          label: "Üst ve alt grubu bitir",
          explanation: "Her grupta tam sayıyı uygun paydada yaz.",
          expression: "1−1/3=2/3; 1+1/2=3/2",
        },
        {
          label: "Tanım koşulu ve bölüm",
          explanation: "Alt grup 3/2 sıfır değildir. İkinci kesrin tersini al.",
          expression: "(2/3)÷(3/2)=(2/3)×(2/3)=4/9",
        },
      ],
      answer: "4/9",
      check: "(4/9)×(3/2)=2/3, üstteki gruba geri dönülür.",
      pitfall:
        "Kesir çizgisinin kapsadığı grupları parantezsiz tek satır işlemle değiştirme.",
    },
    {
      title: "Negatiflerin arasındaki sayı",
      prompt: "−2/3 ile −3/5’i sırala ve aralarında bir rasyonel sayı bul.",
      strategy: "Önce pozitif ortak payda; sonra ortalamayla ara sayı.",
      steps: [
        {
          label: "Karşılaştır",
          explanation: "Ortak payda 15’tir. −10, −9’dan küçüktür.",
          expression: "−2/3=−10/15 < −9/15=−3/5",
        },
        {
          label: "Ortalama al",
          explanation: "İki sayının toplamının yarısı ikisinin ortasındadır.",
          expression: "(−10/15−9/15)/2=−19/30",
        },
        {
          label: "Konumu kontrol et",
          explanation:
            "Uçları 30 paydasında yaz; payları doğrudan karşılaştır.",
          expression: "−20/30 < −19/30 < −18/30",
        },
      ],
      answer: "−2/3 < −19/30 < −3/5",
      check: "−19/30’un iki uca uzaklığı da 1/30’dur.",
      pitfall: "Mutlak değeri büyük negatif sayıyı büyük sanma.",
    },
    {
      title: "Kalanın kesrini başlangıca taşı",
      prompt:
        "240 sayfalık bir kitabın önce 1/4’ü, sonra kalan sayfaların 1/3’ü okunuyor. Kaç sayfa kalır?",
      strategy: "İkinci kesrin bütünü kalan 180 sayfadır.",
      steps: [
        {
          label: "İlk okuma",
          explanation: "Başlangıç bütününün dörtte biri okunur.",
          expression: "240×1/4=60; kalan 240−60=180",
        },
        {
          label: "İkinci okuma",
          explanation: "Üçte bir, ilk 240’ın değil kalan 180’in üçte biridir.",
          expression: "180×1/3=60",
        },
        {
          label: "İsteneni bul",
          explanation: "Toplam okunanı başlangıçtan çıkar.",
          expression: "240−60−60=120",
        },
      ],
      answer: "120 sayfa",
      check: "Başlangıcın 1/4+(3/4)×(1/3)=1/2’si okunur; diğer yarısı 120’dir.",
      pitfall: "İkinci okumayı 240×1/3 hesaplamak farklı bir problemi çözer.",
    },
    {
      title: "Devretmeyen basamağı ayır",
      prompt:
        "0,1666… sayısını tek kesir olarak yaz. 6 rakamı sonsuza kadar tekrar ediyor.",
      strategy: "Devreden kuyrukları aynı hizaya getir ve çıkar.",
      steps: [
        {
          label: "İki eşitliği kur",
          explanation: "x’e 10 ve 100 çarpanlarını uygula.",
          expression: "10x=1,666…; 100x=16,666…",
        },
        {
          label: "Kuyruğu yok et",
          explanation: "Aynı sonsuz kuyruklar çıkarılır.",
          expression: "100x−10x=16,666…−1,666…=15",
        },
        {
          label: "x’i yalnız bırak",
          explanation:
            "90x=15 eşitliğinin iki tarafını 90’a böl ve sadeleştir.",
          expression: "x=15/90=1/6",
        },
      ],
      answer: "1/6",
      check:
        "1’i 6’ya böldüğünde ilk basamak 1, sonraki basamaklar sürekli 6 gelir.",
      pitfall: "Devretmeyen 1 basamağını da devrediyormuş gibi 16/99 yazma.",
    },
  ],
  recall: [
    {
      prompt: "0/7 ile 7/0 neden aynı durumda değil?",
      answer:
        "0/7=0; çünkü 7×0=0. 7/0 için 0×c=7 sağlayan hiçbir c yoktur, tanımsızdır.",
    },
    {
      prompt: "1/2+1/3 neden 2/5 olamaz? Kuralı söylemeden açıkla.",
      answer:
        "Yarım ve üçte bir farklı parça boylarıdır. Altılık parçalarda 3+2=5 parça, yani 5/6 olur. Ayrıca 2/5, pozitif iki sayının toplamı olmasına rağmen 1/2’den küçüktür.",
    },
    {
      prompt: "Paydası 20 olan sade bir kesir neden sonlu açılır?",
      answer:
        "20=2²×5. Uygun 2 ve 5 çarpanlarıyla payda 10’un kuvvetine genişletilebilir; başka asal çarpan yoktur.",
    },
    {
      prompt: "‘Kalanın yarısı’ denince hangi sayıyı bütün seçersin?",
      answer:
        "O aşamada kalan miktarı. Başlangıç miktarıyla karıştırmadan önce kalanı hesaplar, sonra 1/2 ile çarparım.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri, PDF s.28–30 / basılı s.26–28; Aurelia Rasyonel Sayılar kopya kağıdı, PDF s.1–8 ile karşılaştırıldı. Açıklamalar, sayısal örnekler ve çözümler özgündür. ÖSYM kayıtları ayrı kaynak alanında gösterilir.",
};
