import { clarifiedQuestionView } from "../domain/questionPresentation";
import curated from "./questionHelpCatalogue.json";
import {
  questionIdentity,
  type HelpQuestion,
  type QuestionGuidance,
} from "../domain/questionHelpModel";

// Identity includes the complete stem, passage, options, key and explanation.
// A saved exam never borrows guidance for a changed version of its question.
type CatalogueRow = {
  id: string;
  identity: string;
  hint?: string;
  guidance: QuestionGuidance;
  legacyPanelCount?: number;
};
const catalogue = new Map<string, CatalogueRow>(
  curated.map((row) => [row.id, row]),
);
function matchingRow(question: HelpQuestion) {
  const view = clarifiedQuestionView(question);
  const row = catalogue.get(view.id);
  return row?.identity === questionIdentity(view) ? row : undefined;
}
// A saved snapshot with its own guide already has that guide's numbering.
export function previousHelpPanelCount(
  question: HelpQuestion,
): number | undefined {
  return question.guidance
    ? undefined
    : matchingRow(question)?.legacyPanelCount;
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
        ...(hint &&
        !guidance.knowledge.includes(hint) &&
        guidance.strategy !== hint &&
        !guidance.steps.includes(hint)
          ? [hint]
          : []),
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
