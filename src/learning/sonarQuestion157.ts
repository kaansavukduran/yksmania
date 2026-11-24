import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { sonarDelay, sonarDistanceM, sonarSpeedMS } from "./mebiSonar";

const delay = sonarDelay.init;
const distance = sonarDistanceM(delay);
const total = 2 * distance;
const speedText = sonarSpeedMS.toLocaleString("tr-TR");
const secondsText = (delay / 1000).toLocaleString("tr-TR", { minimumFractionDigits: 3 });

export const sonarDistanceQuestion = {
  id: "ses-deprem-dalgalari-sonar-sure-sekil",
  prompt: txt("Teknenin altındaki sonar başlığı, tam altındaki balık sürüsünden şekilde verilen süre sonunda yankı alıyor. Başlıktan sürüye düşey uzaklık kaç metredir?"),
  options: [distance / 2, distance, total, sonarSpeedMS / 2, distance * 10].map(value => txt(String(value))),
  answer: 1,
  hint: txt("Süre ne zaman başlıyor ve ne zaman bitiyor? Milisaniyeyi saniyeye çevir. Ardından sesin çizimde kaç yol aldığını say."),
  explanation: txt(`${delay} ms = ${secondsText} s. Sesin gidiş ve dönüşte toplam yolu ${speedText} × ${secondsText} = ${total} m. Bu iki eş yolun biri ${distance} m.`),
  guidance: {
    knowledge: ["1.000 ms bir saniyedir.", "Sonar gönderim ile alınan yankı arasındaki süreyi ölçer."],
    strategy: "Ölçülen süreyi saniye cinsinden yaz. Süratle çarp, ardından iki eş yoldan birini al.",
    steps: [
      `Süre 0’da gönderimle başlıyor ve yankının ${delay} ms’de alınmasıyla bitiyor. ${delay} ms, ${secondsText} s eder. Oklar iki ayrı yönü gösteriyor.`,
      `Suyun ses sürati ${speedText} m/s. ${secondsText} s’de gidilen toplam yol ${total} m. İki yön eşit olduğu için başlıktan sürüye uzaklık ${total} ÷ 2 = ${distance} m.`,
    ],
    optionReasons: [
      `${distance / 2} m, tek yön ${distance} metreyi bir kez daha ikiye bölünce çıkar. Toplam yol zaten bir kez ikiye bölündü.`,
      `Gönderim ve dönüş toplam ${total} m. Bu iki yol eşit, biri ${distance} m.`,
      `${total} m sesin iki yönde aldığı toplam yoldur. Soru bir yönün uzunluğunu istiyor.`,
      `${sonarSpeedMS / 2}, sürati doğrudan ikiye bölünce çıkar. Uzaklık için önce saniye cinsinden süreyle çarp.`,
      `${distance * 10} m, ${delay} ms’yi 1,2 s alırsan çıkar. Bu süre ${secondsText} s olmalı.`,
    ],
    commonError: "Gidiş-dönüş süresini yalnız tek yön için kullanma.",
    check: `${distance} m gidiş ve ${distance} m dönüş ${total} m eder. ${total} ÷ ${speedText} = ${secondsText} s.`,
  },
  skill: "Sonar şemasından yankı süresini okuyup tek yön uzaklığını bulma",
} satisfies Question;

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;

function sonarDrawing(timeLabel: string): Required<Pick<Geometry, "viewBox" | "segments" | "labels">> {
  return {
    viewBox: [0, 0, 720, 448],
    segments: [
      { from: [85, 111], to: [391, 111] },
      { from: [134, 58], to: [336, 58], emphasis: true },
      { from: [134, 58], to: [157, 100] }, { from: [336, 58], to: [313, 100] },
      { from: [157, 100], to: [313, 100] },
      { from: [234, 100], to: [234, 138], emphasis: true },
      { from: [191, 151], to: [191, 308], emphasis: true },
      { from: [171, 283], to: [191, 312], emphasis: true }, { from: [211, 283], to: [191, 312], emphasis: true },
      { from: [278, 308], to: [278, 151], dashed: true },
      { from: [258, 179], to: [278, 151] }, { from: [298, 179], to: [278, 151] },
      { from: [220, 349], to: [245, 333] }, { from: [245, 333], to: [271, 349] },
      { from: [271, 349], to: [245, 365] }, { from: [245, 365], to: [220, 349] },
      { from: [220, 349], to: [200, 334] }, { from: [220, 349], to: [200, 364] },
    ],
    labels: [
      { at: [235, 47], text: "Tekne" },
      { at: [86, 235], text: "Gidiş" },
      { at: [376, 235], text: "Dönüş" },
      { at: [472, 167], text: timeLabel, anchor: "start" },
      { at: [472, 298], text: `${speedText} m/s`, anchor: "start" },
      { at: [245, 418], text: "Balık sürüsü" },
    ],
  };
}

export const sonarDistanceQuestionFigures = {
  figure: {
    kind: "geometry",
    title: "Tekneye dönen sonar yankısı",
    alt: `Teknenin altında balık sürüsü var. Sesin aşağı gidiş ve yukarı dönüş okları görülüyor. İlk gönderimden alıma kadar ${delay} ms geçiyor. Sudaki ses sürati ${speedText} m/s.`,
    ...sonarDrawing(`${delay} ms`),
  } satisfies Geometry,
  hintFigure: {
    kind: "table",
    title: "Süreyi başlatan ve bitiren olay",
    alt: "Sayaç ses gönderilince başlar ve geri gelen yankı alınınca durur.",
    headers: ["Olay", "Sayaç"],
    rows: [["Başlıktan suya ses gönderildi", "0 ms"], ["Yankı başlığa geri geldi", `${delay} ms`]],
  } satisfies SourceQuestionFigureSpec,
  stepFigures: [
    {
      kind: "geometry",
      title: "Gidiş ve dönüşün ortak süresi",
      alt: `Gidiş ve dönüş okları, ölçülen ${delay} ms veya ${secondsText} saniyenin birlikte kapsadığı iki yoldur.`,
      ...sonarDrawing(`${secondsText} s`),
    } satisfies Geometry,
    {
      kind: "table",
      title: "Toplam ve tek yön yolları",
      alt: `Gidiş ve dönüş toplam ${total} metre. Başlıktan sürüye tek yön ${distance} metre.`,
      headers: ["Yol", "Uzaklık"],
      rows: [["Gidiş ve dönüş", `${total} m`], ["Başlıktan sürüye", `${distance} m`]],
    } satisfies SourceQuestionFigureSpec,
  ],
};
