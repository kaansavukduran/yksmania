import { useState } from "react";
import { Search, ChevronDown, LibraryBig } from "lucide-react";
import { useApp } from "../store";
import { subjects } from "../domain/content";
import detailTopics from "../data/detail-topics.json";
import { Empty, SubjectMark } from "../components/Shared";
import { SourceList } from "../components/SourceList";

export function Cheatsheets({
  navigate,
}: {
  navigate: (route: string) => void;
}) {
  const { t, l } = useApp();
  const [exam, setExam] = useState("TYT");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null | undefined>(undefined);
  const [selected, setSelected] = useState<string | null>("");
  const query = search.trim().toLocaleLowerCase("tr-TR");
  const filtered = subjects.filter(
    (s) =>
      s.exam === exam &&
      (l(s.name).toLocaleLowerCase("tr-TR").includes(query) ||
        detailTopics.some(
          (topic) =>
            topic.subjectId === s.id &&
            topic.title.toLocaleLowerCase("tr-TR").includes(query),
        )),
  );
  return (
    <>
      <header className="page-heading">
        <h1>{t("cheatsheets")}</h1>
        <span className="quiet-chip">
          {detailTopics.length} {t("topics")}
        </span>
      </header>
      <p className="lead muted">{t("cheatsheetsIntro")}</p>
      <div className="toolbar">
        <div className="segmented" aria-label={t("examChoice")}>
          {["TYT", "AYT"].map((value) => (
            <button
              key={value}
              className={exam === value ? "active" : ""}
              aria-pressed={exam === value}
              onClick={() => {
                setExam(value);
                setOpen(null);
                setSelected("");
              }}
            >
              {value}
            </button>
          ))}
        </div>
        <label className="search">
          <Search size={18} />
          <input
            aria-label={t("search")}
            placeholder={t("search")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(undefined);
              setSelected("");
            }}
          />
        </label>
      </div>
      <button className="secondary" onClick={() => navigate("/library")}>
        <LibraryBig size={18} />
        {t("cheatsheetImport")}
      </button>
      <div className="subject-grid cheatsheet-grid">
        {filtered.map((subject) => {
          const topics = detailTopics.filter(
            (topic) => topic.subjectId === subject.id,
          );
          const matching = topics.filter(
            (topic) =>
              !query ||
              l(subject.name).toLocaleLowerCase("tr-TR").includes(query) ||
              topic.title.toLocaleLowerCase("tr-TR").includes(query),
          );
          const expanded =
            open === subject.id || (open === undefined && !!query);
          return (
            <section className="panel subject-panel" key={subject.id}>
              <button
                className="subject-header"
                aria-expanded={expanded}
                onClick={() => {
                  setOpen(expanded ? null : subject.id);
                  setSelected("");
                }}
              >
                <SubjectMark id={subject.id} />
                <span>
                  <h2>{l(subject.name)}</h2>
                  <span className="small muted">
                    {topics.length} {t("topics")}
                  </span>
                </span>
                <ChevronDown size={18} className={expanded ? "rotated" : ""} />
              </button>
              {expanded && (
                <div className="subject-content">
                  <button
                    className="ready-topic cheatsheet-topic"
                    aria-expanded={selected === null}
                    onClick={() => setSelected(selected === null ? "" : null)}
                  >
                    <span>{t("allCheatsheetFiles")}</span>
                    <ChevronDown
                      size={18}
                      className={selected === null ? "rotated" : ""}
                    />
                  </button>
                  {selected === null && (
                    <SourceList subjectId={subject.id} mode="cheatsheets" />
                  )}
                  <ul className="cheatsheet-topics">
                    {matching.map((topic) => (
                      <li key={topic.id}>
                        <button
                          className="ready-topic cheatsheet-topic"
                          aria-expanded={selected === topic.id}
                          aria-controls={`files-${topic.id}`}
                          onClick={() =>
                            setSelected(selected === topic.id ? "" : topic.id)
                          }
                        >
                          <span>{topic.title}</span>
                          <ChevronDown
                            size={18}
                            className={selected === topic.id ? "rotated" : ""}
                          />
                        </button>
                        <div id={`files-${topic.id}`}>
                          {selected === topic.id && (
                            <SourceList
                              key={topic.id}
                              subjectId={subject.id}
                              mode="cheatsheets"
                              topic={topic}
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {!matching.length && <Empty text={t("noResults")} />}
                </div>
              )}
            </section>
          );
        })}
      </div>
      {!filtered.length && <Empty text={t("noResults")} />}
      <p className="scope-note">{t("cheatsheetsScope")}</p>
    </>
  );
}
