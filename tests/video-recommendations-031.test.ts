import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  getLessonVideos031,
  videoCatalog031,
  videoIdentity031,
} from "../src/learning/videoCatalog031";
import { VideoRecommendations031 } from "../src/learning/VideoRecommendations031";
import { lessons } from "../src/domain/content";

const foundationIds = [
  "tyt-geo-temel-acilar-031",
  "tyt-geo-ucgende-acilar-031",
  "tyt-geo-ucgen-esitsizligi-031",
  "tyt-geo-dik-ucgen-031",
  "tyt-geo-eslik-benzerlik-031",
  "tyt-geo-ucgen-merkezleri-031",
];

describe("031 source-bound optional video recommendations", () => {
  it("retains the four literal safety links and their source roles", () => {
    const links = getLessonVideos031("kimya-guvenlik");
    expect(links.recommended.map((v) => [v.channel, v.url])).toEqual([
      ["Levent Özdede", "https://www.youtube.com/watch?v=3Xjb-ngc4uU"],
    ]);
    expect(links.alternatives.map((v) => [v.channel, v.url])).toEqual([
      ["Ferrum", "https://www.youtube.com/watch?v=U3sOJFCfZGE"],
      ["KİMYA ADASI", "https://www.youtube.com/watch?v=xZXcj2hml7c"],
      ["Hocalara Geldik", "https://www.youtube.com/watch?v=_zca7Jb4fdI"],
    ]);
    expect(links.alternatives[2].detail).toBe(
      "TYT, kimyada iş sağlığı ve güvenliği",
    );
  });

  it("uses only built-in theory identities and literal educational display fields", () => {
    const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));
    const seen = new Set<string>();
    for (const group of videoCatalog031) {
      expect(Object.keys(group).sort()).toEqual([
        "alternatives",
        "lessonIds",
        "recommended",
        "subjectId",
        "topic",
      ]);
      expect(group.topic.trim().length).toBeGreaterThan(2);
      expect(group.recommended.length).toBeGreaterThan(0);
      for (const lessonId of group.lessonIds) {
        seen.add(lessonId);
        const lesson = byId.get(lessonId);
        expect(lesson, lessonId).toBeDefined();
        expect(lesson?.subjectId, lessonId).toBe(group.subjectId);
      }
      for (const role of ["recommended", "alternatives"] as const) {
        for (const video of group[role]) {
          expect(
            Object.keys(video).every((key) =>
              ["channel", "detail", "url"].includes(key),
            ),
          ).toBe(true);
          expect(video.channel.trim().length).toBeGreaterThan(1);
          expect(videoIdentity031(video.url), video.url).toBeDefined();
        }
      }
    }
    expect(
      [...seen].filter((id) => !id.endsWith("-032") && !id.endsWith("-033")),
    ).toHaveLength(485);
    expect(foundationIds.every((id) => seen.has(id))).toBe(true);
    expect(new Set(videoCatalog031.map((group) => group.subjectId)).size).toBe(
      15,
    );
    expect(JSON.stringify(videoCatalog031)).not.toMatch(
      /docs\.google|drive\.google|todoist|NIGHT_SPLIT|PROGRAM_|task_|28 Şubat|2027-02/i,
    );
  });

  it("keeps subtopic labels for the combined geometry units", () => {
    const centres = getLessonVideos031("tyt-geo-ucgen-merkezleri-031");
    expect(
      new Set(centres.recommended.flatMap((video) => video.topics)),
    ).toEqual(new Set(["Açıortay", "Kenarortay", "Üçgende merkezler"]));
    const similarity = getLessonVideos031("tyt-geo-eslik-benzerlik-031");
    expect(
      new Set(similarity.recommended.flatMap((video) => video.topics)),
    ).toEqual(
      new Set([
        "Kenar açı kenar eşliği",
        "Açı Kenar Açı ve Kenar Kenar Kenar Eşliği",
        "Üçgende Benzerlik",
      ]),
    );
  });

  it("deduplicates equivalent source appearances without collapsing different starts", () => {
    const ids = new Set(videoCatalog031.flatMap((group) => group.lessonIds));
    for (const id of ids) {
      const links = getLessonVideos031(id);
      const keys = [...links.recommended, ...links.alternatives].map((video) =>
        videoIdentity031(video.url),
      );
      expect(new Set(keys).size, id).toBe(keys.length);
    }
    expect(
      videoIdentity031("https://www.youtube.com/watch?v=fZaNYDQJkHs&t=0s"),
    ).not.toBe(
      videoIdentity031("https://www.youtube.com/watch?v=fZaNYDQJkHs&t=120s"),
    );
    expect(
      getLessonVideos031("kalitima-giris").alternatives.some(
        (video) =>
          video.url === "https://www.youtube.com/watch?v=fZaNYDQJkHs&t=0s",
      ),
    ).toBe(true);
  });

  it("rejects unsafe or ambiguous external destinations", () => {
    for (const value of [
      "javascript:alert(1)",
      "http://www.youtube.com/watch?v=3Xjb-ngc4uU",
      "https://youtube.com.evil.example/watch?v=3Xjb-ngc4uU",
      "https://user:pass@www.youtube.com/watch?v=3Xjb-ngc4uU",
      "https://www.youtube.com:1234/watch?v=3Xjb-ngc4uU",
      "https://www.youtube.com/playlist?list=example",
      "https://docs.google.com/document/d/private/edit",
      "https://www.youtube.com/watch?v=missing",
    ])
      expect(videoIdentity031(value), value).toBeUndefined();
  });

  it("renders optional external links with collapsed alternatives and no embedded media", () => {
    vi.stubGlobal("navigator", { onLine: true });
    try {
      const html = renderToStaticMarkup(
        createElement(VideoRecommendations031, {
          lessonId: "kimya-guvenlik",
        }),
      );
      expect(html).toContain("Önerilen videolar");
      expect(html).toContain("Alternatif videolar (3)");
      expect(html).toContain("internet bağlantısı gerektirir");
      expect(html).toContain("konuyu tamamlandı olarak işaretlemez");
      expect(html.match(/target="_blank"/g)).toHaveLength(4);
      expect(html.match(/rel="noopener noreferrer"/g)).toHaveLength(4);
      expect(html).not.toMatch(/<iframe|<img|<video|<script|<details[^>]+open/);
      expect(
        renderToStaticMarkup(
          createElement(VideoRecommendations031, {
            lessonId: "source-topic-without-confirmed-videos",
          }),
        ),
      ).toBe("");
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
