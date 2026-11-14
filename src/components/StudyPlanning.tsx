import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useApp } from "../store";
import { subjectById } from "../domain/content";
import {
  completionDate,
  completionDates,
  setTopicCompletion,
  studyPlan,
  studyTopics,
  topicResults,
  type StudyMode,
} from "../domain/studyPlan";
import type { Session } from "../domain/model";
import { repeatName } from "../domain/learningReviews";
import { reviewStages } from "../domain/model";
import { independentCorrect, addDays } from "../domain/scheduler";
import { dateTR } from "./DateInput";

export function TopicCompletion({
  id,
  mode,
  compact = false,
}: {
  id: string;
  mode: StudyMode;
  compact?: boolean;
}) {
  const { state, commit, toast } = useApp();
  const [busy, setBusy] = useState(false);
  const anchor = completionDate(state, id, mode);
  const done = !!anchor;
  const auto = completionDate({ ...state, topicProgress: {} }, id, mode);
  const toggle = async () => {
    if (busy || auto) return;
    setBusy(true);
    try {
      await commit((s) => setTopicCompletion(s, id, mode, !done));
    } catch {
      toast(
        "Çalışma kaydı kaydedilemedi. Önceki durum korundu; tekrar deneyebilirsin.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className={compact ? "topic-completion compact" : "topic-completion"}>
      <button
        className={done ? "secondary completed-topic" : "secondary"}
        aria-pressed={done}
        disabled={busy || !!auto}
        onClick={() => {
          void toggle();
        }}
      >
        {done && <Check size={18} />}
        {busy
          ? "Kaydediliyor…"
          : auto
            ? "Soru oturumuyla kaydedildi"
            : done
              ? "Çalışma kaydını geri al"
              : mode === "theory"
                ? "Konuyu çalıştım"
                : "Kaynağımdaki soruları çalıştım"}
      </button>
      {!compact && (
        <p className="small muted">
          {auto
            ? "Bu kayıt tamamlanmış soru oturumuna bağlıdır. Oturumu sonuç ekranından geri alabilirsin."
            : "Kendi çalışma bildirimin planı ve yüzdeleri günceller. Doğru cevap, ustalık veya XP kaydı oluşturmaz."}
        </p>
      )}
      {!compact && mode === "theory" && anchor && (
        <p className="small topic-repeat-targets">
          İlk çalışma 1. gün.{" "}
          {reviewStages.map((stage) => (
            <span key={stage}>
              {repeatName(stage)} ({stage}. gün):{" "}
              {dateTR(addDays(anchor, stage - 1))}{" "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

function PlannedTopicRow({
  topic,
  mode,
  completedDate,
  scheduledDate,
  result,
  detailed = false,
  navigate,
}: {
  topic: (typeof studyTopics)[number];
  mode: StudyMode;
  completedDate?: string;
  scheduledDate?: string | null;
  result?: Session;
  detailed?: boolean;
  navigate: (route: string) => void;
}) {
  const subject = subjectById(topic.subjectId);
  const correct =
    result?.responses.filter((response) => response.correct).length ?? 0;
  const assisted =
    result?.responses.filter((response) => response.assisted).length ?? 0;
  return (
    <li
      className={completedDate ? "planned-topic is-complete" : "planned-topic"}
    >
      <button
        className="ready-topic"
        onClick={() => navigate(`/topic?id=${topic.id}&mode=${mode}`)}
      >
        <span>
          <small>
            {topic.order}. konu · {subject?.exam} {subject?.name.tr}
          </small>
          <strong>{topic.title}</strong>
          <small
            className={completedDate ? "topic-state completed" : "topic-state"}
          >
            {completedDate ? (
              <>
                <Check size={15} aria-hidden="true" />
                {mode === "theory" ? "Konu tamamlandı" : "Sorular tamamlandı"}
              </>
            ) : mode === "theory" && result ? (
              "Konu henüz işaretlenmedi"
            ) : (
              "Çalışılacak"
            )}
          </small>
          {result && (
            <>
              <span className="topic-score">
                Son sonuç: {result.responses.length} soruda {correct} doğru ·{" "}
                {result.responses.length - correct} yanlış
              </span>
              {assisted > 0 && (
                <small>
                  {independentCorrect(result)} bağımsız doğru · {assisted}{" "}
                  soruda ipucu kullanıldı
                </small>
              )}
              <small>Soru tarihi: {dateTR(result.date)}</small>
            </>
          )}
          {mode === "questions" && completedDate && !result && (
            <small>Kendi kaynağında çalışıldı; soru sonucu kaydedilmedi.</small>
          )}
          {detailed && (
            <small>
              {completedDate
                ? `Çalışıldı: ${dateTR(completedDate)}`
                : scheduledDate
                  ? dateTR(scheduledDate)
                  : "Tarih atanamadı"}
            </small>
          )}
        </span>
        <ArrowRight size={17} aria-hidden="true" />
      </button>
      {(result || (!detailed && mode === "theory" && completedDate)) && (
        <div className="planned-topic-actions">
          {result && (
            <button
              className="text-button"
              onClick={() =>
                navigate(`/result?id=${encodeURIComponent(result.id)}`)
              }
            >
              Sonucu gör
            </button>
          )}
          {!detailed && mode === "theory" && (
            <TopicCompletion id={topic.id} mode="theory" compact />
          )}
        </div>
      )}
    </li>
  );
}

export function DailyStudyPlans({
  navigate,
}: {
  navigate: (route: string) => void;
}) {
  const { state, today } = useApp();
  const [expanded, setExpanded] = useState({ theory: false, questions: false });
  const results = useMemo(() => topicResults(state), [state.sessions]);
  const plans = useMemo(
    () => [
      studyPlan(state, "theory", today),
      studyPlan(state, "questions", today),
    ],
    [state.topicProgress, state.sessions, state.settings, today],
  );
  return (
    <section className="daily-study-plans" aria-label="Bugünün çalışma yolu">
      <h2>Bugünün çalışma yolu</h2>
      <div className="daily-plan-grid">
        {plans.map((plan) => {
          const completed = completionDates(state, plan.mode);
          const scheduled = new Map(
            plan.scheduled.map((v) => [v.topic.id, v.day]),
          );
          const pendingToday = new Set(plan.items.map(({ topic }) => topic.id));
          const dailyTopics = studyTopics.filter(
            (topic) =>
              pendingToday.has(topic.id) ||
              completed.get(topic.id) === today ||
              results.get(topic.id)?.date === today,
          );
          return (
            <section
              className="panel daily-plan"
              key={plan.mode}
              aria-label={plan.mode === "theory" ? "Konu planı" : "Soru planı"}
            >
              <div className="section-heading">
                <h3>{plan.mode === "theory" ? "Konu anlatımı" : "Sorular"}</h3>
                <span className="small muted">
                  Hedef: {dateTR(plan.deadline)}
                </span>
              </div>
              <progress
                aria-label={
                  plan.mode === "theory"
                    ? "Çalışılmış konular"
                    : "Soru çalışılmış konular"
                }
                value={plan.done}
                max={plan.total}
              />
              <p className="plan-equation">
                <strong>{plan.remaining}</strong> kalan konu ÷{" "}
                <strong>{plan.days}</strong> uygun gün
                {plan.perDay !== null && (
                  <>
                    {" "}
                    ={" "}
                    <strong>
                      {new Intl.NumberFormat("tr-TR", {
                        maximumFractionDigits: 2,
                      }).format(plan.perDay)}
                    </strong>{" "}
                    konu/gün
                  </>
                )}
              </p>
              <p className="small muted">
                {plan.done}/{plan.total} konu çalışıldı. Bugün ve hedef günü
                hesaba dahildir.
              </p>
              {plan.status === "complete" ? (
                <p className="plan-status">Bu çalışma listesini tamamladın.</p>
              ) : plan.status === "overdue" ? (
                <p className="plan-status" role="status">
                  {plan.mode === "theory"
                    ? "28/02/2027 konu bitirme hedefi geçti; kalan konuları serbestçe çalışmaya devam edebilirsin."
                    : "Hedef tarihi geçti; kalan soruları serbestçe çalışabilir, sınav tarihini Ayarlar’dan değiştirebilirsin."}
                </p>
              ) : plan.status === "unavailable" ? (
                <p className="plan-status" role="status">
                  Hedefe kadar uygun gün yok. Takvim’den müsait günlerini
                  düzenle.
                </p>
              ) : plan.closed ? (
                <p className="plan-status">
                  Bugün müsait değil olarak seçildi; bu güne yeni konu atanmadı.
                </p>
              ) : (
                <>
                  <p className="plan-today-target">
                    Bugünün hedefi: <strong>{plan.target} konu</strong> ·{" "}
                    {plan.doneToday} tamamlandı
                  </p>
                  {!plan.items.length && (
                    <p className="plan-status">Bugünkü hedefini tamamladın.</p>
                  )}
                </>
              )}
              {dailyTopics.length > 0 && (
                <ol className="planned-topics" aria-label="Bugünün konuları">
                  {dailyTopics.map((topic) => (
                    <PlannedTopicRow
                      key={topic.id}
                      topic={topic}
                      mode={plan.mode}
                      completedDate={completed.get(topic.id)}
                      result={results.get(topic.id)}
                      navigate={navigate}
                    />
                  ))}
                </ol>
              )}
              <details
                className="plan-full-order"
                onToggle={(e) => {
                  const opened = e.currentTarget.open;
                  setExpanded((v) => ({ ...v, [plan.mode]: opened }));
                }}
              >
                <summary>Tüm çalışma sırası ve tarihler ({plan.total})</summary>
                {expanded[plan.mode] && (
                  <ol className="planned-topics">
                    {studyTopics.map((topic) => (
                      <PlannedTopicRow
                        key={topic.id}
                        topic={topic}
                        mode={plan.mode}
                        completedDate={completed.get(topic.id)}
                        scheduledDate={scheduled.get(topic.id)}
                        result={results.get(topic.id)}
                        detailed
                        navigate={navigate}
                      />
                    ))}
                  </ol>
                )}
              </details>
            </section>
          );
        })}
      </div>
    </section>
  );
}
