import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, PL, R, S, T, chain, lead, mk, tableFig } from "./biologyFigures060Kit";

/*
 * AYT Biyoloji · Stoma-nodül-mikoriza ve bitkisel hormonlar (Forge061).
 * Hücre, kök ve sürgün çizimleri nitel öğretim şemasıdır, ölçekli değildir.
 * Doz-yanıt eğrileri yalnız bölümdeki nitel sırayı gösterir (kök daha düşük
 * dozda en iyi, sürgün daha yüksek dozda; negatif kontrolün altı); gerçek
 * derişim ya da tarımsal reçete değildir. Doku kültürü eşiği bölümdeki model
 * kabulüdür: en az iki kat oksin kök, en az iki kat sitokinin sürgün, arası kallus.
 */

/* ---------------- Stoma, nodül, mikoriza ---------------- */

const three = tableFig({
  caption:
    "Üç yapıyı yer ve görevden ayır (bölüm metninden): stoma denetlenen gaz geçidi, nodül azot bağlayan bakterilerle gelişen kök yapısı, mikoriza kök ile mantar ortaklığıdır. Stomada bekçi hücreleri bitkiye aittir; nodül ve mikorizada ayrı canlı ortaklar vardır.",
  alt: "Üç satırlı tablo: stoma yaprak ya da genç gövde yüzeyinde, bitkinin bekçi hücreleri; nodül kökte, bitki ve azot bağlayan bakteri; mikoriza kökte, bitki ve mantar.",
  headers: ["Yapı", "Yer", "Katılanlar"],
  rows: [
    ["Stoma", "yaprak, genç\ngövde yüzeyi", "bitkinin bekçi\nhücreleri"],
    ["Nodül", "kök", "bitki ve\nbakteri"],
    ["Mikoriza", "kök", "bitki ve\nmantar"],
  ],
  readout: ["Önce yapının yerini, sonra kimlerin katıldığını yaz.", "Ardından hangi maddenin hangi tarafa geçtiğini ekle."],
});

const guard = (open: number, ions: boolean, water: boolean): El[] => {
  const cx = 200;
  const cy = 160;
  const g = 14 + open * 22;
  const els: El[] = [];
  for (const s of [-1, 1]) {
    const x0 = cx + s * g;
    const x1 = cx + s * (g + 70);
    els.push(S([[x0, cy - 110], [x1, cy - 90], [x1 + s * 10, cy], [x1, cy + 90], [x0, cy + 110], [cx + s * (g * 0.6), cy]], { bold: true, tone: "a", fill: "a" }));
    els.push(C(cx + s * (g + 40), cy, 10, { tone: "ink", fill: "muted" }));
    if (ions) els.push(A(cx + s * (g + 130), cy - 40, cx + s * (g + 80), cy - 40, "warn"));
    if (water) els.push(A(cx + s * (g + 130), cy + 40, cx + s * (g + 80), cy + 40, "c", { dash: true }));
  }
  return els;
};
const STOMA = [
  { name: "Kapalı", open: 0, ions: false, water: false, txt: "Turgor düşük; bekçi hücreleri birbirine yakın." },
  { name: "İyon girişi", open: 0, ions: true, water: false, txt: "K⁺ ve eş iyonlar artar, çözünen potansiyeli düşer; açıklık henüz değişmedi." },
  { name: "Su girişi", open: 0.5, ions: true, water: true, txt: "Su potansiyeli farkıyla su osmozla girer; turgor artar." },
  { name: "Açık", open: 1, ions: false, water: false, txt: "Çeper düzeni şişmeyi biçime çevirir; hücreler ayrılır, açıklık genişler." },
];
const stoma = mk({
  caption:
    "İyon değişimi önce osmotik durumu etkiler (nitel sıra şeması, ölçekli değil; aşamalar çap ölçümü değildir): önce iyon olayı, sonra su olayı, en son açıklığın genişlemesi. Açıklık bir hücre değil, iki bekçi hücresi arasındaki geçittir. Su doğrudan ATP pompasıyla taşınmaz.",
  alt: "Ortada iki böbrek biçimli bekçi hücresi ve aralarında açıklık. Adımlarda hücrelere iyon okları, sonra su okları giriyor; son adımda hücreler ayrılıp açıklık genişliyor.",
  h: 300,
  steps: STOMA.map((s) => s.name),
  draw: (_v, step) => {
    const s = STOMA[step];
    const els = guard(s.open, s.ions, s.water);
    if (s.ions) els.push(T(380, 70, "K⁺, eş iyon", "e", { tone: "warn" }));
    if (s.water) els.push(T(380, 250, "su (osmoz)", "e", { tone: "c" }));
    els.push(T(200, 290, s.open > 0 ? "açıklık genişliyor" : "açıklık dar", "c", { tone: "muted" }));
    return { els, readout: [`${step + 1}. ${s.txt}`, "İlk sinyali görür görmez açıklığın büyüdüğünü varsayma."] };
  },
});

