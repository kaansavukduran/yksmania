import type { GuideSection, WorkedExample } from "./guides/types";

export const transmissionTitle = "Cam ve metal ışığı nasıl geçirir?";
export const clearRayTitle = "Saydam camda geçen demet";
export const diffuseRayTitle = "Buzlu camda saçılan demet";
export const opaqueRayTitle = "Metal levhada geçiş yok";

export const lightTransmissionSection: GuideSection = {
  title: transmissionTitle,
  figureTitle: transmissionTitle,
  paragraphs: [
    "Saydam pencere camından bakınca dışarıdaki nesnelerin biçimi seçilir. Görünür ışığın önemli bir kısmı camı geçer ve dışarıdaki ayrıntıların izlenmesine yetecek kadar düzenli ilerler.",
    "Buzlu cam yarı saydamdır. Karşı taraftan ışık gelir, ancak cam geçen ışığın birçok doğrultuya dağılmasına yol açar. Dışarıdan ışık geldiğini görürsün, dışarıdaki ayrıntıları seçmek zorlaşır.",
    "Kalın metal levha görünür ışığa opaktır. Işık levhanın arkasına doğrudan geçmez. Gelen ışığın bir kısmı yansıyabilir, bir kısmı malzemede soğurulabilir.",
  ],
  table: {
    layout: "table",
    headers: ["Örnek", "Karşıya geçen görünür ışık", "Arkadaki ayrıntı"],
    rows: [
      ["Pencere camı", "Önemli ölçüde geçer", "Seçilir"],
      ["Buzlu cam", "Geçer ve farklı yönlere saçılır", "Zor seçilir"],
      ["Kalın metal levha", "Doğrudan geçmez", "Seçilmez"],
    ],
  },
};

export const lightTransmissionExample: WorkedExample = {
  title: "Aynı yazıyı üç yüzeyin ardından oku",
  prompt: "Aydınlatılmış bir yazının önüne sırasıyla saydam cam, buzlu cam ve kalın metal levha koyuyorsun. Her durumda yazıdan sana hangi ışık ulaşır?",
  strategy: "Işığın geçip geçmediğini ve geçerken ilk doğrultusunu büyük ölçüde koruyup korumadığını ayrı düşün.",
  steps: [
    { label: "Saydam cam", explanation: "Yazıdan gelen ışınların bir kısmı camı geçip gözüne ulaşır. Yazının ayrıntıları seçilebilir.", figureTitle: clearRayTitle },
    { label: "Buzlu cam", explanation: "Geçen ışık farklı doğrultulara saçılır. Arkadan gelen aydınlık görülür, yazının ayrıntıları zor seçilir.", figureTitle: diffuseRayTitle },
    { label: "Kalın metal levha", explanation: "Yazıdan gelen görünür ışık levhayı doğrudan geçemez. Arkadaki yazı bu yoldan görülmez.", figureTitle: opaqueRayTitle },
  ],
  answer: "Saydam camda ayrıntılar seçilir. Buzlu camda ışık görünürken ayrıntı zor seçilir. Kalın metal levha doğrudan görüşü keser.",
  check: "Arka tarafta ışık görmek ile arka taraftaki görüntünün ayrıntılarını görmek ayrı gözlemlerdir.",
  pitfall: "Bir yüzeyin parlaması, ışığın malzemenin öteki yüzüne geçtiğini göstermez.",
};
