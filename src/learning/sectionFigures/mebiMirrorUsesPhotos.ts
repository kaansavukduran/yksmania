import makeup from "../../assets/makeup-mirror-shixart1985-cc-by.jpg";
import dental from "../../assets/dental-mirror-sahana-cc-by.jpg";
import car from "../../assets/car-mirror-rawls-cc-by.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";

const licence = "https://creativecommons.org/licenses/by/2.0/";
const licenceLabel = "CC BY 2.0";

export const mirrorUsesPhotos = [
  {
    figure: {
      kind: "image", title: "Yüze yakın el aynası",
      alt: "Pencere yanında duran bir kişi, elindeki küçük yuvarlak aynaya yakın mesafeden bakıyor.",
      src: makeup, width: 427, height: 640,
      assetSHA256: "8bf778952fe4ba44df50ee73b3efbc43d19f1440ab0da19efb0bd3afe99c45eb",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/wiki/File:Woman_applying_makeup_while_standing_by_a_window_in_a_stylish_outfit_during_daylight_hours.jpg",
    credit: "Shixart1985 · Wikimedia Commons · 640 px",
    licence, licenceLabel,
  },
  {
    figure: {
      kind: "image", title: "Küçük diş aynasında diş görüntüsü",
      alt: "Tezgâhtaki küçük yuvarlak diş aynasında bir dişin açık renkli görüntüsü seçiliyor. Ayna sapı ve muayene ucu yanında duruyor.",
      src: dental, width: 640, height: 396,
      assetSHA256: "c3c6b10946d54631f8994882473f96cea23ef500e8134d1c5b4834ffc4c75761",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/wiki/File:A_tooth_(14848998042).jpg",
    credit: "Dr. Partha Sarathi Sahana · Wikimedia Commons · 640 px",
    licence, licenceLabel,
  },
  {
    figure: {
      kind: "image", title: "Aracın dış yan aynasında arka yol",
      alt: "Aracın yan aynasında gün batımı ve arka taraftaki yol ile ağaçlar görülüyor.",
      src: car, width: 640, height: 479,
      assetSHA256: "cecd2bce4ceab82a5a691894a747c450ef61b3d0d6b2fba764e076e33acb4cc2",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/wiki/File:Car_side_mirror_sunset.jpg",
    credit: "J RAWLS · Wikimedia Commons · 640 px",
    licence, licenceLabel,
  },
];