const aba = mk({
  caption:
    "ABA bir sinyal zincirine katılır (nitel akış şeması): su stresi, ABA sinyali, iyon kanalları ve iyon çıkışı, su çıkışı, turgor azalması, açıklığın daralması. Kapanma su kaybını sınırlar; kütikular kaybı ya da bütün gaz alışverişini sıfırlamaz.",
  alt: "Yukarıdan aşağı altı kutu: su stresi, ABA, iyon çıkışı, su çıkışı, turgor azalır, açıklık daralır.",
  h: 420,
  draw: () => {
    const c = chain(
      [
        { label: "Su stresi", tone: "warn" },
        { label: "ABA sinyali", tone: "a", fill: "a", bold: true },
        { label: "İyon kanalları: iyon çıkışı" },
        { label: "Su çıkışı", tone: "c" },
        { label: "Turgor azalır" },
        { label: "Açıklık daralır", tone: "b", fill: "b" },
      ],
      { cx: 266, w: 330, gap: 24 },
    );
    return { els: c.els, readout: ["Mekanizmayı adındaki asit sözcüğüyle dokunun asitleşmesine indirgeme.", "ABA'nın tek işi stoma kapanması değildir; dormansiyle de ilişkilidir."] };
  },
});

const nodule = mk({
  caption:
    "Nodülde iki yönlü alışveriş (nitel şema): baklagil–Rhizobium örneğinde bakteri N₂'yi kullanılabilir azota bağlar ve bitkiye katkı verir; bitki fotosentez kökenli organik karbon ve yaşam ortamı sağlar. Bağlama enerji ister; leghemoglobin O₂ durumunun düzenlenmesine katkı verir.",
  alt: "Solda bitki kökü kutusu, sağda nodüldeki Rhizobium kutusu. Üstten havadaki N₂ oku bakteriye giriyor. Bakteriden bitkiye kullanılabilir azot oku, bitkiden bakteriye organik karbon oku.",
  h: 300,
  draw: () => {
    const els: El[] = [
      ...B(120, 170, "Bitki kökü", { w: 190, h: 90, tone: "a", fill: "a", bold: true }),
      ...B(412, 170, "Rhizobium\n(nodülde)", { w: 190, h: 90, tone: "b", fill: "b", bold: true }),
      ...B(412, 34, "Havadaki N₂", { tone: "muted" }),
      A(412, 58, 412, 120, "muted"),
      A(316, 150, 216, 150, "b", { bold: true }),
      A(216, 192, 316, 192, "a", { bold: true }),
    ];
    els.push(T(266, 124, "kullanılabilir N", "c", { tone: "b" }), T(266, 222, "organik karbon", "c", { tone: "a" }));
    els.push(T(266, 270, "enerji ve uygun O₂ koşulu gerekir", "c", { tone: "warn" }));
    return { els, readout: ["Bakteri organik maddeyi kloroplastla üretmez; Rhizobium bir bitki hücresi değildir.", "Azot bağlama nitrifikasyonla aynı işlem değildir."] };
  },
});

