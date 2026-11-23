import type { GuideSection, WorkedExample } from "./guides/types";

export const parabolaTranslationTitle = "Parabolün iki noktasından ötelemeyi oku";
const vertex = [-1, 2] as const;
const marked = [0, 3] as const;
export const parabolaOffsets = [-1, 0, 1] as const;

export const sourceParabola = (x: number) => (x - vertex[0]) ** 2 + vertex[1];
export function translatedSourceParabola(horizontal: number, vertical: number) {
  return {
    oldVertex: vertex,
    oldMarked: marked,
    vertex: [vertex[0] + horizontal, vertex[1] + vertical] as const,
    marked: [marked[0] + horizontal, marked[1] + vertical] as const,
    value: (x: number) => sourceParabola(x - horizontal) + vertical,
  };
}

const source = translatedSourceParabola(3, -1);
function pair([x, y]: readonly [number, number]) {
  return `(${x < 0 ? `−${-x}` : x}; ${y < 0 ? `−${-y}` : y})`;
}
export const parabolaTranslationSection: GuideSection = {
  title: parabolaTranslationTitle,
  figureTitle: parabolaTranslationTitle,
  paragraphs: [
    "Grafikte T ve T′ tepe noktalarını, C ve C′ aynı işaretli noktanın iki hâlini gösteriyor. Önce T’den T′ye geçerken x ve y koordinatlarının ayrı ayrı ne kadar değiştiğini oku. Sonra aynı değişimin C’den C′ye geçişte de olduğunu kontrol et.",
    "f grafiği h kadar yatay, k kadar düşey ötelenirse yeni grafik g(x) = f(x − h) + k olur. Yeni grafiğin x değerinden yatay ötelemeyi çıkarınca eski grafikteki karşılığını bulursun. Düşey farkı sonucu hesaplarken eklersin.",
    "Parabolün genişliği ve açılma yönü korunur. İki noktaya farklı vektör uygulandıysa çizim saf öteleme göstermez. İşaretli C noktası sıradan bir örnek noktadır. C′nin yeni y ekseni üzerinde durması gerekmez.",
  ],
  table: {
    layout: "table",
    headers: ["Nokta", "Başlangıç", "Görüntü", "Değişim"],
    rows: [["Tepe T", pair(vertex), pair(source.vertex), "(+3; −1)"], ["İşaretli C", pair(marked), pair(source.marked), "(+3; −1)"]],
  },
};

export const parabolaTranslationExample: WorkedExample = {
  title: "Sağa üç, aşağı bir kaydırılan parabol",
  prompt: "f parabolünün tepe noktası T(−1; 2), işaretli C noktası (0; 3). Görüntüde tepe T′(2; 1), C′(3; 2). Öteleme vektörünü ve g(x) kuralını bul.",
  strategy: "Eş noktaların yeni koordinatından aynı eksendeki eski koordinatı çıkar.",
  steps: [
    { label: "Yatay ve düşey hareket", expression: "(2 − (−1); 1 − 2) = (3; −1)", explanation: "İşaretli noktalar da (3 − 0; 2 − 3) = (3; −1) vektörünü verir.", figureTitle: parabolaTranslationTitle },
    { label: "Eski x değerine dön", expression: "g(x) = f(x − 3) − 1", explanation: "Yeni x, eski x’e 3 eklenerek bulunur. f’nin girdisine geri dönmek için yeni x’ten 3 çıkarılır." },
    { label: "Parabolün açılmasını doğrula", expression: "f(x) = (x + 1)² + 2, g(x) = (x − 2)² + 1", explanation: "f’nin tepesi ve C değeri, kareli terimin katsayısını 1 yapar. Ötelemede bu katsayı korunur." },
  ],
  answer: "Vektör (3; −1). Yeni kural g(x) = f(x − 3) − 1 = (x − 2)² + 1.",
  check: "g(2) = 1 ve g(3) = 2. Sonuç, T′ ve C′ ile uyuşur.",
  pitfall: "Sağa ötelemede g(x) kuralına f(x + 3) yazma. Önce yeni girdiden eski girdiye dön.",
};
