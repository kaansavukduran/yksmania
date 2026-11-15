import { txt, type Lesson } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

type Q = [string, string[], string, string];
type Pack = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  pages: string;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  questions: Q[];
};
const s = (title: string, a: string, b: string): GuideSection => ({
  title,
  paragraphs: [a, b],
});
const ex = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string][],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map(([label, explanation, expression]) => ({
    label,
    explanation,
    expression,
  })),
  answer,
  check,
  pitfall,
});
const water: Pack = {
  id: "su-dalgalari",
  topic: "detail-129",
  title: "Su dalgaları: dalga cephesinden kırılmaya",
  minutes: 65,
  pages: "156–160",
  objectives: [
    "Dalga cephesi, ilerleme yönü ve parçacık hareketini birbirinden ayır.",
    "Yansıma ve derinlik geçişinde sabit kalan frekansla değişen sürat/dalga boyunu karşılaştır.",
    "Açıları normalden ölç; kaynak, ortam ve stroboskop verisini ayrı kullan.",
  ],
  sections: [
    s(
      "Su taşınırken mi dalga ilerler?",
      "Suyun yüzeyindeki titreşim komşu bölgeleri etkileyerek enerji yayar. Bir mantarın yaklaşık aynı çevrede sallanması, dalga tepesinin kıyıya ilerlemesiyle aynı hareket değildir. Yüzey dalgalarında parçacıkların hareketi genellikle hem düşey hem yatay bileşen içerir; su yüzeyi dalgasını yalnız enine diye sınırlama. Derinlikle hareketin etkisi azalır; bütün su kütlesi dalga süratiyle kıyıya taşınmaz.",
      "Okulun küçük genlikli dalga leğeni modeli düzenli ortamı inceler. Gerçek kıyıda akıntı, rüzgâr, kırılan dalgalar ve kütle taşınımı da bulunabilir. Modeldeki enerji aktarımını gerçek denizde hiçbir madde hareketi yoktur sonucuna dönüştürme. Önce çizimin üstten görünüm mü, yüzey kesiti mi olduğunu belirle.",
    ),
    s(
      "Cephenin yönünü oku",
      "Aynı titreşim evresindeki noktaları birleştiren çizgi dalga cephesidir. Düz çubuk doğrusal, noktasal titreştirici yaklaşık dairesel cepheler üretir. Aynı homojen bölgede ilerleme doğrultusu dalga cephesine diktir. Dairesel dalgada ışınlar merkezden dışarı yönelir; birbirine paralel olmak zorunda değildir.",
      "Ardışık iki tepe çizgisi arasındaki dik uzaklık λ, ardışık tepe ile çukur arası λ/2’dir. Tepeler arasındaki çizgiyi eğik ölçmek gerçek dalga boyunu büyütür. Aydınlatılmış leğende şeritlerin oluşması optik etkidir; şeritler su parçacığı veya ayrı birer enerji paketi değildir. Aynı tip şeritlerin ardışık olanlarını karşılaştır.",
    ),
    s(
      "Üç büyüklüğü aynı denklemde birleştir",
      "Periyot T bir noktanın bir tam titreşim süresi, frekans f saniyedeki titreşim sayısıdır: f=1/T. Dalga sürati v=λf bağıntısıyla dalga boyuna bağlanır. Bir saniyede altı tepe üretmek 6 Hz demektir; tek bir anlık çizimde altı çizgi görmek tek başına frekans vermez.",
      "Aynı düzenli ve yaklaşık dağılımsız ortamda frekansı değiştirmek dalga boyunu ters yönde değiştirir. Amplitüd yüzeyin dengeye göre en büyük uzanımıdır; tepeden çukura düşey fark 2 A’dır. λ yatay, A düşey bir uzunluktur. Bir dalga tepesinin bir periyotta aldığı yol λ iken bir parçacığın net yer değiştirmesi farklı olabilir.",
    ),
    s(
      "Düz engelde yansımayı kur",
      "Engelin normalini çiz ve gelen ilerleme ışınının normalle yaptığı i açısını ölç. Yansıyan ışının normalle yaptığı r açısı i’ye eşittir. Cephe ile engel arasındaki açı da geometrik olarak bu açıya eşit olabilir; ilerleme ışını ile engel arasındaki açıyı doğrudan i diye kullanmak 90° tümleyen hatası yaratır.",
      "Aynı derinlikteki durgun bölgede yansıma sırasında dalganın frekansı, periyodu, süratinin büyüklüğü ve dalga boyu korunur; ilerleme yönü değişir. Yansıyan genliğin aynı olması ideal kayıpsızlık ister. Işının yüzeye dik gelmesi, cephelerin engele paralel olması demektir; dalga aynı doğrultuda geri döner.",
    ),
    s(
      "Dairesel ve eğri engelleri karşılaştır",
      "Noktasal kaynak düz engelden yansıdığında cepheler, kaynak engelin arkasındaki simetriğinde bulunuyormuş gibi yayılır. Bu sanal kaynak bir gerçek titreştirici değildir. Çukur bir engel yaklaşık paralel gelen dalgaları odak çevresinde toplayabilir; odak yakınındaki kaynak ters yönde yaklaşık düz cepheler verebilir.",
      "Çukur engelde merkezden üretilen dairesel cephelerin yeniden merkeze yönelmesi ile odak davranışı ayrı durumlardır. Tümsek engel paralel dalgaları dağıtır; uzantılar arka taraftaki sanal odak çevresine yönelir. Küçük açıklıklı/uygun geometrili yaklaşık odak modelini her boyut ve açı için kusursuz noktasal toplama diye yorumlama.",
    ),
    s(
      "Derinlik değişince kaynak değişmez",
      "Dalga leğeninin sığ-su okul yaklaşımında daha derin bölgedeki yayılma sürati daha büyüktür. Durgun sınırdan geçen aynı kaynağın frekansı iki bölgede aynıdır; v₂/v₁=λ₂/λ₁ olur. Sığdan derine geçişte sürat ve λ artar, T değişmez. Derinden sığa geçişte ikisi azalır.",
      "Buradaki derin/sığ sözleri iki leğen bölgesinin göreli derinliğidir. Gerçek su dalgalarında sürat hem dalga boyu hem derinlik rejimine bağlı olabilir; her deniz dalgasına yalnız derinlik formülü uygulama. Etkileşimli model süratleri verilmiş iki düzenli bölgeyi kullanır; gerçek kıyı akıntısını veya yüzey gerilimini hesaplamaz.",
    ),
    s(
      "Kırılma açısını normalden denetle",
      "Bir cephenin sınırın öte tarafına önce ulaşan ucu farklı süratle ilerler; bu nedenle eğik gelişte cephe döner. Normalden ölçülen açılarda sin i/sin r=v₁/v₂=λ₁/λ₂’dir. Daha yavaş bölgeye giren ışın normale yaklaşır; daha hızlı bölgeye giren ışın normalden uzaklaşır.",
      "Dik gelişte i=0 ve r=0’dır: ilerleme doğrultusu sapmaz fakat sürat ve dalga boyu yine değişebilir. Bu yüzden doğrultu değişmedi diye ortam değişimini yok sayma. Çok hızlı ikinci bölgeye büyük açıyla geçişin basit ışın koşulu kalmayabilir; bu dersin temel örnekleri geçişin mümkün olduğu aralıktadır. Dalga boyu için sin oranını ters yazma.",
    ),
    s(
      "Kırılma ve kırınımı ayır",
      "Kırılma, ortam veya yayılma sürati değişimine bağlı cephe yönlenmesidir. Kırınım, engel kenarında ya da açıklıktan sonra dalganın yayılıp bükülmesidir. Açıklığın dalga boyuna oranı küçüldükçe yayılma daha belirgin olur; tek başına 'dar delik' demek λ bilinmeden yeterli değildir.",
      "Aynı ortamda açıklığı daraltmak kaynağın frekansını kendiliğinden değiştirmez. λ’yı büyütmek de açıklık sabitken kırınımı belirginleştirebilir. Birden çok yarıkta örtüşen dalgalar girişim oluşturabilir; bu olay yol farkına bağlıdır. Şekildeki her eğri cepheyi bir kırılma olayı diye adlandırma.",
    ),
    s(
      "Stroboskop görüntüsü gerçek durma değildir",
      "Dönen diskin her yarığı kısa bir bakış sağlar. Ardışık bakışlarda cepheler aynı konuma denk gelirse dalga duruyormuş gibi görünür. En basit eşleşmede dalga frekansı f=n·fdisk’tir; n yarık sayısı, fdisk saniyedeki tur sayısıdır. Görüntü dururken enerji aktarımı sürer.",
      "Aynı görünen durumların farklı kat frekanslarda da oluşabileceğini unutma; tek bir donmuş görüntü her zaman benzersiz frekans belirlemez. Soru en küçük uygun dönme hızı veya her ardışık yarıkta bir periyot koşulunu veriyorsa n·fdisk doğrudan kullanılır. Diski değiştirmek ölçülen gerçek dalganın kaynağını değiştirmez.",
    ),
    s(
      "Şekil sorusunu sırayla çöz",
      "Önce cephe ile ilerleme ışınını ayır; sonra sınır normalini çiz. Hangi bölgede sürat büyük verilmişse λ’nın da orada büyük olacağını aynı frekans koşuluyla kontrol et. Açıların ölçüldüğü doğruyu yazıp tek bir sin oranı kurmak, yalnız ok yönünü ezberlemekten daha güvenilirdir.",
      "Yansıma ile geçiş birlikte çizilmişse yansıyan dalga ilk bölgede, kırılan dalga ikinci bölgededir. Yansıyan λ’yı ikinci bölgenin süratiyle hesaplama. Süre verisinde d=v·t, titreşim sayısında N=f·t kullan; birimlerini m–s veya cm–s olarak tutarlı seç. En son dalga boyu oranının sürat oranıyla uyumunu denetle.",
    ),
  ],
  examples: [
    ex(
      "İki bölge, tek frekans",
      "Durgun iki bölgede aynı su dalgasının süratleri 30 ve 15 cm/s. Kaynak 3 Hz. İki dalga boyu?",
      "Önce aynı kalan kaynak frekansını yaz.",
      [
        ["Birinci bölge", "Sürati frekansa böl.", "λ₁=30/3=10 cm"],
        ["İkinci bölge", "Aynı 3 Hz kullan.", "λ₂=15/3=5 cm"],
        ["Kontrol", "Sürat ve dalga boyu yarıya indi.", "λ₂/λ₁=v₂/v₁=1/2"],
      ],
      "10 cm ve 5 cm",
      "T her iki bölgede 1/3 s’dir.",
      "Yavaşlayan dalganın frekansını 1,5 Hz yapma.",
    ),
    ex(
      "Açıdan sürat oranı",
      "Su dalgası normalle 30° gelir, ikinci bölgede normalle 45° ilerler. sin 30=1/2, sin 45=√2/2. v₂/v₁?",
      "Açıları normalden ölç ve v₂/v₁=sinr/sini yaz.",
      [
        ["Oran", "Geçişin Snell biçimini kur.", "v₂/v₁=sin45/sin30"],
        ["Yerine koy", "İki sinüs değerini böl.", "(√2/2)/(1/2)=√2"],
        ["Yorum", "Normalden uzaklaşma daha hızlı bölge demektir.", "λ₂/λ₁=√2"],
      ],
      "√2",
      "r>i ve v₂>v₁ birbiriyle uyumludur.",
      "Sinüs oranını ters çevirip yavaşladı deme.",
    ),
    ex(
      "Engelle yapılan açı",
      "İlerleme ışını düz engelle 25° yapıyor. Normalden ölçülen gelme ve yansıma açıları?",
      "Yüzey açısını önce normal açısına çevir.",
      [
        ["Normal", "Normal yüzeye diktir.", "i=90−25=65°"],
        ["Yansıma", "İki normal açısı eşittir.", "r=i=65°"],
        ["Kontrol", "Yansıyan ışın da engelle 25° yapar.", "90−r=25°"],
      ],
      "65° ve 65°",
      "Yüzey ve normal açıları 90°’yi tamamlar.",
      "25°’yi doğrudan gelme açısı sayma.",
    ),
    ex(
      "Ardışık yarık eşleşmesi",
      "8 yarıklı stroboskopta her ardışık yarıkta tam bir dalga periyodu geçiyor. Disk saniyede 2 tur atıyor. Dalga frekansı?",
      "Bir saniyedeki bakış sayısını bul.",
      [
        ["Yarık geçişi", "Her tur sekiz bakış sağlar.", "8·2=16 bakış/s"],
        ["Koşul", "Her bakışta bir periyot ilerler.", "f=16 Hz"],
        ["Periyot", "Sonucu tersleyerek denetle.", "T=1/16 s"],
      ],
      "16 Hz",
      "Bir disk turunda sekiz titreşim olur.",
      "Diskin 2 Hz hızını doğrudan dalga frekansı sayma.",
    ),
  ],
  recall: [
    {
      prompt: "Dik gelişte λ değişip yön sabit kalabilir mi?",
      answer:
        "Evet. Farklı süratli ikinci bölgede f korunur, λ değişir; i=r=0 olduğundan sapma olmaz.",
    },
    {
      prompt: "Cephenin yönü ilerleme yönü müdür?",
      answer:
        "Hayır. Yerel ilerleme doğrultusu homojen bölgede cepheye diktir.",
    },
    {
      prompt: "Sığ bölgeye geçen aynı kaynaklı dalgada ne azalır?",
      answer:
        "Okulun sığ-su yaklaşımında sürat ve dalga boyu azalır; frekans/periyot korunur.",
    },
    {
      prompt: "Kırınımı hangi boyutsuz oranla düşünürsün?",
      answer: "Açıklık/λ oranı küçüldükçe kırınım belirginleşir.",
    },
    {
      prompt: "Stroboskopta duruyor görünen dalga enerji taşımaz mı?",
      answer:
        "Taşır. Kısa aralıklı örnekleme hareketi donmuş gösterir; gerçek dalga durmaz.",
    },
  ],
  questions: [
    [
      "Aynı kaynağın 4 Hz su dalgası bir bölgede 24 cm/s ilerliyor. Dalga boyu kaç cm?",
      ["6", "96", "4", "0,167", "12"],
      "v=λf kullan.",
      "λ=24/4=6 cm. 96, süratle frekansı çarpar; doğru boyut uzunluk değildir.",
    ],
    [
      "Durgun iki bölgede v₁=40, v₂=20 cm/s. Aynı kaynağın ilk dalga boyu 8 cm. İkinci dalga boyu?",
      ["4 cm", "8 cm", "16 cm", "2 cm", "20 cm"],
      "Sınırda kaynak frekansı korunur.",
      "λ₂/λ₁=v₂/v₁=1/2, dolayısıyla λ₂=4 cm. Frekans iki kat veya yarı olmaz.",
    ],
    [
      "Su dalgası farklı derinlikli bölge sınırına dik geliyor. Sürat ikinci bölgede daha küçük. Hangi sonuç doğru?",
      [
        "Doğrultu sapmaz, dalga boyu azalır",
        "Frekans azalır, dalga boyu sabit",
        "Doğrultu mutlaka döner",
        "Sürat aynı kalır",
        "Periyot yarıya iner",
      ],
      "i=0 iken yön ile sürat değişimini ayrı düşün.",
      "Normalden gelişte i=r=0, yön sapmaz. f sabitken v azaldığı için λ azalır. Sapmama, sürat aynı anlamına gelmez.",
    ],
    [
      "Düz engelle 40° yapan su dalgasının ilerleme ışını yansıyor. Normalden ölçülen yansıma açısı?",
      ["50°", "40°", "80°", "20°", "90°"],
      "Yüzeyle normal dik doğrulardır.",
      "i=90−40=50°. Yansıma açısı normalden ölçülür ve i’ye eşittir.",
    ],
    [
      "Sabit derinlikte durgun su bölgesindeki yansımada ideal dalga için hangisi değişir?",
      [
        "İlerleme yönü",
        "Kaynak frekansı",
        "Periyot",
        "Dalga boyu",
        "Süratin büyüklüğü",
      ],
      "Aynı ortam korunuyor.",
      "Yansıma yayılma yönünü değiştirir. Aynı ortam ve kaynak altında v, f, T, λ korunur; genlik kayıpları ayrıca koşullandırılmalıdır.",
    ],
    [
      "Bir dalga tepesinden hemen sonraki tepeye dik uzaklık 12 cm, tepeden bitişik çukura uzaklık 6 cm. λ?",
      ["12 cm", "6 cm", "24 cm", "3 cm", "18 cm"],
      "Aynı evreli ardışık noktaları kullan.",
      "Tepeden ardışık tepeye uzaklık λ=12 cm’dir. Tepe-çukur arası λ/2=6 cm ile tutarlıdır.",
    ],
    [
      "Aynı ortamda ve frekansta açıklık genişliği 10λ’dan λ/2’ye indiriliyor. En uygun beklenti?",
      [
        "Kırınım daha belirginleşir",
        "Frekans iki katına çıkar",
        "Dalga sürati sıfırlanır",
        "Kırınım mutlaka kaybolur",
        "Kaynak periyodu değişir",
      ],
      "Açıklığı dalga boyuyla oranla.",
      "Açıklık/λ oranı küçüldüğünde engel arkasına yayılma belirginleşir. Açıklık kaynağın titreşim frekansını kendiliğinden değiştirmez.",
    ],
    [
      "6 yarıklı stroboskop saniyede 3 tur atıyor. Her ardışık yarıkta dalga bir tam periyot ilerleyip aynı görünümü veriyor. f?",
      ["18 Hz", "2 Hz", "3 Hz", "6 Hz", "0,5 Hz"],
      "Koşul her yarıkta tek periyot diyor.",
      "f=6·3=18 Hz. Sorudaki koşul, farklı kat eşleşmeleri belirsizliğini kaldırır.",
    ],
    [
      "Durgun su bölgeleri sınırında gelme açısı 30°, kırılma açısı 60°; ikisi normalden ölçülüyor. sin 30=1/2, sin 60=√3/2. v₂/v₁?",
      ["√3", "1/√3", "3", "1/3", "1"],
      "v₂/v₁=sinr/sini.",
      "Oran (√3/2)/(1/2)=√3 olur. İkinci açı daha büyük olduğu için ikinci bölge daha hızlıdır.",
    ],
    [
      "Dairesel su dalgasını üreten noktasal kaynak düz engele gönderiliyor. Yansıyan cephelerin sanal merkezi nerededir?",
      [
        "Kaynağın engele göre simetriğinde",
        "Her zaman engelin odak noktasında",
        "Kaynağın tam üzerinde",
        "Suyun en derin noktasında",
        "Dalga boyunun yarısı uzaklıkta",
      ],
      "Düz engelde simetriyi düşün.",
      "Dairesel yansımanın uzantıları, kaynak engelin arkasındaki simetriğinde bulunuyormuş gibi olur. Bu nokta yeni gerçek kaynak değildir; düz engelin tek odak noktası yoktur.",
    ],
  ],
};
const sound: Pack = {
  id: "ses-deprem-dalgalari",
  topic: "detail-130",
  title: "Ses ve deprem dalgaları: titreşimi ölç, kanıtı yorumla",
  minutes: 75,
  pages: "161–166",
  objectives: [
    "Sesin frekans, genlik, şiddet düzeyi ve tını özelliklerini farklı deneylerle ayır.",
    "Yankıda gidiş-dönüş yolunu ve ortamın süratini kullan.",
    "P/S dalgaları ile deprem büyüklüğü ve yerel şiddet arasındaki farkı açıkla.",
  ],
  sections: [
    s(
      "Ses bir ortam titreşimidir",
      "Bir kaynağın titreşimi çevresindeki maddede basınç ve yoğunluk değişimleri oluşturur. Gaz ve sıvılardaki ses, sıkışma ve seyrekleşmelerle yayılan boyuna mekanik dalgadır. Tanecikler ilerleme doğrultusu çevresinde ileri geri salınırken dalga enerjisi daha uzağa taşınır. Hava molekülleri konuşan kişinin ağzından dinleyicinin kulağına dalga süratiyle uçmaz.",
      "Maddesiz boşlukta olağan ses yayılmaz; uzaydaki ışık ise yayılabilir. Katılar boyuna dalgaların yanında kayma dalgaları da taşıyabilir; 'her ses her koşulda yalnız boyuna' genellemesini gazdaki basit modele göre değerlendir. Bir sinüs çizimi sesin gerçek yılan gibi yukarı aşağı gittiğini göstermez; yatay eksene göre basınç ya da uzanım grafiği olabilir.",
    ),
    s(
      "Sürati kaynaktan ayır",
      "Belirli sıcaklık ve bileşimdeki aynı hava ortamında tiz ve pes sesler yaklaşık aynı süratle yayılır. Kaynağın frekansı iki katına çıkarsa v sabitken λ yarıya iner. Olağan doğrusal ses için sesi daha güçlü çıkarmak da tek başına yayılma süratini artırmaz. Hava sıcaklığı arttığında olağan hava koşullarında sürat artar; yaklaşık v≈331+0,6 T°C kullanılabilir.",
      "Maddenin esnekliği ve yoğunluğu birlikte belirleyicidir; yalnız tanecik yakınlığı veya yoğunlukla evrensel sürat sıralaması kurma. Okulun demir–su–hava örneklerinde sürat genellikle katıda büyük, gazda küçük bulunur; bütün katıların bütün sıvılardan hızlı olması bir yasa değildir. Ses suya geçerken sabit sınır ve aynı kaynakta f korunur, v ve λ değişir.",
    ),
    s(
      "Yükseklik sözcüğünün iki anlamını çöz",
      "Günlük 'sesi yükselt' sözü çoğunlukla gürlüğü artırmayı anlatır; fizik sorusunda ses yüksekliği çoğunlukla incelik/kalınlık, yani frekansla ilgilidir. Yüksek frekans tiz, düşük frekans pes sestir. Genlik artışı aynı frekansta sesi daha gür yapabilir; notayı zorunlu değiştirmez.",
      "Bir grafikte yatay zaman ekseninde daha çok salınım görmek yüksek frekans; düşey daha büyük uzanım görmek büyük genliktir. Eksen zaman yerine konumsa sık tepeler küçük λ demektir; frekans için sürat bilgisi de gerekir. Şeklin eksenini okumadan çizgileri saymak, iki farklı fiziksel özelliği tek başlıkta karıştırır.",
    ),
    s(
      "Şiddet ile desibeli karıştırma",
      "Ses şiddeti, dalganın birim alandan birim zamanda aktardığı enerjidir: I=P/A, birimi W/m²’dir. Desibel ise bir referansa göre logaritmik şiddet düzeyinin birimidir. Aynı referansta şiddet 10 kat olursa düzey 10 dB, 100 kat olursa 20 dB artar. 0 dB mutlak sıfır ses enerjisi demek değildir.",
      "Aynı ortam ve frekanstaki harmonik dalgada I genliğin karesiyle orantılıdır. Eş yönsüz noktasal kaynağın serbest yayılımında aynı güç daha büyük küreye dağılır; uzaklık iki kat olduğunda I yaklaşık dörtte bire iner. Yankı, yönlülük, soğurma ve kapalı oda bu ideal ilişkiyi değiştirebilir. İşitme etkisi düzey kadar maruz kalma süresine de bağlıdır; tek bir sayı her kişi ve süre için güvenlik garantisi değildir.",
    ),
    s(
      "Tını ve rezonansı farklı sorularla ölç",
      "Aynı temel frekans ve benzer gürlükteki piyano ile kemanı ayırmamız, üst harmoniklerin ve zamanla değişen dalga biçiminin farklı olmasıyla ilgilidir: bu özellik tınıdır. Aynı notayı çalmak aynı dalga biçimi anlamına gelmez. Sadece temel frekansı bilmek hangi çalgının çaldığını benzersiz belirlemez.",
      "Rezonans, bir sistemin doğal titreşim frekanslarına yakın zorlamada belirgin tepki göstermesidir. Sönüm ve zorlayıcı koşullar genliği sınırlar; her eş frekans sonsuz genlik veya kırılma doğurmaz. Çalgı gövdeleri rezonanslardan yararlanır. Köprülerdeki bütün rüzgâr kaynaklı olayları yalnız basit zorlanmış rezonansa indirgemek doğru değildir; modelin kapsamadığı aerodinamik etkiler bulunabilir.",
    ),
    s(
      "Kaynağı değiştirerek notayı değiştir",
      "İdeal gerilmiş telin temel frekansı f₁=(1/2 L)√(F/μ) biçimindedir. Aynı telde titreşen boy kısalır veya gerilim artarsa frekans artar; boyca kütle artarsa frekans azalır. Bu, teldeki dalga sürati ile telin oluşturduğu havadaki ses süratini aynı nicelik yapmaz.",
      "Şişeye üflemek hava sütununu, şişeye vurmak cam ve suyun birlikte titreşimini etkiler. Okul örneğinde su arttıkça üfleyerek çıkan ses tizleşirken vurarak çıkan ses pesleşebilir. Hangi şeyin titreştiğini açıklamadan yalnız 'su arttı' ile hüküm verme. İnsan kulağının yaklaşık 20 Hz–20 kHz aralığı kişiye ve yaşa bağlıdır; duyulamayan ultrases de mekanik sestir.",
    ),
    s(
      "Yankıda mesafeyi iki kez say",
      "Bir ses kaynaktan engele gidip geri dönüyorsa toplam yol 2 d’dir: t=2 d/v. Ölçülen süreye doğrudan v çarpıp engel uzaklığı demek iki kat hata verir. Sonar ve ultrason yansımış dalgaların süre ve özelliklerinden bilgi çıkarır; ışık dalgası kullanmaları gerekmez.",
      "Aynı kaynağa geri dönüş ile iki ayrı noktada tek yönlü iletim farklıdır. Kaynak veya hedef hareketliyse basit durgun formül ek koşul ister. Akustik tasarımda soğurma ve uygun yansımalar konuşmanın anlaşılmasını etkiler; her yansıma yararsız değildir. Model, hava süratini verilen sabit değerde ve düz gidiş-dönüş yolunda alır.",
    ),
    s(
      "Depremi odak ve dalga yollarıyla düşün",
      "Fay boyunca ani kayma sonucu açığa çıkan enerji elastik dalgalarla yayılabilir. Yer içindeki başlangıç bölgesinin temsili odağı hiposantr, bunun yeryüzündeki düşey izdüşümü episantrdır. Odak derinliği bu iki nokta arasındaki düşey uzaklıktır; istasyona olan eğik yol veya episantr uzaklığıyla aynı değildir.",
      "P dalgaları sıkışma türündedir ve uygun katı/sıvı/gaz ortamlarında ilerleyebilir. S dalgaları kayma türündedir ve olağan sıvılarda yayılmaz. Aynı yol için P genellikle S’den önce gelir. Yüzey dalgalarının hareketi daha karmaşıktır. Bir istasyondaki P–S zaman farkı, uygun hız modeliyle uzaklık hakkında kanıt sağlar; tek istasyon her zaman benzersiz konum vermez.",
    ),
    s(
      "Büyüklük ve yerel şiddet farklıdır",
      "Büyüklük, depremin kaynağının boyutuyla ilişkili nicel bir ölçüdür; aynı olay için istasyon/ölçek belirsizlikleri hesaba katılarak raporlanır. Yerel şiddet ise belirli bir yerde hissedilen ve gözlenen etkilerle ilgilidir. Aynı deprem farklı zemin, uzaklık ve yapı koşullarında farklı şiddetler oluşturabilir.",
      "Richter yerel büyüklük ölçeği 1–9 arasında yapay olarak sınırlı değildir; günümüzde büyük depremler için moment büyüklüğü yaygındır. Klasik yaklaşık karşılaştırmada bir büyüklük artışı dalga genliğinde yaklaşık 10 kat, enerjide yaklaşık 32 kat farkla ilişkilendirilir; bunları yerel hasarın kesin katı diye yorumlama. Yapı ve zemin bilgisi olmadan yalnız büyüklükten bir binanın sonucunu hesaplayamazsın.",
    ),
    s(
      "Kanıtın sınırını koru",
      "P sürati 6 km/s, S sürati 3 km/s kabul edilen homojen modelde tS−tP=d(1/3−1/6)=d/6 olur. Bu ilişki verilen ideal modelde yolu buldurur; gerçek Yer çok katmanlıdır. Erken uyarı, daha hızlı dalganın algılanmasıyla sarsıntı gelmeden kısa süre kazanabilir; depremin gününü önceden kesin tahmin etmekle aynı şey değildir.",
      "Deprem zararını azaltmada yapı güvenliği, eşyaların sabitlenmesi, aile iletişim/kaçış planı ve resmî önerilere uygun çök–kapan–tutun davranışı önemlidir. Bu öğretim modeli mühendislik incelemesi veya resmî uyarı sistemi değildir. Soruda bilimsel ölçümle kişisel güvenlik kararını karıştırmadan, açıkça verilen yol ve süratlerle çalış.",
    ),
  ],
  examples: [
    ex(
      "Yankının dönüş yolu",
      "Havadaki ses sürati 340 m/s. Durgun duvardan yankı 0,6 s sonra duyuluyor. Duvarın uzaklığı?",
      "0,6 s gidiş ve dönüşün toplamıdır.",
      [
        ["Toplam yol", "Sürati toplam süreyle çarp.", "s=340·0,6=204 m"],
        ["Tek yön", "Duvar uzaklığı toplamın yarısıdır.", "d=204/2=102 m"],
        ["Kontrol", "İki yön aynı süreyi alır.", "ttek=102/340=0,3 s"],
      ],
      "102 m",
      "Tek yön süreleri 0,3+0,3=0,6 s verir; ölçülen toplam yankı süresiyle uyumludur.",
      "204 m’yi duvar uzaklığı diye verme.",
    ),
    ex(
      "Frekans değişti, ortam değişmedi",
      "Aynı havada v=340 m/s. Kaynak 170 Hz’den 340 Hz’ye çıkıyor. Dalga boyları?",
      "Sürati iki durumda aynı tut.",
      [
        ["İlk ses", "v/f kullan.", "λ₁=340/170=2 m"],
        ["İkinci ses", "Frekans iki katına çıktı.", "λ₂=340/340=1 m"],
        [
          "Yorum",
          "Ses tizleşir, daha hızlı yayılmak zorunda değildir.",
          "λ₂/λ₁=1/2",
        ],
      ],
      "2 m ve 1 m",
      "İki durumda da λf=340 m/s.",
      "Tiz sesi otomatik hızlı ses sayma.",
    ),
    ex(
      "Şiddet ve düzey",
      "Aynı referansa göre bir sesin şiddeti 100 katına çıkıyor. Düzey kaç dB artar?",
      "10 katlık artışları basamak olarak say.",
      [
        ["Oran", "100 iki tane 10 çarpanıdır.", "100=10²"],
        ["Düzey", "Her 10 kat 10 dB’dir.", "ΔL=10 log₁₀100=20 dB"],
        ["Kontrol", "Doğrusal şiddet ve logaritmik düzey ayrıdır.", "2·10=20"],
      ],
      "20 dB",
      "100 kat şiddet, 100 dB artış demek değildir.",
      "Şiddetin birimini dB yazma; şiddet W/m², düzey dB’dir.",
    ),
    ex(
      "P–S geliş farkı",
      "Aynı 120 km yolu P dalgası 6 km/s, S dalgası 3 km/s ile alıyor. Varış farkı?",
      "İki ayrı yol-zaman hesabı yap.",
      [
        ["P", "İlk varış daha hızlıdır.", "tP=120/6=20 s"],
        ["S", "Aynı yolu yavaş alır.", "tS=120/3=40 s"],
        ["Fark", "Başlangıç anı iki süre için aynıdır.", "Δt=40−20=20 s"],
      ],
      "20 s",
      "S varışı P’den sonradır.",
      "120/(6−3)=40 s yazmak bu iki varış farkını vermez.",
    ),
  ],
  recall: [
    {
      prompt: "Ses şiddeti ile şiddet düzeyinin birimleri?",
      answer: "Şiddet W/m²; referansa göre logaritmik düzey dB.",
    },
    {
      prompt: "Tiz ses aynı havada neden daha kısa dalga boylu?",
      answer: "v yaklaşık sabitken λ=v/f; yüksek f küçük λ verir.",
    },
    {
      prompt: "Aynı notada iki çalgıyı ne ayırabilir?",
      answer: "Üst harmonikler ve zaman yapısıyla ilişkili tını.",
    },
    {
      prompt: "S dalgalarının sıvıda yayılmamasının özelliği?",
      answer:
        "S kayma dalgasıdır; olağan sıvı kalıcı kayma esnekliği taşımadığından bu tür dalgayı iletmez.",
    },
    {
      prompt: "Aynı depremde her yerin şiddeti eşit midir?",
      answer:
        "Hayır. Uzaklık, zemin ve yapı koşulları yerel etkiyi değiştirir; büyüklükle şiddet aynı değildir.",
    },
  ],
  questions: [
    [
      "Ses sürati 340 m/s, durgun duvardan gidiş-dönüş süresi 0,4 s. Duvar uzaklığı?",
      ["68 m", "136 m", "34 m", "850 m", "170 m"],
      "Ölçülen süre iki yönü kapsıyor.",
      "d=vt/2=340·0,4/2=68 m. Ölçülen süre duvara gidip geri dönmeyi kapsar; 136 m toplam yoldur, duvar uzaklığı değildir.",
    ],
    [
      "Aynı havada sürat 330 m/s, frekans 110 Hz. Dalga boyu?",
      ["3 m", "0,333 m", "36300 m", "110 m", "33 m"],
      "Dalga boyu için ortam süratini kaynak frekansına böl: λ=v/f.",
      "330/110=3 m. Kaynak frekansı hava süratine eklenmez.",
    ],
    [
      "Ortam ve sıcaklık değişmeden bir ses kaynağının frekansı iki kat oluyor. Hangisi doğru?",
      [
        "Ses tizleşir, dalga boyu yarıya iner",
        "Sürat iki kat olur",
        "Dalga boyu iki kat olur",
        "Periyot iki kat olur",
        "Ses mutlaka daha gürdür",
      ],
      "Frekansla sürati ayrı tut.",
      "Aynı doğrusal ortamda v sabittir. f iki kat, λ yarı ve T yarı olur; gürlük için genlik/şiddet bilgisi gerekir.",
    ],
    [
      "Aynı ortam/frekansta harmonik sesin uzanım genliği 3 kat oluyor. I∝A² kabulüyle şiddet oranı?",
      ["9", "3", "6", "1/3", "1/9"],
      "Oranın karesini al.",
      "I₂/I₁=(A₂/A₁)²=3²=9. Bu şiddet oranı 9 dB artış demek değildir.",
    ],
    [
      "Aynı referansta şiddet 10 kat artınca şiddet düzeyi ne kadar artar?",
      ["10 dB", "1 dB", "100 dB", "10 W/m²", "0 dB"],
      "Düzey logaritmiktir.",
      "ΔL=10 log₁₀10=10 dB. W/m² şiddet birimi, dB göreli düzey birimidir.",
    ],
    [
      "Piyano ve keman aynı temel frekansı ve benzer gürlüğü veriyor; yine ayırt ediliyorlar. En ilgili özellik?",
      [
        "Tını",
        "Havadaki süratin mutlaka farklı olması",
        "Vakumda yayılım",
        "Tek yönlü yol",
        "Kaynağa olan uzaklığın sıfır olması",
      ],
      "Dalga biçimi ve üst harmonikleri düşün.",
      "Tını, aynı temel notanın farklı kaynaklarda ayırt edilmesini sağlar. Aynı ortamda iki çalgı için farklı yayılma sürati gerekmez.",
    ],
    [
      "Durgun homojen modelde P 8 km/s, S 4 km/s; ikisi aynı 160 km yolu alıyor. Varış farkı?",
      ["20 s", "40 s", "10 s", "160 s", "4 s"],
      "Her dalga için d/v hesapla, sonra çıkar.",
      "tP=20 s, tS=40 s; fark 20 s. d/(vP−vS)=40 s burada fark formülü değildir.",
    ],
    [
      "Deprem büyüklüğü ile yerel şiddet için doğru ifade?",
      [
        "Aynı depremin farklı yerlerdeki şiddeti farklı olabilir",
        "Şiddet her noktada aynıdır",
        "Büyüklük her binanın hasarını kesin belirler",
        "Richter ölçeği zorunlu olarak 1–9 ile sınırlıdır",
        "Büyüklük ve şiddet aynı kavramdır",
      ],
      "Kaynak büyüklüğü ile gözlenen yerel etkiyi ayır.",
      "Yerel şiddet uzaklık/zemin/yapı gibi koşullarla değişebilir. Büyüklük kaynakla ilgili ölçüdür; ölçekler yapay 9 üst sınırına sahip değildir.",
    ],
    [
      "Olağan sıvılarda yayılmayan kayma türündeki deprem dalgası hangisidir?",
      [
        "S dalgası",
        "P dalgası",
        "Havadaki basınç sesi",
        "Sudaki ultrases",
        "Sıvıda ilerleyen boyuna basınç dalgası",
      ],
      "Kayma ile sıkışmayı ayır.",
      "S dalgası kayma türüdür ve olağan sıvıların kayma esnekliği bu yayılımı desteklemez. P ve diğer boyuna basınç dalgaları sıvıda ilerleyebilir.",
    ],
    [
      "İdeal eş yönsüz kaynaktan soğurmasız serbest yayılımda ses uzaklığı 2 m’den 6 m’ye çıkıyor. Şiddet yeni/eski oranı?",
      ["1/9", "1/3", "3", "9", "1"],
      "Eş yönsüz kaynağın sabit gücü küre alanına dağılır: I∝1/r².",
      "(2/6)²=1/9. Bu ideal modelde güç aynı, küre alanı 9 kat olur; kapalı odada ek yansımalar sonucu değiştirebilir.",
    ],
  ],
};
const light: Pack = {
  id: "isik-bilgisi",
  topic: "detail-131",
  title: "Işık bilgisi: ışından aydınlanmaya",
  minutes: 60,
  pages: "167–169",
  objectives: [
    "Işık için ışın, dalga ve foton modellerini olayın ihtiyacına göre seç.",
    "Işık şiddeti, akı ve aydınlanmanın birim ve anlamlarını ayır.",
    "Uzaklık/açı değişiminde yalnız geçerli koşullarda ters kare bağıntısını uygula.",
  ],
  sections: [
    s(
      "Işın çizimi neyi temsil eder?",
      "Işın, ışığın yayılma doğrultusunu gösteren geometrik bir modeldir; fiziksel olarak kalınlığı sıfır bir ip değildir. Homojen saydam ortamda ve geometrik optik yaklaşımında ışınlar doğru boyunca ilerler. Bir demet çok sayıda yayılma doğrultusunu temsil eder. Paralel demet ile noktasal kaynaktan açılarak yayılan demet aynı uzaklık davranışını göstermez.",
      "Işık elektromanyetik ışınımdır; boşlukta da yayılır. Görünür ışık bu tayfın gözle algılanan dar aralığıdır. Bir maddenin ışığı geçirmesi, yansıtması veya soğurması dalga boyuna da bağlıdır. 'Cam saydamdır' ifadesini bütün elektromanyetik dalga boyları ve her kalınlık için koşulsuzlaştırma.",
    ),
    s(
      "Dalga ve foton modellerini birlikte düşün",
      "Girişim ve kırınım dalga modelini; fotoelektrik olayda eşik frekans gibi sonuçlar kuantalanmış enerji alışverişini gerektirir. Foton enerjisi E=hf’dir. Yansıma ve kırılma TYT’de çoğunlukla geometrik ışınlarla çözülebilir; çizim kullanmak ışığın dalga/kuantum yapısını yok saymak değildir.",
      "Bilim tarihindeki Newton, Huygens, Young, Maxwell ve Einstein katkıları farklı deneyleri açıklayan modeller geliştirdi. Modern görüş, ışığın duruma göre seçtiği iki ayrı klasik nesne olduğu anlamına gelmez. Bu derste aydınlanma sayıları fotometrik niceliklerdir; tek fotonun enerjisi veya kuantum sayımı hesaplanmaz.",
    ),
    s(
      "Kaynak olanla görüneni ayır",
      "Işık kaynağı gözlenen aralıkta ışık yayar; Güneş ve uygun yanan lamba örnektir. Ayın veya bir sayfanın görülmesi ise büyük ölçüde üzerine düşen ışığı yansıtmasıyla ilgilidir. Işıklı olmayan bir cismin görülmesi için aydınlatılması ve saçılan/yansıyan ışığın göze ulaşması gerekir.",
      "Doğal/yapay kaynak ayrımı yapılışla ilgilidir, saydam/opak ayrımı ışık geçirmeyle ilgilidir. Dağınık yansıma bir kitabı farklı yönlerden görmemize yardım eder; her görülen yüzey ayna görüntüsü oluşturmaz. Gerçek siyah yüzeylerin tüm ışığı kusursuz soğurduğunu varsaymak ideal bir sınırdır; az da olsa yansıma bulunabilir.",
    ),
    s(
      "Candela, lümen ve lüksü yerlerine koy",
      "Işık şiddeti I, bir doğrultudaki birim katı açıya düşen ışık akısıyla ilgilidir; birimi candela, cd’dir. Işık akısı Φ, insan gözünün duyarlılığına göre ağırlıklandırılmış ışık gücüyle ilişkili niceliktir; birimi lümen, lm’dir. Aydınlanma E, birim alana düşen akıdır; birimi lüks, lx=lm/m²’dir.",
      "Lümen bir enerji birimi veya yüzeye birim zamanda gelen kuvvet değildir. Watt elektrik gücü ile lümen akısı aynı kavram değildir; iki lambanın verimi/tayfı farklı olabilir. Akı alana düzgün dağılıyorsa E=Φ/A; düzgün değilse bu bölüm ortalama aydınlanmayı verir. Küçük bir noktadaki aydınlanmayı bütün yüzeyle aynı kabul etmek koşul ister.",
    ),
    s(
      "Ters kareyi geometriden türet",
      "Her yöne eşit I ile ışık veren ideal noktasal kaynağın toplam akısı Φ=4πI’dir. Soğurma yoksa uzaklaştıkça aynı toplam akı daha büyük küre alanına dağılır: A=4πr². Kaynağa dik küçük yüzey için E=I/r² olur; r iki katına çıkarsa aydınlanma dörtte bire iner.",
      "Bu artan kürenin tamamından geçen akı uzaklıkla azalmaz; azalan birim alana düşen paydır. İdeal paralel demette soğurma ve yayılma ihmal edilirse uzaklık tek başına aynı ters kareyi doğurmaz. Kaynak boyutu mesafeye göre büyükse veya mercek/reflektör varsa basit noktasal kaynak yaklaşımının geçerliliğini yeniden değerlendir.",
    ),
    s(
      "Açıyı yüzeyle değil normalle ölç",
      "Işının küçük yüzeyin normaliyle yaptığı açı θ ise E=Icosθ/r²’dir. Dik düşmede θ=0 ve cosθ=1; yüzeye teğet ışında θ=90° ve ideal yüzeyin aldığı pay sıfırdır. Işın yüzeyle 30° yapıyorsa normalle 60° yapar; kosinüse doğrudan 30° yerleştirme.",
      "Bu bağıntı kaynak-yüzey mesafesini aynı tutan ve yüzeyin çok küçük olduğu yerel modeli anlatır. Büyük bir yüzeyin her noktası kaynağa farklı uzaklık/açıda olabilir; bütün alan için tek E kullanmak ek yaklaşım ister. Aydınlanmanın sıfır olduğu yönelmede kaynak sönmüş değildir; yüzeyin izdüşümü sıfırlanmıştır.",
    ),
    s(
      "Birden fazla kaynağı ve alanı ayrı değiştir",
      "Bir noktadaki bağımsız kaynakların aydınlanma katkıları olağan öğretim koşullarında toplanır. Örneğin aynı noktaya 20 lx ve 30 lx katkı toplam 50 lx verir. İkinci kaynağın geometrisi farklıysa her birinin I, r ve θ değerini ayrı hesapla; uzaklıkları veya şiddetleri doğrudan toplam formülüne koyma.",
      "I sabitken küçük yüzey alanını büyütmek, aynı yerel E ve yönelim altında yüzeye düşen toplam akıyı artırabilir; E’nin kendisi sırf alan büyüdü diye artmaz. Buna karşılık sabit bir toplam akıyı daha geniş alana dağıtmak ortalama E’yi azaltır. Sorunun sabit tuttuğu niceliği yazmak iki durumun görünürde çelişmesini giderir.",
    ),
    s(
      "Işık enerji ve momentum taşır",
      "Soğurulan ışık enerji aktarabilir, ışık ayrıca momentum da taşır. Ancak bir düzenekte ışık altında dönme görülmesi tek başına etkinin yalnız radyasyon basıncı olduğunu kanıtlamaz. Crookes radyometresinin düşük basınçtaki olağan davranışında kanatların sıcaklık farkı ve gazla termal etkileşim temel rol oynar; onu doğrudan saf ışık basıncı ölçeri gibi sunmak yanlıştır.",
      "Aydınlanma sorularında önce kaynak türü ve doğrultusunu, ardından metre cinsinden uzaklık ve normal açısını belirle. Sonuçta cd/m² değil, ilgili geometrik modelle lx elde ettiğini denetle. Bu atölye fotometrik noktasal kaynak modelidir; renk algısının kişisel ölçümünü, radyometre gaz dinamiğini veya gerçek lamba verimliliğini simüle etmez.",
    ),
  ],
  examples: [
    ex(
      "Mesafeyi iki katına çıkar",
      "Her yönde 120 cd olan ideal noktasal kaynak, ışına dik küçük yüzeyi 2 m uzaklıkta aydınlatıyor. E?4 m’de ne olur?",
      "Aynı şiddeti iki uzaklık için ayrı böl.",
      [
        ["İlk yüzey", "Normal açı 0°.", "E₂=120/2²=30 lx"],
        ["Uzak yüzey", "Uzaklık 2 kat.", "E₄=120/4²=7,5 lx"],
        ["Oran", "Ters kareyi denetle.", "7,5/30=1/4"],
      ],
      "30 lx;7,5 lx",
      "Uzaklık 2 kat, alanpayı 4 kat.",
      "Işık şiddeti 120 cd’yi uzaklıkla azaltma.",
    ),
    ex(
      "Yüzey açısını dönüştür",
      "200 cd noktasal kaynak 2 m uzakta. Işın küçük yüzeyle 30° yapıyor. cos 60=1/2. E?",
      "Normal açısı 60°’dir.",
      [
        ["Açı", "Yüzey ve normal diktir.", "θ=90−30=60°"],
        [
          "Dik katkı",
          "Aynı uzaklıkta en büyük değeri bul.",
          "I/r²=200/4=50 lx",
        ],
        ["Eğim", "Kosinüsle azalt.", "E=50·1/2=25 lx"],
      ],
      "25 lx",
      "Dik durum 50 lx’den küçük olmalı.",
      "cos 30 kullanmak yüzey-normal karışıklığıdır.",
    ),
    ex(
      "Toplam akı ve alan",
      "80 lm akı 4 m² yüzeye düzgün dağılıyor. Ortalama aydınlanma? Aynı akı 8 m²’ye yayılırsa?",
      "Akıyı alana böl.",
      [
        ["İlk dağılım", "Düzgün dağılım verilmiş.", "E₁=80/4=20 lx"],
        ["İkinci dağılım", "Akı aynı, alan 2 kat.", "E₂=80/8=10 lx"],
        ["Kontrol", "Alanla aydınlanmanın çarpımı korunur.", "20·4=10·8=80 lm"],
      ],
      "20 lx;10 lx",
      "Bu soru sabit akıyı paylaştırır.",
      "Kaynağa olan uzaklık verilmeden ters kare bağıntısını uydurma.",
    ),
    ex(
      "İki lambanın katkısı",
      "Bir noktada birinci lamba 30 lx, ikinci lamba 18 lx oluşturuyor. Bağımsız katkılar toplanıyor. İkinci kapatılınca ne olur?",
      "Katkıları ve kalan kaynağı ayrı yaz.",
      [
        ["Toplam", "İki kaynak birlikte.", "E=30+18=48 lx"],
        ["Kapatma", "Yalnız ikinci katkı gider.", "E'=30 lx"],
        ["Değişim", "Azalma ikinci lambanın payıdır.", "ΔE=18 lx"],
      ],
      "48 lx’den 30 lx’e iner",
      "Birinci lambanın katkısı değişmez.",
      "Aydınlanmaların çarpımını alma veya ortalamasını alma.",
    ),
  ],
  recall: [
    { prompt: "I,Φ, E’nin birimleri?", answer: "I:cd;Φ:lm;E:lx=lm/m²." },
    {
      prompt: "Uzaklık iki katken toplam küresel akı da dörtte bire mi iner?",
      answer:
        "Hayır. Kayıpsız ortamda toplam akı aynı; birim alana düşen pay dörtte bire iner.",
    },
    {
      prompt: "Işın yüzeyle 20° yapıyorsa normal açısı?",
      answer: "70°; kosinüse normal açısı yerleştirilir.",
    },
    {
      prompt: "Watt ile lümen niçin aynı değil?",
      answer:
        "W güç birimidir; lm göz duyarlılığına göre fotometrik akıdır. Verim ve tayf bilgisi olmadan eşitlenmez.",
    },
    {
      prompt: "Crookes radyometresinin dönmesi yalnız ışık basıncı mı?",
      answer:
        "Hayır. Olağan düşük basınçlı düzeneğin termal gaz etkileri önemlidir; saf radyasyon basıncı ölçeri değildir.",
    },
  ],
  questions: [
    [
      "İdeal noktasal kaynak 180 cd.2 m uzaktaki dik küçük yüzeyin aydınlanması?",
      ["45 lx", "90 lx", "360 lx", "720 lx", "180 lx"],
      "Dik küçük yüzey için kaynak şiddetini uzaklığın karesine böl: E=I/r².",
      "E=180/2²=45 lx. Uzaklık karesi paydadadır; 90 lx sonucu yalnız uzaklığa bölmekten doğan ters kare hatasıdır.",
    ],
    [
      "Noktasal kaynağa uzaklık 3 m’den 9 m’ye çıkıyor; ışık şiddeti ve normal açı aynı. E₂/E₁?",
      ["1/9", "1/3", "3", "9", "1"],
      "Uzaklık 3 kat.",
      "E₂/E₁=(3/9)²=1/9. Uzaklık üç kat olduğu için aynı akı dokuz kat alana dağılır; kaynağın ışık şiddeti sabit kalır.",
    ],
    [
      "240 lm akı 12 m² alana düzgün dağılıyor. Ortalama E?",
      ["20 lx", "2880 lx", "2 lx", "240 lx", "12 lx"],
      "Düzgün dağılan akıyı toplam alana böl: E=Φ/A.",
      "240/12=20 lm/m²=20 lx. Düzgün dağılım verildiği için bu değer yüzey boyunca aynıdır.",
    ],
    [
      "E=Icosθ/r² modelinde θ hangi açıdır?",
      [
        "Işınla yüzey normali arasındaki",
        "Işınla yüzeyin kendisi arasındaki",
        "İki kaynak arasındaki",
        "Yüzeyin alanı ile yarıçap arasındaki",
        "Her zaman 90° olan",
      ],
      "En büyükE dik düşmede oluşmalı.",
      "Dik düşmede ışın normalle 0° yapar ve cos 0=1. Yüzey açısını kullanmak sin/cos karışıklığı yaratır.",
    ],
    [
      "100 cd kaynak 2 m uzakta; ışın normalle 60° yapıyor, cos 60=0,5. E?",
      ["12,5 lx", "25 lx", "50 lx", "100 lx", "200 lx"],
      "Önce 100/4, sonra 0,5.",
      "E=100·0,5/4=12,5 lx. Aynı uzaklıktaki dik 25 lx değerin yarısıdır.",
    ],
    [
      "Işık şiddetininSI birimi hangisi?",
      ["Candela", "Lüks", "Lümen", "Joule", "Metre"],
      "Doğrultusal kaynak niceliğiI.",
      "I’nın birimi cd=candela; akı lm, aydınlanma lx’tir. Üç niceliği aynı adla anma.",
    ],
    [
      "Her yönde eşit 50 cd ideal noktasal kaynağın toplam akısı?",
      ["200π lm", "50π lm", "50 lm", "25π lm", "4π/50 lm"],
      "Tam katı açı 4πsteradyandır.",
      "Φ=4πI=200πlm. Bu toplam akı kayıpsız ortamda çevreleyen kürenin yarıçapından bağımsızdır.",
    ],
    [
      "Bir noktaya bağımsız iki kaynak 24 lx ve 16 lx katkı yapıyor. BirlikteE?",
      ["40 lx", "8 lx", "20 lx", "384 lx", "1,5 lx"],
      "Olağan aydınlanma katkıları toplanır.",
      "E=24+16=40 lx. Kaynak şiddetlerini veya uzaklıkları birleştiren yeni bir tek kaynak uydurulmaz.",
    ],
    [
      "İdeal paralel demette yayılma/soğurma yok, yüzey yönelimi ve demet içindeki konumu aynı. Yüzeyi demet boyunca uzaklaştırmak tek başınaE’yi nasıl etkiler?",
      [
        "Değiştirmez",
        "Her zaman 1/r²azaltır",
        "İki kat artırır",
        "Sıfırlar",
        "Kaynak frekansını düşürür",
      ],
      "Noktasal açılan demet koşulu var mı?",
      "Ters kare açılarak yayılan noktasal kaynak modelidir. İdeal paralel ve kayıpsız demette uzaklık tek başınaE’yi değiştirmez.",
    ],
    [
      "Crookes radyometresi ışıkta dönüyor. En doğru bilimsel yorum hangisi?",
      [
        "Dönüşte termal gaz etkileri önemlidir; yalnız saf ışık basıncı kanıtı sayılmaz",
        "Her dönüşte gazın hiçbir rolü yoktur",
        "Işık enerji taşımaz",
        "Lümen bir kuvvet birimidir",
        "Dönme ışığın boşlukta yayılamadığını kanıtlar",
      ],
      "Olayı açıklarken deneyin gaz ve sıcaklık koşullarını düşün.",
      "Olağan düşük basınçlı Crookes düzeneğinde termal gaz etkileri temel rol oynar. Işık momentum taşır ama bu gözlemi yalnız radyasyon basıncı ölçümü diye yorumlamak doğru değildir.",
    ],
  ],
};
const shadow: Pack = {
  id: "golge-yari-golge",
  topic: "detail-132",
  title: "Gölge ve yarı gölge: hangi kaynaktan ışık geliyor?",
  minutes: 60,
  pages: "170–173",
  objectives: [
    "Tam gölge, yarı gölge ve aydınlığı kaynaktan ulaşan ışık sayısıyla açıkla.",
    "Sınır ışınlarıyla gölge boyunu benzer üçgenlerden hesapla.",
    "Noktasal ve geniş kaynakta geometrinin değişmesine göre sonucu gerekçelendir.",
  ],
  sections: [
    s(
      "Işık yolu ve opak engel",
      "Homojen ortamda doğrusal ışın modelinde opak cisim ışığı geçirmez; cismin arkasındaki bazı noktalara kaynaktan doğrudan ışın ulaşamaz. Gölge bu geometrik engellenme ile oluşur. Saydam malzeme çok ışık geçirir; yarı saydam malzeme ışığı kısmen geçirip saçabilir. Gerçek malzemede soğurma ve saçılma değişir; bu derste engel tam opak kabul edilir.",
      "Gölgenin şekli cismin yalnız fiziksel boyundan değil, kaynak-cisim-perde konumundan da etkilenir. Düz bir cismin eğik izdüşümü ile küresel cismin dairesel kesitini karıştırma. Bu atölye iki boyutlu bir kesit kullanır; çizimde verilen uzunlukları alan sanmaz. Gerçek renkli kaynakların tayf etkisi bu geometrik modelin dışındadır.",
    ),
    s(
      "Tek noktasal kaynakta sınırlar",
      "Noktasal kaynak ideal olarak tek bir noktadan ışık verir. Kaynaktan opak cismin iki sınırına teğet doğrular çizilip perdeye uzatılır. Bu iki sınır arasında kaynaktan doğrudan ışık gelmez: tam gölge oluşur. İdeal noktasal kaynakta tek başına sürekli geçişli bir yarı gölge bandı beklenmez.",
      "Kaynakla cisim arasındaki uzaklık a, kaynakla perde arasındaki uzaklık b ise paralel cisim/perde düzlemlerinde gölge boyu H=(b/a)h’dir. h cismin aynı kesitteki boyudur. b, cisim-perde uzaklığı değil kaynak-perde uzaklığıdır; verilen cisim-perde uzaklığını önce a ile topla. Benzerlik üçgenlerini aynı başlangıç noktasından kur.",
    ),
    s(
      "Kaynağa ve perdeye yaklaşmayı ayrı değiştir",
      "Kaynak sabitken cisim kaynağa yaklaşırsa a küçülür ve aynı perdedeki gölge büyür. Cisim sabitken perde uzaklaşırsa b artar ve gölge büyür. Cismi perdeye yaklaştırmakla perdeyi cisimden uzaklaştırmak aynı işlem değildir; sabit kalan noktaları yazmadan yön ezberleme.",
      "İdeal paralel demette aynı yüzey yönelimiyle cismin kesitine eş gölge oluşabilir; noktasal kaynak büyütmesi doğrudan uygulanmaz. Gölge boyunun 2 kat olması dairesel gölgenin alanını 4 kat yapar. Soru boy/yarıçap/çap/alan hangisini soruyorsa ona göre son adımı seç; uzunluk oranıyla alan oranını eşitleme.",
    ),
    s(
      "İki kaynakta her gölgeyi ayrı çiz",
      "İki noktasal kaynak varsa önce birini kapatıp diğerinin gölge aralığını bulduğunu düşün. Ardından ikinci kaynağın gölgesini aynı perde üzerinde çiz. İki aralığın örtüştüğü yer iki kaynaktan da doğrudan ışık almaz: tam gölgedir. Yalnız bir aralık içindeki nokta diğer kaynaktan ışık alır: yarı gölgedir.",
      "Hiçbir gölge aralığında olmayan nokta iki kaynaktan da ışık alır. İki kaynaktan birini kapatmak kalan kaynağın geometrik gölgesini ortadan kaldırmaz; daha önce yarı gölge olan bazı bölgeleri tam karanlık yapabilir. Eşit olmayan kaynak güçlerinde iki yarı gölge eşit parlak görünmek zorunda değildir; sınıflandırma için ulaşan ışığı kaynak kaynak izle.",
    ),
    s(
      "Örtüşme var mı, önce onu sor",
      "Kaynaklar arasındaki uzaklık artarken, simetrik iki kaynağın perde üzerindeki gölgelerinin merkezleri zıt yönlere kayar. Sabit engel ve perdede her bir gölgenin boyu aynı kalabilir; kesişim küçüldüğü için tam gölge daralır. Yeterince ayrıldıklarında ortak tam gölge kalmayabilir, iki ayrı yarı gölge bandı bulunabilir.",
      "Bu sonuç kaynakların aynı uzaklıkta ve simetrik hareket ettiği özel modeldir. Bir kaynak ileri, diğeri yanal hareket ederse hem boy hem merkez farklı değişebilir. Her çizimde kesin sonuç 'tam gölge artar' gibi tek cümleyle bulunmaz. Aralıkların uçlarını veya teğet ışınlarını çizerek toplam karanlık bölgeyi ve ortak karanlığı ayrı say.",
    ),
    s(
      "Geniş kaynakta görünür kısmı düşün",
      "Geniş bir kaynak birçok noktasal kaynağın toplamı gibi düşünülebilir. Bir noktadan kaynağın hiçbir kısmı görünmüyorsa tam gölge, bir kısmı görünüyorsa yarı gölge vardır. Kaynağın tamamı görünüyorsa doğrudan ışık açısından aydınlıktır. Noktasal kaynak yaklaşımı kaynak boyutunun mesafelere göre küçük olduğu sınırdır.",
      "Kaynak engelden büyükse tam gölge konisi belirli uzaklıkta sonlanabilir; daha geride kaynak çevresinin göründüğü bir bölge bulunabilir. Kaynak ve engel boyları eşitse veya kaynak daha küçükse sınırların geometrisi farklıdır. İki uç ışın tüm parlaklık dağılımını tek başına nicel hesaplamaz; gerçek geniş kaynağın sürekli yarı gölgesini iki eşit noktasal kaynağın üç basamaklı parlaklığıyla aynı sanma.",
    ),
    s(
      "Gözlemci ve perde aynı kanıtı paylaşır",
      "Bir perde noktasını gözlemcinin yeri kabul edip buradan kaynağa geriye doğru sınır ışınları çizmek mümkündür. Işığın geometrik yolu ters yönde de aynı doğruyu izler. Engel kaynağın tamamını örtüyorsa gözlemci tam gölgededir; bir kısmını örtüyorsa yarı gölgededir.",
      "Güneş/Ay tutulmalarında da hizalanma ve kaynağın görünür kısmı düşünülür; her yeniayda tutulma olmamasında yörünge geometrisi önemlidir. Bir kürenin aydınlanan yarısıyla perdenin gölge alanı farklı nesnelerdir. Küreye bakan kişinin gördüğü aydınlık şekil, kaynak ve gözlemci yönüne bağlıdır; kürenin her bakışta yarısını aydınlık görmek zorunda değilsin.",
    ),
    s(
      "Çözümü çizim ve birimle doğrula",
      "Önce kaynakların sayısını ve büyüklüğünü, cismin opaklığını, perde konumunu yaz. Her kaynak için engel uçlarından geçen iki sınır ışınını çiz; çizgileri perdenin arkasında keyfî bir noktada durdurma. Sonra tam gölge için kesişimi, yarı gölge için yalnız bir kaynakça engellenen kısımları belirle.",
      "Uzunluk hesaplarında benzerlik ve birimleri, alan hesabında karesini kullan. Tam gölge yok sonucunu bütün perdenin aydınlık olması diye yorumlama: yarı gölge kalabilir. Modelde renkler kaynağa göre engellenen bölgeleri ayırır; sonuç metni aynı sınıflandırmayı renk görmeye gerek bırakmadan verir. Difraksiyonla yumuşayan gerçek kenarlar bu geometrik yaklaşımda hesaplanmaz.",
    ),
  ],
  examples: [
    ex(
      "Perde uzaklığını doğru topla",
      "Noktasal kaynakla cisim arası 30 cm, cisim-perde arası 60 cm. Cismin boyu 10 cm. Paralel perde üzerindeki gölge boyu?",
      "Kaynak-perde mesafesi 90 cm’dir.",
      [
        [
          "Toplam uzaklık",
          "İki aralığı aynı doğrultuda topla.",
          "b=30+60=90 cm",
        ],
        ["Benzerlik", "Aynı kaynak tepe noktasıdır.", "H/h=b/a=90/30=3"],
        ["Gölge", "Cisim boyunu 3 ile çarp.", "H=3·10=30 cm"],
      ],
      "30 cm",
      "Perde cisimden daha uzakta olduğu için gölge daha büyük.",
      "60/30 kullanıp 20 cm bulma;60 cm kaynak-perde uzaklığı değildir.",
    ),
    ex(
      "Boy ve alan",
      "Dairesel opak diskin paralel perdedeki gölgesinin yarıçapı 2 katına çıkıyor. Alan kaç kat olur?",
      "Alan doğrusal boyun karesiyle değişir.",
      [
        ["İlk alan", "Daire alanını yaz.", "A₁=πr²"],
        ["Yeni alan", "Yeni yarıçap 2 r.", "A₂=π(2 r)²=4πr²"],
        ["Oran", "Ortakπr²sadeleşir.", "A₂/A₁=4"],
      ],
      "4 kat",
      "Yarıçap 2 kat, çap da 2 kat; alan 4 kat.",
      "Yarıçap oranını alan oranı gibi verme.",
    ),
    ex(
      "İki gölgenin kesişimi",
      "Bir perdede K kaynağının engellendiği aralık−6 ile 2 cm, L’ninki−2 ile 6 cm. İkisi eş güçte. Tam gölge aralığı ve boyu?",
      "Tam karanlık için iki kaynak da engellenmeli.",
      [
        ["Kesişim", "İki aralığın ortak kısmını al.", "[−6,2]∩[−2,6]=[−2,2]"],
        ["Boy", "Sağ uçtan sol ucu çıkar.", "2−(−2)=4 cm"],
        [
          "Yarı gölge",
          "Yalnız bir aralıkta kalan bölgelerdir.",
          "[−6,−2) ve (2,6]",
        ],
      ],
      "−2 ile 2 cm; boy 4 cm",
      "Ortak bölüm iki kaynaktan da ışık almaz.",
      "Birleşim−6 ile 6 tam gölge değildir; uçlarda bir kaynak görünür.",
    ),
    ex(
      "Kaynaklardan birini kapat",
      "K’nin engellendiği aralık−6 ile 2 cm, L’ninki−2 ile 6 cm. K kapatılıyor. Kalan doğrudan ışığa göre tam gölge nerede?",
      "Artık yalnız L’nin ışığını izle.",
      [
        [
          "Kapatılan kaynak",
          "K artık hiçbir noktayı aydınlatmaz.",
          "Etkin kaynak=L",
        ],
        ["Engellenen L", "L gölgesi kendi geometrisini korur.", "[−2,6]"],
        [
          "Yorum",
          "Önceden yalnız L’nin engellendiği uç da karanlıktır.",
          "Tam gölge boyu=8 cm",
        ],
      ],
      "−2 ile 6 cm",
      "İki kaynaklı ortak 4 cm’den tek kaynaklı 8 cm’ye çıkar.",
      "Kaynak kapatılınca bütün gölgeler kaybolur sanma.",
    ),
  ],
  recall: [
    {
      prompt: "Tam gölge için iki kaynaktan hangisi görünür?",
      answer: "Hiçbiri; ikisinin ışığı da engellenmiştir.",
    },
    {
      prompt: "Tek ideal noktasal kaynak neden keskin gölge verir?",
      answer:
        "Her nokta için kaynak ya tamamen engellenir ya görünür; sürekli kaynak parçası dağılımı yoktur.",
    },
    {
      prompt: "Kaynak-perde uzaklığı nasıl bulunur?",
      answer:
        "Kaynak-cisim ile cisim-perde uzaklıklarının aynı doğrultudaki toplamıdır.",
    },
    {
      prompt: "Tam gölge yoksa her yer tam aydınlık mı?",
      answer:
        "Hayır. Kaynakların yalnız birini gören yarı gölge bölgeleri kalabilir.",
    },
    {
      prompt: "Geniş kaynakta yarı gölgeyi gözlemci nasıl tanır?",
      answer: "Kaynağın bir kısmı engel arkasında, bir kısmı görünürdür.",
    },
  ],
  questions: [
    [
      "Noktasal kaynak-cisim 20 cm, cisim-perde 40 cm. Cisim 8 cm. Paralel perdedeki gölge boyu?",
      ["24 cm", "16 cm", "8 cm", "4 cm", "48 cm"],
      "Kaynak-perde 60 cm.",
      "H=8·60/20=24 cm.40 cm yalnız cisim-perde aralığıdır.",
    ],
    [
      "İdeal tek noktasal kaynak ve opak engelde, geometrik optik yaklaşımında beklenen gölge?",
      [
        "Keskin sınırlı tam gölge",
        "Zorunlu sürekli yarı gölge bandı",
        "Hiçbir karanlık bölge yok",
        "Her yerde iki kaynak görünümü",
        "Kaynak boyundan bağımsız halkalı dağılım",
      ],
      "Tek kaynak noktası ya görünür ya engellenir.",
      "Tek ideal noktasal kaynak keskin tam gölge verir. Kırınım ve saçılma modelin dışındadır.",
    ],
    [
      "İki kaynaklı düzende bir perde noktası K’den ışık almıyor, L’den alıyor. Sınıfı?",
      [
        "Yarı gölge",
        "Tam gölge",
        "İki kaynakça tam aydınlık",
        "Kesin sıfır ışık",
        "Sanal görüntü",
      ],
      "Ulaşan kaynakları tek tek say.",
      "Yalnız bir kaynak engellenmiş olduğundan yarı gölgedir. Tam gölgede ikisi de engellenir.",
    ],
    [
      "K gölgesi[−8,4], L gölgesi[−2,10]cm. Tam gölge boyu?",
      ["6 cm", "18 cm", "12 cm", "8 cm", "2 cm"],
      "Kesişimin uçlarını bul.",
      "Ortak aralık[−2,4]; boy 4−(−2)=6 cm.18 cm birleşimin boyudur.",
    ],
    [
      "Noktasal kaynak ve cisim sabit. Paralel perde kaynak uzaklığı 2 katına çıkarılıyor. Gölge boyu oranı?",
      ["2", "4", "1/2", "1/4", "1"],
      "Kaynak-perde uzaklığını kaynak-cisim uzaklığıyla oranla: H=(b/a)h.",
      "a, h sabitken b 2 kat olur, H 2 kat olur. Alan sorulsaydı benzer şekil için 4 kat olurdu.",
    ],
    [
      "Dairesel gölgenin çapı 3 katına çıkıyor. Alan oranı?",
      ["9", "3", "6", "1/3", "27"],
      "Alan doğrusal boyun karesiyle değişir.",
      "Çap 3 kat ise yarıçap da 3 kat; A=πr² nedeniyle alan 9 kat olur. Doğrusal boydaki artışı alan artışıyla doğrudan eşitleme.",
    ],
    [
      "İki noktasal kaynak için gölge aralıkları[−10,−2]ve[2,10]cm. Tam gölge boyu?",
      ["0 cm", "4 cm", "8 cm", "16 cm", "20 cm"],
      "Aralıklar kesişiyor mu?",
      "Ortak kısım yok, tam gölge 0 cm. İki aralığın içinde ayrı yarı gölgeler vardır; bütün perde iki kaynakça aydınlık değildir.",
    ],
    [
      "Geniş kaynağın tamamını engel arkasında göremeyen, fakat kenarının bir kısmını gören gözlemci nerede?",
      [
        "Yarı gölgede",
        "Tam gölgede",
        "Kaynağın merkezinde",
        "Hiç gölge etkisi olmayan bölgede",
        "Zorunlu odak noktasında",
      ],
      "Kaynağın görünür payı sıfır mı, kısmi mi?",
      "Kaynağın bir kısmı görülürse doğrudan ışığın bir kısmı gelir; yarı gölgedir.",
    ],
    [
      "Tek kaynakta kaynak-cisim uzaklığı ve cisim boyu sabit. Cisim-perde uzaklığı artırılıyor. Gölge boyu?",
      [
        "Artar",
        "Azalır",
        "Her zaman değişmez",
        "Sıfır olur",
        "Frekansla aynı oranda azalır",
      ],
      "Kaynak-perde b artıyor.",
      "H=bh/a bağıntısında b artar; H artar. Kaynak ve cisim sabit koşulları sonucu belirler.",
    ],
    [
      "İki kaynakta bir nokta iki kaynaktan da ışık alamıyor. Kaynaklardan biri kapatılırsa, diğerinin geometrisi değişmeden bu nokta?",
      [
        "Karanlık kalır",
        "Kesin tam aydınlık olur",
        "İki kaynaktan ışık alır",
        "Perde dışına taşınır",
        "Opak engel saydamlaşır",
      ],
      "Kalan kaynağın yolu hâlâ engelli.",
      "Nokta başlangıçta her iki kaynağı da engel nedeniyle göremiyordu. Birini kapatmak kalan ışının yolunu açmaz; karanlık kalır.",
    ],
  ],
};
const mirror: Pack = {
  id: "duzlem-ayna",
  topic: "detail-133",
  title: "Düzlem ayna: simetri, ışınlar ve görüş alanı",
  minutes: 70,
  pages: "174–177",
  objectives: [
    "Yansıma açılarını normalden ölç ve ışın uzantısıyla sanal görüntü kur.",
    "Sınırlı aynada görünürlük ve tam boy ayna yüksekliğini geometrik olarak gerekçelendir.",
    "Cisim/ayna hareketlerinde görüntünün konumunu seçilmiş referansa göre hesapla.",
  ],
  sections: [
    s(
      "Yansıma normalle başlar",
      "Işın bir yüzeyden geldiği ortama döndüğünde yansıma vardır. Gelme noktasında yüzeye dik normal çizilir. Gelen ışın, yansıyan ışın ve normal aynı düzlemdedir; normalden ölçülen gelme açısı i, yansıma açısı r’ye eşittir. Normal doğrultusunda gelen ışın aynı yol üzerinden geri döner.",
      "Işının yüzeyle yaptığı açı α ise i=90°−α’dır. Gelenle yansıyan ışın kolları arasındaki küçük taraftaki açı 2 i olarak verilebilir; sorunun hangi yönlü/açısal bölgeyi gösterdiğine dikkat et. Aynada yön değişir; aynı durgun ortamda frekans ve süratin büyüklüğü değişmez. Kaynak rengi yalnız ideal yansıma yönü değişti diye başka renge dönüşmez.",
    ),
    s(
      "Düzgün ve dağınık yansıma aynı yasaya uyar",
      "Pürüzsüz düzlem yüzeye paralel ışınlar birbirine paralel yansıyabilir; bu düzgün yansımadır. Pürüzlü yüzeyin farklı küçük bölgelerinde normaller farklı olduğundan ışınlar farklı yönlere yansır; bu dağınık yansımadır. Dağınık yansımada yansıma yasası bozulmaz; her küçük parça kendi normaline göre davranır.",
      "Bir kitabı farklı açılardan görebilmek dağınık yansımanın yararıdır. Aynada belirgin görüntü için yönler arasındaki düzen korunmalıdır. Parlak her yüzey kusursuz düzlem ayna değildir; metal kaşığın eğriliği görüntü boyunu değiştirebilir. Bu ünite yansıtıcı yüzeyi düz, ince ve ideal alır; cam kalınlığından doğan çoklu yansımaları hesaplamaz.",
    ),
    s(
      "Görüntüyü ışın uzantılarıyla kur",
      "Noktasal cismin aynaya ulaşan iki farklı ışınını çiz ve her birini yasaya göre yansıt. Yansıyan ışınların geriye doğru kesik çizgili uzantıları aynanın arkasında tek noktada buluşur. Göz, gelen ışınların bu noktadan çıkıyormuş gibi doğrultulandığını algılar. Aynanın arkasında gerçek ışınların toplanması gerekmez.",
      "Cisimden aynaya dik uzaklık d ise görüntünün aynaya dik uzaklığı da d’dir. Bu sonuç yüzeye göre geometrik simetridir. Cismin aynaya uzaklığını eğik cetvel uzunluğuyla ölçme. Birden fazla noktalı cisimde uç noktaları ayrı yansıtıp birleştirmek yeterlidir; her görüntü noktası kendine ait cisim noktasının simetriğidir.",
    ),
    s(
      "Sanal, düz ve eş boylu ne demektir?",
      "Düzlem aynanın olağan önündeki gerçek cismin görüntüsü sanaldır: yansıyan ışınlar görüntü noktasında gerçekten kesişmez, uzantıları kesişir. Bu nedenle görüntü, o noktaya yerleştirilen sıradan perde üzerine doğrudan düşürülemez. Görüntü diktir ve cismin boyuna eşittir; aynayı küçültmek tam görülen görüntüyü aynı oranda küçültmez, görüşü sınırlayabilir.",
      "Ayna yansıması yüzeye dik koordinatı ters çevirir. Gündelik sağ-sol tersliği ifadesi, kişinin görüntüsüyle yönlerini karşılaştırmasından doğar; ayna her durumda üst-altı değiştirir diye yorumlanmaz. Ambulans yazısının önden ters yazılması düzlem aynadaki geometrik yansımayla okunabilir olur. Yazı veya şeklin asimetrik işaretini nokta nokta yansıtmak ezberden daha sağlamdır.",
    ),
    s(
      "Sonlu aynada görüntünün yeri ile görünmesi farklıdır",
      "Sonsuz uzatılmış düzlem için bir noktanın simetriği her zaman tanımlanabilir; fakat küçük bir aynadan o görüntünün göze ulaşması garanti değildir. Göz ile sanal görüntüyü birleştir; doğrunun ayna düzlemini kestiği nokta gerçek aynanın uçları arasındaysa ve yol açık ise görüntü görülebilir.",
      "Gözün aynaya göre simetriğinden aynanın uçlarına çizilen sınır doğrularını öne uzatarak da görüş alanı bulunabilir. Aynanın dışındaki duvar parçasından geçmesi gereken bir ışın küçük aynada yansıyamaz. Engel varsa cismin, aynanın ve gözün gerçek ışın yollarını kontrol et; yalnız görüntü noktasının kâğıtta bulunması görünürlüğü kanıtlamaz.",
    ),
    s(
      "Tam boy aynayı yarım boy kılan benzerlik",
      "Dik duran kişinin başını ve ayağını görebilmesi için baştan göze ve ayaktan göze yansıyan sınır ışınlarını düşün. Baş ve göz aynaya aynı dik uzaklıktaysa yansıma noktaları onların yüksekliklerinin ortalamasındadır. Kişi boyu H, göz yüksekliği e ise alt uç e/2, üst uç (H+e)/2 yükseklikte olabilir; en küçük ayna boyu H/2’dir.",
      "Bu sonuç düz düşey ayna, kişinin baş/göz/ayak noktalarının aynı dikey çizgi üzerinde olması ve engel bulunmaması yaklaşımındadır. Aynaya yaklaşmak gereken en küçük boyu değiştirmez; fakat aynanın doğru yüksekliğe asılması gerekir. Göz yüksekliğini kullanmadan yalnız H/2 uzunluğunda bir aynayı zemine koymak bütün bedeni göstermeyebilir.",
    ),
    s(
      "Görüş alanı sorusunda neyin sabit olduğunu söyle",
      "Gözlemci küçük aynaya yaklaştığında arkasındaki sabit bir duvarda görebildiği aralık genişleyebilir; geometrik sınır ışınları değişir. Kişinin kendi bedeninin tamamını görmek için gereken yarım boy koşuluyla bu duvar görüş alanı aynı soru değildir. Aynaya yaklaşınca bütün görünür alanların değişmediğini iddia etme.",
      "Aynanın dönmesi veya gözün yanal hareketi görüş alanını kaydırır. Cisim görünürlüğünü sınamak için göz-görüntü doğru kesişimini tekrar hesapla. Simetri görüntünün konumunu, sonlu ayna ışığın gerçekten göze ulaşıp ulaşmadığını belirler; bu iki adımı sırayla yapmak karmaşık çizimleri basitleştirir.",
    ),
    s(
      "Hareketi sabit bir referansa göre çöz",
      "Düşey aynanın yatay koordinatı xm, cismin koordinatı xc ise görüntü xg=2 xm−xc olur. Ayna sabitken cisim aynaya v süratiyle yaklaşıyorsa görüntü de aynaya aynı süratle yaklaşır; cisim-görüntü uzaklığı 2 v hızla azalır. Görüntünün yere göre sürati ile cisme göre bağıl yaklaşma sürati aynı değildir.",
      "Cisim sabitken ayna cisme 3 cm yaklaşırsa görüntü yere göre 6 cm yer değiştirir; cisim-aynaya uzaklık 3 cm azalır. Cisim ve ayna birlikte hareket ederse önce son koordinatları yaz, sonra xg hesabını yap. Aynanın dönmesinde, gelen ışının doğrultusu sabitken ayna küçükθ açısı dönerse yansıyan ışın 2θ döner; bunun koşulu aynanın yalnız ötelenmesi değildir.",
    ),
  ],
  examples: [
    ex(
      "Yüzeyle 35°",
      "Işın düzlem ayna yüzeyiyle 35° yapıyor. Gelme ve yansıma açıları normalden kaç derece?",
      "Yüzey açısını normal açısına dönüştür.",
      [
        ["Normal", "Yüzeyle normal diktir.", "i=90−35=55°"],
        ["Yansıma", "İki normal açısı eşittir.", "r=55°"],
        ["Kontrol", "Yansıyan ışın yüzeyle 35° yapar.", "90−55=35°"],
      ],
      "55° ve 55°",
      "Açı normalden sorulmuştur.",
      "35°’yi doğrudan r yazma.",
    ),
    ex(
      "Cisim ve görüntü aralığı",
      "Sabit düzlem aynadan 40 cm uzakta duran cisim aynaya 10 cm yaklaşıyor. Son cisim-görüntü uzaklığı?",
      "Önce yeni ayna uzaklığını bul.",
      [
        ["Yeni cisim uzaklığı", "Aynaya yaklaşılıyor.", "d'=40−10=30 cm"],
        ["Görüntü uzaklığı", "Simetri aynı d’yi verir.", "dg'=30 cm"],
        ["Toplam aralık", "Aynanın iki yanında topla.", "30+30=60 cm"],
      ],
      "60 cm",
      "İlk aralık 80 cm, azalma 20 cm.",
      "Son aralığı 30 cm sanma;30 yalnız bir taraftır.",
    ),
    ex(
      "Ayna hareket ediyor",
      "Cisim yere göre sabit, ayna başlangıçta cismin sağında 50 cm. Ayna cisme 5 cm yaklaşıyor. Görüntü yere göre ne kadar yer değiştirir?",
      "Cisim koordinatını 0 seç.",
      [
        ["İlk konum", "Görüntü xg=2 xm−xc.", "xg=2·50−0=100 cm"],
        ["Son konum", "Ayna 45 cm’ye gelir.", "xg'=2·45=90 cm"],
        ["Değişim", "Görüntü cisme doğru 10 cm kayar.", "Δxg=90−100=−10 cm"],
      ],
      "10 cm cisme doğru",
      "Ayna 5 cm, görüntü 10 cm ilerledi.",
      "Görüntünün yere göre hareketini aynaya göre uzaklığıyla karıştırma.",
    ),
    ex(
      "En küçük tam boy ayna",
      "Kişi 180 cm, gözleri 170 cm yüksekte; ideal düşey aynada baş ve ayaklar görünmeli. En küçük aynanın alt/üst uçları?",
      "Sınır ışınlarının yansıma yüksekliği uçlarla gözün ortalamasıdır.",
      [
        ["Alt uç", "Ayak 0 cm, göz 170 cm.", "h_alt=(0+170)/2=85 cm"],
        ["Üst uç", "Baş 180 cm, göz 170 cm.", "h_üst=(180+170)/2=175 cm"],
        ["Boy", "İki yükseklik arasını al.", "175−85=90 cm"],
      ],
      "Alt 85 cm, üst 175 cm; boy 90 cm",
      "90=180/2; uzaklık bu ideal sonucu değiştirmez.",
      "90 cm’lik aynanın asılma yüksekliğini önemsiz sayma.",
    ),
  ],
  recall: [
    {
      prompt: "Sanal görüntüde aynanın arkasına gerçek ışın gider mi?",
      answer:
        "Bu ideal ön-cisim düzeninde hayır; geriye uzatılmış çizgiler kesişir.",
    },
    {
      prompt: "Aynayı kısaltmak görüntünün boyunu küçültür mü?",
      answer:
        "Düzlem aynada eş boy simetri korunur; görülebilen kısmı sınırlanabilir.",
    },
    {
      prompt: "Göz-görüntü doğrusu aynanın dışından geçerse?",
      answer:
        "O sınırlı aynadan o görüntü noktası gözlenemez; gerçek ışın yansıma noktası yoktur.",
    },
    {
      prompt: "Tam boy için en küçük ayna uzunluğu?",
      answer:
        "İdeal düşey düzende kişinin boyunun yarısı; uygun asılma yüksekliği de gerekir.",
    },
    {
      prompt: "Ayna ve cisim birlikte hareket ederse hangi bağıntı?",
      answer: "Aynı referansta xg=2 xm−xc; hız için vg=2 vm−vc.",
    },
  ],
  questions: [
    [
      "Işın düzlem ayna yüzeyiyle 20° yapıyor. Normalden ölçülen yansıma açısı?",
      ["70°", "20°", "40°", "10°", "90°"],
      "Normal yüzeye diktir.",
      "Normal yüzeye diktir: i=90−20=70°, r=i=70°. Verilen 20° yüzey açısıdır; normalden ölçülen yansıma açısı değildir.",
    ],
    [
      "Düzlem aynaya dik gelen ışın için gelme açısı?",
      ["0°", "90°", "45°", "180°", "30°"],
      "Açı normalden ölçülür.",
      "Dik gelen ışın normal üzerindedir; gelme açısı 0°’dir ve kendi yolundan geri döner.",
    ],
    [
      "Cisim sabit düzlem aynadan 35 cm uzakta. Cisim-görüntü aralığı?",
      ["70 cm", "35 cm", "17,5 cm", "105 cm", "0 cm"],
      "Görüntü aynanın arkasında 35 cm.",
      "İki taraftaki uzaklık 35+35=70 cm. Görüntü için simetri kullanılır.",
    ],
    [
      "Düzlem aynadaki gerçek ön-cisim görüntüsü için doğru özellik?",
      [
        "Sanal, düz, eş boylu",
        "Gerçek,ters,küçük",
        "Her zaman perdede oluşan",
        "Ayna boyuna göre sürekli küçülen",
        "Aynaya cisimden farklı dik uzaklıkta",
      ],
      "Işınların kendisi mi uzantıları mı kesişiyor?",
      "Uzantılar kesişir: sanal. Düşey yön ve boy korunur; ayna uzaklıkları eşittir.",
    ],
    [
      "160 cm kişinin gözü 150 cm yüksekte. İdeal düşey tam boy aynasının en küçük uzunluğu?",
      ["80 cm", "160 cm", "150 cm", "75 cm", "155 cm"],
      "Üst ve alt yansıma noktalarının farkıH/2.",
      "Üst(160+150)/2=155, alt 150/2=75; boy 80 cm. Uygun yüksekliğe asılmalıdır.",
    ],
    [
      "Sabit ayna önündeki cisim aynaya 3 m/s ile yaklaşıyor. Cisim-görüntü aralığı hangi hızla azalır?",
      ["6 m/s", "3 m/s", "1,5 m/s", "0 m/s", "9 m/s"],
      "İki simetrik nokta da aynaya yaklaşıyor.",
      "Ayna sabitken görüntü aynaya 3 m/s yaklaşır; aralık 6 m/s azalır. Görüntünün yere göre sürati 3 m/s’dir.",
    ],
    [
      "Cisim yere göre sabit. Düzlem ayna cisme 4 cm yaklaşıyor. Görüntünün yere göre yer değiştirme büyüklüğü?",
      ["8 cm", "4 cm", "2 cm", "16 cm", "0 cm"],
      "xg=2 xm−xc, cisim sabit.",
      "Δxg=2Δxm=8 cm büyüklüğündedir. Aynaya göre görüntü uzaklığı ise 4 cm azalır.",
    ],
    [
      "Gelen ışının doğrultusu sabitken düzlem ayna 10° döndürülüyor; aynı düzlemde yansıma sürüyor. Yansıyan ışının doğrultu değişimi?",
      ["20°", "10°", "5°", "0°", "40°"],
      "Normal de ayna kadar döner; yansıma açısı eşitliği ikinci katkıyı verir.",
      "Bu koşullarda yansıyan ışın 2θ=20° döner. Aynanın ötelenmesi için aynı kural söylenmez.",
    ],
    [
      "Bir noktanın düzlem ayna görüntüsü geometrik olarak bulundu. Sonlu aynadan görülmesi için ayrıca ne gerekir?",
      [
        "Göz-görüntü doğrusunun gerçek ayna parçasını kesmesi ve ışın yolunun açık olması",
        "Görüntünün mutlaka gerçek olması",
        "Aynanın cismin boyundan büyük olması",
        "Cismin aynanın arkasında olması",
        "Gözün aynaya sıfır uzaklıkta olması",
      ],
      "Simetri konum verir; ışının göze ulaşması ayrı koşul.",
      "Geri uzantı göze gelen gerçek yansıyan ışına karşılık gelmelidir. Kesişim aynanın dışında veya yol engelliyse nokta görülemez.",
    ],
    [
      "Dağınık yansımada neden paralel ışınlar farklı yönlere dönebilir?",
      [
        "Yüzeyin küçük bölgelerinin normalleri farklıdır",
        "Yansıma yasası tamamen bozulur",
        "Işık her noktada zorunlu başka renge döner",
        "Her ışının frekansı sıfırlanır",
        "Işık maddede hiç etkileşmez",
      ],
      "Her küçük parçada kendi normalini çiz.",
      "Her yerel yansımada i=r sürer. Pürüzler normalleri değiştirir; global ışınlar farklı yönlere gider.",
    ],
  ],
};
const packs = [water, sound, light, shadow, mirror];
const source = (p: Pack) =>
  `MEBİ TYT Fizik Konu Özetleri, basılı s.${p.pages} öğretim ve şekilleriyle karşılaştırılmış özgün anlatım, görsel model ve alıştırmalar. Şiddet/düzey, büyüklük ölçeği ve radyometre açıklamalarındaki bilimsel koşullar açıklaştırılmıştır. Sorular özgündür; resmî ÖSYM sorusu veya tüm arşiv değildir.`;
