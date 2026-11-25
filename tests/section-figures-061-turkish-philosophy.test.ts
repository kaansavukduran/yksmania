import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { lessons } from "../src/domain/content";

// Forge061 TYT Türkçe ve Felsefe figürleri: önceki turdan sonra figürsüz kalan
// 25 dersin her birine gerçek bölüm başlıklarına bağlı figürler. Sayısal
// panolar hesabı çizimde yapar; adımlar ve seçimler öğrenme kaydı üretmez
// (çizim saf fonksiyondur).
const TURKISH = [
  "paragrafta-anlatim-bicimleri",
  "paragrafta-coklu-sorular",
  "paragrafta-konu",
  "metin-tablo-gorsel-yorumlama",
  "paragrafta-soru-cevap",
  "paragrafta-roportaj",
  "paragrafta-siralama",
  "paragrafta-cumle-ekleme",
  "paragrafta-bosluk-doldurma",
  "yardimci-dusunce",
  "ikiye-bolme",
  "akisi-bozan-cumle",
  "deyimler-ve-atasozleri",
  "cumlede-anlam",
  "sozcukte-anlam",
  "ek-fiil",
  "zarflar",
  "zamirler",
];
const PHILOSOPHY = [
  "ronesans-felsefesi",
  "15-17-yuzyil-felsefesi",
  "aydinlanma-felsefesi",
  "cagdas-felsefe",
  "sanat-felsefesi",
  "felsefi-okuma-ve-yazma",
  "felsefeyi-tanima",
];
const ALL = [...TURKISH, ...PHILOSOPHY];
const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const frames = (guide: string) =>
  Object.values(sectionFigures[guide]).flatMap((def) => {
    const steps = def.steps ? def.steps.map((_, i) => i) : [0];
    const picks = [-1, ...(def.picks ?? []).map((_, i) => i)];
    return steps.flatMap((s) => picks.map((p) => def.draw(0, s, p)));
  });

describe("Forge061 Türkçe ve Felsefe bölüm figürleri", () => {
  it("18 Türkçe + 7 Felsefe dersinin her birine en az üç figür, gerçek bölüm başlıklarıyla", () => {
    expect(ALL.length).toBe(25);
    for (const g of ALL) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      const titles = Object.keys(sectionFigures[g] ?? {});
      expect(titles.length, g).toBeGreaterThanOrEqual(3);
      const sections = new Set(studyGuide(g)?.sections.map((s) => s.title));
      for (const t of titles) expect(sections.has(t), `${g} / ${t}`).toBe(true);
    }
  });

  it("rehberi olan her TYT Türkçe ve Felsefe dersinin en az bir figürü var", () => {
    const missing = lessons
      .filter((l) => (l.subjectId === "tyt-turkce" || l.subjectId === "tyt-felsefe") && lessonGuides.has(l.id))
      .filter((l) => !Object.keys(sectionFigures[l.id] ?? {}).length)
      .map((l) => l.id);
    expect(missing).toEqual([]);
  });

  it("her adım ve seçim çizilir; erişilebilir ad, açıklama ve figcaption var", () => {
    for (const g of ALL)
      for (const [title, def] of Object.entries(sectionFigures[g])) {
        expect(def.caption.length, title).toBeGreaterThan(60);
        expect(def.alt.length, title).toBeGreaterThan(40);
        const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title }));
        expect(html).toContain('role="img"');
        expect(html).toContain("<figcaption>");
      }
    for (const g of ALL)
      for (const f of frames(g)) {
        expect(f.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(f)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
      }
  });

  it("yazılarda süs dingbat, uzun tire ya da üç ayrı nokta yok", () => {
    for (const g of ALL)
      for (const def of Object.values(sectionFigures[g])) {
        const text = JSON.stringify([def.caption, def.alt, def.steps, def.picks, frames(g)]);
        expect(text, g).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
      }
  });

  it("sayısal panolar hesabı bölümdeki sayılardan yapar", () => {
    const ratio = fig("metin-tablo-gorsel-yorumlama", "Fark ve oran");
    expect(ratio.draw(0, 1).readout?.[0]).toContain("36 − 24 = 12");
    expect(ratio.draw(0, 2).readout?.[0]).toContain("1,5");
    expect(ratio.draw(0, 3).readout?.[0]).toContain("%50");
    const share = fig("metin-tablo-gorsel-yorumlama", "Yüzde, pay ve bütün");
    expect(share.draw(0, 1).readout?.[0]).toMatch(/= 30 kişi.*= 12 kişi/);
    const pts = fig("metin-tablo-gorsel-yorumlama", "Yüzde puanı ve yüzde değişim");
    expect(pts.draw(0, 1).readout?.[0]).toContain("10 yüzde puanı");
    expect(pts.draw(0, 2).readout?.[0]).toContain("%33");
    const axis = fig("metin-tablo-gorsel-yorumlama", "Eksen başlangıcı ve görsel uzunluk");
    expect(axis.draw(0, 0).readout?.[0]).toContain("= 3");
    expect(axis.draw(0, 1).readout?.[0]).toContain("1,08");
    expect(fig("metin-tablo-gorsel-yorumlama", "Daire grafiğinde payda").draw(0, 0).readout?.[0]).toContain("%30");
  });

  it("karar merdivenleri ve cümle yığınları bölüm örneklerini doğru yerde durdurur", () => {
    const zarf = fig("zarflar", "İlk iş: sözcüğün bağlandığı yeri bul");
    expect(zarf.draw(0, 1).readout?.[1]).toMatch(/durum zarfı/);
    const ek = fig("ek-fiil", "Önce yargıyı ve tabanı bul");
    expect(ek.draw(0, 4).readout?.[1]).toMatch(/-leş/);
    const cut = fig("ikiye-bolme", "İki bloğa ayrı birer soru sor");
    expect(cut.draw(0, 3).readout?.[0]).toContain("I–III");
    const rm = fig("akisi-bozan-cumle", "Adayı çıkarıp bağı yeniden kur");
    expect(JSON.stringify(rm.draw(0, 2).els)).toContain("belirsizleşti");
  });

  it("çizim saf fonksiyondur: aynı girdi aynı çerçeveyi verir", () => {
    const def = fig("sozcukte-anlam", "Genel ve özel anlam göreli kapsamdır");
    expect(JSON.stringify(def.draw(0, 0, 2))).toBe(JSON.stringify(def.draw(0, 0, 2)));
    expect(def.draw(0, 0, 2).readout?.[0]).toContain("serçeye göre genel");
  });
});
