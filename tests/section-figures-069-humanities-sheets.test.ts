import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { humanitiesFigures069Sheets } from "../src/learning/sectionFigures/humanitiesFigures069Sheets";
import { figurePacks } from "../src/learning/sectionFigures/registry";
import { lessonGuides } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge069: TYT Felsefe Rönesans Felsefesi ve Çağdaş Felsefe, TYT Din Kültürü
// Anadolu’da İslam ve İslam Düşüncesinde Tasavvufi Yorumlar kopya
// kâğıtlarının öğretimi özgün figür ve taktik olarak. Her figür daha önce
// çizimi olmayan gerçek bir bölüm başlığına bağlıdır.
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
const entries = Object.entries(humanitiesFigures069Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, step = 0, pick = -1) => (def.draw(0, step, pick).readout ?? []).join(" | ");
const texts = (def: FigureDef, step = 0, pick = -1) =>
  def
    .draw(0, step, pick)
    .els.flatMap((e) => (e.k === "text" ? [e.s] : []))
    .join(" ");
const labels = (def: FigureDef) => (def.picks ?? []).map((p) => p.label);

describe("Forge069 TYT Felsefe ve Din Kültürü kopya kâğıdı figürleri", () => {
  it("16 figür, gerçek bölüm başlıkları, kayıtta etkin tanım, önceden figürsüz bölümler", () => {
    expect(entries.length).toBe(16);
    expect(new Set(entries.map(([g]) => g))).toEqual(new Set(["ronesans-felsefesi", "cagdas-felsefe", "anadoluda-islam", "islam-dusuncesinde-tasavvufi-yorumlar"]));
    const earlier = figurePacks.slice(0, figurePacks.indexOf(humanitiesFigures069Sheets));
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(new Set(lessonGuides.get(g)?.sections.map((s) => s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(humanitiesFigures069Sheets[g][t]);
      expect(earlier.some((p) => p[g]?.[t]), `${t} önceden figürsüzdü`).toBe(false);
      const def = humanitiesFigures069Sheets[g][t];
      expect(Boolean(def.param || def.steps || def.picks), `${t} etkileşimli`).toBe(true);
    }
  });

  it("her adım ve seçim çizilir; erişilebilir ad, figcaption, sade metin, sabit renk yok", () => {
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
      const text = JSON.stringify([def.caption, def.alt, def.steps, def.picks, frames(def).map((f) => [f.readout, f.legend, f.els.flatMap((e) => (e.k === "text" ? [e.s] : []))])]);
      expect(text, t).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
      expect(text, t).not.toMatch(/(?<!\p{L})(turuncu|kırmızı|mavi|yeşil|mor|sarı)(?!\p{L})/iu);
      expect(JSON.stringify(frames(def).map((f) => f.els))).not.toMatch(/#[0-9a-f]{3,6}\b|rgb\(/i);
      // Sorulara dönük sınav atıfları yalnız yıl, sınav ve soru numarasıyla.
      expect(text, t).not.toMatch(/https?:|drive\.google|osym\.gov/i);
    }
  });

  it("Rönesans: argüman adımları, iki ölçütlü otorite panosu, düşünce deneyi, düşünür–eser–görüş", () => {
    const hf = fig("ronesans-felsefesi", "Hümanizm ve dinî düşünce");
    expect(hf.steps).toEqual(["İddia", "Gerekçe", "Karşı örnek", "Sonuç", "Sınır"]);
    expect(texts(hf, 0)).not.toContain("Petrarca");
    expect(texts(hf, 2)).toContain("Petrarca");
    expect(read(hf, 4)).toContain("ters yönde genelleme kurmaz");
    const au = fig("ronesans-felsefesi", "Otoriteyi değerlendirmek");
    expect(labels(au)).toEqual(["Eleştirel kullanım", "Kaynaksız tartışma", "Ünle kabul", "Gerekçesiz ret"]);
    expect(read(au, 0, 0)).toContain("yeniden değerlendirme eğilimine en yakın");
    expect(read(au, 0, 2)).toContain("gerekçenin yerini tutmaz");
    const ga = fig("ronesans-felsefesi", "Doğaya yöneliş ve yeni sorular");
    expect(ga.steps).toEqual(["İtiraz", "Sonuç", "Kapsam"]);
    expect(texts(ga, 0)).not.toContain("direğin dibine");
    expect(texts(ga, 1)).toContain("direğin dibine");
    expect(read(ga, 2)).toContain("tek başına ispatlanmış olmaz");
    expect(read(ga, 2)).toContain("2025 TYT Sosyal Bilimler 14");
    const th = fig("ronesans-felsefesi", "Hümanizm ve insanın değeri");
    expect(labels(th)).toEqual(["Petrarca", "Pico della Mirandola", "Erasmus", "Machiavelli", "Thomas More", "Montaigne"]);
    const row = (name: string) => th.picks!.find((p) => p.label === name)!.title;
    expect(row("Erasmus")).toContain("Deliliğe Övgü");
    expect(row("Machiavelli")).toContain("Prens");
    expect(row("Thomas More")).toContain("Ütopya");
    expect(row("Montaigne")).toContain("Denemeler");
    expect(row("Pico della Mirandola")).toContain("İnsanın Onuru Üzerine");
    expect(read(th, 0, 3)).toContain("hümanist bir tez gibi okunmaz");
  });

  it("Çağdaş felsefe: masa ve insan, ölçülen ve yaşanan süre, on düşünür, beş soruluk yöntem merdiveni", () => {
    const sa = fig("cagdas-felsefe", "Sartre: varoluş ve öz");
    expect(labels(sa)).toEqual(["Masa", "İnsan", "“Her nesne özsüzdür”"]);
    expect(sa.picks![0].title).toContain("öz: tasarım ve amaç");
    expect(sa.picks![1].title).toContain("varoluş");
    expect(read(sa, 0, 1)).toContain("2021 TYT Sosyal Bilimler 15");
    const be = fig("cagdas-felsefe", "Bergson: süre ve sezgi");
    expect(be.steps).toHaveLength(3);
    expect(texts(be, 0)).toContain("1 birim");
    expect(texts(be, 1)).toContain("önceki sesin izi sonrakine karışır");
    expect(read(be, 0)).toContain("zekâ");
    expect(read(be, 1)).toContain("sezgi");
    expect(read(be, 2)).toContain("Saat yanlış ölçmez");
    const tr = fig("cagdas-felsefe", "Türkiye’de kurumsal ve düşünsel çalışmalar");
    expect(tr.picks).toHaveLength(10);
    const area = (name: string) => tr.picks!.find((p) => p.label === name)!.title;
    expect(area("Takiyettin Mengüşoğlu")).toContain("felsefi antropoloji");
    expect(area("Nurettin Topçu")).toContain("isyan ahlakı");
    expect(area("Nusret Hızır")).toContain("mantık");
    expect(area("Aydın Sayılı")).toContain("bilim tarihi");
    expect(area("İoanna Kuçuradi")).toContain("değer");
    const me = fig("cagdas-felsefe", "Aynı sözcük farklı yöntem");
    expect(me.steps).toHaveLength(6);
    expect(texts(me, 0)).toContain("Hermeneutik: Dilthey,");
    expect(read(me, 1)).toContain("Varlık hükmü ne veriliyor ne reddediliyor");
    expect(read(me, 2)).toContain("Yanlışlanabilir olmak yanlış olmak değildir");
    expect(read(me, 5)).toContain("Hartmann");
  });

  it("Anadolu’da İslam: alan merdiveni, ribat işlevleri, Ahilik hizmetleri, Nisâ 69 sınırı", () => {
    const fi = fig("anadoluda-islam", "Âlim, fakih, mutasavvıf ve veli");
    expect(fi.steps).toEqual(["Usul", "İnanç", "Öğüt", "Çırak", "751"]);
    expect(read(fi, 0)).toContain("er-Risâle ile Şâfiî");
    expect(read(fi, 1)).toContain("Kitâbü’t-Tevhîd Mâtürîdî’nin eseridir");
    expect(read(fi, 2)).toContain("Ahmed Yesevî");
    expect(read(fi, 4)).toContain("tarihsel süreç sorusudur");
    const ri = fig("anadoluda-islam", "Ribatların değişen işlevi");
    expect(ri.steps).toHaveLength(4);
    expect(texts(ri, 0)).toContain("askerî");
    expect(texts(ri, 0)).not.toContain("yol güvenliği");
    expect(texts(ri, 2)).toContain("yol güvenliği");
    const ah = fig("anadoluda-islam", "Ahilikte konukseverlik ve yerleşme");
    expect(labels(ah)).toContain("Devlet adamı yetiştirme");
    expect(ah.picks!.find((p) => p.label === "Devlet adamı yetiştirme")!.title).toContain("temel hizmet değil");
    expect(ah.picks!.find((p) => p.label === "Meslek kazandırma")!.title).toContain("çekirdek işlev");
    expect(read(ah, 0, 4)).toContain("2023 AYT Sosyal Bilimler-2 40");
    const ni = fig("anadoluda-islam", "Nisâ 69: örneklik ve birlikte olma");
    expect(ni.caption).toContain("(4:69)");
    expect(labels(ni).slice(0, 4)).toEqual(["Peygamberler", "Sıddıklar", "Şehitler", "Salihler"]);
    for (const p of ni.picks!.slice(0, 4)) expect(p.title).toContain("anılır");
    for (const p of ni.picks!.slice(4)) expect(p.title).toContain("anılmaz");
  });

  it("Tasavvufi yorumlar: sema ve semah, metinde var ve yok, zühd panosu, razılık adımları", () => {
    const ss = fig("islam-dusuncesinde-tasavvufi-yorumlar", "Semahın bağlamı");
    expect(ss.picks![0].title).toContain("Mevlevilik");
    expect(ss.picks![1].title).toContain("Alevilik-Bektaşilik");
    expect(ss.picks![2].title).toContain("belirlenemez");
    const sy = fig("islam-dusuncesinde-tasavvufi-yorumlar", "Sema ve sembolik anlatım");
    const sym = (name: string) => sy.picks!.find((p) => p.label === name)!.title;
    expect(sym("Sikke")).toContain("mezar taşı");
    expect(sym("Hırka")).toContain("mezar");
    expect(sym("Tennure")).toContain("kefen");
    expect(sym("Törenin süresi")).toContain("eklenmez");
    expect(read(sy, 0, 4)).toContain("2025 TYT Sosyal Bilimler 20");
    const zu = fig("islam-dusuncesinde-tasavvufi-yorumlar", "Zühd ve dünyayla ilişki");
    expect(labels(zu)).toEqual(["Zühdle uyumlu", "Aşırı bağlılık", "Kanaat", "Yokluk tek başına değil"]);
    expect(read(zu, 0, 0)).toContain("Malın elde bulunması zühdle çelişmez");
    const ik = fig("islam-dusuncesinde-tasavvufi-yorumlar", "İkrar, razılık ve kul hakkı");
    expect(ik.steps).toHaveLength(5);
    expect(texts(ik, 0)).not.toContain("helallik");
    expect(texts(ik, 3)).toContain("helallik");
    expect(read(ik, 4)).toContain("kendiliğinden ortadan kaldırmaz");
  });

  it("dört yeni taktik bu derslerin gerçek sorularında görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["ronesans-kapsam-odak-dayanak", "cagdas-problem-yontem", "anadolu-alan-iki-kanit", "tasavvuf-olcek-metin-kaniti"]) {
      const t = questionTactics.find((x) => x.id === id);
      expect(t, id).toBeDefined();
      expect(t!.steps).toHaveLength(5);
      expect(fired, id).toContain(id);
    }
  });
});
