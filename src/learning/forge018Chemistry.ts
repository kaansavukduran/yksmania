import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide, WorkedExample } from "./guides/types";

const finite018 = (...values: number[]) => values.every(Number.isFinite);
export const gasR018 = 0.082;
export const kineticR018 = 8.314;
export function kinetic018(
  temperature: number,
  molarMass: number,
  pressure: number,
) {
  if (
    !finite018(temperature, molarMass, pressure) ||
    temperature < 100 ||
    temperature > 800 ||
    molarMass < 2 ||
    molarMass > 100 ||
    pressure < 0.1 ||
    pressure > 5
  )
    throw new RangeError("KINETIC_018");
  return {
    temperature,
    molarMass,
    pressure,
    rms: Math.sqrt((3000 * kineticR018 * temperature) / molarMass),
    translationPerMol: 1.5 * kineticR018 * temperature,
    density: (pressure * molarMass) / (gasR018 * temperature),
  };
}
/** Pure-water equilibrium model at 300 K, given rounded Psat=0.035 atm; dry gas ideal, insoluble and nonreacting. */
export function wetGas018(volume: number, dryMol: number, totalWater: number) {
  if (
    !finite018(volume, dryMol, totalWater) ||
    volume < 1 ||
    volume > 4 ||
    dryMol < 0 ||
    dryMol > 0.2 ||
    totalWater < 0 ||
    totalWater > 0.02
  )
    throw new RangeError("WET_GAS_018");
  const rt = gasR018 * 300,
    saturation = 0.035,
    requiredWater = (saturation * volume) / rt;
  const difference = totalWater - requiredWater,
    tolerance = 32 * Number.EPSILON * Math.max(totalWater, requiredWater);
  const atBoundary = Math.abs(difference) <= tolerance;
  const liquid = difference > tolerance ? difference : 0;
  const vapour = totalWater - liquid;
  const waterPressure =
    atBoundary || liquid > 0 ? saturation : (vapour * rt) / volume;
  const dryPressure = (dryMol * rt) / volume;
  const regime: "liquid" | "saturated" | "unsaturated" =
    liquid > 0 ? "liquid" : atBoundary ? "saturated" : "unsaturated";
  return {
    volume,
    dryMol,
    totalWater,
    requiredWater,
    vapour,
    liquid,
    waterPressure,
    dryPressure,
    totalPressure: dryPressure + waterPressure,
    regime,
    saturation,
    temperature: 300,
  };
}
/** Authored given single-phase example: n=1 mol, V=20 L, T=300 K. Not an experimental equation of state. */
export function realGas018(measuredPressure: number) {
  if (
    !Number.isFinite(measuredPressure) ||
    measuredPressure < 0.8 ||
    measuredPressure > 1.6
  )
    throw new RangeError("REAL_GAS_018");
  const idealPressure = (gasR018 * 300) / 20,
    z = measuredPressure / idealPressure;
  return {
    measuredPressure,
    idealPressure,
    z,
    difference: measuredPressure - idealPressure,
  };
}
export const phaseStates018 = [
  {
    id: "solid",
    label: "−90 °C, 1 atm",
    temperature: -90,
    pressure: 1,
    phase: "Katı",
    proof:
      "Sabit 1 atm yolunda CO₂, verilen −78,5 °C süblimleşme sınırının altında katıdır.",
  },
  {
    id: "coexist",
    label: "−78,5 °C, 1 atm",
    temperature: -78.5,
    pressure: 1,
    phase: "Katı ve buhar dengesi",
    proof:
      "Verilen yaklaşık süblimleşme sınırında iki faz dengede olabilir; yalnız sıcaklık fazların miktarını vermez.",
  },
  {
    id: "vapour",
    label: "20 °C, 20 atm",
    temperature: 20,
    pressure: 20,
    phase: "Buhar",
    proof:
      "Bu verilmiş örnek gaz fazındadır ve sıcaklık kritik değerin altındadır. Uygun basınç artışıyla yoğuşma mümkündür.",
  },
  {
    id: "liquid",
    label: "20 °C, 60 atm",
    temperature: 20,
    pressure: 60,
    phase: "Sıvı",
    proof:
      "Bu verilmiş denge örneği, 20 °C için yaklaşık 57 atm doygunluk basıncının üstünde sıvı bölgesindedir.",
  },
  {
    id: "super",
    label: "40 °C, 80 atm",
    temperature: 40,
    pressure: 80,
    phase: "Kritiküstü akışkan",
    proof:
      "Verilen yaklaşık Tc=31,2 °C ve Pc=73 atm değerlerinin ikisi de aşılmıştır; sıvı-buhar ayrım çizgisi sürmez.",
  },
  {
    id: "hot",
    label: "40 °C, 10 atm",
    temperature: 40,
    pressure: 10,
    phase: "Gaz",
    proof:
      "T kritik değerin üstünde, P kritik değerin altındadır. Yalnız sıcaklık artışı iki kritiküstü koşulu birlikte sağlamaz.",
  },
] as const;
export function phase018(id: string) {
  const state = phaseStates018.find((x) => x.id === id);
  if (!state) throw new RangeError("PHASE_018");
  return {
    ...state,
    criticalTemperature: 31.2,
    criticalPressure: 73,
    tripleTemperature: -56.4,
    triplePressure: 5.11,
  };
}
/** Given illustrative energy contributions; enthalpy alone does not decide solubility. */
export function solvation018(
  solvent: number,
  solute: number,
  hydration: number,
  ion: string,
) {
  if (
    !finite018(solvent, solute, hydration) ||
    solvent < 10 ||
    solvent > 40 ||
    solute < 10 ||
    solute > 40 ||
    hydration < -80 ||
    hydration > -20 ||
    !["na", "cl"].includes(ion)
  )
    throw new RangeError("SOLVATION_018");
  const levels = [0, solvent, solvent + solute, solvent + solute + hydration];
  return {
    solvent,
    solute,
    hydration,
    levels,
    enthalpy: levels[3],
    ion,
    facing: ion === "na" ? "Oδ⁻" : "Hδ⁺",
    process:
      levels[3] < 0
        ? "Ekzotermik"
        : levels[3] > 0
          ? "Endotermik"
          : "Bu modelde toplam sıfır",
  };
}
/** Same fully dissolved nonvolatile NaCl, no reaction/precipitation/loss; final measured solution volume. */
export function molarity018(stockM: number, stockMl: number, finalMl: number) {
  if (
    !finite018(stockM, stockMl, finalMl) ||
    stockM < 0 ||
    stockM > 1 ||
    stockMl < 50 ||
    stockMl > 250 ||
    finalMl < stockMl ||
    finalMl > 1000
  )
    throw new RangeError("MOLARITY_018");
  const moles = (stockM * stockMl) / 1000,
    molarity = moles / (finalMl / 1000);
  return {
    stockM,
    stockMl,
    finalMl,
    moles,
    molarity,
    mass: moles * 58.5,
    dilutionFactor: finalMl / stockMl,
  };
}
/** Complete dissolution/dissociation of CaCl2 and NaCl; no reaction/hydrolysis; given additive volumes. */
export function ionMixture018(
  calciumM: number,
  calciumMl: number,
  sodiumM: number,
  sodiumMl: number,
) {
  if (
    !finite018(calciumM, calciumMl, sodiumM, sodiumMl) ||
    calciumM < 0 ||
    calciumM > 0.5 ||
    sodiumM < 0 ||
    sodiumM > 0.5 ||
    calciumMl < 100 ||
    calciumMl > 400 ||
    sodiumMl < 100 ||
    sodiumMl > 400
  )
    throw new RangeError("ION_MIXTURE_018");
  const volume = (calciumMl + sodiumMl) / 1000,
    calciumMol = (calciumM * calciumMl) / 1000,
    sodiumMol = (sodiumM * sodiumMl) / 1000,
    chlorideMol = 2 * calciumMol + sodiumMol;
  const calcium = calciumMol / volume,
    sodium = sodiumMol / volume,
    chloride = chlorideMol / volume;
  return {
    calciumM,
    calciumMl,
    sodiumM,
    sodiumMl,
    volume,
    calciumMol,
    sodiumMol,
    chlorideMol,
    calcium,
    sodium,
    chloride,
    totalIonM: calcium + sodium + chloride,
    positiveCharge: 2 * calcium + sodium,
    negativeCharge: chloride,
  };
}

