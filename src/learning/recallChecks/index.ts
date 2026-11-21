// Üretilmiş dosya: elle düzenleme. Parti eklendikçe yeniden üretilir.
import tyt_fizik from "./tyt-fizik.json" with { type: "json" };
import tyt_kimya from "./tyt-kimya.json" with { type: "json" };
import tyt_matematik from "./tyt-matematik.json" with { type: "json" };
import tyt_turkce from "./tyt-turkce.json" with { type: "json" };

export interface RecallCheck {
  /** 0-based section index this check follows. */
  after: number;
  prompt: string;
  answer: string;
}

/*
 * Mid-lesson recall checks ("mikro ritim"): every two or three sections one
 * short question about what was just read. Explicit imports so the module also
 * loads outside Vite (tests).
 */
const byLesson: Record<string, RecallCheck[]> = Object.assign({}, tyt_fizik, tyt_kimya, tyt_matematik, tyt_turkce);

/** Mid-lesson recall checks of one lesson, in reading order. */
export const recallChecksFor = (lessonId: string): readonly RecallCheck[] => byLesson[lessonId] ?? [];
export const recallCheckLessonCount = Object.keys(byLesson).length;
export const recallCheckCount = Object.values(byLesson).reduce((n, rows) => n + rows.length, 0);
