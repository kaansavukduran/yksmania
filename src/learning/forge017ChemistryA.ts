import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";

const clamp = (x: number, low: number, high: number) =>
  Number.isFinite(x) ? Math.min(high, Math.max(low, x)) : low;
export const metal017Cases = [
  {
    id: "mg",
    name: "Mg ve HCl",
    equation: "Mg + 2 HCl → MgCl₂ + H₂",
    metal: "Mg",
    reagent: "HCl",
    gas: "H₂",
    a: 1,
    b: 2,
    g: 1,
    electrons: 2,
    condition:
      "Sulu HCl, uygun koşullar; yalnız verilen tepkime sonuna kadar sürer.",
  },
  {
    id: "zn",
    name: "Zn ve HCl",
    equation: "Zn + 2 HCl → ZnCl₂ + H₂",
    metal: "Zn",
    reagent: "HCl",
    gas: "H₂",
    a: 1,
    b: 2,
    g: 1,
    electrons: 2,
    condition:
      "Sulu HCl; metal saf, oksit tabakası etkisi ve yan tepkime bu modelde yok.",
  },
  {
    id: "al-acid",
    name: "Al ve HCl",
    equation: "2 Al + 6 HCl → 2 AlCl₃ + 3 H₂",
    metal: "Al",
    reagent: "HCl",
    gas: "H₂",
    a: 2,
    b: 6,
    g: 3,
    electrons: 3,
    condition:
      "Tepkimeyi engelleyen yüzey tabakası yok; verilen sulu asitte tam dönüşüm kabulü.",
  },
  {
    id: "cu-dilute",
    name: "Cu ve seyreltik HNO₃",
    equation: "3 Cu + 8 HNO₃ → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O",
    metal: "Cu",
    reagent: "HNO₃",
    gas: "NO",
    a: 3,
    b: 8,
    g: 2,
    electrons: 2,
    condition:
      "Verilen seyreltik nitrik asit koşullarında yalnız yazılı toplam denklem kullanılır.",
  },
  {
    id: "cu-conc",
    name: "Cu ve derişik HNO₃",
    equation: "Cu + 4 HNO₃ → Cu(NO₃)₂ + 2 NO₂ + 2 H₂O",
    metal: "Cu",
    reagent: "HNO₃",
    gas: "NO₂",
    a: 1,
    b: 4,
    g: 2,
    electrons: 2,
    condition:
      "Verilen derişik nitrik asit koşullarında gaz NO₂; bu dijital bir bilanço modelidir.",
  },
  {
    id: "al-base",
    name: "Al ve sulu güçlü baz",
    equation: "2 Al + 2 OH⁻ + 6 H₂O → 2 [Al(OH)₄]⁻ + 3 H₂",
    metal: "Al",
    reagent: "OH⁻",
    gas: "H₂",
    a: 2,
    b: 2,
    g: 3,
    electrons: 3,
    condition:
      "Su fazla; uygun sulu güçlü baz koşulu. Ürün, sulu hidroksokomplekstir.",
  },
  {
    id: "cu-hcl",
    name: "Cu ve sulu HCl",
    equation: "Cu + HCl: bu modelde H₂ oluşmaz.",
    metal: "Cu",
    reagent: "HCl",
    gas: "Yok",
    a: 1,
    b: 1,
    g: 0,
    electrons: 0,
    condition:
      "Yükseltgen başka madde yok; bu sulu HCl koşulunda bakır H₂ çıkarmaz.",
  },
] as const;
export function metal017(kind: string, metalMol: number, reagentMol: number) {
  const chosen = metal017Cases.find((c) => c.id === kind) ?? metal017Cases[0];
  const metal = clamp(metalMol, 0, 0.4),
    reagent = clamp(reagentMol, 0, 1.2);
  const capacityM = metal / chosen.a,
    capacityR = reagent / chosen.b;
  const extent = chosen.g === 0 ? 0 : Math.min(capacityM, capacityR);
  const consumedMetal = chosen.a * extent,
    consumedReagent = chosen.b * extent;
  const close =
    Math.abs(capacityM - capacityR) <=
    8 * Number.EPSILON * Math.max(capacityM, capacityR);
  const limiter =
    chosen.g === 0
      ? "no-reaction"
      : metal === 0 && reagent === 0
        ? "none"
        : close
          ? "both"
          : capacityM < capacityR
            ? "metal"
            : "reagent";
  return {
    chosen,
    metal,
    reagent,
    extent,
    consumedMetal,
    consumedReagent,
    gas: chosen.g * extent,
    metalLeft: Math.max(0, metal - consumedMetal),
    reagentLeft: Math.max(0, reagent - consumedReagent),
    electronMol: consumedMetal * chosen.electrons,
    limiter,
  };
}
export function carbonate017(stoneMol: number, availableHMol: number) {
  const stone = clamp(stoneMol, 0, 0.2),
    acid = clamp(availableHMol, 0, 0.8),
    dissolved = Math.min(stone, acid / 2);
  return {
    stone,
    acid,
    dissolved,
    gas: dissolved,
    calcium: dissolved,
    water: dissolved,
    stoneLeft: Math.max(0, stone - dissolved),
    acidLeft: Math.max(0, acid - 2 * dissolved),
    lostGram: dissolved * 100,
    leftGram: Math.max(0, stone - dissolved) * 100,
  };
}
export function soap017(soapMmol: number, calciumMmol: number) {
  const soap = clamp(soapMmol, 0, 20),
    calcium = clamp(calciumMmol, 0, 12),
    precipitate = Math.min(calcium, soap / 2);
  return {
    soap,
    calcium,
    precipitate,
    consumedSoap: 2 * precipitate,
    soapLeft: Math.max(0, soap - 2 * precipitate),
    calciumLeft: Math.max(0, calcium - precipitate),
  };
}
export const polymer017Kinds = [
  {
    id: "pe",
    name: "Polietilen · PE",
    monomer: "CH₂=CH₂",
    repeat: "–CH₂–CH₂–",
    atoms: { C: 2, H: 4, Cl: 0, F: 0 },
    mass: 28,
    use: "Bazı ambalaj filmleri ve kablo kılıfları",
  },
  {
    id: "pvc",
    name: "Polivinil klorür · PVC",
    monomer: "CH₂=CHCl",
    repeat: "–CH₂–CHCl–",
    atoms: { C: 2, H: 3, Cl: 1, F: 0 },
    mass: 62.5,
    use: "Uygun formülde boru ve pencere profili",
  },
  {
    id: "ptfe",
    name: "Politetrafloroeten · PTFE",
    monomer: "CF₂=CF₂",
    repeat: "–CF₂–CF₂–",
    atoms: { C: 2, H: 0, Cl: 0, F: 4 },
    mass: 100,
    use: "Uygun koşullarda düşük yapışmalı yüzey kaplaması",
  },
] as const;
export function polymer017(kind: string, repeatCount: number) {
  const chosen =
      polymer017Kinds.find((c) => c.id === kind) ?? polymer017Kinds[0],
    count = Math.round(clamp(repeatCount, 2, 8));
  return {
    chosen,
    count,
    atoms: {
      C: chosen.atoms.C * count,
      H: chosen.atoms.H * count,
      Cl: chosen.atoms.Cl * count,
      F: chosen.atoms.F * count,
    },
    repeatMass: chosen.mass,
    segmentMass: chosen.mass * count,
  };
}
export function foodLabel017(portionGram: number) {
  const portion = clamp(portionGram, 0, 100);
  return {
    portion,
    fat: (portion * 20) / 100,
    saturated: (portion * 8) / 100,
    carbohydrate: (portion * 30) / 100,
    protein: (portion * 5) / 100,
  };
}

