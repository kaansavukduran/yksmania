import { z } from "zod";

export const focusTimerSchema = z
  .object({
    durationSeconds: z
      .number()
      .int()
      .min(60)
      .max(7200)
      .refine((value) => value % 60 === 0),
    remainingMs: z.number().min(0).max(7200000),
    phase: z.enum(["idle", "running", "paused"]),
    deadline: z.number().finite().nonnegative().nullable(),
  })
  .superRefine((timer, context) => {
    if (
      (timer.phase === "running") !== (timer.deadline !== null) ||
      timer.remainingMs > timer.durationSeconds * 1000
    ) {
      context.addIssue({ code: "custom", message: "INVALID_FOCUS_TIMER" });
    }
  });
export type FocusTimerState = z.infer<typeof focusTimerSchema>;
export const initialFocusTimer = (): FocusTimerState => ({
  durationSeconds: 300,
  remainingMs: 300000,
  phase: "idle",
  deadline: null,
});
export function remainingTime(timer: FocusTimerState, now: number) {
  return timer.phase === "running" && timer.deadline !== null
    ? Math.max(0, Math.min(timer.durationSeconds * 1000, timer.deadline - now))
    : timer.remainingMs;
}
export type TimerAction =
  { type: "flip" | "pause" | "resume" } | { type: "duration"; seconds: number };
export function changeTimer(
  timer: FocusTimerState,
  action: TimerAction,
  now: number,
): FocusTimerState {
  if (action.type === "duration") {
    if (
      !Number.isInteger(action.seconds) ||
      action.seconds < 60 ||
      action.seconds > 7200 ||
      action.seconds % 60 !== 0
    )
      throw Error("TIMER_DURATION");
    return {
      durationSeconds: action.seconds,
      remainingMs: action.seconds * 1000,
      phase: "idle",
      deadline: null,
    };
  }
  if (action.type === "flip")
    return {
      ...timer,
      phase: "running",
      remainingMs: timer.durationSeconds * 1000,
      deadline: now + timer.durationSeconds * 1000,
    };
  const remaining = remainingTime(timer, now);
  if (action.type === "pause")
    return {
      ...timer,
      phase: "paused",
      remainingMs: remaining,
      deadline: null,
    };
  if (remaining <= 0) return changeTimer(timer, { type: "flip" }, now);
  return {
    ...timer,
    phase: "running",
    remainingMs: remaining,
    deadline: now + remaining,
  };
}
export function formatCountdown(milliseconds: number) {
  const seconds = Math.ceil(Math.max(0, milliseconds) / 1000);
  const hours = Math.floor(seconds / 3600),
    minutes = Math.floor((seconds % 3600) / 60),
    rest = seconds % 60;
  return `${hours ? `${hours}:` : ""}${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}
