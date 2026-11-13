# Art and interaction

Visual identity: warm charcoal, restrained coral actions, mint learning feedback,
source-derived Aion sprite art and calm typography. Normal text stays in system
fonts or user-selected Lexend, rather than a pixel font. The world view uses simple
CSS scenery; it introduces no new canon or character biography.

## Aion — cartoon direction for 0.2.0

The user's latest explicit direction is smooth cartoon, not pixel art. The new
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

## Fonts

Lexend is bundled in Latin and Latin Extended regular/semibold subsets, OFL 1.1.
The source font cmap was checked for Çç Ğğ İı Öö Şş Üü. Font selection is independent
of text size, interface scale and theme. It is an optional readability alternative,
not a treatment or a guaranteed learning improvement.
