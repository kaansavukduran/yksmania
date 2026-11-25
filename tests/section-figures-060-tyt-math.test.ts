import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";

// Forge060 TYT Matematik figürleri: sonuç satırlarındaki sayılar rehber
// bölümlerindeki örneklerle aynı hesaptan gelmeli.
const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const frame = (guide: string, title: string, value = 0, step = 0) => {
  const f = fig(guide, title).draw(value, step);
  const labels = f.els.flatMap((e) => (e.k === "text" ? [e.s] : e.k === "pt" && e.label ? [e.label] : []));
  return { labels, readout: (f.readout ?? []).join(" ") };
};

const GUIDES = [
  "temel-kavramlar",
  "tek-cift-isaret",
  "asal-sayilar",
  "faktoriyel",
  "sayi-basamaklari",
  "bolme-bolunebilme",
  "carpanlara-ayirma",
  "bilimsel-gosterim-katsayi",
  "kartezyen-carpim",
  "mantik-onerme",
  "veri-analizi",
  "grafik-problemleri",
  "faiz-problemleri",
  "havuz-problemleri",
  "kesir-problemleri",
  "sayi-problemleri",
];

describe("Forge060 TYT Matematik bölüm figürleri", () => {
  it("16 derste kayıtlı figürlerin sayısını korur", () => {
    for (const g of GUIDES) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      const expectedCounts: Record<string, number> = {
        "temel-kavramlar": 6,
        "bilimsel-gosterim-katsayi": 5,
        "asal-sayilar": 5,
        "sayi-basamaklari": 5,
        "havuz-problemleri": 5,
        "carpanlara-ayirma": 5,
        "veri-analizi": 5,
      };
      expect(Object.keys(sectionFigures[g] ?? {}).length, g).toBe(expectedCounts[g] ?? 4);
    }
    expect(Object.keys(sectionFigures["veri-analizi"]).sort()).toEqual([
      "Ortancayı yazılış sırası belirlemez",
      "Ortalamayı toplama geri döndür",
      "Uç değerin etkisini ölç, ezberleme",
      "Histogramda genişlik de bilgi taşır",
      "Ham ölçümleri eş genişlikli sınıflara ayır",
    ].sort());
    expect(Object.keys(sectionFigures["havuz-problemleri"]).sort()).toEqual([
      "Giriş ekler, çıkış azaltır",
      "Başlangıç doluluğunu denklemde tut",
      "Kaçağın hızını karşılaştırmadan çıkar",
      "Hacim eşitliği yükseklik eşitliği değildir",
      "Gecikmiş açılış yeni evre başlatır",
    ].sort());
    expect(Object.keys(sectionFigures["carpanlara-ayirma"]).sort()).toEqual([
      "Tam karede uçlar kadar orta terim de önemlidir",
      "İki kare farkı: toplam ile farkın çarpımı",
      "x²+bx+c için toplam ve çarpımı birlikte ara",
      "Baş katsayı 1 değilse çapraz terimlerin toplamını denetle",
      "x² yerine u yazarak dört kökü bul",
    ].sort());
  });

  it("figür metinlerinde uzun tire, şapka üs ve süs simgesi yok; her adım ve uç değer çizilir", () => {
    for (const g of GUIDES)
      for (const [title, def] of Object.entries(sectionFigures[g])) {
        const values = def.param ? [def.param.min, def.param.init, def.param.max] : [0];
        const steps = def.steps ? def.steps.map((_, i) => i) : [0];
        for (const value of values)
          for (const step of steps) {
            const f = def.draw(value, step);
            const text = [def.caption, def.alt, ...(f.readout ?? []), ...f.els.flatMap((e) => (e.k === "text" ? [e.s] : e.k === "pt" && e.label ? [e.label] : []))].join(" ");
            expect(text, `${g} / ${title}`).not.toMatch(/[—✦★✓✕✗➜^]|NaN|undefined|Infinity/);
          }
      }
  });

  it("temel kavramlar, tek–çift ve asal sayılar", () => {
    expect(frame("temel-kavramlar", "Rakam yazım aracıdır, sayı bir değerdir", 47).readout).toContain("47 = 10·4 + 7");
    expect(frame("temel-kavramlar", "Tanım koşulunu sadeleştirerek silemezsin", 2).readout).toContain("0/0 tanımsız");
    expect(frame("temel-kavramlar", "Tanım koşulunu sadeleştirerek silemezsin", 5).readout).toContain("(9)/(3) = 3");
    expect(frame("tek-cift-isaret", "Üslerde koşulu ve tabanı koru", 4).readout).toContain("(−2)⁴ = 16");
    expect(frame("tek-cift-isaret", "Üslerde koşulu ve tabanı koru", 3).readout).toContain("−2³ = −(2³) = −8");
    expect(frame("tek-cift-isaret", "Çarpımda bir çift yeter; işarette sıfır önce gelir", 0, 3).readout).toContain("Negatif çarpan sayısı 2; işaret: pozitif");
    expect(frame("tek-cift-isaret", "Çarpımda bir çift yeter; işarette sıfır önce gelir", 0, 4).readout).toContain("sıfır (işaretsiz)");
    expect(frame("asal-sayilar", "Bölen denemesi neden karekökte biter?", 97).readout).toContain("97 asal");
    expect(frame("asal-sayilar", "Bölen denemesi neden karekökte biter?", 49).readout).toContain("49 = 7 × 7");
    expect(frame("asal-sayilar", "Bölen denemesi neden karekökte biter?", 121).readout).toContain("121 = 11 × 11");
    expect(frame("asal-sayilar", "Asal toplamlarında 2’yi ayrı düşün", 19).readout).toContain("s = 19: 2 + 17.");
    expect(frame("asal-sayilar", "Asal toplamlarında 2’yi ayrı düşün", 12).readout).toContain("5 + 7");
  });

  it("draws number-line points and exact integer bounds from the same values", () => {
    const compare = fig("temel-kavramlar", "Sayı doğrusunda sırayı ve uzaklığı ayır");
    for (let b = -6; b <= 6; b++) {
      const result = compare.draw(b, 0);
      const points = result.els.filter((el) => el.k === "pt");
      expect(points.map((point) => point.p[0])).toEqual(b === -3 ? [-3] : [-3, b]);
    }
    const example = fig("temel-kavramlar", "Açık ve kapalı sınırdan tam sayıları bul").draw(0, 0);
    const points = example.els.filter((el) => el.k === "pt");
    const endpoints = points.filter((point) => point.p[1] === 0);
    expect(endpoints.map((point) => [point.p[0], point.hollow])).toEqual([[-4, false], [2, true]]);
    expect(points.filter((point) => point.p[1] > 0).map((point) => point.p[0]))
      .toEqual(Array.from({ length: 13 }, (_, n) => n - 7).filter((n) => -7 <= 2 * n + 1 && 2 * n + 1 < 5));
  });

  it("draws both linear-pair bisectors at a right angle throughout the slider", () => {
    const diagram = fig("tyt-geo-acilar-kaynak-pekitirme-032", "Doğrusal çiftte açıortaylar");
    for (let angle = 30; angle <= 150; angle += 2) {
      const result = diagram.draw(angle, 0);
      const rays = result.els.filter((el) => el.k === "ray").filter((ray) => ray.dash);
      expect(rays).toHaveLength(2);
      const [first, second] = rays.map((ray) => Math.atan2(ray.b[1], ray.b[0]) * 180 / Math.PI);
      expect(first).toBeCloseTo(angle * 0.5, 10);
      expect(second - first).toBeCloseTo(90, 10);
      expect(result.els.filter((el) => el.k === "right")).toHaveLength(1);
      expect(result.readout?.join(" ")).toContain("= 90°");
    }
  });

  it("faktöriyel, basamak ve bölünebilme", () => {
    expect(frame("faktoriyel", "Azalan seçimler neden n! verir?", 4).readout).toContain("= 24");
    expect(frame("faktoriyel", "Bir asalın kaç kopyası var?", 0, 0).readout).toContain("4 + 1 = 5");
    expect(frame("faktoriyel", "Bir asalın kaç kopyası var?", 0, 1).readout).toContain("6 + 3 + 1 = 10");
    expect(frame("faktoriyel", "Sondaki sıfırların kaynağı 2×5 çiftleridir", 25).readout).toContain("5 + 1 = 6");
    expect(frame("faktoriyel", "Sondaki sıfırların kaynağı 2×5 çiftleridir", 24).readout).toContain("4 + 0 = 4");
    expect(frame("sayi-basamaklari", "Sola eklemek ve sağa eklemek farklıdır", 3).readout).toContain("62063");
    expect(frame("sayi-basamaklari", "Sola eklemek ve sağa eklemek farklıdır", 3).readout).toContain("36206");
    expect(frame("sayi-basamaklari", "Numara sayısı ile yazılan rakam sayısı", 120).readout).toContain("9·1 + 90·2 + 21·3 = 252");
    expect(frame("sayi-basamaklari", "Basamak aralığı ve 10’un kuvvetleri", 5).readout).toContain("90.000");
    expect(frame("bolme-bolunebilme", "Eşitlik tek başına bölme işlemi değildir", 38).readout).toContain("38 = 7·5 + 3");
    expect(frame("bolme-bolunebilme", "11 için işaretli ağırlık tablosu").readout).toContain("kalan 9");
    expect(9051 % 11).toBe(9);
  });

  it("cebir, bilimsel gösterim, kartezyen çarpım ve mantık", () => {
    expect(frame("carpanlara-ayirma", "Tam karede uçlar kadar orta terim de önemlidir", 4).readout).toContain("16 + 24 + 9 = 49");
    expect(frame("carpanlara-ayirma", "İki kare farkı: toplam ile farkın çarpımı", 2, 2).readout).toContain("3·7 = 21");
    expect(frame("carpanlara-ayirma", "Baş katsayı 1 değilse çapraz terimlerin toplamını denetle", 0, 1).readout).toContain("(3x + 2)(2x − 1)");
    expect(frame("bilimsel-gosterim-katsayi", "Toplama ve çıkarmada ortak ölçek kur", 0, 2).readout).toContain("3,9·10⁵");
    expect(frame("bilimsel-gosterim-katsayi", "Çarpma ve bölmede katsayı ile ölçeği ayır", 0, 2).readout).toContain("2,4·10³");
    expect(frame("kartezyen-carpim", "Her ilk seçimi her ikinci seçimle eşleştir", 0, 1).readout).toContain("6 çift");
    expect(frame("kartezyen-carpim", "Dağılma tanımdaki “ve/veya”dan türetilir", 0, 2).readout).toContain("4 + 4 − 2 = 6");
    const ct = fig("mantik-onerme", "Karşıt ters ilk koşula, karşıt ve ters birbirine denktir").draw(0, 0);
    expect(ct.els.filter((e) => e.k === "text").map((e) => (e as { s: string }).s).slice(6, 30)).toEqual("111111100110011001001111".split(""));
  });

  it("çarpan çiftlerinin sırasız olduğunu açıklar ve iki çarpanı gösterir", () => {
    const title = "x²+bx+c için toplam ve çarpımı birlikte ara";
    const def = fig("carpanlara-ayirma", title);
    expect(def.caption).toContain("sırasız olarak birer kez");
    expect(def.alt).toContain("sırasız çarpan çiftleri");
    const result = frame("carpanlara-ayirma", title).readout;
    expect(result).toContain("pq = −12 ve p + q = −1 koşullarını 3 ve −4 sağlar.");
    expect(result).toContain("x² − x − 12 = (x − 4)(x + 3)");
  });

  it("veri, grafik ve problem modelleri", () => {
    expect(frame("veri-analizi", "Ortancayı yazılış sırası belirlemez", 0, 0).labels).toContain("ortanca = (4 + 7)/2 = 5,5");
    expect(frame("veri-analizi", "Uç değerin etkisini ölç, ezberleme", 13).readout).toContain("ortalama 5; ortanca 3; açıklık 12");
    expect(frame("veri-analizi", "Ortalamayı toplama geri döndür", 0, 1).readout).toContain("840/12 = 70");
    expect(frame("grafik-problemleri", "Dairede payın paydası bütünün toplamıdır", 0, 0).labels).toContain("30: %30, 108°");
    expect(frame("grafik-problemleri", "Dairede payın paydası bütünün toplamıdır", 0, 1).labels).toContain("30: %27,3, 98,2°");
    expect(frame("grafik-problemleri", "Çizgi grafiğinde değişim ile değişim hızı ayrıdır", 3).readout).toContain("eşit (21 L)");
    expect(frame("grafik-problemleri", "Ortalama, ortanca ve tepe değerini ayrı hesapla", 0, 1).readout).toContain("ortanca 3,5");
    expect(frame("faiz-problemleri", "Basit faiz neden doğrusal artar?", 2).readout).toContain("7.200 TL");
    expect(frame("faiz-problemleri", "Ayı ve günü oranla aynı döneme çevir", 3).readout).toContain("0,04");
    expect(frame("faiz-problemleri", "Faiz yeniden yatırılıyorsa çarpanlar değişir", 2).readout).toContain("Fark 50 TL");
    expect(frame("havuz-problemleri", "Giriş ekler, çıkış azaltır", 18).readout).toContain("%100 dolu");
    expect(frame("havuz-problemleri", "Başlangıç doluluğunu denklemde tut", 3).readout).toContain("%62,5");
    expect(frame("kesir-problemleri", "Geriye doğru çözüm hangi aşamayı geri alır?", 0, 2).readout).toContain("120/(2/3) = 180");
    expect(frame("sayi-problemleri", "İşlemin cümledeki sırasını parantezle koru", 10).readout).toContain("4x − 3 = 37, 4(x − 3) = 28");
    expect(frame("sayi-problemleri", "En az ve en çok eşitlikten fazlasını söyler", 95).readout).toContain("En çok 7 tane: 7·12 = 84 ≤ 95 < 96");
  });
});

