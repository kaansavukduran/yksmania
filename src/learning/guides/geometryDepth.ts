import type { LessonGuide } from "./types";

export const geometryDepthGuide: LessonGuide = {
  id: "alan-donusumleri",
  minutes: 50,
  objectives: [
    "Alanı uzunluk ve çevreden ayır; doğru alan birimini kullan.",
    "Seçilen tabanın dik yüksekliğini dar, dik ve geniş açılı üçgende belirle.",
    "Öteleme ve döndürmede parça alanlarını koruyarak üçgen/paralelkenar formülünü açıkla.",
    "Ortak taban/yükseklik, kenarortay, benzerlik ve paralelkenar bölge alanlarını gerekçelendir.",
  ],
  sections: [
    {
      title: "Alan, kaplanan bölgenin ölçüsüdür",
      paragraphs: [
        "Uzunluk bir çizginin, çevre sınırın toplam uzunluğunun, alan ise düzlemde kaplanan bölgenin ölçüsüdür. Dikdörtgende 4 cm ve 7 cm kenarların alanı 28 cm², çevresi 22 cm olur. 4 ile 7’yi toplayıp alan bulamayız. Şeklin eğik görünmesi alanın bulunamayacağı anlamına gelmez; uygun bir taban ve ona ait dik uzaklık aranır.",
        "Uzunluklar aynı birime getirildikten sonra çarpılır. 1 m=100 cm olduğundan 1 m²=10 000 cm²’dir; yalnız 100 ile çarpmak alan dönüşümünü tamamlamaz. Örneğin 50 cm ile 0,8 m kenarlı dikdörtgenin alanı 50·80=4000 cm²=0,4 m². Birim kareleri sayma fikri, formüllerde neden iki uzunluğun çarpıldığını açıklar.",
      ],
    },
    {
      title: "Tabanı seçtiğinde yüksekliği de yeniden seçmiş olursun",
      paragraphs: [
        "ABC üçgeninde BC’yi taban seçersek yükseklik, A’dan BC doğrusuna indirilen dikmenin uzunluğudur. Aynı şekil için AB başka bir taban olabilir; bu durumda yükseklik C’den AB doğrusuna olan dik uzaklıktır. Her kenar kendi karşısındaki köşenin o kenar doğrusuna uzaklığıyla eşleştirilmelidir. Bir kenarın yanına yazılmış her sayı yükseklik değildir.",
        "Dar açılı üçgende yüksekliklerin ayakları kenarların üzerinde olabilir. Geniş açılı üçgende seçilen tabana ait dikmenin ayağı kenarın uzantısına düşebilir; alan formülü değişmez. Dik üçgende dik kenarlardan biri taban, diğeri onun yüksekliği olur. Eğik kenarı yüksekliğin yerine kullanmak, dik uzaklıkla yan uzunluğu karıştırmaktır. Çizim ölçekli değilse dikliği görünüşten değil verilen işaret ve koşullardan çıkar.",
      ],
    },
    {
      title: "Parçaları taşırken hangi işlemler alanı korur?",
      paragraphs: [
        "Bir parçayı düzlemde kaydırmak, döndürmek veya yansıtmak uzunluklarını ve alanını değiştirmez; bu işlemler parçanın eş bir görüntüsünü oluşturur. Parçaları boşluksuz ve üst üste binmeden yeniden birleştirirsek toplam alan aynı kalır. Bir parçayı büyütmek, küçültmek, silmek veya aynı bölgeyi iki kez saymak bu gerekçeyi bozar.",
        "Modelde paralelkenarın bir yanındaki üçgen karşı boşluğa taşınır. Taşınan üçgenin büyüklüğü değişmez; kalan parçayla birlikte tabanı b, yüksekliği h olan dikdörtgen olur. Modelde tabanı veya yüksekliği değiştirmek yeni bir şekil üretir; bununla yalnız taşıma adımını aynı şey sanma. Bir şekilden diğerine geçerken alanın korunup korunmadığını her parçayı izleyerek denetle.",
      ],
    },
    {
      title: "Paralelkenarda alan: eğikliği değil dik uzaklığı kullan",
      paragraphs: [
        "Paralelkenarın karşılıklı kenarları paraleldir. Seçilen taban boyunca iki paralel doğru arasındaki dik uzaklık sabittir. Kesip yeniden yerleştirme, A=b·h formülünü dikdörtgene bağlar. Yan kenar 7 cm ve taban 10 cm verildiğinde alanı 70 cm² diyemeyiz; yan kenarın tabana dik olduğu veya ona ait uygun yüksekliğin verildiği bilinmelidir.",
        "İki komşu kenar a,b ve aralarındaki açı α biliniyorsa ilgili yükseklik b·sinα olur; A=a·b·sinα. Açının hangi iki kenar arasında olduğunu denetle. Dikdörtgende α=90° olduğundan sinα=1 ve a·b elde edilir. Taban ve dik yükseklik aynı kaldıkça paralelkenarın eğiminin değişmesi alanı değiştirmez; çevre ise değişebilir.",
      ],
    },
    {
      title: "Üçgen alanındaki yarım nereden gelir?",
      paragraphs: [
        "Bir üçgenin eş bir kopyası uygun biçimde döndürülüp yanına getirildiğinde tabanı b, dik yüksekliği h olan paralelkenar oluşur. Toplam alan b·h, iki eş üçgenin her birinin alanı b·h/2 olur. 1/2 katsayısı bir ezber düzeltmesi değil, iki eş parçanın aynı bütünü paylaşmasının sonucudur. Geniş açılı üçgende de taban doğrusu ve dik uzaklık kullanılarak aynı formül geçerlidir.",
        "ABC üçgeninin BC=a, CA=b, AB=c kenarlarına ait dik yükseklikleri sırasıyla hₐ,hᵦ,h𝒸 olsun. Aynı alan A=a·hₐ/2=b·hᵦ/2=c·h𝒸/2 ile hesaplanır. Dik üçgende iki dik kenarın çarpımının yarısı kullanılabilir. İki kenar b,c ve aralarındaki açı α biliniyorsa A=b·c·sinα/2; arada olmayan açı bu formüle doğrudan yazılamaz.",
      ],
    },
    {
      title: "Alan oranını bulurken ortak olan büyüklüğü sadeleştir",
      figureTitle: "Alan oranını bulurken ortak olan büyüklüğü sadeleştir",
      paragraphs: [
        "A ve D köşelerinin BC doğrusuna olan dik uzaklıkları h₁,h₂ ise ABC ve DBC üçgenleri aynı BC tabanını paylaşır: alan oranı h₁/h₂’dir. A ile D aynı paralel üzerinde ve bu paralel BC’ye paralelse yükseklikler eşittir; alanlar da eşittir. İki şeklin eş alanlı olması tek başına eş veya benzer olduklarını kanıtlamaz.",
        "ABC üçgeninde D, BC üzerinde bir nokta olsun. ABD ve ADC üçgenlerinin A’dan BC doğrusuna yükseklikleri aynıdır; A(ABD)/A(ADC)=BD/DC. Örneğin BD:DC=2:3 ise alanlar da 2:3 oranında paylaşılır. Büyük üçgenin alanını küçük parçalara bölerken oran paylarının toplamını kullan: toplam 5 paydır. Tabanların aynı doğru üzerinde oluşu ortak yükseklik gerekçesi için önemlidir.",
        "PAB üçgeninde alan 75 ve P’den AB’ye dik uzaklık 6 birim. AB=2·75/6=25. A, D ve B bu sıradaysa AD:DB=2:3, AD=10 ve DB=15. İki parça aynı 6 birim yüksekliği kullanır ve alanları 30 ile 45 olur. P sola veya sağa kaydığında dik uzaklık aynı kaldığı sürece alanlar değişmez.",
      ],
    },
    {
      title: "Kenarortay ve ağırlık merkezinde eş alanlar",
      paragraphs: [
        "Bir kenarortay, köşeyi karşı kenarın orta noktasına birleştirir. BC’nin orta noktası D ise BD=DC; ortak yükseklikten ABD ve ADC eş alanlıdır. Kenarortay iki küçük üçgenin her durumda eş üçgenler olduğunu söylemez; kenar ve açıları ayrıca denetlemeden eşlik sonucu çıkarılmaz.",
        "Üç kenarortay ağırlık merkezinde kesişir. Kenarların orta noktalarıyla birlikte çizilen üç kenarortay, başlangıç üçgenini altı eş alanlı küçük üçgene ayırır. Bu eş alanlı parçalar genel bir üçgende aynı biçimde olmak zorunda değildir. Toplam alan 72 birim² ise her küçük parçanın alanı 12 birim² olur; şeklin kaç küçük parçayı birleştirdiğini sayarak daha büyük bölgeler bulunabilir.",
      ],
    },
    {
      title: "Benzerlikte uzunluk oranı ile alan oranını ayır",
      paragraphs: [
        "Benzer iki üçgende karşılıklı uzunluklar k katına çıkıyorsa yükseklik de k katına çıkar. Alan b·h/2 olduğundan alan k² katına çıkar. Uzunluk oranı 3/2 ise alan oranı 9/4; alan oranı 25/9 ise pozitif uzunluk oranı 5/3’tür. Yalnız bir tabanın üç kat olması, yükseklik sabitken alanı üç kat yapar; iki şeklin benzerliği verilmeden otomatik dokuz kat sonucu çıkarma.",
        "Eşlik, karşılıklı uzunlukların ve açıların korunduğu daha özel durumdur; benzerlik oranı 1 olan benzer şekiller eştir. Alanların eşitliği tek başına ne eşlik ne benzerliktir. Kenarları 2 ve 6 olan dikdörtgenle 3 ve 4 olan dikdörtgenin alanları 12’dir ama kenar oranları uyuşmadığından benzer değillerdir. Çevresi eş olan şekillerin de alanları farklı olabilir.",
      ],
    },
    {
      title: "Paralelkenarı bölen doğrularda alan ilişkileri",
      paragraphs: [
        "ABCD sıralı köşeli bir paralelkenar olsun. AC köşegeni ABC ve ADC üçgenlerini eş alanlara ayırır; karşı kenarlar eşit ve paralel olduğundan iki üçgen eştir. E, DC kenarı üzerindeyse ABE üçgeninin tabanı AB ve yüksekliği bütün paralelkenarın yüksekliğidir. Bu yüzden A(ABE)=A(ABCD)/2; kalan ADE ile BCE alanlarının toplamı da öteki yarıdır.",
        "K, paralelkenarın içindeki herhangi bir nokta olsun. ADK ile BCK üçgenlerinin AD ve BC tabanları eşittir; bu tabanlara K’dan olan uzaklıkların toplamı iki paralel doğru arasındaki uzaklıktır. Bu nedenle A(ADK)+A(BCK)=A(ABCD)/2. Aynı şekilde A(ABK)+A(CDK)=A(ABCD)/2. Bu toplamlar eş olsa da tek tek dört üçgenin alanları her K için aynı değildir.",
        "Daha ayrıntılı kesmede O, AC köşegeni üzerinde seçilsin. O’dan AB’ye paralel çizilen doğru AD ve BC’yi N,L’de; AD’ye paralel çizilen doğru DC ve AB’yi M,K’da kessin. Oluşan DNOM ile KBLO küçük paralelkenarlarının alanları eşittir. O’nun köşegen üzerinde olması ve doğruların belirtilen paralellikleri bu sonuç için gereklidir; herhangi bir iç noktaya aynı sonucu koşulsuz uygulama. Orta noktalı ve paralelli şekillerde önce eş taban/yükseklik veya kenarortay ilişkilerini kur, sonra alan paylarını etiketle; resmin görünüşüne bakarak sayı ezberleme.",
      ],
    },
    {
      title: "Bir çözümün son denetimi: şekil, diklik, parça ve birim",
      paragraphs: [
        "Verilen şekil üçgen mi paralelkenar mı? Taban ile ona ait yükseklik doğru eşleştirildi mi? Üçgendeki 1/2 katsayısı kullanıldı mı? Bir bölge çıkarılıyorsa alan gerçekten bütünden mi çıkarılıyor? Taşınan parçalar eş boyutta mı, yeni dizilişte örtüşme veya boşluk var mı? Sonuç uzunluk birimiyle değil kare birimle yazılmalıdır.",
        "Çizim yardımcıdır; açıkça verilmemiş diklik, paralellik, orta nokta veya eşliği göz kararı ekleme. Sonuç şüpheliyse daha basit bir özel durumu deneyebilirsin: paralelkenarı dikdörtgene, dik üçgeni iki katı dikdörtgene dönüştür. Ancak tek bir çizim veya sayısal deneme genel teoremin kanıtı değildir. Model bir örnek düzeni gösterir; genelleme hangi uzunluk ve ilişkilerin korunduğuyla gerekçelendirilir.",
      ],
    },
  ],
  examples: [
    {
      title: "Yan kenar değil dik yükseklik",
      prompt:
        "Bir paralelkenarın tabanı 12 cm, bu tabana ait dik yüksekliği 4 cm ve komşu eğik kenarı 5 cm. Alanı kaçtır?",
      strategy: "Tabanın karşısındaki dik uzaklığı seç; yan kenarı kullanma.",
      steps: [
        {
          label: "Doğru eşleştirme",
          expression: "b=12 cm, h=4 cm",
          explanation:
            "5 cm eğik kenardır; tabana ait yükseklik olarak verilmemiştir.",
        },
        {
          label: "Alan",
          expression: "A=12·4=48 cm²",
          explanation: "Paralelkenarda 1/2 çarpanı yoktur.",
        },
      ],
      answer: "48 cm²",
      check: "Aynı taban ve yüksekliğe sahip üçgenin alanı 24 cm² olurdu.",
      pitfall: "12·5 yapmak yan kenarı yükseklik sayar.",
    },
    {
      title: "Yükseklik kenarın uzantısına inse de formül aynı",
      prompt:
        "Geniş açılı ABC üçgeninde BC=10 cm. A’dan BC doğrusuna indirilen dikmenin ayağı BC’nin uzantısında ve dik uzaklık 6 cm. Üçgenin alanı kaçtır?",
      strategy:
        "Yükseklik kenar parçasına değil taban doğrusuna dik uzaklıktır.",
      steps: [
        {
          label: "Taban ve yükseklik",
          expression: "b=10 cm, h=6 cm",
          explanation:
            "Dikmenin ayağının dışta oluşu negatif yükseklik oluşturmaz.",
        },
        {
          label: "Üçgen alanı",
          expression: "A=10·6/2=30 cm²",
          explanation: "Seçilen taban ve ona ait dik yükseklik kullanılır.",
        },
      ],
      answer: "30 cm²",
      check: "Aynı taban ve yükseklikteki paralelkenarın alanı 60 cm²’dir.",
      pitfall:
        "Dikme dışta diye alan formülünü terk etme veya dikme ayağına kadar uzayan bütün doğruyu yeni taban sayma.",
    },
    {
      title: "Ortak yükseklikte alanları paylaştır",
      prompt:
        "ABC üçgeninde D, BC üzerinde; BD=4 cm, DC=6 cm ve ABC’nin alanı 50 cm². ABD ve ADC alanları nedir?",
      strategy: "Aynı A köşesi ve BC doğrusu ortak yükseklik verir.",
      steps: [
        {
          label: "Oran",
          expression: "A(ABD):A(ADC)=4:6=2:3",
          explanation: "Taban oranı alan oranıdır; yükseklik aynıdır.",
        },
        {
          label: "Toplamdan paylaştır",
          expression: "50/(2+3)=10 cm²;2·10=20,3·10=30",
          explanation: "ABC iki bölgenin birleşimidir.",
        },
      ],
      answer: "20 cm² ve 30 cm²",
      check: "20+30=50 ve 20/30=4/6.",
      pitfall:
        "Ortak yüksekliğe rağmen taban oranını kareye alma; burada benzerlik verilmedi.",
    },
    {
      title: "Benzerlik oranını kareye taşı",
      prompt:
        "Benzer iki üçgende küçükten büyüğe karşılıklı kenar oranı 2:5. Küçük üçgenin alanı 12 cm² ise büyük üçgenin alanı kaçtır?",
      strategy: "Uzunluk büyütmesi 5/2; alan büyütmesi bunun karesidir.",
      steps: [
        {
          label: "Alan oranı",
          expression: "A(büyük)/A(küçük)=(5/2)²=25/4",
          explanation: "Hem taban hem yükseklik aynı oranda büyür.",
        },
        {
          label: "Alan",
          expression: "A(büyük)=12·25/4=75 cm²",
          explanation: "Uzunluk oranı doğrudan alanla çarpılmaz.",
        },
      ],
      answer: "75 cm²",
      check: "12:75=4:25, uzunluk oranı 2:5’in karesidir.",
      pitfall: "Alanı 12·5/2=30 bulmak yalnız bir boyutu büyütür.",
    },
    {
      title: "İç noktada eş olan tek tek bölgeler değil toplamlar",
      prompt:
        "ABCD paralelkenarının alanı 80 cm²; K içeride bir nokta ve ADK üçgeninin alanı 13 cm². BCK üçgeninin alanı kaçtır?",
      strategy:
        "AD ve BC paralel eş tabanlardır; karşı iki bölgenin toplamı bütünün yarısıdır.",
      steps: [
        {
          label: "Toplam ilişkisi",
          expression: "A(ADK)+A(BCK)=80/2=40 cm²",
          explanation:
            "K’nın iki karşı paralel kenara uzaklıkları toplamı sabittir.",
        },
        {
          label: "Eksik bölge",
          expression: "A(BCK)=40−13=27 cm²",
          explanation: "İki bölgenin tek tek eş olması gerekmez.",
        },
      ],
      answer: "27 cm²",
      check: "13+27=40; bu bütün alanın yarısıdır.",
      pitfall: "K herhangi bir iç nokta olduğu için her üçgeni 20 cm² sayma.",
    },
    {
      title: "İki kenar ve aralarındaki açı",
      prompt:
        "Bir üçgenin iki kenarı 8 cm ve 10 cm; bu iki kenarın arasındaki açı 30°. Alanı kaçtır?",
      strategy: "Seçilen iki kenar ve aradaki açının sinüsüyle yüksekliği kur.",
      steps: [
        {
          label: "Dik bileşen",
          expression: "h=10·sin 30°=10·1/2=5 cm",
          explanation:
            "8 cm kenar taban seçildiğinde öteki kenarın dik bileşeni yüksekliktir.",
        },
        {
          label: "Alan",
          expression: "A=8·5/2=20 cm²",
          explanation: "Eşdeğer kısa biçim 8·10·sin 30°/2’dir.",
        },
      ],
      answer: "20 cm²",
      check:
        "h=5, yan kenar 10’dan küçüktür; alan aynı iki kenarlı dik üçgendeki 40 cm²’den küçüktür.",
      pitfall:
        "Verilen açı iki kenarın arasındaki açı değilse bu çarpıma doğrudan koyma.",
    },
  ],
  recall: [
    {
      prompt: "Yüksekliğin ayağı üçgenin dışında olabilir mi?",
      answer:
        "Evet; yükseklik karşı köşenin seçilen taban doğrusuna dik uzaklığıdır. Kenarın uzantısına inmesi alan formülünü değiştirmez.",
    },
    {
      prompt: "Benzerlik oranı k ise alan oranı neden k²?",
      answer:
        "Taban ve ona ait yükseklik ayrı ayrı k ile çarpılır; alanın çarpımında k·k=k² oluşur.",
    },
    {
      prompt: "Eş alanlı iki üçgen mutlaka eş midir?",
      answer:
        "Hayır. Alan tek bir ölçüdür; aynı taban-yükseklik çarpımına farklı kenar ve açılar sahip olabilir.",
    },
    {
      prompt:
        "Paralelkenarda herhangi bir iç noktadan oluşan dört üçgenin alanları hep eş midir?",
      answer:
        "Hayır. Karşı iki bölgenin toplamları bütünün yarısıdır; tek tek alanlar iç noktanın yerine göre değişir.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri PDF s.139–140 ve 147–148 (basılı 137–138 ve 145–146): üçgende alan, ortak taban/yükseklik, kenarortay/ağırlık merkezi, benzerlik, sinüs ve paralelkenarda alan ilişkileriyle karşılaştırılan özgün açıklamalar. Üçgende Alan 5.2.1 fiziksel s. 5, ortak yüksekliğe sahip iki bölge; buradaki çözümlü örnekler resmî sınav sorusu değildir.",
};
