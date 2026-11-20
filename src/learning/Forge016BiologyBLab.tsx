import { useId } from "react";
import {
  bone016State,
  ear016State,
  eye016State,
  hearing016Stages,
  joint016State,
  skin016State,
  smellTaste016State,
  type BalanceMotion,
  type EyeDefect,
  type JointFocus,
  type SkinPhase,
  type SkinStimulus,
  type TasteQuality,
} from "./forge016BiologyB";
import { useExploration } from "./useExploration";
import "./forge016BiologyB.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 }).format(
    Math.abs(n) < 1e-9 ? 0 : n,
  );
const safe = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Number.isFinite(n) ? n : lo));
function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="bio016b-field">
      <label htmlFor={id}>{label}</label>
      <ChoiceSelect id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([k, t]) => (
          <option key={k} value={k}>
            {t}
          </option>
        ))}
      </ChoiceSelect>
      <p className="bio016b-chosen">
        Seçili: {options.find(([k]) => k === value)?.[1]}
      </p>
    </div>
  );
}
function Range({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div className="bio016b-field">
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{fmt(value)}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
const tasteNames: [string, string][] = [
  ["sweet", "Tatlı"],
  ["salty", "Tuzlu"],
  ["sour", "Ekşi"],
  ["bitter", "Acı"],
  ["umami", "Umami"],
];
const ids = [
  "duyu-organlari-deri",
  "duyu-organlari-dil-burun",
  "duyu-organlari-goz",
  "duyu-organlari-kulak",
  "destek-hareket-kemik",
  "destek-hareket-kikirdak-eklem",
];
export default function Forge016BiologyBLab({
  lessonId,
}: {
  lessonId: string;
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge016-b:${lessonId}`, {
    stimulus: "touch",
    phase: "onset",
    gland: "eccrine",
    nose: true,
    quality: "sweet",
    cell: "sweet",
    path: "taste",
    distance: "far",
    light: "bright",
    defect: "normal",
    corrected: false,
    stage: 0,
    motion: "start",
    area: 60,
    age: "growing",
    process: "length",
    step: 0,
    tissue: "compact",
    angle: 0,
    focus: "surface",
    guess: "",
    reason: "",
    checked: false,
  });
  if (!ids.includes(lessonId)) return null;
  const update = (change: Partial<typeof s>) =>
    set({
      ...change,
      reason: (change.reason ?? s.reason).slice(0, 120),
      checked: false,
    });
  const reason = s.reason.slice(0, 120);
  const skin = skin016State(
    (["touch", "pressure", "vibration", "stretch", "heat", "pain"].includes(
      s.stimulus,
    )
      ? s.stimulus
      : "touch") as SkinStimulus,
    (["onset", "steady", "offset"].includes(s.phase)
      ? s.phase
      : "onset") as SkinPhase,
    s.gland === "apocrine" ? "apocrine" : "eccrine",
  );
  const chemo = smellTaste016State(
    s.nose,
    (tasteNames.some(([k]) => k === s.quality)
      ? s.quality
      : "sweet") as TasteQuality,
    (tasteNames.some(([k]) => k === s.cell) ? s.cell : "sweet") as TasteQuality,
    s.path === "smell" ? "smell" : "taste",
  );
  const eye = eye016State(
    s.distance === "near" ? "near" : "far",
    s.light === "dim" ? "dim" : "bright",
    (["normal", "myopia", "hyperopia"].includes(s.defect)
      ? s.defect
      : "normal") as EyeDefect,
    s.corrected,
  );
  const ear = ear016State(
    Math.round(safe(s.stage, 0, 7)),
    (["start", "steady", "stop", "linear", "tilt"].includes(s.motion)
      ? s.motion
      : "start") as BalanceMotion,
    safe(s.area, 30, 90),
  );
  const bone = bone016State(
    s.age === "adult" ? "adult" : "growing",
    s.process === "width" ? "width" : "length",
    Math.round(safe(s.step, 0, 4)),
    (["compact", "spongy", "marrow"].includes(s.tissue)
      ? s.tissue
      : "compact") as "compact" | "spongy" | "marrow",
  );
  const joint = joint016State(
    safe(s.angle, 0, 60),
    (["surface", "meniscus", "ligament", "tendon", "fluid"].includes(s.focus)
      ? s.focus
      : "surface") as JointFocus,
  );
  const activeSkin = skin.responses.filter((r) => r.level > 0),
    phasic = activeSkin.some((r) => ["meissner", "pacini"].includes(r.id)),
    tonic = activeSkin.some((r) => !["meissner", "pacini"].includes(r.id));
  let question = "",
    expected = "",
    evidence = "",
    options: [string, string][] = [];
  if (lessonId === ids[0]) {
    question = "Seçili evrede şemadaki hangi yanıt türü etkin?";
    expected =
      phasic && tonic
        ? "both"
        : phasic
          ? "change"
          : tonic
            ? "sustained"
            : "none";
    options = [
      ["change", "Değişim yanıtı"],
      ["sustained", "Süren uyaran yanıtı"],
      ["both", "İki örnek birlikte"],
      ["none", "Hiçbiri"],
    ];
    evidence = activeSkin.length
      ? activeSkin.map((r) => r.name).join("; ")
      : "Bu evrede verilen örneklerin şematik yanıtı yok.";
  } else if (lessonId === ids[1]) {
    question = "İzlenen seçili hücre veya yol kartında sinyal var mı?";
    expected = chemo.signalPresent ? "present" : "absent";
    options = [
      ["present", "Seçili yolda var"],
      ["absent", "Seçili yolda yok"],
    ];
    evidence =
      chemo.path === "taste"
        ? `Seçili hücre ${chemo.cellName.toLocaleLowerCase("tr-TR")} yoluna ait. Verilen temel tat ${chemo.qualityName.toLocaleLowerCase("tr-TR")}. Diğer tat hücreleri bu karttan çıkarılamaz.`
        : `Koku moleküllerinin epiteline erişimi ${chemo.noseOpen ? "açık" : "kapalı"}; temel tat kanalı bundan ayrı.`;
  } else if (lessonId === ids[2]) {
    question = "Bu eşdeğer optik modelde odak retinaya göre nerede?";
    expected = eye.focus;
    options = [
      ["front", "Retinanın önünde"],
      ["retina", "Retina düzleminde"],
      ["behind", "Retinanın arkasında"],
    ];
    evidence = `Odak ${fmt(eye.imageDistance)} mm, retina ${eye.retinalDistance} mm; ikisi aynı eşdeğer sistemden ölçülür.`;
  } else if (lessonId === ids[3]) {
    question = "Bu hareket evresinde şemadaki göreli sapma nerede?";
    expected = ear.cupulaDirection
      ? "canal"
      : ear.otolithShift
        ? "otolith"
        : "none";
    options = [
      ["canal", "Yarım daire kanalı"],
      ["otolith", "Otolit organı"],
      ["none", "Bu ideal sabit evrede yok"],
    ];
    evidence = ear.cupulaDirection
      ? "Başlangıç ve durmada eylemsizliğe bağlı göreli etki karşı yönlüdür."
      : ear.otolithShift
        ? "Doğrusal ivme veya eğim otolitli duyu düzenekleriyle ilişkilidir."
        : "Uzun süre sabit açısal hız kartında göreli dönme etkisi sönmüş kabul edilir; bütün denge bilgisi kaybolmaz.";
  } else if (lessonId === ids[4]) {
    question = "Başlangıca göre modelde hangi boyut değişti?";
    expected = bone.lengthChanged
      ? "length"
      : bone.widthChanged
        ? "width"
        : "none";
    options = [
      ["length", "Uzunluk"],
      ["width", "Kalınlık"],
      ["none", "İkisi de aynı"],
    ];
    evidence = `Başlangıç uzunluğu 220, kalınlığı 56 şema birimi; şimdi ${bone.length} ve ${bone.width}. Plak ${bone.plateOpen ? "açık" : "kapalı"}.`;
  } else {
    question = "Seçili yapı için doğru doku veya bağlantı hangisi?";
    expected =
      joint.focus === "surface"
        ? "hyaline"
        : joint.focus === "meniscus"
          ? "fibrous"
          : joint.focus === "ligament"
            ? "bone-bone"
            : joint.focus === "tendon"
              ? "muscle-bone"
              : "fluid";
    options = [
      ["hyaline", "Hiyalin kıkırdak"],
      ["fibrous", "Fibröz kıkırdak"],
      ["bone-bone", "Kemik–kemik bağı"],
      ["muscle-bone", "Kas–kemik bağı"],
      ["fluid", "Sinoviyal sıvı"],
    ];
    evidence = joint.label;
  }
  const eyeOffset = eye.pupilRadius * 0.7,
    eyeRetinaX = 200 + eye.retinalDistance * 8,
    eyeFocusX = 200 + eye.imageDistance * 8,
    eyeRayUpper =
      190 - eyeOffset * (1 - eye.retinalDistance / eye.imageDistance),
    eyeRayLower =
      190 + eyeOffset * (1 - eye.retinalDistance / eye.imageDistance);
  const validGuess = options.some(([k]) => k === s.guess);
  return (
    <section
      className="bio016b-lab"
      data-forge016={lessonId}
      aria-labelledby={`${uid}-heading`}
    >
      <h3 id={`${uid}-heading`}>
        {
          [
            "Deriyi katman ve zamanla keşfet",
            "Tat ile aromanın yollarını ayır",
            "Uyumu, açıklığı ve odağı karşılaştır",
            "İşitme yolunu ve denge evresini izle",
            "Canlı kemiği kesitte incele",
            "Bağlantıların hareketini izle",
          ][ids.indexOf(lessonId)]
        }
      </h3>
      <p>
        Önce koşulu değiştir, sonra tahminini ve kısa gerekçeni yaz. Kanıtı
        karşılaştırınca modelin neyi gösterdiğini açıkla.
      </p>
      {lessonId === ids[0] && (
        <>
          <div className="bio016b-controls">
            <Select
              label="Deriye gelen uyaran"
              value={skin.stimulus}
              options={[
                ["touch", "Hafif dokunma"],
                ["pressure", "Sabit basınç"],
                ["vibration", "Süren titreşim"],
                ["stretch", "Deri gerilmesi"],
                ["heat", "Isı uyaranı"],
                ["pain", "Zararlı uyaran"],
              ]}
              onChange={(v) => update({ stimulus: v, guess: "" })}
            />
            <Select
              label="Uyaranın evresi"
              value={skin.phase}
              options={[
                ["onset", "Başlangıç"],
                ["steady", "Sürme"],
                ["offset", "Bitiş"],
              ]}
              onChange={(v) => update({ phase: v })}
            />
            <Select
              label="İzlenen ter bezi"
              value={skin.gland}
              options={[
                ["eccrine", "Ekrin: yüzey poru"],
                ["apocrine", "Apokrin: folikül"],
              ]}
              onChange={(v) => update({ gland: v })}
            />
          </div>
          <p className="bio016b-key">
            Üst ince şerit epidermis, alt alan dermis, noktalı taban
            hipodermistir. Sayılar yapı kimliğidir: 1 serbest uç, 2 Meissner, 3
            Merkel, 4 Ruffini, 5 Pacini. Vurgulu şekiller seçili uyarana ait
            örneklerdir.
          </p>
          <svg
            className="bio016b-diagram"
            viewBox="0 0 600 380"
            role="img"
            aria-labelledby={`${uid}-skin-title`}
            data-bio016-diagram="skin"
          >
            <defs>
              <marker
                id={`${uid}-arrow`}
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0 0L7 3.5L0 7Z" fill="currentColor" />
              </marker>
            </defs>
            <title id={`${uid}-skin-title`}>
              Deri kesiti; seçilen uyaran ve zaman evresindeki reseptör
              örnekleri. Ter çıkışı {skin.outlet}.
            </title>
            <path
              d="M35 70Q110 60 180 70T330 70T565 70V110H35Z"
              className="bio016b-tissue"
            />
            <path d="M35 110H565V310H35Z" className="bio016b-soft" />
            <path d="M35 310H565V355H35Z" className="bio016b-muted-fill" />
            <path
              d="M35 70H565M35 110H565M35 310H565"
              className="bio016b-line"
            />
            {[80, 150, 220, 290, 360, 430, 500].map((x) => (
              <circle key={x} cx={x} cy={335} r={12} className="bio016b-fat" />
            ))}
            <path
              d="M450 42Q430 140 435 230Q451 260 466 232L466 116"
              className="bio016b-hair"
            />
            <path
              d="M325 240C290 210 365 200 330 260C300 290 370 285 345 245"
              className="bio016b-gland"
            />
            <path
              data-sweat-outlet={skin.gland}
              d={
                skin.gland === "eccrine"
                  ? "M330 240L330 70"
                  : "M330 240Q380 160 440 145"
              }
              className="bio016b-signal"
              markerEnd={`url(#${uid}-arrow)`}
            />
            <path
              d="M65 280Q160 300 270 280T520 280M80 280V300M220 285V300M400 280V300"
              className="bio016b-vessel"
            />
            {[
              { id: "free", x: 90, y: 88, n: 1 },
              { id: "meissner", x: 150, y: 128, n: 2 },
              { id: "merkel", x: 210, y: 106, n: 3 },
              { id: "ruffini", x: 270, y: 210, n: 4 },
              { id: "pacini", x: 150, y: 245, n: 5 },
            ].map((r) => (
              <g
                key={r.id}
                data-skin-receptor={r.id}
                data-active={skin.responses.some(
                  (a) => a.id === r.id && a.level > 0,
                )}
              >
                <path d={`M${r.x} 310V${r.y}`} className="bio016b-nerve" />
                {r.id === "free" ? (
                  <path
                    d={`M${r.x} ${r.y + 20}V${r.y}M${r.x} ${r.y + 11}L${r.x - 12} ${r.y + 2}M${r.x} ${r.y + 6}L${r.x + 12} ${r.y - 4}`}
                    className={
                      skin.responses.some((a) => a.id === r.id && a.level > 0)
                        ? "bio016b-signal"
                        : "bio016b-line"
                    }
                  />
                ) : (
                  <ellipse
                    cx={r.x}
                    cy={r.y}
                    rx={r.id === "pacini" ? 28 : 13}
                    ry={r.id === "ruffini" ? 9 : 17}
                    className={
                      skin.responses.some((a) => a.id === r.id && a.level > 0)
                        ? "bio016b-active"
                        : "bio016b-cell"
                    }
                  />
                )}
                {r.id === "pacini" &&
                  [20, 12].map((rx) => (
                    <ellipse
                      key={rx}
                      cx={r.x}
                      cy={r.y}
                      rx={rx}
                      ry={rx / 2}
                      className="bio016b-line"
                    />
                  ))}
                <text
                  x={
                    r.id === "free"
                      ? r.x - 22
                      : r.id === "pacini"
                        ? r.x + 40
                        : r.x
                  }
                  y={r.y + 5}
                  textAnchor="middle"
                >
                  {r.n}
                </text>
              </g>
            ))}
            {/* Layer names end inside the skin block, clear of its right edge. */}
            <text x={555} y={99} textAnchor="end">
              Epidermis
            </text>
            <text x={555} y={190} textAnchor="end">
              Dermis
            </text>
            <text x={555} y={340} textAnchor="end">
              Deri altı
            </text>
          </svg>
          <div data-model-result>
            <strong>Ter kanalı çıkışı: {skin.outlet}.</strong>
            <p>{skin.caution}</p>
            <ul>
              {skin.responses.map((r) => (
                <li key={r.id} data-skin-result={r.id}>
                  {r.name}:{" "}
                  {r.level === 0
                    ? "bu evrede şematik yanıt yok"
                    : r.level === 1
                      ? "azalmış nitel yanıt"
                      : "etkin nitel yanıt"}
                  . Başlangıç/sürme/bitiş kodları: {r.pattern.join(" / ")}.
                </li>
              ))}
            </ul>
            <p>
              Serbest uçlar epidermise uzanabilir; epidermiste damar yokluğu
              sinir ucu yokluğu değildir. Hipodermis burada gerçek derinin
              altındaki destek dokusudur.
            </p>
          </div>
        </>
      )}
      {lessonId === ids[1] && (
        <>
          <div className="bio016b-controls">
            <Select
              label="İzlenen kimyasal duyu yolu"
              value={chemo.path}
              options={[
                ["taste", "Tat hücresi yolu"],
                ["smell", "Koku nöronu yolu"],
              ]}
              onChange={(v) => update({ path: v, guess: "" })}
            />
            <Select
              label="Yiyeceğin temel tadı"
              value={chemo.quality}
              options={tasteNames}
              onChange={(v) => update({ quality: v })}
            />
            <Select
              label="Seçili tat hücresinin örnek yolu"
              value={chemo.cell}
              options={tasteNames}
              onChange={(v) => update({ cell: v })}
            />
            <Select
              label="Aromanın koku epiteline erişimi"
              value={chemo.noseOpen ? "open" : "closed"}
              options={[
                ["open", "Açık"],
                ["closed", "Kapalı"],
              ]}
              onChange={(v) => update({ nose: v === "open" })}
            />
          </div>
          <p className="bio016b-key">
            Üst yol koku nöronunu; alt yol ayrı tat hücresi ve duyu sinirini
            gösterir. Kesik kapı yalnız aroma erişimini engeller. Hücre renkleri
            bölgesel bir dil haritası değildir.
          </p>
          <svg
            className="bio016b-diagram"
            viewBox="0 0 600 400"
            role="img"
            aria-labelledby={`${uid}-chemo-title`}
            data-bio016-diagram="chemo"
          >
            <defs>
              <marker
                id={`${uid}-arrow`}
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0 0L7 3.5L0 7Z" fill="currentColor" />
              </marker>
            </defs>
            <title id={`${uid}-chemo-title`}>
              Koku ve tat ayrı yolları; aroma{" "}
              {chemo.noseOpen ? "ulaşıyor" : "engellenmiş"}; seçili tat hücresi{" "}
              {chemo.cellName}.
            </title>
            <path d="M35 150H555M35 300H555" className="bio016b-grid" />
            <text x={35} y={30}>
              Koku nöronu
            </text>
            <text x={35} y={235}>
              Tat hücresi + ayrı sinir
            </text>
            {[50, 70, 90].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={75 + i * 18}
                r={5}
                className={chemo.noseOpen ? "bio016b-active" : "bio016b-cell"}
              />
            ))}
            <path
              data-aroma-gate
              d="M115 55V145"
              className={chemo.noseOpen ? "bio016b-open" : "bio016b-block"}
            />
            <ellipse
              cx={185}
              cy={115}
              rx={24}
              ry={32}
              className={chemo.noseOpen ? "bio016b-active" : "bio016b-cell"}
            />
            <path
              d="M165 95L140 90M165 108L140 108M165 122L140 130"
              className="bio016b-line"
            />
            <path
              data-olfactory-path={chemo.noseOpen}
              d="M210 115H315Q350 115 350 85H425L520 115"
              className={
                chemo.noseOpen ? "bio016b-signal" : "bio016b-muted-line"
              }
              markerEnd={`url(#${uid}-arrow)`}
            />
            <circle cx={350} cy={85} r={16} className="bio016b-cell" />
            <text x={300} y={45}>
              Soğancık
            </text>
            <text x={455} y={173}>
              İlk korteks
            </text>
            <path
              d="M45 275Q115 235 185 275V340H45Z"
              className="bio016b-soft"
            />
            {tasteNames.map(([k], i) => (
              <ellipse
                key={k}
                data-taste-cell={k}
                data-active={k === chemo.quality}
                cx={65 + i * 24}
                cy={300}
                rx={9}
                ry={25}
                className={
                  k === chemo.quality ? "bio016b-active" : "bio016b-cell"
                }
              />
            ))}
            <rect
              x={46 + tasteNames.findIndex(([k]) => k === chemo.cell) * 24}
              y={268}
              width={38}
              height={64}
              rx={12}
              className="bio016b-selection"
            />
            <path
              data-selected-taste-path={chemo.selectedTasteActive}
              d="M185 300H265Q285 300 295 285H375L510 300"
              className={
                chemo.selectedTasteActive
                  ? "bio016b-signal"
                  : "bio016b-muted-line"
              }
              markerEnd={`url(#${uid}-arrow)`}
            />
            <circle cx={375} cy={285} r={17} className="bio016b-cell" />
            <text x={330} y={350}>
              Talamus
            </text>
            <text x={465} y={350}>
              Tat korteksi
            </text>
            <path
              d="M520 115Q570 180 520 240M520 300Q570 250 520 240"
              className="bio016b-line"
            />
            <text x={425} y={220}>
              Lezzette birleşir
            </text>
          </svg>
          <div data-model-result>
            <strong>
              Temel tat kanalı: korunuyor. Aroma katkısı:{" "}
              {chemo.aromaPresent ? "var" : "erişim engellendi"}.
            </strong>
            <p data-chemo-selected>
              Seçili {chemo.cellName.toLocaleLowerCase("tr-TR")} tat hücresi:{" "}
              {chemo.selectedTasteActive
                ? "bu temel tat kartında etkin"
                : "bu temel tat kartında etkin değil"}
              . Diğer tat hücreleri ayrıca bulunabilir.
            </p>
            <p>İzlenen yol: {chemo.route.join(" → ")}.</p>
            <p>
              {chemo.path === "taste"
                ? "Tat hücresi özelleşmiş epiteldir; sinir ucuna haber verir. Gösterilmeyen beyin sapı bağlantıları kısa şemada özetlenmiştir."
                : "Koku reseptörü nörondur; ilk kortikal yol önce zorunlu talamik röle gerektirmez. Sonraki talamik ilişkiler dışlanmaz."}
            </p>
            <p>
              Bu kartta her hücre tek örnek tat yoluyla gösterilir; gerçek hücre
              çeşitliliğinin ve moleküler yolların tam modeli değildir. Dil
              bölgeleri tek bir tada ayrılmış değildir.
            </p>
          </div>
        </>
      )}
      {lessonId === ids[2] && (
        <>
          <div className="bio016b-controls">
            <Select
              label="Bakılan nesnenin uzaklığı"
              value={eye.distance}
              options={[
                ["far", "Uzak: 6000 mm"],
                ["near", "Yakın: 250 mm"],
              ]}
              onChange={(v) => update({ distance: v })}
            />
            <Select
              label="Ortamın ışığı"
              value={eye.light}
              options={[
                ["bright", "Aydınlık"],
                ["dim", "Loş"],
              ]}
              onChange={(v) => update({ light: v })}
            />
            <Select
              label="Eksen uzunluğu modeli"
              value={eye.defect}
              options={[
                ["normal", "Referans: retina 24 mm"],
                ["myopia", "Uzun eksen: retina 27 mm"],
                ["hyperopia", "Kısa eksen: retina 21 mm"],
              ]}
              onChange={(v) => update({ defect: v, guess: "" })}
            />
            <Select
              label="Ek optik düzeltme"
              value={eye.corrected ? "on" : "off"}
              options={[
                ["off", "Kapalı"],
                ["on", "Açık"],
              ]}
              onChange={(v) => update({ corrected: v === "on" })}
            />
          </div>
          <p className="bio016b-key">
            İndirgenmiş ince optik sistem; uzunluklar mm. Yatayda mercek
            referansı x=200, ölçek 8 SVG birimi/mm; odak dikey kesik, retina düz
            çizgi. Eksen üzerindeki ışıklı nesne kadrajın dışında, seçilen
            uzaklıktadır. Görünen giriş parçaları o nesneden ıraksar; uzak
            nesnede paralelliğe yaklaşır. Çizimin anatomik dış sınırından gerçek
            göz ölçüsü çıkarılmaz. Arkadaki odağa kesik uzantılar, retina
            kaldırılmış gibi geometrik uzatmadır; gerçek ışık retinada işlenir.
          </p>
          <svg
            className="bio016b-diagram"
            viewBox="0 0 600 380"
            role="img"
            aria-labelledby={`${uid}-eye-title`}
            data-bio016-diagram="eye"
          >
            <defs>
              <marker
                id={`${uid}-arrow`}
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0 0L7 3.5L0 7Z" fill="currentColor" />
              </marker>
            </defs>
            <title id={`${uid}-eye-title`}>
              Eşdeğer göz sistemi; görüntü uzaklığı {fmt(eye.imageDistance)} mm;
              retina {eye.retinalDistance} mm.
            </title>
            <path d="M30 190H560" className="bio016b-grid" />
            <path
              d={`M140 95Q80 190 140 285Q${240 + eye.retinalDistance * 8} 330 ${210 + eye.retinalDistance * 8} 190Q${240 + eye.retinalDistance * 8} 50 140 95Z`}
              className="bio016b-soft"
            />
            <path
              d={`M200 105Q${200 - eye.lensThickness} 190 200 275Q${200 + eye.lensThickness} 190 200 105Z`}
              className="bio016b-lens"
            />
            <path
              d={`M166 105V${190 - eye.pupilRadius}M166 ${190 + eye.pupilRadius}V275`}
              className="bio016b-iris"
            />
            <path
              data-eye-ray="upper"
              data-object-distance={eye.objectDistance}
              d={`M35 ${190 - eyeOffset * (1 - 165 / (8 * eye.objectDistance))}L200 ${190 - eyeOffset}L${eyeRetinaX} ${eyeRayUpper}`}
              className="bio016b-ray"
            />
            <path
              data-eye-ray="lower"
              data-object-distance={eye.objectDistance}
              d={`M35 ${190 + eyeOffset * (1 - 165 / (8 * eye.objectDistance))}L200 ${190 + eyeOffset}L${eyeRetinaX} ${eyeRayLower}`}
              className="bio016b-ray"
            />
            {eye.focus === "behind" && (
              <g data-eye-extension>
                <path
                  d={`M${eyeRetinaX} ${eyeRayUpper}L${eyeFocusX} 190`}
                  className="bio016b-focus"
                />
                <path
                  d={`M${eyeRetinaX} ${eyeRayLower}L${eyeFocusX} 190`}
                  className="bio016b-focus"
                />
              </g>
            )}
            <path
              data-eye-focus
              data-distance={eye.imageDistance}
              d={`M${200 + eye.imageDistance * 8} 115V275`}
              className="bio016b-focus"
            />
            <path
              data-eye-retina
              data-distance={eye.retinalDistance}
              d={`M${200 + eye.retinalDistance * 8} 90V290`}
              className="bio016b-retina"
            />
            <path
              d={`M${200 - eye.lensThickness / 2} 110L170 85M${200 + eye.lensThickness / 2} 270L170 295`}
              className={eye.zonuleTaut ? "bio016b-line" : "bio016b-relaxed"}
            />
            <text x={162} y={335}>
              Mercek
            </text>
            <text x={200 + eye.retinalDistance * 8} y={70} textAnchor="middle">
              Retina
            </text>
            <text x={200 + eye.imageDistance * 8} y={315} textAnchor="middle">
              Odak
            </text>
            <text x={50} y={42}>
              Işık
            </text>
          </svg>
          <div data-model-result>
            <strong>
              Odak:{" "}
              {eye.focus === "retina"
                ? "retina düzleminde"
                : eye.focus === "front"
                  ? "retinanın önünde"
                  : "retinanın arkasında"}
              .
            </strong>
            <p>
              Görüntü uzaklığı {fmt(eye.imageDistance)} mm; retina{" "}
              {eye.retinalDistance} mm; nesne {eye.objectDistance} mm. Eşdeğer
              odak uzaklığı {fmt(eye.focalLength)} mm.
            </p>
            <p data-eye-accommodation>
              Siliyer kas: {eye.ciliaryContracted ? "kasılı" : "gevşek"}; asıcı
              lif gerginliği: {eye.zonuleTaut ? "daha fazla" : "azalmış"};
              mercek: {eye.ciliaryContracted ? "daha bombeli" : "daha yassı"}.
              Asıcı lifler kas değildir.
            </p>
            <p>
              Göz bebeği:{" "}
              {eye.light === "bright" ? "küçük açıklık" : "büyük açıklık"}; bu
              kontrol odak gücünü değiştirmez. Ek güç:{" "}
              {fmt(eye.correctionDioptres)} diyoptri; yalnız bu eşdeğer modelin
              farkı, kişisel reçete değildir.
            </p>
            <p>
              Referans uyum her nesne uzaklığında 24 mm görüntü koşuluna
              ayarlanır. Diğer presetler yalnız eksen farkını değiştirir; gerçek
              miyopi, hipermetropi, astigmat ve presbiyopinin bütün nedenlerini
              temsil etmez.
            </p>
          </div>
        </>
      )}
      {lessonId === ids[3] && (
        <>
          <div className="bio016b-controls">
            <Range
              label="İşitme iletim adımı"
              value={ear.stage}
              min={0}
              max={7}
              onChange={(v) => update({ stage: v })}
            />
            <Select
              label="Başın hareket evresi"
              value={ear.motion}
              options={[
                ["start", "Dönmeye başla"],
                ["steady", "Uzun süre sabit dön"],
                ["stop", "Dönmeyi durdur"],
                ["linear", "Doğrusal ivme"],
                ["tilt", "Yerçekimine göre eğim"],
              ]}
              onChange={(v) => update({ motion: v })}
            />
            <Range
              label="Zar alanı (temsili mm²)"
              value={ear.tympanicArea}
              min={30}
              max={90}
              onChange={(v) => update({ area: v })}
            />
          </div>
          <p className="bio016b-key">
            İşitme yolunun üst sırası 1–4, alt sırası 5–8 olarak okunur; dönüş
            okları sırayı korur. Seçili adımın sinyal biçimi altta yazılıdır. Bu
            numaralar anatomik uzaklık veya süre değildir.
          </p>
          <svg
            className="bio016b-diagram"
            viewBox="0 0 600 380"
            role="img"
            aria-labelledby={`${uid}-ear-title`}
            data-bio016-diagram="ear"
          >
            <defs>
              <marker
                id={`${uid}-arrow`}
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0 0L7 3.5L0 7Z" fill="currentColor" />
              </marker>
            </defs>
            <title id={`${uid}-ear-title`}>
              İşitme yolu; seçili adım {ear.stage + 1}: {ear.stageName}.
            </title>
            <path
              d="M85 105H515V245H85"
              className="bio016b-muted-line"
              markerEnd={`url(#${uid}-arrow)`}
            />
            <path
              data-hearing-progress
              d={
                ear.stage < 4
                  ? `M85 105H${85 + ear.stage * 140}`
                  : `M85 105H515V245H${505 - (ear.stage - 4) * 140}`
              }
              className="bio016b-signal"
            />
            {hearing016Stages.map((name, i) => {
              const x = i < 4 ? 85 + i * 140 : 505 - (i - 4) * 140,
                y = i < 4 ? 105 : 245;
              return (
                <g
                  key={name}
                  data-hearing-node={i}
                  data-selected={ear.stage === i}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={29}
                    className={
                      ear.stage === i ? "bio016b-active" : "bio016b-cell"
                    }
                  />
                  <text x={x} y={y + 5} textAnchor="middle">
                    {i + 1}
                  </text>
                  <text x={x} y={y + 59} textAnchor="middle">
                    {
                      [
                        "Dış kulak",
                        "Zar",
                        "Kemikçikler",
                        "Oval pencere",
                        "Sıvı + zar",
                        "Tüylü hücre",
                        "Sinir",
                        "Korteks",
                      ][i]
                    }
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="bio016b-key">
            Denge şeması: solda yarım daire kanalı, sağda otolit organı. Sapma
            okları sıvının/otolitli tabakanın göreli etkisini gösterir; başın
            mutlak hızıyla aynı ok değildir.
          </p>
          <svg
            className="bio016b-diagram"
            viewBox="0 0 600 300"
            role="img"
            aria-labelledby={`${uid}-balance-title`}
            data-bio016-diagram="balance"
          >
            <title id={`${uid}-balance-title`}>
              Seçili baş hareket evresinde kanal sapması {ear.cupulaDirection},
              otolit sapması {ear.otolithShift}. Yönler nitel şemadır.
            </title>
            <path
              d="M180 190C50 190 60 45 170 50C290 55 290 190 190 190"
              className="bio016b-channel"
            />
            <path
              d="M160 210V165Q180 125 200 165V210Z"
              className="bio016b-soft"
            />
            <path
              data-cupula
              data-direction={ear.cupulaDirection}
              d={`M180 210Q${180 + ear.cupulaDirection * 35} 170 ${180 + ear.cupulaDirection * 45} 135`}
              className="bio016b-signal"
            />
            <path
              d="M350 180Q420 240 510 180V110H350Z"
              className="bio016b-soft"
            />
            <path
              d="M370 170V195M400 170V200M430 170V202M460 170V198M490 170V190"
              className="bio016b-line"
            />
            <rect
              data-otolith
              data-shift={ear.otolithShift}
              x={365 + ear.otolithShift * 24}
              y={130}
              width={125}
              height={32}
              rx={10}
              className="bio016b-otolith"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle
                key={i}
                cx={378 + ear.otolithShift * 24 + i * 22}
                cy={130}
                r={7}
                className="bio016b-cell"
              />
            ))}
            <text x={180} y={265} textAnchor="middle">
              Açısal değişim
            </text>
            <text x={430} y={265} textAnchor="middle">
              İvme / yerçekimi
            </text>
          </svg>
          <div data-model-result>
            <strong>
              İşitme adımı {ear.stage + 1}: {ear.stageName}.
            </strong>
            <p data-ear-signal>Sinyal biçimi: {ear.signal}.</p>
            <p data-ear-balance>
              {ear.cupulaDirection
                ? `Yarım daire kanalı: göreli sapma ${ear.cupulaDirection === -1 ? "başlangıç yönünde" : "başlangıca karşı yönde"}.`
                : ear.otolithShift
                  ? "Otolit organı: doğrusal ivme veya yerçekimine göre eğim etkisi."
                  : "Uzun sabit dönme kartı: göreli kanal sapması sönmüş kabul edilir; tüm denge sistemi kapanmaz."}
            </p>
            <p>{ear.condition}</p>
            <p data-ear-pressure>
              Zar basıncı 1/{fmt(ear.tympanicArea)}; oval alan basıncı 1/3
              N/mm². Basınç oranı: {fmt(ear.pressureRatio)}. Kuvvet 1 N olarak
              korunur; model güç veya enerji üretmez.
            </p>
            <ol>
              {hearing016Stages.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ol>
            <p>
              Östaki orta kulak-yutak basınç bağlantısıdır. Denge, görme ve
              kas-eklem bilgileriyle birlikte değerlendirilir. Model gerçek ses
              veya dönme deneyi gerektirmez.
            </p>
          </div>
        </>
      )}
      {lessonId === ids[4] && (
        <>
          <div className="bio016b-controls">
            <Select
              label="Büyüme plağının durumu"
              value={bone.age}
              options={[
                ["growing", "Açık: büyüme dönemi"],
                ["adult", "Kapalı: yetişkin örneği"],
              ]}
              onChange={(v) => update({ age: v })}
            />
            <Select
              label="İncelenen büyüme süreci"
              value={bone.process}
              options={[
                ["length", "Boyuna: büyüme plağı"],
                ["width", "Kalınlık: yüzey yapımı"],
              ]}
              onChange={(v) => update({ process: v })}
            />
            <Range
              label="Şematik süreç adımı"
              value={bone.step}
              min={0}
              max={4}
              onChange={(v) => update({ step: v })}
            />
            <Select
              label="Kemikte seçili bölüm"
              value={bone.tissue}
              options={[
                ["compact", "Sık kemik"],
                ["spongy", "Süngerimsi kemik"],
                ["marrow", "İlik boşluğu"],
              ]}
              onChange={(v) => update({ tissue: v })}
            />
          </div>
          <p className="bio016b-key">
            Alt uç y=350'de sabittir; boyuna büyümede üst uç yukarı gider.
            Kalınlık orta gövdenin genişliğidir. Kesit bütün kemiği aynı doku
            saymaz; epifiz plağı ile eklem yüzündeki kıkırdak ayrı gösterilir.
          </p>
          <svg
            className="bio016b-diagram"
            viewBox="0 0 600 420"
            role="img"
            aria-labelledby={`${uid}-bone-title`}
            data-bio016-diagram="bone"
          >
            <defs>
              <marker
                id={`${uid}-arrow`}
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0 0L7 3.5L0 7Z" fill="currentColor" />
              </marker>
            </defs>
            <title id={`${uid}-bone-title`}>
              Uzun kemik kesiti; uzunluk {bone.length}, kalınlık {bone.width}{" "}
              şema birimi; plak {bone.plateOpen ? "açık" : "kapalı"}.
            </title>
            <path
              data-bone-outline
              data-length={bone.length}
              data-width={bone.width}
              d={`M${300 - bone.width / 2} ${bone.top + 55}Q220 ${bone.top - 10} 300 ${bone.top}Q380 ${bone.top - 10} ${300 + bone.width / 2} ${bone.top + 55}V295Q380 365 300 350Q220 365 ${300 - bone.width / 2} 295Z`}
              className={
                bone.tissue === "compact" ? "bio016b-active" : "bio016b-bone"
              }
            />
            <rect
              data-bone-marrow
              x={300 - bone.width / 2 + 13}
              y={bone.top + 70}
              width={bone.width - 26}
              height={Math.max(10, bone.length - 130)}
              rx={10}
              className={
                bone.tissue === "marrow" ? "bio016b-active" : "bio016b-marrow"
              }
            />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <path
                  d={`M260 ${bone.top + 20 + i * 12}L300 ${bone.top + 8 + i * 12}L340 ${bone.top + 20 + i * 12}M260 ${326 - i * 12}L300 ${338 - i * 12}L340 ${326 - i * 12}`}
                  className={
                    bone.tissue === "spongy"
                      ? "bio016b-signal"
                      : "bio016b-trabecula"
                  }
                />
              </g>
            ))}
            <path
              data-growth-plate={bone.plateOpen}
              d={`M265 ${bone.top + 55}H335M265 295H335`}
              className={
                bone.plateOpen ? "bio016b-plate" : "bio016b-closed-plate"
              }
            />
            <path
              d={`M267 ${bone.top + 5}Q300 ${bone.top - 12} 333 ${bone.top + 5}M267 347Q300 365 333 347`}
              className="bio016b-cartilage"
            />
            <path
              d={`M${300 + bone.width / 2 + 7} ${bone.top + 75}V275`}
              className="bio016b-periosteum"
            />
            <path
              d={`M180 ${bone.top}V350M173 ${bone.top}H187M173 350H187M${300 - bone.width / 2} 390H${300 + bone.width / 2}`}
              className="bio016b-line"
            />
            <text x={165} y={(bone.top + 350) / 2} textAnchor="end">
              {bone.length}
            </text>
            <text x={300} y={412} textAnchor="middle">
              Kalınlık {bone.width}
            </text>
            <text x={410} y={bone.top + 52}>
              {bone.plateOpen ? "Açık plak" : "Plak izi"}
            </text>
            <path d={`M405 ${bone.top + 50}H345`} className="bio016b-line" />
            <text x={410} y={230}>
              Periost
            </text>
            <path
              d={`M405 225H${300 + bone.width / 2 + 10}`}
              className="bio016b-line"
            />
          </svg>
          <div data-model-result>
            <strong>
              Uzunluk: {bone.length}; kalınlık: {bone.width} şema birimi.
            </strong>
            <p data-bone-change>
              {bone.lengthChanged
                ? "Açık plakta boyuna değişim gösteriliyor."
                : bone.widthChanged
                  ? "Yapımın baskın olduğu kalınlık değişimi gösteriliyor."
                  : "Başlangıca göre bu iki boyutta değişim yok."}
            </p>
            <p>{bone.condition}</p>
            <p data-bone-tissue>
              {bone.tissue === "compact"
                ? "Sık kemik: osteonlar; Havers uzunlamasına, Volkmann yan bağlantı kanalları; osteositler lakün ve kanaliküllerle ilişkilidir."
                : bone.tissue === "spongy"
                  ? "Süngerimsi kemik: trabeküler ağ ve aralarda damar/ilik alanları. Aynı osteon düzeninin bulunmaması damarsızlık değildir."
                  : "İlik: kırmızı ilik kan hücresi yapımıyla, sarı ilik yağ depolamayla ilişkilidir; dağılım yaş ve bölgeye bağlıdır."}
            </p>
            <p>
              Periost yüzey yapımı ve onarımla; açık epifiz plağı boyuna
              büyümeyle ilişkilidir. Plak kapalıyken bütün kemik etkinliği
              bitmez. Üst ve alt uçtaki kıkırdak başlıkları büyüme plağıyla aynı
              yapı değildir.
            </p>
            <p>
              Tipik yetişkin sayımı: eksen 29+26+25=80; üyeler 64+62=126; toplam
              206. Bunlar bütün yaş ve kişilere zorunlu sabit sayılar değildir.
            </p>
          </div>
        </>
      )}
      {lessonId === ids[5] && (
        <>
          <div className="bio016b-controls">
            <Range
              label="Şematik eklem açısı (derece)"
              value={joint.angle}
              min={0}
              max={60}
              onChange={(v) => update({ angle: v })}
            />
            <Select
              label="Eklemde seçili yapı"
              value={joint.focus}
              options={[
                ["surface", "Eklem yüzü"],
                ["meniscus", "Menisküs örneği"],
                ["ligament", "Ligament"],
                ["tendon", "Tendon"],
                ["fluid", "Sinoviyal sıvı"],
              ]}
              onChange={(v) => update({ focus: v, guess: "" })}
            />
          </div>
          <p className="bio016b-key">
            Üst kemik sabit, alt kemik işaretli merkez çevresinde döner. Halka
            eklem kapsülünün büyütülmüş sınırıdır; çizgiler gerçek doku
            kalınlığı değildir. Sol bağlantı ligament, sağdaki kasla ilişkili
            bağlantı tendondur. Vurgu ve doku adı birlikte okunur.
          </p>
          <svg
            className="bio016b-diagram"
            viewBox="0 0 600 420"
            role="img"
            aria-labelledby={`${uid}-joint-title`}
            data-bio016-diagram="joint"
          >
            <defs>
              <marker
                id={`${uid}-arrow`}
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <path d="M0 0L7 3.5L0 7Z" fill="currentColor" />
              </marker>
            </defs>
            <title id={`${uid}-joint-title`}>
              Şematik eklem; açı {joint.angle} derece; seçili {joint.label}.
            </title>
            <ellipse
              cx={220}
              cy={200}
              rx={78}
              ry={75}
              className="bio016b-capsule"
            />
            <circle
              cx={220}
              cy={200}
              r={44}
              className={
                joint.focus === "fluid" ? "bio016b-active" : "bio016b-fluid"
              }
            />
            <path
              d="M202 45H238V145Q255 157 238 180H202Q185 157 202 145Z"
              className="bio016b-bone"
            />
            <g data-joint-moving transform={`rotate(${-joint.angle} 220 200)`}>
              <path
                d="M202 220Q185 243 202 255V355H238V255Q255 243 238 220Z"
                className="bio016b-bone"
              />
              <path
                d="M202 220Q220 212 238 220"
                className={
                  joint.focus === "surface"
                    ? "bio016b-signal"
                    : "bio016b-cartilage"
                }
              />
            </g>
            <path
              d="M202 180Q220 188 238 180"
              className={
                joint.focus === "surface"
                  ? "bio016b-signal"
                  : "bio016b-cartilage"
              }
            />
            <path
              data-joint-meniscus
              d="M190 200Q220 188 250 200Q220 210 190 200Z"
              className={
                joint.focus === "meniscus"
                  ? "bio016b-active"
                  : "bio016b-meniscus"
              }
            />
            <path
              data-joint-ligament
              d={`M${joint.ligamentA.x} ${joint.ligamentA.y}Q120 200 ${joint.ligamentB.x} ${joint.ligamentB.y}`}
              className={
                joint.focus === "ligament"
                  ? "bio016b-signal"
                  : "bio016b-ligament"
              }
            />
            <ellipse
              cx={310}
              cy={104}
              rx={23}
              ry={52}
              className="bio016b-muscle"
            />
            <path
              data-joint-tendon
              d={`M${joint.tendonStart.x} ${joint.tendonStart.y}Q385 205 ${joint.tendonEnd.x} ${joint.tendonEnd.y}`}
              className={
                joint.focus === "tendon" ? "bio016b-signal" : "bio016b-tendon"
              }
            />
            <circle
              data-ligament-anchor="upper"
              cx={joint.ligamentA.x}
              cy={joint.ligamentA.y}
              r={5}
              className="bio016b-anchor"
            />
            <circle
              data-ligament-anchor="lower"
              cx={joint.ligamentB.x}
              cy={joint.ligamentB.y}
              r={5}
              className="bio016b-anchor"
            />
            <circle
              data-tendon-anchor
              cx={joint.tendonEnd.x}
              cy={joint.tendonEnd.y}
              r={5}
              className="bio016b-anchor"
            />
            <circle cx={220} cy={200} r={4} className="bio016b-anchor" />
            <path d="M225 200H420" className="bio016b-muted-line" />
            <text x={425} y={205}>
              Merkez
            </text>
            <text x={375} y={80}>
              Kas
            </text>
            <text x={60} y={130}>
              Bağ
            </text>
          </svg>
          <div data-model-result>
            <strong>{joint.label}.</strong>
            <p>
              Şematik açı: {fmt(joint.angle)}°. Alt kemiğin merkez ekseni uç
              noktası: ({fmt(joint.lowerTip.x)}, {fmt(joint.lowerTip.y)}) SVG
              birimi.
            </p>
            <p data-joint-meaning>
              {joint.focus === "surface"
                ? "Tipik eklem yüzü hiyalin kıkırdaktır; dizin menisküsüyle aynı bölge değildir."
                : joint.focus === "meniscus"
                  ? "Diz menisküsü fibröz kıkırdaktır; eklem yüzünün tamamını fibröz yapmaz."
                  : joint.focus === "ligament"
                    ? "Ligamentin iki ucu kemiğe bağlıdır. Alt tutunma noktası alt kemikle birlikte döner."
                    : joint.focus === "tendon"
                      ? "Tendon kas kuvvetini kemiğe aktarır. Kas hücresi tendon hücresine dönüşmez."
                      : "Sinoviyal sıvı kayganlık ve kıkırdak beslenmesine katkı yapar; fizyolojik boşluk tasarım hatası değildir."}
            </p>
            <p>{joint.condition}</p>
            <p>
              Damarsız kıkırdak difüzyonla beslenir; her türde perikondrium
              zorunlu değildir. Kulak kepçesi elastik kıkırdak örneğidir.
              Modelde doku kalınlıkları ve aralıklar büyütülmüştür; kişiye özel
              biyomekanik sonuç üretmez.
            </p>
          </div>
        </>
      )}
      <div className="bio016b-prediction">
        <p>{question}</p>
        <Select
          label="Sonuç tahminin"
          value={validGuess ? s.guess : ""}
          options={[["", "Bir sonuç seç"], ...options]}
          onChange={(v) => update({ guess: v })}
        />
        <label htmlFor={`${uid}-reason`}>Modelden gerekçen</label>
        <textarea
          id={`${uid}-reason`}
          rows={3}
          maxLength={120}
          value={reason}
          onChange={(e) => update({ reason: e.target.value.slice(0, 120) })}
        />
        <p>
          Gerekçen en çok 120 karakter. Metin otomatik puanlanmaz; seçtiğin
          sonuç model kanıtıyla karşılaştırılır.
        </p>
        <button
          type="button"
          disabled={!validGuess || !reason.trim()}
          onClick={() => set({ reason, checked: true })}
        >
          Tahminimi karşılaştır
        </button>
        {s.checked && validGuess && (
          <div className="bio016b-feedback" role="status">
            <strong>
              {s.guess === expected
                ? "Tahminin bu koşullarla uyumlu."
                : "Tahminini kanıtla yeniden düşün."}
            </strong>
            <p>{evidence}</p>
            <p>Gerekçen: {reason}</p>
          </div>
        )}
      </div>
      <p className="bio016b-footnote">
        Bu keşifler puan, XP veya konu tamamlandı kaydı oluşturmaz. Seçim ve
        kısa gerekçen bu cihazda saklanır; bağımsız sorular ayrı bölümde
        çalışılır.
      </p>
    </section>
  );
}
