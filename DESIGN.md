# Working Title: *Brewhouses of the Hanse*

> A theme-first medium euro about a merchant brewing house in the Hanseatic League. You brew beer — hopped beer is the cargo that survives the voyage — and push it across the Baltic and North Sea trade network. **One legible loop — Source → Brew → Age → Ship — walked on a shared grid;** a brewed cask is a dual-role tile (engine on the shared wharf, then points when shipped); ships are owned infrastructure; **where you ship is the volume-vs-prestige choice.**
>
> **⚠ v0.7 "The Wharf" (2026-06-05, `§21`) is the current design and supersedes the v0.5/v0.6 reach-vs-standing/demand-market architecture below where they conflict.** §1–§20 are kept as the design record (the *why* we got here); read §21 for the live game, then `RULES.md`.

---

## 1. Snapshot

|               |                                                                                     |
|---------------|-------------------------------------------------------------------------------------|
|**Players**    |2–5                                                                                  |
|**Length**     |≈ 45–60 min at 2p (medium — was billed 15–20 min/player at heavier weights)           |
|**Genre**      |Medium euro · engine building · shared action grid + private brewery                 |
|**Weight**     |GWT/Distilled (v0.7) — *not* Lacerda                                                 |
|**Sensibility**|Theme-at-the-heart, *Great Western Trail* / *Distilled* legibility (was Lacerda — see §21)|
|**Status**     |v0.7 "The Wharf" — full reel-in to medium weight; rules locked, numbers ⚙ open.       |

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
  - **Type** = a global quality rung. **Anchored spine + variable export:** **Gruit → Hopped** is fixed and historical — hops is the preservation tech that *opens the sea routes* and gives the game its title — then the premium tiers **L3–L5 are filled by historical Hanse beers dealt in a variable order/subset each game** (**Bock**/Einbeck, **Mumme**/Braunschweig, **Broyhan**, **Keut** ⚙; reskins the anachronistic *Dubbel/Tripel* placeholders). Stable on-ramp, unpredictable export.
  - **Recipe** = a collected instance of a type (above).
  - The current **type frontier gates the Market's recipe supply** (you can only collect recipes of unlocked types). **Frontier advances production-driven** ⚙: as a type's market saturates, its value drops *and* the next tier unlocks — one causal loop (flood gruit → gruit cheapens → premium recipes appear → the market tempts you upward). This is the **depth-pull tension**: a cheap high-type recipe sits in your book *wanting to be brewed*, pulling a reach-committed player up the ladder.
- **Value economy — variable value without breaking end-game scoring. (LOCKED)**
  - **End-game scoring is preserved** (`RULES.md` §6 backbone intact: reach, majorities, standing, the g1–g10 goal layer). Cask tiles keep their **printed base VP**.
  - **Value rides on types** (a **linear value track**, marker per type ⚙); **routes stay the access/majorities axis** (the quality→destination gate). The combination is the **race condition**: reach floods a type → its track marker **ticks down** (saturation); the quality player wants to cash in before the volume player tanks it. Neither perfectly times the other → the unsolvable, diceless tension.
  - **VP tokens = a spendable 3rd resource**, minted on each **sale** (ship *or* enshrine) **scaled by the type's current track position** — value *locked in metal* at the moment you sell well. **Spend** mid-game for tempo/power (sinks ⚙) **or bank** as **1 VP each** at end. Tokens are a **modifier on top of** printed cask VP, **never a replacement** — so the backbone never destabilizes, and "lock in value at its peak" lives here (replacing the retired enshrine-freezes-value framing).
- **End-game trigger = 2 of the 4 kontor cities saturated. (LOCKED — supersedes the v0.1 twin clocks: Kontor-stack-N and single-route-full.)** Visible on the table and **steerable in opposite directions**: reach races to slam a second city full and end it; standing delivers to the empty cities to prolong. Player-driven, telegraphed.
- **Still open / next dials:** type-frontier advance threshold (how much production flips a tier) ⚙; value-track length & step size ⚙; VP-token yield curve and the 1–2 spend sinks ⚙; the export roster's per-beer mechanical hooks (e.g. Bock needs the Aging Cellar; Mumme = slow/high-standing) ⚙; 2-of-4-cities pacing vs route capacities.
- **Verified by economy sim (`playtests/v03-economy-findings.md`, 2026-06-03):** the new subsystems interlock — value decays per sale, the production→frontier loop fires (export reaches ~L4), and **2-of-4-cities scales with player count** (3–4p end reliably at rounds ~18–25; **2p too slow → needs lower route caps**). **Open balance issue (structural, not the value gradient):** enshrining is unbounded while shipping is route-capacity-bounded, so standing still out-scores reach (~75–89% wins). Fix candidates: token bounty for saturating a city / majorities→tokens / sail dividends in tokens; then implement v0.3 in `play.html` to test reach's real multipliers (vessels, cap-fire, sail dividends, tolls) which the abstract sim can't see.

### Revision — balance philosophy: the Great Western Trail blend ideal (2026-06-03) — LOCKED

The 2026-06-03 sim's 75–89% pure-standing win rate reframed the balance goal. The target is **not path-parity** (reach "losing" a head-to-head vs standing is fine) — it is **"no *pure* path wins."**

- **The GWT model.** Like *Great Western Trail* (cowboys / engineers / builders, where the winner almost always runs a **blend of two**), Breweries has three leanings — **Reach** (volume / presence / majorities), **Standing** (enshrine / quality), **Engine** (recipe book + climbing the type ladder & value track). A **pure single-lean strategy should under-perform a blend.**
- **The blend is chosen *as you play*, by reading the board** — your lane placements (you author what scores), the dealt export, opponent occupancy & majorities. The winning mix should **vary by game**, not be solvable pre-game. *Starting positions + interaction make or break a strategy, and you settle into one mid-game.*
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
- **Type frontier + recipe book ported into `play.html`.** Market recipe supply is gated by the global type frontier (opens at Hopped; advances production-driven as a type's league sales cross a threshold ⚙, also ticking that type's value down — the one causal loop). The export (L3–L5) is **dealt from {Bock, Mumme, Broyhan, Keut}** each game (3 of 4) over the fixed L3/L4/L5 rung stats; the top rung needs the Aging Cellar.
- **All pages now agree on the canonical constants** (the single source of truth for the visualizer, rulebook, printables, and engine):
  - Cell map **A=Market · B=Harbor · C=Kontor · D=Brewhouse** (build×cash-out diagonals).
  - Type ladder: Q **1/2/3/4/5**, brew steps **2/3/3/4/5**, base standing **—/3/5/7/10**, value-track start **3/4/6/8/11** → floors **1/1/2/3/4**.
  - Route caps **player-scaled** `base{2,1,0,2}+playerCount`; quality gates **Bruges 1 · London 2 · Bergen 2 · Novgorod 3**.
  - Goals: the **cycled 9** (g1/g2/g6 reach · g3/g4/g10 standing · gV/gC/g8 engine), **best-3 score**.
  - End-game: **2 of 4 cities saturated**. Scoring: Reach → Majorities → Standing → Goals(best-3) → VP tokens.
