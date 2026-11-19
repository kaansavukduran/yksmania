import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Hidrojen bağı. Şemalar ölçekli değildir. Kaynama verileri OGM
 * Kimya 9 tablosundaki değerlerdir (H₂O 100, H₂S −60, H₂Se −41,25, H₂Te −2,2 °C).
 * Yoğunluk ve temas sayımı yuvarlatılmış öğretim modelidir.
 */

const fmtTr = (x: number, d = 1) => {
  const r = Number(x.toFixed(d));
  return String(r).replace(".", ",").replace("-", "−");
};

// 1 · İki su molekülü: düz çizgi kovalent, noktalar molekül arası çekim.
const WATER_PARTS = [
  { label: "Kovalent O–H", title: "Düz çizgi: kovalent O–H", detail: ["Aynı su molekülünün içindeki bağdır; elektron çifti O ile H arasında ortaklanır.", "Su kaynarken ya da buz erirken bu bağ kopmaz; H₂O formülü korunur.", "Verici koşulu buradan gelir: H doğrudan F, O veya N’ye bağlı olmalı."] },
  { label: "H···O hidrojen bağı", title: "Noktalı çizgi: hidrojen bağı", detail: ["İki ayrı molekül arasındaki çekimdir, ikinci bir kovalent bağ değildir.", "Bir ucu vericinin δ⁺ H’si, öbür ucu alıcının elektron çifti taşıyan O’sudur.", "Kaynama, erime ve buharlaşmada değişen bu moleküller arası temaslardır."] },
  { label: "δ⁺ H", title: "δ⁺: kısmi pozitif H", detail: ["O, ortak elektronları daha çok çeker; H kısmen pozitif kalır.", "δ⁺ net iyon yükü değildir, kısmi kutuptur.", "H₂S’de S–H bağı bu koşulu TYT örneklerinde sağlamaz."] },
  { label: "δ⁻ O ve çift", title: "δ⁻ O: alıcı ve elektron çifti", detail: ["Alıcı, ortaklanmamış elektron çifti taşıyan F, O veya N atomudur.", "Su hem verici (O–H) hem alıcı (O üzerindeki iki çift) olabilir.", "İdeal ağda bir su molekülü 4 temasa katılabilir; sıvıda her an 4 değildir."] },
];

