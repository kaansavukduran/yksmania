import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { lessonGuides } from "../src/learning/guides";

// Forge061 TYT Din Kültürü ve TYT Coğrafya figürleri: her figür rehberdeki
// gerçek bir bölüm başlığına bağlanır, her adım, seçim ve sürgü ucunda
// çizilir, süs karakteri ya da uzun tire içermez; sayısal figürler bölüm
// metnindeki deney sonuçlarını verir.
const RELIGION = [
  "islam-ve-ibadet",
  "din-ve-islam",
  "anadoluda-islam",
  "islam-dusuncesinde-tasavvufi-yorumlar",
  "dunya-ve-ahiret",
  "islam-ve-bilim",
  "kur-ana-gore-hz-muhammed",
  "inanc-ile-ilgili-meseleler",
  "bilgi-ve-inanc",
  "kur-anda-gecen-bazi-kavramlar",
];
const GEOGRAPHY = [
  "ulasim-aglari",
  "ekonomik-faaliyetler",
  "dunya-turkiye-gocler",
  "turkiye-nufusu",
  "afetler-risk",
  "bolge-turleri",
  "cevre-toplum",
  "dunya-yerlesmeleri",
];
const ALL = [...RELIGION, ...GEOGRAPHY];
const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const frames = (guide: string) =>
  Object.values(sectionFigures[guide]).flatMap((def) => {
    const steps = def.steps ? def.steps.map((_, i) => i) : [0];
    const picks = [-1, ...(def.picks ?? []).map((_, i) => i)];
    const values = def.param ? [def.param.min, def.param.init, def.param.max] : [0];
    return steps.flatMap((s) => picks.flatMap((p) => values.map((val) => def.draw(val, s, p))));
  });

describe("Forge061 Din Kültürü ve Coğrafya bölüm figürleri", () => {
  it("10 Din + 8 Coğrafya dersinin her birine en az üç figür, gerçek bölüm başlıklarıyla", () => {
    expect(ALL.length).toBeGreaterThanOrEqual(18);
    for (const g of ALL) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      const titles = Object.keys(sectionFigures[g] ?? {});
      expect(titles.length, g).toBeGreaterThanOrEqual(3);
      const sections = new Set(lessonGuides.get(g)?.sections.map((s) => s.title));
      for (const t of titles) expect(sections.has(t), `${g} / ${t}`).toBe(true);
    }
  });

  it("her adım, seçim ve sürgü ucu çizilir; erişilebilir ad, açıklama ve figcaption var", () => {
    for (const g of ALL) {
      for (const f of frames(g)) {
        expect(f.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(f)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
      }
      for (const [title, def] of Object.entries(sectionFigures[g])) {
        expect(def.caption.length, title).toBeGreaterThan(60);
        expect(def.alt.length, title).toBeGreaterThan(40);
        const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title }));
        expect(html).toContain('role="img"');
        expect(html).toContain("<figcaption>");
      }
    }
  });

  it("yazılarda süs dingbat, uzun tire ya da üç ayrı nokta yok; seçim adları tekil", () => {
    for (const g of ALL)
      for (const def of Object.values(sectionFigures[g])) {
        const text = JSON.stringify([def.caption, def.alt, def.steps, def.picks, def.draw(def.param?.init ?? 0, 0, -1)]);
        expect(text, g).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
        const labels = (def.picks ?? []).map((p) => p.label);
        expect(new Set(labels).size, g).toBe(labels.length);
      }
  });

  it("rota deneyi: 1000 km ve 700 km, 20 km/saat; 15 saat beklemede toplamlar eşit", () => {
    const def = fig("ulasim-aglari", "Rota süresini bileşenlerine ayır");
    expect(def.draw(15, 0).readout?.[0]).toContain("35 + 15 = 50 sa; iki toplam süre eşit");
    expect(def.draw(0, 0).readout?.[0]).toContain("kanal rotası daha kısa sürer");
    expect(def.draw(20, 0).readout?.[0]).toContain("dolaşma rotası daha kısa sürer");
  });

  it("kesit deneyi: su 6 m iken 6 ev, ilk üç ev taşınınca 3 ev maruz", () => {
    const def = fig("afetler-risk", "Kesitte say, sonra yorumla");
    expect(def.draw(6, 0).readout?.[0]).toContain("maruz ev sayısı 6");
    expect(def.draw(6, 1).readout?.[0]).toContain("maruz ev sayısı 3");
    expect(def.draw(14, 1).readout?.[0]).toContain("maruz ev sayısı 10");
  });

  it("net göç ve derişim hesapları formülden gelir", () => {
    expect(fig("dunya-turkiye-gocler", "Net göç toplam değişim değildir").draw(-10, 0).readout?.[0]).toContain("= 10: nüfus artar");
    expect(fig("dunya-turkiye-gocler", "Net göç toplam değişim değildir").draw(-30, 0).readout?.[0]).toContain("= -10: nüfus azalır");
    expect(fig("cevre-toplum", "Yük ile derişimi farklı ölç").draw(2, 0).readout?.[0]).toContain("0,5 katı");
    expect(fig("ekonomik-faaliyetler", "Makineleşme ve payın değişmesi").draw(0, 1).readout?.[0]).toContain("50 / 650 = %7,7");
  });

  it("binde ve yüzde sonuçlarını aynı tabana uygulanan örnek hesap diye gösterir", () => {
    const def = fig("turkiye-nufusu", "Artış miktarı ile artış hızı");
    expect(def.alt).toContain("2023 nüfusu taban alındığında");
    expect(def.draw(0, 0).readout?.[0]).toContain(
      "2023 nüfusu taban alınırsa binde 1,1 yaklaşık 93.910 kişiye karşılık gelir.",
    );
    expect(def.draw(0, 1).readout?.[0]).toContain(
      "Aynı tabana yüzde 1,1 uygulanırsa yaklaşık 939.096 kişi çıkar.",
    );
  });
});
