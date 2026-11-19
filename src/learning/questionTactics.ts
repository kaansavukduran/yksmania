import { questionLesson } from "./sectionFigures/hintFigure";
import { lessonTopic, topicLessons } from "../domain/studyPlan";
import { methodTactics } from "./tacticLibrary";

/*
 * Question-type tactics: short, exam-oriented approaches shown in the first
 * help panel. Each tactic is scoped to topic guides and fires only when the
 * question's own wording has the pattern it is written for. These are
 * original study notes, not official ÖSYM material.
 */
export interface QuestionTactic {
  id: string;
  guides: string[];
  match: RegExp;
  title: string;
  steps: string[];
}

export const questionTactics: QuestionTactic[] = [
  {
    id: "aci-hesabi",
    guides: ["tyt-geo-temel-acilar-031", "tyt-geo-acilar-kaynak-pekitirme-032", "tyt-geo-ucgende-acilar-031"],
    match: /kaç derece|ölçüsü kaç|açı(sı)? kaç/i,
    title: "Açı hesabı soruları",
    steps: [
      "Verilen her açıyı şekle yaz; bilinmeyeni tek harfle (x) göster.",
      "Her eşitliğin gerekçesini seç: ters açı, doğrusal çift (180°), üçgen iç açı toplamı (180°) ya da paralellik.",
      "Bir denklem kur; x'i bulduktan sonra sorulan açıyı x'e geri koyarak hesapla.",
      "Şekil ölçekli değildir: sonucu göz kararıyla değil, kurduğun eşitlikle denetle.",
    ],
  },
  {
    id: "paralel-kesen",
    guides: ["tyt-geo-temel-acilar-031", "tyt-geo-acilar-kaynak-pekitirme-032"],
    match: /paralel/i,
    title: "Paraleller ve kesen",
    steps: [
      "İki açının konumunu oku: içeride mi dışarıda mı, kesenin aynı yanında mı karşı yanında mı?",
      "Yöndeş, iç ters, dış ters → eşit; aynı yandaki iç açılar → toplam 180°.",
      "Kırık çizgi (zikzak) varsa kırılma noktasından paralellere paralel yardımcı doğru çiz; açıyı iki parçaya böl.",
    ],
  },
  {
    id: "ucgen-esitsizligi-aralik",
    guides: ["tyt-geo-ucgen-esitsizligi-031"],
    match: /aralık|kaç farklı değer|en büyük|en küçük|oluşturur/i,
    title: "Üçüncü kenar aralığı",
    steps: [
      "İki kenar a ve b ise |a − b| < x < a + b; uçlar dahil değildir.",
      "Tam sayı isteniyorsa aralıktaki tam sayıları say: (a + b) − |a − b| − 1 adet.",
      "Ortak kenarlı iki üçgende iki aralığın kesişimini al; çevre gibi ek koşulu en sona uygula.",
      "Üçlü sorularında yalnız en uzun kenarı diğer ikisinin toplamıyla karşılaştırmak yeter.",
    ],
  },
  {
    id: "kenar-aci-siralama",
    guides: ["tyt-geo-ucgen-esitsizligi-031"],
    match: /sırala|sırası/i,
    title: "Kenar–açı sıralaması",
    steps: [
      "Her kenarı karşısındaki açıyla eşleştir: a ↔ A, b ↔ B, c ↔ C.",
      "Büyük açının karşısında büyük kenar vardır; sırayı doğrudan taşı.",
      "Eksik açı varsa önce 180° kuralıyla bul.",
    ],
  },
  {
    id: "ucgen-turu",
    guides: ["tyt-geo-ucgen-esitsizligi-031", "tyt-geo-dik-ucgen-031"],
    match: /türde|sınıflandır|dik üçgen oluşturur/i,
    title: "Açılarına göre tür",
    steps: [
      "Önce üçgen kurulabiliyor mu bak (en uzun < diğer ikisinin toplamı).",
      "En uzun kenarı c seç: c² = a² + b² dik, c² < a² + b² dar, c² > a² + b² geniş açılı.",
      "3–4–5, 5–12–13, 8–15–17 ve katlarını tanımak hesabı kısaltır.",
    ],
  },
  {
    id: "dik-ucgen-oklid",
    guides: ["tyt-geo-dik-ucgen-031"],
    match: /AH|yükseklik|hipotenüs/i,
    title: "Hipotenüse yükseklik (Öklid)",
    steps: [
      "Dik açıyı ve hipotenüsü işaretle; H'nin hipotenüs üzerinde olduğunu yaz.",
      "h² = p·q, AB² = BC·BH, AC² = BC·HC: her dik kenar kendi izdüşümüyle eşleşir.",
      "Alan iki yoldan aynıdır: AB·AC = BC·AH; sonucu bununla denetle.",
    ],
  },
  {
    id: "benzerlik-oran",
    guides: ["tyt-geo-eslik-benzerlik-031", "alan-donusumleri"],
    match: /oran|benzer|alan/i,
    title: "Benzerlik ve alan oranı",
    steps: [
      "Benzerliği önce kanıtla (AA, KAK, KKK); köşe sırasını aynı yaz.",
      "Uzunluk oranı k ise alan oranı k², hacim oranı k³.",
      "Alan oranı verilmişse uzunluk oranı için karekök al; parça/parça ile parça/bütün oranını karıştırma.",
    ],
  },
  {
    id: "merkezler",
    guides: ["tyt-geo-ucgen-merkezleri-031", "tyt-geo-ucgende-acilar-031"],
    match: /açıortay|kenarortay|ağırlık|merkez|BIC|I noktası/i,
    title: "Yardımcı eleman ve merkezler",
    steps: [
      "İşaretten çizgiyi tanı: eş açı → açıortay, eş parça → kenarortay, köşeden 90° → yükseklik.",
      "İki iç açıortay I'da kesişiyorsa ∠BIC = 90° + A/2.",
      "Ağırlık merkezi kenarortayı köşeden 2 : 1 böler; açıortay karşı kenarı komşu kenarlar oranında böler.",
    ],
  },
  {
    id: "cokgen-aci",
    guides: ["tyt-geo-cokgenler-032", "tyt-geo-dortgen-hiyerarsi-032"],
    match: /iç açı|dış açı|kenarlı|gen\b|genin|köşegen/i,
    title: "Çokgen açı ve köşegen formülleri",
    steps: [
      "İç açılar toplamı (n − 2)·180°, dış açılar toplamı 360°.",
      "Düzgün çokgende bir dış açı 360°/n; iç açıdan n'yi bulmak için önce dış açıya geç: n = 360°/(180° − iç açı).",
      "Köşegen sayısı n(n − 3)/2; bir köşeden n − 3 köşegen, n − 2 üçgen.",
    ],
  },
  {
    id: "dortgen-ozellik",
    guides: ["tyt-geo-dortgen-hiyerarsi-032", "tyt-geo-paralelkenar-ozel-dortgenler-032", "tyt-geo-yamuk-deltoid-032"],
    match: /zorunlu|kesinlikle|hangisi doğru|ek koşul/i,
    title: "“Kesinlikle doğru” dörtgen soruları",
    steps: [
      "Verilen aileyi tam adlandır (yamuk, paralelkenar, dikdörtgen…); daha özel sınıfın özelliğini varsayma.",
      "Her şık için karşı örnek dene: kare olmayan dikdörtgen, eşkenar olmayan paralelkenar gibi.",
      "Çizimde dik ya da eşit görünen hiçbir şey veri değildir.",
    ],
  },
  {
    id: "yamuk-orta-taban",
    guides: ["tyt-geo-yamuk-deltoid-032", "tyt-geo-dortgen-hiyerarsi-032"],
    match: /orta taban|orta nokta|tabanları|KL/i,
    title: "Yamukta orta taban",
    steps: [
      "Orta taban = (a + c)/2; alan = orta taban × yükseklik.",
      "Köşegenler orta tabanı c/2, (a − c)/2, c/2 olarak böler.",
      "Yükseklik eğik yan kenar değildir; dikme indirip dik üçgen kur.",
    ],
  },
  {
    id: "cisim-hacim-alan",
    guides: ["tyt-geo-dik-prizmalar-032", "tyt-geo-piramitler-032"],
    match: /hacim|yüzey|alan|ayrıt|köşegen/i,
    title: "Cisim soruları",
    steps: [
      "Prizma: V = taban alanı × h; piramit: V = taban alanı × h / 3.",
      "Yüzey alanı için açınımı düşün: iki taban (piramitte bir) + yan yüzler.",
      "Piramitte üç uzunluğu ayır: dik yükseklik h, yan yüz yüksekliği ℓ, yan ayrıt e; her biri ayrı dik üçgende.",
      "Ölçek k ise alan k², hacim k³ katına çıkar.",
    ],
  },
  {
    id: "ayna-mercek-denklem",
    guides: ["kuresel-aynalar", "mercekler"],
    match: /f\s*=|u\s*=|odak|görüntü/i,
    title: "Ayna/mercek denklemi soruları",
    steps: [
      "İşaretleri baştan yaz: çukur ayna ve yakınsak mercekte f > 0, tümsek ayna ve ıraksak mercekte f < 0; gerçek cisim u > 0.",
      "1/f = 1/u + 1/v ile v'yi, m = −v/u ile büyütmeyi bul.",
      "v > 0 gerçek, v < 0 sanal; m < 0 ters, m > 0 düz; |m| boy oranı.",
      "Cismin F–2F'ye göre yerini bilmek sonucu hesap yapmadan doğrulamanı sağlar.",
    ],
  },
  {
    id: "kirilma-snell",
    guides: ["isigin-kirilmasi"],
    match: /kritik|indis|n₁|n=|sürat|derinlik/i,
    title: "Kırılma soruları",
    steps: [
      "Açıları yüzeyden değil normalden ölç (yüzeyle 35° → normalle 55°).",
      "n₁ sin i = n₂ sin r; çok yoğuna geçen ışın normale yaklaşır.",
      "Tam iç yansıma için çok yoğundan az yoğuna geçiş ve i > i_c gerekir; sin i_c = n₂/n₁.",
      "v = c/n; frekans sınırda değişmez, dalga boyu değişir.",
    ],
  },
  {
    id: "golge-benzerlik",
    guides: ["golge-yari-golge"],
    match: /gölge/i,
    title: "Gölge soruları",
    steps: [
      "Kaynaktan cismin uçlarına teğet doğrular çiz; benzer üçgenleri kaynaktan başlat.",
      "Gölge boyu H = h·(kaynak–perde)/(kaynak–cisim).",
      "İki kaynakta her gölgeyi ayrı çiz; örtüşen kısım tam gölge, tek gölge yarı gölgedir.",
      "Çap k katı olursa alan k² katı olur.",
    ],
  },
  {
    id: "duzlem-ayna",
    guides: ["duzlem-ayna"],
    match: /ayna/i,
    title: "Düzlem ayna soruları",
    steps: [
      "Görüntü aynaya göre simetriktir: xg = 2xm − xc.",
      "Açıları normalden ölç; ayna θ dönerse yansıyan ışın 2θ döner.",
      "Tam boy görmek için ayna boyu kişi boyunun yarısı yeter; aynaya uzaklık bunu değiştirmez.",
    ],
  },
  {
    id: "koklu-sadelestirme",
    guides: ["koklu-sayilar"],
    match: /sade|işlem|√\d+\s*[+−-]/i,
    title: "Köklü ifadeyi sadeleştirme",
    steps: [
      "Kök içini en büyük tam kare çarpan ile kalan olarak ayır: √72 = √(36·2) = 6√2.",
      "Toplama-çıkarmada yalnız aynı kök içleri birleşir: önce hepsini aynı √m'ye çevir.",
      "√a + √b ≠ √(a + b); sonucu yaklaşık değerle denetleyebilirsin.",
    ],
  },
  {
    id: "koklu-esllenik",
    guides: ["koklu-sayilar"],
    match: /rasyonel|payda/i,
    title: "Paydayı rasyonelleştirme",
    steps: [
      "Tek köklü paydada pay ve paydayı aynı köklü ifadeyle çarp.",
      "a ± √b paydasında eşlenik a ∓ √b ile çarp: (a + √b)(a − √b) = a² − b.",
      "Değer değişmez, yalnız yazılış değişir; payı da çarpmayı unutma.",
    ],
  },
  {
    id: "koklu-denklem",
    guides: ["koklu-sayilar"],
    match: /denklem|çözüm kümesi|tanım kümesi/i,
    title: "Köklü denklem ve tanım kümesi",
    steps: [
      "Önce koşulu yaz: çift dereceli kök içi ≥ 0, paydadaki kök içi > 0, √(...) = x ise x ≥ 0.",
      "Kökü yalnız bırak, sonra kare al.",
      "Bulduğun her adayı ilk denklemde dene; kare alma sahte kök üretebilir.",
    ],
  },
  {
    id: "analitik-uzaklik",
    guides: ["noktanin-analitigi", "dogrunun-analitigi", "cemberin-analitigi"],
    match: /uzaklı|uzaklığ|\|AB\||kaç birim/i,
    title: "Analitik uzaklık soruları",
    steps: [
      "İki nokta: √((Δx)² + (Δy)²); önce farkları yaz, işaret hatası kalmaz.",
      "Noktadan doğruya: |ax₀ + by₀ + c| / √(a² + b²).",
      "Paralel iki doğru arası: katsayıları eşitle, sonra |c₁ − c₂| / √(a² + b²).",
    ],
  },
  {
    id: "analitik-dogru",
    guides: ["dogrunun-analitigi"],
    match: /eğim|denklemi|kesim|dik/i,
    title: "Doğru denklemi soruları",
    steps: [
      "Eğim m = Δy/Δx; ax + by + c = 0'da m = −a/b.",
      "Nokta ve eğimden: y − y₀ = m(x − x₀); düşey doğru x = x₀ ayrı yazılır.",
      "Paralel: eğimler eşit; dik: m₁·m₂ = −1 (yatay–düşey çifti ayrıca).",
    ],
  },
  {
    id: "cember-denklem",
    guides: ["cemberin-analitigi"],
    match: /çember|merkez|yarıçap|teğet/i,
    title: "Çember denklemi soruları",
    steps: [
      "Genel denklemi tam kareye tamamla: merkez (−D/2; −E/2), r² = (D/2)² + (E/2)² − F.",
      "Doğru–çember durumu için merkezin doğruya uzaklığını r ile karşılaştır.",
      "Teğet, değme noktasındaki yarıçapa diktir.",
    ],
  },
  {
    id: "donusum",
    guides: ["donusum-oteleme-donme", "donusum-yansima-simetri", "noktanin-analitigi"],
    match: /öteleni|döndür|yansı|simetri|görüntü/i,
    title: "Dönüşüm soruları",
    steps: [
      "Öteleme: (x + h; y + k). x eksenine yansıma (x; −y), y eksenine (−x; y), orijine (−x; −y), y = x'e (y; x).",
      "Orijin etrafında 90° (saatin tersi): (x; y) → (−y; x).",
      "Merkez orijin değilse önce merkezi çıkar, dönüştür, sonra geri ekle.",
      "Sonucu kontrol et: simetride orta nokta aynada/merkezde olmalı.",
    ],
  },
  {
    id: "is-net-is",
    guides: ["enerji-ve-hareket"],
    match: /net iş|işi (ve|nedir|kaç)|yaptığı iş/i,
    title: "İş ve net iş soruları",
    steps: [
      "Her kuvveti ayrı yaz: W = F·d·cosθ. Hareket yönündeki kuvvet +, zıt yöndeki −, dik kuvvet (normal, dikey ağırlık) 0 iş yapar.",
      "Net iş = bütün işlerin işaretli toplamıdır; sonra Wnet = ΔK = K_son − K_ilk kullan.",
      "Kuvvet–konum grafiği verilmişse iş, grafiğin altındaki işaretli alandır; eksen altındaki alan negatif sayılır.",
    ],
  },
  {
    id: "enerji-bilancosu",
    guides: ["enerji-ve-hareket"],
    match: /kinetik enerji|iç enerji|mekanik enerji|kinetik ve/i,
    title: "Enerji bilançosu kur",
    steps: [
      "Başlangıç ve son anı seç; her an için K = ½mv², U = mgh (aynı referans!), yay için ½kx² yaz.",
      "Girişler + başlangıç enerjileri = son enerjiler + sürtünmeyle iç enerjiye geçen kısım.",
      "Sabit hızla yükselen cisimde K değişmez ama U artar: mekanik enerji artar. “Sürtünme yok” tek başına korunum demek değildir; dış kuvvet iş yapıyorsa enerji değişir.",
      "Sonuçta K negatif çıkarsa cisim o noktaya ulaşamaz; duruş noktasını ayrıca bul.",
    ],
  },
  {
    id: "guc-verim",
    guides: ["enerji-ve-hareket"],
    match: /güç|verim|kWh|yararlı/i,
    title: "Güç ve verim",
    steps: [
      "Enerji = güç × süre. Süreyi saniyeye (J için) ya da saate (kWh için) çevir; 1 kWh = 3,6 × 10⁶ J.",
      "Verim = yararlı çıktı / toplam giriş (aynı süre aralığında). Kalan enerji yok olmaz, başka biçime gider.",
      "Ardışık aygıtlarda verimler çarpılır, toplanmaz.",
    ],
  },
  {
    id: "yay-kuvvet-enerji",
    guides: ["enerji-ve-hareket"],
    match: /yay|Hooke/i,
    title: "Yay kuvveti ve yay enerjisi",
    steps: [
      "Kuvvet F = −kx sapmayla doğrusal, enerji U = ½kx² karesel değişir: sapma 2 katına çıkınca kuvvet 2, enerji 4 kat olur.",
      "Uzatma ile sıkıştırma aynı |x| için aynı enerjiyi verir; yalnız kuvvetin yönü terstir.",
      "Eşit enerji sorularında k·x² sabittir; k oranını karekökle karıştırma.",
    ],
  },
  {
    id: "dalga-temel-iliskiler",
    guides: ["dalgalara-giris", "su-dalgalari", "yay-dalgalari"],
    match: /frekans|periyot|dalga boyu|titreşim|sürati/i,
    title: "f, T, λ, v soruları",
    steps: [
      "N titreşim t sürede: f = N/t, T = 1/f. y–t grafiğinde tepe aralığı T, y–x grafiğinde tepe aralığı λ'dır.",
      "v = λ·f. Sürat ortama bağlıdır: aynı ortamda kaynak frekansı artarsa v sabit kalır, λ küçülür.",
      "Ortam değişirse frekans korunur (kaynak aynı): λ₂/λ₁ = v₂/v₁.",
      "Birimi denetle: cm ile Hz çarpımı cm/s verir.",
    ],
  },
  {
    id: "atma-sinir",
    guides: ["yay-dalgalari"],
    match: /uç|ipe|ipten|μ|örtüş|uzanım/i,
    title: "Yansıma, iletim ve üst üste binme",
    steps: [
      "Sabit uç: atma ters döner (tepe → çukur). Serbest uç: ters dönmez.",
      "Hafiften ağıra: yansıyan ters, iletilen düz ve daha yavaş. Ağırdan hafife: yansıyan düz, iletilen düz ve daha hızlı. İletilen atma ters dönmez.",
      "Aynı noktada örtüşen uzanımları işaretleriyle topla; karşılaştıktan sonra atmalar biçimlerini koruyarak yoluna devam eder.",
      "Atmanın önündeki noktalar dengeden uzaklaşır, arkasındakiler dengeye yaklaşır.",
    ],
  },
  {
    id: "su-dalgasi-aci",
    guides: ["su-dalgalari"],
    match: /açı|engel|kırılma/i,
    title: "Su dalgasında açı soruları",
    steps: [
      "Açıları sınırın normalinden ölç; engelle verilen açının 90°'ye tümlerini al.",
      "Yansımada gelme = yansıma; f, λ ve sürat değişmez.",
      "Kırılmada sin i / sin r = v₁/v₂ = λ₁/λ₂. Yavaş (sığ) bölgeye giren ışın normale yaklaşır.",
    ],
  },
  {
    id: "q-mcdt",
    guides: ["isi-ve-sicaklik"],
    match: /hâl değiştirmeden|c=|öz ısı|ısı sığası|aldığı enerji|işaretli Q/i,
    title: "Q = mcΔT ve ısı sığası",
    steps: [
      "Önce hâl değişimi var mı bak; yoksa Q = m·c·(T_son − T_ilk). Kütle birimini c'nin birimine uydur (g ↔ kg).",
      "Isınmada Q pozitif, soğumada negatif; soru “verdiği ısı” diyorsa büyüklüğü yaz.",
      "Isı sığası C = m·c örneğe, öz ısı c maddeye bağlıdır. T–Q grafiğinde eğim 1/C, Q–ΔT grafiğinde C'dir.",
      "Sıcaklık farkı °C ve K'de aynı sayıdır.",
    ],
  },
  {
    id: "isil-denge",
    guides: ["isi-ve-sicaklik", "hal-degisimi"],
    match: /denge|karışıyor|temas|yalıtılmış/i,
    title: "Isıl denge soruları",
    steps: [
      "Alınan ısı = verilen ısı: C₁(Td − T₁) + C₂(Td − T₂) = 0 → Td = (C₁T₁ + C₂T₂)/(C₁ + C₂).",
      "Td her zaman iki ilk sıcaklığın arasındadır ve ısı sığası büyük olanın ilk sıcaklığına yakındır.",
      "Sıcaklığı hiç değişmeyen cisim hâl değiştiriyordur (örneğin erime sıcaklığında buz).",
      "Buz varsa önce sına: sıcak su 0 °C'ye kadar ne kadar enerji verebilir, buzu eritmek ne kadar ister? Yetmezse Td = 0 °C ve buzun bir kısmı kalır.",
    ],
  },
  {
    id: "genlesme-karsilastir",
    guides: ["genlesme"],
    match: /uzama|α|γ|genleş|boşluk|taşma|şerit/i,
    title: "Genleşme soruları",
    steps: [
      "ΔL = α·L₀·ΔT; alan için 2α, hacim için 3α kullan (soru β ya da γ verdiyse onu doğrudan kullan).",
      "Aynı ΔT'de α büyük olan daha çok uzar, soğutunca daha çok kısalır: halka–silindir sorularında soğutunca α'sı büyük silindir halkadan rahat geçer.",
      "Kapta sıvı: taşan = (γ_sıvı − γ_kap)·V₀·ΔT. Özdeş kaplarda önce taşan, görünen genleşmesi büyük olandır.",
      "Bimetalde α büyük olan dış yayda kalır. Su 0–4 °C arasında ısınınca hacmi küçülür.",
    ],
  },
  {
    id: "hal-degisimi-enerji",
    guides: ["hal-degisimi"],
    match: /buz|erime|eritmek|yoğuşma|L=|Lf/i,
    title: "Hâl değişimi enerji basamakları",
    steps: [
      "Süreci basamaklara ayır: ısıtma (mcΔT) → hâl değişimi (mL, sıcaklık sabit) → ısıtma... Her basamağın enerjisini ayrı yaz, sonra topla.",
      "mL'deki kütle yalnız hâl değiştiren kısmın kütlesidir; L ve m birimleri uyumlu olmalı (J/g ile g).",
      "Erime ısısı = donma ısısı, buharlaşma ısısı = yoğuşma ısısı; geçiş sıcaklıkları kütleye bağlı değildir.",
      "Sabit güçte süre = enerji / güç: güç iki katına çıkınca aynı geçiş yarı sürede biter.",
    ],
  },
  {
    id: "mitoz-sayim",
    guides: ["mitoz"],
    match: /kromozom|kromatit|DNA|anafaz|metafaz|kutup|2n/i,
    title: "Mitozda sayım soruları",
    steps: [
      "Önce evreyi ve alanı yaz: bütün hücre mi, tek kutup mu, tek yavru mu?",
      "Kromozom = sentromer sayısı. S'den sonra kromozom sayısı aynı, DNA molekülü ve kromatit iki katı.",
      "Anafazda kardeşler ayrılınca bütün hücrede kromozom sayısı anlık iki katı olur; DNA artmaz. Bir kutup başlangıç sayısını taşır.",
      "Sitokinez sonrası her yavru 2n ve 2C alır; iki yavrunun toplam DNA'sı 4C'dir, DNA kaybolmaz.",
    ],
  },
  {
    id: "interfaz-ayikla",
    guides: ["mitoz"],
    match: /interfaz|denetim|bölünemez|bölünmez|G₀|alyuvar|sinir hücre/i,
    title: "İnterfaz, denetim ve bölünmeyen hücreler",
    steps: [
      "İnterfazda olanlar: büyüme, organel çoğalması, solunum, protein sentezi, DNA eşlenmesi (S). Olmayan: iğ ipliğinin kromozoma bağlanması (mitoz).",
      "“Kromozom sayısı iki katına çıkar” interfaz için yanlıştır; iki katına çıkan DNA miktarıdır.",
      "Olgun memeli alyuvarı çekirdeksiz olduğu için bölünemez; sinir ve çizgili kas hücreleri genellikle bölünmez (G₀).",
      "Karaciğer hücresi uyarıyla döngüye dönebilir, bağırsak epiteli sürekli bölünür: “özelleşmiş = bölünemez” genellemesi yapma.",
      "Denetim noktası seçerken zamana bak: G₁ büyüklük ve sinyal, G₂ eşlenmiş DNA'nın hasarı, M iğ ipliği–kinetokor bağlantısı.",
    ],
  },
  {
    id: "mayoz-sayim",
    guides: ["mayoz"],
    match: /tetrat|mayoz|gamet|homolog|krossing|kiyazma/i,
    title: "Mayozda sayım ve ayrılma soruları",
    steps: [
      "Tetrat sayısı = homolog çift sayısı = n. Gamette 18 kromozom varsa n = 18, profaz I'de 18 tetrat.",
      "Mayoz I homologları ayırır (2n → n, kardeşler bağlı kalır); Mayoz II kardeşleri ayırır (n kalır, DNA 2C → 1C). Arada S evresi yoktur.",
      "Anafaz I'de kromozom sayısı artmaz; anafaz II'de hücre başına anlık 2n olur.",
      "Çeşitlilik: krossing over (profaz I, kardeş olmayan kromatitler) + metafaz I bağımsız dizilim (2ⁿ). Krossing over yoksa da gametler farklı olabilir.",
    ],
  },
  {
    id: "atom-sayim",
    guides: ["atomun-temel-tanecikleri"],
    match: /proton|nötron|elektron|kütle numarası|atom numarası|iyon/i,
    title: "p, n, e ve yük hesabı",
    steps: [
      "Tablo kur: A, Z, q, p, n, e. Z'yi doğrudan p hanesine yaz.",
      "n = A − Z; e = Z − q (q işaretli: 3+ için +3, 2− için −2). Ters soru: Z = e + q.",
      "Elektron alıp vermede p, n, A değişmez; çok atomlu iyonda önce toplam P ve N, sonra E = P − q (yük bir kez).",
      "Kontrol: p + n = A, p − e = q, bütün sayılar tam ve ≥ 0. Yalnız A ya da p + n + e verilmişse tek çözüm çıkmayabilir.",
    ],
  },
  {
    id: "durgun-elektrik-adim",
    guides: ["durgun-elektrik"],
    match: /küre|elektroskop|topra|çubuk|Coulomb|uzaklık|yük/i,
    title: "Durgun elektrik soruları",
    steps: [
      "Özdeş küreler temas ediyorsa: işaretli toplamı yaz, küre sayısına böl; son toplam ilk toplama eşit olmalı. “Özdeş” yoksa eşit bölme.",
      "Etki + topraklama: yaklaştır → toprakla → toprağı kes → uzaklaştır. Son yük etkileyene zıttır; sıra değişirse sonucu yeniden kur.",
      "Başlangıçta nötr elektroskop: açılırsa cisim yüklü (işaret bilinmez), kapalı kalırsa nötr.",
      "Coulomb oranı: F′/F = (q₁′q₂′)/(q₁q₂) · (r/r′)². Uzaklık 2 kat → 1/4. Negatif deneme yükünde kuvvet alana zıttır.",
    ],
  },
  {
    id: "miknatis-kutup",
    guides: ["miknatislar-ve-manyetik-alan"],
    match: /kutup|mıknatıs|pusula|alan çizgi|ip|tel/i,
    title: "Kutup ve alan yönü soruları",
    steps: [
      "Her çubukta iki uç zıttır. Önce birbirine bakan uçlar için kanıtı bul: itme (gergin ip, sıkışmış yay dahil) → aynı; iki mıknatıs arasında çekim → zıt.",
      "Yalnız çekim verilmişse dur: karşı cisim mıknatıslanmamış demir olabilir, kutup atanmaz.",
      "Alan çizgisi: dışarıda N → S, içeride S → N, çizgiler kesişmez. Pusulanın N ucu o noktadaki teğete (B yönüne) döner.",
      "Düz tel: sağ el (başparmak akım), B ∝ I / r. Uzaklık 2 kat → B yarıya iner.",
    ],
  },
  {
    id: "ses-deprem-ayir",
    guides: ["ses-deprem-dalgalari"],
    match: /ses|yankı|frekans|tiz|gür|tını|deprem|tel/i,
    title: "Ses ve deprem soruları",
    steps: [
      "Önce neyi ölçtüğünü ayır: tizlik → frekans; gürlük → genlik/şiddet; tını → dalga biçimi. Frekans artınca ses daha gür olmaz.",
      "Yankı aynı noktaya dönüyorsa toplam yol 2d: d = v·t/2. Kaynak ile alıcı ayrıysa /2 kullanma.",
      "Aynı kaynak yeni ortama geçerse f sabit, λ = v/f değişir. Tel kısalırsa (aynı tel ve gerginlik) v sabit, λ = 2L küçülür, f artar.",
      "Deprem: büyüklük olayın tek değeridir; şiddet yere göre değişir. Daha çok hasar daha büyük büyüklük kanıtı değildir.",
    ],
  },
  {
    id: "prizma-renk",
    guides: ["prizmalar-renkler"],
    match: /prizma|renk|filtre|ışık|boya|kart|sarı|mavi/i,
    title: "Prizma ve renk soruları",
    steps: [
      "Prizmada her yüze ayrı normal çiz; ilk yüze dik giren ışın ikinci yüze, iki normal arasındaki açı kadar eğik gelir.",
      "Camdan havaya geçişte geliş açısını sınır açısıyla karşılaştır: büyükse tam yansıma. Beyaz ışıkta mor en çok, kırmızı en az sapar; tek renk ayrışmaz.",
      "Renkleri K–Y–M listesine çevir. Işık + ışık → birleşim; filtre ya da yüzey → gelen ile izin verilenin ortak kısmı.",
      "Cismin beyaz ışıktaki adını sonuç sanma: sarı ışıkta mavi kart koyu, beyaz kart sarı görünür.",
    ],
  },
  {
    id: "aydinlanma",
    guides: ["isik-bilgisi"],
    match: /aydınlan|lüks|lx|kandela|cd|lümen|akı|şiddet/i,
    title: "Aydınlanma soruları (I, Φ, E)",
    steps: [
      "Birimleri ayır: I kandela (kaynağa ait), Φ lümen (akı), E lüks (yüzeye ait). Uzaklaşınca I değişmez, E değişir.",
      "Dik gelişte E = I/d²; eğikte E = (I/r²)·cos θ. θ yüzeyin normaliyle ölçülür; yüzeyle α verilmişse θ = 90° − α. r gerçek (eğik) uzaklıktır.",
      "Oran kur: aynı I ve açıda E₂/E₁ = (d₁/d₂)². Tam küre, her yöne eşit kaynak: Φ = 4πI (yarıçaptan bağımsız).",
      "Birden çok kaynak: her E'yi ayrı bul, yüzeye ulaşıyorsa topla. Opak engel varsa o katkı 0.",
    ],
  },
  {
    id: "ozkutle-adim",
    guides: ["madde-ozkutle"],
    match: /özkütle|kütle|hacim|mezür|karışım|kılcal|grafik/i,
    title: "Özkütle soruları",
    steps: [
      "Neyin kütlesi, neyin hacmi? Kap varsa sıvı = dolu − boş; mezürde cisim hacmi = son − ilk (tam batma, çözünmeme, emmeme koşuluyla).",
      "m–V grafiğinde eğim = d; doğru orijinden geçmiyorsa kesişim kap kütlesidir, toplam m/V eğim değildir. Eksenler tersse eğim 1/d.",
      "Karışım: önce toplam kütle, sonra son hacim. Eşit hacim → (d₁ + d₂)/2; eşit kütle → 2d₁d₂/(d₁ + d₂). Kolay sayı seçebilirsin.",
      "Benzer cisim k kat büyürse A/V oranı 1/k olur. Islatan sıvı dar boruda daha çok yükselir; ıslatmayan alçalır.",
    ],
  },
];

// Method tactics from the tactic library join the topic tactics in hints.
for (const m of methodTactics)
  if (m.kind === "question" && m.match)
    questionTactics.push({ id: m.id, guides: m.guides, match: m.match, title: m.title, steps: m.steps });

/** The question's own lesson plus the other lessons of the same topic. */
export function topicGuidesFor(questionId: string): string[] {
  const lessonId = questionLesson(questionId);
  if (!lessonId) return [];
  const topic = lessonTopic[lessonId];
  return [lessonId, ...(topic ? topicLessons(topic).map((l) => l.id) : [])];
}

/** Tactics that apply to this question, in list order (at most two). */
export function tacticsFor(question: { id: string; prompt: string; passage?: string }) {
  const guides = new Set(topicGuidesFor(question.id));
  if (!guides.size) return [];
  const text = `${question.passage ?? ""} ${question.prompt}`;
  return questionTactics.filter((t) => t.guides.some((g) => guides.has(g)) && t.match.test(text)).slice(0, 2);
}
