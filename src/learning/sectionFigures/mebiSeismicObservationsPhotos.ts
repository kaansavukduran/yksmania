import damage from "../../assets/golbasi-damage-adem-cc-by-sa.jpg";
import bearing from "../../assets/pasadena-bearing-keithalanporter-cc-by-sa.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";

const licence = "https://creativecommons.org/licenses/by-sa/4.0/";
const licenceLabel = "CC BY-SA 4.0";

export const golbasiDamagePhoto = {
  figure: {
    kind: "image",
    title: "Gölbaşı’nda 2023 depremleri sonrası yapı hasarı",
    alt: "Öndeki binanın kırılan beton kenarlarından çelik donatılar dışarı çıkmış. Arkadaki binalarda duvar ve cephe boyunca farklı hasarlar görülüyor.",
    src: damage,
    width: 4032,
    height: 3024,
    assetSHA256: "ab8bf8aa063333e2b4dd1a8ef748695fb7bddf1d6d1447cf71a4b77e3cae44ca",
  } satisfies SourceQuestionFigureSpec,
  url: "https://commons.wikimedia.org/w/index.php?oldid=1115195060&title=File%3AHeavily_damaged_apartment_buildings_after_7%2C8_massive_earthquake_in_Turkey.jpg",
  credit: "Adem",
  licence,
  licenceLabel,
  imageLabel: "Gölbaşı yapı hasarı fotoğrafı",
};

export const pasadenaBearingPhoto = {
  figure: {
    kind: "image",
    title: "Pasadena Belediye Binası’nda kolon altı izolatör",
    alt: "Düşey çelik kolon altında, mavi üst ve alt plakaların arasında siyah silindir biçimli bir izolatör görülüyor. Alt plaka temel üzerinde duruyor.",
    src: bearing,
    width: 1600,
    height: 1200,
    assetSHA256: "470cc9a2ce0becbe2a1c07fc407c0570342041748b5f19ff12a81b526b4d1173",
  } satisfies SourceQuestionFigureSpec,
  url: "https://commons.wikimedia.org/w/index.php?oldid=1058520311&title=File%3ABase_isolator_beneath_the_Pasadena%2C_California%2C_City_Hall.jpg",
  credit: "Keithalanporter",
  licence,
  licenceLabel,
  imageLabel: "Kolon altı izolatör fotoğrafı",
};
