import { useMemo } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { osymRows } from "../learning/osym";
import curriculum from "../data/curriculum.json";
import { subjects } from "../domain/content";
import { osymDistribution } from "../domain/examDistribution";
import type { ExamSpec } from "../domain/exams";
import "./examDistribution.css";

const headings = curriculum as { id: string; title: string }[];

/**
 * Gerçek ÖSYM kitapçıklarında ders başına soru sayısı ve en sık başlıklar,
 * hazır karma denemenin ders dağılımıyla yan yana. Yalnız görünüm; kayıt yok.
 */
export function ExamDistribution({
  exam,
  onExam,
  mock,
}: {
  exam: "TYT" | "AYT";
  onExam: (exam: "TYT" | "AYT") => void;
  mock?: ExamSpec;
}) {
  const data = useMemo(
    () =>
      osymDistribution(
        osymRows,
        exam,
        subjects.map((s) => ({ id: s.id, name: s.name.tr })),
        headings,
        mock?.items,
      ),
    [exam, mock],
  );
  return (
    <section className="panel exam-distribution" aria-labelledby="exam-distribution-title">
      <h2 id="exam-distribution-title">Gerçek sınavda dağılım</h2>
      <div className="segmented exam-distribution-tabs" role="group" aria-label="Dağılımı gösterilen sınav">
        {(["TYT", "AYT"] as const).map((value) => (
          <button
            key={value}
            className={exam === value ? "active" : ""}
            aria-pressed={exam === value}
            onClick={() => onExam(value)}
          >
            {value === "AYT" ? "AYT Sayısal" : "TYT"}
          </button>
        ))}
      </div>
      {!data ? (
        <p className="muted">Bu sınav için işlenmiş ÖSYM kitapçığı yok.</p>
      ) : (
        <>
          <p className="small muted">
            {data.first}–{data.last} arasında işlenen {data.years.length} ÖSYM kitapçığından sayıldı. Her
            derste yıllık en az–en çok soru, {data.last} sayısı ve en çok soru gelen üç resmî başlık
            (bu yılların toplamı) yer alır.
            {mock && ` Yanında hazır "${mock.title}" içindeki soru sayısı var.`}
          </p>
          <ul className="exam-distribution-list">
            {data.rows.map((row) => (
              <li key={row.subjectId} className="exam-distribution-row">
                <h3>{row.name}</h3>
                <dl>
                  <div>
                    <dt>Gerçek sınavda</dt>
                    <dd>
                      {row.min === row.max ? `${row.min} soru` : `${row.min}–${row.max} soru`}
                      <span className="muted"> · {data.last}: {row.latest}</span>
                    </dd>
                  </div>
                  {row.mock !== undefined && (
                    <div className={row.differs ? "exam-distribution-differs" : undefined}>
                      <dt>Bu deneme</dt>
                      <dd>
                        {row.differs ? (
                          <CircleAlert size={16} aria-hidden="true" />
                        ) : (
                          <CircleCheck size={16} aria-hidden="true" />
                        )}
                        {row.mock} soru · {row.differs ? "resmî aralığın dışında" : "resmî aralıkta"}
                      </dd>
                    </div>
                  )}
                </dl>
                {row.top.length > 0 && (
                  <>
                    <p className="exam-distribution-top-label">En çok soru gelen başlıklar</p>
                    <ol className="exam-distribution-top">
                      {row.top.map((heading) => (
                        <li key={heading.id}>
                          <span>{heading.title}</span>
                          <span className="muted">{heading.count} soru</span>
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </li>
            ))}
          </ul>
          <p className="exam-distribution-total">
            {data.last} toplamı: {data.totalLatest} soru
            {data.totalMock !== undefined && ` · bu deneme: ${data.totalMock} soru`}
            {data.altLatest > 0 &&
              `. Din Kültürü yerine cevaplanabilen ${data.altLatest} felsefe sorusu bu sayıya eklenmedi.`}
          </p>
          {mock && (
            <p className="exam-distribution-note" role="note">
              Bu deneme resmî dağılımın birebir kopyası değildir.{" "}
              {data.differs
                ? `Soru sayısı resmî aralığın dışında kalan dersler: ${data.rows
                    .filter((r) => r.differs)
                    .map((r) => r.name)
                    .join(", ")}.`
                : "Ders başına soru sayıları resmî aralıklarda; başlıkların dağılımı yine de resmî kitapçıklarla aynı değildir."}
              {!mock.fullLength && " Bu kısa alıştırma tam sınav dağılımına ulaşmaz."}
              {" "}Matematik ile geometri tek 40 soruluk havuzdan seçildiği için ikisinin payı her başlatmada
              değişebilir.
            </p>
          )}
        </>
      )}
    </section>
  );
}