const root = (cx: number, cy: number, inside: boolean): El[] => {
  const els: El[] = [C(cx, cy, 100, { bold: true }), C(cx, cy, 30, { tone: "muted", fill: "muted" })];
  const cells: [number, number][] = [];
  for (const [r, n] of [[52, 8], [78, 12]] as const)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI + (r === 52 ? 0.2 : 0);
      cells.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
  cells.forEach(([x, y], i) => {
    els.push(C(x, y, 11, { tone: "a", thin: true }));
    if (inside && i % 3 === 0) {
      els.push(L(x - 6, y - 4, x + 6, y + 4, { tone: "warn" }), L(x - 6, y + 4, x + 6, y - 4, { tone: "warn" }), L(x, y - 7, x, y + 7, { tone: "warn" }));
    }
  });
  if (!inside) {
    els.push(C(cx, cy, 112, { tone: "warn", bold: true }), C(cx, cy, 106, { tone: "warn", thin: true }));
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * 2 * Math.PI + 0.13;
      els.push(L(cx + 66 * Math.cos(a), cy + 66 * Math.sin(a), cx + 100 * Math.cos(a), cy + 100 * Math.sin(a), { tone: "warn", thin: true }));
    }
  }
  return els;
};
const MYC = [
  { name: "Ektomikoriza", inside: false, txt: "Kök dışını saran mantar kılıfı ve hücreler arası bağlantılar." },
  { name: "Arbusküler", inside: true, txt: "Mantar yapıları korteks hücrelerinin içinde gelişir; bitki zarı arayüzü çevreler." },
];
const myc = mk({
  caption:
    "Mikoriza tiplerini tek dış kılıfa indirgeme (şematik kök kesiti, ölçekli değil): ektomikorizada dış kılıf ve hücreler arası hifler, arbusküler endomikorizada korteks hücreleri içinde dallanan yapılar. Hücre içine uzanma mantarın bitki sitoplazmasıyla karışması demek değildir.",
  alt: "Yuvarlak kök kesiti: ortada iletim silindiri, çevresinde iki halka korteks hücresi. Birinci adımda dışta kalın mantar kılıfı ve hücreler arasına uzanan çizgiler; ikinci adımda bazı korteks hücrelerinin içinde dallanan işaretler.",
  h: 280,
  steps: MYC.map((m) => m.name),
  draw: (_v, step) => {
    const m = MYC[step];
    const els = root(140, 140, m.inside);
    els.push(T(270, 40, m.name, "e", { tone: "warn", bold: true }));
    els.push(T(270, 80, m.inside ? "hücre içi yapılar" : "dış kılıf", "e", { tone: "warn" }));
    els.push(T(270, 110, m.inside ? "korteks hücrelerinde" : "ve hücreler arası hif", "e", { tone: "warn" }));
    els.push(T(270, 180, "iletim silindiri", "e", { tone: "muted" }), L(150, 150, 280, 180, { thin: true, tone: "muted" }));
    els.push(T(270, 220, "korteks hücreleri", "e", { tone: "a" }));
    return { els, readout: [`${m.name}: ${m.txt}`, "Ortaklık varlığı ile işlev ölçümü ayrı değerlendirilir."] };
  },
});

const exchange = mk({
  caption:
    "Kanıttan ilişki çiz (nitel alışveriş şeması): bakteriden bitkiye kullanılan azot, topraktan hif üzerinden bitkiye fosfat, bitkiden ortaklara organik karbon. Karbon okunun ters olması ortağın fotosentetik kaynak olduğu anlamına gelmez; ölçülmeyen ok eklenmez.",
  alt: "Ortada bitki kutusu. Solda nodül bakterisi, sağda mikoriza mantarı, sağ altta toprak. Bakteriden bitkiye N oku, topraktan mantar hifine ve bitkiye P oku, bitkiden iki ortağa C okları.",
  h: 300,
  draw: () => {
    const els: El[] = [
      ...B(266, 50, "Bitki", { w: 160, tone: "a", fill: "a", bold: true }),
      ...B(96, 210, "Bakteri", { w: 150, tone: "b", fill: "b" }),
      ...B(436, 210, "Mantar hifi", { w: 170, tone: "warn", fill: "warn" }),
      ...B(436, 276, "Toprak: P", { w: 170, tone: "muted" }),
      A(110, 186, 220, 74, "b", { bold: true }),
      A(196, 66, 80, 186, "a", { dash: true }),
      A(436, 254, 436, 234, "warn"),
      A(420, 186, 312, 74, "warn", { bold: true }),
      A(338, 66, 452, 186, "a", { dash: true }),
    ];
    els.push(T(190, 150, "N", "c", { tone: "b", bold: true }), T(106, 110, "C", "c", { tone: "a", bold: true }), T(346, 150, "P", "c", { tone: "warn", bold: true }), T(424, 110, "C", "c", { tone: "a", bold: true }));
    return { els, readout: ["Her basamakta izlenen maddenin kimliğini koru: N, P ve C ayrı oklardır.", "Hangi yolun hangi koşulda işlediğini ve neyin ölçülmediğini söyle."] };
  },
});

/* ---------------- Bitkisel hormonlar ---------------- */

