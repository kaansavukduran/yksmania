import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
type Problem = {
  prompt: string;
  correct: string;
  distractors: string[];
  hint: string;
  explanation: string;
};
type Pack = LessonGuide & {
  topic: string;
  title: string;
  questions: Problem[];
};
const packs: Pack[] = [
  {
    id: "grafik-problemleri",
    topic: "detail-220",
    title: "Grafik problemleri: veriyi oku, temsili sorgula",
    minutes: 65,
    objectives: [
      "Eksen, birim, veri türü ve ölçeği okuyup grafiği tabloya dönüştür.",
      "Sütun, çizgi, daire ve eş genişlikli histogramı amaçlarına göre kullan.",
      "Miktar, yüzde, açı, değişim ve temel istatistikleri aynı veriyle denetle.",
    ],
    sections: [
      {
        title: "Önce grafiğin neyi ölçtüğünü bul",
        paragraphs: [
          "Grafiğin başlığı, gözlem grubu ve zamanı hangi soruya cevap verilebileceğini belirler. Yatay eksende ay, kulüp adı veya puan aralığı bulunması aynı şey değildir. Düşey eksen kişi sayısıysa 20 bir frekanstır; sıcaklıksa bir ölçüm değeridir. Bir sayıdan önce neyin sayıldığını ve birimini söyle.",
          "Kesikli veride aradaki her gerçek değer mümkün değildir: öğrenci sayısı 12,5 olamaz. Sürekli bir büyüklük olan uzunluk ise ölçüm hassasiyetine göre kaydedilir. Grafikte birkaç ölçüm bulunması, bu noktalar arasındaki bütün değerlerin gözlendiği anlamına gelmez; veri ile varsayımı ayrı tut.",
        ],
      },
      {
        title: "Sütunlar kategorileri aynı ölçekle karşılaştırır",
        paragraphs: [
          "Sütun grafiğinde ayrı kategorilerin değerleri aynı eksen ölçeğine yerleştirilir. Aynı genişlikte çizilen sütunların yüksekliği miktarı temsil eder. A=60 ve B=65 kişiyse gerçek oran B/A=65/60’tır. Kategori sırası zaman sırası değilse sütunların uçlarını çizgiyle birleştirmek yeni bir süreç kanıtı üretmez.",
          "Sütun eksenini sıfırdan başlatmak yükseklik oranını veri oranıyla uyumlu tutar. Eksen 50’den başlarsa 60 ve 65 değerleri 10 ve 15 birim yükseklikte görünür; görünür oran 1,5 iken gerçek oran yaklaşık 1,083’tür. Kesilmiş eksen açıkça belirtilmelidir; ekseni değiştirmek sayıları değiştirmez.",
        ],
      },
      {
        title: "Dairede payın paydası bütünün toplamıdır",
        paragraphs: [
          "Aynı bütünü parçalayan, çakışmayan kategoriler için pay=v/toplam, yüzde=100v/toplam ve merkez açısı=360v/toplam olur. 20,30,50 kişilik üç ayrık grup toplam 100 kişidir; ikinci grubun payı %30 ve açısı 108°’dir. Bir kişi iki kategoride sayılmışsa bu toplamı tek kişi bütünü diye kullanamazsın.",
          "Bir kategori artarken diğerleri sabit kalsa toplam da değişir. Başta 20/100 olan pay, o kategoriye 10 kişi eklenince 30/110 olur; %30 değildir. Bütün değerler sıfırsa toplam sıfırdır ve yüzde/açı tanımsızdır. Boş bir daireye üç eşit dilim çizip veri varmış gibi gösterilmez.",
        ],
      },
      {
        title: "Çizgi grafiğinde değişim ile değişim hızı ayrıdır",
        paragraphs: [
          "Konum-zaman grafiğinde iki ölçüm arasındaki ortalama işaretli hız, konum farkının zaman farkına oranıdır. 2. saniyede 60 m ve 5. saniyede 90 m varsa fark 30 m, süre 3 s ve oran 10 m/s olur. Zaman aralıkları eşit değilken yalnız düşey artışları karşılaştırmak hızları karşılaştırmaz.",
          "Noktaları doğru parçalarıyla birleştirmek aralarda doğrusal değişim varsayımı kurabilir; bu varsayım soruda belirtilmelidir. Yalnız iki anın ölçümü verildiyse aradaki bir anda kesin değer bilinmez. Yatay doğru sabit değer, aşağı eğimli doğru azalan değer gösterir; azalma her büyüklükte negatif değer demek değildir.",
          "İki seri aynı anda aynı yüksekliğe ulaştığında yalnız ölçülen değerleri eşittir; artış hızlarının eşitliği çıkmaz. Özgün bir modelde A=12+3t L, B=18+t L ve 0≤t≤5 saat olsun. Eşitlik 12+3t=18+t ile t=3 saatte, 21 L’de oluşur; hızlar yine 3 ve 1 L/saat olarak farklıdır. t<3 için B, t>3 için A daha yüksektir. Genel eğrilerde kesişim yalnız bir değme de olabilir; sıralamanın değiştiğini söylemeden önce iki komşu aralığı kontrol et.",
        ],
      },
      {
        title: "Toplam, fark, oran ve yüzde farklı sorulardır",
        paragraphs: [
          "Bir dönemin toplamı parçaların toplamıdır; iki dönem arasındaki artış son−ilk farkıdır. Yüzde değişim ise 100·(son−ilk)/ilk biçimindedir ve ilk değer sıfırsa bu oran tanımlı değildir. 40’tan 50’ye çıkış 10 birim ve %25 artıştır; 50’den 40’a iniş aynı farkla %20 azalıştır.",
          "Yüzdelerin ortalaması grupların büyüklükleri eşit değilse genel yüzdeyi vermez. 10 kişinin %80’i ile 30 kişinin %40’ı toplamda 8+12=20 kişi yapar; 40 kişide %50. Grafiklerden işlem seçerken önce bir tablo kur, toplamın veya başlangıç değerinin hangi payda olduğunu açıkça yaz.",
        ],
      },
      {
        title: "Histogramda sınıf aralığı da verinin parçasıdır",
        paragraphs: [
          "Histogram, sayısal verileri aralıklara ayırıp frekanslarını bitişik dikdörtgenlerle gösterir. Bu modelde bütün sınıf genişlikleri eşittir; dolayısıyla yükseklik frekansı gösterir. [0,10),[10,20),[20,30] sınıflarında 10 ikinci, 20 üçüncü sınıfa girer; ortak sınır iki kez sayılmaz.",
          "Farklı genişlikte sınıflar kullanılırsa alanı frekansla orantılı tutmak için frekans yoğunluğu gerekir; yalnız yüksekliği karşılaştırmak yanıltır. Sınıf toplamı bilinirken sınıf içindeki tam değerler bilinmeyebilir. Bir puan aralığında yedi kişi olması, bu kişilerin hepsinin aralığın orta noktasında olduğunu göstermez.",
        ],
      },
      {
        title: "Ortalama, ortanca ve tepe değerini ayrı hesapla",
        paragraphs: [
          "Aritmetik ortalama bütün değerlerin toplamının gözlem sayısına bölümüdür. Ortanca için veriler önce sıralanır; çift sayıda gözlem varsa ortadaki iki değer ortalanır. En sık görülen değer moddur; birden fazla mod olabilir. 2,3,3,8 verilerinde ortalama 4, ortanca 3, mod 3’tür.",
          "Frekans tablosunda her değeri frekansı kadar say: değerler 1,2,3 ve frekanslar 2,3,1 ise toplam 1·2+2·3+3·1=11, gözlem sayısı 6’dır. Üç satır var diye 11’i 3’e bölme. Kategori adlarına sayısal bir ortalama atamak da anlamlı değildir; sayılar kategorilerin sayısını mı, gerçek ölçümü mü temsil ediyor denetle.",
          "Frekans tablosundan ortanca bulurken sıralı konumları frekanslarla say. Değerler 2,5,9 ve frekanslar 3,2,1 ise sıralı gözlemler 2,2,2,5,5,9 olur. Altı gözlemin üçüncüsü 2, dördüncüsü 5 olduğundan ortanca (2+5)/2=3,5’tir. Yalnız üç farklı değeri sıralayıp ortadaki 5’i almak gözlemlerin tekrarlarını atlar.",
          "İki grubun birleşik ortalamasında ağırlıklar grup büyüklükleridir: (n₁m₁+n₂m₂)/(n₁+n₂), toplam kişi sayısı pozitifken kullanılır. Sekiz kişinin ortalaması 50, on iki kişinin 70 ise toplam puan 8·50+12·70=1240 ve birleşik ortalama 1240/20=62’dir. İki ortalamanın düz ortalaması 60, grup sayıları farklı olduğundan bu bütünü temsil etmez.",
        ],
      },
      {
        title: "Yayılımı ölç, güvenilirlik iddiasını sınırlı tut",
        paragraphs: [
          "Açıklık en büyük ile en küçük değerin farkıdır; yalnız iki uca bakar. Bu kaynakta örneklem standart sapması, ortalamadan farkların kareleri toplamını n−1’e bölüp karekök alarak tanımlanır; n≥2 gerekir. 2,4,6 için ortalama 4, kareler toplamı 8 ve standart sapma √(8/2)=2’dir.",
          "Küçük standart sapma değerlerin ortalamaya yakınlığını anlatır; ölçümün doğru, güvenli veya araştırmanın tarafsız olduğunu tek başına kanıtlamaz. Aynı ortalamalı iki grup farklı yayılıma sahip olabilir. Sonuçta grafik ve tablo toplamlarını, yüzdelerde 100’ü, açılarda 360°’yi ve hesapta kullanılan birimi birlikte kontrol et.",
        ],
      },
    ],
    examples: [
      {
        title: "Sütundan daireye",
        prompt:
          "Üç ayrık kulüpte 24,36,60 kişi var. İkinci kulübün payı ve daire açısı nedir?",
        strategy: "Önce tek bütünü hesapla.",
        steps: [
          {
            label: "Toplam",
            expression: "24+36+60=120",
            explanation: "Kulüpler ayrık olduğundan kişi iki kez sayılmaz.",
          },
          {
            label: "Pay",
            expression: "36/120=3/10",
            explanation: "İstenen grubun sayısını bütüne böl.",
          },
          {
            label: "Açı",
            expression: "360·3/10=108°",
            explanation: "Aynı pay yüzde 30’dur.",
          },
        ],
        answer: "%30 ve 108°.",
        check: "72°+108°+180°=360°.",
        pitfall: "Grup sayısını payda almak.",
      },
      {
        title: "Eğimde zaman farkını koru",
        prompt:
          "Doğrusal iki konum ölçümü (2 s,60 m) ve (5 s,90 m). Bu aralığın hızı?",
        strategy: "Konum ve zamanı ayrı çıkar.",
        steps: [
          {
            label: "Konum farkı",
            expression: "90−60=30 m",
            explanation: "Düşey değişim bulunur.",
          },
          {
            label: "Zaman farkı",
            expression: "5−2=3 s",
            explanation: "Yatay aralık bir saniye değildir.",
          },
          {
            label: "Oran",
            expression: "30/3=10 m/s",
            explanation: "İşaret pozitiftir.",
          },
        ],
        answer: "10 m/s.",
        check: "3 saniyede 10·3=30 m ilerleme.",
        pitfall: "30’u doğrudan hız sanmak.",
      },
      {
        title: "Frekans satırı gözlem değildir",
        prompt: "1,2,3 değerlerinin frekansları 2,3,1. Ortalama nedir?",
        strategy: "Değer ile frekansı çarp.",
        steps: [
          {
            label: "Ağırlıklı toplam",
            expression: "1·2+2·3+3·1=11",
            explanation: "Altı gözlemin toplamı.",
          },
          {
            label: "Gözlem sayısı",
            expression: "2+3+1=6",
            explanation: "Üç farklı değer, altı gözlem vardır.",
          },
          {
            label: "Ortalama",
            expression: "11/6",
            explanation: "Bölme gerçek gözlem sayısıyla yapılır.",
          },
        ],
        answer: "11/6.",
        check: "1 ile 3 arasında bulunur.",
        pitfall: "Tablo satır sayısı 3’e bölmek.",
      },
      {
        title: "Standart sapmada n−1",
        prompt:
          "2,4,6 için örneklem standart sapmasını hesapla; payda n−1 olsun.",
        strategy: "Ortalamadan uzaklıkları kullan.",
        steps: [
          {
            label: "Merkez",
            expression: "(2+4+6)/3=4",
            explanation: "Önce ortalama bulunur.",
          },
          {
            label: "Kare toplamı",
            expression: "(2−4)²+0²+(6−4)²=8",
            explanation: "Negatif farkın karesi pozitiftir.",
          },
          {
            label: "Karekök",
            expression: "√(8/(3−1))=2",
            explanation: "Örneklem tanımı gereği payda 2.",
          },
        ],
        answer: "2.",
        check: "Açıklık 4, sapma 2; aynı ölçüt değiller.",
        pitfall: "Verilen tanıma rağmen n’e bölmek.",
      },
    ],
    recall: [
      {
        prompt: "Çizgide iki nokta arasındaki her değer bilinir mi?",
        answer:
          "Yalnız doğrusal değişim gibi açık bir varsayım varsa ara değer hesaplanabilir.",
      },
      {
        prompt: "Toplam sıfırken daire yüzdesi nedir?",
        answer: "Tanımsızdır; sıfıra bölme yapıp yapay dilim üretilemez.",
      },
      {
        prompt: "Mod her zaman tek midir?",
        answer:
          "Hayır; eşit en yüksek frekansta birden çok tepe değer bulunabilir.",
      },
      {
        prompt: "Küçük sapma doğru ölçüm kanıtı mı?",
        answer:
          "Hayır; yayılımı anlatır, ölçüm doğruluğunu veya tarafsızlığı kanıtlamaz.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri PDF s. 109–112 (basılı s. 107–110); Aurelia 027 Grafik Problemleri ve 037 Veri Analizi (İstatistik), öğretim PDF s. 1–3,5–7. Özgün veri ve çözümler; eksen, ara değer, iki seri, frekans ve ağırlıklı ortalama koşulları korunur. Resmî sınav sorusu değildir.",
    questions: [
      {
        prompt:
          "Birbirinden ayrık üç kulüpte sırasıyla 20,30,50 kişi vardır. Bu 100 kişinin daire grafiğinde ikinci kulübün merkez açısı kaç derecedir?",
        correct: "108",
        distractors: ["30", "72", "120", "180"],
        hint: "Önce ikinci grubun bütüne oranını bul; 360° ile çarp.",
        explanation:
          "Toplam 100 kişidir. İkinci kulübün payı 30/100=3/10 olduğundan merkez açısı 360·3/10=108° olur. Kişi sayısı veya yüzde ile derece aynı nicelik değildir.",
      },
      {
        prompt:
          "150 kişilik ayrık grupların daire grafiğinde bir grubun açısı 72°’dir. Bu grupta kaç kişi vardır?",
        correct: "30",
        distractors: ["20", "36", "60", "72"],
        hint: "72/360 bütünün ne kadarıdır?",
        explanation:
          "Dilim payı 72/360=1/5’tir. 150 kişinin beşte biri 30 kişidir. 72 açı birimindedir; kişi sayısını doğrudan göstermez. Bütün dilimler aynı 150 kişilik toplamı paylaşır.",
      },
      {
        prompt:
          "Bir aracın konum-zaman grafiği 2. saniyede 60 m ve 5. saniyede 90 m noktalarını bir doğru parçasıyla birleştiriyor. Bu aralıktaki sabit işaretli hız kaç m/s’dir?",
        correct: "10",
        distractors: ["6", "15", "18", "30"],
        hint: "İki konumun farkını iki zamanın farkına böl.",
        explanation:
          "Konum farkı 90−60=30 m, geçen süre 5−2=3 saniyedir. Doğru parçasının eğimi 30/3=10 m/s olur. Sadece 30 m farkını hız diye almak zaman aralığını göz ardı eder.",
      },
      {
        prompt:
          "A,B,C ayrık gruplarında 20,30,50 kişi var. Yalnız C’ye 20 yeni kişi ekleniyor. Yeni toplamda C’nin payı hangi kesirdir?",
        correct: "7/12",
        distractors: ["1/2", "7/10", "5/12", "2/3"],
        hint: "C ile toplamın ikisini de güncelle.",
        explanation:
          "C 70 kişiye, toplam 120 kişiye çıkar. Yeni pay 70/120=7/12 olur. Eski toplam 100’ü paydada tutmak 7/10 üretir ama eklenen 20 kişiyi bütünde saymamış olur.",
      },
      {
        prompt:
          "Sütun grafiğinde A=60, B=65 kişidir. Düşey eksen 50’den başlatılmış olsa da gerçek B/A kişi sayısı oranı kaçtır?",
        correct: "13/12",
        distractors: ["3/2", "2/3", "12/13", "5"],
        hint: "Eksen başlangıcı veri değerlerini değiştirmez.",
        explanation:
          "Gerçek oran 65/60=13/12’dir. Kesilmiş eksende görünen yükseklikler 15 ve 10 olduğundan görsel oran 3/2 çıkar; bu sayıları gerçek kişi sayısı yerine kullanmak yanıltır.",
      },
      {
        prompt:
          "2,3,3,8 veri grubunun aritmetik ortalaması, ortancası ve modu sırasıyla nedir?",
        correct: "4;3;3",
        distractors: ["3;4;3", "4;4;3", "3;3;4", "4;3;8"],
        hint: "Toplamı dörde böl, sonra sıralı ortayı ve en sık değeri ayır.",
        explanation:
          "Toplam 16 olduğundan ortalama 4’tür. Sıralı ortadaki iki değer 3 ve 3, ortancaları 3’tür. En çok tekrar eden 3 moddur. Uçtaki 8 ortalamayı yükseltir ama modu yapmaz.",
      },
      {
        prompt:
          "Bir ölçüm tablosunda değerler 1,2,3; bu değerlerin frekansları sırasıyla 2,3,1’dir. Altı gözlemin ortalaması kaçtır?",
        correct: "11/6",
        distractors: ["2", "11/3", "6/11", "3/2"],
        hint: "Her değeri kaç kez görüldüğüyle çarp.",
        explanation:
          "Ağırlıklı toplam 1·2+2·3+3·1=11, gözlem sayısı 2+3+1=6’dır. Ortalama 11/6 olur. Üç satır üç gözlem değildir; tablo tekrarları frekans sütununda saklar.",
      },
      {
        prompt:
          "Eş genişlikli histogramda [0,10),[10,20),[20,30] puan aralıklarının frekansları 4,7,5’tir. Puanı en az 10 olanların bütün gruba oranı yüzde kaçtır?",
        correct: "75",
        distractors: ["25", "43,75", "50", "80"],
        hint: "10 ikinci aralığa dahildir; son iki frekansı topla.",
        explanation:
          "En az 10 puan alanlar 7+5=12 kişidir. Bütün grup 4+7+5=16 kişi olduğundan 12/16=%75 olur. Ortak uçlar yalnız bir aralığa dahil edilmiştir; 10 ilk sınıfta tekrar sayılmaz.",
      },
      {
        prompt:
          "2,4,6 ölçümleri için örneklem standart sapması, ortalamadan farkların kareleri toplamını n−1’e bölüp karekök alarak hesaplanıyor. Sonuç kaçtır?",
        correct: "2",
        distractors: ["√2", "4", "√(8/3)", "8"],
        hint: "Önce ortalama 4’ten farkların karelerini topla.",
        explanation:
          "Ortalama 4, kareler toplamı 4+0+4=8’dir. n=3 ve belirtilen payda n−1=2 olduğundan standart sapma √(8/2)=2 olur. n ile bölmek farklı bir tanımı kullanır.",
      },
      {
        prompt: "5,9,1,7 verilerinin ortancası kaçtır?",
        correct: "6",
        distractors: ["5", "5,5", "7", "9"],
        hint: "Ortanca için önce küçükten büyüğe sırala.",
        explanation:
          "Sıralama 1,5,7,9’dur. Dört gözlemde ortadaki iki değerin ortalaması (5+7)/2=6 alınır. Verilerin ilk yazılışındaki orta konumları kullanmak sıralama koşulunu atlar.",
      },
    ],
  },
  {
    id: "kumeler",
    topic: "detail-222",
    title: "Kümeler: elemandan Venn hesabına",
    minutes: 65,
    objectives: [
      "Eleman, alt küme, boş küme ve eşitliği doğru sembollerle ayır.",
      "Birleşim, kesişim, fark ve tümleyeni liste ile Venn arasında dönüştür.",
      "İki kümeli problemleri ayrık bölgelere ayır; bütün ve bağlaç koşullarını koru.",
    ],
    sections: [
      {
        title: "Küme iyi tanımlı elemanlardan oluşur",
        paragraphs: [
          "Bir nesnenin kümeye girip girmediği belirli olmalıdır. “Bu sınıfta boyu 170 cm’den uzun öğrenciler” ölçüm bağlamı belli olduğunda iyi tanımlıdır; “en güzel öğrenciler” ölçüt verilmeden değildir. Liste yönteminde her farklı eleman bir kez sayılır; {1,1,2} ile {1,2} aynı kümedir.",
          "x∈A bir nesnenin A’nın elemanı olduğunu söyler; X⊆A ise X’in bütün elemanlarının A’da olduğunu söyler. 2∈{1,2} doğru, {2}⊆{1,2} doğru ifadelerdir. Bir öğeyi içeren tek elemanlı küme, o öğenin kendisi değildir; küme parantezlerini dikkatsizce kaldırma.",
        ],
      },
      {
        title: "Boş küme ile boş kümeyi içeren küme farklıdır",
        paragraphs: [
          "∅ veya {} hiçbir elemanı olmayan aynı boş kümeyi gösterir ve eleman sayısı sıfırdır. {∅} ise tek elemanlıdır: elemanı boş kümedir. ∅ ile {}’yi iki farklı nesne sayıp {∅,{}} kümesini iki elemanlı sanma; içteki iki gösterim aynı nesneyi anlatır.",
          "Sonlu kümenin eleman sayısı bir doğal sayıdır; boş küme de sonludur. Doğal sayılar kümesi sonsuzdur. Üzerinde işlem yaptığımız evrensel küme E önceden seçilir ve A,B gibi incelenen kümeleri kapsar. Bir problemin bütün öğrencileri ile dünyadaki bütün insanlar farklı evrensel kümelerdir.",
        ],
      },
      {
        title: "Alt küme bir eleman seçme kararıdır",
        paragraphs: [
          "A’nın her elemanı B’deyse A⊆B; ayrıca A≠B ise A, B’nin öz alt kümesidir. Burada ⊆ eşitliğe izin verir, öz alt küme için eşitsizlik ayrıca belirtilir. Boş küme her kümenin alt kümesidir; her küme kendisinin alt kümesidir. Bunlar elemanlık önermeleri değildir.",
          "n farklı elemanın her biri alt kümeye alınır veya alınmaz; bağımsız iki karar 2ⁿ alt küme verir. Kümenin kendisi çıkarılırsa 2ⁿ−1 öz alt küme kalır. İki belirli elemandan biri zorunlu, biri yasaksa onların kararları serbest değildir; kalan n−2 eleman için 2ⁿ⁻² seçim yapılır.",
          "n≥1 iken belirli bir elemanı mutlaka içeren alt kümelerde o karar sabittir; kalan n−1 eleman 2ⁿ⁻¹ seçim verir. Öz alt küme istenirse kümenin kendisi de bu seçimler içinde olduğundan bir kez çıkarılır: 2ⁿ⁻¹−1. Belirli iki eleman yasaksa kalan n−2 karar serbesttir; hangi elemanın zorunlu veya yasak olduğu sayımdan önce yazılır.",
        ],
      },
      {
        title: "Eşit eleman sayısı eşit küme demek değildir",
        paragraphs: [
          "A=B olabilmesi için her iki yönde de elemanlık aynı olmalıdır; A⊆B ve B⊆A koşulları birlikte eşitliği verir. {1,2} ve {2,1} eşittir çünkü sıra küme için önemli değildir. Buna karşı {1,2} ile {3,4} aynı sayıda eleman taşır ama aynı elemanları taşımaz.",
          "Kümeyi liste, ortak özellik veya Venn şemasıyla sunabilirsin; temsil değişmesi elemanları değiştirmez. {x∈ℤ | 0<x<4} ile {1,2,3} eşittir. Ortak özellikte alanı unutursan aynı eşitsizlik gerçek sayılar için sonsuz, tam sayılar için sonlu küme verebilir; sınır ve alan birlikte okunur.",
        ],
      },
      {
        title: "Birleşimde ortak elemanı yalnız bir kez say",
        paragraphs: [
          "A∪B, A’da veya B’de bulunan bütün elemanlardır; “veya” en az birinde bulunmayı kapsar. A∩B iki kümede de bulunanlardır. Venn’de yalnız A, ortak, yalnız B ve dışarı bölgeleri birbirinden ayrı olduğu için her eleman tek bölgede yer alır.",
          "s(A∪B)=s(A)+s(B)−s(A∩B): ortak öğeler ilk iki toplamda iki kez sayıldığından bir kez çıkarılır. A=18,B=16 ve ortak=7 ise birleşim 27’dir. Bu sayılar 7≤18,7≤16 gibi mümkünlük koşullarını sağlamalıdır; olumsuz “yalnız” sayıları geçerli bir sınıf modeli değildir.",
        ],
      },
      {
        title: "Farkta sıra ve “yalnız” sözcüğü önemlidir",
        paragraphs: [
          "A∖B, A’da olup B’de olmayan elemanları alır; B∖A genellikle farklıdır. “Yalnız A” bu ilk bölgedir, “yalnız birinde” iki tekil bölgenin birleşimidir. İki küme ayrık ise kesişim boştur; bu durumda A∖B=A ve birleşim sayısı doğrudan sayılar toplamıdır.",
          "“En çok birinde” ifadesi hiçbirinde olmayanları da kapsar; yalnız birinde olmakla aynı değildir. Bölge sayıları a,ortak b,yalnız B c,dışarı d ise tam birinde a+c, en çok birinde a+c+d olur. Cümlenin bağlacını veya “en az/en çok” sözcüğünü atlamak doğru formülü yanlış olaya uygular.",
        ],
      },
      {
        title: "Tümleyen seçilen evrene göre değişir",
        paragraphs: [
          "A′=E∖A, evrende olup A’da bulunmayan elemanlardır. A∪A′=E ve A∩A′=∅ olur. A aynı kalsa bile E’ye yeni bir eleman eklendiğinde A′ büyüyebilir. Tümleyen evren belirtilmeden tek bir sabit liste değildir; uygulamadaki evren kontrolü bu bağımlılığı gösterir.",
          "De Morgan kuralları (A∪B)′=A′∩B′ ve (A∩B)′=A′∪B′ biçimindedir. İlkinde iki kümenin hiçbirinde olmamak gerekir; ikincisinde en az birinde olmamak yeterlidir. Bunu her eleman için “A’da mı, B’de mi?” diye sorarak kanıtla; sadece boyalı bölgenin rengine bakarak ezberleme.",
          "A∩B=∅ ve A∪B=E birlikte verilmişse B=E∖A=A′ olur. Birinci koşul B’ye hiçbir A elemanının girmediğini, ikinci koşul A dışında evrende kalan her elemanın B’ye girmek zorunda olduğunu söyler. Yalnız ayrık olmak, B’nin tümleyen olduğunu söylemeye yetmez; evrende iki kümenin dışında elemanlar kalabilir.",
        ],
      },
      {
        title: "Sözel problemde önce dört ayrık bölgeyi doldur",
        paragraphs: [
          "Toplam 40 kişi, A’da 22, B’de 19 ve ikisinde 8 kişi varsa yalnız A 14, yalnız B 11, birleşim 33 ve dışarı 7’dir. Önce ortak sayıyı yerleştirmek tekrar saymayı önler. “Hiçbiri” toplamdan birleşimi çıkarmakla bulunur; A ve B sayıları tek başına dışarıyı söylemez.",
          "İki ayrı ölçüt tabloyla da gösterilebilir: gözlüklü/gözlüksüz ve iki grup gibi sınıflandırmalar dört ayrık hücre verir. Satır ve sütun toplamlarını aynı genel toplamla denetle. Bu ünitenin ana modeli iki kümedir; bir üçüncü küme eklenirse üçlü kesişimin ayrıca hesaba katılması gerekir, iki küme formülü körce çoğaltılamaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Boşluk da bir nesne olabilir",
        prompt: "A={∅,{1}} kümesinin kaç elemanı vardır?",
        strategy: "Dış parantez içindeki farklı nesneleri say.",
        steps: [
          {
            label: "İlk nesne",
            expression: "∅",
            explanation: "Hiç elemanı olmayan bir küme.",
          },
          {
            label: "İkinci nesne",
            expression: "{1}",
            explanation: "İçinde 1 bulunan, ilkinden farklı bir küme.",
          },
          {
            label: "Dış sayı",
            expression: "s(A)=2",
            explanation: "Elemanların içini açıp sayıma katma.",
          },
        ],
        answer: "2.",
        check: "∅≠{1}.",
        pitfall: "İçteki 1’i ayrıca üçüncü eleman saymak.",
      },
      {
        title: "Dört bölgeyle sınıf hesabı",
        prompt: "40 kişide A=22,B=19,ortak=8. Yalnız A, yalnız B ve hiçbiri?",
        strategy: "Orta bölgeyi önce yerleştir.",
        steps: [
          {
            label: "Tek bölgeler",
            expression: "22−8=14;19−8=11",
            explanation: "Ortak kişiler iki tek bölgeye katılmaz.",
          },
          {
            label: "Birleşim",
            expression: "14+8+11=33",
            explanation: "Üç ayrık bölge toplanır.",
          },
          {
            label: "Dışarı",
            expression: "40−33=7",
            explanation: "Genel toplam korunur.",
          },
        ],
        answer: "14;11;7.",
        check: "14+8+11+7=40.",
        pitfall: "Toplamdan 22 ve 19’u doğrudan çıkarmak.",
      },
      {
        title: "Evren değişince tümleyen",
        prompt:
          "E={1,…,8}, A={1,2,3,4}. E’ye 9 eklensin; A değişmesin. A′ nasıl değişir?",
        strategy: "Yalnız evrende olup A’da olmayanları al.",
        steps: [
          {
            label: "Başlangıç",
            expression: "A′={5,6,7,8}",
            explanation: "Dört dış eleman vardır.",
          },
          {
            label: "Yeni evren",
            expression: "E={1,…,9}",
            explanation: "9 evrende ama A’da değildir.",
          },
          {
            label: "Yeni tümleyen",
            expression: "A′={5,6,7,8,9}",
            explanation: "Sayı 5’e çıkar.",
          },
        ],
        answer: "4 elemandan 5 elemana.",
        check: "A ile yeni tümleyenin birleşimi yeni E’dir.",
        pitfall: "Tümleyeni evrenden bağımsız sanmak.",
      },
      {
        title: "Zorunlu ve yasak eleman",
        prompt:
          "A={a,b,c,d} alt kümelerinde a bulunsun, b bulunmasın. Kaç seçim?",
        strategy: "Serbest kararları ayır.",
        steps: [
          {
            label: "Sabit kararlar",
            expression: "a alınır;b alınmaz",
            explanation: "İki eleman artık seçenek üretmez.",
          },
          {
            label: "Serbestler",
            expression: "c ve d",
            explanation: "Her biri alınır veya alınmaz.",
          },
          {
            label: "Sayım",
            expression: "2²=4",
            explanation: "{a},{a,c},{a,d},{a,c,d}.",
          },
        ],
        answer: "4.",
        check: "Bütün listelerde a var, b yok.",
        pitfall: "Dört elemanı da serbest sayıp 16 yazmak.",
      },
    ],
    recall: [
      {
        prompt: "∅ ile {∅} neden eşit değil?",
        answer: "Birincisi sıfır, ikincisi bir elemanlıdır.",
      },
      {
        prompt: "Birleşimde neden kesişim çıkarılır?",
        answer: "Ortak elemanlar A ve B sayılarında iki kez sayılmıştır.",
      },
      {
        prompt: "En çok birinde olanlara hiçbiri dahil mi?",
        answer: "Evet; sıfır üyelik de en çok bir üyelik koşulunu sağlar.",
      },
      {
        prompt: "Tümleyen için hangi bilgi zorunlu?",
        answer: "Evrensel küme; A′ yalnız A’ya değil E’ye de bağlıdır.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri PDF s. 66–70 (basılı s. 64–68); Aurelia 029 Kümeler, öğretim PDF s. 1–3,5–7. İki kümeli sayma, alt küme koşulları ve evrene bağlı tümleyenle özgün anlatım. Resmî soru değildir.",
    questions: [
      {
        prompt: "A={1,1,2,3} kümesinin eleman sayısı kaçtır?",
        correct: "3",
        distractors: ["1", "2", "4", "6"],
        hint: "Kümelerde aynı nesnenin tekrarı yeni eleman yaratmaz.",
        explanation:
          "Listede 1 iki kez yazılsa da tek elemandır. Farklı elemanlar 1,2,3 olduğundan s(A)=3’tür. Liste uzunluğu ile farklı eleman sayısı aynı kavram değildir.",
      },
      {
        prompt: "A={∅,{1}} kümesinin eleman sayısı kaçtır?",
        correct: "2",
        distractors: ["0", "1", "3", "4"],
        hint: "Dış parantezin içindeki iki farklı küme nesnesini say.",
        explanation:
          "A’nın elemanları boş küme ve {1} kümesidir. Bunlar farklı nesneler olduğundan iki eleman vardır. İçteki 1, A’ya doğrudan üçüncü bir eleman olarak eklenmez; ∅ de burada bir eleman rolündedir.",
      },
      {
        prompt:
          "Beş farklı elemanlı bir kümenin kendisi dışındaki alt kümelerine öz alt küme deniyor. Bu kümenin kaç öz alt kümesi vardır?",
        correct: "31",
        distractors: ["5", "10", "16", "32"],
        hint: "Her eleman için iki kararla bütün alt kümeleri say, sonra kendisini çıkar.",
        explanation:
          "Beş eleman için 2⁵=32 alt küme bulunur. Bunlardan biri kümenin kendisidir; öz alt kümelerde bu tek durum çıkarılır ve 31 kalır. Boş küme alt küme sayımına dahildir.",
      },
      {
        prompt:
          "A={a,b,c,d} kümesinin alt kümelerinde a mutlaka bulunsun, b hiç bulunmasın. Kaç farklı alt küme vardır?",
        correct: "4",
        distractors: ["2", "3", "8", "16"],
        hint: "a ve b için karar verilmiş; yalnız c,d serbesttir.",
        explanation:
          "a alınır ve b alınmaz. c ile d için ikişer seçim olduğundan 2·2=4 alt küme vardır: {a},{a,c},{a,d},{a,c,d}. Zorunlu ve yasak elemanları serbest saymak koşulu bozar.",
      },
      {
        prompt:
          "Sonlu A ve B kümeleri için s(A)=18,s(B)=16,s(A∩B)=7 veriliyor. s(A∪B) kaçtır?",
        correct: "27",
        distractors: ["7", "25", "34", "41"],
        hint: "İki küme sayısını topla; ortak sayımı bir kez çıkar.",
        explanation:
          "18+16=34 toplamında ortak 7 eleman iki kez sayılır. Bir kez çıkarınca 34−7=27 farklı eleman kalır. Birleşim her elemanı bir kez içerir; kesişimi eklemek tekrar sayımı artırır.",
      },
      {
        prompt:
          "40 kişilik E grubunda A etkinliğine katılan 22, B’ye katılan 19, her ikisine katılan 8 kişi vardır. İki etkinliğe de katılmayan kaç kişi vardır?",
        correct: "7",
        distractors: ["0", "8", "11", "14"],
        hint: "Önce en az birine katılan birleşimi bul.",
        explanation:
          "Birleşim 22+19−8=33 kişidir. Bütün grup 40 olduğundan hiçbirine katılmayan 40−33=7 kişi bulunur. 22 ve 19’u doğrudan toplamdan çıkarmak ortak 8 kişiyi iki kez çıkarır.",
      },
      {
        prompt:
          "E={1,2,3,4,5,6,7,8}, A={1,2,3,4}, B={3,4,5} olsun. E’ye göre (A∪B)′ hangi kümedir?",
        correct: "{6,7,8}",
        distractors: ["{1,2}", "{3,4}", "{5,6,7,8}", "∅"],
        hint: "Önce birleşimi listele; sonra evrende dışarıda kalanları al.",
        explanation:
          "A∪B={1,2,3,4,5} olur. E’de olup bu listede olmayan elemanlar 6,7,8’dir. Tümleyen ortak olmayanları değil, birleşimde hiç bulunmayanları seçer; evren açıkça verilmiştir.",
      },
      {
        prompt: "A={1,2,3} ve B={3,4} için A∖B hangi kümedir?",
        correct: "{1,2}",
        distractors: ["{4}", "{3}", "{1,2,3,4}", "∅"],
        hint: "A’da bulunup B’de bulunmayan elemanları al.",
        explanation:
          "1 ve 2 A’dadır, B’de değildir; 3 ise B’de de bulunduğu için çıkarılır. Sonuç {1,2} olur. {4} ters sıradaki B∖A farkıdır; fark işleminde sıra önemlidir.",
      },
      {
        prompt:
          "30 kişilik bir grupta A ve B etkinliklerinden hiçbirine katılmayan 5, her ikisine katılan 6 kişi vardır. Bu iki etkinlikten tam birine katılan kaç kişi vardır?",
        correct: "19",
        distractors: ["11", "24", "25", "29"],
        hint: "Birleşimden iki etkinliğe birden katılanları çıkar.",
        explanation:
          "En az birine katılan 30−5=25 kişidir. Bunların 6’sı iki etkinliğe de katıldığı için tam birine katılan 25−6=19’dur. Hiçbirine katılmayanlar “tam birinde” sayılmaz.",
      },
      {
        prompt:
          "A={1,2}, B={a,b}; a ve b birbirinden ve 1,2 sayılarından farklı sembollerdir. Bu iki küme için hangi ifade doğrudur?",
        correct: "Eleman sayıları eşittir; kümeler eşit değildir.",
        distractors: ["A=B’dir.", "A⊆B’dir.", "B boş kümedir.", "A∩B=A’dır."],
        hint: "Aynı sayıda eleman ile aynı elemanları taşımak farklıdır.",
        explanation:
          "İki kümede de iki eleman vardır, fakat verilen koşula göre hiçbir ortak eleman yoktur. Dolayısıyla s(A)=s(B)=2 iken A≠B ve A∩B=∅ olur. Eleman sayısı tek başına küme eşitliğini belirlemez.",
      },
    ],
  },
  {
    id: "kartezyen-carpim",
    topic: "detail-223",
    title: "Kartezyen çarpım: sırayı ve bütün çiftleri koru",
    minutes: 55,
    objectives: [
      "Sıralı ikiliyi bileşenlerine göre karşılaştır; küme ile karıştırma.",
      "Kartezyen çarpımı liste ve ayrık koordinat noktalarıyla kur.",
      "Boş küme, sıra değişimi ve ek seçim koşullarını doğru say.",
    ],
    sections: [
      {
        title: "Sıralı ikilide iki konumun görevi farklıdır",
        paragraphs: [
          "(a,b) gösteriminde a birinci, b ikinci bileşendir. (a,b)=(c,d) ancak a=c ve b=d birlikte sağlanırsa doğrudur. (2,5) ile (5,2) eşit değildir; {2,5} kümesinde ise sıra önemli değildir. Sıralı ikili bir çift konumlu kayıt gibi okunmalıdır.",
          "(2x+1,3)=(7,y−2) verildiğinde birinci bileşenlerden 2x+1=7, ikincilerden 3=y−2 kurulur. Çapraz bileşenleri eşitlemek verilen kaydı değiştirir. Bileşenlerin eşit olmasına da engel yoktur; 2 her iki kaynak kümede bulunuyorsa (2,2) geçerli olabilir.",
        ],
      },
      {
        title: "Her ilk seçimi her ikinci seçimle eşleştir",
        paragraphs: [
          "A×B={(a,b) | a∈A ve b∈B} tanımı bütün geçerli çiftleri alır. A={1,2},B={3,4,5} ise ilk bileşen 1 için üç, 2 için üç çift vardır. Her A elemanını yalnız bir B elemanıyla eşlemek çarpımın tümünü oluşturmaz.",
          "Sonlu kümelerde s(A×B)=s(A)·s(B): her ilk bileşen için aynı sayıda bağımsız ikinci seçim vardır. A ve B’nin ortak elemanı olması bu çarpımı bozmaz; bir kümeden eleman seçmek onu diğerinden silmez. “Aynı nesne iki kez seçilemez” gibi ek yasak verilirse artık çarpımın bir alt kümesini sayarsın.",
        ],
      },
      {
        title: "Sıra değişimi çoğu zaman sonucu değiştirir",
        paragraphs: [
          "A×B’de A ilk, B ikinci kaynaktır; B×A’da görevler tersine döner. İki küme de boş değilse A×B=B×A eşitliği A=B olmasını gerektirir: bir çiftin ilk bileşenlerine bakarak iki yönde kapsama elde edilir. Aynı eleman sayısı, ürün kümelerinin eşitliği için yeterli değildir.",
          "Boş küme istisnasını atlama. A=∅ ve B={1} için A≠B olmasına rağmen A×B=B×A=∅’dir. Bu nedenle “A≠B ise ürünler daima farklıdır” koşulsuz kuralı yanlıştır. Uygulamada eşitlik sonucu çiftlerin gerçek listelerinden hesaplanır; yalnız kaynak küme adlarına bakılmaz.",
        ],
      },
      {
        title: "Boş çarpım ve geri çıkarımın sınırı",
        paragraphs: [
          "A×∅ ve ∅×A boş kümedir; bir konuma yerleştirilecek hiç eleman yoktur. Sayı formülü s(A)·0=0 ile de bunu verir. ∅×∅ de boştur; sonuç tek elemanlı {∅} veya {(∅,∅)} değildir, çünkü ∅ kaynak kümenin elemanı olarak verilmemiştir.",
          "Ürün boş değilse bütün çiftlerin ilk bileşenleri tam A’yı, ikinci bileşenleri tam B’yi verir. Ancak ürün boşsa yalnız bu bilgiden hangi kaynağın boş olduğunu seçemezsin; A boş, B boş veya ikisi boş olabilir. “Çarpımın listesi” ile “kaynakların kesin listesi” aynı miktarda bilgi taşımaz.",
        ],
      },
      {
        title: "Koordinat gösterimi ayrık noktaların kümesidir",
        paragraphs: [
          "Sayısal A ve B için her (a,b) çiftini yatay a, düşey b konumunda işaretle. A={1,2},B={3,5} grafiği dört noktadır. (1,4) arada görünse bile 4∉B olduğundan ürünün elemanı değildir. Noktaların etrafındaki dikdörtgenin bütün içi boyanmaz.",
          "Eksenlerin hangi kaynak kümeye karşılık geldiğini ve sayısal ölçeğini oku. B×A’ya geçince noktalar y=x doğrusuna göre yer değiştirir; sadece eksen başlığını değiştirmek yeterli değildir. Modelin HTML ikili listesi, şeklin küçük ekranda okunamadığı durumda da tam veriyi sunar.",
        ],
      },
      {
        title: "Dağılma tanımdaki “ve/veya”dan türetilir",
        paragraphs: [
          "A×(B∪C) çiftinin ilk bileşeni A’da, ikincisi B’de veya C’dedir; bu nedenle (A×B)∪(A×C) ile aynıdır. Kesişim için de A×(B∩C)=(A×B)∩(A×C) olur. Bu ilişkiler ek ezberden önce bir çiftin hangi koşulları sağladığı sorularak açıklanabilir.",
          "Sayma yaparken B ile C’nin ortak elemanlarını yine bir kez saymalısın. B={3,4},C={4,5} ve A iki elemanlıysa birleşimin boyu 3, ürünün boyu 6’dır; 4+4=8 iki kez sayım yapar. Bu özellikler burada doğrudan ürün tanımından türetilen özgün örneklerdir.",
          "Daha genel olarak (A×B)∩(C×D)=(A∩C)×(B∩D) olur. Ortak bir çiftin ilk bileşeni A’da ve C’de, ikinci bileşeni B’de ve D’de bulunmalıdır; iki koşul ayrı denetlenir. Özgün A={0,3}, B={2,5}, C={3,4}, D={1,2} örneğinde ortak ilk değer 3, ortak ikinci değer 2’dir; tek çift (3,2) kalır. Bir konumun uyuşması tek başına yeterli değildir.",
        ],
      },
      {
        title: "Çarpımdan bilinmeyen sayıyı koşulla bul",
        paragraphs: [
          "A’nın 3 elemanı ve A×B’nin 12 elemanı varsa 3·s(B)=12’den s(B)=4 bulunur. A’nın eleman sayısı sıfır olduğunda böyle bölme yapılamaz; 0·s(B)=0 her sonlu B için doğrudur. Bulunan eleman sayısı negatif veya kesirli olursa verilenler sonlu küme modeline uymaz.",
          "Bir ürünün eleman sayısı tek başına kaynakların kaç elemanlı olduğunu belirlemez: 12,1·12,2·6 veya 3·4 ile oluşabilir. Ayrıca eşit büyüklükteki kaynakların hangi elemanları taşıdığı bu sayıdan çıkmaz. Ek bilgi yoksa bir tek kaynak küme uydurmak yerine sonucun belirlenemediğini söyle.",
        ],
      },
      {
        title: "Bağlamda bütün olasılıklar ile izinli seçimleri ayır",
        paragraphs: [
          "İki içecek ve üç yiyeceğin her biri birlikte seçilebiliyorsa altı menü vardır; içecek ilk, yiyecek ikinci bileşen olsun. Bir eşleşme yasaklandığında altı çiftin o koşulu sağlayan alt kümesi kalır. Soru “bir içecek ve bir yiyecek” yerine aynı gruptan iki farklı nesne isterse modeli yeniden kurmak gerekir.",
          "A={0,1},B={1,2} için dört ürün çifti vardır; birinci bileşeni ikinciden küçük olanlar (0,1),(0,2),(1,2) olmak üzere üçtür. Sayısal koşulu bütün çiftlere tek tek uygulamak küçük kümelerde güvenilir kontroldür. Ürün sayısını bulduktan sonra koşulu unutup dördü de cevap yapma.",
        ],
      },
    ],
    examples: [
      {
        title: "Bütün çiftleri oluştur",
        prompt: "A={1,2}, B={3,4,5} için A×B’yi yaz.",
        strategy: "Her ilk eleman için bütün ikinci elemanları dolaş.",
        steps: [
          {
            label: "İlk kaynak",
            expression: "(1,3),(1,4),(1,5)",
            explanation: "1 sabitken B’nin tamamını kullan.",
          },
          {
            label: "İkinci kaynak",
            expression: "(2,3),(2,4),(2,5)",
            explanation: "2 için aynı üç seçim vardır.",
          },
          {
            label: "Kontrol",
            expression: "2·3=6 çift",
            explanation: "Listeyle sayı formülü uyuşur.",
          },
        ],
        answer: "{(1,3),(1,4),(1,5),(2,3),(2,4),(2,5)}.",
        check: "Listede aynı çift iki kez yok.",
        pitfall: "Sadece (1,3),(2,4) eşlemek.",
      },
      {
        title: "Boş küme karşı örneği",
        prompt: "A=∅, B={2}. A×B ile B×A eşit mi?",
        strategy: "İki konumun da doldurulabilmesi gerekir.",
        steps: [
          {
            label: "A×B",
            expression: "∅",
            explanation: "İlk bileşen için seçim yok.",
          },
          {
            label: "B×A",
            expression: "∅",
            explanation: "İkinci bileşen için seçim yok.",
          },
          {
            label: "Karşılaştır",
            expression: "A×B=B×A",
            explanation: "A≠B olması burada farklı ürün yaratmaz.",
          },
        ],
        answer: "İkisi de ∅.",
        check: "0·1=1·0=0.",
        pitfall:
          "Boş olmayan kaynak koşulunu unutarak genel farklılık iddia etmek.",
      },
      {
        title: "Bileşenleri aynı sırada eşitle",
        prompt: "(2x+1,3)=(7,y−2) için x+y?",
        strategy: "İlkleri ve ikincileri ayrı eşitle.",
        steps: [
          {
            label: "İlk bileşen",
            expression: "2x+1=7 → x=3",
            explanation: "Sıra korunur.",
          },
          {
            label: "İkinci bileşen",
            expression: "3=y−2 → y=5",
            explanation: "İkinci konumlar eşitlenir.",
          },
          {
            label: "İstenen",
            expression: "x+y=8",
            explanation: "Önce iki değeri bul.",
          },
        ],
        answer: "8.",
        check: "(7,3)=(7,3).",
        pitfall: "Çapraz eşitlemek.",
      },
      {
        title: "Ek koşul ürünü daraltır",
        prompt: "A={0,1},B={1,2}. İlk bileşeni ikinciden küçük kaç çift var?",
        strategy: "Önce bütün ürünü kur.",
        steps: [
          {
            label: "Bütün ürün",
            expression: "(0,1),(0,2),(1,1),(1,2)",
            explanation: "Toplam 4 çift.",
          },
          {
            label: "Koşul",
            expression: "(1,1) dışarıda",
            explanation: "1<1 yanlış; diğer üç çift sağlar.",
          },
          {
            label: "Sayım",
            expression: "3",
            explanation: "Yasaklanan tek çift çıkarılır.",
          },
        ],
        answer: "3.",
        check: "Kalan bütün çiftlerde a<b.",
        pitfall: "Ürün sayısı 4’ü koşulsuz cevaplamak.",
      },
    ],
    recall: [
      {
        prompt: "(1,2) ile {1,2} aynı şey mi?",
        answer:
          "Hayır; ilkinde konum sırası, ikincisinde yalnız elemanlık önemlidir.",
      },
      {
        prompt: "Bir kaynak boşsa ne olur?",
        answer: "Üründe hiçbir tam çift kurulamaz; sonuç boş kümedir.",
      },
      {
        prompt: "Ürün grafiği bütün dikdörtgeni içerir mi?",
        answer:
          "Hayır; yalnız kaynak elemanlarının oluşturduğu ayrık noktaları içerir.",
      },
      {
        prompt: "A≠B ürünleri hep farklı mı yapar?",
        answer:
          "Ancak iki kaynak da boş değilken bu çıkarım geçerlidir; boş kaynak karşı örnektir.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri PDF s. 71 (basılı s. 69); Aurelia 030 Kümeler: Kartezyen Çarpım, öğretim PDF s. 1–3,5–7. Boş kaynak istisnası, konuma göre kesişim ve doğrudan tanımdan türetilen özgün örnekler. Resmî soru değildir.",
    questions: [
      {
        prompt: "A={1,2},B={3,4,5}. A×B’nin eleman sayısı kaçtır?",
        correct: "6",
        distractors: ["2", "3", "5", "9"],
        hint: "Her A elemanını B’nin üç elemanıyla eşleştir.",
        explanation:
          "İlk bileşen için 2, ikinci için 3 bağımsız seçim vardır; 2·3=6 çift elde edilir. Her A elemanını yalnız bir B elemanıyla eşleştirmek çarpımın bütününü vermez.",
      },
      {
        prompt: "A={1,2}, B={4,5}. Hangi sıralı ikili A×B’nin elemanıdır?",
        correct: "(2,4)",
        distractors: ["(4,2)", "(1,2)", "(4,5)", "(2,1)"],
        hint: "İlk bileşen A’da, ikinci B’de olmalı.",
        explanation:
          "(2,4) için 2∈A ve 4∈B iki koşulu da sağlanır. Diğer seçeneklerde ilk veya ikinci bileşen yanlış kaynakta kalır. İkiliyi ters çevirmek aynı üyeliği garanti etmez.",
      },
      {
        prompt:
          "x,y gerçek sayıları için (2x+1,3)=(7,y−2) veriliyor. x+y kaçtır?",
        correct: "8",
        distractors: ["2", "3", "5", "10"],
        hint: "Aynı konumdaki bileşenleri eşitle.",
        explanation:
          "2x+1=7’den x=3, 3=y−2’den y=5 bulunur. Toplam 8’dir. Sıralı ikili eşitliği yalnız bileşen toplamlarının eşitliği değildir; her konum ayrı eşitlenir.",
      },
      {
        prompt: "A=∅, B={1,2} için A×B ve B×A hakkında hangi ifade doğrudur?",
        correct: "İkisi de ∅’dir.",
        distractors: [
          "İkisi de {∅}’dir.",
          "Yalnız A×B boştur.",
          "Yalnız B×A boştur.",
          "İkisinin de iki elemanı vardır.",
        ],
        hint: "Bir çiftin iki bileşeni de kendi kaynağından seçilebilmelidir.",
        explanation:
          "Birinci üründe ilk bileşen, ikinci üründe ikinci bileşen seçilemez. Dolayısıyla iki ürün de boş kümedir. A≠B koşulu tek başına ürünlerin farklı olmasını sağlamaz; boş kaynak istisnası vardır.",
      },
      {
        prompt: "A={1,2},B={2,3}. (A×B)∩(B×A) kümesinin eleman sayısı kaçtır?",
        correct: "1",
        distractors: ["0", "2", "3", "4"],
        hint: "Her iki konumda da iki kaynağa birden ait olmayı denetle.",
        explanation:
          "Ortak ürün çiftinde hem ilk hem ikinci bileşen A∩B={2} içinde olmalıdır. Tek çift (2,2) olur; eleman sayısı 1’dir. Ortak kaynak elemanı aynı çiftte iki konumda da kullanılabilir.",
      },
      {
        prompt: "Sonlu kümelerde s(A)=3 ve s(A×B)=12 veriliyor. s(B) kaçtır?",
        correct: "4",
        distractors: ["0", "3", "6", "9"],
        hint: "Kaynak A boş değil; sayı çarpımında 3’e bölmek geçerli.",
        explanation:
          "s(A×B)=s(A)·s(B) olduğundan 12=3·s(B) ve s(B)=4 bulunur. Bu bölme 3≠0 sayesinde yapılır; sıfır elemanlı bir kaynakta aynı geri çıkarım yapılamaz.",
      },
      {
        prompt:
          "A={1,2}, B={3,4}. B’ye yeni eleman 5 ekleniyor; A değişmiyor. A×B’de kaç yeni sıralı ikili oluşur?",
        correct: "2",
        distractors: ["1", "3", "4", "6"],
        hint: "Yeni ikinci bileşen, her A elemanıyla bir çift oluşturur.",
        explanation:
          "B’ye 5 eklenince yeni çiftler (1,5) ve (2,5) olur. Eski 4 çift korunur, toplam 6’ya çıkar; artış 2’dir. Soru yeni toplamı değil yeni oluşan çiftleri istemektedir.",
      },
      {
        prompt:
          "A={1,2},B={3},C={4,5} veriliyor. A×(B∪C) kümesinin eleman sayısı kaçtır?",
        correct: "6",
        distractors: ["2", "3", "4", "8"],
        hint: "Önce ikinci kaynak birleşimini kur.",
        explanation:
          "B∪C={3,4,5} üç elemanlıdır. A iki elemanlı olduğundan ürün 2·3=6 eleman içerir. Kaynak kümelerin birleşimi alındıktan sonra her ilk eleman bütün ikinci seçimlerle eşlenir.",
      },
      {
        prompt:
          "Boş olmayan A×B’nin bütün elemanları (1,3),(1,5),(2,3),(2,5) olarak verilmiştir. A∪B hangi kümedir?",
        correct: "{1,2,3,5}",
        distractors: ["{1,2}", "{3,5}", "{1,3,5}", "{1,2,3,4,5}"],
        hint: "İlk ve ikinci bileşen listelerini ayrı çıkar.",
        explanation:
          "Ürün boş olmadığı ve bütün çiftler verildiği için ilk bileşenler A={1,2}, ikinciler B={3,5} olur. Birleşimleri {1,2,3,5}’tir. Çizimde arada bulunabilecek 4 sayısı listede yoksa kaynağa eklenmez.",
      },
      {
        prompt:
          "A={0,1}, B={1,2}. A×B içinde birinci bileşeni ikinci bileşenden küçük olan kaç çift vardır?",
        correct: "3",
        distractors: ["0", "1", "2", "4"],
        hint: "Dört çiftin her birinde sıkı küçüklük koşulunu denetle.",
        explanation:
          "Ürün (0,1),(0,2),(1,1),(1,2) çiftlerini içerir. İlk, ikinci ve dördüncü çiftte a<b doğrudur; (1,1) eşit olduğu için dışlanır. Böylece koşulu sağlayan 3 çift kalır.",
      },
    ],
  },
  {
    id: "mantik-onerme",
    topic: "detail-224",
    title: "Mantık: bağlaçtan karşı örneğe",
    minutes: 75,
    objectives: [
      "Önerme, doğruluk, olumsuzluk ve bütün durumlarda denkliği ayır.",
      "Beş temel bağlacı, koşul dönüşümlerini ve gerekli/yeterli koşulu kullan.",
      "Açık önerme ve niceleyicilerde alanı koru; tanık veya karşı örnekle gerekçe kur.",
    ],
    sections: [
      {
        title: "Önerme kesin hüküm bildirir; doğru olması şart değildir",
        paragraphs: [
          "“9 sayısı 3’ün katıdır” doğru bir önermedir; “9 asal sayıdır” yanlış bir önermedir. İkisi de kesin doğruluk değeri taşıyabildiğinden önerme sayılır. Soru, emir veya ölçütü belirlenmemiş kişisel beğeni bu anlamda önerme değildir. “En iyi kitap” gibi ifadeyi ölçüt belirtmeden matematiksel doğru/yanlış kalıbına sokma.",
          "p,q gibi harfler bir ifadenin yerini tutar. Günlük dildeki bir yargıyı kullanırken kişi, zaman, alan ve sözcüklerin anlamı belirlenmelidir. “Başarılı” gibi belirsiz bir sözcük, ölçülebilir başarı ölçütü verilince kesin yargıya dönüşebilir; yalnız cümlenin biçimine bakmak yeterli değildir.",
        ],
      },
      {
        title: "Doğruluk değeri, değil ve denkliğin kapsamı",
        paragraphs: [
          "Doğru 1, yanlış 0 ile gösterilir; p′ değili bu iki değeri değiştirir ve (p′)′=p olur. “En az 5”in değili “5’ten az”dır, “en çok 5” değildir. Bir cümlenin olumsuzunu kurarken eşitlik sınırını ve bütün koşulu olumsuzla.",
          "Bağımsız n önermenin 2ⁿ olası doğruluk ataması vardır. İki bileşik ifadenin mantıksal denkliği, izin verilen bütün atamalarda aynı sonucu vermesidir; yalnız seçilmiş bir satırda eşit olmaları genel denklik kanıtı değildir. Önermeler arasında ek ilişki varsa bağımsızlık kabulüyle sayılan her satır bağlamda mümkün olmayabilir.",
        ],
      },
      {
        title: "Ve, veya, ya da üç ayrı seçme kuralıdır",
        paragraphs: [
          "p∧q yalnız ikisi doğruyken doğrudur. p∨q en az biri doğruyken doğrudur; ikisinin birlikte doğru olması da dahildir. p⊻q, burada “ya da” ile gösterilen dışlayıcı bağlaçtır ve yalnız biri doğruyken doğrudur. İki doğru verildiğinde veya 1, ya da 0 üretir.",
          "p∧p=p, p∨p=p gibi tekrar özellikleri aynı koşulu iki kez yazmanın yeni koşul getirmediğini gösterir. p∧p′ daima yanlış, p∨p′ daima doğrudur. Sembolleri kullanmadan önce bağlacın bu ünitedeki anlamını oku; günlük dilde “veya” her zaman teknik anlamıyla kullanılmayabilir.",
        ],
      },
      {
        title: "De Morgan bütün yapının değilini değiştirir",
        paragraphs: [
          "(p∧q)′=p′∨q′: ikisinin birlikte doğru olmaması, en az birinin yanlış olmasıdır. (p∨q)′=p′∧q′: en az birinin doğru olmaması, ikisinin de yanlış olmasıdır. Yalnız bağlacı değiştirip önermeleri aynı bırakmak veya yalnız birini olumsuzlamak denk ifade vermez.",
          "Dağılma özellikleri p∧(q∨r)=(p∧q)∨(p∧r) ve p∨(q∧r)=(p∨q)∧(p∨r) biçimindedir. Bütün satırları doğru veren ifadeye totoloji, bütün satırları yanlış verene çelişki denebilir. Bu adlar biçimsel doğruluk durumlarını açıklar; günlük bir iddianın gerçekliğini araştırmanın yerine geçmez.",
        ],
      },
      {
        title: "İse yalnız doğru öncül ve yanlış sonuçta yanlıştır",
        paragraphs: [
          "p⇒q, p=1 ve q=0 olduğunda 0; diğer üç durumda 1 olur. p′∨q ile denktir. Öncül p yanlışken biçimsel koşul doğru çıkar; bundan q’nun gerçek dünyada doğru olduğu veya p’nin q’ya sebep olduğu çıkarılamaz. Tablo sonucu ile nedensellik iddiasını ayır.",
          "p⇒q ilişkisinde p, q için yeterli; q, p için gerekli koşuldur. “4’e bölünüyorsa 2’ye bölünür”de 4’e bölünebilme yeterlidir, 2’ye bölünebilme gerekli koşuldur. 2’ye bölünen her sayı 4’e bölünmez; yeterlilik ile gereklilik aynı yönü anlatmaz.",
          "Bileşik bir koşulun yanlışlığı verildiğinde dıştan içe ilerle. Özgün p=0 ve ((p∨q)⇒r)=0 koşullarında dış öncül p∨q=1, dış sonuç r=0 olmak zorundadır. p=0 olduğundan 0∨q=1 ancak q=1 ile sağlanır. Bulunan (p,q,r)=(0,1,0) yerine yazılınca (0∨1)⇒0=1⇒0=0 çıkar. Bir iç parçayı, bütün dış öncülmüş gibi okumak ilk hatadır.",
        ],
      },
      {
        title: "Karşıt ters denktir; karşıt ve ters genellikle değildir",
        paragraphs: [
          "p⇒q’nun karşıtı q⇒p, tersi p′⇒q′, karşıt tersi q′⇒p′ olarak adlandırılır. Başlangıç koşulu karşıt tersine bütün satırlarda denktir. Buna karşılık karşıt ve ters bazı satırlarda farklı sonuç verir; ikisini koşulsuz başlangıç teoremi gibi kullanma.",
          "Koşulun değili ile tersi de farklıdır: (p⇒q)′=p∧q′. Değil, tam olarak kuralın bozulduğu durumu seçer; ters ise iki parçayı olumsuzlayıp yeni bir koşul kurar. “Kural yanlış” diyebilmek için öncülün doğru, sonucun yanlış olduğu bir karşı örnek gerekir.",
        ],
      },
      {
        title: "Ancak ve ancak iki yönü birlikte ister",
        paragraphs: [
          "p⇔q, (p⇒q)∧(q⇒p) ifadesidir. p ve q aynı doğruluk değerindeyken doğru, farklıyken yanlıştır. Yalnız bir yönü ispatlamak çift yönlü ilişkiyi ispatlamaz. “n çift ancak ve ancak 2’ye bölünür” gibi bir ifadede kullanılan çift tanımının alanını da belirt.",
          "p=0,q=0 iken iki koşullu yön de 1 verdiğinden çift yönlü koşul 1’dir. İki önermenin birlikte yanlış olması burada bir çelişki değildir; istenen aynı doğruluk değerini taşımalarıdır. p⇔q ile p∧q’yu karıştırma: ikincisi iki yanlışta 0 olur.",
        ],
      },
      {
        title: "Açık önermede değişken ve evren eksik bırakılmaz",
        paragraphs: [
          "p(x):x²>0 ifadesinin sonucu x’e ve seçilen alana bağlıdır; değeri verilmeden kapalı bir önerme gibi tek 0/1 atanmaz. E={−1,0,1} alanında doğruluk kümesi {−1,1}’dir. Aynı koşul pozitif gerçekler alanında her eleman için doğru olur.",
          "Denklem ve eşitsizliğin çözüm kümesi, açık önermeyi doğru yapan değerlerin kümesidir. “Bazı x” veya “her x” ile bir niceleyici eklemek, alanı belli bir yargı üretir. Bir sonlu örnek alanında bulunan sonucu bütün tam veya gerçek sayılara otomatik genişletme; modeldeki E yalnız ekranda verilen elemanlardır.",
        ],
      },
      {
        title: "Her için karşı örnek, bazı için tanık ara",
        paragraphs: [
          "∀x∈E,p(x) bütün elemanları; ∃x∈E,p(x) en az birini ister. Evrensel yargıyı çürütmek için tek karşı örnek yeterlidir; varlıksal yargıyı doğrulamak için bir tanık yeterlidir. Sonlu alanda bütün elemanlar denenebilir; sonsuz alanda birkaç başarılı deneme bütünlük ispatı değildir.",
          "Değil alınca niceleyici de değişir: ¬∀x,p(x)≡∃x,¬p(x) ve ¬∃x,p(x)≡∀x,¬p(x). Örneğin “her x için x²>0”ın değili “en az bir x için x²≤0”dır. Boş E’de karşı örnek bulunmadığı için evrensel ifade doğru, tanık bulunmadığı için varlıksal ifade yanlıştır; bu sonuç tanımlardan türetilir.",
        ],
      },
      {
        title: "Tanım, aksiyom ve teorem farklı görevler taşır",
        paragraphs: [
          "Tanım bir terimin anlamını açık ve tutarlı biçimde belirler; aksiyom sistemde ispatlanmadan kabul edilen başlangıç önermesidir. Teorem ise bu kabuller, tanımlar ve önceki sonuçlardan ispatla çıkarılır. Bir iddianın sık tekrarlanması onu aksiyom veya ispatlanmış teorem yapmaz.",
          "p⇒q biçiminde hipotez p, hüküm q’dur. n=4k yazılabilen bir tam sayı için n=2(2k) yazarak 2’ye bölünmeyi göstermek doğrudan ispata örnektir. Tek sayısal örnek genel teoremi ispatlamaz, fakat tek geçerli karşı örnek genel yanlış yargıyı çürütebilir. Model gerekçeni kaydeder; serbest yazıyı otomatik ispat puanı saymaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Yanlış öncül ve iki yön",
        prompt: "p=0,q=0 için p⇒q, p⇔q ve p∧q?",
        strategy: "Her bağlacın tanımını ayrı uygula.",
        steps: [
          {
            label: "Koşullu",
            expression: "0⇒0=1",
            explanation: "Yanlış olduğu tek satır 1⇒0’dır.",
          },
          {
            label: "İki yönlü",
            expression: "0⇔0=1",
            explanation: "Değerler aynıdır.",
          },
          {
            label: "Birlikte",
            expression: "0∧0=0",
            explanation: "Ve iki doğru ister.",
          },
        ],
        answer: "1;1;0.",
        check: "İki yönlü koşul, ve bağlacı değildir.",
        pitfall: "Öncül yanlışsa her bağlaç yanlış sanmak.",
      },
      {
        title: "Karşıtı sayıyla sınama",
        prompt:
          "Tam sayılarda p:n 4’e bölünür; q:n 2’ye bölünür. q⇒p her n için doğru mu?",
        strategy: "Öncülü doğru, sonucu yanlış yapan n ara.",
        steps: [
          {
            label: "Aday",
            expression: "n=2",
            explanation: "2’ye tam bölünür.",
          },
          {
            label: "Öncül/sonuç",
            expression: "q=1,p=0",
            explanation: "4’e tam bölünmez.",
          },
          {
            label: "Karar",
            expression: "q⇒p=0",
            explanation: "Tek karşı örnek genellemeyi çürütür.",
          },
        ],
        answer: "Hayır; n=2 karşı örnektir.",
        check: "Asıl p⇒q teoremi bundan etkilenmez.",
        pitfall: "Bir yön doğruysa karşıtını da doğru kabul etmek.",
      },
      {
        title: "Niceleyicinin değilini kanıtla",
        prompt: "E={−1,0,1}; “her x için x²>0” ve değili?",
        strategy: "Alanı tek tek tara.",
        steps: [
          {
            label: "Denemeler",
            expression: "1>0;0>0 yanlış;1>0",
            explanation: "0 karşı örnektir.",
          },
          {
            label: "Evrensel sonuç",
            expression: "∀x∈E,x²>0 yanlış",
            explanation: "Tek başarısız eleman yeter.",
          },
          {
            label: "Değil",
            expression: "∃x∈E,x²≤0 doğru",
            explanation: "x=0 bu varlıksal yargının tanığı.",
          },
        ],
        answer: "İlk yanlış; değili doğru.",
        check: "Negasyon alanı değiştirmedi.",
        pitfall: "Değilde yalnız > işaretini değiştirip her’i korumak.",
      },
      {
        title: "Hipotezden hükme doğrudan ispat",
        prompt:
          "Her tam sayı n için 4’e bölünme, 2’ye bölünmeyi gerektirir. Neden?",
        strategy: "Hipotezi bir tam sayı katsayısıyla yaz.",
        steps: [
          {
            label: "Hipotez",
            expression: "n=4k, k∈ℤ",
            explanation: "4’e bölünmenin anlamı.",
          },
          {
            label: "Dönüşüm",
            expression: "n=2(2k)",
            explanation: "Çarpanlar yeniden gruplanır.",
          },
          {
            label: "Hüküm",
            expression: "2k∈ℤ → 2|n",
            explanation: "Bütün izinli k için sonuç çıkar.",
          },
        ],
        answer: "p⇒q ispatlandı.",
        check: "0 ve negatif tam sayıları da kapsar.",
        pitfall: "Yalnız 8 örneğini gösterip her n sonucuna atlamak.",
      },
    ],
    recall: [
      {
        prompt: "İse bağlacı hangi satırda yanlış?",
        answer: "Yalnız öncül doğru ve sonuç yanlışken.",
      },
      {
        prompt: "Ters ile değil aynı mı?",
        answer: "Hayır; ters p′⇒q′, değil p∧q′ olur.",
      },
      {
        prompt: "Evrensel yargıyı çürütmek için ne yeter?",
        answer: "Alanda bulunan tek bir karşı örnek.",
      },
      {
        prompt: "Bazı, mutlaka birden fazla mı?",
        answer: "Hayır; en az bir anlamındadır. Bir tanık yeterlidir.",
      },
    ],
    source:
      "MEBİ TYT Matematik Konu Özetleri PDF s. 58–65 (basılı s. 56–63); Aurelia 031 Mantık ve Önermeler, öğretim PDF s. 1–3,5–7. Özgün tablolar, dıştan içe koşul çözümü ve sonlu alan kanıtı. Mantıksal koşul nedensellik değildir; resmî sınav sorusu sunulmaz.",
    questions: [
      {
        prompt: "Hangi ifade, doğruluk değeri belirlenebilen bir önermedir?",
        correct: "9 sayısı 3’ün katıdır.",
        distractors: [
          "Kapıyı kapat.",
          "Yarın buluşalım mı?",
          "Keşke hava güzel olsa.",
          "En lezzetli meyve budur.",
        ],
        hint: "Kesin doğru/yanlış yargısını soru, emir ve öznel beğeniden ayır.",
        explanation:
          "9=3·3 olduğundan verilen ifade kesin doğru bir yargıdır ve önermedir. Diğer seçenekler emir, soru, dilek veya ölçütü belirtilmemiş beğeni içerir; bu anlamda önerme sayılmaz.",
      },
      {
        prompt:
          "p=1,q=0 olmak üzere (p∨q)∧q′ ifadesinin doğruluk değeri kaçtır?",
        correct: "1",
        distractors: ["0", "2", "−1", "Belirlenemez."],
        hint: "Önce veya ile q’nun değilini ayrı hesapla.",
        explanation:
          "p∨q=1∨0=1 ve q′=1’dir. Son adımda 1∧1=1 bulunur. q’nun kendisi ile q′ aynı değer değildir; olumsuzluk ifadenin o bileşenine uygulanır.",
      },
      {
        prompt:
          "p=0 ve q=0 iken p⇒q koşullu önermesinin doğruluk değeri kaçtır?",
        correct: "1",
        distractors: ["0", "2", "−1", "Tanımsızdır."],
        hint: "Koşullu önerme yalnız 1⇒0 durumunda yanlıştır.",
        explanation:
          "0⇒0, yanlış öncüllü satırlardan biri olduğu için biçimsel olarak doğrudur ve değeri 1’dir. Bu sonuç q’nun gerçekten doğru olduğu veya p’nin q’ya neden olduğu anlamına gelmez.",
      },
      {
        prompt:
          "p ve q önermeleri için p⇒q ifadesinin mantıksal değili hangi ifadedir?",
        correct: "p∧q′",
        distractors: ["p′⇒q′", "q⇒p", "q′⇒p′", "p′∨q"],
        hint: "Başlangıç koşulunun yanlış olduğu tek satırı seç.",
        explanation:
          "p⇒q yalnız p=1,q=0 iken yanlıştır. Dolayısıyla değili tam bu durumu anlatan p∧q′ olur. p′⇒q′ tersi, q′⇒p′ karşıt tersidir; ikisi de başlangıcın değili değildir.",
      },
      {
        prompt:
          "p⇒q ile bütün doğruluk atamalarında denk olan karşıt ters ifade hangisidir?",
        correct: "q′⇒p′",
        distractors: ["q⇒p", "p′⇒q′", "p∧q′", "p⇔q"],
        hint: "Karşıt terste hem sıra değişir hem iki parça olumsuzlanır.",
        explanation:
          "p⇒q ile q′⇒p′ aynı dört satırda aynı değerleri verir. Karşıt q⇒p ve ters p′⇒q′ genellikle başlangıca denk değildir. Bir satırdaki uyuşma bütün durumlarda denklik sağlamaz.",
      },
      {
        prompt:
          "p=1,q=1 iken yalnız birinin doğru olmasını isteyen p⊻q (“ya da”) ifadesinin değeri kaçtır?",
        correct: "0",
        distractors: ["1", "2", "−1", "Belirlenemez."],
        hint: "Dışlayıcı ya da, ikisinin birlikte doğruluğunu kabul etmez.",
        explanation:
          "İki önerme de doğru olduğundan “yalnız biri doğru” koşulu sağlanmaz; p⊻q=0 olur. Buna karşı aynı değerlerle p∨q=1’dir. Veya ile dışlayıcı ya da bu satırda ayrılır.",
      },
      {
        prompt:
          "E={−1,0,1} alanında “her x için x²>0” yargısını çürüten karşı örnek hangi elemandır?",
        correct: "0",
        distractors: ["−1", "1", "2", "−2"],
        hint: "Karşı örnek E’de olmalı ve koşulu yanlış yapmalı.",
        explanation:
          "0∈E ve 0²=0 olduğu için 0>0 yanlıştır. −1 ve 1’in kareleri 1>0 koşulunu sağlar. 2 ile −2 alanda bulunmadığından bu E için karşı örnek olarak seçilemez.",
      },
      {
        prompt: "“∀x∈ℝ, x²≥0” ifadesinin mantıksal değili hangisidir?",
        correct: "∃x∈ℝ, x²<0",
        distractors: ["∀x∈ℝ, x²<0", "∃x∈ℝ, x²≤0", "∀x∈ℝ, x²>0", "∃x∈ℝ, x²≥0"],
        hint: "Hem niceleyiciyi hem ≥ koşulunu olumsuzla; alanı koru.",
        explanation:
          "Her yargısının değili bazı, ≥0 koşulunun değili <0 olur; aynı gerçek sayı alanı korunur. Sonuç ∃x∈ℝ,x²<0’dır. Bu değili oluşturan ifade yanlış olabilir; soru doğru bir alternatif değil mantıksal negasyonu istemektedir.",
      },
      {
        prompt:
          "Birbirinden bağımsız dört önermenin bütün olası doğruluk atamalarının sayısı kaçtır?",
        correct: "16",
        distractors: ["4", "8", "12", "32"],
        hint: "Her bağımsız önerme iki değer alır.",
        explanation:
          "Dört bağımsız seçim için 2·2·2·2=2⁴=16 atama vardır. Bu sayı, tek önermenin kaç farklı değeri olduğunu değil dört önermenin birlikte kaç farklı satır oluşturduğunu gösterir.",
      },
      {
        prompt:
          "Tam sayılarda p:“n 4’e bölünür”, q:“n 2’ye bölünür” olsun. Doğru p⇒q ilişkisinde gerekli ve yeterli koşul rolleri hangisidir?",
        correct: "p, q için yeterli; q, p için gereklidir.",
        distractors: [
          "q, p için yeterli; p, q için gereklidir.",
          "p ve q her zaman denktir.",
          "p ve q hiçbir zaman birlikte doğru olamaz.",
          "p⇒q, n’nin çift olmadığını söyler.",
        ],
        hint: "Koşul yönünde öncül yeterli, sonuç gerekli rolündedir.",
        explanation:
          "n=4k ise n=2(2k) olduğundan p, q’yu sağlar: p yeterlidir. p doğru olacaksa q da doğru olmalıdır, yani q gereklidir. q’nun tek başına p’ye yeterli olmadığı n=2 karşı örneğiyle görülür.",
      },
    ],
  },
];
export const forge014MathGuides: LessonGuide[] = packs.map(
  ({ id, minutes, objectives, sections, examples, recall, source }) => ({
    id,
    minutes,
    objectives,
    sections,
    examples,
    recall,
    source,
  }),
);
export const forge014MathTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge014MathLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "tyt-matematik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: p.questions.map((q, i) => {
    const answer = i % 5,
      options = [...q.distractors];
    options.splice(answer, 0, q.correct);
    return {
      id: `${p.id}-014-${i + 1}`,
      prompt: txt(q.prompt),
      options: options.map(txt),
      answer,
      hint: txt(q.hint),
      explanation: txt(q.explanation),
      skill: p.title,
    };
  }),
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
}));

const finite = (...xs: number[]) => xs.every(Number.isFinite);
export function chartSummary(values: number[]) {
  if (!values.length || !finite(...values) || values.some((v) => v < 0))
    throw new RangeError("CHART_SCOPE");
  const total = values.reduce((a, b) => a + b, 0),
    sorted = [...values].sort((a, b) => a - b),
    n = values.length;
  const mean = total / n,
    middle = Math.floor(n / 2),
    median = n % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  const frequencies = new Map<number, number>();
  for (const v of values) frequencies.set(v, (frequencies.get(v) ?? 0) + 1);
  const top = Math.max(...frequencies.values());
  return {
    total,
    mean,
    median,
    modes:
      top > 1
        ? [...frequencies]
            .filter(([, f]) => f === top)
            .map(([v]) => v)
            .sort((a, b) => a - b)
        : [],
    range: sorted[n - 1] - sorted[0],
    sampleSD:
      n > 1
        ? Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / (n - 1))
        : null,
    shares: values.map((v) => (total > 0 ? v / total : null)),
    angles: values.map((v) => (total > 0 ? (360 * v) / total : null)),
  };
}
export function lineSample(values: number[], time: number, linear: boolean) {
  if (
    values.length !== 3 ||
    !finite(...values, time) ||
    values.some((v) => v < 0) ||
    time < 0 ||
    time > 2
  )
    throw new RangeError("LINE_SCOPE");
  if (Number.isInteger(time)) return values[time];
  if (!linear) return null;
  const i = Math.floor(time);
  return values[i] + (values[i + 1] - values[i]) * (time - i);
}
export type SetOperation =
  | "union"
  | "intersection"
  | "difference"
  | "complement"
  | "symmetric"
  | "neither";
export function vennModel(
  universe: number,
  aMask: number,
  bMask: number,
  operation: SetOperation,
) {
  if (
    ![universe, aMask, bMask].every(Number.isInteger) ||
    universe < 0 ||
    universe > 9 ||
    aMask < 0 ||
    aMask > 511 ||
    bMask < 0 ||
    bMask > 511
  )
    throw new RangeError("SET_SCOPE");
  const E = Array.from({ length: universe }, (_, i) => i + 1),
    A = E.filter((x) => (aMask & (1 << (x - 1))) !== 0),
    B = E.filter((x) => (bMask & (1 << (x - 1))) !== 0);
  const a = new Set(A),
    b = new Set(B),
    onlyA = E.filter((x) => a.has(x) && !b.has(x)),
    both = E.filter((x) => a.has(x) && b.has(x)),
    onlyB = E.filter((x) => !a.has(x) && b.has(x)),
    neither = E.filter((x) => !a.has(x) && !b.has(x));
  const results: Record<SetOperation, number[]> = {
    union: E.filter((x) => a.has(x) || b.has(x)),
    intersection: both,
    difference: onlyA,
    complement: E.filter((x) => !a.has(x)),
    symmetric: E.filter((x) => a.has(x) !== b.has(x)),
    neither,
  };
  if (!Object.hasOwn(results, operation)) throw new RangeError("SET_OPERATION");
  return {
    E,
    A,
    B,
    onlyA,
    both,
    onlyB,
    neither,
    result: results[operation],
    subsetsA: 2 ** A.length,
    properA: 2 ** A.length - 1,
  };
}
export function cartesianProduct<T extends string | number>(
  a: T[],
  b: T[],
): [T, T][] {
  const A = [...new Set(a)],
    B = [...new Set(b)];
  if ([...A, ...B].some((v) => typeof v === "number" && !Number.isFinite(v)))
    throw new RangeError("PRODUCT_SCOPE");
  return A.flatMap((x) => B.map((y) => [x, y] as [T, T]));
}
export function cartesianModel(a: number[], b: number[], swap = false) {
  const first = [...new Set(swap ? b : a)],
    second = [...new Set(swap ? a : b)],
    pairs = cartesianProduct(first, second),
    reverse = cartesianProduct(second, first);
  const reverseKeys = new Set(reverse.map((p) => JSON.stringify(p)));
  return {
    first,
    second,
    pairs,
    size: pairs.length,
    empty: pairs.length === 0,
    reverseEqual:
      pairs.length === reverse.length &&
      pairs.every((p) => reverseKeys.has(JSON.stringify(p))),
  };
}
export type Connective = "and" | "or" | "xor" | "implies" | "iff";
export function evaluateConnective(
  p: boolean,
  q: boolean,
  op: Connective,
): boolean {
  switch (op) {
    case "and":
      return p && q;
    case "or":
      return p || q;
    case "xor":
      return p !== q;
    case "implies":
      return !p || q;
    case "iff":
      return p === q;
    default:
      throw new RangeError("CONNECTIVE_SCOPE");
  }
}
export function conditionalVariants(p: boolean, q: boolean) {
  return {
    original: !p || q,
    converse: !q || p,
    inverse: p || !q,
    contrapositive: q || !p,
    negation: p && !q,
  };
}
export function truthRows(op: Connective) {
  return [
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ].map(([p, q]) => ({ p, q, value: evaluateConnective(p, q, op) }));
}
export type Predicate = "squarePositive" | "positive" | "even";
export function quantifiedModel(
  domain: number[],
  predicate: Predicate,
  quantifier: "all" | "some",
) {
  if (
    !finite(...domain) ||
    !["squarePositive", "positive", "even"].includes(predicate) ||
    !["all", "some"].includes(quantifier)
  )
    throw new RangeError("QUANTIFIER_SCOPE");
  const E = [...new Set(domain)],
    test = (x: number) =>
      predicate === "squarePositive"
        ? x * x > 0
        : predicate === "positive"
          ? x > 0
          : Number.isInteger(x) && x % 2 === 0;
  const trueElements = E.filter(test),
    falseElements = E.filter((x) => !test(x)),
    value =
      quantifier === "all"
        ? falseElements.length === 0
        : trueElements.length > 0;
  return {
    E,
    trueElements,
    falseElements,
    value,
    negatedValue: !value,
    quantifier,
    proofKind:
      quantifier === "all"
        ? value
          ? "all-tested"
          : "counterexample"
        : value
          ? "witness"
          : "none-found",
  };
}
