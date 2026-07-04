# Brewhouses of the Hanse — Components (v2.6 “Dockside Pickup”)

> **The box manifest.** What is *in* the game, line by line. **Every count is a placeholder ⚙.**
>
> - Operational rules: `RULES.md`. Design rationale & version history: `DESIGN.md` §9.
> - The live build is `play.html` — **v2.6 “Dockside Pickup”** (`KEY hanse-hotseat-v90`); it is the source of truth on values and behaviour. This doc enumerates the physical pieces that implement it.
> - Cross-reference for tile families: §3 boards, §4 supply, §5–11 the seven families A–G, §12 player board, §13 starting setup, §14 box footprint. Expansion add-ons are §15; cross-references §16.

---

## 1. Conventions for the tables

- **Goods:** `G` = grain, `H` = hops — the only currency.
- **A line** = a row or column of the Wharf = two stations + the two slots beside them.
- **A slot stack** (max two layers): `[building?] + [ship+casks | cask]`.
- **Three tile types, three colours (v2.4.1):** a **PRIVILEGE** (bright **blue**) — an owner-only value tile on the slots (a rival docking there banks nothing); a **BUILDING** (**green**) — a serves-any-dock transform tile on the slots; a **SPECIALIST** (**purple**) — a private brewery-board tile. No payments between players at delivery (wharfage and the rival-½ retired, v2.3).
- **End clock:** the Sailed-Ships track fills by one per voyage (a full sail, a Charter, or an Enshrine).

---

## 2. Boards (3 pieces)

| Board | Qty | Holds |
|---|---|---|
| Main board — **the Wharf** | 1 | 2×2 of stations **A Market · B Brewhouse · C Harbor · D Cellar**, ringed by 8 slots; the Sailed-Ships track. |
| Destination board | 1 | The four kontore (Bruges · London · Bergen · Novgorod) + the Hall; each kontor's majority track. |
| Player brewery boards | 4 | Vessels (2, cap 3), maturation track, recipe rack, improvements area, storage. |

---

## 3. Common supply (one set, shared)

| Component | Qty ⚙ | Purpose |
|---|---|---|
| Grain cubes (`G`) | ~60 | Currency + brew input. |
| Hops cubes (`H`) | ~40 | Currency + brew input. |
| Demand dice (d6) | 8 | Reusable value-bonus carrier — pips = the ★ a cask banks on delivery from **its owner’s** value building(s); ship-slot value buildings bump the same die at the sail (one die per cask, max 6). |
| Quality-boost markers | 6 | Ride a cask from a Malt Kiln / Hop Yard, raising its effective quality at delivery. |
| Charter contracts (cards) | 20 | Spend 1 + a flat `2 G` fare to Charter; buyable at the Market (`1 G`). |
| First-player marker | 1 | Fixed all game (turn order does not rotate). |
| Round / Sailed-Ships marker | 2 | Round clock; voyage counter. |
| Score pad or track | 1 | Scoring is in-game; pads or a shared track both work. |

---

## 4. Per-player components (×4 sets)

| Component | Qty per house ⚙ | Notes |
|---|---|---|
| Worker pawn | 1 | Moves between stations. |
| Ownership / presence discs (player colour) | 14 | Single token in three lives: ownership on a slot → rides on a ship → plants at the kontor as your presence (the majority count); also marks whose building sits on a slot. **Finite supply = your trade-factor cap.** Enshrining returns a disc; the Hall is unlimited. |

---

## 5. Cask tiles · family A (~62, shared supply)

A brewed beer in one of three states: **maturing** (vessel) → **deployed** (slot, cargo + a public action) → **delivered** (scores, gone). Each cask carries a printed quality and, on brewing, a slot-action drawn from the top of its quality pile (Gruit is pinned to Source).

