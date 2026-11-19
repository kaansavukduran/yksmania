import { poly, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Epistemology: four questions on the same kind of example. A statement is
 * sorted by the question it answers: possibility (mümkün mü?), source
 * (nereden?), criterion (neyle doğru?) or limit (nereye kadar?). The last step
 * shows one tool (observation) doing two different jobs. Original examples.
 */

const BOXES: { title: string; ask: string; tone: Tone; at: [number, number] }[] = [
  { title: "İmkân", ask: "Doğru bilgi mümkün mü?", tone: "c", at: [0, 2.1] },
  { title: "Kaynak", ask: "Nereden edinilir?", tone: "b", at: [5.2, 2.1] },
  { title: "Ölçüt", ask: "Neyle doğru sayılır?", tone: "a", at: [0, 0] },
  { title: "Sınır", ask: "Nereye kadar bilinir?", tone: "warn", at: [5.2, 0] },
];
const STEPS: { quote: string; on: number[]; answer: string; trap: string }[] = [
  {
    quote: "“Bunu ölçerek öğrendim.”",
    on: [1],
    answer: "Kaynak: bilginin nereden geldiği söyleniyor → deneyim (empirizm, Locke, Hume).",
    trap: "Akılcılık temel bilgide aklın ilkelerini öne çıkarır (Platon, Descartes); Kant ikisini birleştirir (kritisizm).",
  },
  {
    quote: "“Önerme, gözlenen durumla uyuşuyor.”",
    on: [2],
    answer: "Ölçüt: yargı olguyla karşılaştırılıyor → uygunluk.",
    trap: "Tutarlılık yargıyı yalnız başka yargılarla karşılaştırır; tutarlı bir kurgu gerçek olmayabilir. Uzlaşım ve yarar başka ölçütlerdir.",
  },
  {
    quote: "“Bilgiyi güvenle kurmak için önce kuşkulanıyorum.”",
    on: [0],
    answer: "İmkân: kuşku araç olarak kullanılıyor → yöntemsel kuşku (Descartes); sonuçta bilgi kabul edilebilir.",
    trap: "Hükmü askıya almak (septisizm) farklı bir sonuçtur. Görüş farklılığından “hepsi eşit doğru” çıkmaz.",
  },
  {
    quote: "“Nesneyi betimleyebilirim ama kendinde özünü bilemem.”",
    on: [3],
    answer: "Sınır: bazı nitelikler biliniyor, öze erişim sınırlanıyor (2024 TYT Sosyal 15, Locke).",
    trap: "“Bazı yönler bilinemez” ≠ “hiçbir şey bilinemez”; bilme sınırı varlığın yokluğu değildir.",
  },
  {
    quote: "“Sayarak öğrendim” ve “Sayarak doğruladım.”",
    on: [1, 2],
    answer: "Aynı araç, iki görev: öğrenme yolu kaynak, iddiayı olguyla karşılaştırma uygunluk ölçütü.",
    trap: "Önce fiile bak: öğrenmek mi, doğrulamak mı? Doğru çıkan tahmin, gerekçenin sağlam olduğunu göstermez.",
  },
];

const fourQuestions: FigureDef = {
  caption:
    "İleri ile her cümleyi yanıtladığı soruya yerleştir. Bilgi felsefesi dört soru sorar: mümkün mü (imkân), nereden (kaynak), neyle doğru (ölçüt), nereye kadar (sınır). Önce cümlenin fiiline ve kapsam sözcüklerine (bazı, hiçbir) bak.",
  alt: "İkiye iki kutu: İmkân, Kaynak, Ölçüt, Sınır; her adımda üstteki örnek cümlenin yanıtladığı kutu renklenir.",
  steps: ["Ölçerek öğrendim", "Olguyla uyuşuyor", "Önce kuşkulanıyorum", "Özünü bilemem", "Aynı araç, iki görev"],
  draw: (_v, step) => {
    const s = STEPS[step];
    const els: El[] = [];
    BOXES.forEach((b, i) => {
      const on = s.on.includes(i);
      const [x, y] = b.at;
      els.push(poly([v(x, y), v(x + 4.6, y), v(x + 4.6, y + 1.7), v(x, y + 1.7)], { tone: on ? b.tone : "muted", fill: on ? b.tone : undefined, thin: !on }));
      els.push(txt(v(x + 2.3, y + 1.15), b.title, "c", { tone: on ? "ink" : "muted", bold: true }));
      els.push(txt(v(x + 2.3, y + 0.5), b.ask, "c", { tone: on ? "ink" : "muted", small: true }));
    });
    els.push(txt(v(4.9, 4.4), s.quote, "c", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-0.3, 4.9), " ", "c"), txt(v(10.1, -0.3), " ", "c"));
    return { els, readout: [s.answer, s.trap] };
  },
};

export const philosophyFigures: Record<string, Record<string, FigureDef>> = {
  "bilgi-felsefesi": { "Dört temel soruyu aynı örnekte ayır": fourQuestions },
};
