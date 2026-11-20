import ayt_biyoloji from "./ayt-biyoloji.json" with { type: "json" };
import ayt_kimya from "./ayt-kimya.json" with { type: "json" };

/*
 * Display-only repairs for card text. Older content generations left glued
 * words, lost spaces and leaked source notes in some prompts, options,
 * explanations and hints. Card records stay byte-for-byte as accepted (the
 * preservation tests pin them, and guides attach to their exact identity), so
 * each repair maps the exact original string to the string shown on screen.
 * One JSON file per subject: [{ from, to }]. Generated from reviewed patches;
 * this index is generated too (explicit imports, so it also loads outside Vite).
 */
type Row = { from: string; to: string };
const files: Row[][] = [ayt_biyoloji, ayt_kimya];
const repairs = new Map<string, string>();
for (const rows of files) for (const row of rows) repairs.set(row.from, row.to);

/** The repaired text for an exact card string, or the string itself. */
export const displayFix = (text: string): string => repairs.get(text) ?? text;
export const displayFixCount = repairs.size;
