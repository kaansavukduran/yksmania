import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { LABEL_FS, SMALL_FS, textWidth } from "../src/learning/sectionFigures/labelPlacement";
import { PW } from "../src/learning/sectionFigures/biologyFigures060Kit";
import type { El, FigureDef } from "../src/learning/sectionFigures/figureKit";

// Forge060 AYT Biyoloji figürleri: her figür piksel ölçekli çerçeveye oturur
// (ölçek 1), etiketler çerçevenin içinde kalır ve sayılar bölüm metnindeki
// örneklerle aynı hesaptan gelir.
const GUIDES = [
  "destek-hareket-kemik",
  "destek-hareket-kikirdak-eklem",
  "duyu-organlari-dil-burun",
  "sindirim-agiz-yutak-yemek-borusu",
  "sindirim-mide",
  "sindirim-bagirsaklar",
  "sindirim-karaciger-safra",
  "sindirim-pankreas",
  "ureme-kadin-organlar",
  "erkek-ureme-organlari",
  "genetik-cesitlilik",
  "ayt-biyoteknoloji",
  "kalitim-molekulu-kesfi",
  "ayt-fermantasyon",
  "ayt-meristem-doku",
  "ayt-iletim-doku",
  "bitki-madde-tasinmasi",
  "bitki-kok-anatomisi",
  "ayt-yaprak-yapisi",
  "ayt-govde-yapisi",
  "bitki-ortu-doku",
  "ayt-temel-doku",
];

const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const states = (def: FigureDef) => {
  const values = def.param ? [def.param.min, def.param.init, def.param.max] : [0];
  const steps = def.steps ? def.steps.map((_, i) => i) : [0];
  const picks = def.picks ? [-1, ...def.picks.map((_, i) => i)] : [-1];
  return values.flatMap((value) => steps.flatMap((step) => picks.map((pick) => ({ value, step, pick }))));
};
const points = (e: El): (readonly [number, number])[] => {
  switch (e.k) {
    case "seg":
    case "vec":
    case "line":
    case "ray":
      return [e.a, e.b];
    case "poly":
      return e.ps;
    case "circle":
      return [
        [e.c[0] - e.r, e.c[1] - e.r],
        [e.c[0] + e.r, e.c[1] + e.r],
      ];
    default:
      return [];
  }
};

