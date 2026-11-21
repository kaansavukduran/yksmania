import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Soy ağaçları. Standard symbols: square = male, circle = female, filled =
 * shows the trait, small centre dot = carrier (only where the model makes one
 * certain). Mating line, sibship line and drop lines are drawn like a
 * textbook pedigree; genotypes appear under the symbols step by step as they
 * are deduced. Single-gene, full-penetrance school model.
 */

type Sex = "e" | "k";
type Person = { at: V; sex: Sex; on: boolean; label?: string; carrier?: boolean; tone?: Tone; mark?: string };
const S = 0.42;

function person(p: Person): El[] {
  const [x, y] = p.at;
  const tone = p.tone ?? (p.on ? "warn" : "ink");
  const els: El[] = [];
  if (p.sex === "e") els.push(poly([v(x - S, y - S), v(x + S, y - S), v(x + S, y + S), v(x - S, y + S)], p.on ? { tone, fill: tone, bold: true } : { tone, bold: true }));
  else els.push(p.on ? circle(p.at, S, { tone, fill: tone, bold: true }) : circle(p.at, S, { tone, bold: true }));
  if (p.carrier) els.push(circle(p.at, 0.1, { tone, fill: tone }));
  if (p.label) els.push(txt(v(x, y - S - 0.12), p.label, "s", { tone: p.tone ?? "c", small: true, bold: true }));
  if (p.mark) els.push(txt(v(x + S + 0.1, y + S), p.mark, "e", { tone: "warn", small: true, bold: true }));
  return els;
}
/** Mating line between a and b and drop lines to the children. */
function family(a: V, b: V, kids: V[]): El[] {
  const els: El[] = [seg(v(a[0] + S, a[1]), v(b[0] - S, b[1]), { tone: "ink" })];
  const mx = (a[0] + b[0]) / 2;
  const sib = a[1] - 1.25;
  els.push(seg(v(mx, a[1]), v(mx, sib), { tone: "ink" }));
  const xs = kids.map((k) => k[0]);
  els.push(seg(v(Math.min(mx, ...xs), sib), v(Math.max(mx, ...xs), sib), { tone: "ink" }));
  for (const k of kids) els.push(seg(v(k[0], sib), v(k[0], k[1] + S), { tone: "ink" }));
  return els;
}
const gen = (y: number, s: string): El => txt(v(-4.6, y), s, "c", { tone: "muted", bold: true });

