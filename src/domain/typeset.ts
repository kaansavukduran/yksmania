/*
 * Display-only Turkish typesetting. Content records stay byte-for-byte as they
 * were saved (preservation tests pin them); this repairs, at render time, the
 * spacing slips that older content generations left in running text:
 *   “toplam180°” → “toplam 180°”, “açıortay,kenarortay” → “açıortay, kenarortay”,
 *   “enerji;foton” → “enerji; foton”, “...” → “…”.
 * Mathematical names (sin2x, log2), codes, file names and links are left alone.
 */
const L = "a-zçğıöşüâîû";
const KEEP = new Set([
  "sin", "cos", "tan", "cot", "sec", "csc", "log", "lim", "arc", "max", "min", "mod", "arcsin", "arccos", "arctan",
  "sinh", "cosh", "tanh", "exp", "det", "deg", "rad", "mol", "page", "tyt", "ayt", "yks", "lys", "ygs", "kpss", "ales",
  "dgs", "msü", "öss", "öys", "forge", "www", "https", "http", "html", "pdf", "node",
]);
const wordDigit = new RegExp(`(^|[\\s(“"«])([${L}]{3,})(?=\\d)`, "g");
const suffixDigit = new RegExp(`(’)([${L}]{2,})(?=\\d)`, "g");
const commaWord = new RegExp(`(?<![A-Za-z0-9ÇĞİÖŞÜ${L}])([A-ZÇĞİÖŞÜ]?[${L}]{2,})([,;])(?=[${L}]{3,})`, "g");
const ellipsis = /(?<![.…])\.\.\.(?!\.)/g;
// “fark−60°”, “nemi%100”, “için°C”: a word glued to a signed number, a percent or a degree unit.
const wordSign = new RegExp(`(?<![A-Za-z0-9${L}])([${L}]{2,})(?=[−%]\\d|°C)`, "g");
// “alçalıyor;100 m” and “merkezdir.1.013 hPa”: a clause mark glued to the next number.
const semicolonDigit = /;(?=\d)/g;
const sentenceDigit = new RegExp(`([${L}]{4,})\\.(?=\\d)`, "g");
const linkLike = /[/_#@]|https?:|www\.|\.pdf|\.html/;

function fixToken(token: string): string {
  if (linkLike.test(token)) return token;
  return token
    .replace(wordDigit, (m, pre: string, word: string) => (KEEP.has(word) ? m : `${pre}${word} `))
    .replace(suffixDigit, (m, ap: string, word: string) => `${ap}${word} `);
}

export function typeset(text: string): string {
  if (!text) return text;
  // Work token by token so a link or code fragment is never touched.
  const spaced = text
    .split(/(\s+)/)
    .map((part) => (/\s/.test(part) ? part : fixToken(part)))
    .join("");
  return spaced
    .replace(commaWord, (_m, word: string, mark: string) => `${word}${mark} `)
    .replace(wordSign, "$1 ")
    .replace(semicolonDigit, "; ")
    .replace(sentenceDigit, "$1. ")
    .replace(ellipsis, "…");
}
