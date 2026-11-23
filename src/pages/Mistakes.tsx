import { typeset } from "../domain/typeset";
import { localizedQuestionView } from "../domain/questionPresentation";
import { useMemo, useRef, useState } from "react";
import { RotateCcw, ArrowUpRight } from "lucide-react";
import { useApp } from "../store";
import { lessons, lessonById, subjects } from "../domain/content";
import { formatDate, undoSession } from "../domain/scheduler";
import { useConfirmationDialog } from "../components/ConfirmationDialog";
import { Empty } from "../components/Shared";
import type { Lesson } from "../domain/model";
import { MistakeRepair, RepairStages, mistakeKey, mistakeMap, mistakeReasons } from "../components/MistakeRepair";
import { MistakeBoss, MistakeSprint, MistakeWarning, PocketBooklet } from "../components/MistakeTools";
import { MistakeBridge } from "../components/MistakeBridge";
import { StarBadge } from "../components/StarPractice";
import { beginExam, mistakeSprintSpec, questionStars } from "../domain/exams";
import { MistakePatterns } from "../components/MistakePatterns";
import { lastSevenDays, mistakePatterns, wrongAnswers } from "../domain/mistakePatterns";
import { compareMistakes, repairProgress, statusOfStage, STATUS_LABEL, type MistakeStatus } from "../domain/mistakeStatus";
import { twinForMistake } from "../domain/twinQuestion";
import { lessonTopic } from "../domain/studyPlan";
import { osymRows } from "../learning/osym";
import { osymTopicCount } from "../domain/trapDeck";
import { TrapDeck } from "../components/TrapDeck";
import { SourceQuestionFigure } from "../learning/SourceQuestionFigure";
import { sourceQuestionPresentation } from "../learning/sourceExercises024";
import { signedWorkPracticeView } from "../learning/signedWork055";
import { savedSourceVisuals } from "../learning/sourceVisualRevisions";

