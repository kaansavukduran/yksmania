import type { GuideSection, WorkedExample } from "./guides/types";

export const visibleByReflectionTitle = "Kaynak, top ve göz arasında ışık yolu";
export const litObjectTitle = "Topun göze gönderdiği ışık";
export const unlitObjectTitle = "Işık kapalıyken göze ulaşan yol";
export const approximateReflectionCases = [
  { label: "Açık yüzey", lamp: true, reflectedFraction: 0.8 },
  { label: "Koyu yüzey", lamp: true, reflectedFraction: 0.08 },
  { label: "Lamba kapalı", lamp: false, reflectedFraction: 0 },
] as const;

export const visibleByReflectionSection: GuideSection = {
  title: visibleByReflectionTitle,
  figureTitle: visibleByReflectionTitle,
  paragraphs: [
    "Kendi ışığını üretmeyen topu görebilmek için ışık önce topa gelmeli. Işığın bir kısmı yüzeyden yansır. Yansıyan kısımdan göze ulaşan ışık topu görmemizi sağlar.",
    "Aynı lambada açık renkli yüzey çoğu zaman koyu yüzeyden daha çok görünür ışık yansıtır. Gerçek koyu yüzey bir miktar ışık yansıtır. Tam soğurucu ideal yüzeyde doğrudan yansıma sıfırdır.",
    "Durgun yüzeyde yansıyan tek renkli ışığın frekansı aynı kalır. Aynı ortamda ışığın sürati de aynı. Beyaz ışık farklı renkler içerir. Bir yüzey bazı renkleri ötekilerden daha çok soğurursa göze gelen karışımın rengi değişebilir.",
    "Lamba kapalı ve başka ışık yoksa topun üzerinden göze uzanan ışık yolu kesilir. Çizimdeki %80 ve %8 iki yüzeyi kıyaslayan varsayımsal yansıma paylarıdır. Göze ulaşan pay gözün konumuna bağlıdır.",
  ],
};

export const visibleByReflectionExample: WorkedExample = {
  title: "Bir topu aydınlıkta ve karanlıkta izle",
  prompt: "Karanlık bir odada topa bir lamba tutuyorsun. Göze ulaşan yol, lamba açıkken ve kapalıyken nasıl değişir?",
  strategy: "Işığı üreteni, yüzeyden yansıtanı ve alıcıyı ayrı belirle.",
  steps: [
    { label: "Topa gelen ışığı izle", explanation: "Lambadan topa ışık gelir. Topun yüzeyi ışığın bir kısmını göze doğru yansıtır.", figureTitle: litObjectTitle },
    { label: "Lambayı kapat", explanation: "Başka ışık kalmadığında topa gelen ve toptan göze yansıyan ışık kalmaz.", figureTitle: unlitObjectTitle },
  ],
  answer: "Görüş için lamba → top → göz yolu açık olmalı.",
  check: "Ok göze doğru çizilir. Göz bu düzende ışığı alır.",
  pitfall: "Topun görünmesini topun kendi ışığını ürettiği anlamına getirme.",
};
