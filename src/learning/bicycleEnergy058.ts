import type { GuideSection, WorkedExample } from "./guides/types";

export const bicycleEnergyTitle = "Aynı yüksekliğe daha yavaş dönmek";
export const bicycleEnergyPoints = [
  { name: "A", speed: 4, x: 0, displayHeight: 0 },
  { name: "B", speed: 3, x: 2, displayHeight: 1.4 },
  { name: "C", speed: 1, x: 4, displayHeight: 3.6 },
  { name: "D", speed: 2, x: 6, displayHeight: 1.65 },
  { name: "E", speed: 3, x: 8, displayHeight: 0 },
] as const;

export const kineticUnits = (speedInV: number) => speedInV ** 2;
const lossUnits = kineticUnits(bicycleEnergyPoints[0].speed) - kineticUnits(bicycleEnergyPoints[4].speed);

export const bicycleEnergySection: GuideSection = {
  title: bicycleEnergyTitle,
  figureTitle: bicycleEnergyTitle,
  paragraphs: [
    "Bir bisikletli pedal çevirmeden A noktasından tepeye giriyor. A ve E aynı yükseklikte. A’da hızın büyüklüğü 4v, E’de 3v. Bisikletliyi ve bisikleti tek bir kütle gibi modelleyelim. Kinetik enerji hızın karesiyle değiştiğinden A’da 16E₀, E’de 9E₀ olur. Burada E₀ = mv²/2.",
    "A ve E’nin yerçekimi potansiyel enerjileri eşit. Bu yüzden bisikletli ile bisikletin mekanik enerjisi 7E₀ azaldı. Yol ile havayı sisteme kattığında, başka enerji girişi ve çıkışı yoksa bu azalma ısı gibi başka enerji biçimlerine karşılık gelir. Mekanik enerji azalırken toplam enerji korunabilir.",
    "B, C ve D için çizimdeki hızlardan kinetik enerjiyi bulabilirsin. Tam yükseklikler sayıyla verilmediği için bu üç noktanın potansiyel enerjisini çizimden ölçerek hesaplama. Çizim yalnız yer seviyesini, tırmanışı ve inişi gösterir.",
  ],
  table: {
    headers: ["Nokta", "Hız büyüklüğü", "Kinetik enerji", "Yere göre konum"],
    rows: bicycleEnergyPoints.map(({ name, speed, displayHeight }) => [
      name, `${speed === 1 ? "" : speed}v`, `${kineticUnits(speed)} E₀`,
      displayHeight === 0 ? "Yer düzeyi" : name === "C" ? "Tepe" : "Yer düzeyinin üstü",
    ]),
  },
};

export const bicycleEnergyExample: WorkedExample = {
  title: "A ve E arasında mekanik enerji ne kadar azalır?",
  prompt: "Bisikletli A’da 4v, aynı yükseklikteki E’de 3v hızla ilerliyor. E₀ = mv²/2 al. Mekanik enerji değişimini E₀ cinsinden bul.",
  strategy: "İlk ve son konum eş yükseklikte. Potansiyel enerji farkını sıfır al ve kinetik enerjileri ayrı hesapla.",
  steps: [
    { label: "Hızın karesi", expression: "K_A = 16E₀ · K_E = 9E₀", explanation: "3v için katsayı 3 değil 3² = 9’dur.", figureTitle: bicycleEnergyTitle },
    { label: "Son eksi ilk", expression: `ΔE_mek = (9 − 16)E₀ = −${lossUnits}E₀`, explanation: "Negatif işaret mekanik enerjinin azaldığını gösterir. Potansiyel enerji değişimi sıfır." },
  ],
  answer: "Bisikletlinin mekanik enerjisi 7E₀ azalır.",
  check: "(16 − 9)mv²/2 = 7mv²/2. Bu azalma, kapalı toplam enerji hesabında başka enerji biçimlerine gider.",
  pitfall: "Yolun iki ucunda potansiyel enerji eşitken mekanik enerjiyi otomatik olarak eşit sayma.",
};