const dose = mk({
  caption:
    "Doz–yanıt ilişkisini organla birlikte oku (nitel eğri, ölçekli değil): kök en iyi yanıtı daha düşük dozda, sürgün daha yüksek dozda verir; sıfır çizgisi kontrol kadar büyümedir, altı kontrolden azdır. Gerçek derişim ya da tarımsal reçete değildir.",
  alt: "Yatay eksen artan doz, düşey eksen kontrole göre yanıt; ortada yatay sıfır çizgisi. Kök eğrisi erken tepe yapıp sıfırın altına iniyor; sürgün eğrisi daha sağda tepe yapıyor.",
  h: 300,
  draw: () => {
    const x0 = 50;
    const x1 = 500;
    const y0 = 170;
    const els: El[] = [A(x0, 280, x0, 20, "ink", { thin: true }), A(x0, y0, x1 + 20, y0, "ink", { thin: true })];
    const curve = (peak: number, h: number, tail: number): [number, number][] =>
      Array.from({ length: 41 }, (_, i) => {
        const t = i / 40;
        const yv = h * Math.exp(-(((t - peak) / 0.13) ** 2)) - (t > peak ? tail * Math.min(1, (t - peak) / 0.3) : 0);
        return [x0 + t * (x1 - x0), y0 - yv];
      });
    els.push(PL(curve(0.22, 110, 90), { open: true, bold: true, tone: "b" }), PL(curve(0.62, 110, 40), { open: true, bold: true, tone: "a" }));
    els.push(T(x0 + 0.22 * (x1 - x0), y0 - 126, "kök", "c", { tone: "b", bold: true }), T(x0 + 0.62 * (x1 - x0), y0 - 126, "sürgün", "c", { tone: "a", bold: true }));
    els.push(T(x1, y0 + 24, "doz", "c", { tone: "muted" }), T(x0 + 4, 26, "yanıt", "e", { tone: "muted" }), T(x0 + 4, y0 - 14, "kontrol", "e", { tone: "muted" }));
    els.push(T(300, 288, "kontrolün altı: engelleme", "c", { tone: "b" }));
    return { els, readout: ["Aynı dış doz iki organa aynı uzama yüzdesini vermez.", "Eğrinin tepesini, sıfır çizgisini ve negatif bölgeyi ayrı oku."] };
  },
});

const shoot = (bend: number, auxin: boolean): El[] => {
  const els: El[] = [L(60, 280, 330, 280, { tone: "muted" })];
  const pts: [number, number][] = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    return [200 - bend * 70 * t * t, 280 - 200 * t];
  });
  els.push(PL(pts.map(([x, y]) => [x - 14, y] as [number, number]), { open: true, bold: true, tone: "a" }));
  els.push(PL(pts.map(([x, y]) => [x + 14, y] as [number, number]), { open: true, bold: true, tone: "a" }));
  if (auxin)
    for (let i = 2; i < 8; i++) {
      const [x, y] = pts[i];
      els.push(C(x + 6, y, 4, { tone: "warn", fill: "warn" }));
    }
  for (let i = 0; i < 4; i++) els.push(A(10, 60 + i * 40, 60, 60 + i * 40, "warn", { thin: true }));
  return els;
};
const PHOTO = [
  { name: "Tek yönlü ışık", bend: 0, aux: false, txt: "Işık tek yönden gelir; uç bölge sinyali algılar." },
  { name: "Asimetrik oksin", bend: 0, aux: true, txt: "Gölgede kalan tarafta oksin etkisi ve uzama daha fazla olabilir." },
  { name: "Kıvrılma", bend: 1, aux: true, txt: "Uzun kalan gölge tarafı dış yayda kalır; sürgün ışığa doğru kıvrılır." },
];
const photo = mk({
  caption:
    "Asimetrik oksin dağılımı yönelme oluşturabilir (nitel şema, ölçekli değil): tek yönden ışık alan koleoptilde gölge tarafı daha çok uzar, sürgün ışığa doğru kıvrılır. Oksin ışık tarafından fiziksel olarak çekilmez; algılama ve uzama bölgeleri farklı olabilir.",
  alt: "Solda ışık okları, ortada iki çizgiyle çizilmiş düşey sürgün. İkinci adımda gölge tarafında oksin noktaları; üçüncü adımda sürgün ışığa doğru kıvrılıyor.",
  h: 300,
  steps: PHOTO.map((p) => p.name),
  draw: (_v, step) => {
    const p = PHOTO[step];
    const els = shoot(p.bend, p.aux);
    els.push(T(14, 30, "ışık", "e", { tone: "warn", bold: true }));
    if (p.aux) els.push(...lead(220, 140, 320, 120, "gölge tarafı:", "warn"), T(320, 150, "daha çok uzama", "e", { tone: "warn" }));
    return { els, readout: [`${step + 1}. ${p.txt}`, "Kökün doz duyarlılığı farklıdır; sürgün sonucunu köke koşulsuz taşıma."] };
  },
});

