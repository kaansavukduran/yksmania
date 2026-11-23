import { useId } from "react";
import { r035, r035Text, type R035 } from "./rationalSource035Model";
import { useExploration } from "./useExploration";
import { Source010ContextExamples } from "./Source010ContextExamples";
import { DiagramLegend } from "./Source036DiagramLegend";
import {
  checkEq036SystemPoint,
  eliminateEq036System,
  graphEq036System,
  substituteEq036System,
  type Eq036SystemPoint,
  type Eq036SystemReduction,
} from "./linearSystemsSource036Model";
import "./linearSystemsSource010.css";

const defaults = {
  firstX: 1, firstY: 1, firstTotal: 5,
  secondX: 1, secondY: -1, secondTotal: 1,
  example: "intersection", method: "graph", variable: "y", row: 0, k: 2,
};
const examples = [
  { id: "intersection", label: "Kesişen doğrular", values: [1, 1, 5, 1, -1, 1] },
  { id: "substitution", label: "Yerine koyma örneği", values: [1, 1, 7, 2, -1, 5] },
  { id: "elimination", label: "Yok etme örneği", values: [2, 3, 12, 3, -2, 5] },
  { id: "coincident", label: "Aynı doğru", values: [1, 1, 4, 2, 2, 8] },
  { id: "parallel", label: "Paralel doğrular", values: [1, 1, 4, 2, 2, 9] },
] as const;
const fields = [
  [["firstX", "x katsayısı"], ["firstY", "y katsayısı"], ["firstTotal", "Sağdaki sayı"]],
  [["secondX", "x katsayısı"], ["secondY", "y katsayısı"], ["secondTotal", "Sağdaki sayı"]],
] as const;
const methods = [
  ["graph", "Grafik"],
  ["eliminate", "Yok etme"],
  ["substitute", "Yerine koyma"],
] as const;
const frame = { minX: -8, maxX: 8, minY: -8, maxY: 8 };
const plot = (value: R035) => Number(value.n) / Number(value.d);
const px = (value: R035) => 200 + 20 * plot(value);
const py = (value: R035) => 200 - 20 * plot(value);
const grid = Array.from({ length: 17 }, (_, i) => 40 + 20 * i);
type Graph = ReturnType<typeof graphEq036System>;
type Equation = Graph["solution"]["rows"][number];
const equation = ([a, b, c]: Equation) => {
  const negativeY = b.n < 0n;
  const absY = { ...b, n: negativeY ? -b.n : b.n };
  return `${r035Text(a)}x ${negativeY ? "−" : "+"} ${r035Text(absY)}y = ${r035Text(c)}`;
};
const coordinates = ({ x, y }: { x: R035; y: R035 }) =>
  `(${r035Text(x)}, ${r035Text(y)})`;
const explanations: Record<Graph["solution"]["kind"], string> = {
  unique: "İki doğru bir noktada kesişir. Bu noktanın x ve y değerleri iki denklemi de sağlar.",
  coincident: "İki denklem aynı doğruyu verir. Doğru üzerindeki bütün noktalar iki denklemi de sağlar.",
  parallel: "Doğrular paralel ve ayrıdır. İkisini de sağlayan nokta yoktur.",
  "one-line": "Denklemlerden biri 0 = 0 olur. Diğer denklemin doğrusundaki bütün noktalar çözümdür.",
  "whole-plane": "İki denklem de 0 = 0 olur. Her (x, y) çifti ikisini de sağlar.",
  inconsistent: "Denklemlerden biri sıfırın farklı bir sayıya eşit olmasını ister. Çözüm yoktur.",
};

function graphRowText(graph: Graph, index: 0 | 1): string {
  const row = graph.rows[index];
  switch (row.kind) {
    case "segment": {
      const [start, end] = row.points;
      const style = index === 0 ? "Kesintisiz" : "Kesik";
      return `${style} çizgi ${coordinates(start)} ve ${coordinates(end)} noktalarından geçiyor.`;
    }
    case "point":
      return `Doğru, grafiğin köşesine ${coordinates(row.points[0])} noktasında değiyor ve bu pencerenin dışında devam ediyor.`;
    case "offscreen":
      return "Doğru, gösterilen alanın dışında.";
    case "identity":
      return "0 = 0 biçiminde. Düzlemdeki bütün noktalar bu denklemi sağlar.";
    case "contradiction":
      return `0 = ${r035Text(graph.solution.rows[index][2])} biçiminde. Hiçbir nokta bu denklemi sağlamaz.`;
  }
}

