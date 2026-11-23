export const repeatedPermutationSource033Sections = [
  {
    title: "Etiketleri silince aynı kalan dizileri bir say",
    paragraphs: [
      "A,A,B harflerinin görünüşte farklı sıraları AAB, ABA ve BAA’dır. A’lara geçici olarak A₁, A₂ de ve üç kartı 3!=6 biçimde sırala. A₁A₂B ile A₂A₁B’nin üzerindeki küçük etiketleri silince ikisi aynı AAB olur. Her görünüş tam 2! kez sayıldığı için 6/2=3.",
      "n kart içinde bir türden a, başka türden b, üçüncü türden c kopya varsa etiketli n! sıranın her görünüşü a!·b!·c! kez oluşur. Bu yüzden sayım n!/(a!b!c!) olur. Bütün türlerin adetleri toplamı n’dir. İsim, seri numarası veya işlev sonuçları ayırıyorsa o iki kartı aynı gruba koyma.",
    ],
  },
  {
    title: "Sabit yeri çıkar, kalan tür adetlerini güncelle",
    paragraphs: [
      "A,A,A,B,B,C ile C başta sabitse bir yer dolu ve C kalmadı. Kalan beş yerde üç A ve iki B vardır. Sonuç 5!/(3!2!)=10. Sabit yerin kartını hem ayırıp hem de formülde saymak fazla sonuç üretir.",
      "A,A,A,B,B,B dizisinde ilk üç konumda tam iki A olsun. İlk üç yer iki A ve bir B içerir, B’nin yeri üç biçimde seçilir. Son üç yerde bir A ve iki B kalır, A’nın yeri üç biçimde seçilir. İki konum grubu 3·3=9 sayısı verir.",
      "A,A,B,B,C,C içinde iki B komşu olacaksa BB tek blok olur. İki B özdeş olduğu için blok içi yer değiştirme yeni dizi yaratmaz. Kalan iki A ve iki C özdeş kalır. Beş nesne için 5!/(2!2!)=30 sıra vardır.",
    ],
  },
  {
    title: "Özdeş kartlar ayrı boşluklara giderken iç sıra oluşmaz",
    paragraphs: [
      "A,A,B,B,C,C içinde A’lar yan yana gelmesin. Önce B,B,C,C sıralarını say. 4!/(2!2!)=6. Her sırada beş boşluk var. A’lar iki ayrı boşluğa C(5,2)=10 biçimde gider. Toplam 60. A’lara isim verip 2! ile çarpmak aynı görünüşü iki kez sayar.",
      "Aynı sonucu tümleyenden denetle. Toplam 6!/(2!2!2!)=90. A’ların yan yana olduğu 5!/(2!2!)=30 sıra var. 90−30=60. Sonucun eşit çıkması iki yöntemin de aynı geçerli dizileri saydığını kontrol eder.",
    ],
  },
  {
    title: "Sayıda ilk sıfır yasak, kodda koşulu açık oku",
    paragraphs: [
      "0,0,2,2,3 rakamlarıyla bütün diziler 5!/(2!2!)=30. Baştaki sıfır sabitlenince kalan 0,2,2,3 için 4!/2!=12 dizi sayıya dönüşemez. 30−12=18 beş basamaklı sayı kalır. İki sıfır özdeş olduğu için hangisi başta diye ayrıca 2 ile çarpılmaz.",
      "Sayı çift istendiğinde son rakamı önce ayır. Son 0 veya son 2 gibi durumlar ayrıdır ve bir sayı yalnız birine girer. Her durumda kalan tekrar sayılarını yeniden hesapla. Örneğin 0,0,1,1,2,2 için son 0’da 30−6=24 ve son 2’de 30−12=18, toplam 42 çift sayı bulunur.",
      "Her kutuda iki sembol serbestse üç konumda 2³=8 kod vardır. Bu örnekte önceden verilmiş bir A ve iki B kartı yoktur. Böyle bir sabit çokluk verilse yalnız 3!/2!=3 sıralama mümkündür.",
    ],
  },
  {
    title: "Bir kafes yolu adımların sıralamasıdır",
    paragraphs: [
      "(0,0)’dan (3,2)’ye yalnız sağ ve yukarı birim adım at. Her yol üç S ve iki Y adımı taşır. SSYYS ve SYSSY aynı yere ulaşır, ama ayrıdır. Bütün yolların adım dizileri 5!/(3!2!)=10. Beş yuvadan iki yukarı konumu seçmek de aynı sayıyı verir.",
      "Her düğüme ya soldan ya alttan gelinir. İki geliş grubu son adımları farklı olduğu için sayıları topla. Başlangıçta boş yol sayısı 1’dir. Kenarlarda tek geliş yönü vardır. Engel varsa yalnız izin verilen girişleri topla. Düz formül, bütün S/Y dizileri geçerli olduğundaki sayıdır.",
      "Üçüncü yönde de geri adım yoksa aynı mantık işler. Başlangıçtan hedefe iki sağ, bir yukarı ve bir ileri gerekiyor ve yol engelsizse 4!/(2!1!1!)=12 ayrı yol vardır. Her adımın yönü farklı bir semboldür.",
    ],
  },
  {
    title: "Zorunlu durakta yolu böl, kaçınanı tümleyenden bul",
    paragraphs: [
      "(0,0)’dan (4,3)’e giderken P=(2,1) zorunlu olsun. P’ye kadar iki sağ bir yukarı 3 yol, P’den hedefe iki sağ iki yukarı 6 yol. Her ilk parça her ikinci parçaya bağlanır, toplam 18 yol geçer. Her adım x+y toplamını bir artırır. P’den geçen bir yol oraya ikinci kez dönemez.",
      "Bütün yollar 7!/(4!3!)=35 iken P’ye uğramayan 35−18=17 yol vardır. Yalnız ilk parçanın 3 yolunu çıkarmak tamamlanan yolları saymaz. P başlangıç ya da hedef ise bütün yollar P’den geçer. P=(5,1) hedef (4,3)’ün sağında kalır. Sola adım yoksa P’den hedefe dönülemez. Bu durumda P’den geçen 0, kaçınan 35 yoldur.",
      "Hangi yolu saydığını önce yaz. Sadece P’ye varmak, hedefe P üzerinden gitmek ve hedefe P’yi atlayarak gitmek üç ayrı toplamdır. Modelde düğüm toplamı, P’den geçerek gelen ve P’ye uğramadan gelen yollar aynı adım kurallarından çıkar.",
    ],
  },
];
