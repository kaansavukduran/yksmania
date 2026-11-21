import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";

// Forge060 AYT Fizik ve AYT Matematik figürleri: etiketteki ve sonuç
// satırındaki sayılar rehberdeki öğretim örnekleriyle aynı hesaptan gelmeli.
const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const frame = (guide: string, title: string, value: number, step = 0) => {
  const f = fig(guide, title).draw(value, step);
  const labels = f.els.flatMap((e) => (e.k === "text" ? [e.s] : e.k === "pt" && e.label ? [e.label] : []));
  return { labels, readout: (f.readout ?? []).join(" ") };
};

const PHYSICS = [
  "ozel-gorelilik",
  "siyah-cisim-foton",
  "compton-debroglie",
  "elektromanyetik-dalgalar",
  "acisal-momentum",
  "donerek-oteleme-hareketi",
  "kutle-agirlik-merkezi",
  "basit-makineler-ayt",
  "newton-genel-cekim-yasasi",
  "transformatorler",
  "elektriksel-kuvvet-ayt",
  "su-dalgalarinda-kirinim",
  "serbest-dusme-limit-hiz",
  "sabit-ivmeli-hareket-grafikleri",
];
const MATH = ["ayt-trigonometri", "ayt-ikinci-dereceden-denklemler", "ayt-karmasik-sayilar", "ayt-esitsizlikler"];

