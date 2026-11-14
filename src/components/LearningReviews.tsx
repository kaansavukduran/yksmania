import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useApp } from "../store";
import {
  learningReviewPlan,
  repeatName,
  setTheoryReviewCompletion,
  type LearningReview,
} from "../domain/learningReviews";
import { completionDate, studyTopicById } from "../domain/studyPlan";
import { lessonById, subjectById } from "../domain/content";
import { addDays } from "../domain/scheduler";
import type { Lesson, ReviewStage } from "../domain/model";
import { dateTR } from "./DateInput";

export const theoryReviewRoute = (item: LearningReview) =>
  `/topic?id=${item.topicId}&mode=theory&review=${item.stage}`;
export function TheoryReviewAction({
  topicId,
  stage,
  navigate,
}: {
  topicId: string;
  stage: ReviewStage;
  navigate: (route: string) => void;
}) {
  const { state, today, commit, toast } = useApp();
  const [busy, setBusy] = useState(false);
  const anchor = completionDate(state, topicId, "theory");
  if (!anchor)
    return (
      <p className="muted">
        Bu konunun ilk çalışma kaydı bulunamadı. Önce konu çalışmanı kaydet.
      </p>
    );
  const done = state.theoryReviewCompletions.some(
    (r) =>
      r.topicId === topicId && r.anchorDate === anchor && r.stage === stage,
  );
  const target = addDays(anchor, stage - 1);
  async function toggle() {
    if (busy) return;
    setBusy(true);
    try {
      await commit((s) => setTheoryReviewCompletion(s, topicId, stage, !done));
    } catch {
      toast(
        "Tekrar kaydı kaydedilemedi. Önceki durum korundu; tekrar deneyebilirsin.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="theory-review-action" aria-label="Konu tekrarı kaydı">
      <h2>
        {stage}. gün ({repeatName(stage)})
      </h2>
      <p>
        İlk çalışma: {dateTR(anchor)} (1. gün). Özgün tekrar tarihi:{" "}
        {dateTR(target)}.
      </p>
      <p>
        Önce anlatıma bakmadan temel fikri kendi cümlelerinle açıkla. Sonra
        şemayı ve püf noktalarını açıp eksiklerini kontrol et.
      </p>
      <div className="review-actions">
        <button
          className={done ? "secondary completed-topic" : "primary"}
          disabled={busy || target > today}
          aria-pressed={done}
          onClick={() => {
            void toggle();
          }}
        >
          {done && <Check size={18} aria-hidden="true" />}
          {busy
            ? "Kaydediliyor…"
            : done
              ? "Tekrar kaydını geri al"
              : "Tekrarı tamamladım"}
        </button>
        <button className="text-button" onClick={() => navigate("/today")}>
          Bugün’e dön
        </button>
      </div>
      <p className="small muted">
        {target > today
          ? "Bu tekrarın günü henüz gelmedi; anlatımı serbestçe inceleyebilirsin."
          : done
            ? "Tekrar çalışması bu cihazda kaydedildi. Bu bir doğru cevap veya ustalık ölçümü değildir."
            : "Çalışma bildirimi kaydedilir; XP veya doğru cevap oluşturmaz."}
      </p>
    </section>
  );
}
export function TodayReviewQueue({
  items,
  closed,
  start,
  navigate,
}: {
  items: LearningReview[];
  closed: boolean;
  start: (lesson: Lesson, reviewId?: string) => void;
  navigate: (route: string) => void;
}) {
  const { today } = useApp();
  const due = items.filter((item) => item.scheduled === today);
  const done = items.filter((item) => item.completedDate === today);
  return (
    <section
      className="panel path-panel review-queue"
      aria-label="Önce tekrar et"
    >
      <h2>Önce tekrar et</h2>
      <p className="small muted">
        İlk çalışma 1. gün; tekrarlar 3., 7. ve 21. gün. Önce hatırla, sonra
        yeni konuya geç.
      </p>
      {due.length > 0 && <p>{due.length} tekrar bugün çalışılacak.</p>}
      {!due.length && (
        <p className="muted">
          {closed
            ? "Bugün kapalı. Bekleyen tekrarlar ilk uygun güne yerleştirildi."
            : "Bugüne atanmış başka tekrar yok."}
        </p>
      )}
      <ol className="review-queue-list">
        {[...due, ...done].map((item) => {
          const topic = item.topicId ? studyTopicById(item.topicId) : undefined;
          const lesson = item.lessonId ? lessonById(item.lessonId) : undefined;
          const subject = subjectById(
            topic?.subjectId ?? lesson?.subjectId ?? "",
          );
          return (
            <li className="review-queue-row" key={item.id}>
              <div>
                <small className="muted">
                  {subject?.exam} {subject?.name.tr} ·{" "}
                  {item.kind === "theory" ? "Konu anlatımı" : "Sorular"} ·{" "}
                  {item.stage}. gün
                </small>
                <h3>
                  {item.title} ({repeatName(item.stage)})
                </h3>
                {item.completedDate ? (
                  <p className="review-done">
                    <Check size={16} aria-hidden="true" />
                    Tekrar tamamlandı
                  </p>
                ) : (
                  <p className="small muted">
                    Özgün tarih: {dateTR(item.targetDate)}
                    {item.scheduled !== item.targetDate
                      ? ` · Bugüne yerleştirildi`
                      : ""}
                  </p>
                )}
              </div>
              <button
                className="secondary"
                onClick={() => {
                  if (item.completedSessionId)
                    navigate(
                      `/result?id=${encodeURIComponent(item.completedSessionId)}`,
                    );
                  else if (item.kind === "theory")
                    navigate(theoryReviewRoute(item));
                  else if (lesson) start(lesson, item.id);
                }}
              >
                {item.completedSessionId
                  ? "Sonucu gör"
                  : item.completedDate
                    ? "Tekrarı aç"
                    : "Tekrar et"}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ol>
      <button className="text-button" onClick={() => navigate("/calendar")}>
        Takvimi gör
      </button>
    </section>
  );
}
