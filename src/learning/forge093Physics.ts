import { txt, type Lesson } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

type QSpec = [string, string[], number, string, string];
type Pack = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  source: string;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  questions: QSpec[];
};
const section = (title: string, ...paragraphs: string[]): GuideSection => ({
  title,
  paragraphs,
});
const example = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string?][],
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
const reference = (pages: string, paper: string) =>
  `MEBİ TYT Fizik Konu Özetleri, basılı s.${pages}; Aurelia TYT Fizik ${paper} kopya kağıdı ile karşılaştırılmış özgün öğretim, şekiller ve alıştırmalar. Basılı sayfalar ve ilgili şekiller incelendi; sorular resmî ÖSYM sorusu değildir. Bu ders bütün sınav arşivinin tamamlandığı anlamına gelmez.`;

const expansion: Pack = {
  id: "genlesme",
  topic: "detail-120",
  title: "Genleşme",
  minutes: 48,
  source: reference("80–86", "007 Genleşme"),
  objectives: [
    "Sıcaklık değişimiyle boyut değişimini koşullarıyla ilişkilendir.",
    "Çubuk, delik, alan, hacim ve sıvı–kap hesaplarını ayır.",
    "Bimetal, kısıtlı ray ve suyun 0–4 °C davranışını gerekçeyle açıkla.",
  ],
  sections: [
    section(
      "Isınan taneciği değil, tanecikler arası düzeni büyüt",
      "Genleşme, sıcaklık değiştiğinde cismin boyutlarının değişmesidir. Normal genleşme gösteren bir maddede ısınma, taneciklerin hareketiyle birlikte ortalama aralıkların artmasına yol açabilir. Taneciklerin kendisi birer balon gibi şişmez; maddenin kütlesi ve tanecik sayısı yalnız genleştiği için artmaz. Soğumada çoğunlukla büzülme görülür; suyun özel aralığı gibi istisnalar vardır.",
      "Bir cismin son sıcaklığının yüksek olması, diğerinden daha çok genleştiğini tek başına göstermez. Başlangıç boyutu, sıcaklık değişimi ve malzeme gerekir. ΔT=Tson−Tilk yaz; aynı sayısal sıcaklık farkı °C veya K ile ifade edilebilir. Genleşme katsayısı belirtilen aralıkta yaklaşık sabit kabul edilir. Serbest ve her yerinden aynı sıcaklıkta ısınan örnek ile iki uçtan sıkıştırılmış ray aynı mekanik problem değildir.",
    ),
    section(
      "Boyca değişimde önce ilk uzunluğu seç",
      "İnce bir çubuk veya tel için doğrusal yaklaşım ΔL=αL0ΔT, son boy ise L=L0+ΔL=L0(1+αΔT) olur. α’nın birimi °C⁻¹ veya K⁻¹’dir; L0 metre ise ΔL metre çıkar. Isıtma için ΔT pozitif, soğutma için negatif seçilir. Negatif ΔL cismin boyunun negatif olduğunu değil, boy değişiminin kısalma olduğunu gösterir.",
      "Aynı α ve aynı ΔT için ilk boyu iki kat büyük çubuğun mutlak uzaması iki kattır, fakat ΔL/L0 oranları aynıdır. Bu yüzden ‘büyük cisim daha fazla genleşir’ cümlesinde mutlak değişim ile bağıl değişimi ayır. Bir çubuğun α değerini deneyden bulmak için α=ΔL/(L0ΔT) kullanılır; milimetreyi metreyle aynı kesirde karıştırma. Çok büyük sıcaklık aralıklarında sabit α ve küçük değişim yaklaşımı yetersiz kalabilir.",
    ),
    section(
      "Delik de şeklin bir uzunluğudur",
      "Serbest, homojen ve izotrop bir metal levha düzgün ısıtılırsa bütün doğrusal boyutlar yaklaşık aynı oranla ölçeklenir. İçindeki deliği aynı malzemeden hayalî bir parçayla doldur: parça nasıl genişleyecekse deliğin sınırı da öyle yer değiştirir. İç çap ve dış çap birlikte büyür. ‘Metal deliğe doğru şişer ve deliği kapatır’ yorumu bu koşullardaki serbest genleşme modeline uymaz.",
      "Delik çapı veya yarıçapı bir uzunluk olduğundan α kullanılır; deliğin alanı sorulursa alan katsayısı gerekir. Benzerlik korunuyorsa açılar değişmez, yalnız uzunluklar ölçeklenir. Çevreye sabitlenmiş, farklı sıcaklıklarda ısınan veya başka malzemeyle zorlanan bir levhaya bu sonucu koşulsuz uygulama. Halka-küre deneyinde yalnız küre ısıtılırsa geçiş zorlaşabilir; yalnız halka ısıtılırsa deliğin büyümesi geçişi kolaylaştırabilir.",
    ),
    section(
      "Alan ve hacimde boyut sayısını unutma",
      "İzotrop bir katıda iki boyut birlikte değiştiğinden küçük genleşmeler için ΔA≈2αA0ΔT, üç boyutta ΔV≈3αV0ΔT kullanılır. Yüzeysel katsayı β≈2α, hacimsel katsayı γ≈3α’dır. Eğer soru doğrudan β veya γ vermişse onu kullan; bir daha iki veya üçle çarpma. ‘Katsayı’ sözcüğü tek başına hangi boyuta ait olduğunu söylemez.",
      "Bu yaklaşık ilişkiler (1+αΔT)² ve (1+αΔT)³ ifadelerindeki yüksek dereceli küçük terimlerin ihmalinden doğar. Kütle sabitse yoğunluk ρ=m/V olduğundan hacim artınca yoğunluk azalır. Genleşme maddenin miktarını üretmez. Farklı doğrultularda farklı genleşen kristaller için izotrop varsayımı geçerli olmayabilir; sınavdaki model koşullarını oku.",
    ),
    section(
      "Sıvının gerçek artışı ile görünen artışı ayır",
      "Bir sıvı ısıtıldığında kabı da genişliyorsa, sıvının kendi hacim artışı ile kabın iç hacim artışı yarışır. Aynı ilk hacim V0 için küçük değişim yaklaşımında ΔVgör≈(γsıvı−γkap)V0ΔT olur. Ağzına kadar dolu kapta uygun koşullarda taşan miktar bu pozitif farktır; yalnız γsıvıV0ΔT yazmak kap genleşmesini yok sayar.",
      "γkap daha büyükse sıvı ısınsa bile seviye düşebilir; bu gözlem tek başına sıvının büzüldüğünü kanıtlamaz. Termometrede de seviye değişimi sıvı ile camın birlikte davranışına bağlıdır. Bu modelde buharlaşma, sızıntı, basınç değişimi ve hâl değişimi ihmal edilir. Kap başlangıçta tam dolu değilse taşma sorusunda önce boş hacmin de kapanması gerekir.",
    ),
    section(
      "Su 0–4 °C arasında farklı davranır",
      "Normal basınçta sıvı su 0 °C’den yaklaşık 4 °C’ye ısıtılırken hacmi azalır, yoğunluğu artar. Yaklaşık 4 °C’de yoğunluğu en büyük, aynı kütlenin hacmi en küçüktür. 4 °C’nin üzerinde olağan aralıkta ısınırken hacim artışı baskındır. Dolayısıyla 2 °C’den 3 °C’ye ısıtılan su için ‘ısındı, hacmi arttı’ sonucu yanlıştır.",
      "Bir göl soğurken 4 °C’ye yaklaşan daha yoğun suyun aşağı inmesi, daha soğuk suyun yüzeye yakın kalması ve buzun su üzerinde yüzmesi canlıların kış koşullarını anlamaya yardım eder. Sıvının 0–4 °C anomalisi ile donarken hacminin artması ayrı fakat ilişkili gözlemlerdir. Bir su hacmi sorusunda sıcaklık aralığını çizgi üzerinde işaretle; 0–4 sınırı geçiliyorsa tek bir pozitif sabit γ ile her aralığı açıklamaya çalışma.",
    ),
    section(
      "Bimetalde büyük katsayı dış yayda kalır",
      "Birbirine sıkıca bağlı iki metal aynı miktarda serbest uzayamaz; uzunluk uyuşmazlığı şeridi büker. αA>αB olan iki metal ısıtıldığında A daha fazla uzamak ister ve eğrinin dış, daha uzun tarafında kalır. Şerit küçük α’lı B tarafına doğru eğilir. Soğutmada A daha fazla kısalmak ister; yön tersine döner.",
      "Bu davranış termostatlarda sıcaklığa bağlı bir kontağın açılıp kapanmasında kullanılabilir. Her termostatın aynı yönde çalışan aynı devre olduğunu düşünme; bağlantı geometrisi verilmelidir. Genleşme bir devreyi belirli sıcaklıkta açacak şekilde tasarlanabilir, fakat temas sıcaklığı yalnız α’dan bulunmaz. Şerit kalınlığı, boyu, esnekliği ve ilk boşluk da gerekir.",
    ),
    section(
      "Boşluk, kısıtlama ve gaz koşullarını kontrol et",
      "Bir köprü veya ray serbest uzayabilseydi αL0ΔT kadar boy değiştirirdi. Uçlar hareketi engelliyorsa gerçek uzama aynı olmayabilir; termal gerilme ve eğilme oluşabilir. Tasarım boşluğu, yalnız bir ucu sabit çubuğun serbest ucu boşluğa ilerliyorsa ilk boşluktan uzama çıkarılarak hesaplanabilir. Birbirine doğru uzayan iki farklı çubukta iki uzama da hesaba katılır.",
      "Gazlarda hacim değişimini konuşurken basınç, madde miktarı ve kabın hareket edebilirliği belirtilmelidir. Sabit basınçlı ideal gazda V/T sabittir ve T kelvin kullanılır; bu ilişki bir katının αL0ΔT bağıntısının kopyası değildir. Rijit kapta hacim değişmeyebilir, ısıtma basıncı artırabilir. Önce ‘ne serbest, ne sabit?’ sorusunu çözmek, aynı formülü her şekle uygulama hatasını engeller.",
    ),
  ],
  examples: [
    example(
      "Metre hesabından milimetre sonucuna",
      "Serbest 2,5 m çubuk 20 °C’den 60 °C’ye ısıtılıyor. α=20×10⁻⁶ °C⁻¹ sabit. Uzama ve son boy nedir?",
      "ΔT’yi bul, ilk boyla çarp ve en son birimi dönüştür.",
      [
        ["Değişim", "Son eksi ilk sıcaklık kullanılır.", "ΔT=60−20=40 °C"],
        [
          "Uzama",
          "α’nın °C⁻¹ birimi sıcaklık farkıyla sadeleşir.",
          "ΔL=20×10⁻⁶·2,5·40=0,002 m",
        ],
        [
          "Son boy",
          "Değişim ile toplam uzunluk ayrı sonuçlardır.",
          "ΔL=2 mm; L=2,502 m",
        ],
      ],
      "Uzama 2 mm, son boy 2,502 m.",
      "Bağıl uzama 0,002/2,5=0,0008; küçük değişim yaklaşımıyla uyumludur.",
      "60’ı doğrudan ΔT almak veya 2 mm’yi son boy sanmak yanlıştır.",
    ),
    example(
      "Isınan deliğin çapı",
      "Çapı 20,00 mm olan delikli izotrop levha serbestçe 100 °C ısınıyor. α=15×10⁻⁶ °C⁻¹ sabit. Son delik çapı?",
      "Deliği hayalî malzemeyle doldur; çapın da bir doğrusal boyut olduğunu kullan.",
      [
        [
          "Ölçek",
          "Bütün doğrusal boyutlar aynı çarpanla değişir.",
          "1+αΔT=1,0015",
        ],
        [
          "Çap",
          "Çap için alan katsayısı kullanılmaz.",
          "d=20,00·1,0015=20,03 mm",
        ],
        [
          "Yön kontrolü",
          "Isıtma ve pozitif α altında delik büyümelidir.",
          "Δd=+0,03 mm",
        ],
      ],
      "Son çap 20,03 mm’dir.",
      "İç çap ve dış boyutlar aynı bağıl artış gösterir.",
      "Deliğin kapanacağını veya çapta 2α gerektiğini düşünme.",
    ),
    example(
      "Sıvı ile kabı birlikte say",
      "500 cm³ sıvıyla tamamen dolu kap 50 °C ısınıyor. γsıvı=8×10⁻⁴, γkap=2×10⁻⁵ °C⁻¹ sabit; buharlaşma ve kayıp yok. Taşan hacim?",
      "İki hacim artışını ayrı hesapla, sonra farkını al.",
      [
        [
          "Sıvı",
          "Sıvının serbest hacim artışı ilk hacim üzerinden bulunur.",
          "ΔVs=500·0,0008·50=20 cm³",
        ],
        [
          "Kap",
          "Kapta yeni açılan hacim taşmayı azaltır.",
          "ΔVk=500·0,00002·50=0,5 cm³",
        ],
        [
          "Fark",
          "Kap başlangıçta tam doludur ve fark pozitiftir.",
          "Vtaşan=20−0,5=19,5 cm³",
        ],
      ],
      "Yaklaşık 19,5 cm³ taşar.",
      "Katsayı farkı 0,00078 ile doğrudan hesap da 19,5 verir.",
      "20 cm³ yanıtı, kabın da genişlediğini yok sayar.",
    ),
    example(
      "Ray boşluğu kapanır mı?",
      "Bir ucu sabit 10 m çubuğun öteki ucu sabit duvardan 6 mm uzakta. Çubuk serbest ucuna doğru genleşebiliyor. α=12×10⁻⁶ °C⁻¹; sıcaklık 40 °C artıyor. Duvara temas eder mi?",
      "Önce serbest uzamayı bul, yalnız bu uzamayı boşluktan çıkar.",
      [
        [
          "Serbest uzama",
          "Çubuğun yalnız bir ucu sabit olduğundan diğer uç tam ΔL kadar ilerler.",
          "ΔL=10·12×10⁻⁶·40=0,0048 m",
        ],
        [
          "Birim",
          "Boşluk milimetre olduğundan uzamayı aynı birime çevir.",
          "ΔL=4,8 mm",
        ],
        [
          "Boşluk",
          "Duvar yer değiştirmiyor ve 4,8 mm, 6 mm’den küçük.",
          "gson=6−4,8=1,2 mm",
        ],
      ],
      "Temas etmez; 1,2 mm boşluk kalır.",
      "Sıfır veya negatif tahmin çıksaydı serbest uzama modeli temas sonrasında tek başına yeterli olmayacaktı.",
      "İki uç sabitlenmiş durumla karıştırıp aynı gerçek uzamayı dayatma.",
    ),
  ],
  recall: [
    {
      prompt:
        "Aynı metalin iki kat uzun çubuğunda mutlak ve bağıl uzama nasıl değişir?",
      answer: "Aynı ΔT’de mutlak ΔL iki kat, ΔL/L0 aynı olur.",
    },
    {
      prompt: "Serbest metal halkayı ısıtınca delik neden küçülmez?",
      answer:
        "Hayalî dolgu dâhil bütün şekil aynı doğrusal çarpanla büyür; iç çap da büyür.",
    },
    {
      prompt: "Bimetalde αA>αB ise ısıtılınca hangi tarafa eğilir?",
      answer:
        "A uzun dış yayda kalır; şerit küçük α’lı B tarafına eğilir. Soğutmada yön tersine döner.",
    },
    {
      prompt:
        "2 °C su 4 °C’ye ısınırken ve dolu kapta sıvı ısınırken hangi tuzaklar vardır?",
      answer:
        "Su bu aralıkta hacmini küçültür, yoğunluğunu artırır. Dolu kapta görünen artışta sıvı kadar kabın genleşmesini de çıkarırsın.",
    },
  ],
  questions: [
    [
      "Serbest 2 m çubuk 20 °C’den 70 °C’ye ısınıyor. α=20×10⁻⁶ °C⁻¹ sabit. Uzama kaç mm?",
      ["0,2", "1", "2", "20", "2000"],
      2,
      "ΔT’yi ve metre–milimetre dönüşümünü ayrı yaz.",
      "ΔT=50 °C. ΔL=20×10⁻⁶·2·50=0,002 m=2 mm. Son sıcaklığın kendisi değil farkı kullanılır. 0,002 değerini mm sanmak veya metreyi binle çarpmayı unutmak yanlış ölçek verir.",
    ],
    [
      "Homojen izotrop bir metal levha, hiçbir yerinden kısıtlanmadan düzgün ısıtılıyor. Levhadaki dairesel deliğin çapı nasıl değişir? Pozitif α ve küçük değişim kabul ediliyor.",
      [
        "Azalır",
        "Artar",
        "Her koşulda sabit kalır",
        "Yalnız dış çap artar, iç çap sabittir",
        "Delik zorunlu olarak kapanır",
      ],
      1,
      "Deliği aynı metalden hayalî bir parçayla doldur.",
      "Serbest izotrop genleşmede hayalî dolgu da levhayla aynı oranda genişler; dolgunun sınırı deliğin sınırıdır. Bu yüzden iç çap büyür. Malzemenin deliğe doğru birikmesi düşüncesi serbest ve düzgün ısınma koşuluna uymaz.",
    ],
    [
      "İzotrop katıda küçük değişimler için α=10×10⁻⁶ °C⁻¹ veriliyor. A0=2 m² ve ΔT=100 °C. Alan artışı yaklaşık kaç m²’dir?",
      ["0,001", "0,002", "0,004", "0,006", "0,2"],
      2,
      "Alan için yaklaşık β=2α kullan.",
      "ΔA≈2αA0ΔT=2·10×10⁻⁶·2·100=0,004 m². Bir uzunluk için kullanılan α, alan için doğrudan yeterli değildir. 3α hacimsel yaklaşım olur; 0,006 sonucunu bu soruya taşımak boyutları karıştırır.",
    ],
    [
      "Kütlesi sabit bir katının hacmi 100 cm³’ten 102 cm³’e çıkıyor. Son yoğunluğun ilk yoğunluğa oranı nedir?",
      ["102/100", "100/102", "2", "1", "0"],
      1,
      "ρ=m/V yaz; iki durumda aynı m sadeleşir.",
      "ρson/ρilk=(m/102)/(m/100)=100/102. Hacim arttığı için yoğunluk azalmalıdır; oran 1’den küçüktür. Kütle değişmediğinden genleşmeyi madde miktarında artış sanmak ve 102/100 almak yanlıştır.",
    ],
    [
      "Tam dolu 500 cm³ kap ve sıvı 50 °C ısınıyor. γsıvı=8×10⁻⁴ ve γkap=2×10⁻⁵ °C⁻¹. Buharlaşma yok, küçük değişim yaklaşımı geçerli. Taşma yaklaşık kaç cm³?",
      ["0,5", "19,5", "20", "20,5", "195"],
      1,
      "Kapta açılan yeni hacim sıvının artışından düşülür.",
      "Sıvı 20 cm³, kap 0,5 cm³ genişler. Net görünen artış (γsıvı−γkap)V0ΔT=19,5 cm³’tür. 20 kap etkisini atlar; 20,5 kap etkisini yanlış yönde ekler. Kap başlangıçta tam dolu olduğu için pozitif fark taşar.",
    ],
    [
      "Normal basınçta 2 °C’deki sıvı su, kütle ve basınç değişmeden 4 °C’ye ısıtılıyor. Hacmi ve yoğunluğu nasıl değişir?",
      [
        "İkisi de artar",
        "İkisi de azalır",
        "Hacim azalır, yoğunluk artar",
        "Hacim artar, yoğunluk azalır",
        "İkisi de zorunlu sabittir",
      ],
      2,
      "Suyun yaklaşık 4 °C’deki yoğunluk özelliğini düşün.",
      "Su 0–4 °C arasında olağan genleşme kuralının tersine davranır: ısınırken hacmi küçülür. Kütle sabitken m/V artar; yaklaşık 4 °C’de yoğunluk en büyüktür. Her ısınma hacim artışı demek değildir.",
    ],
    [
      "Birbirine sıkıca bağlı A ve B metal şeritleri aynı ilk boyda; αA>αB. Düzgün ısıtılıp serbestçe bükülebiliyorlar. Hangi yorum doğrudur?",
      [
        "A içte kısa yayda kalır",
        "B dışta uzun yayda kalır",
        "Şerit B tarafına eğilir, A dış yayda kalır",
        "Şerit asla eğilmez",
        "Isıtma mutlaka her iki metali kısaltır",
      ],
      2,
      "Daha çok uzamak isteyen metal daha uzun dış yayı oluşturur.",
      "A’nın serbest uzama isteği daha büyüktür. Bağlı şeritte A dış, uzun yayda; B iç, kısa yayda kalır ve şerit B tarafına eğilir. Bu sonuç serbest bükülme için geçerlidir; B’yi dışa koymak genleşme farkını ters yorumlar.",
    ],
    [
      "L0=3 m ve α=10×10⁻⁶ °C⁻¹ olan serbest çubuk 80 °C’den 30 °C’ye soğuyor. İşaretli ΔL kaç mm?",
      ["+1,5", "−1,5", "−15", "+15", "0"],
      1,
      "ΔT son eksi ilktir; soğumada negatiftir.",
      "ΔT=30−80=−50 °C. ΔL=3·10×10⁻⁶·(−50)=−0,0015 m=−1,5 mm. Eksi işaret büzülmedir, negatif son uzunluk değildir. Büyüklüğü 1,5 mm olan kısalma, toplam ilk boydan çıkarılır.",
    ],
    [
      "Bir ucu sabit 10 m çubuğun serbest ucu ile sabit duvar arasında 6 mm boşluk var. α=12×10⁻⁶ °C⁻¹ ve ΔT=40 °C. Başka hareket/kısıt yok. Kalan boşluk kaç mm?",
      ["0", "1,2", "4,8", "6", "10,8"],
      1,
      "Serbest ucun ilerlemesi αL0ΔT’dir.",
      "Çubuk 0,0048 m=4,8 mm uzar. Tek serbest uç bu kadar ilerlediği için 6−4,8=1,2 mm kalır; temas gerçekleşmez. 4,8 uzamadır, kalan boşluk değildir. 10,8, kapanan boşluğa yanlışlıkla uzama ekler.",
    ],
    [
      "Sabit madde miktarlı ideal gazın basıncı sabit tutuluyor. 300 K’de hacmi 10 L. Sıcaklık 330 K olunca hacmi kaç L olur?",
      ["9", "10", "11", "20", "110"],
      2,
      "Sabit basınçta V/T aynı kalır; mutlak sıcaklık kullan.",
      "Vson/Vilk=Tson/Tilk=330/300=1,1; son hacim 11 L. Kelvin oranı gerekir. Katı çubuk için verilen α formülünü doğrudan kullanmak veya Celsius sıcaklıklarını oranlamak bu ideal gaz koşulunun yerine geçmez.",
    ],
  ],
};

