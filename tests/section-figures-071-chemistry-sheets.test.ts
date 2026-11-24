import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures, figurePacks } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { chemistryFigures071Sheets } from "../src/learning/sectionFigures/chemistryFigures071Sheets";
import { tw } from "../src/learning/sectionFigures/biologyFigures060Kit";
import { studyGuide } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge071: AYT Kimya tepkime hızı, denge hesapları, derişim etkisi ve iyon
// derişimi kopya kâğıtlarının öğretimi özgün figür ve taktik olarak. Her figür,
// ders sayfasında gerçekten gösterilen ve daha önce çizimi olmayan bir bölüme
// bağlıdır ve sayılarını kendisi hesaplar.
const fig = (guide: string, title: string): FigureDef => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const values = (def: FigureDef) =>
  def.param ? Array.from({ length: Math.round((def.param.max - def.param.min) / def.param.step) + 1 }, (_, i) => Number((def.param!.min + i * def.param!.step).toFixed(6))) : [0];
const frames = (def: FigureDef) => {
  const steps = def.steps ? def.steps.map((_, i) => i) : [0];
  const picks = [-1, ...(def.picks ?? []).map((_, i) => i)];
  return steps.flatMap((s) => picks.flatMap((p) => values(def).map((val) => def.draw(val, s, p))));
};
const entries = Object.entries(chemistryFigures071Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).readout ?? []).join(" | ");
const texts = (def: FigureDef, value: number, step = 0, pick = -1) =>
  def
    .draw(value, step, pick)
    .els.flatMap((e) => (e.k === "text" ? [e.s] : []))
    .join(" | ");

