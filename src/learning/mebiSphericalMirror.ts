import type { GuideSection, WorkedExample } from "./guides/types";

export type MirrorSurface = "concave" | "convex";
export type Point = readonly [number, number];

export const sphericalMirrorRadius = 3.6;
export const sphericalMirrorVertex: Point = [0, 0];

export function reflectMirrorDirection(incoming: Point, normal: Point): Point {
  const dot = incoming[0] * normal[0] + incoming[1] * normal[1];
  return [
    incoming[0] - 2 * dot * normal[0],
    incoming[1] - 2 * dot * normal[1],
  ];
}

export function sphericalMirrorAt(surface: MirrorSurface, height: number) {
  const radius = sphericalMirrorRadius;
  const side = surface === "concave" ? -1 : 1;
  const center: Point = [side * radius, 0];
  const focus: Point = [center[0] / 2, 0];
  const offset = Math.sqrt(radius ** 2 - height ** 2);
  const hit: Point = [center[0] - side * offset, height];
  const normal: Point = [-side * offset / radius, height / radius];
  const reflected = reflectMirrorDirection([1, 0], normal);
  const axisDistance = height === 0 ? null : -height / reflected[1];
  const crossing: Point | null = axisDistance === null ? null : [hit[0] + axisDistance * reflected[0], 0];
  return { center, focus, hit, normal, reflected, crossing, distanceToAxis: axisDistance };
}


export const sphericalSurfaceTitle = "İç ve dış yüzeyde paralel ışınlar";
export const sphericalAxisTitle = "Tepe, odak ve merkez";
export const sphericalConcaveTitle = "Çukur aynada gerçek kesişim";
export const sphericalConvexTitle = "Tümsek aynada sanal kesişim";

export const sphericalSurfaceSection: GuideSection = {
  title: sphericalSurfaceTitle,
  figureTitle: sphericalSurfaceTitle,
  paragraphs: [
    "Küresel ayna, küre kabuğunun bir parçası. Işık iç yüzeyden yansıyorsa çukur, dış yüzeyden yansıyorsa tümsek ayna elde edilir.",
    "Aynanın eğri yüzeyine değen ışının normali o noktayı kürenin merkezine bağlayan yarıçaptır. Gelen ve yansıyan ışını bu çizgiye göre karşılaştır.",
    "Çukur ayna eksene yakın paralel ışınları odağın çevresinde toplar. Tümsek aynada ışınlar aynanın önünde açılır, geri uzantıları odağın çevresine yönelir.",
    "Teleskop ve ışık toplayan düzeneklerde çukur, araç yan aynası ve kavşak aynası gibi geniş görüş gereken yerlerde tümsek yüzey kullanılır.",
  ],
};

export const sphericalAxisSection: GuideSection = {
  title: sphericalAxisTitle,
  figureTitle: sphericalAxisTitle,
  paragraphs: [
    "M, aynayı tamamlayan kürenin merkezi. T, asal eksenin aynaya değdiği tepe noktası. M ile T arasındaki uzaklık kürenin yarıçapı R.",
    "Asal eksen, M ile T’den geçen doğrudur. F, asal eksene yakın paralel ışınların odak noktasıdır. Bu modelde F, T ile M’nin orta noktasına konur ve f = R/2 alınır.",
    "Eğri yüzeyin dış kenarına giden ışınlarda kesişim F’den ayrılabilir. Sürgüyü oynatıp değişimi sayısal sonuçtan izle.",
  ],
};

export const sphericalMirrorExample: WorkedExample = {
  title: "Paralel ışınları çukur ve tümsek aynada karşılaştır",
  prompt: "Küre yarıçapı 3,6 birim. Asal eksene paralel ve eksenden 0,4 birim uzaktaki ışınların aynadan sonraki yolunu bul.",
  strategy: "Her ışın için yarıçapı normal olarak çiz. Yansıma kollarının ileri ve geri yönlerini ayrı takip et.",
  steps: [
    { label: "Çukur aynada gerçek kolları izle", explanation: "Paralel ışınlar aynanın önünde, T’den yaklaşık 1,79 birim uzakta kesişir. Model odağının uzaklığı 1,8 birim.", figureTitle: sphericalConcaveTitle },
    { label: "Tümsek aynada uzantıları izle", explanation: "Gerçek ışınlar aynanın önünde ayrılır. Kesik geri uzantılar aynanın arkasında T’den yaklaşık 1,79 birim uzakta kesişir.", figureTitle: sphericalConvexTitle },
  ],
  answer: "Çukur aynada ön tarafta gerçek, tümsek aynada arka tarafta sanal kesişim.",
  check: "Aynı yarıçap ve geliş yüksekliği kullanıldığında kesişim uzaklıklarının büyüklükleri eşit.",
  pitfall: "Tümsek aynanın arkasındaki kesik çizgileri ışığın geçtiği yol gibi okuma.",
};

export function traceSphericalRay(surface: MirrorSurface, source: Point, height: number) {
  const base = sphericalMirrorAt(surface, height);
  const horizontal = base.hit[0] - source[0], vertical = base.hit[1] - source[1];
  const length = Math.hypot(horizontal, vertical);
  const incoming: Point = [horizontal / length, vertical / length];
  const reflected = reflectMirrorDirection(incoming, base.normal);
  const distance = height !== 0 && Math.abs(reflected[1]) > 1e-12 ? -height / reflected[1] : null;
  const crossing: Point | null = distance === null ? null : [base.hit[0] + distance * reflected[0], 0];
  return { source, hit: base.hit, incoming, reflected, distance, crossing, center: base.center, focus: base.focus, normal: base.normal };
}
