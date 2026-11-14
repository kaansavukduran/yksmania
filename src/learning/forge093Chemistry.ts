import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

export type DipoleVector = [number, number, number];
export interface CovalentPair {
  id: string;
  formula: string;
  atoms: [string, string];
  valence: [number, number];
  electronegativity: [number, number];
  order: number;
}
export const covalentPairs: CovalentPair[] = [
  {
    id: "h2",
    formula: "H₂",
    atoms: ["H", "H"],
    valence: [1, 1],
    electronegativity: [2.2, 2.2],
    order: 1,
  },
  {
    id: "hcl",
    formula: "HCl",
    atoms: ["H", "Cl"],
    valence: [1, 7],
    electronegativity: [2.2, 3.16],
    order: 1,
  },
  {
    id: "hf",
    formula: "HF",
    atoms: ["H", "F"],
    valence: [1, 7],
    electronegativity: [2.2, 3.98],
    order: 1,
  },
  {
    id: "o2",
    formula: "O₂",
    atoms: ["O", "O"],
    valence: [6, 6],
    electronegativity: [3.44, 3.44],
    order: 2,
  },
  {
    id: "n2",
    formula: "N₂",
    atoms: ["N", "N"],
    valence: [5, 5],
    electronegativity: [3.04, 3.04],
    order: 3,
  },
];
export function covalentPairResult(pair: CovalentPair) {
  const total = pair.valence[0] + pair.valence[1];
  const shared = 2 * pair.order;
  const difference = pair.electronegativity[1] - pair.electronegativity[0];
  return {
    total,
    shared,
    nonbonding: total - shared,
    difference,
    polar: Math.abs(difference) > 1e-9,
  };
}

export interface PolarityMolecule {
  id: string;
  formula: string;
  center: string;
  shape: string;
  lonePairs: number;
  directions: DipoleVector[];
  ligands: string[];
  orders: number[];
  // Signed teaching weights: positive points from center to ligand; negative back to center.
  // They are neither measured dipoles nor a conversion of electronegativity to debye.
  weights: number[];
  explanation: string;
}
const tetra: DipoleVector[] = [
  [0, 1, 0],
  [Math.sqrt(8 / 9), -1 / 3, 0],
  [-Math.sqrt(2 / 9), -1 / 3, Math.sqrt(2 / 3)],
  [-Math.sqrt(2 / 9), -1 / 3, -Math.sqrt(2 / 3)],
];
const waterHalfAngle = ((104.5 / 2) * Math.PI) / 180;
const ammoniaHeight = Math.sqrt((1 + 2 * Math.cos((107 * Math.PI) / 180)) / 3);
const ammoniaRadius = Math.sqrt(1 - ammoniaHeight ** 2);
const ammoniaDirections: DipoleVector[] = [0, 120, 240].map<DipoleVector>(
  (angle) => [
    ammoniaRadius * Math.cos((angle * Math.PI) / 180),
    -ammoniaHeight,
    ammoniaRadius * Math.sin((angle * Math.PI) / 180),
  ],
);
export const polarityMolecules: PolarityMolecule[] = [
  {
    id: "co2",
    formula: "CO₂",
    center: "C",
    shape: "Doğrusal",
    lonePairs: 0,
    directions: [
      [-1, 0, 0],
      [1, 0, 0],
    ],
    ligands: ["O", "O"],
    orders: [2, 2],
    weights: [1, 1],
    explanation:
      "İki eş C=O dipolü aynı doğru üzerinde zıttır. Bağlar polar olsa da bileşke sıfırdır.",
  },
  {
    id: "h2o",
    formula: "H₂O",
    center: "O",
    shape: "Açısal",
    lonePairs: 2,
    directions: [
      [-Math.sin(waterHalfAngle), -Math.cos(waterHalfAngle), 0],
      [Math.sin(waterHalfAngle), -Math.cos(waterHalfAngle), 0],
    ],
    ligands: ["H", "H"],
    orders: [1, 1],
    weights: [-1, -1],
    explanation:
      "İki O–H dipolü O’ya yönelir. Açısal düzende yan bileşenler gider, O tarafındaki ortak bileşen kalır.",
  },
  {
    id: "bf3",
    formula: "BF₃",
    center: "B",
    shape: "Düzlemsel üçgen",
    lonePairs: 0,
    directions: [
      [0, 1, 0],
      [-Math.sqrt(3) / 2, -0.5, 0],
      [Math.sqrt(3) / 2, -0.5, 0],
    ],
    ligands: ["F", "F", "F"],
    orders: [1, 1, 1],
    weights: [1, 1, 1],
    explanation:
      "Üç eş B–F dipolü aynı düzlemde 120° aralıkla dağılır; üç boyutlu toplam da sıfırdır.",
  },
  {
    id: "nh3",
    formula: "NH₃",
    center: "N",
    shape: "Üçgen piramit",
    lonePairs: 1,
    directions: ammoniaDirections,
    ligands: ["H", "H", "H"],
    orders: [1, 1, 1],
    weights: [-1, -1, -1],
    explanation:
      "Üç N–H bağı aynı düzlemde 120° aralıklı değildir. Piramitte N’ye yönelen ortak bileşenler dengelenmez.",
  },
  {
    id: "ch4",
    formula: "CH₄",
    center: "C",
    shape: "Dört yüzlü",
    lonePairs: 0,
    directions: tetra,
    ligands: ["H", "H", "H", "H"],
    orders: [1, 1, 1, 1],
    weights: [-0.2, -0.2, -0.2, -0.2],
    explanation:
      "C–H kutuplanması küçük olsa da dört eş bağın dört yüzlü düzenindeki toplamı sıfırdır. Çizimdeki dört yön bir düzlemde değildir.",
  },
  {
    id: "ccl4",
    formula: "CCl₄",
    center: "C",
    shape: "Dört yüzlü",
    lonePairs: 0,
    directions: tetra,
    ligands: ["Cl", "Cl", "Cl", "Cl"],
    orders: [1, 1, 1, 1],
    weights: [1, 1, 1, 1],
    explanation:
      "Dört eş C–Cl dipolü dört yüzlünün bütün köşelerine dengeli dağılır. Her bağ polar; molekül apolardır.",
  },
  {
    id: "ch3cl",
    formula: "CH₃Cl",
    center: "C",
    shape: "Dört yüzlü",
    lonePairs: 0,
    directions: tetra,
    ligands: ["Cl", "H", "H", "H"],
    orders: [1, 1, 1, 1],
    weights: [1, -0.2, -0.2, -0.2],
    explanation:
      "Tek Cl köşesi H köşeleriyle eşdeğer değildir. C çevresinde yalnız çift olmamasına rağmen Cl tarafında net kutuplanma kalır.",
  },
  {
    id: "ch2cl2",
    formula: "CH₂Cl₂",
    center: "C",
    shape: "Dört yüzlü",
    lonePairs: 0,
    directions: tetra,
    ligands: ["Cl", "Cl", "H", "H"],
    orders: [1, 1, 1, 1],
    weights: [1, 1, -0.2, -0.2],
    explanation:
      "Dört yüzlüde iki C–Cl yönü 180° karşı karşıya değildir. İki Cl’nin bulunması dipollerin giderileceğini göstermez.",
  },
  {
    id: "hcn",
    formula: "HCN",
    center: "C",
    shape: "Doğrusal",
    lonePairs: 0,
    directions: [
      [-1, 0, 0],
      [1, 0, 0],
    ],
    ligands: ["H", "N"],
    orders: [1, 3],
    weights: [-0.2, 1],
    explanation:
      "H–C dipolü C’ye, C≡N dipolü N’ye yönelir. İki etki bu doğrusal modelde aynı yöndedir; doğrusal olmak tek başına apolarlık değildir.",
  },
];
export function sumBondVectors(directions: DipoleVector[], weights: number[]) {
  if (
    directions.length !== weights.length ||
    !weights.every(Number.isFinite) ||
    !directions.every((v) => v.length === 3 && v.every(Number.isFinite))
  )
    throw new Error("DIPOLE_VECTOR_DATA");
  const vector = directions.reduce<DipoleVector>(
    (sum, direction, i) => [
      sum[0] + direction[0] * weights[i],
      sum[1] + direction[1] * weights[i],
      sum[2] + direction[2] * weights[i],
    ],
    [0, 0, 0],
  );
  const magnitude = Math.hypot(...vector);
  return { vector, magnitude, polar: magnitude > 1e-9 };
}
export function rotateChemistryVector(
  [x, y, z]: DipoleVector,
  degrees: number,
): DipoleVector {
  if (![x, y, z, degrees].every(Number.isFinite))
    throw new Error("DIPOLE_ROTATION_DATA");
  const yaw = (degrees * Math.PI) / 180,
    pitch = (18 * Math.PI) / 180;
  const rotatedX = x * Math.cos(yaw) + z * Math.sin(yaw);
  const rotatedZ = -x * Math.sin(yaw) + z * Math.cos(yaw);
  return [
    rotatedX,
    y * Math.cos(pitch) - rotatedZ * Math.sin(pitch),
    y * Math.sin(pitch) + rotatedZ * Math.cos(pitch),
  ];
}

