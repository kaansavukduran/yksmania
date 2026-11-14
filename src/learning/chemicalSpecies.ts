import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";

export interface SpeciesAtom {
  symbol: string;
  valence: number;
  x: number;
  y: number;
}
export interface SpeciesStage {
  title: string;
  explanation: string;
  orders: number[];
  nonbonding: number[];
}
export interface SpeciesExample {
  id: string;
  title: string;
  formula: string;
  kind: string;
  charge: number;
  atoms: SpeciesAtom[];
  links: [number, number][];
  stages: SpeciesStage[];
  central: number;
  actualElectrons?: number;
  radical?: boolean;
}
const atom = (
  symbol: string,
  valence: number,
  x: number,
  y = 150,
): SpeciesAtom => ({ symbol, valence, x, y });
const stage = (
  title: string,
  explanation: string,
  orders: number[],
  nonbonding: number[],
): SpeciesStage => ({ title, explanation, orders, nonbonding });
const blank = (n: number, links = 0) =>
  stage(
    "Önce bütçeyi bul",
    "Atomların nötr değerlik elektronlarını topla. Negatif yükte elektron ekle, pozitif yükte çıkar. Henüz yerleşim yapılmadı; boş çizim elektronların yok olduğu anlamına gelmez.",
    Array(links).fill(0),
    Array(n).fill(0),
  );

export const chemicalSpeciesExamples: SpeciesExample[] = [
  {
    id: "h2o",
    title: "Su · H₂O",
    formula: "H₂O",
    kind: "Nötr bileşik molekülü",
    charge: 0,
    atoms: [atom("O", 6, 240), atom("H", 1, 110), atom("H", 1, 370)],
    links: [
      [0, 1],
      [0, 2],
    ],
    central: 0,
    stages: [
      blank(3, 2),
      stage(
        "İki tek bağı yerleştir",
        "O merkezde, H atomları uçtadır. İki bağ çifti 4 elektron kullanır. Her H, ortaklaşa kullanılan çift sayesinde duetini tamamlar.",
        [1, 1],
        [0, 0, 0],
      ),
      stage(
        "Kalanı oksijene yerleştir",
        "8 − 4 = 4 elektron, O üzerinde iki yalnız çift olur. O çevresinde bağlardan 4 ve yalnız çiftlerden 4 olmak üzere 8 elektron sayılır.",
        [1, 1],
        [4, 0, 0],
      ),
    ],
  },
  {
    id: "co2",
    title: "Karbondioksit · CO₂",
    formula: "CO₂",
    kind: "Nötr bileşik molekülü",
    charge: 0,
    atoms: [atom("C", 4, 240), atom("O", 6, 100), atom("O", 6, 380)],
    links: [
      [0, 1],
      [0, 2],
    ],
    central: 0,
    stages: [
      blank(3, 2),
      stage(
        "İskeleti tek bağlarla kur",
        "O–C–O iskeletindeki iki tek bağ 4 elektron kullanır. Bütçede 12 elektron kalır.",
        [1, 1],
        [0, 0, 0],
      ),
      stage(
        "Bütçe bitti; merkez eksik",
        "Her uç O üzerine üç yalnız çift koyunca toplam 16 elektron yerleşir. O atomları oktettedir fakat C çevresinde yalnız 4 elektron vardır. Bütçenin doğru olması tek başına yeterli değildir.",
        [1, 1],
        [0, 6, 6],
      ),
      stage(
        "Yalnız çiftleri bağa taşı",
        "Her O'dan bir yalnız çift ortak bağ çiftine dönüşür. O=C=O oluşur; yeni elektron eklenmez. Bağlarda 8, yalnız çiftlerde 8: toplam yine 16; her atomun çevresi 8 elektrondur.",
        [2, 2],
        [0, 4, 4],
      ),
    ],
  },
  {
    id: "nh3",
    title: "Amonyak · NH₃",
    formula: "NH₃",
    kind: "Nötr bileşik molekülü",
    charge: 0,
    atoms: [
      atom("N", 5, 240),
      atom("H", 1, 110),
      atom("H", 1, 370),
      atom("H", 1, 240, 255),
    ],
    links: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    central: 0,
    stages: [
      blank(4, 3),
      stage(
        "Üç bağ çiftini ayır",
        "Üç N–H bağı toplam 6 elektron kullanır. Üç H de duetini tamamlar.",
        [1, 1, 1],
        [0, 0, 0, 0],
      ),
      stage(
        "Azotta bir yalnız çift bırak",
        "Toplam 8 elektrondan kalan 2 elektron N üzerinde bir yalnız çifttir. N çevresinde 6 bağ elektronu + 2 yalnız elektron = 8 bulunur.",
        [1, 1, 1],
        [2, 0, 0, 0],
      ),
    ],
  },
  {
    id: "nh4",
    title: "Amonyum · NH₄⁺",
    formula: "NH₄⁺",
    kind: "Çok atomlu katyon",
    charge: 1,
    atoms: [
      atom("N", 5, 240),
      atom("H", 1, 110),
      atom("H", 1, 370),
      atom("H", 1, 240, 55),
      atom("H", 1, 240, 255),
    ],
    links: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
    central: 0,
    stages: [
      blank(5, 4),
      stage(
        "Dört bağı kur ve yükü koru",
        "5 + 4×1 − 1 = 8 elektronun tümü dört N–H bağında kullanılır. N'de yalnız çift kalmaz. Köşeli ayraç ve + işareti bütün atom grubunun toplam yükünü gösterir.",
        [1, 1, 1, 1],
        [0, 0, 0, 0, 0],
      ),
    ],
  },
  {
    id: "n2",
    title: "Azot · N₂",
    formula: "N₂",
    kind: "Nötr element molekülü",
    charge: 0,
    atoms: [atom("N", 5, 155), atom("N", 5, 325)],
    links: [[0, 1]],
    central: 0,
    stages: [
      blank(2, 1),
      stage(
        "Önce bir ortak çift",
        "Tek bağ 2 elektron kullanır ve iki N'ye de yerel olarak 2 elektron kazandırır. Toplam 8 elektron henüz yerleşmedi.",
        [1],
        [0, 0],
      ),
      stage(
        "Üç ortak çift, iki yalnız çift",
        "N≡N üçlü bağı 6 elektron içerir. Her N'de bir yalnız çift vardır: 6 + 2 + 2 = 10. Her N çevresinde 6 ortak + 2 yalnız = 8 elektron sayılır.",
        [3],
        [2, 2],
      ),
    ],
  },
  {
    id: "no",
    title: "Azot monoksit · NO•",
    formula: "NO•",
    kind: "Nötr molekül ve radikal",
    charge: 0,
    radical: true,
    atoms: [atom("N", 5, 155), atom("O", 6, 325)],
    links: [[0, 1]],
    central: 0,
    stages: [
      blank(2, 1),
      stage(
        "Bir ortak çiftle başla",
        "5 + 6 = 11, tek sayılı bir elektron bütçesidir. Bütün elektronların çift olması beklenemez; toplam yük yine sıfırdır.",
        [1],
        [0, 0],
      ),
      stage(
        "Eşleşmemiş elektronu koru",
        "Bu basit Lewis gösteriminde çift bağ 4, N üzerindeki bir yalnız çift ve tek elektron 3, O üzerindeki iki yalnız çift 4 elektron içerir. Toplam 11; N çevresinde 7, O çevresinde 8 elektron vardır. Okteti zorlamak için elektron ekleme.",
        [2],
        [3, 4],
      ),
    ],
  },
  {
    id: "he",
    title: "Helyum · He",
    formula: "He",
    kind: "Nötr tek atomlu tür",
    charge: 0,
    atoms: [atom("He", 2, 240)],
    links: [],
    central: 0,
    actualElectrons: 2,
    stages: [
      blank(1),
      stage(
        "Dolu ilk katman",
        "He'nin toplam iki elektronu ilk katmandadır. Bunlar bir çiftle gösterilir; He sekiz nokta taşımaz. Bu, 18. grupta olmasına engel değildir.",
        [],
        [2],
      ),
    ],
  },
  {
    id: "o",
    title: "Oksijen atomu · O",
    formula: "O",
    kind: "Nötr atom",
    charge: 0,
    atoms: [atom("O", 6, 240)],
    links: [],
    central: 0,
    actualElectrons: 8,
    stages: [
      blank(1),
      stage(
        "Dört tarafa birer nokta",
        "İlk dört değerlik elektronu dört tarafa tek tek konur. Bu bir çizim düzenidir; atomun dört fiziksel yönü olduğu anlamına gelmez.",
        [],
        [4],
      ),
      stage(
        "Beşinci ve altıncı elektronu eşleştir",
        "O atomunun 6 değerlik elektronu iki çift ve iki tek noktayla gösterilir. Nötr O'nun toplam 8 elektronu vardır; Lewis iç katmandaki 2 elektronu çizmez.",
        [],
        [6],
      ),
    ],
  },
  {
    id: "na",
    title: "Sodyum atomu · Na",
    formula: "Na",
    kind: "Nötr atom",
    charge: 0,
    atoms: [atom("Na", 1, 240)],
    links: [],
    central: 0,
    actualElectrons: 11,
    stages: [
      blank(1),
      stage(
        "Tek değerlik elektronu",
        "Na'nın 2,8,1 katman dağılımında dış katmanda bir elektron vardır. Lewis sembolü bir nokta taşır; toplam elektron sayısı 11'dir.",
        [],
        [1],
      ),
    ],
  },
  {
    id: "na-plus",
    title: "Sodyum iyonu · Na⁺",
    formula: "Na⁺",
    kind: "Tek atomlu katyon",
    charge: 1,
    atoms: [atom("Na", 1, 240)],
    links: [],
    central: 0,
    actualElectrons: 10,
    stages: [
      blank(1),
      stage(
        "Nokta yok; elektronlar yok olmadı",
        "Nötr Na'nın dış katmanındaki bir elektron verilmiştir. Okul düzeyindeki katyon Lewis sembolünde nokta çizilmez, + yükü yazılır. İyonun toplam 10 elektronu (2,8) hâlâ vardır; içteki dolu katman bu gösterimde çizilmez.",
        [],
        [0],
      ),
    ],
  },
  {
    id: "cl-minus",
    title: "Klorür iyonu · Cl⁻",
    formula: "Cl⁻",
    kind: "Tek atomlu anyon",
    charge: -1,
    atoms: [atom("Cl", 7, 240)],
    links: [],
    central: 0,
    actualElectrons: 18,
    stages: [
      blank(1),
      stage(
        "Elektron alımını uygula",
        "Nötr Cl'nin 7 değerlik elektronuna alınan 1 elektron eklenir. Cl sembolü çevresinde dört çift, köşeli ayraç dışında − yükü gösterilir. Toplam elektron sayısı ise 18'dir.",
        [],
        [8],
      ),
    ],
  },
];

