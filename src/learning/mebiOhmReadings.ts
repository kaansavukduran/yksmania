import type { GuideSection, WorkedExample } from "./guides/types";

export const meterConnectionsTitle = "Ölçüm aleti devreyi değiştirmesin";
export const meterSupplyVolts = 8;
export const meterResistanceOhms = 4;
const normalCurrent = meterSupplyVolts / meterResistanceOhms;
export const meterConnections = [
  { label: "İki alet doğru bağlı", inSeries: "A", across: "V", current: normalCurrent, note: `Ampermetre ${normalCurrent} A, voltmetre ${meterSupplyVolts} V ölçer.` },
  { label: "Voltmetre iki uçta", inSeries: null, across: "V", current: normalCurrent, note: "Voltmetre direncin iki ucunu ölçer. İdeal ölçü kolunda akım yok." },
  { label: "Voltmetre seri", inSeries: "V", across: null, current: 0, note: "İdeal voltmetrenin direnci sonsuz. Kapalı akım yolu kalmaz. Akım sıfır." },
  { label: "Ampermetre seri", inSeries: "A", across: null, current: normalCurrent, note: `Direnç ve ampermetre aynı kolda. Akım ${normalCurrent} A.` },
  { label: "Ampermetre iki uçta", inSeries: null, across: "A", current: null, note: "Çok düşük dirençli kol direnci baypas eder. Gerçek akımı kaynak ve bağlantı dirençleri sınırlar." },
] as const;

export const ohmMeasurementsTitle = "Dört ölçümde V–I eğimini oku";
export const sourceOhmPoints = [
  { current: 0.5, voltage: 2 },
  { current: 1, voltage: 4 },
  { current: 1.5, voltage: 6 },
  { current: 2, voltage: 8 },
] as const;

const display = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 });

export function ohmMeasurementDifference(endIndex: 1 | 2 | 3) {
  const from = sourceOhmPoints[0];
  const to = sourceOhmPoints[endIndex];
  const currentDifference = to.current - from.current;
  const voltageDifference = to.voltage - from.voltage;
  return { from, to, currentDifference, voltageDifference, resistance: voltageDifference / currentDifference };
}

export const ohmMeasurementSection: GuideSection = {
  title: ohmMeasurementsTitle,
  figureTitle: ohmMeasurementsTitle,
  paragraphs: [
    "Devrenin akımını dirençle aynı kola seri bağlı ampermetreden oku. Gerilimi, direncin iki ucuna paralel bağlı voltmetreden oku. Ölçülen gerilim yalnız o dirence aittir.",
    "Sıcaklık ve direnç değişmeden dört V–I ölçümü yapılmış. Yatayda I amper, düşeyde V volt. Her ölçümde V/I = 4 Ω. Grafikte iki noktayı birleştiren doğruda düşey farkı yatay farka bölünce yine aynı direnç bulunur.",
    "Eksenler ters yazılırsa eğim I/V olur ve birimi A/V’dir. Bu eğim iletkenliği verir. Ölçümleri karşılaştırırken eksenleri ve birimleri önce oku.",
  ],
  table: {
    layout: "table",
    headers: ["Gerilim (V)", "Akım (A)", "Direnç (Ω)"],
    rows: sourceOhmPoints.map(({ current, voltage }) => [display.format(voltage), display.format(current), display.format(voltage / current)]),
  },
};

const example = ohmMeasurementDifference(2);
export const ohmSlopeExample: WorkedExample = {
  title: "İki ölçüm arasındaki dik üçgenden direnci bul",
  prompt: "Grafikte 0,5 A iken 2 V, 1,5 A iken 6 V. İki ölçüm arasındaki eğim ve eğimin fiziksel anlamı nedir?",
  strategy: "Önce eksenleri oku, sonra her büyüklüğün ikinci değerinden birinci değerini çıkar.",
  steps: [
    { label: "Yatay fark", expression: `ΔI = 1,5 − 0,5 = ${display.format(example.currentDifference)} A`, explanation: "Akım yatay eksende. Üçgenin yatay kenarı, akımların farkıdır." },
    { label: "Düşey fark", expression: `ΔV = 6 − 2 = ${display.format(example.voltageDifference)} V`, explanation: "Gerilim düşey eksende. Düşey kenar iki gerilimin farkıdır." },
    { label: "Eğim", expression: `ΔV / ΔI = 4 / 1 = ${example.resistance} Ω`, explanation: "V/A ohm demektir. Doğrusal ohmik modelde başka bir ölçüm çifti de aynı eğimi verir.", figureTitle: ohmMeasurementsTitle },
  ],
  answer: "Akım başına gerilim artışı 4 V/A. Bu gerilim–akım grafiğinde direnç 4 Ω.",
  check: "2 A akım için V = IR = 2 · 4 = 8 V. Dördüncü ölçüm de bu sonucu veriyor.",
  pitfall: "Yatay farkı düşey farka bölmek eksenleri ters okumaktır.",
};
