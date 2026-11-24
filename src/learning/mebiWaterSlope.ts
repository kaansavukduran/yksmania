import type { GuideSection, WorkedExample } from "./guides/types";
import { sourceFrequencyHz, tankLengthCm } from "./mebiWaterDepth";

export const waterSlopeTitle = "Eğimli tabanda tepe aralığı adım adım açılır";
export const waterSlopeRatio = { min: 1, max: 4, step: 1, initial: 4 };
export const waterSlopePhase = [0, 1 / (2 * sourceFrequencyHz)] as const;
const entrySpeedCmS = 6;
const periodS = 1 / sourceFrequencyHz;

export function waterSlopeAt(exitDepthRatio: number, timeS: number) {
  const gradient = (exitDepthRatio - 1) / tankLengthCm;
  const depthRatioAt = (x: number) => 1 + gradient * x;
  const speedAt = (x: number) => entrySpeedCmS * Math.sqrt(depthRatioAt(x));
  // Integrate 1/v over a linearly deepening bottom, in a form that is also valid when the bottom is flat.
  const travelAt = (x: number) => 2 * x / (entrySpeedCmS + speedAt(x));
  const xAtTravel = (age: number) => {
    const flatDistance = entrySpeedCmS * age;
    return flatDistance + gradient * flatDistance ** 2 / 4;
  };
  const total = travelAt(tankLengthCm);
  const positionsAt = (time: number) => {
    const oldest = Math.ceil((time - total) / periodS - 1e-9);
    const newest = Math.floor(time / periodS + 1e-9);
    return Array.from({ length: newest - oldest + 1 }, (_, index) => (
      xAtTravel(Math.min(total, Math.max(0, time - (newest - index) * periodS)))
    ));
  };
  return {
    speedAt, depthRatioAt, travelAt, periodS,
    heightAt: (x: number) => Math.cos(2 * Math.PI * sourceFrequencyHz * (timeS - travelAt(x))),
    crests: positionsAt(timeS),
    troughs: positionsAt(timeS - periodS / 2),
    entryLocalWavelength: speedAt(0) * periodS,
    exitLocalWavelength: speedAt(tankLengthCm) * periodS,
  };
}

export const waterSlopeSection: GuideSection = {
  title: waterSlopeTitle,
  figureTitle: waterSlopeTitle,
  paragraphs: [
    "Leğenin tabanı sağa doğru derinleşirse aynı kaynak her 0,25 saniyede bir tepe gönderir. Sağda dalga bu süre içinde daha uzun yol aldığı için aynı tür tepe şeritleri giderek uzaklaşır. Yüzey profili ve üstten şeritleri aynı yatay ölçekte karşılaştır.",
    "Burada sığ su yaklaşımı kullanılır. Sürat derinliğin kareköküyle orantılı kabul edilir. Sağdaki derinliği soldakiyle eşit yaparsan sürat ve yerel dalga boyu her yerde aynı olur. Eğim varsa sürat ve dalga boyu bir sınırda sıçramadan değişir.",
  ],
};

export const waterSlopeExample: WorkedExample = {
  title: "Taban alçalınca frekans aynı kalır",
  prompt: "Bir dalga leğeninin girişinde sürat 6 cm/s, kaynak 4 Hz. Çıkış derinliği girişin dört katı. Modelde çıkış sürati ve uçlardaki yerel dalga boyları nedir?",
  strategy: "Sığ su modelinde sürat için derinlik oranının karekökünü al. Dalga boyu için her noktada aynı frekansı kullan.",
  steps: [
    { label: "Çıkış süratini bul", explanation: "Derinlik dört kat olunca karekök iki olur. Dalga sağda iki kat hızlı ilerler.", expression: "v = 6 × √4 = 12 cm/s", figureTitle: waterSlopeTitle },
    { label: "Uçlardaki yerel aralıkları hesapla", explanation: "Kaynak değişmediği için aynı 4 Hz’i kullan. Şerit aralığı arada yavaş yavaş açılır.", expression: "λgiriş = 6/4 = 1,5 cm. λçıkış = 12/4 = 3 cm.", figureTitle: waterSlopeTitle },
  ],
  answer: "Çıkış sürati 12 cm/s. Yerel dalga boyu girişte 1,5 cm, çıkışta 3 cm.",
  check: "Yerel dalga boyunu sürate böldüğünde her iki uç için 0,25 s çıkar.",
  pitfall: "Derinlik dört kat olduğunda sürati de dört kat alma.",
};