it("places the angle bisector and the median at different points on AC", () => {
  const def = fig("tyt-geo-ucgende-acilar-031", "Açıortay ve orta nokta");
  const bisector = def.draw(0, 0);
  const median = def.draw(0, 1);
  const points = (elements: typeof bisector.els) => new Map(
    elements.filter((el) => el.k === "pt").map((point) => [point.label, point.p]),
  );
  const { A, C, D, M } = {
    A: points(bisector.els).get("A")!,
    C: points(bisector.els).get("C")!,
    D: points(bisector.els).get("D")!,
    M: points(median.els).get("M")!,
  };
  const dist = (p: typeof A, q: typeof A) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  expect(dist(M, A)).toBeCloseTo(dist(M, C), 10);
  expect(dist(D, M)).toBeGreaterThan(0.01);
  expect(dist(A, D) + dist(D, C)).toBeCloseTo(dist(A, C), 10);
  expect(bisector.readout?.join(" ")).toContain("= 95°");
  expect(median.els.filter((el) => el.k === "ticks")).toHaveLength(2);
});

it("requires a missing sequence term to occupy one of the given positions", () => {
  const def = fig("ardisik-sayilar", "Silinen terim adayını listede doğrula");
  expect(def.draw(161, 0).readout).toEqual([
    "Aday: 175 − 161 = 14.",
    "14 listede yok. Bu toplam mümkün değil.",
  ]);
  expect(def.draw(162, 0).readout).toEqual([
    "Aday: 175 − 162 = 13.",
    "13 listede. Bu terim silinebilir.",
  ]);
  expect(def.draw(140, 0).readout?.[1]).toContain("35 listede yok");
  expect(def.draw(144, 0).readout?.[1]).toContain("31 listede.");
});

it("computes ramp slope and hypotenuse from its displayed side lengths", () => {
  const def = fig("tyt-geo-dik-ucgen-031", "Dik yolda eğim ve uzunluk");
  expect(def.draw(5, 0).readout).toEqual([
    "Eğim: tan α = 5/12.",
    "Eğik yol: √(12² + 5²) = 13 m.",
  ]);
  expect(def.draw(9, 0).readout?.[1]).toContain("= 15 m");
  expect(def.draw(6, 0).readout?.[1]).toContain("≈ 13,42 m");
});
