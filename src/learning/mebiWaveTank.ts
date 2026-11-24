import type { GuideSection, WorkedExample } from "./guides/types";

export const waveTankTitle = "Dalga leğeninde tepe ve çizgiyi eşleştir";
export const waveTankTime = { min: 0, max: 2, step: 0.5, initial: 0 };
export const waveTankWidthCm = 15;
export const waveTankWavelengthCm = 4;
const speedCmS = 4;
const sourcePhaseOffsetCm = 1;

export function waveTankAt(timeS: number) {
  const shiftCm = sourcePhaseOffsetCm + speedCmS * timeS;
  const wavelength = waveTankWavelengthCm;
  const fronts = (offset: number) => {
    const phase = shiftCm + offset;
    const first = Math.ceil(-phase / wavelength);
    const last = Math.floor((waveTankWidthCm - phase) / wavelength);
    return Array.from({ length: last - first + 1 }, (_, i) => phase + (first + i) * wavelength);
  };
  const heightAt = (x: number) => Math.cos((2 * Math.PI * (x - shiftCm)) / wavelength);
  return { crests: fronts(0), troughs: fronts(wavelength / 2), heightAt, speedCmS, shiftCm };
}

export const waveTankSetupTitle = "Dalga leğeninde ışık, çubuk ve kâğıt";

export const waveTankSetupSection: GuideSection = {
  title: waveTankSetupTitle,
  figureTitle: waveTankSetupTitle,
  paragraphs: [
    "K–L kenarındaki çubuk suya değer. Çubuğu düzenli olarak yukarı ve aşağı hareket ettir. Oluşan çizgiler çubuğa paralel olarak leğenin karşı kenarına gider.",
    "Işığı leğenin üstüne, kâğıdı leğenin altına yerleştir. Suyun biçimi değiştikçe kâğıtta paralel aydınlık ve karanlık şeritler görünür.",
    "Kâğıt, gördüğümüz şeritlerin hangi konumda olduğunu kaydeder. Sonraki çizimde bu şeritleri yandan görülen tepe ve çukurla eşleştir.",
  ],
};

export const waveTankSection: GuideSection = {
  title: waveTankTitle,
  figureTitle: waveTankTitle,
  paragraphs: [
    "Leğenin K–L kenarına suya değen düz bir çubuk koy. Çubuk düzenli olarak yukarı ve aşağı hareket ettiğinde kaynakla paralel tepe çizgileri oluşur ve karşıdaki M–N kenarına ilerler.",
    "Aynı dalgayı üç yerde karşılaştır. Üstten su yüzeyindeki çizgiye, yandan tepe ve çukura, altta ışıkla oluşan şeritlerin yerlerine bak. Bu ders düzeneğinin çiziminde tepe aydınlık şeride, çukur karanlık şeride karşılık gelir.",
    "Dalga boyu aynı türden ardışık iki çizgi arasındadır. Bir aydınlık ile hemen yanındaki karanlık şerit arası yarım dalga boyudur.",
    "İlerleme oku aydınlık ve karanlık şeritleri dik keser. Çubuk ile çizgiler paralel konumda kalır.",
  ],
  table: {
    layout: "table",
    headers: ["İki komşu konum", "Mesafe", "Çizimdeki ölçü"],
    rows: [["Aydınlık → aydınlık", "λ", "4 cm"], ["Karanlık → karanlık", "λ", "4 cm"], ["Aydınlık → karanlık", "λ / 2", "2 cm"]],
  },
};

export const waveTankExample: WorkedExample = {
  title: "Dalga leğeninde aydınlık ve karanlık aralığını bul",
  prompt: "Bir dalga leğeninin izdüşümünde iki ardışık aydınlık şerit 4 cm aralıklı. Bir aydınlıkla komşu karanlık arasındaki uzaklık ve dalganın ilerleme doğrultusu nedir?",
  strategy: "Önce suyun yandan görünümünde iki tepe ile bir tepe ve komşu çukuru ayırt et.",
  steps: [
    { label: "İlk aydınlık şeritten ikinciye ilerle", expression: "λ = 4 cm", explanation: "Yandan çizimde bir tepeden sonraki tepeye geçersin. İki aydınlık şerit bu konumların izdüşümüdür.", figureTitle: waveTankTitle },
    { label: "Komşu çukurun ve ilerlemenin yerini bul", expression: "λ / 2 = 2 cm", explanation: "Çukur iki tepenin ortasındadır. İlerleme oku şeritlerin doğrultusuna diktir.", figureTitle: waveTankTitle },
  ],
  answer: "Aydınlık ile komşu karanlık şerit arası 2 cm. Dalga, şeritlere dik ilerler.",
  check: "Karanlık şeritten sonraki karanlığa 4 cm okunmalı.",
  pitfall: "Yan yana duran bir aydınlık ve bir karanlık şeridin aralığını tam dalga boyu sanma.",
};
