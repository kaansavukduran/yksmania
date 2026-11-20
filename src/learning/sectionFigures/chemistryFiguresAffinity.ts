import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Elektron ilgisi, elektronegatiflik, metalik–ametalik özellik.
 * F ve Cl değerleri RSC’den (EN Pauling 3,98 / 3,16; ilk elektron eklemesinde
 * salınan enerji 328,165 / 348,575 kJ/mol). C, N, O Pauling değerleri standart
 * tablo değerleridir. −349/−53 ve −150/+700 kJ/mol özgün soru verileridir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f2 = (x: number) => String(x).replace(".", ",");

function rows(list: { a: string; b: string; tone: Tone }[], pick: number): El[] {
  const els: El[] = [];
  list.forEach((r, i) => {
    const y = -i * 1.4, sel = pick === i;
    els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, r.tone));
    els.push(txt(v(0, y), r.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
    els.push(txt(v(0.3, y - 0.58), r.b, "e", { small: true, tone: sel ? "a" : "c" }));
  });
  return els;
}

// 1 · Dört kavram, dört süreç.
const CONCEPTS = [
  { a: "Elektron ilgisi (Eİ)", b: "X(g) + e⁻ → X⁻(g) · enerji değişimi, kJ/mol", tone: "b" as Tone, detail: ["Gaz hâlindeki tek nötr atom; bağ yok.", "Sayısal veri ve işaret tanımı genel oktan önce gelir.", "Birimi kJ/mol: EN gibi birimsiz değildir."] },
  { a: "Elektronegatiflik (EN)", b: "bağdaki ortak elektronu çekme · birimsiz", tone: "b" as Tone, detail: ["Bağ yapmış atomun göreli eğilimi (Pauling ölçeği).", "F en yüksek: 3,98.", "Birçok temel tabloda soy gazlara değer verilmez; boşluk 0 değildir."] },
  { a: "Metalik özellik", b: "elektron verip katyon oluşturma eğilimi", tone: "c" as Tone, detail: ["Sola ve aşağı genel olarak artar.", "Metalik artarken ilk iyonlaşma enerjisi genellikle azalır; biri ötekinin sayısal tersi değildir."] },
  { a: "Ametalik özellik", b: "elektron alıp anyon oluşturma eğilimi", tone: "c" as Tone, detail: ["Sağa ve yukarı genel olarak artar (soy gazlar hariç tutulur).", "Ana grup karşılaştırmalarında EN ile aynı yönü paylaşır ama aynı kavram değildir."] },
];
const concepts: FigureDef = {
  caption:
    "Dört kavramın dördü de “elektron” der ama başka süreç anlatır. Bir kavrama tıkla: hangi taneciğe, hangi sürece ve hangi birime bakacağın açılır. Önce süreci adlandır, sonra ok kullan.",
  alt: "Dört satır: elektron ilgisi, elektronegatiflik, metalik özellik, ametalik özellik; her birinin altında süreç ve birim.",
  picks: CONCEPTS.map((c) => ({ label: c.a, title: c.a, detail: c.detail })),
  draw: (_v, _s, pick = -1) => {
    const els = rows(CONCEPTS, pick);
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(5.6, -5.2), " ", "c"));
    return { els, readout: [pick >= 0 ? CONCEPTS[pick].detail[0] : "Bir kavrama tıkla ya da aşağıdan seç.", "Gaz atomuna ekleme → Eİ; bağdaki çekim → EN; verme/alma eğilimi → metalik/ametalik."] };
  },
};

