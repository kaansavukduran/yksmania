import { lazy, Suspense } from "react";
import { useApp } from "../store";
const Cell = lazy(() => import("./CellExplorer"));
const Periodic = lazy(() => import("./PeriodicExplorer"));
const Geometry = lazy(() => import("./GeometryExplorer"));
const Compact = lazy(() => import("./CompactExplorers"));
export function VisualLab({ id }: { id: string }) {
  const { t } = useApp();
  return (
    <Suspense fallback={<p role="status">{t("loading")}</p>}>
      {id === "hucre-organelleri" ? (
        <Cell />
      ) : id === "periyodik-sistem" ? (
        <Periodic />
      ) : id === "alan-donusumleri" ? (
        <Geometry />
      ) : (
        <Compact id={id} />
      )}
    </Suspense>
  );
}
