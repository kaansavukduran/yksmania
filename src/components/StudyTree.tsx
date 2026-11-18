import { useState } from "react";
import { subjects } from "../domain/content";
import { studyTopics, topicLessons, type StudyMode } from "../domain/studyPlan";
import { SubjectIcon } from "./SubjectIcon";
export function StudyTree({
  exam,
  completed,
  questions,
  navigate,
}: {
  exam: "TYT" | "AYT";
  completed: Map<string, string>;
  questions: Map<string, string>;
  navigate: (r: string) => void;
}) {
  const list = subjects.filter((s) => s.exam === exam);
  const [selected, setSelected] = useState(list[0].id);
  const subject = list.find((s) => s.id === selected)!;
  const topics = studyTopics.filter((t) => t.subjectId === selected);
  const go = (id: string, mode: StudyMode) =>
    navigate(`/topic?id=${id}&mode=${mode}`);
  return (
    <section className="panel skill-tree" aria-label={`${exam} konu ağacı`}>
      <h2>{exam === "TYT" ? "TYT" : "AYT Sayısal"}</h2>
      <svg
        className="subject-tree-diagram"
        viewBox="0 0 460 300"
        role="group"
        aria-label={`${exam} ders dalları`}
      >
        {list.map((s, i) => {
          const col = i % 5,
            row = Math.floor(i / 5),
            x = 50 + col * 90,
            y = row ? 154 : 258;
          return (
            <g key={s.id}>
              <path
                d={`M230 30 C230 ${110 - row * 25} ${x} 90 ${x} ${y - 21}`}
                fill="none"
                stroke={s.color}
                strokeWidth={selected === s.id ? 4 : 2}
                opacity={selected === s.id ? 1 : 0.5}
              />
              <g
                role="button"
                tabIndex={0}
                aria-label={`${exam} ${s.name.tr} konuları`}
                aria-pressed={selected === s.id}
                onClick={() => setSelected(s.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(s.id);
                  }
                }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="24"
                  fill="var(--surface)"
                  stroke={s.color}
                  strokeWidth={selected === s.id ? 4 : 2}
                />
                <g transform={`translate(${x - 12} ${y - 12})`} color={s.color}>
                  <SubjectIcon id={s.id} width={24} height={24} />
                </g>
                <text
                  x={x}
                  y={y + 38}
                  textAnchor="middle"
                  className="tree-label"
                >
                  {" "}
                  {s.name.tr}
                </text>
              </g>
            </g>
          );
        })}
        <circle
          cx="230"
          cy="30"
          r="26"
          fill="var(--surface-2)"
          stroke="var(--border)"
          strokeWidth="2"
        />
        <text x="230" y="35" textAnchor="middle" className="tree-mark">
          {exam}
        </text>
      </svg>
      <label className="field">
        Ders
        <select
          aria-label={`${exam} ders seçimi`}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {list.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name.tr}
            </option>
          ))}
        </select>
      </label>
      <div className="section-heading">
        <h3>{subject.name.tr}</h3>
        <span className="small muted">
          {topics.filter((t) => completed.has(t.id)).length}/{topics.length}{" "}
          konu
        </span>
      </div>
      <ol
        className="skill-branches"
        style={{ "--branch-color": subject.color } as React.CSSProperties}
      >
        {topics.map((topic) => (
          <li key={topic.id}>
            <button
              className={`skill-topic ${completed.has(topic.id) ? "is-complete" : ""}`}
              onClick={() => go(topic.id, "theory")}
            >
              <small>
                {topic.order}. konu ·{" "}
                {completed.has(topic.id) ? "Çalışıldı" : "Sırada"}
              </small>
              <strong>{topic.title}</strong>
            </button>
            <div className="question-branch">
              <button
                className={`skill-question ${questions.has(topic.id) ? "is-complete" : ""}`}
                onClick={() => go(topic.id, "questions")}
              >
                Sorular ·{" "}
                {questions.has(topic.id)
                  ? "Çalışıldı"
                  : topicLessons(topic.id).some(
                        (lesson) => lesson.questions.length > 0,
                      )
                    ? `${topicLessons(topic.id).reduce((n, l) => n + l.questions.length, 0)} soru`
                    : "Sorular hazırlanıyor"}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
