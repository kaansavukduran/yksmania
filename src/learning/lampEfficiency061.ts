import type { GuideSection, WorkedExample } from "./guides/types";

export const lampEfficiencyTitle = "Aynı ışık çıkışı için farklı giriş";
export const usefulLightPower = 6;
export const filamentEfficiency = 0.1;

export function lampBudget(efficiency: number, useful = usefulLightPower) {
  const input = useful / efficiency;
  return { input, useful, other: input - useful, efficiency };
}

export const lampEfficiencySection: GuideSection = {
  title: lampEfficiencyTitle,
  figureTitle: lampEfficiencyTitle,
  paragraphs: [
    "Bir lambada yararlı çıktıyı bu örnek için görünür ışık gücü olarak seçelim. Lambanın aldığı toplam elektrik gücünün bir kısmı görünür ışığa, diğer kısmı ısı gibi başka biçimlere gider. Kararlı çalışırken aynı zaman aralığındaki güçleri bölebiliriz. Verim = yararlı güç / alınan güç.",
    "İki ideal örnek de 6 W görünür ışık veriyor. Flamanlı örneğin verimi %10, LED örneğinin verimi %25 kabul edildi. Elektrik girişleri 6 / 0,10 = 60 W ve 6 / 0,25 = 24 W. Bunlar örnek değerler. Farklı ürünlerde verim ve gözün algıladığı parlaklık farklı olabilir.",
    "İdeal hesapta yararlı çıktı toplam girişe eşitse verim %100 olur. Hesap %100’ü aşıyorsa sistemin dışarıdan aldığı başka enerjileri veya ölçülerin kapsamını kontrol et. Aynı çıkış için daha az giriş seçmek verimliliği artırır.",
  ],
  table: {
    headers: ["6 W görünür ışık", "Elektrik girişi", "Diğer çıkışlar", "Örnek verim"],
    rows: [["Flamanlı", "60 W", "54 W", "%10"], ["LED", "24 W", "18 W", "%25"]],
  },
};

export const lampEfficiencyExample: WorkedExample = {
  title: "Aynı görünür ışık, daha az elektrik girişi",
  prompt: "6 W görünür ışık çıkışı için iki örnek lambanın verimleri %10 ve %25. İkinci lambanın elektrik girişi ve diğer biçimlere giden enerji akışı kaç watt?",
  strategy: "Verimi ondalık yaz ve yararlı çıkışı verime böl. Sonra yararlı çıkışı toplam girişten çıkar.",
  steps: [
    { label: "Elektrik girişi", expression: "6 W / 0,25 = 24 W", explanation: "6 W toplam girişin dörtte biri. Çizimde iki lambanın aynı yararlı çıkışını karşılaştır.", figureTitle: lampEfficiencyTitle },
    { label: "Diğer çıkışlar", expression: "24 W − 6 W = 18 W", explanation: "24 W girişin 6 W’ı görünür ışık. Diğer biçimlere 18 W gider." },
  ],
  answer: "24 W elektrik girişi ve 18 W diğer enerji çıkışı.",
  check: "6 / 24 = 1/4, yani %25. 6 + 18 = 24 W.",
  pitfall: "6 W’ı verimle çarpmak, toplam girişi yararlı çıkıştan küçük çıkarır.",
};
