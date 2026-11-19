/*
 * Method tactics: general problem-solving moves that cut across topics
 * (choosing a method, comparing fractions, modelling word problems, motion,
 * force diagrams, unit checks, refuting generalisations, pre-questions).
 * Every example is an original study item written for this app, never an
 * official ÖSYM question. Evidence notes describe the research honestly:
 * none of these studies measured YKS scores, so no score gain is claimed.
 * Reading this library records nothing and awards no XP.
 */

export interface TacticExample {
  prompt: string;
  steps: string[];
  answer: string;
}
export interface MethodTactic {
  id: string;
  subject: "Matematik" | "Fizik" | "Kimya" | "Biyoloji" | "Çalışma yöntemi";
  title: string;
  /** Where the move pays off. */
  where: string;
  steps: string[];
  examples: TacticExample[];
  trap: string;
  /** When the move costs more than it saves. */
  skip: string;
  evidence: string;
  /** Study methods are not shown inside question hints. */
  kind: "question" | "study";
  guides: string[];
  match?: RegExp;
}

const FRACTION_COMPARE = /(büyük|küçük|sırala|karşılaştır)[\s\S]*\d+\s*\/\s*\d+|\d+\s*\/\s*\d+[\s\S]*(büyük|küçük|sırala|karşılaştır)/i;

