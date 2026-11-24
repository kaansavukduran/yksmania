import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type El, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { turkishFigures065Sheets } from "../src/learning/sectionFigures/turkishFigures065Sheets";
import { lessonGuides } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge065: TYT Türkçe isimler ve isim tamlaması, sıfatlar, zamirler ve
// fiilde çatı kopya kâğıtlarının öğretimi özgün figür ve taktik olarak. Her
// figür daha önce çizimi olmayan gerçek bir bölüm başlığına bağlıdır.
const fig = (guide: string, title: string): FigureDef => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const frames = (def: FigureDef) => {
  const steps = def.steps ? def.steps.map((_, i) => i) : [0];
  const picks = [-1, ...(def.picks ?? []).map((_, i) => i)];
  return steps.flatMap((s) => picks.map((p) => def.draw(0, s, p)));
};
const entries = Object.entries(turkishFigures065Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, step = 0, pick = -1) => (def.draw(0, step, pick).readout ?? []).join(" | ");
const texts = (def: FigureDef, step = 0, pick = -1) =>
  def
    .draw(0, step, pick)
    .els.flatMap((e: El) => (e.k === "text" ? [e.s] : []))
    .join(" ");
const arrows = (def: FigureDef, step = 0, pick = -1) => def.draw(0, step, pick).els.filter((e) => e.k === "vec");

