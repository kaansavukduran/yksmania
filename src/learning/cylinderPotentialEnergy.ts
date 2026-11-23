import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export const cylinderPotentialTitle = "Silindirin kütle merkezinden potansiyel enerji";
export const cylinderMass = 4;
export const platformHeight = 1;
const localGravity = 10;

export function cylinderPotentialAt(height: number, baseHeight: number, reference: number) {
  const centerAboveGround = baseHeight + height / 2;
  const referenceHeight = centerAboveGround - reference;
  return { centerAboveGround, referenceHeight, potential: cylinderMass * localGravity * referenceHeight };
}

export const cylinderPotentialSection: GuideSection = {
  title: cylinderPotentialTitle,
  figureTitle: cylinderPotentialTitle,
  paragraphs: [
    "Dik duran homojen bir silindirin kütlesi, simetri nedeniyle yüksekliğinin yarısında dengelenir. Silindirin tabanı yerden b kadar yukarıdaysa kütle merkezi yerden b + H/2 yüksektedir. Yere göre potansiyel enerjiyi bulmak için bu yüksekliği kullan. H, silindirin kendi yüksekliğidir.",
    "4 kg kütleli, 2 m yüksekliğinde silindirin kütle merkezi yerdeyken 1 m’dedir. Silindir biçimini değiştirmeden 1 m yüksekliğindeki platforma konulunca merkezi 2 m’ye çıkar. g = 10 N/kg ile yere göre enerjiler 40 J ve 80 J olur. Sıfırı platforma taşırsan aynı iki enerji 0 J ve 40 J olur. Fiziksel fark iki ölçümde de 40 J.",
  ],
  table: {
    headers: ["Sıfır düzeyi", "Başlangıçtaki enerji (J)", "Platformdaki enerji (J)", "Artış (J)"],
    rows: [["Yer", "40", "80", "40"], ["Platform", "0", "40", "40"]],
  },
};

export const cylinderPotentialExample: WorkedExample = {
  title: "Yüksekliğin tamamı mı, yarısı mı?",
  prompt: "4 kg kütleli, 2 m yüksekliğindeki homojen silindir dik duruyor. Yerden 1 m yüksekliğindeki platforma alınıyor. g = 10 N/kg. Sıfır düzeyini önce yer, sonra platform seç. Enerji artışı değişir mi?",
  strategy: "Önce kütle merkezinin her iki durumdaki yerden yüksekliğini bul. Sonra seçilen sıfırın yüksekliğini ikisinden de çıkar.",
  steps: [
    { label: "Kütle merkezi", expression: "h₁ = 2/2 = 1 m · h₂ = 1 + 2/2 = 2 m", explanation: "Platform silindirin her noktasını 1 m yukarı taşır." },
    { label: "Sıfır düzeyi", expression: "Yer: 80 − 40 = 40 J · Platform: 40 − 0 = 40 J", explanation: "Sıfır düzeyi değiştiğinde iki enerjiye aynı miktarda düzeltme yapılır. Çizimde üçüncü görünüme geçip karşılaştır.", figureTitle: cylinderPotentialTitle },
  ],
  answer: "İki sıfır düzeyinde de potansiyel enerji artışı 40 J.",
  check: "Kütle merkezi iki durumda 1 m yükseldi. ΔU = 4 × 10 × 1 = 40 J.",
  pitfall: "Silindirin üst kenarını kütle merkezi saymak tek tek potansiyel enerji değerlerini yanlış verir.",
};


export function withCylinderPotential(guide: LessonGuide): LessonGuide {
  return {
    ...guide,
    sections: [...guide.sections, cylinderPotentialSection],
    examples: [...guide.examples, cylinderPotentialExample],
    source: `${guide.source} Homojen silindir ve kütle merkezi MEBİ TYT Fizik Konu Özetleri fiziksel 50, basılı 48. sayfayla karşılaştırıldı. Sayısal örnek özgündür.`,
  };
}
