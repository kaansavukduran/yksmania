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
  options: options.map((o) => t(o)),
  answer,
  hint: t(hint),
  explanation: t(explanation),
  skill,
});
export const visualLessons: Lesson[] = [
  {
    id: "hucre-organelleri",
    subjectId: "tyt-biyoloji",
    title: t("Hücre organelleri: yapı ve görev"),
    minutes: 55,
    tags: ["cell", "visual", "structure-function"],
    source: t(
      "MEBİ TYT Biyoloji Konu Özetleri: Hücresel Yapılar ve Görevleri; Aurelia Hücre Organelleri kopya kâğıdı ile karşılaştırılan özgün anlatım ve şema. Alıştırmalar resmî sınav sorusu değildir.",
    ),
    objectives: [
      t("Yapıyı, görevi ve hücre tipini birlikte ilişkilendir."),
      t("Salgı proteininde ribozom–ER–Golgi ilişkisini açıkla."),
    ],
    body: [
      {
        title: t("İsimden önce işi düşün"),
        text: t(
          "Ribozom protein sentezler; Golgi bazı ürünleri değiştirir ve paketler. Zarlı çekirdeği olmayan prokaryotlarda da ribozom bulunur. Hücre zarı ve hücre duvarı organel değildir. Mitokondri ile kloroplast aynı işi yapmaz; yeşil bitki hücreleri her ikisini de taşıyabilir.",
        ),
      },
      {
        title: t("Şemadan genellemeye atlama"),
        text: t(
          "Bu şema tipik hücreleri temsil eder. Kök hücresinde kloroplast olmayabilir; olgun insan alyuvarı çekirdeksizdir. Bir yapıyı tek bir çizimde görmek, bütün hücrelerde bulunduğunu kanıtlamaz.",
        ),
      },
    ],
    questions: [
      q(
        "cell-1",
        "Zarlı organelleri olmayan bir hücre protein sentezliyor. Bu işi hangi yapı yapar?",
        ["Golgi aygıtı", "Ribozom", "Kloroplast"],
        1,
        "Zarsız olan yapıyı düşün.",
        "Ribozom zarsızdır ve protein sentezler. Prokaryotlarda da bulunur.",
        "cell-structure",
      ),
      q(
        "cell-2",
        "Salgılanacak bir proteinin işlenmesi ve paketlenmesinde en uygun sıra hangisidir?",
        [
          "Golgi → kloroplast → çekirdek",
          "Mitokondri → hücre duvarı",
          "Granüllü ER → Golgi → salgı vezikülü",
        ],
        2,
        "Sentezden sonraki taşıma ilişkisini izle.",
        "ER’de işlenen protein veziküllerle Golgi’ye taşınır; Golgi’de sınıflandırılıp salgı veziküllerine paketlenebilir.",
        "protein-route",
      ),
      q(
        "cell-3",
        "Yeşil bir bitki hücresinde hangi iki organel birlikte bulunabilir?",
        [
          "Mitokondri ve kloroplast",
          "Yalnız kloroplast; mitokondri olamaz",
          "Hücre duvarı ve ribozom",
        ],
        0,
        "Bitkilerin de hücresel solunum yaptığını hatırla.",
        "Yeşil bitki hücreleri fotosentez ve hücresel solunumla ilişkili iki organeli birlikte taşıyabilir. Hücre duvarı organel değildir.",
        "cell-comparison",
      ),
      q(
        "cell-4",
        "Hücre zarındaki çift katlı lipit tabakası ne anlama gelir?",
        [
          "Mitokondrideki gibi iki ayrı zar",
          "Bir zar içindeki iki lipit katmanı",
          "Zarsız bir organel",
        ],
        1,
        "Lipit katmanı ile ayrı zar sayısını ayır.",
        "Lipit çift tabakası bir hücre zarının yapısıdır; iki ayrı zar demek değildir.",
        "membrane-structure",
      ),
      q(
        "cell-5",
        "“Bütün bitki hücreleri kloroplast taşır.” yargısı için hangisi doğrudur?",
        [
          "Doğrudur; hücre duvarı bunu gerektirir.",
          "Doğrudur; mitokondri yoktur.",
          "Yanlıştır; kök gibi bazı hücrelerde bulunmayabilir.",
        ],
        2,
        "Hücre tipi ile özelleşmesini birlikte düşün.",
        "Kloroplast her bitki hücresinde bulunmak zorunda değildir. Şema tek başına tüm hücreleri temsil etmez.",
        "cell-exceptions",
      ),
    ],
  },
  {
    id: "periyodik-sistem",
    subjectId: "tyt-kimya",
    title: t("Periyodik sistem ve iyonlar"),
    minutes: 50,
    tags: ["periodic", "visual", "atomic-number"],
    source: t(
      "Aurelia Periyodik Cetvel Genel Özellikler ve MEBİ Kimya özetlerindeki kavramlarla karşılaştırılmış özgün anlatım. Temel element verileri PubChem Periodic Table’dan alınmıştır. Özgün sorular resmî sınav maddesi değildir.",
    ),
    objectives: [
      t("Grup ile periyodu ayır; He istisnasını tanı."),
      t("İyonlaşma sonrası Z’nin ve tablo konumunun değişmediğini açıkla."),
    ],
    body: [
      {
        title: t("Elementin kimliği çekirdektedir"),
        text: t(
          "Atom numarası Z proton sayısıdır. Modern periyodik tabloda sıralama artan Z’ye göredir. Elektron almak veya vermek iyon oluşturur; proton sayısı değişmedikçe elementin tablodaki yeri değişmez. Net yük q = Z − e olduğundan e = Z − q yazılabilir.",
        ),
      },
      {
        title: t("Katman sayısını koşuluyla oku"),
        text: t(
          "İlk 20 nötr atomun temel hâlindeki dolu katman sayısı periyotla ilişkilidir. Ana gruplarda son katman elektronları grup hakkında bilgi verir; He, iki elektrona rağmen 18. gruptadır. İyonun dağılımını nötr atomun adresi gibi kullanma.",
        ),
      },
    ],
    questions: [
      q(
        "periodic-1",
        "Na atomu bir elektron verip Na⁺ oluyor. Hangisi değişmez?",
        ["Elektron sayısı", "Proton sayısı ve tablo konumu", "Net yük"],
        1,
        "Tablo yerini hangi tanecik belirler?",
        "Elektron değişir; çekirdekteki 11 proton değişmez. Na yine 3. periyot, 1. gruptadır.",
        "atomic-identity",
      ),
      q(
        "periodic-2",
        "Mg²⁺ iyonunda Z = 12. Elektron sayısı kaçtır?",
        ["10", "12", "14"],
        0,
        "Pozitif yük elektron kaybını gösterir.",
        "e = Z − q = 12 − 2 = 10.",
        "ion-count",
      ),
      q(
        "periodic-3",
        "He nötr atomunun 2 elektronu vardır. Hangi gruptadır?",
        ["2", "1", "18"],
        2,
        "İlk katmanın dolu olmasıyla ilgili istisnayı hatırla.",
        "He soy gazdır ve 18. gruptadır; iki değerlik elektronu onu 2. gruba yerleştirmez.",
        "helium-exception",
      ),
      q(
        "periodic-4",
        "Nötr Al atomunun temel hâl katman dağılımı 2, 8, 3. Periyodu kaçtır?",
        ["13", "3", "5"],
        1,
        "Dolu katmanları say; toplam elektronu değil.",
        "Üç dolu katman olduğu için 3. periyottadır. 13 ise atom numarasıdır.",
        "period-group",
      ),
      q(
        "periodic-5",
        "17 proton ve 18 elektron taşıyan taneciğin yükü nedir?",
        ["−1", "+1", "0"],
        0,
        "q = proton − elektron.",
        "q = 17 − 18 = −1. Bu tanecik Cl⁻ iyonudur; element kimliği Cl olarak kalır.",
        "ion-count",
      ),
    ],
  },
  {
    id: "alan-donusumleri",
    subjectId: "tyt-geometri",
    title: t("Üçgen ve paralelkenarda alan"),
    minutes: 18,
    tags: ["geometry", "visual", "area"],
    source: t(
      "OGM Dersler Cepte, 9. sınıf Matematik: Üçgenin Alanı bölümündeki taban–yükseklik ilişkisiyle karşılaştırılmış özgün kesme ve birleştirme modeli. Sorular özgündür.",
    ),
    objectives: [
      t("Dik yüksekliği eğik kenardan ayır."),
      t("Alan formüllerini parça taşıyarak ilişkilendir."),
    ],
    body: [
      {
        title: t("Kesilen parça kaybolmaz"),
        text: t(
          "Bir parçayı büyütmeden, küçültmeden veya üst üste bindirmeden taşımak toplam alanı değiştirmez. Paralelkenarın bir yanındaki üçgen karşı tarafa taşındığında tabanı b ve yüksekliği h olan dikdörtgen oluşur: A = b × h.",
        ),
      },
      {
        title: t("Üçgende neden yarısı?"),
        text: t(
          "Bir üçgenin eş bir kopyasıyla kurulan paralelkenarın alanı b × h olur. İki eş üçgen bu alanı eşit paylaşır: A = b × h / 2. Buradaki h, seçilen tabana dik uzaklıktır. Birim cm ise alan birimi cm²’dir.",
        ),
      },
    ],
    questions: [
      q(
        "area-1",
        "Tabanı 8, bu tabana dik yüksekliği 5 birim olan üçgenin alanı kaçtır?",
        ["40 birim²", "13 birim²", "20 birim²"],
        2,
        "İki eş üçgenin birlikte oluşturduğu alanı düşün.",
        "A = 8 × 5 / 2 = 20 birim².",
        "triangle-area",
      ),
      q(
        "area-2",
        "Tabanı 8, dik yüksekliği 5 birim olan paralelkenarın alanı kaçtır?",
        ["40 birim²", "20 birim²", "26 birim²"],
        0,
        "Dikdörtgene dönüşünce taban ve yüksekliği koru.",
        "A = b × h = 8 × 5 = 40 birim².",
        "parallelogram-area",
      ),
      q(
        "area-3",
        "Bir üçgenin tabanı sabitken dik yüksekliği iki katına çıkıyor. Alanı nasıl değişir?",
        ["Değişmez.", "İki katına çıkar.", "Dört katına çıkar."],
        1,
        "Formülde yalnız değişen çarpanı izle.",
        "A = b × h / 2 olduğundan h yerine 2h yazınca alan iki katına çıkar.",
        "area-scaling",
      ),
      q(
        "area-4",
        "Paralelkenardan kesilen bir parça yalnız öteleniyor; boşluk ve örtüşme bırakılmıyor. Toplam alan ne olur?",
        ["Artar.", "Azalır.", "Korunur."],
        2,
        "Parçanın boyutu değişti mi?",
        "Öteleme parçanın alanını değiştirmez. Boşluk veya örtüşme yoksa toplam alan da korunur.",
        "area-conservation",
      ),
      q(
        "area-5",
        "Alan hesabında kullanılan yükseklik hangisidir?",
        [
          "Seçilen tabana dik uzaklık",
          "Her zaman en uzun kenar",
          "Her zaman eğik kenar",
        ],
        0,
        "Tabanla yaptığı açı 90° olmalıdır.",
        "h, seçilen tabana dik uzaklıktır. Eğik kenar ancak gerçekten dikse yükseklik olarak kullanılabilir.",
        "perpendicular-height",
      ),
    ],
  },
];
