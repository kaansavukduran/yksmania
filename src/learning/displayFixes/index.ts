import anlatim_ek from "./anlatim-ek.json" with { type: "json" };
import anlatim_tyt_biyoloji from "./anlatim-tyt-biyoloji.json" with { type: "json" };
import anlatim_tyt_cografya from "./anlatim-tyt-cografya.json" with { type: "json" };
import anlatim_tyt_din from "./anlatim-tyt-din.json" with { type: "json" };
import anlatim_tyt_felsefe from "./anlatim-tyt-felsefe.json" with { type: "json" };
import anlatim_tyt_fizik from "./anlatim-tyt-fizik.json" with { type: "json" };
import anlatim_tyt_geometri from "./anlatim-tyt-geometri.json" with { type: "json" };
import anlatim_tyt_kimya from "./anlatim-tyt-kimya.json" with { type: "json" };
import anlatim_tyt_matematik from "./anlatim-tyt-matematik.json" with { type: "json" };
import anlatim_tyt_tarih from "./anlatim-tyt-tarih.json" with { type: "json" };
import anlatim_tyt_turkce from "./anlatim-tyt-turkce.json" with { type: "json" };
import ayt_biyoloji from "./ayt-biyoloji.json" with { type: "json" };
import ayt_fizik from "./ayt-fizik.json" with { type: "json" };
import ayt_kimya from "./ayt-kimya.json" with { type: "json" };
import ayt_matematik from "./ayt-matematik.json" with { type: "json" };
import tyt_biyoloji from "./tyt-biyoloji.json" with { type: "json" };
import tyt_cografya from "./tyt-cografya.json" with { type: "json" };
import tyt_din from "./tyt-din.json" with { type: "json" };
import tyt_felsefe from "./tyt-felsefe.json" with { type: "json" };
import tyt_fizik from "./tyt-fizik.json" with { type: "json" };
import tyt_geometri from "./tyt-geometri.json" with { type: "json" };
import tyt_kimya from "./tyt-kimya.json" with { type: "json" };
import tyt_matematik from "./tyt-matematik.json" with { type: "json" };
import tyt_tarih from "./tyt-tarih.json" with { type: "json" };
import tyt_turkce from "./tyt-turkce.json" with { type: "json" };

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
const files: Row[][] = [anlatim_ek, anlatim_tyt_biyoloji, anlatim_tyt_cografya, anlatim_tyt_din, anlatim_tyt_felsefe, anlatim_tyt_fizik, anlatim_tyt_geometri, anlatim_tyt_kimya, anlatim_tyt_matematik, anlatim_tyt_tarih, anlatim_tyt_turkce, ayt_biyoloji, ayt_fizik, ayt_kimya, ayt_matematik, tyt_biyoloji, tyt_cografya, tyt_din, tyt_felsefe, tyt_fizik, tyt_geometri, tyt_kimya, tyt_matematik, tyt_tarih, tyt_turkce];
const repairs = new Map<string, string>();
for (const rows of files) for (const row of rows) repairs.set(row.from, row.to);

/** The repaired text for an exact card string, or the string itself. */
export const displayFix = (text: string): string => repairs.get(text) ?? text;
export const displayFixCount = repairs.size;
