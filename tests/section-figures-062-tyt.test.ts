import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { studyGuide } from "../src/learning/guides";

// Forge062 TYT Biyoloji, Coğrafya ve Din Kültürü figürleri: her figür
// rehberdeki gerçek bir bölüm başlığına bağlanır; her adım, seçim ve sürgü
// ucunda çizilir; süs karakteri ya da uzun tire içermez; sayısal figürler
// bölüm metnindeki kurallardan hesaplanır ve öğrenme kaydı üretmez.
const BIOLOGY = ["omurgasizlar", "mantarlar", "bilimsel-yontem", "mineraller", "karbohidratlar", "proteinler", "vitaminler", "nukleik-asitler"];
const GEOGRAPHY = ["turkiye-sulari", "turkiye-yerlesmeleri", "cografya-kayaclar", "turkiye-dis-kuvvetler", "doga-insan-cografya", "cografyanin-tarihi-gelisimi"];
const RELIGION = ["guncel-dini-meseleler", "ahlaki-tutum-ve-davranislar", "genclik-ve-degerler", "gonul-cografyamiz", "din-ve-hayat", "allah-ve-insan-iliskisi"];
const ALL = [...BIOLOGY, ...GEOGRAPHY, ...RELIGION];
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

describe("Forge062 TYT Biyoloji, Coğrafya ve Din Kültürü bölüm figürleri", () => {
  it("20 dersin her birine en az dört figür, gerçek bölüm başlıklarıyla", () => {
    expect(ALL.length).toBe(20);
    for (const g of ALL) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      const titles = Object.keys(sectionFigures[g] ?? {});
      expect(titles.length, g).toBeGreaterThanOrEqual(4);
      const sections = new Set(studyGuide(g)?.sections.map((s) => s.title));
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

  it("yazılarda süs dingbat, uzun tire, üç ayrı nokta ya da renk adına dayanan açıklama yok; seçim adları tekil", () => {
    for (const g of ALL)
      for (const def of Object.values(sectionFigures[g])) {
        const text = JSON.stringify([def.caption, def.alt, def.steps, def.picks, def.draw(def.param?.init ?? 0, 0, -1)]);
        expect(text, g).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
        expect(text, g).not.toMatch(/(?<!\p{L})(turuncu|kırmızı|mavi|yeşil|mor)(?!\p{L})/iu);
        const labels = (def.picks ?? []).map((p) => p.label);
        expect(new Set(labels).size, g).toBe(labels.length);
      }
  });

  it("harita ve kesitler şematik, modeller ölçekli olup olmadığını söyler", () => {
    expect(fig("gonul-cografyamiz", "Gezi listesi ve olumsuz kök").caption).toContain("ölçekli değil");
    expect(fig("turkiye-sulari", "Denizler ve boğazda iki yönlü akış").caption).toContain("ölçekli değil");
    expect(fig("turkiye-dis-kuvvetler", "Kapadokya’da kayaç ile şekli ayır").caption).toContain("ölçekli değil");
    expect(fig("cografya-kayaclar", "Döngü tek bir sıra değildir").caption).toContain("ölçekli değil");
  });

  it("biyoloji sayımları bölümdeki kurallardan: N − k bağ, halka n bağ, kısmi hidroliz, peptit kütlesi", () => {
    expect(fig("karbohidratlar", "Bağ sayısında zincir sayısını unutma").draw(8, 2).readout?.[0]).toContain("bağ sayısı 8 − 3 = 5");
    expect(fig("proteinler", "Peptit bağını doğru say").draw(9, 0).readout?.[0]).toContain("peptit bağı sayısı 9 − 1 = 8");
    const ring = fig("proteinler", "Halka bağlantısında ilk kesimi ayrı say");
    expect(ring.draw(0, 0).readout?.[0]).toContain("6 peptit bağı, 1 parça");
    expect(ring.draw(0, 1).readout?.[0]).toContain("5 peptit bağı, 1 parça");
    expect(ring.draw(0, 2).readout?.[0]).toContain("4 peptit bağı, 2 parça");
    const part = fig("karbohidratlar", "Kısmi hidrolizde parça ile serbest birimi ayır");
    expect(part.draw(0, 0).readout?.[0]).toContain("2 parça, 0 serbest birim");
    expect(part.draw(0, 1).readout?.[0]).toContain("2 parça, 1 serbest birim");
    expect(part.draw(0, 3).readout?.[0]).toContain("6 parça, 6 serbest birim");
    const mass = fig("proteinler", "Peptit kütlesinde suyun atomlarını koru");
    expect(mass.draw(0, 1).readout?.[0]).toContain("= 146 g/mol");
    expect(mass.draw(0, 2).readout?.[0]).toContain("= 233 g/mol");
    expect(mass.draw(0, 3).readout?.[0]).toContain("= 269");
    expect(fig("karbohidratlar", "Dehidrasyon ve hidrolizde iki su kaydı tut").draw(2, 0).readout?.[0]).toContain("Net su çıkışı 5 − 2 = 3");
  });

  it("nükleik asit, yüzde ve vitamin modelleri: H = 2x + 3y, 15 puan / %50, üç bölme korunur", () => {
    const h = fig("nukleik-asitler", "Üç sayı, üç farklı hesap: nükleotit, baz çifti, hidrojen bağı");
    expect(h.draw(0, 0).readout?.[0]).toContain("H = 20");
    expect(h.draw(4, 0).readout?.[0]).toContain("H = 24");
    expect(h.draw(10, 0).readout?.[0]).toContain("H = 30");
    expect(fig("bilimsel-yontem", "Sayım, oran ve yüzde").draw(45, 0).readout?.[0]).toContain("45 − 30 = 15 puan. Göreli değişim: 15 / 30 × 100 = %50.");
    expect(fig("vitaminler", "Besin hazırlamada üç bölmeli miktar hesabı kur").draw(20, 0).readout?.[0]).toContain("Kayıp = 100 − 55 − 20 = 25");
    const cap = fig("mineraller", "Minimum gereksinimi oranla karşılaştır");
    expect(cap.draw(6, 0).readout?.[0]).toContain("Y sınırlayıcıdır; ortak üretim 3 birim");
    expect(cap.draw(8, 0).readout?.[0]).toContain("X ve Y birlikte sınırlayıcıdır; ortak üretim 4 birim");
    expect(cap.draw(20, 0).readout?.[0]).toContain("X sınırlayıcıdır; ortak üretim 4 birim");
  });

  it("coğrafya ve ahlak modelleri: rejim toplamı 100 korunur, dört-dört paylaşım iki saat açık bırakır", () => {
    const reg = fig("turkiye-sulari", "Rejimi toplam su miktarından ayır");
    expect(reg.draw(0, 0).readout?.[0]).toContain("Toplam 100 birim; aralık 40 − 10 = 30");
    expect(reg.draw(100, 0).readout?.[0]).toContain("Toplam 100 birim; aralık 25 − 25 = 0");
    const fair = fig("ahlaki-tutum-ve-davranislar", "Adalet ve eşitlik arasındaki bağ");
    expect(fair.draw(4, 0).readout?.[0]).toContain("açıklar 0 ve 2 saat, toplam 2 saat");
    expect(fair.draw(2, 0).readout?.[0]).toContain("açıklar 0 ve 0 saat, toplam 0 saat");
  });

  it("figürler öğrenme kaydı üretmez: aynı girdi aynı çizimi verir", () => {
    for (const g of ALL)
      for (const def of Object.values(sectionFigures[g])) {
        const a = JSON.stringify(def.draw(def.param?.init ?? 0, 0, -1));
        const b = JSON.stringify(def.draw(def.param?.init ?? 0, 0, -1));
        expect(a).toBe(b);
      }
  });
});
