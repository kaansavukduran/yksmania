import type { LessonGuide } from "./types";
export const primesGuide: LessonGuide = {
  id: "asal-sayilar",
  minutes: 45,
  objectives: [
    "Asal, bileşik ve aralarında asal kavramlarını birbirinden ayır.",
    "Asallığı karekök sınırına kadar yeterli adaylarla denetle.",
    "Asal çarpanları, farklı asal bölenleri ve bütün pozitif bölenleri ayrı say.",
    "Asal çarpım ve toplam sorularında pozitiflik ve 2 istisnasını kullan.",
  ],
  sections: [
    {
      title: "Asal olmak iki farklı pozitif bölen demektir",
      paragraphs: [
        "1’den büyük bir tam sayı yalnız 1 ve kendisine tam bölünüyorsa asaldır. 11’in pozitif bölenleri 1 ve 11’dir. 12’nin ise 1,2,3,4,6,12 bölenleri vardır ve 12 bileşiktir. 1’in yalnız bir pozitif böleni olduğundan asal veya bileşik değildir; 0 ve negatifler bu tanımın dışındadır.",
        "2 tek çift asal sayıdır. 2’den büyük her çiftin kendisinden farklı 2 böleni vardır. Buna rağmen her tek sayı asal değildir: 9,15,21 bileşiktir. Asal rakamlar 2,3,5,7’dir; bunlarla yazılan her sayı asal olmaz. 77=7×11 örneği rakam özelliği ile bütün sayının özelliğini ayırır.",
      ],
    },
    {
      title: "Bölen denemesi neden karekökte biter?",
      paragraphs: [
        "n bileşikse n=a×b, a,b>1 yazılır. İki çarpanın da √n’den büyük olması çarpımı n’den büyük yapardı. Demek ki çarpanlardan biri √n’yi aşmaz; o çarpanın bir asal böleni de bu sınırı aşmaz. Bu nedenle yalnız p²≤n sağlayan asal p’leri denemek yeterlidir. Eşitlik dahildir: 121 için 11 denenmelidir.",
        "Bir tam bölen bulmak bileşikliği kanıtlar. Hiç bölen bulamadım demek ise yalnız bütün gerekli adaylar denendiyse asallığı kanıtlar. 97 için 2,3,5,7 yeterlidir; 11²>97. Modelde gerekli denemeleri yap; 49’u yalnız 2,3,5’e bakıp asal ilan etme. Büyük karekökü ondalık hesaplamak yerine adayın karesini karşılaştırmak daha güvenlidir.",
      ],
    },
    {
      title: "Asal çarpan ağacı ve üç farklı sayaç",
      paragraphs: [
        "1’den büyük her tam sayı, sıralama dışında tek bir asal çarpım olarak yazılır. 72=8×9=2³×3². Burada farklı asal bölenler 2 ve 3 olmak üzere iki tanedir; tekrarlı asal çarpan sayısı 3+2=5’tir. Bütün pozitif bölenlerin sayısı ise bunlardan farklıdır.",
        "n=pᵃqᵇ ise her bölen p’den 0…a, q’dan 0…b kopya seçerek oluşur. Bağımsız seçimler (a+1)(b+1) bölen verir. 72 için 4×3=12 pozitif bölen vardır. Formüle yalnız farklı asal tabanların üsleri girer. 72=8×9 yazıp (1+1)(1+1) kullanmak yanlış olur; 8 ve 9 asal değildir.",
      ],
    },
    {
      title: "Aralarında asal olmak, ikisinin de asal olması değildir",
      paragraphs: [
        "İki pozitif tam sayının ortak pozitif böleni yalnız 1 ise aralarında asaldır. 8 ve 15’in ikisi de bileşik olmasına rağmen ortak asal çarpanları yoktur. 5 ve 10’da 5 ortak bölen olduğundan aralarında asallık yoktur. ‘İkisi de asal’ ve ‘aralarında asal’ ayrı ifadelerdir; aynı asalın kendisiyle EBOB’u o asaldır.",
        "Ardışık iki tam sayı aralarında asaldır: ortak bölenleri farkları olan 1’i de bölmek zorundadır. Pozitif tam a,b için a/b en sade biçimdeyse a,b aralarında asaldır. Ancak a/b=2/3 eşitliği tek başına a=2,b=3 demek değildir; 4/6 da aynı oranı verir. En sadelik koşulu kullanıldığında ortak çarpan 1’e iner.",
      ],
    },
    {
      title: "Çarpım asal çıkıyorsa koşulu kullan",
      paragraphs: [
        "a,b pozitif tam sayı ve ab=p asal ise çarpanlardan biri 1, öteki p olmalıdır. İkisi de 1’den büyük olsaydı p’nin ek böleni olurdu. Bu sonuç gerçek çarpanlar için geçerli değildir: 1,5×2=3 asaldır ama çarpanlardan biri 1 değildir. Tam sayılarda negatiflere izin verilirse −1 ve −p durumu da mümkündür.",
        "x²−y²=(x−y)(x+y) gibi dönüşümler asal çarpım sorusunu iki çarpana indirir. Fakat çarpanların pozitif tam sayı olduğuna dikkat et: x>y≥0 gibi koşul gerekir. Sadece ‘çarpım asal’ sloganıyla işaret ve sıfır koşullarını atlama. Her adımda bulunan sayıları başlangıç ifadesine koy.",
      ],
    },
    {
      title: "Asal toplamlarında 2’yi ayrı düşün",
      paragraphs: [
        "İki asalın toplamı tekse asal sayılardan biri çift olmak zorundadır; tek çift asal 2’dir. Toplam 19 ise diğer asal 17’dir. Toplam çiftse 2 zorunlu değildir; 5+7=12. Farklılık koşulu varsa 2+2 gibi eşit seçimleri dışla.",
        "Farkı 1 olan iki asal yalnız 2 ve 3 olabilir; ardışık iki tam sayıdan biri çifttir. ‘Ardışık asal’ ise farklı bir anlam taşır: 7 ile 11 arasında başka asal yoktur, dolayısıyla ardışık asaldırlar; farkları 1 değildir. Farkı 2 olan asal çiftlerine ikiz asal denir. Sorudaki terimi sayılar arasındaki ilişkiyle birlikte oku.",
      ],
    },
  ],
  examples: [
    {
      title: "Karekök sınırındaki adayı atlama",
      prompt: "169 asal mıdır? Gerekçeli bir karar ver.",
      strategy: "13²=169 olduğu için 13 denemesi dahil olmalıdır.",
      steps: [
        {
          label: "Gerekli adaylar",
          expression: "2,3,5,7,11,13",
          explanation: "Karesi 169’u aşmayan asal adaylar bunlardır.",
        },
        {
          label: "Bir bölen yeter",
          expression: "169=13×13",
          explanation:
            "13, 1 ve 169’dan farklı bir pozitif bölen olduğundan bileşiklik kanıtlanır.",
        },
      ],
      answer: "169 bileşiktir.",
      check: "Pozitif bölenleri 1,13,169 olmak üzere üç tanedir.",
      pitfall: "p²<n yerine p²≤n koşulunu kullan.",
    },
    {
      title: "Aynı çarpım, farklı sayımlar",
      prompt: "180’in farklı asal bölen ve bütün pozitif bölen sayılarını bul.",
      strategy: "Önce yalnız asal tabanlarla çarpımı yaz.",
      steps: [
        {
          label: "Asal çarpım",
          expression: "180=2²×3²×5",
          explanation: "Farklı tabanlar 2,3,5; üç asal bölen vardır.",
        },
        {
          label: "Bölen seçimi",
          expression: "(2+1)(2+1)(1+1)=18",
          explanation:
            "Her asalın üssü bağımsız seçilir; sıfırıncı üs 1 bölenini de üretir.",
        },
      ],
      answer: "3 farklı asal bölen; 18 pozitif bölen.",
      check: "Tekrarlı asal çarpan sayısı 2+2+1=5’tir; bu üçüncü bir sayaçtır.",
      pitfall: "Üsleri toplamak bütün bölen sayısını vermez.",
    },
    {
      title: "Orandan sayıya geçerken en sadelik",
      prompt:
        "a,b pozitif ve aralarında asal tam sayılar; a/b=12/20. a+b kaçtır?",
      strategy:
        "Oranı önce sadeleştir; aralarında asallık ortak ölçeği belirler.",
      steps: [
        {
          label: "En sade oran",
          expression: "12/20=3/5",
          explanation:
            "a=3k,b=5k biçimindeki pozitif tam sayı çiftlerinde ortak ölçek bulunur.",
        },
        {
          label: "Ortak böleni kullan",
          expression: "EBOB(a,b)=k=1",
          explanation: "Aralarında asal olma koşulu a=3,b=5’i zorunlu kılar.",
        },
      ],
      answer: "8",
      check: "3 ve 5’in ortak pozitif böleni yalnız 1’dir.",
      pitfall: "Aralarında asal koşulu verilmeseydi a+b tek bir değer olmazdı.",
    },
    {
      title: "Asal olan kare farkı",
      prompt: "x>y>0 tam sayılar ve x²−y²=17. x+y kaçtır?",
      strategy: "Kare farkını pozitif tam sayı çarpanlarına ayır.",
      steps: [
        {
          label: "Çarpanlara ayır",
          expression: "(x−y)(x+y)=17",
          explanation: "İki çarpan da pozitif; büyük olan x+y’dir.",
        },
        {
          label: "Asal çarpımı çöz",
          expression: "x−y=1, x+y=17 → x=9,y=8",
          explanation: "17’nin pozitif çarpan çifti yalnız 1 ve 17’dir.",
        },
      ],
      answer: "17",
      check: "9²−8²=81−64=17.",
      pitfall:
        "Çarpanların pozitif tam sayı olduğunu doğrulamadan aynı çıkarımı yapma.",
    },
  ],
  recall: [
    {
      prompt: "1 neden asal değildir?",
      answer:
        "Asal tanımı tam iki farklı pozitif bölen ister; 1’in yalnız bir tane vardır.",
    },
    {
      prompt: "Asal olmadığına karar vermek için kaç bölen yeter?",
      answer:
        "1 ve kendisi dışında bir pozitif bölen yeter. Asal demek için gerekli bütün adayları elemek gerekir.",
    },
    {
      prompt: "9 ile 10 aralarında asal mı?",
      answer:
        "Evet; ikisi de bileşik olmasına rağmen ortak pozitif bölenleri yalnız 1’dir.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri PDF s.19,24 (basılı 17,22); Aurelia Asal Sayılar kopya kağıdı s.1–4 ile karşılaştırılmış özgün anlatım ve çözümler. ÖSYM sorusu veya resmî çözüm olarak sunulmaz.",
};

export const factorialGuide: LessonGuide = {
  id: "faktoriyel",
  minutes: 45,
  objectives: [
    "Faktöriyelin doğal sayı koşulunu ve 0!=1 istisnasını uygula.",
    "Ortak çarpımı görerek oran, toplam ve denklemleri çöz.",
    "Sıralama ile asal çarpan sayımını ilişkilendir; sondaki sıfırları gerekçelendir.",
  ],
  sections: [
    {
      title: "Ünlem işareti burada bir çarpımı kısaltır",
      paragraphs: [
        "Pozitif tam n için n!=1×2×…×n. Örneğin 5!=120. Ayrıca 0!=1 ve 1!=1’dir. 0! bir çarpımın sıfır olması değildir; boş çarpımın değeri 1 olarak tanımlanır. n!=n(n−1)! bağıntısı n≥1 için kullanılır; n=0 yazıp (−1)! üretilemez.",
        "Bu YKS düzeyindeki tanımda faktöriyelin içi negatif olmayan tam sayı olmalıdır. (x−3)! varsa x tam sayı ve x≥3; aynı anda (7−x)! varsa x≤7 gerekir. İki koşulun ortak kısmı 3≤x≤7’dir. Faktöriyel her zaman pozitif tam sayıdır; sıfır olmaz ve bir paydada güvenle kullanılabilir.",
      ],
    },
    {
      title: "Azalan seçimler neden n! verir?",
      paragraphs: [
        "Dört farklı kitabı dört sıraya birer kez koyarken ilk yer için 4, ikinci için 3, üçüncü için 2, son yer için 1 seçenek vardır; toplam 4!=24 sıra. Her adımda kalan seçenek azalır. Modelde nesne sayısını değiştir ve çarpımın nasıl oluştuğunu izle; boş sıra için de bir tek düzen vardır: hiçbir şey yerleştirmemek.",
        "Bu kural bütün nesneler farklı, hepsi kullanılıyor ve ek kısıt yoksa doğrudan uygulanır. Aynı iki kitabı ayırt etmiyorsan, bir kitabın ilk sıraya gelmesi yasaksa veya çemberde döndürülmüş düzenler aynı sayılıyorsa problem değişir. ‘Sıralama’ sözcüğünü görünce koşulsuz n! yazma; önce neyin farklı sayıldığını belirle.",
      ],
    },
    {
      title: "Büyük sayıları hesaplamadan ortak çarpımı sadeleştir",
      paragraphs: [
        "8!/5!=8×7×6; çünkü 8!=8×7×6×5!. Her iki faktöriyeli büyük sayıya çevirmek gereksizdir. n≥m≥0 için n!/m!, m+1’den n’ye kadarki çarpımdır. n=m ise sonuç 1’dir. Ters oranda 4!/7!=1/(7×6×5) olur; bölme yönünü koru.",
        "(n+2)!/n!=(n+2)(n+1) bağıntısında parantez bütündür. (n+2)!, n!+2 değildir. Benzer şekilde (3!)²=36 iken (3²)!=9!’dir. İşleme başlamadan ünlemin ve üssün tam olarak hangi ifadeyi kapsadığını işaretle.",
      ],
    },
    {
      title: "Toplamda terim değil, ortak çarpan sadeleşir",
      paragraphs: [
        "(n+1)!+n!=n![(n+1)+1]=(n+2)n!. Bu dağıtma kuralıdır; toplamın içinden yalnız bir n! çizilmez. Örneğin (7!+6!)/6!=7+1=8. Sonuç 7 değildir; payın ikinci terimi 6!/6!=1 katkısı yapar.",
        "Faktöriyel eşitliğinde a!=b! görürsen 0!=1! istisnasını hatırla. Pozitif tam sayılarda 1!,2!,3!,… kesin artar; fakat 0 ve 1 aynı değeri verir. n!=1 denkleminin doğal sayılarda çözümleri 0 ve 1’dir. Değişkenli faktöriyellerin içlerini eşitlemeden önce izinli aralığı ve bu istisnayı denetle.",
      ],
    },
    {
      title: "Bir asalın kaç kopyası var?",
      paragraphs: [
        "n! içinde p asalının üssünü sayarken p’nin katlarından birer kopya, p² katlarından birer ek kopya, p³ katlarından birer ek kopya gelir. Sayaç ⌊n/p⌋+⌊n/p²⌋+… biçimindedir; bölümün tam kısmı sıfır olduğunda durur. ⌊ ⌋ pozitif bölümün tam kısmını belirtir. 12!’da 3 sayacı 4+1=5’tir; 9, iki adet 3 içerdiği için ek sayılır.",
        "Bu formülde p asal olmalıdır. 12 gibi bileşik bir çarpanın kopyasını ararken önce 12=2²×3 yazılır; hem ikili 2’ler hem 3’ler yeterli olmalıdır. Örneğin 10!’da 2 sayacı 8, 3 sayacı 4’tür; en çok min(⌊8/2⌋,4)=4 tane 12 çarpanı ayrılabilir. ‘Kaç katı var?’ ile ‘asal çarpanın üssü kaç?’ farklı sorulardır.",
      ],
    },
    {
      title: "Sondaki sıfırların kaynağı 2×5 çiftleridir",
      paragraphs: [
        "Onluk yazımda her son sıfır bir 10=2×5 çarpanı gerektirir. n! içinde 2 kopyaları 5 kopyalarından az olmadığından sondaki sıfırları 5’leri sayarak buluruz: ⌊n/5⌋+⌊n/25⌋+…. 25! için 5+1=6 sıfır vardır; yalnız 5’in katlarını saymak 25’in ikinci 5’ini kaçırır.",
        "Bu kestirme n! içindir; bir bölümün veya toplamın son sıfırlarını kör biçimde aynı sayma. 10!/5! için paydanın asal çarpanları çıkarılır ve sonuçtaki 2 ile 5 kopyaları yeniden eşleştirilir. Toplamda ise çarpanlar doğrudan çıkarılmaz; önce ortak çarpan ayırmak gerekebilir. Sayının içindeki sıfır rakamlarıyla son sıfırlar da aynı değildir: 1002’nin sonunda sıfır yoktur.",
      ],
    },
  ],
  examples: [
    {
      title: "Oran için gereken kadar aç",
      prompt: "9!/6! değerini bul.",
      strategy: "Payı paydadaki ortak faktöriyele kadar aç.",
      steps: [
        {
          label: "Ortak kısmı göster",
          expression: "9!=9×8×7×6!",
          explanation: "1’den 6’ya kadar çarpım iki tarafta aynıdır.",
        },
        {
          label: "Sadeleştir",
          expression: "9×8×7=504",
          explanation: "6! sıfır olmadığı için bölünebilir.",
        },
      ],
      answer: "504",
      check: "Üç ardışık çarpan kaldı; 9 ile 6 arasındaki fark 3’tür.",
      pitfall: "9!/6! ifadesini 9/6 sanma.",
    },
    {
      title: "Toplamda eksik kalan bir",
      prompt: "(8!+7!)/7! işlemini hesapla.",
      strategy: "Payın tamamından 7! ortak çarpanını ayır.",
      steps: [
        {
          label: "Ortak çarpan",
          expression: "8!+7!=7!(8+1)",
          explanation: "İkinci terim 1×7! olarak yazılır.",
        },
        {
          label: "Bölümü al",
          expression: "7!×9/7!=9",
          explanation: "Ortak çarpan bütün paya aittir.",
        },
      ],
      answer: "9",
      check: "8!/7!+7!/7!=8+1.",
      pitfall: "Toplamdan yalnız bir terimi sadeleştirip diğerini unutma.",
    },
    {
      title: "Eşit faktöriyellerde iki aday",
      prompt: "(x−2)!=(5−x)! denklemini bu düzeydeki faktöriyel tanımıyla çöz.",
      strategy:
        "Önce iki iç ifadenin de negatif olmayan tam sayı olmasını sağla.",
      steps: [
        {
          label: "Tanım aralığı",
          expression: "x∈{2,3,4,5}",
          explanation: "x−2≥0 ve 5−x≥0 birlikte uygulanır.",
        },
        {
          label: "Adayları dene",
          expression: "x=2:0!≠3!; x=3:1!≠2!; x=4:2!≠1!; x=5:3!≠0!",
          explanation: "Hiçbir izinli aday eşitliği sağlamaz.",
        },
      ],
      answer: "Çözüm yoktur.",
      check:
        "İçleri eşitlemek x=3,5 verir; bu değer faktöriyel tanımına uymaz.",
      pitfall:
        "0!=1! istisnasını bilmek, her ardışık iç değerin eşit faktöriyel verdiği anlamına gelmez.",
    },
    {
      title: "25’in ikinci beşini say",
      prompt: "30! sayısının sonunda kaç sıfır vardır?",
      strategy: "10 çiftleri için sınırlayıcı asal olan 5’i say.",
      steps: [
        {
          label: "5 katları",
          expression: "⌊30/5⌋=6",
          explanation: "5,10,15,20,25,30 en az birer 5 verir.",
        },
        {
          label: "Ek kopyalar",
          expression: "⌊30/25⌋=1; toplam 6+1=7",
          explanation:
            "25 bir ikinci 5 verir; 125 sınırı aşıldığı için daha fazla terim yoktur.",
        },
      ],
      answer: "7 sıfır",
      check: "2 sayacı 15+7+3+1=26’dır; 5’lerle eşleşmek için yeterlidir.",
      pitfall: "Yalnız 5’in katlarını sayarsan 25’in ek çarpanını kaçırırsın.",
    },
    {
      title: "Bölümün sonunda kaç sıfır var?",
      prompt: "10!/5! tam sayısının sonunda kaç sıfır vardır?",
      strategy:
        "Bölümdeki 2 ve 5 üslerini ayrı çıkar; sonucu yeniden eşleştir.",
      steps: [
        {
          label: "Beşleri say",
          expression: "v₅(10!)−v₅(5!)=2−1=1",
          explanation: "Paydadaki bir 5 iptal olur.",
        },
        {
          label: "İkileri say",
          expression: "v₂(10!)−v₂(5!)=8−3=5",
          explanation: "Sonuçtaki 10 çiftlerini az olan 5 sayacı sınırlar.",
        },
      ],
      answer: "1 sıfır",
      check: "6×7×8×9×10=30240; sonunda tek sıfır vardır.",
      pitfall: "Yalnız 10!’un sıfır sayısı olan 2’yi sonuç diye alma.",
    },
  ],
  recall: [
    {
      prompt: "n!=1’in doğal sayılarda kaç çözümü vardır?",
      answer: "İki: n=0 ve n=1.",
    },
    {
      prompt: "(n+1)!+n! niçin (2n+1)! değildir?",
      answer:
        "Faktöriyel toplam üzerine dağılmaz; ortak çarpanla doğru ifade (n+2)n! olur.",
    },
    {
      prompt: "Sondaki sıfır hesabında 25 neden iki kez katkı yapar?",
      answer:
        "25=5² iki adet 5 içerir; katlar sayımında birincisi, 25 katları sayımında ikincisi sayılır.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri PDF s.73 (basılı 71); Aurelia Faktöriyel Kavramı s.1–4. Özgün gerekçeler, etkileşim ve adım adım örnekler; resmî sınav sorusu değildir.",
};
