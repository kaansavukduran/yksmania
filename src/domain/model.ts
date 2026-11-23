import { z } from "zod";
import { examDraftSchema, examSessionSchema } from "./examModel";
import { focusTimerSchema, initialFocusTimer } from "./focusTimer";
import { helpLevelSchema, type QuestionGuidance } from "./questionHelpModel";
export type Locale = "tr";
export type Text = { tr: string };
export const txt = (tr: string): Text => ({ tr });
// Personal preparation target; this is not an official YKS exam date.
// Only new/unset preferences use it. Previously saved dates remain unchanged.
export const DEFAULT_EXAM_DATE = "2027-02-28";
export const THEORY_DEADLINE = "2027-02-28";
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((v) => {
    const d = new Date(v + "T12:00:00");
    return (
      !isNaN(+d) &&
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` ===
        v
    );
  });
const id = z.string().min(1).max(160);
export const defaultAppearance = {
  theme: "dark",
  scale: 100,
  textSize: 100,
  font: "system",
  motion: true,
} as const;

export const settingsSchema = z.object({
  // Read earlier English preferences/backups without losing the rest of the state.
  locale: z.enum(["tr", "en"]).transform(() => "tr" as const),
  // Default only an unset theme. Explicit preferences are stored as before.
  theme: z
    .enum(["dark", "light", "system", "contrast", "matrix", "axolotl", "trans"])
    .default(defaultAppearance.theme),
  scale: z
    .number()
    .int()
    .min(80)
    .max(200)
    .refine((v) => v % 5 === 0),
  textSize: z.number().int().min(80).max(200),
  font: z.enum(["system", "lexend"]),
  motion: z.boolean(),
  sound: z.boolean(),
  // Volume of the synthesised cues, 0–100. Older saves get the default.
  soundVolume: z.number().int().min(0).max(100).default(60),
  gamification: z.boolean(),
  // Kum saati, deneme geri sayımı, hız ve süre notları. undefined = açık;
  // eski kayıt ve yedekler bu alan olmadan aynen açılır.
  timers: z.boolean().optional(),
  dailyMinutes: z.number().int().min(10).max(600),
  blockedWeekdays: z.array(z.number().int().min(0).max(6)).max(7),
  blockedDates: z.array(date).max(3650),
  examDate: z
    .union([date, z.literal("")])
    .default(DEFAULT_EXAM_DATE)
    .transform((v) => v || DEFAULT_EXAM_DATE),
});
export type Settings = z.infer<typeof settingsSchema>;
export const responseSchema = z
  .object({
    questionId: id,
    selected: z.number().int().min(0).max(10),
    correct: z.boolean(),
    assisted: z.boolean(),
    confidence: z.enum(["low", "medium", "high"]),
    helpLevel: helpLevelSchema.optional(),
    helpPanelCount: helpLevelSchema.optional(),
  })
  .refine(
    (response) => !(response.helpLevel && !response.assisted),
    "HELP_REQUIRES_ASSISTED_RESPONSE",
  );
export type Response = z.infer<typeof responseSchema>;
const sessionSchema = z.object({
  id,
  lessonId: id,
  date,
  finishedAt: z.string().max(50),
  responses: z.array(responseSchema).max(100),
  kind: z.enum(["learn", "review", "manual"]),
  minutes: z.number().min(0).max(1440),
  note: z.string().max(20000),
  reviewId: id.optional(),
  includesTheory: z.boolean().optional(),
});
export type Session = z.infer<typeof sessionSchema>;
const reviewSchema = z.object({
  id,
  lessonId: id,
  anchorDate: date,
  targetDate: date,
  stage: z.union([z.literal(3), z.literal(7), z.literal(21)]),
  originSessionId: id,
  completedSessionId: id.optional(),
});
export type Review = z.infer<typeof reviewSchema>;
export const draftSchema = z.object({
  lessonId: id,
  phase: z.enum(["read", "practice", "result"]),
  index: z.number().int().min(0).max(100),
  questionCount: z.number().int().min(1).max(100).optional(),
  responses: z.array(responseSchema).max(100),
  selected: z.number().int().min(0).max(10).nullable(),
  checked: z.boolean(),
  hint: z.boolean(),
  helpLevel: helpLevelSchema.optional(),
  helpPanelCount: helpLevelSchema.optional(),
  confidence: z.enum(["low", "medium", "high"]),
  note: z.string().max(20000),
  startedAt: z.number(),
  reviewId: id.optional(),
});
export type Draft = z.infer<typeof draftSchema>;
export const reviewStages = [3, 7, 21] as const;
export type ReviewStage = (typeof reviewStages)[number];
const theoryReviewCompletionSchema = z.object({
  topicId: id,
  anchorDate: date,
  stage: z.union([z.literal(3), z.literal(7), z.literal(21)]),
  completedDate: date,
});
export type TheoryReviewCompletion = z.infer<
  typeof theoryReviewCompletionSchema
>;
export const stateSchema = z
  .object({
    version: z.literal(1),
    settings: settingsSchema,
    focusTimer: focusTimerSchema.default(initialFocusTimer),
    examDraft: examDraftSchema.nullable().default(null),
    examSessions: z
      .array(examSessionSchema)
      .max(10000)
      .refine((rows) => new Set(rows.map((row) => row.id)).size === rows.length)
      .default([]),
    sessions: z.array(sessionSchema).max(100000),
    reviews: z.array(reviewSchema).max(300000),
    theoryReviewCompletions: z
      .array(theoryReviewCompletionSchema)
      .max(300000)
      .default([]),
    draft: draftSchema.nullable(),
    notes: z.record(z.string(), z.string().max(20000)),
    unlocked: z.array(id).max(10000),
    explorations: z
      .record(
        z.string().max(100),
        z.record(
          z.string().max(60),
          z.union([
            z.string().max(128),
            z.number().min(-1000000).max(1000000),
            z.boolean(),
          ]),
        ),
      )
      .default({}),
    readingPages: z
      .record(z.string(), z.number().int().min(1).max(100000))
      .default({}),
    topicProgress: z
      .record(
        z.string(),
        z.object({
          theory: date.optional(),
          questions: date.optional(),
        }),
      )
      .default({}),
    /**
     * Temel İnşa kontrol sorularında yalnız İLK cevap (ön ders → soru sırası).
     * Tekrar denemeler kaydedilmez; plana, tekrar takvimine ve XP'ye girmez.
     */
    foundationAttempts: z
      .record(
        z.string().max(100),
        z.record(
          z.string().max(3),
          z.object({ selected: z.number().int().min(0).max(4), correct: z.boolean(), date }),
        ),
      )
      .default({}),
  })
  .superRefine((state, context) => {
    if (
      state.examDraft &&
      state.examSessions.some((session) => session.id === state.examDraft!.id)
    )
      context.addIssue({ code: "custom", message: "EXAM_ALREADY_COMPLETED" });
  });
export type AppState = z.infer<typeof stateSchema>;
export const initialState = (): AppState => ({
  version: 1,
  focusTimer: initialFocusTimer(),
  examDraft: null,
  examSessions: [],
  settings: {
    locale: "tr",
    ...defaultAppearance,
    sound: false,
    soundVolume: 60,
    gamification: true,
    dailyMinutes: 90,
    blockedWeekdays: [],
    blockedDates: [],
    examDate: DEFAULT_EXAM_DATE,
  },
  sessions: [],
  reviews: [],
  theoryReviewCompletions: [],
  draft: null,
  notes: {},
  unlocked: [],
  readingPages: {},
  explorations: {},
  topicProgress: {},
  foundationAttempts: {},
});
export interface Question {
  id: string;
  passage?: Text;
  prompt: Text;
  options: Text[];
  answer: number;
  hint: Text;
  explanation: Text;
  skill: string;
  guidance?: QuestionGuidance;
}
export interface Lesson {
  id: string;
  subjectId: string;
  title: Text;
  minutes: number;
  objectives: Text[];
  body: { title: Text; text: Text }[];
  questions: Question[];
  source: Text;
  tags: string[];
}
export interface Subject {
  id: string;
  exam: "TYT" | "AYT";
  name: Text;
  color: string;
  icon: string;
  topics: string[];
}