const plant = (tip: "on" | "cut" | "cutAux" | "cutCtl"): El[] => {
  const els: El[] = [L(40, 290, 250, 290, { tone: "muted" }), L(145, 290, 145, tip === "on" ? 60 : 110, { bold: true, tone: "a" })];
  if (tip === "on") els.push(C(145, 52, 10, { tone: "a", fill: "a" }));
  else els.push(L(132, 110, 158, 104, { tone: "warn", bold: true }));
  if (tip === "cutAux") els.push(R(130, 88, 160, 104, { tone: "warn", fill: "warn" }));
  if (tip === "cutCtl") els.push(R(130, 88, 160, 104, { tone: "muted", dash: true }));
  const grow = tip === "cut" || tip === "cutCtl";
  for (const [y, s] of [[160, -1], [210, 1], [250, -1]] as const) {
    if (grow) els.push(L(145, y, 145 + s * 70, y - 50, { tone: "a" }), C(145 + s * 70, y - 50, 6, { tone: "a", fill: "a" }));
    else els.push(C(145 + s * 10, y, 6, { tone: "b", fill: "b" }));
  }
  return els;
};
const APICAL: { name: string; tip: "on" | "cut" | "cutAux" | "cutCtl"; txt: string }[] = [
  { name: "Tepe sağlam", tip: "on", txt: "Tepe sürgünü yan tomurcukları dolaylı hormonal ilişkilerle baskılayabilir." },
  { name: "Tepe kesildi", tip: "cut", txt: "Yan dallanma artar." },
  { name: "Kesik + oksin", tip: "cutAux", txt: "Kesilen tepe yerine oksin uygulanınca yan tomurcuk baskısı yeniden artar." },
  { name: "Kesik + çözücü", tip: "cutCtl", txt: "Yalnız taşıyıcı çözücü: kontrol grubu; dallanma artışı sürer." },
];
const apical = mk({
  caption:
    "Apikal baskınlıkta yeri ve uygulamayı izle (nitel deney şeması): tepe çıkarılınca yan dallanma artar; kesik yere uygun oksin uygulaması baskıyı yeniden artırır, yalnız çözücü kontrolü bunu yapmaz. Bu, tepenin yalnız fiziksel ağırlık yaptığı açıklamasını zayıflatır.",
  alt: "Düşey gövde ve üç yan tomurcuk. Adımlar: tepe sağlam ve tomurcuklar küçük; tepe kesik ve yan dallar uzamış; kesik uçta oksin bloğu ve tomurcuklar küçük; kesik uçta kesik çizgili çözücü bloğu ve yan dallar uzamış.",
  h: 300,
  steps: APICAL.map((a) => a.name),
  draw: (_v, step) => {
    const a = APICAL[step];
    const els = plant(a.tip);
    const grow = a.tip === "cut" || a.tip === "cutCtl";
    els.push(T(290, 100, a.name, "e", { tone: "a", bold: true }), T(290, 140, grow ? "yan dallar gelişir" : "yan tomurcuk baskılı", "e", { tone: grow ? "a" : "b" }));
    if (a.tip === "cutAux") els.push(T(290, 180, "blok: oksin", "e", { tone: "warn" }));
    if (a.tip === "cutCtl") els.push(T(290, 180, "blok: yalnız çözücü", "e", { tone: "muted" }));
    return { els, readout: [`${step + 1}. ${a.txt}`, "Sitokinin ve başka sinyaller de dallanma düzenine katılır."] };
  },
});

