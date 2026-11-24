import { turkeyRings } from "../geo/turkeyRings";
import { circle, fmt, poly, pt, seg, txt, v, vec, type El, type FigureDef, type FigureFrame, type Tone, type V } from "./figureKit";
import { rect } from "./turkishFigures060Kit";

/*
 * Forge066: dört TYT Coğrafya kopya kâğıdı (Türkiye'nin yer şekilleri,
 * Türkiye iklimi, Dünya'da nüfusun dağılışı, Türkiye'de nüfus) özgün
 * etkileşimli figürlerle. Her figür dersin daha önce çizimi olmayan bir
 * bölümüne bağlıdır ve dersin laboratuvarını tekrarlamaz. Haritalar gerçek
 * Türkiye sınırı (Natural Earth) üzerine elle konmuş yaklaşık işaretlerdir,
 * ölçekli değildir. Kesitler ve sayı örnekleri bu dosya için yazılmış özgün
 * modellerdir; tarihli gerçek veriler kaynağı ve yılıyla birlikte yazılır.
 * Kâğıtların cümleleri kopyalanmadı. Adım, seçim ve sürgü öğrenme kaydı
 * üretmez.
 */

type Legend = NonNullable<FigureFrame["legend"]>;
/** Görünmez köşe etiketleri: adımlar arasında çizim ölçeğini sabit tutar. */
const pad = (x0: number, y0: number, x1: number, y1: number): El[] => [txt(v(x0, y0), " ", "c"), txt(v(x1, y1), " ", "c")];

/* ---------------- Türkiye haritası yardımcıları ---------------- */
const K = Math.cos((39 * Math.PI) / 180);
/** Boylam/enlem → çizim birimi; boylam cos 39° ile daraltılır. */
const P = (lon: number, lat: number): V => v((lon - 35) * K, lat - 39);
let landCache: El[] | undefined;
const turkey = (): El[] => (landCache ??= turkeyRings().map((r) => poly(r.map(([lo, la]) => P(lo, la)), { tone: "muted", fill: "muted" })));
const ridge = (pts: [number, number][], tone: Tone, on: boolean): El =>
  poly(pts.map(([lo, la]) => P(lo, la)), { open: true, tone: on ? tone : "muted", bold: on, thin: !on, smooth: true });
/** Numaralı halka: adı haritanın altındaki anahtarda yazar. */
function token(lon: number, lat: number, code: string, tone: Tone, r = 0.27): El[] {
  const c = P(lon, lat);
  return [circle(c, r, { tone, fill: tone, bold: true }), txt(c, code, "c", { tone, small: true, bold: true })];
}
const faint = (lon: number, lat: number): El => circle(P(lon, lat), 0.1, { tone: "muted", fill: "muted" });
/** Seçilebilir harita etiketi (dokunma halkası seçim düğmesidir). */
const pickTag = (lon: number, lat: number, code: string, tone: Tone, i: number): El => txt(P(lon, lat), code, "c", { tone, small: true, bold: true, pick: i });

/* =====================================================================
 * 019 Türkiye'nin yer şekilleri
 * ===================================================================== */

// Ortalama ile tek nokta: 11 noktalı özgün batı–doğu modeli (2 km aralık).
const PROF = [100, 500, 2100, 300, 1000, 1200, 1200, 1500, 1300, 2300, 2200];
const PY = 1 / 600;
const meanX = (PROF.length - 1) / 2;
const meanE = PROF.reduce((s, e) => s + e, 0) / PROF.length;
const trendB = PROF.reduce((s, e, i) => s + (i - meanX) * (e - meanE), 0) / PROF.reduce((s, _e, i) => s + (i - meanX) ** 2, 0);
const trendAt = (x: number) => meanE + trendB * (x - meanX);
const IP = 2;
const IQ = 8;
const slopePct = ((PROF[4] - PROF[3]) / 2000) * 100;
const averageFigure: FigureDef = {
  caption:
    "Özgün 11 noktalı batı–doğu kesiti (noktalar arası 2 km, düşey abartılı, ölçekli değil). İleri ile aç: kesik çizgi genel eğilimdir; tek iki noktayı sıralamaz. Son adımda yükselti ile engebeyi ayır: yüksek düz yüzey alçaktaki dik yamaçtan daha az eğimli olabilir.",
  alt: "Soldan sağa inip çıkan bir arazi çizgisi ve sağa doğru yükselen kesik eğilim çizgisi. Batıda P zirvesi 2100 m, doğuda Q vadi tabanı 1300 m. Son adımda 300 m'den 1000 m'ye çıkan dik yamaç ve 1200 m'deki düz yüzey vurgulanır.",
  steps: ["Genel eğilim", "İki nokta", "Yükselti ve engebe"],
  draw: (_v, step) => {
    const xy = (i: number): V => v(i, PROF[i] * PY);
    const els: El[] = [seg(v(0, 0), v(10, 0), { tone: "muted", thin: true })];
    for (const m of [1000, 2000]) {
      els.push(seg(v(-0.12, m * PY), v(0, m * PY), { tone: "muted", thin: true }));
      els.push(txt(v(-0.2, m * PY), `${fmt(m, 0)} m`, "w", { small: true, tone: "muted", soft: true }));
    }
    els.push(txt(v(0, -0.12), "Batı", "se", { small: true, tone: "muted" }), txt(v(10, -0.12), "Doğu", "sw", { small: true, tone: "muted" }));
    els.push(poly(PROF.map((_, i) => xy(i)), { open: true, tone: step === 2 ? "muted" : "ink" }));
    els.push(seg(v(0, trendAt(0) * PY), v(10, trendAt(10) * PY), { tone: "a", dash: true, thin: step === 2 }));
    const legend: Legend = [{ code: "", label: `Genel eğilim: her 2 km'de yaklaşık +${fmt(trendB, 0)} m`, tone: "a" }];
    let readout: string[];
    if (step === 0) {
      readout = [
        `Eğilim çizgisi (en küçük kareler) batıdan doğuya her aralıkta yaklaşık ${fmt(trendB, 0)} m yükseliyor; kesitin ortalaması ${fmt(meanE, 0)} m.`,
        "Bu bir genel örüntüdür; tek tek noktalar çizginin altında ya da üstünde kalabilir.",
      ];
    } else if (step === 1) {
      els.push(pt(xy(IP), `P ${fmt(PROF[IP], 0)} m`, "n", "b"), pt(xy(IQ), `Q ${fmt(PROF[IQ], 0)} m`, "s", "c"));
      readout = [
        `Batıdaki P (${fmt(PROF[IP], 0)} m) doğudaki Q'dan (${fmt(PROF[IQ], 0)} m) ${fmt(PROF[IP] - PROF[IQ], 0)} m yüksek.`,
        "Doğuya genel artış, her doğu noktasının her batı noktasından yüksek olduğunu söylemez; iki noktayı ölçümle karşılaştır.",
      ];
    } else {
      els.push(seg(xy(3), xy(4), { tone: "b", bold: true }), seg(xy(5), xy(6), { tone: "c", bold: true }));
      legend.push(
        { code: "", label: `Dik yamaç: 2 km'de ${fmt(PROF[4] - PROF[3], 0)} m (eğim %${fmt(slopePct, 0)})`, tone: "b" },
        { code: "", label: `Düz yüzey: ${fmt(PROF[5], 0)} m'de, eğim %0`, tone: "c" },
      );
      readout = [
        `Yamaç ${fmt(PROF[3], 0)} m'den ${fmt(PROF[4], 0)} m'ye çıkıyor: eğim ${fmt(PROF[4] - PROF[3], 0)} / 2000 = %${fmt(slopePct, 0)}. Daha yüksekteki ${fmt(PROF[5], 0)} m yüzeyde eğim %0.`,
        "Yükselti deniz seviyesine göre konumdur; engebe yakın noktalar arasındaki farktır. Biri ötekinin yerine kullanılmaz.",
      ];
    }
    return { els, legend, readout };
  },
};

