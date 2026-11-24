import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { lessonGuides } from "../src/learning/guides";
import { historyFigures061TytWorld } from "../src/learning/sectionFigures/historyFigures061TytWorld";
import { historyFigures061TytOttoman } from "../src/learning/sectionFigures/historyFigures061TytOttoman";
import { historyFigures061TytEarly } from "../src/learning/sectionFigures/historyFigures061TytEarly";
import { chemistryFigures061TytAtoms, address, countAtoms } from "../src/learning/sectionFigures/chemistryFigures061TytAtoms";
import { chemistryFigures061TytLab } from "../src/learning/sectionFigures/chemistryFigures061TytLab";
import { biologyFigures061TytLife } from "../src/learning/sectionFigures/biologyFigures061TytLife";
import { biologyFigures061TytEnv, stockAfter } from "../src/learning/sectionFigures/biologyFigures061TytEnv";

// Forge061 TYT Biyoloji, Tarih ve Kimya: daha önce figürü olmayan derslere
// eklenen bölüm figürleri. Her figür rehberdeki bir bölüm başlığına birebir
// bağlanır, her durumda sonlu koordinat üretir; sayılar ve yıllar bölüm
// metnindeki değerlerle aynı hesaptan gelir.
const PACKS = [historyFigures061TytWorld, historyFigures061TytOttoman, historyFigures061TytEarly, chemistryFigures061TytAtoms, chemistryFigures061TytLab, biologyFigures061TytLife, biologyFigures061TytEnv];
const GUIDES = PACKS.flatMap((p) => Object.keys(p));

const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const read = (guide: string, title: string, value = 0, step = 0, pick = -1) => {
  const f = fig(guide, title).draw(value, step, pick);
  return { labels: f.els.flatMap((e) => (e.k === "text" ? [e.s] : [])), readout: (f.readout ?? []).join(" ") };
};
const numbers = (x: unknown): number[] =>
  typeof x === "number" ? [x] : Array.isArray(x) ? x.flatMap(numbers) : x && typeof x === "object" ? Object.values(x).flatMap(numbers) : [];

