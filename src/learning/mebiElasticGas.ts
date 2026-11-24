import type { GuideSection, WorkedExample } from "./guides/types";

export const gasMembraneTitle = "Esnek zar iki gazı aynı basınçta dengeler";
export const elasticBalloonTitle = "Esnek balonda basıncı dış hava belirler";
export const heatedMembraneTitle = "Isıtılan gaz kabın daha büyük bölümünü kaplar";
export const compressedBalloonTitle = "Dış basınç artınca balon küçülür";

const startPressure = 100;
const startMembraneVolume = 5;
const startBalloonVolume = 3;

export function gasMembraneState(temperatureRatio: number) {
  const totalRatio = temperatureRatio + 1;
  return {
    pressure: startPressure * totalRatio / 2,
    volumeX: (2 * startMembraneVolume) * temperatureRatio / totalRatio,
    volumeY: (2 * startMembraneVolume) / totalRatio,
  };
}

export const balloonChanges = [
  { label: "Gazı ısıt", variable: "temperature" },
  { label: "Gaz ekle", variable: "amount" },
  { label: "Dış basıncı artır", variable: "atmosphere" },
] as const;

export function elasticBalloonState(change: typeof balloonChanges[number], factor: number) {
  const ratios = { temperature: 1, amount: 1, atmosphere: 1, [change.variable]: factor };
  return {
    pressure: startPressure * ratios.atmosphere,
    volume: startBalloonVolume * ratios.temperature * ratios.amount / ratios.atmosphere,
  };
}

export const gasMembraneSection: GuideSection = {
  title: gasMembraneTitle,
  figureTitle: gasMembraneTitle,
  paragraphs: [
    "Rijit bir kabın iç hacmi sabittir. İçindeki sızdırmaz esnek zar, X ve Y gazlarını birbirine karışmadan ayırır. Zarın kendi direncini ihmal edersek son dengede iki tarafın basıncı eşittir. Hacimleri ve sıcaklıkları farklı olabilir.",
    "X gazı ısıtılırsa zar Y tarafına doğru yer değiştirir. X genişlerken Y sıkışır. Modelde Y aynı sıcaklıkta tutulur. İki gazın ortak son basıncı ilk basınçtan büyüktür. Eşit basınç, ilk ve son basıncın aynı olması anlamına gelmez.",
    "İdeal gaz için PV = nRT. Aynı P’de her bölmenin V değeri kendi nT çarpımıyla orantılıdır. Hacimleri topladığında kabın toplam hacmini elde etmelisin.",
  ],
};

export const elasticBalloonSection: GuideSection = {
  title: elasticBalloonTitle,
  figureTitle: elasticBalloonTitle,
  paragraphs: [
    "Çok esnek bir balonda yüzeyin gerilme etkisini ihmal ettiğimizde son dengede gaz basıncı dış hava basıncına eşittir. Dış basınçtan bağımsız basınç artışı varsaymak bu modelde doğru olmaz. Gerçek bir balonun zarı gerildiğinde içerideki basınç daha yüksek olabilir.",
    "Dış basınç sabitse balonu ısıtmak veya içine gaz eklemek hacmi büyütür. Gaz miktarı ve sıcaklık sabit tutulursa dış basıncın artması ise hacmi küçültür. T sıcaklığını oranlarken kelvin kullan.",
  ],
  table: {
    layout: "table",
    headers: ["Değişiklik", "Son basınç", "Son hacim"],
    rows: [
      [balloonChanges[0].label, "Aynı", "Büyür"],
      [balloonChanges[1].label, "Aynı", "Büyür"],
      [balloonChanges[2].label, "Büyür", "Küçülür"],
    ],
  },
};

export const heatedMembraneExample: WorkedExample = {
  title: "Esnek zar hangi gaz için daha çok yer açar?",
  prompt: "10 L’lik kapta X ve Y başlangıçta 5’er L, 300 K ve 100 kPa. Sızdırmaz zarın direnci ihmal ediliyor. X 450 K’ye çıkarılıyor, Y 300 K’de kalıyor. Son hacimler ve ortak basınç ne olur?",
  strategy: "Eşit son basınçta iki hacmin oranını bul. Toplam hacmi kullanarak bölmeleri hesapla. Son basıncı sıcaklığı değişmeyen Y’den denetle.",
  steps: [
    { label: "Hacim oranı", expression: "Vₓ / Vᵧ = 450 / 300 = 3 / 2", explanation: "Gaz miktarları başta eşit basınç, hacim ve sıcaklıktan dolayı eşit. Son durumda basınçlar eşit ve miktarlar korunuyor." },
    { label: "Toplam hacim", expression: "Vₓ = 6 L, Vᵧ = 4 L", explanation: "3 + 2 = 5 pay 10 L ediyor. Bir pay 2 L.", figureTitle: heatedMembraneTitle },
    { label: "Ortak basınç", expression: "P = 100 × 5 / 4 = 125 kPa", explanation: "Y gazının sıcaklığı ve miktarı sabit. Y 5 L’den 4 L’ye sıkıştığı için basıncı artar. X de aynı son basınçtadır." },
  ],
  answer: "X 6 L, Y 4 L, ortak basınç 125 kPa.",
  check: "6 + 4 = 10 L. X için de (100 × 5 / 300) × (450 / 6) = 125 kPa.",
  pitfall: "Zarın iki yanında son basınç aynı olabilir ve ilk basınçtan farklı olabilir.",
};

export const compressedBalloonExample: WorkedExample = {
  title: "Balon daha yüksek dış basınçta kaç litre olur?",
  prompt: "Direnci ihmal edilen esnek balon, 100 kPa dış basınçta 3 L. Dış basınç 150 kPa oluyor. Gaz miktarı ve sıcaklık sabit. Son hacmi bul.",
  strategy: "İç basıncı dış basınca eşitle. Miktar ve sıcaklık değişmiyorsa PV çarpımını koru.",
  steps: [
    { label: "Denge", expression: "P₁ = 100 kPa, P₂ = 150 kPa", explanation: "Her dengede içerideki basınç dışarıdaki basınca eşit." },
    { label: "Hacim", expression: "V₂ = 100 × 3 / 150 = 2 L", explanation: "Artan dış basınç aynı miktardaki gazı daha küçük hacme sıkıştırır.", figureTitle: compressedBalloonTitle },
  ],
  answer: "2 L.",
  check: "100 × 3 = 150 × 2 = 300 kPa·L.",
  pitfall: "Hacimle dış basıncı doğru orantılı alma. Bu dengelerde hacim, basınç artarken azalır.",
};