const covalentGuide: LessonGuide = {
  id: "kovalent-bag-polar-apolar",
  minutes: 55,
  objectives: [
    "Elektron ortaklaşmasını iyon oluşumundan ayır; tek, çift ve üçlü bağdaki ortak elektronları hesapla.",
    "Elektronegatiflikten kısmi yüklerin yönünü bul; kısmi yükü tam iyon yükü sanma.",
    "Bağın kutupluluğu ile molekülün tamamının kutupluluğu için iki ayrı karar ver.",
  ],
  sections: [
    {
      title: "Paylaşım bağın iki ucunu birlikte tutar",
      paragraphs: [
        "H₂ oluşurken iki H atomunun elektronları iki çekirdeğin ortak çekim alanında bulunur. Bir ortak elektron çifti kovalent bağın temel gösterimidir. Ortaklaşma, bir elektronun sırayla bir atoma teslim edilmesi veya çekirdeklerin birleşmesi değildir. Atomlar kimliklerini korur; proton sayıları bu bağın kurulmasıyla değişmez.",
        "Bu girişte H₂, Cl₂ ve HCl gibi ayrı molekülleri inceliyoruz. Aynı ametal atomları da farklı ametal atomları da kovalent bağ kurabilir. Bir maddede kovalent bağ bulunması her durumda bağımsız küçük moleküllerden oluştuğunu göstermez; elmas gibi uzanan kovalent ağlar da vardır. Molekül modelini iyonik kristale veya her katı maddeye otomatik taşıma.",
      ],
    },
    {
      title: "Bir çizgi, bir çift; üç çizgi, altı elektron",
      paragraphs: [
        "H–H tek bağında bir ortak çift, yani iki elektron bulunur. O=O çift bağı iki ortak çift ve dört elektron; N≡N üçlü bağı üç ortak çift ve altı elektron gösterir. Çift bağ iki ayrı oksijen komşusu değildir: aynı iki atom arasındaki bağın mertebesidir. Bir atom çiftine giden tek, çift veya üçlü bağ geometri hesabında bir yön oluşturur.",
        "Bağ çizgisinin dışındaki yalnız çift iki elektrondur ve ortak bağ çiftine katılmaz. O₂’nin 12 değerlik elektronundan 4’ü ortak, 8’i bağ dışındadır; her O’da iki yalnız çift bulunur. N₂’nin 10 değerlik elektronundan 6’sı ortak, 4’ü bağ dışındadır; her N’de bir yalnız çift bulunur. Toplam bütçeyi, ortak çift sayısını ve atom çevresindeki elektronları ayrı sütunlarda denetle.",
      ],
    },
    {
      title: "Aynı ortak çift yerel denetimde iki kez görünür",
      paragraphs: [
        "H₂’deki iki elektron toplam bütçede bir kez sayılır; her H’nin çevresinde ise aynı ortak çift görünür ve duet sağlanır. O₂’de her O, dört ortak ve kendi dört bağ dışı elektronunu sayarak sekize ulaşır. İki yerel okteti toplayıp molekülde 16 değerlik elektronu bulunduğunu söylemek, ortak elektronları iki kez toplamaktır.",
        "H için duet, buradaki C/N/O/F/Cl örneklerinde oktet yararlı bir kontroldür. Bütün atomların bütün bileşiklerde oktet yapması zorunlu değildir: BF₃’ün basit Lewis yapısında B çevresinde altı elektron bulunur. Elektron bütçesine dışarıdan nokta ekleyerek okteti zorlamak türün yükünü değiştirir. Ayrıntılı orbital kuramı bu ünitenin yerine geçmez; çizim elektron sayımını düzenleyen bir modeldir.",
      ],
    },
    {
      title: "Elektronegatiflik bağdaki ortak elektronlarla ilgilidir",
      paragraphs: [
        "Elektronegatiflik, bağlı atomun ortak elektronları kendine çekme eğilimidir. İzole gaz atomundan elektron koparmak için gereken enerji olan iyonlaşma enerjisiyle aynı nicelik değildir. İki uç aynı elementse bu basit modelde çekim eğilimleri eşittir. H–H, Cl–Cl, O=O ve N≡N bağları bu nedenle apolar kovalent olarak sınıflanır; çoklu bağ olması eş uçları kutuplu yapmaz.",
        "H–Cl ve H–F’de ortak elektronlar iki uca eşit çekilmez. Yaklaşık Pauling değerleri H için 2,20, Cl için 3,16, F için 3,98 alınırsa farklar sırasıyla 0,96 ve 1,78’dir. Bu sayılar seçilmiş bir ölçeğe aittir; birim olarak joule veya elektron yazılmaz. Fark, burada kutuplanma eğilimini karşılaştırır; tek başına bağ uzunluğu, koparma enerjisi veya molekül dipolünü sayısal vermez.",
      ],
    },
    {
      title: "δ işaretini iyon yükünden ayır",
      paragraphs: [
        "HCl molekülünde Cl daha elektronegatif olduğu için Cl tarafına δ−, H tarafına δ+ yazılır. δ, kısmi yük demektir. Bu işaretler bir H⁺ iyonuyla bir Cl⁻ iyonunun saf gaz HCl içindeki bağımsızlığı anlamına gelmez; H–Cl bağı polar kovalenttir ve molekül toplamda nötrdür. Kısmi artı ucun bulunması, toplam +1 yüklü iyon bulunmasıyla farklıdır.",
        "Katı NaCl’de ise Na⁺ ve Cl⁻ iyonları örgü oluşturur; iyonlar arasındaki çekim iyoniktir. HCl’nin suda iyonlaşması ayrı bir ortam ve süreçtir. Soruda saf gaz, sulu çözelti veya kristal denmesini bu yüzden oku. Laboratuvardaki elektron bulutu ve δ işaretleri nitel paylaşım modelidir; çizimin şekli gerçek elektron yoğunluğunun ölçülmüş haritası değildir.",
      ],
    },
    {
      title: "Dipol okunu hangi uca yönelttiğini açıkla",
      paragraphs: [
        "Bu ünitedeki kimyasal dipol okunun ucu elektron yoğunluğu fazla olan kısmi negatif tarafa bakar. H–Cl için H’den Cl’ye, H–F için H’den F’ye yönelir. Aynı elementli bağda iki eş ucun birini kalıcı negatif seçmek gerekçesiz olur. Bir molekülü kâğıtta ters çevirmek kutupluluğunu değiştirmez; yalnız okun sayfadaki yönü döner.",
        "Bir bağın kutuplu olması paylaşımın eşit olmadığını söyler; bütün molekülün net kutbunu henüz söylemez. İki atomlu HCl’de bu bağı dengeleyecek ikinci bir bağ yoktur. Çok atomlu CO₂’de iki eş C=O etkisi birbirine zıttır. Molekülün tamamı soruluyorsa bağ yönleri ve gerçek geometri için sonraki ünitenin ikinci kontrolüne geç.",
      ],
    },
    {
      title: "C–H gibi küçük farklarda modelin kabulünü belirt",
      paragraphs: [
        "C–H bağındaki elektronegatiflik farkı görece küçüktür; bazı okul sınıflamalarında yaklaşık apolar, bazı açıklamalarda zayıf polar kabul edilir. H–Cl ve H–F gibi açık karşılaştırmaları bu sınır örneğiyle karıştırma. Soru bir kabul veya değer tablosu veriyorsa onu kullan; tek bir ezber eşik bütün bağları kesin kutulara ayıran evrensel yasa değildir.",
        "CH₄’ün apolar molekül olması C–H bağını hangi yaklaşık etiketle ele aldığından bağımsız olarak dört eş bağın uzayda dengelenmesiyle açıklanabilir. CH₃Cl’de bir köşe değişince aynı denge gerekçesi kalmaz. Böylece sınırdaki bağ etiketini tartışmak yerine sorunun istediği ölçeği korursun: bağdaki fark mı, molekülün net dipolü mü?",
      ],
    },
    {
      title: "Bağ sayısından enerjiye koşullu geç",
      paragraphs: [
        "Belirli bir gaz fazı bağı koparılırken enerji alınır; aynı koşullarda ters yönde aynı bağ kurulurken enerji verilir. Tepkime enerjisini yaklaşık bağ enerjileriyle hesaplarken koparılan bağlar için gerekeni toplar, oluşan bağlarda verilen enerjiyi çıkarırsın. Bağ kurulmasıyla bağ kopmasını aynı işaretli enerji olayı sayma.",
        "Aynı atom çiftinin karşılaştırılabilir basit örneklerinde çoklu bağlar genellikle daha kısa ve koparılması daha zor olabilir. Ancak farklı atomları veya farklı kimyasal çevreleri yalnız çizgi sayısıyla kesin sıralamak doğru değildir. ‘Üçlü bağ tek bağın tam üç katı enerji taşır’ çıkarımı da geçerli değildir. Sayısal enerji sorusunda gerekli bağ enerjileri ve süreç koşulları ayrıca verilmelidir.",
      ],
    },
    {
      title: "Molekül içini, moleküller arasını ve iyon grubunu ayır",
      paragraphs: [
        "H₂O içindeki O–H bağı kovalenttir; iki ayrı su molekülü arasındaki hidrojen bağı aynı bağ değildir. Su kaynarken moleküller arası ilişkilerin aşılması, bütün O–H bağlarının kopup H₂ ve O₂ oluşması demek değildir. Bir kovalent molekülün erime veya kaynama noktasını yalnız içindeki bağ çizgilerine bakarak belirleyemezsin.",
        "NH₄Cl’de NH₄⁺ grubunun kendi içindeki N–H bağları kovalent, NH₄⁺ ile Cl⁻ arasındaki çekim iyoniktir. Aynı maddede birden fazla düzeyde ilişki bulunabilir. Önce sorunun karşılaştırdığı iki parçayı adlandır: iki atom mu, iki molekül mü, iki iyon mu? Türü seçtikten sonra paylaşım veya çekim gerekçesini kur.",
      ],
    },
    {
      title: "Çözümünü iki ayrı kontrolle bitir",
      paragraphs: [
        "İlk kontrol sayısaldır: bütün değerlik elektronlarını ve toplam yükü yaz; bağ çizgilerinin kullandığı elektronları çıkar; yalnız elektronları ve yerel duet/oktet koşullarını denetle. İkinci kontrol yönseldir: aynı atomlar mı, farklı çekim eğilimleri mi; kısmi negatif uç nerede? Bu iki kontrol farklı yanlışları yakalar ve biri diğerinin yerine geçmez.",
        "Son cümlede tam olarak sorulanı cevapla. ‘N₂’de üç ortak çift ve altı ortak elektron vardır; eş N uçları nedeniyle bağ apolardır’ bir tam açıklamadır. ‘Çok elektron var, o yüzden polar’ açıklaması ise sayıdan yön çıkardığı için geçersizdir. Modelde yeni tür seçip tahminini gerekçelendirmek alıştırma desteğidir; bağımsız doğru veya konu tamamlama kaydı oluşturmaz.",
      ],
    },
  ],
  examples: [
    {
      title: "Saf molekülü iyonik kristalden ayır",
      prompt:
        "Saf F₂ ve HF molekülleri ile katı KF veriliyor. F ve H ametal; K metaldir. F’nin ortak elektron çekimi H’den büyüktür. İncelenen atomlar veya iyonlar arasındaki bağları sırayla sınıflandır.",
      strategy: "Önce taneciği, sonra paylaşımın eşitliğini belirle.",
      steps: [
        {
          label: "F₂",
          explanation:
            "Aynı iki F ortak çifti eşit çeker; apolar kovalent bağ vardır.",
        },
        {
          label: "HF",
          explanation:
            "Ortak çift F’ye daha çok çekilir; H δ+, F δ−, bağ polar kovalenttir.",
        },
        {
          label: "KF",
          explanation:
            "Katı K⁺ ve F⁻ iyonlarının örgüsüdür; iyonlar arası çekim iyoniktir.",
        },
      ],
      answer: "Apolar kovalent; polar kovalent; iyonik.",
      check:
        "F içermeleri üç örneğin aynı tanecik türü ve aynı bağa sahip olmasını sağlamadı.",
      pitfall: "HF’de δ− işaretini tam F⁻ iyonu sanmak.",
    },
    {
      title: "O₂ ile N₂’de ortak ve yalnız elektron",
      prompt:
        "O’nun 6, N’nin 5 değerlik elektronu vardır. Basit Lewis yapıları O=O ve N≡N olarak verilmiştir. Her molekülün ortak elektron ve toplam yalnız elektron sayılarını bul.",
      strategy: "Çizgi sayısını ikiyle çarp; sonra bütün bütçeden çıkar.",
      steps: [
        {
          label: "Bütçeler",
          expression: "O₂: 12; N₂: 10",
          explanation:
            "Her molekülde iki özdeş atomun değerlik elektronlarını toplarız.",
        },
        {
          label: "Ortak bölge",
          expression: "O₂: 2×2=4; N₂: 3×2=6",
          explanation: "Çift ve üçlü bağlar iki ve üç ortak çift taşır.",
        },
        {
          label: "Yalnız kısım",
          expression: "O₂: 12−4=8; N₂: 10−6=4",
          explanation: "O₂’de toplam dört, N₂’de toplam iki yalnız çift kalır.",
        },
      ],
      answer: "O₂: 4 ortak, 8 yalnız elektron. N₂: 6 ortak, 4 yalnız elektron.",
      check:
        "Her iki molekülde de ortak+yalnız toplamı başlangıç bütçesini verir; eş uçlar apolar bağ oluşturur.",
      pitfall:
        "Üçlü bağı üç elektron veya iki yerel okteti toplam 16 elektron sanmak.",
    },
    {
      title: "Bir iskelette farklı bağ mertebelerini topla",
      prompt:
        "H–C≡C–H nötr molekülü veriliyor. H 1, C 4 değerlik elektronu getirir. Toplam ortak çift ve bağ dışı elektron sayısı nedir?",
      strategy: "Üçlü bağın üç çizgisini iki ayrı C–H çizgisiyle topla.",
      steps: [
        {
          label: "Toplam elektron",
          expression: "2×1+2×4=10",
          explanation: "Tür nötrdür; yük düzeltmesi yoktur.",
        },
        {
          label: "Ortak çiftler",
          expression: "1+3+1=5 çift",
          explanation: "İki C–H tek bağı ve bir C≡C üçlü bağı vardır.",
        },
        {
          label: "Kalan",
          expression: "10−2×5=0",
          explanation:
            "Bütün değerlik elektronları bağlarda kullanılmıştır; H dueti ve C okteti sağlanır.",
        },
      ],
      answer: "5 ortak çift ve 0 bağ dışı elektron.",
      check:
        "C’nin iki komşusu olması ortak çift sayısının da iki olduğu anlamına gelmez.",
      pitfall: "Ortadaki üç çizgiyi tek ortak çift saymak.",
    },
    {
      title: "Kısmi yük ile net yük aynı veri değildir",
      prompt:
        "Saf HCl gazında H δ+, Cl δ− gösteriliyor. H ve Cl’nin elektronegatiflikleri sırasıyla 2,20 ve 3,16. ‘Molekül +1 yüklüdür ve bağ iyoniktir’ yorumunu düzelt.",
      strategy: "Önce δ’nın anlamını, sonra iki ucun elektron çekişini açıkla.",
      steps: [
        {
          label: "Uçları karşılaştır",
          expression: "3,16>2,20",
          explanation: "Cl ortak elektronları daha güçlü çeker.",
        },
        {
          label: "Yükü oku",
          explanation:
            "δ işareti kısmi yüktür; iki ayrı tam iyon veya toplam +1 yük bildirmez.",
        },
        {
          label: "Sonucu kur",
          explanation:
            "Saf HCl nötr, polar kovalent bağlı moleküldür. Suda iyonlaşma başka koşuldur.",
        },
      ],
      answer:
        "HCl toplamda nötrdür; H–Cl polar kovalenttir, Cl kısmi negatif uçtur.",
      check:
        "Sorudaki saf gaz koşulu korunur; çözeltideki iyonlaşma bu tanecikle karıştırılmaz.",
      pitfall: "Bir kısmi artı uç gördüğünde bütün taneciği katyon saymak.",
    },
    {
      title: "Bağ kurma ve koparma enerjisinin işareti",
      prompt:
        "Bir gaz fazı öğretim hesabında H–H 436, F–F 158, H–F 568 kJ/mol bağ enerjileri veriliyor. H₂+F₂→2HF için yaklaşık enerji değişimini bul; aynı bağ enerjilerinin geçerli olduğu kabul ediliyor.",
      strategy: "Kopanları artı, oluşanları eksi katkıyla say.",
      steps: [
        {
          label: "Koparılanlar",
          expression: "436+158=594 kJ",
          explanation:
            "Bir H–H ve bir F–F bağının kopması için enerji gerekir.",
        },
        {
          label: "Oluşanlar",
          expression: "2×568=1136 kJ",
          explanation: "İki H–F bağı kurulur; bu büyüklükte enerji verilir.",
        },
        {
          label: "Bilanço",
          expression: "ΔH≈594−1136=−542 kJ",
          explanation:
            "Yazılan tepkime miktarı için net enerji dışarı verilir; ortalama bağ enerjileri yaklaşık sonuç verir.",
        },
      ],
      answer: "Yazılan tepkime için yaklaşık −542 kJ; enerji açığa çıkar.",
      check:
        "Bir yerine iki H–F bağı sayıldı. İşaret, oluşumda verilen enerjinin daha büyük olmasıyla uyumludur.",
      pitfall:
        "Bağ kurulurken de koparken de enerji harcanır demek veya bağ sayısını atlamak.",
    },
  ],
  recall: [
    {
      prompt: "Çift bağ ve üçlü bağ kaç ortak elektron içerir?",
      answer:
        "Çift bağ iki çift yani 4; üçlü bağ üç çift yani 6 elektron içerir. Aynı komşuya gittiklerinde geometrik yön bir tanedir.",
    },
    {
      prompt: "HCl’de Cl δ− neden tam Cl⁻ demek değildir?",
      answer:
        "δ, paylaşımın eşitsizliğinden doğan kısmi yüktür. Saf molekülün toplam yükü sıfırdır; bağı polar kovalenttir.",
    },
    {
      prompt: "Elektronegatiflik ile iyonlaşma enerjisini nasıl ayırırsın?",
      answer:
        "İlki bağlı atomun ortak elektronları çekme eğilimidir; ikincisi tanımlanmış gaz türünden elektron koparmanın enerjisidir.",
    },
    {
      prompt:
        "O₂ için iki atomun oktetlerini toplayınca neden toplam elektron bulunmaz?",
      answer:
        "Ortak 4 elektron iki atomun yerel çevresinde de sayılır. Gerçek toplam 12’dir: 4 ortak+8 yalnız.",
    },
    {
      prompt: "Bir polar bağ bütün molekülü polar yapar mı?",
      answer:
        "Tek başına yeterli değildir. Molekülün gerçek geometrisinde bağ etkileri dengelenebilir; CO₂ yakın karşı örnektir.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri, basılı s. 38–41 / PDF s. 40–43; OGM Materyal 9. Sınıf Güçlü Etkileşimler III: Kovalent Bağ, s. 1 görsel okuması; Aurelia 017 Kovalent Bağ ve Polar–Apolar Bağ, s. 1–10. Kaynakların paylaşım ve kutuplanma kapsamından yazılmış özgün anlatım ve sorular. Geometri, kısmi yük ve C–H yaklaşımı koşulları açıklandı; resmî sınav sorusu aktarımı değildir.",
};

const molecularGuide: LessonGuide = {
  id: "molekullerde-polarlik-apolarlik",
  minutes: 60,
  objectives: [
    "Polar bağ ile kalıcı molekül dipolünü ayrı denetle; gerçek geometriyi ve eşdeğer bağları birlikte kullan.",
    "Lewis bağlantısından basit elektron bölgelerine, oradan doğrusal/açısal/üçgen/piramidal/dört yüzlü şekle geç.",
    "Dipollerin yön ve büyüklüklerini vektörel topla; iki boyutlu izdüşümün sınırını fark et.",
  ],
  sections: [
    {
      title: "Bağı etiketledikten sonra molekülü yeniden incele",
      paragraphs: [
        "C=O bağı polardır: elektron dağılımı O tarafına kayar. Fakat bir CO₂ molekülünün bütün yük dağılımını tek C=O bağına bakarak sınıflandıramazsın. Diğer eş bağın yönünü de hesaba katmalısın. Molekülün kalıcı dipolü sıfırsa apolar, sıfırdan farklıysa polar deriz; polar sözcüğü hem bağ hem molekül için kullanıldığından ölçeği açıkça belirt.",
        "HCl iki atomlu bir moleküldür; tek bağın kutuplanmasını dengeleyecek ikinci bir bağ yoktur. CO₂ ve H₂O ise birden fazla bağ içerir. Bu ikisinde de bağlar polar olduğu hâlde sonuçları farklıdır. Öğrenme hedefi formül listesini ezberlemek değil, geometri ve eşlik koşullarının neden birinde sıfır toplam verdiğini açıklamaktır.",
      ],
    },
    {
      title: "Lewis çizgisinden bağ yönüne geçerken iki sayımı ayır",
      paragraphs: [
        "Merkez atomun her komşusuna giden tek, çift veya üçlü bağ bir elektron bölgesi yönü sayılır. Merkezdeki her yalnız çift bir bölge daha oluşturur. CO₂’de C’nin iki O komşusu ve sıfır yalnız çifti vardır: iki bölge. O=C=O’nun dört Lewis çizgisini dört ayrı komşu gibi sayarsan yanlış geometri kurarsın.",
        "Bu ünitenin basit modellerinde bölgelerin birbirinden uzaklaşması şekli kurmaya yardım eder. İki bağ yönü ve yalnız çift olmaması doğrusal; üç bağ yönü ve yalnız çift olmaması düzlemsel üçgen; dört bağ yönü ve yalnız çift olmaması dört yüzlü düzen verir. Buradaki şekil adları atomların konumlarına aittir; yalnız elektron çiftleri atommuş gibi şeklin köşelerine eklenmez.",
      ],
      table: {
        headers: [
          "Merkezde bağ yönü + yalnız çift",
          "Atom geometrisi",
          "Örnek",
        ],
        rows: [
          ["2 + 0", "Doğrusal", "CO₂, HCN"],
          ["3 + 0", "Düzlemsel üçgen", "BF₃"],
          ["4 + 0", "Dört yüzlü", "CH₄, CCl₄, CH₃Cl"],
          ["3 + 1", "Üçgen piramit", "NH₃"],
          ["2 + 2", "Açısal", "H₂O, OF₂"],
        ],
      },
    },
    {
      title: "Yalnız çift şekli etkiler; tek başına karar kuralı değildir",
      paragraphs: [
        "H₂O’da O’nun iki bağı ve iki yalnız çifti, toplam dört elektron bölgesi vardır. Atomların şekli açısaldır. NH₃’te üç bağ ve bir yalnız çift, atomların üçgen piramit oluşturmasıyla ilişkilidir. Bu iki molekülde eş dış atomlar bulunmasına rağmen bağ etkileri karşıt yönlere düzenlenmediği için kalıcı dipol vardır.",
        "‘Merkezde yalnız çift yoksa mutlaka apolar’ kısayolu güvenilir değildir. CH₃Cl’nin C’sinde yalnız çift yoktur ama bir Cl ve üç H köşesi eşdeğer değildir; net dipol kalır. Daha geniş geometri ailelerinde yalnız çift varlığı da tek başına evrensel polar karar vermez. Bu ünitede öğretilen basit şekli ve bağların eşdeğerliğini birlikte kullan; tek bir işareti sonuç sanma.",
      ],
    },
    {
      title: "Vektörün yalnız uzunluğunu değil yönünü topla",
      paragraphs: [
        "Bağ dipolü bir yönlü etki olarak gösterilir. Aynı doğru üzerindeki sağa 4 birim ile sola 4 birim toplamı sıfırdır; sağa 4 ile sola 1 ise sağa 3 bırakır. Eş büyüklük yeterli değildir: iki ok aynı yöne bakarsa toplanır. Zıt yön yeterli değildir: büyüklükler farklıysa kalan etki vardır. Vektörel toplam, bu iki koşulu birlikte denetler.",
        "Molekül modelindeki oklar kimyasal gösterimle kısmi negatif uca yönelir. Sayısal öğretim ağırlıkları ölçülmüş debye değerleri değildir; burada hangi yönlerin dengelendiğini görünür kılar. Elektronegatiflik farkını doğrudan molekülün dipol momentine dönüştürmüyoruz. Gerçek momentler bağ çevresine ve bütün elektron dağılımına bağlıdır; sayısal büyüklük ancak verilen model verileriyle hesaplanır.",
      ],
    },
    {
      title: "CO₂ ile H₂O: eş bağların farklı yönleri",
      paragraphs: [
        "CO₂’de C çevresindeki iki bölge doğrusal yerleşir. Eş iki C=O dipolü C’den iki O’ya, birbirine zıt yönelir; bileşke sıfır olur. C=O bağlarını apolar sayarak değil, polar etkileri dengeleyerek apolar molekül sonucuna ulaşırsın. Molekülü başka açıdan çizmek bu fiziksel dengeyi değiştirmez.",
        "H₂O’nun iki O–H dipolü H’lerden O’ya bakar. Açısal düzende yan bileşenler dengelenirken açıortay doğrultusunda ortak etki kalır. Eş iki bağın varlığı onları 180° zıt yapmaz. Laboratuvarda yaklaşık 104,5° atom açısı için iki birim bağ etkisinin bileşkesi 2cos(104,5°/2) ile gösterilebilir; bu birimleştirilmiş şema, suyun ölçülmüş dipol momenti değildir.",
      ],
    },
    {
      title: "BF₃ ile NH₃: üç bağın hepsi düzlemde değildir",
      paragraphs: [
        "BF₃’te B merkezinde üç bağ yönü ve sıfır yalnız çift vardır. Üç eş B–F dipolü düzlemde 120° aralıkla dağılır ve bileşke sıfırdır. B’nin Lewis oktetinin eksik olması kendi başına molekül dipolünün sıfırdan farklı olmasını gerektirmez. Elektron bütçesi ile yön toplamı yine farklı denetimlerdir.",
        "NH₃’te N’nin yalnız çiftiyle atom şekli üçgen piramittir; üç H ve N aynı düzlemde dört köşe oluşturmaz. Üç eş N–H etkisinin N yönünde ortak bileşeni kalır. Üç bağ bulunmasını 120° düzlemsel simetriyle eşitleme. Model yaklaşık 107° H–N–H açısını görselleştirir; temel çıkarım, piramidin üç boyutlu yapısıdır.",
      ],
    },
    {
      title: "Dört yüzlü düzen bir artı işareti değildir",
      paragraphs: [
        "CH₄ ve CCl₄’te dört eş dış köşe, düzenli dört yüzlünün uzaydaki yönlerine yerleşir. Bunları kâğıtta bir artı işaretiyle çizmek bütün bağların aynı düzlemde veya karşılıklı 180° olduğunu göstermez. Dört yüzlüde komşu bağ açıları yaklaşık 109,5°’dir. Dört eş yönün üç boyutlu bileşkesi sıfır olduğundan bu moleküller apolardır.",
        "Laboratuvardaki düz ekran, üç boyutlu şeklin izdüşümünü gösterir. Kalın kama öne, kesik bağ arkaya yönelen bağlantıları ayırır; görünümü döndürünce şeklin ekran görüntüsü değişir. Molekülün gerçek kutupluluğu değişmez. Bir vektör ekrana dik bakarken küçük veya görünmez izdüşüm verebilir; bu yüzden net sıfır kararını yalnız çizilen okun ekran boyuna göre değil üç boyutlu hesaba göre ver.",
      ],
    },
    {
      title: "Bir dış atom değişince simetri gerekçesini yeniden kur",
      paragraphs: [
        "CH₃Cl’de bir köşe Cl, üç köşe H’dir. C–Cl etkisi C–H etkileriyle eş değildir; dört yüzlü iskelet korunmasına rağmen CCl₄ veya CH₄’teki dört eş yön gerekçesi kullanılamaz. Cl tarafında net dipol kalır. Merkez C’nin yalnız çiftinin bulunmaması bu sonucu engellemez.",
        "CH₂Cl₂’de iki Cl bulunması da birbirlerini götüreceklerini göstermez. Dört yüzlünün iki köşesi karşılıklı 180° değildir; iki C–Cl yönünün ortak payı kalır. Kâğıttaki solda ve sağda yazılmış iki Cl’den gerçek karşıtlık çıkarmak hatadır. Simetri sözcüğüyle yalnız şekil adını değil, aynı tür bağların hangi uzaysal köşelere yerleştiğini anlat.",
      ],
    },
    {
      title: "Doğrusal olmak eş ve zıt olmak demek değildir",
      paragraphs: [
        "HCN’nin H–C≡N bağlantısı doğrusaldır. H–C’de ortak çekim C tarafına, C≡N’de N tarafına yönelir. Bu iki etki merkez C’ye göre farklı bağ uçlarından gelse de aynı genel doğrultuyu destekler; molekül polardır. CO₂’nin iki uçtaki eş O atomlarıyla kurduğu denge HCN’de yoktur.",
        "Formülde merkez veya bağ açısı bilinmiyorsa yalnız iki dış atom görüp kesin apolar karar verme. Önce bağlantı ve basit Lewis bölgeleri gerekir. Benzer şekilde iki bağın polar olduğu bilgisi, etkilerin büyüklükleri ve yönleri verilmeden net büyüklüğü hesaplatmaz. Soruda desteklenen en güçlü sonucu seç; eksik geometriyi hayalî cetvel ölçümüyle tamamlama.",
      ],
    },
    {
      title: "Apolar molekül etkisiz tanecik değildir",
      paragraphs: [
        "Apolar molekülün kalıcı net dipolü sıfırdır; elektronları yok değildir ve dağılımları anlık değişebilir. CO₂ veya Cl₂ gibi tanecikler arasında London etkileşimleri bulunabilir. Polar HCl molekülleri için kalıcı dipoller arası etkileşimin yanında London etkisi de vardır. ‘Polar değilse hiç çekim yok’ sonucunu kurma.",
        "Bu bölüm yalnız sonraki zayıf etkileşim ünitesine köprü kurar. Molekül içindeki O–H kovalent bağı, iki su molekülü arasındaki hidrojen bağı ve katı NaCl’de iyonlar arası çekim farklı düzeylerdedir. İyonik kristali ‘polar NaCl molekülü’ diye sınıflandırma. Son kontrol: tanecik türü, bağ kutupluluğu, gerçek geometri ve bütün yönlerin toplamı aynı açıklamada uyuşuyor mu?",
      ],
    },
  ],
  examples: [
    {
      title: "İki eş bağ her zaman götürmez",
      prompt:
        "X molekülünde iki eş polar bağ doğrusal ve 180° zıt; Y’de iki eş polar bağ açısal ve 104,5° yapıyor. Başka bağ etkisi yok. Net dipolleri karşılaştır.",
      strategy: "Eşlik ile yönü ayrı kontrol et.",
      steps: [
        {
          label: "X’in yönü",
          explanation: "Doğrusal eş ve zıt vektörler toplanınca sıfır verir.",
        },
        {
          label: "Y’nin yönü",
          explanation:
            "Yanal paylar gider, açıortaydaki aynı yönlü paylar kalır.",
        },
        {
          label: "Sınıflandır",
          explanation:
            "X apolar, Y polardır; iki yapıda da bağlar polar kalır.",
        },
      ],
      answer: "X’te sıfır; Y’de sıfırdan farklı kalıcı dipol.",
      check: "CO₂ ve H₂O, bu koşulların gerçek yakın örnekleridir.",
      pitfall:
        "İki eş bağ var bilgisinden otomatik olarak iki zıt ok çıkarmak.",
    },
    {
      title: "Üçgen ile piramidi ayır",
      prompt:
        "BF₃ düzlemsel üçgen, üç eş B–F dipolü 120° aralıklı; NH₃ üçgen piramit ve üç eş N–H dipolünün her birinin N yönünde pozitif bileşeni var. Molekül sınıflarını bul.",
      strategy: "Üç bağlı ucu saydıktan sonra düzlemi sorgula.",
      steps: [
        {
          label: "BF₃",
          explanation: "Düzlemde üç eş yönün bileşenleri sıfırlanır.",
        },
        {
          label: "NH₃",
          explanation: "N yönündeki üç pozitif payın toplamı sıfır olamaz.",
        },
        {
          label: "Kuralı sınırla",
          explanation:
            "Üç eş bağ bilgisi aynı geometriyi garanti etmediğinden aynı sonuç verilmez.",
        },
      ],
      answer: "BF₃ apolar; NH₃ polar.",
      check:
        "Merkezde yalnız çift ve komşu sayısı, belirtilen geometrilerle uyumludur.",
      pitfall: "NH₃’ü kâğıtta üç kollu görünce düzlemsel 120° kabul etmek.",
    },
    {
      title: "Dört yüzlünün bir köşesini değiştir",
      prompt:
        "CCl₄ ve CH₃Cl’de C dört yüzlü dört tek bağ yapıyor; merkezde yalnız çift yok. CCl₄’te dört C–Cl eş, CH₃Cl’de C–Cl ve C–H etkileri farklı. Aynı molekül kutupluluğu zorunlu mu?",
      strategy:
        "Şekli korurken eşdeğerlik koşulunun değişip değişmediğine bak.",
      steps: [
        {
          label: "Eş dört köşe",
          explanation: "CCl₄’te dört eş dipolün uzaysal toplamı sıfırdır.",
        },
        {
          label: "Eş olmayan köşe",
          explanation:
            "CH₃Cl’de tek Cl köşesi diğer üç köşeyle aynı bağ etkisine sahip değildir; sıfır toplam gerekçesi kalmaz.",
        },
        {
          label: "Sonuç",
          explanation:
            "Bu iki gerçek molekülde CCl₄ apolar, CH₃Cl polardır. Yalnız çift yokluğu tek başına karar vermez.",
        },
      ],
      answer: "Aynı değildir: CCl₄ apolar, CH₃Cl polar.",
      check:
        "C çevresinde dörder bölge bulunması atom türlerinin de eş olduğunu söylemez.",
      pitfall: "Merkezde yalnız çift yoksa bütün moleküller apolardır demek.",
    },
    {
      title: "Verilen ok büyüklükleriyle neti hesapla",
      prompt:
        "Bir düzlemde 120° aralıklı üç dipol oku var. Yukarı yönelen ok 2 birim; aşağı-sağ ve aşağı-sol okların her biri 1 birim. Aşağı yönlü her okun düşey bileşeni−1/2, yatay bileşenleri eş ve zıt veriliyor. Net vektörü bul.",
      strategy: "Önce yatayı götür, sonra düşeyi cebirsel topla.",
      steps: [
        {
          label: "Yatay",
          expression: "x + (−x)=0",
          explanation:
            "İki yana bakan eş okların yatay payları birbirini götürür.",
        },
        {
          label: "Düşey",
          expression: "2−1/2−1/2=1",
          explanation: "Yukarı 2 birimden aşağı toplam 1 birim çıkarılır.",
        },
        {
          label: "Yorum",
          explanation:
            "Net yukarı 1 birimdir. Üç açı 120° kalsa da büyüklüklerin eşit olmaması dengeyi bozar.",
        },
      ],
      answer: "Yukarı 1 birim; modelin dipol bileşkesi sıfır değildir.",
      check:
        "Yukarı yönelen ok 1 olsaydı 1−1/2−1/2=0 olurdu; değişen koşul açıkça görülür.",
      pitfall: "Açılar simetrik diye farklı büyüklükteki okları eş saymak.",
    },
    {
      title: "Aynı doğrusal çizimde farklı bağ uçları",
      prompt:
        "O=C=O ve H–C≡N doğrusal veriliyor. İlkinde iki C=O eş; ikincisinde C, H’den ve N, C’den daha elektronegatif. Molekül dipollerini karşılaştır.",
      strategy: "Her oku hangi atoma doğru çizdiğini tek tek yaz.",
      steps: [
        {
          label: "CO₂",
          explanation: "C’den iki zıt O’ya yönelen eş etkiler dengelenir.",
        },
        {
          label: "HCN",
          explanation:
            "H’den C’ye ve C’den N’ye etkiler aynı doğrultuyu destekler.",
        },
        {
          label: "Sınır",
          explanation:
            "İki bağ yönünün doğrusal olması eşlik ve zıtlık koşullarının hepsini vermemiştir.",
        },
      ],
      answer: "CO₂ apolar; HCN polar.",
      check:
        "Sayısal bağ büyüklüğü verilmediğinden HCN için ölçülmüş dipol değeri üretilmez.",
      pitfall:
        "Doğrusal sözcüğünü bütün moleküller için apolar etiketiyle eşitlemek.",
    },
  ],
  recall: [
    {
      prompt: "CO₂’de dört Lewis çizgisi neden dört geometrik bölge değildir?",
      answer:
        "Çift bağlar iki ayrı O komşusuna gider; her komşu bir yöndür. C’nin iki bağı yönü ve sıfır yalnız çifti, iki bölge verir.",
    },
    {
      prompt: "Merkezde yalnız çift yoksa apolar mı? Yakın karşı örnek ver.",
      answer:
        "Tek başına yeterli değildir. CH₃Cl’de merkez C’de yalnız çift yoktur ama Cl ve H uçları eşdeğer olmadığından net dipol vardır.",
    },
    {
      prompt: "H₂O’da eş iki O–H dipolü neden gitmez?",
      answer:
        "Açısal yapı nedeniyle karşıt değillerdir. Yan paylar giderken O tarafındaki ortak bileşen kalır.",
    },
    {
      prompt:
        "Molekülün çizimini döndürmek polar/apolar sınıfını değiştirir mi?",
      answer:
        "Hayır. Uzaydaki bütün vektörleri birlikte döndürmek net büyüklüğü değiştirmez; ekrandaki izdüşüm farklı görünür.",
    },
    {
      prompt:
        "Apolar CO₂ moleküllerinin birbirini hiç çekmediği söylenebilir mi?",
      answer:
        "Hayır. Kalıcı dipol sıfır olabilir; anlık elektron dağılımıyla London etkileşimleri bulunabilir.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri, basılı s. 38–41 / PDF s. 40–43; OGM Materyal 9. Sınıf Kovalent Bağ konu özeti, s. 1; Aurelia 018 Moleküllerde Polarlık Apolarlık s. 1–12 ve 017 s. 2–5,7. Özgün öğretim, vektör modeli ve sorular. Merkezdeki çift kısayolu geometri/eşdeğerlik koşuluyla sınırlandı; yaklaşık açı ve 3B vektörler açıklayıcı modeldir, ölçülmüş dipol değerleri değildir. Resmî soru aktarımı yoktur.",
};

type Item = [string, string[], number, string, string];
const covalentQuestions: Item[] = [
  [
    "Kovalent bağ için bu ünitenin H₂, Cl₂ ve HCl molekül örnekleriyle uyumlu temel açıklama hangisidir?",
    [
      "Atomların bir veya daha çok elektron çiftini ortaklaşa kullanması",
      "İki çekirdeğin protonlarının birleşmesi",
      "Bağın yalnız farklı elementler arasında kurulması",
      "Her durumda bir atomun tüm elektronlarını ötekine vermesi",
      "Bütün moleküllerde kalıcı net dipolün zorunlu olması",
    ],
    0,
    "Paylaşımın tanımını, atomların aynı veya farklı olmasından ayır.",
    "Kovalent bağ ortak elektron çiftiyle açıklanır; aynı atomlar da farklı atomlar da paylaşabilir. Çekirdekler birleşmez. Paylaşım iyonik elektron aktarımıyla aynı süreç değildir; polar bağların dengelenmesiyle apolar molekül de oluşabilir.",
  ],
  [
    "Saf Cl₂ ve HCl gazları ile katı LiCl veriliyor. HCl’de ortak çift Cl’ye daha çok çekiliyor; LiCl iyon örgüsüdür. İncelenen bağlar sırasıyla hangisidir?",
    [
      "İyonik; apolar kovalent; polar kovalent",
      "Polar kovalent; iyonik; apolar kovalent",
      "Apolar kovalent; polar kovalent; iyonik",
      "Apolar kovalent; iyonik; polar kovalent",
      "Üçü de iyonik",
    ],
    2,
    "Önce ayrık molekülü iyon örgüsünden ayır; sonra eş uçları karşılaştır.",
    "Cl₂’nin eş uçları apolar kovalent; HCl’nin eşitsiz paylaşımı polar kovalent bağ verir. Katı LiCl’de Li⁺/Cl⁻ çekimi iyoniktir. Ortak Cl atomu üç bağ türünü özdeş yapmaz; gaz ve kristal koşulları korunmalıdır.",
  ],
  [
    "N₂’nin basit Lewis yapısı N≡N, N’nin değerlik elektron sayısı 5 olarak verilmiştir. Molekülün ortak bağ elektronları kaçtır?",
    ["2", "3", "4", "10", "6"],
    4,
    "Bir Lewis çizgisinin kaç elektron temsil ettiğini yaz.",
    "Üçlü bağ üç ortak çift içerir:3×2=6 elektron. Toplam bütçe 10’dur; kalan 4 elektron iki yalnız çifttir. Üç çizgiyi üç elektron veya bütün bütçeyi ortak bölge sanmak sayım hatasıdır.",
  ],
  [
    "O atomu 6 değerlik elektronu getiriyor. O=O yapılı nötr O₂ molekülünde toplam bağ dışı elektron sayısı kaçtır?",
    ["4", "8", "6", "12", "16"],
    1,
    "Önce bütün bütçeyi kur, sonra çift bağın kullandığını çıkar.",
    "Toplam 2×6=12 elektrondur. Çift bağ iki ortak çift,4 elektron kullanır. Bağ dışı 12−4=8 elektron, yani toplam 4 yalnız çift kalır. Her O üzerindeki 4 yalnız elektronla molekülün toplamını karıştırma.",
  ],
  [
    "Saf HCl gazında elektronegatiflik H için 2,20, Cl için 3,16 veriliyor. H–Cl bağı ve kısmi yükler için hangisi doğrudur?",
    [
      "İyonik; H tam+1 yüklü bağımsız iyondur",
      "Apolar; farklı değerler paylaşımı etkilemez",
      "Polar; H δ− ve Cl δ+",
      "Polar kovalent; H δ+ ve Cl δ−, molekül toplamda nötr",
      "Molekülün toplam yükü−1’dir",
    ],
    3,
    "Ortak çifti daha çok çeken uç ile bütün molekülün toplam yükünü ayrı düşün.",
    "Cl daha elektronegatiftir; ortak yoğunluk Cl’ye kayar. δ kısmi yük gösterir; H δ+, Cl δ− olur ve nötr HCl’de toplam iyon yükü yoktur. Saf gaz molekülünü sulu çözeltinin iyonlaşmasıyla karıştırma.",
  ],
  [
    "Yaklaşık elektronegatiflikler H 2,20; F 3,98; Cl 3,16; Br 2,96 veriliyor. H–F, H–Cl, H–Br bağlarından hangisinde bu verilere göre elektronegatiflik farkı en büyüktür?",
    [
      "H–F; fark 1,78",
      "H–Cl; fark 5,36",
      "H–Br; fark 5,16",
      "Hepsinde fark eşittir",
      "Bağ enerjisi verilmeden fark hesaplanamaz",
    ],
    0,
    "İki uç değerini çıkar; toplama ve enerji birimine geçme.",
    "Farklar HF için 1,78; HCl için 0,96; HBr için 0,76’dır. En büyük HF’dir. Toplama yapmak farkı vermez. Elektronegatiflik farkı için bağ enerjisi gerekmez; bu sonuç tek başına ölçülmüş dipol veya bağ koparma enerjisi değildir.",
  ],
  [
    "H–C≡C–H nötr iskeletinde H 1, C 4 değerlik elektronu getiriyor. Toplam ortak çift sayısı ve bağ dışı elektron sayısı sırasıyla kaçtır?",
    ["3 ve 4", "4 ve 2", "5 ve 0", "5 ve 5", "10 ve 0"],
    2,
    "İki tek bağ ile bir üçlü bağın çizgilerini birlikte say.",
    "Bütçe 2×1+2×4=10 elektrondur. Ortak çiftler 1+3+1=5’tir; bu 10 elektronu kullanır ve bağ dışı elektron kalmaz. Beş ortak çift ile on ortak elektron farklı sayılardır. İki komşu bulunması çizgi sayısını iki yapmaz.",
  ],
  [
    "Ayrık gaz atomlarından belirli bir X–X bağı kurulurken aynı koşullarda 120 kJ/mol enerji açığa çıkıyor. Bu bağı aynı atomlara koparmak için gereken enerji hakkında hangisi doğrudur?",
    [
      "120 kJ/mol yine açığa çıkar",
      "Enerji gerekmez",
      "Bağın apolar olması enerjiyi sıfırlar",
      "Bilinemez; ters süreçle ilişki yoktur",
      "120 kJ/mol enerji alınır",
    ],
    4,
    "Aynı koşullarda aynı sürecin tersini düşün.",
    "Bağ kurulurken verilen enerji, aynı bağın ters yönde koparılmasında alınır. 120 kJ/mol gerekir. Apolar bağlar da bağ enerjisine sahiptir; kutuplanmanın sıfır olması bağın yokluğu demek değildir. Farklı koşul veya başka bağ verilse ayrıca veri gerekirdi.",
  ],
  [
    "NH₄Cl’de NH₄⁺ iyonunun içinde N–H ortak elektron çiftleri, NH₄⁺ ile Cl⁻ arasında zıt iyon çekimi bulunuyor. İki ilişki sırasıyla nasıl sınıflandırılır?",
    [
      "İyonik; kovalent",
      "Kovalent; iyonik",
      "İkisi de hidrojen bağı",
      "İkisi de apolar moleküller arası çekim",
      "İkisi de çekirdek tepkimesi",
    ],
    1,
    "Bağlanan iki parçanın atom mu, iyon mu olduğuna bak.",
    "N–H ortaklaşması kovalent bağdır. Bütün NH₄⁺ grubu ile Cl⁻ arasındaki çekim iyoniktir. Bileşiğe tek etiket verip grubun içini dışıyla karıştırma; NH₄⁺’ın çok atomlu oluşu N–H bağlarını iyonik yapmaz.",
  ],
  [
    "H–C≡N nötr Lewis iskeleti veriliyor; H 1, C 4, N 5 değerlik elektronu getirir. Ortak elektron ve toplam yalnız elektron sayısı sırasıyla hangisidir?",
    ["4 ve 6", "6 ve 4", "10 ve 0", "8 ve 2", "8 ve 8"],
    3,
    "Tek ve üçlü bağın toplam çift sayısını bütçeden çıkar.",
    "Toplam 10 elektron, bir tek ve bir üçlü bağdan 4 ortak çift yani 8 ortak elektron vardır. Kalan 2 elektron N üzerinde bir yalnız çifttir. Üçlü bağı tek çizgi sanmak ortak sayımı azaltır; yerel oktetleri toplamak ise ortak elektronları iki kez sayar.",
  ],
];
const molecularQuestions: Item[] = [
  [
    "CO₂ doğrusal O=C=O yapılıdır; iki C=O bağı eş ve polardır. Molekül için hangi açıklama doğrudur?",
    [
      "Polar bağ bulunduğundan kesin polar moleküldür",
      "C=O bağları bu yüzden apolar olmak zorundadır",
      "Eş ve zıt bağ etkileri sıfırlandığından molekül apolardır",
      "Doğrusal yapı bütün elektronların yokluğunu gösterir",
      "İki çift bağ dört geometrik yön oluşturur",
    ],
    2,
    "Bağ etiketini değiştirmeden iki eş okun yönlerini topla.",
    "İki eş C=O dipolü doğrusal yapıda zıttır ve sıfır bileşke verir. Bağlar polar kalır; apolar molekül sonucunun nedeni yön dengesidir. Dört Lewis çizgisi iki O komşusuna gittiği için merkezde iki bölge vardır.",
  ],
  [
    "H₂O açısal yapılı, iki eş O–H bağı polar ve her dipol H’den O’ya yöneliyor. İki bağ neden molekülü apolar yapmaz?",
    [
      "Eş bağların yönleri karşıt değildir; O tarafında ortak bileşen kalır",
      "Eş bağlarda hiçbir elektron bulunmaz",
      "İki bağın eş olması onları 180° yapar",
      "O atomu iki ayrı atoma dönüşür",
      "Açısal molekülde bütün bağlar iyonik olur",
    ],
    0,
    "Eş büyüklük ile 180° karşıtlığı aynı veri mi?",
    "Açısal düzende iki eş okun yanal payları gider, O yönündeki payları toplanır. Sıfır toplam için yalnız eşlik yeterli değildir. 180° karşıtlık verilmemiştir; geometri bağın kovalent kimliğini değiştirmez.",
  ],
  [
    "BF₃ düzlemsel üçgen ve üç eş dipolü 120° aralıklı; NH₃ üçgen piramit ve üç N–H dipolünün N yönünde pozitif payı var. Doğru sınıflama hangisidir?",
    [
      "İkisi de apolar",
      "BF₃ polar, NH₃ apolar",
      "İkisi de polar",
      "BF₃ apolar, NH₃ polar",
      "Üç bağ içerdiğinden kararları her zaman aynıdır",
    ],
    3,
    "Üç bağın aynı düzlemde olup olmadığını kontrol et.",
    "BF₃’te eş üç vektör aynı düzlemde 120° ile dengelenir. NH₃ piramidinde N yönündeki üç pozitif pay sıfır olamaz. Bağ sayısı benzer olsa da yalnız çift ve gerçek geometri farklıdır.",
  ],
  [
    "CH₄ ve CH₃Cl’de merkez C dört yüzlü düzen yapıyor ve yalnız çift taşımıyor. CH₄’ün dört bağı eş; CH₃Cl’de C–Cl etkisi C–H etkilerinden farklıdır. Hangi yargı doğrudur?",
    [
      "Yalnız çift yokluğu ikisini de zorunlu apolar yapar",
      "Dört yüzlüde tüm bağlar 180° karşı karşıyadır",
      "CH₄ mutlaka polar, CH₃Cl apolardır",
      "Bağlar kovalentse molekül polarlığı tanımsızdır",
      "CH₄’ün eş yönleri dengelenir; CH₃Cl’de eşdeğer olmayan Cl köşesi net etki bırakır",
    ],
    4,
    "Aynı şekil adı dört bağın eş olduğunu da veriyor mu?",
    "CH₄’te dört eş bağın uzaydaki toplamı sıfırdır. CH₃Cl’de bir köşe değiştiği için bu eşdeğerlik yoktur ve molekül polardır. Merkezde yalnız çift olmaması yeterli kural değildir; dört yüzlü bir düzlem artısı değildir.",
  ],
  [
    "Bir öğretim modelinde yalnız iki dipol vektörü var: sağa 5 birim ve sola 2 birim. Net vektör hangisidir?",
    ["Sıfır", "Sağa 3 birim", "Sola 3 birim", "Sağa 7 birim", "Sola 7 birim"],
    1,
    "Sağı pozitif seçip iki işaretli değeri topla.",
    "5+(−2)=+3 olduğundan sağa 3 birim kalır. Zıt yönler ancak büyüklükleri eşitse sıfırlanır. 7 sonucu yön işaretini yok sayar; sola 3 ise büyük vektörün yönünü ters çevirmektir. Bu sayılar model birimidir, ölçülmüş molekül dipolü değildir.",
  ],
  [
    "Bir düzlemde 120° aralıklı üç ok var. Yukarı yönelen ok 3 birim; diğer iki okun her biri 2 birim ve her birinin düşey bileşeni aşağı 1 birimdir. Yatay bileşenleri eş ve zıttır. Net vektör nedir?",
    [
      "Yukarı 1 birim",
      "Aşağı 1 birim",
      "Sıfır",
      "Yukarı 7 birim",
      "Sağa 1 birim",
    ],
    0,
    "Yatayları götürdükten sonra düşey bileşenleri topla.",
    "Yatay toplam sıfırdır; düşey toplam 3−1−1=+1, yani yukarı 1 birim kalır. 120° aralık tek başına sıfır vermez; üç büyüklük eş olmalıdır. 7 sonucu yönleri yok sayar; aşağı 1 işareti ters çevirir.",
  ],
  [
    "CO₂ ve HCN doğrusal veriliyor. CO₂’de iki eş C=O dipolü zıt; HCN’de H→C ve C→N dipolleri aynı genel doğrultuyu destekliyor. Hangisi doğrudur?",
    [
      "İkisi de doğrusal olduğundan apolardır",
      "HCN apolar, CO₂ polar",
      "İki farklı dış atom her koşulda eş dipol demektir",
      "CO₂ apolar, HCN polar",
      "Bağ mertebesi tek başına net dipolü sıfırlar",
    ],
    3,
    "Şeklin yanında eşlik ve yön bilgisini de kullan.",
    "CO₂’de eş-zıt etkiler sıfırlanır. HCN’de verilen iki etki N tarafını destekler, sıfır kalıcı dipol yoktur. Doğrusal geometri uçları eşdeğer yapmaz; tek/üçlü bağ sayısı da bu yön hesabının yerine geçmez.",
  ],
  [
    "OF₂’de O merkezde iki F’ye tek bağla bağlı, iki yalnız çift taşıyor; atom geometrisi açısal. F daha elektronegatif ve iki O–F dipolü eş. Molekül hakkında uygun yorum hangisidir?",
    [
      "Dış atomlar aynı olduğu için kesin apolardır",
      "Açısal iki F yönünde ortak bileşen kaldığı için polardır",
      "F–O–F yazımı zorunlu 180° gösterir",
      "İki yalnız çift O’yu iyonik kristale dönüştürür",
      "Dipoller O’ya yönelmek zorundadır",
    ],
    1,
    "Dipol uçlarını elektronegatifliğe, bileşkeyi açıya göre belirle.",
    "Dipoller O’dan F’lere yönelir. Açısal iki eş yön zıt olmadığından F uçları tarafındaki ortak pay kalır; OF₂ polardır. İki yalnız çift geometriyi açıklar; aynı dış atom veya düz yazım 180° karşıtlık sağlamaz.",
  ],
  [
    "Nötr bir XY₂ molekülünün iki X–Y bağı eş ve polar olarak veriliyor; bağlantı X merkezde, ama bağ açısı/yalnız çift bilgisi verilmiyor. Yalnız bu verilerle hangi sonuç savunulabilir?",
    [
      "Molekül zorunlu apolardır",
      "Molekül zorunlu polardır",
      "Bağlar aslında apolar olmalıdır",
      "XY₂ iyonik kristaldir",
      "Molekül dipolünü kesin belirlemek için geometri bilgisi de gerekir",
    ],
    4,
    "Doğrusal ve açısal iki örneğin bu verileri birlikte sağlayıp sağlamadığını düşün.",
    "Eş polar iki bağ doğrusal-zıt olabilir ve sıfır verebilir; açısal olabilir ve net etki bırakabilir. Açı veya geometriye götüren ek bilgi olmadan tek sonuç yoktur. Formül ve bağ eşliği geometriyi her tür için tek başına belirlemez.",
  ],
  [
    "CCl₄’ün dört eş C–Cl bağı dört yüzlü düzende dengeleniyor. Bu maddenin molekül ve moleküller arası etkileşimi için hangisi doğrudur?",
    [
      "Apolar olduğu için elektron içermez",
      "Kalıcı dipol sıfırsa moleküller birbirini hiçbir yolla çekmez",
      "Molekül apolardır; anlık dipollerle London etkileşimi bulunabilir",
      "C–Cl bağlarının hepsi iyoniktir",
      "Dört yüzlü görünümü döndürmek molekülü polar yapar",
    ],
    2,
    "Kalıcı net dipolün sıfır olması ile bütün elektron etkilerinin yokluğunu ayır.",
    "Dört eş C–Cl dipolünün dengesi kalıcı net dipolü sıfırlar. Elektron dağılımındaki anlık değişimler London etkileşimine izin verir. Bağlar polar kovalent kalır; molekülü döndürmek sınıfını değiştirmez. Kalıcı dipol yokluğu hiç etkileşim olmadığı anlamına gelmez.",
  ],
];

function makeQuestions(id: string, items: Item[]): Question[] {
  return items.map(([prompt, options, answer, hint, explanation], i) => ({
    id: `f093-chem-${id}-${i + 1}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: id,
  }));
}
export const forge093ChemistryGuides: LessonGuide[] = [
  covalentGuide,
  molecularGuide,
];
export const forge093ChemistryTopics: Record<string, string> = {
  "kovalent-bag-polar-apolar": "detail-155",
  "molekullerde-polarlik-apolarlik": "detail-156",
};
export const forge093ChemistryLessons: Lesson[] = forge093ChemistryGuides.map(
  (guide, i) => ({
    id: guide.id,
    subjectId: "tyt-kimya",
    title: txt(
      i === 0
        ? "Kovalent bağ: ortaklaşma ve bağ kutupluluğu"
        : "Moleküllerde polarlık: geometri ve dipol dengesi",
    ),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((section) => ({
      title: txt(section.title),
      text: txt(section.paragraphs.join("\n\n")),
    })),
    source: txt(guide.source),
    tags: [guide.id, "kaynakli-anlatim"],
    questions: makeQuestions(
      i === 0 ? "cov" : "mol",
      i === 0 ? covalentQuestions : molecularQuestions,
    ),
  }),
);
