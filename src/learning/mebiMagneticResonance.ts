import type { GuideSection, WorkedExample } from "./guides/types";
import { ultrasoundDepthTitle } from "./mebiUltrasound";

export const magneticResonanceTitle = "MR’de radyo dalgasıyla rezonans";
export const magneticMatchTitle = "Radyo darbesinin frekansını karşılaştır";
export const magneticSignalTitle = "Darbe bitince dönen sinyal algılanır";
export const resonanceFrequency = 100;
export const radioFrequency = { min: 85, max: 115, step: 5, init: 100 } as const;

export const magneticResonanceSection: GuideSection = {
  title: magneticResonanceTitle,
  figureTitle: magneticResonanceTitle,
  paragraphs: [
    "MR cihazının güçlü mıknatısı incelenen bölgede manyetik alan oluşturur. Dokudaki hidrojen çekirdeklerinin toplu manyetik tepkisini tek bir okla düşün. Bu ok manyetik alan yönüne yakın bir denge durumu gösterir.",
    "Cihaz uygun frekansta bir radyo darbesi gönderdiğinde bu toplu yön değişebilir. Bu etkileşim manyetik rezonanstır. İlk resimde radyo darbesinin temsilî frekansını değiştir ve çekirdeklerin model frekansıyla eşleştir.",
    "Darbe bittikten sonra çekirdeklerin toplu hareketi değişirken alıcı bobin bir radyo sinyali ölçer. Sinyal farklı dokularda farklı görünür. Cihaz çok sayıda ölçümden görüntü kurar. Burada iletilen dalga elektromanyetik radyo dalgasıdır. Ultrasonun kullandığı mekanik ses dalgasından ayrı bir yöntemdir.",
  ],
};

export const magneticResonanceExample: WorkedExample = {
  title: "Manyetik rezonansla ultrasonun sinyallerini ayır",
  prompt: "Bir aygıtta hidrojen çekirdeklerinin frekansına uyan radyo darbeleri kullanılıyor. Diğer aygıtta doku sınırından yansıyan ses ölçülüyor. Hangi ölçüm hangi yönteme aittir?",
  strategy: "Önce gönderilen dalganın türünü, sonra alıcının ölçtüğü sinyalin kaynağını bul.",
  steps: [
    { label: "Radyo darbesinin neyi etkilediğini bul", explanation: "Rezonans koşuluna uyan radyo frekansı, hidrojen çekirdeklerinin toplu manyetik yönünü değiştirir.", figureTitle: magneticMatchTitle },
    { label: "MR alıcısının sinyalini takip et", explanation: "MR’de alıcı bobin, darbe bittikten sonra çekirdeklerden gelen radyo sinyalini ölçer.", figureTitle: magneticSignalTitle },
    { label: "Ultrasonun geri gelen sesine bak", explanation: "Ultrason başlığı doku sınırlarından yansıyan mekanik sesi alır. Aynı süratte daha uzak sınırın yankısı daha geç gelir.", figureTitle: ultrasoundDepthTitle },
  ],
  answer: "Radyo darbesi ve bobin MR’ye, yansıyan mekanik ses ultrasona aittir.",
  check: "MR örneğinde yankı süresinden dokuya olan ses mesafesi hesaplanmıyor.",
  pitfall: "İki yöntemde de bir sinyal geri geldiği için ikisini ultrason diye adlandırma.",
};
