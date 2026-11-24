import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { geometryFigures063Sheets } from "../src/learning/sectionFigures/geometryFigures063Sheets";
import { lessonGuides } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge063: TYT Geometri dik üçgenler, üçgende merkezler, üçgende alan ve
// dikdörtgen kopya kâğıtlarının öğretimi özgün figür ve taktik olarak. Her
// figür gerçek bir bölüm başlığına bağlıdır, kayıt defterinde son paket olarak
// eski figürün yerini alır ve sayıları kendi koordinatlarından hesaplar.
const fig = (guide: string, title: string): FigureDef => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const frames = (def: FigureDef) => {
  const steps = def.steps ? def.steps.map((_, i) => i) : [0];
  const picks = [-1, ...(def.picks ?? []).map((_, i) => i)];
  const values = def.param
    ? Array.from({ length: Math.round((def.param.max - def.param.min) / def.param.step) + 1 }, (_, i) => def.param!.min + i * def.param!.step)
    : [0];
  return steps.flatMap((s) => picks.flatMap((p) => values.map((val) => def.draw(val, s, p))));
};
const entries = Object.entries(geometryFigures063Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).readout ?? []).join(" | ");

describe("Forge063 TYT Geometri kopya kâğıdı figürleri", () => {
  it("15 figür, gerçek bölüm başlıkları ve kayıtta etkin olan tanım", () => {
    expect(entries.length).toBe(15);
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(new Set(lessonGuides.get(g)?.sections.map((s) => s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(geometryFigures063Sheets[g][t]);
      const def = geometryFigures063Sheets[g][t];
      expect(Boolean(def.param || def.steps || def.picks), `${t} etkileşimli`).toBe(true);
    }
  });

  it("her adım, seçim ve sürgü değeri çizilir; erişilebilir ad ve figcaption var", () => {
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
      const text = JSON.stringify([def.caption, def.alt, def.steps, def.picks, frames(def).map((f) => f.readout)]);
      expect(text, t).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
      expect(text, t).not.toMatch(/(?<!\p{L})(turuncu|kırmızı|mavi|yeşil|mor)(?!\p{L})/iu);
    }
  });

  it("dik üçgen: ters Pisagor yalnız c = 20'de dik, 60° karşısında a = kenar/√3, kenarlar toplanmaz", () => {
    const tp = fig("tyt-geo-dik-ucgen-031", "Ters Pisagor ve ölçünün gerçekliği");
    expect(read(tp, 20)).toContain("A = 90°");
    expect(read(tp, 19)).toContain("dar");
    expect(read(tp, 21)).toContain("geniş");
    expect(read(tp, 26)).toContain("c² = 676");
    const special = fig("tyt-geo-dik-ucgen-031", "Özel üçgenler: açı hangi kenarın karşısında?");
    expect(read(special, 0, 1)).toContain("4√3");
    expect(read(special, 0, 2)).toContain("a = 6/√3 = 2√3");
    expect(read(fig("tyt-geo-dik-ucgen-031", "Son kontrol: en uzun kenar, birim ve iki bağımsız eşitlik"), 0, 1)).toContain("√841 = 29");
    const trig = fig("tyt-geo-trigonometrik-oranlar-040", "Trigonometri sorusunu adım adım çöz");
    expect(read(trig, 0, 0, 0)).toContain("tan B = 8/15");
    expect(read(trig, 0, 0, 1)).toContain("tan A = 15/8");
    expect(read(trig, 0, 0, 2)).toContain("= 1");
  });

  it("merkezler: 12–5–13'te dört ayrı merkez, r·s alanı, dış teğet 24 ve ikizkenarda eşkenar buluşması", () => {
    const pick = fig("tyt-geo-ucgen-merkezleri-031", "Merkez seçerken hangi bilgiye ihtiyacın var?");
    expect(read(pick, 0, 0, 0)).toContain("I = (2; 2)");
    expect(read(pick, 0, 0, 1)).toContain("R = 13/2 = 6,5");
    expect(read(pick, 0, 0, 2)).toContain("(4; 5/3)");
    expect(read(pick, 0, 0, 3)).toContain("H = A");
    const inc = fig("tyt-geo-ucgen-merkezleri-031", "İç merkez I: kenarlara eş dik uzaklık");
    expect(read(inc, 0, 1)).toContain("4 · 24 = 96");
    expect(read(inc, 0, 2)).toContain("rₐ = 24");
    const sym = fig("tyt-geo-ucgen-merkezleri-031", "Simetri ne zaman çizgileri ve merkezleri birleştirir?");
    expect(read(sym, 60)).toContain("I = G = O = H");
    expect(read(sym, 90)).toContain("O ≈ 0");
    expect(read(sym, 120)).toContain("Geniş");
    expect(read(fig("tyt-geo-ucgen-merkezleri-031", "Kenarortay ve ağırlık merkezi G"), 0, 1)).toContain("(2; 3)");
  });

  it("alan: eğik kenar yalnız 90°'de yükseklik, açının yeri, paralelde sabit alan, üç taban 84", () => {
    const check = fig("alan-donusumleri", "Bir çözümün son denetimi: şekil, diklik, parça ve birim");
    expect(read(check, 90)).toContain("alan ≈ 30 cm²");
    expect(read(check, 30)).toContain("alan ≈ 15 cm²");
    expect(read(check, 150)).toContain("uzantısında");
    const half = fig("alan-donusumleri", "Üçgen alanındaki yarım nereden gelir?");
    expect(read(half, 0, 2)).toContain("= 15");
    expect(read(half, 0, 3)).toContain("(15 değil)");
    const ratio = fig("alan-donusumleri", "Alan oranını bulurken ortak olan büyüklüğü sadeleştir");
    expect(read(ratio, 2, 0)).toContain("4 : 8 = 2 : 4");
    for (const t of [1, 3, 5]) expect(read(ratio, t, 1)).toContain("alan = 6·4/2 = 12");
    expect(read(fig("alan-donusumleri", "Tabanı seçtiğinde yüksekliği de yeniden seçmiş olursun"), 0, 2)).toContain("√7056 = 84");
  });

  it("dikdörtgen: eş ama dik olmayan köşegenler, 2ab, kare en büyük alan, karşı köşe kareleri", () => {
    const d = fig("tyt-geo-paralelkenar-ozel-dortgenler-032", "Dikdörtgende eş köşegenin kaynağı");
    expect(read(d, 0, 1)).toContain("−7/25");
    expect(read(d, 0, 2)).toContain("alan 168");
    const sq = fig("tyt-geo-paralelkenar-ozel-dortgenler-032", "Kare iki ailenin özelliklerini birlikte taşır");
    expect(read(sq, 6)).toContain("en büyük 36");
    expect(read(sq, 4)).toContain("alan 32");
    const k = fig("tyt-geo-paralelkenar-ozel-dortgenler-032", "Koşulu en kısa yöntemle sonuca bağla");
    expect(read(k, 0, 1)).toContain("17 + 61 = 78");
    expect(read(k, 0, 1)).toContain("37 + 41 = 78");
    expect(read(k, 0, 2)).toContain("8h = 40");
    expect(read(k, 0, 3)).toContain("126 − 50 = 76");
  });

  it("dört yeni taktik gerçek sorularda görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["dik-ucgen-kenar-rolu", "merkez-esit-uzaklik", "ucgen-alan-veri-sec", "dikdortgen-cevre-kosegen"]) {
      expect(questionTactics.some((t) => t.id === id), id).toBe(true);
      expect(fired, id).toContain(id);
    }
  });
});