// Dağların kökeni: kıvrım, kırık, volkanik.
const KAD: [number, number][] = [[31, 41.0], [33.5, 41.35], [35.5, 41.1], [37, 40.75], [38.7, 40.65], [40.5, 40.65], [41.8, 41.0]];
const TOROS: [number, number][] = [[29, 36.95], [30.3, 37.3], [31.5, 37.05], [33, 37.0], [34.5, 37.35], [35.8, 37.7], [37.5, 38.1], [39.5, 38.4], [42, 38.5]];
const HORSTS: [number, number][][] = [
  [[26.95, 39.2], [27.55, 39.15]],
  [[27.2, 38.85], [27.75, 38.85]],
  [[27.65, 38.32], [28.6, 38.32]],
  [[27.5, 37.88], [28.6, 38.03]],
];
const VOLCANO: { name: string; lon: number; lat: number }[] = [
  { name: "Ağrı ve Tendürek", lon: 44.1, lat: 39.55 },
  { name: "Süphan", lon: 42.83, lat: 38.93 },
  { name: "Erciyes", lon: 35.45, lat: 38.53 },
  { name: "Hasan", lon: 34.17, lat: 38.13 },
  { name: "Kula (Batı Anadolu'da volkanik alan)", lon: 28.65, lat: 38.68 },
];
const cone = (lon: number, lat: number, tone: Tone, on: boolean): El => {
  const c = P(lon, lat);
  return poly([v(c[0] - 0.17, c[1] - 0.12), v(c[0] + 0.17, c[1] - 0.12), v(c[0], c[1] + 0.17)], { tone: on ? tone : "muted", fill: on ? tone : "muted", thin: !on });
};
const originFigure: FigureDef = {
  caption:
    "İleri ile dağları kökenine göre aç: kıvrım kuşakları, normal faylarla yükselmiş kırık dağlar ve volkanik dağlar. Hepsi yüksek olabilir; ayırt edici olan oluşum kanıtıdır. Sınır gerçek Türkiye haritasıdır; dağ çizgileri ve işaretler yaklaşıktır, ölçekli değildir.",
  alt: "Türkiye haritasında kuzeyde ve güneyde kıyıya paralel iki uzun kıvrım çizgisi, batıda doğu–batı uzanımlı dört kısa kırık dağ çizgisi ve iç ile doğu kesimde volkan üçgenleri. Her adımda bir köken numaralı halkalarla vurgulanır.",
  steps: ["Kıvrım kuşakları", "Kırık dağlar", "Volkanik dağlar", "Üç köken birlikte"],
  draw: (_v, step) => {
    const all = step === 3;
    const els: El[] = [...turkey(), ridge(KAD, "c", step === 0 || all), ridge(TOROS, "c", step === 0 || all), ...HORSTS.map((h) => ridge(h, "a", step === 1 || all))];
    if (step !== 2) for (const g of VOLCANO) els.push(cone(g.lon, g.lat, "b", all));
    const legend: Legend = [];
    let readout: string[];
    if (step === 0) {
      els.push(...token(34.5, 40.5, "1", "c"), ...token(32.2, 37.7, "2", "c"));
      legend.push({ code: "1", label: "Kuzey Anadolu Dağları", tone: "c" }, { code: "2", label: "Toroslar", tone: "c" });
      readout = ["Kıvrım: tortul tabakalar sıkışarak bükülmüş; iki kuşak da kıyıya büyük ölçüde paralel uzanır.", "Bugünkü bir dağda farklı yaşta kayaç bulunması baskın yapısal geçmişi silmez."];
    } else if (step === 1) {
      els.push(...token(29.5, 38.6, "1", "a"));
      legend.push({ code: "1", label: "Madra, Yunt, Bozdağlar, Aydın Dağları (Batı Anadolu)", tone: "a" });
      readout = ["Kırık: normal faylar boyunca göreli yükselen bloklar (horst); aralarındaki çöken bloklar ovaları taşır.", "Doğu–batı uzanış kıyıya dik koridorlar oluşturur."];
    } else if (step === 2) {
      VOLCANO.forEach((g, i) => {
        els.push(...token(g.lon, g.lat, String(i + 1), "b", 0.22));
        legend.push({ code: String(i + 1), label: g.name, tone: "b" });
      });
      readout = ["Volkanik: lav ve kül birikimiyle yükselen dağlar; konik biçim ve lav örtüsü kanıttır.", "Dağlık görünüş tek başına volkanik kökeni kanıtlamaz."];
    } else {
      legend.push({ code: "", label: "Kıvrım kuşağı", tone: "c" }, { code: "", label: "Kırık dağ", tone: "a" }, { code: "", label: "Volkanik dağ", tone: "b" });
      readout = ["Önce biçimi (dağ), sonra kanıtı (kıvrımlı tabaka, fay bloğu, lav–kül), en son konumu yaz.", "Yer adını ezberledikten sonra mutlaka kökeniyle eşleştir."];
    }
    return { els, legend, readout };
  },
};

// Ova: üç özgün kesit, taban yükseltisi ve çevresi.
const OY = 1 / 800;
const PLAINS: { name: string; floor: number; rim: number; text: string; pts: (x: number) => V[] }[] = [
  {
    name: "Kıyı ovası",
    floor: 10,
    rim: 500,
    text: "Akarsu ağzında biriken alüvyon; taban deniz düzeyine yakın.",
    pts: (x) => [v(x + 0.9, 10 * OY), v(x + 2.0, 10 * OY), v(x + 2.5, 500 * OY), v(x + 3, 500 * OY)],
  },
  {
    name: "Graben ovası",
    floor: 100,
    rim: 1200,
    text: "İki normal fay arasında çöken blok; çanak sonradan alüvyonla dolabilir.",
    pts: (x) => [v(x, 1200 * OY), v(x + 0.75, 1200 * OY), v(x + 1.0, 100 * OY), v(x + 2.0, 100 * OY), v(x + 2.25, 1200 * OY), v(x + 3, 1200 * OY)],
  },
  {
    name: "İç yüksek ova",
    floor: 1600,
    rim: 2500,
    text: "Dağlarla çevrili iç havza tabanı; deniz düzeyinden yüksek ama çevresinden alçak.",
    pts: (x) => [v(x, 2500 * OY), v(x + 0.8, 2500 * OY), v(x + 1.1, 1600 * OY), v(x + 1.9, 1600 * OY), v(x + 2.2, 2500 * OY), v(x + 3, 2500 * OY)],
  },
];
const plainFigure: FigureDef = {
  caption:
    "Üç özgün kesit yan yana (düşey abartılı, ölçekli değil): kıyı ovası, graben ovası ve iç yüksek ova. İleri ile birer birer aç. Üçünün tabanı çok farklı yükseltide ama üçü de çevresine göre alçak ve az eğimlidir; ova adı rakamdan değil bu ilişkiden gelir.",
  alt: "Yan yana üç kesit. Solda deniz kenarında 10 m'lik düz taban ve 500 m tepeler; ortada 1200 m'lik iki blok arasında 100 m'lik çökük taban; sağda 2500 m dağlar arasında 1600 m'lik iç ova tabanı.",
  steps: [...PLAINS.map((p) => p.name), "Üçünü karşılaştır"],
  draw: (_v, step) => {
    const els: El[] = [seg(v(0, 0), v(10, 0), { tone: "muted", thin: true }), txt(v(-0.15, 0), "0 m", "w", { small: true, tone: "muted" })];
    els.push(seg(v(0, 0), v(0.9, 0), { tone: "b", bold: true, dash: true }));
    PLAINS.forEach((p, i) => {
      const x = i * 3.5;
      const on = step === i || step === 3;
      els.push(poly(p.pts(x), { open: true, tone: on ? (step === 3 ? "ink" : "a") : "muted", bold: on && step !== 3, thin: !on }));
      if (i === 1) for (const fx of [x + 0.875, x + 2.125]) els.push(seg(v(fx + 0.1, 1300 * OY), v(fx - 0.1, 0), { tone: "muted", thin: true, dash: true }));
      const cx = x + 1.5;
      els.push(txt(v(cx, -0.25), p.name, "s", { small: true, bold: true, tone: on ? "ink" : "muted" }));
      els.push(txt(v(cx, -0.83), `taban ${fmt(p.floor, 0)} m`, "s", { small: true, tone: on ? "ink" : "muted" }));
      els.push(txt(v(cx, -1.41), `çevre ${fmt(p.rim, 0)} m`, "s", { small: true, tone: on ? "ink" : "muted" }));
    });
    let readout: string[];
    if (step < 3) {
      const p = PLAINS[step];
      readout = [`${p.name}: taban ${fmt(p.floor, 0)} m, çevre ${fmt(p.rim, 0)} m; taban çevresinden ${fmt(p.rim - p.floor, 0)} m alçak.`, p.text];
    } else {
      readout = [
        `Tabanlar ${PLAINS.map((p) => fmt(p.floor, 0)).join(" < ")} m; iç yüksek ovanın tabanı graben çevresindeki bloklardan bile yüksek.`,
        "Üçü de ova: çevresine göre alçak, az eğimli düzlük. Yüksek rakam tek başına bir ovayı plato yapmaz.",
      ];
    }
    return { els, readout };
  },
};

