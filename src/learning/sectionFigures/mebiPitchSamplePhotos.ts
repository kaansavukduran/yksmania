import lion from "../../assets/namibia-lion-kevin-pluck-cc-by.jpg";
import canary from "../../assets/canary-l-e-macdonald-cc-by-sa.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";

export const pitchSamplePhotos = [
  {
    figure: {
      kind: "image",
      title: "Aslan örneği",
      alt: "Sarı otlar arasında uzanan yeleli bir erkek aslan.",
      src: lion,
      width: 960,
      height: 701,
      assetSHA256: "5b627beaf14737019bf6524bef238f275369cd073e97e0b187d21f368e8c0ef5",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/w/index.php?oldid=1196427540&title=File%3ALion_waiting_in_Namibia_%28cropped%29.jpg",
    credit: "Kevin Pluck",
    imageLabel: "Aslan",
    licence: "https://creativecommons.org/licenses/by/2.0/",
    licenceLabel: "CC BY 2.0",
  },
  {
    figure: {
      kind: "image",
      title: "Kanarya örneği",
      alt: "Açık renkli bir tünek üzerinde duran, sarı ve zeytin renkli kanarya.",
      src: canary,
      width: 960,
      height: 835,
      assetSHA256: "951031053c333ae4efa6368d33996ce50c29f856bf999a639ef1f55c134e9683",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/w/index.php?oldid=1208751877&title=File%3ADomestic_Canary_-_Serinus_canaria.jpg",
    credit: "L. E. MacDonald",
    imageLabel: "Kanarya",
    licence: "https://creativecommons.org/licenses/by-sa/2.0/",
    licenceLabel: "CC BY-SA 2.0",
  },
] as const;
