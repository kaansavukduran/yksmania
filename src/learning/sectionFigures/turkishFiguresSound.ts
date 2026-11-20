import { poly, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Ses bilgisi. (1) The eight vowels on a 2 × 4 board (kalın / ince rows; düz-
 * geniş, düz-dar, yuvarlak-geniş, yuvarlak-dar columns); each vowel opens its
 * three features. (2, 3) Before/after strips: the changed sound is coloured and
 * its side named (kök sonu vs ek başı; lost vs changed vowel), the method of
 * 2019 TYT Türkçe 7: prove each event with a start form, then name it.
 */

const COLS = ["düz · geniş", "düz · dar", "yuvarlak · geniş", "yuvarlak · dar"];
const VOWELS: { ch: string; row: 0 | 1; col: number; ex: string }[] = [
  { ch: "a", row: 0, col: 0, ex: "araba" },
  { ch: "ı", row: 0, col: 1, ex: "ıslak" },
  { ch: "o", row: 0, col: 2, ex: "okul" },
  { ch: "u", row: 0, col: 3, ex: "uzun" },
  { ch: "e", row: 1, col: 0, ex: "ekmek" },
  { ch: "i", row: 1, col: 1, ex: "iğne" },
  { ch: "ö", row: 1, col: 2, ex: "örnek" },
  { ch: "ü", row: 1, col: 3, ex: "üzüm" },
];
const vowelBoard: FigureDef = {
  caption:
    "Sekiz ünlü üç özellikle: kalın (a ı o u) / ince (e i ö ü), düz / yuvarlak, geniş / dar. Bir ünlüye tıkla. Büyük ünlü uyumu kalınlık satırına, küçük ünlü uyumu düz-yuvarlak ve geniş-dar sütunlarına bakar: düzden sonra düz; yuvarlaktan sonra dar-yuvarlak ya da geniş-düz.",
  alt: "İki satır dört sütunlu tablo: üst satır kalın ünlüler a, ı, o, u; alt satır ince ünlüler e, i, ö, ü; sütunlar düz-geniş, düz-dar, yuvarlak-geniş, yuvarlak-dar.",
  picks: VOWELS.map((w) => ({
    label: w.ch,
    title: `${w.ch} ünlüsü`,
    detail: [`${w.row === 0 ? "Kalın" : "İnce"} · ${COLS[w.col]}`, `Örnek: ${w.ex}`, w.col >= 2 ? "Yuvarlak: küçük uyumda ardından dar-yuvarlak (u, ü) ya da geniş-düz (a, e) gelir." : "Düz: küçük uyumda ardından düz bir ünlü (a, e, ı, i) gelir."],
  })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const W = 2.9;
    const H = 1.4;
    // Column headers on two lines (roundness over width) so neighbours never touch.
    COLS.forEach((c, j) =>
      c.split(" · ").forEach((part, k) => els.push(txt(v(j * W + W / 2, 2 * H + 0.15 + (1 - k) * 0.78), part, "n", { small: true, tone: "muted" }))),
    );
    ["kalın", "ince"].forEach((r, i) => els.push(txt(v(-0.15, (1 - i) * H + H / 2), r, "w", { small: true, bold: true, tone: i === 0 ? "b" : "c" })));
    VOWELS.forEach((w, i) => {
      const x = w.col * W;
      const y = (1 - w.row) * H;
      const on = pick === i;
      const tone: Tone = on ? "a" : w.row === 0 ? "b" : "c";
      els.push(poly([v(x + 0.05, y + 0.05), v(x + W - 0.05, y + 0.05), v(x + W - 0.05, y + H - 0.05), v(x + 0.05, y + H - 0.05)], { tone, fill: tone, thin: !on }));
      els.push(txt(v(x + W / 2, y + H / 2), w.ch, "c", { bold: true, tone: "ink", pick: i }));
    });
    els.push(txt(v(-1.6, 2 * H + 1.6), " ", "c"), txt(v(4 * W + 0.2, -0.3), " ", "c"));
    const sel = pick >= 0 ? VOWELS[pick] : undefined;
    return { els, readout: [sel ? `${sel.ch}: ${sel.row === 0 ? "kalın" : "ince"}, ${COLS[sel.col]}` : "Bir ünlüye tıkla ya da aşağıdan seç.", "kavun: a, u ikisi kalın → büyük uyum var; a düz, u yuvarlak-dar → küçük uyum yok."] };
  },
};

type Part = { s: string; tone: Tone; label: string };
type Frame = { name: string; before: string; after: string; parts: Part[]; note: string };
function strip(frames: Frame[], caption: string, alt: string): FigureDef {
  return {
    caption,
    alt,
    steps: frames.map((f) => f.name),
    draw: (_v, step) => {
      const f = frames[step];
      const els: El[] = [];
      els.push(txt(v(0, 1.2), "önce", "e", { small: true, tone: "muted" }), txt(v(1.6, 1.2), f.before, "e", { bold: true, tone: "muted" }));
      els.push(vec(v(0.7, 0.9), v(0.7, 0.35), { tone: "muted", thin: true }));
      els.push(txt(v(0, 0), "sonra", "e", { small: true, tone: "muted" }), txt(v(1.6, 0), f.after, "e", { bold: true }));
      els.push(txt(v(-0.3, 1.8), " ", "c"), txt(v(8.5, -0.5), " ", "c"));
      return {
        els,
        word: f.parts,
        legend: [
          { code: "", label: "değişmeyen", tone: "ink" },
          { code: "", label: "kökte değişen / düşen", tone: "warn" },
          { code: "", label: "ek başında değişen", tone: "a" },
          { code: "", label: "ek", tone: "b" },
        ],
        readout: [f.note],
      };
    },
  };
}

const consonants = strip(
  [
    { name: "kitap + ı", before: "kitap + ı", after: "kitabı", parts: [{ s: "kita", tone: "ink", label: "kök" }, { s: "b", tone: "warn", label: "p → b (kök sonu)" }, { s: "ı", tone: "b", label: "ek" }], note: "Yumuşama: ünlüyle başlayan ek önünde KÖKÜN SON sesi p → b oldu." },
    { name: "kitap + da", before: "kitap + da", after: "kitapta", parts: [{ s: "kitap", tone: "ink", label: "kök (aynı)" }, { s: "t", tone: "a", label: "d → t (ek başı)" }, { s: "a", tone: "b", label: "ek" }], note: "Benzeşme: sert p'den sonra EKİN BAŞI d → t oldu; kökteki p aynı kaldı." },
    { name: "kitap + cık + ı", before: "kitap + cık + ı", after: "kitapçığı", parts: [{ s: "kitap", tone: "ink", label: "kök" }, { s: "ç", tone: "a", label: "c → ç (ek başı)" }, { s: "ı", tone: "b", label: "ek" }, { s: "ğ", tone: "warn", label: "k → ğ (gövde sonu)" }, { s: "ı", tone: "b", label: "ek" }], note: "Tek sözcükte iki olay: önce benzeşme (c → ç), sonra yumuşama (k → ğ). İkisini tek olay sayma." },
    { name: "süt + ü", before: "süt + ü", after: "sütü", parts: [{ s: "süt", tone: "ink", label: "kök (aynı)" }, { s: "ü", tone: "b", label: "ek" }], note: "Karşı örnek: p, ç, t, k ile biten her kök yumuşamaz (sütü, atı)." },
  ],
  "Önce başlangıç biçimini yaz, sonra değişen sesin YERİNİ bul: kök sonunda p, ç, t, k → b, c, d, ğ/g ise yumuşama; ek başında c, d, g → ç, t, k ise benzeşme. Aynı kök iki farklı olay gösterebilir.",
  "Her adımda üstte ‘önce’ biçimi, altta ‘sonra’ biçimi; altta sözcük parçaları renkli: değişen kök sonu turuncu, değişen ek başı sarı, ekler mavi.",
);

const vowels = strip(
  [
    { name: "burun + u", before: "burun + u", after: "burnu", parts: [{ s: "bur", tone: "ink", label: "kök" }, { s: "(u)", tone: "warn", label: "u düştü" }, { s: "n", tone: "ink", label: "kök" }, { s: "u", tone: "b", label: "ek" }], note: "Ünlü düşmesi: kökteki ikinci u YOK. Son biçimdeki dar u ekin kendisidir." },
    { name: "bekle + yor", before: "bekle + yor", after: "bekliyor", parts: [{ s: "bekl", tone: "ink", label: "kök" }, { s: "i", tone: "warn", label: "e → i (daraldı)" }, { s: "yor", tone: "b", label: "ek" }], note: "Ünlü daralması: ses yok olmadı, geniş e dar i'ye DÖNÜŞTÜ (-yor önünde a/e → ı/i/u/ü)." },
    { name: "ev + i", before: "ev + i", after: "evi", parts: [{ s: "ev", tone: "ink", label: "kök (aynı)" }, { s: "i", tone: "b", label: "ek" }], note: "Olay yok: i ekin kendi sesidir. Dar ünlü görmek tek başına daralma ya da türeme değildir." },
    { name: "ben + e", before: "ben + e", after: "bana", parts: [{ s: "b", tone: "ink", label: "kök" }, { s: "a", tone: "warn", label: "e → a" }, { s: "n", tone: "ink", label: "kök" }, { s: "a", tone: "b", label: "ek" }], note: "Ünlü değişimi: geniş e geniş a oldu; daralma değildir." },
  ],
  "Eksildi mi, değişti mi? Düşmede önceki biçimdeki ünlü sonrakinde yoktur (burnu); daralmada a/e dar ünlüye dönüşür (bekliyor). Ekin kendi ünlüsü olay değildir (evi). 2019 TYT Türkçe 7'de ‘daralma yok’ kararı her aday için böyle bir kanıt arayarak verilir.",
  "Her adımda önce ve sonra biçimi; altta parçalar: düşen ya da değişen kök ünlüsü turuncu, ekler mavi.",
);

export const turkishFiguresSound: Record<string, Record<string, FigureDef>> = {
  "ses-bilgisi": {
    "Ünlünün üç özelliğini birlikte izle": vowelBoard,
    "Yumuşama kökte, benzeşme ek başında aranır": consonants,
    "Ünlü düşmesi ile daralma: eksildi mi, değişti mi?": vowels,
  },
};
