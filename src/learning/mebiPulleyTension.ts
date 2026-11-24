import type { GuideSection, WorkedExample } from "./guides/types";

export const pulleyTensionTitle = "Kovaya su eklenince atma neden hızlanır?";
export const pulleyTensionWaterG = { min: 0, max: 300, step: 50, initial: 150 };
const bucketMassKg = 0.1;
const gravityMps2 = 10;
const linearDensityKgm = 0.01;
const timeS = 0.15;
const decimals = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });

export function pulleyTensionAt(waterG: number) {
  const totalMassKg = bucketMassKg + waterG / 1000;
  const tensionN = totalMassKg * gravityMps2;
  const speedMps = Math.sqrt(tensionN / linearDensityKgm);
  return { totalMassKg, tensionN, speedMps, travelledM: speedMps * timeS, widthM: speedMps * 0.08, timeS, waterFraction: waterG / pulleyTensionWaterG.max };
}

export const pulleyTensionSection: GuideSection = {
  title: pulleyTensionTitle,
  figureTitle: pulleyTensionTitle,
  paragraphs: [
    "Yayın sağ ucu makaradan geçen ipe bağlı. İpin ucundaki kova ipi çeker. İdeal makarayı ve kova durduktan sonraki durumu düşünürsek gerilme kuvveti, kova ile suyun toplam ağırlığına eşittir.",
    "Kovaya su ekle. Toplam kütle ve gerilme artıyor. Aynı yayın boyca kütle yoğunluğu bu örnekte 0,01 kg/m kabul ediliyor. Bu nedenle atma v = √(F / μ) bağıntısına göre daha hızlı ilerliyor.",
    "Yayı değiştirmeden kaynak daha sık titreşirse frekans değişir. Kaynak daha fazla yukarı kaldırılırsa genlik değişir. Bu iki ayar ideal modelde yayılma süratini değiştirmez.",
    "Sürtünmesiz ve özellikleri sabit bir ortamda aynı atma ilerlerken genliği, enerjisi ve sürati korunur. Su ekleme örneğinde gerilim değiştiği için iki farklı düzenek karşılaştırılıyor.",
  ],
  table: {
    layout: "table",
    headers: ["Kovadaki su", "Toplam kütle", "Gerilme", "Atmanın sürati"],
    rows: [0, 300].map((waterG) => {
      const state = pulleyTensionAt(waterG);
      return [`${waterG} g`, `${decimals.format(state.totalMassKg)} kg`, `${decimals.format(state.tensionN)} N`, `${decimals.format(state.speedMps)} m/s`];
    }),
  },
};

export const pulleyTensionExample: WorkedExample = {
  title: "Su ekleyince gerilmenin dört katına çıkması",
  prompt: "Boş kova 100 g. Sürtünmesiz makara, g = 10 m/s² ve μ = 0,01 kg/m. Kovaya 300 g su eklenince yayın gerilimi ve atmanın sürati nasıl değişir?",
  strategy: "Toplam kütleyle ağırlığı hesapla. Sürat için gerilmenin karekökünü karşılaştır.",
  steps: [
    { label: "Boş ve dolu kovayı karşılaştır", expression: "F₁ = 0,100 × 10 = 1 N. F₂ = 0,400 × 10 = 4 N.", explanation: "300 g su, kovanın kendi 100 g kütlesine eklenir." },
    { label: "Yeni yayılma süratini hesapla", expression: "√(1 / 0,01) = 10 m/s. √(4 / 0,01) = 20 m/s.", explanation: "Çizimde 0 g ile 300 g arasında geçiş yap. Atmanın aynı 0,15 s’de aldığı yol 1,5 m’den 3 m’ye çıkar.", figureTitle: pulleyTensionTitle },
  ],
  answer: "Gerilme 1 N’den 4 N’ye, atmanın sürati 10 m/s’den 20 m/s’ye çıkar.",
  check: "20 ÷ 10 = 2 ve √(4 ÷ 1) = 2.",
  pitfall: "Suyun ağırlığını tek başına alma. Kova da yayı geren kuvvete katkı yapar.",
};