function ReductionSteps({ reduction, original, point }: {
  reduction: Eq036SystemReduction;
  original: Equation;
  point: Eq036SystemPoint | null;
}) {
  const { variable, coefficient, constant } = reduction;
  const other = variable === "x" ? "y" : "x";
  if (reduction.kind !== "fixed") {
    return reduction.kind === "identity"
      ? <p>0 = 0 kaldı. Bu adım yeni bir koşul koymaz.</p>
      : <p>0 = {r035Text(constant)} kaldı. Bu eşitlik mümkün olmadığı için ortak çözüm yoktur.</p>;
  }
  return (
    <>
      <p>({r035Text(coefficient)}){variable} = {r035Text(constant)}. Her iki yanı {r035Text(coefficient)} ile böl. {variable} = {r035Text(reduction.value)}.</p>
      {point && <p>Bu değeri {equation(original)} denkleminde yerine koy. {other} = {r035Text(point[other])} çıkar.</p>}
    </>
  );
}

function SystemGraph({ graph }: { graph: Graph }) {
  const title = useId();
  const description = useId();
  const crossing = graph.intersection;
  return (
    <figure className="f036-system-figure">
      <svg viewBox="0 0 400 400" role="img" aria-labelledby={`${title} ${description}`}>
        <title id={title}>İki denklemin koordinat düzlemindeki karşılığı</title>
        <desc id={description}>
          {graph.solution.rows.map(equation).join(". ")}. {explanations[graph.solution.kind]}
          {crossing && ` Kesişim ${coordinates(crossing.point)}${crossing.visible ? "." : " ve gösterilen alanın dışında."}`}
        </desc>
        {grid.map((position) => (
          <path key={position} className="f036-system-grid" d={`M40 ${position}H360M${position} 40V360`} />
        ))}
        <path className="f036-axis" d="M40 200H360M200 40V360" />
        <text x="366" y="211">x</text>
        <text x="211" y="31">y</text>
        <text x="173" y="225">0</text>
        {graph.rows.map((row, index) => {
          const tone = index === 0 ? "a" : "b";
          if (row.kind === "point") {
            const [point] = row.points;
            return <circle key={tone} className={`f036-dot-${tone}`} cx={px(point.x)} cy={py(point.y)} r="5" />;
          }
          if (row.kind !== "segment") return null;
          const [start, end] = row.points;
          return (
            <line key={tone} className={`f036-system-line f036-system-line-${tone}`}
              x1={px(start.x)} y1={py(start.y)} x2={px(end.x)} y2={py(end.y)} />
          );
        })}
        {crossing?.visible && (
          <circle className="f036-system-intersection"
            cx={px(crossing.point.x)} cy={py(crossing.point.y)} r="7" />
        )}
      </svg>
      <figcaption>
        Her kare bir birim. Eksenlerde −8 ile 8 arası gösteriliyor.
        <DiagramLegend entries={[
          { label: "Birinci denklem", value: graphRowText(graph, 0), tone: "a" },
          { label: "İkinci denklem", value: graphRowText(graph, 1), tone: "b" },
        ]} />
        {crossing && !crossing.visible && ` Kesişim ${coordinates(crossing.point)} gösterilen alanın dışında.`}
      </figcaption>
    </figure>
  );
}

