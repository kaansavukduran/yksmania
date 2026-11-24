import type { GuideSection, WorkedExample } from "./guides/types";
import { liquidIntakeState, liquidLiftThresholdKPa } from "./mebiDoorSuction";

export const atomizerTitle = "Sprey şişesinde sıvı uca nasıl çıkar?";
export const atomizerExampleTitle = "Sıvı çıkışa ulaşıp damlacıklara ayrılır";
export const atomizerLiftHeightM = 0.15;
export const atomizerThresholdKPa = liquidLiftThresholdKPa(atomizerLiftHeightM);
export const atomizerState = (pressureDifferenceKPa: number) => liquidIntakeState(pressureDifferenceKPa, true, atomizerLiftHeightM);

export const atomizerSection: GuideSection = {
  title: atomizerTitle,
  figureTitle: atomizerTitle,
  paragraphs: [
    "Kauçuk hazne sıkışınca hava yatay kanaldan dışarı akar. Bu akış, sıvı borusunun ağzında uygun koşullarda düşük statik basınç oluşturabilir. Şişedeki sıvının yüzeyine atmosfer basıncı etki eder. İki basınç arasındaki fark, sıvıyı düşey boruda yukarı iter.",
    "Örnekte boru ağzı sıvı yüzeyinin 15 cm üstünde. Suyun yoğunluğu 1000 kg/m³, g = 10 m/s². Sıvıyı ağza kadar getirmek için 1,5 kPa fark gerekir. Aynı örnekte boru kaybını ve yüzey gerilimi eşiğini ihmal ediyoruz.",
    "Sıvı uca geldiğinde hava akımı onu damlacıklara ayırabilir. Çizim basınç farkından yükselmeyi gösterir. Gerçek damlacık boyutu ve püskürtme miktarı için hava hızı, çıkış biçimi ve sıvının özellikleri de gerekir.",
  ],
  table: {
    layout: "table",
    headers: ["Yüzey − ağız basınç farkı", "Düşey boru", "Sprey ucu"],
    rows: [["0 kPa", "Seviye yükselmez", "Püskürtme yok"], ["1 kPa", "10 cm yükselir", "Sıvı uca ulaşmaz"], ["1,5 kPa", "Seviye uçta", "Sürekli püskürtme yok"], ["2 kPa", "Uca sıvı akabilir", "Hava damlacık oluşturabilir"]],
  },
};

export const atomizerExample: WorkedExample = {
  title: "2 kPa fark, sıvıyı 15 cm yukarı itebilir mi?",
  prompt: "Hazne sıkılırken su yüzeyinin basıncı ile ucun statik basıncı arasındaki fark 2 kPa. Uç yüzeyin 15 cm üstünde. Su 1000 kg/m³, g = 10 m/s². Boru kaybını ve yüzey gerilimini ihmal et. Sıvı çıkışa ulaşır mı?",
  strategy: "Önce 15 cm yüksekliği taşıyacak basınç farkını bul. Sonra verilen farkla karşılaştır.",
  steps: [
    { label: "Yükseklik", expression: "15 cm = 0,15 m", explanation: "Düşey uzunluğu metreye çevir. Yatay hava borusunun uzunluğu burada kullanılmaz." },
    { label: "Yükselme eşiği", expression: "ρgh = 1000 × 10 × 0,15 = 1500 Pa = 1,5 kPa", explanation: "Bu fark su sütununu uca kadar getirir." },
    { label: "Püskürtme", expression: "2 kPa > 1,5 kPa", explanation: "Sıvı uca ilerleyebilir. Hava akımıyla karşılaştığında damlacıklara ayrılabilir.", figureTitle: atomizerExampleTitle },
  ],
  answer: "Evet. 2 kPa, 15 cm’lik su için gereken 1,5 kPa farkı aşıyor.",
  check: "1 kPa ile kayıpsız yükselme 10 cm olur. Uç 15 cm yukarıda kaldığı için o durumda sıvı çıkmaz.",
  pitfall: "Kauçuk hazne doğrudan sıvıya basmıyor. Hava akımı boru ucundaki basıncı değiştiriyor.",
};
