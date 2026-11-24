import type { GuideSection, WorkedExample } from "./guides/types";

export const tsunamiCoastTitle = "Kıyıda doğal uyarı ve tahliye yönü";
export const coastRetreatTitle = "Kıyıda suyun çekilmesini fark et";
export const coastEvacuationTitle = "Kıyıdan uzak ve yüksek yöne ilerle";

export const tsunamiCoastSection: GuideSection = {
  title: tsunamiCoastTitle,
  figureTitle: tsunamiCoastTitle,
  paragraphs: [
    "Kıyıda güçlü ya da uzun süren bir deprem, denizin alışılmadık biçimde çekilmesi veya suyun güçlü uğultusu tsunami uyarısı olabilir. Su her tsunamiden önce çekilmez. Normal gelgit ile ani, olağandışı değişim aynı gözlem değildir.",
    "Sarsıntı sona erince güvenli biçimde kıyıdan uzaklaş. Yerel tahliye işaretlerini izleyerek daha yüksek veya daha iç kesimdeki güvenli alana yönel. Uzaklaşırken gecikmeden uyarabileceğin kişilere haber ver. Deniz tabanını görmek için kıyıya yaklaşma.",
    "Tsunami birkaç dalga halinde gelebilir. İlk dalga geçince kıyıya geri dönmek güvenli sayılmaz. Resmî duyuru ve yerel tahliye planı gerçek kıyıdaki yönü belirler. Çizim örnek bir kıyı kesitidir.",
  ],
};

export const tsunamiCoastExample: WorkedExample = {
  title: "Sarsıntıdan sonra kıyıdaki su hızla çekiliyor",
  prompt: "Kıyı yakınındasın. Uzun sarsıntı yeni bitti ve su alışılmadık biçimde kıyıdan çekiliyor. Kesitte hangi yöne gitmek daha güvenli?",
  strategy: "Uyarı işaretini önce tanı. Sonra kıyıdan uzaklaşan ve yükselen yolu seç.",
  steps: [
    { label: "Olağandışı değişimi fark et", explanation: "Suyun hızla çekilmesi doğal bir tsunami uyarısı olabilir. Açığa çıkan zemini incelemek için kıyıya yaklaşma.", figureTitle: coastRetreatTitle },
    { label: "Tahliye yönünü izle", explanation: "Sarsıntı sona erdiğinde kıyıdan içeri ve yükseğe yönel. Yerel tahliye tabelalarını izle ve yol üzerinde gecikmeden uyarabileceğin kişilere haber ver.", figureTitle: coastEvacuationTitle },
  ],
  answer: "Kıyıdan içeri ve güvenli yüksek yere giden tahliye yolunu izle.",
  check: "Çizimde yol, sudan uzaklaşıyor ve yükseliyor.",
  pitfall: "Uyarıyı teyit etmek için kıyıda ilk dalgayı bekleme.",
};
