import type { GuideSection, WorkedExample } from "./guides/types";

export const electroscopeTitle = "Yaprak kapanınca elektroskop nötr mü?";

const initialRegionCharge = 1;

export function electroscopeInduction(electronShift: number) {
  const knob = initialRegionCharge + electronShift;
  const leaves = initialRegionCharge - electronShift;
  return { knob, leaves, total: knob + leaves };
}

export function electroscopeChargeText(value: number) {
  if (value === 0) return "0";
  return value > 0 ? `+${value}` : `−${-value}`;
}

const regions = [
  ["Uzak", 0, "Açık"],
  ["Yaklaşır", 1, "Kapalı"],
  ["Daha yakın", 2, "Yeniden açık"],
] as const;

export const electroscopeSection: GuideSection = {
  title: electroscopeTitle,
  figureTitle: electroscopeTitle,
  paragraphs: [
    "Elektroskop başlangıçta pozitif. Negatif çubuk topuza dokunmadan yaklaşınca elektronları yapraklara doğru iter. Uzaklık değiştikçe yapraklardaki fazla pozitif yük önce azalır. Yapraklar çok az yüklendiğinde kapanabilir.",
    "Çubuk yeterince yaklaştığında modelde yaprak bölgesinde negatif yük fazlası oluşur. İki yaprak da aynı işaretli olduğundan yeniden açılır. Kaydırıcıyı başlangıca getir ve çubuk uzaklaşınca dağılımın nasıl geri döndüğünü izle. Temas veya toprak bağlantısı olmadığında elektroskobun toplam yükü +2 model birimi kalır.",
    "Şekildeki sayılar yerel yükleri karşılaştırmak için seçilmiş model birimleridir. Kaydırıcı uzaklık ölçmez ve yaprak açısı nicel yük ölçümü vermez. Dokunmada ise çubuktan elektroskoba yük geçebilir. Son yüklerin paylaşımı temas eden iletkenlerin geometrisine bağlıdır.",
  ],
  table: {
    headers: ["Çubuğun durumu", "Yaprak bölgesi", "Gözlem"],
    rows: regions.map(([distance, effect, observation]) => [
      distance, electroscopeChargeText(electroscopeInduction(effect).leaves), observation,
    ]),
  },
};

const closed = electroscopeInduction(1);
const reopened = electroscopeInduction(2);
export const electroscopeExample: WorkedExample = {
  title: "Kapanan yapraklarla toplam yükü karşılaştır",
  prompt: "Pozitif elektroskobun topuz ve yaprak bölgeleri başlangıçta +1, +1 model birimidir. Negatif çubuk dokunmadan yaklaşırken elektronlar önce 1, sonra 2 model birimi kadar yapraklara kayıyor. Yapraklar kapanırken ve yeniden açılırken toplam yükü bul.",
  strategy: "Yaprak bölgesine eklenen elektronların topuz bölgesinden ayrıldığını izle.",
  steps: [
    { label: "Yapraklar kapanabilir", expression: `(${electroscopeChargeText(closed.knob)}) + (${electroscopeChargeText(closed.leaves)}) = ${electroscopeChargeText(closed.total)}`, explanation: "Yaprak bölgesinde model yükü sıfır. Topuzda pozitif yük var." },
    { label: "Yapraklar yeniden açılabilir", expression: `(${electroscopeChargeText(reopened.knob)}) + (${electroscopeChargeText(reopened.leaves)}) = ${electroscopeChargeText(reopened.total)}`, explanation: "Kaydırıcıda 2’yi seç. Yaprak bölgesi negatif, elektroskobun tamamı pozitif.", figureTitle: electroscopeTitle },
  ],
  answer: "Elektroskobun toplam yükü her iki durumda da +2 model birimi.",
  check: "Çubuk uzaklaşınca elektronlar başlangıçtaki gibi dağılır ve toplam +2 kalır.",
  pitfall: "Yaprakların kapanmasından bütün elektroskobun nötr olduğu sonucunu çıkarma.",
};
