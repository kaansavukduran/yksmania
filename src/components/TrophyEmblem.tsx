import { useId, type ReactNode } from "react";

/*
 * Original SVG emblems for every trophy. Each trophy has its own glyph (drawn
 * here, no icon font or image file) set inside a medal whose metal follows
 * the earned tier: bronze, silver, gold or platinum. A locked trophy shows
 * the same medal as a dark silhouette, so the shape can be recognised before
 * it is earned. Purely decorative: the card text carries the meaning.
 */

export type EmblemMetal = "locked" | "bronze" | "silver" | "gold" | "platinum";

const METAL: Record<EmblemMetal, [string, string, string, string]> = {
  // light, mid, dark, glyph ink
  locked: ["#59606b", "#3d434c", "#2a2f36", "#8a919c"],
  bronze: ["#f2c19a", "#c47a45", "#7c4522", "#3a1d0b"],
  silver: ["#f4f6f9", "#b7bec8", "#6f7884", "#262b33"],
  gold: ["#fff1a8", "#e6b630", "#946b0c", "#3d2a00"],
  platinum: ["#f2fbff", "#a9d9ec", "#5f8fb0", "#13324a"],
};

const S = { fill: "none", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* Glyphs live in a 24 × 24 box centred in the medal. */
const GLYPHS: Record<string, ReactNode> = {
  "ders:tyt-turkce": (
    <>
      <path d="M4 18 14 8l2 2L6 20H4z" {...S} />
      <circle cx="16.5" cy="7.5" r="3.6" {...S} />
      <path d="m19 10 2.5 2.5" {...S} />
    </>
  ),
  "ders:tyt-matematik": (
    <>
      <circle cx="12" cy="12" r="7.5" {...S} />
      <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" {...S} />
      <path d="M9 10h6M10.3 10v5M13.7 10v5" {...S} />
    </>
  ),
  "ders:tyt-geometri": (
    <>
      <path d="M12 3 4 20h16z" {...S} />
      <path d="M12 3v17" {...S} strokeDasharray="2 2" />
      <path d="M7 20a5 5 0 0 1 2-4" {...S} />
    </>
  ),
  "ders:tyt-fizik": (
    <>
      <path d="M4 19 19 6" {...S} />
      <path d="m14 5.5 5 .5-.5 5" {...S} />
      <path d="M4 19h9" {...S} />
      <path d="m10 16.5 3 2.5-3 2.5" {...S} />
    </>
  ),
  "ders:tyt-kimya": (
    <>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" {...S} />
      <circle cx="12" cy="16" r="1.4" {...S} />
      <ellipse cx="12" cy="16" rx="4.2" ry="1.6" {...S} />
    </>
  ),
  "ders:tyt-biyoloji": (
    <>
      <ellipse cx="12" cy="12" rx="8.5" ry="7" {...S} />
      <circle cx="10.5" cy="11" r="2.6" {...S} />
      <circle cx="16" cy="15" r=".9" {...S} />
      <circle cx="6.8" cy="15.5" r=".9" {...S} />
    </>
  ),
  "ders:tyt-tarih": (
    <>
      <path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9" {...S} />
    </>
  ),
  "ders:tyt-cografya": (
    <>
      <circle cx="12" cy="12" r="8.5" {...S} />
      <path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17" {...S} />
      <path d="m15 9-2 4-4 2 2-4z" {...S} />
    </>
  ),
  "ders:tyt-felsefe": (
    <>
      <path d="M9 9a3 3 0 1 1 4.5 2.6c-1 .6-1.5 1.3-1.5 2.4" {...S} />
      <circle cx="12" cy="18" r=".8" {...S} />
      <path d="M5 5.5a9.5 9.5 0 0 0 0 13M19 5.5a9.5 9.5 0 0 1 0 13" {...S} />
    </>
  ),
  "ders:tyt-din": (
    <>
      <path d="M12 5c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5z" {...S} />
      <path d="M12 5v14" {...S} />
    </>
  ),
  "ders:ayt-matematik": (
    <>
      <path d="M14.5 3.5c-2 0-2.5 1.5-2.8 4l-1.4 9c-.3 2.5-1 3.5-3 3.5" {...S} />
      <path d="M4 20h16M4 20V8" {...S} />
      <path d="M8 14c3-1 6-4 12-5" {...S} strokeDasharray="2 2" />
    </>
  ),
  "ders:ayt-geometri": (
    <>
      <path d="M4 20V4M4 20h16" {...S} />
      <circle cx="13" cy="11" r="5" {...S} />
      <path d="m13 6 1-2.5M13 11l3.5-3.5" {...S} />
    </>
  ),
  "ders:ayt-fizik": (
    <>
      <path d="M12 4a8 8 0 1 0 8 8" {...S} />
      <path d="M12 8a4 4 0 1 0 4 4" {...S} />
      <path d="m17 2 3 2-3 2M18 4h-6" {...S} />
    </>
  ),
  "ders:ayt-kimya": (
    <>
      <path d="M12 3v3M5 7h14M5 7l-2.5 6a3 3 0 0 0 5 0zM19 7l-2.5 6a3 3 0 0 0 5 0z" {...S} />
      <path d="M12 6v14M8 20h8" {...S} />
    </>
  ),
  "ders:ayt-biyoloji": (
    <>
      <path d="M8 3c0 4.5 8 4.5 8 9s-8 4.5-8 9M16 3c0 4.5-8 4.5-8 9s8 4.5 8 9" {...S} />
      <path d="M9.5 6.5h5M9.5 17.5h5M10.5 9.5h3M10.5 14.5h3" {...S} />
    </>
  ),
  "soru-canavari": (
    <>
      <path d="m4 17 2-10 4 4 2-6 2 6 4-4 2 10z" {...S} />
      <path d="M4 20h16" {...S} />
      <path d="M12 13c-1 1.2-1 2.5 0 3.5 1-1 1-2.3 0-3.5z" {...S} />
    </>
  ),
  "kusursuz-seri": (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.5 7.5 8 9 4.5-1.5 8-4.5 8-9V6z" {...S} />
      <path d="m9 10 3-3 3 3-3 5z" {...S} />
    </>
  ),
  "ipucu-yok": (
    <>
      <path d="M9 16a5.5 5.5 0 1 1 6 0v2H9z" {...S} />
      <path d="M10 21h4" {...S} />
      <path d="M4 4l16 16" {...S} />
    </>
  ),
  "yildiz-avcisi": (
    <>
      <path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6-4.5-4.1 6-.7z" {...S} />
      <circle cx="12" cy="12" r="2" {...S} />
    </>
  ),
  "secici-zirve": (
    <>
      <path d="m3 20 6-10 3 4 3-7 6 13z" {...S} />
      <path d="m15 3 .8 1.7 1.8.2-1.4 1.2.4 1.8-1.6-1-1.6 1 .4-1.8-1.4-1.2 1.8-.2z" {...S} />
    </>
  ),
  "yildiz-merdiveni": (
    <>
      <path d="M3 21h4v-4h4v-4h4V9h4V5" {...S} />
      <path d="m19 2 .8 1.6 1.7.2-1.3 1.1.4 1.7-1.6-.9-1.6.9.4-1.7-1.3-1.1 1.7-.2z" {...S} />
    </>
  ),
  "hata-mezarligi": (
    <>
      <path d="M6 21V10a6 6 0 0 1 12 0v11z" {...S} />
      <path d="m9.5 11.5 5 5M14.5 11.5l-5 5" {...S} />
      <path d="M3 21h18" {...S} />
    </>
  ),
  "tuzak-avcisi": (
    <>
      <circle cx="12" cy="12" r="8" {...S} />
      <circle cx="12" cy="12" r="4" {...S} />
      <path d="M12 2v5M12 17v5M2 12h5M17 12h5" {...S} />
    </>
  ),
  "tekrar-dongusu": (
    <>
      <path d="M19 12a7 7 0 1 1-2-5" {...S} />
      <path d="M19 4v4h-4" {...S} />
      <path d="M12 8v4l3 2" {...S} />
    </>
  ),
  "altin-bellek": (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" {...S} />
      <path d="M4 9h16M8 3v4M16 3v4" {...S} />
      <circle cx="12" cy="14.5" r="3" {...S} />
      <path d="M10.8 14.5h2.4" {...S} />
    </>
  ),
  ritim: (
    <>
      <path d="M2 13h4l2-6 3 12 3-9 2 3h6" {...S} />
    </>
  ),
  "deneme-savascisi": (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" {...S} />
      <path d="M9 9h6M9 12h6M9 15h4" {...S} />
    </>
  ),
  "net-avcisi": (
    <>
      <path d="M4 20V4M4 20h16" {...S} />
      <path d="m7 16 4-4 3 2 5-6" {...S} />
      <path d="M16 8h3v3" {...S} />
    </>
  ),
  "gizli:cok-yonlu": (
    <>
      <circle cx="12" cy="12" r="2.5" {...S} />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" {...S} />
    </>
  ),
  "gizli:tam-isabet": (
    <>
      <circle cx="12" cy="12" r="8" {...S} />
      <circle cx="12" cy="12" r="3" {...S} />
      <path d="m21 3-9 9M17 3h4v4" {...S} />
    </>
  ),
  "gizli:inatci": (
    <>
      <path d="M4 20c2-6 5-9 8-9s6 3 8 9" {...S} />
      <path d="M12 11V4M9 7l3-3 3 3" {...S} />
    </>
  ),
  "platin:tyt": (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" {...S} />
      <path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v3M8 20h8M9.5 17h5" {...S} />
    </>
  ),
  "platin:ayt": (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" {...S} />
      <path d="M12 14v3M8 20h8M9.5 17h5" {...S} />
      <path d="M10 8.5h4M12 6.5v4" {...S} />
    </>
  ),
  "platin:efsane": (
    <>
      <path d="m4 16 2-9 4 4 2-7 2 7 4-4 2 9z" {...S} />
      <path d="M4 19h16" {...S} />
      <circle cx="12" cy="13" r="1.4" {...S} />
    </>
  ),
};

const FALLBACK = (
  <path d="m12 4 2.3 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.8 2.6 1.1-5.3-4-3.7 5.4-.6z" {...S} />
);

export const hasEmblem = (id: string) => id in GLYPHS;

export function TrophyEmblem({ id, metal, size = 56 }: { id: string; metal: EmblemMetal; size?: number }) {
  const uid = `${metal}${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [light, mid, dark, ink] = METAL[metal];
  const platinum = metal === "platinum";
  return (
    <svg className={`trophy-emblem emblem-${metal}`} width={size} height={size} viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`m${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="0.55" stopColor={mid} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <radialGradient id={`f${uid}`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={mid} />
        </radialGradient>
      </defs>
      {/* Twelve-point rosette rim for platinum, scalloped rim otherwise. */}
      <path
        d={rim(platinum ? 12 : 16, 27, platinum ? 23.5 : 25.3)}
        fill={`url(#m${uid})`}
        stroke={dark}
        strokeWidth="1"
      />
      <circle cx="28" cy="28" r="19.5" fill={`url(#f${uid})`} stroke={dark} strokeWidth="1.2" />
      <circle cx="28" cy="28" r="17" fill="none" stroke={light} strokeOpacity="0.7" strokeWidth="0.8" />
      <g transform="translate(16 16)" stroke={ink} color={ink}>
        {GLYPHS[id] ?? FALLBACK}
      </g>
      {metal !== "locked" && <path d="M14 18a17 17 0 0 1 10-7" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />}
    </svg>
  );
}

function rim(points: number, outer: number, inner: number) {
  const out: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 ? inner : outer;
    const a = (Math.PI * i) / points - Math.PI / 2;
    out.push(`${(28 + r * Math.cos(a)).toFixed(2)} ${(28 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${out.join("L")}Z`;
}
