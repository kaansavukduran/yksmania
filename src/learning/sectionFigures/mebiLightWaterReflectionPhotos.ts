import ocean from "../../assets/ocean-water-surface-florence-lilly-pd.jpg";
import underwater from "../../assets/underwater-surface-ripples-bryan-calloway-cc-by-sa.jpg";
import { coastalWaterLicence, coastalWaterSource } from "../mebiCoastalWater";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";
import { coastalWaterPhoto } from "./mebiCoastalWaterPhoto";

export const lightWaterReflectionPhotos = [
  {
    figure: coastalWaterPhoto,
    url: coastalWaterSource,
    credit: "RenataAp · Wikimedia Commons · 960 px",
    licence: coastalWaterLicence,
    licenceLabel: "CC BY-SA 4.0",
  },
  {
    figure: {
      kind: "image",
      title: "Dalgalı deniz yüzeyinde ışık",
      alt: "Deniz yüzeyinin gözlemciye bakan dalga yamaçlarında aydınlık şeritler, aralarında daha koyu su görülüyor.",
      src: ocean,
      width: 960,
      height: 640,
      assetSHA256: "bb0b2bb318e0333261229926680221945ef506987233ae66ac1761b4a033ac77",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/w/index.php?title=File:Ocean_water_surface.jpg&oldid=1304759656",
    credit: "Florence Lilly · Wikimedia Commons · Kamu malı · 960 px",
  },
  {
    figure: {
      kind: "image",
      title: "Dalgalı yüzeye suyun altından bakış",
      alt: "Suyun altından yukarı bakınca dalgalı yüzeyin ardından görülen gökyüzü ve yaprakların sınırları kıvrımlı.",
      src: underwater,
      width: 960,
      height: 720,
      assetSHA256: "0e8ab511b06e28729af6886cba71e6d890428465d33c19e5209dc663ef7ddc57",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/w/index.php?title=File:Underwater_surface_ripples.JPG&oldid=1121102760",
    credit: "Bryan.calloway · Wikimedia Commons · 960 px",
    licence: "https://creativecommons.org/licenses/by-sa/3.0/",
    licenceLabel: "CC BY-SA 3.0",
  },
];
