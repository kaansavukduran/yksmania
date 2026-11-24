import scan from "../../assets/abdominal-ultrasound-goleisureintl-cc-by.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";

export const ultrasoundPhoto = {
  figure: {
    kind: "image",
    title: "Cilde tutulan ultrason başlığı ve ekran",
    alt: "Bir kişi ultrason başlığını başka birinin karnına tutuyor. Kabloyla bağlı cihazın ekranında ultrason görüntüsü görünüyor.",
    src: scan,
    width: 1300,
    height: 866,
    assetSHA256: "fb7d71340ad32e49d45d9b84111edf22146461e7bd3902d5ee898b304331258c",
  } satisfies SourceQuestionFigureSpec,
  url: "https://commons.wikimedia.org/w/index.php?title=File:Abdominal_Ultrasound_Imaging_in_Navi_Mumbai.jpg&oldid=1252926961",
  credit: "Goleisureintl",
  licence: "https://creativecommons.org/licenses/by/4.0/",
  licenceLabel: "CC BY 4.0",
  imageLabel: "Ultrason fotoğrafı",
};
