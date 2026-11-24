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
  // Reverse only additive registration lines; every earlier byte is
  // still compared with the unchanged historical SHA-256 by the source gate.
  return source
    .replace('import { waterReflectionQuestion } from "../learning/waterReflectionQuestion136";\n', "")
    .replace('import { soundLevelQuestion } from "../learning/soundLevelQuestion148";\n', "")
    .replace('import { sonarDistanceQuestion } from "../learning/sonarQuestion157";\n', "")
    .replace(
      '  ...forge012PhysicsLessons.map((lesson) => {\n    if (lesson.id === "su-dalgalari") return { ...lesson, questions: [...lesson.questions, waterReflectionQuestion] };\n    if (lesson.id === "ses-deprem-dalgalari") return { ...lesson, questions: [...lesson.questions, soundLevelQuestion, sonarDistanceQuestion] };\n    return lesson;\n  }),\n',
      "  ...forge012PhysicsLessons,\n",
    )
    .replace('import { airBuoyancyQuestion } from "../learning/airBuoyancyQuestion098";\n', "")
    .replace('import { springPulseQuestion } from "../learning/springPulseQuestion107";\n', "")
    .replace('import { waveDirectionsQuestion } from "../learning/waveDirectionsQuestion118";\n', "")
    .replace('import { springOverlapQuestion } from "../learning/springOverlapQuestion128";\n', "")
    .replace(", springOverlapQuestion", "")
    .replace('import { springDensityQuestion } from "../learning/springDensityQuestion124";\n', "")
    .replace("springPulseQuestion, springDensityQuestion", "springPulseQuestion")
    .replace('    if (lesson.id === "dalgalara-giris") return { ...lesson, questions: [...lesson.questions, waveDirectionsQuestion] };\n', "")
    .replace(
      '  ...forge011PhysicsLessons.map((lesson) => {\n    if (lesson.id === "sivilarin-kaldirma-kuvveti") return { ...lesson, questions: [...lesson.questions, airBuoyancyQuestion] };\n    if (lesson.id === "yay-dalgalari") return { ...lesson, questions: [...lesson.questions, springPulseQuestion] };\n    return lesson;\n  }),\n',
      "  ...forge011PhysicsLessons,\n",
    )
    .replace(
      'import { ogmTranslationPractice } from "../learning/ogmTranslationPractice071";\n',
      "",
    )
    .replace("  ogmTranslationPractice,\n", "")
    .replace(
      'import { probabilityLesson036 } from "../learning/probabilitySource036";\n',
      "",
    )
    .replace("  probabilityLesson036,\n", "")
    .replace(
      'import { forceAccelerationQuestion } from "../learning/forceAccelerationPractice";\n',
      "",
    )
    .replace("      forceAccelerationQuestion,\n", "")
    .replace(
      'import { forceVelocityQuestion } from "../learning/forceVelocityOptions048";\n',
      "",
    )
    .replace("      forceVelocityQuestion,\n", "")
    .replace(
      'import { countingLessons034035 } from "../learning/countingSources034035";\n',
      "",
    )
    .replace("  ...countingLessons034035,\n", "")
    .replace(
      'import { permutationLessons032033 } from "../learning/permutationSources032033";\n',
      "",
    )
    .replace("  ...permutationLessons032033,\n", "")
    .replace(
      'import { factorizationSource028Practice } from "../learning/factorizationSource028Revision";\n',
      "",
    )
    .replace("      ...factorizationSource028Practice,\n", "")
    .replace(
      'import { geometryCircle040Lessons } from "../learning/geometryCircle040";\n',
      "",
    )
    .replace("  ...geometryCircle040Lessons,\n", "")
    .replace(
      'import { sourceQuestionLessons024 } from "../learning/sourceExercises024";\n',
      "",
    )
    .replace("  ...sourceQuestionLessons024,\n", "")
    .replace(
      'import { absoluteValueSource038Lessons } from "../learning/absoluteValueSource038";\n',
      "",
    )
    .replace("  ...absoluteValueSource038Lessons,\n", "")
    .replace(
      'import { absoluteValueSource012Lessons } from "../learning/absoluteValueSource012Revision";\n',
      "",
    )
    .replace("  ...absoluteValueSource012Lessons,\n", "")
    .replace(
      'import { powersSource039Lessons } from "../learning/powersSource039";\n',
      "",
    )
    .replace("  ...powersSource039Lessons,\n", "")
    .replace(
      'import { linearEquationsSource036Lessons } from "../learning/linearEquationsSource036";\n',
      "",
    )
    .replace("  ...linearEquationsSource036Lessons,\n", "")
    .replace(
      'import { basicInequalitiesSource037Lessons } from "../learning/basicInequalitiesSource037";\n',
      "",
    )
    .replace("  ...basicInequalitiesSource037Lessons,\n", "")
    .replace(
      'import { ebobEkokSource034Lessons } from "../learning/ebobEkokSource034";\n',
      "",
    )
    .replace("  ...ebobEkokSource034Lessons,\n", "")
    .replace(
      'import { rationalSource035Lessons } from "../learning/rationalSource035";\n',
      "",
    )
    .replace("  ...rationalSource035Lessons,\n", "")
    .replace(
      'import { factorialSource033Lessons } from "../learning/factorialSource033";\n',
      "",
    )
    .replace("  ...factorialSource033Lessons,\n", "")
    .replace(
      'import { primeSource032Lessons } from "../learning/primeSource032";\n',
      "",
    )
    .replace("  ...primeSource032Lessons,\n", "")
    .replace(
      'import { geometryExpansion032Lessons } from "../learning/geometryExpansion032";\n',
      "",
    )
    .replace("  ...geometryExpansion032Lessons,\n", "")
    .replace(
      'import { geometryFoundation031Lessons } from "../learning/geometryFoundation031";\n',
      "",
    )
    .replace("  ...geometryFoundation031Lessons,\n", "");
}
