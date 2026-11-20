import { useState } from "react";
import type { ExamSession } from "../domain/examModel";
import {
  COMPASS_TARGETS,
  DEFAULT_COMPASS_TARGET,
  fatigueCurve,
  lostNetTable,
  netCompass,
  type CompassTarget,
} from "../domain/examInsights";
import "./examInsights.css";

const fmt = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",");

/**
 * Deneme sonucu: yorgunluk eğrisi, kayıp net otopsisi ve seçilebilir hedefli
 * net pusulası. Hedef seçimi yalnız görünüm durumudur; kaydedilmez.
 */
export function ExamInsights({ session }: { session: ExamSession }) {
  const [target, setTarget] = useState<CompassTarget>(DEFAULT_COMPASS_TARGET);
  const quarters = fatigueCurve(session);
  const compass = netCompass(session, target);
  const lost = lostNetTable(session);
  return (
    <section className="panel exam-insights" aria-label="Deneme analizi">
      <h2>Deneme analizi</h2>
      {quarters ? (
        <figure className="fatigue-curve">
          <figcaption>
            <strong>Yorgunluk eğrisi.</strong> Soru sırasına göre dört çeyrekte doğru oranı. Son çeyrekte düşüş varsa dayanıklılık, ilk
            çeyrekte düşüş varsa ısınma üzerine çalış.
          </figcaption>
          <svg viewBox="0 0 320 150" role="img" aria-label={quarters.map((q) => `${q.label} yüzde ${Math.round(q.accuracy * 100)} doğru`).join(", ")}>
            <line x1="20" y1="120" x2="310" y2="120" className="fc-axis" />
            {quarters.map((q, i) => {
              const h = q.accuracy * 100, x = 30 + i * 72;
              return (
                <g key={q.label}>
                  <rect x={x} y={120 - h} width="48" height={Math.max(1, h)} rx="3" className="fc-bar" />
                  <text x={x + 24} y={112 - h} textAnchor="middle" className="fc-value">
                    %{Math.round(h)}
                  </text>
                  <text x={x + 24} y="136" textAnchor="middle" className="fc-label">
                    {q.from}–{q.to}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="small muted">
            {quarters.map((q) => `${q.label}: ${q.correct} doğru, ${q.wrong} yanlış, ${q.blank} boş`).join(" · ")}
          </p>
        </figure>
      ) : (
        <p className="small muted">Yorgunluk eğrisi en az 12 soruluk denemelerde çizilir.</p>
      )}
      <div className="lost-net">
        <h3>Kayıp net otopsisi</h3>
        {lost.rows.length === 0 ? (
          <p className="small muted">Bu denemede yanlış ya da boş yok; kaybedilen net yok.</p>
        ) : (
          <>
            <p className="small muted">Her ders için yanlış × 1,25 + boş × 1. En çok net kaybettiren ders en üstte.</p>
            <div className="exam-table-wrap" tabIndex={0} role="region" aria-label="Kayıp net tablosu">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Ders</th>
                    <th scope="col">Yanlış</th>
                    <th scope="col">Boş</th>
                    <th scope="col">Kayıp net</th>
                  </tr>
                </thead>
                <tbody>
                  {lost.rows.map((r) => (
                    <tr key={r.subject}>
                      <th scope="row">{r.subject}</th>
                      <td>{r.wrong}</td>
                      <td>{r.blank}</td>
                      <td>{fmt(r.lost)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">Toplam</th>
                    <td>{lost.total.wrong}</td>
                    <td>{lost.total.blank}</td>
                    <td>{fmt(lost.total.lost)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="net-compass">
        <h3>+{target} Net Pusulası</h3>
        <div className="segmented compass-targets" role="group" aria-label="Hedef net">
          {COMPASS_TARGETS.map((value) => (
            <button key={value} type="button" className={value === target ? "active" : ""} aria-pressed={value === target} onClick={() => setTarget(value)}>
              +{value} net
            </button>
          ))}
        </div>
        {compass.steps.length === 0 ? (
          <p className="small muted">Bu denemede yanlış ya da boş yok; artırılacak net kalmadı.</p>
        ) : (
          <>
            <p className="small muted">
              Yanlışı doğruya çevirmek 1,25 net, boşu doğruya çevirmek 1 net kazandırır.{" "}
              {compass.reached
                ? `En kısa yol: ${compass.questions} soruyu düzeltmek +${fmt(compass.gain)} net.`
                : `Bu denemedeki bütün yanlış ve boşlar düzelse bile en çok +${fmt(compass.gain)} net kazanılır.`}
            </p>
            <ol>
              {compass.steps.map((s) => (
                <li key={s.subject}>
                  <strong>{s.subject}</strong>: {[s.wrongToFix ? `${s.wrongToFix} yanlış` : "", s.blankToFix ? `${s.blankToFix} boş` : ""].filter(Boolean).join(" + ")} → +
                  {fmt(s.gain)} net
                </li>
              ))}
            </ol>
          </>
        )}
        <p className="small muted">Bu bir alıştırma analizidir; YKS puanı ya da sıralama tahmini değildir.</p>
      </div>
    </section>
  );
}
