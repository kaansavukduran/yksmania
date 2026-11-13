import { useEffect, useState } from "react";
import {
  getCatalogue,
  getDocuments,
  type LocalDocument,
} from "./domain/storage";
import type { SourceCatalogue } from "./domain/catalogue";
export const libraryChanged = () =>
  window.dispatchEvent(new Event("yksmania-library-change"));
export function useLibrary() {
  const [documents, setDocuments] = useState<LocalDocument[]>([]);
  const [catalogue, setCatalogue] = useState<SourceCatalogue | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let live = true;
    const load = () => {
      void Promise.all([getDocuments(), getCatalogue()])
        .then(([d, c]) => {
          if (live) {
            setDocuments(d);
            setCatalogue(c);
            setError(false);
          }
        })
        .catch(() => {
          if (live) setError(true);
        })
        .finally(() => {
          if (live) setLoading(false);
        });
    };
    load();
    window.addEventListener("yksmania-library-change", load);
    return () => {
      live = false;
      window.removeEventListener("yksmania-library-change", load);
    };
  }, []);
  return { documents, catalogue, error, loading, reload: libraryChanged };
}