type Item018 = [
  string,
  string,
  [string, string, string, string],
  string,
  string,
];
type Unit018 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  source: string;
  sections: [string, string, string][];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: Item018[];
};
const section018 = (
  title: string,
  first: string,
  second: string,
): [string, string, string] => [title, first, second];
const example018 = (
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
    label: ["Koşulu ayır", "İlişkiyi kur", "Sonucu denetle"][i],
    explanation,
  })),
  answer,
  check,
  pitfall,
});
const question018 = (
  prompt: string,
  correct: string,
  wrong: [string, string, string, string],
  hint: string,
  explanation: string,
): Item018 => [prompt, correct, wrong, hint, explanation];
const units018: Unit018[] = [];
units018.push({
  id: "ayt-kinetik-yogunluk",
  topic: "detail-415",
  title: "Kinetik teori: hız, enerji ve gaz yoğunluğu",
  minutes: 58,
  objectives: [
    "Aynı sıcaklıkta enerji eşitliğini hız eşitliğinden ayır.",
    "Graham ve ideal yoğunluk bağıntılarını kendi koşullarıyla kullan.",
    "Mol kütlesini yoğunluk ve gaz verilerinden ters hesapla.",
  ],
  source:
    "MEBİ AYT Kimya PDF 37–40; OGM Dersler Cepte Gazlarda Kinetik Teori PDF 10–13; Aurelia TYT 027 ön bilgi köprüsü karşılaştırıldı. Özgün öğretim ve sorular; resmî sınav sorusu değildir.",
  sections: [
    section018(
      "Mikro modelden ölçülen büyüklüğe",
      "İdeal modelde tanecikler arasındaki uzaklık, taneciklerin öz boyutuna göre büyük kabul edilir. Çarpışma anları dışındaki etkileşimler ihmal edilir; gazın hacmi taneciklerin katı küre hacimleri toplamı değil, erişebildikleri kap hacmidir.",
      "Çeperlere momentum aktarımı makroskopik basınçla ilişkilidir. Elastik çarpışmada toplam kinetik enerji korunur; tek bir taneciğin hızının her çarpışmadan sonra aynı kalması gerekmez. Yön ve hız dağılımı değişebilirken dengedeki ortalama özellikler sabit kalabilir.",
    ),
    section018(
      "Rastgele hareket ve Brown gözlemi",
      "Bir gaz taneciği çarpışmalar arasında yaklaşık doğrusal ilerler, çarpışmalarla yön değiştirir. Bu mikroskobik ısıl hareket, taneciklerin tek bir çizgi üzerinde aynı hızla akması değildir. Denge içinde çok farklı anlık hızlar bulunabilir.",
      "Brown hareketi ise akışkan taneciklerinin darbeleriyle daha büyük asılı parçacıklarda gözlenen düzensiz harekettir. İki gaz molekülünün her çarpışmasına Brown çarpışması demek yerine, mikroskobik neden ile daha büyük parçacıkta gözlenen sonucu ayır.",
    ),
    section018(
      "Aynı T hangi enerjiyi eşitler?",
      "İdeal gazda tanecik başına ortalama öteleme kinetik enerjisi 3kT/2 olur. Aynı sıcaklıkta He atomu ile O₂ molekülü için bu ortalama eşittir. Buradaki eşitlik bütün taneciklerin her anda aynı enerji taşıması anlamına gelmez.",
      "Bir mol gazın toplam öteleme enerjisi 3RT/2, n molün ise 3nRT/2 değeridir. Çok atomlu gazın dönme ve titreşim katkıları ayrıca bulunabilir; bu formülü bütün sıcaklıklarda tüm iç enerjinin eksiksiz ifadesi diye kullanma. Önce tanecik başına mı, toplam mı sorulduğunu yaz.",
    ),
    section018(
      "Üç hız adı, üç farklı ortalama",
      "Karesel ortalama hız v_rms, hız karelerinin ortalamasının kareköküdür: v_rms=√(3RT/M). Ortalama hız ve en olası hız başka tanımlardır. Tek bir sayıyı v diye yazıp bütün hız türlerinin eşit olduğu sonucuna gitme. Burada v sürat büyüklüğüdür; izotropik dengede vektörel ortalama hız sıfır olabilirken ortalama sürat ve v_rms sıfır değildir.",
      "SI hesabında R joule/(mol·K), mol kütlesi kilogram/mol olmalıdır. Örneğin 32 g/mol, 0,032 kg/mol olarak girilir. Gramı doğrudan SI formülüne koymak hızın karekök bin çarpanı kadar yanlış çıkmasına neden olur; birim dönüşümü hesap öncesinde yapılır.",
    ),
    section018(
      "Kütleyi değiştir, enerjiyi koru",
      "Aynı T’de v_rms mol kütlesinin kareköküyle ters orantılıdır. M değeri dört kat olursa hız yarıya iner; ortalama öteleme enerjisi aynı kalır. Enerjideki kütle çarpanı, hız karesindeki azalmayı dengeler.",
      "Sıcaklık dört katına çıkarsa aynı gazın v_rms değeri iki katına çıkar. Santigrat değerleri bu oranda kullanılmaz; Kelvin gerekir. Daha sıcak gazın her taneciği, soğuk gazın her taneciğinden hızlıdır yargısı da dağılımların örtüşebileceğini unutur.",
    ),
    section018(
      "Difüzyon ve küçük delikten geçiş",
      "Difüzyon taneciklerin başka tanecikler arasına yayılmasıdır. Efüzyon, uygun seyrek gaz koşullarında küçük bir açıklıktan düşük basınçlı bölgeye geçiştir. Her iki olayı bir deney fotoğrafından aynı ölçüm düzeneği gibi yorumlamak doğru değildir.",
      "Graham oranı için karşılaştırılan sıcaklık, mol kütlesi ve uygun akış koşulları açık olmalıdır. Aynı T ve basınçta uygun küçük delik düzeninde hız oranı √(M₂/M₁) biçiminde kullanılır. Yoğun ve çarpışmalı bir boru akışına bu bağıntıyı koşulsuz taşıma.",
    ),
    section018(
      "Süre sorusunda önce deney koşulu",
      "Eşit miktarın, sabit akış koşulları korunarak aktarılma süresi hıza ters orantılıdır. Hız iki kat ise aynı miktarın süresi yarıdır. Karşılaştırılan miktarlar farklıysa önce ne kadar gazın aktarıldığını ayrı hesaba katmak gerekir.",
      "Sonlu kap boşalırken basınç ve akış hızı düşebilir. Başlangıç hızı sabitmiş gibi bütün gazın kesin sonlu sürede çıktığını iddia etme. Soru sabit besleme ve basınç sağlandığını veriyorsa okul oranı o sınırda uygulanır; vermiyorsa daha ayrıntılı dinamik veri gerekebilir.",
    ),
    section018(
      "Denklemde birimleri eşleştir",
      "PV=nRT aynı dengedeki gazın basınç, erişilebilir hacim, miktar ve mutlak sıcaklığını bağlar. R=0,082 L·atm/(mol·K) seçildiğinde P atm, V litre olmalıdır. Basıncın çevreye göre gösterge farkı değil mutlak değer olduğu kontrol edilir.",
      "Kütle verilmişse n=m/M dönüşümü yapılır. 22,4 L/mol yalnız açıkça 0 °C, 1 atm ve ideal yaklaşım koşulunda kullanılan yaklaşık molar hacimdir. Denklemin yerine bütün sıcaklıklarda sabit bir molar hacim koymak, birim doğru görünse bile fiziksel öncülü bozar.",
    ),
    section018(
      "Yoğunluk: denklemden yeni bir okuma",
      "n=m/M ve d=m/V birlikte ideal gaz denklemine yerleştirilirse d=PM/(RT) elde edilir. Aynı P ve T’de yoğunluk mol kütlesiyle doğru orantılıdır. Aynı hacimde eşit mol bulunan iki gazın farklı kütle taşıması bu sonuçla tutarlıdır.",
      "R litre-atmosfer temelindeyken M g/mol seçilirse d g/L çıkar. Sıcaklık ve basınç farklı iki örneğin yoğunluk oranını doğrudan mol kütlesi oranı sayma. Hangi değişkenlerin eşit olduğu doğrulanmadan yalnız ağır gaz daha yoğundur cümlesi yeterli değildir.",
    ),
    section018(
      "Yoğunluktan ters mol kütlesi",
      "Yoğunluk, sıcaklık ve basınç birlikte verilirse M=dRT/P bulunabilir. Önce yoğunluğun g/L mi başka birim mi olduğunu yaz, ardından ortak birim sistemini seç. Sonucu gram/mol olarak bitirmek, işlemin yalnız sayısal bir bölme olmadığını gösterir.",
      "Gaz karışımında ideal yoğunluk ortalama mol kütlesiyle ilişkilidir. Bu ortalama mol kesirleriyle M_ort=ΣxᵢMᵢ biçiminde kurulur; kütle kesirlerini aynı formüle koyma. Tek yoğunluk ölçümünden, çok bileşenli bir karışımın bütün oranları ek bilgi olmadan bulunamaz.",
    ),
    section018(
      "Sabit P ve T, sabit PV demek değil",
      "Sabit P, T altında aynı gaz eklenirse n artar ve dengeyi koruyan hareketli sınırda V de artar. PV=nRT olduğundan PV artar; n/V ve aynı gazın yoğunluğu sabit kalabilir. Her soruda hangi çarpımın neden sabit olduğunu yeniden kur.",
      "Örneğin 1 mol yerine 1,5 mol varsa aynı P, T’de hacim de 1,5 kat olur. Sabit hacimli kapta ise aynı ekleme basıncı artırır. Piston, sabit dış yük ve denge kabulüyle sabit P modeli olabilir; hareketli olmak tek başına dış basıncın değişmediğini garanti etmez.",
    ),
    section018(
      "Modeli değiştir, gerekçeyi yeniden kur",
      "Gezginde T, mol kütlesi ve basıncı ayrı değiştir. Aynı sıcaklıkta kütle artışı hızı düşürürken yoğunluğu yükseltir; basınç artışı bu modelde yoğunluğu değiştirir fakat v_rms değerini değiştirmez. Her sonucun hangi bağıntıdan geldiğini sözle açıkla.",
      "Önce yönü tahmin et, ardından sayıyla kontrol et ve notu kapatarak farklı koşullu bir örnek çöz. Gazın gerçek faz değişimi ve yoğun ortam sapmaları bu ideal sayısal modelin dışında kalır. Keşif seçimi öğrenme puanı değildir; bağımsız soru çözümleri ayrı kaydedilir.",
    ),
  ],
  examples: [
    example018(
      "Eş enerji, dört kat hız",
      "İdeal H₂ ve O₂ aynı 300 K sıcaklıkta. Mol kütleleri 2 ve 32 g/mol. v_rms(H₂)/v_rms(O₂) ve tanecik başına ortalama öteleme enerjilerini karşılaştır.",
      "Aynı T’de kütlenin karekökünü kullan; enerjiyi ayrı oku.",
      [
        "İki gaz için T ve R aynıdır; hız oranında bu ortak çarpanlar sadeleşir.",
        "Oran √(32/2)=√16=4 bulunur. H₂’nin karesel ortalama hızı dört kat büyüktür.",
        "Tanecik başına 3kT/2 yalnız T’ye bağlı olduğundan ortalama öteleme enerjileri eşittir. Hız eşitliği sonucu çıkmaz.",
      ],
      "Hız oranı 4; ortalama öteleme enerjileri eşit.",
      "Kütle 16 kat, hız karesi 16 kat ters yönde değişir.",
      "Tanecik başına enerjiyle örneklerin toplam enerjisini karıştırma.",
    ),
    example018(
      "Basınçla yoğunluğu birleştir",
      "İdeal gaz için M=32 g/mol, P=2 atm, T=400 K, R=0,082 L·atm/(mol·K). Yoğunluğu g/L olarak hesapla.",
      "d=PM/(RT) bağıntısını verilen birim sistemiyle uygula.",
      [
        "M g/mol ve R litre-atmosfer temelinde; sonuç g/L olacaktır. RT=0,082×400=32,8 hesaplanır.",
        "d=(2×32)/32,8=64/32,8≈1,951 g/L bulunur.",
        "Aynı T’de P yarıya inse yoğunluk da yarıya inerdi. Birimler ve basınçla aynı yönlü değişim sonucu doğrular.",
      ],
      "Yaklaşık 1,951 g/L",
      "Yoğunluk×hacim kütle verir; g/L birimi korunur.",
      "M’yi kg/mol yapıp aynı R ile sonucu g/L diye etiketleme.",
    ),
    example018(
      "Bilinemeyen gazın mol kütlesi",
      "İdeal X gazında d=2,5 g/L, P=1,23 atm, T=300 K. R=0,082 L·atm/(mol·K) ile mol kütlesini bul.",
      "Yoğunluk bağıntısını bilinmeyen M için yeniden düzenle.",
      [
        "RT=24,6 L·atm/mol ve dRT/P bağıntısı seçilir; verilen yoğunluk tek başına yeterli değildir.",
        "M=(2,5×24,6)/1,23=61,5/1,23=50 g/mol hesaplanır.",
        "Geri koyarsak 1,23×50/24,6=2,5 g/L bulunur. Gazın kimliği yalnız bu yaklaşık mol kütlesinden her durumda tekleşmez.",
      ],
      "50 g/mol",
      "Başlangıç yoğunluğu geri elde edilir.",
      "Mol kütlesiyle tek bir molekülün gram cinsinden kütlesini aynı sayı sanma.",
    ),
    example018(
      "Efüzyonda süreyi koşullandır",
      "Aynı T ve basınç korunarak küçük delikten sabit koşullarda eşit mol H₂ ve O₂ aktarılıyor. M değerleri 2 ve 32 g/mol. H₂ aktarımı 8 s ise O₂ aktarımı kaç s?",
      "Eşit miktar ve sabit besleme koşulunda süre hızın tersidir.",
      [
        "Graham oranı v_H₂/v_O₂=√(32/2)=4 olur; H₂ aynı miktarı daha hızlı aktarır.",
        "Eşit miktar için t_O₂/t_H₂=4; t_O₂=4×8=32 s hesaplanır.",
        "Bu sonuç sabit basınçlı besleme öncülüne aittir. Basıncı azalan sonlu kabın bütün gazı boşalıyor diye aynı süre modeli kurulamaz.",
      ],
      "32 s",
      "Ağır gaz daha yavaş, eşit miktarın süresi daha uzundur.",
      "Süre oranını hız oranıyla aynı sırada yazma.",
    ),
  ],
  recall: [
    {
      prompt: "Aynı T’de hangi enerji eşittir?",
      answer:
        "Tanecik başına ortalama öteleme kinetik enerjisi; bütün örneğin toplam iç enerjisi değil.",
    },
    {
      prompt: "SI v_rms hesabında mol kütlesi birimi?",
      answer: "kg/mol; örneğin 32 g/mol=0,032 kg/mol.",
    },
    {
      prompt: "d oranından M oranı ne zaman çıkar?",
      answer: "İdeal yaklaşımda aynı P ve T koşulunda.",
    },
    {
      prompt: "Sabit P, T’de gaz eklenince PV?",
      answer: "n arttığı için PV de artar; V genişler.",
    },
  ],
  items: [
    question018(
      "Aynı T’de ideal H₂ ve O₂ için M değerleri 2 ve 32 g/mol. v_rms(H₂)/v_rms(O₂) kaçtır?",
      "4",
      ["16", "2", "1/4", "1"],
      "√(M_O₂/M_H₂) oranını kur.",
      "Aynı T’de v_rms∝1/√M olduğundan √(32/2)=4 bulunur. Daha hafif H₂ daha hızlıdır; enerji eşitliği hızların eşitliğini gerektirmez.",
    ),
    question018(
      "İdeal X gazının T değeri 200 K’den 800 K’ye çıkıyor; mol kütlesi değişmiyor. v_rms son/ilk oranı nedir?",
      "2",
      ["4", "1/2", "16", "1"],
      "Hız, mutlak sıcaklığın kareköküyle değişir.",
      "T oranı 800/200=4’tür; hız oranı √4=2 olur. Kelvin kullanılmıştır. Hızın doğrudan T ile dört kat arttığını söylemek karekökü unutmak olur.",
    ),
    question018(
      "İdeal He ve N₂ aynı T’dedir. Hangisi bu bilgiyle kesin eşittir?",
      "Tanecik başına ortalama öteleme kinetik enerjisi",
      [
        "Bütün örneklerin toplam iç enerjisi",
        "Bütün taneciklerin anlık hızı",
        "Örneklerin toplam kütlesi",
        "Gazların mol kütlesi",
      ],
      "3kT/2’de hangi nicelikler var?",
      "Ortalama öteleme enerjisi tanecik başına 3kT/2’dir. Aynı T bunu eşitler; mol miktarı ve iç hareketler bilinmeden toplam enerji eşitliği kurulamaz.",
    ),
    question018(
      "v_rms=√(3RT/M) formülünde R=8,314 J/(mol·K) kullanılacak. 28 g/mol değerindeki M nasıl yazılmalıdır?",
      "0,028 kg/mol",
      ["28 kg/mol", "28000 kg/mol", "0,28 kg/mol", "2,8 kg/mol"],
      "Gramı binle bölerek kilogram yap.",
      "28 g/mol=28/1000=0,028 kg/mol olur. SI enerji birimi kilogram içerir; gramı doğrudan koymak sayısal hızın yanlış ölçekte çıkmasına neden olur.",
    ),
    question018(
      "İdeal gazda P=1 atm, T=300 K, M=24,6 g/mol ve R=0,082 L·atm/(mol·K). d=PM/(RT) ile yoğunluk nedir?",
      "1 g/L",
      ["24,6 g/L", "0,082 g/L", "300 g/L", "2 g/L"],
      "Önce RT çarpımını bul.",
      "RT=24,6 L·atm/mol; d=24,6/24,6=1 g/L bulunur. Mol kütlesinin sayısı tek başına yoğunluk değildir; P ve T dönüşümü gereklidir.",
    ),
    question018(
      "İdeal X için d=2 g/L, T=300 K, P=1,64 atm; R=0,082 L·atm/(mol·K). M=dRT/P sonucu nedir?",
      "30 g/mol",
      ["15 g/mol", "60 g/mol", "49,2 g/mol", "24,6 g/mol"],
      "2×24,6 değerini 1,64’e böl.",
      "M=2×0,082×300/1,64=49,2/1,64=30 g/mol. Yoğunluk, T ve P birlikte kullanılır; sonucu tekrar d bağıntısına koymak 2 g/L verir.",
    ),
    question018(
      "İdeal bir karışımın He/Ne mol kesirleri 0,25/0,75; mol kütleleri 4/20 g/mol. Ortalama mol kütlesi nedir?",
      "16 g/mol",
      ["12 g/mol", "24 g/mol", "8 g/mol", "20 g/mol"],
      "Mol kesriyle ağırlıklandır.",
      "M_ort=0,25×4+0,75×20=1+15=16 g/mol. Bu toplam mol temeline aittir; verilenleri kütle kesri gibi kullanmak farklı bir ortalama kurar.",
    ),
    question018(
      "Sabit P ve T altında ideal X gazı 1 mol iken 1,5 mole çıkarılıyor; hareketli sınır dengeyi koruyor. PV çarpımının son/ilk oranı nedir?",
      "1,5",
      ["1", "2/3", "0,5", "2,5"],
      "PV=nRT’de n değişiyor.",
      "R ve T aynı kalırken n 1,5 kat olur; PV de 1,5 kat artar. P sabit olduğundan V genişler. Sabit P, T ifadesi PV’nin sabitliği anlamına gelmez.",
    ),
    question018(
      "Aynı T ve basınçta küçük delikten uygun efüzyon koşullarında A/B mol kütleleri 4/16 g/mol. Sabit beslemeyle eşit mol A aktarımı 6 s ise B kaç s sürer?",
      "12 s",
      ["3 s", "6 s", "24 s", "1,5 s"],
      "B’nin hızı yarı; eşit miktarın süresi iki kat.",
      "v_A/v_B=√(16/4)=2 olur. Eşit miktar ve sabit besleme altında t_B/t_A=2; süre 12 s’dir. Basıncı değişen sonlu kap için ek dinamik bilgi gerekebilirdi.",
    ),
    question018(
      "İdeal gazın P değeri iki katına çıkarılırken T ve mol kütlesi aynı tutuluyor. Yoğunluk ile v_rms nasıl değişir?",
      "Yoğunluk iki kat; v_rms aynı",
      [
        "İkisi de iki kat",
        "Yoğunluk aynı; v_rms iki kat",
        "Yoğunluk yarı; v_rms aynı",
        "İkisi de yarıya iner",
      ],
      "d içinde P, v_rms içinde T/M var.",
      "d=PM/(RT) basınçla iki kat artar. v_rms=√(3RT/M) aynı T ve M nedeniyle değişmez. İdeal modelde yoğunluk değişimi tek başına hız artışı değildir.",
    ),
  ],
});
units018.push({
  id: "ayt-kismi-basinci-suustu",
  topic: "detail-416",
  title: "Kısmi basınç: gaz karışımı ve su dengesi",
  minutes: 62,
  objectives: [
    "Toplam basıncı türlerin mol stoklarından kur.",
    "Islak gazı kuru gazdan ayır; suyun sıvı kalma koşulunu denetle.",
    "Kap konumu, gaz hacmi ve sıvı seviye farkını ayrı değerlendir.",
  ],
  source:
    "MEBİ AYT Kimya PDF 39–41; OGM Dersler Cepte Gaz Karışımları PDF 14–19 ve çözüm sayfaları 29–30 karşılaştırıldı. Tamamı özgün öğretim/alıştırma; resmî sınav sorusu değildir.",
  sections: [
    section018(
      "Her tür aynı hacmi paylaşır",
      "Tepkime vermeyen ideal gaz karışımında her tür kabın erişilebilir gaz hacminin tamamını paylaşır. A’ya ayrı yarım, B’ye ayrı yarım hacim vermek doğru model değildir. Her tür için Pᵢ=nᵢRT/V yazılır; buradaki V ortak gaz hacmidir.",
      "Toplam basınç P_toplam=ΣPᵢ olur. Tek tek katkıların bu biçimde toplanması ideal yaklaşım ve ortak son sıcaklık koşuluna dayanır. Türler tepkimeye giriyor veya yoğuşuyorsa önce son gaz stoklarını hesaplamak gerekir; başlangıç molleri doğrudan son basınca taşınmaz.",
    ),
    section018(
      "Mol kesri kütle payı değildir",
      "xᵢ=nᵢ/n_toplam olduğundan aynı ideal karışımda Pᵢ=xᵢP_toplam bulunur. Mol kesirlerinin toplamı birdir. Kütleler verilmişse önce her türün kendi mol kütlesiyle n=m/M dönüşümü yapılmalıdır.",
      "Örneğin eşit gram He ve O₂ eşit mol içermez; He’nin mol kütlesi daha küçüktür. Kısmi basıncı doğrudan gram yüzdesiyle bulmak bu farkı atlar. Bir türün mol kesri bilinince miktarı gram cinsinden bulmak için toplam mol veya eşdeğer ek veri gerekir.",
    ),
    section018(
      "Sabit hacimde inert gaz eklemek",
      "T ve V sabitken karışımın A türü değişmeden inert I gazı eklenirse P_A=n_ART/V aynı kalır. Eklenen tür kendi kısmi basıncıyla toplam basıncı artırır. Toplam yükseldi diye bütün türlerin kısmi basınçları aynı oranda artmaz.",
      "A’nın mol kesri ise toplam mol arttığı için azalır. Aynı anda mol kesri azalırken kısmi basıncın sabit kalması çelişki değildir; P_toplam artışı x_A azalmasını dengeler. Sonucu yalnız bir oranla değil, n_A, T, V sabitlerini yazarak açıkla.",
    ),
    section018(
      "Sabit basınçta ekleme farklıdır",
      "Sabit P, T koşulunu koruyan bir pistonda inert gaz eklenirse toplam molle birlikte hacim genişler. Başlangıçtaki A molü aynı kalırken P_A=n_ART/V azalır. Sabit hacimli kapta öğrendiğin sonucu bu düzeneğe aynen taşıma.",
      "Örneğin toplam mol iki kat olursa aynı P, T’de hacim iki kat olur. Eklenmeyen türün mol kesri ve kısmi basıncı yarıya iner. Dış yükün sabit ve mekanik dengenin sağlandığı öncülleri gerekir; yalnız piston çizimi basıncın sabitliğini tek başına kanıtlamaz.",
    ),
    section018(
      "Ayrı kapları birleştirmek",
      "Başlangıç ve son sıcaklıkların aynı olduğu tepkimesiz ideal durumda P₁V₁+P₂V₂=P_son V_son yazılır. Açılan boş bölme varsa onun erişilebilir hacmi son toplamın içindedir. Musluk ve bağlantı hacmi ihmal ediliyorsa bu da model öncülüdür.",
      "Başlangıç sıcaklıkları farklıysa önce her kapta nᵢ=PᵢVᵢ/(RTᵢ) bulunur. Son T verilmeden son basıncı yalnız PV toplamıyla kesinleştirme. Isıl denge, enerji alışverişi ve sabit sıcaklıkta tutulan düzenek birbirinden farklı verilerdir.",
    ),
    section018(
      "Sıvı ve buhar bir stok paylaşır",
      "Kapalı kapta sıvı sudan buharlaşan moleküller gaz fazına, yoğuşanlar sıvıya geçer. Aynı sıcaklıkta dengeye ulaşılıp saf sıvı su da kalmışsa suyun kısmi basıncı P_sat(T) değerindedir. Denge, buharlaşmanın durması değil iki yönlü akışın eşitlenmesidir.",
      "Sıvı miktarı yeterliyken hacim değişimine karşı buharlaşma veya yoğuşma miktarı ayarlanır. Fakat kapta sınırlı toplam su varsa sıvının tamamı bitebilir. P_sat kuralını sıvı kaldığını denetlemeden her duruma otomatik uygulamak, var olmayan suyu sisteme eklemek olur.",
    ),
    section018(
      "Islak gaz ile kuru hedef gaz",
      "Suda çözünmediği ve suyla tepkime vermediği kabul edilen X gazı su üstünde toplandığında örnek genellikle X ile su buharını içerir. Toplam basınç P_X+P_su olur. Kuru gaz hesabında P_X=P_toplam−P_su çıkarımı yapılır.",
      "Toplanan ıslak örneği yalnız X’ten oluşan saf gaz diye adlandırma. Sıcaklık, suyun buhar basıncı ve sıvı denge koşulları verilmelidir. X suda önemli ölçüde çözünüyor, tepkime veriyor veya başka gazlar içeriyorsa bu iki bileşenli basit hesap ek bilgi ister.",
    ),
    section018(
      "Piston konumu gaz hacmi değildir",
      "Bir şekil kabın tabanından 3V konumunu gösterirken sıvı su V yer kaplıyorsa gaz hacmi 2V’dir. Piston 2V konumuna indiğinde, sıvı hacmi değişmiyorsa gaz hacmi V olur. Boyle oranı toplam kap yüksekliğine değil gazın erişilebilir hacmine uygulanır.",
      "Sıvı hacminin ihmal edilip edilmediğini şekil veya kökten oku. İhmal edilmiyorsa önce gaz hacimlerini ayrı çıkar. Gaz basıncı iki katına çıksa bile su buharının denge basıncı aynı sıcaklıkta sabit kalabilir; bu yüzden ıslak toplam basınç zorunlu iki kat olmaz.",
    ),
    section018(
      "Sıkıştırmada önce suyu ayır",
      "Sabit sıcaklıkta gaz hacmi yarıya iner ve sıvı su kalırsa kuru X’in basıncı iki kat olur; suyun kısmi basıncı P_sat olarak kalır. Bir miktar su buharı yoğuşur. Başlangıç toplamını ikiyle çarpmak su katkısını da yanlış iki katına çıkarır.",
      "Uygun işlem sırası başlangıç toplamından suyu çıkar, kuru gazın hacim oranını uygula, yeni su katkısını ekle biçimindedir. Sıcaklık da değişiyorsa kuru gaz için T oranı ve su için yeni P_sat(T) verisi gerekir. Tek bir sabit sıcaklık tablosu bütün T değerlerine taşınmaz.",
    ),
    section018(
      "Sıvı bitince üç durumu ayır",
      "Verilen T, V’de doygun buhar için gerekli su molü n*=P_sat V/(RT) olur. Toplam su n*’dan büyükse buhar n* kadar, kalanı sıvıdır. Daha az su varsa tümü gaz fazına geçebilir; kısmi basınç n_su RT/V ile P_sat’ın altında bulunur.",
      "Tam n_su=n* sınırında sıvı miktarı sıfır olabilir fakat buhar basıncı hâlâ P_sat’a eşittir. Yalnız gaz var diye mutlaka doymamış deme. Gezginde sıvı+buhar, yalnız doygun buhar ve doymamış buhar ayrı açıklanır; yuvarlama hatası fiziksel faz miktarı diye yorumlanmaz.",
    ),
    section018(
      "Su seviyelerinin basınç işareti",
      "Toplama kabının iç ve dış sıvı yüzeyleri aynı seviyedeyse uygun açık düzenekte içerideki toplam gaz basıncı açık hava basıncına eşit olabilir. Seviyeler farklıysa hidrostatik ρgh katkısı gerekir. Şekilde hangi yüzeyin yüksek olduğunu önce belirle.",
      "İçeride sıvı seviyesi dışarıdan daha alçaksa gaz daha güçlü bastırır: P_iç=P_dış+ρgh. Daha yüksekse iç gaz basıncı daha küçüktür. Bu toplam ıslak basınçtan su buharı daha sonra çıkarılır; hidrostatik düzeltme doğrudan yalnız kuru gaza ait değildir.",
    ),
    section018(
      "Aynı sonucu iki denetimle doğrula",
      "Gezginde 300 K ve yaklaşık P_sat=0,035 atm verisi kullanılır; R=0,082 L·atm/(mol·K). Kuru gaz ideal, suda çözünmez ve suyla tepkime vermez. Hacmi veya toplam suyu değiştirirken hangi su rejiminin geçerli kaldığını tahmin et.",
      "Hem P_toplam=P_X+P_su toplamını hem toplam su=buhar+sıvı envanterini kontrol et. Sonra basınç sabitliğiyle hacim sabitliğini yer değiştiren yeni bir soruyu not kapalı çöz. Kontrol eylemi veya tahmin kaydı tek başına bağımsız soru doğruluğu ve XP oluşturmaz.",
    ),
  ],
  examples: [
    example018(
      "Islak örnekten kuru basınca",
      "Eşit iç/dış su seviyelerinde toplam gaz basıncı 760 mm Hg ölçülüyor. Gaz suda çözünmüyor ve tepkime vermiyor; denge sıcaklığında P_su=23,8 mm Hg. Kuru gazın kısmi basıncı nedir?",
      "Önce ıslak toplamın bileşenlerini ayır.",
      [
        "Eşit seviyeler toplam iç basıncın verilen 760 mm Hg olmasını sağlar; ek ρgh düzeltmesi yoktur.",
        "P_kuru=P_toplam−P_su=760−23,8=736,2 mm Hg hesaplanır.",
        "736,2+23,8=760 mm Hg geri elde edilir. Bu çıkarma örneğin su buharı taşıdığını kabul eder; toplanan örnek bütünüyle saf kuru gaz değildir.",
      ],
      "736,2 mm Hg",
      "Kuru katkı pozitif ve toplamdan küçüktür.",
      "760 mm Hg değerini doğrudan kuru gaz denklemiyle kullanma.",
    ),
    example018(
      "Toplam basınç neden iki kat değil?",
      "300 K’de n_X=0,10 mol ideal kuru gaz, 2 L gaz hacmi ve yeter sıvı su var. R=0,082 L·atm/(mol·K); bu sıcaklıkta verilen yaklaşık P_sat=0,035 atm. Gaz hacmi sabit T’de 1 L olunca toplam basınç?",
      "Kuru gazı hacim oranıyla, suyu denge koşuluyla güncelle.",
      [
        "RT=24,6; ilk kuru basınç 0,10×24,6/2=1,23 atm, ilk toplam 1,265 atm olur.",
        "Yeni kuru basınç 0,10×24,6/1=2,46 atm’dir. Sıvı su kaldığı için su katkısı 0,035 atm olarak korunur.",
        "Son toplam 2,46+0,035=2,495 atm. İlk toplamı ikiyle çarpmak 2,530 atm verir ve yoğuşan suyu hesaba katmaz.",
      ],
      "2,495 atm",
      "Kuru katkı iki kat, su katkısı aynı.",
      "Boyle oranını ıslak toplam basınca kör uygulama.",
    ),
    example018(
      "Yetersiz su stokunu fark et",
      "300 K’de 2 L kapta toplam 0,001 mol su ve 0,10 mol kuru X var. R=0,082 L·atm/(mol·K); P_sat=0,035 atm veriliyor. X çözünmüyor/tepkime vermiyor; denge sonunda su basıncı ve toplam basınç?",
      "Önce doygunluk için gerekli suyu hesapla.",
      [
        "Doygunluk için n*=0,035×2/24,6≈0,002846 mol su gerekir; eldeki 0,001 mol daha azdır.",
        "Bütün su gaz fazında olur: P_su=0,001×24,6/2=0,0123 atm. P_X=1,23 atm olarak bulunur.",
        "Toplam 1,2423 atm; su basıncı P_sat’ın altındadır ve sıvı kalmaz. P_sat’ı zorla eklemek su envanterini bozardı.",
      ],
      "P_su=0,0123 atm; toplam 1,2423 atm",
      "Buhar suyu 0,001 mol, sıvı sıfır; stok korunur.",
      "Doygun buhar bağıntısını sıvı varlığını denetlemeden kullanma.",
    ),
    example018(
      "Seviye farkını önce düzelt",
      "P_dış=100 kPa. Toplama kabındaki su seviyesi dış yüzeyden 0,20 m daha alçak; ρ=1000 kg/m³ ve g=10 m/s². P_su=2 kPa. Gazın kuru basıncı nedir?",
      "İçerideki ıslak basınca hidrostatik katkıyı ekle, sonra suyu çıkar.",
      [
        "Seviye içeride daha alçak olduğundan iç gaz basıncı daha büyüktür. ρgh=1000×10×0,20=2000 Pa=2 kPa.",
        "Toplam iç basınç 100+2=102 kPa; kuru gaz basıncı 102−2=100 kPa olur.",
        "Burada iki 2 kPa katkısı sayıca birbirini götürür fakat fiziksel nedenleri farklıdır. Seviye yönü ters olsaydı aynı sonuç çıkmazdı.",
      ],
      "100 kPa",
      "Önce toplam 102, sonra kuru 100 kPa.",
      "Hidrostatik katkının işaretini su buharı çıkarımıyla karıştırma.",
    ),
  ],
  recall: [
    {
      prompt: "Kısmi basıncın hacmi hangi hacim?",
      answer: "Her türün paylaştığı ortak erişilebilir gaz hacmi.",
    },
    {
      prompt: "Sabit V, T’de inert gaz eklenince eski türün basıncı?",
      answer: "Molü değişmiyorsa aynı; toplam basınç artar.",
    },
    {
      prompt: "Sıvı sıfırken buhar doygun olabilir mi?",
      answer: "Evet; tam n_su=P_sat V/(RT) sınırında.",
    },
    {
      prompt: "İç su seviyesi daha alçaksa iç gaz basıncı?",
      answer: "Dış basınçtan ρgh kadar daha büyük; sonra su katkısı çıkarılır.",
    },
  ],
  items: [
    question018(
      "Dengedeki ıslak gazın toplam basıncı 750 mm Hg, suyun kısmi basıncı 25 mm Hg. İç/dış sıvı seviyeleri eşit; başka gaz yok. Kuru X’in basıncı nedir?",
      "725 mm Hg",
      ["750 mm Hg", "775 mm Hg", "25 mm Hg", "30 mm Hg"],
      "Toplamdan su buharını çıkar.",
      "P_X=750−25=725 mm Hg olur. 725+25 toplamı geri verir. Eşit seviyeler nedeniyle ayrıca hidrostatik fark verilmemiştir; toplamı doğrudan kuru basınç sayma.",
    ),
    question018(
      "300 K’de ideal kuru X’in ilk basıncı 1,23 atm. Su üstünde denge var ve P_su=0,035 atm. Gaz hacmi yarıya iner; T aynı, sıvı su kalır. Son toplam basınç?",
      "2,495 atm",
      ["2,530 atm", "2,460 atm", "1,265 atm", "0,035 atm"],
      "Yalnız kuru katkıyı ikiyle çarp.",
      "P_X iki kat 2,46 atm olur; P_su aynı 0,035 atm kalır. Toplam 2,495 atm. Su buharının bir kısmı yoğuştuğundan toplamın iki kat olması gerekmez.",
    ),
    question018(
      "300 K’de V=2 L, toplam su 0,001 mol; R=0,082 L·atm/(mol·K) ve P_sat=0,035 atm. Başka gazın suyla tepkimesi/çözünmesi yok. Denge su basıncı nedir?",
      "0,0123 atm; sıvı kalmaz.",
      [
        "0,035 atm; mutlaka sıvı kalır.",
        "0,070 atm; su iki atomludur.",
        "0 atm; sıvı yoksa buhar yoktur.",
        "1,23 atm; su molü 0,10 kabul edilir.",
      ],
      "Eldeki suyla nRT/V hesapla ve P_sat ile karşılaştır.",
      "0,001×0,082×300/2=0,0123 atm, doygunluk değerinden küçüktür. Elde daha çok su yoktur; tamamı buhar olabilir ve sıvı sıfır kalır.",
    ),
    question018(
      "İdeal tepkimesiz A/B karışımında V ve T sabit. A’nın molü değişmeden inert I gazı ekleniyor. A’nın kısmi basıncı için ne söylenir?",
      "Aynı kalır.",
      [
        "Toplam basınçla mutlaka iki kat olur.",
        "Kesin sıfıra iner.",
        "Mol kesri azaldığı için mutlaka azalır.",
        "A’nın proton sayısı artar.",
      ],
      "P_A=n_ART/V’de değişen var mı?",
      "A’nın n_A, T, V değerleri aynı olduğundan kısmi basıncı korunur. Toplam basınç artarken A’nın mol kesri azalır; iki bilgi birbirine aykırı değildir.",
    ),
    question018(
      "İdeal A/B karışımında ilk moller 0,10/0,10. P=2 atm ve T sabit pistonla 0,20 mol inert I ekleniyor. A’nın son kısmi basıncı kaç atm?",
      "0,5 atm",
      ["1 atm", "2 atm", "4 atm", "0,25 atm"],
      "Son toplam molü bul; piston toplam P’yi koruyor.",
      "Son toplam 0,40 mol; x_A=0,10/0,40=0,25. P_A=0,25×2=0,5 atm. Eklenen miktarla hacim genişlediği için A’nın kısmi basıncı başlangıçtaki 1 atm’den düşer.",
    ),
    question018(
      "Aynı ideal kapta 0,20 mol He ve 0,30 mol Ne var; toplam basınç 500 mm Hg. He’nin kısmi basıncı kaç mm Hg?",
      "200 mm Hg",
      ["300 mm Hg", "250 mm Hg", "100 mm Hg", "500 mm Hg"],
      "Mol kesri 0,20/0,50.",
      "He mol kesri 0,4 olur; P_He=0,4×500=200 mm Hg. Toplam mol üzerinden hesaplanır; mol kütlesi verilmeyen bu soruda gram payı kullanılmaz.",
    ),
    question018(
      "P_dış=100 kPa; toplama kabındaki su yüzeyi dışarıdan 0,20 m daha yüksek. ρ=1000 kg/m³, g=10 m/s², P_su=2 kPa. Kuru gaz basıncı nedir?",
      "96 kPa",
      ["100 kPa", "102 kPa", "98 kPa", "104 kPa"],
      "Yüksek iç su seviyesi, daha küçük iç gaz basıncı demektir.",
      "ρgh=2 kPa; ıslak iç basınç 100−2=98 kPa olur. Kuru katkı 98−2=96 kPa. Hidrostatik düzeltme ile buhar çıkarımının ikisi de ayrı uygulanır.",
    ),
    question018(
      "Sıvı su V hacim kaplıyor. Pistonun tabandan gösterilen kap hacmi 4V’den 2,5V’ye iniyor; sıvı hacmi aynı, T sabit ve sıvı kalıyor. İlk toplam 630 mm Hg, P_su=30 mm Hg. Son toplam?",
      "1230 mm Hg",
      ["1008 mm Hg", "1260 mm Hg", "600 mm Hg", "1200 mm Hg"],
      "Gaz hacimleri 3V ve 1,5V; kuru katkı iki kat.",
      "İlk kuru basınç 630−30=600 mm Hg. Gaz hacmi yarıya indiğinden kuru katkı 1200 olur; su 30 eklenince toplam 1230 mm Hg. Kap hacimlerini doğrudan oranlamak yanlıştır.",
    ),
    question018(
      "Suyla tepkime vermeyen, suda çözünmesi ihmal edilen X su üstünde dengeye gelerek toplanıyor; su buharı basıncı sıfır değil. Toplanan örnek hakkında doğru ifade hangisidir?",
      "X ve su buharı içeren ıslak gazdır.",
      [
        "Bütünüyle yalnız X’ten oluştuğu kesindir.",
        "Su buharı toplam basınca katılamaz.",
        "X’in kısmi basıncı her zaman toplamdan büyüktür.",
        "X’in mol kütlesi su buharıyla yok olur.",
      ],
      "Toplamdaki iki gaz türünü ayır.",
      "Sıvıyla dengedeki örnekte X yanında su buharı bulunur. Kuru X basıncı toplamdan su katkısı çıkarılarak bulunur; toplama yöntemi örneği otomatik kuru ve tek tür yapmaz.",
    ),
    question018(
      "Sabit T, V’de toplam su molü tam P_sat V/(RT) değerine eşit; bütün su gaz fazında, sıvı sıfır. Bu sınır için doğru yorum hangisidir?",
      "Su buharı P_sat basıncında doygun olabilir.",
      [
        "Sıvı yoksa su buharı kesin sıfırdır.",
        "Basınç mutlaka P_sat’tan küçüktür.",
        "Su basıncı mutlaka iki P_sat’tır.",
        "Toplam su molü kendiliğinden iki katına çıkar.",
      ],
      "Verilen molü P=nRT/V içinde yerine koy.",
      "n_su=P_sat V/(RT) yerine konursa basınç P_sat çıkar. Tam sınırda sıvı kalmadan doygun buhar mümkündür; yalnız gaz var gözlemi mutlaka doymamışlık kanıtı değildir.",
    ),
  ],
});
units018.push({
  id: "ayt-gercek-gaz-faz",
  topic: "detail-417",
  title: "Gerçek gazlar: sapma, faz ve kritik nokta",
  minutes: 64,
  objectives: [
    "Z ile idealden sapmanın işaretini verilen veriden bul.",
    "Üçlü ve kritik noktayı faz miktarıyla karıştırmadan oku.",
    "Genleşme, soğuma ve kritiküstü koşulların sınırını açıkla.",
  ],
  source:
    "MEBİ AYT Kimya PDF 42–45; OGM Dersler Cepte Gerçek Gazlar PDF 20–26 ve kaynak şekilleri karşılaştırıldı. Şema ve hesap verileri özgün/temsili olarak etiketlidir; resmî sınav sorusu değildir.",
  sections: [
    section018(
      "İdeal, gerçeğin yerine konan bir sınır",
      "İdeal gaz taneciklerin öz hacmini ve uzun menzilli etkileşimleri ihmal eden bir modeldir. Gerçek maddelerde bunlar sıfır değildir. Uygun düşük yoğunluk ve sıcaklık koşullarında model ölçümleri iyi yaklaştırabilir; gazın gerçek doğasını değiştirmez.",
      "Düşük basınç ve uygun yüksek sıcaklık çoğu örnekte ideale yaklaşmayı destekler. Çok düşük T’de yoğuşma, çok yüksek yoğunlukta öz hacim önem kazanır. Yalnız bir gazın adı veya mol kütlesi bütün koşullarda ne kadar ideal olacağını tek başına vermez.",
    ),
    section018(
      "Çekim ve dışlanmış hacim birlikte",
      "Tanecikler arası çekim, uygun rejimde çepere aktarılan momentumu ideal tahmine göre azaltabilir. Öte yandan taneciklerin sonlu boyu, hareket için kullanılabilir boşluğu azaltır. Yüksek sıkıştırmada bu ikinci etki güçlü hâle gelebilir.",
      "Bu yüzden aynı n, V, T için gerçek basınç her durumda idealden küçüktür sözü genel yasa değildir. Çekim baskınken aşağı, dışlanmış hacim ve itme baskınken yukarı sapma görülebilir. Karşılaştırmayı verilen ölçüm veya uygun durum denklemiyle sınırlandır.",
    ),
    section018(
      "Z: boyutsuz sapma göstergesi",
      "Sıkıştırılabilirlik çarpanı Z=PV/(nRT) ile tanımlanır. İdeal modelde Z=1 olur. Kitapta PV/(RT) yazılıyorsa n=1 mol koşulunun ayrıca verildiğini kontrol et; farklı mol sayısında n’yi silmek yanlış bir ideal değer üretir.",
      "Z<1 ise aynı n, V, T için P, ideal nRT/V değerinden küçüktür; Z>1 ise büyüktür. Bu sayı tek başına her mikroskobik etkileşimi ayrı ayrı ölçmez. Z=1’e yakın tek nokta da maddenin bütün basınç ve sıcaklıklarda ideal olduğunu kanıtlamaz.",
    ),
    section018(
      "Eğriyi doğru sabitlerle karşılaştır",
      "Z–P eğrisinde hangi gazın ve hangi sıcaklığın kullanıldığı önemlidir. Aynı gaz için farklı T eğrileri, farklı gazların aynı T eğrilerinden başka bir karşılaştırmadır. Eksenin Z mi PV/RT mi olduğunu okumadan ideal çizgiyi 1 diye işaretleme.",
      "Bir gaz daha ağır veya daha polar diye her P, T’de kesin daha büyük sapar sonucu çıkmaz. Kaynakların nitel örnekleri eğilim öğretir; kesin sayısal sıra için verilen Z verisi kullanılmalıdır. İki eğri kesişirse hangi basınç aralığında konuşulduğu özellikle yazılır.",
    ),
    section018(
      "Faz haritası iki eksenli bir karardır",
      "Faz diyagramı denge koşulunda sıcaklık ve basınca göre madde hâllerini gösterir. Bir bölgenin içinde tek faz, uygun sınır eğrisinde iki faz birlikte bulunabilir. Eğriyi geçmekle aynı bölge içinde bir noktadan diğerine gitmek farklı süreçlerdir.",
      "Sıcaklık yatay, basınç dikey verildiyse izobar yatay, izoterm dikey yoldur. Şematik çizimin piksel uzaklıkları fiziksel enerji veya zaman ölçeği değildir. Faz miktarını belirlemek için yalnız sınır noktasına bakmak yetmez; toplam envanter ve süreç bilgisi gerekebilir.",
    ),
    section018(
      "Üçlü nokta tek bir T ve P çifti",
      "Saf bir maddenin katı, sıvı ve buharının dengede bulunabildiği özel T, P çiftine üçlü nokta denir. Üç çizginin buluşması üç ayrı sıcaklık değerini anlatmaz. Bu noktada her fazdan eşit miktar bulunması da zorunlu değildir.",
      "CO₂ için yaklaşık üçlü veri −56,4 °C ve 5,11 atm olarak verilebilir. 1 atm bunun altında olduğundan uygun sabit basınç ısıtma yolu sıvı bölgesine girmez. Faz şemasını aynı maddenin basıncı farklı günlük örnekleriyle birlikte okumak ezberi azaltır.",
    ),
    section018(
      "Kritik nokta eğrinin sonudur",
      "Sıvı-buhar birlikte bulunma eğrisi kritik noktada sona erer. Kritik sıcaklığın üzerinde yalnız basıncı artırarak bu klasik faz sınırından sıvıya geçilmez. Bu, basıncın yoğunluk üzerinde hiçbir etkisi kalmadığı anlamına gelmez.",
      "Kaynakta CO₂ için yaklaşık Tc=31,2 °C, Pc=73 atm verisi kullanılır. T>Tc ve P>Pc koşulları birlikte sağlandığında kritiküstü akışkan bölgesi konuşulur. Yalnız birinin aşılması ikisini birden aşmış olma sonucu vermez; kritik nokta ile üçlü nokta ayrıdır.",
    ),
    section018(
      "Buhar, gaz ve kritiküstü akışkan",
      "Kritik T’nin altında gaz fazında bulunan madde uygun sıkıştırmayla yoğuşabilir; ders dilinde buhar ayrımı bu sınırı vurgular. T>Tc tarafında basınçla aynı birinci dereceden sıvı-buhar geçişi beklenmez. İsim ayrımı tek başına yeni bir dikey faz sınırı çizmez.",
      "Örneğin CO₂ için 40 °C ve 80 atm iki kritik değerin üstündedir; 40 °C ve 10 atm ise yalnız sıcaklık bakımından üsttedir. Model bu verilmiş durumları ayrı açıklar. Kritiküstü akışkanın mutlaka katılaşması veya ideal gaz olması gerektiği sonucu yoktur.",
    ),
    section018(
      "Suyun erime eğrisi neden farklı?",
      "Saf suyun sıradan buz-sıvı sınırında erime eğrisinin eğimi negatiftir. Basınç artışı bu bölgede erime sıcaklığını düşürebilir; buzun sıvı sudan daha düşük yoğunluklu olmasıyla ilişkilidir. Bu özellik bütün maddelerin erime eğrisine taşınmaz.",
      "CO₂’nin kaynakta gösterilen katı-sıvı eğrisi pozitif eğimlidir. Her iki maddede de sıvı-buhar sınırının T ve P değerleri birlikte okunur. Çok yüksek basınçtaki farklı buz fazları gibi ileri bölgeler basit ders şemasının dışında kalır; bütün su fazlarını tek doğruyla özetleme.",
    ),
    section018(
      "Genleşme her zaman soğuma değildir",
      "Joule–Thomson olayı uygun yalıtılmış kısılma düzeninde yaklaşık sabit entalpiyle basınç düşüşünün sıcaklığa etkisidir. Gerçek gazın başlangıç koşulları ve tersinme bölgesi sonucu belirler. Her genleşmenin aynı deney olduğu varsayılmaz.",
      "İdeal gaz için bu modelde Joule–Thomson sıcaklık değişimi sıfırdır; gerçek gaz soğuyabilir veya ısınabilir. H₂/He gibi örnekleri bütün sıcaklıklarda değişmez bir yasak listesi yapma. İş yapan adyabatik genişleme ile boşluğa serbest genişleme de ayrı enerji bilançoları ister.",
    ),
    section018(
      "Soğutucu seçimi tek özelliğe inmez",
      "Soğutma döngüsünde uygun faz geçişi, çalışma basıncı, güvenlik ve çevre etkileri birlikte değerlendirilir. Bir sıvının buharlaşmasının enerji alması ile kompresör/kısılma düzeninin bütün enerji akışı aynı tek adım değildir. Verim için sistem verileri gerekir.",
      "Ticari adlar her zaman tek bir saf molekülü göstermez; bazı soğutucular karışımdır. Eski bir listedeki çevre veya yasal kullanım cümlesini güncel bütün ürünlere kesin hüküm yapma. Bu çalışma kaynak kazanımını açıklar, kullanıcıya cihaz doldurma veya tehlikeli deney talimatı vermez.",
    ),
    section018(
      "Noktayı seç, sınırı sözle anlat",
      "Faz gezgini yalnız açıkça verilen CO₂ durumlarını sınıflar; eğriler temsildir. Nicel Z görünümü ayrı varsayımsal tek faz verisidir ve aynı gazın n, V, T sabitken keyfî farklı basınçları olduğu iddiası değildir. İki görünümün verileri birbirinin deneyi gibi birleştirilmez.",
      "Bir noktayı seçmeden önce hangi fazı ve hangi kritik koşulu beklediğini yaz. Sonra T, P ve açıklamayı birlikte kontrol et. Bir sonraki tekrar için aynı sıcaklıkta farklı P ile başka bir nokta seç; doğru yargının hangi koşul değişince bozulduğunu açıklamaya çalış.",
    ),
  ],
  examples: [
    example018(
      "Z hesabında molü unutma",
      "Varsayımsal tek faz X için verilen tablo: n=1 mol, T=300 K, V=20 L, P=1 atm. R=0,082 L·atm/(mol·K). Z ve aynı n, V, T’de ideal basınç nedir?",
      "Önce ideal karşılığı kur, sonra boyutsuz oranı bul.",
      [
        "nRT=1×0,082×300=24,6 L·atm olur; ideal basınç 24,6/20=1,23 atm’dir.",
        "Z=PV/(nRT)=20/24,6≈0,813 bulunur; verilen basınç idealden küçüktür.",
        "Bu tek verinin yorumu Z<1’dir. Aynı maddenin bütün koşullarda basıncı idealden küçük olur veya sıvıdır sonucu tek noktadan çıkarılamaz.",
      ],
      "Z≈0,813; P_ideal=1,23 atm",
      "Z=P/P_ideal ve birimsizdir.",
      "n birden farklıyken aynı kısaltmayı n’siz kullanma.",
    ),
    example018(
      "Yukarı sapma da mümkün",
      "Başka bir varsayımsal tek faz örneğinde n=1 mol, T=300 K, V=20 L, P=1,5 atm verilmiştir. R=0,082 L·atm/(mol·K). Z’yi bul ve idealden sapmanın yönünü söyle.",
      "Aynı referans koşullarında PV’yi nRT ile karşılaştır.",
      [
        "PV=1,5×20=30 L·atm; nRT=24,6 L·atm olarak hesaplanır.",
        "Z=30/24,6≈1,220 olur. Verilen P=1,5 atm, ideal 1,23 atm’den büyüktür.",
        "Bu veri her gerçek gazın P’si idealden küçüktür genellemesine uymaz. Örnek verilmiş bir hesap verisidir; belirli bir kimyasal gazın ölçülmüş tablosu olarak sunulmaz.",
      ],
      "Z≈1,220; yukarı sapma",
      "1,220×1,23≈1,5 atm.",
      "Z>1 bilgisini bütün çekimlerin yokluğu diye yorumlama.",
    ),
    example018(
      "İki kritik koşulu birlikte sor",
      "CO₂ için yaklaşık Tc=31,2 °C ve Pc=73 atm veriliyor. A:40 °C/80 atm, B:40 °C/10 atm. Hangisi verilen kritiküstü koşulları birlikte sağlar?",
      "Her noktada T ve P eşitsizliklerini ayrı kontrol et.",
      [
        "A için 40>31,2 ve 80>73; iki eşitsizlik de sağlanır.",
        "B için sıcaklık yüksek olsa da 10<73; ikinci koşul sağlanmaz.",
        "A kritiküstü koşullardadır. B için yalnız T yüksekliği, iki koşulu birlikte sağlayan akışkan bölgesine girdiğinin kanıtı değildir.",
      ],
      "Yalnız A",
      "Kritik noktayı üçlü nokta verisiyle karıştırma.",
      "P veya T’den yalnız birine bakıp karar verme.",
    ),
    example018(
      "1 atm’de kuru buz yolu",
      "Saf CO₂ için üçlü nokta yaklaşık −56,4 °C/5,11 atm, 1 atm süblimleşme sıcaklığı −78,5 °C veriliyor. −90 °C’den 20 °C’ye sabit 1 atm’de ısıtılan dengeli örneğin faz yolu nasıl olur?",
      "Basıncın üçlü noktaya göre yerini belirle.",
      [
        "1 atm<5,11 atm olduğundan bu izobar sıvı bölgesinin altından geçer; −90 °C başlangıcı katıdır.",
        "Yaklaşık −78,5 °C’de katı-buhar dengesi üzerinden süblimleşme olur; süreç boyunca verilen enerji faz miktarını değiştirir.",
        "20 °C’de gaz fazı/buhar bulunur. Bu yolun arasında sıradan sıvı CO₂ aşaması zorunlu değildir; daha yüksek basınç başka yol verebilir.",
      ],
      "Katı → katı+buhar sınırı → buhar",
      "Basınç üçlü noktanın altında kalır.",
      "Saf maddenin her basınçta önce eriyip sonra kaynadığını varsayma.",
    ),
  ],
  recall: [
    {
      prompt: "Z hangi bağıntıyla boyutsuzdur?",
      answer: "PV/(nRT); n=1 değilse molü atlama.",
    },
    {
      prompt: "T>Tc tek başına kritiküstü koşul mu?",
      answer: "Bu kullanımda P>Pc koşulu da gerekir.",
    },
    {
      prompt: "Su ve CO₂ erime eğrileri aynı eğimde mi?",
      answer:
        "Basit ders bölgesinde su negatif, CO₂ pozitif eğimli gösterilir.",
    },
    {
      prompt: "Her genleşme soğutur mu?",
      answer:
        "Hayır; deneyin enerji koşulu ve gazın başlangıç durumu önemlidir.",
    },
  ],
  items: [
    question018(
      "Varsayımsal tek faz gaz verileri n=1 mol, T=300 K, V=20 L, P=1 atm; R=0,082 L·atm/(mol·K). Z=PV/(nRT) yaklaşık kaçtır?",
      "0,813",
      ["1,230", "1", "24,6", "20"],
      "20 değerini 24,6’ya böl.",
      "Z=20/24,6≈0,813 ve boyutsuzdur. Aynı n, V, T’de ideal basınç 1,23 atm olur; verilen basıncın daha küçük olması Z<1 ile tutarlıdır.",
    ),
    question018(
      "Bir tek faz gaz için aynı n, V, T’de Z=1,20 veriliyor. P/P_ideal oranı nedir?",
      "1,20",
      ["1/1,20", "0,20", "2,20", "1"],
      "P_ideal=nRT/V tanımını Z içinde kullan.",
      "Z=PV/(nRT)=P/P_ideal olduğundan oran 1,20’dir. Gerçek veri bu koşulda ideal basınçtan büyüktür; bütün gerçek gazların daima daha düşük P verdiği genellemesi geçersizdir.",
    ),
    question018(
      "CO₂ için Tc=31,2 °C, Pc=73 atm. Hangi nokta hem T>Tc hem P>Pc koşulunu sağlar?",
      "40 °C, 80 atm",
      ["20 °C, 80 atm", "40 °C, 10 atm", "20 °C, 10 atm", "31 °C, 72 atm"],
      "İki büyüklüğü ayrı eşikle karşılaştır.",
      "40>31,2 ve 80>73 birlikte sağlanır. Diğer seçeneklerin en az bir koşulu eksiktir; yalnız yüksek basınç veya yalnız yüksek sıcaklık iki ölçüt yerine geçmez.",
    ),
    question018(
      "Saf X’in sıcaklığı kritik sıcaklığının üzerindedir. Yalnız basınç artırılınca hangi iddia geçersizdir?",
      "Mutlaka klasik sıvı-buhar sınırını geçerek sıvılaşır.",
      [
        "Yoğunluk değişebilir.",
        "Kritik sıcaklık bilgisi önemlidir.",
        "İdeal model gerçek faz davranışının tamamı değildir.",
        "Çalışma basıncının da bilinmesi gerekir.",
      ],
      "Sıvı-buhar birlikte bulunma eğrisinin sonunu düşün.",
      "Kritik sıcaklık üstünde bu klasik birlikte-faz sınırı sürmez. Basınç yoğunluğu etkileyebilir fakat yalnız P artışı mutlaka birinci dereceden yoğuşma olacak sonucu vermez.",
    ),
    question018(
      "CO₂ üçlü basıncı 5,11 atm olarak veriliyor. Saf CO₂ sabit 1 atm’de katıdan ısıtılıyor. Hangi yorum uygundur?",
      "Sıvı bölgesine girmeden süblimleşebilir.",
      [
        "Her durumda önce sıvı olmak zorundadır.",
        "Üçlü nokta 1 atm’dedir.",
        "Basınç sabitse faz hiç değişemez.",
        "Sıcaklık mutlaka bütün süreçte 0 °C’dir.",
      ],
      "İzobarın üçlü noktanın altında kaldığını denetle.",
      "1<5,11 atm olduğundan verilen ders faz haritasında sıvı bölgesi bu yola girmez. Katı-buhar sınırı geçilebilir; her saf madde her basınçta erime-kaynama sırasını izlemek zorunda değildir.",
    ),
    question018(
      "Saf suyun sıradan buz-sıvı sınırının eğimi negatiftir. Bu bölgede basınç artışının erime sıcaklığına etkisi nedir?",
      "Erime sıcaklığını düşürebilir.",
      [
        "Her durumda aynı oranda artırır.",
        "Suyu kesin elemente dönüştürür.",
        "Sıcaklık kavramını ortadan kaldırır.",
        "Hiçbir faz sınırı okunamaz.",
      ],
      "Negatif eğimde P artarken sınır T’sinin yönünü izle.",
      "Bu sınır bölgesinde daha yüksek P daha düşük erime T’siyle ilişkilidir. İddia sıradan buz-sıvı bölgesine aittir; bütün maddelere ve bütün yüksek basınç buz fazlarına taşınmaz.",
    ),
    question018(
      "Saf X’in faz diyagramında bir nokta katı-sıvı-buhar sınırlarının buluştuğu T, P çiftidir. Bu noktanın adı nedir?",
      "Üçlü nokta",
      ["Kritik nokta", "Normal yoğunluk", "İyonlaşma eşiği", "Mutlak sıfır"],
      "Üç fazın birlikte denge koşulunu adlandır.",
      "Üçlü nokta üç fazın dengede bulunabildiği özel T, P çiftidir. Kritik nokta ise sıvı-buhar birlikte bulunma eğrisinin sonuyla ilişkilidir; iki terim aynı yer değildir.",
    ),
    question018(
      "Bir soğutma sorusunda yalnız ‘gaz genleşiyor’ bilgisi var; ısı/iş/entalpi ve başlangıç koşulları verilmemiş. Hangi sonuç güvenlidir?",
      "Bu bilgi tek başına kesin sıcaklık değişimini belirlemez.",
      [
        "Her gaz kesin soğur.",
        "Her gaz kesin ısınır.",
        "Sıcaklık mutlaka iki kat olur.",
        "Genleşme sırasında basınç kavramı yoktur.",
      ],
      "Farklı genleşme deneylerinin enerji koşulları farklıdır.",
      "İzentalpik kısılma, iş yapan adyabatik genişleme ve serbest genişleme aynı bilanço değildir. Gerçek gazın başlangıç koşulu da önemlidir; yalnız genleşiyor sözü kesin ΔT vermez.",
    ),
    question018(
      "Z=PV/(nRT) tanımlanıyor. İdeal bir örnekte n=2 mol ise PV/(RT) kaç olmalıdır?",
      "2 mol",
      ["1 mol", "0,5 mol", "0 mol", "4 mol"],
      "İdeal eşitlik PV=nRT’yi böl.",
      "PV/(RT)=n=2 mol olur; boyutsuz Z için n’ye de bölünür ve 1 çıkar. n=1 mol örneğindeki kısaltmayı her örneğe taşıyıp PV/RT’yi boyutsuz 1 saymak yanlıştır.",
    ),
    question018(
      "Aynı gazın tek bir T, P noktasında Z≈1 ölçülüyor. Hangi yorum doğrudur?",
      "O noktada ideal yaklaşıma yakın olabilir; bütün koşullar için kanıt değildir.",
      [
        "Bütün basınçlarda kesin idealdir.",
        "Öz hacmi fiziksel olarak sıfırdır.",
        "Hiçbir koşulda sıvılaşamaz.",
        "Bütün moleküler etkileşimler doğada yoktur.",
      ],
      "Tek veri noktasını bütün durum eğrisine genişletme.",
      "Z’nin 1’e yakınlığı verilen koşuldaki ideal ilişkiye yakınlığı gösterir. Başka T veya yüksek yoğunlukta etkileşim ve öz hacim sapmaları büyüyebilir; tek nokta tüm faz davranışını belirlemez.",
    ),
  ],
});
units018.push({
  id: "ayt-cozucu-cozunen",
  topic: "detail-418",
  title: "Çözünme: etkileşim, enerji ve derişim dili",
  minutes: 60,
  objectives: [
    "Hidratasyonda suyun doğru ucunu ve etkileşim türünü seç.",
    "Çözünmenin üç enerji katkısını toplam çözünürlükten ayır.",
    "Derişim türünü paydası ve birimiyle gerekçelendir.",
  ],
  source:
    "MEBİ AYT Kimya PDF 46–50; OGM Dersler Cepte Çözücü–Çözünen Etkileşimleri PDF 10–13/35; Aurelia TYT 047 PDF 1–7 ön bilgi köprüsü karşılaştırıldı. Şemalar ve alıştırmalar özgün; resmî sınav sorusu değildir.",
  sections: [
    section018(
      "Çözeltiyi iki farklı soruyla oku",
      "Çözelti uygun ölçekte homojen bir karışımdır; çözücü ve çözünen adları bileşenlerin görevini anlatır. Çözücü genellikle miktarı fazla olan ve çözeltinin fiziksel hâlini belirleyen bileşenle ilişkilendirilir. Her çözelti su içermek zorunda değildir.",
      "Bir maddenin çözünüp çözünmediğini sormak ile çözünmüş miktarın seçilen birim başına ne olduğunu sormak farklıdır. Birincisi yapı, denge ve koşullarla; ikincisi derişim tanımıyla ilişkilidir. Homojen görünüm kimyasal saflık veya tek tür tanecik anlamına gelmez.",
    ),
    section018(
      "Kutupluluğu yalnız tek bağdan çıkarma",
      "Bir molekülün bağları kutuplu olabilir fakat uzaydaki bağ dipolleri birbirini dengeleyebilir. Doğrusal ve simetrik CO₂ buna örnektir. Molekülün toplam kutupluluğu için bağ yönleri ve geometri birlikte değerlendirilir; yalnız merkez atomda ortaklanmamış çift var mı listesi yeterli değildir.",
      "Su için eğik geometri bağ dipollerinin birbirini yok etmemesini sağlar. CH₃Cl ve XeF₄ gibi farklı geometriler, tek bir merkez çift kuralının sınırını gösterir. Soruda şekil verilmemişse gerekli geometri veya dipol toplamı bilgisi kökte bulunmalıdır; olmayan şekle başvurma.",
    ),
    section018(
      "Etkileşimler tek bir etiketle bitmez",
      "London etkileşimleri bütün moleküller arasında bulunabilir; polar molekülde ek dipol etkileri olması London katkısını silmez. Ders tablosunda baskın etkileşimi seçmek, diğer bütün etkileşimlerin kesin sıfır olduğu anlamına gelmez.",
      "Dipol–dipol, iyon–dipol ve hidrojen bağı sınıfları hangi türlerin karşılaştığıyla ilişkilidir. İyonik katının kendi örgüsünde iyon–iyon etkileşimi varken su içinde hidratasyonda iyon–dipol etkileşimi önemlidir. Aynı NaCl adı iki farklı fiziksel bağlamda farklı etkileşim sorusu doğurabilir.",
    ),
    section018(
      "Hidrojen bağında iki görevi ayır",
      "Su gibi uygun O–H bağı taşıyan moleküller hidrojen bağı vericisi olabilir. Uygun ortaklanmamış elektron çifti taşıyan başka bir tür alıcı olabilir. Bir molekülün kendi içinde O–H bulunmaması, suyla hiçbir hidrojen bağı kuramayacağını kanıtlamaz.",
      "Örneğin asetondaki karbonil oksijeni suyun uygun H ucu ile hidrojen bağı etkileşimine katılabilir. Buna rağmen bir etkileşim türünün varlığı her oranda tam karışma garantisi değildir. Uzun apolar bölüm, molekül boyu ve diğer enerji/entropi katkıları sonucu etkiler.",
    ),
    section018(
      "İyon çevresinde su nasıl yönelir?",
      "Suyun oksijen tarafı kısmi negatif, hidrojen tarafları kısmi pozitiftir. Na⁺ gibi katyon çevresinde oksijen ucu, Cl⁻ gibi anyon çevresinde hidrojen uçları iyona daha uygun yönelir. Çizimde δ işaretleri su atomlarının kısmi yüklerini anlatır.",
      "Bu yönelim tek, hareketsiz ve herkes için aynı sayıda su içeren sert bir kafes değildir. Hidratasyon kabukları dinamiktir; şemadaki birkaç su molekülü ölçülmüş kesin koordinasyon sayısı diye okunmaz. İyonun net yükü ile suyun kısmi yüklerini aynı tür tam iyon etiketi yapma.",
    ),
    section018(
      "Örgüyü ayırmak da bir bedel",
      "İyonik katıyı çözmek için yalnız suyun polar olması yetmez; örgü etkileşimlerinin ayrılması ile hidratasyon ve diğer katkılar birlikte değerlendirilir. NaCl uygun miktarda çözünürken AgCl gibi başka bir iyonik katının suda çözünürlüğü çok düşük olabilir.",
      "Bu nedenle bütün iyonik maddeler bütün polar çözücülerde sınırsız çözünür kuralı kurulmaz. Çözünme gerçekleştiğinde iyonik katıyı tek tek NaCl moleküllerine bölmek de uygun temel tanecik modeli değildir. Gerçekte hangi türlerin ve ne kadarının çözündüğü dengeye bağlıdır.",
    ),
    section018(
      "Üç enerji adımını işaretleriyle topla",
      "Öğretim modelinde çözücü taneciklerini ayırmak ve çözünen taneciklerini ayırmak enerji gerektirir; bu iki katkı pozitif alınır. Yeni çözücü–çözünen etkileşimleri kurulurken enerji açığa çıkabilir; solvatasyon katkısı negatiftir. Katkılar aynı süreç ve mol temeli için verilmelidir.",
      "Toplam ΔH bu üç katkının toplamıdır. Sayı negatifse bu modelin çözünme süreci ekzotermik, pozitifse endotermiktir. Ara basamaklar gerçek deneyde tek tek kaplardan geçirilmek zorunda değildir; çizim enerji muhasebesini görünür kılan düşünsel bir yoldur.",
    ),
    section018(
      "ΔH ile çözünürlük aynı çıktı değil",
      "Negatif toplam enerji katkısı, kaç gram maddenin kesin çözüneceğini tek başına söylemez. Çözünme dengesi entropi ve sıcaklıkla da ilişkilidir. Endotermik bir maddenin hiç çözünemeyeceği iddiası bu yüzden doğru değildir.",
      "Benzer benzeri çözer sözü yararlı bir nitel eğilimdir; polar–apolar ikilisinde çözünürlük mutlaka matematiksel sıfırdır diye kullanılmaz. O₂’nin suda sınırlı çözünmesi buna yakın bir örnektir. Nicel çözünürlük isteniyorsa ilgili sıcaklıkta denge verisi veya uygun model verilmelidir.",
    ),
    section018(
      "Çözünme ile tepkimeyi ayır",
      "Şekerin suya dağılmasıyla HCl’nin suda H₃O⁺ ve Cl⁻ oluşturması aynı tür tanecik değişimi değildir. İlkinde temel moleküler türler korunabilir, ikincisinde iyonlaşma ve suyla asit-baz etkileşimi önemlidir. Yalnız dipol–dipol etiketi bütün sulu HCl öğretimini tamamlamaz.",
      "NH₃ için de suyla zayıf asit-baz dengesi ile hidrojen bağı ilişkisi ayrı katmanlardır. Bir maddenin suyla kimyasal tepkime vermesi, basit benzerlik tablosundan çözünür/çözünmez diye karar verme yöntemini sınırlar. Soru hangi değişimin ihmal edildiğini açıkça belirtmelidir.",
    ),
    section018(
      "Derişimde önce payda seçilir",
      "Molarite mol/litre çözelti, molalite mol/kilogram çözücü, kütlece yüzde ise çözünen kütlesi/toplam çözelti kütlesi oranıyla kurulur. Birimlerin benzemesi paydaların aynı olduğu anlamına gelmez. Önce hangi bütünün birim başına paylaştırıldığını yaz.",
      "Kütlece ppm bir mg/kg değeridir; mg/L ile aynı sayıyı vermesi yoğunluğun yaklaşık 1 kg/L olması gibi ek koşul ister. Ölçülmüş son çözelti hacmi yerine çözücünün ilk hacmini koyma. Sıcaklıkla hacim değişirse molarite, kütle kaybı olmadan da değişebilir.",
    ),
    section018(
      "Hız ve son dengeyi karıştırma",
      "Karıştırma veya katının yüzey alanını artırma uygun koşulda çözünme hızını değiştirebilir. Fakat aynı sıcaklıkta uzun süre sonunda ulaşılan denge çözünürlüğünü otomatik artırdığı sonucu çıkmaz. Ne kadar hızlı ile en çok ne kadar iki ayrı sorudur.",
      "Gezgindeki enerji sayıları verilmiş temsili katkılardır; bir tuzun ölçülmüş gerçek hidratasyon verisi diye sunulmaz. İyonu seçip suyun hangi ucunun döndüğünü, katkıları değiştirip toplam işareti tahmin et. Bu çıktıdan tek başına hastalık, temizlik başarısı veya sınırsız çözünme hükmü üretilmez.",
    ),
  ],
  examples: [
    example018(
      "Enerji yolunu tek toplamda bitir",
      "Verilen çözünme modelinde çözücü ayırma +12, çözünen ayırma +28, solvatasyon −46 kJ/mol. Aynı mol temeliyle toplam ΔH ve süreç türü nedir?",
      "Üç işaretli enerji katkısını topla.",
      [
        "İki ayırma katkısı toplam +40 kJ/mol’dür; etkileşim oluşturma −46 kJ/mol katkı verir.",
        "ΔH=12+28−46=−6 kJ/mol bulunur; son enerji başlangıcın altındadır.",
        "Süreç bu verilere göre ekzotermiktir. −6 sayısı kaç gramın çözüneceğini veya bütün karışım oranlarını tek başına vermez.",
      ],
      "−6 kJ/mol; ekzotermik",
      "+40−46 ile aynı sonuca ulaşılır.",
      "Solvatasyon işaretini ikinci kez eksi yapıp toplama çevirmeme.",
    ),
    example018(
      "Endotermik diye sıfır çözünme deme",
      "Aynı temel için +10, +30, −25 kJ/mol katkıları verilmiş bir çözünmede toplam nedir; yalnız bu veriyle hiç çözünmez denebilir mi?",
      "Toplamın işaretini denge yargısından ayır.",
      [
        "Ayırma bedelleri +40; yeni etkileşim katkısı −25 kJ/mol olarak toplanır.",
        "ΔH=10+30−25=+15 kJ/mol; verilen süreç endotermiktir.",
        "Çözünme dengesi için entropi ve sıcaklık gibi koşullar da önemlidir. +15’ten matematiksel sıfır çözünürlük sonucu çıkmaz.",
      ],
      "+15 kJ/mol; hiç çözünmez sonucu çıkmaz.",
      "Enerji işareti ile çözünürlük miktarı ayrı sorulardır.",
      "Bir termodinamik katkıyı bütün denge ölçütü yerine koyma.",
    ),
    example018(
      "ppm ile litreyi yoğunluk bağlar",
      "Kütlece 2 mg/kg madde içeren homojen çözeltinin yoğunluğu 1,20 kg/L. Bir litre çözeltide kaç mg madde bulunur?",
      "Litreyi verilen yoğunlukla kilogram çözeltiye çevir.",
      [
        "Bir litre çözeltinin kütlesi 1,20 kg olur; verilen 2 mg/kg kütle bazındadır.",
        "Madde miktarı 2 mg/kg×1,20 kg=2,40 mg hesaplanır.",
        "Sonuç mg/L olarak 2,40’tır; kütlece ppm ise 2 olarak kalır. Yoğunluk 1 kg/L olsaydı iki sayısal değer eşit çıkabilirdi.",
      ],
      "2,40 mg",
      "mg/kg ile kg çarpılır; yalnız mg kalır.",
      "Yoğunluğu vermeden ppm ile mg/L’yi her durumda eşitleme.",
    ),
    example018(
      "Aynı çözelti, iki farklı payda",
      "18 g glikozun mol kütlesi 180 g/mol. 200 g suda tamamen çözülüyor; ölçülmüş son çözelti hacmi 250 mL. Molarite ve molaliteyi bul.",
      "Aynı molü iki doğru paydada ayrı kullan.",
      [
        "n=18/180=0,10 mol; çözücü kütlesi 0,200 kg, son çözelti hacmi 0,250 L’dir.",
        "Molarite 0,10/0,250=0,40 mol/L; molalite 0,10/0,200=0,50 mol/kg çözücü olur.",
        "İki sayı farklıdır çünkü iki payda farklı fiziksel bütündür. 200 g suyu otomatik son 250 mL çözeltiyle aynı büyüklük saymak doğru değildir.",
      ],
      "0,40 mol/L; 0,50 mol/kg çözücü",
      "Mol aynı, çözelti hacmi ve çözücü kütlesi ayrı.",
      "Molaritede litre çözücü veya molalitede kilogram çözelti kullanma.",
    ),
  ],
  recall: [
    {
      prompt: "Na⁺ çevresine suyun hangi ucu?",
      answer: "Kısmi negatif oksijen ucu; Cl⁻ için hidrojen tarafları.",
    },
    {
      prompt: "Negatif ΔH çözünürlük miktarını tek başına verir mi?",
      answer: "Hayır; denge, sıcaklık ve entropi gibi ek bilgiler gerekir.",
    },
    {
      prompt: "London yalnız apolar molekülde mi?",
      answer: "Hayır; polar moleküller arasında da bulunabilir.",
    },
    {
      prompt: "Kütlece 1 ppm ne demektir?",
      answer: "1 mg/kg çözelti; mg/L eşitliği ek yoğunluk koşulu ister.",
    },
  ],
  items: [
    question018(
      "Na⁺ iyonu suda hidratlanıyor. Su molekülünün O tarafı δ⁻, H tarafı δ⁺ olarak veriliyor. İyona hangi uç uygun yönelir?",
      "Oksijen tarafı",
      [
        "Yalnız hidrojen tarafı",
        "Hiçbir uç; suyun dipolü yoktur.",
        "Na⁺’nın protonu suya geçer.",
        "Su zorunlu O²⁻ ve H⁺ iyonlarına ayrılır.",
      ],
      "Pozitif iyon kısmi negatif ucu çeker.",
      "Na⁺ ile Oδ⁻ arasında uygun iyon–dipol yönelimi kurulur. Bu, suyun bütün oksijenlerinin serbest O²⁻ iyonu olduğu anlamına gelmez; δ işareti kısmi yükü gösterir.",
    ),
    question018(
      "Cl⁻ çevresinde suyun Oδ⁻ ve Hδ⁺ uçları düşünülüyor. Uygun hidratasyon yönü hangisidir?",
      "Hidrojen tarafları anyona yönelir.",
      [
        "Oksijen tarafı aynı işaret yüzünden zorunlu en yakındır.",
        "Cl⁻ proton kazanıp başka element olur.",
        "Suyun bütün kısmi yükleri sıfırdır.",
        "Her su kesin kalıcı tek yönde donar.",
      ],
      "Negatif iyona uygun kısmi pozitif ucu seç.",
      "Cl⁻ çevresine Hδ⁺ tarafları yönelir. Şema dinamiktir; birkaç çizilmiş su molekülü her anda değişmeyen kesin hidratasyon sayısı veya sert bağ geometrisi iddiası değildir.",
    ),
    question018(
      "Aynı süreç temelinde enerji katkıları +15, +25, −50 kJ/mol. Toplam ΔH nedir?",
      "−10 kJ/mol",
      ["+90 kJ/mol", "+10 kJ/mol", "−90 kJ/mol", "0 kJ/mol"],
      "Ayırma katkılarını topla, solvatasyonun işaretini koru.",
      "ΔH=15+25−50=−10 kJ/mol; verilen modelde süreç ekzotermiktir. Bu işaret tek başına son çözünürlüğün sayısal gram değerini belirlemez.",
    ),
    question018(
      "Bir çözünmenin ΔH değeri +12 kJ/mol olarak verilmiştir. Yalnız bu bilgiden hangisi kesin çıkarılamaz?",
      "Maddenin hiçbir miktarının çözünebilmesi mümkün değildir.",
      [
        "Verilen süreç endotermiktir.",
        "Toplam entalpi katkısı pozitiftir.",
        "Çözünürlük yargısında başka koşullar önemlidir.",
        "Enerji birimi kJ/mol olarak verilmiştir.",
      ],
      "ΔH işaretini bütün denge kararı yerine koyma.",
      "Pozitif ΔH endotermikliği anlatır; hiç çözünmez hükmü için yeterli değildir. Entropi ve sıcaklık etkileriyle endotermik çözünmeler de gerçekleşebilir; sayısal çözünürlük ayrı veri ister.",
    ),
    question018(
      "CO₂ doğrusal ve simetrik, iki C=O bağ dipolü eşit ve zıt yönlüdür. Molekülün toplam dipolü için ne söylenir?",
      "Bağ dipolleri birbirini dengeleyebilir; molekül apolardır.",
      [
        "Her polar bağ molekülü mutlaka polar yapar.",
        "O atomlarının protonları yok olur.",
        "Molekülün toplam yükü kesin +2’dir.",
        "Geometri hiçbir zaman önemli değildir.",
      ],
      "Vektör toplamını tek bağdan ayır.",
      "Verilen eşit ve zıt bağ dipolleri toplamda sıfır olur. Polar bağlar varken simetrik geometri nedeniyle apolar molekül mümkündür; yalnız bağ türüne bakmak yetersizdir.",
    ),
    question018(
      "Suda düşük çözünürlüklü AgCl ve uygun miktarda iyi çözünen NaCl iki iyonik katıdır. Hangi genelleme geçersizdir?",
      "Bütün iyonik katılar suda sınırsız ve aynı ölçüde çözünür.",
      [
        "Örgü ayrılması da enerji katkısıdır.",
        "Hidratasyon çözünme sürecinde önemlidir.",
        "Sıcaklık ve denge verisi sonucu etkileyebilir.",
        "İyonik olmak tek başına nicel çözünürlük değeri vermez.",
      ],
      "Verilen iki örnek aynı bağ sınıfında farklı davranıyor.",
      "İyonik yapı ve polar su, bütün tuzlara aynı sınırsız çözünürlük vermez. Örgü ve hidratasyon gibi katkılar birlikte etkilidir; kökte verilen AgCl karşı örneği mutlak genellemeyi bozar.",
    ),
    question018(
      "Asetonun karbonil oksijeninde uygun elektron çiftleri vardır; kendisinde O–H bağı yoktur. Su ile etkileşim için hangi ifade güvenlidir?",
      "Suyun uygun H ucu ile hidrojen bağı alıcısı olabilir.",
      [
        "Kendisinde O–H yoksa suyla hiçbir hidrojen bağı olamaz.",
        "Bütün asetonda serbest O²⁻ bulunur.",
        "Bu veri tek başına her oranda çözünme miktarını sayısal verir.",
        "London etkileşimi bütün polar moleküllerde yasaktır.",
      ],
      "Hidrojen bağı alıcısı ile vericisinin görevini ayır.",
      "Uygun karbonil oksijeni alıcı, suyun O–H kısmı verici olabilir. Molekülün kendi O–H bağının olmaması, başka bir molekülle H bağı etkileşimini tek başına dışlamaz.",
    ),
    question018(
      "Kütlece 3 mg/kg madde içeren çözeltinin yoğunluğu 1,10 kg/L. Bir litre çözeltide madde miktarı nedir?",
      "3,30 mg",
      ["3 mg", "2,73 mg", "1,10 mg", "30 mg"],
      "Bir litre çözelti kaç kilogram?",
      "1 L çözelti 1,10 kg’dır; 3 mg/kg×1,10 kg=3,30 mg. Kütlece ppm değeri 3 kalırken litre başına miktar yoğunluğa göre değişir; iki derişim temeli ayrıdır.",
    ),
    question018(
      "Aynı T’de aynı tuz ve su örneklerinde yalnız karıştırma hızı artırılıyor; dengeye yeter süre veriliyor. Hangi iddia zorunlu değildir?",
      "Denge çözünürlüğünün mutlaka artması",
      [
        "Çözünme hızının değişebilmesi",
        "Hız ile denge miktarının farklı sorular olması",
        "Verilen sıcaklığın karşılaştırmada önemli olması",
        "Son miktar için çözünürlük sınırının önem taşıması",
      ],
      "Daha hızlı ile en çok ne kadar ayrımını yap.",
      "Karıştırma kütle aktarımını ve çözünme hızını etkileyebilir. Aynı T’de son denge çözünürlüğünü zorunlu artırdığı sonucu yoktur; süre ve denge birbirine karıştırılmaz.",
    ),
    question018(
      "Sulu HCl örneğinde H₃O⁺ ve Cl⁻ oluştuğu açık veriliyor. Öğretim açısından hangi yorum doğrudur?",
      "Su ile iyonlaşma/asit-baz değişimi de hesaba katılmalıdır.",
      [
        "Yalnız nötr moleküllerin dipol etiketi bütün süreci tamamlar.",
        "Çözelti kesin yalnız HCl moleküllerinden oluşur.",
        "Su her durumda tepkimesiz tek bir arka plandır.",
        "İyon oluşumu proton sayısını bütün elementlerde değiştirir.",
      ],
      "Kökte verilen son türleri koru.",
      "H₃O⁺ ve Cl⁻ verisi iyonlaşmayı açık gösterir. Moleküler etkileşim tablosu bu kimyasal tür değişimini yok sayamaz; çözünme ile reaksiyonun kapsamı birlikte belirtilmelidir.",
    ),
  ],
});
units018.push({
  id: "ayt-molarite",
  topic: "detail-419",
  title: "Molarite: son hacimden çok adımlı hesaba",
  minutes: 56,
  objectives: [
    "Son çözelti hacmiyle molariteyi kur ve birimini koru.",
    "Seyreltme/örnek alma/karıştırmada çözünen stoklarını ayır.",
    "Yüzde ve yoğunluktan molariteye geçerken bir litre temelini kullan.",
  ],
  source:
    "MEBİ AYT Kimya PDF 48–50; OGM Dersler Cepte Derişim Birimleri PDF 14–21/35–36; Aurelia TYT 047 PDF 1–7 karşılaştırıldı. Özgün çözümler/sorular; resmî sınav sorusu değildir.",
  sections: [
    section018(
      "Bir litre çözeltinin payı",
      "Molarite M=n_çözünen/V_çözelti bağıntısıyla kurulur; hacim litre olmalıdır. 1 mol/L ifadesi bir litre çözeltide bir mol ilgili çözünen bulunduğunu söyler. Bir litre saf çözücüye bir mol madde eklemek aynı son hacmi garanti etmez.",
      "Çözünen miktarını önce gramdan mole dönüştür. Formül kütlesi 58,5 g/mol olan NaCl için 5,85 g, 0,10 mol formel madde miktarıdır. Molarite bu molü verilen son çözelti litresine böler; iyonların ayrı derişimi daha sonraki ayrışma hesabıdır.",
    ),
    section018(
      "Ölçülen son hacmi koru",
      "Çözünme sırasında çözücü ve çözünenin ayrı ilk hacimleri her durumda toplanabilir değildir. Katı eklemek veya iki sıvıyı karıştırmak son hacmi etkileyebilir. Soruda son hacim ölçülmüşse veya toplamsallık kabulü açık verilmişse o veri kullanılır.",
      "250 mL suya tuz eklenmesiyle son çözeltinin 250 mL’ye tamamlanması farklı işlemlerdir. İlkinde son hacim ek ölçüm gerektirebilir; ikincisinde doğrudan 0,250 L verisi vardır. Formüle sayı koymadan V harfinin neyin hacmi olduğunu bir cümleyle yaz.",
    ),
    section018(
      "Jojede çizgi son çözeltinindir",
      "Belirli derişimde çözeltinin öğretim hazırlığı, verilen çözünen molünün uygun miktar çözücüde tamamen çözünmesi ve son hacmin belirli sıcaklıkta ölçü çizgisine tamamlanmasıyla açıklanır. Çizgi çözücü miktarını değil son çözeltinin hacmini belirtir.",
      "Çözünme sıcaklığı geçici olarak değiştirebilir; hassas hacim için kalibrasyon sıcaklığı ve denge önemlidir. Buradaki sanal model fiziksel madde hazırlama talimatı değildir. Kullanıcının evde kimyasal eklemesi veya PDF’den veri yüklemesi öğrenmenin önkoşulu yapılmaz.",
    ),
    section018(
      "Seyreltmede hangi nicelik sabit?",
      "Aynı çözünen kaybolmuyor, tepkime vermiyor veya çökmüyorsa n₁=n₂ korunur. Bu koşulda M₁V₁=M₂V₂ çıkar; iki hacim aynı birimde yazılabilir. Daha büyük son hacim aynı molü daha seyrek dağıtır.",
      "Bağıntı bir ezber sihri değil mol korunumunun kısaltmasıdır. Uçucu çözüneni buharlaştırırken veya kimyasal tepkime olurken aynı molü korumak geçersiz olabilir. Su buharlaştığında çökelme oluşursa çözünmüş mol ayrıca değişir; toplam tuz ile çözünmüş tuz ayrılır.",
    ),
    section018(
      "Örnek almak derişimi yarıya indirmez",
      "Homojen çözeltiden alınan örnek, ayrılma sırasında seçici kayıp yoksa başlangıçla aynı molariteyi taşır. Yarısını ayırmak toplam molü ve hacmi birlikte yarıya indirir. Oran değişmediğinden derişim aynı kalır.",
      "Alınan örneğin sonradan suyla başka hacme tamamlanması ikinci işlemdir ve derişimi değiştirir. Önce örneğe geçen molü, sonra onun son hacmini hesapla. Kaynak kabın tamamının molünü küçük örneğe taşımak, çözünene olmayan bir madde eklemek olur.",
    ),
    section018(
      "Karıştırmada iki stok defteri",
      "Aynı çözünenin iki çözeltisi birleşince tepkime/kayıp/çökelme yoksa n_toplam=M₁V₁+M₂V₂ olur. Son molarite bu toplamın gerçek son hacme bölünmesidir. Hacimlerin toplanacağı ayrıca verilmedikçe bunu gizli bir kesinlik gibi kullanma.",
      "Basit aritmetik ortalama yalnız eşit hacim gibi uygun özel koşulda çıkar. Küçük hacimli çok derişik çözeltiyle büyük hacimli seyreltik çözeltinin katkıları aynı değildir. Son derişimin iki başlangıç arasında olup olmadığını uygun aynı çözünenli durumda bir kontrol olarak kullan.",
    ),
    section018(
      "Yüzde ve yoğunluğu litre temelinde bağla",
      "Kütlece yüzde Y ve yoğunluk d g/mL verildiğinde bir litre çözelti 1000d gramdır. Bunun Y/100 kadarı çözünen olduğundan çözünen gramı 10dY olur. Mol kütlesine bölünce M=10dY/M_A elde edilir.",
      "Bu kısa formülde Y, örneğin yüzde 20 için 20 sayısıdır; 0,20 değildir. d’nin g/mL olması ve M_A’nın g/mol verilmesi gerekir. Formülü ezberlemek yerine bir litre tablosunu kurmak, başka yoğunluk birimlerinde veya kütle yüzdesi yerine hacim yüzdesi verildiğinde yanlış yolu önler.",
    ),
    section018(
      "Sıcaklık oranı neyi değiştirir?",
      "Kapalı ve madde kaybetmeyen çözeltide sıcaklıkla son hacim değişebilir; molarite n/V olduğundan aynı mol farklı M verebilir. Bunu çözünenin kendiliğinden arttığı diye yorumlama. Gerçek hacim değişimi veya genleşme verisi verilmelidir.",
      "Molalite çözücü kilogramına dayandığı için uygun kapalı, reaksiyonsuz ve kütle kayıpsız süreçte hacim genleşmesine doğrudan bağlı değildir. Fakat bu iki derişimin her koşulda sabitliği hakkında mutlak sonuç kurulmaz; buharlaşma veya reaksiyon gibi başka değişimler öncülü bozar.",
    ),
    section018(
      "Ters hesap ve eksik veri",
      "İstenen kütleyse önce n=MV, sonra m=nM_A yolunu izle. İstenen stok hacmiyse korunacak molü son çözeltiden bulup stok M’ye böl. Birimleri her adımda yazmak litreyi mililitreyle karıştırmayı önler.",
      "Yalnız molarite ve çözünen molü verilmişse son çözelti hacmi bulunabilir; çözücünün ilk hacmi zorunlu bulunmaz. Yalnız kütlece yüzde verilmişse molarite için yoğunluk ve mol kütlesi gibi ek veriler gerekebilir. Eksik veri, sıfır derişim veya varsayılan 1 g/mL demek değildir.",
    ),
    section018(
      "Sonucu üç kapıdan denetle",
      "Önce mol korunumunu, sonra son hacmi, son olarak büyüme-küçülme yönünü kontrol et. Örneğin stoktan suyla seyreltmede son M başlangıçtan büyük çıkıyorsa pay veya hacim yönünü yeniden incele. Sonuca mol/L birimini ekle.",
      "Gezgin tam çözünmüş, uçucu olmayan NaCl ve tepkimesiz/kayıpsız seyreltme modelidir. Son hacim ölçülmüş kabul edilir; eklenen su hacmi her koşulda son eksi ilk diye deney verisi yapılmaz. Tahmin ve gerekçe saklanır fakat doğru soru, ustalık veya XP yerine geçmez.",
    ),
  ],
  examples: [
    example018(
      "Gramdan son litreye",
      "11,7 g NaCl tamamen çözünerek son çözelti hacmi 500 mL’ye tamamlanıyor. M_A(NaCl)=58,5 g/mol. Molarite nedir?",
      "Önce molü, sonra litreyi bul.",
      [
        "n=11,7/58,5=0,20 mol formel NaCl bulunur; son hacim 0,500 L’dir.",
        "M=n/V=0,20/0,500=0,40 mol/L hesaplanır.",
        "0,40 mol/L×0,500 L=0,20 mol stok geri gelir. Bu 0,40 değeri bütün iyonların toplam molaritesi olarak adlandırılmaz.",
      ],
      "0,40 mol/L",
      "M×V aynı başlangıç molünü verir.",
      "500 mL’yi 500 L gibi kullanma.",
    ),
    example018(
      "Örnek al, sonra tamamla",
      "0,60 M homojen stoktan 150 mL alınıp kayıpsız şekilde son 450 mL’ye seyreltiliyor. Tepkime/çökelme yok. Son molarite?",
      "Örneğe geçen molü bul, son hacme böl.",
      [
        "Örnek molü 0,60×0,150=0,090 mol; stok kabın bütün molü değil yalnız bu örnek taşınır.",
        "Son hacim 0,450 L; M_son=0,090/0,450=0,20 mol/L bulunur.",
        "Hacim üç kat, molarite üçte bir; 0,20×0,450=0,090 mol korunur. Yalnız örnek alma ilk anda derişimi değiştirmemişti.",
      ],
      "0,20 mol/L",
      "0,60×150=0,20×450 aynı mol temelli çarpımı verir.",
      "Örnek alma ile seyreltmeyi tek işlem sanma.",
    ),
    example018(
      "Farklı hacimleri ağırlıklandır",
      "Aynı çözünenin 0,20 M 200 mL ve 0,50 M 100 mL çözeltileri kayıpsız/tepkimesiz birleşiyor; son hacim 300 mL olarak veriliyor. Son M?",
      "Molleri topla; yüzde veya M ortalamasını doğrudan alma.",
      [
        "İlk mol 0,20×0,200=0,040; ikinci mol 0,50×0,100=0,050; toplam 0,090 mol olur.",
        "Son hacim 0,300 L olduğundan M_son=0,090/0,300=0,30 mol/L bulunur.",
        "Sonuç 0,20 ile 0,50 arasındadır; basit ortalama 0,35 farklı çıkar çünkü hacimler eşit değildir. Verilen son hacim kullanılmıştır.",
      ],
      "0,30 mol/L",
      "0,30×0,300=0,090 mol.",
      "İki molariteyi eşit ağırlıklı sayma.",
    ),
    example018(
      "Kütlece yüzden molariteye",
      "Özgün hesap verisi: kütlece %20 X çözeltisi, yoğunluk 1,20 g/mL, M_A(X)=60 g/mol. X tamamen çözünmüş. Molarite nedir?",
      "Bir litre çözeltinin kütlesini temel al.",
      [
        "1 L çözelti 1000×1,20=1200 g’dır. Bunun %20’si çözünen olduğundan 240 g X içerir.",
        "n_X=240/60=4 mol; bu mol 1 L çözeltiye aittir.",
        "M=4 mol/L bulunur. 1 L çözücü değil 1 L çözelti temelinin seçilmesi yoğunluk ve yüzdeyi doğru bağlamıştır.",
      ],
      "4 mol/L",
      "10×1,20×20/60=4 kısa formülüyle aynı.",
      "Y sayısını hem 20 hem 0,20 gibi iki farklı biçimde kullanma.",
    ),
  ],
  recall: [
    {
      prompt: "Molaritenin paydası?",
      answer: "Litre cinsinden son çözelti hacmi; ilk çözücü hacmi değil.",
    },
    {
      prompt: "M₁V₁=M₂V₂ neyi korur?",
      answer: "Kayıpsız/tepkimesiz durumda aynı çözünenin molünü.",
    },
    {
      prompt: "Homojen çözeltinin yarısı ayrılırsa M?",
      answer: "Mol ve hacim aynı oranda ayrıldığından aynı kalır.",
    },
    {
      prompt: "Yüzdeden M’ye hangi ek veriler?",
      answer: "Uygun yoğunluk, bileşen mol kütlesi ve yüzde türü gerekir.",
    },
  ],
  items: [
    question018(
      "5,85 g NaCl tamamen çözünüp son hacim 250 mL’ye tamamlanıyor. M_A=58,5 g/mol. Molarite nedir?",
      "0,40 mol/L",
      ["0,10 mol/L", "0,025 mol/L", "4 mol/L", "2,34 mol/L"],
      "0,10 molü 0,250 L’ye böl.",
      "n=5,85/58,5=0,10 mol; M=0,10/0,250=0,40 mol/L. Son hacim çözeltinindir. İyonların toplam derişimi ayrı bir ayrışma hesabı gerektirir.",
    ),
    question018(
      "0,50 M stoktan 100 mL alınıp son 500 mL’ye seyreltiliyor. Çözünen kaybı, tepkime ve çökelme yok. Son M nedir?",
      "0,10 mol/L",
      ["0,50 mol/L", "2,50 mol/L", "0,05 mol/L", "0,25 mol/L"],
      "Örnek molü 0,50×0,100’dür.",
      "0,050 mol korunur; son 0,500 L’ye bölünürse 0,10 mol/L çıkar. Hacim beş kat arttığı için molarite beşte bire iner; stok kabın bütün molü taşınmaz.",
    ),
    question018(
      "Homojen 0,80 M çözeltiden seçici kayıp olmadan 50 mL örnek alınıyor; henüz su eklenmiyor. Örneğin molaritesi nedir?",
      "0,80 mol/L",
      ["0,40 mol/L", "0,04 mol/L", "1,60 mol/L", "50 mol/L"],
      "Örnek alma n ve V’yi aynı oranda ayırır.",
      "Homojen örnek başlangıçla aynı molaritededir. 0,80×0,050=0,040 mol örneğe geçer fakat bu 0,040 sayısı molarite değil mol miktarıdır; su ekleme ikinci bir işlem olurdu.",
    ),
    question018(
      "Aynı çözünenin 0,10 M 100 mL ve 0,30 M 300 mL çözeltileri kayıpsız birleşiyor. Son hacim 400 mL, tepkime/çökelme yok. Son M?",
      "0,25 mol/L",
      ["0,20 mol/L", "0,40 mol/L", "0,10 mol/L", "0,30 mol/L"],
      "0,010 ve 0,090 mol katkılarını topla.",
      "Toplam 0,100 mol, son hacim 0,400 L; M=0,25 mol/L. Basit 0,20 ortalaması hacimlerin eşit olduğunu varsayardı; büyük hacimli çözeltinin katkısı daha fazladır.",
    ),
    question018(
      "Kütlece %10 X çözeltisinin yoğunluğu 1,20 g/mL, M_A(X)=40 g/mol. X tamamen çözünmüş. Molarite?",
      "3 mol/L",
      ["0,3 mol/L", "12 mol/L", "1,2 mol/L", "30 mol/L"],
      "Bir litre çözelti 1200 g; bunun %10’u X.",
      "1 L çözeltide 120 g X bulunur; 120/40=3 mol olduğundan M=3 mol/L. Kütlece yüzdeyi 0,10 oranı olarak kullanırsan ayrıca yüzdeye ikinci kez bölme; litre temeli korunur.",
    ),
    question018(
      "Kapalı, tepkimesiz ve madde kaybetmeyen çözeltide n=0,10 mol aynı kalıyor. Isıl genleşmeyle son hacim 200 mL’den 250 mL’ye çıkıyor. M_son/M_ilk nedir?",
      "0,80",
      ["1,25", "1", "0,20", "2"],
      "Mol aynı; derişim hacme ters orantılı.",
      "M_ilk=0,10/0,200=0,50; M_son=0,10/0,250=0,40 mol/L. Oran 0,40/0,50=0,80 olur. Hacim değişimi mol üretimi veya kaybı değildir.",
    ),
    question018(
      "0,20 M 500 mL çözelti hazırlamak için M_A=100 g/mol olan X’ten kaç gram gerekir? X tamamen çözünüyor; başka kayıp yok.",
      "10 g",
      ["20 g", "0,10 g", "100 g", "40 g"],
      "n=MV; sonra m=nM_A.",
      "n=0,20×0,500=0,10 mol; m=0,10×100=10 g bulunur. 500 mL son çözelti hacmidir; önce hacmi litreye çevirerek aynı birim sistemini koru.",
    ),
    question018(
      "Yalnız kütlece %15 ve M_A(X)=50 g/mol veriliyor. Son çözeltinin yoğunluğu veya eşdeğer kütle-hacim verisi yok. Molarite için hangi yorum doğrudur?",
      "Veri yetersizdir; litre çözeltinin kütlesi belirlenemiyor.",
      [
        "Kesin 3 M’dir.",
        "Kesin 0,15 M’dir.",
        "Yoğunluk her çözeltide kesin 1 g/mL’dir.",
        "Molarite her durumda yüzdeye eşittir.",
      ],
      "Yüzde kütleye, M litre çözeltiye dayanır.",
      "Kütlece yüzde ile mol kütlesi gram başına mol payını verir. Litreye geçmek için yoğunluk veya aynı işi yapan veri gerekir; verilmemiş yoğunluğu otomatik 1 almak öncül eklemektir.",
    ),
    question018(
      "2 M stoktan ne kadar hacim alınarak son 300 mL hacminde 0,50 M çözelti hazırlanır? Kayıpsız, tepkimesiz seyreltme kabulü var.",
      "75 mL",
      ["150 mL", "30 mL", "1200 mL", "600 mL"],
      "Stok hacmi M_son V_son/M_stok.",
      "V_stok=0,50×300/2=75 mL. Bu örnekte 0,15 mol çözünen bulunur; son 0,300 L’ye bölünce 0,50 mol/L geri gelir. Su miktarı 75 mL diye okunmaz.",
    ),
    question018(
      "Sulu HCl gibi uçucu çözünen içeren bir örnek buharlaştırılıyor; çözünen kaybının olup olmadığı verilmemiş. M₁V₁=M₂V₂ hakkında güvenli yorum nedir?",
      "Çözünen molünün korunduğu ayrıca doğrulanmalıdır.",
      [
        "Bütün buharlaştırmalarda koşulsuz geçerlidir.",
        "Her durumda çözünen molü iki kat olur.",
        "Uçuculuk hiçbir zaman madde kaybı oluşturmaz.",
        "Son hacim sıfır olmadığı sürece bütün veriler gereksizdir.",
      ],
      "Bağıntının temeli mol korunumudur.",
      "M₁V₁=M₂V₂ aynı çözünmüş molün korunmasını kullanır. Uçucu çözünen de kayboluyorsa bu öncül bozulabilir; yalnız su gidiyor varsayımı bilgi verilmeden eklenmez.",
    ),
  ],
});
units018.push({
  id: "ayt-iyon-derisimi",
  topic: "detail-420",
  title: "İyon derişimi: katsayı, karışım ve yük dengesi",
  minutes: 62,
  objectives: [
    "Tuzun formel molaritesinden iyon stoklarını koşullu hesapla.",
    "Ortak iyonu birden fazla kaynaktan mol temelinde topla.",
    "İyon sayısı, toplam derişim ve yük denkliğini ayrı denetle.",
  ],
  source:
    "MEBİ AYT Kimya PDF 49–50; OGM Dersler Cepte Derişim Birimleri PDF 19–21 karşılaştırıldı. Kaynakta düşük çözünürlüklü tuzların yoğun çözeltisi gibi koşulsuz örnekler aktarılmadı; bütün alıştırmalar özgündür.",
  sections: [
    section018(
      "Formül birimi molekül değildir",
      "NaCl veya CaCl₂ gibi iyonik tuzların katısında temel sayım formül birimiyle yapılır. Çözünen miktarı mol tuz/formel madde olarak verilebilir; bunu çözeltide aynı sayıda bağımsız CaCl₂ molekülü yüzüyor diye yorumlama. Son türleri ayrışma modeli belirler.",
      "CaCl₂(s)→Ca²⁺(aq)+2Cl⁻(aq) denklemi bir formel miktarın hangi stoklara ayrıldığını gösterir. Atomların kimliği ve toplam yük korunur; alt indis iki klor atomunu, denklemin katsayısı iki klorür iyonunu ifade eder. Pozitif iyonun yükü iyon adedi değildir.",
    ),
    section018(
      "Tam çözünme ve tam ayrışma öncülü",
      "[Ca²⁺]=M_tuz ve [Cl⁻]=2M_tuz kısayolu, tuzun tamamen çözündüğü ve iyonlarına tam ayrıştığı; yan tepkime ve kaybın ihmal edildiği modelde geçerlidir. Her iyonik katı için suda istenen her M değeri fiziksel olarak hazırlanabilir değildir.",
      "Düşük çözünürlüklü tuz, iyon çifti oluşumu, kompleksleşme veya hidroliz gibi durumlarda gerçek tür derişimleri başka denge hesabı isteyebilir. Bu ünitenin basit stok soruları hangi etkilerin ihmal edildiğini açık verir. Formel tuz derişimiyle her gerçek serbest türün etkinliği aynı nicelik değildir.",
    ),
    section018(
      "Önce tuzun molünü yaz",
      "M ve hacim verilirse n_tuz=M_tuz V_L bulunur. Ayrışma katsayıları bu molü iyon türlerine çevirir. CaCl₂ için 0,02 mol tuzdan 0,02 mol Ca²⁺ ve 0,04 mol Cl⁻ stoklanır; mol kütlesi bu dönüşüme ayrıca gerekmez.",
      "İyon derişimleri bu iyon mollerinin son çözelti litresine bölünmesiyle elde edilir. Aynı son hacim bütün türler için ortaktır. Her iyona kendi ayrı hacmini verip iki kez bölmek veya katsayıyı hacimle çarpmak fiziksel anlamı bozar.",
    ),
    section018(
      "Tuz M’si ile toplam iyon M’si",
      "Tam ayrışan 0,20 M CaCl₂ çözeltisinde Ca²⁺ 0,20 M, Cl⁻ 0,40 M olur; toplam iyon molaritesi 0,60 mol iyon/L’dir. Bu toplam formel tuzun 0,20 M derişiminden farklıdır. Aynı litre içinde farklı sayım varlıkları sayılmıştır.",
      "İyon yüklerini toplama katsayısı gibi kullanma: bir Ca²⁺ tek iyondur fakat iki birim pozitif yük taşır. İyon molaritesini sayarken bir, elektriksel denklik kurarken iki ile katkı verir. Toplam iyon derişimi ile toplam yük derişimi iki ayrı tablodur.",
    ),
    section018(
      "Çok atomlu iyonu bütün tut",
      "Al₂(SO₄)₃ için uygun tam ayrışma modeli 2Al³⁺ ve 3SO₄²⁻ verir. SO₄²⁻ bir çok atomlu iyon olarak sayılır; bu işlemde otomatik serbest S ve dört serbest O iyonuna parçalanmaz. Formüldeki parantez, bütün sülfat grubunun üç kez yer aldığını gösterir.",
      "0,10 M formel tuz için bu modelde Al³⁺ 0,20 M ve SO₄²⁻ 0,30 M bulunur. Gerçek alüminyum türlerinin sulu denge ayrıntısı isteniyorsa hidroliz gibi etkiler ayrıca gerekir. Sorudaki ideal ayrışma kabulünü gerçek bütün koşullara genişletmeden uygula.",
    ),
    section018(
      "Ortak iyonun iki kaynağı",
      "CaCl₂ ve NaCl karışımında klorür iki ayrı kaynaktan gelir. Önce her çözeltinin tuz molü bulunur; toplam klorür 2n_CaCl₂+n_NaCl olur. Başlangıç molaritelerini katsayılarıyla toplamak ancak aynı hacim temelinde uygun başka bir soruda anlamlı olabilir.",
      "Karışımda son hacim ortak paydadır. Verilen hacimlerin toplandığı kabulü açık olmalıdır; aksi hâlde gerçek ölçülmüş son V gerekir. İki kaynak da klorür içerdiği için yalnız birini saymak, toplamda eksik negatif yük ve yanlış derişim üretir.",
    ),
    section018(
      "Yük denkliği bağımsız bir kontrol",
      "Makroskopik elektriksel nötr çözeltide pozitif ve negatif yük katkıları eşit olmalıdır. Ca²⁺/Na⁺/Cl⁻ karışımında 2[Ca²⁺]+[Na⁺]=[Cl⁻] denetimi yapılabilir. Her iyonun katsayısı yük büyüklüğüdür; iyon sayısını değil yük toplamını karşılaştırır.",
      "Toplam pozitif iyon molaritesiyle toplam negatif iyon molaritesi her zaman eşit değildir. CaCl₂ örneğinde negatif iyon sayısı iki kat, her Ca’nın yükü ise iki kat olduğundan denklik sağlanır. Nötr çözeltide mutlaka eşit sayıda katyon/anyon vardır yargısı bu yüzden yanlıştır.",
    ),
    section018(
      "Seyreltmede bütün türler ortak hacimde",
      "Reaksiyon, çökelme ve seçici kayıp yoksa su ekleyerek hacmi iki kat yapmak her iyonun molünü korur ve her derişimi yarıya indirir. İyonun yükü, atom numarası veya kimliği değişmez. M azalmasını iyonların kendiliğinden kaybolması diye çizme.",
      "Homojen örnek almaksa hem tür mollerini hem hacmi aynı oranda ayırır; örneğin iyon derişimi ilk anda aynıdır. Örnek alındıktan sonra başka hacme tamamlanırsa ikinci bir seyreltme hesabı gelir. İşlemleri sırayla bir stok defterinde tutmak karışıklığı azaltır.",
    ),
    section018(
      "Tepkime varsa başlangıçları doğrudan toplama",
      "Bir araya gelen iyonlar çökelek veya başka ürün oluşturuyorsa önce tepkime ve sınırlayıcı madde hesabı gerekir. Ag⁺+Cl⁻→AgCl(s) örneğinde çözeltide kalan serbest iyonlar başlangıç mollerinin doğrudan toplamı değildir. Katı ürün çözünmüş iyon paydasına eklenmez.",
      "Nicel çökme ve artık çözünürlüğün ihmal edildiği okul modeli verilmişse stoklardan tepkime kadar düşülür. Gerçekte son küçük derişimler çözünürlük dengesi isteyebilir. Nicel modeldeki sıfırı bütün gerçek deneylerde tam matematiksel sıfır diye genelleme.",
    ),
    section018(
      "Bir katsayıyı üç kez kullanma",
      "Ayrışma katsayısı iyon molüne geçişte bir kez uygulanır. Sonra derişimde ortak hacme bölünür. Elektriksel kontrolde iyon yükü ayrıca kullanılır; klorürün 2 katsayısı ile Ca²⁺ yükünün 2 değeri aynı fiziksel işlev değildir.",
      "Örneğin 0,10 mol CaCl₂ için 0,20 mol Cl⁻ bulunmuşsa bir de Cl’ye yük 2 vermek yanlıştır; klorürün yükü −1’dir. Ca²⁺ ise 0,10 mol iyon ve 0,20 mol pozitif yük birimi taşır. Her adımda hangi varlığı saydığını kelimeyle yaz.",
    ),
    section018(
      "Eksik veri ve etkinlik sınırı",
      "Yalnız tuzun gramı verilirse mol kütlesi veya eşdeğer bileşim verisi; derişim için ayrıca son hacim gerekir. Yalnız toplam iyon molaritesi verilmesi de her türün ayrı derişimini her karışımda tekleştirmez. Bilinmeyen sayısı ile bağımsız denklem sayısını düşün.",
      "Bu stok modeli iyon etkinliği, çözelti iletkenliği veya ozmotik sapma katsayısını doğrudan hesaplamaz. Gerçek yoğun çözeltilerde ideal bağıntılardan sapmalar olabilir. Sayısal modelin yeterli olduğu soruyla ileri denge veya ölçüm verisi isteyen soruyu ayırt etmek de öğrenmenin parçasıdır.",
    ),
    section018(
      "Bilanço ile görsel aynı şeyi söylesin",
      "Gezginde CaCl₂/NaCl kaynaklarının M ve hacmini değiştir; tam ayrışma ve verilen hacim toplamı kabulüyle tür başına mol ve M hesaplanır. Sütunlar gerçek derişimi gösterir; renk tek başına tür veya yük bilgisinin yerine geçmez.",
      "Bir kaynak 0 M seçildiğinde o kaynak saf su katkısıdır; tür molleri sıfırsa çizimde varmış gibi tanecik üretilmez. İki kaynak da 0 M ise modelde yalnız su vardır. Tahminini hem tür envanteri hem yük denkliğiyle kontrol et; keşif kaydı bağımsız soru puanı değildir.",
    ),
  ],
  examples: [
    example018(
      "Bir tuzdan iki tür",
      "0,20 M CaCl₂ çözeltisinin hacmi 500 mL. Tam çözünme/ayrışma ve yan tepkime yokluğu kabulüyle Ca²⁺ ve Cl⁻ mollerini ve derişimlerini bul.",
      "Tuz molünü katsayılarla tür stoklarına çevir.",
      [
        "n_tuz=0,20×0,500=0,100 mol. Denklem CaCl₂→Ca²⁺+2Cl⁻ olduğundan Ca 0,100 ve Cl 0,200 mol olur.",
        "Ortak hacim 0,500 L’ye bölünce [Ca²⁺]=0,20 M, [Cl⁻]=0,40 M bulunur.",
        "Toplam iyon derişimi 0,60 M; yük kontrolü 2×0,20=0,40 negatif katkıyla dengededir. İyon sayıları eşit olmak zorunda değildir.",
      ],
      "Ca²⁺:0,100 mol/0,20 M; Cl⁻:0,200 mol/0,40 M",
      "Her mol formel tuzdan üç mol iyon sayılır.",
      "Ca²⁺ yükünü iki Ca iyonu diye okuma.",
    ),
    example018(
      "Klorür iki kaynaktan gelir",
      "0,10 M CaCl₂ 200 mL ve 0,20 M NaCl 300 mL karışıyor. Son hacim 500 mL; tam ayrışma, tepkime/çökelme/hidroliz ihmali açık. Üç iyonun M değerleri?",
      "İyon mollerini ayrı topla; son hacme bir kez böl.",
      [
        "Ca molü 0,10×0,200=0,020; Na molü 0,20×0,300=0,060. Cl molü 2×0,020+0,060=0,100 olur.",
        "Son 0,500 L ile Ca 0,040 M, Na 0,120 M, Cl 0,200 M hesaplanır.",
        "2×0,040+0,120=0,200 yük denetimi sağlanır; toplam iyon molaritesi 0,360 M’dir. Tuz M’lerini doğrudan toplamak bu ortak hacim hesabının yerini tutmaz.",
      ],
      "Ca 0,040 M; Na 0,120 M; Cl 0,200 M",
      "Pozitif ve negatif yük katkısı 0,200 mol yük/L.",
      "CaCl₂’den gelen ikinci klorürü unutma.",
    ),
    example018(
      "Parantez içindeki iyon",
      "İdeal öğretim kabulünde 0,10 M Al₂(SO₄)₃ tamamen çözünüp ayrışıyor; hidroliz/iyon çifti/yan tepkime ihmal. 250 mL örnekte Al³⁺ ve SO₄²⁻ molleri ve M değerleri nedir?",
      "Formel tuzdan 2 ve 3 katsayılarını doğru türlere uygula.",
      [
        "n_tuz=0,10×0,250=0,025 mol; Al iyonu 0,050 mol, sülfat 0,075 mol olur.",
        "Ortak 0,250 L’ye bölünce [Al³⁺]=0,20 M ve [SO₄²⁻]=0,30 M bulunur; SO₄ grubu tek iyon olarak kalır.",
        "Yükler 3×0,20=0,60 ve 2×0,30=0,60 ile eşittir. Bu ideal kabul gerçek bütün alüminyum sulu türlerinin dağılımını hesapladığımız anlamına gelmez.",
      ],
      "Al 0,050 mol/0,20 M; sülfat 0,075 mol/0,30 M",
      "Toplam iyon molü 0,125; derişimi 0,50 mol/L.",
      "Sülfatı serbest S/O iyonlarına parçalama.",
    ),
    example018(
      "Karıştırmadan önce tepkimeyi gör",
      "0,10 M AgNO₃ 100 mL ile 0,10 M NaCl 100 mL karışıyor. Son hacim 200 mL. Ag⁺+Cl⁻→AgCl(s) nicel çöküyor; artık çözünürlük ve diğer tepkimeler ihmal. Kalan Na⁺ ve NO₃⁻ derişimleri?",
      "Önce çöken iyonları, sonra seyirci stoklarını ayır.",
      [
        "Ag ve Cl başlangıçta ayrı 0,010 mol; eşit katsayılarla nicel çökelmede ikisi de okul stok modelinde tüketilir.",
        "Na⁺ 0,010 mol ve NO₃⁻ 0,010 mol çözeltide kalır. Her biri ortak 0,200 L’ye bölünür.",
        "[Na⁺]=[NO₃⁻]=0,050 M. AgCl katısı çözünmüş iyon sayımına eklenmez; gerçek çok küçük artıklar için denge verisi gerekirdi.",
      ],
      "Na⁺ 0,050 M; NO₃⁻ 0,050 M",
      "Seyirci iyonların molleri korunur, yük denkliği kalır.",
      "Tepkime veren Ag ve Cl stoklarını hiç azalmamış gibi toplama.",
    ),
  ],
  recall: [
    {
      prompt: "CaCl₂’de bir mol formel tuz kaç mol Cl⁻ verir?",
      answer: "Tam ayrışma modelinde 2 mol; Ca²⁺ 1 mol.",
    },
    {
      prompt: "SO₄²⁻ sayarken kaç iyon?",
      answer: "Bir çok atomlu iyon; serbest S/O atomları değil.",
    },
    { prompt: "Ca/Na/Cl yük denetimi?", answer: "2[Ca²⁺]+[Na⁺]=[Cl⁻]." },
    {
      prompt: "Karışınca çökelek varsa ilk adım?",
      answer:
        "Tepkime miktarını stoklardan düş; sonra kalan çözünmüş iyonları son V’ye böl.",
    },
  ],
  items: [
    question018(
      "0,20 M CaCl₂ tam çözünüp Ca²⁺+2Cl⁻ olarak ayrışıyor; yan tepkime yok. [Cl⁻] nedir?",
      "0,40 mol/L",
      ["0,20 mol/L", "0,10 mol/L", "0,60 mol/L", "2 mol/L"],
      "Formel tuz M’sini klorür katsayısıyla çarp.",
      "Her formel CaCl₂ miktarı iki Cl⁻ verir; [Cl⁻]=2×0,20=0,40 M. Ca²⁺ derişimi 0,20 M’dir; toplam iyon derişimi ise 0,60 M olur ve sorulan türle aynı değildir.",
    ),
    question018(
      "Tam ayrışan 0,10 M Al₂(SO₄)₃ için hidroliz ve yan tepkime ihmal ediliyor. Sülfat iyonunun derişimi nedir?",
      "0,30 mol/L",
      ["0,20 mol/L", "0,10 mol/L", "1,20 mol/L", "0,50 mol/L"],
      "Parantez dışındaki 3, bütün sülfat grubunu sayar.",
      "Al₂(SO₄)₃→2Al³⁺+3SO₄²⁻ kabulünde [SO₄²⁻]=3×0,10=0,30 M. Çok atomlu iyon bu hesapta serbest S ve O iyonlarına parçalanmaz.",
    ),
    question018(
      "0,10 M CaCl₂ 200 mL ve 0,20 M NaCl 300 mL tam ayrışarak tepkimesiz karışıyor. Son hacim 500 mL. [Cl⁻] kaç M?",
      "0,20 M",
      ["0,10 M", "0,12 M", "0,30 M", "0,04 M"],
      "Klorür molü 2×0,10×0,200+0,20×0,300.",
      "Klorür molü 0,040+0,060=0,100; ortak hacim 0,500 L’dir. [Cl⁻]=0,100/0,500=0,20 M. İki kaynaktan gelen mol toplanır, başlangıç molariteleri kör toplanmaz.",
    ),
    question018(
      "Elektriksel nötr çözeltide yalnız Ca²⁺, Na⁺ ve Cl⁻ var. [Ca²⁺]=0,10 M, [Na⁺]=0,20 M. [Cl⁻] nedir?",
      "0,40 M",
      ["0,30 M", "0,10 M", "0,20 M", "0,60 M"],
      "Pozitif yük katkısı 2Ca+Na.",
      "2×0,10+0,20=0,40 mol pozitif yük/L bulunur. Cl⁻ tek birim negatif yük taşıdığı için [Cl⁻]=0,40 M gerekir; eşit iyon adedi değil yük dengelenir.",
    ),
    question018(
      "0,15 M CaCl₂ tamamen çözünmüş/ayrışmış; diğer tepkimeler ihmal. Toplam iyon molaritesi kaç mol iyon/L’dir?",
      "0,45",
      ["0,15", "0,30", "0,60", "0,05"],
      "Bir formel tuzdan toplam üç iyon çıkar.",
      "Ca²⁺ 0,15 M ve Cl⁻ 0,30 M; toplam 0,45 mol iyon/L olur. Ca²⁺ yükü +2 olsa da iyon sayımında bir tür başına bir iyon katkısıdır; formel tuz M’si ayrı kalır.",
    ),
    question018(
      "Tam ayrışmış NaCl çözeltisi kayıpsız/tepkimesiz su eklemeyle son hacmi iki katına çıkarılıyor. Na⁺ molü ve derişimi nasıl değişir?",
      "Molü aynı; derişimi yarıya iner.",
      [
        "Molü yarı; derişimi aynı.",
        "İkisi de iki kat.",
        "Molü iki kat; derişimi yarı.",
        "İyonun proton sayısı yarıya iner.",
      ],
      "Tür molü korunur; payda büyür.",
      "Su eklemek Na⁺ üretmez veya yok etmez. Ortak hacim iki kat olunca [Na⁺]=n/V yarıya iner; iyonun yükü ve element kimliği değişmez. Aynı işlem Cl⁻ için de geçerlidir.",
    ),
    question018(
      "0,20 M Na₂SO₄ çözeltisi için tam çözünme/ayrışma ve yan tepkime ihmali verilmiş. [Na⁺] ve [SO₄²⁻] sırasıyla nedir?",
      "0,40 M ve 0,20 M",
      [
        "0,20 M ve 0,40 M",
        "0,20 M ve 0,20 M",
        "0,40 M ve 0,40 M",
        "0,10 M ve 0,20 M",
      ],
      "İki Na, bir sülfat katsayısını ayır.",
      "Na₂SO₄→2Na⁺+SO₄²⁻ olduğundan değerler 0,40 ve 0,20 M’dir. Yük kontrolünde 0,40 pozitif, 2×0,20=0,40 negatif katkı vardır; sülfatı dört oksijen iyonu yapma.",
    ),
    question018(
      "Bir çözeltide 0,020 mol Ca²⁺ ve 0,040 mol Cl⁻ var; başka çözünmüş iyon yok. Ortak son hacim 0,50 L. Ca²⁺ derişimi nedir?",
      "0,040 mol/L",
      ["0,080 mol/L", "0,020 mol/L", "0,120 mol/L", "0,010 mol/L"],
      "Sorulan türün kendi molünü ortak hacme böl.",
      "[Ca²⁺]=0,020/0,50=0,040 mol/L. İyonun +2 yükü molariteyi tekrar ikiyle çarpmayı gerektirmez; yük denetimi başka adımdır. Klorür 0,080 M olur.",
    ),
    question018(
      "Ag⁺+Cl⁻→AgCl(s) tepkimesinin nicel olduğu ve artık çözünürlüğün ihmal edildiği karışım modelinde her iki giren başlangıçta 0,010 mol. Hangisi doğrudur?",
      "Çözünmüş Ag ve Cl stokları tepkime miktarı kadar düşülmelidir.",
      [
        "İkisinin çözünmüş molü kesin hiç değişmez.",
        "Katı ürünün molü bütün türlere ayrı ayrı eklenir.",
        "Tepkime toplam element atomlarını yok eder.",
        "Son hacim her zaman 0 L olur.",
      ],
      "Başlangıç stoklarını son serbest iyon sanma.",
      "1:1 tepkimede 0,010 mol AgCl oluşur ve okul modelinde bu kadar Ag⁺/Cl⁻ çözünmüş stoktan çıkar. Gerçek küçük artık derişimler için ayrıca çözünürlük dengesi gerekir; bu model onu ihmal etmiştir.",
    ),
    question018(
      "CaCl₂ ve NaCl için her iki kaynak da 0 M seçiliyor; yalnız saf su hacimleri tepkimesiz toplanıyor. Bu modelin çözünmüş iyonları için doğru sonuç nedir?",
      "Bu iki tuzdan gelen Ca²⁺, Na⁺ ve Cl⁻ stokları sıfırdır.",
      [
        "Her kaynak mutlaka bir mol tuz sağlar.",
        "0 M, yükün sıfır olduğu nötr tuz molekülü miktarını garanti eder.",
        "Su hacmi artınca kendiliğinden Cl⁻ oluşur.",
        "Ca²⁺ sayısı hacimden bağımsız mutlaka pozitiftir.",
      ],
      "n=MV’de M=0 kullan.",
      "İki kaynak için de formel tuz molü 0’dır; bu kaynaklardan gelen Ca/Na/Cl iyon stokları oluşmaz. Su öz iyonlaşması bu tuz stok modelinin çıktısı değildir; çizimde var olmayan tuz iyonu üretilmez.",
    ),
  ],
});

