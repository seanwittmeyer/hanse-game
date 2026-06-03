# Brewhouse of the Hanse — Tile List (v0.1)

> The full deck. Derived from the locked architecture in `DESIGN.md`. **Every number is a placeholder ⚙** — this fixes *what each tile is and does*, not final balance. Seven families (A–G). Casks (A) are the heart; the rest is the economy around them.

---

## 0. Conventions

- **Goods:** `G` = grain cube, `H` = hops cube. The only spendable currency (no money).
- **Faces:** infrastructure tiles are single-face; **cask tiles are double-sided** — **cargo face** (loaded into a ship = reach) ↔ **standing face** (in the Kontor stack = standing). *(2026-06-02: casks are cargo, not standalone working slot tiles — see `DESIGN.md` §19 "living slot ring.")*
- **Skim rule (§9):** an owned **slot tile** (route lane, ship) fires its **line action** whenever *any* player activates that line; the **owner** collects. Keep skims small — this is the rich-get-richer dial. ⚙
- **Acquisition:** all tiles enter from a **face-up Market display** (deterministic, public — no hidden draw), paid in goods at the **Market** cell. Casks are the exception: you don't buy a finished cask, you **collect a recipe into your private book** (§C′) and **brew** it. Recipe tiles are bought from the display like any tile, but the supply is gated by the current **type frontier** (§A) — which advances as a type's market saturates ⚙. *(v0.3: recipes are a book, not slot tiles.)*
- **Reach vs Standing accumulate separately:** presence markers (reach) and enshrined casks (standing) never convert into each other.

---

## A. Cask tiles — the dual-role hero (~60 tiles)

A cask tile carries, by face:

- **Cargo face** (in transit): `STYLE` · `QUALITY`. A Ready cask is **shipped** to a route — gaining you **1 presence** (reach) and loading as **cargo into a ship** on that route (or a basic shipment if none). Casks no longer fire an individual line skim; reach flows through ships (Family C).
- **Standing face** (enshrined): `STANDING` value · a **goal** (end-game scoring) · a small **Kontor action** (used by anyone while this tile is on top of the stack — this is how personal casks join the public stack as live actions).

> **The dual-role fork** is now per-cask and per-turn: a Ready cask either **ships** (cargo face → reach) **or enshrines** (standing face → standing). Never both.

### Types & recipes (two layers)

> **v0.3 — the recipe book (2026-06-03).** A **type** is a global quality rung (below); a **recipe** is a *collected instance* of a type with its own cost profile, held in your private **book** (§C′). You can't brew a type you hold no recipe for. The ladder is **anchored spine + variable summit**: Gruit→Hopped are fixed and historical (hops is what opens the sea routes), and the premium tiers **L3–L5 are filled by historical Hanse beers dealt in a variable order/subset each game** — so the efficient path differs every game.

| Level | Type | Q | Typical inputs ⚙ | Brew path | Ships to | Enshrine? | Base standing ⚙ | Qty |
|---|---|---|---|---|---|---|---|---|
| **L1** | **Gruit Ale** | 1 | `G` | LOAD→FERMENT→READY (skips AGE) | Bruges / nearest only (perishable) | ❌ | — (single-face) | 16 |
| **L2** | **Hopped Beer** | 2 | `G H` | LOAD→FERMENT→AGE→READY | Bruges / London / Bergen | ✅ | 3 | 20 |
| **L3** | *summit ⚙* | 3 | `G H H` ⚙ | + longer AGE | London / Bergen / Novgorod | ✅ | 5 | 12 |
| **L4** | *summit ⚙* | 4 | `G G H H` ⚙ | + longer AGE | Bergen / Novgorod | ✅ | 7 | 8 |
| **L5** | *summit ⚙* | 5 | premium; needs **Aging Cellar** | longest AGE | Novgorod | ✅ | 10 | 4 |

> **Summit roster (dealt to L3–L5 in variable order each game) ⚙:** real Hanse export beers — **Bock** (Einbeck, the origin of the word "bock"), **Mumme** (Braunschweig, thick dark prestige export shipped absurdly far), **Broyhan** (Hannover), **Keut** (Low Countries). Reskins the anachronistic *Dubbel/Tripel* placeholders. Each carries a light mechanical hook (e.g. Bock needs the Aging Cellar; Mumme = slow but high-standing). ⚙
>
> **Typical inputs are the *type's* baseline; the actual cost is on the collected recipe** — two L3 recipes can read `G H H` vs `G G` vs a faster-but-pricier mix. *Which recipes you draw*, not just which type, defines your engine — the diceless variability + asymmetry lever.

