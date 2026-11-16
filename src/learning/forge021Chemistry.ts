import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const within021 = (n: number, low: number, high: number) =>
  Number.isFinite(n) && n >= low && n <= high;
export const thermalChoices021 = {
  endo: "Isı alır",
  exo: "Isı verir",
} as const;
export const thermalTemperatures021 = [10, 25, 40] as const;
/** Supplied fictional MX teaching table, not measured constants of a named real salt. */
export function solubilityFactors021(
  thermal: keyof typeof thermalChoices021,
  temperature: number,
  common: number,
  amount: number,
  volume: number,
) {
  if (
    !Object.hasOwn(thermalChoices021, thermal) ||
    !thermalTemperatures021.includes(temperature as 10 | 25 | 40) ||
    !within021(common, 0, 0.1) ||
    !within021(amount, 0, 0.12) ||
    !within021(volume, 0.25, 2)
  )
    throw new RangeError("SOLUBILITY021_SCOPE");
  const table = thermalTemperatures021.map((t, i) => ({
    temperature: t,
    k: (thermal === "endo" ? [1, 4, 9] : [9, 4, 1])[i] * 1e-4,
  }));
  const k = table.find((row) => row.temperature === temperature)!.k;
  const saturation = (2 * k) / (Math.hypot(common, 2 * Math.sqrt(k)) + common);
  const capacity = saturation * volume;
  const dissolved = Math.min(amount, capacity),
    solid = Math.max(0, amount - dissolved);
  const actual = dissolved / volume,
    mIon = common + actual,
    xIon = actual;
  return {
    thermal,
    temperature,
    table,
    k,
    common,
    amount,
    volume,
    saturation,
    capacity,
    dissolved,
    solid,
    actual,
    mIon,
    xIon,
    spectator: common,
    quotient: mIon * xIon,
    saturated: amount >= capacity,
    phase:
      solid > 0
        ? ("solid" as const)
        : amount === capacity
          ? ("limit" as const)
          : ("unsaturated" as const),
    mInventory: common * volume + dissolved + solid,
    xInventory: dissolved + solid,
    chargeResidual: mIon - xIon - common,
    assumptions:
      "Temsilî MX tuzu; ideal derişim, sabit son hacim, ek asit-baz ya da kompleks tepkimesi yok. Ortak M⁺, aynı derişimde Y⁻ seyircisiyle eklenir.",
  };
}

export type Species021 = {
  label: string;
  charge: number;
  atoms: Record<string, number>;
};
export const redoxSpecies021: Record<string, Species021> = {
  perm: { label: "MnO₄⁻", charge: -1, atoms: { Mn: 1, O: 4 } },
  dich: { label: "Cr₂O₇²⁻", charge: -2, atoms: { Cr: 2, O: 7 } },
  proton: { label: "H⁺", charge: 1, atoms: { H: 1 } },
  water: { label: "H₂O", charge: 0, atoms: { H: 2, O: 1 } },
  hydroxide: { label: "OH⁻", charge: -1, atoms: { O: 1, H: 1 } },
  mn: { label: "Mn²⁺", charge: 2, atoms: { Mn: 1 } },
  cr: { label: "Cr³⁺", charge: 3, atoms: { Cr: 1 } },
  dioxide: { label: "MnO₂", charge: 0, atoms: { Mn: 1, O: 2 } },
  ferrous: { label: "Fe²⁺", charge: 2, atoms: { Fe: 1 } },
  ferric: { label: "Fe³⁺", charge: 3, atoms: { Fe: 1 } },
  sulfite: { label: "SO₃²⁻", charge: -2, atoms: { S: 1, O: 3 } },
  sulfate: { label: "SO₄²⁻", charge: -2, atoms: { S: 1, O: 4 } },
};
export type ChemicalTerm021 = { id: string; coefficient: number };
type Half021 = {
  left: readonly (readonly [string, number])[];
  right: readonly (readonly [string, number])[];
  electrons: number;
};
export const redoxFamilies021 = {
  mnAcid: {
    label: "Asitte Mn ve Fe",
    medium: "Asidik ortam",
    reductionLabel: "Mn: +7 → +2",
    oxidationLabel: "Fe: +2 → +3",
    reduction: {
      left: [
        ["perm", 1],
        ["proton", 8],
      ],
      right: [
        ["mn", 1],
        ["water", 4],
      ],
      electrons: 5,
    },
    oxidation: { left: [["ferrous", 1]], right: [["ferric", 1]], electrons: 1 },
  },
  crAcid: {
    label: "Asitte Cr ve Fe",
    medium: "Asidik ortam",
    reductionLabel: "Cr: +6 → +3",
    oxidationLabel: "Fe: +2 → +3",
    reduction: {
      left: [
        ["dich", 1],
        ["proton", 14],
      ],
      right: [
        ["cr", 2],
        ["water", 7],
      ],
      electrons: 6,
    },
    oxidation: { left: [["ferrous", 1]], right: [["ferric", 1]], electrons: 1 },
  },
  mnBase: {
    label: "Bazda Mn ve S",
    medium: "Bazik ortam",
    reductionLabel: "Mn: +7 → +4",
    oxidationLabel: "S: +4 → +6",
    reduction: {
      left: [
        ["perm", 1],
        ["water", 2],
      ],
      right: [
        ["dioxide", 1],
        ["hydroxide", 4],
      ],
      electrons: 3,
    },
    oxidation: {
      left: [
        ["sulfite", 1],
        ["hydroxide", 2],
      ],
      right: [
        ["sulfate", 1],
        ["water", 1],
      ],
      electrons: 2,
    },
  },
} as const;
function gcd021(a: number, b: number): number {
  while (b) {
    const old = b;
    b = a % b;
    a = old;
  }
  return a;
}
export function redoxLedger021(
  family: keyof typeof redoxFamilies021,
  reduction: number,
  oxidation: number,
) {
  if (
    !Object.hasOwn(redoxFamilies021, family) ||
    !Number.isInteger(reduction) ||
    !Number.isInteger(oxidation) ||
    !within021(reduction, 0, 12) ||
    !within021(oxidation, 0, 12)
  )
    throw new RangeError("REDOX021_SCOPE");
  const data = redoxFamilies021[family],
    red = data.reduction as Half021,
    ox = data.oxidation as Half021;
  const left: Record<string, number> = Object.create(null),
    right: Record<string, number> = Object.create(null);
  const add = (
    target: Record<string, number>,
    terms: Half021["left"],
    times: number,
  ) => {
    for (const [id, coefficient] of terms)
      target[id] = (target[id] || 0) + coefficient * times;
  };
  add(left, red.left, reduction);
  add(right, red.right, reduction);
  add(left, ox.left, oxidation);
  add(right, ox.right, oxidation);
  for (const id of Object.keys(redoxSpecies021)) {
    const shared = Math.min(left[id] || 0, right[id] || 0);
    if (shared) {
      left[id] -= shared;
      right[id] -= shared;
    }
  }
  const terms = (row: Record<string, number>): ChemicalTerm021[] =>
    Object.entries(row)
      .filter(([, n]) => n > 0)
      .map(([id, coefficient]) => ({ id, coefficient }));
  const l = terms(left),
    r = terms(right);
  const atomTotal = (row: ChemicalTerm021[], atom: string) =>
    row.reduce(
      (n, t) => n + t.coefficient * (redoxSpecies021[t.id].atoms[atom] || 0),
      0,
    );
  const atoms = ["Mn", "Cr", "Fe", "S", "O", "H"]
    .map((symbol) => ({
      symbol,
      left: atomTotal(l, symbol),
      right: atomTotal(r, symbol),
    }))
    .filter((a) => a.left || a.right);
  const charge = (row: ChemicalTerm021[]) =>
    row.reduce((n, t) => n + t.coefficient * redoxSpecies021[t.id].charge, 0);
  const received = red.electrons * reduction,
    given = ox.electrons * oxidation;
  const common = gcd021(red.electrons, ox.electrons);
  const minimumReduction = ox.electrons / common,
    minimumOxidation = red.electrons / common;
  const complete = reduction > 0 && oxidation > 0 && received === given;
  return {
    family,
    data,
    reduction,
    oxidation,
    left: l,
    right: r,
    atoms,
    chargeLeft: charge(l),
    chargeRight: charge(r),
    received,
    given,
    electronResidual: received - given,
    complete,
    minimal:
      complete &&
      reduction === minimumReduction &&
      oxidation === minimumOxidation,
    minimumReduction,
    minimumOxidation,
    assumption:
      "Yalnız seçilen, bütünü dengeli iki yarı tepkime toplanır. Elektronlar kimyasal net denklemden çıkarılır; eşit olmayan e⁻ bütçesi tam bir net tepkime değildir.",
  };
}

export const activityCouples021 = {
  Zn: { metal: "Zn", ion: "Zn²⁺", charge: 2, millivolts: -763 },
  Cr: { metal: "Cr", ion: "Cr³⁺", charge: 3, millivolts: -744 },
  Pb: { metal: "Pb", ion: "Pb²⁺", charge: 2, millivolts: -126 },
  Cu: { metal: "Cu", ion: "Cu²⁺", charge: 2, millivolts: 337 },
  Ag: { metal: "Ag", ion: "Ag⁺", charge: 1, millivolts: 799 },
  H: { metal: "H₂", ion: "H⁺", charge: 2, millivolts: 0 },
} as const;
export type Metal021 = Exclude<keyof typeof activityCouples021, "H">;
export function activity021(
  donor: Metal021,
  acceptor: keyof typeof activityCouples021,
) {
  if (
    !Object.hasOwn(activityCouples021, donor) ||
    donor === ("H" as Metal021) ||
    !Object.hasOwn(activityCouples021, acceptor)
  )
    throw new RangeError("ACTIVITY021_SCOPE");
  const a = activityCouples021[donor],
    b = activityCouples021[acceptor];
  const electrons = (a.charge * b.charge) / gcd021(a.charge, b.charge);
  const donorCount = electrons / a.charge,
    acceptorCount = electrons / b.charge;
  const deltaMillivolts = b.millivolts - a.millivolts;
  return {
    donor,
    acceptor,
    a,
    b,
    electrons,
    donorCount,
    acceptorIonCount: acceptor === "H" ? 2 * acceptorCount : acceptorCount,
    productCount: acceptorCount,
    deltaMillivolts,
    volts: deltaMillivolts / 1000,
    direction:
      deltaMillivolts > 0
        ? ("forward" as const)
        : deltaMillivolts < 0
          ? ("reverse" as const)
          : ("same" as const),
    chargeLeft: electrons,
    chargeRight: electrons,
    assumption:
      "Kaynakta verilen 25 °C standart çift değerleri; iyon etkinlikleri 1, gaz varsa standart basınç. Yan tepkime ve yüzey engeli yok varsayılır. İşaret, yazılan yöndeki standart eğilimi verir; hız veya gözlenen miktarı ölçmez.",
  };
}

