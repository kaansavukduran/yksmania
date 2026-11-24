import breakwater from "../../assets/valletta-breakwater-cc-by-sa.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";
import { coastalWaterPhotoTitle } from "../mebiCoastalWater";

export const coastalWaterPhoto = {
  kind: "image",
  title: coastalWaterPhotoTitle,
  alt: "Valletta liman girişinde bir taş dalgakıran var. Sol ve üst tarafta dalgalı deniz, duvar önünde yukarı sıçrayan beyaz dalga ve önde daha koyu su yüzeyi görülüyor.",
  src: breakwater,
  width: 960,
  height: 601,
  assetSHA256: "63acc1fa710562dc1df6385514142c2dfbfb785dce486ae6f0f7b7fdf089b23f",
} satisfies SourceQuestionFigureSpec;
