# Brewhouses of the Hanse — Components (v3.1 “One Row”)

> **The box manifest.** What is *in* the game, line by line. **Every count is a placeholder ⚙.**
>
> - Operational rules: `RULES.md`. Design rationale & version history: `DESIGN.md` §9; the build plan `V3-PATH-A.md`.
> - The live build is `play.html` — **v3.1 “One Row”** (`KEY hanse-v31`); it is the source of truth on values and behaviour. This doc enumerates the physical pieces that implement it. The prior manifest is archived at `archive/v2.9/COMPONENTS.md`.
> - **The print kit is `printables2.html` (the card kit) — the only kit in use.** Printables generate from this doc, never the other way around.
> - Cross-reference: §2 boards, §3–4 supply, §5–11 the tile families, §12 player board, §13 setup, §14 box footprint, §15 expansions, §16 cross-refs, §17 gaps.

---

## 1. Conventions for the tables

- **Goods:** `G` = grain, `H` = hops — the only currency.
- **A line** = a row or column of the Wharf = two stations + the two slots beside them. **Slot locality (v3.0-A):** a slot’s line-stop acts on that slot.
- **A slot stack** (max two layers): `[slot tile?] + [ship+casks | cask]`.
- **Three tile types, three colours:** a **PRIVILEGE** (bright **blue**) — prints **ONE die number**; the owner’s departing cask carries the die at that value (a rival docking there banks nothing); a **BUILDING / work** (**green**) — serves any dock (some print an action on their slot’s stop); a **SPECIALIST** (**purple**) — a private player-board tile.
- **End clock:** the Sailed-Ships track fills by one per **dispatch** — a full sail, a kontor Dispatch (charter), or a Hall Dispatch (enshrine).

---

## 2. Boards (4 kinds)

| Board | Qty | Holds |
|---|---|---|
| Main board — **the Wharf** | 1 | 2×2 stations **A Market · B Brewhouse · C Harbor · D Cellar** — each face printing its **TWO actions** (`[icon] / [icon]`: Source/Acquire · Brew/Deploy · Load/Dispatch · Age/Upgrade) — ringed by 8 slots. |
| Destination board | 1 | The four kontore (Bruges · London · Bergen · Novgorod): gate, printed value, benefit, majority track. |
| **The Hall shelf board** *(new, v3.0-A)* | 1 | Four quality-gated shelves — **Q2→3★ · Q3→5★ · Q4→6★ · Q5→8★** (v3.1 ⚙ trims the high rows — the honors carry value) — each a row of printed **honor spaces** claimed with cask cubes (§11B). Active spaces per shelf ≈ n+1 ⚙. |
| Player boards | 4 | **ONE Floor row of 7 printed slots** (v3.1 “One Row”: slots 1–2 open · slot 1 vessel-only · covers on 3–7; a slot holds a maturing cask, a seated Specialist, or a flipped tile), the Flight/unlock strip, recipe rack, storage (§12). |
| Market & Stores board *(printables2)* | 1 | The supply displays (ships 3 · Wharf tiles 4 · Specialists 4), the Sailed-Ships track (15 cells, END marks per count), the 50-cell score ring. |

---

## 3. Common supply (one set, shared)

| Component | Qty ⚙ | Purpose |
|---|---|---|
| Grain cubes (`G`) | ~60 | Currency + brew input. |
| Hops cubes (`H`) | ~40 | Currency + brew input. |
| Demand dice (d6) | 8 | **One-read value carrier (v3.0-A):** set once, at departure, to the ONE number printed on the owner’s Privilege. Rides the hull’s berth well; returns to the pool after delivery. Never rolled. |
| Quality-boost (+1Q) markers | 6 | Ride a cask from a Malt Kiln / Hop Yard / Smoke Kiln; effective quality for gates AND points. |
| Charter contracts (cards) | 20 | A kontor Dispatch spends 1 + the flat `2 G` fare; buyable at the Market (`1 G`). |
| First-player marker | 1 | Fixed all game (turn order does not rotate). |
| Round / Sailed-Ships marker | 2 | Round clock; dispatch counter. |
| Draw bags | 3 | One per hidden tile supply — **ships** · **Privileges & Buildings** · **Specialists**; displays refill by blind draw. |

