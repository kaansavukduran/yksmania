import type { GuideSection, WorkedExample } from "./guides/types";
import { sphericalMirrorAt, traceSphericalRay, type Point } from "./mebiSphericalMirror";

export const convexSpecialTitle = "Tümsek aynada ışının dört yolu";
export const convexSpecialSteps = [
  "Paralel gelişin sanal odağı",
  "Odağa yönelince paralel dönüş",
  "Merkeze yönelince kendi yolu",
  "Yerel normalde eş açılar",
] as const;

export function convexSpecialRayAt(step: number, height: number) {
  const base = sphericalMirrorAt("convex", height);
  const fromDirection = (direction: Point): Point => [
    base.hit[0] + 3.2 * direction[0],
    base.hit[1] + 3.2 * direction[1],
  ];
  switch (step) {
    case 0:
      return { ...traceSphericalRay("convex", [-5.8, height], height), guide: base.crossing };
    case 1:
      return { ...traceSphericalRay("convex", fromDirection(base.reflected), height), guide: base.crossing };
    case 2:
      return { ...traceSphericalRay("convex", fromDirection(base.normal), height), guide: base.center };
    case 3: {
      const angle = Math.PI / 6;
      const [nx, ny] = base.normal;
      const source = fromDirection([nx * Math.cos(angle) - ny * Math.sin(angle), nx * Math.sin(angle) + ny * Math.cos(angle)]);
      return { ...traceSphericalRay("convex", source, height), guide: null };
    }
    default:
      throw Error("Unknown convex mirror ray step");
  }
}

export const convexSpecialSection: GuideSection = {
  title: convexSpecialTitle,
  figureTitle: convexSpecialTitle,
  paragraphs: [
    "Tümsek aynanın merkezi M ve yaklaşık odağı F, yansıtıcı yüzün arkasında. Gerçek ışın yüzeye geldiğinde ön tarafta kalır. Aynanın arkasındaki kesik çizgiler doğrultuyu okumaya yarar.",
    "Eksen yakınında paralel gelen ışın, geri uzantısı F çevresine ulaşacak biçimde döner. Aynı ışın yolunu tersinden izleyince F çevresine doğrultulan geliş, eksene paralel döner.",
    "M’ye yönelen ışın, yüzeye normal boyunca gelir ve kendi doğrultusundan geri gider. Gerçek kaynak aynanın önündedir. M’yi gösteren parça, gelen doğrunun kesik uzantısı.",
    "Başka doğrultudan gelen ışında N temasını M’ye bağla. Normalin iki yanında geliş ve yansıma açıları eşit. Temas yüksekliği değişince normal de döner.",
  ],
};

export const convexSpecialExample: WorkedExample = {
  title: "Tümsek aynada gerçek ışını ve kesik uzantıyı ayır",
  prompt: "Tümsek aynaya eksene 0,4 birim uzaktan ışın geliyor. Paralel, odağa doğru, merkeze doğru ve 30° eğik gelişte yolu ayrı çiz.",
  strategy: "Aynanın önündeki gerçek okları önce belirle. F ve M’ye giden doğrultuları arka tarafta kesik uzat.",
  steps: [
    { label: "Paralel okla sanal odağı bul", explanation: "Gerçek dönüş ön tarafta uzaklaşır. Geri uzantı tepeden yaklaşık 1,79 birim arkada eksene değer.", figureTitle: convexSpecialSteps[0] },
    { label: "Yolu tersine çevir", explanation: "Kesik doğrultusu aynı eksen noktasına yönelen gelen ışın, aynadan eksene paralel çıkar.", figureTitle: convexSpecialSteps[1] },
    { label: "Merkezle temas noktasını birleştir", explanation: "Gelen ışının uzantısı M’ye gider. Işın yerel normali izlediği için aynı doğrultuda geri döner.", figureTitle: convexSpecialSteps[2] },
    { label: "Normalden iki açıyı ölç", explanation: "Geliş normalden 30°. Gerçek dönüş kolu normalin öte yanında yine 30°.", figureTitle: convexSpecialSteps[3] },
  ],
  answer: "Paralel gelen ışının sanal uzantısı odağa yakın. Odağa yöneltilen ışın paralel, merkeze yöneltilen ışın kendi yoluna döner.",
  check: "Kesik çizgiler arkada, gerçek ışık okları aynanın önünde kalır.",
  pitfall: "Odağa veya merkeze yöneltilen ışının kaynağını F’ye ya da M’ye yerleştirme.",
};
