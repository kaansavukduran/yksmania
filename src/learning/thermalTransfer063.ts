import type { GuideSection, WorkedExample } from "./guides/types";

export const thermalTransferTitle = "Isı akarken sıcaklıklar yaklaşır";
export const coldStart = 20;
export const capacity = 400;

export function thermalPairAt(hotStart: number, fraction: number) {
  const equilibrium = (hotStart + coldStart) / 2;
  const increase = (equilibrium - coldStart) * fraction;
  return {
    cold: coldStart + increase,
    hot: hotStart - increase,
    transferred: capacity * increase,
    equilibrium,
  };
}

export const thermalTransferSection: GuideSection = {
  title: thermalTransferTitle,
  figureTitle: thermalTransferTitle,
  paragraphs: [
    "İki cisim arasında sıcaklık farkı varsa enerji kendiliğinden daha sıcak olandan daha soğuk olana aktarılır. Bu aktarımın miktarını Q ile gösteririz ve joule ile ölçeriz. Sıcaklığı termometreyle ölçeriz. Madde içindeki enerjinin adı iç enerjidir.",
    "Bu örnekte iki cismin ısı sığası eşit, her biri 400 J/K. Cisimler hâl değiştirmiyor ve dışarıya enerji vermiyor. Soğuk cisim 20 °C, sıcak cisim 60 °C. Sıcak cismin kaybettiği enerji, öbürünün kazandığına eşit. Bu yüzden aynı miktarda sıcaklık değiştirip 40 °C’de buluşurlar.",
    "Ok eşit sıcaklıklara ulaşana kadar sıcak taraftan soğuk tarafa bakar. Eş sıcaklıkta net ısı aktarımı durur. Ara adımlar, aktarımın hangi payının gerçekleştiğini gösterir. Gerçek süreyi hesaplamak için cisimlerin teması ve ısı iletim özellikleri de gerekir.",
  ],
  table: {
    headers: ["Durum", "Sıcak başlayan", "Soğuk başlayan", "Aktarılan enerji"],
    rows: [["Başlangıç", "60 °C", "20 °C", "0 J"], ["Aktarımın yarısı", "50 °C", "30 °C", "4.000 J"], ["Denge", "40 °C", "40 °C", "8.000 J"]],
  },
};

export const thermalTransferExample: WorkedExample = {
  title: "Sıcaklık ve aktarılan enerji",
  prompt: "Isı sığaları eşit ve 400 J/K olan iki cisim, yalıtılmış ortamda 60 °C ve 20 °C ile başlıyor. Denge sıcaklığı ve soğuk cismin kazandığı enerji nedir?",
  strategy: "Enerji kaybıyla kazancı eşitle. İki cisim eşit ısı sığalı olduğu için sıcaklık değişimlerinin büyüklüğü aynı.",
  steps: [
    { label: "Denge sıcaklığı", expression: "(60 + 20) / 2 = 40 °C", explanation: "Her cisim 20 derecelik değişimle aynı sıcaklığa gelir.", figureTitle: thermalTransferTitle },
    { label: "Aktarılan enerji", expression: "Q = C × ΔT = 400 × 20 = 8.000 J", explanation: "Soğuk cisim 8.000 J kazanır. Sıcak cisim aynı miktarda enerji kaybeder." },
  ],
  answer: "40 °C ve soğuk cismin kazancı 8.000 J.",
  check: "Sıcak cisimde Q = −8.000 J, soğukta Q = +8.000 J. Çevreyle aktarım yoksa iç enerji değişimleri toplamı sıfır.",
  pitfall: "Ortak sıcaklığı bulurken sıcaklıkları toplayıp bırakma. Aktarılan 8.000 J bir cisim için artı, diğeri için eksi.",
};
