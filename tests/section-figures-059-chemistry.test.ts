import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { lessonGuides } from "../src/learning/guides";

// Forge059 AYT Kimya figürleri: her figür rehberdeki gerçek bir bölüm
// başlığına bağlanır; sonuç satırlarındaki sayılar bölüm metnindeki
// örneklerle aynı hesaptan gelir.
const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const readout = (guide: string, title: string, value: number, step = 0) => (fig(guide, title).draw(value, step).readout ?? []).join(" ");

const GUIDES = [
  "ayt-gaz-ozellikleri",
  "ayt-kinetik-yogunluk",
  "ayt-kismi-basinci-suustu",
  "ayt-gercek-gaz-faz",
  "ayt-tepkime-hizi",
  "ayt-tepkimelerde-enerji",
  "ayt-entalpi-bag-hess",
  "ayt-denge-derisim",
  "ayt-denge-basinc-hacim",
  "ayt-denge-sicaklik-kesir",
  "ayt-sulu-asit-baz-denge",
  "ayt-zayif-asit-baz-tampon",
  "ayt-notrallesme",
  "ayt-cozunurluk-dengesi",
  "cozunurluk-faktorleri",
  "pil-gerilimi-derisim-pilleri",
  "ayt-kuantum-sayilari",
  "ayt-periyodik-sistem-atom-capi",
  "hibritlesme",
  "alkanlar",
  "ayt-alkoller",
];

describe("Forge059 AYT Kimya bölüm figürleri", () => {
  it("21 dersin her birine en az iki figür, gerçek bölüm başlıklarıyla", () => {
    for (const g of GUIDES) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      const titles = Object.keys(sectionFigures[g] ?? {});
      expect(titles.length, g).toBeGreaterThanOrEqual(2);
      const sections = new Set(lessonGuides.get(g)?.sections.map((s) => s.title));
      for (const t of titles) expect(sections.has(t), `${g} / ${t}`).toBe(true);
    }
  });

  it("her figür her adımda ve sürgü ucunda çizilir", () => {
    for (const g of GUIDES)
      for (const def of Object.values(sectionFigures[g])) {
        const vals = def.param ? [def.param.min, def.param.init, def.param.max] : [0];
        const steps = def.steps ? def.steps.map((_, i) => i) : [0];
        for (const val of vals)
          for (const s of steps) {
            const f = def.draw(val, s);
            expect(f.els.length).toBeGreaterThan(0);
            for (const line of f.readout ?? []) expect(line).not.toMatch(/NaN|Infinity|undefined/);
          }
      }
  });

  it("denge: X eklenince yeni denge 2 − √3 ve sıkıştırmada a ≈ 0,7808 mol", () => {
    expect(readout("ayt-denge-derisim", "Tek tür eklendiğinde ilk değişim", 0, 2)).toContain("[X] 1,732 · [Y] 0,732 · [XY] 1,268");
    expect(readout("ayt-denge-basinc-hacim", "Sıkıştırmada sayıların izini sür", 0, 2)).toContain("A = B = 0,7808 mol");
    expect(readout("ayt-denge-basinc-hacim", "Sabit toplam basınçta pistonun payını gör", 0, 1)).toContain("= 41 L");
    expect(readout("ayt-denge-sicaklik-kesir", "İki hız artarken oran azalabilir", 0, 1)).toContain("4/3");
  });

  it("asit-baz: 10⁻⁸ M kuvvetli asit pH 6,9783, 80 °C nötr pH 6,523", () => {
    expect(readout("ayt-sulu-asit-baz-denge", "Çok seyreltikte su katkısını koru", 8)).toContain("pH ≈ 6,9783");
    expect(readout("ayt-sulu-asit-baz-denge", "Nötr olmak her sıcaklıkta pH yedi değildir", 0, 1)).toContain("6,523");
    expect(readout("ayt-notrallesme", "Son hacim ve serbest iyon", 60)).toContain("pH ≈ 12,1");
    expect(readout("ayt-notrallesme", "Zayıf türde eşdeğerlik neden farklıdır?", 25)).toContain("pH(CH₃COOH) ≈ 8,72");
  });

  it("hız, enerji, çözünürlük ve pil sayıları bölüm örnekleriyle aynı", () => {
    expect(readout("ayt-tepkime-hizi", "Deney tablosundan üsleri bul", 0, 2)).toContain("k = 0,002 ÷ (0,10² · 0,10) = 2 M⁻²·s⁻¹");
    expect(readout("ayt-tepkime-hizi", "İleri ve geri engellerin farkı", 0, 2)).toContain("60 − 90 = −30 kJ/mol");
    expect(readout("ayt-tepkimelerde-enerji", "Kalorimetre kabı da enerji alabilir", 5)).toContain("q_kal = 20 J/K · 5 K = 100 J");
    expect(readout("cozunurluk-faktorleri", "Isı alan çözünmeyi dengeyle yorumla", 0, 1)).toContain("0,03 mol/L");
    expect(readout("pil-gerilimi-derisim-pilleri", "Gerilimin büyüklüğü derişim oranını izler", 10)).toContain("= 0,0296 V");
    expect(readout("pil-gerilimi-derisim-pilleri", "Gerilimin büyüklüğü derişim oranını izler", 100)).toContain("= 0,0592 V");
    expect(readout("ayt-kismi-basinci-suustu", "Her tür aynı hacmi paylaşır", 0.3)).toContain("P_A = 0,4 mol · 0,082 · 300 K ÷ 8,2 L = 1,2 atm");
  });

  it("atom: n = 3 katmanı 9 orbital ve 18 elektron; d alt kabuğu 5 orbital", () => {
    expect(readout("ayt-kuantum-sayilari", "Bir katmanı say", 0, 2)).toContain("1 + 3 + 5 = 9 orbital");
    expect(readout("ayt-kuantum-sayilari", "Bir katmanı say", 0, 2)).toContain("= 18 elektron");
    expect(readout("ayt-kuantum-sayilari", "Bir alt kabuğu say", 0, 2)).toContain("= 5, kapasite = 2 · 5 = 10");
    expect(readout("alkanlar", "Genel formülü bir ağaçtan çıkar", 5)).toContain("C₅H₁₂");
  });
});
