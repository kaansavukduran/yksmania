import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { lessonGuides } from "../src/learning/guides";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { LABEL_FS, SMALL_FS, textWidth } from "../src/learning/sectionFigures/labelPlacement";
import { PW } from "../src/learning/sectionFigures/biologyFigures060Kit";
import type { El, FigureDef } from "../src/learning/sectionFigures/figureKit";

// Forge061 AYT Biyoloji ve Fizik figürleri: AYT tarafında figürsüz ders kalmaz.
// Her figür piksel ölçekli çerçeveye oturur (ölçek 1), etiketler çerçevenin
// içinde kalır ve sayılar bölüm metnindeki örneklerle aynı hesaptan gelir.
const GUIDES = [
  "dolasim-damarlar-starling",
  "dolasim-kan-doku",
  "lenf-sistemi",
  "endokrin-hipofiz",
  "endokrin-bobrek-ustu",
  "endokrin-epifiz",
  "stoma-nodul-mikoriza",
  "bitki-hormonlari",
  "bitkilerde-hareket",
  "bitki-fotoperiyodizm",
  "cicek-yapisi-ureme",
  "bitki-tozlasma",
  "bitkilerde-dollenme-cimlenme",
  "bagisiklik-sistemi",
  "ayt-fotosentez-solunum",
  "ayt-fotosentez-genel",
  "kemosentez-enerji-karbon",
  "solunum-oksijensiz-alicilar",
  "canlilar-ve-cevre",
  "elektriksel-potansiyel-enerji",
  "bir-boyutta-sabit-ivmeli-hareket",
  "ayt-enerji-hareket",
  "buyuk-patlama-atomalti",
  "modern-fizik-teknoloji",
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

describe("Forge061 AYT Biyoloji ve Fizik bölüm figürleri", () => {
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

  it("bölüm örnekleri sonuç satırında aynı hesapla çıkar", () => {
    const ro = (g: string, t: string, v = 0, st = 0) => (fig(g, t).draw(v, st).readout ?? []).join(" ");
    expect(ro("dolasim-damarlar-starling", "Klasik Starling modelinin iki karşı etkisi", 40)).toContain("40 − 25 = +15 mmHg: dışa");
    expect(ro("dolasim-damarlar-starling", "Klasik Starling modelinin iki karşı etkisi", 15)).toContain("15 − 25 = −10 mmHg: içe");
    expect(ro("dolasim-damarlar-starling", "Birikimi giriş ve çıkışla hesapla", 2)).toContain("20 − 17 − 2 = +1 birim");
    expect(ro("dolasim-damarlar-starling", "Birikimi giriş ve çıkışla hesapla", 4)).toContain("lenf 3 birim taşır");
    expect(ro("dolasim-kan-doku", "Plazma, serum ve hematokrit", 4.5)).toContain("4,5 / 10 = %45");
    expect(ro("lenf-sistemi", "Bir zaman aralığında açık sıvı bilançosu", 0, 0)).toContain("10 + 5 − 3 = 12 mL");
    expect(ro("lenf-sistemi", "Bir zaman aralığında açık sıvı bilançosu", 0, 1)).toContain("10 + 5 − 0 = 15 mL");
    expect(ro("endokrin-epifiz", "Gün uzunluğu: gece yarısını geçen süre", 0, 0)).toContain("2 + 6 = 8 saat");
    expect(ro("endokrin-epifiz", "Gün uzunluğu: gece yarısını geçen süre", 0, 1)).toContain("4 + 8 = 12 saat");
    expect(ro("endokrin-epifiz", "Faz kayması süre değişimi değildir", 3)).toContain("01.00–09.00: süre 8 saat");
    expect(ro("bitki-hormonlari", "Doku kültüründe oran, aynı zamanda koşul bilgisidir", 0)).toContain("1 : 4 → sürgün");
    expect(ro("bitki-hormonlari", "Doku kültüründe oran, aynı zamanda koşul bilgisidir", 3)).toContain("1 : 1 → kallus");
    expect(ro("bitki-hormonlari", "Doku kültüründe oran, aynı zamanda koşul bilgisidir", 4)).toContain("2 : 1 → kök");
    expect(ro("bitki-fotoperiyodizm", "Yirmi dört saatlik döngüyü önce tamamla", 9)).toContain("24 − 9 = 15 saat");
    expect(ro("bitki-fotoperiyodizm", "Kısa gün örneğini uzun gece koşuluyla kur", 12)).toContain("kısa gün uyarım, uzun gün uyarım yok");
    expect(ro("bitki-fotoperiyodizm", "Kısa gün örneğini uzun gece koşuluyla kur", 8)).toContain("kısa gün uyarım yok, uzun gün uyarım");
    expect(ro("bitki-fotoperiyodizm", "Kısa gün örneğini uzun gece koşuluyla kur", 10)).toContain("karar yok");
    expect(ro("bitki-fotoperiyodizm", "Toplam karanlık ile kesintisiz karanlığı ayır", 0, 1)).toContain("14 = 7 + 7");
    expect(ro("bitki-fotoperiyodizm", "Tabloyu gece parçalarına çevir", 0, 1)).toContain("16 = 8 + 8");
    expect(ro("cicek-yapisi-ureme", "Bir mikrospor ana hücresi dört ürüne ayrılır", 4)).toContain("4 ana hücre → 16 mikrospor → 16 polen → 32 sperm");
    expect(ro("cicek-yapisi-ureme", "Tamlık dört organ takımının varlığıdır", 0, 1)).toContain("Taç yok: eksik, iki eşeyli");
    expect(ro("cicek-yapisi-ureme", "Sitokinez olmadan mitoz çekirdek sayısını artırır", 0, 3)).toContain("4 × 2 = 8 çekirdek");
    expect(ro("bitki-tozlasma", "Sayıları doğru paydadan oranla", 0, 0)).toContain("10 / 100 = %10");
    expect(ro("bitki-tozlasma", "Sayıları doğru paydadan oranla", 0, 1)).toContain("10 / 20 = %50");
    expect(ro("bagisiklik-sistemi", "Özgüllük ve azalma hesabını karıştırma", 8)).toContain("32 × (1/2)^2 = 8 birim");
    expect(ro("bitkilerde-dollenme-cimlenme", "Çift döllenmede ne çift?", 0, 1)).toContain("(n + n) = 3n");
    expect(ro("ayt-fotosentez-solunum", "Brüt ve net: ölçülen fark", 8)).toContain("Net = 8 − 3 = 5");
    expect(ro("ayt-fotosentez-solunum", "Grafiği okuyarak düşün", 9)).toContain("72 − 72 = 0");
    expect(ro("ayt-fotosentez-genel", "Brüt ve net denklemi oku", 0, 0)).toContain("C 6 = 6, H 24 = 24, O 24 = 24");
    expect(ro("ayt-fotosentez-genel", "Brüt ve net denklemi oku", 0, 1)).toContain("C 6 = 6, H 12 = 12, O 18 = 18");
    expect(ro("kemosentez-enerji-karbon", "Modelde atom miktarı korunur", 0, 2)).toContain("toplam O₂ 1,5 + 0,5 = 2 mol");
    expect(ro("solunum-oksijensiz-alicilar", "Kapasiteyi hangi stok sınırlar?", 10)).toContain("min(3, 10 / 5) = 2 mol nitrat işlenir; 1 mol artar; N₂ = 1 mol");
    expect(ro("solunum-oksijensiz-alicilar", "Kapasiteyi hangi stok sınırlar?", 15)).toContain("Sınırlayan stok: ikisi birlikte");
    expect(ro("solunum-oksijensiz-alicilar", "Sülfat indirgenince kükürt biçimi değişir", 0, 3)).toContain("4 − (−4) = 8 elektron");
    expect(ro("canlilar-ve-cevre", "Sayı ile sıklığı ayrı tutmak", 0, 1)).toContain("80/170 ≈ %47,1");
    expect(ro("canlilar-ve-cevre", "Sayı ile sıklığı ayrı tutmak", 0, 0)).toContain("≈ %10");
    expect(ro("elektriksel-potansiyel-enerji", "Sıfırı sonsuzda seç, formülü birimle oku", 0.3, 0)).toContain("= 0,18 J");
    expect(ro("elektriksel-potansiyel-enerji", "Sıfırı sonsuzda seç, formülü birimle oku", 0.3, 1)).toContain("= −0,18 J");
    expect(ro("elektriksel-potansiyel-enerji", "İki konum arasında son eksi ilk")).toContain("ΔU = 0,09 − 0,18 = −0,09 J");
    expect(ro("bir-boyutta-sabit-ivmeli-hareket", "Yol, negatif alanları da pozitif sayar", 6)).toContain("Δx = 18 m, yol = 30 m, v = −6 m/s");
    expect(ro("bir-boyutta-sabit-ivmeli-hareket", "Ortalama hız ve ortalama sürat ayrı nicelikler")).toContain("18 / 6 = 3 m/s; ortalama sürat = 30 / 6 = 5 m/s");
    expect(ro("bir-boyutta-sabit-ivmeli-hareket", "Tepki ve frenleme iki ayrı süreçtir", 20)).toContain("toplam 60 m, süre 5 s");
    expect(ro("ayt-enerji-hareket", "Eğik düzlemde çekme işi ve aynı yükseklik")).toContain("30 + 8 + 4 = 42 J; F = 42 / 5 = 8,4 N");
    expect(ro("ayt-enerji-hareket", "Güç, verim ve enerji birimleri", 80)).toContain("= 250 J");
    expect(ro("buyuk-patlama-atomalti", "Kuarkların yük defteri", 0, 0)).toContain("+2/3 +2/3 −1/3 = +1 e");
    expect(ro("buyuk-patlama-atomalti", "Kuarkların yük defteri", 0, 1)).toContain("= 0 e");
    expect(ro("modern-fizik-teknoloji", "Nano ölçek: yüzey ve hacim", 2)).toContain("2³ = 8 küp");
    expect(ro("endokrin-epifiz", "Sinyal alanını ancak hız varsayımı verilince hesapla", 0, 1)).toContain("× 12 saat = 24 sinyal");
  });

  it("figür başlıkları rehber bölüm başlıklarıyla birebir eşleşir", () => {
    for (const g of GUIDES) {
      const titles = new Set((lessonGuides.get(g)?.sections ?? []).map((s) => s.title));
      for (const t of Object.keys(sectionFigures[g])) expect(titles.has(t), `${g} / ${t}`).toBe(true);
    }
  });

  it("figürler öğrenme kaydı üretmez: çizim saf fonksiyondur", () => {
    for (const g of GUIDES)
      for (const def of Object.values(sectionFigures[g])) {
        const a = JSON.stringify(def.draw(def.param?.init ?? 0, 0));
        expect(JSON.stringify(def.draw(def.param?.init ?? 0, 0))).toBe(a);
      }
  });
});