const phase: Pack = {
  id: "hal-degisimi",
  topic: "detail-121",
  title: "Hâl değişimi",
  minutes: 55,
  source: reference("67–71", "008 Hâl Değişimi"),
  objectives: [
    "Altı hâl değişimini ve enerji yönünü ayır; buharlaşma ile kaynamayı karşılaştır.",
    "Saf madde grafiğinde mcΔT ve mL basamaklarını kur.",
    "Buz–su karışımında önce enerji yeterliliğini sınayıp son hâli bul.",
    "Basınç, saflık ve net güç koşullarını görünür tut.",
  ],
  sections: [
    section(
      "Geçişin adını başlangıç ve sondan kur",
      "Katıdan sıvıya erime, sıvıdan katıya donma denir. Sıvıdan gaza buharlaşma, gazdan sıvıya yoğuşma; katıdan doğrudan gaza süblimleşme, gazdan doğrudan katıya kırağılaşma olur. Erime, buharlaşma ve süblimleşme enerji almayı; ters geçişler çevreye enerji vermeyi gerektirir. Aynı olayın iki yönünde başlangıç ve son hâli değiştirerek adını kontrol et.",
      "Camda oluşan sıvı damla yoğuşmadır; su buharının doğrudan buz kristaline dönüşmesi kırağılaşmadır. Bir şeyin kayboluyor görünmesi maddenin yok olduğunu göstermez; başka hâle geçebilir. Gazın iyonlaşarak plazmaya dönüşmesi ve yeniden birleşme süreçleri de vardır; plazma yalnız ‘çok sıcak normal gaz’ diye değil, serbest yüklü taşıyıcıları olan bir ortam olarak düşünülür.",
    ),
    section(
      "Enerji varken sıcaklık neden sabit kalabilir?",
      "Sabit basınçta saf bir maddenin iki hâli dengede birlikte bulunurken geçiş sıcaklığı sabit kalabilir. Aktarılan enerji yalnız ortalama hareket enerjisini artırmak yerine taneciklerin düzeni ve etkileşim enerjisini değiştirir. Bu yüzden 0 °C buzun 0 °C suya dönüşmesinde ΔT=0 olsa bile Q sıfır değildir; iç enerji değişir.",
      "Aynı basınçta saf maddenin erime ve donma sıcaklıkları, kaynama ve yoğuşma sıcaklıkları birbirine karşılık gelir. ‘Geçişte sıcaklık hep sabittir’ ifadesini saflık ve basınç koşulları olmadan genelleme: karışımlar bir aralıkta geçiş gösterebilir. Bir grafikte yatay parça varsa saf madde/sabit basınç modelinin verilip verilmediğini denetle; yalnız yatay çizgiden bütün kimlik bilgileri çıkmaz.",
    ),
    section(
      "mL ile mcΔT aynı basamağın formülü değildir",
      "Tek hâlde ve sabit c yaklaşımında sıcaklığı değiştirmek için Q=mcΔT kullanılır. Geçiş sıcaklığında faz değiştirmek için Q=mdeğişenL gerekir. L birim kütlenin geçiş enerjisidir; SI birimi J/kg, sorularda J/g olabilir. Kütle ile L aynı birim sisteminde olmalı; 334 J/g ile 0,1 kg’ı doğrudan çarpma.",
      "mL’deki kütle bütün başlangıç örneği olmak zorunda değildir; yalnız eriyen veya yoğuşan kısmın kütlesidir. Aynı koşullarda erime ve donma için birim kütle başına enerji büyüklüğü eşit, işareti zıttır. ‘Donan su enerji alır’ demek yönü ters çevirir: seçilen su örneği donarken çevreye enerji verir. Bütün ısınma sürecini tek bir c veya tek bir L ile hesaplama.",
    ),
    section(
      "Grafiği beş enerji basamağına ayır",
      "Eksi sıcaklıktaki buzdan sıcak buhara geçişte sırayla buzu erime noktasına ısıtma, eritme, suyu kaynama noktasına ısıtma, buharlaştırma ve buharı ısıtma olabilir. Eğimli parçalarda mcΔT, yatay parçalarda mL yazılır. Aynı m için c veya L değerleri faza ve geçişe göre değişebilir. Toplam enerji bu basamakların toplamıdır; grafikteki Q koordinatları birikimli enerji olabilir, aradaki farkları al.",
      "Düşey T, yatay alınan Q ise eğimli parçada eğim 1/(mc)’dir. Yatay parçanın Q genişliği mL’dir; geniş platonun tek başına büyük L gösterdiğini söylemek için kütlelerin de eşit olması gerekir. Yatay eksen zaman ise enerjiyle orantı kurmak ancak sabit net güçte mümkündür. Görseldeki çizgi sayısı veya bölüm uzunluğu ölçek verilmeden bir ölçüm değildir.",
    ),
    section(
      "Buharlaşma yüzeyde, kaynama bütün sıvıda",
      "Buharlaşma sıvının yüzeyinden farklı sıcaklıklarda gerçekleşebilir. Yüzeyde uygun enerjideki taneciklerin ayrılması, dışarıdan yeterli enerji gelmiyorsa kalan sıvının soğumasına katkı yapar. Sıcaklık, yüzey alanı, ortamın nemi ve hava hareketi buharlaşma hızını etkiler; her deneyde yalnız bir etkeni değiştirerek karşılaştırma yap.",
      "Kaynama, sıvının buhar basıncının dış basınca eşit olabildiği koşullarda sıvı içinde kabarcıkların oluşabildiği geçiştir. Dış basınç azalırsa aynı saf sıvının kaynama sıcaklığı genellikle düşer; bu yüzden ‘su her yerde 100 °C’de kaynar’ denmez. Basınçlı kapta kaynama sıcaklığı yükselebilir. Bütün sıvı aynı anda bir anda gaz olmaz; kaynama süresince sıvı ve buhar birlikte bulunabilir.",
    ),
    section(
      "Önce son hâlin mümkün olup olmadığını sına",
      "Yalıtılmış buz–su karışımında sıcak suyun 0 °C’ye kadar verebileceği enerjiyi hesapla. 0 °C’deki buzun tümünü eritme ihtiyacı mbuzLf ile karşılaştır. Enerji yetersizse buzun bir kısmı kalır ve normal basınçta denge 0 °C’de buz–su karışımı olabilir. Enerji yeterliyse tüm buz erir; artan enerji artık toplam suyu ısıtır.",
      "Buz başlangıçta 0 °C’nin altındaysa önce onu 0 °C’ye getirme enerjisi de gerekir. Bu ihtiyacı yok sayıp doğrudan erimeye atlamak son sıcaklığı yüksek çıkarır. Çok soğuk ve çok miktarda buz bulunan genel problemlerde sıcak suyun bir kısmı donabilir veya denge 0 °C’nin altında kalabilir; bu dersteki karışım kontrolü açıkça 0 °C buz ile 0 °C üstü su için sınırlandırılmıştır. Modelin sınırı, genel fizik yasasının sınırı değildir.",
    ),
    section(
      "Tam erimeden sonra oluşan suyu da ısıt",
      "Tüm buz eriyorsa suyun verdiği enerji; buzun ısınmasına, erimesine ve eriyen suyun son sıcaklığa çıkmasına gider. Başlangıç buzu 0 °C için msucsu(Tsu−Td)=mbuzLf+mbuzcsuTd olur. Buradan Td=(msucsuTsu−mbuzLf)/[(msu+mbuz)csu] çıkar; ancak payın negatif olmaması ve tüm buzun erimesi koşulu önce doğrulanmalıdır.",
      "Pay negatif çıkarsa ‘eksi sıcaklıkta sıvı karışımı buldum’ diye devam etme; tüm buz erir varsayımı yanlıştır. Kap varsa onun enerji terimini ekle; dışarıya kayıp varsa yalnız iki madde arasında Qalan=Qveren yeterli olmaz. Sonucu enerji bilançosuna geri koy, bütün kütlelerin son hâlini ve kalan buz miktarını yaz. Sadece sıcaklık sayısı, karışım probleminin bütün yanıtı değildir.",
    ),
    section(
      "Güç, süre, saflık ve basınçla son kontrol",
      "Sabit güç P ve maddeye aktarılan pay η için Qmadde=ηPt olur; η yüzde verilirse önce ondalığa çevir. Toplam süreyi bulmak için önce bütün enerji basamaklarını topla. Aynı ısıtıcıyla iki örneğin plato sürelerini karşılaştırırken kütle, L, net güç ve kayıp koşullarını birlikte tut. Yalnız uzun süren plato, yalnız büyük L demek değildir.",
      "Erime sıcaklığına basıncın etkisi her madde için aynı yönde değildir. Su gibi erirken hacmi azalan maddelerin davranışı, çoğu normal katıdan farklıdır; ‘basınç bütün erime noktalarını artırır’ genellemesini kullanma. Soru verilen saf maddeye, basınca ve verilmiş c/L değerlerine dayanır. Günlük bir olayı açıklarken önce hangi geçişin olduğunu söyle, sonra enerji yönünü ve sabit kalan/değişen niceliği belirt.",
    ),
  ],
  examples: [
    example(
      "Üç farklı enerji basamağı",
      "25 g saf buz −10 °C’den 20 °C suya dönüştürülecek. Normal basınç, kayıpsız kap; cbuz=2,1 J/(g·°C), Lf=334 J/g, csu=4,2 J/(g·°C). Gereken Q?",
      "Isıtma, erime ve yeniden ısıtmayı ayrı yaz.",
      [
        [
          "Buzu ısıt",
          "Önce buz 0 °C’ye gelir; hâl henüz katıdır.",
          "Q1=25·2,1·10=525 J",
        ],
        [
          "Erit",
          "0 °C’de sıcaklık değişmeden bütün buz erir.",
          "Q2=25·334=8350 J",
        ],
        [
          "Suyu ısıt",
          "Artık 25 g sıvının sıcaklığı 20 derece yükselir.",
          "Q3=25·4,2·20=2100 J",
        ],
      ],
      "Qtoplam=525+8350+2100=10975 J.",
      "Gramlar katsayılarla sadeleşir; üç pozitif enerji toplamı tek erime enerjisinden büyüktür.",
      "Buzu başlangıçtan doğrudan mL ile suya çevirmek ilk 525 J’ü yok sayar.",
    ),
    example(
      "Buzun bir bölümü kalıyor",
      "Yalıtılmış kapta 100 g su 10 °C ile 20 g buz 0 °C karışıyor. csu=4,2 J/(g·°C), Lf=334 J/g, kap ihmal. Son hâl?",
      "Önce enerji yeterliliğini kontrol et; yetmiyorsa sıcaklık formülü kurma.",
      [
        [
          "Suyun sınır enerjisi",
          "Su 0 °C’ye kadar soğuyarak enerji verebilir.",
          "Qsu=100·4,2·10=4200 J",
        ],
        [
          "Tam erime testi",
          "Bütün buz için gereken enerji daha fazladır.",
          "Qtam=20·334=6680 J>4200 J",
        ],
        [
          "Kalan kütle",
          "4200 J yalnız bir kısmı eritir.",
          "meriyen=4200/334≈12,57 g; mkalan≈7,43 g",
        ],
      ],
      "Son sıcaklık 0 °C; yaklaşık 7,43 g buz ve 112,57 g sıvı su vardır.",
      "Son toplam kütle 120 g’dir; enerji mL üzerinden tam olarak 4200 J’ü karşılar.",
      "Tüm buz erir diye kurulan denklem negatif Td verirse varsayımını düzelt.",
    ),
    example(
      "Tam eriyor, karışım yeniden ısınıyor",
      "Yalıtılmış düzende 100 g su 40 °C ile 25 g buz 0 °C karışıyor. Bu soru için csu=4,2 J/(g·°C), Lf=336 J/g; kap ihmal. Son sıcaklık?",
      "Verilen L yaklaşımını kullan; erime sonrasında toplam sıvı kütlesi değişir.",
      [
        [
          "Sınır testi",
          "Suyun verebileceği enerji tüm buzu eritmeye yeter.",
          "Qsu,0=100·4,2·40=16800 J; Qerime=25·336=8400 J",
        ],
        [
          "Kalan enerji",
          "Erimeye giden enerji çıkarıldıktan sonra kalan bütün suyu ısıtır.",
          "Qkalan=16800−8400=8400 J",
        ],
        [
          "Toplam su",
          "Son durumda 125 g sıvı vardır.",
          "Td=8400/(125·4,2)=16 °C",
        ],
      ],
      "Tüm buz erir; 125 g su 16 °C’de dengelenir.",
      "Sıcak su 100·4,2·24=10080 J verir; buzun erimesi 8400 J, yeni suyun ısınması 1680 J; toplam 10080 J.",
      "Kaynakta gördüğün L’yi ezberden değil soruda verilen 336 değerini kullan.",
    ),
    example(
      "Verimli ısıtıcıda süre",
      "0 °C’deki 100 g buz 30 °C su yapılacak. Lf=334 J/g, csu=4,2 J/(g·°C). 500 W ısıtıcının enerjisinin %80’i maddeye geçiyor; normal basınç. Süre?",
      "Önce ihtiyaç enerjisini, sonra net gücü bul.",
      [
        [
          "Enerji",
          "Erime ve suyu ısıtma ayrı basamaklardır.",
          "Q=100·334+100·4,2·30=46000 J",
        ],
        [
          "Net güç",
          "Yüzdeyi ondalık kullan; 500 W’ın tamamı maddeye geçmiyor.",
          "Pnet=0,80·500=400 J/s",
        ],
        [
          "Süre",
          "Sabit net güçte enerji/güç saniye verir.",
          "t=46000/400=115 s",
        ],
      ],
      "115 saniye gerekir.",
      "400 J/s·115 s=46000 J; verimsiz durumda süre 92 saniyeden daha büyük olmalıdır.",
      "%80’i 80 diye çarpmak veya erime enerjisini atlamak sonucu bozar.",
    ),
    example(
      "Yoğuşma da enerji verir",
      "Normal basınçta 100 °C’deki 10 g su buharı tamamen yoğuşup 20 °C su oluyor. Lv=2260 J/g, csu=4,2 J/(g·°C), kayıp yok. Verdiği enerjinin büyüklüğü?",
      "Önce sabit sıcaklıkta yoğuştur, sonra sıvıyı soğut.",
      [
        [
          "Yoğuşma",
          "Gazdan sıvıya geçiş çevreye enerji verir.",
          "|Q1|=10·2260=22600 J",
        ],
        ["Soğuma", "Oluşan 10 g su 80 derece soğur.", "|Q2|=10·4,2·80=3360 J"],
        [
          "Toplam",
          "Her iki basamakta enerji dışarıya verilir.",
          "|Q|=22600+3360=25960 J",
        ],
      ],
      "25960 J verir; örnek için işaretli Q=−25960 J.",
      "Yalnız 3360 J bulmak, buharın büyük yoğuşma enerjisini atlamak olur.",
      "Yoğuşmayı ısı alma olayı sanıp iki enerjiyi birbirinden çıkarma.",
    ),
  ],
  recall: [
    {
      prompt:
        "Sabit sıcaklıktaki erime hangi enerji ve hangi kütleyle hesaplanır?",
      answer:
        "Q=meriyenL; bütün başlangıç kütlesi yalnız tamamı erirse kullanılır. ΔT=0 enerji aktarımı yok demek değildir.",
    },
    {
      prompt:
        "Bir platoda iki kat uzun zaman görmek L’nin iki katını kanıtlar mı?",
      answer:
        "Ancak kütle ve sabit net güç de eşitse karşılaştırma yapılabilir; Q=mL=Pt.",
    },
    {
      prompt: "Buz-su karışımında neden önce sınır testi yaparsın?",
      answer:
        "Sıcak suyun 0 °C’ye kadar verebildiği enerji bütün buzu eritmeyebilir; son hâl buna göre değişir.",
    },
    {
      prompt:
        "Buharlaşma ile kaynamanın yeri ve sıcaklık koşulu nasıl ayrılır?",
      answer:
        "Buharlaşma yüzeyden farklı sıcaklıklarda olabilir; kaynama dış basınca bağlı kaynama sıcaklığında sıvı içinde de kabarcık oluşumudur.",
    },
  ],
  questions: [
    [
      "Su buharı, arada sıvı damla oluşturmadan doğrudan buz kristaline dönüşüyor. Bu geçişin adı ve örneğin enerji yönü nedir?",
      [
        "Yoğuşma, enerji alır",
        "Kırağılaşma, enerji verir",
        "Süblimleşme, enerji verir",
        "Erime, enerji alır",
        "Donma, enerji alır",
      ],
      1,
      "Başlangıç gaz, son katı; ters yöndeki geçişi de düşün.",
      "Gazdan doğrudan katıya geçiş kırağılaşmadır ve örnek çevreye enerji verir. Süblimleşme bunun tersi olan katıdan gaza geçiştir; yoğuşmanın son hâli sıvıdır. Donma da sıvıdan katıya geçiş olduğundan verilen başlangıç hâline uymaz.",
    ],
    [
      "Erime sıcaklığındaki 30 g saf katıyı aynı sıcaklıkta tamamen eritmek için L=200 J/g veriliyor. Basınç sabit, kayıp yok. Gereken enerji kaç J?",
      ["150", "600", "6000", "60000", "0"],
      2,
      "Bu basamakta sıcaklık değil hâl değişiyor.",
      "Q=mL=30·200=6000 J. Gram ile J/g sadeleşir. ΔT=0 olduğu için mcΔT’den sıfır çıkarmak erime modelini yanlış seçmektir; sıcaklık sabitken de hâl değişimine enerji aktarılır.",
    ],
    [
      "20 g buz −10 °C’den 10 °C suya dönüştürülüyor. Normal basınç, kayıp yok; cbuz=2,1 J/(g·°C), Lf=334 J/g, csu=4,2 J/(g·°C). Toplam enerji kaç J?",
      ["6680", "7100", "7520", "7940", "8360"],
      3,
      "Buzu ısıt, erit, suyu ısıt diye üç basamak kur.",
      "Buzu 0 °C’ye ısıtma 420 J, erime 6680 J, suyu 10 °C’ye ısıtma 840 J gerekir. Toplam 420+6680+840=7940 J. Yalnız erime enerjisi 6680 J başlangıç ve son sıcaklık farklarını atlar; her basamağın c veya L’si farklı görevdedir.",
    ],
    [
      "Normal basınçta 100 g su 10 °C ile 25 g buz 0 °C yalıtılmış kapta karışıyor. csu=4,2 J/(g·°C), Lf=336 J/g; kap ihmal. Dengede ne olur?",
      [
        "Tüm buz erir,20 °C su olur",
        "12,5 g buz kalır, sıcaklık 0 °C olur",
        "25 g buz kalır, su 10 °C’de kalır",
        "Son sıcaklık−10 °C olur",
        "Bütün su buharlaşır",
      ],
      1,
      "Suyun 0 °C’ye kadar verdiğini erime ihtiyacıyla karşılaştır.",
      "Su4200 J verir; bütün buz için 25·336=8400 J gerekir. Yalnız 4200/336=12,5 g buz erir;12,5 g kalır. Buz ve su birlikteyken normal basınçta denge 0 °C’dir. Tüm buz erir varsayımı enerji yetersizliği nedeniyle yanlıştır.",
    ],
    [
      "Normal basınçta 100 g su 40 °C ile 25 g buz 0 °C yalıtılmış kapta karışıyor. csu=4,2 J/(g·°C), Lf=336 J/g; kap ihmal. Son sıcaklık kaç °C?",
      ["0", "8", "16", "20", "32"],
      2,
      "Önce bütün buzun eriyebildiğini göster, kalan enerjiyi 125 g suya böl.",
      "Suyun 0 °C’ye kadar verebildiği 16800 J,8400 J erime ihtiyacından büyüktür. Kalan 8400 J toplam 125 g sıvıyı ısıtır:Td=8400/(125·4,2)=16 °C. Yalnız ilk 100 g’a bölmek yeni oluşan suyun ısınmasını atlar.",
    ],
    [
      "Aynı saf sıvı, açık bir kapta daha düşük dış basınç altında kaynatılıyor. Diğer uygun koşullarda hangisi beklenir?",
      [
        "Kaynama sıcaklığı yükselir",
        "Kaynama sıcaklığı düşer",
        "Kaynama sıcaklığı her yerde 100 °C’dir",
        "Buharlaşma yalnız kaynama anında olur",
        "Sıvı hiç enerji almaz",
      ],
      1,
      "Kaynama, buhar basıncının dış basıncı karşılamasıyla ilgilidir.",
      "Dış basınç azalınca aynı sıvının buhar basıncı dış basınca daha düşük sıcaklıkta ulaşabilir. Bu nedenle kaynama sıcaklığı düşer.100 °C su için belirli basınca ait yaklaşık bir değerdir; buharlaşma ise kaynama dışında da yüzeyden olabilir.",
    ],
    [
      "Aynı basınçta eriyen aynı saf maddenin X ve Y örneklerinde mX=2mY. İkisi de erime sıcaklığından başlayıp tamamen eriyor. QX/QY nedir?",
      ["1/4", "1/2", "1", "2", "4"],
      3,
      "Aynı geçiş ve koşullarda L ortaktır.",
      "Q=mL olduğundan QX/QY=mX/mY=2. İki örneğin sıcaklığının geçişte sabit kalması enerjiyi sıfırlamaz. Yalnız L’nin madde özelliği olması toplam enerjinin kütleden bağımsız olduğu anlamına gelmez.",
    ],
    [
      "Bir hâl değişimi için gereken enerji aynı kalıyor. Sabit net ısıtıcı gücü P’den 2P’ye çıkarılıyor, kayıp değişmiyor ve net güç veriliyor. Geçiş süresi nasıl değişir?",
      [
        "Dört katına çıkar",
        "İki katına çıkar",
        "Aynı kalır",
        "Yarısına iner",
        "Dörtte birine iner",
      ],
      3,
      "Q=Pnet·t sabit enerji için çözülür.",
      "Gereken Q aynı olduğundan t=Q/Pnet’tir; net güç iki katına çıkınca süre yarıya iner. Burada nominal değil net güç verilmiştir. Gücü artırmayı enerji ihtiyacının artmasıyla karıştırmak veya süreyi güçle doğru orantılı almak yanlıştır.",
    ],
    [
      "Bir sıvı yüzeyden buharlaşırken dışarıdan yeterli enerji almıyor ve soğuyor. En uygun açıklama hangisidir?",
      [
        "Buharlaşma yalnız 100 °C’de olur",
        "Ayrılan tanecikler enerji taşıyabilir; kalan sıvının ortalama enerjisi azalabilir",
        "Bütün tanecikler aynı anda yok olur",
        "Buharlaşma katıya geçiştir",
        "Buharlaşan örnek mutlaka çevreye yoğuşma ısısı verir",
      ],
      1,
      "Yüzeyden ayrılan tanecikler ile kalan taneciklerin enerji dağılımını düşün.",
      "Buharlaşma için gereken enerji yeterince dışarıdan karşılanmazsa kalan sıvının enerjisi azalabilir ve sıvı soğur. Bu yüzey olayı farklı sıcaklıklarda olur. Yoğuşma ters geçiştir; maddenin yok olması veya katıya geçmesi söz konusu değildir.",
    ],
    [
      "Yoğuşma sıcaklığındaki 10 g saf buhar aynı sıcaklıkta tamamen sıvıya dönüşüyor. L=2250 J/g; basınç sabit. Örneğin verdiği enerjinin büyüklüğü nedir?",
      ["225 J", "2250 J", "22500 J", "225000 J", "0 J"],
      2,
      "Sıcaklık sabit ama hâl değişiyor; yönü yoğuşma belirler.",
      "Enerji büyüklüğü mL=10·2250=22500 J’dir. Gazdan sıvıya geçerken örnek bu enerjiyi çevreye verir. İşaretli Q alınan için pozitif seçilirse−22500 J olur; soru büyüklük istediği için pozitif 22500 J kullanılır.",
    ],
  ],
};

