# Pressure-Test #1 — Cask Family on Paper (v0.1)

> Goal: walk the opening turns of a 2p game with two opposed archetypes — **Blue (breadth/volume/Bruges)** and **Red (depth/quality/Novgorod)** — and check whether the goal pool + quality-gates + brewing track actually produce the breadth-vs-depth tension, and what breaks. Provisional economy assumptions are stated up front; the findings feed `RULES.md`.

## Provisional assumptions (to make turns traceable)

- **Turn:** move worker to an orthogonally adjacent cell → activate that cell's **row or column** → resolve its up-to-4 stops (2 cells + 2 cap slots) in free order. A cell occupied by a *rival* worker → take your **tableau fallback** for that cell instead. Cap-slot tiles skim to their owners.
- **Brewhouse fires =** advance **all** your brews 1 step **and** optionally LOAD 1 recipe (paying inputs) into an empty vessel.
- **Brew lengths (advances LOAD→READY):** Gruit 2 · Hopped 3 · Dubbel 3 · Tripel 4 · Bock 5.
- **Harbor fires =** ship 1 READY cask: place its tile into an open perimeter slot (now working) + place 1 presence on a route it quality-qualifies for.
- **Kontor fires =** use the top-stack action **or** enshrine (move a working cask slot→stack).
- **Start:** worker on grid; 2`G` 1`H`; 1 Gruit recipe; Larder+Quay trickle; **1 vessel lane**; Bruges presence available; stack seeded with 2 public tiles.

## Compact trace (Blue, breadth)

- **T1** (A→B, top row): Market → take 1`H`; Brewhouse → LOAD gruit, advance to FERMENT. *(now 1G 2H; gruit@FERMENT)*
- **T2** (B→A, top row): Market → take 1 **Bruges Lane** tile; Brewhouse → advance gruit→READY. *(gruit READY; holding route tile)*
- **T3** (A→C, left col): Market(again via col? no — left col = A+C) Market → place Bruges Lane into slot s1 (pay 2G); Harbor → ship gruit → slot s7 (working, +1G skim), +1 presence on Bruges (Q1 ok). *(1 working gruit, 1 Bruges presence, Bruges route value rising)*
- **T4** (C→A, left col): Market → take 1 Hopped recipe; Harbor → ship nothing ready → take Quay trickle (1 step) — minor. *(picks up hopped recipe)*
- **T5+**: Blue loops top/left, brewing cheap gruit + hopped, shipping wide, placing a 2nd route (London). Presence and working-cask skims compound. Blue rarely visits Kontor; scores on g1/g2/g7 (reach goals) + route value × presence.

## Compact trace (Red, depth)

- **T1** (A→B, right col B-D): Brewhouse → LOAD gruit (off-strategy — only starting recipe), advance→FERMENT; Kontor → top action "+2G". *(needs a premium recipe; detours to Market)*
- **T2** (B→A, top row): Market → take **Tripel** recipe; Brewhouse → advance gruit→READY (dumps it as cheap reach later), but **vessel now wants to load Tripel** — single vessel conflict.
- **T3–T6**: Red builds an **Extra Vessel** room ASAP, then LOADs Tripel and advances it 4 steps (G G H H). Long occupancy of the track.
- **T7** ships Tripel → Novgorod (needs Novgorod Lane placed; Q4 passes Q3 gate). **T8** fires a Kontor line (B-D or C-D) → **enshrine** Tripel: bank standing 6 + its goal (g4 "+2/Q4+") + sets stack top action. Repeat for a few high-value enshrines + Novgorod majority.

## Findings

1. **❗ Reach is gated behind placing a route tile** — with all routes closed at start, nobody can ship until they spend goods + a slot + tempo on a route tile. That's a hard, un-fun bootstrap. **Fix: Bruges (the home hub) starts OPEN by default**; the three far routes require a slotted route tile. Cheap local reach is immediate; premium reach is invested. *(design change)*
2. **Brewhouse must advance ALL brews + optionally load** — otherwise vessels sit dead and the pipeline stalls. This also makes **Extra Vessel the key throughput upgrade** (more lanes advance per single Brewhouse fire). *(confirms Brewhouse action shape)*
3. **The single starting vessel is the central early throttle** — correct and thematic, but it means the **depth path is genuinely slower** (premium brews tie the lane up 4–5 steps). Depth is only viable if **Extra Vessel is reachable early**. ⚙ Watch that quality isn't strictly dominated by volume; the goal bonuses (g3/g4) must pay enough to compensate the tempo loss.
4. **Everyone starts on gruit** (only starting recipe) → humble, historically apt opening; the depth player must detour to Market T1–T2. Acceptable.
5. **❗ Skim runaway is the #1 risk** — once 8 slots fill with working casks, every line activation (by anyone) showers owners with goods → good-glut + rich-get-richer. **Mitigations to tune:** keep skims tiny; make some skims non-goods (presence/brew-advance); enforce a **goods storage cap** (raised by Warehouse). *(top tuning dial)*
6. **No dead Kontor stops** — even with nothing to enshrine, the top-stack tile always offers a public action, so firing a Kontor line is never wasted. ✓
7. **"Both cells fire" = 2 cell-actions + up to 2 skims per turn** → turns are productive and quick; this confirms a **mid-heavy / Brass pace (~10–14 turns/player)**, not a Lacerda turn-as-puzzle. ✓ (matches the ambition tier)
8. **Enshrine tension works as intended** — you give up the slot's skim (engine/reach) + the turn, and gain standing + a goal + control of the shared top action. Geometry bundles enshrining with a brew (right col) or a ship (bottom row), so it's never a fully dead turn; the *cost* is forgoing the other line's two cells. ✓
9. **Divergence emerges** — gruit-can't-enshrine + quality-gates push Red onto hops/premium/Novgorod and let Blue lean gruit/wide. The two archetypes play differently from T1. ✓

## Verdict

The core loop holds and the intended tension is present. Three changes fall out of the test (Bruges-open, Brewhouse advance-all, skim caps), and one balance watch (depth must be compensated for its tempo cost). These are folded into `RULES.md`.