*Gruit is cargo-only — perishable, never heritage. It's cheap early-engine fuel and cheap local reach, and it can never be enshrined. That single fact is the Westvleteren/Leffe line drawn in the components.*

### Market quality-gates (the Quality → Destination interlock)

A route only accepts presence from casks of sufficient quality:

| Route | Min quality to ship | Why |
|---|---|---|
| **Bruges (Hub)** | Q1 | takes everything, low value |
| **London (Steelyard)** | Q2 | |
| **Bergen (Monopoly)** | Q2 | narrow, contested |
| **Novgorod (Long Haul)** | Q3 | only the premium survives the voyage |

### Goal pool (standing face — the goal-matching DNA, the 3-way cycle)

> **v0.3 — cycled goals + best-3 cap (`DESIGN.md` §19, 2026-06-03, "fix D").** Every enshrine-able cask carries **one** goal. The pool is a **3-way symmetric cycle — 3 reach-rewarding · 3 standing-rewarding · 3 engine-rewarding, all capped** — deliberately authored so **no goal rewards the axis the enshrine act already pays.** A pure-standing player therefore draws goals that score ~0 without reach/engine, which is what makes blending pay (the GWT ideal). **Only your best 3 enshrined goals score**, so the goal axis stays a bonus (~one-third of a typical score), not the game. *(Supersedes the old g1–g10 single-axis pool.)*

| # | Goal (end-game) ⚙ | Rewards | Pulls you toward |
|---|---|---|---|
| g1 | `+1 / route you hold presence on (max 4)` | **Reach** | breadth |
| g2 | `+1 per 2 presence markers on the board` | **Reach** | volume |
| g6 | `+4 / route majority you hold (max 2)` | **Reach** | destination/commitment |
| g3 | `+2 / other enshrined cask of the SAME style (max 6)` | **Standing** | depth/set |
| g4 | `+2 / enshrined Q3+ cask you own (max 6)` | **Standing** | quality |
| g10 | `+3 flat` | **Standing** | safe/scarcity |
| gV | `+2 / distinct enshrined style` | **Engine** | spread/climb |
| gC | `+2 / top enshrined quality reached` | **Engine** | summit |
| g8 | `+2 / filled brewery room` | **Engine** | tableau depth |

> Enshrining is therefore a **triple choice**: bank `STANDING` now, commit to a scoring *direction* (the goal), and set the shared Kontor's top action. That's the spine of the game on one tile — and because the goal points usually live on a *different* axis than the standing you just banked, the goal is what tempts a one-note player to blend.

### Standing-face Kontor actions (while on top of stack) ⚙
Small, keyed loosely to type: Hopped → `+1 G`; L3 → `draw 1 Market tile`; L4 → `+1 presence`; L5 → `advance any 1 brew`. (Public Kontor tiles, Family F, carry the stronger ones.)

---

## A′. VP tokens & the value track — the variable-value economy (v0.3)

Cask tiles keep their **printed base VP** (scored at end, §6 in `RULES.md`). On top sits a variable-value layer that never destabilizes the backbone:

- **Value rides on types** — a **linear value track**, one marker per type ⚙. Routes stay the **access / majorities** axis (the quality→destination gate, §A). The combination is the **race condition**.
- **Reach floods a type → its track marker ticks down** (saturation); the quality player betting on that type wants to cash in *before* the volume player tanks it. Neither perfectly times the other — the unsolvable, diceless tension. Saturation also **advances the type frontier** (§A): the same flooding that drops value unlocks the next tier. ⚙
- **VP tokens** are a **spendable 3rd resource**, minted on a sale (ship *or* enshrine) **scaled by the type's current track position** — sell high = more tokens, the value *locked in metal* at that moment. Tokens are a **modifier on top of**, never a replacement for, printed cask VP.
  - **Spend** them mid-game for tempo/power (sinks ⚙), **or bank** them as bonus points (**1 VP each** at end). That spend-vs-keep fork is the new home for "lock in value at its peak."

> **Components:** a value-track marker per live type + a pile of VP tokens. Neither adds to the unique-tile-faces count below.

---

## B. Route tiles — author the scoring landscape (~19 tiles)

Placed in a perimeter slot (committed to row XOR column). **Two jobs:** raise that route's end-game value on the board, *and* fire a shipping skim when the line activates. Owned & taxable.

