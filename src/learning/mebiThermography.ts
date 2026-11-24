import type { GuideSection, WorkedExample } from "./guides/types";

export const thermographyTitle = "Termal görüntüde renk ölçeğini oku";
export const thermographyPhotoTitle = "Termal kameranın gerçek ekranı";
export const thermographySourceURL = "https://commons.wikimedia.org/w/index.php?title=File:Thermal-image.jpg&oldid=1278846404";

export function fahrenheitToCelsius(value: number) {
  return (value - 32) * 5 / 9;
}

export const thermographySection: GuideSection = {
  title: thermographyTitle,
  figureTitle: thermographyPhotoTitle,
  paragraphs: [
    "Kızılötesi ışığı gözle göremeyiz. Termal kamera, algılayıcısına ulaşan kızılötesi ışınımdan yüzeye ilişkin değerler hesaplar. Ekran görünür renkleri bu değerlere atar. Ekrandaki mavi ve kırmızı, kameranın göstermeyi seçtiği renklerdir.",
    "Fotoğrafta bir müze düzeneğinin gerçek termal ekranı var. Sağdaki ölçek aşağıda 69, yukarıda 101 değerini gösteriyor. Üstteki merkez okumasında +71,6 °F yazıyor. Birim Fahrenheit. Ekranın tamamını tek bir kişinin sıcaklığı diye okuma.",
    "Renk yorumunu aynı görüntünün anahtarına göre yap. Başka bir renk ölçeğinde aynı renk başka bir değere karşılık gelebilir. Uzaklık, yüzey özellikleri ve cihaz ayarları sıcaklık yorumunu etkileyebilir.",
  ],
  table: {
    layout: "table",
    headers: ["Ekrandaki işaret", "Okunacak bilgi"],
    rows: [["Sağdaki renk çubuğu", "Bu görüntüdeki renk aralığı 69–101 °F"], ["+71,6 °F", "Merkezde işaretlenen bölgenin ekran okuması"], ["°F", "Fahrenheit birimi"]],
  },
};

export const thermographyExample: WorkedExample = {
  title: "Ekrandaki 71,6 °F değerini Celsius olarak yaz",
  prompt: "Termal kamera ekranındaki +71,6 °F merkez okumasını veri olarak kullan. Bu okuma Celsius cinsinden kaç derecedir?",
  strategy: "Önce birimi ve sayıyı ekran görüntüsünden ayır. Sonra Fahrenheit değerini dönüştür.",
  steps: [
    { label: "Ölçeği oku", expression: "+71,6 °F", explanation: "Bu sayı merkez işaretine ait ekran okumasıdır. Renk çubuğunun alt ve üst değerlerinden ayrı okunur.", figureTitle: thermographyPhotoTitle },
    { label: "Celsius’a çevir", expression: "(71,6 − 32) × 5/9 = 22 °C", explanation: "Önce Fahrenheit sıfır kaymasını çıkar. Sonra derece aralıklarının oranını uygula." },
  ],
  answer: "Ekrandaki merkez okuması Celsius cinsinden 22 °C’dir.",
  check: "22 × 9/5 + 32 = 71,6 °F.",
  pitfall: "Görüntünün renklerini birim yerine kullanma. Sayı ve birim cihazın ekranında ayrı yazıyor.",
};
