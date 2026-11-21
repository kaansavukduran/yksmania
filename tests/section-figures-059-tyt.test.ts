import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { lessonGuides } from "../src/learning/guides";

// Forge059 TYT Biyoloji ve TYT Tarih figürleri: her figür rehberdeki bir
// bölüm başlığına bağlanır, her durumda sonlu koordinat üretir ve okuma
// satırlarındaki sayılar bölüm metnindeki örneklerle aynı hesaptan gelir.
const BIO = [
  "mendel-genetigi",
  "mendelden-sapmalar",
  "kan-gruplari",
  "eseyin-belirlenmesi",
  "hucre-zarinda-madde-alisverisleri",
  "enzimler",
  "virusler",
  "canlilarin-siniflandirilmasi",
  "eseyli-ureme",
  "eseysiz-ureme",
];
const HIST = [
  "sultan-osmanli-merkez-teskilati",
  "osmanli-kurulus-siyaseti",
  "osmanli-askeri-teskilat",
  "dunya-gucu-osmanli",
  "denge-stratejisi",
  "devrimler-caginda-devlet-toplum",
  "yirminci-yuzyil-baslarinda-osmanli",
  "iki-savas-arasi-turkiye-dunya",
];
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

describe("Forge059 TYT Biyoloji ve Tarih bölüm figürleri", () => {
  it("18 dersin (10 biyoloji, 8 tarih) her biri kayıtlı ve en az iki figürlü", () => {
    for (const g of [...BIO, ...HIST]) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(Object.keys(sectionFigures[g] ?? {}).length, g).toBeGreaterThanOrEqual(2);
    }
  });

  it("her figür başlığı rehberdeki bir bölüm başlığıyla birebir eşleşir", () => {
    for (const g of [...BIO, ...HIST]) {
      const titles = new Set((lessonGuides.get(g)?.sections ?? []).map((s) => s.title));
      for (const t of Object.keys(sectionFigures[g])) expect(titles.has(t), `${g} / ${t}`).toBe(true);
    }
  });

  it("her adım, seçim ve sürgü ucu sonlu koordinat, başlık ve alternatif metin üretir", () => {
    for (const g of [...BIO, ...HIST])
      for (const [t, def] of Object.entries(sectionFigures[g])) {
        expect(def.caption.length, t).toBeGreaterThan(40);
        expect(def.alt.length, t).toBeGreaterThan(30);
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

  it("Mendel: 1:2:1 ve 3:1, 9:3:3:1, koşullu 2/3, (1/2)⁴ ve üç doğum payları", () => {
    expect(read("mendel-genetigi", "İlk çaprazlama ile kendileştirme farklıdır", 0, 1).readout).toContain("genotip 1:2:1 (AA:Aa:aa), fenotip 3:1");
    expect(read("mendel-genetigi", "Bağımsız iki karakteri ayrı çöz").readout).toContain("Fenotip oranı 9:3:3:1; aaBb kutuları 2/16 = 1/8");
    expect(read("mendel-genetigi", "Koşullu olasılık örnek uzayı değiştirir", 0, 1).labels).toContain("= 2/3");
    expect(read("mendel-genetigi", "Test çaprazlamasında kanıtın yönü", 4).readout).toContain("(1/2)⁴ = 1/16");
    expect(read("mendel-genetigi", "En az biri, tam biri ve beklenti", 0, 0).readout).toContain("27/64");
    expect(read("mendel-genetigi", "En az biri, tam biri ve beklenti", 0, 1).readout).toContain("27 + 9 + 1 = 37/64");
  });

  it("sapmalar, kan grupları ve eşey kromozomları bölüm sayılarını verir", () => {
    expect(read("mendelden-sapmalar", "Çok alel popülasyona, iki alel bireye aittir", 3).readout).toContain("3(3 + 1)/2 = 6");
    expect(read("mendelden-sapmalar", "Rekombinasyon yüzdesini dağıt", 0.2).readout).toContain("= 0,4; Ab = aB = 0,2/2 = 0,1");
    expect(read("mendelden-sapmalar", "Eksik baskınlıkta ara fenotip").readout).toContain("kırmızı 1/4, pembe 1/2, beyaz 1/4");
    expect(read("kan-gruplari", "Çaprazlamada antikoru gamete koyma", 0, 0).readout).toContain("A 1/4, B 1/4, AB 1/4, O 1/4");
    expect(read("kan-gruplari", "Çaprazlamada antikoru gamete koyma", 0, 1).readout).toContain("A 1/2, B 1/2, AB 0, O 0");
    expect(read("kan-gruplari", "İki sistemi birlikte hesaplarken").readout).toContain("1/4 × 1/2 = 1/8");
    expect(read("eseyin-belirlenmesi", "Koşullu olasılığı ayrı hesapla", 0, 0).labels).toContain("1/4");
    expect(read("eseyin-belirlenmesi", "Koşullu olasılığı ayrı hesapla", 0, 1).labels).toContain("1/2");
    expect(read("eseyin-belirlenmesi", "Koşullu olasılığı ayrı hesapla", 0, 2).labels).toContain("1/2");
  });

  it("zar, enzim ve üreme modelleri bölümdeki bağıntılardan hesaplanır", () => {
    const t = "Basınç farkı ozmotik eğilime karşı koyabilir";
    expect(read("hucre-zarinda-madde-alisverisleri", t, 0).readout).toContain("3 − 1 − 0 = 2");
    expect(read("hucre-zarinda-madde-alisverisleri", t, 2).readout).toContain("denge");
    expect(read("hucre-zarinda-madde-alisverisleri", t, 3).readout).toContain("yön ters");
    expect(read("hucre-zarinda-madde-alisverisleri", "Basit difüzyonda net hareket ile hareketi ayır", 0, 2).readout).toContain("toplam 10 korunur");
    expect(read("enzimler", "Rekabetçi engellemeyi belirtilen modelle yorumla", 2).readout).toContain("I = 0 için v = 20/12 = 1,67; I = 2 için v = 20/16 = 1,25");
    expect(read("eseyli-ureme", "Zigot büyürken mayoz yapmaz", 3).readout).toContain("2³ = 8 hücre, her biri 18 kromozom");
    expect(read("eseysiz-ureme", "Sayımı ve yöntemi aynı çözümde birleştir", 0, 3).readout).toContain("12 + 5 = 17");
    expect(read("canlilarin-siniflandirilmasi", "DNA benzerliğini hizalama ve kapsamla yorumla").readout).toContain("kertenkele–güvercin 1, kertenkele–kedi 2, güvercin–kedi 2");
  });

  it("tarih çizelgeleri bölüm yıllarını sırayla taşır ve seçim kartı açılır", () => {
    const tl = fig("osmanli-kurulus-siyaseti", "Dönüm noktalarını karşılaştırmalı çizelgede oku");
    const years = (tl.picks ?? []).map((p) => Number(p.label.slice(0, 4)));
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(years).toContain(1402);
    expect(read("osmanli-kurulus-siyaseti", "Dönüm noktalarını karşılaştırmalı çizelgede oku", 0, 0, 1).readout).toContain("1326 Bursa");
    expect(read("iki-savas-arasi-turkiye-dunya", "Lozan sonrası sorunlara yöntemle yaklaş", 0, 0, 9).readout).toContain("1939");
    expect(read("denge-stratejisi", "Mehmet Ali Paşa krizi ve 1833", 0, 4).readout).toContain("1841 Londra Boğazlar Sözleşmesi");
  });

  it("harita figürü şematik olduğunu söyler", () => {
    expect(fig("osmanli-kurulus-siyaseti", "Önce haritada üç ayrı soruyu kur").caption).toMatch(/ölçekli değil/);
  });
});