export const forge012PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge012PhysicsGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: source(p),
}));
export const forge012PhysicsLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "tyt-fizik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  tags: [p.topic, p.id],
  source: txt(source(p)),
  body: p.sections.map((sec) => ({
    title: txt(sec.title),
    text: txt(sec.paragraphs.join("\n\n")),
  })),
  questions: p.questions.map(([prompt, options, hint, explanation], i) => {
    const shift = (i * 2 + 1) % 5;
    return {
      id: `${p.id}-q${i + 1}`,
      prompt: txt(prompt),
      options: options.map((_, j) => txt(options[(j - shift + 5) % 5])),
      answer: shift,
      hint: txt(hint),
      explanation: txt(explanation),
      skill: p.id,
    };
  }),
}));
function valid(...v: number[]) {
  if (!v.every((x) => Number.isFinite(x) && x > 0))
    throw new RangeError("Pozitif sonlu değerler gerekir.");
}
function angle(v: number, max = 90) {
  if (!Number.isFinite(v) || v < 0 || v > max)
    throw new RangeError("Açı izin verilen aralıkta olmalı.");
}
export function waterRefraction(
  frequency: number,
  speed1: number,
  speed2: number,
  incidence: number,
) {
  valid(frequency, speed1, speed2);
  angle(incidence, 89);
  const ratio = speed2 / speed1,
    sine = ratio * Math.sin((incidence * Math.PI) / 180);
  return {
    frequency,
    period: 1 / frequency,
    wavelength1: speed1 / frequency,
    wavelength2: speed2 / frequency,
    angle2: sine <= 1 ? (Math.asin(sine) * 180) / Math.PI : null,
    canTransmit: sine <= 1,
  };
}
export function soundState(frequency: number, speed: number, distance: number) {
  valid(frequency, speed, distance);
  return {
    wavelength: speed / frequency,
    period: 1 / frequency,
    echoTime: (2 * distance) / speed,
    totalPath: 2 * distance,
  };
}
export function seismicState(distance: number, pSpeed: number, sSpeed: number) {
  valid(distance, pSpeed, sSpeed);
  if (pSpeed <= sSpeed)
    throw new RangeError("Bu modelde P sürati S’den büyük olmalı.");
  return {
    pTime: distance / pSpeed,
    sTime: distance / sSpeed,
    difference: distance / sSpeed - distance / pSpeed,
  };
}
export function illuminanceState(
  intensity: number,
  distance: number,
  normalAngle: number,
) {
  valid(intensity, distance);
  angle(normalAngle);
  const factor = Math.max(0, Math.cos((normalAngle * Math.PI) / 180));
  return {
    lux: (intensity * factor) / distance ** 2,
    normalLux: intensity / distance ** 2,
    flux: 4 * Math.PI * intensity,
    factor,
  };
}
export function shadowState(
  objectDistance: number,
  screenDistance: number,
  halfHeight: number,
  separation: number,
  twoSources = true,
) {
  valid(objectDistance, screenDistance, halfHeight);
  if (
    screenDistance <= objectDistance ||
    !Number.isFinite(separation) ||
    separation < 0
  )
    throw new RangeError(
      "Perde cismin arkasında ve kaynak ayrımı negatif olmayan olmalı.",
    );
  const magnification = screenDistance / objectDistance,
    halfShadow = magnification * halfHeight,
    sourceY = twoSources ? [-separation / 2, separation / 2] : [0],
    intervals = sourceY.map((y) => {
      const center = (1 - magnification) * y;
      return { source: y, min: center - halfShadow, max: center + halfShadow };
    });
  const points = [...new Set(intervals.flatMap((i) => [i.min, i.max]))].sort(
      (a, b) => a - b,
    ),
    segments = points.slice(0, -1).map((min, i) => {
      const max = points[i + 1],
        mid = (min + max) / 2,
        blocked = intervals.filter((s) => mid > s.min && mid < s.max).length;
      return {
        min,
        max,
        blocked,
        kind:
          blocked === intervals.length
            ? "full"
            : blocked > 0
              ? "partial"
              : "lit",
      };
    });
  const fullWidth = segments
      .filter((s) => s.kind === "full")
      .reduce((n, s) => n + s.max - s.min, 0),
    partialWidth = segments
      .filter((s) => s.kind === "partial")
      .reduce((n, s) => n + s.max - s.min, 0);
  return {
    magnification,
    halfShadow,
    intervals,
    segments,
    fullWidth,
    partialWidth,
  };
}
export function mirrorState(
  objectX: number,
  mirrorX: number,
  incidence: number,
) {
  if (![objectX, mirrorX].every(Number.isFinite) || objectX >= mirrorX)
    throw new RangeError("Cisim aynanın solunda olmalı.");
  angle(incidence, 80);
  const distance = mirrorX - objectX;
  return {
    imageX: 2 * mirrorX - objectX,
    distance,
    imageDistance: distance,
    separation: 2 * distance,
    reflection: incidence,
  };
}
export function fullLengthMirror(height: number, eye: number) {
  valid(height, eye);
  if (eye > height) throw new RangeError("Göz yüksekliği boyu geçemez.");
  return { bottom: eye / 2, top: (height + eye) / 2, length: height / 2 };
}

export function reflectedRay(incidence: number, run = 40) {
  angle(incidence, 60);
  valid(run);
  return { run, rise: run * Math.tan((incidence * Math.PI) / 180) };
}