const staticElectricity: Pack = {
  id: "durgun-elektrik",
  topic: "detail-122",
  title: "Durgun elektrik",
  minutes: 60,
  source: reference("87–102", "009 Durgun Elektrik"),
  objectives: [
    "Elektron aktarımını, yük işaretini ve korunumunu aynı olayda izle.",
    "Sürtünme, dokunma, etki ve topraklama süreçlerini sırasıyla açıkla.",
    "Elektroskop gözleminden çıkarılabilen ve çıkarılamayan sonuçları ayır.",
    "Coulomb kuvveti ile elektrik alanı birim ve yönleriyle hesapla.",
  ],
  sections: [
    section(
      "Nötr, yüksüz parçacıklardan oluşmuş demek değildir",
      "Proton +e, elektron −e yük taşır; nötron elektriksel olarak yüksüzdür. Nötr bir cismin toplam pozitif ve negatif yük miktarları eşittir; içinde yüklü parçacık olmadığı anlamına gelmez. Temel yük büyüklüğü yaklaşık e=1,60×10⁻¹⁹ C’dir. Olağan serbest cisimlerin net yükü q=ne biçiminde tam sayı katlarıyla ifade edilir; n işaretli bir tam sayıdır.",
      "Katı cisimlerin olağan sürtünme ve dokunma ile elektriklenmesinde aktarılanlar elektronlardır. Elektron kaybeden cisim pozitif, elektron kazanan cisim negatif olur; çekirdekteki protonları bir cisimden ötekine taşıdığını varsayma. Bu açıklama bütün madde ortamlarında hareket eden tek taşıyıcının elektron olduğu iddiası değildir: sıvı çözeltilerde iyonlar da hareket edebilir. Net yük hesabında q=(Np−Ne)e kullanılır.",
    ),
    section(
      "Yükü yaratma, sistemler arasında izle",
      "Elektriksel olarak yalıtılmış bir sistemde işaretli toplam yük korunur: Σqönce=Σqsonra. Başlangıçta nötr iki cisim arasında n elektron A’dan B’ye geçerse A +ne, B −ne olur ve toplam sıfır kalır. İki cismin farklı büyüklükte olması bu korunum hesabını değiştirmez. Başlangıç yükleri farklıysa son yükler yalnız aktarılan miktarla güncellenir; her sürtünmede sıfırdan başladığını sanma.",
      "Aynı işaretli iki noktasal yük birbirini iter, zıt işaretliler çeker. Ancak gözlenen çekim tek başına iki cismin net yüklerinin zıt olduğunu kanıtlamaz. Yüklü cisim nötr bir iletkende yük ayrışmasına, yalıtkanda kutuplanmaya neden olup onu çekebilir. Kontrollü basit deneylerde itme, iki cismin aynı işaretli yüklü olduğuna daha güçlü bir kanıttır. Önce ‘net yük var mı?’ ile ‘bölgesel yük ayrıldı mı?’ sorularını ayır.",
    ),
    section(
      "İletken ve yalıtkanda aynı yük başka dağılır",
      "Metalde serbest taşıyıcı elektronlar iletken boyunca yeniden dağılabilir. Elektrostatik dengede iletken malzemenin içindeki elektrik alan sıfırdır; aksi hâlde serbest yükler hareket etmeyi sürdürürdü. Dış etki yokken yüklü iletken kürede simetrik dağılım olabilir; sivri uçlu ve asimetrik cisimlerde yüzey yük yoğunluğu aynı olmak zorunda değildir. Sivri bölgeler yakınında alan büyüyebilir.",
      "Yalıtkana verilen yük yerel bölgede kalabilir; dış etki altında atom ve moleküllerde yük merkezleri biraz ayrılabilir. Bu kutuplanma, bütün nesnenin net yüklendiği anlamına gelmez. İçi boş iletkenin boşluğunda ayrıca bir yük bulunmuyorsa kapalı iletken yapı dış elektrostatik alana karşı koruma sağlayabilir. Faraday kafesini bütün frekanslardaki elektromanyetik dalgaları eksiksiz durduran evrensel bir kalkan gibi yorumlama.",
    ),
    section(
      "Dokunmada eşitlik için geometrik koşul gerekir",
      "Yüklü iletkenler temas ettiğinde elektronlar elektrostatik dengeye yaklaşacak biçimde yeniden dağılır. Özdeş iki iletken küre, uygun simetri ve uzaktaki dış etkiler koşulunda toplam yükü eşit paylaşır: qson=(q1+q2)/2. +10 μC ve −4 μC için toplam +6 μC olduğundan her biri +3 μC kalır. Negatif yükler yok olmaz; artı işareti elektron eksikliğini anlatır.",
      "Küreler özdeş değilse yalnız ikiye bölme kuralını kullanma. Birbirinden yeterince uzak kürelerin ince telle bağlandığı yaklaşık modelde eşit potansiyel ve küresel simetri kullanılarak q1/r1=q2/r2 yazılabilir; birbirine çok yakın her keyfî geometrinin tam çözümü değildir. Ardışık dokundurma sorusunda her temastan sonraki yükü yeni başlangıç kabul et. Üç küreyi aynı anda bağlamakla sırayla ikişerli dokundurmak aynı işlem değildir.",
    ),
    section(
      "Etki ile ayrışma ve kalıcı yük farklı sonuçlardır",
      "Pozitif çubuk nötr bir metalin yakınına dokunmadan gelince elektronlar çubuğa yakın bölgeye kayar; uzakta pozitif yük fazlalığı kalır. Metalin toplam yükü hâlâ sıfır olabilir. Çubuk uzaklaşınca ayrışma kaybolur. Temas eden iki nötr iletkeni çubuk yakındayken birbirinden ayırırsan iki parçanın toplam yükü sıfır kalırken her biri zıt işaretli net yük taşıyabilir.",
      "Kalıcı yük oluşturmanın bir yolu da etki altındaki iletkeni toprağa bağlamaktır. Pozitif çubuk yakındayken topraktan elektron gelebilir; çubuk dururken önce toprak kesilip sonra çubuk uzaklaştırılırsa iletken negatif kalabilir. Negatif çubuk için elektronların yönü ve son işaret tersine döner. Etkileyen çubuk toprak bağlantısı kesilmeden önce uzaklaştırılırsa, ideal yalıtılmış tek iletken protokolünde kalıcı net yük kalmayabilir. İşlem sırası fiziksel sonucun parçasıdır.",
    ),
    section(
      "Toprak Dünya’yı da hesap sınırına ekler",
      "Topraklama, iletken ile çok büyük bir yük deposu gibi davranan Dünya arasında elektron alışverişine yol açar. Dışarıda etkileyen yük yokken yüklü izole iletken topraklanırsa basit modelde nötrleşebilir: negatif iletkenden elektron gider, pozitif iletkene elektron gelir. Pozitif protonların toprak hattından akması gerekmez. İletken artı Dünya birlikte ele alındığında yük korunumu sürer.",
      "‘Topraklanan her cisim her koşulda sıfır yüklüdür’ genellemesi yanlıştır: yakında etkileyen başka yük varsa topraklanmış iletkende net indüklenen yük bulunabilir. Toprak potansiyelini referans almak, iletkenin bütün noktalarında hiç yük olmadığı demek değildir. Elektrik tesisatındaki koruyucu topraklama ve kaçak akım/sigorta düzenleri gerçek güvenlik tasarımlarıdır; bu küçük yük ayırma modeli bütün şebeke güvenliğini açıklamaz.",
    ),
    section(
      "Elektroskopta hareketi, başlangıcı ve uzaklığı birlikte oku",
      "Elektroskobun iletken topuzuna bağlı ince yapraklar aynı işaretle yüklendiğinde birbirini itip açılır. Başlangıçta nötr elektroskoba + veya − yüklü cisim yaklaştırmak her iki durumda da yaprakları açabilir; bu tek gözlem yükün işaretini belirlemez. Yaklaştırma ile dokundurma farklıdır: ilkinde net yük sıfır kalabilir, ikincisinde elektron alışverişi olabilir.",
      "Yükü bilinen elektroskoba aynı işaretli cisim yaklaştırıldığında yaprakların daha çok açılması beklenebilir; zıt işaretli cisimde önce kapanma görülebilir. Güçlü etki ve değişen uzaklıkta kapanıp yeniden açılma da mümkündür. Bir tek son yaprak açısını miktar ölçüsü gibi kullanmak; geometrinin, temasın ve başlangıcın aynı olduğunu varsayar. Açılan yaprakları ‘kesin pozitiftir’ diye etiketleme; hangi elektronların nereye kaydığını izle.",
    ),
    section(
      "Kuvvet ile alanı aynı ok sanma",
      "Noktasal yükler için Coulomb kuvvetinin büyüklüğü F=k|q1q2|/r² olur; k hava/vakum yaklaşımında 9×10⁹ N·m²/C² alınabilir. r yükler arası uzaklık, metre; q coulomb olmalıdır. Aynı cins yükte itme, zıt cins yükte çekme vardır. Kuvvetler ayrı cisimlere etki eden eşit büyüklükte, zıt yönlü etki–tepki çiftidir; aynı cismin üzerinde birbirini götüren iki kuvvet değildir.",
      "Elektrik alan E, pozitif küçük deneme yüküne birim yük başına etki eden elektriksel kuvvetle tanımlanır: E=Felektrik/q0. Birimi N/C; noktasal Q kaynağının alan büyüklüğü k|Q|/r²’dir. Pozitif kaynağın alanı dışarı, negatifinki kaynağa doğrudur. Negatif deneme yükünün kuvveti E’ye ters, pozitifinki aynı yöndedir. Birden çok kaynak varsa alanları yönleriyle topla; şeklin çizgi adedini gerçek fiziksel ip sayısı gibi yorumlama. İletken yüzeyde denge alanı yüzeye diktir.",
    ),
  ],
  examples: [
    example(
      "Pozitif yük kaç elektron eksiğidir?",
      "Nötr katıdan 2×10¹² elektron ayrılıyor. e=1,6×10⁻¹⁹ C. Katının son yükü?",
      "Aktarılan elektron yükü ile geride kalan katının yükünü ayır.",
      [
        [
          "Elektronların yükü",
          "Ayrılan elektronlar negatif yük taşır.",
          "qayrılan=−2×10¹²·1,6×10⁻¹⁹=−3,2×10⁻⁷ C",
        ],
        [
          "Korunum",
          "Başlangıç toplamı sıfırdır; katı zıt yükte kalır.",
          "qkatı=+3,2×10⁻⁷ C",
        ],
        ["Birim", "Mikrocoulomb 10⁻⁶ C’dir.", "qkatı=+0,32 μC"],
      ],
      "Katı +3,2×10⁻⁷ C, yani +0,32 μC olur.",
      "Katı ile ayrılan elektronların toplam yükü yine sıfırdır.",
      "Elektron gittiği için cismin negatif olduğunu söylemek işareti ters çevirir.",
    ),
    example(
      "Temas sonrası hangi yönde elektron gider?",
      "Dış etkilerden uzaktaki özdeş iletken küreler A:+10 μC, B:−4 μC. Dokundurulup ayrılıyor. Son yükler ve elektron aktarım yönü?",
      "Toplamı eşit paylaş, sonra her cismin değişiminden elektron yönünü bul.",
      [
        ["Toplam", "İşaretleriyle yükler toplanır.", "qtoplam=10−4=+6 μC"],
        [
          "Paylaşım",
          "Özdeş ve uygun simetrik iki küre eşit son yüke gelir.",
          "qA=qB=+3 μC",
        ],
        [
          "Elektron yolu",
          "A’nın yükü +10’dan +3’e iner; elektron kazanmıştır. B elektron kaybetmiştir.",
          "Elektron B→A; aktarılan yük büyüklüğü 7 μC",
        ],
      ],
      "İki küre de +3 μC; elektronlar B’den A’ya aktarılır.",
      "A’nın işaretli değişimi−7, B’ninki+7 μC; toplam değişim 0.",
      "Pozitif yükler A’dan B’ye akıyormuş gibi katı proton aktarımı anlatma.",
    ),
    example(
      "Mikrocoulombla Coulomb yasası",
      "Havada noktasal +2 μC ve −3 μC yükleri 0,30 m aralıklı. k=9×10⁹ N·m²/C². Kuvvetin büyüklüğü ve türü?",
      "Yükleri C’ye çevir; büyüklük ve yön kararını ayrı ver.",
      [
        [
          "Dönüşüm",
          "Her μC için 10⁻⁶ çarpanı vardır.",
          "|q1q2|=2·3·10⁻¹²=6×10⁻¹² C²",
        ],
        [
          "Büyüklük",
          "Uzaklığın karesi paydadadır.",
          "F=9×10⁹·6×10⁻¹²/0,30²=0,6 N",
        ],
        [
          "Yön",
          "Zıt işaretler çekim oluşturur; kuvvetler farklı cisimlerde zıttır.",
          "F1=F2=0,6 N; yönler birbirine doğru",
        ],
      ],
      "0,6 N büyüklüğünde çekim.",
      "Uzaklık 0,60 m olsaydı kuvvet dörtte bire,0,15 N’a inerdi.",
      "μC’yi C gibi kullanmak sonucu 10¹² kat büyütür; büyüklük için negatif newton yazma.",
    ),
    example(
      "Alan yönü negatif deneme yüküne göre değişmez",
      "Havada sabit +4 μC kaynağının 0,20 m sağında −2 μC deneme yükü var. k=9×10⁹. O noktada kaynak alanı ve deneme yüküne elektriksel kuvvet?",
      "E’yi kaynakla hesapla; sonra deneme yükünün işaretini F=qE’de kullan.",
      [
        [
          "Kaynak alanı",
          "Pozitif kaynaktan sağdaki noktaya doğru alan sağadır.",
          "E=9×10⁹·4×10⁻⁶/0,20²=9×10⁵ N/C",
        ],
        [
          "Kuvvet büyüklüğü",
          "Deneme yükü alanı ölçerken kaynağı bozmayacak kabul edilir.",
          "|F|=2×10⁻⁶·9×10⁵=1,8 N",
        ],
        [
          "Kuvvet yönü",
          "Negatif yük için kuvvet alanın tersidir.",
          "E sağa; F sola",
        ],
      ],
      "E=9×10⁵ N/C sağa; deneme yüküne 1,8 N sola kuvvet.",
      "İki yük zıt olduğundan deneme yükünün kaynağa çekilmesiyle yön uyumludur.",
      "Negatif deneme yükü kullanıldı diye kaynak alanının yönünü sola çevirme.",
    ),
  ],
  recall: [
    {
      prompt: "Nötr katı elektron verince proton sayısına ne olur?",
      answer:
        "Olağan elektriklenmede protonlar çekirdekte kalır; elektron eksikliği nedeniyle cisim pozitif olur.",
    },
    {
      prompt: "Çekim iki cismin zıt işaretli yüklü olduğunu kanıtlar mı?",
      answer:
        "Hayır. Yüklü cisim nötr cismi kutuplayarak çekebilir. Net yük ile bölgesel ayrışma farklıdır.",
    },
    {
      prompt:
        "Pozitif çubukla kalıcı negatif yük oluşturmak için topraklama sırası?",
      answer:
        "Çubuğu yaklaştır, toprakla, çubuk dururken toprağı kes, sonra çubuğu uzaklaştır. Dünya’dan gelen elektronların kalmasını bu sıra sağlar.",
    },
    {
      prompt:
        "E ile negatif yüke etki eden F ve özdeş küre paylaşımı hangi koşulla kullanılır?",
      answer:
        "F=qE olduğundan negatif yükte F, E’ye ters. Toplamı ikiye bölmek ise özdeş küreler ve uygun dış etki/simetri koşulları içindir.",
    },
  ],
  questions: [
    [
      "Başlangıçta nötr katı cisim 5 elektron kazanıyor. e temel yük büyüklüğü. Olağan elektriklenme için son net yükü nedir?",
      ["+5e", "−5e", "0", "+e/5", "−e/5"],
      1,
      "Elektronun yükü−e’dir; proton sayısı değişmez.",
      "Beş elektron eksi yük getirir; q=−5e olur. Nötr başlangıç, pozitif ve negatif yüklerin başlangıçta dengeli olmasıdır. Elektron kazanmayı pozitif yüklenme sanmak işareti ters çevirir; temel yükün kesirli katları da bu serbest cisim modeline uymaz.",
    ],
    [
      "Nötr A ve B cisimlerinden oluşan sistem dışarıyla yük alışverişi yapmıyor.4 elektron A’dan B’ye aktarılıyor. Son yükler sırasıyla?",
      ["−4e,+4e", "+4e,−4e", "+4e,+4e", "0,−4e", "−4e,0"],
      1,
      "Elektron veren katı pozitif, alan negatif olur; toplamı kontrol et.",
      "A dört negatif yük kaybettiği için+4e, B dört elektron kazandığı için−4e kalır. Toplam yük 0 korunur. İki son yükü aynı işaret almak yalıtılmış sistemde sıfırdan net yük üretmek olur.",
    ],
    [
      "Dış etkilerin uzakta olduğu uygun simetrik düzende özdeş iletken iki kürenin yükleri+8 μC ve−2 μC. Temas edip ayrılıyorlar. Her birinin son yükü?",
      ["−5 μC", "+2 μC", "+3 μC", "+5 μC", "+6 μC"],
      2,
      "İşaretli toplamı iki özdeş küreye eşit böl.",
      "Toplam+6 μC korunur; özdeş ve uygun simetrik iki kürede her biri+3 μC olur.8 ve 2’nin büyüklüklerini toplamak+5 sonucunu verir fakat negatif işareti atlar. Toplam+6’yı her küreye vermek yükü iki katına çıkarır.",
    ],
    [
      "Pozitif yüklü bir çubuk, yalıtkan ayaktaki nötr metal küreye dokunmadan yaklaştırılıyor; toprak bağlantısı yok. Hangisi doğrudur?",
      [
        "Kürenin toplam yükü mutlaka pozitif olur",
        "Elektronlar çubuğa yakın bölgeye kayabilir, toplam küre yükü 0 kalır",
        "Protonlar metalden çubuğa atlar",
        "Küre içindeki bütün yükler yok olur",
        "Kürenin her bölgesinde alan daima dışarıdakiyle aynıdır",
      ],
      1,
      "Etki altında ayrışma, dışarıdan net yük alma demek değildir.",
      "Pozitif çubuk metalin elektronlarını yakın tarafa çeker; uzak bölgede elektron eksikliği olur. Dışarıyla alışveriş olmadığı için toplam net yük 0 kalır. Katı protonların aktarılması veya yüklerin yok olması gerekmez; elektrostatik dengede iletken malzemenin iç alanı sıfır olur.",
    ],
    [
      "Pozitif çubuk nötr iletkene yaklaştırılıyor; iletken topraklanıyor. Çubuk dururken toprak bağlantısı kesiliyor, sonra çubuk uzaklaştırılıyor. İdeal etkiyle elektriklenmede iletkenin son işareti?",
      [
        "Pozitif",
        "Negatif",
        "Her zaman 0",
        "Hem+hem−olduğu için işareti tanımsız",
        "Proton eksiği nedeniyle negatif",
      ],
      1,
      "Pozitif çubuk yakındayken Dünya’dan hangi taşıyıcı gelir?",
      "Pozitif çubuğun etkisiyle topraktan elektronlar gelebilir. Önce toprak kesildiği için bu fazla elektronlar iletkende kalır; çubuk uzaklaşınca iletken negatif yüklü kalır. Sonuç proton eksiğinden değil elektron fazlalığındandır. Toprak bağlıyken çubuğu önce uzaklaştırmak aynı protokol değildir.",
    ],
    [
      "Başlangıçta nötr elektroskoba yüklü bir cisim dokundurulmadan yaklaştırılınca yapraklar açılıyor. Yalnız bu gözlem neyi kesin belirleyemez?",
      [
        "Cismin net yük işaretini",
        "Elektroskopta yüklerin yeniden dağılabileceğini",
        "Yapraklar arasındaki elektriksel itmenin mümkün olduğunu",
        "Etki ile elektriklenmenin rol oynayabildiğini",
        "Elektroskobun başlangıçta nötr olduğunu",
      ],
      0,
      "Hem pozitif hem negatif dış cisim nötr elektroskobun yapraklarını açabilir.",
      "Pozitif cisimde elektronlar topuza, negatif cisimde yapraklara kayabilir; iki durumda da yapraklar aynı işaretle yüklenip açılabilir. Bu nedenle tek açılma gözlemi dış cismin+veya−olduğunu belirlemez. İşareti karşılaştırmak için yükü bilinen elektroskop ve kontrollü protokol gerekir.",
    ],
    [
      "Noktasal iki yükün arası r’den 2r’ye çıkarılıyor. Yükler ve ortam değişmiyor. Coulomb kuvvet büyüklüğünün yeni/eski oranı?",
      ["4", "2", "1", "1/2", "1/4"],
      4,
      "Uzaklık formülde karesiyle paydadadır.",
      "F=k|q1q2|/r²;2r için payda 4r² olur. Dolayısıyla Fyeni/Feski=1/4. Yarıya düşme ters uzaklık bağıntısına ait olurdu. İşaretler değişmediği için çekme/itme türü bu uzaklık değişimiyle tersine dönmez.",
    ],
    [
      "Havada+1 μC ve−2 μC noktasal yüklerin arası 0,30 m. k=9×10⁹ N·m²/C². Kuvvet büyüklüğü ve türü?",
      ["0,2 N çekme", "0,2 N itme", "2 N çekme", "20 N itme", "0 N"],
      0,
      "Her μC’yi 10⁻⁶ C’ye dönüştür, işareti yön için kullan.",
      "F=9×10⁹·2×10⁻¹²/0,09=0,2 N. Zıt işaretler nedeniyle çekmedir. Her iki cisme etki eden kuvvetler eşit büyüklükte ve zıt yöndedir; büyük yüklü cisim diğerine daha büyük kuvvet uygulamaz.",
    ],
    [
      "Bir noktada kaynakların oluşturduğu elektrik alan sağa yönlüdür. O noktaya konan küçük negatif deneme yüküne elektriksel kuvvet hangi yöndedir?",
      ["Sağa", "Sola", "Daima yukarı", "Daima aşağı", "Yük ne olursa olsun 0"],
      1,
      "F=qE bağıntısında q’nun işareti yönü belirler.",
      "Negatif q için F, E’ye ters yöndedir; bu nedenle sola olur. Alanın sağa olması pozitif deneme yüküne göre tanımlanmıştır. Negatif deneme yükü alan yönünü değiştirmez; yalnız ona etki eden kuvvetin yönü ters olur.",
    ],
    [
      "Dış etkileyen yük bulunmayan, negatif yüklü izole metal küre Dünya’ya iletken telle bağlanıyor. Basit topraklama modelinde nötrleşirken hangi aktarım olur?",
      [
        "Protonlar küreden Dünya’ya gider",
        "Elektronlar küreden Dünya’ya gider",
        "Elektronlar Dünya’dan küreye gelir",
        "Nötronlar pozitife dönüşür",
        "Toplam yük küre+Dünya için yok olur",
      ],
      1,
      "Negatif net yük elektron fazlalığıdır; sistem sınırını Dünya’yla genişlet.",
      "Kürenin fazla elektronları Dünya’ya aktarılabilir ve küre nötrleşir. Toplam yük küre+Dünya birlikte ele alındığında korunur. Pozitif protonların metal içinde yer değiştirmesi gerekmez. Dış etkileyen yük varken her topraklanan cismin net yükü 0 olacak genellemesi yapılmaz.",
    ],
  ],
};

