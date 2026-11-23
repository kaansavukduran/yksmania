export const combinationSource034Sections = [
  {
    title: "Grubu seç, sırayı ayrı düşün",
    paragraphs: [
      "Bir okulda Elif ve Zeynep iki temsilci seçildiğinde yalnız üyelerin adları önemlidir. Zeynep’i önce okumak yeni bir ekip üretmez. Aynı iki kişi başkan ile yardımcı rollerini paylaşacaksa roller değişebilir ve iki atama oluşur.",
      "n farklı öğeden r üyeyi seçmek C(n,r) ile gösterilir. Aynı r üyeyi r! biçimde sıralayabildiğimiz için sıralı P(n,r) sayısını r! ile böleriz. 0≤r≤n iken C(n,r)=n!/[r!(n−r)!]. Formülden önce sıranın sonucu değiştirip değiştirmediğine karar ver.",
    ],
  },
  {
    title: "Boş seçim ve dışarıda kalanlar",
    paragraphs: [
      "C(9,0)=1. Dokuz adayın hiçbirini seçmek yalnız bir boş grup üretir. C(9,9)=1 çünkü herkesin bulunduğu bir grup vardır. Yedek listede 10 aday varken 11 farklı kişi seçilemez. Negatif faktöriyel kullanmadan geçerli seçim sayısını sıfır yaz.",
      "Bir grubun içinde kalanları yazdığında dışında bırakılanlar da belli olur. Dokuz kişiden yedi kişilik grup kurmak, dışarıda kalacak iki kişiyi seçmekle birebir eşleşir: C(9,7)=C(9,2)=36.",
    ],
  },
  {
    title: "Zorunlu kişiyi sabitle, yasak kişiyi listeden çıkar",
    paragraphs: [
      "Dokuz adaydan dört kişi seçilecek. A zorunlu, B yasak. A bir yeri doldurur ve artık aday değildir. B de aday olamaz. Kalan yedi kişiden üç seçim C(7,3)=35. Zorunlu üyeyi kalan adaylar içinde yeniden sayma.",
      "A ve B birlikte olmasın ile A ve B’nin hiçbiri olmasın farklıdır. Sekiz kişilik havuzdan üç kişi seçip birlikte bulunmalarını engellemek için bütün C(8,3)=56 gruptan ikisinin birden bulunduğu C(6,1)=6 grubu çıkar. A’nın tek başına veya B’nin tek başına olduğu gruplar geçerlidir.",
    ],
  },
  {
    title: "Tam ve en az koşullarıyla ayrık durumlar kur",
    paragraphs: [
      "Dört fen ve beş sanat adayından üç kişi seçilecek. Tam iki fen adayının gerektiği durumda fen için C(4,2)=6, sanat için C(5,1)=5 seçim vardır. Türler birbirinden ayrıdır, her fen seçimi her sanat seçimiyle birleşir: 30.",
      "En az iki fen için iki veya üç fen olabilir. Üç fen, C(4,3)=4 yeni grup verir. Bir grubun aynı anda tam iki ve tam üç fen adayı olamayacağı için 30+4=34 toplanır. En çok iki fen dersen 0, 1 ve 2 durumları gerekir.",
      "Bir öğe iki türde birden sayılabiliyorsa otomatik olarak çarpma. Her seçimin hangi tek duruma ait olacağını tanımla veya ortak grupları bir kez çıkar. Durumların ayrık olması toplam işlemine izin verir.",
    ],
  },
  {
    title: "En az bir için hiç olmayanı çıkar",
    paragraphs: [
      "İki turuncu ve üç yeşil farklı karttan iki kart seçiliyor. Bütün ikililer C(5,2)=10, hiç turuncu içermeyenler C(3,2)=3. En az bir turuncu 10−3=7. Aynı sonucu tam bir turuncu 2·3=6 ve iki turuncu C(2,2)=1 diye doğrula.",
      "Benzer bir soruda iki dosyayı silerek en az belli bir alan boşalt. Dosyaları silme sırası seçim sayısını değiştirmez. Bütün ikililerden alanı küçük kalanları çıkar veya her izinli boyut çiftini ayrı say. Aynı boyut grubundan iki dosya seçerken iki seçimi sıraya koyma.",
    ],
  },
  {
    title: "Bir üçlü alanla, bir doğru bütün noktalarıyla belirlenir",
    paragraphs: [
      "Üç farklı noktanın bir üçgen verebilmesi için bir doğrunun üzerinde bulunmamaları gerekir. Sekiz noktada yalnız A, B, C, D aynı doğru üzerindeyse C(8,3)=56 üçlüden C(4,3)=4 doğrusal üçlü çıkarılır. Kalan 52 üçgen. Başka doğrusal üçlü varsa onu da hesaba kat.",
      "Doğru için iki farklı nokta yeter. Aynı dört noktanın C(4,2)=6 çifti tek bir doğruyu gösterir. C(8,2)=28 çift içinden bu altı kaydı çıkar ve ortak doğruyu bir kez ekle: 23 ayrı doğru. Üçgende dört grup çıkar, doğruda altı kayıt bir kayda dönüşür.",
      "Sekizgenin her iki köşesi bir doğru parçası belirler. C(8,2)=28 parçada sekiz kenar da bulunur. Komşu köşe çiftlerini çıkarınca 20 köşegen kalır. Her köşeden karşıya bakarak sayarsan aynı köşegen iki uçtan görüldüğü için ikiye böl.",
    ],
  },
];
