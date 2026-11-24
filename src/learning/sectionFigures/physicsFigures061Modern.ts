import { type El, type FigureDef } from "./figureKit";
import { A, B, C, L, PL, R, T, mk, table, tableFig } from "./biologyFigures060Kit";
import { bars, graph, tr } from "./biologyFigures061Kit";

/*
 * AYT Fizik · Enerji ve hareket, Büyük Patlama ve atomaltı parçacıklar,
 * modern fiziğin teknolojideki uygulamaları (Forge061). Şemalar nitel öğretim
 * çizimidir, ölçekli değildir. Sayılar bölüm metninden gelir: rampada 30 + 8 +
 * 4 = 42 J ve 8,4 N; %80 verimde 200 J için 250 J; kuark yükleri +2e/3 ve
 * −e/3; v = Hd; z = (λalınan − λyayılan)/λyayılan; I = I₀e^(−μL); d = vt/2;
 * küpte yüzey/hacim = 6/a. Gerçek cihaz, doz ya da tanı bilgisi değildir.
 */

/* ---------------- Enerji ve hareket ---------------- */

const ramp = mk({
  caption:
    "Eğik düzlemde çekme işi (bölümdeki örnek: 1 kg, 5 m uzunluk, 3 m yükseklik, g = 10, cosθ = 0,8, μk = 0,1, durgunluktan 4 m/s'ye): potansiyel artışı 30 J, kinetik artışı 8 J, iç enerji aktarımı 0,8 × 5 = 4 J. Çekme işi Fs = 42 J, sabit paralel kuvvet 42/5 = 8,4 N.",
  alt: "Üç yatay çubuk: potansiyel artışı 30 J, kinetik artışı 8 J, iç enerji 4 J; dördüncü çubuk toplam çekme işi 42 J.",
  h: 220,
  draw: () => {
    const pe = 1 * 10 * 3;
    const ke = (1 * 4 * 4) / 2;
    const q = 0.1 * 1 * 10 * 0.8 * 5;
    const w = pe + ke + q;
    const b = bars(
      [
        { label: "mgh", value: pe, text: `${pe} J`, tone: "a" },
        { label: "ΔK", value: ke, text: `${ke} J`, tone: "b" },
        { label: "fk · s", value: q, text: `${tr(q)} J`, tone: "warn" },
        { label: "Çekme işi", value: w, text: `${tr(w)} J`, tone: "c" },
      ],
      { max: 42 },
    );
    return { els: b.els, readout: [`Fs = ${pe} + ${ke} + ${tr(q)} = ${tr(w)} J; F = ${tr(w)} / 5 = ${tr(w / 5)} N.`, "Tek çekme işini net iş diye alıp potansiyel artışını yok sayma."] };
  },
});

const spring = mk({
  caption:
    "Doğal boydan yay enerjisi (ideal doğrusal yay modeli, nitel grafik, ölçekli değil): yavaşça germede dış kuvvet 0'dan kx'e doğrusal artar; iş üçgen alanı kx²/2'dir. “Son kuvvet × bütün uzama” dikdörtgeni iki kat hata verir. Uzama doğal boydan ölçülür.",
  alt: "Yatay eksen uzama x, düşey eksen dış kuvvet. Orijinden kx noktasına çıkan doğru; altındaki üçgen dolu ve kx²/2 yazılı; aynı tabanlı kesik dikdörtgen kx·x.",
  h: 280,
  draw: () => {
    const g = graph({ x0: 70, yb: 240, w: 380, h: 200, xmax: 1.1, ymax: 1.1, xl: "x", yl: "F" });
    const els: El[] = [...g.els];
    els.push(R(g.X(0), g.Y(1), g.X(1), g.Y(0), { tone: "muted", dash: true }));
    els.push(PL([[g.X(0), g.Y(0)], [g.X(1), g.Y(1)], [g.X(1), g.Y(0)]], { tone: "a", fill: "a", thin: true }), L(g.X(0), g.Y(0), g.X(1), g.Y(1), { tone: "a", bold: true }));
    els.push(T(g.X(0.7), g.Y(0.25), "kx²/2", "c", { tone: "a", bold: true }), T(g.X(0.3), g.Y(0.8), "kx · x (yanlış)", "c", { tone: "muted" }));
    els.push(T(g.X(0) - 6, g.Y(1), "kx", "w", { tone: "muted" }));
    return { els, readout: ["Us = kx²/2; sıkıştırma ve uzatmada aynı |x| aynı enerjiyi depolar.", "k N/m, x metre, enerji joule olmalıdır."] };
  },
});

