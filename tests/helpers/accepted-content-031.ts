import questionFingerprints from "../fixtures/source-stage-027-question-fingerprints.json";
import lessonFingerprints from "../fixtures/source-stage-027-lesson-fingerprints.json";
import guideFingerprints from "../fixtures/source-stage-027-guide-fingerprints.json";

// Historical acceptance gates keep their immutable cohorts and hashes when
// later lessons are added. The031 integration gate covers the enlarged catalogue.
export const acceptedQuestion031 = (question: { id: string }) =>
  Object.hasOwn(questionFingerprints, question.id);
export const acceptedLesson031 = (lesson: { id: string }) =>
  Object.hasOwn(lessonFingerprints, lesson.id);
export const acceptedGuide031 = ([id]: [string, unknown]) =>
  Object.hasOwn(guideFingerprints, id);

export function beforeFoundation031Registration(source: string): string {
  // Reverse only the two additive registration lines; every earlier byte is
  // still compared with the unchanged historical SHA-256 by the source gate.
  return source
    .replace(
      'import { geometryFoundation031Lessons } from "../learning/geometryFoundation031";\n',
      "",
    )
    .replace("  ...geometryFoundation031Lessons,\n", "");
}
