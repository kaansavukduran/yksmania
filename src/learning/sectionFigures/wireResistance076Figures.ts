import { resistanceText, wireComparison, wireComparisons, wireDiameterSolutionTitle, wireMaterialsAt20, wireResistanceTitle } from "../wireResistance076";
import { circle, poly, span, txt, v, type El, type FigureDef } from "./figureKit";

type Wire = ReturnType<typeof wireComparison>;

function wireDrawing(wire: Wire, y: number, label: string): El[] {
  const start = 1;
  const end = start + 3.2 * wire.length;
  const radius = 0.48 * wire.diameterInMillimeters;
  const tone = label === "Başlangıç" ? "b" : "a";
  const elements: El[] = [
    poly([v(start, y - radius), v(end, y - radius), v(end, y + radius), v(start, y + radius)], { tone, fill: tone }),
    circle(v(start, y), radius, { tone, fill: "muted" }),
    txt(v(start, y), "A", "c", { small: true, bold: true }),
    txt(v(start - radius, y + radius + 0.42), label, "e", { bold: true }),
    ...span(v(start, y - radius - 0.25), v(end, y - radius - 0.25), `L = ${wire.length} m`, v(start, y), "ink"),
  ];
  for (let x = start + 0.85; x < end - 0.24; x += 0.62) {
    elements.push(circle(v(x, y), 0.10, { tone: "warn", fill: "warn" }));
    elements.push(circle(v(x + 0.25, y - radius * 0.62), 0.05, { tone: "ink", fill: "muted" }));
    if (wire.area > 1) elements.push(circle(v(x, y + radius * 0.55), 0.08, { tone: "warn", fill: "warn" }));
  }
  return elements;
}

function compareWires(materialIndex: number, step: number) {
  const base = wireComparison(materialIndex, 0);
  const wire = wireComparison(materialIndex, step);
  const y = 2.5;
  return {
    els: [
      ...wireDrawing(base, y + 3.6, "Başlangıç"),
      ...wireDrawing(wire, y, "Deneme teli"),
    ],
    legend: [
      { code: "●", label: "Büyük noktalar metal atomlarını gösterir", tone: "warn" as const },
      { code: "·", label: "Küçük noktalar serbest elektronları gösterir", tone: "ink" as const },
    ],
    readout: [
      `${wire.material.name}, 20 °C. Başlangıç ${resistanceText(base.resistance)} Ω.`,
      `Yeni tel ${wire.length} m, ${wire.area} mm². Direnç ${resistanceText(wire.resistance)} Ω.`,
      `Yeni direnç / başlangıç direnci = ${resistanceText(wire.ratioToStart)}.`,
    ],
  };
}

export const wireResistanceFigures: Record<string, FigureDef> = {
  [wireResistanceTitle]: {
    caption: "A dairesel kesiti, L telin uzunluğunu gösterir. MEBİ çizimindeki atom ve elektronlar temsili noktalardır.",
    alt: "Başlangıç teli ve karşılaştırılan tel. Ön yüzde A, uzunluk boyunca L işaretli. Sıcaklık 20 °C. Güncel uzunluk, kesit ve direnç çizimin altında yazıyor.",
    steps: wireComparisons.map(({ label }) => label),
    picks: wireMaterialsAt20.map(({ name, coefficient }) => ({
      label: name, title: name, detail: [`20 °C’de öz direnç ${resistanceText(coefficient)} × 10⁻⁸ Ω·m.`],
    })),
    draw: (_value, step, pick) => compareWires(pick == null || pick === -1 ? 1 : pick, step),
  },
  [wireDiameterSolutionTitle]: {
    caption: "Çap iki katına çıktığında dairesel kesit dört katına çıkar. İki bakır tel aynı boyda.",
    alt: "Aynı uzunluktaki iki bakır tel. İlk telin alanı 1 mm², ikinci telin alanı 4 mm². İkinci telin dairesel yüzünün çapı iki kat.",
    draw: () => compareWires(1, 3),
  },
};