const vertical = mk({
  caption:
    "Düşey yayda denge ile ilk dönüş (bölümdeki model, sönümsüz, ölçekli değil): statik denge uzaması mg/k'dir; doğal boydan durgun bırakılan kütlenin ilk en büyük uzaması mgx = kx²/2'den 2mg/k çıkar. Denge konumu salınımın ortasıdır, ilk duruş noktası değildir.",
  alt: "Tavandan sarkan yay. Sağda üç yatay işaret: doğal boy, mg/k uzamada denge ve 2mg/k uzamada ilk dönüş noktası.",
  h: 320,
  draw: () => {
    const els: El[] = [L(60, 20, 220, 20, { bold: true })];
    const pts: [number, number][] = [[140, 20]];
    for (let i = 1; i <= 12; i++) pts.push([140 + (i % 2 ? -18 : 18), 20 + i * 14]);
    pts.push([140, 196]);
    els.push(PL(pts, { open: true, tone: "ink" }), R(110, 196, 170, 236, { tone: "a", fill: "a", bold: true }), T(140, 216, "m", "c", { bold: true }));
    for (const [y, s, t] of [[80, "doğal boy: x = 0", "muted"], [180, "denge: x = mg/k", "b"], [280, "ilk dönüş: x = 2mg/k", "warn"]] as const) {
      els.push(L(200, y, 270, y, { tone: t, dash: true }), T(276, y, s, "e", { tone: t, bold: t !== "muted" }));
    }
    els.push(A(240, 84, 240, 176, "b"), A(250, 184, 250, 276, "warn"));
    return { els, readout: ["Denge: kx = mg → x = mg/k. İlk dönüş: mgx = kx²/2 → x = 2mg/k.", "Dengede kalmak için enerjinin bir bölümü sönümle başka türe aktarılmış olmalıdır."] };
  },
});

const springs = tableFig({
  caption:
    "Yayların bağlanışında eşdeğer sabit (bölüm metninden, ideal yaylar): paralelde uzamalar aynı, kuvvetler toplanır; seride gerilmeler aynı, uzamalar toplanır. İki özdeş k yay seride k/2, paralelde 2k olur. Her yayın enerjisi kendi uzamasıyla hesaplanır.",
  alt: "İki satırlı tablo: paralel bağlamada ortak olan uzama, eşdeğer k1 + k2, iki özdeş yay için 2k; seri bağlamada ortak olan gerilme, eşdeğer tersler toplamı, iki özdeş yay için k/2.",
  headers: ["Bağlama", "Ortak", "Eşdeğer", "2 özdeş"],
  rows: [
    ["Paralel", "uzama", "k1 + k2", "2k"],
    ["Seri", "gerilme", "1/k1 + 1/k2\n(tersi)", "k/2"],
  ],
  readout: ["Seri/paralel adı çizimden değil bağlantı geometrisinden gelir.", "Düşey iki yayda üst yay alttaki bütün ağırlığı taşıyabilir."],
});

const efficiency = mk({
  caption:
    "Güç, verim ve enerji birimleri (bölümdeki örnek): verim η = yararlı enerji / giriş enerjisi. 200 J yararlı iş için %80 verimde giriş 200/0,8 = 250 J gerekir. 1 kWh = 3,6 milyon J bir enerji birimidir, güç değil.",
  alt: "İki yatay çubuk: yararlı enerji 200 J ve gereken giriş enerjisi. Sürgü verimi yüzde 50 ile 100 arasında değiştirir.",
  h: 140,
  param: { label: "Verim", min: 50, max: 100, step: 5, init: 80, unit: "%" },
  draw: (p) => {
    const inp = 200 / (p / 100);
    const b = bars(
      [
        { label: "Yararlı", value: 200, text: "200 J", tone: "a" },
        { label: "Giriş", value: inp, text: `${tr(inp)} J`, tone: "warn" },
      ],
      { max: 400 },
    );
    return { els: b.els, readout: [`Giriş = 200 / ${tr(p / 100, 2)} = ${tr(inp)} J.`, "Aynı işi daha kısa sürede yapmak gücü büyütür, işi değil."] };
  },
});

