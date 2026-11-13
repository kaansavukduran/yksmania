import { ArrowUpRight, BookOpen, ChevronRight, Clock3 } from "lucide-react";
import { useApp } from "../store";
import { subjectById } from "../domain/content";
import type { Lesson } from "../domain/model";
export function SubjectMark({ id }: { id: string }) {
  const s = subjectById(id);
  return (
    <span
      className="subject-mark"
      style={{ "--subject": s?.color } as React.CSSProperties}
      aria-hidden="true"
    >
      {s?.icon ?? "•"}
    </span>
  );
}
export function LessonRow({
  lesson,
  onStart,
  reason,
  review = false,
}: {
  lesson: Lesson;
  onStart: () => void;
  reason?: string;
  review?: boolean;
}) {
  const { t, l } = useApp();
  const s = subjectById(lesson.subjectId)!;
  return (
    <article className="lesson-row">
      <SubjectMark id={s.id} />
      <div className="lesson-copy">
        <span className="small muted">
          {s.exam} · {l(s.name)}
        </span>
        <h3>{l(lesson.title)}</h3>
        {reason && <p className="small muted">{reason}</p>}
      </div>
      <span className="duration">
        <Clock3 size={14} />
        {review ? 10 : lesson.minutes} {t("minutes")}
      </span>
      <button
        className="icon-button start-button"
        onClick={onStart}
        aria-label={`${t(review ? "review" : "learn")}: ${l(lesson.title)}`}
      >
        <ArrowUpRight size={21} />
      </button>
    </article>
  );
}
export function Empty({ text }: { text: string }) {
  return (
    <div className="empty">
      <BookOpen size={28} strokeWidth={1.3} />
      <p>{text}</p>
    </div>
  );
}
export function SectionLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="text-button" onClick={onClick}>
      {children}
      <ChevronRight size={16} />
    </button>
  );
}
