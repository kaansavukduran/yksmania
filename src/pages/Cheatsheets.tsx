import { useState } from "react";
import { Search, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "../store";
import { subjects } from "../domain/content";
import { studyTopics } from "../domain/studyPlan";
import { Empty, SubjectMark } from "../components/Shared";
import { StudyTimer } from "../components/StudyTimer";
import { builtInCheatSheets, studyCheatSheet } from "../learning/cheatsheetContent";
import { CheatReader } from "../learning/CheatReader";
import { TacticLibrary } from "../learning/TacticLibraryPanel";
import "../cheatsheets.css";

export function Cheatsheets({
  navigate,
  topicId,
}: {
  navigate: (route: string) => void;
  topicId?: string;
}) {
  const { l, t } = useApp();
  const selected = topicId ? studyCheatSheet(topicId) : undefined;
  const [exam, setExam] = useState(
    selected?.subjectId.startsWith("ayt-") ? "AYT" : "TYT",
  );
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const query = search.trim().toLocaleLowerCase("tr-TR");
  const readyTopics = [
    ...studyTopics.filter((topic) => builtInCheatSheets.has(topic.id)),
    ...[...builtInCheatSheets.values()]
      .filter(
        (sheet) => !studyTopics.some((topic) => topic.id === sheet.topicId),
      )
      .map((sheet) => ({
        id: sheet.topicId,
        title: sheet.title,
        subjectId: sheet.subjectId,
        order: 0,
      })),
  ];
  if (selected) {
    const subject = subjects.find((s) => s.id === selected.subjectId)!;
    return (
      <>
        <button
          className="text-button back-link"
          onClick={() => navigate("/cheatsheets")}
        >
          <ArrowLeft size={17} />
          Kopya Kağıtları’na dön
        </button>
        <header className="study-heading">
          <div className="study-title">
            <span className="eyebrow">
              {subject.exam} · {l(subject.name)} · Kopya kağıdı
            </span>
            <h1>{selected.title}</h1>
          </div>
          <StudyTimer />
        </header>
        <CheatReader
          key={selected.topicId}
          sheet={selected}
          navigate={navigate}
        />
      </>
    );
  }
  return (
    <>
      <header className="page-heading">
        <div>
          <h1>Kopya Kağıtları</h1>
          <p className="small muted">{builtInCheatSheets.size} hazır kağıt</p>
        </div>
        <StudyTimer />
      </header>
      <p className="lead muted">
        Kavramlar, bağıntılar, önemli koşullar ve çözümlü örnekler. Dersini seç;
        kısa tekrarını doğrudan burada yap.
      </p>
      {topicId && (
        <p className="scope-note" role="status">
          Bu başlık için hızlı tekrar kağıdı henüz hazırlanmadı. Hazır kağıtları
          aşağıda bulabilirsin.
        </p>
      )}
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
              }}
            >
              {value}
            </button>
          ))}
        </div>
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Ders veya konu ara"
            placeholder="Ders veya konu ara"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="subject-grid cheatsheet-grid">
        {subjects
          .filter((s) => s.exam === exam)
          .map((subject) => {
            const topics = readyTopics.filter(
              (topic) => topic.subjectId === subject.id,
            );
            const matching = topics.filter(
              (topic) =>
                !query ||
                l(subject.name).toLocaleLowerCase("tr-TR").includes(query) ||
                topic.title.toLocaleLowerCase("tr-TR").includes(query),
            );
            if (!matching.length) return null;
            const expanded = open === subject.id || !!query;
            return (
              <section className="panel subject-panel" key={subject.id}>
                <button
                  className="subject-header"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : subject.id)}
                >
                  <SubjectMark id={subject.id} />
                  <span>
                    <h2>{l(subject.name)}</h2>
                    <span className="small muted">
                      {topics.length} hazır kağıt
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={expanded ? "rotated" : ""}
                  />
                </button>
                {expanded && (
                  <ul className="cheatsheet-topics subject-content">
                    {matching.map((topic) => (
                      <li key={topic.id}>
                        <button
                          className="ready-topic cheatsheet-topic"
                          onClick={() =>
                            navigate(
                              `/cheatsheets?topic=${encodeURIComponent(topic.id)}`,
                            )
                          }
                        >
                          <span>{topic.title}</span>
                          <ArrowRight size={17} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
      </div>
      {!readyTopics.some(
        (topic) =>
          topic.subjectId.startsWith(exam.toLowerCase() + "-") &&
          (!query ||
            topic.title.toLocaleLowerCase("tr-TR").includes(query) ||
            subjects
              .find((s) => s.id === topic.subjectId)!
              .name.tr.toLocaleLowerCase("tr-TR")
              .includes(query)),
      ) && <Empty text="Bu aramada hazır kopya kağıdı bulunamadı." />}
      <TacticLibrary />
      <p className="scope-note">
        Hazırlanmış içerikler listelenir. Yeni konu kağıtları içerik
        güncellemeleriyle eklenir.
      </p>
    </>
  );
}
