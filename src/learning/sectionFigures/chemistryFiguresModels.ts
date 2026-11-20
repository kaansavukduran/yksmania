import { ball, circle, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Five atom models side by side as small schematic icons (not to scale). Each
 * model name opens a card: its claim, the evidence behind it and what it could
 * not explain. 2024 TYT Fen 9: "Rutherford'a göre elektronlar orbitallerde"
 * is wrong because the orbital belongs to the modern model.
 */

type M = { name: string; claim: string; evidence: string; limit: string };
const MODELS: M[] = [
  { name: "Dalton", claim: "Atom içi dolu, bölünmez küredir; aynı elementin atomları özdeştir; bileşikler belirli atom oranlarıyla oluşur.", evidence: "Kütlenin korunumu ve sabit oranlar gibi kimyasal tepkime düzenlilikleri.", limit: "Atom altı tanecik yok; izotoplar ‘aynı element, aynı kütle’ varsayımını sınırlar." },
  { name: "Thomson", claim: "Negatif elektronlar, bütün hacme yayılmış pozitif yapının içine gömülüdür (üzümlü kek).", evidence: "Katot ışınlarının elektrik ve manyetik alanda sapması: negatif yüklü küçük tanecikler var.", limit: "Pozitif yük küçük bir çekirdekte değil; alfa saçılmasındaki büyük sapmaları açıklayamaz." },
  { name: "Rutherford", claim: "Pozitif yük ve kütlenin çoğu çok küçük çekirdekte; atom hacminin çoğu boşluk; elektronlar dışta.", evidence: "Altın levha: alfaların çoğu geçer (boşluk), çok azı büyük açıyla sapar (yoğun + çekirdek).", limit: "Elektronların kararlılığını ve çizgi spektrumunu açıklamaz; orbital bu modele ait değildir (2024 TYT Fen 9)." },
  { name: "Bohr", claim: "Elektronlar belirli enerjili izinli yörüngelerde; düzeyler arası geçişte enerji alır ya da verir.", evidence: "Hidrojenin çizgi spektrumu: yalnız belirli enerji farkları.", limit: "Tek elektronlu sistemlerde (H, He⁺, Li²⁺) başarılı; çok elektronlu atomlarda yetersiz." },
  { name: "Modern", claim: "Elektronun kesin yolu yerine olasılık dağılımı: orbital.", evidence: "Kuantum mekaniği ve çok elektronlu spektrumlar.", limit: "Orbital çizilmiş bir yol ya da elektronun durduğu yüzey değildir." },
];

function icon(i: number, x: number, on: boolean): El[] {
  const t: Tone = on ? "a" : "muted";
  const els: El[] = [];
  const c = v(x, 0);
  if (i === 0) els.push(circle(c, 0.9, { tone: t, fill: t }));
  if (i === 1) {
    els.push(circle(c, 0.9, { tone: t, fill: "warn" }));
    for (const [dx, dy] of [[-0.4, 0.35], [0.35, 0.4], [-0.3, -0.4], [0.45, -0.25], [0, 0]]) els.push(ball(v(x + dx, dy), 0.08, "b"));
  }
  if (i >= 2) {
    els.push(ball(c, 0.13, "warn"));
    if (i === 2) els.push(circle(c, 0.9, { tone: t, thin: true, dash: true }), ball(v(x + 0.6, 0.55), 0.07, "b"), ball(v(x - 0.7, -0.4), 0.07, "b"));
    if (i === 3) {
      els.push(circle(c, 0.5, { tone: t, thin: true }), circle(c, 0.9, { tone: t, thin: true }));
      els.push(ball(v(x + 0.5, 0), 0.07, "b"), ball(v(x - 0.64, 0.64), 0.07, "b"));
    }
    if (i === 4) for (const r of [0.35, 0.55, 0.75, 0.92]) els.push(circle(c, r, { tone: on ? "a" : "b", fill: on ? "a" : "b", thin: true }));
  }
  return els;
}

const compare: FigureDef = {
  caption:
    "Beş model sırayla (şematik, ölçekli değil). Bir modelin adına tıkla: iddiası, dayandığı kanıt ve açıklayamadığı nokta açılır. Sonraki modelde de çekirdek ya da elektron bulunabilir; ‘ilk kez’ ve ‘modeline göre’ koşulunu ayrı oku.",
  alt: "Soldan sağa beş küçük atom simgesi: Dalton dolu küre, Thomson pozitif küre içinde noktalar, Rutherford küçük çekirdek ve geniş boşluk, Bohr çekirdek çevresinde iki halka, modern çekirdek çevresinde bulut.",
  picks: MODELS.map((m) => ({ label: m.name, title: `${m.name} modeli`, detail: [`İddia: ${m.claim}`, `Kanıt: ${m.evidence}`, `Sınır: ${m.limit}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    MODELS.forEach((m, i) => {
      const x = i * 3.1;
      els.push(...icon(i, x, pick === i));
      els.push(txt(v(x, -1.0 - (i % 2) * 0.9), m.name, "s", { bold: true, tone: pick === i ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-1.2, 1.2), " ", "c"), txt(v(4 * 3.1 + 1.2, -2.8), " ", "c"));
    const sel = pick >= 0 ? MODELS[pick] : undefined;
    return { els, readout: [sel ? `${sel.name}: ${sel.claim}` : "Bir modelin adına tıkla ya da aşağıdan seç.", "Sıra: Dalton → Thomson → Rutherford → Bohr → modern. Her yeni model yeni bir kanıtı açıkladı."] };
  },
};

export const chemistryFiguresModels: Record<string, Record<string, FigureDef>> = {
  "atom-modelleri": { "Modelleri buldukları bilgiyle karşılaştır": compare },
};