/* ---------------- Büyük Patlama ve atomaltı parçacıklar ---------------- */

const Q: Record<string, number> = { u: 2, d: -1, "ū": -2, "đ": 1 };
const frac = (n: number) => (n === 0 ? "0" : `${n < 0 ? "−" : "+"}${Math.abs(n) % 3 === 0 ? Math.abs(n) / 3 : `${Math.abs(n)}/3`}`);
const COMBO = [
  { name: "Proton: uud", q: ["u", "u", "d"], bar: true },
  { name: "Nötron: udd", q: ["u", "d", "d"], bar: true },
  { name: "Mezon: u + anti-u", q: ["u", "ū"], bar: false },
  { name: "Mezon: u + anti-d", q: ["u", "đ"], bar: false },
];
const quarks = mk({
  caption:
    "Kuarkların yük defteri (bölümdeki değerler): u kuarkı +2e/3, d kuarkı −e/3; antikuarkta işaret döner. Bileşiğin yükü bileşen yüklerinin toplamıdır; her kuarkın baryon sayısı 1/3, antikuarkınki −1/3'tür. Mezonların tümü elektrikçe nötr değildir.",
  alt: "Seçili bileşik için kuark kutuları ve her birinin yükü; altta toplam elektrik yükü ve baryon sayısı tablosu. Adımlar proton, nötron ve iki mezonu gösterir.",
  h: 260,
  steps: COMBO.map((c) => c.name),
  draw: (_v, step) => {
    const c = COMBO[step];
    const els: El[] = [];
    const n = c.q.length;
    c.q.forEach((s, i) => {
      const x = 266 + (i - (n - 1) / 2) * 140;
      const anti = s === "ū" || s === "đ";
      els.push(C(x, 70, 40, { tone: anti ? "b" : "a", fill: anti ? "b" : "a", bold: true }), T(x, 70, anti ? `anti-${s === "ū" ? "u" : "d"}` : s, "c", { bold: true }), T(x, 136, `${frac(Q[s])} e`, "c", { tone: anti ? "b" : "a" }));
    });
    const total = c.q.reduce((t, s) => t + Q[s], 0);
    const baryon = c.q.reduce((t, s) => t + (s === "ū" || s === "đ" ? -1 : 1), 0);
    const t = table(["Toplam yük", "Baryon sayısı"], [[`${frac(total)} e`, `${frac(baryon)}`]], { y0: 170 });
    els.push(...t.els);
    return { els, readout: [`${c.name}: yük ${c.q.map((s) => frac(Q[s])).join(" ")} = ${frac(total)} e; baryon sayısı ${frac(baryon)}.`, "Kuark sayısını toplam yük yerine yazma."] };
  },
});

const families = tableFig({
  caption:
    "Hadron, baryon, mezon ve leptonlar (bölüm metninden, sade valans modeli): baryon üç kuark, antibaryon üç antikuark, mezon kuark-antikuark içerir; hadronlar güçlü etkileşime katılır. Leptonlar güçlü etkileşime katılmaz; elektron, müon ve tau −e, nötrinolar 0 yüklüdür.",
  alt: "Dört satırlı tablo: baryon üç kuark, örnek proton uud ve nötron udd; mezon kuark ve antikuark; yüklü leptonlar elektron, müon, tau, yük −e; nötrinolar yük 0, zayıf etkileşimle saptanır.",
  headers: ["Aile", "Yapı ya da yük", "Not"],
  rows: [
    ["Baryon", "3 kuark", "proton uud,\nnötron udd"],
    ["Mezon", "kuark +\nantikuark", "hepsi nötr\ndeğil"],
    ["e, μ, τ", "−e", "güçlüye\nkatılmaz"],
    ["Nötrinolar", "0", "zayıf\netkileşim"],
  ],
  readout: ["Elektronun antiparçacığı pozitrondur; elektron nötrinosu değildir.", "Aile adı tek başına kütleyi ya da ömrü belirlemez."],
});

