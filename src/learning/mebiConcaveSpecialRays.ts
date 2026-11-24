import type { GuideSection, WorkedExample } from "./guides/types";
import { sphericalMirrorAt, sphericalMirrorRadius, type Point } from "./mebiSphericalMirror";

export const concaveSpecialTitle = "Çukur aynada altı ışın yolu";
export const concaveSpecialSteps = [
  "Paralelden odağa",
  "Odak çevresinden paralele",
  "Merkezden geldiği yola",
  "Tepede iki eş açı",
  "Odak ile merkez arasından uzağa",
  "Odak ile tepe arasından sanal görüntüye",
] as const;

export const concaveSpecialSection: GuideSection = {
  title: concaveSpecialTitle,
  figureTitle: concaveSpecialTitle,
  paragraphs: [
    "T tepe, F yaklaşık odak ve M küre merkezi. Her çizimde temas noktasının normali M’den geçer. Önce gelen oku aynaya kadar, sonra yansıyan oku aynadan dışarı izle.",
    "Paralel ışının odak çevresinde oluşturduğu yol tersine de izlenebilir. Bu karşı noktadan geldiğinde yansıyan ışın eksene paralel çıkar. Eksen dışındaki ışınlar için çizimdeki tam kesişim F’ye yakın olabilir.",
    "Merkez M’den gelen ışın normale denk gelir ve kendi doğrultusunda geri döner. Tepe T’de normal asal eksenle çakışır. Bu noktada iki eş açıyı doğrudan eksenden ölçersin.",
    "Işın F ile M arasındaki bir eksen noktasından gelirse gösterilen örnekte gerçek yansıma ekseni M’nin dışında keser. F ile T arasından gelen örnekte ise gerçek kol ön tarafta kalır, kesik uzantı aynanın arkasında ekseni keser.",
  ],
};

export const concaveSpecialExample: WorkedExample = {
  title: "Çukur aynanın altı yansıma yolunu ayır",
  prompt: "Kürenin yarıçapı 3,6 birim. Aynaya sırasıyla paralelden, odak çevresinden, merkezden, tepeden ve iki farklı eksen noktasından ışın gönder. Hangisinde kesişim gerçek, hangisinde kesik uzantıyla bulunur?",
  strategy: "Her sahnede yüzeye temas noktasını ve M’ye giden normali bul. Gerekirse yansıma kolunu aynanın arkasına kesik çizgiyle uzat.",
  steps: [
    { label: "Paralelin çıktığı yeri bul", explanation: "Eksene 0,4 birim uzaklıktan gelen ışın, normalden dönünce aynanın önünde F çevresine ulaşır.", figureTitle: concaveSpecialSteps[0] },
    { label: "Aynı yolu tersine izle", explanation: "Bir önceki eksen kesişiminden aynaya gel. Çıkış eksene paralel olur.", figureTitle: concaveSpecialSteps[1] },
    { label: "Merkez doğrultusuna bak", explanation: "Işın merkez ile temas noktası doğrultusunda geldi. Yerel normalle açısı 0°, geldiği yoldan döner.", figureTitle: concaveSpecialSteps[2] },
    { label: "Tepe normalini kullan", explanation: "T noktasının normali asal eksendir. Örnekte geliş ve yansıma bu eksenle ayrı ayrı 30° yapar.", figureTitle: concaveSpecialSteps[3] },
    { label: "F ile M arasından geleni takip et", explanation: "Aynadan 2,7 birim öndeki eksen noktasından gelen ışın, ön tarafta tepeden yaklaşık 5,36 birim uzakta ekseni keser.", figureTitle: concaveSpecialSteps[4] },
    { label: "F ile T arasından gelenin uzantısını çiz", explanation: "Aynadan 0,8 birim öndeki eksen noktası için kesişim aynanın arkasında. Kesik uzantı tepeden yaklaşık 1,82 birim uzakta eksene ulaşır.", figureTitle: concaveSpecialSteps[5] },
  ],
  answer: "F–M örneğinde gerçek kesişim aynanın önünde, F–T örneğinde sanal kesişim aynanın arkasında.",
  check: "İkinci çizimin yansıması birincinin geliş yolunun tersi. Her iki sahnede kesişim hesapları aynı yüzey normaline bağlı.",
  pitfall: "Kesik çizgiden geçen bir ışın varmış gibi okuma; kesik çizgi gerçek yansımanın geriye uzatılmış doğrultusudur.",
};

function fromSource(source: Point, height: number) {
  const base = sphericalMirrorAt("concave", height);
  const horizontal = base.hit[0] - source[0], vertical = base.hit[1] - source[1];
  const length = Math.hypot(horizontal, vertical);
  const incoming: Point = [horizontal / length, vertical / length];
  const dot = incoming[0] * base.normal[0] + incoming[1] * base.normal[1];
  const reflected: Point = [
    incoming[0] - 2 * dot * base.normal[0],
    incoming[1] - 2 * dot * base.normal[1],
  ];
  const distance = height !== 0 && Math.abs(reflected[1]) > 1e-12 ? -height / reflected[1] : null;
  const crossing: Point | null = distance === null ? null : [base.hit[0] + distance * reflected[0], 0];
  return { source, hit: base.hit, incoming, reflected, distance, crossing, center: base.center, focus: base.focus };
}

export function concaveSpecialRayAt(step: number) {
  switch (step) {
    case 0:
      return fromSource([-5.8, 0.4], 0.4);
    case 1: {
      const { crossing } = sphericalMirrorAt("concave", 0.4);
      if (!crossing) throw Error("Near-axis parallel ray must have a real crossing");
      return fromSource(crossing, 0.4);
    }
    case 2:
      return fromSource([-sphericalMirrorRadius, 0], 0.72);
    case 3:
      return fromSource([-3, Math.sqrt(3)], 0);
    case 4:
      return fromSource([-2.7, 0], 0.8);
    case 5:
      return fromSource([-0.8, 0], 0.8);
    default:
      throw Error("Unknown concave mirror ray step");
  }
}