const current: Pack = {
  id: "elektrik-akimi",
  topic: "detail-123",
  title: "Elektrik akımı",
  minutes: 65,
  source: reference("103–121", "010 Elektrik Akımı"),
  objectives: [
    "Akımı geçen yük/süre ile bul; elektron sürüklenmesini enerji iletiminden ayır.",
    "Ohm yasası, tel geometrisi ve seri/paralel düğüm ilişkilerini hesapla.",
    "Ölçü aletlerini doğru bağla; güç, enerji ve kaynak kapasitesini birimleriyle ayır.",
    "İdeal devre varsayımlarının ve güvenlik benzetmelerinin sınırını açıkla.",
  ],
  sections: [
    section(
      "Yük hareketi var; yük tüketimi yok",
      "Metalde serbest elektronlar pil bağlı değilken de düzensiz hareket eder; bu hareket kesitten sürekli net yük geçişi demek değildir. Devreye uygun kaynak bağlanınca oluşan elektrik alan elektronların hareketine yönlü sürüklenme ekler. Elektronlar telin içinde zaten vardır; pil her elektronu yeni üretip ampule göndermek zorunda değildir. Sıvı elektrolitlerde pozitif/negatif iyonlar, iyonlaşmış gazlarda iyonlar ve elektronlar da taşıyıcı olabilir.",
      "Elektrik akımı seçilen kesitten birim zamanda geçen net yönlü yük aktarımıyla tanımlanır. Sabit veya ortalama akım için I=Δq/Δt; birimi amperdir:1 A=1 C/s. Akım şiddeti skaler olarak ele alınır, devrede yön oklarıyla belirtilir. Seri devrede akım bir ampulde harcanıp azalmaz; yük korunur, eleman elektrik enerjisini başka biçimlere dönüştürür.",
    ),
    section(
      "Akım oku ile elektron oku ters olabilir",
      "Konvansiyonel akım yönü pozitif taşıyıcının hareket yönü olarak tanımlanır. Basit pilin dış metal devresinde akım+uçtan−uca, elektron sürüklenmesi ters yönde olur. Bir çözeltide pozitif iyonların sağa ve negatif iyonların sola geçmesi aynı yöndeki konvansiyonel akıma katkı yapabilir. Akımı bulurken yalnız işaretli yükleri gelişigüzel çıkarma; taşıyıcıların hareket yönlerini de hesaba kat.",
      "q=Ne ile yük büyüklüğünü hesaplayıp I=q/t kullanabilirsin. Dakikayı saniyeye, mA’yı A’ya dönüştür. Alanın devre boyunca etkisinin yayılması ile elektronların yavaş sürüklenmesi aynı hız değildir; ampulün hızla yanması tek elektronun pili terk edip devrenin tamamını hemen dolaştığını göstermez. Bu dersteki devre çizimleri kararlı doğru akım modelidir; dalga yayılımının zaman hesabını yapmaz.",
    ),
    section(
      "Gerilim enerji başına değil, yük başına enerjidir",
      "İki nokta arasındaki potansiyel fark yük başına elektriksel enerji değişimiyle ilişkilidir;1 V=1 J/C. Bir elemanda dönüştürülen enerji büyüklüğü uygun sabit gerilimde E=qV olur. Voltmetre tek bir noktanın mutlak enerjisini ölçmez; iki noktayı karşılaştırır. Yükü veya enerjiyi yalnız volt değeriyle bulamazsın; diğer nicelik gerekir.",
      "Kaynak kimyasal veya başka enerji biçiminden devreye enerji sağlar. Elektromotor kuvvet adı kuvvet çağrıştırsa da ε birimi newton değil volttur; kaynağın yük başına sağladığı enerjiyle ilgilidir. İdeal kaynakta iç direnç 0 alınır. Gerçek kaynak akım verirken iç direnci r nedeniyle uç gerilimi ε−Ir olabilir. Dirençli dış devrede akım yüksek potansiyelden düşüğe gider; kaynağın içinde enerji kazandırılan bölüm için aynı basit düşüş cümlesini her yere yayma.",
    ),
    section(
      "Ohm yasası bir elemanın koşullu davranışıdır",
      "Sıcaklığı ve fiziksel koşulları sabit ohmik dirençte V=IR ve R=V/I kullanılır. Aynı R için V iki katına çıkarsa I iki katına çıkar; R iki katına çıkarsa aynı V’de I yarıya iner. Gerçek filaman ısınınca direnci değişebilir; her elemanın V–I grafiği doğrusal değildir. Bir ölçüm noktasında V/I oranı bulunabilse bile bu bütün grafikte sabit R kanıtı değildir.",
      "Düşey V, yatay I grafiğinde eğim ΔV/ΔI=R; düşey I, yatay V grafiğinde eğim 1/R olur. Grafiğin daha dik olmasını eksenleri okumadan büyük direnç diye etiketleme. Potansiyel farkın veya akımın artması kendi başına direnci değiştiren neden değildir; ohmik modelde R malzeme, geometri ve sıcaklıkla belirlenir. Reosta devrede etkin tel uzunluğunu değiştirerek R ayarlayabilir.",
    ),
    section(
      "Telin boyu ve kesit alanı farklı etki yapar",
      "Homojen tel için R=ρL/A bağıntısında ρ özdirenç, birimi Ω·m; L metre ve A kesit alanı m²’dir. Uzun tel aynı malzemede ve kesitte daha büyük direnç, geniş kesit daha küçük direnç gösterir. A çap değildir: dairesel kesitte A=πr² olduğundan çap iki kat olursa alan dört kat olur. Uzunluk sabitken R dörtte bire iner.",
      "Metal özdirenci çoğunlukla sıcaklıkla artar; fakat bütün maddeler aynı sıcaklık bağıntısını izlemez. Tel çekilerek uzatılırken kütle/hacim sabit koşulu verilmişse kesit de küçülür; yalnız L etkisini saymak eksik kalır. Aynı malzemeden hacmi sabit telin boyu iki katına çıkarsa A yarıya, R dört katına çıkar. Soruda geometri değişimiyle sıcaklık değişiminin hangisinin ihmal edildiğini açık tut.",
    ),
    section(
      "Seri bağda aynı akım, paylaşılan gerilim",
      "Dirençlerin arada dallanma olmadan uç uca bulunduğu tek akım yolunda her elemandan aynı I geçer. Eşdeğer direnç R1+R2+…; kaynak gerilimi eleman gerilimlerinin toplamıdır. Her eleman için Vi=IRi olduğundan daha büyük seri direnç daha büyük gerilim düşüşü alır. Bir elemanın koldan çıkarılıp devrenin açık bırakılması bütün seri yolu keser.",
      "Seri bağlantıyı çizimde birbirine yakın olma diye tanıma; düğümlere bak. Aynı düğüme ideal telle bağlı noktalar, çizgi dolansa da aynı potansiyeldedir. Seri bağlı iki eşit direnç gerilimi eşit paylaşır; farklı dirençlerde otomatik V/2 alma. İdeal kaynak sabitken devreye seri direnç eklemek toplam R’yi artırıp akımı azaltır. Bu sırada mevcut dirençlerdeki güçler de değişebilir.",
    ),
    section(
      "Paralel bağda aynı iki düğüm, farklı kol akımları",
      "Paralel dirençlerin birer ucu aynı birinci, öteki uçları aynı ikinci düğümdedir. Bu nedenle bütün kolların gerilimleri aynıdır; akımlar Ii=V/Ri olur. Ana akım düğümde kollara ayrılır ve Iana=ΣIi ile korunur. Eşdeğer için 1/Reş=Σ1/Ri; pozitif paralel dirençlerin eşdeğeri en küçük kol direncinden de küçüktür.",
      "İki kolun akımları ancak dirençleri eşitse eşittir. İdeal kaynak ve değişmeyen diğer koşullarda bir paralel kolu açmak kalan kolun üzerindeki gerilimi değiştirmez; toplam kaynak akımı azalır. Gerçek kaynağın iç direnci önemliyse uç gerilimi de değişebilir. Bir devreyi önce düğümlere ayır, sonra seri/paralel alt parçaları sadeleştir; görsel olarak üstte veya altta olmak elektriksel bağlantıyı belirlemez.",
    ),
    section(
      "Ölçüm aleti devreyi değiştirmesin",
      "Akımı ölçen ampermetre, ölçülecek koldaki akım üzerinden geçsin diye seri bağlanır; ideal direnci 0 kabul edilir. Potansiyel fark ölçen voltmetre elemanın iki ucuna paralel bağlanır; ideal direnci sonsuz kabul edilir ve üzerinden akım geçmez. Bu ideallerin gerçek aletlerde yaklaşık sağlandığını bilmek, ölçümün devreyi niçin az etkilemesi gerektiğini açıklar.",
      "İdeal ampermetreyi doğrudan kaynak uçlarına paralel bağlamak çok küçük dirençli kısa devre yolu oluşturur; gerçek akımı kaynak ve kablo dirençleri sınırlar. İdeal voltmetreyi tek seri yola koymak devreyi açmış gibi akımı keser. Kısa devreyi ‘yük akıllıca kısa yolu seçti’ diye değil, aynı uçlar arasında çok küçük direnç ve potansiyel fark koşuluyla çöz. İdeal sıfır iç dirençli kaynakta kusursuz kısa devre sonlu akım veren geçerli bir model değildir.",
    ),
    section(
      "Kaynak bağlantısı, kapasite ve enerji ayrı niceliklerdir",
      "Aynı yönlü seri ideal kaynakların ε değerleri toplanır; ters kaynak çıkarılır. Özdeş, aynı gerilimli kaynaklar uygun şekilde paralel bağlanırsa uç gerilimi tek kaynağınkiyle aynı kalır; yükü paylaşarak kullanım süresini artırabilirler. Farklı ideal gerilimli kaynakları doğrudan paralel bağlamak tutarlı bir ideal devre değildir. Gerçek devre bağlantısı için yalnız çizimdeki+ve−işaretlerini rastgele birleştirme.",
      "mAh bir yük kapasitesi birimidir; tek başına enerji birimi değildir.1 Ah=3600 C ve yaklaşık enerji, uygun gerilim bilgisiyle E≈Vq olarak bulunabilir.4000 mAh kapasiteden sabit 1000 mA çekilirse ideal süre 4 saat olur; gerçek süre sıcaklık, akım ve kaynak koşullarıyla değişebilir. Daha yüksek mAh değeri farklı gerilimli iki kaynağın enerjisini doğrudan sıralamaz.",
    ),
    section(
      "Güç ve enerjiyle parlaklığı ve güvenliği yorumla",
      "Elektriksel güç P=VI, ohmik dirençte P=I²R=V²/R; birimi W=J/s. Enerji sabit güçte E=Pt olur. kW güç, kWh enerji birimidir;1 kWh=3,6×10⁶ J. Özdeş ve sabit direnç kabul edilen ampullerde daha büyük güç daha fazla parlaklıkla ilişkilendirilir. Farklı gerçek ampullerde bütün ışık verimlerini eşit sanma; sorunun basitleştirilmiş modelini kullan.",
      "Sigorta aşırı akıma karşı devreyi açar; kaçak akım düzeni giden/dönen akım farkına duyarlıdır, koruyucu topraklama başka bir koruma yoludur. Bunlar aynı görevin üç adı değildir. Şebeke üzerinde uygulamalı deney yapılmaz; bu atölye yalnız ideal düşük gerilimli hesap modelidir. İnsan üzerindeki etki akım yolu, süre ve koşullara bağlıdır; bir sayıyı tek başına kesin güvenlik sınırı gibi kullanma.",
    ),
  ],
  examples: [
    example(
      "Kesitten geçen yük",
      "Bir metal kesitinden 5 saniyede 20 C büyüklüğünde yönlü yük geçiyor. Ortalama akım ve aynı sabit akımda 15 saniyede geçen yük?",
      "Ortalama tanımını kullan; süreyi üç katına çıkarmanın yükü nasıl değiştirdiğini kontrol et.",
      [
        ["Akım", "Saniye başına geçen yük bulunur.", "I=20/5=4 A"],
        ["Yeni yük", "Sabit akım varsayımı verilmiştir.", "q=It=4·15=60 C"],
        [
          "Kontrol",
          "Süre üç katına çıktıysa sabit I’de yük de üç katına çıkar.",
          "60/20=15/5=3",
        ],
      ],
      "4 A ve 60 C.",
      "C/s amperdir; ampulde enerji dönüşmesi yükün yok olduğu anlamına gelmez.",
      "20 C’yi her saniyede geçen yük sanma.",
    ),
    example(
      "Telin alanı metre kare olmalı",
      "ρ=2×10⁻⁸ Ω·m, L=5 m, A=1 mm² olan homojen telin direnci? Sıcaklık sabit.",
      "Önce alanı m²’ye dönüştür; milimetrenin karesini unutma.",
      [
        ["Alan", "1 mm=10⁻³ m olduğu için karede 10⁻⁶ olur.", "A=10⁻⁶ m²"],
        [
          "Direnç",
          "ρL/A ifadesinde metre birimleri sadeleşir.",
          "R=2×10⁻⁸·5/10⁻⁶=0,10 Ω",
        ],
        [
          "Karşılaştır",
          "Aynı boyda alan iki kat olursa direnç yarıya iner.",
          "A=2 mm² için R=0,05 Ω",
        ],
      ],
      "R=0,10 Ω.",
      "Ω·m·m/m²=Ω; sonuç birimi doğru.",
      "1 mm²’yi 10⁻³ m² almak bin kat fark doğurur.",
    ),
    example(
      "Seri dirençlerin enerji paylaşımı",
      "İdeal 24 V kaynağa seri 4 Ω ve 8 Ω ohmik direnç bağlanıyor. Akım, gerilimler ve toplam güç?",
      "Önce tek akımı bul, sonra her elemanda ayrı V ve P hesapla.",
      [
        [
          "Eşdeğer ve akım",
          "Seri dirençler toplanır.",
          "Reş=12 Ω; I=24/12=2 A",
        ],
        [
          "Gerilimler",
          "Aynı akım büyük dirençte daha büyük düşüş verir.",
          "V1=2·4=8 V; V2=2·8=16 V",
        ],
        [
          "Güç",
          "Her eleman enerji dönüştürür; toplam kaynak gücüne eşittir.",
          "P1=2²·4=16 W; P2=2²·8=32 W; Ptop=48 W",
        ],
      ],
      "I=2 A, gerilimler 8 ve 16 V, toplam 48 W.",
      "8+16=24 V ve kaynak gücü 24·2=48 W.",
      "İki direnç var diye gerilimi otomatik 12’şer V paylaşma.",
    ),
    example(
      "Paralelde akımlar eşit olmak zorunda değil",
      "İdeal 12 V kaynağa 6 Ω ve 3 Ω direnç paralel. Kol akımları, toplam akım ve eşdeğer?",
      "Aynı iki düğümdeki her kolun gerilimi 12 V’dir.",
      [
        [
          "Kollar",
          "Her kol için ayrı Ohm yasası kullanılır.",
          "I1=12/6=2 A; I2=12/3=4 A",
        ],
        ["Düğüm", "Ana akım iki kolun toplamıdır.", "Iana=2+4=6 A"],
        ["Eşdeğer", "Kaynağın gördüğü V/I oranı bulunur.", "Reş=12/6=2 Ω"],
      ],
      "Kol akımları 2 ve 4 A; toplam 6 A; eşdeğer 2 Ω.",
      "2 Ω, en küçük kol 3 Ω’dan küçüktür. Toplam güç 12·6=72 W.",
      "Ana akımı ikiye eşit bölmek dirençlerin eşit olduğunu varsayar.",
    ),
    example(
      "İç direnç kaynak gerilimini azaltır",
      "ε=9 V, r=1 Ω gerçek kaynak dışarıda 8 Ω dirençle tek kapalı devre oluşturuyor. Akım ve dış direnç üzerindeki gerilim?",
      "İç ve dış direnç aynı seri akımı taşır.",
      [
        ["Toplam", "İç direnç de enerji dönüştürür.", "Rtop=8+1=9 Ω"],
        [
          "Akım",
          "EMK bütün çevrimin enerji bilançosuna girer.",
          "I=ε/(R+r)=9/9=1 A",
        ],
        [
          "Uç gerilimi",
          "Dış devrenin gördüğü gerilim EMK’den iç düşüş çıkarılarak bulunur.",
          "V=9−1·1=8 V",
        ],
      ],
      "I=1 A, uç gerilimi 8 V.",
      "Kaynak 9 W sağlar; dış direnç 8 W, iç direnç 1 W dönüştürür.",
      "Uç gerilimini yük altında her zaman ε sanma.",
    ),
  ],
  recall: [
    {
      prompt:
        "Dış metal devrede elektron yönü ile akım yönü ve pilin rolü nedir?",
      answer:
        "Elektron sürüklenmesi akıma terstir. Pil yükü yaratmak yerine devreye enerji sağlar ve alan oluşturur.",
    },
    {
      prompt:
        "Çap iki katına çıkarsa, boy ve sıcaklık sabitken R nasıl değişir?",
      answer: "Kesit alanı dört kat, R=ρL/A dörtte bir olur. A çap değildir.",
    },
    {
      prompt:
        "Seri/paralelde hangi nicelik aynıdır; ölçü aletleri nereye bağlanır?",
      answer:
        "Seride I, paralelde V aynı. Ampermetre seri; voltmetre elemanın uçlarına paralel bağlanır.",
    },
    {
      prompt: "mAh, kW ve kWh hangi tür niceliklerdir?",
      answer:
        "mAh yük kapasitesi, kW güç, kWh enerjidir. Yük kapasitesini enerjiye çevirmek için gerilim gerekir.",
    },
  ],
  questions: [
    [
      "Bir kesitten 8 saniyede 24 C yönlü yük geçiyor. Ortalama akım kaç A?",
      ["1/3", "2", "3", "8", "192"],
      2,
      "Birim zamanda geçen yükü hesapla.",
      "I=q/t=24/8=3 A. Akım yükün zamana oranıdır; q·t değildir. C/s amper birimi verir. Bu24 C’nin devrede tüketildiği anlamına gelmez; seçilen kesitten geçen yük miktarıdır.",
    ],
    [
      "Basit pilin kapalı dış metal devresinde konvansiyonel akımın+uçtan−uca olduğu veriliyor. Elektron sürüklenmesi hangi yöndedir?",
      [
        "+uçtan−uca",
        "−uçtan+uca",
        "Her zaman akıma diktir",
        "Elektronlar hiç hareket etmez",
        "Protonlar akımla birlikte teli dolaşır",
      ],
      1,
      "Metalde hareketli yük negatiftir.",
      "Elektronlar negatif taşıyıcıdır; sürüklenme yönleri konvansiyonel akıma terstir, dış devrede−uçtan+uca giderler. Katı çekirdek protonlarının devreyi dolaştığı varsayılmaz. Düzensiz ısıl hareket ise yönlü sürüklenmeden ayrıca vardır.",
    ],
    [
      "Sıcaklığı sabit ohmik 4 Ω direnç ideal 12 V kaynağa bağlanıyor. Dirençten geçen akım?",
      ["1/3 A", "2 A", "3 A", "4 A", "48 A"],
      2,
      "V=IR bağıntısını I için çöz.",
      "I=V/R=12/4=3 A.12·4 işlemi akım vermez; V/Ω amperdir. Direncin sabit olması bu soruda sıcaklık ve ohmik koşulla açıkça sağlanmıştır; gerçek ısınan her ampule aynı sabit R varsayımı yüklenmez.",
    ],
    [
      "Düşey V, yatay I grafiği orijinden geçen doğru. V=10 V iken I=2 A ölçülüyor; koşullar sabit ve eleman ohmik. Direnç kaç Ω?",
      ["0,2", "2", "5", "10", "20"],
      2,
      "Bu eksenlerde eğim V/I’dir.",
      "R=V/I=10/2=5 Ω. Grafiğin doğrusal ve koşulların sabit olduğu verildiğinden eğim sabit direnci gösterir.0,2, eksenler I–V olsaydı elde edilen iletkenlik eğimidir; direnç diye kullanılamaz.",
    ],
    [
      "Aynı malzemeden dairesel kesitli iki telin boyları ve sıcaklıkları aynı. Y’nin çapı X’in iki katı. RY/RX nedir?",
      ["4", "2", "1", "1/2", "1/4"],
      4,
      "Alan çapın karesiyle değişir; direnç alana ters orantılıdır.",
      "Çap 2 kat olduğunda A4 kat olur. R=ρL/A bağıntısında ρ ve L aynı olduğundan RY/RX=1/4. Kesit alanını çapla aynı değişen nicelik sayıp 1/2 almak kare ilişkiyi kaçırır.",
    ],
    [
      "İdeal 18 V kaynağa 3 Ω ve 6 Ω ohmik direnç seri bağlanıyor. Akım ve 3 Ω üzerindeki gerilim sırasıyla?",
      ["2 A ve 6 V", "2 A ve 9 V", "3 A ve 9 V", "6 A ve 18 V", "1 A ve 3 V"],
      0,
      "Seride toplam R9 Ω; aynı I her dirençten geçer.",
      "Reş=3+6=9 Ω ve I=18/9=2 A.3 Ω üzerindeki gerilim V=2·3=6 V; öteki dirençte 12 V vardır ve toplam 18 V olur. Eşit gerilim paylaşımı yalnız eşit seri dirençlerde geçerli olurdu.",
    ],
    [
      "İdeal 12 V kaynağa 6 Ω ve 3 Ω direnç paralel bağlanıyor. Ana kol akımı kaç A?",
      ["1", "2", "3", "4", "6"],
      4,
      "Her kol 12 V görür; iki kol akımı toplanır.",
      "6 Ω koldan 2 A,3 Ω koldan 4 A geçer. Düğümde toplam akım 6 A’dır.2 veya 4 yalnız bir kolun akımıdır. Reş=2 Ω ve 12/2=6 A kontrolü de aynı sonucu verir.",
    ],
    [
      "İdeal ölçü aletleriyle bir direncin akımı ve uç gerilimi ölçülecek. Doğru bağlantı hangisi?",
      [
        "Ampermetre paralel, voltmetre seri",
        "İkisi seri",
        "İkisi paralel",
        "Ampermetre seri, voltmetre paralel",
        "İkisi kaynak yerine çıkarılır",
      ],
      3,
      "Akımı ölçen alet aynı koldan geçmeli; gerilim iki ucu karşılaştırır.",
      "Ampermetre seri bağlanır ve ideal direnci 0’dır; voltmetre iki uca paralel bağlanır ve ideal direnci sonsuzdur. Ampermetreyi paralel bağlamak kısa devre, voltmetreyi tek seri yola koymak devreyi açma etkisi yaratabilir.",
    ],
    [
      "Sabit güçle çalışan 2 kW ideal bir araç 3 saat kullanılıyor. Dönüştürdüğü enerji kaç kWh?",
      ["2/3", "1,5", "5", "6", "6000"],
      3,
      "Güç ile süreyi çarp; kW ve saat kullanınca birim kWh olur.",
      "E=Pt=2·3=6 kWh. kWh enerji, kW güçtür.6000 Wh aynı enerjidir ama soru kWh istediği için 6000 doğru bir kWh değeri olmaz. Gücü süreye bölmek enerji hesabı değildir.",
    ],
    [
      "Gerilimi sabit kabul edilen 4000 mAh kapasiteli kaynak, ideal koşullarda sürekli 1000 mA veriyor. Yaklaşık çalışma süresi ve mAh’nin nicelik türü?",
      [
        "4 saat, yük",
        "4 saat, güç",
        "0,25 saat, enerji",
        "4000 saat, gerilim",
        "4 saniye, direnç",
      ],
      0,
      "Kapasite/akım saat verir; mA birimleri sadeleşir.",
      "t=4000 mAh/1000 mA=4 saat. mAh yük kapasitesi birimidir, doğrudan enerji veya güç değildir. Enerji için uygun gerilimle yükü ilişkilendirmek gerekir. Gerçek kaynak ömrü çalışma koşullarından etkilense de bu soru ideal süreyi sorar.",
    ],
  ],
};

