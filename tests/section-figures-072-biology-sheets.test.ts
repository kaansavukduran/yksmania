import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures, figurePacks } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView, type El, type FigureDef } from "../src/learning/sectionFigures/figureKit";
import { biologyFigures072Sheets } from "../src/learning/sectionFigures/biologyFigures072Sheets";
import { tw } from "../src/learning/sectionFigures/biologyFigures060Kit";
import { studyGuide } from "../src/learning/guides";
import { questionTactics, tacticsFor } from "../src/learning/questionTactics";
import { lessons } from "../src/domain/content";

// Forge072: AYT Biyoloji kalp, damarlar ve Starling, soluk alışverişi ve
// gazların taşınması kopya kâğıtlarının öğretimi özgün figür ve taktik olarak.
// Her figür, ders sayfasında gerçekten gösterilen ve daha önce çizimi olmayan
// bir bölüme bağlıdır ve sayılarını kendisi hesaplar.
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
const entries = Object.entries(biologyFigures072Sheets).flatMap(([g, defs]) => Object.keys(defs).map((t) => [g, t] as const));
const read = (def: FigureDef, value: number, step = 0, pick = -1) => (def.draw(value, step, pick).readout ?? []).join(" | ");
const texts = (def: FigureDef, value: number, step = 0, pick = -1) =>
  def
    .draw(value, step, pick)
    .els.flatMap((e) => (e.k === "text" ? [e.s] : []))
    .join(" | ");
/** Seçim kartının metni (başlık ve ayrıntı). */
const card = (def: FigureDef, i: number) => [def.picks![i].title, ...def.picks![i].detail].join(" | ");

/** Metin kutusu (telefon puntosunda yaklaşık): x0, x1, y0, y1. */
const box = (e: Extract<El, { k: "text" }>) => {
  const w = tw(e.s, !!e.bold);
  const at = e.at ?? "c";
  const x0 = at.includes("e") ? e.p[0] : at.includes("w") ? e.p[0] - w : e.p[0] - w / 2;
  const y = -e.p[1];
  return { x0, x1: x0 + w, y0: y - 10, y1: y + 10 };
};

