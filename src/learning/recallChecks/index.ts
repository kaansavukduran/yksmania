// Üretilmiş dosya: elle düzenleme. Parti eklendikçe yeniden üretilir.
export interface RecallCheck {
  /** 0-based section index this check follows. */
  after: number;
  prompt: string;
  answer: string;
}

const byLesson: Record<string, RecallCheck[]> = {};

/** Mid-lesson recall checks of one lesson, in reading order. */
export const recallChecksFor = (lessonId: string): readonly RecallCheck[] => byLesson[lessonId] ?? [];
export const recallCheckLessonCount = Object.keys(byLesson).length;
export const recallCheckCount = Object.values(byLesson).reduce((n, rows) => n + rows.length, 0);