describe("Forge060 AYT Fizik ve Matematik bölüm figürleri", () => {
  it("18 dersin her birine en az dört figür kaydeder", () => {
    for (const g of [...PHYSICS, ...MATH]) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      expect(Object.keys(sectionFigures[g] ?? {}).length, g).toBeGreaterThanOrEqual(4);
    }
  });

  it("figür metinlerinde uzun tire ve süs simgesi yok", () => {
    for (const g of [...PHYSICS, ...MATH])
      for (const [title, def] of Object.entries(sectionFigures[g])) {
        const f = def.draw(def.param?.init ?? 0, 0);
        const text = [def.caption, def.alt, ...(f.readout ?? []), ...f.els.flatMap((e) => (e.k === "text" ? [e.s] : []))].join(" ");
        expect(text, `${g} / ${title}`).not.toMatch(/[—✦★✓✕➜]/);
      }
  });

  it("görelilik ve siyah cisim sayıları", () => {
    expect(frame("ozel-gorelilik", "Lorentz katsayısının davranışı", 0.6).readout).toContain("γ = 1,25");
    expect(frame("ozel-gorelilik", "Öz uzunluk ve paralel büzülme", 0.8).labels).toContain("L = 6 m");
    expect(frame("siyah-cisim-foton", "Wien kayma yasası", 6000).readout).toContain("483 nm");
    expect(frame("siyah-cisim-foton", "Stefan-Boltzmann toplamı", 4000).readout).toContain("oran 2⁴ = 16");
    expect(frame("siyah-cisim-foton", "Foton enerjisi ve dalga boyu", 620).labels).toContain("2 eV");
  });

  it("Compton ve de Broglie", () => {
    expect(frame("compton-debroglie", "Sıfır, dik ve geri açı", 90).labels).toContain("2,426 pm");
    expect(frame("compton-debroglie", "Sıfır, dik ve geri açı", 180).labels).toContain("4,852 pm");
    expect(frame("compton-debroglie", "Elektronu gerilimle hızlandırma", 100).readout).toContain("0,0613 nm");
    const e = frame("compton-debroglie", "Enerji bütçesi", 0).readout;
    expect(e).toContain("Kₑ = 248 − 248 = 0 keV");
  });

  it("açısal momentum ve dönerek öteleme", () => {
    for (const t of [-0.5, 0, 0.6]) expect(frame("acisal-momentum", "Tam tanım konum ile momentumun çapraz çarpımıdır", t).readout).toContain("= 21 kg·m²/s");
    expect(frame("acisal-momentum", "Kollar kapanınca hız neden artar", 3).labels).toEqual(expect.arrayContaining(["ω = 6 rad/s", "K = 54 J"]));
    expect(frame("acisal-momentum", "Dış tork açısal momentumu değiştirir", 5).readout).toContain("L(5 s) = 0 + 8 = 8 kg·m²/s");
    expect(frame("acisal-momentum", "Gezegen örneğinde dönüş ile dolanımı ayır", 120).readout).toContain("r·v·sinθ = 1,5");
    expect(frame("donerek-oteleme-hareketi", "Gerçek nokta hızını vektörle kur", 90).labels).toContain("4 m/s");
    expect(frame("donerek-oteleme-hareketi", "Gerçek nokta hızını vektörle kur", 0).readout).toContain("(2; −2) m/s, sürat 2,828 m/s");
    expect(frame("donerek-oteleme-hareketi", "Bir tur, merkez yolu ve boya izinin yolu", 1).readout).toContain("= 8R");
  });

  it("kütle merkezi ve basit makineler", () => {
    expect(frame("kutle-agirlik-merkezi", "İki kütlede uzaklıklar ters kütle oranında", 6).readout).toContain("= 4 m");
    expect(frame("kutle-agirlik-merkezi", "Destek alanı ve devrilme eşiği", 26).readout).toContain("26,6°");
    expect(frame("basit-makineler-ayt", "Tek hareketli makarada gerçek taşıyıcı kollar", 0.5).readout).toContain("serbest uç 1 m");
    expect(frame("basit-makineler-ayt", "Sürtünmeli rampanın enerji hesabı", 0.25).readout).toContain("%75");
    expect(frame("basit-makineler-ayt", "Çıkrık: aynı tur, farklı çevre", 0.4).labels).toContain("F = 50 N");
  });

  it("çekim, trafo, elektriksel kuvvet, kırınım", () => {
    expect(frame("newton-genel-cekim-yasasi", "Homojen kürenin içinde yalnız iç kütle etkili olur", 2).readout).toContain("0,25g₀");
    expect(frame("newton-genel-cekim-yasasi", "Kurtulma süratinde başlangıç durumu önemlidir", 1.45).readout).toContain("kurtulur");
    expect(frame("newton-genel-cekim-yasasi", "Kurtulma süratinde başlangıç durumu önemlidir", 0.6).readout).toContain("gezegene çarpar");
    expect(frame("transformatorler", "Yük direncinden bütün akımlara git", 100).readout).toContain("IP = 30/120 = 0,25 A");
    expect(frame("transformatorler", "İletimde yüksek gerilim kaybı neden azaltır?", 20).readout).toContain("250 W");
    expect(frame("elektriksel-kuvvet-ayt", "Mikro öneki ve uzaklığın karesi", 30).readout).toContain("F = 0,1 N");
    expect(frame("elektriksel-kuvvet-ayt", "Simetriyi geometriyle sınırla", 1, 0).readout).toContain("(0;");
    expect(frame("su-dalgalarinda-kirinim", "İlk minimum ve belirginlik", 2).readout).toContain("= 30°");
    expect(frame("su-dalgalarinda-kirinim", "Frekans değişince dalga boyunu yeniden bul", 5).readout).toContain("λ/w = 1");
  });

  it("serbest düşme ve grafikler", () => {
    expect(frame("serbest-dusme-limit-hiz", "Eşit zamanlarda mesafeler neden 1, 3, 5 gider?", 3).readout).toContain("toplam 45 m; son saniyede 25 m");
    expect(frame("serbest-dusme-limit-hiz", "Net kuvvet küçülürken sürat yine artabilir", 10).readout).toContain("a = 0 m/s²");
    expect(frame("sabit-ivmeli-hareket-grafikleri", "Hız grafiğinin altında kalan alan işaretlidir", 5).readout).toContain("Yol = 4 + 4 = 8 m");
    expect(frame("sabit-ivmeli-hareket-grafikleri", "İvme alanı son hızı başlangıçtan taşır", 3).readout).toContain("vilk = −8 ⇒ −2 m/s");
    expect(frame("sabit-ivmeli-hareket-grafikleri", "İvme basamaklanınca hız kopmaz", 5).readout).toContain("x = 15 m, v = 0 m/s");
  });

  it("matematik örnekleri", () => {
    expect(frame("ayt-trigonometri", "İki kenar ve karşı açı her zaman tek üçgen vermez", 5).readout).toContain("Üçgen sayısı: 2");
    expect(frame("ayt-trigonometri", "İki kenar ve karşı açı her zaman tek üçgen vermez", 4).readout).toContain("Üçgen sayısı: 1");
    expect(frame("ayt-trigonometri", "İki kenar ve karşı açı her zaman tek üçgen vermez", 3).readout).toContain("Üçgen sayısı: 0");
    expect(frame("ayt-trigonometri", "Temel denklemlerde bütün tur ailelerini yaz", 0.5).readout).toContain("30° ve 150°");
    expect(frame("ayt-ikinci-dereceden-denklemler", "Diskriminant kök sayısını belirler", 1).readout).toContain("küme {1}");
    expect(frame("ayt-karmasik-sayilar", "i kuvvetleri dört adımda döner", -7).readout).toContain("iⁿ = i.");
    expect(frame("ayt-karmasik-sayilar", "i kuvvetleri dört adımda döner", 30).readout).toBeTruthy();
    expect(frame("ayt-esitsizlikler", "Mutlak değeri uzaklık olarak çöz", 3).readout).toContain("−4 ≤ x ≤ 2");
  });
});
