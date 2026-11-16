import catalogue from "./videoCatalog031.json";

export interface SourceVideo031 {
  channel: string;
  detail?: string;
  url: string;
}
export interface VideoGroup031 {
  subjectId: string;
  topic: string;
  lessonIds: string[];
  recommended: SourceVideo031[];
  alternatives: SourceVideo031[];
}
export interface LessonVideo031 extends SourceVideo031 {
  topics: string[];
}
export interface LessonVideos031 {
  recommended: readonly LessonVideo031[];
  alternatives: readonly LessonVideo031[];
}

// Public video links and educational labels only. The private source documents,
// personal task/calendar fields and their identifiers are not application data.
export const videoCatalog031: readonly VideoGroup031[] = catalogue;

export function videoIdentity031(value: string): string | undefined {
  try {
    const url = new URL(value);
    const id = url.searchParams.get("v");
    if (
      url.protocol !== "https:" ||
      !["www.youtube.com", "youtube.com"].includes(url.hostname) ||
      url.pathname !== "/watch" ||
      url.username ||
      url.password ||
      url.port ||
      !id ||
      !/^[A-Za-z0-9_-]{11}$/.test(id)
    )
      return undefined;
    // Two starts in a long video may teach different subtopics. Do not collapse
    // their timestamps, or rewrite the source URL used by the external link.
    return `${id}@${url.searchParams.get("t") ?? url.searchParams.get("start") ?? "0"}:${url.searchParams.get("end") ?? ""}`;
  } catch {
    return undefined;
  }
}

const groupsByLesson = new Map<string, VideoGroup031[]>();
for (const group of videoCatalog031) {
  for (const lessonId of group.lessonIds) {
    const groups = groupsByLesson.get(lessonId) ?? [];
    groups.push(group);
    groupsByLesson.set(lessonId, groups);
  }
}

const empty: LessonVideos031 = { recommended: [], alternatives: [] };
const videosByLesson = new Map<string, LessonVideos031>();
for (const [lessonId, groups] of groupsByLesson) {
  const recommended = new Map<string, LessonVideo031>();
  const alternatives = new Map<string, LessonVideo031>();
  for (const group of groups) {
    for (const role of ["recommended", "alternatives"] as const) {
      const target = role === "recommended" ? recommended : alternatives;
      for (const video of group[role]) {
        const key = videoIdentity031(video.url);
        if (!key) continue;
        const existing = target.get(key);
        if (existing) {
          if (!existing.topics.includes(group.topic))
            existing.topics.push(group.topic);
        } else {
          target.set(key, { ...video, topics: [group.topic] });
        }
      }
    }
  }
  // The same source link can support multiple subtopics of one lesson. Present
  // it once, while retaining every source topic label in its visible card.
  for (const [key, video] of alternatives) {
    const preferred = recommended.get(key);
    if (!preferred) continue;
    for (const topic of video.topics)
      if (!preferred.topics.includes(topic)) preferred.topics.push(topic);
    alternatives.delete(key);
  }
  videosByLesson.set(lessonId, {
    recommended: [...recommended.values()],
    alternatives: [...alternatives.values()],
  });
}

export function getLessonVideos031(lessonId: string): LessonVideos031 {
  return videosByLesson.get(lessonId) ?? empty;
}