- **Casks are cargo, never slot tiles; shipping loads them into ships** — the §9 "cask into a working slot" framing is purged from every page.
- **Still open (unchanged):** type-frontier threshold tuning; VP-token spend sinks (bank-only for now); per-beer export hooks; pure-Reach/pure-Engine balance under the two-axis target; human playtest.

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

---

## 20. Working Architecture — v0.6: the Brewhouse Floor, recipe cards, ships as single-use carriers, the Sailed-Ships clock (2026-06-04) — LOCKED

A design-conversation pass tightened the player board and rebuilt the **reach** half of the game so it has a real engine (ships + routes) to mirror the **standing** engine (rooms + export brewing). The trigger was a print-prep observation: the player board had **too many dedicated slots** that never fill, so placement was rarely a sacrifice. The fix is the euro move — **scarcity + multi-use** (Brass / Ark Nova / Vinhos) — plus a Lisboa-style card tuck for recipes and a Hanseatic shipping loop that doubles as the game clock. This supersedes v0.5 where they conflict; the **spine (dual-role cask · demand market · 2×2 build×cash-out grid · reach vs standing as timing)** is unchanged.

### A. The Brewhouse Floor (LOCKED) — replaces the 4 room slots + 3 personal cask slots
- One row of **4 multi-use Floor slots.** Each holds **either a Room** (permanent depth) **or a working Cask** (temporary engine) — never "a place for each kind of thing."
- **Vessels stay separate** (start 1, cap 3). **Extra Vessel is a Room**, so it costs a Floor slot *and* unlocks a brewing lane — running 3 vessels spends 2 of your 4 Floor slots (the Brass "can't build wide and deep" squeeze, now constant and visible).
- **Installing a Ready cask as working is free but needs an open Floor slot.** If the Floor is full, the Ready cask **clogs its vessel** until you deploy/enshrine something — so Floor scarcity and brewing back-pressure become *one* tension. A working cask is still assigned to a station (Market/Brewhouse/Harbor) and souped/twin-sharpening as in v0.5.
- *Why:* every parked engine-cask is a room you didn't build, and vice versa. ~7 dead slots → 4 live, contested squares.

### B. Recipes → dual-use cards (LOCKED) — the Lisboa tuck
Recipes stop being tiles in a "book" and become **cards** acquired **only at the Market** (unchanged acquisition point). Each card is dual-use, rhyming with the dual-role cask:
- **Acquisition boon (one-time, on collect) — made deliberately BIG (≈ a free action), scaling by tier:**
  - **L2 Hopped — *Stocked Pantry:*** +2`G` 2`H`
  - **L3 — *Brewmaster's Push:*** advance 3 across your vessels (a free Brewhouse)
  - **L4 — *Grand Market:*** take 2 goods **and** buy one slot tile (lane/ship/Fair/room) at **−1**
  - **L5 — *Master's Privilege:*** **choose one** — advance 3 / +2`G`2`H` / a free Market / a free Harbor deploy of a Ready cask
- **Permanent brew strip:** the card **tucks under the bottom edge of the player board** (Lisboa-style), only its **type + cost profile** (`n G · n H · n steps`) showing. Your fanned row of strips **is** your recipe book; you brew from any tucked strip forever.
- **Soft cap = the board edge:** **6 tuck guides.** Collecting a 7th forces you to **discard a strip** (lose that brewable type) — Brass hand-management, softened because you already banked the card's boon.
- **Still pumps its type +1 on collect** (unchanged); boon-pumps respect the `pump ≤ drop` guardrail.
- **Guardrail:** boons grant **resources / tempo / small presence only — never standing or raw VP** (only L5 offers a single *reach* assist), so the cash-out cells keep their job and the two axes stay earned.
- **Founding-style order hook (optional):** your **first/bottom** strip is your *founding style*; **one** optional Goal rewards casks of that type — a cheap reason to commit early and to care about acquisition order.
- *Component shift:* recipes move **tile → a small face-up Market deck** (frontier-gated). Good for the paper copy and removes recipe tiles from the box. Start: **Gruit baseline** (printed on the board, always brewable) **+ 2 random premium recipe cards.**

