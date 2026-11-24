import { pulseProfile } from "./forge011Physics";
import type { GuideSection, WorkedExample } from "./guides/types";

export const pulseOverlapTitle = "Üst üste binmede işaretli toplam al";
export const pulseOverlapTime = { min: 0, max: 3, step: 0.5, initial: 0, contact: 1.5 };
export const pulseOverlapCases = [
  { label: "İki tepe", leftCm: 4, rightCm: 3, type: "tepe" },
  { label: "Tepe ve büyük çukur", leftCm: 4, rightCm: -7, type: "çukur" },
  { label: "Eşit tepe ve çukur", leftCm: 4, rightCm: -4, type: "düz görünüm" },
] as const;
const widthM = 3;
const speedMps = 2;
const joinM = 6;
const formatter = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });
const signed = (value: number) => value > 0 ? `+${formatter.format(value)}` : formatter.format(value).replace("-", "−");

export function pulseOverlapAt(timeS: number, selected: number) {
  const scenario = pulseOverlapCases[selected] ?? pulseOverlapCases[0];
  const kCenter = 3 + speedMps * timeS;
  const lCenter = 9 - speedMps * timeS;
  const k = (x: number) => pulseProfile(x, kCenter, widthM, scenario.leftCm);
  const l = (x: number) => pulseProfile(x, lCenter, widthM, scenario.rightCm);
  const total = (x: number) => k(x) + l(x);
  return { scenario, k, l, total, kCenter, lCenter, joinM, widthM, speedMps, joinDisplacementCm: total(joinM) };
}

export const pulseOverlapTable: NonNullable<GuideSection["table"]> = {
  layout: "table",
  headers: ["Tam karşılaşma", "K", "L", "O’daki toplam"],
  rows: pulseOverlapCases.map((scenario, index) => {
    const state = pulseOverlapAt(pulseOverlapTime.contact, index);
    return [scenario.label, `${signed(scenario.leftCm)} cm`, `${signed(scenario.rightCm)} cm`, `${signed(state.joinDisplacementCm)} cm`];
  }),
};

export const pulseOverlapExample: WorkedExample = {
  title: "Karşılaşma anında benzer ve karşıt uzanımlar",
  prompt: "K tepesi +4 cm. Aynı genişlikteki L önce +3 cm tepe, sonra −7 cm çukur, son olarak −4 cm çukur. Tam karşılaşmada O noktasında ne gözlenir?",
  strategy: "Her durumda denge çizgisine göre iki uzanımı işaretleriyle topla. Ardından aynı atmaların nasıl ayrıldığını izle.",
  steps: [
    { label: "İki tepenin buluşması", expression: "+4 + (+3) = +7 cm", explanation: "İki uzanım da yukarı. Çizimde İki tepe seçimini ve 1,5 saniyeyi kullan.", figureTitle: pulseOverlapTitle },
    { label: "Daha büyük çukurun buluşması", expression: "+4 + (−7) = −3 cm", explanation: "Aşağı yönlü katkı daha büyük. 1,5 saniyede çukur biçimini incele.", figureTitle: pulseOverlapTitle },
    { label: "Eş büyüklükte karşıt uzanımların buluşması", expression: "+4 + (−4) = 0 cm", explanation: "Tam karşılaşmada yay düz görünür. Son anda K sağa, L sola gider ve biçimleri yeniden ayrı görülür.", figureTitle: pulseOverlapTitle },
  ],
  answer: "Sırasıyla +7 cm tepe, −3 cm çukur, sonra 0 cm. Atmalar karşılaşmadan sonra ilk yönlerinde ilerler.",
  check: "Soldaki K sağa, sağdaki L sola başlar. Ayrıldıklarında konumları yer değiştirmiş olur.",
  pitfall: "Tam karşılaşmadaki toplamı genliklerin mutlak değerlerini toplayarak hesaplama.",
};
