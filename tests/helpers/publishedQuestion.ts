import { newtonMassQuestionErratum } from "../../src/domain/questionErrata";

// Keep historical fixtures unchanged and permit only this documented premise
// correction. IDs, keys, options and every other original field remain checked.
export function publishedQuestion<
  T extends { id: string; prompt: { tr: string } },
>(q: T): T {
  return q.id === newtonMassQuestionErratum.id &&
    q.prompt.tr === newtonMassQuestionErratum.before
    ? { ...q, prompt: { ...q.prompt, tr: newtonMassQuestionErratum.after } }
    : q;
}
