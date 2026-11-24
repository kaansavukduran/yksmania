import type { GuideSection, WorkedExample } from "./guides/types";
import { echoSpeedMS } from "./mebiEcho";

export const roomAcousticsTitle = "Bir mekânda doğrudan ve yansıyan ses";
export const roomPathsTitle = "Dinleyene iki farklı yoldan ses ulaşır";
export const roomEnergyTitle = "Soğurma artınca yansıyan enerji azalır";
export const roomDirectM = 8;
export const roomHeightAboveSourceM = 3;
export const roomReflectedM = 2 * Math.hypot(roomDirectM / 2, roomHeightAboveSourceM);
export const roomDelayMs = 1000 * (roomReflectedM - roomDirectM) / echoSpeedMS;
export const roomAbsorption = { min: 0, max: 90, step: 10, init: 20 } as const;

export function roomReflectedEnergy(absorptionPercent: number) {
  return 100 - absorptionPercent;
}

export const roomAcousticsSection: GuideSection = {
  title: roomAcousticsTitle,
  figureTitle: roomAcousticsTitle,
  paragraphs: [
    "Edirne’deki Selimiye Camii, Mimar Sinan’ın yapısıdır. İç fotoğrafta yüksek kubbeleri, kemerleri ve zemin yüzeyini incele. Farklı biçim ve malzemelerdeki yüzeyler bir mekândaki sesin yayılmasını etkiler.",
    "Temsilî salon çiziminde ses bir yoldan doğrudan dinleyiciye ulaşır. Bir bölümü tavana çıkar, yansır ve daha uzun bir yol alır. Beklediğimiz gecikme iki yolun farkına ve ses süratine bağlıdır. Çizimdeki düz tavan ve ölçüler örnek salona aittir.",
    "Tiyatro gibi kapalı mekânlarda yansımaların nereden geldiği, ne kadar sürdüğü ve ne kadar güçlü olduğu önemlidir. Tavanın soğurduğu payı değiştir. Modelde tavanın konumu sabit. Bu yüzden yansıyan enerji değişir ve yol uzunluğu aynı kalır.",
  ],
  table: {
    layout: "table",
    headers: ["Tavanın soğurduğu pay", "Yansıyan pay", "Yansıyan yol"],
    rows: [20, 60, 90].map(absorption => [`%${absorption}`, `%${roomReflectedEnergy(absorption)}`, `${roomReflectedM} m`]),
  },
};

export const roomAcousticsExample: WorkedExample = {
  title: "Daha çok soğuran tavan sesi ne yönde değiştirir?",
  prompt: "Örnek salonda doğrudan yol 8 m, tavandan yansıyan yol 10 m. Tavan önce gelen enerjinin %20’sini soğuruyor. Aynı tavanda soğurma %60 olursa yansıyan yol ve enerji nasıl değişir?",
  strategy: "Tavana ulaşan enerjiden soğurulan payı çıkar. Yol uzunluğu için çizimdeki tavan konumuna bak.",
  steps: [
    { label: "Ses yollarını karşılaştır", explanation: "Tavan aynı konumda kalır. Doğrudan yol 8 m, tavandan yansıyan yol 10 m olarak kalır.", figureTitle: roomPathsTitle },
    { label: "Yansıyan payı hesapla", explanation: "Basit modelde tavana gelen enerjinin soğurulmayan payı yansır.", expression: "%100 − %60 = %40", figureTitle: roomEnergyTitle },
  ],
  answer: "Tavandan yansıyan yol 10 m kalır. Yansıyan enerji payı %80’den %40’a düşer.",
  check: "Yeni yansıyan ve soğurulan payları topla. %40 + %60 = %100.",
  pitfall: "Yansıyan ses zayıflayınca yolunun da kısaldığını varsayma.",
};