// Plato: tıklanabilir harita etiketleri.
const PLATEAUS: { name: string; lon: number; lat: number; tone: Tone; region: string; detail: string }[] = [
  { name: "Haymana", lon: 32.5, lat: 39.45, tone: "c", region: "İç Anadolu", detail: "Akarsuların yardığı, çevresine göre yüksek kalmış görece düz yüzey." },
  { name: "Cihanbeyli", lon: 32.9, lat: 38.65, tone: "c", region: "İç Anadolu", detail: "Geniş ve görece düz yüzey; ayırt edici kanıt akarsu yarılmasıdır." },
  { name: "Obruk", lon: 33.85, lat: 37.85, tone: "c", region: "İç Anadolu", detail: "Konya çevresindeki yüksek düzlüklerden; ova tabanıyla karıştırmamak için yarılmayı ara." },
  { name: "Uzunyayla", lon: 36.6, lat: 39.05, tone: "c", region: "İç Anadolu", detail: "Doğuya doğru uzanan yüksek plato örneği." },
  { name: "Gaziantep", lon: 37.4, lat: 37.25, tone: "c", region: "Güneydoğu Anadolu", detail: "Güneydoğudaki plato örneklerinden; ova ile plato aynı bölgede yan yana olabilir." },
  { name: "Şanlıurfa", lon: 38.9, lat: 37.35, tone: "c", region: "Güneydoğu Anadolu", detail: "Güneydoğudaki geniş yüksek düzlüklerden biri." },
  { name: "Erzurum–Kars", lon: 42.2, lat: 40.25, tone: "b", region: "Doğu Anadolu", detail: "Lav örtüsü üzerinde gelişmiş yüksek plato; köken bilgisi volkanik, biçim bilgisi platodur." },
  { name: "Ardahan", lon: 42.75, lat: 41.05, tone: "b", region: "Doğu Anadolu", detail: "Kuzeydoğudaki yüksek plato örneklerinden." },
  { name: "Teke", lon: 29.95, lat: 37.1, tone: "a", region: "Batı Akdeniz", detail: "Karstik plato: kalker çözünmesiyle ilişkili yüzey; plato adı ve karst niteliği ayrı sınıflama düzeyleridir." },
  { name: "Taşeli", lon: 33.1, lat: 36.8, tone: "a", region: "Orta Akdeniz", detail: "Karstik plato: akarsularla yarılmış yüksek yüzey ve kalker birlikte görülür." },
  { name: "Çatalca–Kocaeli", lon: 29.0, lat: 41.2, tone: "c", region: "Marmara", detail: "Alçak aşınım yüzeyi de plato olabilir; Perşembe de benzer alçak bir örnektir. Plato için tek bir alt yükselti sınırı yoktur." },
];
const plateauFigure: FigureDef = {
  caption:
    "Türkiye'deki plato örneklerine dokun: bölge, köken ve ayırt edici kanıt açılır. Ortak kanıt akarsuyla yarılmış, çevresine göre yüksek, görece düz yüzeydir; köken (karstik, lav, aşınım) ayrı bir bilgidir. Konumlar yaklaşıktır, harita ölçekli değildir.",
  alt: "Türkiye haritasında on bir numaralı seçilebilir etiket: İç Anadolu'da Haymana, Cihanbeyli, Obruk, Uzunyayla; güneydoğuda Gaziantep, Şanlıurfa; doğuda Erzurum–Kars, Ardahan; güneyde Teke, Taşeli; kuzeybatıda Çatalca–Kocaeli.",
  picks: PLATEAUS.map((p) => ({ label: p.name, title: `${p.name} platosu`, detail: [`${p.region}.`, p.detail] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [...turkey()];
    PLATEAUS.forEach((p, i) => els.push(pickTag(p.lon, p.lat, String(i + 1), p.tone, i)));
    const legend: Legend = [
      { code: "", label: "Plato örneği (köken ayrıca belirtilmedi)", tone: "c" },
      { code: "", label: "Lav platosu", tone: "b" },
      { code: "", label: "Karstik plato", tone: "a" },
    ];
    const p = PLATEAUS[pick];
    const readout = p
      ? [`${pick + 1} · ${p.name} (${p.region}): biçim plato; köken ve kayaç ayrıca sorulur, yüksek rakam tek başına kanıt değildir.`]
      : ["Bir numaraya dokun ya da aşağıdan bir plato seç.", "Plato: akarsularla yarılıp çevresine göre yüksek kalmış görece düz yüzey."];
    return { els, legend, readout };
  },
};

/* =====================================================================
 * 009 Türkiye iklimi
 * ===================================================================== */

/** Dönence enlemi yay dakikası olarak (23°27′). */
const TROPIC_MIN = 23 * 60 + 27;
const dm = (min: number) => `${Math.floor(min / 60)}°${String(min % 60).padStart(2, "0")}′`;
const latitudeFigure: FigureDef = {
  caption:
    "Enlem sürgüsünü Türkiye üzerinde gezdir: öğle Güneş yüksekliği 21 Haziran'da 90° − (φ − 23°27′), 21 Aralık'ta 90° − (φ + 23°27′). Türkiye dönencenin kuzeyinde olduğu için Güneş öğlen hiçbir yerde tam tepede değildir. Aynı enlem çizgisi üzerinde iklim yine değişebilir.",
  alt: "Türkiye haritası üzerinde seçilen enlemde yatay kesik bir çizgi; sol kenarda 36°, 38°, 40° ve 42° enlem değerleri.",
  param: { label: "Enlem", min: 36, max: 42, step: 1, init: 39, unit: "° K" },
  draw: (phi) => {
    const els: El[] = [...turkey()];
    for (const la of [36, 38, 40, 42]) els.push(txt(P(25.4, la), `${la}°`, "w", { small: true, tone: "muted", soft: true }));
    els.push(seg(P(25.6, phi), P(45, phi), { tone: "a", bold: true, dash: true }));
    const june = 90 * 60 - (phi * 60 - TROPIC_MIN);
    const dec = 90 * 60 - (phi * 60 + TROPIC_MIN);
    return {
      els,
      readout: [
        `φ = ${phi}° K: 21 Haziran öğle yüksekliği ${dm(june)}, 21 Aralık ${dm(dec)}; yıl içi fark ${dm(june - dec)}.`,
        "Fark mevsimleri belirginleştirir. Aynı çizgideki kıyı ile yüksek iç havza; yükselti, denizden uzaklık ve dağ düzeni yüzünden farklı sıcaklık gösterebilir.",
      ],
    };
  },
};

const WINDS: { name: string; from: string; deg: number; note: string }[] = [
  { name: "yıldız", from: "kuzeyden", deg: 90, note: "Adı, Kutup Yıldızı'nın bulunduğu yönden gelir." },
  { name: "poyraz", from: "kuzeydoğudan", deg: 45, note: "Adı yönü anlatır; rüzgârın sıcaklığını ya da nemini söylemez." },
  { name: "gündoğusu", from: "doğudan", deg: 0, note: "Adı Güneş'in doğduğu yönden gelir." },
  { name: "keşişleme", from: "güneydoğudan", deg: -45, note: "Dört ana yön arasındaki ara yönlerden biridir." },
  { name: "kıble", from: "güneyden", deg: -90, note: "Güneyli akım çoğu durumda ısıtabilir." },
  { name: "lodos", from: "güneybatıdan", deg: -135, note: "Isıtabilir; yağış getirip getirmemesi geçtiği deniz ya da karaya ve nemine bağlıdır." },
  { name: "günbatısı", from: "batıdan", deg: 180, note: "Adı Güneş'in battığı yönden gelir." },
  { name: "karayel", from: "kuzeybatıdan", deg: 135, note: "Dört ana yön arasındaki ara yönlerden biridir." },
];
const anchorOf = (deg: number) => (deg === 90 ? "n" : deg === -90 ? "s" : deg === 0 ? "e" : deg === 180 ? "w" : deg === 45 ? "ne" : deg === 135 ? "nw" : deg === -45 ? "se" : "sw");
const roseFigure: FigureDef = {
  caption:
    "Rüzgâr gülünde bir ada dokun: ok rüzgârın geldiği yönden merkeze iner. Yerel rüzgâr adları geldikleri yönü anlatır; sıcaklık ve yağış etkisi geçtikleri deniz ya da kara ile nemlerine bağlıdır. Yukarı kuzeydir.",
  alt: "Merkezde bir çember ve sekiz yönden merkeze inen oklar; çevrede yıldız, poyraz, gündoğusu, keşişleme, kıble, lodos, günbatısı ve karayel adları.",
  picks: WINDS.map((w) => ({ label: w.name, title: `${w.name[0].toLocaleUpperCase("tr-TR")}${w.name.slice(1)}`, detail: [w.note] })),
  draw: (_v, _s, pick = -1) => {
    const o = v(0, 0);
    const at = (r: number, d: number): V => v(r * Math.cos((d * Math.PI) / 180), r * Math.sin((d * Math.PI) / 180));
    const els: El[] = [circle(o, 1.6, { tone: "muted", thin: true }), circle(o, 0.08, { tone: "muted", fill: "muted" })];
    WINDS.forEach((w, i) => {
      const on = pick === i;
      els.push(vec(at(1.55, w.deg), at(0.3, w.deg), { tone: on ? "a" : "muted", bold: on, thin: !on }));
      els.push(txt(at(1.85, w.deg), w.name, anchorOf(w.deg), { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
    });
    const w = WINDS[pick];
    const readout = w
      ? [`${w.name[0].toLocaleUpperCase("tr-TR")}${w.name.slice(1)}: ${w.from} eser.`, "İmbat, gündüz denizden karaya esen meltemin yöresel adıdır; föhnün ısınması alçalırken sıkışmayla ilgilidir."]
      : ["Bir rüzgâr adına dokun ya da aşağıdan seç.", "Ad, rüzgârın nereye gittiğini değil nereden geldiğini söyler."];
    return { els, readout };
  },
};

const INTERIOR: { name: string; lon: number; lat: number; tone: Tone; lines: string[] }[] = [
  {
    name: "İç Anadolu",
    lon: 33.3,
    lat: 39.3,
    tone: "a",
    lines: ["Kış soğuk, yaz kuraklığı belirgin; birçok yerde en yağışlı mevsim ilkbahar.", "Kırkikindi adı verilen yükselim yağışları bu bağlamda anılır; bozkır mevsimlik yeşerip sararır."],
  },
  {
    name: "Erzurum–Kars yüksekleri",
    lon: 42.2,
    lat: 40.3,
    tone: "c",
    lines: ["Kış uzun ve soğuk, yaz serin; yaz başı yağışları ve çayırlar önem kazanır.", "Bu dağılım bütün Doğu Anadolu'ya istisnasız genellenmez."],
  },
  {
    name: "Güneydoğu Anadolu",
    lon: 39.6,
    lat: 37.6,
    tone: "b",
    lines: ["Yaz çok sıcak ve kurak; yağışın ağırlığı kışta.", "İç Anadolu ile aynı 'karasal' adı taşısa da en yağışlı mevsimi farklıdır."],
  },
];
const interiorFigure: FigureDef = {
  caption:
    "Üç iç alana dokun: en yağışlı mevsim ve yaz koşulu açılır. 'Karasal' adı tek bir aylık grafik çizdirmez; yükselti ve istasyon bağlamı okunmadan genelleme yapılmaz. İşaretler yaklaşık bölge örnekleridir, sınır çizmez.",
  alt: "Türkiye haritasında üç seçilebilir numara: ortada İç Anadolu, kuzeydoğuda Erzurum–Kars yüksekleri, güneydoğuda Güneydoğu Anadolu.",
  picks: INTERIOR.map((r) => ({ label: r.name, title: r.name, detail: [r.lines[1]] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [...turkey()];
    INTERIOR.forEach((r, i) => els.push(pickTag(r.lon, r.lat, String(i + 1), r.tone, i)));
    const r = INTERIOR[pick];
    const legend: Legend = INTERIOR.map((x, i) => ({ code: String(i + 1), label: x.name, tone: x.tone }));
    const readout = r ? [`${r.name}: ${r.lines[0]}`] : ["Bir numaraya dokun ya da aşağıdan bir alan seç.", "Üç iç alanın en yağışlı mevsimi üç farklı yanıt verir."];
    return { els, legend, readout };
  },
};

const RAIN_STEPS = ["Cephe yağışı", "Yamaç yağışı", "Yükselim yağışı"];
const cloud = (x0: number, x1: number, y0: number, y1: number): El => {
  const cx = (x0 + x1) / 2;
  const h = y1 - y0;
  return poly([v(x0, y0), v(x1, y0), v(x1 - 0.1, y0 + h * 0.55), v(cx + (x1 - x0) * 0.25, y1), v(cx - (x1 - x0) * 0.2, y1 - h * 0.1), v(x0 + 0.1, y0 + h * 0.5)], { tone: "muted", fill: "muted", smooth: true });
};
const drops = (xs: number[], top: number, bottom: number): El[] => xs.map((x) => seg(v(x, top), v(x - 0.12, bottom), { tone: "b", dash: true }));
const rainFigure: FigureDef = {
  caption:
    "İleri ile üç yükselme nedenini karşılaştır: cephede ılık hava soğuk havanın üstüne çıkar, yamaçta nemli hava dağa tırmanır, yükselimde ısınan yüzeyin üstündeki hava kalkar. Üçünde de yükselen hava soğuyup yoğuşur. Şemalar ölçekli değildir.",
  alt: "Üç adımlı kesit. Cephede soğuk hava kaması ve üstüne tırmanan ılık hava oku; yamaçta dağa tırmanan nemli hava ve rüzgâr önü yamaçta bulut; yükselimde ısınan yerden dikey yükselen oklar ve kabarık bulut.",
  steps: RAIN_STEPS,
  draw: (_v, step) => {
    const els: El[] = [seg(v(0, 0), v(10, 0), { tone: "muted", thin: true }), ...pad(0, 4.0, 10, -0.5)];
    let readout: string[];
    if (step === 0) {
      els.push(poly([v(4, 0), v(10, 0), v(10, 1.6)], { tone: "c", fill: "c", thin: true }), seg(v(4, 0), v(10, 1.6), { tone: "c", bold: true }));
      els.push(vec(v(0.4, 0.55), v(6.6, 2.2), { tone: "a", bold: true }));
      els.push(cloud(6.9, 9.0, 2.5, 3.3), ...drops([7.4, 7.9, 8.4], 2.4, 1.85));
      els.push(txt(v(8.7, 0.45), "soğuk hava", "c", { small: true, bold: true, tone: "c" }), txt(v(0.3, 0.15), "ılık nemli hava", "e", { small: true, bold: true, tone: "a" }));
      readout = ["Cephe: farklı sıcaklıktaki hava kütleleri karşılaşır; ılık hava soğuk havanın üstüne çıkarken soğur ve yoğuşur.", "Türkiye'de özellikle serin dönemde etkilidir."];
    } else if (step === 1) {
      els.push(poly([v(2, 0), v(5.5, 2.6), v(9, 0)], { tone: "muted", fill: "muted" }));
      els.push(vec(v(0.3, 0.45), v(4.1, 2.05), { tone: "a", bold: true }));
      els.push(cloud(3.3, 5.3, 2.75, 3.5), ...drops([3.7, 4.2], 2.65, 2.0));
      els.push(txt(v(0.2, 0.15), "rüzgâr önü", "e", { small: true, bold: true, tone: "a" }), txt(v(9.15, 0.15), "rüzgâr altı", "e", { small: true, bold: true, tone: "muted" }));
      readout = ["Yamaç: nemli hava dağa çarpıp yamaç boyunca yükselir; rüzgâr önü yamaç yağış alır.", "Dağın ardı yağış gölgesinde daha kuru kalabilir; her gün rüzgârın denizden estiği varsayılmaz."];
    } else {
      els.push(circle(v(1.2, 3.1), 0.35, { tone: "warn", fill: "warn" }));
      els.push(vec(v(3.9, 0.15), v(3.9, 2.25), { tone: "a", bold: true }), vec(v(6.1, 0.15), v(6.1, 2.25), { tone: "a", bold: true }));
      els.push(cloud(3.3, 6.7, 2.5, 3.9), ...drops([4.7, 5.1, 5.5], 2.4, 0.9));
      els.push(txt(v(5, -0.15), "ısınan yüzey", "s", { small: true, bold: true, tone: "warn" }));
      readout = ["Yükselim: Güneş'le ısınan yüzeyin üstündeki hava yükselir, soğur ve sağanak bırakabilir.", "İç Anadolu'nun ilkbahar sağanakları (kırkikindi) bu süreçle anılır."];
    }
    readout.push("Aylık yağış sütunu yalnız mm miktarını verir; hangi sürecin işlediğini ve yağışın kar mı yağmur mu olduğunu göstermez.");
    return { els, readout };
  },
};

/* =====================================================================
 * 029 Dünya'da nüfusun dağılışı
 * ===================================================================== */

const AREAS: { name: string; km2: number; people: number; box: [number, number, number, number] }[] = [
  { name: "A", km2: 4000, people: 200000, box: [0, 2, 4, 0] },
  { name: "C", km2: 1500, people: 150000, box: [4.4, 1.5, 6.4, 0] },
  { name: "B", km2: 500, people: 100000, box: [7.6, 1, 8.6, 0] },
];
const RANK_TONE: Tone[] = ["a", "b", "c"];
const legendFigure: FigureDef = {
  caption:
    "Aynı üç özgün bölge, iki farklı gösterge. Kutu alanları yüzölçümüyle orantılıdır. İleri ile göstergeyi değiştir: toplam nüfusta en üst sınıf A, yoğunlukta B olur. Renk sınıfı hangi ölçüyü gösterdiğini okumadan anlamlandırılmaz.",
  alt: "Alanları 4.000, 1.500 ve 500 km² olan üç dikdörtgen: A, C ve B. Altlarında nüfusları 200.000, 150.000 ve 100.000; yoğunlukları 50, 100 ve 200 kişi/km².",
  steps: ["Toplam nüfus göstergesi", "Yoğunluk göstergesi", "İki göstergeyi birlikte oku"],
  draw: (_v, step) => {
    const dens = (a: (typeof AREAS)[number]) => a.people / a.km2;
    const key = (a: (typeof AREAS)[number]) => (step === 0 ? a.people : dens(a));
    const order = [...AREAS].sort((x, y) => key(y) - key(x)).map((a) => a.name);
    const els: El[] = [];
    for (const a of AREAS) {
      const [x0, y0, x1, y1] = a.box;
      const rank = order.indexOf(a.name);
      const tone: Tone = step === 2 ? "muted" : RANK_TONE[rank];
      els.push(rect(x0, y0, x1, y1, tone, true));
      els.push(txt(v((x0 + x1) / 2, y0 / 2), a.name, "c", { bold: true, tone: "ink" }));
      const cx = (x0 + x1) / 2;
      const lines = [`${fmt(a.km2, 0)} km²`, step === 1 ? `${fmt(dens(a), 0)} kişi/km²` : `${fmt(a.people, 0)} kişi`];
      if (step === 2) lines.push(`${fmt(dens(a), 0)} kişi/km²`);
      lines.forEach((s, k) => els.push(txt(v(cx, -0.2 - k * 0.58), s, "s", { small: true, bold: k > 0, tone: k > 0 ? "ink" : "muted" })));
    }
    const legend: Legend =
      step === 2
        ? []
        : RANK_TONE.map((t, i) => ({ code: String(i + 1), label: `${i + 1}. sınıf: ${order[i]} (${step === 0 ? "kişi sayısı" : "kişi/km²"})`, tone: t }));
    const readout =
      step === 0
        ? ["Toplam nüfus haritası kişi sayısını sıralar: A 200.000 ile en üst sınıf, B 100.000 ile en alt.", "Bu gösterge alanı hesaba katmaz."]
        : step === 1
          ? ["Yoğunluk haritası kişi sayısını alana böler: B 100.000 / 500 = 200 kişi/km² ile en üstte, A 200.000 / 4.000 = 50 ile en altta.", "Aynı yerler, ters sıra: ölçü değişti, insanlar değişmedi."]
          : ["A en kalabalık ama en seyrek; B en az kişiyi barındırıp en yoğun.", "Önce başlık, tarih, gösterge ve alan sınırını oku; sonra rengi yorumla."];
    return { els, legend, readout };
  },
};

const PORT_STEPS = ["Doğal koy", "Liman yatırımı", "Kara ve demir yolu bağlantısı", "İş ve hizmet", "Maden yatağı ve işletme"];
const portFigure: FigureDef = {
  caption:
    "İleri ile özgün bir kıyı kentini kur: korunaklı koy doğal koşuldur; liman, yol ağı, iş ve hizmet beşerî süreçlerdir. Maden yatağı doğal kaynaktır, onu çıkaran işletme ve yol beşerîdir. Şema ölçekli değildir.",
  alt: "Solda deniz ve içeri sokulan bir koy; koyun kıyısında liman kutusu; limandan iç bölgedeki tarım, sanayi ve maden noktalarına giden kesik yollar; limanın yanında küçük kent blokları.",
  steps: PORT_STEPS,
  draw: (_v, step) => {
    const port = v(3.1, 1.8);
    const H1 = v(6.5, 3.0);
    const H2 = v(8.5, 1.6);
    const H3 = v(6.0, 0.4);
    const els: El[] = [
      poly([v(1.8, 3.6), v(1.9, 2.6), v(2.6, 2.2), v(2.6, 1.4), v(1.9, 1.0), v(1.8, 0)], { open: true, tone: "b", smooth: true }),
      txt(v(0.8, 1.8), "deniz", "c", { small: true, tone: "b" }),
      txt(v(2.18, 1.8), "koy", "c", { small: true, bold: true, tone: step === 0 ? "b" : "muted" }),
      ...pad(0, 3.7, 10.4, -0.45),
    ];
    if (step >= 1) {
      els.push(rect(2.6, 2.05, 3.1, 1.55, "c", true));
      els.push(txt(v(3.45, 2.2), "liman", "n", { small: true, bold: true, tone: "c" }));
    }
    if (step >= 2) {
      els.push(seg(port, H1, { tone: "ink", dash: true }), seg(port, H2, { tone: "ink", dash: true }), seg(port, H3, { tone: "ink", dash: true }));
      els.push(circle(H1, 0.12, { tone: "ink", fill: "ink" }), circle(H2, 0.12, { tone: "ink", fill: "ink" }), circle(H3, 0.12, { tone: step >= 4 ? "warn" : "ink", fill: step >= 4 ? "warn" : "ink" }));
      els.push(txt(v(6.5, 3.2), "tarım alanı", "n", { small: true, tone: "muted" }), txt(v(8.7, 1.6), "sanayi", "e", { small: true, tone: "muted" }));
    }
    if (step >= 3) {
      els.push(rect(3.3, 0.6, 3.6, 0.3, "a", true), rect(3.8, 0.5, 4.1, 0.2, "a", true), rect(3.4, 1.05, 3.7, 0.8, "a", true));
      els.push(txt(v(3.7, 0.05), "kent", "s", { small: true, bold: true, tone: "a" }));
    }
    if (step >= 4) els.push(txt(v(6.0, 0.2), "maden", "s", { small: true, bold: true, tone: "warn" }));
    const readout = [
      ["Korunaklı koy doğal bir olanaktır; tek başına kent ya da yoğun nüfus kurmaz."],
      ["Liman bir yatırımdır: doğal koyu ticaret işlevine bağlayan beşerî süreç."],
      ["Limanın hizmet verdiği iç bölge hinterlanddır; yol ve demir yolu bu bağı kurar.", "Bağlantı ve pazar yoksa liman büyümez."],
      ["Taşıma, ticaret, sanayi ve hizmet işleri nüfusu çeker; kent büyür.", "Yoğunluğu yalnız verimli toprağa bağlayan açıklama bu işleri dışarıda bırakır."],
      ["Maden yatağı doğal kaynaktır; onu çıkaran işletme, iş ve yol beşerîdir.", "Kaynak tükenir ya da işler değişirse çekim de değişir; eski merkez sonsuza dek aynı hızla büyümez."],
    ][step];
    return { els, readout };
  },
};

// Hız düşer, nüfus artar: özgün model (başlangıç 1.000 birim).
const RATES = [2.0, 1.6, 1.2, 0.8, 0.4, -0.2];
const POPS = RATES.reduce((acc, r) => [...acc, acc[acc.length - 1] * (1 + r / 100)], [1000]);
const NX = (i: number) => 0.6 + i * 1.5;
const NY = (n: number) => 2.5 + (n - 1000) / 30;
const RY0 = 0.8;
const RS = 0.4;
const rateFigure: FigureDef = {
  caption:
    "Dönem sürgüsünü ilerlet: özgün modelde artış hızı her dönem düşüyor (%2'den %0,4'e), nüfus yine de büyüyor. Hız ancak negatife indiğinde (son dönem) nüfus azalır. Üst grafiğin ekseni 1.000'den başlar; alttaki hız sütunları sıfır çizgisinden ölçülür.",
  alt: "Üstte dönem dönem yükselen ve en sonda hafifçe düşen nüfus noktaları; altta her dönemin artış hızı sütunları: 2, 1,6, 1,2, 0,8, 0,4 ve eksi 0,2 yüzde.",
  param: { label: "Dönem", min: 0, max: RATES.length, step: 1, init: 3 },
  draw: (t) => {
    const els: El[] = [];
    els.push(seg(v(0.3, NY(1000)), v(9.9, NY(1000)), { tone: "muted", thin: true }), seg(v(0.3, RY0), v(9.9, RY0), { tone: "muted", thin: true }));
    for (const n of [1000, 1030, 1060]) els.push(txt(v(0.2, NY(n)), fmt(n, 0), "w", { small: true, tone: "muted", soft: true }));
    for (const r of [0, 2]) els.push(txt(v(0.2, RY0 + r * RS), `%${r}`, "w", { small: true, tone: "muted", soft: true }));
    els.push(txt(v(0.3, NY(1078)), "nüfus (model birim)", "e", { small: true, bold: true, tone: "muted" }));
    els.push(txt(v(0.3, 2.0), "dönem hızı", "e", { small: true, bold: true, tone: "muted" }));
    const shown = POPS.slice(0, t + 1).map((n, i) => v(NX(i), NY(n)));
    if (shown.length > 1) els.push(poly(shown, { open: true, tone: "a", bold: true }));
    shown.forEach((p) => els.push(circle(p, 0.09, { tone: "a", fill: "a" })));
    RATES.forEach((r, i) => {
      const x = NX(i) + 0.75;
      if (i < t) els.push(rect(x - 0.35, RY0 + Math.max(r, 0) * RS, x + 0.35, RY0 + Math.min(r, 0) * RS, r < 0 ? "warn" : "b", true));
      els.push(txt(v(x, 0.35), String(i + 1), "c", { small: true, tone: i < t ? "ink" : "muted" }));
    });
    const readout: string[] = [];
    if (t === 0) readout.push("Başlangıç: 1.000 birim. Sürgüyü ilerlet.");
    else {
      const r = RATES[t - 1];
      readout.push(`${t}. dönem hızı %${r < 0 ? "−" : ""}${fmt(Math.abs(r), 1)}: nüfus ${fmt(POPS[t - 1], 1)} → ${fmt(POPS[t], 1)} birim.`);
      if (r < 0) readout.push("Hız negatife indi: nüfus bu dönemde ilk kez azaldı.");
      else if (t > 1) readout.push(`Hız düştü (%${fmt(RATES[t - 2], 1)} → %${fmt(r, 1)}), nüfus yine arttı: +${fmt(POPS[t] - POPS[t - 1], 1)} birim.`);
      else readout.push(`İlk dönemde +${fmt(POPS[1] - POPS[0], 1)} birim.`);
    }
    readout.push("Sayılar özgün modeldir; gerçek bir ülkenin ya da dünyanın sayımı değildir.");
    return { els, readout };
  },
};

// Yükselti ve eğim: ekvatoral özgün kesit, ideal sıcaklık modeli.
const ELEV: V[] = [v(0, 200), v(2.5, 250), v(3.0, 1300), v(3.5, 2500), v(5.5, 2550), v(7.4, 5000), v(8.4, 1900), v(9.2, 1850), v(10, 2600)];
const EY = 1 / 1250;
const T0 = 27;
const tempAt = (m: number) => T0 - m / 200;
const SPOTS: { code: string; name: string; x: number; m: number; at: "n" | "w"; lines: string[] }[] = [
  { code: "A", name: "Alçak havza", x: 1.2, m: 225, at: "n", lines: ["Sıcak ve çok nemli; gür orman ve ulaşım güçlüğü seyrekliğe katılabilir.", "Amazon ve Kongo iç havzalarının bazı kesimleri örnektir."] },
  { code: "B", name: "Sarp yamaç", x: 3.0, m: 1300, at: "w", lines: ["Eğim tarım alanını ve yolu daraltır.", "Aynı yükseltideki düz bir yüzey farklı sonuç verebilir."] },
  { code: "C", name: "Yüksek düzlük", x: 4.5, m: 2525, at: "n", lines: ["Ekvatora yakın bazı yüksek düzlükler çevredeki sıcak-nemli alçaklardan daha elverişli olabilir.", "Bu yüzden 'yükseldikçe nüfus her yerde azalır' denmez."] },
  { code: "D", name: "Yüksek zirve", x: 7.4, m: 5000, at: "n", lines: ["Düşük sıcaklık, eğim ve erişim güçlüğü birlikte seyrekliğe yol açar."] },
  { code: "E", name: "Dağ içi vadi tabanı", x: 8.8, m: 1875, at: "n", lines: ["Vadi tabanında su, yol ve düz alan yerleşmeyi toplayabilir.", "Dağ adı tek başına her noktanın nüfusunu vermez."] },
];
const reliefFigure: FigureDef = {
  caption:
    "Ekvator yakınında özgün bir kesit (düşey abartılı, ölçekli değil). Bir harfe dokun: ideal modelde deniz düzeyi 27 °C ve her 200 m'de 1 °C azalma ile o noktanın sıcaklığı ve nüfusa etkisi açılır. Yükselti tek yasa değildir: eğim, su, yol ve iklim birlikte okunur.",
  alt: "Soldan sağa: alçak düz havza, dik yamaç, geniş yüksek düzlük, sivri yüksek zirve, dağ içinde dar vadi tabanı ve yeniden yükselen arazi. Beş noktada A'dan E'ye harfler.",
  picks: SPOTS.map((s) => ({ label: `${s.code} · ${s.name}`, title: s.name, detail: s.lines })),
  draw: (_v, _s, pick = -1) => {
    const prof = ELEV.map(([x, m]) => v(x, m * EY));
    const els: El[] = [poly([...prof, v(10, 0), v(0, 0)], { tone: "muted", fill: "muted", thin: true }), poly(prof, { open: true, tone: "ink" })];
    SPOTS.forEach((s, i) => {
      const p = v(s.x, s.m * EY);
      els.push(circle(p, 0.07, { tone: pick === i ? "a" : "ink", fill: pick === i ? "a" : "ink" }));
      els.push(txt(s.at === "n" ? v(s.x, s.m * EY + 0.22) : v(s.x - 0.2, s.m * EY), s.code, s.at, { small: true, bold: true, tone: pick === i ? "a" : "ink", pick: i }));
    });
    const s = SPOTS[pick];
    const readout = s
      ? [`${s.code} · ${s.name}: ${fmt(s.m, 0)} m, ideal model sıcaklığı ${fmt(tempAt(s.m), 1)} °C.`]
      : ["Bir harfe dokun ya da aşağıdan bir nokta seç.", "Model sıcaklığı yalnız bu ideal varsayıma aittir; gerçek istasyon ölçümü değildir."];
    return { els, readout };
  },
};

/* =====================================================================
 * 031 Türkiye'de nüfus
 * ===================================================================== */

const YX = (y: number) => (y - 1820) / 21;
const CENSUS_STEPS = ["1831", "1927", "1935–2000", "2007 ve sonrası: ADNKS"];
const censusFigure: FigureDef = {
  caption:
    "Yıl ekseni ölçeklidir (1820–2030). İleri ile sayım dönemlerini aç: 1831 Osmanlı sayımı, 1927 ilk genel sayım, 1935–1990 beş yılda bir, 2000 genel sayımı ve 2007'den itibaren adrese dayalı kayıt. Tarihler TÜİK ve ders kaynağının verdiği tarihlerdir.",
  alt: "Yatay yıl ekseni. 1831, 1927, 1935'ten 1990'a beş yılda bir çentikler, 2000 ve 2007 işaretleri; yılların üstünde kısa etiketler.",
  steps: CENSUS_STEPS,
  draw: (_v, step) => {
    const els: El[] = [seg(v(0, 0), v(10, 0), { tone: "muted" }), ...pad(0, 2.3, 10, -0.5)];
    for (const y of [1850, 1900, 1950, 2000]) {
      els.push(seg(v(YX(y), 0), v(YX(y), -0.1), { tone: "muted", thin: true }));
      els.push(txt(v(YX(y), -0.15), String(y), "s", { small: true, tone: "muted", soft: true }));
    }
    els.push(circle(v(YX(1831), 0), 0.08, { tone: "c", fill: "c" }), txt(v(YX(1831), 0.2), "1831", "n", { small: true, bold: true, tone: "c" }));
    if (step >= 1) {
      els.push(seg(v(YX(1927), 0.1), v(YX(1927), 1.15), { tone: "a", thin: true }), circle(v(YX(1927), 0), 0.08, { tone: "a", fill: "a" }));
      els.push(txt(v(YX(1927), 1.25), "1927", "n", { small: true, bold: true, tone: "a" }));
    }
    if (step >= 2) {
      for (let y = 1935; y <= 1990; y += 5) els.push(seg(v(YX(y), 0), v(YX(y), 0.25), { tone: "b" }));
      els.push(txt(v((YX(1935) + YX(1990)) / 2, 0.42), "beş yılda bir", "n", { small: true, bold: true, tone: "b" }));
      els.push(seg(v(YX(2000), 0.1), v(YX(2000), 1.15), { tone: "b", thin: true }), circle(v(YX(2000), 0), 0.08, { tone: "b", fill: "b" }));
      els.push(txt(v(YX(2000) - 0.1, 1.3), "2000", "w", { small: true, bold: true, tone: "b" }));
    }
    if (step >= 3) {
      els.push(seg(v(YX(2007), 0.1), v(YX(2007), 2.0), { tone: "warn", thin: true }), circle(v(YX(2007), 0), 0.08, { tone: "warn", fill: "warn" }));
      els.push(txt(v(YX(2007) - 0.12, 2.0), "2007 ADNKS", "w", { small: true, bold: true, tone: "warn" }));
    }
    const readout = [
      ["1831 sayımı askerlik ve vergi amaçlıydı; bütün yaş ve cinsiyetleri bugünkü gibi kapsamaz.", "Bu yüzden modern Türkiye'nin aynı sınırdaki nüfusu gibi okunmaz."],
      ["1927: Cumhuriyet'in ilk genel nüfus sayımı; ders kaynağı yaklaşık 13,6 milyon kişi verir."],
      [`1935–1990 arasında beş yılda bir genel sayım (${(1990 - 1935) / 5 + 1} sayım), ardından 2000 genel sayımı.`, "Yöntem ve sınır değişimleri karşılaştırmada ayrıca yazılır."],
      ["2007'den itibaren Adrese Dayalı Nüfus Kayıt Sistemi: sonuç 31 Aralık referanslıdır.", "İlk sonuçlar 21 Ocak 2008'de açıklandı: veri yılı 2007, açıklama yılı 2008 (TÜİK yöntem açıklaması)."],
    ][step];
    return { els, readout };
  },
};

const AGE_ROWS: { year: string; src: string; parts: number[]; median: number }[] = [
  { year: "2023", src: "MEBİ ders kitabı örneği", parts: [21.4, 68.3, 10.2], median: 34 },
  { year: "2025", src: "TÜİK ADNKS 2025, 9 Şubat 2026 bülteni", parts: [20.4, 68.5, 11.1], median: 34.9 },
];
/** İşaretli yüzde puanı: +0,9 ya da −1 (eksi işareti U+2212). */
const signed = (x: number) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${fmt(Math.abs(x), 1)}`;
const AGE_LABELS = ["0–14", "15–64", "65+"];
const AGE_TONES: Tone[] = ["a", "b", "c"];
const BX0 = 1.3;
const BW = 10 - BX0;
/** Yüzde payları yığılmış çubuk; parça merkezlerinin x değerlerini döndürür. */
function stackBar(els: El[], y: number, parts: number[], tones: Tone[], total = 100): number[] {
  let acc = 0;
  return parts.map((p, i) => {
    const x0 = BX0 + (acc / total) * BW;
    acc += p;
    const x1 = BX0 + (acc / total) * BW;
    els.push(rect(x0, y + 0.25, x1, y - 0.25, tones[i], true));
    return (x0 + x1) / 2;
  });
}
const ageFigure: FigureDef = {
  caption:
    "Türkiye'nin yaş payları iki tarihli kaynakla: 2023 ders kitabı örneği (MEBİ) ve TÜİK'in 31 Aralık 2025 tarihli ADNKS sonuçları (9 Şubat 2026 bülteni). İleri ile ikinci yılı ve yüzde puanı farkını aç. Pay değişimi tek başına kişi sayısının değişimini vermez.",
  alt: "İki yatay yüzde çubuğu. 2023: 0–14 yaş yüzde 21,4, 15–64 yaş yüzde 68,3, 65 ve üstü yüzde 10,2. 2025: yüzde 20,4, 68,5 ve 11,1.",
  steps: ["2023 (MEBİ)", "2025 (TÜİK)", "Yüzde puanı farkı"],
  draw: (_v, step) => {
    const els: El[] = pad(0, 3.3, 10, -0.9);
    const rows = AGE_ROWS.slice(0, step === 0 ? 1 : 2);
    let centers: number[] = [];
    rows.forEach((r, k) => {
      const y = 2.4 - k * 1.45;
      els.push(txt(v(0, y), r.year, "e", { small: true, bold: true }));
      centers = stackBar(els, y, r.parts, AGE_TONES);
      centers.forEach((cx, i) => els.push(txt(v(cx, y - 0.35), `%${fmt(r.parts[i], 1)}`, "s", { small: true, tone: "ink" })));
    });
    centers.forEach((cx, i) => els.push(txt(v(cx, 2.9), AGE_LABELS[i], "n", { small: true, bold: true, tone: AGE_TONES[i] })));
    if (step === 2) {
      const d = AGE_ROWS[1].parts.map((p, i) => p - AGE_ROWS[0].parts[i]);
      els.push(txt(v(0, -0.6), "fark", "e", { small: true, bold: true, tone: "muted" }));
      centers.forEach((cx, i) => els.push(txt(v(cx, -0.6), signed(d[i]), "c", { small: true, bold: true, tone: AGE_TONES[i] })));
    }
    const sum = (r: (typeof AGE_ROWS)[number]) => r.parts.reduce((s, p) => s + p, 0);
    const readout =
      step === 0
        ? [`2023 (${AGE_ROWS[0].src}): toplam %${fmt(sum(AGE_ROWS[0]), 1)}; yuvarlama eksik binde biri yeni bir yaş grubu yapmaz. Ortanca yaş 34 (2007'de 28,3).`]
        : step === 1
          ? [`2025 (${AGE_ROWS[1].src}): toplam %${fmt(sum(AGE_ROWS[1]), 1)}; ortanca yaş 34,9.`, "Ortanca, yaşlar sıralandığında ortayı bölen değerdir; yaş ortalaması değildir."]
          : [
              `İki yıl arasında 0–14 payı ${signed(AGE_ROWS[1].parts[0] - AGE_ROWS[0].parts[0])}, 15–64 payı ${signed(AGE_ROWS[1].parts[1] - AGE_ROWS[0].parts[1])}, 65+ payı ${signed(AGE_ROWS[1].parts[2] - AGE_ROWS[0].parts[2])} yüzde puanı değişti.`,
              "Kişi sayısının kaç değiştiğini bulmak için her yılın toplam nüfusu gerekir; yüzde puanı farkı oransal yüzde değişimi de değildir.",
            ];
    return { els, readout };
  },
};

const JOBS = [15.8, 27.7, 56.5];
const JOB_LABELS = ["tarım", "sanayi", "hizmet"];
const POP2023 = 85372377;
const denominatorFigure: FigureDef = {
  caption:
    "Payda önce: 2022 çalışan dağılımı (MEBİ) çalışanların payıdır. İleri ile aynı yüzdenin yanlış paydaya, 2023 toplam nüfusuna (85.372.377, MEBİ) uygulandığı hatayı ve okuryazarlık oranının kendi paydasını gör. Yüzde yalnız kendi paydasıyla okunur.",
  alt: "Üstte çalışanların yüzde çubuğu: tarım 15,8, sanayi 27,7, hizmet 56,5. Sonraki adımda toplam nüfus çubuğunda yanlış payla taranan kesik bir dilim; son adımda yüzde 97,6'lık okuryazarlık çubuğu.",
  steps: ["Doğru payda: çalışanlar", "Yanlış payda: toplam nüfus", "Okuryazarlığın paydası"],
  draw: (_v, step) => {
    const els: El[] = pad(0, 3.3, 10, 0.3);
    els.push(txt(v(0, 2.4), "2022", "e", { small: true, bold: true }));
    const c = stackBar(els, 2.4, JOBS, ["c", "b", "a"]);
    c.forEach((cx, i) => {
      els.push(txt(v(cx, 2.9), JOB_LABELS[i], "n", { small: true, bold: true, tone: (["c", "b", "a"] as Tone[])[i] }));
      els.push(txt(v(cx, 2.05), `%${fmt(JOBS[i], 1)}`, "s", { small: true }));
    });
    let readout: string[];
    if (step === 0) {
      readout = ["Payda çalışanlardır: her 100 çalışandan yaklaşık 16'sı tarımda, 28'i sanayide, 56'sı hizmette (2022, MEBİ).", "Bu paylardan gelir ya da üretim payı çıkarılmaz."];
    } else if (step === 1) {
      const wrong = POP2023 * (JOBS[0] / 100);
      els.push(txt(v(0, 0.95), "2023", "e", { small: true, bold: true, tone: "muted" }));
      els.push(rect(BX0, 1.2, 10, 0.7, "muted", true), rect(BX0, 1.2, BX0 + (JOBS[0] / 100) * BW, 0.7, "warn", false, true));
      els.push(txt(v(BX0, 0.55), `toplam nüfus ${fmt(POP2023, 0)}`, "se", { small: true, tone: "muted" }));
      readout = [
        `85.372.377 × 0,158 ≈ ${fmt(wrong / 1e6, 2)} milyon: bu tarımda çalışan sayısı değildir.`,
        "Toplam nüfus çocukları, öğrencileri, emeklileri ve iş arayanları da içerir; yıl da farklıdır (2022 payı, 2023 nüfusu).",
      ];
    } else {
      els.push(txt(v(0, 0.95), "2023", "e", { small: true, bold: true }));
      els.push(rect(BX0, 1.2, BX0 + 0.976 * BW, 0.7, "b", true), rect(BX0 + 0.976 * BW, 1.2, 10, 0.7, "muted", false));
      els.push(txt(v(BX0, 0.55), "okuryazarlık %97,6", "se", { small: true, bold: true, tone: "b" }));
      readout = ["Okuryazarlık oranının paydası, göstergenin tanımladığı yaşın üstündeki nüfustur; bebekler paydaya girmez.", "Okuryazarlık, üniversite mezuniyeti ya da bütün becerilerle aynı gösterge değildir."];
    }
    return { els, readout };
  },
};

const SPARSE: { step: number; name: string; lon: number; lat: number }[] = [
  { step: 0, name: "Yıldız Dağları", lon: 27.5, lat: 41.55 },
  { step: 0, name: "Biga iç kesimi", lon: 27.2, lat: 39.95 },
  { step: 0, name: "Menteşe", lon: 28.9, lat: 37.35 },
  { step: 0, name: "Taşeli", lon: 33.1, lat: 36.8 },
  { step: 1, name: "Tuz Gölü çevresi", lon: 33.4, lat: 38.75 },
  { step: 2, name: "Hakkâri'nin yüksek kesimleri", lon: 43.75, lat: 37.55 },
  { step: 2, name: "Erzurum–Kars yüksekleri", lon: 42.2, lat: 40.2 },
  { step: 3, name: "Sinop–Kastamonu iç kesimi", lon: 33.9, lat: 41.3 },
];
const DENSE: { name: string; lon: number; lat: number }[] = [
  { name: "İstanbul–Kocaeli: sanayi, ticaret, ulaşım", lon: 30.4, lat: 40.75 },
  { name: "Bursa: sanayi", lon: 29.2, lat: 40.05 },
  { name: "İzmir–Manisa: tarım, sanayi, bağlantı", lon: 27.6, lat: 38.55 },
  { name: "Ankara: yönetim ve hizmet", lon: 32.85, lat: 39.93 },
  { name: "Adana–Mersin: ova, sanayi, liman", lon: 35.2, lat: 37.15 },
  { name: "Gaziantep: sanayi ve ulaşım", lon: 37.38, lat: 37.07 },
  { name: "Antalya: tarım, turizm, hizmet", lon: 30.7, lat: 37.25 },
];
const SPARSE_STEPS = ["Engebe ve ulaşım", "Kuraklık ve toprak", "Yükselti, soğuk ve erişim", "Dağlık iç kesim", "Yoğun merkezlerle karşılaştır"];
const SPARSE_TONES: Tone[] = ["a", "warn", "c", "a"];
const sparseFigure: FigureDef = {
  caption:
    "İleri ile seyrek alanları nedenine göre aç: engebe ve ulaşım, kuraklık ve toprak, yükselti ve soğuk, dağlık iç kesim. Son adımda yoğun merkezler gelir. Aynı seyrek sonucun nedenleri farklıdır. İşaretler yaklaşık bölge örnekleridir, harita ölçekli değildir.",
  alt: "Türkiye haritasında her adımda numaralı halkalar: Trakya, Biga, Menteşe ve Taşeli; Tuz Gölü çevresi; Hakkâri ve Erzurum–Kars; Sinop–Kastamonu iç kesimi; son adımda İstanbul–Kocaeli, Bursa, İzmir, Ankara, Adana–Mersin, Gaziantep ve Antalya.",
  steps: SPARSE_STEPS,
  draw: (_v, step) => {
    const els: El[] = [...turkey()];
    const legend: Legend = [];
    if (step < 4) {
      let n = 0;
      for (const s of SPARSE) {
        if (s.step === step) {
          n++;
          els.push(...token(s.lon, s.lat, String(n), SPARSE_TONES[step]));
          legend.push({ code: String(n), label: s.name, tone: SPARSE_TONES[step] });
        } else els.push(faint(s.lon, s.lat));
      }
    } else {
      for (const s of SPARSE) els.push(faint(s.lon, s.lat));
      DENSE.forEach((d, i) => {
        els.push(...token(d.lon, d.lat, String(i + 1), "b"));
        legend.push({ code: String(i + 1), label: d.name, tone: "b" });
      });
    }
    const readout = [
      ["Engebe, dar tarım alanı ve zor ulaşım nüfusu seyrek tutar.", "İl ortalaması vadi ile sarp yamaç arasındaki farkı gizleyebilir."],
      ["Tuz Gölü çevresinde kuraklık ve elverişsiz topraklar belirleyicidir.", "Bu alanı yağışlı ve engebeli bir yer gibi açıklamak verilen konuma uymaz."],
      ["Yüksek ve soğuk alanlarda üretim mevsimi kısalır, erişim güçleşir."],
      ["Kıyı kentleri yoğun olsa da hemen gerideki dağlık iç kesim seyrek kalabilir."],
      ["Yoğun merkezlerde sanayi, hizmet, yönetim, ulaşım, verimli ova ve turizm farklı oranlarda etkilidir.", "Bütün kıyının ya da bütün batının aynı yoğunlukta olduğu sonucu çıkmaz."],
    ][step];
    return { els, legend, readout };
  },
};

export const geographyFigures066Sheets: Record<string, Record<string, FigureDef>> = {
  "turkiye-yer-sekilleri": {
    "Ortalama ile tek nokta aynı değil": averageFigure,
    "Dağların kökenini yapıyla ayır": originFigure,
    "Ovada alçaklık çevresine göredir": plainFigure,
    "Plato yalnız yüksek düz tabla değildir": plateauFigure,
  },
  "turkiye-iklimi": {
    "Orta kuşak bir başlangıç koşuludur": latitudeFigure,
    "Hava kütleleri, basınç merkezleri ve yerel rüzgârlar": roseFigure,
    "İç alanların tek bir karasal kalıbı yoktur": interiorFigure,
    "Yağış süreci, kuraklık ve grafiğin sınırı": rainFigure,
  },
  "dunya-nufus-dagilisi": {
    "Bir harita hangi soruyu yanıtlar?": legendFigure,
    "Sanayi, hizmet ve bağlantı ağları": portFigure,
    "Yakın dönem miktarı ve artış hızını ayır": rateFigure,
    "Yükseklik ve eğimi tek yasa sanma": reliefFigure,
  },
  "turkiye-nufusu": {
    "Sayımın amacı ve kapsamı değişir": censusFigure,
    "Yaş yapısı ve ortanca yaş": ageFigure,
    "İstihdam ve eğitimde payda önemlidir": denominatorFigure,
    "Seyrek alanların farklı nedenleri": sparseFigure,
  },
};
