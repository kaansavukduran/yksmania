import { useMemo } from "react";
import { subjects } from "../domain/content";
import { useApp } from "../store";
import { completionDates, studyTopics } from "../domain/studyPlan";
import { StudyTree } from "../components/StudyTree";
export function World({ navigate }: { navigate: (r: string) => void }) {
  const { state, t } = useApp();
  const completed = useMemo(
    () => completionDates(state, "theory"),
    [state.topicProgress, state.sessions],
  );
  const questions = useMemo(
    () => completionDates(state, "questions"),
    [state.topicProgress, state.sessions],
  );
  const count = studyTopics.filter((topic) => completed.has(topic.id)).length;
  const percent = count / studyTopics.length;
  let offset = 0;
  const segments = subjects.map((s) => {
    const topics = studyTopics.filter((t) => t.subjectId === s.id);
    const done = topics.filter((t) => completed.has(t.id)).length;
    const questionDone = topics.filter((t) => questions.has(t.id)).length;
    const segment = {
      ...s,
      total: topics.length,
      done,
      questionDone,
      offset,
      size: (100 * done) / studyTopics.length,
    };
    offset += (100 * topics.length) / studyTopics.length;
    return segment;
  });
  const percentage = new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 1,
  }).format(percent * 100);
  return (
    <>
      <header className="page-heading">
        <h1>{t("world")}</h1>
        <span className="quiet-chip">Çalışma haritası</span>
      </header>
      {!state.settings.gamification && <p className="muted">{t("worldOff")}</p>}
      <section className="panel world-progress">
        <div className="world-progress-visual">
          {state.settings.gamification && (
            <div
              className="study-landscape"
              aria-hidden="true"
              style={{
                filter: `grayscale(${1 - percent})`,
                opacity: 0.18 + percent * 0.62,
              }}
            />
          )}
          <svg
            viewBox="0 0 240 240"
            role="img"
            aria-label={`Genel konu çalışma ilerlemesi yüzde ${percentage}; ${count}/${studyTopics.length} konu`}
          >
            <circle cx="120" cy="120" r="91" fill="var(--bg)" />
            <circle
              cx="120"
              cy="120"
              r="91"
              fill="none"
              stroke="var(--border)"
              strokeWidth="24"
            />
            {segments
              .filter((s) => s.done > 0)
              .map((s) => (
                <circle
                  key={s.id}
                  cx="120"
                  cy="120"
                  r="91"
                  fill="none"
                  pathLength="100"
                  stroke={s.color}
                  strokeWidth="24"
                  strokeDasharray={`${s.size} ${100 - s.size}`}
                  strokeDashoffset={-s.offset}
                  transform="rotate(-90 120 120)"
                />
              ))}
            <text x="120" y="118" textAnchor="middle" className="donut-percent">
              %{percentage}
            </text>
            <text x="120" y="144" textAnchor="middle" className="donut-label">
              {count} / {studyTopics.length} konu
            </text>
          </svg>
        </div>
        <div className="world-progress-details">
          <h2>Ders ders ilerlemen</h2>
          <p className="small muted">
            Renkli alanlar çalışılmış konuları, nötr alanlar kalan konuları
            gösterir. Kendi çalışma bildirimin ve tamamlanmış uygulama
            oturumları birlikte sayılır; bu grafik ustalık ölçümü değildir.
          </p>
          <table className="subject-progress-table">
            <caption className="sr-only">
              Çalışma listesindeki konu ve soru ilerlemesi
            </caption>
            <thead>
              <tr>
                <th>Ders</th>
                <th>Konu</th>
                <th>Soru</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((s) => (
                <tr key={s.id}>
                  <th scope="row">
                    <span
                      className="subject-color"
                      style={{ background: s.color }}
                    />
                    {s.exam} {s.name.tr}
                  </th>
                  <td>
                    {s.done}/{s.total}
                  </td>
                  <td>
                    {s.questionDone}/{s.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="small muted">
        Ağaçlardaki dallar çalışma sırasını gösterir. Konudan anlatıma, yan
        dalından sorulara geçebilirsin. Yüzdeler {studyTopics.length} başlığa
        göredir: Excel’deki 479 başlık ve eklenen 6 geometri temeli. Yeni
        başlıklar önceki tamamlanma kayıtlarını değiştirmez.
      </p>
      <div className="study-trees">
        <StudyTree
          exam="TYT"
          completed={completed}
          questions={questions}
          navigate={navigate}
        />
        <StudyTree
          exam="AYT"
          completed={completed}
          questions={questions}
          navigate={navigate}
        />
      </div>
    </>
  );
}
