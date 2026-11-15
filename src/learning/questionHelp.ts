import curated from "./questionHelpCatalogue.json";
import {
  questionIdentity,
  type HelpQuestion,
  type QuestionGuidance,
} from "../domain/questionHelpModel";

// Identity includes the complete stem, passage, options, key and explanation.
// A saved exam never borrows guidance for a changed version of its question.
const catalogue = new Map(curated.map((row) => [row.id, row]));
function matchingRow(question: HelpQuestion) {
  const row = catalogue.get(question.id);
  return row?.identity === questionIdentity(question) ? row : undefined;
}
export function resolvedGuidance(
  question: HelpQuestion,
): QuestionGuidance | undefined {
  const guidance = question.guidance ?? matchingRow(question)?.guidance;
  return guidance?.optionReasons.length === question.options.length
    ? guidance
    : undefined;
}
export function helpPanels(question: HelpQuestion) {
  const guidance = resolvedGuidance(question);
  const hint = question.hint ?? matchingRow(question)?.hint;
  if (!guidance)
    return hint ? [{ title: "İlk ipucu", paragraphs: [hint] }] : [];
  return [
    {
      title: "Bilmen gerekenler",
      paragraphs: [
        ...(hint && !guidance.knowledge.includes(hint) ? [hint] : []),
        ...guidance.knowledge,
      ],
    },
    { title: "Çözüm yolu", paragraphs: [guidance.strategy] },
    ...guidance.steps.map((step, i) => ({
      title: `${i + 1}. adım`,
      paragraphs: [step],
    })),
  ];
}
