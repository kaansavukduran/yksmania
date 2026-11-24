import { blockerAxisCm, blockerRadiusCm, shadowApexCm, sourceRadiusCm } from "../mebiExtendedSourceObservers";
import { afterApexTitle, apexScreenTitle, beforeApexTitle, extendedConeTitle, extendedShadowConeAt } from "../mebiExtendedShadowCone";
import { circle, fmt, poly, seg, txt, v, type El, type FigureDef, type FigureFrame } from "./figureKit";

function coneAt(screenCm: number): FigureFrame {
  const { converging, diverging, signedUmbraCm, penumbraLimitCm } = extendedShadowConeAt(screenCm);
  const sourceTouchInnerX = sourceRadiusCm * converging / Math.hypot(1, converging);
  const sourceTouchOuterX = sourceRadiusCm * diverging / Math.hypot(1, diverging);
  const front = v(screenCm + 8, 0);
  const beginsBehindBlocker = blockerAxisCm + blockerRadiusCm;
  const nearRadius = converging * (shadowApexCm - beginsBehindBlocker);
  const fullEnd = Math.min(screenCm, shadowApexCm);
  const endRadius = Math.max(0, signedUmbraCm);
  const els: El[] = [
    poly([v(beginsBehindBlocker, nearRadius), v(fullEnd, endRadius), v(fullEnd, -endRadius), v(beginsBehindBlocker, -nearRadius)], { tone: "ink", fill: "ink", bare: true }),
    seg(v(screenCm, -penumbraLimitCm - 0.6), v(screenCm, penumbraLimitCm + 0.6), { tone: "muted", bold: true }),
  ];
  for (const sign of [-1, 1]) {
    els.push(
      seg(v(sourceTouchInnerX, sign * converging * (shadowApexCm - sourceTouchInnerX)), v(screenCm, sign * signedUmbraCm), { tone: "a", thin: true }),
      seg(v(sourceTouchOuterX, sign * (diverging * sourceTouchOuterX - sourceRadiusCm * Math.hypot(1, diverging))), v(screenCm, sign * penumbraLimitCm), { tone: "b", thin: true, dash: true }),
    );
  }
  const frontScale = 0.48;
  const detail = v(front[0], -penumbraLimitCm * frontScale - 6.7);
  const detailScale = 7 * frontScale;
  els.push(
    circle(v(0, 0), sourceRadiusCm, { tone: "a", fill: "a" }),
    circle(v(blockerAxisCm, 0), blockerRadiusCm, { tone: "ink", fill: "ink" }),
    circle(front, penumbraLimitCm * frontScale, { tone: "b", fill: "b", bold: true }),
    txt(v(-1.1, -4.6), "Kaynak", "s", { tone: "ink", small: true }),
    txt(v(blockerAxisCm + 0.5, -7.0), "Opak küre", "s", { tone: "ink", small: true }),
    txt(v(screenCm, penumbraLimitCm + 1.1), "Perde", "n", { tone: "ink", small: true }),
    txt(v(front[0], penumbraLimitCm * frontScale + 1.4), "Önden", "n", { tone: "ink", small: true }),
    circle(detail, 2.9, { tone: "b", fill: "b" }),
    txt(v(detail[0], detail[1] - 3.6), "Merkez ×7", "s", { tone: "ink", small: true }),
  );
  if (signedUmbraCm >= 0) {
    els.push(
      circle(front, Math.max(0.14, signedUmbraCm * frontScale), { tone: "ink", fill: "ink" }),
      circle(detail, Math.max(0.14, signedUmbraCm * detailScale), { tone: "ink", fill: "ink", bold: true }),
    );
  } else {
    els.push(
      circle(front, -signedUmbraCm * frontScale, { tone: "warn", dash: true, bold: true }),
      circle(detail, -signedUmbraCm * detailScale, { tone: "warn", dash: true, bold: true }),
    );
  }
  const centre = signedUmbraCm > 0
    ? `Tam gölge çapı ${fmt(2 * signedUmbraCm, 2)} cm.`
    : signedUmbraCm === 0
      ? "Tam gölge sınırı tek noktaya indi. Alanı sıfır."
      : "Tam gölge yok. Kesik çizgili dairenin içinde eksene yakın gözlemci kaynağı halka biçiminde görür.";
  return { els, readout: [centre, `Yarı gölgenin dış sınır çapı ${fmt(2 * penumbraLimitCm, 2)} cm.`] };
}

const alt = "Yandan büyük kaynak, opak küre, teğet ışınlar ve perde var. Sağdaki küçük önden görünümde katı iç daire tam gölgeyi, kesik iç sınır halkalı görünümü gösterir. Aşağıda aynı merkez bölgesi yedi kat büyük çizilmiştir.";
export const extendedShadowConeFigures: Record<string, FigureDef> = {
  [extendedConeTitle]: { caption: "Perdeyi üç konuma taşı. Yandan sınır ışınlarına, önden iç ve dış bölgelere bak.", alt, param: { label: "Kaynak ile perde arası", min: 10, max: 14, step: 2, init: 10, unit: "cm" }, draw: coneAt },
  [beforeApexTitle]: { caption: "10 cm, koni ucundan önce.", alt, draw: () => coneAt(10) },
  [apexScreenTitle]: { caption: "Perde 12 cm’de, iç gölge konisinin tam ucunda.", alt, draw: () => coneAt(12) },
  [afterApexTitle]: { caption: "14 cm, koni ucunun arkasında.", alt, draw: () => coneAt(14) },
};
