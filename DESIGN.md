# Working Title: *Brewhouse of the Hanse*

> A theme-first heavy euro about a merchant brewing house in the Hanseatic League. You brew hopped beer — the one cargo that survives the voyage — and push it across the Baltic and North Sea trade network. Every cask you keep working is **reach**; every cask you commit to a foreign post is **standing**. The whole game is the tension between the two.

---

## 1. Snapshot

|               |                                                                                     |
|---------------|-------------------------------------------------------------------------------------|
|**Players**    |2–5                                                                                  |
|**Length**     |15–20 min / player (≈ 30 min at 2p, ≈ 100 min at 5p)                                 |
|**Genre**      |Heavy euro · engine building · shared action grid + private tableau                  |
|**Sensibility**|Theme-at-the-heart, Lacerda-grade interlocking systems (*Vinhos*, *Lisboa*, *Kanban*)|
|**Status**     |Core mechanic + theme locked. Scoring axis and era structure still open.             |

---

## 2. Design Pillars (the north star)

1. **The mechanic *is* the theme.** The central dual-role tile and the authenticity-vs-reach tension are the same object. Nothing is bolted on.
2. **One coherent strategic tension, two real win conditions.** Volume/reach (the "Leffe" player) vs scarcity/reputation (the "Westvleteren" player). Both score; they pull against each other.
3. **Crisp turns, deep decisions.** Line activation is capped at 4 stops so turns stay fast even at 5 players. The depth lives in routing and commitment, not in turn length.
4. **Interaction through a shared board, not take-that.** Occupancy reshapes everyone's options; blocking is positional pressure, never an attack that hard-locks a player.

---

## 3. Hard Constraints (non-negotiable rules)

These are deliberate. Each one is solved *thematically*, not worked around.

- **No dice.** Fully deterministic — heavy-euro native.
- **No cards.** All cardlike content is **tiles** (often double-sided). The action system lives on the board, not in a hand.
- **No money.** Pre-modern trade ran on barter, in-kind goods, and obligation. **Goods are the medium of exchange** (grain, hops, casks). **Reputation/standing is earned and unspendable** — it is score, and it unlocks engine, but it is never paid out.

---

## 4. Theme & Setting

**Era:** c. 1350, the Hanseatic League at its height.

**Why beer, why now:** Hamburg was literally called *the brewhouse of the Hanse*. The pivotal innovation is **hopped beer**, which (unlike perishable **gruit** ale) survives a sea voyage and so becomes a preservable, shippable export commodity. That gives you a built-in path divergence inside the theme: gruit (cheap, local, perishable) vs hopped (premium, travels).

**The trade network:** casks move out to the great foreign trading posts (**kontore**) — **Bergen** (Bryggen), **London** (the Steelyard), **Bruges**, **Novgorod** (Peterhof) — for presence, majorities, and standing.

**The deeper axis (the real heart):** the modern beer world hands us a perfect tension. **Trappist authenticity (Westvleteren — capped production, no advertising, mystique-as-marketing) vs heritage-brand reach (Leffe — industrial scale, global shelf space, diluted story).** This game pulls that conflict back into the 14th century: *do you keep casks in commerce for reach, or take them out of commerce to become heritage and pure standing?* That decision is the dual-role tile (§8).

---

## 5. Who You Are

A **merchant brewing house** — a family/firm operating inside a League city. You source grain and hops, brew, ship along the network, and establish standing at the kontore. You are a builder of a vertically integrated trade-and-production engine, balancing the temptation of volume against the value of reputation.

---

## 6. Core Mechanic — The Shared Action Grid

The signature system. A **2×2 grid of four action cells sits on the main board and is shared by all players.** Each player has a worker on it.

```
        s1        s2
   s8 [ A ]----[ B ] s3
        |    \/    |
        |    /\    |        (no diagonal movement)
   s7 [ C ]----[ D ] s4
        s6        s5

  Top row    : s8 · A · B · s3
  Bottom row : s7 · C · D · s4
  Left col   : s1 · A · C · s6
  Right col  : s2 · B · D · s5
```

### Worker movement

- On your turn you **must move your worker to an orthogonally adjacent cell** (A↔B, A↔C, B↔D, C↔D). **Never the diagonal.**
- You then **activate either the row or the column** that your worker's cell belongs to.

### Line activation (the pipeline)

- A line is a **4-stop pipeline:** `cap tile → cell → cell → cap tile`.
- **Maximum 4 actions per turn:** the two cells on the line, plus the **one perimeter slot adjacent to each of those two cells** on that line.
- Each of the **8 perimeter slots belongs to exactly one line** (the row *or* the column of its adjacent cell) — never both. Two caps per line, no overlap.

### Emergent consequences (why the geometry is good)

- **Cells are generalists** (each sits in two lines, fires often). **Slot tiles are specialists** (each sits in one line, fires only when you run that line). So **placing a tile commits it to a row XOR a column** — a meaningful decision every time.
- **The forced orthogonal move makes you walk a circuit.** Ping-ponging the top edge (A↔B) reliably feeds the top row + both columns, but *never* the bottom row. To service the bottom you must march a worker down to C/D. **Which loop you walk is your engine's rhythm.**
- You can't camp a single line — a one-trick engine starves.

### The scoring-pile variant

- One cell (e.g. **D**) is the **score pile / Kontor**. It is not an action.
- The **two slots adjacent to the score pile (s4, s5) go dark**, reducing perimeter slots from 8 to 6.
- The only lines reaching D are **bottom row** (via C) and **right column** (via B), so **only a worker at B or C can deposit.** Banking therefore costs you a fired stop — the spend-vs-score tension falls out of the geometry for free.

### Two rules to pin down (currently assumed)

- **Both cells in an activated line trigger regardless of which one the worker stands on** — the worker only gates *which line is legal*. (**LOCKED: yes.**)
- **Resolution order within a line:** **WORKING DECISION — free order for now** (player resolves the up-to-4 stops in any order); revisit if turn length / AP suffers. (Fixed/directional remains the fallback if free order proves too fiddly.)

> **⚠ Kontor model under revision (supersedes the §6 "scoring-pile variant" and §7 "not an action").** The Kontor is a **stood-on action cell whose action is the top tile of its enshrinement stack** — it is simultaneously an action space *and* the score pile, and its action **mutates as casks are enshrined onto it.** Full rules pending; §6/§7/§10 to be reconciled once finalized.

