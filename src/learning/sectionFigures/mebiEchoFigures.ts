import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame } from "./figureKit";
import { echoDistanceM, echoOutwardTitle, echoReturnTitle, echoSpeedMS, echoTimeMs, echoTitle } from "../mebiEcho";

type EchoStage = "gidiş" | "toplam" | "uzaklık";

function echoFrame(ms: number, stage: EchoStage): FigureFrame {
  const source = 1.08;
  const distance = echoDistanceM(ms);
  const wall = source + distance * 0.135;
  const center = (source + wall) / 2;
  const returning = stage !== "gidiş";
  const els: El[] = [
    poly([v(wall, 0.55), v(wall + 0.4, 0.55), v(wall + 0.4, 3.48), v(wall, 3.48)], { tone: "ink", fill: "muted" }),
    seg(v(source, 0.65), v(10.9, 0.65), { tone: "muted", thin: true }),
    circle(v(source, 1.88), 0.27, { tone: "a", fill: "a" }),
    vec(v(source + 0.3, 2.51), v(wall - 0.1, 2.51), { tone: "a" }),
    txt(v(center, 3.27), "Gidiş", "c", { tone: "a", small: true }),
    txt(v(wall + 0.18, 4.0), "Duvar", "c", { tone: "ink", small: true }),
    txt(v(source, 0.05), "Kaynak", "s", { tone: "a", small: true }),
    txt(v(11.15, 2.5), " ", "c"),
  ];
  if (returning) {
    els.push(
      vec(v(wall - 0.1, 1.28), v(source + 0.3, 1.28), { tone: "b" }),
      txt(v(center, 0.85), "Dönüş", "s", { tone: "b", small: true }),
      seg(v(wall - 0.14, 1.34), v(wall - 0.14, 2.45), { tone: "b", dash: true, thin: true }),
    );
  }
  if (stage === "uzaklık") {
    els.push(
      seg(v(source, -0.84), v(wall, -0.84), { tone: "c", dash: true }),
      seg(v(source, -1.0), v(source, -0.67), { tone: "c" }),
      seg(v(wall, -1.0), v(wall, -0.67), { tone: "c" }),
      txt(v(center, -1.45), `${fmt(distance)} m`, "s", { tone: "c", small: true }),
    );
  }
  const total = `${ms} ms gidiş-dönüş. Toplam ses yolu ${fmt(2 * distance)} m.`;
  return {
    els,
    readout: stage === "gidiş" ? [
      "Ses kaynaktan duvara gidiyor. Sayaç, ses geri gelince durur.",
    ] : stage === "toplam" ? [
      total, "Sayaç iki yön için aynı ölçümü tutuyor.",
    ] : [
      total, `Havadaki model sürati ${echoSpeedMS} m/s. Duvara uzaklık ${fmt(distance)} m.`,
    ],
  };
}

export const echoFigures: Record<string, FigureDef> = {
  [echoTitle]: {
    caption: "Sesin önce duvara, sonra kaynağa doğru gittiğini izle. Gidiş-dönüş süresini değiştir ve tek yön mesafesini karşılaştır.",
    alt: "Solda ses kaynağı, sağda duvar. Sesin gidiş ve dönüş okları, duvarın uzaklığı ile aynı doğrultudadır.",
    param: { label: "Gidiş-dönüş süresi", ...echoTimeMs, unit: " ms" },
    steps: ["Duvara gidiş", "Yankının dönüşü"],
    draw: (ms, step) => echoFrame(ms, step === 1 ? "uzaklık" : "gidiş"),
  },
  [echoOutwardTitle]: {
    caption: "0,20 saniyelik ölçüm bitene kadar sesin geçtiği iki yolu birleştir.",
    alt: "Kaynak ve duvar arasında gidiş oku ile ters yöndeki dönüş oku. İki yön birlikte 68 metre.",
    draw: () => echoFrame(echoTimeMs.init, "toplam"),
  },
  [echoReturnTitle]: {
    caption: "Toplam yolun yarısı kaynaktan duvara olan uzaklıktır.",
    alt: "Kaynak ile duvar arasındaki tek yönlü uzaklık 34 metre olarak işaretlenmiş.",
    draw: () => echoFrame(echoTimeMs.init, "uzaklık"),
  },
};