export function speciesBudget(example: SpeciesExample) {
  // For a main-group monatomic cation this is the school Lewis-symbol dot
  // budget, not the electron count in its actual outer occupied shell.
  return example.atoms.reduce((sum, a) => sum + a.valence, 0) - example.charge;
}
export function speciesBudgetFeedback(example: SpeciesExample, guess: number) {
  const budget = speciesBudget(example);
  const correct = guess === budget;
  if (example.atoms.length === 1 && example.charge > 0) {
    return `${correct ? "Doğru" : "Tekrar say"}: ${example.formula} Lewis sembolünde ${budget} nokta çizilir. İyonun bütün katmanlarında toplam ${example.actualElectrons} elektron vardır; dolu iç katman noktalarla gösterilmez.`;
  }
  return correct
    ? `Doğru: ${example.formula} için toplam ${budget} değerlik elektronu vardır.`
    : `Tekrar say: ${example.formula} için doğru bütçe ${budget} elektrondur.`;
}
export function speciesCounts(example: SpeciesExample, step: number) {
  const index = Math.max(
    0,
    Math.min(
      example.stages.length - 1,
      Number.isFinite(step) ? Math.round(step) : 0,
    ),
  );
  const current = example.stages[index];
  const shared = current.orders.reduce((sum, order) => sum + order * 2, 0);
  const nonshared = current.nonbonding.reduce((sum, count) => sum + count, 0);
  const local = example.atoms.map(
    (_, i) =>
      current.nonbonding[i] +
      example.links.reduce(
        (sum, link, j) => sum + (link.includes(i) ? 2 * current.orders[j] : 0),
        0,
      ),
  );
  return {
    index,
    current,
    shared,
    nonshared,
    allocated: shared + nonshared,
    remaining: speciesBudget(example) - shared - nonshared,
    local,
  };
}

