import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";

const id = "veri-analizi";
const source =
  "MEBİ TYT Matematik Konu Özetleri, PDF s. 109–112 / basılı s. 107–110; Aurelia 037 Veri Analizi (İstatistik), öğretim s. 1–3 ve 5–7; OGM 9. sınıf Merkezî Eğilim ve Yayılım Ölçüleri sunusu ile Verileri Değerlendiriyorum etkinliği temelinde özgün öğretim. Soru ve örnekler özgündür; resmî ÖSYM sorusu değildir. Örneklem sapmasında n−1 ile bütün anakütle sapmasında n ayrılır; küçük sapmadan kişi hakkında güvenlik veya başarı garantisi çıkarılmaz.";
const objectives = [
  "Ham gözlemleri sıralı listeye ve frekans tablosuna kayıpsız dönüştür.",
  "Ortanca, mod ve ağırlıklı ortalamayı veri sayısını koruyarak hesapla.",
  "Uç değer, doğrusal dönüşüm ve farklı sapma tanımlarının etkisini açıkla.",
  "Gruplandırılmış gösterimin sakladığı bilgiyi ve çıkarım sınırlarını ayırt et.",
];
export const forge015MathTopics: Record<string, string> = {
  [id]: "detail-225",
};
export const forge015MathGuides: LessonGuide[] = [
  {
    id,
    minutes: 85,
    objectives,
    source,
    sections: [
      {
        title: "Önce gözlem birimini belirle",
        paragraphs: [
          "Bir araştırmada kimin veya neyin ölçüldüğünü, hangi özelliğin kaydedildiğini ve birimi ayrı yaz. Öğrenci başına kitap sayısı bir sayım, bir koşunun süresi ölçümdür. Sınıfın toplam kitabıyla her öğrencinin kitap sayısı aynı veri grubu değildir. Sayıların aynı tabloda bulunması, onları aynı birimde toplayabileceğin anlamına gelmez.",
          "Kesikli bir değişken, örneğin kardeş sayısı, belirli sayılabilir değerleri alır; süre ve uzunluk gibi sürekli bir nicelik bir aralıktaki gerçek değerlerle modellenebilir. Sürekli bir niceliği ölçerken elde ettiğin sonlu, yuvarlanmış kayıtlar o aralıktaki her gerçek sayıyı gözlediğini göstermez. Ölçüm hassasiyeti ile değişkenin türünü karıştırma; eksi sıcaklık da geçerli bir gözlem olabilir.",
        ],
      },
      {
        title: "Frekans, gözlemi kaç kez saydığını söyler",
        paragraphs: [
          "Ham listedeki tekrarları silmek veri kaybettirir. 1, 1, 3, 3, 3, 7 listesi üç farklı değer ama altı gözlem içerir. Frekans tablosunda değer 1’in sıklığı 2, 3’ün 3, 7’nin 1 olur. Toplam gözlem sayısı Σf, toplam değer Σ(x·f), ortalama Σ(x·f)/Σf ile bulunur. Üç tablo satırı var diye toplamı üçe bölme.",
          "Göreli frekans f/n, yüzdelik frekans 100f/n’dir; n sıfırken ikisi de tanımsızdır. Aynı değerleri ve frekanslarını bilmek, ham gözlemleri çokluklarıyla geri kurmaya yeter. Bu kayıpsız durum, yalnız aralıkların frekansını bilmekten farklıdır. Tablonun frekans toplamını listedeki adetle, ağırlıklı toplamını doğrudan toplamayla denetle.",
        ],
      },
      {
        title: "Ortancayı yazılış sırası belirlemez",
        paragraphs: [
          "Önce gözlemleri küçükten büyüğe sırala. Tek n için ortanca (n+1)/2. konumdadır; çift n için n/2 ile n/2+1. gözlemlerin aritmetik ortalamasıdır. 1, 4, 4, 7, 8, 9 listesinde iki orta 4 ve 7 olduğundan ortanca 5,5’tir. Ortancanın listede gözlenmiş bir değer olması gerekmez; sıralanmamış listenin ortadaki yazılı terimini almak güvenilir değildir.",
          "Frekans tablosunda aynı kuralı kümülatif sıra üzerinden uygula. 1 iki kez, 3 üç kez, 7 bir kez görülüyorsa ilk iki yer 1’e, üçüncüden beşinciye kadar yerler 3’e aittir. Altı gözlemin üçüncü ve dördüncü sırası 3 olduğu için ortanca 3’tür. Bir gözlemin değerini değiştirince sıralama da değişebilir; eski orta sıranın hangi değere ait olduğunu yeniden kontrol et.",
        ],
      },
      {
        title: "Modda hangi tanımı kullandığını açık tut",
        paragraphs: [
          "Mod en sık görülen değerle ilgilidir; en büyük sayı olması gerekmez. 1, 1, 3, 3, 8 grubunda 1 ve 3 ikişer kez, 8 bir kez görülür; iki tepe değer vardır. Yalnız bir farklı değer tekrar ediyorsa, örneğin 4, 4, 4 için, tepe değer 4’tür. Ortalama ve ortanca tek sayılı bir sonuç verirken mod birden çok değer veya tanıma göre boş sonuç olabilir.",
          "Bu dersin varsayılan OGM okul tanımında birden çok farklı değerin hepsi eş sıklıktaysa ayırt edici mod yoktur: 2, 2, 5, 5 için ‘mod yok’ denir. Atölyedeki alternatif ‘en yüksek sıklık’ tanımı ise bütün en büyük frekanslı değerleri listeler; aynı örnekte 2 ve 5 çıkar. Tanımı görünür seçmeden bu iki sonucu çelişen tek cevaplar gibi sunma. Bir kez görülenlerin hepsinde okul tanımı yine mod vermez.",
        ],
      },
      {
        title: "Ortalamayı toplama geri döndür",
        paragraphs: [
          "Ortalama toplamı gözlem sayısına dağıtır: n gözlemin ortalaması m ise toplam n·m’dir. Bir gözlem eklenir, silinir veya düzeltilirse önce yeni toplamı ve yeni adedi kur. Beş gözlemin ortalaması 6 iken 12 eklenirse yeni ortalama (30+12)/6=7 olur. Eski ortalamayla yeni gözlemi doğrudan ortalamak, eski beş gözlemi tek gözlem ağırlığına indirir.",
          "Gruplar birleştiğinde aynı düşünce geçerlidir. Dört kişinin ortalaması 50, sekiz kişinin 80 ise toplam 4·50+8·80=840, adet 12, birleşik ortalama 70’tir. (50+80)/2=65 hesabı, grupları eşit ağırlıklar; kişi sayıları farklıyken genellikle doğru değildir. İki grup ortalaması eşitse kişi sayıları farklı olsa da birleşik ortalama bu ortak değerdir; boş grubun ortalaması hesapta kullanılmaz.",
        ],
      },
      {
        title: "Uç değerin etkisini ölç, ezberleme",
        paragraphs: [
          "1, 3, 3, 5 grubunda ortalama ve ortanca 3’tür. Son gözlem 13 yapılınca toplam 8 artar; dört gözlemde ortalama 2 artarak 5 olur. Sıralı iki orta hâlâ 3 olduğundan ortanca 3 kalır; açıklık 4’ten 12’ye yükselir. Ortalamadaki değişim yalnız bir gözlem Δ kadar değiştiğinde Δ/n olur; adet aynı kalmalıdır.",
          "Bu örnek ‘ortanca uç değerden hiçbir zaman etkilenmez’ kanıtı değildir. Bir değer orta sıraları geçerse veya gözlem eklenip silinirse ortanca da değişebilir. Açıklık yalnız iki ucu görür; aynı en küçük ve en büyük değerlere sahip dağılımlar içeride çok farklı olabilir. Bir veri düzeltmesinde hangi ölçünün neden sabit kaldığını sıra, toplam ve frekans üzerinden ayrı açıkla.",
        ],
      },
      {
        title: "Sapmada kareleri ve paydayı kaybetme",
        paragraphs: [
          "Ortalamadan işaretli farkların toplamı sıfırdır; bunu yayılım sanma. Önce her farkı karele ve kareleri topla: Q=Σ(x−ortalama)². MEBİ’nin bu öğretimindeki örneklem varyansı Q/(n−1), örneklem standart sapması bunun kareköküdür; n en az 2 olmalıdır. 2, 4, 6 için ortalama 4, Q=8, örneklem varyansı 4 ve sapması 2’dir. Sapma gözlemin birimini, varyans birimin karesini taşır.",
          "Gözlemler incelenen anakütlenin tamamı olarak tanımlanırsa başka bir betimleme olan anakütle varyansı Q/n kullanılır; aynı listede 8/3, sapma √(8/3) olur. Soruda kapsam veya formül belirtilmeden iki paydayı birbirinin yerine geçirme. Atölye ikisini adlandırarak gösterir; varsayılan MEBİ n−1 hesabıdır. Tek gözlemde anakütle sapması 0, örneklem sapması tanımsızdır; boş veride merkez ölçüleri de yoktur.",
        ],
      },
      {
        title: "Bütün veriyi aynı kuralla dönüştür",
        paragraphs: [
          "Her gözleme aynı b sayısı eklenirse ortalama ve ortanca b kadar ötelenir; açıklık ve sapma değişmez. y=a·x+b dönüşümünde yeni ortalama a·ortalama+b, yeni standart sapma |a|·sapma, yeni varyans a²·varyanstır. a negatif olduğunda sıralama ters döner, fakat ortanca aynı doğrusal kuralla dönüşür. Standart sapma eksi olmaz; b yayılımı büyütmez.",
          "Örneğin 2, 4, 6 grubunun ortalaması 4 ve örneklem sapması 2 iken y=−2x+10 verileri 6, 2, −2 yapar. Yeni ortalama ve ortanca 2, açıklık 8, örneklem sapması 4’tür. a=0 bütün gözlemleri b’de toplar; n en az 2 ise sapma 0 olur. a sıfır değilken tekrar sayıları korunur, a=0 durumunda farklı değerler birleşir. Dönüşüm kuralını tek bir uç değeri değiştirmekle karıştırma.",
        ],
      },
      {
        title: "Histogramda genişlik de bilgi taşır",
        paragraphs: [
          "Histogram sayısal aralıkları bitişik dikdörtgenlerle gösterir. Sınırları açıkça tanımla: [0,5), [5,15), [15,30] seçilirse 5 yalnız ikinci, 15 yalnız üçüncü sınıfa girer; son 30 üçüncüde tutulur. Sınıf genişlikleri 5, 10 ve 15’tir. MEBİ’deki tam sayı yaş örneğinde kullanılan grup genişliği kuralı, o eş aralıklı okul kurulumuna aittir; bütün sürekli veriler için evrensel bir formül değildir.",
          "Farklı genişliklerde frekansı dikdörtgen alanıyla göstermek için yükseklik frekans/genişlik, yani frekans yoğunluğudur. Frekanslar 2, 4, 3 ise yükseklikler 0,4; 0,4; 0,2 olur; alanlar yeniden 2, 4, 3’tür. İlk iki yükseklik eşit olsa da ikinci sınıf iki kat genişlikte ve iki kat frekanstadır. Yükseklikleri doğrudan 2, 4, 3 yapmak geniş sınıfın alanını gereksiz büyütür; eksen birimini okumadan yüksek sütunu en sık sınıf sanma.",
        ],
      },
      {
        title: "Gruplandırma bazı cevapları saklar",
        paragraphs: [
          "Yalnız sınıf frekansları verildiyse gözlemlerin sınıf içinde nerede olduğunu bilmezsin. [0,10) aralığında dört, [10,20] aralığında altı kişi bilgisi, tek bir kesin ortalama vermez. Her grupta gözlemleri sınıf orta noktasında varsayarak bulunan sonuç bir tahmindir. Aynı frekansları koruyan farklı ham listeler farklı ortalama ve ortanca verebilir; sınıf etiketi tek tek gözlem değildir.",
          "Alt sınırları frekanslarla ağırlıklandırmak ortalama için bir alt sınır verir. Üst uçlar açık olan dolu sınıflar varsa benzer üst hesap tam alınamayabilir; yalnız yaklaşılabilir. Histogramdan en sık sınıfı belirlemekle o sınıf içindeki tek bir mod değerini bulmak da farklıdır. Atölyede yaklaşık orta nokta ortalaması açıkça ‘tahmin’ diye yazılır; bilinmeyen ham veriler üretilip kesin sonuçmuş gibi gösterilmez.",
        ],
      },
      {
        title: "Ortalama ve modla bilinmeyenleri sınırla",
        paragraphs: [
          "Bilinmeyenli veride ortalama bir toplam denklemi, ortanca sıra koşulu, mod ise tekrar koşulu verir. Bunları aynı denklem gibi kullanma. 1, 3, x, x+2, y tam sayılarının ortalaması 4 ise 2x+y=14 olur. Tek modun 3 olması için 3’ün yeniden görünmesi gerekir: x=3, x+2=3 veya y=3 adayları ayrı incelenir. Tekrarlanan başka değerleri saymadan ilk adayı doğru ilan etme.",
          "Bu örnekte x=3, y=8 listesi 1, 3, 3, 5, 8 olup tek modu 3’tür. x=1, y=12 hem 1’i hem 3’ü ikişer kez üretir; tek mod şartını bozduğu için elenir. y=3 ise x=5,5 olur ve tam sayı şartını bozar. Sonuç, verilen bütün koşullar birlikte doğrulandığında seçilir. Ortancayı bulacaksan nihai listeyi yeniden sırala; örnekte üçüncü değer 3’tür.",
        ],
      },
      {
        title: "Bir özet ölçü kişiye not vermez",
        paragraphs: [
          "Düşük standart sapma, belirtilen gözlemlerin daha az yayıldığını anlatır. Bir kişinin daha güvenli, dürüst, başarılı veya gelecekte kesin daha iyi olacağını kanıtlamaz. 10, 10, 10 puanının sapması 0; 90, 95, 100’ün sapması daha büyüktür. İlk grubun sırf sapması küçük diye daha yüksek başarı gösterdiği söylenemez. Ortalama, ölçek, ölçüm koşulu ve araştırma sorusu birlikte değerlendirilmelidir.",
          "Aynı ortalamada bile hangi öğrencinin yarışmaya seçileceği yalnız iki sayıdan zorunlu çıkmaz; açık bir seçim kuralı gerekir. Az gözlem, yanlı örneklem veya hatalı ölçüm bütün topluluk hakkında genelleme yapmayı sınırlar. İki özelliğin birlikte değişmesi tek başına nedensellik değildir. Son kontrolde ‘Bu sayı neyi betimliyor, hangi ek iddia için veri yetmiyor?’ sorularını ayrı cevapla.",
        ],
      },
    ],
    examples: [
      {
        title: "Uç değer değişirken merkezi izle",
        prompt:
          "1, 3, 3, 5 grubunda son gözlem 13 yapılıyor. Ortalama, ortanca ve açıklık nasıl değişir?",
        strategy:
          "Aynı adet için toplamı, orta sıraları ve iki ucu ayrı karşılaştır.",
        steps: [
          {
            label: "Önce",
            explanation: "Dört gözlemde toplam 12; ortalar 3 ve 3.",
            expression: "Ortalama 3; ortanca 3; açıklık 5−1=4",
          },
          {
            label: "Düzeltme",
            explanation: "Toplam 8 artar; yeni adet yine 4.",
            expression: "Yeni toplam 20; ortalama 20/4=5",
          },
          {
            label: "Sıra",
            explanation:
              "1,3,3,13 sıralamasında ortalar değişmez, sağ uç değişir.",
            expression: "Ortanca 3; açıklık 13−1=12",
          },
        ],
        answer: "Ortalama 3→5, ortanca 3→3, açıklık 4→12.",
        check: "Bir gözlemdeki 8 artış ortalamayı 8/4=2 artırır.",
        pitfall:
          "Bu tek örnekten ortancanın her değişimde sabit kaldığını çıkarmak.",
      },
      {
        title: "Üç satır, altı gözlem",
        prompt:
          "Değerler 1, 3, 7; frekansları sırasıyla 2, 3, 1. Ortalama ve ortanca?",
        strategy: "Frekansı hem toplamda hem sıra konumunda kullan.",
        steps: [
          {
            label: "Adet",
            explanation: "Tekrar sayıları gerçek gözlem adedidir.",
            expression: "n=2+3+1=6",
          },
          {
            label: "Toplam",
            explanation: "Her değer kaç kez görülüyorsa o ağırlıkla toplanır.",
            expression: "1·2+3·3+7·1=18; ortalama=3",
          },
          {
            label: "Sıra",
            explanation:
              "Açılmış liste 1,1,3,3,3,7; iki orta üçüncü ve dördüncüdür.",
            expression: "Ortanca=(3+3)/2=3",
          },
        ],
        answer: "Ortalama ve ortanca 3; üç farklı değer, altı gözlem vardır.",
        check: "Ortalama en küçük 1 ile en büyük 7 arasındadır.",
        pitfall: "(1+3+7)/3 ile tekrarları yok saymak.",
      },
      {
        title: "Grup ortalamalarının ağırlığı",
        prompt:
          "A grubunda 4 kişinin ortalaması 50 puan, B grubunda 8 kişinin 80 puan. Birleşik ortalama?",
        strategy: "Kişi sayısını ağırlık olarak koru.",
        steps: [
          {
            label: "Toplamlar",
            explanation: "Ortalama ile adedin çarpımı grup toplamıdır.",
            expression: "A:200; B:640 puan",
          },
          {
            label: "Birleştir",
            explanation: "Toplam ve adedi ayrı ayrı topla.",
            expression: "840 puan; 12 kişi",
          },
          {
            label: "Böl",
            explanation: "Bir kişiye düşen ortalama değeri bul.",
            expression: "840/12=70 puan",
          },
        ],
        answer:
          "70 puan; iki ortalamanın düz ortalaması 65 bu grup sayılarıyla doğru değildir.",
        check: "Daha kalabalık 80 puanlık gruba daha yakın bir sonuç bulundu.",
        pitfall: "Her grubu, kişi sayısından bağımsız tek gözlem saymak.",
      },
      {
        title: "Eksi çarpan sapmayı eksi yapmaz",
        prompt:
          "x=2,4,6 için örneklem sapması n−1 tanımıyla hesaplanıyor. y=−2x+10 için ortalama ve aynı tanımdaki sapma?",
        strategy: "Önce eski ölçüyü, sonra dönüşüm kuralını denetle.",
        steps: [
          {
            label: "Eski veri",
            explanation: "Ortalama 4; kareli sapmalar 4,0,4.",
            expression: "sₓ=√(8/2)=2",
          },
          {
            label: "Dönüştür",
            explanation: "Yeni liste 6,2,−2; sıralaması tersine döndü.",
            expression: "Ortalama −2·4+10=2",
          },
          {
            label: "Yayılım",
            explanation: "Sapma çarpanın mutlak değeriyle ölçeklenir.",
            expression: "sᵧ=|−2|·2=4",
          },
        ],
        answer: "Yeni ortalama 2, örneklem sapması 4; varyans 16.",
        check: "Yeni kareli sapmalar 16,0,16; 32/(3−1)=16.",
        pitfall: "b eklemesini sapmaya da eklemek veya negatif sapma yazmak.",
      },
      {
        title: "Eş yükseklik, farklı frekans",
        prompt:
          "Histogram sınıfları [0,5), [5,15), [15,30]; kişi sayıları 2,4,3. Alanın kişi sayısı olması için yükseklikler?",
        strategy: "Genişlikleri eşit sanma; alan=genişlik×yükseklik.",
        steps: [
          {
            label: "Genişlik",
            explanation: "Her üst-alt uç farkını ayrı hesapla.",
            expression: "5;10;15 puan",
          },
          {
            label: "Yoğunluk",
            explanation: "Kişi sayısını kendi sınıf genişliğine böl.",
            expression: "2/5=0,4;4/10=0,4;3/15=0,2 kişi/puan",
          },
          {
            label: "Alan",
            explanation: "Her yoğunluğu genişliğiyle geri çarp.",
            expression: "Alanlar 2;4;3 kişi, toplam 9 kişi",
          },
        ],
        answer:
          "0,4;0,4;0,2 kişi/puan; ilk iki yükseklik eşitken frekanslar farklıdır.",
        check: "5·0,4+10·0,4+15·0,2=9 kişi.",
        pitfall:
          "Farklı genişlikli sütunlarda yalnız yüksekliği frekans sanmak.",
      },
      {
        title: "Tek mod şartıyla adayları ele",
        prompt:
          "1,3,x,x+2,y tam sayılarının ortalaması 4 ve tek modu 3. x,y ve ortanca?",
        strategy:
          "Ortalama denklemine tekrar ve tam sayı koşullarını birlikte uygula.",
        steps: [
          {
            label: "Denklem",
            explanation: "Beş gözlem toplamı 20 olmalı.",
            expression: "1+3+x+x+2+y=20 ⇒ 2x+y=14",
          },
          {
            label: "Tekrar",
            explanation: "3 yeniden x, x+2 veya y konumunda görünmelidir.",
            expression: "x=3 veya x=1 veya y=3",
          },
          {
            label: "Eleme",
            explanation:
              "x=1 iki mod üretir; y=3, x=5,5 verip tam sayı şartını bozar. x=3 uygundur.",
            expression: "x=3,y=8; sıralı 1,3,3,5,8",
          },
        ],
        answer: "x=3,y=8; ortanca 3.",
        check:
          "Toplam 20, tek en yüksek frekans 3’e aittir; bütün şartlar sağlanır.",
        pitfall:
          "Tek bir 3 tekrarı gördükten sonra başka eş sıklık oluşup oluşmadığını saymamak.",
      },
    ],
    recall: [
      {
        prompt: "Frekans tablosunda adet hangi toplamdır?",
        answer:
          "Satır sayısı değil, frekansların toplamı; değer toplamı da Σ(x·f)’dir.",
      },
      {
        prompt: "Çift sayıda gözlemde ortanca listede bulunmak zorunda mı?",
        answer:
          "Hayır; sıralı iki ortanın ortalaması gözlenmemiş bir ara değer olabilir.",
      },
      {
        prompt: "İki grubun ortalamalarını ne ağırlıklandırır?",
        answer:
          "Her grubun gözlem sayısı; toplamları ve adetleri ayrı toplayıp böl.",
      },
      {
        prompt: "n ve n−1 neden birbirinin yerine konmaz?",
        answer:
          "Anakütlenin betimleyici sapması ile MEBİ’nin örneklem sapması farklı tanımlardır; sorunun kapsamı veya formülü belirlemelidir.",
      },
      {
        prompt: "Farklı genişlikli histogramda frekansı ne temsil eder?",
        answer:
          "Frekans yoğunluğu çizildiğinde alan; yükseklik tek başına kişi sayısı değildir.",
      },
      {
        prompt: "Daha küçük sapmadan kişi hakkında ne çıkar?",
        answer:
          "Yalnız belirtilen ölçümlerin daha az yayılması; gelecekte başarı, güvenlik veya ölçüm doğruluğu garantisi çıkmaz.",
      },
    ],
  },
];
const questions = [
  {
    prompt: "9,1,4,4,7,8 gözlemlerinin ortancası kaçtır?",
    correct: "5,5",
    distractors: ["4", "6", "7", "8"],
    hint: "Önce altı gözlemi sırala, üçüncü ve dördüncüyü ortala.",
    explanation:
      "Sıralı liste 1,4,4,7,8,9 olur. Altı gözlemin üçüncü değeri 4, dördüncüsü 7; ortanca (4+7)/2=5,5’tir. Ortanca listede bulunan bir değer olmak zorunda değildir.",
  },
  {
    prompt:
      "Değerleri 1,3,7 olan bir frekans tablosunda sıklıklar sırasıyla 2,3,1’dir. Aritmetik ortalama kaçtır?",
    correct: "3",
    distractors: ["6", "11/3", "18", "2"],
    hint: "Her değeri kendi sıklığıyla çarp; frekans toplamını payda yap.",
    explanation:
      "Toplam değer 1·2+3·3+7·1=18, gözlem sayısı 2+3+1=6 olur. Ortalama 18/6=3’tür. Yalnız üç farklı değer bulunması, gözlem sayısının üç olduğu anlamına gelmez.",
  },
  {
    prompt:
      "Bu soruda OGM okul tanımı kullanılıyor: en az iki farklı değerin tümü eş sıklıktaysa ayırt edici mod yok sayılır. 2,2,5,5 grubunun modu için doğru ifade?",
    correct: "Bu okul tanımında mod yoktur.",
    distractors: ["Yalnız 2’dir.", "Yalnız 5’tir.", "3,5’tir.", "7’dir."],
    hint: "İki farklı değerin frekanslarını karşılaştır; verilen tanımı uygula.",
    explanation:
      "2 ve 5’in frekansı ikişerdir; farklı değerlerin hepsi eş sıklıktadır. Soruda açıkça belirtilen okul tanımı bu durumda ayırt edici mod vermez. Ortanca 3,5 olsa da bu, mod hesabı değildir.",
  },
  {
    prompt:
      "A grubundaki 4 kişinin ortalaması 50, B grubundaki 8 kişinin ortalaması 80 puandır. 12 kişinin birleşik ortalaması kaç puandır?",
    correct: "70",
    distractors: ["65", "75", "60", "130"],
    hint: "Önce her grubun puan toplamını bul.",
    explanation:
      "Toplamlar 4·50=200 ve 8·80=640 puandır; birlikte 840 puan, 12 kişi vardır. 840/12=70 bulunur. 65, iki grup ortalamasını kişi sayıları eşitmiş gibi ağırlıklandıran yanlış sonuçtur.",
  },
  {
    prompt:
      "1,3,3,5 grubunda yalnız son gözlem 13 olarak düzeltiliyor; adet değişmiyor. Ortalama ve ortanca için doğru sonuç?",
    correct: "Ortalama 3’ten 5’e çıkar; ortanca 3 kalır.",
    distractors: [
      "Ortalama 5, ortanca 5 olur.",
      "Ortalama 3 kalır; ortanca 5 olur.",
      "Ortalama 7 olur; ortanca 3 kalır.",
      "İki ölçü de 3 kalır.",
    ],
    hint: "Toplam 8 artar; sıralı orta iki değeri ayrıca denetle.",
    explanation:
      "Eski toplam 12, yeni toplam 20; dört gözlemde ortalama 3’ten 5’e çıkar. 1,3,3,13 sıralamasının ortaları yine 3 ve 3 olduğundan ortanca 3’tür. Bu örnek ortancanın her koşulda sabit kalacağını kanıtlamaz.",
  },
  {
    prompt:
      "2,4,6 gözlemleri için örneklem standart sapması s=√[Σ(x−ortalama)²/(n−1)] olarak tanımlanıyor. s kaçtır?",
    correct: "2",
    distractors: ["√(8/3)", "4", "√8", "0"],
    hint: "Ortalama 4; kareli farklar toplamı 8’dir. Verilen paydayı koru.",
    explanation:
      "Farklar −2,0,2 ve kareler toplamı 8’dir. Verilen örneklem tanımında n−1=2, varyans 8/2=4 ve s=2 olur. √(8/3), başka bir tanım olan anakütle sapmasıdır; bu kartın formülüne uymaz.",
  },
  {
    prompt:
      "2,4,6 grubunun ortalaması 4 ve n−1 tanımındaki örneklem sapması 2’dir. Her gözlem y=−3x+5 ile dönüştürülüyor. Yeni ortalama ve aynı tanımdaki sapma?",
    correct: "Ortalama −7; sapma 6.",
    distractors: [
      "Ortalama −7; sapma −6.",
      "Ortalama 7; sapma 6.",
      "Ortalama −7; sapma 2.",
      "Ortalama 17; sapma 6.",
    ],
    hint: "Ortalama a·ortalama+b, sapma |a|·s kuralıyla dönüşür.",
    explanation:
      "Yeni liste −1,−7,−13; ortalama −7’dir. Sapma |−3|·2=6 olur; negatif çarpan sıralamayı ters çevirse de standart sapmayı negatif yapmaz. Sabit 5 eklenmesi yayılımı değiştirmez.",
  },
  {
    prompt:
      "Bir histogramın sınıfları [0,5),[5,15),[15,30]; kişi sayıları sırasıyla 2,4,3’tür. Düşey eksen kişi/puan cinsinden frekans yoğunluğudur. Üç yükseklik hangi sıradadır?",
    correct: "0,4; 0,4; 0,2",
    distractors: ["2; 4; 3", "10; 40; 45", "0,4; 0,2; 0,1", "0,2; 0,4; 0,3"],
    hint: "Her frekansı kendi sınıfının genişliğine böl.",
    explanation:
      "Genişlikler 5,10,15 puan olduğundan yoğunluklar 2/5=0,4;4/10=0,4;3/15=0,2 kişi/puandır. Yükseklik×genişlik alanı gerçek kişi sayısını verir; ilk iki yüksekliğin eşitliği frekanslarının eşitliği değildir.",
  },
  {
    prompt:
      "Yalnız şu sınıf bilgisi biliniyor: [0,10) puan aralığında 4 öğrenci, [10,20] aralığında 6 öğrenci var. Sınıf içindeki tek tek puanlar verilmemiş. Kesin aritmetik ortalama hakkında ne söylenir?",
    correct: "Kesin belirlenemez; sınıf içindeki puanlar bilinmiyor.",
    distractors: [
      "Kesinlikle 11’dir.",
      "Kesinlikle 12’dir.",
      "Kesinlikle 10’dur.",
      "Kesinlikle 20’dir.",
    ],
    hint: "Aynı sınıf frekanslarını koruyan farklı ham puanlar seçebilirsin.",
    explanation:
      "Orta noktalarla 11 bulunması bir tahmindir. İlk sınıfta herkes 1, ikinci sınıfta 11 alsa ortalama 7; herkes sırasıyla 9 ve 19 alsa 15 olur. İkisi de verilen frekanslara uyar, bu yüzden tek kesin ortalama yoktur.",
  },
  {
    prompt:
      "A’nın üç deneme puanı 70,70,70; B’nin 60,70,80’dir. n−1 tanımıyla sapmalar sırasıyla 0 ve 10, ortalamalar ikisinde 70’tir. Yalnız bu ölçümlerden hangi çıkarım geçerlidir?",
    correct:
      "A’nın gözlenen puanları daha az yayılmıştır; gelecekteki başarı garanti edilmez.",
    distractors: [
      "A gelecekte kesin daha başarılıdır.",
      "A’nın gerçek bilgi düzeyi hatasız ölçülmüştür.",
      "B’nin ortalaması daha düşüktür.",
      "B’nin standart sapması negatiftir.",
    ],
    hint: "Bir betimleme ölçüsünü kişiye veya geleceğe ilişkin garantiye dönüştürme.",
    explanation:
      "A’nın bu üç puanı eşit, B’ninkiler 70 çevresinde yayılmıştır. Sapma bu gözlenen yayılımı betimler. Ölçümün doğruluğu, kişinin güvenilirliği veya gelecek sınav başarısı yalnız bu üç puan ve sapma üzerinden kanıtlanamaz.",
  },
];
export const forge015MathLessons: Lesson[] = [
  {
    id,
    subjectId: "tyt-matematik",
    title: txt("Veri analizi: gözlemden ölçüye, ölçüden yoruma"),
    minutes: 85,
    objectives: objectives.map(txt),
    body: forge015MathGuides[0].sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    source: txt(source),
    tags: ["detail-225", "Özgün öğretim soruları"],
    questions: questions.map((q, i) => {
      const options = [q.correct, ...q.distractors],
        answer = (i * 2 + 1) % 5;
      return {
        id: `${id}-015-${i + 1}`,
        prompt: txt(q.prompt),
        options: options.map((_, j) => txt(options[(j - answer + 5) % 5])),
        answer,
        hint: txt(q.hint),
        explanation: txt(q.explanation),
        skill: id,
      };
    }),
  },
];

