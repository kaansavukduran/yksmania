import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { mathFigures064Sheets } from "../src/learning/sectionFigures/mathFigures064Sheets";
import { lessonGuides } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge064: TYT Matematik ardışık sayılar, asal sayılar, yaş ve kâr–zarar
// kopya kâğıtlarının öğretimi özgün figür ve taktik olarak. Her figür daha önce
// çizimi olmayan gerçek bir bölüm başlığına bağlıdır ve sayılarını kendisi
// hesaplar.
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
const entries = Object.entries(mathFigures064Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).readout ?? []).join(" | ");

describe("Forge064 TYT Matematik kopya kâğıdı figürleri", () => {
  it("17 figür, gerçek bölüm başlıkları, kayıtta etkin tanım ve önceden figürsüz bölümler", () => {
    expect(entries.length).toBe(17);
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(new Set(lessonGuides.get(g)?.sections.map((s) => s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(mathFigures064Sheets[g][t]);
      const def = mathFigures064Sheets[g][t];
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

  it("ardışık: tür seçimi, tek sayıların karesi, dört ardışık 4a + 6 ve üyelik", () => {
    const kind = fig("ardisik-sayilar", "Ardışıklık yalnız farklı olmak değildir");
    expect(read(kind, 0, 0, 1)).toContain("sabit adım 2");
    expect(read(kind, 0, 0, 4)).toContain("sabit adım yok");
    expect(read(kind, 0, 0, 4)).toContain("gerçek toplam 22");
    const sq = fig("ardisik-sayilar", "Toplam formülü neden çalışır?");
    expect(read(sq, 4)).toContain("1 + 3 + 5 + 7 = 4² = 16");
    expect(read(sq, 7)).toContain("= 7² = 49");
    expect(read(sq, 7)).toContain("3 + … + 13 = 7² − 1² = 48");
    const four = fig("ardisik-sayilar", "Ortalama her zaman bir terim olmak zorunda değildir");
    expect(read(four, 22)).toContain("sayılar 4, 5, 6, 7");
    expect(read(four, 22)).toContain("Ortalama 5,5");
    expect(read(four, 24)).toContain("tam sayı değil");
    expect(read(four, -10)).toContain("sayılar −4, −3, −2, −1");
    const mem = fig("ardisik-sayilar", "Sorudaki sırayı ve terim numarasını açık tut");
    expect(read(mem, 36)).toContain("listenin 7. terimi");
    expect(read(mem, 38)).toContain("Komşu terimler 36 (7. terim) ve 41 (8. terim)");
  });

  it("asal: dikdörtgen dizilim, 1–50 eleği, mod 3 üçlüsü ve 30 bölünebilme filtresi", () => {
    const rect = fig("asal-sayilar", "Asal olmak iki farklı pozitif bölen demektir");
    expect(read(rect, 29)).toContain("asal");
    expect(read(rect, 29)).toContain("yalnız tek satır");
    expect(read(rect, 12)).toContain("1, 2, 3, 4, 6, 12 (6 tane) · bileşik");
    expect(read(rect, 1)).toContain("ne asal ne bileşik");
    const sieve = fig("tyt-mat-asal-kaynak-032", "Birden çok sayıyı birlikte ele: 1–50 eleği");
    expect(read(sieve, 0, 1)).toContain("(24 sayı)");
    expect(read(sieve, 0, 4)).toContain("yeni elenen: 49");
    expect(read(sieve, 0, 5)).toContain("Kalan 15 sayının hepsi asal: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47");
    const tri = fig("tyt-mat-asal-kaynak-032", "Toplam ve fark birlikte asalsa neden yalnız 2 ile 5?");
    expect(read(tri, 5)).toContain("üçü de asal");
    for (let q = 7; q <= 41; q += 2) expect(read(tri, q), String(q)).toContain("çalışmaz");
    const grid = fig("tyt-mat-asal-kaynak-032", "Birleşik basamak probleminde aday listesini küçült");
    expect(read(grid, 0, 1)).toContain("Kalan 17 çift");
    expect(read(grid, 0, 2)).toContain("Kalan 8 çift");
    expect(read(grid, 0, 3)).toContain("Kalan 2 çift: 45 ve 54");
    expect(45 * 54).toBe(2430);
  });

  it("yaş: grup toplamı 3t, blok modeli k = 4, çapraz zaman 7 ve 43, en az 5 yıl", () => {
    const g = fig("yas-problemleri", "Toplam n kez, ortalama bir kez değişir");
    expect(read(g, 4)).toContain("= 63");
    expect(read(g, 4)).toContain("ortalama 17 + (+4) = 21");
    expect(read(g, -4)).toContain("= 39");
    const blocks = fig("yas-problemleri", "Oranı verildiği zamandaki yaşlarla kur");
    expect(read(blocks, 0, 2)).toContain("6k + 8 = 7k + 4");
    expect(read(blocks, 0, 3)).toContain("12 ve 28");
    expect(2 * (3 * 4 + 4)).toBe(7 * 4 + 4);
    const cross = fig("yas-problemleri", "Birinin bugünü, ötekinin geçmişi olabilir");
    expect(read(cross, 0, 1)).toContain("B = 19 − 12 = 7");
    expect(read(cross, 0, 2)).toContain("A = 31 + 12 = 43");
    const least = fig("yas-problemleri", "En az koşulu ve tam yıl seçimi");
    expect(read(least, 4)).toContain("15'in altında");
    expect(read(least, 5)).toContain("sınır sağlanıyor");
  });

  it("kâr–zarar: maliyet tabanı, eşit satışta r², fire başabaşı, üretilen ve satılan", () => {
    const base = fig("kar-zarar-problemleri", "Standart kâr yüzdesinin tabanı maliyettir");
    expect(read(base, 200)).toContain("maliyete göre %25");
    expect(read(base, 200)).toContain("%20: satış marjı");
    expect(read(base, 160)).toContain("başabaş");
    expect(read(base, 120)).toContain("Zarar 40 TL");
    const eq = fig("kar-zarar-problemleri", "Eşit satış ile eşit maliyet farklı toplamlar verir");
    expect(read(eq, 20)).toContain("250 + 375 = 625 TL maliyet");
    expect(read(eq, 20)).toContain("zarar %4 = r²");
    expect(read(eq, 50)).toContain("zarar %25");
    const loss = fig("kar-zarar-problemleri", "Fire satılabilir miktarı azaltır, ödenmiş maliyeti silmez");
    expect(read(loss, 0)).toContain("Kâr 900 TL, maliyete göre %50");
    expect(read(loss, 20)).toContain("gelir 48 · 45 = 2160 TL");
    expect(read(loss, 40)).toContain("Zarar 180 TL");
    const sold = fig("kar-zarar-problemleri", "Üretilen ve satılan adetleri ayır");
    expect(read(sold, 30)).toContain("= 0 TL");
    expect(read(sold, 20)).toContain("(30 − 10) · 20 − 400 = 0 TL");
    expect(read(sold, 26)).toContain("−120 TL");
  });

  it("dört yeni taktik gerçek sorularda görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["ardisik-model-kosul", "asal-kosul-filtre", "yas-sabit-hedef", "kar-zarar-esit-olan"]) {
      expect(questionTactics.some((t) => t.id === id), id).toBe(true);
      expect(fired, id).toContain(id);
    }
  });
});
