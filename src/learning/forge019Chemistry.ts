import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const within = (value: number, low: number, high: number) =>
  Number.isFinite(value) && value >= low && value <= high;

/** Dilute ideal classroom model. i and final solution volume are supplied separately. */
export function colligative019(
  moles: number,
  solventKg: number,
  particles: number,
  volumeL: number,
) {
  if (
    !within(moles, 0, 2) ||
    !within(solventKg, 0.1, 5) ||
    !within(particles, 1, 4) ||
    !within(volumeL, 0.1, 10)
  )
    throw new RangeError("COLLIGATIVE_019");
  const molality = moles / solventKg,
    molarity = moles / volumeL;
  const boilingRise = 0.52 * particles * molality,
    freezingDrop = 1.86 * particles * molality;
  return {
    moles,
    solventKg,
    particles,
    volumeL,
    molality,
    molarity,
    boilingRise,
    freezingDrop,
    boiling: 100 + boilingRise,
    freezing: -freezingDrop,
    osmotic: particles * molarity * 0.08206 * 300,
  };
}

export const solubilityKinds019 = {
  increasing: "Isınınca artan",
  decreasing: "Isınınca azalan",
} as const;
export function solubility019(
  waterG: number,
  soluteG: number,
  temperature: number,
  kind: keyof typeof solubilityKinds019,
) {
  if (
    !within(waterG, 50, 300) ||
    !within(soluteG, 0, 200) ||
    !within(temperature, 20, 80) ||
    !Object.hasOwn(solubilityKinds019, kind)
  )
    throw new RangeError("SOLUBILITY_019");
  const per100 =
    kind === "increasing"
      ? 20 + (temperature - 20) / 3
      : 40 - (temperature - 20) / 3;
  const capacity = (waterG * per100) / 100,
    dissolved = Math.min(soluteG, capacity),
    solid = soluteG - dissolved;
  return {
    waterG,
    soluteG,
    temperature,
    kind,
    per100,
    capacity,
    dissolved,
    solid,
    solutionMass: waterG + dissolved,
    totalMass: waterG + soluteG,
    saturated: soluteG >= capacity,
  };
}

/** Constant external pressure; heat leakage, evaporation and non-PV work are excluded. */
export function calorimetry019(
  massG: number,
  specificHeat: number,
  deltaT: number,
  calorimeter: number,
  extentMol: number,
) {
  if (
    !within(massG, 50, 500) ||
    !within(specificHeat, 0.5, 5) ||
    !within(deltaT, -10, 10) ||
    !within(calorimeter, 0, 100) ||
    !within(extentMol, 0.01, 1)
  )
    throw new RangeError("CALORIMETRY_019");
  const solutionHeat = massG * specificHeat * deltaT,
    cupHeat = calorimeter * deltaT,
    reactionHeat = -(solutionHeat + cupHeat);
  return {
    massG,
    specificHeat,
    deltaT,
    calorimeter,
    extentMol,
    solutionHeat,
    cupHeat,
    reactionHeat,
    molarEnthalpy: reactionHeat / (1000 * extentMol),
    kind:
      reactionHeat < 0
        ? "Ekzotermik"
        : reactionHeat > 0
          ? "Endotermik"
          : "Net ısı sıfır",
  };
}

/** Two balanced reactions at the same state: C+1/2 O2→CO; CO+1/2 O2→CO2. */
export function hess019(first: number, second: number) {
  if (
    !Number.isInteger(first) ||
    !within(first, -2, 2) ||
    !Number.isInteger(second) ||
    !within(second, -2, 2)
  )
    throw new RangeError("HESS_019");
  const net = {
    C: -first,
    O2: -(first + second) / 2,
    CO: first - second,
    CO2: second,
  };
  return {
    first,
    second,
    net,
    firstHeat: -110.5 * first,
    secondHeat: -283 * second,
    heat: -110.5 * first - 283 * second,
    target: first === 1 && second === 1,
    carbonResidual: net.C + net.CO + net.CO2,
    oxygenResidual: 2 * net.O2 + net.CO + 2 * net.CO2,
  };
}

/** Experimentally supplied initial-rate law r=2[A]^2[B], not inferred from net coefficients. */
export function rate019(a: number, b: number) {
  if (!within(a, 0, 0.3) || !within(b, 0, 0.3))
    throw new RangeError("RATE_019");
  const rate = 2 * a * a * b;
  return {
    a,
    b,
    rate,
    relative: rate / 0.002,
    orderA: 2,
    orderB: 1,
    totalOrder: 3,
    k: 2,
  };
}

function bisect019(low: number, high: number, residual: (x: number) => number) {
  if (low <= 0 && high >= 0 && residual(0) === 0) return 0;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    if (residual(mid) > 0) high = mid;
    else low = mid;
  }
  return (low + high) / 2;
}

/** X2(g)⇌2X(g), ideal concentration model; at least 1e-100 mol X atoms avoids unrepresentable squared stocks. */
export function ice019(
  dimerMol: number,
  monomerMol: number,
  volumeL: number,
  kc: number,
) {
  if (
    !within(dimerMol, 0, 2) ||
    !within(monomerMol, 0, 4) ||
    2 * dimerMol + monomerMol < 1e-100 ||
    !within(volumeL, 0.5, 4) ||
    !within(kc, 0.1, 4)
  )
    throw new RangeError("ICE_019");
  // Solve M² + (KV/2)M − (KV/2)A = 0 in its rationalized form.
  // M²/(KV) retains the tiny dimer that A−M would lose to cancellation.
  const atoms = 2 * dimerMol + monomerMol,
    kv = kc * volumeL,
    monomer = (2 * kv * atoms) / (kv + Math.sqrt(kv * kv + 8 * kv * atoms)),
    dimer = (monomer * monomer) / kv,
    extent = dimerMol - dimer,
    dimerM = dimer / volumeL,
    monomerM = monomer / volumeL;
  const initialQ =
    dimerMol === 0 ? Infinity : monomerMol ** 2 / (volumeL * dimerMol);
  return {
    dimerMol,
    monomerMol,
    volumeL,
    kc,
    extent,
    dimer,
    monomer,
    dimerM,
    monomerM,
    quotient: monomerM ** 2 / dimerM,
    initialQ,
    atomMol: 2 * dimer + monomer,
    initialAtomMol: 2 * dimerMol + monomerMol,
    kpAt300: kc * 0.08206 * 300,
  };
}

/** X+Y⇌XY; initially 1 mol each in 1 L, Kc=1 in the stated classroom units. */
export function concentration019(
  addX: number,
  addXY: number,
  volumeRatio: number,
) {
  if (
    !within(addX, 0, 1) ||
    !within(addXY, 0, 1) ||
    !within(volumeRatio, 0.5, 2)
  )
    throw new RangeError("CONCENTRATION_019");
  const x0 = 1 + addX,
    y0 = 1,
    xy0 = 1 + addXY,
    volume = volumeRatio;
  const instant = [x0 / volume, y0 / volume, xy0 / volume] as const;
  const initialQ = (xy0 * volume) / (x0 * y0);
  const extent = bisect019(
    -xy0,
    Math.min(x0, y0),
    (x) => (xy0 + x) * volume - (x0 - x) * (y0 - x),
  );
  const final = [
    (x0 - extent) / volume,
    (y0 - extent) / volume,
    (xy0 + extent) / volume,
  ] as const;
  return {
    addX,
    addXY,
    volume,
    instant,
    final,
    initialQ,
    extent,
    quotient: final[2] / (final[0] * final[1]),
    xInventory: (final[0] + final[2]) * volume,
    yInventory: (final[1] + final[2]) * volume,
    direction:
      initialQ < 1 ? "Ürünlere" : initialQ > 1 ? "Girenlere" : "Dengede",
  };
}

export const equilibriumHeatKinds019 = {
  endo: "İleri yön ısı alır",
  exo: "İleri yön ısı verir",
} as const;
/** Supplied fictional K(T) table for X⇌Y. No van't Hoff or measured chemical data is implied. */
export function temperatureEquilibrium019(
  temperature: number,
  kind: keyof typeof equilibriumHeatKinds019,
) {
  if (
    ![300, 325, 350].includes(temperature) ||
    !Object.hasOwn(equilibriumHeatKinds019, kind)
  )
    throw new RangeError("TEMPERATURE_EQUILIBRIUM_019");
  const index = (temperature - 300) / 25,
    kc = (kind === "endo" ? [1, 2, 4] : [4, 2, 1])[index];
  const a = 3 / (1 + kc),
    b = 3 - a,
    qAtChange = 2;
  return {
    temperature,
    kind,
    kc,
    qAtChange,
    a,
    b,
    quotient: b / a,
    direction:
      qAtChange < kc ? "Ürünlere" : qAtChange > kc ? "Girenlere" : "Dengede",
  };
}

type ChemistryUnit019 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: LessonGuide["recall"];
  items: [string, string, string[], string, string][];
  source: string;
};

