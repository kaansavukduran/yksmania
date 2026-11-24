import type { GuideSection, WorkedExample } from "./guides/types";

export const resonanceTitle = "İki diyapazonda rezonans";
export const resonanceTransferTitle = "Titreşim havadan ikinci diyapazona ulaşır";
export const resonanceResponseTitle = "Doğal frekansı kaynakla eşleştir";
export const forkDriveHz = 440;
export const forkDampingHz = 20;
export const forkRangeHz = { min: 360, max: 520, step: 10 } as const;

export function forkRelativeResponse(naturalHz: number) {
  const dampingTerm = 2 * forkDampingHz * forkDriveHz;
  const frequencyTerm = naturalHz ** 2 - forkDriveHz ** 2;
  return dampingTerm / Math.hypot(frequencyTerm, dampingTerm);
}

export const resonanceSection: GuideSection = {
  title: resonanceTitle,
  figureTitle: resonanceTitle,
  paragraphs: [
    "Yan yana duran iki özdeş diyapazondan birine plastik çekiçle hafifçe vur. Uçları ileri geri hareket eder ve havadaki basıncı değiştirir. Bu basınç değişimi ikinci diyapazona ulaşınca onun uçlarını da periyodik olarak iter.",
    "İkinci diyapazonun doğal frekansı gelen sesin frekansına yakınsa zorlanmaya daha güçlü tepki verir. İki özdeş diyapazon aynı doğal frekansa sahiptir. Birinciyi durdurup ikinciye dokunmadan dinlersen onun da titreştiğini fark edebilirsin.",
    "Grafik için ilk diyapazonun 440 Hz’de aynı genlikle titreştiğini varsay. İkinci diyapazonun doğal frekansını değiştirip göreli tepki genliğini karşılaştır. 1, eşleşmedeki model genliğidir. Gerçekte tek vuruştan sonra titreşim zamanla azalır.",
    "Çalgının gövdesi bazı titreşimlere daha güçlü tepki verir ve çıkan sesi etkiler. Radyo alıcısındaki ayarlı devre de seçilen frekans çevresindeki sinyali ayırmaya yardım eder.",
  ],
  table: {
    layout: "table",
    headers: ["Kaynak frekansı (Hz)", "İkinci diyapazonun doğal frekansı (Hz)", "Göreli tepki genliği"],
    rows: [400, 440, 480].map(naturalHz => [
      String(forkDriveHz),
      String(naturalHz),
      forkRelativeResponse(naturalHz).toFixed(2).replace(".", ","),
    ]),
  },
};

export const resonanceExample: WorkedExample = {
  title: "Hangi diyapazon daha güçlü titreşir?",
  prompt: "Bir diyapazon 440 Hz ses üretiyor. Yanına doğal frekansı 400 Hz ya da 440 Hz olan bir diyapazon koyabilirsin. Hangisinde daha büyük tepki beklersin?",
  strategy: "Önce sesin nasıl ulaştığını belirle, sonra gelen frekansı ikinci diyapazonun doğal frekansıyla karşılaştır.",
  steps: [
    { label: "Sesin yolunu izle", explanation: "Birinci diyapazona vurulunca hava üzerinden ikinciye periyodik basınç değişimleri ulaşır.", figureTitle: resonanceTransferTitle },
    { label: "Modelde iki noktayı karşılaştır", explanation: "440 Hz’deki diyapazon kaynağa en yakın doğal frekansa sahip. Sönüm, eşleşmedeki genliği sonlu tutar.", figureTitle: resonanceResponseTitle },
  ],
  answer: "Doğal frekansı 440 Hz olan diyapazonda daha büyük tepki beklenir.",
  check: "Grafikte 400 ve 440 Hz noktalarını bul. Dikey eksen, ikinci diyapazonun göreli genliğidir.",
  pitfall: "Frekanslar eşitken diyapazonun sonsuza kadar büyüyen genlikle titreşeceğini varsayma.",
};
