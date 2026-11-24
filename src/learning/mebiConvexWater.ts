import type { GuideSection, WorkedExample } from "./guides/types";

type Point = readonly [number, number];
const radius = 12;
const maxHeight = 2.8;

export const convexWaterTitle = "Tümsek engelde sanal odak";
export const convexWaterReflectedTitle = "Tümsek engelden dağılan cephe";
export const surfaceNormalTitle = "Yüzey normali temas noktasından geçer";
export const convexFocusCm = radius / 2;

export function convexWater() {
  const rays = Array.from({ length: 11 }, (_, i) => {
    const y = (i / 5 - 1) * maxHeight;
    const x = radius - Math.sqrt(radius ** 2 - y ** 2);
    const normal = [(x - radius) / radius, y / radius] as Point;
    const reflected = [1 - 2 * normal[0] ** 2, -2 * normal[0] * normal[1]] as Point;
    const hit = [x, y] as Point;
    const virtualAxisIntercept = Math.abs(reflected[1]) < 1e-10 ? undefined : x - y * reflected[0] / reflected[1];
    return { hit, normal, reflected, virtualAxisIntercept };
  });
  // The plane first reaches the vertex. Other rays hit the curved wall later.
  const lastContact = Math.max(...rays.map(({ hit: [x] }) => x));
  const crests = [0.8, 2, 3.2].map((time) => rays.map(({ hit: [x, y], reflected: [dx, dy] }) => {
    const sinceContact = lastContact + time - x;
    return [x + sinceContact * dx, y + sinceContact * dy] as Point;
  }));
  return { rays, crests };
}

export const convexSection: GuideSection = {
  title: convexWaterTitle,
  figureTitle: convexWaterTitle,
  paragraphs: [
    "Düz cephe sağa doğru tümsek engele ulaşıyor. Üstteki ve alttaki hız okları geriye dönerken birbirinden uzaklaşıyor. Engel dışa doğru bombeli olduğu için her temas noktasındaki normal farklı doğrultuda.",
    "Yansıyan okları engelin arkasına doğru kesikli çizgiyle uzat. Uzantılar F çevresini gösterirken gerçek dalga cepheleri engelin önünde kalır. Küçük açıklıklı dairesel engelde bu sanal odağın tepeye uzaklığı yaklaşık eğrilik yarıçapının yarısıdır.",
    "Aynı derinlik ve aynı kaynak frekansında yansıma yönü değiştirir. Dalganın sürati, periyodu ve dalga boyu korunur. İdeal bir parabolde eksene paralel gelen doğrultular ortak odağa yönelir. Cepheyi belirlemek için eşit yayılma süresindeki noktaları çiz.",
  ],
  table: {
    layout: "table",
    headers: ["Görülen", "Anlamı"],
    rows: [["Yansıyan gerçek cephe", "Engelin önünde, dışarı doğru yayılır"], ["Kesikli uzantı", "Engelin arkasındaki sanal F’ye doğru devam eder"], ["F", "Yaklaşık sanal odak, titreşim kaynağı yok"]],
  },
};

export const surfaceNormalSection: GuideSection = {
  title: surfaceNormalTitle,
  figureTitle: surfaceNormalTitle,
  paragraphs: [
    "Yüzeye değen P noktasından yüzeye dik bir doğru çiz. Bu doğru yüzey normali N’dir. Kesitteki diklik işareti, yüzey ile N’nin 90° yaptığını gösterir.",
    "Düz yüzeyde bütün normaller paraleldir. Dairesel engelde P’nin yeri değişirse normal de değişir. O noktadaki normal, P ile eğrilik merkezi arasındaki doğru üzerinden geçer.",
  ],
};

export const convexExample: WorkedExample = {
  title: "Tümsek engelde F’nin yerini bul",
  prompt: "Düz dalga cephesi, eğrilik yarıçapı 12 cm olan tümsek bir engele dik doğrultuda ilerliyor. Yaklaşık sanal odak engelin hangi tarafında ve kaç santimetre uzakta?",
  strategy: "Gerçek yansıyan okları engelin önünde tut. Sadece geriye uzantıları engelin arkasına geçir.",
  steps: [
    { label: "Yüzeye dik doğrultuyu seç", explanation: "Temas noktasındaki normal yüzeye diktir. Tümsek engelin üst ve alt yarısında normal yönleri farklıdır.", figureTitle: surfaceNormalTitle },
    { label: "Yansıyan okları geriye uzat", expression: "F ≈ R/2 = 6 cm", explanation: "Kesikli uzantılar engelin arkasında F çevresini gösterir. Dairesel yaklaşımda verilen uzaklık yaklaşık değerdir.", figureTitle: convexWaterReflectedTitle },
  ],
  answer: "F, tümsek engelin arkasında yaklaşık 6 cm uzaktadır.",
  check: "Yansıyan cepheler engelin önünde kalır. Kesikli uzantıları izleyince F arka tarafta görünür.",
  pitfall: "Yansıyan dalgaların engelin arkasında fiziksel olarak birleştiğini düşünme.",
};
