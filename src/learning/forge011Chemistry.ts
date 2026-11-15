import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const section = (title: string, ...paragraphs: string[]): GuideSection => ({
  title,
  paragraphs,
});
const example = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map((explanation, i) => ({
    label: ["Veriyi ayır", "İlişkiyi uygula", "Sonucu yorumla"][i],
    explanation,
  })),
  answer,
  check,
  pitfall,
});

export const namingElements = [
  { symbol: "C", name: "Karbon", second: "karbür" },
  { symbol: "N", name: "Azot", second: "nitrür" },
  { symbol: "P", name: "Fosfor", second: "fosfür" },
  { symbol: "S", name: "Kükürt", second: "sülfür" },
  { symbol: "O", name: "Oksijen", second: "oksit" },
  { symbol: "F", name: "Flor", second: "florür" },
  { symbol: "Cl", name: "Klor", second: "klorür" },
] as const;
export const countPrefixes = [
  "",
  "mono",
  "di",
  "tri",
  "tetra",
  "penta",
  "hekza",
  "hepta",
  "okta",
  "nona",
  "deka",
];
const subscript = (n: number) =>
  n === 1
    ? ""
    : String(n).replace(/\d/g, (digit) => "₀₁₂₃₄₅₆₇₈₉"[Number(digit)]);
export const namingExamples = [
  { id: "co", first: "C", second: "O", n: 1, m: 1 },
  { id: "co2", first: "C", second: "O", n: 1, m: 2 },
  { id: "n2o4", first: "N", second: "O", n: 2, m: 4 },
  { id: "n2o5", first: "N", second: "O", n: 2, m: 5 },
  { id: "pcl3", first: "P", second: "Cl", n: 1, m: 3 },
  { id: "sf6", first: "S", second: "F", n: 1, m: 6 },
  { id: "of2", first: "O", second: "F", n: 1, m: 2 },
] as const;
export function covalentName(
  firstSymbol: string,
  secondSymbol: string,
  n: number,
  m: number,
) {
  const first = namingElements.find((e) => e.symbol === firstSymbol),
    second = namingElements.find((e) => e.symbol === secondSymbol);
  if (
    !first ||
    !second ||
    first === second ||
    ![n, m].every((v) => Number.isInteger(v) && v >= 1 && v <= 10)
  )
    throw new RangeError("NAMING_SCOPE");
  const firstName =
    n === 1
      ? first.name
      : countPrefixes[n] + first.name.toLocaleLowerCase("tr");
  const secondName =
    second.symbol === "O" && m === 1
      ? "monoksit"
      : countPrefixes[m] + second.second;
  return {
    formula: first.symbol + subscript(n) + second.symbol + subscript(m),
    name: firstName + " " + secondName,
    atoms: n + m,
    firstCount: n,
    secondCount: m,
  };
}
export type ParticleId =
  "water" | "hcl" | "oxygen" | "argon" | "sodium" | "chloride";
export const interactionParticles: {
  id: ParticleId;
  formula: string;
  kind: "polar" | "apolar" | "ion";
  charge: number;
}[] = [
  { id: "water", formula: "H₂O", kind: "polar", charge: 0 },
  { id: "hcl", formula: "HCl", kind: "polar", charge: 0 },
  { id: "oxygen", formula: "O₂", kind: "apolar", charge: 0 },
  { id: "argon", formula: "Ar", kind: "apolar", charge: 0 },
  { id: "sodium", formula: "Na⁺", kind: "ion", charge: 1 },
  { id: "chloride", formula: "Cl⁻", kind: "ion", charge: -1 },
];
export function interactionFor(leftId: string, rightId: string) {
  const left = interactionParticles.find((p) => p.id === leftId),
    right = interactionParticles.find((p) => p.id === rightId);
  if (!left || !right) throw new RangeError("INTERACTION_SCOPE");
  const kinds = [left.kind, right.kind];
  if (kinds.every((k) => k === "ion"))
    return {
      label:
        left.charge * right.charge < 0
          ? "İyon–iyon çekimi"
          : "İyon–iyon itmesi",
      london: false,
      weak: false,
      explanation:
        "İki net yüklü iyon seçildi. Bu çift iyon–dipol değildir; nötr molekülün δ kutbu yoktur.",
    };
  if (kinds.includes("ion"))
    return kinds.includes("polar")
      ? {
          label: "İyon–dipol",
          london: false,
          weak: true,
          explanation:
            "Bir net yüklü iyon ile bir kalıcı dipol eşleşir. Su, katyona O ucunu; anyona H uçlarını yöneltme eğilimindedir.",
        }
      : {
          label: "İyon–indüklenmiş dipol",
          london: false,
          weak: true,
          explanation:
            "İyonun alanı apolar komşunun elektron dağılımını değiştirir. Bu sınıflama tek başına iyi çözünürlük kanıtı değildir.",
        };
  if (kinds.every((k) => k === "apolar"))
    return {
      label: "London",
      london: true,
      weak: true,
      explanation:
        "Kalıcı kutup bulunmaz; ilişkili anlık ve indüklenmiş dipoller çekime katkı verir.",
    };
  if (kinds.every((k) => k === "polar"))
    return {
      label:
        leftId === "water" && rightId === "water"
          ? "Hidrojen bağı"
          : "Dipol–dipol",
      london: true,
      weak: true,
      explanation:
        leftId === "water" && rightId === "water"
          ? "O–H vericisi ile komşu O alıcısı özel bir hidrojen bağı kurabilir. London katkısı da sürer."
          : "Kalıcı kutupların uygun yönlenmesi çekim sağlar. London katkısı ortadan kalkmaz; HCl TYT hidrojen-bağı vericisi değildir.",
    };
  return {
    label: "Dipol–indüklenmiş dipol",
    london: true,
    weak: true,
    explanation:
      "Polar komşu, apolar tanecikte geçici kutuplanma oluşturur. Nötr çiftin London katkısı da vardır.",
  };
}
// A nearby net ion fixes the direction of the induced dipole too; the
// transient-moment control must not reverse an induced response to that ion.
export function interactionPoles(
  leftId: string,
  rightId: string,
  position: number,
  instant: number,
) {
  const pair = [leftId, rightId].map((id) =>
    interactionParticles.find((p) => p.id === id),
  );
  if (
    !pair[0] ||
    !pair[1] ||
    ![0, 1].includes(position) ||
    ![0, 1].includes(instant)
  )
    throw new RangeError("INTERACTION_POLES_SCOPE");
  const selected = pair[position]!,
    other = pair[1 - position]!;
  if (selected.kind === "ion") return null;
  const plusLeft =
    other.kind === "ion"
      ? other.charge < 0 === (position === 1)
      : instant === 0;
  return { left: plusLeft ? "δ+" : "δ−", right: plusLeft ? "δ−" : "δ+" };
}
export const hydrogenPartners = [
  {
    id: "water",
    formula: "H₂O",
    structure: "H–O–H",
    atom: "O",
    donors: 2,
    acceptors: 2,
  },
  {
    id: "methanol",
    formula: "CH₃OH",
    structure: "CH₃–O–H",
    atom: "O",
    donors: 1,
    acceptors: 2,
  },
  {
    id: "ether",
    formula: "CH₃OCH₃",
    structure: "CH₃–O–CH₃",
    atom: "O",
    donors: 0,
    acceptors: 2,
  },
  {
    id: "ammonia",
    formula: "NH₃",
    structure: "H₃N:",
    atom: "N",
    donors: 3,
    acceptors: 1,
  },
  {
    id: "hf",
    formula: "HF",
    structure: "H–F",
    atom: "F",
    donors: 1,
    acceptors: 3,
  },
  {
    id: "hcl",
    formula: "HCl",
    structure: "H–Cl",
    atom: "Cl",
    donors: 0,
    acceptors: 0,
  },
  {
    id: "methane",
    formula: "CH₄",
    structure: "CH₄",
    atom: "C",
    donors: 0,
    acceptors: 0,
  },
] as const;
export function hydrogenBond(
  leftId: string,
  rightId: string,
  aligned: boolean,
) {
  const left = hydrogenPartners.find((m) => m.id === leftId),
    right = hydrogenPartners.find((m) => m.id === rightId);
  if (!left || !right) throw new RangeError("HYDROGEN_SCOPE");
  const forward = left.donors > 0 && right.acceptors > 0,
    reverse = right.donors > 0 && left.acceptors > 0;
  return {
    left,
    right,
    forward,
    reverse,
    capable: forward || reverse,
    formed: (forward || reverse) && aligned,
    donor: forward ? left : reverse ? right : undefined,
    acceptor: forward ? right : reverse ? left : undefined,
  };
}
export const changeCases = [
  {
    id: "evaporation",
    title: "Suyun buharlaşması",
    before: "2H₂O(s)",
    after: "2H₂O(g)",
    kind: "Fiziksel",
    hydrogen: 4,
    oxygen: 2,
    explanation:
      "H₂O birimleri korunur; moleküller arası uzaklık ve düzen değişir. O–H bağları buharlaşma için koparılmaz.",
  },
  {
    id: "electrolysis",
    title: "Suyun elektrolizi",
    before: "2H₂O(s)",
    after: "2H₂(g) + O₂(g)",
    kind: "Kimyasal",
    hydrogen: 4,
    oxygen: 2,
    explanation:
      "H ve O atomları korunur; H₂O yerine H₂ ve O₂ türleri oluşur. Bağ ortakları değişir.",
  },
  {
    id: "formation",
    title: "Su oluşumu",
    before: "2H₂(g) + O₂(g)",
    after: "2H₂O(g)",
    kind: "Kimyasal",
    hydrogen: 4,
    oxygen: 2,
    explanation:
      "Başlangıç ve ürünün tümü gaz olsa da tür listesi farklıdır. Faz etiketinin aynı olması fiziksel değişim kanıtı değildir.",
  },
] as const;
export function changeEvidence(id: string, after: boolean) {
  const item = changeCases.find((c) => c.id === id);
  if (!item) throw new RangeError("CHANGE_SCOPE");
  return {
    ...item,
    species: after ? item.after : item.before,
    waterUnits:
      id === "formation"
        ? after
          ? 2
          : 0
        : id === "electrolysis"
          ? after
            ? 0
            : 2
          : 2,
    separated: id === "evaporation" && after,
  };
}
export function waterHeating(energy: number) {
  // One gram, 0°C ice, constant 1 atm, no heat losses; textbook rounded constants.
  if (!Number.isFinite(energy) || energy < 0 || energy > 3208)
    throw new RangeError("PHASE_SCOPE");
  let solid = 0,
    liquid = 0,
    gas = 0,
    temperature = 0,
    phase = "";
  if (energy < 334) {
    solid = 1 - energy / 334;
    liquid = energy / 334;
    phase = energy === 0 ? "Katı" : "Katı + sıvı";
  } else if (energy <= 752) {
    liquid = 1;
    temperature = (energy - 334) / 4.18;
    phase = "Sıvı";
  } else if (energy < 3008) {
    temperature = 100;
    gas = (energy - 752) / 2256;
    liquid = 1 - gas;
    phase = "Sıvı + gaz";
  } else {
    gas = 1;
    temperature = 100 + (energy - 3008) / 2;
    phase = "Gaz";
  }
  return { energy, temperature, solid, liquid, gas, phase };
}

