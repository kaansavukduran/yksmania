import { useId } from "react";
import { useExploration } from "./useExploration";
import {
  threeSetCount029,
  threeSetCount029Example,
  type ThreeSetCountInput,
} from "./threeSetCountSource029Model";

type Regions = ReturnType<typeof threeSetCount029>["regions"];
const positions = [
  { key: "onlyA", title: "Yalnız A", x: 115, y: 128 },
  { key: "onlyB", title: "Yalnız B", x: 365, y: 128 },
  { key: "onlyC", title: "Yalnız C", x: 240, y: 302 },
  { key: "onlyAB", title: "Yalnız A ve B", x: 240, y: 89 },
  { key: "onlyAC", title: "Yalnız A ve C", x: 168, y: 203 },
  { key: "onlyBC", title: "Yalnız B ve C", x: 312, y: 203 },
  { key: "abc", title: "Üçünde de", x: 240, y: 165 },
  { key: "outside", title: "Hiçbirinde", x: 404, y: 320 },
] as const satisfies readonly {
  key: keyof Regions;
  title: string;
  x: number;
  y: number;
}[];

const groups = [
  {
    name: "A",
    centerX: 164,
    centerY: 128,
    labelX: 102,
    labelY: 67,
    color: "var(--plot-blue)",
  },
  {
    name: "B",
    centerX: 316,
    centerY: 128,
    labelX: 378,
    labelY: 67,
    color: "var(--accent)",
  },
  {
    name: "C",
    centerX: 240,
    centerY: 232,
    labelX: 240,
    labelY: 340,
    color: "var(--mint)",
  },
];

function MembershipFigure({ regions }: { regions: Regions }) {
  const id = useId();
  return (
    <figure>
      <svg
        viewBox="0 0 480 385"
        style={{ width: "100%", height: "auto" }}
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
      >
        <title id={`${id}-title`}>Üç grubun Venn şeması</title>
        <desc id={`${id}-description`}>
          {positions
            .map(({ key, title }) => `${title} ${regions[key]} kişi.`)
            .join(" ")}
        </desc>
        <g aria-hidden="true">
          <rect
            x={12}
            y={5}
            width={456}
            height={369}
            rx={8}
            fill="none"
            stroke="var(--border)"
            strokeWidth={2}
          />
          {groups.map(({ name, centerX, centerY, color }) => (
            <circle
              key={name}
              cx={centerX}
              cy={centerY}
              r={116}
              fill={color}
              fillOpacity={0.12}
              stroke={color}
              strokeWidth={3}
            />
          ))}
          {groups.map(({ name, labelX, labelY }) => (
            <text
              key={name}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              fill="var(--text)"
              fontSize={24}
              fontWeight={700}
            >
              {name}
            </text>
          ))}
          <text x={22} y={43} fill="var(--text)" fontSize={22}>
            E
          </text>
          {positions.map(({ key, x, y }) => (
            <text
              key={key}
              x={x}
              y={y}
              textAnchor="middle"
              fill="var(--text)"
              fontSize={25}
              fontWeight={700}
            >
              {regions[key]}
            </text>
          ))}
        </g>
      </svg>
      <figcaption>
        Çizgiler üyelik bölgelerini ayırır. Kişi adedini her bölgedeki sayıdan
        oku.
      </figcaption>
    </figure>
  );
}

type Count = Exclude<keyof ThreeSetCountInput, "inclusivePairs">;

export function ThreeSetCountSource029Lab() {
  const [saved, update] = useExploration(
    "three-set-count-source-029",
    threeSetCount029Example,
  );
  const count = (key: Count) =>
    Number.isSafeInteger(saved[key]) && saved[key] >= 0 && saved[key] <= 100
      ? saved[key]
      : threeSetCount029Example[key];
  const input = {
    universe: count("universe"),
    a: count("a"),
    b: count("b"),
    c: count("c"),
    ab: count("ab"),
    ac: count("ac"),
    bc: count("bc"),
    abc: count("abc"),
    inclusivePairs: saved.inclusivePairs,
  };
  const model = threeSetCount029(input);
  const control = (key: Count, label: string) => (
    <label className="field">
      {label}
      <strong aria-hidden="true">{input[key]} kişi</strong>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={input[key]}
        aria-label={label}
        aria-valuetext={`${input[key]} kişi`}
        onChange={(event) =>
          update({ [key]: Number(event.currentTarget.value) })
        }
      />
    </label>
  );
  const pair = (first: string, second: string) =>
    `${input.inclusivePairs ? "" : "Yalnız "}${first} ve ${second} grubunda`;

  return (
    <details data-model="source029-three-set-count">
      <summary>Üç grupta kaç kişi var?</summary>
      <p>
        Önce üç grupta birden bulunanları yerleştir. Sonra yalnız iki gruba
        katılanları bul.
      </p>
      <label className="field">
        <input
          type="checkbox"
          checked={input.inclusivePairs}
          onChange={(event) =>
            update({ inclusivePairs: event.currentTarget.checked })
          }
        />
        İkili sayılara üç grupta bulunanlar da girsin
      </label>
      <div className="f014m-controls">
        {control("abc", "Üç grupta birden")}
        {control("ab", pair("A", "B"))}
        {control("ac", pair("A", "C"))}
        {control("bc", pair("B", "C"))}
      </div>
      <details>
        <summary>Evren ve grup toplamlarını değiştir</summary>
        <div className="f014m-controls">
          {control("universe", "Evrendeki toplam kişi")}
          {control("a", "A grubundaki toplam kişi")}
          {control("b", "B grubundaki toplam kişi")}
          {control("c", "C grubundaki toplam kişi")}
        </div>
      </details>
      <button
        type="button"
        className="secondary"
        onClick={() => update(threeSetCount029Example)}
      >
        Örneğe dön
      </button>
      <div className="f014m-result" role="status">
        <p>
          {input.inclusivePairs
            ? "Yalnız iki grubu sayarken verilen her ikiliden üç grubun ortak kişilerini çıkar."
            : "Verilen ikililer tam iki gruba katılanları gösteriyor. Bu sayıları doğrudan kullan."}
        </p>
        {model.invalid.length > 0 ? (
          <>
            <p>
              <strong>Bu sayılar aynı grupları tanımlayamıyor.</strong>
            </p>
            <ul>
              {positions
                .filter(({ key }) => model.invalid.includes(key))
                .map(({ key, title }) => (
                  <li key={key}>
                    {key === "outside"
                      ? "Evren toplamı en az birleşim kadar olmalı."
                      : `${title} bölgesinin hesabı sıfırın altına düştü. Bu bölgeye katılanları belirleyen toplamları ve kesişimleri kontrol et.`}
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <>
            <p>
              <strong>Birleşim {model.union} kişi.</strong> Tam bir grupta{" "}
              {model.exactlyOne}, tam iki grupta {model.exactlyTwo}, hiçbirinde{" "}
              {model.regions.outside} kişi.
            </p>
            <p>
              Birleşim ve dışarıdaki kişiler toplamı {model.union} +{" "}
              {model.regions.outside} = {input.universe}.
            </p>
            <ul>
              {positions.map(({ key, title }) => (
                <li key={key}>
                  {title} {model.regions[key]} kişi.
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {model.invalid.length === 0 && (
        <MembershipFigure regions={model.regions} />
      )}
    </details>
  );
}
