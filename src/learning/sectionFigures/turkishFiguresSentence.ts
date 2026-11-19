import { poly, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Sentence elements, found in the order the guide teaches: the full predicate
 * first, then the subject ("kim?"), the object ("neyi?"), the place complement
 * ("kime?") and the adverbial ("ne zaman?"). Every phrase stays one block, so
 * "uzun raporu" is never split into two elements. Original example sentence.
 */

type Phrase = { s: string; role: string; ask: string; tone: Tone; step: number };
const PHRASES: Phrase[] = [
  { s: "Yeni görevli", role: "özne", ask: "kim teslim etti?", tone: "c", step: 1 },
  { s: "uzun raporu", role: "belirtili nesne", ask: "neyi?", tone: "b", step: 2 },
  { s: "müdüre", role: "yer tamlayıcısı", ask: "kime?", tone: "a", step: 3 },
  { s: "öğleden önce", role: "zarf tümleci", ask: "ne zaman?", tone: "warn", step: 4 },
  { s: "teslim etti", role: "yüklem", ask: "temel yargı", tone: "ink", step: 0 },
];
const NOTES: [string, string][] = [
  ["Önce yüklem: “teslim etti” birleşik fiil, tek bütün. Yalnız “etti”yi koparma.", "Yüklem çekimli fiil ya da ek fiil almış isim soylu sözdür; deyim ve birleşik fiil bütün olarak alınır."],
  ["Özne: yükleme “kim teslim etti?” sor → “Yeni görevli” (sıfat + ad, tek öbek).", "Özne söylenmemişse kişi ekinden çıkar (taşıdım → ben). Edilgende etkilenen öge sözde öznedir."],
  ["Nesne: “neyi teslim etti?” → “uzun raporu”. Belirtme eki (-u) öbeğin sonundadır ama bütün öbek nesnedir.", "“Ne?” sorusunu özneden sonra sor; yoksa özne ile belirtisiz nesne karışır (Kitap okudu → belirtisiz)."],
  ["Yer tamlayıcısı: “kime?” → “müdüre” (yönelme). Yön, bulunma, ayrılma bildirebilir.", "Her -e/-de ekine yer deme: “saat üçte”, “akşama” zaman bildirir ve zarf tümlecidir."],
  ["Zarf tümleci: “ne zaman?” → “öğleden önce”. Edat öbekleri genellikle zarf tümleci sayılır.", "Sıra: özne / belirtili nesne / yer tamlayıcısı / zarf tümleci / yüklem. Devrik cümlede de aynı sorularla bul (2024 TYT Türkçe 8)."],
];

const ogeler: FigureDef = {
  caption:
    "İleri ile cümlenin ögelerini sırayla bul: önce yüklem, sonra ona sorulan sorularla özne, nesne, yer tamlayıcısı ve zarf tümleci. Her söz öbeği tek parça kalır; sıfat ve tamlama içindeki sözleri ayrı öge sayma.",
  alt: "“Yeni görevli uzun raporu müdüre öğleden önce teslim etti” cümlesinin söz öbekleri renkli kutularda; her adımda bir öbek ögesinin adını ve yükleme sorulan soruyu alır.",
  steps: ["Yüklem", "Özne", "Nesne", "Yer tamlayıcısı", "Zarf tümleci"],
  draw: (_v, step) => {
    // Question chain asked of the predicate, in the order the guide teaches.
    const chain: [string, Tone][] = [["yüklem", "ink"], ["kim?", "c"], ["neyi?", "b"], ["kime?", "a"], ["ne zaman?", "warn"]];
    const els: El[] = [];
    const widths = [1.9, 1.5, 1.5, 1.6, 2.4];
    let x = 0;
    chain.forEach(([label, tone], i) => {
      const w = widths[i];
      const on = i <= step;
      if (i > 0) els.push(vec(v(x - 0.55, 0.35), v(x - 0.08, 0.35), { tone: on ? "ink" : "muted", thin: true }));
      els.push(poly([v(x, 0), v(x + w, 0), v(x + w, 0.7), v(x, 0.7)], { tone: on ? tone : "muted", fill: on ? tone : undefined, thin: !on }));
      els.push(txt(v(x + w / 2, 0.35), label, "c", { tone: on ? "ink" : "muted", small: true, bold: on }));
      x += w + 0.65;
    });
    els.push(txt(v(-0.3, 1.0), " ", "c"), txt(v(x, -0.3), " ", "c"));
    return {
      els,
      word: PHRASES.map((p) => (p.step <= step ? { s: p.s, tone: p.tone, label: `${p.role} · ${p.ask}` } : { s: p.s, tone: "muted" as Tone, label: "?" })),
      legend: [
        { code: "", label: "yüklem", tone: "ink" },
        { code: "", label: "özne", tone: "c" },
        { code: "", label: "nesne", tone: "b" },
        { code: "", label: "yer tamlayıcısı", tone: "a" },
        { code: "", label: "zarf tümleci", tone: "warn" },
      ],
      readout: NOTES[step],
    };
  },
};

export const turkishFiguresSentence: Record<string, Record<string, FigureDef>> = {
  "cumlenin-ogeleri": { "Merkez önce: tam yüklemi bul": ogeler },
};
