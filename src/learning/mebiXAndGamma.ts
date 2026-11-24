import type { GuideSection, WorkedExample } from "./guides/types";

export const xRayDetectorTitle = "X ışını kaynaktan algılayıcıya nasıl ulaşır?";
export const handRadiographTitle = "El röntgeninde açık ve koyu bölgeler";
export const handRadiographPhotoTitle = "Gerçek el röntgeni";
export const gammaPhotonTitle = "Çekirdek enerji kaybedince gama ışını";

export const xRayLayers = { min: 1, max: 3, initial: 1 };
const attenuation = { soft: 0.35, bone: 0.85 };

export function xRaySignal(layers: number) {
  return {
    soft: Math.exp(-attenuation.soft * layers) * 100,
    bone: Math.exp(-attenuation.bone * layers) * 100,
  };
}

export const xRayDetectorSection: GuideSection = {
  title: xRayDetectorTitle,
  figureTitle: xRayDetectorTitle,
  paragraphs: [
    "X ışını görünmeyen bir elektromanyetik dalgadır. Röntgen ve bilgisayarlı tomografi, X ışınlarının vücuttan geçerken farklı miktarlarda azalmasından yararlanır. Bazı güvenlik tarayıcıları da kapalı bir nesnenin içinden geçen X ışınlarını ölçer.",
    "Şemada kaynaktan aynı miktarda ışın iki yola çıkar. Yolların biri yumuşak dokuyu, öteki kemik içeren yolu temsil eder. Algılayıcıya gelen ışın miktarı iki yolda farklıdır. Böylece görüntüde farklı bölgeler ayırt edilebilir.",
    "Kalınlığı artırıp iki algılayıcıdaki sinyali karşılaştır. Yüzdeler, iki yol arasındaki farkı anlatan bir öğretim modelinden hesaplanır.",
  ],
  table: {
    layout: "table",
    headers: ["Model kalınlığı", "Yumuşak doku yolu", "Kemikli yol"],
    rows: [1, 2, 3].map((layers) => {
      const { soft, bone } = xRaySignal(layers);
      return [`${layers} birim`, `%${Math.round(soft)}`, `%${Math.round(bone)}`];
    }),
  },
};

export const xRayDetectorExample: WorkedExample = {
  title: "İki yoldan hangisi daha az ışın geçirir?",
  prompt: "Şemada iki yola da aynı ışın demeti giriyor. Kalınlık 1 birimken yumuşak doku yolunda yaklaşık %70, kemikli yolda yaklaşık %43 algılanıyor. Hangi yol ışını daha çok azaltmıştır?",
  strategy: "Girişler eşit olduğundan algılayıcıya ulaşan yüzdeleri karşılaştır.",
  steps: [
    { label: "Verilen algılayıcı değerlerini bul", expression: "%70 ve %43", explanation: "İki değer algılayıcıya ulaşan kısım. Kaynaktan çıkan başlangıç sinyali iki yolu da aynı şekilde besliyor.", figureTitle: xRayDetectorTitle },
    { label: "Sinyalleri karşılaştır", expression: "43 < 70", explanation: "Daha küçük sinyal, yolda daha büyük azalma olduğunu gösterir." },
  ],
  answer: "Bu modelde kemikli yol ışını daha çok azaltır.",
  check: "Kalınlık 1 birimdeyken kemikli yolu gösteren algılayıcı çubuğu daha kısadır.",
  pitfall: "Yüzdeler algılanan kısmı gösterir. Kaybolan payı istersen yüzde 100’den bu değeri çıkar.",
};

export const handRadiographSection: GuideSection = {
  title: handRadiographTitle,
  figureTitle: handRadiographPhotoTitle,
  paragraphs: [
    "Gerçek el röntgeninde parmak ve bilek kemikleri daha açık, etraflarındaki yumuşak doku çizgileri daha koyu görünür. Görüntüde R sağ eli işaretler. A–H harfleri görüntüyü yayımlayan kişinin eklediği bilek kemiği etiketleridir.",
    "Algılayıcıya ulaşan X ışını miktarı kemiğin olduğu yollarda daha az olabilir. Bu röntgende ışının yol boyunca daha çok zayıfladığı bölgeler açık tonda. Röntgeni tonlarına bakarak, önceki şemayı yüzdelerine bakarak karşılaştır.",
  ],
};

