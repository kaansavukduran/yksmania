interface TheorySupplement {
  title: string;
  figureTitle: string;
  paragraphs: string[];
  summary: string;
  appendSection?: true;
  sheetTitle?: string;
  workedStep?: { title: string; index: number };
}

export const tytTheorySupplements: Readonly<Record<string, readonly TheorySupplement[] | undefined>> = {
  "koklu-sayilar": [{
    title: "Köklü denklemde önce koşul, sonra kare",
    figureTitle: "Köklü denklemde önce koşul, sonra kare",
    paragraphs: [
      "İkinci çizimde √(x+12)=x için önce x≥0 yaz. Kare alınca x²−x−12=(x−4)(x+3)=0 olur. 4 için √16=4 sağlanır. −3 için √9=3 çıkar ve 3, −3’e eşit değildir.",
    ],
    summary: "√(x+12)=x için x≥0 gerekir. Adaylardan 4 eşitliği sağlar. −3 için √9=3, sağ taraf −3’tür.",
  }],
  "oran-oranti": [{
    title: "Pompa sayısını değiştir, sabit işi koru",
    figureTitle: "Pompa sayısını değiştir, sabit işi koru",
    paragraphs: [
      "Aynı debideki 8 pompa bir işi 15 saatte bitirirse iş 8·15=120 pompa-saattir. 12 pompa için süre 120/12=10 saattir. Pompa sayısı artınca şekildeki genişlik artar, süre kısalır ve alan sabit kalır.",
      "İş de iki katına çıkarsa 240 pompa-saat gerekir. 12 pompa 20 saat çalışır. İlk 10 saatlik sonuç yalnız iş miktarı aynı kaldığında geçerlidir.",
    ],
    summary: "120 pompa-saatlik iş, 12 özdeş pompayla 10 saat sürer. İş iki katına çıkarsa süre 20 saat olur.",
    appendSection: true,
  }],
  "sayi-problemleri": [{
    title: "Kapasite eşitliği birimlerin oranını buldurur",
    figureTitle: "Kapasite eşitliği birimlerin oranını buldurur",
    paragraphs: [
      "Son çizimde 10a+4b=4a+7b olur. İki toplamdan da ortak 4a ve 4b çıkarınca 6a=3b kalır. Bir büyük kutu iki küçük kutu kadar yer kaplar. İki düzeni de denetle. 10+4·2=18 ve 4+7·2=18 küçük kutu yeri.",
    ],
    summary: "10a+4b=4a+7b eşitliğinde ortak terimleri çıkar. 6a=3b ve b=2a. İki düzenin kapasitesi 18 küçük kutu yeridir.",
  }],
  "yas-problemleri": [{
    title: "Aynı anda herkes aynı süre yaşlanır",
    figureTitle: "Aynı anda herkes aynı süre yaşlanır",
    paragraphs: [
      "İkinci çizimde Deniz bugün 30 ve Işıl 16 yaşında. Dört yıl sonra 34 ve 20 yaşındalar. Aynı tarihte düşey uzaklık hep 14 yıldır. Yaş oranını hesaplamak için iki yaşı da aynı tarihten oku.",
    ],
    summary: "30−16=14. Dört yıl sonra 34−20=14. Yaş farkı sabit kalırken oran değişir.",
  }],
  "yuzde-problemleri": [{
    title: "Paket fiyatıyla birim fiyat aynı değişken değildir",
    figureTitle: "Paket fiyatıyla birim fiyat aynı değişken değildir",
    paragraphs: [
      "480 g için 240 TL, 400 g için 280 TL ödendiğinde gram fiyatları 0,50 ve 0,70 TL olur. Artış 0,20 TL/g’yi eski 0,50 TL/g’ye bölünce %40 çıkar. 280/240 oranı sadece paket ücretini karşılaştırır. Aynı sonucu kilogram fiyatlarında 500 TL’den 700 TL’ye çıkışla denetle.",
    ],
    summary: "240/480=0,50 ve 280/400=0,70 TL/g. Ölçü birimini eşitle. Birim fiyat artışı %40.",
  }],
  "tyt-geo-paralelkenar-ozel-dortgenler-032": [{
    title: "Orta noktalarla iç kareyi kur",
    figureTitle: "Orta noktalarla iç kareyi kur",
    paragraphs: [
      "Kenarları 8 birim olan karenin ardışık kenar orta noktaları arasındaki yatay ve düşey farklar 4 ve 4’tür. İç karenin kenarı √(4²+4²)=4√2 ve alanı 32 birim² olur. Dış alan 64 birim². Arada kalan dört dik üçgenin her biri 8 birim² olduğundan toplamları da 32’dir.",
      "Bu sonuç, seçilen noktaların kenar orta noktaları olmasına bağlıdır. Çizimde kenarı değiştir ve her yeni ölçüde dış alanın nasıl iki eş yarıya ayrıldığını denetle.",
    ],
    summary: "Dış kenar a ise iç kenar (a/2)√2, iç alan a²/2. Dıştaki dört eş üçgenin toplam alanı da a²/2.",
    appendSection: true,
  }],
  "kar-zarar-problemleri": [{
    title: "Sabit gider ve birim katkı başabaşı belirler",
    figureTitle: "Sabit gider ve birim katkı başabaşı belirler",
    paragraphs: [
      "Sabit gider 700 TL, birim maliyet 25 TL ve satış 45 TL ise her ürün 20 TL katkı sağlar. 35 adette başabaş, 36 adette 20 TL kâr olur. En az 100 TL kâr için 20n−700≥100 yaz. İlk uygun tam sayı 40’tır.",
    ],
    summary: "20n−700 için 35 başabaş, 36 ilk kâr. 20n−700≥100 için en az 40 adet.",
  }],
  "tyt-geo-yamuk-deltoid-032": [{
    title: "Deltoidde alanı dört dik üçgenle tamamla",
    figureTitle: "Deltoidde alanı dört dik üçgenle tamamla",
    paragraphs: [
      "BD=24 olduğunda iki yarı da 12’dir. Komşu eş kenar çiftleri 13 ve 20 iken simetri köşegeni 5 ve 16 birimlik parçalara ayrılır. AC=21, alan 21·24/2=252 ve çevre 66 olur. İki üçgenin 60 ve 192 birim² alanlarını toplayarak denetle.",
    ],
    summary: "13 ve 20 yan kenarlar, BD=24. Yarım BD=12’den diğer köşegen parçaları 5 ve 16 çıkar. Alan 252, çevre 66.",
    sheetTitle: "Deltoid",
  }],
  "faiz-problemleri": [{
    title: "Ayı ve günü oranla aynı döneme çevir",
    figureTitle: "Ayı ve günü oranla aynı döneme çevir",
    paragraphs: [
      "2.400 TL için yıllık %15 basit faiz 360 TL, aylık faiz 30 TL olur. Sekiz ay 8/12 yıl olduğundan faiz 360·8/12=240 TL ve son tutar 2.640 TL. On iki aydaki 360 TL ile karşılaştırarak faiz ile son tutarı ayır.",
    ],
    summary: "2.400 TL ve yıllık %15. 8 ay = 8/12 yıl. Faiz 240 TL, son tutar 2.640 TL. Yatırılan 2.400 TL faiz hesabına temel tutardır.",
  }],
  "tyt-geo-cember-aci-040": [{
    title: "Kirişin iki tarafında görülen yay değişir",
    figureTitle: "Kirişin iki tarafında görülen yay değişir",
    paragraphs: [
      "Küçük AB yayı 100° iken C büyük yaydaysa C’yi içermeyen 100°’lik yay açı hesabına girer. ACB=50°. D küçük yaydaysa gördüğü yay 360°−100°=260° olur. ADB=130° ve iki açı toplamı 180°.",
    ],
    summary: "Aynı AB kirişinin farklı tarafındaki C ve D için 100° ve 260° görülür. Çevre açılar 50° ve 130°.",
    appendSection: true,
  }, {
    title: "Kiriş ve teğette hipotenüsü ayır",
    figureTitle: "Kiriş ve teğette hipotenüsü ayır",
    paragraphs: [
      "Yarıçap 13, kirişin merkeze uzaklığı 5 ise yarım kiriş √(169−25)=12, tam kiriş 24 olur. Dış nokta merkezden 17 birim uzaktaysa teğet √(289−169)=√120=2√30 olur.",
      "İlk dik üçgende 13 birimlik yarıçap hipotenüstür. İkincide 17 birimlik merkez-dış nokta uzaklığı hipotenüstür. Çizimde dik açının karşısındaki kenarı bul.",
    ],
    summary: "r=13, d=5 için kiriş 24. OP=17 için teğet √120=2√30. Dik açı hipotenüsü belirler.",
    appendSection: true,
  }],
  "karisim-problemleri": [{
    title: "Karışırken şeker ve su kütlesini ayrı topla",
    figureTitle: "Karışırken şeker ve su kütlesini ayrı topla",
    paragraphs: [
      "120 g ve %20 için şeker 24 g, su 96 g. 80 g ve %40 için şeker 32 g, su 48 g. Şeker toplamı 56 g, karışım toplamı 200 g. Son oran 56/200=%28. Suyu ayrı toplarsan 144 g bulursun ve 56+144=200 ile toplamı denetlersin.",
    ],
    summary: "120 g %20 ile 80 g %40 birleşirse 56 g şeker ve 144 g su olur. Oran 56/200=%28.",
    appendSection: true,
  }],
  "isci-problemleri": [{
    title: "İş payı grafiğinde eğimleri topla",
    figureTitle: "İş payı grafiğinde eğimleri topla",
    paragraphs: [
      "A tek 12, B tek 18 saatte bitiriyorsa bir saatte sırasıyla 3/36 ve 2/36 iş yaparlar. Birlikte eğim 5/36 iş/saat. Bir iş için 36/5=7,2 saat gerekir. Onluk kesir 0,2 saati 60 ile çarpınca 12 dakika. A %60, B %40 iş yapar.",
    ],
    summary: "1/12+1/18=5/36 iş/saat. Bir iş 7 saat 12 dakika. Grafiğin düşey ekseni biten işin payı.",
    appendSection: true,
  }],
  "tyt-geo-daire-040": [{
    title: "Daire parçası: dilimden üçgeni çıkar",
    figureTitle: "Daire parçası: dilimden üçgeni çıkar",
    paragraphs: [
      "Yarıçap 6 ve merkez açı 60° ise dilim 36π·60/360=6π birim². İki yarıçap ve kirişin kurduğu üçgen eşkenar olduğundan alanı 6²√3/4=9√3 birim². Aradaki küçük parça 6π−9√3≈3,26 birim².",
      "Sınır çizgileri kiriş ve yaydır. Büyük parçayı istiyorsan küçük parçayı bütün dairenin alanından çıkar.",
    ],
    summary: "r=6 ve α=60° için dilim 6π, üçgen 9√3, küçük parça 6π−9√3 birim².",
    sheetTitle: "Halka ve parça",
  }],
  "havuz-problemleri": [{
    title: "Gecikmiş açılış yeni evre başlatır",
    figureTitle: "Gecikmiş açılış yeni evre başlatır",
    paragraphs: [
      "A tek başına bir tankı 10 saatte doldurur. B 15 saatte doldurur ve iki saat sonra açılır. İlk iki saatte A 1/5 doldurur. Kalan 4/5, birlikte hız 1/6 ile 4,8 saatte dolar. Baştan sona 6,8 saat, yani 6 saat 48 dakika geçer.",
    ],
    summary: "İlk 2 saatte A 1/5 tank doldurur. Sonraki 4,8 saatte birlikte 4/5 tank doldurulur. Toplam 6,8 saat.",
    workedStep: { title: "Gecikmeli giriş", index: 2 },
  }],
  "noktanin-analitigi": [{
    title: "Oranla bölünen noktanın yönünü denetle",
    figureTitle: "Oranla bölünen noktanın yönünü denetle",
    paragraphs: [
      "A(−2; 1), B(7; 7) ve AP:PB=1:2. A’dan B’ye değişim (9; 6). P’ye ulaşmak için bunun üçte birini, (3; 2)’yi al. A’ya ekleyince P(1; 3) çıkar. P’den B’ye (6; 4) kaldığı için oran 1:2.",
      "P, A’ya daha yakınsa ağırlıklı ortalamada A’nın katsayısı daha büyük çıkar. Çizimi değiştirip bu yönü denetle.",
    ],
    summary: "AP:PB=1:2 için P=A+(B−A)/3. (−2; 1)+(3; 2)=(1; 3).",
    appendSection: true,
  }],
  "hiz-problemleri": [{
    title: "Grafik ile çözümü geri denetle",
    figureTitle: "Grafik ile çözümü geri denetle",
    paragraphs: [
      "A, 20 km’den +40 km/sa ile, B, 140 km’den −20 km/sa işaretli hızla ilerliyor. 20+40t=140−20t olduğunda 60t=120 ve t=2 saat. Her iki denklem 100 km verir. Grafikte eğim yönü, kesişim aynı konumu ve zamanı gösterir.",
    ],
    summary: "20+40t=140−20t, t=2 saat ve konum 100 km. Bir konumun azalması negatif yönü gösterir.",
  }],
  "tyt-geo-dik-prizmalar-032": [{
    title: "Altıgen tabandan prizmanın en uzun köşegenine",
    figureTitle: "Altıgen tabandan prizmanın en uzun köşegenine",
    paragraphs: [
      "Taban kenarı 4 cm ve dik yükseklik 9 cm. Taban alanı 24√3 cm², yan alan 6·4·9=216 cm², iki tabanla toplam 216+48√3 cm². Hacim 216√3 cm³.",
      "Düzgün altıgenin karşıt köşeleri arasındaki uzaklık 8 cm. Bu uzunlukla 9 cm dik yüksekliği Pisagor’da birleştir. En uzun cisim köşegeni √(64+81)=√145 cm.",
    ],
    summary: "a=4 ve h=9 için taban 24√3, yan alan 216, hacim 216√3. Cisim köşegeni √145 cm.",
    appendSection: true,
  }],
  "kesir-problemleri": [{
    title: "Kalanın kesri yeni bir taban kullanır",
    figureTitle: "Kalanın kesri yeni bir taban kullanır",
    paragraphs: [
      "120 birimde önce 30 kullan ve 90 bırak. Kalanın 1/3’ü 30 birimdir ve 60 kalır. İkinci kesir ilk bütünün 1/3’ü olsaydı 40 kullanılır, 50 kalırdı. İki şeritte aynı sayıda eş parça var. İkinci kullanımın hangi bütüne ait olduğuna bak.",
    ],
    summary: "120’den önce 1/4, sonra ara kalanın 1/3’ü alınırsa 60 kalır. İki kesir de ilk bütüne aitse 50 kalır.",
  }],
};
