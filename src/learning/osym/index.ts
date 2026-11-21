// Üretilmiş dosya: elle düzenleme. İşlenen kitapçık eklendikçe yeniden üretilir.
import type { OsymRow } from "../../domain/osymPatterns";
import b2018_ayt from "./2018-ayt.json" with { type: "json" };
import b2018_tyt from "./2018-tyt.json" with { type: "json" };
import b2019_ayt from "./2019-ayt.json" with { type: "json" };
import b2019_tyt from "./2019-tyt.json" with { type: "json" };
import b2020_ayt from "./2020-ayt.json" with { type: "json" };
import b2020_tyt from "./2020-tyt.json" with { type: "json" };
import b2021_ayt from "./2021-ayt.json" with { type: "json" };
import b2021_tyt from "./2021-tyt.json" with { type: "json" };
import b2022_ayt from "./2022-ayt.json" with { type: "json" };
import b2022_tyt from "./2022-tyt.json" with { type: "json" };
import b2023_ayt from "./2023-ayt.json" with { type: "json" };
import b2023_tyt from "./2023-tyt.json" with { type: "json" };
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
export const osymRows = [...b2018_ayt, ...b2018_tyt, ...b2019_ayt, ...b2019_tyt, ...b2020_ayt, ...b2020_tyt, ...b2021_ayt, ...b2021_tyt, ...b2022_ayt, ...b2022_tyt, ...b2023_ayt, ...b2023_tyt, ...b2024_ayt, ...b2024_tyt, ...b2025_ayt, ...b2025_tyt, ...b2026_ayt, ...b2026_tyt] as OsymRow[];
export const osymBooklets = ["2018-ayt", "2018-tyt", "2019-ayt", "2019-tyt", "2020-ayt", "2020-tyt", "2021-ayt", "2021-tyt", "2022-ayt", "2022-tyt", "2023-ayt", "2023-tyt", "2024-ayt", "2024-tyt", "2025-ayt", "2025-tyt", "2026-ayt", "2026-tyt"];