const forces = tableFig({
  caption:
    "Temel etkileşimler ve taşıyıcıları (bölüm metninden): gluonlar kuarkları hadronlarda bağlar, foton elektromanyetik etkileşimi taşır, W⁺, W⁻ ve Z zayıf etkileşimle ilişkilidir. Kütleçekimi güncel Standart Modelin parçası değildir; graviton varsayımsaldır.",
  alt: "Dört satırlı tablo: güçlü etkileşim gluon; elektromanyetik foton; zayıf W artı, W eksi ve Z; kütleçekimi graviton varsayımsal, Standart Model dışı.",
  headers: ["Etkileşim", "Taşıyıcı", "Not"],
  rows: [
    ["Güçlü", "gluon", "kuarkları bağlar"],
    ["Elektromanyetik", "foton", "yük ve kütle 0"],
    ["Zayıf", "W⁺, W⁻, Z", "beta bozunması"],
    ["Kütleçekimi", "graviton\n(varsayımsal)", "Standart\nModel dışı"],
  ],
  readout: ["Ölçek ve parçacıklar belirtilmeden evrensel şiddet sıralaması kurulmaz.", "Kuark türü değişimi yük defteriyle izlenebilir."],
});

const redshift = mk({
  caption:
    "Kırmızıya kayma bir oran ölçümüdür (bölümdeki tanım): z = (λalınan − λyayılan)/λyayılan; z > 0 kırmızıya, z < 0 maviye kaymadır. Homojen genişleme modelinde 1 + z = aalınan/ayayılan. Oran yalnız iki dalga boyundan hesaplanır.",
  alt: "İki yatay dalga: üstte yayılan, altta alınan dalga; dalga boylarının oranı sürgüyle değişiyor. Sağda z değeri.",
  h: 220,
  param: { label: "λalınan / λyayılan", min: 0.8, max: 2, step: 0.1, init: 1.5 },
  draw: (r) => {
    const wave = (y: number, lam: number, tone: "a" | "warn" | "b"): El => PL(Array.from({ length: 121 }, (_, i) => [30 + i * 3, y - 22 * Math.sin((2 * Math.PI * i * 3) / lam)] as [number, number]), { open: true, tone, bold: true });
    const z = r - 1;
    const els: El[] = [wave(60, 60, "a"), wave(160, 60 * r, z >= 0 ? "warn" : "b")];
    els.push(T(400, 60, "yayılan", "e", { tone: "a" }), T(400, 160, "alınan", "e", { tone: "warn" }));
    els.push(T(266, 206, `z = ${tr(r, 1)} − 1 = ${z < 0 ? "−" : ""}${tr(Math.abs(z), 1)}`, "c", { tone: "warn", bold: true }));
    return { els, readout: [`z = ${z < 0 ? "−" : ""}${tr(Math.abs(z), 1)}: ${z > 0 ? "kırmızıya kayma" : z < 0 ? "maviye kayma" : "kayma yok"}; 1 + z = ${tr(r, 1)}.`, "Yerel hareket ve kütleçekimi de gözlenen kaymaya katkı verebilir."] };
  },
});

