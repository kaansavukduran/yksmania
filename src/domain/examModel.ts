import { z } from "zod";
import { helpLevelSchema, questionGuidanceSchema } from "./questionHelpModel";
const examItemSchema = z.object({
  id: z.string().min(1).max(200),
  lessonId: z.string().min(1).max(160),
  subjectId: z.string().min(1).max(160),
  subjectName: z.string().min(1).max(120),
  lessonTitle: z.string().min(1).max(240),
  prompt: z.string().min(1).max(20000),
  passage: z.string().max(20000).optional(),
  options: z.array(z.string().min(1).max(10000)).min(2).max(10),
  answer: z.number().int().min(0).max(9),
  explanation: z.string().min(1).max(20000),
  hint: z.string().min(1).max(20000).optional(),
  guidance: questionGuidanceSchema.optional(),
});
const shape = {
  id: z.string().min(1).max(240),
  title: z.string().min(1).max(240),
  kind: z.enum(["mixed", "branch"]),
  exam: z.enum(["TYT", "AYT"]),
  items: z.array(examItemSchema).min(1).max(300),
  answers: z.array(z.number().int().min(0).max(9).nullable()).min(1).max(300),
  flagged: z.array(z.number().int().min(0).max(299)).max(300),
  index: z.number().int().min(0).max(299),
  startedAt: z.number().int().nonnegative(),
  deadline: z.number().int().positive(),
  durationSeconds: z.number().int().min(1).max(86400),
  mode: z.enum(["simulation", "learning"]).optional(),
  helpEnabled: z.boolean().optional(),
  helpLevels: z.array(helpLevelSchema).min(1).max(300).optional(),
  helpPanelCounts: z.record(z.string(), helpLevelSchema).optional(),
};
type DraftValue = {
  items: {
    id: string;
    options: string[];
    answer: number;
    guidance?: { optionReasons: string[] };
  }[];
  answers: (number | null)[];
  flagged: number[];
  index: number;
  startedAt: number;
  deadline: number;
  durationSeconds: number;
  helpLevels?: number[];
  helpPanelCounts?: Record<string, number>;
};
function check(value: DraftValue, context: z.RefinementCtx) {
  if (
    value.answers.length !== value.items.length ||
    value.index >= value.items.length ||
    new Set(value.items.map((q) => q.id)).size !== value.items.length ||
    new Set(value.flagged).size !== value.flagged.length ||
    value.flagged.some((i) => i >= value.items.length) ||
    value.deadline !== value.startedAt + value.durationSeconds * 1000 ||
    value.items.some(
      (q, i) =>
        q.answer >= q.options.length ||
        (q.guidance !== undefined &&
          q.guidance.optionReasons.length !== q.options.length) ||
        (value.answers[i] !== null && value.answers[i]! >= q.options.length),
    ) ||
    (value.helpLevels !== undefined &&
      value.helpLevels.length !== value.items.length) ||
    (value.helpPanelCounts !== undefined &&
      Object.keys(value.helpPanelCounts).some(
        (key) =>
          !/^(0|[1-9]\d*)$/.test(key) || Number(key) >= value.items.length,
      ))
  ) {
    context.addIssue({ code: "custom", message: "INVALID_EXAM_STATE" });
  }
}
export const examDraftSchema = z.object(shape).superRefine(check);
export const examSessionSchema = z
  .object({
    ...shape,
    finishedAt: z.number().int().nonnegative(),
    timedOut: z.boolean(),
  })
  .superRefine((value, context) => {
    check(value, context);
    if (
      value.finishedAt < value.startedAt ||
      value.finishedAt > value.deadline ||
      value.timedOut !== value.finishedAt >= value.deadline
    )
      context.addIssue({ code: "custom", message: "INVALID_EXAM_END" });
  });
export type ExamDraft = z.infer<typeof examDraftSchema>;
export type ExamSession = z.infer<typeof examSessionSchema>;
export type ExamItem = ExamDraft["items"][number];