| Route tile | Route-value boost ⚙ | Line action (owner) ⚙ | Qty |
|---|---|---|---|
| **Bergen Lane** | +2 / +3 | `+1 G skim` (owner) | 4 |
| **Novgorod Lane** | +3 / +4 / +5 | `+1 G skim` (owner) | 5 |
| **Bruges Lane** | +1 / +2 / +3 | `+1 G skim` (owner) | 6 |
| **London Lane** | +2 (+grants a Privilege when placed) | `+1 G skim` (owner) | 4 |

> **⚠ Balance fix (v0.2):** Lane line-actions were `+1 presence`, which ran away (a 3p sim hit 12 presence on a cap-4 route and ended the game on turn 4). **Presence now comes only from shipping** and is **clamped to route capacity**; Lane skims pay a tiny `+1 G` instead.

> A route's end-game value = sum of the boosts players slotted onto it. **Players author what scores** by what they place — and rivals decide whether to pile onto a rich route (majority fight) or open a neglected one.

---

## C. Ship tiles — owned, route-bound cargo containers (12 tiles)

A ship is a **slot tile with a stack of cask sub-slots**, placed by a player and **bound to one route** when placed (it "supports" that route). It is the **toll-baron** play — owned infrastructure that profits from *everyone's* traffic on its route.

