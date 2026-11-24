import type { GuideSection, WorkedExample } from "./guides/types";

export const waterRefractionTitle = "Kırılma açısını normalden denetle";
export const refractionAngle = { min: 0, max: 30, step: 5, initial: 20 };
export const refractionStages = ["Sınıra gelmeden", "O noktası sınırda", "Derin bölgeye geçince"] as const;
export const refractionCaseTitles = ["O sınırdayken K ve L", "Sığ bölümün tepe aralığı", "Derin bölümün tepe aralığı"] as const;
const halfHeight = 3.4;
const shallowSpeed = 8;
const deepSpeed = 12;
const frequencyHz = 4;
const radiansPerDegree = Math.PI / 180;
type Point = readonly [number, number];

export function waterRefractionAt(incidentDegrees: number, stage: number) {
  const incident = incidentDegrees * radiansPerDegree;
  const refracted = Math.asin(deepSpeed / shallowSpeed * Math.sin(incident));
  const offset = halfHeight * Math.sin(incident) + 0.52;
  const elapsed = stage === 0 ? -offset / shallowSpeed : stage === 2 ? offset / shallowSpeed : 0;
  const frontX = (height: number, radians: number, speed: number) =>
    (speed * elapsed + height * Math.sin(radians)) / Math.cos(radians);
  const incomingAt = (height: number): Point => [frontX(height, incident, shallowSpeed), height];
  const transmittedAt = (height: number): Point => [frontX(height, refracted, deepSpeed), height];
  const K = stage === 0 ? incomingAt(halfHeight) : transmittedAt(halfHeight);
  const L = stage === 2 ? transmittedAt(-halfHeight) : incomingAt(-halfHeight);
  const O: Point = [0, 0];
  const incoming: readonly Point[] = stage === 0 ? [L, K] : stage === 1 ? [L, O] : [];
  const transmitted: readonly Point[] = stage === 2 ? [L, K] : stage === 1 ? [O, K] : [];
  return {
    K, L, O, incoming, transmitted,
    incidentDegrees, refractedDegrees: refracted / radiansPerDegree, frequencyHz,
    shallowSpeed, deepSpeed, shallowWavelength: shallowSpeed / frequencyHz, deepWavelength: deepSpeed / frequencyHz,
    incidentDirection: [Math.cos(incident), -Math.sin(incident)] as const,
    transmittedDirection: [Math.cos(refracted), -Math.sin(refracted)] as const,
  };
}

export const waterRefractionSection: GuideSection = {
  title: waterRefractionTitle,
  figureTitle: waterRefractionTitle,
  paragraphs: [
    "K ve L, düz dalga cephesinin uçlarını gösteriyor. Eğik cephede önce K tarafı derine girer. O noktası sınırdayken OK bölümü daha hızlı yol alır. Dalganın kalan kısmı sığ sudan geçmeyi sürdürür. Tümü geçince cephe yeni doğrultuda ilerler.",
    "Cephe ile sınır arasındaki açı, ilerleme oku ile sınırın normali arasındaki açıyla aynıdır. İki çift doğru da kendi içinde diktir. Sığdan derine giderken sürat ve dalga boyu artar, kaynak frekansı aynı kalır.",
    "Sınır doğrultusunda ardışık iki tepenin izi iki tarafta eşleşir. Eğik gelişte bu eşleşmeden sin i / sin r = vₛığ / vderin çıkar. Dik gelişte i ve r sıfırdır. Cephe dönmeden geçer, sürat ile tepe aralığı yine değişir.",
  ],
};

export const waterRefractionExample: WorkedExample = {
  title: "KOL cephesinde hangi kısım öne geçer?",
  prompt: "Düz su cephesi sığda 8 cm/s, derinde 12 cm/s ilerliyor. Kaynak 4 Hz. O sınırdayken K tarafı derine geçmiş. Hangi taraf öne geçer ve tepe aralıkları kaç santimetredir?",
  strategy: "Daha hızlı hareket eden kısmı şekilde bul. İki bölgede de aynı kaynağın 4 Hz frekansını kullan.",
  steps: [
    { label: "K tarafını izle", explanation: "K derin tarafta ilerlerken L sığda kalır. Aynı sürede OK tarafı daha çok yol alır.", figureTitle: refractionCaseTitles[0] },
    { label: "Sığ aralığı bul", explanation: "Sığ bölgede 8 cm/s olan sürati 4 Hz’e böl.", expression: "λsığ = 8/4 = 2 cm", figureTitle: refractionCaseTitles[1] },
    { label: "Derin aralığı bul", explanation: "Derindeki 12 cm/s sürati aynı 4 Hz frekansına böl.", expression: "λderin = 12/4 = 3 cm", figureTitle: refractionCaseTitles[2] },
  ],
  answer: "K tarafı öne geçer. Tepeler sığda 2 cm, derinde 3 cm aralıklı.",
  check: "3/2 dalga boyu oranı, 12/8 sürat oranına eşit.",
  pitfall: "Önce derine giren K tarafı nedeniyle kaynağın frekansı değişmez.",
};