const answerPositions018 = [
  [2, 4, 1, 0, 3, 1, 3, 4, 2, 0],
  [3, 1, 4, 2, 0, 4, 2, 0, 3, 1],
  [0, 3, 2, 4, 1, 2, 4, 1, 0, 3],
  [4, 0, 3, 1, 2, 3, 1, 2, 4, 0],
  [1, 2, 0, 3, 4, 0, 4, 3, 1, 2],
  [2, 0, 4, 1, 3, 4, 3, 0, 2, 1],
];
export const forge018ChemistryTopics: Record<string, string> =
  Object.fromEntries(units018.map((u) => [u.id, u.topic]));
export const forge018ChemistryGuides: LessonGuide[] = units018.map((u) => ({
  id: u.id,
  minutes: u.minutes,
  objectives: u.objectives,
  source: u.source,
  sections: u.sections.map(([title, first, second]) => ({
    title,
    paragraphs: [first, second],
  })),
  examples: u.examples,
  recall: u.recall,
}));
export const forge018ChemistryLessons: Lesson[] = units018.map(
  (u, unitIndex) => ({
    id: u.id,
    subjectId: "ayt-kimya",
    title: txt(u.title),
    minutes: u.minutes,
    objectives: u.objectives.map(txt),
    source: txt(u.source),
    tags: [u.id, "kaynakli-anlatim", "forge018"],
    body: u.sections.map(([title, first, second]) => ({
      title: txt(title),
      text: txt(first + "\n\n" + second),
    })),
    questions: u.items.map(
      ([prompt, correct, wrong, hint, explanation], i): Question => {
        const answer = answerPositions018[unitIndex][i],
          options: string[] = [...wrong];
        options.splice(answer, 0, correct);
        return {
          id: `f018-chem-${u.id}-${i + 1}`,
          prompt: txt(prompt),
          options: options.map(txt),
          answer,
          hint: txt(hint),
          explanation: txt(explanation),
          skill: u.id,
        };
      },
    ),
  }),
);