| Quality | Beer | Brew cost | Matures | Reaches | Qty ⚙ |
|---|---|---|---|---|---|
| Q1 | Gruit Ale | `G` | 1 | Bruges | 16 |
| Q2 | Hopped Beer | `G H` | 1 | + London · Bergen · the Hall | 20 |
| Q3 | Broyhan | `G H H` | 1 | + Novgorod | 6 |
| Q3 | Keut *(+1 presence on a kontor delivery)* | `G G H` | 2 | + Novgorod | 6 |
| Q4 | Mumme | `G H H H` | 3 | all | 8 |
| Q5 | Bock | `G G H H H` | 3 (2 with Aging Cellar) | all | 6 |

**Draft:** the export ladder deals **3 of the 4** export beers each game (so dropping one varies the climb). Gruit + Hopped are always available.

**Supply floor:** a **minimum of 6 tiles per cask type** so no beer runs dry mid-game — the staples run deeper (Gruit 16 · Hopped 20). *(The Jopenbier capstone also stocks 6 — §15B.)* Casks are a shared pool, **brewed never bought**; `play.html` does not cap the supply (the counts are a physical-manifest concern).

---

## 6. Ship tiles · family B (20-tile deck)

Neutral, destination-bound hulls. Drawn from a shuffled deck into a face-up **market of 3** at the Market. Commission (`2 G`) places one on an open slot — or **onto a slot whose cask can board it** (v2.6 dockside pickup: the cask loads at once; a rival’s follows the rival-loading rules) — with a free first load of one of your **deployed** casks (v2.2).

| Hull | Capacity | Qty | Destination spread |
|---|---|---|---|
| Cog | 2 casks | 11 | 3 Bruges · 3 London · 2 Bergen · 3 Novgorod |
| Hulk | 3 casks | 9 | 2 Bruges · 2 London · 3 Bergen · 2 Novgorod |

**Sails only when full** → every cask delivers, in load order, then the hull returns to the bottom of the deck. **The Hall is never a ship destination** (it is reached by Enshrine).

---

## 7. Slot tiles — Privileges & Buildings · family C (the owned slot layer)

Always acquired **from the face-up display and placed on a slot at once** (v2.2 — no hand): buy at the Market, or free via a London delivery or the Survey action. **One grammar:** a building modifies the occupant docked on it **now** (positional — nothing is rewritten) — `tgt` is what it acts on (cask or ship). **One sharing rule, one colour code: PRIVILEGE (blue) = pays its owner only · BUILDING (green) = serves any dock** — the tile faces print the type badge. A face-up **Wharf display of 4** at the Market refills from the shuffled deck.

### 7A. PRIVILEGES (blue) — the owner’s cask/ship banks bonus ★ on delivery

| Tile | Target | Effect ⚙ | Cost ⚙ | Qty ⚙ |
|---|---|---|---|---|
| Rich Berth | ship | each of the owner’s casks’ dice +2 at the sail | `3 G` | 2 |
| Staple Hall | cask | a cask from here delivers +3★ (any kontor) | `3 G` | 2 |
| Burgomaster's Favor | cask | a cask from here: +1★ per quality level | `3 G` | 2 |
| Connoisseur's Cellar | cask | a Q4+ cask from here: +4★ | `3 G` | 1 |
| The Hanse Diet | cask | a cask to a kontor where you LEAD: +3★ | `3 G` | 1 |
| Festkeller | ship | a HULK here: each of the owner’s casks’ dice +3 at the sail | `3 G` | 1 |
| Reliquary | cask | a cask enshrined from here: +2★ prestige | `3 G` | 1 |
| Almoner's Stall | cask | a cask from here to a kontor where you do NOT lead: +3★ | `3 G` | 1 |
| Bruges Hanzehuis | cask | a cask from here to Bruges: +4★ | `2 G` | 1 |
| London Steelyard | cask | a cask from here to London: +4★ | `2 G` | 1 |
| Bergen Bryggen | cask | a cask from here to Bergen: +4★ | `2 G` | 1 |
| Novgorod Peterhof | cask | a cask from here to Novgorod: +4★ | `2 G` | 1 |

