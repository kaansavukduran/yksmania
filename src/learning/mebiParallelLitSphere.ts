import type { GuideSection, WorkedExample } from "./guides/types";

export const parallelLitSphereTitle = "Yandan bakınca aydınlık yarım daire";
export const sideLitSphereTitle = "Soldaki gözlemcinin gördüğü yarım disk";
export const raisedLitSphereTitle = "Yukarıdan daha çok aydınlık yüz";

export function parallelLitSphereAt(elevationDeg: number) {
  const elev = elevationDeg * Math.PI / 180;
  const facingLight = Math.sin(elev);
  const illuminatedFraction = (1 + facingLight) / 2;
  return { elevationDeg, facingLight, illuminatedFraction, observerX: -5.4 * Math.cos(elev), observerY: 5.4 * facingLight };
}

export const parallelLitSphereSection: GuideSection = {
  title: parallelLitSphereTitle,
  figureTitle: parallelLitSphereTitle,
  paragraphs: [
    "Üstten birbirine paralel ışınlar gönderildiğinde opak kürenin üst yarısı doğrudan ışık alır. Alt yarı, kürenin kendi arkasında kaldığı için doğrudan ışık almaz.",
    "Soldaki göz tam yandan bakıyor. Aydınlık ve karanlık yüzün sınırı, gözün gördüğü dairenin çapından geçiyor. Dairenin üst yarısı aydınlık görünür.",
    "Gözlemci yukarı çıkarsa aydınlık yüzün daha büyük kısmını görür. Küreye ulaşan ışınlar ve doğrudan ışık alan yarımküre aynı kalır. Çizim başka yüzeylerden dönen ışığı hesaba katmıyor.",
  ],
};

export const parallelLitSphereExample: WorkedExample = {
  title: "Küreye bakan gözün gördüğü biçim",
  prompt: "Küreye ışınlar üstten paralel geliyor. Küreye yandan bakan gözlemci, sonra yukarı doğru çıkarsa gördüğü aydınlık alan nasıl değişir?",
  strategy: "Aydınlanan üst yarımküreyi belirle. Her konumda bu yarımküreden görünen kısmı ayrı düşün.",
  steps: [
    { label: "Yandan bak", explanation: "Sınır dairenin ortasından geçer. Görünen diskin üst yarısı aydınlık, alt yarısı karanlıktır.", figureTitle: sideLitSphereTitle },
    { label: "30° yukarı çık", explanation: "Işık alan yüzün daha çoğu göze döner. Görünen dairenin alanının dörtte üçü aydınlık görünür.", figureTitle: raisedLitSphereTitle },
  ],
  answer: "Yandan görünen aydınlık alan diskin yarısı. Örnekte gözlemci 30° yukarı çıktığında oran dörtte üçe çıkar.",
  check: "Kürenin ışık gören yüzü iki durumda da bir yarımküre. Gözlemcinin diskte gördüğü yüz oranı değişir.",
  pitfall: "Gözlemci yer değiştirdi diye ışınların yönünü değiştirme.",
};
