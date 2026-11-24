import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { biologyFigures067Sheets, evidenceTableNeed } from "../src/learning/sectionFigures/biologyFigures067Sheets";
import { lessonGuides } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge067: TYT Biyoloji Hücre Organelleri, Besin Zinciri ve Ağı, Canlıların
// Sınıflandırılması ve Mendel'den Sapmalar kopya kâğıtlarının öğretimi özgün
// figür ve taktik olarak. Her figür daha önce çizimi olmayan gerçek bir bölüm
// başlığına bağlıdır ve sayılarını kendisi hesaplar.
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
const entries = Object.entries(biologyFigures067Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).readout ?? []).join(" | ");
const texts = (def: FigureDef, value: number, step = 0, pick = -1) =>
  def
    .draw(value, step, pick)
    .els.flatMap((e) => (e.k === "text" ? [e.s] : []))
    .join(" | ");

describe("Forge067 TYT Biyoloji kopya kâğıdı figürleri", () => {
  it("16 figür, gerçek bölüm başlıkları, kayıtta etkin tanım, önceden figürsüz bölümler", () => {
    expect(entries.length).toBe(16);
    expect(new Set(entries.map(([g]) => g))).toEqual(new Set(["hucre-organelleri", "besin-zinciri-agi", "canlilarin-siniflandirilmasi", "mendelden-sapmalar"]));
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(new Set(lessonGuides.get(g)?.sections.map((s) => s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(biologyFigures067Sheets[g][t]);
      const def = biologyFigures067Sheets[g][t];
      expect(Boolean(def.param || def.steps || def.picks), `${t} etkileşimli`).toBe(true);
    }
  });

  it("her adım, seçim ve sürgü değeri çizilir; erişilebilir ad, figcaption ve sade metin", () => {
    for (const [g, t] of entries) {
      const def = fig(g, t);
      for (const f of frames(def)) {
        expect(f.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(f)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        // Çizim 532 birimlik çerçevenin içinde kalır (ölçek 1).
        for (const e of f.els) if (e.k === "text" && e.s.trim()) expect(e.p[0], `${t}: ${e.s}`).toBeGreaterThanOrEqual(0);
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
    }
    expect(evidenceTableNeed).toBeLessThanOrEqual(528);
  });

  it("hücre organelleri: kanıt tablosu, n − 1 peptit bağı, salgı yolunda bozulma, bölmeler, iki organel", () => {
    const ev = fig("hucre-organelleri", "Hücreyi parça listesi olarak değil, iş bölümü olarak oku");
    expect(ev.picks).toHaveLength(7);
    expect(read(ev, 0, 0, 1)).toContain("Ribozom: prokaryotta var, bitkide var, hayvanda var; ökaryot kanıtı hayır");
    expect(read(ev, 0, 0, 5)).toContain("ökaryot kanıtı evet");
    expect(read(ev, 0, 0, 5)).toContain("2026 TYT Fen 17");
    expect(ev.picks![3].detail.join(" ")).toContain("kitinli");
    expect(ev.picks![4].detail.join(" ")).toContain("alyuvar");
    const rib = fig("hucre-organelleri", "Çekirdek ve ribozom: bilgi ile üretim ayrı yerlerdir");
    for (let n = 2; n <= 10; n++) expect(read(rib, n)).toContain(`${n} amino asit → ${n - 1} peptit bağı`);
    expect(read(rib, 5)).toContain("mRNA'da 5 kodon");
    expect(rib.draw(7, 0).els.filter((e) => e.k === "circle" && e.r === 9)).toHaveLength(7);
    const route = fig("hucre-organelleri", "Salgı yolu: ribozom, granüllü ER, Golgi, vezikül");
    expect(route.picks).toHaveLength(4);
    expect(texts(route, 0, 0, 2)).toContain("aksar");
    expect(texts(route, 0, 0, 2).split("ürün ulaşmaz").length - 1).toBe(2);
    expect(read(route, 0, 0, 2)).toContain("Golgi zinciri kurmaz");
    const pockets = fig("hucre-organelleri", "Lizozom, peroksizom ve koful aynı işi yapmaz");
    expect(texts(pockets, 0)).toContain("2 H₂O₂ → 2 H₂O + O₂");
    expect(read(pockets, 0, 0, 0)).toContain("Enzimini kendisi üretmez");
    expect(read(pockets, 0, 0, 2)).toContain("2023 TYT Fen 15");
    const mc = fig("hucre-organelleri", "Mitokondri ile kloroplast enerjiyi dönüştürür");
    expect(texts(mc, 0, 0)).toContain("Çift zar");
    expect(texts(mc, 0, 0)).not.toContain("Krista");
    expect(texts(mc, 0, 1)).toContain("Krista");
    expect(texts(mc, 0, 2)).toContain("Klorofil");
    expect(texts(mc, 0, 3)).toContain("Kök hücresi");
    expect(read(mc, 0, 3)).toContain("ATP yalnız mitokondride üretilmez");
  });

  it("besin zinciri ve ağı: ok anahtarı, n − 1 aktarım, üç zincirli göl ağı, kaskat", () => {
    const arrow = fig("besin-zinciri-agi", "Okun yönü avcının baktığı yön değildir");
    expect(texts(arrow, 0, 0)).toContain("yenilenden yiyene");
    expect(texts(arrow, 0, 1)).toContain("avcıdan ava");
    expect(texts(arrow, 0, 2)).toContain("ısı");
    const chain = fig("besin-zinciri-agi", "Bir zinciri tek bir yol olarak kur");
    expect(read(chain, 2)).toContain("2 canlı, 1 ok");
    expect(read(chain, 2)).toContain("2. trofik düzey, birincil tüketici");
    expect(read(chain, 5)).toContain("5 canlı, 4 ok");
    expect(read(chain, 5)).toContain("5. trofik düzey, dördüncül tüketici");
    expect(texts(chain, 4)).toContain("düzey değil");
    const web = fig("besin-zinciri-agi", "Ağ, kesişen zincirleri bir arada gösterir");
    expect(read(web, 0, 0)).toContain("Balıkçıl bu yolda 4. düzeyde");
    expect(read(web, 0, 1)).toContain("Balıkçıl bu yolda 3. düzeyde");
    expect(read(web, 0, 3)).toContain("6 canlı, 6 ok, 3 zincir");
    expect(web.draw(0, 3).els.filter((e) => e.k === "vec")).toHaveLength(6);
    const cas = fig("besin-zinciri-agi", "Dolaylı etkiyi neden zinciriyle açıkla");
    expect(texts(cas, 0, 0)).toContain("azalır");
    expect(texts(cas, 0, 0)).not.toContain("artabilir");
    expect(texts(cas, 0, 2)).toContain("azalabilir");
    expect(texts(cas, 0, 3)).toContain("Başka avcı");
    expect(read(cas, 0, 3)).toContain("kesin nüfus");
  });

  it("sınıflandırma: daralan basamak, tür ölçütü yolu, ikili ad, çürütme kartı", () => {
    const lad = fig("canlilarin-siniflandirilmasi", "Çeşitliliği düzenlemek, akrabalığı açıklamak");
    const kept = [1, 2, 3, 4, 5, 6, 7, 8].map((r) => Number(/örnek: (\d+) \/ 9/.exec(read(lad, r))?.[1]));
    expect(kept).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);
    expect(read(lad, 6)).toContain("Familya: Canidae");
    expect(read(lad, 8)).toContain("Tür: Canis lupus");
    expect(read(lad, 1)).toContain("2024 TYT Fen 17");
    const sp = fig("canlilarin-siniflandirilmasi", "Tür ölçütünü verilen canlıya göre kullan");
    expect(sp.picks).toHaveLength(4);
    expect(read(sp, 0, 0, 0)).toContain("2n = 64 ve 62");
    expect(read(sp, 0, 0, 0)).toContain("kısırdır");
    expect(read(sp, 0, 0, 2)).toContain("çiftleşme deneyi uygulanamaz");
    expect(read(sp, 0, 0, 1)).toContain("2n = 38");
    const nm = fig("canlilarin-siniflandirilmasi", "İkili ad iki sözcükle bir bütündür");
    expect(texts(nm, 0, 0)).toContain("Octopus");
    expect(read(nm, 0, 1)).toContain("aynı cinstedir (Canis)");
    expect(read(nm, 0, 2)).toContain("ikinci sözcük aynı");
    expect(texts(nm, 0, 3)).toContain("H. sapiens");
    const cl = fig("canlilarin-siniflandirilmasi", "Kesinlik sözcüğünü kanıtla sınırla");
    expect(cl.picks).toHaveLength(5);
    expect(read(cl, 0, 0, 0)).toContain("2n = 64");
    expect(read(cl, 0, 0, 0)).toContain("2021 TYT Fen 17");
    expect(read(cl, 0, 0, 1)).toContain("2020 TYT Fen 17");
    expect(read(cl, 0, 0, 2)).toContain("Amip");
  });

  it("Mendel'den sapmalar: değişen varsayım, MN çaprazlamaları, 9:3:4 ve 1:4:6:4:1 sayımı", () => {
    const ch = fig("mendelden-sapmalar", "Hangi varsayım değişti?");
    expect(ch.picks).toHaveLength(4);
    expect(read(ch, 0, 0, 0)).toContain("1:2:1");
    expect(read(ch, 0, 0, 1)).toContain("4 alelde 10");
    expect(read(ch, 0, 0, 2)).toContain("yalnız AB ve ab");
    const co = fig("mendelden-sapmalar", "Eş baskınlıkta iki etkinin birlikte görünmesi");
    expect(read(co, 0, 0)).toContain("bütün kutular MN");
    expect(read(co, 0, 1)).toContain("MM 1/4, MN 1/2, NN 1/4");
    expect(read(co, 0, 2)).toContain("MN 1/2, NN 1/2");
    const mu = fig("mendelden-sapmalar", "Birden çok gen, birden çok etki");
    expect(read(mu, 0, 0)).toContain("pleiotropi");
    expect(read(mu, 0, 1)).toContain("koyu 9, açık 3, pigmentsiz 4 → 9:3:4");
    expect(read(mu, 0, 2)).toContain("1, 4, 6, 4, 1 (toplam 16)");
  });

  it("dört yeni taktik gerçek sorularda görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["organel-fiil-kanit", "besin-agi-son-ok", "siniflandirma-yon-kapsam", "sapma-degisken-sec"]) {
      expect(questionTactics.some((t) => t.id === id), id).toBe(true);
      expect(fired, id).toContain(id);
    }
  });
});
