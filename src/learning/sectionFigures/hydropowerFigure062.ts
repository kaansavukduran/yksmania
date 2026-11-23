import { hydropowerAt } from "../hydropower062";
import { fmt, poly, pt, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

export const hydropowerFigure: FigureDef = {
  caption: "Yükseklik farkını değiştir. Su akışını, türbinin dönmesini ve elektrik çıkışını sırayla izle.",
  alt: "Solda yüksek su yüzeyi, aşağı inen boru ve sağda türbin ile jeneratör. Yükseklik farkı su yüzeyiyle çıkış arasında işaretlenmiş.",
  steps: ["Suyun yükseklik farkı", "Akış ve türbin", "Jeneratör ve elektrik"],
  param: { label: "Yükseklik farkı (m)", min: 5, max: 20, init: 10, step: 5 },
  draw: (head, step) => {
    const result = hydropowerAt(head);
    const surface = 0.15 + 0.24 * head;
    const [inlet, outlet, turbine, generator] = [v(-2.55, surface), v(0.5, 0.15), v(1.85, 0.15), v(3.65, 0.15)];
    const blades: El[] = Array.from({ length: 5 }, (_, index) => {
      const theta = index * 2 * Math.PI / 5;
      return seg(turbine, v(turbine[0] + 0.43 * Math.cos(theta), turbine[1] + 0.43 * Math.sin(theta)), { tone: step === 1 ? "a" : "muted", bold: true });
    });
    const els: El[] = [
      poly([v(-5, surface), inlet, v(-2.55, surface - 0.7), v(-5, surface - 0.7)], { tone: "b", fill: "b" }),
      txt(v(-3.8, surface), "Su yüzeyi", "n", { tone: "b" }),
      vec(v(-4.7, 0.15), v(-4.7, surface), { tone: step === 0 ? "a" : "muted" }),
      txt(v(-4.7, (surface + 0.15) / 2), `${fmt(head)} m`, "w", { tone: "a" }),
      poly([inlet, v(-1.75, surface), outlet, turbine], { open: true, tone: step === 1 ? "a" : "b", bold: true }),
      ...blades,
      pt(turbine, "Türbin", "s", "muted"),
      seg(turbine, generator, { tone: "muted", dash: true }),
      pt(generator, "Jeneratör", "n", "muted"),
      vec(generator, v(5.45, 0.15), { tone: step === 2 ? "a" : "muted", bold: true }),
      txt(v(5.45, 0.15), "Elektrik", "s", { tone: step === 2 ? "a" : "muted", bold: true }),
    ];
    return {
      els,
      readout: [
        step === 0
          ? `Saniyede ${result.massPerSecond} kg su, ${head} m alçalıyor. Su gücü ${fmt(result.inputWatts / 1000)} kW.`
          : step === 1
            ? "Aşağı inen su türbini döndürür. Bu adımın kaybı tek başına verilmedi."
            : `Elektrik çıkışı ${fmt(result.electricalWatts / 1000)} kW. Diğer enerji biçimlerine ${fmt(result.otherWatts / 1000)} kW aktarılıyor.`,
        `Giriş ${fmt(result.inputWatts / 1000)} kW, elektrik ve diğer aktarımın toplamı.`,
      ],
    };
  },
};
