import type { GuideSection, WorkedExample } from "./guides/types";

export const crookesPhotoSection = "Işık enerji ve momentum taşır";
export const crookesModelTitle = "Radyometrede ışık, sıcaklık ve hareket";
export const crookesAbsorptionTitle = "Koyu yüzün daha çok ısınması";
export const crookesGasTitle = "Gazın kanat kenarındaki hareketi";

export const crookesModelSection: GuideSection = {
  title: crookesModelTitle,
  figureTitle: crookesModelTitle,
  paragraphs: [
    "Crookes radyometresinde düşey bir eksene bağlı ince kanatlar, içinde düşük basınçlı gaz bulunan bir cam haznededir. Her kanadın bir yüzü koyu, öteki yüzü daha parlaktır.",
    "Işık geldiğinde koyu yüz daha çok enerji soğurup öteki yüzden daha sıcak olabilir. Kanat kenarında sıcaklık farkı gazın hareketini değiştirir. Bu termal etki kanada kuvvet uygular ve serbest eksen çevresinde dönmeye katkı verir.",
    "Işık enerjiyle birlikte momentum da taşır ve ışık basıncı ayrı bir etkidir. Bu düzeneğin yaygın gözleminde dönmenin başlıca açıklaması, düşük basınçlı gazın sıcaklık farkına verdiği tepkidir.",
  ],
};

export const crookesExample: WorkedExample = {
  title: "Radyometrede önce hangi etkiyi ara?",
  prompt: "Bir Crookes radyometresi ışık altında dönüyor. Camın içinde düşük basınçlı gaz var ve kanatların iki yüzü farklı renk. Dönüşün açıklamasında hangi iki adım gerekir?",
  strategy: "Enerjinin kanada geçişini ve gazın kanat kenarındaki tepkisini ayrı düşün.",
  steps: [
    { label: "Sıcaklık farkı", explanation: "Koyu yüz gelen ışıktan daha çok enerji soğurur. Kanadın iki yüzü arasında sıcaklık farkı oluşabilir.", figureTitle: crookesAbsorptionTitle },
    { label: "Düşük basınçlı gaz", explanation: "Kanat kenarında gazın termal hareketi ve basınç farkı kuvvet oluşturur. Serbest eksendeki kanatlar bu etki altında döner.", figureTitle: crookesGasTitle },
  ],
  answer: "Koyu ve açık yüzün sıcaklığı farklılaşır. Düşük basınçlı gazın kenardaki tepkisi kanatta kuvvet oluşturur.",
  check: "Fotoğraf cihazı gösterir. Çizim, gözlenen hareketi açıklayan enerji ve gaz adımlarını ayrı gösterir.",
  pitfall: "Dönme gözleminin ardından gaz basıncını ve yüzeylerin sıcaklığını kontrol et.",
};