export const handRadiographExample: WorkedExample = {
  title: "El röntgeninde parmak kemiğinin tonunu oku",
  prompt: "Görüntüde parmağın açık renkli iç parçasıyla çevresindeki daha koyu doku çizgisini karşılaştır. Bu gösterimde daha az X ışını hangi yoldan algılayıcıya ulaşmıştır?",
  strategy: "Önce iki bölgeyi görüntüde bul. Sonra röntgendeki açık tonun bu gösterimde neyi anlattığını hatırla.",
  steps: [
    { label: "Açık ve koyu iki bölge seç", expression: "Parmak kemiği · çevre doku", explanation: "Ortadaki parmakta peş peşe açık renkli kemikler var. Parmağın dış çizgisinin içinde daha koyu yumuşak doku görünüyor.", figureTitle: handRadiographPhotoTitle },
    { label: "Tonu algılayıcıyla ilişkilendir", expression: "Daha açık → daha az ulaşan ışın", explanation: "Bu görüntünün ton eşlemesinde kemiğin daha açık görünmesi, o yoldaki X ışınlarının daha çok azaldığıyla uyumlu." },
  ],
  answer: "Daha açık görünen kemiğin bulunduğu yoldan algılayıcıya daha az ışın ulaşmıştır.",
  check: "Doku şemasında da aynı kalınlıkta kemikli yolun algılayıcı çubuğu daha kısadır.",
  pitfall: "Görüntüdeki tonlardan yalnızca bu iki bölgenin karşılaştırmasını yap. Sayısal sinyal için ölçüm verisi gerekir.",
};

export const gammaPhotonStages = ["Yüksek enerjili çekirdek", "Gama ışını yayılması"];

export const gammaPhotonSection: GuideSection = {
  title: gammaPhotonTitle,
  figureTitle: gammaPhotonTitle,
  paragraphs: [
    "Gama ışını yüksek enerjili elektromanyetik ışınımdır. Radyoaktif bozunmadan sonra bazı çekirdekler yüksek enerjili durumda kalabilir. Çekirdek daha düşük enerjiye geçerken aradaki enerjiyi bir gama fotonuyla taşıyabilir.",
    "Şemanın düşey yönü enerjiyi gösterir. Aşağı ok çekirdeğin daha düşük enerji düzeyine geçtiğini anlatır. Sağdaki dalgalı çizgi, çıkan fotonu simgeler.",
    "X ışını ve gama ışını boşlukta yayılabilir. Bir X ışını tüpünde ışın, elektronların hedefle etkileşiminden oluşabilir. Buradaki gama örneğinde kaynak çekirdeğin enerji değişimidir. Bazı tedavilerde gama ışınından yararlanılır.",
  ],
};

export const gammaPhotonExample: WorkedExample = {
  title: "Gama fotonu çıkınca çekirdeğin enerjisi",
  prompt: "Bir çekirdeğin enerji düzeyi aşağı geçerken gama fotonu yayılıyor. Çekirdeğin enerjisi artar mı, azalır mı?",
  strategy: "Şemadaki iki düzeyi ve fotonun taşıdığı enerjiyi birlikte oku.",
  steps: [
    { label: "Düzeyleri karşılaştır", expression: "Eᵢ > Eₛ", explanation: "Başlangıç düzeyi yukarıda. Son düzey daha düşük enerjiyi temsil ediyor.", figureTitle: gammaPhotonTitle },
    { label: "Enerji farkını yaz", expression: "ΔE = Eᵢ − Eₛ > 0", explanation: "Bu basit şemada aradaki fark, dışarı giden fotonun enerjisidir." },
  ],
  answer: "Gama fotonu yayıldığında çekirdeğin enerjisi azalır.",
  check: "Aşağı ok çekirdeğin enerji kaybını, sağa giden dalgalı ok taşınan enerjiyi gösterir.",
  pitfall: "Düşey ekseni enerji olarak oku. Aşağı yön, daha düşük enerji düzeyine geçişi gösterir.",
};
