import { txt, type Lesson, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";
import type { CheatSheet, CheatSection } from "./cheatsheetContent";
interface Rational035Item extends QuestionGuidance { code:string; prompt:string; options:string[]; }
interface Rational035Pack { id:string;title:string;minutes:number;source:string; sections:(GuideSection&{code:string})[]; examples:(WorkedExample&{code:string})[];recall:{prompt:string;answer:string}[];items:Rational035Item[];sheet:CheatSection[]; }
// Reviewed source035 teaching; learning evidence stays separate from visual exploration.
export const rationalSource035Pack:Rational035Pack = {
  "id": "tyt-mat-rasyonel-kaynak-035",
  "title": "Rasyonel sayılar: aynı bütün, doğru işlem ve görsel kanıt",
  "minutes": 140,
  "sections": [
    {
      "code": "S01",
      "title": "İşaretleri ve sayıları aynı dilde buluştur",
      "paragraphs": [
        "Tam sayılar …, −2, −1, 0, 1, 2, … sayılarıdır. Pozitif sıfırdan büyük, negatif sıfırdan küçüktür. Sayı doğrusunda sağa gidildikçe değer artar. a∈ℤ, “a tam sayıdır”; ≠ “eşit değildir”, < “küçüktür”, ≤ “küçük veya eşittir”, ≥ “büyük veya eşittir” demektir. ℚ rasyonel sayılar kümesinin adıdır.",
        "× ve · çarpma; /, : ve kesir çizgisi bölme gösterir. Parantez bir işlem grubunu görünür tutar. 2³, üç tane 2’nin çarpımıdır: 2×2×2=8. |x| sayının sıfıra uzaklığıdır; uzaklık negatif olamaz. |−3/4|=3/4 fakat −3/4 sayısı pozitife dönüşmüş olmaz. İşaretli değer ile uzaklığı iki ayrı soru olarak düşün."
      ]
    },
    {
      "code": "S02",
      "title": "Rasyonel olmak sade görünmek değildir",
      "paragraphs": [
        "a ve b tam sayı, b≠0 iken a/b biçiminde yazılabilen her sayı rasyoneldir. Burada a pay, b paydadır. −3=−3/1, 5=5/1 ve 0=0/7 rasyoneldir. “Bölünce tam çıkmadı” rasyonel tanımı değildir; tam çıkan sayılar da bu kümededir.",
        "6/8 ile 3/4 aynı sayıdır; kesrin henüz sadeleştirilmemesi onu rasyonel olmaktan çıkarmaz. π ve √2 irrasyonel örnekleridir; bu ünitede irrasyonelliklerinin ispatı kullanılmaz. Sonsuz görünen her ondalık irrasyonel değildir: 0,333…=1/3. Sonsuz ve tekrarlayan gösterimi, sonsuz ve tekrarlamayan gösterimden ayır."
      ]
    },
    {
      "code": "S03",
      "title": "Parçanın büyüklüğünü bütün belirler",
      "paragraphs": [
        "Pozitif b için bir bütünü b eş parçaya bölmek, her parçayı 1/b yapar. a/b, bu birim parçadan a tane sayar. Payda 4’ten 8’e çıkınca aynı büyüklükte bütünün her parçası küçülür; bütünün kendisi değişmez. Görseldeki çubuklar aynı uzunlukta birim bütünleri temsil etmelidir.",
        "7/4, bir bütünü aşan yedi çeyrektir: 4/4+3/4. Negatif kesri negatif boyalı alan sanma; sayı doğrusunda sola yönüyle göster. 1/2 litre ile başka büyüklükte bir kabın yarısını, bütünlerini belirtmeden aynı miktar sayamazsın. Kesir çizgisi bütün üst ifadeyi bütün alt ifadeye böler; (1−1/3)/(1+1/2) iki ayrı işlem grubudur."
      ]
    },
    {
      "code": "S04",
      "title": "Denk kesirler aynı noktaya ulaşır",
      "paragraphs": [
        "Payı ve paydayı aynı sıfırdan farklı k ile çarpmak değeri korur: a/b=(a·k)/(b·k). 3/4=6/8=9/12. Yalnız payı değiştirmek denk kesir üretmez: 6/8→3/8 işlemi sayıyı yarıya indirir. k=0 seçersen payda sıfır olur; bu dönüşüm geçersizdir.",
        "Ortak pozitif böleni iki taraftan bölmek sadeleştirmedir: 6 ve 8’de ortak 2 vardır; 6/8=3/4. EBOB, iki sayının en büyük ortak pozitif bölenidir. Payda pozitif ve pay/payda aralarında asal olunca sade gösterim tektir. Aralarında asal, her ikisinin asal olması demek değildir: 8 ile 15’in ortak pozitif böleni yalnız 1’dir."
      ]
    },
    {
      "code": "S05",
      "title": "Eksi işaretini taşı, sıfır koşulunu unutma",
      "paragraphs": [
        "a/(−b)=(−a)/b=−(a/b). Pay ve paydayı −1 ile çarptığında ikisinin işareti değişir, oran aynı kalır. (−6)/(−8)=6/8=3/4. Tek eksi negatif, iki eksi pozitif sonuç verir. Karşılaştırmadan önce paydayı pozitif yazmak yön hatasını azaltır.",
        "b≠0 için 0/b=0’dır. a/0 hiçbir a için bu tanımda rasyonel sayı vermez; 0/0’a da 0 veya 1 atama. “Aynı sayıları sadeleştir” kuralının sıfırdan farklı ortak çarpan koşulu vardır. 3/3=1 demen 0/0=1 demeni sağlamaz."
      ]
    },
    {
      "code": "S06",
      "title": "Kesir türünü ve negatif tam sayılı gösterimi ayır",
      "paragraphs": [
        "Basit kesirde |pay|<|payda|; örneğin −3/5. Bileşik kesirde |pay|≥|payda|; 7/4 ve 4/4 bu sınıftadır. Bu tanımda işaret büyüklüğün mutlak değerle karşılaştırılmasını değiştirmez.",
        "2 tam 1/3, 2+1/3=(6+1)/3=7/3 anlamındadır. Negatif tam sayılı gösterimi parantezle aç: −(2 tam 1/3)=−(2+1/3)=−7/3. Buna karşılık −2+1/3=(−6+1)/3=−5/3’tür. Yan yana bir eksi gördüğünde hangi grubun önünde durduğunu açık yaz."
      ]
    },
    {
      "code": "S07",
      "title": "Toplamak için aynı büyüklükte parça üret",
      "paragraphs": [
        "Bir yarım ile bir üçte biri, iki farklı parça boyunu sayar. Altılık parçalara çevir: 1/2=3/6 ve 1/3=2/6; toplam 5/6. Parça boyu olan payda aynı kalır, parça adetleri toplanır. 1/2+1/3=2/5 yazmak paydaları da topladığı için bu gerekçeyi bozar.",
        "b,d≠0 için a/b+c/d=(ad+bc)/(bd). Çıkarmada paylar arasındaki eksi korunur: (ad−bc)/(bd). En küçük ortak katı kullanmak zorunlu değildir, fakat ara sayıları azaltır. 3/4−5/6+1/3 için payda 12 seçilebilir; önce −5/6+1/3=−1/2 grubunu yapmak da geçerlidir.",
        "Negatif sayıyı çıkarırken parantezi koru: 1/2−(−1/3)=1/2+1/3. Sonucu bir tahminle denetle: iki pozitif sayı toplandıysa sonuç her birinden büyük olmalı. Bu kontrol yanlış sonucu yakalayabilir; kesin hesabın yerine geçmez."
      ]
    },
    {
      "code": "S08",
      "title": "Çarpanı sadeleştir, toplamın terimini silme",
      "paragraphs": [
        "Çarpmada (a/b)·(c/d)=ac/(bd), b,d≠0. Payların veya paydaların içindeki çarpanları işlemden önce küçültebilirsin: (14/15)·(25/21) içinde 14 ve 21’i 7’ye, 25 ve 15’i 5’e böl; geriye (2/3)·(5/3)=10/9 kalır. Aynı çarpanın bütünü bölünür.",
        "Toplamdaki tek terimi çizmek bu kural değildir. (6+3)/3=3; yalnız 6’yı 3’e bölüp 2+3=5 diyemezsin. Doğru dağıtma 6/3+3/3=2+1=3’tür. Benzer (2+4)/2=1+2=3; 1+4=5 yanlıştır. Bir yöntem doğruysa parantezi yeniden dağıttığında başlangıç ifadesine dönebilmelisin."
      ]
    },
    {
      "code": "S09",
      "title": "Bölme kaç tane birim sığdığını sorar",
      "paragraphs": [
        "(a/b)/(c/d), a/b miktarında c/d biriminden kaç tane bulunduğunu sorar. Bölmeyi çarpmaya çevirirken yalnız bölen ikinci kesrin tersini al: (a/b)·(d/c). b,d≠0 yanında c≠0 da gerekir; bölenin kendisi sıfır olamaz.",
        "(2/3)/(4/5)=5/6, 4/5 litrelik birimden 2/3 litre miktarının 5/6 tanesidir. Tam sayıda kap sığması sorulmadıysa bölümün kesir çıkması geçerlidir. Pozitif ve 1’den küçük sayıya bölmek büyütebilir: (3/5)/(9/10)=2/3>3/5. Sonucu bölenle çarp; bölünen geri gelmelidir."
      ]
    },
    {
      "code": "S10",
      "title": "İşlem önceliğini kesir çizgisinde de koru",
      "paragraphs": [
        "Önce parantez içi, sonra üs, sonra çarpma/bölme, son olarak toplama/çıkarma yapılır. Aynı öncelikte çarpma ve bölme soldan sağa ilerler. (1/2)/(1/4)×2, önce 2 sonra 2×2=4 verir. (1/2)/((1/4)×2) ise alt grup 1/2 olduğundan 1 verir. Parantez işlemi gerçekten değiştirdi.",
        "Çok katlı kesirde üstü ve altı önce tek kesre indir: (1−1/3)/(1+1/2)=(2/3)/(3/2)=4/9. Alt grubun sıfır olmadığını ayrıca denetle. Kesir çizgisinin çizimde uzun görünmesi, yan yana yazılmış parantezsiz ifadeye bütün grupları otomatik eklemez."
      ]
    },
    {
      "code": "S11",
      "title": "Pay ve payda kısayollarının koşullarını sor",
      "paragraphs": [
        "Paydalar aynı ve pozitifse büyük pay büyük sayıyı verir: −3/8>−5/8, çünkü −3>−5. Pozitif payları aynı olan kesirlerde ise küçük pozitif payda daha büyük parça verir: 3/4>3/7. Bu ikinci kuraldaki pozitif pay koşulunu atlama: −3/4<−3/7.",
        "Paylar da paydalar da değişiyorsa yalnız birine bakma. 5/8=15/24 ve 7/12=14/24 olduğundan 5/8 büyüktür. Paydaları önce pozitif yazdığında a/b<c/d karşılaştırması ad<bc ile eşdeğerdir; eşitsizliğin iki yanı pozitif bd ile çarpıldığı için yön değişmez."
      ]
    },
    {
      "code": "S12",
      "title": "Aynı karşılaştırmayı üç ayrı kanıtla kur",
      "paragraphs": [
        "7/8 ile 11/12 için ortak payda 24’tür: 21/24<22/24. Çapraz kontrol 7·12=84<88=11·8 verir. Üçüncü yol bütündeki eksikleri sorar: 1−7/8=1/8, 1−11/12=1/12. İkinci daha az eksik olduğundan daha büyüktür.",
        "0 ile 1 arasındaki pozitif kesirlerde eksik parçayı görmek yararlıdır. Bu, yalnız paydaları kıyaslamak değildir; önce iki eksiğin paylarını da gör. 19/20 ile 23/24’te eksikler 1/20 ve 1/24, çapraz çarpımlar 456 ve 460’tır. Her yol aynı sonuca ulaşmalıdır. Bu yollar için kişisel hız veya net artışı ölçülmüş sayılmaz."
      ]
    },
    {
      "code": "S13",
      "title": "Eksiklerin payı değiştiğinde kestirmeyi bırak",
      "paragraphs": [
        "13/16 ile 17/20’nin 1’e eksikleri 3/16 ve 3/20’dir. Burada payların ikisi de 3’tür; küçük eksik 3/20 olduğundan büyük sayı 17/20’dir. Başlık veya şekil yerine sayısal koşulu kontrol et: 13·20=260<272=17·16.",
        "Farklı paylı karşı örnek 5/8 ile 7/12’dir. Eksikler 3/8 ve 5/12 olduğunda yalnız payda 12’ye bakamazsın. 3/8=9/24<10/24=5/12, bu yüzden 5/8>7/12. Dolulukta 18/25 ile 29/40 için de eksikler 56/200 ve 55/200’dür; 29/40 daha doludur. Farklı görünen problemde aynı bütünü koru."
      ]
    },
    {
      "code": "S14",
      "title": "Negatif noktaları uzaklıklarıyla karıştırma",
      "paragraphs": [
        "Sayı doğrusunda −3/4=−0,75 ile −1/2=−0,5’i aynı doğrunun üzerinde göster. Çeyrek birimlik eş aralıklarda −3/4 solda, −1/2 sağdadır. Dolayısıyla −3/4<−1/2. |−3/4|=3/4 uzaklığının büyük olması, işaretli sayının da büyük olması demek değildir.",
        "−2/3=−10/15 ve −3/5=−9/15; −2/3 daha küçüktür. Hata onarımında önce mutlak değerli pozitif sıralama ile gerçek negatif sıralamanın ayrıldığını söyle. −5/6=−20/24>−21/24=−7/8; sıfıra daha yakın olan negatif sayı daha büyüktür."
      ]
    },
    {
      "code": "S15",
      "title": "İki farklı rasyonelin arasına yeni bir nokta koy",
      "paragraphs": [
        "x<y iki farklı rasyonel sayı olsun. (x+y)/2 onların ortalamasıdır ve tam aralarındadır: x<(x+y)/2<y. Gerekçe, y−x pozitif aralığının iki eş parçaya ayrılmasıdır. Uçlar eşitse kesin arada bir sayı yoktur; ortalama aynı uca döner.",
        "−2/3 ile −3/5’i −20/30 ve −18/30 yapınca aradaki −19/30 görünür. −7/10 ile −2/3 için payda 60 seç: −42/60<−41/60<−40/60. Aynı aralığı yeniden ikiye bölebilirsin; bu nedenle iki farklı rasyonel arasında yalnız bir rasyonel bulunmaz."
      ]
    },
    {
      "code": "S16",
      "title": "Sonlu ondalıkta basamak değeri paydadır",
      "paragraphs": [
        "0,375, 375 binlik parçadır: 375/1000=3/8. 0,12=12/100=3/25. Virgülden sonraki k basamak, 10ᵏ paydasını verir. Payı ve paydayı ortak çarpanla küçültmek, ondalığı yuvarlamak değildir.",
        "Kesri önce sadeleştir. Pozitif sade paydanın asal çarpanları yalnız 2 ve 5 ise paydayı bir 10 kuvvetine genişletebilirsin; ondalık sonludur. 3/20=15/100=0,15 ve 1/4=0,25 örnektir. Sade paydada başka asal varsa sıfır olmayan kalanlar tekrar eder. Paydanın 10’un kuvveti olarak görünmemesi tek başına devirli olmayı kanıtlamaz."
      ]
    },
    {
      "code": "S17",
      "title": "Devirli blok ile yuvarlanmış basamak aynı şey değildir",
      "paragraphs": [
        "0,(27), 0,272727… anlamında iki basamaklı 27 bloğunun sonsuza dek tekrarını gösterir. x=0,(27) için 100x=27,(27); çıkarınca 99x=27 ve x=3/11. 0,(45)=45/99=5/11. Buna karşılık sonlu 0,45=9/20’dir; 5/11−9/20=1/220>0.",
        "Aynı yöntem 0,(12)=12/99=4/33 verir; 0,12 ise 12/100=3/25’tir. Üç nokta ve devir bloğunu tanımlamadan sonlu sayıyı devirli kabul etme. Uzun bölmede aynı kalan tekrarlandığında aynı basamaklar döner. Gösterim alanının az basamak göstermesi sayının irrasyonel olduğunu veya sonlu olduğunu kanıtlamaz."
      ]
    },
    {
      "code": "S18",
      "title": "Önce tekrarlayan kuyrukları hizala",
      "paragraphs": [
        "x=0,1(6) olsun; bu, yalnız 6’nın tekrar ettiği 0,16666… sayısıdır. 10x=1,(6), 100x=16,(6); kuyruklar aynı olunca fark 90x=15 verir, x=1/6. 0,1667 bunun yuvarlanmış farklı bir sayısıdır.",
        "x=1,2(3) için yalnız 3 devreder; 2 devretmez. 10x=12,(3), 100x=123,(3), 90x=111 ve x=37/30. Ayrımı kesin kontrol et: 1,(23)=122/99, 123/99 ise 41/33=1,(24)’tür. Blok ve tam kısmı ayrı kurmadan “gördüğüm rakamları 99’a böleyim” genellemesi yapılmaz. İnteraktif görünümde sabit ön ek ile yinelenen blok farklı alanlardır."
      ]
    },
    {
      "code": "S19",
      "title": "Her kullanımda bütünün adını yeniden söyle",
      "paragraphs": [
        "Başlangıç x olsun. Önce 1/4’ü kullanılırsa 3x/4 kalır. Sonra kalanın 1/3’ü kullanılıyorsa bu ikinci işlemin bütünü artık 3x/4’tür; onun 2/3’ü kalır. Son kalan (3/4)·(2/3)x=x/2’dir. İlk iki kesri başlangıç bütününe aitmiş gibi toplamak farklı bir metni çözer.",
        "Son kalan 40 L ise x/2=40 ve başlangıç 80 L’dir. Tersten de gidebilirsin: 40/(2/3)=60, sonra 60/(3/4)=80. İlk kullanımın miktarını ve ikinci kullanımın miktarını geri hesaplayıp son kalanı doğrula.",
        "Önce 1/2, sonra kalanın 1/3’ü giderse kalan (1/2)·(2/3)=1/3’tür. Kullanılan ikinci miktar başlangıcın 1/6’sıdır; bunu son kalan sanma. Başlangıç 24 ise 8 kalır. İkinci kullanım başlangıcın 1/3’ü denseydi 24−12−8=4 kalırdı. “Kalanın” sözcüğü gerçek matematiksel koşuldur.",
        "Tersine çözümde kalan çarpanı sıfırsa dikkat: miktarın tamamı kullanılmışken son kalan 0, başlangıcın tek değerini belirlemez. Son kalan pozitif verilirse de bu koşul imkânsızdır. Sıfıra bölerek bir başlangıç üretme; önce modelin tersinin tanımlı olup olmadığını denetle."
      ]
    },
    {
      "code": "S20",
      "title": "Birimleri de kesirle birlikte taşı",
      "paragraphs": [
        "L litre, mL mililitre hacim birimidir; 1 L=1000 mL. m metre uzunluk, g gram kütle birimidir. İki miktarı toplarken aynı birime getir. Yarım litre ile çeyrek litrenin toplamı 3/4 L’dir; 1/2×1/4 işlemi bu toplamı anlatmaz.",
        "3/4 m ipi her biri 1/8 m olan parçalara ayırınca bölüm (3/4)/(1/8)=6’dır; metre/metre birimi parça adedine dönüşür. Tek ipte altı parçayı ayrı ayrı keserek elde etmek beş kesim ister. Üst üste katlama veya aynı anda kesme koşulu verilmediyse bunu varsayma. Bölüm tam sayı çıkmayan başka bir veride artan parçanın durumunu ayrıca açıklamak gerekir."
      ]
    },
    {
      "code": "S21",
      "title": "Bileşeni değiştirmek ile karışımdan rastgele almak aynı değildir",
      "paragraphs": [
        "Toplam hacmi V olan karışımın 2/5’i A, 3/5’i B olsun. Verilen işlem özellikle B bileşeninin 1/3’ünü çıkarıyorsa çıkan miktar (1/3)·(3V/5)=V/5’tir. Yerine eşit hacimde A konunca toplam V korunur; A, 2V/5+V/5=3V/5 olur.",
        "Son A miktarı 700 mL ise 3V/5=700, V=3500/3 mL. B ise 2V/5=1400/3 mL; toplamı başlangıç V’yi verir. Bu model hacimlerin toplanabildiği ve eşit hacmin geri konduğu koşula dayanır. Homojen karışımdan bir hacim alıp iki bileşeni birlikte azaltmak başka işlemdir. Eşit hacim yerine eşit kütle denirse yoğunluk bilgisi gerekebilir."
      ]
    },
    {
      "code": "S22",
      "title": "Oran aynı, pay ile payda farklı olabilir",
      "paragraphs": [
        "Pozitif tam sayılar için a/b=3/5 ise 5a=3b. 3 ve 5 aralarında asal olduğundan a=3k, b=5k; k pozitif tam sayıdır. a+b=40 koşulu 8k=40, k=5 ve (a,b)=(15,25) verir. Oranı söylemek, pay ile paydayı tek başına belirlemez.",
        "Ayrıca a ve b aralarında asal denirse k=1 olmalıdır. Bu kez toplam 3+5=8 olur; 40 koşuluyla aynı anda sağlanamaz. a/b=4/7 ve a+b=55 için de k=5, a=20, b=35’tir. Sade biçimin tekliği ile bütün eşdeğer gösterimlerin tekliği farklı iddialardır."
      ]
    },
    {
      "code": "S23",
      "title": "Tartıda kabı da saydıysan yanlış bütünü seçtin",
      "paragraphs": [
        "Aynı kapla aynı sıvı aynı koşullarda tartılıyorsa önce boş kabın kütlesini hem dolu hem kısmi tartımdan çıkar. Boş 120 g, dolu 360 g, kısmi 270 g için sıvılar 240 g ve 150 g’dır. Doluluk 150/240=5/8 olur; 270/360 kap kütlesini de içerdiği için doğru su oranı değildir.",
        "Aynı sıvının yoğunluğu değişmiyorsa hacim oranı ile kütle oranı eşittir. Kabın şeklinin yüksekliğini çizimden ölçmek gerekmez. Uygulamadaki mevcut 2021 TYT Matematik 1 bağlantısında boş 280 g, dolu 400 g, kısmi 355 g verilerinden su kütleleri 120 g ve 75 g, oran 5/8 elde edilir. Bu anlatım öğretim uyarlamasıdır; resmî metin ve şekil ayrı doğrulanmış kitapçık bağlantısındadır."
      ]
    },
    {
      "code": "S24",
      "title": "Soruyu görünüşünden değil işlem koşulundan tanı",
      "paragraphs": [
        "Toplam/çıkarma → eş parça, ortak payda; çarpım → ortak çarpan; bölüm → sıfır olmayan bölenin tersi; yakın kesir → işaret ve gerçek eksikler; ardışık kullanım → her adımdaki bütün; devir → tekrarlayan kuyrukların hizası. İlk yol zorlaşırsa ortak payda, doğrudan işlem veya sondan ters bölme gibi geçerli yedeğe dön.",
        "M1’in farklı yüzeyi yarım ve çeyrek litrenin toplamıdır; çarpma sorusunda aynı toplama kuralı çalışmaz. M2’nin farklı yüzeyi 2/3 L miktarı 4/5 L birimle ölçmektir: 5/6 birim. M3’te 9/10 ile 14/15’in eksikleri 1/10 ve 1/15’tir; 14/15 büyüktür, fakat 5/8 ve 7/12’de yalnız payda yeterli olmaz.",
        "M4’te önce 1/3, sonra kalanın 1/2’si kullanılırsa 1/3 kalır. İki kullanım da ilk bütüne aitse kalan 1−1/3−1/2=1/6’dır; kalan çarpımı uygulanamaz. M5’te 0,(12) için 99x=12; sonlu 0,12 için 100x=12’dir. Sembolik olarak benzemek aynı koşulu sağlamak değildir."
      ]
    },
    {
      "code": "S25",
      "title": "İlk yanlış adımı onar, sonra yeni veride dene",
      "paragraphs": [
        "“2/3+1/6=3/9” çözümünde ilk hata paydaları toplamak ve farklı parçaları aynı boy sanmaktır. Doğru sonuç 4/6+1/6=5/6’dır; ardından 3/5+1/10=7/10’u çöz. “(1/2)/(3/4)=3/8” çözümünde ise bölüm yerine çarpma yapılmıştır; doğrusu 2/3, yeni (2/5)/(4/3) işlemi 3/10’dur.",
        "“−4/5>−3/4, çünkü 4/5 büyük” iddiası uzaklığı değer sanır. Doğrusu −4/5<−3/4’tür; yeni −5/6 ve −7/8 çiftini ortak paydada gerekçelendir. Kalan problemi yanlışsa önce hangi miktarın hangi bütüne ait olduğunu etiketle. Düzeltmeyi görmek, bağımsız bir doğru cevap yerine geçmez; yeni kartta çözümünü kaydet."
      ]
    },
    {
      "code": "S26",
      "title": "Sonuçtan önce koşulu, sonra ters işlemi denetle",
      "paragraphs": [
        "Önce sıfır payda veya sıfır bölen, sonra açık parantezler, sonra işlem türü. Kesrin yaklaşık yerini 0, 1/2 ve 1’e göre tahmin et. Bir sonucun bölgesini denetlemek yanlış cevabı eleyebilir ama tek başına tam çözüm sağlamaz.",
        "Toplamı çıkararak, bölümü bölenle çarparak, verilen son miktarı başlangıca geri koyarak denetle. Küçük bir özel örnek genel iddiayı kanıtlamaz; geçerli bir karşı örnek yanlış genellemeyi çürütür. Süre tutmak isteğe bağlıdır; süre, şekille oynamak veya çözümü açmak uygulamada bağımsız doğru, ustalık veya XP oluşturmaz."
      ]
    }
  ],
  "examples": [
    {
      "code": "E01",
      "title": "Ortak payda mı, kolay birleşenler mi?",
      "prompt": "3/4−5/6+1/3 işlemini sade kesirle hesapla.",
      "strategy": "Üç paydayı 12’de buluştur; sonra kolay gruplamayla denetle.",
      "steps": [
        {
          "label": "Parçaları eşitle",
          "expression": "9/12−10/12+4/12",
          "explanation": "4,6,3 sayılarının ortak katı 12’dir; her pay aynı oranda genişler."
        },
        {
          "label": "Payları işaretleriyle birleştir",
          "expression": "(9−10+4)/12=3/12=1/4",
          "explanation": "Çıkarılan ikinci terimin eksi işareti korunur."
        },
        {
          "label": "Kolay grubu ayrı dene",
          "expression": "−5/6+1/3=−1/2; 3/4−1/2=1/4",
          "explanation": "Aynı işlem, farklı doğru gruplamada da aynı sayıyı vermelidir."
        }
      ],
      "answer": "1/4",
      "check": "3/4+1/3=13/12; 13/12−10/12=3/12.",
      "pitfall": "Paydaları veya işaretleri toplamak, ortak parça boyunu bozabilir."
    },
    {
      "code": "E02",
      "title": "Büyük ara çarpımları üretmeden sadeleştir",
      "prompt": "(14/15)×(25/21) işlemini hesapla.",
      "strategy": "Yalnız çarpanlar arasında ortak bölenleri ayır.",
      "steps": [
        {
          "label": "Ortak yediyi böl",
          "expression": "14/21=2/3",
          "explanation": "14 ve 21, bütün çarpımın pay ve paydasındaki çarpanlardır."
        },
        {
          "label": "Ortak beşi böl",
          "expression": "25/15=5/3",
          "explanation": "İkinci sadeleştirmede de hem pay hem payda aynı sayıya bölünür."
        },
        {
          "label": "Kalan çarpanları çarp",
          "expression": "(2×5)/(3×3)=10/9",
          "explanation": "Kesir 1’den biraz büyük olabilir; çarpma daima küçültmez."
        }
      ],
      "answer": "10/9",
      "check": "Doğrudan 350/315’i 35’e bölünce 10/9.",
      "pitfall": "Sadeleştirme yalnız bir terimin bir rakamını silmek değildir."
    },
    {
      "code": "E03",
      "title": "Bölümü geri çarpımla denetle",
      "prompt": "(3/5)/(9/10) işlemini hesapla.",
      "strategy": "Sıfır olmayan ikinci kesrin tersini al.",
      "steps": [
        {
          "label": "Böleni denetle",
          "expression": "9/10≠0",
          "explanation": "Bölme tanımlıdır; ilk kesir ters çevrilmez."
        },
        {
          "label": "Ters kesirle çarp",
          "expression": "(3/5)×(10/9)=30/45=2/3",
          "explanation": "Pay ve paydada 15 ortak böleni vardır."
        },
        {
          "label": "Bölüneni geri üret",
          "expression": "(2/3)×(9/10)=3/5",
          "explanation": "Bu ters işlem bölümün yönünü denetler."
        }
      ],
      "answer": "2/3",
      "check": "9/10<1 olduğu için 3/5’i bölmek sonucu büyütür; 2/3>3/5.",
      "pitfall": "İlk kesri ters çevirmek doğru sonucun tersini verebilir."
    },
    {
      "code": "E04",
      "title": "Kesir çizgisinin iki grubunu önce bitir",
      "prompt": "(1−1/3)/(1+1/2) işlemini hesapla.",
      "strategy": "Üstteki ve alttaki parantezi ayrı sadeleştir.",
      "steps": [
        {
          "label": "Üst grubu tamamla",
          "expression": "1−1/3=2/3",
          "explanation": "Bir tamı 3/3 olarak yaz."
        },
        {
          "label": "Alt grubu tamamla",
          "expression": "1+1/2=3/2",
          "explanation": "Alt grup sıfır olmadığı için bölme yapılabilir."
        },
        {
          "label": "İki sonucu böl",
          "expression": "(2/3)/(3/2)=(2/3)×(2/3)=4/9",
          "explanation": "Sadece alt gruptan elde edilen kesir ters çevrilir."
        }
      ],
      "answer": "4/9",
      "check": "(4/9)×(3/2)=2/3; üst grup geri gelir.",
      "pitfall": "Parantezsiz bir satıra geçerken üst ve alt grubu kaybetme."
    },
    {
      "code": "E05",
      "title": "Tek sonucu üç yöntemle doğrula",
      "prompt": "7/8 ile 11/12’den hangisi büyüktür? Üç gerekçe kur.",
      "strategy": "Ortak payda, eksik parça ve çapraz çarpımı ayrı dene.",
      "steps": [
        {
          "label": "Ortak paydayı kur",
          "expression": "7/8=21/24<22/24=11/12",
          "explanation": "Pozitif aynı paydada paylar karşılaştırılır."
        },
        {
          "label": "Bir bütüne kalanları gör",
          "expression": "1/8>1/12",
          "explanation": "Daha az eksik olan 11/12 daha büyüktür."
        },
        {
          "label": "Çapraz sayıları karşılaştır",
          "expression": "7×12=84<88=11×8",
          "explanation": "Paydalar pozitif olduğu için karşılaştırma yönü korunur."
        }
      ],
      "answer": "11/12>7/8",
      "check": "Fark 11/12−7/8=1/24>0.",
      "pitfall": "Sadece payda büyük diye sonuç seçmek bu üç yöntemin hiçbiri değildir."
    },
    {
      "code": "E06",
      "title": "Aynı paylı eksik ile farklı paylı eksiği ayır",
      "prompt": "Önce 13/16 ile 17/20’yi, sonra 5/8 ile 7/12’yi karşılaştır.",
      "strategy": "İki örnekte de önce eksikleri gerçekten yaz.",
      "steps": [
        {
          "label": "İlk çiftin eksiklerini bul",
          "expression": "3/16 ve 3/20",
          "explanation": "İki eksiğin payı 3; küçük eksik 3/20 olduğundan 17/20 büyük."
        },
        {
          "label": "Yakın örnekte koşulu yeniden denetle",
          "expression": "3/8 ve 5/12",
          "explanation": "Bu kez paylar eşit değildir; tek başına payda kısayolu yok."
        },
        {
          "label": "İkinci çiftin parçalarını eşitle",
          "expression": "3/8=9/24<10/24=5/12",
          "explanation": "Küçük eksik 5/8’e ait olduğu için 5/8>7/12."
        }
      ],
      "answer": "17/20>13/16; 5/8>7/12",
      "check": "260<272 ve 15/24>14/24 aynı sonuçları verir.",
      "pitfall": "İlk örneğin iki eksiği aynı paylıdır; farklı-pay uyarısını ancak ikinci örneğe uygula."
    },
    {
      "code": "E07",
      "title": "Negatif uçların arasına bir rasyonel yerleştir",
      "prompt": "−2/3 ile −3/5 arasına bir rasyonel sayı yaz ve kesin denetle.",
      "strategy": "Paydaları 30’a genişlet; ortadaki payı seç.",
      "steps": [
        {
          "label": "Uçları eş parçalara çevir",
          "expression": "−2/3=−20/30; −3/5=−18/30",
          "explanation": "Sayı doğrusunda −20/30 soldadır."
        },
        {
          "label": "Ortadaki payı seç",
          "expression": "−19/30",
          "explanation": "−20 ile −18’in arasında −19 bulunur."
        },
        {
          "label": "Kesin aralığı yaz",
          "expression": "−20/30<−19/30<−18/30",
          "explanation": "Üç kesrin paydası aynı ve pozitiftir."
        }
      ],
      "answer": "Örneğin −19/30",
      "check": "İki ucun ortalaması da (−2/3−3/5)/2=−19/30.",
      "pitfall": "Daha büyük mutlak değer, daha büyük negatif sayı demek değildir."
    },
    {
      "code": "E08",
      "title": "Tekrarlamayan 2 ile tekrarlayan 3’ü ayır",
      "prompt": "x=1,233333…; yalnız 3 devrediyor. x’i sade kesirle yaz.",
      "strategy": "Kuyrukların aynısını iki 10 kuvvetiyle hizala.",
      "steps": [
        {
          "label": "Devirden önceki basamağı ayır",
          "expression": "10x=12,3333…",
          "explanation": "2 yalnız bir kez gelir; devreden blok 3’tür."
        },
        {
          "label": "Aynı kuyruğu çıkar",
          "expression": "100x−10x=123,3333…−12,3333…=111",
          "explanation": "Sonsuz kuyruğun iki eş kopyası birbirini götürür."
        },
        {
          "label": "Eşitliği çöz ve sadeleştir",
          "expression": "90x=111; x=111/90=37/30",
          "explanation": "Tam kısım ile yalnız 3 devrini geri denetle."
        }
      ],
      "answer": "37/30",
      "check": "37/30=1+7/30=1,233333…; 122/99=1,(23),123/99=1,(24) farklıdır.",
      "pitfall": "1,(23), 1,2(3) ve 1,(24) üç ayrı sayıdır; görülen rakamları gelişigüzel 99’a bölme."
    },
    {
      "code": "E09",
      "title": "Kalanı koruyarak ileri ve geri git",
      "prompt": "Suyun önce 1/4’ü, sonra kalanın 1/3’ü kullanılıyor; 40 L kalıyor. Başlangıç kaç litredir?",
      "strategy": "Başlangıca x L de; her kullanımın bütününü ayrıca etiketle.",
      "steps": [
        {
          "label": "İlk kalan bütünü kur",
          "expression": "(1−1/4)x=3x/4",
          "explanation": "İkinci kullanımın bütünü başlangıç x değil bu kalan miktardır."
        },
        {
          "label": "İkinci kalanı kur",
          "expression": "(2/3)×(3/4)x=x/2=40",
          "explanation": "İkinci kullanımdan sonra o anki suyun 2/3’ü kalır."
        },
        {
          "label": "Başlangıca geri dön",
          "expression": "x=40/(1/2)=80 L",
          "explanation": "Tersten 40/(2/3)=60 ve 60/(3/4)=80 de aynı sonucu verir."
        }
      ],
      "answer": "80 L",
      "check": "80−20=60; 60’ın 1/3’ü olan 20 gider, 40 kalır.",
      "pitfall": "İkinci kez başlangıcın 1/3’ünü çıkarmak farklı bir koşuldur."
    },
    {
      "code": "E10",
      "title": "B bileşenini seçerek çıkar, hacmi koru",
      "prompt": "Hacmi V olan karışımın 2/5’i A, kalanı B. B’nin 1/3’ü seçilerek çıkarılıp eşit hacimde A ekleniyor. Son A miktarı 700 mL; V nedir?",
      "strategy": "Çıkan B hacmini önce toplam V’nin kesri yap.",
      "steps": [
        {
          "label": "İlk bileşenleri yaz",
          "expression": "A=2V/5; B=3V/5",
          "explanation": "Verilen oranlar hacim oranlarıdır; toplam V korunur."
        },
        {
          "label": "Yer değiştiren hacmi bul",
          "expression": "Çıkan B=(1/3)(3V/5)=V/5; eklenen A=V/5",
          "explanation": "Eşit hacim koşulu bu iki miktarı eşitler."
        },
        {
          "label": "Son A ile eşitlik kur",
          "expression": "2V/5+V/5=3V/5=700; V=3500/3 mL",
          "explanation": "Sonucun kesir olması geçerlidir; yaklaşık litreye yuvarlamak zorunlu değildir."
        }
      ],
      "answer": "3500/3 mL",
      "check": "Son B miktarı 1400/3 mL; 700+1400/3=3500/3.",
      "pitfall": "Homojen karışımdan rastgele 1/3 hacim çıkarmak, yalnız B’nin 1/3’ünü çıkarmakla aynı işlem değildir."
    },
    {
      "code": "E11",
      "title": "Oran koşuluna toplamı ve aralarında asal şartını ekle",
      "prompt": "a ve b pozitif tam sayılar; a/b=3/5, a+b=40. a ve b’yi bul; ayrıca aralarında asal denseydi durum ne olurdu?",
      "strategy": "Sade oranı ortak çarpan k ile yaz.",
      "steps": [
        {
          "label": "Oran ailesini yaz",
          "expression": "a=3k; b=5k; k pozitif tam sayı",
          "explanation": "Oran tek başına k’yi belirlemez."
        },
        {
          "label": "Toplamı kullan",
          "expression": "8k=40; k=5; a=15; b=25",
          "explanation": "İki bilinmeyen aynı k’ye bağlıdır."
        },
        {
          "label": "Yeni koşulu ayrıca denetle",
          "expression": "Aralarında asal olsaydı k=1 ve a+b=8",
          "explanation": "40 koşuluyla birlikte çözüm yoktur; 15 ve 25 aralarında asal değildir."
        }
      ],
      "answer": "(15,25); ek aralarında asal koşuluyla çözüm yok.",
      "check": "15/25=3/5 ve 15+25=40; EBOB(15,25)=5.",
      "pitfall": "Sade 3/5’i, verilmiş a ve b’nin mutlaka 3 ve 5 olması sanma."
    },
    {
      "code": "E12",
      "title": "İlk satırı verilen modeli tamamla",
      "prompt": "Önce bir miktarın 1/5’i, sonra kalanın 1/4’ü kullanılıyor; 18 kalıyor. (1−1/4)(1−1/5)x=18 satırını tamamla.",
      "strategy": "İlk hamle hazır; kalan çarpanlarını kendin sadeleştir.",
      "steps": [
        {
          "label": "Kalan oranlarını yaz",
          "expression": "(3/4)(4/5)x=18",
          "explanation": "Kullanılan oran değil, her adımda kalan oran çarpılır."
        },
        {
          "label": "Ortak çarpanı sadeleştir",
          "expression": "3x/5=18;x=30",
          "explanation": "4 ortak çarpanı bütün çarpımda bölünür."
        },
        {
          "label": "Miktarları geri koy",
          "expression": "30−6=24;24−6=18",
          "explanation": "İkinci 6, ilk miktarın değil 24’ün 1/4’üdür."
        }
      ],
      "answer": "30",
      "check": "18/(3/4)=24; 24/(4/5)=30.",
      "pitfall": "Önceki tank örneğinin 80 cevabını yeni sayılara taşımak kontrol değildir."
    },
    {
      "code": "E13",
      "title": "Devirli sayı sonlu benzerinden ne kadar farklı?",
      "prompt": "0,454545… ile 0,45 arasındaki farkı tam kesirle bul; 45 bloğu sonsuza dek yineleniyor.",
      "strategy": "İlkini 99, ikincisini 100 paydasına bağla.",
      "steps": [
        {
          "label": "İki sayıyı ayrı dönüştür",
          "expression": "0,(45)=45/99=5/11; 0,45=45/100=9/20",
          "explanation": "Sonlu sayı için devre dayalı 99 paydası kullanılmaz."
        },
        {
          "label": "Farkı ortak paydayla bul",
          "expression": "5/11−9/20=(100−99)/220=1/220",
          "explanation": "Pozitif fark,tekrarlayan sayının daha büyük olduğunu gösterir."
        }
      ],
      "answer": "1/220",
      "check": "9/20+1/220=99/220+1/220=100/220=5/11.",
      "pitfall": "Yakın görünmeleri tam eşit olduklarını göstermez."
    },
    {
      "code": "E14",
      "title": "Su miktarından kabın darasını çıkar",
      "prompt": "Aynı sıvıyla aynı koşullarda boş kap 120 g, dolu kap 360 g, kısmen dolu kap 270 g. Doluluk oranı nedir?",
      "strategy": "İki su kütlesini aynı boş kabı çıkararak bul.",
      "steps": [
        {
          "label": "Tam sıvıyı ayır",
          "expression": "360−120=240 g",
          "explanation": "Kapasitenin tamamına karşılık gelen sıvı kütlesi 240 g."
        },
        {
          "label": "Kısmi sıvıyı ayır",
          "expression": "270−120=150 g",
          "explanation": "Kap ikinci tartımda da aynı 120 g kütleyi taşır."
        },
        {
          "label": "Aynı sıvı miktarlarını oranla",
          "expression": "150/240=5/8",
          "explanation": "Yoğunluk aynı olduğu için hacim oranıyla aynıdır."
        }
      ],
      "answer": "5/8",
      "check": "240×5/8+120=270 g.",
      "pitfall": "270/360, kabı su gibi orana kattığından doluluk oranını vermez."
    },
    {
      "code": "E15",
      "title": "Parça adedi ile kesim adedini ayır",
      "prompt": "İki ucu açık ve birbirine bağlı olmayan tek parça ip 3/4 m uzunluğunda. Üst üste konmadan ayrı kesimlerle tam 1/8 m parçalara ayrılıyor. Kaç parça ve kaç kesim gerekir?",
      "strategy": "Uzunluğu parça uzunluğuna böl; tek ipte sınır sayısını sonra sor.",
      "steps": [
        {
          "label": "Birimleri eşitle",
          "expression": "3/4 m=6/8 m",
          "explanation": "Her parça 1/8 m; altı birim parça vardır."
        },
        {
          "label": "Parça sayısını bul",
          "expression": "(3/4)/(1/8)=6",
          "explanation": "Bu bölme aynı uzunluk birimlerini sadeleştirir."
        },
        {
          "label": "İç sınırları say",
          "expression": "6−1=5 kesim",
          "explanation": "Tek ipin iki uç noktası zaten var; beş iç sınır açılır."
        }
      ],
      "answer": "6 parça; 5 kesim",
      "check": "6×1/8 m=3/4 m; üst üste kesme verilmediyse onu varsayma.",
      "pitfall": "Her parçaya bir kesim sayarsan son hazır ucu yeniden kesmiş olursun."
    },
    {
      "code": "E16",
      "title": "Toplama hatasından sonra yeni soruyu çöz",
      "prompt": "“2/3+1/6=3/9” satırındaki ilk hatayı bul; sonra 3/5+1/10’u hesapla.",
      "strategy": "Farklı boyda parçalar için ortak payda gerekir.",
      "steps": [
        {
          "label": "İlk hatayı adlandır",
          "expression": "Paydalar toplanmış",
          "explanation": "2/3=4/6 olduğundan ilk işlem 5/6 olmalıydı."
        },
        {
          "label": "Yeni veriyi eşitle",
          "expression": "3/5=6/10",
          "explanation": "Çözüme bakmak yerine yeni kesri aynı kuralla kur."
        },
        {
          "label": "Payları topla",
          "expression": "6/10+1/10=7/10",
          "explanation": "Payda birim parça boyudur; 10 kalır."
        }
      ],
      "answer": "İlk hata paydaları toplamak; yeni sonuç 7/10.",
      "check": "7/10−1/10=6/10=3/5.",
      "pitfall": "İşlem sonucunu ezberlemek, ilk bozulan kuralı açıklamak değildir."
    },
    {
      "code": "E17",
      "title": "Bölme yerine çarpma yapıldığını yakala",
      "prompt": "“(1/2)/(3/4)=3/8” hatasını açıkla; sonra (2/5)/(4/3)’ü çöz.",
      "strategy": "Yazılan 3/8, çarpmanın sonucudur; bölmenin değil.",
      "steps": [
        {
          "label": "Yanlış işlemi tanı",
          "expression": "(1/2)×(3/4)=3/8",
          "explanation": "Bölenin tersi alınmamış; doğru eski bölüm 2/3’tür."
        },
        {
          "label": "Yeni böleni ters çevir",
          "expression": "(2/5)×(3/4)",
          "explanation": "İlk kesir aynı kalır."
        },
        {
          "label": "Çarpımı sadeleştir",
          "expression": "6/20=3/10",
          "explanation": "Paydayı ve payı 2’ye böl."
        }
      ],
      "answer": "Yeni sonuç 3/10.",
      "check": "(3/10)×(4/3)=2/5.",
      "pitfall": "Doğru sonucun tersini alarak eski yanlışı onaramazsın; hangi kesrin neden ters döndüğünü söyle."
    },
    {
      "code": "E18",
      "title": "Uzaklık kanıtının yönünü onar",
      "prompt": "“−4/5>−3/4, çünkü 4/5 büyüktür” iddiasını onar; sonra −5/6 ile −7/8’i karşılaştır.",
      "strategy": "Her çifti pozitif ortak paydada işaretli paylarla karşılaştır.",
      "steps": [
        {
          "label": "Eski çifti düzelt",
          "expression": "−4/5=−16/20<−15/20=−3/4",
          "explanation": "Uzak olan negatif sayı sayı doğrusunda soldadır."
        },
        {
          "label": "Yeni çifti eşitle",
          "expression": "−5/6=−20/24;−7/8=−21/24",
          "explanation": "Ortak payda pozitiftir."
        },
        {
          "label": "İşaretli payı karşılaştır",
          "expression": "−20>−21",
          "explanation": "Bu nedenle −5/6>−7/8."
        }
      ],
      "answer": "Eski iddia yanlış; yeni büyük sayı −5/6.",
      "check": "−5/6−(−7/8)=1/24>0.",
      "pitfall": "Mutlak değerleri kıyaslamak doğrudan negatif sıralama değildir."
    },
    {
      "code": "E19",
      "title": "Kullanılan ikinci payı son kalan sanma",
      "prompt": "Başlangıç 24 birim. Önce 1/2’si, sonra kalanın 1/3’ü kullanılıyor. Ne kalır? İkinci kullanım başlangıcın 1/3’ü olsaydı?",
      "strategy": "İkinci kullanımın bütününü iki koşulda ayrı yaz.",
      "steps": [
        {
          "label": "İlk kalanı hesapla",
          "expression": "24−12=12",
          "explanation": "İkinci kullanımın bütünü bu 12’dir."
        },
        {
          "label": "Kalanın üçte birini kullan",
          "expression": "12−12/3=8",
          "explanation": "Kullanılan 4, başlangıcın 1/6’sı; son kalan 8, başlangıcın 1/3’üdür."
        },
        {
          "label": "Koşulu değiştir",
          "expression": "24−12−24/3=4",
          "explanation": "İkinci kesir ilk bütüne bağlanınca farklı problem oluşur."
        }
      ],
      "answer": "Kalanın 1/3’ü koşulunda 8; başlangıcın 1/3’ü koşulunda 4.",
      "check": "Kalan oranlar sırasıyla (1/2)(2/3)=1/3 ve 1−1/2−1/3=1/6.",
      "pitfall": "1/6 oranı ilk koşulda son kalanı değil ikinci kullanılan miktarı anlatır."
    },
    {
      "code": "E20",
      "title": "Aynı işaretler, farklı parantezler",
      "prompt": "(1/2)/(1/4)×2 ile (1/2)/((1/4)×2) aynı mıdır?",
      "strategy": "Çarpma ve bölme aynı öncelikteyse soldan sağa ilerle; ek parantezi ayrı tut.",
      "steps": [
        {
          "label": "İlk ifadeyi soldan yürüt",
          "expression": "((1/2)/(1/4))×2=2×2=4",
          "explanation": "Bütün sağ taraf tek payda yapılmaz."
        },
        {
          "label": "İkinci ifadenin paydasını bitir",
          "expression": "(1/4)×2=1/2",
          "explanation": "Ek parantez bu çarpımı bölmeden önceye alır."
        },
        {
          "label": "İkinci bölümü yap",
          "expression": "(1/2)/(1/2)=1",
          "explanation": "Aynı semboller farklı gruplarda aynı işlemi oluşturmaz."
        }
      ],
      "answer": "Aynı değil; 4 ve 1.",
      "check": "İkinci ifade 1×(1/2)=1/2 geri verir.",
      "pitfall": "Çarpmanın bölmeden her durumda önce olduğunu sanma."
    }
  ],
  "items": [
    {
      "code": "Q01",
      "prompt": "Rasyonel sayı tanımında hangi koşul doğrudur?",
      "options": [
        "a, b tam sayı ve b≠0 iken a/b biçiminde yazılabilme",
        "Bölme sonucunun mutlaka tam sayı olmaması",
        "Payın paydadan küçük olması",
        "Paydanın 10’un kuvveti olarak yazılmış olması",
        "Ondalık gösteriminin mutlaka sonlu olması"
      ],
      "knowledge": [
        "ℤ tam sayıları, ℚ rasyonel sayıları gösterir.",
        "Kesir çizgisi bölme anlamına gelir; payda sıfır olamaz."
      ],
      "strategy": "Tanımı, örneklerin görünüşünden ayır; her öneriyi bir karşı örnekle denetle.",
      "steps": [
        "a ve b’nin tam sayı olmasını ara.",
        "b≠0 koşulunu koru; sade biçimde yazılma veya basit kesir olma zorunluluğu yoktur."
      ],
      "optionReasons": [
        "Bu koşul, hem −3/1 gibi tam sayıları hem de 1/3 gibi devirli ondalık gösterimi olan sayıları kapsar.",
        "5=5/1 rasyoneldir; bölme sonucu tam sayı da olabilir.",
        "7/4 rasyoneldir; basit kesir olma şartı aranmaz.",
        "1/3 rasyoneldir; paydasının 10’un kuvveti olması gerekmez.",
        "1/3=0,(3) rasyoneldir ve ondalık gösterimi devirlidir."
      ],
      "commonError": "Rasyonel sayıyı “tam çıkmayan bölme” diye tanımlamak.",
      "check": "−3, 0, 5 ve 1/3 tanıma uyar; π ve √2 irrasyonel sayı örnekleridir."
    },
    {
      "code": "Q02",
      "prompt": "Aşağıdaki ifadelerden hangisi tanımlı bir rasyonel sayıdır?",
      "options": [
        "0/7",
        "7/0",
        "0/0",
        "(1/2)/0",
        "1/(3−3)"
      ],
      "knowledge": [
        "Bir kesrin payı sıfır olabilir; paydası sıfır olamaz."
      ],
      "strategy": "Payı, paydayı ve varsa paydadaki işlem grubunu ayrı ayrı denetle.",
      "steps": [
        "0/7’de payda 7≠0’dır.",
        "Sıfırın yediye bölümü 0’dır."
      ],
      "optionReasons": [
        "0/7=0’dır; pay ve payda tam sayı, payda da sıfırdan farklıdır.",
        "Payda sıfır olduğu için ifade tanımsızdır.",
        "Sıfırın sıfıra bölümüne belirli bir sayı değeri atanamaz.",
        "Bölen sıfır olduğundan bölme işlemi tanımlı değildir.",
        "Paydadaki grup 3−3=0 olduğundan kesir tanımsızdır."
      ],
      "commonError": "0/b kuralını, izin verilmeyen b=0 durumuna da uygulamak.",
      "check": "0×7=0’dır; 7/0 için bu ters çarpma ilişkisini sağlayan bir sonuç yoktur."
    },
    {
      "code": "Q03",
      "prompt": "−(2 tam 1/3) ifadesinin değeri nedir? Burada tam sayılı gösterim, 2+1/3 toplamını belirtir.",
      "options": [
        "−7/3",
        "−5/3",
        "7/3",
        "−2/3",
        "−1/3"
      ],
      "knowledge": [
        "2 tam 1/3=2+1/3’tür.",
        "Parantezin önündeki eksi, parantez içindeki toplamın tamamını ters işaretli yapar."
      ],
      "strategy": "Önce tam kısmı üçte birlik parçalara çevir, sonra parantezin önündeki işareti uygula.",
      "steps": [
        "2+1/3=6/3+1/3=7/3.",
        "Bu toplamın negatifi −7/3’tür."
      ],
      "optionReasons": [
        "Parantezin tamamına uygulanan eksi, tam kısmı ve kesirli kısmı birlikte negatif yapar.",
        "Bu, −2+1/3 ifadesinin değeridir; eksi bütün paranteze uygulanmamıştır.",
        "Parantezin önündeki eksi işareti kullanılmamıştır.",
        "İki tam, altı tane üçte birlik parçadır; iki tane üçte birlik parça değildir.",
        "İki tamlık kısım hesaba katılmamıştır."
      ],
      "commonError": "−(2+1/3) ile −2+1/3 ifadelerini aynı saymak.",
      "check": "−7/3+7/3=0’dır; −5/3+7/3=2/3 olduğundan bu iki negatif kesir aynı değildir."
    },
    {
      "code": "Q04",
      "prompt": "(−6)/(−8) kesrinin sade ve pozitif paydalı eşdeğeri nedir?",
      "options": [
        "3/4",
        "−3/4",
        "3/8",
        "4/3",
        "0"
      ],
      "knowledge": [
        "Payı ve paydayı aynı sıfırdan farklı sayıya bölmek kesrin değerini korur.",
        "İki negatif sayının bölümü pozitiftir."
      ],
      "strategy": "Önce iki eksi işaretinin etkisini, sonra ortak 2 çarpanını denetle.",
      "steps": [
        "(−6)/(−8)=6/8.",
        "6/8=(6/2)/(8/2)=3/4."
      ],
      "optionReasons": [
        "Hem işaret kuralı hem de ortak bölen doğru kullanılmıştır.",
        "İki negatif işaretten yalnız biri kaldırılmıştır.",
        "Yalnız pay 2’ye bölünmüş; kesrin değeri yarıya indirilmiştir.",
        "Pay ve payda yer değiştirmiş; kesrin tersi alınmıştır.",
        "Pay sıfır olmadığı için bu tanımlı bölümün sonucu sıfır değildir."
      ],
      "commonError": "İşareti ve sadeleştirmeyi düzenlerken yalnız payı değiştirmek.",
      "check": "3×8=4×6=24 olduğundan pozitif oranlar denktir."
    },
    {
      "code": "Q05",
      "prompt": "6/8’i değerini koruyarak sadeleştiren seçenek hangisidir?",
      "options": [
        "3/4",
        "3/8",
        "6/4",
        "8/6",
        "0/0"
      ],
      "knowledge": [
        "Pay ve payda aynı sıfırdan farklı ortak bölenle bölünmelidir."
      ],
      "strategy": "6 ve 8’in ortak böleni olan 2’yi kullan.",
      "steps": [
        "6÷2=3.",
        "8÷2=4’tür; payda sıfır olmaz."
      ],
      "optionReasons": [
        "Pay ve payda aynı sıfırdan farklı ortak bölenle bölünmüştür.",
        "Pay bölünmüş, payda bölünmemiştir; kesrin değeri yarıya düşer.",
        "Yalnız payda bölünmüştür; kesrin değeri iki katına çıkar.",
        "Sadeleştirme yerine kesrin tersi alınmıştır.",
        "Payı ve paydayı sıfırla çarpmak, izin verilen bir genişletme işlemi değildir."
      ],
      "commonError": "Denk kesir oluşturmakla kesrin değerini değiştirmeyi karıştırmak.",
      "check": "6/8−3/4=0’dır; iki gösterim sayı doğrusunda aynı noktayı belirtir."
    },
    {
      "code": "Q06",
      "prompt": "1/2+1/3 işlemi kaçtır?",
      "options": [
        "5/6",
        "2/5",
        "1/6",
        "1/3",
        "1/5"
      ],
      "knowledge": [
        "Paydaları farklı kesirleri toplarken aynı büyüklükte parçalar elde etmek için ortak payda kurulur."
      ],
      "strategy": "Yarımları ve üçte birlik parçaları altıda birlik parçalara çevir.",
      "steps": [
        "1/2=3/6; 1/3=2/6.",
        "3/6+2/6=5/6."
      ],
      "optionReasons": [
        "Aynı büyüklükte 5 tane altıda birlik parça toplanmıştır.",
        "Paydaları toplamak, parçaların büyüklüklerini eşitlemez.",
        "Bu iki kesrin çarpımıdır; soruda toplam isteniyor.",
        "Toplanan miktarlardan yalnız biri hesaba katılmıştır.",
        "Payları olduğu gibi bırakıp paydaları toplamak geçerli bir toplama kuralı değildir."
      ],
      "commonError": "Payları ve paydaları birbirinden bağımsız biçimde toplamak.",
      "check": "5/6, iki pozitif toplananın her birinden büyüktür; 5/6−1/3=1/2 ters işlem kontrolüdür."
    },
    {
      "code": "Q07",
      "prompt": "1/2−(−1/3) işlemi kaçtır?",
      "options": [
        "5/6",
        "1/6",
        "−5/6",
        "−1/6",
        "1/5"
      ],
      "knowledge": [
        "Negatif bir sayıyı çıkarmak, o sayının karşıtını eklemektir."
      ],
      "strategy": "Önce işaretli parantezi aç, sonra ortak payda kur.",
      "steps": [
        "1/2−(−1/3)=1/2+1/3.",
        "3/6+2/6=5/6."
      ],
      "optionReasons": [
        "Çıkarma işlemi ile çıkarılan sayının negatif işaretinin birlikte etkisi korunmuştur.",
        "Parantezdeki negatif sayı, pozitif bir sayı çıkarılıyormuş gibi kullanılmıştır.",
        "İşlemin tamamının işareti gerekçesiz olarak değiştirilmiştir.",
        "−1/6, 1/3−1/2 işleminden çıkar; verilen işlemde 1/2+1/3=5/6 olmalıdır.",
        "Paydaları toplamak, kesir toplama kuralı değildir."
      ],
      "commonError": "Parantezin içindeki eksi ile dışındaki eksiye tek bir eksi gibi davranmak.",
      "check": "5/6+(−1/3)=1/2’dir; ters işlem başlangıçtaki sayıyı verir."
    },
    {
      "code": "Q08",
      "prompt": "3/4−5/6+1/3 işlemi kaçtır?",
      "options": [
        "1/4",
        "0",
        "−1/4",
        "13/12",
        "7/12"
      ],
      "knowledge": [
        "Terimleri, önlerindeki işaretleri koruyarak ortak paydaya taşı."
      ],
      "strategy": "12 paydasını kullanabilir veya önce −5/6+1/3 grubunu hesaplayabilirsin.",
      "steps": [
        "3/4=9/12; 5/6=10/12; 1/3=4/12.",
        "(9−10+4)/12=3/12=1/4."
      ],
      "optionReasons": [
        "İşaretli paylar doğru birleştirilmiş ve sonuç sadeleştirilmiştir.",
        "Ortak paydadaki pay toplamı 9−10+4=3’tür; sıfır değildir.",
        "Pay toplamı pozitiftir; sonucun işareti yanlış taşınmıştır.",
        "Bu, 3/4+1/3 toplamıdır; 5/6 çıkarılmamıştır.",
        "Bu verilerin işaretli toplamı 3/12’dir; 7/12 değildir."
      ],
      "commonError": "Çıkarılan terimin önündeki eksi işaretini kaybetmek.",
      "check": "−5/6+1/3=−1/2; ardından 3/4−1/2=1/4 bulunur."
    },
    {
      "code": "Q09",
      "prompt": "(14/15)×(25/21) işlemi kaçtır?",
      "options": [
        "10/9",
        "9/10",
        "2/3",
        "350/36",
        "1"
      ],
      "knowledge": [
        "Bir çarpımın payındaki ve paydasındaki ortak çarpanlar birlikte sadeleştirilebilir."
      ],
      "strategy": "14/21’i 2/3’e, 25/15’i 5/3’e sadeleştir.",
      "steps": [
        "(14/21)×(25/15)=(2/3)×(5/3).",
        "2×5/(3×3)=10/9."
      ],
      "optionReasons": [
        "Çarpımın payında ve paydasında kalan bütün çarpanlar korunmuştur.",
        "Doğru çarpımın tersi alınmıştır.",
        "Yalnız 14/21 sadeleştirilmiş; 25/15 çarpanı kullanılmamıştır.",
        "Payda 15×21=315 olmalıdır; 36, paydaların toplamıdır.",
        "Çarpanların birbirini tamamen götürdüğü varsayılmıştır; oysa 350≠315’tir."
      ],
      "commonError": "Sadeleştirmeden sonra kalan bir çarpanı unutmak.",
      "check": "350/315=10/9’dur; sonuç 1’den biraz büyüktür."
    },
    {
      "code": "Q10",
      "prompt": "(6/7)×(14/15) işlemi kaçtır?",
      "options": [
        "4/5",
        "6/5",
        "2/5",
        "20/21",
        "5/4"
      ],
      "knowledge": [
        "Çarpımın payındaki ve paydasındaki ortak çarpanlar sadeleşir."
      ],
      "strategy": "14 ile 7’yi, 6 ile 15’i ortak bölenleriyle sadeleştir.",
      "steps": [
        "14/7=2; 6/15=2/5.",
        "2×2/5=4/5."
      ],
      "optionReasons": [
        "Sadeleştirmeden sonra kalan 2 ve 2/5 çarpanları birleştirilmiştir.",
        "14/7=2 doğru kullanılsa da 6/15 sadeleştirilirken çarpan bozulmuştur.",
        "Pay kısmında kalan 2 çarpanlarından biri unutulmuştur.",
        "Ortak çarpanlar doğru korunmamıştır; 84/105=4/5’tir.",
        "Doğru çarpımın tersi alınmıştır."
      ],
      "commonError": "Sadeleştirme bittikten sonra kalan bütün çarpanları yazmamak.",
      "check": "84/105’in payını ve paydasını 21’e bölmek 4/5 verir."
    },
    {
      "code": "Q11",
      "prompt": "(3/5)/(9/10) işlemi kaçtır?",
      "options": [
        "2/3",
        "27/50",
        "3/2",
        "9/10",
        "0"
      ],
      "knowledge": [
        "Sıfırdan farklı bölen kesrin tersini alarak çarpma yap."
      ],
      "strategy": "İlk kesir 3/5 olarak kalsın; ters çevrilecek kesri doğru seç.",
      "steps": [
        "(3/5)×(10/9)=30/45.",
        "30/45=2/3."
      ],
      "optionReasons": [
        "Bölmenin yönü korunmuş ve ortak 15 böleniyle sadeleştirme yapılmıştır.",
        "İki kesir doğrudan çarpılmış; bölen kesrin tersi alınmamıştır.",
        "Bu, doğru sonucun tersidir; ilk kesir ters çevrilmiş olabilir.",
        "Bölen aynen tekrar edilmiştir; istenen bölüm hesaplanmamıştır.",
        "Bölünen 3/5 sıfır değildir; bu tanımlı bölmenin sonucu 0 olamaz."
      ],
      "commonError": "Bölenle çarpmak ile bölene bölmeyi karıştırmak.",
      "check": "(2/3)×(9/10)=3/5’tir; bölüm ile bölen çarpılınca bölünen geri gelir."
    },
    {
      "code": "Q12",
      "prompt": "(1−1/3)/(1+1/2) işlemi kaçtır?",
      "options": [
        "4/9",
        "1",
        "9/4",
        "1/3",
        "2/9"
      ],
      "knowledge": [
        "Kesir çizgisi, paydaki ve paydadaki ifadelerin her birini ayrı bir işlem grubu olarak tutar."
      ],
      "strategy": "Paydaki grubu 2/3, paydadaki grubu 3/2 olarak tamamla.",
      "steps": [
        "1−1/3=2/3; 1+1/2=3/2.",
        "(2/3)×(2/3)=4/9."
      ],
      "optionReasons": [
        "İki grup tamamlandıktan sonra bölen kesrin tersi alınmıştır.",
        "Paydaki 2/3 ile paydadaki 3/2 eşit değildir; oran 1 olamaz.",
        "Pay ile paydanın bölünme yönü ters çevrilmiştir.",
        "Üstteki grup 1−1/3=2/3, alttaki grup 1+1/2=3/2’dir; bölüm 4/9 olur. 1/3=3/9, bu iki grubun doğru bölümünü vermez.",
        "Paydadaki 1+1/2=3/2 ifadesi, yanlışlıkla 3 alınmış olabilir."
      ],
      "commonError": "Kesir çizgisinin kapsadığı işlem gruplarını daraltmak.",
      "check": "(4/9)×(3/2)=2/3’tür; paydaki grup geri elde edilir."
    },
    {
      "code": "Q13",
      "prompt": "Parantezleri verildiği gibi koru: (1/2)/(1/4)×2 işlemi kaçtır?",
      "options": [
        "4",
        "1",
        "2",
        "1/4",
        "8"
      ],
      "knowledge": [
        "Çarpma ve bölme aynı önceliktedir; bu işlemler soldan sağa yapılır."
      ],
      "strategy": "Önce ilk iki kesri böl, sonra sonucu 2 ile çarp.",
      "steps": [
        "(1/2)/(1/4)=2.",
        "2×2=4."
      ],
      "optionReasons": [
        "Aynı öncelikteki işlemler soldan sağa yapılmıştır.",
        "Bütün (1/4)×2 ifadesi payda kabul edilirse 1 bulunur; soruda bu ek parantez yoktur.",
        "İlk bölme yapılmış, fakat sondaki ×2 işlemi yapılmamıştır.",
        "Bölme yerine çarpma yapılmış olabilir; ilk bölmenin doğru sonucu 2’dir.",
        "Sondaki ×2 çarpanı iki kez uygulanmıştır."
      ],
      "commonError": "Çarpmanın her durumda bölmeden önce yapıldığını sanmak.",
      "check": "Ek parantez içeren (1/2)/((1/4)×2)=1, farklı bir ifadedir."
    },
    {
      "code": "Q14",
      "prompt": "7/8 ile 11/12 için hangi karşılaştırma ve eksik gerekçesi doğrudur?",
      "options": [
        "11/12 daha büyük; 1/12 eksiği, 1/8’den küçüktür.",
        "7/8 daha büyük; 8 paydası daha küçüktür.",
        "Eşittir; ikisi de 1’den küçüktür.",
        "7/8 daha büyük; 1/8 eksiği daha büyüktür.",
        "11/12 daha büyük; 1/12 eksiği daha büyüktür."
      ],
      "knowledge": [
        "Aynı bütüne göre daha az eksiği olan kesir daha büyüktür."
      ],
      "strategy": "Bütüne kalan eksikleri ve ortak payda kontrolünü birlikte yaz.",
      "steps": [
        "7/8=21/24; 11/12=22/24.",
        "Eksikler 1/8 ve 1/12’dir; ikinci eksik daha küçüktür."
      ],
      "optionReasons": [
        "Hem karşılaştırmanın sonucu hem de eksik gerekçesi doğrudur.",
        "Paylar 7 ve 11 olarak farklı olduğundan yalnız paydaya bakılamaz.",
        "Aynı bölgede bulunmaları eşit olduklarını göstermez; 21/24 ile 22/24 farklıdır.",
        "Daha büyük eksik, asıl sayının daha küçük olduğunu gösterir.",
        "Sonuç doğru olsa da gerekçe yanlıştır; 1/12<1/8’dir."
      ],
      "commonError": "Doğru bir sonucun yanındaki yanlış gerekçeyi de kabul etmek.",
      "check": "11/12−7/8=1/24>0’dır."
    },
    {
      "code": "Q15",
      "prompt": "13/16 ile 17/20 arasında büyük olan hangisidir ve neden?",
      "options": [
        "17/20; 3/20 eksiği, 3/16’dan küçüktür.",
        "13/16; 13 payı 17’den küçük olduğu için.",
        "13/16; 3/16 eksiği daha büyüktür.",
        "Eşittir; eksiklerin ikisinin de payı 3’tür.",
        "17/20; 3/20 eksiği daha büyüktür."
      ],
      "knowledge": [
        "Eksiklerin pozitif payları aynıysa küçük eksik, büyük asıl kesri gösterir."
      ],
      "strategy": "Her sayı için 1−kesir işlemini yap, sonra çapraz çarpımla denetle.",
      "steps": [
        "1−13/16=3/16; 1−17/20=3/20.",
        "3/20<3/16 olduğundan 17/20>13/16’dır."
      ],
      "optionReasons": [
        "İki eksiğin payının da gerçekten 3 olduğu denetlenmiştir.",
        "Paydalar farklıyken yalnız küçük paya bakılamaz; üstelik verilen karşılaştırmanın yönü de yanlıştır.",
        "Büyük eksik, asıl sayıyı daha büyük yapmaz.",
        "Eksiklerin paydaları 16 ve 20 olarak farklıdır; bu eksikler eşit değildir.",
        "Sonuç doğru olsa da neden yanlıştır; 3/20<3/16’dır."
      ],
      "commonError": "Yöntemin koşullarını denetlemek yerine ezberden karar vermek.",
      "check": "13×20=260<272=17×16’dır."
    },
    {
      "code": "Q16",
      "prompt": "5/8 ve 7/12 için hangi karşılaştırma doğrudur?",
      "options": [
        "5/8>7/12",
        "5/8<7/12",
        "5/8=7/12",
        "5/8=1−5/12",
        "7/12>1"
      ],
      "knowledge": [
        "Paylar farklıyken yalnız paydaya bakılarak karşılaştırma yapılamaz."
      ],
      "strategy": "İki kesri 24 eş parçaya bölünmüş aynı bütüne göre yaz veya gerçek eksiklerini karşılaştır.",
      "steps": [
        "5/8=15/24; 7/12=14/24.",
        "Eksikler 9/24 ve 10/24’tür; ilk kesrin eksiği daha küçüktür."
      ],
      "optionReasons": [
        "Hem ortak payda hem de eksik yöntemi aynı karşılaştırmayı verir.",
        "Ortak paydada 15/24>14/24 olduğundan bu seçenekteki yön terstir.",
        "Çapraz çarpımlar 60 ve 56’dır; eşit değildir.",
        "1−5/12=7/12 olur; bu değer ilk kesre eşit değildir.",
        "Pay 7, pozitif payda 12’den küçük olduğundan bu kesir 1’den küçüktür."
      ],
      "commonError": "3/8 ile 5/12 eksiklerinin paylarının farklı olduğunu göz ardı etmek.",
      "check": "5/8−7/12=1/24>0’dır."
    },
    {
      "code": "Q17",
      "prompt": "−3/4 ve −1/2 sayılarını aynı sayı doğrusuna yerleştirdiğinde hangisi doğrudur?",
      "options": [
        "−1/2 daha sağda ve daha büyüktür.",
        "−3/4 daha büyüktür; sıfıra uzaklığı daha büyüktür.",
        "İkisi eşittir; ikisi de negatiftir.",
        "−3/4 pozitiftir; paydanın 4 olması yeterlidir.",
        "−1/2, sıfırdan 3/4 birim uzaktadır."
      ],
      "knowledge": [
        "Sayı doğrusunda sağa gidildikçe sayıların değeri artar.",
        "Mutlak değer, sayının sıfıra uzaklığıdır."
      ],
      "strategy": "−3/4 ve −2/4 noktalarını aynı eş aralıklı sayı doğrusuna yerleştir.",
      "steps": [
        "−3/4<−2/4=−1/2.",
        "Sağdaki −1/2 daha büyüktür."
      ],
      "optionReasons": [
        "Sıfıra uzaklık ile işaretli sayı değeri birbirinden ayrılmıştır.",
        "Uzaklık ile işaretli değer karıştırılmıştır; −3/4 daha soldadır.",
        "Aynı işaretli olmaları değerlerini eşitlemez; −3/4≠−2/4’tür.",
        "Tek eksi işareti, kesrin tamamının negatif olduğunu gösterir.",
        "−1/2’nin sıfıra uzaklığı 1/2’dir; 3/4, diğer noktanın uzaklığıdır."
      ],
      "commonError": "Mutlak değeri, sayının kendi değeriyle aynı kabul etmek.",
      "check": "|−3/4|=3/4>|−1/2|=1/2 olsa da −3/4<−1/2’dir."
    },
    {
      "code": "Q18",
      "prompt": "−2/3 ile −3/5 arasına, uçlara eşit olmadan yerleşen sayı hangisidir?",
      "options": [
        "−19/30",
        "−20/30",
        "−18/30",
        "−21/30",
        "19/30"
      ],
      "knowledge": [
        "Kesin olarak arada olmak için sayı bir uçtan büyük, diğer uçtan küçük olmalıdır."
      ],
      "strategy": "İki ucu ortak 30 paydasına getir.",
      "steps": [
        "−2/3=−20/30; −3/5=−18/30.",
        "−20<−19<−18."
      ],
      "optionReasons": [
        "Seçilen rasyonel sayı iki uçtan da farklıdır ve iki eşitsizliği de sağlar.",
        "Bu, −2/3 uç noktasının kendisidir; kesin olarak arada değildir.",
        "Bu, −3/5 uç noktasının kendisidir; kesin olarak arada değildir.",
        "Bu sayı, sol uç olan −20/30’dan da küçüktür.",
        "Pozitif bir sayı, iki negatif uç arasında bulunamaz."
      ],
      "commonError": "Uç noktasını aradaki sayı diye vermek veya negatif işaretini unutmak.",
      "check": "Uçların ortalaması (−2/3−3/5)/2=−19/30’dur."
    },
    {
      "code": "Q19",
      "prompt": "0,375 sayısının sade kesir karşılığı nedir?",
      "options": [
        "3/8",
        "375/100",
        "3/80",
        "37/100",
        "375/999"
      ],
      "knowledge": [
        "Sonlu ondalık gösterimde virgülden sonraki basamak sayısı, paydadaki 10’un kuvvetini belirler."
      ],
      "strategy": "375 tane binde birlik parçayı kesir olarak yaz, sonra sadeleştir.",
      "steps": [
        "0,375=375/1000.",
        "Payı ve paydayı 125’e böl: 3/8."
      ],
      "optionReasons": [
        "Hem basamak değeri hem de ortak bölen korunmuştur.",
        "Virgülden sonra 3 basamak vardır; ilk payda 1000 olmalıdır.",
        "Doğru değer olan 3/8, fazladan bir kez 10’a bölünmüştür.",
        "Sayı 0,37 olarak alınmış; bir basamağı kullanılmamıştır.",
        "Bu seçenek, sonlu sayıyı devirli 375 bloğu olarak yorumlar."
      ],
      "commonError": "Sonlu ve devirli ondalık gösterimlerde kullanılan paydaları karıştırmak.",
      "check": "3/8=0,375’tir; 3×125=375 ve 8×125=1000 olur."
    },
    {
      "code": "Q20",
      "prompt": "Hangisi sonlu ondalık gösterim ölçütünü doğru anlatır?",
      "options": [
        "Önce kesir sadeleştirilir; pozitif paydada yalnız 2 ve 5 asal çarpanları kalır.",
        "Paydanın yazılı biçimi 10’un kuvveti değilse gösterim mutlaka devirlidir.",
        "Paydanın çift olması her zaman yeterlidir.",
        "Payın tek olması gösterimi devirli yapar.",
        "Sadeleştirmeden önce paydada 3 varsa gösterim mutlaka devirlidir."
      ],
      "knowledge": [
        "10’un kuvvetleri, 2 ve 5 asal çarpanlarından oluşur."
      ],
      "strategy": "Sadeleştirilmiş paydada başka bir asal çarpan kalıp kalmadığını denetle.",
      "steps": [
        "Sadeleştirilmiş paydada 2 ve 5 dışında bir asal kalırsa payda yalnız 10’un kuvvetine genişletilemez.",
        "Yalnız 2 ve 5 kalırsa eksik kuvvetler tamamlanarak sonlu sayıda ondalık basamak elde edilir."
      ],
      "optionReasons": [
        "Sadeleştirme şartı ile izin verilen asal çarpanlar birlikte korunmuştur.",
        "1/4=0,25 karşı örnektir; 4, yazıldığı biçimiyle 10’un kuvveti değildir.",
        "1/6, çift paydaya rağmen paydasında 3 asal çarpanı kaldığı için devirlidir.",
        "3/8=0,375 sonludur; paydaki 3 tektir.",
        "3/6=1/2 olur; 3 sadeleşip gider ve 0,5 sonludur."
      ],
      "commonError": "Paydanın ilk yazılışını, sadeleştirilmiş payda için geçerli ölçüt yerine kullanmak.",
      "check": "3/20=0,15; 1/6=0,1(6); 3/6=0,5."
    },
    {
      "code": "Q21",
      "prompt": "x=0,272727… gösteriminde 27 bloğu sonsuza dek yineleniyor. x kaçtır?",
      "options": [
        "3/11",
        "27/100",
        "27/90",
        "27/9",
        "11/3"
      ],
      "knowledge": [
        "Devir bloğu iki basamaklıysa 100x ile x’in ondalık kuyrukları aynı hizaya gelir."
      ],
      "strategy": "100x−x işlemini kur.",
      "steps": [
        "100x=27,2727…; x=0,2727….",
        "99x=27; x=27/99=3/11."
      ],
      "optionReasons": [
        "Aynı sonsuz kuyruk çıkarılmış ve geriye tam kısımlar kalmıştır.",
        "Bu, sonlu 0,27 sayısıdır; sonsuz kuyruğu içermez.",
        "90 paydası, tekrarlamayan bir ön basamağın bulunduğu dönüşümde ortaya çıkabilir; burada böyle bir basamak yoktur.",
        "İki basamaklı blok, bir basamaklıymış gibi dönüştürülmüştür; bu seçenek 3 verir.",
        "Doğru kesrin tersi 1’den büyüktür; verilen sayı ise 0 ile 1 arasındadır."
      ],
      "commonError": "Devirli bloğu, sonlu bir ondalık gösterim gibi yazmak.",
      "check": "3/11 için uzun bölme yapıldığında 27 bloğu tekrar eder."
    },
    {
      "code": "Q22",
      "prompt": "x=1,233333… gösteriminde yalnız 3 devrediyor. x’in sade kesri nedir?",
      "options": [
        "37/30",
        "122/99",
        "123/99",
        "123/100",
        "7/30"
      ],
      "knowledge": [
        "1,2(3) gösteriminde 2, tekrarlamayan ön basamaktır; 3 ise devir bloğudur."
      ],
      "strategy": "100x ve 10x ifadelerindeki aynı 3 kuyruğunu hizala.",
      "steps": [
        "100x=123,333…; 10x=12,333….",
        "90x=111; x=111/90=37/30."
      ],
      "optionReasons": [
        "Tekrarlamayan ön basamak ile devir bloğu ayrı tutulmuştur.",
        "Bu, 1,232323…=1,(23) sayısıdır; bu gösterimde 2 de devreder.",
        "Bu, 41/33=1,242424… sayısıdır; yinelenen kuyruk verilen 3 kuyruğu değildir.",
        "Bu, sonlu 1,23 sayısıdır.",
        "Bu, 1,23333… sayısının yalnız kesirli kısmıdır; tam 1 kullanılmamıştır."
      ],
      "commonError": "1,(23) ile 1,2(3) gösterimlerini aynı sayı sanmak.",
      "check": "37/30=1+7/30=1,233333…; 122/99 ve 123/99 farklı tekrarlar verir."
    },
    {
      "code": "Q23",
      "prompt": "Bir tanktaki suyun önce 1/4’ü, sonra kalanın 1/3’ü kullanılıyor; 40 L su kalıyor. Başlangıçta kaç L su vardır?",
      "options": [
        "80",
        "60",
        "40",
        "96",
        "160"
      ],
      "knowledge": [
        "“Kalanın” sözcüğü, sonraki kesrin uygulanacağı bütünün değiştiğini gösterir."
      ],
      "strategy": "Son kalan oranını (3/4)×(2/3) olarak kur.",
      "steps": [
        "Son kalan miktar x/2’dir.",
        "x/2=40 olduğundan x=80’dir."
      ],
      "optionReasons": [
        "Her kalan çarpanı, kendi adımının bütününe uygulanmıştır.",
        "40/(2/3)=60 yalnız ikinci kullanım öncesindeki miktarı verir; başlangıç miktarı değildir.",
        "Son kalan miktar başlangıç olarak alınmıştır; iki kullanımda da su azalmıştır.",
        "1−1/4−1/3=5/12 hesabı, ikinci 1/3 başlangıç bütününe ait olsaydı geçerli olurdu.",
        "Kalan miktar x/2 iken x/4 olarak alınmış olabilir."
      ],
      "commonError": "İkinci kesri, kalana değil başlangıç bütününe uygulamak.",
      "check": "80 → 60 → 40; miktarlar her adımda yerine konularak doğrulanır."
    },
    {
      "code": "Q24",
      "prompt": "Hacmi V olan bir karışımın 2/5’i A, 3/5’i B bileşenidir. Yalnız B’nin 1/3’ü çıkarılıp yerine eşit hacimde A ekleniyor; toplam hacim V korunuyor. Son A miktarı 700 mL ise V kaç mL’dir?",
      "options": [
        "3500/3",
        "1750",
        "700",
        "1050",
        "2100"
      ],
      "knowledge": [
        "Çıkarılan miktar B’nin 1/3’üdür; toplam karışımın 1/3’ü değildir.",
        "Eşit hacimde ekleme, toplam V hacmini korur."
      ],
      "strategy": "Son A miktarını, başlangıçtaki A miktarı ile yerine eklenen V/5’in toplamı olarak yaz.",
      "steps": [
        "Çıkarılan B=(1/3)×(3V/5)=V/5.",
        "Son A=2V/5+V/5=3V/5=700.",
        "V=700×5/3=3500/3 mL."
      ],
      "optionReasons": [
        "Bir bileşenden çıkarılan hacim ile toplam hacim doğru ayrılmıştır.",
        "Bu, 700/(2/5) hesabıdır; sonradan eklenen A hesaba katılmamıştır.",
        "Son A miktarı, karışımın toplam hacmi olarak alınmıştır.",
        "Bu seçenek, son A oranını 2/3 almakla elde edilir; doğru oran 3/5’tir.",
        "Son A oranı 1/3 değildir; 2/5+(1/3)×(3/5)=3/5’tir."
      ],
      "commonError": "Karışımın tamamının 1/3’ünün çıkarıldığını varsaymak.",
      "check": "Son B=2V/5=1400/3 mL; 700+1400/3=3500/3 mL."
    },
    {
      "code": "Q25",
      "prompt": "a ve b pozitif tam sayılardır; a/b=3/5 ve a+b=40’tır. Sıralı (a, b) ikilisi nedir?",
      "options": [
        "(15,25)",
        "(3,5)",
        "(25,15)",
        "(12,28)",
        "(20,20)"
      ],
      "knowledge": [
        "3 ve 5 aralarında asal olduğundan a=3k, b=5k biçiminde yazılır."
      ],
      "strategy": "Toplam koşulundan her iki ifadede de kullanılan aynı k değerini bul.",
      "steps": [
        "3k+5k=40; k=5.",
        "a=15, b=25."
      ],
      "optionReasons": [
        "Oran ve toplam koşulları aynı ikili için birlikte sağlanır.",
        "Oran uygundur, fakat toplam 8’dir; 40 değildir.",
        "Toplam uygundur, fakat oran 5/3’tür; 3/5 değildir.",
        "Toplam 40’tır, fakat oran 3/7’dir; 3/5 değildir.",
        "Toplam 40’tır, fakat oran 1’dir."
      ],
      "commonError": "Sade kesirdeki pay ile paydayı, a ve b’nin alabileceği tek değerler sanmak.",
      "check": "15/25=3/5; 15+25=40."
    },
    {
      "code": "Q26",
      "prompt": "a ve b pozitif tam sayılardır ve aralarında asaldır. a/b=3/5 ve a+b=40 koşulları için hangisi doğrudur?",
      "options": [
        "Bu koşulları birlikte sağlayan ikili yoktur.",
        "a=15,b=25",
        "a=3,b=5",
        "a=5,b=3",
        "a=1,b=39"
      ],
      "knowledge": [
        "Payda pozitif tutulduğunda, aralarında asal pay ve paydayla yazılan sade gösterim tektir."
      ],
      "strategy": "Önce oranın aralarında asal gösterimini, sonra toplam koşulunu denetle.",
      "steps": [
        "a=3k, b=5k.",
        "Aralarında asal olmaları için k=1 olmalıdır; toplam 8 olur.",
        "8≠40 olduğundan koşullar birlikte sağlanamaz."
      ],
      "optionReasons": [
        "Bütün koşullar aynı ikili üzerinde birlikte denetlenmiştir.",
        "Oran ve toplam uygundur, fakat EBOB(15,25)=5 olduğundan sayılar aralarında asal değildir.",
        "Aralarında asal olma ve oran koşulları uygundur, fakat toplam 8’dir.",
        "Oran 5/3 ve toplam 8 olur; bu iki koşul da sağlanmaz.",
        "Toplam uygundur, fakat 1/39≠3/5’tir."
      ],
      "commonError": "Bir koşulu sağlayan cevabı, diğer koşulları denetlemeden kabul etmek.",
      "check": "15 ve 25’in ortak 5 böleni vardır; 3 ile 5’in toplamı 40 olmaz."
    },
    {
      "code": "Q27",
      "prompt": "Bir miktarın önce 1/5’i, sonra kalanın 1/4’ü kullanılıyor; 18 kalıyor. Başlangıç miktarı nedir?",
      "options": [
        "30",
        "24",
        "18",
        "40",
        "60"
      ],
      "knowledge": [
        "Kalan oranlar 4/5 ve 3/4’tür; bu oranlar art arda uygulanır."
      ],
      "strategy": "(1−1/4)×(1−1/5)x=18 modelini kesirlerle tamamla.",
      "steps": [
        "(3/4)×(4/5)x=3x/5=18.",
        "x=18×5/3=30."
      ],
      "optionReasons": [
        "İkinci adımın bütünü, ilk kullanımdan kalan miktar olarak alınmıştır.",
        "Bu, ikinci kullanım öncesindeki miktardır; başlangıç değildir.",
        "Son kalan miktar, başlangıç yerine kullanılmıştır.",
        "Kalan çarpanı 3/5 olmalıdır; başka bir oran kullanılmıştır.",
        "Kalan oranı yarıya indirilmiş olabilir; 30 → 24 → 18 kontrolü doğru başlangıcı doğrular."
      ],
      "commonError": "Önceki bir örneğin miktarını, yeni veriye göre hesaplamadan kullanmak.",
      "check": "30−6=24; 24−6=18."
    },
    {
      "code": "Q28",
      "prompt": "5/6−3/4+1/2 işlemi kaçtır?",
      "options": [
        "7/12",
        "1/12",
        "5/12",
        "−7/12",
        "4/3"
      ],
      "knowledge": [
        "Ortak payda olarak 12 kullanılabilir."
      ],
      "strategy": "Ortak paydadaki payları 10, −9 ve 6 olarak yaz.",
      "steps": [
        "5/6=10/12; 3/4=9/12; 1/2=6/12.",
        "10−9+6=7; sonuç 7/12’dir."
      ],
      "optionReasons": [
        "Üç terimin tamamı, işaretleriyle birlikte korunmuştur.",
        "Son 1/2 terimi unutulursa bu sonuç çıkar; doğru pay toplamı 10−9+6=7’dir.",
        "Ortak payda 12 iken paylar yanlış birleştirilmiştir; doğru pay 7’dir.",
        "Doğru payın işareti eksiye çevrilmiştir.",
        "Bu, 5/6+1/2 toplamıdır; 3/4 çıkarılmamıştır."
      ],
      "commonError": "Kolay toplanan grubu hesapladıktan sonra çıkarma işlemini tamamlamayı unutmak.",
      "check": "4/3−3/4=16/12−9/12=7/12."
    },
    {
      "code": "Q29",
      "prompt": "(9/14)/(3/7) işlemi kaçtır?",
      "options": [
        "3/2",
        "27/98",
        "2/3",
        "3/7",
        "0"
      ],
      "knowledge": [
        "Yalnız bölen, yani ikinci kesir ters çevrilir."
      ],
      "strategy": "9/14’ü 7/3 ile çarp.",
      "steps": [
        "(9/14)×(7/3)=63/42.",
        "63/42=3/2."
      ],
      "optionReasons": [
        "Bölme çarpmaya dönüştürülürken işlemin yönü korunmuştur.",
        "Bölme yerine iki kesir doğrudan çarpılmıştır.",
        "Doğru bölümün tersi alınmıştır; ilk kesir ters çevrilmiş olabilir.",
        "Bölen aynen tekrar edilmiştir; kaç kat olduğu hesaplanmamıştır.",
        "Bölünen sıfır değildir; tanımlı bölümün sonucu 0 olamaz."
      ],
      "commonError": "Bölme yerine, böleni ters çevirmeden çarpmak.",
      "check": "(3/2)×(3/7)=9/14."
    },
    {
      "code": "Q30",
      "prompt": "19/20 ve 23/24 için doğru karşılaştırma hangisidir?",
      "options": [
        "23/24>19/20",
        "23/24<19/20",
        "23/24=19/20",
        "19/20>1",
        "23/24<0"
      ],
      "knowledge": [
        "Eksikler 1/20 ve 1/24’tür; aynı bütüne göre küçük eksik, büyük kesri gösterir."
      ],
      "strategy": "Eksik yöntemini ve çapraz çarpım kontrolünü birlikte kullan.",
      "steps": [
        "1/24<1/20 olduğundan 23/24 daha büyüktür.",
        "19×24=456<460=23×20."
      ],
      "optionReasons": [
        "İki ayrı gerekçe aynı karşılaştırma yönünü doğrular.",
        "Ortak paydada 115/120>114/120’dir; bu seçenekteki yön terstir.",
        "Çapraz çarpımlar 460 ve 456’dır; eşit değildir.",
        "Pozitif pay 19, payda 20’den küçük olduğundan bu sayı 1’den küçüktür.",
        "Her iki sayı da pozitiftir; eksi işareti yoktur."
      ],
      "commonError": "Daha küçük eksiğin neden daha büyük doluluk gösterdiğini ters yorumlamak.",
      "check": "23/24−19/20=1/120>0’dır."
    },
    {
      "code": "Q31",
      "prompt": "−7/10 ile −2/3 arasına, uçlara eşit olmadan yerleşen sayı hangisidir?",
      "options": [
        "−41/60",
        "−42/60",
        "−40/60",
        "−43/60",
        "41/60"
      ],
      "knowledge": [
        "Payda pozitif ve ortak olduğunda işaretli payları karşılaştır."
      ],
      "strategy": "İki ucu 60 paydasına getir.",
      "steps": [
        "−7/10=−42/60; −2/3=−40/60.",
        "−42<−41<−40."
      ],
      "optionReasons": [
        "Seçilen sayı iki uçtan da farklıdır ve iki eşitsizliği de sağlar.",
        "Bu, −7/10 sol ucunun kendisidir; kesin olarak arada değildir.",
        "Bu, −2/3 sağ ucunun kendisidir; kesin olarak arada değildir.",
        "Bu sayı, sol ucun da solundadır.",
        "İki negatif sayı arasında pozitif bir sayı bulunmaz."
      ],
      "commonError": "Bir uç noktasında olmakla kesin olarak arada olmayı karıştırmak.",
      "check": "−41/60, iki ucun ortalamasıdır."
    },
    {
      "code": "Q32",
      "prompt": "Bir miktarın önce 1/3’ü, sonra kalanın 1/4’ü kullanılıyor; 15 kalıyor. Başlangıç miktarı nedir?",
      "options": [
        "30",
        "20",
        "15",
        "36",
        "45"
      ],
      "knowledge": [
        "Son kalan miktar (2/3)×(3/4)x=x/2’dir."
      ],
      "strategy": "İki kalan oranını çarp, sonra son miktarı 15’e eşitle.",
      "steps": [
        "x/2=15.",
        "x=30."
      ],
      "optionReasons": [
        "İlk kullanım başlangıçtan, ikinci kullanım ise ilk adımdan kalan miktardan hesaplanmıştır.",
        "İlk azalmadan sonra 20 kalır; bu, başlangıç miktarı değildir.",
        "Son kalan miktar, başlangıç olarak alınmıştır.",
        "1−1/3−1/4=5/12 modeli, ikinci kullanım ilk bütüne ait olduğunda kullanılır.",
        "İlk kullanılan 1/3, kalan oranı gibi alınmıştır; ikinci kullanım da hesaba katılmalıdır."
      ],
      "commonError": "İki kesri de aynı başlangıç bütününe aitmiş gibi toplamak.",
      "check": "30 → 20 → 15."
    },
    {
      "code": "Q33",
      "prompt": "0,454545… gösteriminde 45 bloğu sonsuza dek tekrar ediyor. Bu sayıdan sonlu 0,45 çıkarıldığında fark nedir?",
      "options": [
        "1/220",
        "0",
        "−1/220",
        "1/20",
        "1/11"
      ],
      "knowledge": [
        "0,(45)=5/11; 0,45=9/20."
      ],
      "strategy": "220 ortak paydasını kullan.",
      "steps": [
        "5/11=100/220; 9/20=99/220.",
        "Fark 1/220’dir."
      ],
      "optionReasons": [
        "Tekrarlayan ve sonlu gösterimler ayrı değerler olarak kesre çevrilmiştir.",
        "Bir gösterim tekrarlayan, diğeri sonludur; yakın görünmeleri tam olarak eşit olduklarını göstermez.",
        "Farkın işareti ters alınmıştır; 0,(45)>0,45’tir.",
        "Doğru fark (100−99)/220’dir; 11/220 değildir.",
        "Fark yerine tekrarlayan sayının bir parçası alınmıştır; 5/11−9/20=1/220’dir."
      ],
      "commonError": "Tekrarlı gösterimi iki basamakta kesip sonlu sayıyla aynı kabul etmek.",
      "check": "0,45+1/220=5/11."
    },
    {
      "code": "Q34",
      "prompt": "a ve b pozitif tam sayılardır; a/b=4/7 ve a+b=55’tir. Sıralı (a, b) ikilisi nedir?",
      "options": [
        "(20,35)",
        "(4,7)",
        "(35,20)",
        "(22,33)",
        "(25,30)"
      ],
      "knowledge": [
        "4 ve 7 aralarında asal olduğundan a=4k, b=7k biçiminde yazılır."
      ],
      "strategy": "Toplam koşulundan 11k=55 eşitliğini kur.",
      "steps": [
        "k=5.",
        "a=20; b=35."
      ],
      "optionReasons": [
        "Hem oran hem de toplam koşulu sayısal olarak denetlenmiştir.",
        "Oran uygundur, fakat toplam 11’dir; 55 değildir.",
        "Toplam uygundur, fakat oran 7/4 olur.",
        "Toplam 55’tir, fakat oran 2/3’tür; 4/7 değildir.",
        "Toplam 55’tir, fakat oran 5/6’dır."
      ],
      "commonError": "Sade oranı, verilen a ve b’nin tek olası değerleri sanmak.",
      "check": "20/35=4/7; 20+35=55."
    },
    {
      "code": "Q35",
      "prompt": "Aynı kap, boşken 120 g, tamamen sıvıyla doluyken 360 g ve kısmen doluyken 270 g geliyor. Her tartımda aynı sıvı kullanılıyor ve yoğunluk değişmiyor. Doluluk oranı nedir?",
      "options": [
        "5/8",
        "3/4",
        "1/2",
        "8/5",
        "5/12"
      ],
      "knowledge": [
        "Boş, tam dolu ve kısmen dolu durumların hepsinde aynı kap tartılıyor.",
        "Aynı sıvı ve aynı yoğunluk için hacim oranı, sıvı kütlelerinin oranına eşittir."
      ],
      "strategy": "Önce dolu ve kısmi tartımlardan boş kabın 120 g kütlesini çıkar.",
      "steps": [
        "Tam dolu durumdaki sıvı kütlesi=360−120=240 g.",
        "Kısmi durumdaki sıvı kütlesi=270−120=150 g.",
        "150/240=5/8."
      ],
      "optionReasons": [
        "Oranın hem payında hem paydasında yalnız sıvı kütleleri karşılaştırılmıştır.",
        "270/360=3/4 oranı kabın kütlesini de içerir; sıvının doluluk oranını vermez.",
        "Sıvı kütleleri 150 ve 240 olduğundan oran 1/2 değildir.",
        "Tam ve kısmi sıvı kütlelerinin bölünme yönü ters çevrilmiştir; doluluk 1’i aşmaz.",
        "150/360=5/12 olur; 360 g kap dâhil tartımdır. Doğru sıvı paydası 360−120=240 g olmalıdır."
      ],
      "commonError": "Kap dâhil tartımları doğrudan sıvının doluluk oranında kullanmak.",
      "check": "240×5/8+120=270 g."
    },
    {
      "code": "Q36",
      "prompt": "Doluluk oranları 18/25 ve 29/40 olan aynı büyüklükteki iki kaptan hangisi daha doludur?",
      "options": [
        "29/40 dolu olan kap",
        "18/25 dolu olan kap",
        "İkisi eşit doludur",
        "İkisi de tamamen doludur",
        "Veri yetmez; oranlar karşılaştırılamaz"
      ],
      "knowledge": [
        "Aynı büyüklükteki bütünlerde büyük oran, daha fazla doluluk gösterir."
      ],
      "strategy": "Doluluk oranlarını ve boşlukları 200 paydasına taşı.",
      "steps": [
        "18/25=144/200; 29/40=145/200.",
        "Boşluklar 56/200 ve 55/200’dür; ikincinin eksiği daha azdır."
      ],
      "optionReasons": [
        "Hem oran hem de eksik kontrolü, ikinci kabın daha dolu olduğunu gösterir.",
        "144/200<145/200 olduğundan bu kaptaki doluluk daha azdır.",
        "Oranlar 200 paydasında 144 ve 145 parçadır; eşit değildir.",
        "Her iki oranda da pay, pozitif paydadan küçüktür; kaplar tam dolu değildir.",
        "Kaplar aynı büyüklükte verildiğinden oranlar aynı büyüklükte bir bütüne göre karşılaştırılabilir."
      ],
      "commonError": "Eksiklerin payları olan 7 ve 11’i görmeden yalnız paydaya bakmak.",
      "check": "29/40−18/25=1/200."
    },
    {
      "code": "Q37",
      "prompt": "İki ucu açık ve birbirine bağlı olmayan tek parça ip 3/4 m uzunluğunda. Üst üste konmadan ayrı kesimlerle tam 1/8 m parçalara ayrılıyor. Kaç parça ve kaç kesim gerekir?",
      "options": [
        "6 parça; 5 kesim",
        "6 parça; 6 kesim",
        "5 parça; 6 kesim",
        "3 parça; 2 kesim",
        "8 parça; 7 kesim"
      ],
      "knowledge": [
        "Parça sayısı, toplam uzunluğun bir parçanın uzunluğuna bölümüdür.",
        "Tek ipte, ayrı kesim sayısı parça sayısından bir eksiktir."
      ],
      "strategy": "Önce uzunluğu 8 paydasındaki birimlerle say, sonra parçalar arasındaki kesim yerlerini belirle.",
      "steps": [
        "(3/4)/(1/8)=6 parça.",
        "6−1=5 ayrı kesim."
      ],
      "optionReasons": [
        "Uzunluk bölmesiyle bulunan parça sayısı ile kesim yerlerinin sayısı ayrı tutulmuştur.",
        "İpin iki ucu zaten vardır; altı parça oluşturmak için beş iç sınır kesilir.",
        "Toplamda altı tane 1/8’lik birim vardır; parça ve kesim sayıları yer değiştirilmez.",
        "3/4=6/8 olduğundan ipi yalnız üç parçaya ayırmak, her parçayı 1/4 yapar.",
        "1 metrede sekiz tane 1/8 vardır; verilen ip 1 metre değil, 3/4 metredir."
      ],
      "commonError": "Kesim sayısıyla parça sayısını aynı kabul etmek.",
      "check": "6×1/8=3/4 m’dir; parçaların üst üste aynı anda kesildiği bir durum verilmemiştir."
    },
    {
      "code": "Q38",
      "prompt": "“2/3+1/6=3/9” çözümünün ilk hatası ve yeni 3/5+1/10 işleminin doğru sonucu hangi seçenektedir?",
      "options": [
        "Paydalar toplanmış; yeni sonuç 7/10.",
        "Yalnız pay hatası; yeni sonuç 4/15.",
        "Kesirler ters çevrilmeli; yeni sonuç 10/7.",
        "İlk çözüm doğru; yeni sonuç 4/15.",
        "Paydalar toplanmış; yeni sonuç 3/50."
      ],
      "knowledge": [
        "Toplamada ortak payda gerekir; paydalar toplanmaz."
      ],
      "strategy": "İlk hatayı ilgili kuralla açıkla, sonra yeni işlemi doğru kuralla çöz.",
      "steps": [
        "2/3=4/6; ilk işlemin doğru toplamı 5/6’dır.",
        "3/5=6/10; yeni toplam 7/10’dur."
      ],
      "optionReasons": [
        "Hem hata tanısı hem de yeni işlemin sayısal sonucu doğrudur.",
        "İlk hata, parçaların büyüklüklerini eşitlemeden toplamaktır; 3/5+1/10=6/10+1/10 yazılmalıdır.",
        "Kesir toplamada kesirlerin tersini alma kuralı yoktur.",
        "2/3+1/6=5/6’dır; 3/9 değildir.",
        "İlk hata doğru adlandırılmış, fakat yeni işlemde toplama yerine çarpma yapılmıştır."
      ],
      "commonError": "Hata tanısını doğru bulup yeni işlemin sonucunu denetlememek.",
      "check": "7/10−1/10=3/5."
    },
    {
      "code": "Q39",
      "prompt": "“(1/2)/(3/4)=3/8” satırındaki hatayı onardıktan sonra (2/5)/(4/3) işleminin sonucu nedir?",
      "options": [
        "3/10",
        "8/15",
        "10/3",
        "2/5",
        "6/5"
      ],
      "knowledge": [
        "İlk satırda bölme yerine yanlışlıkla çarpma yapılmıştır.",
        "Yeni soruda bölen 4/3 ters çevrilerek 3/4 yapılır."
      ],
      "strategy": "Yalnız ikinci kesrin tersini kullan.",
      "steps": [
        "(2/5)/(4/3)=(2/5)×(3/4).",
        "6/20=3/10."
      ],
      "optionReasons": [
        "Bölme kuralı yeni verilere de doğru uygulanmıştır.",
        "Bölme yerine (2/5)×(4/3) yapılmıştır; önceki hata tekrarlanır.",
        "Doğru bölümün tersi alınmıştır.",
        "Bölen 4/3, çarpmadaki etkisiz eleman olan 1 değildir; ilk kesir aynı kalmaz.",
        "Ters çevrilen 3/4 kesrinin 4 paydası kullanılmamıştır."
      ],
      "commonError": "Hata onarımını okuduktan sonra aynı doğrudan çarpma işlemini tekrarlamak.",
      "check": "(3/10)×(4/3)=2/5."
    },
    {
      "code": "Q40",
      "prompt": "−5/6 ve −7/8 için doğru karşılaştırma hangisidir?",
      "options": [
        "−5/6>−7/8",
        "−5/6<−7/8",
        "−5/6=−7/8",
        "−5/6>0",
        "|−5/6|>|−7/8|"
      ],
      "knowledge": [
        "Negatif sayılar arasında sıfıra daha yakın olan daha büyüktür."
      ],
      "strategy": "İşaretli payları 24 ortak paydasında karşılaştır.",
      "steps": [
        "−5/6=−20/24; −7/8=−21/24.",
        "−20>−21."
      ],
      "optionReasons": [
        "Uzaklık ile işaretli sayı değeri birbirinden ayrılarak sıralama yapılmıştır.",
        "−20/24>−21/24 olduğundan bu seçenekteki yön terstir.",
        "Mutlak değerler için çapraz çarpımlar 40 ve 42’dir; eşit değildir.",
        "Tek eksi işareti, sayının negatif olduğunu gösterir; sayı pozitif değildir.",
        "Uzaklıklar 20/24<21/24 olduğundan bu iddia da yanlıştır."
      ],
      "commonError": "Pozitif uzaklıkların karşılaştırma yönünü negatif sayılara aynen taşımak.",
      "check": "−5/6−(−7/8)=1/24>0’dır."
    },
    {
      "code": "Q41",
      "prompt": "Başlangıç miktarı 24 birimdir. Önce 1/2’si, sonra kalanın 1/3’ü kullanılıyor. Kalan miktar nedir?",
      "options": [
        "8",
        "4",
        "12",
        "16",
        "6"
      ],
      "knowledge": [
        "İlk kullanımdan sonra 12 birim kalır; ikinci kullanımın bütünü bu 12 birimdir."
      ],
      "strategy": "Önce 12’yi bul, sonra 12’nin 1/3’ünü çıkar.",
      "steps": [
        "24−12=12.",
        "12−4=8."
      ],
      "optionReasons": [
        "İkinci kesir, yeni bütün olan kalan miktara uygulanmıştır.",
        "İkinci kullanım başlangıcın 1/3’ü olsaydı bu sonuç doğru olurdu; metinde “kalanın” deniyor.",
        "Yalnız ilk kullanım yapılmış, ikinci kullanım çıkarılmamıştır.",
        "İkinci adımda kullanılan miktar, çıkarılmak yerine kalana eklenmiş olabilir.",
        "İkinci adımın kalan oranı 2/3 yerine 1/2 olarak kullanılmıştır."
      ],
      "commonError": "İkinci kullanılan 4’ü son kalan sanmak veya ikinci kullanım için 24’ün 1/3’ünü almak.",
      "check": "(1/2)×(2/3)×24=8."
    },
    {
      "code": "Q42",
      "prompt": "Başlangıç miktarı 24 birimdir. İlk kullanım başlangıcın 1/2’si, ikinci kullanım da başlangıcın 1/3’üdür. İki kullanım da başlangıç miktarına göre tanımlanıyor. Ne kadar kalır?",
      "options": [
        "4",
        "8",
        "12",
        "20",
        "0"
      ],
      "knowledge": [
        "Aynı başlangıç bütününe ait kesirler, kullanılan miktarı bulmak için toplanabilir."
      ],
      "strategy": "Başlangıca ait iki kesri ayrı ayrı 24 ile çarp.",
      "steps": [
        "İlk kullanılan miktar 12, ikinci kullanılan miktar 8’dir.",
        "24−12−8=4."
      ],
      "optionReasons": [
        "Metindeki koşul korunduğu için art arda kalan çarpanları kullanılmamıştır.",
        "İkinci kullanım “kalanın 1/3’ü” olsaydı bu sonuç çıkardı; verilen koşul farklıdır.",
        "İkinci kullanımda harcanan 8 birim çıkarılmamıştır.",
        "Yalnız 1/6 oranı kullanılmış kabul edilmiş olabilir; kullanılan toplam oran 5/6’dır.",
        "1/2+1/3=5/6’dır; tam 1 değildir."
      ],
      "commonError": "İki aşamalı her metne, bütünün ne olduğunu denetlemeden aynı kalan çarpımı yöntemini uygulamak.",
      "check": "Kalan oran 1−1/2−1/3=1/6’dır; 24/6=4 bulunur."
    },
    {
      "code": "Q43",
      "prompt": "Bir şişedeki 1/2 L suya 1/4 L su ekleniyor. Toplam ne kadar su olur?",
      "options": [
        "3/4 L",
        "1/8 L",
        "2/6 L",
        "1/4 L",
        "3 L"
      ],
      "knowledge": [
        "Aynı hacim birimiyle verilen miktarlar toplanacaktır."
      ],
      "strategy": "Yarım litreyi iki çeyrek litre olarak düşün.",
      "steps": [
        "1/2 L=2/4 L.",
        "2/4 L+1/4 L=3/4 L."
      ],
      "optionReasons": [
        "İşlemin toplama olduğu ve birimin litre olduğu korunmuştur.",
        "Bu, 1/2×1/4 çarpımıdır; ekleme işleminin yerine geçmez.",
        "Paylar ve paydalar birlikte toplanmıştır.",
        "Yalnız eklenen miktar verilmiş; başlangıçtaki yarım litre kullanılmamıştır.",
        "Parçaların hangi büyüklükte olduğunu belirten payda kullanılmamıştır."
      ],
      "commonError": "Kesir görünce her problemde aynı işlemi yapmak.",
      "check": "Toplam, ayrı ayrı verilen iki pozitif miktarın her birinden büyüktür."
    },
    {
      "code": "Q44",
      "prompt": "(2+4)/2 işleminin değeri nedir?",
      "options": [
        "3",
        "5",
        "1",
        "6",
        "2"
      ],
      "knowledge": [
        "Kesir çizgisi, paydaki toplamın tamamını paydaya böler."
      ],
      "strategy": "Önce paydaki toplamı bulabilir veya toplamın her terimini paydaya bölebilirsin.",
      "steps": [
        "(2+4)/2=6/2.",
        "Diğer yol: 2/2+4/2=1+2=3."
      ],
      "optionReasons": [
        "Bölme işlemi toplamın tamamına uygulanmıştır.",
        "Yalnız 2 terimi bölünmüş, 4 bölünmemiştir; toplama terimleri bu şekilde sadeleştirilemez.",
        "Paydaki toplamın +4 terimi kullanılmamıştır.",
        "Pay toplanmış, fakat sonuç paydaya bölünmemiştir.",
        "Pay 6’dır; 6/2=3 olur, 2 değil."
      ],
      "commonError": "Toplamın yalnız bir terimini paydayla sadeleştirip diğer terimi olduğu gibi bırakmak.",
      "check": "3×2=6=2+4."
    },
    {
      "code": "Q45",
      "prompt": "2/3 L miktarını, büyüklüğü 4/5 L olan bir ölçü birimiyle ölçüyorsun. Bu miktar ölçü biriminin kaç katıdır?",
      "options": [
        "5/6",
        "8/15",
        "6/5",
        "1",
        "0"
      ],
      "knowledge": [
        "Miktarı birimin büyüklüğüne bölmek, kaç birim olduğunu verir."
      ],
      "strategy": "2/3’ü 4/5’e böl.",
      "steps": [
        "(2/3)/(4/5)=(2/3)×(5/4).",
        "10/12=5/6 birim."
      ],
      "optionReasons": [
        "Bölmenin yönü ve birimin kesirli katı olabileceği korunmuştur.",
        "İki miktar çarpılmıştır; “kaç kat” sorusu için oran bulunmalıdır.",
        "Birim ile miktarın bölünme yönü ters çevrilmiştir.",
        "2/3 L ile 4/5 L aynı miktar değildir.",
        "Tam kap sayısı sorulmuyor; birimin kesirli katı anlamlı bir sonuçtur."
      ],
      "commonError": "Kesirli kat sorusunu, tam nesne sayısı isteniyormuş gibi yuvarlamak.",
      "check": "(5/6)×(4/5) L=2/3 L."
    },
    {
      "code": "Q46",
      "prompt": "9/10 ile 14/15 arasında büyük olan sayı ve doğru eksik gerekçesi hangisidir?",
      "options": [
        "14/15; 1/15 eksiği, 1/10’dan küçüktür.",
        "9/10; 10 paydası daha küçüktür.",
        "9/10; 1/10 eksiği daha büyüktür.",
        "Eşittir; eksiklerin payı 1’dir.",
        "14/15; 1/15 eksiği daha büyüktür."
      ],
      "knowledge": [
        "Bir bütüne yakın kesirleri karşılaştırırken bütüne kalan eksikleri dikkatle karşılaştır."
      ],
      "strategy": "Her iki kesrin bütüne kalan eksiğini yaz.",
      "steps": [
        "1−9/10=1/10; 1−14/15=1/15.",
        "Daha küçük eksik 14/15’tedir; bu sayı daha büyüktür."
      ],
      "optionReasons": [
        "Hem sonuç hem de yöntemin koşuluna uygun gerekçe doğrudur.",
        "Paylar 9 ve 14 olarak farklıdır; yalnız paydaya bakmak geçerli değildir.",
        "Daha büyük eksik, daha büyük asıl sayı demek değildir.",
        "Pozitif paydalar 10 ve 15 olarak farklıdır; eksikler aynı değildir.",
        "Sonuç doğru, fakat gerekçe terstir; 1/15<1/10’dur."
      ],
      "commonError": "Doğru karşılaştırma ile bu karşılaştırmanın gerekçesini ayrı ayrı denetlememek.",
      "check": "14/15−9/10=28/30−27/30=1/30>0."
    },
    {
      "code": "Q47",
      "prompt": "Bir stokun önce 1/3’ü, sonra kalanın 1/2’si kullanılıyor. Başlangıç miktarının hangi kesri kalır?",
      "options": [
        "1/3",
        "1/6",
        "1/2",
        "2/3",
        "1/12"
      ],
      "knowledge": [
        "İlk adımda 2/3 kalır; ikinci adımda bu kalan bütünün 1/2’si kalır."
      ],
      "strategy": "Art arda kalan miktarları gösteren çarpanları çarp.",
      "steps": [
        "(1−1/3)×(1−1/2)=(2/3)×(1/2).",
        "2/6=1/3."
      ],
      "optionReasons": [
        "“Kalanın” sözcüğünün modeldeki etkisi korunmuştur.",
        "İkinci kullanım başlangıcın 1/2’si olsaydı 1−1/3−1/2 hesabı kullanılırdı.",
        "Başlangıçtaki 1/3 kullanım hesaba katılmamıştır.",
        "Yalnız ilk adımın kalan oranı verilmiş; ikinci kullanım hesaba katılmamıştır.",
        "Kalan çarpanları 2/3 ve 1/2’dir; çarpımları 1/3’tür."
      ],
      "commonError": "İki kullanımı aynı başlangıç bütününe göre hesaplamak.",
      "check": "Başlangıç 12 ise önce 8, sonra 4 kalır; 4/12=1/3’tür."
    },
    {
      "code": "Q48",
      "prompt": "0,121212… gösteriminde 12 bloğu sonsuza dek yineleniyor. Bu sayı ile sonlu 0,12 için sırasıyla hangi kesir çifti doğrudur?",
      "options": [
        "(4/33,3/25)",
        "(3/25,4/33)",
        "(12/99,12/99)",
        "(12/100,12/100)",
        "(12/9,12/10)"
      ],
      "knowledge": [
        "Devirli sayı için 99x=12 yazılır; sonlu sayı için ise x o sayıyı göstermek üzere 100x=12 yazılır."
      ],
      "strategy": "Devirli ve sonlu gösterimleri ayrı ayrı kesre çevir.",
      "steps": [
        "0,(12)=12/99=4/33.",
        "0,12=12/100=3/25."
      ],
      "optionReasons": [
        "Devirli blok ile sonlu basamak değeri ayrı tutulmuştur.",
        "Devirli ve sonlu gösterimlerin karşılıkları yer değiştirmiştir.",
        "İlk sayı doğru, fakat sonlu ikinci sayı 12/100 olmalıdır.",
        "İkinci sayı doğru, fakat devirli ilk sayı 12/99 olmalıdır.",
        "Basamak sayısı veya devir bloğunun uzunluğu doğru kullanılmamıştır."
      ],
      "commonError": "Üç noktanın burada sonsuz tekrarı belirttiğini göz ardı etmek.",
      "check": "4/33−3/25=(100−99)/825=1/825>0."
    }
  ],
  "recall": [
    {
      "prompt": "Rasyonel tanımındaki iki sayı hangi kümede, hangi sayı sıfır olamaz?",
      "answer": "a,b tam sayıdır; a/b gösteriminde b≠0 olmalıdır. Tam sayılar da a/1 biçiminde rasyoneldir."
    },
    {
      "prompt": "6/8’i 3/4 yaparken neden ikisi de 2’ye bölünür?",
      "answer": "Aynı sıfır olmayan çarpanı pay ve paydadan kaldırmak oranı korur. Yalnız payı bölmek değeri yarıya indirir."
    },
    {
      "prompt": "0/7, 7/0 ve 0/0 hangi durumdadır?",
      "answer": "0/7=0 geçerlidir. 7/0 ve 0/0 tanımsızdır; 0/0’a 1 atanmaz."
    },
    {
      "prompt": "−(2+1/3) ile −2+1/3 aynı mı?",
      "answer": "İlki −7/3, ikincisi −5/3’tür. Eksi işaretinin kapsadığı grubu parantezle koru."
    },
    {
      "prompt": "Toplamda ortak payda, çarpımda ortak çarpan ayrımı nedir?",
      "answer": "Toplam eş boyda parçaları birleştirir. Çarpımda pay ve paydadaki bütün ortak çarpan sadeleşebilir. (2+4)/2=1+2=3; 1+4 değil."
    },
    {
      "prompt": "Bir kesre bölerken hangi kesir ters döner? Hangi sıfır koşulu eklenir?",
      "answer": "İkinci, yani bölen kesir ters döner. Paydalar dışında bölenin payı da sıfır olamaz; bölen kesir sıfır olamaz."
    },
    {
      "prompt": "Çapraz çarpımda yönü neden koruyoruz?",
      "answer": "Paydalar önce pozitif yazılır. Eşitsizlik pozitif ortak çarpımla çarpıldığı için yön değişmez."
    },
    {
      "prompt": "1’e eksiklerin yalnız paydalarına ne zaman bakabilirsin?",
      "answer": "Eksiklerin pozitif payları aynıysa. 3/16 ile 3/20 bu koşula uyar; 3/8 ile 5/12 uymaz."
    },
    {
      "prompt": "−3/4 daha uzak olduğu hâlde −1/2 neden daha büyüktür?",
      "answer": "İşaretli sıralama sayı doğrusunda sağa gider. −1/2=−2/4, −3/4’ün sağındadır; mutlak değer sıralaması ayrı sorudur."
    },
    {
      "prompt": "İki rasyonelin ortalaması ne zaman kesin aradadır?",
      "answer": "Uçlar farklıysa. Eşit uçların ortalaması yine aynı uçtur; kesin arada değildir."
    },
    {
      "prompt": "Sonlu ondalık ölçütünde önce ne yapılır?",
      "answer": "Kesir sadeleştirilir. Pozitif paydada yalnız 2 ve 5 asal çarpanı kalıyorsa gösterim sonludur. 1/4=0,25 bunun örneğidir."
    },
    {
      "prompt": "1,2(3), 1,(23) ve 1,(24) hangi kesirlerdir?",
      "answer": "Sırasıyla 37/30, 122/99 ve 123/99. İlkinde 2 tek kez gelir; yalnız 3 devreder."
    },
    {
      "prompt": "Kalanın 1/3’ünü kullanmak ile başlangıcın 1/3’ünü kullanmak aynı mı?",
      "answer": "Hayır. Başlangıç 24 ve ilk kullanım 1/2 ise ilkinde 8, ikincisinde 4 kalır. İkinci kesrin bütününü metinden belirle."
    },
    {
      "prompt": "Son kalan 0 ise başlangıcı her zaman tek bulabilir misin?",
      "answer": "Hayır. Kalan çarpanı 0 ise bütün başlangıçlar son 0 verebilir; tersine bölme tanımlı değildir."
    },
    {
      "prompt": "a/b=3/5 ve a+b=40 için a, b nedir; aralarında asal olsalar?",
      "answer": "a=15, b=25. Ek aralarında asal koşulunda sade temsil 3,5 olur; toplam 8 olduğu için 40 ile birlikte çözüm yoktur."
    },
    {
      "prompt": "Kap doluluğunda hangi kütleler oranlanır?",
      "answer": "Boş kabın kütlesi her tartımdan çıkarılır. Aynı sıvı/yoğunlukta net kısmi sıvı/net tam sıvı oranı hacim doluluğudur."
    },
    {
      "prompt": "3/4 m ip 1/8 m parçalara ayrılırsa parça ve kesim aynı mı?",
      "answer": "Açık tek ipte 6 parça, ayrı 5 kesim gerekir. Katlama veya eşzamanlı kesme verilmediyse varsayma."
    }
  ],
  "sheet": [
    {
      "title": "Tanım, işaret ve gösterim",
      "text": [
        "a,b∈ℤ ve b≠0: a/b∈ℚ. Her tam sayı a/1 biçiminde rasyoneldir. π ve √2 irrasyonel örnekleridir; burada ispatları kullanılmaz. Sonlu veya devirli ondalıklar rasyoneldir.",
        "Pay üstte, payda altta; kesir çizgisi bölme ve gruplama yapar. a/(−b)=(−a)/b=−a/b; iki eksi pozitiftir. 0/b=0 yalnız b≠0 için; a/0 ve 0/0 tanımsızdır."
      ]
    },
    {
      "title": "Denk kesir ve türler",
      "text": [
        "a/b=ak/bk, k≠0. Ortak çarpanı hem paydan hem paydadan böl: 6/8=3/4. Sade biçim rasyonel olma şartı değildir. Pozitif paydalı aralarında asal temsil tektir.",
        "Basit: |pay|<|payda|; bileşik: |pay|≥|payda|. 2 tam 1/3=7/3. −(2+1/3)=−7/3, fakat −2+1/3=−5/3."
      ]
    },
    {
      "title": "Dört işlem ve koşulları",
      "text": [
        "Toplam/çıkarma: a/b±c/d=(ad±bc)/(bd); paydalar sıfır olamaz. Eş parça boyunu kur, paydaları toplama. 1/2+1/3=5/6; 1/2−(−1/3)=5/6.",
        "Çarpım ac/(bd). Bölüm (a/b)(d/c); bölen c/d≠0, yani c de sıfır olamaz. Sonucu bölenle geri çarp. Toplamın tek terimi silinmez: (2+4)/2=1+2=3."
      ]
    },
    {
      "title": "Öncelik ve örnek hesaplar",
      "text": [
        "Parantez → üs → çarpma/bölme soldan sağa → toplama/çıkarma. (1/2)/(1/4)×2=4; ek parantezli (1/2)/((1/4)×2)=1.",
        "3/4−5/6+1/3=1/4; (14/15)(25/21)=10/9; (3/5)/(9/10)=2/3; (1−1/3)/(1+1/2)=4/9."
      ]
    },
    {
      "title": "Sıralama ve eksikler",
      "text": [
        "Önce paydaları pozitif yaz. Ortak paydada büyük pay büyük sayıdır. Aynı pozitif pay için küçük pozitif payda büyük kesirdir; negatif payda veya negatif pay koşuluna kör taşınmaz. Çapraz karşılaştırmada pozitif paydalarla yön korunur.",
        "7/8<11/12: ortak paylar 21/24<22/24, eksikler 1/8>1/12, çapraz 84<88. 13/16<17/20: eksikler 3/16>3/20. Farklı paylı eksiklerde yalnız payda yetmez: 5/8>7/12."
      ]
    },
    {
      "title": "Negatif noktalar ve aralık",
      "text": [
        "Sağdaki sayı büyüktür: −3/4<−1/2. Uzaklıklar 3/4>1/2 olsa da işaretli değerler ters sıradadır. −5/6>−7/8.",
        "İki farklı rasyonelin ortalaması aralarındadır. −2/3<−19/30<−3/5; −7/10<−41/60<−2/3. Eşit uçlarda kesin aralık yoktur."
      ]
    },
    {
      "title": "Ondalık ve devir",
      "text": [
        "0,375=375/1000=3/8. Önce sadeleştir; pozitif paydada yalnız 2 ve 5 asal çarpanı kalırsa ondalık sonludur. 3/20=0,15; 1/4=0,25; 1/6=0,1(6).",
        "0,(27)=3/11; 0,(45)=5/11, sonlu 0,45=9/20; fark 1/220. 0,(12)=4/33, sonlu 0,12=3/25.",
        "1,2(3)=37/30: 100x−10x=111. Yalnız 3 devreder. 1,(23)=122/99; 123/99=1,(24). Yuvarlanan 0,1667 ile tam 1/6 aynı sayı değildir."
      ]
    },
    {
      "title": "Değişen bütün ve tersine çözüm",
      "text": [
        "Önce p, sonra kalanın q kesri giderse kalan (1−p)(1−q)x. İki kullanım da başlangıca aitse kalan (1−p−q)x. İkinci kesrin bütününü sözden seç.",
        "1/4 sonra kalanın 1/3’ü, son 40 L → x=80 L; 80→60→40. 1/5 sonra kalanın 1/4’ü, son 18 → x=30. 1/3 sonra kalanın 1/4’ü, son 15 → x=30.",
        "Başlangıç 24, önce 1/2 sonra kalanın 1/3’ü → 8 kalır; ikinci kullanım başlangıcın 1/3’ü olsa 4 kalır. Kalan çarpanı 0 ise son 0’dan tek başlangıç çıkarılmaz."
      ]
    },
    {
      "title": "Karışım, tartı ve birimler",
      "text": [
        "A oranı 2/5, B oranı 3/5. Yalnız B’nin 1/3’ü çıkarılıp eşit hacimde A eklenirse son A=3V/5. Son A 700 mL ise V=3500/3 mL, son B=1400/3 mL. Eşit kütle farklı koşuldur; yoğunluk gerekebilir.",
        "Boş/dolu/kısmi tartım 120/360/270 g ise net sıvılar 240 ve 150 g; oran 5/8. Aynı sıvı/yoğunlukta hacim oranıdır. Kap kütlesini iki taraftan da çıkar.",
        "1 L=1000 mL. 3/4 m açık tek ip, 1/8 m parçalara ayrılınca 6 parça ve ayrı 5 kesim. Parça adedi ile kesim sayısı ayrı sorudur."
      ]
    },
    {
      "title": "Oran ve aralarında asal koşulu",
      "text": [
        "a/b=3/5 için pozitif tam sayılarda a=3k,b=5k. a+b=40 → k=5 → (15,25). Ayrıca aralarında asal istenirse k=1, toplam 8 olur; 40 ile çözüm yok.",
        "a/b=4/7 ve a+b=55 → k=5 → (20,35). Kesrin sade gösterimi ile bütün eşdeğer pay/payda çiftlerini karıştırma."
      ]
    },
    {
      "title": "İlk hamle ve hata onarımı",
      "text": [
        "Toplamda ortak parça; çarpımda ortak çarpan; bölümde ikinci kesrin tersi; 1’e yakın kıyasta gerçek eksikler; kalanın kesrinde yeni bütün; devirde aynı kuyruk. Yedek yöntem ve ters kontrolü seç.",
        "2/3+1/6=3/9 yanlış; eş parçalar kurulmalı. Yeni 3/5+1/10=7/10. (1/2)/(3/4)=3/8 yanlış; bölüm yerine çarpma yapılmış. Yeni (2/5)/(4/3)=3/10. Negatiflerde mutlak değeri sayı değeri sanma."
      ]
    },
    {
      "title": "Prova denetimi",
      "text": [
        "Prova sonuçları: 7/12; 3/2 ve geri çarpımı 9/14; 23/24>19/20, fark 1/120; −41/60 uygun ara sayı; başlangıç 30; 5/11−9/20=1/220; oran-toplam çifti (20,35).",
        "Yeni doluluk 18/25<29/40; fark 1/200. Açık tek ipte 6 parça ve 5 kesim. Bağımsız kartların bütün verisi kendi üzerinde bulunur; notu veya çözümü açmak bağımsız doğru sayılmaz."
      ]
    }
  ],
  "source": "Aurelia TYT Rasyonel Sayılar kopya kağıdı V5 / içerik 1.0, 13 sayfalık sürümden öğretim uyarlaması. Seçili MEB OGM destekleri: Matematik 9 Kavram Öğretimi HTML 57/basılı 55; Rasyonel Sayılar/Ondalıklı Sayılar materyali. İlgili tanım ve işlem desteği kontrol edildi; bu materyallerin bütün sorularının aktarıldığı veya 2027 resmî kapsamının tamamlandığı anlamına gelmez. Baskı yılları belirlenmedi. 2021 TYT Temel Matematik 1 mevcut tekil kaynak bağlantısı: gerçek soru PDF 26/anahtar 45, E=5/8; uygulama metni özgün öğretim uyarlamasıdır. Özgün kartlar resmî ÖSYM soruları değildir. Kaynakta 123/99 için yazılan yanlış yakın ondalık örneği, doğru 122/99=1,(23) ve 123/99=1,(24) ayrımıyla öğretilir. Kaynaklar: https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/kavram_calismalari/9y/matematik/files/basic-html/page57.html ; https://ogmmateryal.eba.gov.tr/panel/upload/kitap/p5nz5q2atwy.pdf ; https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=26 ; https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=45 . Seçili doğrulama bütün kitapçık, düzeltme duyuruları veya yirmi yıllık arşiv taraması değildir."
};
const pack=rationalSource035Pack;
const objectives=["Kesrin bütününü, işaretini ve sıfır koşullarını koru.","Dört işlem ve karşılaştırmayı gerekçeli modelle denetle.","Ondalık kuyruğunu, değişen bütünü ve birim koşullarını açıklayarak çöz."];
export const rationalSource035Guides:LessonGuide[]=[{id:pack.id,minutes:pack.minutes,source:pack.source,objectives,sections:pack.sections,examples:pack.examples,recall:pack.recall}];
export const rationalSource035Lessons:Lesson[]=[{id:pack.id,title:txt(pack.title),subjectId:"tyt-matematik",minutes:pack.minutes,objectives:objectives.map(txt),source:txt(pack.source),tags:["kaynakli-anlatim","Öğretim uyarlaması sorular"],body:pack.sections.map(s=>({title:txt(s.title),text:txt(s.paragraphs.join("\n\n"))})),questions:pack.items.map((item,index):Question=>{const order=item.options.map((_,i)=>(i+((2*index+1)%5))%5);return {id:`f035-${pack.id}-${index+1}`,prompt:txt(item.prompt),options:order.map(i=>txt(item.options[i])),answer:order.indexOf(0),hint:txt(item.strategy),explanation:txt(item.steps.join(" ")+" Denetim: "+item.check),skill:pack.id,guidance:{knowledge:item.knowledge,strategy:item.strategy,steps:item.steps,optionReasons:order.map(i=>item.optionReasons[i]),commonError:item.commonError,check:item.check}};})}];
export const rationalSource035Sheets:CheatSheet[]=[{topicId:`topic-${pack.id}`,lessonId:pack.id,title:pack.title,subjectId:"tyt-matematik",sections:pack.sheet,cautions:["Payda ve bölen sıfır olamaz; negatif işaretin hangi grubu kapsadığını koru.","Yalnız çarpanlar sadeleşir; toplamın tek terimi silinmez.","İkinci kesrin bütünü, devir bloğu ve birim açık olmalıdır."],examples:[pack.examples[1],pack.examples[8]].map(e=>({title:e.title,prompt:e.prompt,steps:e.steps.map(s=>s.explanation),answer:e.answer})),recall:pack.recall.slice(0,4),source:pack.source}];
