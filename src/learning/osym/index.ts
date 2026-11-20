// Üretilmiş dosya: elle düzenleme. İşlenen kitapçık eklendikçe yeniden üretilir.
import type { OsymRow } from "../../domain/osymPatterns";
import b2025_tyt from "./2025-tyt.json" with { type: "json" };

/*
 * Geçmiş ÖSYM kitapçıklarının soru soru konu ve kalıp çözümlemesi. Soru metni
 * içermez. Açık içe aktarım: bu modül Vite dışında (testler) da yüklenir.
 */
export const osymRows = [...b2025_tyt] as OsymRow[];
export const osymBooklets = ["2025-tyt"];
