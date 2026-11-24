import type { GuideSection, WorkedExample } from "./guides/types";

export const flowSurfaceTitle = "Çatı, kanat ve şemsiyede basınç farkını oku";
export const umbrellaPressureTitle = "Şemsiyede net kuvvetin yönü";
export const pressureSurfaces = [
  { label: "Çatı", lower: "İç", upper: "Dış" },
  { label: "Kanat", lower: "Alt", upper: "Üst" },
  { label: "Şemsiye", lower: "Alt", upper: "Üst" },
] as const;

export function flowSurfaceState(difference: number) {
  const lowerPressure = 100_000;
  const projectedArea = 0.5;
  return { lowerPressure, upperPressure: lowerPressure - difference, projectedArea, upwardForce: difference * projectedArea };
}

export const flowSurfaceSection: GuideSection = {
  title: flowSurfaceTitle,
  figureTitle: flowSurfaceTitle,
  paragraphs: [
    "Basınç kuvveti yüzeye diktir. Dıştaki basınç içtekinden düşükse çatı üzerinde yukarı yönlü bir basınç etkisi oluşabilir. Çatının hareket edip etmeyeceği, kendi ağırlığına ve bağlantılarına da bağlıdır.",
    "Şemsiye örneğinde alt basınç üstten büyükse yukarı yönlü etki baskındır. Şemsiyenin ters dönmesi, bu etkinin yanında kumaşın ve iskeletin nasıl tepki verdiğine bağlıdır.",
    "Uçak kanadında kanat biçimi, hücum açısı ve akış, yüzey boyunca bir basınç dağılımı oluşturur. Hücum açısı kanadın referans doğrultusu ile gelen havanın doğrultusu arasındaki açıdır. Üstteki basınç alttan küçük olduğunda basınç farkı yukarı yönlü kuvvete katkı sağlar. Akışın iki taraftan aynı sürede geçmesi gerekmez.",
    "Çizimde basınç farkı veriliyor. Yatay izdüşüm, yüzeye tam üstten bakıldığında kapladığı alandır. Bu alana düzgün etkiyen örnek basınçlar için net düşey kuvveti fark × alan ile bul. Gerçek yüzeyde basınç her noktada aynı olmayabilir.",
  ],
  table: {
    layout: "table",
    headers: ["Yüzey", "Kaynak örneğinde daha büyük basınç", "Basınç farkının etkisi"],
    rows: pressureSurfaces.map(({ label, lower }) => [label, lower, "Yukarı yönlü"]),
  },
};

export const umbrellaPressureExample: WorkedExample = {
  title: "Şemsiyeyi hangi yönde ne kadar kuvvet iter?",
  prompt: "Bir şemsiye modelinde alttaki basınç 100 kPa, üstteki 99,8 kPa. Basınçlar düzgün, düşey kuvvet için yatay izdüşüm alanı 0,5 m². Havanın net düşey kuvveti nedir?",
  strategy: "Alt ve üst basıncı çıkararak yönü belirle. Farkı paskala çevir ve alanla çarp.",
  steps: [
    { label: "Basınç farkı", expression: "100 − 99,8 = 0,2 kPa = 200 Pa", explanation: "Alttaki daha büyük basınç yukarı yönlü etkiyi baskın kılar." },
    { label: "Kuvvet", expression: "F = 200 × 0,5 = 100 N", explanation: "İki basınç aynı izdüşüm alanına etki ediyor. Net basınç kuvveti yukarı yönlü.", figureTitle: umbrellaPressureTitle },
  ],
  answer: "Yukarı yönlü 100 N.",
  check: "Fark sıfırlanırsa bu basınç kuvvetleri birbirini dengeler.",
  pitfall: "Tek başına üst veya alt basıncı alanla çarpıp net kuvvet diye yazma.",
};
