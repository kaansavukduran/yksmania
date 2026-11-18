import { figureGuidesFor } from "./sectionFigures/hintFigure";

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
];

/** Tactics that apply to this question, in list order (at most two). */
export function tacticsFor(question: { id: string; prompt: string; passage?: string }) {
  const guides = new Set(figureGuidesFor(question.id));
  if (!guides.size) return [];
  const text = `${question.passage ?? ""} ${question.prompt}`;
  return questionTactics.filter((t) => t.guides.some((g) => guides.has(g)) && t.match.test(text)).slice(0, 2);
}