// 2 · İşaret sözleşmesi: enerji basamağı.
const SIGN = [
  { label: "A: ΔE = −349 kJ/mol", e: -349, detail: ["Son hâl 349 kJ/mol daha düşük: 349 kJ/mol enerji salınır.", "Başka bir kaynak aynı olayı “salınan enerji 349 kJ/mol” diye pozitif yazabilir."] },
  { label: "B: ΔE = −53 kJ/mol", e: -53, detail: ["Yalnız 53 kJ/mol salınır.", "−53 sayıca −349’dan büyüktür ama salım büyüklüğü küçüktür."] },
  { label: "C: ΔE = +15 kJ/mol", e: 15, detail: ["Pozitif ΔE: sistem enerji alır.", "Önce işaretin anlamını, sonra büyüklüğü oku."] },
];
const sign: FigureDef = {
  caption:
    "Özgün veriler: üç gaz atomuna birer elektron ekleniyor. Bir sürece tıkla: başlangıç ve son enerji düzeyleri, okun yönü ve “salınan / alınan” büyüklük açılır. Termodinamik ΔE negatif yazılır; bazı tablolar salınan enerjiyi pozitif büyüklük olarak verir.",
  alt: "Solda X(g) + e⁻ düzeyi, sağda X⁻(g) düzeyi; aradaki dikey ok seçilen ΔE kadar aşağı ya da yukarı.",
  picks: SIGN.map((s) => ({ label: s.label, title: s.label, detail: s.detail })),
  draw: (_v, _s, pick = -1) => {
    const S = SIGN[pick >= 0 ? pick : 0], K = 0.008, y1 = S.e * K;
    const els: El[] = [seg(v(0, 0), v(1.6, 0), { bold: true }), txt(v(0.8, 0.3), "X(g) + e⁻", "c", { small: true, bold: true })];
    els.push(seg(v(2.6, y1), v(4.2, y1), { bold: true, tone: "a" }), txt(v(3.4, y1 + (S.e < 0 ? -0.3 : 0.3)), "X⁻(g)", "c", { small: true, bold: true, tone: "a" }));
    els.push(seg(v(1.6, 0), v(4.8, 0), { dash: true, thin: true, tone: "muted" }));
    els.push(vec(v(4.6, 0), v(4.6, y1), { tone: S.e < 0 ? "b" : "warn", bold: true }));
    els.push(txt(v(4.8, y1 / 2), S.e < 0 ? `${-S.e} kJ/mol salınır` : `${S.e} kJ/mol alınır`, "e", { small: true, bold: true, tone: S.e < 0 ? "b" : "warn" }));
    SIGN.forEach((s, i) => els.push(txt(v(-0.4, -3.3 - i * 0.55), s.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.6, 0.8), " ", "c"), txt(v(7.6, -4.6), " ", "c"));
    return { els, readout: [`ΔE = ${S.e > 0 ? "+" : "−"}${Math.abs(S.e)} kJ/mol: ${S.e < 0 ? `|${S.e}| = ${-S.e} kJ/mol salınır.` : "enerji alınır."}`, "“Daha büyük sayı” ile “daha çok salım” aynı soru değildir."] };
  },
};

// 3 · F ve Cl: iki eksen.
const AX = [
  { label: "Elektronegatiflik", f: 3.98, cl: 3.16, unit: "", K: 1.2, detail: ["EN: F 3,98 > Cl 3,16 (Pauling, birimsiz).", "Genel yukarı artış burada geçerli."] },
  { label: "Eİ (salınan enerji)", f: 328.165, cl: 348.575, unit: " kJ/mol", K: 0.0135, detail: ["Salınan enerji: Cl 348,575 > F 328,165 kJ/mol.", "F’nin küçük, sıkışık 2p bölgesindeki elektron–elektron itmesi basit yukarı artışı bozar.", "EN ile Eİ aynı sıra sayılmaz; iki ekseni aynı sayı ölçeğinde kıyaslamak anlamsız."] },
];
const fcl: FigureDef = {
  caption:
    "F ve Cl aynı grupta, F yukarıda. Bir özelliğe tıkla: elektronegatiflikte F, ilk elektron eklemesinde salınan enerjide Cl büyüktür (RSC verisi). Elektron ilgisi okunda istisnayı koru; her özellik kendi biriminde karşılaştırılır.",
  alt: "İki çubuk grubu: seçilen özellik için F ve Cl çubukları ve değerleri.",
  picks: AX.map((a) => ({ label: a.label, title: `${a.label}: ${a.f > a.cl ? "F" : "Cl"} büyük`, detail: a.detail })),
  draw: (_v, _s, pick = -1) => {
    const A = AX[pick >= 0 ? pick : 0];
    const els: El[] = [];
    [["F", A.f], ["Cl", A.cl]].forEach(([el, val], i) => {
      const y = -i * 0.9, w = (val as number) * A.K, big = (val as number) === Math.max(A.f, A.cl);
      els.push(txt(v(-0.2, y), el as string, "w", { small: true, bold: true }), rect(0, w, y - 0.28, y + 0.28, big ? "a" : "b"), txt(v(w + 0.15, y), `${f2(val as number)}${A.unit}`, "e", { small: true }));
    });
    AX.forEach((a, i) => els.push(txt(v(i * 3.0, -2.2), a.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.8, 0.7), " ", "c"), txt(v(6.8, -2.5), " ", "c"));
    return { els, readout: [A.detail[0], "Aynı element iki ölçütte farklı sırada olabilir: önce ölçütü seç."] };
  },
};