describe("Forge065 TYT Türkçe kopya kâğıdı figürleri", () => {
  it("16 figür, gerçek bölüm başlıkları, kayıtta etkin tanım ve etkileşim", () => {
    expect(entries.length).toBe(16);
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(new Set(lessonGuides.get(g)?.sections.map((s) => s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(turkishFigures065Sheets[g][t]);
      const def = turkishFigures065Sheets[g][t];
      expect(Boolean(def.param || def.steps || def.picks), `${t} etkileşimli`).toBe(true);
    }
    for (const g of Object.keys(turkishFigures065Sheets)) expect(Object.keys(sectionFigures[g]).length, g).toBeGreaterThanOrEqual(7);
  });

  it("her adım ve seçim çizilir; erişilebilir ad, figcaption ve yasak karakter yok", () => {
    for (const [g, t] of entries) {
      const def = fig(g, t);
      for (const f of frames(def)) {
        expect(f.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(f)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
      }
      expect(def.caption.length, t).toBeGreaterThan(60);
      expect(def.alt.length, t).toBeGreaterThan(40);
      const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title: t }));
      expect(html).toContain('role="img"');
      expect(html).toContain("<figcaption>");
      const text = JSON.stringify([def.caption, def.alt, def.steps, def.picks, frames(def).map((f) => [f.readout, f.els.flatMap((e) => (e.k === "text" ? [e.s] : []))])]);
      expect(text, t).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
      expect(text, t).not.toMatch(/(?<!\p{L})(turuncu|kırmızı|mavi|yeşil|mor)(?!\p{L})/iu);
    }
  });

  it("çizim pano içinde kalır: her yazı ve çizgi 10 birimlik genişlikte", () => {
    for (const [g, t] of entries)
      for (const f of frames(fig(g, t)))
        for (const e of f.els) {
          const xs = e.k === "text" ? [e.p[0]] : e.k === "seg" || e.k === "vec" ? [e.a[0], e.b[0]] : e.k === "poly" ? e.ps.map((p) => p[0]) : [];
          for (const x of xs) {
            expect(x, t).toBeGreaterThanOrEqual(-0.1);
            expect(x, t).toBeLessThanOrEqual(10.1);
          }
        }
  });

  it("isimler: ekli adlar oklarla bağlanır, çekim ekleri yapı vermez, sayı ve ortak unsur", () => {
    const cases = fig("isimler-isim-tamlamasi", "Durum, ilgi ve eşitlik: adı ilişkiye yerleştir");
    expect(arrows(cases).length).toBe(5);
    expect(read(cases, 0, 0)).toContain("Komşunun → kızı");
    expect(read(cases, 0, 2)).toContain("ayrılma durumu");
    expect(read(cases, 0, 3)).toContain("belirtme durumu");
    expect(read(cases, 0, 1)).toContain("iyeliktir");
    const build = fig("isimler-isim-tamlamasi", "Yapı: çekim eki sözcüğü türemiş yapmaz");
    expect(read(build, 0)).toContain("basit");
    expect(read(build, 1)).toContain("türemiş");
    expect(read(build, 2)).toContain("birleşik");
    expect(build.draw(0, 1).legend?.map((l) => l.label)).toContain("yapım eki: dolu kutu");
    const count = fig("isimler-isim-tamlamasi", "Tekil, çoğul ve topluluk: biçimle bütünü karıştırma");
    expect(read(count, 0, 2)).toContain("topluluk adı");
    expect(read(count, 0, 4)).toContain("hala ve ailesi");
    const shared = fig("isimler-isim-tamlamasi", "Düşen ve ortak unsurlar; çözümü denetle");
    expect(texts(shared, 0)).toContain("(benim)");
    expect(arrows(shared, 2).length).toBe(2);
    expect(arrows(shared, 3).length).toBe(2);
    expect(read(shared, 1)).toContain("ilgi zamiri -ki");
  });

  it("sıfatlar: ok yönü, soru sözcüğü, bir denemesi ve yapı öbeği", () => {
    const deg = fig("sifatlar", "Derecelendirme: sıfatı etkileyen sözcük de sıfat değildir");
    expect(read(deg, 0, 0)).toContain("Çok → yorgun");
    expect(read(deg, 0, 0)).toContain("zarftır");
    expect(read(deg, 0, 5)).toContain("durum zarfı");
    expect(read(deg, 0, 1)).toContain("niteleme sıfatı");
    const q = fig("sifatlar", "Soru sıfatı: yanıt adın özelliğini mi tamamlar?");
    expect(read(q, 0, 0)).toContain("soru sıfatı");
    expect(read(q, 0, 1)).toContain("soru zamiri");
    expect(read(q, 0, 5)).toContain("soru zarfı");
    const bir = fig("sifatlar", "Belgisizlik ve bir sözcüğünün bağlamı");
    expect(read(bir, 0, 0)).toContain("asıl sayı");
    expect(read(bir, 0, 1)).toContain("belgisiz sıfat");
    const st = fig("sifatlar", "Yapı: basit, türemiş ve birleşik sıfatlar");
    expect(read(st, 1)).toContain("türemiş");
    expect(read(st, 2)).toContain("birleşik sıfat");
    expect(texts(st, 3)).toContain("öbek bütün olarak sıfat");
  });

  it("zamirler: durum çekimi, kendi gönderimi, belirsiz onun ve belgisiz çiftler", () => {
    const pc = fig("zamirler", "Kişi zamirleri ve çekimleri");
    expect(texts(pc, 0, 2)).toContain("bana");
    expect(texts(pc, 0, 2)).toContain("ben + e → bana");
    expect(texts(pc, 0, 5)).toContain("onların");
    expect(read(pc, 0, 4)).toContain("benden, senden, ondan, bizden, sizden, onlardan");
    const rf = fig("zamirler", "Dönüşlülük: kendi hangi kişiye dönüyor?");
    expect(read(rf, 0, 2)).toContain("kendi → Oya");
    expect(read(rf, 0, 4)).toContain("vurgular");
    expect(rf.draw(0, 0, 2).els.filter((e) => e.k === "vec" && e.dash).length).toBe(2);
    const amb = fig("zamirler", "Görev, gönderim ve son denetim");
    expect(arrows(amb, 2).length).toBe(2);
    expect(read(amb, 2)).toContain("iki kişiye de");
    expect(texts(amb, 3)).toContain("Can’ın");
    const ind = fig("zamirler", "Belgisiz zamir: kimlik açık, miktar belirsiz olabilir");
    expect(read(ind, 0, 0)).toContain("bazıları o adın yerini tutar");
    expect(read(ind, 0, 4)).toContain("belgisiz zamir");
  });

  it("fiilde çatı: ilk kapı, neyi denemesi, kökten oldurgan/ettirgen, işteş kanıtı", () => {
    const gate = fig("fiilde-cati", "Çatı için ilk kapı: yüklem fiil mi?");
    expect(read(gate, 0)).toContain("Yüklem isim");
    expect(read(gate, 1)).toContain("edilgen");
    expect(read(gate, 3)).toContain("etken");
    expect(texts(gate, 2)).toContain("asıl yüklem: isim");
    const obj = fig("fiilde-cati", "Geçişli ve geçişsiz: nesne alma yeteneği");
    expect(read(obj, 0, 1)).toContain("Geçişsiz");
    expect(read(obj, 0, 2)).toContain("geçişlidir");
    const caus = fig("fiilde-cati", "Oldurgan: nesnesizden nesne alabilene");
    expect(read(caus, 0)).toContain("oldurgan");
    expect(read(caus, 3)).toContain("ettirgen");
    expect(texts(caus, 3)).toContain("ettirgen");
    const rec = fig("fiilde-cati", "İşteş: karşılıklı veya birlikte");
    expect(read(rec, 0, 2)).toContain("işteş değil");
    expect(read(rec, 0, 3)).toContain("addan fiil");
    expect(read(rec, 0, 1)).toContain("işteş");
  });

  it("dört yeni taktik gerçek sorularda görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["isim-ek-bag-oku", "sifat-ok-yonu", "zamir-acilim-gonderim", "cati-kapi-iki-eksen"]) {
      expect(questionTactics.some((t) => t.id === id), id).toBe(true);
      expect(fired, id).toContain(id);
    }
  });
});
