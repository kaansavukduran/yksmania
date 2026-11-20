import type { AppState } from "./model";
import { foundationById, foundationLessons } from "../learning/foundations";

/**
 * Temel İnşa kontrol sorusunun İLK cevabını kaydeder. Aynı soruya sonraki
 * denemeler kaydı değiştirmez (alıştırma serbesttir, kanıt ilk denemedir).
 */
export function recordFoundationAttempt(state: AppState, lessonId: string, index: number, selected: number, date: string): AppState {
  const check = foundationById(lessonId)?.checks[index];
  if (!check || state.foundationAttempts[lessonId]?.[String(index)]) return state;
  return {
    ...state,
    foundationAttempts: {
      ...state.foundationAttempts,
      [lessonId]: { ...state.foundationAttempts[lessonId], [String(index)]: { selected, correct: selected === check.answer, date } },
    },
  };
}

/** İlk denemede doğru sayısı ve kayıtlı ilk deneme sayısı. */
export function foundationScore(state: AppState, lessonId: string) {
  const answers = Object.values(state.foundationAttempts[lessonId] ?? {});
  return { answered: answers.length, firstCorrect: answers.filter((a) => a.correct).length };
}

/** Bütün kontrol soruları ilk denemede doğru çözülen ön ders sayısı. */
export function foundationsMastered(state: AppState): number {
  return foundationLessons.filter((l) => {
    const s = foundationScore(state, l.id);
    return s.answered === l.checks.length && s.firstCorrect === l.checks.length;
  }).length;
}
