import { dim, poly, txt, v, type FigureDef } from "./figureKit";

const areas = [252, 432, 720];

export function squareDivisorRepresentations(area: number) {
  const pairs: { outside: number; inside: number }[] = [];
  for (let outside = 1; outside * outside <= area; outside++) {
    const divisor = outside * outside;
    if (area % divisor === 0) pairs.push({ outside, inside: area / divisor });
  }
  return pairs;
}

export const radicalsSource015SquareFigure: FigureDef = {
  caption: "Alanı seç ve aynı kenarın yazımlarını karşılaştır. Her A için A² alanı kalansız böler. Karenin çizimi ölçekli değildir.",
  alt: "Bir kare, alanı ve kenar uzunluğu gösteriliyor. Altındaki hesaplar alanı veren bütün doğal sayı ikililerini listeliyor.",
  steps: areas.map((area) => `Alan ${area}`),
  draw: (_value, step) => {
    const area = areas[step] ?? areas[0];
    const pairs = squareDivisorRepresentations(area);
    const origin = v(0, 0);
    const corner = v(4, 4);
    return {
      els: [
        poly([origin, v(4, 0), corner, v(0, 4)], { fill: "b", tone: "b" }),
        txt(v(2, 2), `${area} birim²`, "c", { bold: true }),
        dim(origin, v(4, 0), `√${area} birim`, corner, "a"),
      ],
      readout: [
        `(A√B)² = A²B = ${area}. Her satırda aynı alan geri gelir.`,
        ...pairs.map(({ outside, inside }) => (
          `A = ${outside}, B = ${inside} → ${outside}² × ${inside} = ${area}`
        )),
      ],
    };
  },
};
