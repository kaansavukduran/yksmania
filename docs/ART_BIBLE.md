# Art and interaction

Visual identity: warm charcoal, restrained coral actions, mint learning feedback,
source-derived Aion sprite art and calm typography. Normal text stays in system
fonts or user-selected Lexend, rather than a pixel font. The world view uses a generated pixel landscape; it introduces no new canon or character biography.

## Historical Aion — cartoon direction for 0.2.0

The user's explicit direction at 0.2.0 was smooth cartoon. It is superseded for this app by the 0.4.0 pixel request below. The new
atlas follows the main Aion character reference and T-pose variant A inspected
through the authorized Drive connector. Pink body, blue-tipped external gills,
blue eyes, coat, leaf/infinity emblem, striped badge and DNA tail are retained.
Facing is authored three-quarter left toward the home text; no CSS mirroring.
This product choice does not approve every archived design variant for other games.

`public/assets/aion-cartoon.png`: 1536×1024 RGBA, 4 columns × 2 rows, 384×512 cells.
Created for this commissioned app with image generation and inspected as a sheet
and in the app. The original atlas is preserved under `art/archive/aion-motion.png`
and is excluded from runtime bundles.

- Idle sequence: cell 0 held 18 ticks, then 1, 2, 3; 120 ms per tick, loop.
- Success sequence: 4,4,5,5,6,6,6,5,7,7; 120 ms per tick, once, then cell 0.
- The actor box never translates. Alpha-based foot inspection in local x60–229,
  y390–489 with alpha >220 found baseline y458 in all eight cells; foot midpoint
  differs by at most 0.5 source pixel. This is separate from world-position checks.
- Texture rendering is smooth. No pixelated CSS filter, actor flipping or background
  painting is used to simulate poses. The sheet contains separately authored poses.
- Reduced motion/disabled motion hold cell 0. Hidden tabs pause the timer; completion
  is not replayed indefinitely. A success reaction follows a persisted session only.
- Sound and gamification remain independently configurable.

## Learning diagrams

Diagrams are authored SVG, not screenshots copied from source books. Cell structures
and secretory-protein steps are selected explicitly; typical-cell and scale limits
are stated. Periodic-table data has a separate factual source record. Geometry uses
actual polygons and translations preserving area. Motion settings disable transitions
without disabling controls. Interaction choices and PDF page positions are retained
outside scored responses and do not earn XP.

## AYT diagrams, 0.3.0

Four new lazy-loaded SVG models reuse the app palette. Green/coral distinguish
curves and concentrations; blue dashed lines distinguish tangent or field direction.
DNA uses blue for old strands and coral for new strands with explicit direction
labels. Pattern/labels and textual results accompany color. Dark/light/high-contrast
plot blue has its own theme token. No new character or canon was introduced.
Numerical readouts remain HTML at the chosen text scale; controls wrap on narrow
screens. Diagram assumptions are shown with each model and in SOURCE_REVIEW.md.

## Fonts

Lexend is bundled in Latin and Latin Extended regular/semibold subsets, OFL 1.1.
The source font cmap was checked for Çç Ğğ İı Öö Şş Üü. Font selection is independent
of text size, interface scale and theme. It is an optional readability alternative,
not a treatment or a guaranteed learning improvement.

## Aion — current explicit pixel direction, 0.4.0

The latest user request explicitly asks for richer pixel art faithful to the same
character sheet. Main reference and T-pose variant A were inspected again. Pink
body, blue-tipped gills, blue eyes, white coat, original emblem/badge placement and
DNA tail are preserved. Default three-quarter left, tail on the right; never CSS
mirror the asymmetric coat. Old cartoon assets are retained as historical art.

`public/assets/aion-pixel.png`: generated 1774×887 RGBA, 8 columns × 4 rows.
The cell pitch is exactly 221.75 source pixels; metadata preserves fractional
origins rather than assuming an integer tile size. 32 authored poses: idle/blink
0–7; gaze 8–15; wave 16–19; think 20–23; happy 24–27; stretch 28–31.
Idle holds frame 0 for 18 ticks then 1–7, 150ms. One-shot reaction clips use 160ms.
Click chooses a different action from the previous click. Mouse pointer changes
gaze only, resets after 1100ms. It does not move the actor's world position.

`src/data/aion-pixel-atlas.json` has per-frame source corrections. Opaque pink foot
pixels in x13–56%, y73–98% are measured independently from tail and coat. Bottom
foot baseline is aligned to y94% and the last four rows' foot midpoint to x35%.
Runtime PNG decoding checks corrected vertical baselines for all 32 frames; actor
box, gaze, click variability, return to idle and reduced motion are separate tests.
All 32 corrected cells were also displayed on a dark runtime background and inspected.
Reduced/user-disabled motion holds frame 0 and disables cosmetic interaction;
hidden/offscreen timers pause. Click reactions award no XP. A session celebration
still follows durable completion. A mobile hero clipping regression limits the
actor to its available art height instead of hiding its feet.

`public/assets/study-world.png`: generated 1774×887 landscape, mountain/stream,
rooted forest and study building. Grayscale changes continuously with actual topic
progress; world opacity also increases. Decorative scenery earns no completion.
The progress chart and trees remain available with gamification off. Real UI text
continues to use readable system/Lexend fonts. This art decision is project-specific,
not a change to every AIONIA game's style or canon.

## Mathematics diagrams, 0.5.0

Five original SVG models use the existing theme and textual results. Nested sets,
pairing links, grouped units and ordered shelves encode mathematical relationships;
color alone is insufficient to answer. Numeric results use normal scaled HTML text.
Diagrams adapt height to visible rows; no empty shelf diagram for the empty product.
Controls wrap at large text sizes and reduced motion keeps all actions available.
Explorations persist outside scored responses. No character atlas, landscape or
canon change in this iteration; existing Aion frame/anchor regressions remain.
Live AIONIA v1.7 and reference index v3 were reread on 14 November 2026, unchanged.