const guidesData021: LessonGuide[] = [
  {
    id: "cozunurluk-faktorleri",
    minutes: 95,
    objectives: [
      "Sıcaklıkla Kç değişimini, aynı sıcaklıkta ortak iyonla s değişiminden ayır.",
      "Son hacim, tuzun formülü ve kalan katı ile gerçek derişimi hesapla.",
      "Denge miktarını, çözünme hızını ve modelin ek tepkime sınırlarını ayır.",
    ],
    sections: [
      {
        title: "Çözünen miktarı ve çözünürlük aynı sayı değildir",
        paragraphs: [
          "Çözünürlük, seçilen sıcaklık ve çözücüde doygun çözelti için bir sınır bilgisidir. Molar çözünürlük s, bir litre doygun çözeltide çözünen tuzun mol sayısını verir. Bir kaba az tuz koyduğunda hepsi çözünse bile çözelti bu sınıra ulaşmayabilir. Kaba konan toplam molü doğrudan s sanmak bu ayrımı kaybettirir.",
          "MX(k) ⇌ M⁺(suda)+X⁻(suda) örneğinde katıyla birlikte duran doygun çözelti dinamiktir: çözünme ve çökelme sürerken hızlar eşittir. Aynı sıcaklıkta daha çok katı eklemek, katı faz zaten varsa doygun derişimi artırmaz. Katı yoksa da çözelti tam sınırda doygun olabilir; katı görülmemesi tek başına doymamışlık kanıtı değildir.",
        ],
      },
      {
        title: "Kç bağıntısını iyonlardan kur",
        paragraphs: [
          "Az çözünen iyonik bir katının çözünme dengesinde saf katının etkinliği sabit kabul edilir; Kç bağıntısına katı miktarı yazılmaz. İdeal seyreltik ders yaklaşımında MX için Kç≈[M⁺][X⁻] olur. Asıl termodinamik sabit etkinliklerle tanımlanır; derişim çarpımı bu koşullarda kullanılan yaklaşımdır.",
          "Formül değişince bağıntı da değişir. MX₂(k) ⇌ M²⁺+2 X⁻ saf suda s ve 2s iyon derişimleri verir; Kç≈s(2s)²=4s³ olur. MX için s² olan ifadeyi MX₂ için kullanma. İki farklı formüldeki tuzu yalnız Kç büyüklüğüyle sıralamak güvenilir bir çözünürlük karşılaştırması değildir.",
        ],
      },
      {
        title: "Isı alan çözünmeyi dengeyle yorumla",
        paragraphs: [
          "Çözünme yönünde ısı alınan bir olay, MX(k)+ısı ⇌ iyonlar biçiminde düşünülebilir. Diğer koşullar sabitken sıcaklık artışı çözünme yönünü destekler; ilgili sıcaklık aralığında Kç ve doygun çözünürlük artar. Bu sonuç, sıcaklığın denge sabitini değiştirmesidir; yalnız karıştırma hızının artmasına indirgenmez.",
          "Bir deney tablosunda aynı tuzun Kç değeri 10 °C’de 1·10⁻⁴, 40 °C’de 9·10⁻⁴ verilirse 1:1 ve ideal saf su koşulunda s değerleri 0,01 ve 0,03 mol/L olur. Bu sayılar soruda verilmiş veridir; bütün tuzların böyle bir tablo izlediği veya aradaki Kç değerlerinin doğrusal olduğu söylenmez.",
        ],
      },
      {
        title: "Isı veren çözünmede yön ters olabilir",
        paragraphs: [
          "Çözünme ısı veriyorsa MX(k) ⇌ iyonlar+ısı yazımı kullanılır. Sıcaklık artışı bu dengeyi katı tarafına yöneltebilir; doygun çözünürlük ve Kç azalır. Birçok katının sıcak suda daha çok çözünmesi, bütün katılar için geçerli bir yasa değildir. Önce olayın ısı yönünü veya gerçek çözünürlük tablosunu oku.",
          "Soğutulan çözelti için de aynı kontrol gerekir. Isı alan çözünmede soğuma kristal ayırabilirken ısı veren bir çözünmede aynı sonuç zorunlu değildir. Kaynaktaki eğrinin yukarı ya da aşağı gitmesini yalnız çizginin şekli olarak değil, verilen sıcaklıklardaki doygunluk sınırının değişmesi olarak açıkla.",
        ],
      },
      {
        title: "Kristal miktarında hacim ve toplam molü koru",
        paragraphs: [
          "Doygun bir çözelti başka sıcaklığa getirildiğinde yeni doygunluk kapasitesi s_yeni·V ile bulunur. Başlangıçta çözünmüş mol bu kapasiteden fazlaysa ve uygun denge kuruluyorsa fark katı olarak ayrılabilir. Hacmin sabit tutulduğu açıkça belirtilmelidir; buharlaşma veya hacim değişimi varsa yeni hacim hesaba girer.",
          "Örneğin 2 L çözeltide 0,06 mol tuz çözünmüşken yeni sıcaklıkta s=0,01 mol/L olsun. En çok 0,02 mol çözünmüş kalır; başka kayıp yoksa 0,04 mol katı ayrılır. Önce mol bütçesini kur, sonra istenirse mol kütlesiyle grama çevir. Çözünürlük farkını tek başına gram diye yazma.",
        ],
      },
      {
        title: "Ortak iyon hangi ürünü dışarıdan getirir?",
        paragraphs: [
          "MX çözünürken oluşan M⁺ veya X⁻, başka bir kaynaktan da eklenirse ortak iyon vardır. Örneğin MY tuzu tam ayrışıp M⁺ ve seyirci Y⁻ veriyorsa MX dengesinin M⁺ ürününü artırır. Sabit sıcaklıkta ve ek tepkime olmayan ideal modelde sistem daha az MX çözerek dengeyi sağlar.",
          "Burada Kç değişmez, tuzun bu ortamdaki molar çözünürlüğü değişir. İki sayıyı ayrı kaydet: ortamın toplam M⁺ derişimi artabilirken MX’den gelen X⁻ derişimi azalır. Ortak iyon etkisi, çözeltideki bütün iyonların mutlaka azaldığı anlamına gelmez; hangi iyonun dışarıdan eklendiği belirleyicidir.",
        ],
      },
      {
        title: "Tuzun kendi katkısını baştan silme",
        paragraphs: [
          "Başlangıçta c mol/L ortak M⁺ bulunan çözeltiye MX katısı eklenirse denge derişimleri [M⁺]=c+s ve [X⁻]=s olur. Hacim sabit, yan tepkime yok ve yeterli katı varken Kç=(c+s)s çözülür. Ortak iyonu sağlayan tuzun seyirci iyonu da yük dengesini tamamlar; denklemde görünmemesi yok olduğu anlamına gelmez.",
          "s, c’ye göre gerçekten küçükse c+s≈c kullanılabilir ve s≈Kç/c bulunur. İhmal kararını sonuçtan sonra s/c oranıyla denetle; c=0 iken bu bölme yapılamaz. c çok küçük olduğunda tam ikinci derece bağıntı gerekir. Etkileşimli model, çıkarma kaynaklı sayısal kaybı azaltan eşdeğer pozitif kökle tam bağıntıyı çözer.",
        ],
      },
      {
        title: "Ortak iyonun katsayısını ve son hacmi say",
        paragraphs: [
          "0,01 M MgX₂ tam ayrışıyorsa X⁻ katkısı 0,02 M olur. Tuzun molaritesini iyon derişimi yerine aynen koymak iki kat hataya yol açar. MX₂, M₂X₃ gibi formüllerde çözünürlük bağıntısının üs ve katsayıları da kendi denklemlerinden gelmelidir; bütün sorular tek bir Kç/c kalıbına indirgenmez.",
          "İki çözelti karıştırıldığında ilk kontrol toplam hacimdir. Hacimlerin toplandığı verilen bir soruda 0,02 mol iyon toplam 2 L’deyse son katkı 0,01 M’dır. Tepkime veya denge başlamadan önceki bu derişimle Q çarpımı kurulur. Eski kaptaki molariteyi hacim iki katına çıkmışken korumak aynı sistemi anlatmaz.",
        ],
      },
      {
        title: "Q, Kç ve eldeki katı birlikte okunur",
        paragraphs: [
          "Başlangıç veya anlık iyon çarpımı Q, aynı sıcaklıktaki Kç ile karşılaştırılır. Q<Kç ise ortam doygunluk sınırının altındadır; katı varsa bir bölümü çözünebilir. Q>Kç ise uygun koşul ve süre içinde çökelme yönü desteklenir. Q=Kç sınırda denge koşuludur; bu eşitlik çökelmenin durduğu donmuş bir sistem demek değildir.",
          "Eldeki katı azsa Q<Kç olduğu hâlde bütün katı çözünüp bitebilir. Bu durumda denge kapasitesine ulaşmak için eksik tuz kendiliğinden oluşmaz. Modelde doygunluk kapasitesiyle gerçek çözünmüş miktar ayrı gösterilir; kalan katı, toplam tuz molü eksi çözünmüş moldür. Hesapta olmayan katı miktarını çizime eklemeyiz.",
        ],
      },
      {
        title: "Su eklemek derişimi ve çözünen molü farklı etkiler",
        paragraphs: [
          "Aynı sıcaklıkta katısıyla dengede olan çözeltiye saf su eklenirse iyonlar önce seyrelir; Q düşer ve bir miktar daha katı çözünebilir. Yeterli katı kaldığında saf su ortamındaki son doygun derişim eski s değerine döner, fakat daha büyük hacimde çözünmüş mol artmıştır. Bu, s’nin artması değil kapasitenin V ile büyümesidir.",
          "Bütün katı daha önce bitmişse veya ek suyla biterse son çözelti doymamış kalabilir. Ortak iyon molü sabitken su eklemek c=n_ortak/V değerini de düşürür; bu ikinci etkiyi ayrıca izle. Kç sabit sıcaklıkta değişmezken gerçek derişimler ve hangi fazın kaldığı birlikte değişebilir.",
        ],
      },
      {
        title: "Hız ile dengeyi ayrı deney soruları yap",
        paragraphs: [
          "Toz hâline getirme ve karıştırma, çözünme koşullarına bağlı olarak dengeye ulaşmayı hızlandırabilir. Aynı sıcaklık, çözücü ve katı faz için yalnız tanecikleri küçültmek doygun çözünürlüğü yükselten genel bir yöntem değildir. Sıcaklığın hem hızı hem dengeyi etkileyebilmesi, bu iki kavramın aynı olduğu anlamına gelmez.",
          "Bir deneyde eşit süre sonunda daha çok madde çözündüğünü görmek, tek başına daha büyük denge çözünürlüğü göstermez; ilk kap henüz doymamış olabilir. Sonuç için yeterli zaman, sıcaklık ve katı kalıp kalmadığı denetlenir. Kaynakta çözücü ekleme başlığını gördüğünde de hacim ve ortak iyon derişimi değişiyorsa bu denge etkilerini ayrıca hesaba kat.",
        ],
      },
      {
        title: "Çözücü ve basınç için verilen sistemi tanı",
        paragraphs: [
          "İyon–dipol, hidrojen bağı ve diğer etkileşimler bir maddenin belirli çözücüde çözünmesini anlamaya yardım eder. Benzer benzeri çözer sözü bir ilk kestirimdir; tek başına her bileşiğin sayısal çözünürlüğünü vermez. Su birçok maddeyi çözer ama bütün maddeleri sınırsız çözen bir çözücü değildir.",
          "Olağan basınç aralığında katı ve sıvıların çözünürlüğüne basınç etkisi çoğu okul hesabında ihmal edilir. Gazlarda ise sabit sıcaklıkta, seyreltik ve tepkimesiz koşullarda gazın kısmi basıncı arttıkça çözünme artabilir. Toplam basınçla kısmi basıncı, gaz davranışıyla iyonik katı dengesini karıştırma; gazların ısıl davranışını da verilmiş koşul yerine daima sözüyle genelleme.",
        ],
      },
      {
        title: "Asit veya kompleks varsa serbest iyonu izle",
        paragraphs: [
          "Karbonat gibi bir anyon asitle tepkimeye girip serbest hâlden uzaklaşırsa ilgili tuz daha fazla çözünebilir. Bir ligand metal iyonunu kompleks içinde tutarsa toplam çözünmüş metal artarken serbest metal iyonu azalabilir. Kç bağıntısı serbest iyon etkinliklerine aittir; toplam analitik derişim her durumda aynı nicelik değildir.",
          "Bu nedenle saf suda çözünürlük her olası çözücü ve pH koşulundan büyüktür denemez. Ortak iyonun azaltıcı etkisi, ek reaksiyon bulunmadığı karşılaştırmada kullanılır. Sayısal pH veya kompleks hesabı isteniyorsa o tepkimenin denge verileri de gerekir; yalnız Kç ile verilmemiş ikinci dengeyi uydurup kesin sayı üretme.",
        ],
      },
      {
        title: "Bir eğilimi veri ve korunumla savun",
        paragraphs: [
          "Isı alan bir çözünme, tek başına çözünemez demek değildir; uygun koşullarda dağılma ve çevreyle birlikte değerlendirilen enerji–entropi dengesi çözünmeyi destekleyebilir. Isı veren her katının da sınırsız çözünmesi gerekmez. Gerçek denge bilgisi verilen sıcaklıktaki deneysel Kç veya çözünürlük verisiyle kurulur.",
          "Son çözümde dört satır tut: sıcaklık ve Kç, denklemin formülü, son hacimde iyon katkıları, toplam tuz ve kalan katı. İki değişken aynı anda ters etkiler yaratıyorsa yalnız nitel yönlerle kesin sıralama yapma; gerekli sayısal veriyi iste. Keşifte tahmin ve gerekçen saklanır, ancak modelle oynamak doğru soru, XP veya konu tamamlanması oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Isı değişince ayrılan kristali hesapla",
        prompt:
          "Temsilî MX tuzu 40 °C’de Kç=9·10⁻⁴, 10 °C’de Kç=1·10⁻⁴ değerlerine sahip. 40 °C’de 2 L saf su ortamındaki doygun çözeltide 0,06 mol çözünmüş MX var. Hacim 2 L kalacak biçimde 10 °C’ye soğutulup denge kuruluyor. Başka tepkime yok. Kaç mol MX ayrılır?",
        strategy: "Önce her sıcaklıkta s=√Kç; sonra yeni hacim kapasitesi.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "MX için 40 °C’de s=√(9·10⁻⁴)=0,03 mol/L; 2 L’de 0,06 mol bilgisiyle uyumludur.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "10 °C’de s=√(1·10⁻⁴)=0,01 mol/L. Yeni çözünmüş kapasite 2×0,01=0,02 moldür.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Başlangıç 0,06 molün 0,02 molü çözünmüş kalır; 0,04 mol katı ayrılır. Toplam 0,02+0,04=0,06 mol korunur.",
          },
        ],
        answer: "0,04 mol MX katısı",
        check: "Denge sonunda [M⁺][X⁻]=0,01²=1·10⁻⁴ ve toplam tuz aynı.",
        pitfall:
          "Çözünürlük farkını hacimle çarpmadan doğrudan mol ya da gram sanmak.",
      },
      {
        title: "Ortak iyonu tam katkıyla çöz",
        prompt:
          "Bir sıcaklıkta MX için Kç=4·10⁻⁴. Başlangıçta 0,03 M M⁺ ve onu dengeleyen seyirci iyon içeren 1 L çözeltiye yeterince MX katısı konuyor. Hacim sabit, yan tepkime yok. s, [M⁺] ve [X⁻] nedir?",
        strategy: "Kç=(0,03+s)s; uygun pozitif kökü kullan.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Tuzdan s M M⁺ ve s M X⁻ gelir. Toplam [M⁺]=0,03+s, [X⁻]=s olduğundan s²+0,03s −0,0004=0 yazılır.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "Pozitif kök s=0,01 mol/L’dir; çünkü 0,01²+0,03×0,01=0,0004. Negatif kök fiziksel çözünürlük değildir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "[M⁺]=0,04 M, [X⁻]=0,01 M. Saf sudaki s=0,02 M iken tuzun çözünürlüğü yarıya inmiştir; ortak iyonun toplamı ise artmıştır.",
          },
        ],
        answer: "s=0,01 M; [M⁺]=0,04 M; [X⁻]=0,01 M",
        check:
          "0,04×0,01=4·10⁻⁴; tuzun katkısı ortak iyon yanında gelişigüzel ihmal edilmedi.",
        pitfall:
          "Kç/0,03 yaklaşımını denetlemeden kullanmak veya iki iyonun da azalacağını söylemek.",
      },
      {
        title: "İki ortak iyon veren kaynağı say",
        prompt:
          "MX tuzunun aynı sıcaklıkta Kç değeri 4·10⁻⁸. Tuz, 0,01 M MgX₂ içeren ve son hacmi sabit bir çözeltide dengeleniyor. MgX₂ tam ayrışıyor, başka tepkime yok, katı yeterli. Molar çözünürlüğü yaklaşık hesaplayıp ihmalini denetle.",
        strategy: "Önce MgX₂’den gelen X⁻ derişimi 0,02 M.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "MgX₂ her formül biriminde iki X⁻ verir. Denge [M⁺]=s, [X⁻]=0,02+s ve Kç=s(0,02+s) olur.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "s≪0,02 kabulüyle s≈4·10⁻⁸/0,02=2·10⁻⁶ M bulunur. Tam pozitif kök yaklaşık 1,9998·10⁻⁶ M’dır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Yaklaşık s/0,02=1·10⁻⁴, yani %0,01; ortak iyon katkısının yanında küçük olduğu doğrulanır. Kesinlik istenirse tam bağıntı kullanılır.",
          },
        ],
        answer: "s≈2·10⁻⁶ mol/L",
        check:
          "Yaklaşık derişimler çarpımı 2·10⁻⁶×0,020002≈4,0004·10⁻⁸; çok küçük yaklaşım farkı görünür.",
        pitfall: "MgX₂’nin 0,01 M değerini X⁻ için de 0,01 M sanmak.",
      },
      {
        title: "Bütün katı biterse doygunluk uydurma",
        prompt:
          "Sabit sıcaklıkta MX için Kç=4·10⁻⁴, ideal saf su ortamı ve hacim 1 L. Kaba yalnız 0,012 mol MX ekleniyor; başka tepkime yok. Sonra hacim saf suyla 2 L yapılıyor. İki durumda çözünmüş mol ve Q nedir?",
        strategy:
          "Önce kapasiteyi toplam stokla karşılaştır; gerçek s yerine n/V kullan.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Doygunluk sınırı √Kç=0,02 M; ilk 1 L kapasitesi 0,02 moldür. Stok 0,012 mol olduğundan hepsi çözünür ve katı kalmaz.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "İlk gerçek derişim 0,012 M, Q=0,012²=1,44·10⁻⁴<Kç. 2 L’de aynı 0,012 molün derişimi 0,006 M olur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Son Q=0,006²=3,6·10⁻⁵<Kç; iki durumda da çözelti doymamıştır. Doygunluk s değeri aynı sıcaklıkta 0,02 M kalırken gerçek derişim değişmiştir.",
          },
        ],
        answer:
          "Her iki durumda çözünmüş 0,012 mol; Q sırasıyla 1,44·10⁻⁴ ve 3,6·10⁻⁵",
        check:
          "Başlangıç stoku bütün adımlarda 0,012 mol; daha çok su eksik tuzu yaratmaz.",
        pitfall: "Katı kalmasa bile [M⁺]=[X⁻]=√Kç atamak.",
      },
    ],
    recall: [
      {
        prompt: "Sabit sıcaklıkta ortak iyon eklemek Kç’yi değiştirir mi?",
        answer:
          "Ek tepkime ve ideal olmayan etkinlik farkları dışlanan okul modelinde hayır; denge derişimleri ve tuzun çözünürlüğü değişir.",
      },
      {
        prompt: "Ortak iyon c ise MX’nin tam bağıntısı?",
        answer:
          "Yeterli katı ve sabit hacimde Kç=(c+s)s; s/c küçük değilse s silinmez.",
      },
      {
        prompt: "Hacim büyürken s sabit, çözünen mol artabilir mi?",
        answer: "Evet; sabit sıcaklıkta yeterli katı varken kapasite sV artar.",
      },
      {
        prompt:
          "Sıcaklığı ve ortak iyonu birlikte değiştiren iki ortam her zaman sıralanır mı?",
        answer:
          "Hayır; ters yönlü etkilerde Kç(T) ve son iyon derişimleri gibi sayısal veriler gerekebilir.",
      },
    ],
    source:
      "MEBİ AYT Kimya konu özetlerinin ilgili çözünürlük, redoks ve elektrot bölümleri; OGM ders sunuları ve Dersler Cepte; Aurelia metallerle asit-baz tepkimeleri kopya kâğıdı karşılaştırılarak hazırlanan özgün öğretim. Sayısal modeller belirtilen varsayımlarla sınırlıdır; sorular özgün öğretim sorularıdır.",
  },
  {
    id: "redoks-denklestirme",
    minutes: 110,
    objectives: [
      "Yükseltgenme basamağını gerçek iyon yükünden ayırarak elektron değişimini izle.",
      "Asidik ve bazik yarı tepkimeleri atom ve yük korunumu ile birleştir.",
      "En küçük katsayı, toplam elektron ve tepkimedeki madde rolünü ayrı denetle.",
    ],
    sections: [
      {
        title: "Yükseltgenme basamağı bir hesap dilidir",
        paragraphs: [
          "Tek atomlu bir iyonun yükseltgenme basamağı iyon yüküne eşittir: Fe²⁺ için +2, Cl⁻ için −1. Kovalent bağdaki atom için aynı sayı, bağ elektronlarını belirli kurala göre paylaştıran biçimsel bir hesaptır. Örneğin bir molekülde +3 yazılması, o atomun gerçekten üç elektron vermiş serbest +3 iyonu olduğunu tek başına göstermez.",
          "Bu dilin amacı farklı maddelerde aynı elementi izlemektir. Bir tepkimede bir elementin yükseltgenme basamağı artıyor, başka birinin azalıyor olabilir. Basamakların değişmesi redoksun ayırt edici işaretidir; yalnız bir maddenin suda iyonlarına ayrılması veya bir iyonun yer değiştirmesi bu değişimi zorunlu kılmaz.",
        ],
      },
      {
        title: "Element hâli ve toplam yükten başla",
        paragraphs: [
          "Element hâlindeki Fe, Zn, H₂, O₂ ve Cl₂ için yükseltgenme basamağı 0’dır. Bileşikte 1A metalleri okul kapsamındaki olağan iyonik bileşiklerde +1, 2A metalleri +2 alınır. Flor bileşiklerinde −1 olur. Çok atomlu iyonlarda ise tek tek atomların sayıyla ağırlıklı toplamı iyonun toplam yükünü vermelidir.",
          "Nötr bir bileşikte bu toplam 0’dır. SO₄²⁻ için oksijeni −2 aldığında x +4(−2)=−2 ve S=+6 bulunur. H₂SO₄’te 2(+1)+x +4(−2)=0 aynı sonucu verir. Yükün −2 veya 0 oluşu, atom sayılarının katsayılarını yok saymayı haklı çıkarmaz.",
        ],
      },
      {
        title: "Hidrojen ve oksijenin istisnalarını açık tut",
        paragraphs: [
          "Hidrojen çoğu ametal bileşiğinde +1 iken NaH ve CaH₂ gibi metal hidrürlerinde −1’dir. Oksijen çoğu oksitte −2, H₂O₂ gibi peroksitlerde −1 olur. OF₂’de flor −1 olduğu için oksijen +2 çıkar. KO₂ gibi süperoksitte iki oksijenin ortalama basamağı −1/2’dir; bu, her durumda tam sayı varsayımını sınırlar.",
          "Önce formülü ve bilinen iyonu tanı. CaO’da Ca=+2 iki elektronluk O=−2’yi, CaO₂’de aynı Ca iki O’nun toplamını −2 yaptığı için her O=−1’i gerektirir. Formüldeki alt indisler değiştiğinde aynı ezberi uygulamak yerine toplam yükü yeniden kur. İstisnayı bilmeden önce bütün oksijenleri −2 yazmak yanlış elektron hesabına taşınır.",
        ],
      },
      {
        title: "Çok atomlu iyonun içini ve dış katsayısını ayır",
        paragraphs: [
          "Cr₂O₇²⁻ için 2x +7(−2)=−2 yazılır; her Cr +6’dır. İyonun önüne 3 katsayısı koymak tek bir Cr atomunun basamağını +18 yapmaz, yalnız üç iyon ve toplam altı Cr atomu alındığını söyler. Kimyasal türün yükü ile denklemde taşınan toplam yük farklı düzeylerdir.",
          "(NH₄)₂SO₄ gibi bileşiklerde önce NH₄⁺ ve SO₄²⁻ iyonlarını ayırabilirsin. NH₄⁺ için x +4(+1)=+1’den N=−3; sülfatta S=+6 çıkar. Bileşiğin toplam nötr olması, her çok atomlu grubun tek başına da nötr olduğu anlamına gelmez. Bu ayrım, seyirci nitratın redoksta değişip değişmediğini de izlemeyi sağlar.",
        ],
      },
      {
        title: "Elektron veren yükseltgenir, alan indirgenir",
        paragraphs: [
          "Zn(k) → Zn²⁺+2 e⁻ yarı tepkimesinde metal elektron verir ve 0’dan +2’ye yükseltgenir. Cu²⁺+2 e⁻ → Cu(k) elektron alır ve +2’den 0’a indirgenir. Sayı doğrusunda artış ve azalışı takip etmek, adların benzerliğinden doğan karışıklığı azaltır.",
          "Bir kapalı redoks tepkimesinde verilen ve alınan elektronlar eşitlenmelidir; elektron stokunu yoktan üretip silemeyiz. Tam kimyasal net denklemde serbest elektron kalmaz. Yarı tepkimeyse bütün tepkimenin bir parçası olduğundan e⁻ içermesi doğrudur; iki gösterimin amaçları farklıdır.",
        ],
      },
      {
        title: "Madde rolüyle uğradığı değişimi eşleştir",
        paragraphs: [
          "Yükseltgen madde başka türden elektron aldıran değil, kendisi elektron alarak ötekinin yükseltgenmesini sağlayan türdür; kendisi indirgenir. İndirgen madde elektron verir ve kendisi yükseltgenir. Zn+Cu²⁺ → Zn²⁺+Cu için Zn indirgen, Cu²⁺ yükseltgendir.",
          "Fe+Sn²⁺ → Fe²⁺+Sn örneğinde de Fe elektron verdiği için indirgen, Sn²⁺ elektron aldığı için yükseltgendir. Yalnız metaller indirgendir veya bütün asitler yükseltgendir gibi bir madde sınıfı ezberi kurulmaz. Rol, o denklemdeki basamak değişimi ve karşı türle ilişkisinden anlaşılır.",
        ],
      },
      {
        title: "Redoks olan ve olmayan değişimleri ayır",
        paragraphs: [
          "Yanma ve paslanma gibi olaylarda basamak değişimini görebilirsin. Fe₂O₃+3 CO → 2 Fe +3 CO₂ denkleminde Fe +3’ten 0’a inerken C +2’den +4’e çıkar. Redoks mutlaka ortamdan oksijen gazı alınması demek değildir; Fe+Cu²⁺ gibi oksijensiz bir denklem de redokstur.",
          "HCl+NaOH → NaCl+H₂O nötralleşmesinde veya Ag⁺+Cl⁻ → AgCl çökelmesinde bu tür basamak değişimi yoktur. Çözeltide katı görülmesi, ısı çıkması ya da renk değişmesi tek başına redoks tanımı değildir. Önce aynı elementin giren ve üründeki basamağını karşılaştır; sonra gözlemi bu kimyasal açıklamayla bağla.",
        ],
      },
      {
        title: "Aynı tür iki farklı rol üstlenebilir",
        paragraphs: [
          "H₂O₂’de oksijen −1’dir. 2 H₂O₂ → 2 H₂O+O₂ ayrışmasında bir bölümü −2’ye inerken bir bölümü 0’a çıkar. Aynı başlangıç türünün hem indirgenip hem yükseltgenmesine uygun bir örnek olan bu süreçte de toplam elektron bütçesi korunur.",
          "Bu nedenle H₂O₂’yi her denklemde değişmeden yalnız yükseltgen diye etiketleme. SO₂ de partnerine ve ürününe göre farklı rol oynayabilir; seçili örnekte S +4’ten +6’ya çıkıyorsa indirgendir. Türün adına ezber rol vermek yerine verilen başlangıç–ürün çiftini izlemek daha güçlü bir yöntemdir.",
        ],
      },
      {
        title: "Bir atomun değişimini atom sayısıyla çarp",
        paragraphs: [
          "Dikromattaki iki Cr, +6’dan +3’e inerse her atom 3, iyonun tamamı 6 elektron alır. Yalnız 6−3=3 yazıp iyon başına elektron sayısını 3 seçmek bir Cr atomunu kaybettirir. Fe²⁺ → Fe³⁺ için ise her Fe 1 elektron verir.",
          "Elektronları eşitlemek için yarı tepkimenin yalnız e⁻ terimine değil bütün terimlerine aynı katsayı uygulanır. Bir dikromat yarısı altı Fe yarısıyla eşleşir. Elektron katsayısıyla kimyasal alt indisi değiştirme: Cr₂O₇²⁻’yi başka formüle çevirmek denkleştirme değil farklı madde seçmek olur.",
        ],
      },
      {
        title: "Moleküler denklemi aşamalı kur",
        paragraphs: [
          "Önce basamağı değişen elementleri, atom başına değişimi ve o türdeki atom sayısını belirle. Ardından elektron toplamlarını ortak katta eşitle; bu katsayıları ilgili türlere uygula. Değişmeyen elementleri, hidrojen ve oksijeni verilen türlerin içinde dengeleyerek tamamla. Sonra bütün atomları tekrar say.",
          "Örneğin C+HNO₃ → CO₂+NO+H₂O iskeletinde C 4 elektron verir, N 3 elektron alır. En küçük ortak 12 için C’ye 3, NO’ya 4 gerekir; bu N sayısı HNO₃’ü 4 yapar. Hidrojen ve oksijen tamamlanınca 3 C+4 HNO₃ → 3 CO₂+4 NO+2 H₂O bulunur. Hesabı bir katsayıyı tahmin etmekten çok korunum zinciri olarak oku.",
        ],
      },
      {
        title: "Asidik yarı tepkimede su, H⁺ ve elektron",
        paragraphs: [
          "İyonik yarı tepkimede önce O ve H dışındaki atomları dengele. Asidik ortamda eksik oksijeni H₂O, eksik hidrojeni H⁺ ile tamamla; en son toplam yükü e⁻ ile eşitle. Bu yardımcı türler ortamın koşuluna bağlıdır; dengelenmeyen bir denklemde rastgele her iki tarafa su eklemek yeterli değildir.",
          "MnO₄⁻ → Mn²⁺ için sağa 4 H₂O, sola 8 H⁺ eklenir. Sol yük +7, sağ yük +2 olduğundan sola 5 e⁻ gerekir: MnO₄⁻+8 H⁺+5 e⁻ → Mn²⁺+4 H₂O. Son durumda iki tarafta Mn 1, O 4, H 8 ve toplam yük +2’dir. Denklemdeki her katsayı atom ya da yük kontrolünün bir sonucudur.",
        ],
      },
      {
        title: "Bazik ortamı OH⁻ ile yeniden düzenle",
        paragraphs: [
          "Bazik ortamda bir yarı tepkimeyi önce asidik yöntemle dengeleyip iki tarafa eşit OH⁻ ekleyerek H⁺’leri suya çevirebilirsin. Sonra iki taraftaki aynı su miktarını sadeleştir. Ortama yalnız bir taraftan OH⁻ eklemek, ilk dengeli eşitliği bozduğu için geçerli bir dönüşüm değildir.",
          "MnO₄⁻ → MnO₂ için bazik yarı denklem MnO₄⁻+2 H₂O+3 e⁻ → MnO₂+4 OH⁻ olur. Sülfitin yükseltgenme yarısı SO₃²⁻+2 OH⁻ → SO₄²⁻+H₂O+2 e⁻ şeklinde yazılabilir. Her bir yarıda atom ve yük eşittir; net denklem için bu kez 3 ve 2 elektronun ortak katı gerekir.",
        ],
      },
      {
        title: "Yarı tepkimeleri topla ve ortak türleri sadeleştir",
        paragraphs: [
          "Elektron alımı 5, verimi 1 olan iki yarıda çarpanlar 1 ve 5 seçilebilir. Her yarının bütün türlerini çarpıp aynı taraftaki aynı maddeleri topla. Karşı taraflarda ortak görünen e⁻, su, H⁺ veya OH⁻ ancak aynı miktarları kadar sadeleşir; fazla miktar ilgili tarafta kalır.",
          "Bazik Mn ve sülfit yarılarında ilkini 2, ikincisini 3 ile çarpınca 6 elektron eşleşir. Su ve OH⁻ sadeleşince 2 MnO₄⁻+3 SO₃²⁻+H₂O → 2 MnO₂+3 SO₄²⁻+2 OH⁻ çıkar. Hem Mn/S/O/H hem toplam −8 yük iki tarafta korunur. Model, bu üç hazırlanmış yarı çiftini gerçekten toplayıp aynı korunumları gösterir; her olası kimyasal denklemi çözen bir araç değildir.",
        ],
      },
      {
        title: "Dengeli olmakla en küçük oran olmak farklıdır",
        paragraphs: [
          "1 ve 5 çarpanıyla eşleşen iki yarı 2 ve 10 ile de aynı oranda dengelenir. İkinci denklem atom ve yükü korusa da bütün katsayıları ortak 2’ye bölünerek küçültülebilir. Soruda en küçük tam sayılar istendiğinde bu son kontrol gerekir.",
          "Atomları eşitlemek tek başına yeterli değildir. Kimyasal iyon toplamının sol yükü sağ yükten farklıysa elektron bütçesi veya yardımcı iyonlar eksiktir. Modelde e⁻ içermeyen aday net denklem için hem atom sayıları hem yükler gösterilir; elektron çarpanları eşitlenmeden bir aday doğru net tepkime diye onaylanmaz.",
        ],
      },
      {
        title: "Ortam ve ürünü bilmeden basamak sonucu seçme",
        paragraphs: [
          "Permanganatın Mn²⁺ verdiği asidik örnekle MnO₂ verdiği bazik örnek farklı elektron alımları gerektirir: sırasıyla 5 ve 3. Bir iyonun başlangıç formülü tek başına bütün koşullarda aynı ürünü ve katsayıyı belirlemez. Soruda verilmiş ürün ve ortamı önce kaydet.",
          "İyonik net denklemle moleküler denklem arasında seyirci iyonlar nedeniyle katsayı farkları olabilir. Bakırın nitratlı tuzu oluşurken nitratın bir kısmı yalnız karşı iyon olarak kalır, bir kısmı NO’ya indirgenebilir. Tepkimeye giren bütün HNO₃ sayısını değişim geçiren N sayısıyla otomatik eşitlemek bu iki görevi karıştırır.",
        ],
      },
      {
        title: "Katsayıdan mol ve enerji yorumuna geç",
        paragraphs: [
          "Denklem katsayıları tepkime ilerlemesi başına türlerin mol oranlarını verir. Elektronlar net kimyasal denklemde görünmese de eşleşen yarılardan aktarılan mol e⁻ hesaplanabilir. Örneğin iki Cr’nin +6’dan +3’e inmesi, bir mol Cr₂O₇²⁻ için 6 mol elektron alımı demektir; yalnız bir Cr için değer 3 moldür.",
          "İstemli bir redoks, verilen koşullarda termodinamik olarak ilerleyebilir; mutlaka hızlı veya ilk anda gözle görünür olması gerekmez. Yanma başlatıcı kıvılcım isteyebilir, suyun elektrolizi ise dış enerjiyle yürütülür. Dengeleme bize olası türler için korunum sağlar; hız ve gerçek yön ayrıca koşul bilgisi ister. Keşif kaydı bağımsız soru doğrusu, XP veya konu tamamlanması değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Dikromatta iki Cr atomunu say",
        prompt:
          "Cr₂O₇²⁻ iyonu asidik ortamda Cr³⁺’e indirgeniyor. O=−2 kabulüyle her Cr’nin başlangıç basamağını, iyon başına elektron alımını ve yarı denklemi bulun.",
        strategy:
          "Toplam yükten Cr’yi bul; iki Cr’nin değişimini birlikte say.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "2x +7(−2)=−2 olduğundan x=+6. Üründeki her Cr +3 olduğuna göre her biri 3, iki Cr toplam 6 elektron alır.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "Cr₂O₇²⁻+14 H⁺+6 e⁻ → 2 Cr³⁺+7 H₂O yazılır. Yedi su O’yu, on dört H⁺ de H’yi dengeler.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sol yük −2+14−6=+6, sağ yük 2×3=+6. Cr 2, O 7 ve H 14 iki tarafta aynıdır; elektron sayısı tek Cr’nin 3’üyle karıştırılmadı.",
          },
        ],
        answer: "Her Cr +6; iyon başına 6 e⁻; yarı denklemde 14 H⁺ ve 7 H₂O",
        check:
          "Basamak farkından gelen 6 elektron ile yük farkını kapatan 6 elektron aynı.",
        pitfall: "İyondaki iki Cr yerine yalnız bir atomun değişimini almak.",
      },
      {
        title: "Asitte Fe²⁺ çarpanını bul",
        prompt:
          "Asidik ortamda MnO₄⁻, Mn²⁺’e; Fe²⁺ de Fe³⁺’e dönüşüyor. Verilen indirgenme yarısı MnO₄⁻+8 H⁺+5 e⁻ → Mn²⁺+4 H₂O. En küçük net denklemi kurun.",
        strategy: "Fe²⁺ → Fe³⁺+e⁻ yarısını 5 ile çarp.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Mn yarısı 5 e⁻ alır. Her Fe²⁺ 1 e⁻ verdiğinden 5 Fe²⁺ → 5 Fe³⁺+5 e⁻ gerekir; yalnız elektrona değil Fe türlerine de 5 uygulanır.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "İki yarıyı topla ve 5 e⁻’yi sadeleştir: MnO₄⁻+8 H⁺+5 Fe²⁺ → Mn²⁺+4 H₂O+5 Fe³⁺.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sol yük −1+8+10=+17; sağ yük +2+15=+17. Mn/O/H/Fe atomları da eşittir; 1 ve 5 en küçük yarı çarpanlarıdır.",
          },
        ],
        answer: "MnO₄⁻+8 H⁺+5 Fe²⁺ → Mn²⁺+4 H₂O+5 Fe³⁺",
        check:
          "Bir Mn başına beş Fe değişir; verilen ve alınan elektron toplamı 5’tir.",
        pitfall: "5 elektron silerken Fe²⁺ katsayısını 1 bırakmak.",
      },
      {
        title: "Bazda su ve OH⁻’yi sadeleştir",
        prompt:
          "Bazik ortamda yarılar: MnO₄⁻+2 H₂O+3 e⁻ → MnO₂+4 OH⁻ ve SO₃²⁻+2 OH⁻ → SO₄²⁻+H₂O+2 e⁻. En küçük net denklemi bulun.",
        strategy: "3 ve 2 elektron için 6 ortak kat; çarpanlar 2 ve 3.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "İlk yarıyı 2, ikinciyi 3 ile çarpınca 6 e⁻ alınır ve verilir. Sol su 4, sağ su 3; sol OH⁻ 6, sağ OH⁻ 8 olur.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "Elektronları, 3 suyu ve 6 OH⁻’yi karşılıklı sadeleştir: 2 MnO₄⁻+3 SO₃²⁻+H₂O → 2 MnO₂+3 SO₄²⁻+2 OH⁻.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Her tarafta Mn 2, S 3, H 2, O 18 ve toplam yük −8 bulunur. Çarpanlar 2:3, kalan su solda 1 ve OH⁻ sağda 2’dir.",
          },
        ],
        answer: "2 MnO₄⁻+3 SO₃²⁻+H₂O → 2 MnO₂+3 SO₄²⁻+2 OH⁻",
        check: "Sol O:8+9+1=18; sağ O:4+12+2=18.",
        pitfall: "Karşılıklı suyu sadeleştirirken kalan 1 suyu da silmek.",
      },
      {
        title: "Nitratın iki görevini ayır",
        prompt:
          "Verilen asidik reaksiyonda Cu, Cu²⁺’e; nitratın bir bölümü NO’ya dönüşüyor: Cu+HNO₃ → Cu(NO₃)₂+NO+H₂O. En küçük katsayıları ve değişim geçiren nitrat sayısını bulun.",
        strategy:
          "Cu başına 2 e⁻, NO olan N başına 3 e⁻ değişir; tuzdaki nitratı ayrıca say.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Elektron ortak katı 6’dır: 3 Cu elektron verir, 2 NO olacak N elektron alır. Önce Cu ve NO katsayıları 3 ve 2 seçilir.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "3 Cu(NO₃)₂ içinde 6 nitrat değişmeden kalır; NO’ya geçen 2 N ile toplam 8 HNO₃ gerekir. H için 4 H₂O yazılır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "3 Cu +8 HNO₃ → 3 Cu(NO₃)₂+2 NO+4 H₂O. Cu 3, N 8, H 8, O 24 korunur; yalnız 2 nitratın N’si +5’ten +2’ye iner.",
          },
        ],
        answer: "Katsayılar 3,8,3,2,4; indirgenen N taşıyan nitrat sayısı 2",
        check: "NO’ya giden 2 N toplam 6 e⁻ alır; üç Cu toplam 6 e⁻ verir.",
        pitfall:
          "Sekiz HNO₃’ün tamamındaki N indirgeniyor diyerek 24 elektron yazmak.",
      },
    ],
    recall: [
      {
        prompt: "Yükseltgen madde elektron alır mı verir mi?",
        answer:
          "Elektron alır ve kendisi indirgenir; elektron veren indirgen kendisi yükseltgenir.",
      },
      {
        prompt: "Cr₂O₇²⁻ → 2 Cr³⁺ için toplam e⁻?",
        answer: "Her Cr +6’dan +3’e 3 e⁻ alır; iki Cr için 6 e⁻.",
      },
      {
        prompt: "Bazik yöntemde H⁺ nasıl kaldırılır?",
        answer:
          "İki tarafa eşit OH⁻ eklenir; H⁺ ile su oluşur, ortak su sonra sadeleşir.",
      },
      {
        prompt: "Atomlar eşitse iyonik denklem kesin dengeli midir?",
        answer: "Hayır; toplam yük ve e⁻ alışverişi de eşitlenmelidir.",
      },
      {
        prompt: "2 ve 10 çarpanları dengeli olsa da en küçük mü?",
        answer:
          "5:1 elektron ihtiyacında 1 ve 5’e indirgenir; denge ile en küçük tam oran ayrı kontrollerdir.",
      },
    ],
    source:
      "MEBİ AYT Kimya konu özetlerinin ilgili çözünürlük, redoks ve elektrot bölümleri; OGM ders sunuları ve Dersler Cepte; Aurelia metallerle asit-baz tepkimeleri kopya kâğıdı karşılaştırılarak hazırlanan özgün öğretim. Sayısal modeller belirtilen varsayımlarla sınırlıdır; sorular özgün öğretim sorularıdır.",
  },
  {
    id: "metalik-aktiflik",
    minutes: 100,
    objectives: [
      "Metalin elektron verme eğilimini kendi iyonunun elektron alma eğiliminden ayır.",
      "Verilmiş standart çift potansiyellerinden doğru yönü ve dengeli katsayıları kur.",
      "Metal–asit, kap aşınması, pasif yüzey ve koşul sınırlarını birlikte yorumla.",
    ],
    sections: [
      {
        title: "Aktiflik hangi taneciğin hangi değişimidir?",
        paragraphs: [
          "Metalik aktiflik bu derste metalin elektron verip katyon hâline geçme eğilimini karşılaştırır. Zn → Zn²⁺+2 e⁻ metalin yükseltgenmesidir. Aynı metalin iyonu için Zn²⁺+2 e⁻ → Zn indirgenme yönü sorulur. Metal ile metal iyonunu tek bir tanecik gibi değerlendirmek iki karşıt yönü karıştırır.",
          "Bir metal başka bir metalin iyonunu indirgerken kendisi çözeltiye katyon olarak geçebilir. Örneğin verilen uygun koşulda Zn+Cu²⁺ → Zn²⁺+Cu gerçekleşir. Zn elektron veren indirgen, Cu²⁺ elektron alan yükseltgendir. Aktiflik, yalnız atom yarıçapını veya kabın rengini görerek bütün koşullarda aynı biçimde okunmaz.",
        ],
      },
      {
        title: "Tablodaki yarı tepkimenin yönünü önce oku",
        paragraphs: [
          "Standart indirgenme potansiyeli E° genellikle iyonun elektron alıp metal oluşturduğu yön için verilir. Cu²⁺+2 e⁻ → Cu için +0,337 V, Zn²⁺+2 e⁻ → Zn için −0,763 V verilmişse Cu²⁺’nin indirgenme eğilimi daha büyüktür. Buna karşılık Zn metali bu iki metal arasında daha güçlü elektron vericidir.",
          "Yükseltgenme yönüne çevirdiğin yarı tepkimenin E° işareti değişir. Zn → Zn²⁺+2 e⁻ için değer +0,763 V olarak kullanılır. Aynı tabloda bazı değerleri indirgenme, bazılarını yükseltgenme yönünde sanıp işaretleri doğrudan karşılaştırma. Her satırda denklem yönü ve verilen sayı birlikte okunur.",
        ],
      },
      {
        title: "Standart hidrojen elektrodu bir referanstır",
        paragraphs: [
          "Mutlak bir tek elektrot potansiyelini bağımsız ölçüp tabloya yazmak yerine yarı hücreler bir referansa göre karşılaştırılır. Standart hidrojen elektrodunda 2 H⁺+2 e⁻ ⇌ H₂ çifti için standart değer tanım gereği 0 V alınır. Uygun Pt yüzey, iyon çözeltisi ve hidrojen gazı bu referansın kurulmasına katılır; H₂ gazını bir metal çubuk sanmayız.",
          "Standart değer ile o anki koşullarda ölçülen değer ayrıdır. Standart etkinlikler 1’dir; derişim 1 M ifadesi ideal ders yaklaşımıdır. Güncel standart gaz basıncı 1 bar iken bazı ders kaynakları 1 atm kullanır. Bu uygulamadaki yuvarlatılmış sınıf verileri açıkça verilir; küçük basınç farkından yeni deneysel hassasiyet veya bütün koşullarda aynı voltaj iddiası çıkarılmaz.",
        ],
      },
      {
        title: "Verilen iki indirgenme değerini çıkar",
        paragraphs: [
          "Bir metal elektron verici, karşı iyon elektron alıcı olarak seçildiğinde yazılan yönün standart gerilimi E°=E°_alıcı−E°_verici bağıntısıyla bulunur. İki sayı da indirgenme yönünde verilmiş olmalıdır. Bu çıkarma, vericinin yarı tepkimesini ters çevirip işaretini değiştirdikten sonra alıcı yarısıyla toplamaktır.",
          "Zn+Cu²⁺ → Zn²⁺+Cu için 0,337−(−0,763)=1,100 V olur. Ters Cu+Zn²⁺ yönü −1,100 V verir. Verilmiş standart koşullarda pozitif işaret yazılan yöndeki termodinamik eğilimi destekler; negatif işaret o yönün standart koşullarda desteklenmediğini gösterir. Başka derişimler varsa gerçek koşullar ayrıca gerekir.",
        ],
      },
      {
        title: "Katsayılar elektronları eşitler, voltajı çarpmaz",
        paragraphs: [
          "Cu+Ag⁺ → Cu²⁺+Ag iskeletinde Cu 2 elektron verir, Ag⁺ bir elektron alır. Denge için Cu +2 Ag⁺ → Cu²⁺+2 Ag yazılır. Yarı tepkimeyi 2 ile çarpmak aktarılan elektron ve mol miktarını büyütür; standart elektrot potansiyeli ise aynı kalır.",
          "Bu çiftte Ag için +0,799 V, Cu için +0,337 V verilirse E°=0,462 V’tur; Ag katsayısı 2 diye 2×0,799 kullanılmaz. Potansiyel, birim yük başına enerji değişimiyle ilişkili yoğun bir özelliktir. Toplam enerji hesabı gerektiğinde elektron miktarı ayrıca hesaba katılır; voltajı katsayıyla büyütmek o hesabın yerine geçmez.",
        ],
      },
      {
        title: "Elektron alışverişinden dengeli yer değiştirme kur",
        paragraphs: [
          "Cr metali Cr³⁺ oluştururken 3, Pb²⁺ metale dönüşürken 2 elektronla ilişkilidir. En küçük ortak 6 için 2 Cr +3 Pb²⁺ → 2 Cr³⁺+3 Pb bulunur. Bir metalin aktif olması onun denklemde katsayısının mutlaka 1 kalacağı anlamına gelmez; iyon yükleri korunmalıdır.",
          "Verilen E°(Cr³⁺/Cr)=−0,744 ve E°(Pb²⁺/Pb)=−0,126 V ise yazılan yönün değeri +0,618 V’tur. Soldaki iyon yükü 3×2=+6, sağdaki 2×3=+6’dır. Aynı çift için hem atom sayısı, hem yük, hem standart potansiyel yönü birlikte kontrol edilir.",
        ],
      },
      {
        title: "Aynı çiftle iki farklı metali karıştırma",
        paragraphs: [
          "Zn metali Zn²⁺ içeren bir çözeltiyle karşılaştığında Zn/Zn²⁺ çiftinin kendisini yine kendisiyle karşılaştırmak iki farklı aktiflik oluşturmaz. Standart fark 0’dır; aynı türlerin yer değiştirmesiyle yeni bir net metal değiştirme tepkimesi yazılmaz. Modelde bu durum ayrı adlandırılır.",
          "Aynı elektrot çiftinin farklı iyon etkinlikleriyle kurulması başka bir konu olan derişim hücresinde gerilim verebilir. Bu, standart çift değerlerinin iki farklı metalmiş gibi ayrıldığı anlamına gelmez. Bu keşif standart eşit etkinlikleri varsayar; yalnız aynı metal adı görmek her olası düzeneğin voltajının 0 olduğu genellemesine dönüştürülmez.",
        ],
      },
      {
        title: "Kabın ve içindeki iyonun elektron yönünü belirle",
        paragraphs: [
          "X metalinden bir kapta Y iyonu bulunduğunda olası aşınma iskeleti X+Y^z+ → X iyonu+Y şeklindedir. X elektron verici rolündedir. Verilen çiftler ve koşullarda bu yön destekleniyorsa kap metali azalabilir, öteki metal yüzeye ayrılabilir. Karıştırma çubuğu için de aynı tür–iyon eşleşmesi düşünülür.",
          "Örneğin Zn kap ile Ag⁺ çiftinde Ag⁺ elektron almaya, Zn vermeye güçlü adaydır. Ters Ag metal–Zn²⁺ karşılaştırmasının standart işareti negatiftir. Bu dar redoks sonucu bütün saklama güvenliği değildir: asit, başka iyon, kompleks, yüzey ve çözünürlük tepkimesi eklenirse ayrıca değerlendirilir. Modelde verilmemiş çevre koşulları için kesin bir laboratuvar sonucu üretilmez.",
        ],
      },
      {
        title: "Hidrojen çizgisinin hangi asit için kullanıldığını söyle",
        paragraphs: [
          "Zn ve Mg gibi uygun aktif metaller, HCl gibi yükseltgen olmayan asitte H⁺’yi H₂’ye indirgeyebilir. Örnek Zn +2 H⁺ → Zn²⁺+H₂’dir; metal yükseltgenir, hidrojen iyonu indirgenir. Verilen standart çift değerlerinde E°_H=0 ile metal çiftinin değeri karşılaştırılarak bu eğilim incelenir.",
          "Cu ve Ag, normal ders koşulunda HCl’den Mg gibi H₂ çıkarmaz. Ancak asitle metal arasında gaz gözlenmemesi her koşulda bütün tepkimelerin yokluğunu kanıtlamaz. Asidin türü, derişimi, sıcaklık ve yüzey tabakası önemlidir. Standart potansiyelden tepkime hızını veya ilk gözlenen kabarcık anını doğrudan okuyamayız.",
        ],
      },
      {
        title: "Yükseltgen asitte ürünün aynı gaz olmasını bekleme",
        paragraphs: [
          "HNO₃ veya sıcak derişik H₂SO₄ gibi yükseltgen asitler, Cu ve Ag gibi HCl’den H₂ çıkarmayan metallerle farklı redokslar verebilir. Kaynakta verilen Cu örneklerinde derişik nitrik asitle NO₂, seyreltik nitrik asitle NO; sıcak derişik sülfürik asitle SO₂ ürünleri ele alınır. Bu gazların adını koşullarıyla birlikte öğren.",
          "Burada elektron alan tür her zaman H⁺ değildir; nitratın N’si veya sülfatın S’si indirgenebilir. Bu nedenle metal+asit görünce mutlaka H₂ yazılmaz. Au, tek başına olağan HNO₃ gibi asitle aynı Cu davranışını vermeyen soy metal örneğidir. Her metalin her asit karışımına aynı direnç göstereceği gibi daha geniş bir sonuç da kurulmaz.",
        ],
      },
      {
        title: "Amfoter davranışla aktifliği aynı sınıf sanma",
        paragraphs: [
          "Al, Zn ve Sn gibi örnekler uygun koşullarda hem asitle hem kuvvetli bazla tepkime verebilir. Bu davranış amfoterlik başlığında ele alınır. Yalnız asitle H₂ vermek bir metali amfoter saymaya yetmez; bazla davranışın da ayrıca verilmesi gerekir.",
          "Sulu kuvvetli bazla oluşabilecek hidrojen gazında su da H kaynağına katılır ve hidroksokompleks ürünleri kurulabilir. Eski, eksik veya dengelenmemiş bir formülü kopyalamak yerine soruda verilen gerçek ürün, atom ve yük bilgisiyle çalış. Aktiflik karşılaştırması, asit–baz niteliği ve kompleks kimyası birbiriyle ilişkili ama tek ölçüt olmayan kavramlardır.",
        ],
      },
      {
        title: "Pasif yüzey ve hız, termodinamik sırayı saklayabilir",
        paragraphs: [
          "Bir metalin oksit tabakası yüzeyi koruyup gözlenen tepkimeyi yavaşlatabilir. Al gibi bir metal için güçlü elektron verme eğilimiyle belirli ortamda pasif görünme çelişki değildir; biri denge yönü, diğeri yüzey ve hızla ilişkilidir. Pb tuzlarının yüzeyde az çözünen tabaka oluşturması da ortamın önemini gösterir.",
          "Bu yüzden gaz çıkmadı sonucunu tek başına bütün aktiflik sırasını tersine çevirmek için kullanma. Karşılaştırmalı bir soruda hangi iyonun metal olarak ayrıldığı veya hangi metalin yükseltgendiği açıkça verildiyse o değişimden ilişki çıkar. Gerçek gözlemde başka nedenler bulunabilir; uygulamanın standart modeli bu nedenleri ölçtüğünü iddia etmez.",
        ],
      },
      {
        title: "Derişim değişince E ile E°’yi ayır",
        paragraphs: [
          "E° belirli sıcaklıkta seçili yarı tepkimenin standart değeridir; bir pil çalıştı diye tablodaki standart sayının kendisi zamanla tükenmez. Gerçek E, iyon etkinlikleri ve gaz basıncı gibi koşullarla değişebilir. Dengeye yaklaşan bir gerçek hücrede E’nin 0’a gelmesi E° ile aynı kavram değildir.",
          "Standart işareti verilen bir tepkimenin farklı derişimlerdeki yönü için gerekirse tepkime bölümünü ve ilgili bağıntıyı bilmek gerekir. Her sıcaklık artışı gerilimi aynı yönde değiştirir veya H₂ basıncı her hücrede gerilimi azaltır şeklinde koşulsuz cümleler kullanılmaz. Bu derste etkinlikler 1 seçilerek standart kıyas yapılır; verilmemiş derişimden sayı uydurulmaz.",
        ],
      },
      {
        title: "Metal miktarıyla potansiyeli karıştırma",
        paragraphs: [
          "Aynı tür saf metal elektrodun boyutunu veya kütlesini değiştirmek, diğer koşullar aynı kaldığında standart çift potansiyelini değiştirmez. Daha fazla metal, tepkime için daha fazla stok veya daha geniş yüzey sağlayabilir; kapasite ve hız ile standart voltaj farklı sorulardır. Sıcaklık, çözelti etkinliği veya gaz koşulu değişirse bu ayrı bir müdahaledir.",
          "Bir madde miktarı sorusunda verilen dengeli denklem kullanılır. 1 mol Zn için 2 mol H⁺ gerektiği biliniyorsa asit sınırlayıcı olabilir; sadece aktiflik var diye bütün metalin tüketileceği söylenmez. Tepkime yönü, mol bütçesi ve deneyin hızı ayrı satırlarda çözülür; biri ötekinin eksik verisini tamamlamaz.",
        ],
      },
      {
        title: "Periyodik eğilim ve sulu aktiflik farklı dayanaklar içerir",
        paragraphs: [
          "Periyodik tabloda genel metalik karakter soldan sağa azalır, bir grupta aşağıya doğru artabilir; ametalik eğilim çoğunlukla ters yöndedir. Bunlar uygun grup ve periyot bağlamında öğrenilen eğilimlerdir. Sulu çözeltideki standart metal/iyon sırası ise iyon oluşumu, bağların çözülmesi ve suyla çevrelenme gibi enerji etkilerini birlikte içerir.",
          "Bu yüzden yalnız atom çapına bakıp bütün sulu çiftlerin kesin sırasını çıkarma. Kaynakta Li’nin güçlü sulu indirgen oluşuyla daha aşağı alkali metalin daha büyük yarıçapı birlikte bulunabilir. Net soruda verilen aktiflik sırası veya belirlenmiş iyon çiftinin potansiyeli esas alınır; farklı yükseltgenme basamaklı iki yarıyı aynı metal adıyla körlemesine özdeş sayma.",
        ],
      },
      {
        title: "Ametalde elektron alma yönünü ve kanıtı oku",
        paragraphs: [
          "Ametalik redoks kıyasında verilen elementin elektron alıp anyona dönüşme eğilimi incelenebilir. Örneğin Cl₂+2 Br⁻ → 2 Cl⁻+Br₂ ilerliyorsa bu koşullarda Cl₂, Br⁻’yi yükseltgeyen ve kendisi indirgenen türdür. Metalin elektron verme sırasını aynen ametale taşımak doğru değildir.",
          "Halojenlerin belirli sulu çiftleri için F₂’nin güçlü yükseltgen oluşu, tek bir serbest atomun elektron ilgisiyle tamamen aynı ölçüm değildir. Hangi tür ve koşulun kıyaslandığını söyle. Son değerlendirmede önce verilen yarı çift, sonra elektron ve atom/yük dengesi, sonra E° işareti yazılır. Tahminini kaydetmek XP veya tamamlanmış soru sayılmaz; yeni koşullu bağımsız soruyu açıklayabilmek ayrı kanıttır.",
        ],
      },
    ],
    examples: [
      {
        title: "Bakır ve gümüşte iki elektron, tek potansiyel",
        prompt:
          "Cu²⁺+2 e⁻ → Cu için E°=+0,337 V; Ag⁺+e⁻ → Ag için +0,799 V. Standart Cu+Ag⁺ yönünü dengeleyin, E°’yi ve yeterli Ag⁺ ile 0,15 mol Cu’nun tam tüketildiği verilen modelde Ag miktarını bulun.",
        strategy:
          "Elektronları katsayıyla eşitle, potansiyelleri indirgenme değerlerinden çıkar.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Cu → Cu²⁺+2 e⁻; iki Ag⁺ toplam 2 e⁻ alır. Net Cu +2 Ag⁺ → Cu²⁺+2 Ag ve iki tarafta yük +2 olur.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "E°=0,799−0,337=+0,462 V. Ag yarısını 2 ile çarpmak potansiyeli 2 ile çarpmayı gerektirmez.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Verilen tam tüketim modelinde 0,15 mol Cu için 0,30 mol Ag⁺ harcanır ve 0,30 mol Ag oluşur. Bu miktar dengeli katsayılardan gelir; E° tek başına tüketim stokunu belirlemez.",
          },
        ],
        answer: "E°=+0,462 V; Cu:Ag⁺:Ag=1:2:2; Ag 0,30 mol",
        check:
          "Metal atomları ve +2 iyon yükü korunur; elektron toplamı iki yönde 2’dir.",
        pitfall: "0,799 değerini Ag katsayısıyla çarpıp voltajı büyütmek.",
      },
      {
        title: "Üç ve iki elektronlu çiftleri birleştir",
        prompt:
          "Cr³⁺+3 e⁻ → Cr için E°=−0,744 V; Pb²⁺+2 e⁻ → Pb için −0,126 V. Standart Cr metalinin Pb²⁺’yi indirgediği yönü yazıp gerilimi hesaplayın.",
        strategy: "İki indirgenme değerini karşılaştır; ortak elektron 6.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Cr metali elektron verici seçilirse yarısı ters çevrilir. İki Cr toplam 6 e⁻ verir; üç Pb²⁺ toplam 6 e⁻ alır.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "Net 2 Cr +3 Pb²⁺ → 2 Cr³⁺+3 Pb olur. Sol yük 3×2=+6; sağ 2×3=+6, atom sayıları da eşittir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "E°=−0,126−(−0,744)=+0,618 V. Cr’nin 2 ve Pb’nin 3 katsayıları bu gerilim farkını çarpmaz.",
          },
        ],
        answer: "2 Cr +3 Pb²⁺ → 2 Cr³⁺+3 Pb; +0,618 V",
        check:
          "Pozitif standart işaret, seçilen elektron verici–alıcı yönüyle uyumludur.",
        pitfall:
          "Denge için gerekli 2 ve 3’ü elektrot potansiyellerine de çarpmak.",
      },
      {
        title: "Kap kıyasını dar redoks koşuluyla yap",
        prompt:
          "Standart indirgenme değerleri Zn²⁺/Zn=−0,763 V, Cu²⁺/Cu=+0,337 V, Ag⁺/Ag=+0,799 V. Yalnız metal–verilen iyon redoksu inceleniyor; yan tepkime ve yüzey engeli yok. Zn metal/Ag⁺ ile Ag metal/Zn²⁺ için yazılan yönleri karşılaştırın.",
        strategy: "Kabın metali elektron verici, çözeltideki iyon alıcıdır.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Zn +2 Ag⁺ → Zn²⁺+2 Ag için E°=0,799−(−0,763)=+1,562 V; standart yön desteklenir.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "2 Ag+Zn²⁺ → 2 Ag⁺+Zn tersidir; E°=−0,763−0,799=−1,562 V, standart koşulda bu yön desteklenmez.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İlk kıyas Zn’nin aşınma eğilimini, ikincisi bu seçili yönde standart destek olmadığını gösterir. Asit veya başka iyon içeren gerçek saklama ortamı bu dar sonuçla bütünüyle açıklanmış olmaz.",
          },
        ],
        answer: "Zn/Ag⁺ yönü +1,562 V; Ag/Zn²⁺ yönü −1,562 V",
        check: "Denklemleri ters çevirince işaretler de tam tersine döndü.",
        pitfall:
          "Aktiflik sonucunu bütün kimyasallar ve koşullar için genel kap güvenliği hükmüne çevirmek.",
      },
      {
        title: "Hidrojen yönünden sonra sınırlayıcı molü bul",
        prompt:
          "Zn²⁺/Zn için E°=−0,763 V, 2 H⁺/H₂ için 0 V. Uygun yükseltgen olmayan asitte 0,20 mol Zn ile 0,30 mol H⁺ var. Verilen okul modelinde H⁺ tamamen tüketiliyor; başka tepkime yok. H₂ ve kalan Zn kaç mol?",
        strategy: "Önce yön; sonra Zn +2 H⁺ → Zn²⁺+H₂ oranı.",
        steps: [
          {
            label: "Veriyi kur",
            explanation:
              "Standart yazılan yönün değeri 0−(−0,763)=+0,763 V’tur. Zn elektron verir, H⁺ alır; H₂ için iki H⁺ gerekir.",
          },
          {
            label: "İşlemi uygula",
            explanation:
              "0,30 mol H⁺ ancak 0,15 mol Zn tüketir ve 0,15 mol H₂ verir. Başlangıç 0,20 mol Zn bu miktardan fazladır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Kalan Zn=0,20−0,15=0,05 moldür. Verilen tam H⁺ tüketim varsayımı mol sonucunu belirler; aktiflik tek başına stok miktarını söylemez.",
          },
        ],
        answer: "H₂ 0,15 mol; kalan Zn 0,05 mol",
        check:
          "H atomları 0,30 mol H⁺’den 0,15 mol H₂’ye; Zn toplamı 0,15+0,05=0,20’ye uyar.",
        pitfall:
          "Bütün 0,20 mol Zn mutlaka biter diye sınırlı asidi göz ardı etmek.",
      },
    ],
    recall: [
      {
        prompt: "E° indirgenme değeri büyük iyon neye daha eğilimlidir?",
        answer:
          "Verilen standart kıyasta elektron almaya; aynı metalin elektron verme yönü tersidir.",
      },
      {
        prompt: "İki indirgenme değeriyle yazılan yönün E°’si?",
        answer:
          "E°_elektron alan çift−E°_elektron veren çift; katsayıyla çarpılmaz.",
      },
      {
        prompt: "Cu+HCl için H₂ yoksa Cu bütün asitlere tepkimesiz midir?",
        answer:
          "Hayır; yükseltgen asitler başka ürün ve gazlar verebilir, koşulları gerekir.",
      },
      {
        prompt: "Aynı metalin kütlesini artırmak E°’yi artırır mı?",
        answer:
          "Diğer koşullar aynıysa hayır; stok/yüzey ile standart potansiyel ayrı niceliklerdir.",
      },
      {
        prompt: "Pozitif E° mutlaka hızlı görünür tepkime mi?",
        answer:
          "Hayır; standart termodinamik yön, hız ve pasif yüzey engellerinden ayrıdır.",
      },
    ],
    source:
      "MEBİ AYT Kimya konu özetlerinin ilgili çözünürlük, redoks ve elektrot bölümleri; OGM ders sunuları ve Dersler Cepte; Aurelia metallerle asit-baz tepkimeleri kopya kâğıdı karşılaştırılarak hazırlanan özgün öğretim. Sayısal modeller belirtilen varsayımlarla sınırlıdır; sorular özgün öğretim sorularıdır.",
  },
];
const lessonData021 = [
  {
    id: "cozunurluk-faktorleri",
    title: "Çözünürlük dengesi: sıcaklık ve ortak iyon",
    minutes: 95,
    objectives: [
      "Sıcaklıkla Kç değişimini, aynı sıcaklıkta ortak iyonla s değişiminden ayır.",
      "Son hacim, tuzun formülü ve kalan katı ile gerçek derişimi hesapla.",
      "Denge miktarını, çözünme hızını ve modelin ek tepkime sınırlarını ayır.",
    ],
    questions: [
      {
        id: "f021c-cozunurluk-faktorleri-1",
        prompt:
          "MX(k)+ısı ⇌ M⁺+X⁻ çözünmesi için aynı çözücüde yeterli katı kalıyor. Verilen sıcaklık aralığında başka tepkime yok. Sıcaklık artırıldığında doğru yorum hangisidir?",
        options: [
          "Kç sabit kalır; yalnız hız değişebilir.",
          "Kç azalır, çözünürlük mutlaka artar.",
          "Kç ve doygun molar çözünürlük artar.",
          "Katının formülü değişir.",
          "Çözünme hızı arttığı için denge sabiti tanımsız olur.",
        ],
        answer: 2,
        hint: "Isı, verilen denklemde hangi tarafta?",
        explanation:
          "Verilen çözünme ısı alır. Sıcaklık artışı bu aralıkta çözünme yönünü destekler; aynı 1:1 ideal sistemde artan Kç daha büyük s verir. Sonuç bütün katılar için koşulsuz genelleme değildir.",
      },
      {
        id: "f021c-cozunurluk-faktorleri-2",
        prompt:
          "Aynı MX tuzu için 10 °C’de Kç=9·10⁻⁴, 40 °C’de Kç=1·10⁻⁴ veriliyor. İdeal saf suda 1:1 ayrışma ve yeterli katı var. Doğru sonuç hangisidir?",
        options: [
          "Isınmayla s, 0,01 M’den 0,03 M’ye çıkar.",
          "Kç değerleri aynı olduğundan s değişmez.",
          "40 °C’de s=1·10⁻⁴ M olur.",
          "Çözünmenin bu aralıkta ısı alması zorunludur.",
          "Bu aralıkta ısınmayla s, 0,03 M’den 0,01 M’ye düşer.",
        ],
        answer: 4,
        hint: "MX için s=√Kç kullan.",
        explanation:
          "İki kök sırasıyla 0,03 ve 0,01 M’dir; verilen aralıkta çözünme sıcaklık arttıkça azalır. Kç’nin düşmesi ekzotermik çözünme yönüyle uyumludur. Kç ile s aynı sayısal nicelik değildir.",
      },
      {
        id: "f021c-cozunurluk-faktorleri-3",
        prompt:
          "Sabit sıcaklıkta MX(k) ⇌ M⁺+X⁻ dengesi var. Son hacim değişmeden, yan tepkime vermeyen MY eklenip M⁺ derişimi artırılıyor; katı faz dengede kalıyor. Hangisi değişmeden kalır?",
        options: [
          "MX’nin bu ortamdaki molar çözünürlüğü.",
          "Aynı sıcaklıktaki çözünürlük çarpımı Kç.",
          "Çözeltideki bütün iyonların derişimi.",
          "Çözünmüş MX’den gelen X⁻ derişimi.",
          "Toplam M⁺ derişimi.",
        ],
        answer: 1,
        hint: "Ortak iyon derişim değişimidir; sıcaklık değişimi değil.",
        explanation:
          "Ortak ürün M⁺ eklendiğinde MX’den daha az iyon gelerek denge sağlanır, fakat bu ideal sistemin aynı sıcaklıktaki Kç değeri sabittir. Diğer seçeneklerdeki miktarlar verilen işlemle değişebilir veya değişir; sabit tutuldukları söylenmemiştir.",
      },
      {
        id: "f021c-cozunurluk-faktorleri-4",
        prompt:
          "Kç=4·10⁻⁴ olan MX, başlangıçta 0,03 M M⁺ içeren çözeltide yeterli katıyla dengeleniyor. Son hacim sabit; yan tepkime yok. [M⁺] ve [X⁻] hangi çifttir?",
        options: [
          "0,03 M ve 0,02 M.",
          "0,02 M ve 0,02 M.",
          "0,01 M ve 0,04 M.",
          "0,04 M ve 0,01 M.",
          "0,03 M ve 0,03 M.",
        ],
        answer: 3,
        hint: "İki iyon tuzdan eşit s kadar gelir, fakat M⁺ başlangıçta da vardır.",
        explanation:
          "(0,03+s)s=0,0004 denkleminde pozitif s=0,01 bulunur. Toplam M⁺=0,04, X⁻=0,01 M; çarpım Kç’yi ve başlangıçtaki 0,03 M farkını birlikte sağlar. Yalnız çarpım değil bu madde katkısı da korunmalıdır.",
      },
      {
        id: "f021c-cozunurluk-faktorleri-5",
        prompt:
          "0,02 M CaX₂ tam ayrışıyor ve sabit son hacimde ortak X⁻ kaynağı oluyor. MX tuzu eklenmeden önce kaynağın X⁻ derişimi kaçtır?",
        options: ["0,04 M.", "0,01 M.", "0,02 M.", "0,06 M.", "0,20 M."],
        answer: 0,
        hint: "Bir CaX₂ formül biriminden iki X⁻ çıkar.",
        explanation:
          "[X⁻]=2×0,02=0,04 M olur. Bu iyon derişimi, CaX₂’nin formül molaritesinin iki katıdır. Sonraki Kç hesabında MX’den gelecek s de gerekiyorsa ayrıca eklenir.",
      },
      {
        id: "f021c-cozunurluk-faktorleri-6",
        prompt:
          "Bir tuzun çözünürlüğüne etki eden işlemler karşılaştırılıyor. Her seçenekte kendi belirtilen koşulları geçerli ve yeterli katıyla son dengeye ulaşılıyor. Hangisi tek başına doygun çözünürlüğü artıran genel bir yöntem değildir?",
        options: [
          "Verilen endotermik çözünmenin sıcaklığını artırmak.",
          "Serbest iyonu tüketen, açıkça belirtilmiş bir asit tepkimesi eklemek.",
          "Verilen uygun kompleks oluşumuyla serbest metal iyonunu bağlamak.",
          "Çözünürlüğü daha yüksek olduğu deneyle verilen başka bir çözücüye geçmek.",
          "Aynı çözücü ve sıcaklıkta tuzu öğütüp karıştırmak.",
        ],
        answer: 4,
        hint: "Dengeye ulaşma süresiyle doygunluk sınırını ayır.",
        explanation:
          "Öğütme ve karıştırma uygun durumda hızı artırabilir; aynı faz ve sıcaklıkta denge çözünürlüğünü artırdığı söylenemez. Öteki seçenekler verilen koşullarında dengeyi veya çözücüyü değiştirir; soru yalnız hız etkisini ayırt ettirir.",
      },
      {
        id: "f021c-cozunurluk-faktorleri-7",
        prompt:
          "MX’nin katı fazıyla dengede olan doygun çözeltisine, aynı sıcaklık ve aynı hacim korunarak biraz daha saf MX katısı ekleniyor. Başka tepkime yok. Doğru yorum?",
        options: [
          "Doygun iyon derişimleri değişmez; eldeki katı miktarı artar.",
          "Kç katı molüyle aynı oranda artar.",
          "Kç iki katına çıkar.",
          "Her eklenen mol mutlaka tümüyle çözünür.",
          "Çözelti mutlaka aşırı doymuş olur.",
        ],
        answer: 0,
        hint: "Saf katı miktarı Kç bağıntısında yer alır mı?",
        explanation:
          "Aynı katı faz zaten mevcutken denge derişimleri sıcaklık ve ortamla belirlenir. Fazladan katı doygunluk sınırını değiştirmez. Kütle artışı ile çözeltideki derişim artışı aynı işlem değildir.",
      },
      {
        id: "f021c-cozunurluk-faktorleri-8",
        prompt:
          "MX için Kç=4·10⁻⁴, son hacim 1 L ve başlangıçta başka iyon yok. Yalnız 0,012 mol MX ekleniyor; ideal denge, başka tepkime yok. Hangisi doğrudur?",
        options: [
          "0,012 molün tümü katı kalır.",
          "Son iyon derişimleri mutlaka 0,02 M’dir.",
          "Tüm tuz çözünür; Q=1,44·10⁻⁴<Kç ve çözelti doymamıştır.",
          "Kç, tuz az olduğu için 1,44·10⁻⁴’e düşer.",
          "Doygunluk için gereken eksik tuz sudan oluşur.",
        ],
        answer: 2,
        hint: "sV kapasitesiyle eldeki toplam molü karşılaştır.",
        explanation:
          "Saf sudaki doygunluk s=0,02 M, kapasite 0,02 moldür; stok daha az olduğundan 0,012 mol çözünür. Gerçek derişim 0,012 M ve Q bunun karesidir. Kç sabit kalır; gerçek Q’nun altında oluşu eksik katıyı yaratmaz.",
      },
      {
        id: "f021c-cozunurluk-faktorleri-9",
        prompt:
          "Bir tuz endotermik çözünüyor. I ortamı düşük sıcaklıkta daha az ortak iyon, II ortamı yüksek sıcaklıkta daha çok ortak iyon içeriyor. Kç(T) sayıları ve son ortak iyon derişimleri verilmemiş. Kesin sonuç hangisidir?",
        options: [
          "II’de çözünürlük her durumda daha büyüktür.",
          "Ters yönlü etkiler nedeniyle molar çözünürlük sırası bu bilgilerle tekleşmez.",
          "I’de çözünürlük her durumda daha büyüktür.",
          "İki ortamın Kç değerleri mutlaka aynıdır.",
          "Ortak iyon sıcaklık etkisini her zaman tamamen yok eder.",
        ],
        answer: 1,
        hint: "Bir etki artırırken öteki azaltıyorsa büyüklükler verilmiş mi?",
        explanation:
          "Yüksek sıcaklık endotermik çözünmeyi artırırken ortak iyon azaltıcı olabilir. Bu etkilerin nicel büyüklüğü verilmeden hangisinin baskın olduğu belirlenmez. Aynı sıcaklık olmadığı için Kç’nin aynı kalacağı da söylenemez.",
      },
      {
        id: "f021c-cozunurluk-faktorleri-10",
        prompt:
          "Az çözünen bir metal tuzuna, serbest metal iyonunu kararlı kompleks içinde bağlayan ligand ekleniyor. Sıcaklık sabit; verilen koşullarda kompleks oluşumu çözünmeyi artırıyor. Hangisi bu bilgiyle uyumludur?",
        options: [
          "Kç bağıntısı her durumda toplam kompleksli metal derişimiyle yazılır.",
          "Saf sudaki çözünürlük bütün olası ortamlardan mutlaka büyüktür.",
          "Ligand eklemek sıcaklık değişmeden Kç’yi zorunlu olarak artırır.",
          "Toplam çözünmüş metal artarken serbest metal iyonu azalabilir.",
          "Kompleks oluşumu yalnız öğütme gibi bir hız etkisidir.",
        ],
        answer: 3,
        hint: "Serbest iyonla toplam analitik miktar aynı mı?",
        explanation:
          "Kompleks, serbest iyonu bağlayıp çözünme dengesini ileri çekebilir; toplam metal ve serbest metal farklı niceliklerdir. Aynı sıcaklıkta asıl Kç değişmek zorunda değildir. Bu ek tepkime, basit ortak iyon kıyasının açık sınırıdır.",
      },
    ],
  },
  {
    id: "redoks-denklestirme",
    title: "Redoks: elektron, atom ve yük dengesi",
    minutes: 110,
    objectives: [
      "Yükseltgenme basamağını gerçek iyon yükünden ayırarak elektron değişimini izle.",
      "Asidik ve bazik yarı tepkimeleri atom ve yük korunumu ile birleştir.",
      "En küçük katsayı, toplam elektron ve tepkimedeki madde rolünü ayrı denetle.",
    ],
    questions: [
      {
        id: "f021c-redoks-denklestirme-1",
        prompt:
          "KMnO₄ nötr bileşiğinde K=+1 ve O=−2 alınıyor. Mn’nin yükseltgenme basamağı kaçtır?",
        options: ["+4", "+6", "−7", "+7", "+2"],
        answer: 3,
        hint: "1+x +4(−2)=0 toplamını kur.",
        explanation:
          "Nötr bileşik için toplam 0: 1+x −8=0, x=+7. Oksijenin dört atomu ve potasyumun +1 katkısı birlikte hesaba katılır. Bu, Mn’nin molekülde serbest +7 yüklü iyon olduğu iddiası değildir.",
      },
      {
        id: "f021c-redoks-denklestirme-2",
        prompt:
          "H₂O₂ nötr peroksit bileşiğinde H’nin yükseltgenme basamağı +1. Her O atomunun basamağı nedir?",
        options: ["−2", "−1", "0", "+1", "+2"],
        answer: 1,
        hint: "2(+1)+2x=0 yaz; peroksit istisnasını denetle.",
        explanation:
          "2+2x=0’dan x=−1 bulunur. Oksijen çoğu bileşikte −2 olsa da peroksitte bu ezber uygulanmaz; toplam yük zorunluluğu doğru değeri doğrudan gösterir.",
      },
      {
        id: "f021c-redoks-denklestirme-3",
        prompt:
          "Fe(k)+Sn²⁺(suda) → Fe²⁺(suda)+Sn(k) tepkimesinde indirgen ve yükseltgen madde sırasıyla hangileridir?",
        options: [
          "Sn²⁺ ve Fe.",
          "Fe²⁺ ve Sn.",
          "Sn ve Fe²⁺.",
          "Fe ve Fe²⁺.",
          "Fe ve Sn²⁺.",
        ],
        answer: 4,
        hint: "Elektron verenin kendisi yükseltgenir ve indirgen adını alır.",
        explanation:
          "Fe 0’dan +2’ye çıkarak 2 e⁻ verir, bu yüzden indirgendir. Sn²⁺ +2’den 0’a inip 2 e⁻ alır, yükseltgendir. Madde rolünün adıyla geçirdiği değişimin adı aynı değildir.",
      },
      {
        id: "f021c-redoks-denklestirme-4",
        prompt:
          "Aşağıdaki verilen dengeli tepkimelerden hangisinde yükseltgenme basamakları değişmez?",
        options: [
          "Ag⁺+Cl⁻ → AgCl(k).",
          "Zn+Cu²⁺ → Zn²⁺+Cu.",
          "2 H₂+O₂ → 2 H₂O.",
          "Fe +2 H⁺ → Fe²⁺+H₂.",
          "Cl₂+2 Br⁻ → 2 Cl⁻+Br₂.",
        ],
        answer: 0,
        hint: "Çökelme gözlemi tek başına elektron aktarımı demek değildir.",
        explanation:
          "AgCl’de Ag +1 ve Cl −1 kalır; yalnız az çözünen katı oluşur. Diğer seçeneklerde en az bir elementin 0 ile iyonik/bileşik basamağı arasında değişim vardır. Tepkime türü, yalnız katı veya gaz görünmesine göre seçilmez.",
      },
      {
        id: "f021c-redoks-denklestirme-5",
        prompt:
          "Cr₂O₇²⁻ iyonundaki her Cr +6’dır ve verilen tepkimede iki Cr de Cr³⁺’e dönüşür. Bir mol Cr₂O₇²⁻ kaç mol elektron alır?",
        options: ["3 mol.", "2 mol.", "6 mol.", "12 mol.", "1 mol."],
        answer: 2,
        hint: "Bir Cr’nin değişimini iyon içindeki Cr sayısıyla çarp.",
        explanation:
          "Her Cr +6’dan +3’e 3 elektron alır. Bir dikromat iyonunda iki Cr bulunduğundan 2×3=6; bir mol iyon için 6 mol e⁻ gerekir. Atom başına değer, iyonun tamamının değeri değildir.",
      },
      {
        id: "f021c-redoks-denklestirme-6",
        prompt:
          "Asidik ortamda MnO₄⁻+8 H⁺+aFe²⁺ → Mn²⁺+aFe³⁺+4 H₂O denklemi en küçük tam katsayılarla dengeleniyor. a kaçtır?",
        options: ["5", "1", "3", "4", "8"],
        answer: 0,
        hint: "Mn +7’den +2’ye inerken Fe +2’den +3’e çıkar.",
        explanation:
          "Bir Mn 5 elektron alır, her Fe²⁺ 1 elektron verir; a=5 gerekir. Sol ve sağ yük a=5 için +17 olur. Yalnız atomları sayınca a serbest görünebilir; yük ve elektron dengesi onu belirler.",
      },
      {
        id: "f021c-redoks-denklestirme-7",
        prompt:
          "Bazik ortamda iki dengeli yarı veriliyor: MnO₄⁻+2 H₂O+3 e⁻ → MnO₂+4 OH⁻; SO₃²⁻+2 OH⁻ → SO₄²⁻+H₂O+2 e⁻. Elektronsuz net denklem için en küçük yarı çarpanları sırasıyla nedir?",
        options: ["3 ve 2.", "1 ve 1.", "1 ve 3.", "2 ve 3.", "2 ve 1."],
        answer: 3,
        hint: "Alınan 3 ve verilen 2 elektronun en küçük ortak katı 6.",
        explanation:
          "İlk yarı 2×3=6 e⁻ alır; ikinci 3×2=6 e⁻ verir. Böylece net denklemden elektronlar silinir. İlkinde 3, ikincide 2 seçmek 9 ve 4 elektron üretir; ortak katı eşitlemez.",
      },
      {
        id: "f021c-redoks-denklestirme-8",
        prompt:
          "Bir yarı tepkime her birimi için 5 e⁻ alıyor, diğeri her birimi için 1 e⁻ veriyor. Çarpanlar 2 ve 10 seçilmiş ve bütün atom/yük dengesi sağlanmış. Doğru yorum hangisidir?",
        options: [
          "Elektron toplamları 2 ve 10 olduğu için denk değildir.",
          "Elektronlar eşittir; fakat en küçük çarpanlar 1 ve 5’tir.",
          "Çarpanlar farklıysa hiçbir zaman denge kurulamaz.",
          "En küçük katsayılar kesin 2 ve 10’dur.",
          "Yalnız elektronları 2’ye bölüp atom katsayılarını korumak gerekir.",
        ],
        answer: 1,
        hint: "Çarpanla yarı başına elektron sayısını birlikte çarp.",
        explanation:
          "Alınan 2×5=10, verilen 10×1=10 e⁻ olduğundan bütçe eşittir. Bütün denklem ortak 2’ye bölünerek 1 ve 5 çarpanlarına iner. En küçük oran koşulu, zaten sağlanan korunumun üstüne ek bir denetimdir.",
      },
      {
        id: "f021c-redoks-denklestirme-9",
        prompt:
          "3 Cu +8 HNO₃ → 3 Cu(NO₃)₂+2 NO+4 H₂O denkleminde N, HNO₃ ve nitratta +5, NO’da +2’dir. Yazılan denklem bir kez ilerlerken kaç N atomu indirgenir?",
        options: [
          "8 N atomu.",
          "6 N atomu.",
          "3 N atomu.",
          "Bütün N atomları yükseltgenir.",
          "2 N atomu.",
        ],
        answer: 4,
        hint: "Tuzun içindeki nitratı NO’ya dönüşen nitratla ayır.",
        explanation:
          "İki NO içinde 2 N +5’ten +2’ye iner. Tuzdaki 6 N +5 kalır ve bu değişime katılmaz. Üç Cu toplam 6 e⁻ verir; indirgenen 2 N de toplam 6 e⁻ alır. Toplam 8 HNO₃ katsayısı indirgenen atom sayısıyla aynı değildir.",
      },
      {
        id: "f021c-redoks-denklestirme-10",
        prompt:
          "2 H₂O₂ → 2 H₂O+O₂ tepkimesinde O’nun basamağı H₂O₂’de −1, H₂O’da −2, O₂’de 0. Doğru sonuç hangisidir?",
        options: [
          "Bütün O atomları yalnız elektron alır.",
          "Bütün O atomları yalnız elektron verir.",
          "Başlangıçtaki aynı tür hem indirgenen hem yükseltgenen O sağlar.",
          "Basamaklar değişmediği için redoks değildir.",
          "H₂O₂ her denklemde yalnız yükseltgen olmak zorundadır.",
        ],
        answer: 2,
        hint: "−1’den −2’ye ve −1’den 0’a değişimleri ayrı oku.",
        explanation:
          "O’nun bir bölümü basamağı azalarak indirgenir, bir bölümü artarak yükseltgenir. Bu orantısızlaşma örneğinde de elektronlar eşleşir. Türün adını her koşulda değişmeyen tek bir rolle etiketlemek doğru değildir.",
      },
    ],
  },
  {
    id: "metalik-aktiflik",
    title: "Aktiflik: metal, iyon ve tepkimenin yönü",
    minutes: 100,
    objectives: [
      "Metalin elektron verme eğilimini kendi iyonunun elektron alma eğiliminden ayır.",
      "Verilmiş standart çift potansiyellerinden doğru yönü ve dengeli katsayıları kur.",
      "Metal–asit, kap aşınması, pasif yüzey ve koşul sınırlarını birlikte yorumla.",
    ],
    questions: [
      {
        id: "f021c-metalik-aktiflik-1",
        prompt:
          "25 °C standart indirgenme değerleri: Zn²⁺/Zn=−0,763 V, Cu²⁺/Cu=+0,337 V, Ag⁺/Ag=+0,799 V. Bu üç metalden verilen standart kıyasta en güçlü elektron verici hangisidir?",
        options: ["Cu.", "Ag.", "Ag⁺.", "Üçü de aynı; tümü metaldir.", "Zn."],
        answer: 4,
        hint: "Metalin elektron verme yönü, tabloda yazılan indirgenmenin tersidir.",
        explanation:
          "En küçük indirgenme değeri Zn çiftindedir; Zn metalinin ters yükseltgenme yönü en elverişli elektron verici konumdadır. Ag⁺ metal değil, iyonik alıcıdır. Karşılaştırma verilen çiftler ve standart koşullara aittir.",
      },
      {
        id: "f021c-metalik-aktiflik-2",
        prompt:
          "Cu²⁺+2 e⁻ → Cu için E°=+0,337 V ve Ag⁺+e⁻ → Ag için +0,799 V. Cu +2 Ag⁺ → Cu²⁺+2 Ag yönünün standart potansiyeli kaçtır?",
        options: [
          "+1,261 V.",
          "+1,136 V.",
          "+0,462 V.",
          "−0,462 V.",
          "+0,231 V.",
        ],
        answer: 2,
        hint: "İki sayı indirgenme değeridir; alıcınınkinden vericininkini çıkar.",
        explanation:
          "0,799−0,337=0,462 V. Ag yarısının 2 ile çarpılması yalnız elektron ve madde miktarını eşitler; E°’yi çarpmaz. Ters yön için işaret negatif olur.",
      },
      {
        id: "f021c-metalik-aktiflik-3",
        prompt:
          "Zn²⁺/Zn=−0,763 V, Ag⁺/Ag=+0,799 V. Standart 2 Ag+Zn²⁺ → 2 Ag⁺+Zn yönü için doğru yorum hangisidir?",
        options: [
          "E°=−1,562 V; yazılan yön standart koşullarda desteklenmez.",
          "E°=+1,562 V; Ag metalinin daha küçük indirgenme değeri vardır.",
          "E°=−0,036 V; değerler doğrudan toplanır.",
          "E°=0 V; elektronlar eşitlendiğinde voltaj silinir.",
          "E°=+0,799 V; yalnız Ag katsayısı kullanılır.",
        ],
        answer: 0,
        hint: "Burada elektron veren Ag, alan Zn²⁺.",
        explanation:
          "E°=−0,763−0,799=−1,562 V. İki Ag’nin katsayısı, iki elektron veren dengeli metal miktarıdır. İşaret standart kıyas içindir; farklı etkinliklere ilişkin veri verilmemiştir.",
      },
      {
        id: "f021c-metalik-aktiflik-4",
        prompt:
          "Cr³⁺/Cr=−0,744 V, Pb²⁺/Pb=−0,126 V veriliyor. 2 Cr +3 Pb²⁺ → 2 Cr³⁺+3 Pb standart yönünün E° değeri nedir?",
        options: [
          "+1,110 V.",
          "+0,618 V.",
          "−0,618 V.",
          "+0,870 V.",
          "+3,708 V.",
        ],
        answer: 1,
        hint: "Cr’nin yarısı ters çevrilir, fakat 2 ve 3 ile potansiyel çarpılmaz.",
        explanation:
          "Alıcı Pb²⁺ çiftinin −0,126 değerinden verici Cr çiftinin −0,744 değeri çıkarılır: +0,618 V. Katsayılar 6 elektronu ve +6 yükü eşitler. Potansiyel birim yük başına nicelik olduğundan aynı katsayılarla toplanmaz.",
      },
      {
        id: "f021c-metalik-aktiflik-5",
        prompt:
          "Zn²⁺/Zn için E°=−0,763 V, 2 H⁺/H₂ için 0 V. Yüzey engeli olmayan uygun yükseltgen olmayan asit modelinde Zn +2 H⁺ → Zn²⁺+H₂ yönü için hangisi doğrudur?",
        options: [
          "Zn indirgenir, H⁺ yükseltgenir; fark +0,763 V’tur.",
          "Zn yükseltgenir; standart fark −0,763 V’tur.",
          "H₂ kaynağı metal atomlarıdır.",
          "Zn yükseltgenir, H⁺ indirgenir; standart fark +0,763 V’tur.",
          "H⁺ seyirci iyon olduğu için basamağı değişmez.",
        ],
        answer: 3,
        hint: "Zn: 0 → +2; H: +1 → 0 değişimlerini izle.",
        explanation:
          "Zn elektron verir; H⁺ elektron alıp H₂’de 0 basamağına iner. E°=0−(−0,763)=+0,763 V. Asit türü ve yüzey koşulu kökte açıkça sınırlandığı için bütün asitleri aynı gazla genellemek gerekmez.",
      },
      {
        id: "f021c-metalik-aktiflik-6",
        prompt:
          "Normal ders koşulunda Cu, HCl’den H₂ çıkarmıyor. Cu’nun sıcak derişik H₂SO₄ ile verilen tepkimesinde SO₂ oluşuyor. Doğru açıklama hangisidir?",
        options: [
          "Metal+asit her durumda H₂ verdiği için SO₂ verisi olanaksızdır.",
          "Asit türü değişince elektron alan tür ve gaz ürünü değişebilir.",
          "Cu bütün ortamlarda kimyasal olarak tepkimesizdir.",
          "Her iki gazın formülü aynı olduğu için fark yoktur.",
          "HCl’de gaz yoksa Cu mutlaka bazdır.",
        ],
        answer: 1,
        hint: "Yükseltgen asitte yalnız H⁺’nin indirgeneceği varsayılmaz.",
        explanation:
          "Verilen sülfürik asit koşulunda S’nin indirgenmesi SO₂’ye götürebilir; HCl ile aynı H₂ kuralı kullanılmaz. Cu’nun bir ortamda H₂ vermemesi bütün asitlere dayanıklı olduğu anlamına gelmez.",
      },
      {
        id: "f021c-metalik-aktiflik-7",
        prompt:
          "Zn²⁺/Zn=−0,763 V ve Cu²⁺/Cu=+0,337 V. Yalnız bu çiftlerin ideal standart redoksu inceleniyor. Cu metali+Zn²⁺ yönü için ne söylenebilir?",
        options: [
          "Standart fark +1,100 V; Cu, Zn’den daha güçlü elektron vericidir.",
          "Cu’nun kütlesi iki kat olursa fark kesin pozitif olur.",
          "Zn²⁺ bir metal atomudur ve elektron verici olmalıdır.",
          "Katsayı 1 olduğu için potansiyel hesaplanamaz.",
          "Standart fark −1,100 V’tur; bu yazılan yer değiştirme yönü desteklenmez.",
        ],
        answer: 4,
        hint: "Kap veya çubuk metali Cu verici; çözeltideki Zn²⁺ alıcı olur.",
        explanation:
          "E°=−0,763−0,337=−1,100 V. Bu dar standart kıyas, Cu metalinin Zn²⁺’yi bu yönde indirgeyen güçlü aday olmadığını gösterir. Gerçek saklama koşullarında başka reaksiyonlar ayrıca gerekir; soru onları dışlamıştır.",
      },
      {
        id: "f021c-metalik-aktiflik-8",
        prompt:
          "Aynı saf metal/iyon çifti 25 °C’de, aynı iyon etkinliği ve gaz koşullarıyla karşılaştırılıyor. Metal elektrodun kütlesi artırılıyor. Hangi yorum doğrudur?",
        options: [
          "Standart potansiyel kütleyle doğru orantılı artar.",
          "İndirgenme değeri katsayı kadar bölünür.",
          "Metal miktarı arttığı için iyon yükü değişir.",
          "Standart potansiyel değişmez; tepkime stoku veya yüzey ayrı etkilenebilir.",
          "E° mutlaka işaret değiştirir.",
        ],
        answer: 3,
        hint: "Standart gerilim ile eldeki madde miktarını ayır.",
        explanation:
          "Aynı çiftin standart değeri metal kütlesiyle büyüyen bir toplam nicelik değildir. Daha çok madde kapasiteyi, yüzey de uygun durumda hızı etkileyebilir. Sabit verilen koşullarda bu, E°’yi artırmak anlamına gelmez.",
      },
      {
        id: "f021c-metalik-aktiflik-9",
        prompt:
          "Bir metal–iyon çifti için verilen standart tepkime E°>0. Metalin yüzeyinde koruyucu tabaka var ve kısa sürede gözlenen değişim çok küçük. Hangi sonuç zorunludur?",
        options: [
          "Pozitif E° kesin yanlıştır; her istemli tepkime anında tamamlanır.",
          "Koruyucu tabaka atomların yük korunmasını geçersiz yapar.",
          "Termodinamik yön ile gözlenen hız ayrı değerlendirilmelidir.",
          "Kısa sürede az değişim, E°’nin kütleye bağlı olduğunu kanıtlar.",
          "Bu gözlem bütün metallerin aktifliğinin aynı olduğunu gösterir.",
        ],
        answer: 2,
        hint: "Yüzey engeli denge verisiyle aynı bilgi midir?",
        explanation:
          "E° verilen standart yöndeki termodinamik eğilimi anlatır. Pasif yüzey ve kinetik engel gözlenen hızı sınırlayabilir; kısa süreli gözlem tek başına standart değeri çürütmez. Soruda anında veya tam tüketim koşulu verilmemiştir.",
      },
      {
        id: "f021c-metalik-aktiflik-10",
        prompt:
          "Verilen koşullarda Cl₂+2 Br⁻ → 2 Cl⁻+Br₂ yönü gerçekleşiyor. Bu denklemde hangi yorum doğrudur?",
        options: [
          "Cl₂ elektron alan yükseltgen; Br⁻ elektron veren indirgendir.",
          "Cl₂ elektron veren indirgendir.",
          "Br⁻ zaten iyon olduğu için basamağı değişemez.",
          "Her Cl atomu 0’dan +1’e çıkar.",
          "Elektron alma ve verme olmadığı için redoks değildir.",
        ],
        answer: 0,
        hint: "Cl 0→−1, Br −1→0 değişimlerini izle.",
        explanation:
          "Cl₂ indirgenerek Cl⁻ olur ve yükseltgen rolündedir. Br⁻ yükseltgenerek Br₂ olur, indirgendir. Bu ametal örneğinde metalin elektron verme sırasını ezberden taşımak yerine doğrudan verilen değişimler okunur.",
      },
    ],
  },
];

export const forge021ChemistryTopics: Record<string, string> = {
  "cozunurluk-faktorleri": "detail-437",
  "redoks-denklestirme": "detail-438",
  "metalik-aktiflik": "detail-439",
};
export const forge021ChemistryGuides: LessonGuide[] = guidesData021;
export const forge021ChemistryLessons: Lesson[] = lessonData021.map((data) => {
  const guide = guidesData021.find((g) => g.id === data.id)!;
  const questions: Question[] = data.questions.map((q) => ({
    id: q.id,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    skill: data.id,
  }));
  return {
    id: data.id,
    subjectId: "ayt-kimya",
    title: txt(data.title),
    minutes: data.minutes,
    objectives: data.objectives.map(txt),
    source: txt(guide.source),
    tags: ["kaynakli", "etkilesimli", "forge021"],
    body: guide.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions,
  };
});