---

## 7. The Four Cells (Hanse mapping)

|Cell |Station                  |Action                                                                                        |
|-----|-------------------------|----------------------------------------------------------------------------------------------|
|**A**|**Market**               |Draw goods and tiles from the shared supply (your acquisition engine)                         |
|**B**|**Brewhouse**            |Convert grain + hops → casks                                                                  |
|**C**|**Harbor**               |Ship casks out for reach / market presence                                                    |
|**D**|**Kontor** *(score pile)*|Commit casks to a foreign post (Bergen / London / Bruges / Novgorod) for standing & majorities|

> Mapping is tunable — the flow Market → Brewhouse → Harbor/Kontor is the intuition, not a fixed law.

---

## 8. Dual-Role Tiles — The Heart

> **⚠ Updated (2026-06-02, see §19 "living slot ring").** The dual role is now **per-cask, per-turn**: a Ready cask either **ships** (cargo loaded into a ship = reach) **or enshrines** (= standing). Casks are **cargo, not standalone working slot tiles**, so the "working face fires a line skim from a slot" framing below is superseded — reach now flows through ships. The reach-vs-standing tension it describes is unchanged.

The single most important object. **Double-sided tiles** that are either engine or score depending on *where they sit*:

- **In a perimeter slot (action face out):** the tile is **working** — it modifies/adds output when its line fires. This is **reach** (the Leffe move): the cask is in commerce, driving the business.
- **Moved to the score pile (flip to goal face):** the tile is **enshrined** — it no longer fires; it is now **standing/reputation** (the Westvleteren move): taken out of commerce to become heritage and pure score.

Because you can only enshrine when your worker is in line with the Kontor, **cashing out always costs a turn of engine.** That spend-vs-score decision is the spine of the game. Double-sided tiles are tactile, self-documenting, and need no cards.

---

## 9. Perimeter Slots — Owned Tiles & the Toll

- Perimeter slot tiles (ships, trading privileges, recipes — Dubbel/Tripel/gruit/barrel-aged styles) are **owned by the player who placed them.**
- **When *any* player fires a line through an owned slot, the owner collects a bonus** (a skim, paid in goods — consistent with no-money). Parking on a high-traffic line and taxing every rival who runs it is a position worth fighting for.
- **Acquisition:** tiles enter via the **Market** cell, paid in goods.
- **Balance lever to watch:** rich-get-richer. Keep slots scarce, tolls modest, and make placement cost a turn (building infrastructure costs real tempo).

---

## 10. Occupancy Rules — Hybrid (toll + block)

The grid is shared and, with 4 cells and up to 5 workers, will be **near-permanently occupied**, so these rules are the *main economic loop*, not an edge case. The hybrid is keyed to grid geography:

- **Production cells (Market, Brewhouse, Harbor) → pay-to-use TOLL.** Occupied cell can still be used; you **pay the resident worker's owner in goods.** Keeps turns flowing; turns the central stations into taxable real estate.
- **Scoring cell (Kontor) → BLOCK-to-alternate.** You **cannot pay your way in.** If it's occupied you wait or take the fallback. Banking standing must be the contested, un-buyable thing — this protects the spend-vs-score tension and prevents pay-to-win endgames.

### Alternate action when occupied → routes to your tableau

