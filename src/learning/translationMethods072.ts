import type { GuideSection, WorkedExample } from "./guides/types";

export const transformationMethodsTitle = "Hangi dönüşüm adımı gerekir?";
export const rotationFromCenterTitle = "Dönmeyi kendi merkezinden ölç";
export const rotationCenter = [2, 1] as const;
export const rotationStart = [5, -1] as const;
const relative = [rotationStart[0] - rotationCenter[0], rotationStart[1] - rotationCenter[1]] as const;

export function centerQuarterTurn(angle: number) {
  const [x, y] = relative;
  const turned = angle === -90 ? [y, -x] : angle === 90 ? [-y, x] : [x, y];
  return {
    image: [rotationCenter[0] + turned[0], rotationCenter[1] + turned[1]] as const,
    distanceSquared: turned[0] ** 2 + turned[1] ** 2,
  };
}

export const transformationMethods: GuideSection = {
  title: transformationMethodsTitle,
  paragraphs: ["Verilen koşulu bul, ilk adımı seç ve yakındaki hatayla karşılaştır. Bileşke işlemlerde ara noktayı her sırada ayrı yaz."],
  table: {
    layout: "table",
    headers: ["Koşul ve ilk adım", "Geçerli örnek", "Sınır veya yakın hata", "Yeni bağlam"],
    rows: [
      ["Öteleme · bileşenleri ekle", "(2; −3) + (−4; 5) = (−2; 2).", "Sola hareketin x bileşeni eksidir.", "Bir şekli taşırken bütün köşelere aynı vektörü ekle."],
      ["Orijinde dönme · yönü seç", "(2; 3), +90° ile (−3; 2) olur.", "Saat yönündeki 90° sonucu (3; −2) olur.", "Doğuya bakan (1; 0), +90° ile kuzeye döner."],
      ["Başka merkez · merkezden ölç", "C(1; 1) çevresinde P(3; 1), +90° ile (1; 3) olur.", "Doğrudan orijin kuralını uygularsan (−1; 3) çıkar.", "Çemberin merkezini döndür. Yarıçap aynı kalır."],
      ["Bileşke · işlem sırasını yaz", "P(1; 0), 2 sağa sonra +90° ile (0; 3) olur.", "Önce dönüp sonra ötelersen (2; 1) olur.", "Uzaklık, açı ve alan korunur. Son konum sıraya bağlı olabilir."],
    ],
  },
};

export const rotationFromCenterSection: GuideSection = {
  title: rotationFromCenterTitle,
  figureTitle: rotationFromCenterTitle,
  paragraphs: [
    "Dönme açısını C merkezinden oku. P’nin C’ye göre yatay farkı 3, düşey farkı −2. Saat yönündeki 90° dönüşte (u; v) → (v; −u), yani (3; −2) → (−2; −3). Merkezi geri ekle. P′ noktası (0; −2) olur.",
    "Sürgüde +90° seçildiğinde aynı uzaklıktaki başka bir noktaya ulaşırsın. İki yönde de uzaklığın karesi 13. Merkezin koordinatları değişmez.",
  ],
};

export const rotationFromCenterExample: WorkedExample = {
  title: "Başka merkezde saat yönünü izle",
  prompt: "P(5; −1), C(2; 1) çevresinde saat yönünde 90° dönüyor. P′ noktasını ve merkeze uzaklığın karesini bul.",
  strategy: "Koordinat farkını P − C ile bul. Dönüşü fark vektörüne uygula ve merkezi geri ekle.",
  steps: [
    { label: "Merkezden ölç", expression: "P − C = (3; −2)", explanation: "C, yeni ölçüm başlangıcın. Farkların karelerinin toplamı 9 + 4 = 13." },
    { label: "Farkı döndür", expression: "(3; −2) → (−2; −3)", explanation: "Saat yönü için (u; v) → (v; −u).", figureTitle: rotationFromCenterTitle },
    { label: "Merkezi geri ekle", expression: "(2; 1) + (−2; −3) = (0; −2)", explanation: "Yeni farkların karelerinin toplamı 4 + 9 = 13." },
  ],
  answer: "P′(0; −2). Merkeze uzaklığın karesi 13.",
  check: "Orijin etrafında doğrudan döndürseydin (−1; −5) çıkardı. Verilen merkezden uzaklık aynı kalmazdı.",
  pitfall: "Yatay ve düşey farkları doğrudan noktanın koordinatları olarak yazma. Merkezi geri ekle.",
};


export const reverseTransformationTitle = "Öteleme ve dönmeyi sondan geri al";

export const reverseTransformation = (() => {
  const final = [-3, 5] as const;
  const [dx, dy] = [2, -1];
  const translated = [final[1], -final[0]] as const;
  const initial = [translated[0] - dx, translated[1] - dy] as const;
  return { final, translated, initial };
})();

export const reverseTransformationSection: GuideSection = {
  title: reverseTransformationTitle,
  figureTitle: reverseTransformationTitle,
  paragraphs: [
    "İleri yol önce (2; −1) ötelemesi, sonra orijinde +90° dönmedir. Sonuç Q(−3; 5) verilince en son yapılan dönmeyi önce geri al. (x; y) → (y; −x) ile Q’dan (5; 3) noktasına gel.",
    "Şimdi ileri ötelemeyi çıkar. (5; 3) − (2; −1) = (3; 4). İleri yolu denetle. (3; 4) ötelenince (5; 3), +90° dönünce (−3; 5) çıkar.",
  ],
};

export const reverseTransformationExample: WorkedExample = {
  title: "Son noktadan ilk noktaya dön",
  prompt: "P önce (2; −1) kadar öteleniyor, sonra orijin çevresinde +90° dönüyor. Son nokta Q(−3; 5). İlk P noktası nedir?",
  strategy: "Son işlemin tersini önce yap. Dönmeyi geri alınca çıkan ara noktadan öteleme vektörünü çıkar.",
  steps: [
    { label: "Dönmeyi geri al", expression: "(−3; 5) → (5; 3)", explanation: "−90° yönünde (x; y) → (y; −x).", figureTitle: reverseTransformationTitle },
    { label: "Ötelemeyi geri al", expression: "(5; 3) − (2; −1) = (3; 4)", explanation: "2 sola ve 1 yukarı hareket et." },
  ],
  answer: "P(3; 4).",
  check: "İleri yönde (3; 4) → (5; 3) → (−3; 5).",
  pitfall: "Ötelemeyi önce geri alırsan (−5; 6), sonra dönünce (6; 5) çıkar. Bu noktadan ileri yol Q’ya ulaşmaz.",
};
