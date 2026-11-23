import { probabilityId } from "../data/supplementalProbabilityTopic036";
import { guidedMathPractice } from "./guidedMathPractice";

export const probabilityPractice036 = guidedMathPractice(probabilityId, [
  {
    id: "agirlikli-zar",
    prompt:
      "Bir zarın 1, 2, 3, 4, 5, 6 yüzlerinin olasılıkları sırasıyla 1/10, 2/10, 2/10, 1/10, 1/10, 3/10. Tek sayı gelme olasılığı kaçtır?",
    options: [
      [
        "1/2",
        "1/2 sonucu üç uygun yüzü altıya bölmekten gelir. Bu zarın yüzleri eş olasılıklı değil.",
      ],
      ["2/5", "Tek yüzler 1, 3 ve 5. Olasılıkları 1/10+2/10+1/10=4/10=2/5."],
      [
        "3/10",
        "Yalnız en yüksek yüz olasılığı 3/10. O yüz 6, tek bile değildir.",
      ],
      ["3/5", "Bu, çift yüzlerin 2/10+1/10+3/10=6/10 olasılığıdır."],
      ["1/5", "Yüz 3 tek başına 2/10. Yüz 1 ve 5 de eklenmeli."],
    ],
    answer: 1,
    knowledge:
      "Ağırlıklı zarda ayrık yüz sonuçlarının gerçek olasılıkları toplanır.",
    strategy: "Önce tek yüzleri ayır, verilen olasılıklarını eş paydada topla.",
    steps: [
      "Tek yüzler 1,3 ve 5.",
      "Olasılık 1/10+2/10+1/10=4/10.",
      "4/10=2/5.",
    ],
    commonError: "Yüzleri saymayı eş şanslı olmayan her deneyde kullanmak.",
    check: "Çift yüzler 2,4,6. Olasılıkları 2/10+1/10+3/10=3/5. 2/5+3/5=1.",
  },
  {
    id: "hic-yazi",
    prompt:
      "Adil bir para bağımsız olarak dört kez atılıyor. En az bir yazı gelme olasılığı kaçtır?",
    options: [
      ["1/16", "Dört atışın hiç yazı vermemesi, sorulan olayın tümleyeni."],
      [
        "1/4",
        "Tam bir yazının 4/16 olasılığı var. İki, üç veya dört yazı da uygun.",
      ],
      ["7/8", "Bu, üç bağımsız atışta en az bir yazı olasılığıdır."],
      [
        "15/16",
        "Dört turanın olasılığı 1/16. Onu 1’den çıkarırsan kalan her dizi en az bir yazı içerir.",
      ],
      ["1", "Dört tura hâlâ mümkün. En az bir yazı kesin olay değildir."],
    ],
    answer: 3,
    knowledge: "En az bir olayın tümleyeni hiç gerçekleşmemesidir.",
    strategy: "Dört atışın hiçbirinde yazı gelmeme olasılığını hesapla.",
    steps: [
      "Her atışta tura 1/2 ve atışlar bağımsız.",
      "Yalnız dört turanın olasılığı (1/2)⁴=1/16.",
      "1−1/16=15/16.",
    ],
    commonError: "En az bir koşulunu tam bir yazı olarak saymak.",
    check: "16 eş şanslı sonuç dizisinden yalnız biri dört tura.",
  },
  {
    id: "tam-bir-olay",
    prompt:
      "Adil bir zarda A çift gelme, B en az 4 gelme olayıdır. A ve B’den yalnız birinin gerçekleşme olasılığı nedir?",
    options: [
      ["2/3", "Dört birleşim sonucu içinde ortak 4 ve 6 da bulunur."],
      [
        "1/2",
        "Bir olayın tek başına olasılığı 3/6; tam biri için iki olayı karşılaştır.",
      ],
      [
        "1/3",
        "A={2,4,6}, B={4,5,6}. Yalnız 2 ve 5 bu olaylardan tam birine ait.",
      ],
      [
        "1/6",
        "Yalnız A’ya veya yalnız B’ye ait tek yüzü sayar, ikisini birleştirmez.",
      ],
      ["0", "İki olay ortak eleman taşısa da birebir aynı kümeler değil."],
    ],
    answer: 2,
    knowledge: "Tam biri için birleşimden kesişim bir kez daha çıkarılır.",
    strategy: "Her yüzün hangi olaylara ait olduğunu yaz.",
    steps: [
      "A={2,4,6}, B={4,5,6}.",
      "4 ve 6 ikisine de ait, bu nedenle çıkar.",
      "Kalan 2 ve 5. Olasılık 2/6=1/3.",
    ],
    commonError: "A veya B birleşimini doğrudan tam bir için kullanmak.",
    check: "P(A)+P(B)−2P(A∩B)=3/6+3/6−2·2/6=1/3.",
  },
  {
    id: "daralan-zarlar",
    prompt:
      "İki bağımsız adil zarın toplamının en az 10 olduğu biliniyor. Birinci zarın 6 olma olasılığı nedir?",
    options: [
      [
        "1/12",
        "3/36 ilk zar 6 ile toplam en az 10’un birlikte olasılığı. Bilgi verilince payda daralır.",
      ],
      ["1/6", "Koşul yokken birinci zarın 6 gelme olasılığı."],
      ["1/2", "Bilgiye uyan altı sıralı çiftten üçünde birinci zar 6."],
      [
        "2/3",
        "4/6 hesabı (6,3) çiftini de sayar. Bu çiftin toplamı 9 ve güncel koşula uymaz.",
      ],
      ["1", "İlk zar 4 veya 5 iken de toplam en az 10 olabilir."],
    ],
    answer: 2,
    knowledge: "Koşula uyan sıralı çiftler içinde yeni pay belirlenir.",
    strategy:
      "Toplam 10, 11, 12 için çiftleri yaz. Birinci zarı 6 olanları işaretle.",
    steps: [
      "Toplam 10 üç, 11 iki ve 12 bir çift verir.",
      "Birinci 6 için ikinci 4,5,6 olabilir.",
      "Koşullu olasılık 3/6=1/2.",
    ],
    commonError: "Koşul geldikten sonra tüm 36 sıralı çifti paydada tutmak.",
    check: "Ortak olasılık 3/36 ve koşulun olasılığı 6/36. Bölüm 1/2.",
  },
  {
    id: "biri-bes",
    prompt:
      "İki bağımsız adil zar atılıyor ve en az birinin 5 olduğu biliniyor. İkisinin de 5 gelme olasılığı nedir?",
    options: [
      ["1/36", "Bu, herhangi bir koşul yokken (5,5) çiftinin olasılığı."],
      [
        "1/6",
        "İlk zarın kesin 5 olduğu bilinseydi ikinci zar 5 için 1/6. Hangi zarın 5 olduğu verilmemiş.",
      ],
      [
        "1/12",
        "İlk veya ikinci 5 olanları 6+6 sayar ve ortak (5,5)’i iki kez bırakır.",
      ],
      [
        "1/11",
        "İki altı sonuçlu grup (5,5)’te kesişir. Koşulu sağlayan 11 çiftin yalnız biri uygun.",
      ],
      [
        "1/10",
        "Ortak (5,5)’i her iki gruptan da siler. Bu çift koşula uyuyor.",
      ],
    ],
    answer: 3,
    knowledge:
      "Belirli bir yüzün en az bir zarda gelmesi, o yüzün hangi zarda geldiğini söylemez.",
    strategy: "İlk 5 ve ikinci 5 olaylarının birleşimini say.",
    steps: [
      "İlk zar 5 olan altı, ikinci zar 5 olan altı çift var.",
      "(5,5) bir kez çıkarılır. 6+6−1=11.",
      "İki zar da 5 olan tek çift. Sonuç 1/11.",
    ],
    commonError:
      "En az birinin 5 olduğunu birinci zarın kesin 5 olduğu gibi almak.",
    check:
      "36 çiftten hiçbirinde 5 bulunmayan 5·5=25 çift çıkarılır. 11 kalır.",
  },
  {
    id: "farkli-renk-cekim",
    prompt:
      "Dört kırmızı ve üç mavi farklı toptan geri koymadan iki top eş şansla çekiliyor. Renklerin farklı olması olasılığı kaçtır?",
    options: [
      ["2/7", "Bu yalnız kırmızı ardından mavi olasılığı. Ters sıra da uygun."],
      ["24/49", "İkinci payda 7 alınırsa geri koyma hesabı yapılmış olur."],
      ["3/7", "Aynı renkli iki toplu seçimleri sayar. İstenen farklı renk."],
      ["4/7", "4·3 renk karışık ikili, C(7,2)=21 toplam ikili. 12/21=4/7."],
      [
        "6/7",
        "İki topun aynı fiziksel top olmaması renklerinin farklı olmasını gerektirmez.",
      ],
    ],
    answer: 3,
    knowledge: "Geri koymadan çekişte her sırasız fiziksel ikili eş şanslıdır.",
    strategy: "Aynı sayım biçimini pay ve paydaya uygula.",
    steps: [
      "Bir kırmızı ve bir mavi 4·3=12 ikili.",
      "Tüm ikililer C(7,2)=21.",
      "12/21=4/7.",
    ],
    commonError: "Sırasız payı ikiyle çarparken paydayı sırasız bırakmak.",
    check: "Sıralı hesabın 4/7·3/6 ve 3/7·4/6 sonuçlarını topla. 24/42=4/7.",
  },
  {
    id: "ayrik-bagimsiz",
    prompt:
      "1’den 12’ye tam sayılardan biri eş şansla seçiliyor. A çift sayı gelmesi, B en fazla 6 gelmesi. Bu olaylar için doğru ifade hangisi?",
    options: [
      ["Ayrık ve bağımsız.", "2,4,6 ortak olduğundan olaylar ayrık değildir."],
      [
        "Bağımsız ve ayrık değil.",
        "P(A)P(B)=1/2·1/2=1/4. Ortak 2,4,6 da 3/12=1/4.",
      ],
      ["Ayrık ve bağımlı.", "Ortak üç sayı var. Ayrıklık sağlanmaz."],
      [
        "Bağımlı ve ayrık değil.",
        "Ayrık olmadıkları doğru, fakat ortak olasılık çarpıma eşit olduğu için bağımsızlar.",
      ],
      [
        "Olaylar eşit.",
        "A = B için aynı sayılar gerekir. Örneğin 1 yalnız B’de, 8 yalnız A’da.",
      ],
    ],
    answer: 1,
    knowledge:
      "Ayrıklık ortak sonuç olup olmadığı, bağımsızlık olasılık çarpımı ile ilgilidir.",
    strategy:
      "Kesişimi yaz, ardından büyüklüğünü iki olasılığın çarpımıyla karşılaştır.",
    steps: [
      "A ve B’nin her biri altı sonuç taşır.",
      "Kesişim 2,4,6. Ayrıklık yok.",
      "3/12=(6/12)(6/12) olduğundan bağımsız.",
    ],
    commonError:
      "Ortak sonuç görüldüğünde bağımsızlığın imkânsız olduğunu düşünmek.",
    check: "B koşulunda A 3/6, koşulsuz A 6/12; ikisi de 1/2.",
  },
  {
    id: "gozlenen-siklik",
    prompt:
      "Bir olayı 80 denemenin 28’inde gözlemledik. Deneyin teorik modeli hakkında ek bilgi yok. Hangisi kesin söylenebilir?",
    options: [
      [
        "Teorik olasılık 7/20’dir.",
        "7/20 gözlenen oran. Teorik model için ek varsayım gerekir.",
      ],
      [
        "Sonraki deneme kesin olayı verir.",
        "Geçmiş oran tek sonraki denemenin sonucunu belirlemez.",
      ],
      [
        "Gözlenen oran 7/20’dir.",
        "28/80 sadeleşince 7/20 olur. Bu, o 80 gözlemin oranı.",
      ],
      [
        "Gözlenen oran 13/20’dir.",
        "52/80 olayın gözlenmediği durumların oranıdır.",
      ],
      [
        "Olayın teorik olasılığı sıfırdır.",
        "Model bilinmeden kesin teorik değer verilemez; olay zaten 28 kez gözlenmiş.",
      ],
    ],
    answer: 2,
    knowledge: "Deneysel oran gerçekleşme sayısının deneme sayısına bölümüdür.",
    strategy: "İfadede gözleneni mi, teorik sonucu mu verdiğine bak.",
    steps: [
      "28 olumlu gözlem ve 80 deneme var.",
      "28/80=7/20=0,35.",
      "Sonuç deneysel gözlemi özetler.",
    ],
    commonError: "Sonlu gözlem oranını kesin teorik olasılığa eşitlemek.",
    check: "Gözlenen ve gözlenmeyen oranlar 7/20+13/20=1.",
  },
]);