export function LinearSystemsSource010Panel() {
  const uid = useId();
  const [values, set] = useExploration("linear-systems-source-010", defaults);
  const coefficient = (key: keyof typeof defaults) => {
    const value = Number(values[key]);
    return Number.isSafeInteger(value) ? Math.max(-40, Math.min(40, value)) : 0;
  };
  const k = Math.max(-4, Math.min(4, coefficient("k")));
  const system = values.example === "parameter"
    ? [[k, 2, 6], [2, k, 6]] as const
    : [
        [coefficient("firstX"), coefficient("firstY"), coefficient("firstTotal")],
        [coefficient("secondX"), coefficient("secondY"), coefficient("secondTotal")],
      ] as const;
  const graph = graphEq036System(system, frame);
  const { solution } = graph;
  const check = solution.point ? checkEq036SystemPoint(system, solution.point) : null;
  const method = methods.some(([id]) => id === values.method) ? values.method : "graph";
  const variable = values.variable === "x" ? "x" : "y";
  const row = values.row === 1 ? 1 : 0;
  const elimination = method === "eliminate" ? eliminateEq036System(system, variable) : null;
  const substitution = method === "substitute" ? substituteEq036System(system, row, variable) : null;
  const parameterReduction = values.example === "parameter" && method === "graph"
    ? eliminateEq036System(system, "x").reduction
    : null;

  function selectExample(id: string) {
    const example = examples.find((item) => item.id === id);
    if (!example) {
      set({ example: id, method: id === "parameter" ? "graph" : method });
      return;
    }
    const [firstX, firstY, firstTotal, secondX, secondY, secondTotal] = example.values;
    const exampleMethod = id === "substitution" ? "substitute" : id === "elimination" ? "eliminate" : "graph";
    set({ example: id, method: exampleMethod, variable: "y", row: 0,
      firstX, firstY, firstTotal, secondX, secondY, secondTotal });
  }

  return (
    <div className="f036-panel f036-system" data-mode="system">
      <h3>İki denklemi birlikte çöz</h3>
      <p>İki denklemde de x ve y aynı sayıları temsil eder. Bir nokta çözümse iki eşitliği de sağlar.</p>
      <label className="f036-system-control">
        Örnek
        <select value={values.example} onChange={(event) => selectExample(event.currentTarget.value)}>
          {examples.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
          <option value="parameter">İki denklemde ortak k</option>
          <option value="custom">Kendi denklemlerim</option>
        </select>
      </label>
      {values.example === "parameter" ? (
        <div className="f036-range">
          <div>
            <label htmlFor={`${uid}-shared-k`}>Ortak k katsayısı</label>
            <output htmlFor={`${uid}-shared-k`}>{k}</output>
          </div>
          <input id={`${uid}-shared-k`} type="range" min="-4" max="4" value={k}
            onChange={(event) => set({ k: event.currentTarget.valueAsNumber })} />
        </div>
      ) : (
        <div className="f036-system-fields">
          {fields.map((group, index) => (
            <fieldset key={index}>
              <legend>{index === 0 ? "Birinci denklem" : "İkinci denklem"}</legend>
              {group.map(([key, label]) => (
                <div className="f036-range" key={key}>
                  <div>
                    <label htmlFor={`${uid}-${key}`}>{label}</label>
                    <output htmlFor={`${uid}-${key}`}>{coefficient(key)}</output>
                  </div>
                  <input id={`${uid}-${key}`} type="range" min="-40" max="40" value={coefficient(key)}
                    onChange={(event) => set({ [key]: event.currentTarget.valueAsNumber, example: "custom" })} />
                </div>
              ))}
            </fieldset>
          ))}
        </div>
      )}
      <ol className="f036-system-equations" aria-label="Denklemler">
        {solution.rows.map((formula, index) => <li key={index}>{equation(formula)}</li>)}
      </ol>
      <div className="f036-actions" role="group" aria-label="Çözüm yöntemi">
        {methods.map(([id, label]) => (
          <button key={id} type="button" className="secondary" aria-pressed={method === id}
            onClick={() => set({ method: id })}>{label}</button>
        ))}
      </div>
      {method === "graph" && <SystemGraph graph={graph} />}
      {parameterReduction && parameterReduction.kind !== "fixed" && (
        <ReductionSteps reduction={parameterReduction} original={solution.rows[0]} point={null} />
      )}
      {method !== "graph" && (
        <label className="f036-system-control">
          {method === "substitute" ? "Yalnız bırakılan değişken" : "Yok edilen değişken"}
          <select value={variable} onChange={(event) => set({ variable: event.currentTarget.value })}>
            <option value="x">x</option><option value="y">y</option>
          </select>
        </label>
      )}
      {elimination && (
        <div>
          {elimination.kind === "combined" && elimination.multipliers && elimination.combinedRow ? (
            <p>Birinci denklemin iki yanını {r035Text(r035(elimination.multipliers[0]))} ile, ikincinin iki yanını {r035Text(r035(elimination.multipliers[1]))} ile çarp. Tarafları toplayınca {equation(elimination.combinedRow)} kalır.</p>
          ) : (
            <p>{elimination.kind === "absent" ? `${variable} iki denklemde de yok.` : `Denklemlerden biri zaten ${variable} içermiyor.`}</p>
          )}
          {elimination.reduction && elimination.retainedRowIndex !== null && (
            <ReductionSteps reduction={elimination.reduction}
              original={solution.rows[elimination.retainedRowIndex]} point={elimination.point} />
          )}
        </div>
      )}
      {substitution && (
        <div>
          <label className="f036-system-control">
            Değişkeni yalnız bırakacağın denklem
            <select value={row} onChange={(event) => set({ row: Number(event.currentTarget.value) })}>
              <option value="0">Birinci denklem</option><option value="1">İkinci denklem</option>
            </select>
          </label>
          {substitution.isolated && substitution.reduced ? (
            <p>{variable} için {r035Text(substitution.isolated.constant)} + ({r035Text(substitution.isolated.otherCoefficient)}){substitution.reduced.variable} elde edilir. Bu ifadeyi diğer denklemde yerine koy.</p>
          ) : (
            <p>Bu denklemde {variable} katsayısı sıfır. Diğer denklemi veya değişkeni seç.</p>
          )}
          {substitution.reduction && (
            <ReductionSteps reduction={substitution.reduction} original={solution.rows[row]} point={substitution.point} />
          )}
        </div>
      )}
      <div data-model-result aria-live="polite">
        <p>{explanations[solution.kind]}</p>
        {solution.point && <p><strong>Çözüm (x, y) = {coordinates(solution.point)}</strong></p>}
        {check && <p>Kontrol. Birinci denklem {r035Text(check.rows[0].left)} = {r035Text(check.rows[0].right)}, ikinci denklem {r035Text(check.rows[1].left)} = {r035Text(check.rows[1].right)}.</p>}
      </div>
      <Source010ContextExamples />
    </div>
  );
}
