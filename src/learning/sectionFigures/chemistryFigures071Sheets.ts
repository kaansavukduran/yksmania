import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, PL, R, T, mk, table } from "./biologyFigures060Kit";

/*
 * Forge071: dört AYT Kimya kopya kâğıdı (Kimyasal tepkimelerde hız, Denge
 * hesaplamaları, Dengeye etki eden faktörler: derişim etkisi, Molarite ve
 * iyon derişimi) özgün etkileşimli figürlerle. Her figür dersin daha önce
 * çizimi olmayan, ders sayfasında görünen bir bölümüne bağlıdır ve dersin
 * laboratuvarını (r = 2[A]²[B] ilk hız sürgüleri, X₂ ⇌ 2X tablo gezgini,
 * X + Y ⇌ XY ekleme/hacim gezgini, CaCl₂ + NaCl karışım gezgini) tekrarlamaz.
 * Bütün sayılar çizimle aynı hesaptan gelir; derişimler M (mol/L), basınçlar
 * atm, hızlar M/s birimindedir ve sıcaklık her figürde sabit kabul edilir.
 * Senaryolar bu dosya için kurulmuş öğretim örnekleridir; kâğıtların
 * cümleleri kopyalanmadı. ÖSYM atıfları yalnız yıl, oturum ve soru numarasıyla
 * verilir ve depodaki src/learning/osym kayıtlarıyla eşleşir. Sürgü, adım ve
 * seçim öğrenme kaydı üretmez.
 */

/** Sabit ondalıklı Türkçe sayı; negatifte gerçek eksi işareti. */
const fx = (x: number, d = 2) => {
  const s = (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",");
  return s.startsWith("-") ? `−${s.slice(1)}` : s;
};
const sgn = (x: number, d = 2) => (x > 0 ? `+${fx(x, d)}` : fx(x, d));
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(x) ? x : lo));
/** Sürgü değerini aralığa ve adıma oturtur. */
const snap = (x: number, lo: number, hi: number, step: number) => {
  const k = Math.round((clamp(x, lo, hi) - lo) / step);
  return Number((lo + k * step).toFixed(6));
};
/** Yatay çubuk: etiket solda, değer sabit sütunda. */
const hbar = (y: number, label: string, x0: number, len: number, value: string, tone: Tone, vx: number, o: { dash?: boolean; h?: number } = {}): El[] => {
  const h = o.h ?? 18;
  const els: El[] = [T(14, y, label, "e", { bold: true }), T(vx, y, value, "e", { tone })];
  if (len > 0.5) els.push(R(x0, y - h / 2, x0 + len, y + h / 2, { tone, fill: o.dash ? undefined : tone, dash: o.dash }));
  else els.push(L(x0, y - h / 2, x0, y + h / 2, { tone, thin: true }));
  return els;
};

/* =====================================================================
 * 018 Kimyasal tepkimelerde hız
 * ===================================================================== */

// A → C, sabit hacim: [A] 4 s'de 0,80 M'den 0,20 M'ye.
const RATE_STEPS = ["İki ölçüm", "İmzalı değişim", "Pozitif hız", "Birim çevir"];
const changeFigure = mk({
  caption:
    "Aynı dönüşümün iki gözlemi: A → C tepkimesinde, sabit hacimde, 0 s ve 4 s ölçümleri. İleri ile önce imzalı değişimi, sonra pozitif harcanma ve oluşum hızını, en son birim çevirmeyi aç. Giren azalırken Δ eksidir; hızın büyüklüğü artı yazılır.",
  alt: "İki grup dikey çubuk. Solda t = 0 s: A çubuğu 0,80 M, C çubuğu 0. Sağda t = 4 s: A çubuğu 0,20 M, C çubuğu 0,60 M. Gruplar arasında üstte Δt = 4 s oku. Adımlarda çubukların altına değişim, hız ve birim satırları eklenir.",
  h: 372,
  steps: RATE_STEPS,
  draw: (_v, step) => {
    const base = 200;
    const H = (c: number) => c * 150;
    const col = (x: number, c: number, name: string, tone: Tone): El[] => {
      const els: El[] = [T(x, base + 22, name, "c", { bold: true })];
      if (c > 0) els.push(R(x - 24, base - H(c), x + 24, base, { tone, fill: tone }));
      els.push(T(x, base - H(c) - 18, `${fx(c)} M`, "c", { tone }));
      return els;
    };
    const els: El[] = [
      L(40, base, 490, base, { thin: true }),
      ...col(100, 0.8, "A", "b"),
      ...col(170, 0, "C", "a"),
      ...col(330, 0.2, "A", "b"),
      ...col(400, 0.6, "C", "a"),
      T(135, base + 56, "t = 0 s", "c", { tone: "muted" }),
      T(365, base + 56, "t = 4 s", "c", { tone: "muted" }),
      A(200, 40, 300, 40, "ink", { thin: true }),
      T(250, 16, "Δt = 4 s", "c"),
    ];
    if (step >= 1) els.push(T(266, 290, "Δ[A] = 0,20 − 0,80 = −0,60 M", "c", { tone: "b" }), T(266, 322, "Δ[C] = 0,60 − 0 = +0,60 M", "c", { tone: "a" }));
    if (step >= 2) els.push(T(266, 354, step >= 3 ? "0,15 M/s × 60 s/dk = 9,0 M/dk" : "hız = 0,60 M / 4 s = 0,15 M/s", "c", { bold: true }));
    const readout =
      [
        ["İki ölçüm aynı kaptan: 0 s'de [A] = 0,80 M, 4 s'de 0,20 M; C başta yoktur.", "Önce hangi türün hızının sorulduğunu ve zaman birimini yaz."],
        ["İmzalı değişim son − ilk: A için −0,60 M, C için +0,60 M.", "Eksi işaret azalmayı gösterir; eksi hız diye bir şey yazılmaz."],
        ["Harcanma hızı −Δ[A]/Δt = 0,60/4 = 0,15 M/s; oluşum hızı Δ[C]/Δt = 0,15 M/s.", "Katsayılar 1 : 1 olduğundan iki tür hızı eşittir; katsayı farklıysa eşitlik bozulur."],
        ["1 dk = 60 s: 0,15 M/s = 0,15 × 60 = 9,0 M/dk.", "Anlamlı basamak verideki kadar kalır: iki basamak, 9,0 M/dk."],
      ][step] ?? [];
    return { els, readout };
  },
});

