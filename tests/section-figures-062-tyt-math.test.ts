import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { lessonGuides } from "../src/learning/guides";

// Forge062 TYT Matematik kaynak dersleri: rehberi olup figürü olmayan son 12
// ders. Her figür gerçek bir bölüm başlığına bağlanır; okunan sonuçlar
// bölümdeki örneklerle aynı hesaptan gelir; figürler öğrenme kaydı üretmez.
const COUNTS: Record<string, number> = {
  // Forge064 üç figürsüz bölüme figür ekledi (elek, mod 3 üçlüsü, basamak filtresi).
  "tyt-mat-asal-kaynak-032": 8,
  "tyt-mat-faktoriyel-kaynak-033": 5,
  "tyt-mat-ebob-ekok-kaynak-034": 6,
  "tyt-mat-rasyonel-kaynak-035": 6,
  "tyt-mat-dogrusal-denklemler-kaynak-036": 5,
  "tyt-mat-basit-esitsizlikler-kaynak-037": 8,
  "tyt-mat-uslu-sayilar-kaynak-039": 5,
  "tyt-mat-permutasyon-kaynak-032": 4,
  "tyt-mat-tekrarli-permutasyon-kaynak-033": 4,
  "tyt-mat-kombinasyon-kaynak-034": 4,
  "tyt-mat-binom-kaynak-035": 4,
  "tyt-mat-olasilik-kaynak-036": 4,
};
const ALL = Object.keys(COUNTS);
const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const out = (guide: string, title: string, value = 0, step = 0) => (fig(guide, title).draw(value, step).readout ?? []).join(" ");
const frames = (guide: string) =>
  Object.values(sectionFigures[guide]).flatMap((def) => {
    const steps = def.steps ? def.steps.map((_, i) => i) : [0];
    const values = def.param ? [def.param.min, def.param.init, def.param.max] : [0];
    return steps.flatMap((s) => values.map((val) => def.draw(val, s, -1)));
  });

