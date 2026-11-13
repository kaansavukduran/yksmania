import { z } from "zod";
export type Locale = "tr" | "en";
export type Text = { tr: string; en: string };
export const txt = (tr: string, en: string): Text => ({ tr, en });
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
export const settingsSchema = z.object({
  locale: z.enum(["tr", "en"]),
  theme: z.enum(["dark", "light", "system", "contrast"]),
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
  gamification: z.boolean(),
  dailyMinutes: z.number().int().min(10).max(600),
  blockedWeekdays: z.array(z.number().int().min(0).max(6)).max(7),
  blockedDates: z.array(date).max(3650),
  examDate: z.union([date, z.literal("")]),
});
export type Settings = z.infer<typeof settingsSchema>;
export const responseSchema = z.object({
  questionId: id,
  selected: z.number().int().min(0).max(10),
  correct: z.boolean(),
  assisted: z.boolean(),
  confidence: z.enum(["low", "medium", "high"]),
});
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
  responses: z.array(responseSchema).max(100),
  selected: z.number().int().min(0).max(10).nullable(),
  checked: z.boolean(),
  hint: z.boolean(),
  confidence: z.enum(["low", "medium", "high"]),
  note: z.string().max(20000),
  startedAt: z.number(),
  reviewId: id.optional(),
});
export type Draft = z.infer<typeof draftSchema>;
export const stateSchema = z.object({
  version: z.literal(1),
  settings: settingsSchema,
  sessions: z.array(sessionSchema).max(100000),
  reviews: z.array(reviewSchema).max(300000),
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
});
export type AppState = z.infer<typeof stateSchema>;
export const initialState = (): AppState => ({
  version: 1,
  settings: {
    locale:
      typeof navigator !== "undefined" &&
      navigator.language.toLowerCase().startsWith("en")
        ? "en"
        : "tr",
    theme: "dark",
    scale: 100,
    textSize: 100,
    font: "system",
    motion: true,
    sound: false,
    gamification: true,
    dailyMinutes: 90,
    blockedWeekdays: [],
    blockedDates: [],
    examDate: "",
  },
  sessions: [],
  reviews: [],
  draft: null,
  notes: {},
  unlocked: [],
  readingPages: {},
  explorations: {},
});
export interface Question {
  id: string;
  prompt: Text;
  options: Text[];
  answer: number;
  hint: Text;
  explanation: Text;
  skill: string;
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
