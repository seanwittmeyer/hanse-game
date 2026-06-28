# Brewhouses of the Hanse — Components

> **The box manifest.** What is *in* the game, line by line. **Every count is a placeholder ⚙.**
>
> - Operational rules: `RULES.md`. Design rationale & version history: `DESIGN.md` §9.
> - The live build is `play.html` (`KEY hanse-hotseat-v84`); it is the source of truth on values and behaviour. This doc enumerates the physical pieces that implement it.
> - Cross-reference for tile families: §3 boards, §4 supply, §5–11 the seven families A–G, §12 player board, §13 starting setup, §14 box footprint. Expansion add-ons are §15; cross-references §16.

---

## 1. Conventions for the tables

- **Goods:** `G` = grain, `H` = hops — the only currency.
- **A line** = a row or column of the Wharf = two stations + the two slots beside them.
- **A slot stack** (max two layers): `[building?] + [ship+casks | cask]`.
- **Owned-but-shared:** any building works for whoever docks on it; the owner gets the full effect, a rival gets a reduced effect and pays the owner a small **wharfage** in points.
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
| Demand dice (d6) | 8 | Reusable value-bonus carrier — pips = the ★ a cask banks on delivery from a value building. |
| Quality-boost markers | 6 | Ride a cask from a Malt Kiln / Hop Yard, raising its effective quality at delivery. |
| Charter contracts (cards) | 16 | Spend 1 + a flat `2 G` fare to Charter; buyable at the Market (`1 G`). |
| First-player marker | 1 | Fixed all game (turn order does not rotate). |
| Round / Sailed-Ships marker | 2 | Round clock; voyage counter. |
| Score pad or track | 1 | Scoring is in-game; pads or a shared track both work. |

---

## 4. Per-player components (×4 sets)

| Component | Qty per house ⚙ | Notes |
|---|---|---|
| Worker pawn | 1 | Moves between stations. |
| Presence barrels (player colour) | 9 | Single token in three lives: ownership on a slot → rides on a ship → plants at the kontor as your presence (the majority count). **Finite supply = your trade-factor cap.** Enshrining returns the barrel; the Hall is unlimited. |
| Building-owner markers | 6 | Mark whose building sits on a slot (wharfage routing). |

---

## 5. Cask tiles · family A (~60, shared supply)

A brewed beer in one of three states: **maturing** (vessel) → **deployed** (slot, cargo + a public action) → **delivered** (scores, gone). Each cask carries a printed quality and, on brewing, a slot-action drawn from the top of its quality pile (Gruit is pinned to Source).

| Quality | Beer | Brew cost | Matures | Reaches | Qty ⚙ |
|---|---|---|---|---|---|
| Q1 | Gruit Ale | `G` | 1 | Bruges | 16 |
| Q2 | Hopped Beer | `G H` | 1 | + London · Bergen · the Hall | 20 |
| Q3 | Broyhan | `G H H` | 1 | + Novgorod | 6 |
| Q3 | Keut *(+1 presence on a kontor delivery)* | `G G H` | 2 | + Novgorod | 6 |
| Q4 | Mumme | `G H H H` | 3 | all | 8 |
| Q5 | Bock | `G G H H H` | 3 (2 with Aging Cellar) | all | 4 |

**Draft:** the export ladder deals **3 of the 4** export beers each game (so dropping one varies the climb). Gruit + Hopped are always available.

---

## 6. Ship tiles · family B (20-tile deck)

Neutral, destination-bound hulls. Drawn from a shuffled deck into a face-up **market of 3** at the Market. Commission (`2 G`) places one on a slot with a free first load.

| Hull | Capacity | Qty | Destination spread |
|---|---|---|---|
| Cog | 2 casks | 11 | 3 Bruges · 3 London · 2 Bergen · 3 Novgorod |
| Hulk | 3 casks | 9 | 2 Bruges · 2 London · 3 Bergen · 2 Novgorod |

**Sails only when full** → every cask delivers, in load order, then the hull returns to the bottom of the deck. **The Hall is never a ship destination** (it is reached by Enshrine).

---

## 7. Building tiles · family C (the owned slot layer)

Acquired at the Market (buy + place) or earned free to hand by delivering to London (and via Survey). **One grammar:** a building modifies the occupant docked on it — `tgt` is what it acts on (cask, ship, owner). A face-up **display of 4** at the Market refills from the shuffled deck.

### 7A. Value buildings — the cask/ship banks bonus ★ on delivery

