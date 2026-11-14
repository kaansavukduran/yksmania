import { paragraphSentences } from "../data/reading";
export const visualCopy: Record<string, string> = {
  adenosine: "Adenozin",
  phosphateNote: "Şemada P, bağlı fosfat grubunu temsil eder.",
  explore: "Dokun, değiştir, keşfet",
  visualNote:
    "Bu şemayı kullanmak öğrenme puanı kazandırmaz. Bağımsız çözüm Sorular bölümünde kaydedilir.",
  cellTitle: "Hücreyi içeriden keşfet",
  cellHelp:
    "Şekilde bir yapıya dokun veya aşağıdaki adını seç. Görevini ve hangi hücrede bulunduğunu karşılaştır.",
  animal: "Hayvan hücresi",
  plant: "Yeşil bitki hücresi",
  cellDiagram: "Etkileşimli hücre şeması",
  cellScale:
    "Tipik hücre şemalarıdır; organel boyutları ve sayıları ölçekli değildir. Her bitki hücresinde kloroplast bulunmaz.",
  secretion: "Salgı proteininin yolunu izle",
  nextStep: "Sonraki adım",
  previousStep: "Önceki adım",
  reset: "Başa dön",
  route0: "Çekirdekte DNA bilgisi mRNA’ya aktarılır. DNA çekirdekte kalır.",
  route1: "Granüllü ER’ye bağlı ribozomlarda salgı proteini sentezlenir.",
  route2: "Protein ER’de işlenir; taşıma vezikülleriyle Golgi’ye gider.",
  route3: "Golgi proteini değiştirir, sınıflandırır ve veziküllere paketler.",
  route4:
    "Salgı vezikülü hücre zarıyla kaynaşır. İçerik ekzositozla dışarı verilir.",
  periodicTitle: "Periyodik tablo: yer değişir mi?",
  periodicHelp:
    "118 elementten birini seç. Proton sayısını, grubunu ve periyodunu incele. İlk 20 elementin katman modelini de görebilirsin.",
  element: "Element seç",
  first20: "İlk 20 element",
  all118: "118 element",
  group: "Grup",
  period: "Periyot",
  atomicNumber: "Atom numarası / proton",
  electrons: "Elektron",
  charge: "Tanecik yükü",
  neutral: "Nötr",
  cation: "Katyon",
  anion: "Anyon",
  ionNote:
    "Yük değişince elektron sayısı değişir; proton sayısı ve tablodaki yer sabit kalır. Sayaçtaki her yük değeri doğada kararlı bir iyon demek değildir.",
  shellNote:
    "İlk 20 nötr atom için basitleştirilmiş katman modeli. Noktalar tanecik sayısını gösterir; gerçek yörünge veya boyut değildir.",
  shellTitle: "Nötr atomun katmanları",
  shellMissing:
    "Bu element için katman animasyonu bu derste gösterilmiyor. Atom numarası ve tablo konumu incelenebilir.",
  tableScroll:
    "Tam tablo yatay kaydırılabilir. Element seçimi listesinden de her elemana ulaşabilirsin.",
  fblock: "f-blok",
  geometryTitle: "Kes, taşı, alanı koru",
  geometryHelp:
    "Tabanı ve dik yüksekliği değiştir. Parçaların alanını koruyarak yeni şekli oluştur.",
  parallelogram: "Paralelkenar",
  triangle: "Üçgen",
  base: "Taban b",
  height: "Dik yükseklik h",
  area: "Alan",
  squareUnits: "birim²",
  geometryDiagram: "Alan koruyan parçalama ve birleştirme şeması",
  geometryP0:
    "Paralelkenarı incele. h, tabana dik uzaklıktır; eğik kenar uzunluğu değildir.",
  geometryP1:
    "Soldaki üçgeni dik yükseklik boyunca kes. Parça hâlâ aynı alana sahip.",
  geometryP2:
    "Üçgeni sağa taşı. Ne döndürdük ne büyüttük: yalnızca yerini değiştirdik.",
  geometryP3:
    "Artık aynı taban ve yüksekliğe sahip bir dikdörtgen var. Alan b × h.",
  geometryT0: "İki eş üçgeni gör. Aynı taban ve dik yüksekliğe sahipler.",
  geometryT1: "Parçaları yaklaştır. Kenar uzunlukları ve alanları değişmiyor.",
  geometryT2: "İki üçgen birlikte bir dikdörtgen oluşturuyor.",
  geometryT3: "Dikdörtgenin alanı b × h. Her üçgen bunun yarısı: b × h / 2.",
  fractionsTitle: "Kesri gör",
  numerator: "Pay",
  denominator: "Payda",
  negative: "Negatif göster",
  fractionHelp:
    "Aynı büyüklükte bir bütünü eş parçalara ayır. Payda artınca her parça küçülür. İşareti değiştirince sayı doğrusunda yön değişir.",
  factorTitle: "Çarpanları alan olarak gör",
  factorHelp:
    "Pozitif uzunluklarla dört dikdörtgen oluştur. Renkli alanların toplamı, büyük dikdörtgenin alanına eşittir.",
  forceTitle: "Kuvvetleri dengede gör",
  leftForce: "Sola kuvvet",
  rightForce: "Sağa kuvvet",
  mass: "Kütle",
  netForce: "Net kuvvet",
  acceleration: "İvme",
  forceNote:
    "Oklar kuvveti gösterir; bu bir konum animasyonu değildir. Net kuvvet sıfırsa ivme sıfırdır; hızın da sıfır olması gerekmez.",
  moleTitle: "Kütleden tanecik sayısına",
  substance: "Madde",
  moleNote:
    "Şema tek bir molekülün yapısını gösterir. Molar kütleler H₂O için 18, CO₂ için 44 g/mol alınmıştır.",
  atpTitle: "Enerji aktarım döngüsü",
  phosphorylation: "ATP sentezini göster",
  hydrolysis: "ATP hidrolizini göster",
  atpSynthesis: "ADP + Pi + enerji → ATP + H₂O. Sentez için enerji gerekir.",
  atpHydrolysis:
    "ATP + H₂O → ADP + Pi. Açığa çıkan enerji hücresel işlere aktarılabilir.",
  atpNote:
    "Hücre enerjiyi yoktan üretmez; dönüştürür ve aktarır. ATP uzun süreli enerji deposu değildir.",
  paragraphTitle: "Düşüncenin izini sür",
  paragraphHelp:
    "Bir cümleye dokun. Karşıtlığı, açıklamayı ve ana düşünceyi ayır.",
  sentence0: paragraphSentences[0],
  sentence1: paragraphSentences[1],
  sentence2: paragraphSentences[2],
  sentenceRole0:
    "Karşıtlık: kitabı bitirmek ile anlamanın aynı şey olmadığını söylüyor.",
  sentenceRole1:
    "Açıklama: okurun kendi sorularını kurmasıyla metinle ilişkisinin güçlenebileceğini gösteriyor.",
  sentenceRole2: "Ana düşünce: önceki cümlelerden çıkan genel yargı.",
};
export function useVisualCopy() {
  return (key: string) => visualCopy[key] ?? key;
}
