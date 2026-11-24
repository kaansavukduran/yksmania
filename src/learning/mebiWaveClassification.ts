import type { GuideSection, WorkedExample } from "./guides/types";

export const waveClassificationTitle = "Dalgaları iki ölçütle sınıflandır";

type WaveExample = {
  name: string;
  medium: "Mekanik" | "Elektromanyetik";
  direction: "Enine" | "Boyuna" | "Yatay ve düşey bileşenler";
  explanation: string;
};

export const waveClassificationExamples: readonly WaveExample[] = [
  { name: "Yatay tel", medium: "Mekanik", direction: "Enine", explanation: "Dalga tel boyunca giderken telin noktaları düşey titreşir. Yayılma ile titreşim yönü diktir." },
  { name: "Havada ses", medium: "Mekanik", direction: "Boyuna", explanation: "Hava tanecikleri sıkışma ve seyrelmenin ilerlediği doğrultuda denge çevresinde salınır." },
  { name: "Boşlukta ışık", medium: "Elektromanyetik", direction: "Enine", explanation: "Elektrik ve manyetik alanlar boşlukta da yayılabilir. Düzlem dalgada alanların değişim doğrultusu yayılmaya diktir." },
  { name: "Su yüzeyi", medium: "Mekanik", direction: "Yatay ve düşey bileşenler", explanation: "Yüzey dalgasında su parçacıklarının hareketi iki bileşen içerebilir. Aynı şema her derinlikteki akışı kesin olarak göstermez." },
  { name: "Deprem P dalgası", medium: "Mekanik", direction: "Boyuna", explanation: "Madde sıkışıp gevşer. Yer parçacıkları ilerleme doğrultusuna paralel titreşir." },
  { name: "Deprem S dalgası", medium: "Mekanik", direction: "Enine", explanation: "Katı ortamda yer parçacıkları dalganın ilerleme doğrultusuna dik titreşir." },
];

export const waveClassificationSection: GuideSection = {
  title: waveClassificationTitle,
  figureTitle: waveClassificationTitle,
  paragraphs: [
    "İlk soru, dalganın yayılmak için maddesel bir ortama ihtiyaç duyup duymadığıdır. Tel, su, ses ve deprem dalgaları mekaniktir. Işık elektromanyetiktir ve boşlukta da yayılabilir. Her iki dalga türü enerji taşır.",
    "İkinci soru, titreşim doğrultusunun yayılmaya göre nasıl yerleştiğidir. Dikey titreşim ve yatay yayılma dik ise enine dalga. Sıkışıp seyrelme yayılmayla aynı doğrultudaysa boyuna dalga. Su yüzeyi örneğinde parçacık hareketi yatay ve düşey bileşenler içerebilir.",
    "Aynı dalga iki soruya da cevap verir. Yatay tel ve havada ses, ortam bakımından aynı gruptadır. Titreşim yönleri farklıdır. Şemadaki örneği seçerek iki ölçütün sonucunu birlikte oku.",
  ],
  table: {
    layout: "table",
    headers: ["Örnek", "Ortam ölçütü", "Titreşim doğrultusu"],
    rows: waveClassificationExamples.map((example) => [example.name, example.medium, example.direction]),
  },
};

export const waveClassificationExample: WorkedExample = {
  title: "Tel ve havadaki sesi iki soruyla ayır",
  prompt: "Yatay telin bir ucunu düşey sallıyorsun. Yakında havada bir ses dalgası ilerliyor. Her örneği ortam gereksinimi ve titreşim doğrultusuna göre sınıflandır.",
  strategy: "Her dalgaya önce ortam sorusunu sor. Sonra titreşimle yayılma doğrultusunu karşılaştır.",
  steps: [
    { label: "Ortam", expression: "Tel → mekanik, havada ses → mekanik", explanation: "Birincisi telin, ikincisi havanın parçacıkları aracılığıyla yayılır." },
    { label: "Doğrultu", expression: "Tel → enine, havada ses → boyuna", explanation: "Teldeki düşey titreşim, yatay yayılmaya diktir. Havadaki titreşim, sıkışmanın ilerlediği doğrultudadır.", figureTitle: waveClassificationTitle },
  ],
  answer: "Tel dalgası mekanik ve enine. Havada ses mekanik ve boyuna.",
  check: "İki örnek ortam bakımından aynı, titreşim yönü bakımından farklı sonuç verdi.",
  pitfall: "Birinci ölçütten sonra ikinci ölçüt için yönleri ayrıca çiz. İki cevap dalganın ayrı özelliklerini söyler.",
};
