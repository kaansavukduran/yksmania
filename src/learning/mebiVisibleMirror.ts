import type { GuideSection, WorkedExample } from "./guides/types";

export const visibleMirrorTitle = "Yan aynada görünen ışığın yolu";
export const visibleMirrorPhotoTitle = "Yan aynada gün batımı";
export const visibleMirrorRayTitle = "Yansıma normalle başlar";

export const visibleMirrorSection: GuideSection = {
  title: visibleMirrorTitle,
  figureTitle: visibleMirrorPhotoTitle,
  paragraphs: [
    "İnsan gözü elektromanyetik spektrumun görünür ışık bölümünü algılar. Uzakta bir şeyi görebilmen için ondan gelen ışığın gözüne ulaşması gerekir. Yol ve bulutlar, üzerlerine düşen ışığın bir bölümünü çevreye yansıtır.",
    "Fotoğrafta aynanın çerçevesinin içinde arkadaki yolu ve gün batımını görebilirsin. Görünür ışık arkadaki sahneden aynaya ulaşır. Ayna, ışığın bir bölümünü gözün bulunabileceği yöne çevirir. Kameranın kaydettiği görüntü bu yansımanın sonucudur.",
    "Bir ışının gelme ve yansıma açılarını, ışının yüzeye değdiği yerde aynaya dik olan normal çizgisine göre ölçeriz. Bazı araç aynaları eğridir. O zaman normal, aynanın baktığın noktasına göre değişir.",
  ],
  table: {
    layout: "table",
    headers: ["Işığın yolu", "Bu aşamada ne olur?"],
    rows: [["Arkadaki sahne → ayna", "Görünür ışık aynaya gelir."], ["Ayna → göz", "Yansıyan ışığın bir bölümü göze ulaşır."]],
  },
};

export const visibleMirrorExample: WorkedExample = {
  title: "Aynaya 55° yüzey açısıyla gelen ışın",
  prompt: "Bir ışın aynanın yüzeyiyle 55° açı yaparak geliyor. Aynaya dik normal çizgisiyle kaç derece yaparak yansır?",
  strategy: "Yüzeyle verilen açıyı normale göre yaz. Sonra yansıma yasasını uygula.",
  steps: [
    { label: "Normali bul", expression: "Normal ⟂ yüzey", explanation: "Kesikli çizgi, ışının aynaya değdiği noktadan geçer ve yüzeye diktir.", figureTitle: visibleMirrorRayTitle },
    { label: "Gelme açısını hesapla", expression: "i = 90° − 55° = 35°", explanation: "Yüzey ile normalin arası dik açı. Gelen ışın bu açıyı 55° ve 35° olarak böler." },
    { label: "Yansıma açısını yaz", expression: "r = i = 35°", explanation: "Gelen ve yansıyan ışın normalin farklı yanlarında durur. Normalden açılar eşittir.", figureTitle: visibleMirrorRayTitle },
  ],
  answer: "Yansıyan ışın normal çizgisiyle 35° açı yapar.",
  check: "Modelde gelme açısını 35° seç. İki normal açısı 35°, yüzey açısı 55° görünür.",
  pitfall: "Soru yüzey açısını veriyor, normal açısını soruyor. İlk adımda iki açının toplamını 90° olarak kullan.",
};
