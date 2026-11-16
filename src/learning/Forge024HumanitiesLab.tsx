import { useId } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  forge024HumanitiesTopics,
  humanitiesDefaults024,
  worldStories024,
  worldFocusLabels024,
  worldEvidence024,
  traditionLabels024,
  categoryLabels024,
  traditionItemLabels024,
  religionEvidence024,
  institutionLabels024,
  scienceFlow024,
  anatoliaPersonLabels024,
  anatoliaClaimLabels024,
  anatoliaRecordLabels024,
  anatoliaEvidence024,
  type HumanitiesScene024,
} from "./forge024Humanities";
import "./forge024Humanities.css";
function modelText(text: string) {
  if (!text.includes("Sulucakarahöyük")) return text;
  return text.split(/(Sulucakarahöyük)/).map((part, i) =>
    part === "Sulucakarahöyük" ? (
      <span key={i} aria-label="Sulucakarahöyük">
        Suluca&shy;karahöyük
      </span>
    ) : (
      part
    ),
  );
}
function index(value: unknown, max: number) {
  return typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value < max
    ? value
    : 0;
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
  scene: HumanitiesScene024;
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
      className="humanities024-diagram"
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
            className={`humanities024-link${l.valid ? "" : " is-missing"}`}
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
export default function Forge024HumanitiesLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const uid = useId();
  if (!Object.hasOwn(forge024HumanitiesTopics, lessonId))
    throw new RangeError("Bu konu için keşif bulunamadı.");
  const storageKey = `forge024-humanities:${lessonId}`;
  const { state } = useApp();
  const raw = state.explorations[storageKey] ?? {};
  const [saved, save] = useExploration(storageKey, humanitiesDefaults024);
  const kind = Object.keys(forge024HumanitiesTopics).indexOf(lessonId);
  const worldStory = index(saved.worldStory, 5),
    worldFocus = index(saved.worldFocus, 3),
    worldDetail = saved.worldDetail === true,
    item = index(saved.item, 18),
    tradition = index(saved.tradition, 3),
    category = index(saved.category, 7),
    translation =
      typeof saved.translation === "boolean" ? saved.translation : true,
    observation = saved.observation === true,
    revision = saved.revision === true,
    institution = index(saved.institution, 4),
    person = index(saved.person, 12),
    claim = index(saved.claim, 3),
    record = index(saved.record, 3);
  const scene =
    kind === 0
      ? worldEvidence024(worldStory, worldFocus, worldDetail)
      : kind === 1
        ? religionEvidence024(item, tradition, category)
        : kind === 2
          ? scienceFlow024(translation, observation, revision, institution)
          : anatoliaEvidence024(person, claim, record);
  const rawFields: readonly (keyof typeof humanitiesDefaults024)[] =
    kind === 0
      ? ["worldStory", "worldFocus", "worldDetail"]
      : kind === 1
        ? ["item", "tradition", "category"]
        : kind === 2
          ? ["translation", "observation", "revision", "institution"]
          : ["person", "claim", "record"];
  const rawTypesValid = rawFields.every(
    (key) =>
      !Object.hasOwn(raw, key) ||
      typeof raw[key] === typeof humanitiesDefaults024[key],
  );
  const selectionValid =
    rawTypesValid &&
    (kind === 0
      ? saved.worldStory === worldStory &&
        saved.worldFocus === worldFocus &&
        typeof saved.worldDetail === "boolean"
      : kind === 1
        ? saved.item === item &&
          saved.tradition === tradition &&
          saved.category === category
        : kind === 2
          ? saved.institution === institution &&
            typeof saved.translation === "boolean" &&
            typeof saved.observation === "boolean" &&
            typeof saved.revision === "boolean"
          : saved.person === person &&
            saved.claim === claim &&
            saved.record === record);
  const reason =
      selectionValid && typeof saved.reason === "string"
        ? saved.reason.slice(0, 120)
        : "",
    reveal = saved.reveal === true && reason.trim().length > 0;
  const set = (patch: Parameters<typeof save>[0]) =>
    save({
      worldStory,
      worldFocus,
      worldDetail,
      item,
      tradition,
      category,
      translation,
      observation,
      revision,
      institution,
      person,
      claim,
      record,
      ...patch,
      reason:
        typeof patch.reason === "string" ? patch.reason.slice(0, 120) : reason,
    });
  const change = (patch: Parameters<typeof set>[0]) =>
    set({ ...patch, reason: "", reveal: false });
  const select = (
    label: string,
    items: readonly string[],
    value: number,
    key: keyof typeof humanitiesDefaults024,
  ) => {
    const id = `${uid}-${key}`;
    return (
      <label className="humanities024-control" htmlFor={id}>
        {label}
        <select
          id={id}
          value={value}
          onChange={(e) => change({ [key]: Number(e.target.value) })}
        >
          {items.map((s, i) => (
            <option key={s} value={i}>
              {s}
            </option>
          ))}
        </select>
      </label>
    );
  };
  const toggle = (
    label: string,
    value: boolean,
    key: keyof typeof humanitiesDefaults024,
  ) => (
    <label className="humanities024-toggle">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => change({ [key]: e.target.checked })}
      />
      {label}
    </label>
  );
  return (
    <section className="humanities024-lab" data-forge024={lessonId}>
      <h3>{scene.title}</h3>
      <p>
        Koşulları değiştir; hangi sonucun hangi veriye dayandığını incele.
        İlişkiyi kendi cümlenle açıkla ve gerekçeni model metniyle kıyasla.
      </p>
      <div className="humanities024-controls">
        {kind === 0 && (
          <>
            {select(
              "İncelenen anlatım",
              worldStories024,
              worldStory,
              "worldStory",
            )}
            {select(
              "Sorulan boyut",
              worldFocusLabels024,
              worldFocus,
              "worldFocus",
            )}
            {toggle("Ek ayrıntı metne eklendi", worldDetail, "worldDetail")}
          </>
        )}
        {kind === 1 && (
          <>
            {select("Kavram kartı", traditionItemLabels024(), item, "item")}
            {select(
              "Gelenek çerçevesi",
              traditionLabels024,
              tradition,
              "tradition",
            )}
            {select("Kavram türü", categoryLabels024, category, "category")}
          </>
        )}
        {kind === 2 && (
          <>
            {select(
              "Gök gözlemi için kurum adayı",
              institutionLabels024,
              institution,
              "institution",
            )}
            {toggle("Çeviri kaydı var", translation, "translation")}
            {toggle("Yeni gözlem kaydı var", observation, "observation")}
            {toggle("Cetvel düzeltmesi söyleniyor", revision, "revision")}
          </>
        )}
        {kind === 3 && (
          <>
            {select(
              "Temel şahsiyet kartı",
              anatoliaPersonLabels024(),
              person,
              "person",
            )}
            {select("İncelenen ilişki", anatoliaClaimLabels024, claim, "claim")}
            {select(
              "Kurmaca ek kayıt",
              anatoliaRecordLabels024,
              record,
              "record",
            )}
          </>
        )}
      </div>
      <div className="humanities024-context">
        <h4>Tam veri</h4>
        <p>{modelText(scene.context)}</p>
      </div>
      <EvidenceDiagram scene={scene} uid={uid} />
      <dl className="humanities024-evidence">
        {scene.nodes.map((n) => (
          <div key={n.id}>
            <dt>{n.label}</dt>
            <dd>{modelText(n.detail)}</dd>
          </div>
        ))}
      </dl>
      <label className="humanities024-control" htmlFor={`${uid}-reason`}>
        Gerekçen
        <textarea
          id={`${uid}-reason`}
          maxLength={120}
          value={reason}
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 120), reveal: false })
          }
          placeholder="Hangi veri bu ilişkiyi destekliyor? Hangi bilgi eksik?"
        />
      </label>
      <div className="humanities024-actions">
        <button
          type="button"
          disabled={!reason.trim()}
          onClick={() => set({ reveal: true })}
        >
          Gerekçemle karşılaştır
        </button>
        <button type="button" onClick={() => set({ ...humanitiesDefaults024 })}>
          Bu keşfi başa al
        </button>
      </div>
      <div
        className="humanities024-result"
        data-model-result
        aria-live="polite"
      >
        <strong>
          {reveal
            ? scene.result
            : "Önce gerekçeni yaz; sonra kanıtla karşılaştır."}
        </strong>
        {reveal && (
          <>
            <p>{scene.explanation}</p>
            <ul>
              {scene.links.map((l) => (
                <li key={`${l.from}-${l.to}`}>
                  <strong>
                    {l.valid ? "Kanıtlı ilişki" : "Kanıt eksik veya uyuşmuyor"}:
                  </strong>{" "}
                  {l.evidence}
                </li>
              ))}
            </ul>
            <p>
              Bu kıyas, yazdığın açıklamayı otomatik doğru saymaz. Her bağı
              kendi gerekçenle denetle.
            </p>
          </>
        )}
      </div>
      <p className="humanities024-note">
        Dinî ve tarihî kavramlar öğrenilir; kişisel inanç veya nihai dinî sonuç
        ölçülmez. Keşif kullanımı puan, ustalık ya da konuyu bitirme kaydı
        oluşturmaz.
      </p>
    </section>
  );
}
