import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "../store";
import { subjectById } from "../domain/content";
import {
  studyTopicById,
  topicLessons,
  type StudyMode,
} from "../domain/studyPlan";
import type { Lesson, ReviewStage } from "../domain/model";
import { PastExamQuestions } from "../components/PastExamQuestions";
import { Theory } from "./Theory";
import { StudyTimer } from "../components/StudyTimer";
export function Topic({
  id,
  mode,
  navigate,
  practice,
  reviewStage,
}: {
  id: string;
  mode: StudyMode;
  navigate: (r: string) => void;
  practice: (lesson: Lesson) => void;
  reviewStage?: ReviewStage;
}) {
  const { l } = useApp();
  const topic = studyTopicById(id);
  if (!topic)
    return (
      <section className="panel empty">
        <h1>Konu bulunamadı</h1>
        <button className="secondary" onClick={() => navigate("/today")}>
          Bugün’e dön
        </button>
      </section>
    );
  const narratives = topicLessons(topic.id);
  const available =
    mode === "theory"
      ? narratives.filter((lesson) => !lesson.tags.includes("soru-seti"))
      : narratives.filter((lesson) => lesson.questions.length > 0);
  if (mode === "theory" && available.length)
    return (
      <Theory
        id={available[0].id}
        practice={practice}
        navigate={navigate}
        reviewStage={reviewStage}
      />
    );
  const subject = subjectById(topic.subjectId)!;
  return (
    <>
      <button
        className="text-button back-link"
        onClick={() => navigate("/today")}
      >
        <ArrowLeft size={17} />
        Bugün’e dön
      </button>
      <header className="study-heading">
        <div className="study-title">
          <span className="eyebrow">
            {topic.order}. konu · {subject.exam} {l(subject.name)} ·{" "}
            {mode === "theory" ? "Konu Anlatımı" : "Sorular"}
          </span>
          <h1>{topic.title}</h1>
        </div>
        <StudyTimer />
      </header>
      <section className="panel topic-study">
        {mode === "questions" && available.length ? (
          <>
            <h2>Uygulamadaki soru setleri</h2>
            {available.map((lesson) => (
              <button
                className="ready-topic"
                data-lesson-id={lesson.id}
                key={lesson.id}
                onClick={() => practice(lesson)}
              >
                <span>
                  {l(lesson.title)}
                  <small>{lesson.questions.length} özgün soru</small>
                </span>
                <ArrowRight size={18} />
              </button>
            ))}
          </>
        ) : (
          <>
            <h2>
              {mode === "theory"
                ? "Anlatım hazırlanıyor"
                : "Soru çalışması hazırlanıyor"}
            </h2>
            <p>
              Bu başlığın uygulama içi içeriği henüz tamamlanmadı. Hazır
              derslerden öğrenmeye devam edebilirsin.
            </p>
            <button
              className="primary"
              onClick={() =>
                navigate(mode === "theory" ? "/courses" : "/questions")
              }
            >
              Hazır {mode === "theory" ? "anlatımları" : "soruları"} aç
            </button>
          </>
        )}
        {mode === "questions" && (
          <PastExamQuestions topicId={topic.id} subjectId={topic.subjectId} />
        )}
      </section>
    </>
  );
}
