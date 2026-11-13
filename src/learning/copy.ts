import { useApp } from "../store";
export const visualCopy: Record<string, [string, string]> = {
  adenosine: ["Adenozin", "Adenosine"],
  phosphateNote: [
    "Şemada P, bağlı fosfat grubunu temsil eder.",
    "P represents a bound phosphate group in the diagram.",
  ],
  explore: ["Dokun, değiştir, keşfet", "Touch, change, explore"],
  visualNote: [
    "Bu şemayı kullanmak öğrenme puanı kazandırmaz. Bağımsız çözüm Sorular bölümünde kaydedilir.",
    "Exploring this diagram earns no learning credit. Independent answers are recorded in Questions.",
  ],
  cellTitle: ["Hücreyi içeriden keşfet", "Explore inside a cell"],
  cellHelp: [
    "Şekilde bir yapıya dokun veya aşağıdaki adını seç. Görevini ve hangi hücrede bulunduğunu karşılaştır.",
    "Tap a structure or choose its name below. Compare its function and where it occurs.",
  ],
  animal: ["Hayvan hücresi", "Animal cell"],
  plant: ["Yeşil bitki hücresi", "Green plant cell"],
  cellDiagram: ["Etkileşimli hücre şeması", "Interactive cell diagram"],
  cellScale: [
    "Tipik hücre şemalarıdır; organel boyutları ve sayıları ölçekli değildir. Her bitki hücresinde kloroplast bulunmaz.",
    "These are typical schematic cells; organelle sizes and counts are not to scale. Not every plant cell contains chloroplasts.",
  ],
  secretion: ["Salgı proteininin yolunu izle", "Follow a secreted protein"],
  nextStep: ["Sonraki adım", "Next step"],
  previousStep: ["Önceki adım", "Previous step"],
  reset: ["Başa dön", "Reset"],
  route0: [
    "Çekirdekte DNA bilgisi mRNA’ya aktarılır. DNA çekirdekte kalır.",
    "In the nucleus, DNA information is transcribed into mRNA. DNA stays in the nucleus.",
  ],
  route1: [
    "Granüllü ER’ye bağlı ribozomlarda salgı proteini sentezlenir.",
    "Ribosomes bound to rough ER synthesise the secreted protein.",
  ],
  route2: [
    "Protein ER’de işlenir; taşıma vezikülleriyle Golgi’ye gider.",
    "The protein is processed in ER and carried to Golgi in transport vesicles.",
  ],
  route3: [
    "Golgi proteini değiştirir, sınıflandırır ve veziküllere paketler.",
    "Golgi modifies, sorts and packages the protein into vesicles.",
  ],
  route4: [
    "Salgı vezikülü hücre zarıyla kaynaşır. İçerik ekzositozla dışarı verilir.",
    "A secretory vesicle fuses with the plasma membrane. Exocytosis releases its contents.",
  ],
  periodicTitle: [
    "Periyodik tablo: yer değişir mi?",
    "Periodic table: does the position change?",
  ],
  periodicHelp: [
    "118 elementten birini seç. Proton sayısını, grubunu ve periyodunu incele. İlk 20 elementin katman modelini de görebilirsin.",
    "Choose one of 118 elements. Inspect atomic number, group and period. Shell models are also available for the first 20.",
  ],
  element: ["Element seç", "Choose an element"],
  first20: ["İlk 20 element", "First 20 elements"],
  all118: ["118 element", "118 elements"],
  group: ["Grup", "Group"],
  period: ["Periyot", "Period"],
  atomicNumber: ["Atom numarası / proton", "Atomic number / protons"],
  electrons: ["Elektron", "Electrons"],
  charge: ["Tanecik yükü", "Particle charge"],
  neutral: ["Nötr", "Neutral"],
  cation: ["Katyon", "Cation"],
  anion: ["Anyon", "Anion"],
  ionNote: [
    "Yük değişince elektron sayısı değişir; proton sayısı ve tablodaki yer sabit kalır. Sayaçtaki her yük değeri doğada kararlı bir iyon demek değildir.",
    "Changing charge changes the electron count; atomic number and table position stay fixed. Not every charge shown represents a stable ion in nature.",
  ],
  shellNote: [
    "İlk 20 nötr atom için basitleştirilmiş katman modeli. Noktalar tanecik sayısını gösterir; gerçek yörünge veya boyut değildir.",
    "Simplified shell model for the first 20 neutral atoms. Dots represent electron counts, not actual orbits or scale.",
  ],
  shellTitle: ["Nötr atomun katmanları", "Neutral atom shells"],
  shellMissing: [
    "Bu element için katman animasyonu bu derste gösterilmiyor. Atom numarası ve tablo konumu incelenebilir.",
    "This lesson does not show a shell animation for this element. Atomic number and table position remain available.",
  ],
  tableScroll: [
    "Tam tablo yatay kaydırılabilir. Element seçimi listesinden de her elemana ulaşabilirsin.",
    "The full table scrolls horizontally. Every element is also available in the selector.",
  ],
  fblock: ["f-blok", "f-block"],
  geometryTitle: ["Kes, taşı, alanı koru", "Cut, move, preserve area"],
  geometryHelp: [
    "Tabanı ve dik yüksekliği değiştir. Parçaların alanını koruyarak yeni şekli oluştur.",
    "Change the base and perpendicular height. Rearrange pieces without changing their area.",
  ],
  parallelogram: ["Paralelkenar", "Parallelogram"],
  triangle: ["Üçgen", "Triangle"],
  base: ["Taban b", "Base b"],
  height: ["Dik yükseklik h", "Perpendicular height h"],
  area: ["Alan", "Area"],
  squareUnits: ["birim²", "square units"],
  geometryDiagram: [
    "Alan koruyan parçalama ve birleştirme şeması",
    "Area-preserving dissection and reassembly diagram",
  ],
  geometryP0: [
    "Paralelkenarı incele. h, tabana dik uzaklıktır; eğik kenar uzunluğu değildir.",
    "Inspect the parallelogram. h is the perpendicular distance to the base, not the slanted side.",
  ],
  geometryP1: [
    "Soldaki üçgeni dik yükseklik boyunca kes. Parça hâlâ aynı alana sahip.",
    "Cut the left triangle along the perpendicular height. The piece keeps its area.",
  ],
  geometryP2: [
    "Üçgeni sağa taşı. Ne döndürdük ne büyüttük: yalnızca yerini değiştirdik.",
    "Translate the triangle to the right. No rotation or resizing: only its position changes.",
  ],
  geometryP3: [
    "Artık aynı taban ve yüksekliğe sahip bir dikdörtgen var. Alan b × h.",
    "The result is a rectangle with the same base and height. Area is b × h.",
  ],
  geometryT0: [
    "İki eş üçgeni gör. Aynı taban ve dik yüksekliğe sahipler.",
    "Observe two congruent triangles with the same base and height.",
  ],
  geometryT1: [
    "Parçaları yaklaştır. Kenar uzunlukları ve alanları değişmiyor.",
    "Bring the pieces closer. Their side lengths and areas do not change.",
  ],
  geometryT2: [
    "İki üçgen birlikte bir dikdörtgen oluşturuyor.",
    "The two triangles form a rectangle together.",
  ],
  geometryT3: [
    "Dikdörtgenin alanı b × h. Her üçgen bunun yarısı: b × h / 2.",
    "The rectangle has area b × h. Each triangle is half of it: b × h / 2.",
  ],
  fractionsTitle: ["Kesri gör", "See the fraction"],
  numerator: ["Pay", "Numerator"],
  denominator: ["Payda", "Denominator"],
  negative: ["Negatif göster", "Show a negative value"],
  fractionHelp: [
    "Aynı büyüklükte bir bütünü eş parçalara ayır. Payda artınca her parça küçülür. İşareti değiştirince sayı doğrusunda yön değişir.",
    "Divide the same whole into equal parts. More parts make each part smaller. Changing the sign changes its position on the number line.",
  ],
  factorTitle: ["Çarpanları alan olarak gör", "See factors as areas"],
  factorHelp: [
    "Pozitif uzunluklarla dört dikdörtgen oluştur. Renkli alanların toplamı, büyük dikdörtgenin alanına eşittir.",
    "Build four rectangles with positive lengths. Their areas add up to the area of the large rectangle.",
  ],
  forceTitle: ["Kuvvetleri dengede gör", "Explore the force balance"],
  leftForce: ["Sola kuvvet", "Leftward force"],
  rightForce: ["Sağa kuvvet", "Rightward force"],
  mass: ["Kütle", "Mass"],
  netForce: ["Net kuvvet", "Net force"],
  acceleration: ["İvme", "Acceleration"],
  forceNote: [
    "Oklar kuvveti gösterir; bu bir konum animasyonu değildir. Net kuvvet sıfırsa ivme sıfırdır; hızın da sıfır olması gerekmez.",
    "Arrows show forces; this is not a position animation. Zero net force means zero acceleration, not necessarily zero velocity.",
  ],
  moleTitle: ["Kütleden tanecik sayısına", "From mass to particle count"],
  substance: ["Madde", "Substance"],
  moleNote: [
    "Şema tek bir molekülün yapısını gösterir. Molar kütleler H₂O için 18, CO₂ için 44 g/mol alınmıştır.",
    "The diagram shows one molecule. Molar masses are approximated as 18 g/mol for H₂O and 44 g/mol for CO₂.",
  ],
  atpTitle: ["Enerji aktarım döngüsü", "Energy transfer cycle"],
  phosphorylation: ["ATP sentezini göster", "Show ATP synthesis"],
  hydrolysis: ["ATP hidrolizini göster", "Show ATP hydrolysis"],
  atpSynthesis: [
    "ADP + Pi + enerji → ATP + H₂O. Sentez için enerji gerekir.",
    "ADP + Pi + energy → ATP + H₂O. Synthesis requires energy.",
  ],
  atpHydrolysis: [
    "ATP + H₂O → ADP + Pi. Açığa çıkan enerji hücresel işlere aktarılabilir.",
    "ATP + H₂O → ADP + Pi. Released energy can be coupled to cellular work.",
  ],
  atpNote: [
    "Hücre enerjiyi yoktan üretmez; dönüştürür ve aktarır. ATP uzun süreli enerji deposu değildir.",
    "Cells transform and transfer energy; they do not create it from nothing. ATP is not a long-term energy store.",
  ],
  paragraphTitle: ["Düşüncenin izini sür", "Trace the argument"],
  paragraphHelp: [
    "Bir cümleye dokun. Örneği, karşıtlığı ve ana düşünceyi ayır.",
    "Select a sentence. Distinguish the example, contrast and main idea.",
  ],
  sentence0: [
    "Bir bilgiyi bir kez okumak onu kolayca tanıdık hissettirebilir.",
    "Reading something once can make it feel familiar.",
  ],
  sentence1: [
    "Oysa kitabı kapatıp açıklamaya çalışmak, eksik kalan noktaları ortaya çıkarır.",
    "Yet closing the book and explaining it reveals gaps.",
  ],
  sentence2: [
    "Bu yüzden çalışmanın niteliği, yalnız tekrar sayısıyla değil, bilgiyi kullanabilmekle değerlendirilmelidir.",
    "Study quality should therefore be judged by the ability to use knowledge, as well as by repetition.",
  ],
  sentenceRole0: [
    "Giriş gözlemi: tanıdıklık hissini kuruyor.",
    "Opening observation: introduces the feeling of familiarity.",
  ],
  sentenceRole1: [
    "Karşıtlık ve açıklama: “oysa” ile önceki gözlemin sınırını gösteriyor.",
    "Contrast and explanation: “yet” shows the limit of the opening observation.",
  ],
  sentenceRole2: [
    "Ana düşünce: önceki cümlelerden çıkan genel yargı.",
    "Main idea: the general conclusion supported by the preceding sentences.",
  ],
};
export function useVisualCopy() {
  const { state } = useApp();
  return (key: string) =>
    visualCopy[key]?.[state.settings.locale === "tr" ? 0 : 1] ?? key;
}
