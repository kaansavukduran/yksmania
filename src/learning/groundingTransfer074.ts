import type { GuideSection, WorkedExample } from "./guides/types";

export const groundingTransferTitle = "Toprak hattında elektronun yönünü bul";

export function groundingTransfer(initial: -3 | 3, connected: boolean) {
  return {
    conductor: connected ? 0 : initial,
    earthChange: connected ? initial : 0,
    direction: connected ? initial < 0 ? "to-earth" : "to-conductor" : null,
  } as const;
}

const signs = [-3, 3] as const;
export const groundingChargeText = (charge: number) => charge < 0 ? `−${-charge}` : charge > 0 ? `+${charge}` : "0";
const flow = (sign: -3 | 3) => sign < 0 ? "Küreden Dünya’ya" : "Dünya’dan küreye";

export const groundingTransferSection: GuideSection = {
  title: groundingTransferTitle,
  figureTitle: groundingTransferTitle,
  paragraphs: [
    "Dışarıdan etkileyen başka bir yük olmadığını düşün. İletken kürenin anahtarı açıkken küre ile Dünya arasında elektron geçişi yok. Anahtarı kapattığında elektronlar bağlantıdan geçebilir.",
    "Negatif kürede elektron fazlası var. Fazlalığın bir bölümü Dünya’ya gider ve ideal modelde küre nötrleşir. Pozitif kürede elektron eksikliği var. Bu kez elektronlar Dünya’dan küreye gelir. Her iki yönde de hareket eden taşıyıcı elektrondur.",
    "Çizimdeki ok dengeye ulaşırken gerçekleşen aktarımı gösterir. Küre nötr olduktan sonra akış sürmez. Dünya’nın yük değişimini küreninkiyle birlikte sayarsan toplam korunur. Yakında başka bir yüklü cisim olduğunda topraklanmış iletkenin net yükü sıfır olmak zorunda değildir.",
  ],
  table: {
    layout: "table",
    headers: ["İlk küre yükü", "Elektron yönü", "Son küre yükü", "Dünya’nın yük değişimi"],
    rows: signs.map((charge) => {
      const end = groundingTransfer(charge, true);
      return [groundingChargeText(charge), flow(charge), groundingChargeText(end.conductor), groundingChargeText(end.earthChange)];
    }),
  },
};

export const groundingTransferExample: WorkedExample = {
  title: "İki küreyi ayrı ayrı toprakla",
  prompt: "Yalıtılmış iki metal kürenin yükleri −3 ve +3 model birimi. Yakında etkileyen başka bir yük yok. Küreler sırayla ve birbirini etkilemeden toprağa bağlanıyor. Her biri için elektron yönünü ve Dünya’nın yük değişimini bul.",
  strategy: "Önce kürede elektron fazlası mı, eksiği mi var, onu belirle. Sonra küre ve Dünya’nın yük değişimlerini ayrı yaz.",
  steps: [
    { label: "Negatif küre", expression: "−3 + 3 = 0", explanation: "Küreden Dünya’ya elektron gider. Kürenin yükü 3 artar, Dünya’nınki 3 azalır.", figureTitle: groundingTransferTitle },
    { label: "Pozitif küre", expression: "+3 − 3 = 0", explanation: "Dünya’dan küreye elektron gelir. Kürenin yükü 3 azalır, Dünya’nınki 3 artar." },
  ],
  answer: "Negatif kürede Dünya’ya, pozitif kürede Dünya’dan küreye elektron aktarılır. Dünya’nın yük değişimleri sırasıyla −3 ve +3 model birimi.",
  check: "Kürenin son yüküyle Dünya’nın değişimini topla. Her durumda kürenin ilk yükü geri gelir.",
  pitfall: "Pozitif yükü, pozitif parçacığın metal tel boyunca taşınması diye yorumlama.",
};
