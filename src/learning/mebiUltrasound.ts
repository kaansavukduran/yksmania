import type { GuideSection, WorkedExample } from "./guides/types";
import { reflectedDistanceM } from "./reflectedDistance";

export const ultrasoundTitle = "Ultrason görüntüsünde yankının izi";
export const ultrasoundProbeTitle = "Başlık ses gönderir ve yankıyı alır";
export const ultrasoundDepthTitle = "Önce gelen yankı daha yakın sınırdan gelir";
export const ultrasoundSpeedMS = 1540;
export const shallowDelayUs = 50;
export const ultrasoundDelay = { min: 60, max: 140, step: 10, init: 100 } as const;

export function ultrasoundDepthCm(delayUs: number) {
  return reflectedDistanceM(ultrasoundSpeedMS, delayUs / 1000000) * 100;
}

export const ultrasoundSection: GuideSection = {
  title: ultrasoundTitle,
  figureTitle: ultrasoundTitle,
  paragraphs: [
    "Fotoğrafta cilde tutulan ultrason başlığını ve ekrandaki görüntüyü bul. Başlık duyabileceğimizden yüksek frekansta kısa ses dalgaları gönderir. Başlık ile cilt arasındaki jel, arada hava kalmasını önleyerek sesin iletilmesine yardım eder.",
    "Ses doku sınırlarından kısmen yansır. Başlık geri gelen sesi algılar. Aynı sürati kabul ettiğimizde daha derindeki sınırdan gelen yankı daha geç alınır. Yankının gücü de görüntüdeki açıklık ve koyuluk hakkında bilgi taşır.",
    "Model jel tabakasının kalınlığını hesaba katmadan yumuşak dokuda 1.540 m/s kullanır. İki sınırın dönüş süresini karşılaştır. Cihaz birçok yönde ölçüm yaparak kesit oluşturabilir. Peş peşe alınan görüntüler kalp kapakları gibi yapıların hareketini gösterebilir. Bazı cihazlar birden çok kesitten üç boyutlu görüntü de kurabilir.",
    "Bu görüntüler gebelikte bebeğin gelişimini izlemeye ve bazı dokular ile kitlelerin özelliklerini incelemeye yardımcı olur.",
  ],
  table: {
    layout: "table",
    headers: ["Gidiş-dönüş süresi (µs)", "Örnek sınır derinliği (cm)"],
    rows: [50, 100].map(us => [String(us), ultrasoundDepthCm(us).toLocaleString("tr-TR")]),
  },
};

export const ultrasoundExample: WorkedExample = {
  title: "İki yankıdan hangi sınır daha yakın?",
  prompt: "Aynı başlığa bir yankı 50 µs, diğeri 100 µs sonra geliyor. İki yol için ses sürati aynı. Hangi sınır başlığa daha yakın?",
  strategy: "Gidiş ve dönüşün tek ölçümde olduğunu belirle. Aynı süratte süreler ile derinlikleri karşılaştır.",
  steps: [
    { label: "Başlığın iki işini ayır", explanation: "Başlık kısa sesi gönderir ve yansımayı aynı yerden alır. Ölçüm gönderimden yankının alınmasına kadar sürer.", figureTitle: ultrasoundProbeTitle },
    { label: "İki yolun süresini kıyasla", explanation: "100 µs, 50 µs’nin iki katıdır. Aynı süratle derindeki sınırın tek yön mesafesi de iki kat olur.", expression: "50 µs → 3,85 cm. 100 µs → 7,7 cm.", figureTitle: ultrasoundDepthTitle },
  ],
  answer: "50 µs sonra yankı veren sınır daha yakındır.",
  check: "İki örnekte de başlıktan sınıra olan yol, sesin tüm yolunun yarısıdır.",
  pitfall: "Yankının gücünü tek başına derinliğin ölçüsü olarak kullanma. Bu örnekte derinliğe ilişkin veri dönüş süresidir.",
};