const twoLines: FigureDef = {
  caption:
    "Soldaki su vericidir, sağdaki alıcıdır (şematik, ölçekli değil). Bir etikete tıkla: düz çizginin ve noktalı çizginin neyi gösterdiği ayrı açılır. Noktaları ikinci bir kovalent bağ gibi okuma.",
  alt: "İki su molekülü. Soldakinin sağa bakan O–H bağının H atomu, sağdaki molekülün O atomuna noktalı çizgiyle bağlanıyor. Kovalent bağ düz, hidrojen bağı noktalı.",
  picks: WATER_PARTS.map((p) => ({ label: p.label, title: p.title, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const on = (i: number): Tone => (pick === i ? "a" : "ink");
    const O1 = v(0, 0), H1 = v(-0.75, 0.75), H2 = v(1.0, 0);
    const O2 = v(3.0, 0), H3 = v(3.65, 0.75), H4 = v(3.65, -0.75);
    const els: El[] = [
      seg(O1, H1, { bold: true }),
      seg(O1, H2, { bold: true, tone: pick === 0 ? "a" : undefined }),
      seg(O2, H3, { bold: true }),
      seg(O2, H4, { bold: true }),
      seg(v(1.25, 0), v(2.7, 0), { dash: true, bold: true, tone: pick === 1 ? "a" : "warn" }),
      ball(O1, 0.32, "c", "O"),
      ball(O2, 0.32, "c", "O"),
      ball(H1, 0.2, "muted", "H"),
      ball(H2, 0.2, pick === 2 ? "a" : "muted", "H"),
      ball(H3, 0.2, "muted", "H"),
      ball(H4, 0.2, "muted", "H"),
      txt(v(0.5, -0.75), "kovalent O–H", "c", { small: true, tone: on(0), pick: 0 }),
      txt(v(1.95, 1.25), "H···O hidrojen bağı", "c", { small: true, tone: pick === 1 ? "a" : "warn", pick: 1 }),
      txt(v(1.0, 0.55), "δ⁺", "c", { tone: on(2), pick: 2 }),
      txt(v(2.5, -0.6), "δ⁻", "c", { tone: on(3), pick: 3 }),
      txt(v(0, -1.6), "Verici su", "c", { bold: true }),
      txt(v(3.2, -1.6), "Alıcı su", "c", { bold: true }),
      txt(v(-1.4, 1.4), " ", "c"),
      txt(v(4.4, -2.0), " ", "c"),
    ];
    return {
      els,
      readout: [
        pick >= 0 ? WATER_PARTS[pick].title : "Düz çizgi molekülün içinde, noktalar iki molekülün arasında.",
        "Isıtıp buharlaştırınca noktalı temaslar ayrılır; H₂O formülü korunur.",
      ],
    };
  },
};

// 2 · Saf sıvı ile karışım: verici ve alıcı ayrı sütunlarda.
type Row = { name: string; donor: boolean; acceptor: boolean; result: string; why: string[] };
const ROWS: Row[] = [
  { name: "CH₃OH", donor: true, acceptor: true, result: "kurar", why: ["CH₃–O–H: son H oksijene bağlı, verici var.", "Başka metanolün O’su elektron çifti taşır, alıcı var.", "Saf metanolde moleküller kendi aralarında H bağı kurar."] },
  { name: "CH₃OCH₃", donor: false, acceptor: true, result: "kurmaz", why: ["CH₃–O–CH₃: bütün H atomları C’ye bağlı, verici yok.", "Ortadaki O alıcı olabilir; ama iki eter molekülünde alıcıyı besleyecek verici eksik.", "Saf eterde kalıcı dipol ve London çekimi vardır, klasik TYT modelinde H bağı yoktur."] },
  { name: "H₂O + eter", donor: true, acceptor: true, result: "kurar", why: ["Verici suyun O–H grubudur.", "Alıcı eterin O’sudur: su H’si···eter O’su.", "Saf eterde olmayan verici, karışımda sudan gelir. Saf madde bulgusunu karışıma taşıma."] },
  { name: "CH₄", donor: false, acceptor: false, result: "kurmaz", why: ["Yalnız C–H bağları var; verici yok.", "C üzerinde ortaklanmamış elektron çifti yok; alıcı da yok.", "Metan molekülleri arasında London çekimi vardır."] },
  { name: "NH₃ + H₂O", donor: true, acceptor: true, result: "iki yön", why: ["NH₃’ün N–H’si···suyun O’su.", "Suyun O–H’si···NH₃’ün N’si.", "İki farklı tanecikte her yönü ayrı dene; verici ile alıcının aynı tür olması gerekmez."] },
];

const COLS = { name: 0, donor: 3.6, acceptor: 5.2, result: 6.9 };
const ROW_H = 0.85;

const pureVsMix: FigureDef = {
  caption:
    "Her satırda önce H’nin doğrudan bağlı olduğu atoma (verici), sonra elektron çifti taşıyan F, O veya N’ye (alıcı) bak. Bir taneciğin adına tıkla: gerekçe açılır. İkisi de varsa bağ kurulabilir.",
  alt: "Beş satırlık tablo: metanol verici ve alıcı taşır; dimetil eterde verici yok; su ve eter karışımında verici sudan gelir; metanda ikisi de yok; amonyak ve su karışımında iki yön mümkün.",
  picks: ROWS.map((r) => ({ label: r.name, title: `${r.name}: ${r.result}`, detail: r.why })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [
      txt(v(COLS.name, 0), "Tanecik", "e", { bold: true }),
      txt(v(COLS.donor, 0), "Verici", "c", { bold: true }),
      txt(v(COLS.acceptor, 0), "Alıcı", "c", { bold: true }),
      txt(v(COLS.result, 0), "Sonuç", "c", { bold: true }),
      seg(v(-0.2, -0.4), v(7.9, -0.4), { thin: true, tone: "muted" }),
    ];
    ROWS.forEach((r, i) => {
      const y = -(i + 1) * ROW_H;
      const sel = pick === i;
      if (sel) els.push(poly([v(-0.2, y + 0.38), v(7.9, y + 0.38), v(7.9, y - 0.38), v(-0.2, y - 0.38)], { fill: "a", thin: true, tone: "a" }));
      els.push(txt(v(COLS.name, y), r.name, "e", { bold: sel, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(COLS.donor, y), r.donor ? "✓" : "✗", "c", { tone: r.donor ? "c" : "warn", bold: true }));
      els.push(txt(v(COLS.acceptor, y), r.acceptor ? "✓" : "✗", "c", { tone: r.acceptor ? "c" : "warn", bold: true }));
      els.push(txt(v(COLS.result, y), r.result, "c", { tone: r.result === "kurmaz" ? "warn" : "c" }));
    });
    els.push(txt(v(-0.4, 0.5), " ", "c"), txt(v(8.1, -5.0), " ", "c"));
    const sel = pick >= 0 ? ROWS[pick] : undefined;
    return {
      els,
      readout: [
        sel ? `${sel.name}: ${sel.why[0]}` : "Bir taneciğin adına tıkla ya da aşağıdan seç.",
        "Saf eter vericiden yoksundur; suyla karışınca verici sudan gelir.",
      ],
    };
  },
};

// 3 · Kapalı formül aynı, yapı farklı: C₂H₆O.
const isomer: FigureDef = {
  caption:
    "Etanol ile dimetil eterin kapalı formülü aynı: C₂H₆O. Adımlarda atomları sayma yerine bağları aç. O–H yalnız etanolde var; saf eterde verici yoktur.",
  alt: "Üstte etanol C–C–O–H zinciri, altta dimetil eter C–O–C zinciri. Etanoldeki O–H bağı vurgulanıyor.",
  steps: ["Kapalı formül", "Etanolü aç", "Eteri aç"],
  draw: (_v, step) => {
    const els: El[] = [];
    const chain = (y: number, atoms: { s: string; tone: Tone }[], hot: number) => {
      atoms.forEach((a, i) => {
        const x = i * 1.4;
        if (i > 0) els.push(seg(v(x - 1.4 + 0.3, y), v(x - 0.3, y), { bold: true, tone: i === hot ? "a" : undefined }));
        els.push(ball(v(x, y), a.s === "H" ? 0.2 : 0.3, a.tone, a.s));
      });
    };
    if (step === 0) {
      els.push(txt(v(2.1, 0.4), "C₂H₆O", "c", { bold: true }));
      els.push(txt(v(2.1, -0.6), "2 C · 6 H · 1 O", "c", { small: true, tone: "muted" }));
      els.push(txt(v(2.1, -1.5), "Hangi H, hangi atoma bağlı?", "c", { small: true }));
    } else {
      chain(0.6, [{ s: "C", tone: "muted" }, { s: "C", tone: "muted" }, { s: "O", tone: "c" }, { s: "H", tone: step === 1 ? "a" : "muted" }], step === 1 ? 3 : -1);
      els.push(txt(v(-0.45, 0.6), "etanol", "w", { small: true, bold: step === 1 }));
      if (step === 1) els.push(txt(v(3.5, 1.3), "O–H: verici", "c", { small: true, tone: "a" }));
      if (step === 2) {
        chain(-1.2, [{ s: "C", tone: "muted" }, { s: "O", tone: "c" }, { s: "C", tone: "muted" }], -1);
        els.push(txt(v(-0.45, -1.2), "eter", "w", { small: true, bold: true }));
        els.push(txt(v(1.4, -1.95), "H’ler yalnız C’de: verici yok", "c", { small: true, tone: "warn" }));
      }
    }
    els.push(txt(v(-2.6, 1.7), " ", "c"), txt(v(4.6, -2.3), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "Atom sayısı iki yapıyı ayırmaz." : step === 1 ? "CH₃CH₂OH: O–H var, saf etanolde H bağı kurulur." : "CH₃OCH₃: O alıcı olabilir, ama saf eterde verici eksik.",
        "Yapı formülünü açmadan ‘aynı formül, aynı etkileşim’ deme.",
      ],
    };
  },
};

// 4 · Kaynama grafiği: 6A hidrürleri.
const BP = [
  { name: "H₂O", t: 100, e: 10 },
  { name: "H₂S", t: -60, e: 18 },
  { name: "H₂Se", t: -41.25, e: 36 },
  { name: "H₂Te", t: -2.2, e: 54 },
];
const X0 = 0, DX = 1.8, KY = 1 / 40;
const bx = (i: number) => X0 + i * DX;
const by = (t: number) => t * KY;

const boiling: FigureDef = {
  caption:
    "OGM tablosundaki normal kaynama sıcaklıkları (1 atm). Yatay eksen madde adlarıdır, sayısal aralık değildir. Adımlarda önce benzer üçlünün eğilimi, sonra suyun bu eğilimden ne kadar saptığı görünür.",
  alt: "Dikey eksen sıcaklık. H₂S −60, H₂Se −41,25, H₂Te −2,2 °C noktaları soldan sağa yükseliyor. Su 100 °C ile serinin çok üstünde. Kesikli çizgi yalnız üçlü eğilimi izlenseydi suyun yaklaşık −80 °C civarında beklenebileceğini gösteriyor.",
  steps: ["Benzer üçlü", "Eğilim izlenseydi", "Ölçülen su"],
  draw: (_v, step) => {
    const els: El[] = [];
    const ax = -1.7;
    els.push(vec(v(ax, by(-90)), v(ax, by(120)), { thin: true }));
    els.push(seg(v(ax, 0), v(bx(3) + 0.6, 0), { thin: true, dash: true, tone: "muted" }));
    for (const t of [-60, 0, 50, 100]) {
      els.push(seg(v(ax - 0.1, by(t)), v(ax + 0.1, by(t)), { thin: true }));
      els.push(txt(v(ax - 0.2, by(t)), fmtTr(t, 0), "w", { small: true, soft: true }));
    }
    els.push(txt(v(ax, by(120) + 0.3), "°C", "c", { small: true }));
    const tri = [1, 2, 3].map((i) => v(bx(i), by(BP[i].t)));
    els.push(poly(tri, { open: true, tone: "b" }));
    BP.forEach((b, i) => {
      if (i === 0 && step < 2) return;
      els.push(circle(v(bx(i), by(b.t)), 0.11, { tone: i === 0 ? "warn" : "b", fill: i === 0 ? "warn" : "b" }));
      els.push(txt(v(bx(i), by(-90) - 0.6), b.name, "c", { small: true, bold: true }));
      els.push(txt(i === 0 ? v(bx(0) + 0.25, by(b.t)) : v(bx(i), by(b.t) - 0.42), fmtTr(b.t, 2), i === 0 ? "e" : "c", { small: true, tone: i === 0 ? "warn" : "ink" }));
    });
    if (step < 2) els.push(txt(v(bx(0), by(-90) - 0.6), "H₂O", "c", { small: true, tone: "muted" }));
    if (step >= 1) {
      const expected = -60 - (-41.25 - -60);
      els.push(seg(v(bx(1), by(-60)), v(bx(0), by(expected)), { dash: true, tone: "muted" }));
      els.push(circle(v(bx(0), by(expected)), 0.1, { tone: "muted", dash: true }));
      els.push(txt(v(bx(0) + 0.25, by(expected) - 0.4), "≈ −80?", "e", { small: true, tone: "muted" }));
    }
    if (step === 2) els.push(vec(v(bx(0) - 0.35, by(-60)), v(bx(0) - 0.35, by(95)), { tone: "warn", thin: true }));
    els.push(txt(v(-2.9, by(125) + 0.4), " ", "c"), txt(v(bx(3) + 1.2, by(-90) - 1.0), " ", "c"));
    return {
      els,
      readout: [
        step === 0
          ? "H₂S < H₂Se < H₂Te: elektron sayısı 18 → 36 → 54; London katkısı artar. −2,2, −41,25’ten büyüktür."
          : step === 1
            ? "10 elektronlu su yalnız bu eğilimi izleseydi H₂S’nin altında beklenirdi (kesikli tahmin ölçüm değildir)."
            : "Ölçülen 100 °C: suyun O–H vericisi ve O alıcısı molekül arası H bağı ağı kurar. 100 − (−60) = 160 °C fark bağ enerjisi değildir.",
        "Önce aynı basınç ve benzer seri; sonra seriden sapan noktaya ek açıklama ara.",
      ],
    };
  },
};

// 5 · Temas sayımı: her bağ iki uçla sayılır.
const counting: FigureDef = {
  caption:
    "Sınır etkisi olmayan ideal bir ağda her molekül 4 komşusuyla birer bağ kursun. Molekül sayısını değiştir: uç sayısı ile ayrı bağ sayısını karşılaştır. Gerçek sıvıda her molekül her an 4 bağ yapmaz.",
  alt: "İki çubuk. Üstteki toplam bağ ucu 4n, alttaki ayrı bağ sayısı 2n. Çubuklar n arttıkça uzuyor; alttaki daima üsttekinin yarısı.",
  param: { label: "Molekül sayısı n", min: 4, max: 30, step: 2, init: 20, unit: "", plain: true },
  draw: (n) => {
    const ends = n * 4, bonds = n * 2;
    const K = 0.07;
    const els: El[] = [
      poly([v(0, 0.9), v(ends * K, 0.9), v(ends * K, 0.3), v(0, 0.3)], { fill: "b", tone: "b" }),
      poly([v(0, -0.5), v(bonds * K, -0.5), v(bonds * K, -1.1), v(0, -1.1)], { fill: "c", tone: "c" }),
      txt(v(-0.2, 0.6), "uç", "w", { bold: true }),
      txt(v(-0.2, -0.8), "bağ", "w", { bold: true }),
      txt(v(ends * K + 0.2, 0.6), `${n} × 4 = ${ends}`, "e", { small: true }),
      txt(v(bonds * K + 0.2, -0.8), `${ends} ÷ 2 = ${bonds}`, "e", { small: true }),
      txt(v(-1.2, 1.5), " ", "c"),
      txt(v(30 * 4 * K + 3.2, -1.6), " ", "c"),
    ];
    return {
      els,
      readout: [
        `${n} molekül × 4 temas = ${ends} bağ ucu; her bağın iki ucu olduğundan ${bonds} ayrı bağ.`,
        `Ters kontrol: ${bonds} × 2 = ${ends}; ${ends} ÷ ${n} = 4 temas/molekül. Bağ sayısı × tek bağ enerjisi kaynama sıcaklığını vermez.`,
      ],
    };
  },
};

// 6 · Buz ve sıvı su: aynı kütle, farklı hacim.
const density: FigureDef = {
  caption:
    "Aynı kütlede buz (model d = 0,92 g/mL) ile sıvı su (d = 1,00 g/mL). Kütleyi değiştir: V = m/d ile iki hacim hesaplanır. Buzun açık H bağı ağı aynı kütleyi daha büyük hacme yerleştirir; erime H₂O’yu atomlara ayırmaz.",
  alt: "Yan yana iki sütun: solda buz, sağda sıvı su. Buz sütunu her kütlede sıvı sütunundan yaklaşık yüzde 8,7 daha uzun.",
  param: { label: "Kütle m", min: 10, max: 100, step: 2, init: 46, unit: " g", plain: true },
  draw: (m) => {
    const vi = m / 0.92, vl = m / 1.0;
    const K = 0.028;
    const col = (x: number, h: number, tone: Tone) =>
      poly([v(x - 0.6, 0), v(x + 0.6, 0), v(x + 0.6, h), v(x - 0.6, h)], { fill: tone, tone });
    const els: El[] = [
      seg(v(-1.2, 0), v(4.2, 0), { thin: true }),
      col(0, vi * K, "b"),
      col(3, vl * K, "c"),
      txt(v(0, -0.35), "buz", "c", { bold: true }),
      txt(v(3, -0.35), "sıvı", "c", { bold: true }),
      txt(v(0, vi * K + 0.3), `${fmtTr(vi, 2)} mL`, "c", { small: true }),
      txt(v(3, vl * K + 0.3), `${fmtTr(vl, 2)} mL`, "c", { small: true }),
      seg(v(0.6, vl * K), v(2.4, vl * K), { dash: true, thin: true, tone: "muted" }),
      txt(v(-1.6, 3.6), " ", "c"),
      txt(v(4.6, -0.8), " ", "c"),
    ];
    return {
      els,
      readout: [
        `Buz: ${m}/0,92 = ${fmtTr(vi, 2)} mL · sıvı: ${m}/1,00 = ${fmtTr(vl, 2)} mL · fark ${fmtTr(vi - vl, 2)} mL (≈ %8,7).`,
        "Aynı kütlede büyük hacim → küçük yoğunluk; buz sıvı suda yüzer. Molekülün kimliği değişmez.",
      ],
    };
  },
};

export const chemistryFiguresHbond: Record<string, Record<string, FigureDef>> = {
  "hidrojen-bagi": {
    "İki çizgiyi iki farklı anlamla oku": twoLines,
    "Saf sıvı ile karışımı ayrı incele": pureVsMix,
    "Kapalı formül yapının yerine geçmez": isomer,
    "Tek temas ile yaygın ağın etkisi": counting,
    "Kaynama grafiğinde koşullu sapmayı gör": boiling,
    "Buzdan biyolojik yapılara aktar": density,
  },
};