const hubble = mk({
  caption:
    "Hubble ilişkisi ve yakın uzaklık sınırı (nitel grafik, ölçekli değil; H değeri verilmez): yakın kozmolojik uzaklıklarda ortalama uzaklaşma hızı yaklaşık v = Hd; iki kat uzaktaki grup yaklaşık iki kat hızla uzaklaşır. Çok büyük uzaklıklarda basit doğrusal yorum yerine kozmolojik model gerekir.",
  alt: "Yatay eksen uzaklık d, düşey eksen uzaklaşma hızı v. Orijinden geçen doğru; yakın bölgede düz, ötesinde kesik çizgi. Seçili uzaklık katında nokta. Sürgü uzaklığı 1 ile 4 kat arasında değiştirir.",
  h: 280,
  param: { label: "Uzaklık katı", min: 1, max: 4, step: 1, init: 2 },
  draw: (m) => {
    const g = graph({ x0: 70, yb: 240, w: 400, h: 200, xmax: 6, ymax: 6, xl: "d", yl: "v" });
    const els: El[] = [...g.els, L(g.X(0), g.Y(0), g.X(4), g.Y(4), { tone: "a", bold: true }), L(g.X(4), g.Y(4), g.X(6), g.Y(6), { tone: "muted", dash: true })];
    els.push(C(g.X(m), g.Y(m), 7, { tone: "warn", fill: "warn" }), T(g.X(m) + 12, g.Y(m) + 18, `${m}d → ${m}v`, "e", { tone: "warn", bold: true }));
    els.push(T(g.X(5.2), g.Y(4.4), "uzakta: model", "c", { tone: "muted" }));
    return { els, readout: [`${m} kat uzaklık → yaklaşık ${m} kat uzaklaşma hızı (v = Hd).`, "Bu hız aralık artışıdır; yanımızdan geçen parçacığın yerel hızı değildir."] };
  },
});

/* ---------------- Modern fiziğin teknolojideki uygulamaları ---------------- */

const beer = mk({
  caption:
    "Beer-Lambert ile yol toplamı (ideal tek enerjili, saçılmasız ışın): I = I₀e^(−μL); ardışık katmanlarda μL katkıları toplanır. Eksen boyutsuz μL'dir; gerçek cihazın tayfı, saçılması ve algoritması modele dahil değildir.",
  alt: "Yatay eksen μL, düşey eksen iletilen oran I/I₀. 1'den başlayıp üstel azalan eğri; seçili μL değerinde nokta. Sürgü μL'yi 0 ile 3 arasında değiştirir.",
  h: 280,
  param: { label: "μL", min: 0, max: 3, step: 0.25, init: 1 },
  draw: (x) => {
    const g = graph({ x0: 70, yb: 240, w: 400, h: 200, xmax: 3.2, ymax: 1.1, xl: "μL", yl: "I/I₀" });
    const f = (t: number) => Math.exp(-t);
    const els: El[] = [...g.els, PL(g.plot(f, 0, 3, 60), { open: true, bold: true, tone: "a" })];
    els.push(C(g.X(x), g.Y(f(x)), 7, { tone: "warn", fill: "warn" }), T(g.X(x) + (x > 2 ? -12 : 12), g.Y(f(x)) - 18, `${tr(f(x), 3)}`, x > 2 ? "w" : "e", { tone: "warn", bold: true }));
    els.push(T(g.X(0) - 6, g.Y(1), "1", "w", { tone: "muted" }));
    return { els, readout: [`I/I₀ = e^(−${tr(x, 2)}) = ${tr(f(x), 3)}.`, "Aynı malzemede kalınlığı artırmak iletimi azaltır; μ seçilen foton enerjisine aittir."] };
  },
});

const echo = mk({
  caption:
    "Ultrason: sesin yankısı (nitel şema, ölçekli değil): darbe doku sınırına gider, yansır ve geri döner; ölçülen gidiş-dönüş süresi t ve varsayılan ses hızı v ile derinlik d = vt/2 olur. 2, sesin iki yol katetmesinden gelir; ses hızı yanlış varsayılırsa mesafe değişir.",
  alt: "Solda prob, sağda düşey doku sınırı. Probdan sınıra giden ok ve sınırdan geri dönen ok; aralarında d uzaklığı.",
  h: 220,
  draw: () => {
    const els: El[] = [
      ...B(70, 110, "Prob", { w: 100, h: 90, tone: "a", fill: "a", bold: true }),
      L(440, 30, 440, 190, { bold: true, tone: "b" }),
      A(124, 90, 432, 90, "warn", { bold: true }),
      A(432, 130, 124, 130, "c", { bold: true, dash: true }),
      T(280, 68, "gidiş", "c", { tone: "warn" }),
      T(280, 156, "dönüş", "c", { tone: "c" }),
      T(450, 110, "sınır", "e", { tone: "b" }),
      T(280, 204, "d = vt / 2", "c", { tone: "a", bold: true }),
    ];
    return { els, readout: ["t gidiş-dönüş süresidir; tek yol süresi t/2.", "Ultrason, insan işitme üst sınırından yüksek frekanslı mekanik sestir."] };
  },
});

