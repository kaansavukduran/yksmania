import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { lessonGuides } from "../src/learning/guides";
import { tw, wrap } from "../src/learning/sectionFigures/turkishFigures060Kit";

// Forge060 TYT Türkçe ve Felsefe figürleri: her figür rehberdeki gerçek bir
// bölüm başlığına bağlanır, her adımda ve seçimde çizilir, dingbat ya da uzun
// tire içermez ve öğrenme kaydı üretmez (çizim saf fonksiyondur).
const TURKISH = [
  "cumle-turleri",
  "anlatim-bozukluklari",
  "paragrafa-giris",
  "fiilimsiler",
  "yazim-kurallari",
  "noktalama-isaretleri",
  "fiiller",
  "fiilde-cati",
  "isimler-isim-tamlamasi",
  "sifatlar",
  "edat-baglac-unlem",
];
const PHILOSOPHY = [
  "felsefe-ile-dusunme",
  "bilim-felsefesi",
  "ilk-cag-felsefesi",
  "orta-cag-felsefesi",
  "18-19-yuzyil-felsefesi",
  "varlik-felsefesi",
  "siyaset-felsefesi",
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

describe("Forge060 Türkçe ve Felsefe bölüm figürleri", () => {
  it("11 Türkçe + 7 Felsefe dersinin her birine en az üç figür, gerçek bölüm başlıklarıyla", () => {
    expect(TURKISH.length + PHILOSOPHY.length).toBeGreaterThanOrEqual(18);
    for (const g of ALL) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      const titles = Object.keys(sectionFigures[g] ?? {});
      expect(titles.length, g).toBeGreaterThanOrEqual(3);
      const sections = new Set(lessonGuides.get(g)?.sections.map((s) => s.title));
      for (const t of titles) expect(sections.has(t), `${g} / ${t}`).toBe(true);
    }
  });

  it("her adım ve seçim çizilir; erişilebilir ad, açıklama ve figcaption var", () => {
    for (const g of ALL)
      for (const [title, def] of Object.entries(sectionFigures[g])) {
        expect(def.caption.length, title).toBeGreaterThan(60);
        expect(def.alt.length, title).toBeGreaterThan(40);
        for (const f of frames(g)) {
          expect(f.els.length).toBeGreaterThan(0);
          expect(JSON.stringify(f)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        }
        const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title }));
        expect(html).toContain('role="img"');
        expect(html).toContain("<figcaption>");
      }
  });

  it("yazılarda süs dingbat, uzun tire ya da üç ayrı nokta yok", () => {
    for (const g of ALL)
      for (const def of Object.values(sectionFigures[g])) {
        const text = JSON.stringify([def.caption, def.alt, def.steps, def.picks, frames(g).length ? def.draw(0, 0, -1) : null]);
        expect(text, g).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
      }
  });

  it("çizim saf fonksiyondur: aynı girdi aynı çerçeveyi verir", () => {
    const def = fig("cumle-turleri", "Sıralı ile bağlı: ne bağlanıyor?");
    expect(JSON.stringify(def.draw(0, 4))).toBe(JSON.stringify(def.draw(0, 4)));
    expect(def.draw(0, 4).readout?.[0]).toContain("Ece ve Can kitap okudu.");
    expect(def.draw(0, 4).readout?.[1]).toContain("basit cümle");
  });

  it("karar merdivenleri bölüm örneklerini doğru basamakta durdurur", () => {
    const daDe = fig("yazim-kurallari", "Da/de: yer eki mi, ekleme bağlacı mı?");
    expect(daDe.draw(0, 1).readout?.[1]).toMatch(/bağlaç, ayrı/);
    expect(daDe.draw(0, 2).readout?.[1]).toMatch(/bulunma/);
    const ile = fig("edat-baglac-unlem", "İle: eş görevli iki ad mı, araç veya birliktelik mi?");
    expect(ile.draw(0, 2).readout?.[1]).toMatch(/birliktelik/);
  });

  it("satır kaydırma yazının gerçek genişliğini aşmaz", () => {
    for (const line of wrap("Yüklem dışında fiilimsi yan yapı var mı ve hangi ada bağlanıyor?", 4.5)) expect(tw(line)).toBeLessThanOrEqual(4.5 + 1e-9);
  });
});