---

## 4. Per-player components (×4 sets)

| Component | Qty per house ⚙ | Notes |
|---|---|---|
| Worker pawn | 1 | Moves between stations — or **stays home** on a Floor turn. |
| Presence discs (player colour) | 12 | Ownership on a slot tile (with a frame) → delivered presence at a kontor (the majority count). **Finite = the printed Reach wall** (bonus presence can’t push a kontor past the supply). |
| **Cask cubes** (player colour) *(new)* | 8 | Ride a hull’s **berth well** (the loaded cask’s owner) and **claim Hall shelf spaces** (the enshrine trophy). |
| Owner frames | 6 | Mark whose Privilege/Building sits on a slot (confirmed direction, 2026-07-04). |
| **Unlock covers** *(new)* | 5 | Sit on Floor slots 3–7 (v3.1 “One Row”); a Flight unlock (each new distinct beer brewed, from the 2nd), the Coppersmith, or the High Board honor removes the next one. |
| Maturation markers | 5 ⚙ | One per brewing slot in use — sits on the cask card’s printed aging track. |

---

## 5. Cask tiles · family A (~62, shared supply)

A brewed beer in one of three states: **maturing** (vessel) → **deployed** (slot — cargo + a public action) → **delivered** (scores, gone). Each cask carries a printed quality and, on brewing, an action drawn from the top of its quality pile (Gruit pinned). **Brewing a new distinct beer marks the Flight strip — from the 2nd on, each mark grants a Floor-slot unlock.**

| Quality | Beer | Brew cost | Matures | Reaches | Qty ⚙ |
|---|---|---|---|---|---|
| Q1 | Gruit Ale | `G` | 1 | Bruges | 16 |
| Q2 | Hopped Beer | `G H` | 1 | + London · Bergen · the Hall | 20 |
| Q3 | Broyhan | `G H H` | 1 | + Novgorod | 6 |
| Q3 | Keut *(+1 presence on a kontor delivery)* | `G G H` | 2 | + Novgorod | 6 |
| Q4 | Mumme | `G H H H` | 3 | all | 8 |
| Q5 | Bock | `G G H H H` | 3 (2 with the Cellarman) | all | 6 |

**Draft:** deal **3 of the 4** export beers each game. Gruit + Hopped are always available.
**Supply floor:** a **minimum of 6 tiles per type** (staples deeper: Gruit 16 · Hopped 20; the Jopenbier capstone also stocks 6 — §15B). Casks are **brewed, never bought**; `play.html` does not cap the supply.
**Over-deploy (printed on the aid, not the tile):** your own lower **Ready** cask under a higher one is **tapped on the way out** (action fires once, then boxed); **anyone’s Q1** under a higher cask **sours** (boxed, no action); a maturing (Staithe) cask is safe except the Q1 rule.

---

## 6. Hull tiles · family B (20-tile deck) — the carrier component

Neutral, destination-bound hulls, drawn from a shuffled deck into a face-up **market of 3**. **The hull is the carrier (v3.0-A):** it prints its destination chip, **quality gate**, and **numbered berth wells** — each well holds the loading owner’s **cask cube** + the cask’s **demand die** (if set) + any **+1Q marker**. The cask card leaves the wharf at load and waits face-up by its owner (the manifest row) until the hull sails.

| Hull | Capacity | Qty | Destination spread |
|---|---|---|---|
| Cog | 2 casks | 11 | 3 Bruges · 3 London · 2 Bergen · 3 Novgorod |
| Hulk | 3 casks | 9 | 2 Bruges · 2 London · 3 Bergen · 2 Novgorod |

