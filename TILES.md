# Brewhouse of the Hanse — Tile List (v0.1)

> The full deck. Derived from the locked architecture in `DESIGN.md`. **Every number is a placeholder ⚙** — this fixes *what each tile is and does*, not final balance. Seven families (A–G). Casks (A) are the heart; the rest is the economy around them.

---

## 0. Conventions

- **Goods:** `G` = grain cube, `H` = hops cube. The only spendable currency (no money).
- **Faces:** infrastructure tiles are single-face; **cask tiles are double-sided** — **cargo face** (loaded into a ship = reach) ↔ **standing face** (in the Kontor stack = standing). *(2026-06-02: casks are cargo, not standalone working slot tiles — see `DESIGN.md` §19 "living slot ring.")*
- **Skim rule (§9):** an owned **slot tile** (route lane, ship, recipe) fires its **line action** whenever *any* player activates that line; the **owner** collects. Keep skims small — this is the rich-get-richer dial. ⚙
- **Acquisition:** all tiles enter from a **face-up Market display** (deterministic, public — no hidden draw), paid in goods at the **Market** cell. Casks are the exception: you don't buy a finished cask, you hold a **recipe** (in hand) and **brew** it. Recipes themselves are gained via **recipe tiles** (Family C′) claimed off the slot ring.
- **Reach vs Standing accumulate separately:** presence markers (reach) and enshrined casks (standing) never convert into each other.

---

## A. Cask tiles — the dual-role hero (~60 tiles)

A cask tile carries, by face:

- **Cargo face** (in transit): `STYLE` · `QUALITY`. A Ready cask is **shipped** to a route — gaining you **1 presence** (reach) and loading as **cargo into a ship** on that route (or a basic shipment if none). Casks no longer fire an individual line skim; reach flows through ships (Family C).
- **Standing face** (enshrined): `STANDING` value · a **goal** (end-game scoring) · a small **Kontor action** (used by anyone while this tile is on top of the stack — this is how personal casks join the public stack as live actions).

> **The dual-role fork** is now per-cask and per-turn: a Ready cask either **ships** (cargo face → reach) **or enshrines** (standing face → standing). Never both.

### Styles

| Style | Q | Brew inputs | Brew path | Ships to | Enshrine? | Standing ⚙ | Qty |
|---|---|---|---|---|---|---|---|
| **Gruit Ale** | 1 | `G` | LOAD→FERMENT→READY | Bruges / nearest waypoint only (perishable) | ❌ | — (single-face) | 16 |
| **Hopped Beer** | 2 | `G H` | LOAD→FERMENT→AGE→READY | any route | ✅ | 3 | 20 |
| **Dubbel** | 3 | `G H H` | + longer AGE | London/Bergen/Novgorod | ✅ | 5 | 12 |
| **Tripel** | 4 | `G G H H` | + longer AGE | Bergen/Novgorod | ✅ | 7 | 8 |
| **Barrel-aged Bock** | 5 | premium; needs **Aging Cellar** room | longest AGE | Novgorod | ✅ | 10 | 4 |

*Gruit is cargo-only — perishable, never heritage. It's cheap early-engine fuel and cheap local reach, and it can never be enshrined. That single fact is the Westvleteren/Leffe line drawn in the components.*

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
| g7 | `+1 VP per cask in transit (loaded in your/others' ships)` | engine/reach | 5 |
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

## C′. Recipe tiles — claim-on-fire engine (slot ring)

You **hold recipes in hand** and brew from hand. Gruit is the universal baseline; **every other recipe is acquired as a recipe tile placed in a perimeter slot.** The **next time that slot's line fires** (any player's activation), the **owner claims the recipe into hand** and the **tile is spent** (slot frees) — transient, and consistent with the §9 skim model (the recipe tile's "skim" is the recipe itself).

| Recipe tile | Grants (to hand) ⚙ | Cost | Qty |
|---|---|---|---|
| **Recipe · Hopped** | Hopped Beer recipe | `1 G` | 5 |
| **Recipe · Dubbel** | Dubbel recipe | `1 G 1 H` | 4 |
| **Recipe · Tripel** | Tripel recipe | `2 G` | 3 |
| **Recipe · Bock** | Barrel-aged Bock (needs Aging Cellar to brew) | `2 G 1 H` | 2 |

> Start of game: **Gruit baseline + 1 random premium recipe** in hand (Hopped / Dubbel / Tripel).

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
- Starting stake: **3 `G`, 2 `H`**, and **the Gruit baseline + 1 random premium recipe** in hand (Hopped / Dubbel / Tripel). ⚙
- Asymmetric starting brewing-house tiles = possible variant. ❓

---

## Deck size — answering the "needs cards?" worry

| Family | Tiles | Unique designs |
|---|---|---|
| A Casks | ~60 | ~5 styles × ~10 goals |
| B Routes | 19 | ~4 |
| C Ships | 12 | 4 |
| C′ Recipes | 14 | 4 |
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
4. **Standing curve** (2/4/6/9) vs goal bonuses — keep enshrining-for-goals competitive with enshrining-for-flat-standing (g10).
5. **Privilege/room acquisition** — Market display for all, or thematic sources (London for privileges, a build action for rooms)?
6. **Brewing-step counts** — exact length of FERMENT/AGE per style sets the whole tempo economy.
