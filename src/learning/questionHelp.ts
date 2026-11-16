import { clarifiedQuestionView } from "../domain/questionPresentation";
import curated from "./questionHelpCatalogue.json";
import guidance027Math from "./guidance027Math.json";
import guidance027Physics from "./guidance027Physics.json";
import guidance027Chemistry from "./guidance027Chemistry.json";
import guidance027BiologyA from "./guidance027BiologyA.json";
import guidance027BiologyB from "./guidance027BiologyB.json";
import guidance027BiologyC from "./guidance027BiologyC.json";
import guidance027HistoryA from "./guidance027HistoryA.json";
import guidance027HistoryB from "./guidance027HistoryB.json";
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
// These accepted cards previously exposed one hint and then the full solution.
// Keep that old numbering only for snapshots without their own inline guide.
const expandedLegacyRows: CatalogueRow[] = [
  ...guidance027Math,
  ...guidance027Physics,
  ...guidance027Chemistry,
  ...guidance027BiologyA,
  ...guidance027BiologyB,
  ...guidance027BiologyC,
  ...guidance027HistoryA,
  ...guidance027HistoryB,
].map((row) => ({ ...row, legacyPanelCount: 1 }));
const catalogue = new Map<string, CatalogueRow>(
  [...curated, ...expandedLegacyRows].map((row) => [row.id, row]),
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
