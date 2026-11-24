import radiograph from "../../assets/hand-radiograph-cc0.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";
import { handRadiographPhotoTitle } from "../mebiXAndGamma";

export const handRadiograph = {
  kind: "image",
  title: handRadiographPhotoTitle,
  alt: "Sağ elin gerçek röntgeni. Parmak ve bilek kemikleri, çevrelerindeki yumuşak dokudan daha açık tonda. Üst köşede R, bilekte A ile H arasındaki kemik etiketleri bulunuyor.",
  src: radiograph,
  width: 354,
  height: 599,
  assetSHA256: "0fbc6e17fde38bd90b38ed0201969fde9172207dcc6e2a047a40be3646b92f0c",
} satisfies SourceQuestionFigureSpec;

export const handRadiographSource = "https://commons.wikimedia.org/w/index.php?title=File:X-ray_of_hand.jpg&oldid=1099028774";
