import { useId, useRef, useState, type ReactNode } from "react";
import "./sourceQuestionFigure.css";

export type SourceMathNode =
  | { kind: "text"; text: string }
  | { kind: "row"; items: readonly SourceMathNode[] }
  | { kind: "fraction"; numerator: SourceMathNode; denominator: SourceMathNode }
  | { kind: "power"; base: SourceMathNode; exponent: SourceMathNode }
  | { kind: "subscript"; base: SourceMathNode; subscript: SourceMathNode }
  | { kind: "absolute"; value: SourceMathNode }
  | { kind: "root"; value: SourceMathNode; degree?: SourceMathNode };

type Coordinate = readonly [number, number];
type AngleArc = {
  center: Coordinate;
  radius: number;
  start: number;
  degrees: number;
};
type FigureDescription = { title: string; alt: string; caption?: string | null };
export type SourceQuestionFigureSpec = FigureDescription &
  (
    | { kind: "image"; src: string; width: number; height: number; assetSHA256?: string }
    | { kind: "math"; expression: SourceMathNode }
    | { kind: "table"; headers: readonly string[]; rows: readonly (readonly string[])[] }
    | {
        kind: "geometry";
        viewBox: readonly [number, number, number, number];
        grid?: { from: Coordinate; to: Coordinate; cell: number };
        segments?: readonly {
          from: Coordinate;
          to: Coordinate;
          emphasis?: boolean;
          dashed?: boolean;
        }[];
        points?: readonly {
          at: Coordinate;
          label?: string;
          open?: boolean;
          emphasis?: boolean;
        }[];
        circles?: readonly {
          center: Coordinate;
          radius: number;
          emphasis?: boolean;
        }[];
        arcs?: readonly AngleArc[];
        labels?: readonly {
          at: Coordinate;
          text: string;
          anchor?: "start" | "middle" | "end";
        }[];
      }
  );

function MathExpression({ node }: { node: SourceMathNode }): ReactNode {
  switch (node.kind) {
    case "text":
      return <span>{node.text}</span>;
    case "row":
      return (
        <span className="source-math-row">
          {node.items.map((item, i) => (
            <MathExpression key={i} node={item} />
          ))}
        </span>
      );
    case "fraction":
      return (
        <span className="source-math-fraction">
          <span>
            <MathExpression node={node.numerator} />
          </span>
          <span>
            <MathExpression node={node.denominator} />
          </span>
        </span>
      );
    case "power":
      return (
        <span className="source-math-script">
          <MathExpression node={node.base} />
          <sup>
            <MathExpression node={node.exponent} />
          </sup>
        </span>
      );
    case "subscript":
      return (
        <span className="source-math-script">
          <MathExpression node={node.base} />
          <sub>
            <MathExpression node={node.subscript} />
          </sub>
        </span>
      );
    case "absolute":
      return (
        <span className="source-math-absolute">
          <MathExpression node={node.value} />
        </span>
      );
    case "root":
      return (
        <span className="source-math-root">
          {node.degree && (
            <sup>
              <MathExpression node={node.degree} />
            </sup>
          )}
          <span aria-hidden="true">√</span>
          <span className="source-math-radicand">
            <MathExpression node={node.value} />
          </span>
        </span>
      );
  }
}

