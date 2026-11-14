import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const packs = [
  {
    id: "iyonik-bag-ve-guclu-etkilesimler",
    title: "Güçlü etkileşimler ve iyonik bağ",
    topic: "detail-153",
    sections: [
      {
        title: "Güçlü bağda neyin bir arada tutulduğunu sor",
        paragraphs: [
          "İyonik, kovalent ve metalik bağ; maddenin yapısındaki tanecikleri bir arada tutan güçlü etkileşimler olarak öğretilir. İyonik yapıda zıt yüklü iyonlar çekişir, kovalent bağda atomlar elektron çiftlerini ortaklaşa kullanır, metalik yapıda hareketli değerlik elektronları metal yapısının bir arada tutulmasına katkı verir. Bunlar aynı elektron davranışının üç farklı adı değildir.",
          "Bir molekülün içindeki bağı, ayrı moleküller arasındaki etkileşimden ayır. Suyun kaynamasında H₂O molekülleri arasındaki etkileşimler aşılır; su molekülünün O–H bağlarının tamamı koparılıp hidrojen ve oksijene ayrıldığı sonucu çıkmaz. Hangi tanecikler arasındaki ilişkinin sorulduğunu belirtmeden güçlü–zayıf kararı verme.",
        ],
      },
      {
        title: "Elektron alışverişi iyonu oluşturur; bağ çekimdir",
        paragraphs: [
          "Nötr Na atomunda 11 proton ve 11 elektron vardır. Bir elektron verince Na⁺ oluşur; proton sayısı değişmez, elektron sayısı 10 olur. Nötr Cl atomu bir elektron alırsa 17 proton ve 18 elektronla Cl⁻ olur. Bu aktarım iki atomun yüklerini açıklar; elektron yok olmaz ve çekirdekler değişmez.",
          "İyonik bağın nedeni, oluşan zıt yüklü iyonlar arasındaki elektrostatik çekimdir. Sadece elektron verildi demek bağın kendisini açıklamaz. Gerçek tuz oluşumunda atomlaşma, iyonlaşma ve örgü oluşumu gibi enerji adımları birlikte değerlendirilir; iki atomun aktarım çizimi bütün tepkimenin enerji hesabı değildir.",
        ],
      },
      {
        title: "Kristal örgüde tek bir tuz molekülü arama",
        paragraphs: [
          "NaCl kristali, Na⁺ ve Cl⁻ iyonlarının üç boyutlu düzenli örgüsüdür. NaCl yazımı her sodyum iyonuna karşılık bir klorür iyonu oranını belirtir; birbirinden bağımsız NaCl molekül kümelerini göstermez. Kristalde bir iyon çevresindeki birden çok komşu iyonla etkileşir.",
          "Formül birimi, en küçük tam sayılı iyon oranının ifadesidir. Birim hücre ise kristal düzeninin uzayda tekrarlanan geometrik parçasıdır. İkisini aynı terim sanma. Aşağıdaki örgü kesiti taneciklerin yerleşimini ve yük işaretlerini gösterir; gerçek iyon boyutu, tam üç boyutlu koordinasyon veya tek molekül resmi değildir.",
        ],
      },
      {
        title: "Yükleri denkleştir, oranı sadeleştir",
        paragraphs: [
          "Nötr tuzda toplam pozitif yük toplam negatif yükün büyüklüğüne eşittir. Mg²⁺ ile Cl⁻ için bir Mg ve iki Cl gerekir: (+2)+2(−1)=0; formül MgCl₂ olur. Sağ üstteki 2+ iyonun yüküdür, sağ alttaki ₂ ise iyon adedi oranıdır.",
          "Ca²⁺ ile O²⁻ için iki Ca ve iki O seçmek yükü sıfırlasa da en küçük oran değildir. 2:2 sadeleşir; CaO yazılır. Yükleri çaprazlamak bir kısa yoldur; sonuç mutlaka toplam yük sıfır ve oran en küçük mü diye denetlenmelidir. İyonların kimliği ve yükleri bilinmeden rastgele indis yerleştirme.",
        ],
      },
      {
        title: "Katı ve sıvıda taşıyıcının hareketi farklıdır",
        paragraphs: [
          "Katı NaCl’de iyonlar örgü konumlarının çevresinde titreşir, ancak yapı içinde serbestçe dolaşarak elektrik yükü taşıyamaz. Katıda iyonların bulunması tek başına iyi iletkenlik için yeterli değildir. Yük taşıyıcısının hareket edebilmesi gerekir.",
          "NaCl eridiğinde iyonların yer değiştirme özgürlüğü artar; yeterince çözündüğü sulu ortamda da hareketli iyonlar oluşur. Bu nedenle eriyik ve iyon içeren çözelti elektrik iletebilir. Seçilen durumlar iletkenlik ilkesini gösterir; laboratuvarda tuzu eritmek veya elektrik devresi kurmak için bir deney talimatı değildir.",
        ],
      },
      {
        title: "Çözünme, erime ve elektrolizi ayır",
        paragraphs: [
          "Erime katıdan sıvı hâle geçiştir; suda çözünme ise iyonların su içinde dağılmasını içerebilir. Her tuz suda çok çözünmez; AgCl az çözünür. İyonik bileşiklerin bütün çözeltileri aynı derişimde veya aynı iletkenlikte olacak diye bir sonuç çıkarılamaz.",
          "Elektroliz, elektrik enerjisiyle yürütülen kimyasal dönüşümdür. Tuzun erimesi veya çözünmesi ile aynı işlem değildir. İyonik örgünün dağılması, her iyonun iç yapısındaki bütün kimyasal bağların kopması anlamına da gelmez; çok atomlu iyonlar uygun koşullarda grup hâlinde korunur.",
        ],
      },
      {
        title: "Sertlik, kırılganlık ve çekim koşulları",
        paragraphs: [
          "İyonik katılar genellikle sert, kırılgan ve görece yüksek erime noktalıdır. İyon tabakaları yer değiştirdiğinde aynı işaretli iyonlar karşı karşıya gelebilir; itme yapının kırılmasını kolaylaştırır. Bu model kırılganlığı açıklar, her kristalin dayanımını sayısal olarak hesaplamaz.",
          "Benzer yapılar karşılaştırılırken iyon yüklerinin büyüklüğü arttıkça ve iyonlar arasındaki uzaklık azaldıkça elektrostatik çekim genellikle güçlenir. Farklı yük, boyut ve yapı aynı anda değişiyorsa tek bir ipucundan kesin erime sırası üretme. Yaklaşık 40 kJ/mol gibi okul sınıflama eşikleri bütün bağları tek başına tanımlayan evrensel sınırlar değildir.",
        ],
      },
      {
        title: "Metal içermeyen iyonik tuzu da tanı",
        paragraphs: [
          "NH₄Cl’de metal elementi yoktur; yine de NH₄⁺ ve Cl⁻ iyonları arasındaki çekim iyoniktir. NH₄⁺ iyonunun kendi içindeki N–H bağları kovalenttir. Aynı örnekte farklı düzeylerde iki bağ türü bulunabilir; sorunun hangi iki parçayı karşılaştırdığını işaretle.",
          "Çözümün sonunda iyonları ve yüklerini yaz, formül oranını doğrula, verilen fiziksel hâlde taşıyıcıların hareketini düşün. Molekül, formül birimi ve birim hücre terimlerini ayrı tut. Bir şemada farklı renkli küre görmek tek başına farklı elektrik yükü bulunduğunu kanıtlamaz; şeklin açıklamasını oku.",
        ],
      },
    ],
    examples: [
      {
        title: "MgCl₂ oranını kur",
        prompt: "Mg²⁺ ve Cl⁻ iyonlarıyla nötr tuzun en küçük formülü nedir?",
        strategy: "Önce toplam yükü sıfırlayan en küçük adetleri ara.",
        steps: [
          {
            label: "İyon yükleri",
            explanation:
              "Mg²⁺ bir iyon başına +2, Cl⁻ bir iyon başına −1 taşır.",
          },
          {
            label: "Ortak toplam",
            explanation:
              "Bir Mg²⁺ iyonuna iki Cl⁻ iyonu karşılık gelir: +2−2=0.",
          },
          {
            label: "Formülü yaz",
            explanation:
              "Katyon önce yazılır; birin alt indisi gösterilmez: MgCl₂.",
          },
        ],
        answer: "MgCl₂",
        check: "(+2)+2(−1)=0 ve 1:2 oranı sadeleşmez.",
        pitfall:
          "Mg²⁺ iyonunun üstteki 2 yükünü, Mg atomunun adedi gibi kopyalama.",
      },
      {
        title: "Al₂O₃ ve hatalı çaprazlama",
        prompt: "Al³⁺ ve O²⁻ iyonlarından oluşan nötr bileşiğin formülünü bul.",
        strategy: "Pozitif ve negatif yükler için ortak büyüklük 6’yı kullan.",
        steps: [
          {
            label: "Katyonları say",
            explanation: "İki Al³⁺ toplam +6 taşır.",
          },
          {
            label: "Anyonları say",
            explanation: "Üç O²⁻ toplam −6 taşır.",
          },
          {
            label: "Dengele",
            explanation: "2(+3)+3(−2)=0; formül Al₂O₃’tür.",
          },
        ],
        answer: "Al₂O₃",
        check: "Al₃O₂ yazılırsa 3(+3)+2(−2)=+5 kalır; nötr değildir.",
        pitfall: "İndisleri toplam yük hesabıyla doğrula: Al₃O₂ nötr değildir.",
      },
      {
        title: "Hareketli yük taşıyıcısını izle",
        prompt:
          "Saf bir örnek katıyken iletmiyor, eritildiğinde iletiyor. Bu davranış iyonik tuzla neden uyumludur?",
        strategy: "Aynı iyonların farklı hâllerdeki hareketini karşılaştır.",
        steps: [
          {
            label: "Katıyı incele",
            explanation:
              "İyonlar örgüye bağlıdır; titreşme serbestçe yük taşıma değildir.",
          },
          {
            label: "Eriyiği incele",
            explanation:
              "Erimiş örnekte iyonlar yer değiştirebilir ve yük taşıyabilir.",
          },
          {
            label: "Sınırı koy",
            explanation:
              "Davranış tipik iyonik tuzla uyumludur; yalnız bu gözlem bütün olası maddeleri tekil olarak teşhis etmez.",
          },
        ],
        answer: "Hareketli iyonlar eriyikte iletkenlik sağlar.",
        check: "İyonların varlığı ile serbest hareketi ayrı iki koşuldur.",
        pitfall: "Katıda iyon yoktur sonucunu çıkarma.",
      },
      {
        title: "NH₄Cl’de iki düzey",
        prompt:
          "NH₄Cl’de NH₄⁺ ile Cl⁻ arasındaki etkileşimi ve NH₄⁺ içindeki N–H bağlarını ayır.",
        strategy: "Önce incelenen iki parçayı tanımla.",
        steps: [
          {
            label: "Grupları belirle",
            explanation: "NH₄⁺ pozitif çok atomlu iyon, Cl⁻ negatif iyondur.",
          },
          {
            label: "Gruplar arasına bak",
            explanation: "Zıt yüklü iyonlar arasındaki çekim iyoniktir.",
          },
          {
            label: "İyonun içine bak",
            explanation:
              "N–H bağları atomların elektron çifti paylaşımını içerir; kovalenttir.",
          },
        ],
        answer: "İyonlar arası iyonik, N–H bağları kovalent.",
        check: "Metal bulunmaması bu tuzu moleküler bir bileşik yapmaz.",
        pitfall: "Bileşiğe tek bir bağ etiketi verip incelenen düzeyi unutma.",
      },
    ],
    questions: [
      [
        "İyonik bağın temel nedeni hangisidir?",
        [
          "Zıt yüklü iyonların elektrostatik çekimi",
          "Her durumda elektron çifti paylaşımı",
          "Yalnız nötronların çekimi",
          "Sadece aynı yüklü iyonların çekimi",
          "Atom numarasının değişmesi",
        ],
        0,
        "İyon oluşumu ile iyonlar arası kuvveti ayır.",
        "Elektron aktarımı iyonların oluşumunu açıklayabilir; iyonik bağ zıt yüklü iyonlar arasındaki elektrostatik çekimdir.",
      ],
      [
        "NaCl kristalindeki NaCl formülü neyi gösterir?",
        [
          "Bağımsız bir NaCl molekülünün boyunu",
          "Na⁺ ve Cl⁻ iyonlarının 1:1 oranını",
          "Yalnız elektron sayısını",
          "Tek birim hücrenin her zaman iki atomunu",
          "Çekirdek tepkimesini",
        ],
        1,
        "Örgü ile ayrık molekülü karıştırma.",
        "Formül birimi en küçük iyon oranını verir. Kristal üç boyutlu uzanan iyon örgüsüdür; bağımsız NaCl molekülleri diye yorumlanmaz.",
      ],
      [
        "Al³⁺ ve O²⁻ iyonlarından oluşan nötr bileşiğin en küçük formülü hangisidir?",
        ["AlO", "Al₃O₂", "Al₂O₃", "Al₂O₂", "AlO₃"],
        2,
        "İki yük büyüklüğünün ortak katı 6’dır.",
        "İki Al³⁺ toplam +6, üç O²⁻ toplam −6 taşır. Al₂O₃ nötrdür; Al₃O₂ nötr değildir.",
      ],
      [
        "Saf katı NaCl’nin elektrik iletmemesi hangi nedenle açıklanır?",
        [
          "Hiç iyon içermez",
          "Yalnız molekül içerir",
          "İyon yükleri yok olur",
          "İyonlar örgüde serbestçe yer değiştiremez",
          "Protonlar kristalden ayrılır",
        ],
        3,
        "Hareketli yük taşıyıcısı gerekiyor.",
        "Katıda iyonlar vardır fakat örgü konumlarına bağlıdır. Serbest yük taşımaları sınırlı olduğundan tipik iyonik katı iyi elektrik iletmez.",
      ],
      [
        "NH₄Cl için doğru ifade hangisidir?",
        [
          "Metal yoksa iyonik olamaz",
          "N–H bağları iyoniktir",
          "NH₄⁺ tek atomlu iyondur",
          "Cl⁻ pozitif iyondur",
          "NH₄⁺ ve Cl⁻ arasındaki çekim iyoniktir",
        ],
        4,
        "Çok atomlu iyonun bütününü düşün.",
        "NH₄⁺ ile Cl⁻ arasında iyonik çekim vardır; NH₄⁺ içindeki N–H bağları ise kovalenttir.",
      ],
      [
        "Ca²⁺ ve O²⁻ iyonlarının oluşturduğu tuzun en küçük formülü hangisidir?",
        ["CaO", "Ca₂O₂", "CaO₂", "Ca₂O", "Ca₂O₃"],
        0,
        "Yük denkleştikten sonra oranı sadeleştir.",
        "+2 ve −2 yükler 1:1 ile dengelenir. Ca₂O₂ nötr olsa da en küçük oran değildir; CaO yazılır.",
      ],
      [
        "İyonik tuzların suda çözünmesi için hangi genelleme doğrudur?",
        [
          "Hepsi sınırsız çözünür",
          "Çözünürlük tuza ve koşullara bağlıdır",
          "Hiçbiri iyon oluşturmaz",
          "Çözünme daima elektrolizdir",
          "AgCl her koşulda çok iyi çözünür",
        ],
        1,
        "Az çözünen iyonik tuz örneklerini düşün.",
        "İyonik olmak her tuzun çok çözündüğünü göstermez. AgCl az çözünür; çözelti iletkenliği de hareketli iyonların miktarına bağlıdır.",
      ],
      [
        "Maddenin hâli değişirken hangi durumda iyonların hareketliliği artabilir?",
        [
          "Saf tuz kristalinin soğutulmasında",
          "Nötron sayısı sabitken her durumda",
          "Tuzun eritilmesinde",
          "Her katı kırıldığında zorunlu olarak",
          "Atom numarası değiştiğinde",
        ],
        2,
        "Eriyikte örgü konumları sabit kalmaz.",
        "İyonik tuz eritildiğinde iyonlar daha serbest hareket eder; eriyik bu hareketli yük taşıyıcıları nedeniyle iletebilir.",
      ],
      [
        "Birim hücre ile formül birimini ayıran doğru ifade hangisidir?",
        [
          "İkisi de bağımsız moleküldür",
          "Birim hücre sadece gazlarda vardır",
          "Formül birimi 3 boyutlu kutunun adı olmak zorundadır",
          "Birim hücre geometrik tekrar parçası, formül birimi en küçük iyon oranıdır",
          "Formül birimi iyon yüklerini değiştirme işlemidir",
        ],
        3,
        "Geometrik tekrar ve bileşim oranı farklı kavramdır.",
        "Birim hücre kristal geometrisinin tekrarlanan parçasıdır; formül birimi en küçük tam sayılı iyon oranını ifade eder.",
      ],
      [
        "Suyun kaynaması sırasında H₂O için temel değişim hangisidir?",
        [
          "Her O–H bağı zorunlu kopar",
          "Suyun atom numarası değişir",
          "Tüm su iyonik kristal olur",
          "Oksijen çekirdeği parçalanır",
          "Moleküller arası etkileşimler aşılır",
        ],
        4,
        "Molekül içini ve moleküller arasını ayır.",
        "Kaynama bir hâl değişimidir; H₂O molekülünün içindeki bütün O–H bağlarının kopması ve suyun elementlerine ayrılması değildir.",
      ],
    ],
    objectives: [
      "Elektron aktarımı ile iyonlar arası çekimi ayır.",
      "Formül birimi, birim hücre ve molekül kavramlarını karşılaştır.",
      "İyonik maddede hâle göre hareketli yük taşıyıcısını ve yük dengesini açıkla.",
    ],
    recall: [
      {
        prompt: "İyonik bağın temel nedeni hangisidir?",
        answer:
          "Elektron aktarımı iyonların oluşumunu açıklayabilir; iyonik bağ zıt yüklü iyonlar arasındaki elektrostatik çekimdir.",
      },
      {
        prompt:
          "Al³⁺ ve O²⁻ iyonlarından oluşan nötr bileşiğin en küçük formülü hangisidir?",
        answer:
          "İki Al³⁺ toplam +6, üç O²⁻ toplam −6 taşır. Al₂O₃ nötrdür; Al₃O₂ nötr değildir.",
      },
      {
        prompt: "NH₄Cl için doğru ifade hangisidir?",
        answer:
          "NH₄⁺ ile Cl⁻ arasında iyonik çekim vardır; NH₄⁺ içindeki N–H bağları ise kovalenttir.",
      },
      {
        prompt:
          "Birim hücre ile formül birimini ayıran doğru ifade hangisidir?",
        answer:
          "Birim hücre kristal geometrisinin tekrarlanan parçasıdır; formül birimi en küçük tam sayılı iyon oranını ifade eder.",
      },
    ],
  },
  {
    id: "iyonik-bilesik-adlandirma",
    title: "İyonik bileşiklerin sistematik adlandırılması",
    topic: "detail-154",
    sections: [
      {
        title: "Önce iyonik yapıyı tanı, sonra adlandır",
        paragraphs: [
          "İyonik bileşik adında önce katyonun, sonra anyonun adı söylenir. NaCl sodyum klorür, MgO magnezyum oksittir. Bir tuzun adını yazmadan önce iyonları doğru tanımla; moleküler bileşiklerde kullanılan mono-, di-, tri- gibi sayı ön eklerini her iyonik bileşiğe taşıma.",
          "NH₄Cl metal sembolü içermese de amonyum ve klorür iyonlarından oluşur; amonyum klorür denir. CO₂ ise molekülerdir ve karbon dioksit olarak adlandırılır. Bir formülde metal görme ipucu yararlı olsa da çok atomlu iyonlar nedeniyle tek başına kesin sınıflandırma ölçütü değildir.",
        ],
      },
      {
        title: "Sabit yüklü katyon ve tek atomlu anyon adları",
        paragraphs: [
          "Na⁺ sodyum, K⁺ potasyum, Mg²⁺ magnezyum, Ca²⁺ kalsiyum, Al³⁺ alüminyum iyonudur. TYT düzeyindeki yaygın sabit yüklü örneklerde metalin adına gereksiz bir sayı eklenmez. AlCl₃ için alüminyum klorür denir; üç klorür bulunması metale III rakamı yazmak için tek başına gerekçe değildir.",
          "Tek atomlu anyon adlarını sembolüyle eşleştir: F⁻ florür, Cl⁻ klorür, Br⁻ bromür, I⁻ iyodür; O²⁻ oksit, S²⁻ sülfür, N³⁻ nitrür ve P³⁻ fosfür. Klor atomuyla klorür iyonu aynı tür değildir; formüldeki ad iyonik yapıya göre seçilir.",
        ],
      },
      {
        title: "Çok atomlu iyonu bütün olarak koru",
        paragraphs: [
          "NO₃⁻ nitrat, NO₂⁻ nitrit, OH⁻ hidroksit, SO₄²⁻ sülfat, SO₃²⁻ sülfit, CO₃²⁻ karbonat ve PO₄³⁻ fosfat yaygın örneklerdir. NH₄⁺ amonyum pozitif çok atomlu iyondur. Bir iyonun içindeki atom adetleri, tuz formülü yazarken keyfî olarak değiştirilemez.",
          "S²⁻ sülfür, SO₃²⁻ sülfit ve SO₄²⁻ sülfat aynı toplam yüke sahip olabilir fakat farklı türlerdir. Yük dengesi tek başına hangisinin bulunduğunu belirlemez; oksijen sayısını ve iyon adını ayrıca oku. Sülfat istenen yerde sülfür yazmak, yük toplamı sıfır olsa bile yanlış bileşik verir.",
        ],
      },
      {
        title: "Formülü en küçük nötr oranla kur",
        paragraphs: [
          "Katyonun pozitif yüküyle anyonun negatif yükünü toplamda sıfırlayan en küçük tam sayıları seç. Mg²⁺ ile Cl⁻ için MgCl₂; Al³⁺ ile O²⁻ için Al₂O₃; Ca²⁺ ile O²⁻ için CaO elde edilir. Önce yükleri yazmak, indisleri ad içindeki herhangi bir sayıdan kopyalamaktan daha güvenlidir.",
          "Yük büyüklüklerini çaprazlamak kısa yoldur; sadeleştirme ve toplam yük kontrolü zorunludur. Ancak çok atomlu iyonun kendi iç indisi sadeleştirilmez. Ca²⁺ ile SO₄²⁻ için oran 1:1 olduğunda CaSO₄ yazılır; SO₄ grubundaki 4 ortadan kaldırılıp CaS yazılmaz.",
        ],
      },
      {
        title: "Parantez iyon grubunu çoğaltır",
        paragraphs: [
          "Ca²⁺ ile NO₃⁻ için iki nitrat gerekir: Ca(NO₃)₂. Parantezin dışındaki 2, hem N hem de O adetlerini çarpar; bir formül birimi başına 2 N ve 6 O vardır. Grup yalnız bir kez bulunuyorsa gereksiz parantez çoğu yazımda kullanılmaz: NaNO₃.",
          "Al₂(SO₄)₃ ifadesinde 2 Al, 3 S ve 12 O bulunur. Bu, molekül sayımı değil formül birimi başına bileşim sayımıdır. Mg₃(PO₄)₂ için 3 Mg, 2 P ve 8 O vardır. Dış indisi sadece yanındaki son elemente uygulamak sık yapılan hatadır.",
        ],
      },
      {
        title: "Değişken metalin yükünü nötrlükten bul",
        paragraphs: [
          "Fe ve Cu gibi metaller yaygın örneklerde birden fazla yük alabilir. FeCl₂’de iki Cl⁻ toplam −2 olduğundan Fe²⁺ vardır ve ad demir(II) klorürdür. FeCl₃’te Fe³⁺ bulunur; demir(III) klorür denir. Roma rakamı metalin her bir iyonu için yük büyüklüğünü belirtir, formüldeki metal adedini değil.",
          "Fe₂O₃’te üç O²⁻ toplam −6’dır. İki Fe toplam +6 olmalı, her Fe+3 taşımalıdır. Bu nedenle demir(III) oksit denir. Aynı hesabı Fe₃(PO₄)₂’ye uygularsan iki fosfat toplam −6, üç Fe toplam +6 ve her Fe+2 olur; doğru ad demir(II) fosfattır.",
        ],
      },
      {
        title: "Roma rakamını doğru yerden oku",
        paragraphs: [
          "Cu₂O’da oksit −2 yüklüdür. İki Cu toplam +2’yi paylaşır ve her Cu+1 olur; bakır(I) oksit. CuO’da tek Cu+2’yi sağlar; bakır(II) oksit. İlk formülde Cu’nun yanındaki 2, metalin yükünün II olduğu anlamına gelmez.",
          "Bir örnekte birden çok aynı metalin farklı yükseltgenme basamakları bulunabildiği özel yapılar için ek bilgi gerekir. Buradaki temel alıştırmalar aynı tür metal iyonunun tek yükle bulunduğunu varsayar. Yaygın cıva(I) iyonu Hg₂²⁺ biçimindedir; bunu tek atomlu Hg⁺ olarak her duruma kopyalamak doğru değildir.",
        ],
      },
      {
        title: "Ad ve formülü çift yönlü doğrula",
        paragraphs: [
          "Addan formüle giderken önce iyon adlarını sembol ve yükleriyle yaz, en küçük nötr oranı bul, çok atomlu grubu koru. Formülden ada giderken aynı adımları tersine uygula: iyonları ayır, gerekiyorsa metal yükünü hesapla ve katyon–anyon adlarını sırala.",
          "En son üç kontrol yap: toplam yük sıfır mı, iyon kimlikleri doğru mu, oran en küçük mü? Nitrat–nitrit veya sülfat–sülfit karışıklığı ilk kontrolden kaçabilir. Bu nedenle sadece elektriksel nötrlük doğru bileşiği yazdığını kanıtlamaz; ad, atom sayısı ve iyon kökü de uyuşmalıdır.",
        ],
      },
    ],
    examples: [
      {
        title: "Fe₂O₃ adını kur",
        prompt: "Fe₂O₃ için oksidin yükü −2 olduğuna göre bileşik adı nedir?",
        strategy: "Toplam anyon yükünden her metalin yükünü hesapla.",
        steps: [
          {
            label: "Anyon yükü",
            explanation: "Üç O²⁻ toplam 3×(−2)=−6 taşır.",
          },
          {
            label: "Katyon yükü",
            explanation: "İki Fe toplam +6 taşımalı; her Fe+3’tür.",
          },
          {
            label: "Adlandır",
            explanation:
              "Değişken yüklü Fe için III kullanılır: demir(III) oksit.",
          },
        ],
        answer: "Demir(III) oksit",
        check: "2(+3)+3(−2)=0.",
        pitfall:
          "Roma rakamı demir atomu adedini değil demir iyonu yükünü gösterir.",
      },
      {
        title: "Kalsiyum nitratı yaz",
        prompt:
          "Ca²⁺ ve NO₃⁻ iyonlarından oluşan kalsiyum nitratın formülünü ve N/O adetlerini bul.",
        strategy: "Nitrat grubunu parçalamadan çoğalt.",
        steps: [
          {
            label: "Oranı kur",
            explanation: "Bir Ca²⁺ için iki NO₃⁻ gerekir.",
          },
          {
            label: "Grubu paranteze al",
            explanation: "Ca(NO₃)₂ yazılır; dıştaki 2 bütün grubu çarpar.",
          },
          {
            label: "Atomları say",
            explanation: "Bir formül birimi başına 1 Ca, 2 N ve 6 O bulunur.",
          },
        ],
        answer: "Ca(NO₃)₂; 2 N ve 6 O",
        check: "(+2)+2(−1)=0; nitrat içindeki 1:3 oranı korundu.",
        pitfall: "CaNO₆ yazmak N adedini kaybettirir ve iyon kimliğini bozar.",
      },
      {
        title: "Bakır oksitleri ayır",
        prompt:
          "Cu₂O ve CuO’da oksidin yükü −2’dir. İki bileşiğin adlarını bul.",
        strategy: "Her formülde Cu başına düşen pozitif yükü ayrı hesapla.",
        steps: [
          {
            label: "Cu₂O",
            explanation: "2 x−2=0; her Cu+1 olur.",
          },
          {
            label: "CuO",
            explanation: "x−2=0; Cu+2 olur.",
          },
          {
            label: "Adları karşılaştır",
            explanation: "Cu₂O bakır(I) oksit, CuO bakır(II) oksittir.",
          },
        ],
        answer: "Bakır(I) oksit ve bakır(II) oksit",
        check:
          "Roma rakamını indisle eşitlemek bu iki örnekte ters sonuç verir.",
        pitfall: "Adlandırma için metalin alttaki sayısını kopyalama.",
      },
      {
        title: "Magnezyum fosfatı kur",
        prompt:
          "Mg²⁺ ve PO₄³⁻ iyonlarından tuz formülünü ve oksijen adedini bul.",
        strategy: "İki iyonun yükleri için ortak toplam 6’yı seç.",
        steps: [
          {
            label: "Pozitif taraf",
            explanation: "Üç Mg²⁺ toplam +6 taşır.",
          },
          {
            label: "Negatif taraf",
            explanation: "İki PO₄³⁻ toplam −6 taşır; Mg₃(PO₄)₂ olur.",
          },
          {
            label: "Atom sayımı",
            explanation: "İki fosfat grubunda 2 P ve 8 O vardır.",
          },
        ],
        answer: "Mg₃(PO₄)₂; 8 O",
        check: "3(+2)+2(−3)=0; iyon kökü PO₄ değişmedi.",
        pitfall:
          "Fosfat grubunun içindeki 4 sadeleştirilecek bir iyon adedi değildir.",
      },
    ],
    questions: [
      [
        "MgBr₂ bileşiğinin doğru adı hangisidir?",
        [
          "Magnezyum dibrom",
          "Magnezyum(II) brom atomu",
          "Magnezyum bromür",
          "Magnezyum bromat",
          "Magnezyum oksit",
        ],
        2,
        "Br⁻ iyonunun adını kullan.",
        "Mg²⁺ ve Br⁻ iyonlarından oluşan MgBr₂ magnezyum bromürdür. İyonik adlandırmaya moleküler di- ön eki taşınmaz.",
      ],
      [
        "Fe₂O₃’te oksidin yükü −2’dir. Her Fe aynı yükü taşıdığına göre adı hangisidir?",
        [
          "Demir(I) oksit",
          "Demir(II) oksit",
          "Didemir trioksit",
          "Demir(III) oksit",
          "Demir(II) sülfür",
        ],
        3,
        "Üç oksidin toplam yükünü iki Fe’ye paylaştır.",
        "Toplam −6 anyon yükünü dengeleyen iki Fe toplam +6 taşır. Fe başına +3 olduğundan demir(III) oksit denir.",
      ],
      [
        "Ca²⁺ ve NO₃⁻ iyonlarından oluşan kalsiyum nitratın formülü hangisidir?",
        ["CaNO₃", "Ca₂NO₃", "CaNO₆", "Ca₂(NO₃)₃", "Ca(NO₃)₂"],
        4,
        "İki nitrat grubu gerekiyorsa grubu koru.",
        "Bir Ca²⁺ için iki nitrat gerekir; parantez dışı 2 bütün NO₃ grubunu çoğaltır. Ca(NO₃)₂ nötrdür.",
      ],
      [
        "Cu₂O’da oksidin yükü −2 ve her Cu’nun yükü aynı ise doğru ad hangisidir?",
        [
          "Bakır(I) oksit",
          "Bakır(II) oksit",
          "Bakır(III) oksit",
          "Bakır(I) peroksit",
          "Dibakır dioksit",
        ],
        0,
        "İki Cu toplam +2’yi paylaşır.",
        "2 x−2=0’dan her Cu+1 bulunur. İki Cu olması yükün II olduğunu göstermez; doğru ad bakır(I) oksittir.",
      ],
      [
        "Mg₃(PO₄)₂ formül biriminde kaç O vardır?",
        ["4", "8", "2", "6", "12"],
        1,
        "Dıştaki 2 bütün fosfat grubuna uygulanır.",
        "Her fosfatta 4 oksijen, iki fosfatta 2×4=8 oksijen vardır.",
      ],
      [
        "S²⁻, SO₃²⁻ ve SO₄²⁻ için sırasıyla doğru adlar hangisidir?",
        [
          "Sülfat, sülfür, sülfit",
          "Sülfit, sülfat, sülfür",
          "Sülfür, sülfit, sülfat",
          "Sülfür, sülfat, sülfit",
          "Nitrat, nitrit, nitrür",
        ],
        2,
        "Yükün aynı olması türü aynı yapmaz.",
        "S²⁻ sülfür, SO₃²⁻ sülfit, SO₄²⁻ sülfattır. Oksijen sayıları iyon köklerini ayırır.",
      ],
      [
        "Fe₃(PO₄)₂’de fosfat −3 yüklüdür. Her Fe aynı yükü taşıyorsa bileşiğin adı hangisidir?",
        [
          "Demir(III) fosfat",
          "Demir(I) fosfat",
          "Demir(III) fosfür",
          "Demir(II) fosfat",
          "Demir(II) sülfat",
        ],
        3,
        "İki fosfatın toplam −6 yükünü üç Fe’ye paylaştır.",
        "Üç Fe toplam +6 taşımalı, her Fe+2 olmalıdır. Doğru ad demir(II) fosfattır.",
      ],
      [
        "NH₄Cl için doğru ad hangisidir?",
        [
          "Azot tetraklorür",
          "Amonyum klorat",
          "Amonyum oksit",
          "Amonyak klor",
          "Amonyum klorür",
        ],
        4,
        "NH₄⁺ iyonunun adını hatırla.",
        "NH₄⁺ amonyum, Cl⁻ klorürdür. Bileşik amonyum klorürdür; metal içermemesi iyonik adlandırmayı değiştirmez.",
      ],
      [
        "Al³⁺ ve SO₄²⁻ iyonlarından oluşan tuzun en küçük formülü hangisidir?",
        ["Al₂(SO₄)₃", "Al₃(SO₄)₂", "AlSO₄", "Al₂SO₄", "Al₃SO₄"],
        0,
        "Toplam yük büyüklüğü 6 olmalı.",
        "İki Al³⁺ toplam +6 ve üç sülfat toplam −6 verir. SO₄ grubu korunarak Al₂(SO₄)₃ yazılır.",
      ],
      [
        "Ca²⁺ ve SO₄²⁻ iyonlarının nötr formülü neden CaSO₄’tür?",
        [
          "Sülfat içindeki 4 yok edilir",
          "İyon adetleri 1:1 olur; SO₄’ün iç yapısı korunur",
          "Ca’nın yükü 4’e çıkar",
          "SO₄ yalnız O atomudur",
          "Bütün indisler aynı sayıya çevrilir",
        ],
        1,
        "Grup sayısını ve grubun kendi atom oranını ayır.",
        "Yükler 2 ve −2 olduğu için birer iyon yeterlidir. SO₄ içindeki 4 oksijen adedi değişmez; grup parçalanıp sadeleştirilmez.",
      ],
    ],
    objectives: [
      "Katyon/anyon adını ve çok atomlu iyon kökünü tanı.",
      "Nötr formülü en küçük tam sayı oranıyla yaz; parantezi doğru kullan.",
      "Değişken metalin yükünü hesaplayıp Roma rakamıyla adlandır.",
    ],
    recall: [
      {
        prompt: "MgBr₂ bileşiğinin doğru adı hangisidir?",
        answer:
          "Mg²⁺ ve Br⁻ iyonlarından oluşan MgBr₂ magnezyum bromürdür. İyonik adlandırmaya moleküler di- ön eki taşınmaz.",
      },
      {
        prompt:
          "Ca²⁺ ve NO₃⁻ iyonlarından oluşan kalsiyum nitratın formülü hangisidir?",
        answer:
          "Bir Ca²⁺ için iki nitrat gerekir; parantez dışı 2 bütün NO₃ grubunu çoğaltır. Ca(NO₃)₂ nötrdür.",
      },
      {
        prompt: "Mg₃(PO₄)₂ formül biriminde kaç O vardır?",
        answer: "Her fosfatta 4 oksijen, iki fosfatta 2×4=8 oksijen vardır.",
      },
      {
        prompt:
          "Al³⁺ ve SO₄²⁻ iyonlarından oluşan tuzun en küçük formülü hangisidir?",
        answer:
          "İki Al³⁺ toplam +6 ve üç sülfat toplam −6 verir. SO₄ grubu korunarak Al₂(SO₄)₃ yazılır.",
      },
    ],
  },
] as const;
const source =
  "MEBİ TYT Kimya Konu Özetleri, basılı s.35–38 (canlı metin); Aurelia TYT Kimya 015 Güçlü Etkileşimler ve İyonik Bağ ile 016 İyonik Bileşiklerin Sistematik Adlandırılması, s.1–3. Özgün öğretim ve sorular; resmî sınav sorusu aktarımı değildir.";
export const ionicGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: 45,
  objectives: [...p.objectives],
  sections: p.sections.map((s) => ({
    title: s.title,
    paragraphs: [...s.paragraphs],
  })),
  examples: p.examples.map((e) => ({
    ...e,
    steps: e.steps.map((s) => ({ ...s })),
  })),
  recall: p.recall.map((r) => ({ ...r })),
  source,
}));
export const ionicTopics = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const ionicLessons: Lesson[] = packs.map((p, i) => ({
  id: p.id,
  title: txt(p.title),
  subjectId: "tyt-kimya",
  minutes: 45,
  tags: [p.id],
  source: txt(source),
  objectives: p.objectives.map(txt),
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
