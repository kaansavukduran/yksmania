import type { GuideSection, WorkedExample } from "./guides/types";

export const tuningForkTitle = "Diyapazon havada sesi nasıl oluşturur?";

const tau = 2 * Math.PI;
export const soundMarkerSpacing = 0.32;

export function tuningForkSnapshot(periods: number) {
  const tineOffset = 0.13 * Math.sin(tau * periods);
  const resting = Array.from({ length: 21 }, (_, index) => index * soundMarkerSpacing);
  const moving = resting.map((x) => x + 0.095 * Math.sin(tau * (periods - x / 2.4)));
  const gaps = moving.slice(1).map((right, index) => ({ center: (right + moving[index]) / 2, size: right - moving[index] }));
  const visible = gaps.slice(4, 14);
  const compressed = visible.reduce((smallest, gap) => gap.size < smallest.size ? gap : smallest);
  const rarefied = visible.reduce((largest, gap) => gap.size > largest.size ? gap : largest);
  return { tineOffset, resting, moving, compressed, rarefied };
}

export const tuningForkSection: GuideSection = {
  title: tuningForkTitle,
  figureTitle: tuningForkTitle,
  paragraphs: [
    "Plastik tokmak diyapazonun bir koluna vurduğunda iki kol denge çevresinde titreşir. Dışarı doğru hareket eden kol, yanındaki havayı kısa süreliğine sıkıştırır. Kol geri giderken yakın hava seyrelir. Sıkışma ve seyrelme komşu hava bölgelerine iletilir.",
    "Şemada sağa yayılan sesin tek bir doğrultusuna bakıyoruz. Küçük çizgiler havanın denge konumları. Noktalar aynı doğrultuda bu işaretlerin çevresinde ileri geri hareket eder. Sıkışma bölgesinde komşu noktalar yaklaşır, seyrelmede aralıkları açılır. Hareketlerin görülebilmesi için yer değiştirmeler büyütüldü.",
    "Havada titreşim doğrultusu ile sesin ilerleyişi aynı doğrultudadır. Bu yüzden havadaki ses boyuna dalgadır. Diyapazonun titreşimi darbe sonrasında sönümlenir. Kısa düzenli kesiti inceleyerek bir sıkışmanın nasıl ilerlediğini görebilirsin.",
  ],
  table: {
    layout: "table",
    headers: ["Neye bakıyorum?", "Şemada nasıl görünür?"],
    rows: [["Sıkışma", "Komşu hava noktaları yakın"], ["Seyrelme", "Komşu hava noktaları uzak"], ["Boyuna titreşim", "Noktalar yayılmayla aynı doğrultuda salınır"]],
  },
};

export const tuningForkExample: WorkedExample = {
  title: "Havadaki noktaların aralığından sesin türünü bul",
  prompt: "Bir diyapazon havada titreşiyor. Sağındaki hava noktaları yatay doğrultuda denge çevresinde salınıyor. Bir sıkışma bölgesi sağa ilerliyor. Bu nokta aralığı neyi gösterir ve havadaki dalga hangi türdür?",
  strategy: "Önce komşu hava noktalarının arasına bak. Sonra salınma ile yayılma doğrultusunu karşılaştır.",
  steps: [
    { label: "Aralığı oku", expression: "Daha yakın noktalar → sıkışma", explanation: "Aynı kesitte noktalar birbirine yaklaşınca yerel yoğunluk büyür." },
    { label: "Doğrultuyu eşleştir", expression: "Titreşim doğrultusu ∥ yayılma doğrultusu", explanation: "Havadaki noktalar yatay salınıyor ve sıkışma da yatay ilerliyor. Bu düzen boyuna dalgadır.", figureTitle: tuningForkTitle },
  ],
  answer: "Yakın noktalar sıkışmayı gösterir. Havada yayılan ses mekanik ve boyuna dalgadır.",
  check: "Havanın kendisi titreşir, sıkışma bölgesi ise komşu bölgelere iletilir.",
  pitfall: "Sağa doğru ilerleyeni belirlerken bir noktayı izlemekle sıkışma bölgesini izlemeyi ayır.",
};
