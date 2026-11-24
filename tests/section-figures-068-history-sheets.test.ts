import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { historyFigures068Sheets, yearRowLabelsFit } from "../src/learning/sectionFigures/historyFigures068Sheets";
import { lessonGuides } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge068: TYT Tarih Dünya Gücü Osmanlı, Devrimler Çağında Değişen Devlet ve
// Toplum, Uluslararası İlişkilerde Denge Stratejisi ve 20. Yüzyıl Başlarında
// Osmanlı ve Dünya kopya kâğıtlarının öğretimi özgün figür ve taktik olarak.
// Her figür daha önce çizimi olmayan gerçek bir bölüm başlığına bağlıdır.
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
const entries = Object.entries(historyFigures068Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).readout ?? []).join(" | ");
const legend = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).legend ?? []).map((l) => `${l.code} ${l.label}`).join(" | ");
const texts = (def: FigureDef, value: number, step = 0, pick = -1) =>
  def
    .draw(value, step, pick)
    .els.flatMap((e) => (e.k === "text" ? [e.s] : []))
    .join(" ");

describe("Forge068 TYT Tarih kopya kâğıdı figürleri", () => {
  it("16 figür, gerçek bölüm başlıkları, kayıtta etkin tanım, önceden figürsüz bölümler", () => {
    expect(entries.length).toBe(16);
    expect(new Set(entries.map(([g]) => g))).toEqual(new Set(["dunya-gucu-osmanli", "devrimler-caginda-devlet-toplum", "denge-stratejisi", "yirminci-yuzyil-baslarinda-osmanli"]));
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(new Set(lessonGuides.get(g)?.sections.map((s) => s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(historyFigures068Sheets[g][t]);
      const def = historyFigures068Sheets[g][t];
      expect(Boolean(def.param || def.steps || def.picks), `${t} etkileşimli`).toBe(true);
    }
    expect(yearRowLabelsFit()).toBe(true);
  });

  it("her adım, seçim ve sürgü değeri çizilir; erişilebilir ad, figcaption ve sade metin", () => {
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
      // Çizim metninde sabit renk yok: tonlar figür tema anahtarlarından gelir.
      expect(JSON.stringify(frames(def).map((f) => f.els))).not.toMatch(/#[0-9a-f]{3,6}\b|rgb\(/i);
    }
  });

  it("haritalar şematik ve ölçekli değil diye açıkça yazılır", () => {
    for (const [g, t] of [
      ["dunya-gucu-osmanli", "Kanuni’nin doğu siyaseti: harekâttan Amasya’ya"],
      ["dunya-gucu-osmanli", "Hint Deniz Seferleri: hedefi ve erişilen sonucu ayrı oku"],
      ["denge-stratejisi", "1798 Mısır: aynı Rusya yeni ortak olabilir"],
      ["denge-stratejisi", "1853–1856 Kırım Savaşı ve Paris"],
      ["yirminci-yuzyil-baslarinda-osmanli", "Çanakkale, Irak ve güney cepheleri"],
    ] as const) {
      expect(fig(g, t).caption, t).toMatch(/[Şş]ematik/);
      expect(fig(g, t).caption, t).toContain("ölçekli değil");
    }
  });

  it("Dünya Gücü Osmanlı: tür etiketli satırlar, yıl sürgüsü, doğu seferleri, hedef ve sonuç", () => {
    const fb = fig("dunya-gucu-osmanli", "Fatih’ten II. Bayezid’e: kara, deniz ve iç istikrar");
    expect(fb.picks).toHaveLength(9);
    expect(read(fb, 0)).toContain("3'ü kara, 4'ü deniz, 2'si iç düzen");
    expect(read(fb, 0, 0, 2)).toContain("1473 Otlukbeli (kara)");
    expect(read(fb, 0, 0, 2)).toContain("sona ermedi");
    expect(read(fb, 0, 0, 5)).toContain("1481–1495 Cem Sultan (iç düzen)");
    expect(texts(fb, 0)).toContain("deniz");
    const late = fig("dunya-gucu-osmanli", "1566–1595: büyük gücü sürdürmenin koşulları");
    expect(late.param).toMatchObject({ min: 1566, max: 1595, plain: true });
    expect(read(late, 1566)).toContain("1566 yılına kadar: 1 kazanım, 0 maliyet, 0 diplomasi");
    expect(read(late, 1571)).toContain("2 kazanım, 2 maliyet, 2 diplomasi");
    expect(read(late, 1571)).toContain("Son olay 1571 İnebahtı");
    expect(read(late, 1595)).toContain("3 kazanım, 4 maliyet, 3 diplomasi");
    expect(read(late, 1590)).toContain("Ferhat Paşa barışı");
    const east = fig("dunya-gucu-osmanli", "Kanuni’nin doğu siyaseti: harekâttan Amasya’ya");
    expect(east.steps).toHaveLength(4);
    expect(read(east, 0, 0)).toContain("Bağdat Osmanlı'ya geçti (1534)");
    expect(read(east, 0, 3)).toContain("Bağdat Osmanlı'da, Tebriz Safevi'de kaldı");
    expect(read(east, 0, 3)).toContain("ilk resmî antlaşma");
    expect(legend(east, 0, 3)).toContain("Amasya");
    const ind = fig("dunya-gucu-osmanli", "Hint Deniz Seferleri: hedefi ve erişilen sonucu ayrı oku");
    expect(ind.picks).toHaveLength(6);
    expect(legend(ind, 0)).toContain("Diu (1538): alınamadı");
    expect(legend(ind, 0)).toContain("Hürmüz (1552): alınamadı");
    expect(legend(ind, 0)).toContain("Aden (1538): alındı");
    expect(read(ind, 0, 0, 2)).toContain("Kuşatma başarısız");
  });

  it("Devrimler çağı: iki zincir ve zincir dışı sonuç, hak–yükümlülük, iki zıt etki, üç ordu", () => {
    const ind = fig("devrimler-caginda-devlet-toplum", "Sanayi Devrimi: üretim kadar çalışma ilişkisi");
    expect(ind.steps).toHaveLength(5);
    expect(texts(ind, 0, 0)).not.toContain("Ulus-devletlerin");
    expect(texts(ind, 0, 4)).toContain("Ulus-devletlerin zayıflaması");
    expect(read(ind, 0, 4)).toContain("bağlanmaz");
    const cit = fig("devrimler-caginda-devlet-toplum", "Yurttaşlık: haklar ve yükümlülükler");
    expect(cit.picks).toHaveLength(7);
    expect(read(cit, 0, 0, 3)).toContain("İlköğretim (hak ve yükümlülük, eğitim)");
    expect(read(cit, 0, 0, 3)).toContain("1869");
    expect(read(cit, 0, 0, 5)).toContain("Zorunlu askerlik (yükümlülük, askerlik)");
    const nat = fig("devrimler-caginda-devlet-toplum", "Milliyetçilik ve devrimlerin yayılması");
    expect(texts(nat, 0, 2)).toContain("bölücü etki");
    expect(texts(nat, 0, 2)).toContain("birleştirici etki");
    expect(texts(nat, 0, 1)).not.toContain("birleştirici");
    const army = fig("devrimler-caginda-devlet-toplum", "Nizam-ı Cedit'ten 1826'ya ordu reformu");
    expect(army.steps).toHaveLength(4);
    expect(texts(army, 0, 0)).toContain("III. Selim");
    expect(texts(army, 0, 0)).not.toContain("Vaka-i Hayriye");
    expect(texts(army, 0, 3)).toContain("(Vaka-i Hayriye)");
    expect(read(army, 0, 3)).toContain("1826'da önce ocak kaldırıldı");
  });

  it("Denge stratejisi: 1798 aşamaları, dört çıkar, Kırım ve Paris, değişen destekler", () => {
    const eg = fig("denge-stratejisi", "1798 Mısır: aynı Rusya yeni ortak olabilir");
    expect(eg.steps).toHaveLength(6);
    expect(read(eg, 0, 2)).toContain("Ebukır");
    expect(read(eg, 0, 3)).toContain("Rusya ve İngiltere ile ittifak");
    expect(read(eg, 0, 5)).toContain("1802 Paris Antlaşması");
    const pw = fig("denge-stratejisi", "1815 Viyana ve Şark Meselesi");
    expect(pw.picks?.map((p) => p.label)).toEqual(["Rusya", "İngiltere", "Fransa", "Avusturya"]);
    expect(read(pw, 0, 0, 1)).toContain("Hindistan yolu");
    expect(pw.caption).toContain("katılmadı");
    const cr = fig("denge-stratejisi", "1853–1856 Kırım Savaşı ve Paris");
    expect(cr.picks).toHaveLength(6);
    expect(read(cr, 0, 0, 1)).toContain("Kasım 1853");
    expect(read(cr, 0, 0, 4)).toContain("1871");
    expect(read(cr, 0, 0, 5)).toContain("Şubat 1856");
    const sh = fig("denge-stratejisi", "Değişen destekler ve 1914'e giden ortam");
    expect(sh.steps).toEqual(["1878", "1881", "1882", "1899–1903", "1907", "1914"]);
    expect(texts(sh, 0, 0)).toContain("Kıbrıs");
    expect(texts(sh, 0, 2)).toContain("Mısır'ı işgal etti");
    expect(texts(sh, 0, 4)).toContain("Üçlü İtilaf");
    expect(read(sh, 0, 5)).toContain("tek bir ittifaka");
  });

  it("20. yüzyıl başları: kanıt cümlesi, Balkan karşılaştırması, hedef ile sonuç, cephe grupları", () => {
    const id = fig("yirminci-yuzyil-baslarinda-osmanli", "Fikir akımları: birliği hangi temelde kuruyor?");
    expect(id.steps).toHaveLength(5);
    expect(read(id, 0, 0)).toMatch(/^Osmanlıcılık:/);
    expect(read(id, 0, 1)).toMatch(/^İslamcılık:/);
    expect(read(id, 0, 2)).toMatch(/^Türkçülük:/);
    expect(read(id, 0, 3)).toMatch(/^Batıcılık:/);
    expect(read(id, 0, 4)).toMatch(/^İslamcılık ve Batıcılık:/);
    const bk = fig("yirminci-yuzyil-baslarinda-osmanli", "1912–1913 Balkan savaşları: iki farklı çatışma");
    expect(bk.steps).toHaveLength(6);
    expect(texts(bk, 0, 0)).not.toContain("Londra");
    expect(texts(bk, 0, 3)).toContain("30 Mayıs 1913");
    expect(texts(bk, 0, 5)).toContain("Edirne Temmuz 1913'te geri alındı");
    const kk = fig("yirminci-yuzyil-baslarinda-osmanli", "Kafkas ve Kanal: hedef ile gerçekleşen sonuç");
    expect(texts(kk, 0, 4)).toContain("Sarıkamış");
    expect(read(kk, 0, 4)).toContain("Rusya'nın savaştan çekilmesidir");
    const fm = fig("yirminci-yuzyil-baslarinda-osmanli", "Çanakkale, Irak ve güney cepheleri");
    expect(fm.picks).toHaveLength(8);
    expect(legend(fm, 0)).toContain("Çanakkale: Boğaz ve başkent");
    expect(legend(fm, 0)).toContain("Galiçya: müttefike destek");
    expect(legend(fm, 0)).toContain("Kafkas: sınır ve savunma");
    expect(read(fm, 0, 0, 2)).toContain("Nisan 1916");
  });

  it("dört yeni taktik gerçek sorularda görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["osmanli-yon-rakip-sonuc", "devrim-mekanizma-zinciri", "denge-tehdit-ortak-bedel", "yuzyil-basi-neden-cephe"]) {
      expect(questionTactics.some((t) => t.id === id), id).toBe(true);
      expect(fired, id).toContain(id);
    }
  });
});