The fallback when a cell is taken is to **perform a private version in your own tableau** (e.g. Brewhouse blocked → brew in your own brew-room at whatever rate you've built). This is *why the tableau exists* and why blocking never hard-locks anyone. The more house you've built, the less a block stings — which keeps blocking honest at 5 players.

> **Most important numbers to tune:** toll prices and fallback strength. Because occupancy is near-constant, these two dials set the entire game's feel.

---

## 11. The Private Tableau

The counterpart to the shared grid. Clean division of labor:

- **Shared grid = the VERBS.** Where you spend your turn and collide with others. Lean, rhythmic, contested.
- **Tableau = the NOUNS.** Where outputs land and compound — warehouses, brew-rooms, banked goods and tiles. Private, uncontested, where specialization deepens. Also the private fallback when the commons is crowded (§10).

**The loop:** act on the public grid → goods & tiles flow into your tableau → tableau stores/converts/scores → feeds back capacity that strengthens your next public action. (Lungs and body.)

**Turn-length discipline:** **only one surface fires per turn.** The grid action produces/moves; the tableau scores passively and only *acts* on a fallback turn. Letting both fire every turn blows the time budget.

---

## 12. Turn Structure (working sketch)

1. **Move** your worker to an orthogonally adjacent cell (mandatory).
2. **Choose** the row or column of that cell.
3. **Resolve** the line, up to 4 stops (cap → cell → cell → cap), in fixed order.
   - Pay tolls in goods for any occupied production cell you use; owners of fired slot tiles collect their skim.
   - If a cell you want is blocked (Kontor) or you elect the fallback, perform the private tableau version instead.
4. Goods/tiles flow to your tableau; any enshrined tile flips to its goal face in the Kontor.

*(Round/era framing and end-game trigger TBD — see §13–14.)*

---

## 13. Scoring — Current Thinking + The Open Fork

The authenticity-vs-reach axis is already baked into the dual-role tile. Scoring should make those **two genuinely competing win conditions**, not two flavors of one point-salad.

**THE KEY OPEN DECISION** — what does the limited tableau reward?

- **(a) Breadth** — many ports & styles served (the reach / Leffe player), or
- **(b) Depth** — a few rooms refined to high value (the reputation / Westvleteren player), or
- **(c) Forced commit** — tableau space is limited so both score but actively pull against each other, and you must lean one way.

> Recommendation to pressure-test in Claude Code: **(c)**. Limited tableau space + Kontor majorities should make "spread wide vs go deep" the central strategic identity — the Vinhos-grade thing the whole design has been circling.

Likely scoring inputs: enshrined dual-role tiles (standing), Kontor majorities at the four posts, completed tableau sets/rooms, fulfilled port demand.

---

## 14. Deferred Fork — The "Era Arc" (Option 3)

The Hanse frame gives the **quality-vs-volume tension now**. What it does *not* yet give is the **historical sweep**: an era clock advancing across centuries, with refrigeration / rail / bottling / advertising / consolidation unlocking new actions and steadily eroding the value of authenticity.

- **Defer-able:** the core game works without it.
- **If added:** a shared era track is a common clock that unlocks tech for everyone; your own upgrades compound on top. It would deepen the Leffe/Westvleteren arc into a literal timeline.
- **Cost:** structural complexity + the no-money rule bites hardest in an "industrial brand" late game. Fix is keeping **casks as the universal medium and reputation unspendable** throughout.

---

## 15. Design Lineage & Comps

- **Vital Lacerda — *Vinhos*, *Lisboa*, *Kanban*:** the target depth; *Lisboa*/*Kanban* specifically for **shared occupancy reshaping everyone's options.**
- **Toll economies — *Keyflower*, *Princes of Florence*:** the pay-to-use model for production cells.
- **Block-to-alternate — *Caylus*, *Keyflower*:** the model for the contested Kontor.
- **Uwe Rosenberg — *Ora et Labora* (2011):** the title to **differentiate from** (medieval monastery producing beer/whiskey, rotating production wheel).

---

## 16. Differentiation

"Monks/houses make beer" is occupied territory (*Ora et Labora*). This game's distinct ground is the **economic philosophy**, not the production: the **authenticity-vs-reach inversion** (Westvleteren vs Leffe pulled into the 14th-century Hanse), expressed through one object — **the double-sided cask tile that is engine when working and score when enshrined.** Nobody has built *"Vinhos, but the tension is authenticity vs reach across beer trade."* That's the hook.

---

## 17. Decision Queue (for the next session)

Prioritized — top items unblock the most downstream work.

1. **Scoring axis** (§13): breadth / depth / forced-commit. *Sets the strategic identity of the entire game.*
2. **Toll prices & fallback strength** (§10). *The two most load-bearing numbers; occupancy is near-constant.*
3. **Tableau structure** (§11): what are the "rooms," how many, how do they convert and score?
4. **Line resolution order** (§6): confirm fixed/directional vs free.
5. **Confirm both-cells-trigger rule** (§6).
6. **Goods taxonomy:** how many resource types? (grain, hops, water, casks… + grapes if a wine path is wanted.)
7. **End-game trigger** and round/era framing (§12–14).
8. **Era arc** (§14): in for v1, or defer to expansion?

---

## 18. Glossary

- **Cell** — one of the four shared action spaces (A/B/C/D).
- **Line** — a row or column; a 4-stop pipeline (cap · cell · cell · cap).
- **Slot** — one of the 8 (or 6) perimeter spaces holding an owned tile; belongs to exactly one line.
- **Cap tile** — the slot tile at either end of an activated line.
- **Dual-role tile / cask** — double-sided tile; **working** (action face, in a slot = reach) or **enshrined** (goal face, in the score pile = standing).
- **Kontor** — the score pile cell; a foreign trading post (Bergen / London / Bruges / Novgorod).
- **Toll / skim** — goods paid to a resident worker (occupied cell) or to a slot-tile owner (fired line).
- **Tableau** — your private board of rooms/warehouses; output, fallback actions, and scoring.
- **Reach** vs **Standing** — the two competing value types: volume/commerce vs scarcity/reputation.

---

## 19. Working Architecture — Session Log (2026-05-31)

This section captures decisions and the working architecture from the live design session. It supersedes earlier sections where they conflict; canonical sections (§1–§18) to be reconciled once the architecture stabilizes.

### Locked decisions

- **Both cells in a fired line trigger** regardless of worker position (§6). Worker position only gates *which line is legal*.
- **Free resolution order** within a line for now (revisit if AP/turn length suffers).
- **Cask lifecycle is the core loop, kept deliberately learnable:** `Market (acquire) → Brewhouse (brew) → Harbor (ship = reach) → Kontor (enshrine = standing)`.
- **Kontor = a stood-on action cell whose action is the top tile of a shared enshrinement stack.** The stack mixes **public and personal tiles**. Enshrining a cask sets the new top (= new Kontor action), burying the previous.
- **Occupancy fallback = perform the action's private version in your own tableau.** Block-to-tableau, not bump, not pay. This makes walking to a contested cell a *strategic plan* (you'd rather fire your tableau version), not a penalty.
- **Goods taxonomy:** two cubes — **grain** and **hops** (water cut as dead weight; empty barrels deferred as a possible capacity constraint). **Gruit = grain only** (cheap, local, cannot be enshrined — perishable); **Hopped = grain + hops** (premium, travels, can be shipped & enshrined). The Westvleteren/Leffe axis falls out of the recipe.

### The three-layer object model

- **Perimeter slots = the scoring landscape (owned infrastructure).** Route / ship / recipe tiles. A slotted **route tile** both modifies its line *and* sets/raises that route's end-game value on the board → **players author what scores by what they place.**
- **Harbor board = execution + presence.** Shipping delivers working casks as **presence** along open routes. Presence = **reach**, now countable.
- **Kontor stack = standing.** Enshrining **pulls a cask off the board** into the stack: trade live board-presence (reach) for locked, unspendable standing. The reach-vs-standing dilemma is now a physical board→stack migration.
- **Correction to earlier model:** casks do **not** sit in perimeter slots — slots hold infrastructure; **casks live on the board**, then migrate to the stack when enshrined.

### Harbor / route board (working design)

- Home port (Lübeck/Hamburg) central; four routes radiate to the four kontore through minor-port waypoints.
- Fire the Harbor line → ship working casks → advance presence along an **open** route (open = a route tile for it sits in a slot), steps modified by ship tiles.
- **End-game reach score = your presence on each route × that route's slotted value.** Majority of presence on a route = that kontor's standing bonus + the right to enshrine there.
- **Variable paths to victory via four distinct kontor reward profiles** (no single efficiency line):
  - **Bergen — Monopoly:** short, narrow, few spaces; control locks a resource/toll → deep defensive standing.
  - **Novgorod — Long Haul:** longest, highest payout, slow to build → committed reach over time.
  - **Bruges — Hub:** wide, many small payoffs, flexible → tempo / liquidity.
  - **London — Privilege:** pays in privilege tiles (engine upgrades, toll exemptions) → engine-builders.

### Stack readability (UX)

- The stack's only live job is its **top tile (current Kontor action).** On enshrining, record the cask's standing **value on a per-kontor track** (markers). Buried tiles are pure thematic sediment, already counted — never referenced again. **Read tracks for value, top-of-stack for action.**

### Tableau — your private brewery (LOCKED direction)

- The tableau is **not a mirror of the grid.** It is your **brewery** — the vessel the brewing verb acts on. Grid = verbs, tableau = the noun. No duplicated actions.
- **Brewing track** (doubles as the brewing-process tracker): `LOAD → FERMENT → AGE → READY`. Casks crawl through it.
  - **Gruit** (grain only): LOAD → FERMENT → READY (skips AGE). Fast, frees the vessel; perishable/local; **cannot be enshrined.**
  - **Hopped** (grain + hops): LOAD → FERMENT → AGE → READY. Slower — vessel tied up a turn longer (real opportunity cost) — but travels & **can be enshrined.**
  - → The gruit/hopped choice is a **tempo decision**, not just a resource cost.
- **Public Brewhouse cell = the verb "advance / load brews"** on your track. Verb public, vessel private.
- **Two kinds of tableau space:** brewing-track spaces (casks flow through, temporary) vs **room/upgrade slots** (permanent installed engine tiles: extra vessel, faster fermenter, aging cellar, warehouse, larder/dock upgrades). Depth & specialization live here.

### Occupancy fallback (LOCKED)

- **Block-to-tableau via "trickle + upgradable rooms."** Only the Brewhouse has a true private twin (your track, always usable). Market/Harbor when blocked → a weak self-sufficient **trickle** (starting larder yields 1 good; starting dock ships 1 step), upgraded by installed rooms. The more brewery you've built, the less a block stings.

### Scoring — three interlocked axes (LOCKED direction)

- **Volume (reach) × Quality × Destination (market) = brand reputation, modeled.** Not additive silos — they **interlock:**
  - **Quality gates Destination:** far/rich markets demand high quality (Novgorod takes only premium hopped; Bruges takes middling volume).
  - **Destination sets Reach value:** a route scores by the value players slotted onto it.
- Competition between paths enforced by **shared scarcity:** vessel capacity (fast-cheap vs slow-premium), perimeter slots (author few routes), turns (reach keeps casks working vs standing pulls them off the board). → §13 option **(c) forced-commit** is the strategic spine.
- Player archetypes: **Volume/Bruges** (wide, fast, middling) · **Quality/Novgorod** (deep, slow, premium) · hybrids.

### Open / next

- **Components & tile deck** → see `COMPONENTS.md` (v0.1 draft).
- Reconcile **perimeter slot count (6 vs 8)** now that the Kontor is a stood-on action cell (the old s4/s5-dark rule assumed a passive score pile).
- Tableau room list, conversion rates, vessel capacities.
- Toll/trickle numbers; end-game trigger; era arc in/out for v1.

### Revision — cask routing, slots & cards (2026-05-31, cont.)

- **Perimeter slots: 8, all open. 2p variant locks some (→ ~6)** to tighten the board. (LOCKED)
- **[SUPERSEDED 2026-06-02 — see "living slot ring" below: casks are now cargo inside ships, not standalone working slot tiles, and fire no individual skim.]** **Casks restored to the perimeter slots — supersedes the earlier "casks live on the board, not slots" correction.** A working cask tile sits in a slot and **fires a printed action when its line is activated** (the §8 dual-use heart). Lifecycle:
  `BREW (tableau track) → SHIP into a SLOT (working = reach engine, fires actions) → ENSHRINE into the Kontor stack (flip to standing face = standing, sets new top action)`. Casks move *into and through* slots. (LOCKED)
- **Cask tiles are double-sided:** working face = a **line action** + style + quality; standing face = **standing value + a goal**. (LOCKED)
- **Goal-matching DNA stays:** an enshrined cask's goal scores against your working/slotted/board state — the glue that makes reach & standing *interact*. (LOCKED)
- **Route board = presence *markers*** dropped when shipping (reach score + majorities), now distinct from the cask tile itself.
- **Slots hold a *mix* of working casks + infrastructure (route/ship) tiles**, competing for the same 8 spaces → "row XOR column" commitment now spans the whole strategy. ⚙ load-bearing balance point.
- **OPEN — presence coupling:** reach (presence markers) and standing (enshrined tiles) as *separate accumulations* (lean: yes, simpler — tension lives in slot-space/turns), **or** enshrining *pulls back* a cask's presence (poetic, but needs marker↔cask bookkeeping).
- **Cards policy (re: §3 no-cards):** deck is big in *copies*, small in *unique designs* (~45–50 unique faces). Recommendation: **stay all-tiles, served from a face-up Market display** (preserves determinism + the physical flip). Hybrid (one high-variety family as cards) only if a family proves to need card-scale variety. ❓ confirm §3 still sacred.
- **Next deliverable:** fully spec the **cask tile family** (faces, line-actions, quality, goals) — the core of the game. → **DONE: see `TILES.md` (v0.1, full 7-family deck).**

### Locked (2026-05-31, cont.)
- **Presence (reach) and standing accumulate separately** — never convert.
- **Stay all-tiles**, served from a **face-up Market display** (deterministic, public). No cards.
- Full tile list drafted in `TILES.md`: ~140 tiles / ~45 unique designs (tile-scale, not card-scale).

### Locked / discovered via pressure-test (2026-05-31, cont.)
- **Pressure-Test #1** (`PLAYTEST.md`): core loop holds; breadth-vs-depth tension emerges from T1. Three design changes fell out:
  - **Bruges (home hub) starts OPEN**; far routes require a slotted Route Lane tile (fixes the reach bootstrap).
  - **Brewhouse fires = advance ALL brews 1 step + optionally load 1** (vessels = throughput; no dead lanes).
  - **Goods storage cap + tiny skims** to contain rich-get-richer (the #1 tuning risk).
  - Balance watch: the **depth path is genuinely slower** (premium ties up a vessel) — goal bonuses must compensate.
- **Turn & round economy drafted** → `RULES.md` (turn = move + activate line; 4 cell actions; round = turn each, first-player passes; **end-game = Kontor stack reaches N OR a route saturates**; scoring sequence reach → majorities → standing → goals).
- Confirms **mid-heavy / Brass pace (~10–14 turns/player)**, not Lacerda turn-as-puzzle.

### Player board & opening (2026-05-31, cont.) — LOCKED

- **Symmetric starts.** No asymmetric houses for v1 (revisitable as a variant). Opening variety comes from Market choice + the gruit/hopped load fork, not from forced cell parity.
- **Vessels: start 1, cap 3.** Throughput is the central tempo throttle.
- **Room slots: 4 (scarce).** Extra Vessel is itself a room → wide-vessels-vs-deep-rooms is the forced-commit squeeze (§13c) made physical.
- **Starting resources:** 3 `G`, 2 `H`, recipes **Gruit + Hopped**, storage 8.
- **Turn-1 rule:** place worker on any cell + activate (no move); move-then-activate from turn 2. Makes first placement a real decision.
- **Opening analysis** (`PLAYTEST.md` walkthrough): Top Row (Market+Brewhouse) is the natural opening (Harbor is dead with no ready cask); the bumped start + two recipes put the fast-vs-slow fork on turn 1.
- Full board spec → **`PLAYERBOARD.md`**.

### Grid topology & tableau twins (2026-05-31, cont.) — LOCKED

- **Build × cash-out grid.** Market & Brewhouse (the *builders*) are placed on one **diagonal**; Harbor & Kontor (the *cash-outs*) on the other. They never share a line. Cell map: `A=Market · B=Harbor · C=Kontor · D=Brewhouse`.
  - Consequence 1 — **kills the dominant opening**: you can never acquire+brew in one line, so no single turn snowballs (was the first-player problem).
  - Consequence 2 — **every line = one builder + one cash-out**: `Market+Harbor · Market+Kontor · Brewhouse+Harbor · Brewhouse+Kontor`.
  - Consequence 3 — **reach-vs-standing every turn**: Harbor & Kontor are diagonal, so each turn you ship for reach **or** enshrine for standing, never both. The core tension is now structural, per turn.
- **Tableau twins (occupancy = opportunity).** Each public verb has a private twin you can upgrade via rooms: **Market→Larder**, **Brewhouse→brew-room (Faster Fermenter)**, **Harbor→Quay**. Kontor is open-to-all (no twin). A twin fires **only when a rival blocks that cell** (locked) — so a developed tableau makes you *want* to step onto crowded cells (you fire your strong twin and still take the line's other cell). With only 4 room slots you specialize one twin → different players value different lines → wide phase-space on a tiny board.
- The play client + visualizer remapped to this grid; twins (Larder/Quay/Faster Fermenter) implemented as upgrade rooms.

### Balance pass v0.2 — from the 3p engine sim (`playtests/3p-10turn-sim.md`)

The first 3-player simulation broke in three ways; fixes applied to the engine + docs:
- **Lane presence-skim runaway → fixed.** Lane line-actions paid `+1 presence` to the owner on every fire (uncapped), hitting 12 presence on a cap-4 route and ending the game on turn 4. Now **presence comes only from shipping**, Lane skims pay `+1 G`, and **presence is clamped to route capacity** (caps raised: Bruges 8 · London 6 · Bergen 5 · Novgorod 9 ⚙).
- **Standing was non-functional (0 enshrinements) → fixed.** You may now **enshrine a Ready cask directly from the brewery** (no mandatory ship step), and standing values were bumped (Hopped 3 · Dubbel 5 · Tripel 7 · Bock 10). Re-sim: standing now scores and goals fire.
- **Goods faucet throttled.** Kontor seed top-actions cut to `+1 G`.
- **OPEN — next dials (revealed by the re-sim):** the game is **throughput-bound and slow** — one vessel + 2–5-step brews yields only ~2–4 casks/player in 10 turns, so scores stay low and neither end-clock fires at a good pace. Candidates: faster brewing / passive maturation / cheaper vessels / lower end-clock thresholds. Also **reach-vs-standing fine balance needs a stronger bot or human playtest** (the greedy bot can't execute the multi-step reach plan).

### Revision — the living slot ring: ships as cargo-containers, recipes claim-on-fire (2026-06-02) — LOCKED

A design-conversation pass made the perimeter slots **transient and interactive**. Three converging decisions; engine + `play.html` reworked and headless-tested.

- **Ships are owned, route-bound cargo containers — the toll-baron play. (LOCKED)**
  - A ship is a **slot tile with a visible stack of cask sub-slots** (`cargo` array, `cap`), placed by a player and **bound to one route** at placement ("this ship supports Bruges").
  - **Shipping a Ready cask** to a route loads the cask **into a ship that has room on that route** (preferred over a basic shipment). The **shipper** always gains **+1 presence** (reach). If the ship is a **rival's**, its owner collects a **+1 G toll** for the carriage. → You build ships speculatively where you expect traffic and **tax everyone's cargo**, including rivals'.
  - **A ship's line-action is to load:** when its cap fires (any player's activation), it pulls one of the **owner's** ready, route-eligible casks aboard (owner +1 presence). So the ship fills from *both* directions — Harbor shipments and its own cap-fires.
  - **Full ⇒ it sails:** cargo is delivered (already counted as each shipper's presence), the **owner** takes a **sail dividend** (+1 presence on the route, +1 G), and the ship **leaves its slot** — transient churn. With no ship on a route, shipping is a **basic shipment** (+1 presence, cask delivered): ships are a **booster, not a gate.**
- **Casks are cargo, not standalone working slot tiles. (LOCKED — supersedes the 2026-05-31 "casks restored to perimeter slots / fire a printed action" revision and the §8 working-face-fires-a-skim model.)**
  - A Ready cask now faces a clean fork: **ship it** (→ reach: cargo in a ship, presence on a route) **or enshrine it** (→ standing, straight from the brewery). Never both. The dual-role heart survives as this **per-cask decision**; what's retired is the cask's *individual* in-slot line-skim (reach now flows through ships).
  - Consequence: **enshrining is only from a Ready vessel** (the slot-based enshrine is gone). "Casks in transit" (cargo loaded in ships) is the new reading of the old "working casks" goal/tiebreak.
- **Recipes: held in hand, gained via claim-on-fire slot tiles. (LOCKED — supersedes "recipes bought straight to hand.")**
  - You **start with the Gruit baseline + 2 random premium recipes in hand** (a random pair; 1→2 after the 2026-06-02 multi-sim showed a single random premium gave a ~1.7× Tripel-vs-Hopped win swing), and **brew from hand**. Every other recipe is acquired as a **recipe tile placed in a slot**; the **next time that slot's line fires** (any activator), the **owner claims the recipe into hand and the tile is spent** (slot frees). This unifies "keep them in hand," "gain the recipe when the tile is activated," and "available until claimed" into one transient engine.
- **Net effect on the slot ring:** slots now hold a churning mix of **ships** (fill → sail away), **recipe tiles** (claimed → spent), and **route lanes** (permanent infrastructure). Transience + the toll/skim ownership model make placement a live, contested, speculative decision — the "more interesting, more transient slots" goal.
- **Verified headlessly:** rival-loads-your-ship + toll, own-ship loading, cap-fire auto-load → sail → slot frees, basic-shipment fallback, and recipe claim-on-fire all fire correctly; full 3p/10-turn sim runs clean (`playtests/3p-sim-driver.js` updated to the new model).
- **Still open (unchanged):** throughput/pace tuning, sail-dividend & toll magnitudes (new rich-get-richer dials to watch per §9), whether starting with a *random* premium (vs fixed Hopped) reshapes the turn-1 opening enough to need rebalancing.

### Revision — the recipe book, the type ladder & the VP-token value economy (2026-06-03) — LOCKED

A design-conversation pass replaced the recipe slot-engine with a **private recipe book**, split beer into **two layers (type + recipe)**, and solved variable value with a **spendable VP-token economy** layered over the (preserved) end-game scoring. Aim: diceless variability + variable paths to victory, so no line pre-solves.

- **Recipes are a private book, not slot tiles. (LOCKED — supersedes the 2026-06-02 claim-on-fire slot model and Family C′.)** You **collect** recipe tiles from the Market into your book and brew from it; you **can't brew a type you hold no recipe for** (Gruit is the universal baseline). Each recipe names a **type** and carries its **own cost profile** (`n G · n H · n brew-steps`) — *two recipes of the same type can cost differently*, so collection (which recipes you draw) is the asymmetry/variability engine, alongside future asymmetric family powers. Both are **input randomness** (dealt options), never **output randomness** (no dice resolving an action) — the legitimate kind for a heavy euro.
- **Two layers of beer. (LOCKED)**
  - **Type** = a global quality rung. **Anchored spine + variable summit:** **Gruit → Hopped** is fixed and historical — hops is the preservation tech that *opens the sea routes* and gives the game its title — then the premium tiers **L3–L5 are filled by historical Hanse beers dealt in a variable order/subset each game** (**Bock**/Einbeck, **Mumme**/Braunschweig, **Broyhan**, **Keut** ⚙; reskins the anachronistic *Dubbel/Tripel* placeholders). Stable on-ramp, unpredictable summit.
  - **Recipe** = a collected instance of a type (above).
  - The current **type frontier gates the Market's recipe supply** (you can only collect recipes of unlocked types). **Frontier advances production-driven** ⚙: as a type's market saturates, its value drops *and* the next tier unlocks — one causal loop (flood gruit → gruit cheapens → premium recipes appear → the market tempts you upward). This is the **depth-pull tension**: a cheap high-type recipe sits in your book *wanting to be brewed*, pulling a reach-committed player up the ladder.
