import { lazy, Suspense } from "react";
import { narrativeById } from "../learning/narratives";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "../store";
import { lessonById, subjectById } from "../domain/content";
import type { Lesson, ReviewStage } from "../domain/model";
import { VisualLab } from "../learning/VisualLab";
import { Aion } from "../components/Aion";
import { TheoryReviewAction } from "../components/LearningReviews";
import { TopicCompletion } from "../components/StudyPlanning";
import { lessonTopic } from "../domain/studyPlan";
const NarrativeRecall = lazy(() =>
  import("../learning/NarrativeExplorer").then((module) => ({
    default: module.NarrativeRecall,
  })),
);
export function Theory({
  id,
  practice,
  navigate,
  reviewStage,
}: {
  id: string;
  practice: (lesson: Lesson) => void;
  navigate: (r: string) => void;
  reviewStage?: ReviewStage;
}) {
  const { state, t, l, update } = useApp();
  const lesson = lessonById(id);
  if (!lesson)
    return (
      <section className="panel empty">
        <h1>{t("courses")}</h1>
        <p>{t("noResults")}</p>
        <button className="primary" onClick={() => navigate("/courses")}>
          {t("courses")}
        </button>
      </section>
    );
  const subject = subjectById(lesson.subjectId)!;
  const noteKey = "lesson:" + lesson.id;
  return (
    <>
      <button
        className="text-button back-link"
        onClick={() => navigate("/courses")}
      >
        <ArrowLeft size={17} />
        {t("courses")}
      </button>
      <header className="study-heading">
        <span className="eyebrow">
          {subject.exam} · {l(subject.name)} · {t("courses")}
        </span>
        <h1>{l(lesson.title)}</h1>
      </header>
      <div className="study-layout">
        <article className="panel lesson-article">
          <h2>{t("objectives")}</h2>
          <ul>
            {lesson.objectives.map((v, i) => (
              <li key={i}>{l(v)}</li>
            ))}
          </ul>
          <VisualLab id={lesson.id} />
          {lesson.body.map((v, i) => (
            <section key={i}>
              <h2>{l(v.title)}</h2>
              <p>{l(v.text)}</p>
            </section>
          ))}
          {narrativeById.has(lesson.id) && (
            <Suspense fallback={<p>Hatırlama alanı açılıyor…</p>}>
              <NarrativeRecall id={lesson.id} />
            </Suspense>
          )}
          <div className="source-box">
            <strong>{t("sourceInfo")}</strong>
            <p>{l(lesson.source)}</p>
          </div>
          {reviewStage && lessonTopic[lesson.id] ? (
            <TheoryReviewAction
              topicId={lessonTopic[lesson.id]}
              stage={reviewStage}
              navigate={navigate}
            />
          ) : (
            lessonTopic[lesson.id] && (
              <TopicCompletion id={lessonTopic[lesson.id]} mode="theory" />
            )
          )}
          {lesson.questions.length > 0 ? (
            <button className="primary" onClick={() => practice(lesson)}>
              {t("startQuestions")}
              <ArrowRight size={18} />
            </button>
          ) : (
            <p className="small muted">
              Bu konu şu aşamada anlatım olarak hazır. Soru seti ayrı aşamada
              hazırlanacak.
            </p>
          )}
        </article>
        <aside className="panel study-notes" aria-label={t("studyNotes")}>
          <h2>{t("note")}</h2>
          <textarea
            value={
              state.notes[noteKey] ??
              (state.draft?.lessonId === lesson.id ? state.draft.note : "")
            }
            aria-label={t("note")}
            placeholder={t("notePlaceholder")}
            maxLength={20000}
            onChange={(e) => {
              void update((s) => ({
                ...s,
                notes: { ...s.notes, [noteKey]: e.target.value },
              })).catch(() => {});
            }}
          />
          <p className="small muted">{t("readingNotMastery")}</p>
          <Aion size={144} />
        </aside>
      </div>
    </>
  );
}