- **Loading (two ways):** (1) when **any player ships** a Ready cask to the route and the ship has room, the cask **loads aboard** — the shipper gains their +1 presence, and if the ship is a **rival's**, the owner collects a **+1 G toll**; (2) the ship's **own line-action** (when its cap fires) pulls one of the **owner's** ready, route-eligible casks aboard.
- **Sailing:** when **full**, the ship **sails** — cargo is delivered (already counted as each shipper's presence) and the **owner** takes a **sail dividend** (+1 presence on the route, +1 G); the ship then **leaves its slot** (transient churn).

| Ship tile | Capacity / effect ⚙ | Qty |
|---|---|---|
| **Cog** | cargo container, **cap 3** | 4 |
| **Hulk** | larger container, **cap 4** | 3 |
| **Toll Exemption** | ignore one toll/skim per turn | 3 |
| **Pilot** | ignore one waypoint cost | 2 |

---

## C′. Recipe tiles — your private book (collected, not slotted)

Recipes are a **private book**, not slot tiles. You **collect** recipe tiles from the Market display (gated by the current type frontier, §A) and keep them; each names a **type** and carries its **own cost profile** — `n G · n H · n brew-steps`. You brew from the book; you **cannot brew a type you hold no recipe for** (Gruit is the universal baseline, always in the book). *(Supersedes the 2026-06-02 claim-on-fire slot model.)*

- **Variable cost within a type:** two L3 recipes can read `G H H`, `G G`, or a faster-but-pricier mix — so *which* recipes you draw, not just *which type*, defines your engine. The diceless variability + asymmetry engine.
- **The depth-pull tension:** a tempting high-type recipe collected for cheap then *sits in your book wanting to be brewed*, pulling a reach-committed player up the ladder.
- **Frontier-gated supply:** only recipes of currently-unlocked types appear in the Market. As types saturate and advance (§A′/§A), higher-tier recipes enter — skewing temptation upward.

| Recipe tile (variants per type) | Type | Buy cost ⚙ | Brew cost profile ⚙ | Qty |
|---|---|---|---|---|
| **Recipe · Hopped** | L2 | `1 G` | e.g. `G H` / `G G H` (faster) | 5 |
| **Recipe · summit L3** | L3 | `1 G 1 H` | `G H H` / `G G` / … | 4 |
| **Recipe · summit L4** | L4 | `2 G` | `G G H H` / … | 3 |
| **Recipe · summit L5** | L5 | `2 G 1 H` | premium; needs Aging Cellar to brew | 2 |

> Start of game: **Gruit baseline + 2 random premium recipes** in the book (a random pair from the unlocked tiers). ⚙

---

## D. Privilege tiles — Steelyard rewards (12 unique)

Gained chiefly via the **London** route / London Lane. Ongoing perks; held by the player (not in a slot unless noted). ❓ slot vs free.

1. **Steelyard Charter** — ignore all tolls on one line each turn.
2. **Royal Patent** — your Harbor ships +1 step (stacks with Cog).
3. **Guild Seat** — Brewhouse advances +1 extra brew step.
4. **Customs Waiver** — place infrastructure for 1 fewer good.
5. **Factor's License** — draw 1 extra tile at the Market.
6. **Letter of Credit** — once/round, treat 1 `G` as 1 `H` or vice-versa.
7. **Warehouse Right** — +2 goods storage.
8. **Staple Right** — when you ship, +1 presence.
9. **Burgher Status** — +1 standing each scoring for every route majority you hold.
10. **Brewers' Privilege** — gruit may ship one route farther.
11. **Patron's Ear** — first to the Market each round draws +1.
12. **Hanseatic Seal** *(endgame)* — +1 VP per route you have presence on.

---

## E. Room / Upgrade tiles — tableau engine (8 types, ~24 tiles)

Installed into tableau room slots. Where **depth** lives. Also upgrade the blocked-cell trickle.

| Room | Effect ⚙ | Qty |
|---|---|---|
| **Extra Vessel** | +1 parallel brewing lane | 4 |
| **Faster Fermenter** | FERMENT auto-advances (skip 1 step) | 3 |
| **Aging Cellar** | AGE costs 1 fewer step; **unlocks Barrel-aged** | 3 |
| **Warehouse** | +goods storage; may store finished casks | 3 |
| **Larder** | Market-trickle fallback → +2 `G` instead of +1 | 3 |
| **Quay** | Harbor-trickle fallback → ship 2 steps instead of 1 | 3 |
| **Counting-house** | when you enshrine, +1 standing | 3 |
| **Cooperage** | +1 presence whenever you ship (or barrel capacity if barrels adopted) | 2 |

---

## F. Public Kontor tiles — the shared stack (12 unique)

Seed the stack and get added during play; interleave with personal enshrined casks. **Top tile = the current Kontor action** for whoever banks there.

1. **Bryggen Wharf** — gain 2 `G`.
2. **Steelyard Counting** — draw 1 Privilege.
3. **Bruges Cloth Hall** — gain 1 good + 1 presence on Bruges.
4. **Peterhof Furs** — +1 presence on Novgorod + advance 1 brew.
5. **Grand Enshrinement** — enshrine a cask with +1 extra standing.
6. **Market Day** — draw 2 Market tiles.
7. **Cooper's Gift** — advance any 1 brew 1 step.
8. **Convoy** — place 1 presence free on any open route.
9. **Recipe Exchange** — convert up to 3 between `G`/`H`.
10. **Patron's Favor** — gain 1 any good + draw 1 tile.
11. **Diet of the Hanse** — +1 standing.
12. **Sound Passage** — ship 1 cask ignoring all waypoint costs.

---

## G. Starting setup (per player)

- 1 **worker**, placed on the grid.
- Tableau printed with **Larder** (Market trickle +1 `G`) and **Quay** (Harbor trickle, 1 step) — upgradeable by Family E.
- **1 vessel lane** open on the brewing track.
- Starting stake: **3 `G`, 2 `H`**, **0 VP tokens**, and **the Gruit baseline + 2 random premium recipes** in your **recipe book** (a random pair from the unlocked tiers). ⚙
- Asymmetric starting brewing-house tiles = possible variant. ❓

---

## Deck size — answering the "needs cards?" worry

| Family | Tiles | Unique designs |
|---|---|---|
| A Casks | ~60 | ~5 styles × ~10 goals |
| B Routes | 19 | ~4 |
| C Ships | 12 | 4 |
| C′ Recipes (book) | 14 | 4 (variants per type) |
| D Privileges | 12 | 12 |
| E Rooms | 24 | 8 |
| F Public Kontor | 12 | 12 |
| **Total** | **~153** | **~49 unique faces** |

**~150 tiles but only ~49 unique designs** — the bulk is *copies* (casks, rooms, ships). That's Castles-of-Burgundy / Carcassonne tile-scale, not card-scale. Cards aren't needed; tiles preserve determinism and the physical working↔standing flip.

---

## Open tuning notes

1. **Skim strength** (A working actions, B/C line actions) — the central rich-get-richer dial.
2. **Goal distribution** — are the three axes balanced, or does one goal dominate?
3. **Quality-gate severity** — does Q3-gating Novgorod choke the long-haul path too hard?
4. **Standing curve** (3/5/7/10 by level L2–L5) vs goal bonuses — keep enshrining-for-goals competitive with enshrining-for-flat-standing (g10).
5. **Privilege/room acquisition** — Market display for all, or thematic sources (London for privileges, a build action for rooms)?
6. **Brewing-step counts** — exact length of FERMENT/AGE per style sets the whole tempo economy.
