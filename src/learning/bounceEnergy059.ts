import type { GuideSection, WorkedExample } from "./guides/types";

export const bounceEnergyTitle = "Sıçrama yüksekliği neden azalır?";
export const bounceMass = 1;
export const releaseHeight = 4;
export const gravity = 10;
const firstImpactSeconds = Math.sqrt(2 * releaseHeight / gravity);

export function bouncePeaks(speedRatio: number) {
  let startsAt = firstImpactSeconds;
  return Array.from({ length: 3 }, (_, index) => {
    const rebound = index + 1;
    const halfTime = firstImpactSeconds * speedRatio ** rebound;
    const height = gravity * halfTime ** 2 / 2;
    const maximum = {
      rebound, height, startsAt, halfTime,
      peakAt: startsAt + halfTime,
      mechanical: bounceMass * gravity * height,
      otherEnergy: bounceMass * gravity * (releaseHeight - height),
    };
    startsAt += 2 * halfTime;
    return maximum;
  });
}

export const bounceEnergySection: GuideSection = {
  title: bounceEnergyTitle,
  figureTitle: bounceEnergyTitle,
  paragraphs: [
    "Top serbest düşerken yerçekimi potansiyel enerjisi kinetik enerjiye dönüşür. Hava direnci bu örnekte ihmal ediliyor. Zemine çarptığında topun ve zeminin şekil değiştirmesi, ısınma ve ses, makroskopik mekanik enerjinin bir kısmını başka biçimlere aktarır. Top yeniden yükselse de önceki yüksekliğe ulaşamaz.",
    "İdeal örnekte 1 kg top 4 m’den bırakılıyor. g = 10 m/s². Çarpışma sonrası yukarı doğru sürat, çarpmadan önceki süratin e katı olsun. Her serbest uçuşta tepe yüksekliği fırlatma süratinin karesiyle orantılı olduğundan yükseklik her çarpışmada e² ile çarpılır. Gerçek toplarda bu oran koşullara göre değişebilir.",
    "Bir sıçramanın tepesinde anlık hız sıfırdır. Yeri sıfır seçtiğinde o anda mekanik enerji mgh’dir. Top, zemin, hava ve çevreyi kapsayan kapalı toplam enerji hesabında azalan mekanik enerji kaybolmaz. Diğer biçimlere aktarılan birikimli miktar grafiğin altında görünür. Tabloda çarpışma hız oranı e = 0,5.",
  ],
  table: {
    headers: ["Tepe", "Yükseklik", "Mekanik enerji", "Diğer biçimlere aktarılan"],
    rows: [["Başlangıç", "4 m", "40 J", "0 J"], ["1. sıçrama", "1 m", "10 J", "30 J"], ["2. sıçrama", "0,25 m", "2,5 J", "37,5 J"]],
  },
};

export const bounceEnergyExample: WorkedExample = {
  title: "Yarı sürat, çeyrek yükseklik",
  prompt: "1 kg top 4 m’den bırakılıyor. Hava direnci ihmal ediliyor. Çarpışma sonrası sürat çarpmadan önceki süratin yarısı. g = 10 m/s². İkinci sıçramanın tepesine kadar mekanik enerji ne kadar azaldı?",
  strategy: "Her çarpışmada sürat oranının karesi kadar yükseklik kalır. Tepelerde hız sıfır olduğu için potansiyel enerjileri karşılaştır.",
  steps: [
    { label: "Yükseklikler", expression: "h₁ = 4 × ¼ = 1 m · h₂ = 1 × ¼ = 0,25 m", explanation: "Yarı sürat, bir sonraki sıçramanın tepe yüksekliğini dörtte bire indirir.", figureTitle: bounceEnergyTitle },
    { label: "Enerji farkı", expression: "40 − 2,5 = 37,5 J", explanation: "İkinci tepedeki mekanik enerji 1 × 10 × 0,25 = 2,5 J. Farkın bir kısmı ısınma ve ses gibi başka biçimlere gider." },
  ],
  answer: "Mekanik enerji 37,5 J azaldı.",
  check: "İlk çarpışmadan sonra 10 J kaldı; ikinci çarpışma bunu 2,5 J’a düşürdü. Birikimli aktarım (40 − 10) + (10 − 2,5) = 37,5 J.",
  pitfall: "Sürat yarıya indiği için yüksekliği de yarıya indirme.",
};
