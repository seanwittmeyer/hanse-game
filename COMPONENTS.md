# Brewhouses of the Hanse — Components, Tiles & Player Board (v0.9 — "The Wharf")

> The single physical-manifest for the game: **boards · tokens · the five tile families · the player brewery board · destinations · goals.** Enumerates *what objects exist and what each does* — the **why** lives in `DESIGN.md` (§21), the **operational rules** in `RULES.md`. **Every count/value is a placeholder ⚙;** ❓ is open.
>
> *(This file absorbs the former `TILES.md` and `PLAYERBOARD.md` — one lean manifest instead of three overlapping ones.)*
>
> **The Wharf in one breath:** the game happens at **the Wharf** — four stations (**Source → Brew → Age → Ship**) ringed by 8 slots. A cask is a **dual-role action-tile** that matures privately, sits on a shared **slot** as a public **action-building**, then **ships to a destination** for points and leaves. **v0.10:** every kontor pays a big tiered/ranked majority (Bruges 5/3/0 · London 6/4/2 · Novgorod 8/5/2 · **Bergen 10/6/3** the anchor), with low per-cask delivery values and the Hall a printed prestige ladder (**5/7/10/12**) to balance the kontore-vs-prestige tilt; Bergen normalized to give goods. **v0.9:** the **London = engine** identity, tiered majorities, and **seat compensation**. Squarely *Great Western Trail* footprint, not Lacerda.

---

## 0. Conventions

- **Goods:** `G` = grain, `H` = hops. The **only** currency (no money; no spendable prestige).
- **Faces:** infrastructure is single-face. **Casks are single working face** (type · quality · signature action) — a cask is **scored at its destination**, never flipped.
- **The fire rule (one rule for all slots):** when a line is activated, the active player **may use each building in its two slots** — a **cask** (its signature action), a **ship** (a free load), or a **neutral building** (its base action). All resolve **on the active player's turn** — **no out-of-turn skims.** Cask & neutral actions are **free and public**.
- **Acquisition (Market):** **recipes & ships** are an *always-available* supply; **upgrades** sit in a small **face-up display** (~4 ⚙ drawn from a shuffled Upgrade supply, refilling as taken) and are **earned only by delivering to London / Novgorod** (v0.12.3 — no goods-buy), so what you can grab depends on what is face-up *and* on reaching those kontore. Casks are the exception — you **brew** them from a recipe you hold.
- **The lean (volume vs prestige) is a destination choice,** not a track: ship to a **kontor** for trade value + majorities, or to the **Hall** for prestige. Coupled by shared casks, scarce slots, scarce ships, and the one shared end clock.
- **End clock:** the **Sailed-Ships track fills** → finish the round → score.

---

## 1. Boards

| Component | Qty | Purpose |
|---|---|---|
| **Main board** | 1 | **The Wharf** — a 2×2 of four stations **A Market (Source) · B Brewhouse (Brew) · D Cellar (Age) · C Harbor (Ship)** ringed by **8 slots** (deployed casks, neutral ships, seeded neutral buildings), plus the shared **Sailed-Ships track** (the end clock — advanced by a **marker**, one step per voyage) with the **charter-fare row** printed beneath it ⚙. |
| **Destination / Route board** | 1 | The four **kontore** (Bruges · London · Bergen · Novgorod) and the **Hall**, each with its **quality gate**, **delivery value**, **benefit**, and (kontore) a **majority track**. Delivered cask tiles sit at their destination; this is where volume (kontore) and prestige (the Hall) are tallied. |
| **Player brewery boards** | 5 | Each private & untouchable — vessels + maturation + recipes + upgrades + storage. The *noun* the Wharf's actions act on (full spec in §4). |

### The slots — the ring around the stations (8 slots)
- **8 live slots, 2 beside each line** (**2-player may lock some to ~6 ⚙**). They hold a **churning mix**: **deployed casks** (your Ready casks = public action-buildings + cargo-in-waiting; they leave when shipped), **ships** (neutral destination-bound hulls from the shared deck; they sail away and return to the deck), and **2–3 neutral buildings** (shared base actions, seeded at setup — **spread with the two warm-start ships across different lines** so no single line is the obvious opening camp ⚙). **One fire rule** (§0). Recipes and upgrades are **not** slot tiles (they live on your brewery board).

