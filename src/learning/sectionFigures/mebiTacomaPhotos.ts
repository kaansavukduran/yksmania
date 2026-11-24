import deckBends from "../../assets/tacoma-narrows-barney-elliot-64s.webp";
import deckBreaks from "../../assets/tacoma-narrows-barney-elliot-122s.webp";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";

const archive = {
  url: "https://commons.wikimedia.org/w/index.php?title=File%3ATacoma_Narrows_Bridge_destruction.ogv&oldid=1154681392",
  credit: "Barney Elliot, Prelinger Arşivi",
  licence: "https://creativecommons.org/publicdomain/certification/1.0/us/",
  licenceLabel: "Kamu malı",
};

export const tacomaPhotos = [
  {
    ...archive,
    imageLabel: "Bükülme",
    figure: {
      kind: "image",
      title: "Tacoma, tabliye bükülürken",
      alt: "Siyah beyaz arşiv karesinde kulenin yanındaki yol tabliyesi belirgin biçimde bükülüyor.",
      src: deckBends,
      width: 640,
      height: 480,
      assetSHA256: "7635b09ecccc72343732bd06064451e23a6c8a52d39aaca9f8ff4bcc3a4ac415",
    } satisfies SourceQuestionFigureSpec,
  },
  {
    ...archive,
    imageLabel: "Kopma",
    figure: {
      kind: "image",
      title: "Tacoma, tabliye parçası koparken",
      alt: "Siyah beyaz arşiv karesinde yolun kopan bölümü, arkada kule ve aşağıda su üstünde bir bulut görünüyor.",
      src: deckBreaks,
      width: 640,
      height: 480,
      assetSHA256: "36f8ef0afc47850ad6a649c1c2a0cf7ed1fc67af9bf2748815da2956d6d27e50",
    } satisfies SourceQuestionFigureSpec,
  },
] as const;
