import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures, figurePacks } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { physicsFigures070Sheets } from "../src/learning/sectionFigures/physicsFigures070Sheets";
import { tw } from "../src/learning/sectionFigures/biologyFigures060Kit";
import { studyGuide } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge070: TYT Fizik Doğrusal Hareket, Enerji ve Hareket, Elektrik Akımı ve
// Sıvılarda Kaldırma Kuvveti kopya kâğıtlarının öğretimi özgün figür ve
// taktik olarak. Her figür, ders sayfasında gerçekten gösterilen ve daha önce
// çizimi olmayan bir bölüme bağlıdır ve sayılarını kendisi hesaplar.
const fig = (guide: string, title: string): FigureDef => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const values = (def: FigureDef) =>
  def.param ? Array.from({ length: Math.round((def.param.max - def.param.min) / def.param.step) + 1 }, (_, i) => def.param!.min + i * def.param!.step) : [0];
const frames = (def: FigureDef) => {
  const steps = def.steps ? def.steps.map((_, i) => i) : [0];
  const picks = [-1, ...(def.picks ?? []).map((_, i) => i)];
  return steps.flatMap((s) => picks.flatMap((p) => values(def).map((val) => def.draw(val, s, p))));
};
const entries = Object.entries(physicsFigures070Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).readout ?? []).join(" | ");
const texts = (def: FigureDef, value: number, step = 0, pick = -1) =>
  def
    .draw(value, step, pick)
    .els.flatMap((e) => (e.k === "text" ? [e.s] : []))
    .join(" | ");

