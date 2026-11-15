import { z } from "zod";

const paragraph = z.string().min(1).max(4000);
export const questionGuidanceSchema = z.object({
  knowledge: z.array(paragraph).min(1).max(8),
  strategy: paragraph,
  steps: z.array(paragraph).min(1).max(24),
  optionReasons: z.array(paragraph).min(2).max(10),
  commonError: paragraph,
  check: paragraph,
});
export type QuestionGuidance = z.infer<typeof questionGuidanceSchema>;
export const helpLevelSchema = z.number().int().min(0).max(32);

export interface HelpQuestion {
  id: string;
  prompt: string;
  passage?: string;
  options: string[];
  answer: number;
  explanation: string;
  hint?: string;
  guidance?: QuestionGuidance;
}
export function questionIdentity(q: HelpQuestion) {
  return JSON.stringify([
    q.id,
    q.prompt,
    q.passage ?? "",
    q.options,
    q.answer,
    q.explanation,
  ]);
}
