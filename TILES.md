# Brewhouse of the Hanse — Tile List (v0.1)

> The full deck. Derived from the locked architecture in `DESIGN.md`. **Every number is a placeholder ⚙** — this fixes *what each tile is and does*, not final balance. Seven families (A–G). Casks (A) are the heart; the rest is the economy around them.

---

## 0. Conventions

- **Goods:** `G` = grain cube, `H` = hops cube. The only spendable currency (no money).
- **Faces:** infrastructure tiles are single-face; **cask tiles are double-sided** — **working face** (in a slot) ↔ **standing face** (in the Kontor stack).
- **Skim rule (§9):** an owned tile in a slot fires its **line action** whenever *any* player activates that line; the **owner** collects. Keep skims small — this is the rich-get-richer dial. ⚙
- **Acquisition:** all tiles enter from a **face-up Market display** (deterministic, public — no hidden draw), paid in goods at the **Market** cell. Casks are the exception: you don't buy a finished cask, you buy/own a **recipe** and **brew** it.
- **Reach vs Standing accumulate separately:** presence markers (reach) and enshrined casks (standing) never convert into each other.

---

## A. Cask tiles — the dual-role hero (~60 tiles)

A cask tile carries, by face:

- **Working face** (in a slot): `STYLE` · `QUALITY` · a **line action** (the skim its owner collects when the line fires).
- **Standing face** (enshrined): `STANDING` value · a **goal** (end-game scoring) · a small **Kontor action** (used by anyone while this tile is on top of the stack — this is how personal casks join the public stack as live actions).

### Styles

| Style | Q | Brew inputs | Brew path | Ships to | Enshrine? | Working line action ⚙ | Standing ⚙ | Qty |
|---|---|---|---|---|---|---|---|---|
| **Gruit Ale** | 1 | `G` | LOAD→FERMENT→READY | Bruges / nearest waypoint only (perishable) | ❌ | `+1 G` | — (single-face) | 16 |
| **Hopped Beer** | 2 | `G H` | LOAD→FERMENT→AGE→READY | any route | ✅ | `+1 H` | 2 | 20 |
| **Dubbel** | 3 | `G H H` | + longer AGE | London/Bergen/Novgorod | ✅ | `+1 G or H` | 4 | 12 |
| **Tripel** | 4 | `G G H H` | + longer AGE | Bergen/Novgorod | ✅ | `advance 1 brew step` | 6 | 8 |
| **Barrel-aged Bock** | 5 | premium; needs **Aging Cellar** room | longest AGE | Novgorod | ✅ | `+1 presence (any open route)` | 9 | 4 |

*Gruit is working-only — perishable, never heritage. It's cheap early-engine fuel and cheap local reach, and it can never be enshrined. That single fact is the Westvleteren/Leffe line drawn in the components.*

### Market quality-gates (the Quality → Destination interlock)

A route only accepts presence from casks of sufficient quality:

| Route | Min quality to ship | Why |
|---|---|---|
| **Bruges (Hub)** | Q1 | takes everything, low value |
| **London (Steelyard)** | Q2 | |
| **Bergen (Monopoly)** | Q2 | narrow, contested |
| **Novgorod (Long Haul)** | Q3 | only the premium survives the voyage |

### Goal pool (standing face — the goal-matching DNA)

Each enshrine-able cask (Q2–Q5, 44 tiles) carries **one** goal, scored at game end. Distribution spreads the three axes so no single line dominates:

| # | Goal (end-game) ⚙ | Axis | ~Qty carrying it |
|---|---|---|---|
| g1 | `+1 VP per route you hold presence on (max 4)` | breadth/reach | 6 |
| g2 | `+1 VP per 2 presence markers on the board` | volume/reach | 6 |
| g3 | `+2 VP per other enshrined cask of the SAME style` | depth/set | 5 |
| g4 | `+2 VP per enshrined Q4+ cask you own` | quality | 4 |
| g5 | `+2 VP per presence on Novgorod` | destination | 4 |
| g6 | `+4 VP if you hold a route majority (each, max 2)` | destination | 4 |
| g7 | `+1 VP per working cask still in your slots` | engine/reach | 5 |
| g8 | `+2 VP per filled brewery room` | tableau/depth | 4 |
| g9 | `+1 VP per infrastructure tile you own in slots` | toll-baron | 3 |
| g10 | `+3 VP flat (pure standing)` | safe/scarcity | 3 |

