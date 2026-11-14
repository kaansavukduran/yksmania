import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const packs = [
  {
    id: "elementlerin-siniflandirilmasi",
    title: "Elementlerin sınıflandırılması",
    topic: "detail-148",
    sections: [
      {
        title: "Sınıfı konum ve kanıtla bul",
        paragraphs: [
          "Metal, ametal, yarı metal ve soy gaz sınıfları; elektrik iletkenliği, işlenebilirlik, oda koşullarındaki hâl ve kimyasal davranışın birlikte değerlendirilmesiyle ayrılır. Bir sınıfın sık rastlanan özelliği, bütün üyelerine koşulsuz uygulanacak yasa değildir. Önce sorunun hangi koşulu ve sınıflandırma düzeyini verdiğini belirle.",
          "Periyodik tabloda metaller solda ve ortada, ametaller çoğunlukla sağ üstte, yarı metaller sınır çevresindedir. Hidrojen soldaki 1. grupta yer aldığı hâlde ametaldir. 18. grubun okul düzeyindeki tanıdık üyeleri soy gazlardır. Konum hızlı bir ipucudur; özel örneklerde elementin kimliğini de kullan.",
        ],
      },
      {
        title: "Metallerde hareketli elektronları düşün",
        paragraphs: [
          "Metaller genellikle ısıyı ve elektriği iyi iletir, parlaktır ve tel ya da levha hâline getirilebilir. Metalik bağdaki hareketli elektronlar iletkenliği açıklamaya yardım eder. Oda koşullarında cıva sıvıdır; bu yüzden katı olmak metal olmanın zorunlu koşulu değildir.",
          "Metaller bileşiklerinde çoğunlukla pozitif iyon hâlinde veya pozitif yükseltgenme basamağında bulunur; ametallerle iyonik bileşik oluşturabilir. Metallerden oluşan alaşım bir karışımdır. TYT düzeyindeki bu çerçeveyi, ileri düzeydeki intermetalik bileşiklerin varlığını inkâr eden evrensel bir kurala dönüştürme.",
        ],
      },
      {
        title: "Ametallerin hâli ve yapısı değişebilir",
        paragraphs: [
          "Oda koşullarında oksijen gaz, brom sıvı, iyot katıdır. Dolayısıyla gaz olmak ametal sınıfının tek ölçütü değildir. Katı ametaller genellikle kırılgandır ve iyi iletken değildir; karbonun grafit biçimi elektrik ileten önemli bir istisnadır. Aynı elementin farklı yapısal biçimlerine allotrop denir.",
          "Ametaller kendi aralarında çoğunlukla elektronları ortaklaşa kullanarak kovalent bağ yapar. Bir bileşikte pozitif yükseltgenme basamağı almak, serbest tek atomlu pozitif iyon bulunmasıyla aynı şey değildir. Örneğin bir molekülün içindeki atomun yükseltgenme sayısını gerçek bir iyon yükü gibi yorumlama.",
        ],
      },
      {
        title: "Yarı metaller ve kaynağa bağlı sınırlar",
        paragraphs: [
          "Silisyum gibi yarı metallerin bazı fiziksel özellikleri metallere, kimyasal davranışları ametallere benzer. Katıdırlar; yarı iletkenlikleri teknolojik kullanım açısından önemlidir. Parlaklık tek başına metal olduklarını göstermez; kırılganlık, konum ve diğer kanıtlar birlikte değerlendirilir.",
          "İncelenen MEBİ listesi B, Si, Ge, As, Sb, Te, Po ve At sembollerini yarı metal başlığında verir. Sınırdaki bazı elementlerin sınıflandırması kaynaklar arasında değişebilir. Soru bir şema veya liste veriyorsa onu esas al; bütün periyodik tablo veri tabanlarının aynı sınıf etiketini kullanmasını bekleme.",
        ],
      },
      {
        title: "Soy gazlarda grup ile elektron sayısını ayır",
        paragraphs: [
          "He, Ne, Ar, Kr, Xe ve Rn oda koşullarında tek atomlu gazlar olarak öğretilir. He’nin ilk katmanı iki elektronla doludur; diğer tanıdık üyelerde son katmanda sekiz elektron bulunur. He iki değerlik elektronu taşıdığı için 2. gruba taşınmaz; 18. gruptadır.",
          "Soy gazlar genellikle düşük tepkime eğilimi gösterir. Asla bileşik yapmazlar demek doğru değildir; özellikle Xe ve Kr için uygun koşullarda bileşikler vardır. Og 18. gruptaki sentetik elementtir; kısa ömürlü bu elemente tanıdık soy gazların deneysel oda koşulu özelliklerini otomatik yükleme.",
        ],
      },
      {
        title: "Grup, sınıf ve metal alt sınıfını karıştırma",
        paragraphs: [
          "Alkali metal bir grup ailesidir; metal temel sınıftır; amfoter metal ise asit ve bazlara karşı tepkime davranışıyla ilgilidir. Bir soru metal adları arasında seçim istiyorsa sadece metal–ametal ayrımı yeterli olmayabilir. Al ve Be’nin amfoter davranışı, metal sınıfında bulunmalarını değiştirmez.",
          "Çözüm sırası: verilen konumu veya özellikleri yaz, H/He/Hg/grafit gibi istisnayı kontrol et, istenen sınıflandırma düzeyinde karar ver ve diğer seçenekleri hangi kanıtın elediğini söyle. Erime noktası ve yoğunluk gibi tek sayıyı bütün sınıflar için kesin sınır kabul etme.",
        ],
      },
    ],
    questions: [
      [
        "H 1. gruptadır. Hangi sonuç doğrudur?",
        [
          "Alkali metaldir",
          "Ametaldir",
          "Yarı metaldir",
          "Soy gazdır",
          "Oda koşullarında sıvı metaldir",
        ],
        1,
        "Konum ile sınıfı aynı şey sayma.",
        "Hidrojen 1. grupta bulunmasına rağmen ametaldir; alkali metallerin genel özellikleri H için uygulanmaz.",
      ],
      [
        "Oda koşullarında sıvı olan Hg için hangi yorum uygundur?",
        [
          "Metal olamaz",
          "Mutlaka ametaldir",
          "Metal sınıfındaki hâl istisnasıdır",
          "Soy gazdır",
          "Yarı metal olduğu kesindir",
        ],
        2,
        "Bir genellemenin zorunlu koşul olup olmadığını sorgula.",
        "Cıva oda koşullarında sıvı bir metaldir. Metaller genellikle katıdır ifadesi her metal katıdır anlamına gelmez.",
      ],
      [
        "Karbonun grafit biçimi elektrik iletiyor. Bu gözlem neyi gösterir?",
        [
          "Karbonun proton sayısı değişmiştir",
          "Grafit mutlaka alaşımdır",
          "Bütün ametaller iyi iletkendir",
          "İletkenlik tek başına metal sınıfını kanıtlamaz",
          "Karbon soy gazdır",
        ],
        3,
        "Element kimliği ile yapısal biçimini ayır.",
        "Grafit ametal olan karbonun iletken allotropudur. Bir özelliği gözleyerek kesin metal sınıflandırması yapılamaz.",
      ],
      [
        "He atomunun iki elektronu bulunur. Doğru tablo konumu hangisidir?",
        [
          "1. periyot 18. grup",
          "1. periyot 2. grup",
          "2. periyot 2. grup",
          "2. periyot 18. grup",
          "3. periyot 1. grup",
        ],
        0,
        "Dolu ilk katman istisnasını hatırla.",
        "He ilk katmanı dolu olan soy gazdır; 1. periyot ve 18. gruptadır. İki elektron olması onu 2. gruba yerleştirmez.",
      ],
      [
        "Silisyumun yarı iletken ve kırılgan bir katı olması hangi sınıfla uyumludur?",
        ["Alkali metal", "Soy gaz", "Sıvı metal", "Halojen", "Yarı metal"],
        4,
        "Fiziksel özellikleri bir arada değerlendir.",
        "Silisyum yarı metal örneğidir. Yarı iletkenliği ve kırılganlığı sınıflandırmada birlikte anlam taşır; yalnız parlaklığa bakılmaz.",
      ],
    ],
    examples: [
      {
        title: "Çözümlü örnek 1",
        prompt: "H 1. gruptadır. Hangi sonuç doğrudur?",
        strategy: "Konum ile sınıfı aynı şey sayma.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "H 1. gruptadır. Hangi sonuç doğrudur?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Hidrojen 1. grupta bulunmasına rağmen ametaldir; alkali metallerin genel özellikleri H için uygulanmaz.",
          },
          {
            label: "Sonucu seç",
            explanation: "Ametaldir",
          },
        ],
        answer: "Ametaldir",
        check:
          "Hidrojen 1. grupta bulunmasına rağmen ametaldir; alkali metallerin genel özellikleri H için uygulanmaz.",
        pitfall:
          "Çözüm sırası: verilen konumu veya özellikleri yaz, H/He/Hg/grafit gibi istisnayı kontrol et, istenen sınıflandırma düzeyinde karar ver ve diğer seçenekleri hangi kanıtın elediğini söyle. Erime noktası ve yoğunluk gibi tek sayıyı bütün sınıflar için kesin sınır kabul etme.",
      },
      {
        title: "Çözümlü örnek 2",
        prompt: "Oda koşullarında sıvı olan Hg için hangi yorum uygundur?",
        strategy: "Bir genellemenin zorunlu koşul olup olmadığını sorgula.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Oda koşullarında sıvı olan Hg için hangi yorum uygundur?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Cıva oda koşullarında sıvı bir metaldir. Metaller genellikle katıdır ifadesi her metal katıdır anlamına gelmez.",
          },
          {
            label: "Sonucu seç",
            explanation: "Metal sınıfındaki hâl istisnasıdır",
          },
        ],
        answer: "Metal sınıfındaki hâl istisnasıdır",
        check:
          "Cıva oda koşullarında sıvı bir metaldir. Metaller genellikle katıdır ifadesi her metal katıdır anlamına gelmez.",
        pitfall:
          "Çözüm sırası: verilen konumu veya özellikleri yaz, H/He/Hg/grafit gibi istisnayı kontrol et, istenen sınıflandırma düzeyinde karar ver ve diğer seçenekleri hangi kanıtın elediğini söyle. Erime noktası ve yoğunluk gibi tek sayıyı bütün sınıflar için kesin sınır kabul etme.",
      },
      {
        title: "Çözümlü örnek 3",
        prompt:
          "Karbonun grafit biçimi elektrik iletiyor. Bu gözlem neyi gösterir?",
        strategy: "Element kimliği ile yapısal biçimini ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Karbonun grafit biçimi elektrik iletiyor. Bu gözlem neyi gösterir?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Grafit ametal olan karbonun iletken allotropudur. Bir özelliği gözleyerek kesin metal sınıflandırması yapılamaz.",
          },
          {
            label: "Sonucu seç",
            explanation: "İletkenlik tek başına metal sınıfını kanıtlamaz",
          },
        ],
        answer: "İletkenlik tek başına metal sınıfını kanıtlamaz",
        check:
          "Grafit ametal olan karbonun iletken allotropudur. Bir özelliği gözleyerek kesin metal sınıflandırması yapılamaz.",
        pitfall:
          "Çözüm sırası: verilen konumu veya özellikleri yaz, H/He/Hg/grafit gibi istisnayı kontrol et, istenen sınıflandırma düzeyinde karar ver ve diğer seçenekleri hangi kanıtın elediğini söyle. Erime noktası ve yoğunluk gibi tek sayıyı bütün sınıflar için kesin sınır kabul etme.",
      },
    ],
    recall: [
      {
        prompt: "H 1. gruptadır. Hangi sonuç doğrudur?",
        answer:
          "Hidrojen 1. grupta bulunmasına rağmen ametaldir; alkali metallerin genel özellikleri H için uygulanmaz.",
      },
      {
        prompt:
          "He atomunun iki elektronu bulunur. Doğru tablo konumu hangisidir?",
        answer:
          "He ilk katmanı dolu olan soy gazdır; 1. periyot ve 18. gruptadır. İki elektron olması onu 2. gruba yerleştirmez.",
      },
      {
        prompt:
          "Silisyumun yarı iletken ve kırılgan bir katı olması hangi sınıfla uyumludur?",
        answer:
          "Silisyum yarı metal örneğidir. Yarı iletkenliği ve kırılganlığı sınıflandırmada birlikte anlam taşır; yalnız parlaklığa bakılmaz.",
      },
    ],
  },
  {
    id: "atom-capi-karsilastirma",
    title: "Atom çapı karşılaştırma",
    topic: "detail-149",
    sections: [
      {
        title: "Önce hangi tanecikleri karşılaştırdığını sor",
        paragraphs: [
          "Atomun elektron bulutunun keskin bir dış duvarı yoktur. Yarıçap; bağlanma ve ölçüm tanımına bağlı olarak belirlenir. Aynı tanımla karşılaştırılan yarıçaplar için çapın iki kat olması büyüklük sırasını değiştirmez. Bu derste amaç sayı ezberi değil gerekçeli bağıl sıralamadır.",
          "Nötr atom, kendi iyonu ve eş elektronlu farklı iyonlar için kullanılan karar yolları farklıdır. İşleme başlamadan sembollerdeki yükleri ve atom numaralarını yaz. Sadece element adlarını okuyup iyon yükünü atlamak, yanlış karşılaştırma kuralına götürür.",
        ],
      },
      {
        title: "Aynı grupta yeni katman eklenir",
        paragraphs: [
          "Li, Na ve K aynı gruptadır. Temel hâldeki nötr atomların katman sayıları sırasıyla 2, 3 ve 4’tür. Aşağı inerken dış elektronlar daha uzak enerji düzeylerine yerleşir ve iç elektronların perdelemesi artar; atom yarıçapı genel olarak büyür.",
          "Proton sayısı da arttığı hâlde neden büyür? Çünkü sadece proton sayısına bakmıyoruz: yeni katman ve perdeleme etkisi dış elektronların uzaklığını belirgin biçimde değiştirir. Bu karşılaştırma aynı grup için anlamlıdır; farklı grup ve periyotlarda çatışan eğilimleri tek oka indirgeme.",
        ],
      },
      {
        title: "Aynı periyotta çekirdek yükü artar",
        paragraphs: [
          "Na, Mg ve Al nötr atomları aynı periyotta üç katman taşır. Soldan sağa proton sayısı artarken aynı ana katmana eklenen elektronlar çekirdek artışını tamamen perdelemez. Etkin çekim güçlenir; bu nedenle bu örneklerde Na > Mg > Al yarıçap sırası elde edilir.",
          "Daha çok elektronu olan kesin daha büyüktür kuralı doğru değildir. Karşılaştırma sırasında hem proton hem elektron sayısı değişiyorsa katman sayısını ve etkin çekimi birlikte düşün. Farklı yarıçap tanımlarıyla verilmiş sayıları, özellikle soy gaz sınırında, koşulsuz birleştirme.",
        ],
      },
      {
        title: "Kendi iyonunda proton sayısı sabit kalır",
        paragraphs: [
          "Na elektron verip Na⁺ olduğunda proton sayısı 11 olarak kalır; elektron sayısı 11’den 10’a iner ve dıştaki üçüncü katman boşalır. Katyon, kendi nötr atomundan küçüktür. Elektron vermek çekirdeğe proton eklemek değildir.",
          "Cl elektron alıp Cl⁻ olduğunda proton sayısı 17’de kalır; elektron sayısı 17’den 18’e çıkar. Elektronlar arası itme ve elektron başına çekim değiştiğinden anyon kendi nötr atomundan büyüktür. Bu kural farklı elementlerin rastgele iyonlarına doğrudan uygulanmaz.",
        ],
      },
      {
        title: "Eş elektronlu seride proton sayısını kullan",
        paragraphs: [
          "O²⁻, F⁻, Na⁺ ve Mg²⁺ için elektron sayıları sırasıyla 8+2, 9+1, 11−1 ve 12−2’dir; hepsi 10 elektrondur. Aynı elektron sayılı bu seride proton sayısı büyük olan çekirdek bulutu daha kuvvetli çeker; yarıçap daha küçüktür.",
          "Büyükten küçüğe O²⁻ > F⁻ > Na⁺ > Mg²⁺ bulunur. Önce elektron sayılarını gerçekten hesapla, sonra protonları sırala. Sadece yükün mutlak değerine bakmak hem artı/eksi işaretini hem de çekirdek farkını kaybettirir.",
        ],
      },
      {
        title: "Bir çözümü iki ayrı yönden doğrula",
        paragraphs: [
          "Bir atom–iyon sırası istendiğinde önce atomun kendi iyonuyla ilişkisini kur, sonra eş elektronlu veya aynı periyot karşılaştırmasını ekle. Örneğin Na⁺ < Na ve Mg²⁺ < Mg ayrı doğru ilişkilerdir; bütün dört türün tam sırasını kurmak için ek kanıt gerekebilir.",
          "Son kontrolünde kullandığın kuralı bir cümleyle adlandır: aynı grup–katman, aynı periyot–etkin çekim, aynı element–elektron alışverişi veya eş elektronlu–proton sayısı. Veriler bu kurallardan hiçbirini güvenle desteklemiyorsa rastgele bir çap sırası üretme.",
        ],
      },
    ],
    questions: [
      [
        "Nötr Li, Na ve K aynı grupta, sırasıyla 2, 3 ve 4. periyottadır. Yarıçap sırası hangisidir?",
        [
          "Li > Na > K",
          "Na > K > Li",
          "Li < Na < K",
          "K < Li < Na",
          "Üçü eşittir",
        ],
        2,
        "Katman sayısının değişimini kullan.",
        "Aynı grupta aşağı inerken katman ve perdeleme artar. Bu nedenle Li < Na < K olur.",
      ],
      [
        "Nötr Na, Mg ve Al 3. periyottadır. Yarıçapları büyükten küçüğe nasıl sıralanır?",
        [
          "Al > Mg > Na",
          "Na > Mg > Al",
          "Mg > Al > Na",
          "Na > Al > Mg",
          "Üçü eşittir",
        ],
        1,
        "Katman sabitken çekirdek yüküne bak.",
        "Aynı periyotta artan etkin çekim elektron bulutunu sıkılaştırır. Bu üç atomda Na > Mg > Al olur.",
      ],
      [
        "Atom numaraları O=8, F=9, Na=11, Mg=12 olan O²⁻, F⁻, Na⁺, Mg²⁺ iyonlarından en küçüğü hangisidir?",
        ["O²⁻", "F⁻", "Na⁺", "Mg²⁺", "Hepsi eşit"],
        3,
        "Önce her iyonun elektron sayısını hesapla.",
        "Dördü de 10 elektrondur. Proton sayısı en büyük olan Mg²⁺ aynı sayıda elektronu daha güçlü çeker ve en küçüktür.",
      ],
      [
        "Na atomu bir elektron verip Na⁺ olduğunda hangi değişim beklenir?",
        [
          "Proton sayısı azalır",
          "Elektron sayısı artar",
          "Atom numarası artar",
          "Yeni katman oluşur",
          "Yarıçap küçülür",
        ],
        4,
        "Çekirdek değişmeden bir elektron çıkarılıyor.",
        "Na 11 protonunu korur; elektron sayısı 10 olur, dış katman boşalır ve yarıçap küçülür.",
      ],
      [
        "Cl atomu bir elektron alıp Cl⁻ olduğunda hangi karşılaştırma doğrudur?",
        [
          "Cl⁻, Cl’den büyüktür",
          "Cl⁻, Cl’den küçüktür",
          "Proton sayıları farklıdır",
          "Atom numarası bir artar",
          "İkisi de nötrdür",
        ],
        0,
        "Anyonda çekirdek aynı kalır.",
        "Elektron alan Cl atomunda proton sayısı sabitken elektronlar arası itme artar. Cl⁻ yarıçapı kendi nötr atomundan büyüktür.",
      ],
    ],
    examples: [
      {
        title: "Çözümlü örnek 1",
        prompt:
          "Nötr Li, Na ve K aynı grupta, sırasıyla 2, 3 ve 4. periyottadır. Yarıçap sırası hangisidir?",
        strategy: "Katman sayısının değişimini kullan.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Nötr Li, Na ve K aynı grupta, sırasıyla 2, 3 ve 4. periyottadır. Yarıçap sırası hangisidir?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Aynı grupta aşağı inerken katman ve perdeleme artar. Bu nedenle Li < Na < K olur.",
          },
          {
            label: "Sonucu seç",
            explanation: "Li < Na < K",
          },
        ],
        answer: "Li < Na < K",
        check:
          "Aynı grupta aşağı inerken katman ve perdeleme artar. Bu nedenle Li < Na < K olur.",
        pitfall:
          "Son kontrolünde kullandığın kuralı bir cümleyle adlandır: aynı grup–katman, aynı periyot–etkin çekim, aynı element–elektron alışverişi veya eş elektronlu–proton sayısı. Veriler bu kurallardan hiçbirini güvenle desteklemiyorsa rastgele bir çap sırası üretme.",
      },
      {
        title: "Çözümlü örnek 2",
        prompt:
          "Nötr Na, Mg ve Al 3. periyottadır. Yarıçapları büyükten küçüğe nasıl sıralanır?",
        strategy: "Katman sabitken çekirdek yüküne bak.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Nötr Na, Mg ve Al 3. periyottadır. Yarıçapları büyükten küçüğe nasıl sıralanır?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Aynı periyotta artan etkin çekim elektron bulutunu sıkılaştırır. Bu üç atomda Na > Mg > Al olur.",
          },
          {
            label: "Sonucu seç",
            explanation: "Na > Mg > Al",
          },
        ],
        answer: "Na > Mg > Al",
        check:
          "Aynı periyotta artan etkin çekim elektron bulutunu sıkılaştırır. Bu üç atomda Na > Mg > Al olur.",
        pitfall:
          "Son kontrolünde kullandığın kuralı bir cümleyle adlandır: aynı grup–katman, aynı periyot–etkin çekim, aynı element–elektron alışverişi veya eş elektronlu–proton sayısı. Veriler bu kurallardan hiçbirini güvenle desteklemiyorsa rastgele bir çap sırası üretme.",
      },
      {
        title: "Çözümlü örnek 3",
        prompt:
          "Atom numaraları O=8, F=9, Na=11, Mg=12 olan O²⁻, F⁻, Na⁺, Mg²⁺ iyonlarından en küçüğü hangisidir?",
        strategy: "Önce her iyonun elektron sayısını hesapla.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Atom numaraları O=8, F=9, Na=11, Mg=12 olan O²⁻, F⁻, Na⁺, Mg²⁺ iyonlarından en küçüğü hangisidir?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Dördü de 10 elektrondur. Proton sayısı en büyük olan Mg²⁺ aynı sayıda elektronu daha güçlü çeker ve en küçüktür.",
          },
          {
            label: "Sonucu seç",
            explanation: "Mg²⁺",
          },
        ],
        answer: "Mg²⁺",
        check:
          "Dördü de 10 elektrondur. Proton sayısı en büyük olan Mg²⁺ aynı sayıda elektronu daha güçlü çeker ve en küçüktür.",
        pitfall:
          "Son kontrolünde kullandığın kuralı bir cümleyle adlandır: aynı grup–katman, aynı periyot–etkin çekim, aynı element–elektron alışverişi veya eş elektronlu–proton sayısı. Veriler bu kurallardan hiçbirini güvenle desteklemiyorsa rastgele bir çap sırası üretme.",
      },
    ],
    recall: [
      {
        prompt:
          "Nötr Li, Na ve K aynı grupta, sırasıyla 2, 3 ve 4. periyottadır. Yarıçap sırası hangisidir?",
        answer:
          "Aynı grupta aşağı inerken katman ve perdeleme artar. Bu nedenle Li < Na < K olur.",
      },
      {
        prompt:
          "Na atomu bir elektron verip Na⁺ olduğunda hangi değişim beklenir?",
        answer:
          "Na 11 protonunu korur; elektron sayısı 10 olur, dış katman boşalır ve yarıçap küçülür.",
      },
      {
        prompt:
          "Cl atomu bir elektron alıp Cl⁻ olduğunda hangi karşılaştırma doğrudur?",
        answer:
          "Elektron alan Cl atomunda proton sayısı sabitken elektronlar arası itme artar. Cl⁻ yarıçapı kendi nötr atomundan büyüktür.",
      },
    ],
  },
  {
    id: "iyonlasma-enerjisi",
    title: "İyonlaşma enerjisi",
    topic: "detail-150",
    sections: [
      {
        title: "Elektron koparmak için enerji ver",
        paragraphs: [
          "Birinci iyonlaşma enerjisi, gaz hâlindeki nötr atomdan bir elektron kopararak gaz hâlinde +1 iyon oluşturmak için gereken enerjidir: X(g) + enerji → X⁺(g) + e⁻. Süreç enerji alır; iyonlaşma enerjisi düşüktür demek elektronun kendiliğinden koptuğu anlamına gelmez.",
          "kJ/mol bir mol gaz atomu için gereken enerji miktarını belirtir. Bir elektron başına enerjiyle mol başına enerjiyi karıştırma. Katı metalden elektron çıkarılması veya bağdaki elektronun çekilmesi aynı tanım değildir; gaz hâli ve başlangıç yükü önemlidir.",
        ],
      },
      {
        title: "Ardışık koparmalar farklı başlangıç iyonlarıdır",
        paragraphs: [
          "İkinci iyonlaşma enerjisinde başlangıç X⁺(g), ürün X²⁺(g)’dir. İkinci elektron nötr başka bir atomdan koparılmaz; aynı türün daha pozitif iyonundan koparılır. Aynı elementte ardışık iyonlaşma enerjileri artar.",
          "Her koparma pozitif yükü artırır ve kalan elektronları çıkarmak zorlaşır. Atom numarası Z olan nötr atomda en fazla Z elektron koparılabilir. Üç elektronu olan bir atomun dördüncü iyonlaşma enerjisi varmış gibi işlem yapılmaz.",
        ],
      },
      {
        title: "Periyodik yön bir başlangıç tahminidir",
        paragraphs: [
          "Aynı grupta aşağı inerken dış elektron daha uzak ve daha çok perdelenmiş olur; birinci iyonlaşma enerjisi genel olarak azalır. Bu nedenle Li > Na > K sırası, yarıçap sırasının ters yönündedir.",
          "Aynı periyotta etkin çekim arttıkça birinci iyonlaşma enerjisi genellikle artar. Ancak yarıçapla tam matematiksel ters orantı yoktur. Elektronun bulunduğu orbital ve elektron eşleşmeleri bazı komşu elementlerde genel yönü bozar.",
        ],
      },
      {
        title: "Dolu s ve yarı dolu p istisnaları",
        paragraphs: [
          "Be–B ve Mg–Al karşılaştırmalarında 2A üyesinin dolu s alt kabuğundan elektron çıkarmak, komşu 3A üyesinin daha yüksek enerjili p elektronunu çıkarmaktan zordur. Bu nedenle Be > B ve Mg > Al olur; sağdaki element her adımda daha yüksek değildir.",
          "N–O ve P–S karşılaştırmalarında 5A’nın yarı dolu p düzeni ile 6A’daki eşleşmiş elektronların itmesi önemlidir. O’dan bir elektron çıkarmak N’den çıkarmaya göre daha kolaydır; N > O, P > S. İstisnayı yalnız bir ezber oku olarak değil başlangıç orbital düzeniyle ilişkilendir.",
        ],
      },
      {
        title: "Büyük sıçramanın öncesini say",
        paragraphs: [
          "Ana grup elementinde düşük enerjilerle değerlik elektronları çıkarıldıktan sonra sıradaki elektron iç katmandan koparılmaya başlar. Ardışık enerjiler arasında belirgin bir sıçrama görülür. İlk büyük sıçrama İE₂ ile İE₃ arasındaysa önce iki değerlik elektronu çıkarılmıştır.",
          "Bu ipucu ana grup bağlamında kullanılır; bütün geçiş metallerine otomatik bir grup numarası kuralı değildir. Sıçramanın kat sayısı evrensel sabit bir eşik değildir: verilen dizideki değişimi, elektron düzenini ve sorunun ana grup koşulunu birlikte oku. Üçüncü enerji sıçradı diye üç değerlik elektronu deme.",
        ],
      },
      {
        title: "Veriyle tahmini karşılaştır",
        paragraphs: [
          "MEBİ’nin ana grup örneğindeki 900, 1750, 14850, 21000 kJ/mol dizisinde ilk artış yaklaşık iki kat, ikincisi çok daha büyüktür. İlk iki elektron dış katmandandır; bu örneğin iki değerlik elektronu vardır. Verilen bir tablo, tek bir periyodik ok ezberinden daha güçlü kanıttır.",
          "Çözümün sonunda ilk iyonlaşma mı ardışık enerji mi sorulduğunu, gaz hâlini ve birimi kontrol et. İyonlaşma, elektron alma enerjisi veya bağdaki ortak elektron çekimi değildir. Aynı sözcükte elektron geçmesi bu süreçleri eşitlemez.",
        ],
      },
    ],
    questions: [
      [
        "Birinci iyonlaşma enerjisinin doğru süreci hangisidir?",
        [
          "X(g)+e⁻ → X⁻(g)",
          "X⁺(g) → X²⁺(g)+e⁻",
          "X(k) → X(s)",
          "X(g)+enerji → X⁺(g)+e⁻",
          "X⁻(g)+e⁻ → X²⁻(g)",
        ],
        3,
        "Gaz hâlindeki nötr başlangıcı ve elektron kopmasını ara.",
        "Birinci iyonlaşma nötr gaz atomundan ilk elektronu koparmaktır. X⁺ başlangıcı ikinci iyonlaşma olur.",
      ],
      [
        "Aynı gruptaki Li, Na, K için birinci iyonlaşma enerjisi büyükten küçüğe hangisidir?",
        [
          "Li > Na > K",
          "K > Na > Li",
          "Na > Li > K",
          "Li > K > Na",
          "Üçü eşittir",
        ],
        0,
        "Dış elektronun çekirdekten uzaklaşmasını düşün.",
        "Grupta aşağı inerken yarıçap ve perdeleme artar; dış elektron daha kolay kopar. Li > Na > K bulunur.",
      ],
      [
        "Na, Mg, Al aynı periyottadır. Birinci iyonlaşma enerjilerinin küçükten büyüğe sırası hangisidir?",
        [
          "Na < Mg < Al",
          "Al < Na < Mg",
          "Na < Al < Mg",
          "Mg < Al < Na",
          "Mg < Na < Al",
        ],
        2,
        "2A–3A düzensizliğini uygula.",
        "Mg’nin dolu 3s düzeninden elektron çıkarmak Al’nin 3p elektronunu çıkarmaktan daha zordur. Na < Al < Mg olur.",
      ],
      [
        "Ana grup elementi için İE₁=900, İE₂=1750, İE₃=14850, İE₄=21000 kJ/mol verilmiştir. Değerlik elektron sayısı kaçtır?",
        ["1", "2", "3", "4", "Kesinlikle 8"],
        1,
        "İlk belirgin sıçramadan önce kaç elektron çıkarıldı?",
        "Büyük artış ikinci ile üçüncü enerji arasındadır. İki değerlik elektronu çıkarıldıktan sonra iç katmana geçilir; değerlik elektron sayısı 2 olur.",
      ],
      [
        "N ve O aynı periyottadır. İE₁(N) > İE₁(O) olmasının temel açıklaması hangisidir?",
        [
          "N’nin atom numarası daha büyük",
          "O soy gazdır",
          "İyonlaşma enerji verir",
          "N’de hiç p elektronu yoktur",
          "O’nun p orbitalindeki elektron eşleşmesi kopmayı kolaylaştırır",
        ],
        4,
        "Yarı dolu p düzeni ile eşleşmiş elektronları karşılaştır.",
        "N yarı dolu p düzenindedir; O’daki eşleşen elektronlar arasındaki itme koparmayı kolaylaştırır. Bu 5A–6A istisnasıdır.",
      ],
    ],
    examples: [
      {
        title: "Çözümlü örnek 1",
        prompt: "Birinci iyonlaşma enerjisinin doğru süreci hangisidir?",
        strategy: "Gaz hâlindeki nötr başlangıcı ve elektron kopmasını ara.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Birinci iyonlaşma enerjisinin doğru süreci hangisidir?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Birinci iyonlaşma nötr gaz atomundan ilk elektronu koparmaktır. X⁺ başlangıcı ikinci iyonlaşma olur.",
          },
          {
            label: "Sonucu seç",
            explanation: "X(g)+enerji → X⁺(g)+e⁻",
          },
        ],
        answer: "X(g)+enerji → X⁺(g)+e⁻",
        check:
          "Birinci iyonlaşma nötr gaz atomundan ilk elektronu koparmaktır. X⁺ başlangıcı ikinci iyonlaşma olur.",
        pitfall:
          "Çözümün sonunda ilk iyonlaşma mı ardışık enerji mi sorulduğunu, gaz hâlini ve birimi kontrol et. İyonlaşma, elektron alma enerjisi veya bağdaki ortak elektron çekimi değildir. Aynı sözcükte elektron geçmesi bu süreçleri eşitlemez.",
      },
      {
        title: "Çözümlü örnek 2",
        prompt:
          "Aynı gruptaki Li, Na, K için birinci iyonlaşma enerjisi büyükten küçüğe hangisidir?",
        strategy: "Dış elektronun çekirdekten uzaklaşmasını düşün.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Aynı gruptaki Li, Na, K için birinci iyonlaşma enerjisi büyükten küçüğe hangisidir?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Grupta aşağı inerken yarıçap ve perdeleme artar; dış elektron daha kolay kopar. Li > Na > K bulunur.",
          },
          {
            label: "Sonucu seç",
            explanation: "Li > Na > K",
          },
        ],
        answer: "Li > Na > K",
        check:
          "Grupta aşağı inerken yarıçap ve perdeleme artar; dış elektron daha kolay kopar. Li > Na > K bulunur.",
        pitfall:
          "Çözümün sonunda ilk iyonlaşma mı ardışık enerji mi sorulduğunu, gaz hâlini ve birimi kontrol et. İyonlaşma, elektron alma enerjisi veya bağdaki ortak elektron çekimi değildir. Aynı sözcükte elektron geçmesi bu süreçleri eşitlemez.",
      },
      {
        title: "Çözümlü örnek 3",
        prompt:
          "Na, Mg, Al aynı periyottadır. Birinci iyonlaşma enerjilerinin küçükten büyüğe sırası hangisidir?",
        strategy: "2A–3A düzensizliğini uygula.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Na, Mg, Al aynı periyottadır. Birinci iyonlaşma enerjilerinin küçükten büyüğe sırası hangisidir?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Mg’nin dolu 3s düzeninden elektron çıkarmak Al’nin 3p elektronunu çıkarmaktan daha zordur. Na < Al < Mg olur.",
          },
          {
            label: "Sonucu seç",
            explanation: "Na < Al < Mg",
          },
        ],
        answer: "Na < Al < Mg",
        check:
          "Mg’nin dolu 3s düzeninden elektron çıkarmak Al’nin 3p elektronunu çıkarmaktan daha zordur. Na < Al < Mg olur.",
        pitfall:
          "Çözümün sonunda ilk iyonlaşma mı ardışık enerji mi sorulduğunu, gaz hâlini ve birimi kontrol et. İyonlaşma, elektron alma enerjisi veya bağdaki ortak elektron çekimi değildir. Aynı sözcükte elektron geçmesi bu süreçleri eşitlemez.",
      },
    ],
    recall: [
      {
        prompt: "Birinci iyonlaşma enerjisinin doğru süreci hangisidir?",
        answer:
          "Birinci iyonlaşma nötr gaz atomundan ilk elektronu koparmaktır. X⁺ başlangıcı ikinci iyonlaşma olur.",
      },
      {
        prompt:
          "Ana grup elementi için İE₁=900, İE₂=1750, İE₃=14850, İE₄=21000 kJ/mol verilmiştir. Değerlik elektron sayısı kaçtır?",
        answer:
          "Büyük artış ikinci ile üçüncü enerji arasındadır. İki değerlik elektronu çıkarıldıktan sonra iç katmana geçilir; değerlik elektron sayısı 2 olur.",
      },
      {
        prompt:
          "N ve O aynı periyottadır. İE₁(N) > İE₁(O) olmasının temel açıklaması hangisidir?",
        answer:
          "N yarı dolu p düzenindedir; O’daki eşleşen elektronlar arasındaki itme koparmayı kolaylaştırır. Bu 5A–6A istisnasıdır.",
      },
    ],
  },
  {
    id: "elektron-ilgisi-elektronegatiflik",
    title: "Elektron ilgisi, elektronegatiflik ve metalik özellik",
    topic: "detail-151",
    sections: [
      {
        title: "Aynı elektron sözcüğü farklı süreçleri anlatır",
        paragraphs: [
          "Elektron ilgisi gaz hâlindeki bir atomun elektron almasına eşlik eden enerji değişimiyle ilgilidir. Elektronegatiflik ise bağ yapmış bir atomun ortak elektronları kendine çekme eğilimidir. Biri enerji süreci, diğeri bağ içindeki göreli çekim ölçüsüdür.",
          "İyonlaşma enerjisi elektron koparmayı anlatır. Bu üç kavramda önce başlangıç türünü ve elektronun nereye gittiğini yaz: atomdan uzaklaşıyor mu, gaz atomuna ekleniyor mu, yoksa bağda iki atom arasında mı paylaşılıyor? Tanımı belirlemeden periyodik ok çizme.",
        ],
      },
      {
        title: "Elektron ilgisinde işaret sözleşmesini oku",
        paragraphs: [
          "X(g)+e⁻ → X⁻(g) sürecinde enerji açığa çıkıyorsa termodinamik enerji değişimi negatiftir. Bazı kaynaklar ise açığa çıkan enerjinin pozitif büyüklüğünü elektron ilgisi olarak yazar. Aynı fiziksel olayın iki farklı işaretle yazılabilmesi çelişki değildir; tanım değişmiştir.",
          "Örneğin ΔE değerleri −349 ve −328 kJ/mol olarak verilmişse −349 daha fazla enerji açığa çıkarır, fakat cebirsel olarak daha büyük sayı değildir. Sorunun daha büyük enerji kazancı mı yoksa daha büyük sayısal ΔE mi sorduğunu açıkça ayır.",
        ],
      },
      {
        title: "Elektron ilgisi okunda istisnayı koru",
        paragraphs: [
          "Ana grup elementleri için periyodik genel eğilim yararlı bir ilk tahmindir; ancak alt kabuk düzeni ve küçük hacimdeki elektron itmesi düzenlilikten sapmalar yaratır. Halojenlerde ilk elektron alımında açığa çıkan enerji büyüklüğü Cl için F’den fazladır; en yüksek elektronegatifliğin F’de olması bunu değiştirmez.",
          "Bir anyona ikinci elektronun eklenmesi elektronlar arası itmeye karşı yapılır ve gaz fazında enerji gerektirir. Birinci elektron alımı enerji verebilir diye ardışık bütün elektron alımlarının enerji verdiğini varsayma. Sayısal veri varsa önce veriyi kullan.",
        ],
      },
      {
        title: "Elektronegatiflik bağ içindeki çekimdir",
        paragraphs: [
          "Pauling ölçeğindeki elektronegatiflik sayıları göreli ve birimsizdir. Aynı periyotta genellikle sağa, aynı grupta genellikle yukarı doğru artar; yaygın okul ölçeğinde en yüksek değer F’dedir. TYT’de soy gazlara çoğunlukla değer verilmez; değersiz hücreyi sıfır diye doldurma.",
          "H–Cl bağında Cl ortak elektronları daha güçlü çeker ve bağın Cl ucu kısmi negatif olur. Bu, HCl molekülünü H⁺ ile Cl⁻ iyonlarından oluşan bir kristal gibi çizmek değildir. Bağ kutupluluğu ile molekülün toplam kutupluluğu da ayrı kararlar gerektirir.",
        ],
      },
      {
        title: "Metalik karakter elektron vermeye yatkınlıkla ilişkilidir",
        paragraphs: [
          "Aynı grupta aşağı inerken dış elektronu tutmak zorlaşır; metalik karakter genel olarak artar. Aynı periyotta sağa ilerlerken elektron verme eğilimi genel olarak azalır. Li, Na, K için metalik karakter Li < Na < K biçimindedir.",
          "Ametalik karakter aynı periyotta sağa ve aynı grupta yukarı doğru artma eğilimindedir. Bu nitel eğilimleri iletkenlik, yoğunluk, erime noktası veya bütün tepkime hızları için zorunlu sayısal sıra sanma. Deney koşulları değişen metal aktifliği karşılaştırmalarında ayrıca verilen kanıtı kullan.",
        ],
      },
      {
        title: "Dört kavramı tek soruda ayır",
        paragraphs: [
          "Bir soruda elektron ilgisi için enerji tablosu, elektronegatiflik için bağ ve metalik karakter için konum aynı anda verilebilir. Her önermeyi kendi tanımıyla değerlendir; F’nin EN değeri en yüksek diye elektron ilgisi enerjisinin de en büyük olduğunu söyleme.",
          "Bağ elektronunu çekme, elektron alma ve elektron verme kavramlarını birer cümleyle yeniden açıkla. Sonra birimi kontrol et: EN birimsiz, enerji değişimleri genellikle kJ/mol’dür. Hesaplamadan önce bu ayrımı yapmak, yanlış büyüklükleri karşılaştırmanı önler.",
        ],
      },
    ],
    questions: [
      [
        "H–Cl bağında Cl’nin ortak elektronları daha güçlü çekmesini hangi kavram anlatır?",
        [
          "İyonlaşma enerjisi",
          "Elektronegatiflik",
          "Atom kütlesi",
          "Elektron sayısının korunmaması",
          "Çekirdek bozunması",
        ],
        1,
        "Elektronlar bağ içinde paylaşılmaya devam ediyor.",
        "Elektronegatiflik bağdaki ortak elektronları çekme eğilimidir. Bu olay tek gaz atomuna elektron ekleme süreci değildir.",
      ],
      [
        "X(g)+e⁻ → X⁻(g) için ΔE=−350 kJ/mol verilmiştir. Doğru yorum hangisidir?",
        [
          "Elektron koparılmıştır",
          "350 kJ/mol enerji alınmıştır",
          "Atom numarası artmıştır",
          "350 kJ/mol enerji açığa çıkmıştır",
          "Süreç elektronegatiflik ölçümüdür",
        ],
        3,
        "Negatif enerji değişimi neyi gösterir?",
        "Termodinamik işaret sözleşmesinde negatif ΔE enerji açığa çıktığını gösterir. Gaz atomu elektron almıştır; çekirdek değişmez.",
      ],
      [
        "Elektronegatifliği en yüksek yaygın element F iken elektron alımında açığa çıkan enerji büyüklüğünün Cl’de daha fazla olması neyi gösterir?",
        [
          "İki kavramın tanımları ve süreçleri farklıdır",
          "F metal olmalıdır",
          "Cl’nin proton sayısı azalır",
          "Elektron ilgisi birimsizdir",
          "Bütün periyodik özellikler aynıdır",
        ],
        0,
        "Bağ içindeki çekim ile tek atomun enerji değişimini ayır.",
        "EN bağ içi göreli çekimdir, elektron ilgisi gaz atomuna elektron ekleme enerjisidir; maksimumlarının aynı elementte olması gerekmez.",
      ],
      [
        "Aynı gruptaki Li, Na ve K için metalik karakterin artış sırası hangisidir?",
        [
          "K < Na < Li",
          "Na < Li < K",
          "Li < Na < K",
          "Li < K < Na",
          "Üçü daima eşittir",
        ],
        2,
        "Grupta aşağı giderken dış elektronun tutulması zorlaşır mı?",
        "Yeni katman ve artan perdeleme elektron vermeyi kolaylaştırır; metalik karakter genel olarak Li < Na < K olur.",
      ],
      [
        "Hangisi elektronegatiflik için doğru bir ifadedir?",
        [
          "Birimi kJ/mol’dür",
          "Gaz atomundan ilk elektron kopmasıdır",
          "Bütün soy gazlar için sıfırdır",
          "Elektron sayısıyla aynıdır",
          "Bağ içi göreli çekimi anlatır ve Pauling ölçeğinde birimsizdir",
        ],
        4,
        "Bir enerji süreci mi bir bağıl ölçek mi?",
        "Elektronegatiflik Pauling ölçeğinde birimsiz göreli çekim ölçüsüdür. Değer verilmeyen soy gaz hücresine otomatik sıfır yazılmaz.",
      ],
    ],
    examples: [
      {
        title: "Çözümlü örnek 1",
        prompt:
          "H–Cl bağında Cl’nin ortak elektronları daha güçlü çekmesini hangi kavram anlatır?",
        strategy: "Elektronlar bağ içinde paylaşılmaya devam ediyor.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "H–Cl bağında Cl’nin ortak elektronları daha güçlü çekmesini hangi kavram anlatır?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Elektronegatiflik bağdaki ortak elektronları çekme eğilimidir. Bu olay tek gaz atomuna elektron ekleme süreci değildir.",
          },
          {
            label: "Sonucu seç",
            explanation: "Elektronegatiflik",
          },
        ],
        answer: "Elektronegatiflik",
        check:
          "Elektronegatiflik bağdaki ortak elektronları çekme eğilimidir. Bu olay tek gaz atomuna elektron ekleme süreci değildir.",
        pitfall:
          "Bağ elektronunu çekme, elektron alma ve elektron verme kavramlarını birer cümleyle yeniden açıkla. Sonra birimi kontrol et: EN birimsiz, enerji değişimleri genellikle kJ/mol’dür. Hesaplamadan önce bu ayrımı yapmak, yanlış büyüklükleri karşılaştırmanı önler.",
      },
      {
        title: "Çözümlü örnek 2",
        prompt:
          "X(g)+e⁻ → X⁻(g) için ΔE=−350 kJ/mol verilmiştir. Doğru yorum hangisidir?",
        strategy: "Negatif enerji değişimi neyi gösterir?",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "X(g)+e⁻ → X⁻(g) için ΔE=−350 kJ/mol verilmiştir. Doğru yorum hangisidir?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "Termodinamik işaret sözleşmesinde negatif ΔE enerji açığa çıktığını gösterir. Gaz atomu elektron almıştır; çekirdek değişmez.",
          },
          {
            label: "Sonucu seç",
            explanation: "350 kJ/mol enerji açığa çıkmıştır",
          },
        ],
        answer: "350 kJ/mol enerji açığa çıkmıştır",
        check:
          "Termodinamik işaret sözleşmesinde negatif ΔE enerji açığa çıktığını gösterir. Gaz atomu elektron almıştır; çekirdek değişmez.",
        pitfall:
          "Bağ elektronunu çekme, elektron alma ve elektron verme kavramlarını birer cümleyle yeniden açıkla. Sonra birimi kontrol et: EN birimsiz, enerji değişimleri genellikle kJ/mol’dür. Hesaplamadan önce bu ayrımı yapmak, yanlış büyüklükleri karşılaştırmanı önler.",
      },
      {
        title: "Çözümlü örnek 3",
        prompt:
          "Elektronegatifliği en yüksek yaygın element F iken elektron alımında açığa çıkan enerji büyüklüğünün Cl’de daha fazla olması neyi gösterir?",
        strategy: "Bağ içindeki çekim ile tek atomun enerji değişimini ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Elektronegatifliği en yüksek yaygın element F iken elektron alımında açığa çıkan enerji büyüklüğünün Cl’de daha fazla olması neyi gösterir?",
          },
          {
            label: "Gerekçeyi uygula",
            explanation:
              "EN bağ içi göreli çekimdir, elektron ilgisi gaz atomuna elektron ekleme enerjisidir; maksimumlarının aynı elementte olması gerekmez.",
          },
          {
            label: "Sonucu seç",
            explanation: "İki kavramın tanımları ve süreçleri farklıdır",
          },
        ],
        answer: "İki kavramın tanımları ve süreçleri farklıdır",
        check:
          "EN bağ içi göreli çekimdir, elektron ilgisi gaz atomuna elektron ekleme enerjisidir; maksimumlarının aynı elementte olması gerekmez.",
        pitfall:
          "Bağ elektronunu çekme, elektron alma ve elektron verme kavramlarını birer cümleyle yeniden açıkla. Sonra birimi kontrol et: EN birimsiz, enerji değişimleri genellikle kJ/mol’dür. Hesaplamadan önce bu ayrımı yapmak, yanlış büyüklükleri karşılaştırmanı önler.",
      },
    ],
    recall: [
      {
        prompt:
          "H–Cl bağında Cl’nin ortak elektronları daha güçlü çekmesini hangi kavram anlatır?",
        answer:
          "Elektronegatiflik bağdaki ortak elektronları çekme eğilimidir. Bu olay tek gaz atomuna elektron ekleme süreci değildir.",
      },
      {
        prompt:
          "Aynı gruptaki Li, Na ve K için metalik karakterin artış sırası hangisidir?",
        answer:
          "Yeni katman ve artan perdeleme elektron vermeyi kolaylaştırır; metalik karakter genel olarak Li < Na < K olur.",
      },
      {
        prompt: "Hangisi elektronegatiflik için doğru bir ifadedir?",
        answer:
          "Elektronegatiflik Pauling ölçeğinde birimsiz göreli çekim ölçüsüdür. Değer verilmeyen soy gaz hücresine otomatik sıfır yazılmaz.",
      },
    ],
  },
] as const;
export const periodicDepthGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: 40,
  objectives: [
    `${p.title} konusundaki temel kavramları birbirinden ayır.`,
    "Verilen koşulları kullanarak sıralama ve sınıflandırmayı gerekçelendir.",
    "İstisnayı ve yanlış genellemenin nedenini açıkla.",
  ],
  sections: p.sections.map((s) => ({
    title: s.title,
    paragraphs: [...s.paragraphs],
  })),
  examples: p.examples.map((e) => ({
    ...e,
    steps: e.steps.map((s) => ({ ...s })),
  })),
  recall: p.recall.map((r) => ({ ...r })),
  source:
    "MEBİ TYT Kimya Konu Özetleri, basılı s.30–34 (Drive metni doğrudan okundu); Aurelia TYT Kimya 010–013 kopya kağıtları, s.2–3. Özgün öğretim ve alıştırmalar; resmî sınav sorusu değildir.",
}));
export const periodicDepthTopics = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const periodicDepthLessons: Lesson[] = packs.map((p, i) => ({
  id: p.id,
  title: txt(p.title),
  subjectId: "tyt-kimya",
  minutes: 40,
  tags: [p.id],
  source: txt(
    "MEBİ TYT Kimya Konu Özetleri, basılı s.30–34 (Drive metni doğrudan okundu); Aurelia TYT Kimya 010–013 kopya kağıtları, s.2–3. Özgün öğretim ve alıştırmalar; resmî sınav sorusu değildir.",
  ),
  objectives: periodicDepthGuides[i].objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: p.questions.map((q, j) => ({
    id: `${p.id}-q${j + 1}`,
    prompt: txt(q[0]),
    options: q[1].map(txt),
    answer: q[2],
    hint: txt(q[3]),
    explanation: txt(q[4]),
    skill: p.id,
  })),
}));
