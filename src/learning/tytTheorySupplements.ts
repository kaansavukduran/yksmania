interface TheorySupplement {
  title: string;
  figureTitle?: string;
  paragraphs: string[];
  summary?: string;
  appendSection?: true;
  sheetTitle?: string;
  tableLayout?: "table";
  workedStep?: { title: string; index: number };
}

export const tytTheorySupplements: Readonly<Record<string, readonly TheorySupplement[] | undefined>> = {
  "tyt-mat-permutasyon-kaynak-032": [{
    title: "Birbirinden ayrı kişilere ayrı boşluklar ver",
    figureTitle: "Birbirinden ayrı kişilere ayrı boşluklar ver",
    sheetTitle: "Boşluklar",
    paragraphs: [],
    summary: "Dört sıradan kişi için beş boşluğun üçü seçilir. Her seçimde farklı A, B ve C altı sırada yerleşir. 4!·C(5,3)·3!=1.440.",
  }],
  "tyt-mat-tekrarli-permutasyon-kaynak-033": [{
    title: "Zorunlu durakta yolu böl, kaçınanı tümleyenden bul",
    figureTitle: "Zorunlu durakta yolu böl, kaçınanı tümleyenden bul",
    sheetTitle: "Zorunlu durak",
    paragraphs: [],
    summary: "(0,0) → P(2,1) → (4,3) için 3·6=18 geçen yol. Bütün 35 yoldan bunları çıkarınca 17 yol kalır.",
  }],
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
  }, {
    title: "Küp bölünürken toplam yüzey nasıl değişir?",
    figureTitle: "Küp bölünürken toplam yüzey nasıl değişir?",
    paragraphs: [
      "Kayıpsız eritmede 6 cm’lik küpün hacmi 216 cm³ kalır. 2 cm’lik küçük küplerin her biri 8 cm³ olduğundan 27 küp çıkar. Eski yüzey 216 cm², küçüklerin yüzeyleri toplamı 27·24=648 cm². Küçük küpler ayrılınca aradaki temas yüzleri açığa çıkar.",
      "Her ayrıt n eş parçaya ayrılıyorsa n³ küp çıkar. Her küçük küpün yüzeyi 1/n² kadar olduğu için toplam yüzey n katına çıkar.",
    ],
    summary: "6 cm’den 2 cm’ye. Hacim 216 cm³ kalır. 27 küçük küpün yüzeyleri toplamı 648 cm².",
    appendSection: true,
  }],
  "grafik-problemleri": [{
    title: "Çizgi grafiğinde değişim ile değişim hızı ayrıdır",
    figureTitle: "Çizgi grafiğinde değişim ile değişim hızı ayrıdır",
    paragraphs: [
      "Depo 0, 2, 5. saatlerde 20, 32, 26 L. İlk eğim 12/2=6 L/saat. İkinci eğim −6/3=−2 L/saat. 4. saatte ikinci aralıkta 2 saat geçtiği için 32−4=28 L.",
      "Bütün aralığı başlangıç ve son noktadan ölç. (26−20)/5=1,2 L/saat. Aynı değeri eğimleri kendi süreleriyle ağırlıklandırarak (2·6+3·(−2))/5 ile denetle.",
    ],
    summary: "İlk eğim +6, ikinci −2 L/saat. 4. saatte 28 L. Bütün aralık 6/5=1,2 L/saat.",
  }],
  "carpanlara-ayirma": [{
    title: "x² yerine u yazarak dört kökü bul",
    figureTitle: "x² yerine u yazarak dört kökü bul",
    paragraphs: [
      "x⁴−5x²+4 ifadesinde u=x² yazınca (u−1)(u−4) elde edilir. u=1 veya u=4. x²=1 iki işaretli kök −1 ve 1, x²=4 ise −2 ve 2 verir. Grafiğin yatay ekseni bu dört noktada kesilir.",
      "u bir gerçek sayının karesiyse u≥0 olmalıdır. Yerine koyma adımı, negatif u değerini gerçek x kökü diye yazmayı önler.",
    ],
    summary: "u=x² için (u−1)(u−4)=0. x²=1 veya x²=4. Kökler −2, −1, 1 ve 2.",
    appendSection: true,
  }],
  "tyt-geo-silindir-koni-kure-040": [{
    title: "Kâğıdı iki yönde sar ve hacimleri karşılaştır",
    figureTitle: "Kâğıdı iki yönde sar ve hacimleri karşılaştır",
    paragraphs: [
      "12π×8 dikdörtgende uzun kenar çevre olursa r=6 ve h=8. Hacim π·36·8=288π. Kısa kenar çevre olursa r=4/π ve h=12π. Hacim 192. Oran 288π/192=3π/2.",
      "Her iki durumda yan alan 96π olur. Tabanların yarıçapı değiştiği için hacim ve kapalı yüzey alanı farklı çıkar. Tabanlar ayrıca eklenir.",
    ],
    summary: "12π×8 dikdörtgenin iki sarımı 288π ve 192 cm³ verir. Oran 3π/2, yan alan her ikisinde 96π cm².",
    appendSection: true,
  }, {
    title: "Daire diliminden koninin tabanını bul",
    figureTitle: "Daire diliminden koninin tabanını bul",
    paragraphs: [
      "Yarıçapı 10 cm olan 216° daire diliminin yayı 12π cm. Birleştirildiğinde o yay koninin taban çevresidir. 2πr=12π ile r=6 cm. 10 cm anadoğru ve 6 cm yarıçap için dik yükseklik √(100−36)=8 cm. Hacim 96π cm³.",
    ],
    summary: "216° dilimin yayı 12π. Koni r=6, h=8, anadoğru 10 ve hacim 96π cm³.",
    appendSection: true,
  }, {
    title: "Kürenin yarıçapını kesitten geri kur",
    figureTitle: "Kürenin yarıçapını kesitten geri kur",
    paragraphs: [
      "Kesit alanı 144π ise kesit dairesinin yarıçapı a=12 birim. Düzlemin merkeze uzaklığı d=5. R²=a²+d²=144+25=169 ile kürenin yarıçapı 13'tür. Hacim 4π·13³/3=8788π/3 birim³.",
    ],
    summary: "Kesit alanı 144π ve uzaklık 5 ise a=12 ve R=13. Küre hacmi 8788π/3 birim³.",
    appendSection: true,
  }],
  "kartezyen-carpim": [{
    title: "Koordinat gösterimi ayrık noktaların kümesidir",
    figureTitle: "Koordinat gösterimi ayrık noktaların kümesidir",
    paragraphs: [
      "A={1,2}, B={1,2,3} için altı ikili vardır. C={2}, D={2,3} için yalnız (2;2) ve (2;3) çıkar. (2;1) kalır, çünkü ikinci bileşen 1, D’de bulunmaz. Bir ikiliyi çıkarmak için iki üyelik birlikte sağlanmalıdır.",
    ],
    summary: "Altı A×B ikilisinden (2;2) ve (2;3) çıkar. Dört ikili kalır. (2;1) kalır.",
  }],
  "mantik-onerme": [{
    title: "İse yalnız doğru öncül ve yanlış sonuçta yanlıştır",
    figureTitle: "İse yalnız doğru öncül ve yanlış sonuçta yanlıştır",
    paragraphs: [],
  }, {
    title: "Koşullu önermenin dört biçimini ayır",
    tableLayout: "table",
    paragraphs: [],
  }],
  "kumeler": [{
    title: "Üç kümenin ayrık bölgelerini içten dışa doldur",
    figureTitle: "Üç kümenin ayrık bölgelerini içten dışa doldur",
    paragraphs: [
      "50 kişinin A, B, C gruplarında 25, 20, 18 kayıt var. İkili kesişimler 10, 8, 7 ve üçlü kesişim 3. Üçlüdeki 3 kişiyi ikililerden birer kez çıkar. Tam iki grupta 7+5+4=16 kişi kalır.",
      "Yalnız A 10, yalnız B 6, yalnız C 6. Birleşim 10+6+6+16+3=41. Hiçbir grupta 50−41=9 kişi. Venn’de bölge boyu yerine içindeki sayıyı oku.",
    ],
    summary: "Üçlü 3. Tam iki 16. Yalnız A, B, C sırasıyla 10, 6 ve 6. Birleşim 41, dışarıda 9.",
    appendSection: true,
  }],
  "tyt-geo-piramitler-032": [{
    title: "Altıgen piramitte üç uzunluğun uçlarını karşılaştır",
    figureTitle: "Altıgen piramitte üç uzunluğun uçlarını karşılaştır",
    paragraphs: [
      "Düzgün altıgende kenar 2 cm, iç yarıçap √3 cm ve merkezin bir köşeye uzaklığı 2 cm. Tepe taban merkezinin 3 cm üzerindedir. Taban kenarının ortasına giden yüz yüksekliği √(9+3)=2√3 cm. Bir köşeye giden yan ayrıt √(9+4)=√13 cm.",
      "Taban alanı 6√3 cm². Altı yan üçgen toplam 12√3 cm², kapalı toplam 18√3 cm². Hacim için dik yükseklik kullanılır: 6√3·3/3=6√3 cm³.",
    ],
    summary: "a=2 ve h=3 için iç yarıçap √3, yüz yüksekliği 2√3, yan ayrıt √13. Toplam alan 18√3 cm², hacim 6√3 cm³.",
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
