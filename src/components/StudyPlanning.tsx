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
  type StudyMode,
} from "../domain/studyPlan";
import { dateTR } from "./DateInput";

export function TopicCompletion({ id, mode }: { id: string; mode: StudyMode }) {
  const { state, commit, toast } = useApp();
  const [busy, setBusy] = useState(false);
  const done = !!completionDate(state, id, mode);
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
    <div className="topic-completion">
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
      <p className="small muted">
        {auto
          ? "Bu kayıt tamamlanmış soru oturumuna bağlıdır. Oturumu sonuç ekranından geri alabilirsin."
          : "Kendi çalışma bildirimin planı ve yüzdeleri günceller. Doğru cevap, ustalık veya XP kaydı oluşturmaz."}
      </p>
    </div>
  );
}

export function DailyStudyPlans({
  navigate,
}: {
  navigate: (route: string) => void;
}) {
  const { state, today } = useApp();
  const [expanded, setExpanded] = useState({ theory: false, questions: false });
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
                  <ol className="planned-topics">
                    {plan.items.map(({ topic }) => (
                      <li key={topic.id}>
                        <button
                          className="ready-topic"
                          onClick={() =>
                            navigate(`/topic?id=${topic.id}&mode=${plan.mode}`)
                          }
                        >
                          <span>
                            <small>
                              {topic.order}. konu ·{" "}
                              {subjectById(topic.subjectId)?.exam}{" "}
                              {subjectById(topic.subjectId)?.name.tr}
                            </small>
                            <strong>{topic.title}</strong>
                          </span>
                          <ArrowRight size={17} />
                        </button>
                      </li>
                    ))}
                  </ol>
                </>
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
                      <li key={topic.id}>
                        <button
                          className="ready-topic"
                          onClick={() =>
                            navigate(`/topic?id=${topic.id}&mode=${plan.mode}`)
                          }
                        >
                          <span>
                            <small>
                              {topic.order}. konu ·{" "}
                              {subjectById(topic.subjectId)?.exam}{" "}
                              {subjectById(topic.subjectId)?.name.tr}
                            </small>
                            {topic.title}
                            <small>
                              {completed.has(topic.id)
                                ? `Çalışıldı: ${dateTR(completed.get(topic.id)!)}`
                                : scheduled.get(topic.id)
                                  ? dateTR(scheduled.get(topic.id)!)
                                  : "Tarih atanamadı"}
                            </small>
                          </span>
                          {completed.has(topic.id) ? (
                            <Check size={17} />
                          ) : (
                            <ArrowRight size={17} />
                          )}
                        </button>
                      </li>
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
