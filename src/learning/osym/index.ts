// Üretilmiş dosya: elle düzenleme. İşlenen kitapçık eklendikçe yeniden üretilir.
import type { OsymRow } from "../../domain/osymPatterns";
import b2024_ayt from "./2024-ayt.json" with { type: "json" };
import b2024_tyt from "./2024-tyt.json" with { type: "json" };
import b2025_ayt from "./2025-ayt.json" with { type: "json" };
import b2025_tyt from "./2025-tyt.json" with { type: "json" };
import b2026_ayt from "./2026-ayt.json" with { type: "json" };
import b2026_tyt from "./2026-tyt.json" with { type: "json" };

/*
 * Geçmiş ÖSYM kitapçıklarının soru soru konu ve kalıp çözümlemesi. Soru metni
 * içermez. Açık içe aktarım: bu modül Vite dışında (testler) da yüklenir.
 */
export const osymRows = [...b2024_ayt, ...b2024_tyt, ...b2025_ayt, ...b2025_tyt, ...b2026_ayt, ...b2026_tyt] as OsymRow[];
export const osymBooklets = ["2024-ayt", "2024-tyt", "2025-ayt", "2025-tyt", "2026-ayt", "2026-tyt"];