**Commission** (`2 G`): place a face-up hull on an **open slot + the free load** (any player’s deployed cask, or a Ready cask straight from YOUR vessels), **or onto a slot whose cask QUALIFIES for the hull’s port** — the dockside pickup: that cask boards **as** the free load (v3.0-A.1 — no second load).
**Sails only when full** → every cask delivers in load order; the hull returns to the bottom of the deck. **The Hall is never a ship destination** (a Hall Dispatch, no boat).

---

## 7. Slot tiles — Privileges & Buildings · family C (27 tiles)

Always acquired **from the face-up Wharf display of 4 and placed at once** (no hand): buy at the Market, free via London, or the **Gain 1 building** cask action. **Overbuild = the `1 G` ground rent**; the displaced tile flips face-down into an open **Floor slot** of its owner’s (v3.1 — none seatable → boxed) as a Floor Wild — **flips score nothing**.

### 7A. PRIVILEGES (blue, 12 tiles) — print ONE die number; the owner’s departing cask carries it

| Tile | Printed text | Cost ⚙ | Qty ⚙ |
|---|---|---|---|
| Staple Hall | Your cask departs: die 3 | `3 G` | 2 |
| Burgomaster’s Favor | Your cask departs: die = its quality (max 5) | `3 G` | 2 |
| Connoisseur’s Cellar | Your Q4+ cask departs: die 4 *(v3.1 ⚙ 5→4)* | `3 G` | 1 |
| The Hanse Diet | Your cask departs: die 2 + 1 presence there | `3 G` | 1 |
| Almoner’s Stall | Your cask departs: die 3 if no presence there | `3 G` | 1 |
| Reliquary | Enshrined from here: die 2 | `3 G` | 1 |
| Bruges Hanzehuis | Your cask departs: die 3. Bruges only *(v3.1 ⚙ 4→3 — the Q1 port’s charter pays less)* | `2 G` | 1 |
| London Steelyard | Your cask departs: die 4. London only | `2 G` | 1 |
| Bergen Bryggen | Your cask departs: die 4. Bergen only | `2 G` | 1 |
| Novgorod Peterhof | Your cask departs: die 4. Novgorod only | `2 G` | 1 |

### 7B. BUILDINGS / works (green, 15 tiles) — serve any dock; three print an action on their slot’s stop

| Tile | Printed text | Cost ⚙ | Qty ⚙ |
|---|---|---|---|
| Malt Kiln | Cask ships +1 quality (max Q5) | `2 G` | 2 |
| Hop Yard | Q2+ cask ships +1 quality | `3 G` | 1 |
| Cooperage | Ship here holds +1 cask | `2 G` | 2 |
| Customs House | Ship here boards casks 1 gate lower | `2 G` | 2 |
| Brewmaster’s Workshop | Cask here acts as Wild | `3 G` | 1 |
| Rich Berth | Ship here may sail 1 berth short | `2 G` | 2 |
| Pilot’s House *(new)* | On sail: reroute to a kontor ±1 gate | `3 G` | 1 |
| Open Staithe *(new)* | Un-Ready casks may deploy here; age +1 per turn | `2 G` | 1 |
| Rope Walk *(new)* | Empty stop: gain 1 contract | `2 G` | 1 |
| Grain Exchange *(new)* | Empty stop: convert 2 goods | `2 G` | 1 |
| Mission Quay *(new)* | Empty stop: age a cask +1 | `2 G` | 1 |

**Cut (v3.0-A):** the Gauger’s Office · the Festkeller. **Tile backs** print the flip side: a `Wild` face (no ★ — flips are engine, never score).

### 7C. Behaviour (one-line reminders)

- **The die is set ONCE, at departure**, to the Privilege’s printed number — no premium, no sail-time bump, no cap arithmetic (no tile prints above 6). Conditions are printed on the tile and read at departure. The climb pays where quality is *read*: Novgorod’s scale, the Hall’s shelf gates, the quality-keyed tiles.
- **Quality works** ride a **+1Q marker** (gates AND points).
- **Overbuild:** `1 G` to the stores (self, rival, neutral alike; can’t pay → not a legal target); the displaced tile → an open Floor slot of its owner’s, face-down (a Floor Wild; **0★**); none seatable → boxed. Neutral tiles are discarded.