describe("Forge072 AYT Biyoloji kopya kâğıdı figürleri", () => {
  it("16 figür, görünen bölüm başlıkları, kayıtta etkin tanım, önceden figürsüz bölümler", () => {
    expect(entries.length).toBe(16);
    expect(new Set(entries.map(([g]) => g))).toEqual(new Set(["dolasim-kalp", "dolasim-damarlar-starling", "soluk-alisverisi", "solunum-gaz-tasinmasi"]));
    const earlier = figurePacks.slice(0, figurePacks.indexOf(biologyFigures072Sheets));
    for (const [g, t] of entries) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(new Set(studyGuide(g)?.sections.map((s) => s.figureTitle ?? s.title)).has(t), `${g} / ${t}`).toBe(true);
      expect(sectionFigures[g][t], `${g} / ${t}`).toBe(biologyFigures072Sheets[g][t]);
      expect(earlier.some((p) => p[g]?.[t]), `${t} önceden figürsüzdü`).toBe(false);
      const def = biologyFigures072Sheets[g][t];
      expect(Boolean(def.param || def.steps || def.picks), `${t} etkileşimli`).toBe(true);
    }
  });

  it("her adım, seçim ve sürgü değeri çizilir; erişilebilir ad, sade metin, sabit renk yok, etiket çerçevede ve çakışmasız", () => {
    for (const [g, t] of entries) {
      const def = fig(g, t);
      for (const f of frames(def)) {
        expect(f.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(f)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        const boxes = f.els.flatMap((e) => (e.k === "text" && e.s.trim() ? [{ s: e.s, ...box(e) }] : []));
        for (const b of boxes) {
          expect(b.x0, `${t}: ${b.s}`).toBeGreaterThanOrEqual(4);
          expect(b.x1, `${t}: ${b.s}`).toBeLessThanOrEqual(528);
        }
        for (let i = 0; i < boxes.length; i++)
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i];
            const b = boxes[j];
            const hit = a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
            expect(hit, `${t}: "${a.s}" ile "${b.s}" çakışıyor`).toBe(false);
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
      def.picks?.forEach((p, i) => {
        expect(texts(def, def.param?.init ?? 0, 0, -1), `${t}: ${p.label}`).toContain(p.label);
        // Seçimdeki okuma kartı tekrarlamaz: kısa bir bağ satırı verir.
        const r = def.draw(def.param?.init ?? 0, 0, i).readout ?? [];
        expect(r.length, `${t}: ${p.label}`).toBeLessThanOrEqual(2);
        for (const line of p.detail) expect(r.join(" "), `${t}: ${p.label}`).not.toContain(line);
      });
    }
  });

  it("kalp: odacık yolu, kapak ve destek, koroner beslenme, düzenleyici yönü", () => {
    const ch = fig("dolasim-kalp", "Dört odacık ve ayırıcı duvar");
    expect(ch.picks!.map((p) => p.label)).toEqual(["Sağ atriyum", "Sol atriyum", "Sağ ventrikül", "Sol ventrikül", "septum"]);
    expect(card(ch, 0)).toContain("ana toplardamar");
    expect(card(ch, 1)).toContain("yönden gelir");
    expect(card(ch, 3)).toContain("iki kat kan gönderdiği anlamına gelmez");
    expect(texts(ch, 0)).toContain("önden görünüş");
    const va = fig("dolasim-kalp", "Dört kapak ve destek düzeni");
    expect(va.picks!.map((p) => p.label)).toEqual(["triküspit", "mitral", "pulmoner", "aort kapağı", "korda + papiller kas"]);
    expect(card(va, 0)).toContain("üç yaprak");
    expect(card(va, 1)).toContain("iki yaprak");
    expect(card(va, 2)).toContain("korda ve papiller kas yoktur");
    expect(card(va, 4)).toContain("Kasılması kapağı açmaz");
    const wa = fig("dolasim-kalp", "Duvarın beslenmesi odacık kanından ayrı");
    expect(wa.steps).toEqual(["Katmanlar", "Koroner giriş", "Koroner dönüş", "Akış aksarsa"]);
    expect(texts(wa, 0, 0)).not.toContain("koroner");
    expect(texts(wa, 0, 1)).toContain("aort kökünden");
    expect(texts(wa, 0, 2)).toContain("sinüs → sağ atriyum");
    expect(read(wa, 0, 3)).toContain("Kalp durması");
    const re = fig("dolasim-kalp", "Sinir ve hormonla hız düzenlenebilir");
    expect(card(re, 0)).toContain("nörotransmiterdir, hormon değildir");
    expect(card(re, 2)).toContain("kanla taşınan hormon");
    expect(card(re, 4)).toContain("tein aynı maddenin");
    // Yön çizimde de var: vagus azaltma tonunda, diğerleri artırma ya da doza bağlı.
    const vagus = re.draw(0, 0, -1).els.find((e) => e.k === "text" && e.s === "vagus (ACh)");
    expect(vagus && vagus.k === "text" ? vagus.tone : "").toBe("b");
  });

  it("damarlar: duvar tabakaları, kılcal geçişleri, basınç profili, ödem mekanizmaları", () => {
    const wa = fig("dolasim-damarlar-starling", "Duvarın bileşimi yükle ilişkilidir");
    expect(wa.picks!.map((p) => p.label)).toEqual(["Atardamar", "Arteriyol", "Toplardamar", "Kılcal"]);
    expect(card(wa, 3)).toContain("Ayrı bir kas ya da bağ doku tabakası yoktur");
    expect(texts(wa, 0)).toContain("ölçeksiz şema");
    const ex = fig("dolasim-damarlar-starling", "Kılcal damar değişim yüzeyidir");
    expect(ex.picks!.map((p) => p.label)).toEqual(["su", "O₂", "glikoz", "CO₂", "protein", "eritrosit"]);
    expect(card(ex, 0)).toContain("Net sıvı sıfır olsa da");
    expect(card(ex, 3)).toContain("zıt yönlerde");
    const pr = fig("dolasim-damarlar-starling", "Basınç, direnç ve hız aynı büyüklük değildir");
    const drops = pr.picks!.map((_, i) => read(pr, 0, 0, i).match(/düşüş (\d+)/)![1]).map(Number);
    expect(drops).toEqual([5, 50, 20, 5, 5, 3]);
    expect(Math.max(...drops)).toBe(drops[1]); // en büyük düşüş arteriyolde
    expect(card(pr, 0)).toContain("120 ile 80");
    expect(card(pr, 0)).toContain("fark 40");
    const ed = fig("dolasim-damarlar-starling", "Klasik şemanın gerçek fizyoloji sınırı");
    expect(ed.picks!.map((p) => p.title)).toEqual(["Kılcal hidrostatik basınç artarsa", "Plazma proteini azalırsa", "Damar geçirgenliği artarsa", "Lenf tıkanırsa"]);
    expect(texts(ed, 0, 0, -1)).not.toContain("birikim olabilir");
    for (let i = 0; i < 4; i++) expect(texts(ed, 0, 0, i)).toContain("birikim olabilir");
  });

  it("soluk alışverişi: kaburga geometrisi, sakin ve zorlu veriş, denetim döngüsü", () => {
    const ri = fig("soluk-alisverisi", "Kaburgaların hareketi ve inspirasyon");
    expect(ri.steps).toHaveLength(4);
    const d0 = Math.round(260 * Math.cos((28 * Math.PI) / 180));
    const d1 = Math.round(260 * Math.cos((14 * Math.PI) / 180));
    expect([d0, d1]).toEqual([230, 252]);
    expect(texts(ri, 0, 0)).toContain(`ön–arka çap: ${d0} birim`);
    expect(texts(ri, 0, 1)).toContain(`${d0} → ${d1} birim`);
    expect(read(ri, 0, 1)).toContain("%10 artış");
    expect(texts(ri, 0, 1)).not.toContain("Palv");
    expect(texts(ri, 0, 2)).toContain("Palv 759 < Patm 760 mmHg");
    expect(read(ri, 0, 3)).toContain("difüzyonu sürer");
    const exp = fig("soluk-alisverisi", "Dinlenim ekspirasyonu ve elastik geri dönüş");
    expect(exp.steps).toEqual(["Sakin veriş", "Zorlu veriş"]);
    expect(texts(exp, 0, 0)).toContain("karın kasları | katılmaz");
    expect(texts(exp, 0, 1)).toContain("karın kasları | kasılır (karın içi)");
    expect(read(exp, 0, 0)).toContain("ATP");
    const rh = fig("soluk-alisverisi", "Solunum ritmini düzenleyen merkezler");
    expect(texts(rh, 0, 0)).not.toContain("afferent");
    expect(texts(rh, 0, 1)).toContain("afferent");
    expect(texts(rh, 0, 1)).not.toContain("efferent");
    expect(texts(rh, 0, 2)).toContain("efferent");
    expect(texts(rh, 0, 3)).toContain("geri bildirim (−)");
  });

  it("gaz taşınması: yol, içerik hesabı, devrede kısmi basınç, rakım ve CO, çözünen azot", () => {
    const ro = fig("solunum-gaz-tasinmasi", "Gazı taşımak, kanı havayla doldurmak değildir");
    expect(texts(ro, 0, 0)).not.toContain("eritrositte Hb–O₂");
    expect(texts(ro, 0, 1)).toContain("eritrositte Hb–O₂");
    expect(texts(ro, 0, 3)).toContain("doku hücresi");
    const co = fig("solunum-gaz-tasinmasi", "Kısmi basınç, doygunluk ve içerik");
    for (const hb of values(co)) {
      const total = 1.34 * hb * 0.97 + 0.003 * 95;
      expect(texts(co, hb)).toContain(`${total.toFixed(1).replace(".", ",")} mL/dL`);
      expect(texts(co, hb)).toContain("95 mmHg");
      expect(texts(co, hb)).toContain("%97");
    }
    expect(read(co, 15)).toContain("1,34 × 15 × 0,97 = 19,5 mL/dL");
    expect(read(co, 15)).toContain("0,29 mL/dL");
    const ci = fig("solunum-gaz-tasinmasi", "Gaz geçişi yönü ve dolaşım devresi");
    // Her kılcalda gaz yüksek kısmi basınçtan düşüğe geçer.
    expect(104).toBeGreaterThan(40); // alveol O₂ > gelen kan
    expect(45).toBeGreaterThan(40); // gelen kan CO₂ > alveol
    expect(card(ci, 0)).toContain("O₂ alveolden kana");
    expect(card(ci, 1)).toContain("CO₂ dokudan kana");
    expect(card(ci, 2)).toContain("oksijen miktarı adı değiştirmez");
    const al = fig("solunum-gaz-tasinmasi", "Karbonmonoksit ve yüksekliğin farklı etkisi");
    expect(Math.round(0.21 * 760)).toBe(160);
    expect(Math.round(0.21 * 380)).toBe(80);
    expect(texts(al, 0)).toContain("PO₂ ≈ 160 | ");
    expect(texts(al, 0)).toContain("PO₂ ≈ 80");
    expect(card(al, 2)).toContain("aynı gaz değildir");
    const dv = fig("solunum-gaz-tasinmasi", "Basınç değişimi ve çözünmüş gaz");
    expect(texts(dv, 0)).toContain("1,0 atm");
    expect(texts(dv, 30)).toContain("4,0 atm");
    expect(texts(dv, 30)).toContain("3,12 atm");
    expect(texts(dv, 20)).toContain("yüzeyin 3,0 katı");
    expect(read(dv, 10)).toContain("Kanda azot sıvılaşmaz");
  });

  it("dört yeni taktik gerçek sorularda görünür", () => {
    const all = lessons.flatMap((l) => l.questions).map((q) => ({
      id: q.id,
      prompt: typeof q.prompt === "string" ? q.prompt : (q.prompt as { tr?: string }).tr ?? "",
      passage: typeof q.passage === "string" ? q.passage : (q.passage as { tr?: string } | undefined)?.tr,
    }));
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const id of ["kalp-yol-kapak-sira", "damar-yapi-model-birim", "soluk-kas-hacim-basinc", "gaz-kismi-basinc-bicim"]) {
      expect(questionTactics.some((t) => t.id === id), id).toBe(true);
      expect(fired, id).toContain(id);
    }
  });
});
