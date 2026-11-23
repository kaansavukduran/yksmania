import { identityHash, type HelpQuestion } from "../domain/questionHelpModel";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import type { SourceAttribution } from "./sourceExercises024";

type SourceVisuals = {
  source: SourceAttribution;
  figure?: SourceQuestionFigureSpec;
  optionFigures?: readonly SourceQuestionFigureSpec[];
  optionFigureRevision?: string;
  explanationFigure?: SourceQuestionFigureSpec;
  stepFigures?: readonly SourceQuestionFigureSpec[];
};

type FigureRevisions = {
  visibleFigureRevision?: string;
  solutionFigureRevision?: string;
};

function figureIdentity(figure?: SourceQuestionFigureSpec) {
  if (!figure || figure.kind !== "image") return figure;
  const { src: _src, ...identity } = figure;
  return /^[0-9a-f]{64}$/.test(identity.assetSHA256 ?? "") ? identity : undefined;
}

export function sourceVisualRevisions(question: HelpQuestion, visuals: SourceVisuals | undefined): FigureRevisions {
  if (!visuals) return {};
  const stem = figureIdentity(visuals.figure);
  const options = visuals.optionFigures?.map(figureIdentity);
  if ((visuals.figure && !stem) || options?.some((item) => !item)) return {};
  const visible = stem || options
    ? identityHash(JSON.stringify([question.id, question.passage, question.prompt, question.options,
        question.answer, visuals.source, stem, options]))
    : undefined;
  if (!visible) return {};
  const solution = figureIdentity(visuals.explanationFigure);
  const steps = visuals.stepFigures?.map(figureIdentity);
  const guidance = question.guidance;
  const guidanceIdentity = guidance && [
    guidance.knowledge, guidance.strategy, guidance.steps, guidance.optionReasons,
    guidance.commonError, guidance.check,
  ];
  const solutionRevision = (solution || steps?.some(Boolean)) &&
      (!visuals.explanationFigure || solution) && !steps?.some((item) => !item)
    ? identityHash(JSON.stringify([visible, question.hint, question.explanation, guidanceIdentity, solution, steps]))
    : undefined;
  return solutionRevision
    ? { visibleFigureRevision: visible, solutionFigureRevision: solutionRevision }
    : { visibleFigureRevision: visible };
}

export function savedSourceVisuals(
  question: HelpQuestion,
  visuals: SourceVisuals | undefined,
  response: FigureRevisions & { optionFigureRevision?: string },
) {
  const revisions = sourceVisualRevisions(question, visuals);
  const current = Boolean(response.visibleFigureRevision &&
    revisions.visibleFigureRevision === response.visibleFigureRevision);
  const legacyOptions = Boolean(!response.visibleFigureRevision && !visuals?.figure &&
    response.optionFigureRevision && visuals?.optionFigureRevision === response.optionFigureRevision);
  const visibleExpected = Boolean(visuals?.figure || visuals?.optionFigures ||
    response.visibleFigureRevision || response.optionFigureRevision);
  const solution = current && Boolean(response.solutionFigureRevision &&
    revisions.solutionFigureRevision === response.solutionFigureRevision);
  return {
    stem: current ? visuals?.figure : undefined,
    options: current || legacyOptions ? visuals?.optionFigures : undefined,
    explanation: solution ? visuals?.explanationFigure : undefined,
    steps: solution ? visuals?.stepFigures : undefined,
    figuresUnavailable: visibleExpected && !current && !legacyOptions,
    solutionUnavailable: Boolean(response.solutionFigureRevision) && !solution,
  };
}
