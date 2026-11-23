import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";
import { runForge034035SmokeCase } from "./forge034035-smoke-cases.mjs";
import { forge038SmokeCases } from "./forge038-smoke-cases.mjs";
import { forge039SmokeCases } from "./forge039-smoke-cases.mjs";

export const forge038039SmokeCases = [
  ...forge038SmokeCases,
  ...forge039SmokeCases,
];

// Reuse the established ordinary-entry, no-credit, note and offline-reload checks.
export const runForge038039SmokeCase = runForge034035SmokeCase;

const learning = (s) => ({
  sessions: s.sessions,
  reviews: s.reviews,
  theoryReviewCompletions: s.theoryReviewCompletions,
  topicProgress: s.topicProgress,
  unlocked: s.unlocked,
  notes: s.notes,
  settings: s.settings,
  draft: s.draft,
  examDraft: s.examDraft,
  examSessions: s.examSessions,
  focusTimer: s.focusTimer,
});

export async function assertForge038039ProcessRestart(page, navigate, snapshots, cases = forge038039SmokeCases) {
  expect(snapshots).toHaveLength(2);
  expect(new Set(snapshots.map((snapshot) => snapshot.id)).size).toBe(2);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = cases.find((item) => item.id === snapshot.id);
    expect(unit).toBeTruthy();
    expect(snapshot.storedKey).toBe(unit.storedKey);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
    expect((await readState(page)).notes[`lesson:${unit.id}`]).toBe(snapshot.note);
    await navigate("Konu Anlatımı");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(unit.title);
    const subject = page.locator(".subject-panel").filter({
      has: page.getByRole("heading", { name: "Matematik", exact: true }),
    });
    const entry = subject.locator(`.ready-topic[data-lesson-id="${unit.id}"]`);
    if (!(await entry.isVisible())) await subject.locator(".subject-header").click();
    await entry.click();
    const lab = page.locator(unit.selector);
    await expect(lab).toBeVisible();
    await unit.assertModel(lab);
    await expect(page.getByRole("textbox", { name: "Notun", exact: true })).toHaveValue(snapshot.note);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(snapshot.saved);
  }
  expect(learning(await readState(page))).toEqual(before);
}