---

## 8. Recipe cards · family D (6 designs)

Permission to brew a quality. Permanent. Gruit + Hopped print on the player board.

| Recipe | Quality | Buy ⚙ | Brew ⚙ |
|---|---|---|---|
| Gruit | Q1 | start | `G` |
| Hopped | Q2 | start | `G H` |
| Broyhan | Q3 | `1 H` | `G H H` |
| Keut | Q3 | `1 G` | `G G H` |
| Mumme | Q4 | `2 H` | `G H H H` |
| Bock | Q5 | `1 G 1 H` | `G G H H H` |

Print **16 export cards** (4 copies × 4 exports); starters printed on the boards. The **Gain 1 recipe** cask action takes a dealt export card at its buy cost **−1 G** ⚙.

---

## 9. Specialist tiles · family E (7 designs, scarce deck)

Private player-board tiles (**purple**; each carries an `art` brief — a beige field, one centered object). Bought at the **Cellar (Upgrade)**, hired free via the **Gain 1 specialist** cask action (Q3+), or London’s benefit. Deck = `n − 1` copies of each type (7 / 14 / 21 tiles); face-up **display of 4**. No duplicates per house. **Each seated Specialist occupies a Floor slot** (v3.1 “One Row” — it competes with your vessels; the Coppersmith is pure capacity and seats no tile).

| Specialist | Printed text | Cost ⚙ |
|---|---|---|
| **Coppersmith** *(a gleaming copper brew kettle)* | +1 Floor slot (opens a cover; seats no tile) | `3 G` |
| **Cellarman** *(an oak cask racked on a stillage)* | Your brews mature 1 step sooner | `4 G` |
| **Grain Factor** *(a burlap sack of barley)* | Gain grain: +1 extra | `3 G` |
| **Hop Gardener** *(a hop bine with cones on a pole)* | Gain hops: +1 extra | `4 G` |
| **Stevedore** *(a wooden treadwheel harbor crane)* | Your Load: 2 casks | `3 G` |
| **Lagerkeeper** *(frost-dusted stacked casks)* | Floor Age pool +2 | `2 G` |
| **Quaymaster** *(a private jetty + mooring bollard)* | Load/Dispatch straight from your vessels | `3 G` |

**Print: 21 tiles** (3 × 7 covers up to 4 players).

---

## 10. Cask-action pool · family F (nine specific gains, steerable kettle)

Each quality’s casks form a face-up pile; the **top action** of every pile is visible, so brewing chooses among them. Gruit is pinned.

| Action | Effect | Pile gate ⚙ |
|---|---|---|
| Gain 2 goods | any mix | Q1 (pin) · Q2+ |
| Age a cask +2 | one vessel cask | Q2+ |
| Load 1 cask | onto any eligible hull, free | Q2+ |
| Place 1 presence | at a kontor you’ve delivered to | Q2+ |
| Gain 1 recipe | a dealt export card at buy cost −1 G | Q2+ |
| Gain 1 building | from the Wharf display, placed at once (rent applies) | Q3+ |
| Gain 1 specialist | from the Cellar display, free | Q3+ |
| Brew 1 cask | pay its cost into an open vessel | Q4+ |
| Enshrine 1 cask | dispatch one deployed Q2+ cask to the Hall (ticks the clock) | Q4+ |

**Cut (v3.0-A):** Convert (→ the Grain Exchange work) · the pool Wild (Wild survives as the Workshop’s dock effect and the flipped tiles’ Floor stops).

---

## 11. Destinations · family G

### 11A. The kontore (destination board)

