import type { GuideSection, WorkedExample } from "./guides/types";

type V = readonly [number, number];
export const concaveWaterTitle = "Çukur engelde odak ve merkez";
export const concaveRadius = 12;
export const concaveCenterX = 0;
export const concaveFocusX = concaveRadius / 2;
export const concaveModes = ["Düz cephe", "F odağındaki kaynak", "M merkezindeki kaynak"] as const;
export const concaveStepFigureTitles = ["Düz cephenin odakta yansıması", "Odaktaki kaynaktan yansıma", "Merkezdeki kaynaktan yansıma"] as const;
const apertureFraction = 0.24;

function unit(x: number, y: number): V {
  const magnitude = Math.hypot(x, y);
  return [x / magnitude, y / magnitude];
}

export function concaveWaterAt(mode: 0 | 1 | 2) {
  const sourceX = mode === 1 ? concaveFocusX : concaveCenterX;
  const rays = Array.from({ length: 11 }, (_, index) => {
    const y = (index - 5) * apertureFraction * concaveRadius / 5;
    const x = Math.sqrt(concaveRadius ** 2 - y ** 2);
    const normal = unit(x, y);
    const toward = mode === 0 ? [1, 0] as V : unit(x - sourceX, y);
    const normalComponent = toward[0] * normal[0] + toward[1] * normal[1];
    const reflected: V = [
      toward[0] - 2 * normalComponent * normal[0],
      toward[1] - 2 * normalComponent * normal[1],
    ];
    const hit: V = [x, y];
    const distance = mode === 0 ? x : Math.hypot(x - sourceX, y);
    const reflectedXAtAxis = Math.abs(reflected[1]) < 1e-10 ? undefined : x - y * reflected[0] / reflected[1];
    return { hit, toward, reflected, distance, reflectedXAtAxis };
  });
  const crestAfterDistance = (travel: number) => rays.map(({ hit, distance, reflected }) => {
    const sinceContact = travel - distance;
    return [hit[0] + reflected[0] * sinceContact, hit[1] + reflected[1] * sinceContact] as V;
  });
  const maxContactDistance = Math.max(...rays.map(({ distance }) => distance));
  const fronts = [0.9, 2.1, 3.3].map((delta) => crestAfterDistance(maxContactDistance + delta));
  return { rays, fronts, sourceX, mode };
}

export const concaveSection: GuideSection = {
  title: concaveWaterTitle,
  figureTitle: concaveWaterTitle,
  paragraphs: [
    "Çukur engelin iç yüzeyi dalgaya dönük. M dairesel engelin merkezi, F ise dar bölgede yaklaşık odak noktası. Engelin bir noktasındaki normal, o nokta ile M arasındaki doğrudur.",
    "Düz cephe engelden yansıdığında üç hız okunun F’ye yakın bir yerden geçtiğini gör. Kaynağı F’ye getirince yansıyan oklar yaklaşık paralel gider. Kaynak M’deyse hız okları engele dik gelir ve döndüklerinde M’ye yönelir.",
    "Aynı leğende su derinliği ve kaynak frekansı sabitken dalga sürati, periyot ve dalga boyu korunur. Ekranda dairesel engelin orta kısmı kullanılır. Kenardaki ışınlar F’nin çok az yanında kesişebilir.",
  ],
  table: {
    layout: "table",
    headers: ["Engelden önce", "Engelden sonra"],
    rows: [
      ["Düz cephe", "F çevresine yönelen eğri cephe"],
      ["F’de noktasal kaynak", "Yaklaşık düz cephe"],
      ["M’de noktasal kaynak", "M’ye dönen dairesel cephe"],
    ],
  },
};

export const concaveExample: WorkedExample = {
  title: "Çukur engelde F ve M’yi ayır",
  prompt: "Dairesel engelin eğrilik yarıçapı 12 cm. Düz cephe, F’deki kaynak ve M’deki kaynak engelden sonra nasıl ilerler?",
  strategy: "Kaynağın M’de mi F’de mi olduğunu belirle. Her hız okunu engelin o noktadaki normaline göre izle.",
  steps: [
    { label: "Düz cephe", explanation: "Yansıyan okların uzantısı F’ye yakın yerlerde kesişir.", expression: "Yarıçap 12 cm → yaklaşık odak uzaklığı 6 cm", figureTitle: concaveStepFigureTitles[0] },
    { label: "Kaynak F’de", explanation: "Bu kez gelen hız okları kaynaktan dışarı yayılır. Açıklık küçük olduğu için dönerken yaklaşık paralel olurlar.", figureTitle: concaveStepFigureTitles[1] },
    { label: "Kaynak M’de", explanation: "M’den engelin temas noktasına çekilen doğru normaldir. Her ok kendi doğrultusu üzerinden M’ye döner.", expression: "i = r = 0°", figureTitle: concaveStepFigureTitles[2] },
  ],
  answer: "Düz cephe F yakınında toplanır. F’deki kaynak yaklaşık düz cephe üretir. M’deki kaynağın cepheleri M’ye döner.",
  check: "M’den gelen üç ok, yansımadan sonra aynı doğrular üzerinde ters yöne gider.",
  pitfall: "Şekilde M’yi engelin tepesinden 6 cm uzağa yerleştirme. 6 cm yaklaşık F uzaklığıdır, M 12 cm uzaktadır.",
};