// N₂ + 3H₂ → 2NH₃, sabit hacim; N₂ harcanma hızı sürgüyle.
const coefFigure = mk({
  caption:
    "N₂ + 3H₂ → 2NH₃ tepkimesinde üç türün hızı tek bir ortak hıza bağlıdır. Sürgüyle azotun harcanma hızını değiştir: hidrojen her zaman 3 katı, amonyak 2 katı hızla değişir; her tür hızını kendi katsayısına bölünce aynı r bulunur.",
  alt: "Üstte denklem. Altında dört yatay çubuk: N₂ harcanma, H₂ harcanma, NH₃ oluşum ve ortak r. Çubuk boyları M/s değerleriyle orantılı; değerler sağ sütunda yazılı.",
  h: 270,
  param: { label: "N₂ harcanma hızı", min: 0.01, max: 0.05, step: 0.01, init: 0.02, unit: "M/s" },
  draw: (raw) => {
    const v = snap(raw === 0 ? 0.02 : raw, 0.01, 0.05, 0.01);
    const k = 1300;
    const rows: [string, number, Tone][] = [
      ["N₂ harcanma", v, "b"],
      ["H₂ harcanma", 3 * v, "b"],
      ["NH₃ oluşum", 2 * v, "a"],
      ["ortak r", v, "c"],
    ];
    const els: El[] = [T(266, 24, "N₂ + 3H₂ → 2NH₃", "c", { bold: true })];
    rows.forEach(([label, val, tone], i) => els.push(...hbar(80 + i * 52, label, 170, val * k, `${fx(val, 3)} M/s`, tone, 380)));
    return {
      els,
      readout: [
        `r = −Δ[N₂]/Δt = −(1/3)Δ[H₂]/Δt = (1/2)Δ[NH₃]/Δt = ${fx(v, 3)} M/s.`,
        `H₂ harcanma ${fx(3 * v, 3)} M/s, NH₃ oluşum ${fx(2 * v, 3)} M/s; oran 1 : 3 : 2 sürgüden bağımsızdır.`,
        "2024 AYT Fen 20 mantığı: 2N₂O₅ → 4NO₂ + O₂ için NO₂ oluşumu N₂O₅ harcanmasının 2 katıdır, O₂ oluşumu ortak hıza eşittir.",
      ],
    };
  },
});