// 4 · 2. periyot EN.
const EN2 = [["Li", 0.98], ["Be", 1.57], ["B", 2.04], ["C", 2.55], ["N", 3.04], ["O", 3.44], ["F", 3.98]] as const;
const en: FigureDef = {
  caption:
    "2. periyotta Pauling elektronegatifliği soldan sağa artar; iyonlaşma enerjisindeki Be–B ve N–O düşüşleri burada yoktur, çünkü EN bağdaki ortak elektronu çekme eğilimidir. Ne için temel ölçekte değer verilmez: boşluk sıfır demek değildir.",
  alt: "Li’den F’ye yükselen yedi dikey çubuk ve değerleri; Ne için boş, kesikli çerçeve.",
  draw: () => {
    const els: El[] = [seg(v(-0.2, 0), v(8 * 0.85, 0), { thin: true })];
    EN2.forEach(([el, val], i) => {
      const x = i * 0.85, h = val * 0.75;
      els.push(rect(x, x + 0.6, 0, h, el === "F" ? "a" : "b"), txt(v(x + 0.3, h + 0.25), f2(val), "c", { small: true }), txt(v(x + 0.3, -0.3), el, "c", { small: true, bold: true }));
    });
    const x = 7 * 0.85;
    els.push(rect(x, x + 0.6, 0, 0.8, "muted", false), txt(v(x + 0.3, 1.05), "yok", "c", { small: true, tone: "muted" }), txt(v(x + 0.3, -0.3), "Ne", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-0.6, 3.6), " ", "c"), txt(v(7.0, -0.7), " ", "c"));
    return { els, readout: ["C < N < O < F: aynı periyotta etkin çekim artar, yarıçap küçülür.", "N–O iyonlaşma düzensizliği EN sırasına taşınmaz: farklı süreç."] };
  },
};

// 5 · Metalik karakter haritası.
const CELLS: { s: string; r: number; c: number }[] = [
  { s: "H", r: 0, c: 0 },
  ...["Li", "Be", "B", "C", "N", "O", "F"].map((s, c) => ({ s, r: 1, c })),
  ...["Na", "Mg", "Al", "Si", "P", "S", "Cl"].map((s, c) => ({ s, r: 2, c })),
  { s: "K", r: 3, c: 0 }, { s: "Ca", r: 3, c: 1 },
];
const MET = [
  { label: "Li < Na < K", hot: ["Li", "Na", "K"], detail: ["Aynı 1A grubu: katman 2, 3, 4.", "Aşağı indikçe yarıçap ve perdeleme artar; elektron vermek kolaylaşır: K en metalik."] },
  { label: "Na ile Cl", hot: ["Na", "Cl"], detail: ["Aynı periyot: Na elektron vermeye, Cl almaya yatkın.", "Metalik Na > Cl; ametalik ve EN Cl > Na.", "NaCl’yi “ortak elektron çifti” diye anlatma: basit iyonik model."] },
  { label: "H istisnası", hot: ["H"], detail: ["1A’da durur ama alkali metal değildir; oda koşullarında ametaldir.", "“Aynı grup → aynı sınıf” kör kuralı geçersiz."] },
  { label: "Yarı metaller", hot: ["B", "Si"], detail: ["Metal–ametal sınırında: metalik karakter keskin bir basamak değil, geçiştir."] },
];
const metal: FigureDef = {
  caption:
    "Metalik karakter sola ve aşağı, ametalik karakter sağa ve yukarı genel olarak artar. Bir örneğe tıkla: tabloda ilgili hücreler yanar ve gerekçe ile kuralın sınırı açılır.",
  alt: "Küçük periyodik tablo parçası; sol alta doğru “metalik” oku; seçilen örnekteki hücreler renkli.",
  picks: MET.map((m) => ({ label: m.label, title: m.label, detail: m.detail })),
  draw: (_v, _s, pick = -1) => {
    const D = 0.72, hot = pick >= 0 ? MET[pick].hot : [];
    const els: El[] = [];
    for (const t of CELLS) {
      const x = t.c * D, y = -t.r * D, on = hot.includes(t.s);
      els.push(rect(x, x + D - 0.06, y - D + 0.06, y, on ? "a" : "muted"), txt(v(x + (D - 0.06) / 2, y - (D - 0.06) / 2), t.s, "c", { small: true, bold: on }));
    }
    els.push(vec(v(7 * D + 0.4, 0.1), v(7 * D + 0.4, -4 * D + 0.1), { tone: "c", bold: true }), txt(v(7 * D + 0.6, -2 * D), "aşağı: metalik ↑", "e", { small: true, tone: "c" }));
    els.push(vec(v(7 * D - 0.1, 0.45), v(0, 0.45), { tone: "c", bold: true }), txt(v(3.5 * D, 0.8), "sola: metalik ↑", "c", { small: true, tone: "c" }));
    MET.forEach((m, i) => els.push(txt(v(i * 2.0 - 0.2, -3.7), m.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.4, 1.2), " ", "c"), txt(v(8.4, -4.0), " ", "c"));
    return { els, readout: [pick >= 0 ? MET[pick].detail[0] : "Bir örneğe tıkla ya da aşağıdan seç.", "Metalik artarken iyonlaşma enerjisi ve EN genellikle azalır: kontrol için kullan."] };
  },
};

