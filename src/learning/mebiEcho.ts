import type { GuideSection, WorkedExample } from "./guides/types";
import { reflectedDistanceM } from "./reflectedDistance";

export const echoTitle = "Yankının iki yönlü yolunu ölç";
export const echoOutwardTitle = "0,20 saniye iki yönü kapsar";
export const echoReturnTitle = "Süreyi bir gidiş ve bir dönüş paylaşır";
export const echoSpeedMS = 340;
export const echoTravelSeconds = 0.6;
export const echoTimeMs = { min: 100, max: 400, step: 50, init: 200 } as const;

export function echoDistanceM(roundTripMs: number) {
  return reflectedDistanceM(echoSpeedMS, roundTripMs / 1000);
}

export const echoSection: GuideSection = {
  title: echoTitle,
  figureTitle: echoTitle,
  paragraphs: [
    "Bir duvarın önünde el çırptığını düşün. Ses önce duvara gider. Yüzey sesi geri yansıtır ve yansıyan ses kulağına ulaşır. İlk sesle geri gelen sesi ayrı duyabildiğinde yankıyı seçersin.",
    "Ölçtüğün süre, sesin çıkması ile yansıyan sesin geri alınması arasındadır. Kaynak ve dinleyen yaklaşık aynı noktadaysa sesin aldığı toplam yol, duvara olan uzaklığın iki katıdır.",
    "Çizimde havadaki ses süratini yaklaşık 340 m/s alıyoruz. Gecikmeyi değiştirip okun hangi uzaklığa gittiğini izle. Eşit iki yol görüyorsan toplam yolu ikiye böl.",
  ],
  table: {
    layout: "table",
    headers: ["Gidiş-dönüş süresi (ms)", "Duvara uzaklık (m)"],
    rows: [100, 200, 400].map(ms => [String(ms), String(echoDistanceM(ms))]),
  },
};

export const echoExample: WorkedExample = {
  title: "0,20 saniye sonra yankı gelirse duvar kaç metre uzakta?",
  prompt: "El çırptıktan 0,20 saniye sonra yankıyı duyuyorsun. Havadaki ses sürati yaklaşık 340 m/s. Duvara uzaklığın kaç metre?",
  strategy: "Süreyle sürati çarparak sesin tüm yolunu bul ve yansımanın iki yönden oluştuğunu çiz.",
  steps: [
    { label: "Ölçülen süreyle alınan yolu bul", explanation: "0,20 saniye ilk sesin çıkışından yansıyan sesin dönüşüne kadar tutulur.", expression: "Toplam yol = 340 × 0,20 = 68 m", figureTitle: echoOutwardTitle },
    { label: "Gidiş yolunu ayır", explanation: "Aynı mesafe bir gidişte ve bir dönüşte alınır. 68 metrenin yarısı duvara olan uzaklıktır.", expression: "Uzaklık = 68 ÷ 2 = 34 m", figureTitle: echoReturnTitle },
  ],
  answer: "Duvar yaklaşık 34 m uzakta.",
  check: "34 m gidiş ile 34 m dönüş 68 m. 68 m ÷ 340 m/s = 0,20 s.",
  pitfall: "0,20 saniyeyi tek yön süresi sayarsan duvarı 68 m uzakta bulursun.",
};