const PN = [
  { name: "Eklem", w: 60, txt: "Taşıyıcı yayılması ve birleşmesi tükenim bölgesi ile iç alan oluşturur." },
  { name: "İleri kutuplama", w: 30, txt: "P pozitif, N negatif: potansiyel engeli azalır, akım kolaylaşır." },
  { name: "Ters kutuplama", w: 110, txt: "Tükenim bölgesi genişler; olağan çalışmada akım büyük ölçüde sınırlanır." },
];
const pn = mk({
  caption:
    "PN eklemi ve diyot (nitel şema, ölçekli değil): P ve N bölgeleri birleşince tükenim bölgesi oluşur; ileri kutuplamada engel azalır, ters kutuplamada akım büyük ölçüde sınırlanır. İdeal diyot bir yönde iletir; gerçek aygıtta sızıntı ve kırılma vardır.",
  alt: "Yatay çubuk: solda P bölgesi, sağda N bölgesi, ortada tükenim bölgesi. Adımlarda tükenim bölgesi ileri kutuplamada daralır, ters kutuplamada genişler; uçlarda kutup işaretleri.",
  h: 220,
  steps: PN.map((p) => p.name),
  draw: (_v, step) => {
    const p = PN[step];
    const cx = 266;
    const els: El[] = [
      R(60, 60, cx - p.w / 2, 140, { tone: "warn", fill: "warn" }),
      R(cx + p.w / 2, 60, 472, 140, { tone: "c", fill: "c" }),
      R(cx - p.w / 2, 60, cx + p.w / 2, 140, { tone: "muted", dash: true }),
      R(60, 60, 472, 140, { bold: true }),
      T(110, 100, "P", "c", { bold: true, tone: "warn" }),
      T(422, 100, "N", "c", { bold: true, tone: "c" }),
      T(cx, 176, "tükenim bölgesi", "c", { tone: "muted" }),
    ];
    if (step > 0) {
      const fwd = step === 1;
      els.push(T(40, 30, fwd ? "+" : "−", "c", { bold: true }), T(492, 30, fwd ? "−" : "+", "c", { bold: true }));
      els.push(T(cx, 206, fwd ? "akım kolaylaşır" : "akım sınırlı", "c", { tone: fwd ? "a" : "warn", bold: true }));
    }
    return { els, readout: [`${p.name}: ${p.txt}`, "Tek bir sabit 0,7 V değeri her malzemenin kesin yasası değildir."] };
  },
});

const nano = mk({
  caption:
    "Nano ölçek: yüzey ve hacim (bölümdeki bağıntı): kenarı a olan küpte yüzey/hacim = 6/a. Aynı küpü her kenarda n parçaya bölmek n³ küçük küp verir; toplam hacim aynı kalırken toplam yüzey n katına çıkar (6a²n). 1 nm = 10⁻⁹ m.",
  alt: "Solda kenarları n parçaya bölünmüş kare yüzlü küp görünümü; sağda toplam yüzeyi gösteren çubuk. Sürgü n'yi 1 ile 5 arasında değiştirir.",
  h: 220,
  param: { label: "Kenar başına parça", min: 1, max: 5, step: 1, init: 2 },
  draw: (n) => {
    const s = 160;
    const els: El[] = [R(30, 30, 30 + s, 30 + s, { bold: true, tone: "a" })];
    for (let i = 1; i < n; i++) els.push(L(30 + (s * i) / n, 30, 30 + (s * i) / n, 30 + s, { tone: "a", thin: true }), L(30, 30 + (s * i) / n, 30 + s, 30 + (s * i) / n, { tone: "a", thin: true }));
    els.push(T(220, 50, `${n ** 3} küçük küp`, "e", { tone: "a", bold: true }), T(220, 90, `kenar a/${n}`, "e", { tone: "muted" }), T(220, 130, `yüzey/hacim = ${6 * n}/a`, "e", { tone: "b", bold: true }), T(220, 170, `toplam yüzey: ${n} × 6a²`, "e", { tone: "warn", bold: true }));
    return { els, readout: [`${n}³ = ${n ** 3} küp; toplam yüzey 6a² × ${n}; yüzey/hacim 6/(a/${n}) = ${6 * n}/a.`, "Küçük sözcüğü her ürüne otomatik üstünlük sağlamaz."] };
  },
});

