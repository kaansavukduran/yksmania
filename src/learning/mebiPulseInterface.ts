import { pulseProfile, stringState } from "./forge011Physics";
import type { GuideSection, WorkedExample } from "./guides/types";

export const lightHeavyTitle = "Hafiften ağıra geçişte iki ayrı atma oluşur";
export const heavyLightTitle = "Ağırdan hafife geçişte yansıma düzdür";

export const pulseInterfaceJoinM = 7;
const tensionN = 4;
const amplitudeM = 1.5;
const durationS = 1.2;
export const pulseInterfaceFrameTimes = [-2, 0, 2] as const;
const decimal = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });

export function pulseInterfaceAt(timeS: number, boundary: "heavy" | "light") {
  const mu = boundary === "heavy" ? 1 : 4;
  const state = stringState(tensionN, mu, boundary);
  const join = pulseInterfaceJoinM;
  const leftWidthM = state.speed1 * durationS;
  const rightWidthM = state.speed2 * durationS;
  const incomingCenterM = join + state.speed1 * timeS;
  const reflectedCenterM = join - state.speed1 * timeS;
  const transmittedCenterM = join + state.speed2 * timeS;
  const reflectedAmplitudeM = state.reflection * amplitudeM;
  const transmittedAmplitudeM = state.transmission * amplitudeM;
  const incoming = (x: number) => pulseProfile(x, incomingCenterM, leftWidthM, amplitudeM);
  const reflected = (x: number) => pulseProfile(x, reflectedCenterM, leftWidthM, reflectedAmplitudeM);
  const left = (x: number) => incoming(x) + reflected(x);
  const right = (x: number) => pulseProfile(x, transmittedCenterM, rightWidthM, transmittedAmplitudeM);
  return {
    ...state, mu, leftWidthM, rightWidthM, incomingCenterM, reflectedCenterM,
    transmittedCenterM, reflectedAmplitudeM, transmittedAmplitudeM, incoming,
    reflected, left, right, amplitudeM,
  };
}

const transitions = [["heavy", "İnce → kalın"], ["light", "Kalın → ince"]] as const;

export const pulseInterfaceTable: NonNullable<GuideSection["table"]> = {
  layout: "table",
  headers: ["Geçiş", "Yansıyan", "İlk yay", "İkinci yay", "İlk genişlik", "İletilen genişlik"],
  rows: transitions.map(([boundary, title]) => {
    const state = pulseInterfaceAt(pulseInterfaceFrameTimes[2], boundary);
    return [
      title,
      state.reflection < 0 ? "Çukur" : "Tepe",
      `${decimal.format(state.speed1)} m/s`,
      `${decimal.format(state.speed2)} m/s`,
      `${decimal.format(state.leftWidthM)} m`,
      `${decimal.format(state.rightWidthM)} m`,
    ];
  }),
};

export const pulseInterfaceExample: WorkedExample = {
  title: "İki yayın birleşiminde yön, sürat ve genişlik",
  prompt: "Aynı 4 N gerilimli iki yayda boyca kütle yoğunlukları 1 kg/m ve 4 kg/m. Tepe her iki yönden gönderiliyor. Yansıyanın şeklini ve iletilenin genişliğini karşılaştır.",
  strategy: "Önce her yayda v = √(F / μ) ile sürati bul. Yansıyan atma ilk yayda kalır. İletilen atma aynı biçim süresinde ikinci yayın süratiyle ilerler.",
  steps: [
    { label: "İnce yaydan kalın yaya bak", expression: "v₁ = 2 m/s, v₂ = 1 m/s ve 1 × 1,2 = 1,2 m", explanation: "İlk yayda geri giden atma çukurdur. Yansıyanın genişliği 2,4 m kalır. İkinci yaydaki tepe 1,2 m genişliğindedir.", figureTitle: lightHeavyTitle },
    { label: "Kalın yaydan ince yaya bak", expression: "v₁ = 1 m/s, v₂ = 2 m/s ve 2 × 1,2 = 2,4 m", explanation: "İlk yayı terk etmeyen yansıyan atma tepe olarak 1,2 m genişliğini korur. İkinci yaydaki tepe 2,4 m genişliğindedir.", figureTitle: heavyLightTitle },
  ],
  answer: "İnce yaydan kalına geçişte yansıyan çukur, iletilen daha dar tepedir. Kalından inceye geçişte yansıyan tepe, iletilen daha geniş tepedir.",
  check: "Yansıyan şekil hangi yaydaysa o yayın sürati ve atma genişliği üzerinden denetlenir.",
  pitfall: "Yansıyan ve iletilen atmalar için aynı sürati kullanma. İlk ve ikinci yayın boyca kütle yoğunluğuna ayrı bak.",
};
