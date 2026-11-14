import { txt as t, type Lesson, type Question } from "../domain/model";
const q = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
  skill: string,
): Question => ({
  id,
  prompt: t(prompt),
  options: options.map((v) => t(v)),
  answer,
  hint: t(hint),
  explanation: t(explanation),
  skill,
});
export const aytLessons: Lesson[] = [
  {
    id: "turev-teget",
    subjectId: "ayt-matematik",
    title: t("Türev: kirişten teğete"),
    minutes: 22,
    tags: ["derivative", "rate-of-change", "tangent"],
    source: t(
      "MEBİ AYT Matematik Konu Özetleri, Türev ve Türev Alma Kuralları: PDF 78–80, basılı 76–78. Kavramlarla karşılaştırılarak hazırlanmış özgün anlatım, vektör modeli ve alıştırmalar; resmî sınav soruları değildir.",
    ),
    objectives: [
      t("Ortalama değişim oranını kiriş eğimiyle ilişkilendir."),
      t("h sıfıra iki yönden yaklaşırken teğet eğimini incele."),
      t("Sürekli bir fonksiyonun her noktada türevli olmayabileceğini açıkla."),
    ],
    body: [
      {
        title: t("İki nokta arasındaki değişimi önce oranla"),
        text: t(
          "A = (a, f(a)) ve B = (a+h, f(a+h)) için h ≠ 0 iken kiriş eğimi [f(a+h) − f(a)] / h olur. Bu, iki nokta arasındaki ortalama değişim oranıdır. f(x)=x² için payı açınca 2ah+h² elde edilir; h sıfır değilken oran 2a+h olur.",
        ),
      },
      {
        title: t("Teğet bir limit sonucudur"),
        text: t(
          "h → 0 iken sağdan ve soldan aynı sonlu limite ulaşılıyorsa bu değer f′(a), yani o noktadaki teğetin eğimidir. f(x)=x² için f′(a)=2a bulunur. Örneğin a=1 ve h=0,5 iken kiriş eğimi 2,5; teğet eğimi ise 2’dir. h’yi doğrudan sıfır yazmak 0/0 ifadesini hesaplamak anlamına gelmez.",
        ),
      },
      {
        title: t("Köşede iki yönü ayrı kontrol et"),
        text: t(
          "f(x)=|x|, x=0 noktasında süreklidir. Bu noktada soldan eğim −1’e, sağdan eğim +1’e yaklaşır. İki yön aynı sonucu vermediği için türev yoktur. Sadece grafiğin kopmamasına bakarak türevli olduğuna karar veremeyiz.",
        ),
      },
    ],
    questions: [
      q(
        "dt-1",
        "f(x)=x² eğrisi üzerindeki A(2; 4) ve B(2,5; 6,25) noktalarından geçen kirişin eğimi kaçtır?",
        ["4", "4,5", "5"],
        1,
        "İki noktanın y değerleri farkını x değerleri farkına böl.",
        "(2,5²−2²)/0,5 = (6,25−4)/0,5 = 4,5. Bu, iki nokta arasındaki ortalama değişim oranıdır.",
        "secant-rate",
      ),
      q(
        "dt-2",
        "f(x)=x² için a=2 sabitken h, sıfıra iki yönden yaklaşıyor. Teğet eğimi hangi değere yaklaşır?",
        ["0", "2", "4"],
        2,
        "2a+h ifadesinde h → 0 limitini düşün.",
        "f′(2)=2·2=4. Kiriş eğimi sağdan ve soldan 4’e yaklaşır.",
        "derivative-limit",
      ),
      q(
        "dt-3",
        "f(x)=x² eğrisinin x=−1 noktasındaki teğet eğimi kaçtır?",
        ["−2", "1", "2"],
        0,
        "Türevde a’nın işaretini koru.",
        "f′(a)=2a olduğundan f′(−1)=−2. Eğrinin bu noktadaki teğeti sağa doğru azalır.",
        "slope-sign",
      ),
      q(
        "dt-4",
        "f(x)=|x| için x=0’da soldan eğim −1, sağdan eğim +1 bulunuyor. Hangisi doğrudur?",
        [
          "Ortalama alınır ve türev 0 olur.",
          "Fonksiyon sürekli olsa da bu noktada türev yoktur.",
          "İki eğimin büyüklüğü eşit olduğu için türev vardır.",
        ],
        1,
        "Türev için sağ ve sol limitin kendileri eşit olmalıdır.",
        "−1 ile +1 farklıdır. Büyüklüklerin eşit olması veya grafiğin sürekli olması türev için yeterli değildir.",
        "corner-derivative",
      ),
      q(
        "dt-5",
        "Türev tanımındaki [f(a+h)−f(a)]/h oranı incelenirken hangisi doğrudur?",
        [
          "h doğrudan 0 yazılır; oran her zaman 0 çıkar.",
          "Yalnız sağdan yaklaşmak her fonksiyonda yeterlidir.",
          "h ≠ 0 değerleriyle yaklaşılır; iki yönün ortak limiti kontrol edilir.",
        ],
        2,
        "Oranın tanımlı olması ile limitin varlığını ayır.",
        "h paydada olduğu için oran h ≠ 0 iken kurulur. İki taraflı türev için sağ ve sol yaklaşımların ortak bir sonlu değere ulaşması gerekir.",
        "limit-definition",
      ),
    ],
  },
  {
    id: "elektrik-alan",
    subjectId: "ayt-fizik",
    title: t("Elektrik alan ve test yükü"),
    minutes: 20,
    tags: ["electric-field", "vector", "inverse-square"],
    source: t(
      "MEBİ AYT Fizik Konu Özetleri: Elektrik Alanı, PDF 105–106 / basılı 103–104; Elektrik Alanda Yüklü Taneciğe Etkiyen Kuvvet, PDF 113 / basılı 111. Özgün tek-kaynak modeli ve alıştırmalar; kitap sorularının kopyası değildir.",
    ),
    objectives: [
      t("Alanı oluşturan kaynak yük ile alanı deneyen taneciği ayır."),
      t("E = kQ/r² ve F = qE bağıntılarında büyüklük ve yönü birlikte incele."),
      t("Uzaklığın iki katına çıkmasının etkisini açıkla."),
    ],
    body: [
      {
        title: t("Alanı kaynak oluşturur"),
        text: t(
          "Boşlukta bir noktasal kaynağın alan büyüklüğü |E|=k|Q|/r² ile hesaplanır. Alan, pozitif kaynaktan dışarıya; negatif kaynağa doğru yönelir. Bu modelde incelenen nokta kaynağın sağındadır ve kaynak sabit tutulur. µC birimi 10⁻⁶ C’dir; hesap SI birimleriyle yapılır.",
        ),
      },
      {
        title: t("Kuvvetin yönünde test yükünün işareti de vardır"),
        text: t(
          "Elektriksel kuvvet vektörel olarak F=qE’dir. Pozitif tanecikte kuvvet alanla aynı, negatif tanecikte ters yönlüdür. Sadece q’nun işaretini değiştirmek kaynağın alanını değiştirmez. Yüksüz tanecikte elektriksel kuvvet sıfırdır; kaynak yükün oluşturduğu alan yine vardır.",
        ),
      },
      {
        title: t("Uzaklığın karesini unutma"),
        text: t(
          "Q sabitken uzaklık r’den 2r’ye çıkarılırsa alan dörtte bire iner. Örneğin +1 µC kaynaktan 1 m uzakta |E|=9.000 N/C, 2 m uzakta |E|=2.250 N/C olur. Yön aynı kalır. Ok uzunlukları bu sahnede büyüklük ölçüsü değildir; değerleri sonuç satırından karşılaştır.",
        ),
      },
    ],
    questions: [
      q(
        "ef-1",
        "Pozitif bir kaynak yükün sağındaki noktada negatif bir test yükü var. Alanın ve test yüküne kuvvetin yönleri nasıldır?",
        [
          "Alan sola, kuvvet sağa.",
          "Alan sağa, kuvvet sola.",
          "İkisi de sağa.",
        ],
        1,
        "Önce pozitif kaynağın alan yönünü, sonra negatif q’nun etkisini bul.",
        "Pozitif kaynağın sağındaki alan sağadır. F=qE olduğundan negatif test yüküne kuvvet sola yönelir.",
        "field-force-direction",
      ),
      q(
        "ef-2",
        "Noktasal bir yükün 1 m uzağında alan büyüklüğü 9.000 N/C. Yük ve ortam aynı kalırken 2 m uzakta alan kaç N/C olur?",
        ["4.500", "2.250", "18.000"],
        1,
        "E, uzaklığın karesiyle ters orantılıdır.",
        "Uzaklık iki katına çıktığı için alan 2²=4’e bölünür: 9.000/4=2.250 N/C.",
        "inverse-square",
      ),
      q(
        "ef-3",
        "Negatif bir kaynak yükün sağındaki noktada pozitif test yükü bulunuyor. Hangisi doğrudur?",
        [
          "Alan sağa, kuvvet sola.",
          "Alan sağa, kuvvet sağa.",
          "Alan sola, kuvvet sola.",
        ],
        2,
        "Negatif kaynağın alanı kaynağa doğrudur.",
        "Nokta kaynağın sağında olduğundan kaynağa doğru yön soldur. Pozitif test yüküne kuvvet de alanla aynı yöndedir.",
        "negative-source",
      ),
      q(
        "ef-4",
        "Kaynak ve konum aynı kalırken test taneciği yüksüz hâle getiriliyor. Ne olur?",
        [
          "Kaynağın alanı aynı kalır; bu taneciğe elektriksel kuvvet sıfır olur.",
          "Alan sıfırlanır; kuvvet aynı kalır.",
          "Alan ve kuvvet mutlaka iki katına çıkar.",
        ],
        0,
        "Alanı Q, kuvveti ayrıca q belirler.",
        "Kaynağın alanı q’ya bağlı değildir. Taneciğin yükü q=0 olduğunda F=qE=0 olur.",
        "neutral-probe",
      ),
      q(
        "ef-5",
        "Sabit bir elektrik alanında +1 µC taneciğe 0,009 N elektriksel kuvvet etki ediyor. Aynı noktaya +2 µC konursa ne olur?",
        [
          "Alan da kuvvet de iki katına çıkar.",
          "Alan aynı kalır; kuvvet 0,018 N olur.",
          "Alan yarıya iner; kuvvet aynı kalır.",
        ],
        1,
        "Kaynak değişmiyor; F=qE’de yalnız q değişiyor.",
        "Alan aynı kalır. Test yükü iki katına çıktığından kuvvet de iki katına çıkar: 0,018 N.",
        "test-charge-scaling",
      ),
    ],
  },
  {
    id: "kimyasal-denge",
    subjectId: "ayt-kimya",
    title: t("Denge: derişim ve tepkime hızı"),
    minutes: 22,
    tags: ["equilibrium", "kinetics", "catalyst"],
    source: t(
      "MEBİ AYT Kimya Konu Özetleri, Kimyasal Denge: PDF 70–71 ve 75 / basılı 68–69 ve 73. Dinamik denge, derişim ve katalizör kavramlarına göre hazırlanmış özgün A ⇌ B modeli ve alıştırmalar.",
    ),
    objectives: [
      t(
        "Dengede hızların eşit, derişimlerin sabit fakat farklı olabileceğini göster.",
      ),
      t("Başlangıç karışımı ile denge karışımını ayır."),
      t("Katalizörün dengeye yaklaşma hızını değiştirmesini Kc’den ayır."),
    ],
    body: [
      {
        title: t("Aynı kapta iki yönlü dönüşüm"),
        text: t(
          "Kapalı ve sabit sıcaklıklı bir sistemde tersinir tepkimenin ileri ve geri yönleri birlikte sürer. Dengede bu hızlar eşittir; bu yüzden gözlenen derişimler sabit kalır. Moleküler olayların durması veya iki maddenin derişiminin eşit olması gerekmez.",
        ),
      },
      {
        title: t("Basit bir modelle dengeyi hesapla"),
        text: t(
          "Burada sabit hacimli, tek basamaklı A ⇌ B tepkimesi kullanılır: v(ileri)=0,6[A], v(geri)=0,3[B]. Dengede 0,6[A]=0,3[B], dolayısıyla [B]/[A]=2 olur. Toplam derişim 3 mol/L olduğundan denge karışımında [A]=1 ve [B]=2 mol/L’dir. Bu bir modeldir; hız yasaları her tepkimeye böyle aktarılmaz.",
        ),
      },
      {
        title: t("Katalizör son oranı değiştirmez"),
        text: t(
          "Bu sahnede katalizör ileri ve geri hız sabitlerini aynı çarpanla artırır. Denge karışımındaki A/B oranı ve Kc=2 sabit kalırken dengeye yaklaşım hızlanır. Dengede de iki yön daha hızlı çalışabilir: net derişim değişimi yine sıfırdır. Grafikteki sonlu zaman değerleri yuvarlanır; matematiksel denge sınırı ayrı gösterilir.",
        ),
      },
    ],
    questions: [
      q(
        "eq-1",
        "Kimyasal dengede derişimlerin sabit olması neyi gösterir?",
        [
          "Tepkimelerin tamamen durduğunu.",
          "İleri ve geri tepkime hızlarının eşit olduğunu.",
          "Giren ve ürün derişimlerinin mutlaka eşit olduğunu.",
        ],
        1,
        "Mikroskobik dönüşüm ile net değişimi ayır.",
        "Denge dinamiktir: iki yön sürer, hızları eşit olduğundan net derişim değişimi olmaz. Derişimler eşit olmak zorunda değildir.",
        "dynamic-equilibrium",
      ),
      q(
        "eq-2",
        "A ⇌ B dengesi için [A]=1 mol/L ve [B]=2 mol/L. Kc kaçtır?",
        ["0,5", "1", "2"],
        2,
        "Denklem katsayıları 1: Kc=[B]/[A].",
        "Kc=2/1=2. Bu oran denge derişimleriyle hesaplanır.",
        "equilibrium-ratio",
      ),
      q(
        "eq-3",
        "Dengeye henüz ulaşmamış, sabit sıcaklıklı A ⇌ B modelinde bir katalizör her iki yönün hız sabitini de üç katına çıkarıyor. Hangisi doğrudur?",
        [
          "Denge derişimleri ve Kc aynı kalır; dengeye yaklaşım hızlanır.",
          "Kc üç katına çıkar.",
          "Geri tepkime durur.",
        ],
        0,
        "Hız sabitlerinin oranında ortak çarpan sadeleşir.",
        "İki sabit de aynı oranda arttığı için Kc değişmez. İleri ve geri tepkimeler hızlanır; denge karışımı değişmez.",
        "catalyst-equilibrium",
      ),
      q(
        "eq-4",
        "A ⇌ B modeli başlangıçta yalnız B içeriyor. İlk anda v(ileri)=k(ileri)[A] ve v(geri)=k(geri)[B] için hangisi doğrudur?",
        [
          "İleri hız pozitif, geri hız sıfır.",
          "İki hız da sıfır.",
          "İleri hız sıfır, geri hız pozitif.",
        ],
        2,
        "Başlangıçta [A]=0, [B]>0.",
        "İleri hız A’ya bağlı olduğu için ilk anda sıfırdır. B bulunduğu için geri tepkime başlayabilir; zamanla A oluşur.",
        "initial-rates",
      ),
      q(
        "eq-5",
        "A ⇌ B için Kc=2 ve toplam denge derişimi [A]+[B]=6 mol/L. Denge karışımı hangisidir?",
        ["[A]=3, [B]=3", "[A]=4, [B]=2", "[A]=2, [B]=4"],
        2,
        "[B]=2[A] eşitliğini toplamla birlikte kullan.",
        "[A]+2[A]=6 olduğundan [A]=2, [B]=4 mol/L. Hem toplam 6 hem [B]/[A]=2 sağlanır.",
        "equilibrium-conservation",
      ),
    ],
  },
  {
    id: "dna-eslenmesi",
    subjectId: "ayt-biyoloji",
    title: t("DNA eşlenmesi: eski ve yeni zincirler"),
    minutes: 23,
    tags: ["dna", "replication", "semiconservative"],
    source: t(
      "MEBİ AYT Biyoloji Konu Özeti, Bölüm 2: PDF 38–40 / basılı 158–160, DNA’nın Kendini Eşlemesi. Bölüm dosyası tam kitabın PDF 123–244 kesitidir. Özgün molekül şeması ve alıştırmalar; resmî sınav soruları değildir.",
    ),
    objectives: [
      t("Yarı korunumlu eşlenmede her eski zincirin nereye gittiğini izle."),
      t("Tamamlayıcı baz eşleşmesi ile zincir yönlerini birlikte göster."),
      t("Yeni nükleotit, yeni zincir ve DNA molekülü sayılarını ayır."),
    ],
    body: [
      {
        title: t("Her eski zincir bir kalıptır"),
        text: t(
          "Yarı korunumlu eşlenmede iki atasal DNA zinciri birbirinden ayrılır ve her biri tamamlayıcı bir yeni zincir için kalıp olur. Sonuçta iki DNA molekülü oluşur; her molekülde bir eski ve bir yeni zincir vardır. Eski zincirler yok edilip baştan yapılmaz.",
        ),
      },
      {
        title: t("Baz eşleşmesi yönü de korumalı"),
        text: t(
          "DNA’da A karşısına T, G karşısına C gelir. Karşılıklı zincirler antiparaleldir: üst zincir 5′–ATGC–3′ ise karşısında aynı hizayla 3′–TACG–5′ bulunur. Yeni zincirler 5′→3′ yönünde uzar. Şemadaki iki farklı ok yönü sayfa üzerindeki yerleşimden kaynaklanır; ikisi de yeni zincirin 5′→3′ yönüdür.",
        ),
      },
      {
        title: t("Şemanın gösterdiğiyle enzim ayrıntısını ayır"),
        text: t(
          "Helikaz zincirlerin açılmasına yardım eder; DNA polimeraz hazır bir başlangıçtan sonra nükleotit ekler, ligaz parçaları birleştirir. Gerçek replikasyonda primerler, kesintisiz ve kesintili sentez vardır. Buradaki altı baz çiftlik çizim, bir replikasyon çatalı animasyonu yerine eski/yeni zincirlerin molekül düzeyindeki dağılımını gösterir.",
        ),
      },
    ],
    questions: [
      q(
        "dna-1",
        "Bir DNA molekülü bir kez yarı korunumlu eşleniyor. Oluşan her DNA için hangisi doğrudur?",
        [
          "İki zinciri de tamamen eskidir.",
          "Bir eski ve bir yeni zincir içerir.",
          "İki zinciri de tamamen yenidir.",
        ],
        1,
        "İki atasal zincirin her biri ayrı kalıp olur.",
        "Her atasal zincirin karşısında yeni bir tamamlayıcı zincir oluşur. İki yavru DNA’nın her birinde bir eski, bir yeni zincir vardır.",
        "semiconservative",
      ),
      q(
        "dna-2",
        "Üst zincir soldan sağa 5′–ATGC–3′. Tamamlayıcı alt zincir aynı hizada nasıl yazılır?",
        ["5′–TACG–3′", "3′–ATGC–5′", "3′–TACG–5′"],
        2,
        "Hem A–T/G–C eşleşmesini hem ters yönleri kontrol et.",
        "A’nın karşısına T, T’nin karşısına A, G’nin karşısına C, C’nin karşısına G gelir. Karşılıklı zincirler antiparaleldir.",
        "antiparallel-complement",
      ),
      q(
        "dna-3",
        "DNA polimerazın uzattığı yeni zincirin sentez yönü hangisidir?",
        ["5′ → 3′", "3′ → 5′", "Her basamakta rastgele değişir."],
        0,
        "Yeni nükleotit, büyüyen zincirin 3′ ucuna eklenir.",
        "DNA polimeraz yeni zinciri 5′→3′ yönünde uzatır. Kalıp zincir antiparalel yerleşir.",
        "synthesis-direction",
      ),
      q(
        "dna-4",
        "6 baz çiftli tek bir DNA tamamen eşleniyor. Yeni zincirler için toplam kaç yeni nükleotit kullanılır?",
        ["6", "12", "24"],
        1,
        "Her biri 6 nükleotitlik iki yeni zincir yapılır.",
        "İki atasal zincir 6’şar nükleotitlik yeni zincir için kalıp olur: 2×6=12 yeni nükleotit gerekir.",
        "nucleotide-count",
      ),
      q(
        "dna-5",
        "Bir DNA, kayıp olmadan iki tam eşlenme turu geçiriyor. Yalnız en baştaki iki zincir “eski” sayılırsa son durumda dağılım nasıldır?",
        [
          "2 eski + 2 yeni zincir",
          "4 eski + 4 yeni zincir",
          "2 eski + 6 yeni zincir",
        ],
        2,
        "İki tur sonunda 4 çift zincirli DNA, yani 8 zincir bulunur.",
        "Başlangıçtaki iki zincir korunur. Toplam 8 zincirin diğer 6’sı daha sonra sentezlendiğinden dağılım 2 eski + 6 yenidir.",
        "replication-rounds",
      ),
    ],
  },
];