const LASER = [
  { name: "Pompalama", txt: "Dışarıdan enerji verilerek üst düzey doldurulur." },
  { name: "Popülasyon terslenmesi", txt: "Üst düzey alt düzeyden daha çok dolu olur." },
  { name: "Uyarılmış emisyon", txt: "Düzey farkına uygun foton, aynı modda yeni bir foton yayılmasını tetikler; gelen foton kaybolmaz." },
];
const laser = mk({
  caption:
    "Lazerin enerji mekanizması (nitel düzey şeması, ölçekli değil): pompalama dışarıdan enerji sağlar, popülasyon terslenmesinde üst düzey alt düzeyden daha çok dolu olur, uyarılmış emisyonda gelen fotonla aynı modda ek foton yayılır. Ek fotonun enerjisi sistemin iç enerjisinden gelir.",
  alt: "Alt ve üst iki yatay enerji düzeyi; düzeylerde taneciği gösteren daireler. Adımlarda yukarı pompalama oku, üst düzeyde çoğunluk ve sağa çıkan iki foton oku.",
  h: 240,
  steps: LASER.map((l) => l.name),
  draw: (_v, step) => {
    const up = step === 0 ? 2 : 5;
    const els: El[] = [L(60, 70, 300, 70, { bold: true, tone: "b" }), L(60, 190, 300, 190, { bold: true, tone: "muted" }), T(310, 70, "üst düzey", "e", { tone: "b" }), T(310, 190, "alt düzey", "e", { tone: "muted" })];
    for (let i = 0; i < up; i++) els.push(C(90 + i * 40, 56, 9, { tone: "b", fill: "b" }));
    for (let i = 0; i < 6 - up; i++) els.push(C(90 + i * 40, 176, 9, { tone: "muted", fill: "muted" }));
    if (step === 0) els.push(A(40, 180, 40, 84, "warn", { bold: true }));
    if (step === 2) els.push(A(300, 120, 420, 120, "warn", { bold: true }), A(300, 146, 420, 146, "warn", { bold: true }), T(440, 132, "2 foton", "e", { tone: "warn", bold: true }));
    return { els, readout: [`${step + 1}. ${LASER[step].txt}`, "Yarı kararlı düzeyin uzun ömrü terslenmeye yardım eder; iki kavram aynı tanım değildir."] };
  },
});

export const physicsFigures061Modern: Record<string, Record<string, FigureDef>> = {
  "ayt-enerji-hareket": {
    "Doğal boydan yay enerjisi": spring,
    "Yayların bağlanışında tek tek enerjiyi izle": springs,
    "Düşey yayda denge ile ilk dönüş aynı değil": vertical,
    "Eğik düzlemde çekme işi ve aynı yükseklik": ramp,
    "Güç, verim ve enerji birimleri": efficiency,
  },
  "buyuk-patlama-atomalti": {
    "Kırmızıya kayma bir oran ölçümüdür": redshift,
    "Hubble ilişkisi ve yakın uzaklık sınırı": hubble,
    "Kuarkların yük defteri": quarks,
    "Hadron, baryon ve mezon": families,
    "Zayıf etkileşim ve kütleçekimi": forces,
  },
  "modern-fizik-teknoloji": {
    "Beer-Lambert ile yol toplamı": beer,
    "Ultrason: sesin yankısı": echo,
    "PN eklemi ve diyot": pn,
    "Nano ölçek: yüzey ve hacim": nano,
    "Lazerin enerji mekanizması": laser,
  },
};
