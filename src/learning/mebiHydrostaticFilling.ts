import type { GuideSection, WorkedExample } from "./guides/types";

export const equalDepthTitle = "Aynı derinlikte kapları karşılaştır";
export const fillingGraphTitle = "Kap dolarken taban basıncı nasıl artar?";

export const waterDensity = 1000;
export const modelGravity = 10;
export const fillingRate = 2;
export const fillingSeconds = 3;
export const fillingBaseArea = 4;
export const fillingShapes = [
  { label: "Dik kenarlı kap", change: 0, increase: "Sabit eğim" },
  { label: "Yukarı genişleyen kap", change: 1, increase: "Azalan eğim" },
  { label: "Yukarı daralan kap", change: -1, increase: "Artan eğim" },
] as const;

export function waterPressureKPa(depth: number) {
  return waterDensity * modelGravity * depth / 1000;
}

export function fillingState(time: number, shapeIndex: number) {
  const { change } = fillingShapes[shapeIndex];
  const volume = fillingRate * time;
  const depth = 2 * volume / (fillingBaseArea + Math.sqrt(fillingBaseArea ** 2 + 2 * change * volume));
  const area = fillingBaseArea + change * depth;
  const riseRate = fillingRate / area;
  return { volume, depth, area, riseRate, pressure: waterPressureKPa(depth), pressureRate: waterPressureKPa(riseRate) };
}

export const equalDepthSection: GuideSection = {
  title: equalDepthTitle,
  figureTitle: equalDepthTitle,
  paragraphs: [
    "Derinlik, serbest sıvı yüzeyinden ölçülen düşey uzaklıktır. Aynı özkütledeki durgun suya, aynı g altında, aynı derinlikte bak. Suyun katkısı ρgh kadardır. Kaplar aynı havaya açıksa toplam basınçları da eşit olur.",
    "Kapların şekli ve içerdikleri su miktarı farklı olabilir. Bu fark aynı derinlikteki nokta basıncını değiştirmez. Taban kuvveti sorulduğunda basıncı bulduktan sonra gerçek taban alanıyla çarp.",
  ],
};

export const fillingGraphSection: GuideSection = {
  title: fillingGraphTitle,
  figureTitle: fillingGraphTitle,
  paragraphs: [
    "Her kap saniyede aynı hacimde su alıyor. Eşit sürede eklenen hacimler eşit. Geniş kesitte aynı ek hacim daha az, dar kesitte daha çok yükselme gerektirir. Böylece yüzeyin bulunduğu yatay kesit, h'nin zamana göre artışını belirler.",
    "Dik duvarlı kapta kesit değişmez ve düzgün artış görülür. Yukarı genişleyen kapta artış yavaşlar, yukarı daralan kapta hızlanır. P = ρgh olduğundan taban gösterge basıncı grafiği de h grafiğiyle aynı biçimde ilerler. Atmosfer basıncı bu iki grafiğe eklenmedi.",
  ],
  table: {
    layout: "table",
    headers: ["Kap", "Yükselirken kesit", "h ve P grafiklerinin eğimi"],
    rows: fillingShapes.map(({ label, change, increase }) => [label, change === 0 ? "Sabit" : change > 0 ? "Büyür" : "Küçülür", increase]),
  },
};

const atThree = fillingState(3, 0);
export const fillingGraphExample: WorkedExample = {
  title: "Sabit kesitte basıncı zamandan bul",
  prompt: "Boş, tabanı 4 m² olan dik kenarlı kaba saniyede 2 m³ su giriyor. Üç saniye sonra h ve tabandaki su basıncı nedir? ρ = 1000 kg/m³ ve g = 10 m/s².",
  strategy: "Zamanı önce hacme çevir. Sonra hacimden yüksekliği, yükseklikten basıncı bul.",
  steps: [
    { label: "Dolum hacmi", expression: `V = 2 · 3 = ${atThree.volume} m³`, explanation: "Üç saniye boyunca debi değişmeden su girer." },
    { label: "Düşey yükseklik", expression: "h = 6 / 4 = 1,5 m", explanation: "Dik kenarlar nedeniyle hacim, sabit kesit alanı ile yüksekliğin çarpımıdır." },
    { label: "Tabandaki su basıncı", expression: `P = 1000 · 10 · 1,5 = ${atThree.pressure * 1000} Pa`, explanation: "Serbest yüzeyin basıncı dahil edilmedi. Aynı bağıntı bütün dolum zamanlarında geçerlidir.", figureTitle: fillingGraphTitle },
  ],
  answer: "Su 1,5 m yükselir ve tabanda 15 kPa gösterge basıncı oluşturur.",
  check: "Bu kapta h her saniye 0,5 m, basınç 5 kPa artar. Üç saniyede verilen sonuçlar çıkar.",
  pitfall: "Eşit zamanda eşit hacim akar. Kesitleri farklı kaplarda bu, eşit yükseklik artışı anlamına gelmez.",
};