function localImage(src: string) {
  const value = src.trim();
  if (!value) return false;
  if (/^data:image\/(?:png|jpeg|webp|gif|svg\+xml)[;,]/i.test(value))
    return true;
  if (!/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return true;
  // Vite resolves relative-base imports to an absolute URL at runtime. Accept
  // this application's own assets on web, Capacitor and the desktop protocol.
  // Compare protocol and host explicitly: custom-protocol origins can be null.
  if (typeof location === "undefined") return false;
  try {
    const image = new URL(value, location.href);
    return (
      ["http:", "https:", "yksmania:"].includes(image.protocol) &&
      image.protocol === location.protocol &&
      image.host === location.host &&
      !image.username &&
      !image.password
    );
  } catch {
    return false;
  }
}

function ImageFigure({
  figure,
}: {
  figure: Extract<SourceQuestionFigureSpec, { kind: "image" }>;
}) {
  const descriptionId = useId();
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const [zoom, setZoom] = useState(1);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  if (!validImageFigure(figure))
    return <p className="source-figure-fallback">{figure.alt}</p>;
  return (
    <>
      {failed ? (
        <div className="source-figure-fallback" role="status">
          <p>Görsel yüklenemedi. {figure.alt}</p>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setFailed(false);
              setRetry((v) => v + 1);
            }}
          >
            Görseli yeniden dene
          </button>
        </div>
      ) : (
        <button
          type="button"
          ref={opener}
          className="source-figure-open"
          aria-label={`${figure.title}: görseli büyüt`}
          aria-describedby={descriptionId}
          onClick={() => {
            dialog.current?.showModal();
            closer.current?.focus();
          }}
        >
          <img
            key={retry}
            src={figure.src}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            onError={() => setFailed(true)}
          />
          <span className="source-figure-zoom-label">Görseli büyüt</span>
        </button>
      )}
      <span id={descriptionId} className="sr-only">
        {figure.alt}
      </span>
      <dialog
        ref={dialog}
        className="source-figure-dialog"
        aria-label={figure.title}
        onClose={() => {
          setZoom(1);
          opener.current?.focus();
        }}
        onClick={(event) => {
          const element = dialog.current;
          if (element && event.target === element) element.close();
        }}
      >
        <div className="source-figure-dialog-controls">
          <button
            type="button"
            className="secondary"
            aria-label="Görseli küçült"
            disabled={zoom <= 1}
            onClick={() => setZoom((v) => Math.max(1, v - 0.5))}
          >
            −
          </button>
          <output aria-label="Görsel yakınlaştırması">%{zoom * 100}</output>
          <button
            type="button"
            className="secondary"
            aria-label="Görseli büyüt"
            disabled={zoom >= 3}
            onClick={() => setZoom((v) => Math.min(3, v + 0.5))}
          >
            +
          </button>
          <button
            type="button"
            className="secondary"
            ref={closer}
            onClick={() => dialog.current?.close()}
          >
            Kapat
          </button>
        </div>
        <div
          className="source-figure-scroll"
          tabIndex={0}
          aria-label="Büyütülmüş görsel. Yön tuşlarıyla kaydırabilirsin."
        >
          <img
            src={figure.src}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            style={{ width: `${zoom * 100}%` }}
          />
        </div>
      </dialog>
    </>
  );
}

function validImageFigure(figure: Extract<SourceQuestionFigureSpec, { kind: "image" }>) {
  return localImage(figure.src) &&
    Number.isFinite(figure.width) && Number.isFinite(figure.height) &&
    figure.width > 0 && figure.height > 0;
}

function geometryIsFinite(
  figure: Extract<SourceQuestionFigureSpec, { kind: "geometry" }>,
) {
  const finitePoint = (point: Coordinate) =>
    point.length === 2 && point.every(Number.isFinite);
  return (
    figure.viewBox.every(Number.isFinite) &&
    figure.viewBox[2] > 0 &&
    figure.viewBox[3] > 0 &&
    (!figure.grid ||
      (finitePoint(figure.grid.from) && finitePoint(figure.grid.to) &&
        figure.grid.to[0] > figure.grid.from[0] && figure.grid.to[1] > figure.grid.from[1] &&
        Number.isFinite(figure.grid.cell) && figure.grid.cell > 0)) &&
    (figure.segments ?? []).every(
      (line) => finitePoint(line.from) && finitePoint(line.to),
    ) &&
    (figure.points ?? []).every((point) => finitePoint(point.at)) &&
    (figure.circles ?? []).every(
      (circle) =>
        finitePoint(circle.center) &&
        Number.isFinite(circle.radius) &&
        circle.radius > 0,
    ) &&
    (figure.arcs ?? []).every(
      (arc) =>
        finitePoint(arc.center) &&
        Number.isFinite(arc.radius) &&
        arc.radius > 0 &&
        Number.isFinite(arc.start) &&
        arc.degrees > 0 &&
        arc.degrees < 360,
    ) &&
    (figure.labels ?? []).every((label) => finitePoint(label.at))
  );
}

function angleArc(arc: AngleArc) {
  const point = (degrees: number) => {
    const angle = (degrees * Math.PI) / 180;
    return `${arc.center[0] + arc.radius * Math.cos(angle)} ${arc.center[1] - arc.radius * Math.sin(angle)}`;
  };
  return `M ${point(arc.start)} A ${arc.radius} ${arc.radius} 0 ${Number(arc.degrees > 180)} 0 ${point(arc.start + arc.degrees)}`;
}

