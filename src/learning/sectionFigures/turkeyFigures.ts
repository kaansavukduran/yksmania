import { turkeyRings } from "../geo/turkeyRings";
import { circle, poly, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Türkiye figures on the real national outline (Natural Earth 1:50m).
 * Longitude is scaled by cos(39°) so the country keeps its familiar shape.
 * Mountain belts, faults and corridors are hand-placed school-level
 * approximations and every caption says so. Place names sit in the legend
 * under the map (numbered tokens), so no label covers the drawing.
 */

const K = Math.cos((39 * Math.PI) / 180);
const P = (lon: number, lat: number): V => v((lon - 35) * K, lat - 39);
const line = (pts: [number, number][]) => pts.map(([lo, la]) => P(lo, la));

function country(box?: [number, number, number, number]): El[] {
  const rings = turkeyRings();
  if (!box) return rings.map((r) => poly(r.map(([lo, la]) => P(lo, la)), { tone: "muted", fill: "muted" }));
  //   // Close-up: coastline only. A filled land area would end in straight cut
  // edges at the box and read as a frame around the drawing.
  const els: El[] = [];
  const inBox = ([lo, la]: [number, number]) => lo >= box[0] && lo <= box[2] && la >= box[1] && la <= box[3];
  for (const r of rings) {
    let run: V[] = [];
    for (const p of [...r, r[0]]) {
      if (inBox(p)) run.push(P(p[0], p[1]));
      else {
        if (run.length > 1) els.push(poly(run, { open: true, tone: "muted" }));
        run = [];
      }
    }
    if (run.length > 1) els.push(poly(run, { open: true, tone: "muted" }));
  }
  return els;
}
const seaLabel = (lon: number, lat: number, s: string): El => txt(P(lon, lat), s, "c", { tone: "b", small: true });
const ridge = (pts: [number, number][], tone: Tone = "c"): El => poly(line(pts), { open: true, tone, bold: true });
function token(lon: number, lat: number, code: string, tone: Tone, on = true, r = 0.3): El[] {
  const c = P(lon, lat);
  return on
    ? [circle(c, r, { tone, fill: tone, bold: true }), txt(c, code, "c", { tone, small: true, bold: true })]
    : [circle(c, r * 0.4, { tone: "muted", fill: "muted" })];
}

/* ---------------- İklim tipleri ---------------- */
type City = { name: string; lon: number; lat: number };
const C: Record<string, City> = {
  antalya: { name: "Antalya", lon: 30.71, lat: 36.9 },
  izmir: { name: "İzmir", lon: 27.14, lat: 38.42 },
  adana: { name: "Adana", lon: 35.32, lat: 37.0 },
  trabzon: { name: "Trabzon", lon: 39.45, lat: 40.95 },
  rize: { name: "Rize", lon: 40.85, lat: 41.02 },
  samsun: { name: "Samsun", lon: 36.33, lat: 41.29 },
  ankara: { name: "Ankara", lon: 32.85, lat: 39.93 },
  konya: { name: "Konya", lon: 32.48, lat: 37.87 },
  erzurum: { name: "Erzurum", lon: 41.27, lat: 39.9 },
  kars: { name: "Kars", lon: 43.1, lat: 40.6 },
  istanbul: { name: "İstanbul", lon: 28.98, lat: 41.01 },
  edirne: { name: "Edirne", lon: 26.56, lat: 41.68 },
  bursa: { name: "Bursa", lon: 29.06, lat: 40.19 },
};
const climates: { label: string; tone: Tone; cities: string[]; text: string[] }[] = [
  {
    label: "Akdeniz iklimi",
    tone: "a",
    cities: ["antalya", "izmir", "adana"],
    text: ["Yaz sıcak ve kurak, kış ılık ve yağışlı.", "Kızılçam ve maki ile ilişkili; kıyıdan yükseğe çıkınca koşullar değişir. Ilık kış don olmayacağını garanti etmez."],
  },
  {
    label: "Karadeniz iklimi",
    tone: "c",
    cities: ["samsun", "trabzon", "rize"],
    text: ["Her mevsim yağışlı; yazın da yağış sürer.", "Denizellik yıllık sıcaklık farkını küçültür. Dağların ardı ve iç vadiler aynı grafiği taşımaz."],
  },
  {
    label: "Karasal iklim (iç ve doğu)",
    tone: "b",
    cities: ["ankara", "konya", "erzurum", "kars"],
    text: ["Yaz sıcak ve kurak, kış soğuk; yıllık sıcaklık farkı büyük.", "Doğuda yükselti nedeniyle kışlar çok sert. İç alanların tek bir karasal kalıbı yoktur."],
  },
  {
    label: "Geçiş alanı (Marmara)",
    tone: "warn",
    cities: ["istanbul", "edirne", "bursa"],
    text: ["Denizler, yükselti ve farklı hava akımları geçiş özelliklerini güçlendirir.", "İklim sınırları idari sınır gibi keskin değildir."],
  },
];
const cityKeys = Object.keys(C);
const climateFigure: FigureDef = {
  caption:
    "İleri ile iklim tiplerini sırayla aç: numaralı halkalar o iklimin örnek kentleridir, adları altta yazar. Sınır gerçek Türkiye haritasıdır, kent işaretleri yaklaşıktır; iklim alanları kesin çizgiyle ayrılmadığı için bölge çizilmedi.",
  alt: "Gerçek Türkiye haritası üzerinde örnek kentler; her adımda bir iklim tipinin kentleri renkli numaralı halkalarla vurgulanır.",
  steps: climates.map((c) => c.label),
  draw: (_v, step) => {
    const cl = climates[step];
    const els: El[] = [...country(), seaLabel(35, 42.5, "Karadeniz"), seaLabel(32, 35.4, "Akdeniz"), seaLabel(25.3, 39.6, "Ege")];
    let n = 0;
    const legend: { code: string; label: string; tone: Tone }[] = [];
    for (const k of cityKeys) {
      const city = C[k];
      const on = cl.cities.includes(k);
      if (on) {
        n++;
        legend.push({ code: String(n), label: city.name, tone: cl.tone });
      }
      els.push(...token(city.lon, city.lat, String(n), cl.tone, on));
    }
    return { els, legend, readout: [`${cl.label}: ${cl.text[0]}`, cl.text[1]] };
  },
};

/* ---------------- Dağların uzanışı ve yağış gölgesi ---------------- */
const northRange: [number, number][] = [[31, 41.05], [33.5, 41.45], [35.5, 41.2], [37, 40.85], [38.7, 40.75], [40.5, 40.75], [41.8, 41.1]];
const taurus: [number, number][] = [[29, 36.85], [30.3, 37.2], [31.5, 36.95], [33, 36.9], [34.5, 37.25], [35.8, 37.6], [37.5, 38], [39.5, 38.3], [42, 38.4]];
const aegeanRidges: [number, number][][] = [
  [[26.9, 39.15], [27.7, 39.1]],
  [[27.5, 38.3], [28.6, 38.3]],
  [[27.5, 37.85], [28.6, 38.02]],
];
const shadowFigure: FigureDef = {
  caption:
    "İleri ile yağış gölgesini kur: deniz → rüzgâr önü yamaç (yağış) → zirve → rüzgâr ardı (daha kuru). Kuzey Anadolu ve Toros kuşakları kıyıya paralel; Ege'de dağlar kıyıya dik uzandığı için deniz etkisi koridorlardan içeri girer. Dağ çizgileri yaklaşıktır.",
  alt: "Türkiye haritasında kuzeyde ve güneyde kıyıya paralel yeşil dağ çizgileri, batıda kıyıya dik kısa sırtlar; mavi oklar denizden gelen nemli havayı gösterir.",
  steps: ["Dağ kuşakları kıyıya paralel", "Karadeniz'den nemli hava", "Akdeniz'den nemli hava", "Ege'de dik dağlar, açık koridorlar"],
  draw: (_v, step) => {
    const els: El[] = [...country(), ridge(northRange), ridge(taurus), ...aegeanRidges.map((r) => ridge(r))];
    els.push(seaLabel(35, 42.5, "Karadeniz"), seaLabel(32, 35.4, "Akdeniz"), seaLabel(25.3, 39.6, "Ege"));
    const legend = [
      { code: "", label: "Dağ kuşağı (yaklaşık)", tone: "c" as Tone },
      { code: "", label: "Nemli hava akımı", tone: "b" as Tone },
    ];
    let readout = ["Kıyıya paralel kuşaklar deniz etkisinin içeri girmesini sınırlar."];
    if (step === 1) {
      for (const lon of [33, 36, 39.5]) els.push(vec(P(lon, 42.3), P(lon, 41.35), { tone: "b", bold: true }));
      els.push(txt(P(36.5, 40.2), "daha kuru", "c", { tone: "warn", small: true, bold: true }));
      readout = ["Kuzey yamaç (rüzgâr önü) yağış alır; dağın ardı daha kurudur.", "Her gün rüzgârın denizden estiği varsayılmaz."];
    } else if (step === 2) {
      for (const lon of [30.5, 33, 35.5]) els.push(vec(P(lon, 35.7), P(lon, 36.75), { tone: "b", bold: true }));
      els.push(txt(P(33.5, 38.1), "daha kuru", "c", { tone: "warn", small: true, bold: true }));
      readout = ["Torosların güney yamacı nemli havayı karşılar; iç kesim yağış gölgesinde kalır."];
    } else if (step === 3) {
      for (const lat of [38.55, 38.1, 37.7]) els.push(vec(P(25.8, lat), P(28.4, lat), { tone: "b", bold: true }));
      readout = ["Ege'de dağlar kıyıya dik; aradaki vadiler deniz etkisini içeri taşır.", "“Ege'de etki sonsuza kadar gider” sonucu çıkarılmaz."];
    }
    return { els, legend, readout };
  },
};

/* ---------------- Ege horst–graben ---------------- */
const egeBox: [number, number, number, number] = [25.9, 37.2, 30.2, 39.6];
const grabens: { name: string; pts: [number, number][] }[] = [
  { name: "Gediz grabeni", pts: [[27.0, 38.58], [28.0, 38.48], [28.9, 38.46]] },
  { name: "Küçük Menderes grabeni", pts: [[27.3, 38.07], [28.0, 38.16], [28.5, 38.2]] },
  { name: "Büyük Menderes grabeni", pts: [[27.3, 37.56], [28.0, 37.84], [29.0, 37.94]] },
];
const horsts: { name: string; pts: [number, number][] }[] = [
  { name: "Madra", pts: [[27.0, 39.18], [27.6, 39.12]] },
  { name: "Yunt", pts: [[27.2, 38.85], [27.8, 38.84]] },
  { name: "Bozdağlar", pts: [[27.6, 38.32], [28.6, 38.3]] },
  { name: "Aydın Dağları", pts: [[27.5, 37.86], [28.6, 38.02]] },
];
const egeFigure: FigureDef = {
  caption:
    "İleri ile Batı Anadolu'yu oku: yeşil sırtlar normal faylarla yükselen kırık dağlar (horst), mavi koridorlar çöken alçak alanlar (graben). Kıyıya dik uzanan koridorlar girintili kıyıyı ve deniz etkisinin içeri sokulmasını açıklar. Çizgiler yaklaşıktır.",
  alt: "Batı Anadolu'nun gerçek kıyı çizgisi; doğu-batı uzanımlı üç mavi graben koridoru ve aralarında yeşil horst sırtları.",
  steps: ["Kırık dağlar (horst)", "Çöken koridorlar (graben)", "Koridor yönü ve kıyı"],
  draw: (_v, step) => {
    const els: El[] = [...country(egeBox), seaLabel(26.3, 39.3, "Ege")];
    const legend: { code: string; label: string; tone: Tone }[] = [];
    horsts.forEach((h, i) => {
      els.push(ridge(h.pts, "c"));
      const [lo, la] = h.pts[0];
      els.push(...token(lo - 0.16, la, String(i + 1), "c", true, 0.11));
      legend.push({ code: String(i + 1), label: h.name, tone: "c" });
    });
    if (step >= 1)
      grabens.forEach((g, i) => {
        els.push(poly(line(g.pts), { open: true, tone: "b", bold: true, dash: true }));
        const [lo, la] = g.pts[g.pts.length - 1];
        const code = String.fromCharCode(65 + i);
        els.push(...token(lo + 0.14, la, code, "b", true, 0.11));
        legend.push({ code, label: g.name, tone: "b" });
      });
    if (step >= 2) for (const g of grabens) els.push(vec(P(26.1, g.pts[0][1]), P(26.95, g.pts[0][1]), { tone: "a" }));
    const readout = [
      ["Normal faylar boyunca göreli yükselen bloklar kırık dağları oluşturur."],
      ["Çöken bloklar alçak koridorlardır; çukur sonradan alüvyonla dolabilir.", "Her graben delta değildir: delta için kıyıda akarsu tortusu birikmelidir."],
      ["Koridorlar kıyıya dik uzanır: koy ve körfezli girintili kıyı, deniz etkisinin içeri ilerlemesi."],
    ][step];
    return { els, legend, readout };
  },
};

/* ---------------- KAF ve DAF ---------------- */
const kaf: [number, number][] = [[26.0, 40.6], [27.5, 40.7], [29.0, 40.72], [30.3, 40.7], [31.5, 40.85], [32.8, 40.95], [34.0, 41.0], [35.3, 40.8], [36.6, 40.4], [38.0, 40.0], [39.5, 39.75], [41.0, 39.3]];
const daf: [number, number][] = [[41.0, 39.3], [40.0, 38.8], [39.0, 38.5], [38.2, 38.0], [37.4, 37.5], [36.5, 36.6]];
const faultFigure: FigureDef = {
  caption:
    "İleri ile fay sistemlerini aç: Kuzey Anadolu (KAF) ve Doğu Anadolu (DAF) faylarında hareketin önemli bileşeni yanal kaymadır; zıt yönlü oklar iki bloğun birbirine göre kaymasını gösterir. Hat konumları yaklaşıktır; deprem tarihi veya büyüklüğü bu şemadan çıkarılmaz.",
  alt: "Türkiye haritasında kuzeyde doğu-batı uzanan kırmızı KAF çizgisi ve doğuda kuzeydoğu-güneybatı uzanan DAF çizgisi; çizgilerin iki yanında zıt yönlü oklar.",
  steps: ["Kuzey Anadolu Fayı (KAF)", "Doğu Anadolu Fayı (DAF)", "Yanal hareket"],
  draw: (_v, step) => {
    const els: El[] = [...country(), poly(line(kaf), { open: true, tone: "warn", bold: true })];
    const legend: { code: string; label: string; tone: Tone }[] = [{ code: "1", label: "Kuzey Anadolu Fayı (yaklaşık)", tone: "warn" }];
    els.push(...token(29.0, 41.25, "1", "warn"));
    if (step >= 1) {
      els.push(poly(line(daf), { open: true, tone: "a", bold: true }));
      els.push(...token(37.2, 37.0, "2", "a"));
      legend.push({ code: "2", label: "Doğu Anadolu Fayı (yaklaşık)", tone: "a" });
    }
    if (step >= 2) {
      els.push(vec(P(33.2, 41.35), P(31.4, 41.25), { tone: "b", bold: true }), vec(P(31.4, 40.45), P(33.2, 40.55), { tone: "b", bold: true }));
      els.push(vec(P(39.4, 38.95), P(40.4, 39.55), { tone: "b", bold: true }), vec(P(39.3, 38.15), P(38.3, 37.6), { tone: "b", bold: true }));
      legend.push({ code: "", label: "Blokların göreli kayma yönü", tone: "b" });
    }
    const readout = [
      ["KAF kuzeyde, kıyıya yakın ve kabaca doğu–batı uzanır."],
      ["DAF, doğuda KAF ile birleştiği alandan güneybatıya uzanır."],
      ["Doğrultu atımlı faylarda bloklar yatay yönde birbirine göre kayar; bu, bütün arazinin düşey çökmesi değildir.", "Batı Anadolu'daki normal fay kesitiyle aynı ok gibi okunmaz."],
    ][step];
    return { els, legend, readout };
  },
};

export const turkeyFigures: Record<string, Record<string, FigureDef>> = {
  "turkiye-iklimi": {
    "Dağların uzanışı ve yağış gölgesi": shadowFigure,
    "Akdeniz, Karadeniz ve geçiş alanları": climateFigure,
  },
  "turkiye-yer-sekilleri": {
    "Ege koridorları ve girintili kıyı": egeFigure,
  },
  "turkiye-ic-kuvvetler": {
    "Kuzey ve doğuda yanal hareket": faultFigure,
  },
};