describe("Forge070 TYT Fizik kopya kâğıdı figürleri", () => {
  it("15 figür, görünen bölüm başlıkları, kayıtta etkin tanım, önceden figürsüz bölümler", () => {
    expect(entries.length).toBe(15);
    expect(new Set(entries.map(([g]) => g))).toEqual(new Set(["dogrusal-hareket", "enerji-ve-hareket", "elektrik-akimi", "sivilarin-kaldirma-kuvveti"]));
    const earlier = figurePacks.slice(0, figurePacks.indexOf(physicsFigures070Sheets));
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      // Ders sayfası studyGuide ile kurulur; bölüm orada görünmelidir.
      expect(new Set(studyGuide(g)?.sections.map((s) => s.figureTitle ?? s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(physicsFigures070Sheets[g][t]);
      expect(earlier.some((p) => p[g]?.[t]), `${t} önceden figürsüzdü`).toBe(false);
      const def = physicsFigures070Sheets[g][t];
      expect(Boolean(def.param || def.steps || def.picks), `${t} etkileşimli`).toBe(true);
    }
  });

  it("her adım, seçim ve sürgü değeri çizilir; erişilebilir ad, sade metin, sabit renk yok, etiket çerçevede", () => {
    for (const [g, t] of entries) {
      const def = fig(g, t);
      for (const f of frames(def)) {
        expect(f.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(f)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        for (const e of f.els)
          if (e.k === "text" && e.s.trim()) {
            const w = tw(e.s, !!e.bold);
            const at = e.at ?? "c";
            const x0 = at.includes("e") ? e.p[0] : at.includes("w") ? e.p[0] - w : e.p[0] - w / 2;
            expect(x0, `${t}: ${e.s}`).toBeGreaterThanOrEqual(4);
            expect(x0 + w, `${t}: ${e.s}`).toBeLessThanOrEqual(528);
          }
      }
      expect(def.caption.length, t).toBeGreaterThan(60);
      expect(def.alt.length, t).toBeGreaterThan(40);
      const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title: t }));
      expect(html).toContain('role="img"');
      expect(html).toContain("<figcaption>");
      const text = JSON.stringify([def.caption, def.alt, def.steps, def.picks, frames(def).map((f) => [f.readout, f.legend, f.els.flatMap((e) => (e.k === "text" ? [e.s] : []))])]);
      expect(text, t).not.toMatch(/[✓✕✦★➜—]|\.\.\./);
      expect(text, t).not.toMatch(/(?<!\p{L})(turuncu|kırmızı|mavi|yeşil|mor|sarı)(?!\p{L})/iu);
      expect(text, t).not.toMatch(/https?:|drive\.google|osym\.gov/i);
      expect(JSON.stringify(frames(def).map((f) => f.els))).not.toMatch(/#[0-9a-f]{3,6}\b|rgb\(/i);
    }
  });

  it("seçimli figürlerde her kart çizimde seçilebilir bir etikete bağlıdır", () => {
    for (const [g, t] of entries) {
      const def = fig(g, t);
      const picks = def.draw(def.param?.init ?? 0, 0, -1).els.flatMap((e) => (e.k === "text" && e.pick !== undefined ? [e.pick] : []));
      expect(new Set(picks).size, `${g} / ${t}`).toBe(def.picks?.length ?? 0);
    }
  });

  it("g gerektiren her figür g = 10 m/s² değerini açıkça yazar", () => {
    for (const t of ["Üç enerji modelinin varsayımları", "Enerji çözümünü planla"]) expect(fig("enerji-ve-hareket", t).caption).toContain("g = 10 m/s²");
    for (const t of ["Tekne ve yükte ağırlık hacme çevrilir", "Gazlar da kaldırır, fakat her yükselme Arşimet değildir", "Denge, ilk eğilim ve veri yeterliliğini denetle"]) {
      const def = fig("sivilarin-kaldirma-kuvveti", t);
      expect(def.caption + read(def, def.param?.init ?? 0), t).toContain("g = 10 m/s²");
    }
  });

  it("doğrusal hareket: eksen seçimi, iki ortalama, bekleme, eşit yol / eşit süre, işaretli alan", () => {
    const re = fig("dogrusal-hareket", "Hareket gözlemci ve referansla tanımlanır");
    expect(re.steps).toHaveLength(3);
    expect(read(re, 0, 0)).toContain("Δx = son − ilk = +5 m; yol L = 8 + 3 = 11 m");
    expect(read(re, 0, 1)).toContain("Δx = son − ilk = −5 m");
    expect(texts(re, 0, 2)).toContain("x = +18 m");
    expect(read(re, 0, 2)).toContain("Δx = son − ilk = +5 m");
    const me = fig("dogrusal-hareket", "İki ortalamanın payları farklı");
    expect(read(me, 10)).toContain("Ortalama hız = 30/15 ≈ 2 m/s doğuya; ortalama sürat = 50/15 ≈ 3,33 m/s");
    expect(read(me, 40)).toContain("ortalama hız 0, ortalama sürat 0 değil");
    for (const d of values(me)) expect(Math.abs(40 - d)).toBeLessThanOrEqual(40 + d);
    const wa = fig("dogrusal-hareket", "Bekleme de zamandır");
    expect(read(wa, 3)).toContain("toplam süre 2 + 3 + 2 = 7 s");
    expect(read(wa, 3)).toContain("Ortalama sürat 14/7 ≈ 2 m/s");
    expect(read(wa, 0)).toContain("14/4 ≈ 3,5 m/s");
    const eq = fig("dogrusal-hareket", "Eşit süre ve eşit yol ortalamaları");
    expect(read(eq, 30)).toContain("≈ 15 m/s");
    expect(read(eq, 30)).toContain("(u + w)/2 = 20 m/s");
    expect(texts(eq, 30)).toContain("4 s: 80 m → 20 m/s");
    expect(read(eq, 10)).toContain("aynı sonucu verir");
    const ar = fig("dogrusal-hareket", "Hız grafiği: alan ile yol");
    expect(ar.steps).toHaveLength(5);
    expect(texts(ar, 0, 0)).not.toContain("+8 m");
    expect(texts(ar, 0, 2)).toContain("+8 m");
    expect(texts(ar, 0, 3)).toContain("−1 m");
    expect(read(ar, 0, 1)).toContain("dönüş t = 4 s");
    expect(read(ar, 0, 4)).toContain("Δx = 8 + 4 − 1 − 4 = +7 m; yol L = 8 + 4 + 1 + 4 = 17 m");
  });

  it("enerji: taşıyıcı ve verim, üç model, eşikte durma, planlı bilanço", () => {
    const ca = fig("enerji-ve-hareket", "Birincil kaynak ve enerji taşıyıcısı");
    expect(read(ca, 40)).toContain("3,6/0,4 ≈ 9 MJ");
    expect(read(ca, 90)).toContain("3,6/0,9 ≈ 4 MJ");
    expect(read(ca, 40)).toContain("kWh enerji birimidir");
    const mo = fig("enerji-ve-hareket", "Üç enerji modelinin varsayımları");
    expect(mo.picks!.map((p) => p.label)).toEqual(["İş–kinetik enerji", "Mekanik enerji", "Güç ve verim"]);
    expect(read(mo, 0, 0, 0)).toContain("yerçekiminin işi −200 J");
    expect(read(mo, 0, 0, 1)).toContain("iki kez sayar");
    expect(read(mo, 0, 0, 2)).toContain("200/0,8 = 250 J");
    expect(read(mo, 0, 0, 2)).toContain("2019 TYT Fen 3");
    const th = fig("enerji-ve-hareket", "Sıfır ve eşik durumları");
    expect(read(th, 6)).toContain("Ek = 20 − 12 = 8 J");
    expect(read(th, 10)).toContain("20/2 = 10 m");
    expect(read(th, 12)).toContain("Formül 20 − 24 = −4 J verir; kinetik enerji negatif olamaz");
    const pl = fig("enerji-ve-hareket", "Enerji çözümünü planla");
    expect(pl.steps).toHaveLength(5);
    expect(texts(pl, 0, 0)).toContain("F = 10 N (ip)");
    expect(texts(pl, 0, 2)).toContain("F: +30 J");
    expect(texts(pl, 0, 2)).toContain("f: −6 J");
    expect(read(pl, 0, 3)).toContain("v = √33 ≈ 5,74 m/s");
  });

  it("elektrik akımı: üç ampermetre aynı akım, potansiyel merdiveni, parlaklık ve güvenlik", () => {
    const se = fig("elektrik-akimi", "Yük hareketi var; yük tüketimi yok");
    expect(se.steps).toHaveLength(4);
    expect(texts(se, 0, 0)).toContain("? A");
    expect(read(se, 0, 1)).toContain("I = q/t = 5 A");
    expect(read(se, 0, 2)).toContain("I = q/t = 5 A");
    expect(read(se, 0, 2)).toContain("0,005 A");
    expect(read(se, 0, 3)).toContain("9,6 C; I = q/t = 3,2 A");
    expect(texts(se, 0, 3).split("3,2 A").length - 1).toBe(3);
    const po = fig("elektrik-akimi", "Gerilim enerji başına değil, yük başına enerjidir");
    expect(read(po, 4)).toContain("I = 18/6 ≈ 3 A");
    expect(read(po, 4)).toContain("V₁ = I·R₁ ≈ 6 V, V₂ = I·R₂ ≈ 12 V; toplam 18 V");
    for (const r of values(po)) {
      const I = 18 / (2 + r);
      expect(I * 2 + I * r).toBeCloseTo(18, 9);
    }
    const br = fig("elektrik-akimi", "Güç ve enerjiyle parlaklığı ve güvenliği yorumla");
    expect(br.steps).toHaveLength(4);
    expect(read(br, 0, 1)).toContain("K 16 W, L 4 W, M 4 W");
    expect(read(br, 0, 1)).toContain("2023 TYT Fen 5");
    expect(read(br, 0, 2)).toContain("K 9 W, L 9 W, M 0 W");
    expect(read(br, 0, 3)).toContain("ana akım I = 12/4 = 3 A");
    expect(read(br, 0, 3)).toContain("sigorta");
    // P = I²R ile Reş tutarlı: toplam güç V²/Reş.
    for (const [i, total] of [[1, 24], [2, 18], [3, 36]] as const) {
      const sum = (read(br, 0, i).match(/K (\d+) W, L (\d+) W, M (\d+) W/) ?? []).slice(1).map(Number).reduce((a, b) => a + b, 0);
      expect(sum).toBe(total);
    }
  });

  it("kaldırma kuvveti: tekne ve dip, üç akışkan, ilk eğilim ve son denge", () => {
    const bo = fig("sivilarin-kaldirma-kuvveti", "Tekne ve yükte ağırlık hacme çevrilir");
    expect(read(bo, 0.8)).toContain("ek yer değiştirme m/ρs = 0,8 kg / 1000 kg/m³ = 0,8 L");
    expect(read(bo, 0.8)).toContain("0,1 L su");
    expect(read(bo, 0.8)).toContain("0,7 L azalır; 500 cm² kesitli kapta düzey 1,4 cm düşer");
    const fl = fig("sivilarin-kaldirma-kuvveti", "Gazlar da kaldırır, fakat her yükselme Arşimet değildir");
    expect(read(fl, 2)).toContain("Su 20 N, yağ 16 N, hava 0,024 N");
    const eqf = fig("sivilarin-kaldirma-kuvveti", "Denge, ilk eğilim ve veri yeterliliğini denetle");
    expect(eqf.steps).toEqual(["İlk konum", "İp kesildi", "Son denge", "Veri kontrolü"]);
    expect(texts(eqf, 0, 0)).toContain("T = 7 N");
    expect(texts(eqf, 0, 1)).not.toContain("T = 7 N");
    expect(texts(eqf, 0, 1)).toContain("net 7 N yukarı");
    expect(read(eqf, 0, 2)).toContain("Vb = 0,0003 m³ = 0,3 L");
    expect(read(eqf, 0, 3)).toContain("2020 TYT Fen 3");
  });

  it("dört yeni taktik gerçek sorularda görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["hareket-pay-payda", "enerji-model-esik", "akim-dugum-guc", "kaldirma-durum-sec"]) {
      expect(questionTactics.some((t) => t.id === id), id).toBe(true);
      expect(fired, id).toContain(id);
    }
  });
});