| Tile | Target | Effect ⚙ | Cost ⚙ | Qty ⚙ |
|---|---|---|---|---|
| Rich Berth | ship | each cask the ship delivers: +2★ | `3 G` | 2 |
| Staple Hall | cask | a cask from here delivers +3★ (any kontor) | `3 G` | 2 |
| Burgomaster's Favor | cask | a cask from here: +1★ per quality level | `3 G` | 2 |
| Connoisseur's Cellar | cask | a Q4+ cask from here: +4★ | `3 G` | 1 |
| The Hanse Diet | cask | a cask to a kontor where you LEAD: +3★ | `3 G` | 1 |
| Festkeller | ship | a FULL ship here: +1★ per cask | `3 G` | 1 |
| Reliquary | cask | a cask enshrined from here: +2★ prestige | `3 G` | 1 |
| Almoner's Stall | owner | your wharfage cut from rivals: +1★ more | `3 G` | 1 |
| Bruges Hanzehuis | cask | a cask from here to Bruges: +4★ | `2 G` | 1 |
| London Steelyard | cask | a cask from here to London: +4★ | `2 G` | 1 |
| Bergen Bryggen | cask | a cask from here to Bergen: +4★ | `2 G` | 1 |
| Novgorod Peterhof | cask | a cask from here to Novgorod: +4★ | `2 G` | 1 |

### 7B. Transform buildings — the cask/ship is changed

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

- **Captured on ship-through.** A cask passing a value building takes a **demand die** into its berth (pips = ★). Quality transforms ride a **+1-quality marker**. Ship value buildings (Rich Berth · Festkeller) resolve live when the hull sails.
- **Quality premium (v1.8).** Cask value buildings pay their printed ★ at Q1–Q3 and bank **+2★ at Q4 · +3★ at Q5** on top. Reliquary/Hall excluded. Ship value buildings stay flat.
- **Displacement.** Placing on an occupied slot replaces the existing tile. A rival-displaced tile **flips into the owner's improvements area** (worth +3★ at game end + a Wild on the back, fired via the Floor). Self-displacement pays nothing and returns to hand.

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

## 9. Improvement tiles · family E (7 designs, scarce deck)

Private brewery upgrades, bought at the **Cellar** for goods. The deck holds `n − 1` copies of each type (n = player count → 7 / 14 / 21 tiles). A face-up **display of 4** at the Cellar refills from the deck. A house cannot own two of the same type. The improvements area holds **4 tiles total** (improvements + flipped buildings).

| Improvement | Effect ⚙ | Cost ⚙ |
|---|---|---|
| Extra Vessel | +1 brewing lane (vessels start 2, cap 3) | `4 G` |
| Aging Cellar | maturation −1 step | `4 G` |
| Granary Right | when you gain grain, +1 extra | `3 G` |
| Hop Garden | when you gain hops, +1 extra | `3 G` |
| Harbor Crane | your Harbor load sets out 2 casks (not 1) | `3 G` |
| Lagering Cellar | each of your turns: +1 age to one maturing cask | `3 G` |
| Private Quay | load Ready casks straight from vessels onto ships | `4 G` |

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
| Survey | draw a Building tile to hand | Q2–Q5 pool |
| Wild | take any one base action | Q4+ pool only |

---

## 11. Destinations · family G (on the destination board)

All open from setup. **Kontor delivery value = base + the value-building bonuses the cask shipped through.** The Hall pays a fixed prestige ladder; the Hall is reached by Enshrine, not a ship.