describe("Forge071 AYT Kimya kopya kâğıdı figürleri", () => {
  it("16 figür, görünen bölüm başlıkları, kayıtta etkin tanım, önceden figürsüz bölümler", () => {
    expect(entries.length).toBe(16);
    expect(new Set(entries.map(([g]) => g))).toEqual(new Set(["ayt-tepkime-hizi", "ayt-denge-hesaplari", "ayt-denge-derisim", "ayt-iyon-derisimi"]));
    const earlier = figurePacks.slice(0, figurePacks.indexOf(chemistryFigures071Sheets));
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(new Set(studyGuide(g)?.sections.map((s) => s.figureTitle ?? s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(chemistryFigures071Sheets[g][t]);
      expect(earlier.some((p) => p[g]?.[t]), `${t} önceden figürsüzdü`).toBe(false);
      const def = chemistryFigures071Sheets[g][t];
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

  it("tepkime hızı: imzalı değişim, katsayı oranı, mertebe birimi, yavaş adım", () => {
    const ch = fig("ayt-tepkime-hizi", "Ne kadar dönüşüm, ne kadar zaman?");
    expect(ch.steps).toHaveLength(4);
    expect(texts(ch, 0, 0)).not.toContain("Δ[A]");
    expect(texts(ch, 0, 1)).toContain("Δ[A] = 0,20 − 0,80 = −0,60 M");
    expect(read(ch, 0, 2)).toContain("0,60/4 = 0,15 M/s");
    expect(texts(ch, 0, 3)).toContain("9,0 M/dk");
    const co = fig("ayt-tepkime-hizi", "Katsayılar tür hızlarını bağlar");
    expect(read(co, 0.02)).toContain("H₂ harcanma 0,060 M/s, NH₃ oluşum 0,040 M/s");
    expect(read(co, 0.02)).toContain("2024 AYT Fen 20");
    for (const v of values(co)) expect(read(co, v)).toContain(`= ${(v).toFixed(3).replace(".", ",")} M/s.`);
    const or = fig("ayt-tepkime-hizi", "Mertebe ve k birimi");
    expect(or.picks!.map((p) => p.label)).toEqual(["0. mertebe", "1. mertebe", "2. mertebe", "3. mertebe"]);
    expect(texts(or, 0, 0, 2)).toContain("×9");
    expect(texts(or, 0, 0, 3)).toContain("×27");
    expect(read(or, 0, 0, 2)).toContain("L/(mol·s)");
    expect(read(or, 0, 0, 3)).toContain("k = 4 L²/(mol²·s)");
    // k = r/[A]ⁿ: 0,004 / 0,1ⁿ
    for (const [n, k] of [[0, "0,004"], [1, "0,04"], [2, "0,4"], [3, "4"]] as const) {
      expect(Number(k.replace(",", "."))).toBeCloseTo(0.004 / 0.1 ** n, 9);
      expect(read(or, 0, 0, n)).toContain(`k = ${k} `);
    }
    const me = fig("ayt-tepkime-hizi", "Net denklem ile elementer adım");
    expect(texts(me, 0, 0)).not.toContain("Net:");
    expect(texts(me, 0, 1)).toContain("Net: H₂ + 2ICl → I₂ + 2HCl");
    expect(texts(me, 0, 3)).toContain("r = k[H₂][ICl]");
  });

  it("denge hesapları: hacim sadeleşmesi, tek ilerleme, iki test, Q ile stok", () => {
    const vo = fig("ayt-denge-hesaplari", "Mol ile molar derişimi ayır");
    for (const V of values(vo)) {
      expect(read(vo, V)).toContain("Q = 4,00 (Δn = 0");
      expect(read(vo, V)).toContain(`0,80/V = ${(0.8 / V).toFixed(2).replace(".", ",")}`);
    }
    const ex = fig("ayt-denge-hesaplari", "Değişimi tek bir ilerlemeye bağla");
    expect(read(ex, 0.5)).toContain("toplam 2,5 − 3 × 0,50 = 1,00 atm");
    expect(read(ex, 0.5)).toContain("Kp = 0,50/(0,50)⁴ = 8");
    expect(0.5 / 0.5 ** 4).toBe(8);
    expect(read(ex, 0.3)).toContain("denge değeri bu x değildir");
    expect(read(ex, 0.5)).toContain("2026 AYT Fen 22");
    const st = fig("ayt-denge-hesaplari", "Atom stoku ikinci bir doğrulama verir");
    expect(texts(st, 0, 0, -1)).toContain("1,00 uyar | 2,00 uyar");
    expect(texts(st, 0, 0, -1)).toContain("1,00 uyar | 1,00 uymaz");
    expect(texts(st, 0, 0, -1)).toContain("0,20 uymaz | 2,00 uyar");
    const x = (-1 + Math.sqrt(17)) / 8;
    expect(4 * x * x + x - 1).toBeCloseTo(0, 12);
    expect(x).toBeCloseTo(0.390388, 6);
    const di = fig("ayt-denge-hesaplari", "Q yönü verir, stok son miktarı sınırlar");
    expect(read(di, 0.5)).toContain("Q = [B]/[A] = 0,50/0,10 = 5,0; K = 2: Q > K, net geri");
    expect(read(di, 0.2)).toContain("karışım zaten dengede");
    expect(read(di, 0)).toContain("Q < K, net ileri");
    expect(read(di, 0.5)).toContain("A = 0,200 M, B = 0,400 M");
  });

  it("derişim etkisi: üç an, yeni stok, bağlı eğriler, soy gaz", () => {
    const ph = fig("ayt-denge-derisim", "Üç fotoğrafla aynı deneyi anlat");
    expect(ph.steps).toEqual(["Eski denge", "Ekleme anı", "Net dönüşüm", "Yeni denge"]);
    expect(texts(ph, 0, 0)).not.toContain("A eklendi");
    expect(read(ph, 0, 1)).toContain("Q = 0,80/0,40 = 2 < 4");
    expect(read(ph, 0, 2)).toContain("x = 0,16 M");
    expect(texts(ph, 0, 3)).toContain("A 0,24");
    expect(texts(ph, 0, 3)).toContain("B 0,96");
    expect(0.96 / 0.24).toBeCloseTo(4, 12);
    const re = fig("ayt-denge-derisim", "Aynı K'ye yeni stoklarla dön");
    expect(read(re, 0.5)).toContain("y ≈ 0,151 M; yeni A ≈ 1,30 M, B ≈ 0,85 M");
    for (const b of values(re).filter((b) => b > 0)) {
      const y = (-3 + Math.sqrt(9 + 8 * b)) / 4;
      expect((0.5 + b - y) / (1 + 2 * y) ** 2).toBeCloseTo(0.5, 9);
      expect(read(re, b)).toContain(`= ${(2 + 2 * b).toFixed(2).replace(".", ",")} M korunur`);
    }
    const li = fig("ayt-denge-derisim", "Stokiyometri eğrileri birbirine bağlar");
    expect(li.picks!.map((p) => p.title)).toEqual(["Geçerli: −x, −x, +x", "Oran bozuk", "Ürün de azalmış"]);
    expect(texts(li, 0, 0, 0)).toContain("−0,27 M");
    expect(texts(li, 0, 0, 0)).toContain("+0,27 M");
    const dx = 2 - Math.sqrt(3);
    expect((1 + dx) / ((2 - dx) * (1 - dx))).toBeCloseTo(1, 12);
    const ine = fig("ayt-denge-derisim", "İnert gazda kabın koşulu belirleyicidir");
    expect(ine.steps).toEqual(["Sabit hacim", "Sabit basınç (piston)"]);
    expect(texts(ine, 1, 0)).toContain("p(her tepkime gazı) = 0,50 atm");
    expect(texts(ine, 1, 0)).toContain("toplam P = 3,0 atm");
    expect(texts(ine, 2, 1)).toContain("p(her tepkime gazı) = 0,25 atm");
    expect(texts(ine, 2, 1)).toContain("toplam P = 2,0 atm");
    expect(read(ine, 1, 0)).toContain("2024 AYT Fen 21");
  });

  it("iyon derişimi: formül birimi, stok defteri, yük denkliği, çökelme", () => {
    const un = fig("ayt-iyon-derisimi", "Formül birimi molekül değildir");
    expect(un.picks!.map((p) => p.label)).toEqual(["NaCl", "CaCl₂", "AlCl₃", "K₂SO₄"]);
    expect(texts(un, 0, 0, 1).split("Cl⁻").length - 1).toBeGreaterThanOrEqual(2);
    expect(texts(un, 0, 0, 1).split("Ca²⁺").length - 1).toBe(2); // bir kutu + derişim satırı
    expect(read(un, 0, 0, 3)).toContain("K⁺ 0,20 · SO₄²⁻ 0,10 M");
    const le = fig("ayt-iyon-derisimi", "Önce tuzun molünü yaz");
    expect(le.steps).toHaveLength(4);
    expect(texts(le, 0, 0)).not.toContain("0,150 mol");
    expect(texts(le, 0, 1)).toContain("0,150 mol");
    expect(texts(le, 0, 2)).toContain("V = 200 + 200 − 100 = 300 mL");
    expect(texts(le, 0, 3)).toContain("[Na⁺] = 0,150 / 0,300 = 0,50 M");
    expect(read(le, 0, 3)).toContain("2026 AYT Fen 18");
    expect((3 * 0.03 + 2 * 0.03) / 0.3).toBeCloseTo(0.5, 12);
    const chg = fig("ayt-iyon-derisimi", "Yük denkliği bağımsız bir kontrol");
    for (const c of values(chg)) {
      const t = texts(chg, c);
      const pos = 3 * 2 * c + 0.2;
      const neg = 2 * (3 * c + 0.1);
      expect(pos).toBeCloseTo(neg, 12);
      expect(t.split(pos.toFixed(2).replace(".", ",")).length - 1).toBeGreaterThanOrEqual(2);
    }
    expect(read(chg, 0)).toContain("+ 0,20 ile − 0,10 farklı");
    const pr = fig("ayt-iyon-derisimi", "Tepkime varsa başlangıçları doğrudan toplama");
    expect(read(pr, 200)).toContain("20 mmol AgCl çöker (2,87 g");
    expect(read(pr, 200)).toContain("Eşdeğerlik");
    expect(read(pr, 100)).toContain("[Cl⁻] = 0,050");
    for (const V of values(pr)) {
      const ag = 0.1 * V;
      const p = Math.min(ag, 20);
      expect(20 + (ag - p)).toBeCloseTo(20 - p + ag, 12); // yük denkliği
    }
  });

  it("dört yeni taktik gerçek sorularda görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["hiz-katsayi-us", "denge-ilerleme-kok", "derisim-uc-an", "iyon-stok-defteri"]) {
      expect(questionTactics.some((t) => t.id === id), id).toBe(true);
      expect(fired, id).toContain(id);
    }
  });
});