describe("Forge061 TYT bölüm figürleri", () => {
  it("her ders kayıtlı ve figürlü", () => {
    for (const g of GUIDES) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(Object.keys(sectionFigures[g] ?? {}).length, g).toBeGreaterThanOrEqual(1);
      expect(lessonGuides.has(g), g).toBe(true);
    }
  });

  it("her figür başlığı rehberdeki bir bölüm başlığıyla birebir eşleşir", () => {
    for (const p of PACKS)
      for (const [g, figs] of Object.entries(p)) {
        const titles = new Set((lessonGuides.get(g)?.sections ?? []).map((s) => s.title));
        for (const t of Object.keys(figs)) expect(titles.has(t), `${g} / ${t}`).toBe(true);
      }
  });

  it("her adım, seçim ve sürgü ucu sonlu koordinat, başlık ve alternatif metin üretir", () => {
    for (const p of PACKS)
      for (const [g, figs] of Object.entries(p))
        for (const [t, def] of Object.entries(figs)) {
          expect(def.caption.length, t).toBeGreaterThan(40);
          expect(def.alt.length, t).toBeGreaterThan(30);
          expect(def.caption + def.alt, t).not.toMatch(/—|\.\.\.|TODO/);
          const values = def.param ? [def.param.min, def.param.init, def.param.max] : [0];
          const steps = def.steps ? def.steps.map((_, i) => i) : [0];
          const picks = def.picks ? [-1, ...def.picks.map((_, i) => i)] : [-1];
          for (const val of values)
            for (const st of steps)
              for (const pk of picks) {
                const f = def.draw(val, st, pk);
                expect(f.els.length, t).toBeGreaterThan(0);
                expect(numbers(f.els).every(Number.isFinite), `${g} / ${t}`).toBe(true);
                expect((f.readout ?? []).join(" "), t).not.toMatch(/NaN|undefined/);
              }
        }
  });

  it("tarih çizelgeleri bölüm yıllarını sırayla taşır", () => {
    for (const [g, t] of [
      ["kuresel-savaslar-arasinda-turkiye-dunya", "1919’dan 1939’a: barış yalnız imza değildir"],
      ["degisen-dunya-dengeleri-osmanli", "1595–1774: tek yönlü bir gerileme çizgisi değil"],
      ["degisim-caginda-avrupa-osmanli", "Lâle Devri: seçici bilgi aktarımı ve kültür"],
    ]) {
      const years = (fig(g, t).picks ?? []).map((p) => Number(p.label.slice(0, 4)));
      expect(years, t).toEqual([...years].sort((a, b) => a - b));
    }
    const dengeler = (fig("degisen-dunya-dengeleri-osmanli", "1595–1774: tek yönlü bir gerileme çizgisi değil").picks ?? []).map((p) => p.label);
    expect(dengeler).toContain("1606 Zitvatorok");
    expect(dengeler).toContain("1774 Küçük Kaynarca");
    expect(read("ilk-turk-dunyasi", "Devletleri tarih ve belgeyle ayır", 0, 0, 0).readout).toContain("MÖ 209 Mete Han");
    expect(read("ilk-turk-dunyasi", "Devletleri tarih ve belgeyle ayır", 0, 0, 2).readout).toContain("682 Kutluk/İlteriş");
    expect(read("ikinci-dunya-savasi-sonrasi", "Dönüm noktaları ve 1945’in iki bitişi", 0, 6).readout).toContain("Eylül 1945 Japonya teslim");
    expect(read("degisen-sosyoekonomik-hayat", "1854 borçlanma: gelir değil yükümlülük", 0, 3).readout).toContain("1881 Düyûn-ı Umûmiye");
  });

  it("onlu düzen her kademede bir alt birliğin on katıdır", () => {
    const t = "İkili idare ve askeri örgütlenme";
    expect(read("ilk-turk-dunyasi", t, 0, 0).readout).toContain("10 × 1 = 10");
    expect(read("ilk-turk-dunyasi", t, 0, 2).readout).toContain("10 × 100 = 1.000");
    expect(read("ilk-turk-dunyasi", t, 0, 3).readout).toContain("10 × 1.000 = 10.000");
  });

  it("toplum eksenleri: iki terzide yalnız inanç, kadıda görev değişir", () => {
    const t = "Bir kişi toplumda birden çok ilişkiye katılır";
    expect(read("klasik-cag-osmanli-toplum-duzeni", t, 0, 1).labels).toContain("gayrimüslim");
    expect(read("klasik-cag-osmanli-toplum-duzeni", t, 0, 2).labels).toContain("askerî");
  });

  it("şematik harita ölçekli olmadığını söyler", () => {
    expect(fig("turklerin-islamiyeti-kabulu", "Maveraünnehir, Horasan ve İdil aynı yer değildir").caption).toMatch(/ölçekli değil/);
  });

  it("kimya: ilk 20 element adresi, formül sayımı, su bütçesi ve derişim bölüm sayılarını verir", () => {
    expect(address(13)).toEqual({ period: 3, group: 13 });
    expect(address(2)).toEqual({ period: 1, group: 18 });
    expect(address(17)).toEqual({ period: 3, group: 17 });
    expect(address(3)).toEqual({ period: 2, group: 1 });
    const total = (f: string) => [...countAtoms(f).atoms.values()].reduce((a, b) => a + b, 0);
    expect(total("Ca(OH)2")).toBe(5);
    expect(total("3H2O")).toBe(9);
    expect(total("(NH4)2SO4")).toBe(15);
    expect(countAtoms("(NH4)2SO4").atoms.size).toBe(4);
    expect(read("su-hayat-cevre", "Su bütçesi: hacmi debiden kur", 5).readout).toContain("12 L/dk × 5 dk = 60 L; günde üç kullanım: 3 × 60 = 180 L");
    expect(read("su-hayat-cevre", "Tasarruf yüzdesinin tabanı", 0, 0).readout).toContain("%46,67");
    expect(read("su-hayat-cevre", "Tasarruf yüzdesinin tabanı", 0, 2).readout).toContain("%75");
    expect(read("su-hayat-cevre", "Derişimi eşitle, sertlikte eksik veriyi ara", 0, 1).labels.join(" ")).toContain("180/1,5 = 120 mg/L");
    expect(read("gercek-kutle-akb-nk", "Normal koşul etiketi hangi veriyi saklar", 0, 1).readout).toContain("11,2 L");
    expect(read("gercek-kutle-akb-nk", "Avogadro köprüsünü hedef varlıkla kur", 1).readout).toContain("1 mol O₂ = 32 g");
  });

  it("biyoloji: kaynak bütçesi, ikiye bölünme ve pH bölüm sayılarını verir", () => {
    expect(stockAfter(1, 30)).toBe(90);
    expect(stockAfter(5, 30)).toBe(50);
    expect(stockAfter(5, 20)).toBe(100);
    expect(read("bakteri-ve-arke", "İkiye bölünmede sayı artar", 3).readout).toContain("= 8");
    expect(read("su-asit-baz-tuz", "pH ölçeği eşit miktarlı bir cetvel değildir", 4).labels.join(" ")).toContain("10⁻⁴");
    expect(read("su-asit-baz-tuz", "pH ölçeği eşit miktarlı bir cetvel değildir", 5).readout).toContain("100 kat fazla");
  });
});