describe("Forge062 TYT Matematik kaynak dersleri bölüm figürleri", () => {
  it("rehberli her ders figürlüdür; 12 dersin figürleri gerçek bölüm başlıklarına bağlı", () => {
    for (const [id] of lessonGuides) expect(sectionFigures[id], `figürsüz ders: ${id}`).toBeTruthy();
    for (const g of ALL) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      const titles = Object.keys(sectionFigures[g] ?? {});
      expect(titles.length, g).toBe(COUNTS[g]);
      const sections = new Set(lessonGuides.get(g)?.sections.map((s) => s.title));
      for (const t of titles) expect(sections.has(t), `${g} / ${t}`).toBe(true);
    }
  });

  it("her adım ve sürgü ucu çizilir; erişilebilir ad, açıklama ve figcaption var; süs karakteri yok", () => {
    for (const g of ALL) {
      for (const f of frames(g)) {
        expect(f.els.length).toBeGreaterThan(0);
        const text = JSON.stringify([f.readout, f.els.flatMap((e) => (e.k === "text" ? [e.s] : e.k === "pt" && e.label ? [e.label] : []))]);
        expect(text, g).not.toMatch(/NaN|Infinity|undefined|null|[—✦★✓✕✗➜^]|\.\.\./);
      }
      for (const [title, def] of Object.entries(sectionFigures[g])) {
        expect(def.caption.length, title).toBeGreaterThan(60);
        expect(def.alt.length, title).toBeGreaterThan(40);
        expect(`${def.caption} ${def.alt}`, title).not.toMatch(/[—✦★✓✕✗➜]|\.\.\./);
        const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title }));
        expect(html).toContain('role="img"');
        expect(html).toContain("<figcaption>");
      }
    }
  });

  it("negatif rasyoneller yansıdığında sıralama tersine döner", () => {
    const guide = "tyt-mat-rasyonel-kaynak-035";
    const title = "Negatif noktaları uzaklıklarıyla karıştırma";
    expect(out(guide, title, 0, 0)).toContain("−3/4 < −1/2");
    expect(out(guide, title, 0, 1)).toContain("3/4 > 1/2");
  });

  it("asal sayılar: deneme tablosu, bölme merdiveni, bölen ızgarası, kare farkı, asal çiftler", () => {
    const g = "tyt-mat-asal-kaynak-032";
    expect(out(g, "Asallık denemesini neden karekökte bitirirsin?", 0, 0)).toContain("97 asaldır");
    expect(out(g, "Asallık denemesini neden karekökte bitirirsin?", 0, 1)).toContain("91 = 7 · 13");
    expect(out(g, "Asallık denemesini neden karekökte bitirirsin?", 0, 3)).toContain("121 = 11 · 11");
    expect(out(g, "Asal çarpımda üç farklı şeyi sayarsın", 0, 0)).toContain("Tür 3 (2 + 3 + 5 = 10), tekrar 4, bölen 3 · 2 · 2 = 12");
    expect(out(g, "Asal çarpımda üç farklı şeyi sayarsın", 0, 1)).toContain("bölen 4 · 3 = 12");
    expect(out(g, "Bütün pozitif bölenleri bağımsız seçimle say", 0, 1)).toContain("(2 + 1)(2 + 1) = 9 bölen");
    expect(out(g, "Kare farkından aday bul, sonra gerçekten asal mı bak", 4, 0)).toContain("n = 4 çözümdür");
    expect(out(g, "Kare farkından aday bul, sonra gerçekten asal mı bak", 5, 1)).toContain("9 asal değil");
    expect(out(g, "Kare farkından aday bul, sonra gerçekten asal mı bak", 6, 2)).toContain("n = 6 çözümdür");
    expect(out(g, "Toplam tekse 2’yi ayır; farklılığı kendin ekleme", 25)).toContain("2 + 23; çarpım 46");
    expect(out(g, "Toplam tekse 2’yi ayır; farklılığı kendin ekleme", 24)).toContain("5 + 19, 7 + 17, 11 + 13");
  });

  it("faktöriyel: oran şeridi, dağıtma, kopya sayacı, bütçeler, bölümde son sıfır", () => {
    const g = "tyt-mat-faktoriyel-kaynak-033";
    expect(out(g, "Büyük sayıya değil ortak çarpana kadar aç", 0, 0)).toContain("7 · 6 = 42");
    expect(out(g, "Büyük sayıya değil ortak çarpana kadar aç", 0, 2)).toContain("1/(8 · 7) = 1/56");
    expect(out(g, "Toplamda çizgi değil dağıtma kuralı kullan", 4, 0)).toContain("(5! + 4!)/4! = 6");
    expect(out(g, "Asal çarpan sayacı bir kopya sayımıdır", 10, 0)).toContain("= 5 + 2 + 1 = 8");
    expect(out(g, "Asal çarpan sayacı bir kopya sayımıdır", 25, 0)).toContain("= 12 + 6 + 3 + 1 = 22");
    expect(out(g, "Bileşik böleni iki bütçeyle kur", 0, 0)).toContain("min(4, 4) = 4");
    expect(out(g, "Bölme 2’leri tüketirse 5 saymak yetmez", 7)).toContain("28.350");
    expect(out(g, "Bölme 2’leri tüketirse 5 saymak yetmez", 8)).toContain("14.175");
    expect(out(g, "Bölme 2’leri tüketirse 5 saymak yetmez", 8)).toContain("min(0, 2) = 0");
  });

  it("EBOB-EKOK: üs tablosu, Öklid, kaplama, ortak anlar, kalan şeritleri", () => {
    const g = "tyt-mat-ebob-ekok-kaynak-034";
    expect(out(g, "Asal kopyaları üslerle say", 0, 0)).toContain("= 24");
    expect(out(g, "Asal kopyaları üslerle say", 0, 1)).toContain("= 360");
    expect(out(g, "Öklid: büyük sayıyı aynı ortak bölenlerle küçült", 0, 3)).toContain("EBOB = 18");
    expect(out(g, "Öklid: büyük sayıyı aynı ortak bölenlerle küçült", 0, 3)).toContain("2.772");
    expect(out(g, "Kareyle kaplama: kenarın bölen olması gerekir", 12)).toContain("3 × 2 = 6 kare");
    expect(out(g, "Kareyle kaplama: kenarın bölen olması gerekir", 18)).toContain("24/18 tam değil");
    expect(out(g, "Uçları ve saati doğru say", 0, 0)).toContain("0, 36, 72; 3 olay");
    expect(out(g, "Uçları ve saati doğru say", 0, 1)).toContain("0, 36; 2 olay");
    expect(out(g, "Bilinmeyen bölen: her sayıdan kendi kalanını çıkar", 12)).toContain("85 = 12 · 7 + 1, 133 = 12 · 11 + 1");
  });

  it("rasyonel ve üslü sayılar", () => {
    const r = "tyt-mat-rasyonel-kaynak-035";
    expect(out(r, "Denk kesirler aynı noktaya ulaşır", 3)).toContain("9/12 = 0,75");
    expect(out(r, "Bölme kaç tane birim sığdığını sorar", 0, 0)).toContain("= 5/6");
    expect(out(r, "Bölme kaç tane birim sığdığını sorar", 0, 1)).toContain("= 2/3");
    expect(out(r, "Aynı karşılaştırmayı üç ayrı kanıtla kur", 0, 1)).toContain("456 < 460");
    expect(out(r, "Önce tekrarlayan kuyrukları hizala", 0, 0)).toContain("x = 15/90 = 1/6");
    expect(out(r, "Önce tekrarlayan kuyrukları hizala", 0, 1)).toContain("x = 111/90 = 37/30");
    const u = "tyt-mat-uslu-sayilar-kaynak-039";
    expect(out(u, "Negatif üs: karşılık, eksi sonuç değil", 2, 1)).toContain("= −1/8");
    expect(out(u, "Asal tabana geçmek neden işe yarar?", 0, 3)).toContain("= 128");
    expect(out(u, "Çizginin ölçeğini oku: doğrusal ve logaritmik", 2.5)).toContain("X ≈ 316,23");
    expect(out(u, "Çizginin ölçeğini oku: doğrusal ve logaritmik", 2.5)).toContain("8,9085");
    expect(out(u, "Üstel süreçte başlangıç 0. adımdır", 0, 0)).toContain("= 12.800");
  });

  it("denklemler ve eşitsizlikler", () => {
    const d = "tyt-mat-dogrusal-denklemler-kaynak-036";
    expect(out(d, "İki grubun toplamını tek bilinmeyenle koru", 6)).toContain("= 780 TL");
    expect(out(d, "İki grubun toplamını tek bilinmeyenle koru", 7)).toContain("810 TL");
    expect(out(d, "Sabit artışta geçiş sayısı n−1", 4)).toContain("= 10: 3 geçiş");
    const e = "tyt-mat-basit-esitsizlikler-kaynak-037";
    expect(out(e, "Sabit ücret ve ders başı ücret", 0, 0)).toContain("En fazla 8 ders: 8 ders 880 TL, 9 ders 960 TL");
    expect(out(e, "Sabit ücret ve ders başı ücret", 0, 1)).toContain("En fazla 7 ders");
    expect(out(e, "Ve: ortak bölgeyi al", 0, 1)).toContain("ÇK = ∅");
    expect(out(e, "Çarpımda işaret ve uç kabulü", 0, 1)).toContain("[−8, 12]");
  });

  it("sayma ve olasılık", () => {
    expect(out("tyt-mat-permutasyon-kaynak-032", "Her dolan yuva bir seçeneği eksiltir", 3)).toContain("7 · 6 · 5 = 210");
    expect(out("tyt-mat-permutasyon-kaynak-032", "Birbirine karışabilen gruplara önce yer ayır", 20)).toContain("toplam 40");
    expect(out("tyt-mat-kombinasyon-kaynak-034", "Boş seçim ve dışarıda kalanlar", 7)).toContain("= 36");
    expect(out("tyt-mat-kombinasyon-kaynak-034", "Tam ve en az koşullarıyla ayrık durumlar kur", 0, 1)).toContain("30 + 4 = 34");
    expect(out("tyt-mat-binom-kaynak-035", "Pascal satırını üstteki iki komşudan kur", 7)).toContain("15 + 20 = 35");
    expect(out("tyt-mat-binom-kaynak-035", "Hedef üssü bir denklemle bul", 0, 0)).toContain("= 240");
    expect(out("tyt-mat-binom-kaynak-035", "Hedef üssü bir denklemle bul", 0, 1)).toContain("tam sayı değil");
    expect(out("tyt-mat-binom-kaynak-035", "Toplam, sabit terim ve tek-çift toplamlarını ayır", 0, 0)).toContain("= −121");
    expect(out("tyt-mat-binom-kaynak-035", "Toplam, sabit terim ve tek-çift toplamlarını ayır", 0, 1)).toContain("= 122");
    expect(out("tyt-mat-olasilik-kaynak-036", "Örnek uzay hangi sonuçların sayıldığını belirler", 7)).toContain("6/36 = 1/6");
    expect(out("tyt-mat-olasilik-kaynak-036", "Örnek uzay hangi sonuçların sayıldığını belirler", 2)).toContain("1/36");
    expect(out("tyt-mat-olasilik-kaynak-036", "Geri koyma ve bağımsızlık ayrı koşullardır", 0, 0)).toContain("= 3/10");
    expect(out("tyt-mat-olasilik-kaynak-036", "Geri koyma ve bağımsızlık ayrı koşullardır", 0, 1)).toContain("= 9/25");
  });

  it("figürler öğrenme kaydı üretmez: aynı girdi aynı çizimi verir", () => {
    for (const g of ALL)
      for (const def of Object.values(sectionFigures[g])) {
        const a = JSON.stringify(def.draw(def.param?.init ?? 0, 0, -1));
        expect(JSON.stringify(def.draw(def.param?.init ?? 0, 0, -1))).toBe(a);
      }
  });
});
