import type { GuideSection, WorkedExample } from "./guides/types";

export const measuredChannelTitle = "Su kanalında geniş ve dar kesitin ölçümlerini oku";
export const idealChannelTitle = "Yatay boruda kesit değişirken debi korunur";
export const idealChannelExampleTitle = "Dar kesitin statik basıncını hesapla";

export const channelMeasurements = [
  { section: "Geniş kesit", speed: 1.4, pressure: 114 },
  { section: "Dar kesit", speed: 6.1, pressure: 94 },
] as const;

const wideArea = 4;
const wideSpeed = 2;
const widePressure = 114;
const waterDensity = 1000;

export function idealChannelState(area: number) {
  const speed = wideArea * wideSpeed / area;
  const pressure = widePressure - waterDensity * (speed ** 2 - wideSpeed ** 2) / 2000;
  return { area, speed, pressure, flowLitresPerSecond: wideArea * wideSpeed / 10 };
}

export const measuredChannelSection: GuideSection = {
  title: measuredChannelTitle,
  figureTitle: measuredChannelTitle,
  paragraphs: [
    "Kesit, akışa dik bir düzlemde suyun kapladığı alandır. Kaynak şemasında dar yerde su daha hızlı akıyor ve duvara etki eden statik basınç daha düşük ölçülüyor. Ölçümleri aynı yatay çizgiden okunan ideal bir modelin kesin hesap sonucu olarak kullanma. Kaynak şekilde yükseklik farkı ve kayıplar verilmemiştir.",
    "Önce aynı ölçüm yerinin hız ve basınç sayılarını bir çift olarak oku. Geniş noktada 1,4 m/s ile 114 kPa, dar noktada 6,1 m/s ile 94 kPa birlikte verilmiş.",
  ],
  table: {
    layout: "table",
    headers: ["Ölçüm yeri", "Sürat (m/s)", "Statik basınç (kPa)"],
    rows: channelMeasurements.map(({ section, speed, pressure }) => [section, String(speed).replace(".", ","), String(pressure)]),
  },
};

export const idealChannelSection: GuideSection = {
  title: idealChannelTitle,
  figureTitle: idealChannelTitle,
  paragraphs: [
    "Kararlı, sıkıştırılamaz akışta birim zamanda geçen hacim, kesit alanı ile ortalama süratin çarpımıdır. Bir giriş ve bir çıkış varsa aynı debi iki kesitten de geçer. Daralan kesitte bu yüzden sürat artar.",
    "Aynı akım çizgisinde kayıp ve pompa ihmal edilirse Bernoulli bağıntısı P + ρv²/2 + ρgh = sabit der. h, seçilen referansa göre yüksekliktir. Yatay boruda yükseklik terimleri eşit. Sürat terimi büyüdüğünde statik basınç terimi küçülür.",
    "Yükseklik, bağlantı veya kayıp değişiyorsa yalnız sürati karşılaştırmak yeterli değildir. Durgun suda geminin taşıyıcı kuvvetini Arşimet ilkesiyle bul. Boru modeli hareketli akış içindir.",
  ],
};

export const idealChannelExample: WorkedExample = {
  title: "Yatay boruda alan yarıya inerse basınç ne olur?",
  prompt: "Yatay ideal bir su borusunda A₁ = 4 cm², v₁ = 2 m/s ve P₁ = 114 kPa. Dar kesit A₂ = 2 cm². Su yoğunluğu 1000 kg/m³. Akış kararlı, kayıpsız ve pompasız. Dar kesitin sürati ve statik basıncı nedir?",
  strategy: "Önce debiyi iki kesitte eşitle. Sonra aynı yükseklik koşuluyla basınç farkını bul.",
  steps: [
    { label: "Debi", expression: "v₂ = 4 × 2 / 2 = 4 m/s", explanation: "A₁v₁ = A₂v₂. İki kesitin alanı aynı birimde, oranlarını doğrudan kullanabilirsin." },
    { label: "Hız terimi", expression: "ρ(v₂² − v₁²)/2 = 1000 × (16 − 4)/2 = 6000 Pa", explanation: "Yükseklikler eşit, su yoğunluğu sabit. Süratin karesini kullan ve 6000 Pa değerini 6 kPa olarak çevir." },
    { label: "Son basınç", expression: "P₂ = 114 − 6 = 108 kPa", explanation: "Dar kesitte hız terimi büyüdü. Aynı toplamı korumak için statik basınç azaldı.", figureTitle: idealChannelExampleTitle },
  ],
  answer: "4 m/s ve 108 kPa.",
  check: "114 + 2 = 108 + 8 = 116 kPa. Bunlar statik basınç ve hız teriminin toplamlarıdır.",
  pitfall: "Kaynaktaki su kanalının 94 kPa ölçümünü bu ideal borunun sonucuna taşıma. Şekiller farklı koşulları gösterir.",
};
