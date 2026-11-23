import type { GuideSection, WorkedExample } from "./guides/types";

export const railEnergyTitle = "Rayda iki duruş arasındaki enerji";
export const railMass = 2;
export const railGravity = 10;

export function railEnergyAt(baseHeight: number) {
  const energyUnit = railMass * railGravity * baseHeight;
  return [
    { point: "A", level: 3, mechanical: 3 * energyUnit, dissipated: 0 },
    { point: "D", level: 1, mechanical: energyUnit, dissipated: 2 * energyUnit },
    { point: "C", level: 0, mechanical: 0, dissipated: 3 * energyUnit },
  ] as const;
}

export const railEnergySection: GuideSection = {
  title: railEnergyTitle,
  figureTitle: railEnergyTitle,
  paragraphs: [
    "Bir cisim sürtünmeli rayın A noktasında durgun bırakılıyor. Başlangıç yüksekliği 3h. Önce C’den geçiyor ve karşı yamaçta h yüksekliğindeki D noktasına çıkıyor. D’de yön değiştirirken hızı bir an sıfır. Sonra geri dönüp C’de duruyor. Şekilde A ile eş yükseklikteki E noktasına ulaşmıyor.",
    "C’yi sıfır düzeyi al. A, D ve son C anlarında hız sıfır olduğu için mekanik enerji yalnız yerçekimi potansiyel enerjisidir. E₀ = mgh dersek sırayla 3E₀, E₀ ve 0 kalır. A’dan D’ye geçerken 2E₀, D’den son C’ye dönerken E₀ başka enerji biçimlerine geçer.",
    "C’den ilk geçişte cisim hareket eder. İlk geçiş ile son duruş farklı anlardır. İlk A–C yolundaki kayıp verilmemişse C’deki ilk kinetik enerji ayrı ayrı hesaplanamaz. Sürtünmenin yaptığı iş negatif, ısıl enerjiye aktarılan miktar pozitiftir.",
  ],
  table: {
    headers: ["An", "Yerçekimi potansiyeli", "Kinetik enerji", "Başlangıçtan beri aktarılan"],
    rows: [["A · Bırakma", "3E₀", "0", "0"], ["D · Dönüş", "E₀", "0", "2E₀"], ["C · Son duruş", "0", "0", "3E₀"]],
  },
};

export const railEnergyExample: WorkedExample = {
  title: "C’den geçmek ile C’de durmak",
  prompt: "Sürtünmeli rayda 2 kg cisim 4,5 m yükseklikteki A’dan durgun bırakılıyor. 1,5 m yükseklikteki D’de dönüyor ve sıfır düzeyindeki C’de duruyor. g = 10 N/kg. D’ye kadar ve D’den sonraki enerji aktarımlarını bul.",
  strategy: "Verilen üç duruş anındaki potansiyelleri karşılaştır. İlk C geçişini son duruşla karıştırma.",
  steps: [
    { label: "A’dan D’ye", expression: "90 J − 30 J = 60 J", explanation: "İki uçta da hız sıfır. Başlangıç ile dönüş arasındaki mekanik azalma 60 J.", figureTitle: railEnergyTitle },
    { label: "D’den son C’ye", expression: "30 J − 0 J = 30 J", explanation: "Son duruş yer referansında ve hızı sıfır. Başlangıçtan beri toplam 90 J aktarılmış." },
  ],
  answer: "A’dan D’ye 60 J, D’den son C’ye 30 J aktarılır.",
  check: "60 + 30 = 90 J. İlk C geçişindeki kinetik enerji için o ana kadarki kayıp bilgisi gerekir.",
  pitfall: "Son C duruşundan ilk C geçişinde de hızın sıfır olduğu sonucunu çıkarma.",
};
