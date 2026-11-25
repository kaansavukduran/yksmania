import { expect, it } from "vitest";
import { lessons } from "../src/domain/content";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { lessonGuides } from "../src/learning/guides";
import revisions from "./fixtures/tyt-theory-revisions.json";
import { beforeTytTheoryRevisions, theoryDigest } from "./helpers/before-tyt-theory-revisions";

it("reconstructs earlier theory only from exact reviewed app records", () => {
  const maps: Record<string, ReadonlyMap<string, unknown>> = {
    lessons: new Map(lessons.map((lesson) => [lesson.id, lesson])),
    guides: lessonGuides,
    sheets: builtInCheatSheets,
  };
  const checked = new Set<string>();
  for (const version of [...revisions].reverse()) {
    for (const { surface, id, after } of version.receipts) {
      const key = `${surface}/${id}`;
      if (checked.has(key)) continue;
      checked.add(key);
      const record = maps[surface].get(id) as Record<string, unknown>;
      expect(theoryDigest(record), key).toBe(after);
      expect(beforeTytTheoryRevisions(surface, id, record), key).not.toEqual(record);
      const altered = { ...record, source: "Yetkisiz kaynak değişikliği" };
      expect(beforeTytTheoryRevisions(surface, id, altered), key).toBe(altered);
    }
  }
  expect(checked.size).toBeGreaterThanOrEqual(4);
});
