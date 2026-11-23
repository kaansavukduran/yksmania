import { bicycleEnergyPoints, kineticUnits } from "../bicycleEnergy058";
import { poly, pt, seg, txt, v, type El, type FigureDef } from "./figureKit";

const teachingNotes = [
  "A ve E eş yükseklikte. İlk kinetik enerjiyi son konumdakiyle karşılaştır.",
  "B ve E aynı hız büyüklüğünde. B daha yüksekte olduğu için yerçekimi potansiyel enerjisi daha büyük.",
  "C tepede. Yerçekimi potansiyel enerjisi burada en büyük. Tam değer için sayısal yükseklik gerekir.",
  "D inişte ve yer düzeyinin üstünde. Hızın büyüklüğü K’yı belirler, tam potansiyel enerji için yükseklik gerekir.",
  "A ve E eş yükseklikte. Kinetik enerji 16 E₀’dan 9 E₀’a düştü. Mekanik enerji 7 E₀ azaldı.",
];
const points = bicycleEnergyPoints.map(({ x, displayHeight }) => v(x, displayHeight));
const track = points.slice(0, -1).flatMap((point, index) => {
  const following = points[index + 1];
  return Array.from({ length: 15 }, (_, i) => {
    const t = i / 15;
    const bend = (1 - Math.cos(Math.PI * t)) / 2;
    return v(point[0] + t * (following[0] - point[0]), point[1] + bend * (following[1] - point[1]));
  });
});

export const bicycleEnergyFigure: FigureDef = {
  caption: "A ve E aynı seviyede. Beş noktayı sırayla aç ve işaretli hızlardan kinetik enerjiyi oku. Çizimdeki ara yükseklikler ölçekli verilmedi.",
  alt: "A’dan E’ye çıkan ve inen tepe kesiti. A ve E aynı yer çizgisinde, C tepe. B ve D ara noktalardır. Her noktada hızın v cinsinden katsayısı yazılı.",
  steps: ["A · Başlangıç", "B · Tırmanış", "C · Tepe", "D · İniş", "E · Aynı yükseklik"],
  draw: (_, step) => {
    const selected = bicycleEnergyPoints[step];
    const els: El[] = [
      seg(v(-0.45, 0), v(8.5, 0), { tone: "muted", dash: true, thin: true }),
      txt(v(4, 0), "A ve E aynı düzey", "s", { small: true }),
      poly([...track, points[points.length - 1]], { tone: "b", open: true, bold: true }),
      ...bicycleEnergyPoints.flatMap((point, index) => [
        pt(points[index], undefined, "e", index === step ? "a" : "muted"),
        txt(points[index], `${point.name} · ${point.speed === 1 ? "" : point.speed}v`, "n", {
          tone: index === step ? "a" : "muted", bold: index === step,
        }),
      ]),
    ];
    return {
      els,
      readout: [
        `${selected.name} noktasında K = ${kineticUnits(selected.speed)} E₀. E₀ = mv²/2.`,
        teachingNotes[step],
      ],
    };
  },
};
