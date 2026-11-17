import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

// Rebuild the public structural inventory from actual registered content.
// No private source files, learner state, or network services are involved.
const root = fileURLToPath(new URL("../", import.meta.url));
const server = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const [
    { lessons, subjectById },
    { lessonGuides },
    plan,
    presentation,
    help,
    pkg,
  ] = await Promise.all([
    server.ssrLoadModule("/src/domain/content.ts"),
    server.ssrLoadModule("/src/learning/guides/index.ts"),
    server.ssrLoadModule("/src/domain/studyPlan.ts"),
    server.ssrLoadModule("/src/domain/questionPresentation.ts"),
    server.ssrLoadModule("/src/learning/questionHelp.ts"),
    server.ssrLoadModule("/package.json"),
  ]);
  const rows = [];
  let full = 0;
  let total = 0;
  for (const lesson of lessons) {
    const guide = lessonGuides.get(lesson.id);
    if (!guide || lesson.tags.includes("soru-seti")) continue;
    const topicId = plan.lessonTopic[lesson.id];
    const topic = topicId ? plan.studyTopicById(topicId) : undefined;
    const sets = topicId ? plan.topicLessons(topicId) : [lesson];
    const questions = sets.flatMap((set) => set.questions);
    const complete = questions.filter((original) => {
      const q = presentation.localizedQuestionView(original);
      return help.resolvedGuidance({
        id: q.id,
        prompt: q.prompt.tr,
        passage: q.passage?.tr,
        options: q.options.map((option) => option.tr),
        answer: q.answer,
        hint: q.hint.tr,
        explanation: q.explanation.tr,
        guidance: q.guidance,
      });
    }).length;
    const subject = subjectById(lesson.subjectId);
    full += complete;
    total += questions.length;
    rows.push({
      order: topic?.order ?? Number.MAX_SAFE_INTEGER,
      cells: [
        subject.exam,
        subject.name.tr,
        lesson.title.tr,
        topic?.order ?? "",
        guide.sections.length,
        guide.examples.length,
        guide.recall.length,
        guide.minutes,
        questions.length,
        complete,
        questions.length - complete,
      ],
    });
  }
  rows.sort((a, b) => a.order - b.order);
  const escape = (value) => {
    const text =
      typeof value === "string" && /^[=+\-@]/u.test(value)
        ? `'${value}`
        : String(value);
    return /[;"\r\n]/u.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  const headers = [
    "Sınav",
    "Ders",
    "Konu",
    `Öğrenme Sırası (${plan.studyTopics.length} Konu)`,
    "Bölüm Sayısı",
    "Çözümlü Örnek Sayısı",
    "Hatırlama Sayısı",
    "Tahmini Dakika",
    "Bağlı Soru Sayısı",
    "Ayrıntılı Yardım",
    "Kısmi Yardım",
  ];
  const csv =
    "\ufeff" +
    [headers, ...rows.map((row) => row.cells)]
      .map((cells) => cells.map(escape).join(";"))
      .join("\r\n") +
    "\r\n";
  await writeFile(
    new URL("../docs/CONTENT_INVENTORY.csv", import.meta.url),
    csv,
  );
  const description = `YKSMania ${pkg.default.version} — Sayısal konu kapsamı

CSV, uygulamadaki ${rows.length} ayrıntılı rehberi gösterir. İlk 479 başlık Excel’in özgün sırasını ve kimliklerini korur. Sonradan eklenen ${plan.studyTopics.filter((topic) => topic.order > 479).length} çalışma başlığı, ayrı kimliklerle 480–${plan.studyTopics.length} sırasındadır. Plan dışında kalan rehberlerin öğrenme sırası hücresi boş bırakılmıştır.

${lessons.filter((lesson) => lesson.tags.includes("soru-seti")).length} ek soru seti, aynı konuya ait doğrulanmış bağıyla ilgili rehberin sayısına eklenmiştir. Her soru yalnız bir kez sayılır. Toplam ${total} özgün soru vardır: ${full} ayrıntılı, ${total - full} kısmi yardım. Eski kısmi yardım kartları da bu sayıma dahildir; her rehberin güncel yardım sayıları CSV’de ayrı gösterilir.

“Ayrıntılı Yardım”, uygulamanın tam çözüm rehberini bulabildiği soruları; “Kısmi Yardım”, daha sınırlı ipucu ve açıklamayla kalan soruları sayar. Sayılar öğrenci başarısı veya içerik kalitesi ölçüsü değildir. Bölüm, örnek ve hatırlama sayıları yapısal sayımlardır. Tahmini dakika bir planlama tahminidir.

Bu döküm bütün MEB alt kazanımlarının veya Drive PDF arşivinin tamamlandığını göstermez. PDF kaynak kullanımı ve bütün bir PDF’nin eksiksiz aktarımı ayrı takip edilir. Video bağlantıları da öğrenme başarısı sayılmaz.

Yeniden üretim: node scripts/export-content-inventory.mjs
Kodlama: UTF-8 BOM. Ayırıcı: noktalı virgül (;). Başlık satırından sonra ${rows.length} veri satırı vardır. Formül olarak yorumlanabilecek metinler apostrofla korunur.
`;
  await writeFile(
    new URL("../docs/CONTENT_INVENTORY.txt", import.meta.url),
    "\ufeff" + description,
  );
  console.log(
    JSON.stringify({
      guides: rows.length,
      studyTopics: plan.studyTopics.length,
      questions: total,
      fullHelp: full,
      partialHelp: total - full,
    }),
  );
} finally {
  await server.close();
}
