# Art and interaction

Visual identity: warm charcoal, restrained coral actions, mint learning feedback,
source-derived Aion sprite art and calm typography. Normal text stays in system
fonts or user-selected Lexend, rather than a pixel font. The world view uses simple
CSS scenery; it introduces no new canon or character biography.

## Aion

Source: user-owned AIONIA reference collection, `Aion_Motion_Sprite.png`, obtained
through the authorized Drive connector. Original bytes preserved as
`public/assets/aion-motion.png`. Public-source use is within this commissioned app;
no third-party redistribution license is granted. The reference index says final
character-variant approval and runtime readiness are separate questions. This is
an existing atlas integration, not a claim that every archived variant is approved.

- Atlas inspected visually: 1536×1024, 12 columns, 8 rows, 128×128 cells.
- Idle: row 0, cells 0–11, 260 ms per cell (each cell is held for two ticks).
- Completion: row 6, cells 1–11, 110 ms per cell, once, then idle cell 0.
- Character origin is a fixed cell box. No actor-position animation is applied.
- Atlas includes its own background. It is intentionally preserved, not claimed
  transparent. The surrounding stage uses matching muted colours.
- Reduced-motion and disabled animation use row 0/cell 0. Hidden tabs pause timers.
- Only a successfully persisted session triggers the completion screen.
- Sound is independent and initially off. Gamification never locks learning content.

## Fonts

Lexend is bundled in Latin and Latin Extended regular/semibold subsets, OFL 1.1.
The source font cmap was checked for Çç Ğğ İı Öö Şş Üü. Font selection is independent
of text size, interface scale and theme. It is an optional readability alternative,
not a treatment or a guaranteed learning improvement.
