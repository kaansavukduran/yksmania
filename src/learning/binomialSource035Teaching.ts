export const binomialSource035Sections = [
  {
    title: "Çarpılan her parantezden tek seçim yap",
    paragraphs: [
      "(a+b)³ üç çarpandır. Her birinden a veya b alıp çarp. Üç a seçimi a³, bir b seçimi a²b yapar. b’nin seçildiği çarpan üç yerden biri olduğu için a²b üç kez oluşur. Böylece a³+3a²b+3ab²+b³ elde edilir.",
      "n negatif olmayan bir tam sayıysa r tane b seçimi C(n,r) biçimde yapılır. Bu seçimlerde n−r tane a kalır. Yazılan genel terim C(n,r)·a^(n−r)·b^r ve r=0,1,…,n. Önce b’nin kaç kez seçildiğini hesapla.",
      "r=0 olursa ilk terimde yalnız a seçildiği için aⁿ çıkar. r=n olursa son terim bⁿ olur. Bu iki terim, r’ye göre yazdığın açılımın uçlarını kontrol etmene yardım eder.",
      "n=0 için hiçbir çarpan yazılmaz. Biçimsel boş çarpım 1’dir. Bir sayısal noktada özgün taban sıfırsa 0⁰ sayısal değerini kullanma. Özgün tanım koşulları ayrı kalır.",
    ],
  },
  {
    title: "Pascal satırını üstteki iki komşudan kur",
    paragraphs: [
      "Sıfırıncı satır 1 ile başlar. Birinci satır 1,1, ikinci 1,2,1 olur. Her satırın iki ucu 1’dir. İçteki sayı üst satırda sol üst ve sağ üst sayılarının toplamıdır. Örneğin altıncı satır 1,6,15,20,15,6,1.",
      "n öğeden r seçerken son öğeyi alıp almamaya göre iki ayrık durum var. Alınırsa önceki n−1 öğeden r−1 gerekir, alınmazsa r gerekir. Bu yüzden C(n,r)=C(n−1,r−1)+C(n−1,r). C(7,3)=15+20=35. n’inci satırda n+1 konum vardır.",
      "a=b=1 yazınca her seçimden yalnız Pascal katsayısı kalır. Satırın toplamı (1+1)ⁿ=2ⁿ olur. Örneğin dördüncü satırda 1+4+6+4+1=16=2⁴. n parantezin her birinden iki ayrı seçim yapılması da aynı toplamı verir.",
    ],
  },
  {
    title: "Seçim sayısıyla sayısal çarpanı birbirinden ayır",
    paragraphs: [
      "(2x−1)⁴ içinde x² olması için iki yerde 2x, iki yerde −1 seçilir. Seçim C(4,2)=6. Her çarpım (2x)²(−1)²=4x², yani terim 24x². Katsayı 24, değişken üssü 2, b’nin seçim sayısı r=2.",
      "Bir negatif terim tek sayıda seçilirse çarpıma eksi, çift sayıda seçilirse artı işaret verir. (x−2)⁶ içinde x⁴ için r=2, C(6,2)=15 ve (−2)²=4, katsayı 60. Pascal sayısı 15, seçimlerin adedidir. Katsayı için bunu (−2)² ile çarp.",
    ],
  },
  {
    title: "Hedef üssü bir denklemle bul",
    paragraphs: [
      "Genel terimde a=xᵖ, b=c·xᵠ olursa üssü p(n−r)+qr yaz. Sayısal katsayı C(n,r)cʳ. İstenen üssü bu ifadeye eşitle. Bulduğun r tam sayı ve 0≤r≤n ise o terim seçilebilir. Terim sıra numarası r+1’dir, x üssü değildir.",
      "(x²+2/x)⁶ için x≠0. Genel üs 2(6−r)−r=12−3r olur. Sabit terimde 12−3r=0, r=4. C(6,4)·2⁴=240. x¹ için r=11/3 tam sayı olmadığı için böyle bir terim oluşmaz.",
      "İki bileşenin x üssü eşitse farklı seçimler aynı üssü verebilir. Aynı dereceli terimleri topla ve sıfır kalan katsayıyı görünür diziden çıkar. Önce özgün ifadenin tanım kümesini yaz. Paydada x varsa sadeleştirmeden sonra da başlangıçta x≠0 gerekir.",
      "Örneğin (2x−x)³ dört seçim satırı yazar. Katsayıları 8, −12, 6, −1 ve hepsinin üssü 3. Birleşince tek x³ terimi kalır. Yazılan seçim satırının sayısı, sadeleşmiş ifadede farklı derecelerin sayısı olmak zorunda değildir.",
    ],
  },
  {
    title: "Toplam, sabit terim ve tek-çift toplamlarını ayır",
    paragraphs: [
      "Bir polinom P için x=1 yazıldığında her x kuvveti 1 olur ve katsayıların toplamı P(1) çıkar. x=0 yazınca yalnız sabit terim kalır. Negatif üs içeren ifadede x=0 tanımsız olabilir. Sabit terimi 0. üssün katsayısı olarak bul.",
      "Çift derecelerde (−1)ⁿ=1, tek derecelerde (−1)ⁿ=−1. O hâlde P(1)=Ç+T ve P(−1)=Ç−T. Burada Ç çift, T tek dereceli katsayıların toplamıdır. Bu denklemlerden Ç=[P(1)+P(−1)]/2, T=[P(1)−P(−1)]/2 çıkar.",
      "(2x−1)⁵ için P(1)=1, P(−1)=−243. Ç=(1−243)/2=−121, T=(1+243)/2=122. Toplam 1, fark −243. Bir katsayı toplamı sayıların adedini saymadığı için negatif olabilir.",
    ],
  },
  {
    title: "Katsayı oranında hangi çarpanların kaldığını denetle",
    paragraphs: [
      "(x+k/x)⁸ ve k>0 olsun. Üs 8−2r. x⁻² için r=5, x² için r=3. Katsayıların oranında C(8,5)=C(8,3) sadeleşir. Geriye k⁵/k³=k² kalır. Oran 9 ise pozitif k=3.",
      "Baştan üçüncü terim r=2’dir. Sondan üçüncü terim r=n−2’dir. x’in artan veya azalan kuvvetine göre hangi dizilişin sorulduğunu oku. Katsayı karşılaştırırken yalnız aynı koşullar altında ortak çarpanı sadeleştir.",
    ],
  },
];