export const methodTactics: MethodTactic[] = [
  {
    id: "yontem-sec",
    subject: "Matematik",
    title: "İki çözümü karşılaştır, sonra tek yol seç",
    where: "TYT işlemler ve denklemler; AYT ikinci dereceden denklemler.",
    steps: [
      "Aynı soruya iki geçerli yol düşün; ilk farklı kararı bul (önce dağıtmak mı, önce iki tarafı bölmek mi?).",
      "Kısa yolu mümkün kılan özelliği bir cümleyle söyle: ortak çarpan, toplamı yuvarlak yapan ikililer, kolay görülen çarpanlar.",
      "Yeni soruda tek yol seç, bir kez çöz ve sonucu yerine koyarak denetle.",
    ],
    examples: [
      {
        prompt: "6(x − 2) = 3x + 9 ise x kaçtır?",
        steps: [
          "A yolu: dağıt → 6x − 12 = 3x + 9 → 3x = 21 → x = 7.",
          "B yolu: iki tarafı 3'e böl → 2(x − 2) = x + 3 → 2x − 4 = x + 3 → x = 7.",
          "Denetim: 6·(7 − 2) = 30 ve 3·7 + 9 = 30.",
          "B yolu katsayıları küçültür; ama her denklemde daha hızlı olmak zorunda değildir.",
        ],
        answer: "x = 7",
      },
      {
        prompt: "48 + 19 + 52 + 81 toplamı kaçtır?",
        steps: [
          "Sırayla toplamak: 48 + 19 = 67, 67 + 52 = 119, 119 + 81 = 200.",
          "Gruplamak: (48 + 52) + (19 + 81) = 100 + 100 = 200.",
          "İşlem sayısı aynı; gruplamanın kazancı ara toplamların kolay olmasıdır.",
        ],
        answer: "200",
      },
      {
        prompt: "AYT: x² − 9x + 20 = 0 denkleminin kökleri nedir?",
        steps: [
          "Çarpanlara ayırma: çarpımı 20, toplamı 9 olan sayılar 4 ve 5 → (x − 4)(x − 5) = 0.",
          "Genel formül: Δ = 81 − 80 = 1, x = (9 ± 1)/2 → 5 ve 4.",
          "Çarpanlar kolay görülüyorsa ilk yol ekonomiktir; görülmüyorsa formül güvenli yedektir.",
        ],
        answer: "4 ve 5",
      },
    ],
    trap: "Çıkarma ve bölmede terimleri gelişigüzel gruplamak: 20 − 8 − 2 = 10, ama 20 − (8 − 2) = 14.",
    skip: "Sınavda her soruyu iki kez çözme; karşılaştırma öğrenirken yapılır, sınavda tek yol seçilir.",
    evidence:
      "Rittle-Johnson ve Star (2007): 70 ortaokul öğrencisinde çözüm yollarını karşılaştıranlar işlem bilgisi ve esneklikte daha çok gelişti. YKS netine etkisi ölçülmedi.",
    kind: "question",
    guides: ["birinci-dereceden-denklemler", "tyt-mat-dogrusal-denklemler-kaynak-036", "ayt-ikinci-dereceden-denklemler"],
    match: /denklem/i,
  },
  {
    id: "bire-kalan",
    subject: "Matematik",
    title: "1'e kalan mesafe ile kesir karşılaştır",
    where: "0 ile 1 arasında, özellikle 1'e çok yakın iki kesrin büyüklüğü.",
    steps: [
      "İki kesrin de 0 ile 1 arasında olduğunu doğrula.",
      "Her birinin 1'e eksiğini yaz: 1 − a/b = (b − a)/b.",
      "Eksiği küçük olan kesir daha büyüktür; şüphede çapraz çarpımla kesinleştir.",
    ],
    examples: [
      {
        prompt: "11/12 ile 15/16'dan hangisi büyüktür?",
        steps: [
          "Eksikler: 1 − 11/12 = 1/12 ve 1 − 15/16 = 1/16.",
          "1/16 < 1/12 olduğundan 15/16 1'e daha yakındır.",
          "Denetim: 15·12 = 180 > 176 = 11·16.",
        ],
        answer: "15/16",
      },
      {
        prompt: "4/7 ile 7/11'den hangisi büyüktür?",
        steps: [
          "Eksikler: 3/7 ve 4/11. Ortak payda 77: 33/77 ve 28/77.",
          "7/11'in eksiği küçük, o hâlde 7/11 büyüktür. Denetim: 7·7 = 49 > 44 = 4·11.",
          "“Paydası büyük olan büyüktür” kuralı yoktur: 2/3 > 5/9 olduğu hâlde 9 > 3.",
        ],
        answer: "7/11",
      },
      {
        prompt: "AYT: x > 0 iken A = (x + 2)/(x + 3) ve B = (x + 3)/(x + 4) karşılaştır.",
        steps: [
          "A = 1 − 1/(x + 3), B = 1 − 1/(x + 4).",
          "x + 4 > x + 3 > 0 olduğundan 1/(x + 4) < 1/(x + 3); B'nin eksiği küçüktür.",
          "x = 1 ile sayısal kontrol: 3/4 < 4/5. Bu kontrol ispatın yerine geçmez.",
        ],
        answer: "B > A",
      },
    ],
    trap: "Eksiklerin yalnız paylarını karşılaştırmak; 1'den büyük veya negatif kesirlerde kuralı düşünmeden uygulamak.",
    skip: "Ortak payda zaten kolaysa (15/24 ile 14/24 gibi) doğrudan karşılaştır.",
    evidence:
      "Obersteiner, Alibali ve Marupudi (2020): 107 yetişkinde 0 ve 1'e yakınlık kesir karşılaştırmayı kolaylaştırdı. Bu bir öğretim deneyi değildir; YKS etkisi ölçülmedi.",
    kind: "question",
    guides: ["rasyonel-sayilar", "tyt-mat-rasyonel-kaynak-035"],
    match: FRACTION_COMPARE,
  },
  {
    id: "sayi-dogrusu",
    subject: "Matematik",
    title: "Sayı doğrusunda aralığını bul",
    where: "Rasyonel sayıları sıralama; negatif ve 1'den büyük kesirler dahil.",
    steps: [
      "Her sayının aralığını belirle: negatif mi, 0–1/2 mi, 1/2–1 mi, 1'den büyük mü? (a/b > 1/2 ⇔ 2a > b)",
      "Farklı aralıktaki sayıları doğrudan sırala.",
      "Aynı aralıkta ve yakınsa eş payda veya çapraz çarpımla kesinleştir; negatiflerde sıra tersine döner.",
    ],
    examples: [
      {
        prompt: "5/12 ile 4/7'den hangisi büyüktür?",
        steps: [
          "5/12: 2·5 = 10 < 12, yani 1/2'nin solunda.",
          "4/7: 2·4 = 8 > 7, yani 1/2'nin sağında.",
          "Farklı taraflardalar: 4/7 büyüktür. Denetim: 4·12 = 48 > 35 = 5·7.",
        ],
        answer: "4/7",
      },
      {
        prompt: "−4/5 ile −3/4'ten hangisi büyüktür?",
        steps: [
          "İkisi de −1 ile 0 arasında: −4/5 = −0,80 ve −3/4 = −0,75.",
          "Sıfıra daha yakın (sağda) olan büyüktür: −3/4.",
          "Pozitiflerde 4/5 > 3/4; negatiflerine geçince sıra tersine döner.",
        ],
        answer: "−3/4",
      },
      {
        prompt: "9/8 ile 6/5'ten hangisi büyüktür?",
        steps: [
          "9/8 = 1 + 1/8 ve 6/5 = 1 + 1/5; ikisi de 1'in sağında.",
          "1/5 > 1/8 olduğundan 6/5 büyüktür.",
        ],
        answer: "6/5",
      },
    ],
    trap: "Payda büyüdükçe kesrin büyüdüğünü sanmak; negatif kesirlerde mutlak değeri büyük olanı büyük saymak.",
    skip: "Kabaca çizilmiş uzaklıklar ispat değildir; yakın sayılarda mutlaka eşitsizlikle kesinleştir.",
    evidence:
      "Krowka ve ark. (2024) 28 çalışmalık meta-analizde sayı doğrusu içeren öğretim paketleri daha olumlu sonuçlarla ilişkiliydi; paketler çok bileşenli olduğu için tek başına etkisi ayrılamadı.",
    kind: "question",
    guides: ["rasyonel-sayilar", "tyt-mat-rasyonel-kaynak-035"],
    match: FRACTION_COMPARE,
  },
  {
    id: "iliski-kur",
    subject: "Matematik",
    title: "Önce ilişkiyi kur, sonra sayıları koy",
    where: "Ardışık sayılar, adet–toplam, karışım, yaş ve benzeri sözel problemler.",
    steps: [
      "İsteneni ve ilişkiyi yaz: kaç nicelik var, aralarındaki fark ya da kat ne? “Üç”, “ardışık tek”, “iki katı” modelin parçasıdır.",
      "Bilinmeyenlerden birini harfle göster, diğerlerini onunla yaz (b ve 12 − b gibi).",
      "Denklemi çöz; sonucu sorudaki bütün koşullarda (adet, toplam, tek/çift, birim) denetle.",
    ],
    examples: [
      {
        prompt: "Toplamı 87 olan üç ardışık tek sayının en küçüğü kaçtır?",
        steps: [
          "Ortancaya x de; ardışık tek sayılar 2 farkla gider: x − 2, x, x + 2.",
          "Toplam 3x = 87 → x = 29. Sayılar 27, 29, 31.",
          "Denetim: üçü de tek ve 27 + 29 + 31 = 87.",
        ],
        answer: "27",
      },
      {
        prompt: "250 mL'lik ve 400 mL'lik toplam 12 dolu şişedeki sıvı 3,9 L ise büyük şişe kaç tanedir?",
        steps: [
          "Birimi eşitle: 3,9 L = 3900 mL.",
          "Büyük şişe sayısı b, küçük şişe 12 − b: 400b + 250(12 − b) = 3900.",
          "150b + 3000 = 3900 → b = 6.",
          "Denetim: 6·400 + 6·250 = 2400 + 1500 = 3900 mL ve 6 + 6 = 12 şişe.",
        ],
        answer: "6",
      },
    ],
    trap: "İki grubun sayısını aynı harfle yazmak (400b + 250b) ya da litre–mililitre dönüşümünü unutmak.",
    skip: "Tek işlemlik basit sorularda değişken kurmak zaman kaybettirebilir.",
    evidence:
      "Hardy, Powell ve Saglam-Ak (2026) derlemesinde problem şemasına dayalı öğretim küçük çocuklarda olumlu sonuçlarla ilişkiliydi. Yetişkin TYT başarısına genellenemez.",
    kind: "question",
    guides: [
      "ardisik-sayilar",
      "sayi-problemleri",
      "kesir-problemleri",
      "yas-problemleri",
      "karisim-problemleri",
      "isci-problemleri",
      "havuz-problemleri",
      "hiz-problemleri",
      "yuzde-problemleri",
      "kar-zarar-problemleri",
      "faiz-problemleri",
    ],
    match: /ardışık|tane|katı|yaşı|kişi|fazla|eksik|toplamı \d+/i,
  },
  {
    id: "uc-noktalar",
    subject: "Fizik",
    title: "Uç noktaları karşılaştır: yol mu, yer değiştirme mi?",
    where: "TYT hareket; ortalama hız ve ortalama sürat; AYT vektör temeli.",
    steps: [
      "Kökte “alınan yol” mu “yer değiştirme” mi istendiğini ayır.",
      "Yer değiştirme = son konum − ilk konum, yönüyle; aradaki rota önemsizdir.",
      "Yol bütün parçaların toplamıdır. Ortalama sürat = yol / süre, ortalama hız = yer değiştirme / süre.",
    ],
    examples: [
      {
        prompt: "Bir hareketli 10 m doğuya, sonra 4 m batıya gidiyor. Yol ve yer değiştirme nedir?",
        steps: [
          "Doğuyu pozitif seç. Yol = 10 + 4 = 14 m.",
          "Son konum +6 m, ilk konum 0 → Δx = +6 m (6 m doğu).",
        ],
        answer: "Yol 14 m, yer değiştirme 6 m doğu",
      },
      {
        prompt: "Bir öğrenci 6 m doğuya, sonra 8 m kuzeye yürüyor. Yer değiştirmenin büyüklüğü ve yol nedir?",
        steps: [
          "Bitiş noktası (6, 8) m. |Δx| = √(6² + 8²) = 10 m.",
          "Yol = 6 + 8 = 14 m.",
          "Aynı yoldan geri dönerse yol 28 m, yer değiştirme 0 olur.",
        ],
        answer: "10 m ve 14 m",
      },
    ],
    trap: "Başlangıca dönen hareketlinin ortalama hızı 0'dır ama ortalama sürati 0 değildir.",
    skip: "Kuvvet ve ivme sorularında bu ayrım tek başına yetmez; etkileşimden kuvvete taktiğine geç.",
    evidence:
      "Tanım MEB Fizik 9 hareket ünitesine dayanır. Vektör pratiği araştırmaları (Mikula ve Heckler, 2017) üniversite düzeyindedir; bu kısayolun bağımsız etkisi ölçülmedi.",
    kind: "question",
    guides: ["dogrusal-hareket", "dogrusal-hareket-ileri", "bir-boyutta-sabit-ivmeli-hareket", "sabit-ivmeli-hareket-grafikleri", "bagil-hareket"],
    match: /yer değiştir|alınan yol|aldığı yol|ortalama hız|ortalama sürat/i,
  },
  {
    id: "etkilesim-kuvvet",
    subject: "Fizik",
    title: "Etkileşimden kuvvete: önce kim dokunuyor?",
    where: "Newton yasaları, sürtünme, ip gerilmesi, normal kuvvet ve asansör soruları.",
    steps: [
      "Tek hedef cisim seç; ona dokunan (ip, zemin, el) ve uzaktan etki eden (Dünya) varlıkları listele.",
      "Her etkileşimi yalnız hedef cismin üzerinde ok olarak çiz; kaynağı olmayan “hareket kuvveti” oku ekleme.",
      "Okları yönleriyle topla: ΣF = m·a. Net kuvvetin yönü ivmenin yönüdür, hızın değil.",
    ],
    examples: [
      {
        prompt: "4 kg'lık kutu yatay zeminde iple sağa 30 N çekiliyor; sürtünme sola 6 N. g = 10 m/s². İvme nedir?",
        steps: [
          "Hedef: kutu. Etkileşimler: Dünya (ağırlık), zemin (normal ve sürtünme), ip (çekme).",
          "Düşey: aşağı 40 N ağırlık, yukarı 40 N normal → net 0.",
          "Yatay: 30 − 6 = 24 N sağa → a = 24 / 4 = 6 m/s² sağa.",
        ],
        answer: "6 m/s² sağa",
      },
      {
        prompt: "50 kg'lık kişi, aşağı yönde 2 m/s² ivmelenen asansördeki tartıda duruyor. g = 10 m/s². Tartı kaç N gösterir?",
        steps: [
          "Hedef: kişi. Etkileşimler: Dünya (500 N aşağı), tartı (N yukarı).",
          "Aşağıyı pozitif seç: 500 − N = 50·2 = 100 → N = 400 N.",
          "Denetim: ivme aşağıysa net kuvvet aşağıdadır, yani N < 500 N. Sabit hızda N = 500 N olurdu.",
        ],
        answer: "400 N",
      },
    ],
    trap: "Etki–tepki çiftini aynı cismin üzerine koymak; hareket yönünü ivme yönü sanmak (yukarı çıkarken yavaşlayan asansörde ivme aşağıdır).",
    skip: "Yalnız yol/yer değiştirme soruluyorsa kuvvet listesine gerek yoktur.",
    evidence:
      "Savinainen ve ark. (2013): 335 lise öğrencisinde etkileşim diyagramını yoğun kullananlar kuvvetleri daha doğru tanıdı ve çizdi. YKS neti veya hızı ölçülmedi.",
    kind: "question",
    guides: ["newton", "ayt-newton-hareket-yasalari"],
    match: /kuvvet|ivme|sürtünme|asansör|gerilme|tepki/i,
  },
  {
    id: "birim-oran",
    subject: "Kimya",
    title: "Birimle kur, oranla doğrula",
    where: "Özkütle, mol–kütle, molarite ve iyon derişimi; fizikte hız ve özkütle.",
    steps: [
      "İstenen niceliği ve birimini yaz; verilenlerin aynı büyüklüğü anlattığını denetle (çözücü hacmi ≠ çözelti hacmi).",
      "Bağıntıyı kur ve birimleri sadeleştir; sonunda istenen birim kalmalı.",
      "Oranla anlamlandır: miktar iki katına çıksa sonuç ne olmalı?",
    ],
    examples: [
      {
        prompt: "Özkütlesi 2,5 g/cm³ olan cismin kütlesi 20 g. Hacmi kaç cm³'tür?",
        steps: [
          "V = m / d = 20 g ÷ 2,5 g/cm³ = 8 cm³.",
          "Oran: her 1 cm³ 2,5 g ise 8 cm³ 20 g eder.",
          "20 · 2,5 = 50 işlemi g²/cm³ verir; istenen birim değildir.",
        ],
        answer: "8 cm³",
      },
      {
        prompt: "0,30 mol çözünen içeren çözeltinin son hacmi 500 mL. Molarite kaçtır?",
        steps: [
          "500 mL = 0,500 L.",
          "M = n / V = 0,30 / 0,500 = 0,60 mol/L.",
          "500 yazmak 1000 katlık birim hatası doğurur.",
        ],
        answer: "0,60 mol/L",
      },
      {
        prompt: "0,12 mol madde 250 mL su kullanılarak çözülüyor; çözeltinin son hacmi 300 mL. Molarite kaçtır?",
        steps: [
          "Molarite çözelti hacmiyle hesaplanır: 0,12 / 0,300 = 0,40 mol/L.",
          "0,12 / 0,250 = 0,48 hesabının birimi doğru görünür ama çözücü hacmi kullanılmıştır.",
        ],
        answer: "0,40 mol/L",
      },
    ],
    trap: "Birim doğru çıktı diye sonucu doğru sanmak: ½mv² yerine mv² yazmak da joule verir.",
    skip: "Sıcaklık ya da madde değişirken özkütleyi sabit kabul ederek oran kurma.",
    evidence:
      "Birim analizi öğretimi üzerine çalışmalar (Petersson ve ark., 2026) gelişme bildiriyor; orantısal akıl yürütmeyi öne alan karşı görüş de var (Dunphy ve Weisse, 2025). Birleşik yöntemin YKS etkisi ölçülmedi.",
    kind: "question",
    guides: ["madde-ozkutle", "madde-ozkutle-ileri", "mol", "mol-kutle-iliskisi", "mol-tanecik-iliskisi", "cozelti-derisimi", "ayt-molarite", "ayt-iyon-derisimi"],
    match: /özkütle|hacmi|mol|derişim|molar|g\/cm|mL|litre/i,
  },
  {
    id: "curutme-karti",
    subject: "Biyoloji",
    title: "Çürütme kartı: genellemeyi tek karşı örnekle sına",
    where: "Hücre tipi, beslenme ve sınıflandırma; “hepsi, yalnız, kesinlikle” içeren öncüller.",
    steps: [
      "Genelleme içeren öncülü tek cümlelik bir “iddia” olarak yaz.",
      "İddiayı bozan tek karşı örneği ara; iddiayı destekleyen örnek çürütme sayılmaz.",
      "Doğru kuralı yaz; verilenlerden kesin çıkmayanı “kesin” sayma.",
    ],
    examples: [
      {
        prompt: "“Çok hücreli canlıların hepsi ototroftur.” İddia doğru mu?",
        steps: [
          "İddia: çok hücreli olan her canlı kendi besinini üretir.",
          "Çürütme: insan çok hücrelidir ve heterotroftur.",
          "Doğru kural: hücre sayısı ile beslenme tipi ayrı ölçütlerdir.",
        ],
        answer: "Yanlış",
      },
      {
        prompt:
          "Z canlısının hücresinde zarla çevrili çekirdek yoktur. I. Prokaryottur. II. Ribozom bulunur. III. Fotosentez yapamaz. Hangileri kesin çıkar?",
        steps: [
          "Zarlı çekirdeği olmayan canlı prokaryottur → I kesin.",
          "Prokaryotların hepsinde ribozom bulunur → II kesin.",
          "Siyanobakteriler prokaryottur ve fotosentez yapar; beslenme bilgisi verilmemiş → III kesin değil.",
        ],
        answer: "I ve II",
      },
    ],
    trap: "Bir öncül yanlış diye diğerlerini de yanlış saymak; iddiayı destekleyen örneği çürütme sanmak.",
    skip: "Her yanlışı kavram yanılgısı ilan etme; okuma veya işlem hatası da olabilir.",
    evidence:
      "Schroeder ve Kucera (2022): 44 karşılaştırmalık meta-analizde çürütme metinleri orta büyüklükte etki gösterdi. Bu yüzde net artışı değildir; YKS için ölçülmedi.",
    kind: "question",
    guides: ["canli-ozellikleri", "canli-ozellikleri-ileri", "hucre-organelleri", "canlilarin-siniflandirilmasi"],
    match: /hepsi|tümü|bütün|yalnız|kesinlikle|kesin|\bI\./i,
  },
  {
    id: "on-soru",
    subject: "Çalışma yöntemi",
    title: "Ön soru: okumadan önce tek hedefe tahmin ver",
    where: "Bilgi yoğun konu anlatımına başlamadan önce (kimya disiplinleri, hücre, sistemler).",
    steps: [
      "Konuyu okumadan önce tek bir hedef soruya tahmin ver; bilmiyorsan “bilmiyorum” de.",
      "Okurken cevabı ve gerekçesini bul; hedef dışındaki bölümleri atlama.",
      "Sonra hedeflenen bilgiyi ve başka bir bilgiyi ayrı sorularla, bakmadan yokla.",
    ],
    examples: [
      {
        prompt: "Okumadan önce: maden suyundaki iyonların türünü ve miktarını belirlemek hangi kimya disiplinine girer?",
        steps: [
          "Tahminini yaz; yanlış tahmin başarısızlık değildir.",
          "Anlatımda bul: bileşenlerin ne olduğunu ve ne kadar olduğunu belirlemek analitik kimyadır.",
          "Tür belirleme nitel, miktar belirleme nicel analizdir.",
        ],
        answer: "Analitik kimya",
      },
    ],
    trap: "Ön sorunun cevabını bulunca anlatımın geri kalanını atlamak; tek doğru cevaptan bütün konunun öğrenildiği sonucunu çıkarmak.",
    skip: "Doğrudan açıklama istiyorsan ön soru zorunlu değildir; çok sayıda tahmin sorusu konu süresini tüketir.",
    evidence:
      "King-Shepard ve ark. (2025) meta-analizi: ön soru hedeflenen bilgide belirgin, hedeflenmeyen bilgide neredeyse sıfır etki gösterdi. Bütün konuya genellenemez.",
    kind: "study",
    guides: ["kimya-disiplinleri"],
  },
];