export const chemicalSpeciesGuide: LessonGuide = {
  id: "kimyasal-turler-lewis",
  minutes: 65,
  objectives: [
    "Atom, molekül, iyon ve radikal tanımlarını aynı tür üzerinde gerekçelendir.",
    "Değerlik elektronu ile toplam elektron sayısını ayır; yükü doğru hesaba kat.",
    "Basit molekül ve iyonlarda elektron bütçesini ve yerel duet–oktet denetimini ayrı uygula.",
    "Tek, çift ve üçlü bağları; yalnız çiftleri ve eşleşmemiş elektronu çizimde ayırt et.",
  ],
  sections: [
    {
      title: "Önce hangi taneciğe baktığını söyle",
      paragraphs: [
        "Bir bardak su makroskobik bir örnektir; H₂O ise bu örnekteki su molekülünü gösterir. Maddenin yapısını ve etkileşimini incelerken atom, molekül ve iyon gibi taneciklerden söz ederiz. Bunlara kimyasal tür denir. Element veya bileşik bir maddenin sınıfını, atom veya molekül ise taneciğin yapısını anlatır; iki sınıflandırmayı tek liste gibi düşünme.",
        "He tek atomlu nötr bir türdür. O₂ aynı elementin iki atomundan oluşan moleküldür; element molekülü olması onu tek atom yapmaz. H₂O farklı elementlerin atomlarını içerir ve bileşik molekülüdür. Bir taneciğin içindeki atom sayısını alt indisleri okuyarak bul; yazılmayan indis 1'dir. H₂O'da üç atom ve iki element türü bulunur.",
      ],
    },
    {
      title: "Atom, element molekülü ve bileşik molekülü",
      paragraphs: [
        "Atom bir elementin kimliğini koruyan taneciktir; element kimliğini çekirdekteki proton sayısı belirler. Nötr atomda proton ve elektron sayıları eşittir. Buradaki atom sembolü ile iyon sembolünü ayırırken yük işaretine bak: Na nötr atomu, Na⁺ ise bir elektron vermiş tek atomlu iyonu belirtir. İyon oluşması çekirdeğin proton sayısını değiştirmez.",
        "Bu dersin temel sınıflandırmasında molekül, kovalent bağlarla bağlı en az iki atomdan oluşan nötr ve ayrı bir taneciktir. H₂, O₂, O₃ ve N₂ element molekülleridir; HCl, H₂O ve CO₂ bileşik molekülleridir. Molekülün iki atomlu olması, iki farklı element içermesini gerektirmez: O₂ iki atomlu element molekülü, HCl iki atomlu bileşik molekülüdür. Bir metal külçesini bağımsız metal molekülleri olarak betimleme; metal kristalinin ayrıntısı ayrı konudur.",
      ],
    },
    {
      title: "İyonu yüküyle ve atom sayısıyla sınıflandır",
      paragraphs: [
        "Elektron verilmesi net pozitif yük, elektron alınması net negatif yük oluşturur. Katyon pozitif, anyon negatif iyondur. Na⁺ ve Mg²⁺ tek atomlu katyon; Cl⁻ ve O²⁻ tek atomlu anyondur. Nötr atomdan türeyen tek atomlu bir iyon için toplam elektron sayısı = proton sayısı − cebirsel yük. Örneğin Mg'nin proton sayısı 12 ise Mg²⁺ toplam 10 elektron taşır.",
        "NH₄⁺ ve H₃O⁺ çok atomlu katyon; OH⁻ ve SO₄²⁻ çok atomlu anyondur. NH₄⁺'ta yük, tek bir H'nin değil atom grubunun toplam yüküdür. Kaynaklarda kök adı verilen bu çok atomlu iyonları, eşleşmemiş elektron taşıyan serbest radikallerle karıştırma. O²⁻ tek O atomudur; O₂ iki O atomlu nötr moleküldür; O₂²⁻ iki O atomlu ve toplam 2− yüklü iyondur. Alt indis ve üst yükün görevleri farklıdır.",
      ],
    },
    {
      title: "Radikal: yükten farklı bir soru",
      paragraphs: [
        "Radikal, en az bir eşleşmemiş elektronu bulunan türdür. Nokta işareti bu elektrona dikkat çeker: NO•, nötr azot monoksit molekülünün radikal olduğunu gösterebilir. NO'nun toplam değerlik elektron sayısı 5 + 6 = 11'dir; tek sayıda elektronun tamamı çiftlere ayrılamaz. OH• ile OH⁻ aynı tür değildir: ilkinin 7, ikincinin 8 değerlik elektronu vardır.",
        "Radikal olmak nötr olmakla aynı şey değildir; yüklü radikaller de bulunur. Molekül, iyon ve radikal başlıklarını birbirini her durumda dışlayan kutulara dönüştürme. Bu derste NO• basit bir tek elektron örneğidir. Bütün radikallerin, özellikle O₂'nin elektron yapısını basit nokta çizimi tek başına açıklamaz; ayrıntılı orbital kuramı bu girişin dışındadır. Çok atomlu iyon anlamındaki kök sözcüğünü radikalin tanımı olarak kullanma.",
      ],
    },
    {
      title: "Lewis, atomun bütün elektronlarını çizmez",
      paragraphs: [
        "Lewis sembolünde element sembolünün çevresine değerlik elektronlarını temsil eden noktalar konur. Ana grup nötr atomları için 1, 2, 13, 14, 15, 16, 17 ve 18. gruplar çoğunlukla sırasıyla 1, 2, 3, 4, 5, 6, 7 ve 8 değerlik elektronuna karşılık gelir. He istisnadır: 18. gruptadır ve 2 elektronla dolu ilk katmana sahiptir. Geçiş metalleri için bu basit grup kuralını kullanma.",
        "O atomunun toplam 8 elektronundan dış katmandaki 6'sı Lewis noktasıdır. Na'nın toplam 11 elektronundan yalnız dıştaki 1'i noktayla gösterilir. Bu yüzden nokta sayısını atom numarasıyla eşitlemek yanlıştır. İç elektronlar element sembolüyle birlikte temsil edilen çekirdek bölgesine dâhil kabul edilir; çizilmemeleri yok oldukları anlamına gelmez.",
      ],
    },
    {
      title: "Noktaları yerleştir; yönlere anlam yükleme",
      paragraphs: [
        "Nötr atomun okul düzeyindeki Lewis sembolünü kurarken ilk dört elektron sembolün dört tarafına tek tek, sonraki elektronlar bunları eşleştirecek biçimde konur. O için 6 nokta iki çift ve iki tek noktadır; Cl için 7 nokta üç çift ve bir tek noktadır. He'nin dolu ilk katmanı ise iki elektronluk bir çiftle gösterilir. Sembolün kâğıtta döndürülmesi türün kimliğini değiştirmez.",
        "Bu dört taraf, atomun kare biçiminde olduğunu veya elektronların sabit dört köşede durduğunu anlatmaz. Molekül Lewis yapısındaki yalnız çiftler ve bağ çiftleri de gerçek bağ açılarının ölçekli çizimi değildir. Atölyede H₂O'nun yatay veya NH₄⁺'ın artı biçiminde çizilmesi, gerçek uzaysal geometrilerinin bu şekiller olduğu anlamına gelmez. Lewis önce bağlanma düzenini ve elektron hesabını gösterir.",
      ],
    },
    {
      title: "Yüklü tek atomlu türde iki ayrı elektron hesabı",
      paragraphs: [
        "Cl⁻ için nötr Cl'nin 7 değerlik elektronuna 1 eklenir; 8 nokta, köşeli ayraç ve − yükü yazılır. O²⁻ için 6 + 2 = 8, S²⁻ için 6 + 2 = 8 nokta bulunur. Anyonun yükünü yalnızca fazladan bir nokta çizerek belirtmiş sayılmazsın: nokta düzeni ve yük ikisi de görünmelidir. Yük, elektron bütçesini belirleyen veridir.",
        "Na⁺ ve Mg²⁺ gibi ana grup metal katyonları, nötr atomun dış değerlik elektronlarını verdikten sonra okul Lewis gösteriminde noktasız ve yüklü sembolle yazılır. Na⁺'ta 10, Mg²⁺'ta 10 toplam elektron vardır; dolu iç katman elektronları bu katyon sembolünde çizilmez. Buradaki sıfır nokta, iyonun gerçek en dış dolu katmanında sıfır elektron bulunduğu anlamına gelmez. Katyon için nokta hesabı ile bütün elektronların hesabını ayrı tut.",
      ],
    },
    {
      title: "Duet ve oktet bir denetimdir; sınırsız kural değildir",
      paragraphs: [
        "H bir bağdaki ortak çiftle çevresinde 2 elektron sayar; buna duet denir. İlk katmanı dolu He de iki elektronludur. C, N, O ve F içeren bu dersteki birçok basit kapalı kabuklu tür için atom çevresinde 8 elektron, yani oktet denetlenir. Ortak elektron çifti, iki atomun da yerel çevresinde sayılabilir; ancak bütün türün toplam bütçesine bir kez girer.",
        "Her atom mutlaka oktet yapar demek doğru değildir. Be ve B'nin bazı bileşikleri eksik oktetli olabilir; NO gibi tek elektronlu türlerde basit yapı bütün atomların oktetini aynı anda sağlamaz. Bazı daha ağır merkez atomlarının okul gösterimlerinde genişlemiş oktetler bulunur; bu ders onların yapı seçimini öğretmeyi üstlenmez. Elektron sayısını bütçeyi aşarak artırmak bir oktet onarımı değildir; türün yükünü değiştirmiş olursun.",
      ],
    },
    {
      title: "Molekül ve çok atomlu iyon için bütçeyi sabitle",
      paragraphs: [
        "Toplam değerlik elektronu, her atomun nötr değerlik elektronlarının toplamıdır. Türün toplam yükü −1 ise 1 ekle, +1 ise 1 çıkar; yükün büyüklüğünü ve işaretini birlikte kullan. H₂O için 2×1 + 6 = 8; NH₃ için 5 + 3×1 = 8; NH₄⁺ için 5 + 4×1 − 1 = 8. Atom sayısı farklı olsa da toplam değerlik elektronu aynı olabilir; bundan bağ düzenlerinin aynı olduğu sonucu çıkmaz.",
        "İskeleti kurarken H'yi uçta tut. Basit örneklerde merkez, H dışında genellikle daha az elektronegatif ve tek bulunan atomdur; bu bir başlangıç ipucudur, her yapı için kanıtsız kural değildir. Önce tek bağları çiz ve her bağ için bütçeden 2 elektron ayır. Uç atomların oktetlerini, H'nin duetini tamamla; kalan elektronları merkeze koy. Sonra merkez eksikse bütçeyi değiştirmeden çoklu bağ olasılığını denetle.",
      ],
    },
    {
      title: "Bağ çifti ile yalnız çifti ayır",
      paragraphs: [
        "Tek çizgi bir ortak elektron çiftini, yani 2 elektronu gösterir. Çift bağ 2 çift = 4, üçlü bağ 3 çift = 6 elektron içerir. Ortaklanmamış veya yalnız çift, bir atom üzerinde gösterilen ve bağ çizgisine katılmayan iki elektrondur. H₂O'da iki bağ çifti ve O üzerinde iki yalnız çift; NH₃'te üç bağ çifti ve N üzerinde bir yalnız çift vardır.",
        "N₂'deki üçlü bağı üç elektron sanma: ortak bölgede 6 elektron vardır. İki N üzerindeki birer yalnız çiftle toplam 10 elektron elde edilir. N atomlarının yerel elektron sayılarını topladığında 8 + 8 = 16 çıkması, molekülde 16 değerlik elektronu olduğu anlamına gelmez; ortak 6 elektron iki yerel denetimde de sayılmıştır. Toplam bütçe hesabında her çizgiyi yalnız bir kez say.",
      ],
    },
    {
      title: "Bütçe doğruyken yapı yine eksik olabilir",
      paragraphs: [
        "CO₂ için toplam 4 + 2×6 = 16 elektron vardır. İki tek bağ kurup her O üzerine üç yalnız çift koyduğunda 4 + 12 = 16 elektronu tüketirsin; O atomları oktettedir ama C çevresinde yalnızca 4 elektron bulunur. Sorun bütçe değil dağılımdır. Her O'nun bir yalnız çiftini bağ bölgesine taşıyarak O=C=O oluştur; yeni elektron ekleme.",
        "Son yapıda iki çift bağ 8 elektron, iki O üzerindeki toplam dört yalnız çift 8 elektron içerir. Böylece bütçe yine 16'dır ve C ile O atomları oktettedir. Yüklü türlerde yapının tamamını köşeli ayraca alıp toplam yükü dışarı yaz: NH₄⁺'ta N'nin yalnız çifti yoktur, dört tek bağ bütçenin tümünü kullanır. Bir atomun formal yükü ile grubun toplam yükü ayrı kavramlardır; ayrıntılı formal yük ve rezonans seçimi bu girişin kapsamını aşar.",
      ],
    },
    {
      title: "İyonik formül molekül resmi değildir",
      paragraphs: [
        "Katı NaCl'de bağımsız NaCl molekülleri yerine iyonların uzanan örgüsü bulunur. NaCl formülü, Na⁺ ve Cl⁻ iyonlarının 1:1 oranını ifade eden formül birimidir. MgCl₂ ise 1 Mg²⁺ için 2 Cl⁻ oranını anlatır; toplam yük +2 + 2×(−1) = 0 olur. İyonlar arasında bir molekül çizgisi çizerek bunu kovalent bir Na–Cl molekülü gibi sunma.",
        "Kristalin birim hücresi, örgünün uzayda tekrarlanan geometrik parçasıdır; formül birimi ise en sade bileşim oranıdır. Bunlar aynı terim değildir ve bir birim hücre birden çok formül birimi içerebilir. Bu derste iyonik yapıya yalnız tanecik türünü ayırt etmek için bakılır; örgü, iyonik bağ kuvveti ve sistematik adlandırma sonraki başlıklarda geliştirilir. Son kontrolün: tür ve yük doğru mu, bütçe doğru mu, yerel denetimler uygun mu, çizimin sınırları belli mi?",
      ],
    },
  ],
  examples: [
    {
      title: "1 · Nokta sayısı ile toplam elektronu ayır",
      prompt:
        "Mg'nin proton sayısı 12, nötr değerlik elektron sayısı 2; Cl'nin proton sayısı 17, nötr değerlik elektron sayısı 7. Mg²⁺ ve Cl⁻ için toplam elektronları ve okul Lewis noktalarını bul.",
      strategy:
        "Önce bütün elektronlar için yükü uygula; sonra dış değerlik elektronlarının Lewis gösterimini kur.",
      steps: [
        {
          label: "Mg²⁺ toplamı",
          explanation:
            "Pozitif yük iki elektron verildiğini gösterir; proton sayısı değişmez.",
          expression: "12 − 2 = 10 toplam elektron",
        },
        {
          label: "Mg²⁺ sembolü",
          explanation:
            "Nötr atomun iki dış elektronu verilmiştir. Katyonun iç dolu katmanı noktalara açılmaz.",
          expression: "2 − 2 = 0 Lewis noktası; yük 2+",
        },
        {
          label: "Cl⁻ hesabı",
          explanation:
            "Negatif yük bir elektron alındığını gösterir. Hem toplam elektron hem dış katman sayısı bir artar.",
          expression: "17 + 1 = 18 toplam; 7 + 1 = 8 Lewis noktası",
        },
        {
          label: "Gösterimi tamamla",
          explanation:
            "Cl'yi dört çift noktayla köşeli ayraca al; − yükünü dışarı yaz. Mg'yi noktasız 2+ yüklü katyon olarak göster.",
        },
      ],
      answer:
        "Mg²⁺: 10 toplam elektron, 0 Lewis noktası. Cl⁻: 18 toplam elektron, 8 Lewis noktası.",
      check:
        "İki türün toplam elektronları farklıdır; ikisi için de nokta sayısı toplam elektron sayısıyla aynı değildir.",
      pitfall: "Noktasız Mg²⁺'ı elektronsuz bir çekirdek sanmak.",
    },
    {
      title: "2 · Suyu elektronları kaybetmeden kur",
      prompt:
        "H'nin 1, O'nun 6 değerlik elektronu var. H₂O'nun basit Lewis yapısında kaç bağ çifti ve kaç yalnız çift bulunur?",
      strategy: "İskelet, bütçe ve yerel denetimi sırayla yap.",
      steps: [
        {
          label: "Toplamı bul",
          explanation: "Nötr tür olduğu için yük düzeltmesi yapılmaz.",
          expression: "2×1 + 6 = 8 elektron",
        },
        {
          label: "H'leri uçlara yerleştir",
          explanation:
            "H–O–H iskeletindeki iki tek bağ toplam dört elektron kullanır.",
          expression: "2 bağ × 2 = 4 elektron",
        },
        {
          label: "Kalanı O'ya koy",
          explanation:
            "Geriye kalan dört elektron O üzerinde iki yalnız çift oluşturur.",
          expression: "8 − 4 = 4 = 2 yalnız çift",
        },
        {
          label: "Yerel çevreyi kontrol et",
          explanation:
            "Her H ortak çiftten iki elektron; O iki bağdan dört ve iki yalnız çiftten dört elektron sayar.",
          expression: "H: 2; O: 4 + 4 = 8",
        },
      ],
      answer:
        "2 bağ çifti ve O üzerinde 2 yalnız çift; toplam 8 değerlik elektronu.",
      check:
        "H'nin iki atomla iki bağ yaptığı bir iskelet kurmadın; bütçeyi aşmadın.",
      pitfall:
        "Dört noktayı dört yalnız çift sanmak; bir çift iki elektrondur.",
    },
    {
      title: "3 · Amonyak ile amonyum aynı çizim değildir",
      prompt:
        "N'nin 5, H'nin 1 değerlik elektronu var. NH₃ ile NH₄⁺'ın toplam elektronlarını ve N üzerindeki yalnız çift sayılarını karşılaştır.",
      strategy:
        "Önce iki bağımsız bütçe yap; sonra bağların kullandığını çıkar.",
      steps: [
        {
          label: "NH₃ bütçesi",
          explanation: "Nötr amonyakta üç H bulunur.",
          expression: "5 + 3×1 = 8",
        },
        {
          label: "NH₃ dağılımı",
          explanation:
            "Üç bağ altı elektron kullanır; iki elektron N üzerinde yalnız çift kalır.",
          expression: "8 − 3×2 = 2",
        },
        {
          label: "NH₄⁺ bütçesi",
          explanation:
            "Dördüncü H eklense de toplam +1 yük için bir elektron çıkarılır.",
          expression: "5 + 4×1 − 1 = 8",
        },
        {
          label: "NH₄⁺ dağılımı",
          explanation:
            "Dört bağ sekiz elektronu tüketir. Yapının tamamı köşeli ayraç ve + ile gösterilir.",
          expression: "8 − 4×2 = 0 yalnız elektron",
        },
      ],
      answer:
        "İkisinde de 8 değerlik elektronu var. NH₃'te N'de 1 yalnız çift, NH₄⁺'ta 0 yalnız çift bulunur.",
      check:
        "Her iki yapıda N'nin yerel çevresi 8'dir; NH₄⁺'ın toplam yükü çizimde görünür.",
      pitfall:
        "Pozitif yükte elektron eklemek veya NH₄⁺'ta NH₃'ün yalnız çiftini korumak.",
    },
    {
      title: "4 · CO₂: doğru toplam, yanlış dağılım",
      prompt:
        "C:4, O:6 değerlik elektronu. O–C–O tek bağ iskeletine her O'da üç yalnız çift koyulmuş. Bu çizimi bütçeyi değiştirmeden düzelt.",
      strategy:
        "Toplam elektron ve her atomun yerel çevresi için iki ayrı kontrol yap.",
      steps: [
        {
          label: "Bütçeyi doğrula",
          explanation:
            "İki tek bağ dört, iki O'daki altı yalnız çift on iki elektron içerir.",
          expression: "4 + 12 = 16 = 4 + 2×6",
        },
        {
          label: "Eksik merkezi bul",
          explanation:
            "Her O sekiz elektron sayar. C yalnız iki bağdaki toplam dört elektronu sayar.",
          expression: "C: 2×2 = 4",
        },
        {
          label: "İki çifti taşı",
          explanation:
            "Her O'daki bir yalnız çifti C ile ortaklaştır. İki tek bağ iki çift bağa dönüşür; elektron eklenmez.",
          expression: "O=C=O",
        },
        {
          label: "İki kontrolü yeniden yap",
          explanation:
            "İki çift bağ sekiz, O'lardaki dört yalnız çift sekiz elektron içerir. Her atom oktettedir.",
          expression: "8 + 8 = 16; C:8, O:8",
        },
      ],
      answer:
        "O=C=O; her O üzerinde iki yalnız çift vardır. Toplam 16 elektron korunur.",
      check:
        "Ortak çift, yerel oktetlerde iki atom için sayılsa da toplam bütçeye bir kez yazıldı.",
      pitfall:
        "C'nin oktetini tamamlamak için bütçeye dışarıdan dört elektron eklemek.",
    },
    {
      title: "5 · N₂: üçlü bağın altı elektronu",
      prompt:
        "N'nin 5 değerlik elektronu var. N₂'de her N oktet yapacaksa bağ ve yalnız çiftleri bul.",
      strategy:
        "Bütçenin hangi kısmının ortak, hangi kısmının yalnız olduğunu ayır.",
      steps: [
        {
          label: "Toplamı bul",
          explanation: "İki nötr N atomu toplam on değerlik elektronu sağlar.",
          expression: "2×5 = 10",
        },
        {
          label: "Üç ortak çift kur",
          explanation: "Üçlü bağdaki üç çizgi altı elektronu temsil eder.",
          expression: "N≡N: 3×2 = 6 ortak elektron",
        },
        {
          label: "Kalanı dağıt",
          explanation: "Dört elektron, her N üzerinde birer yalnız çift olur.",
          expression: "10 − 6 = 4 = 2 yalnız çift",
        },
        {
          label: "Yerel denetim",
          explanation:
            "Her N altı ortak ve iki yalnız elektronu kendi çevresinde sayar.",
          expression: "6 + 2 = 8",
        },
      ],
      answer:
        "Bir üçlü bağ, her N üzerinde bir yalnız çift; bütün molekülde 10 değerlik elektronu.",
      check:
        "Yerel 8 + 8 toplamını gerçek bütçe sanmadın; altı ortak elektronu iki kez toplamadın.",
      pitfall: "Üçlü bağı üç elektron veya üç ayrı N–N taneciği sanmak.",
    },
    {
      title: "6 · Radikalde okteti zorlamama",
      prompt:
        "N:5, O:6 değerlik elektronu. Nötr NO• için N=O çiziminde N'de bir çift ve bir tek elektron, O'da iki çift gösteriliyor. Bütçe, yük ve yerel çevreleri kontrol et.",
      strategy:
        "Tek elektron sayısını bir hata varsaymadan önce türün radikal olup olmadığını düşün.",
      steps: [
        {
          label: "Bütçe",
          explanation:
            "Yük olmadığı için elektron ekleme veya çıkarma yapılmaz.",
          expression: "5 + 6 = 11",
        },
        {
          label: "Çizim hesabı",
          explanation:
            "Çift bağ dört, N'nin bağ dışı elektronları üç, O'nunkiler dört elektrondur.",
          expression: "4 + 3 + 4 = 11",
        },
        {
          label: "Yerel çevre",
          explanation:
            "N dört ortak ve üç bağ dışı; O dört ortak ve dört bağ dışı elektron sayar.",
          expression: "N:7; O:8",
        },
        {
          label: "Yorum",
          explanation:
            "Bir elektron eşleşmemiştir. Tür nötr molekül ve radikaldir; N'ye ek elektron çizmek NO'nun bütçesini değiştirir.",
        },
      ],
      answer:
        "Toplam 11 elektron ve net 0 yük korunur; N'nin 7 elektronu bu radikal örneğinde oktet istisnasıdır.",
      check:
        "Radikal noktasını eksi yükle karıştırmadın. Bu çizim ayrıntılı orbital açıklaması değildir.",
      pitfall:
        "Her atomu zorla sekize tamamlamak veya radikalin mutlaka iyon olduğunu söylemek.",
    },
  ],
  recall: [
    {
      prompt: "O²⁻, O₂ ve O₂²⁻'yi atom sayısı ve toplam yük bakımından ayır.",
      answer:
        "O²⁻ tek atomlu 2− anyon; O₂ iki atomlu nötr element molekülü; O₂²⁻ iki atomlu toplam 2− yüklü iyondur.",
    },
    {
      prompt:
        "Na⁺'ın Lewis sembolünde sıfır nokta olması neden toplam sıfır elektron demek değildir?",
      answer:
        "Nötr Na'nın dıştaki bir elektronu verilmiştir; içte kalan toplam 10 elektron katyon Lewis sembolünde çizilmez. Gerçek dolu dış katmanı sekiz elektronludur.",
    },
    {
      prompt:
        "CO₂'nin 16 elektronu yerleştiği hâlde C'nin çevresi 4 kaldı. İlk düzeltmen ne?",
      answer:
        "Elektron eklemek yerine her O'daki bir yalnız çifti bağa dönüştürüp iki çift bağ kurarım. Toplam 16 korunur; C oktete ulaşır.",
    },
    {
      prompt:
        "NH₃ ile NH₄⁺ neden aynı elektron bütçesine rağmen farklı yalnız çift taşır?",
      answer:
        "NH₃:5+3=8; NH₄⁺:5+4−1=8. Üç bağ 6 elektrondan sonra bir yalnız çift bırakır; dört bağ 8 elektronu tüketir.",
    },
    {
      prompt: "Tek bağ, üçlü bağ ve yalnız çift kaç elektron gösterir?",
      answer:
        "Tek bağ 2, üçlü bağ 6, yalnız çift 2 elektron gösterir. Yalnız çift bağ çizgisine katılmaz.",
    },
    {
      prompt: "NaCl neden bir molekül olarak sayılmaz?",
      answer:
        "İyonik katıda bağımsız NaCl molekülleri yerine uzanan iyon örgüsü vardır. Formül birimi 1:1 oranı, birim hücre ise örgünün tekrarlanan geometrik parçasını anlatır.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri, basılı s.35–36; OGM 9. Sınıf Kimyasal Türler ve Etkileşimlerin Sınıflandırılması video ders notunun atom–molekül–iyon bölümleri; Aurelia 014 Kimyasal Türler ve Lewis Yapısı, s.2–5. Kaynaklarla karşılaştırılarak yazılmış özgün açıklama, atölye ve örneklerdir. Radikal/NO ayrımı bilimsel açıklayıcı ektir; resmî soru aktarımı değildir.",
};

const originalQuestions: [string, string[], number, string, string, string][] =
  [
    [
      "O²⁻, O₂ ve O₂²⁻ türleri için sırasıyla doğru sınıflandırma hangisidir? Üstteki işaret toplam yükü, alttaki indis atom sayısını gösterir.",
      [
        "Tek atomlu anyon; element molekülü; çok atomlu anyon",
        "Element molekülü; tek atomlu anyon; bileşik molekülü",
        "Tek atomlu katyon; element molekülü; çok atomlu katyon",
        "Üçü de nötr element molekülüdür",
        "Tek atomlu anyon; bileşik molekülü; tek atomlu anyon",
      ],
      0,
      "Alt indis ile üst yükün ayrı sorulara cevap verdiğini düşün.",
      "O²⁻ bir O atomu ve 2− yük taşır. O₂ iki O atomlu nötr element molekülüdür. O₂²⁻ iki O atomlu ve toplam 2− yüklü çok atomlu anyondur; aynı elementten iki atom içermesi bileşik yapmaz.",
      "Tür ve yük",
    ],
    [
      "Nötr Mg atomunun proton sayısı 12, değerlik elektron sayısı 2'dir. Mg²⁺ iyonunun toplam elektron sayısı ve okul düzeyindeki Lewis sembolünde çizilen nokta sayısı sırasıyla kaçtır?",
      ["12 ve 2", "14 ve 4", "10 ve 8", "10 ve 0", "0 ve 0"],
      3,
      "Önce bütün elektronları, sonra katyonun Lewis sembolünü ayrı hesapla.",
      "Mg iki elektron verir: toplam elektron 12−2=10 olur. Nötr atomun iki dış değerlik elektronu verildiği için katyon Lewis sembolünde nokta çizilmez; yük 2+ yazılır. İç dolu katmandaki elektronlar bu gösterimde noktalara açılmaz; noktasızlık elektronsuzluk değildir.",
      "Katyon Lewis sembolü",
    ],
    [
      "Nötr Cl atomunda 7 değerlik elektronu vardır. Cl⁻ iyonu için doğru Lewis gösterimi hangisini içermelidir?",
      [
        "6 nokta, + yükü",
        "7 nokta, yük işareti yok",
        "8 nokta, köşeli ayraç dışında − yükü",
        "8 nokta, + yükü",
        "0 nokta, − yükü",
      ],
      2,
      "Negatif yükte elektron sayısı hangi yönde değişir?",
      "Cl bir elektron aldığında 7+1=8 değerlik elektronu taşır. Dört çift nokta köşeli ayraç içinde, toplam − yükü dışarıda gösterilir. Sekiz nokta tek başına iyon yükünü belirtmenin yerine geçmez.",
      "Anyon Lewis sembolü",
    ],
    [
      "H'nin 1, O'nun 6 değerlik elektronu vardır. Nötr H₂O'nun basit Lewis yapısındaki bağ çifti sayısı ile O üzerindeki yalnız çift sayısı sırasıyla kaçtır?",
      ["1 ve 3", "2 ve 1", "4 ve 0", "2 ve 4", "2 ve 2"],
      4,
      "Toplam 8 elektrondan iki O–H bağının kullandığı 4 elektronu çıkar.",
      "H₂O toplam 2×1+6=8 değerlik elektronu taşır. İki tek bağ iki ortak çift, yani 4 elektron kullanır. Kalan 4 elektron O üzerinde iki yalnız çift olur. Her H duet, O oktet yapar. Dört yalnız elektron, dört yalnız çift değildir.",
      "Bağ ve yalnız çift",
    ],
    [
      "C'nin 4, O'nun 6 değerlik elektronu var. Nötr CO₂ için O–C–O tek bağları çizilmiş ve her O'ya üç yalnız çift konmuştur. Toplam 16 elektron yerleşmişken C çevresinde 4 elektron sayılıyor. Bütçeyi koruyan uygun düzeltme hangisidir?",
      [
        "C üzerine dört yeni elektron eklemek",
        "Her O'dan bir yalnız çifti bağa dönüştürerek O=C=O kurmak",
        "Her O'dan iki elektronu bütçeden silmek",
        "Yapıya toplam 4− yükü yazıp nötr olduğunu söylemek",
        "İki tek bağı silip O atomlarını ayırmak",
      ],
      1,
      "Eksik olan toplam elektron mu, elektronların ortaklaşma düzeni mi?",
      "Her O'dan bir yalnız çift ortak bağ çiftine taşınır. İki çift bağda 8, O'lardaki dört yalnız çiftte 8 olmak üzere toplam yine 16 elektrondur. C ve O atomları oktete ulaşır. Dışarıdan elektron eklemek nötr CO₂'nin bütçesini değiştirir.",
      "Çoklu bağ ve bütçe",
    ],
    [
      "N'nin 5, H'nin 1 değerlik elektronu vardır. NH₄⁺ için toplam değerlik elektronu sayısı ve N üzerindeki yalnız çift sayısı hangisidir? Basit yapıda N dört H'ye tek bağla bağlıdır.",
      ["10 ve 1", "9 ve 1", "8 ve 1", "8 ve 0", "6 ve 0"],
      3,
      "Toplam +1 yük için elektron ekleme; çıkar.",
      "Toplam 5+4×1−1=8 elektrondur. Dört tek bağ 4×2=8 elektronu kullanır, N üzerinde yalnız çift kalmaz. Yapının tamamı köşeli ayraç içinde ve + yüklü gösterilir. NH₃'ün yalnız çiftini NH₄⁺'a taşımak bütçeyi aşar.",
      "Çok atomlu iyon",
    ],
    [
      "N'nin 5 değerlik elektronu vardır. N₂ molekülünün oktetleri sağlayan basit Lewis yapısında bağ elektronlarının toplamı ve yalnız elektronların toplamı sırasıyla kaçtır?",
      ["6 ve 4", "3 ve 2", "4 ve 6", "8 ve 8", "2 ve 8"],
      0,
      "Bir bağ çizgisi iki elektrondur; toplam bütçe 10'dur.",
      "N≡N üçlü bağındaki üç ortak çift 6 elektron içerir. Her N üzerinde bir yalnız çift bulunduğundan yalnız elektronların toplamı 4'tür. 6 + 4 = 10 gerçek bütçedir; her atomun yerel çevresindeki 8'i toplamak ortak elektronları iki kez sayar.",
      "Üçlü bağ",
    ],
    [
      "N'nin 5, O'nun 6 değerlik elektronu var. Nötr NO• için N=O, N üzerinde bir yalnız çift ve bir tek elektron, O üzerinde iki yalnız çift çiziliyor. Hangi yorum doğrudur?",
      [
        "Noktadaki tek elektron, türün toplam −1 yüklü olduğunu kanıtlar",
        "N çevresindeki 7 elektron mutlaka bir çizim hatasıdır",
        "Türün toplam 11 değerlik elektronu vardır ve eşleşmemiş elektron radikal niteliği gösterir",
        "Çift bağ iki elektron içerir; bütçe 9'dur",
        "NO aynı elementin iki atomunu içerdiği için element molekülüdür",
      ],
      2,
      "Elektronların çiftlenmesi ile toplam yükü ayrı incele.",
      "NO nötrdür ve 5 + 6 = 11 değerlik elektronu taşır. Çift bağ 4, N üzerindeki bağ dışı elektronlar 3, O üzerindekiler 4: toplam 11. N çevresinde 7 olması bu basit radikal örneğinde oktet istisnasıdır. Radikal noktası eksi yük anlamına gelmez; NO farklı elementlerden oluşur.",
      "Radikal ve oktet sınırı",
    ],
    [
      "Katı NaCl, uzanan bir Na⁺ ve Cl⁻ iyon örgüsüdür. NaCl formülü için bilimsel olarak uygun yorum hangisidir?",
      [
        "Her NaCl biriminde iki nötr atomdan oluşan bağımsız kovalent molekül vardır",
        "İyonların 1:1 oranını ifade eden formül birimidir; kristalin geometrik birim hücresiyle aynı terim değildir",
        "Bir NaCl birim hücresi tanım gereği yalnız bir iyon içerir",
        "Formüldeki Cl mutlaka nötr klor atomudur",
        "NaCl yalnız iki atom içerdiği için element molekülüdür",
      ],
      1,
      "Bileşim oranı ile uzayda tekrarlanan geometrik parçayı ayır.",
      "NaCl formül birimi, iyonların en sade 1:1 bileşim oranını verir. Kristal birim hücresi örgünün tekrarlanan geometrik parçasıdır ve birden çok formül birimi içerebilir. İyonik katıyı bağımsız NaCl moleküllerinden oluşmuş saymak yanlıştır.",
      "Formül birimi",
    ],
    [
      "He atomunda toplam 2, nötr O atomunda toplam 8 elektron vardır. He'nin 2 ve O'nun 6 değerlik elektronu olduğu veriliyor. Lewis gösterimleri için hangi ifade doğrudur?",
      [
        "İkisi de toplam elektron sayısı kadar nokta taşır",
        "He'ye 18. grupta olduğu için 8 nokta konur",
        "O'nun bütün 6 noktası birbirinden ayrı ve çiftlenmeden çizilir",
        "Lewis noktalarının dört tarafa konması atomun kare biçiminde olduğunu gösterir",
        "He bir çiftle; O iki çift ve iki tek noktayla gösterilebilir, kâğıtta döndürmek türü değiştirmez",
      ],
      4,
      "He'nin ilk katmanını ve O için önce dört tarafa tek tek nokta kuralını uygula.",
      "He'nin ilk katmanı iki elektronla doludur ve bir çiftle gösterilir. O'nun 6 değerlik elektronu önce dört tek nokta, sonra iki eşleşme ile iki çift ve iki tek nokta oluşturur. İçteki 2 elektron Lewis noktalarında gösterilmez; çizim yönü fiziksel geometri değildir.",
      "Değerlik ve Lewis düzeni",
    ],
  ];

export const chemicalSpeciesLesson: Lesson = {
  id: chemicalSpeciesGuide.id,
  subjectId: "tyt-kimya",
  title: txt("Kimyasal türler ve Lewis yapısı"),
  minutes: chemicalSpeciesGuide.minutes,
  objectives: chemicalSpeciesGuide.objectives.map(txt),
  body: chemicalSpeciesGuide.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: originalQuestions.map(
    ([prompt, options, answer, hint, explanation, skill], i) => ({
      id: `chemical-species-${i + 1}`,
      prompt: txt(prompt),
      options: options.map(txt),
      answer,
      hint: txt(hint),
      explanation: txt(explanation),
      skill,
    }),
  ),
  source: txt(chemicalSpeciesGuide.source),
  tags: ["detail-152", "Lewis", "Kimyasal türler", "Özgün öğretim soruları"],
};
