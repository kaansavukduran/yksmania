import type { ReactNode } from "react";
import { diffText, formatReportNumber, type WeeklyReport } from "../domain/weeklyReport";
import { formatDate } from "../domain/scheduler";
import "./weeklyReport.css";

/**
 * Haftalık YKS karnesi. Shown open on Sunday, folded on other days and not at
 * all without data for this week. It only summarises saved evidence.
 */
export function WeeklyReportCard({
  report,
  subjectName,
}: {
  report: WeeklyReport;
  subjectName: (id: string) => string;
}) {
  const { current: c, previous: p, sunday } = report;
  const range = `${formatDate(c.start, "tr")} – ${formatDate(c.end, "tr")}`;
  const count = (label: string, now: number, before: number) => (
    <Row label={label} value={formatReportNumber(now)} diff={diffText(now, before)} />
  );
  const body = (
    <dl className="weekly-report-grid">
      {count("Yardımsız doğru", c.independentCorrect, p.independentCorrect)}
      {count("Yanlış", c.wrong, p.wrong)}
      {count("Yardımla çözülen", c.assistedSolved, p.assistedSolved)}
      {count("Yapılan tekrar (3/7/21)", c.reviews, p.reviews)}
      {count("Tamamlanan deneme", c.exams, p.exams)}
      <Row
        label="En iyi deneme neti"
        value={c.bestExamNet === null ? "Deneme yok" : formatReportNumber(c.bestExamNet)}
        diff={c.bestExamNet !== null && p.bestExamNet !== null ? diffText(c.bestExamNet, p.bestExamNet) : undefined}
      />
      <Row
        label="En çok net kaybettiren ders"
        value={
          c.topLossSubject
            ? `${subjectName(c.topLossSubject.subjectId)} (${formatReportNumber(c.topLossSubject.netLoss)} net)`
            : "Yanlış yok"
        }
      />
    </dl>
  );
  const note = <p className="small muted">Yalnız kayıtlı cevaplardan özet. Puan, XP ya da kupa vermez.</p>;
  if (sunday)
    return (
      <section className="panel weekly-report weekly-report-sunday" aria-labelledby="weekly-report-heading">
        <div className="section-heading">
          <h2 id="weekly-report-heading">Haftanın karnesi</h2>
          <span className="small muted">{range}</span>
        </div>
        {body}
        {note}
      </section>
    );
  return (
    <details className="panel weekly-report">
      <summary>
        <span className="weekly-report-title">Bu hafta şimdiye kadar</span>
        <span className="small muted">{range}</span>
      </summary>
      {body}
      {note}
    </details>
  );
}

function Row({ label, value, diff }: { label: string; value: ReactNode; diff?: string }) {
  return (
    <div className="weekly-report-row">
      <dt>{label}</dt>
      <dd>
        <strong>{value}</strong>
        {diff && <span className="small muted">{diff}</span>}
      </dd>
    </div>
  );
}