describe("Forge060 AYT Biyoloji bölüm figürleri", () => {
  it("her derse en az dört figür kaydeder", () => {
    for (const g of GUIDES) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(Object.keys(sectionFigures[g] ?? {}).length, g).toBeGreaterThanOrEqual(4);
    }
  });

  it("her figür başlığı ölçek ya da kaynak durumunu söyler", () => {
    for (const g of GUIDES)
      for (const [title, def] of Object.entries(sectionFigures[g]))
        expect(def.caption, `${g} / ${title}`).toMatch(/ölçekli|bölüm|model|şema/i);
  });

  it("çizim ve etiketler çerçevenin içinde kalır (ölçek 1)", () => {
    const bad: string[] = [];
    for (const g of GUIDES)
      for (const [title, def] of Object.entries(sectionFigures[g]))
        for (const st of states(def)) {
          const els = def.draw(st.value, st.step, st.pick).els;
          const fr = els.slice(-2);
          const h = fr[1].k === "text" ? -fr[1].p[1] : NaN;
          expect(Number.isFinite(h), title).toBe(true);
          expect(def.maxHeight ?? 480, title).toBeGreaterThanOrEqual(h + 100);
          for (const e of els.slice(0, -2)) {
            for (const [x, y] of points(e))
              if (x < -0.5 || x > PW + 0.5 || -y < -0.5 || -y > h + 0.5) bad.push(`${g} / ${title} [${st.step}] çizgi ${x.toFixed(0)},${(-y).toFixed(0)}`);
            if (e.k === "text" && e.s.trim()) {
              const fs = e.small ? SMALL_FS : LABEL_FS;
              const w = textWidth(e.s, fs, e.small ? 500 : e.bold ? 700 : 600) + (e.pick !== undefined ? 14 : 0);
              const at = e.at ?? "c";
              const x = e.p[0];
              const [x0, x1] = at === "e" || at === "ne" || at === "se" ? [x + 12, x + 12 + w] : at === "w" || at === "nw" || at === "sw" ? [x - 12 - w, x - 12] : [x - w / 2, x + w / 2];
              const y = -e.p[1];
              if (x0 < 4 || x1 > PW - 4 || y < 8 || y > h - 8) bad.push(`${g} / ${title} [${st.step}] etiket "${e.s}" ${x0.toFixed(0)}–${x1.toFixed(0)}, y ${y.toFixed(0)}`);
            }
          }
        }
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("kemik sayımı alt toplamlarla tutarlıdır", () => {
    const r = (fig("destek-hareket-kemik", "Tipik yetişkin sayımında eksen ve üyeler").draw(0, 0).readout ?? []).join(" ");
    expect(r).toContain("206 = 206; 80 = 80; 29 = 29; 126 = 126");
  });

  it("bölüm örnekleri sonuç satırında aynı hesapla çıkar", () => {
    const ro = (g: string, t: string, v = 0, st = 0) => (fig(g, t).draw(v, st).readout ?? []).join(" ");
    expect(ro("sindirim-agiz-yutak-yemek-borusu", "Dişin görünen tacı ile canlı pulpasını ayır")).toContain("= 8; 4 × 8 = 32 diş");
    expect(ro("sindirim-agiz-yutak-yemek-borusu", "Hidroliz, zincir sayısı ve ürünün kimliği", 3)).toContain("4 parça, bunların 0 tanesi serbest glikoz");
    expect(ro("sindirim-agiz-yutak-yemek-borusu", "Hidroliz, zincir sayısı ve ürünün kimliği", 19)).toContain("20 parça, bunların 20 tanesi");
    expect(ro("sindirim-bagirsaklar", "Bir bilanço kur, eksik bilgiyi üretme", 0, 4)).toContain("800 + 200 − 700 − 100 = 200 mL");
    expect(ro("sindirim-karaciger-safra", "Geri dönen safra tuzuyla bir havuz kur", 80)).toContain("80 birim döner, 20 birim kaybolur");
    expect(ro("sindirim-pankreas", "Asit-baz eşdeğeri hesabını sınırla", 6)).toContain("6 birim nötralize edilir; 2 birim asit");
    expect(ro("sindirim-pankreas", "Asit-baz eşdeğeri hesabını sınırla", 10)).toContain("8 birim nötralize edilir; 0 birim asit, 2 birim");
    expect(ro("erkek-ureme-organlari", "Seçici kanal ve hücre sayısı modeli", 4)).toContain("4 × 4C = 8 × 2C = 16 × 1C = 16 × 1C = 16C");
    expect(ro("genetik-cesitlilik", "Bağımsız dağılım için fiziksel yerleşimi denetle", 3)).toContain("= 8 teorik gamet türü");
    expect(ro("ayt-biyoteknoloji", "PCR hedef DNA'yı çoğaltır", 10)).toContain("= 1.024 kopya");
    expect(ro("kalitim-molekulu-kesfi", "Chargaff bileşimi ölçer, diziyi doğrudan çözmez", 30)).toContain("G = C = (100 − 60) / 2 = %20");
    expect(ro("ayt-fermantasyon", "Glikoliz: iki üç karbonlu ürün", 0, 2)).toContain("4 − 2 = 2 ATP");
    expect(ro("ayt-fermantasyon", "Bütçeyi kur, ardından kontrol et", 1)).toContain("karbon 6 = 4 + 2");
    expect(ro("ayt-meristem-doku", "İdeal soyu sayısallaştır", 3)).toContain("8 hücre; yeni hücre ve bölünme olayı = 8 − 1 = 7");
    expect(ro("bitki-madde-tasinmasi", "Su potansiyelinde işareti ve kapsamı yaz", -0.9)).toContain("−0,2 ile −0,9 MPa: A → B");
    expect(ro("bitki-madde-tasinmasi", "Su potansiyelinde işareti ve kapsamı yaz", -0.2)).toContain("net yön yok");
    expect(ro("ayt-govde-yapisi", "Düğüm, iki düğüm arası ve yaprak izini ayır", 5)).toContain("5 − 1 = 4 tam aralık");
    expect(ro("ayt-temel-doku", "Yüzdede hangi bütün?", 0.75)).toContain("0,8 × 0,75 = 0,6");
  });

  it("figürler öğrenme kaydı üretmez: çizim saf fonksiyondur", () => {
    for (const g of GUIDES)
      for (const def of Object.values(sectionFigures[g])) {
        const a = JSON.stringify(def.draw(def.param?.init ?? 0, 0));
        expect(JSON.stringify(def.draw(def.param?.init ?? 0, 0))).toBe(a);
      }
  });
});
