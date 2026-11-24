import crookes from "../../assets/crookes-radiometer-timeline-cc-by-sa.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";

export const crookesPhoto = {
  figure: {
    kind: "image",
    title: "Crookes radyometresinin cam haznesi",
    alt: "Cam kürenin içinde düşey ince bir eksene bağlanan koyu ve açık yüzlü kanatlar görülüyor.",
    src: crookes,
    width: 404,
    height: 526,
    assetSHA256: "cbb16e7297ca3c661f59aef2d23858e968d2cc2fe6a7f053fa273530717c7bb1",
  } satisfies SourceQuestionFigureSpec,
  url: "https://commons.wikimedia.org/w/index.php?title=File:Crookes_radiometer.jpg&oldid=871293119",
  credit: "Timeline",
  licence: "https://creativecommons.org/licenses/by-sa/3.0/",
  licenceLabel: "CC BY-SA 3.0",
  imageLabel: "Radyometre fotoğrafı",
};
