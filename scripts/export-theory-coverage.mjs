import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));
const cacheDir = await mkdtemp(join(tmpdir(), "yks-coverage-"));
const server = await createServer({
  root,
  configFile: false,
  cacheDir,
  optimizeDeps: { noDiscovery: true },
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: "custom",
});
try {
  const [plan, content, guides, sheets, videos] = await Promise.all([
    "/src/domain/studyPlan.ts",
    "/src/domain/content.ts",
    "/src/learning/guides/index.ts",
    "/src/learning/cheatsheetContent.ts",
    "/src/learning/videoCatalog031.ts",
  ].map((path) => server.ssrLoadModule(path)));
  const { rows: sourceProgress } = JSON.parse(await readFile(join(root, "docs/ILERLEME.json"), "utf8"));
  const { version } = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
  const subjects = new Map(content.subjects.map((subject) => [subject.id, subject]));
  const rows = plan.studyTopics
    .filter((topic) => /^(tyt|ayt)-/.test(topic.subjectId))
    .map((topic) => {
      const lesson = plan.topicLessons(topic.id).find((entry) => !entry.tags.includes("soru-seti"));
      const guide = lesson && guides.studyGuide(lesson.id);
      const sheet = sheets.studyCheatSheet(topic.id);
      const video = lesson && videos.getLessonVideos031(lesson.id);
      return {
        topic,
        lessonId: lesson?.id ?? "",
        sections: guide?.sections.length ?? lesson?.body.length ?? 0,
        examples: guide?.examples.length ?? 0,
        sheetSections: sheet?.sections.length ?? 0,
        sheetExamples: sheet?.examples.length ?? 0,
        recommended: video?.recommended.length ?? 0,
        alternatives: video?.alternatives.length ?? 0,
      };
    });
  if (new Set(rows.map(({ topic }) => topic.id)).size !== rows.length) {
    throw new Error("Konu kapsamı tablosunda yinelenen konu kimliği var.");
  }
  const csvCell = (value) => {
    const text = String(value);
    const safe = /^[=+@-]/u.test(text) ? "'" + text : text;
    return /[;"\r\n]/u.test(safe) ? '"' + safe.replaceAll('"', '""') + '"' : safe;
  };
  const cells = [
    ["Sınav", "Ders", "Konu", "Konu kimliği", "Ders kimliği", "Sıra", "Anlatım bölümü", "Çözümlü örnek", "Kopya kağıdı bölümü", "Kopya kağıdı örneği", "Önerilen video", "Alternatif video"],
    ...rows.map((row) => {
      const subject = subjects.get(row.topic.subjectId);
      return [subject.exam, subject.name.tr, row.topic.title, row.topic.id, row.lessonId, row.topic.order,
        row.sections, row.examples, row.sheetSections, row.sheetExamples, row.recommended, row.alternatives];
    }),
  ];
  await writeFile(join(root, "docs/KONU_KAPSAMI.csv"), "\ufeff" + cells.map((row) => row.map(csvCell).join(";")).join("\n") + "\n");

  const table = [
    "# TYT ve AYT Sayısal konu kapsamı",
    "",
    "Uygulama sürümü " + version + ". Her satır çalışma planındaki bir konuyu ve normal girişte açılan ilk konu anlatımını esas alır.",
    "",
    "| Ders | Konu | Anlatım | Çözümlü örnek | Yerleşik Kopya Kağıdı | Video | Kısmi kaynak kağıdı aktarımı |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
  ];
  const count = (topicRows, key) => topicRows.filter((row) => row[key] > 0).length;
  const hasVideo = (row) => row.recommended + row.alternatives > 0;
  for (const entry of sourceProgress) {
    const subjectRows = rows.filter(({ topic }) => topic.subjectId === entry.id);
    table.push("| " + entry.name + " | " + [
      subjectRows.length, count(subjectRows, "sections"), count(subjectRows, "examples"),
      count(subjectRows, "sheetSections"), subjectRows.filter(hasVideo).length,
      entry.sheetsDone + " / " + entry.sheets,
    ].join(" | ") + " |");
  }
  table.push("| **Toplam** | " + [
    rows.length, count(rows, "sections"), count(rows, "examples"), count(rows, "sheetSections"),
    rows.filter(hasVideo).length,
    sourceProgress.reduce((n, row) => n + row.sheetsDone, 0) + " / " + sourceProgress.reduce((n, row) => n + row.sheets, 0),
  ].join(" | ") + " |", "",
  "Anlatım, örnek, Kopya Kağıdı ve video sütunları uygulamadaki mevcut içeriği gösterir. Kaynak kağıdı aktarımı ayrı paydalıdır ve mevcut [kaynak ilerleme tablosundan](ILERLEME.md) gelir. Her konunun kaynakla karşılaştırılması ve öğretim kalitesi ayrıca doğrulanır.",
  "",
  "## Eşlemesi açık konular",
  "");
  for (const row of rows.filter((row) => !row.sections || !row.examples || !row.sheetSections || !hasVideo(row))) {
    const gaps = [
      !row.sections && "anlatım", !row.examples && "çözümlü örnek",
      !row.sheetSections && "Kopya Kağıdı", !hasVideo(row) && "video",
    ].filter(Boolean);
    table.push("- " + subjects.get(row.topic.subjectId).name.tr + " · " + row.topic.title + " · " + gaps.join(", "));
  }
  table.push("", "[Konu ve ders kimlikleriyle ayrıntılı tablo](KONU_KAPSAMI.csv)", "");
  await writeFile(join(root, "docs/KONU_KAPSAMI.md"), table.join("\n"));
  console.log(JSON.stringify({ version, topics: rows.length, withVideos: rows.filter(hasVideo).length }));
} finally {
  await server.close();
  await rm(cacheDir, { recursive: true, force: true });
}
