import type { GuideSection, WorkedExample } from "./guides/types";

export const stackedShadowTitle = "Alt alta iki noktasal kaynak";
export const overlappingShadowTitle = "İki kesit aralığının ortak kısmı";
export const separatedShadowTitle = "Ortak bölgenin kalmadığı perde";

const objectCm = 4;
const radiusCm = 0.75;
const screenCm = 10;

export function stackedPointShadowsAt(halfSpacingCm: number) {
  const fromSource = (sourceY: number) => {
    const distance = Math.hypot(objectCm, sourceY);
    const centreDirectionX = objectCm / distance;
    const centreDirectionY = -sourceY / distance;
    const tangentLength = Math.sqrt(distance ** 2 - radiusCm ** 2);
    const along = tangentLength ** 2 / distance;
    const across = radiusCm * tangentLength / distance;
    const rays = [-1, 1].map(side => {
      const touchX = along * centreDirectionX - side * across * centreDirectionY;
      const touchY = sourceY + along * centreDirectionY + side * across * centreDirectionX;
      return { touchX, touchY, screenY: sourceY + screenCm * (touchY - sourceY) / touchX };
    });
    const low = Math.min(...rays.map(ray => ray.screenY));
    const high = Math.max(...rays.map(ray => ray.screenY));
    const verticalRadius = (high - low) / 2;
    const horizontalRadius = verticalRadius * Math.sqrt((objectCm ** 2 - radiusCm ** 2) / tangentLength ** 2);
    return { sourceY, rays, low, high, centreY: (low + high) / 2, verticalRadius, horizontalRadius };
  };
  const k = fromSource(halfSpacingCm);
  const l = fromSource(-halfSpacingCm);
  const sharedLow = Math.max(k.low, l.low);
  const sharedHigh = Math.min(k.high, l.high);
  const fullLength = Math.max(0, sharedHigh - sharedLow);
  const partialLength = k.high - k.low + l.high - l.low - 2 * fullLength;
  return { objectCm, radiusCm, screenCm, sources: [k, l], sharedLow, sharedHigh, fullLength, partialLength };
}

export const stackedShadowSection: GuideSection = {
  title: stackedShadowTitle,
  figureTitle: stackedShadowTitle,
  paragraphs: [
    "K ve L aynı düşey doğrultuda üst üste. Her birinden opak küreye iki teğet çiz. Perdede üstteki kaynağın gölge aralığı aşağıya, alttaki kaynağın gölge aralığı yukarıya kayar.",
    "İki gölge aralığı kesişiyorsa ortak kısımda hiçbir kaynaktan ışık gelmez. Kesişim kaybolursa perdede iki ayrı yarı gölge aralığı kalır. Aradaki noktalar iki kaynaktan da ışık alır.",
    "Yandaki çizim kürenin merkezinden geçen düşey kesit. Perdede verilen uzunluklar bu kesitten ölçülüyor. Önden görünümde iki elipsin üst üste binen koyu kısmı tam gölge.",
  ],
};

export const stackedShadowExample: WorkedExample = {
  title: "Kaynaklar ayrılınca ortadaki karanlık",
  prompt: "İki noktasal kaynak başlangıçta eksenin 0,5 cm üstünde ve altında. İkisi de eksenden 1,5 cm uzaklaştığında perdedeki ortak gölge ne olur?",
  strategy: "İki kaynaktan gelen sınır ışınlarını ayrı izle ve perde aralıklarının kesişimine bak.",
  steps: [
    { label: "Kesişim varken", explanation: "İki aralığın ortak orta bölümüne K ve L ışık veremez. Bu bölümde yaklaşık 2,26 cm tam gölge var.", figureTitle: overlappingShadowTitle },
    { label: "Aralıklar ayrılır", explanation: "Kaynakların ayrılması her gölge aralığını öteki tarafa kaydırır. İki yarı gölgenin arasında iki kaynağı da gören açık bir bölüm vardır.", figureTitle: separatedShadowTitle },
  ],
  answer: "1,5 cm konumunda ortak tam gölge kalmaz. İki yarı gölge aralığı ayrılır.",
  check: "Ortak aralık sıfırlanırken her kaynak tek başına kendi gölge aralığını oluşturmaya devam eder.",
  pitfall: "Tam gölge kayboldu diye tek kaynağın örttüğü aralıkları da silme.",
};
