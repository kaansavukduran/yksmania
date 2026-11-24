import mirrorImage from "../../assets/visible-mirror-sunset-cc0.jpg";
import type { SourceQuestionFigureSpec } from "../SourceQuestionFigure";
import { visibleMirrorPhotoTitle } from "../mebiVisibleMirror";

export const visibleMirrorPhoto = {
  kind: "image",
  title: visibleMirrorPhotoTitle,
  alt: "Bir aracın yan aynasında arkadaki yol, bulutlar ve turuncu gün batımı görünüyor. Aynanın siyah çerçevesi bu yansımayı çerçevenin dışındaki manzaradan ayırıyor.",
  src: mirrorImage,
  width: 960,
  height: 640,
  assetSHA256: "27a025e92946011645c501a03c9f08539275b58cbb850a2b3aa0d9724a0e6b73",
} satisfies SourceQuestionFigureSpec;

export const visibleMirrorPhotoSource = "https://commons.wikimedia.org/w/index.php?title=File:Our_Past_is_Behind_Us._%28Unsplash%29.jpg&oldid=914430380";
