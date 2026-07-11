# The v3.0 "Table Pass" exploration — SHELVED (2026-07-11)

Two fully-built, sim-gated v3.0 candidates from the 2026-07-08 table pass, shelved by the
designer after review — **v3.0 is taking a different path.** Kept whole here: both are still
playable (own save keys, isolated from the live game), with their design notes, harnesses, and
all sim evidence, so anything worth salvaging can be lifted with its rationale intact.

| Piece | What it is |
|---|---|
| `play3a.html` | **v3.0-A "One Stop, One Seal"** (KEY `hanse-3a-v3`) — TABLE-PASS.md built: one verb per station · slots act on themselves · Tap cut, Specialists as Floor stops · **SEALS** replace the demand dice · Flight milestones · the Brewhouse Valve · House Almanacs. |
| `play3b.html` | **v3.0-B "The Roster"** (KEY `hanse-3b-v3`) — TABLE-PASS-2.md package β on the 3A foundation: flip-to-exhaust verb tiles · the Recall · Journeymen · Fair Days · Home Bonuses & the Home Day · House Almanacs. |
| `TABLE-PASS.md` | Round 1 — the table-cost diagnosis + the 3A design, with as-built decisions and gate records. |
| `TABLE-PASS-2.md` | Round 2 — the eight lineage options (Calendar · Roster · Bourse · Fair Days · Almanacs · Tide · Guild Round · Convoy) + the three packages; the un-built options remain live ideas. |
| `playtests/` | The sim harnesses (`sim3a/b.js`, run from this folder: `node archive/v3-exploration/playtests/sim3a.js 500`), render smokes, and every gate/persona result (v1–v3). |

## Why it was shelved (the designer's read, for the record)

The physical playtest asked for streamlining and no hidden state; the builds answered on paper
and in sims but not at the screen — repeated display/mechanics drift ("a lack of follow
through") meant neither game could be learned from its own UI, and the seal system traded one
intuitive die for a token set whose per-privilege values re-created a lookup problem. 3B's
roster additionally pulled the action choice off the board, weakening the move — and the
2×2-grid-plus-ring as an action-selection mechanism is the game's point.

## The salvage list (ideas that survive the shelving)

- **Slots act on themselves** — the deploy-here rule directly answers the table's confusion; it
  composes with ANY future engine.
- **Uniform seals** (proposed, never built): one game-wide value pair (+3 / gilt +5 ⚙) with
  privileges differing by printed CONDITION and cost only — the answer to the lookup problem if
  capture-on-load ever returns.
- **House Almanacs** — killed the deck/display/bag/owner-ring; measurably improved lane balance
  (guaranteed privilege access). The strongest single component-count win of the exploration.
- **The board-first UI grammar** — glowing stops resolved by clicking the board; picks made on
  the pieces, bar as mirror. Applies to the live game too.
- **Fair Days** and the un-built Round-2 options (Bourse, Calendar, Convoy) remain on the shelf
  as designs, not code.
- **Measurement lessons**: the greedy bot cannot price multi-turn investments under thin turns
  (recorded in `playtests/sim3b.js`); prestige heat traces to volume-lane friction, correct with
  structure (the Brewhouse Valve A/B is the worked example).

**Reference only — do not edit.** The live game is `/play.html` (v2.9.1); the working direction
for v3.0 is being re-set at the repo root.
