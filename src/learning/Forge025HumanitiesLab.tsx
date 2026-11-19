import { useId } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  forge025HumanitiesTopics,
  humanitiesDefaults025,
  tasavvufTargets025,
  tasavvufRecordLabels025,
  tasavvufEvidence025,
  conditionCaseLabels025,
  conditionStatusLabels025,
  conditionClaimLabels025,
  conditionNames025,
  conditionEvidence025,
  eastClueLabels025,
  eastEvidence025,
  type HumanitiesScene025,
} from "./forge025Humanities";
import "./forge025Humanities.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const displayCopy025 = [
  ["Sağlanmadığı", "Yerine gelmediği"],
  ["sağlanmadığı", "yerine gelmediği"],
  ["sağlanmamış", "yerine gelmemiş"],
  [
    "sağlandı veya sağlanmadı diye tamamlanamaz",
    "sağlandı ya da sağlanmadı diye ek hüküm kurulamaz",
  ],
  [
    "Yazılmayanı sağlanmış kabul edemeyiz",
    "Kayıt yoksa koşulu sağlanmış sayamayız",
  ],
  ["Değiştirmeme", "Aynı tutma"],
  ["değiştirilmemesine", "aynen kalmasına"],
  ["doğruluğunu", "doğru olmasını"],
  ["yapılmasına", "verilmesine"],
  ["değerlendirilmeli", "ele alınmalı"],
  ["birleştirilmez", "tek veri sayılmaz"],
  ["birleştirilmesi", "tek veri sayılması"],
  ["karşılaştırması", "kıyaslaması"],
  ["birlikte sınıflandırılmak istenen", "birlikte ele alınan"],
  ["sınıflandırma", "tasnif"],
  [
    "ren ve li Konfüçyan ahlak kavramlarıdır",
    "ren ve li, Konfüçyan ahlakta iki kavramdır",
  ],
  ["yaklaşımıyla", "anlayışı ile"],
  ["anlayışlarıyla", "anlayışları ile"],
  [
    "karma Hinduizm ve Budizmle ilişkilendirilir",
    "karmanın Hinduizm ve Budizmle bağı vardır",
  ],
  ["varsayılmaz", "kesin sayılmaz"],
  ["belirtilmiyor", "verilmiyor"],
  ["söylenmiyor", "verilmiyor"],
  ["verilmemiştir", "yok"],
  ["araştırılabilir", "araştırma gerektirir"],
  ["biçimindedir", "şeklindedir"],
  ["geleneğinde", "geleneği içinde"],
  ["rehberliğiyle", "yol göstermesi ile"],
  ["dede yönetiminde", "dedenin idaresiyle"],
  ["tekrarlanması", "tekrarı"],
  ["bulunmadığı", "yer almadığı"],
  ["aranan türü tamamlamaz", "aranan tür için yetmez"],
  ["farklı dosyalara ait olduğundan", "farklı dosyalara ait olduğu için"],
] as const;
function visibleText025(value: string) {
  let text = value;
  for (const [before, after] of displayCopy025)
    text = text.replaceAll(before, after);
  return text
    .split(/(Konfüçyanizm|Konuşmalar|Alevi-Bektaşi)/)
    .map((part, i) => {
      const split =
        part === "Konfüçyanizm"
          ? "Konfüçya\u00adnizm"
          : part === "Konuşmalar"
            ? "Konuş\u00admalar"
            : part === "Alevi-Bektaşi"
              ? "Alevi-\u200bBektaşi"
              : null;
      return split ? (
        <span key={i} aria-label={part}>
          {split}
        </span>
      ) : (
        part
      );
    });
}
function index(value: unknown, max: number, fallback = 0) {
  return typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value < max
    ? value
    : fallback;
}
function wrapped(text: string) {
  const rows: string[] = [];
  for (const word of text.split(" ")) {
    if (!rows.length || rows[rows.length - 1].length + word.length + 1 > 18)
      rows.push(word);
    else rows[rows.length - 1] += " " + word;
  }
  return rows;
}
function EvidenceDiagram({
  scene,
  uid,
}: {
  scene: HumanitiesScene025;
  uid: string;
}) {
  let cursor = 20;
  const boxes = scene.nodes.map((node) => {
    const lines = wrapped(node.label),
      height = Math.max(104, lines.length * 26 + 30),
      y = cursor + height / 2;
    cursor += height + 50;
    return { node, lines, height, y };
  });
  const byId = new Map(boxes.map((b) => [b.node.id, b]));
  return (
    <svg
      className="humanities025-diagram"
      viewBox={`0 0 270 ${cursor - 30}`}
      role="img"
      aria-labelledby={`${uid}-diagram-title ${uid}-diagram-desc`}
      data-evidence-diagram
    >
      <title id={`${uid}-diagram-title`}>{scene.title}</title>
      <desc id={`${uid}-diagram-desc`}>
        Düğümler verilen bilgi ve sonuç ilişkilerini gösterir. Düz ok kanıtlı
        ilişkiyi, kesik ok eksik veya uyuşmayan ilişkiyi belirtir. Her ilişkinin
        tam açıklaması metinde de bulunur.
      </desc>
      <defs>
        <marker
          id={`${uid}-arrow`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
        </marker>
      </defs>
      {scene.links.map((l, i) => {
        const a = byId.get(l.from)!,
          b = byId.get(l.to)!,
          ai = boxes.indexOf(a),
          bi = boxes.indexOf(b),
          down = b.y > a.y;
        const path =
          Math.abs(ai - bi) === 1
            ? `M135,${a.y + (down ? a.height / 2 : -a.height / 2)} L135,${b.y + (down ? -b.height / 2 : b.height / 2)}`
            : `M${i % 2 ? 20 : 250},${a.y} C${i % 2 ? 0 : 270},${a.y} ${i % 2 ? 0 : 270},${b.y} ${i % 2 ? 20 : 250},${b.y}`;
        return (
          <path
            key={`${l.from}-${l.to}`}
            d={path}
            markerEnd={`url(#${uid}-arrow)`}
            className={`humanities025-link${l.valid ? "" : " is-missing"}`}
          />
        );
      })}
      {boxes.map(({ node, lines, height, y }) => (
        <g key={node.id} transform={`translate(135 ${y})`}>
          <rect x="-115" y={-height / 2} width="230" height={height} rx="12" />
          <text textAnchor="middle" dominantBaseline="middle">
            {lines.map((line, i) => (
              <tspan
                key={`${i}-${line}`}
                x="0"
                y={(i - (lines.length - 1) / 2) * 26}
              >
                {line}
              </tspan>
            ))}
          </text>
        </g>
      ))}
    </svg>
  );
}
export default function Forge025HumanitiesLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const uid = useId();
  if (!Object.hasOwn(forge025HumanitiesTopics, lessonId))
    throw new RangeError("Bu konu için keşif bulunamadı.");
  const storageKey = `forge025-humanities:${lessonId}`;
  const { state } = useApp();
  const raw = state.explorations[storageKey] ?? {};
  const [saved, save] = useExploration(storageKey, humanitiesDefaults025);
  const kind = Object.keys(forge025HumanitiesTopics).indexOf(lessonId);
  const record = index(saved.record, 6),
    target = index(saved.target, 4),
    detail = saved.detail === true,
    caseIndex = index(saved.case, 6),
    first = index(saved.first, 3),
    second = index(saved.second, 3),
    third = index(saved.third, 3),
    claim = index(saved.claim, 3),
    evidenceA = index(saved.evidenceA, 12),
    evidenceB = index(saved.evidenceB, 12, 1),
    sameRecord =
      typeof saved.sameRecord === "boolean" ? saved.sameRecord : true;
  const rawFields: readonly (keyof typeof humanitiesDefaults025)[] =
    kind === 0
      ? ["record", "target", "detail"]
      : kind === 1
        ? ["case", "first", "second", "third", "claim"]
        : ["evidenceA", "evidenceB", "sameRecord"];
  const rawTypesValid = rawFields.every(
    (key) =>
      !Object.hasOwn(raw, key) ||
      typeof raw[key] === typeof humanitiesDefaults025[key],
  );
  const selectionValid =
    rawTypesValid &&
    (kind === 0
      ? saved.record === record &&
        saved.target === target &&
        typeof saved.detail === "boolean"
      : kind === 1
        ? saved.case === caseIndex &&
          saved.first === first &&
          saved.second === second &&
          saved.third === third &&
          saved.claim === claim
        : saved.evidenceA === evidenceA &&
          saved.evidenceB === evidenceB &&
          typeof saved.sameRecord === "boolean");
  const reason =
      selectionValid && typeof saved.reason === "string"
        ? saved.reason.slice(0, 120)
        : "",
    reveal = saved.reveal === true && reason.trim().length > 0;
  const scene =
    kind === 0
      ? tasavvufEvidence025(record, target, detail)
      : kind === 1
        ? conditionEvidence025(caseIndex, first, second, third, claim)
        : eastEvidence025(evidenceA, evidenceB, sameRecord);
  const set = (patch: Parameters<typeof save>[0]) =>
    save({
      record,
      target,
      detail,
      case: caseIndex,
      first,
      second,
      third,
      claim,
      evidenceA,
      evidenceB,
      sameRecord,
      ...patch,
      reason:
        typeof patch.reason === "string" ? patch.reason.slice(0, 120) : reason,
    });
  const change = (patch: Parameters<typeof save>[0]) =>
    set({ ...patch, reason: "", reveal: false });
  const select = (
    label: string,
    items: readonly string[],
    value: number,
    key: keyof typeof humanitiesDefaults025,
  ) => {
    const id = `${uid}-${key}`;
    return (
      <label className="humanities025-control" htmlFor={id}>
        {visibleText025(label)}
        <ChoiceSelect
          id={id}
          value={value}
          onChange={(e) => change({ [key]: Number(e.target.value) })}
        >
          {items.map((s, i) => (
            <option key={s} value={i}>
              {s}
            </option>
          ))}
        </ChoiceSelect>
      </label>
    );
  };
  const toggle = (
    label: string,
    value: boolean,
    key: "detail" | "sameRecord",
  ) => {
    const id = `${uid}-${key}`;
    return (
      <label className="humanities025-toggle" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={value}
          onChange={(e) => change({ [key]: e.target.checked })}
        />
        {visibleText025(label)}
      </label>
    );
  };
  const names = conditionNames025(caseIndex);
  return (
    <section
      className="humanities025-lab"
      data-forge025={lessonId}
      aria-labelledby={`${uid}-title`}
    >
      <h3 id={`${uid}-title`}>{visibleText025(scene.title)}</h3>
      <p>
        Veriyi değiştir, ek bilgiyi gör ve gerekçeni yaz. Eksik kaydı var ya da
        yok diye kesin sayma.
      </p>
      <div className="humanities025-controls">
        {kind === 0 && (
          <>
            {select("Olay kaydı", tasavvufRecordLabels025, record, "record")}
            {select("Aranan bilgi türü", tasavvufTargets025, target, "target")}
            {toggle("Aynı olaya ait ek kayıt var", detail, "detail")}
          </>
        )}
        {kind === 1 && (
          <>
            {select("Koşul dosyası", conditionCaseLabels025, caseIndex, "case")}
            {select(
              `Birinci koşul: ${names[0]}`,
              conditionStatusLabels025,
              first,
              "first",
            )}
            {select(
              `İkinci koşul: ${names[1]}`,
              conditionStatusLabels025,
              second,
              "second",
            )}
            {select(
              `Üçüncü koşul: ${names[2]}`,
              conditionStatusLabels025,
              third,
              "third",
            )}
            {select("İncelenen iddia", conditionClaimLabels025, claim, "claim")}
          </>
        )}
        {kind === 2 && (
          <>
            {select("A ipucu", eastClueLabels025, evidenceA, "evidenceA")}
            {select("B ipucu", eastClueLabels025, evidenceB, "evidenceB")}
            {toggle("İpuçları aynı dosyaya ait", sameRecord, "sameRecord")}
          </>
        )}
      </div>
      <p className="humanities025-context">{visibleText025(scene.context)}</p>
      <EvidenceDiagram scene={scene} uid={uid} />
      <dl className="humanities025-evidence">
        {scene.nodes.map((n) => (
          <div key={n.id}>
            <dt>{visibleText025(n.label)}</dt>
            <dd>{visibleText025(n.detail)}</dd>
          </div>
        ))}
      </dl>
      <label className="humanities025-control" htmlFor={`${uid}-reason`}>
        Gerekçen
        <textarea
          id={`${uid}-reason`}
          maxLength={120}
          value={reason}
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 120), reveal: false })
          }
          placeholder="Hangi kayıt iddiayı destekliyor? Hangi bilgi eksik?"
        />
      </label>
      <div className="humanities025-actions">
        <button
          type="button"
          disabled={!reason.trim()}
          onClick={() => set({ reveal: true })}
        >
          Gerekçemle karşılaştır
        </button>
        <button type="button" onClick={() => set({ ...humanitiesDefaults025 })}>
          Bu keşfi başa al
        </button>
      </div>
      <div
        className="humanities025-result"
        data-model-result
        aria-live="polite"
      >
        <strong>
          {reveal
            ? visibleText025(scene.result)
            : "Önce gerekçeni yaz; sonra kanıtla karşılaştır."}
        </strong>
        {reveal && (
          <>
            <p>{visibleText025(scene.explanation)}</p>
            <ul>
              {scene.links.map((l, i) => (
                <li key={`${l.from}-${l.to}-${i}`}>
                  {visibleText025(l.evidence)}
                </li>
              ))}
            </ul>
            <p>Bu kıyas, gerekçeni otomatik doğru saymaz.</p>
          </>
        )}
      </div>
    </section>
  );
}