type Item = [string, string, [string, string, string, string], string, string];
type Unit = LessonGuide & { title: string; topic: string; items: Item[] };
const S = (title: string, first: string, second: string): GuideSection => ({
  title,
  paragraphs: [first, second],
});
const E = (
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
    label: `${i + 1}. adım`,
    explanation,
  })),
  answer,
  check,
  pitfall,
});
const Q = (
  prompt: string,
  answer: string,
  wrong: [string, string, string, string],
  hint: string,
  explanation: string,
): Item => [prompt, answer, wrong, hint, explanation];
const unitData: Unit[] = [
  {
    id: "asit-baz-metaller",
    topic: "detail-189",
    title: "Asit ve bazların metallerle tepkimeleri",
    minutes: 42,
    objectives: [
      "Metal, asit türü ve ortam koşulundan geçerli tepkimeyi seç.",
      "Gaz, artan giren ve elektron miktarlarını dengeli denklemle ilişkilendir.",
      "Alaşım ve pasifleşme gözlemlerinin neyi kanıtladığını ayır.",
    ],
    sections: [
      S(
        "Kabarcık neyin kanıtı?",
        "Bir metalin çözeltide azalması, gaz çıkması ve çözeltinin renk değiştirmesi farklı gözlemlerdir. Kabarcık görmek, gazın mutlaka hidrojen olduğunu söylemez. Önce metalin adını, asidi ve koşulları yaz; sonra bu koşula ait dengeli denklemi seç.",
        "Örneğin uygun HCl ile Mg tepkimesinde H₂ oluşabilir. Bakırın nitrik asitle tepkimesinde ise verilen koşullara göre NO veya NO₂ görülebilir. Gözlemi açıklayan kimyasal türü bilmek, benzer görünen iki olayı ayırır; yalnız köpük miktarı sınıflandırma yapmaz.",
      ),
      S(
        "Elektronu metal verir",
        "Mg → Mg²⁺ + 2e⁻ yarı tepkimesinde metal yükseltgenir. Asidik ortamın hidrojen iyonları 2H⁺ + 2e⁻ → H₂ ile indirgenebilir. Verilen ve alınan elektron miktarı aynı olmalıdır; net denklemde elektron kalmamasının nedeni budur.",
        "Mg + 2HCl → MgCl₂ + H₂ toplam denkleminde klorür iyonları tuzun bileşenidir. Çözeltide H⁺ gösterimi, hidratlanmış proton için kullanılan okul kısaltmasıdır. Atom sayısı, yük ve elektron bilançosu birlikte denetlenir; asit-baz tepkimesi ile redoks aynı ölçüt değildir.",
      ),
      S(
        "Asidin adı önemlidir",
        "Uygun sulu HCl koşullarında Mg, Zn ve Fe gibi metaller hidrojenin yerini alabilir. Mg + 2HCl → MgCl₂ + H₂ ve Fe + 2HCl → FeCl₂ + H₂ örneklerinde metalin yükseltgenme basamağına uygun tuz yazılır.",
        "Bunu “her metal, her asitle H₂ verir” biçiminde genişletme. Asidin yükseltgen özelliği, derişimi, sıcaklık ve yüzey tabakası sonucu değiştirebilir. Bir soruda denklem verilmişse miktar hesabı o denklem üzerindendir; başka koşulun ürününü taşıma.",
      ),
      S(
        "Gaz ile artan maddeyi birlikte hesapla",
        "Bir giren bol olsa da diğeri bittiğinde verilen tek yönlü tepkime durur. Her girenin molünü kendi katsayısına bölmek, izin verdiği tepkime ilerlemesini bulur. Küçük bölüm, oluşabilecek ürün miktarını sınırlar.",
        "0,20 mol Mg ile 0,30 mol HCl için bölümler 0,20 ve 0,15 olur. İlerleme 0,15 mol; H₂ 0,15 mol, artan Mg 0,05 moldür. Gaz oluşmuş olması metalin tamamının tükendiğini göstermez. Başlangıç, tüketilen ve artan sütunlarını ayrı tut.",
      ),
      S(
        "Bakır ve sulu HCl kontrolü",
        "Başka yükseltgenin bulunmadığı verilen sulu HCl okul modelinde Cu, H⁺ iyonlarından H₂ çıkarmaz. Mg ile aynı koşula konulduğunda farklı sonuç vermesi, “metal” sözcüğünün tek başına yeterli bir tepkime kuralı olmadığını gösterir.",
        "Bu sınır, bakırın hiçbir kimyasalla tepkime vermeyeceği anlamına gelmez. HNO₃ gibi yükseltgen bir asit veya başka bir yükseltgen ortamı değiştirebilir. “Bu koşulda H₂ yok” ile “her koşulda kimyasal değişim imkânsız” farklı iddialardır.",
      ),
      S(
        "Nitrik asitte farklı gazlar",
        "Verilen seyreltik koşulda 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO + 4H₂O kullanılabilir. Verilen derişik koşulda Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O yazılır. Burada indirgenen türün ürünü hidrojen değildir.",
        "Denklemlerde hem asit tüketimi hem gaz katsayısı değişir. Aynı asit molü aynı gaz molünü garanti etmez. NO havadaki oksijenle sonradan değişebilir; bu ikinci olay ilk denklemin ürününü değiştirmez. Dijital şema, tehlikeli gazlarla gerçek deney yapma talimatı değildir.",
      ),
      S(
        "Soy metal bir koşul sınıfıdır",
        "Au ve Pt okul sınıflamasında soy metallerin tipik örnekleridir. Olağan verilen tek asit ortamlarına dirençleri, birçok aktif metalden ayrılmalarını sağlar. Sınıflandırmayı soruda belirtilen reaktif ve gözlemle birlikte oku.",
        "Soy sözcüğü her kimyasala ve bütün koşullara mutlak bağışıklık anlamına gelmez. Karma yükseltgen ortamlar farklı davranış doğurabilir. Ürün veya miktar sorulacaksa uygun denklem ve koşul ayrıca verilmelidir; yalnız sınıf adından bilinmeyen tepkime üretme.",
      ),
      S(
        "Amfoterliği iki gözlemle ayır",
        "Al ve Zn, uygun koşullarda hem asitle hem güçlü bazla tepkime verebilen amfoter metal örnekleridir. Yalnız HCl ile hidrojen çıkması bu sınıfı kanıtlamaz; aynı gözlem Mg gibi başka bir metalde de bulunabilir.",
        "Ayrı güçlü baz ortamında OH⁻ tüketip çözünür hidroksokompleks oluşturması ayırt edici kanıt sağlar. Yalnız iki sulu ortamda gaz görülmesi yetmez; suyla tepkime olasılığı ayrılmalıdır. Bazın türü, derişimi ve yüzey önemlidir; her zayıf baz aynı tepkiyi vermez.",
      ),
      S(
        "Sulu bazda su da denklemdedir",
        "Uygun sulu bazda alüminyum için 2Al + 2OH⁻ + 6H₂O → 2[Al(OH)₄]⁻ + 3H₂ gösterimi atom ve yükü korur. Solda toplam yük −2, sağda −2; her iki tarafta Al, O ve H sayıları da eşittir. Sulu ürün bir hidroksokomplekstir.",
        "Suyu denklemden silip hidrojen gazının nereden geldiğini belirsiz bırakma. Eski kısa alüminat yazımları farklı ortam gösterimleri olabilir; onları koşulsuz gerçek sulu tür gibi çizmek yanıltır. Bu ünitedeki baz hesabında su fazla, OH⁻ miktarı ise açıkça verilmiştir.",
      ),
      S(
        "Pasif yüzey ve tepkime hızı",
        "Al üzerindeki oksit tabakası veya bazı derişik yükseltgen ortamlarda oluşan koruyucu tabaka tepkimeyi gözlenenden daha yavaş hâle getirebilir. Kısa sürede kabarcık görülmemesi, her durumda ürün oluşumunun kimyasal olarak imkânsız olduğunu kanıtlamaz.",
        "Tam tüketim hesabı yapılırken engelleyici tabakanın olmadığı veya verilen tepkimenin sonuna kadar sürdüğü belirtilmelidir. Sıcaklık ve yüzey alanı hızla, katsayılar ise madde oranıyla ilgilidir. Hızdaki artışı kendiliğinden daha yüksek son gaz miktarı diye yorumlama.",
      ),
      S(
        "Alaşımı gazdan geriye doğru çöz",
        "Cu–Zn alaşımının uygun HCl ile yalnız Zn kısmı tepkimeye giriyorsa Zn + 2HCl → ZnCl₂ + H₂ denklemi gazı Zn miktarına bağlar. Önce H₂ molünü, sonra eşit Zn molünü, ardından mol kütlesiyle Zn gramını bul.",
        "Alaşımın toplam kütlesi verilirse Zn kütlesini buna bölerek kütle yüzdesi çıkar. Cu kısmı bu gaz hesabına eklenmez. Hacim verilmişse gazın sıcaklık ve basınç koşulu gerekir; her gaz hacmini koşulsuz 22,4 sayısına bölmek geçerli değildir.",
      ),
      S(
        "Malzeme ve deney ölçeği",
        "Asit veya güçlü bazın saklanacağı kap için yalnız “metaldir” demek yetmez; seçilen metal ve reaktif arasındaki uyum belirleyicidir. Ayrıca Ca gibi suyla tepkime verebilen bir metal için “amfoter değil” demek, sulu baz ortamında hiçbir olay olamayacağını göstermez.",
        "Aynı dengeli tepkimeyi daha az maddeyle düşünmek toplam kimyasal ve atık miktarını azaltabilir. Fakat katsayı oranları ve teorik atom ekonomisi yalnız ölçek küçüldü diye değişmez. Dijital karşılaştırmada madde bilançosu korunur; fiziksel ev deneyi veya karışım hazırlama istenmez.",
      ),
    ],
    examples: [
      E(
        "Asit biter, metal kalır",
        "Yalnız Mg + 2HCl → MgCl₂ + H₂ tepkimesi sonuna kadar sürüyor. Başlangıçta 0,20 mol Mg ve 0,30 mol HCl var. H₂ ve artan Mg miktarları nedir?",
        "Her girenin sağladığı ilerlemeyi karşılaştır.",
        [
          "Mg için 0,20/1 = 0,20; HCl için 0,30/2 = 0,15 mol ilerleme bulunur.",
          "Küçük değer 0,15 olduğundan HCl biter; 0,15 mol Mg tüketilir ve 0,15 mol H₂ oluşur.",
          "Artan Mg = 0,20 − 0,15 = 0,05 mol; artan HCl sıfırdır.",
        ],
        "0,15 mol H₂; 0,05 mol Mg artar.",
        "0,15 mol Mg için gereken HCl 2 × 0,15 = 0,30 moldür.",
        "0,20 mol metalin tamamının tepkimeye girdiğini varsayma.",
      ),
      E(
        "Gaz alaşımın bir kısmını anlatır",
        "20 g Cu–Zn alaşımında yalnız Zn uygun HCl ile tamamen tepkimeye giriyor. Zn + 2HCl → ZnCl₂ + H₂; 0,10 mol H₂ oluşuyor. M(Zn)=65 g/mol. Zn kütle yüzdesi nedir?",
        "Gaz molünden Zn gramına dön.",
        [
          "Zn:H₂ oranı 1:1; alaşımda 0,10 mol Zn vardır.",
          "Zn kütlesi 0,10 × 65 = 6,5 g bulunur.",
          "Alaşımın Zn yüzdesi 6,5/20 × 100 = %32,5 olur.",
        ],
        "%32,5 Zn",
        "Kalan 13,5 g Cu ile toplam 20 g korunur.",
        "Bakırın kütlesini hidrojen üretmiş gibi katsayı hesabına katma.",
      ),
      E(
        "Aynı stok, farklı nitrik asit koşulu",
        "Ayrı iki kapta 0,30 mol Cu ve 0,80 mol HNO₃ vardır. Seyreltik koşulda 3Cu+8HNO₃→3Cu(NO₃)₂+2NO+4H₂O; derişik koşulda Cu+4HNO₃→Cu(NO₃)₂+2NO₂+2H₂O geçerlidir. Her verilen tepkime sınırlayıcı giren tükenene kadar sürüyor. Gaz miktarları?",
        "İki denklemi ayrı hesapla.",
        [
          "Seyreltik kapta 0,30/3 = 0,80/8 = 0,10 mol ilerleme vardır.",
          "NO miktarı 2 × 0,10 = 0,20 moldür; iki giren verilen oranda tükenir.",
          "Derişik kapta ilerleme min(0,30; 0,80/4)=0,20; 0,40 mol NO₂ oluşur ve 0,10 mol Cu artar.",
        ],
        "0,20 mol NO; 0,40 mol NO₂",
        "Derişik kapta 0,20 mol Cu başına 0,80 mol asit gerekir.",
        "Seyreltik denklemin katsayısını derişik koşula taşıma.",
      ),
      E(
        "Bazda suyu koruyan hesap",
        "Uygun sulu bazda 2Al+2OH⁻+6H₂O→2[Al(OH)₄]⁻+3H₂ tepkimesi sonuna kadar sürüyor. 0,12 mol Al, 0,20 mol OH⁻ ve fazla su var. H₂ ile artan OH⁻?",
        "Al ve OH⁻ katsayıları eşit, gaz katsayısı farklıdır.",
        [
          "İlerleme sınırları Al için 0,12/2 = 0,06; OH⁻ için 0,20/2 = 0,10 moldür.",
          "Al sınırlıdır. H₂ = 3 × 0,06 = 0,18 mol; tüketilen OH⁻ = 2 × 0,06 = 0,12 mol.",
          "Artan OH⁻ = 0,20 − 0,12 = 0,08 mol. Aynı anda 0,12 mol kompleks oluşur.",
        ],
        "0,18 mol H₂; 0,08 mol OH⁻ artar.",
        "Tüketilen su 6 × 0,06 = 0,36 mol; fazla su koşuluyla uyumludur.",
        "Baz çözeltisindeki hidrojen kaynağını açıklarken suyu silme.",
      ),
    ],
    recall: [
      {
        prompt: "Asit ve metalden çıkan her gaz H₂ midir?",
        answer:
          "Hayır. Metal, asidin yükseltgen özelliği ve verilen koşul gaz türünü belirler.",
      },
      {
        prompt:
          "Bir metalin yalnız HCl ile H₂ çıkarması amfoterliği kanıtlar mı?",
        answer: "Hayır; uygun güçlü bazla davranış da ayırt edilmelidir.",
      },
      {
        prompt: "Al sulu baz denkleminde neden H₂O var?",
        answer:
          "Atom bilançosu ve hidroksokompleks oluşumu suyu içerir; su hidrojen kaynağına katılır.",
      },
      {
        prompt: "Hız artarsa son gaz miktarı mutlaka artar mı?",
        answer:
          "Hayır; aynı başlangıç ve tam dönüşümde son miktarı stokiyometri belirler, hız süreyi etkiler.",
      },
    ],
    items: [
      Q(
        "Mg + 2HCl → MgCl₂ + H₂ tepkimesinde 0,25 mol Mg, yeterli sulu HCl ile tamamen tüketiliyor. Kaç mol H₂ oluşur?",
        "0,25 mol",
        ["0,125 mol", "0,50 mol", "1 mol", "2 mol"],
        "Mg:H₂ katsayı oranı 1:1.",
        "0,25 mol Mg, 0,25 mol H₂ verir. İki HCl katsayısı gaz miktarını iki kat yapmaz.",
      ),
      Q(
        "Zn + 2HCl → ZnCl₂ + H₂ tepkimesi için 0,40 mol HCl ve fazla Zn var. HCl tamamen tükeniyor. Oluşan H₂ miktarı nedir?",
        "0,20 mol",
        ["0,10 mol", "0,40 mol", "0,80 mol", "1,20 mol"],
        "HCl molünü ikiye böl.",
        "İlerleme 0,40/2 = 0,20 mol; gaz katsayısı bir olduğundan 0,20 mol H₂ oluşur.",
      ),
      Q(
        "2Al + 6HCl → 2AlCl₃ + 3H₂ tepkimesinde 0,20 mol Al yeterli asitle tamamen tüketiliyor. H₂ miktarı nedir?",
        "0,30 mol",
        ["0,10 mol", "0,20 mol", "0,40 mol", "0,60 mol"],
        "Al molünü 3/2 ile çarp.",
        "0,20 × 3/2 = 0,30 mol H₂. Katsayıların oranı kullanılır; gram oranı verilmiş değildir.",
      ),
      Q(
        "Başka yükseltgen içermeyen sulu HCl ortamında Mg hidrojen çıkarıyor, Cu ise H₂ çıkarmıyor. Bu veriden hangisi çıkar?",
        "Bu koşulda Cu için Mg ile aynı H₂ üretme kuralı kullanılamaz.",
        [
          "Cu hiçbir maddeyle tepkime vermez.",
          "Cu mutlaka amfoterdir.",
          "Her metal HCl ile aynı miktarda gaz verir.",
          "HCl içindeki gaz kesin CO₂’dir.",
        ],
        "Sonucu gözlenen ortamla sınırla.",
        "Yalnız verilen sulu HCl davranışı karşılaştırılmıştır. Cu için başka yükseltgen asitlerin sonucu bu veriden reddedilemez.",
      ),
      Q(
        "3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO + 4H₂O denklemi verilen seyreltik koşulda geçerlidir. 0,30 mol Cu ile 0,80 mol HNO₃ sınırlayıcı giren tükenene kadar tepkimeye giriyor. Kaç mol NO oluşur?",
        "0,20 mol",
        ["0,10 mol", "0,30 mol", "0,40 mol", "0,80 mol"],
        "İki girenin mol/katsayı bölümleri eşittir.",
        "0,30/3 = 0,80/8 = 0,10 mol ilerleme; 2 × 0,10 = 0,20 mol NO oluşur.",
      ),
      Q(
        "Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O denklemi verilen derişik koşulda geçerlidir. 0,30 mol Cu ve 0,80 mol HNO₃ ile sınırlayıcı giren tükeniyor. Artan Cu miktarı nedir?",
        "0,10 mol",
        ["0 mol", "0,05 mol", "0,20 mol", "0,30 mol"],
        "Asit 0,80/4 mol Cu tüketir.",
        "0,20 mol Cu harcanır. Başlangıç 0,30 olduğundan 0,10 mol Cu artar; oluşan gaz NO₂’dir.",
      ),
      Q(
        "X metali uygun HCl ortamında H₂ oluşturuyor. Ayrı bir sulu güçlü NaOH ortamında ise OH⁻ tüketerek çözünür hidroksokompleks oluşturduğu ve H₂ çıkardığı doğrulanıyor. Yalnız suyla tepkime açıklaması dışlanmıştır. Bu davranış hangi okul sınıfına uygundur?",
        "Amfoter metal",
        [
          "Soy metal",
          "Soy gaz",
          "Yalnız asitle tepkime veren metal",
          "Karbonat tuzu",
        ],
        "İki farklı ortam birlikte verilmiştir.",
        "Al veya Zn gibi amfoter metaller uygun asit ve güçlü bazla H₂ oluşturabilir. Yalnız bir asit gözlemi olsaydı bu sonuç yetmezdi.",
      ),
      Q(
        "Uygun sulu bazda 2Al+2OH⁻+6H₂O→2[Al(OH)₄]⁻+3H₂ tepkimesi için 0,10 mol Al, 0,20 mol OH⁻ ve fazla su var. Al tamamen tüketiliyor. Artan OH⁻ kaç moldür?",
        "0,10 mol",
        ["0 mol", "0,05 mol", "0,15 mol", "0,30 mol"],
        "Al ve OH⁻ oranı 1:1.",
        "0,10 mol OH⁻ tüketilir; 0,20 − 0,10 = 0,10 mol kalır. Su fazla olduğu için ayrıca sınır koymaz.",
      ),
      Q(
        "20 g Cu–Zn alaşımında yalnız Zn verilen HCl koşulunda Zn+2HCl→ZnCl₂+H₂ tepkimesini tamamen veriyor. 0,10 mol H₂ oluşuyor. M(Zn)=65 g/mol. Alaşımın Zn kütle yüzdesi nedir?",
        "%32,5",
        ["%6,5", "%20", "%50", "%65"],
        "Zn molünü grama, gramı toplam kütle oranına çevir.",
        "Zn 0,10 mol = 6,5 g; 6,5/20 × 100 = %32,5. Cu bu koşulda gaz üretmez.",
      ),
      Q(
        "Bir metalin koruyucu oksit tabakası kısa sürede gözlenebilir gaz çıkışını engelliyor. Yalnız bu gözlem hangisini kesin kanıtlamaz?",
        "Verilen metalin bütün koşullarda kimyasal tepkimeye giremeyeceğini",
        [
          "Gözlem süresinde görünür gaz çıkışının olmadığını",
          "Yüzey koşulunun gözlenen hızı etkileyebileceğini",
          "Tam tüketim hesabı için koşul belirtmek gerektiğini",
          "Gaz gözleminin süre ve yüzeyle birlikte yorumlanması gerektiğini",
        ],
        "Hız gözleminden evrensel sonuç çıkarma.",
        "Pasif tabaka ve gözlem süresi kinetik sınırdır. Bunlar metalin her reaktife karşı mutlak tepkimesiz olduğunu kanıtlamaz.",
      ),
    ],
    source:
      "Aurelia TYT Kimya 051 PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 83; OGM Dersler Cepte Asitler ve Bazlar PDF 17–20 ve 10. Sınıf Ders Kitabı Sürdürülebilirlik ilgili sayfaları karşılaştırıldı. Sulu tür ve koşul sınırları açıklanmıştır. Anlatım, şema ve alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
];

unitData.push(
  {
    id: "hayatimizda-asit-baz",
    topic: "detail-190",
    title: "Hayatımızdaki asit ve bazlar",
    minutes: 39,
    objectives: [
      "Günlük adları formül, tür ve kullanım amacıyla ilişkilendir.",
      "Karbonat tepkimesi ve yağmur asitliğini koşullarıyla açıkla.",
      "Ürün etiketi, malzeme uyumu ve ölçülen pH bilgisinin sınırlarını ayır.",
    ],
    sections: [
      S(
        "Ürün adı bir formül değildir",
        "Sirke asetik asit içeren bir karışımdır; şişenin tamamı saf CH₃COOH değildir. Limon suyunda sitrik asit, yoğurt gibi fermente ürünlerde laktik asit bulunabilir. Ürün adı hangi bileşenin bulunabileceğini söyler, bütün bileşimi veya derişimi tek başına vermez.",
        "Birbirine benzeyen iki ürünün aynı pH veya aynı asit tüketme kapasitesine sahip olması gerekmez. İçerik, miktar ve ölçüm verisini ayrı oku. Ekşi tat ve koku, bilinmeyen bir kimyasalı tanımak için güvenli deney yöntemleri değildir; bu uygulamada tatma veya koklama testi yapılmaz.",
      ),
      S(
        "Organik asitleri bağlama yerleştir",
        "Asetik, sitrik ve laktik asit adlarını yalnız bir eşleştirme listesi olarak öğrenme. Gıdanın bir karışım olduğunu, asidin suyla dengede iyonlaşabildiğini ve pH üzerinde başka bileşenlerin de etkili olabildiğini birlikte düşün.",
        "Sirke–asetik asit ve limon–sitrik asit eşleşmeleri yararlı örneklerdir. Fakat “sirke” yazması çözeltinin molaritesini vermez. Bu örneklerde kimyasal türün adı, asidin kuvveti, ürünün derişimi ve kullanım amacı farklı soruların cevaplarıdır.",
      ),
      S(
        "Kostik, amonyak ve kullanım amacı",
        "Sud kostik NaOH, potas kostik KOH için kullanılan günlük adlardır. NH₃ ise suda bazik davranabilen amonyaktır; yapısında OH grubu yazılmaması sulu çözeltisinin bazik olamayacağı anlamına gelmez.",
        "NaOH ve KOH sabun üretimi gibi alanlarda, amonyak ise çeşitli endüstriyel süreçlerde kullanılabilir. Bir maddenin faydalı bir kullanımının bulunması her temas biçiminin uygun olduğu anlamına gelmez. Ticari ürünün derişimi ve malzeme uyumu etiketten anlaşılır; isimden doz veya uygunluk seçilmez.",
      ),
      S(
        "Kirecin üç ayrı adı",
        "Kireç taşı CaCO₃, sönmemiş kireç CaO, sönmüş kireç Ca(OH)₂ ile temsil edilir. Üçü de kalsiyum ve oksijen içerir; karbon ve hidrojen ise bütün formüllerde ortak değildir. Gündelik “kireç” sözcüğü bu farkı gizleyebilir.",
        "Uygun ısıtmayla CaCO₃ → CaO + CO₂; suyla CaO + H₂O → Ca(OH)₂; karbon dioksitle Ca(OH)₂ + CO₂ → CaCO₃ + H₂O dönüşümleri yazılır. Bunlar üç farklı kimyasal değişimdir; fiziksel karışım ayırması gibi anlatılmaz. Bu denklemler dijital açıklama içindir.",
      ),
      S(
        "Maden suyu, gazlı içecek ve B9 örneği",
        "Maden suyu çözünmüş mineral iyonları ve CO₂ içerebilir; tek bir saf asit değildir. Şekerli ve şekersiz gazlı içeceklerde CO₂ bilgisi aynı olsa da şeker içeriği aynı olmak zorunda değildir. Bir içeceğin gazlı olması, beslenme etiketindeki bütün değerleri belirlemez.",
        "Folik asit, B9 vitamini bağlamında karşılaşılan bir asit örneğidir; folatlarla ilişkili süreçler hücre yapımı ve bölünmesinde rol taşır. Adındaki asit sözcüğünden bir ürünün pH’sı, kişisel gereksinim veya doz çıkarılmaz. Burada amaç farklı günlük asit bağlamlarını tanımak; eksiklik tanısı veya takviye seçmek değildir.",
      ),
      S(
        "İki soda, iki farklı tuz",
        "Yemek sodası NaHCO₃, çamaşır sodası Na₂CO₃ olarak bilinir. Hidrojen karbonat HCO₃⁻ ile karbonat CO₃²⁻ farklı iyonlardır; elektriksel denge için Na sayıları da farklı olur. “Soda” kelimesi tek bir kimyasal formül değildir.",
        "Bu maddeler tuzdur; sulu çözeltileri bazik davranabilir. Katının tuz olması çözeltinin zorunlu nötr olmasını gerektirmez. Ticari kabartma tozu ise asit bileşeni ve başka bileşenler de içerebilen bir karışım olabilir; her paketi saf NaHCO₃ diye etiketleme.",
      ),
      S(
        "Kireç çözünürken neden CO₂ çıkar?",
        "Karbonatın asitle net tepkimesi CaCO₃ + 2H⁺ → Ca²⁺ + CO₂ + H₂O biçiminde gösterilebilir. Kireçli yüzey azalırken oluşan gaz karbon dioksittir. Aktif metalin uygun asitle verdiği hidrojenle karıştırma.",
        "Harcama kapasitesi verilirse çözünebilecek karbonat molü hesaplanır. Örneğin 0,10 mol kullanılabilir H⁺ en çok 0,05 mol CaCO₃ tüketir. Gerçek yüzeyin aşınma süresi, asidin yenilenmesi ve akış gibi etkenler bu basit tek-tepkime bilançosunda bulunmaz.",
      ),
      S(
        "Yüzey seçimi aynı zamanda kimyadır",
        "Mermer gibi karbonat esaslı bir malzeme asidik ortamla etkileşebilir. Metal kaplarda ise metalin türü ve reaktifin özellikleri belirleyicidir. Bir temizleyicinin bir yüzeyde uygun olması, bütün yüzeylerde aynı sonucu vereceğini kanıtlamaz.",
        "Cam için de “her aside dayanır” kuralı yoktur; HF önemli karşı örnektir. Bu bilgi evde madde denemesi yaptırmak için değil, mutlak malzeme kurallarını sorgulamak içindir. Kullanılacak ürünün etiketi ve yüzey için belirtilen koşullar esas alınır.",
      ),
      S(
        "pH, toplam asit deposu değildir",
        "25 °C’de ölçülen pH 7’nin altındaysa örnek asidik, üstündeyse baziktir. pH logaritmik bir ölçektir; pH 4,6 örneğinde hidrojen iyonu etkinliği, aynı koşuldaki pH 5,6 örneğine göre on kat olabilir. Bu fark doğrudan on kat ürün derişimi anlamına gelmez.",
        "Bir tamponlu çözelti ile tamponlanmamış başka bir çözelti aynı pH değerine sahipken farklı miktarda asidi veya bazı karşılayabilir. Bu nedenle yalnız pH değerinden kaç gram mermer çözüneceği hesaplanmaz. Dijital modelde kullanılan harcanabilir H⁺ miktarı ayrıca verilir.",
      ),
      S(
        "Doğal yağmur ve ek asit yükü",
        "Atmosferdeki CO₂ suyla dengeler kurduğu için doğal yağmur çoğu anlatımda yaklaşık pH 5,6 referansıyla hafif asidik gösterilir. Gerçek ölçüm yer, hava bileşimi ve başka koşullarla değişebilir; bu yaklaşık sayı her damlanın değişmez özelliği değildir.",
        "SOₓ ve NOₓ gazlarının atmosferdeki dönüşümleri ek asit yükü oluşturabilir. Uygun basitleştirilmiş adımlarda SO₃ + H₂O → H₂SO₄ ve N₂O₅ + H₂O → 2HNO₃ gösterilebilir. Asitler yağmur damlasında çözeltiyle ilişkilidir; şekil onları zorunlu saf gaz ürünleri gibi çizmemelidir.",
      ),
      S(
        "Kaynak ile etkilenen yer ayrı olabilir",
        "Havadaki kirleticiler atmosferik taşınımla kaynağından uzakta da etkili olabilir. Asit çökelmesi karbonat eserleri aşındırabilir, toprak ve su koşullarını değiştirebilir. Hangi gazın hangi mekanizmayla etkili olduğunu izlemek yalnız çevre sorunu adını ezberlemekten daha açıklayıcıdır.",
        "Asit yağmuru, sera etkisi ve stratosfer ozonundaki azalma aynı olayın üç adı değildir. Bazı kaynakları veya gazları ortak olabilir, fakat temel mekanizma ve etkilenen değişkenler farklıdır. CO₂’nin doğal yağmur asitliğindeki rolü ile SOₓ/NOₓ kaynaklı ek asitliği ayrı düşün.",
      ),
      S(
        "Birlikte kullanmak nötrlemek değildir",
        "Ticari temizlik ürünleri yalnız saf asit veya saf bazdan oluşmaz. Hipoklorit içeren çamaşır suyunun asitle bir araya gelmesi tehlikeli klor gazı oluşturabilir. “İki kimyasal birbirini dengeler, zararsız olur” cümlesi karışımın bütün tepkimelerini açıklamaz.",
        "Orijinal etiketli ambalaj, uygun saklama ve ürünün belirtilen kullanım biçimi önemlidir. Ürünü içecek kabına aktarmak kimyasalın türünü değiştirmese de bilgi kaybı yaratır. Burada verilen mekanizmalar kimyasal ürünleri karıştırma veya fiziksel temizlik deneyi yapma talimatı değildir.",
      ),
      S(
        "Gıdanın pH’sından kan pH’sı çıkmaz",
        "Canlıların farklı bölgelerinde farklı pH koşulları vardır ve fizyolojik düzenleme süreçleri çalışır. Bir gıdanın asidik olması tek başına kanın aynı ölçüde asitleşeceğini göstermez. Kimya dersindeki pH hesabı bir hastalık tanısı veya beslenme tedavisi değildir.",
        "Bir ürünün yarar veya zararını yalnız asit/baz etiketiyle belirlemek de eksiktir. Tür, derişim, temas yolu ve kullanım koşulları birlikte önem taşır. Bu ünitenin amacı kimyasal bilgi ile gözlemi ilişkilendirmek; koşulsuz klinik veya bütün ürünlere geçerli sağlık hükümleri vermek değildir.",
      ),
    ],
    examples: [
      E(
        "Kireç çevrimini formülle oku",
        "A maddesi CaCO₃ uygun ısıtmayla B ve CO₂ veriyor. B suyla Ca(OH)₂ olan C’ye dönüşüyor. A, B ve C’nin günlük adları nedir?",
        "Verilen dönüşümlerde atomları koru.",
        [
          "CaCO₃ → CaO + CO₂ olduğundan B, CaO’dur.",
          "CaO + H₂O → Ca(OH)₂ ile C elde edilir; H ve O sayıları iki tarafta aynıdır.",
          "A kireç taşı, B sönmemiş kireç, C sönmüş kireç olarak adlandırılır.",
        ],
        "Kireç taşı → sönmemiş kireç → sönmüş kireç",
        "Son formülde hidrojen bulunması suyla olan dönüşümle uyumludur.",
        "CaCO₃ ile Ca(OH)₂’ye aynı günlük adı verme.",
      ),
      E(
        "Kullanılabilir asit bütçesi",
        "Yalnız CaCO₃+2H⁺→Ca²⁺+CO₂+H₂O tepkimesi tam sürüyor. 0,10 mol CaCO₃ ve toplam 0,10 mol harcanabilir H⁺ var. Gaz ve kalan katı miktarı nedir?",
        "Asit bütçesini ikiye böl.",
        [
          "Asit 0,10/2 = 0,05 mol karbonatın tepkimesine yeter.",
          "Karbonat stokunun 0,05 molü tüketilir ve 0,05 mol CO₂ oluşur.",
          "Kalan CaCO₃ = 0,10 − 0,05 = 0,05 mol; harcanabilir asit biter.",
        ],
        "0,05 mol CO₂; 0,05 mol CaCO₃ kalır.",
        "Tüketilen 0,05 mol karbonat için 0,10 mol H⁺ gerekir.",
        "Verilmiş H⁺ bütçesini yalnız pH ölçümü sanma.",
      ),
      E(
        "On kat fark, ama hangi nicelikte?",
        "Aynı sıcaklıkta iki yağmur örneği pH 5,6 ve 4,6 olarak ölçülmüştür. Etkinlik yerine derişim yaklaşımı kullanılıyor. İkinci örneğin H₃O⁺ derişimi ilkine göre kaç kattır? Toplam mermer çözme kapasitesi bulunabilir mi?",
        "Logaritmik ölçümü kapasiteden ayır.",
        [
          "pH farkı 5,6 − 4,6 = 1 birimdir.",
          "Derişim oranı 10¹ = 10; düşük pH örneğinde H₃O⁺ derişimi daha yüksektir.",
          "Hacim ve tampon/harcanabilir asit bilgisi verilmediğinden toplam mermer çözme kapasitesi bulunamaz.",
        ],
        "10 kat; toplam çözme kapasitesi belirlenemez.",
        "pH küçüldüğünde H₃O⁺ derişiminin artması yönü doğrular.",
        "Derişim oranını toplam asit molü oranı yerine koyma.",
      ),
      E(
        "Eşit mol, farklı formül",
        "A örneği 8,4 g saf NaHCO₃, B örneği 10,6 g saf Na₂CO₃’tür. M değerleri 84 ve 106 g/mol. Her örnek suda tamamen çözünüp formülüne göre iyonlarına ayrılıyor. Na⁺ molünü karşılaştır.",
        "Önce tuz molü, sonra Na sayısı.",
        [
          "A için 8,4/84 = 0,10 mol; B için 10,6/106 = 0,10 mol tuz vardır.",
          "NaHCO₃ başına bir Na⁺, Na₂CO₃ başına iki Na⁺ bulunur.",
          "A 0,10 mol Na⁺, B 0,20 mol Na⁺ verir; B/A oranı 2’dir.",
        ],
        "0,10 ve 0,20 mol Na⁺",
        "Formüllerdeki elektriksel yük dengesi Na sayısını açıklar.",
        "İki tuzun molü eşit diye sodyum iyonu sayısını da eşitleme.",
      ),
    ],
    recall: [
      {
        prompt: "Kireç taşı, sönmemiş ve sönmüş kirecin formülleri?",
        answer: "Sırasıyla CaCO₃, CaO ve Ca(OH)₂.",
      },
      {
        prompt: "Yemek sodası ile çamaşır sodası aynı mı?",
        answer:
          "Hayır; NaHCO₃ ve Na₂CO₃ farklı tuzlardır. Ticari kabartma tozu ayrıca karışım olabilir.",
      },
      {
        prompt: "Yalnız pH neden toplam karbonat çözme miktarını vermez?",
        answer: "Hacim ve tampon/harcanabilir asit bütçesi de gerekir.",
      },
      {
        prompt: "Asit–karbonat kabarcığı ile asit–metal kabarcığı aynı gaz mı?",
        answer:
          "Uygun karbonat tepkimesinde CO₂; uygun aktif metal–yükseltgen olmayan asitte H₂ olabilir. Koşul ve denklem gerekir.",
      },
    ],
    items: [
      Q(
        "Sirke için “asetik asit içeren sulu karışım” bilgisi verilmiştir. Yalnız bu bilgiden hangisi belirlenemez?",
        "Sirkenin kesin molaritesi",
        [
          "Karışım olduğu",
          "Asetik asit içerdiği",
          "Suyun bileşenlerden biri olduğu",
          "Saf asetik asitle aynı kavram olmadığı",
        ],
        "Tür bilgisi sayısal derişim değildir.",
        "Molarite için asit molü ve son çözelti hacmi gerekir. Verilen ifade bunları söylemez.",
      ),
      Q(
        "CaO + H₂O → Ca(OH)₂ tepkimesinde ürünün yaygın adı hangisidir?",
        "Sönmüş kireç",
        ["Kireç taşı", "Sönmemiş kireç", "Yemek sodası", "Çamaşır sodası"],
        "Ürünün formülünde hidroksit grupları var.",
        "CaO sönmemiş, Ca(OH)₂ sönmüş kireçtir. Kireç taşı ise CaCO₃ olarak temsil edilir.",
      ),
      Q(
        "Yemek sodası ve çamaşır sodasının formülleri sırasıyla hangisidir?",
        "NaHCO₃ ve Na₂CO₃",
        ["Na₂CO₃ ve NaHCO₃", "NaOH ve KOH", "CaO ve Ca(OH)₂", "NaCl ve NH₄Cl"],
        "Hidrojen karbonat ile karbonatı ayır.",
        "Yemek sodası sodyum hidrojen karbonat, çamaşır sodası sodyum karbonattır; iki Na sayısının farkı iyon yüküyle ilişkilidir.",
      ),
      Q(
        "Yalnız CaCO₃+2H⁺→Ca²⁺+CO₂+H₂O tepkimesi sonuna kadar sürüyor. 0,10 mol CaCO₃ ve 0,10 mol harcanabilir H⁺ var. CO₂ miktarı kaç moldür?",
        "0,05 mol",
        ["0,025 mol", "0,10 mol", "0,15 mol", "0,20 mol"],
        "İki H⁺ bir karbonatı tüketir.",
        "Asit sınırlıdır; 0,10/2 = 0,05 mol karbonat tepkimeye girer ve aynı mol CO₂ oluşturur.",
      ),
      Q(
        "Yalnız CaCO₃+2H⁺→Ca²⁺+CO₂+H₂O tepkimesi tam gerçekleşiyor. 0,10 mol CaCO₃ ve 0,40 mol harcanabilir H⁺ başlangıcında artan H⁺ miktarı nedir?",
        "0,20 mol",
        ["0 mol", "0,10 mol", "0,30 mol", "0,40 mol"],
        "Bütün karbonat 0,20 mol H⁺ tüketir.",
        "0,10 × 2 = 0,20 mol H⁺ harcanır; 0,40 − 0,20 = 0,20 mol kalır. Katı biter.",
      ),
      Q(
        "Aynı sıcaklıkta pH 5,6 ve pH 4,6 ölçülen iki örnekte derişim yaklaşımı kullanılıyor. pH 4,6 olanın H₃O⁺ derişimi diğerine göre kaç kattır?",
        "10",
        ["0,1", "1", "2", "100"],
        "Bir pH birimi on katı temsil eder.",
        "10^(5,6−4,6) = 10. Bu oran tek başına toplam asit molünü veya tampon kapasitesini söylemez.",
      ),
      Q(
        "İki çözeltinin 25 °C’de pH değeri 4’tür. Hacimleri ve tampon içerikleri bilinmiyor. Hangisi kesin olarak söylenemez?",
        "Aynı toplam miktarda karbonatı çözebilecekleri",
        [
          "İkisinin de ölçülen koşulda asidik olduğu",
          "pH sayılarının eşit olduğu",
          "İkisinde de pH’ın nötr referansın altında olduğu",
          "Hacim bilgisinin toplam miktar hesabında önemli olduğu",
        ],
        "Derişim bilgisi ile toplam bütçeyi ayır.",
        "Aynı pH toplam asit molünü ve tamponlanmayı eşitlemez. Karbonat çözme kapasitesi için ek veri gerekir.",
      ),
      Q(
        "SO₃+H₂O→H₂SO₄ ve N₂O₅+H₂O→2HNO₃ adımları yağmur kimyasını açıklayan basit şemalar olarak verilmiştir. Bu şemalar hangi süreçle doğrudan ilgilidir?",
        "Atmosferde ek asit yükü oluşması",
        [
          "Her polimerin geri dönüşmesi",
          "Hidrojen gazının metallerden çıkması",
          "Yağların tam hidrojenlenmesi",
          "Sodyum klorürün erimesi",
        ],
        "Ürünlerdeki asitleri fark et.",
        "Sülfürik ve nitrik asit oluşumu asit çökelmesiyle ilişkilidir. Sera etkisi ve ozon kaybı aynı mekanizmanın diğer adları değildir.",
      ),
      Q(
        "Bir gıdanın pH’sı asidik ölçülüyor. Yalnız bu ölçümden hangisi çıkarılamaz?",
        "Tüketildiğinde kan pH’sını aynı değere indireceği",
        [
          "Ölçülen örneğin verilen koşulda asidik olduğu",
          "Bir pH ölçümü yapıldığı",
          "Asitliğin bir ürün özelliği olarak incelenebildiği",
          "Bütün bileşimin tek pH sayısından bilinmediği",
        ],
        "Fizyolojik düzenleme ile gıda ölçümü farklıdır.",
        "Gıda pH’sı tek başına kan pH’sı veya hastalık tanısı vermez; bu iki sistemin doğrudan eşitlenmesi geçersizdir.",
      ),
      Q(
        "8,4 g NaHCO₃ ve 10,6 g Na₂CO₃ ayrı ayrı tamamen çözünüp formüllerine göre iyonlarına ayrılıyor. M değerleri 84 ve 106 g/mol. Na₂CO₃ örneğindeki Na⁺ molünün NaHCO₃ örneğindekine oranı nedir?",
        "2",
        ["0,5", "1", "3", "4"],
        "Tuz molleri eşit, Na sayıları farklıdır.",
        "Her tuz 0,10 moldür. Na⁺ miktarları 0,20 ve 0,10 mol olduğundan oran 2’dir.",
      ),
    ],
    source:
      "Aurelia TYT Kimya 052 PDF 1–7; MEBİ TYT Kimya PDF 82 ve 84–86; OGM Dersler Cepte Asitler ve Bazlar PDF 21–25; 10. Sınıf Ders Kitabı Sürdürülebilirlik atmosfer tepkimeleri sayfaları karşılaştırıldı. Yaklaşık yağmur referansı ve pH/kapasite sınırı açıklanmıştır. Anlatım ve alıştırmalar özgündür.",
  },
  {
    id: "sabun-deterjan-temizlik",
    topic: "detail-191",
    title: "Sabun, Deterjan ve Temizlik Maddeleri",
    minutes: 43,
    objectives: [
      "Yüzey etkin taneciğin baş ve kuyruğunu su ve yağla ilişkilendir.",
      "Sert suda çöken ve çözeltide kalan sabunu hesapla.",
      "Temizlik, dezenfeksiyon ve ürün formülünü farklı ölçütlerle değerlendir.",
    ],
    sections: [
      S(
        "Her kir aynı yolla uzaklaşmaz",
        "Kir yağ benzeri apolar bileşenler, toz, kum veya suda çözünen maddeler içerebilir. Su bazı kirleri çözebilir, bazılarını akışla taşıyabilir; bütün inorganik maddeler suda çözünür diye bir kural yoktur. Kum bunun günlük karşı örneğidir.",
        "Yağlı kir ve su çoğu durumda sınırlı karıştığından yalnız su yeterli olmayabilir. Yüzey etkin madde, mekanik hareket ve durulama farklı görevler üstlenir. Temizliğin sonucunu açıklamak için önce hangi kirin ve hangi yüzeyin verildiğini belirle.",
      ),
      S(
        "Aynı taneciğin iki farklı bölgesi",
        "Birçok sabun uzun zincirli yağ asidinin Na veya K tuzudur. Sulu ortamda R–COO⁻ anyonunun uzun hidrokarbon kuyruğu çoğunlukla apolar, karboksilat başı suyla etkileşebilen iyonik bölgedir. Na⁺ veya K⁺ karşı iyonu ayrıca bulunur.",
        "Hidrofil “su ile etkileşen”, hidrofob ise bu bağlamda suyla etkileşimi daha elverişsiz olan bölgeyi anlatır. Şemada başı suya, kuyruğu yağlı kire yönelt. Karşı iyonu hidrokarbon kuyruğuna kovalent bağlı bir parça gibi çizme; çözelti ve katı tuz gösterimleri farklıdır.",
      ),
      S(
        "Yüzeyde yayılma ve ıslatma",
        "Yüzey etkin maddeler suyun yüzey gerilimini ve arayüz davranışını değiştirebilir. Bunun sonucunda sıvının yüzeye yayılması, yağlı kirle temas kurması ve kirin yerinden ayrılması kolaylaşabilir. Etki yalnız köpük oluşmasına indirgenemez.",
        "Aynı köpük yüksekliği farklı kir, sıcaklık veya su sertliğinde aynı temizlik sonucu vermeyebilir. “Daha çok köpük her zaman daha temiz” yargısı için yeterli kanıt yoktur. Ürünün formülü ve kullanım koşulları ölçülen sonuçla birlikte yorumlanmalıdır.",
      ),
      S(
        "Kirin çevrelenmesinden durulamaya",
        "Yağ damlası çevresinde toplanan yüzey etkin taneciklerin kuyrukları yağlı iç bölgeyle, başları çevredeki suyla etkileşir. Şemada dışta kalan başlar suya dönük olmalıdır. Yağ damlasının suda dağılması, yağın her molekülünün gerçek çözelti oluşturmasıyla aynı değildir.",
        "Mekanik hareket kiri yüzeyden ayırmaya, çevreleyen tanecikler yeniden birikmeyi azaltmaya yardımcı olabilir. Durulama dağılmış kiri yüzeyden uzaklaştırır. Etkileşimli çizimde “çevrele” ve “durula” adımları farklı amaç taşır; bir tuş gerçek hijyen yüzdesi ölçmez.",
      ),
      S(
        "Misel tek bir sabun iyonu değildir",
        "Uygun derişim ve ortamda yüzey etkin tanecikler misel gibi kümeler oluşturabilir. Bir sabun anyonu ile çok sayıda taneciğin oluşturduğu küme aynı varlık değildir. Sıcaklık, derişim ve yapı bu davranışın koşullarıdır.",
        "Yağlı bir damlanın çevrelenmesini gösteren öğretim şeması ile yağ içermeyen misel modeli de bire bir aynı olay sayılmaz. Bu laboratuvarda çizilen baş-kuyruklar mekanizmayı gösterir; serbest sabun molünden gerçek misel adedi veya temizlenen kir yüzdesi hesaplanmaz.",
      ),
      S(
        "Sabunlaşmada üç ester bağı",
        "Basit bir triaçilgliserolün güçlü bazla hidrolizi gliserol ve yağ asidi tuzları oluşturabilir. Aynı R gruplarıyla temsil edilen örnekte bir yağ molekülü + 3NaOH → gliserol + 3RCOONa yazılır. Üç ester bağının üç baz eşdeğeriyle ilişkisini izle.",
        "Yağ asidi kalıntıları farklıysa oluşan tuzlar da farklı olabilir. Gliserol sabun anyonu değildir; ikinci bir ürün olarak ayrılır. Her deterjan sabunlaşmayla elde edilmez ve bir hazır temizleyici yalnız tek sabun tuzundan oluşmak zorunda değildir.",
      ),
      S(
        "Katı sabun ile sıvı ürün etiketi",
        "Yağ asitlerinin sodyum tuzları genellikle daha sert, potasyum tuzları daha yumuşak sabunların elde edilmesinde kullanılır. Bu yaygın karşılaştırma ürünün yapısı, su içeriği ve diğer bileşenler düşünülerek anlaşılmalıdır.",
        "Ticari “sıvı sabun” etiketi her ürünün yalnız K tuzu olduğunu kanıtlamaz; farklı yüzey etkin maddeler içeren formüller bulunabilir. Benzer biçimde sıvı olmak tek başına cilt pH’sına yakın olmayı veya her kullanıcıda aynı etkiyi göstermez. İçerik ve kullanım amacı ayrı veridir.",
      ),
      S(
        "Sert su sabunun bir kısmını bağlar",
        "Ca²⁺ ve Mg²⁺ su sertliğine katkı sağlayan tipik iyonlardır. Uygun koşullarda 2RCOO⁻ + Ca²⁺ → Ca(RCOO)₂(k) tepkimesi az çözünen kalsiyum sabununu oluşturur. Bir iki değerlikli iyon başına iki sabun anyonu kullanılır.",
        "Çöken sabun çözeltide kullanılabilir yüzey etkin iyon miktarını azaltır. Miktar hesabında hem çökeleği hem artan sabunu ayrı bul. Ca ve Mg birlikte verilmişse yalnız toplam miktardan hangisinin önce çökeceği kesin çıkmaz; bu laboratuvar yalnız Ca²⁺ ve tam çökelme kabulünü kullanır.",
      ),
      S(
        "Asidik ortam ayrı bir sınırdır",
        "RCOO⁻ + H⁺ ⇌ RCOOH dönüşümü sabun anyonunu serbest yağ asidine çevirebilir. Oluşan türün suda daha az çözünmesi temizleme davranışını etkileyebilir. Bu, sert suyun metal iyonuyla oluşturduğu çökelek mekanizmasından ayrıdır.",
        "Böyle bir durumda kabarcık miktarına bakıp yalnız sertlik sonucu çıkarma. Asitlik, su iyonları, sıcaklık ve formül birlikte değerlendirilir. Tepkimenin miktarı veya denge sonucu sorulacaksa gerekli öncüller verilmelidir; pH etiketinden bütün türlerin kesin miktarı bilinmez.",
      ),
      S(
        "Deterjan bir formüldür",
        "Bazı deterjanlarda uzun apolar kuyruk ve sülfat/sülfonat gibi suyla etkileşen baş grupları bulunur. Başka yüzey etkin madde sınıfları ve yardımcı bileşenler de kullanılabilir. Bütün deterjanları tek bir kimyasal türe indirgemek doğru değildir.",
        "Bazı formüller sert suda sabundan daha iyi çalışabilir; bu onların her yüzeyde veya her koşulda yüzde yüz temizlediğini söylemez. Yardımcı bileşenler su sertliği, kir dağılımı veya ürün kararlılığı gibi farklı amaçlar taşıyabilir. Karşılaştırma aynı koşullarda ve belirtilen ürünlerle yapılır.",
      ),
      S(
        "Temiz görünmek steril olmak değildir",
        "Temizlik kiri uzaklaştırmayı, dezenfeksiyon uygun ürün ve koşullarda mikroorganizma yükünü azaltmayı veya hedef mikroorganizmaları etkisizleştirmeyi amaçlar. Sterilizasyon ise daha kapsamlı bir mikrobiyolojik hedeftir. Bu üç sözcük aynı ölçüm sonucunu anlatmaz.",
        "NaClO içeren çamaşır suyu ile Ca(OCl)₂ örneği hipoklorit kimyasıyla ilişkilidir; sönmüş kireç Ca(OH)₂ bunlarla aynı madde değildir. Hipoklorit gıda hazırlama malzemesi gibi sunulmaz. Etiket, kullanım amacı ve koşul olmadan bir ürün için sağlık veya sterilite garantisi verilmez.",
      ),
      S(
        "Şampuan ve diş macununda işlev",
        "Şampuan, saç ve derideki yağlı kir ile başka kalıntıları uzaklaştırmaya yardımcı yüzey etkin maddeler içerebilir. Sonuç ürünün formülü ve kullanım koşuluna bağlıdır. Bu temizleme işlevinden saçın her koşulda daha hızlı uzayacağı veya bir hastalığın giderileceği sonucu çıkarılmaz.",
        "Diş macununda mekanik temizliğe yardımcı bileşenler ve uygun formülde mine korunmasına katkı sağlayan florür bulunabilir. İşlev yalnız ağızdaki bütün asidi nötrlemek değildir. Bileşen türü, miktarı ve uygun kullanım bilgisi birlikte okunur; yalnız ürün adına bakarak koşulsuz yarar veya zarar hükmü verilmez.",
      ),
      S(
        "Formül, çevre ve ölçülen sonuç",
        "Biyolojik olarak parçalanabilmek, bir maddenin her miktarda suya veya toprağa bırakılmasının etkisiz olacağı anlamına gelmez. Formülün türü, kullanılan miktar ve arıtma koşulları önemlidir. Bütün sabunları zararsız, bütün deterjanları aynı derecede zararlı sayma.",
        "Kişisel ürünlerde de tahriş, alerji veya kuruluk gibi sonuçlar yalnız “katı/sıvı” biçiminden kesin çıkarılmaz. Kimya karşılaştırmasında gözlenen kir azalması, su iyonu ve içerik verisiyle sınırlı kal. Ambalajın etkisi ayrı değerlendirilebilir; tek bir sıfat bütün yaşam döngüsünü açıklamaz.",
      ),
    ],
    examples: [
      E(
        "Yanlış yönü onar",
        "Suda dağılmış yağlı bir damlanın çevresinde sabun tanecikleri gösteriliyor. Çizimde başlar yağın içine, kuyruklar suya bakıyor. Uygun temsili nasıl düzeltirsin?",
        "Her bölgenin etkileştiği ortamı belirle.",
        [
          "İyonik baş hidrofil, uzun hidrokarbon kuyruk hidrofob bölgedir.",
          "Kuyrukları yağlı iç bölgeye, başları suya dönük dış yüzeye yerleştir.",
          "Durulamanın dağılmış kiri taşıdığını ekle; bu damlacık modelini gerçek moleküler çözelti diye adlandırma.",
        ],
        "Başlar suya, kuyruklar yağlı kire dönük.",
        "Çizimin her yanındaki başlar dış çevredeki suyla temas etmelidir.",
        "Bir tek sabun iyonunu bütün misel gibi çizme.",
      ),
      E(
        "Sertlik az olduğunda sabun artar",
        "2RCOO⁻+Ca²⁺→Ca(RCOO)₂(k) tepkimesi nicel tamamlanıyor. Başlangıçta 10 mmol sabun anyonu ve 3 mmol Ca²⁺ var. Çökelek ve artan anyon?",
        "İki sabun anyonu bir Ca²⁺ gerektirir.",
        [
          "Ca²⁺ 3 mmol ise gereken sabun 2 × 3 = 6 mmoldür; 10 mmol yeterlidir.",
          "3 mmol Ca(RCOO)₂ çökeleği oluşur ve 3 mmol Ca²⁺ tüketilir.",
          "Artan sabun anyonu 10 − 6 = 4 mmol; artan Ca²⁺ sıfırdır.",
        ],
        "3 mmol çökelek; 4 mmol sabun anyonu kalır.",
        "Çökelekte 2 × 3 = 6 mmol sabun anyonu vardır; serbest 4 ile toplam 10.",
        "3 mmol çökeleği 3 mmol sabun anyonu tüketimi sanma.",
      ),
      E(
        "Sabun az olduğunda sertlik kalır",
        "Yalnız 2RCOO⁻+Ca²⁺→Ca(RCOO)₂(k) nicel tamamlanıyor. 10 mmol sabun anyonu ve 8 mmol Ca²⁺ var. Son durum nedir?",
        "Sabun molünü katsayısına böl.",
        [
          "Sabunun ilerleme sınırı 10/2 = 5 mmol; Ca²⁺ sınırı 8 mmoldür.",
          "Sabun sınırlı olduğundan 5 mmol çökelek oluşur; 10 mmol anyon tüketilir.",
          "Ca²⁺ miktarı 8 − 5 = 3 mmol kalır; çözeltide serbest sabun anyonu bu modelde sıfırdır.",
        ],
        "5 mmol çökelek; 3 mmol Ca²⁺ kalır.",
        "2 × 5 = 10 mmol sabun birikintiye geçer.",
        "Sabun bittiğinde yeni misel oluştuğunu veya tüm suyun yumuşadığını söyleme.",
      ),
      E(
        "Hangi sonuç gerçekten ölçüldü?",
        "A ve B ürünleriyle aynı yağlı yüzeyde kir kütlesinin azaldığı ölçülüyor. Yalnız B için uygun koşulda hedef mikroorganizma sayısının azaldığı da ölçülmüş. A için aynı mikrobiyolojik ölçüm yok. Hangi karşılaştırma geçerlidir?",
        "Her ölçümü kendi sonucuyla eşleştir.",
        [
          "İki üründe ölçülen yağlı kir azalması temizlik sonucuna kanıttır.",
          "B’nin mikroorganizma sayısı verisi yalnız belirtilen koşullardaki mikrobiyolojik sonuca ek kanıt sağlar.",
          "A’nın aynı dezenfeksiyon sonucunu veya iki ürünün sterilizasyon sağladığını bu veriden çıkaramayız.",
        ],
        "Temizlik iki üründe ölçülmüş; aynı dezenfeksiyon sonucu A için kanıtlanmamış.",
        "Görünür kir ölçümü ile mikroorganizma ölçümü farklı veridir.",
        "Ölçülmeyen etkiyi sıfır veya kesin başarılı diye ilan etme.",
      ),
    ],
    recall: [
      {
        prompt: "Suda yağlı kir çevresinde baş ve kuyruk nereye bakar?",
        answer: "Hidrofil baş suya, hidrofob kuyruk yağlı iç bölgeye.",
      },
      {
        prompt: "1 mmol Ca²⁺ kaç mmol sabun anyonuyla çöker?",
        answer: "Verilen Ca(RCOO)₂ modeli ve tam çökelme kabulünde 2 mmol.",
      },
      {
        prompt: "Az köpük tek başına neyi kanıtlamaz?",
        answer:
          "Kesin kir miktarını, su sertliğini veya temizliğin başarısızlığını tek başına kanıtlamaz.",
      },
      {
        prompt: "Biyobozunur demek her miktarda kirletmez mi?",
        answer:
          "Hayır; miktar, ortam, parçalanma ve arıtma koşulları da önemlidir.",
      },
    ],
    items: [
      Q(
        "Suda bulunan yağlı kir damlası, uygun yüzey etkin maddeyle çevreleniyor. Tipik yönelim hangisidir?",
        "Hidrofil başlar suya, hidrofob kuyruklar yağlı iç bölgeye dönüktür.",
        [
          "Başlar yağın içine, kuyruklar suya dönüktür.",
          "Baş ve kuyruk her koşulda aynı ortamı seçer.",
          "Bütün tanecikler yağla etkileşmeden suyun dışına çıkar.",
          "Karşı iyonlar kuyruğun kovalent devamıdır.",
        ],
        "Su ve yağla iyi etkileşen bölümleri ayır.",
        "Hidrofil baş suyla, uzun apolar kuyruk yağlı kirle etkileşir; başlar dışta kalır.",
      ),
      Q(
        "Verilen RCOO⁻Na⁺ sabun tuzu suda iyonlarına ayrılmıştır. Hangisi doğrudur?",
        "Na⁺ karşı iyonu ile RCOO⁻ anyonu ayrı sulu türlerdir.",
        [
          "Na⁺ hidrokarbon kuyruğuna kovalent bağlıdır.",
          "RCOO⁻ iyonu nötr H₂ molekülüdür.",
          "Uzun hidrokarbon kuyruk bütünüyle iyonik baştır.",
          "İyonlarına ayrılan bütün tuzlar elektriksel toplam yük kazanır.",
        ],
        "İyon yükünü ve toplam dengeyi birlikte düşün.",
        "Çözeltide karşı iyon ve sabun anyonu ayrı gösterilir. Eşit miktarlar toplam elektriksel nötrlüğü korur.",
      ),
      Q(
        "Aynı R gruplu bir triaçilgliserol + 3NaOH → gliserol + 3RCOONa tepkimesi verilmiştir. 0,20 mol yağ tam tüketiliyorsa kaç mol sabun tuzu oluşur?",
        "0,60 mol",
        ["0,10 mol", "0,20 mol", "0,30 mol", "1,20 mol"],
        "Bir yağ molekülünden üç yağ asidi tuzu.",
        "0,20 × 3 = 0,60 mol tuz oluşur; gliserol ayrı üründür.",
      ),
      Q(
        "2RCOO⁻+Ca²⁺→Ca(RCOO)₂(k) tepkimesi nicel tamamlanıyor. 10 mmol sabun anyonu ve 3 mmol Ca²⁺ ile serbest kalan sabun anyonu nedir?",
        "4 mmol",
        ["0 mmol", "3 mmol", "6 mmol", "7 mmol"],
        "Ca²⁺ başına iki anyon tüketilir.",
        "3 mmol Ca²⁺, 6 mmol anyonu çökeleğe geçirir; 10 − 6 = 4 mmol kalır.",
      ),
      Q(
        "2RCOO⁻+Ca²⁺→Ca(RCOO)₂(k) nicel tamamlanıyor. 10 mmol sabun anyonu ve 8 mmol Ca²⁺ var. Artan Ca²⁺ miktarı kaç mmoldür?",
        "3 mmol",
        ["0 mmol", "2 mmol", "5 mmol", "8 mmol"],
        "Sabun en çok 5 mmol Ca²⁺ bağlar.",
        "10/2 = 5 mmol Ca²⁺ tüketilir; başlangıç 8 olduğundan 3 mmol kalır.",
      ),
      Q(
        "Bir temizlik deneyinde yalnız görünür yağlı kirin azaldığı ölçülmüştür. Bu veri tek başına hangisini kanıtlamaz?",
        "Bütün mikroorganizma ve sporların yok olduğunu",
        [
          "Ölçülen kir miktarının azaldığını",
          "Yüzeyde bir temizlik sonucunun ölçüldüğünü",
          "Mikrobiyolojik hedef için ayrı veri gerektiğini",
          "Kir ölçümünün verilen başlangıçla karşılaştırılabildiğini",
        ],
        "Temizlik ile sterilizasyonu ayır.",
        "Yağlı kir azalması mikrobiyolojik sterilite ölçümü değildir. Mikroorganizma sonucu ayrıca uygun yöntemle incelenmelidir.",
      ),
      Q(
        "İki ürün aynı koşulda farklı köpük yüksekliği veriyor. Kirin uzaklaşma miktarı ölçülmemiştir. Hangi sonuç geçerlidir?",
        "Yalnız köpükten hangi ürünün daha iyi temizlediği kesinleşmez.",
        [
          "Daha çok köpüren her koşulda daha iyi temizler.",
          "Az köpüren üründe hiç yüzey etkin madde yoktur.",
          "Köpük yüksekliği doğrudan Ca²⁺ molüdür.",
          "İki ürün kesin aynı bileşime sahiptir.",
        ],
        "Ölçülmeyen sonucu köpükle eşitleme.",
        "Formül, kir, sıcaklık ve su sertliği etkili olabilir; köpük tek başına temizlik miktarı değildir.",
      ),
      Q(
        "Aşağıdaki eşleştirmelerden hangisi kimyasal türleri doğru ayırır?",
        "Ca(OH)₂ sönmüş kireçtir; Ca(OCl)₂ hipoklorit örneğidir.",
        [
          "Ca(OH)₂ ve Ca(OCl)₂ aynı formüldür.",
          "NaClO yalnız hidrokarbon kuyruğundan oluşur.",
          "Ca(OCl)₂ bir triaçilgliseroldür.",
          "NaOH ile NaClO aynı bileşiğin iki yazımıdır.",
        ],
        "Parantez içindeki iyonu oku.",
        "Hidroksit OH⁻ ile hipoklorit OCl⁻ farklıdır. Bu farkı günlük ad benzerliğiyle silmek yanlış olur.",
      ),
      Q(
        "Bir sabun için “uygun ortamda biyolojik olarak parçalanabilir” bilgisi verilmiştir. Bundan hangisi çıkarılamaz?",
        "Her miktarda çevreye bırakıldığında hiçbir etki oluşturmayacağı",
        [
          "Parçalanmanın ortam koşullarıyla ilişkili olduğu",
          "Biyolojik süreçlerin yapıyı değiştirebildiği",
          "Miktar bilgisinin çevresel yorumda önemli olabileceği",
          "Tek bir sıfatın bütün yaşam döngüsünü açıklamadığı",
        ],
        "Parçalanabilirlik ile etkisizliği eşitleme.",
        "Biyobozunma miktarı ve arıtma koşullarını ortadan kaldırmaz; sınırsız ve etkisiz atım sonucu çıkmaz.",
      ),
      Q(
        "Bir ticari ürünün üzerinde yalnız “sıvı sabun” yazıyor. İçerik ve pH verisi yok. Hangisi kesin belirlenemez?",
        "Bütün yüzey etkin bileşenlerinin yalnız potasyum yağ asidi tuzu olduğu",
        [
          "Ürünün sıvı olarak sunulduğu",
          "Etiketin bir ürün adı verdiği",
          "Kimyasal içerik için ek bilgi gerektiği",
          "Ürün adı ile tam formülün farklı veri olduğu",
        ],
        "Ticari biçim tam bileşim değildir.",
        "Sıvı ürün farklı yüzey etkin maddeler ve yardımcı bileşenler içerebilir. Yalnız sunum adından tam formül veya pH çıkmaz.",
      ),
    ],
    source:
      "Aurelia TYT Kimya 053 PDF 1–7; MEBİ TYT Kimya PDF 87–88; OGM Dersler Cepte Yaygın Günlük Hayat Kimyasalları PDF 10–12 ve 26; OGM Temizlik Maddelerinin Özellikleri sunusu karşılaştırıldı. Baş-kuyruk yönü, sert su ve hijyen sınırları açıklanmıştır. Şema ve alıştırmalar özgündür.",
  },
);

unitData.push(
  {
    id: "polimer-kozmetik-ilac",
    topic: "detail-192",
    title: "Polimerler, Kozmetik Ürünler ve İlaçlar",
    minutes: 45,
    objectives: [
      "Monomer, tekrar birimi ve bütün zincirin farklı olduğunu açıkla.",
      "Polimer yapısı ile ürün işlevini koşullu eşleştir.",
      "Kozmetik fazlarını ve ilaç bileşenlerinin görevlerini ayır.",
    ],
    sections: [
      S(
        "Küçük öncül, tekrar birimi, büyük zincir",
        "Monomer, polimerleşmeye katılan küçük yapı öncülüdür; tekrar birimi ise oluşan zincirde yinelenen yapısal bölümdür. Bütün makromolekül çok sayıda tekrar taşıyabilir. Bu üç düzeyin adını aynı nesneye gelişigüzel verme.",
        "Şemadaki n, verilen gösterime göre tekrar sayısını belirtir; doğrudan mol demek değildir. Bir çizimde altı tekrar gösterilmesi gerçek ticari polimerin bütün zincirlerinin yalnız altı birim uzunluğunda olduğunu söylemez. Uç gruplar ve zincir uzunluğu dağılımı ayrıca tanımlanabilir.",
      ),
      S(
        "Etilendeki çift bağ zincirde ne olur?",
        "CH₂=CH₂ etilen monomerinden polietilen elde edilirken bağ düzeni değişir. Yaygın tekrar gösterimi –CH₂–CH₂– şeklindedir. Polimer, aralarında hiç bağ oluşmamış serbest eten moleküllerinin fiziksel karışımı değildir.",
        "Tekrar biriminin atom türleri korunurken karbonlar arası bağ düzeni değişir. Bu katılma örneğinde her tekrar eklenmesinde su çıkması gerekmez. Polimerleşme sözcüğünü tek bir ürün veya tek bir yan ürün kuralıyla eşitlemek, başka polimer türlerinde hataya neden olur.",
      ),
      S(
        "Bir veya birden fazla monomer",
        "Aynı tür monomerlerden oluşan yapılar ile farklı monomerlerin katıldığı yapılar bulunabilir. A–A–A ve A–B–A–B şemaları bu farkı sade biçimde göstermeye yarar. Harfler gerçek atom değil, tanımlanan yapısal birimlerin simgesidir.",
        "Her farklı-monomerli zincir zorunlu olarak düzenli A–B sırasını izlemez; blok veya başka dizilişler de olabilir. Bu nedenle bir örnek şemayı bütün polimerlerin tek düzeni diye öğrenme. Sayım sorusunda hangi birimin ve hangi zincir parçasının verildiğini önce tanımla.",
      ),
      S(
        "Doğal köken yapı bilgisini değiştirmez",
        "Selüloz, nişasta, proteinler ve DNA/RNA doğal polimer örnekleridir. Doğal kauçuk ile sentetik kauçuk farklı kökenlere sahip polimer örnekleridir. Bir ürünün doğal kökenli olması onun tekrar birimli moleküler yapısını ortadan kaldırmaz.",
        "Bütün organik maddeler veya bütün büyük biyolojik moleküller polimer değildir. Triaçilgliseroller üç yağ asidi kalıntısı taşıyan esterlerdir; çok sayıda aynı tür tekrar içeren klasik polimer zinciri gibi sınıflandırılmaz. Doğal olmak da tek başına her kullanımda zararsızlık belgesi değildir.",
      ),
      S(
        "PE, PP, PVC ve PS aynı malzeme değil",
        "PE polietilen, PP polipropilen, PVC polivinil klorür, PS polistirendir. Tekrar birimlerindeki farklı gruplar yapı ve özellikleri etkiler. Film, boru, köpük veya oyuncak gibi ürünlerde polimer seçimi istenen işlevle ilişkilidir.",
        "Günlük dilde “naylon poşet” denilen bir ürün PE olabilir; fakat kimyasal sınıf olarak naylon bir poliamittir, PE’nin başka adı değildir. Bir nesnenin görünüşünden bütün ticari bileşimi kesin saptanmaz. Ürün formülü, katkı ve işlem koşulu ayrıca önem taşır.",
      ),
      S(
        "PET, PTFE ve dayanıklı lif",
        "PET, polietilen tereftalat olarak içecek ambalajı ve polyester lif örnekleriyle ilişkilidir. PTFE, politetrafloroeten olarak uygun kaplama uygulamalarında düşük yapışma özelliğiyle kullanılır. Benzer harfler bu iki polimeri aynı yapmaz.",
        "Kevlar dayanıklı lif uygulamalarına örnek verilebilir; bütün lifler Kevlar değildir. Bir malzemenin bir kullanım örneği bulunması, her sıcaklıkta veya her yük altında aynı sonucu vereceğini göstermez. Ürünün işlevi, polimerin yapısı ve kullanım koşulunu üç ayrı sütunda eşleştir.",
      ),
      S(
        "Zincir düzeni ve malzeme davranışı",
        "Zincirin dallanması, zincirler arası etkileşim ve çapraz bağlar malzemenin davranışını etkileyebilir. Termoplastik, termoset ve elastomer karşılaştırmaları farklı davranış gruplarını anlamaya yardım eder; bütün polimerler ısıtılınca aynı şekilde akmaz.",
        "Moleküler yapı ile gözlenen ürün arasında katkı, işleme ve sıcaklık gibi basamaklar vardır. Yalnız tekrar sayısından kesin erime sıcaklığı, dayanım veya elektrik iletkenliği hesaplanmaz. Birçok yaygın polimer iyi yalıtkan olabilir; bunu istisnasız bütün polimerlerin tanımı yapma.",
      ),
      S(
        "Malzeme kodu bir yaşam döngüsü değildir",
        "Geri dönüşüm, kullanılmış malzemelerin uygun süreçlerle yeniden malzeme veya ürüne dönüştürülmesini içerir. Toplama, ayırma, kirlenme ve teknik işleme koşulları bu süreçte rol oynar. Ambalajdaki kod, malzeme türünü tanımaya yardımcı olabilir.",
        "Kodun bulunması ürünün fiilen toplandığını veya geri dönüştürüldüğünü kanıtlamaz. Benzer biçimde bütün polimerleri gıda temasına uygunsuz saymak da yanlıştır; uygunluk ürün standardı ve temas koşuluna bağlıdır. Bu derste bir polimer adı seçilince otomatik gıda uygunluğu onayı üretilmez.",
      ),
      S(
        "Kozmetikte amaç ve bileşen rolü",
        "Kozmetik ürünler temizlik, bakım, koku veya görünüm amaçları taşıyabilir. Nemlendirici, koruyucu, emülgatör, renk verici veya UV filtresi gibi bileşen sınıfları farklı işlevleri anlatır. Aynı ürün tek bir saf maddeden oluşmak zorunda değildir.",
        "Bir işlev adını doğrudan klinik sonuçla eşitleme. Kimyasal tür, miktar, maruziyet ve ürünün kullanım koşulları önemlidir. Doğal/sentetik ayrımı veya tek bir madde adı, bütün ürünler hakkında koşulsuz sağlık hükmü vermez; burada verilen bilgiler ürün tanıma ve kimyasal görev ayrımı içindir.",
      ),
      S(
        "Krem tekdüze görünebilir",
        "Yağ damlacıkları sürekli su fazında dağılmışsa yağ/su emülsiyonu vardır. Su damlacıkları yağ fazında dağılmışsa su/yağ emülsiyonu olur. Dağılan faz ile sürekli fazın yerini değiştirmen yapının adını da değiştirir.",
        "Emülgatör dağılımın kararlılığına yardımcı olabilir; iki sıvıyı zorunlu gerçek çözelti hâline getirmez. Tekdüze veya krem gibi görünmek moleküler düzeyde homojen çözeltiyi kanıtlamaz. Şemada damlalar ve çevredeki ortam ayrı gösterilmeli; yalnız renge bağlı bir ayrım yapılmamalıdır.",
      ),
      S(
        "Etkin ve yardımcı madde",
        "Etkin madde ilacın amaçlanan etkisiyle ilişkilidir. Bağlayıcı, kaplama veya taşıyıcı gibi yardımcı bileşenler biçim, kararlılık ve sunumu destekleyebilir. Bir tabletteki bütün gramları etkin madde gramı saymak bu rolleri karıştırır.",
        "Yardımcı madde demek hiçbir koşulda etkileşimi veya alerji olasılığı bulunmaz demek değildir. Ayrıca aynı etkin maddeyi içeren ürünlerin salım biçimleri farklı olabilir. Etiket ve kullanım talimatı, kimyasal adla beraber değerlendirilir; bu bölüm kişiye ilaç veya doz seçmez.",
      ),
      S(
        "Farmasötik biçim neden değişir?",
        "Tablet, kapsül, çözelti, süspansiyon, krem, merhem, jel ve enjektabl sunumlar farklı özellikler taşıyabilir. Etkin maddeyi dış etkilerden korumak, tadı maskelemek veya uygun yerde salımı sağlamak biçim seçiminin nedenleri arasında olabilir.",
        "Her şurup gerçek çözelti, her enjeksiyon aynı hızda etkili veya her krem merhemle aynı yapı diye sınıflandırılmaz. Evrensel etki başlangıç sırası için yalnız biçim adı yetmez; etkin madde ve koşul verisi gerekir. Saklama, bölme veya uygulama biçimi için ürün talimatının yerini bu model almaz.",
      ),
    ],
    examples: [
      E(
        "Tekrar bölümünün atom sayısı",
        "PE’nin tekrar birimi –CH₂–CH₂– olarak verilmiştir. Yalnız altı tekrar biriminin toplam atom sayısını ve kütlesini bul. C=12 u, H=1 u; uç gruplar hesaba katılmıyor.",
        "Önce bir tekrarı, sonra altı katını say.",
        [
          "Bir tekrarda C₂H₄ bulunur: kütle 2 × 12 + 4 × 1 = 28 u.",
          "Altı tekrarda C₁₂H₂₄ atomları vardır.",
          "Bu tekrarların toplam kütlesi 6 × 28 = 168 u; bütün zincirin uç gruplu kesin kütlesi verilmiş değildir.",
        ],
        "C₁₂H₂₄ bölümü; 168 u",
        "12 × 12 + 24 = 168 u aynı sonucu verir.",
        "CH₂=CH₂ çift bağını bütün PE zincirinde aynen koruma.",
      ),
      E(
        "PVC’nin farklı atomu",
        "PVC tekrar birimi –CH₂–CHCl– olarak veriliyor. Dört tekrarın toplam kütlesi nedir? C=12 u, H=1 u, Cl=35,5 u; yalnız tekrar bölümü sayılıyor.",
        "Bir tekrarı C₂H₃Cl olarak yaz.",
        [
          "Bir tekrarın kütlesi 2 × 12 + 3 × 1 + 35,5 = 62,5 u olur.",
          "Dört tekrar C₈H₁₂Cl₄ atomlarını taşır.",
          "Tekrar bölümünün toplam kütlesi 4 × 62,5 = 250 u bulunur.",
        ],
        "250 u",
        "8 × 12 + 12 + 4 × 35,5 = 250 u.",
        "PVC’ye PE’nin yalnız C/H atomlarını uygulama.",
      ),
      E(
        "Kremde sürekli fazı bul",
        "Bir kremde yağ damlacıkları suyun içinde dağılmıştır. Damlaların çevresindeki kesintisiz ortam sudur. Bu yapı nasıl adlandırılır ve gerçek çözelti midir?",
        "Dağılan faz ile sürekli fazı ayrı belirle.",
        [
          "Yağ damlacıkları dağılan fazı, su sürekli fazı oluşturur.",
          "Bu nedenle yağ/su emülsiyonu adı kullanılır.",
          "Damlacıkların varlığı iki fazlı dağılımı gösterir; tekdüze görünse de bu tanımla gerçek moleküler çözelti değildir.",
        ],
        "Yağ/su emülsiyonu",
        "Adın ilk kısmı verilen damlacık türüyle eşleşir.",
        "Yağın dağılmasıyla suyun dağılmasını aynı emülsiyon sayma.",
      ),
      E(
        "Aynı etkin miktar, bilinmeyen salım",
        "İki hipotetik tablette aynı etkin maddeden 100 mg vardır. Birinde kaplama, diğerinde farklı bir taşıyıcı bulunuyor; salım ölçümü veya kullanım yolu karşılaştırması verilmemiştir. Aynı çözünme süresi sonucu çıkar mı?",
        "Bilinen miktarla bilinmeyen hızı ayır.",
        [
          "Etkin madde miktarının eşit olduğu kökte verilmiştir.",
          "Kaplama ve taşıyıcı, sunum veya salımı etkileyebilir; süre verisi yoktur.",
          "Aynı çözünme süresi kesinleşmez. Süre karşılaştırması için aynı koşullarda salım/çözünme ölçümü gerekir.",
        ],
        "Çözünme süresi eşitliği belirlenemez.",
        "Aynı 100 mg bilgisi bir miktardır; dakika cinsinden süre vermez.",
        "Tablet biçimini veya etkin madde gramını tek başına hız ölçütü yapma.",
      ),
    ],
    recall: [
      {
        prompt: "Monomer ile tekrar birimi her zaman aynı bağ düzeni mi taşır?",
        answer:
          "Hayır; etilendeki C=C bağı PE oluşumunda farklı bağ düzenine dönüşür.",
      },
      {
        prompt: "Triaçilgliserol neden burada polimer örneği sayılmaz?",
        answer:
          "Üç yağ asidi kalıntılı ester yapısı, çok sayıda klasik tekrar birimli zincir değildir.",
      },
      {
        prompt: "PET ve PTFE’nin örnek işlevleri?",
        answer:
          "PET ambalaj/lif; PTFE uygun düşük yapışmalı kaplama örneğidir. Aynı polimer değildirler.",
      },
      {
        prompt: "Farmasötik biçim adından kesin etki süresi çıkar mı?",
        answer: "Hayır; etkin madde, salım ve kullanım koşulları da gerekir.",
      },
    ],
    items: [
      Q(
        "Etilen CH₂=CH₂’den oluşan PE’nin tekrar birimi –CH₂–CH₂– olarak verilmiştir. Bu bilgi hangi ifadeyi destekler?",
        "Polimerleşmede bağ düzeni değişir; monomer ile tekrar gösterimi aynı değildir.",
        [
          "Etilen molekülleri hiç bağ kurmadan yan yana kalır.",
          "Her tekrar eklendiğinde zorunlu bir H₂O çıkar.",
          "PE’nin her tekrarında Cl atomu bulunur.",
          "Tekrar sayısı her durumda mol sayısına eşittir.",
        ],
        "İki formüldeki C=C ve C–C düzenini karşılaştır.",
        "Katılma örneğinde karbonlar arası bağ düzeni değişir ve zincir oluşur. Serbest monomer karışımı polimer zinciri değildir.",
      ),
      Q(
        "PE tekrarı C₂H₄ olarak sayılıyor. Uç gruplar dışarıda bırakılarak altı tekrar biriminin toplam kütlesi nedir? C=12 u, H=1 u.",
        "168 u",
        ["28 u", "84 u", "144 u", "336 u"],
        "Bir tekrar 28 u; altı katını al.",
        "6 × (2 × 12 + 4) = 168 u. Bu verilen tekrar bölümüdür, uç gruplu bütün zincir için ek bilgi gerekir.",
      ),
      Q(
        "PVC tekrarı C₂H₃Cl olarak veriliyor. Yalnız dört tekrarın kütlesi nedir? C=12 u, H=1 u, Cl=35,5 u.",
        "250 u",
        ["62,5 u", "125 u", "224 u", "284 u"],
        "Bir tekrarın kütlesi 62,5 u.",
        "4 × (24 + 3 + 35,5) = 250 u. Kloru veya tekrar sayısını atlamak sonucu değiştirir.",
      ),
      Q(
        "PTFE tekrar birimi C₂F₄ olarak veriliyor. Yalnız üç tekrar bölümünde kaç F atomu vardır?",
        "12",
        ["3", "4", "6", "24"],
        "Her tekrarda dört F bulunur.",
        "3 × 4 = 12 F atomu vardır. Buradaki üç tekrar sayısıdır; mol olarak verilmemiştir.",
      ),
      Q(
        "Aşağıdakilerden hangisi klasik tekrar birimli doğal polimer örneğidir?",
        "Selüloz",
        [
          "NaCl",
          "Saf su",
          "Tek glikoz molekülü",
          "Bir triaçilgliserol molekülü",
        ],
        "Çok sayıda bağlı birim taşıyan doğal zinciri seç.",
        "Selüloz doğal polisakkarit zinciridir. Tek glikoz, NaCl ve H₂O polimer zinciri değildir; triaçilgliserol burada polimer sayılmaz.",
      ),
      Q(
        "PET ve PTFE için hangi eşleştirme uygun ders örneğidir?",
        "PET: içecek ambalajı/lif; PTFE: uygun düşük yapışmalı kaplama",
        [
          "PET: tek bir yağ asidi; PTFE: yemek sodası",
          "PET ve PTFE aynı polimerin iki kısaltmasıdır.",
          "PET: NaCl kristali; PTFE: gliserol",
          "PET yalnız doğal protein, PTFE yalnız selülozdur.",
        ],
        "Tam adları ve örnek işlevleri ayır.",
        "PET polietilen tereftalat, PTFE politetrafloroetendir; farklı yapıları farklı örnek işlevlerle ilişkilidir.",
      ),
      Q(
        "Bir kremde yağ damlacıkları sürekli su fazında dağılmıştır. Hangi yapı verilmiştir?",
        "Yağ/su emülsiyonu",
        [
          "Su/yağ emülsiyonu",
          "Saf su",
          "Tek bileşenli gaz",
          "NaCl kristal örgüsü",
        ],
        "Damlacık yağ, dış ortam sudur.",
        "Dağılan yağ ve sürekli su fazı yağ/su emülsiyonunu tanımlar. Tekdüze görünüm gerçek çözeltiyi kanıtlamaz.",
      ),
      Q(
        "Bir tablette X bileşeni amaçlanan etkiyi, Y bileşeni ise tabletin fiziksel bütünlüğünü sağlayan bağlayıcı görevini taşıyor. Doğru rol ayrımı nedir?",
        "X etkin madde, Y yardımcı bileşendir.",
        [
          "X yalnız ambalaj, Y polimerleşme gazıdır.",
          "X ve Y zorunlu aynı kimyasaldır.",
          "Y’nin bütün kütlesi kesin etkin madde kütlesidir.",
          "Y yardımcıysa hiçbir koşulda etkileşimi olamaz.",
        ],
        "Amaçlanan etki ile biçimi destekleme görevini ayır.",
        "Etkin ve yardımcı rol ayrımı verilmiştir. Yardımcı olmak koşulsuz etkisizlik veya zararsızlık anlamına gelmez.",
      ),
      Q(
        "İki tablet aynı etkin maddeden 100 mg içeriyor. Kaplama ve salım verileri bilinmiyor. Hangisi yalnız bu bilgiyle belirlenemez?",
        "Aynı sürede çözünecekleri",
        [
          "Etkin madde adlarının aynı olduğu",
          "Verilen etkin madde miktarlarının eşit olduğu",
          "Her iki miktarın 100 mg olarak verildiği",
          "Salım süresi için ek veri gerektiği",
        ],
        "Miktar bilgisi süre ölçümü değildir.",
        "Aynı etkin miktar salım hızını tek başına belirlemez; kaplama ve diğer koşullar için ek veri gerekir.",
      ),
      Q(
        "Ambalajda bir polimer malzeme kodu görülüyor. Bu kod tek başına hangisinin kanıtı değildir?",
        "Ambalajın fiilen geri dönüştürülmüş olduğunun",
        [
          "Malzeme türünü tanımaya yardımcı bir bilgi bulunduğunun",
          "Ambalaj üzerinde bir işaret olduğunun",
          "Toplama ve ayırmanın ayrı süreçler olduğunun",
          "Malzeme adı ile ürünün gerçek yolculuğunun farklı veri olduğunun",
        ],
        "Potansiyel malzeme bilgisi ile gerçekleşmiş işlemi ayır.",
        "Geri dönüşüm için toplama ve işleme süreçleri gerekir. Kodun varlığı bunların gerçekten gerçekleştiğini kanıtlamaz.",
      ),
    ],
    source:
      "Aurelia TYT Kimya 054 PDF 1–7; MEBİ TYT Kimya PDF 89–92; OGM Dersler Cepte Yaygın Günlük Hayat Kimyasalları PDF 12–19/26 ve OGM Polimerler, Kozmetik Malzemeleri ve İlaç Formları sunusu karşılaştırıldı. Polimer/ürün, faz ve etkin madde rolleri koşullarıyla açıklanır. İçerik ve sorular özgündür.",
  },
  {
    id: "polimer-gida-ilac-yag",
    topic: "detail-193",
    title: "Polimer - hazır gıda - ilaç - yağ",
    minutes: 46,
    objectives: [
      "Ambalaj, içerik ve beslenme etiketini farklı veri olarak oku.",
      "Porsiyon ve birim hesabını tam bağlamla yap.",
      "Yağ yapısı, katkı görevi ve işleme yöntemlerini koşullarıyla ilişkilendir.",
    ],
    sections: [
      S(
        "Kabın kimyası, içindekinin kimyası",
        "PET işaretli bir şişedeki ayçiçeği yağında iki farklı bilgi vardır: PET kabın malzemesini, ürün adı ise içeriği anlatır. Yağın ana bileşenleri triaçilgliseroller olabilir; ambalaj polimerini yağın içindekiler listesine taşıma.",
        "Aynı içerik farklı ambalajla, aynı ambalaj farklı içerikle sunulabilir. Bir geri dönüşüm kodu ne ürünün besin değerini ne de kabın gerçekten geri dönüştürülmüş olduğunu tek başına söyler. Etiketi veri türlerine ayırmak günlük bir nesneyi kimyasal açıdan doğru okumayı sağlar.",
      ),
      S(
        "Etiketin dört ayrı sorusu",
        "İçindekiler listesi hangi bileşenlerin bulunduğunu; net miktar paketteki ürün miktarını; beslenme bildirimi belirli referans miktardaki besin değerlerini; tarih ve saklama bilgisi ise ürünün koşullarını anlatır. Bunlar birbirinin yerine geçmez.",
        "Bir tabloda 100 g için değer verilmişse o satır 100 g ürünün içeriğini anlatır. Porsiyonun kütlesi farklı olabilir. Doymuş yağ toplam yağın alt kümesidir; aynı toplamı bulurken onu yağın üstüne ikinci kez eklemek hem hesabı hem grafik yorumunu bozar.",
      ),
      S(
        "Porsiyon hesabında önce referansı işaretle",
        "100 g üründe 20 g yağ varsa yağ/ürün oranı 0,20 g/g olur. 35 g ürün için 35 × 0,20 = 7 g yağ bulunur. Sonucun birimi gram yağdır; 20 sayısı her porsiyonda değişmeden kalan bir miktar değildir.",
        "Porsiyon sıfırsa alınan miktar sıfırdır; porsiyon iki katına çıkarsa verilen homojen içerik modeliyle besin miktarı iki katına çıkar. Yağın gramı tüketilen ürün gramını aşarsa birim veya oranı yeniden kontrol et. Etiketin yuvarlanmış değerleriyle çok fazla kesin basamak üretme.",
      ),
      S(
        "100 mL, 100 g demek değildir",
        "Hacim ve kütle farklı büyüklüklerdir. 100 mL’de 3 g yağ yazıyorsa 250 mL için 3 × 250/100 = 7,5 g hesabı aynı hacim referansını kullanır; yoğunluk gerekmez. Fakat 100 g’daki bilgiyi 50 mL’ye taşımak farklı bir dönüşümdür.",
        "İkinci tür hesapta ürünün yoğunluğu verilmelidir. Yoğunluk 1,2 g/mL ise 50 mL ürün 60 g olur; kütleye dayalı etikete bundan sonra başvurulur. Yoğunluğun verilmemesi yağ miktarının sıfır olduğunu değil, tek sayıyla belirlenemediğini gösterir.",
      ),
      S(
        "Katkı maddesinin adı değil görevi sorulur",
        "Antimikrobiyal koruyucu belirli bozulma süreçlerini sınırlamaya; antioksidan oksitlenmeyi yavaşlatmaya; renk ve tat bileşenleri görünüm veya tada; emülgatör yağ-su dağılımının kararlılığına yardımcı olabilir. İşlev sınıflarını mekanizmayla ilişkilendir.",
        "Bir madde farklı ürünlerde birden çok görev taşıyabilir. Bu nedenle soru hangi koşuldaki hangi görevi istediğini açık vermelidir. “Her katkı koruyucudur” veya “her katkı kesin aynı sağlık sonucunu doğurur” genellemeleri geçerli değildir; kimyasal tür ve kullanım koşulu ayrıca değerlendirilir.",
      ),
      S(
        "Isı işlemi bir sıcaklık sayısından fazlasıdır",
        "Pastörizasyon uygun sıcaklık ve süreyle hedef mikroorganizmaları azaltmayı amaçlar; sterilizasyonla aynı işlem değildir. UHT daha yüksek sıcaklık ve kısa süreyi uygun ambalajla birleştiren bir işlemdir. Sonuç, yalnız ulaşılmış en yüksek sıcaklıktan çıkarılmaz.",
        "UHT sütün bütün protein, yağ ve minerallerinin yok olması anlamına gelmez. Bazı besin bileşenleri işlemden farklı ölçüde etkilenebilir. Kapalı aseptik paket, açılmış ürün ve saklama koşulları aynı sistem değildir. Buradaki karşılaştırma evde uygulanacak ısıl işlem tarifi değildir.",
      ),
      S(
        "Tarih ve saklama bilgisini ayır",
        "Son tüketim tarihi ile tavsiye edilen tüketim tarihi aynı kavram değildir. İlki uygun saklamada gıda güvenliğiyle ilgili bir sınır olarak, ikincisi belirtilen koşullarda özelliklerin korunma süresiyle ilişkilendirilir. Etikette hangi ifadenin bulunduğunu açık oku.",
        "Paketin açılması, saklama sıcaklığı ve alerjen bilgisi başka veri türleridir. Yalnız güzel koku, düzgün görünüm veya bir katkı sayısı güvenli tüketimin kesin kanıtı yapılamaz. Bu bölüm hukuki ürün uygunluğu onayı değil, etiketteki farklı bilgi rollerini anlamaya yöneliktir.",
      ),
      S(
        "Yağ molekülünde üç ester bağı",
        "Yaygın yenilebilir yağların ana bileşenleri triaçilgliserollerdir. Bir gliserol iskeletine üç yağ asidi kalıntısı ester bağlarıyla bağlıdır. Serbest yağ asidi ile bütün triaçilgliserol molekülünü aynı varlık sayma.",
        "Aynı moleküldeki üç yağ asidi kalıntısı farklı olabilir; ticari bir yağ da birçok bileşenin karışımıdır. Bu yapı uzun tekrar zincirli klasik polimer değildir. Hidroliz veya sabunlaşma ester bağlarını etkiler; karbon zincirindeki çift bağa hidrojen eklenmesi ise farklı bir dönüşümdür.",
      ),
      S(
        "Doymuşlukta sayılan bağ C=C’dir",
        "Doymuş yağ asidinin karbon zincirinde C=C bulunmaz; tekli doymamışta bir, çoklu doymamışta birden fazla C=C vardır. Ester grubundaki C=O bu sınıflamada sayılan karbon-karbon çift bağı değildir.",
        "Cis/trans ayrımı da yalnız çift bağların adedinden çıkarılmaz; geometrik bilgi gerekir. Bir yağın oda sıcaklığında sıvı veya katı olması bileşimine ve sıcaklığa bağlıdır. Bitkisel kaynaklı olmak bütün yağların sıvı, hayvansal olmak bütün yağların katı olduğu değişmez bir kural değildir.",
      ),
      S(
        "Üretim yöntemi ayrı sınıflandırmadır",
        "Sızma, rafine, riviera ve vinterize sözcükleri işleme ve ürün özellikleriyle ilişkilidir. Sızma örneklerinde mekanik elde etme; rafinasyonda istenmeyen bazı bileşenlerin giderilmesi; riviera örneğinde rafine ve uygun doğal yağların karışımı düşünülür.",
        "Vinterizasyon kontrollü soğutmayla daha yüksek sıcaklıkta kristallenebilen fraksiyonların veya mumsu bileşenlerin ayrılmasıyla bulanıklığı azaltabilir. Bütün yağın ester bağlarını koparma işlemi değildir. Sızmayı zorunlu yüksek asitlik, rafineyi bütünüyle besinsiz yağ diye tanımlama; sabit yasal oran varsayma.",
      ),
      S(
        "Hidrojenleme ile bozulmayı karıştırma",
        "Tam ideal hidrojenlemede verilen her C=C bağı başına bir H₂ kullanılır. Örneğin molekül başına dört C=C varsa 0,25 mol molekül en çok bu modelde 1 mol H₂ tüketir. Ester karbonilini aynı hesaba eklemek yanlış hedef bağı sayar.",
        "Kısmi hidrojenleme ve izomerleşme koşullara bağlı farklı ürünler oluşturabilir; her margarin veya her ürün için aynı trans oranı çıkarılmaz. Oksitlenme ve tekrar ısıtma başka süreçlerdir. Isı, ışık ve oksijen yağın değişimini etkileyebilir; bunların varlığından tek başına kesin bozulma süresi hesaplanmaz.",
      ),
      S(
        "Ürün dosyasını birleştir",
        "Bir paket için dört sütun aç: ambalaj malzemesi, içerik/bileşen görevi, nicel etiket ve kullanım/saklama bilgisi. Aynı okuma yöntemi ilaçta etkin madde miktarı, yardımcı bileşen ve farmasötik biçimi ayırmaya da yardım eder.",
        "Miligram veya gram oranı çözmek, kişiye doz veya ürün seçmek değildir. Formül ve etiket, yalnız verilen bağlamdaki kimyasal hesabı destekler. Bu ünitede polimer adlarını yeniden ezberlemek yerine aynı nesnedeki farklı bilgi türlerini birlikte, fakat birbirine karıştırmadan kullanırsın.",
      ),
    ],
    examples: [
      E(
        "Doymuş yağı iki kez toplama",
        "Bir etiket 100 g ürün için toplam yağ 20 g ve doymuş yağ 8 g veriyor. Homojen içerik kabulüyle 35 g porsiyonda bu iki miktar kaç gramdır?",
        "Aynı 35/100 çarpanını uygula.",
        [
          "Toplam yağ 20 × 35/100 = 7 g olur.",
          "Doymuş yağ 8 × 35/100 = 2,8 g bulunur.",
          "Doymuş yağ, 7 g toplam yağın içindedir; toplamı 9,8 g diye artırma.",
        ],
        "7 g toplam yağ; bunun 2,8 g’ı doymuş yağ",
        "2,8 g değeri 7 g’dan küçük; alt küme koşulu korunur.",
        "Toplam yağ ile doymuş yağı iki bağımsız katkı gibi toplama.",
      ),
      E(
        "Hacim temelli etiket",
        "Etikette 100 mL ürün başına 3 g yağ yazıyor. Aynı ürünün 250 mL’sinde kaç gram yağ vardır? İçerik homojen kabul ediliyor.",
        "Referans ve porsiyon aynı hacim biriminde.",
        [
          "250 mL, 100 mL’nin 2,5 katıdır.",
          "Yağ miktarı 3 × 2,5 = 7,5 g bulunur.",
          "Hacim başına gram kullanıldığı için litreyi kilograma dönüştürmeye veya yoğunluk tahmin etmeye gerek yoktur.",
        ],
        "7,5 g yağ",
        "250 mL yarıya inse 125 mL ve 3,75 g olur; oran korunur.",
        "Sonucu 7,5 mL yağ diye yazma; etiket yağ miktarını gram vermiştir.",
      ),
      E(
        "Yoğunluk eklenince çözülen soru",
        "Etiket 100 g ürün başına 20 g yağ veriyor. Tüketilen ürün 50 mL. Önce yoğunluk bilinmiyor; sonra 1,2 g/mL olduğu veriliyor. Yağ gramı ne zaman ve nasıl bulunur?",
        "Hacmi kütleye çevirmek için gereken veriyi belirle.",
        [
          "Yoğunluk yokken 50 mL’nin ürün gramı bilinmez; yağ için tek sayısal cevap yoktur.",
          "Verilen yoğunlukla ürün kütlesi 50 × 1,2 = 60 g olur.",
          "60 g ürünün yağı 20 × 60/100 = 12 g bulunur.",
        ],
        "Yoğunluk yokken belirsiz; verildiğinde 12 g",
        "12/60 = 0,20 g/g etiketteki oranla aynıdır.",
        "50 mL’yi koşulsuz 50 g kabul etme.",
      ),
      E(
        "Hedef bağları say",
        "Bir triaçilgliserol molekülündeki karbon zincirlerinde toplam dört C=C bağı vardır. 0,25 mol molekülün bütün bu C=C bağları ideal olarak tamamen hidrojenleniyor. Başka bağlar değişmiyor. Kaç mol H₂ tüketilir?",
        "Molekül başına C=C sayısını molle çarp.",
        [
          "Bir moleküldeki dört C=C için dört H₂ molekülü gerekir.",
          "0,25 mol molekülde 0,25 × 4 = 1,00 mol C=C bağı vardır.",
          "H₂ tüketimi 1,00 moldür; üç ester C=O bağı verilen hedefe dahil değildir.",
        ],
        "1,00 mol H₂",
        "Molekül miktarı iki kat olsaydı aynı bağ sayısıyla H₂ de iki kat olurdu.",
        "Üç ester bağını üç ek C=C bağı gibi sayma.",
      ),
    ],
    recall: [
      {
        prompt:
          "Beslenme etiketinde doymuş yağ toplam yağdan ayrı toplanır mı?",
        answer: "Hayır; doymuş yağ toplam yağın içindeki bir alt miktardır.",
      },
      {
        prompt: "100 g değerini 50 mL’ye taşımak için ne eksik olabilir?",
        answer: "Ürünün yoğunluğu; kütle ve hacim eşit birim değildir.",
      },
      {
        prompt: "Emülgatör ile antioksidanın görev farkı?",
        answer:
          "Emülgatör fazların dağılım kararlılığına; antioksidan oksitlenmenin yavaşlamasına yardımcı olabilir.",
      },
      {
        prompt: "Yağ asidinin doymamışlığında ester C=O sayılır mı?",
        answer:
          "Hayır; karbon zincirindeki C=C bağları sayılır. Cis/trans için ayrıca geometrik bilgi gerekir.",
      },
    ],
    items: [
      Q(
        "Bir şişenin üzerinde PET malzeme işareti ve “ayçiçeği yağı” ürün adı vardır. Doğru ayrım hangisidir?",
        "PET ambalajı, yağ adı ise içeriği tanımlar.",
        [
          "Yağın tamamı PET polimeridir.",
          "PET gliserolün diğer adıdır.",
          "Yağ etiketi şişenin bütün polimer türünü belirler.",
          "İşaret şişenin fiilen geri dönüştürüldüğünü kesin kanıtlar.",
        ],
        "Kap ile içeriği iki sütunda oku.",
        "Malzeme kodu ambalajla, ürün adı içerikle ilişkilidir; birbirinin yerine kullanılmaz.",
      ),
      Q(
        "Homojen bir üründe 100 g başına 20 g toplam yağ yazıyor. 35 g porsiyondaki yağ kaç gramdır?",
        "7 g",
        ["2 g", "5 g", "20 g", "57,14 g"],
        "20 × 35/100 hesapla.",
        "0,20 g/g × 35 g = 7 g yağ. Referans miktarı değişince etiket sayısı aynı gram olarak kalmaz.",
      ),
      Q(
        "Etikette 100 g için 20 g toplam yağ ve 8 g doymuş yağ var. 50 g üründe toplam yağ kaç gramdır?",
        "10 g",
        ["4 g", "14 g", "20 g", "28 g"],
        "Doymuş yağ toplam yağın bir parçasıdır.",
        "Toplam yağ 20 × 50/100 = 10 g; doymuş kısmı 4 g bunun içindedir. 10 + 4 yapılmaz.",
      ),
      Q(
        "100 mL ürün başına 3 g yağ veren homojen üründen 250 mL tüketiliyor. Yağ miktarı nedir?",
        "7,5 g",
        ["1,2 g", "3 g", "6 g", "75 g"],
        "Aynı hacim referansına oran kur.",
        "3 × 250/100 = 7,5 g. Etiket hacim başına gram verdiğinden yoğunluk gerekmez.",
      ),
      Q(
        "Etiket 100 g üründe 20 g yağ veriyor. Tüketilen miktar 50 mL, yoğunluk ve başka kütle-hacim verisi yok. Yağ gramı için ne söylenebilir?",
        "Veri yetersizdir; hacimden ürün kütlesi belirlenemiyor.",
        [
          "Kesin 10 g’dır.",
          "Kesin 20 g’dır.",
          "Kesin sıfırdır.",
          "Kesin 50 g’dır.",
        ],
        "Etiket kütle, tüketim hacim temelinde.",
        "50 mL’yi grama çevirmek için yoğunluk veya eşdeğer veri gerekir. Eksik veri sıfır miktar anlamına gelmez.",
      ),
      Q(
        "Etiket 100 g üründe 20 g yağ veriyor. 50 mL ürünün yoğunluğu 1,2 g/mL. Homojen içerikle yağ gramı nedir?",
        "12 g",
        ["8,33 g", "10 g", "20 g", "60 g"],
        "Önce 50 × 1,2 ile ürün gramını bul.",
        "Ürün kütlesi 60 g; yağ 20/100 × 60 = 12 g. 60 g ürünün tamamı yağ değildir.",
      ),
      Q(
        "Bir gıda katkısının verilen görevi yağ ve su damlacıklarının dağılımını kararlı tutmaya yardımcı olmaktır. Bu işlev sınıfı hangisidir?",
        "Emülgatör",
        [
          "Yalnız renk verici",
          "Yalnız tatlandırıcı",
          "Ambalaj polimer kodu",
          "Net miktar birimi",
        ],
        "Dağılan fazlar ve kararlılık birlikte verilmiş.",
        "Emülgatör emülsiyon dağılımının kararlılığına yardımcı olabilir; iki fazı zorunlu gerçek çözeltiye çevirmez.",
      ),
      Q(
        "Bir yağ asidinin karbon zincirinde iki C=C bağı vardır. Ester grubundaki C=O ayrı tutuluyor. Bu yağ asidi hangi sınıftadır?",
        "Çoklu doymamış",
        [
          "Doymuş",
          "Tekli doymamış",
          "Kesin trans",
          "Kesin oda sıcaklığında katı",
        ],
        "Birden fazla C=C say.",
        "İki C=C çoklu doymamışlığı gösterir. Cis/trans ve fiziksel hâl yalnız bu sayıdan kesin belirlenmez.",
      ),
      Q(
        "Her molekülünün karbon zincirlerinde toplam dört C=C bulunan 0,25 mol triaçilgliserol tamamen ideal hidrojenleniyor. Başka bağlar değişmiyor. H₂ tüketimi nedir?",
        "1 mol",
        ["0,25 mol", "0,50 mol", "0,75 mol", "1,75 mol"],
        "Her hedef C=C için bir H₂.",
        "0,25 × 4 = 1 mol H₂. Ester karbonillerini hedef C=C sayısına ekleme.",
      ),
      Q(
        "UHT işlemi görmüş süt hakkında yalnız işlem adı verilmiştir. Hangi genelleme geçersizdir?",
        "İşlem bütün protein, yağ ve minerallerin yok olduğu anlamına gelir.",
        [
          "Sıcaklık ve süre birlikte önemlidir.",
          "Ambalaj ve saklama koşulu sonucu etkiler.",
          "Açılmış ürün ile kapalı aseptik paket aynı koşul değildir.",
          "Isıl işlem farklı bileşenleri farklı ölçüde etkileyebilir.",
        ],
        "Mikrobiyolojik hedef ile bütün besin kütlesini ayır.",
        "UHT bütün besin bileşenlerini tamamen yok etme işlemi değildir. Ticari sterilite ve uygun ambalaj/saklama ayrı koşullarla açıklanır.",
      ),
    ],
    source:
      "Aurelia TYT Kimya 055 PDF 1–7; MEBİ TYT Kimya PDF 92–94; OGM Dersler Cepte Gıdalar PDF 20–24/27 ve OGM Hazır Gıdalar ve Yenilebilir Yağ Türleri sunusu karşılaştırıldı. Etiket birimleri, yağ yapısı ve koşullu işlevler özgün örneklerle işlenmiştir; alıştırmalar resmî sınav sorusu değildir.",
  },
);

export const forge017ChemistryAGuides: LessonGuide[] = unitData.map(
  ({ title, topic, items, ...guide }) => guide,
);
export const forge017ChemistryATopics: Record<string, string> =
  Object.fromEntries(unitData.map((u) => [u.id, u.topic]));
export const forge017ChemistryALessons: Lesson[] = unitData.map((u) => ({
  id: u.id,
  subjectId: "tyt-kimya",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: u.items.map(
    ([prompt, correct, wrong, hint, explanation], i): Question => {
      const answer = i % 5,
        options: string[] = [...wrong];
      options.splice(answer, 0, correct);
      return {
        id: `f017-chem-a-${u.id}-${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer,
        hint: txt(hint),
        explanation: txt(explanation),
        skill: u.id,
      };
    },
  ),
  source: txt(u.source),
  tags: [u.id, "kaynakli-anlatim"],
}));
