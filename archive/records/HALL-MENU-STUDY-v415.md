# HALL-MENU STUDY (v4.15 "Guildhall") — which benefits belong on which shelf?

*Designer-called, 2026-08-10: "Compile a complete list of actions and potential benefits in
the game (and explore potential benefits that don't exist…). Then run simulations to test
out which sets of equally-desirable benefits should be on each shelf… primarily cellarmaster
and guildmaster players… add in chaos/jitter and/or heuristic tendencies."*

**Instrument:** `playtests/hall-menu-probe.js` (KEPT) — drives the canonical engine with
3p tables of **Cellarmaster (220ms) + Guildmaster (100ms) + a jittered Trader (noise 0.10,
persona rotating majority/lifter/builder/breadth)**, seats rotated per game. Every REAL
enshrine records (shelf · option · tier · offered-menu size); playout echoes excluded.
Sweeps ride the mutable `HALL_SHELVES` table (`ARM=a1|a2|a3|base|cX:<pools>`).

## §1 · The benefit catalog (the complete option space)

Everything a shelf could pay, drawn from the game's own verbs + the designer's
"doesn't-exist-yet" ask. ✔ = engine-resolvable as a Hall menu option today (probe-ready).

| Benefit | Exists today as | Hall status |
|---|---|---|
| ★ (2/4/6/9 by shelf, once each) | Contract ★ / Tollhouse stamps grammar | ✔ shipped (the points pick) |
| Gain 2 goods | Market ½ · Granary · load bonus | ✔ shipped (Taproom fixed) |
| Gain 3 goods | — (new magnitude) | ✔ shipped (Guild Table) |
| Gain 4 goods | — (new magnitude) | ✔ candidate |
| Age 2 | the Age+2 bonus / Mission Quay | ✔ candidate |
| Age 3 | the Cellar station | ✔ shipped (Guild Table) |
| ALL aging → Ready | the Abbey Cellar (3H) — here FREE | ✔ candidate (the designer's example) |
| Brew 1 (pay its cost) | the Brew-1 load bonus | ✔ shipped (Masters'/Reliquary) |
| Brew 1 — cost waived | — (new) | ✔ candidate |
| Load 1 more | the Load-1-more bonus | ✔ shipped (Masters') |
| Load up to 2 | the Stevedore's lift | ✔ candidate |
| The Guild's Seal (claim 1 open Contract) | — (new; recursive: pays ★ + Invitation) | ✔ shipped (Reliquary) |
| Place 1 presence (tray die) | the presence bonus / Almoner | ✔ candidate |
| Lift 1 vessel die +1 (past Q, cap 6) | Hop Exchange (paid) — here free | ✔ candidate |
| Lift +2 (split) | Hop Exchange ×2 | ✔ candidate |
| +1 extra Invitation | — (pure engine) | ✔ candidate |
| Gain 1 recipe, fee waived | Bruges prize (fee applies) / Scholar | ✔ candidate — treads on Bruges |
| Seat 1 Specialist free | Bergen's prize | ✔ candidate — treads on Bergen |
| Commission free (no maiden load) | Harbor (fee) / Shipwright | ✔ candidate |
| Build 1 free (mark stands) | London's prize | ✘ unprobed — a SECOND die interlock (flagged) |
| Rack/swap two dice · warp a Ship · a Tollhouse-style ★-for-die trade | building verbs | ✘ unprobed this round (duplicating standing tiles) |

*(The full game-action inventory backing this table — stations, the 8 load bonuses, 18
building designs, 13 specialist drips, 4 Kontor prizes, 10 score faucets — is reproduced in
the report artifact §1.)*

## §2 · Method

- **Phase 1 — cafeteria discovery.** Shelves 1–3 (Taproom stays fixed per the ruling) all
  offer ★ + the SAME 6-option pool; three pools cover the 18 candidates:
  A1 `goods3·age3·presence·invite·lift1·brew` · A2 `goods2·age2·ageall·loadmore·seal·brewfree`
  · A3 `goods4·load2·lift2·recipe·spec·commission`; plus the ruled BASE menus as the anchor.
  With the menu identical across shelves, pick differences BETWEEN shelves isolate the shelf
  context (die tier · the once-each ★ value); pick shares WITHIN a shelf rank the options.
  8 shards × 3 games per arm (96 games, seats rotated, all shards parallel).
- **Phase 2 — composition & balance.** Menus composed from adjacent-desirability options
  (per shelf) are run as confirm arms; the balance read is the within-menu pick spread
  (a balanced menu splits roughly evenly under strong play).
- **MC note:** the MC pair samples every (shelf · option) as first-class options (one
  representative cask per shelf — the smallest sufficient die), so CM/GM picks are priced by
  full-game playouts, not the greedy prior; the greedy prior only steers the jittered Trader
  and the rollout policies.

## §3 · Phase-1 results (96 games — 24/arm · 3p CM+GM+jittered-persona-Trader · seats rotated)

Pace 14.3–15.4 rounds every arm (in band) · 0 crashes/0 deadlocks · winners had used the
Hall in 42–54% of games · hall★/player 1.6–2.1 · **crowns fired 0%** (see finding 5).

**Pick shares by shelf** (share of enshrines on that shelf; cm/gm/tr = picks by tier):

- **BASE (the ruled menus):** Reliquary — ★ 89% · seal 11% | Masters’ — ★ 75% · brew 25% |
  Guild Table — goods3 100% (n=4) | Taproom — 15 fixed visits.
- **A1** (`goods3·age3·presence·invite·lift1·brew`): Reliquary — ★ 75% · goods3 25% |
  Masters’ — ★ 100% | **Guild Table — presence 31% (cm-led) · goods3 23% · brew 23% ·
  age3 15% · ★ 8%** — the one genuinely contested menu in the corpus | Taproom 18.
  `invite` and `lift1` were **never picked** on any shelf.
- **A2** (`goods2·age2·ageall·loadmore·seal·brewfree`): Reliquary — ★ 100% | Masters’ —
  **seal 36% (all trader) · ★ 27% · brewfree 18%** · age2 9% · goods2 9% | **Guild Table —
  seal 70% (23 picks, ALL the jittered trader — the claim-loop degeneracy, finding 3)** ·
  ★ 9% · brewfree 9% · ageall 6% · loadmore 3% · age2 3% | Taproom 23.
- **A3** (`goods4·load2·lift2·recipe·spec·commission`): Reliquary — ★ 100% | Masters’ —
  ★ 100% | **Guild Table — goods4 70% (all trader)** · ★ 20% · lift2 10% | Taproom 15.
  `recipe`, `spec`, `commission`, `load2` were **never picked**.

**Findings:**
1. **The Taproom carries the lane** (15–23 visits/arm — more than the other three shelves
   combined): the fixed 2★+2G door is the workhorse, all tiers.
2. **★ owns the high shelves by revealed preference** — 6★/9★ once-each beats every action
   at the Masters’/Reliquary in nearly all arms (only `brewfree` 18% and Masters’-`seal`
   36% ever competed). The high-shelf actions are repeat-visit fodder, and repeats are rare
   at current invitation economics.
3. **The Guild Table is where a menu is a real decision** — A1’s spread (31/23/23/15/8) is
   near-parity across four options. This is the shelf the menu design is FOR.
4. **Two degeneracies found (the study’s teeth):** the **Seal on a low shelf** is a
   claim-loop — a die-3 enshrine claims a Contract which pays ★ + the next Invitation
   (Table-seal hit 70%, every pick the jittered trader); and **Gain-4-goods low** is a
   pure-value magnet (70%). Both are safe HIGH (die-5 gating starves the loop). Rule:
   **recursive or big-value options belong above the die-4 line.**
5. **The crown never fired** (0% across 96 games) — the four-shelf climb doesn’t happen at
   ~0.4–1.0 enshrines/player in 14–15 rounds. The crown is aspirational-only at current
   invitation flow; dials if wanted: cheaper low-shelf ★, more claims, or crown at 3 shelves.
6. **Dead candidates:** invite · lift1 · lift2 · load2 · recipe · spec · commission — never
   (or once) picked by any tier on any shelf. The acquisition trio also duplicates the
   Kontor prizes; drop them from the design space.
7. *Caveat:* tier WIN rates in this corpus (trader 45–63%) are a contention artifact — the
   MC budgets ran under 8× CPU oversubscription; the PICK data (within-tier choices) is the
   meaningful read. Uniform contention keeps within-corpus comparisons fair (the standing
   bulk rule).

## §4 · Phase-2 composition arms (48 games — 24/arm, same seats/budgets, 4× contention)

| Read | C1 sim-balanced (`presence·brew·goods3 \| brewfree·seal \| brew·seal`) | C2 themed (`age3·ageall \| brew·loadmore \| seal·invite`) |
|---|---|---|
| Enshrines/player | **0.69** | 0.44 |
| Hall★/player | **2.18** | 2.04 |
| Winners used the Hall | **58.3%** | 41.7% |
| CM wins (of 24) | **10** | 6 |
| Pace | 14.6 | 14.6 |
| Crowns | 0% | 1.4% (the corpus's only crown) |
| Guild Table spread | goods3 45 · brew 27 · ★ 18 · presence 9 — all four picked | ★ 67 · age3 33 · **ageall 0** |
| Masters' spread | seal 58 (trader-warm) · ★ 25 · brewfree 17 | ★ 71 · brew 14 · loadmore 14 |
| Reliquary | ★ 100% | ★ 100% (seal/invite unpicked at 5+) |

**The theme tax is measurable** — C2 cost a third of the lane's engagement, and its
cellar-themed Table collapsed (all-Ready is a paradox pick: enshrining spends the ripe die
the pour would have served). C1's warm edge: the Seal at die-4 ran 58% trader-share —
playable, not degenerate; one more sweep before printing it below the Reliquary.

## §5 · Verdicts & the recommended print ⚙

| Shelf | Theme | Menu (★ once per player) | vs shipped |
|---|---|---|---|
| IV · Reliquary (5+) | the honors | **9★** · Brew 1 (pay its cost) · **the Guild's Seal** | none — confirmed |
| III · Masters' (4+) | the craft | **6★** · **Brew 1 — the guild pays its cost** · Load 1 more | brew → **brew-free** (the discovered option: the only action that competed with a high ★; CM-picked in both phases) |
| II · Guild Table (3+) | the table | **4★** · Brew 1 (pay its cost) · Gain 3 goods | age3 → **brew** (contested in both phases; age3 the alternate — also relieves the Hall-vs-Cellar watch) |
| I · Taproom (2+) | hospitality | fixed **2★ + Gain 2 goods** | none — the workhorse |

**Fence rules:** recursive/big-value options (the Seal · 4-goods) live ABOVE the die-4
line — cheap dice make loops cheap. **Dead list** (cut from the space): extra-Invitation ·
lift1/lift2 · load2 · free recipe/specialist/commission (the acquisitions dilute the
Kontore). **Open dials:** the crown (0–1.4% — aspirational; dials: 3-shelf crown +4★ ⚙ /
richer claims / keep as horizon) · the Masters'-Seal sweep · the Chronicler reprice (the
standing eased-deck watch) · a human table before the kit sheet cuts the menus.

*Report artifact (the review surface): "The Guildhall Menu Study — v4.15" (claude.ai
artifact, 2026-08-10). Corpora: `playtests/hall-corpus/` (phase 1) ·
`playtests/hall-corpus2/` (phase 2), AGG.json in each. Nothing here is ruled — the
recommended print awaits the designer.*
