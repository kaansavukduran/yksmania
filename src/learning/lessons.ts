import { txt as t, type Lesson, type Question } from "../domain/model";
type Pair = [string, string];
const q = (
  id: string,
  prompt: Pair,
  options: Pair[],
  answer: number,
  hint: Pair,
  explanation: Pair,
  skill: string,
): Question => ({
  id,
  prompt: t(...prompt),
  options: options.map((o) => t(...o)),
  answer,
  hint: t(...hint),
  explanation: t(...explanation),
  skill,
});
export const visualLessons: Lesson[] = [
  {
    id: "hucre-organelleri",
    subjectId: "tyt-biyoloji",
    title: t(
      "Hücre organelleri: yapı ve görev",
      "Cell organelles: structure and function",
    ),
    minutes: 20,
    tags: ["cell", "visual", "structure-function"],
    source: t(
      "MEBİ TYT Biyoloji Konu Özetleri: Hücresel Yapılar ve Görevleri; Aurelia Hücre Organelleri kopya kâğıdı ile karşılaştırılan özgün anlatım ve şema. Alıştırmalar resmî sınav sorusu değildir.",
      "Original instruction and schematic checked against MEBİ TYT Biology: Cellular Structures and Functions and the Aurelia cell-organelles sheet. Exercises are not official exam items.",
    ),
    objectives: [
      t(
        "Yapıyı, görevi ve hücre tipini birlikte ilişkilendir.",
        "Connect structure, function and cell type.",
      ),
      t(
        "Salgı proteininde ribozom–ER–Golgi ilişkisini açıkla.",
        "Explain the ribosome–ER–Golgi relationship for a secreted protein.",
      ),
    ],
    body: [
      {
        title: t("İsimden önce işi düşün", "Think of function before the name"),
        text: t(
          "Ribozom protein sentezler; Golgi bazı ürünleri değiştirir ve paketler. Zarlı çekirdeği olmayan prokaryotlarda da ribozom bulunur. Hücre zarı ve hücre duvarı organel değildir. Mitokondri ile kloroplast aynı işi yapmaz; yeşil bitki hücreleri her ikisini de taşıyabilir.",
          "Ribosomes synthesise proteins; Golgi modifies and packages some products. Prokaryotes have ribosomes despite lacking a membrane-bound nucleus. The plasma membrane and cell wall are not organelles. Mitochondria and chloroplasts have different roles; green plant cells can contain both.",
        ),
      },
      {
        title: t(
          "Şemadan genellemeye atlama",
          "Do not overgeneralise from a diagram",
        ),
        text: t(
          "Bu şema tipik hücreleri temsil eder. Kök hücresinde kloroplast olmayabilir; olgun insan alyuvarı çekirdeksizdir. Bir yapıyı tek bir çizimde görmek, bütün hücrelerde bulunduğunu kanıtlamaz.",
          "These diagrams represent typical cells. Root cells may lack chloroplasts, and mature human red blood cells lack nuclei. Seeing a structure in one diagram does not prove it occurs in every cell.",
        ),
      },
    ],
    questions: [
      q(
        "cell-1",
        [
          "Zarlı organelleri olmayan bir hücre protein sentezliyor. Bu işi hangi yapı yapar?",
          "A cell without membrane-bound organelles synthesises proteins. Which structure does this?",
        ],
        [
          ["Golgi aygıtı", "Golgi apparatus"],
          ["Ribozom", "Ribosome"],
          ["Kloroplast", "Chloroplast"],
        ],
        1,
        ["Zarsız olan yapıyı düşün.", "Think of a non-membranous structure."],
        [
          "Ribozom zarsızdır ve protein sentezler. Prokaryotlarda da bulunur.",
          "Ribosomes are non-membranous and synthesise proteins. Prokaryotes have them too.",
        ],
        "cell-structure",
      ),
      q(
        "cell-2",
        [
          "Salgılanacak bir proteinin işlenmesi ve paketlenmesinde en uygun sıra hangisidir?",
          "Which is the appropriate processing and packaging route for a secreted protein?",
        ],
        [
          ["Golgi → kloroplast → çekirdek", "Golgi → chloroplast → nucleus"],
          ["Mitokondri → hücre duvarı", "Mitochondrion → cell wall"],
          [
            "Granüllü ER → Golgi → salgı vezikülü",
            "Rough ER → Golgi → secretory vesicle",
          ],
        ],
        2,
        [
          "Sentezden sonraki taşıma ilişkisini izle.",
          "Follow the pathway after synthesis.",
        ],
        [
          "ER’de işlenen protein veziküllerle Golgi’ye taşınır; Golgi’de sınıflandırılıp salgı veziküllerine paketlenebilir.",
          "Protein processed in ER is carried to Golgi in vesicles; Golgi can sort it into secretory vesicles.",
        ],
        "protein-route",
      ),
      q(
        "cell-3",
        [
          "Yeşil bir bitki hücresinde hangi iki organel birlikte bulunabilir?",
          "Which two organelles can coexist in a green plant cell?",
        ],
        [
          ["Mitokondri ve kloroplast", "Mitochondria and chloroplasts"],
          [
            "Yalnız kloroplast; mitokondri olamaz",
            "Only chloroplasts; mitochondria cannot occur",
          ],
          ["Hücre duvarı ve ribozom", "Cell wall and ribosome"],
        ],
        0,
        [
          "Bitkilerin de hücresel solunum yaptığını hatırla.",
          "Remember that plants also carry out cellular respiration.",
        ],
        [
          "Yeşil bitki hücreleri fotosentez ve hücresel solunumla ilişkili iki organeli birlikte taşıyabilir. Hücre duvarı organel değildir.",
          "Green plant cells can contain organelles associated with both photosynthesis and cellular respiration. The cell wall is not an organelle.",
        ],
        "cell-comparison",
      ),
      q(
        "cell-4",
        [
          "Hücre zarındaki çift katlı lipit tabakası ne anlama gelir?",
          "What does the lipid bilayer of the plasma membrane mean?",
        ],
        [
          [
            "Mitokondrideki gibi iki ayrı zar",
            "Two separate membranes, as in mitochondria",
          ],
          [
            "Bir zar içindeki iki lipit katmanı",
            "Two lipid layers within one membrane",
          ],
          ["Zarsız bir organel", "A non-membranous organelle"],
        ],
        1,
        [
          "Lipit katmanı ile ayrı zar sayısını ayır.",
          "Distinguish lipid layers from separate membranes.",
        ],
        [
          "Lipit çift tabakası bir hücre zarının yapısıdır; iki ayrı zar demek değildir.",
          "The lipid bilayer is the structure of one membrane, not two separate membranes.",
        ],
        "membrane-structure",
      ),
      q(
        "cell-5",
        [
          "“Bütün bitki hücreleri kloroplast taşır.” yargısı için hangisi doğrudur?",
          "Which statement correctly evaluates “All plant cells contain chloroplasts”?",
        ],
        [
          [
            "Doğrudur; hücre duvarı bunu gerektirir.",
            "True; a cell wall requires it.",
          ],
          [
            "Doğrudur; mitokondri yoktur.",
            "True; plant cells lack mitochondria.",
          ],
          [
            "Yanlıştır; kök gibi bazı hücrelerde bulunmayabilir.",
            "False; some cells, such as root cells, may lack chloroplasts.",
          ],
        ],
        2,
        [
          "Hücre tipi ile özelleşmesini birlikte düşün.",
          "Consider both cell type and specialisation.",
        ],
        [
          "Kloroplast her bitki hücresinde bulunmak zorunda değildir. Şema tek başına tüm hücreleri temsil etmez.",
          "Not every plant cell must contain chloroplasts. One schematic cannot represent every cell.",
        ],
        "cell-exceptions",
      ),
    ],
  },
  {
    id: "periyodik-sistem",
    subjectId: "tyt-kimya",
    title: t("Periyodik sistem ve iyonlar", "Periodic system and ions"),
    minutes: 18,
    tags: ["periodic", "visual", "atomic-number"],
    source: t(
      "Aurelia Periyodik Cetvel Genel Özellikler ve MEBİ Kimya özetlerindeki kavramlarla karşılaştırılmış özgün anlatım. Temel element verileri PubChem Periodic Table’dan alınmıştır. Özgün sorular resmî sınav maddesi değildir.",
      "Original instruction checked against Aurelia periodic-table concepts and MEBİ chemistry summaries. Basic element facts come from PubChem Periodic Table. Original exercises are not official exam items.",
    ),
    objectives: [
      t(
        "Grup ile periyodu ayır; He istisnasını tanı.",
        "Distinguish group and period and recognise the helium exception.",
      ),
      t(
        "İyonlaşma sonrası Z’nin ve tablo konumunun değişmediğini açıkla.",
        "Explain why Z and table position do not change on ionisation.",
      ),
    ],
    body: [
      {
        title: t(
          "Elementin kimliği çekirdektedir",
          "Element identity is in the nucleus",
        ),
        text: t(
          "Atom numarası Z proton sayısıdır. Modern periyodik tabloda sıralama artan Z’ye göredir. Elektron almak veya vermek iyon oluşturur; proton sayısı değişmedikçe elementin tablodaki yeri değişmez. Net yük q = Z − e olduğundan e = Z − q yazılabilir.",
          "Atomic number Z is the proton count. The modern table is arranged by increasing Z. Gaining or losing electrons forms an ion; table position does not change unless proton count changes. Net charge is q = Z − e, so e = Z − q.",
        ),
      },
      {
        title: t(
          "Katman sayısını koşuluyla oku",
          "Read shell counts with their conditions",
        ),
        text: t(
          "İlk 20 nötr atomun temel hâlindeki dolu katman sayısı periyotla ilişkilidir. Ana gruplarda son katman elektronları grup hakkında bilgi verir; He, iki elektrona rağmen 18. gruptadır. İyonun dağılımını nötr atomun adresi gibi kullanma.",
          "For the first 20 neutral ground-state atoms, the number of occupied shells relates to period. Valence electrons help identify main groups; helium is in group 18 despite having two electrons. Do not treat an ion’s distribution as the neutral atom’s address.",
        ),
      },
    ],
    questions: [
      q(
        "periodic-1",
        [
          "Na atomu bir elektron verip Na⁺ oluyor. Hangisi değişmez?",
          "Na loses one electron to form Na⁺. What stays unchanged?",
        ],
        [
          ["Elektron sayısı", "Electron count"],
          ["Proton sayısı ve tablo konumu", "Proton count and table position"],
          ["Net yük", "Net charge"],
        ],
        1,
        [
          "Tablo yerini hangi tanecik belirler?",
          "Which particle determines table position?",
        ],
        [
          "Elektron değişir; çekirdekteki 11 proton değişmez. Na yine 3. periyot, 1. gruptadır.",
          "The electron count changes; the nucleus retains 11 protons. Na remains in period 3, group 1.",
        ],
        "atomic-identity",
      ),
      q(
        "periodic-2",
        [
          "Mg²⁺ iyonunda Z = 12. Elektron sayısı kaçtır?",
          "Mg²⁺ has Z = 12. How many electrons does it have?",
        ],
        [
          ["10", "10"],
          ["12", "12"],
          ["14", "14"],
        ],
        0,
        [
          "Pozitif yük elektron kaybını gösterir.",
          "Positive charge indicates electron loss.",
        ],
        ["e = Z − q = 12 − 2 = 10.", "e = Z − q = 12 − 2 = 10."],
        "ion-count",
      ),
      q(
        "periodic-3",
        [
          "He nötr atomunun 2 elektronu vardır. Hangi gruptadır?",
          "Neutral He has two electrons. Which group is it in?",
        ],
        [
          ["2", "2"],
          ["1", "1"],
          ["18", "18"],
        ],
        2,
        [
          "İlk katmanın dolu olmasıyla ilgili istisnayı hatırla.",
          "Recall the exception for a filled first shell.",
        ],
        [
          "He soy gazdır ve 18. gruptadır; iki değerlik elektronu onu 2. gruba yerleştirmez.",
          "He is a noble gas in group 18; two valence electrons do not put it in group 2.",
        ],
        "helium-exception",
      ),
      q(
        "periodic-4",
        [
          "Nötr Al atomunun temel hâl katman dağılımı 2, 8, 3. Periyodu kaçtır?",
          "Neutral ground-state Al has shell distribution 2, 8, 3. What is its period?",
        ],
        [
          ["13", "13"],
          ["3", "3"],
          ["5", "5"],
        ],
        1,
        [
          "Dolu katmanları say; toplam elektronu değil.",
          "Count occupied shells, not total electrons.",
        ],
        [
          "Üç dolu katman olduğu için 3. periyottadır. 13 ise atom numarasıdır.",
          "Three occupied shells put it in period 3. Thirteen is its atomic number.",
        ],
        "period-group",
      ),
      q(
        "periodic-5",
        [
          "17 proton ve 18 elektron taşıyan taneciğin yükü nedir?",
          "What is the charge of a particle with 17 protons and 18 electrons?",
        ],
        [
          ["−1", "−1"],
          ["+1", "+1"],
          ["0", "0"],
        ],
        0,
        ["q = proton − elektron.", "q = protons − electrons."],
        [
          "q = 17 − 18 = −1. Bu tanecik Cl⁻ iyonudur; element kimliği Cl olarak kalır.",
          "q = 17 − 18 = −1. This is Cl⁻; its element identity remains chlorine.",
        ],
        "ion-count",
      ),
    ],
  },
  {
    id: "alan-donusumleri",
    subjectId: "tyt-geometri",
    title: t(
      "Üçgen ve paralelkenarda alan",
      "Areas of triangles and parallelograms",
    ),
    minutes: 18,
    tags: ["geometry", "visual", "area"],
    source: t(
      "OGM Dersler Cepte, 9. sınıf Matematik: Üçgenin Alanı bölümündeki taban–yükseklik ilişkisiyle karşılaştırılmış özgün kesme ve birleştirme modeli. Sorular özgündür.",
      "Original dissection model checked against the base–height relationship in OGM Dersler Cepte, grade 9 Mathematics: Area of a Triangle. Exercises are original.",
    ),
    objectives: [
      t(
        "Dik yüksekliği eğik kenardan ayır.",
        "Distinguish perpendicular height from a slanted side.",
      ),
      t(
        "Alan formüllerini parça taşıyarak ilişkilendir.",
        "Relate area formulas by rearranging pieces.",
      ),
    ],
    body: [
      {
        title: t("Kesilen parça kaybolmaz", "A cut piece does not disappear"),
        text: t(
          "Bir parçayı büyütmeden, küçültmeden veya üst üste bindirmeden taşımak toplam alanı değiştirmez. Paralelkenarın bir yanındaki üçgen karşı tarafa taşındığında tabanı b ve yüksekliği h olan dikdörtgen oluşur: A = b × h.",
          "Moving a piece without resizing or overlapping it preserves total area. Translating a triangle from one side of a parallelogram to the other gives a rectangle with base b and height h: A = b × h.",
        ),
      },
      {
        title: t("Üçgende neden yarısı?", "Why one half for a triangle?"),
        text: t(
          "Bir üçgenin eş bir kopyasıyla kurulan paralelkenarın alanı b × h olur. İki eş üçgen bu alanı eşit paylaşır: A = b × h / 2. Buradaki h, seçilen tabana dik uzaklıktır. Birim cm ise alan birimi cm²’dir.",
          "A triangle and a congruent copy form a parallelogram of area b × h. The two triangles share the area equally: A = b × h / 2. Here h is perpendicular to the chosen base. If lengths are in cm, area is in cm².",
        ),
      },
    ],
    questions: [
      q(
        "area-1",
        [
          "Tabanı 8, bu tabana dik yüksekliği 5 birim olan üçgenin alanı kaçtır?",
          "A triangle has base 8 and perpendicular height 5 units. What is its area?",
        ],
        [
          ["40 birim²", "40 square units"],
          ["13 birim²", "13 square units"],
          ["20 birim²", "20 square units"],
        ],
        2,
        [
          "İki eş üçgenin birlikte oluşturduğu alanı düşün.",
          "Think of the combined area of two congruent triangles.",
        ],
        ["A = 8 × 5 / 2 = 20 birim².", "A = 8 × 5 / 2 = 20 square units."],
        "triangle-area",
      ),
      q(
        "area-2",
        [
          "Tabanı 8, dik yüksekliği 5 birim olan paralelkenarın alanı kaçtır?",
          "A parallelogram has base 8 and perpendicular height 5 units. What is its area?",
        ],
        [
          ["40 birim²", "40 square units"],
          ["20 birim²", "20 square units"],
          ["26 birim²", "26 square units"],
        ],
        0,
        [
          "Dikdörtgene dönüşünce taban ve yüksekliği koru.",
          "Preserve base and height in the rectangle.",
        ],
        [
          "A = b × h = 8 × 5 = 40 birim².",
          "A = b × h = 8 × 5 = 40 square units.",
        ],
        "parallelogram-area",
      ),
      q(
        "area-3",
        [
          "Bir üçgenin tabanı sabitken dik yüksekliği iki katına çıkıyor. Alanı nasıl değişir?",
          "A triangle’s base stays fixed while its perpendicular height doubles. What happens to its area?",
        ],
        [
          ["Değişmez.", "It stays the same."],
          ["İki katına çıkar.", "It doubles."],
          ["Dört katına çıkar.", "It quadruples."],
        ],
        1,
        [
          "Formülde yalnız değişen çarpanı izle.",
          "Track only the changing factor.",
        ],
        [
          "A = b × h / 2 olduğundan h yerine 2h yazınca alan iki katına çıkar.",
          "In A = b × h / 2, replacing h with 2h doubles the area.",
        ],
        "area-scaling",
      ),
      q(
        "area-4",
        [
          "Paralelkenardan kesilen bir parça yalnız öteleniyor; boşluk ve örtüşme bırakılmıyor. Toplam alan ne olur?",
          "A cut piece is translated without gaps or overlaps. What happens to total area?",
        ],
        [
          ["Artar.", "It increases."],
          ["Azalır.", "It decreases."],
          ["Korunur.", "It is preserved."],
        ],
        2,
        ["Parçanın boyutu değişti mi?", "Did the piece change size?"],
        [
          "Öteleme parçanın alanını değiştirmez. Boşluk veya örtüşme yoksa toplam alan da korunur.",
          "Translation preserves the piece’s area. With no gaps or overlaps, total area is preserved.",
        ],
        "area-conservation",
      ),
      q(
        "area-5",
        [
          "Alan hesabında kullanılan yükseklik hangisidir?",
          "Which height belongs in the area formula?",
        ],
        [
          [
            "Seçilen tabana dik uzaklık",
            "Perpendicular distance to the chosen base",
          ],
          ["Her zaman en uzun kenar", "Always the longest side"],
          ["Her zaman eğik kenar", "Always the slanted side"],
        ],
        0,
        [
          "Tabanla yaptığı açı 90° olmalıdır.",
          "It must be perpendicular to the base.",
        ],
        [
          "h, seçilen tabana dik uzaklıktır. Eğik kenar ancak gerçekten dikse yükseklik olarak kullanılabilir.",
          "h is the perpendicular distance to the base. A slanted side is not a height unless it is actually perpendicular.",
        ],
        "perpendicular-height",
      ),
    ],
  },
];
