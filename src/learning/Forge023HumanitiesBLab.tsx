import { useId } from "react";
import { useApp } from "../store";
import { useExploration } from "./useExploration";
import {
  humanitiesBDefaults023,
  forge023HumanitiesBTopics,
  youthPeopleB023,
  youthSceneB023,
  nameLabelsB023,
  nameEventLabelsB023,
  nameSceneB023,
  schoolLabelsB023,
  schoolSceneB023,
  prophetCaseLabelsB023,
  prophetSceneB023,
  conceptContextLabelsB023,
  conceptSceneB023,
  claimLabelsB023,
  beliefSceneB023,
  type SceneB023,
} from "./forge023HumanitiesB";
import "./forge023HumanitiesB.css";
function safe(value: number, max: number) {
  return Number.isInteger(value) && value >= 0 && value < max ? value : 0;
}
function lines(text: string, max = 22) {
  const rows: string[] = [];
  for (const word of text.split(" ")) {
    if (!rows.length || rows[rows.length - 1].length + word.length + 1 > max)
      rows.push(word);
    else rows[rows.length - 1] += " " + word;
  }
  return rows;
}
function Diagram({
  scene,
  kind,
  uid,
}: {
  scene: SceneB023;
  kind: number;
  uid: string;
}) {
  const positions = scene.nodes.map((_, index) => [135, 70 + index * 160]);
  const position = new Map(
    scene.nodes.map((node, i) => [node.id, positions[i]]),
  );
  return (
    <svg
      className="humanitiesB023-diagram"
      viewBox={`0 0 270 ${scene.nodes.length * 160}`}
      data-model-kind={kind}
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
      <title id={`${uid}-title`}>{scene.title}</title>
      <desc id={`${uid}-desc`}>
        {scene.summary.join(". ")} Bağların metin açıklaması aşağıdadır; kesik
        çizgi kanıt yokluğu veya uyuşmazlık gösterir.
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
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      {scene.links.map((link, i) => {
        const a = position.get(link.from)!,
          b = position.get(link.to)!;
        const adjacent = Math.abs(b[1] - a[1]) === 160;
        const down = b[1] > a[1];
        const left = i % 2 === 1;
        const edge = left ? 20 : 250;
        const channel = left ? 0 : 270;
        const path = adjacent
          ? `M135,${a[1] + (down ? 52 : -52)} L135,${b[1] + (down ? -52 : 52)}`
          : `M${edge},${a[1]} C${channel},${a[1]} ${channel},${b[1]} ${edge},${b[1]}`;
        return (
          <path
            key={`${link.from}-${link.to}-${i}`}
            d={path}
            className={
              link.valid
                ? "humanitiesB023-link"
                : "humanitiesB023-link is-unmatched"
            }
            markerEnd={`url(#${uid}-arrow)`}
          />
        );
      })}
      {scene.nodes.map((node, i) => {
        const [x, y] = positions[i],
          ls = lines(node.label, 18);
        return (
          <g key={node.id} transform={`translate(${x},${y})`}>
            <rect x="-115" y="-52" width="230" height="104" rx="16" />
            <text textAnchor="middle" dominantBaseline="middle">
              {ls.map((line, j) => (
                <tspan
                  key={`${j}-${line}`}
                  x="0"
                  y={(j - (ls.length - 1) / 2) * 24}
                >
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
export default function Forge023HumanitiesBLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const uid = useId();
  if (!Object.hasOwn(forge023HumanitiesBTopics, lessonId))
    throw new RangeError("Bu konu için atölye yok.");
  const explorationKey = `forge023-humanities-b:${lessonId}`;
  const { state } = useApp();
  const [saved, persist] = useExploration(
    explorationKey,
    humanitiesBDefaults023,
  );
  const kind = Object.keys(forge023HumanitiesBTopics).indexOf(lessonId);
  const person = safe(saved.person, 9),
    lens = safe(saved.lens, 3),
    name = safe(saved.name, 8),
    event = safe(saved.event, 8),
    school = safe(saved.school, 9),
    field = safe(saved.field, 3),
    caseIndex = safe(saved.case, 4),
    stage = safe(saved.stage, 3),
    context = safe(saved.context, 3),
    motive = safe(saved.motive, 3),
    quality = safe(saved.quality, 2),
    done = typeof saved.done === "boolean" ? saved.done : true,
    claim = safe(saved.claim, 9),
    extra = safe(saved.extra, 3);
  const canonical = {
    person,
    lens,
    name,
    event,
    school,
    field,
    case: caseIndex,
    stage,
    context,
    motive,
    quality,
    done,
    claim,
    extra,
  };
  const activeFields: (keyof typeof canonical)[] = [
    ["person", "lens"],
    ["name", "event"],
    ["school", "field"],
    ["case", "stage"],
    ["context", "motive", "quality", "done"],
    ["claim", "extra"],
  ][kind] as (keyof typeof canonical)[];
  const raw = state.explorations[explorationKey] ?? {};
  const selectionValid = activeFields.every(
    (key) =>
      (!Object.hasOwn(raw, key) ||
        typeof raw[key] === typeof humanitiesBDefaults023[key]) &&
      saved[key] === canonical[key],
  );
  const set = (patch: Parameters<typeof persist>[0]) =>
    persist({
      ...canonical,
      reason: selectionValid ? saved.reason.slice(0, 128) : "",
      show: selectionValid && saved.show,
      ...patch,
    });
  const scene =
    kind === 0
      ? youthSceneB023(person, lens)
      : kind === 1
        ? nameSceneB023(name, event)
        : kind === 2
          ? schoolSceneB023(school, field)
          : kind === 3
            ? prophetSceneB023(caseIndex, stage)
            : kind === 4
              ? conceptSceneB023(context, motive, quality, done)
              : beliefSceneB023(claim, extra);
  const reason =
      selectionValid && typeof saved.reason === "string"
        ? saved.reason.slice(0, 128)
        : "",
    show = selectionValid && saved.show === true && reason.trim().length > 0;
  const change = (patch: Parameters<typeof set>[0]) =>
    set({ ...patch, show: false, reason: "" });
  const select = (
    label: string,
    items: string[],
    value: number,
    key: keyof typeof humanitiesBDefaults023,
  ) => {
    const id = `${uid}-${key}`;
    return (
      <div className="humanitiesB023-control">
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          value={value}
          onChange={(e) => change({ [key]: Number(e.target.value) })}
        >
          {items.map((item, i) => (
            <option value={i} key={item}>
              {item}
            </option>
          ))}
        </select>
        <p>Seçili: {items[value]}</p>
      </div>
    );
  };
  return (
    <section className="humanitiesB023-lab" data-forge023={lessonId}>
      <h3>{scene.title}</h3>
      <p className="humanitiesB023-intro">
        Seçimleri değiştir, hangi kanıtın hangi ilişkiyi kurduğunu incele. Önce
        kendi açıklamanı yaz; sonra modelin gerekçesi ile kıyasla.
      </p>
      <div className="humanitiesB023-controls">
        {kind === 0 && (
          <>
            {select("İncelenen kişi", youthPeopleB023(), person, "person")}
            {select(
              "İnceleme odağı",
              ["Yapılan görev", "Olayın değer boyutu", "Yorumun sınırı"],
              lens,
              "lens",
            )}
          </>
        )}
        {kind === 1 && (
          <>
            {select("Seçili isim", nameLabelsB023(), name, "name")}
            {select(
              "Pasajın özel vurgusu",
              nameEventLabelsB023,
              event,
              "event",
            )}
          </>
        )}
        {kind === 2 && (
          <>
            {select("İncelenen ekol", schoolLabelsB023(), school, "school")}
            {select(
              "Alan filtresi",
              ["Bütün alanlar", "İtikadi", "Fıkhi"],
              field,
              "field",
            )}
          </>
        )}
        {kind === 3 && (
          <>
            {select(
              "İncelenen süreç",
              prophetCaseLabelsB023(),
              caseIndex,
              "case",
            )}
            {select(
              "İncelenen aşama",
              ["Birinci aşama", "İkinci aşama", "Üçüncü aşama"],
              stage,
              "stage",
            )}
          </>
        )}
        {kind === 4 && (
          <>
            {select(
              "Kurmaca durum",
              conceptContextLabelsB023(),
              context,
              "context",
            )}
            {select(
              "Metindeki niyet",
              [
                "Allah’ın rızası için",
                "Yalnız alkış için",
                "Niyet belirtilmemiş",
              ],
              motive,
              "motive",
            )}
            <label
              className="humanitiesB023-control"
              htmlFor={`${uid}-quality`}
            >
              İşin niteliği
              <select
                id={`${uid}-quality`}
                value={quality}
                disabled={!done}
                onChange={(e) => change({ quality: Number(e.target.value) })}
              >
                <option value="0">Bilinçli ve özenli</option>
                <option value="1">Özensiz</option>
              </select>
            </label>
            <label className="humanitiesB023-checkbox">
              <input
                type="checkbox"
                checked={done}
                onChange={(e) => change({ done: e.target.checked })}
              />
              İş gerçekten yapıldı
            </label>
          </>
        )}
        {kind === 5 && (
          <>
            {select("İncelenen iddia", claimLabelsB023(), claim, "claim")}
            {select(
              "Ek inanç cümlesi",
              ["Yeni cümle yok", "Yaratıcıya inanıyor", "Tanrı’ya inanmıyor"],
              extra,
              "extra",
            )}
          </>
        )}
      </div>
      <div className="humanitiesB023-context">
        <h4>Tam durum</h4>
        <p>{scene.context}</p>
      </div>
      <Diagram scene={scene} kind={kind} uid={uid} />
      <div className="humanitiesB023-node-list">
        {scene.nodes.map((n) => (
          <div key={n.id}>
            <strong>{n.label}</strong>
            <p>{n.detail}</p>
          </div>
        ))}
      </div>
      <label className="humanitiesB023-control" htmlFor={`${uid}-reason`}>
        İlişkiyi kendi cümlenle açıkla
        <textarea
          id={`${uid}-reason`}
          aria-describedby={`${uid}-reason-help`}
          maxLength={128}
          value={reason}
          onChange={(e) =>
            set({ reason: e.target.value.slice(0, 128), show: false })
          }
          placeholder="Hangi fiil veya önerme hangi bağı destekliyor?"
        />
      </label>
      <p id={`${uid}-reason-help`} className="small muted">
        En çok 128 karakter.
      </p>
      <div className="humanitiesB023-actions">
        <button
          type="button"
          disabled={!reason.trim()}
          onClick={() => set({ show: true })}
        >
          Kanıtla karşılaştır
        </button>
        <button
          type="button"
          onClick={() => set({ ...humanitiesBDefaults023 })}
        >
          Bu keşfi başa al
        </button>
      </div>
      <div
        className="humanitiesB023-result"
        data-model-result
        aria-live="polite"
      >
        <p>
          <strong>
            {show
              ? scene.result
              : "Önce açıklamanı yaz; değişen koşulun hangi bağı etkilediğini belirt."}
          </strong>
        </p>
        {show && (
          <>
            <p>{scene.explanation}</p>
            <ul>
              {scene.links.map((link, i) => (
                <li key={`${link.from}-${link.to}-${i}`}>
                  <strong>
                    {link.valid
                      ? "Kanıtlı ilişki"
                      : "Kanıt eksik veya uyuşmuyor"}
                    :
                  </strong>{" "}
                  {link.evidence}
                </li>
              ))}
            </ul>
            <p className="muted">
              Bu kıyas, yazdığın açıklamayı otomatik doğru saymaz. Kendi
              gerekçeni her kanıtla ayrı karşılaştır.
            </p>
          </>
        )}
      </div>
      <p className="humanitiesB023-note">
        Kurmaca metinler ve ders kavramları incelenir; kişisel inanç veya ahlaki
        değer ölçülmez. Bu keşif puan, ustalık veya konu tamamlama kaydı
        oluşturmaz.
      </p>
    </section>
  );
}
