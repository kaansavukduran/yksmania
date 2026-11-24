import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { geographyFigures066Sheets } from "../src/learning/sectionFigures/geographyFigures066Sheets";
import { lessonGuides } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge066: TYT Coğrafya Türkiye'nin yer şekilleri, Türkiye iklimi, Dünya'da
// nüfusun dağılışı ve Türkiye'de nüfus kopya kâğıtlarının öğretimi özgün figür
// ve taktik olarak. Her figür daha önce çizimi olmayan gerçek bir bölüm
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
const entries = Object.entries(geographyFigures066Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).readout ?? []).join(" | ");
const legend = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).legend ?? []).map((l) => `${l.code} ${l.label}`).join(" | ");

describe("Forge066 TYT Coğrafya kopya kâğıdı figürleri", () => {
  it("16 figür, gerçek bölüm başlıkları, kayıtta etkin tanım, önceden figürsüz bölümler", () => {
    expect(entries.length).toBe(16);
    expect(new Set(entries.map(([g]) => g))).toEqual(new Set(["turkiye-yer-sekilleri", "turkiye-iklimi", "dunya-nufus-dagilisi", "turkiye-nufusu"]));
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(new Set(lessonGuides.get(g)?.sections.map((s) => s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(geographyFigures066Sheets[g][t]);
      const def = geographyFigures066Sheets[g][t];
      expect(Boolean(def.param || def.steps || def.picks), `${t} etkileşimli`).toBe(true);
    }
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
      const text = JSON.stringify([def.caption, def.alt, def.steps, def.picks, frames(def).map((f) => [f.readout, f.legend])]);
      expect(text, t).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
      expect(text, t).not.toMatch(/(?<!\p{L})(turuncu|kırmızı|mavi|yeşil|mor|sarı)(?!\p{L})/iu);
      // Çizim metninde sabit renk yok: tonlar figür tema anahtarlarından gelir.
      expect(JSON.stringify(frames(def).map((f) => f.els))).not.toMatch(/#[0-9a-f]{3,6}\b|rgb\(/i);
    }
  });

  it("yer şekilleri: eğilim tek noktayı sıralamaz, yükselti engebe değildir, üç ova, plato kartları", () => {
    const avg = fig("turkiye-yer-sekilleri", "Ortalama ile tek nokta aynı değil");
    expect(read(avg, 0, 0)).toMatch(/yaklaşık 163 m yükseliyor/);
    expect(read(avg, 0, 1)).toContain("P (2.100 m) doğudaki Q'dan (1.300 m) 800 m yüksek");
    expect(read(avg, 0, 2)).toContain("700 / 2000 = %35");
    const origin = fig("turkiye-yer-sekilleri", "Dağların kökenini yapıyla ayır");
    expect(legend(origin, 0, 0)).toContain("Toroslar");
    expect(legend(origin, 0, 1)).toContain("Bozdağlar");
    expect(legend(origin, 0, 2)).toContain("Erciyes");
    expect(legend(origin, 0, 2)).toContain("Ağrı ve Tendürek");
    const plain = fig("turkiye-yer-sekilleri", "Ovada alçaklık çevresine göredir");
    expect(read(plain, 0, 0)).toContain("taban çevresinden 490 m alçak");
    expect(read(plain, 0, 1)).toContain("1.100 m alçak");
    expect(read(plain, 0, 2)).toContain("900 m alçak");
    expect(read(plain, 0, 3)).toContain("10 < 100 < 1.600 m");
    const plateau = fig("turkiye-yer-sekilleri", "Plato yalnız yüksek düz tabla değildir");
    expect(plateau.picks).toHaveLength(11);
    expect(read(plateau, 0, 0, 6)).toContain("Erzurum–Kars (Doğu Anadolu): biçim plato");
    expect(plateau.picks![6].detail.join(" ")).toContain("Lav örtüsü");
    expect(plateau.picks![9].detail.join(" ")).toContain("Karstik");
    expect(plateau.picks![10].detail.join(" ")).toContain("Alçak aşınım");
  });

  it("Türkiye iklimi: enlem sürgüsü, rüzgâr gülü, iç alanlar, üç yağış süreci", () => {
    const lat = fig("turkiye-iklimi", "Orta kuşak bir başlangıç koşuludur");
    expect(read(lat, 36)).toContain("21 Haziran öğle yüksekliği 77°27′, 21 Aralık 30°33′");
    expect(read(lat, 42)).toContain("71°27′, 21 Aralık 24°33′");
    expect(read(lat, 39)).toContain("yıl içi fark 46°54′");
    const rose = fig("turkiye-iklimi", "Hava kütleleri, basınç merkezleri ve yerel rüzgârlar");
    expect(rose.picks).toHaveLength(8);
    expect(read(rose, 0, 0, 1)).toContain("Poyraz: kuzeydoğudan eser");
    expect(read(rose, 0, 0, 5)).toContain("Lodos: güneybatıdan eser");
    expect(read(rose, 0, 0, 7)).toContain("Karayel: kuzeybatıdan eser");
    const interior = fig("turkiye-iklimi", "İç alanların tek bir karasal kalıbı yoktur");
    expect(read(interior, 0, 0, 0)).toContain("ilkbahar");
    expect(read(interior, 0, 0, 1)).toContain("yaz başı");
    expect(read(interior, 0, 0, 2)).toContain("kışta");
    const rain = fig("turkiye-iklimi", "Yağış süreci, kuraklık ve grafiğin sınırı");
    expect(read(rain, 0, 0)).toContain("Cephe");
    expect(read(rain, 0, 1)).toContain("rüzgâr önü");
    expect(read(rain, 0, 2)).toContain("kırkikindi");
    for (let s = 0; s < 3; s++) expect(read(rain, 0, s)).toContain("kar mı yağmur mu");
  });

  it("Dünya nüfusu: gösterge sırası tersine döner, liman zinciri, hız ve miktar, yükselti modeli", () => {
    const lg = fig("dunya-nufus-dagilisi", "Bir harita hangi soruyu yanıtlar?");
    expect(legend(lg, 0, 0)).toMatch(/^1 1\. sınıf: A/);
    expect(legend(lg, 0, 1)).toMatch(/^1 1\. sınıf: B/);
    expect(read(lg, 0, 1)).toContain("100.000 / 500 = 200 kişi/km²");
    expect(read(lg, 0, 1)).toContain("200.000 / 4.000 = 50");
    const port = fig("dunya-nufus-dagilisi", "Sanayi, hizmet ve bağlantı ağları");
    expect(port.steps).toHaveLength(5);
    expect(read(port, 0, 2)).toContain("hinterland");
    expect(read(port, 0, 4)).toContain("doğal kaynak");
    const rate = fig("dunya-nufus-dagilisi", "Yakın dönem miktarı ve artış hızını ayır");
    expect(read(rate, 1)).toContain("1.000 → 1.020 birim");
    expect(read(rate, 2)).toContain("%2 → %1,6");
    expect(read(rate, 2)).toContain("1.020 → 1.036,3");
    expect(read(rate, 5)).toContain("1.057,1 → 1.061,4");
    expect(read(rate, 6)).toContain("ilk kez azaldı");
    expect(read(rate, 6)).toContain("6. dönem hızı %−0,2");
    expect(read(rate, 6)).toContain("1.061,4 → 1.059,3");
    const relief = fig("dunya-nufus-dagilisi", "Yükseklik ve eğimi tek yasa sanma");
    expect(read(relief, 0, 0, 0)).toContain("25,9 °C");
    expect(read(relief, 0, 0, 2)).toContain("14,4 °C");
    expect(read(relief, 0, 0, 3)).toContain("2 °C");
    expect(27 - 2525 / 200).toBeCloseTo(14.375);
  });

  it("Türkiye nüfusu: sayım çizelgesi, tarihli yaş payları, payda, seyrek alan nedenleri", () => {
    const census = fig("turkiye-nufusu", "Sayımın amacı ve kapsamı değişir");
    expect(read(census, 0, 0)).toContain("askerlik ve vergi");
    expect(read(census, 0, 1)).toContain("13,6 milyon");
    expect(read(census, 0, 2)).toContain("(12 sayım)");
    expect(read(census, 0, 3)).toContain("veri yılı 2007, açıklama yılı 2008");
    const age = fig("turkiye-nufusu", "Yaş yapısı ve ortanca yaş");
    expect(read(age, 0, 0)).toContain("toplam %99,9");
    expect(read(age, 0, 1)).toContain("toplam %100");
    expect(read(age, 0, 1)).toContain("TÜİK ADNKS 2025");
    expect(read(age, 0, 2)).toContain("0–14 payı −1, 15–64 payı +0,2, 65+ payı +0,9");
    const den = fig("turkiye-nufusu", "İstihdam ve eğitimde payda önemlidir");
    expect(read(den, 0, 1)).toContain("≈ 13,49 milyon");
    expect(read(den, 0, 2)).toContain("bebekler paydaya girmez");
    const sparse = fig("turkiye-nufusu", "Seyrek alanların farklı nedenleri");
    expect(legend(sparse, 0, 0)).toContain("Menteşe");
    expect(legend(sparse, 0, 1)).toContain("Tuz Gölü");
    expect(read(sparse, 0, 1)).toContain("kuraklık");
    expect(legend(sparse, 0, 2)).toContain("Hakkâri");
    expect(legend(sparse, 0, 4)).toContain("Ankara: yönetim ve hizmet");
  });

  it("dört yeni taktik gerçek sorularda görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["yer-sekli-bicim-koken-konum", "iklim-etkeni-ayir", "nufus-olcu-neden-kanit", "tr-nufus-tarih-payda-sinir"]) {
      expect(questionTactics.some((t) => t.id === id), id).toBe(true);
      expect(fired, id).toContain(id);
    }
  });
});