/* ---------- 1. Şeklin dili ---------- */
const language: FigureDef = {
  caption:
    "İleri ile soy ağacının dilini öğren: kare erkek, daire kadın; dolu şekil incelenen özelliği gösterir; yatay çizgi eşleşme, aşağı inen kollar çocuklar; nesiller üstten alta I, II, III. Ortasında nokta olan şekil taşıyıcıdır (özelliği göstermez ama aleli taşır).",
  alt: "Üç nesilli soy ağacı: I. nesilde bir erkek ve bir kadın eşleşmiş; II. nesilde iki çocuk, biri dolu erkek; II. nesilden bir kadın dışarıdan bir erkekle eşleşmiş, III. nesilde iki çocuk.",
  steps: ["Erkek ve kadın", "Eşleşme ve çocuklar", "Nesiller", "Dolu ve taşıyıcı"],
  draw: (_v, step) => {
    const els: El[] = [];
    const I1 = v(-1.6, 3);
    const I2 = v(1.6, 3);
    const II1 = v(-1.2, 0.5);
    const II2 = v(0.8, 0.5);
    const II3 = v(3.2, 0.5);
    const III1 = v(1.2, -2);
    const III2 = v(2.8, -2);
    if (step >= 1) els.push(...family(I1, I2, [II1, II2]), ...family(II2, II3, [III1, III2]));
    const showFill = step >= 3;
    els.push(...person({ at: I1, sex: "e", on: false, label: step === 0 ? "erkek" : undefined }), ...person({ at: I2, sex: "k", on: false, carrier: showFill, label: step === 0 ? "kadın" : undefined }));
    if (step >= 1) {
      els.push(...person({ at: II1, sex: "e", on: showFill }), ...person({ at: II2, sex: "k", on: false, carrier: showFill }), ...person({ at: II3, sex: "e", on: false }));
      els.push(...person({ at: III1, sex: "k", on: false }), ...person({ at: III2, sex: "e", on: showFill }));
    }
    if (step === 1) els.push(txt(v(0, 3.25), "eşleşme", "n", { tone: "c", small: true, bold: true }), txt(v(-1.6, 1.85), "çocuklar", "w", { tone: "c", small: true, bold: true }));
    if (step >= 2) els.push(gen(3, "I"), gen(0.5, "II"), gen(-2, "III"));
    if (step >= 3) els.push(txt(v(-1.2, -0.05), "özelliği gösterir", "s", { tone: "warn", small: true }), txt(v(2.1, 3.0), "taşıyıcı", "e", { tone: "ink", small: true }));
    els.push(txt(v(-5.2, 4), " ", "c"), txt(v(5.2, -3), " ", "c"));
    const rows: [string, string][] = [
      ["Kare = erkek (XY), daire = kadın (XX).", "Şeklin biçimi cinsiyeti, dolgusu fenotipi söyler; genotipi söylemez."],
      ["Yatay çizgi eşleşmeyi, ondan inen kol ve kardeş çizgisi ortak çocukları gösterir.", "Yan yana durmak tek başına kardeşlik ya da ebeveynlik demek değildir: çizgileri izle."],
      ["Nesiller üstten alta I, II, III diye numaralanır; II-2 ikinci neslin soldan ikinci kişisidir.", "Dışarıdan aileye katılan eşin ebeveynleri çizilmez."],
      ["Dolu = incelenen özelliği gösteriyor. Nokta = taşıyıcı (yalnız model kesinleştirdiğinde kullanılır).", "Dolu her zaman “hasta” demek değildir: soru hangi fenotipi işaretlediyse odur."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Otozomal çekinik: aa'dan geriye ---------- */
const autoRec: FigureDef = {
  caption:
    "İleri ile çöz: özelliği göstermeyen iki ebeveynin dolu (aa) çocuğu var. Çocuk iki a alelini birer ebeveynden aldı; ebeveynler özelliği göstermediği için aa değil, ikisi de Aa. Punnett karesi her yeni çocuk için aa = 1/4 verir; özelliği göstermeyen kardeşin taşıyıcı olma olasılığı 2/3'tür.",
  alt: "İki boş şekilli ebeveyn, altında dolu bir kız ve boş bir oğul; adımlarda genotip etiketleri ve sağda 2 × 2 Punnett karesi.",
  steps: ["Fenotipler", "Çocuk aa", "Ebeveynler Aa", "Punnett: 1/4", "Boş kardeş: 2/3"],
  draw: (_v, step) => {
    const F = v(-3, 2.6);
    const M = v(-0.6, 2.6);
    const c1 = v(-2.6, 0.2);
    const c2 = v(-1.0, 0.2);
    const els: El[] = [...family(F, M, [c1, c2])];
    els.push(...person({ at: F, sex: "e", on: false, label: step >= 2 ? "Aa" : undefined, carrier: step >= 2 }), ...person({ at: M, sex: "k", on: false, label: step >= 2 ? "Aa" : undefined, carrier: step >= 2 }));
    els.push(...person({ at: c1, sex: "k", on: true, label: step >= 1 ? "aa" : undefined }));
    els.push(...person({ at: c2, sex: "e", on: false, label: step >= 4 ? "AA ya da Aa" : step >= 1 ? "A_" : undefined }));
    if (step >= 1 && step < 3) {
      els.push(vec(v(F[0] + 0.1, F[1] - 0.5), v(c1[0] - 0.1, c1[1] + 0.55), { tone: "c", thin: true }), vec(v(M[0] - 0.3, M[1] - 0.5), v(c1[0] + 0.3, c1[1] + 0.55), { tone: "c", thin: true }));
      els.push(txt(v(-1.95, 1.38), "a", "c", { tone: "c", bold: true }), txt(v(-3.6, 1.2), "a", "c", { tone: "c", bold: true }));
    }
    if (step >= 3) {
      const X0 = 1.4;
      const Y0 = 2.6;
      const c = 1.0;
      const cell = (i: number, j: number, s: string, hl: boolean) => {
        const x = X0 + c * (j + 1);
        const y = Y0 - c * (i + 1);
        els.push(poly([v(x, y), v(x + c, y), v(x + c, y - c), v(x, y - c)], hl ? { tone: "warn", fill: "warn" } : { tone: "ink", thin: true }));
        els.push(txt(v(x + c / 2, y - c / 2), s, "c", { tone: hl ? "warn" : "ink", bold: true }));
      };
      els.push(txt(v(X0 + 1.5, Y0 - 0.5), "A", "c", { tone: "b", bold: true }), txt(v(X0 + 2.5, Y0 - 0.5), "a", "c", { tone: "b", bold: true }));
      els.push(txt(v(X0 + 0.5, Y0 - 1.5), "A", "c", { tone: "b", bold: true }), txt(v(X0 + 0.5, Y0 - 2.5), "a", "c", { tone: "b", bold: true }));
      cell(0, 0, "AA", false);
      cell(0, 1, "Aa", step >= 4);
      cell(1, 0, "Aa", step >= 4);
      cell(1, 1, "aa", step === 3);
      if (step === 4) els.push(seg(v(X0 + 2, Y0 - 2), v(X0 + 3, Y0 - 3), { tone: "muted", bold: true }), seg(v(X0 + 3, Y0 - 2), v(X0 + 2, Y0 - 3), { tone: "muted", bold: true }));
    }
    els.push(txt(v(-4, 3.4), " ", "c"), txt(v(4.8, -0.8), " ", "c"));
    const rows: [string, string][] = [
      ["Ebeveynler özelliği göstermiyor, kız gösteriyor. Model: otozomal çekinik.", "Dolu = aa; boş = AA veya Aa (A_)."],
      ["Dolu kız aa: bir a babadan, bir a anneden geldi.", "aa kişiden geriye gitmek en kısa ilk hamledir."],
      ["Ebeveynler a taşıyor ama özelliği göstermiyor → ikisi de Aa (taşıyıcı).", "“Boş ebeveyn otomatik AA” varsayımı yanlış olurdu."],
      ["Aa × Aa → AA, Aa, Aa, aa: her yeni çocukta aa = 1/4, cinsiyetten bağımsız.", "Kare, olasılığı gösterir; ailede tam dört çocuk olacağı anlamına gelmez."],
      ["Boş oğul aa olamaz: kalan üç eşit kutudan ikisi Aa → taşıyıcı olasılığı 2/3.", "Fenotip bilinmeseydi taşıyıcı olasılığı 2/4 = 1/2 olurdu."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. X'e bağlı çekinik (2023 TYT Fen 19 mantığı) ---------- */
const xRec: FigureDef = {
  caption:
    "İleri ile X'e bağlı çekinik renk körlüğü ailesini çöz: iki kız (biri taşıyıcı, biri renk körü), iki oğul (biri sağlıklı, biri renk körü). Baba kızlarına X'ini, oğullarına Y'sini verir; anne her çocuğa bir X verir. Renk körü kız babanın renk körü olduğunu gösterir; sağlıklı oğul annenin Xᴬ taşıdığını gösterir: anne taşıyıcıdır, renk körü olmak zorunda değildir.",
  alt: "Baba ve anne, altında iki kız ve iki oğul. Adımlarda genotipler yazılıyor ve babadan kızlara, anneden oğullara giden renkli X okları çiziliyor.",
  steps: ["Çocuklar", "Renk körü kız → baba", "Sağlıklı oğul → anne", "Sonuç"],
  draw: (_v, step) => {
    const F = v(-1.6, 2.6);
    const M = v(1.6, 2.6);
    const kids: V[] = [v(-3.3, 0), v(-1.1, 0), v(1.1, 0), v(3.3, 0)];
    const els: El[] = [...family(F, M, kids)];
    els.push(...person({ at: F, sex: "e", on: step >= 1, label: step >= 1 ? "XᵃY" : "?", tone: step >= 1 ? undefined : "muted" }));
    els.push(...person({ at: M, sex: "k", on: false, carrier: step >= 2, label: step >= 2 ? "XᴬXᵃ" : "?", tone: step >= 2 ? undefined : "muted" }));
    els.push(...person({ at: kids[0], sex: "k", on: false, carrier: true, label: "XᴬXᵃ" }));
    els.push(...person({ at: kids[1], sex: "k", on: true, label: "XᵃXᵃ" }));
    els.push(...person({ at: kids[2], sex: "e", on: false, label: "XᴬY" }));
    els.push(...person({ at: kids[3], sex: "e", on: true, label: "XᵃY" }));
    if (step === 1) els.push(vec(v(F[0] - 0.1, F[1] - 0.5), v(kids[1][0], kids[1][1] + 0.55), { tone: "warn", bold: true }), txt(v(-2.2, 3.2), "Xᵃ (babadan)", "w", { tone: "warn", small: true, bold: true }));
    if (step === 2) els.push(vec(v(M[0] - 0.2, M[1] - 0.5), v(kids[2][0], kids[2][1] + 0.55), { tone: "b", bold: true }), txt(v(2.2, 3.2), "Xᴬ (anneden)", "e", { tone: "b", small: true, bold: true }));
    if (step === 3) els.push(txt(v(0, -1.35), "“Anne kesin renk körüdür” çıkarılamaz", "s", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-4.4, 3.5), " ", "c"), txt(v(4.4, -1.9), " ", "c"));
    const rows: [string, string][] = [
      ["Kızlar XᴬXᵃ (taşıyıcı) ve XᵃXᵃ (renk körü); oğullar XᴬY (sağlıklı) ve XᵃY (renk körü).", "Kızın iki X'i vardır: biri babadan, biri anneden. Oğulun tek X'i anneden gelir."],
      ["Renk körü kız XᵃXᵃ: bir Xᵃ'yı babadan aldı. Babanın tek X'i Xᵃ → baba XᵃY, renk körü.", "Babası sağlıklı olan bir kız X'e bağlı çekinik özelliği gösteremez."],
      ["Sağlıklı oğul XᴬY: Xᴬ'yı anneden aldı. Renk körü kız da anneden Xᵃ aldı → anne XᴬXᵃ.", "Anne özelliği göstermez, taşıyıcıdır."],
      ["XᵃY × XᴬXᵃ: kızların yarısı taşıyıcı, yarısı renk körü; oğulların yarısı sağlıklı, yarısı renk körü.", "Renk körü kız var diye annenin de renk körü olması gerekmez (resmî cevap bu çıkarımın yapılamayacağıdır)."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. Modelleri karşı örnekle ele ---------- */
const MODELS: { name: string; ok: boolean; why: string; f: string; m: string; d: string }[] = [
  { name: "Otozomal çekinik", ok: true, why: "Aa × Aa iki boş ebeveyn aa kız verebilir.", f: "Aa", m: "Aa", d: "aa" },
  { name: "Otozomal baskın", ok: false, why: "Boş ebeveynler aa × aa olur; A aleli yok, dolu çocuk çıkamaz.", f: "aa", m: "aa", d: "A_ ?" },
  { name: "X'e bağlı çekinik", ok: false, why: "Dolu kız XᵃXᵃ ise baba XᵃY ve dolu olmalıydı; baba boş.", f: "XᴬY", m: "XᴬXᵃ", d: "XᵃXᵃ ?" },
  { name: "X'e bağlı baskın", ok: false, why: "Boş ebeveynlerde Xᴬ yok; dolu kız çıkamaz.", f: "XᵃY", m: "XᵃXᵃ", d: "XᴬX_ ?" },
];
const elimination: FigureDef = {
  caption:
    "İleri ile dört modeli sırayla dene: özelliği göstermeyen iki ebeveynin dolu bir kızı var. Her modelde somut genotip atamaya çalış; çelişki çıkan model elenir. Yalnız otozomal çekinik tutarlıdır. Dolu çocuk oğul olsaydı X'e bağlı çekinik de mümkün olurdu.",
  alt: "Boş baba, boş anne ve dolu kız; her adımda altında farklı model için genotip etiketleri, uyumluysa yeşil onay, çelişkiliyse kırmızı çarpı.",
  steps: MODELS.map((m) => m.name),
  draw: (_v, step) => {
    const md = MODELS[step];
    const F = v(-1.4, 2);
    const M = v(1.4, 2);
    const D = v(0, -0.5);
    const els: El[] = [...family(F, M, [D])];
    const tone: Tone = md.ok ? "c" : "warn";
    els.push(...person({ at: F, sex: "e", on: false, label: md.f, tone: md.ok ? undefined : "ink" }));
    els.push(...person({ at: M, sex: "k", on: false, label: md.m }));
    els.push(...person({ at: D, sex: "k", on: true, label: md.d }));
    els.push(txt(v(2.6, -0.4), md.ok ? "✓ uyumlu" : "✗ elenir", "e", { tone, bold: true }));
    els.push(txt(v(-3.4, 2.9), " ", "c"), txt(v(4.8, -1.6), " ", "c"));
    return { els, readout: [`${md.name}: ${md.ok ? "uyumlu" : "elenir"}.`, md.why] };
  },
};

export const biologyFiguresPedigree: Record<string, Record<string, FigureDef>> = {
  "soy-agaclari": {
    "Önce şeklin dilini oku": language,
    "Otozomal çekinikte dolu aa": autoRec,
    "X’e bağlı çekinikte baba-kız bağlantısı": xRec,
    "Çözümü karşı örnekle denetle": elimination,
  },
};