---

## 2. Tokens & player bits

| Component | Qty (⚙) | Notes |
|---|---|---|
| **Grain cubes** | ~60 | Brewing input #1; the medium of exchange. |
| **Hops cubes** | ~40 | Brewing input #2; needed for Hopped & the export (the beer that travels). |
| **Worker pawns** | 1 / player | The worker you move between stations. |
| **Ownership discs** | ~20 / player color | Mark a cask's owner once it sits on a **slot** or is **delivered** (casks are a shared-pool tile, so ownership is by disc). |
| **First-player / round marker** | 1 | Turn order (fixed all game) / round clock. |

> **No VP tokens, no standing markers, no demand-market markers, no aging cubes** (all retired). Score is tallied at game end from delivered casks + majorities + goals — no running points track beyond the **Sailed-Ships** end clock.

> **Casks are a shared supply with fixed global counts** (L1×16 · L2×20 · L3×12 · L4×8 · L5×4 ⚙) drawn from by all players — you **brew** them (never buy), so the rare export casks are a **contested** resource. A player's cap is "what's left to brew." Ownership is a disc once a cask hits the slots.

---

## 3. The tile families

Five tile families + the destination board + goals. **Casks (A) are the content heart; the rest is the lean economy around them.** No card deck (recipes are plain permission tiles).

### A. Cask tiles — the dual-role hero (~60 tiles, shared supply)
A cask carries: **`TYPE` · `QUALITY` (Q1–Q5, printed, static) · one `SIGNATURE ACTION`.** Three states (`RULES.md` §2): **maturing** (private vessel, ages to Ready) → **on a slot** (cargo-in-waiting + private inventory + a **public action-building** whose action fires when its line runs) → **delivered** (shipped → scores for its owner → leaves). Shipping converts it; only casks on slots are public/contestable.

| Level | Type | Q | Brew inputs ⚙ | Maturation ⚙ | Signature slot action ⚙ | Reaches (gate) | Qty |
|---|---|---|---|---|---|---|---|
| **L1** | **Gruit Ale** | 1 | `G` | 1 step | **Source — +2 goods** *(fixed ⚙ v0.12.2)* | Bruges only | 16 |
| **L2** | **Hopped Beer** | 2 | `G H` | 2 | *drawn at brew* (pool below) | Bruges · London · Bergen · Hall | 20 |
| **L3** | **Broyhan / Keut** | 3 | `G H H` / `G G H` | 2 | *drawn at brew* | + Novgorod | 12 |
| **L4** | **Mumme** | 4 | `G G H H` | 3 | *drawn at brew* | all | 8 |
| **L5** | **Bock** | 5 | premium; needs **Aging Cellar** | 3 | *drawn at brew* (**Wild** possible — Q4+) | all | 4 |

> **Export beers — fixed quality; deal 3 of 4 each game ⚙:** **Broyhan** (Q3, `G H H`) · **Keut** (Q3, `G G H`, a costlier-in-grain alt) · **Mumme** (Q4, Braunschweig) · **Bock** (Q5, Einbeck — needs the Aging Cellar). One is left undealt each game, so the **ladder shape varies**: drop a Q3 → the full Q3→Q4→Q5 climb; drop **Mumme** → no Q4; drop **Bock** → no Q5. Each cask's **signature slot-action is drawn at brew** (v0.12 — from the pool below; **Wild** only for Q4+), **decoupled from the beer/quality** — *except* **Gruit, which is pinned to Source** (v0.12.2). The fixed on-ramp is **Gruit → Hopped**.

*Gruit is the cheap, fast workhorse — it keeps your goods flowing (its Source action) and reaches Bruges, but never makes prestige. The export casks are scarce, slow, and the key to the rich destinations — the Leffe/Westvleteren line drawn in the components.*

