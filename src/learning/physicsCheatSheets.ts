import type { CheatSheet } from "./cheatsheetContent";
// Original concise teaching derived from the stated reviewed pages. No private
// source text, archive identifiers or book pages are bundled with the application.
export const physicsCheatSheets: CheatSheet[] = [
  {
    topicId: "detail-125",
    title: "Basınç",
    subjectId: "tyt-fizik",
    sections: [
      {
        title: "Kuvvet ile basıncı ayır",
        text: [
          "Basınç P=F⊥/A ile bulunur; kuvvet yüzeye dik bileşen, A gerçek temas alanıdır. P’nin birimi Pa=N/m², kuvvetinki N’dir. Aynı basınçta alan büyürse yüzeye etkiyen kuvvet büyüyebilir. Basınç skaler, basınç kuvveti yönlüdür.",
          "Yatay zeminde yalnız ağırlık ve tepki varsa F⊥=mg. Yukarı çeken ip veya ek bastırma varsa önce düşey kuvvet dengesi kurulur; 6 kg’ı doğrudan 6 N gibi kullanma.",
        ],
      },
      {
        title: "Durgun sıvıda derinlik",
        text: [
          "Homojen durgun sıvıda yüzeye göre artış ΔP=ρgh; mutlak basınç P=P₀+ρgh. h yüzeyden ölçülen düşey derinliktir. Aynı sıvıda, aynı yüzey basıncı altında, aynı derinlikte basınç eşittir; kap şekli veya toplam su miktarı bu bağıntıya eklenmez.",
          "Birbirine karışmayan yatay tabakalarda her tabakanın ρgh katkısı eklenir. Basınç kuvveti sorulursa basınçtan sonra yüzey alanını ayrıca kullan.",
        ],
      },
      {
        title: "Pascal ve hidrolik",
        text: [
          "Kapalı sıvıya verilen ek basınç ideal koşullarda iletilir; farklı derinliklerin başlangıç basıncı farkı kaybolmaz. Aynı seviyeli, ideal ve dengeli pistonlarda F₁/A₁=F₂/A₂ kullanılır. Büyük piston daha büyük kuvvet verirken daha az yol alır; bedelsiz enerji üretilmez.",
        ],
      },
      {
        title: "Gaz ve ölçüm",
        text: [
          "Sabit miktarda ideal gaz için PV/T sabittir; sıcaklık kelvin ve basınç mutlak alınır. Celsius değeri iki katına çıkınca basınç zorunlu olarak iki katına çıkmaz. Manometrede aynı sıvıda aşağı inerken basınç artar; işareti çizim üzerindeki dengeyle kur.",
        ],
        table: {
          headers: ["Araç", "Ölçüm"],
          rows: [
            ["Barometre", "Atmosfer basıncı"],
            ["Manometre", "Gaz basıncı veya basınç farkı"],
            ["Altimetre / batimetre", "Basınçtan yükseklik / su derinliği"],
          ],
        },
      },
    ],
    cautions: [
      "1 cm²=10⁻⁴ m²; alanı dönüştürürken uzunluk dönüşümünün karesini al.",
      "ρgh bağıntısını her şekilli katı cisme uygulama; katı için genel yol F⊥/A’dır.",
      "Derinlik boyunca eğik yol uzunluğunu değil düşey yüksekliği kullan.",
      "Eşit sıvı basıncından eşit taban kuvveti sonucuna alanı bilmeden geçme.",
    ],
    examples: [
      {
        title: "Aynı kuvvet, başka yüzey",
        prompt:
          "Yatay ve dengedeki bir blok zemine 72 N dik kuvvet uyguluyor. Temas alanı 0,024 m² iken basıncı; blok çevrilip alan 0,012 m² olduğunda yeni basıncı bul.",
        steps: [
          "P₁=72/0,024=3000 Pa.",
          "Kuvvet aynı, alan yarı oldu: P₂=72/0,012=6000 Pa.",
        ],
        answer:
          "3 kPa ve 6 kPa. Değişen büyüklük basınçtır; zemine aktarılan toplam dik kuvvet yine 72 N’dir.",
      },
    ],
    recall: [
      {
        prompt: "Sıvı basıncıyla toplam basınç arasındaki fark nedir?",
        answer:
          "Sıvının yüzeye göre katkısı ρgh; toplam basınç yüzeydeki P₀’ı da içerir.",
      },
      {
        prompt: "İdeal hidrolikte kuvvet kazancı enerji kazancı mıdır?",
        answer:
          "Hayır. Kuvvet artarken yol azalır; ideal iş aktarımı enerjinin korunmasıyla uyumludur.",
      },
    ],
    source:
      "Aurelia TYT Fizik Basınç kaynağının 1–4. sayfalarıyla karşılaştırılmış özgün uygulama özeti. Atıf verilen MEBİ sayfalarının tamamının ayrıca incelendiği veya resmî soru doğrulandığı iddiası yoktur.",
  },
  {
    topicId: "detail-126",
    title: "Sıvılarda kaldırma kuvveti",
    subjectId: "tyt-fizik",
    sections: [
      {
        title: "Yer değiştiren sıvı",
        text: [
          "Homojen, durgun sıvıda kaldırma kuvveti Fk=ρs g Vb ile bulunur. ρs sıvının özkütlesi, Vb sıvıyla yer değiştiren batan hacimdir. Birimlerle (kg/m³)(m/s²)(m³)=N olur. Kısmen yüzen cismin bütün hacmini Vb yerine yazma.",
        ],
      },
      {
        title: "Duruma göre denge",
        text: [
          "Dış kuvvetsiz ve dengede serbest yüzen cisimde Fk=G=mg. Türdeş cisimde Vb/V=ρc/ρs. Askıda, tamamen batık ve dış kuvvetsiz dengede ρc=ρs olur. Yalnız tamamen batık olmak Fk=G demek değildir; cisim tutuluyor veya ivmeleniyor olabilir.",
        ],
      },
      {
        title: "Sıvı değişimi ve derinlik",
        text: [
          "Aynı cisim serbest yüzmeye devam ediyorsa daha yoğun sıvıda batan hacmi azalır; ağırlığı değişmediği için kaldırma kuvveti aynı kalır. Tam batık, sabit hacimli cisimde ise ρs artınca Fk artar. Homojen sıvıda tamamen batık sabit hacimli cismi daha derine indirmek tek başına Fk’yi artırmaz.",
        ],
      },
      {
        title: "İp ve taban kuvveti",
        text: [
          "Yukarıdan iple dengede tutulan cisimde T+Fk=G; ip aşağı çekiyorsa Fk=G+T. Dibe oturmuş cisimde sıvı alt yüzeye erişiyorsa Fk sıfır sayılmaz. Alt yüzeyin sıvıyla teması tamamen kesiliyorsa standart basınç modeli ayrıca denetlenir.",
        ],
      },
    ],
    cautions: [
      "1 L=0,001 m³. 2 L’yi doğrudan 2 m³ yazmak kuvveti 1000 kat büyütür.",
      "Cismin özkütlesiyle sıvının özkütlesini karıştırma; formülde sıvınınki kullanılır.",
      "Eşit kaldırma kuvveti, farklı sıvılardaki cisimlerin batan hacimlerinin eşitliğini kanıtlamaz.",
    ],
    examples: [
      {
        title: "Yüzme oranını denetle",
        prompt:
          "Kütlesi 0,60 kg ve toplam hacmi 1,0 L olan türdeş cisim, özkütlesi 1000 kg/m³ olan suda dış kuvvetsiz dengede yüzüyor. g=10 m/s². Kaldırma kuvveti ve batan hacmi nedir?",
        steps: [
          "G=mg=0,60×10=6 N. Serbest yüzmede Fk=6 N.",
          "Vb=Fk/(ρs g)=6/(1000×10)=0,0006 m³=0,60 L.",
        ],
        answer:
          "Fk=6 N ve Vb=0,60 L. Batan oran %60’tır; 0,60 L toplam 1,0 L’den küçüktür.",
      },
    ],
    recall: [
      {
        prompt: "Tamamen su altında olmak dengeyi kanıtlar mı?",
        answer:
          "Hayır; Fk’yi ρs g Vb ile bul, sonra bütün kuvvetleri toplayarak denge/ivme durumunu denetle.",
      },
      {
        prompt:
          "Serbest yüzen bir cisim tuzlu suya geçtiğinde kaldırma kuvveti zorunlu büyür mü?",
        answer:
          "Hayır. Yüzme devam ediyorsa aynı ağırlığı dengeler; batan hacim azalabilir.",
      },
    ],
    source:
      "Aurelia TYT Fizik Sıvılarda Kaldırma Kuvveti kaynağının 1–2. sayfalarıyla karşılaştırılmış özgün uygulama özeti. Kaynaktaki sınav atıfları ayrıca doğrulanmış resmî soru sayılmamıştır.",
  },
  {
    topicId: "detail-123",
    title: "Elektrik akımı",
    subjectId: "tyt-fizik",
    sections: [
      {
        title: "Akım, geçen yükün hızıdır",
        text: [
          "Ortalama akım I=Δq/Δt; 1 A=1 C/s. Akım için yük taşıyıcıları, onları sürükleyen elektrik alan ve sürekli iletim yolu gerekir. Metalde elektronlar konvansiyonel akım yönünün tersine sürüklenir; bu, akımın büyüklüğünü negatif hesaplamayı gerektirmez.",
        ],
      },
      {
        title: "Ohm yasasının koşulu",
        text: [
          "Ohmik bir elemanda fiziksel koşullar sabitken V=IR kullanılır. R sabitse gerilim iki katına çıktığında akım iki katına çıkar. Isınan filamanın direnci değişebilir; bütün elemanlara her sıcaklıkta sabit direnç yakıştırma. V–I grafiğinde eğim R; I–V grafiğinde eğim 1/R’dir.",
        ],
      },
      {
        title: "Bağlantıyı önce oku",
        text: [
          "Seri bağlı elemanların üzerinden aynı akım geçer; Reş=R₁+R₂+… olur. Paralel kolların uçları aynı iki noktada olduğundan gerilimleri eşittir; ana akım kol akımlarının toplamıdır. Paralelde 1/Reş=1/R₁+1/R₂+… kullanılır. Bir kolun açılması diğer paralel kolları zorunlu olarak kesmez.",
        ],
      },
      {
        title: "Ölçüm ve güç",
        text: [
          "İdeal ampermetre ölçülecek kola seri ve yaklaşık sıfır dirençli; ideal voltmetre elemanın iki ucuna paralel ve çok büyük dirençli kabul edilir. Ampermetreyi kaynağa doğrudan paralel bağlamak kısa devre oluşturabilir. İdeal dirençte güç P=VI=I²R=V²/R; özdeş ampulleri uygun güç karşılaştırmasıyla değerlendir.",
        ],
      },
    ],
    cautions: [
      "Dakikayı saniyeye, mC ve μC’yi coulomba çevir.",
      "Elektron yönünü konvansiyonel akım yönüyle aynı çizme.",
      "Parlaklık karşılaştırmadan önce seri/paralel bağlantıyı ve özdeşlik koşulunu denetle.",
      "Ev şebekesiyle deney yapılmaz; eğitim devreleri güvenli düşük gerilimli kaynak gerektirir.",
    ],
    examples: [
      {
        title: "Paralel kolları çöz",
        prompt:
          "İdeal 12 V kaynağa 6 Ω ve 3 Ω dirençler paralel bağlanıyor. Kol akımları, ana akım ve eşdeğer direnç nedir?",
        steps: [
          "Her kolda gerilim 12 V: I₁=12/6=2 A ve I₂=12/3=4 A.",
          "Iana=2+4=6 A. Reş=V/Iana=12/6=2 Ω.",
        ],
        answer:
          "2 A, 4 A, 6 A ve 2 Ω. Paralel eşdeğerin en küçük kol direnci olan 3 Ω’dan küçük olması sonucu destekler.",
      },
    ],
    recall: [
      {
        prompt: "İdeal voltmetre neden paralel bağlanır?",
        answer:
          "İki uç arasındaki potansiyel farkı ölçer; çok büyük direnci sayesinde ideal modelde devreden akım çekmez.",
      },
      {
        prompt: "V–I ve I–V grafiklerinin eğimleri aynı mı?",
        answer: "Hayır. Eksenleri koru: V–I’da R, I–V’da 1/R elde edilir.",
      },
    ],
    source:
      "Aurelia TYT Fizik Elektrik Akımı kaynağının 1–4. sayfalarıyla karşılaştırılmış özgün uygulama özeti. Örnekler uygulama için yazılmıştır, resmî sınav sorusu değildir.",
  },
];