### 7B. BUILDINGS (green) — the docked cask/ship is changed, for whoever docks

| Tile | Target | Effect ⚙ | Cost ⚙ | Qty ⚙ |
|---|---|---|---|---|
| Malt Kiln | cask | a cask from here ships as +1 quality (cap Q5) | `2 G` | 2 |
| Hop Yard | cask | a Q2+ cask from here ships as +1 quality | `3 G` | 1 |
| Cooperage | ship | a ship here carries +1 cask | `2 G` | 2 |
| Customs House | ship | a ship here may board casks one gate lower | `2 G` | 2 |
| Gauger's Office | cask | a cask from here may deliver one gate higher | `3 G` | 1 |
| Brewmaster's Workshop | cask | a cask deployed here upgrades its slot-action to Wild | `3 G` | 1 |

**Deck totals:** ~24 tiles across 18 designs. **Display:** 4 face-up.

### 7C. Building behaviour (one-line reminders)

- **Captured on ship-through.** A cask passing **its owner’s** value building takes a **demand die** into its berth — **a real d6, max 6** (v2.2): set it to the building’s printed ★ **plus the quality premium**, never accumulated (only buildings modify dice; the destination is the cask’s *starting value*; a rival’s cargo sets no die — v2.3). Quality transforms ride a **+1-quality marker** (works — they serve any dock). Ship value buildings (Rich Berth · Festkeller) **bump the owner’s casks’ dice when the hull sails** (a die-less cask takes one at the bump value; the one die stays capped at 6).
- **Quality premium (v1.8 · v2.2 part of the die).** Cask value buildings pay their printed ★ at Q1–Q3; a **Q4** cask sets the die **+2** higher, a **Q5** cask **+3** higher (die max 6). Reliquary/Hall excluded. Ship value buildings stay flat (a fixed bump, no premium).
- **Displacement — one rule (v2.2).** Placing on an occupied slot displaces the tile there: its **owner banks +3★ immediately** (self-overbuild included — the tile's printed back is the record) and the tile **flips into their improvements/floor slots** (a Wild on the back, fired via the Floor); **floor full → the tile is discarded** (the ★ still banked).

---

## 8. Recipe cards · family D (6 designs)

Permission to brew a quality. Permanent; never consumed. Two are start-printed.

| Recipe | Quality | Buy ⚙ | Brew ⚙ |
|---|---|---|---|
| Gruit | Q1 | start | `G` |
| Hopped | Q2 | start | `G H` |
| Broyhan | Q3 | `1 H` | `G H H` |
| Keut | Q3 | `1 G` | `G G H` |
| Mumme | Q4 | `2 H` | `G H H H` |
| Bock | Q5 | `1 G 1 H` | `G G H H H` |

Print 4 copies of each export recipe (covers 4 houses each picking up the full ladder), plus 4 each of Gruit / Hopped as printed starter cards.

---

## 9. Specialist tiles · family E (7 designs, scarce deck)

Private brewery-board tiles (**SPECIALISTS — purple**, the third tile type; v2.6.1 persona names — each tile carries an `art` brief: a **beige field, one centered object**, the specialist’s trade), bought at the **Cellar** for goods — or gained free via **Hire** (the Q3+ cask action) or a **London** delivery (v2.4). The deck holds `n − 1` copies of each type (n = player count → 7 / 14 / 21 tiles). A face-up **display of 4** at the Cellar refills from the deck. A house cannot own two of the same type. The improvements area holds **4 tiles total** (improvements + flipped buildings).

| Improvement | Effect ⚙ | Cost ⚙ |
|---|---|---|
| **Coppersmith** *(a gleaming copper brew kettle)* | +1 brewing lane (vessels start 2, cap 3) | `3 G` |
| **Cellarman** *(an oak cask racked on a stillage)* | Age +1 — brews mature one step sooner | `4 G` |
| **Grain Factor** *(a burlap sack of barley)* | when you gain grain, +1 extra | `3 G` |
| **Hop Gardener** *(a hop bine with cones on a pole)* | when you gain hops, +1 extra | `4 G` |
| **Stevedore** *(a wooden treadwheel harbor crane)* | Load 2 casks when Loading | `3 G` |
| **Lagerkeeper** *(frost-dusted stacked casks)* | all vessels +1 age each of your turns | `2 G` |
| **Quaymaster** *(a private jetty + mooring bollard)* | Load OR Enshrine straight from your vessels (v2.7) | `3 G` |

**Print: 21 improvement tiles** (3 copies × 7 types covers up to 4 players).

---

## 10. Cask-action pool · family F (steerable kettle)

Each quality's casks form a face-up pile; the **top action** of every quality pile is visible, so brewing chooses among them. Gruit is pinned to Source (`+2 goods`).

| Action | Effect | Where it draws |
|---|---|---|
| Source | gain 2 goods | Q1 (pinned) · Q2–Q5 pool |
| Age | age 1 cask 2 steps | Q2–Q5 pool |
| Load | free-load a Ready cask onto a ship | Q2–Q5 pool |
| Reach | +1 presence at a kontor you've delivered to | Q2–Q5 pool |
| Convert | up to 2 goods G↔H | Q2–Q5 pool |
| Survey | choose a Building from the display + place it at once | Q2–Q5 pool |
| Hire | take an eligible Specialist from the Cellar display, free | Q3–Q5 pool (v2.4) |
| Wild | take any one base action | Q4+ pool only |

---

## 11. Destinations · family G (on the destination board)

All open from setup. **Kontor delivery value = base + the value-building bonuses the cask shipped through.** The Hall pays a fixed prestige ladder; the Hall is reached by Enshrine, not a ship.

| Destination | Quality gate | Base value ⚙ | On-delivery benefit ⚙ | Majority (1 / 2 / 3) ⚙ |
|---|---|---|---|---|
| Bruges (Hub) | Q1 | +1 ★ | 2 goods (owner's choice) | 4 / 2 / 0 |
| London (Steelyard) | Q2 | +1 ★ | a Privilege/Building (placed) OR a Specialist, free | 5 / 3 / 1 |
| Bergen (Bryggen) | Q2 | +1 ★ | free Reach (+1 presence) | 9 / 5 / 2 |
| Novgorod (Peterhof) | Q3 | scales: Q3·2 / Q4·4 / Q5·6 | refine — a maturing cask +1 age | 8 / 5 / 2 |
| The Hall | Q2 (deployed) | fixed ladder: Q2·3 / Q3·5 / Q4·7 / Q5·9 | — | — |

**Notes:** 2-player games skip 2nd place; ties split the occupied tiers. **Delivery = the destination’s starting value + the demand die in the berth — nothing else** (v2.3: no shares, no wharfage). **Benefits resolve when gained, owner's choice** (Novgorod's refine: the owner picks which maturing cask; London's Building: chosen + placed at once), whoever's turn it is (v2.2).

---

## 12. The player board (×4)

Printed schematic, no tokens of its own beyond what's listed in §4.

```
┌──────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE          STORAGE ▢▢▢▢ ▢▢▢▢  (G/H, cap 8)            │
│  VESSELS (start 2, cap 3)                                    │
│   V1 [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ deploy ]         │
│   V2 [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ deploy ]         │
│   V3 ▒ locked — unlocks with the Coppersmith ▒                  │
│  RECIPES   ▤Gruit ▤Hopped  ▤ ▤ …                             │
│  IMPROVEMENTS  [ ] [ ] [ ] [ ] (cap 4)   CONTRACTS  ▣▣       │
│  THE FLOOR — run your maturing casks' actions as a private   │
│              line                                            │
│  FLIGHT STRIP  ▤Gruit ▤Hopped ▢ ▢ ▢  (mark on delivery)      │
└──────────────────────────────────────────────────────────────┘
```

- **The Floor (v2.2 — the standing 3rd line):** after moving, choose the row, the column, **or the Floor** — the slot-actions of every cask in your vessels + a Wild per flipped building, any order, all optional. Never tolled. Scales with what you've held back.
- **The Flight strip:** one named space per beer — mark a beer the first time you deliver it; counted at game end (3→4 · 4→9 · 5→16 · 6→25 with Jopenbier in play, which counts).

---

## 13. Starting setup (per house)

| Item | Quantity | Source |
|---|---|---|
| Starting goods | 3 `G` + 2 `H` | from supply |
| Starting recipes | Gruit + Hopped | printed on the board |
| Open vessels | 2 | printed (V3 locked) |
| Charter contracts | 2 | from supply |
| Ready Gruit in V1 | 1 | from the cask supply |
| Worker placement | 1 | choose any station, free (no toll) |

Shared setup: 2 ships dealt onto slots (spread across lines, includes a guaranteed Hulk→Bruges); **2 neutral green Buildings** dealt from the deck onto open slots (v2.5 — no owner; overbuilt = discarded, nothing banked); ship market filled to 3; Building display filled to 4; Improvement display filled to 4 (deck = `n−1` × 7); export draft of 3 of 4; Sailed-Ships track length set (§14). *(v2.2: no starting building.)*

---

## 14. Box footprint (base game)

| Family | Count ⚙ | Designs |
|---|---|---|
| Boards | 3 (1 Wharf · 1 destinations · 4 brewery) | — |
| Casks (A) | 62 | 6 beers |
| Ships (B) | 20 | 2 hulls × 4 destinations |
| Buildings (C) | 24 | 18 |
| Recipes (D) | 24 cards | 6 |
| Improvements (E) | 21 | 7 |
| Charter contracts | 20 cards | 1 |
| Goods cubes | ~100 (60 `G` + 40 `H`) | 2 |
| Demand dice | 8 (d6) | 1 |
| Quality-boost markers | 6 | 1 |
| Worker pawns | 4 | 4 colours |
| Ownership / presence discs | 56 (14 / colour) | 4 colours |
| Sailed-Ships track length | 6 / 10 / 13 slots for 2 / 3 / 4 p | — |

**Pace dial:** Sailed-Ships fills end the game (max round ceiling 25 as backstop). The track is printed at length 13 (the 4-player figure); the shorter player counts cover the higher slots.

---

## 15. Expansion add-ons (three opt-in toggles, mix freely)

The base box is byte-identical when all three toggles are off. Each module is a small content add-on.

### 15A. Specialty Beers — adds to families A, C, D

Adds 3 specialty beers to the export draft (deal 3 of 7; ≥1 base Q4+ guaranteed). Each is **pinned** (printed slot-action) and carries one always-on signature.

| Quality | Beer (town) | Brew ⚙ | Matures | Pinned act | Signature | Qty ⚙ |
|---|---|---|---|---|---|---|
| Q2 | Gose (Goslar) | `G G` (no hops) | 1 | Source | Salt Trade — a kontor delivery: owner +1 `G` +1 `H` | 8 |
| Q3 | Zerbster (Zerbst) | `H H H` | 1 | Load | Parti-Gyle — brewing also racks a free Gruit | 6 |
| Q2 | Duckstein (Königslutter) | `G H` | 2 | Reach | Smoke-Hardy — ships & scores as +1 quality | 8 |

Recipe buys ⚙: Gose `1 G` · Zerbster `1 H` · Duckstein `1 G`.

**Adds 3 thematic Buildings (deck only when on):**

| Tile | Target | Effect ⚙ | Cost ⚙ | Qty ⚙ |
|---|---|---|---|---|
| Salt House | cask | a cask from here: +1 `G` +1 `H` on delivery (a privilege — the owner’s casks only) | `2 G` | 1 |
| Smoke Kiln | cask | a cask from here ships +1 quality (cap Q5) | `2 G` | 1 |
| Parti-Gyle Tun | cask | deploy a cask here: rack a free Gruit | `2 G` | 1 |

**Also adds:** the **Blending** action at the Cellar (combine two Ready vessel casks → one premium cask at +1 quality, cap Q5, in a freed vessel). No new component.

### 15B. Jopenbier capstone (independent toggle)

| Quality | Beer (town) | Brew ⚙ | Matures | Pinned act | Always acquirable | Qty ⚙ |
|---|---|---|---|---|---|---|
| Q6 (display) | Jopenbier (Danzig) | `G G H H H H` | 4 | Source | yes (not in draft) | 6 |

Scored **self-contained**: 8★ kontor / 9★ Hall, **+1★ per owner-turn while deployed (cap +5)**. **Counts for the Flight** (v2.2 — six types with the toggle on; 6→25). Recipe buy ⚙ `1 G 1 H`.

### 15C. The Trade Roads — Overland (replaces the kontor majorities)

Adds one inland-network board sitting beside the destination board. Per-house: presence markers are placed on the slots claimed.

**Components added:**

| Component | Qty ⚙ | Notes |
|---|---|---|
| Overland network board | 1 | Tree rooted at Hamburg (home). West → Bruges → London / Bergen / Rhineland; East → Novgorod. |
| Sailed-Ships track length | +2 slots | Extends each player count: 8 / 12 / 15. |

**Toggles OFF:** the kontor **majorities** (the contest moves inland; the majority chart on the destination board is not used).

**Town slots** (n+1 active per node — 2p uses 3, 3p/4p use 4, bounded by a node's printed slots; deep ◆ = high-gate terminals — Pskov scarce with its single slot, Frankfurt the rich 4-slot Rhineland outlet):

| Node | Gate | Base ★ | Slot menu (best-first) | Overflow |
|---|---|---|---|---|
| Bruges *(gateway, no slots)* | Q1 | — | take a recipe **OR** 2 goods | — |
| Cologne (Rhineland) | Q2 | +2 | recipe · free Gruit to a vessel · brew · brew | +2 age |
| Frankfurt (Rhineland) ◆ | Q3 | +3 | free Q3 to a vessel · free Enshrine · +2 age · +6★ | +2★ |
| Antwerp (London road) | Q2 | +2 | Building (display → placed) · brew · +3 goods · Building (display → placed) | Building (display → placed) |
| London (kontor) | Q2 | +3 | Building (display → placed) · free Improvement · +3 goods · free Improvement | Building (display → placed) |
| Tønsberg (Bergen road) | Q2 | +2 | +1 charter · brew · +2 `G` · brew | +2 `G` |
| Bergen (kontor) | Q2 | +3 | +1 charter · +3 goods · +1 vessel · +1 vessel | +2 `G` |
| Visby (East) | Q2 | +2 | +2 `G` · free road step · +2 age · +3★ | +2★ |
| Tallinn (East) | Q3 | +3 | +1 vessel · +1 quality · brew · +5★ | +2★ |
| Novgorod (kontor) | Q3 | ★ = delivered quality | +1 quality · +1 vessel · +2 age · +5★ | +2★ |
| Pskov (East) ◆ | Q5 | +5 | +8★ (every later delivery: +5★) | +5★ |

**Movement & claims:**

- Each ship that sails (full keystone) or each Charter advances each owner's caravan **one node** along that kontor's route, if a cask aboard meets the next node's quality gate.
- Each cask aboard then **claims an open slot** at the node reached, in load order. A 2-cask voyage = 2 slots.
- **Rhine Charter:** a Q4+ Charter may skip Bruges → Cologne (the cask still delivers at Bruges).
- **Re-homed (no orphans):** Bergen's free Reach and the Reach cask-action become **+1 caravan road step** to a city of your choice (gate-cap Q3).

---

## 16. Cross-references

- **Why the family is shaped this way** — `DESIGN.md` §6 (architecture) and §9 (change log).
- **How a tile is used during a turn** — `RULES.md` §2–§7.
- **The live numbers** — `play.html` (constants at the top of the `<script>` block: `STYLES`, `DEST`, `BUILDINGS`, `IMPROVEMENTS`, `SHIP_DECK_MIX`, `SAILED_CAP`, `MAX_ROUND`).
- **Printed cut sheets** — `printables.html`. *(Do not back-fill this manifest from the printables; printables generate from this doc, not the other way around.)*

---

## 17. Known component gaps (recorded 2026-07-04 · resolve in the components revision)

> **Direction (designer, 2026-07-04):** the **card kit (`printables2.html`) is the direction of the game** (the tile kit's tokens-and-tiles density problem is real). **Owner frames are the confirmed solution** for marking building ownership — supersedes this doc's §4 note that the disc marks it. A **new board carrying the supply displays, the round tracker, and the score track** will be designed later; not a concern now. Until that revision, the table below records every gap between what the digital reference (`play.html`) tracks and what the printed components can carry — the standing rule is that **all game state must live in the components on the table**.

| # | Gap | State it must carry | Sketch of a fix |
|---|---|---|---|
| 1 | **Maturation markers missing** — no token is manifested to sit on the cask card's printed aging track (the old "per-vessel maturation marker" note was lost in the DESIGN compaction) | each maturing cask's step | ~3 markers per player colour (one per vessel), or spare cubes |
| 2 | ~~Flight strip is count-based~~ **FIXED in v2.2** — the `printables2` player board now carries per-beer named spaces (+ a 6th Jopenbier space) | distinct beers delivered | shipped with the v2.2 pass |
| 3 | **Loaded-cargo procedure unspecified** — 2.5″ cask cards can't sit in the die-sized printed berths; where cargo cards go and how load order is preserved is undefined | a ship's cargo + load order | e.g. tuck cargo cards under the ship card's edge in berth order; the demand die sits in the printed berth |
| 4 | **Jopenbier vintage counter** — nothing tracks the deployed capstone's +1★/turn (0–5) | the vintage count | print a 0–5 strip on the Jopenbier card + a cube |
| 5 | **Improvement display has no printed zone** — the v82 Cellar display of 4 + its deck are absent from the supply board | the face-up improvement display + deck | a zone on the new supply board |
| 6 | **Sailed-Ships track prints 13 cells** — The Trade Roads extends the clock to 8 / 12 / 15 | the end clock with the expansion on | 15 cells with dual END marks per player count (new supply board) |
| 7 | **Score track runs 0–50** — recorded winner ceilings reach ~90 (v1.8 sims) | banked score | 0–99, or a 50/100 lap marker (new supply board) |
| 8 | **Recipe-card count drift** — §8 says 24 cards (incl. 4× Gruit/Hopped); both kits print 16 export-only cards with the starters printed on the player board | — | manifest adopts the kits' model: 16 export cards + printed starters |
| 9 | **Owner frames absent from the manifest** — `printables2` ships 6 per colour; §4 still assigns building-marking to the disc | building ownership on slots | add frames to §4 (confirmed direction); reword the disc's "three lives" |
| 10 | **Blend's +1 quality** (Specialty Beers) has no stated carrier; the 6 quality-boost markers are already claimed by the kilns | a blended cask's raised quality | more boost markers, or a printed carrier rule + a supply count check |
| 11 | **Trade Roads free-Improvement** grants a tile from outside the printed `n − 1` deck supply | — | resolve in the Trade Roads review pass |
| 12 | **Demand dice supply (8)** unverified against worst-case simultaneous loaded bonuses | dice riding berths | count check at the table |