// Original teaching and exercises are appended below from the reviewed source ledger.
const data019: ChemistryUnit019[] = [
  {
    id: "ayt-molalite-koligatif",
    topic: "detail-421",
    title: "Molalite ve koligatif özellikler",
    minutes: 58,
    objectives: [
      "Molaliteyi çözücü kütlesinden, molariteyi son çözelti hacminden hesapla.",
      "İdeal tanecik modelinin sınırlarıyla kaynama, donma ve buhar basıncını karşılaştır.",
      "Ozmozda zardan geçiş, basınç ve net akış koşullarını ayır.",
    ],
    sections: [
      {
        title: "Aynı çözeltiyi iki farklı payda ile ölç",
        paragraphs: [
          "Molalite, çözünmüş maddenin mol miktarının çözücünün kilogramına oranıdır: m=n/çözücü kütlesi. Molarite ise n/son çözelti hacmi olup mol/L birimlidir. Çözücü ile çözelti aynı şey değildir; çözeltinin kütlesi çözünmüş maddeyi de içerir.",
          "Önce kabın içeriğini çözücü ve çözünen diye ayır. Örneğin 18 g glikoz 500 g suda çözünüyorsa mol hesabında glikozu, molalite paydasında yalnız 0,500 kg suyu kullanırsın. Son hacim verilmedikçe bu veriden doğrudan molarite çıkmaz. Bu örnekte 0,100 mol/0,500 kg=0,200 molal bulunur; aynı adımları farklı çözücü kütlesine uygulayabilirsin.",
        ],
        table: {
          headers: ["Ölçü", "Payda", "Birim"],
          rows: [
            ["Molalite", "Kilogram çözücü", "mol/kg"],
            ["Molarite", "Litre son çözelti", "mol/L"],
            ["Mol kesri", "Toplam bileşen molü", "Boyutsuz"],
          ],
        },
      },
      {
        title: "Kütle, hacim ve sıcaklığı birlikte denetle",
        paragraphs: [
          "Sabit bileşimli kapalı bir çözeltinin sıcaklığı değişince hacmi değişebilir; molarite bunun için sıcaklığa bağlı olabilir. Kimyasal tepkime, buharlaşma ve madde kaybı yoksa çözücü kütlesi ile çözünmüş mol değişmez; molalite hacim genişlemesinden etkilenmez.",
          "Çözücünün hacmi verilmişse kilogramını bulmak için yoğunluk gerekir. Çözeltinin yoğunluğu ise toplam çözelti kütlesini son hacme bağlar. Suyun her sıcaklıkta tam 1 g/mL olduğunu veya iki sıvı hacminin her karışımda toplandığını sessizce kabul etme.",
        ],
      },
      {
        title: "Koligatif ortaklık hangi koşulda geçerli?",
        paragraphs: [
          "Koligatif özellikler uygun seyreltik ideal yaklaşımda çözünmüş etkin tanecik derişimine bağlıdır. Aynı çözücü ve aynı dış koşullarda atom, molekül veya iyon sayısını mol üzerinden karşılaştırırız. Yalnız çözünenin gramını karşılaştırmak mol kütlesi farkını kaçırır.",
          "Bu yaklaşım her derişimde aynı doğrulukta değildir. Çözücüyle tepkime, iyon çiftleri, birleşme ve güçlü ideal dışılık gerçek davranışı değiştirebilir. Uygulamadaki model açıkça ideal kabul eder; çok derişik antifriz karışımına kesin laboratuvar ölçümü veya ürün reçetesi sunmaz.",
        ],
      },
      {
        title: "Bir formül birimi kaç etkin tanecik verir?",
        paragraphs: [
          "İdeal tam ayrışma modelinde NaCl bir Na⁺ ve bir Cl⁻, yani iki iyon verir. Glikoz molekül olarak kaldığında bir tanecik sayılır. Van't Hoff çarpanı i, ideal tanecik artışını hesabın içine alır; i=2 bütün gerçek NaCl çözeltilerinde tam ölçülen değer demek değildir.",
          "Çözünmeden dipte duran katı parçaları çözelti içindeki bağımsız iyonlara eklenmez. Kısmi çözünme varsa önce gerçekten çözünen molü bul. Etkin tanecik miktarı, karışıma başta konan katı molünden ve gözle sayılan çizim noktalarından farklı bir büyüklüktür.",
        ],
        table: {
          headers: ["Verilen ideal tür", "Bir mol başına etkin tanecik"],
          rows: [
            ["Moleküler glikoz", "1 mol molekül"],
            ["Tam ayrışan NaCl", "2 mol iyon"],
            ["Tam ayrışan MX₂", "3 mol iyon"],
          ],
        },
      },
      {
        title: "Raoult yasasında çözücünün payı",
        paragraphs: [
          "Uçucu olmayan çözünen ve ideal sıvı faz için çözücünün kısmi buhar basıncı P=Xçözücü·P°çözücü olur. Aynı sıcaklıkta saf çözücünün basıncı sabitken çözücünün mol kesri azalırsa bu basınç düşer. Sıvının buharıyla dengeye gelebilmesi ve yeterli sıvı bulunması da koşuldur.",
          "Bu sonucu yalnız yüzeyin katı taneciklerle kapanması gibi düşünme. Karışımın termodinamik durumu değişir; madde mutlaka yüzeyde yüzen bir kapak oluşturmaz. Buharlaşma hızı ile denge buhar basıncı da aynı ölçüm değildir; yüzey alanı hızı etkileyebilirken uygun dengede basıncı değiştirmez.",
        ],
      },
      {
        title: "İki bileşen de uçucuysa toplamı kur",
        paragraphs: [
          "İdeal A–B sıvı karışımında PA=XA·PA° ve PB=XB·PB° yazılır; gaz fazındaki toplam basınç PA+PB'dir. Çözünen uçucuysa onun katkısını sıfırlamak toplam basıncı yanlış verir. İki bileşenin uçucu olması tek başına karışımın ideal olduğunu kanıtlamaz.",
          "Mol kesirleri sıvı fazın bileşimidir; gaz fazının mol kesirleriyle aynı olmak zorunda değildir. Verilen basınçların aynı sıcaklıkta ölçüldüğünü denetle. Su–alkol gibi gerçek karışımları ancak sorunun açık ideal yaklaşımı altında bu basit bağıntıyla hesapla.",
        ],
      },
      {
        title: "Kaynamaya başlama sıcaklığı neden yükselir?",
        paragraphs: [
          "Kaynama, sıvının toplam buhar basıncının dış basınca ulaştığı koşulda başlar. Uçucu olmayan çözünen uygun ideal çözeltinin buhar basıncını azalttığında aynı dış basınca ulaşmak için daha yüksek sıcaklık gerekir. Seyreltik yaklaşım ΔTb=i·Kb·m bağıntısını verir.",
          "Buradaki ΔTb pozitif bir yükselme büyüklüğüdür; çözeltinin başlangıç kaynama sıcaklığı saf çözücününkine eklenir. Su için 100 °C değeri ancak verilen normal dış basınçla kullanılır. Kaynarken su kaybıyla bileşim değişiyorsa sonraki sıcaklık ilk hesapta sabit kalmak zorunda değildir.",
        ],
      },
      {
        title: "Donma alçalmasını işaretiyle anlat",
        paragraphs: [
          "Seyreltik uygun çözeltide saf çözücünün kristallenmeye başlama sıcaklığı düşer. Pozitif alçalma büyüklüğünü ΔTf=Tf°−Tf=i·Kf·m olarak tanımlarız. Son sıcaklık Tf=Tf°−ΔTf olduğundan su örneğinde sıfırın altında olabilir; büyüklüğün kendisine yanlışlıkla eksi işaret ekleme.",
          "İlk kristaller saf çözücü kabul edildiğinde kalan sıvı daha derişik olabilir. Bu nedenle başlangıç donma sıcaklığı bütün örneğin tek sıcaklıkta bütünüyle donduğu anlamına gelmez. Eşit çözücü, eşit basınç ve uygun model olmadan iki farklı sıvının alçalmasını yalnız tuz gramından kıyaslayamazsın.",
        ],
      },
      {
        title: "Ozmozda iki yönlü geçiş ile net akış",
        paragraphs: [
          "Yalnız çözücüyü geçiren bir zar ve başlangıçta eşit dış basınç altında net çözücü akışı daha düşük etkin çözünen derişiminden daha yüksek tarafa olabilir. Dengeye gelince net akış sıfırdır; iki taraftan moleküler geçişin tümü durmaz. Zarın hangi türleri geçirdiği mutlaka verilmelidir.",
          "İdeal seyreltik modelde π=iMRT ozmotik basıncı son çözelti molaritesi ve Kelvin sıcaklığıyla ilişkilendirir. Molaliteyi hacim bilgisi olmadan M yerine koyma. Tonisite de zardan geçemeyen türlerle ilgilidir; zarı geçen her maddeyi aynı kalıcı ozmotik etki saymak doğru değildir.",
        ],
      },
      {
        title: "Ölçümden mol kütlesine, basınçtan ters ozmoza",
        paragraphs: [
          "Uygun moleküler ve uçucu olmayan bir maddede ölçülen donma alçalmasından önce m, sonra çözücü kilogramıyla n ve en son M=g/n bulunabilir. Ayrışma veya birleşme varsa i ayrıca bilinmelidir. Tek bir sıcaklık farkı bilinmeyen bütün moleküler koşulları tek başına belirlemez.",
          "Derişik tarafa ozmotik basınç farkından büyük bir dış basınç uygulanırsa net çözücü akışı tersine çevrilebilir. Ters ozmozun çalışma ilkesi budur; gereken enerji ve zar seçiciliği ayrı koşullardır. Şemayı kullanmak, çıkan suyun her kirletici için koşulsuz güvenli olduğu garantisi oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Paydada yalnız su",
        prompt:
          "18,0 g glikoz, mol kütlesi 180 g/mol, 500 g suda tamamen çözünüyor. Molalite nedir?",
        strategy: "Çözünen molünü ve çözücü kilogramını ayrı hesapla.",
        steps: [
          {
            label: "Mol",
            explanation: "n=18,0/180=0,100 mol.",
          },
          {
            label: "Payda",
            explanation:
              "500 g su=0,500 kg çözücü; toplam 518 g çözelti kullanılmaz.",
          },
          {
            label: "Oran",
            explanation: "m=0,100/0,500=0,200 mol/kg.",
          },
        ],
        answer: "0,200 molal.",
        check: "Son hacim verilmediğinden molarite bulunmadı.",
        pitfall: "Toplam çözeltinin kilogramını paydaya koymak.",
      },
      {
        title: "Aynı mol, iki iyon",
        prompt:
          "Ayrı ayrı 0,100 mol glikoz ve NaCl, 0,500 kg suda çözünüyor. İdeal tam NaCl ayrışması, i(glikoz)=1, i(NaCl)=2 ve Kf=1,86 °C·kg/mol. Alçalmalar?",
        strategy: "Aynı molaliteye farklı i uygula.",
        steps: [
          {
            label: "Molalite",
            explanation: "Her çözelti için m=0,100/0,500=0,200.",
          },
          {
            label: "Glikoz",
            explanation: "ΔTf=1×1,86×0,200=0,372 °C.",
          },
          {
            label: "NaCl",
            explanation:
              "ΔTf=2×1,86×0,200=0,744 °C; NaCl örneği daha düşük sıcaklıkta başlar.",
          },
        ],
        answer: "0,372 ve 0,744 °C alçalma.",
        check:
          "Bunlar alçalma büyüklükleri; saf su 0 °C ise sonlar negatiftir.",
        pitfall: "i değerini mol kütlesi sanmak.",
      },
      {
        title: "Bilinmeyen molekülün kütlesi",
        prompt:
          "2,00 g uçucu olmayan, ayrışmayan madde 0,100 kg suda çözünüyor. İdeal seyreltik modelde ΔTf=0,372 °C, Kf=1,86 °C·kg/mol. Mol kütlesi?",
        strategy: "Sıcaklık farkından molaliteye geri dön.",
        steps: [
          {
            label: "Molalite",
            explanation: "i=1; m=0,372/1,86=0,200 mol/kg.",
          },
          {
            label: "Mol",
            explanation: "n=0,200×0,100=0,0200 mol.",
          },
          {
            label: "Kütle",
            explanation: "M=2,00/0,0200=100 g/mol.",
          },
        ],
        answer: "100 g/mol.",
        check: "100 g/mol×0,0200 mol=2,00 g.",
        pitfall: "100 g suyu 100 kg olarak kullanmak.",
      },
      {
        title: "Ozmotik basınçta hacim verilmiştir",
        prompt:
          "İdeal çözeltinin son molaritesi 0,100 mol/L, i=2 ve T=300 K. R=0,08206 L·atm/(mol·K). Ozmotik basınç?",
        strategy: "Verilen M değerini aynı birimlerde kullan.",
        steps: [
          {
            label: "Bağıntı",
            explanation: "π=iMRT; burada M son çözelti hacmine göredir.",
          },
          {
            label: "Çarpım",
            explanation: "π=2×0,100×0,08206×300.",
          },
          {
            label: "Sonuç",
            explanation:
              "π=4,9236 atm; bu basınçtır, sıvı yüksekliği değildir.",
          },
        ],
        answer: "Yaklaşık 4,92 atm.",
        check: "L ve mol birimleri sadeleşir, atm kalır.",
        pitfall: "Molaliteyi hacim dönüşümü olmadan M yerine geçirmek.",
      },
    ],
    recall: [
      {
        prompt: "Molalitenin paydası nedir?",
        answer:
          "Kilogram çözücü; toplam çözelti kütlesi veya litre çözelti değil.",
      },
      {
        prompt: "Donma alçalması nasıl işaretlenir?",
        answer: "Pozitif ΔTf=Tf°−Tf; son sıcaklık Tf°−ΔTf.",
      },
      {
        prompt: "Dipteki tuzun tamamı tanecik hesabına girer mi?",
        answer:
          "Yalnız gerçekten çözünmüş etkin türler girer; ayrı katı faz sayılmaz.",
      },
      {
        prompt: "Ozmotik dengede geçiş biter mi?",
        answer: "Net geçiş sıfır olabilir; iki yönlü moleküler geçiş sürer.",
      },
    ],
    items: [
      [
        "36 g glikoz (180 g/mol), 400 g suda tamamen çözünüyor. Molalite kaç mol/kg?",
        "0,50",
        ["0,20", "0,45", "2,0", "5,0"],
        "Önce mol ve kilogram çözücü.",
        "n=36/180=0,20 mol; m=0,20/0,400=0,50 mol/kg. Payda çözeltinin toplam kütlesi değildir.",
      ],
      [
        "Madde kaybı ve tepkime olmayan kapalı bir çözeltinin sıcaklığı artarken hacmi artıyor. Hangi derişim yorumu doğrudur?",
        "Molarite azalabilir; molalite sabit kalır",
        [
          "İkisi zorunlu aynı oranda artar",
          "Molalite hacimle ters değişir",
          "Çözünen molü zorunlu sıfırlanır",
          "Molarite yalnız çözücü kilogramıdır",
        ],
        "Hacim ve kütle paydalarını ayır.",
        "Mol ve çözücü kütlesi korunurken çözelti hacmi büyür: n/V azalır, n/kg çözücü değişmez. Bu sonuç verilen kayıpsız kapalı koşula bağlıdır.",
      ],
      [
        "0,20 mol moleküler madde 1,00 kg suda; 0,10 mol NaCl aynı miktar suda. NaCl ideal tam ayrışıyor. Koligatif etkin tanecik miktarları?",
        "İkisinde de 0,20 mol etkin tanecik",
        [
          "NaCl örneğinde kesin dört kat",
          "Moleküler örnekte sıfır",
          "NaCl örneğinde 0,10 mol",
          "Gram bilgisi olmadan hiçbir karşılaştırma yapılamaz",
        ],
        "NaCl için i=2.",
        "Moleküler örnekte 0,20×1; NaCl için 0,10×2=0,20 mol tanecik. Aynı çözücü miktarında ideal koligatif karşılaştırma eşittir.",
      ],
      [
        "İdeal seyreltik modelde MX₂ tam olarak M²⁺+2X⁻ ayrışıyor. Molalite 0,100; su için Kf=1,86 °C·kg/mol. Donma alçalmasının pozitif büyüklüğü?",
        "0,558 °C",
        ["−0,558 °C", "0,186 °C", "1,86 °C", "5,58 °C"],
        "Üç iyon ve pozitif fark tanımı.",
        "i=3 olduğundan ΔTf=3×1,86×0,100=0,558 °C. Saf su 0 °C ise son sıcaklık −0,558 °C olur; istenen pozitif alçalma farklıdır.",
      ],
      [
        "Ayrışmayan uçucu olmayan 2,00 g madde 0,100 kg suda ΔTf=0,372 °C oluşturuyor. İdeal modelde Kf=1,86 °C·kg/mol. Mol kütlesi?",
        "100 g/mol",
        ["10 g/mol", "20 g/mol", "50 g/mol", "200 g/mol"],
        "m'den n'ye, sonra g/n.",
        "m=0,372/1,86=0,200; n=0,200×0,100=0,0200 mol. M=2,00/0,0200=100 g/mol. Ayrışmama öncülü i=1 sağlar.",
      ],
      [
        "İdeal karışımda 10 mol uçucu çözücü ve 2 mol uçucu olmayan moleküler madde var. Aynı T'de saf çözücü buhar basıncı 60 mmHg. Denge için yeterli sıvı var. Basınç?",
        "50 mmHg",
        ["60 mmHg", "12 mmHg", "30 mmHg", "72 mmHg"],
        "Çözücünün sıvı mol kesri.",
        "Xçözücü=10/(10+2)=5/6; P=(5/6)×60=50 mmHg. Uçucu olmayan maddenin ayrı buhar katkısı bu modelde yoktur.",
      ],
      [
        "İdeal uçucu A–B sıvısında XA=0,25, XB=0,75; aynı T'de PA°=80 ve PB°=40 mmHg. Toplam buhar basıncı?",
        "50 mmHg",
        ["20 mmHg", "30 mmHg", "40 mmHg", "120 mmHg"],
        "İki kısmi basıncı topla.",
        "PA=0,25×80=20; PB=0,75×40=30 mmHg. Toplam 50 mmHg. Çözünen de uçucu olduğundan onun basıncı sıfır alınamaz.",
      ],
      [
        "İdeal seyreltik çözeltide son M=0,100 mol/L, i=2, T=300 K ve R=0,08206 L·atm/(mol·K). π kaç atm?",
        "4,9236",
        ["0,16412", "2,4618", "49,236", "300"],
        "π=iMRT.",
        "2×0,100×0,08206×300=4,9236 atm. Verilen son molarite kullanılır; bu basıncı doğrudan santimetre yüksekliğe eşitlemek için ek yoğunluk/yerçekimi gerekir.",
      ],
      [
        "Yalnız suyu geçiren zarın iki yanında aynı T ve başlangıçta eşit dış basınç var. Bir yanda saf su, öbüründe zardan geçmeyen çözünenli ideal çözelti. İlk net su akışı?",
        "Saf sudan çözeltiye",
        [
          "Çözeltiden saf suya",
          "İki yönde moleküler geçiş tamamen yasak",
          "Önce bütün çözünen zardan geçer",
          "Yalnız sıvıların rengi belirler",
        ],
        "Seçici geçirgenlik ve basınç koşulu.",
        "Eşit dış basınçta suyun kimyasal potansiyel farkı net akışı çözelti yönünde destekler. İki yönde moleküler geçiş mümkündür; net yön onların farkıdır.",
      ],
      [
        "0,10 mol NaCl suya konuyor; yalnız 0,06 molü çözünüyor, kalanı ayrı katı. Çözünmüş NaCl ideal tam ayrışıyor. Çözeltide bu kaynaktan etkin iyon molü?",
        "0,12 mol",
        ["0,20 mol", "0,06 mol", "0,04 mol", "0,32 mol"],
        "Önce çözünmüş kısmı seç.",
        "Çözünmüş 0,06 mol formül birimi iki iyon türü verir: 0,12 mol. Dipte kalan 0,04 mol katı koligatif çözelti taneciği olarak eklenmez.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 48 ve 51–53; OGM Çözelti Cepte PDF 14/22–25 ve Koligatif sunu 2–7/10–14/18–21; TYT 048 kopya kağıdı 1–7 ön bilgi köprüsüyle karşılaştırılmış özgün anlatım, şekil ve sorular. Seyreltik ideal yaklaşım koşulları açık; resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-cozunurluk",
    topic: "detail-422",
    title: "Çözünürlük: sınır, stok ve kristal",
    minutes: 58,
    objectives: [
      "Çözünürlük kapasitesi, çözünmüş miktar ve ayrı katı fazı ayır.",
      "Sıcaklık grafiğinden soğutma ve buharlaştırma bilançosu kur.",
      "Çözünme hızı ile denge miktarını ve gazın toplam/kısmi basıncını ayır.",
    ],
    sections: [
      {
        title: "Çözünürlük bir kapasite bilgisidir",
        paragraphs: [
          "Belirli sıcaklık, basınç ve çözücü için çözünürlük, doymuş sıvı fazın ne kadar madde barındırabileceğini belirtir. Sık kullanılan birim g çözünen/100 g çözücüdür. Bu değer herhangi bir kaba başlangıçta atılan toplam maddeyi veya çözelti hacmini kendiliğinden vermez.",
          "Önce birimin paydasını oku: 100 g su ile 100 mL su farklı verilerdir. Hacmi kütleye çevirmek için yoğunluk gerekir. Tablo yalnız bir sıcaklık ve belirli kristal biçimi içinse onu başka sıcaklığa, başka çözücüye veya hidrat türüne doğrudan aktarma. S=20 g/100 g su ise 250 g su kapasitesi 250×20/100=50 g'dır; önce bu kapasite hesaplanır.",
        ],
      },
      {
        title: "Doymamış ve doymuş sıvıyı tanı",
        paragraphs: [
          "Verilen koşulda çözünmüş madde miktarı kapasitenin altındaysa çözelti doymamıştır; uygun madde eklenirse bir miktar daha çözünebilir. Tam sınırdaki çözelti doymuştur. Doymuş olmak mutlaka gözle görülen bir katının var olmasını gerektirmez; kapasiteye tam ulaşılmış berrak sıvı da doymuş olabilir.",
          "Aynı çözücüde çözünürlük az olan maddeyle hazırlanan doymuş çözelti, başka maddenin doymamış çözeltisinden daha seyreltik olabilir. Derişik-seyreltik kıyasını doymuş-doymamış sınıflamasıyla eşitleme. Biri göreli derişimi, öbürü o madde ve koşulun sınırına uzaklığı anlatır.",
        ],
        table: {
          headers: [
            "100 g su; S=20 g",
            "Çözünmüş X",
            "Ayrı katı",
            "Sıvı durumu",
          ],
          rows: [
            ["Toplam 10 g X", "10 g", "0 g", "Doymamış"],
            ["Toplam 20 g X", "20 g", "0 g", "Doymuş"],
            ["Toplam 35 g X", "20 g", "15 g", "Doymuş"],
          ],
        },
      },
      {
        title: "Dipte kalan katı ikinci bir fazdır",
        paragraphs: [
          "Dengeye gelmiş ve tepkime vermeyen sistemde eklenen maddenin kapasiteyi aşan bölümü ayrı katı kalabilir. Sıvı faz kapasiteye kadar çözünmüş madde içerir; dipteki katıyı sıvının derişim payına katma. Bütün kap heterojenken süzülen sıvı homojen çözelti olabilir.",
          "Örneğin 100 g suyun sınırı 20 g ise toplam 35 g X konduğunda uygun dengede 20 g çözünmüş, 15 g ayrı katı vardır. Bu, 35 g çözünmüş aşırı doymuş sıvı demek değildir. Süzme ayrı katıyı tutabilir; sıvı içindeki çözünmüş iyonları sıradan süzgeçle aynı biçimde ayıramazsın.",
        ],
      },
      {
        title: "Aşırı doymuş faz nasıl farklıdır?",
        paragraphs: [
          "Aşırı doymuş sıvıda o sıcaklıktaki denge sınırından fazla madde gerçekten çözünmüş durumdadır. Bu, uygun hazırlama ve çekirdeklenmenin gecikmesiyle oluşabilen metastabil bir durumdur. Katı eklemek ve hemen dipte kalmasını görmek tek başına böyle bir fazın oluştuğunu göstermez.",
          "Çekirdek oluştuğunda fazlalık kristallenebilir ve sıvı denge sınırına yaklaşır. Bu süreçte sıcaklık, çözücü miktarı ve kristalin yapısı ayrıca önemlidir. Öğretim modeli önce dengeye ulaşmış, su içermeyen X kristali varsayar; metastabil gecikme ayrı bir koşul kartıdır.",
        ],
      },
      {
        title: "Sıcaklık eğrisini nokta nokta oku",
        paragraphs: [
          "Çözünürlük-sıcaklık grafiğinin her noktası seçilen sıcaklıkta aynı çözücü paydasına göre bir kapasite verir. Artan eğride ısıtma daha çok çözünmeye izin verebilir; azalan eğride ters sonuç görülebilir. Bütün katılar için aynı eğim veya doğrusal sıcaklık yasası yoktur.",
          "Ara değer gerekiyorsa grafik veya tabloda verilen yaklaşımı kullan. Modelde X için iki uç arasında doğrusal veri açıkça tanımlanır; çizilen çizgi gerçek bütün tuzların ölçümü değildir. Birimleri ve sıcaklık aralığını değiştirmeden çalışmak, grafiği yalnız şekline bakarak yorumlama hatasını önler.",
        ],
      },
      {
        title: "Soğutunca ne kadar kristal oluşur?",
        paragraphs: [
          "Önce başlangıçtaki çözünmüş miktarı ve su kütlesini belirle. Son sıcaklıktaki çözünürlükten yeni kapasiteyi hesapla. Başlangıçtaki madde yeni sınırı aşıyorsa ve kristallenme gerçekleşmişse fark ayrı katıya gider; aşmıyorsa zorunlu çökelti sonucu çıkmaz.",
          "Su buharlaşmıyor ve kristal susuzsa çözücü miktarı değişmez. Toplam solüt, çözünmüş ve kristal toplamına eşittir. Kristal su içeren hidrat olursa suyun da katı faza geçebileceğini ayrıca hesaplamak gerekir; böyle bilgi verilmeden sade modeli hidrata genişletme.",
        ],
      },
      {
        title: "Buharlaştırma ile su ekleme aynı işlem değil",
        paragraphs: [
          "Uçucu olmayan solüt korunarak su uzaklaştırılırsa kapasite, kalan su miktarına göre yeniden hesaplanır. Doymuş çözeltide su kaybı ayrı kristal oluşumuna yol açabilir. Su eklenince kapasite artabilir ve mevcut katının bir kısmı çözünebilir; fakat çözünen gram/100 g su sınırı aynı sıcaklıkta aynı kalır.",
          "Bu nedenle 'çözünürlük arttı' ile 'daha fazla gram çözünebildi' farklı ifadelerdir. Suyu iki katına çıkarmak aynı S değerinde toplam kapasiteyi iki katına çıkarır. Çözünmüş miktar, çözelti kütlesi ve toplam kap kütlesi için ayrı satır tut.",
        ],
      },
      {
        title: "Karıştırma denge sınırını mı değiştirir?",
        paragraphs: [
          "Toz hâline getirme ve karıştırma birçok deneyde çözünmeyi hızlandırır; katı-sıvı temasını veya yüzeye taşınmayı kolaylaştırır. Sıcaklık, faz ve çözücü aynıyken bu işlemler sırf kendi başlarına denge çözünürlüğünü artırmış sayılmaz. Hızın birimi ve kapasitenin birimi farklıdır.",
          "Bir deney henüz dengeye ulaşmamışsa karıştırılmış kapta belirli sürede daha çok çözünmüş madde bulunabilir. Bu gözlem son denge kapasitesinin farklı olduğunu kanıtlamaz. İki kabı kıyaslarken bekleme süresi, sıcaklık ve başlangıç yüzeyi gibi değişkenleri açık kontrol et.",
        ],
      },
      {
        title: "Gazda kısmi basıncı izle",
        paragraphs: [
          "Kimyasal tepkime vermeyen seyreltik bir gaz için sabit sıcaklıkta Henry yaklaşımı C=kH·Pgaz biçiminde verilebilir. Burada Pgaz ilgili gazın sıvı üstündeki kısmi basıncıdır. Toplam basıncı artırıp ilgili gazın kısmi basıncını değiştirmemek aynı sonucu doğurmayabilir.",
          "Gazın kimliği, sıcaklık ve çözücü kH değerine dahildir. Pek çok gazın suda çözünürlüğü ısınırken azalır; bu, her gaz ve her sıcaklıkta aynı doğrusal yasa değildir. CO₂ gibi suyla tepkime veren türlerde toplam çözünmüş karbon ile yalnız fiziksel çözünmüş gazı ayırmak gerekir.",
        ],
      },
      {
        title: "Dengeyi değiştiren kimyasal koşullar",
        paragraphs: [
          "Çözücü cinsi, iyonlar ve kimyasal tepkimeler çözünme dengesini değiştirebilir. Benzer etkileşimler yararlı bir ilk ipucudur, fakat her polar madde sınırsız çözünür veya her apolar madde suda tam sıfırdır demek değildir. Ortak iyon ve pH etkileri sonraki denge hesaplarına bağlanır.",
          "Problem sonunda iki kontrol yap: çözünen toplamı korunuyor mu ve sıvı faz verilen sınırı sağlıyor mu? Kaynakta bir isim yanında verilen kurmaca sayı, gerçek sıcaklık tablosu diye sunulmaz. Şekilde dipteki katı ve sıvı içindeki çözünmüş madde farklı işaretlerle gösterilir.",
        ],
      },
    ],
    examples: [
      {
        title: "Kapasite ile eklenen miktar",
        prompt:
          "X'in 20 °C çözünürlüğü 20 g/100 g sudur. 250 g suya 70 g X konuyor; tepkime yok, denge kuruluyor. Çözünmüş ve ayrı katı?",
        strategy: "Sınırı gerçek su kütlesine ölçekle.",
        steps: [
          {
            label: "Kapasite",
            explanation: "250×20/100=50 g çözünebilir.",
          },
          {
            label: "Stok",
            explanation: "70 g eklenenin 50 g'ı çözünür; 20 g ayrı katıdır.",
          },
          {
            label: "Kontrol",
            explanation: "Sıvı faz 250+50=300 g; bütün kap 320 g'dır.",
          },
        ],
        answer: "50 g çözünmüş, 20 g katı.",
        check: "50+20=70 g solüt korunur.",
        pitfall: "70 g'ın tamamını sıvının derişimine katmak.",
      },
      {
        title: "Soğutma ve süzüntü",
        prompt:
          "X için S80=40, S20=20 g/100 g su. 80 °C'de 150 g su+60 g X tamamen çözünmüş. Su kaybı yok; 20 °C'de susuz kristal dengesi kurulup katı süzülüyor. Son?",
        strategy: "Son kapasiteyi bul, sonra iki fazı tart.",
        steps: [
          {
            label: "Son kapasite",
            explanation: "150×20/100=30 g X sıvıda kalır.",
          },
          {
            label: "Kristal",
            explanation: "60−30=30 g susuz X ayrılır.",
          },
          {
            label: "Süzüntü",
            explanation: "150 g su+30 g çözünmüş X=180 g süzüntü.",
          },
        ],
        answer: "30 g kristal; 180 g süzüntü.",
        check: "30+180=210 g ilk kütle.",
        pitfall: "Soğutmayı su kaybı gibi hesaplamak.",
      },
      {
        title: "Aynı S, farklı su miktarı",
        prompt:
          "Sabit T'de S=30 g/100 g su. 200 g suyla doymuş sıvıdan yalnız 50 g su buharlaştırılıyor; solüt uçucu değil ve susuz kristallenme gerçekleşiyor. Ayrılan katı?",
        strategy: "Çözücü stoğunu azalt, çözünürlük sayısını koru.",
        steps: [
          {
            label: "İlk solüt",
            explanation: "200×30/100=60 g çözünmüş X var.",
          },
          {
            label: "Son kapasite",
            explanation: "Kalan 150 g su en çok 45 g X tutar.",
          },
          {
            label: "Fark",
            explanation: "60−45=15 g kristal ayrılır; S yine 30 g/100 g sudur.",
          },
        ],
        answer: "15 g kristal.",
        check: "Son sıvı 195 g ve katı 15 g; başlangıç 260−uçan 50=210 g.",
        pitfall: "Su azalınca S sayısının da zorunlu azalacağını sanmak.",
      },
      {
        title: "Toplam değil ilgili gazın basıncı",
        prompt:
          "T sabit ve gaz tepkimesiz. C=kH·Pgaz, kH=0,004 mol/(L·atm). Pgaz 0,20'den 0,40 atm'ye çıkıyor. Denge derişimleri?",
        strategy: "Aynı Henry sabitine iki kısmi basıncı uygula.",
        steps: [
          {
            label: "İlk",
            explanation: "C1=0,004×0,20=0,0008 mol/L.",
          },
          {
            label: "Son",
            explanation: "C2=0,004×0,40=0,0016 mol/L.",
          },
          {
            label: "Kıyas",
            explanation:
              "İlgili kısmi basınç iki katına çıktı; bu seçili modelde derişim iki kat.",
          },
        ],
        answer: "0,0008 ve 0,0016 mol/L.",
        check: "Sabit T ve aynı gaz/çözücü koşulu korunur.",
        pitfall: "İnert gazın toplam basıncını Pgaz yerine koymak.",
      },
    ],
    recall: [
      {
        prompt: "Doymuş olmak dipte katı gerektirir mi?",
        answer: "Hayır; kapasiteye tam ulaşmış berrak sıvı da doymuş olabilir.",
      },
      {
        prompt: "Dipte fazlalık, aşırı doymuş sıvı mı?",
        answer: "Hayır; denge sıvısı doymuş ve katı ayrı faz olabilir.",
      },
      {
        prompt: "Tozlaştırma hangi büyüklüğü etkileyebilir?",
        answer:
          "Çözünme hızını; aynı koşuldaki denge kapasitesini tek başına değil.",
      },
      {
        prompt: "Henry yasasında hangi basınç?",
        answer:
          "Sabit sıcaklıkta ilgili gazın kısmi basıncı; toplam basınç zorunlu aynı değildir.",
      },
    ],
    items: [
      [
        "20 °C'de S=20 g/100 g su. 250 g suya 70 g tepkimesiz X eklenip denge kuruluyor. Ayrı katı kütlesi?",
        "20 g",
        ["0 g", "50 g", "70 g", "250 g"],
        "Önce suya göre kapasite.",
        "Kapasite 250×20/100=50 g. Toplam 70 g'ın 50 g'ı çözünür ve 20 g ayrı katı kalır; sıvı faz doymuştur.",
      ],
      [
        "S=40 g/100 g su olan maddeden 100 g suyla doymuş çözelti hazırlanıyor; ayrı katı yok. Çözeltinin toplam kütlesi?",
        "140 g",
        ["40 g", "60 g", "100 g", "400 g"],
        "Çözücü ve çözünmüş solüt toplamı.",
        "100 g su 40 g solüt barındırır; homojen sıvının kütlesi 100+40=140 g. Çözünürlük paydasını 100 g çözelti sanma.",
      ],
      [
        "X'in S60=60 ve S20=20 g/100 g su. 60 °C'de 200 g suyla doymuş sıvı, su kaybetmeden 20 °C'ye soğutuluyor; susuz kristallenme tamamlanıyor. Kristal?",
        "80 g",
        ["20 g", "40 g", "60 g", "120 g"],
        "İlk ve son kapasite farkı.",
        "İlk 120 g solüt, son 40 g çözünmüş kapasite vardır. 120−40=80 g katı ayrılır. Hesapta su kütlesi 200 g kalır.",
      ],
      [
        "Sabit T'de S=20 g/100 g su. Kapta 100 g su ve toplam 30 g X var. Denge sonrası yalnız 50 g su uçuruluyor; kristaller susuz. Son ayrı katı?",
        "20 g",
        ["10 g", "15 g", "30 g", "50 g"],
        "Toplam solüt sabit, kalan su 50 g.",
        "Kalan 50 g su 10 g X çözebilir. Toplam 30 g solütten 30−10=20 g ayrı katıdır. İlk 10 g katı zaten vardı; yeni oluşanla toplam ayrı katıyı ayır.",
      ],
      [
        "Aynı T'de denge sınırı 30 g/100 g su. X sıvısında 100 g su içinde 40 g maddenin gerçekten çözünmüş kaldığı ve kristallenmenin geciktiği ölçülüyor. Durum?",
        "Metastabil aşırı doymuş sıvı",
        [
          "Kesin yalnız doymamış sıvı",
          "40 g eklenmesi her koşulda bu durumu garanti eder",
          "İçinde zorunlu 40 g ayrı katı vardır",
          "Çözünürlük sınırı zorunlu sıfırdır",
        ],
        "Gerçekten çözünmüş ve gecikmiş koşulunu kullan.",
        "Çözünmüş 40 g, o T'deki 30 g denge sınırını aşar. Verilen gecikmiş kristallenme metastabil aşırı doymuş fazı tarif eder; yalnız çok katı atılması aynı şey değildir.",
      ],
      [
        "Aynı X, aynı su ve T'de iki kap yeterince uzun bekleyip dengeye geliyor. Birinde katı toz, öbüründe iri parçalı; aynı kristal faz ve başka etki yok. En uygun sonuç?",
        "Çözünme hızları farklı olabilir; son çözünürlük aynıdır",
        [
          "Tozun S değeri zorunlu sonsuzdur",
          "İri katı hiçbir zaman çözünemez",
          "Karıştırma X'in mol kütlesini değiştirir",
          "Her iki kapta çözünmüş gram mutlaka sıfırdır",
        ],
        "Kinetik ve denge ayrımı.",
        "Yüzey farkı dengeye ulaşma süresini değiştirebilir. Aynı T/çözücü/kristal faz için verilen denge kapasitesi değişmez; başlangıç stoklarının uygunluğu ayrıca kontrol edilir.",
      ],
      [
        "T sabit, gaz tepkimesiz; Henry C=kP ve k=0,004 mol/(L·atm). İlgili gazın kısmi basıncı 0,40 atm. C?",
        "0,0016 mol/L",
        ["0,0008 mol/L", "0,004 mol/L", "0,10 mol/L", "100 mol/L"],
        "Aynı gazın kısmi basıncını çarp.",
        "C=0,004×0,40=0,0016 mol/L. Bu seçili Henry modelinin denge derişimidir; kimyasal tepkime veya değişen sıcaklık koşuluna otomatik taşınmaz.",
      ],
      [
        "Sabit T'de gaz-sıvı dengesi var. İnert gaz eklenirken çözünen gazın kısmi basıncı aynı tutuluyor; gaz tepkime vermiyor. Henry modelinde ne beklenir?",
        "İlgili gazın denge derişimi değişmez",
        [
          "Toplam basınç arttığı için kesin iki kat",
          "Bütün gaz zorunlu sıfırlanır",
          "Çözücü zorunlu katılaşır",
          "Yalnız inert gazın rengi belirler",
        ],
        "Toplam ve kısmi basınç aynı değil.",
        "C=kH·Pgaz'da sabit T ile kH ve ilgili Pgas korunmuştur. İnertin toplam basınca katkısı bu koşullarda denge derişimini değiştirmez.",
      ],
      [
        "X için verilen tabloda S20=40, S50=10 g/100 g su. Aynı su miktarında 20'den 50 °C'ye ısıtma, başlangıçta doymuş sıvı için hangi etkiyi yapabilir?",
        "Dengeye gelirse çözünmüş X'in bir kısmı kristallenebilir",
        [
          "Her katı ısınınca zorunlu daha çok çözünür",
          "S50 otomatik 40 olur",
          "Su kütlesi verilmeden zorunlu ikiye katlanır",
          "X'in atom numarası değişir",
        ],
        "Genel ezber yerine verilen eğri.",
        "Bu örnekte kapasite ısınırken azalır. Su kaybı ve farklı faz yoksa başlangıç solütü yeni sınırı aşabilir; kristallenme gerçekleşince fark katıya gider.",
      ],
      [
        "Sıcak durumda S=30 g/100 g su olan 260 g doymuş sıvı, S=10 olan sıcaklığa soğutuluyor. Su kaybı yok; susuz kristal dengesi tamam. Ayrılan X?",
        "40 g",
        ["10 g", "20 g", "30 g", "60 g"],
        "Önce 260 g çözeltinin su/solüt payı.",
        "130 g çözelti 100 g su+30 g X içerir. 260 g'da su 200 g, X 60 g; son kapasite 20 g'dır. 60−20=40 g kristal ayrılır.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 54–56; OGM Çözelti Cepte PDF 28–30 gerçek çözünürlük anlatımı/eğrileri ve TYT 048 kristallendirme ön bilgisiyle karşılaştırılmış özgün anlatım ve sorular. Modeldeki X verisi açık kurmacadır; resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-tepkimelerde-enerji",
    topic: "detail-423",
    title: "Tepkimelerde enerji: sistem ve çevre",
    minutes: 56,
    objectives: [
      "Isı, sıcaklık, iç enerji ve entalpiyi doğru sistem sınırıyla ayır.",
      "Kalorimetrede çözelti, kap ve tepkime enerjisini koru.",
      "Enerji işaretini hız ve kendiliğindenlikle karıştırmadan yorumla.",
    ],
    sections: [
      {
        title: "Önce sistemin sınırını çiz",
        paragraphs: [
          "Enerji hesabının sistemi tepkimeye giren maddeler, bir kap veya daha geniş bir düzenek olarak seçilebilir. Çevre, seçilen sınırın dışıdır. Aynı deneyde sistemden çıkan enerji çevreye girebilir; işaret değişimi olayın değil bakılan bölmenin değişmesinden kaynaklanır.",
          "Madde alışverişi olan açık, yalnız enerji alışverişi olabilen kapalı ve ikisinin de dışarıyla olmadığı ideal yalıtılmış sistemleri ayır. Kapağın bulunması tek başına ısı yalıtımı sağlamaz. Bir kalorimetre hesabında hangi kayıpların yok sayıldığını ilk satırda yaz.",
        ],
      },
      {
        title: "Isı depolanan bir madde değildir",
        paragraphs: [
          "Sıcaklık farkından dolayı sınırı geçen enerjiye ısı denir; q ile gösterilebilir. Sıcaklık, bu aktarımın yönünü belirlemeye yardım eden bir durum büyüklüğüdür. Aynı sıcaklıktaki büyük ve küçük örnekler aynı toplam iç enerjiye sahip olmak zorunda değildir.",
          "Taneciklerin hareket ve etkileşimleri iç enerjiye katkı verir. Bir maddenin 'içinde şu kadar ısı var' demek yerine, belirli süreçte şu kadar ısı aldığı veya verdiği söylenir. Sıcaklığın sayısal değeriyle joule cinsinden enerji doğrudan toplanmaz.",
        ],
      },
      {
        title: "Enerji korunurken iş de olabilir",
        paragraphs: [
          "Kimyadaki yaygın işaret sözleşmesinde ΔU=q+w yazılır; sisteme giren ısı ve sistem üzerinde yapılan iş pozitiftir. Sistem gazı genleşirken çevre üzerinde iş yaparsa w negatif olabilir. İç enerji değişimini yalnız q'ya eşitlemek bu iş katkısını kaçırır.",
          "Örneğin sistem 50 J ısı alıp çevre üzerinde 20 J iş yapıyorsa ΔU=50−20=30 J'dür. İşaret, enerjinin sistem sınırından hangi yönde geçtiğine dayanır. Mekanik, elektriksel veya başka iş yolları varsa sorunun verdiği koşula göre ayrıca hesaba katılır.",
        ],
        table: {
          headers: ["Terim", "Pozitif yön", "Örnek"],
          rows: [
            ["q", "Sisteme ısı girişi", "+50 J alım"],
            ["w", "Sistem üzerinde iş", "Sıkıştırmada giriş"],
            ["ΔU=q+w", "İç enerji artışı", "50−20=+30 J"],
          ],
        },
      },
      {
        title: "Entalpi ile iç enerji arasındaki köprü",
        paragraphs: [
          "Entalpi H=U+PV olarak tanımlanan bir hâl fonksiyonudur; iç enerjiyle aynı büyüklük değildir. ΔH, başlangıç ve son hâlin farkıdır. Uygun sabit basınçlı süreçte yalnız basınç-hacim işi varsa alınan/verilen ısı qP=ΔH olur.",
          "Sabit hacimde ve başka iş yokken qV=ΔU kullanılabilir. Birini ötekine koşulsuz çevirmek özellikle gazlı tepkimelerde hata doğurur. Sıcaklık, basınç, madde miktarı ve fazlar hâl bilgisinin parçalarıdır; bunlar aynı tutulmadan yalnız denklem adından tek bir enerji değeri çıkarılmaz.",
        ],
      },
      {
        title: "Ekzotermik ve endotermik hangi tarafa göre?",
        paragraphs: [
          "Sabit basınçlı uygun tepkimede sistem ısı veriyorsa ΔH negatif ve tepkime ekzotermiktir. Sistem ısı alıyorsa ΔH pozitif ve endotermiktir. Eşit büyüklükte karşı ısı, kayıp yoksa çevrenin hesabında ters işaretle görünür.",
          "Bir sıvının ısınması tepkimenin ısı aldığını değil, tepkime dışındaki bu sıvının enerji aldığını gösterebilir. Enerji oku önce tepkime sistemi ile ölçülen çevre arasına çizilmelidir. Saf maddenin aynı basınçtaki erime, buharlaşma ve süblimleşmesi ısı alır; tersleri donma, yoğuşma ve kırağılaşma ısı verir. Gaz atomundan elektron koparmak enerji gerektirir; uygun sulu HCl–NaOH nötrleşmesi ısı veren bir tepkime örneğidir. Bütün çözünmelerin aynı ısı işaretinde olduğu sonucu çıkarılmaz.",
        ],
      },
      {
        title: "Isı kapasitesi sıcaklık farkını enerjiye çevirir",
        paragraphs: [
          "Faz değişimi olmayan ve öz ısısı verilen örnekte q=mcΔT kullanılır. m kütle, c birim kütlenin sıcaklığını bir derece değiştirmek için gereken enerji, ΔT son eksi ilk sıcaklıktır. c, J/(g·K) verilirse m gram ve sıcaklık farkı Kelvin ile joule elde edilir.",
          "Sıcaklık farkının 1 K büyüklüğü 1 °C farka eşittir; fakat mutlak sıcaklık gereken gaz ve denge bağıntılarında Celsius sayısı kullanılamaz. Donma, kaynama veya tepkime boyunca c değişiyorsa tek sabit c formülünün kapsamı ayrıca kontrol edilir.",
        ],
      },
      {
        title: "Kalorimetre kabı da enerji alabilir",
        paragraphs: [
          "Çözelti ile kalorimetre kabı aynı ΔT kadar değişiyorsa kap için qkal=CkalΔT yazılır. Tepkimenin dışında ısınan toplam ortam hem mcΔT hem CkalΔT içerebilir. Kabı yok saymak, yalnız kap kapasitesi ihmal edilebilir diye verilmişse uygun yaklaşımdır. Örneğin Ckal=20 J/K ve ΔT=5 K için kap ayrıca 100 J alır; bu sayı çözelti enerjisine eklenir.",
          "Dışarıya ısı kaybı ve başka katkı yoksa qtepkime+qçözelti+qkal=0. Bu bir enerji bilançosudur. Ürün ve çözücü kütlesini aynı anda iki kez sayma; m'nin deneyde tanımlanan son karışım mı yoksa ayrı ısınan bir bölme mi olduğunu oku.",
        ],
      },
      {
        title: "Denklem miktarı ile gerçek deney miktarı",
        paragraphs: [
          "Bir denkleme yazılan ΔH, o denklemin katsayılarıyla tanımlanmış tepkime miktarına bağlıdır. Gerçek deney daha küçük ilerliyorsa enerji aynı oranda ölçeklenir. Bir mol reaktif ile bir mol tepkime ilerlemesinin sayısal olarak eşit olması katsayıya bağlıdır.",
          "Örneğin bir mol yakıt için −890 kJ verilmiş ve 0,50 mol yakıt aynı son hâle kadar tepkime vermişse enerji −445 kJ'dür. Isı 'açığa çıktı' sorusunda büyüklük 445 kJ diye de istenebilir; sistemin q işaretiyle salınan enerjinin pozitif büyüklüğünü ayır.",
        ],
      },
      {
        title: "Faz ve süreç yolunu doğru kullan",
        paragraphs: [
          "Aynı atomlardan oluşsalar da gaz su ile sıvı su aynı entalpi düzeyinde değildir. Ürünlerin fazı değişirse tepkime ısısı da değişebilir. Isınma, karışma ve hâl değişimi katkıları ölçülen toplam kalorimetre sinyaline eklenebilir; verilen model bunları ayrı tutmalı veya açıkça yok saymalıdır.",
          "Başlangıç ve son hâl aynı olduğunda entalpi farkı izlenen yola bağlı değildir. Buna karşılık geçiş sırasındaki sıcaklıklar, süre ve enerji aktarım yolu farklı olabilir. Enerji koordinatı grafiğinin yatay eksenini kendiliğinden geçen saniyeler olarak okuma; bu bir süreç konumu şemasıdır.",
        ],
      },
      {
        title: "Isı işareti bütün soruları yanıtlamaz",
        paragraphs: [
          "Ekzotermik olmak çok hızlı olmayı veya her koşulda kendiliğinden sürmeyi garanti etmez. Kinetik engel ve termodinamik elverişlilik ayrı konulardır. Sabit sıcaklık/basınçtaki daha genel değerlendirmede entropi ve ΔG=ΔH−TΔS ilişkisi de önem kazanır.",
          "Modelde ısınan kap için enerji okunu izleyip toplamın sıfır olduğunu denetle. Sonra aynı deney daha çok maddeyle yapılsaydı q'nun, fakat aynı koşuldaki molar değerin nasıl değişeceğini düşün. Bir termometre ölçümü tek başına bilinmeyen bütün tepkime yollarını veya kişisel güvenli deney koşulunu belirlemez.",
        ],
      },
    ],
    examples: [
      {
        title: "Kap ile çözelti birlikte ısınıyor",
        prompt:
          "Sabit basınçlı ideal kalorimetrede 100 g karışım, c=4,18 J/(g·K), Ckal=20 J/K ve ΔT=+5 K. Dış kayıp ve başka ısı yok. Tepkime ısısı?",
        strategy: "İki çevre katkısını ayrı bulup işareti tersle.",
        steps: [
          {
            label: "Çözelti",
            explanation: "qçözelti=100×4,18×5=2090 J.",
          },
          {
            label: "Kap",
            explanation: "qkal=20×5=100 J; çevre toplam 2190 J almıştır.",
          },
          {
            label: "Tepkime",
            explanation: "qtepkime=−2190 J; seçili tepkime ekzotermiktir.",
          },
        ],
        answer: "−2,190 kJ.",
        check: "−2190+2090+100=0 J.",
        pitfall: "Kap ısındığı için tepkimeye pozitif q yazmak.",
      },
      {
        title: "Daha az yakıt, aynı molar koşul",
        prompt:
          "Aynı başlangıç/son fazları için bir mol yakıtın tepkimesi ΔH=−890 kJ. Sabit dış basınçta, yalnız PV işi koşulunda 0,50 mol yakıt tamamen tepkime veriyor. Sistemin ısısı ve salınan büyüklük?",
        strategy: "Önce miktarla ölçekle, sonra işaret dilini açıkla.",
        steps: [
          {
            label: "Oran",
            explanation: "Deney miktarı verilen bir molün 0,50 katıdır.",
          },
          {
            label: "Sistem",
            explanation: "qP=0,50×(−890)=−445 kJ.",
          },
          {
            label: "Çevre",
            explanation:
              "Kayıp yoksa çevre 445 kJ alır; salınan enerji büyüklüğü 445 kJ'dür.",
          },
        ],
        answer: "Sistem: −445 kJ; salınan 445 kJ.",
        check: "Molar değer aynı koşulda −890 kJ/mol kalır.",
        pitfall: "Negatif işareti negatif madde miktarı sanmak.",
      },
      {
        title: "Genleşme işini unutma",
        prompt:
          "Kapalı sisteme 50 J ısı giriyor ve sistem çevre üzerinde 20 J iş yapıyor. Kimya sözleşmesinde ΔU=q+w. ΔU?",
        strategy: "İşi sistem üzerinde yapılıp yapılmadığına göre işaretle.",
        steps: [
          {
            label: "Isı",
            explanation: "Sisteme giriş q=+50 J.",
          },
          {
            label: "İş",
            explanation: "Sistem dışarı iş yaptığından w=−20 J.",
          },
          {
            label: "Toplam",
            explanation: "ΔU=50−20=+30 J.",
          },
        ],
        answer: "İç enerji 30 J artar.",
        check: "Giren 50 J'nin 20 J'si iş olarak dışarı çıktı.",
        pitfall: "Her iş terimini koşulsuz pozitif almak.",
      },
      {
        title: "Gaz su ile sıvı su aynı son hâl değildir",
        prompt:
          "Aynı T'de verilen oluşum değerleri H₂O(gaz)=−242 ve H₂O(sıvı)=−286 kJ/mol. Bir mol gaz suyun sıvıya dönüşmesinin ΔH'si?",
        strategy: "Son hâl eksi ilk hâl.",
        steps: [
          {
            label: "İlk",
            explanation: "Gaz hâlinin verilen referans değeri −242 kJ/mol.",
          },
          {
            label: "Son",
            explanation: "Sıvı hâlininki −286 kJ/mol.",
          },
          {
            label: "Fark",
            explanation: "ΔH=(−286)−(−242)=−44 kJ/mol; yoğuşma ısı verir.",
          },
        ],
        answer: "−44 kJ/mol.",
        check: "Ters buharlaşmanın değeri +44 kJ/mol olur.",
        pitfall: "Faz etiketini atıp iki sayıyı aynı madde diye eşitlemek.",
      },
    ],
    recall: [
      {
        prompt: "Isı ile sıcaklık aynı mı?",
        answer: "Isı enerji aktarımı; sıcaklık bir durum büyüklüğüdür.",
      },
      {
        prompt: "qP ne zaman ΔH?",
        answer:
          "Sabit basınç ve uygun yalnız PV iş koşulunda; başka iş/kayıp katkıları denetlenir.",
      },
      {
        prompt: "Kalorimetre toplamı nasıl korunur?",
        answer: "qtepkime+qçözelti+qkal=0, dış kayıp ve başka katkı yoksa.",
      },
      {
        prompt: "Ekzotermik olması hızlılık kanıtı mı?",
        answer:
          "Hayır; hız engeli ve termodinamik elverişlilik ayrı koşullardır.",
      },
    ],
    items: [
      [
        "Seçili tepkime sistemi çevreden 800 J ısı alıyor. Uygun sabit basınç ve yalnız PV işi koşulunda yorum?",
        "ΔH=+800 J; endotermik",
        [
          "ΔH=−800 J; ekzotermik",
          "Sistemde enerji kesin yok olur",
          "Sıcaklık zorunlu 800 °C olur",
          "Her iki yönde tepkime hızı zorunlu eşittir",
        ],
        "Enerjinin sistem sınırına girişini izle.",
        "Isı sisteme girdiği için qP pozitiftir; belirtilen koşulda ΔH=+800 J. Bu bilgi hız veya sıcaklığın sayısal değerini tek başına vermez.",
      ],
      [
        "Bir süreç sabit dış basınçta, yalnız PV işiyle gerçekleşiyor. Ölçülen qP=−5,0 kJ. Entalpi değişimi?",
        "−5,0 kJ",
        [
          "+5,0 kJ",
          "0 kJ",
          "−5,0 K",
          "Basınç verilmediği için hiçbir koşulda bulunamaz",
        ],
        "qP=ΔH koşulu kökte verilmiştir.",
        "Sabit basınç ve başka iş yokluğu, ölçülen ısıyı entalpi değişimine eşitler. Negatif değer sistemin ısı verdiğini anlatır; qV ile genel eşitlik kurulmadı.",
      ],
      [
        "200 g karışımın c'si 4,0 J/(g·K); ΔT=+3,0 K. Kap kapasitesi ve dış kayıp ihmal. Tepkimenin karışıma verdiği ısının büyüklüğü?",
        "2400 J",
        ["600 J", "800 J", "1200 J", "2400 K"],
        "m·c·ΔT ve istenen büyüklük.",
        "Karışım 200×4,0×3,0=2400 J alır. Tepkimenin q'su −2400 J, karışıma salınan enerjinin pozitif büyüklüğü 2400 J'dür.",
      ],
      [
        "100 g karışım, c=4 J/(g·K), Ckal=50 J/K ve ΔT=+4 K. Kayıp yok. qtepkime?",
        "−1800 J",
        ["+1800 J", "−1600 J", "−200 J", "0 J"],
        "Çözelti ve kabı birlikte say.",
        "Çözelti 1600 J, kap 200 J alır. Tepkime bunların toplamını verir: q=−1800 J. Kabı yok saymak verilen kapasiteyi kaybettirir.",
      ],
      [
        "Denklemde tanımlanan 1 mol tepkime ilerlemesi için ΔH=−100 kJ. Aynı hâllerde ilerleme 0,25 mol. Sistem qP?",
        "−25 kJ",
        ["+25 kJ", "−100 kJ", "−400 kJ", "0,25 K"],
        "Enerji ilerleme miktarıyla ölçeklenir.",
        "0,25×(−100)=−25 kJ. Katsayıyla tanımlanan tepkime molü verilmiştir; herhangi bir reaktifin rastgele molü diye alınmadı.",
      ],
      [
        "H=U+PV. Bir sistem için ΔU=+10 kJ ve Δ(PV)=+2 kJ veriliyor. ΔH?",
        "+12 kJ",
        ["+8 kJ", "−12 kJ", "+20 kJ", "ΔH her zaman ΔU'ya eşittir"],
        "İki hâl farkını topla.",
        "ΔH=ΔU+Δ(PV)=10+2=12 kJ. PV katkısı verildiği için iç enerji ile entalpiyi eşitlemek doğru değildir.",
      ],
      [
        "Gaz hâlindeki H₂'de H–H bağını iki ayrı gaz H atomuna ayırmak için enerji gerekiyor. Bu seçili bağ koparma süreci?",
        "Endotermiktir",
        [
          "Her zaman ekzotermiktir",
          "Atomları yok eder",
          "Kimyasal bağı kısaltıp aynı H₂'yi korur",
          "Çevreye kesin sıfır enerji gerektirir",
        ],
        "Aynı bağın kopması ve oluşmasını ayır.",
        "Verilen bağın gaz atomlarına koparılması enerji alır. Ters bağ oluşumu aynı koşullarda enerji verir; net tepkimede başka bağlar varsa toplam ayrıca hesaplanır.",
      ],
      [
        "Bir tepkime için yalnız ΔH>0 biliniyor. Hangisi bu bilgiyle tek başına kesin söylenemez?",
        "Her sıcaklıkta kendiliğinden gerçekleşemeyeceği",
        [
          "Seçili uygun sabit basınç koşulunda ısı aldığı",
          "Entalpi farkının pozitif olduğu",
          "Ters yönde aynı hâllerin farkının negatif olduğu",
          "Verilen miktar iki kat olursa aynı koşulda ΔH'nin iki kat olacağı",
        ],
        "Elverişlilik için entropi ve T de gerekir.",
        "ΔH pozitifliği tek başına ΔG işaretini belirlemez. Isı, miktar ve ters denklem hakkındaki diğer seçenekler verilen aynı hâl/uygun süreç koşulundaki entalpi kurallarıdır.",
      ],
      [
        "Aynı T'de verilen H₂O(gaz) ve H₂O(sıvı) oluşum değerleri sırasıyla −242 ve −286 kJ/mol. Bir mol yoğuşma ΔH'si?",
        "−44 kJ/mol",
        ["+44 kJ/mol", "−528 kJ/mol", "+528 kJ/mol", "0 kJ/mol"],
        "Son eksi ilk; fazı koru.",
        "Sıvı son hâl olduğundan −286−(−242)=−44 kJ/mol. Gaz ve sıvı atom bileşimi aynı olsa da entalpi düzeyleri aynı değildir.",
      ],
      [
        "İdeal kalorimetrede 100 g karışım, c=4,2 J/(g·K), ΔT=−2 K. Kap ve kayıp ihmal. Tepkime q'su?",
        "+840 J",
        ["−840 J", "+210 J", "−210 J", "+840 °C"],
        "Çevrenin soğuması negatif qçevre demektir.",
        "Karışım 100×4,2×(−2)=−840 J kaybeder. Diğer katkılar yoksa tepkime +840 J alır; bu seçili deney endotermiktir.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 57–60; OGM Isı/Entalpi Cepte PDF 10–11/14–16 ve Hess sunu 14–18 ile karşılaştırılmış özgün öğretim ve sorular. Sistem sınırı, q/ΔH ve modelin ihmal ettiği katkılar açık; resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-entalpi-bag-hess",
    topic: "detail-424",
    title: "Entalpi, bağ enerjileri ve Hess yasası",
    minutes: 64,
    objectives: [
      "Standart oluşum ve tepkime entalpisini faz/katsayı bilgisiyle hesapla.",
      "Bağ koparma ve oluşumunu gaz bağ enerjileriyle bir enerji bilançosunda birleştir.",
      "Hess kartlarını ters çevirip ölçekleyerek gerçek hedef denklemi elde et.",
    ],
    sections: [
      {
        title: "Bir denklem, belirli miktarda bir dönüşüm",
        paragraphs: [
          "Termokimyasal denklem hem hangi türlerin dönüştüğünü hem o dönüşüme eşlik eden entalpi farkını verir. C(grafit)+O₂(gaz)→CO₂(gaz) için −393,5 kJ yazıldığında katsayıların belirttiği bir mol karbonun dönüşümü esas alınır. Aynı koşulda iki kat dönüşüm iki kat enerji farkıdır.",
          "Her türün fazı ve verilen sıcaklık/basınç, başlangıç ile son hâlin parçasıdır. Enerji değeri bu hâller arasındaki farktır; tepkinin kaç saniye sürdüğü değildir. Önce hedef denklemi ve onun miktar ölçeğini yazmak, sonraki oluşum, bağ ve Hess yöntemlerinin ortak başlangıcıdır.",
        ],
      },
      {
        title: "Standart oluşum bir mol ürüne gider",
        paragraphs: [
          "Bir bileşiğin standart molar oluşum entalpisi, belirtilen sıcaklık ve standart referans hâllerindeki elementlerden bir mol bileşik oluşmasının entalpi farkıdır. H₂(gaz)+½O₂(gaz)→H₂O(sıvı) bu biçimdedir. Kesirli katsayı olabilir; ürünün bir mol olması tanımın merkezidir.",
          "Referans olarak seçilen element hâlinin oluşum değeri sıfır kabul edilir; bütün allotrop ve bütün fazlar otomatik sıfır değildir. Karbon için grafit referansına karşı elmasın değeri farklı olabilir. Sorudaki sıcaklık ve basınç konvansiyonunu koru; standart durum kavramı, her ölçümün yalnız tek bir sıcaklıkta yapılabildiği anlamına gelmez.",
        ],
        table: {
          headers: ["Verilen tür", "Örnek ΔfH (kJ/mol)"],
          rows: [
            ["C(grafit), O₂(gaz), H₂(gaz)", "Seçili referans hâlinde 0"],
            ["CO₂(gaz)", "−393,5"],
            ["H₂O(sıvı)", "Yaklaşık −285,8"],
            ["H₂O(gaz)", "Yaklaşık −241,8"],
          ],
        },
      },
      {
        title: "Oluşum tablosunu katsayılarla tart",
        paragraphs: [
          "Tepkime entalpisi ΣνΔfH(ürünler)−ΣνΔfH(girenler) bağıntısıyla bulunur. Katsayı ν, o türden kaç mol oluşup harcandığını taşır. Bir ürün iki molse tablodaki bir mol değerini ikiyle çarpmadan toplamak eksik enerji hesabıdır.",
          "Örneğin CH₄+2O₂→CO₂+2H₂O denkleminde CO₂'nin değeri bir, suyun değeri iki kez alınır. O₂ verilen referans hâlindeyse katkısı sıfırdır; bu, oksijenin tepkimeye katılmadığı anlamına gelmez. Önce ürün toplamını, sonra giren toplamını bulup fark almak işaret denetimini kolaylaştırır.",
        ],
      },
      {
        title: "Faz değişimi enerji farkına katkı verir",
        paragraphs: [
          "Su buharının sıvıya geçmesi aynı atom envanterinin daha düşük entalpi hâline gitmesidir. Verilen −242 ve −286 kJ/mol referanslarıyla yoğuşma farkı −44 kJ/mol olur. Tepkimenin ürün suyu sıvıysa gaz bağ hesabından sonra bu faz katkısı eklenmelidir.",
          "Hess toplamında H₂O(gaz) ile H₂O(sıvı) aynı satır diye sadeleşmez. Birini ötekine çevirmek için uygun faz değişimi denklemi gerekir. Böylece kimyasal dönüşüm ve faz dönüşümü aynı kap için tek bir enerji bilançosunda birleştirilebilir.",
        ],
      },
      {
        title: "Bağı koparmak alır, oluşturmak verir",
        paragraphs: [
          "Bir gaz molekülünün belirli kovalent bağını ayrı gaz atomlarına ayırmak enerji gerektirir. Aynı koşulda ters bağ oluşumu aynı büyüklükte enerji verir. H₂'de H–H bağı için verilen 436 kJ/mol, bir mol bu bağın gaz atomlarına ayrılmasıyla ilişkilidir.",
          "Bir tepkimede hem kopan hem oluşan bağlar vardır. Toplam ΔH'yi bulmak için önce koparma maliyetlerini topla, sonra oluşumda verilen enerjiyi çıkar: ΔH≈ΣD(kopan)−ΣD(oluşan). Bu, hesap için bir enerji yoludur; gerçek tepkimenin bütün bağları aynı anda serbest atomlara ayırdığı mekanizma iddiası değildir.",
        ],
      },
      {
        title: "Bağları Lewis yapısından say",
        paragraphs: [
          "H₂+Cl₂→2HCl örneğinde bir H–H ve bir Cl–Cl kopar, iki H–Cl oluşur. Verilen D değerleri 436; 242; 431 kJ/mol ise maliyet 678, geri verilen 862 ve fark −184 kJ'dür. Oluşan iki molekülü tek bağ gibi saymak sonucu değiştirir.",
          "Çok atomlu türlerde önce doğru yapıyı çiz; tek, çift ve üçlü bağların sayısını denetle. Ortalama bağ entalpileri molekül çevresine bağlı yaklaşık değerlerdir. Aynı atom çifti için her molekülde kesin aynı sayı veya bütün kısa bağlar için evrensel bir sıralama kullanmak yerine verilen tabloyu ve uygun fazı izle.",
        ],
      },
      {
        title: "Hess: farklı yol, aynı başlangıç ve son",
        paragraphs: [
          "Entalpi hâl fonksiyonu olduğundan aynı ilk ve son hâlleri bağlayan yolların toplam farkı aynıdır. Karbonun CO₂'ye doğrudan dönüşmesi veya önce CO oluşup sonra CO₂'ye gitmesi, bütün sistemin aynı son hâline ulaşıyorsa aynı toplamı verir. Ara tür CO sonunda kalmıyorsa toplam denklemden silinir.",
          "Birinci yol C+½O₂→CO, ikinci yol CO+½O₂→CO₂ ise toplam C+O₂→CO₂ olur. Tüm kap çiziminde ilk durumda tam O₂ bulunur; ilk adımın sonunda CO yanında kullanılmamış ½O₂ de vardır. Enerji diyagramı bu korunmuş atomları aynı sistem sınırında göstermelidir.",
        ],
      },
      {
        title: "Ters çevirirken işareti değiştir",
        paragraphs: [
          "Bir tepkimeyi tersine çevirmek başlangıç ve son hâli yer değiştirir. Hson−Hilk farkı bu yüzden işaret değiştirir. C+½O₂→CO için −110,5 kJ verilmişse CO→C+½O₂ için +110,5 kJ yazılır; sayı büyüklüğü aynı kalır.",
          "Hedefte bir türün ürün yerine giren olması gerekiyorsa ilgili kartı ters çevir. Yalnız enerji işaretini çevirip denklemi aynı bırakma. Ters işlemde fazları da aynen koru; CO gazını başka faza geçirmek ikinci, ayrı bir dönüşümdür.",
        ],
      },
      {
        title: "Katsayı çarpanı bütün kartı ölçekler",
        paragraphs: [
          "Denklemin her katsayısı r ile çarpılırsa aynı başlangıç-son dönüşümünün miktarı r kat olur; ΔH de r kat alınır. 2H₂+O₂→2H₂O(gaz) için −484 kJ verilirse yarım denklem H₂+½O₂→H₂O(gaz) için −242 kJ'dür.",
          "Hedefte bir mol ürün istenirken iki mollük denklemi değiştirmeden enerjiye molar adını vermek karışıklık doğurur. Önce hangi tepkime miktarının sorulduğunu açık tut. Ters çevirme ve ölçekleme birlikteyse negatif çarpan iki işlemi birden temsil edebilir.",
        ],
      },
      {
        title: "Topla, sadeleştir, hedefle karşılaştır",
        paragraphs: [
          "Hess çözümünde her türün net katsayısını bir hesap satırında tutabilirsin: giren negatif, ürün pozitif. Kartlar toplanınca karşı taraflarda eşit miktarda görünen aynı tür/faz iptal edilir. Bu, atomların yok edilmesi değil ara türün bir adımda oluşup ötekinde harcanmasıdır.",
          "Kartların enerji toplamı doğru olsa bile elde edilen denklem hedef değilse çözüm tamamlanmış olmaz. Atom sayısı, yük, faz ve miktar ölçeği denetlenir. Etkileşimde CO'nun net katsayısı sıfır olduğunda bile hedefteki C/O₂/CO₂ miktarları ayrıca karşılaştırılır; boş toplam yanlış başarı oluşturmaz.",
        ],
      },
      {
        title: "Enerji yolunu hız engeliyle karıştırma",
        paragraphs: [
          "Hess diyagramı ilk-son entalpi düzeylerini ve alternatif muhasebe yollarını gösterir. Aktifleşme enerjisi ise seçilen gerçek yolun engeliyle ilişkilidir. Bir katalizör bu engeli ve hızı değiştirebilirken aynı ilk-son hâlin ΔH değerini değiştirmez.",
          "Bir hesabı mümkünse iki yoldan denetle: oluşum verisi ile Hess toplamı aynı fazları kullanınca aynı sonuca yaklaşmalıdır. Bağ enerjisi yöntemi ortalama veri kullandığından daha yaklaşık olabilir. Sayısal farkın kaynağını faz, yuvarlama ve tablo kapsamından araştırmak ezber formül değiştirmekten daha sağlamdır.",
        ],
      },
    ],
    examples: [
      {
        title: "Katsayı ağırlıklı oluşum hesabı",
        prompt:
          "CH₄(gaz)+2O₂(gaz)→CO₂(gaz)+2H₂O(sıvı). Verilen ΔfH: CH₄: −75, CO₂: −394, H₂O(sıvı)−286 ve O₂: 0 kJ/mol. ΔH?",
        strategy: "Ürün ve giren toplamlarını ayrı kur.",
        steps: [
          {
            label: "Ürünler",
            explanation: "1×(−394)+2×(−286)=−966 kJ.",
          },
          {
            label: "Girenler",
            explanation: "1×(−75)+2×0=−75 kJ.",
          },
          {
            label: "Fark",
            explanation: "ΔH=−966−(−75)=−891 kJ; denklem ölçeğinde ısı verir.",
          },
        ],
        answer: "−891 kJ.",
        check: "Su sıvı olduğundan sıvı için verilen değer kullanıldı.",
        pitfall: "Suyun 2 katsayısını veya CH₄'ün negatif işaretini kaybetmek.",
      },
      {
        title: "İki gaz bağı, iki ürün bağı",
        prompt:
          "H₂(gaz)+Cl₂(gaz)→2HCl(gaz). Verilen D(H–H)=436, D(Cl–Cl)=242, D(H–Cl)=431 kJ/mol. Yaklaşık ΔH?",
        strategy: "Bağ sayısı ve kopma/oluşma yönünü birlikte kullan.",
        steps: [
          {
            label: "Kopan",
            explanation: "Bir H–H ve bir Cl–Cl için 436+242=678 kJ.",
          },
          {
            label: "Oluşan",
            explanation: "İki H–Cl için 2×431=862 kJ verilir.",
          },
          {
            label: "Net",
            explanation: "ΔH≈678−862=−184 kJ.",
          },
        ],
        answer: "Yaklaşık −184 kJ.",
        check:
          "Verilen bütün türler gaz; ortalama bağ yaklaşımı belirtilmiştir.",
        pitfall: "Oluşan bağ enerjisini de pozitif maliyet diye toplamak.",
      },
      {
        title: "CO ara türünü götür",
        prompt:
          "Aynı hâllerde C(grafit)+½O₂→CO için −110,5; CO+½O₂→CO₂ için −283,0 kJ. C+O₂→CO₂ hedefi?",
        strategy: "Türleri ve enerjileri aynı işlemlerle topla.",
        steps: [
          {
            label: "Türler",
            explanation:
              "CO ilk denklemin ürününde, ikincinin gireninde birer mol olduğundan iptal olur.",
          },
          {
            label: "Net",
            explanation: "O₂ katsayıları½+½=1; net C+O₂→CO₂.",
          },
          {
            label: "Enerji",
            explanation: "ΔH=−110,5−283,0=−393,5 kJ.",
          },
        ],
        answer: "−393,5 kJ.",
        check:
          "Bir C ve iki O atomu korunur; ara durumda artan½O₂ sistemdedir.",
        pitfall: "Ara CO'yu net üründe bırakmak veya farklı fazları silmek.",
      },
      {
        title: "Ters ve yarım birlikte",
        prompt:
          "2SO₂(gaz)+O₂(gaz)→2SO₃(gaz), ΔH=−198 kJ. SO₃(gaz)→SO₂(gaz)+½O₂(gaz) hedefinin ΔH'si?",
        strategy: "Önce yönü, sonra miktarı ayarla.",
        steps: [
          {
            label: "Ters",
            explanation: "2SO₃→2SO₂+O₂ için +198 kJ.",
          },
          {
            label: "Yarım",
            explanation: "Her katsayı ½ ile çarpılır; enerji de ½ olur.",
          },
          {
            label: "Hedef",
            explanation: "SO₃→SO₂+½O₂ için +99 kJ.",
          },
        ],
        answer: "+99 kJ.",
        check: "Hedef bir mol SO₃ ayrıştırır; ısı alan yöndür.",
        pitfall: "Katsayıları yarıya indirip enerjiye aynı −198 yazmak.",
      },
    ],
    recall: [
      {
        prompt: "Standart molar oluşumda ürün miktarı?",
        answer:
          "Referans elementlerinden bir mol bileşik; faz ve sıcaklık/basınç belirtilir.",
      },
      {
        prompt: "Bağ enerjisinde net işaret?",
        answer: "Kopan bağların maliyeti eksi oluşan bağların verdiği enerji.",
      },
      {
        prompt: "Denklemi r ile çarparsak?",
        answer:
          "Bütün katsayılar ve ΔH aynı r ile çarpılır; ters yönde işaret döner.",
      },
      {
        prompt: "Hess'te aynı formüllü farklı faz silinir mi?",
        answer: "Hayır; faz değişimi için ayrı enerji denklemi gerekir.",
      },
    ],
    items: [
      [
        "CO₂(gaz) için standart molar oluşumu tanımlayan denklem hangisidir? Referans karbon grafittir.",
        "C(grafit)+O₂(gaz)→CO₂(gaz)",
        [
          "CO(gaz)+½O₂(gaz)→CO₂(gaz)",
          "2C(grafit)+2O₂(gaz)→2CO₂(gaz)",
          "CO₂(gaz)→C(grafit)+O₂(gaz)",
          "C(elmas)+O₂(gaz)→CO₂(gaz); elmasın referans olduğu verilmedi",
        ],
        "Referans elementler ve bir mol ürün.",
        "Doğru denklem referans elementlerinden bir mol CO₂ oluşturur. CO bileşiktir; iki mol oluşum molar tanımın ölçeği değildir; ters denklem ayrışmadır.",
      ],
      [
        "Seçili standart referans hâlleri C(grafit), H₂(gaz), O₂(gaz) ve S₈(rombik katı). Hangi türün ΔfH değeri yalnız bu referans seçimiyle zorunlu 0 alınmaz?",
        "C(elmas)",
        ["C(grafit)", "H₂(gaz)", "O₂(gaz)", "S₈(rombik katı)"],
        "Allotropları aynı hâl sayma.",
        "Grafit referansının sıfır olması elmasın da sıfır olduğunu söylemez. Farklı allotrop farklı entalpi düzeyidir; diğer seçenekler açık seçilmiş referans hâlleridir.",
      ],
      [
        "CH₄+2O₂→CO₂+2H₂O(sıvı). ΔfH değerleri sırasıyla CH₄: −75, O₂: 0, CO₂: −394, H₂O: −286 kJ/mol. Denklem ΔH'si?",
        "−891 kJ",
        ["+891 kJ", "−966 kJ", "−1041 kJ", "−319 kJ"],
        "Ürünler eksi girenler; suyu iki kez say.",
        "Ürün toplamı −394−572=−966; giren −75'tir. −966−(−75)=−891 kJ. Faz ve verilen katsayılarla hesaplanır.",
      ],
      [
        "2H₂(gaz)+O₂(gaz)→2H₂O(gaz) için ΔH=−484 kJ. Aynı yönde yarım denklem için değer?",
        "−242 kJ",
        ["+242 kJ", "−968 kJ", "+484 kJ", "−484 kJ"],
        "Her katsayı ve enerji aynı çarpanı alır.",
        "Yarım denklem bir mol su oluşturur; ΔH de ½×(−484)=−242 kJ olur. Yön değişmediği için işaret ters çevrilmez.",
      ],
      [
        "C(grafit)+½O₂(gaz)→CO(gaz) için −110,5 kJ verilmiş. Aynı hâllerle ters denklemin ΔH'si?",
        "+110,5 kJ",
        ["−110,5 kJ", "+221 kJ", "−55,25 kJ", "0 kJ"],
        "Son ve ilk hâlin yerini değiştir.",
        "Ters dönüşümün entalpi farkı ilk farkın negatifidir: +110,5 kJ. Miktar ölçeği aynı bırakılmıştır.",
      ],
      [
        "H₂+Cl₂→2HCl, tümü gaz. Verilen bağ enerjileri H–H: 436, Cl–Cl: 242, H–Cl: 431 kJ/mol. Yaklaşık ΔH?",
        "−184 kJ",
        ["+184 kJ", "+678 kJ", "−862 kJ", "+1540 kJ"],
        "Kopan toplam eksi oluşan toplam.",
        "436+242−2×431=678−862=−184 kJ. İki HCl bağı oluşur; yalnız birini saymak doğru değildir.",
      ],
      [
        "CH₄(gaz)+2O₂(gaz)→CO₂(gaz)+2H₂O(gaz) için yaklaşık ΔH=−802 kJ. D(O=O)=498, D(C=O)=799, D(O–H)=463 kJ/mol. Bu ortalama modelde D(C–H)?",
        "413 kJ/mol",
        ["206,5 kJ/mol", "498 kJ/mol", "799 kJ/mol", "1652 kJ/mol"],
        "Dört C–H kopar; iki C=O ve dört O–H oluşur.",
        "4D+2×498−(2×799+4×463)=−802. 4D−2454=−802,4D=1652 ve D=413 kJ/mol. Gaz fazı ve ortalama enerji öncülleri kullanıldı.",
      ],
      [
        "Hess toplamında bir kartta H₂O(gaz) ürün, diğerinde eşit mol H₂O(sıvı) giren var. Hedefte su yok. Ne gerekir?",
        "Uygun faz değişimi denklemi ve enerjisi eklenmelidir",
        [
          "Formül aynı olduğundan doğrudan silinir",
          "Fazların entalpileri her sıcaklıkta aynıdır",
          "Su atomları korunmadan yok edilir",
          "Yalnız katalizör eklemek faz farkını sıfırlar",
        ],
        "Aynı formül aynı hâl demek değil.",
        "Hess sadeleştirmesi aynı tür ve faz için yapılır. Gaz-sıvı farkını kapatmak için ilgili yoğuşma/buharlaşma denklemi gerekir; enerji farkı da toplamda yer alır.",
      ],
      [
        "Aynı ilk ve son hâller için iki farklı tepkime yolu ve bir katalizörlü yol düşünülüyor. ΔH hakkında uygun sonuç?",
        "İlk-son hâl aynıysa ΔH yol ve katalizörden bağımsızdır",
        [
          "En hızlı yolun ΔH'si zorunlu en büyüktür",
          "Katalizör ürünlerin atom sayısını azaltır",
          "Her ara basamağın ΔH'si toplamla eşittir",
          "ΔH yalnız geçen saniyedir",
        ],
        "Hâl fonksiyonu ile engeli ayır.",
        "Entalpi farkı ilk ve son hâle bağlıdır. Yol değişince süre/engel değişebilir; aynı son hâl koşulunda toplam fark değişmez.",
      ],
      [
        "Aynı fazlarda C+½O₂→CO, −110,5; CO+½O₂→CO₂, −283,0 kJ. Hedef 2C+2O₂→2CO₂ için ΔH?",
        "−787,0 kJ",
        ["−393,5 kJ", "+393,5 kJ", "−566,0 kJ", "−221,0 kJ"],
        "İki kartı birer toplayıp bütünü ikiyle çarp.",
        "Bir mol CO₂ için −110,5−283,0=−393,5 kJ. Hedefin bütün katsayıları iki kat olduğundan ΔH=−787,0 kJ olur.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 59–62; OGM Isı/Entalpi Cepte PDF 14–16/19/22–23 ve Hess sunu PDF 2–7/14–19 gerçek öğretim/şekilleriyle karşılaştırılmış özgün anlatım ve alıştırmalar. Faz, katsayı ve enerji referansı açık; resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-tepkime-hizi",
    topic: "detail-425",
    title: "Tepkime hızı: ölçümden hız yasasına",
    minutes: 66,
    objectives: [
      "Tür hızlarını normalize tepkime hızına bağla.",
      "Sekant ile teğeti ve deney tablosundan mertebeyi belirle.",
      "Çarpışma, mekanizma, sıcaklık ve katalizör etkilerini ayır.",
    ],
    sections: [
      {
        title: "Ne kadar dönüşüm, ne kadar zaman?",
        paragraphs: [
          "Bir tepkimenin hızı, seçilen zaman aralığında madde miktarının ne kadar değiştiğini anlatır. Sabit hacimde derişim değişimi kullanıldığında birim mol/(L·s), yani M/s olabilir. Ürünün oluşmasıyla girenin harcanması aynı dönüşümün iki ayrı gözlemidir.",
          "Örneğin bir türün derişimi 4 saniyede 0,80'den 0,20 M'ye düşerse imzalı değişim −0,60 M'dir. Harcanma hızının pozitif büyüklüğü 0,60/4=0,15 M/s olur. Hangi türün hızını istediğini ve zaman birimini ilk satırda belirtmek doğru işaretin başlangıcıdır.",
        ],
      },
      {
        title: "Katsayılar tür hızlarını bağlar",
        paragraphs: [
          "N₂+3H₂→2NH₃ tepkimesinde bir mol azot harcanırken üç mol hidrojen harcanır ve iki mol amonyak oluşur. Aynı deneyde tür hızları 1:3:2 oranındadır. Ortak tepkime hızı r=−d[N₂]/dt=−(1/3)d[H₂]/dt=(1/2)d[NH₃]/dt yazılabilir.",
          "Denklemden gelen bu oran, hız yasasındaki derişim üsleriyle aynı konu değildir. Azotun harcanması 0,020 M/s verilirse hidrojen 0,060 ve amonyak 0,040 M/s olur. Sabit hacim ve yalnız seçilen tepkime varsayımı, derişim türevlerini bu biçimde bağlamak için önemlidir.",
        ],
      },
      {
        title: "Ortalama hız sekant, anlık hız teğettir",
        paragraphs: [
          "Derişim-zaman grafiğinde iki nokta arasındaki sekant eğimi belirli aralığın ortalama değişimini verir. Tek bir andaki eğriye çizilen teğet ise anlık türeve karşılık gelir. Hız değişiyorsa farklı zaman aralıklarının ortalamaları aynı olmak zorunda değildir.",
          "Azalan giren eğrisinin türevi negatiftir; pozitif harcanma hızı onun ters işaretidir. Artan ürün eğrisinde türev pozitiftir ve normalize r için katsayıya bölünür. Negatif eğim, fiziksel olarak eksi sayıda çarpışma olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Tepkimede hangi ölçüm değişir?",
        paragraphs: [
          "Renk, gaz basıncı, gaz hacmi, iletkenlik veya çökelti miktarı ilerlemeyi izlemek için kullanılabilir. Seçilen sinyalin hangi türe bağlı olduğu ve diğer değişkenlerin sabit tutulması gerekir. Klor tüketilen bir deneyde rengin azalması uygun kalibrasyonla ilerlemeyi gösterebilir.",
          "Gaz mol toplamı değişiyorsa sabit T, V'de toplam basınç değişimi yararlı olabilir. Gaz mol toplamı iki tarafta eşitse aynı yöntem ideal kapta ilerlemeyi göstermeyebilir; bu tepkime durdu demek değildir. Sabit P, T'deki gaz hacmi yöntemi başka kap koşuludur.",
        ],
      },
      {
        title: "Çarpışma sayısı tek başına yetmez",
        paragraphs: [
          "Çarpışma modelinde tanecikler karşılaşmalı, uygun yönelimle etkileşmeli ve seçilen yolun enerji engelini aşabilecek koşula sahip olmalıdır. Her çarpışma ürün oluşturmaz. Etkin çarpışmaların artması uygun deneyde hız artışını açıklayabilir.",
          "Tepkime boyunca yüksek enerjili geçiş düzeni aktifleşmiş kompleks olarak betimlenebilir. Bu geçiş durumu, bir süre var olup sonraki adımda harcanan ara ürünle aynı kavram değildir. Enerji profili tek yolun şemasıdır; atomların bütün hareketlerinin filmi sayılmaz.",
        ],
      },
      {
        title: "İleri ve geri engellerin farkı",
        paragraphs: [
          "Aynı geçiş durumu için ileri engel tepe eksi giren, geri engel tepe eksi ürün düzeyidir. Bu nedenle ΔH=Ea, ileri−Ea, geri olur. İleri 60 ve geri 90 kJ/mol ise ürünler 30 kJ/mol daha düşük düzeydedir; ΔH=−30 kJ/mol bulunur.",
          "Yüksek tepe, ilk-son farkının büyük olması demek değildir. Engel ile toplam farkı ayrı oklarla göster. Uygun aynı yol ve karşılaştırılabilir ön çarpan koşulunda düşük engel daha hızlı yol sağlayabilir; bütün farklı tepkimeleri yalnız Ea sayısıyla koşulsuz sıralama.",
        ],
      },
      {
        title: "Deney tablosundan üsleri bul",
        paragraphs: [
          "r=k[A]ᵃ[B]ᵇ gibi bir bağıntıda a ve b uygun deneylerden bulunur. B sabitken A iki kat ve hız dört kat oluyorsa a=2 sonucu çıkar. A sabitken B iki kat ve hız iki kat oluyorsa b=1 olur; birlikte r=k[A]²[B] yazılır.",
          "Bir satır bu yasaya yerleştirilip k bulunur; sonra öteki satırların da aynı değeri verip vermediği kontrol edilir. Böylece tek ölçüme uyan keyfi bir formül değil, kontrollü değişimlerle desteklenen model kurulur. Başlangıç hızlarını farklı ilerleme anlarının ortalaması gibi kullanma.",
        ],
        table: {
          headers: ["Deney", "[A] M", "[B] M", "r M/s"],
          rows: [
            ["1", "0,10", "0,10", "0,002"],
            ["2", "0,20", "0,10", "0,008"],
            ["3", "0,10", "0,20", "0,004"],
          ],
        },
      },
      {
        title: "Mertebe ve k birimi",
        paragraphs: [
          "Derişim üslerinin toplamı tepkimenin toplam mertebesidir. r=k[A]²[B] için mertebe üçtür. r M/s birimliyse k'nın birimi M⁻²·s⁻¹, yani L²/(mol²·s) olur. Birim denetimi yanlış üs veya yanlış yoğunluk kullanımını yakalar.",
          "Sıfırıncı, birinci ve ikinci mertebeler için k birimleri M/s, 1/s ve L/(mol·s) olur. Mertebe, toplam denklemde kaç molekül yazıldığının adı değildir. Deneysel üsler modelin sıcaklık ve derişim aralığına aittir; farklı mekanizma aralığı aynı yasa olmak zorunda değildir.",
        ],
      },
      {
        title: "Net denklem ile elementer adım",
        paragraphs: [
          "Bir elementer adımın molekülerliği o tek olayda etkileşen tanecik sayısıdır. Açıkça elementer olduğu verilen basit adımın hız yasası giren katsayılarıyla kurulabilir. Çok basamaklı tepkimenin net katsayıları ise genel olarak deneysel hız üslerini vermez.",
          "Yavaş H₂+ICl→HI+HCl, hızlı HI+ICl→I₂+HCl adımları toplamda H₂+2ICl→I₂+2HCl verir. Verilen yavaş başlangıç adımının basit modelinde r=k[H₂][ICl]; net ICl katsayısı iki olsa da üs bir olabilir. HI bir adımda oluşup sonra harcanan ara üründür.",
        ],
      },
      {
        title: "Sıcaklık hangi niceliği değiştirir?",
        paragraphs: [
          "Sıcaklık yükseldiğinde tanecik enerji dağılımı değişir; uygun pozitif engelli aynı yol için engeli aşabilecek pay büyüyebilir. Hız sabiti k bu koşula bağlıdır. Grafikte T artışını dağılımı değiştiren, katalizörü alternatif yolun engelini değiştiren iki ayrı müdahale olarak düşün.",
          "Sabit T'de yalnız başlangıç derişimini değiştirmek seçili yasadaki k'yı değiştirmeden r'yi değiştirebilir. Sıcaklık değişiminde ise k genellikle aynı kalmaz. Açık verilen mekanizma/sıcaklık aralığının dışına her tepkime mutlaka aynı miktarda hızlanır diye genelleme yapılmaz.",
        ],
      },
      {
        title: "Katalizör ve katı yüzeyi",
        paragraphs: [
          "Katalizör uygun alternatif yol sağlayıp dönüşüm hızını artırabilir; çevrim içinde değişip sonunda geri kazanılır. Aynı ilk-son hâlin ΔH'sini ve aynı T'deki denge sabitini değiştirmez. Daha erken ürün elde etmek ile denge verimini artırmak farklı sonuçlardır.",
          "Tepkimede yer alan türlerin aynı fazda bulunduğu süreç homojen; birden çok faz içeren süreç heterojen diye adlandırılır. Heterojen tepkimede toz katı daha çok yüzey sağlayabilir ve gözlenen hız artabilir. Yalnız gram artırmak yüzey artırmakla aynı müdahale değildir. Yüzeye göre tanımlanan içsel k ile toplam yüzeyin içine alındığı görünür katsayıyı ayır; her etkiyi açıklamasız k'ya yükleme.",
        ],
      },
      {
        title: "Veriyi okuyup modelini sınayarak kullan",
        paragraphs: [
          "Sırayla tür ve birimi seç, zaman aralığını oku, katsayı normalizasyonunu yap ve deney yasasını gerekiyorsa ayrı bul. Anlık değere geçiyorsan teğeti, iki ölçüm arasına geçiyorsan sekantı kullan. Kütle veya gaz hacminde mol/derişim dönüşümünün kap koşullarını belirt.",
          "Basit tükenen reaktif modelinde hız zamanla azalabilir; başlangıcın her mekanizmada en hızlı an olduğu evrensel kural değildir. Etkileşim yalnız verilen deney yasasını kullanır. A veya B'yi tek tek değiştirerek hangi üs iddianın veriye uyduğunu gerekçenle sınayabilirsin.",
        ],
      },
    ],
    examples: [
      {
        title: "Bir hızdan öteki türlere",
        prompt:
          "Sabit hacimde N₂+3H₂→2NH₃ için azot harcanma hızı 0,020 M/s. Hidrojen ve amonyak hızları?",
        strategy: "Ortak ilerlemeyi 1:3:2 katsayılarıyla ölçekle.",
        steps: [
          {
            label: "Ortak r",
            explanation: "N₂ katsayısı 1; r=0,020 M/s.",
          },
          {
            label: "Hidrojen",
            explanation: "Harcanma 3r=0,060 M/s.",
          },
          {
            label: "Amonyak",
            explanation: "Oluşma 2r=0,040 M/s.",
          },
        ],
        answer: "H₂ 0,060; NH₃ 0,040 M/s.",
        check: "0,060/3=0,040/2=0,020.",
        pitfall: "Bütün tür hızlarını aynı saymak.",
      },
      {
        title: "Sekant ve katsayı",
        prompt:
          "Sabit hacimde 2A→B. [A], 4 saniyede 0,80'den 0,20 M'ye düşüyor. A harcanma hızı ve ortak ortalama r?",
        strategy: "Önce imzalı fark, sonra pozitif büyüklük ve normalizasyon.",
        steps: [
          {
            label: "Fark",
            explanation: "Δ[A]=0,20−0,80=−0,60 M.",
          },
          {
            label: "Harcanma",
            explanation: "−Δ[A]/Δt=0,60/4=0,15 M/s.",
          },
          {
            label: "Normalize",
            explanation: "r=(1/2)×0,15=0,075 M/s; B oluşma hızı da budur.",
          },
        ],
        answer: "0,15 ve 0,075 M/s.",
        check: "Bu ortalamadır; tek anın teğeti verilmedi.",
        pitfall: "A'nın 2 katsayısını hız yasası üssü sanmak.",
      },
      {
        title: "Üç kontrollü deney",
        prompt:
          "Başlangıç deneyleri (A M, B M, r M/s): 1=(0,10; 0,10; 0,002), 2=(0,20; 0,10; 0,008), 3=(0,10; 0,20; 0,004). r=k[A]ᵃ[B]ᵇ modelinde a, b, k?",
        strategy:
          "Bir defada yalnız bir derişimi değiştiren satırları kıyasla.",
        steps: [
          {
            label: "A üssü",
            explanation: "1→2: A iki kat, B sabit; hız dört kat. 2ᵃ=4 → a=2.",
          },
          {
            label: "B üssü",
            explanation: "1→3: B iki kat, A sabit; hız iki kat. 2ᵇ=2 → b=1.",
          },
          {
            label: "k",
            explanation: "k=0,002/(0,10²×0,10)=2 L²/(mol²·s).",
          },
        ],
        answer: "a=2, b=1; k=2 L²/(mol²·s).",
        check: "İkinci satır 2×0,20²×0,10=0,008 verir.",
        pitfall: "Net denklemden verilmeyen üsleri almak.",
      },
      {
        title: "Aynı uçlar, daha alçak tepe",
        prompt:
          "Molar enerji düzeyleri: giren 20, ürün −10; ilk yolun tepesi 80, alternatif tepe 50 kJ/mol. Engeller ve ΔH?",
        strategy: "Her engeli kendi başlangıç düzeyinden çıkar.",
        steps: [
          {
            label: "İlk yol",
            explanation: "İleri 80−20=60; geri 80−(−10)=90 kJ/mol.",
          },
          {
            label: "Alternatif",
            explanation: "Yeni engeller 50−20=30 ve 50−(−10)=60 kJ/mol.",
          },
          {
            label: "Uç farkı",
            explanation:
              "ΔH=−10−20=−30 kJ/mol iki yolda da aynı; engeller 30'ar azalır.",
          },
        ],
        answer: "60/90→30/60; ΔH −30 kJ/mol.",
        check: "İleri eksi geri her yolda −30 verir.",
        pitfall: "Engeller aynı yüzde değişmek zorunda sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Tür hızı ile normalize r aynı mı?",
        answer:
          "Katsayı 1 değilse farklı olabilir; stokiyometrik katsayıya bölünür.",
      },
      {
        prompt: "Net denklemden her hız üssü bulunur mu?",
        answer: "Hayır; deneysel yasa veya açık elementer adım gerekir.",
      },
      {
        prompt: "Anlık hız grafikten nasıl okunur?",
        answer: "İlgili anda teğet eğimi; ortalamada iki noktanın sekantı.",
      },
      {
        prompt: "Katalizör hangi farkı korur?",
        answer: "Aynı ilk-son hâlin ΔH'sini ve aynı T'deki denge sabitini.",
      },
    ],
    items: [
      [
        "Sabit hacimde N₂+3H₂→2NH₃ için N₂ harcanma hızı 0,020 M/s. NH₃ oluşma hızı?",
        "0,040 M/s",
        ["0,010 M/s", "0,020 M/s", "0,060 M/s", "0,120 M/s"],
        "Ürün katsayısı 2.",
        "Bir azot dönüşümüne iki amonyak oluşur: 2×0,020=0,040 M/s. Ortak r ile türe ait oluşma hızı aynı kavram değildir.",
      ],
      [
        "Sabit hacimde 2A→B. [A], 4 saniyede 0,80'den 0,20 M'ye düşüyor. Normalize ortalama tepkime hızı?",
        "0,075 M/s",
        ["−0,150 M/s", "0,150 M/s", "0,300 M/s", "0,600 M/s"],
        "Harcanma farkını zamana ve katsayıya böl.",
        "−Δ[A]/Δt=0,60/4=0,15 M/s. A katsayısı 2 olduğundan r=0,15/2=0,075 M/s.",
      ],
      [
        "Sabit hacimde A→2B için bir anda B eğrisinin teğet eğimi +0,080 M/s. Ortak anlık r?",
        "0,040 M/s",
        ["0,080 M/s", "−0,080 M/s", "0,160 M/s", "0,020 M/s"],
        "Ürün türevini 2'ye böl.",
        "r=(1/2)d[B]/dt=0,080/2=0,040 M/s. Teğet bilgisi anlıktır; rastgele bir zaman aralığının ortalaması yapılmadı.",
      ],
      [
        "İdeal kapta H₂+Cl₂→2HCl, tümü gaz; T, V sabit, başka gaz yok. Toplam basıncın değişmemesi nasıl açıklanır?",
        "Gaz mol toplamı aynı kaldığından bu sinyal hızı tek başına izlemeyebilir",
        [
          "Tepkime kesin durmuştur",
          "Hiç HCl oluşamaz",
          "Bütün tür derişimleri zorunlu sabittir",
          "Klorun rengi zorunlu hiç değişmez",
        ],
        "Gaz katsayı toplamlarını say.",
        "Giren ve ürün gaz katsayı toplamları 2'dir. Sabit T, V'de toplam basınç aynı kalabilir; tür bileşimi ve renk yine değişebilir.",
      ],
      [
        "Basit çarpışma modelinde karşılaşmaların bir kısmı ürün oluşturmuyor. Uygun açıklama?",
        "Yeterli enerji ve uygun yönelim birlikte sağlanmayabilir",
        [
          "Her karşılaşma zorunlu ürün verir",
          "Yönelim hiçbir molekülde rol oynayamaz",
          "Enerji engeli bütün atomları yok eder",
          "Hız yalnız ürünün rengine eşittir",
        ],
        "Etkin çarpışma koşullarını birlikte düşün.",
        "Çarpışma ile etkin çarpışma sayısı aynı değildir. Seçilen yol için uygun enerji ve geometri gerekir; yalnız karşılaşma ürün garantisi değildir.",
      ],
      [
        "Aynı geçiş durumu için Ea, ileri=60 ve Ea, geri=90 kJ/mol. ΔH?",
        "−30 kJ/mol",
        ["+30 kJ/mol", "+150 kJ/mol", "−150 kJ/mol", "0 kJ/mol"],
        "İleri engel eksi geri engel.",
        "ΔH=60−90=−30 kJ/mol. Ürün düzeyi girenden 30 kJ/mol düşüktür; engel değerleri toplanmaz.",
      ],
      [
        "r=k[A]ᵃ[B]ᵇ için B sabitken A iki kat olunca r dört kat; A sabitken B iki kat olunca r iki kat. a, b?",
        "a=2, b=1",
        ["a=1, b=2", "a=2, b=2", "a=1, b=1", "a=4, b=2"],
        "Derişim oranının üssü hız oranıdır.",
        "2ᵃ=4 olduğundan a=2; 2ᵇ=2 olduğundan b=1. Sonuç deneysel aralık içindir; net katsayılardan alınmadı.",
      ],
      [
        "r=k[A]²[B]; r birimi mol/(L·s), derişimler mol/L. k birimi?",
        "L²/(mol²·s)",
        ["1/s", "L/(mol·s)", "mol/(L·s)", "L³/(mol³·s)"],
        "M/s'yi M³'e böl.",
        "k=(M/s)/M³=M⁻²/s=L²/(mol²·s). Toplam mertebe üç olduğundan bu üçüncü dereceli yasanın birimidir.",
      ],
      [
        "Elementer adımlar: H₂+ICl→HI+HCl(yavaş), HI+ICl→I₂+HCl(hızlı). Basit yavaş başlangıç adımı modelinde hız?",
        "r=k[H₂][ICl]",
        [
          "r=k[H₂][ICl]²",
          "r=k[HI]²",
          "r=k[I₂][HCl]²",
          "r=k ve bütün derişimlerden bağımsız",
        ],
        "Net katsayı yerine verilen yavaş elementer adımı oku.",
        "Yavaş adımda bir H₂ ve bir ICl vardır. HI sonraki hızlı adımda harcanır; net ICl katsayısının iki olması hız üssünü iki yapmaz.",
      ],
      [
        "Giren 20, ürün −10 kJ/mol; alternatif yol tepesi 50 kJ/mol. İleri/geri engel ve ΔH sırasıyla?",
        "30,60, −30 kJ/mol",
        [
          "50,50,0 kJ/mol",
          "60,30,+30 kJ/mol",
          "30,30, −30 kJ/mol",
          "70,40,+30 kJ/mol",
        ],
        "Tepeyi her uçtan ayrı çıkar.",
        "İleri 50−20=30; geri 50−(−10)=60; ΔH=−10−20=−30. Alternatif yol uç farkını korur; iki engel eşit olmak zorunda değildir.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 63–69; OGM Hız Cepte PDF 10–14/19–24 gerçek anlatım, tablo ve mekanizmalarıyla karşılaştırılmış özgün içerik. Deneysel yasa, seçili yol ve kap koşulları açık; resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-denge-hesaplari",
    topic: "detail-427",
    title: "Denge hesabı: tablodan fiziksel köke",
    minutes: 64,
    objectives: [
      "Başlangıç–değişim–denge tablosunu katsayılarla kur.",
      "K bağıntısını ve korunan atom stokunu birlikte doğrula.",
      "Fiziksel kökü, ayrışma yüzdesini ve K dönüşümlerini hesapla.",
    ],
    sections: [
      {
        title: "Önce doğru net denklem ve fazlar",
        paragraphs: [
          "Denge hesabında hangi türün hangi katsayıyla dönüştüğü belirlenmelidir. aA+bB⇌cC+dD için uygun ideal derişim yaklaşımı Kc=[C]ᶜ[D]ᵈ/([A]ᵃ[B]ᵇ) biçimindedir. Üsler o andaki mol miktarı değil net denklem katsayılarıdır.",
          "Saf katı ve saf sıvı fazların etkinliği bu yaklaşımda sabit alınır; açık derişim terimi olarak yazılmazlar. Buna rağmen miktarları stok tablosunda değişebilir. Önce kimyasal türü, fazı ve verilen hacmi yazmak sayısal denklemin doğru kurulmasını sağlar.",
        ],
      },
      {
        title: "Mol ile molar derişimi ayır",
        paragraphs: [
          "Başlangıç verileri mol ise her gaz veya çözünen tür için n/V ile derişime geçilir. Örneğin 2 L kapta 0,50 mol tür, 0,25 M'dir. Kc bağıntısı derişim ister; mol sayılarını doğrudan yazmak yalnız uygun hacim çarpanları açıkça işlendiğinde eşdeğerdir.",
          "Hacim bütün terimlerde aynı olsa bile üs toplamları farklıysa tamamen sadeleşmez. X₂⇌2X için Kc=nX²/(V·nX₂) olur. Paydaki iki derişim, paydadaki bir derişimden bir ek V bırakır; bu fark denklemin gaz mol değişimiyle ilişkilidir.",
        ],
      },
      {
        title: "Değişimi tek bir ilerlemeye bağla",
        paragraphs: [
          "Başlangıç–değişim–denge tablosunda bir ilerleme değişkeni seçilir. X₂⇌2X için dimer x mol azalırsa monomer 2x mol artar. Başlangıç miktarları nD ve nM ise sonlar nD−x ve nM+2x'tir; iki tür için bağımsız rastgele değişimler seçilemez.",
          "Değişken mol seçildiyse bütün değişimleri mol tut; derişim seçildiyse hacmin sabit olduğunu belirt. İleri yön için x pozitif, geri yön için negatif olabilir. İşaret, başlangıç karışımının dengeye göre hangi yönde ilerlediğine bağlıdır.",
        ],
        table: {
          headers: ["Satır", "X₂", "X"],
          rows: [
            ["Başlangıç mol", "nD", "nM"],
            ["Değişim mol", "−x", "+2x"],
            ["Denge mol", "nD−x", "nM+2x"],
          ],
        },
      },
      {
        title: "Tabloyu K bağıntısına yerleştir",
        paragraphs: [
          "X₂⇌2X için son derişimleri kullanınca Kc=(nM+2x)²/[V(nD−x)] elde edilir. Böylece stokiyometri ve denge koşulu aynı bilinmeyende birleşir. Başlangıçta yalnız dimer varsa nM=0 kullanılır; ürünün başlangıçta sıfır olması son durumda da sıfır kalacağı anlamına gelmez.",
          "Örneğin 1 L'de 1 mol X₂ ve Kc=1 verildiğinde 4x²/(1−x)=1 olur. Çarpıp düzenleyince 4x²+x−1=0 bulunur. Denklemi çözmeden önce x'in hangi aralıkta fiziksel miktar vereceğini belirlemek gereksiz kökü ayıklamayı kolaylaştırır.",
        ],
      },
      {
        title: "İki cebirsel kökten hangisi fiziksel?",
        paragraphs: [
          "Son miktarlar negatif olamaz. Genel X₂⇌2X tablosunda −nM/2≤x≤nD gerekir. Başlangıçta yalnız 1 mol dimer varsa 0≤x≤1 olur. Cebirsel denklemin bu aralık dışındaki kökü, matematiksel çözüm olsa da verilen karışımın çözümü değildir.",
          "4x²+x−1=0 için kökler yaklaşık 0,390388 ve −0,640388'dir. Seçili yalnız-dimer başlangıcında pozitif kök kullanılır. Son dimer 0,609612 ve monomer 0,780776 mol bulunur; negatif kök başlangıçta olmayan monomeri tüketmeye çalışır.",
        ],
      },
      {
        title: "Atom stoku ikinci bir doğrulama verir",
        paragraphs: [
          "Bir X₂ molekülü iki X atomu içerir. Bu yüzden korunacak büyüklük 2n(X₂)+n(X)'tir; toplam molekül sayısı değildir. Bir dimer iki monomere ayrılınca molekül sayısı artar fakat atom sayısı değişmez. Bu ilişki çizimdeki birleşme/ayrılma oklarının da denetimidir.",
          "Yukarıdaki örnekte 2×0,609612+0,780776≈2 mol atom elde edilir; başlangıçta 2×1=2 idi. Ayrıca [X]²/[X₂]≈1 koşulu sağlanmalıdır. Yalnız toplamı veya yalnız K'yi sağlayan bir tahmin iki koşulu birlikte sağlamıyorsa yeterli değildir.",
        ],
      },
      {
        title: "Ayrışma yüzdesi ne zaman doğrudan x/n?",
        paragraphs: [
          "Başlangıçta yalnız dimer bulunup ileri ayrışma gerçekleşiyorsa ayrışan pay α=x/nD, yüzde ise 100α'dır. 2 mol dimerin 0,50 molü ayrışırsa yüzde 25; oluşan monomer 1,00 moldür. Ayrışan dimer molü ile oluşan monomer molü aynı sayı değildir.",
          "Başlangıçta monomer de varsa x net ilerlemeyi anlatır; aynı basit yüzde yorumu her zaman başlangıç moleküllerinin tek yönlü geçmişini vermez. Dengede ileri ve geri dönüşümler sürer. Modelde bu yüzden net miktarlar ve başlangıç koşulu yüzde etiketinden önce gösterilir.",
        ],
      },
      {
        title: "Kp ile Kc arasında ideal gaz köprüsü",
        paragraphs: [
          "İdeal gaz için Pi=[i]RT kullanılarak lise sayısal bağıntısı Kp=Kc(RT)^Δn elde edilir. Δn, ürün gaz katsayıları toplamı eksi giren gaz katsayıları toplamıdır. X₂⇌2X için Δn=1; N₂+3H₂⇌2NH₃ için Δn=−2 olur.",
          "T Kelvin, R kullanılan hacim-basınç birimleriyle uyumlu seçilir. Örneğin X₂⇌2X için Kc=1, T=300 K, R=0,08206 L·atm/(mol·K) verilirse sayısal Kp=24,618 bulunur. Daha genel termodinamik K etkinliklerle boyutsuz tanımlanır; burada soruda verilen lise derişim/basınç gösterimi korunur.",
        ],
      },
      {
        title: "Denklem değişince K de dönüşür",
        paragraphs: [
          "Ters denklem için Kters=1/K; bütün katsayıları r ile çarpılan denklem için Kyeni=Kʳ olur. Bu kural, bağıntıdaki bütün üslerin aynı işlemle değişmesinden gelir. K=49 olan ileri denklemin aynı yönde yarısı için √49=7; ters yarısı için 1/7 bulunur.",
          "İki denklem toplanıp ara türler sadeleşirse uygun yön/ölçeklerdeki K değerleri çarpılır. A⇌B için K=2 ve B⇌C için K=3 olduğunda A⇌C için K=6. Denklemle K'yi aynı dönüşüme uğratmak, yalnız sayıları toplama hatasını önler.",
        ],
      },
      {
        title: "Q yönü verir, stok son miktarı sınırlar",
        paragraphs: [
          "Başlangıç derişimlerini aynı bağıntıya koymak Q değerini verir. Q<K ileri, Q>K geri net dönüşümü destekler; Q=K uygun denge koşuludur. Başlangıç yalnız ürün içerse bile tersinir model geri yönde dengeye ulaşabilir; bütün maddelerin en başta hazır bulunması gerekmez.",
          "Q için payda sıfır ve pay pozitifse ileri yöndeki oran sonsuz sınırdadır; geri yön düşünülür. Hem pay hem payda sıfırken körlemesine 0/0'ı bir sayı sayma. Son miktarı bulmak için yönün yanında korunan stok, hacim ve fiziksel aralık da gerekir.",
        ],
      },
      {
        title: "Çözümün son kontrol listesi bir hesap yöntemidir",
        paragraphs: [
          "Bulduğun miktarları tabloya geri koy, bütün türlerin negatif olmadığını denetle ve denge bağıntısını yeniden hesapla. Sonra korunmuş atom veya bileşen stokunu kontrol et. Birim ve verilen fazlar sonucun ilk koşullarla aynı problemi çözdüğünü gösterir.",
          "Yuvarlamayı mümkün olduğunca sonda yapmak küçük farkların büyümesini önler. x çok küçük yaklaşımı verilmişse son x/başlangıç oranıyla ve tam bağıntı artığıyla kontrol edilir; yaklaşık küçük kökü yalnız ezber yüzdeyle doğru ilan etme. Etkileşim doğrudan fiziksel aralıkta çözer ve iki kanıtı birlikte gösterir.",
        ],
      },
    ],
    examples: [
      {
        title: "Oran ve toplam birlikte",
        prompt:
          "Sabit hacimde X⇌Y için Kc=3 ve dengede [X]+[Y]=4 M. Denge derişimleri?",
        strategy: "İki ayrı koşuldan iki bilinmeyeni bul.",
        steps: [
          {
            label: "Oran",
            explanation: "[Y]=3[X].",
          },
          {
            label: "Toplam",
            explanation: "[X]+3[X]=4 → [X]=1 M.",
          },
          {
            label: "İkinci tür",
            explanation: "[Y]=3 M; oran 3 ve toplam 4 birlikte sağlanır.",
          },
        ],
        answer: "X 1 M, Y 3 M.",
        check: "Toplamın korunması bu 1:1 modelde ayrıca verilmiştir.",
        pitfall: "Dengede bütün derişimleri eşit sanmak.",
      },
      {
        title: "Bir dimerden iki monomer",
        prompt:
          "1 L kapta ilk 1 mol X₂, X yok. X₂⇌2X ideal derişim modelinde Kc=1. Denge miktarları?",
        strategy: "Dimerdeki x değişimini monomerde 2x yap.",
        steps: [
          {
            label: "Tablo",
            explanation: "X₂=1−x; X=2x mol.",
          },
          {
            label: "Kök",
            explanation:
              "4x²/(1−x)=1 → 4x²+x−1=0. Fiziksel kök x=(√17−1)/8≈0,390388.",
          },
          {
            label: "Son",
            explanation: "X₂≈0,609612; X≈0,780776 mol.",
          },
        ],
        answer: "Yaklaşık 0,609612 mol dimer ve 0,780776 mol monomer.",
        check: "2nD+nM=2; [X]²/[X₂]≈1.",
        pitfall: "Monomer değişimini de x yazmak.",
      },
      {
        title: "Yalnız ürünle başlangıç",
        prompt:
          "1 L'de ilk 2 mol X, X₂ yok. X₂⇌2X için Kc=4. İdeal modelde denge miktarları?",
        strategy: "Geri dönüşüm miktarını y pozitif seç.",
        steps: [
          {
            label: "Tablo",
            explanation: "y mol X₂ oluşursa X miktarı 2−2y olur.",
          },
          {
            label: "Denklem",
            explanation:
              "(2−2y)²/y=4 →y²−3y+1=0. 0≤y≤1 aralığında y=(3−√5)/2≈0,381966.",
          },
          {
            label: "Son",
            explanation: "X₂≈0,381966; X≈1,236068 mol.",
          },
        ],
        answer: "Dimer 0,381966; monomer 1,236068 mol.",
        check: "2×0,381966+1,236068=2; oran≈4.",
        pitfall:
          "Başlangıçta giren yok diye tersinir dönüşümü imkânsız saymak.",
      },
      {
        title: "Aynı yönün yarısı",
        prompt:
          "Verilen sıcaklıkta N₂+3H₂⇌2NH₃ için Kc=49. Aynı yönde ½N₂+3/2H₂⇌NH₃ için K?",
        strategy: "Denklemin ters çevrilmediğini önce denetle.",
        steps: [
          {
            label: "Yön",
            explanation:
              "Giren ve ürün tarafları aynı; yalnız katsayılar½ oldu.",
          },
          {
            label: "Üs",
            explanation: "Kyeni=49^(1/2).",
          },
          {
            label: "Sonuç",
            explanation: "Kyeni=7; ters-yarım denklem sorulsaydı 1/7 olurdu.",
          },
        ],
        answer: "7.",
        check: "Yeni bağıntının karesi eski 49 verir.",
        pitfall: "Sırf yarım katsayı görünce gereksiz tersini almak.",
      },
    ],
    recall: [
      {
        prompt: "ICE'de değişimler nasıl bağlanır?",
        answer:
          "Tek ilerleme ve net denklem katsayılarıyla; türler rastgele ayrı değişmez.",
      },
      {
        prompt: "X₂⇌2X'te ne korunur?",
        answer: "2n(X₂)+n(X) atom stoku; toplam molekül sayısı değil.",
      },
      {
        prompt: "Kök nasıl elenir?",
        answer:
          "Son miktarlar negatif olamaz; başlangıç stokunun belirlediği aralık kullanılır.",
      },
      {
        prompt: "K 49'un aynı yön yarısı?",
        answer: "7; ters yarısı 1/7.",
      },
    ],
    items: [
      [
        "İdeal derişim modelinde N₂+3H₂⇌2NH₃. Anlık [N₂]=1,[H₂]=2,[NH₃]=2 M ve aynı T'de Kc=2. Q ve net yön?",
        "Q=0,5; ürünlere",
        ["Q=2; dengede", "Q=4; girenlere", "Q=0,5; girenlere", "Q=1; dengede"],
        "H₂ üçüncü kuvvette.",
        "Q=2²/(1×2³)=0,5. Q<K olduğundan net ileri dönüşüm gerekir; son miktarlar ayrıca stokiyometriyle bulunur.",
      ],
      [
        "2 L kapta dengede 0,50 mol X₂ ve 1,00 mol X var. X₂⇌2X için Kc?",
        "1",
        ["0,5", "2", "4", "0,25"],
        "Molü önce hacme böl.",
        "[X₂]=0,25 M,[X]=0,50 M. Kc=0,50²/0,25=1. Mol oranını doğrudan kullanmak ek hacim çarpanını kaçırır.",
      ],
      [
        "A⇌2B dengesinde [A]=0,40 ve [B]=0,20 M. Verilen ideal gösterimde Kc?",
        "0,10",
        ["0,50", "2", "4", "0,04"],
        "Ürün derişiminin karesini al.",
        "Kc=[B]²/[A]=0,20²/0,40=0,10. İleri katsayı 2, o anki mol miktarı değil üstü belirler.",
      ],
      [
        "1 L'de ilk 1 mol X₂, X yok; X₂⇌2X için Kc=1. x ayrışan mol ve 4x²+x−1=0. Hangi kök fiziksel?",
        "x≈0,390388",
        ["x≈−0,640388", "x=1,390388", "x=−1", "x=2"],
        "0≤x≤1 olmalı.",
        "Başlangıç monomer yokken negatif x ürün tüketimi gerektirir. Fiziksel aralıktaki pozitif kök 0,390388; diğer seçenekler stok sınırını ihlal eder.",
      ],
      [
        "İlk yalnız 2 mol X₂ var; X₂⇌2X'te 0,50 mol dimer net ayrışıyor. Ayrışma yüzdesi ve oluşan X?",
        "%25 ve 1,00 mol",
        ["%50 ve 0,50 mol", "%25 ve 0,50 mol", "%100 ve 2 mol", "%10 ve 4 mol"],
        "Ayrışan dimeri ilk dimere böl; ürüne 2 katsayısı uygula.",
        "0,50/2×100=%25. Bir dimer iki monomer verdiğinden X oluşumu 1,00 moldür; iki miktar aynı sayı değildir.",
      ],
      [
        "Belirli ideal tepkimenin yazılışı sabit. Aynı T'de yalnız kap hacmi değiştiriliyor. Kc hakkında uygun sonuç?",
        "Aynı kalır; Q ve denge bileşimi değişebilir",
        [
          "Hacmin karesiyle her durumda artar",
          "Mutlaka 0 olur",
          "Herhangi bir derişim değişiminde yeni rastgele değer alır",
          "Yalnız ilk toplam mol sayısıdır",
        ],
        "Sıcaklık ile bileşim müdahalesini ayır.",
        "Aynı tepkime ve T için Kc korunur. Hacim anlık derişimleri ve uygun gaz stokiyometrisinde Q'yu değiştirip yeni denge oluşturabilir.",
      ],
      [
        "İdeal gaz N₂+3H₂⇌2NH₃ için Kp-Kc bağıntısı hangisidir? R ve T uygun birimlerde.",
        "Kp=Kc/(RT)²",
        ["Kp=Kc(RT)²", "Kp=KcRT", "Kp=Kc/(RT)", "Kp=Kc+RT"],
        "Δn=ürün gaz katsayıları−giren gaz katsayıları.",
        "Δn=2−(1+3)=−2. Lise sayısal bağıntısı Kp=Kc(RT)^Δn olduğundan paydada(RT)² vardır.",
      ],
      [
        "N₂+3H₂⇌2NH₃ için K=49. Hedef NH₃⇌½N₂+3/2H₂. Aynı T'de yeni K?",
        "1/7",
        ["7", "49", "1/49", "98"],
        "Ters ve yarım iki ayrı işlemdir.",
        "Önce ters için 1/49; sonra yarım katsayılar için karekök: (1/49)^(1/2)=1/7. Hedef aynı ileri yön olsaydı 7 olurdu.",
      ],
      [
        "Aynı T'de X⇌Y için K=2, Y⇌Z için K=3. Toplandığında X⇌Z için K?",
        "6",
        ["5", "1", "2/3", "3/2"],
        "Ara tür sadeleşirken bağıntılar çarpılır.",
        "K 1=[Y]/[X], K 2=[Z]/[Y]. Çarpım[Z]/[X]=6; K değerleri toplama işlemine rağmen toplanmaz.",
      ],
      [
        "Tersinir X₂⇌2X modelinde sonlu pozitif K var. Başlangıçta yalnız X bulunması hakkında doğru ifade?",
        "X₂ oluşacak geri dönüşümle denge kurulabilir",
        [
          "Giren başta yoksa bütün tersinirlik imkânsızdır",
          "İki yön baştan zorunlu eşit hızdadır",
          "X atomları korunmadan yok olur",
          "Son dimer miktarı her koşulda kesin 0 kalır",
        ],
        "Ters yönün gireni başlangıçta vardır.",
        "Başlangıç X, geri yönde dimer oluşturabilir. Denge hesabı başlangıç stokundan yapılır; bütün türlerin ilk anda mevcut olması gerekmez.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 71–73; OGM Denge Cepte PDF 10–12 gerçek denklem/bağıntı anlatımlarıyla karşılaştırılmış özgün hesap ve sorular. Kökler stok/atom denetimiyle sınırlandırılır; resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-denge-derisim",
    topic: "detail-428",
    title: "Derişim etkisi: önce, ani değişim, yeni denge",
    minutes: 62,
    objectives: [
      "Dengeye yapılan müdahaleyi üç ayrı zamanda izle.",
      "Q değişimini stokiyometrik ilerlemeyle yeni dengeye bağla.",
      "Hacim, inert gaz ve saf faz koşullarını ayır.",
    ],
    sections: [
      {
        title: "Üç fotoğrafla aynı deneyi anlat",
        paragraphs: [
          "Dengeye etki sorusunda önce eski dengeyi, sonra müdahalenin hemen sonrasını, en son yeni dengeyi yaz. Bu üç an farklı verilere sahiptir. Eski dengede Q=K iken bir türün eklenmesi Q'yu aniden değiştirebilir; sonraki tepkime bu yeni karışımdan başlar.",
          "Grafikte dikey sıçrama dış müdahaleyi, daha sonraki eğri ise net dönüşümü gösterir. Yatay yeni plato tepkimenin tamamen durması değil yeniden eşit hız koşuludur. Bir türün eskiye göre artması ile kendi sıçrama değerinden azalması aynı anda mümkün olabilir.",
        ],
      },
      {
        title: "Tek tür eklendiğinde ilk değişim",
        paragraphs: [
          "Sabit T, V'de X+Y⇌XY için eski denge derişimleri 1,1,1 M ve Kc=1 olsun. Yalnız X'e 1 M karşılığı madde eklenince ani derişimler 2,1,1 olur. Q=[XY]/([X][Y])=1/2 olduğundan sistemin net yönü ürünleredir.",
          "O ilk anda Y ve XY sırf X eklendi diye dikey sıçramaz; karışma anı ideal hızlı kabul edilmiştir. Sonraki tepkimede X ve Y birlikte azalırken XY artar. Bu ayrım, şekli tahmin etmek için bütün denge hesabını bitirmeden de kullanılabilir.",
        ],
      },
      {
        title: "Aynı K'ye yeni stoklarla dön",
        paragraphs: [
          "Sıcaklık ve tepkime yazılışı değişmediyse Kc aynı kalır. Fakat eklenen madde toplam atom veya bileşen stokunu değiştirmiştir; bu yüzden bütün türlerin eski değerlerine dönmesi gerekmez. Le Chatelier ilkesi etkiyi azaltan eğilimi anlatır, sihirli bir sıfırlama düğmesi değildir.",
          "Yukarıdaki örnekte yeni ilerleme x için X=2−x, Y=1−x, XY=1+x yazılır. (1+x)/[(2−x)(1−x)]=1 çözülünce x=2−√3 bulunur. Son X yaklaşık 1,732 M; ani 2'den düşmüş ama eski 1'den yüksek kalmıştır.",
        ],
      },
      {
        title: "Ürün eklemek veya çekmek",
        paragraphs: [
          "Aynı X+Y⇌XY bağıntısında ürün eklemek Q'nun payını artırır; Q>K olursa net geri dönüşüm girenleri artırır. Ürünün bir kısmını uzaklaştırmak payı azaltır; Q<K olduğunda net ileri dönüşüm eksilen ürünün bir bölümünü yeniden oluşturabilir.",
          "Yeni dengede ürünün eski miktarına tam ulaşması zorunlu değildir. Çekilen madde sistemden çıkmıştır ve stok bilançosuna eksi yazılır. Bir türün bir kısmını çekme ile sıcaklığı, hacmi veya bütün karışımı aynı oranda değiştirme farklı müdahalelerdir.",
        ],
      },
      {
        title: "Stokiyometri eğrileri birbirine bağlar",
        paragraphs: [
          "X+Y⇌XY için bir mol XY net oluştuğunda bir mol X ve bir mol Y tüketilir. Sabit hacimde derişim değişimleri de −x, −x,+x oranındadır. Bu, grafikte herhangi üç bağımsız eğri çizilemeyeceğini gösterir; aynı ilerleme bütün türlere uygulanmalıdır.",
          "Ayrıca X bileşeni toplamı n(X)+n(XY), Y toplamı n(Y)+n(XY) korunur; dış ekleme/çekme yalnız ilgili stoğu değiştirir. İki korunumu K koşuluyla birlikte kontrol etmek, güzel görünen fakat kimyasal olarak imkânsız eğrileri ayıklar.",
        ],
      },
      {
        title: "Hacim müdahalesi bütün gazlara dokunur",
        paragraphs: [
          "İdeal gaz karışımında T sabitken hacim yarıya düşerse tepkime ilerlemeden önce her gazın derişimi iki katına çıkar. Sonra Q'nun K'ye göre yeni değeri net yönü belirler. X+Y⇌XY için üç derişim iki kat olsa da pay bir, payda iki derişim içerdiği için Q yarıya iner.",
          "İleri yönde daha az gaz molü oluşması, sıkıştırma sonrası ürün yönünü destekler. Ancak miktar ile derişim aynı şey değildir: sıkıştırılan kapta net tüketilen reaktiflerin son derişimi yine eski denge derişiminden büyük olabilir. Ani sıçrama ve sonraki azalış ayrı referanslarla belirtilir.",
        ],
      },
      {
        title: "Gaz katsayı toplamı eşitse",
        paragraphs: [
          "H₂+I₂⇌2HI gibi Δngaz=0 olan ideal dengede bütün derişimler aynı hacim oranıyla değişirse bu ortak çarpan Q'da sadeleşir. Sabit T'deki yalnız hacim değişimi bu nedenle net kayma gerektirmeyebilir. Buna karşın tür derişimlerinin kendisi hacim oranıyla değişmiştir.",
          "'Denge kaymaz' demek 'hiçbir ölçülen değer değişmez' demek değildir. Toplam basınç, derişimler ve çarpışma sıklığı değişebilir; uygun iki yönün hızları yine birbirine eşit olabilir. Net yön ile makroskopik birim hacim değerlerini ayrı yorumla.",
        ],
      },
      {
        title: "İnert gazda kabın koşulu belirleyicidir",
        paragraphs: [
          "Sabit T, V'de tepkimeye katılmayan ideal inert gaz eklendiğinde toplam basınç artar; mevcut tepkime gazlarının n/V ve kısmi basınçları değişmez. Bu durumda onların Q değeri değişmediği için yalnız bu eylem dengeyi kaydırmaz.",
          "Sabit T ve toplam P'de hareketli piston varsa inert ekleme hacmi artırabilir. Tepkime gazlarının kısmi basınçları azalır; Δngaz sıfır değilse yeni Q farklı olabilir. Basınç arttı veya gaz eklendi sözcüklerinden önce hangi basınç ve hangi kap sorusunu cevapla.",
        ],
      },
      {
        title: "Saf katının derişimi ile molünü ayır",
        paragraphs: [
          "CaCO₃(katı)⇌CaO(katı)+CO₂(gaz) için iki saf katı faz korunurken denge bağıntısında yalnız CO₂ yer alır. CO₂ eklenince net geri dönüşüm CaO ve CO₂ tüketip CaCO₃ oluşturabilir. Kp aynı T'de korunur; son CO₂ basıncı yine aynı değere dönebilir.",
          "Buna rağmen katıların mol miktarları değişmiştir. CaO tamamen tükenirse aynı iki-katı denge eşitliğini sınırsız uygulayamazsın. Bir katıdan daha çok eklemekle gaz eklemek farklı müdahalelerdir; envanter ile etkinlik aynı sütun değildir.",
        ],
      },
      {
        title: "Derişim tablosunu grafikle eşleştir",
        paragraphs: [
          "Her müdahale için bir kısa tablo kur: değişen dış veri, ani etkilenen türler, Q/K kıyası ve sonraki stokiyometrik değişim. Tek tür eklemede yalnız o satır sıçrar; hacim değişiminde bütün gaz satırları sıçrar. Bu işlemler kaynak grafiğinin yalnız biçimini ezberlemekten daha geneldir.",
          "Etkileşimde önce eski/ani/yeni sayıları karşılaştır, sonra X veya ürün eklemesini tek tek değiştir. Grafikte renk yanında tür adları, birim ve müdahale çizgisi bulunur. Tahminini sayısal Q ve iki bileşen stoku ile açıklaman, sonucun neden oluştuğunu gösterir.",
        ],
        table: {
          headers: ["Etki", "Ani durum", "Sonraki eğilim"],
          rows: [
            ["Sabit V'de X ekleme", "Yalnız X yükselir", "Q azalırsa ürünlere"],
            [
              "Sabit V'de XY ekleme",
              "Yalnız XY yükselir",
              "Q artarsa girenlere",
            ],
            [
              "Hacmi küçültme",
              "Bütün gaz derişimleri artar",
              "Q ve gaz katsayılarıyla belirlenir",
            ],
            [
              "Sabit T, V inert ekleme",
              "Tepkime kısmi basınçları aynı",
              "Tek başına kayma yok",
            ],
          ],
        },
      },
    ],
    examples: [
      {
        title: "Eklenen X eskiye tamamen dönmez",
        prompt:
          "Sabit T, V'de X+Y⇌XY; eski derişimler [X] = [Y] = [XY] = 1 M, Kc=1. X'e 1 M ekleniyor. Yeni denge?",
        strategy: "Önce ani tablo, sonra tek ilerleme.",
        steps: [
          {
            label: "Ani",
            explanation: "2,1,1 M ve Q=0,5; net ürün yönü.",
          },
          {
            label: "Denklem",
            explanation:
              "Sonlar 2−x,1−x,1+x. K=1 → x²−4x+1=0; fiziksel x=2−√3≈0,267949.",
          },
          {
            label: "Son",
            explanation: "X≈1,732051, Y≈0,732051, XY≈1,267949 M.",
          },
        ],
        answer: "1,732051; 0,732051; 1,267949 M.",
        check: "XY/(X·Y)≈1; X bileşeni 3, Y bileşeni 2 M korunur.",
        pitfall: "X tüketiliyor diye mutlaka eski 1 M'ye döner sanmak.",
      },
      {
        title: "Çekilen ürünün bir bölümü tamamlanır",
        prompt:
          "Sabit T, V'de X+Y⇌XY; eski 1,1,1 M, Kc=1. Ürünün 0,50 M'si çekiliyor. Başka madde değişmiyor. Yeni ürün?",
        strategy: "Kalan stoktan yeni dengeyi hesapla.",
        steps: [
          {
            label: "Ani",
            explanation: "X=Y=1, XY=0,50 M; Q=0,50.",
          },
          {
            label: "İlerleme",
            explanation:
              "(0,50+x)/(1−x)²=1 → x²−3x+0,50=0. Fiziksel x=(3−√7)/2≈0,177124.",
          },
          {
            label: "Ürün",
            explanation: "XY=0,50+x≈0,677124 M; eski 1 M'nin altında kalır.",
          },
        ],
        answer: "Yaklaşık 0,677124 M.",
        check: "Tüketilen X ve Y eşit 0,177124 M.",
        pitfall:
          "Le Chatelier ilkesini eksilen her gramı tam geri getirme saymak.",
      },
      {
        title: "Sıkıştırmada hepsi önce sıçrar",
        prompt:
          "İdeal gaz X+Y⇌XY için eski 1 L kapta her tür 1 mol ve Kc=1. T sabitken V 0,50 L yapılıyor. Son derişimler?",
        strategy:
          "Mol değişmeden ilk derişimleri bul, sonra ilerlemeyi derişimle seç.",
        steps: [
          {
            label: "Ani",
            explanation: "Bütün derişimler 2 M; Q=2/(2×2)=0,50.",
          },
          {
            label: "Denklem",
            explanation:
              "Sonlar 2−x,2−x,2+x; x²−5x+2=0. Fiziksel x=(5−√17)/2≈0,438447 M.",
          },
          {
            label: "Son",
            explanation: "X=Y≈1,561553; XY≈2,438447 M.",
          },
        ],
        answer: "1,561553; 1,561553; 2,438447 M.",
        check:
          "Reaktifler 2'den azalır ama eski 1'den büyük kalır; stok için hacimle çarpılır.",
        pitfall: "Sıkıştırmada yalnız ürünün anlık sıçrayacağını çizmek.",
      },
      {
        title: "Gaz aynı basınca, katılar yeni miktara",
        prompt:
          "CaCO₃(katı)⇌CaO(katı)+CO₂(gaz). İki katı faz son durumda da var; Kp=0,50 atm. T, V sabit; V 1 L, RT 25 L·atm/mol. Dengedeki kaba 0,010 mol CO₂ ekleniyor. Son gaz ve net dönüşüm?",
        strategy: "Gazın denge stoğunu ve eklenen fazlalığı ayır.",
        steps: [
          {
            label: "Eski gaz",
            explanation: "n=PV/RT=0,50×1/25=0,020 mol.",
          },
          {
            label: "Ani",
            explanation:
              "nCO₂=0,030 mol; P=0,75 atm>Kp. Net geri yönde dönüşüm.",
          },
          {
            label: "Son",
            explanation:
              "İki katı sürerken gaz yine 0,020 mol olur. 0,010 mol CaO tüketilip aynı mol CaCO₃ oluşur.",
          },
        ],
        answer: "Son 0,020 mol gaz; 0,010 mol geri dönüşüm.",
        check: "Fazların son durumda varlığı kökte verilmiştir.",
        pitfall: "Son gaz aynı diye hiçbir tepkime olmadığını sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Tek tür eklemede hangi eğri aniden sıçrar?",
        answer:
          "Hacim sabitse yalnız eklenen tür; ötekiler tepkimeyle zaman içinde değişir.",
      },
      {
        prompt: "Etkiyi azaltmak eskiye dönmek mi?",
        answer: "Hayır; toplam stok değiştiği için yeni denge farklı olabilir.",
      },
      {
        prompt: "Sıkıştırmada ilk anda ne olur?",
        answer: "İdeal gazların bütün derişimleri aynı hacim oranıyla değişir.",
      },
      {
        prompt: "İnert gaz için hangi iki kap?",
        answer:
          "Sabit T, V ve sabit T, toplam P ayrı; kısmi basınç etkileri farklıdır.",
      },
    ],
    items: [
      [
        "Sabit T, V'de X+Y⇌XY; eski denge derişimleri [X] = [Y] = [XY] = 1 M, Kc=1. Yalnız X'e 1 M ekleniyor. Hemen sonraki Q ve yön?",
        "Q=0,50; ürünlere",
        [
          "Q=2; girenlere",
          "Q=1; dengede",
          "Q=0,50; girenlere",
          "Q=4; ürünlere",
        ],
        "Ani derişimler 2,1,1.",
        "Q=1/(2×1)=0,50<K. Net ileri dönüşüm X ve Y tüketip XY artırır; K aynı T'de değişmez.",
      ],
      [
        "Sabit T, V'de dengedeki X+Y⇌XY'ye yalnız X ekleniyor; karıştırma ani kabul. Hangi grafik sıçraması uygundur?",
        "X aniden artar; Y ve XY ilk anda süreklidir",
        [
          "Üçü de zorunlu aynı anda iki kat",
          "Y tek başına aniden artar",
          "XY eklenmediği hâlde tek sıçrayan odur",
          "X ilk anda değişmeden kalır",
        ],
        "Dış eylem ile sonraki tepkimeyi ayır.",
        "Miktar/hacim oranı ilk anda yalnız X için değişir. Öteki türler net tepkime ilerledikçe değişir; hacim müdahalesi verilmemiştir.",
      ],
      [
        "X+Y⇌XY için Kc=1. Bir karışımda X=2−x, Y=1−x, XY=1+x M; fiziksel x=2−√3. Son X eski 1 M ve ani 2 M ile nasıl kıyaslanır?",
        "1 M'den büyük,2 M'den küçüktür",
        [
          "Eski 1 M'ye tam eşittir",
          "2 M'den büyüktür",
          "Negatiftir",
          "Her koşulda 0 olur",
        ],
        "x≈0,268.",
        "X≈1,732 M. Etkiyi azaltan tüketim ani 2'den düşürür; fakat eklenen X stoğu nedeniyle eski 1'e tam dönmez.",
      ],
      [
        "Aynı tepkime yazılışında T sabitken bir ürün eklenip yeni denge kuruluyor. Kc?",
        "Değişmez",
        [
          "Eklenen mol kadar toplanır",
          "Her zaman iki kat olur",
          "Kesin sıfıra iner",
          "Yalnız gazların rengine dönüşür",
        ],
        "K'nin T ve denklem koşulunu koru.",
        "Ürün ekleme anlık Q'yu ve yeni denge miktarlarını değiştirir. Aynı T ve tepkime için Kc değeri değişmez; hız ve stok başka büyüklüklerdir.",
      ],
      [
        "Sabit T, V'de X+Y⇌XY; eski 1,1,1 M, Kc=1. XY'den 0,50 M çekiliyor. İlk net tepki?",
        "XY yeniden oluşacak ürün yönü",
        [
          "Yalnız girenlere; Q büyüdü",
          "Kc kendiliğinden 0,50 oldu",
          "Çekilen ürün mutlaka tümüyle geri gelir",
          "Bütün türler ilk anda sıfırlanır",
        ],
        "Ürünün payını azaltınca Q'yu hesapla.",
        "Ani Q=0,50/(1×1)=0,50<K. İleri dönüşüm ürünü kısmen tamamlayabilir; ilk eski miktarı tam geri getirme garantisi yoktur.",
      ],
      [
        "İdeal gaz X+Y⇌XY için eski derişimler [X] = [Y] = [XY] = 1 M, Kc=1. T sabitken hacim yarıya düşürülüyor. Hemen sonra Q?",
        "0,50",
        ["1", "2", "4", "0,25"],
        "Bütün gaz derişimleri iki kat.",
        "Ani 2,2,2 M için Q=2/(2×2)=0,50. Yalnız bir eğriyi sıçratmak hacim etkisini yanlış temsil eder.",
      ],
      [
        "İdeal H₂+I₂⇌2HI dengesi; T sabit, hacim yarıya indiriliyor. Uygun sonuç?",
        "Q aynı kalabilir; bütün gaz derişimleri iki katına çıkar",
        [
          "Denge kaymıyorsa hiçbir derişim değişemez",
          "Q zorunlu yarıya iner",
          "HI ilk anda zorunlu sıfırlanır",
          "Gaz katsayı toplamlarına katılar eklenmelidir",
        ],
        "Ortak hacim çarpanının üslerini say.",
        "Pay ve payda toplam üsleri 2 olduğundan iki kat çarpanlar sadeleşir. Q korunur; buna rağmen her n/V iki kat olmuştur.",
      ],
      [
        "İdeal tepkime gazları dengede. Sabit T, V'de yalnız tepkimesiz inert gaz ekleniyor. Neden tek başına kayma beklenmez?",
        "Tepkime türlerinin kısmi basınçları değişmez",
        [
          "Toplam basınç hiçbir zaman artamaz",
          "K sabitliği bütün müdahalelerde Q sabitliği demektir",
          "İnert gaz bütün ürünleri tüketir",
          "Bütün tepkime miktarları iki kat olur",
        ],
        "Pi=niRT/V.",
        "Tepkime türlerinin ni, T, V değerleri aynı kaldığından Pi ve Q korunur. Toplam basınç inert katkısıyla artsa da aynı şey değildir.",
      ],
      [
        "İdeal X₂⇌2X dengesine sabit T ve toplam P'de pistonlu kapta inert gaz ekleniyor; hacim artıyor. Beklenen net yön?",
        "Daha çok gaz molü olan ürünlere",
        [
          "Daha az gaz molü olan girenlere",
          "Hacim değiştiği için K zorunlu iki kat",
          "İnert her koşulda kimyasal ürün olur",
          "Kısmi basınçlar zorunlu aynı kalır",
        ],
        "Piston hacmi ve kısmi basınçları değiştiriyor.",
        "Tepkime gazları seyrelir; Δngaz=+1 için Q azalır. Aynı K'ye yaklaşırken ürün yönü desteklenir; sabit V inert eklemesinden farklı koşuldur.",
      ],
      [
        "CaCO₃(katı)⇌CaO(katı)+CO₂(gaz), T sabit. CO₂ ekleniyor ve her iki katı son durumda da var. Uygun sonuç?",
        "CaO azalabilir, CaCO₃ artabilir; son CO₂ basıncı aynı Kp'ye döner",
        [
          "Hiçbir katı miktarı değişemez",
          "CO₂ eklemek Kp'yi zorunlu artırır",
          "CaO'nun derişim terimi Kp'ye eklenir",
          "Gazın son basıncı aynıysa hiçbir dönüşüm olmamıştır",
        ],
        "Saf faz etkinliği ile stok değişimini ayır.",
        "CO₂ artışı geri yönü destekler; yeterli CaO verilmişse gaz tüketilir ve CaCO₃ oluşur. Aynı T'de iki katılı dengenin gaz basıncı geri dönebilir; katı molü farklıdır.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 73–75; OGM Denge Cepte PDF 12 ve Denge Faktörleri sunu PDF 2–7/12–17 gerçek grafik/tablo anlatımlarıyla karşılaştırılmış özgün öğretim. Etki anı, faz envanteri ve kap koşulları açık; resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-denge-sicaklik-kesir",
    topic: "detail-429",
    title: "Sıcaklık, K ve denge kesri",
    minutes: 60,
    objectives: [
      "Qc ile Kc'yi aynı bağıntı ve sıcaklıkta kıyasla.",
      "Sıcaklık değişiminin anlık ve son etkilerini ayır.",
      "Verilen K(T) tablosunu enerji yönü ve yeni miktarlarla ilişkilendir.",
    ],
    sections: [
      {
        title: "Denge kesri o anın fotoğrafıdır",
        paragraphs: [
          "Q, denge bağıntısının herhangi bir andaki uygun etkinlik, derişim veya kısmi basınçlarla hesaplanan değeridir. K ise belirli sıcaklıkta denge durumunun değeridir. X⇌Y ideal derişim modelinde Qc=[Y]/[X] olur; anlık oranı dengeye özgü Kc ile karşılaştırırız.",
          "Örneğin [X]=2,[Y]=1 M için Qc=0,50. Aynı T'de Kc=2 verilmişse oran ürün lehine artmalıdır; net yön ileridir. Bu kıyas yönü söyler, son miktarları tek başına vermez. Kap stoğu ve katsayılar ayrıca gerekir.",
        ],
      },
      {
        title: "Q küçük, büyük veya eşit olduğunda",
        paragraphs: [
          "Aynı net tepkime ve koşul için Q<K ise ürünlere, Q>K ise girenlere net dönüşüm beklenir. Q=K denge koşuludur; ileri ve geri dönüşümlerin durması gerekmez. Eşit olan hızlardır, iki türün derişimleri değil.",
          "K=2 olan X⇌Y örneğinde X 1, Y 2 M dengededir. X 1, Y 4 M ise Q 4 olur ve geri yön gerekir. Bu iki açık örneği zihninde kurmak, oranı ters yazınca yönü yanlış seçme hatasını yakalamaya yardım eder.",
        ],
      },
      {
        title: "Isı alışverişi ile sıcaklık etkisi",
        paragraphs: [
          "İleri dönüşüm ısı alıyorsa endotermik, veriyorsa ekzotermiktir. Sıcaklığı artırmak uygun dengede ısı alan yönü destekleyebilir. Termodinamik standart denge sabitinin sıcaklıkla değişimi tepkime entalpisiyle ilişkilidir; temel X⇌Y ideal gaz modelimizde gaz katsayı farkı sıfırdır.",
          "Bu modelde ileri yön endotermik seçildiğinde sıcaklık arttıkça K tablosu büyür; ekzotermikte küçülür. Isı sözcüğünü yönü hatırlamak için denklemin bir tarafına yazmak yararlıdır. Ancak [ısı] diye bir molar derişim terimini K veya Q bağıntısına eklemeyiz.",
        ],
      },
      {
        title: "Önce ve sonra aynı sıcaklık değildir",
        paragraphs: [
          "Derişim ekleme deneyinde T aynı kaldığından K sabittir. Sıcaklık müdahalesinde ise karşılaştırılacak yeni K değeri değişebilir. Eski Q=K eşitliği yeni sıcaklıkta otomatik denge garantisi değildir; eski karışım yeni denge oranıyla sınanır.",
          "Kap sabit hacimli ve madde eklenmemişse sıcaklık değişiminin ideal ani anında n/V derişimleri aynı kalır. Bu yüzden Qc ilk anda aynı olabilirken Kc değişir. Hızlı ısıl eşitlenmeden sonraki net dönüşüm yeni derişimlere götürür; sıcaklığın tek başına aynı anda mol eklediğini çizme.",
        ],
      },
      {
        title: "Verilen tabloyu bir model verisi olarak kullan",
        paragraphs: [
          "Etkileşimde X⇌Y için kurmaca ama açık bir K(T) tablosu verilir. Isı alan ileri modelde 300,325,350 K için K değerleri 1,2,4; ısı veren ileri modelde 4,2,1'dir. Bu sayılar belirli bir gerçek kimyasalın deneysel ölçümü diye sunulmaz.",
          "İlk karışım 325 K'de X 1, Y 2 M ile dengededir. T 350 K ve ileri ısı alan model seçilince yeni K 4 olur; anlık Q 2<K 4. Toplam 3 M ve yeni oran 4 birlikte kullanılarak X 0,60, Y 2,40 M bulunur. Tablo okumak ile son miktarı hesaplamak böyle bağlanır.",
        ],
        table: {
          headers: ["T (K)", "İleri ısı alır K", "İleri ısı verir K"],
          rows: [
            ["300", "1", "4"],
            ["325", "2", "2"],
            ["350", "4", "1"],
          ],
        },
      },
      {
        title: "Yeni dengeyi oran ve toplamdan bul",
        paragraphs: [
          "X⇌Y için toplam derişim Ctop korunmuşsa [X]+[Y]=Ctop ve [Y]=K[X] iki denklemi kurulabilir. Böylece [X]=Ctop/(1+K),[Y]=K·Ctop/(1+K) bulunur. K büyüdükçe aynı toplam içinde Y payı artar; bütün Y'nin zorunlu tek anda oluştuğu söylenmez.",
          "Bu hesap 1:1 katsayılar ve sabit hacim için geçerlidir. X₂⇌2X gibi farklı katsayıda molekül toplamı korunmaz; uygun atom stoku ve ICE hesabı gerekir. Etkileşimde kullanılan basit toplamı bütün dengelere kopyalamak yerine her denklem için korunanı seç.",
        ],
      },
      {
        title: "İki hız artarken oran azalabilir",
        paragraphs: [
          "Sıcaklık değişimi ileri ve geri hızları ayrı ayrı etkileyebilir. Açık iki doğrusal hız yasasıyla verilen X⇌Y modelinde K=kileri/kgeri olur. İleri k 0,6'dan 1,2'ye, geri k 0,3'ten 0,9'a çıkarsa ikisi de büyür fakat oran 2'den 4/3'e iner.",
          "Bu örnek, ısınınca denge geri kayıyorsa ileri tepkime kesin yavaşlamıştır düşüncesini düzeltir. Başlangıç karışımı yeni K'ye göre değerlendirilir. Genel çok basamaklı tepkimelerin net hız üsleri bilinmeden K'yi rastgele iki katsayının oranı saymak yerine burada verilen basit yasaya dayanırız.",
        ],
      },
      {
        title: "Katalizör sıcaklık düğmesinin aynısı değil",
        paragraphs: [
          "Sabit sıcaklıkta uygun katalizör aynı dengeye daha hızlı ulaşmayı sağlayabilir; K ve denge bileşimini değiştirmez. Basit modelde iki yönün katsayısı aynı çarpanla artırıldığında oran korunur. Sıcaklık değişiminde ise ileri/geri katsayıların oranının değişmesi mümkün olabilir.",
          "Grafikte bir katalizör eylemi için yeni bir son oran icat etme. Katalizörlü eğri aynı son değere daha çabuk yaklaşabilir; sıcaklık müdahalesinin son değeri farklı olabilir. Hızın zamana yayılması ile denge hedefinin değişmesi iki ayrı kontrol olarak öğretilir.",
        ],
      },
      {
        title: "Ters denklemle kıyas yaparken",
        paragraphs: [
          "X⇌Y için K ileri verilmişse Y⇌X yönünün sabiti 1/K olur. Q da ters bağıntıda 1/Q'dur. Ters K'yi ileri Q ile kıyaslamak farklı tanımları karıştırır. Her iki oran aynı yönde yazılırsa fiziksel net yön tutarlı çıkar.",
          "Örneğin ileri K 2 ve ileri Q 4 olduğunda geri yönde ilerleme beklenir. Ters bağıntıda K 0,50 ve Q 0,25 olur; bu kez ters denklemin ürün yönü aynı fiziksel dönüşümdür. Sıcaklık tablosunu ters çevirirken bütün satırlarda 1/K işlemi yapılır.",
        ],
      },
      {
        title: "Kc ve Kp'nin sıcaklık köprüsü",
        paragraphs: [
          "İdeal gazların lise sayısal gösteriminde Kp=Kc(RT)^Δn kullanılır. Sıcaklık değişirken RT çarpanı da değişir. Δn=0 olan modelimizde bu ek çarpan birdir; bu yüzden oran tablosu ile ısı yönünü ilişkilendirmek doğrudan yapılır.",
          "Daha genel nicel hesapta standart etkinlik K'si ile birim seçimine bağlı Kc/Kp sayılarını ayırmak gerekir. Özellikle Δn sıfır değilken termodinamik sıcaklık bağıntısını Kc'ye dönüşümsüz kopyalama. Bu derste temel yön hesabı verilen aynı bağıntı/T tablosundan yapılır; ileri nicel yasa için ek termodinamik veri gerekir.",
        ],
      },
      {
        title: "Grafikte etkiyi kanıtıyla göster",
        paragraphs: [
          "Sabit V deneyinde sıcaklık değiştiği dikey çizgide tür derişimleri ilk anda sıçramaz; eğriler daha sonra yeni oranlara ilerler. K çizgisi ise T tablosu değiştiği için başka değere geçer. Q eğrisiyle K hedefini aynı şey sanmamak bu görüntüyü açıklamayı kolaylaştırır.",
          "Önce sıcaklık ve enerji yönünden tahmin yap, sonra anlık Q'yu ve yeni K'yi karşılaştır. Son bileşimi toplam ve oranla denetle. Modelin belirttiği sabit hacim, çapraz tepkime yokluğu ve ideal yaklaşımın sınırlarını koruyarak yeni bir tabloya aynı çözüm yolunu aktarabilirsin.",
        ],
      },
    ],
    examples: [
      {
        title: "Denge kesrinden ilk yön",
        prompt:
          "X⇌Y için aynı T'de Kc=2. Anlık X 2 M, Y 1 M. Net yön ve bu verinin sınırı?",
        strategy: "Aynı bağıntıda Q hesapla, sonra K ile kıyasla.",
        steps: [
          {
            label: "Q",
            explanation: "Qc=[Y]/[X]=1/2=0,50.",
          },
          {
            label: "Yön",
            explanation: "0,50<2 olduğundan net ürün yönü.",
          },
          {
            label: "Sınır",
            explanation:
              "Son miktar için toplam stok ve kap koşulu ayrıca gerekir; yön tek başına hepsini vermez.",
          },
        ],
        answer: "Ürünlere net dönüşüm.",
        check: "Q'nun ürün/giren yönü K ile aynıdır.",
        pitfall: "K'yi o anki karışım oranı sanmak.",
      },
      {
        title: "Isıtınca aynı karışım dengede kalmaz",
        prompt:
          "Sabit hacimli X⇌Y modelinde 325 K'de X 1, Y 2 M dengede. Isı alan ileri modelin K 350=4; madde eklenmeden 350 K'ye geçiliyor. Yeni denge?",
        strategy: "Ani Q'yu koru; yeni K ve toplamı kullan.",
        steps: [
          {
            label: "Ani",
            explanation:
              "Derişimler ilk anda 1 ve 2 M; Q 2. Yeni K 4 olduğundan ürün yönü.",
          },
          {
            label: "İki denklem",
            explanation: "X+Y=3 ve Y=4X.",
          },
          {
            label: "Son",
            explanation: "5X=3 →X 0,60 M, Y 2,40 M.",
          },
        ],
        answer: "X 0,60; Y 2,40 M.",
        check: "2,40/0,60=4; toplam 3 M.",
        pitfall: "Eski K 2'yi yeni sıcaklıkta kullanmak.",
      },
      {
        title: "İki hız katsayısı da artıyor",
        prompt:
          "Tek basamaklı X⇌Y için vi=ki[X], vg=kg[Y]. T 1'de ki 0,6, kg 0,3; T 2'de ki 1,2, kg 0,9 s⁻¹. K ve denge yorumu?",
        strategy: "İki sıcaklıkta oranları ayrı al.",
        steps: [
          {
            label: "İlk",
            explanation: "K 1=0,6/0,3=2.",
          },
          {
            label: "Son",
            explanation: "K 2=1,2/0,9=4/3.",
          },
          {
            label: "Yorum",
            explanation:
              "Her iki k artmış ama denge Y/X oranı azalmıştır; hızlılık ve son oran aynı şey değildir.",
          },
        ],
        answer: "K 2→4/3 azalır; iki k yine artabilir.",
        check: "Hız yasaları kökte açık verilmiştir.",
        pitfall: "Geri kayma varsa ileri k mutlaka azaldı demek.",
      },
      {
        title: "Ters yönde tabloyu yeniden yaz",
        prompt:
          "X⇌Y için K 300=4, K 350=1 verilmiş. Aynı sıcaklıklarda Y⇌X için değerler ve ısınınca desteklenen fiziksel yön?",
        strategy: "Her satırın tersini al, kimyasal yönü açık adlandır.",
        steps: [
          {
            label: "Ters K",
            explanation: "Y⇌X için 300 K'de 1/4,350 K'de 1.",
          },
          {
            label: "Kıyas",
            explanation: "Ters yöndeki ürün/giren oranı sıcaklıkla büyür.",
          },
          {
            label: "Yön",
            explanation:
              "Isıtma X oluşumunu destekler; bu ileri X⇌Y denkleminde giren yönüdür.",
          },
        ],
        answer: "0,25 ve 1; X oluşumu desteklenir.",
        check: "Her sıcaklıkta ileri K×ters K=1.",
        pitfall: "Denklem yönünü değiştirip aynı K sayılarını bırakmak.",
      },
    ],
    recall: [
      {
        prompt: "Qc ile Kc hangi şartta kıyaslanır?",
        answer: "Aynı tepkime yönü/bağıntı ve belirtilen sıcaklık koşulunda.",
      },
      {
        prompt: "Sabit V'de T değişince ilk Qc?",
        answer:
          "Madde eklenmiyorsa n/V ilk anda aynı kalabilir; yeni Kc farklı olabilir.",
      },
      {
        prompt: "Isı bir derişim terimi mi?",
        answer: "Hayır; [ısı] K veya Q bağıntısına eklenmez.",
      },
      {
        prompt: "Ters yönde K ve Q?",
        answer:
          "İkisi de tersine döner; farklı yön tanımlarını doğrudan kıyaslama.",
      },
    ],
    items: [
      [
        "İdeal X⇌Y için aynı T'de Kc=2, anlık [X]=0,50, [Y]=1,00 M. Yorum?",
        "Qc=2; denge koşulu sağlanır",
        [
          "Qc=0,50; ürünlere",
          "Qc=2; kesin bütün olaylar durmuştur",
          "Qc=1; girenlere",
          "Denge için X ve Y mutlaka eşit olmalı",
        ],
        "Ürün/giren oranı.",
        "Qc=1,00/0,50=2=Kc. Derişimler eşit değildir; dengede dönüşümler sürerken net değişim sıfır olabilir.",
      ],
      [
        "X⇌Y için Qc=4, Kc=2 aynı T ve yönde verilmiş. İlk net yön?",
        "Girenlere",
        [
          "Ürünlere",
          "Kesin dengede",
          "Kc kendiliğinden 4 olur",
          "Yalnız toplam molün tek/çift oluşuna bağlı",
        ],
        "Q>K karşılaştırması.",
        "Karışımın ürün/giren oranı denge oranından büyüktür. Net geri dönüşüm Q'yu düşürecek yöndedir; K aynı T'de değişmez.",
      ],
      [
        "İdeal X⇌Y modelinde Δngaz=0 ve ileri dönüşüm endotermik. Aynı koşul aralığında sıcaklık artınca verilen K tablosu nasıl bir eğilimle uyumludur?",
        "K'nin artmasıyla",
        [
          "K'nin zorunlu sıfırlanmasıyla",
          "K'nin her zaman aynı kalmasıyla",
          "K'ye sıcaklığın gram olarak eklenmesiyle",
          "Yalnız katalizör eklemekle aynı etkiyle",
        ],
        "Isı alan yönü düşün.",
        "Bu açık ideal 1:1 modelde ısıtma ürün oranını destekler ve K artar. Isı bağıntıya derişim olarak eklenmez; farklı K tanımlarında ek dönüşüm koşulları gerekir.",
      ],
      [
        "İdeal X⇌Y, Δngaz=0; ileri dönüşüm ekzotermik. T artışını K bakımından destekleyen tablo?",
        "T yükselirken K'nin azalması",
        [
          "T yükselirken K'nin kesin artması",
          "K'nin bir hız birimi saniye olması",
          "K'nin her sıcaklıkta zorunlu 0 olması",
          "K'yi ürün gramlarına eşitlemek",
        ],
        "Isı veren ileri yönün tersi desteklenir.",
        "Seçili ideal modelde ısıtma giren yönünü destekleyebilir; ürün/giren denge oranı azalır. Bu, ileri hızın mutlaka azalması demek değildir.",
      ],
      [
        "Sabit hacimli kapta madde eklemeden T değiştiriliyor. Anlık mol miktarları henüz tepkimeyle değişmedi. Qc ve Kc için uygun ifade?",
        "Qc ilk anda aynı kalabilir; yeni T için Kc değişebilir",
        [
          "Qc mutlaka iki kat olur",
          "Kc her müdahalede aynı kalmak zorundadır",
          "T artışı her türden anında bir mol ekler",
          "Qc yalnız kap rengidir",
        ],
        "Qc derişim; Kc yeni sıcaklık koşulu.",
        "n ve V ilk anda aynıysa derişimler ve Qc aynı kalır. Yeni T'nin Kc değeri farklı olabilir; net dönüşüm bundan sonra yeni oranlara götürür.",
      ],
      [
        "Aynı tepkime yazılışı için verilen temel ideal modelde hangisi doğrudan yeni K(T) değeri gerektirebilir?",
        "Sıcaklığı değiştirmek",
        [
          "Sabit T'de yalnız reaktif eklemek",
          "Sabit T'de yalnız ürün çekmek",
          "Sabit T'de uygun katalizör eklemek",
          "Sabit T'de ideal inert gazı sabit V'de eklemek",
        ],
        "Karışım oranı ile denge sabiti farklı.",
        "Diğer eylemler aynı T'de K'yi değiştirmez; Q veya yaklaşma süresi farklı olabilir. Yeni sıcaklık için verilen denge tablosu yeniden okunmalıdır.",
      ],
      [
        "X⇌Y için kurmaca ideal 1:1 model tablosu K 300=1, K 325=2, K 350=4. Bu aralıktaki eğilim hangi yorumla uyumludur?",
        "İleri dönüşümün ısı alan yön olmasıyla",
        [
          "K'nin her noktada aynı kalmasıyla",
          "İleri yönün ısı veren olduğu seçili tabloyla",
          "K'nin yalnız tepkime hızı olmasıyla",
          "Hiç atom korunmamasıyla",
        ],
        "Sıcaklık arttıkça ürün oranı büyüyor.",
        "Tabloda K düzenli artıyor; seçili ideal 1:1 modelde ısıtma ürün yönünü destekler. Tablo belirli gerçek kimyasalın ölçümü değil verilen eğitim verisidir.",
      ],
      [
        "İleri X⇌Y için aynı T'de K=2, Q=4. Ters Y⇌X için K ve Q sırasıyla?",
        "0,50 ve 0,25",
        ["2 ve 4", "0,25 ve 0,50", "4 ve 2", "1 ve 1"],
        "İki bağıntıyı da ters çevir.",
        "Kters=1/2=0,50; Qters=1/4=0,25. Ters denklemde Q<K ürün yönü, fiziksel olarak X oluşumu; ileri denklemdeki geri yönle tutarlıdır.",
      ],
      [
        "Sabit V'de ideal X⇌Y için toplam derişim 3 M ve yeni sıcaklıkta K=4. Denge[X],[Y]?",
        "0,60 ve 2,40 M",
        [
          "1,50 ve 1,50 M",
          "1,00 ve 2,00 M",
          "2,40 ve 0,60 M",
          "0,75 ve 2,25 M",
        ],
        "Y=4X ve X+Y=3.",
        "5X=3 olduğundan X 0,60 ve Y 2,40 M. Oran 4 ve toplam 3 birlikte sağlanır; yalnız toplamı ikiye bölmek doğru değildir.",
      ],
      [
        "X⇌Y için verilen vi=ki[X], vg=kg[Y]. T artınca ki 0,6→1,2 ve kg 0,3→0,9 s⁻¹ oluyor. Hangi sonuç doğrudur?",
        "İki k artarken K 2'den 4/3'e azalabilir",
        [
          "İki k arttığı için oran zorunlu değişmez",
          "K=ki+kg olduğundan 3 olur",
          "İleri k kesin azalmıştır",
          "Bu sayılar yalnız eşit derişimde kullanılabilir",
        ],
        "Verilen basit modelde K=ki/kg.",
        "İlk oran 0,6/0,3=2; son 1,2/0,9=4/3. Geri katsayı daha büyük çarpanla artmıştır; iki hızın artması oran artışı gerektirmez.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 72–75; OGM Denge Cepte PDF 11–12 ve Denge Faktörleri sunu PDF 2–3/8–11 gerçek anlatımlarıyla karşılaştırılmış özgün içerik. K(T) sayıları açık kurmaca 1:1 ideal modeldir; resmî sınav sorusu değildir.",
  },
];
const extension019: ChemistryUnit019 = {
  id: "kimyasal-denge",
  topic: "detail-426",
  title: "Dengeyi derinleştir: stok, kanıt ve tutarlılık",
  minutes: 45,
  objectives: [
    "Durağan durum ile gerçek kimyasal dengeyi ayır.",
    "Saf faz stokunu ve döngüsel K verilerinin tutarlılığını denetle.",
    "Yaklaşık hesap ve ölçüm sonucunun sınırını açıkla.",
  ],
  sections: [
    {
      title: "Q/K oranının enerji anlamı",
      paragraphs: [
        "Dengeye hangi yönden yaklaşıldığını açıklamak için Q/K oranı yararlıdır. Uygun termodinamik etkinlik gösteriminde ΔrG=RT·ln(Q/K) verildiğinde Q<K için bu fark negatiftir ve yazılı ileri yöndeki dönüşüm desteklenir. Q=K olduğunda net kimyasal itici fark sıfırdır.",
        "Bu ilişki yön açıklamasıdır; tek başına kaç saniyede dönüşüm olacağını söylemez. Örneğin Q/K=1/4 için logaritma negatiftir, fakat geçiş engeli yüksekse gözlenebilir dönüşüm yavaş olabilir. İlk konu gövdesindeki hız ve denge ayrımı burada enerji ve oran arasında köprü kurar.",
      ],
    },
    {
      title: "Etkinlik bir referansa göre karşılaştırmadır",
      paragraphs: [
        "Daha genel denge ifadesi türlerin etkinliklerini kullanır; ideal çözeltide [i]/c° ve ideal gazda Pi/p° gibi referans oranlarına yaklaşılabilir. Böylece termodinamik K boyutsuzdur. Lise sorusunun Kc ve Kp sayıları ise belirtilen derişim/basınç gösterimiyle hesaplanır.",
        "Örneğin saf katı için etkinliğin bir alınması onun sıfır mol olduğu anlamına gelmez. Saf faz miktarı stok hesabında kalır. Verinin hangi sıcaklık, referans ve denklem yönüne ait olduğunu yazmak, farklı kitap tablolarını rastgele aynı denklemde birleştirme hatasını önler.",
      ],
    },
    {
      title: "Korunan bileşenleri matris gibi izle",
      paragraphs: [
        "X₂⇌2X'te 2n(X₂)+n(X) korunur; X+Y⇌XY'de iki ayrı stok n(X)+n(XY) ve n(Y)+n(XY) korunur. Katsayılar, her türün taşıdığı atom veya bileşenin sayısını gösterir. Toplam molekül sayısı değişse bile bu stoklar kapalı sistemde kaybolmaz.",
        "Bir hesapta önce her türün bileşen içeriğini küçük tabloya yazabilirsin. Son miktarlardan bulunan bileşen toplamları başlangıçla eşleşmelidir. Bu ikinci denetim, yalnız K oranına uyan ama kabın içinde olmayan atomlar yaratmış yanlış çözümleri yakalar.",
      ],
      table: {
        headers: ["Tür", "X bileşeni", "Y bileşeni"],
        rows: [
          ["X", "1", "0"],
          ["Y", "0", "1"],
          ["XY", "1", "1"],
        ],
      },
    },
    {
      title: "Durağan açık kap her zaman denge değildir",
      paragraphs: [
        "Bir açık kapta besleme ve uzaklaştırma, tür miktarlarını sabit tutabilir. Bu durağan durumdur; ileri ve geri kimyasal hızların eşit olması zorunlu değildir. Kapalı dengede dış besleme olmadan net kimyasal değişim sıfırdır; iki deneyin görünür sabitliği aynı nedenden gelmeyebilir.",
        "Örneğin X→Y yönü 6, Y→X yönü 4 mmol/s ise net 2 mmol/s ileri dönüşüm vardır. Dışarıdan 2 mmol/s X verilip 2 mmol/s Y çekildiğinde kap miktarları sabit kalabilir. Yalnız yatay derişim grafiği, dış akış bilgisi olmadan gerçek dengeyi kesin kanıtlamaz.",
      ],
    },
    {
      title: "Tanecik değişimi sürerken miktar sabit kalır",
      paragraphs: [
        "Kimyasal özelliği değiştirmediği varsayılan bir izleme işaretiyle molekülün hangi tarafta olduğunu takip edebilirsin. Dengede işaretli tanecikler bir türden ötekine geçebilir; aynı anda ters geçişler toplam miktarı korur. Gözlenen sabit oran, bütün taneciklerin yerinde kilitlendiği anlamına gelmez.",
        "Bu düşünce deneyi etiketin kimyasal veya izotop etkisinin ihmal edildiği açık varsayıma dayanır. İşaretleme toplam tür miktarını değiştiriyorsa artık ayrı bir müdahale hesabı gerekir. Amaç sabit makroskopik sayı ile süren mikroskopik olayın birlikte nasıl mümkün olduğunu açıklamaktır.",
      ],
    },
    {
      title: "Bir saf faz tükendiğinde stok sınırı",
      paragraphs: [
        "CaCO₃(katı)⇌CaO(katı)+CO₂(gaz) için iki saf katı birlikte sürerken gazın denge basıncı Kp ile belirlenebilir. Fakat küçük bir CaCO₃ örneği istenen gaz stoğunu üretemeden tükenebilir. Bu durumda aynı iki-katı eşitliğini elde kalmayan bir fazı var sayarak zorlamak doğru değildir.",
        "Örneğin Kp 0,20 atm, V 1 L, RT 25 L·atm/mol için hedef gaz 0,008 mol gerektirir. Başlangıç CaCO₃ yalnız 0,001 mol ve başka CO₂ kaynağı yoksa en çok 0,001 mol gaz oluşabilir. Bu, bütün denge kavramının yokluğu değil, bu özel faz-birlikteliği modelinin koşulunun sağlanmamasıdır.",
      ],
    },
    {
      title: "Bir K döngüsü kendi içinde tutarlı olmalı",
      paragraphs: [
        "Aynı T'de X⇌Y için K 2 ve Y⇌Z için K 3 verilirse X⇌Z için K 6 olur. Bunun tersi Z⇌X için 1/6'dır. Bir kapalı denklem döngüsünün toplamı hiçbir net dönüşüm yapmıyorsa uygun K çarpımı bir olmalıdır.",
        "Bu, verilen sayıları bağımsız denetlemenin yoludur. Aynı koşullar iddia edilip üçüncü değer 1/5 yazılmışsa çarpım 2×3×1/5=1,2 olur; veriler tek bir tutarlı denge oranı takımı vermez. Önce sıcaklık veya denklem yönü farkı olup olmadığını araştır; uymayan veriyi zorla doğru sonuç yapma.",
      ],
    },
    {
      title: "Yaklaşık küçük değişimi geri yerine koy",
      paragraphs: [
        "Bazı zayıf dönüşüm hesaplarında paydadaki başlangıç−x yaklaşık başlangıç alınır. Bu hesap işlemi kolaylaştırabilir fakat sonuç bulunduktan sonra yaklaşım sınanmalıdır. x'in başlangıç stoğuna oranı ve tam K bağıntısına geri yerleştirme birlikte incelenir.",
        "Örneğin x/(1−x)=0,01 denkleminde ilk yaklaşım x≈0,01 verir; tam çözüm x=0,01/1,01≈0,00990099'dur. Yaklaşık değerin Q'su 0,01/0,99≈0,010101 olur. Verilen hata toleransı olmadan yuvarlanmış değeri tam matematiksel eşitlik diye sunma.",
      ],
    },
    {
      title: "Ölçüm ve yuvarlama kanıtı nasıl sınırlar?",
      paragraphs: [
        "Bir tabloda X 1,00 ve Y 2,00 yazılması değerlerin o basamaklara yuvarlandığını gösterebilir. Ölçümün belirsizliği bilinmeden küçük bir oran farkından kesin büyük denge bozulması çıkarmak uygun değildir. Kuramsal tam sayılarla modellenmiş örnek ile gerçek ölçüm farklı kanıt türleridir.",
        "Uygulamanın hesap modelinde kullanılan tam girdiler ve sonuçtaki gösterim basamakları ayrılır. Öğrenci ekrandaki yuvarlak sayıları tekrar bölünce çok küçük fark görebilir; sayısal artık ve korunum bu yüzden aynı kaynak hesap üzerinden denetlenir. Yaklaşık çizilen eğri de ölçülmüş gerçek zaman kinetiği diye etiketlenmez.",
      ],
    },
  ],
  examples: [
    {
      title: "Sabit miktar, eşit olmayan kimyasal hız",
      prompt:
        "Açık kapta X→Y 6 ve Y→X 4 mmol/s. Ayrıca 2 mmol/s X beslenip 2 mmol/s Y çekiliyor. Tür miktarları sabit olabilir mi; kimyasal denge mi?",
      strategy: "Kimyasal ve dış akışları iki ayrı sütunda topla.",
      steps: [
        {
          label: "X bilançosu",
          explanation: "−6+4+2=0 mmol/s.",
        },
        {
          label: "Y bilançosu",
          explanation: "+6−4−2=0 mmol/s.",
        },
        {
          label: "Yorum",
          explanation:
            "Miktarlar durağandır ama ileri 6 ve geri 4 eşit değildir; bu kimyasal denge kanıtı değildir.",
        },
      ],
      answer: "Sabit olabilir; açık durağan durumdur.",
      check: "Dış akışlar kaldırılırsa net 2 mmol/s dönüşüm görünür.",
      pitfall: "Her yatay derişim çizgisini dengedir saymak.",
    },
    {
      title: "İki katılı denge için yetersiz madde",
      prompt:
        "CaCO₃⇌CaO+CO₂ için iki katılı modelin Kp'si 0,20 atm. V 1 L, RT 25 L·atm/mol. Başlangıç CaCO₃ 0,001 mol; başka CO₂ yok. Bu basınca yetecek gaz üretilebilir mi?",
      strategy: "Gerekli gaz ile mümkün gazı karşılaştır.",
      steps: [
        {
          label: "Gerekli",
          explanation: "nCO₂=P V/(RT)=0,20/25=0,008 mol.",
        },
        {
          label: "Mümkün",
          explanation:
            "Katsayı 1:1 olduğundan tüm CaCO₃ dönüşse en çok 0,001 mol gaz.",
        },
        {
          label: "Sınır",
          explanation:
            "Maksimum P=0,001×25/1=0,025 atm; 0,20'den küçük. İki katının birlikte kaldığı eşitlik koşulu kurulamaz.",
        },
      ],
      answer: "Hayır; seçili faz-birlikteliği koşulu sağlanmaz.",
      check: "Eksik maddeyi denge sabiti yaratmaz.",
      pitfall: "K'ye uydurmak için başlangıçtan fazla CaCO₃ tüketmek.",
    },
    {
      title: "Döngüyü kapatan oran",
      prompt: "Aynı T'de X⇌Y için K 2, Y⇌Z için K 3. Z⇌X için tutarlı K nedir?",
      strategy: "Önce ileri zinciri, sonra tersini yaz.",
      steps: [
        {
          label: "Zincir",
          explanation: "X⇌Z için K=2×3=6.",
        },
        {
          label: "Ters",
          explanation: "Z⇌X için 1/6.",
        },
        {
          label: "Kontrol",
          explanation: "Döngü çarpımı 2×3×1/6=1; net denklem sıfırdır.",
        },
      ],
      answer: "1/6.",
      check: "Y/X=2 ve Z/Y=3 ise X/Z=1/6.",
      pitfall: "Döngüdeki bütün K değerlerini toplamak.",
    },
    {
      title: "Küçük x yaklaşımının gerçek artığı",
      prompt:
        "Verilen modelde x/(1−x)=0,01 ve 0≤x<1. x≈0,01 yaklaşımını tam sonuçla kıyasla.",
      strategy: "Tam doğrusal denklemi çöz ve yaklaşımı geri yerleştir.",
      steps: [
        {
          label: "Tam",
          explanation: "x=0,01−0,01x → 1,01x=0,01 → x≈0,00990099.",
        },
        {
          label: "Yaklaşık",
          explanation: "x=0,01 alınırsa Q=0,01/0,99≈0,010101.",
        },
        {
          label: "Fark",
          explanation:
            "Bu değer K 0,01'e yakındır fakat eşit değildir; kabul için hata sınırı ayrıca gerekir.",
        },
      ],
      answer: "Tam 0,00990099; yaklaşımın oran artığı yaklaşık 0,000101.",
      check: "Tam x ile x/(1−x)=0,01 elde edilir.",
      pitfall: "Küçük sözcüğünü hesap denetiminin yerine geçirmek.",
    },
  ],
  recall: [
    {
      prompt: "Durağan miktar tek başına denge mi?",
      answer:
        "Hayır; açık besleme/çıkış sabitliği sağlayabilir. Kimyasal ileri/geri hızlar ayrıca değerlendirilir.",
    },
    {
      prompt: "Saf faz tükenirse ne yapılır?",
      answer:
        "Stok sınırı ve yeni faz koşulu incelenir; eksik faz varmış gibi eşitlik zorlanmaz.",
    },
    {
      prompt: "Kapalı denklem döngüsünde K çarpımı?",
      answer: "Aynı T ve tutarlı yön/ölçeklerde 1.",
    },
    {
      prompt: "Yaklaşık x nasıl denetlenir?",
      answer:
        "Tam bağıntıya geri yerleştirme, stok aralığı ve verilen hata sınırıyla.",
    },
  ],
  items: [
    [
      "Açık kapta X→Y 6, Y→X 4 mmol/s; ayrıca 2 mmol/s X giriş ve 2 mmol/s Y çıkış var. Miktarlar sabitse doğru yorum?",
      "Durağan durum olabilir; eşit kimyasal hız kanıtı değildir",
      [
        "İleri ve geri hızlar zorunlu eşittir",
        "Net kimyasal hız kesin 0'dır",
        "Dış akışları bilmek hiçbir zaman gerekmez",
        "Kimyasal denge için 6=4 olmalıdır ve bu doğrudur",
      ],
      "Dış ve kimyasal akışları ayrı topla.",
      "X için −6+4+2=0, Y için +6−4−2=0. Miktarlar sabit ama ileri 6 ve geri 4 farklı; açık durağanlık kapalı kimyasal dengeyle aynı değildir.",
    ],
    [
      "Dengede izleme işareti taneciklere ekleniyor; kimyasal özellik/derişim değişimi ihmal. İşaretli taneciklerin türler arasında değişmesi neyle uyumludur?",
      "Dinamik dengeyle; ters dönüşümler sürerken toplam miktarlar sabit olabilir",
      [
        "Bütün kimyasal dönüşümlerin kesin durmasıyla",
        "Her işaretin atomu yok etmesiyle",
        "Dengede hiçbir taneciğin tür değiştiremeyeceğiyle",
        "İleri hızın zorunlu geri hızdan büyük olmasıyla",
      ],
      "Makroskopik sayı ile tek taneciğin geçmişini ayır.",
      "İleri ve geri dönüşümler eşit ortalama hızlarla sürerse türlerin toplamı korunur. Etikete ait ihmal koşulu kökte açık; miktar değişimi ayrı müdahale olurdu.",
    ],
    [
      "CaCO₃(katı)⇌CaO(katı)+CO₂(gaz) için Kp=PCO₂ eşitliği kullanılıyor. Önemli faz koşulu hangisidir?",
      "İlgili iki saf katı fazın birlikte varlığını koruması",
      [
        "Katıların molünün her koşulda sonsuz olması",
        "CO₂'nin hiç bulunmaması",
        "Katıların bütün katsayılarının sıfır olması",
        "Sıcaklığın rastgele değişmesi",
      ],
      "Etkinliği sabit alma koşulunu düşün.",
      "Saf fazların etkinlikleri sabit alınır ama envanterleri sınırlıdır. Bir katı tamamen tükenirse aynı iki-faz eşitliği bütün koşullarıyla varsayılamaz.",
    ],
    [
      "İki katılı CaCO₃⇌CaO+CO₂ modeli için Kp 0,20 atm, V 1 L, RT 25 L·atm/mol. İlk CaCO₃ 0,001 mol ve başka CO₂ yok. Uygun stok kontrolü?",
      "Gerekli 0,008 mol gaz üretilemez; iki katı birlikte kalma koşulu sağlanmaz",
      [
        "Kp bütün eksik karbon atomlarını yaratır",
        "0,20 mol gaz kesin oluşur",
        "CaCO₃ miktarı her koşulda etkisizdir",
        "Bütün dengelerde basınç daima 0,20 atm olmak zorunda",
      ],
      "Hedef n=PV/RT ile başlangıç üst sınırını kıyasla.",
      "Hedef 0,20/25=0,008 mol; verilen CaCO₃ en çok 0,001 mol gaz sağlar. Stok biter; bu özel faz modeli uygun değildir, denge kavramının tümü yok olmaz.",
    ],
    [
      "Aynı T'de X⇌Y için K 2, Y⇌Z için K 3. Z⇌X için hangi değer döngüyle tutarlıdır?",
      "1/6",
      ["1/5", "6", "5", "2/3"],
      "Zincir çarpımı ve ters yön.",
      "X⇌Z için K 6, ters yönde 1/6 gerekir. Döngüde 2×3×1/6=1; aynı koşul iddiasıyla 1/5 verilse tutarsızlık olurdu.",
    ],
    [
      "X⇌Y için aynı T'de K 4, Q 16. Denklem 2X⇌2Y biçimine çevriliyor. Yeni K, Q ve fiziksel net yön?",
      "16,256; girenlere",
      [
        "8,32; ürünlere",
        "16,256; ürünlere",
        "2,4; dengede",
        "4,16; değişmeden aynı bağıntı",
      ],
      "Hem K hem Q yeni katsayıların üssünü alır.",
      "K'=4²=16, Q'=16²=256. Q'>K' olduğundan giren yönü; denklemi ölçeklemek fiziksel net yönü ters çevirmez.",
    ],
    [
      "Verilen etkinlik modelinde ΔrG=RT ln(Q/K), R, T pozitif. Q/K=1/4 ise yazılı ileri yön için ΔrG işareti?",
      "Negatif",
      [
        "Pozitif",
        "Kesin sıfır",
        "Sadece saniye birimli",
        "Q'nun rengi bilinmeden hiçbir matematiksel işaret seçilemez",
      ],
      "Birden küçük pozitif sayının logaritması.",
      "ln(1/4)<0; pozitif RT ile çarpılınca ΔrG negatiftir. Bu yön elverişliliğidir; kinetik hızın sayısal büyüklüğünü vermez.",
    ],
    [
      "x/(1−x)=0,01 için x≈0,01 alınıyor. Bu yaklaşımın tam bağıntı kontrolü hangisidir?",
      "Q≈0,010101; K'ye yakın ama tam eşit değil",
      [
        "Q her durumda kesin 0,01",
        "x küçük dendiği için kontrol yasaktır",
        "Q≈1,01 ve tamamen aynı şeydir",
        "Stok aralığı hiçbir önem taşımaz",
      ],
      "Bulduğun x'i asıl paydasıyla kullan.",
      "0,01/(1−0,01)=0,010101… olur. Tam çözüm 0,00990099…; kabul edilen hata sınırı ayrıca verilmelidir.",
    ],
    [
      "Açık verilen iki hız: vi=1,2[X], vg=0,6[Y]. Kapalı dengede Y/X oranı?",
      "2",
      ["0,5", "0,6", "1,2", "1,8"],
      "Eşit hız koşulunu bu verilen yasalara uygula.",
      "1,2[X]=0,6[Y] → [Y]/[X]=2. Bu oran açık doğrusal modelden çıkar; bütün net tepkimeler için koşulsuz k oranı genellemesi yapılmadı.",
    ],
    [
      "X(gaz)+Y(saf sıvı)⇌Z(gaz). T, V sabit; Y saf fazı son durumda da sürüyor. X eklenip net ileri dönüşüm oluyor. Y hakkında doğru ifade?",
      "Mol miktarı azalabilir; saf faz etkinliği yine 1 alınabilir",
      [
        "Y tepkimeye hiç katılmaz",
        "Y'nin miktarı bütün koşullarda değişemez",
        "Y sıfır mol olduğu için bağıntıdan çıkar",
        "Y'nin katsayısı atom korunumu hesabında yok sayılır",
      ],
      "Denge bağıntısı ile stok hesabı farklıdır.",
      "İleri dönüşüm Y tüketebilir. Saf faz etkinliği sabit kabul edildiği için ayrı derişim terimi yazılmaması, molünün değişmediği anlamına gelmez; fazın sürdüğü öncülü önemlidir.",
    ],
  ],
  source:
    "MEBİ AYT Kimya PDF 70–75; OGM Denge Cepte PDF 10–12 ve Denge Faktörleri sunu PDF 2–17 gerçek anlatımları temel alınarak hazırlanmış yeni özgün derinleşme bölümleri, koşullu düşünce deneyleri ve hesaplar. Etkinlik/akış/sonlu faz örnekleri açık model koşullarıdır; resmî sınav sorusu değildir.",
};

function chemistryQuestion019(
  unit: ChemistryUnit019,
  item: ChemistryUnit019["items"][number],
  index: number,
  familyIndex: number,
): Question {
  const [prompt, correct, wrong, hint, explanation] = item;
  if (wrong.length !== 4 || new Set([correct, ...wrong]).size !== 5)
    throw Error("CHEMISTRY_019_CHOICES");
  const answer = (index + 2 * familyIndex) % 5,
    choices = [...wrong];
  choices.splice(answer, 0, correct);
  return {
    id: "f019-chem-" + unit.id + "-" + (index + 1),
    prompt: txt(prompt),
    options: choices.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: "f019-chem-" + unit.id + "-" + (index + 1),
  };
}
function chemistryLesson019(unit: ChemistryUnit019, index: number): Lesson {
  return {
    id: unit.id,
    subjectId: "ayt-kimya",
    title: txt(unit.title),
    minutes: unit.minutes,
    objectives: unit.objectives.map(txt),
    body: unit.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join(" ")),
    })),
    questions: unit.items.map((q, i) =>
      chemistryQuestion019(unit, q, i, index),
    ),
    source: txt(unit.source),
    tags: ["kaynakli", "etkilesimli", "forge019"],
  };
}
export const forge019ChemistryGuides: LessonGuide[] = data019.map(
  ({ topic: _topic, title: _title, items: _items, ...guide }) => guide,
);
export const forge019ChemistryGuideExtensions: Pick<
  LessonGuide,
  "id" | "sections" | "examples" | "recall" | "source"
>[] = [
  {
    id: "kimyasal-denge",
    sections: extension019.sections,
    examples: extension019.examples,
    recall: extension019.recall,
    source: extension019.source,
  },
];
const advancedQuestionSet019: Lesson = {
  id: "kimyasal-denge-ileri",
  subjectId: "ayt-kimya",
  title: txt("Kimyasal denge: ileri uygulama soruları"),
  minutes: 30,
  objectives: [
    txt(
      "Dengeyi stok, kanıt ve oran tutarlılığıyla sınayan özgün soruları çöz.",
    ),
  ],
  body: [],
  questions: extension019.items.map((q, i) =>
    chemistryQuestion019(
      { ...extension019, id: "kimyasal-denge-ileri" },
      q,
      i,
      8,
    ),
  ),
  source: txt(extension019.source),
  tags: ["kaynakli", "forge019", "soru-seti"],
};
export const forge019ChemistryLessons: Lesson[] = [
  ...data019.map(chemistryLesson019),
  advancedQuestionSet019,
];
export const forge019ChemistryTopics: Record<string, string> = {
  ...Object.fromEntries(data019.map((d) => [d.id, d.topic])),
  "kimyasal-denge-ileri": "detail-426",
};