> Enshrining is therefore a **triple choice**: bank `STANDING` now, commit to a scoring *direction* (the goal), and set the shared Kontor's top action. That's the spine of the game on one tile.

### Standing-face Kontor actions (while on top of stack) ⚙
Small, keyed loosely to style: Hopped → `+1 G`; Dubbel → `draw 1 Market tile`; Tripel → `+1 presence`; Bock → `advance any 1 brew`. (Public Kontor tiles, Family F, carry the stronger ones.)

---

## B. Route tiles — author the scoring landscape (~19 tiles)

Placed in a perimeter slot (committed to row XOR column). **Two jobs:** raise that route's end-game value on the board, *and* fire a shipping skim when the line activates. Owned & taxable.

| Route tile | Route-value boost ⚙ | Line action (owner) ⚙ | Qty |
|---|---|---|---|
| **Bergen Lane** | +2 / +3 | `+1 presence on Bergen` | 4 |
| **Novgorod Lane** | +3 / +4 / +5 | `+1 presence on Novgorod` | 5 |
| **Bruges Lane** | +1 / +2 / +3 | `ship +1 step toward Bruges` | 6 |
| **London Lane** | +2 (+grants a Privilege when placed) | `draw nothing / +1 G` | 4 |

> A route's end-game value = sum of the boosts players slotted onto it. **Players author what scores** by what they place — and rivals decide whether to pile onto a rich route (majority fight) or open a neglected one.

---

## C. Ship tiles — perimeter infrastructure (12 tiles)

Owned slot tiles that upgrade your shipping. Skim small when fired.

| Ship tile | Effect ⚙ | Qty |
|---|---|---|
| **Cog (+Range)** | your Harbor action ships +1 step | 4 |
| **Hulk (+Cargo)** | ship 2 casks in one Harbor action | 3 |
| **Toll Exemption** | ignore one toll/skim per turn | 3 |
| **Pilot** | ignore one waypoint cost | 2 |

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
- Starting stake: **2 `G`, 1 `H`**, and **1 Gruit recipe** in hand. ⚙
- Asymmetric starting brewing-house tiles = possible variant. ❓

---

## Deck size — answering the "needs cards?" worry

| Family | Tiles | Unique designs |
|---|---|---|
| A Casks | ~60 | ~5 styles × ~10 goals |
| B Routes | 19 | ~4 |
| C Ships | 12 | 4 |
| D Privileges | 12 | 12 |
| E Rooms | 24 | 8 |
| F Public Kontor | 12 | 12 |
| **Total** | **~139** | **~45 unique faces** |

**~140 tiles but only ~45 unique designs** — the bulk is *copies* (casks, rooms, ships). That's Castles-of-Burgundy / Carcassonne tile-scale, not card-scale. Cards aren't needed; tiles preserve determinism and the physical working↔standing flip.

---

## Open tuning notes

1. **Skim strength** (A working actions, B/C line actions) — the central rich-get-richer dial.
2. **Goal distribution** — are the three axes balanced, or does one goal dominate?
3. **Quality-gate severity** — does Q3-gating Novgorod choke the long-haul path too hard?
4. **Standing curve** (2/4/6/9) vs goal bonuses — keep enshrining-for-goals competitive with enshrining-for-flat-standing (g10).
5. **Privilege/room acquisition** — Market display for all, or thematic sources (London for privileges, a build action for rooms)?
6. **Brewing-step counts** — exact length of FERMENT/AGE per style sets the whole tempo economy.
