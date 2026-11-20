import { foundationLessons } from "../learning/foundations";

/*
 * Önkoşul köprüsü: bir hatanın altında yatan temel beceri için Temel İnşa ön
 * dersleri. Önce bu konuyu doğrudan hazırlayan ön dersler; yoksa (ör. AYT)
 * dersin TYT karşılığının ön dersleri önerilir. Yalnız yönlendirir, kayıt
 * oluşturmaz.
 */
const AYT_TO_TYT: Record<string, string> = {
  "ayt-matematik": "tyt-matematik",
  "ayt-geometri": "tyt-geometri",
  "ayt-fizik": "tyt-fizik",
  "ayt-kimya": "tyt-kimya",
  "ayt-biyoloji": "tyt-biyoloji",
};

export function bridgeFoundations(lessonId: string, subjectId: string) {
  const direct = foundationLessons.filter((f) => f.prepares.includes(lessonId));
  if (direct.length) return { kind: "direct" as const, list: direct.slice(0, 3) };
  const base = AYT_TO_TYT[subjectId] ?? subjectId;
  return { kind: subjectId.startsWith("ayt-") ? ("ayt" as const) : ("subject" as const), list: foundationLessons.filter((f) => f.subjectId === base).slice(0, 3) };
}

export function MistakeBridge({ lessonId, subjectId, navigate }: { lessonId: string; subjectId: string; navigate: (r: string) => void }) {
  const { kind, list } = bridgeFoundations(lessonId, subjectId);
  if (!list.length) return null;
  return (
    <div className="mistake-bridge">
      <p className="small muted">
        {kind === "direct"
          ? "Önkoşul köprüsü: bu konuyu hazırlayan Temel İnşa ön dersleri"
          : kind === "ayt"
            ? "AYT → TYT önkoşul köprüsü: temeli tazelemek için TYT ön dersleri"
            : "Önkoşul köprüsü: bu dersin Temel İnşa ön dersleri"}
      </p>
      <div className="mistake-bridge-links">
        {list.map((f) => (
          <button type="button" key={f.id} className="mistake-bridge-link" onClick={() => navigate(`/foundations?id=${f.id}`)}>
            {f.title}
          </button>
        ))}
      </div>
    </div>
  );
}