// r = k[A]ⁿ; her mertebede k, [A] = 0,10 M'de r = 0,004 M/s verecek biçimde seçildi.
const ORDERS = [
  { label: "0. mertebe", unit: "k: M/s", k: "0,004 M/s", detail: ["k = r/[A]⁰ = r: birimi M/s.", "Derişim değişse de hız aynı kalır: ×1, ×1."] },
  { label: "1. mertebe", unit: "k: s⁻¹", k: "0,04 s⁻¹", detail: ["k = r/[A]: (M/s)/M = s⁻¹.", "Derişim 2 katına çıkınca hız 2, 3 katında 3 katına çıkar."] },
  { label: "2. mertebe", unit: "k: L/(mol·s)", k: "0,4 L/(mol·s)", detail: ["k = r/[A]²: (M/s)/M² = M⁻¹·s⁻¹ = L/(mol·s).", "Derişim 2 katında hız 4, 3 katında 9 katına çıkar."] },
  { label: "3. mertebe", unit: "k: L²/(mol²·s)", k: "4 L²/(mol²·s)", detail: ["k = r/[A]³: (M/s)/M³ = M⁻²·s⁻¹ = L²/(mol²·s).", "Derişim 2 katında hız 8, 3 katında 27 katına çıkar."] },
];
const orderFigure = mk({
  caption:
    "Mertebe, k'nın birimini ve derişime duyarlılığı birlikte belirler. Bir mertebeye dokun: r = k[A]ⁿ'de k = r/[A]ⁿ olduğundan birim M/s'nin Mⁿ'ye bölümüdür; aynı derişim artışı hızı 2ⁿ ve 3ⁿ katına çıkarır.",
  alt: "Solda alt alta dört mertebe adı ve k birimleri. Sağda seçilen mertebe için [A] = 0,10, 0,20 ve 0,30 M'deki hızları gösteren üç dikey çubuk; çubukların üstünde kat sayıları yazılıdır.",
  h: 304,
  picks: ORDERS.map((o) => ({ label: o.label, title: `${o.label}: ${o.unit}`, detail: o.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [];
    ORDERS.forEach((o, i) => {
      const y = 30 + i * 72;
      els.push(T(14, y, o.label, "e", { bold: true, tone: pick === i ? "a" : "ink", pick: i }), T(14, y + 36, o.unit, "e", { tone: pick === i ? "a" : "muted" }));
    });
    const o = ORDERS[pick];
    const base = 236;
    els.push(L(250, base, 510, base, { thin: true }));
    [0.1, 0.2, 0.3].forEach((c, j) => {
      const x = 290 + j * 90;
      els.push(T(x, base + 24, `${fx(c)} M`, "c", { tone: "muted" }));
      if (o) {
        const n = pick;
        const f = (c / 0.1) ** n;
        const h = (f / 3 ** n) * 150;
        els.push(R(x - 22, base - h, x + 22, base, { tone: "a", fill: "a" }), T(x, base - h - 18, `×${Math.round(f)}`, "c", { tone: "a", bold: true }));
      }
    });
    els.push(T(380, 24, o ? "r = k[A]ⁿ" : "bir mertebe seç", "c", { tone: o ? "ink" : "muted" }));
    return {
      els,
      readout: o
        ? [`${o.label}: ${o.detail.join(" ")}`, `[A] = 0,10 M'de r = 0,004 M/s ise k = ${o.k}.`]
        : ["Bir mertebeye dokun: k birimi ve hızın derişimle nasıl büyüdüğü birlikte açılır.", "Mertebe denklemin katsayısından değil deneyden gelir."],
    };
  },
});

const MECH_STEPS = ["Adımlar", "Topla", "Ara ürün", "Hız yasası"];
const mechanismFigure = mk({
  caption:
    "Net denklem ile elementer adımlar ayrı bilgilerdir. İleri ile iki adımı topla, ara ürünü bul ve hız yasasını yavaş adımdan kur: net denklemde ICl katsayısı 2 iken hız yasasında ICl üssü 1 olur.",
  alt: "Üstte iki elementer adım alt alta: yavaş H₂ + ICl → HI + HCl ve hızlı HI + ICl → I₂ + HCl. Altında yatay toplama çizgisi ve net denklem; adımlarda ara ürün notu ve r = k[H₂][ICl] yasası eklenir.",
  h: 310,
  steps: MECH_STEPS,
  draw: (_v, step) => {
    const els: El[] = [
      T(24, 36, "1) H₂ + ICl → HI + HCl", "e", { tone: step >= 3 ? "a" : "ink", bold: step >= 3 }),
      T(510, 36, "yavaş", "w", { tone: step >= 3 ? "a" : "muted" }),
      T(24, 86, "2) HI + ICl → I₂ + HCl", "e"),
      T(510, 86, "hızlı", "w", { tone: "muted" }),
    ];
    if (step >= 1) els.push(L(24, 116, 508, 116, { thin: true }), T(24, 146, "Net: H₂ + 2ICl → I₂ + 2HCl", "e", { bold: true }));
    if (step >= 2) els.push(T(24, 196, "HI: 1. adımda oluşur, 2. adımda harcanır", "e", { tone: "b" }));
    if (step >= 3) els.push(T(24, 246, "r = k[H₂][ICl]", "e", { tone: "a", bold: true }), T(24, 282, "ICl üssü 1, net katsayısı 2", "e", { tone: "warn" }));
    const readout =
      [
        ["İki elementer adım verildi: birincisi yavaş, ikincisi hızlı.", "Elementer adımın molekülerliği o olayda çarpışan tanecik sayısıdır."],
        ["Adımları taraf tarafa topla, iki tarafta da görünen türü sadeleştir: H₂ + 2ICl → I₂ + 2HCl.", "Net denklem yalnız başlangıç ve son maddeleri söyler."],
        ["HI bir adımda oluşup sonraki adımda harcandığı için ara üründür; net denklemde görünmez.", "Ara ürün, tepe noktasındaki geçiş durumuyla aynı kavram değildir."],
        ["Hızı yavaş adım belirler: r = k[H₂][ICl]; toplam mertebe 2.", "Net katsayılardan r = k[H₂][ICl]² yazmak ilk yanlış adımdır; üs deneyden ya da verilen elementer adımdan gelir."],
      ][step] ?? [];
    return { els, readout };
  },
});

/* =====================================================================
 * 020 Denge hesaplamaları
 * ===================================================================== */

// Sabit mollerle iki denge karışımı; yalnız hacim değişiyor.
const volumeFigure = mk({
  caption:
    "Mol ile derişim aynı şey değildir. İki kapta mol sayıları sabit, yalnız hacim değişiyor: H₂ + I₂ ⇌ 2HI için 0,20, 0,20 ve 0,40 mol; N₂O₄ ⇌ 2NO₂ için 0,20 ve 0,40 mol. Sürgüyle hacmi değiştir: gaz katsayı toplamı eşitse V sadeleşir, değilse bağıntıda bir V kalır.",
  alt: "Üstte genişliği hacimle büyüyen bir kap dikdörtgeni ve V değeri. Altında iki yatay çubuk: H₂ + I₂ ⇌ 2HI karışımının Q değeri ve N₂O₄ ⇌ 2NO₂ karışımının Q değeri; çubuk boyları Q ile orantılı.",
  h: 300,
  param: { label: "Kap hacmi V", min: 0.5, max: 4, step: 0.5, init: 2, unit: "L" },
  draw: (raw) => {
    const V = snap(raw === 0 ? 2 : raw, 0.5, 4, 0.5);
    const q1 = (0.4 / V) ** 2 / ((0.2 / V) * (0.2 / V));
    const q2 = (0.4 / V) ** 2 / (0.2 / V);
    const w = V * 70;
    const els: El[] = [
      R(14, 30, 14 + w, 96, { tone: "ink" }),
      T(28 + w, 63, `V = ${fx(V, 1)} L`, "e", { bold: true }),
      T(14, 140, "H₂ + I₂ ⇌ 2HI", "e", { bold: true }),
      ...barOnly(14, 176, q1 * 60, "a"),
      T(14 + q1 * 60 + 12, 176, `Q = ${fx(q1)}`, "e", { tone: "a" }),
      T(14, 228, "N₂O₄ ⇌ 2NO₂", "e", { bold: true }),
      ...barOnly(14, 264, q2 * 60, "b"),
      T(14 + q2 * 60 + 12, 264, `Q = ${fx(q2)}`, "e", { tone: "b" }),
    ];
    return {
      els,
      readout: [
        `[HI] = 0,40/${fx(V, 1)} = ${fx(0.4 / V, 3)} M, [H₂] = [I₂] = ${fx(0.2 / V, 3)} M: Q = ${fx(q1)} (Δn = 0, V sadeleşir).`,
        `[NO₂] = ${fx(0.4 / V, 3)} M, [N₂O₄] = ${fx(0.2 / V, 3)} M: Q = (0,40)²/(0,20 × V) = 0,80/V = ${fx(q2)} (Δn = 1).`,
        "Molleri doğrudan bağıntıya yazmak yalnız Δn = 0 iken aynı sonucu verir; 2 L'de 0,50 mol tür 0,25 M'dir.",
      ],
    };
  },
});
function barOnly(x0: number, y: number, len: number, tone: Tone): El[] {
  return len > 0.5 ? [R(x0, y - 10, x0 + len, y + 10, { tone, fill: tone })] : [L(x0, y - 10, x0, y + 10, { tone, thin: true })];
}

// Ni(k) + 4CO(g) ⇌ Ni(CO)₄(g); başta yalnız CO, 2,5 atm; sabit T ve V.
const extentFigure = mk({
  caption:
    "Tek ilerleme, bütün türler: Ni(k) + 4CO(g) ⇌ Ni(CO)₄(g) tepkimesinde başta yalnız 2,5 atm CO var. Sürgüyle ilerlemeyi (x atm ürün) değiştir: CO 4x azalır, ürün x artar, toplam 3x düşer. Toplam 1,0 atm ölçüldüğünde x = 0,50 atm olur; katı nikel bağıntıya girmez.",
  alt: "Üstte denklem. Altında üç yatay çubuk: CO kısmi basıncı, Ni(CO)₄ kısmi basıncı ve toplam basınç; değerler sağ sütunda. Toplam çubuğunun üzerinde 1,0 atm ölçüm çizgisi ve etiketi var.",
  h: 280,
  param: { label: "İlerleme x", min: 0, max: 0.6, step: 0.05, init: 0.3, unit: "atm" },
  draw: (raw) => {
    const x = snap(raw, 0, 0.6, 0.05);
    const co = 2.5 - 4 * x;
    const tot = 2.5 - 3 * x;
    const k = 100;
    const x0 = 160;
    const q = co > 0 ? x / co ** 4 : Infinity;
    const els: El[] = [
      T(266, 24, "Ni(k) + 4CO(g) ⇌ Ni(CO)₄(g)", "c", { bold: true }),
      ...hbar(84, "p(CO)", x0, co * k, `${fx(co)} atm`, "b", 430),
      ...hbar(144, "p(Ni(CO)₄)", x0, x * k, `${fx(x)} atm`, "a", 430),
      ...hbar(204, "toplam", x0, tot * k, `${fx(tot)} atm`, "ink", 430),
      L(x0 + k, 184, x0 + k, 224, { tone: "warn", dash: true }),
      T(x0 + k, 248, "ölçülen 1,0 atm", "c", { tone: "warn" }),
    ];
    return {
      els,
      readout: [
        `CO: 2,5 − 4 × ${fx(x)} = ${fx(co)} atm; Ni(CO)₄: ${fx(x)} atm; toplam 2,5 − 3 × ${fx(x)} = ${fx(tot)} atm.`,
        Math.abs(x - 0.5) < 1e-9
          ? "Toplam 1,0 atm: x = 0,50 atm. Kp = 0,50/(0,50)⁴ = 8; Ni(k) bağıntıda yoktur."
          : `Bu ilerlemede Qp = ${fx(x)}/(${fx(co)})⁴ ≈ ${q < 100 ? fx(q) : "100'den büyük"}; toplam 1,0 atm değil, denge değeri bu x değildir.`,
        "2026 AYT Fen 22 mantığı: toplam basınçtaki değişim gaz katsayı farkıyla ilerlemeye bağlanır.",
      ],
    };
  },
});

// X₂ ⇌ 2X, 1 L, başta 1 mol X₂, Kc = 1; doğru kök 4x² + x − 1 = 0'dan.
const ROOT = (-1 + Math.sqrt(17)) / 8;
const CANDS = [
  { label: "X₂ 0,61 · X 0,78", d: 1 - ROOT, m: 2 * ROOT, title: "İki testten de geçer", detail: ["K = 0,781²/0,610 ≈ 1,00; atom stoku 2 × 0,610 + 0,781 ≈ 2,00 mol.", "4x² + x − 1 = 0'ın pozitif kökü x ≈ 0,390: hem denge hem korunum sağlanır."] },
  { label: "X₂ 0,25 · X 0,50", d: 0.25, m: 0.5, title: "K uyar, stok uymaz", detail: ["K = 0,50²/0,25 = 1,00 tutar.", "Atom stoku 2 × 0,25 + 0,50 = 1,00 mol; başta 2 mol X atomu vardı. Atom yok olamaz."] },
  { label: "X₂ 0,80 · X 0,40", d: 0.8, m: 0.4, title: "Stok uyar, K uymaz", detail: ["Atom stoku 2 × 0,80 + 0,40 = 2,00 mol tutar.", "K = 0,40²/0,80 = 0,20 ≠ 1: bu karışım dengede değildir, ileri yönde ilerler."] },
];
const stockFigure = mk({
  caption:
    "İki bağımsız test: 1 L kapta başta 1 mol X₂ var, X₂ ⇌ 2X için Kc = 1. Bir adaya dokun: doğru denge karışımı hem K bağıntısını hem X atomu stokunu (2n(X₂) + n(X) = 2 mol) sağlar. Tek testi geçen aday çözüm değildir.",
  alt: "Üç satırlık karşılaştırma tablosu. Her satırda aday karışımın X₂ ve X mol değerleri, K testi sütununda hesaplanan K, atom stoku sütununda 2n(X₂) + n(X) değeri ve uyar ya da uymaz yazısı.",
  h: 250,
  picks: CANDS.map((c) => ({ label: c.label, title: c.title, detail: c.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [
      T(14, 26, "Aday (mol)", "e", { tone: "muted" }),
      T(300, 26, "K testi", "c", { tone: "muted" }),
      T(450, 26, "Atom stoku", "c", { tone: "muted" }),
      L(14, 48, 518, 48, { thin: true, tone: "muted" }),
    ];
    CANDS.forEach((c, i) => {
      const y = 84 + i * 58;
      const K = c.m ** 2 / c.d;
      const at = 2 * c.d + c.m;
      const kOk = Math.abs(K - 1) < 0.01;
      const aOk = Math.abs(at - 2) < 0.01;
      const on = pick === i;
      els.push(
        T(14, y, c.label, "e", { bold: true, tone: on ? "a" : "ink", pick: i }),
        T(300, y, `${fx(K)} ${kOk ? "uyar" : "uymaz"}`, "c", { tone: kOk ? "a" : "warn", bold: on }),
        T(450, y, `${fx(at)} ${aOk ? "uyar" : "uymaz"}`, "c", { tone: aOk ? "a" : "warn", bold: on }),
      );
    });
    els.push(T(266, 236, "K = [X]²/[X₂] · stok = 2n(X₂) + n(X)", "c", { tone: "muted" }));
    const c = CANDS[pick];
    return {
      els,
      readout: c
        ? [`${c.title}: ${c.detail.join(" ")}`]
        : ["Bir adaya dokun: hesap sonucunu iki ayrı denetimle sına.", "Doğru kök 0 ≤ x ≤ 1 aralığındadır; negatif kök başta olmayan X'i tüketmeye çalışır."],
    };
  },
});

// A ⇌ B, K = 2, [A]₀ = 0,10 M; [B]₀ sürgüyle.
const directionFigure = mk({
  caption:
    "Q yönü söyler, stok son değerleri sınırlar. A ⇌ B için K = 2 ve başta [A] = 0,10 M. Sürgüyle başlangıç [B] değerini değiştir: Q > K ise net geri, Q < K ise net ileri. Hangi yönde olursa olsun A + B toplamı korunur ve dengede B = 2A olur.",
  alt: "Üstte Q sayı doğrusu: K = 2 işaretli, seçilen Q noktası ve noktadan K'ye doğru net yön oku. Altta iki yığılmış çubuk: başlangıç ve denge; her çubukta A ve B parçaları, altlarında derişimleri.",
  h: 340,
  param: { label: "Başlangıç [B]", min: 0, max: 0.6, step: 0.05, init: 0.5, unit: "M" },
  draw: (raw) => {
    const b = snap(raw, 0, 0.6, 0.05);
    const a = 0.1;
    const Q = b / a;
    const tot = a + b;
    const af = tot / 3;
    const bf = (2 * tot) / 3;
    const X = (q: number) => 60 + q * 70;
    const k = 500;
    const stack = (y: number, A0: number, B0: number): El[] => [
      R(120, y - 12, 120 + A0 * k, y + 12, { tone: "b", fill: "b" }),
      ...(B0 > 0.001 ? [R(120 + A0 * k, y - 12, 120 + (A0 + B0) * k, y + 12, { tone: "a", fill: "a" })] : []),
    ];
    const eq = Math.abs(Q - 2) < 1e-9;
    const els: El[] = [
      L(40, 60, 490, 60, { thin: true }),
      L(X(2), 48, X(2), 72, { tone: "c", bold: true }),
      T(X(2), 28, "K = 2", "c", { tone: "c", bold: true }),
      C(X(Q), 60, 6, { tone: "a", fill: "a" }),
      T(X(Q), 94, `Q = ${fx(Q, 1)}`, "c", { tone: "a" }),
      T(14, 200, "Başta", "e", { bold: true }),
      ...stack(200, a, b),
      T(120, 234, `A ${fx(a)} · B ${fx(b)} M`, "e", { tone: "muted" }),
      T(14, 280, "Dengede", "e", { bold: true }),
      ...stack(280, af, bf),
      T(120, 314, `A ${fx(af, 3)} · B ${fx(bf, 3)} M`, "e", { tone: "muted" }),
    ];
    if (!eq) {
      const from = X(Q);
      const to = X(2);
      els.push(A(from, 130, to + (from > to ? 10 : -10), 130, "warn", { bold: true }), T((from + to) / 2, 156, Q > 2 ? "net geri" : "net ileri", "c", { tone: "warn", bold: true }));
    } else els.push(T(X(2), 140, "Q = K: denge", "c", { tone: "warn", bold: true }));
    return {
      els,
      readout: [
        `Q = [B]/[A] = ${fx(b)}/0,10 = ${fx(Q, 1)}; K = 2: ${eq ? "karışım zaten dengede." : Q > 2 ? "Q > K, net geri (B → A)." : "Q < K, net ileri (A → B)."}`,
        `A + B = ${fx(tot)} M korunur; dengede B/A = 2: A = ${fx(af, 3)} M, B = ${fx(bf, 3)} M.`,
        "Yön tek başına son miktarı vermez; korunan toplam ve hiçbir türün eksiye düşmemesi gerekir.",
      ],
    };
  },
});

/* =====================================================================
 * 021 Dengeye etki eden faktörler: derişim etkisi
 * ===================================================================== */

// A ⇌ B, K = 4: eski denge 0,20/0,80; A 0,40'a çıkarıldı; yeni denge 0,24/0,96.
const PHOTO_STEPS = ["Eski denge", "Ekleme anı", "Net dönüşüm", "Yeni denge"];
const photoFigure = mk({
  caption:
    "Üç fotoğraf, tek deney: A ⇌ B için K = 4, sabit sıcaklık ve hacim. İleri ile eski dengeyi, A eklendiği anı, net dönüşümü ve yeni dengeyi sırayla aç. Eğrinin zamana göre biçimi şematiktir; sayılar ise K = 4 hesabından gelir.",
  alt: "Derişim–zaman grafiği. A 0,20 M'de, B 0,80 M'de yatay başlar. Kesik dikey çizgide A 0,40 M'ye sıçrar; ardından A azalıp B artarak yeni yatay değerlere, A 0,24 M ve B 0,96 M'ye ulaşır.",
  h: 290,
  steps: PHOTO_STEPS,
  draw: (_v, step) => {
    const Y = (c: number) => 250 - c * 180;
    const tJ = 150;
    const tE = 330;
    const curve = (c0: number, c1: number) =>
      Array.from({ length: 13 }, (_, i): [number, number] => {
        const s = i / 12;
        const f = 1 - Math.exp(-3.2 * s);
        return [tJ + (tE - tJ) * s, Y(c0 + ((c1 - c0) * f) / (1 - Math.exp(-3.2)))];
      });
    const els: El[] = [
      A(60, 250, 520, 250, "ink", { thin: true }),
      A(60, 250, 60, 40, "ink", { thin: true }),
      T(70, 22, "derişim (M)", "e", { tone: "muted" }),
      T(518, 272, "zaman", "w", { tone: "muted" }),
      L(60, Y(0.2), tJ, Y(0.2), { tone: "b", bold: true }),
      L(60, Y(0.8), tJ, Y(0.8), { tone: "a", bold: true }),
      T(72, Y(0.2) - 20, "A 0,20", "e", { tone: "b" }),
      T(72, Y(0.8) - 20, "B 0,80", "e", { tone: "a" }),
    ];
    if (step >= 1) els.push(L(tJ, 50, tJ, 250, { tone: "muted", dash: true, thin: true }), L(tJ, Y(0.2), tJ, Y(0.4), { tone: "b", bold: true }), T(tJ + 10, 58, "A eklendi", "e", { tone: "muted" }));
    if (step >= 2) els.push(PL(curve(0.4, 0.24), { open: true, tone: "b", bold: true }), PL(curve(0.8, 0.96), { open: true, tone: "a", bold: true }));
    if (step >= 3)
      els.push(
        L(tE, Y(0.24), 500, Y(0.24), { tone: "b", bold: true }),
        L(tE, Y(0.96), 500, Y(0.96), { tone: "a", bold: true }),
        T(500, Y(0.24) - 20, "A 0,24", "w", { tone: "b", bold: true }),
        T(500, Y(0.96) + 22, "B 0,96", "w", { tone: "a", bold: true }),
      );
    const readout =
      [
        ["Eski denge: [A] = 0,20 M, [B] = 0,80 M; Q = 0,80/0,20 = 4 = K.", "Denge, derişimlerin eşit olması değil zamanla değişmemesidir."],
        ["Ekleme anı: yalnız A sıçrar, [A] = 0,40 M; B aynı kalır. Q = 0,80/0,40 = 2 < 4.", "Dikey sıçrama dış müdahaledir, tepkime değildir."],
        ["Net ileri: A x azalır, B x artar. (0,80 + x)/(0,40 − x) = 4 → 5x = 0,80, x = 0,16 M.", "İki eğri aynı ilerlemeyle bağlıdır: biri ne kadar inerse öteki o kadar çıkar."],
        ["Yeni denge: [A] = 0,24 M, [B] = 0,96 M; 0,96/0,24 = 4 ve toplam 1,20 M.", "A eskisinden yüksek, sıçrama değerinden düşüktür; K aynı kaldı, stok değişti."],
      ][step] ?? [];
    return { els, readout };
  },
});

// 2A ⇌ B, K = 0,5: eski denge A 1,00, B 0,50; B'ye b M eklenir.
const restockFigure = mk({
  caption:
    "Aynı K, yeni stok: 2A ⇌ B için K = 0,5 ve eski denge [A] = 1,00 M, [B] = 0,50 M. Sürgüyle B'ye eklenen derişimi değiştir. Net geri dönüşümde B'nin her y azalışı A'yı 2y artırır; sistem eski değerlere dönmez, aynı K'yi yeni stokla sağlar.",
  alt: "Üç satır: eski denge, ekleme anı ve yeni denge. Her satırda A ve B için iki yatay çubuk; derişim değerleri sağ sütunda yazılıdır.",
  h: 268,
  param: { label: "B'ye eklenen", min: 0, max: 1, step: 0.1, init: 0.5, unit: "M" },
  draw: (raw) => {
    const b = snap(raw, 0, 1, 0.1);
    const y = (-3 + Math.sqrt(9 + 8 * b)) / 4;
    const rows: [string, number, number][] = [
      ["Eski denge", 1, 0.5],
      ["Ekleme anı", 1, 0.5 + b],
      ["Yeni denge", 1 + 2 * y, 0.5 + b - y],
    ];
    const k = 160;
    const els: El[] = [];
    rows.forEach(([label, a, bb], i) => {
      const cy = 50 + i * 84;
      els.push(
        T(14, cy, label, "e", { bold: true }),
        ...barOnly(170, cy - 16, a * k, "b"),
        T(440, cy - 16, `A ${fx(a)}`, "e", { tone: "b" }),
        ...barOnly(170, cy + 16, bb * k, "a"),
        T(440, cy + 16, `B ${fx(bb)}`, "e", { tone: "a" }),
      );
    });
    const af = 1 + 2 * y;
    const bf = 0.5 + b - y;
    return {
      els,
      readout:
        b === 0
          ? ["Ekleme yok: Q = 0,50/1,00² = 0,5 = K, karışım dengede kalır.", "Sürgüyle B ekle; ekleme anında yalnız B satırı değişir."]
          : [
              `Ekleme anı Q = ${fx(0.5 + b)}/1,00² = ${fx(0.5 + b)} > 0,5: net geri (B → 2A).`,
              `(${fx(0.5 + b)} − y)/(1 + 2y)² = 0,5 → 2y² + 3y − ${fx(b, 1)} = 0, y ≈ ${fx(y, 3)} M; yeni A ≈ ${fx(af)} M, B ≈ ${fx(bf)} M.`,
              `Denetim: ${fx(bf, 3)}/${fx(af, 3)}² ≈ ${fx(bf / af ** 2)}; A birimi stoku A + 2B: 2,00 + ${fx(2 * b, 1)} = ${fx(af + 2 * bf)} M korunur.`,
            ],
    };
  },
});

// X + Y ⇌ XY, Kc = 1, eski denge 1, 1, 1 M; X'e 1 M eklenince üç aday değişim.
const DX = 2 - Math.sqrt(3);
const CHANGES = [
  { label: "Aday 1", d: [-DX, -DX, DX], title: "Geçerli: −x, −x, +x", detail: ["Üç değişim aynı ilerlemeden: x = 2 − √3 ≈ 0,27 M.", "Yeni denge X ≈ 1,73, Y ≈ 0,73, XY ≈ 1,27 M; 1,27/(1,73 × 0,73) ≈ 1,00 = K."] },
  { label: "Aday 2", d: [-0.3, -0.1, 0.3], title: "Oran bozuk", detail: ["Bir XY oluşurken bir X ve bir Y harcanır; Y yalnız 0,10 azalamaz.", "Y bileşeni toplamı n(Y) + n(XY) 0,20 artmış görünür: dışarıdan Y eklenmedi."] },
  { label: "Aday 3", d: [-DX, -DX, -0.1], title: "Ürün de azalmış", detail: ["X ve Y harcanıp XY de azalıyorsa harcanan atomlar kaybolmuş olur.", "X bileşeni toplamı n(X) + n(XY) korunmaz; böyle üç eğri birlikte çizilemez."] },
];
const linkedFigure = mk({
  caption:
    "Eğriler bağımsız çizilemez. X + Y ⇌ XY dengesine (Kc = 1, eski derişimler 1 M) X eklendikten sonra üç aday değişim var. Bir adaya dokun: geçerli değişim −x, −x, +x oranındadır ve iki bileşen stokunu korur.",
  alt: "Üstte üç aday adı. Altında X, Y ve XY satırları; ortadaki sıfır çizgisinden sola azalma, sağa artış çubukları. Çubukların karşı tarafında değişim değerleri, en altta seçilen adayın hükmü yazılıdır.",
  h: 300,
  picks: CHANGES.map((c) => ({ label: c.label, title: c.title, detail: c.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [];
    CHANGES.forEach((c, i) => els.push(T(110 + i * 156, 26, c.label, "c", { bold: true, tone: pick === i ? "a" : "ink", pick: i })));
    const z = 300;
    const k = 400;
    els.push(L(z, 62, z, 236, { thin: true }));
    const c = CHANGES[pick];
    ["X", "Y", "XY"].forEach((name, j) => {
      const y = 92 + j * 62;
      els.push(T(14, y, name, "e", { bold: true }));
      if (c) {
        const d = c.d[j];
        const tone: Tone = d < 0 ? "b" : "a";
        els.push(R(d < 0 ? z + d * k : z, y - 12, d < 0 ? z : z + d * k, y + 12, { tone, fill: tone }));
        els.push(d < 0 ? T(z + 12, y, `${sgn(d)} M`, "e", { tone }) : T(z - 12, y, `${sgn(d)} M`, "w", { tone }));
      }
    });
    els.push(T(266, 274, c ? c.title : "bir adaya dokun", "c", { tone: c ? (pick === 0 ? "a" : "warn") : "muted", bold: !!c }));
    return {
      els,
      readout: c
        ? [`${c.label}: ${c.detail.join(" ")}`]
        : ["Bir adaya dokun: değişimler aynı ilerlemeye bağlı mı, stoklar korunuyor mu?", "Dış ekleme yalnız X stokunu değiştirir; sonraki tepkime X ve Y'yi aynı miktarda harcar."],
    };
  },
});

// CO + H₂O ⇌ CO₂ + H₂, Kc = 1; dengede her biri 0,50 mol, toplam 2 atm. He sürgüyle.
const INERT_STEPS = ["Sabit hacim", "Sabit basınç (piston)"];
const inertFigure = mk({
  caption:
    "Soy gaz ekleme: CO + H₂O ⇌ CO₂ + H₂ dengesinde dört gazın her biri 0,50 mol ve toplam basınç 2 atm. Sürgüyle helyum ekle, ileri ile kap koşulunu değiştir. Sabit hacimde kısmi basınçlar değişmez; pistonlu kapta hacim büyür ve hepsi aynı oranda düşer. Gaz katsayı toplamı iki tarafta eşit olduğu için Q iki durumda da K'de kalır.",
  alt: "Dikdörtgen kap içinde dolu daireler tepkime gazlarını, kesik kenarlı içi boş daireler helyumu gösterir; her daire 0,25 mol. Pistonlu adımda kabın genişliği eklenen helyumla büyür. Altında kısmi basınç, toplam basınç ve Q satırları yazılıdır.",
  h: 340,
  param: { label: "Eklenen He", min: 0, max: 2, step: 0.5, init: 1, unit: "mol" },
  steps: INERT_STEPS,
  draw: (raw, step) => {
    const he = snap(raw, 0, 2, 0.5);
    const piston = step === 1;
    const w = piston ? 200 * ((2 + he) / 2) : 200;
    const pEach = piston ? (0.5 * 2) / (2 + he) : 0.5;
    const pTot = piston ? 2 : 2 + he;
    const els: El[] = [R(14, 40, 14 + w, 210, { tone: "ink", bold: piston })];
    const n = 8 + Math.round(he / 0.25);
    const cols = Math.max(4, Math.floor((w - 20) / 34));
    const rows = Math.ceil(n / cols);
    for (let i = 0; i < n; i++) {
      const cx = 14 + ((i % cols) + 0.5) * (w / cols);
      const cy = 40 + (Math.floor(i / cols) + 0.5) * (170 / rows);
      if (i < 8) els.push(C(cx, cy, 8, { tone: i % 2 ? "a" : "b", fill: i % 2 ? "a" : "b" }));
      else els.push(C(cx, cy, 8, { tone: "muted", dash: true }));
    }
    if (piston) els.push(L(14 + w, 30, 14 + w, 220, { tone: "c", bold: true }), T(24 + w, 125, "piston", "e", { tone: "c" }));
    else els.push(T(24 + w, 125, "sabit V", "e", { tone: "muted" }));
    els.push(
      T(14, 252, `p(her tepkime gazı) = ${fx(pEach)} atm`, "e", { tone: "a" }),
      T(14, 286, `toplam P = ${fx(pTot, 1)} atm, p(He) = ${fx(piston ? (he * 2) / (2 + he) : he)} atm`, "e"),
      T(14, 320, "Q = (p·p)/(p·p) = 1 = K: kayma yok", "e", { tone: "warn" }),
    );
    return {
      els,
      readout: [
        piston
          ? `Piston: P = 2 atm sabit, hacim ${fx((2 + he) / 2)} katına çıkar; her tepkime gazının kısmi basıncı 0,50 → ${fx(pEach)} atm.`
          : `Sabit V: toplam basınç 2 + ${fx(he, 1)} = ${fx(pTot, 1)} atm; her tepkime gazı yine 0,50 atm, çünkü p = nRT/V'de kendi n'si değişmedi.`,
        "Δn = 0: dört kısmi basınç aynı oranda değişse de Q = 1 kalır. Δn ≠ 0 olan bir dengede pistonlu ekleme Q'yu değiştirebilir.",
        "2024 AYT Fen 21 mantığı: sabit hacimli kaba soy gaz eklemek toplam basıncı artırır, tepkime gazlarının kısmi basıncını değiştirmez.",
      ],
    };
  },
});

/* =====================================================================
 * 013 Molarite / iyon derişimi
 * ===================================================================== */

const SALTS = [
  { label: "NaCl", cat: "Na⁺", nc: 1, an: "Cl⁻", na: 1, charge: "+1 ve −1", m: "Na⁺ 0,10 · Cl⁻ 0,10 M" },
  { label: "CaCl₂", cat: "Ca²⁺", nc: 1, an: "Cl⁻", na: 2, charge: "+2 ve 2 × (−1)", m: "Ca²⁺ 0,10 · Cl⁻ 0,20 M" },
  { label: "AlCl₃", cat: "Al³⁺", nc: 1, an: "Cl⁻", na: 3, charge: "+3 ve 3 × (−1)", m: "Al³⁺ 0,10 · Cl⁻ 0,30 M" },
  { label: "K₂SO₄", cat: "K⁺", nc: 2, an: "SO₄²⁻", na: 1, charge: "2 × (+1) ve −2", m: "K⁺ 0,20 · SO₄²⁻ 0,10 M" },
];
const unitFigure = mk({
  caption:
    "Bir formül birimi suda hangi iyonlara ayrılır? Bir tuza dokun: katyonlar düz, anyonlar kesik kenarlı kutularla çizilir. Alt indis iyon sayısını, üstteki yük ise her iyonun yükünü verir; Ca²⁺'nın 2 yükü iki kalsiyum iyonu demek değildir.",
  alt: "Üstte dört tuz adı. Seçilen tuz için solda bir formül birimi kutusu, sağa ok ve okun sağında katyon kutuları üst sırada, anyon kutuları alt sırada. Altta yük toplamı ve 0,10 M çözeltideki iyon derişimleri yazılıdır.",
  h: 300,
  picks: SALTS.map((s) => ({
    label: s.label,
    title: `${s.label} → ${s.nc > 1 ? s.nc : ""}${s.cat} + ${s.na > 1 ? s.na : ""}${s.an}`,
    detail: [`Yükler: ${s.charge} = 0.`, `0,10 M ${s.label} çözeltisinde ${s.m}; tam ayrışma ve yan tepkime yok kabulüyle.`],
  })),
  draw: (_v, _s, pick) => {
    const els: El[] = [];
    SALTS.forEach((s, i) => els.push(T(74 + i * 128, 26, s.label, "c", { bold: true, tone: pick === i ? "a" : "ink", pick: i })));
    const s = SALTS[pick];
    if (s) {
      els.push(...B(86, 140, `1 ${s.label}`, { bold: true }), A(150, 140, 206, 140, "ink"));
      for (let i = 0; i < s.nc; i++) els.push(...B(270 + i * 96, 100, s.cat, { tone: "a", w: 80 }));
      for (let i = 0; i < s.na; i++) els.push(...B(270 + i * 96, 180, s.an, { tone: "b", dash: true, w: 80 }));
      els.push(T(266, 244, `Yük: ${s.charge} = 0`, "c"), T(266, 280, `0,10 M çözeltide ${s.m}`, "c", { tone: "a" }));
    } else els.push(T(266, 140, "bir tuza dokun", "c", { tone: "muted" }));
    return {
      els,
      readout: s
        ? [`${s.label}: bir formül birimi ${s.nc} ${s.cat} ve ${s.na} ${s.an} verir. Yük denkliği: ${s.charge} = 0.`, `0,10 M ${s.label} çözeltisinde ${s.m}.`]
        : ["Bir tuza dokun: iyon sayısı ile iyon yükü ayrı satırlarda açılır.", "Çözeltide CaCl₂ molekülü yüzmez; formül birimi iyonlarına ayrılır."],
    };
  },
});

// Özgün örnek: 200 mL 0,15 M Na₃PO₄ + 200 mL 0,15 M Na₂SO₄, sonra 100 mL su buharlaşır.
const LEDGER_STEPS = ["Tuz molleri", "Na⁺ molü", "Ortak son hacim", "Derişim ve yük"];
const ledgerFigure = mk({
  caption:
    "Stok defteri: 200 mL 0,15 M Na₃PO₄ ile 200 mL 0,15 M Na₂SO₄ karıştırılıyor, ardından 100 mL su buharlaşıyor. İleri ile önce tuz mollerini, sonra Na⁺ mollerini, ortak son hacmi ve derişimi aç. Hacimlerin toplandığı ve çökelme olmadığı kabul edilir.",
  alt: "Üç sütunlu tablo: kaynak, tuz molü ve Na⁺ molü. Satırlar Na₃PO₄, Na₂SO₄ ve toplam. Tablonun altında son hacim, Na⁺ derişimi ve yük denkliği satırları adım adım eklenir.",
  h: 350,
  steps: LEDGER_STEPS,
  draw: (_v, step) => {
    const t = table(
      ["Kaynak", "n(tuz)", "n(Na⁺)"],
      [
        ["Na₃PO₄\n200 mL · 0,15 M", "0,030 mol", step >= 1 ? "3 × 0,030\n= 0,090 mol" : "?"],
        ["Na₂SO₄\n200 mL · 0,15 M", "0,030 mol", step >= 1 ? "2 × 0,030\n= 0,060 mol" : "?"],
        ["Toplam", "", step >= 1 ? "0,150 mol" : "?"],
      ],
      { hi: step >= 1 ? 2 : undefined },
    );
    const els: El[] = [...t.els];
    if (step >= 2) els.push(T(14, t.h + 26, "V = 200 + 200 − 100 = 300 mL", "e", { tone: "b" }));
    if (step >= 3) els.push(T(14, t.h + 60, "[Na⁺] = 0,150 / 0,300 = 0,50 M", "e", { tone: "a", bold: true }), T(14, t.h + 94, "3 × 0,10 + 2 × 0,10 = 0,50 M yük", "e", { tone: "muted" }));
    const readout =
      [
        ["n = M × V(L): 0,15 × 0,200 = 0,030 mol her tuzdan.", "Mol kütlesi bu dönüşümde gerekmez."],
        ["Katsayı bir kez kullanılır: Na₃PO₄ 3 × 0,030, Na₂SO₄ 2 × 0,030; toplam 0,150 mol Na⁺.", "Yalnız bir kaynağı saymak eksik derişim verir."],
        ["Buharlaşma iyon molünü değiştirmez, hacmi değiştirir: 400 − 100 = 300 mL = 0,300 L.", "Başlangıç hacmine bölmek ilk yanlış adımdır."],
        ["[Na⁺] = 0,150/0,300 = 0,50 M; [PO₄³⁻] = [SO₄²⁻] = 0,10 M. Yük: 0,50 = 3 × 0,10 + 2 × 0,10.", "2026 AYT Fen 18 mantığı: iki kaynağın iyon mollerini topla, buharlaşmadan sonraki son hacme böl."],
      ][step] ?? [];
    return { els, readout };
  },
});

// Al₂(SO₄)₃ c M + Na₂SO₄ 0,10 M aynı çözeltide.
const chargeFigure = mk({
  caption:
    "İyon sayısı ile yük ayrı tablolardır. Çözeltide 0,10 M Na₂SO₄ ve c M Al₂(SO₄)₃ var. Sürgüyle c'yi değiştir: pozitif ve negatif iyon molariteleri çoğu zaman farklıdır, yük katkıları ise her zaman eşittir; her iyon derişimi kendi yük büyüklüğüyle çarpılır.",
  alt: "İki grup yatay çubuk. Üst grupta pozitif ve negatif iyon molariteleri, alt grupta pozitif ve negatif yük derişimleri. Alt gruptaki iki çubuk her değerde eşit boyludur; değerler sağ sütunda yazılıdır.",
  h: 290,
  param: { label: "Al₂(SO₄)₃ derişimi c", min: 0, max: 0.2, step: 0.05, init: 0.1, unit: "M" },
  draw: (raw) => {
    const c = snap(raw, 0, 0.2, 0.05);
    const ionP = 2 * c + 0.2;
    const ionN = 3 * c + 0.1;
    const ch = 6 * c + 0.2;
    const k = 210;
    const els: El[] = [
      T(14, 26, "İyon molaritesi (mol iyon/L)", "e", { tone: "muted" }),
      ...hbar(70, "+ iyon", 120, ionP * k, fx(ionP), "a", 440),
      ...hbar(108, "− iyon", 120, ionN * k, fx(ionN), "b", 440, { dash: true }),
      T(14, 166, "Yük derişimi (mol yük/L)", "e", { tone: "muted" }),
      ...hbar(210, "+ yük", 120, ch * k, fx(ch), "a", 440),
      ...hbar(248, "− yük", 120, ch * k, fx(ch), "b", 440, { dash: true }),
    ];
    return {
      els,
      readout: [
        `[Al³⁺] = 2c = ${fx(2 * c)}, [Na⁺] = 0,20, [SO₄²⁻] = 3c + 0,10 = ${fx(ionN)} M.`,
        `İyon: + ${fx(ionP)} ile − ${fx(ionN)}${Math.abs(ionP - ionN) < 1e-9 ? " eşit" : " farklı"}; yük: 3 × ${fx(2 * c)} + 0,20 = 2 × ${fx(ionN)} = ${fx(ch)} mol yük/L.`,
        "Nötr çözeltide eşit sayıda katyon ve anyon bulunmaz; eşit olan pozitif ve negatif yük toplamıdır.",
      ],
    };
  },
});

// 100 mL 0,20 M NaCl üzerine V mL 0,10 M AgNO₃; AgCl nicel çöker.
const precipFigure = mk({
  caption:
    "Tepkime varsa başlangıçlar doğrudan toplanmaz: 100 mL 0,20 M NaCl üzerine 0,10 M AgNO₃ ekleniyor ve AgCl nicel olarak çöküyor (okul modeli). Sürgüyle eklenen hacmi değiştir. Na⁺ ve NO₃⁻ seyircidir; Ag⁺ ile Cl⁻ önce birbirini tüketir, katı AgCl çözelti paydasına girmez.",
  alt: "Beş dikey çubuk: çözeltide Na⁺, Cl⁻, Ag⁺, NO₃⁻ ve kesik kenarlı katı AgCl; boyları mmol miktarıyla orantılı, üstlerinde mmol değerleri yazılıdır.",
  h: 290,
  param: { label: "Eklenen AgNO₃", min: 0, max: 400, step: 50, init: 150, unit: "mL" },
  draw: (raw) => {
    const V = snap(raw, 0, 400, 50);
    const ag0 = 0.1 * V; // mmol
    const cl0 = 20;
    const p = Math.min(ag0, cl0);
    const bars: [string, number, Tone, boolean][] = [
      ["Na⁺", 20, "a", false],
      ["Cl⁻", cl0 - p, "b", false],
      ["Ag⁺", ag0 - p, "a", false],
      ["NO₃⁻", ag0, "b", false],
      ["AgCl(k)", p, "c", true],
    ];
    const base = 236;
    const k = 4;
    const els: El[] = [T(14, 22, "mmol (çözeltide ve katıda)", "e", { tone: "muted" }), L(40, base, 520, base, { thin: true })];
    bars.forEach(([name, n, tone, solid], i) => {
      const x = 82 + i * 98;
      if (n > 0.01) els.push(R(x - 24, base - n * k, x + 24, base, { tone, fill: solid ? undefined : tone, dash: solid }));
      els.push(T(x, base - n * k - 18, fx(n, 0), "c", { tone }), T(x, base + 24, name, "c", { bold: true }));
    });
    const vt = (100 + V) / 1000;
    const m = (p / 1000) * 143.5;
    return {
      els,
      readout: [
        `Cl⁻ 20 mmol, Ag⁺ ${fx(ag0, 0)} mmol: ${fx(p, 0)} mmol AgCl çöker (${fx(m)} g; M = 143,5 g/mol). Son hacim ${fx(vt * 1000, 0)} mL.`,
        `[Na⁺] = ${fx(20 / (100 + V), 3)}, [Cl⁻] = ${fx((cl0 - p) / (100 + V), 3)}, [Ag⁺] = ${fx((ag0 - p) / (100 + V), 3)}, [NO₃⁻] = ${fx(ag0 / (100 + V), 3)} M.`,
        V === 200
          ? "Eşdeğerlik: Ag⁺ ve Cl⁻ tükenir; yük denkliği [Na⁺] = [NO₃⁻] ile sağlanır."
          : "Yük denetimi: [Na⁺] + [Ag⁺] = [Cl⁻] + [NO₃⁻]; çöken katı bu denkliğe yazılmaz.",
      ],
    };
  },
});

export const chemistryFigures071Sheets: Record<string, Record<string, FigureDef>> = {
  "ayt-tepkime-hizi": {
    "Ne kadar dönüşüm, ne kadar zaman?": changeFigure,
    "Katsayılar tür hızlarını bağlar": coefFigure,
    "Mertebe ve k birimi": orderFigure,
    "Net denklem ile elementer adım": mechanismFigure,
  },
  "ayt-denge-hesaplari": {
    "Mol ile molar derişimi ayır": volumeFigure,
    "Değişimi tek bir ilerlemeye bağla": extentFigure,
    "Atom stoku ikinci bir doğrulama verir": stockFigure,
    "Q yönü verir, stok son miktarı sınırlar": directionFigure,
  },
  "ayt-denge-derisim": {
    "Üç fotoğrafla aynı deneyi anlat": photoFigure,
    "Aynı K'ye yeni stoklarla dön": restockFigure,
    "Stokiyometri eğrileri birbirine bağlar": linkedFigure,
    "İnert gazda kabın koşulu belirleyicidir": inertFigure,
  },
  "ayt-iyon-derisimi": {
    "Formül birimi molekül değildir": unitFigure,
    "Önce tuzun molünü yaz": ledgerFigure,
    "Yük denkliği bağımsız bir kontrol": chargeFigure,
    "Tepkime varsa başlangıçları doğrudan toplama": precipFigure,
  },
};
