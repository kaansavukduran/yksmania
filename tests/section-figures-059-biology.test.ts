import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";

// Forge059 AYT Biyoloji figürleri: etiketteki ve sonuç satırındaki sayılar
// bölüm metnindeki öğretim örnekleriyle aynı hesaptan gelmeli.
const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const frameText = (guide: string, title: string, value = 0, step = 0) => {
  const f = fig(guide, title).draw(value, step);
  const labels = f.els.flatMap((e) => (e.k === "text" ? [e.s] : []));
  return { labels, readout: (f.readout ?? []).join(" ") };
};

const GUIDES = [
  "dolasim-kalp",
  "soluk-alisverisi",
  "solunum-organlar",
  "solunum-gaz-tasinmasi",
  "endokrin-tiroit",
  "endokrin-paratiroit",
  "endokrin-hipotalamus",
  "endokrin-pankreas",
  "kas-doku",
  "uriner-organlar",
  "sindirim-enzimler-hormonlar",
  "ayt-protein-sentezi",
  "ayt-fotosentez-tepkimeler",
  "solunum-oksijenli-bilanco",
  "ekoloji-populasyon",
  "ekoloji-komunite",
  "ureme-embriyonik-gelisim",
  "ureme-gametogenez",
];

describe("Forge059 AYT Biyoloji bölüm figürleri", () => {
  it("18 dersin her birine en az dört figür kaydeder", () => {
    for (const g of GUIDES) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(Object.keys(sectionFigures[g] ?? {}).length, g).toBeGreaterThanOrEqual(4);
    }
  });

  it("her figür başlığı ölçek ya da model durumunu açıkça söyler", () => {
    for (const g of GUIDES)
      for (const [title, def] of Object.entries(sectionFigures[g]))
        expect(def.caption, `${g} / ${title}`).toMatch(/ölçekli|model|örnek|nitel|bölüm|kaynağın|varsayımsal|yaklaşık|düşünce deneyi|oyuncak|=/i);
  });

  it("debi atım hacmi × atım sayısından hesaplanır", () => {
    expect(frameText("dolasim-kalp", "Atım hacminden dakikalık debiye", 75).readout).toContain("70 × 75 = 5.250 mL/dk");
    expect(frameText("dolasim-kalp", "Atım hacminden dakikalık debiye", 75).readout).toContain("0,8 s");
    expect(frameText("dolasim-kalp", "Atım hacminden dakikalık debiye", 60).readout).toContain("4.200 mL/dk");
  });

  it("ventilasyon senaryoları bölümdeki 6 / 4,2 ve 6 / 2,4 L/dk değerlerini verir", () => {
    const a = frameText("soluk-alisverisi", "Aynı toplam, farklı etkin yeni hava", 0, 0).readout;
    const b = frameText("soluk-alisverisi", "Aynı toplam, farklı etkin yeni hava", 0, 1).readout;
    expect(a).toContain("Toplam 6 L/dk, alveoler 4,2 L/dk");
    expect(b).toContain("Toplam 6 L/dk, alveoler 2,4 L/dk");
  });

  it("difüzyon oyuncak modeli J = kAΔP/T", () => {
    const t = "Difüzyon modelinde işaret ve birimi koru";
    expect(frameText("solunum-organlar", t, 0, 0).readout).toContain("J = 6");
    expect(frameText("solunum-organlar", t, 0, 1).readout).toContain("J = 12");
    expect(frameText("solunum-organlar", t, 0, 2).readout).toContain("J = 3");
    expect(frameText("solunum-organlar", t, 0, 3).readout).toContain("J = −6");
  });

  it("kayan filament: A sabit, I = L − 1,6, H = en büyük(0, L − 2,0)", () => {
    const t = "Kayan filamentte ne değişir, ne sabit kalır?";
    expect(frameText("kas-doku", t, 2.6).readout).toContain("I toplamı 1 µm, H = 0,6 µm, A = 1,6 µm");
    expect(frameText("kas-doku", t, 2.0).readout).toContain("H = 0 µm");
    expect(frameText("kas-doku", t, 3.2).readout).toContain("I toplamı 1,6 µm, H = 1,2 µm");
  });

  it("karaciğer deposu isteği yalnız deposu kadar karşılar", () => {
    const t = "Glukagon: karaciğerden kana destek, sınırlı depo";
    expect(frameText("endokrin-pankreas", t, 3).readout).toContain("en küçük(3, 5) = 3");
    expect(frameText("endokrin-pankreas", t, 8).readout).toContain("en küçük(8, 5) = 5");
  });

  it("geri emilim bölmeleri 10 − 8 = 2 ve 10 − 9 = 1 verir", () => {
    expect(frameText("endokrin-paratiroit", "Böbrekte kalsiyum korunur, fosfat atımı artabilir", 0, 0).readout).toContain("10 − 8 = 2");
    expect(frameText("endokrin-hipotalamus", "ADH su yaratmaz, böbrekte suyu korumaya katkı verir", 0, 1).readout).toContain("10 − 9 = 1");
  });

  it("glikoliz ve ATP modelleri bölümdeki defteri tutar", () => {
    expect(frameText("solunum-oksijenli-bilanco", "Glikolizin geri ödemesi ve net kazancı", 0, 1).readout).toContain("12 − 6 = 6 ATP net");
    expect(frameText("solunum-oksijenli-bilanco", "30 ve 32 yaklaşık öğretim hesaplarıdır", 0, 0).readout).toContain("= 32 ATP");
    expect(frameText("solunum-oksijenli-bilanco", "30 ve 32 yaklaşık öğretim hesaplarıdır", 0, 1).readout).toContain("= 30 ATP");
  });

  it("Calvin döngüsü karbon defterini korur", () => {
    const { labels } = frameText("ayt-fotosentez-tepkimeler", "Bir çıkış, beş yenileme");
    expect(labels).toEqual(expect.arrayContaining(["3 RuBP (15 C)", "6 PGA (18 C)", "6 trioz P (18 C)", "5 trioz P (15 C)", "6 ATP, 6 NADPH", "3 ATP"]));
  });

  it("lojistik eğim N = K/2'de en büyük, N = K'da sıfırdır", () => {
    const t = "Lojistik modelde S eğrisi ve en hızlı mutlak artış";
    expect(frameText("ekoloji-populasyon", t, 0.5).readout).toContain("0,25 × rK");
    expect(frameText("ekoloji-populasyon", t, 1).readout).toContain("dN/dt = 0 × rK");
    expect(frameText("ekoloji-populasyon", t, 1.2).readout).toContain("Negatif");
  });

  it("figürler öğrenme kaydı üretmez: çizim saf fonksiyondur", () => {
    for (const g of GUIDES)
      for (const def of Object.values(sectionFigures[g])) {
        const a = JSON.stringify(def.draw(def.param?.init ?? 0, 0));
        const b = JSON.stringify(def.draw(def.param?.init ?? 0, 0));
        expect(a).toBe(b);
      }
  });
});
