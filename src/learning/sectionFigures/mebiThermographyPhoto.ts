import thermalImage from "../../assets/thermal-camera-gallery-cc0.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";
import { thermographyPhotoTitle } from "../mebiThermography";

export const thermographyPhoto = {
  kind: "image",
  title: thermographyPhotoTitle,
  alt: "Bir müze düzeneğinde iki kişiyi gösteren gerçek termal kamera ekranı. Sağdaki renk çubuğunda altta 69, üstte 101 var. Merkez okuması +71,6 Fahrenheit.",
  src: thermalImage,
  width: 960,
  height: 720,
  assetSHA256: "7824f12972c00897658e3012466de6ac4bb51163bba51b4cecbb8e54fbac662a",
} satisfies SourceQuestionFigureSpec;