### C. Ships → single-use carriers + the Sailed-Ships clock (LOCKED) — reach gets an engine
v0.5 ships were passive faucets (the cargo/sail mechanic having been cut for speed). v0.6 brings back **transport without leg-by-leg movement** — a clean **load → fill → sail** lifecycle:
- **Build** (Market): a ship goes in a perimeter slot, **assigned to a destination kontor**, with **capacity Cog 2 / Hulk 3**, inheriting that route's **quality gate**.
- **Load** (when the ship's line fires — by *anyone*): the active player may put one **Ready** cask that meets the gate aboard. The **loader takes a small benefit**; the **owner skims a good** (toll-baron, like a Fair). *(Realizing −1 on the type happens when the cask becomes presence, i.e. on sail.)*
- **Sail** (the answer to "what makes a ship leave its slot"): the instant a ship is **full**, it casts off — every cask aboard **drops as presence (reach)** at the destination, the **owner banks a per-kontor destination bonus**, and the **ship tile moves to the shared Sailed-Ships track** (it is *consumed* — single-use; a new ship must be built). *(Relief valve: the owner may launch a partial ship early via a Harbor action.)*
- **Destination bonuses (owner, on delivery) ⚙:** **Bruges** +2`G` · **London** a Privilege · **Bergen** a monopoly toll / majority help · **Novgorod** the biggest (a presence/standing kicker).
- **Ships are the way to reach the far kontore.** **Harbor direct-deploy reaches Bruges only**; London/Bergen/Novgorod presence comes through a ship (the **Quay room** upgrades direct-deploy to any open route, as a deliberate Floor investment — the builder's alternative to the merchant's ships).
- **The merchant archetype** is now a first-class *reach* lean: open routes (author their value), run ships (skim every load + destination bonuses + your own casks delivered for presence), recycle goods/Privileges into more routes and ships — all still fed by brewing (you must brew to have casks to load). Guardrail: destination bonuses are mostly **engine fuel**, so the merchant converts into reach/standing rather than minting a separate point pile.

### D. Differentiated route lanes (LOCKED)
A lane still raises its route's end value **and** fires a skim — but the skim is now **per-kontor and authorial**, not a flat +1`G`:
- **Bruges:** +1`G` (liquidity) · **Bergen:** a toll (a rival who delivers/loads to Bergen pays the lane owner a good) · **London:** advance/draw on the Privilege track · **Novgorod:** +1`H` or advance a brew a step.

### E. Weak alternates at the cash-out cells (LOCKED)
Both cash-outs stay intentionally weak/situational (dead-on-turn-1 is a *feature* that pushes opening variety onto the builder lines), but get a small fallback so an empty visit isn't wasted:
- **Harbor (no deploy/load): *dockwork*** — +1 good (or +1 to one open route's value).
- **Hall (no enshrine): *petition*** — +1 flat standing, or peek/swap one of your face-up goals.

### F. End triggers (LOCKED) — the Sailed-Ships clock replaces city-saturation; a standing trigger replaces the turn cap
- **Primary — the Sailed-Ships track fills.** Each voyage = one slot; **shared, visible, self-accelerating** (the more the table ships, the sooner it ends — a self-balancing reach clock). Slot count is the master length dial: **~6 / 8 / 10 / 12 for 2 / 3 / 4 / 5p ⚙.** Smoother than city-saturation (a Hulk's 3-presence burst is still just one slot).
- **Backup — N casks enshrined total** (player-scaled ⚙). Replaces the arbitrary turn cap: any enshrine advances it, so it can't deadlock, and with the Floor only 4 slots (vessels clog) players are *forced* to cash out — one clock always moves.
- **Whichever fires first → finish the round → score.** No turn limit.
- **City saturation is no longer an end trigger** — route caps remain only to clamp presence and settle majorities. *(Optional flourish ⚙: milestone slots on the Sailed-Ships track advance the type frontier / refill the Market, tying shipping tempo to the market boom.)*

### G. Casks — shared pool, ownership discs, age vs quality (LOCKED, clarified)
- Casks are **brewed, never bought**, from a **shared supply with fixed global counts** (~L1×16 · L2×20 · L3×12 · L4×8 · L5×4) — so the rare export casks are a **contested** resource. A player's cap is "what's left to brew," not a personal allotment.
- **Ownership** needs marking only for a **deployed cask in a shared slot** → a **colored disc**. Working casks (your Floor) and enshrined casks (your goal row) are owned by location.
- **Quality is printed on the tile** (Q1–Q5, static, set at brew). **Age is tracked by the cask's position** on its vessel's Load→Ferment→Age→Ready track, plus **one aging cube** per brew to count the Age dwell (Gruit skip · L2/L3 1 · L4 2 · L5 3 pips). Per-player colored cask sets were rejected (5× printing, kills shared-pool scarcity and the cycled-goal pool).

### Scoring (v0.6) — unchanged structure, now two real engines
**Reach** = presence × route value + majorities (engine: **routes + ships**) · **Standing** = standing track (engine: **rooms + export brewing**) · **Goals** = best-3. Both run on brewed casks; the demand market still couples them as a timing decision.

### Engine deltas (`play.html`) intended this pass
Floor = 4 multi-use Room|Cask slots (rooms + working casks share them; Extra Vessel consumes one); free install gated by Floor space + vessel clog; recipes become dual-use cards (big on-collect boon + permanent brew strip + 6-cap discard); ships become single-use destination carriers (load-on-line-fire by anyone, owner skim, fill→sail→presence+destination bonus→Sailed-Ships track); Harbor direct-deploy limited to Bruges (Quay room → any); differentiated lane skims; weak Harbor/Hall alts; **end triggers = Sailed-Ships track full OR N enshrined → finish round** (city-saturation & turn-cap retired). Bump the save `KEY` (state shape changes).

### Still open / next dials (v0.6)
Sailed-Ships slot counts & the enshrined backstop number; ship build cost vs single-use payoff; destination-bonus magnitudes; how hard the 6-card recipe cap should bite; whether realize −1 fires per cask on a multi-cask sail; the optional Sailed-Ships milestone flourish; human playtest of the merchant lean vs the prestige lean.

---

## 21. Working Architecture — v0.7: "The Wharf" — a ground-up reel-in to GWT/Distilled weight (2026-06-05) — LOCKED

A design-conversation pass that **re-targets the whole game** and rebuilds it around what the designer actually found fun. v0.6 was honest about its ambition — "Lacerda-grade interlocking systems" — but a play-through and a headless pace model showed that ambition was the problem: **too much game, the right amount of theme.** This section supersedes §5–§20 where they conflict. The grid, the perimeter ring, the dual-role cask, the merchant-shipping fantasy, and the theme survive; roughly **half the rules are cut.**

### A. The diagnosis we acted on
- **Weight mismatch.** The target is now explicitly **Great Western Trail / Distilled** (medium, theme-rich, *actions simple — depth in placement, timing, and interaction*), **not** Lacerda. The v0.6 stack (demand market + type frontier + single-use ships + Fairs + Privileges + 4 differentiated lane skims + 4 destination bonuses + working casks + twins + a 3-way goal cycle) was a Lisboa teach for a game that wants to be a great *second* heavy euro after Wingspan.
- **The actions were inverted.** In the comps the **actions are simple** and depth lives in how they combine. v0.6 made each of the four cells a multi-stage sub-game and capped *stops* (4) without capping *decisions* (6–8) → "fragmented."
- **The bootstrap was brutal — measured, not guessed.** A faithful legality-checking pace model (real constants, solo, perfect play) put **first Bruges deploy at turn 2** but **first *voyage* at turn 6** (matching the designer's playtest), and the real far-kontor fantasy at ~turn 7 *and goods-bankrupt without dedicated goods-turns.* Three structural truths: the first voyage was gated at **two casks** (Cog cap 2); the bootstrap was **goods-bound, not brew-bound** (so extra vessels barely helped); and the optimal line was **invisible**, so a real explorer experienced "never." *(Model in `/tmp` during the session; the punchline is what's recorded here.)*
- **The tiles had lost their fun.** Slot tiles fired tiny `+1 good` skims **out of turn** (counter-intuitive), empty caps were skipped (so early lines were just two cells — "slots feel unused"), and the working-cask Floor state paid `+1 good` for a brewed cask + a contested slot (dominated → "lackluster"). The designer's instinct — *make casks the tiles that bear real actions* (the way ships already bear the load action) — is the founding §8 dual-role vision, finally made fun.

### B. The spine (LOCKED) — one loop, walked on the grid
- **The four cells ARE the loop, and the forced-move circuit walks it:** **A Market (Source) → B Brewhouse (Brew) → D Cellar (Age) → C Harbor (Ship) → repeat** (clockwise A→B→D→C→A). Every line is two adjacent loop-steps (`Market+Brewhouse`, `Brewhouse+Cellar`, `Harbor+Cellar`, `Market+Harbor`) — each activation is a useful segment. The v0.6 build×cash-out diagonal is **retired** in favor of legibility (the warm start + faster pace made its anti-snowball job unnecessary).
- **The dual-role cask in three states** (the §8 heart, restored): **maturing** (private, in a vessel) → **on the wharf** (a shared ring slot — simultaneously your cargo-in-waiting, private inventory, *and* a public action-building) → **delivered** (shipped to a destination → scores → gone). Shipping converts it.
- **The wharf = the perimeter ring, GWT-style.** The 8 slots hold a transient mix — **deployed casks** (public action-buildings), **owned ships**, and **2–3 neutral buildings** seeded at setup (so the ring is alive turn 1). **One fire rule:** on a line, the active player may use each building on it; cask/neutral actions are **free and public** and resolve **on the active player's turn** (no out-of-turn gains — the v0.6 thing that felt wrong is gone). Cask actions are **chunky and loop-advancing**, keyed to type (Gruit→Source 2 · Hopped→Age 2 · L3→free Load · L4→+1 presence · L5→Wild), so *which type you brew is an engine choice.*

### C. Where the value lives now (LOCKED) — the big simplification
- **The two value tracks (reach/standing) and the whole demand market are cut.** The **volume-vs-prestige lean is expressed as *where you ship*:** kontore (Bruges/London/Bergen/Novgorod) pay trade value + majorities (the Leffe/volume move); **the Hall** is a *destination* that pays prestige for taking a cask out of commerce (the Westvleteren move). Same verb (ship), different destination. This deletes a cell, a value track, and the frontier in one move.
- **Aging replaces the demand market as the value-over-time signal** — intuitive (you must mature beer before it ships) — and cross-player coupling now comes from **destination scarcity** (kontor caps + majorities), **shared wharf slots**, and the **one shared end clock**, not a market track.
- **Destinations differentiate by a quality *gate* (the climb — better places want better beer) and a unique *benefit*** (often a brewery upgrade/modifier), closing the engine loop **deliver → earn upgrade → brew better → deliver better** (the Distilled "selling funds your next still" feel). All destinations are **open from the start** (route-lane tiles cut) — variety over limitation.

### D. Interaction (LOCKED) — non-destructive, and a little out of your hands
- **Shipping a rival's cask:** on your turn you may load a **rival's wharf cask** (never their brewery) onto **your** ship. The destination is **your ship's binding**; the **owner still scores it and picks its benefit** (never purely harmful); **you** get the freed slot, the filled ship toward your end-clock, a small loader bonus, and the timing. Positive-sum with a twist — and thematically *a 1350 brewmaster doesn't fully control where their casks end up.*
- **Cells are never blocked** (twins cut). The only contested space is the shared wharf.

### E. Pace fixes (LOCKED) — so the fun starts turn 1
- **Warm start:** begin with one built Cog (bound to Bruges) and one Ready Gruit **in a vessel** (deploy it turn 1) → first voyage by turn 2–3. *(2026-06-06: the starting Gruit moved off the shared wharf into the vessel — de-jams the ring at setup, uniform at all counts.)*
- **Start with 2 vessels** (cap 4), **base verbs always work** (ring buildings only *add*), and **all destinations open** → the goods/geometry bootstrap the model exposed is gone.
- **Recipes reel in hard:** start **Gruit + Hopped** (fixed, symmetric, fair — and so *gaining an export recipe means more*); recipes are just *permission + cost to brew a type* — the on-collect boons, the 6-card tuck, and frontier-gating are cut.
- **Game-length target: ~12–25 rounds** (the `MAX_ROUND` ceiling sits at the top of that band, ≈25 ⚙; good play ends earlier on the Sailed-Ships clock). The Sailed-Ships length is the primary pace dial.

### E′. The Charter relief valve (added in the `play.html` port, 2026-06-05)
Porting §21 exposed a **hard deadlock the bare wharf model allows**: owned ships are **consumed** when they sail, the ring is tight, and "a cask must be on the wharf to ship" means that once *all* your ships have sailed **and** the ring is full of casks **and** your vessels are clogged with Ready casks, there is **no legal move** — you can't brew (vessels full), deploy (ring full), ship (no ship), or build a ship (ring full). The fix is a small, always-available escape that keeps the loop **provably live**:
- **Charter** (Harbor): pay **⚙2 `G`** to send **one** Ready cask — vessel *or* wharf — on an immediate **single-cask voyage** to a gated destination. It delivers (scores + benefit) and **advances the Sailed-Ships clock** like any voyage.
- **Why it doesn't undermine the merchant fantasy:** one cask for the fare makes it **strictly worse per cask** than a Cog (2 casks / 2 `G`) or Hulk (3 / 3 `G`), so owning ships stays the efficient race; the Charter is the pricey flex/relief, not the plan. Because you can always Source 2 `G`, the loop can never lock.
- **It is the spec's missing companion to "launch a partial ship early"** — that valve needs a ship to launch; the Charter needs none. *Decision: LOCKED into the design (folded into `RULES.md` §5, `COMPONENTS.md`, `TILES.md`).* Tuning the cost / clock-effect is open.

### F. Scoring (v0.7)
**Delivery value** (your delivered casks, by destination — kontore trade value + the Hall's prestige) **+ majorities + goals (best few).** No separate tracks; the lean is a strategy, not a silo.

### G. What this cut (the reel-in tally)
Out: the **demand-market track**, the **type frontier**, **Fairs**, **route-lane tiles**, the **Hall action cell**, the **working-cask Floor state**, the **fires-when-blocked twins**, **differentiated lane skims**, **recipe boons / the 6-card tuck**, **aging cubes**, and **casks-as-presence-while-they-sit**. In their place, four ideas do the work: **aging** (the value clock), **destinations** (the two value styles), **the shared wharf with one fire rule** (engine + interaction), and **deliver-to-upgrade** (the engine loop). Theme fully intact; ~half the rules gone.

### Engine deltas (`play.html`) — DONE (2026-06-05 port)
Full rewrite shipped: grid relabel to the loop (Market/Brewhouse/Cellar/Harbor); cask 3-state lifecycle (mature → deploy to wharf → ship); the wharf ring with one fire rule + chunky public cask-actions + seeded neutral buildings; ships build/load(base-verb or line-fire)/sail → Sailed-Ships clock; destinations with gates + benefits + majorities; owner-scores-and-picks even on a rival ship; brewery = vessels + upgrades; warm start; the **Charter** relief valve (§E′); **no demand market / frontier / Fairs / twins / Hall cell**; scoring = delivery + majorities + goals; `MAX_ROUND` ceiling reeled to **25** (the 12–25 target). Save `KEY` → `hanse-hotseat-v8`. **Smoke-tested headlessly** (mocked-DOM `vm`, bot driven off the engine): 100+ games at 2–5p reach game-over **crash-free and deadlock-free**, plus a targeted test of every cask action, the convert, the London/Bergen benefit pickers, and scoring. *All HTML pages (`learn`/`index`/`rulebook`/`printables`/`play`) and the markdown are now v0.7.*

### Still open / next dials (v0.7)
Warm-start contents & starting vessels vs **Sailed-Ships length** (the joint pace dials; **target 12–25 rounds**); **Charter cost** (⚙2 `G`) & whether it advances the clock; cask-action strengths & whether every cask bears one; destination values/gates/majority bonuses (the variety heart); the rival-ship loader bonus & best-vs-forced destination gap; ring pressure at 2p/5p; which upgrades come from deliveries vs Market; goal count & best-few cap. **Wants a human playtest of the loop's feel and pace** before the numbers are trusted.

### Sim pass — 500 games surface the pace/depth coupling (2026-06-05)
A 500-game headless sim (a *competent* bot that climbs the type ladder and ships to every destination, plus per-turn invariant checks) hardened the engine and re-tuned pace:
- **Correctness is solid:** **0 invariant violations, 0 deadlocks/stuck games** across 500 games at 2–5p; every mechanic exercised (all five cask types brewed, all five destinations delivered to, every upgrade earned, the L5 Wild fired, rival-cask loads & partial launches & charters all occur).
- **Pace was too *fast* at high counts, and that starved the depth.** With the linear ~6/8/10/12 caps the shared clock filled in ~8 rounds at 4–5p (under the 12–25 band) — and because the game ended so soon, the **export climb barely came online** (few l4/l5, Novgorod marginal). The clock fills *super-linearly* with player count (cross-traffic line-fire loading + charters + partial launches), so the cure was to **steepen the caps to ~7/11/15/19 ⚙ (≈ +4 per player).** Re-sim: medians **12–15 rounds**, 99–100% clock-ended, and l4 +60% / l5 +150% / Novgorod +85% — the depth now has room to breathe. *(`MAX_ROUND` 25 still caught ~1% of 4p games as the backstop.)*
- **Open balance signals (greedy bot — not verdicts):** **Bruges still takes ~55% of deliveries** (the Q1 on-ramp) and **Novgorod stays the thinnest** kontor; win margins run wide (no defensive play in the bot). These are for the **human playtest** to judge — the sim's job was correctness + pace, both now in hand.

### Destination tweak — Novgorod earns a Modifier (2026-06-05)
The sim's "Novgorod stays the thinnest kontor" signal (it was *pure value*, while London/Bergen also handed out an upgrade) got addressed: **Novgorod now grants a Modifier on delivery, on top of its highest value.** So the premium Q3 long-haul pays the most *and* earns a perk — the strongest reward, fitting the hardest gate. Benefit map now: **Bruges → goods · London → any Upgrade (room/mod) · Bergen → a Modifier + the biggest majority · Novgorod → a Modifier + top value · Hall → prestige (Q×2).** A *benefit-aware* re-sim shipped **2.4× more casks to Novgorod** (477→1124) and pulled Bruges' share down — Novgorod is a real destination now. (Engine + all docs updated; 0 invariant violations on re-sim.)
- **⚙ Open idea (parked):** the designer floated **tying the Charter cost to a track** — i.e. an *escalating* fare (cheap first charter, dearer each subsequent one) so that early "charter a cask to grab an upgrade or two" stays a clean opening play but **spamming the relief valve costs more.** Interesting interaction with the Novgorod/London/Bergen benefit outlets (charter-for-upgrades). Left flat at **2 `G`** for now; revisit after a human playtest of the charter's feel.

### Market "option B" — a face-up Upgrade display (2026-06-05)
Pinning down the Market's table presence: **recipes & ships are an always-available supply** (you can always buy a build option), but **upgrades sit in a shared face-up display** — a row of **4 ⚙** drawn from a shuffled Upgrade supply (~2 of each + extra Extra Vessels), refilling as tiles are taken. You **buy** from the display (pay its cost) **or earn** one *free* by delivering to **London / Bergen / Novgorod** — the **same** display. So *"you ship a cask but don't fully know what'll be on offer at the other end."*
- **The room/modifier split between kontore dissolves into the one display.** Novgorod-earns-a-Modifier (above) is superseded: the three engine-kontore each just **take a face-up Upgrade**, and they differ by **value · majority · gate** (Bruges = goods, the Hall = prestige, stay the outliers). Cleaner to teach, and it's the source of the contested "what's in store" tension.
- **Footprint:** the Market is then a few always-stocked supply stacks (recipes, ships) + a **4-tile face-up upgrade row** + a small facedown bag — tight, *Great Western Trail*-scale. Verified in `play.html` (160-game headless: 0 violations, all 11 upgrades reached via 504 buys + 591 delivery-earns). Save `KEY → v9`.
- **⚙ Open idea (parked):** **evolve recipe acquisition** — recipes are presently a flat always-available supply; there's room to give them a display/tension of their own (a recipe row, a draft, or a frontier-lite) rather than "always buy any export recipe." Left as-is for now.
- **⚙ Open:** display size (4?), supply counts/contestation, whether a delivery should let you draw deeper if no grantable tile is face-up (currently the benefit can whiff), and whether some upgrades should be delivery-*only* again (currently all are both buyable & earnable).

### Terminology + setup trims (2026-06-06)
Three small, player-tested-by-feel calls:
- **"Summit" tier → "Export."** The premium L3–L5 beers were a *design* placeholder ("Summit" = ladder position, nothing to do with beer). Renamed to **Export** — Bock/Mumme/Broyhan/Keut were literally the Hanse's famous *export* beers, and it ties to the game's export-trade spine. (Player-facing labels + spec + printables; the dealt names still show in play.)
- **Starting Gruit moved off the shared wharf into a vessel.** It begins **Ready in Vessel 1** (deploy it turn 1) rather than pre-placed on the 8-slot ring — de-jams the wharf at setup and is uniform at every count. The **Cog** stays the load-bearing warm-start piece.
- **First-player rotation removed.** Turn order is **fixed** for the whole game (one fewer round-bookkeeping bit players found easy to forget). This concentrates any first-mover edge (notably first pick of the shared Upgrade display) on seat 1, so **seat compensation** — likely extra starting goods for later seats — is now an **open ⚙** to size at human playtest. (Argued both ways first; the designer chose simplicity now, compensation later.)
- **Print &amp; Play redesign:** everything re-laid for **US Letter landscape**; casks carry a big card-corner quality index (a `gem` icon + number, no "Q"); tiles get a 1/8″ bleed past an inner safe-frame, tokens a bleed ring for laser cutting; **recipes became cards** (a board tuck strip; a dual-purpose acquire bonus is TBD); and a redesigned **Destinations** board (clean title bars, `L#+` quality gates with a quality icon, a `★` VP icon on every value, one cask slot + a per-player presence/majority marker track).

### Balanced wharf seeding + the "grid is a rondel" diagnosis (2026-06-06)
A designer review of the grid raised the central health question: **is the action-selection grid solvable — i.e., is the best play just to walk the loop like a rondel?** Two findings and one change.

- **The opening was deterministic (fixed → spread). DONE.** The seeder placed the warm-start Cogs and the 2–3 neutral buildings by iterating the `SLOTS` array in fixed order, so the neutral *positions* never varied (at 2p **both** neutrals always landed on the top row; at 4p both on the bottom). The *types* were random, the *lines* were not — so one line was reliably the richest opening. **Fix (LOCKED):** the warm-start tiles are now **spread across the weakest lines** — each tile placed on the currently lightest-weighted line with an open slot (neutrals weighted heavier so two never stack while a lighter line is open), with random tie-breaks + random slot-within-line. Every line now carries ≈ one seeded tile, the south is worth visiting from turn 1, and the opening varies every game. (`play.html` `freshState`; `KEY → v13`; 500×3 sim clean — 0 crashes/deadlocks, pace 12–13 rounds, seats fair. `RULES.md` §0, `COMPONENTS.md` §1, `rulebook.html` §5 updated.)
- **The deeper issue is structural and NOT fixed by seeding (OPEN ⚙).** On a 2×2, the adjacency graph is a 4-cycle (A–B–D–C–A) and **all four lines are edges of that cycle**; the diagonals (A–D, B–C) are the only non-edges. v0.7 maps the loop **onto** that cycle (Source=A→Brew=B→Age=D→Ship=C), so **every consecutive loop-step pair is co-linear = chainable in one turn** — that is the definition of a rondel. Concretely: a player can **camp the top edge (A↔B) and fire columns** — `colL` at A = Source+Ship, `colR` at B = Brew+Age — executing the *entire* loop every two turns while touching all four cells, never going south (only the `s7`/`s4` row-cap slots ever pull them down). The designer's verdict: *"if the game were meant to be walked like a rondel, we wouldn't have a grid."*
  - **Why it's inherent:** on a 2×2 you can only break the rondel by making some consecutive loop-steps *diagonal* (non-co-linear), which forces a 2-move traversal — i.e., the **v0.6 build×cash-out diagonal** (`§19/§20`), retired in v0.7 for legibility. A 2×2 cannot offer a "non-trivial but single-move" loop; it's rondel **or** forced traversal.
  - **The fork to resolve (pending designer call):** **(a)** revert to a diagonal arrangement (movement matters again; cost = the board no longer *teaches* the loop, and some steps cost 2 moves); **(b)** keep the loop layout but make **position genuinely matter via the wharf + occupancy** — richer/contested cap slots that pull the worker around, and likely the **occupancy-pressure** mechanic (Pillar 4, still in `§2`): arriving on a rival's cell lets them also use it / costs a step, so camping leaks value. **The camp problem and the earlier "do we still need blocking?" question are the same problem** — occupancy pressure is the euro-standard answer to "why leave the optimal cell." **(c)** a larger grid (3×3 / 2×4) gives loop-to-topology slack, but adds actions/weight the design doesn't want. *No change made pending the decision; logged as the top open structural item.*

### Resolution — occupancy pressure chosen; build×cash-out parked; the "Wharf" naming (2026-06-06)
The fork above was resolved by prototyping **both** candidates on dedicated branches (sim/engine only), each run at **1500 games / player count**, then a designer decision.

- **Build×cash-out diagonal** (`v0.8-buildxcashout-diagonal`, Brewhouse↔Cellar swapped so the two builders are non-co-linear): robust (0 crashes/deadlocks) but **overshot pace** (rounds 10.6/9.6/9.4, below the 12–25 band) and — with the greedy bot — **choked the premium climb** (Novgorod 1–3%, blended wins ~0%): Source and Brew can't chain, so the bot never builds up. Real effects (anti-snowball, faster game) noted; the climb-collapse is partly a bot artifact. **Parked, not deleted** (branch retained).
- **Occupancy pressure** (`v0.8-occupancy-pressure`, **chosen → merged to `main`**): a **congestion toll** — you pay **1 `G`** to the *supply* when you **move onto a station a rival already occupies** (only your destination station, never the line; **opening placement is free**; capped, never blocks). Toll-to-bank (not the occupant) deliberately avoids the "hand the same tokens back and forth"/kingmaking trap the designer flagged for a 4-station board. 1500-game sim: robust, pace stays **in band** (13.3–13.7 rounds), charters/upgrades ≈ baseline, premium reach slightly **up**, seat bias mild. **Free opening placement** is also the first **seat balancer** (replaces the parked "extra goods for later seats" idea, which stays an open ⚙). *Caveat (LOGGED): the greedy bot doesn't camp, so the sim proves robustness/pace, not that camping is actually beaten — that needs human play or a seat-aware bot.* `KEY → v15`.
- **Naming (LOCKED).** "The Loop" implied a rondel — the exact wrong read. Renamed throughout: **the Wharf** = the whole core area (the four stations + the 8 slots); **stations** = the four action spaces (was "cells"); **slots** = the 8 perimeter spaces (was "the wharf"/"the ring"); **a line = its two stations plus any tiles in their two slots**. The Source→Brew→Age→Ship sequence is now described, never branded "the Loop," and "walk the loop / circuit / rondel" language is purged. Migrated across all five HTML pages, `RULES.md`, `COMPONENTS.md`, `TILES.md`, `PLAYERBOARD.md`, `README.md`, and `CLAUDE.md`; an **Action Reference** table (icons · title · effect, incl. gain grain/hops) was added to `rulebook.html`. (Historical §1–§20 entries keep their original wording as a record.)

### Export beers carry fixed quality; deal 3 of 4 (variable ladder shape) (2026-06-07)
The export tier's setup was reworked from *floating* names to *fixed-quality* beers. **Before:** the four historical names (Bock / Mumme / Broyhan / Keut) were shuffled onto three fixed rungs (L3/L4/L5) — so the names were cosmetic and **the full Q3→Q4→Q5 ladder was present every game.** **Now (LOCKED — "Option 1"):** each beer owns a **fixed quality** — **Broyhan** Q3, **Keut** Q3, **Mumme** Q4, **Bock** Q5 (Broyhan g1h2 / Keut g2h1 differentiate the two Q3s by recipe cost) — and **3 of the 4 are dealt** into each game. Because two beers share Q3 and Q4/Q5 are singletons, dropping one **varies the ladder shape**: drop a Q3 → the full Q3→Q4→Q5 climb (the other Q3 + Mumme + Bock); **drop Mumme → no Q4 tier**; **drop Bock → no Q5 tier** (the Wild cask-action and the top trade value sit out that game). The chosen alternative to the "Option 2" conservative variant (pin Bock+Mumme, vary only the single Q3 → full ladder guaranteed every game), traded a guaranteed climb for more game-to-game variety.
- **Why the interlocks hold.** **Hall** (prestige) gates at Q2 (Hopped reaches it), and **Novgorod** gates at Q3 — and ≥1 of the two Q3 beers is always dealt — so neither the prestige lean nor the hardest kontor is ever locked out by the drop. The action follows the **quality**, not the name (Q3→Load, Q4→Reach, Q5→Wild), so a missing tier simply removes that one cask-action for the game. **Aging Cellar** still grants −1 step always; its "unlocks the L5 export" clause now attaches to **Bock** specifically and is moot in games where Bock is undealt.
- **Engine.** `STYLES` now defines all four export beers with intrinsic quality (no more name-relabeling of l3/l4/l5 slots); `dealExports()` shuffles `EXPORT_ROSTER` and takes 3; the Market lists *this game's* dealt recipes (sorted by quality) via `buyRecipe`. `KEY → v16`. Re-sim (500×3): **0 crashes / 0 deadlocks**, pace in band (2p 15.1 · 3p 14.9 · 4p 14.3 rounds), clock-ended ~99–100% (`sim-results-v16.txt`).
- **Printables.** Recipe-card title strip no longer ellipsizes (full beer name always prints — cost wraps instead); destinations-board upgrade row gap tightened to `.109in` so the tiles stay on one row. Also fixed a stale-number bug surfaced by the consistency audit: the printed **upgrade buy costs were 2–3 `G`** but the engine/spec price them at **4–5 `G`** (the deliberately "dear" price so buying doesn't dominate *earning* by delivery) — corrected on the tiles.

### Consistency audit + v0.8 reconciliation (2026-06-07)
A full read-through of all seven docs + five HTML pages (the source-of-truth `.md` set and the reviewed `.html` artifacts) surfaced a set of drift items, resolved this pass:
- **All six neutral buildings are now implemented in `play.html`** (the engine had only four). Added **Towncrier** — *draw a goal:* pick one from the face-up goal supply (the goals not already in your row; your best 2 still score, so extra goals only ever expand the choice — self-limiting). And **Almshouse** — *+1 presence at a kontor you already lead* (reinforce/break-the-tie on a majority you hold; mirrors the L4 Reach action, gated to kontore where you're a leader). Both keep the engine crash- & deadlock-free (500×3 sim, `KEY → v18`). The docs/printables/rulebook had been advertising these two ahead of the engine; now they agree. *(Designer call: implement all six rather than trim the docs to four.)* The seeder was also corrected to place **2–3** neutrals per game (was a flat 2) to match the long-standing "2–3 ⚙" spec — 3 at 2–3p, 2 at 4p, 1 at the tightest 5p ring; charters tick up mildly with the tighter ring but pace stays in band.
- **Recipe-card "acquire bonus" = a parked placeholder (REVISIT).** The printed recipe cards carry an *"acquire bonus — dual-purpose (TBD)"* strip, but the v0.7 reel-in **cut** recipe on-collect boons (a recipe = type + cost). Decision: **keep the placeholder on the card but it is NOT active in the rules or the engine** — we will design and reintroduce an acquire bonus *after a human playtest* of the current loop. Logged here so the card and the spec are knowingly out of step on a single, flagged TBD rather than silently contradictory.
- **Version stamp:** everything user-facing relabeled **v0.7 → v0.8 "The Wharf"** (page titles/tags/footers, doc headers, README/CHANGELOG banners), with the v0.6/v0.7 *rationale* prose kept as historical record. A proper **`## v0.8`** entry was added to `CHANGELOG.md` (occupancy toll · naming · fixed-quality exports · all six neutrals; KEY v15→v17).

### v0.9 (in review) — the three leans, balanced: tiered majorities, the London/Bergen split, seat compensation (2026-06-07)
A balance pass driven by a methodological upgrade to the sim harness, prompted by a manifesto gut-check ("do top strategy games' levers hold here?"). The greedy bot's blind spots (never the Hall, never Bergen) meant the game's **headline volume-vs-prestige axis and its third "majority" lean had never actually been tested.** Fix: teach the bot to **commit to a lean** (`PERSONAS`: volume / prestige / majority), then measure win-rate by lean across N=1000 × 2–5p. This is now the authority for lean balance (the greedy bot remains the authority for robustness/pace).
- **The big de-risk.** With lean-committed bots, **volume and prestige are balanced and both viable** (they trade the lead by count), and the **GWT blend thesis holds** — "blended" winners jumped from ~23% (greedy) to ~63–74%. The manifesto's sharpest critique ("the prestige lean is marginal — 3% of deliveries") was a **bot artifact, not a design flaw.** The Hall needed no buff; the signature theme axis works.
- **The two real problems the personas exposed.** (1) **Majority-stacking (Bergen) was underpowered** — it lost at every count, worse as players rose (12–24% vs fair 20–33%). (2) **London was a dead destination (~2.5%)** — strictly "Bergen minus the big majority," no identity; a value bump alone didn't revive it (climbers prefer Novgorod).
- **Decision 1 — tiered, ranked majorities (Lacerda-style), concentrated at Bergen.** Each kontor pays **1st/2nd/3rd** by delivered-cask count (tied players split the occupied tiers); **2-player skips 2nd** (winner-take-all, so 2p majority isn't a participation prize). The designer's call was the classic 15/10/5 schedule; the sim showed **15/10/5 overshoots our ~45-pt score scale** (majority dominates, scores inflate to ~50, and — the subtle part — **broad tiered majorities at *every* kontor starve the prestige lean**, which contests none of them). The resolution, both faithful to the structure and balanced: **concentrate the rich majority at Bergen (10/6/3 ⚙)** and keep the other kontore minor and value-led (Bruges/London 2, Novgorod 3 ⚙). *Note:* zeroing the minor majorities entirely **crashes the *volume* lean** (it gets no majority points), so they're load-bearing. Result: **all three leans land within ~1–3 pts of fair at every count** — the "no *pure* path wins" ideal (`CHANGELOG` balance-lesson #6), finally measured rather than asserted.
- **Decision 2 — the London/Bergen identity split.** They were near-clones (both Q2, value 3, "take an Upgrade"). Now: **Bergen = the majority kontor** (its whole draw is the 10/6/3 majority; **no upgrade**); **London = the engine kontor** (the accessible Q2 upgrade destination). Upgrade-earning is **London + Novgorod**. The greedy upgrade economy is unchanged (the bot never shipped Bergen, so removing its grant cost nothing). The clean four-niche board: **Bruges = liquidity · London = engine · Bergen = majority · Novgorod = premium value**, + the **Hall = prestige.** *(Caveat: the greedy bot can't value London's "engine" pull, so the sim can't yet confirm London's traffic recovers — but Bergen's new identity already de-clones it; human playtest to confirm.)*
- **Decision 3 — seat compensation (+1 G per later seat, `SEAT_COMP ⚙`).** The N=1000 baseline surfaced a real **structural first-player edge** at every count (P1 54.7% at 2p; a clean monotonic 38/34/28 at 3p — all seats run identical bot code, so this is pure turn-order: P1 places first untolled and acts first every round). +1 G to each non-first seat flattens it (spread **2p 9.4→2.2, 3p 10.2→3.6**); 4–5p improve with a small residual (the flat +1 mildly over-helps the last seat; the true middle seat stays a hair low) — left for human playtest, since the non-camping bot can't show the toll's real spreading effect or a human's first-player skill edge.
- **Engine + verification.** `play.html` `KEY → v19`: `DEST.maj` is now a tier array, `majorityAwards()` does the ranked/2p-skip/tie-split payout, `grantBenefit` drops Bergen from the upgrade branch, `newPlayer` applies `SEAT_COMP`. **N=1000 × 2–5p (persona + greedy): 0 crashes / 0 deadlocks, pace 14.0–14.4 (in band), ~99–100% clock-ended, score scale unchanged (~45).** Harness gained `PERSONAS` + a `TUNE` DEST-restat hook (`playtests/sim.js`); outputs saved under `playtests/sim-*v19*`.
- **Still open / next.** Propagate to the four published HTML pages (the `.md` spec set + `play.html` are done). Then the queued "greatness" work: **asymmetric brewing houses** (now balanceable on the persona harness — the three leans are the seeds of 3–4 houses) and a **solo Automa** from the existing bot. ⚙ open: the exact 4–5p seat-comp shape; whether London's engine identity needs a sharper mechanical pull (deeper upgrade access) beyond de-cloning; whether to lift the whole score scale toward Lacerda territory (which would re-admit bigger majority numbers like 15/10/5).

### v0.10 (in review) — every kontor a competitive majority, then BIG motivating majorities (2026-06-08)
A designer call to make the majority game live at **all four kontore**, not just Bergen — give every destination a **3-tier majority** worth contesting. A *partial revert* of v0.9's "concentrate at Bergen," so the v0.9 warning had to be answered, not ignored: **broad majorities over-feed the kontore and starve prestige.** It landed in two passes the same day.
- **Pass 1 — a modest laddered spread (KEY v20).** Every kontor got a small 3-tier set, total pool ≈ v0.9's: **Bruges 2/1/1 · London 3/1/1 · Bergen 4/2/1 · Novgorod 5/2/1** ⚙, with **Bergen normalized to goods** (an upgrade would re-clone it with London → liquidity pair Bruges/Bergen vs engine pair London/Novgorod). A first try at a *big* descending ladder (~5/7/9/11, pool ~2.2×) reproduced the v0.9 failure exactly (volume 48–64%), confirming the warning; shrinking + steepening (rich 1st, thin 2nd/3rd) balanced it. **Also required: a harness fix** — the persona *majority* bot was a v0.9 relic camping one fixed kontor (`__majTarget='bergen'`), which let the volume bot sweep the other three uncontested and falsely read as "volume dominates." Rebuilt it to **contest the richest reachable majorities** (lock the best, shift to the next once safely ahead). Only then did the spread measure near fair.
- **Pass 2 — BIG majorities as the motivator (KEY v21, the live numbers).** The designer judged 2/3-point majorities too weak to *motivate* — "you want players to go for majorities; that's a good thing." So the tiers were scaled up to the v0.9 magnitudes and beyond: **Bruges 5/3/0 · London 6/4/2 · Novgorod 8/5/2 · Bergen 10/6/3** ⚙ — **Bergen the rich anchor** (its goods benefit is deliberately token, ≈ a Market visit, so the *majority* is its draw); Novgorod rides high for its hard Q3 reach but capped below Bergen (it already tops value + grants an upgrade). Two coupled rebalances kept the game from breaking:
  - **Per-cask delivery values cut** (Bruges 2→1, London/Bergen 3→2, Novgorod 5→4) so the end-game points **move out of flat value and into the majority race** (the designer's "reduce the delivery end-game points" call). Winner score split shifted `deliv 24 / maj 5` → **`deliv ~18 / maj ~11`** — majorities are now a chunk on par with delivery and goals.
  - **The Hall bumped Q×2 → Q×2.5** (`HALL_MULT`, floored: Q2→5 · Q3→7 · Q4→10 · Q5→12). This is **forced, not optional**: prestige contests *no* majority, so when majorities get big the kontore tilt the game and prestige must get a matching per-cask hit. Q×2 left prestige starved (16% at 4–5p); Q×3 over-corrected (prestige 35%, majority starved); **Q×2.5 is the balance point.**
- **The structural insight (worth carrying forward).** **Presence = delivered-cask count, so majorities are won by shipping WIDE, not by concentrating.** A scatter-shipper leads more kontore than a concentrate-on-one "specialist," so big majorities mostly reward *volume* — "go for majorities" *is* a volume play. There is no separate concentrate-on-one strategy that beats it; the genuine axis remains **kontore (volume+majority) vs the Hall (prestige).** The persona harness's `majority` bot therefore stays a touch cold by construction — read it as a stress test, not a third pole.
- **Result (PERSONAS, N=500 × 2–5p).** The real axis is **balanced**: volume vs prestige are within ~1–3 pts of fair at every count (**4p 26/26/23, 5p 21/24/15**, fair 25/20; 2p 52/51/47). Prestige healthy everywhere; the concentrate-`majority` persona trails at 3p/5p (the structural point above). Robustness (greedy, N=500 × 2–5p): **0 crashes / 0 deadlocks, ~100% clock-ended, pace 13.8–14.4 (in band)**, winner scores ~45–47. Saved `playtests/sim-results-v21*.txt`.
- **Engine.** `play.html` `KEY → v21`: `DEST.maj` triples (big), kontor `value`s cut, `HALL_MULT=2.5`, Bergen `goods` benefit + **Monopoly → Bryggen** rename. `majorityAwards()`/tie/2p-skip unchanged.
- **Still open / next.** Wants a **human playtest** — especially whether big majorities + low delivery values make the *feel* of a kontor delivery satisfying (the points come at game-end, not on the ship), and whether Bergen's token goods read as "weak benefit, big payoff" rather than just weak. ⚙ open: `HALL_MULT` (2.5 is sim-balanced but untested by humans); whether the `5/3/0` zero-third-tier at Bruges should be a flat `5/3` (functionally identical).
