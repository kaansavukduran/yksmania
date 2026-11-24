import type { GuideSection, WorkedExample } from "./guides/types";

export const doorPressureTitle = "Kapıda iç ve dış basıncı karşılaştır";
export const liquidSuctionTitle = "Bir sıvı dar boruya ne zaman yükselir?";
export const liquidSuctionExampleTitle = "Musluk açıkken sıvının yükselişi";

export function doorPressureState(innerMinusOuter: number) {
  return {
    innerPressure: 100_000,
    outerPressure: 100_000 - innerMinusOuter,
    outwardForce: 0.5 * innerMinusOuter,
  };
}

export const intakeHeightM = 0.3;
const density = 1000;
const gravity = 10;
export const intakeThresholdKPa = intakeHeightM * density * gravity / 1000;

export function liquidIntakeState(dropKPa: number, valveOpen: boolean) {
  const riseM = valveOpen ? dropKPa * 1000 / (density * gravity) : 0;
  return { riseM, reachedInlet: valveOpen && dropKPa >= intakeThresholdKPa, canEnter: valveOpen && dropKPa > intakeThresholdKPa };
}

export const doorPressureSection: GuideSection = {
  title: doorPressureTitle,
  figureTitle: doorPressureTitle,
  paragraphs: [
    "Bir kapı kanadının iki yüzüne de hava basıncı etki eder. Oda basıncı dışarıdakinden büyükse net basınç kuvveti dışarıya yönelir. Dış basınç daha büyükse yön içeri döner. Eşit basınçlar bu modelde birbirini dengeler.",
    "Rüzgâr, binanın farklı yüzeylerinde farklı basınçlar oluşturabilir. Kapının kapanması veya açılması, basınç farkının yanında menteşenin ve kanadın konumuyla ilgilidir. Sadece dışarıda rüzgâr var diye kapının yönünü kesin söyleyemeyiz.",
    "Çizimde 0,5 m² kapı alanı kullanıyoruz. Kuvvetin büyüklüğü, iki taraftaki basınç farkının büyüklüğü ile alanın çarpımıdır.",
  ],
};

export const liquidSuctionSection: GuideSection = {
  title: liquidSuctionTitle,
  figureTitle: liquidSuctionTitle,
  paragraphs: [
    "Akan su borunun dar kesitinde hızlanır. Uygun akış koşullarında dar kesitin statik basıncı düşebilir. Kaynak örneğinde bu kesite, bir depodaki katkı sıvısını taşıyan yan boru bağlanır.",
    "Depo yüzeyi basıncıyla dar kesit basıncı arasındaki farkı kontrol et. Katkı sıvısını h kadar yükseltmek için en az ρgh kadar basınç farkı gerekir. Musluk kapalıysa sıvı ana boruya geçmez. Açık musluk ve yeterli fark varsa sıvı dar kesite doğru ilerleyebilir.",
    "Modelde yükselme yüksekliği 0,30 m, katkı sıvısı yoğunluğu 1000 kg/m³. Kayıp ihmal ediliyor. Eşiğe tam ulaşıldığında sıvı seviyesinin boru girişine kadar çıkması, sürekli akış olduğu anlamına gelmez.",
  ],
  table: {
    layout: "table",
    headers: ["Musluk", "Basınç farkı", "Katkı sıvısı"],
    rows: [
      ["Kapalı", "Her değer", "Ana boruya geçmez"],
      ["Açık", "3 kPa’dan az", "Boru girişine ulaşmaz"],
      ["Açık", "3 kPa", "Seviye girişte dengelenir"],
      ["Açık", "3 kPa’dan fazla", "Ana boruya geçebilir"],
    ],
  },
};

export const liquidSuctionExample: WorkedExample = {
  title: "4 kPa basınç farkı katkı sıvısını boruya taşır mı?",
  prompt: "Musluk açık. Depo yüzeyi 100 kPa, dar kesit 96 kPa. Katkı sıvısı 0,30 m yükselecek. Yoğunluğu 1000 kg/m³, g = 10 m/s². Kayıpları ihmal et. Sıvı dar kesite geçebilir mi?",
  strategy: "Var olan basınç farkını bul. Ardından 0,30 m’lik sıvı yüksekliği için gereken basınç farkını hesapla.",
  steps: [
    { label: "Mevcut fark", expression: "100 − 96 = 4 kPa", explanation: "Depo yüzeyi daha yüksek basınçta. Bu fark sıvıyı dar kesite doğru itebilir." },
    { label: "Eşik", expression: "ρgh = 1000 × 10 × 0,30 = 3000 Pa = 3 kPa", explanation: "Bu, kayıpsız durumda sıvının boru girişine ulaşması için gereken farktır." },
    { label: "Geçiş", expression: "4 kPa > 3 kPa", explanation: "Musluk açık ve fark eşikten büyük. Bu modelde katkı sıvısı ana boruya geçebilir.", figureTitle: liquidSuctionExampleTitle },
  ],
  answer: "Evet. Açık muslukta 4 kPa fark, 3 kPa eşiğini aşıyor.",
  check: "Musluk kapalı olsaydı basınç farkı aynı kalsa da sıvı ana boruya geçmezdi.",
  pitfall: "4 kPa’yı 4 Pa kullanma. Hem musluk koşulunu hem basınç farkını kontrol et.",
};