// 6 · İki elektron ekleme: basamakları topla.
const STEPS = ["X(g)", "1. ekleme: −150", "2. ekleme: +700", "Toplam ve mol"];
const two: FigureDef = {
  caption:
    "Özgün veriler: X(g) bir elektron alınca ΔE₁ = −150 kJ/mol, X⁻(g) ikinciyi alınca ΔE₂ = +700 kJ/mol. Adımları ilerlet: basamakları işaretleriyle topla, sonra 0,20 mol ile çarp. İkinci ekleme negatif taneciğe yapıldığı için enerji ister; ilk basamağı ikiyle çarpmak yanlıştır.",
  alt: "Enerji basamakları: X(g) düzeyi, biraz aşağıda X⁻(g), çok yukarıda X²⁻(g); oklar ve toplam.",
  steps: STEPS,
  draw: (_v, step) => {
    const K = 0.004, L = [0, -150, 550];
    const els: El[] = [];
    L.slice(0, Math.min(step + 1, 3)).forEach((e, i) => {
      const x = i * 2.0, y = e * K;
      els.push(seg(v(x, y), v(x + 1.3, y), { bold: true, tone: i === Math.min(step, 2) ? "a" : "ink" }));
      els.push(txt(v(x + 0.65, y + (i === 1 ? -0.3 : 0.3)), ["X(g)", "X⁻(g)", "X²⁻(g)"][i], "c", { small: true, bold: true }));
      if (i > 0) {
        const y0 = L[i - 1] * K;
        els.push(vec(v(x - 0.35, y0), v(x - 0.35, y), { tone: e < L[i - 1] ? "b" : "warn", bold: true }));
        els.push(txt(v(x - 0.5, (y0 + y) / 2), i === 1 ? "−150" : "+700", "w", { small: true, bold: true, tone: e < L[i - 1] ? "b" : "warn" }));
      }
    });
    if (step === 3) els.push(seg(v(1.3, 0), v(5.6, 0), { dash: true, thin: true, tone: "muted" }), txt(v(6.0, 1.1), "toplam: +550 kJ/mol", "e", { small: true, bold: true, tone: "a" }), txt(v(6.0, 0.5), "0,20 × 550 = +110 kJ", "e", { small: true, tone: "a" }));
    els.push(txt(v(-0.6, 2.9), " ", "c"), txt(v(9.6, -1.1), " ", "c"));
    return {
      els,
      readout: [
        step < 3 ? `${STEPS[step]}.` : "ΔE = −150 + 700 = +550 kJ/mol; 0,20 mol için +110 kJ, enerji alınır.",
        "Başlangıç X⁻ olsaydı yalnız ikinci basamak: 0,20 × 700 = +140 kJ. Gaz basamağı katı iyonik bileşiği tek başına yasaklamaz.",
      ],
    };
  },
};

export const chemistryFiguresAffinity: Record<string, Record<string, FigureDef>> = {
  "elektron-ilgisi-elektronegatiflik": {
    "Aynı elektron sözcüğü farklı süreçleri anlatır": concepts,
    "Elektron ilgisinde işaret sözleşmesini oku": sign,
    "Elektron ilgisi okunda istisnayı koru": fcl,
    "Elektronegatiflik bağ içindeki çekimdir": en,
    "Metalik karakter elektron vermeye yatkınlıkla ilişkilidir": metal,
    "Dört kavramı tek soruda ayır": two,
  },
};
