type HelpPanel = { readonly paragraphs: readonly string[] };
const count = (value: number | undefined): value is number =>
  value !== undefined && Number.isInteger(value) && value >= 0 && value <= 32;

// A display projection only: old saved ordinals and snapshots are never migrated.
export function effectiveHelpLevel(
  panels: readonly HelpPanel[],
  storedLevel: number | undefined,
  storedPanelCount?: number,
  previousPanelCount?: number,
  originalHint?: string,
): number {
  const current = panels.length;
  const level =
    typeof storedLevel === "number" && Number.isFinite(storedLevel)
      ? Math.max(0, Math.trunc(storedLevel))
      : 0;
  if (level === 0) return 0;
  const marked = count(storedPanelCount);
  // A legacy snapshot without its optional hint had zero old panels, so level1
  // was already the full solution. Explicit markers (including0) take priority.
  const previous = marked
    ? storedPanelCount
    : previousPanelCount === 1 && !originalHint
      ? 0
      : count(previousPanelCount)
        ? previousPanelCount
        : current;
  if (previous < current && level > previous) return current + 1;
  if (previous < current && previous === 1 && level === 1 && originalHint) {
    const hintPanel = panels.findIndex((p) =>
      p.paragraphs.includes(originalHint),
    );
    if (hintPanel >= 0) return hintPanel + 1;
  }
  return Math.min(level, current + 1);
}