const magnetism: Pack = {
  id: "miknatislar-ve-manyetik-alan",
  topic: "detail-124",
  title: "Mıknatıslar ve manyetik alan",
  minutes: 52,
  source: reference("122–129", "011 Mıknatıslar ve Manyetik Alan"),
  objectives: [
    "Kutup, manyetik madde ve pusula gözlemlerinden gerekçeli sonuç çıkar.",
    "Manyetik alan çizgisinin yönünü, kapalı yapısını ve model niteliğini açıkla.",
    "Düz telin çevresinde sağ el kuralını ve B’nin I/r ilişkisini uygula.",
    "Elektromıknatıs ile Dünya alanını kapsam sınırlarıyla ilişkilendir.",
  ],
  sections: [
    section(
      "Kutupları ayırmak, kutbu tek başına üretmek değildir",
      "Çubuk mıknatısın kuzeyi gösteren ucu N, öteki ucu S diye adlandırılır. İki mıknatısın aynı kutupları birbirini iter; zıt kutupları çeker. Mıknatıs ortadan bölünürse tek başına N ve tek başına S parçaları çıkmaz; her parça yeniden iki kutuplu mıknatıs olur. Küçük parçanın boyutunu kutup sayısıyla karıştırma.",
      "Bir mıknatısın demiri çekmesi onun bütün metalleri aynı biçimde çektiğini göstermez. Demir, nikel, kobalt ve uygun alaşımlar güçlü manyetik davranış gösterebilir; bakır ve alüminyum gündelik deneyde demir gibi davranmaz. Çekilen bir demir parçası önceden kalıcı mıknatıs olmak zorunda değildir; dış alanla mıknatıslanabilir. Kalıcı mıknatıs, geçici mıknatıslanma ve akımla çalışan elektromıknatıs farklı durumlardır.",
    ),
    section(
      "Çekimden daha ayırt edici gözlem itmedir",
      "Kutupları bilinmeyen bir çubuk N ucundan itiliyorsa, uygun basit deneyde karşı uç da N’dir. Çekiliyorsa iki olasılık vardır: çubuğun S kutbu olabilir veya mıknatıslanmamış manyetik madde olabilir. Bu yüzden ‘çekti, öyleyse kesin karşı kutup’ sonucu için karşı cismin de mıknatıs olduğu bilgisi gerekir.",
      "Birden çok çubuk içeren sorularda önce her çubuğun kendi iki ucunu zıt işaretle, sonra yalnız birbirine bakan uçları karşılaştır. İp veya yay bilgisi varsa kuvvet yönünü mekanik dengeyle ilişkilendir. Gergin ip iki mıknatısın uzaklaşma eğilimini engelliyorsa itme olabilir; fakat şeklin tek başına gergin görünmesi yeterli değildir, gerçek gerilme ve diğer kuvvetler verilmelidir. Kuvvetler eşit büyüklükte zıt yönlü olarak farklı mıknatıslara etki eder.",
    ),
    section(
      "B yönlüdür; çizgiler gerçek ip değildir",
      "Manyetik alan B vektöreldir, SI birimi tesladır (T). Alan çizgisinin bir noktadaki teğeti B’nin yönünü gösterir. Çizgiler uygun çizim kuralıyla sıklaştırıldığında daha güçlü alan temsil edilir; çizgi sayısı fiziksel tel sayısı veya doğrudan tesla ölçümü değildir. Alanın şiddeti kaynak, konum ve ortamla değişebilir.",
      "Mıknatısın alan çizgileri kapalıdır: dış bölgede N’den S’ye, mıknatısın içinde S’den N’ye döner. Elektrik alan çizgileriyle aynı başlangıç/bitiş kuralını kullanma. Bir noktadaki B yönü tek olduğundan alan çizgileri birbirini kesmez; bir sıfır alan noktası varsa yön tanımsız olabilir. Manyetik çizimleri yalnız kutuplar arasında açık, kopuk oklar olarak bırakmak kapalı yapıyı gizler.",
    ),
    section(
      "Pusula bulunduğu yerdeki toplam alana yönelir",
      "Pusula iğnesinin N ucu, bulunduğu noktadaki B yönüne teğet olacak biçimde yönelir. Mıknatısın geometrik merkezine bakmak veya en yakın kutba düz çizgi çekmek her noktada doğru yön vermez. İğne küçük ve alanı bozmayacak kabul edilir; sürtünme ve mekanik kısıtlar ihmal edilir.",
      "Birden fazla mıknatıs, akımlı tel veya Dünya alanı varsa pusula toplam alanı izler. Toplam B sıfırsa yalnız manyetik alan nedeniyle belirlenmiş tek bir yön yoktur. Atölyedeki çubuk alanı, dış bölgede yön ilişkisini göstermek için dipol yaklaşımıyla çizilir; gerçek her mıknatısın yakın yüzey alanının sayısal ölçümü değildir. Kutup yönü ters dönünce aynı noktadaki alan ve pusula yönü tersine döner.",
    ),
    section(
      "Akım da bir manyetik alan kaynağıdır",
      "Uzun, düz, ince bir telin çevresindeki manyetik alan çizgileri tele dik düzlemde eş merkezli çemberlerdir. Sağ elin başparmağını konvansiyonel akım yönüne çevirince bükülen parmakların yönü alanın dolanımını verir. Sayfadan dışarı doğru akım nokta (⊙), sayfa içine doğru akım çarpı (⊗) ile gösterilebilir.",
      "Sayfadan dışarı akım, sayfaya bakan kişi için saat yönünün tersinde B oluşturur. Telin sağındaki noktada B yukarı, üstündeki noktada sola yönelir. Akımı ters çevirince bütün dolaşım tersine döner. Elektron hareketini başparmak yönü seçmek metalde konvansiyonel akımı ters almak olur; önce I okunu belirle, sonra sağ el kuralını uygula.",
    ),
    section(
      "Düz telde I ve uzaklığı birlikte değiştir",
      "Hava/vakumda, uç etkileri ihmal edilen uzun düz tel için B=μ0I/(2πr); μ0=4π×10⁻⁷ T·m/A kullanılır. r tel eksenine dik uzaklıktır, tel boyunca ölçülen uzunluk değildir. Aynı ortamda B, I ile doğru; r ile ters orantılıdır. I iki kat ve r iki kat olursa B aynı kalır; yalnız bir değişkeni sayma.",
      "Bu1/r ilişkisini noktasal elektrik yükünün 1/r² alanıyla karıştırma. Teli kalın, kısa veya kıvrımlı yapan başka geometriler için aynı denklem koşulsuz geçerli değildir. Birimi tesla olan küçük değerleri μT’ye çevirirken 1 μT=10⁻⁶ T kullan. Kuvvet veya kaldırılan ağırlık B’nin başka bir adı değildir; manyetik kuvvet ayrıca yük, hareket, akım veya geometrinin koşullarını gerektirir.",
    ),
    section(
      "Elektromıknatısın kontrolü akım ve sarım düzenidir",
      "Bir bobinden akım geçince bobin çubuk mıknatıs gibi alan oluşturabilir. Uzun ideal solenoidin içindeki yaklaşık düzgün alan B≈μnI, n=N/ℓ sarım yoğunluğudur. Sabit ortam ve geometride daha çok sarım veya daha çok akım alanı artırabilir; aynı toplam sarımı daha uzun bobine yaymak alanı azaltır. Demir çekirdek alanı güçlendirebilir, fakat gerçek malzemenin doygunluk ve kalıcılık sınırları vardır.",
      "Akım yönü ters çevrilince bobinin kutupları değişir. Akım kesilince ideal akım kaynaklı alan ortadan kalkar; gerçek demirde kalıcı mıknatıslanma kalabilir. Zil, röle, vinç, hoparlör ve motor gibi örneklerde manyetik alanın hangi işi yaptığı farklıdır. Bir elektromıknatısın alanını yalnız pile bakarak bilmek için sarım ve geometri bilgisi de gerekir.",
    ),
    section(
      "Dünya alanı ve modellerin sınırları",
      "Dünya’nın alanı pusula için bir referans oluşturur; coğrafi eksenle manyetik eksen tam çakışmaz. Pusulanın N ucu coğrafi kuzey yakınlarına yöneldiğinden o bölgede çekici manyetik kutup S niteliği taşır. Manyetik sapma konuma ve zamana bağlı olabilir; pusulayı her yerde coğrafi kuzeye hatasız yönelen araç sayma.",
      "Dünya alanı yüklü parçacıkların hareketini etkiler; kutup ışıklarında parçacıkların atmosferle etkileşmesi rol oynar. Bazı canlıların yön bulmasında da manyetik algı katkı yapabilir. Bu bilgilerden bütün ışınım türlerinin alanla engellendiği veya gündelik her alanın aynı sağlık etkisini oluşturduğu sonucu çıkarılmaz. Kaynak metindeki genel sağlık ifadeleri, maruziyet koşulu ve bağımsız kanıt olmadan nedensel hükme çevrilmez; bu ünitede fiziksel yön, kaynak ve büyüklük ilişkileri öğretilir.",
    ),
  ],
  examples: [
    example(
      "Üç uç bilgisini zincirle",
      "X ve Y’nin ikisi de çubuk mıknatıs. X’in sol ucu N; X’in sağ ucu Y’nin solunu itiyor. Y’nin uçları nedir?",
      "Önce her çubuğun zıt uçlarını, sonra komşu uçların etkileşimini kullan.",
      [
        ["X’in sağı", "Aynı çubukta iki uç zıttır.", "X: N | S"],
        [
          "İtme",
          "X’in S sağı, Y’nin solunu itiyorsa Y’nin solu S’dir.",
          "Ysol=S",
        ],
        ["Y’nin sağı", "Y de iki kutuplu bir mıknatıstır.", "Y: S | N"],
      ],
      "Y’nin solu S, sağı N.",
      "Komşu S–S uçları birbirini iter; bütün verilenlerle uyumlu.",
      "Çekimle mıknatıslanmamış demiri ayırt etmek için ek bilgi gerekir; burada iki çubuk da mıknatıs verilmiştir.",
    ),
    example(
      "Telin yanındaki B’yi hesapla",
      "Hava/vakumda uzun düz tel 3 A taşıyor. Tel ekseninden 6 cm uzakta alan büyüklüğü? μ0=4π×10⁻⁷ T·m/A.",
      "Uzaklığı metreye çevir;2π ortak çarpanı sadeleştir.",
      [
        ["Uzaklık", "Dik uzaklık SI biriminde kullanılmalıdır.", "r=0,06 m"],
        [
          "Alan",
          "Uzun ince tel yaklaşımı verilmiştir.",
          "B=(4π×10⁻⁷·3)/(2π·0,06)=1×10⁻⁵ T",
        ],
        ["Birim", "Mikrotesla 10⁻⁶ T’dir.", "B=10 μT"],
      ],
      "B=10 μT.",
      "Aynı r’de 6 A olsaydı 20 μT; aynı I’de 12 cm olsaydı 5 μT.",
      "6’yı metre sanmak veya uzaklığı kareye almak farklı model kullanmaktır.",
    ),
    example(
      "Yönü nokta ile sabitle",
      "Uzun düz tel sayfadan dışarı konvansiyonel akım taşıyor. Telin sağındaki P ve üstündeki Q noktalarında B yönleri? Dünya alanı ihmal.",
      "Başparmağı sayfadan dışarı yönelt; çemberin her noktasındaki teğeti oku.",
      [
        [
          "Dolanım",
          "Sağ el kuralıyla dolaşım saat yönünün tersidir.",
          "I dışarı → B saat yönünün tersi",
        ],
        [
          "P noktası",
          "Sağ kenarda çemberin teğeti yukarı yönelir.",
          "BP yukarı",
        ],
        [
          "Q noktası",
          "Üstte saat yönünün tersinin teğeti sola gider.",
          "BQ sola",
        ],
      ],
      "P’de yukarı, Q’da sola.",
      "Akım içeri çevrilirse iki yön de tersine döner.",
      "Elektron yönünü başparmak yönü seçme veya B’yi tele radyal çizme.",
    ),
    example(
      "Sarım sayısı ile sarım yoğunluğunu ayır",
      "Uzun ideal bobinde aynı ortamda N iki kat, bobin boyuℓ iki kat yapılıyor; akım değişmiyor. İç B oranı?",
      "B≈μ(N/ℓ)I ifadesinde hangi çarpanın gerçekten değiştiğini bul.",
      [
        [
          "Sarım yoğunluğu",
          "Hem pay hem payda aynı oranda büyür.",
          "nyeni=2N/(2ℓ)=N/ℓ",
        ],
        [
          "Diğer koşullar",
          "Akım ve manyetik geçirgenlik aynı verilmiştir.",
          "Iyeni=I; μyeni=μ",
        ],
        ["Alan", "Üç çarpanın hiçbiri değişmedi.", "Byeni/Beski=1"],
      ],
      "İç alan büyüklüğü aynı kalır.",
      "Yalnız N iki katına çıksaydı sabitℓ’de alan iki kat olurdu; burada iki değişken var.",
      "Sarım sayısına bakıp bobinin boyunu yok sayma.",
    ),
  ],
  recall: [
    {
      prompt:
        "Mıknatıs ikiye bölününce kutup yapısı ve çekilen demir için kesin çıkarım nedir?",
      answer:
        "Her parça yine N–S taşır. Çekilen demir önceden kalıcı mıknatıs olmak zorunda değildir.",
    },
    {
      prompt: "Dış/iç alan çizgisi yönü ve pusulanın N ucu nasıl ilişkilidir?",
      answer:
        "Dışarıda N→S, içeride S→N; çizgi kapalıdır. Pusulanın N ucu bulunduğu noktadaki toplam B’ye teğettir.",
    },
    {
      prompt:
        "Sayfadan dışarı akımın sağında B ve I iki kat/r yarı olunca büyüklük ne olur?",
      answer:
        "Sağda B yukarıdır. Uzun telde B∝I/r olduğundan iki kat akım ve yarı uzaklık dört kat alan verir.",
    },
    {
      prompt: "Çok sarım kesin daha büyük bobin alanı demek midir?",
      answer:
        "Diğer koşulları kontrol et: alan sarım yoğunluğu N/ℓ, I ve ortama bağlıdır. ℓ de aynı oranda artarsa aynı I’de alan artmayabilir.",
    },
  ],
  questions: [
    [
      "İki çubuk mıknatısın birbirine bakan N ve N uçları için etkileşim nedir? Başka kuvvetler sonucu değiştirmiyor.",
      [
        "Çekim",
        "İtme",
        "Elektriksel nötrleşme",
        "Kutupların yok olması",
        "Zorunlu sıfır kuvvet",
      ],
      1,
      "Aynı mı, zıt mı olduklarını belirle.",
      "Aynı cins manyetik kutuplar birbirini iter. N–S karşılaşması çekim olurdu. Bu etkileşim kutupları yok etmez; iki mıknatısa eşit büyüklükte zıt yönlü kuvvetler uygulanır, hareketleri diğer mekanik koşullara bağlıdır.",
    ],
    [
      "Bir çubuk mıknatıs manyetik özelliği korunacak şekilde iki parçaya ayrılıyor. Temel modelde her parça ne taşır?",
      [
        "Biri yalnız N, diğeri yalnız S",
        "Her biri N ve S",
        "İkisi de yalnız N",
        "Yalnız elektrik yükü",
        "Hiç manyetik kutup kalmaz",
      ],
      1,
      "Mıknatısı kesmek tek başına kutupları ayırma yöntemi değildir.",
      "Her parça daha küçük birer iki kutuplu mıknatıs olur; her birinde N ve S vardır. Sadece geometrik olarak kesmek tek manyetik kutup üretmez. Bu yüzden iki parçayı yalnız N ve yalnız S olarak etiketlemek temel mıknatıs modeline uymaz.",
    ],
    [
      "Mıknatısın iki kutbundan da çekilebilen, başlangıçta kalıcı mıknatıs olduğu bilinmeyen bir cisim gözleniyor. Hangisi zorunlu değildir?",
      [
        "Cismin kalıcı mıknatıs olması",
        "Manyetik madde olabilmesi",
        "Demir olabilmesi",
        "Dış alanla mıknatıslanabilmesi",
        "Çekimin tek başına kutup adını belirlememesi",
      ],
      0,
      "Mıknatıslanmamış demir de her iki kutba çekilebilir.",
      "Çekim cismin önceden kalıcı mıknatıs olduğunu kanıtlamaz; demir gibi bir madde alanla mıknatıslanıp çekilebilir. Kutupları kesin ayırmak için örneğin bilinen kutuptan itme gibi ek bilgi gerekir. Her çekilen nesneyi kalıcı mıknatıs saymak hatadır.",
    ],
    [
      "Bir çubuk mıknatısın alan çizgilerinin yönü dışarıda ve mıknatıs içinde sırasıyla nasıldır?",
      [
        "N→S ve S→N",
        "S→N ve N→S",
        "Her ikisi N→S",
        "Her ikisi S→N",
        "Çizgiler yalnız dışında vardır ve açıktır",
      ],
      0,
      "Alan çizgileri kapalı eğri oluşturur.",
      "Dış alan N’den S’ye, mıknatıs içindeki dönüş S’den N’ye yönelir. Böylece kapalı çizgiler oluşur. Manyetik çizgileri elektrik yüklerinden çıkıp giren açık çizgilerle aynı biçimde düşünmek bu kapanmayı kaçırır.",
    ],
    [
      "Bir P noktasında toplam B vektörü sağa yönlü ve sıfırdan farklı. Serbest küçük pusulanın N ucu dengeye geldiğinde hangi yönü gösterir?",
      [
        "Sola",
        "Sağa",
        "Daima mıknatısın geometrik merkezine",
        "Daima yukarı",
        "Yönü alanla ilgisizdir",
      ],
      1,
      "Pusulanın N ucu bulunduğu yerdeki B’ye teğettir.",
      "Pusula toplam alan doğrultusuna yönelir ve N ucu B yönünü, burada sağı gösterir. Bir kaynağın merkezine düz çizgi çizmek her konumda doğru yön vermez. Sıfır alan olsaydı belirlenmiş tek manyetik yön olmayabilirdi; burada sıfır olmadığı verilmiştir.",
    ],
    [
      "Uzun düz tel sayfadan dışarı doğru konvansiyonel akım taşıyor. Dünya alanı ihmal. Telin sağındaki noktada B yönü nedir?",
      ["Sağa", "Sola", "Yukarı", "Aşağı", "Sayfa dışına"],
      2,
      "Başparmağı akıma çevir; çemberin sağındaki teğeti oku.",
      "Dışarı akım için sağ el kuralı saat yönünün tersinde dolaşım verir. Çemberin sağ tarafında teğet yukarıdır. B tele radyal veya tel boyunca değildir; tel çevresindeki çembere teğettir. Elektron yönünü akım yerine kullanmak aşağı sonucuna götürür.",
    ],
    [
      "Hava/vakumda uzun düz tel 6 A taşıyor. Tel ekseninden 3 cm uzakta B kaç μT? μ0=4π×10⁻⁷ T·m/A.",
      ["4", "10", "20", "40", "400"],
      3,
      "Önce r’yi metreye çevir; uzun tel için B=μ0I/(2πr) kullan.",
      "B=2×10⁻⁷·6/0,03=4×10⁻⁵ T=40 μT. Santimetreyi metreye dönüştürmek gerekir. Uzaklık bu geometride birinci kuvvettedir; noktasal elektrik alanın ters kare kuralı bu sorunun bağıntısı değildir.",
    ],
    [
      "Aynı ortamda uzun düz telin akımı iki katına çıkarılıyor; gözlem noktasının tele dik uzaklığı yarıya indiriliyor. B yeni/eski oranı?",
      ["1/4", "1/2", "1", "2", "4"],
      4,
      "B, I ile doğru ve r ile ters orantılıdır.",
      "Byeni/Beski=(2I/I)·(r/(r/2))=2·2=4. Yalnız akımı sayıp 2 almak uzaklığın etkisini atlar. Uzaklığı kareye almaksa uzun tel yerine başka kaynak geometrisi kullanmak olur.",
    ],
    [
      "Uzun ideal bobinde ortam ve akım aynı kalıyor; toplam sarım N ile bobin boyuℓ ikisi de iki katına çıkarılıyor. B≈μ(N/ℓ)I modeline göre alan ne olur?",
      [
        "Dört katına çıkar",
        "İki katına çıkar",
        "Aynı kalır",
        "Yarıya iner",
        "Sıfır olur",
      ],
      2,
      "Sarım yoğunluğu N/ℓ’yi karşılaştır.",
      "Yeni sarım yoğunluğu 2N/(2ℓ)=N/ℓ; I veμ da değişmediğinden B aynıdır. Daha çok sarım tek başına yeterli değildir, sarımların hangi uzunluğa yayıldığı da önemlidir. Bu sonuç uzun ideal bobin yaklaşımı içindir.",
    ],
    [
      "Pusulanın N ucu, dış etkiler ihmal edildiğinde Dünya’nın coğrafi kuzey yakınına yöneliyor. Bu bölgenin çekim bakımından manyetik niteliği için uygun yorum?",
      [
        "Nitelik olarak S gibi davranır; coğrafi ve manyetik eksenler tam aynı olmak zorunda değildir",
        "Kesin N’dir ve eksenler her yerde aynıdır",
        "Dünya’nın alanı yoktur",
        "Pusula yalnız elektrik alanını ölçer",
        "Dünya bütün ışınımları manyetik alanla durdurur",
      ],
      0,
      "N ucu zıt manyetik kutba çekilir; coğrafi ad ile manyetik kutup adını ayır.",
      "Pusulanın N ucu çekildiği için coğrafi kuzey yakınındaki bölge manyetik S niteliğinde davranır. Coğrafi ve manyetik eksenler tam çakışmaz; yerel sapma olabilir. Bu gözlem bütün ışınımların engellendiğini veya pusulanın elektrik alanı ölçtüğünü göstermez.",
    ],
  ],
};