- **Value economy — variable value without breaking end-game scoring. (LOCKED)**
  - **End-game scoring is preserved** (`RULES.md` §6 backbone intact: reach, majorities, standing, the g1–g10 goal layer). Cask tiles keep their **printed base VP**.
  - **Value rides on types** (a **linear value track**, marker per type ⚙); **routes stay the access/majorities axis** (the quality→destination gate). The combination is the **race condition**: reach floods a type → its track marker **ticks down** (saturation); the quality player wants to cash in before the volume player tanks it. Neither perfectly times the other → the unsolvable, diceless tension.
  - **VP tokens = a spendable 3rd resource**, minted on each **sale** (ship *or* enshrine) **scaled by the type's current track position** — value *locked in metal* at the moment you sell well. **Spend** mid-game for tempo/power (sinks ⚙) **or bank** as **1 VP each** at end. Tokens are a **modifier on top of** printed cask VP, **never a replacement** — so the backbone never destabilizes, and "lock in value at its peak" lives here (replacing the retired enshrine-freezes-value framing).
- **End-game trigger = 2 of the 4 kontor cities saturated. (LOCKED — supersedes the v0.1 twin clocks: Kontor-stack-N and single-route-full.)** Visible on the table and **steerable in opposite directions**: reach races to slam a second city full and end it; standing delivers to the empty cities to prolong. Player-driven, telegraphed.
- **Still open / next dials:** type-frontier advance threshold (how much production flips a tier) ⚙; value-track length & step size ⚙; VP-token yield curve and the 1–2 spend sinks ⚙; the summit roster's per-beer mechanical hooks (e.g. Bock needs the Aging Cellar; Mumme = slow/high-standing) ⚙; 2-of-4-cities pacing vs route capacities.
- **Verified by economy sim (`playtests/v03-economy-findings.md`, 2026-06-03):** the new subsystems interlock — value decays per sale, the production→frontier loop fires (summit reaches ~L4), and **2-of-4-cities scales with player count** (3–4p end reliably at rounds ~18–25; **2p too slow → needs lower route caps**). **Open balance issue (structural, not the value gradient):** enshrining is unbounded while shipping is route-capacity-bounded, so standing still out-scores reach (~75–89% wins). Fix candidates: token bounty for saturating a city / majorities→tokens / sail dividends in tokens; then implement v0.3 in `play.html` to test reach's real multipliers (vessels, cap-fire, sail dividends, tolls) which the abstract sim can't see.