export type ModePolicy = "school" | "maxFrequency";
export type FrequencyRow = { value: number; frequency: number };
function finite(...values: number[]) {
  if (!values.every(Number.isFinite)) throw new RangeError("FINITE_STATISTICS");
}
export function describeData(
  values: readonly number[],
  policy: ModePolicy = "school",
) {
  if (!["school", "maxFrequency"].includes(policy))
    throw new RangeError("MODE_POLICY");
  values.forEach((v) => finite(v));
  const sorted = values.map((v) => (v === 0 ? 0 : v)).sort((a, b) => a - b);
  const n = sorted.length,
    sum = sorted.reduce((a, b) => a + b, 0);
  finite(sum);
  const frequency: FrequencyRow[] = [];
  for (const value of sorted) {
    const row = frequency.at(-1);
    if (row?.value === value) row.frequency += 1;
    else frequency.push({ value, frequency: 1 });
  }
  const mean = n ? sum / n : null;
  const median = n
    ? n % 2
      ? sorted[(n - 1) / 2]
      : sorted[n / 2 - 1] / 2 + sorted[n / 2] / 2
    : null;
  const maxFrequency = Math.max(0, ...frequency.map((r) => r.frequency));
  const equalFrequencies =
    frequency.length > 1 &&
    frequency.every((r) => r.frequency === maxFrequency);
  const modes =
    policy === "school" && (maxFrequency < 2 || equalFrequencies)
      ? []
      : frequency
          .filter((r) => r.frequency === maxFrequency)
          .map((r) => r.value);
  const squareSum =
    mean === null ? null : sorted.reduce((s, x) => s + (x - mean) ** 2, 0);
  const populationVariance = squareSum === null ? null : squareSum / n;
  const sampleVariance =
    squareSum === null || n < 2 ? null : squareSum / (n - 1);
  const populationSD =
    populationVariance === null ? null : Math.sqrt(populationVariance);
  const sampleSD = sampleVariance === null ? null : Math.sqrt(sampleVariance);
  const range = n ? sorted[n - 1] - sorted[0] : null;
  [
    mean,
    median,
    squareSum,
    populationVariance,
    sampleVariance,
    populationSD,
    sampleSD,
    range,
  ].forEach((v) => {
    if (v !== null) finite(v);
  });
  return {
    n,
    sum,
    sorted,
    frequency,
    mean,
    median,
    maxFrequency,
    equalFrequencies,
    modes,
    squareSum,
    populationVariance,
    sampleVariance,
    populationSD,
    sampleSD,
    range,
  };
}
export function expandFrequency(rows: readonly FrequencyRow[]) {
  const values: number[] = [];
  for (const row of rows) {
    finite(row.value, row.frequency);
    if (
      !Number.isInteger(row.frequency) ||
      row.frequency < 0 ||
      values.length + row.frequency > 10000
    )
      throw new RangeError("FREQUENCY_SCOPE");
    for (let i = 0; i < row.frequency; i++) values.push(row.value);
  }
  return values;
}
export function transformData(values: readonly number[], a: number, b: number) {
  finite(a, b);
  return values.map((x) => {
    finite(x);
    const y = a * x + b;
    finite(y);
    return y === 0 ? 0 : y;
  });
}
export function combineMeans(
  groups: readonly { count: number; mean: number }[],
) {
  let count = 0,
    sum = 0;
  const active: number[] = [];
  for (const group of groups) {
    finite(group.count, group.mean);
    if (!Number.isInteger(group.count) || group.count < 0)
      throw new RangeError("GROUP_COUNT");
    count += group.count;
    sum += group.count * group.mean;
    if (group.count) active.push(group.mean);
  }
  finite(count, sum);
  const weighted = count ? sum / count : null;
  const unweighted = active.length
    ? active.reduce((s, x) => s + x, 0) / active.length
    : null;
  if (unweighted !== null) finite(unweighted);
  return { count, sum, weighted, unweighted };
}
export function histogramData(
  edges: readonly number[],
  frequencies: readonly number[],
) {
  if (edges.length < 2 || frequencies.length !== edges.length - 1)
    throw new RangeError("HISTOGRAM_SHAPE");
  edges.forEach((v) => finite(v));
  const bins = frequencies.map((frequency, i) => {
    finite(frequency);
    const width = edges[i + 1] - edges[i];
    if (!Number.isInteger(frequency) || frequency < 0 || width <= 0)
      throw new RangeError("HISTOGRAM_BIN");
    const density = frequency / width;
    finite(width, density);
    return {
      lower: edges[i],
      upper: edges[i + 1],
      upperInclusive: i === frequencies.length - 1,
      width,
      frequency,
      density,
    };
  });
  const total = frequencies.reduce((s, f) => s + f, 0);
  finite(total);
  const midpointEstimate = total
    ? bins.reduce((s, b) => s + (b.lower / 2 + b.upper / 2) * b.frequency, 0) /
      total
    : null;
  const meanLower = total
    ? bins.reduce((s, b) => s + b.lower * b.frequency, 0) / total
    : null;
  const meanUpper = total
    ? bins.reduce((s, b) => s + b.upper * b.frequency, 0) / total
    : null;
  [midpointEstimate, meanLower, meanUpper].forEach((v) => {
    if (v !== null) finite(v);
  });
  return {
    bins,
    total,
    midpointEstimate,
    meanLower,
    meanUpper,
    upperAttainable:
      total > 0 && bins.every((b) => !b.frequency || b.upperInclusive),
  };
}
export function parseObservations(text: string): {
  values: number[];
  error: string | null;
} {
  if (!text.trim()) return { values: [], error: null };
  const parts = text
    .trim()
    .split(/[;\n]/)
    .map((p) => p.trim());
  if (parts.length > 24)
    return {
      values: [],
      error: "Bu atölyede en çok 24 gözlem kullanabilirsin.",
    };
  if (parts.some((p) => !/^[+−-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(p)))
    return {
      values: [],
      error: "Gözlemleri noktalı virgülle ayır; her parça tek bir sayı olmalı.",
    };
  const values = parts.map((p) =>
    Number(p.replace("−", "-").replace(",", ".")),
  );
  if (values.some((v) => !Number.isFinite(v) || v < -50 || v > 100))
    return {
      values: [],
      error: "Bu çizimde her gözlem −50 ile 100 arasında olmalı.",
    };
  return { values, error: null };
}
export function observationPlot(values: readonly number[]) {
  if (values.length > 24) throw new RangeError("STATISTICS_PLOT_COUNT");
  const summary = describeData(values);
  const lower = values.length ? Math.floor(summary.sorted[0] - 1) : 0;
  const upper = values.length ? Math.ceil(summary.sorted.at(-1)! + 1) : 1;
  if (!Number.isFinite(upper - lower) || upper <= lower)
    throw new RangeError("STATISTICS_PLOT_DOMAIN");
  const x = (value: number) => 70 + (460 * (value - lower)) / (upper - lower);
  const packed: {
    value: number;
    originalIndex: number;
    x: number;
    lane: number;
  }[] = [];
  values.forEach((value, originalIndex) => {
    const at = x(value);
    let lane = 0;
    while (packed.some((p) => p.lane === lane && Math.abs(p.x - at) < 14))
      lane += 1;
    packed.push({ value, originalIndex, x: at, lane });
  });
  const maxStack = Math.max(1, ...packed.map((p) => p.lane + 1));
  const baseline = Math.max(190, 45 + 18 * maxStack);
  const points = packed.map((p) => ({
    value: p.value,
    originalIndex: p.originalIndex,
    x: p.x,
    y: baseline - 16 - 18 * p.lane,
  }));
  return {
    lower,
    upper,
    baseline,
    height: baseline + 65,
    points,
    meanX: summary.mean === null ? null : x(summary.mean),
    medianX: summary.median === null ? null : x(summary.median),
  };
}