| Destination | Quality gate | Base value ⚙ | On-delivery benefit ⚙ | Majority (1 / 2 / 3) ⚙ |
|---|---|---|---|---|
| Bruges (Hub) | Q1 | +1 ★ | 2 goods (owner's choice) | 4 / 2 / 0 |
| London (Steelyard) | Q2 | +1 ★ | take a Building to hand | 5 / 3 / 1 |
| Bergen (Bryggen) | Q2 | +1 ★ | free Reach (+1 presence) | 9 / 5 / 2 |
| Novgorod (Peterhof) | Q3 | scales: Q3·2 / Q4·4 / Q5·6 | refine — a maturing cask +1 age | 8 / 5 / 2 |
| The Hall | Q2 (deployed) | fixed ladder: Q2·3 / Q3·5 / Q4·7 / Q5·9 | — | — |

**Notes:** 2-player games skip 2nd place; ties split the occupied tiers.

---

## 12. The player board (×4)

Printed schematic, no tokens of its own beyond what's listed in §4.

```
┌──────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE          STORAGE ▢▢▢▢ ▢▢▢▢  (G/H, cap 8)            │
│  VESSELS (start 2, cap 3)                                    │
│   V1 [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ deploy ]         │
│   V2 [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ deploy ]         │
│   V3 ▒ locked — unlocks with Extra Vessel ▒                  │
│  RECIPES   ▤Gruit ▤Hopped  ▤ ▤ …                             │
│  IMPROVEMENTS  [ ] [ ] [ ] [ ] (cap 4)   CONTRACTS  ▣▣       │
│  THE FLOOR — run your maturing casks' actions as a private   │
│              line                                            │
│  FLIGHT STRIP  ▤Gruit ▤Hopped ▢ ▢ ▢  (mark on delivery)      │
└──────────────────────────────────────────────────────────────┘
```

- **The Floor:** in lieu of working the public Wharf, run the slot-actions of every cask in your vessels as a private line. Scales with what you've held back; also the occupancy-toll fallback.
- **The Flight strip:** mark a beer the first time you deliver it; counted at game end (3→4 · 4→9 · 5→16).

---

## 13. Starting setup (per house)

| Item | Quantity | Source |
|---|---|---|
| Starting goods | 3 `G` + 2 `H` | from supply |
| Starting recipes | Gruit + Hopped | printed on the board |
| Open vessels | 2 | printed (V3 locked) |
| Charter contracts | 2 | from supply |
| Building in hand | 1 | from the Building deck |
| Ready Gruit in V1 | 1 | from the cask supply |
| Worker placement | 1 | choose any station, free (no toll) |

Shared setup: 2 ships dealt onto slots (spread across lines, includes a guaranteed Hulk→Bruges); ship market filled to 3; Building display filled to 4; Improvement display filled to 4 (deck = `n−1` × 7); export draft of 3 of 4; Sailed-Ships track length set (§14).

---

## 14. Box footprint (base game)

| Family | Count ⚙ | Designs |
|---|---|---|
| Boards | 3 (1 Wharf · 1 destinations · 4 brewery) | — |
| Casks (A) | 60 | 6 beers |
| Ships (B) | 20 | 2 hulls × 4 destinations |
| Buildings (C) | 24 | 18 |
| Recipes (D) | 24 cards | 6 |
| Improvements (E) | 21 | 7 |
| Charter contracts | 16 cards | 1 |
| Goods cubes | ~100 (60 `G` + 40 `H`) | 2 |
| Demand dice | 8 (d6) | 1 |
| Quality-boost markers | 6 | 1 |
| Worker pawns | 4 | 4 colours |
| Presence barrels | 36 (9 / colour) | 4 colours |
| Building-owner markers | 24 (6 / colour) | 4 colours |
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
| Salt House | cask | a cask from here: owner +1 `G` +1 `H` on delivery | `2 G` | 1 |
| Smoke Kiln | cask | a cask from here ships +1 quality (cap Q5) | `2 G` | 1 |
| Parti-Gyle Tun | cask | deploy a cask here: rack a free Gruit | `2 G` | 1 |

**Also adds:** the **Blending** action at the Cellar (combine two Ready vessel casks → one premium cask at +1 quality, cap Q5, in a freed vessel). No new component.

### 15B. Jopenbier capstone (independent toggle)

| Quality | Beer (town) | Brew ⚙ | Matures | Pinned act | Always acquirable | Qty ⚙ |
|---|---|---|---|---|---|---|
| Q6 (display) | Jopenbier (Danzig) | `G G H H H H` | 4 | Source | yes (not in draft) | 3 |

Scored **self-contained**: 8★ kontor / 9★ Hall, **+1★ per owner-turn while deployed (cap +5)**. Not part of the Flight. Recipe buy ⚙ `1 G 1 H`.

### 15C. The Trade Roads — Overland (replaces the kontor majorities)

Adds one inland-network board sitting beside the destination board. Per-house: presence markers are placed on the slots claimed.

**Components added:**

| Component | Qty ⚙ | Notes |
|---|---|---|
| Overland network board | 1 | Tree rooted at Hamburg (home). West → Bruges → London / Bergen / Rhineland; East → Novgorod. |
| Sailed-Ships track length | +2 slots | Extends each player count: 8 / 12 / 15. |

**Toggles OFF:** the kontor **majorities** (the contest moves inland; the majority chart on the destination board is not used).

**Town slots** (n+1 active per node — 2p uses 3, 3p/4p use 4; deep ◆ nodes stay at 2):

| Node | Gate | Base ★ | Slot menu (best-first) | Overflow |
|---|---|---|---|---|
| Bruges *(gateway, no slots)* | Q1 | — | take a recipe **OR** 2 goods | — |
| Cologne (Rhineland) | Q2 | +2 | recipe · free Gruit to a vessel · brew · brew | +2 age |
| Frankfurt (Rhineland) ◆ | Q3 | +3 | free Q3 to a vessel · free Enshrine · +2 age · +6★ | +2★ |
| Antwerp (London road) | Q2 | +2 | Building to hand · brew · +3 goods · Building to hand | Building to hand |
| London (kontor) | Q2 | +3 | Building to hand · free Improvement · +3 goods · free Improvement | Building to hand |
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
