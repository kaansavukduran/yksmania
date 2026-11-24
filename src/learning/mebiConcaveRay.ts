import type { GuideSection, WorkedExample } from "./guides/types";
import { reflectMirrorDirection } from "./mebiSphericalMirror";

type Point = readonly [number, number];

const rotate = (p: Point, angle: number): Point => [
  p[0] * Math.cos(angle) - p[1] * Math.sin(angle),
  p[0] * Math.sin(angle) + p[1] * Math.cos(angle),
];

export function concaveRayAt(radius: number, hitHeight: number, incidenceDegrees: number) {
  const horizontal = Math.sqrt(radius ** 2 - hitHeight ** 2);
  const hit: Point = [-radius + horizontal, hitHeight];
  const center: Point = [-radius, 0];
  const inwardNormal: Point = [-horizontal / radius, -hitHeight / radius];
  const fromHitTowardSource = rotate(inwardNormal, incidenceDegrees * Math.PI / 180);
  const incoming: Point = [-fromHitTowardSource[0], -fromHitTowardSource[1]];
  const reflected = reflectMirrorDirection(incoming, inwardNormal);
  return { hit, center, inwardNormal, incoming, fromHitTowardSource, reflected, focus: -radius / 2 };
}


export const curvatureFocusTitle = "Yarıçap değişince odak ne olur?";
export const concaveNormalTitle = "Temas noktasında normali bul";
export const concaveReturnTitle = "Yansıyan ışını eş açıyla çiz";

export const curvatureFocusSection: GuideSection = {
  title: curvatureFocusTitle,
  figureTitle: curvatureFocusTitle,
  paragraphs: [
    "Kürenin merkezinden tepeye çizilen uzunluk R’dir. Eksen yakınındaki görüntü hesabında odak uzaklığı f, R’nin yarısı alınır. R iki katına çıkarsa odak da tepeden iki kat uzağa taşınır.",
    "R sabitken ideal aynanın geometrik odağı ışığın renginden ya da aynanın bulunduğu ortamdan dolayı değişmez. Ayna ışığı yansıtır. Bir mercekteki gibi iki farklı ortamın sınırında kırılan ışının açısını hesaplamıyorsun.",
    "Tümsek modelde tepenin arkasındaki F ve M noktaları, gerçek ışınların ulaştığı noktalar yerine kesik uzantıları okumaya yarar.",
  ],
};

export const concaveNormalSection: GuideSection = {
  title: concaveNormalTitle,
  figureTitle: concaveNormalTitle,
  paragraphs: [
    "Işın eğri yüzeyle N’de karşılaşır. N ile kürenin merkezi M’yi birleştir. Elde ettiğin yarıçap N’de yüzeye dik, bu yüzden N’nin normali.",
    "Gelme açısını yüzeyin eğrisinden ölçme. N’den gelen ışının geldiği yöne ve yerel normale bak. Yansıyan ışın, normalin karşı yanında aynı açıyı yapar.",
    "Işın normal boyunca gelirse gelme açısı 0°’dir. Aynı doğrultuda geldiği yöne geri döner. Tepe dışındaki noktalarda asal eksenle yerel normalin doğrultusu genellikle farklıdır.",
  ],
};

export const concaveNormalExample: WorkedExample = {
  title: "Çukur aynaya eğik gelen ışını normalle döndür",
  prompt: "Çukur aynanın tepe dışındaki N noktasına gelen ışın, N’nin normaliyle 30° yapıyor. Yansımanın yönünü nasıl bulursun?",
  strategy: "Önce N ile M’yi birleştir, sonra bu doğruya göre iki açıyı karşılaştır.",
  steps: [
    { label: "N ile M’yi birleştir", explanation: "Yarıçap N’de yüzeye dik. Gelme açısının bir kenarı bu kesik doğrudur.", figureTitle: concaveNormalTitle },
    { label: "Normalin diğer yanını ölç", explanation: "N’den çıkan ışını normalin öbür yanında 30° aç. Her iki açının köşesi de N.", figureTitle: concaveReturnTitle },
  ],
  answer: "Yansıma açısı 30°. Yansıyan ışın yerel normalin karşı yanında.",
  check: "0° seçildiğinde ışın kendi yolu üzerinden döner. Eğik durumda iki açı eş kalır.",
  pitfall: "Yüzeyin başka bir noktasındaki normali kullanma. Değme noktası değişirse yarıçapın doğrultusu da değişir.",
};
