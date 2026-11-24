import type { GuideSection } from "./guides/types";
import { focusDepthKm, pSpeedKmPerS } from "./mebiSeismicFocus";

export const seismicWavefrontTitle = "Odaktan dışarı yayılan dalga cephesi";
export const seismicWavefrontTimes = { min: 0, max: 1.5, step: 0.25, init: 1 } as const;

export const seismicFrontRadiusKm = (seconds: number) => pSpeedKmPerS * seconds;

export const seismicWavefrontSection: GuideSection = {
  title: seismicWavefrontTitle,
  figureTitle: seismicWavefrontTitle,
  paragraphs: [
    "Fay boyunca başlayan kayma, çevredeki kayacı yerinden oynatır. Titreşim madde içinde odaktan dışarı doğru ilerler. Çizimdeki her halka, belirli anda dalganın ulaştığı eş uzaklıktaki noktaları gösterir.",
    `Örnekte kaya düzgün ve P dalgasının sürati ${pSpeedKmPerS} km/s. Bir saniye sonra odaktan ${seismicFrontRadiusKm(1)} km uzaktaki noktalar ilk sinyali alır. Odak ${focusDepthKm} km derinde olduğu için bu modelde cephe ${focusDepthKm / pSpeedKmPerS} saniyede yüzeyde dış merkeze erişir.`,
    "Zamanı ilerletip son dalga cephesini önceki konumuyla karşılaştır. Dış merkez yüzeyde aynı noktada kalır. Eş merkezli halkalar bu düzgün kaya modeline aittir. Gerçek dalga cephesi yer katmanlarıyla biçim değiştirebilir.",
  ],
};
