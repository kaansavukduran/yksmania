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
const section = (title: string, a: string, b: string): GuideSection => ({
  title,
  paragraphs: [a, b],
});
const example = (
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
const mirrors: Pack = {
  id: "kuresel-aynalar",
  topic: "detail-134",
  title: "Küresel aynalar: odaktan görüntüye ışın kur",
  minutes: 70,
  pages: "178–184",
  objectives: [
    "Küre merkezi, tepe, odak ve yerel normali doğru tanımla.",
    "Çukur ve tümsek aynada gerçek ışınları sanal uzantılardan ayır.",
    "Odak, iki odak ve odak içi sınırlarında görüntünün yerini, yönünü ve büyütmesini gerekçelendir.",
  ],
  sections: [
    section(
      "Kürenin hangi yüzü yansıtıyor?",
      "Küre kabuğunun içi yansıtıcıysa çukur, dışı yansıtıcıysa tümsek ayna elde edilir. Tepe T aynanın asal eksenle kesiştiği yer, eğrilik merkezi M kürenin merkezidir. T ile M arasındaki uzaklık R’dir. Aynaya değen her noktadaki normal, o noktayı M’ye birleştiren doğru boyunca çizilir; her ışın için normali asal eksen sanma.",
      "Asal eksene yakın ve küçük açılı ışınların paraksiyal yaklaşımında odak uzaklığı f≈R/2’dir. Geniş açıklıkta bütün paralel ışınlar kusursuz tek noktada toplanmaz; küresel sapma bu basit modelin sınırıdır. Uygulamadaki çizim eksene yakın ince ışın modelini kullanır. İncelenen f işareti aynanın geometrisini anlatır; negatif uzaklık eksi uzunlukta bir cetvel değildir.",
    ),
    section(
      "Çukur ayna her zaman büyütmez",
      "Paralel ışınları önündeki gerçek odağa yönlendiren çukur ayna, cisim yerine göre küçük, eş boylu veya büyük görüntü verebilir. Ayna ile odak arasındaki gerçek cisim için sanal, düz ve büyük görüntü oluşur; yakın makyaj aynası buna örnektir. Cisim odaktan uzaktayken görüntü gerçek ve ters olabilir.",
      "Güneş fırını veya uzak kaynak için paralel demet odağa yakın toplanır. Gerçek bir ışığın odak çevresinde toplanması enerji yoğunluğunu artırabilir; bu özellik bir oyuncak güvenlik deneyi önerisi değildir. Görüş alanı veya büyütme amacıyla ayna seçerken yalnız ayna adına değil cisim konumuna ve istenen görüntüye bak.",
    ),
    section(
      "Özel ışınları yansıma yasasından türet",
      "Çukur aynaya asal eksene paralel gelen paraksiyal ışın odaktan geçecek biçimde yansır. Odaktan gelen ışın paralel çıkar; tersinirlik bu iki çizimi bağlar. Merkez doğrultusunda gelen ışın yerel normale dik değil, normal boyunca geldiği için kendi yolundan geri döner. Tepeye gelen ışında asal eksen o noktadaki normaldir.",
      "Tümsek aynada paralel gelen ışın, uzantısı aynanın arkasındaki odaktan geliyormuş gibi dağılır. Odak veya merkez arkasına yönelen gelen ışınla gerçek kaynağın o noktada bulunmasını karıştırma. En az iki farklı ışın seçmek görüntü noktasını buldurur; tek ışının üstünde sayısız aday nokta vardır. Bir düzlem aynadan çıkan ışın daha sonra küresel aynaya merkez doğrultusunda gelirse önce küresel yüzeyde kendi yoluna döner. Düzlem aynaya tekrar ulaştığında yansımanın tersinirliği eski giriş yolunu buldurur; her iki aynaya gerçekten değme koşulu ayrıca denetlenir.",
    ),
    section(
      "Gerçek ile sanal, ışınla uzantı ayrımıdır",
      "Yansıyan ışınların kendileri bir noktada buluşuyorsa gerçek görüntü vardır. Geriye uzatılan kesik çizgiler buluşuyorsa sanal görüntü vardır; bu çizgiler aynanın arkasına giden gerçek ışık değildir. Gerçek görüntü uygun yerdeki perdeye düşürülebilir; sanal görüntü doğrudan kendi yerinde bir perdeyle yakalanmaz.",
      "Bu ünitede gerçek cisim uzaklığı u>0, çukur odak f>0, tümsek odak f<0 seçilir. Görüntü uzaklığı v aynanın önündeyse pozitif, arkasındaysa negatiftir. 1/f=1/u+1/v ve m=−v/u kullanılır. m’nin büyüklüğü boy oranını, işareti yönü verir: m<0 ters, m>0 düz. Formül bu tanımlarla anlam kazanır.",
    ),
    section(
      "İki odak çevresindeki beş konum",
      "Çukur aynada u>2f iken görüntü f ile 2f arasında, gerçek, ters ve küçüktür. u=2f olduğunda v=2f ve |m|=1 olur. f<u<2f iken v>2f; görüntü gerçek, ters ve büyüktür. Bunlar rastgele ezber satırları değil v=fu/(u−f) bağıntısının farklı aralıklarıdır.",
      "Cisim odaktan dışarı doğru çok uzaklaştığında v odak uzaklığına yaklaşır; tam sonsuzdaki ideal eksenel nokta kaynağı odak noktasına indirgenir. Sonlu boylu gerçek bir nesne için görüntünün açısal yapısı ayrıca düşünülür. Her uzak nesnenin bütün görüntüsünü koşulsuz tek nokta sayma. İki odak sınırını kontrol etmek büyütmenin doğru yönde değiştiğini gösterir.",
    ),
    section(
      "Odakta sonlu görüntü çizme",
      "u=f durumunda formülün paydası sıfır olur. Paraksiyal modelde yansıyan ışınlar paraleldir; sonlu bir görüntü noktası yoktur. 'Sonsuzda görüntü' bu sınırın kısa adıdır. Hesapta sonsuzu keyfî büyük bir sayı yapıp ekrana sahte bir görüntü oku koymak doğru değildir.",
      "0<u<f iken v negatiftir ve m>1 olur: görüntü aynanın arkasında, düz ve büyüktür. Odak sınırının iki yanında v işaret değiştirir; görüntü bir anda sıfır boylu olup başka tarafa atlamaz, sonlu uzaklık sınırı ortadan kalkar. 'Cisim yaklaştıkça görüntü büyür' cümlesini odağı geçerken tek ve kesintisiz gerçek görüntü kuralı gibi kullanma.",
    ),
    section(
      "Tümsek aynadaki dar görüntüyü açıkla",
      "Gerçek ön cisim için tümsek aynanın f’si negatiftir. v=fu/(u−f) daima negatiftir; görüntü arka odakla tepe arasında, düz ve küçüktür. Cisim aynaya yaklaşınca görüntü tepeye yaklaşır ve büyütme 1’e doğru artar; sonlu pozitif u için yine 1’den küçüktür.",
      "Güvenlik ve kavşak aynalarında geniş alan görmek yararlıdır; küçülen görüntü uzaklık algısını etkileyebilir. Tümsek aynanın odağı arkasında olması gerçek ışınların arka tarafta toplandığı anlamına gelmez. Aynanın yansıtıcı geometrisi sabitse odak uzaklığı olağan geometrik optikte mercek gibi ortam indisinden veya ışığın renginden hesaplanmaz.",
    ),
    section(
      "Her sonuca üç kontrol koy",
      "Önce işaret kuralını ve cismin f–2f bölgesini yaz. Formülle v’yi, sonra m’yi bul; ışın çiziminin aynı yerde, aynı yönde ve aynı boy oranında görüntü verdiğini denetle. Örneğin f=10 cm, u=30 cm için v=15 cm, m=−0,5 olması f–2f arasında küçük ters görüntüyle tutarlıdır.",
      "|m| bir uzunluk değil boy oranıdır. Cisim boyu h verilirse görüntü boyunun büyüklüğü |m|h’dir; işaretli yükseklik mh çizimde yönü belirtir. Bir sonucu aynanın yanlış tarafına çizmek sayısal doğruyu görsel yanlışa dönüştürür. Atölyede sürekli ışınlar gerçek yayılmayı, kesik çizgiler yalnız sanal geri uzantıları gösterir.",
    ),
  ],
  examples: [
    example(
      "Uzak cisim, küçük görüntü",
      "Çukur aynada f=12 cm, u=36 cm, h=8 cm. Görüntünün yeri ve boyu?",
      "İşaretli görüntü uzaklığını bul, sonra boy oranını hesapla.",
      [
        ["Uzaklık", "Aynı uzunluk birimini koru.", "v=12·36/(36−12)=18 cm"],
        ["Büyütme", "Eksi yönü koru.", "m=−18/36=−0,5"],
        ["Yükseklik", "İşaret yönü gösterir.", "h'=−0,5·8=−4 cm"],
      ],
      "Önde 18 cm; ters, 4 cm boylu.",
      "12<18<24 ve |m|<1; bölge kontrolü sağlanır.",
      "Eksi büyütmeyi eksi fiziksel boy değil ters yön olarak oku.",
    ),
    example(
      "Odak içindeki cisim",
      "Çukur aynada f=10 cm, u=5 cm. v ve m?",
      "u−f’nin negatif olacağını önce tahmin et.",
      [
        ["Payda", "Cisim odak içindedir.", "u−f=−5 cm"],
        ["Konum", "İşaretli bağıntıyı uygula.", "v=10·5/(−5)=−10 cm"],
        ["Yön ve boy", "Gerçek cisimde m=−v/u.", "m=−(−10)/5=2"],
      ],
      "Arkada 10 cm; sanal, düz, 2 kat.",
      "Kesik uzantılar arkada birleşmeli; gerçek ışın çizilmez.",
      "Negatif v’yi aynanın önüne koyma.",
    ),
    example(
      "Tümsek örnek",
      "Tümsek aynanın f=−15 cm, u=30 cm. Görüntü?",
      "Tümsek f işaretini denkleme aynen yerleştir.",
      [
        ["Uzaklık", "Payda 30−(−15)=45.", "v=−15·30/45=−10 cm"],
        ["Büyütme", "İki eksi düz görüntü verir.", "m=−(−10)/30=1/3"],
        ["Bölge", "Görüntü arka odaktan aynaya yakındır.", "|v|=10<15"],
      ],
      "Arkada 10 cm; düz, üçtebir boy.",
      "0<m<1 ve v<0, tümsek görüntüyle tutarlıdır.",
      "Odak uzaklığının büyüklüğünü pozitif işaretle kullanıp çukur çözümü üretme.",
    ),
    example(
      "Odağın tam üzerinde",
      "Çukur aynada f=8 cm, u=8 cm. Sonlu v hesaplanabilir mi?",
      "Sıfır paydayı bir sayı gibi bölmeye çalışma.",
      [
        ["Payda", "u−f sıfırdır.", "8−8=0"],
        ["Işınlar", "Çıkan ışınlar paraleldir.", "Sonlu kesişim yok"],
        ["Yorum", "Bu bir sınır durumudur.", "Görüntü sonsuzda denir"],
      ],
      "Sonlu görüntü noktası yok.",
      "Paralel ışınlara sonlu kesişim oku eklenmez.",
      "v=0 veya büyük keyfî sayı seçme.",
    ),
  ],
  recall: [
    {
      prompt: "Küresel yüzeyin yerel normali nereden geçer?",
      answer:
        "Gelme noktasından küre merkezine gider; yalnız tepede asal eksenle çakışır.",
    },
    {
      prompt: "u=2f konumunda çukur görüntü?",
      answer: "v=2f, m=−1; gerçek, ters, eş boylu.",
    },
    {
      prompt: "u=f için niçin sonlu ok yok?",
      answer:
        "Paraksiyal çıkan ışınlar paralel; sonlu görüntü noktası bulunmaz.",
    },
    {
      prompt: "Tümsek görüntünün işaretleri?",
      answer: "Gerçek ön cisimde f<0, v<0,0<m<1; sanal, düz, küçük.",
    },
  ],
  questions: [
    [
      "Çukur aynada f=10 cm, u=30 cm. Paraksiyal 1/f=1/u+1/v kuralıyla v?",
      ["15 cm önde", "15 cm arkada", "30 cm önde", "10 cm önde", "5 cm arkada"],
      "v=fu/(u−f) ve f pozitiftir.",
      "v=10·30/20=15 cm>0; görüntü aynanın önünde ve f ile 2f arasındadır.",
    ],
    [
      "Çukur aynada f=12 cm, u=24 cm, h=6 cm. Görüntünün yönü ve boyu?",
      ["Ters; 6 cm", "Düz; 6 cm", "Ters; 3 cm", "Düz; 12 cm", "Ters; 12 cm"],
      "u=2f için v de 2f olur; m=−v/u.",
      "v=24 cm, m=−1; görüntü ters ve cismin 6 cm boyuna eşittir. Eksi işaret yönü belirtir.",
    ],
    [
      "Çukur aynada f=10 cm, u=5 cm. Doğru görüntü açıklaması?",
      [
        "Arkada 10 cm; sanal, düz, 2 kat",
        "Önde 10 cm; gerçek, ters, 2 kat",
        "Arkada 5 cm; sanal, küçük",
        "Önde 5 cm; düz, eş boylu",
        "Sonlu görüntü yok",
      ],
      "u−f negatif olduğunda v’nin tarafını kontrol et.",
      "v=−10 cm, m=2; görüntü aynanın arkasındaki kesik uzantı kesişimidir; gerçek ışınlar oraya gitmez.",
    ],
    [
      "Tümsek aynada f=−10 cm, u=20 cm. m=−v/u büyütmesi?",
      ["1/3", "−1/3", "3", "−3", "1"],
      "Önce v=fu/(u−f), sonra m hesapla.",
      "v=−200/30=−20/3 cm; m=(20/3)/20=1/3. Pozitif ve1’den küçük oluşu düz, küçük görüntüyü doğrular.",
    ],
    [
      "Çukur aynada gerçek cisim tam odakta. Paraksiyal ışın modelinde hangisi doğrudur?",
      [
        "Çıkan ışınlar paraleldir; sonlu görüntü yoktur",
        "Görüntü mutlaka tepede sıfır boyludur",
        "Görüntü her zaman 2f’dedir",
        "v=0 kullanılır",
        "Sanal görüntü kesin −f’dedir",
      ],
      "u−f=0 sınırını çizimle karşılaştır.",
      "u=f paydasında sonlu v yoktur. Çıkan ışınlar paralel olduğundan 'sonsuzda görüntü' denir; keyfî sonlu konum atanmaz.",
    ],
    [
      "Küre merkezinden yüzeyin gelme noktasına çizilen doğru küresel aynada neyi verir?",
      [
        "Yerel normali",
        "Her noktada asal eksene paralel ışını",
        "Her koşulda odak doğrusunu",
        "Cismin boyunu",
        "Görüntü büyütmesini",
      ],
      "Küre yarıçapı o noktadaki yüzeye diktir.",
      "Merkez-gelme noktası yarıçapı yüzey normalidir. Asal eksen yalnız tepe noktasında aynı normal doğrultusudur.",
    ],
    [
      "Çukur aynada f=10 cm, u=15 cm. Görüntü konumu ve büyütme?",
      [
        "v=30 cm; m=−2",
        "v=−30 cm; m=2",
        "v=15 cm; m=−1",
        "v=5 cm; m=−1/3",
        "v=−5 cm; m=1/3",
      ],
      "Cisim f ile 2f arasında; görüntü 2f dışına gitmeli.",
      "v=150/5=30 cm, m=−30/15=−2. Gerçek ve ters görüntü 2 kat büyüktür; bölge tahminiyle uyumludur.",
    ],
    [
      "Gerçek cisimli tümsek aynada görüntünün ön taraftaki perdeye düşmemesinin temel nedeni?",
      [
        "Yansıyan ışınların kendileri yerine geri uzantıları birleşir",
        "Ayna ışığı hiç yansıtmaz",
        "Her ışın merkezde gerçek birleşir",
        "Görüntü her durumda cismin üstündedir",
        "Aynanın arkasında gerçek ışık kaynağı vardır",
      ],
      "Sanal sözcüğü gerçek ışının nerede bulunduğuyla ilgilidir.",
      "Tümsek gerçek ışınları dağıtır; arkadaki sanal noktayı kesik uzantılar belirler. Bu nokta doğrudan gerçek ışın toplanması değildir.",
    ],
    [
      "Paraksiyal küresel aynada eğrilik yarıçapı 40 cm. Odak uzaklığının büyüklüğü?",
      ["20 cm", "40 cm", "80 cm", "10 cm", "5 cm"],
      "f büyüklüğü R/2’dir; ayna türü işareti ayrıca belirler.",
      "|f|=40/2=20 cm. Çukur için pozitif, tümsek için negatif işaret seçilir; 20 cm büyüklük sorusudur.",
    ],
    [
      "Aynı geometrili ideal küresel aynanın çevresindeki saydam ortam değişiyor. Olağan yansıma modeli için odak uzaklığı hangisine bağlıdır?",
      [
        "Eğrilik yarıçapına; f≈R/2",
        "Mutlaka ortam indisinin karesine",
        "Yalnız ışığın frekansına",
        "Cismin boyuna",
        "Yalnız gözlemci uzaklığına",
      ],
      "Yansıma geometrisini merceğin bağıl indis etkisinden ayır.",
      "Küresel aynanın paraksiyal odağı geometrik R/2’dir. Ortam indisi veya ışığın rengini mercek bağıntısı gibi otomatik eklemek bu modeli değiştirir.",
    ],
  ],
};
const refraction: Pack = {
  id: "isigin-kirilmasi",
  topic: "detail-135",
  title: "Işığın kırılması: normal, indis ve sınır açısı",
  minutes: 70,
  pages: "185–188",
  objectives: [
    "Kırılma indisi ile sürat ilişkisini kur; optik yoğunluğu kütle yoğunluğuyla eşitleme.",
    "Snell açısını normalden ölç; frekans ile ortamdaki dalga boyunu ayrı izle.",
    "Kritik açı, tam iç yansıma, görünen derinlik ve paralel levha koşullarını denetle.",
  ],
  sections: [
    section(
      "İndis hangi sürati karşılaştırır?",
      "Bir saydam ortamın belirli ışık frekansındaki kırılma indisi n=c/v’dir. c boşluktaki ışık sürati, v o ortamın faz süratidir. Olağan görünür ışık örneklerinde n büyüdüğünde v küçülür. n birimsizdir; suyun kütle yoğunluğunu kg/m³ olarak n yerine koyamazsın. Okul hesaplarında hava çoğunlukla n≈1 kabul edilir.",
      "Optikçe çok yoğun sözü büyük kırılma indisini anlatır; bu, her maddenin kütle yoğunluğuna göre sıralama değildir. İndis frekansa bağlı olabilir; kırmızı ve mor için aynı sayıyı kullanmak özel bir yaklaşımdır. Bu ünitenin tek renkli arayüz modeli her ortam için seçilen tek bir n değerini kullanır; gerçek malzemenin bütün tayfını hesaplamaz.",
    ),
    section(
      "Normal çizmeden açı seçme",
      "Gelme noktasında arayüze dik doğru normaldir. Gelen ışınla normal arasındaki açı i, kırılan ışınla normal arasındaki açı r’dir. Durağan iki homojen saydam ortamın arayüzünde n₁sin i=n₂sin r olur. Buradan sin i/sin r=n₂/n₁ çıkar; oranı ters yazmak hem sayıyı hem bükülme yönünü yanlış yapar.",
      "n₂>n₁ ise geçen ışın normale yaklaşır, n₂<n₁ ise normalden uzaklaşır. i=0 için r=0 olduğundan doğrultu sapmaz; fakat n farklıysa sürat yine farklıdır. Normal gelişte yön değişmemesini arayüzde hiç yansıma olmamasıyla eşitleme. Normal, gelen ve kırılan ışın aynı düzlemdedir. A’dan B’ye normale yaklaşıp B’den C’ye uzaklaşmak yalnız n_B>n_A ve n_B>n_C sonucunu verir; A ile C’nin sırası ek açı bilgisi olmadan belirlenemez. Yüzeyle verilen 35° ise normalle açı 55° olur; sinüs bağıntısına yüzey açısını doğrudan koyma.",
    ),
    section(
      "Kaynak frekansını sınırda koru",
      "Durağan doğrusal ortam sınırından geçen aynı ışığın frekansı korunur. v=λf ve n=c/v olduğundan λ₂/λ₁=n₁/n₂’dir. Örneğin boşluk dalga boyu 600 nm olan ışık n=1,5 ortamda 400 nm dalga boyu taşır; frekansı 5×10¹⁴ Hz olarak kalır. Ortam içi 400 nm’yi boşluktaki 400 nm ışıkla aynı frekans sanma.",
      "Frekans korunurken 'dalga boyu değişti, o hâlde ışığın rengi otomatik değişti' çıkarımı yapılamaz. Kaynaktan gelen ışığın tayfsal kimliği ile ortam içi dalga boyu farklı niceliklerdir. Gerçek algıda kaynak tayfı, soğurma ve gözün yanıtı da rol oynar. Buradaki basit model frekans dönüştürme veya ışık üretme olayı içermez.",
    ),
    section(
      "Geçiş ve yansıma birlikte bulunabilir",
      "Sınırdaki ışığın bir kısmı geri yansıyıp bir kısmı karşı ortama geçebilir. Yansıyan ışın ilk ortamdadır ve normalle yine i açısını yapar. Snell yasası kırılan yönü belirler; yansıyan enerji yüzdesini tek başına vermez. Bir çizgide iki ışın bulunması enerjinin iki katına çıktığı anlamına gelmez.",
      "Işın yolları olağan durağan ve karşılıklı ortamlar için tersinir izlenebilir; çıkan ışının yolu ters yönde aynı arayüze gönderildiğinde eski yolu geri bulur. Bu ilke ışığın her koşulda kendiliğinden geri dönmesi demek değildir. Çizimde sürekli çizgiler gerçek yönleri verir; enerji payı hesaplanmadığı için kalınlıkları güç oranı gibi okunmaz.",
    ),
    section(
      "Sınır açısının varlık koşulunu önce sor",
      "Tam iç yansıma için ışık büyük indisli ortamdan küçük indisliye gelmelidir: n₁>n₂. Kritik açı i_c için sin i_c=n₂/n₁ olur ve r=90° sınırı elde edilir. i<i_c iken geçen ışın vardır; i>i_c iken geometrik modelde karşı ortamda ilerleyen kırılan ışın çizilmez, ışık geldiği ortama yansır.",
      "n₁≤n₂ iken bu temel düz arayüz modelinde kritik açı yoktur; 1’den büyük sinüs değerini bir açıya çeviremezsin. Kritik açının tam kendisinde 'yüzey boyunca sınır ışını' ifadesi r=90° geometrik sınırıdır; karşı ortama dik enerji akışını sonlu bir ışın gibi yorumlama. İdeal arayüzdeki alan ayrıntıları bu TYT ışın modelinin dışındadır.",
    ),
    section(
      "Görünür derinlik gerçek yer değiştirme değildir",
      "Sudaki bir noktadan havaya çıkan eğik ışınlar normalden uzaklaşır. Göz bu ışınları geriye uzatınca nokta daha sığdaymış gibi algılanır. Düz yüzeye yaklaşık dik bakışta görünen derinlik h'=h·n_gözlemci/n_cisim biçimindedir. Su n=4/3, hava n=1 ise gerçek 3 m derinlik yaklaşık 2,25 m görünür.",
      "Cisim yerinde durur; değişen, geriye uzatılmış ışınlardan çıkarılan konumdur. Büyük açılarda tek bir h' basitliği yaklaşık kalır; her gözlem doğrultusunda aynı kesin sayı değildir. Az indisli ortamdaki cisme daha yüksek indisli ortamdan bakılırsa görünür uzaklık artabilir. Tek çizimde 'her şey daha yakın görünür' diye evrensel sonuç kurma.",
    ),
    section(
      "Paralel levhada çıkış yönünü denetle",
      "İki paralel yüzlü saydam levhaya aynı dış ortamdan girip tekrar aynı dış ortama çıkan ışın, başlangıç ışınına paralel olur. Birinci sınırdaki normale yaklaşma ikinci sınırda geri açılmayla dengelenir; eğik gelişte yanal kayma bulunabilir. Dik gelişte hem sapma hem bu basit yanal kayma sıfırdır.",
      "Dış ortamlar farklıysa veya yüzeyler paralel değilse paralel çıkış garantisi yoktur. Kayma levha kalınlığı ve açılara bağlıdır; ışının levha içindeki eğik yolu ile dik kalınlığını ayır. Bir levhanın çıkış ışınının uzantısı kaynak noktasından geçmeyebilir; yönün aynı olması bütün yolun aynı olması demek değildir.",
    ),
    section(
      "Uygulama koşullarını sorgula",
      "Fiber optikte uygun çekirdek-kılıf indisleri ve açı koşulları iç yansımayı destekler. Bir saydam çubuğa her açıdan ışık göndermek bütün ışığın kayıpsız taşınmasını garanti etmez. Örneğin çekirdek indisi 1,50 ve kılıf indisi 1,20 ise kritik açının sinüsü 0,80’dir. Çekirdekten yan yüzün normaline 60° ile gelen ışında sin 60°≈0,866>0,80 olduğundan tam iç yansıma vardır; 60° fiber eksenine göre verilseydi normal açısı 30° olur ve aynı karar çıkmazdı. Serapta değişen hava koşulları nedeniyle indis uzayda değişir; tek keskin arayüz şeması bütün gerçek atmosferi temsil etmez.",
      "Her soruda önce hangi taraftan hangi tarafa geçildiğini ve açıların normalden ölçüldüğünü yaz. n=c/v ile sürati, Snell ile açıyı, f sabitliğiyle dalga boyunu ayrı hesapla. Snell’in sağ tarafı 1’i aşarsa hesap makinesine tanımsız arcsin zorlamak yerine tam yansıma koşulunu denetle. Sonuçları gerçek ışın çizimi ve HTML açıklamasıyla karşılaştır.",
    ),
  ],
  examples: [
    example(
      "Havadan cama",
      "n₁=1, n₂=1,5, i=30°. sin 30=0,5. Kırılma açısının sinüsü?",
      "n₁sin i=n₂sin r yaz.",
      [
        ["Yerine koy", "İndisler kendi tarafıyla eşleşir.", "1·0,5=1,5·sin r"],
        ["Böl", "İkinci indis sıfır değildir.", "sin r=1/3"],
        ["Yön", "Açı normale yaklaşmalı.", "r≈19,47°<30°"],
      ],
      "sin r=1/3; r≈19,47°.",
      "n₂ büyük olduğundan r<i; sayısal sonuç uygun.",
      "sin i/sin r oranını n₁/n₂ diye ters kurma.",
    ),
    example(
      "Tam iç yansıma",
      "Camdan havaya n₁=1,5, n₂=1, i=50° gönderiliyor. Olayı sınıflandır.",
      "Önce kritik açıyı bul.",
      [
        [
          "Kritik koşul",
          "Büyük indisten küçüğe geçiş var.",
          "sin i_c=1/1,5=2/3",
        ],
        ["Açı", "Kritik açı yaklaşık hesaplanır.", "i_c≈41,81°"],
        ["Karşılaştır", "50° kritik değerin üzerindedir.", "50°>41,81°"],
      ],
      "Tam iç yansıma; ilerleyen kırılan ışın yok.",
      "1,5sin 50°>1, arcsin gerçek sayı vermez; bu koşulla tutarlı.",
      "90° sınır açısını gelme açısı sanma; r kritik durumda 90° olur.",
    ),
    example(
      "Aynı ışık, yeni dalga boyu",
      "c=3×10⁸ m/s. Boşluk dalga boyu 600 nm ışık n=1,5 ortama giriyor. Ortam dalga boyu ve frekans?",
      "Önce frekansı boşluk verilerinden bul.",
      [
        ["Frekans", "600 nm=600×10⁻⁹ m.", "f=c/λ₀=5×10¹⁴ Hz"],
        ["Sürat", "Ortamda v=c/n.", "v=2×10⁸ m/s"],
        ["Dalga boyu", "Frekans korunur.", "λ=v/f=400 nm"],
      ],
      "400 nm; 5×10¹⁴ Hz.",
      "Ortam dalga boyu 1/1,5 kat, frekans aynıdır.",
      "400 nm ortam içi dalga boyunu kaynağın yeni frekansı gibi yorumlama.",
    ),
    example(
      "Havuzun görünür derinliği",
      "n_su=4/3, n_hava=1. Havadan yaklaşık dik bakılan nokta gerçek 3 m derinlikte. Görünür derinlik?",
      "Düz arayüz için küçük açılı görünür derinlik oranını kullan.",
      [
        ["Oran", "Gözlemci hava, cisim su içindedir.", "h'/h=1/(4/3)=3/4"],
        ["Çarp", "Gerçek derinliği oranla çarp.", "h'=3·3/4=2,25 m"],
        ["Yorum", "Cisim gerçekte yükselmez.", "Görünen fark 0,75 m"],
      ],
      "Yaklaşık 2,25 m.",
      "Havuz gerçeğinden sığ görünür; 2,25<3.",
      "Küçük açılı formülü her eğik bakışta kesin değer sanma.",
    ),
  ],
  recall: [
    {
      prompt: "Snell’in doğru çarpım biçimi?",
      answer: "n₁sin i=n₂sin r; iki açı da normalden ölçülür.",
    },
    {
      prompt: "Dik gelişte hangi nicelik yine değişebilir?",
      answer:
        "İndisler farklıysa v ve λ değişebilir; yön sapmaz ve durağan sınırda f korunur.",
    },
    {
      prompt: "Kritik açı ne zaman vardır?",
      answer: "n₁>n₂; sin i_c=n₂/n₁. i>i_c için tam iç yansıma.",
    },
    {
      prompt: "Paralel levhadan çıkan ışın ne zaman paraleldir?",
      answer:
        "Yüzeyler paralel ve iki dış ortam aynıysa; eğik gelişte yanal kayma olabilir.",
    },
  ],
  questions: [
    [
      "n₁=1, n₂=1,5, i=30° ve sin 30°=1/2. Snell yasasıyla sin r?",
      ["1/3", "3/4", "2/3", "1/2", "1"],
      "n₁sin i=n₂sin r çarpımını kur.",
      "sin r=(1·1/2)/1,5=1/3; daha büyük indise girişte açı küçülür.",
    ],
    [
      "Işık durgun sınırdan n=1 ortamdan n=1,5 ortama dik geliyor. Hangisi doğru?",
      [
        "Yön sapmaz; sürat azalır, frekans korunur",
        "Yön mutlaka 90° döner",
        "Frekans 1,5 kat artar",
        "Sürat ve dalga boyu kesin değişmez",
        "Yansıtılan enerji her koşulda tam sıfırdır",
      ],
      "Normal açı sıfırken n’nin sürat etkisini ayrı değerlendir.",
      "i=r=0 yönün sapmadığını gösterir. v=c/n azaldığı için λ da azalır; durağan sınırda f sabittir. Yansımanın mutlaka sıfır olması gerekmez.",
    ],
    [
      "n₁=2 ortamdan n₂=1 ortama geçişte kritik açının sinüsü?",
      ["1/2", "2", "1", "1/4", "0"],
      "Kritik r=90° koşulunu kullan.",
      "sin i_c=n₂/n₁=1/2; kritik gelme açısı 30°’dir.2 değeri sinüs olamayacağı için oran ters seçilmez.",
    ],
    [
      "n₁=1,5, n₂=1 arayüzünde kritik açı≈41,81°. Gelme 50° ise olay?",
      [
        "Tam iç yansıma",
        "Normalden yaklaşarak kesin geçiş",
        "Kırılma açısı 0°",
        "Frekans sıfır olur",
        "Gerçek kırılma açısı 100°",
      ],
      "Gelme açısını kritik değerle karşılaştır.",
      "50°>41,81° ve geçiş büyük indisten küçüğedir. Geometrik modelde ilerleyen kırılan ışın bulunmaz; yansıma vardır.",
    ],
    [
      "Aynı tek renkli ışık n₁=1, n₂=1,5 arasında geçiyor. İlk ortamda λ₁=600 nm. İkinci ortamda λ₂?",
      ["400 nm", "900 nm", "600 nm", "300 nm", "200 nm"],
      "f sabitken λ₂/λ₁=n₁/n₂.",
      "λ₂=600/1,5=400 nm. Durağan arayüzde f değişmediğinden ortam içi bu dalga boyu azalması yeni bir kaynak frekansı anlamına gelmez.",
    ],
    [
      "İki saydam ortam arasında tam iç yansımanın temel koşulları hangisi?",
      [
        "n₁>n₂ ve i>i_c",
        "n₁<n₂ ve i=0",
        "n₁=n₂ ve her açı",
        "Yalnız yüksek kütle yoğunluğu",
        "Yalnız ışığın kırmızı olması",
      ],
      "Hem geçiş yönü hem açı gereklidir.",
      "Büyük indisten küçük indise ve kritik gelme açısının üzerinde ışık gönderilmelidir. Kütle yoğunluğu veya renk tek başına koşul değildir.",
    ],
    [
      "c=3×10⁸ m/s, n=1,5. Bu tek renkli ışığın ortamdaki sürati?",
      ["2×10⁸ m/s", "4,5×10⁸ m/s", "1,5×10⁸ m/s", "3×10⁸ m/s", "0,5×10⁸ m/s"],
      "n=c/v eşitliğini v için çöz.",
      "v=c/n=3×10⁸/1,5=2×10⁸ m/s. n birimsizdir; hızları indisle çarpmak ters ilişkiyi bozar.",
    ],
    [
      "n_su=4/3, n_hava=1. Havadan yaklaşık dik bakılan bir noktanın gerçek derinliği 4 m. Görünür derinlik?",
      ["3 m", "4 m", "16/3 m", "1 m", "8 m"],
      "h'=h·n_gözlemci/n_cisim.",
      "h'=4·1/(4/3)=3 m. Cisim yer değiştirmez; geriye uzatılan ışınlar daha sığ bir görünür konum üretir.",
    ],
    [
      "Paralel yüzlü cam levhanın iki yanında aynı hava ortamı var; ışık eğik girip diğer yüzden çıkıyor. Çıkan ışın için doğru ifade?",
      [
        "Gelene paraleldir; yanal kaymış olabilir",
        "Her zaman kaynaktan tamamen geri döner",
        "Frekansı mutlaka iki katına çıkar",
        "Her iki yüzeyde aynı yöne daha fazla sapar",
        "Kesinlikle hiç yol farkı yoktur",
      ],
      "İki paralel arayüzdeki sapmaları birlikte izle.",
      "Aynı dış ortam ve paralel yüzeyler çıkış açısını başlangıç açısına eşitler; çizgiler paralel olur. Eğik gelişte konum kayması kalabilir.",
    ],
    [
      "Büyük indisten küçüğe geçişte gelme açısı tam kritik açıya eşit. Geometrik sınırda kırılma açısı?",
      ["90°", "0°", "45°", "Kritik açının yarısı", "180°"],
      "Kritik açı r=90° sınırıyla tanımlanır.",
      "Kırılan sınır ışını arayüz doğrultusuna yönelir: r=90°. Bu, gelme açısının her ortamda 90° olduğu veya i>i_c durumunda gerçek 100° ışın çizileceği anlamına gelmez.",
    ],
  ],
};
const lenses: Pack = {
  id: "mercekler",
  topic: "detail-136",
  title: "Mercekler: ışını izle, ortamı değiştir",
  minutes: 75,
  pages: "189–194",
  objectives: [
    "Mercek biçimi ile bulunduğu ortama göre yakınsak/ıraksak davranışı ayrı değerlendir.",
    "Gerçek ve sanal görüntüyü iki ışınla kur; u=f ve u=2f sınırlarını açıkla.",
    "Bağıl indis veya eğrilik değişiminde odağı ve görüntüyü tutarlı biçimde yeniden hesapla.",
  ],
  sections: [
    section(
      "Biçim ve davranış aynı kelime değildir",
      "Mercek ışığın iki yüzeyde kırılmasından yararlanır. İnce kenarlı bikonveks bir cam, havada çoğunlukla yakınsak; kalın kenarlı bikonkav cam çoğunlukla ıraksaktır. Bu adlar biçimi anlatırken yakınsak/ıraksak ışın davranışını anlatır. Mercek indisi çevresinden küçükse aynı biçimin etkisi tersine dönebilir.",
      "İnce mercek yaklaşımında merceğin kalınlığı diğer uzaklıklara göre küçük alınır. Optik merkezden geçen ışın bu modelde yön değiştirmeden çizilir; gerçek kalın merceklerde iki yüzey ve asal düzlemler ayrıca gerekir. Uygulamadaki simetrik mercek çizimi bir ölçü krokisi değildir; bütün sayısal uzaklıklar optik merkez düzleminden ölçülür.",
    ),
    section(
      "İki odak ve üç temel ışın",
      "Yakınsak ince merceğe paralel gelen ışın çıkış tarafındaki odaktan geçer. Giriş tarafındaki odaktan gelen ışın çıkışta asal eksene paralel olur. Optik merkezden geçen üçüncü ışın doğrusal sürer. Aynı ortam iki tarafta da varsa odak uzaklıklarının büyüklükleri eşittir; iki odak iki farklı mercek demek değildir.",
      "Iraksak mercekte paralel ışının çıkış doğrultusunun geri uzantısı giriş tarafındaki odaktan geçer. Karşı taraftaki odağa yönelen ışın paralel çıkar. Geri uzantıyı gerçek gelen veya çıkan ışın gibi kesintisiz çizme. Görüntü noktası için iki farklı ışın yeterlidir; üçüncü ışın bağımsız geometrik kontrol sağlar.",
    ),
    section(
      "İşaret kuralını aynadan bilinçli ayır",
      "Gerçek cisim giriş tarafında u>0, yakınsak odak f>0, ıraksak odak f<0 alınır. Mercekte gerçek görüntü çıkış tarafında v>0, sanal görüntü cismin tarafında v<0’dır. Aynadaki pozitif görüntü tarafını merceğe kopyalama: ayna ışığı geri gönderir, mercek karşı tarafa geçirir.",
      "İnce mercek bağıntısı 1/f=1/u+1/v, büyütme m=−v/u’dur. m<0 ters, m>0 düz; |m| boy oranıdır. Sonuçların birimi tutarlı olmalıdır. Negatif v’yi 'mercekten eksi santimetre uzakta fiziksel boşluk' diye değil seçilmiş tarafta yorumla. Uygun çıkış düzleminde gerçek ışınlar gerçekten kesişir; sanalda yalnız geri uzantılar birleşir.",
    ),
    section(
      "Yakınsak mercekte cismi odakla karşılaştır",
      "u>2f için görüntü çıkışta f ile 2f arasında, gerçek, ters ve küçüktür. u=2f için v=2f ve m=−1 olur. f<u<2f için görüntü 2f dışında, gerçek, ters ve büyüktür. Fotoğraf makinesi ve projeksiyon gibi uygulamalarda farklı cisim konumları farklı boy oranları gerektirir.",
      "u=f durumunda çıkan ışınlar paraleldir; sonlu görüntü noktası yoktur. 0<u<f olduğunda v<0, m>1: aynı taraftaki sanal görüntü düz ve büyüktür. Basit büyütecin davranışı bu bölgededir. Bir yaklaştırma işleminin odağı geçip geçmediğini söylemeden görüntü her zaman aynı tarafta büyür diye genelleme yapma.",
    ),
    section(
      "Iraksak merceğin gerçek cismi",
      "Verilen ortamda f<0 ise gerçek ön cisim için v negatiftir ve 0<m<1 olur. Görüntü mercekle giriş odağı arasındaki aynı tarafta, sanal, düz ve küçüktür. Cisim yaklaşınca görüntü de merceğe yaklaşabilir, büyütme artar ama sonlu pozitif u için 1’e eşit olmaz.",
      "Bu sonuç gerçek cisim ve tek ince mercek içindir. İki mercekli düzende ikinci merceğe gelen demet sanal cisim oluşturabilir; aynı ezber koşulsuz sürdürülmez. Gözlük örneği bir bireye tıbbi mercek önerisi değildir; burada optik model ve görüntü oluşumu öğrenilir. Görüntünün küçüklüğü ışığın hiç geçmediği anlamına gelmez.",
    ),
    section(
      "Bağıl indis odağı gerçekten değiştirir",
      "Simetrik bikonveks ince mercek için, iki tarafta aynı ortam bulunduğunda 1/f=(n_m/n_o−1)(1/R₁−1/R₂) kullanılabilir. Burada n_m merceğin, n_o ortamın indisidir. Işık soldan sağa giderken bikonvekste R₁=+R, R₂=−R seçilirse eğrilik çarpanı 2/R olur. Bikonkav biçimde işaret tersine döner.",
      "n_m=1,5, n_o=1, R=10 cm için f=10 cm’dir. Aynı mercek n_o=1,6 ortama alınırsa n_m/n_o−1 negatif olur ve f=−80 cm bulunur: biçim aynı, davranış ıraksaktır. n_m=n_o olduğunda ideal indis eşleşmesinde optik güç sıfır olur; ayrı bir mercek görüntüsü hesaplanmaz. Ortamı değiştirip f’yi sabit tutmak bu modele aykırıdır.",
    ),
    section(
      "Eğrilik, renk ve model koşulları",
      "Aynı indis oranında eğrilik yarıçaplarının büyüklüğü azaldıkça mercek daha güçlü olabilir ve |f| küçülebilir. Şeklin iki yüzeyi de önemlidir; her merceğin tek bir R değeri olduğu varsayılmaz. Bu atölye iki eş yarıçaplı simetrik biçimleri seçerek kontrol sayısını anlaşılır tutar.",
      "Normal dispersiyonlu olağan camın belirli görünür aralığında mor ışık daha fazla kırıldığı için odak uzaklığı kırmızıdan daha kısa olabilir; renk sapması oluşabilir. Bu, bütün malzemelerde ve bütün frekanslarda evrensel sıralama değildir. Tek renkli sayısal modelde seçilen indis o ışık için sabittir; verilmeyen ölçülmüş renk açıları üretilmez. Bir çukur aynanın odağındaki kırmızı veya mavi küçük kaynak, aynadan paraksiyal paralel demet çıkarır; aynanın geometrik odağını renkle değiştirme. Bu demetler aynı yakınsak cam merceğe girerse verilen normal dispersiyon aralığında mavi daha yakın birleşebilir. Çok elemanlı düzende ilk elemanın gerçek çıkışını ikinci elemanın girişi yap; daha ilk yansımada merceğin renk kuralını uygulama.",
    ),
    section(
      "Çizim ile hesabı birlikte denetle",
      "Cismin ucundan biri paralel, biri merkezden geçen iki ışın çiz. Gerçek kesişim çıkıştaysa sürekli çizgiler görüntü ucunda buluşmalı; sanalda çıkış ışınlarının geriye uzatıldığı kesik çizgiler cismin tarafında buluşmalıdır. h'=mh ile çizilen boyun ve yönün formülle aynı olduğuna bak.",
      "u=f için sonlu ok çizilmez; indis eşleşmesinde ise merceğin kırma etkisi yoktur. Bunlar farklı iki durumdur: birinde güçlü mercekten paralel çıkan demet, diğerinde indis farkı olmayan doğrusal yol bulunur. Model yalnız paraksiyal ince mercek ve aynı çevre ortamı koşulunu içerir; soğurma, küresel sapma ve gerçek lens kaplamaları hesaplanmaz.",
    ),
  ],
  examples: [
    example(
      "İnce mercekte gerçek görüntü",
      "Yakınsak mercekte f=15 cm, u=45 cm, h=6 cm. v ve görüntü boyu?",
      "Aynı ince mercek işaretleriyle konumu hesapla.",
      [
        ["Uzaklık", "v=fu/(u−f).", "v=15·45/30=22,5 cm"],
        ["Büyütme", "Yönü eksi işaretle koru.", "m=−22,5/45=−0,5"],
        ["Boy", "İşaretli yükseklik yönü verir.", "h'=−3 cm"],
      ],
      "Çıkışta 22,5 cm; ters, 3 cm.",
      "f<v<2f; küçük ters görüntü u>2f ile uyumlu.",
      "Merceğin gerçek görüntüsünü giriş tarafına koyma.",
    ),
    example(
      "Büyüteç bölgesi",
      "Yakınsak mercekte f=12 cm, u=8 cm. v ve m?",
      "Cisim odak içindedir; sonucu sanal bekle.",
      [
        ["Payda", "u−f=−4 cm.", "v=12·8/(−4)=−24 cm"],
        ["Büyütme", "Sanal görüntüde m pozitiftir.", "m=−(−24)/8=3"],
        ["Konum", "Negatif v giriş tarafını gösterir.", "Sanal, düz, 3 kat"],
      ],
      "Cismin tarafında 24 cm; 3 kat.",
      "Kesik geri uzantılar doğru tarafta birleşir.",
      "Sanal görüntünün sonlu hesaplanamayacağını sanma; odak sınırı ayrı durumdur.",
    ),
    example(
      "Ortam davranışı tersine çeviriyor",
      "Simetrik bikonveks ince mercek: n_m=1,5, R=10 cm. Ortam n_o=1,6. Optik güç 1/f ve f?",
      "Bağıl indis farkının işaretini önce bul.",
      [
        ["Bağıl fark", "1,5/1,6−1=−1/16.", "−0,0625"],
        [
          "Eğrilik",
          "İki yüzeyin çarpanı 2/R.",
          "1/f=(−1/16)·(2/10)=−1/80 cm⁻¹",
        ],
        ["Odak", "Tersi negatif kalır.", "f=−80 cm"],
      ],
      "Iraksak davranış; f=−80 cm.",
      "Biçim ince kenarlı kalır; negatif olan optik güçtür.",
      "Mercek n’sini dış ortam n’si yerine koyarak oranı ters kurma.",
    ),
    example(
      "Aynı indis, sıfır optik güç",
      "İdeal ince mercek ve çevresi için n_m=n_o=1,5. Eğrilikler sonlu. Bu modelde odak etkisi?",
      "İndis oranını mercek yapıcı çarpanına koy.",
      [
        ["Oran", "İki indis eşit.", "n_m/n_o−1=0"],
        ["Güç", "Eğrilik sonluysa çarpım sıfır.", "1/f=0"],
        ["Yol", "Ayrı kırıcı etki yoktur.", "Işınlar doğrusal devam eder"],
      ],
      "Sıfır optik güç; ayrı sonlu odak yok.",
      "Bu, u=f sınırındaki paralel çıkan güçlü mercek düzeni değildir.",
      "Sıfır güç ile f=0’ı karıştırma.",
    ),
  ],
  recall: [
    {
      prompt: "Sanal mercek görüntüsü hangi tarafta?",
      answer:
        "Gerçek giriş cismiyle aynı tarafta; v<0 ve geri uzantılar kesişir.",
    },
    {
      prompt: "İnce kenar her ortamda yakınsak mı?",
      answer:
        "Hayır; biçim yanında mercek/ortam bağıl indisi davranışı belirler.",
    },
    {
      prompt: "u=f ile n_m=n_o neden farklı?",
      answer:
        "İlkinde mercek güçlüdür ve çıkan demet paraleldir; ikincisinde ideal optik güç sıfırdır.",
    },
    {
      prompt: "u=2f için yakınsak mercek görüntüsü?",
      answer: "Çıkışta 2f; gerçek, ters, eş boylu, m=−1.",
    },
  ],
  questions: [
    [
      "Yakınsak ince mercekte f=10 cm, u=30 cm. v? Gerçek görüntü çıkış tarafında pozitif alınıyor.",
      [
        "15 cm çıkış tarafında",
        "15 cm giriş tarafında",
        "30 cm çıkış tarafında",
        "5 cm giriş tarafında",
        "Sonlu görüntü yok",
      ],
      "v=fu/(u−f) ve u>2f.",
      "v=300/20=15 cm>0. Çıkışta f ile 2f arasında gerçek görüntü vardır.",
    ],
    [
      "Yakınsak ince mercekte f=10 cm, u=20 cm, h=4 cm. Görüntü?",
      [
        "Çıkışta 20 cm; ters, 4 cm",
        "Girişte 20 cm; düz, 4 cm",
        "Çıkışta 10 cm; ters, 2 cm",
        "Girişte 10 cm; düz, 8 cm",
        "Sonlu görüntü yok",
      ],
      "u=2f özel durumunu denkleme koy.",
      "v=20 cm, m=−1. Görüntü gerçektir ve 4 cm boyunu ters yönde gösterir.",
    ],
    [
      "Yakınsak ince mercekte f=12 cm, u=8 cm. İşaretli büyütme?",
      ["3", "−3", "1/3", "−1/3", "1"],
      "v=96/(−4), m=−v/u.",
      "v=−24 cm ve m=3. Sanal, düz, büyük görüntüdür; eksi v ters görüntü demek değildir.",
    ],
    [
      "Iraksak ince mercekte f=−10 cm, u=20 cm. Görüntüye ilişkin doğru ifade?",
      [
        "Giriş tarafında 20/3 cm; düz, küçük",
        "Çıkış tarafında 20/3 cm; ters, büyük",
        "Giriş tarafında 20 cm; düz, eş boylu",
        "Çıkışta sonsuzda",
        "Giriş tarafında 10 cm; ters",
      ],
      "f’nin negatif işaretini koru.",
      "v=−200/30=−20/3 cm, m=1/3. Görüntü mercekle giriş odağı arasında sanal, düz ve küçüktür.",
    ],
    [
      "Yakınsak ince merceğin gerçek cismi tam odakta. Hangisi doğru?",
      [
        "Çıkan paraksiyal ışınlar paralel; sonlu görüntü yok",
        "Görüntü mutlaka optik merkezde",
        "v=0 yazılır",
        "Her zaman m=1 olur",
        "Merceğin indisi zorunlu ortamla eşittir",
      ],
      "u=f sınırını sıfır optik güçle karıştırma.",
      "Odak üzerindeki noktanın çıkan demeti paraleldir. Sonlu görüntü konumu atanmaz; merceğin optik gücü sıfır olmak zorunda değildir.",
    ],
    [
      "Simetrik bikonveks mercekte R=10 cm, n_m=1,5, n_o=1. 1/f=(n_m/n_o−1)·2/R veriliyor. f?",
      ["10 cm", "5 cm", "20 cm", "−10 cm", "0 cm"],
      "Önce bağıl indis farkı 0,5 ve eğrilik çarpanı 0,2.",
      "1/f=0,5·0,2=0,1 cm⁻¹; f=10 cm. Birimler cm seçildiği için f de cm’dir.",
    ],
    [
      "Simetrik bikonveks ince mercekte n_m=1,5, n_o=1,6, R=10 cm. 1/f=(n_m/n_o−1)·2/R veriliyor. Merceğin davranışı hangisidir?",
      [
        "f=−80 cm; ıraksak",
        "f=80 cm; yakınsak",
        "f=10 cm; değişmez",
        "f=0; ışık durur",
        "f=−10 cm; yakınsak",
      ],
      "n_m/n_o−1 negatiftir.",
      "1,5/1,6−1=−1/16; 1/f=−1/80 cm⁻¹, f=−80 cm. Şekil değil bağıl kırma etkisinin işareti değişir.",
    ],
    [
      "İdeal ince mercek ve çevresinin indisi eşit. Sonlu eğriliklerle mercek yapıcı formülün sonucu?",
      [
        "Optik güç sıfır; ayrı kırıcı odak etkisi yok",
        "f=0 ve ışık soğurulur",
        "Her zaman f=10 cm",
        "İki indis de sıfır olur",
        "Cisim mutlaka tam odakta",
      ],
      "İndis oranı 1 olduğunda 1 çıkarılınca ne kalır?",
      "1/f çarpanı sıfır olur. İdeal indis eşleşmesinde mercekten ayrı kırıcı güç kalmaz; bu odak uzaklığını 0 yapmak değildir.",
    ],
    [
      "İki yanında aynı saydam ortam bulunan ince mercek modelinde optik merkezden geçen ışın için doğru kural?",
      [
        "Yaklaşık doğrusal devam eder",
        "Her zaman giriş odağına geri döner",
        "Frekansı iki kat olur",
        "Mutlaka soğurulur",
        "Her durumda sanal çizgi olur",
      ],
      "İnce mercek ve aynı dış ortam yaklaşımı belirtilmiştir.",
      "Merkez ışını bu modelde yön değiştirmeden çizilir. Gerçek kalın mercek geometrisi ek koşul gerektirebilir; burada o model kullanılmaz.",
    ],
    [
      "Normal dispersiyonlu camın verilen görünür aralığında mor ışık kırmızıdan daha fazla kırılıyor. Aynı yakınsak mercekte odakların beklenen sırası?",
      [
        "|f_mor|<|f_kırmızı|",
        "|f_mor|>|f_kırmızı|",
        "İkisi her koşulda zorunlu eşit",
        "Mor için odak yok",
        "Kırmızı ışık mercekten geçemez",
      ],
      "Daha güçlü kırma aynı geometride daha kısa odak verebilir.",
      "Verilen normal dispersiyon koşulunda mor ışık daha güçlü toplanır ve odak uzaklığı daha kısadır. Bu, bütün malzemeler/frekanslar için koşulsuz yasa olarak sunulmaz.",
    ],
  ],
};
const prisms: Pack = {
  id: "prizmalar-renkler",
  topic: "detail-137",
  title: "Prizmalar ve renkler: ışığı ayır, süz, yansıt",
  minutes: 75,
  pages: "195–198",
  objectives: [
    "Prizmadaki iki kırılmayı ve normal dispersiyon koşulunu ışın yolu ile ilişkilendir.",
    "RGB ışık birleştirmesini filtre/boya çıkarımıyla karıştırma.",
    "Bir cismin görünümünü kaynak bileşenleri ve yansıtma koşullarıyla birlikte açıkla.",
  ],
  sections: [
    section(
      "Prizma iki arayüzdür",
      "Bir ışık prizmasına giren ışın önce dış ortamdan prizmaya, sonra prizmadan dış ortama geçer. Her yüzeyin normali ayrıdır. İki kırılmanın toplamı, ışının başlangıç doğrultusuna göre sapmasını verir. Yüzeyler paralel olmadığı için paralel levhadaki gibi çıkan ışının mutlaka gelene paralel olması gerekmez.",
      "Bu ünitedeki sayısal prizma, tepe açısı 40°, hava indisi 1 ve verilen iki renk indisiyle tanımlanır. Birinci yüzeyin normalinden ölçülen geliş 30°’dir. Bu sayılar gerçek bir camın ölçülmüş tayf tablosu değildir; açıkça verilen öğretim modelidir. Çizim, yüzeylerin kesiştiği yerleri ve iki ayrı normal açısını korur.",
    ),
    section(
      "Aynı açıyı iki kez kullanma",
      "Prizma içindeki birinci kırılma açısı r₁ ve ikinci yüzeye geliş r₂, uygun üçgen kesitinde A=r₁+r₂ ilişkisini sağlar. Çıkış açısı e ikinci yüzeyin normalinden ölçülür; toplam sapma δ=i+e−A olur. İkinci yüzeyde n_prizma sin r₂=n_dış sin e uygulanır; ilk geliş açısını doğrudan ikinci geliş açısı sayma.",
      "İç geliş kritik açıdan büyükse ikinci yüzeyde tam iç yansıma olabilir. Bu durumda formüle gerçek dış çıkış açısı uydurulmaz. Model verilen geometriyle çıkışın hangi yüzde gerçekleştiğini kontrol eder. Işın yolu tersinir izlenebilir; üçgende kenara değen her çizgi aynı yüzey normalini paylaşmaz.",
    ),
    section(
      "Normal dispersiyon koşulunu açık söyle",
      "Saydam maddenin indisi ışığın frekansına bağlıysa farklı frekanslar farklı yönlere kırılabilir; bu dispersiyondur. Verilen olağan normal dispersiyon aralığında mor için n daha büyükse mor daha fazla, kırmızı daha az sapabilir. Beyaz ışığın farklı frekans bileşenleri bu yolla ayrılır.",
      "Tek frekanslı ışık prizmayla yeni frekanslardan oluşan bir tayfa dönüştürülmez. Prizma ışığın içinde bulunan bileşenleri yönlerine göre ayırır; renklere enerji ekleyip eksik bileşen yaratmaz. Bütün saydam maddelerde her dalga boyu için aynı sıralama var demek yanlış olur. Modelde kırmızı için n=1,5, mor için n=1,6 açıkça verilmiştir.",
    ),
    section(
      "Dik prizmada yansımayı açı belirler",
      "Camdan havaya uygun iç açıda tam yansıma, periskop ve dürbün gibi optik sistemlerde yön değiştirmek için kullanılabilir. İkizkenar dik prizmadaki 45° gelişin tam yansıma verip vermediği, gerçek kritik açıya bağlıdır. Cam-hava için yaklaşık 42° örneği belirli n oranından gelir; bütün camlar ve çevreler için tek sabit değildir. Dik ikizkenar prizmanın kısa yüzüne dik girişte hipotenüse geliş 45° olur. Kritik açı 42° ise ışın hipotenüste yansıyıp diğer kısa yüze dik ulaşır; çıkan doğrultu girişe diktir. Kritik açı 48° olsaydı aynı hipotenüste tam iç yansıma oluşmazdı.",
      "Prizma sıvıya konulunca dış indis artar ve kritik açı büyüyebilir; önceden yansıyan ışın artık geçebilir. Bu yüzden yalnız şekli ikizkenar dik diye her durumda tam yansıma garanti etme. Kedigözü gibi geri yansıtıcılar geometrik yollarla ışığı geldiği yöne yakın geri gönderir; kendi başlarına ışık kaynağı değildir.",
    ),
    section(
      "Işık birleştirmesi toplamsaldır",
      "İdeal üç kanallı RGB modelinde kırmızı ve yeşil ışık birlikte sarı, yeşil ve mavi camgöbeği, kırmızı ve mavi macenta görünümü verir. Üç kanal uygun oranlarla beyaz görünüm oluşturabilir. Hiç kanal yoksa ışık çıkışı yoktur; ekranda siyah olarak gösterilir. Bu, ideal ikili açık/kapalı kanal modelidir; gerçek renk algısının tüm ayrıntısı değildir.",
      "RGB temel kanallarının seçimi, görme ve gösterim modelidir. 'Prizmanın ayıramadığı bütün renkler yalnız üç tanedir' denmez: tek frekanslı sarı ışık da olabilir, kırmızı+yeşil karışımı da sarı algı verebilir. Aynı renk algısı her zaman aynı tayfı kanıtlamaz. Üç kanallı model sürekli tayfı üç gerçek frekansa eksiksiz indirgemez.",
    ),
    section(
      "Filtre bir bileşen yokken onu üretemez",
      "İdeal filtre hangi kanalları geçiriyorsa yalnız gelen ışığın o bileşenleri devam eder. Sarı filtre RGB modelinde kırmızı ve yeşili, mavi filtre yalnız maviyi geçirir. Beyaz ışık önce sarı sonra mavi filtreden geçirilirse ortak kanal kalmaz; ideal çıkış sıfırdır. Sarıdan sonra kırmızı filtre yalnız kırmızıyı bırakır.",
      "Seri filtre işlemi bileşenlerin ortaklığını seçer; iki ayrı ışık kaynağını üst üste toplamakla aynı işlem değildir. Gerçek filtrelerin tayfsal geçirim eğrileri ve zayıf sızıntıları bulunabilir; buradaki 0/1 geçirim idealizasyonu bunları hesaplamaz. Geçmeyen çizgiyi filtreden sonra soluk da olsa devam ettirmek bu ideal modelin anlattığı soğurmayı yanlış gösterir.",
    ),
    section(
      "Boyalı yüzey geçirerek değil yansıtarak görünür",
      "Opak yüzeyin görünümü, üzerine gelen bileşenler ile yansıtma özelliklerinin birlikte sonucudur. İdeal sarı yüzey kırmızı ve yeşili yansıtır; yalnız mavi ışık altında yansıtacak uygun kanal kalmaz ve karanlık görünür. Beyaz yüzey gelen uygun bileşenleri güçlü yansıtabilir; olmayan kırmızıyı kendiliğinden üretmez.",
      "CMY boya karışımı ideal çıkarımsal düşünmeyle açıklanır: sarı+maviye denk görünen pigment adlarını doğrudan RGB ışık toplamı gibi ele alma. İdeal camgöbeği ve sarı pigment ortak yeşili bırakır; gerçek boyada pigment, aydınlatma ve yüzey koşulları sonucu etkiler. Beyaz ışık önce camgöbeği filtreden, sonra sarı opak yüzeye giderse ilk aşamada yeşil ve mavi geçer; yüzey bunlardan yalnız yeşili göze yollar. Bu iki basamakta önce geçirme, sonra yansıtma vardır; ikisinin aynı ortak kanal hesabını kullanması ışığın aynı doğrultuda devam ettiği anlamına gelmez. Okyanusun maviliğini yalnız mavi yansıtmasına indirgemek yerine soğurma/saçılma ve gözlem koşullarını düşünmek gerekir; bu atölye gerçek denizi modellemez.",
    ),
    section(
      "Üç soruyu sıraya koy",
      "Önce 'kaynakta hangi ışık var?', sonra 'hangi işlem uygulanıyor?', sonra 'göze veya algılayıcıya ne ulaşıyor?' diye sor. Prizma yönleri ayırır, ideal filtre geçişi seçer, opak yüzey yansımayı seçer, bağımsız ışık kaynakları ise bileşenleri birleştirir. İşlemi adlandırmadan yalnız renk adı ezberlemek çelişen cevaplar üretir.",
      "Atölyede her bileşenin yolu ayrı çizilir ve metinde adları listelenir; renk görmeye gerek kalmadan hangi kanalın durduğu anlaşılır. Sürekli çizgi gerçek aktarılan ışık içindir; çıkışta 0 kanal varsa yeni ışın çizilmez. Sıfır/sonlu kanal sayımı insan gözünün ölçülmüş parlaklığı veya bütün gerçek filtrelerin mutlak davranışı diye sunulmaz.",
    ),
  ],
  examples: [
    example(
      "İki filtreyi sırayla izle",
      "İdeal RGB modelinde beyaz[1,1,1] ışık sarı[1,1,0], sonra mavi[0,0,1] filtreden geçiyor. Çıkış?",
      "Bileşenleri her basamakta ayrı çarp.",
      [
        ["İlk filtre", "Beyazda üç kanal var.", "[1,1,1]⊙[1,1,0]=[1,1,0]"],
        [
          "İkinci filtre",
          "Mavi kanalı ilk filtreden geçmemişti.",
          "[1,1,0]⊙[0,0,1]=[0,0,0]",
        ],
        ["Yorum", "Ortak kanal yok.", "İdeal çıkış ışığı yok"],
      ],
      "Sıfır çıkış; karanlık.",
      "İkinci filtre eksik mavi bileşeni yeniden yaratamaz.",
      "Sarı ve mavi ışığı toplama işlemiyle seri filtrelemeyi karıştırma.",
    ),
    example(
      "Sarıdan kırmızıya",
      "Aynı beyaz ışık önce sarı, sonra kırmızı ideal filtreden geçiyor. Çıkış?",
      "İlk filtreden kalan kanalları yeniden süz.",
      [
        ["İlk", "Sarı kırmızı ve yeşili geçirir.", "[1,1,0]"],
        ["İkinci", "Kırmızı maskesi[1,0,0].", "[1,1,0]⊙[1,0,0]=[1,0,0]"],
        ["Sonuç", "Tek bileşen sürer.", "Kırmızı"],
      ],
      "Kırmızı ışık.",
      "Her çıkış bileşeni girişte ve iki filtrede de bulunmalıdır.",
      "Filtrenin kendi rengi diye olmayan kanalı ekleme.",
    ),
    example(
      "Yüzey ve aydınlatma",
      "İdeal sarı opak yüzey yalnız mavi ışıkla aydınlatılıyor. Yansıyan RGB bileşenleri?",
      "Işık kaynağı ve yüzey maskesini ayrı yaz.",
      [
        ["Kaynak", "Yalnız mavi vardır.", "[0,0,1]"],
        ["Yüzey", "Sarı kırmızı ve yeşili yansıtır.", "[1,1,0]"],
        ["Yansıma", "Ortak bileşen yoktur.", "[0,0,1]⊙[1,1,0]=[0,0,0]"],
      ],
      "İdeal modelde karanlık görünür.",
      "Yüzey kendi sarı ışığını üretmiyor.",
      "Beyaz ışık altındaki nesne adını bütün aydınlatmalarda aynı sanma.",
    ),
    example(
      "Dik prizmanın sınırı",
      "n_cam=1,5, n_dış=1. Kritik açı≈41,81°. İç yüzeye 45° ile gelen ışın için durum?",
      "İndis yönünü ve kritik açı koşulunu birlikte kontrol et.",
      [
        ["Yön", "Büyük indisten küçük indise.", "1,5>1"],
        ["Açı", "45° kritik değerden büyüktür.", "45°>41,81°"],
        ["Olay", "İdeal düz yüzeyde tam iç yansıma olur.", "Çıkış ışını yok"],
      ],
      "Tam iç yansıma.",
      "Dış indis büyüseydi kritik açı yeniden hesaplanmalıydı.",
      "Bütün dik prizmalar her ortamda tam yansıtır diye genelleme yapma.",
    ),
  ],
  recall: [
    {
      prompt: "Prizma tek renkli ışığa yeni frekanslar ekler mi?",
      answer:
        "Bu doğrusal modelde hayır; varsa bileşenleri farklı yönlere ayırır.",
    },
    {
      prompt: "RGB toplama ile filtre işlemi aynı mı?",
      answer:
        "Hayır. Kaynaklar bileşen ekler; seri filtre yalnız gelen ortak bileşenleri geçirir.",
    },
    {
      prompt: "İdeal sarı yüzey mavi ışıkta?",
      answer:
        "Kırmızı/yeşil kaynakta bulunmadığından yansıtılacak uygun kanal kalmaz; karanlık.",
    },
    {
      prompt: "Camdaki 45° iç geliş her ortamda tam yansıma mı?",
      answer:
        "Hayır. n₁>n₂ ve 45°>i_c koşulları kontrol edilir; kritik açı indis oranına bağlıdır.",
    },
  ],
  questions: [
    [
      "İdeal RGB modelinde kırmızı ve yeşil ışık eş uygun katkıyla aynı noktada birleşiyor. Görünüm?",
      ["Sarı", "Mavi", "Macenta", "Camgöbeği", "Karanlık"],
      "Bu işlem iki bağımsız ışık kanalının toplamıdır.",
      "Kırmızı[1,0,0]+yeşil[0,1,0]→[1,1,0] sarı görünüm verir. Seri filtre veya boya karışımı yapılmıyor.",
    ],
    [
      "İdeal RGB beyaz ışık sarı[1,1,0], sonra mavi[0,0,1] filtreden geçiyor. Çıkış?",
      [
        "Işık yok: [0,0,0]",
        "Beyaz: [1,1,1]",
        "Sarı: [1,1,0]",
        "Mavi: [0,0,1]",
        "Yeşil: [0,1,0]",
      ],
      "İlk filtreden sonraki bileşenlerde mavi var mı?",
      "İlk filtre mavi kanalı durdurur; ikinci yalnız maviyi geçirir. Ortak bileşen olmadığı için ideal çıkış sıfırdır.",
    ],
    [
      "İdeal RGB beyaz ışık sarı, sonra kırmızı filtreden geçiyor. Maskeler [1,1,0] ve [1,0,0]. Çıkış?",
      [
        "Kırmızı: [1,0,0]",
        "Yeşil: [0,1,0]",
        "Sarı: [1,1,0]",
        "Beyaz: [1,1,1]",
        "Karanlık: [0,0,0]",
      ],
      "Her bileşen iki filtreden de geçmeli.",
      "İlk basamak kırmızı ve yeşili bırakır; ikinci yalnız kırmızıyı geçirir. Kırmızı bileşen hem girişte hem iki maskede bulunur.",
    ],
    [
      "İdeal sarı opak yüzey[1,1,0] yalnız mavi[0,0,1] ışık altında. Yansıyan görünüm?",
      ["Karanlık", "Sarı", "Beyaz", "Kırmızı", "Yeşil"],
      "Yüzey kaynaktaki hangi bileşenleri yansıtabilir?",
      "Kırmızı ve yeşil gelen ışıkta yoktur, mavi de bu ideal yüzeyce yansıtılmaz. Göze ulaşan RGB kanalı kalmaz.",
    ],
    [
      "İdeal camgöbeği filtre yeşil ve maviyi geçiriyor. Beyaz ışık bu filtreden, sonra sarı[1,1,0]filtreden geçerse çıkış?",
      ["Yeşil", "Mavi", "Kırmızı", "Macenta", "Beyaz"],
      "[0,1,1]ile[1,1,0]maskelerinin ortak kanalını bul.",
      "İki maskede ortak olan yalnız yeşil kanaldır: [0,1,1]⊙[1,1,0]=[0,1,0]. Bu seri süzmedir.",
    ],
    [
      "Verilen normal dispersiyonlu prizma modelinde n_mor>n_kırmızı. Uygun aynı geliş ve çıkış koşullarında hangisi beklenir?",
      [
        "Mor ışık kırmızıdan daha fazla sapar",
        "Prizma olmayan kırmızı bileşeni üretir",
        "Frekanslar mutlaka eşitlenir",
        "Tek renkli ışık her zaman beyaz olur",
        "Bütün malzemelerde indisler zorunlu aynıdır",
      ],
      "Soruda normal dispersiyon koşulu verilmiştir.",
      "İndisin frekansa bağlı olması farklı sapmaları sağlar. Verilen aralıkta mor daha çok sapar; bu her malzeme/frekans için koşulsuz bir iddia değildir.",
    ],
    [
      "Camdan havaya n₁=1,5, n₂=1; kritik açı 41,81°. Dik prizmanın iç yüzeyine 45° ile gelen ışın?",
      [
        "Tam iç yansıma yapar",
        "Her zaman tamamen karşıya geçer",
        "90° frekans üretir",
        "İndisler eşitlenir",
        "Işık enerjisi iki kat olur",
      ],
      "45° ile kritik değeri ve indis yönünü karşılaştır.",
      "1,5>1 ve 45°>41,81° olduğundan tam iç yansıma koşulu sağlanır. Dış ortam değişirse aynı 45° iç geliş için sonuç yeniden denetlenir.",
    ],
    [
      "Tek frekanslı sarı ışık ile kırmızı+yeşil karışımı sarı algı verebiliyor. Hangi çıkarım doğru?",
      [
        "Aynı renk algısı tek başına aynı tayfı kanıtlamaz",
        "Sarı görünüm her zaman yalnız iki frekanstır",
        "RGB dışındaki bütün tek frekanslar yoktur",
        "Prizma yeni frekans yaratmak zorundadır",
        "Göz rengi yalnız ortamdaki dalga boyuyla tanımlar",
      ],
      "Algılanan renk ile fiziksel bileşen listesini ayır.",
      "Farklı tayflar benzer renk algısı verebilir. RGB kanal modeli görsel bileşim aracıdır; bütün tek frekanslı ışıkları yalnız üç frekansa indirgemez.",
    ],
    [
      "İdeal RGB modelinde yeşil ve mavi ışığın toplamsal birleşimi hangi görünümü verir?",
      ["Camgöbeği", "Sarı", "Kırmızı", "Macenta", "Karanlık"],
      "İki açık kanal[0,1,1]olur.",
      "Yeşil+mavi camgöbeği görünümüdür. Macenta kırmızı+mavi, sarı kırmızı+yeşil kanal birleşimidir.",
    ],
    [
      "İdeal beyaz opak yüzey[1,1,1], yalnız kırmızı[1,0,0]ışıkla aydınlanıyor. Yansıyan ışık?",
      ["Kırmızı", "Beyaz", "Sarı", "Mavi", "Camgöbeği"],
      "Beyaz yüzey olmayan bir kanalı yaratmaz.",
      "Yüzey gelen kırmızıyı yansıtabilir; yeşil/mavi kaynakta yoktur. Bu nedenle yalnız kırmızı görünür, beyaz yüzey adı kendi beyaz ışığını üretmesi demek değildir.",
    ],
  ],
};
const packs = [mirrors, refraction, lenses, prisms];
const sheetNumbers: Record<string, string> = {
  "kuresel-aynalar": "021",
  "isigin-kirilmasi": "022",
  mercekler: "023",
  "prizmalar-renkler": "024",
};
const source = (p: Pack) =>
  `MEBİ TYT Fizik Konu Özetleri, basılı s.${p.pages}; Aurelia TYT Fizik ${sheetNumbers[p.id]} kopya kâğıdı V5, s.1–9. Öğretim ve gerçek şekilleriyle karşılaştırılmış özgün anlatım, model ve sorular. İşaret, açı, renk ve yaklaşım koşulları açıkça belirtilmiştir. Sorular özgündür; resmî ÖSYM sorusu veya bütün arşiv değildir.`;
export const forge014PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge014PhysicsGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: source(p),
}));
export const forge014PhysicsLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "tyt-fizik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  tags: [p.topic, p.id],
  source: txt(source(p)),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: p.questions.map(([prompt, options, hint, explanation], i) => {
    const k = (i * 2 + 1) % 5;
    return {
      id: `${p.id}-q${i + 1}`,
      prompt: txt(prompt),
      options: options.map((_, j) => txt(options[(j - k + 5) % 5])),
      answer: k,
      hint: txt(hint),
      explanation: txt(explanation),
      skill: p.id,
    };
  }),
}));
const EPS = 1e-10;
const positive = (...v: number[]) => {
  if (!v.every((x) => Number.isFinite(x) && x > 0))
    throw new RangeError("Pozitif sonlu model değerleri gerekir.");
};
export type OpticalImage = {
  kind: "real" | "virtual" | "infinity";
  distance: number | null;
  magnification: number | null;
  height: number | null;
};
export function opticalImage(
  focal: number,
  objectDistance: number,
  height = 1,
): OpticalImage {
  positive(objectDistance, height);
  if (!Number.isFinite(focal) || focal === 0)
    throw new RangeError("Sonlu,sıfır olmayan odak gerekir.");
  if (
    Math.abs(objectDistance - focal) <=
    EPS * Math.max(1, objectDistance, Math.abs(focal))
  )
    return {
      kind: "infinity",
      distance: null,
      magnification: null,
      height: null,
    };
  const distance = (focal * objectDistance) / (objectDistance - focal),
    magnification = -distance / objectDistance;
  return {
    kind: distance > 0 ? "real" : "virtual",
    distance,
    magnification,
    height: magnification * height,
  };
}
export type Point = { x: number; y: number };
export type OpticalRay = { start: Point; direction: Point };
export function opticalRays(
  device: "mirror" | "lens",
  focal: number,
  u: number,
  h = 1,
) {
  if (!["mirror", "lens"].includes(device))
    throw new RangeError("Geçerli optik düzenek gerekir.");
  const image = opticalImage(focal, u, h),
    sign = device === "mirror" ? -1 : 1;
  return {
    object: { x: -u, y: h },
    parallelHit: { x: 0, y: h },
    centralHit: { x: 0, y: 0 },
    parallel: { start: { x: 0, y: h }, direction: { x: sign, y: -h / focal } },
    central: { start: { x: 0, y: 0 }, direction: { x: sign, y: -h / u } },
    imagePoint:
      image.distance === null
        ? null
        : {
            x: (device === "mirror" ? -1 : 1) * image.distance,
            y: image.height!,
          },
    image,
  };
}
export type LensShape = "convex" | "concave";
export function lensPower(
  shape: LensShape,
  nLens: number,
  nMedium: number,
  radius: number,
) {
  positive(nLens, nMedium, radius);
  if (!["convex", "concave"].includes(shape))
    throw new RangeError("Geçerli mercek biçimi gerekir.");
  const power =
    ((nLens / nMedium - 1) * (shape === "convex" ? 2 : -2)) / radius;
  return {
    power,
    focal: Math.abs(power) < EPS ? null : 1 / power,
    behavior:
      Math.abs(power) < EPS
        ? "neutral"
        : power > 0
          ? "converging"
          : "diverging",
  } as const;
}
export function snellState(
  n1: number,
  n2: number,
  incidence: number,
  lambdaVacuum = 600,
) {
  positive(n1, n2, lambdaVacuum);
  if (!Number.isFinite(incidence) || incidence < 0 || incidence >= 90)
    throw new RangeError("Gelme açısı0dahil90hariç aralıkta olmalı.");
  const sine = (n1 * Math.sin((incidence * Math.PI) / 180)) / n2,
    criticalAngle = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null;
  const kind =
    sine > 1 + EPS
      ? "total"
      : Math.abs(sine - 1) <= EPS
        ? "critical"
        : "transmitted";
  return {
    kind,
    angle:
      kind === "total"
        ? null
        : (Math.asin(Math.min(1, Math.max(0, sine))) * 180) / Math.PI,
    criticalAngle,
    speed1: 3e8 / n1,
    speed2: 3e8 / n2,
    frequency: 3e8 / (lambdaVacuum * 1e-9),
    lambda1: lambdaVacuum / n1,
    lambda2: kind === "total" ? null : lambdaVacuum / n2,
  };
}
export type RGB = readonly [number, number, number];
export const channelMasks = {
  none: [1, 1, 1],
  red: [1, 0, 0],
  green: [0, 1, 0],
  blue: [0, 0, 1],
  yellow: [1, 1, 0],
  cyan: [0, 1, 1],
  magenta: [1, 0, 1],
  black: [0, 0, 0],
} as const;
export type MaskName = keyof typeof channelMasks;
function validRGB(a: RGB) {
  if (a.length !== 3 || !a.every((v) => v === 0 || v === 1))
    throw new RangeError("Bu modelde üç ikili RGB kanalı gerekir.");
}
export function filterChannels(input: RGB, first: RGB, second: RGB) {
  validRGB(input);
  validRGB(first);
  validRGB(second);
  const afterFirst = input.map((v, i) => v * first[i]) as [
      number,
      number,
      number,
    ],
    output = afterFirst.map((v, i) => v * second[i]) as [
      number,
      number,
      number,
    ];
  return { afterFirst, output };
}
export function reflectedChannels(input: RGB, surface: RGB) {
  return filterChannels(input, surface, channelMasks.none).output;
}
export function rgbName(rgb: RGB) {
  validRGB(rgb);
  return (
    {
      "000": "Işık yok",
      "100": "Kırmızı",
      "010": "Yeşil",
      "001": "Mavi",
      "110": "Sarı",
      "011": "Camgöbeği",
      "101": "Macenta",
      "111": "Beyaz",
    } as Record<string, string>
  )[rgb.join("")];
}
export function prismState(index: number, apex = 40, incidence = 30) {
  positive(index);
  if (
    !Number.isFinite(apex) ||
    apex <= 0 ||
    apex >= 90 ||
    !Number.isFinite(incidence) ||
    incidence < 0 ||
    incidence >= 90
  )
    throw new RangeError("Geçerli prizma ve gelme açıları gerekir.");
  const rad = Math.PI / 180,
    b = Math.tan((apex * rad) / 2),
    r1 = Math.asin(Math.sin(incidence * rad) / index) / rad;
  if (!Number.isFinite(r1) || r1 < 0 || r1 > apex)
    throw new RangeError(
      "Bu prizma modelinde ikinci yüze içeriden ulaşan koşul gerekir.",
    );
  const r2 = apex - r1,
    thetaInside = (r1 - apex / 2) * rad,
    entry = { x: -b / 2, y: 0.5 },
    dir = { x: Math.cos(thetaInside), y: Math.sin(thetaInside) },
    t = b / (dir.x + b * dir.y),
    exit = { x: entry.x + t * dir.x, y: entry.y + t * dir.y };
  if (exit.y < -EPS || exit.y > 1 + EPS)
    throw new RangeError("Işın ikinci eğik yüz yerine tabana ulaşıyor.");
  const sine = index * Math.sin(r2 * rad),
    total = sine > 1 + EPS,
    exitAngle = total ? null : Math.asin(Math.min(1, sine)) / rad,
    deviation = exitAngle === null ? null : incidence + exitAngle - apex;
  return {
    entry,
    exit,
    halfBase: b,
    insideAngle: r1,
    secondIncidence: r2,
    exitAngle,
    deviation,
    total,
    incomingDirection: {
      x: Math.cos((incidence - apex / 2) * rad),
      y: Math.sin((incidence - apex / 2) * rad),
    },
    outgoingDirection:
      exitAngle === null
        ? null
        : {
            x: Math.cos((apex / 2 - exitAngle) * rad),
            y: Math.sin((apex / 2 - exitAngle) * rad),
          },
    entryNormal: {
      x: Math.cos((-apex * rad) / 2),
      y: Math.sin((-apex * rad) / 2),
    },
    exitNormal: {
      x: Math.cos((apex * rad) / 2),
      y: Math.sin((apex * rad) / 2),
    },
  };
}
