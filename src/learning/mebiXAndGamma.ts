import type { GuideSection, WorkedExample } from "./guides/types";

export const xRayDetectorTitle = "X ışını kaynaktan algılayıcıya nasıl ulaşır?";
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
    "Kalınlığı artırıp iki algılayıcıdaki sinyali karşılaştır. Yüzdeler farkı anlatan bir modelden hesaplanır. Gerçek bir röntgen görüntüsünün ya da bir güvenlik taramasının değerleri değildir.",
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

export const gammaPhotonStages = ["Yüksek enerjili çekirdek", "Gama ışını yayılması"];

export const gammaPhotonSection: GuideSection = {
  title: gammaPhotonTitle,
  figureTitle: gammaPhotonTitle,
  paragraphs: [
    "Gama ışını yüksek enerjili elektromanyetik ışınımdır. Radyoaktif bozunmadan sonra bazı çekirdekler yüksek enerjili durumda kalabilir. Çekirdek daha düşük enerjiye geçerken aradaki enerjiyi bir gama fotonuyla taşıyabilir.",
    "Şemanın düşey yönü enerjiyi gösterir. Aşağı ok çekirdeğin daha düşük enerji düzeyine geçtiğini anlatır. Sağdaki dalgalı çizgi çıkan fotonun simgesidir. Çizginin rengi ve boyu bir ölçüm değildir.",
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
  pitfall: "Düşey ok, çekirdeğin uzayda aşağı taşındığını göstermez. Bu çizimin düşey ekseni enerjidir.",
};
