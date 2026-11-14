import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "../store";
import { subjectById } from "../domain/content";
import {
  studyTopicById,
  topicLessons,
  type StudyMode,
} from "../domain/studyPlan";
import type { Lesson, ReviewStage } from "../domain/model";
import { TheoryReviewAction } from "../components/LearningReviews";
import { TopicCompletion } from "../components/StudyPlanning";
import { SourceList } from "../components/SourceList";
import { TopicCheatsheet } from "../components/TopicCheatsheet";
import { PastExamQuestions } from "../components/PastExamQuestions";
import { Theory } from "./Theory";
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
      ? narratives
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
        <TopicCheatsheet
          key={topic.id}
          topic={topic}
          subjectId={topic.subjectId}
          navigate={navigate}
        />
      </header>
      <section className="panel topic-study">
        {mode === "questions" && available.length ? (
          <>
            <h2>Uygulamadaki soru setleri</h2>
            {available.map((lesson) => (
              <button
                className="ready-topic"
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
                ? "Bu konuyu kaynağınla çalış"
                : "Bu konunun sorularını kaynağında çöz"}
            </h2>
            <p>
              {mode === "theory"
                ? "Bu başlık için uygulama içi anlatım henüz hazırlanmadı. Kopya kağıdını veya kendi ders kaynağını kullanarak çalışmanı kaydedebilirsin."
                : "Bu başlık için uygulama içi soru seti henüz hazırlanmadı. Kendi soru kaynağında yaptığın çalışmayı planına işleyebilirsin."}
            </p>
          </>
        )}
        <div className="topic-source-actions">
          <button className="secondary" onClick={() => navigate("/sources")}>
            Kaynak dosyalarını yönet
          </button>
        </div>
        <SourceList subjectId={topic.subjectId} mode={mode} topic={topic} />
        {mode === "questions" && (
          <PastExamQuestions topicId={topic.id} subjectId={topic.subjectId} />
        )}
        {mode === "theory" && reviewStage ? (
          <TheoryReviewAction
            topicId={topic.id}
            stage={reviewStage}
            navigate={navigate}
          />
        ) : (
          <TopicCompletion id={topic.id} mode={mode} />
        )}
      </section>
    </>
  );
}