const RATIO = [-4, -3, -2, 1, 2, 3, 4];
const culture = mk({
  caption:
    "Doku kültüründe oran (bölümdeki model kabulü): en az iki kat oksin kök, en az iki kat sitokinin sürgün, aradaki oranlar kallus. Bu eşikler bütün türlerin gerçek eşikleri değildir; mutlak miktar, doku tipi ve genotip de sonucu etkiler.",
  alt: "Üstte oksin ve sitokinin miktarını gösteren iki çubuk, altında kök, kallus ve sürgün sonuç kutuları; seçili sonuç vurgulu. Sürgü oranı dört kat sitokininden dört kat oksine kadar değiştirir.",
  h: 300,
  param: { label: "Oran basamağı", min: 0, max: 6, step: 1, init: 3 },
  draw: (i) => {
    const r = RATIO[i];
    const aux = r > 0 ? r : 1;
    const cyt = r < 0 ? -r : 1;
    const res = aux >= 2 * cyt ? "Kök" : cyt >= 2 * aux ? "Sürgün" : "Kallus";
    const unit = 70;
    const els: El[] = [
      T(120, 40, "oksin", "w", { tone: "warn" }),
      R(130, 26, 130 + aux * unit, 54, { tone: "warn", fill: "warn" }),
      T(130 + aux * unit, 40, `${aux}`, "e", { tone: "warn", bold: true }),
      T(120, 100, "sitokinin", "w", { tone: "b" }),
      R(130, 86, 130 + cyt * unit, 114, { tone: "b", fill: "b" }),
      T(130 + cyt * unit, 100, `${cyt}`, "e", { tone: "b", bold: true }),
    ];
    const tone = (n: string): Tone => (n === res ? "a" : "muted");
    els.push(...B(96, 230, "Kök", { w: 150, tone: tone("Kök"), fill: res === "Kök" ? "a" : undefined, bold: res === "Kök" }));
    els.push(...B(266, 230, "Kallus", { w: 150, tone: tone("Kallus"), fill: res === "Kallus" ? "a" : undefined, bold: res === "Kallus" }));
    els.push(...B(436, 230, "Sürgün", { w: 150, tone: tone("Sürgün"), fill: res === "Sürgün" ? "a" : undefined, bold: res === "Sürgün" }));
    els.push(T(96, 180, "oksin ≥ 2 kat", "c", { tone: "muted" }), T(436, 180, "sitokinin ≥ 2 kat", "c", { tone: "muted" }));
    return { els, readout: [`Oksin : sitokinin = ${aux} : ${cyt} → ${res.toLocaleLowerCase("tr-TR")} (model kabulü).`, "Kallus az farklılaşmış çoğalan hücre topluluğudur; tohum değildir."] };
  },
});

const pairs = tableFig({
  caption:
    "Hormonlar birlikte ve bazen karşıt çalışır (bölüm metninden derlenmiş örnek etkiler): her hormonun etkisi organa, doza ve evreye bağlıdır. Karşıt etki iki maddenin kimyasal olarak birbirini yok etmesi değildir.",
  alt: "Beş satırlı tablo: oksin uzama, apikal baskınlık, kök oluşumu; giberellin sürgün uzaması, enzim sentezi; sitokinin bölünme, yaşlanmayı geciktirme; ABA stoma kapanması, dormansi; etilen olgunlaşma, organ dökümü.",
  headers: ["Hormon", "Örnek bağlam"],
  rows: [
    ["Oksin", "uzama, apikal baskınlık,\nkök oluşumu"],
    ["Giberellin", "sürgün uzaması,\nhidrolitik enzim"],
    ["Sitokinin", "bölünme, yaşlanmayı\ngeciktirme"],
    ["ABA", "stoma kapanması,\ndormansi"],
    ["Etilen", "olgunlaşma,\norgan dökümü"],
  ],
  readout: ["Giberellin ile ABA dormansi ve etkinleşmede; oksin ile sitokinin doku kültüründe dengelenir.", "Bir hormonun düzeyi sabitken diğerinin değişmesi oranı ve yanıtı değiştirir."],
});

export const biologyFigures061Plant: Record<string, Record<string, FigureDef>> = {
  "stoma-nodul-mikoriza": {
    "Üç yapıyı yer ve görevden ayır": three,
    "İyon değişimi önce osmotik durumu etkiler": stoma,
    "ABA bir sinyal zincirine katılır": aba,
    "Nodülde bitki ve bakterinin katkısını iki okla çiz": nodule,
    "Mikoriza tiplerini tek dış kılıfa indirgeme": myc,
    "Kanıttan ilişki çiz, ölçülmeyeni ekleme": exchange,
  },
  "bitki-hormonlari": {
    "Doz–yanıt ilişkisini organla birlikte oku": dose,
    "Apikal baskınlıkta yeri ve uygulamayı izle": apical,
    "Asimetrik oksin dağılımı yönelme oluşturabilir": photo,
    "Doku kültüründe oran, aynı zamanda koşul bilgisidir": culture,
    "Hormonlar birlikte ve bazen karşıt çalışır": pairs,
  },
};