export const statisticsPractice037 = guidedMathPractice("veri-analizi", [
  {
    id: "037-eksik-frekans",
    prompt:
      "1 değeri üç kez, 4 değeri x kez, 7 değeri bir kez gözleniyor. Aritmetik ortalama 3. x ve ortanca sırasıyla nedir?",
    options: [
      [
        "2 ve 2,5",
        "(10+4x)/(4+x)=3 denklemi x=2 verir. Altı değerin ortasındaki 1 ve 4’ün ortalaması 2,5.",
      ],
      [
        "2 ve 3",
        "3 bütün değerlerin ortalaması. Ortanca iki orta konumla bulunur.",
      ],
      ["3 ve 4", "x=3 olsa toplam 22, adet 7, ortalama tam 3 olmaz."],
      ["4 ve 2,5", "x=4 için 26/8=3,25. Verilen ortalamayı sağlamaz."],
      ["1 ve 1", "x=1 için toplam 14 ve adet 5, ortalama 2,8."],
    ],
    answer: 0,
    knowledge:
      "Toplamda her değer kendi frekansıyla çarpılır. Gözlem sayısı frekansların toplamıdır.",
    strategy: "Ortalama denkleminden x’i bul, sonra gerçek listeyi sırala.",
    steps: [
      "10+4x=3(4+x). Buradan x=2.",
      "Sıralı değerler 1,1,1,4,4,7.",
      "Ortanca (1+4)/2=2,5.",
    ],
    commonError: "Ortalama ve ortancayı aynı sayı gibi kullanmak.",
    check: "Toplam 18, adet 6, 18/6=3. En sık değer 1 ve açıklık 7−1=6.",
  },
  {
    id: "037-ham-histogram",
    prompt:
      "1,2,4,4,6,7,8,10 ölçümlerini üç eş sınıfa ayır. Genişlik açıklık/3’ten büyük en küçük tam sayı, ilk alt sınır 1 ve sınıflar sağdan açık. Genişlik ve frekanslar?",
    options: [
      [
        "3 ve 2,3,3",
        "9/3=3, fakat istenen genişlik 3’ten kesin büyük. Ayrıca 10 son sınıfın üst ucu dışında kalırdı.",
      ],
      [
        "4 ve 4,3,1",
        "Genişlik 4. [1,5), [5,9), [9,13) sınıfları 4,3,1 ölçüm içerir.",
      ],
      [
        "4 ve 2,4,2",
        "Sol sınır 1; ilk sınıfta 1,2,4,4 olmak üzere dört değer var.",
      ],
      [
        "5 ve 4,4,0",
        "5, 3’ü aşar ama koşulu sağlayan en küçük tam sayı değildir.",
      ],
      ["4 ve 4,4,0", "10, [5,9) içinde değildir. Son sınıfta kalır."],
    ],
    answer: 1,
    knowledge:
      "Her gözlem bir ve yalnız bir yarı açık aralığın içinde sayılır.",
    strategy:
      "Açıklığı böl, kesin büyük en küçük tam sayıyı al. Sınırları yaz.",
    steps: [
      "Açıklık 10−1=9. 9/3=3 ve genişlik 4.",
      "Sınıflar [1,5), [5,9), [9,13).",
      "Sınıfların frekansları 4,3,1.",
    ],
    commonError: "Genişlik tam bölüm çıkınca kesin büyüklüğü unutmak.",
    check: "4+3+1=8. 10 üçüncü sınıfta ve hiçbir ölçüm iki kez sayılmadı.",
  },
  {
    id: "037-uc-seri",
    prompt:
      "Eş aralıklı dört anda A=1,3,5,7; B=4,4,4,4 ve C=0,0,8,8 ölçüldü. Ortalamaları eşittir. En geniş açıklık ve en büyük tek adımlık artış hangi serilerdedir?",
    options: [
      [
        "A ve A",
        "A açıklığı 6 ve her adımı 2. C’de hem daha geniş açıklık hem 8’lik artış var.",
      ],
      [
        "C ve A",
        "C açıklığı en büyük. Tek adımda artışta da C’nin 0→8 geçişi A’nın 2’lik adımını aşar.",
      ],
      ["A ve C", "C’nin adımı doğru. Açıklıkta A 7−1=6, C 8−0=8."],
      [
        "C ve C",
        "C açıklığı 8 ve ikinci ile üçüncü an arasında 8 artar. Diğer iki serinin ölçüleri daha küçük.",
      ],
      ["B ve B", "B sabit, açıklığı 0 ve artışı 0."],
    ],
    answer: 3,
    knowledge:
      "Açıklık uçları karşılaştırır. En büyük adım için ardışık farkları ayrı hesapla.",
    strategy:
      "Her seri için en büyük eksi en küçük, sonra komşu gözlem farklarını yaz.",
    steps: [
      "A açıklık 6, B 0, C 8.",
      "A’nın adımı 2; B’nin 0; C’nin adımları 0,8,0.",
      "İki ölçüde de C en büyük.",
    ],
    commonError:
      "Ortalama eşitse dağılım ve değişim hızlarının da eşit olduğunu varsaymak.",
    check:
      "Hepsinin toplamı 16 ve ortalaması 4. Bu bilgi verilen iki ölçüyü eşitlemez.",
  },
  {
    id: "037-aralikta-esik",
    prompt:
      "Yalnız [0,5), [5,10), [10,15) sınıflarındaki 3,4,5 gözlem sayıları biliniyor. En az 10 olan oran ile en az 8 olan oran için ne söylenir?",
    options: [
      ["İkisi de 5/12.", "Orta sınıfın bazı ölçümleri 8 ve üstü olabilir."],
      [
        "En az 10 olan 5/12. En az 8 olan 5/12 ile 9/12 arasında olabilir.",
        "Son beş kesin. Orta sınıfın dördünden sıfır, bir, iki, üç veya dördü 8’i karşılayabilir.",
      ],
      [
        "En az 10 olan 9/12. En az 8 olan 5/12.",
        "10 üçüncü sınıfta. Daha düşük eşik daha az gözlem üretemez.",
      ],
      [
        "İkisi de belirsiz.",
        "10 gerçek sınıf sınırı, son sınıftakilerin sayısı belli.",
      ],
      [
        "En az 8 olan tam 7/12.",
        "Orta sınıfı ikiye bölmek gözlemlerin eşit dağıldığına dair ek varsayım ister.",
      ],
    ],
    answer: 1,
    knowledge:
      "Sınıf eşiğindeki sayı kesin olabilir. Sınıf içindeki kesin sayı ham ölçümleri gerektirir.",
    strategy: "Eşik değerlerinin hangi sınırda veya sınıfta kaldığını bul.",
    steps: [
      "Toplam 12 gözlem. En az 10 olan son sınıftaki 5.",
      "8 orta sınıfın içinde. Son 5 kesin ve orta 4 koşula uyabilir.",
      "En az 8 sayısı 5 ile 9 arasında.",
    ],
    commonError:
      "Sınıf içinde görülen ölçümlerin orta noktada olduğunu varsaymak.",
    check:
      "Orta sınıfta herkes 5 olursa 5/12, herkes 9 olursa 9/12 olur; iki veri de aynı tabloya uyar.",
  },
]);
