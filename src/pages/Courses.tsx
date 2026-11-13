import { useState } from "react";
import { CheckCircle2, Search, ChevronDown } from "lucide-react";
import { useApp } from "../store";
import { lessons, subjects } from "../domain/content";
import { LessonRow, Empty, SubjectMark } from "../components/Shared";
import type { Lesson } from "../domain/model";
export function Courses({ start }: { start: (l: Lesson) => void }) {
  const { t, l, state } = useApp();
  const [exam, setExam] = useState("TYT");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const filtered = subjects.filter(
    (s) =>
      s.exam === exam &&
      (l(s.name).toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        s.topics.some((v) =>
          v.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        )),
  );
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">TYT + AYT SAYISAL</p>
          <h1>{t("courses")}</h1>
        </div>
        <span className="quiet-chip">{t("catalogueStatus")}</span>
      </header>
      <p className="lead muted">{t("mapNote")}</p>
      <div className="toolbar">
        <div className="segmented" aria-label={t("courses")}>
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
          const ready = lessons.filter((v) => v.subjectId === subject.id);
          return (
            <section className="panel subject-panel" key={subject.id}>
              <button
                className="subject-header"
                aria-expanded={open === subject.id}
                onClick={() => setOpen(open === subject.id ? null : subject.id)}
              >
                <SubjectMark id={subject.id} />
                <span>
                  <h2>{l(subject.name)}</h2>
                  <span className="small muted">
                    {subject.topics.length} {t("topics")} · {ready.length}{" "}
                    {t("lessonCount")}
                  </span>
                </span>
                <ChevronDown
                  size={18}
                  className={open === subject.id ? "rotated" : ""}
                />
              </button>
              {ready.map((lesson) => (
                <div key={lesson.id} className="course-lesson">
                  <LessonRow lesson={lesson} onStart={() => start(lesson)} />
                  {state.sessions.some((s) => s.lessonId === lesson.id) && (
                    <span className="studied small">
                      <CheckCircle2 size={13} />
                      {t("completed")}
                    </span>
                  )}
                </div>
              ))}
              {open === subject.id && (
                <div className="topic-list">
                  <h3>{t("topicMap")}</h3>
                  {subject.topics.map((topic) => (
                    <div key={topic}>
                      <span>{topic}</span>
                      <span className="small muted">
                        {ready.some((r) => r.title.tr === topic)
                          ? t("available")
                          : t("planned")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {!ready.length && (
                <p className="subject-pending muted small">{t("planned")}</p>
              )}
            </section>
          );
        })}
      </div>
      {!filtered.length && <Empty text={t("noResults")} />}
    </>
  );
}
