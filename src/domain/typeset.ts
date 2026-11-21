import { displayFix } from "../learning/displayFixes";
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
// The following word is captured so a subscript such as “fs,max” is not split.
const commaWord = new RegExp(`(?<![A-Za-z0-9ÇĞİÖŞÜ${L}])([A-ZÇĞİÖŞÜ]?[${L}]{2,})([,;])(?=([${L}]{3,}))`, "g");
const ellipsis = /(?<![.…])\.\.\.(?!\.)/g;
// “fark−60°”, “nemi%100”, “için°C”: a word glued to a signed number, a percent or a degree unit.
// Variables such as “ax−1” are mathematics, not prose: only real words qualify
// (three letters or more, or one of the short Turkish words below).
const wordSign = new RegExp(`(?<![A-Za-z0-9${L}])([${L}]{2,})(?=[−%]\\d|°C)`, "g");
const SHORT_WORDS = new Set(["ve", "de", "da", "ki", "ya"]);
// “alçalıyor;100 m” and “merkezdir.1.013 hPa”: a clause mark glued to the next number.
const semicolonDigit = /;(?=\d)/g;
const sentenceDigit = new RegExp(`([${L}]{4,})\\.(?=\\d)`, "g");
const linkLike = /[/_#@]|https?:|www\.|\.pdf|\.html/;
// “Sin x”, “Log₂8”, “Cos2u”: an automatic sentence capital on a function name.
// Only when mathematics follows (a digit, an index, a bracket or a lone variable),
// so ordinary words such as “Tan vakti” or “Sinir” are left alone.
const capitalFunction = new RegExp(
  `(?<![A-Za-zÇĞİÖŞÜ${L}])(Sin|Cos|Tan|Cot|Sec|Csc|Log|Ln)(?=[0-9₀-₉²³(_]|\\s[A-Za-zαβθφ](?![A-Za-z${L}]))`,
  "g",
);

// Reviewed spelling repairs for whole words older content misspelled.
// “periskl” is “perisikl” (perisiklus); its suffixes follow the front vowel.
const SPELLING: [RegExp, string][] = [
  [/(?<![a-zçğıöşü])periskldan(?![a-zçğıöşü])/g, "perisiklden"],
  [/(?<![a-zçğıöşü])periskldır(?![a-zçğıöşü])/g, "perisikldir"],
  [/(?<![a-zçğıöşü])periskl(?=i?(?![a-zçğıöşü]))/g, "perisikl"],
];

function fixToken(token: string): string {
  if (linkLike.test(token)) return token;
  return token
    .replace(wordDigit, (m, pre: string, word: string) => (KEEP.has(word) ? m : `${pre}${word} `))
    .replace(suffixDigit, (m, ap: string, word: string) => `${ap}${word} `);
}

export function typeset(original: string): string {
  if (!original) return original;
  // Reviewed per-card repairs come first; the general rules then tidy the rest.
  const text = SPELLING.reduce((t, [rule, to]) => t.replace(rule, to), displayFix(original));
  // Work token by token so a link or code fragment is never touched.
  const spaced = text
    .split(/(\s+)/)
    .map((part) => (/\s/.test(part) ? part : fixToken(part)))
    .join("");
  return spaced
    .replace(commaWord, (m, word: string, mark: string, next: string) =>
      word.length <= 2 && KEEP.has(next) ? m : `${word}${mark} `,
    )
    .replace(wordSign, (m, word: string) => (KEEP.has(word) || (word.length < 3 && !SHORT_WORDS.has(word)) ? m : `${word} `))
    .replace(semicolonDigit, "; ")
    .replace(sentenceDigit, "$1. ")
    .replace(capitalFunction, (name: string) => name.toLowerCase())
    .replace(ellipsis, "…");
}