| Destination | Gate | Value ⚙ | On-delivery benefit ⚙ | Majority (1 / 2 / 3) ⚙ |
|---|---|---|---|---|
| Bruges (Hub) | Q1 | +1 ★ | 2 goods (owner’s choice) | 4 / 2 / 0 |
| London (Steelyard) | Q2 | +1 ★ | a Privilege/Building (placed) OR a Specialist, free | 5 / 3 / 1 |
| Bergen (Bryggen) | Q2 | +1 ★ | free Reach (+1 presence) | 9 / 5 / 2 |
| Novgorod (Peterhof) | Q3 | scales: Q3·2 / Q4·4 / Q5·6 (floor 1) | refine — a maturing cask +1 age | 8 / 5 / 2 |

**Delivery = the printed value + the demand die the cask carries** — never less than 1★. Benefits resolve when gained, owner’s choice. 2p skips 2nd place; ties split.

### 11B. The Hall shelf board (v3.0-A)

A Hall Dispatch (free, no boat; a deployed Q2+ cask) claims any **open space on a shelf its effective quality reaches**: bank the **row ★** + the space’s **one printed honor** + mark it with a **cask cube**. All qualifying shelves full → the best row’s ★ anyway (no honor, no cube — never nothing).

| Shelf | Gate | Row ★ ⚙ | Printed spaces (one honor each) ⚙ |
|---|---|---|---|
| The High Board | Q5 | 8 *(v3.1 ⚙)* | unlock 1 Floor slot · +3★ · gain 1 Building (free, placed) |
| The Masters’ Shelf | Q4 | 6 *(v3.1 ⚙)* | gain 1 Specialist (free) · place 2 presence · age ALL vessels +1 |
| The Long Shelf | Q3 | 5 | place 1 presence · gain 1 recipe (free) · +3 goods · age a cask +2 |
| The Common Shelf | Q2 | 3 | +2 goods · +1 contract · age a cask +2 · +1G +1H · +2 goods |

Active spaces per shelf ≈ **n+1** ⚙ (bounded by the printed row). *(Guardrail: the Common Shelf stays goods/tempo only — never engine pieces.)*

---

## 12. The player board (×4)

```
┌──────────────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE          STORAGE ▢▢▢▢ ▢▢▢▢ (G/H, cap 8)     CONTRACTS ▣▣    │
│  THE FLOOR — ONE ROW (7 printed · slots 1–2 open · slot 1 vessel-only)│
│   F1 [cask+marker] F2 [cask/tile/flip] F3 ▒cover▒ F4 ▒cover▒          │
│   F5 ▒cover▒  F6 ▒cover▒  F7 ▒cover▒                                  │
│     a slot holds ONE of: maturing cask · seated Specialist · flip     │
│  RECIPES   ▤Gruit ▤Hopped  + export cards                             │
│  FLIGHT / UNLOCK STRIP  ▤Gruit ▤Hopped ▢ ▢ ▢ (▢ Jopenbier)           │
│    mark when BREWED (2nd+ = the next cover comes off, automatic)      │
│    flip when DELIVERED (scores the ladder)                            │
│  THE FLOOR turn — stay home: Age 3 ⚙ pool · every vessel cask’s       │
│              action · a Wild per flipped tile                         │
└──────────────────────────────────────────────────────────────────────┘
```

- **One Row (v3.1):** vessels, Specialists, and flips **compete for the same slots**. Slot 1 is
  printed vessel-only — a tile may never take your last brewing slot. Tiles are permanent;
  a cask frees its slot when it deploys.
- **The Floor (stay home):** instead of moving, run your board as the whole turn. Never tolled;
  a Floor with no live stop is not legal.
- **The Flight/unlock strip:** one space per beer type. **Brewed** (first time) = a mark; from
  the 2nd mark on, each **opens the next covered slot automatically**. **Delivered** = the
  second mark state; distinct beers delivered score the ladder (3→4 · 4→9 · 5→16 · 6→25 with
  Jopenbier).

## 13. Starting setup (per house)

| Item | Quantity | Source |
|---|---|---|
| Starting goods | 3 `G` + 2 `H` | from supply |
| Starting recipes | Gruit + Hopped | printed on the board |
| Open Floor slots | 2 (of 7 printed; covers on 3–7; slot 1 vessel-only) | board + covers |
| Charter contracts | 2 | from supply |
| Ready Gruit in V1 | 1 | cask supply (mark its Flight space brewed) |
| Worker placement | 1 | any station, free (no toll) |

