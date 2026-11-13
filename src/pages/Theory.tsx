import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "../store";
import { lessonById, subjectById } from "../domain/content";
import type { Lesson } from "../domain/model";
import { VisualLab } from "../learning/VisualLab";
import { Aion } from "../components/Aion";
import { TopicCompletion } from "../components/StudyPlanning";
import { lessonTopic } from "../domain/studyPlan";
export function Theory({
  id,
  practice,
  navigate,
}: {
  id: string;
  practice: (lesson: Lesson) => void;
  navigate: (r: string) => void;
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
          <div className="source-box">
            <strong>{t("sourceInfo")}</strong>
            <p>{l(lesson.source)}</p>
          </div>
          <button className="primary" onClick={() => practice(lesson)}>
            {t("startQuestions")}
            <ArrowRight size={18} />
          </button>
          {lessonTopic[lesson.id] && (
            <TopicCompletion id={lessonTopic[lesson.id]} mode="theory" />
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
