import clearWindow from "../../assets/clear-window-discoa340-cc-by-sa.jpg";
import frostedWindow from "../../assets/frosted-window-oljylautta-pd.jpg";
import opaqueSheet from "../../assets/opaque-sheet-si-griffiths-cc-by-sa.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";

export const lightTransmissionPhotos = [
  {
    figure: {
      kind: "image",
      title: "Saydam pencere camı",
      alt: "Pencereden bakınca karşıdaki binaların pencereleri, nehirdeki tekneler ve sokaktaki araçların biçimleri seçiliyor.",
      src: clearWindow,
      width: 960,
      height: 720,
      assetSHA256: "2b0af48fc1c53b3fbd4d207839ce88d337922fb9ed0ea2fc0b7420a2dfd8f931",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/w/index.php?title=File:Paris_Skyline_through_a_Window.jpg&oldid=804841052",
    credit: "DiscoA340 · Wikimedia Commons · 960 px",
    licence: "https://creativecommons.org/licenses/by-sa/4.0/",
    licenceLabel: "CC BY-SA 4.0",
  },
  {
    figure: {
      kind: "image",
      title: "Buzlu pencere camı",
      alt: "Dışarıdan aydınlatılan buzlu camın arkasında açık ve koyu alanlar seçiliyor. Dışarıdaki nesnelerin sınırları belirgin görünmüyor.",
      src: frostedWindow,
      width: 960,
      height: 720,
      assetSHA256: "e7d8ae09216c0eee7e4667713a2b3e62222f7d374b02a095e970061f0c39a5cb",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/w/index.php?title=File:FrostedGlassWindow.JPG&oldid=1262329455",
    credit: "Öljylautta · Wikimedia Commons · Kamu malı · 960 px",
  },
  {
    figure: {
      kind: "image",
      title: "Opak metal levha",
      alt: "Kabartmalı mavi metal levhada yansıyan çizgiler görülebiliyor. Levhanın arkasındaki bir nesne görünmüyor.",
      src: opaqueSheet,
      width: 960,
      height: 639,
      assetSHA256: "0aa8bda260e05ff319dc3f1693dc0bfd821882f4eb0f3640fb36d683d92cfffd",
    } satisfies SourceQuestionFigureSpec,
    url: "https://commons.wikimedia.org/w/index.php?title=File:Metal_Textured_Surface_UK.jpg&oldid=1155888241",
    credit: "Si Griffiths · Wikimedia Commons · 960 px",
    licence: "https://creativecommons.org/licenses/by-sa/3.0/",
    licenceLabel: "CC BY-SA 3.0",
  },
];
