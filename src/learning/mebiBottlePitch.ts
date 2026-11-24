import type { GuideSection, WorkedExample } from "./guides/types";

export const bottlePitchTitle = "Aynı şişeye vurunca ve üfleyince";
export const bottlePitchModes = ["Şişeye vur", "Şişeye üfle"] as const;
export const bottleFill = { min: 0, max: 70, step: 5, initial: 50 };
export const bottleStrikeTitle = "Şişe ve su birlikte titreşir";
export const bottleBlowTitle = "Su üstündeki hava titreşir";

export function bottlePitchAt(percent: number, mode: (typeof bottlePitchModes)[number]) {
  const fill = percent / 100;
  const frequencyRatio = mode === "Şişeye vur"
    ? 1 / Math.sqrt(1 + fill)
    : 1 / Math.sqrt(1 - fill);
  return { fill, airVolumeRatio: 1 - fill, frequencyRatio };
}

export const bottlePitchSection: GuideSection = {
  title: bottlePitchTitle,
  figureTitle: bottlePitchTitle,
  paragraphs: [
    "İki özdeş şişeden birini boş bırak, diğerindeki suyu artır. Metal çubukla vurduğunda camla birlikte su da titreşir. Su miktarı artınca bu düzende frekans düşer ve ses pesleşir.",
    "Şişe ağzının üzerinden üflediğinde su üstündeki hava titreşir. Su arttığında hava hacmi küçülür. Bu düzende frekans yükselir ve ses tizleşir.",
    "Gösterge, boş şişenin frekansını bir birim kabul eden yaklaşık bir modeldir. Şişenin şekli, dokunulan yer ve üfleme biçimi gerçek sesleri etkiler.",
  ],
};

export const bottlePitchExample: WorkedExample = {
  title: "Yarı dolu şişede vurma ve üfleme",
  prompt: "İki özdeş şişeden biri boş, diğeri yarı dolu. Önce ikisine de vuruyorsun. Sonra aynı hızla ağızlarına üflüyorsun. Yarı dolu şişe hangi durumda daha tiz ses verir?",
  strategy: "Sesi üreten bölgeyi iki durumda ayrı bul.",
  steps: [
    { label: "Vurunca titreşeni göster", explanation: "Yarı dolu şişede camla su birlikte titreşir. Bu karşılaştırmada dolu olanın frekansı daha düşüktür.", figureTitle: bottleStrikeTitle },
    { label: "Üfleyince titreşeni göster", explanation: "Yarı dolu şişede su üstündeki hava hacmi daha küçüktür. Hava titreşiminin frekansı daha yüksektir.", figureTitle: bottleBlowTitle },
  ],
  answer: "Yarı dolu şişe üflenince, boş şişeye göre daha tiz ses verir.",
  check: "Cam ve su birlikte hareket ettiğinde sonuç pes. Küçülen hava hacmi titreştiğinde sonuç tiz.",
  pitfall: "Aynı şişeye yapılan iki eylemde aynı bölgenin titreştiğini varsayma.",
};
