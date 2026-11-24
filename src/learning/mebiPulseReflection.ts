import type { WorkedExample } from "./guides/types";
import { pulseAmplitude, pulseProfileAt, pulseSpeedMps, pulseWidthM } from "./mebiSpringPulse";

export const reflectionEndM = 9;
const startCenterM = 4.5;
const contactS = (reflectionEndM - startCenterM) / pulseSpeedMps;
export const reflectionFrameTimes = [0, contactS, 2 * contactS] as const;

export function reflectingPulseAt(timeS: number, boundary: "fixed" | "free") {
  const incomingCenterM = startCenterM + pulseSpeedMps * timeS;
  const reflectedCenterM = 2 * reflectionEndM - incomingCenterM;
  const sign = boundary === "fixed" ? -1 : 1;
  const incoming = (x: number) => pulseProfileAt(x - incomingCenterM + pulseWidthM / 2);
  const reflected = (x: number) => sign * incoming(2 * reflectionEndM - x);
  const height = (x: number) => incoming(x) + reflected(x);
  return {
    incomingCenterM,
    reflectedCenterM,
    incoming,
    reflected,
    height,
    endpoint: height(reflectionEndM),
    amplitudeM: pulseAmplitude,
    speedMps: pulseSpeedMps,
    widthM: pulseWidthM,
  };
}

export const fixedReflectionTitle = "Sabit uç neden ters yansıtır?";
export const freeReflectionTitle = "Serbest uç yer değiştirebilir";

export const pulseReflectionExample: WorkedExample = {
  title: "Uçta toplam uzanım ve ayrılmış atma",
  prompt: "Genliği 1,25 m olan ideal bir tepe sağa gidiyor. Sabit ve serbest uçlarda tepe merkezi uca geldiği anda uç ne kadar yer değiştirir? Ayrılan atma hangi biçimde ve yönde ilerler?",
  strategy: "Uçtaki geçici toplamı, uca uzaklaşan tek atmanın genliğinden ayrı değerlendir.",
  steps: [
    { label: "Sabit ucu incele", expression: "1,25 − 1,25 = 0 m", explanation: "Gelen tepe ve yansıyan çukurun uzanımları birbirini götürür. Sınır hareket edemez. Çizimde orta aşamayı aç.", figureTitle: fixedReflectionTitle },
    { label: "Serbest ucu incele", expression: "1,25 + 1,25 = 2,50 m", explanation: "Serbest halka, üst üste binme anında iki katkıyla yükselir. Son aşamada sola giden tek tepenin genliği yine 1,25 m olur.", figureTitle: freeReflectionTitle },
  ],
  answer: "Sabit uç 0 m, serbest uç 2,50 m. Ayrılan atma sabit uçtan çukur, serbest uçtan tepe olarak sola gider.",
  check: "Ayrılan atmaların genlik büyüklüğü, sürati ve genişliği ideal modelde korunur.",
  pitfall: "Serbest uçtaki geçici 2,50 m uzanımını ayrılan tepenin genliği olarak kullanma.",
};