const subjectOrder = subjects.map((s) => s.id);
export function Mistakes({
  start,
  navigate,
}: {
  start: (l: Lesson) => void;
  navigate: (s: string) => void;
}) {
  const { state, today, t, l, commit, toast } = useApp();
  const { confirm, confirmationDialog } = useConfirmationDialog();
  const undoLock = useRef(false);
  const [undoing, setUndoing] = useState(false);
  async function undo(id: string) {
    if (undoLock.current) return;
    undoLock.current = true;
    setUndoing(true);
    try {
      if (
        !(await confirm({
          title: "Bu çalışma oturumunu geri alalım mı?",
          description: t("undoExplain"),
          confirmLabel: "Oturumu geri al",
        }))
      )
        return;
      await commit((current) => undoSession(current, id));
      toast(t("undoDone"));
    } catch {
      // The store exposes the failed save and retains the durable session.
    } finally {
      undoLock.current = false;
      setUndoing(false);
    }
  }
  const [tab, setTab] = useState("mistakes");
  const [filter, setFilter] = useState<MistakeStatus | "hepsi">("hepsi");
  const allItems = state.sessions
    .flatMap((s) =>
      s.responses
        .filter((r) => !r.correct || r.assisted)
        .map((r) => {
          const question = lessons
            .flatMap((x) => x.questions)
            .find((q) => q.id === r.questionId);
          const lesson = lessonById(s.lessonId);
          const twinId = lesson
            ? twinForMistake(lesson.questions, state.sessions, state.examSessions, s, r.questionId)
            : undefined;
          const progress = repairProgress(state.sessions, s, r.questionId, state.examSessions, twinId);
          const displayed = question ? localizedQuestionView(question) : undefined;
          const helpQuestion = displayed ? signedWorkPracticeView({
            id: displayed.id,
            passage: displayed.passage ? l(displayed.passage) : undefined,
            prompt: l(displayed.prompt),
            options: displayed.options.map(l),
            answer: displayed.answer,
            explanation: l(displayed.explanation),
            hint: l(displayed.hint),
            guidance: displayed.guidance,
          }) : undefined;
          const figures = helpQuestion
            ? savedSourceVisuals(helpQuestion, sourceQuestionPresentation(helpQuestion), r)
            : undefined;
          return {
            session: s,
            response: r,
            lesson,
            question: displayed,
            figures,
            progress,
            status: statusOfStage(progress.stage),
            confident: !r.correct && r.confidence === "high",
            assistedOnly: r.correct,
            stars: questionStars(r.questionId) ?? 0,
            finishedAt: s.finishedAt,
          };
        }),
    )
    .sort(compareMistakes);
  const counts = {
    hepsi: allItems.length,
    acik: allItems.filter((x) => x.status === "acik").length,
    onarildi: allItems.filter((x) => x.status === "onarildi").length,
    kalici: allItems.filter((x) => x.status === "kalici").length,
  };
  const items = allItems.filter((x) => filter === "hepsi" || x.status === filter);
  const allWrong = useMemo(
    () => wrongAnswers(state.sessions, state.examSessions, state.explorations, (id) => lessonById(id)?.subjectId),
    [state.sessions, state.examSessions, state.explorations],
  );
  const wrongSubjects = useMemo(() => allWrong.map((w) => w.subjectId), [allWrong]);
  const weekPatterns = mistakePatterns(lastSevenDays(allWrong, today));
  async function startSprint(ids: string[]) {
    const spec = mistakeSprintSpec(ids);
    if (!spec) return;
    try {
      await commit((s) => beginExam(s, spec, Date.now(), "learning"));
      navigate("/exams");
    } catch {
      toast("Sprint başlatılamadı. Kayıtların korundu; yeniden dene.");
    }
  }
  return (
    <>
      {confirmationDialog}
      <header className="page-heading">
        <div>
          <h1>{t("mistakes")}</h1>
        </div>
      </header>
      <p className="lead muted">{t("mistakesBody")}</p>
      <div className="segmented section-tabs">
        <button
          aria-pressed={tab === "mistakes"}
          className={tab === "mistakes" ? "active" : ""}
          onClick={() => setTab("mistakes")}
        >
          {t("mistakes")} ({allItems.length})
        </button>
        <button
          aria-pressed={tab === "history"}
          className={tab === "history" ? "active" : ""}
          onClick={() => setTab("history")}
        >
          {t("history")}
        </button>
        <button
          aria-pressed={tab === "traps"}
          className={tab === "traps" ? "active" : ""}
          onClick={() => setTab("traps")}
        >
          ÖSYM tuzak destesi
        </button>
      </div>
      {tab === "traps" && (
        <TrapDeck subjectOrder={subjectOrder} wrongSubjects={wrongSubjects} subjectName={subjectName} />
      )}
      {tab === "mistakes" && (
        <MistakePatterns
          patterns={weekPatterns}
          subjectName={subjectName}
          busy={!!state.examDraft}
          begin={startSprint}
        />
      )}
      {tab === "traps" ? null : tab === "mistakes" ? (
        allItems.length ? (
          <div className="mistake-list">
            <MistakeMapPanel
              explorations={state.explorations}
              rows={allItems.map(({ session, response, lesson }) => ({
                key: mistakeKey(session.id, response.questionId),
                subject: lesson?.subjectId ?? "",
              }))}
            />
            <div className="mistake-filters" role="group" aria-label="Onarım durumu">
              {(["hepsi", "acik", "onarildi", "kalici"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  className={filter === f ? "active" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f === "hepsi" ? "Hepsi" : STATUS_LABEL[f]} ({counts[f]})
                </button>
              ))}
            </div>
            <MistakeSprint
              ids={allItems.filter((x) => x.status === "acik").map((x) => x.response.questionId)}
              busy={!!state.examDraft}
              begin={startSprint}
            />
            <MistakeBoss
              ids={[...allItems]
                .filter((x) => x.status !== "kalici" && !x.assistedOnly)
                .sort((a, b) => Number(b.confident) - Number(a.confident) || b.stars - a.stars)
                .map((x) => x.response.questionId)}
              busy={!!state.examDraft}
              weekend={[0, 6].includes(new Date().getDay())}
              begin={async (ids) => {
                const spec = mistakeSprintSpec(ids, 20, "boss");
                if (!spec) return;
                try {
                  await commit((s) => beginExam(s, spec, Date.now(), "learning"));
                  navigate("/exams");
                } catch {
                  toast("Boss turu başlatılamadı. Kayıtların korundu; yeniden dene.");
                }
              }}
            />
            <PocketBooklet
              items={allItems
                .filter((x) => x.status !== "kalici" && x.question && !x.figures?.figuresUnavailable)
                .map((x) => ({
                  key: mistakeKey(x.session.id, x.response.questionId),
                  lesson: x.lesson ? l(x.lesson.title) : "",
                  prompt: l(x.question!.prompt),
                  answer: l(x.question!.options[x.question!.answer]),
                  stemFigure: x.figures?.stem,
                  answerFigure: x.figures?.options?.[x.question!.answer],
                }))}
            />
            {items.map(({ session, response, lesson, question, status, confident, stars, progress, figures }, i) => {
              const osym = lesson ? osymTopicCount(osymRows, lessonTopic[lesson.id], lesson.subjectId) : undefined;
              const figuresUnavailable = figures?.figuresUnavailable;
              const selectedFigure = figures?.options?.[response.selected];
              const correctFigure = question ? figures?.options?.[question.answer] : undefined;
              return (
              question && lesson ? (
                <article
                  className="panel mistake-card"
                  key={`${session.id}:${response.questionId}:${i}`}
                >
                  <div className="section-heading">
                    <span className="small muted">
                      {l(lesson.title)} ·{" "}
                      {formatDate(session.date, state.settings.locale)}
                    </span>
                    <span
                      className={
                        response.assisted ? "quiet-chip" : "error-chip"
                      }
                    >
                      {t(response.assisted ? "assisted" : "incorrect")}
                    </span>
                  </div>
                  <div className="mistake-meta">
                    <span className={`status-chip status-${status}`}>{STATUS_LABEL[status]}</span>
                    {confident && <span className="error-chip">Eminim dedin · yanlış</span>}
                    <StarBadge stars={stars || undefined} />
                  </div>
                  {osym && (
                    <p className="small muted mistake-osym">
                      {osym.questions
                        ? `ÖSYM bu başlıktan ${osym.years} yılda ${osym.questions} soru sordu.`
                        : `ÖSYM bu başlıktan ${osym.years} yılda doğrudan soru sormadı.`}
                    </p>
                  )}
                  <h2 className="question-prompt">{figuresUnavailable ? "Kayıtlı grafikli soru" : typeset(l(question.prompt))}</h2>
                  {figures?.stem && <SourceQuestionFigure figure={figures.stem} />}
                  <p>
                    <span className="muted">{t("yourAnswer")}: </span>
                    {figuresUnavailable ? String.fromCharCode(65 + response.selected) : l(question.options[response.selected])}
                  </p>
                  {selectedFigure && (
                    <div className="answer-option-figure"><SourceQuestionFigure figure={selectedFigure} /></div>
                  )}
                  {figuresUnavailable ? (
                    <p className="small muted">Kayda ait çizimler bulunamadı. Kaydedilmiş yanıtın korunuyor.</p>
                  ) : <details>
                    <summary>{t("explanation")}</summary>
                    <p>
                      <strong>
                        {t("rightAnswer")}:{" "}
                        {l(question.options[question.answer])}
                      </strong>
                    </p>
                    {correctFigure && (
                      <div className="answer-option-figure"><SourceQuestionFigure figure={correctFigure} /></div>
                    )}
                    {figures?.solutionUnavailable ? (
                      <p className="small muted">Kayda ait çözüm çizimleri bulunamadı.</p>
                    ) : (
                      <>
                        <p>{typeset(l(question.explanation))}</p>
                        {figures?.explanation && <SourceQuestionFigure figure={figures.explanation} />}
                        {!!figures?.steps?.length && (
                          <ol className="source-review-steps" aria-label="Çözüm çizimleri">
                            {figures.steps.map((figure, index) =>
                              <li key={index}><SourceQuestionFigure figure={figure} /></li>,
                            )}
                          </ol>
                        )}
                      </>
                    )}
                  </details>}
                  <MistakeWarning storageKey={mistakeKey(session.id, response.questionId)} />
                  {!figuresUnavailable && <MistakeRepair
                    sessionId={session.id}
                    questionId={response.questionId}
                    options={question.options.map((o) => l(o))}
                    answer={question.answer}
                  >
                    <RepairStages
                      progress={progress}
                      questionId={response.questionId}
                      today={today}
                      busy={!!state.examDraft}
                      begin={startSprint}
                    />
                  </MistakeRepair>}
                  <MistakeBridge lessonId={lesson.id} subjectId={lesson.subjectId} navigate={navigate} />
                  <button className="text-button" onClick={() => start(lesson)}>
                    {t("repair")}
                    <ArrowUpRight size={17} />
                  </button>
                </article>
              ) : null);
            })}
          </div>
        ) : (
          <Empty text={t("noMistakes")} />
        )
      ) : (
        <section className="panel history-list">
          {!state.sessions.length ? (
            <Empty text={t("noData")} />
          ) : (
            state.sessions.toReversed().map((s) => (
              <article className="history-row" key={s.id}>
                <button
                  className="text-button"
                  onClick={() =>
                    navigate(`/result?id=${encodeURIComponent(s.id)}`)
                  }
                >
                  {l(
                    lessonById(s.lessonId)?.title ?? {
                      tr: s.lessonId,
                    },
                  )}
                  <ArrowUpRight size={15} />
                </button>
                <span className="small muted">
                  {formatDate(s.date, state.settings.locale)} ·{" "}
                  {s.responses.filter((r) => r.correct).length}/
                  {s.responses.length}
                </span>
                <button
                  className="icon-button"
                  aria-label={t("undo")}
                  title={t("undo")}
                  disabled={undoing}
                  onClick={() => void undo(s.id)}
                >
                  <RotateCcw size={17} />
                </button>
              </article>
            ))
          )}
        </section>
      )}
    </>
  );
}

