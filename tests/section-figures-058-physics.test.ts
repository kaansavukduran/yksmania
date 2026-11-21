import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";

// Forge058 AYT Fizik figürleri: etiketteki ve sonuç satırındaki sayılar
// rehberdeki öğretim örnekleriyle aynı hesaptan gelmeli.
const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const frameText = (guide: string, title: string, value: number, step = 0) => {
  const f = fig(guide, title).draw(value, step);
  const labels = f.els.flatMap((e) => (e.k === "text" ? [e.s] : e.k === "pt" && e.label ? [e.label] : []));
  return { labels, readout: (f.readout ?? []).join(" ") };
};

const GUIDES = [
  "vektorler",
  "bagil-hareket",
  "nehir-problemleri",
  "dusey-atis",
  "ayt-newton-hareket-yasalari",
  "kesisen-kuvvetler-dengesi",
  "itme-momentum",
  "elektrik-alan",
  "elektriksel-potansiyel",
  "duzgun-alan-paralel-levhalar",
  "sigaclar-kondansatorler",
  "manyetik-alan-ayt",
  "alternatif-akim",
  "su-dalgalarinda-girisim",
  "isik-teorileri",
  "atom-modelleri-fizik",
];

describe("Forge058 AYT Fizik bölüm figürleri", () => {
  it("16 dersin her birine en az dört figür kaydeder", () => {
    for (const g of GUIDES) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(Object.keys(sectionFigures[g] ?? {}).length, g).toBeGreaterThanOrEqual(4);
    }
  });

  it("vektör bileşenleri ve fark rehberdeki sayıları verir", () => {
    expect(frameText("vektorler", "Bileşen işaretini bölgeden bul", 0, 0).readout).toContain("|A| = √(9 + 16) = 5 birim");
    expect(frameText("vektorler", "Çıkarma, ters vektörü eklemektir", 0, 1).labels).toContain("A − B = (3, −7)");
    expect(frameText("vektorler", "Açı, bileşkenin mümkün aralığını belirler", 120).readout).toContain("= 10 N = F");
  });

  it("nehir: dik yönelmede 24 s ve 72 m sürüklenme", () => {
    const t = frameText("nehir-problemleri", "Sürüklenme ve alınan yollar", 0);
    expect(t.readout).toContain("t = 120/5 = 24 s");
    expect(t.labels).toContain("x = 72 m");
    expect(frameText("nehir-problemleri", "Akıntı boyunca gidiş ve dönüş", 3).readout).toContain("= 3,2 m/s");
  });

  it("düşey atış: 25 m seviyesine 1 s ve 5 s’de ulaşılır, 50 m erişilemez", () => {
    expect(frameText("dusey-atis", "İki kök ve erişilebilir yükseklik", 25).readout).toContain("1 s ve 5 s");
    expect(frameText("dusey-atis", "İki kök ve erişilebilir yükseklik", 50).readout).toContain("gerçek kök yok");
  });

  it("kuvvet hesapları: makara, iki ip, kenetlenme", () => {
    expect(frameText("kesisen-kuvvetler-dengesi", "İki denklem, iki gerilme", 30).labels).toEqual(expect.arrayContaining(["TL = 50 N", "TR = 86,6 N"]));
    expect(frameText("ayt-newton-hareket-yasalari", "Sabit ideal makara: gerilmeyi alt cisimden doğrula", 0.8).readout).toContain("T = 20 N");
    expect(frameText("itme-momentum", "Esnek çarpışmanın ikinci denklemi", 0).readout).toContain("36 J → 24 J");
    expect(frameText("itme-momentum", "Kuvvet–zaman grafiğinde alan işaretlidir", 6).readout).toContain("= 20 kg·m/s");
  });

  it("elektrik: sıfır alan noktaları x = 2 m ve x = 6 m", () => {
    expect(frameText("elektrik-alan", "Eşit olmayan aynı işaretli kaynakta sıfır nokta", 2).labels).toContain("E_net = 0");
    expect(frameText("elektrik-alan", "Eşit olmayan zıt kaynakta dış bölgeyi sınamak", 6).labels).toContain("E_net = 0");
    expect(frameText("elektriksel-potansiyel", "Noktasal kaynağın potansiyeli", 0.5).readout).toContain("−36.000 V");
    expect(frameText("duzgun-alan-paralel-levhalar", "Gerilimle uzaklık alanı birlikte belirler", 5).labels).toContain("E = 2.000 V/m");
    expect(frameText("sigaclar-kondansatorler", "Enerji neden yarım QV’dir?", 10).labels).toContain("U = 100 μJ");
  });

  it("manyetik alan ve alternatif akım değerleri", () => {
    expect(frameText("manyetik-alan-ayt", "Düz telin büyüklüğü ters birinci uzaklıktır", 0.1).labels).toContain("10 μT");
    expect(frameText("alternatif-akim", "Periyot, frekans ve açısal frekans", 50).labels).toContain("T = 0,02 s");
    expect(frameText("alternatif-akim", "Empedansın büyüklüğü ve fazı birlikte gerekir", 20).readout).toContain("Z = √(30² + (60 − 20)²) = 50 Ω");
    expect(frameText("alternatif-akim", "Rezonans hangi devrede akımı büyütür?", 50).readout).toContain("50,3 Hz");
  });

  it("dalga ve atom: çizgi sayısı, saçak aralığı, Lyman çizgisi", () => {
    expect(frameText("su-dalgalarinda-girisim", "Gerçek girişim çizgileri hiperboldür", 2).readout).toContain("5 katar çizgisi (merkez dahil), 6 düğüm çizgisi");
    expect(frameText("isik-teorileri", "Saçak aralığını geometriyle üret", 600).labels).toContain("Δy = 4 mm");
    expect(frameText("atom-modelleri-fizik", "Hidrojen serilerini son düzeyle tanı", 1, 0).labels).toContain("10,2 eV");
    expect(frameText("atom-modelleri-fizik", "Bir atom, çok atom ve tayf çizgisi sayısı", 4).readout).toContain("4·3/2 = 6");
  });
});