const packs = [expansion, phase, staticElectricity, current, magnetism];
export const forge093PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge093PhysicsGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: p.source,
}));
export const forge093PhysicsLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "tyt-fizik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  tags: [p.topic, p.id],
  source: txt(p.source),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: p.questions.map(
    ([prompt, options, answer, hint, explanation], i) => {
      const shift = (i * 2 + 1) % 5;
      return {
        id: `${p.id}-q${i + 1}`,
        prompt: txt(prompt),
        options: options.map((_, j) => txt(options[(j - shift + 5) % 5])),
        answer: (answer + shift) % 5,
        hint: txt(hint),
        explanation: txt(explanation),
        skill: p.id,
      };
    },
  ),
}));

const positive = (...values: number[]) => {
  if (!values.every((v) => Number.isFinite(v) && v > 0))
    throw new RangeError("Pozitif ve sonlu değer gerekir.");
};
export function expansionState(
  lengthM: number,
  alphaMicro: number,
  deltaT: number,
  gapMm: number,
) {
  positive(lengthM, alphaMicro);
  if (![deltaT, gapMm].every(Number.isFinite) || gapMm < 0)
    throw new RangeError(
      "Sonlu sıcaklık farkı ve negatif olmayan boşluk gerekir.",
    );
  const strain = alphaMicro * 1e-6 * deltaT;
  if (1 + strain <= 0)
    throw new RangeError("Küçük genleşme modeli dışında uzunluk.");
  return {
    strain,
    changeMm: lengthM * strain * 1000,
    finalM: lengthM * (1 + strain),
    projectedGapMm: gapMm - lengthM * strain * 1000,
    holeDiameterMm: 20 * (1 + strain),
  };
}
export function phaseHeating(massG: number, qJ: number) {
  positive(massG);
  if (!Number.isFinite(qJ)) throw new RangeError("Sonlu enerji gerekir.");
  const edges = [
    0,
    massG * 21,
    massG * 355,
    massG * 775,
    massG * 3035,
    massG * 3075,
  ];
  const energy = Math.min(edges[5], Math.max(0, qJ));
  let temperature: number,
    solid = 0,
    liquid = 0,
    gas = 0,
    stage: string;
  if (energy < edges[1]) {
    temperature = -10 + energy / (massG * 2.1);
    solid = 1;
    stage = "Buz ısınıyor";
  } else if (energy < edges[2]) {
    temperature = 0;
    liquid = (energy - edges[1]) / (massG * 334);
    solid = 1 - liquid;
    stage = "Buz eriyor";
  } else if (energy < edges[3]) {
    temperature = (energy - edges[2]) / (massG * 4.2);
    liquid = 1;
    stage = "Su ısınıyor";
  } else if (energy < edges[4]) {
    temperature = 100;
    gas = (energy - edges[3]) / (massG * 2260);
    liquid = 1 - gas;
    stage = "Su kaynıyor";
  } else {
    temperature = 100 + (energy - edges[4]) / (massG * 2);
    gas = 1;
    stage = "Buhar ısınıyor";
  }
  return {
    temperature,
    solid,
    liquid,
    gas,
    stage,
    energy,
    edges,
    maximum: edges[5],
  };
}
export function iceWaterMix(
  waterG: number,
  waterCelsius: number,
  iceG: number,
) {
  positive(waterG, iceG);
  if (!Number.isFinite(waterCelsius) || waterCelsius < 0 || waterCelsius >= 100)
    throw new RangeError("0–100 °C arasında sıvı su gerekir.");
  const available = waterG * 4.2 * waterCelsius,
    meltNeed = iceG * 334;
  const melted = Math.min(iceG, available / 334),
    remaining = iceG - melted;
  return {
    available,
    meltNeed,
    melted,
    remaining,
    temperature:
      available > meltNeed
        ? (available - meltNeed) / ((waterG + iceG) * 4.2)
        : 0,
    liquidG: waterG + melted,
  };
}
export function inductionState(
  step: number,
  rodSign: number,
  disconnectFirst: boolean,
) {
  if (![step, rodSign].every(Number.isFinite) || Math.abs(rodSign) !== 1)
    throw new RangeError("Sonlu adım ve yük işareti gerekir.");
  const s = Math.min(4, Math.max(0, Math.round(step))),
    sign = rodSign < 0 ? -1 : 1;
  const net = s >= 2 && (disconnectFirst || s === 2) ? -4 * sign : 0;
  return {
    net,
    earthNet: -net,
    rodPresent: s >= 1 && (disconnectFirst ? s <= 3 : s <= 2),
    grounded: s === 2 || (!disconnectFirst && s === 3),
  };
}
export function circuitState(
  voltage: number,
  r1: number,
  r2: number,
  parallel: boolean,
  closed: boolean,
) {
  positive(r1, r2);
  if (!Number.isFinite(voltage) || voltage < 0)
    throw new RangeError("Negatif olmayan sonlu gerilim gerekir.");
  const resistance = parallel ? (r1 * r2) / (r1 + r2) : r1 + r2;
  const total = closed ? voltage / resistance : 0;
  const i1 = closed ? (parallel ? voltage / r1 : total) : 0,
    i2 = closed ? (parallel ? voltage / r2 : total) : 0;
  return {
    resistance,
    total,
    i1,
    i2,
    v1: i1 * r1,
    v2: i2 * r2,
    p1: i1 * i1 * r1,
    p2: i2 * i2 * r2,
  };
}
export function wireField(
  currentA: number,
  distanceCm: number,
  angleDegrees: number,
  outward: boolean,
) {
  positive(distanceCm);
  if (![currentA, angleDegrees].every(Number.isFinite) || currentA < 0)
    throw new RangeError("Sonlu akım ve açı gerekir.");
  const theta = (angleDegrees * Math.PI) / 180,
    sign = outward ? 1 : -1;
  return {
    microTesla: (20 * currentA) / distanceCm,
    bx: currentA === 0 ? 0 : -sign * Math.sin(theta),
    by: currentA === 0 ? 0 : sign * Math.cos(theta),
  };
}
export function dipoleDirection(angleDegrees: number, northRight: boolean) {
  if (!Number.isFinite(angleDegrees))
    throw new RangeError("Sonlu açı gerekir.");
  const angle = (angleDegrees * Math.PI) / 180,
    sign = northRight ? 1 : -1;
  const bx = sign * (3 * Math.cos(angle) ** 2 - 1),
    by = sign * 3 * Math.cos(angle) * Math.sin(angle),
    magnitude = Math.hypot(bx, by);
  return { bx: bx / magnitude, by: by / magnitude };
}