### B. Ship tiles — NEUTRAL, destination-bound shared hulls (the ship deck, ~20 tiles ⚙ — v0.11)
**Nobody owns a ship.** Each tile is **printed** with its hull and **destination** (inheriting that destination's quality minimum). A shuffled **ship deck** sits by the Market with a **face-up display of 3 ⚙** (refilled from the deck as taken); **2 more are dealt to slots at setup** — a **guaranteed Hulk → Bruges** + 1 random ⚙ (the Gruit on-ramp always has a hull). **Commission** (Market, `2 G` ⚙): place **any one of the 3** face-up ships on an open slot **and free-load one of your Ready casks** (slot *or* vessel) aboard — the commissioner's berth. **Load any cask — yours or a rival's** (v0.12: you choose the destination; the owner scores it + banks the benefit, you take a `1 G` loader bonus). **The destination's immediate benefit is paid the moment a cask is LOADED** (`v0.11.2`): **Bruges/Bergen → 2 goods · London/Novgorod → an Upgrade · Hall → none**. The cask's **points** (value ★ + majority) seal only on **delivery** (when the hull sails). **Filling earns no bonus**; any player with a cask aboard may **launch it early**. The voyage **advances the Sailed-Ships marker**, and the **hull returns to the bottom of the deck**. *(The old "ship a rival's cask" rule is cut — v0.11.)*

| Ship | Capacity | Commission ⚙ | In deck ⚙ |
|---|---|---|---|
| **Cog** | 2 | `2 G` | ~8 |
| **Hulk** | 3 | `2 G` | ~6 |
| **Charter** *(no tile — an outside hull)* | 1 | **the fare row under the Sailed-Ships track** ⚙ (`2–5 G` by track position) | — |

> Owning ships is the merchant fantasy: build the infrastructure, choose its destination, and a full Hulk is a 3-cask burst — still just **one** Sailed-Ships slot, so the clock stays smooth.
>
> **Charter** is the Harbor's always-available relief valve (`RULES.md` §5): pay the **charter fare — a shared market price printed under the Sailed-Ships track** (indexed by voyages delivered; per-count rows ⚙, e.g. 2p `2·2·3·2·2·4·5·5`, max `5 G`) to ship **one** Ready cask (vessel *or* slot) on an immediate single-cask voyage — it delivers and consumes one Sailed-Ships slot. **Strictly worse per cask** than filling a shared Cog/Hulk, so it never displaces the ships; it exists so the tight slots can't deadlock. No tile, no qty — just an action.

### C. Neutral building tiles — the shared base, seeded on the slots (6 designs, 2–3 in play ⚙)
Placed in perimeter slots **at setup** (shared, permanent). They keep the slots alive from turn 1 — whoever runs their line may use the action, free. The "everyone has the base; your casks/ships are the better versions" floor (the *GWT* neutral-building idea).

| Neutral building | Action (active player) ⚙ |
|---|---|
| **Market Stall** | take 1 good |
| **Cooper** | age one of your casks 1 step |
| **Crane** | load one Ready cask onto a ship, free |
| **Counting-House** | convert up to 2 goods `G↔H` |
| **Towncrier** | pay **1 `G`** ⚙ to draw a goal from the face-up supply (**hand cap 4** ⚙); at the cap, **gain 1 good** instead |
| **Almshouse** | +1 presence at a kontor you already lead |

### D. Recipe tiles — permission to brew a type (4 export designs × 1/player = 20 cards ⚙; Gruit + Hopped print on the board)
A small face-up Market supply. A recipe is **only** *a brewable type + its `G/H` cost* (the v0.6 on-collect boons and frontier-gating are **cut**). Acquired at the **Market**; **permanent** (brewing never consumes it). *(Physical form: **cards** that tuck under the brewery board's bottom edge — the title + brew cost stay visible; the supply is uncontested ⚙, so one copy per player covers the worst case. See `printables.html`.)*

| Recipe | Type | Buy cost ⚙ | Brew cost ⚙ |
|---|---|---|---|
| *(start, printed)* | **Gruit** | — | `G` |
| *(start, printed)* | **Hopped** | — | `G H` |
| **Broyhan** | Q3 export | `1 G` | `G H H` |
| **Keut** | Q3 export | `1 G` | `G G H` |
| **Mumme** | Q4 export | `1 G 1 H` | `G G H H` |
| **Bock** | Q5 export | `2 G` | premium (needs Aging Cellar) |

> Start: **Gruit + Hopped** (fixed, symmetric — everyone brews turn 1, and *gaining an export recipe means more*). **All four export recipes print**, but **only 3 of the 4 are dealt** into any game — the buyable export set this game is those three. ❓ light hand limit.

### E. Upgrade tiles — the private brewery engine (Rooms + Modifiers, ~24 ⚙)
Installed on your brewery board. **Earned only by delivering** (the **London / Novgorod** benefits — Bruges & Bergen hand you goods instead) — **no goods-buy (v0.12.3)**, so the cycle **deliver → upgrade → brew better → deliver better** is the *only* path to upgrades, and the two upgrade-kontore are the essential engine route.

**Rooms (permanent capability)**
| Room | Effect ⚙ | Buy ⚙ |
|---|---|---|
| **Extra Vessel** | +1 brewing lane (start 2, cap 4) — repeatable | `5 G` |
| **Aging Cellar** | maturation −1 step; **unlocks the L5 export (Bock)** | `5 G` |
| **Warehouse** | goods storage 8 → 12 | `4 G` |
| **Quay** | load **2 casks** in one Harbor visit | `5 G` |
| **Cooperage** | **+1 cask loaded** per Harbor visit (stacks with Quay) | `4 G` |

**Modifiers (asymmetric perks — these subsume v0.6's Privileges)**
| Modifier | Effect ⚙ | Buy ⚙ |
|---|---|---|
| **Granary Right** | when you gain grain, +1 extra | `4 G` |
| **Hop Garden** | when you gain hops, +1 extra | `4 G` |
| **Royal Patent** | your **charter fare is 1 `G` cheaper** (min 1) | `4 G` |
| **Staple Right** | +1 good when you deliver to a kontor | `5 G` |
| **Guild Seat** | +1 age point at the Cellar | `4 G` |
| **Burgher Status** | +1 presence at every kontor you reach (majority help) | `5 G` |

> Supply ~2 copies of each — except **Extra Vessel** (the repeatable one): **players + 1 copies ⚙** (so 6 in the box for 5p, matching `play.html`) — so an upgrade can be **contested**.

### F. Destinations — *where you ship is the lean* (the destination board)
All **open from the start**. Differentiated by a **quality gate** (the climb-limiter — better places want better beer) and a unique **benefit / majority**. **The cask's owner always scores the delivery and takes any offered benefit.**

| Destination | Gate ⚙ | Per-cask value ⚙ | Majority — 1st/2nd/3rd ⚙ | Benefit on delivery ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | **+1** | **5 / 3 / 0** | **liquidity** — gain 2 goods |
| **London** (Steelyard) | Q2 | **+2** | **6 / 4 / 2** | **the engine** — take an Upgrade from the display |
| **Bergen** (Bryggen) | Q2 | **+2** | **richest 10 / 6 / 3** | **liquidity** — gain 2 goods (token); the **majority is its draw** |
| **Novgorod** (Long Haul) | Q3 | **+4** | rich **8 / 5 / 2** | premium — top value **+ take an Upgrade** |
| **The Hall** (Prestige) | Q2 | **printed ladder by quality: Q2→5 · Q3→7 · Q4→10 · Q5→12** ⚙ | — | out of commerce — the scarcity/Westvleteren payout |

> **The majority is a big end-game motivator — tiered & ranked (Lacerda-style) at every kontor:** 1st/2nd/3rd by delivered-cask count take the kontor's tiers; **2-player games skip 2nd** (winner-take-all); ties split the occupied tiers ⚙. **Bruges 5/3/0 · London 6/4/2 · Novgorod 8/5/2 · Bergen 10/6/3** ⚙ — **Bergen is the rich anchor** (its token goods benefit is offset by the biggest majority); Novgorod rides high for its hard Q3 reach. **Per-cask delivery value is deliberately low** so the points live in the majority race; this tilts scoring toward the kontore, so the **Hall's prestige ladder (5/7/10/12 by quality)** keeps the volume-vs-prestige axis balanced (sim-validated near fair at 2–5p, `DESIGN.md` §21 v0.10). **Benefits pair off:** Bruges & **Bergen** give **goods** (liquidity); **London** (engine) & Novgorod give an **Upgrade**. Delivery value is **flat per kontor for Q1–Q3**; the **export premium ⚙ (v0.11 Batch A3)** adds **+1 for a Q4 cask, +2 for a Q5**, at any kontor (the Hall scales with Q throughout) — the climb pays on the same voyage that builds majorities. *Because presence = cask count, majorities reward shipping **wide** — "go for majorities" is a volume play, not a separate concentrate-on-one strategy.*

### G. Goal / objective tiles — the variety layer (9 designs × 2 copies = 18 in box ⚙; deal 3 per player, best 2 score)
A small pool of **9 designs** rewarding different shapes, so the winning engine varies by game (the *GWT* blend ideal). **Two copies of each print ⚙** — dealing 3 per player needs 15 tiles at 5p, and `play.html` deals duplicates across players freely. **Deal 3 per player; hand cap 4 ⚙ (the Towncrier adds at most one, for a 1 `G` fee); your best 2 score** ⚙ (keeps goals ~⅓ of a score, not the game); authored so a one-note rush fills few of them. *(v0.11 Batch A1 — free unlimited draws let playtesters bank 6+ goals.)*

| # | Goal (end-game) ⚙ | Pulls you toward |
|---|---|---|
| 1 | +X per **distinct type** delivered | breadth / climb |
| 2 | +X per cask delivered to **one** kontor | focus / majority |
| 3 | +X per **Q3+** cask delivered | the export |
| 4 | +X per **ship you commissioned** | the merchant engine |
| 5 | +X per cask shipped to the **Hall** | prestige |
| 6 | +X per **kontor where you hold presence** | spread |
| 7 | +X per **Upgrade** on your brewery | engine depth |
| 8 | +X per **majority** you hold | commitment |
| 9 | +X flat | safe / scarcity |

---

## 4. The player board — the private brewery

Symmetric for all players (except seat compensation, below). The stations are the **actions** (Source → Brew → Age → Ship); the brewery is the **noun** they act on — your kettles and cellar. **Nothing here is contestable** — rivals can only act on your casks once they're on a slot.

```
┌──────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE crest        STORAGE ▢▢▢▢ ▢▢▢▢  (G/H, cap 8)         │
│                                                                │
│  VESSELS  (brewing throughput — start 2, cap 4)                │
│   Vessel 1  [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ slots ]     │
│   Vessel 2  [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ slots ]     │
│   Vessel 3  ▒▒ locked — add an Extra Vessel (upgrade) ▒▒       │
│   Vessel 4  ▒▒ locked — add an Extra Vessel (upgrade) ▒▒       │
│        (a cask ages 1/turn passively + via the Cellar)         │
│                                                                │
│  RECIPES  ▤Gruit ▤Hopped  ▤ ▤ …   (the types you may brew)     │
│                                                                │
│  UPGRADES  [ Room|Modifier ] [ ] [ ] [ ] …                     │
└──────────────────────────────────────────────────────────────┘
```
> A print-ready visual lives in `printables.html` → **Player Boards**; keep the two in sync.

- **Vessels & maturation (start 2, cap 4).** Two lanes open at start (parallel brewing from turn 1); lanes 3 & 4 unlock via **Extra Vessel**. A **Brew** loads a recipe into an open vessel at step 0; the cask **matures to Ready** — **+1 automatically each of your turns** (never depends on reaching a station) plus the **Cellar** pool ⚙. When Ready, **deploy it to an open slot** (free) — now it is public. **If the slots are full, the Ready cask clogs its vessel** until you free a slot or ship — the back-pressure that forces cash-outs.
- **Recipes.** A rack of the types you may brew — start **Gruit + Hopped** (always available), collect exports at the Market to climb. *Type + brew cost,* nothing more.
- **Upgrades.** **Rooms** (capability) + **Modifiers** (asymmetric perks) — §3E. The engine-building layer where strategies diverge; mostly earned by delivering. ❓ capped or open.
- **Storage.** Cap **8 goods** ⚙ (**Warehouse** +4). Overflow is lost — the cap contains rich-get-richer. `G`/`H` are the only currency.

### Starting setup (symmetric, except seat compensation)

| Item | Start ⚙ |
|---|---|
| Goods | **3 G, 2 H** — **+1 G per seat after the first** (P1…P5 → 3/4/4/4/4 G) ⚙, the seat balancer for fixed turn order |
| Recipes | **Gruit + Hopped** (fixed); more collected at the Market |
| Vessels | **2 open** (lanes 3–4 locked behind Extra Vessel) |
| Upgrades | none · Storage 8 |
| **Warm start** | **2 neutral ships dealt from the ship deck** to slots (a **ship market of 3** ⚙ face-up by the Market) **+ 1 Ready Gruit in a vessel** per player (deploy it turn 1) ⚙ — the Wharf is live and a first voyage is reachable turn 2–3 |
| Worker | placed turn 1 (free, no toll — `RULES.md` §1) |

> **Why mid-stream:** the pace model showed v0.6's first voyage at **turn 6** (goods-/geometry-bound), so v0.9+ starts you with 2 vessels, warm shared hulls + a Ready cask, all destinations open, base actions always usable. *Gaining an export recipe means more* because you start with only the on-ramp.

---

## 5. Box footprint — the reel-in, in numbers

| Family | Count ⚙ | Unique designs |
|---|---|---|
| A Casks | 60 | 5 types × actions |
| B Ships (the deck) | ~20 | 2 (Cog · Hulk) × destinations printed |
| C Neutral buildings | 6 in box (2–3 in play) | 6 |
| D Recipes (cards) | 20 (4 exports × 1/player) | 4 (+2 printed starts) |
| E Upgrades (Rooms + Modifiers) | 26 (Extra Vessel ×6, others ×2) | 11 |
| G Goals | 18 (9 designs ×2) | 9 |
| **Tile total** | **~123 + 20 recipe cards** | **~33 unique** |

Plus **1 main board · 1 destination board · 5 brewery boards**, **~100 wooden cubes** (grain/hops — or the printed 0.7″ tokens), **20 ownership discs / color**, **5 workers**, first-player + round markers. **No VP/standing/demand/aging tokens — and no majority markers** (the delivered-cask stacks + ownership discs *are* the standings; tiers pay out at scoring).  Squarely **medium *Great Western Trail* footprint** — substantial table presence, far short of a Lacerda sprawl (`DESIGN.md` §21A). *(The full print-and-cut manifest, with sheet references, is the checklist page of `printables.html`.)*

---

## 6. Resolved & still-open

**Resolved (canonical — see `DESIGN.md` §21, `RULES.md`):**
- **The Wharf = stations + slots;** stations never closed (occupancy toll only).
- **The cask = a dual-role action-tile** in three states (mature → slot → delivered); only casks on slots are public/contestable.
- **The slots = the ring** of casks + ships + seeded neutral buildings; one fire rule; no out-of-turn gains.
- **Value lives in destinations,** not two tracks: kontore (volume + big tiered majorities) vs the Hall (prestige). **v0.10:** every kontor pays a big majority (Bergen 10/6/3 the anchor), low per-cask values, Hall a printed prestige ladder (5/7/10/12); Bergen normalized to goods. **v0.9:** tiered/ranked majorities, **London = engine**, **seat compensation** +1 G per later seat.
- **Recipes are plain permission tiles;** Privileges fold into Upgrades/Modifiers; Fairs, lanes, the demand market, twins, and aging cubes are **cut**.

**Still open ⚙ / ❓:**
1. **Cask counts & maturation lengths** vs the Sailed-Ships clock — the joint pace dials.
2. **Destination values / gates / tiered-majority tiers** — the variety heart (v0.10 numbers sim-balanced; want a human playtest).
3. **Neutral-building set & count in play**, scaling by player count (ring pressure).
4. **Slot pressure** at 2p (lock slots?) and 5p (relief?); whether a clogged vessel is too punishing.
5. **Goals:** count, shared vs personal, best-few cap.
6. **The exact 4–5p seat-comp shape**, and whether London's engine identity needs a sharper mechanical pull beyond de-cloning.
