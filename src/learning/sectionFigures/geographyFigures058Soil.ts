import { turkeyRings } from "../geo/turkeyRings";
import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Coğrafya · Topraklar ve bitki örtüsü, dünya ve Türkiye (Forge058).
 * Profil ve kesitler özgün, ölçekli olmayan öğretim şemalarıdır; katman
 * kalınlıkları ve renkleri temsilîdir. Türkiye haritası gerçek sınırdır
 * (Natural Earth), örnek yer işaretleri yaklaşıktır. Yağış dizileri: A her
 * ay 50 mm (bölüm metni), B toplamı yine 600 mm olan özgün temsilî yaz
 * kurak dizidir. 1.200 ve 2.200 m bölümdeki model duraklarıdır.
 */

const pad = (a: V, b: V): El[] => [txt(a, " ", "c"), txt(b, " ", "c")];
const wavy = (x0: number, x1: number, y: number, amp = 0.06, n = 10): V[] =>
  Array.from({ length: n + 1 }, (_, i) => v(x0 + ((x1 - x0) * i) / n, y + Math.sin(i * 1.7) * amp));

/* ---------------- Dünya'da topraklar ---------------- */

type Hz = { code: string; h: number; tone: Tone; name: string; text: string };
const HORIZONS: Hz[] = [
  { code: "O", h: 0.4, tone: "c", name: "O katı", text: "Organik örtü; her yerde aynı kalınlıkta değildir, bazı profillerde seçilemez." },
  { code: "A", h: 0.9, tone: "ink", name: "A katı", text: "Organik katkıyla mineral malzemenin karıştığı üst kat." },
  { code: "E", h: 0.6, tone: "muted", name: "E katı", text: "Yıkanmanın belirgin olduğu kat; her toprakta zorunlu değildir." },
  { code: "B", h: 1.0, tone: "warn", name: "B katı", text: "Alt toprak: birikim ya da yerinde dönüşüm özellikleri (kil, demir bileşikleri, kireç…)." },
  { code: "C", h: 1.0, tone: "muted", name: "C katı", text: "Daha az değişmiş ana malzeme." },
  { code: "R", h: 0.7, tone: "ink", name: "R (sağlam kaya)", text: "Sağlam kaya; okul şemalarının D dediği alt kaya bağlamı ayrıca açıklanır." },
];
const horizons: FigureDef = {
  caption:
    "Profili yukarıdan aşağı oku: O organik örtü, A üst kat, E yıkanma katı (her toprakta yok), B birikim ya da dönüşüm, C az değişmiş ana malzeme, R sağlam kaya. Bir kata tıkla. Harfler bütün toprakların aynı sayıda ve kalınlıkta katı olduğu anlamına gelmez; kalınlıklar temsilîdir.",
  alt: "Dikey toprak kesiti: yukarıdan aşağı O, A, E, B, C ve R katları dalgalı sınırlarla ayrılmış; her katın solunda harfi yazıyor.",
  picks: HORIZONS.map((h) => ({ label: h.code, title: h.name, detail: [h.text] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    let y = 0;
    const tops: number[] = [];
    for (let i = HORIZONS.length - 1; i >= 0; i--) {
      tops[i] = y + HORIZONS[i].h;
      y = tops[i];
    }
    HORIZONS.forEach((hz, i) => {
      const top = tops[i];
      const bot = top - hz.h;
      const upper = i === 0 ? [v(0, top), v(3, top)] : wavy(0, 3, top, 0.06);
      const lower = i === HORIZONS.length - 1 ? [v(3, bot), v(0, bot)] : wavy(0, 3, bot, 0.06).reverse();
      const on = pick === i;
      els.push(poly([...upper, ...lower], { tone: on ? "a" : hz.tone, fill: hz.tone, bare: !on, bold: on }));
      if (i > 0) els.push(poly(wavy(0, 3, top, 0.06), { open: true, thin: true, tone: "muted" }));
      els.push(txt(v(-0.2, (top + bot) / 2), hz.code, "w", { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
    });
    els.push(seg(v(0, 0), v(0, y), { thin: true }), seg(v(3, 0), v(3, y), { thin: true }));
    els.push(txt(v(3.2, y - 0.2), "yüzey", "e", { small: true, tone: "muted" }));
    els.push(...pad(v(-1.4, y + 0.3), v(4.8, -0.3)));
    const sel = pick >= 0 ? `${HORIZONS[pick].name}: ${HORIZONS[pick].text}` : "Bir kata tıkla ya da aşağıdan seç.";
    return { els, readout: [sel, "Kesitteki renk farkı tek başına bütün kimyasal içeriği vermez."] };
  },
};

const LEACH = [
  { name: "Nemli koşul", depth: 2.6, what: "B'de kil ve demir bileşikleri", note: "Süzülen su çözünmüş maddeleri ve ince parçacıkları üst kattan aşağı taşır; kaybın olduğu kat ile birikimin olduğu kat farklıdır." },
  { name: "Kurakça koşul", depth: 1.3, what: "sığda kireç ya da tuz", note: "Sınırlı yıkanma ve uygun ana malzemeyle kireç ya da tuz birikimi gelişebilir; kireçli ana kaya üst katın kireççe zengin kalacağını garanti etmez." },
];
const leaching: FigureDef = {
  caption:
    "Yıkanma ve birikim bağlantılı süreçlerdir: süzülen su bir katta madde kaybettirir, başka bir katta bırakabilir. Adımlarda suyun ulaştığı derinlik ve birikimin yeri nitel olarak karşılaştırılır (ölçekli değil, sayı yok).",
  alt: "Toprak sütunu; yukarıdan aşağı inen mavi süzülme okları. Nemli adımda oklar derine iner ve alt katta birikim şeridi oluşur; kurakça adımda oklar kısa kalır ve birikim şeridi daha sığdadır.",
  steps: LEACH.map((l) => l.name),
  draw: (_v, step) => {
    const l = LEACH[step];
    const top = 3.6;
    const els: El[] = [poly([v(0, 0), v(3, 0), v(3, top), v(0, top)], { tone: "muted", fill: "muted", thin: true })];
    const accTop = top - l.depth;
    els.push(poly([v(0, accTop - 0.5), v(3, accTop - 0.5), v(3, accTop), v(0, accTop)], { tone: "warn", fill: "warn", bare: true }));
    for (const x of [0.6, 1.5, 2.4]) els.push(vec(v(x, top - 0.15), v(x, accTop + 0.05), { tone: "b" }));
    els.push(txt(v(3.2, accTop - 0.25), `birikim: ${l.what}`, "e", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(3.2, top - 0.3), "süzülen su", "e", { small: true, tone: "b" }), txt(v(3.2, (top + accTop) / 2), "madde kaybı (yıkanma)", "e", { small: true, tone: "muted" }));
    els.push(...pad(v(-0.3, top + 0.3), v(9.6, -0.3)));
    return { els, readout: [l.note, "B katındaki bütün maddeler mutlaka kireç değildir."] };
  },
};

const catena: FigureDef = {
  caption:
    "Yer şekli toprağı etkiler: dik yamaçta aşınma biriken malzemeyi uzaklaştırır ve profil ince kalır; eteğe ve düz tabana taşınan malzeme birikir, düz alanda suya doygunluk farklılaşabilir. Kalınlıktan kesin yaş hesaplanmaz. Şematik kesit, düşey ölçek abartılı.",
  alt: "Tepe, dik yamaç ve düz taban kesiti; toprak örtüsü tepede orta, dik yamaçta ince, tabanda kalın. Yamaç boyunca aşağı oklar malzeme taşınmasını gösteriyor.",
  draw: () => {
    const surf: V[] = [v(-5, 3), v(-3, 3), v(-1, 1.0), v(1, 0.5), v(5, 0.5)];
    const soilBase: V[] = [v(5, -0.6), v(1, -0.5), v(-1, 0.8), v(-3, 2.5), v(-5, 2.5)];
    const els: El[] = [poly([...surf, ...soilBase], { tone: "warn", fill: "warn", thin: true })];
    els.push(poly([...soilBase, v(-5, -1.2), v(5, -1.2)], { tone: "muted", fill: "muted", thin: true }));
    els.push(vec(v(-2.6, 3.05), v(-1.2, 1.45), { tone: "a", bold: true }));
    els.push(txt(v(-4, 3.35), "tepe", "n", { small: true, tone: "muted" }), txt(v(-1.6, 2.45), "dik yamaç: aşınma, ince", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(3, 0.85), "düz taban: birikim, kalın", "n", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(3, -0.95), "ana malzeme", "c", { small: true, tone: "muted" }));
    els.push(...pad(v(-5.3, 3.9), v(5.3, -1.5)));
    return { els, readout: ["İklim, canlılar, ana malzeme, yer şekli ve zaman birlikte etkiler; bağımsız puanlar gibi toplanmaz.", "Eski bir yüzey uzun gelişim süresine sahip olabilir, ama yeniden aşınma profili gençleştirebilir."] };
  },
};

type Prof = { name: string; layers: { code: string; h: number; tone: Tone; note: string }[]; read: string };
const PROFILES: Prof[] = [
  {
    name: "Podzollaşma örneği",
    layers: [
      { code: "O", h: 0.4, tone: "c", note: "ince organik örtü" },
      { code: "E", h: 0.8, tone: "muted", note: "açık renkli yıkanma katı" },
      { code: "B", h: 0.9, tone: "warn", note: "birikim katı" },
      { code: "C", h: 1.0, tone: "muted", note: "ana malzeme" },
    ],
    read: "Serin-nemli orman ve uygun ana malzemede belirgin yıkanma katı; her iğne yapraklı ormanın altında aynı profil gelişmez.",
  },
  {
    name: "Çernozyom örneği",
    layers: [
      { code: "A", h: 1.6, tone: "ink", note: "kalın, koyu, humuslu üst kat" },
      { code: "B", h: 0.6, tone: "warn", note: "alt toprak" },
      { code: "C", h: 0.9, tone: "muted", note: "ana malzeme" },
    ],
    read: "Çayır kökleriyle organik madde katkısı koyu üst katı destekler; koyu renkli her örnek çernozyom değildir.",
  },
];
const podzol: FigureDef = {
  caption:
    "Serin orman ve çayır örneklerini profil üzerinden kıyasla: podzollaşmada açık renkli yıkanma katı (E), çernozyomda kalın koyu humuslu üst kat (A) öne çıkar. Katlar harf ve açıklamayla da yazıldı; renk tek başına teşhis değildir. Kalınlıklar temsilîdir.",
  alt: "Adım 1: O, E, B, C katlarından oluşan profil, E katı belirgin. Adım 2: kalın A, B ve C katlarından oluşan profil.",
  steps: PROFILES.map((p) => p.name),
  draw: (_v, step) => {
    const p = PROFILES[step];
    const els: El[] = [];
    let y = p.layers.reduce((a, l) => a + l.h, 0);
    const total = y;
    for (const l of p.layers) {
      const bot = y - l.h;
      els.push(poly([v(0, y), v(2.4, y), v(2.4, bot), v(0, bot)], { tone: l.tone, fill: l.tone, thin: true }));
      els.push(txt(v(1.2, (y + bot) / 2), l.code, "c", { small: true, bold: true }), txt(v(2.6, (y + bot) / 2), l.note, "e", { small: true, tone: l.tone === "warn" ? "warn" : "ink" }));
      y = bot;
    }
    els.push(...pad(v(-0.3, total + 0.3), v(8.4, -0.3)));
    return { els, readout: [p.read, "Yetişme süresi, su, eğim ve yönetim verilmeden kesin ürün miktarı bulunmaz."] };
  },
};

/* ---------------- Türkiye'de topraklar ---------------- */

const ZONAL = [
  { name: "Kahverengi orman", where: "Karadeniz'e açık nemli yamaçlar", layers: [["A", 0.7, "ink"], ["B", 1.1, "warn"], ["C", 0.8, "muted"]] as [string, number, Tone][], note: "Orman örtüsü ve yıkanma önemlidir; aynı bölgede dik yamaç ve akarsu tabanı farklı profiller taşır." },
  { name: "Terra rossa", where: "Akdeniz iklimli kalkerli çevre", layers: [["A", 0.5, "warn"], ["B", 0.9, "warn"], ["R", 0.8, "muted"]] as [string, number, Tone][], note: "Demir bileşikleri kırmızı rengi destekler; renk her kırmızı toprağı aynı gruba sokmaz. Sığ toprak ve yaz kuraklığı tarımı sınırlayabilir." },
  { name: "Kahverengi bozkır", where: "İç kesimlerin yarı kurak bozkırı", layers: [["A", 0.6, "c"], ["B", 0.7, "muted"], ["Bk", 0.4, "ink"], ["C", 0.8, "muted"]] as [string, number, Tone][], note: "Yıkanmanın sınırlı olduğu ortamda alt katta kireç birikimi (Bk) görülebilir; bütün İç Anadolu aynı toprak değildir." },
  { name: "Çernozyom", where: "Kuzeydoğunun yüksek çayırları", layers: [["A", 1.3, "ink"], ["B", 0.6, "warn"], ["C", 0.7, "muted"]] as [string, number, Tone][], note: "Köklerin organik katkısı ve serin koşullar koyu üst katı destekler; her doğu ilinin aynı toprağa sahip olduğu anlamına gelmez." },
];
const zonal: FigureDef = {
  caption:
    "Türkiye'de iklim ve örtü kısa mesafede değişir; toprak da mozaik oluşturur. Adımlarda okul örneği dört profil: kahverengi orman, terra rossa, kahverengi bozkır, çernozyom. Bk alt katta kireç birikimini gösterir. Kalınlık ve renkler temsilîdir; teşhis için iklim, örtü ve yer şekli kanıtı birlikte kullanılır.",
  alt: "Tek bir dikey toprak profili; adımlarda katların sayısı, kalınlığı ve adı değişiyor: orman toprağı, terra rossa (altta kalker), bozkır toprağı (Bk kireç birikimi), çernozyom (kalın koyu A).",
  steps: ZONAL.map((z) => z.name),
  draw: (_v, step) => {
    const z = ZONAL[step];
    const els: El[] = [];
    let y = z.layers.reduce((a, l) => a + l[1], 0);
    const total = y;
    for (const [code, h, tone] of z.layers) {
      const bot = y - h;
      els.push(poly([v(0, y), v(2.4, y), v(2.4, bot), v(0, bot)], { tone, fill: tone, thin: true }));
      els.push(txt(v(1.2, (y + bot) / 2), code === "R" ? "R (kalker)" : code, "c", { small: true, bold: true }));
      y = bot;
    }
    els.push(txt(v(2.7, total - 0.25), z.name, "e", { small: true, bold: true }), txt(v(2.7, total - 0.8), z.where, "e", { small: true, tone: "muted" }));
    els.push(...pad(v(-0.3, total + 0.3), v(9.8, -0.3)));
    return { els, readout: [z.note, "Bir haritada geniş alanın tek renkle gösterilmesi her tarlada aynı profilin bulunduğu anlamına gelmez."] };
  },
};

const TRANSECT = [
  { label: "Nemli yamaç", x: -4.2, text: "Orman örtüsü ve yıkanma: orman toprağı örnekleri." },
  { label: "Dik yamaç", x: -2.0, text: "İnce malzeme aşınır, taşlı ve sığ yüzey: litosol okul örneği." },
  { label: "Yamaç eteği", x: 0.0, text: "Yamaçtan kısa mesafede gelen, az boylanmış malzeme: kolüvyal birikim." },
  { label: "Vadi tabanı", x: 2.2, text: "Akarsuyun bıraktığı tortu: alüvyal alan; drenaj ve tuz ayrıca denetlenir." },
  { label: "Kapalı taban", x: 4.4, text: "Kurakça kapalı tabanda tuz birikimi (halomorfik) ya da suya doygunluk (hidromorfik) gelişebilir." },
];
const transect: FigureDef = {
  caption:
    "Haritayı süreç kesitine dönüştür: önce geniş iklim bağlamı, sonra yerel konum (yamaç, etek, vadi, kapalı taban), ardından ana malzeme ve örtü, en son tuz-drenaj-kullanım. Bir konuma tıkla. Özgün şematik kesit; toprak adı verim garantisi değildir.",
  alt: "Soldan sağa kesit: ormanlı nemli yamaç, dik çıplak yamaç, yamaç eteği birikimi, akarsulu vadi tabanı ve sığ tuzlu kapalı taban; her konumun üstünde adı.",
  picks: TRANSECT.map((t) => ({ label: t.label, title: t.label, detail: [t.text] })),
  draw: (_v, _s, pick = -1) => {
    const surf: V[] = [v(-5.4, 3.0), v(-3.2, 2.6), v(-2.6, 2.4), v(-1.2, 0.9), v(0.8, 0.5), v(3.4, 0.4), v(3.8, 0.1), v(5.4, 0.1)];
    const els: El[] = [poly([...surf, v(5.4, -0.8), v(-5.4, -0.8)], { tone: "muted", fill: "muted", thin: true })];
    for (const x of [-4.8, -4.2, -3.6]) els.push(poly([v(x - 0.18, 2.95 - (x + 5.4) * 0.18), v(x, 3.5 - (x + 5.4) * 0.18), v(x + 0.18, 2.95 - (x + 5.4) * 0.18)], { tone: "c", fill: "c", thin: true }));
    els.push(poly([v(-0.9, 0.82), v(0.6, 0.54), v(0.8, 0.5), v(-0.4, 0.3), v(-1.0, 0.6)], { tone: "warn", fill: "warn", thin: true }));
    els.push(seg(v(2.0, 0.47), v(2.6, 0.45), { tone: "b", bold: true }));
    els.push(poly(wavy(3.9, 5.3, 0.16, 0.02, 8), { open: true, tone: "ink", thin: true }));
    TRANSECT.forEach((t, i) => {
      const on = pick === i;
      const y = i % 2 === 0 ? 3.9 : 3.2;
      els.push(seg(v(t.x, y - 0.25), v(t.x, Math.max(0.6, 3.0 - (t.x + 5.4) * 0.3) + 0.1), { thin: true, dash: true, tone: on ? "a" : "muted" }));
      els.push(txt(v(t.x, y), t.label, "n", { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
    });
    els.push(...pad(v(-6.4, 4.6), v(6.4, -1.1)));
    const sel = pick >= 0 ? `${TRANSECT[pick].label}: ${TRANSECT[pick].text}` : "Bir konuma tıkla ya da aşağıdan seç.";
    return { els, readout: [sel, "Aynı alüvyon kartı tuz ve drenajla farklı risk taşır."] };
  },
};

const K = Math.cos((39 * Math.PI) / 180);
const P = (lon: number, lat: number): V => v((lon - 35) * K, lat - 39);
const SITES: { group: string; tone: Tone; note: string; places: [string, number, number][] }[] = [
  { group: "Alüvyal deltalar", tone: "c", note: "Akarsuların taşıyıp biriktirdiği tortu; verim için doku, su, tuz ve drenaj birlikte değerlendirilir.", places: [["Çukurova", 35.3, 36.85], ["Bafra", 35.85, 41.62], ["Çarşamba", 36.85, 41.2], ["Menemen", 27.0, 38.6]] },
  { group: "Vertisol bağlamı", tone: "warn", note: "Şişen kilin ıslanıp kurumasıyla çatlama ve karışma; her killi toprak vertisol değildir.", places: [["Ergene Havzası", 27.1, 41.3]] },
  { group: "Tuz etkisi", tone: "a", note: "Kapalı ve kurakça tabanlarda tuzluluk gelişebilir; sulama, drenaj ve yer altı suyu düzeyi de önemlidir.", places: [["Iğdır Ovası", 44.0, 39.95], ["Burdur–Acıgöl", 30.0, 37.7]] },
  { group: "Hidromorfik", tone: "b", note: "Yüksek taban suyu ve suya doygunluk; havalanma ayrıca önemlidir.", places: [["Sultansazlığı", 35.3, 38.3], ["Işıklı", 29.85, 38.3]] },
];
const trMap: FigureDef = {
  caption:
    "Yerel toprak örneklerini haritaya bağla. Sınır gerçek Türkiye haritasıdır; numaralı işaretler yaklaşık konumlardır ve adları altta yazar. Bir yer adı o ovanın her parselinde aynı profil olduğunu söylemez.",
  alt: "Türkiye haritası; adımlarda alüvyal deltalar (Çukurova, Bafra, Çarşamba, Menemen), vertisol (Ergene), tuz etkisi (Iğdır, Burdur–Acıgöl) ve hidromorfik alanlar (Sultansazlığı, Işıklı) numaralı halkalarla işaretleniyor.",
  steps: SITES.map((s) => s.group),
  draw: (_v, step) => {
    const g = SITES[step];
    const els: El[] = turkeyRings().map((r) => poly(r.map(([lo, la]) => P(lo, la)), { tone: "muted", fill: "muted" }));
    const legend: { code: string; label: string; tone: Tone }[] = [];
    g.places.forEach(([name, lo, la], i) => {
      const c = P(lo, la);
      els.push(circle(c, 0.27, { tone: g.tone, fill: g.tone, bold: true }), txt(c, String(i + 1), "c", { small: true, bold: true, tone: g.tone }));
      legend.push({ code: String(i + 1), label: name, tone: g.tone });
    });
    return { els, legend, readout: [`${g.group}: ${g.note}`] };
  },
};

const carriers: FigureDef = {
  caption:
    "Akarsuyun tabanı ile yamacın eteği ayrı taşıyıcılardır. Alüvyal birikimde akarsuyun taşıdığı, tane boyuna göre daha düzenli tabakalanmış tortu; kolüvyal birikimde yamaçtan kısa mesafede gelen, çoğu zaman az boylanmış malzeme öne çıkar. Şematik kesit, taneler temsilî.",
  alt: "Solda yamaç eteğinde karışık boylu taneli kama biçimli kolüvyal birikim; sağda vadi tabanında ince, düzenli tabakalar hâlinde alüvyon ve üstünde akarsu.",
  draw: () => {
    const els: El[] = [];
    els.push(poly([v(-5, 3), v(-2.2, 0.8), v(-1.4, 0.5), v(5, 0.5), v(5, -1), v(-5, -1)], { tone: "muted", fill: "muted", thin: true }));
    els.push(poly([v(-3.0, 1.6), v(-1.0, 0.5), v(-2.8, 0.5)], { tone: "warn", fill: "warn", thin: true }));
    let seed = 5;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (let k = 0; k < 8; k++) { const x = -2.75 + rnd() * 1.2; const r = 0.04 + rnd() * 0.1; els.push(circle(v(x, 0.6 + r + rnd() * Math.max(0, (x + 1.0) * -0.4)), r, { tone: "warn", fill: "warn", thin: true })); }
    for (let row = 0; row < 3; row++) els.push(poly(wavy(0.2, 4.8, 0.05 - row * 0.3, 0.02, 12), { open: true, tone: "c", thin: true }));
    els.push(seg(v(2.0, 0.56), v(3.2, 0.56), { tone: "b", bold: true }), txt(v(2.6, 0.9), "akarsu", "n", { small: true, tone: "b" }));
    els.push(txt(v(-2.2, 2.0), "kolüvyal: az boylanmış", "e", { small: true, bold: true, tone: "warn" }), txt(v(2.5, -1.3), "alüvyal: tabakalı", "s", { small: true, bold: true, tone: "c" }));
    els.push(...pad(v(-5.3, 3.3), v(5.3, -1.9)));
    return { els, readout: ["Yamaç eteğinin her birikimini büyük nehrin deltası sayma.", "Yeni birikim gelişmiş katları örtebilir; zamanla bu malzemede de toprak gelişimi sürebilir."] };
  },
};

/* ---------------- Dünya'da bitkiler ---------------- */

const SERIES = [
  { name: "A: her ay 50 mm", p: Array.from({ length: 12 }, () => 50), note: "Yağış büyüme dönemine yayılmış; toplam 12 × 50 = 600 mm." },
  { name: "B: yaz kurak dizi", p: [100, 90, 80, 60, 30, 10, 0, 0, 20, 50, 70, 90], note: "Toplam yine 600 mm, ama haziran–eylül sıcak döneminde yağış çok az: su stresi farklılaşır." },
];
const timing: FigureDef = {
  caption:
    "Yağışın miktarı kadar zamanı önemlidir. İki dizinin yıllık toplamı eşit (600 mm); A her ay 50 mm, B ise kışın yağıp yazın kurak kalan özgün temsilî dizidir (gerçek şehir normali değil). Eşit toplam eşit büyüme ortamı değildir; yaz kurak dizi tek başına kesin maki ya da bozkır da üretmez.",
  alt: "Aylık yağış sütunları, 1–12 ay; A adımında bütün sütunlar 50 mm; B adımında kış aylarında yüksek, yaz aylarında sıfıra inen sütunlar. İkisinde de toplam 600 mm.",
  steps: SERIES.map((s) => s.name),
  draw: (_v, step) => {
    const s = SERIES[step];
    const Y = (mm: number) => mm / 30;
    const els: El[] = [seg(v(0, 0), v(12, 0), { thin: true }), seg(v(0, 0), v(0, Y(110)), { thin: true })];
    for (const mm of [50, 100]) els.push(seg(v(-0.1, Y(mm)), v(12, Y(mm)), { thin: true, dash: true, tone: "muted" }), txt(v(-0.2, Y(mm)), `${mm}`, "w", { small: true, tone: "muted" }));
    s.p.forEach((mm, i) => {
      if (mm > 0) els.push(poly([v(i + 0.2, 0), v(i + 0.8, 0), v(i + 0.8, Y(mm)), v(i + 0.2, Y(mm))], { tone: "b", fill: "b", thin: true }));
      if (i % 3 === 0 || i === 11) els.push(txt(v(i + 0.5, -0.35), String(i + 1), "s", { small: true, tone: "muted", soft: true }));
    });
    els.push(txt(v(0.15, Y(112)), "mm", "e", { small: true, tone: "muted" }), txt(v(12.2, Y(80)), "toplam 600 mm", "e", { small: true, bold: true, tone: "b" }));
    els.push(...pad(v(-1.6, Y(120)), v(16.8, -1)));
    return { els, readout: [s.note, "Sıcaklıkla ilişkili su kaybı, toprağın depolaması ve kök erişimi de kullanılabilir suyu belirler."] };
  },
};

const BELTS: { name: string; tone: Tone }[] = [
  { name: "geniş yapraklı orman", tone: "c" },
  { name: "iğne yapraklı orman", tone: "b" },
  { name: "kısa bitki (tundra, çayır)", tone: "warn" },
  { name: "kar ve buz", tone: "muted" },
];
const latAlt: FigureDef = {
  caption:
    "Sıcaklık büyüme penceresini sınırlar. Yükselti artışı, enlem boyunca görülen değişime benzer kuşaklar oluşturabilir: solda dağ yamacı, sağda ekvatordan kutba doğru şerit. Bu bir benzetmedir; aynı türlerin aynı sırayla ve aynı metrelerde bulunacağı garantisi değildir. Nitel şema, sayı yok.",
  alt: "Solda dört kuşaklı dağ: etekte geniş yapraklı orman, üstünde iğne yapraklı orman, sonra kısa bitki, zirvede kar. Sağda aynı dört kuşak alttan üste ekvatordan kutba doğru sıralı bir şerit.",
  draw: () => {
    const els: El[] = [];
    const H = [0, 1.2, 2.2, 3.0, 3.6];
    BELTS.forEach((b, i) => {
      const w0 = 3 * (1 - H[i] / 3.6);
      const w1 = 3 * (1 - H[i + 1] / 3.6);
      els.push(poly([v(-w0, H[i]), v(w0, H[i]), v(w1, H[i + 1]), v(-w1, H[i + 1])], { tone: b.tone, fill: b.tone, thin: true }));
      els.push(poly([v(4.0, H[i]), v(5.0, H[i]), v(5.0, H[i + 1]), v(4.0, H[i + 1])], { tone: b.tone, fill: b.tone, thin: true }));
      els.push(txt(v(5.2, (H[i] + H[i + 1]) / 2), b.name, "e", { small: true, tone: "ink" }));
    });
    els.push(vec(v(3.6, 0.1), v(3.6, 3.5), { tone: "muted" }));
    els.push(txt(v(0, -0.35), "yükselti ↑", "s", { small: true, tone: "muted" }), txt(v(4.5, -0.35), "ekvator → kutup", "s", { small: true, tone: "muted" }));
    els.push(...pad(v(-3.3, 3.9), v(10.6, -1)));
    return { els, readout: ["Deniz etkisi, bakı, hava hareketleri ve yerel toprak da devrededir; tek bir enlem bütün bitkiyi belirlemez."] };
  },
};

const layersForest: FigureDef = {
  caption:
    "Yıl boyu sıcak ve bol nemli alanlarda geniş yapraklı, sık ve katlı orman gelişebilir: üst ağaçlar, alt ağaç ve çalı katları, sarılıcılar ışık ve su rekabetiyle ilişkilidir. Ormanın gür olması toprağın sınırsız besin deposu olduğu anlamına gelmez. Şema ölçekli değildir.",
  alt: "Yan görünüş: tek tük yükselen uzun ağaç taçları, altında sık orta kat taçları, daha altta çalılar ve zemin; bir ağaç gövdesine sarılan çizgi sarılıcıyı gösteriyor.",
  draw: () => {
    const els: El[] = [seg(v(-4, 0), v(4, 0), { thin: true })];
    const tree = (x: number, h: number, r: number, tone: Tone) => {
      els.push(seg(v(x, 0), v(x, h - r * 0.6), { tone: "muted" }));
      els.push(circle(v(x, h), r, { tone, fill: tone, thin: true }));
    };
    tree(-2.6, 4.2, 0.6, "c");
    tree(1.8, 4.4, 0.65, "c");
    for (const x of [-3.4, -1.6, -0.2, 0.8, 2.8, 3.5]) tree(x, 2.7, 0.45, "b");
    for (const x of [-3.0, -2.0, -0.8, 0.3, 1.3, 2.3, 3.2]) els.push(circle(v(x, 0.7), 0.35, { tone: "warn", fill: "warn", thin: true }));
    els.push(poly(Array.from({ length: 9 }, (_, i) => v(1.8 + 0.12 * Math.sin(i * 1.6), 0.2 + i * 0.42)), { open: true, smooth: true, tone: "a" }));
    els.push(txt(v(4.4, 4.3), "üst ağaçlar", "e", { small: true, bold: true, tone: "c" }), txt(v(4.4, 2.7), "orta kat", "e", { small: true, bold: true, tone: "b" }), txt(v(4.4, 0.7), "çalı ve zemin", "e", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(2.05, 1.65), "sarılıcı", "e", { small: true, tone: "a" }));
    els.push(...pad(v(-4.3, 5.2), v(7.6, -0.4)));
    return { els, readout: ["Besinlerin önemli bölümü canlı biyokütlede tutulabilir; orman kaldırıldığında eski besin döngüsü kendiliğinden sürmez."] };
  },
};

const taiga: FigureDef = {
  caption:
    "Uzun soğuk dönemli uygun nemli kuzey alanlarda tayga (iğne yapraklı orman), daha kuzeyde kısa büyüme dönemi ve donla ağaçsız tundra (yosun, liken, kısa bitkiler) görülür. Ağaç gövdeleri ve orman katı taygayı tundradan ayırır. Tundra bitkisiz çöl ya da kalıcı buz örtüsü değildir. Şema ölçekli değildir.",
  alt: "Soldan sağa kutba doğru: solda sık konik iğne yapraklı ağaçlar (tayga), ortada seyrekleşen ağaçlar, sağda yalnız alçak bitki öbekleri (tundra).",
  draw: () => {
    const els: El[] = [seg(v(-5, 0), v(5, 0), { thin: true })];
    const xs = [-4.6, -4.0, -3.4, -2.8, -2.2, -1.6, -0.9, -0.1];
    xs.forEach((x, i) => {
      const h = 1.8 - i * 0.12;
      els.push(seg(v(x, 0), v(x, 0.25), { tone: "muted" }), poly([v(x - 0.28, 0.25), v(x, h), v(x + 0.28, 0.25)], { tone: "b", fill: "b", thin: true }));
    });
    for (const x of [1.2, 1.9, 2.6, 3.3, 4.0, 4.6]) els.push(poly([v(x - 0.2, 0), v(x - 0.1, 0.22), v(x, 0.12), v(x + 0.1, 0.25), v(x + 0.2, 0)], { tone: "c", fill: "c", thin: true }));
    els.push(txt(v(-2.6, -0.4), "tayga", "s", { small: true, bold: true, tone: "b" }), txt(v(2.9, -0.4), "tundra", "s", { small: true, bold: true, tone: "c" }));
    els.push(vec(v(-1.0, 2.6), v(3.0, 2.6), { tone: "muted" }), txt(v(-1.0, 2.95), "kutba doğru", "e", { small: true, tone: "muted" }));
    els.push(...pad(v(-5.3, 3.4), v(5.3, -1.1)));
    return { els, readout: ["Bir fotoğrafta kısa bitki görmekle kesin tundra kararı verilmez; enlem-yükselti, büyüme süresi ve diğer kanıtlar aranır."] };
  },
};

/* ---------------- Türkiye'de bitkiler ---------------- */

const blackSea: FigureDef = {
  caption:
    "Karadeniz'den gelen nemli hava dağ yamacında yükselip soğuyunca yağış desteklenir: denize açık yamaçta altta geniş yapraklı (kayın, gürgen, ıhlamur), yukarıda iğne yapraklı (ladin, köknar), üstte çayır dizisi. İç kesime bakan yamaçta deniz etkisi azalır; meşe, karaçam ve ardıç toplulukları ile bozkıra geçiş görülebilir. Şema ölçekli değildir; her yamaç aynı değildir.",
  alt: "Kuzey–güney dağ kesiti. Solda Karadeniz ve yamaca tırmanan nem oku; kuzey yamaçta alttan üste geniş yapraklı, iğne yapraklı ve çayır kuşakları; güney yamaçta meşe-karaçam ve bozkır.",
  draw: () => {
    const top = v(0, 3.4);
    const els: El[] = [poly([v(-6.6, -0.3), v(-4, -0.3), v(-4, 0), v(-6.6, 0)], { tone: "b", fill: "b", bare: true }), seg(v(-6.6, 0), v(-4, 0), { tone: "b" })];
    els.push(poly([v(-4, 0), top, v(4, 0)], { tone: "muted", fill: "muted", thin: true }));
    const xL = (y: number) => -4 + (4 * y) / 3.4;
    const nb = (y0: number, y1: number, tone: Tone, name: string) => {
      els.push(poly([v(xL(y0), y0), v(0, y0), v(0, y1), v(xL(y1), y1)], { tone, fill: tone, thin: true }));
      const ym = (y0 + y1) / 2;
      els.push(txt(v(xL(ym) - 0.25, ym), name, "w", { small: true, bold: true, tone }));
    };
    nb(0, 1.2, "c", "geniş yapraklı");
    nb(1.2, 2.3, "b", "iğne yapraklı");
    nb(2.3, 3.4, "warn", "çayır");
    els.push(vec(v(-6.4, 0.25), v(-4.3, 0.25), { tone: "b", bold: true }));
    els.push(txt(v(2.2, 2.0), "meşe, karaçam, ardıç", "e", { small: true, tone: "ink" }), txt(v(4.1, 0.35), "bozkıra geçiş", "e", { small: true, tone: "muted" }));
    els.push(txt(v(-5, -0.6), "Karadeniz: nemli hava", "c", { small: true, tone: "b" }), txt(v(2.4, -0.75), "iç kesime bakan yamaç", "c", { small: true, tone: "muted" }));
    els.push(...pad(v(-7.6, 3.8), v(7.6, -1.3)));
    return { els, readout: ["Kayın–ladin–üstte çayır dizisi nemli düşey kuşak için güçlü ipucudur; tek bir tür bölgeyi kesin kanıtlamaz.", "Bakı, vadi açıklığı, toprak ve insan kullanımı da fark yaratır."] };
  },
};

const altitude: FigureDef = {
  caption:
    "Akdeniz kıyısından yükselen özgün kesit. 1.200 ve 2.200 m çizgileri bölümdeki modelin görsel duraklarıdır, gerçek her dağ için sınır değildir: altta maki ve kızılçam, ortada karaçam, köknar, sedir gibi ormanlar, yükseklerde dağ çayırları. Maki ya da orman üst sınırı enlem, deniz etkisi, bakı, kar ve insan geçmişiyle değişir.",
  alt: "Kıyıdan yükselen dağ yamacı; 1.200 m ve 2.200 m'de kesikli çizgiler. Alt kuşak maki ve kızılçam, orta kuşak dağ ormanı, üst kuşak dağ çayırı.",
  draw: () => {
    const Y = (m: number) => m / 700;
    const els: El[] = [];
    const xOf = (m: number) => (m / 3000) * 6;
    const band = (m0: number, m1: number, tone: Tone) => els.push(poly([v(xOf(m0), Y(m0)), v(xOf(m1), Y(m1)), v(6.6, Y(m1)), v(6.6, Y(m0))], { tone, fill: tone, bare: true }));
    band(0, 1200, "c");
    band(1200, 2200, "b");
    band(2200, 3000, "warn");
    els.push(poly([v(0, 0), v(6, Y(3000)), v(6.6, Y(3000))], { open: true, bold: true }));
    els.push(poly([v(-1.6, 0), v(0, 0)], { open: true, tone: "b", bold: true }), txt(v(-1.5, -0.3), "deniz", "se", { small: true, tone: "b" }));
    for (const m of [1200, 2200]) els.push(seg(v(-0.4, Y(m)), v(6.6, Y(m)), { dash: true, thin: true }), txt(v(-0.5, Y(m)), `${fmt(m, 0)} m`, "w", { small: true, bold: true }));
    els.push(txt(v(4.6, Y(600)), "maki, kızılçam", "c", { small: true, bold: true, tone: "c" }), txt(v(5.1, Y(1700)), "dağ ormanı", "c", { small: true, bold: true, tone: "b" }), txt(v(6.3, Y(2600)), "dağ çayırı", "w", { small: true, bold: true, tone: "warn" }));
    els.push(...pad(v(-2.6, Y(3200)), v(6.9, -0.7)));
    return { els, readout: ["Kaynakların Akdeniz için yaklaşık 1.000 m, Ege 800 m, Marmara 500 m maki üst sınırı bölgesel öğretim özetidir.", "Verilmeyen gerçek sınırlar uydurulmaz; soru belirli bir dağılış verirse o koşulda kıyas yapılır."] };
  },
};

const ENDEMIC = [
  { name: "Endemik: mekân ölçütü", note: "Kasnak meşesinin (Quercus vulcanica) doğal alanı Türkiye ile sınırlıdır: endemik. Endemik az bireyli demek değildir." },
  { name: "Relikt: zaman ölçütü", note: "Sığla (Liquidambar orientalis) geçmişte daha geniş yayılışın kalıntısıdır: relikt. Doğal alanı Rodos'u da içerir, bu yüzden Türkiye endemiği değildir." },
];
const endemic: FigureDef = {
  caption:
    "Endemiklik doğal coğrafi sınıra, reliktlik tarihsel yayılışın kalıntısı olmaya dayanır; iki ölçüt ayrıdır, bir tür ikisini birden taşıyabilir. Adımlarda kasnak meşesi mekân, sığla zaman ölçütüyle gösterilir. Alanlar şematiktir, gerçek dağılış haritası değildir.",
  alt: "Adım 1: kesikli 'Türkiye' sınır kutusu ve tamamen içinde kalan kasnak meşesi doğal alanı. Adım 2: kesikli geniş 'geçmiş yayılış' alanı içinde küçük bugünkü sığla alanı; alanın bir parçası sınır kutusunun dışındaki Rodos'ta.",
  steps: ENDEMIC.map((e) => e.name),
  draw: (_v, step) => {
    const els: El[] = [poly([v(-3, -1.6), v(3, -1.6), v(3, 1.6), v(-3, 1.6)], { tone: "ink", dash: true, thin: true }), txt(v(2.9, 1.9), "Türkiye sınırı", "w", { small: true, tone: "muted" })];
    if (step === 0) {
      els.push(poly([v(-2.2, -0.9), v(-1.0, -0.4), v(-0.6, -1.2), v(-1.6, -1.4)], { smooth: true, tone: "c", fill: "c", bold: true }));
      els.push(txt(v(-0.3, -0.9), "kasnak meşesi doğal alanı", "e", { small: true, bold: true, tone: "c" }));
    } else {
      els.push(poly([v(-5.2, -1.2), v(-3.6, 1.2), v(-0.6, 1.0), v(0.2, -1.1), v(-2.4, -1.4)], { smooth: true, tone: "muted", dash: true }));
      els.push(txt(v(-3.4, 0.7), "geçmiş yayılış", "c", { small: true, tone: "muted" }));
      els.push(poly([v(-2.7, -0.5), v(-2.2, -0.2), v(-1.9, -0.7), v(-2.5, -0.9)], { smooth: true, tone: "a", fill: "a", bold: true }));
      els.push(circle(v(-3.6, -1.0), 0.18, { tone: "a", fill: "a", bold: true }), txt(v(-3.8, -1.0), "Rodos", "w", { small: true, tone: "a" }));
      els.push(txt(v(-1.6, -0.45), "bugünkü sığla alanı", "e", { small: true, bold: true, tone: "a" }));
    }
    els.push(...pad(v(-5.6, 2.3), v(4.0, -1.9)));
    return { els, readout: [ENDEMIC[step].note, "Bahçeye dikilmiş bir birey doğal yayılış kanıtı değildir; doğal alan ile insan eliyle bulunduğu yer ayrı kaydedilir."] };
  },
};

export const geographyFigures058Soil: Record<string, Record<string, FigureDef>> = {
  "dunya-topraklari": {
    "Beş etken tek başına sıraya dizilmez": catena,
    "Profili yukarıdan aşağı oku": horizons,
    "Yıkanma ve birikim aynı yerde olmak zorunda değildir": leaching,
    "Serin orman ve çayır örneklerini kıyasla": podzol,
  },
  "turkiye-topraklari": {
    "Tek ülke, tek toprak değildir": zonal,
    "Akarsuyun tabanı ve yamacın eteği ayrı taşıyıcılardır": carriers,
    "Yerel örnekleri Türkiye haritasına bağla": trMap,
    "Bir haritayı süreç kesitine dönüştür": transect,
  },
  "dunya-bitkileri": {
    "Yağışın miktarı kadar zamanı önemlidir": timing,
    "Sıcaklık büyüme penceresini sınırlar": latAlt,
    "Ekvatoral ormanda katlı yapı": layersForest,
    "Tayga ve tundra farklı sınırlara sahiptir": taiga,
  },
  "turkiye-bitkileri": {
    "Karadeniz’e açık yamaçta nemin yolu": blackSea,
    "Yükselti sınırları bağlama bağlıdır": altitude,
    "Kasnak meşesi ile sığlanın alan sınırını doğru kur": endemic,
  },
};
