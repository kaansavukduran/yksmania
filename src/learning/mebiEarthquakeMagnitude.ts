import type { GuideSection, WorkedExample } from "./guides/types";

export const magnitudeTitle = "Büyüklük ile şiddet arasındaki fark";
export const magnitudeRatioTitle = "Büyüklük farkından genlik ve enerji";
export const magnitudeDifferenceTitle = "Önce iki büyüklüğü karşılaştır";
export const magnitudeScaleTitle = "Bir büyüklük birimi kaç kat eder?";
export const localIntensityTitle = "Aynı deprem iki yerde nasıl hissedilir?";
export const magnitudeDifferences = { min: 0, max: 2, step: 0.5, init: 1 } as const;

export function magnitudeRatios(difference: number) {
  return { amplitude: 10 ** difference, energy: 10 ** (1.5 * difference) };
}

export const magnitudeSection: GuideSection = {
  title: magnitudeTitle,
  figureTitle: magnitudeTitle,
  paragraphs: [
    "Büyüklük, depremin kaynağındaki olayın boyutunu tek bir değerle ifade eder. Sismograf yer hareketini kaydeder. Bu kaydın incelenmesiyle bir büyüklük hesaplanabilir. Richter’in yerel büyüklüğü tarihsel bir ölçektir. Büyük depremlerde günümüzde genellikle moment büyüklüğü (Mw) kullanılır.",
    "Şiddet, bir konumda hissedilen sarsıntı ve gözlenen etkilerle ilgilidir. Aynı depremde gözlemler uzaklığa, odak derinliğine, yerel zemine ve yapılara göre değişebilir. Şemadaki iki gözlem örneği de aynı depreme ait. Bir yerdeki gözlemden tek başına büyüklük hesaplanamaz.",
  ],
  table: {
    layout: "table",
    headers: ["Karşılaştırılan", "Nerede geçerli?", "Hangi bilgiyle belirlenir?"],
    rows: [
      ["Büyüklük", "Depremin kaynağı için", "Sismik kayıttan büyüklük hesabı"],
      ["Şiddet", "Her gözlem yapılan yer için", "Sarsıntının insanlar, çevre ve yapılar üzerindeki etkisi"],
    ],
  },
};

export const magnitudeRatioSection: GuideSection = {
  title: magnitudeRatioTitle,
  figureTitle: magnitudeRatioTitle,
  paragraphs: [
    "Karşılaştırılabilir genlik ölçümüne dayanan ölçekte bir büyüklük birimi 10 kat genlik farkı demektir. Yaklaşık enerji oranı 10 üzeri (1,5 × büyüklük farkı) ile bulunur. Aynı birim artış için sonuç yaklaşık 32 kattır. Büyüklük ölçeklerinde 9 genel bir üst sınır oluşturmaz.",
    "Büyüklük farkını değiştir. Göstergeler farklı hızlarda ilerler. Eksende bir aralık, on katı gösterir. Aynı büyüklükte iki olay için her iki oran da 1 olur.",
  ],
};

export const magnitudeExample: WorkedExample = {
  title: "6 ve 5 büyüklüğü arasında ne kadar fark var?",
  prompt: "A ve B depremlerinin büyüklüğü sırasıyla 6 ve 5. Ölçekler karşılaştırılabilir. A'nın genlik ve yaklaşık enerji oranı kaçtır? B depreminden uzaktaki bir noktada hissedilen şiddeti bu oranlardan bulabilir miyiz?",
  strategy: "Büyüklük farkını önce genlik ve enerji hesabına ayrı ayrı uygula. Sonra bir yerdeki gözlemin hangi bilgilere dayandığını belirle.",
  steps: [
    { label: "Büyüklük farkını yaz", expression: "6 − 5 = 1", explanation: "Büyüklük logaritmik. İki işaret arasındaki aralığı say.", figureTitle: magnitudeDifferenceTitle },
    { label: "İki çarpanı ayrı hesapla", expression: "Genlik 10¹ = 10 | Enerji 10^(1,5) ≈ 31,6", explanation: "İlk sonuç karşılaştırılabilir genlik için, ikinci sonuç yaklaşık enerji için.", figureTitle: magnitudeScaleTitle },
    { label: "Yerel etkiyi gözlemden değerlendir", explanation: "Yerin koşulları ve sarsıntıya ilişkin gözlem gerekir. Aynı depremin iki farklı yerdeki etkisi farklı olabilir.", figureTitle: localIntensityTitle },
  ],
  answer: "Genlik oranı 10, yaklaşık enerji oranı 31,6. Bu iki oran tek bir yerde hissedilen şiddeti belirlemez.",
  check: "Büyüklük farkı sıfır olsaydı iki oran da 1 çıkardı.",
  pitfall: "10 kat genliği, 10 kat enerji veya her yerde 10 kat sarsıntı olarak okuma.",
};