export function SourceQuestionFigure({
  figure,
  staticImage = false,
}: {
  figure: SourceQuestionFigureSpec;
  staticImage?: boolean;
}) {
  const uid = useId().replaceAll(":", "");
  if (!figure.alt.trim()) return null;
  return (
    <figure className="source-question-figure" aria-label={figure.title}>
      {figure.kind === "image" ? (
        staticImage ? (
          validImageFigure(figure) ? (
            <img className="source-figure-static" src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} />
          ) : <p className="source-figure-fallback">{figure.alt}</p>
        ) : <ImageFigure key={figure.src} figure={figure} />
      ) : figure.kind === "table" ? (
        <div
          className="source-figure-table-scroll"
          role="region"
          aria-label={figure.title}
          tabIndex={staticImage ? undefined : 0}
        >
          <table className="source-figure-table">
            <caption>{figure.alt}</caption>
            <thead>
              <tr>{figure.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr>
            </thead>
            <tbody>
              {figure.rows.map(([label, ...values]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {values.map((value, i) => <td key={i}>{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : figure.kind === "math" ? (
        <div
          className="source-math-layout"
          role="math"
          aria-label={figure.alt}
          tabIndex={0}
        >
          <span aria-hidden="true">
            <MathExpression node={figure.expression} />
          </span>
        </div>
      ) : geometryIsFinite(figure) ? (
        <svg
          className="source-figure-drawing"
          viewBox={figure.viewBox.join(" ")}
          role="img"
          aria-labelledby={`${uid}-title`}
          aria-describedby={`${uid}-description`}
        >
          <title id={`${uid}-title`}>{figure.title}</title>
          <desc id={`${uid}-description`}>{figure.alt}</desc>
          {figure.grid && (
            <>
              <defs>
                <pattern id={`${uid}-grid`} patternUnits="userSpaceOnUse" x={figure.grid.from[0]} y={figure.grid.from[1]} width={figure.grid.cell} height={figure.grid.cell}>
                  <path className="source-figure-grid-line" d={`M ${figure.grid.cell} 0 H 0 V ${figure.grid.cell}`} />
                </pattern>
              </defs>
              <rect
                x={figure.grid.from[0]}
                y={figure.grid.from[1]}
                width={figure.grid.to[0] - figure.grid.from[0]}
                height={figure.grid.to[1] - figure.grid.from[1]}
                fill={`url(#${uid}-grid)`}
              />
            </>
          )}
          {(figure.segments ?? []).map((line, i) => (
            <line
              key={`line-${i}`}
              x1={line.from[0]}
              y1={line.from[1]}
              x2={line.to[0]}
              y2={line.to[1]}
              className={line.dashed ? "source-figure-guide" : line.emphasis ? "emphasized" : undefined}
            />
          ))}
          {(figure.circles ?? []).map((circle, i) => (
            <circle
              key={`circle-${i}`}
              cx={circle.center[0]}
              cy={circle.center[1]}
              r={circle.radius}
              className={circle.emphasis ? "emphasized" : undefined}
            />
          ))}
          {(figure.arcs ?? []).map((arc, i) => (
            <path
              key={`arc-${i}`}
              className="source-figure-arc emphasized"
              d={angleArc(arc)}
            />
          ))}
          {(figure.points ?? []).map((point, i) => (
            <g key={`point-${i}`}>
              <circle
                className={`source-figure-point ${point.open ? "open" : ""} ${point.emphasis ? "emphasized" : ""}`}
                cx={point.at[0]}
                cy={point.at[1]}
                r={4}
              />
              {point.label && (
                <text x={point.at[0]} y={point.at[1] - 12} textAnchor="middle">
                  {point.label}
                </text>
              )}
            </g>
          ))}
          {(figure.labels ?? []).map((label, i) => (
            <text
              key={`label-${i}`}
              x={label.at[0]}
              y={label.at[1]}
              textAnchor={label.anchor ?? "middle"}
            >
              {label.text}
            </text>
          ))}
        </svg>
      ) : (
        <p className="source-figure-fallback">{figure.alt}</p>
      )}
      {figure.caption !== null && (figure.caption || figure.kind === "geometry") && (
        <figcaption>{figure.caption ?? figure.alt}</figcaption>
      )}
    </figure>
  );
}
