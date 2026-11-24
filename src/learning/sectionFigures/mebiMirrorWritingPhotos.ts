import ambulance from "../../assets/ambulans-dickelbers-cc-by-sa.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";

const source = {
  url: "https://commons.wikimedia.org/wiki/File:Turkey_ambulance_02.JPG",
  credit: "Dickelbers · Wikimedia Commons · 850 px",
  licence: "https://creativecommons.org/licenses/by-sa/3.0/",
  licenceLabel: "CC BY-SA 3.0",
};
const photo = {
  kind: "image",
  src: ambulance,
  width: 850,
  height: 599,
  assetSHA256: "8d7e2a0023783d74de563ac84986684bac8609f75d70583498f456fff7cc0677",
} as const;

export const mirrorWritingPhotos = [
  {
    ...source,
    imageLabel: "Önden görünüm",
    figure: {
      ...photo,
      title: "Ambulansın önündeki ters yazı",
      alt: "Bir İstanbul ambulansının kaputunda kırmızı AMBULANS yazısı aynadaki biçimiyle, yan yüzünde düz okunur biçimiyle yer alıyor.",
    } satisfies SourceQuestionFigureSpec,
  },
  {
    ...source,
    horizontalReflection: true,
    imageLabel: "Ayna görünümü",
    figure: {
      ...photo,
      title: "Dikiz aynasının yatay yansıma modeli",
      alt: "Aynı fotoğrafın yatay yansımasında kaputtaki kırmızı AMBULANS yazısı artık düz okunuyor. Bu görünüm dikiz aynasının etkisini modelliyor.",
    } satisfies SourceQuestionFigureSpec,
  },
] as const;
