import type { GuideSection, WorkedExample } from "./guides/types";

export const ultravioletBoundaryTitle = "Mor ışık ve morötesi sınırı";
export const visibleBoundaryNm = 380;
export const boundaryWavelength = { min: 320, max: 480, step: 10, initial: 350 };

export function wavelengthRegion(wavelength: number) {
  if (wavelength === visibleBoundaryNm) return "Yaklaşık sınır";
  return wavelength < visibleBoundaryNm ? "Morötesi" : "Görünür bölge";
}

export const ultravioletBoundarySection: GuideSection = {
  title: ultravioletBoundaryTitle,
  figureTitle: ultravioletBoundaryTitle,
  paragraphs: [
    "Görünür ışığın kısa dalga boylu ucunda mor renk bulunur. Biraz daha kısa dalga boylarında morötesi bölgeye geçilir. Morötesi için UV kısaltması da kullanılır. Bu ışınımı insan gözü doğrudan algılayamaz.",
    "Nanometre metrenin milyarda biri. Çizimde kısa dalga boyları solda. 380 nm, görünür bölgenin mor ucunu göstermek için kullanılan yaklaşık bir değerdir. Farklı kaynaklar görünür bölge için biraz farklı uç değerler verebilir.",
    "Bir morötesi lamba fotoğrafta mor görünebilir. Lambadan gelen görünür ışık ya da aydınlattığı malzemenin yaydığı görünür ışık fotoğrafa girer. Mor parıltı tek başına morötesinin dalga boyunu göstermez.",
  ],
  table: {
    layout: "table",
    headers: ["Örnek dalga boyu", "Çizimdeki bölge"],
    rows: [350, visibleBoundaryNm, 440].map((nm) => [`${nm} nm`, wavelengthRegion(nm)]),
  },
};

export const ultravioletBoundaryExample: WorkedExample = {
  title: "350 nm ve 440 nm işaretlerini karşılaştır",
  prompt: "Bu modelde görünür ışığın kısa dalga boyu sınırı yaklaşık 380 nm. 350 nm ve 440 nm ışınları çizgide sınırın hangi tarafında kalır?",
  strategy: "İki dalga boyunu aynı ölçek üzerinde sınırla karşılaştır.",
  steps: [
    { label: "Sınırı bul", expression: "λ ≈ 380 nm", explanation: "Kesikli çizgi, bu karşılaştırmada kabul edilen yaklaşık mor ucudur.", figureTitle: ultravioletBoundaryTitle },
    { label: "350 nm’yi yerleştir", expression: "350 < 380", explanation: "350 nm sınırın solunda ve daha kısa dalga boylu. Modelde morötesi bölgede." },
    { label: "440 nm’yi yerleştir", expression: "440 > 380", explanation: "440 nm bu çizimdeki görünür bölgeye düşer. Sürgüde 440 nm seçip işaretin yerini kontrol et.", figureTitle: ultravioletBoundaryTitle },
  ],
  answer: "350 nm morötesi, 440 nm görünür bölgededir.",
  check: "350 nm’den 440 nm’ye geçince işaret soldan sağa, yaklaşık sınırın ötesine gider.",
  pitfall: "Mor renk görmen fotoğrafta bir UV dalga boyunun ölçüldüğü anlamına gelmez. Soruda verilen nm değerini ve ölçeği kullan.",
};
