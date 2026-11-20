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

/**
 * Short fingerprint of a question identity (cyrb53, 14 hex digits). Large
 * guidance catalogues store this instead of the full identity string; the row
 * is still looked up by question id first, so a collision would need the same
 * id with different content hashing alike.
 */
export function identityHash(identity: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < identity.length; i++) {
    const ch = identity.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, "0");
}
