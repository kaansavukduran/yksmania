import { useMemo, useState } from "react";
import { Search, ChevronDown, ArrowRight } from "lucide-react";
import { useApp } from "../store";
import { lessons, subjects } from "../domain/content";
import curriculum from "../data/curriculum.json";
import { Empty, SubjectMark } from "../components/Shared";
import { SourceList } from "../components/SourceList";
import type { Lesson } from "../domain/model";
export function Courses({
  start,
  mode = "theory",
}: {
  start: (l: Lesson) => void;
  mode?: "theory" | "questions";
}) {
  const { t, l } = useApp();
  const [exam, setExam] = useState("TYT");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const query = search.toLocaleLowerCase("tr-TR");
  const filtered = useMemo(
    () =>
      subjects.filter(
        (s) =>
          s.exam === exam &&
          (l(s.name).toLocaleLowerCase("tr-TR").includes(query) ||
            lessons.some(
              (lesson) =>
                lesson.subjectId === s.id &&
                l(lesson.title).toLocaleLowerCase("tr-TR").includes(query),
            ) ||
            s.topics.some((v) => v.toLocaleLowerCase("tr-TR").includes(query))),
      ),
    [exam, query, l],
  );
  return (
    <>
      <header className="page-heading">
        <div>
          <h1>{t(mode === "theory" ? "courses" : "questions")}</h1>
        </div>
        <span className="quiet-chip">
          {curriculum.length} {t("topics")}
        </span>
      </header>
      <p className="lead muted">
        {t(mode === "theory" ? "theoryIntro" : "questionsIntro")}
      </p>
      <div className="toolbar">
        <div className="segmented" aria-label={t("examChoice")}>
          {["TYT", "AYT"].map((x) => (
            <button
              key={x}
              className={exam === x ? "active" : ""}
              aria-pressed={exam === x}
              onClick={() => {
                setExam(x);
                setOpen(null);
              }}
            >
              {x}
            </button>
          ))}
        </div>
        <label className="search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search")}
            aria-label={t("search")}
          />
        </label>
      </div>
      <div className="subject-grid">
        {filtered.map((subject) => {
          const ready = lessons.filter(
            (v) =>
              v.subjectId === subject.id &&
              (!query ||
                l(subject.name).toLocaleLowerCase("tr-TR").includes(query) ||
                l(v.title).toLocaleLowerCase("tr-TR").includes(query)),
          );
          const expanded = open === subject.id || !!query;
          const topics = curriculum.filter(
            (v) =>
              v.subjectId === subject.id &&
              (!query || v.title.toLocaleLowerCase("tr-TR").includes(query)),
          );
          return (
            <section className="panel subject-panel" key={subject.id}>
              <button
                className="subject-header"
                aria-expanded={expanded}
                onClick={() => setOpen(open === subject.id ? null : subject.id)}
              >
                <SubjectMark id={subject.id} />
                <span>
                  <h2>{l(subject.name)}</h2>
                  <span className="small muted">
                    {subject.topics.length} {t("topics")} · {ready.length}{" "}
                    {t(
                      mode === "theory"
                        ? "readyNarratives"
                        : "readyQuestionSets",
                    )}
                  </span>
                </span>
                <ChevronDown size={18} className={expanded ? "rotated" : ""} />
              </button>
              {expanded && (
                <div className="subject-content">
                  {!!ready.length && (
                    <div className="ready-topic-list">
                      <h3>
                        {t(
                          mode === "theory"
                            ? "readyNarratives"
                            : "readyQuestionSets",
                        )}
                      </h3>
                      {ready.map((lesson) => (
                        <button
                          className="ready-topic"
                          key={lesson.id}
                          onClick={() => start(lesson)}
                        >
                          <span>
                            {l(lesson.title)}
                            <small>
                              {mode === "theory"
                                ? `${lesson.minutes} ${t("minutes")}`
                                : `${lesson.questions.length} ${t("originalQuestions")}`}
                            </small>
                          </span>
                          <ArrowRight size={18} />
                        </button>
                      ))}
                    </div>
                  )}
                  {(!query || topics.length > 0) && (
                    <details className="curriculum-details" open={!!query}>
                      <summary>
                        {t("topicMap")} ({subject.topics.length})
                      </summary>
                      <ul className="curriculum-list">
                        {topics.map((topic) => (
                          <li key={topic.id}>
                            <span>{topic.title}</span>
                            <span className="small muted">
                              {t("catalogueHeading")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                  <SourceList
                    key={`${subject.id}:${mode}`}
                    subjectId={subject.id}
                    mode={mode}
                  />
                </div>
              )}
            </section>
          );
        })}
      </div>
      {!filtered.length && <Empty text={t("noResults")} />}
      <p className="scope-note">{t("curriculumScope")}</p>
    </>
  );
}
