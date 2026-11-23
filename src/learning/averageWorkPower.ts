import type { GuideSection, WorkedExample } from "./guides/types";

export const averageWorkPowerTitle = "Aynı iş, farklı ortalama güç";
export const averageWorkPowerComparisonTitle = "Aynı 72 J işin ortalama gücü";
export const pathDistance = 6;
export const boxMass = 4;
export const pullingForce = 12;
export const kineticFriction = 4;

export function workPowerOver(seconds: number) {
  const pullWork = pullingForce * pathDistance;
  const frictionWork = -kineticFriction * pathDistance;
  const netWork = pullWork + frictionWork;
  const acceleration = (pullingForce - kineticFriction) / boxMass;
  const averageVelocity = pathDistance / seconds;
  const initialSpeed = averageVelocity - acceleration * seconds / 2;
  return {
    pullWork, frictionWork, netWork,
    pullPower: pullWork / seconds,
    netPower: netWork / seconds,
    initialSpeed,
    finalSpeed: initialSpeed + acceleration * seconds,
    averageVelocity,
  };
}

export const averageWorkPowerSection: GuideSection = {
  title: averageWorkPowerTitle,
  figureTitle: averageWorkPowerTitle,
  paragraphs: [
    "4 kg’lık kutu yatay yüzeyde sağa doğru 6 m kayıyor. 12 N’luk çekme sağa, 4 N’luk kinetik sürtünme sola. Çekme 72 J, sürtünme −24 J iş yapar. Normal ve ağırlık düşey olduğundan bu yer değiştirmede ikisinin işi sıfır. Net iş +48 J, kutunun kinetik enerjisindeki artıştır.",
    "Ortalama güç, seçilen kuvvetin yaptığı işi geçen süreye böler. Bu örnekte çekme 6 m boyunca hep aynı yönde ve büyüklükte olduğundan ortalama gücü 12 × ortalama hız olarak da bulabilirsin. 1 watt, saniyede 1 joule aktarım demektir. Süre ayarını değiştirince başlangıç hızı da değişir. İki denemede kutu aynı yolu alır ve aynı miktarda iş yapılır.",
    "Kutu ve yüzeyi birlikte sistem olarak seç. Başka aktarım yoksa çekmenin verdiği 72 J’un 24 J’u sürtünmeyle ısıl enerjiye dönüşür. Sürtünmenin kutu üzerinde yaptığı −24 J iş, ısıl enerjinin +24 J artışıyla farklı işaret taşır.",
  ],
  table: {
    headers: ["Süre", "Çekme işi", "Sürtünme işi", "Kinetik enerji artışı", "Çekmenin ortalama gücü"],
    rows: [["1 s", "72 J", "−24 J", "48 J", "72 W"], ["2 s", "72 J", "−24 J", "48 J", "36 W"]],
  },
};

export const averageWorkPowerExample: WorkedExample = {
  title: "Bir ve iki saniyede aynı yolu al",
  prompt: "Yatayda 6 m kayan 4 kg kutuya sağa 12 N çekme ve sola 4 N kinetik sürtünme etki ediyor. İki denemede süreler 1 s ve 2 s. Çekmenin işleri ve ortalama güçleri nasıl değişir?",
  strategy: "Önce her kuvvet için işareti kontrol et. Çekmenin gücü için yalnız çekmenin yaptığı işi kullan.",
  steps: [
    { label: "İşaretli işler", expression: "Wçekme = 12 × 6 = 72 J · Wsürtünme = −4 × 6 = −24 J", explanation: "Çekme yer değiştirmeyle aynı yönde. Sürtünme ters yönde.", figureTitle: averageWorkPowerTitle },
    { label: "Kinetik enerji", expression: "ΔK = 72 − 24 = 48 J", explanation: "Düşey kuvvetlerin işi sıfır. Net işi hesaplarken sürtünmenin negatif işareti korunur." },
    { label: "Ortalama güç", expression: "P₁ = 72 / 1 = 72 W · P₂ = 72 / 2 = 36 W", explanation: "İlk deneme aynı işi yarı sürede yapar. Gücü bu yüzden iki kattır.", figureTitle: averageWorkPowerComparisonTitle },
  ],
  answer: "Çekmenin yaptığı iş iki denemede de 72 J. Ortalama güçler 72 W ve 36 W.",
  check: "İkinci denemede ortalama hız 6 / 2 = 3 m/s. Çekme gücü 12 N × 3 m/s = 36 W.",
  pitfall: "Çekmenin ortalama gücünü hesaplarken net işi veya kinetik enerji artışını çekme işi yerine koyma.",
};