### Revision — balance philosophy: the Great Western Trail blend ideal (2026-06-03) — LOCKED

The 2026-06-03 sim's 75–89% pure-standing win rate reframed the balance goal. The target is **not path-parity** (reach "losing" a head-to-head vs standing is fine) — it is **"no *pure* path wins."**

- **The GWT model.** Like *Great Western Trail* (cowboys / engineers / builders, where the winner almost always runs a **blend of two**), Breweries has three leanings — **Reach** (volume / presence / majorities), **Standing** (enshrine / quality), **Engine** (recipe book + climbing the type ladder & value track). A **pure single-lean strategy should under-perform a blend.**
- **The blend is chosen *as you play*, by reading the board** — your lane placements (you author what scores), the dealt summit, opponent occupancy & majorities. The winning mix should **vary by game**, not be solvable pre-game. *Starting positions + interaction make or break a strategy, and you settle into one mid-game.*
- **The interdependence levers that make blending pay (tune these, don't add new ones):**
  1. **Goal-matching DNA (g1–g10, `TILES.md`):** enshrined casks score *against your reach/board state* — a pure-standing player draws goals (per-route presence, per-cask-in-transit, Novgorod presence, majorities) that score **~0 without reach.** This is the primary GWT coupling and it already exists.
  2. **Value-track diminishing returns:** flooding one type tanks its token value → pushes spreading across types/outlets (engine + reach), not one-note standing.
  3. **Majorities need presence (reach) but reward commitment (standing).**
  4. **Reach's volume multipliers** (extra vessels, ship cap-fire, sail dividends, tolls) let presence scale past 1/turn — the engine has them; the abstract sim didn't.
- **Tuning is measured against this, not parity:** **blend win-rate vs pure win-rate**, and **winning-blend variance across seeds**. See `playtests/blend-sim.js`.

### Revision — v0.3 ported into `play.html`; fix D applied; the non-orthogonality reframe (2026-06-03) — LOCKED

Two threads closed here: the GWT balance investigation (`playtests/blend-balance-findings.md`) and porting the v0.3 economy into the playable engine.

- **Balance — fix D (cycle the couplings), chosen & applied.** The blend-sim showed *whichever single axis is left uncapped becomes dominant* (tokens → standing → reach each ran away in turn), so balance here is **bounding all axes**, not buffing one. The goal pool is re-authored into a **3-way symmetric cycle** (3 reach-rewarding + 3 standing-rewarding + 3 engine-rewarding, all capped, **best-3 score**) so no goal rewards the axis the enshrine act already pays. This broke pure-standing dominance (**89% → 6%** at 4p); RS/SE blends are healthy and the winning blend varies by the goal deal.
- **The deeper reframe (decided: two axes).** The three "leanings" are **not orthogonal** — you climb the type ladder *by* brewing & banking higher casks (so "Engine" is a disguised Standing), and *both* sell-modes mint tokens (so Engine is a **timing multiplier**, not a third action). **Decision: Breweries is Reach vs Standing, with engine/value-timing as connective tissue both paths use.** The blend ideal becomes *"reach + standing, tuned by tempo."* (Cask-tile goals kept; no detach.)
- **`play.html` brought up to v0.3.** Ported the three load-bearing systems the abstract sim couldn't exercise: **value track + VP tokens** (every sale — ship *or* enshrine — mints `current value`, then that type decays toward its floor: `[3,4,6,8,11]`→floors `[1,1,2,3,4]`), **2-of-4-cities end clock with player-scaled caps** (`base{2,1,0,2}+playerCount` → 2p `{4,3,2,4}`, fixing the v0.3-sim "2p too slow"), and the **cycled goals + tokens in scoring** (best-3 goal cap). HUD shows tokens + the live value track + the city clock; final table adds a Tokens column.
- **Deltas from the locked v0.3 spec, on purpose:** the **recipe model stays claim-on-fire slot tiles** (not the book/frontier) — functionally a frontier for human play, and swapping it is pure churn that doesn't touch the two-axis balance; logged for a later pass. **VP tokens bank only** (no mid-game spend sinks yet).
- **Verified:** engine parses, 600 headless games run crash-free (`multi-sim.js`, updated to the live cap + token readout), and a render-path smoke test confirms value decay, token accrual, the best-3 goal cap, and 2p caps. `multi-sim`'s legacy v0.2 bots barely ship, so **`blend-sim.js` remains the balance authority**, not `multi-sim`.
- **Still open:** recipe-book/type-frontier port; VP-token spend sinks; tuning pure-Reach/pure-Engine down under the two-axis target; human playtest of reach's real multipliers (vessels, cap-fire, sail dividends, tolls) now that they're in the playable build.

### Revision — v0.4 consistency pass: recipe book made canonical, claim-on-fire retired, all pages aligned (2026-06-03) — LOCKED

A full-table reconciliation. Every page (the 5 HTML deliverables + the markdown record) was drifting against the others; the worst gaps were in `rulebook.html` (pre-remap cell map, casks-into-slots shipping, the old twin end-clocks, no VP tokens). Decision: **bring everything up to the latest state — no backlog — and resolve the one logged fork (recipes) in favor of the book.**

- **Recipe model: the private book is now canonical; claim-on-fire is retired everywhere — including `play.html`.** Rationale (designer call): placing a recipe in a slot just to claim it back later isn't intuitive and serves no gameplay purpose that the book doesn't. **Buying a recipe sends it straight to your book.** This closes the 2026-06-02 "claim-on-fire slot model" and the `play.html` delta logged in the previous revision. Recipes no longer occupy perimeter slots → the slot ring now holds **only ships + route lanes** (cleaner row-xor-column tension).
- **Type frontier + recipe book ported into `play.html`.** Market recipe supply is gated by the global type frontier (opens at Hopped; advances production-driven as a type's league sales cross a threshold ⚙, also ticking that type's value down — the one causal loop). The summit (L3–L5) is **dealt from {Bock, Mumme, Broyhan, Keut}** each game (3 of 4) over the fixed L3/L4/L5 rung stats; the top rung needs the Aging Cellar.
- **All pages now agree on the canonical constants** (the single source of truth for the visualizer, rulebook, printables, and engine):
  - Cell map **A=Market · B=Harbor · C=Kontor · D=Brewhouse** (build×cash-out diagonals).
  - Type ladder: Q **1/2/3/4/5**, brew steps **2/3/3/4/5**, base standing **—/3/5/7/10**, value-track start **3/4/6/8/11** → floors **1/1/2/3/4**.
  - Route caps **player-scaled** `base{2,1,0,2}+playerCount`; quality gates **Bruges 1 · London 2 · Bergen 2 · Novgorod 3**.
  - Goals: the **cycled 9** (g1/g2/g6 reach · g3/g4/g10 standing · gV/gC/g8 engine), **best-3 score**.
  - End-game: **2 of 4 cities saturated**. Scoring: Reach → Majorities → Standing → Goals(best-3) → VP tokens.
- **Casks are cargo, never slot tiles; shipping loads them into ships** — the §9 "cask into a working slot" framing is purged from every page.
- **Still open (unchanged):** type-frontier threshold tuning; VP-token spend sinks (bank-only for now); per-beer summit hooks; pure-Reach/pure-Engine balance under the two-axis target; human playtest.

### Revision — v0.5: the dual-role tile restored as the spine; the demand market; reach-vs-standing as one timing decision (2026-06-03) — LOCKED

A long design-conversation pass rebuilt the heart of the game around the original first-prompt vision (tiles that live in slots and are either engine or score) and fixed the two things that made the prior "one big choice" feel thin: **scoring cost you nothing you'd miss**, and **"Kontor" meant two things at once.** This supersedes the v0.3/v0.4 reach/standing/token framing where they conflict.

**The diagnosis we acted on.** The old reach-vs-standing was a *routing* decision (ship a cask into bucket A or B and it's gone), not a strategic tension — because the scarce resource (slots) was decoupled from scoring, and standing used no slots at all (which is why the sims had it dominate). The fix: put scoring back where it costs engine, make value *move* so timing matters, and unify the theme.

- **A cask has three states. (LOCKED)** Brewed in the tableau, a Ready cask lives in one of:
  - **Working** — installed in a scarce **personal slot** on your board. Private, uncontested; it soups up one of your stations (an action you can use, also your fallback when that cell is blocked). Engine only, no points.
  - **Reach** — **deployed into a shared perimeter slot**, bound to a route. **The cask *is* your presence** (it counts as reach on that route while it sits there). When its line fires it yields an **action**. It is exposed.
  - **Standing** — **enshrined**: pulled off the board to the standing stack; the owner's standing track advances. Reach↔standing never co-exist on one cask — **enshrining converts the tile** (its board presence leaves; the points are banked).
- **"Any player may enshrine a deployed cask." (LOCKED — the positive-interaction engine.)** On a Hall line, a player may enshrine a cask sitting in *any* shared slot — theirs or a rival's. The **owner** gets the standing (their track ticks up, the cask's goal flips face-up in their row); the **slot frees** for the enshriner. This is the transience valve (casks don't pile up — anyone can clear one) *and* a positive, non-take-that interaction: I reclaim the commons, you get points — but **fewer than you were holding out for**, and not on your timing. It also gives standing real interaction without a hidden shared stack.
- **The dual-role tension restored.** Casks-in-slots firing actions is the original §8 heart we removed in the 2026-06-02 "living slot ring" rework (to kill skim-runaway). It's safe to bring back **because the any-player-enshrine churn is the governor** — casks cycle off the board instead of accumulating. The engine-vs-score fight is back on the slots, where every point you bank costs you board position.
- **The demand market = the value-over-time signal (collapses aging + tokens + printed standing into ONE number). (LOCKED)** Each beer **type** has a value marker on a shared **value track**. A cask's payout when enshrined = **its type's value at that instant** (recorded on the owner's standing track). This replaces per-cask aging (no age dials) and folds the old "printed standing + VP tokens" into a single, legible number.
  - **DOWN:** each time a type is *realized* — **deployed for reach OR enshrined for standing** — its value drops a step (the market cools). So the volume crowd flooding a type erodes the prestige crowd's payout — the reach-vs-standing duel, now expressed as **timing**: every turn you leave a cask out reaching, its standing value may be bleeding away as others sell your type.
  - **UP (auto):** **buying a recipe** of a type nudges it **+1** (investment stokes demand; makes climbing the recipe ladder pay).
  - **UP (paid lever):** the **Fair tile** — a slot tile whose **line action lets the active player pay 1 good to raise one type +1**; the **fee goes to the Fair's owner** (toll-baron market stall; the owner pays the supply when self-using, so it's never free). Because pumping is a *line* action, **placement matters**: a Fair on a Hall line lets you **pay → pump Bock → enshrine Bock high in one activation** (pump-and-dump), capturing your own pump before rivals react. The grid's build×cash-out geometry is what enables the chain.
  - **Guardrail:** a pump (+1) is **never larger than a realize-drop (−1)**, so under steady play the market trends down and can't be farmed into inflation. Floor and ceiling bound the track.
- **The self-enshrine reason** falls out of the market: cash your type while it's high; don't get caught holding when reach-floods or a rival's enshrine tank it. Owner agency restored without per-cask bookkeeping.
- **Theme collision fixed. (LOCKED)** Reach **owns the kontore** — the Harbor exports your beer to Bergen/London/Bruges/Novgorod (getting it onto every foreign shelf, the Leffe move). Standing is **withdrawal from commerce** — enshrining a cask into the brewers' **Hall** as a permanent monument (the Westvleteren move). **Cell C is renamed Kontor → Hall.** "Kontor" now means exactly one thing: the export destinations on the route board.
- **Readability (LOCKED):** the standing stack is tactile sediment (colored tile edges let you eyeball composition); the **scoring-relevant value lives on each player's standing track**, and each enshrined cask's **goal flips face-up** into a small personal row. Nothing is ever hidden in a pile; no memory advantage.

**Scoring (v0.5):** **Reach** = your deployed casks (presence) × route value + majorities · **Standing** = your standing track (sum of market values banked at enshrine) · **Goals** = best-3 of your enshrined casks' face-up goals. (VP tokens retired — folded into the market value that drives standing.)

**Slot economy (v0.5):** shared perimeter slots (8) now hold **deployed casks** (reach + actions, enshrine-able), **Fair tiles** (paid market pump), **route lanes** (open/value a route + resource skim), and **ships/trade houses** (resource faucets). Casks are the transient flow (enshrined off); infrastructure is sticky. **Personal slots (2–3)** hold working casks. Tight at 4p by design — but the engine-vs-score tension lives on your *personal* slots, so it doesn't depend on winning the shared-slot crush.

**Engine deltas (`play.html`) intended this pass:** cask 3-state lifecycle (deploy / install / enshrine); cask = presence on deploy; any-player enshrine from a slot; market value drives the single standing payout (tokens removed); recipe-buy +1 and the Fair pump tile; Kontor→Hall rename; cargo/sail ship mechanic retired (ships become resource faucets). Personal-slot "working" state may ship simplified first and is flagged in-page.

**Still open / next dials:** market step sizes, floor/ceiling, and the Fair cost; how strong a working-cask's station boost is; cost to enshrine a *rival's* cask (an action — watch mild kingmaking on eviction timing); whether ships stay as faucets or fold into lanes; end-game trigger under the new reach model; human playtest.