const namingGuide: LessonGuide = {
  id: "kovalent-adlandirma-metalik-bag",
  minutes: 65,
  objectives: [
    "İki elementli molekülün adını atom sayılarıyla kur ve adı formüle geri çevir.",
    "Sayı ön eklerini iyonik adlandırmadan ve katsayıdan ayır.",
    "Metalik örgüde taşıyıcı elektronları ve şekillendirilebilirliği aynı modelle açıkla.",
  ],
  sections: [
    section(
      "İlk karar: hangi yapıyı adlandırıyorsun?",
      "N₂ aynı elementin iki atomundan oluşan element molekülüdür; NO₂ iki farklı elementin moleküler bileşiğidir. NaCl ise bağımsız NaCl moleküllerinden oluşan küçük birimler topluluğu olarak ele alınmaz: katıdaki Na⁺ ve Cl⁻ iyonları örgü kurar. Cu parçası metalik yapıdadır. Bir sembolün metal olup olmadığını kontrol etmeden sayı ön eklerine geçme.",
      "Formülün alt indisi molekül içindeki atom sayısını, solundaki katsayı molekül sayısını bildirir. 3NO₂ toplam üç N ve altı O atomu içerir; tek molekülün adı yine azot dioksittir. Formülün yazılmayan alt indisi 1’dir. Formül birimini, birim hücreyi ve gerçek bir molekülü aynı kavram sayma: birim hücre kristalin tekrarlayan geometrik birimidir.",
    ),
    section(
      "Sayı ön ekleri bir sayma dilidir",
      "Mono, di, tri, tetra ve penta sırasıyla 1–5; hekza, hepta, okta, nona ve deka 6–10 atomu belirtir. Ön eki hemen arkasındaki elemente bağla. Diazot pentaoksitte di azota, penta oksijene aittir: N₂O₅. Toplam atom sayısı 2+5=7’dir; ön ekler atom numarası veya iyon yükü değildir.",
      "Bu ünitede iki elementli, yaygın moleküler formüller üzerinden ilerliyoruz. Molekül formülünü en küçük orana sadeleştirme: N₂O₄ ile NO₂ aynı atom oranına sahip olsa da farklı moleküllerdir. Verilen ad molekülü tanımlıyorsa gerçek alt indisler korunur; bileşimin en basit oranını isteyen soru farklıdır.",
    ),
    section(
      "Formülden adı adım adım üret",
      "Önce ilk elementin adını söyle; tek atomsa ilk mono çoğunlukla yazılmaz. İkinci element için sayı ön ekini ve uygun son adı kullan: O oksit, F florür, Cl klorür, Br bromür, S sülfür, N nitrür. CO karbon monoksit, CO₂ karbon dioksit; PCl₃ fosfor triklorür olur. İkinci mono, CO ile CO₂ ayrımında bilgi taşır.",
      "O içeren her formülün sonu oksit değildir. OF₂’de oksijen ilk, flor ikinci sıradadır; ad oksijen diflorürdür. Kimyasal sembollerde büyük-küçük harf de önemlidir: CO iki elementi, Co kobalt elementini temsil eder. Her adı formüle geri okuyarak sıra ve sayıyı denetle.",
    ),
    section(
      "Addan formüle ve toplam atom sayısına dön",
      "Diklor heptaoksitte iki Cl ve yedi O vardır: Cl₂O₇. Kükürt hekzaflorürde bir S ve altı F vardır: SF₆. İlkinde toplam dokuz, ikincisinde yedi atom bulunur. Bir adın ilk parçasında ön ek yoksa bu örneklerde 1 alınır; ikinci ön ek doğrudan ikinci alt indis olur.",
      "İki SF₆ molekülü toplam iki S ve on iki F içerir. 2SF₆ yazmak ile SF₁₂ yazmak aynı değildir: ilkinde iki ayrı molekül, ikincisinde bambaşka bir molekül formülü iddiası vardır. Soruda molekül sayısı, tek moleküldeki atom sayısı ve toplam atom sayısını ayrı satırlarda tut.",
    ),
    section(
      "Yaygın adlar ve iyonik adlandırmanın sınırı",
      "H₂O su, NH₃ amonyak, CH₄ metan yaygın adlarıyla tanınır; HCl’nin gaz hâli hidrojen klorürdür, sulu çözeltisinin asit adı ayrı bağlam taşır. H₂SO₄ ve HNO₃ gibi çok elementli asitleri iki elementli sayı ön eki şemasına zorlamayız. Bazı kaynaklarda ilk/ikinci mono kullanımında adlandırma gelenekleri değişebilir; verilen açık koşulu ve yaygın kabulü gözet.",
      "Na₂O iyonik sodyum oksittir; ‘disodyum monoksit’ biçiminde molekül sayımı yapılmaz. MgCl₂ magnezyum klorürdür. İyonik adlandırmada yük dengesi ve gerektiğinde metalin yükseltgenme basamağı gerekir; burada kullandığımız molekül ön ekleri iyon yükünün yerine geçmez. Yapı türünü ilk adımda ayırmak iki konuyu karıştırmayı önler.",
    ),
    section(
      "Elektron denizi modeli neyi temsil eder?",
      "Metalde değerlik elektronlarının bir bölümü çok sayıda merkez üzerinde yayılabilir. Pozitif metal merkezleri çekirdeklerle iç elektronları; elektron denizi ise bağlanmaya katılan yayılmış elektronları temsil eder. Pozitif merkezlerle bu elektron yoğunluğu arasındaki elektriksel çekim metalik bağın temel açıklamasıdır. Parçanın bütünü yüksüz olabilir.",
      "Modeldeki artı merkezler, saf metalin suya bırakılmış serbest iyonlar çözeltisi olduğu anlamına gelmez. Noktalar da ölçülmüş elektron yörüngesi veya her an sabit bir konum değildir. İki belirli atom arasında yerelleşmiş bir bağ çizgisi yerine bütün örgüye yayılmış bağlanma fikri kullanılır. Metal gazındaki tek atomlarla metalik yoğun fazı ayır.",
    ),
    section(
      "Akım, parlaklık ve ısı aktarımı",
      "Bir elektrik alan uygulandığında hareketli elektronların yönlü katkısı elektrik akımı oluşturabilir. Katı telde metal merkezlerinin baştan sona göç etmesi gerekmez. Elektronlar ısı aktarımına da katkı verir; temiz yüzeyde ışığa verdikleri tepki metalik parlaklığın açıklamasında yer alır. Akımı taşıyan taneciği, örneğin fazıyla birlikte söyle.",
      "Katı bakırdaki elektron hareketi ile erimiş NaCl’deki iyon hareketi farklı mekanizmalardır. İkisi de iletebildiği için ‘iletiyor, öyleyse metal’ çıkarımı geçersizdir. Grafit de tabakalı kovalent yapısına rağmen elektronlarla iletebilir. Tek gözlem yerine bileşim, örgü ve taşıyıcı bilgisini birlikte değerlendir.",
    ),
    section(
      "Levha bükülürken bağlanma neden sürer?",
      "Uygun koşullarda metal katmanları kaydığında yayılmış elektron yoğunluğu yeni düzene uyum sağlayabilir. Merkezleri bir arada tutan çekim bir çift atomun eski yönüne bağlı kalmadığı için tel ve levha hâline getirilebilme açıklanır. Bu model bütün metallerin her sıcaklıkta aynı derecede yumuşak olduğunu söylemez; gerçek yapı ve kusurlar etkilidir.",
      "Karşılaştırılabilir basit metal modellerinde aynı elektron katkısıyla daha küçük merkez yarıçapı daha kuvvetli çekim eğilimi verebilir. Ancak elektron katkısı, yapı ve yarıçap birlikte değişirse yalnız birine bakarak bütün erime noktalarını kesin sıralama. Alaşım yapmak da her zaman yeni tek bir kimyasal bileşik oluşması değildir; hangi alaşım yapısının verildiğini oku.",
    ),
  ],
  examples: [
    example(
      "Molekül adını geri oku",
      "PCl₃ ve N₂O₄ moleküllerini adlandır; her birinin toplam atom sayısını bul.",
      "Sembolleri, alt indisleri ve ikinci element adını ayrı belirle.",
      [
        "P fosfor, Cl klor; P sayısı 1, Cl sayısı 3’tür. N₂O₄’te iki N ve dört O bulunur.",
        "PCl₃: fosfor triklorür; N₂O₄: diazot tetraoksit. İlk tek atomdaki mono yazılmaz.",
        "Toplamlar 1+3=4 ve 2+4=6’dır. N₂O₄’ü NO₂’ye indirgemeden geri oku.",
      ],
      "Fosfor triklorür: 4 atom; diazot tetraoksit: 6 atom.",
      "Tri üç Cl, tetra dört O verir; adlar formülleri aynen geri üretir.",
      "Molekül formülünü oran gibi sadeleştirme.",
    ),
    example(
      "Ön ek mi, katsayı mı?",
      "Üç kükürt hekzaflorür molekülünde toplam kaç F ve toplam kaç atom vardır?",
      "Önce bir molekülün formülünü bul, sonra bütün molekülü üçle çarp.",
      [
        "Hekza altıdır: tek molekül SF₆, bir S ve altı F içerir.",
        "Üç molekül 3SF₆ biçimindedir; F sayısı 3×6=18’dir.",
        "Her molekül yedi atom taşır; 3×7=21 atom vardır.",
      ],
      "18 F atomu ve toplam 21 atom.",
      "Üç S ve on sekiz F toplamı yirmi birdir.",
      "Soldaki 3’ü yalnız ilk elemente veya adın ön ekine bağlama.",
    ),
    example(
      "Aynı element, farklı yapı",
      "Katı Na ile katı ve erimiş NaCl’nin bağlanmasını ve akım taşıyıcısını karşılaştır.",
      "Metal elementi ile o elementi içeren iyonik bileşiği ayır.",
      [
        "Katı Na’da pozitif merkezler ve yayılmış elektronlar metalik yapı kurar.",
        "Katı NaCl iyonik örgüdür; iyonlar olağan koşullarda uzun mesafe yük taşıyacak hareket serbestisine sahip değildir.",
        "NaCl eridiğinde hareketli Na⁺ ve Cl⁻ yük taşır; Na metalindeki taşıyıcı ise elektronlardır.",
      ],
      "Na: metalik/elektron; NaCl katı: iyonik/olağan koşullarda iletmez; NaCl eriyik: iyonik/hareketli iyon.",
      "Erime NaCl’yi Na metaline dönüştürmez; faz değişirken bileşik kimliği korunur.",
      "Formülde Na görmek metalik bağ bulunduğunu kanıtlamaz.",
    ),
    example(
      "Levhanın üç özelliği",
      "Temiz bir Al levha bükülüyor, ışığı yansıtıyor ve akım iletiyor. Bir bağ modeliyle açıkla.",
      "Merkezlerin yer değiştirmesini elektronların hareket olanağından ayır.",
      [
        "Yayılmış değerlik elektronları elektrik alanında akıma katkı verir; bütün Al merkezlerinin tel boyunca ilerlemesi gerekmez.",
        "Elektronların ışığa tepkisi temiz yüzeyin parlaklığını açıklamada rol oynar.",
        "Kayma sırasında elektron yoğunluğu uyum sağlar; merkezlerle çekim sürdüğü için levha şekil alabilir.",
      ],
      "Elektron denizi modeli üç gözlemi birlikte açıklar.",
      "Işık yansıtan her yüzeyin metal olması gerekmez; açıklama Al’ın bilinen metal yapısına dayanır.",
      "Bir özelliği tek başına bütün maddeler için yapı kanıtı sayma.",
    ),
  ],
  recall: [
    {
      prompt: "CO ile Co neden farklıdır?",
      answer:
        "CO karbon monoksit formülüdür; Co kobaltın tek element sembolüdür.",
    },
    {
      prompt: "N₂O₄ neden NO₂ diye sadeleştirilmez?",
      answer:
        "Molekülün gerçek atom sayısı değişir; en basit oran ile molekül formülü aynı görevde değildir.",
    },
    {
      prompt: "Katı metalde elektrik yükünü kim taşır?",
      answer:
        "Yayılmış hareketli elektronlar; pozitif merkezlerin tel boyunca göçü gerekmez.",
    },
    {
      prompt: "Na₂O’ya neden sayı ön ekleriyle ad vermiyoruz?",
      answer:
        "İyonik yapıdaki yük dengesi ve katyon–anyon adı kullanılır; ayrı molekül sayımı yapılmaz.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri, basılı s.39; OGM 9. Sınıf Güçlü Etkileşimler V–Metalik Bağ özeti; Aurelia 019 Adlandırma ve Metalik Bağ, öğretim s.1–6 ile karşılaştırılan özgün anlatım, şekil ve alıştırmalar. Resmî sınav sorusu kopyası değildir.",
};

const weakGuide: LessonGuide = {
  id: "zayif-etkilesimler",
  minutes: 65,
  objectives: [
    "Sorulan iki taneciği iyon, polar ve apolar olarak sınıflandır.",
    "Kalıcı dipol, indüklenmiş dipol ve London katkısını birlikte değerlendir.",
    "Kaynama ve çözünme yorumlarında basınç, yapı ve enerji sınırlarını belirt.",
  ],
  sections: [
    section(
      "Etkileşimi adlandırmadan önce çifti yaz",
      "Bir su molekülünün içindeki O–H bağı ile iki su molekülü arasındaki çekim aynı değildir. İlki atomları molekül hâlinde tutan kovalent bağdır; ikincisi farklı moleküllerin birbirini etkilemesidir. Sorudaki ‘atomlar arası’, ‘moleküller arası’ ve ‘iyon–çözücü’ sözcükleri hangi iki taneciği karşılaştırdığını belirler.",
      "Saf maddede aynı tür iki komşuyu, karışımda işaret edilen farklı çiftleri seç. NaCl kristalinde Na⁺···Cl⁻ çekimi iyon–iyondur; çözeltide Na⁺···H₂O çiftinin karakteristik etkileşimi iyon–dipoldür. Aynı deneyde farklı etkileşimlerin bulunması mümkündür. Bir etiketi bütün karışıma tek seçenek olarak yayma.",
    ),
    section(
      "Net yük ile kısmi kutup farklı bilgidir",
      "Na⁺ net +1, Cl⁻ net −1 yüklü iyondur. HCl ise toplamda yüksüz olmasına rağmen H ucunda δ+, Cl ucunda δ− taşır. δ işareti elektronun tamamının bir taneciğe aktarıldığını göstermez; elektron yoğunluğu eşit dağılmıyordur. Yüksüz olmak apolar olmak değildir.",
      "Molekülün net dipolü için bağ kutupluluğu ve geometri birlikte gerekir. Doğrusal CO₂’nin iki eş C=O dipolü birbirini götürür; açılı H₂O’da aynı tür dengeleme olmaz. Polar bağları olan apolar moleküller vardır. Önce molekülün tamamını sınıflandır, sonra komşusuyla çift oluştur.",
    ),
    section(
      "Elektron bulutu geçici olarak kutuplanabilir",
      "Elektron dağılımındaki anlık asimetri, komşunun dağılımıyla ilişkili değişim oluşturabilir. Bu bağlı anlık/indüklenmiş dipoller arasındaki çekim London etkileşiminin temelidir. Ayrı nötr atomlar ve moleküller için bu katkı vardır; kalıcı dipol bulunması London’ı ortadan kaldırmaz.",
      "Soy gaz atomları ve apolar molekül çiftlerinde TYT düzeyindeki temel sınıflama London’dır. Ne···Ne ve O₂···O₂ örneklerinde kalıcı dipol yoktur. ‘London vardır’ ile ‘yalnız London vardır’ ayrı yargılardır: HCl çiftinde hem London hem kalıcı dipol katkısı bulunur.",
    ),
    section(
      "Polar–polar çift: dipol–dipol",
      "Kalıcı dipollü iki molekül uygun yönlendiğinde birinin kısmi artı ucu ötekinin kısmi eksi ucuyla çekişebilir. HCl···HCl ve HBr···HBr bu sınıfa örnektir. Çizimde bütün molekülleri her an kusursuz hizalı göstermek gerçek sıvının sürekli tek düzende kaldığı anlamına gelmez; model uygun komşu yönlenmeyi ayırır.",
      "Hidrojen bağı, belirli verici ve alıcı koşulları bulunan özel bir etkileşimdir; HCl’de H bulunması tek başına bu koşulu sağlamaz. H₂O···H₂O’da O–H vericisi ve komşu O elektron çifti hidrojen bağını mümkün kılar. Bu seçilmiş çifti adlandırmak diğer fiziksel katkıların yokluğu iddiası değildir.",
    ),
    section(
      "İyon–polar çift: iyon–dipol",
      "Bir iyonun elektrik alanı polar molekülün kutuplarıyla etkileşir. Suyun O tarafı δ− olduğu için Na⁺ çevresinde O ucu, Cl⁻ çevresinde ise H uçları daha uygun yönlenir. Su moleküllerinin iyonu çevrelemesi hidratlaşmadır. Hidratlaşmış iyonu yeni, ayrı bir NaCl molekülü sayma.",
      "Çözünme yalnız yeni iyon–su çekiminden ibaret değildir: başlangıç kristalini ve çözücü komşuluklarını ayırmanın enerji gereksinimi ile karışma koşulları da etkilidir. Dolayısıyla ‘iyon–dipol var, bütün tuzlar suda aynı miktarda çözünür’ çıkarımı yanlıştır. Çift sınıflaması ile makroskopik çözünürlük sonucunu ayır.",
    ),
    section(
      "Kalıcı kaynak apolar komşuyu indükler",
      "Polar H₂O ile apolar O₂ çiftinde suyun alanı O₂’nin elektron dağılımını kutuplaştırabilir. Karakteristik etkileşim dipol–indüklenmiş dipoldür. Başlangıçta O₂’ye kalıcı δ işaretleri yapıştırmak yerine indüklenmiş dipolün komşu ve yönlenme koşullarına bağlı olduğunu belirt.",
      "Na⁺ ile Ar çiftinde kaynak molekül dipolü değil net iyon yüküdür; ad iyon–indüklenmiş dipoldür. Bu modelin bulunabilmesi iyonik tuzların apolar çözücülerde iyi çözüneceği anlamına gelmez. Derslerde van der Waals kapsamı değişik genişlikte kullanılabilir; burada OGM/MEBİ’nin tanecik eşleşmelerini açık adlarla kullanıyoruz.",
    ),
    section(
      "London eğilimini koşullarıyla karşılaştır",
      "Benzer yapılı Cl₂, Br₂ ve I₂ serisinde elektron bulutu büyüyüp daha kolay kutuplanabildikçe London çekiminin toplam katkısı genellikle artar. Aynı dış basınçta kaynama sıcaklığı eğilimi I₂>Br₂>Cl₂’dir. Burada şekil benzerliği ve aynı basınç karşılaştırmanın parçasıdır; yalnız formül kütlesinden evrensel bağıntı kurulmaz.",
      "Aynı kapalı formüle sahip farklı molekül şekillerinde temas yüzeyi değişebilir. Uzun ve daha çok temas edebilen biçimle kompakt biçimin London katkıları aynı olmak zorunda değildir. Hidrojen bağı olan her molekülün bütün apolar moleküllerden yüksek sıcaklıkta kaynayacağı da doğru değildir. Verilmiş ölçüm, toplam yapı ve basınç bilgisi basit etiket sırasının önündedir.",
    ),
    section(
      "Enerji sayısını ve gözlenen olayı ayrı oku",
      "kJ/mol, tanımlanan bir mol olay başına enerji miktarıdır. Yaklaşık 40 kJ/mol okul metinlerinde güçlü–zayıf için kaba bir ipucu olabilir; fiziksel–kimyasal ayrımında kesin eşik değildir. Suyun yaklaşık 44 kJ/mol enerji alarak buharlaşması H₂O’yu başka kimyasal türe dönüştürmez. Buna karşılık H₂’nin atomlara ayrılması kimyasal tür değişimidir.",
      "Kaynama, sıvının denge buhar basıncının dış basınca ulaştığı koşulla ilişkilidir. Aynı madde düşük dış basınçta daha düşük sıcaklıkta kaynayabilir; bu yüzden iki farklı basınçtaki sıcaklıkları doğrudan çekim gücü sıralaması olarak okuyamazsın. Soruyu çözerken önce çift, sonra yapı, son olarak sabit koşullar ve gözlenen makro özellik yolunu izle.",
    ),
  ],
  examples: [
    example(
      "Aynı çözücüde farklı komşu",
      "Suda O₂ ve Na⁺ bulunuyor. O₂–H₂O ve Na⁺–H₂O çiftlerini ayrı sınıflandır.",
      "Net yükü ve kalıcı dipolü iki ayrı sütunda yaz.",
      [
        "O₂ iki aynı atomlu apolar moleküldür; H₂O açılı ve polardır.",
        "O₂–H₂O çifti dipol–indüklenmiş dipol etkileşimine uygundur.",
        "Na⁺ net yüklü, H₂O kalıcı dipollü olduğundan ikinci çift iyon–dipoldür.",
      ],
      "Sırasıyla dipol–indüklenmiş dipol ve iyon–dipol.",
      "O₂’yi yüklü iyon, Na⁺’ı nötr dipol olarak sınıflandırmadığını kontrol et.",
      "Aynı çözücüye bakıp tüm çözünenlere tek etiket verme.",
    ),
    example(
      "‘Yalnız’ sözcüğünün etkisi",
      "Saf Ne, CO₂ ve HCl örneklerinden hangilerinde nötr komşular arasında yalnız London temel çekimi vardır?",
      "Molekülün tamamının net dipolünü belirle.",
      [
        "Ne tek atomlu ve kalıcı dipolsüzdür; doğrusal CO₂’de eş dipoller dengelenir.",
        "HCl’nin farklı atomları kalıcı kutuplanma oluşturur; saf fazda dipol–dipol katkısı vardır.",
        "London üçünde de bulunur, fakat HCl’de tek katkı değildir.",
      ],
      "Ne ve CO₂.",
      "CO₂’nin polar bağlarını molekülün apolar toplamıyla karıştırma.",
      "Polar moleküllerde London yoktur deme.",
    ),
    example(
      "Elektron sayısından koşullu eğilim",
      "Aynı basınçta Cl₂, Br₂, I₂ benzer şekilli moleküllerdir. Atom numaraları 17,35,53. London ve kaynama eğilimini yorumla.",
      "Nötr molekül elektronlarını say ve benzer seri koşulunu koru.",
      [
        "Elektronlar sırasıyla 34,70,106’dır.",
        "Bu benzer seride büyük elektron bulutu daha kolay kutuplanma ve artan London katkısıyla ilişkilidir.",
        "Aynı dış basınç için beklenen kaynama eğilimi I₂>Br₂>Cl₂’dir.",
      ],
      "I₂>Br₂>Cl₂.",
      "Üçü de apolar olduğundan kalıcı dipol veya hidrojen bağı eklenmedi.",
      "Bu eğilimi bütün farklı şekilli moleküllere kesin yasa yapma.",
    ),
    example(
      "40 sayısını aşan fiziksel olay",
      "H₂O(s)→H₂O(g) için 44 kJ/mol veriliyor. Bu, kimyasal değişim olduğunu kanıtlar mı?",
      "Tür kimliğini enerji ölçeğinden önce denetle.",
      [
        "Başlangıç ve ürün formülü aynı H₂O’dur; değişen fazdır.",
        "Molekülleri ayırmak için enerji alınır; O–H kovalent bağlarının kopması gerekmez.",
        "44’ün 40’tan büyük olması kaba eşiğin evrensel olmadığını gösterir.",
      ],
      "Hayır; verilen olay fiziksel buharlaşmadır.",
      "Ürün H₂ ve O₂ olsaydı başka bir süreç ve başka kimlik listesi olurdu.",
      "Enerji büyüklüğünü tek başına kimlik testi sayma.",
    ),
  ],
  recall: [
    {
      prompt: "HCl’de London var mı?",
      answer:
        "Evet; kalıcı dipol katkısına ek olarak nötr molekül çiftinde London da vardır.",
    },
    {
      prompt: "Na⁺ çevresinde suyun hangi ucu yönelir?",
      answer: "Kısmi negatif O ucu.",
    },
    {
      prompt: "Na⁺–Ar neden dipol–dipol değildir?",
      answer:
        "Na⁺ net yüklü iyon, Ar kalıcı dipolsüz atomdur; iyon–indüklenmiş dipol söz konusudur.",
    },
    {
      prompt: "Kaynama sırası kurarken hangi koşulu ilk kontrol edersin?",
      answer:
        "Dış basıncın aynı olması; ardından yapı, boyut/şekil ve verilmiş deney verileri.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri basılı s.40–41; OGM 9. Sınıf Zayıf Etkileşimler I–III tek sayfalık özetleri; Aurelia 020 Zayıf Etkileşimler öğretim s.1–8. Özgün koşullu modeller ve sorular; arşivdeki resmî soru metinleri aktarılmadı.",
};

const hydrogenGuide: LessonGuide = {
  id: "hidrojen-bagi",
  minutes: 60,
  objectives: [
    "Yapı formülünde hidrojen-bağı vericisini ve uygun alıcıyı bul.",
    "Saf maddedeki komşuluk ile iki farklı molekül arasındaki teması ayır.",
    "Tek temasın gücü, ağ yapısı ve kaynama gibi toplu özellikleri birbirine karıştırma.",
  ],
  sections: [
    section(
      "Hidrojen bulunması tek başına yetmez",
      "TYT’de yaygın tanıma kuralı, H atomunun doğrudan F, O veya N atomuna kovalent bağlı olduğu bir verici grup aramaktır. Bu bağda H ucu kısmen pozitiftir. Karşı tarafta uygun, erişilebilir bir ortaklanmamış elektron çifti alıcı olabilir. İlk adım moleküldeki harfleri saymak değil H’nin hangi atoma bağlı olduğunu görmektir.",
      "H₂O’da O–H, NH₃’te N–H, HF’de H–F verici olabilir. HCl ve H₂S, bu ünitenin yaygın TYT verici koşuluna girmez. CH₄’teki C–H bağları da klasik örneklerde bu rolü üstlenmez. Bu okul tanıma kuralının daha geniş ileri kimya tanımlarının tamamını tükettiği iddia edilmez.",
    ),
    section(
      "İki çizgiyi iki farklı anlamla oku",
      "O–H···O gösterimindeki düz O–H çizgisi aynı moleküldeki kovalent bağdır. Noktalı H···O çizgisi uygun komşu molekülün alıcı O’suyla hidrojen bağını temsil eder. H kendi molekülüne kovalent bağlı kalır; çizim H atomunun iki O’ya eşdeğer iki kovalent bağla bağlandığı anlamına gelmez.",
      "Hidrojen bağında kullanılan δ+ ve δ− kısmi yüklerdir. Bunları serbest H⁺ ile O²⁻ iyonları gibi yazma. Etkileşim yalnız bir resim çizgisiyle var olmuş sayılmaz: verici, alıcı, yakınlık ve uygun yönlenme gerekir. Etkileşimli modelde ‘hizala’ eylemi bu son koşulu ayırır; çizim bir gerçek bağ enerjisi ölçümü değildir.",
    ),
    section(
      "Verici ile alıcı farklı görevlerdir",
      "Bir O atomunun elektron çiftleri taşıması alıcılık sağlayabilir; bu, aynı molekülün mutlaka O–H vericisi olduğu anlamına gelmez. Metanol CH₃–O–H hem verici hem alıcıdır. Dimetil eter CH₃–O–CH₃ ise O üzerinde uygun çift taşısa da H’leri C’ye bağlı olduğundan kendi molekülleri arasında gereken verici eksiktir.",
      "Alıcı için yalnız N/O/F harfi görmek de sınırsız bir garanti değildir; bağlanma, yük ve elektron çiftinin uygunluğu önem taşır. Buradaki model yaygın su, metanol, eter, amonyak ve HF örnekleriyle sınırlıdır. Donör H sayısı ve elektron çifti sayısı her gerçek sıvıda her an gerçekleşen bağ adedi olarak okunmaz.",
    ),
    section(
      "Saf sıvı ile karışımı ayrı incele",
      "Saf eterde iki komşu eter seçildiğinde ikisinde de verici yoktur; kendi aralarında hidrojen bağı beklenmez. Eter–su karışımında ise su O–H vericisi, eterin O’su alıcı olabilir. Saf maddedeki ‘yok’ kararını, komşu türün değiştiği karışıma taşıyamazsın.",
      "Çifti iki yönde dene: soldaki verici–sağdaki alıcı ve sağdaki verici–soldaki alıcı. Su–amonyak çiftinde iki rol dağılımı da mümkündür. Bir yönün yeterli olması etkileşimin mümkün olduğunu gösterir; iki yönün varlığı otomatik iki eşzamanlı temas sayısı değildir. Yapısal uygunluk ile gerçekleşen anlık geometriyi ayır.",
    ),
    section(
      "Kapalı formül yapının yerine geçmez",
      "Etanol CH₃CH₂OH ve dimetil eter CH₃OCH₃ aynı C₂H₆O kapalı formülünü paylaşır. Etanol O–H taşır, eter taşımaz. Aynı tür atom ve aynı atom sayısı, bağlanma düzeni farklıysa aynı fiziksel özellik veya aynı hidrojen-bağı davranışını zorunlu kılmaz.",
      "Bir soruda yalnız kapalı formül verilip birden fazla yapı mümkünse yeterli bilgi olmayabilir. Açık yapı, O–H/N–H/F–H bağlantısı veya maddenin açık adı verildiğinde karar sağlamlaşır. ‘H ve O var, öyleyse vardır’ kestirmesini doğru kabul etmeden yapıyı çiz veya metindeki bağ bilgisini bul.",
    ),
    section(
      "Tek temas ile yaygın ağın etkisi",
      "Bir hidrojen bağının enerjisi ile sıvının kaynama sıcaklığı farklı niceliklerdir. Kaynama bütün örnekteki etkileşimlerin, yapı ve basınç koşullarının sonucudur. Bir teması daha kuvvetli olan maddenin daha yüksek sıcaklıkta kaynaması zorunlu değildir; erişilebilir temas sayısı ve ağ düzeni de katkı verir.",
      "Suyun ideal tetrahedral ağında bir molekül iki H üzerinden verici, O üzerindeki iki çift üzerinden alıcı olarak dört komşu temasa katılabilir. Sıvıda her molekülün her an tam dört bağ yaptığı söylenmez. Bir temas iki molekül arasında ortak olduğundan, her komşunun sayısını toplarken aynı teması iki kere saymamak gerekir.",
    ),
    section(
      "Kaynama grafiğinde koşullu sapmayı gör",
      "Aynı 1 atm basınçta H₂S, H₂Se, H₂Te serisinde elektron bulutu büyüdükçe London katkısı ve kaynama sıcaklığı genel olarak artar. Su, daha hafif olmasına rağmen bu eğilimin çok üstündedir; hidrojen-bağı ağı farkın açıklamasında önem taşır. Grafikte −2 °C’nin −40 °C’den büyük olduğunu sayı doğrusu gibi oku.",
      "Benzer molar kütleli etanol ile dimetil eterde hidrojen-bağı farkı açıklayıcıdır; fakat bütün maddeler arasında tek bir ‘H bağı>dipol>London’ sıralamasından kesin kaynama sırası üretme. Aynı basınç, toplam yapı ve mümkünse ölçülmüş veri gerekir. Hidrojen bağı olan her madde suyla her oranda karışır sonucu da çıkmaz; apolar bölüm büyüdükçe farklı etkiler baskınlaşabilir.",
    ),
    section(
      "Buzdan biyolojik yapılara aktar",
      "Normal buzun açık hidrojen-bağı ağı, aynı su kütlesinin sıvıya göre daha büyük hacme yayılmasına katkı verir. Yoğunluk m/V olduğundan buz sıvı suda yüzebilir. Bu açıklama ‘katılar her zaman sıvılarından yoğundur’ genellemesine karşı örnektir. 0–4 °C su davranışıyla bütün sıvıların davranışını da eşitleme.",
      "Hidrojen bağları protein, DNA ve selüloz gibi yapıların düzenlenmesinde önemlidir. İki farklı molekül arasında olabildiği gibi, uygun büyük yapının kendi içinde de temas kurulabilir. Molekül içi temas ile komşular arası ağ farklı ölçeklerdir; DNA’daki bütün bağları hidrojen bağı saymak veya kovalent omurgayı yok saymak yanlış olur.",
    ),
  ],
  examples: [
    example(
      "Etanol ve eteri karşılaştır",
      "CH₃CH₂OH ile CH₃OCH₃ saf sıvılarında kendi molekülleri arasında hidrojen bağı kurulabilir mi?",
      "Aynı kapalı formülü bırak, H’nin doğrudan komşusuna bak.",
      [
        "Etanol O–H taşır; O alıcı elektron çiftleri de taşır.",
        "Eterde bütün H’ler C’ye bağlıdır. O alıcı olsa da aynı tür ikinci eterde verici yoktur.",
        "Saf etanol hidrojen bağı kurabilir; saf eterde bu koşul sağlanmaz.",
      ],
      "Etanol: evet; dimetil eter: hayır.",
      "İkisinin C₂H₆O olması bağlantı farkını ortadan kaldırmaz.",
      "Yalnız H ve O harflerini sayarak karar verme.",
    ),
    example(
      "Komşuyu değiştir, sonucu yeniden kur",
      "Dimetil eter suya karıştırıldığında eter ile su arasında hidrojen bağı mümkün mü?",
      "Verici ve alıcıyı farklı moleküllerden seç.",
      [
        "Su O–H ile H vericisidir; eterin O’sunda uygun alıcı çift bulunur.",
        "O–H···O(eter) biçiminde yönlenme mümkündür.",
        "Eterin kendi saf sıvısında verici taşımaması, su vericisiyle temasını engellemez.",
      ],
      "Evet; su verici, eter O’su alıcı olabilir.",
      "H’nin eter karbonundan koptuğunu veya eterin yeni bir O–H oluşturduğunu varsaymadık.",
      "Saf sıvı kararını karışımın farklı çiftine otomatik taşıma.",
    ),
    example(
      "Yerel ağ sayımında çift sayma",
      "İdeal bir su ağı modelinde 6 molekülün her biri dört komşu temasa katılıyor. Her temas iki molekül arasında ortaksa kaç farklı temas sayılır?",
      "Yerel katılım toplamını, ortak uç sayısına böl.",
      [
        "Altı molekülün dörder katılımı 6×4=24 uç kaydı verir.",
        "Bir temas iki komşuda birer uç olarak sayılmıştır; her kayıt bağımsız bağ değildir.",
        "Farklı temas sayısı 24/2=12’dir; bu kapalı ideal öğretim ağı varsayımına aittir.",
      ],
      "12 farklı temas.",
      "12 temasın iki ucu 24 katılım eder; sıvı için her an dört bağ varsayımı yapılmaz.",
      "Yerel dört temasla tek tek farklı bağ sayısını eşitleme.",
    ),
    example(
      "Buzun yüzmesini kütle–hacimle açıkla",
      "Aynı 90 g su için buz hacmi 100 mL, sıvı hacmi 90 mL verilmiştir. Yoğunlukları bul ve yüzme yönünü yorumla.",
      "Her faz için aynı kütleyi kendi hacmine böl.",
      [
        "Buzun yoğunluğu 90/100=0,90 g/mL’dir.",
        "Sıvının yoğunluğu 90/90=1,00 g/mL’dir.",
        "Buz daha düşük yoğunluklu olduğundan sıvı suda yüzmeye uygundur; açık ağ daha büyük hacimle uyumludur.",
      ],
      "Buz 0,90; sıvı 1,00 g/mL. Buz yüzer.",
      "Kütle aynı olduğu hâlde hacim farklıdır; hacim büyürken yoğunluk azalır.",
      "Her katı kendi sıvısından mutlaka daha yoğundur deme.",
    ),
  ],
  recall: [
    {
      prompt: "Dimetil eterin O’su alıcıyken neden saf eterde H bağı yok?",
      answer: "Her iki eterde de N/O/F’ye doğrudan bağlı H vericisi eksiktir.",
    },
    {
      prompt: "Su–eter çiftinde verici kim?",
      answer: "Suyun O–H grubu; eterin O elektron çifti alıcıdır.",
    },
    {
      prompt: "Hidrojen bağı çizgisi su içindeki O–H ile aynı mı?",
      answer:
        "Hayır; düz O–H kovalent, komşuya noktalı H···O hidrojen bağıdır.",
    },
    {
      prompt: "Dört temas ifadesi sıvı su için her an kesin mi?",
      answer:
        "Hayır; ideal yerel ağ modelidir, gerçek sıvı dinamik ve değişkendir.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri basılı s.41; OGM Zayıf Etkileşimler II hidrojen-bağı ve buz ağı şekilleri; Aurelia 021 Hidrojen Bağı öğretim s.1–8. Verici–alıcı ve ağ sınırları belirtilmiş özgün öğretim; resmî soru metni aktarılmaz.",
};

const changeGuide: LessonGuide = {
  id: "fiziksel-kimyasal-degisimler",
  minutes: 60,
  objectives: [
    "Başlangıç ve ürünlerin kimliğini, faz ve görünüş değişiminden ayır.",
    "Çözünme, gaz çıkışı ve iletkenliği tek başına tepkime kanıtı sayma.",
    "Denklemde atom ve yük korunumunu adım adım denetle.",
  ],
  sections: [
    section(
      "Kimlik ile görünüşü iki ayrı sütunda tut",
      "Fiziksel değişimde örneğin şekli, boyutu, hâli veya dağılımı değişebilir; kimyasal tür kimliği korunur. Camın kırılması, şekerin öğütülmesi ve saf suyun donması farklı görünüşler üretir. Bir parçanın küçülmesi, içerdiği moleküllerin atomlara ayrıldığı anlamına gelmez.",
      "Kimyasal değişimde yeni kimyasal türler oluşur; bağ ortakları veya elektron/yük düzeni değişebilir. Suyun elektrolizinde H₂O yerine H₂ ve O₂ oluşur. Atom türleri korunurken hangi atomların hangi tür içinde bulunduğu değişir. Çekirdek dönüşümünü bu sıradan kimyasal tepkimelerle karıştırma.",
    ),
    section(
      "Formül, katsayı ve hâl etiketini ayır",
      "H₂O(k), H₂O(s) ve H₂O(g) aynı su kimliğinin farklı fazlarıdır. Parantezdeki k katı, s sıvı, g gaz, suda ise çözünmüş anlamındadır. Formülün başındaki katsayı bütün formüle uygulanır: 2H₂O içinde dört H ve iki O atomu bulunur.",
      "Hâl etiketini geçici kapatıp tür listesini karşılaştırmak yararlı bir ilk kontroldür. Ancak kimlik yalnız kapalı formülden ibaret değildir; aynı kapalı formülle farklı bağlanma düzeni veya farklı yük olabilir. Bu düzeydeki sorularda verilen açık yapı ve yük bilgisini de denetle. Sırf iki taraf gaz diye değişimi fiziksel sayma.",
    ),
    section(
      "Hâl değişimi molekülü parçalamak değildir",
      "Su buharlaşırken moleküller arası komşuluklar ve ortalama uzaklık değişir; H₂O içindeki O–H bağları korunur. İyot süblimleşirken I₂(k)→I₂(g) olur; ayrı I atomları üretildiği söylenmez. Donma, erime, yoğuşma, süblimleşme ve kırağılaşma olağan faz değişimleridir.",
      "Fiziksel olayların tamamında yalnız zayıf etkileşimler değişir diye evrensel kural kurma. Metalin erimesi/buharlaşması metalik bağlanmanın düzenini etkiler; süreç yine element kimliğini koruyabilir. Kimlik testi, kullanılan kaba ‘güçlü–zayıf’ enerji sınıflamasından daha genel ve güvenlidir.",
    ),
    section(
      "Çözünürken hangi tanecik neye dönüşüyor?",
      "Şeker olağan suda çözündüğünde molekülleri bütün olarak dağılabilir. NaCl kristali çözünürken önceden örgüde bulunan Na⁺ ve Cl⁻ iyonları ayrılıp suyla çevrelenir; TYT’de bu olağan tuz çözünmesi fiziksel sınıflanır. Çözeltinin elektrik iletmesi yeni atom türü üretildiğini göstermez; hareketli iyonlar yük taşır.",
      "Zn metalinin asitte gözden kaybolması farklıdır: Zn atomları Zn²⁺ olur, H⁺’tan H₂ gazı oluşabilir. Yalnız katının kayboluşu iki örneği ayıramaz; ürün analizi, yük ve bağlanma bilgisi gerekir. Çözünme sözcüğü geçince her olay aynı değildir; kimyasal tepkimeyle çözünme birlikte de gerçekleşebilir.",
    ),
    section(
      "Gözlemler kanıtı destekler, tek başına bitirmez",
      "Gaz çıkışı, renk değişimi, ısı açığa çıkması veya katı oluşumu kimyasal tepkimeyle uyumlu olabilir. Fakat su kaynarken gaz H₂O’dur, çözeltideki mevcut tuz soğumayla kristallenebilir, fiziksel çözünmede de enerji alışverişi olur. Tek bir gözlem yeni kimyasal türü zorunlu kanıtlamaz.",
      "Kontrollü karşılaştırma için gazın kimliğini, başlangıç ve son bileşimi veya yeni türü doğrulayan ölçümü ara. Uygulamadaki sanal deneyler güvenli bir akıl yürütme modelidir; gerçek ortamda bilinmeyen gazı koklama/yakma gibi tehlikeli denemeler yapılmaz. Verilen ölçüm yoksa ‘kesin’ yerine ‘bu gözlem tek başına yetmez’ diyebilmek bilimsel yeterliliktir.",
    ),
    section(
      "Atom ve yük korunurken tür değişebilir",
      "2H₂O→2H₂+O₂ denkleminde iki tarafta da dört H ve iki O vardır. Solda iki su molekülü, sağda üç farklı molekül birimi bulunması tanecik sayısının korunmadığını gösterir. Korunan atom türü/sayısıdır; molekül adedi her tepkimede aynı kalmak zorunda değildir.",
      "Zn+2H⁺→Zn²⁺+H₂ denkleminde sol toplam yük +2, sağ toplam yük +2’dir. Zn’nin yükü değişirken bütün denklemde yük korunur. Atomlar korunuyorsa ‘kimyasal değişim yok’ sonucu çıkarmak yanlıştır; korunum tepkimenin düzenini denetler, tür listesini eşitlemez.",
    ),
    section(
      "Enerjinin işareti ve büyüklüğü ayrı sorudur",
      "Buharlaşma enerji alır, yoğuşma enerji verir; her ikisi fiziksel olabilir. Yanma çoğunlukla enerji verirken elektroliz enerji girişi gerektirir; her ikisi kimyasaldır. Enerji alışverişinin yönü fiziksel–kimyasal ayrımını tek başına belirlemez.",
      "40 kJ/mol sayısını kesin sınır yapma: suyun 44 kJ/mol civarı buharlaşması fiziksel kalır. Mol başına enerji hangi madde ve hangi süreç için verilmişse o bağlamda okunmalıdır. Ayrıca ‘geri dönebiliyor, demek fiziksel’ doğru değildir; tersinir tepkimeler vardır, kırık bir camın eski şekline zor dönmesi de kırılmayı kimyasal yapmaz.",
    ),
    section(
      "Gündelik çok aşamalı süreçleri çözümle",
      "Damıtma buharlaşma ve yoğuşmayla bileşenleri ayırır; öğütme, süzme ve kristallendirme uygun bağlamlarda fiziksel basamaklardır. Mayalanma, nötralleşme, paslanma, fotosentez ve elektrolizde ise yeni türler oluşur. Tereyağının sütten ayrılmasıyla sütten asit oluşarak yoğurt yapılması aynı işlem değildir.",
      "Mumda erime ve yanma birlikte görülür; eriyen mumun faz değişimi fiziksel, oksijenle yeni ürünler veren yanma kimyasaldır. Bir sürecin yalnız bir basamağını soran soruda bütün sürecin adından cevap çıkarma. Her ok için önce tür, sonra tür, değişen özellik ve korunan nicelik diye kısa bir tablo kur.",
    ),
  ],
  examples: [
    example(
      "Aynı atomların farklı ortakları",
      "A: I₂(k)→I₂(g); B: 2H₂(g)+O₂(g)→2H₂O(g). İkisini sınıflandır.",
      "Faz etiketinden bağımsız tür listesini karşılaştır.",
      [
        "A’nın iki tarafında da I₂ vardır; iyot moleküllerinin fazı değişmiştir.",
        "B’de H₂/O₂ yerine H₂O oluşur; bağ ortakları değişir.",
        "A fiziksel, B kimyasaldır; B’nin bütün türlerinin gaz olması sonucu değiştirmez.",
      ],
      "A fiziksel; B kimyasal.",
      "B’de sol ve sağda dört H ve iki O bulunur: atom korunumu kimyasal değişimle uyumludur.",
      "Gazdan gaz elde edilmesini fiziksel değişim koşulu sanma.",
    ),
    example(
      "İki kapta da kabarcık var",
      "Bir kapta saf su kaynıyor. İkincisinde elektroliz sonucu H₂ ve O₂ doğrulanıyor. Gaz çıkışı neyi ayırır?",
      "Kabarcığı değil gazın kimliğini kullan.",
      [
        "Kaynamada çıkan buhar H₂O’dur; molekül formülü korunur.",
        "Elektrolizde ürünler H₂ ve O₂’dir; suyun tür kimliği değişmiştir.",
        "Yalnız kabarcık gözlenseydi ayrım için ek bilgi gerekirdi.",
      ],
      "İlk kap fiziksel, ikinci kap kimyasal; tek başına kabarcık yeterli değildir.",
      "Soğutulan su buharı suya yoğunlaşabilir; H₂/O₂ su buharının başka adı değildir.",
      "Gaz çıkışı sözcüğünü otomatik tepkime işareti yapma.",
    ),
    example(
      "Çözünme ve yük hesabı",
      "NaCl suda dağılıyor; Zn ise asitte Zn²⁺ ve H₂ oluşturuyor. İki kaybolan katıyı karşılaştır.",
      "Başlangıçta iyon olup olmadığını ve sonuçtaki yeni türleri izle.",
      [
        "NaCl’nin önceden mevcut iyonları suyla çevrelenip hareketli olur; olağan çözünme fiziksel sınıflanır.",
        "Zn+2H⁺→Zn²⁺+H₂ olayında metal atomunun yükü değişir ve yeni gaz türü oluşur.",
        "İkinci olayda yükler +2=+2, atom sayıları da dengededir; bu korunum kimyasal değişimi engellemez.",
      ],
      "NaCl’nin olağan çözünmesi fiziksel; Zn–asit olayı kimyasal.",
      "Katının görünmez olması ve çözeltinin iletkenliği tek başına karar için kullanılmadı.",
      "Her ‘çözünme’ sözcüğünün aynı mekanizma olduğu varsayımından kaçın.",
    ),
    example(
      "Üç okta tek kimyasal adım",
      "Etanol–su damıtılıyor; ayrılan su elektroliz ediliyor; oluşan H₂ uygun koşullarda sıvılaştırılıyor. Tür hangi adımda değişir?",
      "Her basamağın önce–sonra tür listesini ayrı kur.",
      [
        "Damıtmada mevcut etanol ve su ayrılır; moleküller korunur.",
        "Elektrolizde su yerine H₂/O₂ oluşur; tür değişir.",
        "H₂(g)→H₂(s) sıvılaşmasında aynı H₂ kalır.",
      ],
      "Yalnız ikinci adım kimyasaldır.",
      "Bütün süreç hem fiziksel hem kimyasal basamaklar içerir; sorulan basamağı seç.",
      "Tek başlıktan bütün alt adımlara tek etiket yayma.",
    ),
  ],
  recall: [
    {
      prompt: "Atom sayısı korunuyorsa kimyasal değişim olamaz mı?",
      answer:
        "Olabilir; atomlar yeni türler oluşturacak biçimde yeniden bağlanır.",
    },
    {
      prompt: "Gaz çıkışı neden tek başına yeterli değil?",
      answer:
        "Kaynamada aynı türün buharı da gaz çıkarır; ürün kimliği bilinmelidir.",
    },
    {
      prompt: "NaCl çözeltisinin iletkenliği neyi gösterir?",
      answer:
        "Hareketli yük taşıyan iyon bulunduğunu; tek başına yeni kimyasal ürün oluştuğunu değil.",
    },
    {
      prompt: "Geri döndürülebilirlik kesin ayrım mı?",
      answer:
        "Hayır; tersinir tepkimeler ve geri döndürmesi zor fiziksel olaylar vardır.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri basılı s.42; OGM Fiziksel ve Kimyasal Değişimler özeti tek sayfa; Aurelia 022 öğretim s.1–8. Korunumlu özgün tanecik şemaları ve bağımsız öğretim soruları; enerji eşiği evrensel kabul edilmez.",
};

const phaseGuide: LessonGuide = {
  id: "maddenin-halleri",
  minutes: 75,
  objectives: [
    "Katı, sıvı, gaz ve plazmayı tanecik modeli ve koşullarıyla karşılaştır.",
    "Katı türlerini yapı ve akım taşıyıcısından ayır; sıvı ve gaz niceliklerini yorumla.",
    "Sabit basınçlı ısıtma grafiğinde sıcaklık, enerji ve faz paylarını birlikte oku.",
  ],
  sections: [
    section(
      "Faz, maddenin adı kadar koşullarına da bağlıdır",
      "Aynı su örneği uygun basınç ve sıcaklıkta katı, sıvı veya gaz olabilir. H₂O kimliği değişmez; taneciklerin yerleşimi ve hareket olanağı farklılaşır. Katıda belirli şekil/hacim, sıvıda belirli hacim ama kabın biçimini alma, gazda kabın kullanılabilir hacmine yayılma görülür. Katı ve sıvılar da küçük miktarda sıkışabilir; okul modelindeki ‘sıkıştırılamaz’ yaklaşık bir anlatımdır.",
      "Tanecikler katıda da hareket eder; denge konumları çevresinde titreşirler. Gaz taneciğinin büyük görünmesi gerekmez: artan esas fark çoğu koşulda aralık ve dağılımdır. Aynı elementin her fazı aynı yoğunlukta değildir; katının her zaman en yoğun olduğu iddiasını buz bozar. Basınç belirtilmeden evrensel erime/kaynama sıcaklığı söyleme.",
    ),
    section(
      "Faz geçişleri ve enerji yönleri",
      "Katı→sıvı erime, sıvı→gaz buharlaşma, katı→gaz süblimleşmedir; tersleri donma, yoğuşma ve kırağılaşmadır. Olağan geçiş yönlerinde ilk üçü çevreden enerji alır, tersleri verir. Sıvının yüzeyinden buharlaşma kaynama sıcaklığı altında da olabilir; kaynama belirli dış basınçta hacim içinde buhar kabarcıklarının büyümesiyle ilişkilidir.",
      "Saf madde, sabit basınç ve dengeye yakın geçiş modelinde iki faz sürerken sıcaklık sabit kalabilir; enerji aktarımı durmaz. Dönüşüm tamamlanınca tek fazın sıcaklığı yeniden değişebilir. Bazı basınçlarda sıvı faz aralığı yoktur: kuru buz 1 atm’de ısıtıldığında süblimleşir. Her maddeye aynı iki plato şablonunu koşulsuz uygulama.",
    ),
    section(
      "Kristal ile amorf yapıyı ayır",
      "Kristal katıda tanecikler uzun menzilli tekrarlayan bir düzen oluşturur. Amorf katıda bu düzen bulunmaz; cam ve birçok amorf polimer keskin tek erime sıcaklığı yerine bir aralıkta yumuşayabilir. Her polimeri amorf sayma; kısmen kristal yapılar da vardır. ‘Düzensiz’ demek taneciksiz veya atomsuz demek değildir.",
      "Kristal katılar yapıdaki birim ve baskın bağlanmaya göre iyonik, moleküler, kovalent ağ ve metalik olarak sınıflanır. Katı H₂O moleküler kristal, NaCl iyonik örgü, elmas kovalent ağ, Cu metalik kristaldir. Bir maddenin katı olması hangi bağ türünü taşıdığını tek başına söylemez.",
    ),
    section(
      "Akımın taşıyıcısı katı türünü açıklar",
      "İyonik NaCl’de katı örgüde iyonlar yerlerine bağlıdır; eriyikte hareketli iyonlar yük taşıyabilir. Metalde hareketli elektronlar katı fazda da akıma katkı verir. Moleküler kristaller olağan koşullarda düşük iletkenlik gösterir. Kovalent ağların özelliklerini yalnız ‘sert’ sözcüğüne indirgeme.",
      "Grafit kovalent tabakalı yapısına rağmen yayılmış elektronlar nedeniyle iletebilir ve tabakaların kaymasıyla yumuşak davranabilir. Bu yüzden iletkenlik metalik bağın tek kanıtı değildir. Katı–eriyik çifti gözlemini, bileşim ve yapı verisiyle birlikte kullan. ‘Her kovalent katı yalıtkandır’ veya ‘her kristal aynı sertliktedir’ genellemelerinden kaçın.",
    ),
    section(
      "Sıvıda akma direnci ile uçuculuk farklıdır",
      "Viskozite akmaya karşı dirençtir; Pa·s birimi kullanılabilir. Sıradan aynı sıvıda sıcaklık artışı viskoziteyi genellikle azaltır. Uzun molekül biçimleri, etkileşimler ve sıcaklık birlikte önemlidir. Akıcılık günlük nitel kullanımda viskoziteye ters yönlüdür; bunu kaynama sıcaklığıyla aynı ölçüm sanma.",
      "Buharlaşma hızı yüzey alanı, sıcaklık, nem ve hava akışıyla değişebilir. Kapalı kapta sıvı–buhar dengesi oluştuğunda buharlaşma ve yoğuşma eşit hızda sürer. Denge basıncı ile dengeye ulaşma süresi farklıdır: geniş yüzey daha hızlı dengeye götürebilir ama aynı saf sıvı, aynı sıcaklık ve kalan sıvı koşulunda denge buhar basıncını değiştirmez.",
    ),
    section(
      "Denge buhar basıncı, kaynama ve nem",
      "Saf sıvı kaldığı ve buharıyla dengede olduğu sürece denge buhar basıncını sıvının türü ve sıcaklığı belirler. Sıvı tamamen buharlaşırsa basınç doygunluk değerinin altında olabilir; koşulu atlama. Kaynama için sıvının buhar basıncı dış basınca ulaşır. Dış basınç düşerse aynı saf sıvı daha düşük sıcaklıkta kaynayabilir.",
      "Bağıl nem, su buharı kısmi basıncının aynı sıcaklıktaki doygunluk basıncına oranının yüzde ifadesidir. 1,2/2,4×100=%50. Su buharı miktarı tek başına hava sıcaklığı yükseldi diye otomatik artmaz; kaynak, kayıp ve hacim de önemlidir. Soğuma doygunluk değerini düşürerek yoğuşmaya götürebilir. Bulut ve sisin görünen kısmı yalnız görünmez gaz değil küçük damlacık/kristallerdir.",
    ),
    section(
      "Gaz yasasında sıcaklığı kelvinle kullan",
      "İdeal gaz yaklaşımında PV=nRT kullanılır; P basınç, V hacim, n mol ve T kelvindir. n ve T sabitse P₁V₁=P₂V₂; n ve P sabitse V₁/T₁=V₂/T₂; n ve V sabitse P₁/T₁=P₂/T₂ olur. 20 °C’den 40 °C’ye çıkış kelvinde iki kat değildir: yaklaşık 293→313 K’dir.",
      "Açık kapta kaçak veya faz geçişi varsa gaz molü sabit varsayılamaz. Gerçek gazlar düşük basınç ve yoğunlaşmadan yeterince uzak sıcaklıklarda ideale daha yakındır. 22,4 L/mol yaklaşık 0 °C ve 1 atm içindir; her sıcaklıkta mol hacmi değildir. Birim dönüştürme ve verilen yuvarlama kuralını işlemden önce belirle.",
    ),
    section(
      "Enerji grafiğinde plato, sıfır enerji değildir",
      "Bu model 1 g, 0 °C buzdan başlar; 1 atm, ısı kaybı yok, Lₑ=334 J/g, sıvı c=4,18 J/(g·°C), Lᵦ=2256 J/g ve buhar c≈2 J/(g·°C) alır. İlk 334 J erimeyi tamamlar; sonraki 418 J sıvıyı 100 °C’ye çıkarır. 752–3008 J arasında kaynama sürerken sıcaklık 100 °C kalır.",
      "Plato boyunca enerji faz payını değiştirir. Örneğin 167 J’de başlangıçtaki buzun yarısı erimiştir; 1880 J’de 1128 J buharlaşmaya ayrılmış, sıvının yarısı gaza dönmüştür. Eşiğin tam üstüne geçildiğinde hangi fazın kaldığını paylardan denetle. Sabit güçlü ısıtıcıda Q=P×t; güç ve kütle farklıysa yalnız plato uzunluğundan gizli ısı sırası çıkarma.",
    ),
    section(
      "Plazma için sıcak olmak tek başına yeterli değil",
      "Plazma serbest elektron ve iyonların toplu davranışının önemli olduğu iyonlaşmış gaz ortamıdır; yaklaşık toplam nötrlükle birlikte yük taşıyabilir. Yıldızlar ve bazı elektrik boşalmaları örnektir. Sıcak lav veya magma sırf yüksek sıcaklıklı olduğu için plazma değildir; kayaç eriyiği ve gazlardan oluşabilir.",
      "Gazın iyonlaşması ve yüklerin yeniden birleşmesi olağan katı–sıvı–gaz yerleşim değişiminden ayrı mikroskobik süreçler içerir. Plazmayı yalnız dört küçük topa artı/eksi çizmekten ibaret düşünme. Her sıcak gaz plazma sayılmaz, her plazmanın ağır tanecikleri aynı çok yüksek sıcaklıkta olmak zorunda değildir; bu giriş yaygın okul örnekleriyle sınırlıdır.",
    ),
    section(
      "Sanayi ve su döngüsünde aynı ilkeleri bul",
      "LPG çoğunlukla propan/bütanın basınç altında sıvılaştırıldığı yakıt; LNG metanca zengin doğal gazın kuvvetle soğutularak sıvılaştırılmış biçimidir. Soğutucu akışkan uygun çevrimde iç ortamdan buharlaşırken enerji alır, dış tarafta yoğuşurken verir. Sızdırmazlık, akışkan seçimi ve çevresel etkiler gerçek sistem tasarımının parçasıdır; adından güvenlik sonucu çıkarılmaz.",
      "Havanın sıvılaştırılıp ayrımsal damıtılması azot ve oksijenin farklı kaynama sıcaklıklarını kullanır; sıvı karışım ısıtılırken daha uçucu azot önce zenginleşir. Su döngüsünde buharlaşma, yoğuşma, donma/erime ve yağış yer alır. Doğal damıtma bazı kirleticileri ayırabilir fakat bütün doğal suyun içilebilir olduğunu garanti etmez; mikroorganizmalar ve başka kirleticiler için değerlendirme gerekir.",
    ),
  ],
  examples: [
    example(
      "Bir ısıtma adımında payı bul",
      "1 g 0 °C buz, 1 atm’de kayıpsız 167 J alıyor. Lₑ=334 J/g. Sıcaklık ve faz payları nedir?",
      "Önce faz geçişinin gerektirdiği enerjiyi karşılaştır.",
      [
        "Tam erime için Q=mL=1×334=334 J gerekir.",
        "167 J bunun yarısıdır; 0,5 g erir, 0,5 g buz kalır.",
        "İki faz sürdüğünden bu modelde sıcaklık 0 °C kalır.",
      ],
      "0 °C; %50 buz ve %50 sıvı.",
      "Kütleler 1 g’a, paylar %100’e tamamlanır; alınan enerji sıfır değildir.",
      "Plato üzerinde Q=mcΔT yazıp enerjiyi sıfır sayma.",
    ),
    example(
      "İki enerji basamağını birleştir",
      "1 g 0 °C buz tamamen eritilip 100 °C su yapılacak. Lₑ=334 J/g, c=4,18 J/(g·°C). Kayıpsız enerji?",
      "Erime ile tek faz ısınmasını ayrı hesapla.",
      [
        "Erime 334 J gerektirir; bu sırada sıcaklık 0 °C’dir.",
        "Sıvı ısınması 1×4,18×100=418 J gerektirir.",
        "Toplam 334+418=752 J. Henüz sıvıyı buharlaştırma enerjisi eklenmedi.",
      ],
      "752 J.",
      "334 J’de su 0 °C; 752 J’de sıvı 100 °C kaynama başlangıcındadır.",
      "100 °C’ye gelmeyi tamamının gaz olmasıyla eşitleme.",
    ),
    example(
      "Kilitlenen piston",
      "Sızdırmaz ideal gaz 300 K’de 2 L ve 100 kPa. Piston aynı yükte 400 K’ye ısıtılıyor; sonra kilitlenip 500 K’ye getiriliyor. Son V ve P?",
      "İlk adımda basıncı, ikinci adımda hacmi sabit tut.",
      [
        "İlk adımda n,P sabit: V₂=2×400/300=8/3 L.",
        "Piston kilitlenince V sabittir; ikinci adım P/T oranını kullanır.",
        "P₃=100×500/400=125 kPa; hacim 8/3 L kalır.",
      ],
      "V=8/3 L≈2,67 L; P=125 kPa.",
      "İlk aşama hacmi, ikinci aşama basıncı artırır; sabit tutulan değişkenler farklıdır.",
      "Celsius sıcaklık oranını veya iki adımda aynı sabit koşulu kullanma.",
    ),
    example(
      "Hız ve dengeyi ayır",
      "25 °C’de aynı saf sıvı iki kapta dengededir ve ikisinde de sıvı kalır. Birinin yüzeyi iki kat. Buhar basınçları farklı mıdır?",
      "Son denge koşullarını yüzeyin hız etkisinden ayır.",
      [
        "Saf sıvı türü ve sıcaklık aynıdır; iki faz da vardır.",
        "Denge buhar basıncı bu koşullarda aynıdır; yüzey büyüklüğü son basıncı belirlemez.",
        "Geniş yüzey dengeye ulaşma hızını etkileyebilir; bu, basınç farkı değildir.",
      ],
      "Denge buhar basınçları eşittir.",
      "Sıvı tamamen buharlaşmış olsaydı doygunluk koşulu ayrıca kontrol edilirdi.",
      "Daha hızlı buharlaşmayı mutlaka daha yüksek denge basıncı sanma.",
    ),
    example(
      "Nemden yoğuşma eşiğine",
      "Su buharı kısmi basıncı 1,2 kPa, doygunluk basıncı 2,4 kPa. Soğutmayla doygunluk 1,2 kPa’ya düşüyor; öncesinde kısmi basınç yaklaşık sabit. Ne olur?",
      "Oranı aynı sıcaklığın doygunluk değerine göre her aşamada kur.",
      [
        "Başlangıç bağıl nem 1,2/2,4×100=%50’dir.",
        "Yeni eşikte 1,2/1,2×100=%100 olur.",
        "Daha fazla soğumada uygun koşullarda yoğuşma başlayabilir; su buharının fazı değişir.",
      ],
      "%50’den %100’e; yoğuşma eşiğine ulaşılır.",
      "Soğumadan önce ek su gelmesi varsayılmadı; değişen doygunluk değeridir.",
      "Nem miktarıyla bağıl nem yüzdesini aynı nicelik sanma.",
    ),
  ],
  recall: [
    {
      prompt: "100 °C su kesin gaz mı?",
      answer:
        "Basınç ve dönüşüm aşaması gerekir; 1 atm’de sıvı, sıvı–gaz veya geçişin sonu olabilir.",
    },
    {
      prompt: "Grafit neden metal sayılmaz?",
      answer:
        "İletken olabilen tabakalı kovalent yapıdır; iletkenlik tek yapı kanıtı değildir.",
    },
    {
      prompt: "Plato süresi hangi niceliklere bağlı?",
      answer:
        "Kayıpsız sabit güçte mL/P; kütle ve güç eşitliği olmadan yalnız süreden L sırası çıkmaz.",
    },
    {
      prompt: "Denge buhar basıncında sıvı kalma koşulu neden gerekli?",
      answer:
        "Tüm sıvı buharlaşırsa basınç doygunluk değerinin altında olabilir.",
    },
    {
      prompt: "Lav neden otomatik plazma değil?",
      answer:
        "Sıcak kayaç eriyiği olmak serbest elektron–iyon plazma koşulunu tek başına sağlamaz.",
    },
  ],
  source:
    "MEBİ TYT Kimya Konu Özetleri basılı s.43–52; Aurelia 023 Maddenin Hâlleri öğretim s.1–10. Kristal, sıvı, gaz ve ısıtma konuları koşulları belirtilerek özgün biçimde işlendi; kaynaklardaki plazma/lav ve mutlak yoğunluk genellemeleri düzeltilmiştir.",
};

type Item = [
  prompt: string,
  correct: string,
  wrong: [string, string, string, string],
  hint: string,
  explanation: string,
];
const namingItems: Item[] = [
  [
    "İki elementli moleküler N₂O₅ bileşiğinin sayı ön ekleriyle sistematik adı hangisidir?",
    "Diazot pentaoksit",
    [
      "Azot pentoksijen",
      "Monoazot dioksit",
      "Diazot trioksit",
      "Azot(V) klorür",
    ],
    "İki N ve beş O sayısını ayrı ön eklerle oku.",
    "Di iki azotu, penta beş oksijeni belirtir; ikinci element oksit biçiminde okunur. Molekülün adı diazot pentaoksittir. Azot ile oksijen sayılarını yer değiştirmek veya ikinci elemente farklı sayı bağlamak formülü değiştirir; klor içermeyen bir formüle klorür denemez.",
  ],
  [
    "Bir diklor heptaoksit molekülü toplam kaç atom içerir? Cl klor, O oksijen simgesidir.",
    "9",
    ["2", "5", "7", "14"],
    "Di ve hepta sayılarını topla; çarpma toplam atom vermez.",
    "Di iki Cl, hepta yedi O anlamındadır: Cl₂O₇. Bir moleküldeki toplam 2+7=9 atomdur. 14 çarpım sonucu olur; yalnız bir elementin sayısını almak toplamı eksik bırakır. Adın bir moleküle ait olduğu özellikle belirtilmiştir.",
  ],
  [
    "Moleküler OF₂ için O oksijen, F flor olduğuna göre uygun ad hangisidir?",
    "Oksijen diflorür",
    [
      "Diflor monoksit",
      "Oksijen florür diiyon",
      "Dioksijen florür",
      "Oksit flor",
    ],
    "İlk ve ikinci elementin sırasını koru.",
    "İlk sıradaki O oksijen olarak kalır; tek atom için ilk mono yazılmaz. İkinci F’nin alt indisi 2 olduğundan diflorür olur. Oksijenin bulunması her formülde oksit son adını gerektirmez; oksit biçimi bu basit şemada oksijen ikinci bileşen olduğunda kullanılır.",
  ],
  [
    "CO ve Co yazıları için hangi yorum doğrudur? C karbon, O oksijen, Co kobalt simgesidir.",
    "CO iki elementli bileşik formülü, Co tek element sembolüdür.",
    [
      "İkisi de kobaltın eşdeğer yazımıdır.",
      "CO tek karbon atomudur; Co iki oksijendir.",
      "Küçük harf yalnız atom sayısını değiştirir.",
      "Co karbonun +1 iyonudur.",
    ],
    "Kimyasal sembolün büyük ve küçük harflerini birlikte oku.",
    "CO’da C ve O ayrı büyük harflerle iki elementi gösterir; karbon monoksit formülüdür. Co bir büyük ve bir küçük harfle tek kobalt sembolüdür. Küçük harf alt indis ya da iyon yükü değildir; yazım farkı maddenin kimliğini değiştirebilir.",
  ],
  [
    "Bir öğrenci N₂O₄ molekül formülünü NO₂’ye sadeleştiriyor. Molekül kimliği açısından doğru değerlendirme hangisidir?",
    "Aynı en basit oranı verse de molekül başına atom sayısı değişir.",
    [
      "Molekül formülleri her zaman sadeleştirilmelidir.",
      "Her iki formül de altı atomlu tek molekülü gösterir.",
      "N₂O₄ yalnız iyonik birim hücre olabilir.",
      "Sadeleştirme yalnız oksijenin atom numarasını değiştirir.",
    ],
    "En basit oran ile bir molekülün gerçek sayımını ayır.",
    "N₂O₄ bir molekülde 2 N ve 4 O, yani 6 atom; NO₂ ise 1 N ve 2 O, yani 3 atom gösterir. Oran 1:2 olsa da molekül formülü gerçek sayıları korur. Sadeleştirme kuralını molekülün adına ve formülüne taşımak farklı bir tanecik yazmaktır.",
  ],
  [
    "Üç fosfor triklorür molekülü (PCl₃) toplam kaç Cl atomu içerir?",
    "9",
    ["3", "4", "6", "12"],
    "Bir moleküldeki Cl sayısını molekül adediyle çarp.",
    "Triklorür tek molekülde üç Cl bulunduğunu söyler. Üç molekül 3PCl₃ olduğundan Cl sayısı 3×3=9’dur. Her molekül dört toplam atom içerdiği için 12 tüm atomların sayısıdır; yalnız Cl isteniyorken P atomlarını toplama.",
  ],
  [
    "Na₂O, Na⁺ ve O²⁻ iyonlarının oluşturduğu iyonik katıdır. Bu bileşiğin uygun adı hangisidir?",
    "Sodyum oksit",
    [
      "Disodyum monoksit",
      "Sodyum dioksit",
      "Sodyum peroksit",
      "Sodyum metal molekülü",
    ],
    "Moleküler ön ek şemasından önce verilen yapı türünü kullan.",
    "İyonik adlandırmada katyon sodyum ve anyon oksit adı kullanılır. İki Na⁺ bir O²⁻ yükünü dengeler; bu oran bağımsız bir Na₂O molekülü için sayı ön ekleri kurmamızı gerektirmez. Peroksit farklı iyon yapısıdır; verilen O²⁻ ile aynı değildir.",
  ],
  [
    "Katı bakır telin elektrik iletiminde temel hareketli yük taşıyıcısı hangisidir? Metalik örgü modeli kullanılacaktır.",
    "Yayılmış elektronlar",
    [
      "Tel boyunca ilerleyen pozitif metal merkezleri",
      "Yeni oluşan su molekülleri",
      "Bakıra dönüşen protonlar",
      "Çekirdekten ayrılan nötronlar",
    ],
    "Katı merkezlerle elektron denizinin hareket olanağını ayır.",
    "Metalde yayılmış değerlik elektronları elektrik alanında yönlü akıma katkı verebilir. Pozitif merkezler örgüdeki yerlerinin çevresinde kalır; telin başından sonuna taşınmaları gerekmez. Bu olay proton/nötron dönüşümü veya yeni su türü üretimi değildir; elektrik iletimi kimyasal çekirdek dönüşümü gerektirmez.",
  ],
  [
    "Bir metal levha uygun koşullarda bükülürken parçalanmadan şekil alıyor. Elektron denizi modeli hangi açıklamayı destekler?",
    "Katmanlar kayarken yayılmış elektron yoğunluğu yeni düzene uyum sağlayabilir.",
    [
      "Her kovalent bağ aynı yönü sonsuza dek korur.",
      "Pozitif merkezler nötronlara dönüşür.",
      "Metalik çekim bükülmenin ilk anında tamamen yok olur.",
      "Bütün elektronlar levhayı terk edip bir daha dönmez.",
    ],
    "Bağlanmanın tek bir sabit atom çiftine yerelleşmediğini düşün.",
    "Metalik bağlanmada yayılmış elektron yoğunluğu çok sayıda merkezle çekim hâlindedir. Katmanların göreli kayması sırasında bu yoğunluğun uyumu bağlanmanın sürmesini ve şekil almayı açıklar. Tamamen elektron kaybı veya çekirdek dönüşümü beklenmez; model bütün metallerin her koşulda aynı yumuşaklıkta olduğunu da iddia etmez.",
  ],
  [
    "Bir katının elektrik ilettiği gözleniyor. Başka bileşim ve yapı verisi yok. Hangi sonuç en güvenlidir?",
    "İletkenlik tek başına metalik yapı için kesin kanıt değildir.",
    [
      "Kesinlikle saf metaldir.",
      "Kesinlikle iyonik katıdır.",
      "Hiç elektron içermez.",
      "Bütün bağları mutlaka hidrojen bağıdır.",
    ],
    "İletken grafit karşı örneğini düşün.",
    "Metaller elektronlarla iletebilir; grafit de tabakalı kovalent yapısındaki yayılmış elektronlarla iletebilir. Başka malzemelerde de farklı taşıyıcılar mümkündür. Bu nedenle tek gözlem metalik yapıyı kesin seçtirmez; bileşim, faz, örgü ve taşıyıcı bilgisi gerekir. İletkenlik atom veya elektron yokluğu değildir.",
  ],
];
const weakItems: Item[] = [
  [
    "Saf Ar örneğinde iki yüksüz Ar atomu arasında, TYT’nin temel sınıflamasına göre hangi çekim bulunur? Ar soy gazdır ve kalıcı dipol taşımaz.",
    "London",
    [
      "İyon–dipol",
      "Kovalent Ar–Ar bağı zorunluluğu",
      "Hidrojen bağı",
      "İyon–iyon",
    ],
    "Kalıcı kutupsuz iki nötr taneciği eşleştir.",
    "Ar atomlarındaki ilişkili anlık elektron dağılımı değişimleri London çekimine katkı verir. Soy gaz olmak hiç etkileşim olmadığı anlamına gelmez. Net iyon yükü ve N/O/F’ye bağlı H vericisi bulunmadığından iyon–dipol veya hidrojen bağı etiketleri bu çifte uygun değildir.",
  ],
  [
    "HCl polar moleküldür. Saf HCl’nin iki komşu molekülü için hangi ifade doğrudur?",
    "Dipol–dipol katkısına ek olarak London da vardır.",
    [
      "Polar olduğu için London yoktur.",
      "H içerdiği için TYT’de mutlaka hidrojen bağı yapar.",
      "HCl molekülü net +1 yüklüdür.",
      "Yalnız metalik bağ vardır.",
    ],
    "‘Vardır’ ile ‘yalnız vardır’ koşullarını ayır.",
    "Polar HCl’de kalıcı dipoller arasındaki etkileşim bulunur; nötr moleküllerin London katkısı da devam eder. H–Cl bağlantısı bu ünitenin N/O/F verici koşuluna girmez. HCl’nin kısmi kutupları net iyon yükü değildir; metalik örgü de söz konusu değildir.",
  ],
  [
    "Polar H₂O ile apolar O₂ molekülü arasındaki karakteristik eşleşme hangisidir? Sorulan çift su–oksijendir.",
    "Dipol–indüklenmiş dipol",
    [
      "İyon–dipol",
      "İyon–iyon",
      "Kovalent O–H bağı oluşması zorunluluğu",
      "Metalik bağ",
    ],
    "Kalıcı kutup kaynağı ile apolar komşuyu ayrı belirle.",
    "Suyun kalıcı dipolü O₂’nin elektron dağılımında geçici kutuplanma indükleyebilir. O₂ net yüklü iyon değildir, bu yüzden iyon–dipol denmez. Bu etkileşim yeni kovalent ürün oluştuğunu zorunlu kılmaz; nötr çiftin London katkısı da bulunabilir.",
  ],
  [
    "Sulu çözeltide Na⁺ iyonu ile H₂O molekülü arasındaki karakteristik etkileşim hangisidir?",
    "İyon–dipol",
    ["Dipol–dipol", "Yalnız London", "Metalik örgü", "Apolar kovalent bağ"],
    "Na⁺ net yük, su kalıcı dipol taşır.",
    "Na⁺ bir iyon, H₂O polar moleküldür; eşleşme iyon–dipoldür. Suyun O ucu katyona yönelme eğilimindedir. Bu çifti kristaldeki Na⁺–Cl⁻ çiftiyle karıştırma; çözeltideki hidratlaşma metalik veya yeni apolar kovalent bağ adıyla sınıflanmaz.",
  ],
  [
    "Bir Na⁺ iyonunun apolar Ar atomunu kutuplaştırması hangi eşleşmeye örnektir?",
    "İyon–indüklenmiş dipol",
    ["Dipol–dipol", "Hidrojen bağı", "İyon–kalıcı dipol", "Kovalent Ar–H"],
    "Kaynak net iyon yükü, komşu başlangıçta apolardır.",
    "Na⁺’ın alanı Ar’ın elektron dağılımını indükler; bu nedenle iyon–indüklenmiş dipol adı kullanılır. Ar’da başlangıçta kalıcı dipol yoktur, H vericisi de bulunmaz. Böyle bir çiftin mümkün olması bir tuzun apolar çözücüde yüksek çözünürlüğünü tek başına göstermez.",
  ],
  [
    "NaCl kristalindeki Na⁺ ile komşu Cl⁻ arasındaki elektrostatik çekim hangi türdedir? Burada su molekülü seçilmemiştir.",
    "İyon–iyon",
    ["İyon–dipol", "Yalnız London", "Dipol–indüklenmiş dipol", "Hidrojen bağı"],
    "İki tarafta da net yük var mı?",
    "Seçilen iki tanecik zıt yüklü iyonlardır; kristal örgüsünün çekimi iyon–iyondur. İyon–dipol için bir net iyon ile bir polar molekül gerekir. Cl⁻’daki eksi işareti nötr molekülün δ− kutbu değildir. Çiftin açık seçimi karışık ortam etiketini önler.",
  ],
  [
    "Cl⁻ iyonunun etrafındaki su molekülleri uygun yönlenirken hangi uç iyona daha yakın olma eğilimindedir? H₂O’da O ucu δ−, H uçları δ+’dır.",
    "H uçları",
    [
      "O ucu",
      "İki uç her koşulda özdeştir",
      "Suyun olmayan Na ucu",
      "Yalnız nötronlar",
    ],
    "Net eksi yükün karşısına kısmi artı yönü koy.",
    "Cl⁻ net negatif olduğu için suyun kısmi pozitif H uçları ona yönelme eğilimindedir. Na⁺ katyonunda ise O ucu uygundur. Su molekülünün bütününü yükse benzeyen bir iyon sanma; bu yönlenme iyon–dipol etkileşimidir, zorunlu O–H kopması değildir.",
  ],
  [
    "CO₂ doğrusal ve iki C=O bağ dipolü eşit-zıt yönlüdür. Saf CO₂ komşuları için doğru temel yorum hangisidir?",
    "Molekül apolardır; London katkısı bulunur.",
    [
      "Polar bağlar nedeniyle molekül mutlaka polardır.",
      "Hiçbir moleküller arası çekim olamaz.",
      "CO₂ iyonik örgüdür.",
      "C atomu H bağı vericisidir.",
    ],
    "Bağların kutbunu molekülün toplam kutbundan ayır.",
    "Eş ve zıt dipol vektörleri doğrusal CO₂’de net kalıcı dipolü sıfırlar. Bu, molekül içi C=O bağlarını apolar yapmaz; yalnız toplam molekül apolar olur. Anlık elektron değişimlerinden London çekimi sürer. Formülde H bulunmadığından klasik H-bağı vericisi de yoktur.",
  ],
  [
    "Aynı dış basınçta benzer biçimli apolar Cl₂, Br₂ ve I₂ karşılaştırılıyor. Elektron bulutu kutuplanabilirliği bu seride Cl₂’den I₂’ye artıyor. Beklenen kaynama eğilimi hangisidir?",
    "I₂ > Br₂ > Cl₂",
    [
      "Cl₂ > Br₂ > I₂",
      "Üçünün kaynaması zorunlu eşittir",
      "Br₂ > I₂ > Cl₂ zorunludur",
      "Hidrojen bağı sayısıyla belirlenir",
    ],
    "Verilen benzer-seri koşulunda London katkısının yönünü kullan.",
    "Daha kolay kutuplanan benzer moleküllerde toplam London katkısının artması, aynı dış basınçta daha yüksek kaynama sıcaklığı eğilimiyle ilişkilidir. Verilen seri I₂>Br₂>Cl₂ sonucunu destekler. H içermeyen bu moleküllere hidrojen bağı eklenmez; bu eğilim bütün farklı yapılar için evrensel tek değişken yasası değildir.",
  ],
  [
    "H₂O(s)→H₂O(g) için verilen 44 kJ/mol enerji, tek başına hangi sonucu destekler?",
    "Enerji büyüklüğü tek başına kimyasal değişim kanıtı değildir.",
    [
      "40’tan büyük her olay kimyasaldır.",
      "Su molekülleri mutlaka H ve O atomlarına ayrılır.",
      "H₂O formülü değişmiştir.",
      "Süreç enerji alamaz.",
    ],
    "Önce iki taraftaki tür kimliğini denetle.",
    "İki tarafta da H₂O vardır; olay buharlaşmadır. Enerji molekülleri birbirinden ayırmaya katkı verir; O–H bağlarının kopması gerekmez. 40 kJ/mol kaba sınıflama ipucu olabilir ama her süreç için kesin eşik değildir. Verilen 44 sayısı yeni kimyasal türü kanıtlamaz.",
  ],
];
const hydrogenItems: Item[] = [
  [
    "Dimetil eter CH₃–O–CH₃ molekülleri saf sıvıda kendi aralarında neden klasik TYT hidrojen bağı kurmaz?",
    "N/O/F’ye doğrudan bağlı H vericisi bulunmaz.",
    [
      "O atomunda hiç elektron yoktur.",
      "Molekülde hiç H atomu yoktur.",
      "Bütün C–H bağları iyoniktir.",
      "Saf sıvıların hiçbirinde H bağı olmaz.",
    ],
    "Alıcı elektron çifti ile H vericisini ayrı ara.",
    "Eterin O’su uygun alıcı olabilir; fakat bütün H atomları C’ye bağlıdır ve aynı tür ikinci eterde de gerekli verici yoktur. H bulunması veya O bulunması ayrı ayrı yetmez. Saf su ve alkoller karşı örnek olduğu için bütün saf sıvılara yokluk genellenmez.",
  ],
  [
    "Su ile dimetil eter arasında uygun bir O–H···O teması kuruluyor. Verici ve alıcı doğru olarak hangisidir?",
    "Su O–H verici, eter O’su alıcıdır.",
    [
      "Eter C–H verici, su proton çekirdeği alıcıdır.",
      "İki molekülün de vericisi yoktur.",
      "Eter mutlaka suya dönüşür.",
      "Su O–H bağı tamamen kopup yok olur.",
    ],
    "H’nin doğrudan bağlı olduğu atomu ve karşı elektron çiftini izle.",
    "Su, O’ya kovalent bağlı kısmi pozitif H’yi verici konumunda sunabilir. Eter O’sunun elektron çifti alıcı olur. Bu moleküller arası temas yeni su üretimi veya suyun kovalent O–H bağının kopması değildir. Saf eterde verici yokluğu, farklı su komşusuyla teması engellemez.",
  ],
  [
    "Etanol CH₃CH₂OH ile dimetil eter CH₃OCH₃ aynı C₂H₆O kapalı formülüne sahiptir. Saf sıvıları için hangi sonuç doğrudur?",
    "Etanolün O–H vericisi vardır; eterde bu verici yoktur.",
    [
      "Kapalı formül aynıysa bütün bağlanmalar aynıdır.",
      "Eterin her H’si O’ya bağlıdır.",
      "Etanol hiçbir zaman alıcı olamaz.",
      "Her ikisi de iyonik katıdır.",
    ],
    "Açık yapıyı kullan; atom sayısı bağlantı sırasını vermez.",
    "Etanolün uç OH grubu verici ve O elektron çiftleri alıcı rolüne uygundur. Eterde O iki karbona bağlı, H’ler C’ye bağlıdır. İzomerlerin atom sayıları aynı olsa da saf moleküller arası H-bağı olanakları farklıdır. Kapalı formül tek başına yapının yerine geçmez.",
  ],
  [
    "H₂O, NH₃, HF ve HCl örneklerinden hangisi TYT’nin N/O/F’ye doğrudan bağlı H vericisi koşulunu karşılamaz? Seçeneklerde tek madde isteniyor.",
    "HCl",
    ["H₂O", "NH₃", "HF", "H₂O ve NH₃’ün ikisi"],
    "H’nin doğrudan komşusunu oku; Cl bu giriş kuralındaki üç atomdan değildir.",
    "HCl’de H klora bağlıdır; bu ünitenin yaygın TYT hidrojen-bağı verici koşulu F/O/N’dir. Su, amonyak ve HF bu bağlantıları taşır. Kök tek madde istediği için iki uygun maddeyi birlikte veren seçenek de doğru değildir. H bulunması tek başına yeterli koşul değildir.",
  ],
  [
    "O–H···O gösteriminde düz O–H çizgisi ile noktalı H···O çizgisi sırasıyla neyi temsil eder?",
    "Molekül içi kovalent bağ ve uygun komşuya hidrojen bağı",
    [
      "İki eşdeğer iyonik bağ",
      "İki metalik bağ",
      "Noktalı çizgi çekirdeğin parçalanması",
      "Düz çizgi yalnız London, noktalar atom numarası",
    ],
    "Çizginin hangi iki taneciği bir arada tuttuğunu ayır.",
    "Düz O–H aynı molekülde atomları bağlayan kovalent bağdır. Noktalı temas uygun H vericisi ile komşu O alıcısının hidrojen bağıdır. İki gösterim aynı bağ mertebesi veya aynı elektron paylaşımı anlamına gelmez; H iki O’ya eşdeğer iki sıradan kovalent bağ kurmuş sayılmaz.",
  ],
  [
    "Kapalı ideal bir ağda 6 su molekülünün her biri 4 komşu temasa katılıyor. Her farklı temas iki molekülün katılımında ortak sayılıyor. Farklı temas sayısı kaçtır?",
    "12",
    ["6", "10", "24", "48"],
    "Yerel katılım toplamını iki uca böl.",
    "Altı molekül dörder katılımla 24 uç kaydı verir. Her farklı temasın iki ucu sayıldığı için 24/2=12 farklı temas vardır. Bu hesap açıkça verilen ideal kapalı ağ içindir; gerçek sıvıda bütün su moleküllerinin her an dört bağ yaptığını göstermez. 24 cevabı aynı teması iki kez sayar.",
  ],
  [
    "90 g buz 100 mL, aynı kütlede sıvı su 90 mL yer kaplıyor. Verilen koşullarda doğru sonuç hangisidir?",
    "Buzun yoğunluğu 0,90 g/mL’dir ve sıvıdan küçüktür.",
    [
      "Buzun yoğunluğu 1,11 g/mL’dir.",
      "İki yoğunluk zorunlu eşittir.",
      "Buzun kütlesi yoktur.",
      "Buzun yoğunluğu büyük olduğundan yüzer.",
    ],
    "Yoğunluk kütle/hacimdir; büyük hacimde aynı kütleyi kullan.",
    "Buz için 90/100=0,90 g/mL, sıvı için 90/90=1,00 g/mL bulunur. Daha düşük yoğunluk buzun sıvı suda yüzmesiyle uyumludur. Kütlelerin eşit olması yoğunluğu eşitlemez; açık ağın hacim farkı önem taşır. Yüzmeyi daha büyük yoğunlukla açıklamak yönü ters çevirir.",
  ],
  [
    "İki molekül uygun verici ve alıcı gruplar taşıyor fakat seçilmiş H ile alıcı birbirinden çok uzak. En doğru yorum hangisidir?",
    "Yapısal uygunluk, bu uzak geometride gerçekleşmiş temasın tek başına kanıtı değildir.",
    [
      "Harfler yeterlidir; uzaklık hiç önemli değildir.",
      "Bütün kovalent bağlar kendiliğinden iyonik olur.",
      "Alıcı elektron çifti artık kesin yoktur.",
      "Moleküller mutlaka yeni elemente dönüşür.",
    ],
    "Mümkün olma koşulunu anlık yakınlık ve yönlenmeden ayır.",
    "Verici ve alıcıların varlığı bir etkileşim olanağı sağlar; gerçekleşen hidrojen bağı uygun yakınlık ve yönlenme de gerektirir. Çok uzak seçilmiş çiftte çizgi çizmek fiziksel kanıt olmaz. Bu durum yapının elektronlarını yok etmez ve kimyasal element dönüşümünü gerektirmez.",
  ],
  [
    "Bir tabloda HF’nin tek hidrojen-bağı temas enerjisi sudakinden daha büyük verilmiş. Bundan yalnızca hangi çıkarım yapılabilir?",
    "Tek temas verisi, toplam kaynama sırasını tek başına belirlemez.",
    [
      "HF her basınçta mutlaka daha yüksek sıcaklıkta kaynar.",
      "Su hiç H bağı yapamaz.",
      "Su ile HF aynı moleküldür.",
      "Daha güçlü tek temas, daha çok ağ teması olduğunu kesin kanıtlar.",
    ],
    "Bir temas enerjisiyle toplu faz özelliğinin farklı nicelikler olduğunu hatırla.",
    "Kaynama molekül başına erişilebilir temaslara, ağ yapısına, diğer çekimlere ve basınca bağlıdır. Tek bir temasın enerjisi bu bütünün tamamını ölçmez. Bu nedenle verilen enerjiyle kesin kaynama sırası kurulamaz; suyun H-bağı yapmadığı sonucu da çıkmaz. Ağ temas sayısı ayrı yapısal bilgidir.",
  ],
  [
    "Saf su 1 atm’de buharlaştırılıyor. Bu olağan faz değişiminde hangi ifade doğrudur?",
    "H₂O kimliği ve molekül içindeki O–H bağları korunur.",
    [
      "Her H₂O mutlaka H₂ ve O₂ olur.",
      "Bütün O–H bağları hidrojen bağıdır.",
      "Yeni proton türleri oluşur.",
      "Moleküller arası uzaklık hiçbir zaman değişmez.",
    ],
    "Molekülleri birbirinden ayırma ile iç bağları koparmayı ayır.",
    "Buharlaşmada su molekülleri gaz fazına geçer; moleküler kimlik H₂O olarak kalır. Moleküller arası hidrojen-bağı ağı yeniden düzenlenir ve yoğun fazdan ayrılma gerçekleşir. Su içindeki O–H kovalent bağlarını koparmak H₂/O₂ oluşumuyla aynı olağan faz olayı değildir; o ayrı kimyasal süreçtir.",
  ],
];
const changeItems: Item[] = [
  [
    "I₂(k)→I₂(g) olayı için doğru sınıflama hangisidir? I₂’nin iki tarafta da aynı moleküler kimliği koruduğu verilmiştir.",
    "Fiziksel süblimleşme",
    [
      "Kimyasal elektroliz",
      "Yeni element oluşumu",
      "İyonik parçalanma zorunluluğu",
      "Çekirdek tepkimesi",
    ],
    "Değişen hâl etiketini, korunmuş formülden ayır.",
    "Katı iyot gaz fazına geçerken I₂ molekül kimliği korunur. Katıdan gaza geçiş süblimleşmedir ve verilen olağan koşullarda fiziksel değişimdir. I₂’nin I atomlarına ayrılması veya başka elemente dönüşmesi bu denklemde yoktur; faz etiketi tek başına tür değişimi değildir.",
  ],
  [
    "2H₂O→2H₂+O₂ denkleminde iki tarafta H ve O atom sayıları sırasıyla kaçtır?",
    "4 H ve 2 O",
    ["2 H ve 1 O", "4 H ve 4 O", "2 H ve 2 O", "6 H ve 3 O"],
    "Katsayıyı formüldeki her alt indisle çarp.",
    "Solda 2×2=4 H ve 2×1=2 O vardır. Sağda 2H₂ dört H, O₂ iki O verir. Atomlar korunur; H₂O yerine farklı moleküller oluşması kimyasal değişimdir. Bir moleküldeki sayıyı bütün denklemdeki toplamla karıştırma.",
  ],
  [
    "2H₂O→2H₂+O₂ tanecik modelinde başlangıçta ve sonuçta yazılan molekül adedi sırasıyla kaçtır?",
    "2 ve 3",
    ["2 ve 2", "3 ve 2", "4 ve 2", "6 ve 6"],
    "Molekül adedini katsayı toplamından, atom sayısını alt indislerden bul.",
    "Başlangıçta iki H₂O molekülü, sonuçta iki H₂ ve bir O₂, yani üç molekül bulunur. Molekül sayısının değişmesi atom korunumunu bozmaz: iki tarafta dört H ve iki O vardır. Bu, kimyasal tepkimelerde molekül adedinin zorunlu korunmadığını gösterir.",
  ],
  [
    "Zn + 2H⁺ → Zn²⁺ + H₂ denkleminde sol ve sağ toplam elektrik yükü nedir? Zn ve H₂ yüksüzdür.",
    "+2 ve +2",
    ["0 ve +2", "+1 ve +1", "+2 ve 0", "−2 ve +2"],
    "Her türün katsayısı ile yükünü çarpıp topla.",
    "Solda Zn 0, iki H⁺ toplam +2 verir. Sağda Zn²⁺ +2, H₂ 0 yük taşır. Yük korunur; Zn’nin yüksüz atomdan iyona dönüşmesi kimyasal değişimle uyumludur. Yük korunumunu tek tek her taneciğin yükünün hiç değişmemesi sanma.",
  ],
  [
    "A kabında NaCl’nin mevcut Na⁺/Cl⁻ iyonları suda dağılıyor. B kabında Zn asitle tepkimeye girip Zn²⁺ ve H₂ oluşturuyor. TYT sınıflamasında hangi sonuç doğrudur?",
    "A fiziksel, B kimyasaldır.",
    [
      "İkisi de yalnız fiziksel çünkü katılar kayboluyor.",
      "İkisi de kimyasal çünkü çözeltiler iletir.",
      "A çekirdek dönüşümü, B fiziksel faz değişimidir.",
      "A kesin metalik bağ oluşumudur.",
    ],
    "Görünmez olmaya değil, başlangıç ve sonuç türlerine bak.",
    "A’da kristalde önceden bulunan iyonlar çözeltide hareketli olur; olağan NaCl çözünmesi fiziksel sınıflanır. B’de Zn’nin yükü ve tür listesi değişir; H₂ yeni üründür. İletkenlik veya katının gözden kaybolması tek başına iki mekanizmayı eşitlemez.",
  ],
  [
    "Kimliği belirlenmeyen bir gazın kabarcıkları gözleniyor. Başka başlangıç/ürün verisi yok. Hangi değerlendirme doğrudur?",
    "Fiziksel veya kimyasal ayrımı için gaz kimliği gibi ek kanıt gerekir.",
    [
      "Kabarcık varsa kesin kimyasal değişimdir.",
      "Kabarcık varsa kesin fiziksel değişimdir.",
      "Gaz oluştuysa bütün atomlar yok olmuştur.",
      "Kabarcık yalnız metalik bağda görülebilir.",
    ],
    "Kaynama ve elektrolizin ikisinde de gaz gözlenebileceğini düşün.",
    "Kabarcık su buharı gibi aynı kimliğin gaz fazı olabilir; H₂ gibi yeni kimyasal ürün de olabilir. Bu yüzden yalnız gaz gözlemi ayrımı bitirmez. Ürün analizi, süreç koşulları ve kontrollü ölçüm gerekir. Atomların yok olduğu veya tek bağ türünün zorunlu olduğu sonucu çıkarılmaz.",
  ],
  [
    "Hg(s)→Hg(g) için 59 kJ/mol enerji alındığı verilmiştir. Hg iki tarafta da cıva elementidir. En doğru sonuç hangisidir?",
    "Element kimliği korunan fiziksel buharlaşmadır.",
    [
      "59>40 olduğundan kesin yeni element oluşur.",
      "Hg mutlaka H₂ ve O₂’ye dönüşür.",
      "Enerji aldığı için kimyasal olmak zorundadır.",
      "Gaz hâlindeki her madde kimyasal üründür.",
    ],
    "Enerji değerinden önce tür kimliğini karşılaştır.",
    "Sıvı cıva gaz cıvaya geçer; element kimliği Hg olarak kalır. Enerjinin 40 kJ/mol’den büyük olması fiziksel–kimyasal ayrımında kesin eşik olmadığını gösterir. Metalik yoğun fazın bağlanmasının değişmesi, yeni element üretimiyle aynı değildir. Hg’nin su ürünlerine dönüşmesi denklemde yer almaz.",
  ],
  [
    "1) Etanol–su damıtması, 2) suyun H₂/O₂’ye elektrolizi, 3) H₂’nin tepkimesiz uygun koşullarda sıvılaştırılması yapılıyor. Yalnız hangi basamak kimyasaldır?",
    "2",
    ["1", "3", "1 ve 3", "1, 2 ve 3"],
    "Her okun tür listesini ayrı kontrol et.",
    "Damıtma mevcut bileşenleri faz değişimleriyle ayırır. Elektrolizde H₂O kimliği H₂ ve O₂ ürünlerine dönüşür. Son sıvılaştırma H₂(g)→H₂(s) olarak aynı molekülü korur. Bu nedenle yalnız ikinci basamak kimyasaldır; bütün sürece tek başlık vermek basamak ayrımını kaybettirir.",
  ],
  [
    "Bir olayın geri döndürülebildiği bilgisi tek başına fiziksel değişim olduğunu kanıtlar mı?",
    "Hayır; tersinir kimyasal tepkimeler de vardır.",
    [
      "Evet; bütün kimyasal olaylar sonsuza dek geri dönmez.",
      "Evet; kırılma her zaman kimyasaldır.",
      "Hayır; fiziksel olaylarda enerji hiçbir zaman aktarılmaz.",
      "Yalnız gaz içermiyorsa kanıtlar.",
    ],
    "Ayrımın esasını kimyasal tür kimliğinde ara.",
    "Geri döndürülebilirlik mekanizmayı tek başına belirlemez. Tersinir kimyasal tepkimeler vardır; cam kırılması gibi fiziksel olayları eski biçime döndürmek ise zor olabilir. Enerji alışverişi iki sınıfta da görülebilir. Başlangıç–ürün kimliği ve bağlanma/yük düzeni gerekir.",
  ],
  [
    "Bir mumda katı mum önce eriyor, sonra buharlaşan yakıt oksijenle CO₂ ve H₂O oluşturuyor. Doğru basamak yorumu hangisidir?",
    "Erime fiziksel, yeni ürün veren yanma kimyasaldır.",
    [
      "İki basamak da yalnız fiziksel.",
      "Erime kimyasal, yanma fiziksel.",
      "Mum eriyince atom numaraları değişir.",
      "Yanma sırasında atom korunumuna gerek yoktur.",
    ],
    "Faz değişimi ile yeni ürün listesini ayır.",
    "Erime mumun fiziksel fazını değiştirir. Yanma ise yakıt ve O₂’den yeni CO₂/H₂O türleri oluşturur; kimyasaldır. İki süreç aynı mumda birlikte görülse de aynı mekanizma değildir. Sıradan yanmada atom tür ve sayıları uygun dengelenmiş denklemle korunur; çekirdekler değişmez.",
  ],
];
const phaseItems: Item[] = [
  [
    "1 g, 0 °C buz 1 atm’de kayıpsız 167 J alıyor. Erime gizli ısısı 334 J/g. Son durumda hangisi doğrudur?",
    "%50 buz, %50 sıvı; sıcaklık 0 °C",
    [
      "Tamamı 167 °C gaz",
      "Tamamı 100 °C sıvı",
      "Tamamı buz, enerji alınmadı",
      "%25 buz, %75 gaz",
    ],
    "Tam erime enerjisiyle alınan enerjiyi karşılaştır.",
    "Tam erime 1×334=334 J gerektirir. 167 J bunun yarısı olduğundan 0,5 g erir ve 0,5 g buz kalır. Saf madde sabit basınçta iki faz hâlindeyken bu modelde sıcaklık 0 °C’dir. Sıcaklığın değişmemesi enerji alınmadığı anlamına gelmez; faz payı değişmiştir.",
  ],
  [
    "1 g, 0 °C buz tamamen eritilip 100 °C sıvı yapılacak. Lₑ=334 J/g, sıvı c=4,18 J/(g·°C), ısı kaybı yok. Gerekli toplam enerji kaç J?",
    "752",
    ["334", "418", "2256", "3008"],
    "Önce mL, sonra mcΔT basamaklarını topla.",
    "Erime için 334 J, 0→100 °C sıvı ısınması için 1×4,18×100=418 J gerekir. Toplam 752 J’dir. 2256 J buharlaşma gizli ısısı, 3008 J ise bu örnekte tümünü 100 °C buhara çevirme toplamıdır. Soru yalnız 100 °C sıvı istediğinden son plato eklenmez.",
  ],
  [
    "1 g 0 °C buzdan başlayan modelde 752 J, 100 °C sıvıya ulaşma toplamıdır; tam buharlaşma ek 2256 J ister. Toplam 1880 J verildiğinde gaz kütle payı nedir? Kayıp yok, 1 atm.",
    "%50",
    ["%0", "%25", "%75", "%100"],
    "Buharlaşmaya ayrılan enerjiyi toplamdan ayır.",
    "1880−752=1128 J kaynama platosuna ayrılmıştır. 1128/2256=1/2 olduğundan kütlenin yarısı gaz, yarısı sıvıdır; sıcaklık 100 °C kalır. Başlangıçtaki erime ve ısınma enerjilerini de buharlaşmış miktara katmak payı gereğinden büyük verir.",
  ],
  [
    "Bir kristal katı olağan koşullarda iletmiyor, saf eriyiği hareketli iyonlarla iletiyor. Verilen üç adaydan en uygun yapı hangisidir?",
    "İyonik kristal",
    [
      "Standart metalik kristal",
      "Yalnız nötr moleküllü kristal",
      "Elektronsuz madde",
      "Plazma olmak zorundadır",
    ],
    "Faz değişince hareket serbestisi kazanan yük taşıyıcısını kullan.",
    "İyonik kristalde iyonlar örgüde yerlerine bağlıyken eriyikte uzun mesafede yük taşıyabilir. Standart metaller katıda da hareketli elektronlarla iletir; nötr moleküler adayın bu iyon taşıyıcı verisi yoktur. Gözlem bileşim bilgisiyle birlikte kullanılmalıdır; verilen adaylar içinde iyonik yapı en uygundur.",
  ],
  [
    "Aynı saf sıvı 25 °C’de iki kapta sıvı–buhar dengesindedir, her ikisinde de sıvı kalmıştır. Birinin yüzeyi daha geniştir. Denge buhar basınçları için ne söylenir?",
    "Eşittir.",
    [
      "Geniş yüzeyde kesin iki kattır.",
      "Dar yüzeyde her zaman sıfırdır.",
      "Sıvı miktarı çok olanda zorunlu büyüktür.",
      "Yalnız kabın rengine bağlıdır.",
    ],
    "Denge değerini buharlaşma hızından ayır.",
    "Saf sıvı türü, sıcaklık ve iki fazın varlığı aynıdır; bu koşullarda denge buhar basınçları eşittir. Yüzey alanı dengeye ulaşma hızını etkileyebilir fakat son denge basıncını tek başına değiştirmez. Tüm sıvının buharlaştığı bir kap olsaydı doygunluk varsayımı yeniden kontrol edilirdi.",
  ],
  [
    "Sızdırmaz ideal gaz 300 K’de 2 L hacimdedir. Basınç sabit tutularak 450 K’ye çıkarılıyor; faz değişmiyor. Yeni hacim kaç L?",
    "3",
    ["1", "1,5", "2", "4,5"],
    "n ve P sabitken V/T sabittir.",
    "V₂=V₁×T₂/T₁=2×450/300=3 L bulunur. Kelvin sıcaklığı yüzde 50 arttığı için sabit basınçta hacim de yüzde 50 artar. n sabitliği ve faz değişmeme koşulu verilmiştir; basıncı ters orantı koşulundaki gibi değiştirmemelisin.",
  ],
  [
    "Havada su buharı kısmi basıncı 1,2 kPa, aynı sıcaklıktaki doygunluk basıncı 2,4 kPa’dır. Bağıl nem kaçtır?",
    "%50",
    ["%2", "%20", "%100", "%200"],
    "Kısmi basıncı doygunluk değerine böl ve yüzle çarp.",
    "Bağıl nem=1,2/2,4×100=%50’dir. Payda aynı sıcaklığın doygunluk basıncıdır; oranı ters çevirmek %200 hatası verir. Toplam hava basıncı veya yüzey alanı bu verilen tanımdaki paydanın yerine geçmez. Miktar ile yüzde doygunluğu ayrı niceliklerdir.",
  ],
  [
    "Plazma için hangi yorum bilimsel olarak uygundur?",
    "Sıcak lav olmak tek başına serbest elektron–iyon plazması olmayı kanıtlamaz.",
    [
      "Her sıcak sıvı plazmadır.",
      "Plazmada hiçbir elektrik yükü bulunmaz.",
      "Magma her koşulda yalnız elektronlardan oluşur.",
      "Plazma kesinlikle akışkan olamaz.",
    ],
    "Yük taşıyan iyonlaşmış gaz ile kayaç eriyiğini ayır.",
    "Plazma tanımında iyonlaşmış ortamın serbest elektron ve iyonlarının toplu etkisi önemlidir. Lav sıcak kayaç eriyiğidir; yüksek sıcaklık tek başına bu koşulu sağlamaz. Plazma yaklaşık toplam nötr olabilse de yük taşıyıcıları vardır. Bütün plazmaların ağır taneciklerini aynı sıcaklıkta varsaymak da gerekmez.",
  ],
  [
    "1 atm’de saf su 100 °C’ye yeni ulaşmış ve henüz buharlaşma gizli ısısı verilmemiştir. Doğru yorum hangisidir?",
    "100 °C sıvı kaynama başlangıcında olabilir; tamamı gaz sonucu zorunlu değildir.",
    [
      "100 °C görülen her su örneği mutlaka tamamen gazdır.",
      "Sıvı su 100 °C’de hiçbir basınçta bulunamaz.",
      "Isınma için alınan enerji otomatik bütününü buharlaştırır.",
      "Suyun kimliği H₂ ve O₂ olmuştur.",
    ],
    "Sıcaklık eşiğiyle dönüşümün tamamlanmasını ayır.",
    "Kaynama sıcaklığına ulaşmakla tüm kütlenin buharlaşması aynı enerji adımı değildir. Verilen 1 atm koşulunda su 100 °C sıvı olarak kaynamaya başlayabilir; buharlaşma için ek gizli ısı gerekir. Faz miktarını yalnız termometreden kesin belirleyemeyiz; su kimliği yine H₂O’dur.",
  ],
  [
    "Kayıpsız sabit güçlü ısıtıcıyla bir faz platosunun süresi t=mL/P’dir. İki deneyin kütlesi ve net gücü farklıysa yalnız uzun plato hangi sonucu kesin verir?",
    "Tek başına daha büyük L değerini kesin vermez.",
    [
      "Mutlaka daha büyük L vardır.",
      "Mutlaka daha küçük kütle vardır.",
      "Plato boyunca enerji sıfırdır.",
      "Basınç bilgisi hiçbir geçişte gerekmez.",
    ],
    "Süreyi etkileyen üç niceliği ayrı tut.",
    "Plato süresi yalnız L’ye değil kütleye ve net güce de bağlıdır. Daha uzun süre daha çok kütleden veya daha küçük güçten kaynaklanabilir. L sıralaması için diğer koşulları eşitlemek ya da m/P etkisini hesaplamak gerekir. Plato sıcaklığının sabit kalması enerji aktarımının sıfır olduğu anlamına gelmez.",
  ],
];

export const forge011ChemistryGuides: LessonGuide[] = [
  namingGuide,
  weakGuide,
  hydrogenGuide,
  changeGuide,
  phaseGuide,
];
export const forge011ChemistryTopics: Record<string, string> = {
  "kovalent-adlandirma-metalik-bag": "detail-157",
  "zayif-etkilesimler": "detail-158",
  "hidrojen-bagi": "detail-159",
  "fiziksel-kimyasal-degisimler": "detail-160",
  "maddenin-halleri": "detail-161",
};
const titles = [
  "Kovalent adlandırma ve metalik bağ",
  "Zayıf etkileşimler: doğru tanecik çiftini seç",
  "Hidrojen bağı: verici, alıcı ve ağ",
  "Fiziksel ve kimyasal değişimler",
  "Maddenin hâlleri: tanecikten enerji grafiğine",
];
const itemBanks = [
  namingItems,
  weakItems,
  hydrogenItems,
  changeItems,
  phaseItems,
];
function makeQuestions(id: string, items: Item[]): Question[] {
  return items.map(([prompt, correct, wrong, hint, explanation], i) => {
    const answer = i % 5,
      options = [...wrong];
    options.splice(answer, 0, correct);
    return {
      id: `f011-chem-${id}-${i + 1}`,
      prompt: txt(prompt),
      options: options.map(txt),
      answer,
      hint: txt(hint),
      explanation: txt(explanation),
      skill: id,
    };
  });
}
export const forge011ChemistryLessons: Lesson[] = forge011ChemistryGuides.map(
  (guide, i) => ({
    id: guide.id,
    subjectId: "tyt-kimya",
    title: txt(titles[i]),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: makeQuestions(guide.id, itemBanks[i]),
    source: txt(guide.source),
    tags: [guide.id, "kaynakli-anlatim"],
  }),
);
