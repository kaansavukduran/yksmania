export declare const CONTENT_CEILINGS: {
  missingReasons: number;
  emptyReasons: number;
  dependent: number;
  orphanTopics: number;
  missingHint: number;
  missingSteps: number;
  missingRequiredVisuals: number;
};
export declare function compareAudit(
  counts: Record<string, number>,
  ceilings?: Record<string, number>,
): { over: string[]; lower: string[] };
