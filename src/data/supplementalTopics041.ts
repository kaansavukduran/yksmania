// The built-in “Üçgen ve paralelkenarda alan” lesson existed without a study
// plan topic, so the home screen showed 505 lessons beside a 504-topic plan.
// This additive topic links it. Its id equals the existing cheat-sheet key
// (lesson:alan-donusumleri) so saved sheet notes keep resolving; workbook IDs,
// order and saved records stay.
export const areaTransform041Ids = ["alan-donusumleri"] as const;

export const supplementalTopics041 = [
  { id: "lesson:alan-donusumleri", subjectId: "tyt-geometri", title: "Üçgen ve paralelkenarda alan" },
];

export const areaTransform041TopicMap: Record<string, string> = {
  "alan-donusumleri": "lesson:alan-donusumleri",
};
