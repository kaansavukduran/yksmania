import type { GuideSection, WorkedExample } from "./guides/types";

export const tsunamiFormationTitle = "Deniz tabanından su dalgasına";
export const tsunamiDepthTitle = "Derinlik, sürat ve dalga boyu";
export const tsunamiDisplacementTitle = "Su sütunu tabanla birlikte yükseliyor";
export const tsunamiComparisonTitle = "İki derinliği tek ölçekte karşılaştır";

export const tsunamiDepth = { min: 100, max: 4000, step: 100, init: 4000 } as const;
export const tsunamiReferenceDepthM = 100;
export const tsunamiPeriodSeconds = 600;
const gravity = 9.8;

export function tsunamiAt(depthM: number) {
  const speedMS = Math.sqrt(gravity * depthM);
  return { speedMS, wavelengthKm: speedMS * tsunamiPeriodSeconds / 1000 };
}

export const tsunamiFormationSection: GuideSection = {
  title: tsunamiFormationTitle,
  figureTitle: tsunamiFormationTitle,
  paragraphs: [
    "Tsunami, büyük miktarda suyun aniden yer değiştirmesiyle oluşan uzun dalgalar dizisidir. Bazı deniz altı depremlerinde tabanın bir bölümü düşey yönde hareket eder. Üstündeki su da yer değiştirir ve dalgalar kaynaktan uzaklaşır.",
    "Her deniz altı depremi tsunami oluşturmaz. Ani taban hareketinin biçimi ve büyüklüğü önemlidir. Deniz altı heyelanı ve bazı volkanik olaylar da suyu yerinden oynatabilir.",
    "Tsunaminin dalga boyu açık denizde çok uzun olabilir. Kıyıya doğru sığlaşan denizde dalga yavaşlayabilir, dalga boyu kısalabilir ve dalga yüksekliği artabilir. Gerçek kıyıdaki su yüksekliği, tabanın ve kıyının biçimine de bağlıdır.",
  ],
};

export const tsunamiDepthSection: GuideSection = {
  title: tsunamiDepthTitle,
  figureTitle: tsunamiDepthTitle,
  paragraphs: [
    "Dalga boyu su derinliğinden çok büyük olduğunda sürat yaklaşık √(g × h) olur. g yerçekimi ivmesi, h su derinliğidir. Aynı dalga bir bölgeden diğerine geçerken örnekte periyot 10 dakika kalır.",
    "Derinliği değiştir. Üst çizgi seçilen derinlikteki, alt çizgi 100 m derinlikteki tepe aralığını aynı ölçekte gösterir. Ölçek yatay uzaklığa aittir. Dalganın yüksekliği bu hesapla bulunmaz.",
  ],
};

export const tsunamiExample: WorkedExample = {
  title: "Derinlik azalınca tepe aralığı ne olur?",
  prompt: "Örnek dalganın periyodu 10 dakika. Deniz derinliği 4.000 m’den 100 m’ye azalıyor. Uzun dalga modelinde sürat ve tepe aralığı büyür mü, küçülür mü?",
  strategy: "Önce suyu harekete geçiren olayı göster. İki derinlik için sürati ve sabit periyottaki tepe aralığını karşılaştır.",
  steps: [
    { label: "Düşey taban hareketini bul", explanation: "Taban yükselince su sütunu yer değiştirir. Yüzeyde oluşan dalga kaynaktan uzaklaşabilir.", figureTitle: tsunamiDisplacementTitle },
    { label: "İki tepe aralığını aynı ölçekte oku", expression: "λ = v × T", explanation: "Periyot aynı olduğunda daha küçük sürat, daha kısa tepe aralığı demektir.", figureTitle: tsunamiComparisonTitle },
  ],
  answer: "100 m derinlikte sürat ve tepe aralığı daha küçüktür.",
  check: "4.000 m’de yaklaşık 198 m/s ve 118,8 km. 100 m’de yaklaşık 31 m/s ve 18,8 km.",
  pitfall: "Yatay dalga boyunu, dalganın yüksekliği olarak yorumlama.",
};
