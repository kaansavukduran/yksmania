import type { GuideSection, WorkedExample } from "./guides/types";

export const stroboscopeTitle = "Stroboskop görüntüsü gerçek durma değildir";
export const strobeSchoolCases = [
  { slots: 8, label: "8 yarık", matchedRate: 2, solutionTitle: "Sekiz yarıkla eşleşen iki bakış" },
  { slots: 4, label: "4 yarık", matchedRate: 4, solutionTitle: "Dört yarıkla eşleşen iki bakış" },
] as const;
export const strobeDiskRate = { min: 1, max: 6, step: 1, initial: 2 };
export const strobeWaveFrequencyHz = 16;
export const strobeWavelengthCm = 3;
const tau = 2 * Math.PI;

export function strobeSnapshot(slots: number, revolutionsPerSecond: number) {
  const viewsPerSecond = slots * revolutionsPerSecond;
  const viewingIntervalS = 1 / viewsPerSecond;
  const rawAdvanceCycles = strobeWaveFrequencyHz * viewingIntervalS;
  const relativePhase = rawAdvanceCycles - Math.floor(rawAdvanceCycles);
  const shutters = Array.from({ length: slots }, (_, index) => {
    const angle = tau * index / slots;
    return [Math.cos(angle), Math.sin(angle)] as const;
  });
  return { viewsPerSecond, viewingIntervalS, rawAdvanceCycles, relativePhase, shutters };
}

export const stroboscopeSection: GuideSection = {
  title: stroboscopeTitle,
  figureTitle: stroboscopeTitle,
  paragraphs: [
    "Diskteki her yarık bir kısa bakış verir. Diski bir saniyede fₛ kez döndürürsen, n yarık her saniye n·fₛ bakış verir. İki bakış arasındaki süre 1/(n·fₛ).",
    "Her bakışta bir sonraki tepe tam önceki tepenin yerindeyse görüntü aynı kalır. Dalga o sırada bir dalga boyu ilerlemiştir. Bu eşleşmede dalga frekansı f = n·fₛ. Bir bakışta komşu tepeler arasını ölç. Bu düzeneğin dalga boyu 3 cm. Tepe çizgileri gözünde dursa da dalga enerji taşımaya devam eder.",
    "16 Hz’lik dalgaya önce 8 yarıkla saniyede 2 tur, sonra 4 yarıkla saniyede 4 turda bak. İki bakış arası aynı. Bakış aralığında iki veya daha çok periyot geçerse görüntü de aynı kalabilir. Bu nedenle en küçük uygun dalga frekansı ya da ardışık tepe koşulu önemlidir. Aynı kaynağa bakarken yarıkları değiştirmek dalga boyunu veya frekansını değiştirmez.",
  ],
  table: {
    layout: "table",
    headers: ["Yarık sayısı", "Disk sürati", "Bir saniyedeki bakış"],
    rows: [["8", "2 tur/s", "16"], ["4", "4 tur/s", "16"]],
  },
};

export const stroboscopeExample: WorkedExample = {
  title: "Yarık sayısından dalga frekansına",
  prompt: "Sekiz yarıklı disk saniyede iki tur atıyor. Her bakışta bir sonraki tepe öncekinin yerinde. Dalga frekansı nedir? Dört yarıkla aynı bakış aralığı için disk saniyede kaç tur atmalı?",
  strategy: "Diskin bir turda kaç bakış verdiğini yaz. İkinci durumda bir saniyedeki bakış sayısını aynı tut.",
  steps: [
    { label: "Sekiz yarıklı diski say", explanation: "Bir tur 8 bakış verir. İki turda 16 bakış olur. Verilen eşleşmede her bakışta bir periyot ilerler.", expression: "f = 8 × 2 = 16 Hz", figureTitle: strobeSchoolCases[0].solutionTitle },
    { label: "Dört yarığa geç", explanation: "Her tur yarısı kadar bakış verdiği için tur sayısını iki katına çıkar.", expression: "fₛ = 16 ÷ 4 = 4 tur/s", figureTitle: strobeSchoolCases[1].solutionTitle },
  ],
  answer: "Dalga frekansı 16 Hz. Dört yarıklı disk saniyede 4 tur atar.",
  check: "8 × 2 ve 4 × 4 aynı. Her iki disk için bakışlar arası 1/16 s.",
  pitfall: "Diski hızlandırmanın dalga kaynağını hızlandırdığını düşünme.",
};