Shared setup: 2 hulls dealt onto slots (incl. a guaranteed Hulk→Bruges); **2 neutral green works** dealt onto open slots (no owner; overbuilt = discarded); ship market 3; Wharf display 4; Specialist display 4 (deck `n−1` × 7); export draft 3 of 4; the Hall shelf board out (n+1 spaces active); Sailed-Ships length set (§14).

---

## 14. Box footprint (base game)

| Family | Count ⚙ | Designs |
|---|---|---|
| Boards | 4 kinds (1 Wharf · 1 destinations · 1 Hall shelf · 4 player · 1 Market & Stores) | — |
| Casks (A) | 62 | 6 beers |
| Hulls (B) | 20 | 2 hulls × 4 destinations |
| Slot tiles (C) | 27 | 21 designs (12 blue + 15 green tiles) |
| Recipes (D) | 16 cards | 4 exports × 4 |
| Specialists (E) | 21 | 7 |
| Charter contracts | 20 cards | 1 |
| Goods cubes | ~100 (60 `G` + 40 `H`) | 2 |
| Demand dice | 8 (d6) | 1 |
| +1Q markers | 6 | 1 |
| Worker pawns | 4 | 4 colours |
| Presence discs | 48 (12 / colour) | 4 colours |
| Cask cubes | 32 (8 / colour) | 4 colours |
| Owner frames | 24 (6 / colour) | 4 colours |
| Unlock covers | 20 (5 / colour) | 1 design |
| Maturation markers | 20 (5 / colour) ⚙ | 1 design |
| Sailed-Ships track | 7 / 10 / 13 cells for 2 / 3 / 4 p (v3.1: 2p 6→7; printed 15 with END marks) | — |

**Pace dial:** the Sailed-Ships track is primary (MAX_ROUND ≈ 25 the backstop). Strong-play corpus (162 games, `playtests/logs/v3-corpus/`): 158/162 clock endings, rounds 17–19.

---

## 15. Expansion add-ons (three opt-in toggles, mix freely)

The base box is byte-identical when all three are off.

### 15A. Specialty Beers — adds to families A, C, D

Adds 3 specialty beers to the export draft (deal 3 of 7; ≥1 base Q4+ guaranteed). Each **pinned** + one always-on signature.

| Quality | Beer (town) | Brew ⚙ | Matures | Pinned act | Signature | Qty ⚙ |
|---|---|---|---|---|---|---|
| Q2 | Gose (Goslar) | `G G` | 1 | Gain 2 goods | Salt Trade — kontor delivery: owner +1 `G` +1 `H` | 8 |
| Q3 | Zerbster (Zerbst) | `H H H` | 1 | Load 1 cask | Parti-Gyle — brewing also racks a free Gruit | 6 |
| Q2 | Duckstein (Königslutter) | `G H` | 2 | Place 1 presence | Smoke-Hardy — ships & scores +1 quality | 8 |

Recipe buys ⚙: Gose `1 G` · Zerbster `1 H` · Duckstein `1 G`.

**Adds 3 thematic slot tiles** (deck only when on): **Salt House** (blue — *Your cask departs: +1G +1H*, `2 G`, ×1) · **Smoke Kiln** (green — *Cask ships +1 quality (max Q5)*, `2 G`, ×1) · **Parti-Gyle Tun** (green — *Deploy here: a free Gruit to a vessel*, `2 G`, ×1).
**Also adds Blending** — a Cellar or-branch: two Ready vessel casks → one premium cask at +1 quality (cap Q5). No new component ⚙ (carrier: gap §17.10).

### 15B. Jopenbier capstone (independent toggle)

| Quality | Beer (town) | Brew ⚙ | Matures | Pinned act | Always acquirable | Qty ⚙ |
|---|---|---|---|---|---|---|
| Q6 (display) | Jopenbier (Danzig) | `G G H H H H` | 4 | Gain 2 goods | yes (not in draft) | 6 |

