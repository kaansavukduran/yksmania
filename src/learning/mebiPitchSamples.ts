import type { GuideSection, WorkedExample } from "./guides/types";

export const animalPitchTitle = "Aslan ve kanarya sesinde iki ayrı ölçü";
export const animalPitchEqualTitle = "Eşit genlikte salınımları say";
export const pitchWindowMs = 10;
export const pitchCases = [
  { label: "Aslan", cycles: 1, initialAmplitude: 1 },
  { label: "Kanarya", cycles: 3, initialAmplitude: 0.55 },
] as const;
export const pitchStageLabels = ["Temsilî iki ses", "Genlikleri eşitle"] as const;

export function animalPitchAt(equalAmplitude: boolean) {
  return pitchCases.map(({ label, cycles, initialAmplitude }) => {
    const amplitude = equalAmplitude ? 0.8 : initialAmplitude;
    return {
      label, cycles, amplitude,
      frequencyHz: 1000 * cycles / pitchWindowMs,
      valueAt: (millisecond: number) => amplitude * Math.sin(2 * Math.PI * cycles * millisecond / pitchWindowMs),
    };
  });
}

export const animalPitchSection: GuideSection = {
  title: animalPitchTitle,
  figureTitle: animalPitchTitle,
  paragraphs: [
    "Aynı 10 milisaniyede bir çizginin bir tam salınımını, diğerinin üç tam salınımını say. Aynı süre içinde daha çok salınım daha yüksek frekans demektir. Kaynaktaki aslan ve kanarya örneğinin temsilî çizgileri bu farkı gösteriyor.",
    "Başlangıç çiziminde aslan örneğinin genliği daha büyük. Genlikleri eşitleyince tepe yükseklikleri eşitlenir, salınım sayıları kendi değerinde kalır. Grafikler fotoğraftaki hayvanlardan yapılmış ses ölçümleri yerine öğretim için seçilmiş örnek dalgalardır.",
    "Yatay eksen zamandır. Düşey değişim basınç farkını gösterir. Hava taneciğinin izlediği yol, grafikteki kıvrımlı çizgiden okunmaz.",
  ],
};

export const animalPitchExample: WorkedExample = {
  title: "Genlik eşitken hangi ses daha tiz?",
  prompt: "10 ms’de aslan örneği bir, kanarya örneği üç tam salınım yapıyor. Genlikleri eşit. Hangi çizimde frekans daha büyük?",
  strategy: "İki çizgiyi aynı süre penceresinde değerlendir. Bir saniyede kaçar salınım olacağını hesapla.",
  steps: [
    { label: "Zamanı saniye cinsinden yaz", explanation: "Bir milisaniye saniyenin binde biridir.", expression: "10 ms = 0,01 s", figureTitle: animalPitchEqualTitle },
    { label: "Salınımları aynı süreye böl", explanation: "Genlik eşitlendiğinde de çizgideki tam salınım sayıları 1 ve 3 kalır.", expression: "fₐ = 1/0,01 = 100 Hz. fₖ = 3/0,01 = 300 Hz.", figureTitle: animalPitchEqualTitle },
  ],
  answer: "Kanarya örneği daha tiz. Frekansı aslan örneğinin üç katı.",
  check: "İki frekansı 0,01 saniye ile çarptığında 1 ve 3 salınım geri çıkar.",
  pitfall: "Tepe yüksekliğine bakarak salınım sayısı hakkında karar verme.",
};
