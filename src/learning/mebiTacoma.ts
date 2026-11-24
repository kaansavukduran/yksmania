import type { GuideSection, WorkedExample } from "./guides/types";

export const tacomaTitle = "Tacoma Köprüsü’nün hareketini oku";
export const tacomaDeckTitle = "Tabliyenin iki kenarı farklı yönde hareket edebilir";

export const tacomaSection: GuideSection = {
  title: tacomaTitle,
  figureTitle: tacomaTitle,
  paragraphs: [
    "1940 Tacoma Narrows Köprüsü’ne ait ilk arşiv karesinde yol tabliyesi bükülmüş görünüyor. İkinci karede tabliyenin kopan bir parçası ile geride kalan kuleyi karşılaştır. Kareler olayın iki evresini gösterir.",
    "Burulmayı zihninde canlandırmak için tabliyenin enine kesitine bak. Tabliye dönünce bir kenar yükselirken karşı kenar alçalabilir. İki kenarın birlikte yükselmesi düşey hareket olur.",
    "Köprü hareket ettikçe çevresindeki hava akışı değişti. Hava kuvvetleri de dönmeyi besledi. Washington Eyaleti Ulaştırma Bakanlığı, büyüyen bu hareketi burulmalı aeroelastik çırpınma ile açıklar. Diyapazon modelinde ikinci diyapazonu belirli frekanstaki bir ses zorluyordu. Köprüde yapının hareketi ile hava akışı birbirini etkiledi.",
  ],
};

export const tacomaExample: WorkedExample = {
  title: "Tabliye yükseliyor mu, buruluyor mu?",
  prompt: "Enine kesitte yolun sol kenarı yükselirken sağ kenarı alçalıyor. Bu, tabliyenin hangi hareketinin işaretidir?",
  strategy: "İki kenarın aldığı yönü karşılaştır. Aynı yön düşey taşınmaya, zıt yönler dönmeye işaret eder.",
  steps: [
    { label: "İki kenarın yönünü işaretle", explanation: "Sol kenar yukarı, sağ kenar aşağı. Kesit, yol boyunca uzanan eksenin çevresinde döner.", figureTitle: tacomaDeckTitle },
    { label: "Gözlemin sınırını belirle", explanation: "Bir kare tabliyenin biçimini gösterir. Hava akışı ile hareket arasındaki ilişkiyi mühendislik incelemesi açıklar.", figureTitle: tacomaTitle },
  ],
  answer: "İki kenarın zıt hareketi burulmanın işaretidir.",
  check: "Oklar aynı yönü gösterseydi düzenek tüm kesitin düşey hareketine örnek olurdu.",
  pitfall: "Tek arşiv karesinden rüzgârın kuvvetini veya hareketin frekansını ölçmeye çalışma.",
};
