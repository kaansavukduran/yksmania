import { useId, type ReactNode } from "react";
import { ModelNumber } from "./ModelNumber";
import { useExploration } from "./useExploration";
import {
  opticalImage,
  opticalRays,
  lensPower,
  snellState,
  filterChannels,
  reflectedChannels,
  rgbName,
  prismState,
  channelMasks,
  type Point,
  type OpticalRay,
  type LensShape,
  type RGB,
  type MaskName,
} from "./forge014Physics";
import "./forge014Physics.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
import {
  placeLabels,
  textWidth,
  type Anchor,
  type Seg,
} from "./sectionFigures/labelPlacement";
const fmt = (v: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(v) < 1e-8 ? 0 : v,
  );
const clamp = (v: number, min: number, max: number, fallback: number) =>
  Number.isFinite(v) ? Math.max(min, Math.min(max, Math.round(v))) : fallback;
const key = (id: string) => `forge014-physics-${id}`;
type PredictionValue = { guess: string; reason: string; checked: boolean };
function Comparison({
  uid,
  question,
  choices,
  expected,
  values,
  onChange,
  children,
}: {
  uid: string;
  question: string;
  choices: string[];
  expected: string;
  values: PredictionValue;
  onChange: (v: Partial<PredictionValue>) => void;
  children: ReactNode;
}) {
  return (
    <fieldset className="physics014-comparison">
      <legend>{question}</legend>
      <div className="physics014-guesses">
        {choices.map((choice) => (
          <label key={choice}>
            <input
              type="radio"
              name={`${uid}-guess`}
              checked={values.guess === choice}
              value={choice}
              onChange={() => onChange({ guess: choice, checked: false })}
            />
            {choice}
          </label>
        ))}
      </div>
      <label htmlFor={`${uid}-reason`}>Modelden gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        rows={3}
        maxLength={120}
        value={values.reason.slice(0, 120)}
        onChange={(e) =>
          onChange({ reason: e.target.value.slice(0, 120), checked: false })
        }
        placeholder="Hangi büyüklüğü sabit tuttun, hangisini değiştirdin?"
      />
      <button
        type="button"
        className="secondary"
        disabled={!choices.includes(values.guess) || !values.reason.trim()}
        onClick={() => onChange({ checked: true })}
      >
        Tahminimi kanıtla karşılaştır
      </button>
      {values.checked && choices.includes(values.guess) && (
        <div className="physics014-feedback" role="status">
          <strong>
            {values.guess === expected
              ? "Tahminin verilen koşullarla uyumlu."
              : "Tahminini modelin koşullarıyla yeniden karşılaştır."}
          </strong>
          {children}
          <p>Gerekçen: {values.reason}</p>
          <p className="small muted">
            Gerekçen otomatik puanlanmaz; açıklamayla karşılaştırarak denetle.
          </p>
        </div>
      )}
    </fieldset>
  );
}
function Frame({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section data-forge014={id} className="physics014-lab">
      <h3>{title}</h3>
      <p>{intro}</p>
      {children}
      <p className="small muted">
        Bu görsel keşif ayrı kaydedilir; bağımsız doğru cevap, XP veya konu
        tamamlanması sayılmaz.
      </p>
    </section>
  );
}
function RayImage({
  device,
  focal,
  u,
  neutral = false,
  lensShape = "convex",
}: {
  device: "mirror" | "lens";
  focal: number;
  u: number;
  neutral?: boolean;
  lensShape?: LensShape;
}) {
  const uid = useId(),
    rays = opticalRays(device, focal, u),
    image = neutral ? null : rays.imagePoint;
  const sx =
      280 / Math.max(u, Math.abs(image?.x ?? 0), Math.abs(focal) * 2, 10),
    sy = 100 / Math.max(1, Math.abs(image?.y ?? 0)),
    px = (x: number) => 350 + x * sx,
    py = (y: number) => 170 - y * sy;
  const end = (ray: OpticalRay) => {
    const ts: number[] = [];
    if (ray.direction.x !== 0)
      ts.push(
        ((ray.direction.x > 0 ? 320 / sx : -320 / sx) - ray.start.x) /
          ray.direction.x,
      );
    if (ray.direction.y !== 0)
      ts.push(
        ((ray.direction.y > 0 ? 140 / sy : -140 / sy) - ray.start.y) /
          ray.direction.y,
      );
    const t = Math.min(...ts.filter((t) => t > 0));
    return {
      x: ray.start.x + t * ray.direction.x,
      y: ray.start.y + t * ray.direction.y,
    };
  };
  const parallel = neutral
      ? { start: { x: 0, y: 1 }, direction: { x: 1, y: 0 } }
      : rays.parallel,
    central = rays.central;
  const path = (a: Point, b: Point) =>
    `M${px(a.x)} ${py(a.y)}L${px(b.x)} ${py(b.y)}`;
  const focusPositions = neutral
    ? []
    : device === "mirror"
      ? [-focal]
      : [-focal, focal];
  // Labels avoid every ray, arrow and tick: each tries a few spots around
  // its mark and takes the first one clear of strokes and other labels
  // (a soft plate only when no spot is free).
  const segs: Seg[] = [[25, 170, 675, 170], [350, 25, 350, 315]];
  const line = (a: Point, b: Point) =>
    segs.push([px(a.x), py(a.y), px(b.x), py(b.y)]);
  line(rays.object, rays.parallelHit);
  line(rays.object, rays.centralHit);
  line(parallel.start, end(parallel));
  line(central.start, end(central));
  if (image && rays.image.kind === "virtual") {
    line(rays.parallelHit, image);
    line(rays.centralHit, image);
  }
  segs.push([px(-u), 170, px(-u), py(1)]);
  if (image) segs.push([px(image.x), 170, px(image.x), py(image.y)]);
  for (const x of focusPositions) segs.push([px(x), 164, px(x), 176]);
  const around = (x: number, y: number, up: boolean, gap = 14): [number, number, Anchor][] => {
    const near: [number, number, Anchor][] = [
      [x, up ? y - gap : y + gap + 4, "middle"],
      [x + 9, up ? y - gap : y + gap + 4, "start"],
      [x - 9, up ? y - gap : y + gap + 4, "end"],
      [x + 12, y + 5, "start"],
      [x - 12, y + 5, "end"],
    ];
    const away = (k: number): [number, number, Anchor][] =>
      near.map(([a, b, c], i) => [
        i < 3 ? a : a + (c === "start" ? k : -k),
        i < 3 ? b + (up ? -k : k) : b,
        c,
      ]);
    const flip: [number, number, Anchor][] = near
      .slice(0, 3)
      .map(([a, b, c]) => [a, up ? b + 2 * gap + 4 : b - 2 * gap - 4, c]);
    return [...near, ...away(12), ...flip, ...away(24), ...away(36)];
  };
  const reqs = focusPositions.map((x, j) => ({
    key: j,
    text: "F",
    spots: [
      ...around(px(x), 176, false),
      ...around(px(x), 164, true),
    ],
  }));
  reqs.push({
    key: focusPositions.length,
    text: "Cisim",
    spots: around(px(-u), py(1), true),
  });
  if (image) {
    const tip = py(image.y);
    const spots =
      rays.image.kind === "virtual"
        ? [
            ...around(px(image.x), 205, false, 0),
            ...around(px(image.x), tip, image.y > 0),
          ]
        : around(px(image.x), tip, image.y > 0);
    reqs.push({ key: focusPositions.length + 1, text: "Görüntü", spots });
  }
  const plan = placeLabels(
    reqs.map((r) => ({
      key: r.key,
      text: r.text,
      fs: 15,
      weight: 500,
      spots: r.spots.map(([x, y, anchor]) => ({ x, y, anchor, dy: 0.35 })),
    })),
    segs,
    [],
    700,
    340,
  );
  const placed = (k: number, label: string, data: Record<string, string> = {}) => {
    const at = plan.get(k);
    if (!at || at.hidden) return null;
    const { x, y, anchor } = at.spot;
    const text = (
      <text x={x} y={y} dy="0.35em" textAnchor={anchor} {...data}>
        {label}
      </text>
    );
    if (!at.plate) return text;
    const w = textWidth(label, 15, 500);
    const x0 = anchor === "end" ? x - w : anchor === "middle" ? x - w / 2 : x;
    return (
      <g data-label-plate="">
        <rect
          x={x0 - 5}
          y={y - 11}
          width={w + 10}
          height={22}
          rx={4}
          className="physics014-label-plate"
        />
        {text}
      </g>
    );
  };
  return (
    <svg
      viewBox="0 0 700 340"
      role="img"
      aria-labelledby={`${uid}-title`}
      data-image-kind={neutral ? "neutral" : rays.image.kind}
      data-optical-device={device}
    >
      <title id={`${uid}-title`}>
        {neutral
          ? "İndis eşleşmesinde merceğin optik gücü sıfır; ışınlar doğrusal sürer."
          : rays.image.kind === "infinity"
            ? "Sonlu görüntü yok; çıkan iki ışın paralel."
            : `${rays.image.kind === "real" ? "Gerçek" : "Sanal"} görüntü; v=${fmt(rays.image.distance!)} cm, büyütme ${fmt(rays.image.magnification!)}.`}
      </title>
      <defs>
        <marker
          id={`${uid}-ray-arrow`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10Z" fill="context-stroke" />
        </marker>
      </defs>
      <line x1="25" y1="170" x2="675" y2="170" className="physics014-axis" />
      {device === "mirror" ? (
        <line
          x1="350"
          y1="25"
          x2="350"
          y2="315"
          className="physics014-device"
        />
      ) : (
        <>
          <path
            data-lens-shape={lensShape}
            d={
              lensShape === "convex"
                ? "M350 25Q325 170 350 315Q375 170 350 25Z"
                : "M335 25Q355 170 335 315L365 315Q345 170 365 25Z"
            }
            className="physics014-lens-shape"
          />
          <line
            x1="350"
            y1="25"
            x2="350"
            y2="315"
            className="physics014-device-plane"
          />
        </>
      )}
      {focusPositions.map((x, j) => (
        <g key={j}>
          <line
            x1={px(x)}
            y1="164"
            x2={px(x)}
            y2="176"
            className="physics014-axis"
          />
          {placed(j, "F")}
        </g>
      ))}
      <path
        data-incident="parallel"
        d={path(rays.object, rays.parallelHit)}
        className="physics014-incoming"
        markerEnd={`url(#${uid}-ray-arrow)`}
      />
      <path
        data-incident="central"
        d={path(rays.object, rays.centralHit)}
        className="physics014-incoming"
        markerEnd={`url(#${uid}-ray-arrow)`}
      />
      <path
        data-outgoing="parallel"
        d={path(parallel.start, end(parallel))}
        className="physics014-ray"
        markerEnd={`url(#${uid}-ray-arrow)`}
      />
      <path
        data-outgoing="central"
        d={path(central.start, end(central))}
        className="physics014-ray-second"
        markerEnd={`url(#${uid}-ray-arrow)`}
      />
      {image && rays.image.kind === "virtual" && (
        <>
          <path
            data-virtual-extension="parallel"
            d={path(rays.parallelHit, image)}
            className="physics014-virtual"
          />
          <path
            data-virtual-extension="central"
            d={path(rays.centralHit, image)}
            className="physics014-virtual"
          />
        </>
      )}
      <path
        data-object-tip
        d={`M${px(-u)} 170V${py(1)}m-6 10 6-10 6 10`}
        className="physics014-object-arrow"
      />
      {placed(focusPositions.length, "Cisim", { "data-object-caption": "" })}
      {image && (
        <>
          <path
            data-image-tip
            data-world-x={image.x}
            data-world-y={image.y}
            d={`M${px(image.x)} 170V${py(image.y)}m-6 ${image.y > 0 ? 10 : -10} 6 ${image.y > 0 ? -10 : 10} 6 ${image.y > 0 ? 10 : -10}`}
            className={
              rays.image.kind === "virtual"
                ? "physics014-virtual"
                : "physics014-image-arrow"
            }
          />
          {placed(focusPositions.length + 1, "Görüntü", {
            "data-image-caption": "",
          })}
        </>
      )}
    </svg>
  );
}
function ImageResult({
  focal,
  u,
  device,
}: {
  focal: number;
  u: number;
  device: "mirror" | "lens";
}) {
  const m = opticalImage(focal, u);
  return (
    <div className="physics014-result" data-model-result>
      <strong>
        {m.kind === "infinity"
          ? "Sonlu görüntü yok"
          : `v: ${fmt(m.distance!)} cm · m: ${fmt(m.magnification!)}`}
      </strong>
      {m.kind === "infinity" ? (
        <p>
          Cisim odakta: çıkan paraksiyal ışınlar paraleldir. Sonsuzluğu sahte
          sonlu sayı veya görüntü oku olarak göstermiyoruz.
        </p>
      ) : (
        <p>
          {m.kind === "real" ? "Gerçek" : "Sanal"},{" "}
          {m.magnification! < 0 ? "ters" : "düz"}, boy oranı{" "}
          {fmt(Math.abs(m.magnification!))}. Görüntü{" "}
          {device === "mirror"
            ? m.distance! > 0
              ? "aynanın önünde"
              : "aynanın arkasında"
            : m.distance! > 0
              ? "merceğin çıkış tarafında"
              : "cisimle aynı tarafta"}
          .
        </p>
      )}
      <p>
        u={fmt(u)} cm; f={fmt(focal)} cm. İşaretler tanımlı tarafa ve yöne
        aittir. Çizimde yatay ve düşey ölçekler farklıdır; boy oranı korunur,
        açılar bu çizimden ölçülmez. Sürekli ışınlar gerçek yayılma, kesik
        çizgiler sanal geri uzantılardır.
      </p>
    </div>
  );
}
function Mirrors() {
  const id = "kuresel-aynalar",
    uid = useId();
  const [s, set] = useExploration(key(id), {
    kind: "concave",
    focal: 10,
    u: 30,
    guess: "",
    reason: "",
    checked: false,
  });
  const kind = s.kind === "convex" ? "convex" : "concave",
    mag = clamp(s.focal, 5, 20, 10),
    focal = kind === "concave" ? mag : -mag,
    u = clamp(s.u, 3, 80, 30),
    m = opticalImage(focal, u);
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  return (
    <Frame
      id={id}
      title="Cismi odak ve iki odak arasında taşı"
      intro="Paraksiyal küresel ayna modelinde gerçek cisim ön taraftadır. Çukur odak pozitif, tümsek odak negatiftir. Şekil yansımayı tepe düzleminde gösterir; küresel sapmayı hesaplamaz."
    >
      <label htmlFor={`${uid}-kind`}>Ayna türü</label>
      <ChoiceSelect
        id={`${uid}-kind`}
        value={kind}
        onChange={(e) => update({ kind: e.target.value })}
      >
        <option value="concave">Çukur</option>
        <option value="convex">Tümsek</option>
      </ChoiceSelect>
      <div className="physics014-controls">
        <ModelNumber
          label="Odak uzaklığının büyüklüğü (cm)"
          value={mag}
          min={5}
          max={20}
          onChange={(focal) => update({ focal })}
        />
        <ModelNumber
          label="Cismin aynaya uzaklığı (cm)"
          value={u}
          min={3}
          max={80}
          onChange={(u) => update({ u })}
        />
      </div>
      <div className="physics014-actions">
        <button
          className="secondary"
          onClick={() => update({ u: Math.max(3, Math.floor(mag / 2)) })}
        >
          İçeri al
        </button>
        <button className="secondary" onClick={() => update({ u: mag })}>
          Odağa koy
        </button>
        <button className="secondary" onClick={() => update({ u: 2 * mag })}>
          İki odak
        </button>
        <button className="secondary" onClick={() => update({ u: 3 * mag })}>
          Üç odak
        </button>
      </div>
      <RayImage device="mirror" focal={focal} u={u} />
      <ImageResult device="mirror" focal={focal} u={u} />
      <Comparison
        uid={uid}
        question="Seçili konumda görüntü hangi türde?"
        choices={["Gerçek", "Sanal", "Sonlu nokta yok"]}
        expected={
          m.kind === "infinity"
            ? "Sonlu nokta yok"
            : m.kind === "real"
              ? "Gerçek"
              : "Sanal"
        }
        values={s}
        onChange={set}
      >
        <p>
          v&gt;0 ön taraftaki gerçek kesişimdir; v&lt;0 arka taraftaki sanal
          uzantı kesişimidir. u=f sınırında iki çıkan ışın paraleldir.
        </p>
      </Comparison>
    </Frame>
  );
}
function Refraction() {
  const id = "isigin-kirilmasi",
    uid = useId();
  const [s, set] = useExploration(key(id), {
    n1: 100,
    n2: 150,
    incidence: 30,
    critical: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const n1 = clamp(s.n1, 100, 200, 100) / 100,
    n2 = clamp(s.n2, 100, 200, 150) / 100,
    manual = clamp(s.incidence, 0, 80, 30),
    critical = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null,
    i = s.critical && critical !== null ? critical : manual,
    m = snellState(n1, n2, i),
    r = ((m.angle ?? 0) * Math.PI) / 180,
    ir = (i * Math.PI) / 180;
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const p = { x: 350 - 150 * Math.sin(ir), y: 175 - 150 * Math.cos(ir) },
    q = { x: 350 + 150 * Math.sin(ir), y: 175 - 150 * Math.cos(ir) },
    t = { x: 350 + 150 * Math.sin(r), y: 175 + 150 * Math.cos(r) };
  return (
    <Frame
      id={id}
      title="Açıyı normalden ölç, sınır durumunu dene"
      intro="İki durgun saydam ortamı ve tek renkli ışığı karşılaştır. Kırılma açısı Snell’den, dalga boyu frekans korunmasından hesaplanır. Çizim açıları aynı yatay/düşey ölçektedir; çizgi kalınlığı enerji payını vermez."
    >
      <div className="physics014-controls">
        <ModelNumber
          label="Birinci indis ×100"
          value={Math.round(n1 * 100)}
          min={100}
          max={200}
          onChange={(n1) => update({ n1 })}
        />
        <ModelNumber
          label="İkinci indis ×100"
          value={Math.round(n2 * 100)}
          min={100}
          max={200}
          onChange={(n2) => update({ n2 })}
        />
        <ModelNumber
          label="Elle gelme açısı (°)"
          value={manual}
          min={0}
          max={80}
          onChange={(incidence) => update({ incidence, critical: false })}
        />
      </div>
      <p>
        İndisler: n₁={fmt(n1)}; n₂={fmt(n2)}. Kullanılan gelme açısı: {fmt(i)}°
        {s.critical && critical !== null ? "; tam kritik açı seçildi." : "."}
      </p>
      <div className="physics014-actions">
        <button
          className="secondary"
          disabled={critical === null}
          onClick={() => update({ critical: true })}
        >
          Sınır açısı
        </button>
        <button
          className="secondary"
          onClick={() =>
            update({ n1: 150, n2: 100, incidence: 50, critical: false })
          }
        >
          Tam yansıt
        </button>
        <button
          className="secondary"
          onClick={() => update({ incidence: 0, critical: false })}
        >
          Dik gönder
        </button>
      </div>
      <svg
        viewBox="0 0 700 350"
        role="img"
        aria-labelledby={`${uid}-title`}
        data-snell-kind={m.kind}
      >
        <title id={`${uid}-title`}>
          {"Gelme " +
            fmt(i) +
            " derece; " +
            (m.angle === null
              ? "tam iç yansıma"
              : "kırılma " + fmt(m.angle) + " derece") +
            "."}
        </title>
        <defs>
          <marker
            id={`${uid}-head`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0L10 5L0 10Z" fill="context-stroke" />
          </marker>
        </defs>
        <rect
          x="20"
          y="175"
          width="660"
          height="155"
          className="physics014-second-medium"
        />
        <line x1="20" y1="175" x2="680" y2="175" className="physics014-axis" />
        <line
          x1="350"
          y1="20"
          x2="350"
          y2="330"
          className="physics014-normal"
        />
        <path
          data-snell-incident
          d={`M${p.x} ${p.y}L350 175`}
          className="physics014-ray"
          markerEnd={`url(#${uid}-head)`}
        />
        <path
          data-snell-reflected
          d={`M350 175L${q.x} ${q.y}`}
          className="physics014-ray-second"
          markerEnd={`url(#${uid}-head)`}
        />
        {m.angle !== null && (
          <path
            data-snell-transmitted
            data-angle={m.angle}
            d={`M350 175L${t.x} ${t.y}`}
            className="physics014-transmitted"
            markerEnd={`url(#${uid}-head)`}
          />
        )}
      </svg>
      <div className="physics014-result" data-model-result>
        <strong>
          {m.kind === "total"
            ? "Tam iç yansıma"
            : m.kind === "critical"
              ? "Kritik sınır: r=90°"
              : `Kırılma: ${fmt(m.angle!)}°`}
        </strong>
        <p>
          {critical === null
            ? "Bu yönde kritik açı yok."
            : `Kritik açı: ${fmt(critical)}°.`}{" "}
          Yansıma açısı kullanılan gelme açısına eşittir.
        </p>
        <p>
          Boşlukta 600 nm seçili kaynakta f=5×10¹⁴ Hz sabittir. İlk ortam λ₁=
          {fmt(m.lambda1)} nm;{" "}
          {m.lambda2 === null
            ? "karşı ortamda ilerleyen kırılmış ışın yok."
            : `ikinci ortam λ₂=${fmt(m.lambda2)} nm.`}{" "}
          Dalga boyunun ortamda değişmesi yeni bir kaynak frekansı değildir.
        </p>
      </div>
      <Comparison
        uid={uid}
        question="Seçili arayüzde hangi durum var?"
        choices={["Geçiş", "Kritik sınır", "Tam iç yansıma"]}
        expected={
          m.kind === "total"
            ? "Tam iç yansıma"
            : m.kind === "critical"
              ? "Kritik sınır"
              : "Geçiş"
        }
        values={s}
        onChange={set}
      >
        <p>
          Önce n₁&gt;n₂ koşuluna bak; sonra i ile i_c’yi karşılaştır. Durağan
          sınırda frekans korunur; tam yansımada karşı ortama sahte gerçek ışın
          çizilmez.
        </p>
      </Comparison>
    </Frame>
  );
}
function Lenses() {
  const id = "mercekler",
    uid = useId();
  const [s, set] = useExploration(key(id), {
    shape: "convex",
    nLens: 150,
    nMedium: 100,
    radius: 10,
    u: 30,
    guess: "",
    reason: "",
    checked: false,
  });
  const shape: LensShape = s.shape === "concave" ? "concave" : "convex",
    nLens = clamp(s.nLens, 120, 180, 150) / 100,
    nMedium = clamp(s.nMedium, 100, 180, 100) / 100,
    radius = clamp(s.radius, 5, 20, 10),
    u = clamp(s.u, 3, 80, 30),
    power = lensPower(shape, nLens, nMedium, radius),
    image = power.focal === null ? null : opticalImage(power.focal, u);
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  return (
    <Frame
      id={id}
      title="Aynı biçimi farklı ortama koy"
      intro="İki eş yarıçaplı ince mercek modeli. İki tarafta aynı ortam vardır; optik güç bağıl indisten gerçekten yeniden hesaplanır. Yakınsak/ıraksak davranışı biçim adından ayrı oku."
    >
      <label htmlFor={`${uid}-shape`}>Mercek biçimi</label>
      <ChoiceSelect
        id={`${uid}-shape`}
        value={shape}
        onChange={(e) => update({ shape: e.target.value })}
      >
        <option value="convex">İnce kenar</option>
        <option value="concave">Kalın kenar</option>
      </ChoiceSelect>
      <div className="physics014-controls">
        <ModelNumber
          label="Mercek indisi ×100"
          value={Math.round(nLens * 100)}
          min={120}
          max={180}
          onChange={(nLens) => update({ nLens })}
        />
        <ModelNumber
          label="Ortam indisi ×100"
          value={Math.round(nMedium * 100)}
          min={100}
          max={180}
          onChange={(nMedium) => update({ nMedium })}
        />
        <ModelNumber
          label="Yüzey yarıçapı (cm)"
          value={radius}
          min={5}
          max={20}
          onChange={(radius) => update({ radius })}
        />
        <ModelNumber
          label="Cismin merceğe uzaklığı (cm)"
          value={u}
          min={3}
          max={80}
          onChange={(u) => update({ u })}
        />
      </div>
      <div className="physics014-actions">
        <button
          className="secondary"
          onClick={() =>
            update({
              shape: "convex",
              nLens: 150,
              nMedium: 100,
              radius: 10,
              u: 10,
            })
          }
        >
          Odağa koy
        </button>
        <button
          className="secondary"
          onClick={() => update({ nMedium: s.nLens })}
        >
          İndisi eşle
        </button>
        <button
          className="secondary"
          onClick={() =>
            update({
              shape: "convex",
              nLens: 150,
              nMedium: 160,
              radius: 10,
              u: 30,
            })
          }
        >
          Ortamı değiştir
        </button>
      </div>
      <p>
        n_m={fmt(nLens)},n_o={fmt(nMedium)}.{" "}
        {power.focal === null
          ? "Optik güç sıfırdır."
          : `f=${fmt(power.focal)} cm; ${power.behavior === "converging" ? "yakınsak" : "ıraksak"} davranış.`}{" "}
        Çizimde mercek orta düzlemi kullanılır; dış siluet sayısal yüzey ölçeği
        değildir.
      </p>
      <RayImage
        device="lens"
        focal={power.focal ?? 10}
        u={u}
        neutral={power.focal === null}
        lensShape={shape}
      />
      {power.focal === null ? (
        <div className="physics014-result" data-model-result>
          <strong>İndis eşleşmesi: optik güç sıfır</strong>
          <p>
            İdeal modelde mercek ve ortam ayrımı kırıcı etki yapmaz. Ayrı bir
            sonlu odak veya yeni mercek görüntüsü hesaplanmıyor. Bu, u=f
            konumundaki güçlü merceğin paralel çıkan demetiyle aynı durum
            değildir.
          </p>
        </div>
      ) : (
        <ImageResult device="lens" focal={power.focal} u={u} />
      )}
      <Comparison
        uid={uid}
        question="Bu ortamda merceğin davranışı ne?"
        choices={["Yakınsak", "Iraksak", "Güç sıfır"]}
        expected={
          power.behavior === "neutral"
            ? "Güç sıfır"
            : power.behavior === "converging"
              ? "Yakınsak"
              : "Iraksak"
        }
        values={s}
        onChange={set}
      >
        <p>
          1/f=(n_m/n_o−1)·(±2/R). İndis oranı işareti değiştirirse biçim aynı
          kalırken optik güç değişebilir.
          {image?.kind === "infinity"
            ? " Şu anda cisim odakta; sonlu görüntü yoktur."
            : ""}
        </p>
      </Comparison>
    </Frame>
  );
}
const names: Record<MaskName, string> = {
  none: "Filtresiz",
  red: "Kırmızı",
  green: "Yeşil",
  blue: "Mavi",
  yellow: "Sarı",
  cyan: "Camgöbeği",
  magenta: "Macenta",
  black: "Siyah",
};
const cssRGB = (v: RGB) => `rgb(${v.map((x) => x * 255).join(",")})`;
function ColorSVG({
  mode,
  input,
  first,
  second,
  surface,
}: {
  mode: "filters" | "surface";
  input: RGB;
  first: MaskName;
  second: MaskName;
  surface: MaskName;
}) {
  const uid = useId(),
    chain = filterChannels(input, channelMasks[first], channelMasks[second]),
    reflected = reflectedChannels(input, channelMasks[surface]),
    output = mode === "filters" ? chain.output : reflected;
  return (
    <svg
      viewBox="0 0 700 340"
      role="img"
      aria-labelledby={`${uid}-title`}
      data-color-mode={mode}
    >
      <title id={`${uid}-title`}>
        {mode === "filters" ? "Seri filtreler" : "Opak yüzey yansıması"}; çıkış{" "}
        {rgbName(output)}.
      </title>
      <defs>
        <marker
          id={`${uid}-head`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0L10 5L0 10Z" fill="context-stroke" />
        </marker>
      </defs>
      {mode === "filters" ? (
        <>
          <rect
            x="215"
            y="45"
            width="30"
            height="250"
            fill={cssRGB(channelMasks[first])}
            className="physics014-color-device"
          />
          <rect
            x="395"
            y="45"
            width="30"
            height="250"
            fill={cssRGB(channelMasks[second])}
            className="physics014-color-device"
          />
          {input.map((v, j) => {
            const y = 85 + j * 80;
            return (
              <g key={j} className={`physics014-channel-${j}`}>
                <text x="30" y={y - 18}>
                  {["K", "Y", "M"][j]}
                </text>
                {v === 1 && (
                  <path
                    data-input-channel={j}
                    d={`M30 ${y}H215`}
                    markerEnd={`url(#${uid}-head)`}
                  />
                )}
                {chain.afterFirst[j] === 1 && (
                  <path
                    data-first-channel={j}
                    d={`M245 ${y}H395`}
                    markerEnd={`url(#${uid}-head)`}
                  />
                )}
                {output[j] === 1 && (
                  <path
                    data-output-channel={j}
                    d={`M425 ${y}H610`}
                    markerEnd={`url(#${uid}-head)`}
                  />
                )}
              </g>
            );
          })}
          <rect
            x="625"
            y="60"
            width="35"
            height="220"
            fill={cssRGB(output)}
            className="physics014-color-device"
          />
        </>
      ) : (
        <>
          <path
            d="M300 270L490 80L505 95L315 285Z"
            fill={cssRGB(output)}
            className="physics014-color-device"
          />
          <line
            x1="330"
            y1="35"
            x2="500"
            y2="35"
            className="physics014-device"
          />
          {input.map((v, j) => {
            const y = 95 + j * 65,
              x = 570 - y;
            return (
              <g key={j} className={`physics014-channel-${j}`}>
                <text x="30" y={y - 18}>
                  {["K", "Y", "M"][j]}
                </text>
                {v === 1 && (
                  <path
                    data-input-channel={j}
                    d={`M30 ${y}H${x}`}
                    markerEnd={`url(#${uid}-head)`}
                  />
                )}
                {output[j] === 1 && (
                  <path
                    data-output-channel={j}
                    d={`M${x} ${y}V35`}
                    markerEnd={`url(#${uid}-head)`}
                  />
                )}
              </g>
            );
          })}
        </>
      )}
    </svg>
  );
}
function PrismSVG({ selection }: { selection: "both" | "red" | "violet" }) {
  const uid = useId(),
    red = prismState(1.5),
    violet = prismState(1.6),
    px = (x: number) => 350 + x * 170,
    py = (y: number) => 275 - y * 170,
    base = red.halfBase,
    entry = red.entry,
    p0 = {
      x: entry.x - red.incomingDirection.x * 1.45,
      y: entry.y - red.incomingDirection.y * 1.45,
    };
  return (
    <svg
      viewBox="0 0 700 340"
      role="img"
      aria-labelledby={`${uid}-title`}
      data-prism
    >
      <title id={`${uid}-title`}>
        {"Verilen 40 derece prizma ve 30 derece gelişte kırmızı sapması " +
          fmt(red.deviation!) +
          " derece, mor " +
          fmt(violet.deviation!) +
          " derece."}
      </title>
      <defs>
        <marker
          id={`${uid}-head`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 0L10 5L0 10Z" fill="context-stroke" />
        </marker>
      </defs>
      <path
        d={`M${px(-base)} ${py(0)}L350 ${py(1)}L${px(base)} ${py(0)}Z`}
        className="physics014-prism"
      />
      <path
        d={`M${px(p0.x)} ${py(p0.y)}L${px(entry.x)} ${py(entry.y)}`}
        className="physics014-incoming"
        markerEnd={`url(#${uid}-head)`}
      />
      <path
        d={`M${px(entry.x - red.entryNormal.x * 0.3)} ${py(entry.y - red.entryNormal.y * 0.3)}L${px(entry.x + red.entryNormal.x * 0.3)} ${py(entry.y + red.entryNormal.y * 0.3)}`}
        className="physics014-normal"
      />
      {[
        { id: "red", m: red },
        { id: "violet", m: violet },
      ]
        .filter((p) => selection === "both" || p.id === selection)
        .map(({ id, m }) => {
          const q = m.exit,
            o = m.outgoingDirection!;
          return (
            <g key={id} className={`physics014-prism-${id}`}>
              <path
                data-prism-inside={id}
                d={`M${px(entry.x)} ${py(entry.y)}L${px(q.x)} ${py(q.y)}`}
              />
              <path
                data-prism-outgoing={id}
                data-deviation={m.deviation}
                data-angle={m.exitAngle}
                d={`M${px(q.x)} ${py(q.y)}L${px(q.x + o.x * 1.1)} ${py(q.y + o.y * 1.1)}`}
                markerEnd={`url(#${uid}-head)`}
              />
              <path
                d={`M${px(q.x - m.exitNormal.x * 0.2)} ${py(q.y - m.exitNormal.y * 0.2)}L${px(q.x + m.exitNormal.x * 0.2)} ${py(q.y + m.exitNormal.y * 0.2)}`}
                className="physics014-normal"
              />
            </g>
          );
        })}
    </svg>
  );
}
function Prisms() {
  const id = "prizmalar-renkler",
    uid = useId();
  const [s, set] = useExploration(key(id), {
    mode: "filters",
    red: true,
    green: true,
    blue: true,
    first: "none",
    second: "none",
    surface: "yellow",
    selection: "both",
    guess: "",
    reason: "",
    checked: false,
  });
  const mode =
      s.mode === "surface"
        ? "surface"
        : s.mode === "prism"
          ? "prism"
          : "filters",
    input: RGB = [s.red ? 1 : 0, s.green ? 1 : 0, s.blue ? 1 : 0],
    validMask = (v: string): MaskName =>
      Object.hasOwn(channelMasks, v) ? (v as MaskName) : "none",
    first = validMask(s.first),
    second = validMask(s.second),
    surface = validMask(s.surface),
    selection =
      s.selection === "red" || s.selection === "violet" ? s.selection : "both",
    output =
      mode === "surface"
        ? reflectedChannels(input, channelMasks[surface])
        : filterChannels(input, channelMasks[first], channelMasks[second])
            .output,
    red = prismState(1.5),
    violet = prismState(1.6);
  const update = (v: Partial<typeof s>) => set({ ...v, checked: false });
  const filter = (
    label: string,
    value: MaskName,
    onChange: (v: MaskName) => void,
  ) => (
    <label>
      {label}
      <ChoiceSelect
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as MaskName)}
      >
        {(Object.keys(names) as MaskName[]).map((k) => (
          <option key={k} value={k}>
            {names[k]}
          </option>
        ))}
      </ChoiceSelect>
      <span className="small muted">Seçili: {names[value]}</span>
    </label>
  );
  return (
    <Frame
      id={id}
      title="Kaynak, işlem ve çıkışı ayrı izle"
      intro="Üç farklı işlem var: seri ideal filtre, opak yüzey yansıması ve verilen indislerle prizma kırılması. RGB kanalları ikili bir öğretim modelidir; sürekli tayfın veya bütün gerçek pigmentlerin tam ölçümü değildir."
    >
      <label htmlFor={`${uid}-mode`}>İncelenen işlem</label>
      <ChoiceSelect
        id={`${uid}-mode`}
        value={mode}
        onChange={(e) => update({ mode: e.target.value })}
      >
        <option value="filters">Filtreler</option>
        <option value="surface">Yüzey</option>
        <option value="prism">Prizma</option>
      </ChoiceSelect>
      {mode === "prism" ? (
        <>
          <label htmlFor={`${uid}-selection`}>Prizmada gösterilen ışık</label>
          <ChoiceSelect
            id={`${uid}-selection`}
            value={selection}
            onChange={(e) => update({ selection: e.target.value })}
          >
            <option value="both">Kıyasla</option>
            <option value="red">Kırmızı</option>
            <option value="violet">Mor</option>
          </ChoiceSelect>
          <PrismSVG selection={selection} />
          <div className="physics014-result" data-model-result>
            <strong>
              Kırmızı sapma: {fmt(red.deviation!)}° · Mor sapma:{" "}
              {fmt(violet.deviation!)}°
            </strong>
            <p>
              Prizma tepe açısı 40°; ilk normalden geliş 30°; hava n=1. Verilen
              indisler: kırmızı 1,5; mor 1,6. İlk kırılma:{" "}
              {fmt(red.insideAngle)}° ve {fmt(violet.insideAngle)}°; çıkış:{" "}
              {fmt(red.exitAngle!)}° ve {fmt(violet.exitAngle!)}°.
            </p>
            <p>
              İki yüzeyin normalleri ayrı çizilmiştir. Mor bu verilen normal
              dispersiyon modelinde daha çok sapar; prizma yeni frekans
              yaratmaz. Tek renk seçmek diğer ışığın kendiliğinden üretildiği
              anlamına gelmez.
            </p>
          </div>
        </>
      ) : (
        <>
          <fieldset className="physics014-source">
            <legend>Kaynakta bulunan kanallar</legend>
            {(["red", "green", "blue"] as const).map((c, j) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={Boolean(s[c])}
                  onChange={(e) => update({ [c]: e.target.checked })}
                />
                {["Kırmızı", "Yeşil", "Mavi"][j]}
              </label>
            ))}
          </fieldset>
          <div className="physics014-controls">
            {mode === "filters" ? (
              <>
                {filter("Birinci filtre", first, (first) => update({ first }))}
                {filter("İkinci filtre", second, (second) =>
                  update({ second }),
                )}
              </>
            ) : (
              filter("Yüzeyin yansıtma rengi", surface, (surface) =>
                update({ surface }),
              )
            )}
          </div>
          <ColorSVG
            mode={mode}
            input={input}
            first={first}
            second={second}
            surface={surface}
          />
          <div className="physics014-result" data-model-result>
            <strong>Çıkış: {rgbName(output)}</strong>
            <p>
              Kaynak[{input.join(",")}]; çıkış[{output.join(",")}]. Göze veya
              algılayıcıya ulaşan bileşenler:
              {output.some(Boolean)
                ? output
                    .map((v, j) => (v ? ["kırmızı", "yeşil", "mavi"][j] : ""))
                    .filter(Boolean)
                    .join(", ")
                : "hiçbiri"}
              .
            </p>
            <p>
              {mode === "filters"
                ? "İlk filtrede durdurulan kanal ikinci filtre tarafından yaratılmaz. Sürekli çıkış çizgileri yalnız geçirilen kanallardır."
                : "Yüzey gelen ışığın yalnız seçili yansıtma bileşenlerini geri yollar. Boyanın beyaz ışık altındaki adı yeni ışık üretmez."}{" "}
              Çizimde K=kırmızı, Y=yeşil, M=mavi; 0/1 geçirim ideal kabul
              edilir.
            </p>
          </div>
        </>
      )}
      <Comparison
        uid={uid}
        question={
          mode === "prism"
            ? "Verilen indislerde hangi ışık daha çok sapıyor?"
            : "Bu düzende çıkışta ışık var mı?"
        }
        choices={mode === "prism" ? ["Mor", "Kırmızı", "Aynı"] : ["Var", "Yok"]}
        expected={
          mode === "prism" ? "Mor" : output.some(Boolean) ? "Var" : "Yok"
        }
        values={s}
        onChange={set}
      >
        <p>
          {mode === "prism"
            ? "Önce her yüzeydeki Snell açısını bul, r₁+r₂=A ve δ=i+e−A ile aynı başlangıç doğrultusuna göre karşılaştır."
            : "Kaynak ve işlem maskesinin ortak bileşenlerini say. Olmayan bileşeni filtre veya ideal opak yüzey kendiliğinden eklemez."}
        </p>
      </Comparison>
    </Frame>
  );
}
export default function Forge014PhysicsLab({ lessonId }: { lessonId: string }) {
  return lessonId === "kuresel-aynalar" ? (
    <Mirrors />
  ) : lessonId === "isigin-kirilmasi" ? (
    <Refraction />
  ) : lessonId === "mercekler" ? (
    <Lenses />
  ) : (
    <Prisms />
  );
}
