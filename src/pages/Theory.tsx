import { lazy, Suspense } from "react";
import { narrativeById } from "../learning/narratives";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "../store";
import { lessonById, subjectById } from "../domain/content";
import type { Lesson, ReviewStage } from "../domain/model";
import { VisualLab } from "../learning/VisualLab";
import { Aion } from "../components/Aion";
import { StudyTimer } from "../components/StudyTimer";
import { GuidedReading } from "../learning/GuidedReading";
import { lessonGuides } from "../learning/guides";
import { clarifiedGuideView } from "../learning/guidePresentation028";
import { TheoryReviewAction } from "../components/LearningReviews";
import { TopicCompletion } from "../components/StudyPlanning";
import { lessonTopic, topicLessons } from "../domain/studyPlan";
import { OriginalExerciseReader } from "../learning/OriginalExerciseReader";
const NarrativeRecall = lazy(() =>
  import("../learning/NarrativeExplorer").then((module) => ({
    default: module.NarrativeRecall,
  })),
);
const VideoRecommendations031 = lazy(() =>
  import("../learning/VideoRecommendations031").then((module) => ({
    default: module.VideoRecommendations031,
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
  const guide = clarifiedGuideView(lessonGuides.get(lesson.id));
  const relatedTopic = lessonTopic[lesson.id];
  const questionSetCount = relatedTopic
    ? topicLessons(relatedTopic).filter((l) => l.questions.length > 0).length
    : 0;
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
        <div className="study-title">
          <span className="eyebrow">
            {subject.exam} · {l(subject.name)} · {t("courses")}
          </span>
          <h1>{l(lesson.title)}</h1>
        </div>
        <StudyTimer />
      </header>
      <div className="study-layout">
        <article className="panel lesson-article">
          <h2>{t("objectives")}</h2>
          <ul>
            {(guide?.objectives ?? lesson.objectives.map(l)).map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
          {guide ? (
            <GuidedReading
              guide={guide}
              recallSupplement={
                narrativeById.has(lesson.id) ? (
                  <Suspense fallback={<p>Hatırlama alanı açılıyor…</p>}>
                    <NarrativeRecall id={lesson.id} />
                  </Suspense>
                ) : undefined
              }
            />
          ) : (
            <>
              <VisualLab id={lesson.id} />
              {lesson.body.map((v, i) => (
                <section key={i}>
                  <h2>{l(v.title)}</h2>
                  <p>{l(v.text)}</p>
                </section>
              ))}
            </>
          )}
          {!guide && narrativeById.has(lesson.id) && (
            <Suspense fallback={<p>Hatırlama alanı açılıyor…</p>}>
              <NarrativeRecall id={lesson.id} />
            </Suspense>
          )}
          <OriginalExerciseReader
            lessonId={lesson.id}
            onPractice={(id) => {
              const set = lessonById(id);
              if (set) practice(set);
            }}
          />
          <Suspense fallback={<p role="status">Video önerileri açılıyor…</p>}>
            <VideoRecommendations031 lessonId={lesson.id} />
          </Suspense>
          <div className="source-box">
            <strong>{t("sourceInfo")}</strong>
            <p>{guide?.source ?? l(lesson.source)}</p>
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
            <div className="lesson-question-actions">
              <button className="primary" onClick={() => practice(lesson)}>
                {t("startQuestions")}
                <ArrowRight size={18} />
              </button>
              {questionSetCount > 1 && (
                <button
                  className="secondary"
                  onClick={() =>
                    navigate(`/topic?id=${relatedTopic}&mode=questions`)
                  }
                >
                  Bu konunun soru setleri ({questionSetCount})
                </button>
              )}
            </div>
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
