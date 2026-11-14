import { txt as t, type Lesson, type Question } from "../domain/model";
const q = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
): Question => ({
  id,
  prompt: t(prompt),
  options: options.map(t),
  answer,
  hint: t(hint),
  explanation: t(explanation),
  skill: id.split("-")[0],
});
const source1 = "OGM Materyal, Dersler Cepte Kimya 9, 1. sayı";
const source2 = "OGM Materyal, Dersler Cepte Kimya 9, 2. sayı";
export const introLessons: Lesson[] = [
  {
    id: "simyadan-kimyaya",
    subjectId: "tyt-kimya",
    title: t("Simyadan kimyaya: amaç, yöntem ve kanıt"),
    minutes: 40,
    tags: ["kimya-tarihi"],
    source: t(
      `${source1}, PDF/basılı s.10. Kaynak kavramlarıyla karşılaştırılmış özgün anlatım, şema ve alıştırmalar; resmî sınav soruları değildir.`,
    ),
    objectives: [
      t("Amaç, işlem ve bilimsel açıklamayı birbirinden ayır."),
      t("Süzme, buharlaştırma ve damıtmayı doğru hedefle eşleştir."),
      t("Tek bir aracın bilimsel yöntem için yeterli kanıt olmadığını açıkla."),
    ],
    body: [
      {
        title: t("Ürün bulmakla bilim kurmak farklı işlerdir"),
        text: t(
          "Simyacılar değersiz metalleri altına dönüştürmeyi ve ölümsüzlük iksirini bulmayı amaçlayan tarihsel uğraşlar yürüttüler. Sınama-yanılmayla yararlı maddeler ve teknikler geliştirdiler. Bu katkılar, uğraşlarının sistematik ve sınanabilir bilimsel açıklamalar kurduğu anlamına gelmez. Kimya kontrollü gözlem, ölçüm ve sınanabilir açıklamalarla ilerler.",
        ),
      },
      {
        title: t("Ayırırken neyi topladığını izle"),
        text: t(
          "Süzme, uygun filtreyle sıvıda çözünmeyen katıyı ayırabilir. Suda çözünmüş tuz sıradan süzgeçte tutulmaz. Tuzlu sudan suyu toplamak için buharlaştırılan suyun ayrıca yoğunlaştırılıp başka kapta toplanması gerekir: bu damıtmadır. Suyu uçurup geride tuzu bırakmak ise buharlaştırma hedefidir. Teknik, sadece kullanılan kaba bakılarak seçilmez.",
        ),
      },
      {
        title: t("Aynı terazi, farklı kanıt"),
        text: t(
          "Terazi veya imbik hem geçmişte hem günümüzde kullanılabilir. Bilimsel niteliği belirleyen, aracı görmekten çok verinin nasıl toplandığı ve açıklamanın nasıl sınandığıdır. Lavoisier’nin kapalı sistemde kütle ölçümleri, nicel kanıtla açıklama kurmanın örneğidir. Demokritos’un atom fikri ile deneylere dayalı atom modellerini de aynı kanıt düzeyinde görmemeliyiz.",
        ),
      },
    ],
    questions: [
      q(
        "sim-1",
        "Hangi amaç tarihsel simya uğraşlarına özgü tipik bir örnektir?",
        [
          "Bir hız yasasını kontrollü deneyle sınamak",
          "Değersiz metali altına dönüştürmek",
          "Ölçüm belirsizliğini hesaplamak",
        ],
        1,
        "Simyadaki arayışı bilimsel yöntemin aşamalarından ayır.",
        "Altına dönüştürme, simyanın tarihsel amaçlarından biridir; bilimsel yöntem uygulandığını tek başına göstermez.",
      ),
      q(
        "sim-2",
        "Tuzlu sudaki su önce buharlaştırılıyor, sonra soğutulup başka kapta sıvı olarak toplanıyor. Hangi işlem anlatılıyor?",
        ["Yalnız süzme", "Damıtma", "Öğütme"],
        1,
        "Buharın tekrar sıvıya dönüşmesi ve toplanması belirleyicidir.",
        "Damıtma, buharlaşma ile ardından yoğunlaşma ve toplama aşamalarını birlikte içerir.",
      ),
      q(
        "sim-3",
        "Çözünmüş sofra tuzu içeren su sıradan süzgeçten geçiriliyor. Hangisi beklenir?",
        [
          "Bütün tuz süzgeçte kalır.",
          "Su elementlerine ayrılır.",
          "Çözünmüş tuz suyla birlikte filtrata geçebilir.",
        ],
        2,
        "Çözünmüş iyonlarla süzgeçte tutulabilen iri katıyı ayır.",
        "Sıradan süzme, suda çözünmüş tuzu sudan ayırmaz; fiziksel ayırma suyu elementlerine de dönüştürmez.",
      ),
      q(
        "sim-4",
        "Bir çalışmanın bilimsel niteliğini değerlendirmek için en güçlü ölçüt hangisidir?",
        [
          "Kontrollü, tekrarlanabilir ölçümlerle açıklamayı sınaması",
          "Cam kap kullanması",
          "Çok eski bir yöntem kullanması",
        ],
        0,
        "Araç yerine kanıt üretme ve sınama biçimine bak.",
        "Kontrollü ve tekrarlanabilir ölçümler, açıklamayı sınanabilir kılar. Cam kap veya tarih tek başına yeterli değildir.",
      ),
      q(
        "sim-5",
        "Güncel bir laboratuvarda damıtma kullanılması için hangisi söylenebilir?",
        [
          "Bu çalışma mutlaka simyadır.",
          "Eski bir teknik çağdaş bilimsel çalışmada da kullanılabilir.",
          "Yöntemin eski olması ölçüm yapılmasını engeller.",
        ],
        1,
        "Tekniğin kökeni ile bugünkü araştırmanın yöntemini ayır.",
        "Geçmişten gelen bir teknik modern kimyada kullanılabilir; çalışmanın nasıl sınandığı ayrıca değerlendirilir.",
      ),
    ],
  },
  {
    id: "kimya-disiplinleri",
    subjectId: "tyt-kimya",
    title: t("Kimya disiplinleri: maddeye hangi soruyu soruyoruz?"),
    minutes: 35,
    tags: ["kimya-disiplinleri"],
    source: t(
      `${source1}, PDF/basılı s.13–14. Özgün örnekler ve alıştırmalar; kitap soruları kopyalanmamıştır.`,
    ),
    objectives: [
      t("Analiz ile tepkime koşullarını incelemeyi ayır."),
      t("Biyokimya ve polimer kimyasını araştırma odağıyla tanı."),
      t("Aynı üründe birden fazla disiplinin katkısı olabileceğini açıkla."),
    ],
    body: [
      {
        title: t("Önce sorunun fiilini bul"),
        text: t(
          "Bir örnekte hangi maddelerin bulunduğunu veya ne miktarda bulunduğunu belirlemek analitik kimyanın odağıdır. Tepkime hızının sıcaklıkla değişimini ya da enerji ilişkilerini araştırmak fizikokimyanın odağıdır. İki çalışmada da aynı su veya çözelti kullanılabilir; disiplinin seçimi yalnızca madde adına bağlı değildir.",
        ),
      },
      {
        title: t("Canlı, büyük molekül ve üretim ölçeği"),
        text: t(
          "Biyokimya canlıların kimyasal yapılarını ve bu yapılardaki değişimleri inceler. Polimer kimyası, çok sayıda birimin birleşmesiyle oluşan büyük moleküllere odaklanır. Endüstriyel kimya üretim verimi, kalite ve maliyet gibi süreç sorunlarını ele alır. Bir ilaç veya plastik ürünün geliştirilmesinde bu alanlar birlikte çalışabilir.",
        ),
      },
      {
        title: t("Sınıflandırmayı tek sözcüğe indirgeme"),
        text: t(
          "Organik ve anorganik kimya maddelerin yapıları ve tepkimeleriyle ilgilenir. TYT düzeyindeki disiplin sınıflandırması, sorudaki araştırma amacını tanımak için kullanılır. Örneğin bir polimerin içindeki katkı maddesinin miktarını ölçmek, örnek polimer olsa bile analitik bir işlemdir. Metindeki baskın amacı gerekçelendir.",
        ),
      },
    ],
    questions: [
      q(
        "dis-1",
        "Bir içme suyu örneğindeki magnezyum iyonu miktarı ölçülüyor. Araştırmanın baskın odağı hangisidir?",
        ["Analitik kimya", "Polimer kimyası", "Endüstriyel kimya"],
        0,
        "Ne kadar bulunduğunu belirlemek analizdir.",
        "Örnekteki madde miktarının belirlenmesi nicel analizdir; analitik kimyanın kapsamındadır.",
      ),
      q(
        "dis-2",
        "Bir enzimin hücredeki metabolik tepkimedeki görevi inceleniyor. Hangi alan doğrudan ilgilidir?",
        ["Polimer kimyası", "Biyokimya", "Yalnız endüstriyel kimya"],
        1,
        "Canlıdaki kimyasal değişime odaklan.",
        "Canlıdaki moleküler yapı ve kimyasal değişimler biyokimyanın odağıdır.",
      ),
      q(
        "dis-3",
        "Sıcaklık arttığında bir tepkimenin hızının nasıl değiştiği inceleniyor. Baskın disiplin hangisidir?",
        ["Analitik kimya", "Organik kimya", "Fizikokimya"],
        2,
        "Soru, bileşimi bulmak yerine fiziksel koşulun etkisini inceliyor.",
        "Sıcaklık, enerji ve tepkime hızı ilişkileri fizikokimyanın çalışma alanına girer.",
      ),
      q(
        "dis-4",
        "Yeni bir sentetik lifin büyük moleküllü yapısı tasarlanıyor. Hangi disiplin öne çıkar?",
        ["Yalnız analitik kimya", "Polimer kimyası", "Yalnız anorganik kimya"],
        1,
        "Lifin tekrar eden birimlerden oluşan büyük yapısını düşün.",
        "Büyük moleküllü polimerlerin yapısı ve sentezi polimer kimyasının odağıdır.",
      ),
      q(
        "dis-5",
        "Fabrikada aynı kalitedeki ürünü daha yüksek verim ve daha düşük maliyetle üretme süreci geliştiriliyor. Hangisi öne çıkar?",
        ["Yalnız biyokimya", "Yalnız element sembolleri", "Endüstriyel kimya"],
        2,
        "Amaç üretim sürecini iyileştirmek.",
        "Verim, kalite ve maliyetin üretim ölçeğinde iyileştirilmesi endüstriyel kimyayla ilişkilidir.",
      ),
    ],
  },
  {
    id: "sembolik-dil",
    subjectId: "tyt-kimya",
    title: t("Kimyanın sembolik dili: harf, alt indis ve katsayı"),
    minutes: 40,
    tags: ["sembol", "formul"],
    source: t(
      `${source1}, PDF/basılı s.18–19. Atom sayma şeması ve 5 alıştırma özgündür; şema molekül geometrisi değildir.`,
    ),
    objectives: [
      t("Co ile CO yazımlarını ayır."),
      t("Alt indis ve katsayıyı atom sayısına doğru uygula."),
      t("Element ve bileşiği atom türleri üzerinden karşılaştır."),
    ],
    body: [
      {
        title: t("Büyük harf yeni bir element sembolü başlatır"),
        text: t(
          "Element sembolünün ilk harfi büyük, varsa ikinci harfi küçüktür. Co kobaltın sembolüdür. CO ise C ve O sembollerini içerir; karbonmonoksit formülüdür. Yazımdaki harf büyüklüğü kimliği değiştirir. O₂, iki oksijen atomlu bir molekül olsa da tek element türü içerir; bileşik değildir.",
        ),
      },
      {
        title: t("Katsayı bütün formülü çarpar"),
        text: t(
          "H₂O formülünde iki hidrojen ve bir oksijen atomu bulunur. Başına 3 yazılması, 3H₂O için toplam altı H ve üç O atomu demektir. Katsayı molekül sayısını artırırken molekülün kendi H:O oranını değiştirmez. Alt indis görünmüyorsa 1 kabul edilir.",
        ),
      },
      {
        title: t("Parantezin dışındaki sayı içeriye dağılır"),
        text: t(
          "Ca(OH)₂ formül biriminde Ca sayısı 1, O sayısı 2, H sayısı 2’dir. Dıştaki 2 yalnız parantez içini çarpar. Bileşiklerde farklı elementler belirli oranlarda bulunur; iyonik bileşiklerin bütününü ayrı birer molekül gibi düşünmek yerine formül birimi demek daha uygundur. Şemadaki tanecikler sayma içindir, gerçek bağ açılarını göstermez.",
        ),
      },
    ],
    questions: [
      q(
        "sym-1",
        "Co ve CO yazımları için hangisi doğrudur?",
        [
          "Co kobalt sembolü; CO karbon ve oksijen içeren formüldür.",
          "İkisi de yalnız kobaltı gösterir.",
          "Harf büyüklüğü kimyasal yazımda önemsizdir.",
        ],
        0,
        "Küçük o ile büyük O aynı sembolün parçası değildir.",
        "Co tek element sembolüdür. CO, ayrı C ve O sembollerinden oluşur.",
      ),
      q(
        "sym-2",
        "3H₂O toplam kaç hidrojen atomu içerir?",
        ["2", "3", "6"],
        2,
        "Her su molekülündeki 2 H’yi molekül sayısıyla çarp.",
        "3×2=6 H atomu; ayrıca 3×1=3 O atomu vardır.",
      ),
      q(
        "sym-3",
        "Ca(OH)₂ için doğru atom sayıları hangisidir?",
        ["Ca:2, O:1, H:1", "Ca:1, O:2, H:2", "Ca:1, O:1, H:2"],
        1,
        "Parantez dışındaki 2 hem O’yu hem H’yi çarpar.",
        "Ca parantez dışında ve alt indissizdir: 1. OH grubu iki kez alındığı için O:2, H:2.",
      ),
      q(
        "sym-4",
        "2NH₃ için toplam atom sayıları nasıldır?",
        ["N:2, H:6", "N:1, H:6", "N:2, H:3"],
        0,
        "Katsayı formüldeki her atom türüne uygulanır.",
        "İki NH₃ molekülünde N sayısı 2×1=2; H sayısı 2×3=6 olur.",
      ),
      q(
        "sym-5",
        "O₂ ve H₂O’nun sınıflandırılması nasıldır?",
        [
          "İkisi de bileşiktir.",
          "O₂ element, H₂O bileşiktir.",
          "İkisi de tek atom türünden oluşur.",
        ],
        1,
        "Molekül olmak ile bileşik olmak aynı özellik değildir.",
        "O₂ yalnız oksijen türünü içerir. H₂O iki farklı elementin atomlarını belirli oranda içerir.",
      ),
    ],
  },
  {
    id: "kimya-guvenlik",
    subjectId: "tyt-kimya",
    title: t("Kimyada güvenlik: etiketten doğru davranışa"),
    minutes: 40,
    tags: ["laboratuvar-guvenligi"],
    source: t(
      `${source2}, PDF/basılı s.10–11. Uyarı işaretleri ve davranış ilişkileriyle karşılaştırılan özgün anlatım ve alıştırmalar.`,
    ),
    objectives: [
      t("Yanıcı ile oksitleyici uyarısını ayır."),
      t("Gözlük, önlük ve uygun eldivenin işlevlerini açıkla."),
      t("Laboratuvar davranışını riskle birlikte değerlendir."),
    ],
    body: [
      {
        title: t("Etiket davranış seçtirmek içindir"),
        text: t(
          "Yanıcı işareti tutuşma riskine; oksitleyici işareti yanmayı destekleme özelliğine dikkat çeker. Alevin altındaki halka, oksitleyici simgesini ayıran işarettir. Aynı şişede birden çok uyarı bulunabilir. Ürünün etiketi ve güvenlik bilgi formu birlikte değerlendirilir; uygulamadaki şematik simge bunların yerini tutmaz.",
        ),
      },
      {
        title: t("Koruyucu ekipman birbiri yerine geçmez"),
        text: t(
          "Gözlük gözü, uygun eldiven eli, önlük vücudu korumaya yardımcı olur. İşe uygun ekipman ve öğretmen gözetimi gerekir. Kimyasallar tadılmaz, ağızla pipetleme yapılmaz; uygun pipet doldurucu kullanılır. Yanıcı maddeler açık aleve yaklaştırılmaz. Bilinmeyen kimyasalları karıştırmak veya doğrudan koklamak güvenli bir tanıma yöntemi değildir.",
        ),
      },
      {
        title: t("Atığı ve seyreltmeyi koşuluyla düşün"),
        text: t(
          "Atıklar otomatik olarak lavaboya dökülmez; etiket ve laboratuvarın atık kurallarına göre uygun kaplara alınır. Asit seyreltmesinde öğretmen gözetimi ve uygun önlemler altında asit suya yavaşça eklenir; derişik asidin üzerine su dökülmez. Buradaki etkinlik güvenlik kuralını anlamak içindir, uygulamalı deney yönergesi değildir.",
        ),
      },
    ],
    questions: [
      q(
        "safe-1",
        "Alev simgesinin altında halka bulunan işaret hangi riski bildirir?",
        ["Sadece basınçlı gaz", "Oksitleyici özellik", "Radyoaktivite"],
        1,
        "Halka, oksijeni ve yanmayı destekleme özelliğini çağrıştırır.",
        "Üzerinde alev bulunan halka oksitleyici uyarısına aittir; yalın alevden ayrılır.",
      ),
      q(
        "safe-2",
        "Pipetle sıvı almak için doğru yaklaşım hangisidir?",
        [
          "Uygun pipet doldurucu kullanmak",
          "Ağızla çekmek",
          "Kimyasalın tadına bakmak",
        ],
        0,
        "Sıvının ağıza ulaşmasını önle.",
        "Puar veya uygun pipet doldurucu kullanılır; ağızla pipetleme yapılmaz.",
      ),
      q(
        "safe-3",
        "Deney atığı için en uygun yaklaşım hangisidir?",
        [
          "Her atığı lavaboya dökmek",
          "Koklayarak türünü belirlemek",
          "Etiket ve atık kurallarına göre uygun kaba almak",
        ],
        2,
        "Atığın tehlikesi ve ayrı toplanması önemlidir.",
        "Atıklar laboratuvar kurallarına göre sınıflanıp uygun kaplara alınır; her madde lavaboya dökülemez.",
      ),
      q(
        "safe-4",
        "Asit seyreltmesiyle ilgili güvenlik ilkesi hangisidir?",
        [
          "Su derişik asidin üzerine hızla dökülür.",
          "Uygun önlemlerle, gözetim altında asit suya yavaşça eklenir.",
          "Gözlük kullanmaya gerek yoktur.",
        ],
        1,
        "Seyreltmede ısı açığa çıkabileceğini düşün.",
        "Derişik asit üzerine su dökmek sıçrama riskini artırır. Gözetim ve uygun koruma altında asit suya yavaşça eklenir.",
      ),
      q(
        "safe-5",
        "Koruma gözlüğü kullanılması için hangisi doğrudur?",
        [
          "Gözü korur; uygun eldiven ve önlüğün yerine geçmez.",
          "Bütün kimyasal riskleri tek başına kaldırır.",
          "Sadece kimyasalın rengi koyuysa gerekir.",
        ],
        0,
        "Koruyucu ekipmanın görevleri farklıdır.",
        "Gözlük göz için korumadır; el, vücut ve diğer riskler ayrıca uygun önlemler gerektirir.",
      ),
    ],
  },
  {
    id: "atom-modelleri",
    subjectId: "tyt-kimya",
    title: t("Atom modelleri: yeni kanıt modeli değiştirir"),
    minutes: 40,
    tags: ["atom-modelleri"],
    source: t(
      `${source2}, PDF/basılı s.17. Model özellikleri ve sınırları karşılaştırıldı; tarih yılları yerine kavramsal sıra kullanılır. Şema ve alıştırmalar özgündür.`,
    ),
    objectives: [
      t("Dalton, Thomson, Rutherford ve Bohr modellerini ayırt et."),
      t("Saçılma gözlemini çekirdek ve boşlukla ilişkilendir."),
      t("Bohr yörüngesi ile modern orbital kavramını ayır."),
    ],
    body: [
      {
        title: t("Model gerçeğin kendisi değildir"),
        text: t(
          "Dalton’un modeli atomu içi dolu küre olarak ele alır. Elektronun keşfiyle Thomson, negatif elektronları yayılmış pozitif yük içine yerleştirmiştir. Elektronun varlığı, atomun içinde daha küçük yapılar bulunduğunu gösterir; eski modelin sınırını ortaya çıkarır. İzotopların farklı kütleleri de bir elementin bütün atomlarının tamamen özdeş olduğu genellemesini sınırlar.",
        ),
      },
      {
        title: t("Çok geçiş, az sayıda büyük sapma"),
        text: t(
          "Rutherford’un saçılma deneyinde alfa taneciklerinin büyük çoğunluğunun geçmesi, atom hacminin büyük bölümünün boşluk olduğunu düşündürür. Az sayıdaki büyük sapmalar ise pozitif yükün küçük ve yoğun bir çekirdekte toplandığını destekler. Bu kanıt, pozitif yükün hacme homojen yayıldığı Thomson tasvirinden farklıdır.",
        ),
      },
      {
        title: t("Enerji düzeyiyle yer belirsizliğini karıştırma"),
        text: t(
          "Bohr modeli özellikle hidrojen ve tek elektronlu iyonlarda belirli enerji düzeylerini kullanır. Elektron enerji alarak daha yüksek enerji düzeyine çıkabilir; daha düşük düzeye dönerken enerji yayar. Modern modelde orbital, elektronun bulunma olasılığıyla ilişkili hacimsel bölgedir; kesin bir gezegen yörüngesi değildir. Çizimler gerçek boyut oranlarını veya elektronun izlediği yolu göstermez.",
        ),
      },
    ],
    questions: [
      q(
        "atom-1",
        "Elektronların yayılmış pozitif yük içinde bulunduğu model hangisidir?",
        ["Dalton", "Thomson", "Bohr"],
        1,
        "Üzümlü kek benzetmesindeki yük dağılımını hatırla.",
        "Thomson, elektronları pozitif yükün yayıldığı hacim içine yerleştirmiştir; küçük çekirdek fikri bu modelin özelliği değildir.",
      ),
      q(
        "atom-2",
        "Rutherford’un ince altın levhaya alfa tanecikleri gönderdiği deneyde taneciklerin çoğunun levhadan geçmesi en doğrudan hangi yorumu destekler?",
        [
          "Atom tamamen doludur.",
          "Elektronların hepsi çekirdektedir.",
          "Atom hacminin büyük kısmı boşluktur.",
        ],
        2,
        "Çoğu taneciğin büyük bir engelle karşılaşmamasını düşün.",
        "Çok büyük bölümün geçmesi, atomun büyük hacminin boşluk olmasıyla ilişkilendirilir.",
      ),
      q(
        "atom-3",
        "Rutherford’un ince altın levhaya alfa tanecikleri gönderdiği deneyde az sayıdaki taneciğin büyük açılarla sapması neyi destekler?",
        [
          "Pozitif yükün küçük ve yoğun çekirdekte toplanmasını",
          "Pozitif yükün her yerde eşit yoğunlukta olmasını",
          "Atomda yük bulunmamasını",
        ],
        0,
        "Güçlü sapma, yoğun bir yük bölgesiyle ilişkilidir.",
        "Küçük ve yoğun pozitif çekirdek, çok az sayıdaki yakın geçişte büyük sapmaları açıklar.",
      ),
      q(
        "atom-4",
        "Bohr modelinde elektron daha yüksek enerji düzeyine çıkarken ne olur?",
        [
          "Mutlaka enerji yayar.",
          "Gerekli enerjiyi alır.",
          "Atomun proton sayısı artar.",
        ],
        1,
        "Enerji düzeyleri arasındaki farkın sağlanması gerekir.",
        "Uyarılma için elektron enerji alır. Daha düşük düzeye dönerken enerji yayabilir; proton sayısı bu geçişle değişmez.",
      ),
      q(
        "atom-5",
        "Modern modelde orbital için hangi ifade uygundur?",
        [
          "Elektronun kesin izlediği dairesel yol",
          "Çekirdeğin başka adı",
          "Elektronun bulunma olasılığıyla ilişkili hacimsel bölge",
        ],
        2,
        "Kesin bir yol ile olasılık bölgesini ayır.",
        "Orbital bir gezegen yörüngesi değildir; elektronun bulunma olasılığıyla ilişkili bölgeyi tanımlar.",
      ),
    ],
  },
];