function MistakeMapPanel({
  explorations,
  rows,
}: {
  explorations: Record<string, Record<string, unknown>>;
  rows: { key: string; subject: string }[];
}) {
  const { counts, untagged } = mistakeMap(explorations, rows.map((r) => r.key));
  const max = Math.max(1, ...counts.values());
  const subjectsWithTags = [...new Set(rows.filter((r) => typeof explorations[r.key]?.reason === "string").map((r) => r.subject))];
  const cell = (subject: string, reason: string) =>
    rows.filter((r) => r.subject === subject && explorations[r.key]?.reason === reason).length;
  const cellMax = Math.max(1, ...subjectsWithTags.flatMap((sub) => mistakeReasons.map((r) => cell(sub, r.id))));
  return (
    <section className="panel mistake-map" aria-label="Hata haritası">
      <h2>Hata haritan</h2>
      <p className="small muted">
        Her yanlışa bir neden seç; en sık nedeni önce onar. Etiketler senin notundur, puan vermez.
      </p>
      <ul>
        {mistakeReasons.map((r) => {
          const n = counts.get(r.id) ?? 0;
          return (
            <li key={r.id}>
              <span>{r.label}</span>
              <span className="map-bar" aria-hidden="true">
                <span style={{ width: `${(n / max) * 100}%` }} />
              </span>
              <strong>{n}</strong>
            </li>
          );
        })}
      </ul>
      <p className="small muted">Nedeni seçilmemiş: {untagged}</p>
      {subjectsWithTags.length > 0 && (
        <div className="mistake-heat" role="region" aria-label="Ders ve neden ısı haritası" tabIndex={0}>
          <table>
            <caption className="small muted">Ders × neden: koyu hücre, en çok tekrarlayan hata kalıbın.</caption>
            <thead>
              <tr>
                <th scope="col">Ders</th>
                {mistakeReasons.map((r) => (
                  <th scope="col" key={r.id}>
                    {r.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjectsWithTags.map((sub) => (
                <tr key={sub}>
                  <th scope="row">{subjectName(sub)}</th>
                  {mistakeReasons.map((r) => {
                    const n = cell(sub, r.id);
                    return (
                      <td key={r.id} style={{ ["--heat" as string]: String(n / cellMax) }} className={n ? "hot" : ""}>
                        {n || ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function subjectName(id: string) {
  const subject = subjects.find((s) => s.id === id);
  return subject ? `${subject.exam} ${subject.name.tr}` : id;
}