Scored **self-contained**: 8★ kontor / 9★ Hall (any shelf), **+1★ per owner-turn deployed (cap +5)**. **Counts for the Flight** (6 types → 6→25) and grants a Flight unlock when brewed. Recipe buy ⚙ `1 G 1 H`.

### 15C. The Trade Roads — Overland (replaces the kontor majorities)

| Component | Qty ⚙ | Notes |
|---|---|---|
| Overland network board | 1 | Tree rooted at Hamburg. West → Bruges → London / Bergen / Rhineland; East → Novgorod. |
| Sailed-Ships track | +2 cells | 9 / 12 / 15 per count. |

Majorities turn OFF (the contest moves inland). Movement per voyage (one node per owner, quality-gated); each cask aboard claims a printed **Staple-Right slot** in load order; never-nothing overflow; the **Rhine Charter** (a Q4+ kontor Dispatch skips Bruges → Cologne). Node/slot tables unchanged from v2.9 (`archive/v2.9/COMPONENTS.md` §15C) except: Frankfurt’s *free Enshrine* = a free **Hall Dispatch** (the shelf board applies); London’s *free Improvement* = a free **Specialist**; the re-homed Reach stays a road step.

---

## 16. Cross-references

- **Why the family is shaped this way** — `DESIGN.md` §6 (architecture) · §9 (change log) · `V3-PATH-A.md` (the ruled plan + as-built notes).
- **How a tile is used during a turn** — `RULES.md` §2–§8.
- **The live numbers** — `play.html` (constants: `STYLES`, `DEST`, `HALL_SHELVES`, `BUILDINGS`, `IMPROVEMENTS`, `CASK_ACT`, `SAILED_CAP`, `MAX_ROUND`).
- **Printed cut sheets** — **`printables2.html` (the card kit — the only kit in use)**. `printables.html` (the tile kit) is retired. Printables generate from this doc, never the reverse.

---

## 17. Known component gaps (refreshed 2026-07-12 · v3.1)

> Standing rule: **all game state must live in the components on the table.**

| # | Gap | State it must carry | Sketch of a fix |
|---|---|---|---|
| 1 | **Maturation markers** — now manifested (§4, ×4/colour); the kit must print them | each maturing cask’s step | punch 5 small markers per colour |
| 2 | ~~Flight strip~~ **superseded (v3.0-A)** — the strip is now the brewed/delivered two-state unlock track; the kit needs the two mark states legible | brewed vs delivered marks | chit face-up = brewed · flipped = delivered ⚙ |
| 3 | ~~Loaded-cargo procedure~~ **FIXED (v3.0-A)** — the hull carrier: berth wells hold cube + die + marker; the cask card waits in the owner’s manifest row | a ship’s cargo + load order | shipped in the carrier design |
| 4 | **Jopenbier vintage counter** — nothing tracks the deployed capstone’s +1★/turn (0–5) | the vintage count | print a 0–5 strip on the Jopenbier card + a cube |
| 5 | **Unlock-cover fit** — the covers must sit stably on the printed row slots | locked/open slots | punchboard squares sized to the slot ⚙ |
| 6 | **Hall cube supply** — 8 cask cubes per colour serve berths AND shelf claims; worst-case check at 4p | shelf claims + loaded berths | count check at the table; +2 cubes if tight |
| 7 | **Recipe-card model** — 16 export cards + printed starters (adopted from the kits) | — | done; keep in sync |
| 8 | **Owner frames** — confirmed direction; 6/colour in §4 | slot-tile ownership | shipped in printables2 |
| 9 | **Blend’s +1 quality** (Specialty Beers) — carrier for a blended cask’s raised quality; the 6 markers are claimed by the kilns | a blended cask’s quality | more +1Q markers ⚙, or print-side rule |
| 10 | **Demand dice supply (8)** — unverified worst case (max simultaneous loaded berths with dies) | dice riding berths | count check at the table |
