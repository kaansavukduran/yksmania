import type { GuideSection, WorkedExample } from "./guides/types";
import { pulseAmplitude, pulseProfileAt, pulseSpeedMps, pulseWidthM } from "./mebiSpringPulse";

export const pulseDirectionTitle = "Atmanın önü ve arkası hangi yöne titreşir?";
export const pulseDirectionCases = [
  { label: "Tepe sağa", heightSign: 1, direction: 1 },
  { label: "Çukur sağa", heightSign: -1, direction: 1 },
  { label: "Tepe sola", heightSign: 1, direction: -1 },
  { label: "Çukur sola", heightSign: -1, direction: -1 },
] as const;

export function pulseDirectionAt(index: number) {
  const selected = pulseDirectionCases[index] ?? pulseDirectionCases[0];
  const left = 2.5;
  const right = left + pulseWidthM;
  const height = (x: number) => selected.heightSign * pulseProfileAt(x - left);
  const point = (x: number) => {
    const derivative = selected.heightSign * pulseAmplitude * Math.PI / pulseWidthM * Math.sin(2 * Math.PI * (x - left) / pulseWidthM);
    return { x, y: height(x), verticalVelocity: -selected.direction * pulseSpeedMps * derivative };
  };
  const leftPoint = left + pulseWidthM / 4;
  const rightPoint = right - pulseWidthM / 4;
  const front = point(selected.direction === 1 ? rightPoint : leftPoint);
  const rear = point(selected.direction === 1 ? leftPoint : rightPoint);
  return { ...selected, left, right, height, front, rear };
}

export function verticalDirection(velocity: number) {
  return velocity > 0 ? "yukarı" : "aşağı";
}

export const pulseDirectionSection: GuideSection = {
  title: pulseDirectionTitle,
  figureTitle: pulseDirectionTitle,
  paragraphs: [
    "Atmanın önü ilerlediği tarafta, arkası bıraktığı tarafta. Sağa giden bir atmada ön sağda. Sola giden bir atmada ön solda. İleri giden desen boyunca her yay noktası kendi yerinde düşey titreşir.",
    "Öndeki nokta biçim ona yaklaşırken denge çizgisinden uzaklaşır. Arkadaki nokta biçim onu geçtikten sonra denge çizgisine yaklaşır. Üstteki tepede bu, ön için yukarı ve arka için aşağı demektir. Alttaki çukurda iki düşey yön ters olur.",
    "Tepeye veya çukurun dibine tam denk gelen bir noktanın düşey hızı o anda sıfırdır. Karşılaştırmalı oklar atmanın eğimli iki yanında gösterilir.",
  ],
  table: {
    layout: "table",
    headers: ["Atma", "Ön nokta", "Arka nokta"],
    rows: pulseDirectionCases.map(({ label }, index) => {
      const { front, rear } = pulseDirectionAt(index);
      return [label, verticalDirection(front.verticalVelocity), verticalDirection(rear.verticalVelocity)];
    }),
  },
};

export const pulseDirectionExample: WorkedExample = {
  title: "Sola giden çukurda P ve K’nın hareketi",
  prompt: "Çukur biçimli atma sola ilerliyor. P ön eğimde, K arka eğimde. P ve K o anda hangi yöne hareket ediyor?",
  strategy: "İlerleme okuyla önü belirle. Sonra her noktanın denge çizgisine yaklaşıp yaklaşmadığını düşün.",
  steps: [
    { label: "Önü ve arkayı bul", expression: "← ilerleme", explanation: "Sola giden atmada sol eğim ön, sağ eğim arka. Çizimde Çukur sola seçeneğini aç.", figureTitle: pulseDirectionTitle },
    { label: "Düşey yönleri oku", expression: "P aşağı, K yukarı", explanation: "Çukur denge çizgisinin altında. P uzaklaşırken aşağı, K dengeye yaklaşırken yukarı gider." },
  ],
  answer: "Öndeki P aşağı, arkadaki K yukarı hareket eder.",
  check: "P’nin denge çizgisine uzaklığı artar. K’nınki azalır. İlerleme oku sola kalır.",
  pitfall: "Önü sola bakarak bulduktan sonra noktanın hareketini düşey okla oku.",
};
