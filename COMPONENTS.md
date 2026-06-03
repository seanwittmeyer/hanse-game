# Brewhouse of the Hanse — Components & Tile Deck (v0.1 draft)

> First-pass manifest derived from the locked architecture in `DESIGN.md` (§19). **All counts and values are placeholders for balancing** — the goal here is to enumerate *what objects exist and what each does*, not to be balanced yet. Anything marked ⚙ is a tuning dial; anything marked ❓ is an open question.

---

## 1. Boards

| Component | Qty | Purpose |
|---|---|---|
| **Main board** | 1 | The 2×2 action grid — **A Market · B Harbor · C Kontor · D Brewhouse** (build×cash-out diagonals: Market+Brewhouse build, Harbor+Kontor cash out) — the 8 perimeter slots, and the Kontor stack area. |
| **Harbor / Route board** | 1 | Home port + four routes radiating to the kontore through waypoints; presence spaces; per-route value tracks; per-kontor majority & standing tracks. May be one board with the main board or a separate panel. ❓ |
| **Player tableau boards** | 5 | Each: the **brewing track** (LOAD → FERMENT → AGE → READY), **vessel lanes** (start 1, cap 3), **room/upgrade slots** (4), the **recipe book**, the **VP-token bin**, goods storage, and the printed **Larder** (Market twin) + **Quay** (Harbor twin). |
| **Type value track** | 1 | A linear value track with **one marker per beer type** — every sale (ship *or* enshrine) mints VP tokens equal to that type's current position, then the marker ticks down (saturation). Doubles as the type-frontier display. |
| **Scoring track** | 1 | Standing/score margin track (around the route board or its own strip). |

### Perimeter slots
- **8 live slots, all open** (the old "scoring-pile variant" that darkened s4/s5 assumed a *passive* score pile; the Kontor is now a stood-on action cell, so all 8 stay live). **2-player locks some down to ~6** to tighten placement competition. Slots hold a **churning mix of ships** (fill → sail away) and **route lanes** (permanent value) — *not* casks (casks are cargo inside ships) and *not* recipes (recipes go to your private book).

---

## 2. Tokens & player bits

| Component | Qty (⚙) | Notes |
|---|---|---|
| **Grain cubes** | ~60 | Brewing input #1; medium of exchange (tolls). |
| **Hops cubes** | ~40 | Brewing input #2; required for *hopped* (enshrine-able) beer. |
| **Worker pawns** | 1 / player | The grid worker. |
| **Presence markers** | ~20 / player color | Placed on routes = reach. |
| **Standing markers** | ~10 / player color | Track value banked on per-kontor standing tracks. |
| **Majority markers** | per kontor | Resolve route majorities. |
| **VP tokens** | ~60 | The spendable 3rd resource (§A′ in `TILES.md`). Minted on every sale, scaled by the type's value-track position; banked **1 VP each** at end (spend sinks ⚙). Not subject to the goods storage cap. |
| **Value-track markers** | 1 / type | Sit on the type value track; tick down as a type saturates. |
| **First-player / round marker** | 1 | Turn order / round clock. |
| **Empty barrels** | deferred ❓ | Optional capacity constraint (Vinhos-style) — held for later. |

> **Casks are *not* a generic token** — each cask is a tile (the dual-role hero, §3-A). You don't draw casks; you brew them.

---

## 3. The Tile Deck

Seven tile families. Families A–C are the content heart; D–G are the engine/economy layer.

### A. Cask tiles — the dual-role hero (brewing deck)
Double-sided. **Cargo face** (loaded into a ship = *reach*): type + **quality value** + the markets it can satisfy. **Standing face** (enshrined in the Kontor stack = *standing*): standing value + a **goal** (the cycled goal-matching DNA) + a small Kontor action. Brewed from a *recipe in your private book*, matured on the brewing track, then a ready cask either **ships** (cargo → reach) or **enshrines** (standing) — never both. *(Recipes are **collected from the Market straight into your book** and brewed from there — not slot tiles. Supply is gated by the current type frontier.)*

Beer is **two layers — type + recipe** (`TILES.md` §A): a **type** is a global quality rung; a **recipe** is a collected instance of a type with its own cost profile. The ladder is **anchored spine + variable summit** — **L1 Gruit → L2 Hopped** is fixed and historical (hops is the preservation tech that opens the sea routes), and **L3–L5 are dealt each game** from the historical Hanse summit roster.

| Level | Type | Quality ⚙ | Inputs ⚙ | Brew steps | Enshrine? | Base standing ⚙ | Qty ⚙ |
|---|---|---|---|---|---|---|---|
| **L1** | **Gruit Ale** | 1 | grain | 2 (skips AGE) | ❌ (perishable) | — | ~16 |
| **L2** | **Hopped Beer** | 2 | grain + hops | 3 | ✅ | 3 | ~20 |
| **L3** | *summit ⚙* | 3 | grain + hops×2 | 3 | ✅ | 5 | ~12 |
| **L4** | *summit ⚙* | 4 | grain×2 + hops×2 | 4 | ✅ | 7 | ~8 |
| **L5** | *summit ⚙* | 5 | premium; needs Aging Cellar room | 5 | ✅ (rare, big) | 10 | ~4 |

> **Summit roster (dealt to L3–L5 in variable order each game) ⚙:** real Hanse export beers — **Bock** (Einbeck), **Mumme** (Braunschweig), **Broyhan** (Hannover), **Keut** (Low Countries). Each carries a light mechanical hook (e.g. the top rung needs the Aging Cellar). Reskins the anachronistic *Dubbel/Tripel* placeholders.

*Gruit is the commodity workhorse for early reach; the summit types are scarce, slow, and the standing engine.*

### B. Route tiles — perimeter-slot infrastructure (the scoring landscape)
Placed in a perimeter slot (committed to row XOR column). Two jobs: **(1)** raise that route's end-game value on the Harbor board; **(2)** modify the Harbor line when fired (e.g., +1 ship step / +1 cargo toward that kontor). Owned & taxable when a rival fires the line.

| Route | Flavor | Value tiers ⚙ | Qty ⚙ |
|---|---|---|---|
| **Bergen (Monopoly)** | short/narrow; control locks a resource/toll | +2 / +3 | ~5 |
| **Novgorod (Long Haul)** | longest; highest payout; demands high quality | +3 / +4 / +5 | ~6 |
| **Bruges (Hub)** | wide; many small payoffs; takes middling quality | +1 / +2 | ~7 |
| **London (Steelyard)** | pays in privilege tiles | +2 / +privilege | ~5 |

### C. Ship tiles — owned, route-bound cargo containers
A slot tile with a stack of cask sub-slots, **bound to one route** when placed. Casks shipped to that route (by anyone) **load aboard** — rivals pay the owner a **toll**; when full the ship **sails** (owner dividend) and frees its slot. Its own line-action loads the owner's ready casks. Owned & taxable — the toll-baron play.
- **Cog** (cargo cap 3) · **Hulk** (cap 4) · **Toll Exemption** (ignore one toll/skim) · **Pilot** (ignore a waypoint cost). ~12 total ⚙.

### C′. Recipe tiles — your private book (collected, not slotted)
Recipes are a **private book**, not slot tiles. Gruit is the universal baseline (always in the book). Every other recipe is **collected from the Market display straight into your book** and brewed from there; the Market's recipe supply is gated by the current **type frontier**. Each recipe names a **type** and carries its **own cost profile** (`n G · n H · n brew-steps`) — two recipes of the same type can cost differently, so *which recipes you draw* is your engine's shape. ~14 total ⚙.

### D. Privilege tiles — Steelyard rewards / engine perks
Gained mainly via the **London** route. Ongoing or one-shot: market discount, free brew-track advance, extra worker move, skim immunity, draw bonus. ~12 ⚙. ❓ slot-resident vs tableau-resident.

### E. Room / Upgrade tiles — tableau engine
Installed into tableau room slots; this is where **depth** lives.
- **Extra Vessel** (parallel brewing capacity) · **Faster Fermenter** (auto-advance FERMENT) · **Aging Cellar** (shortens AGE; unlocks Barrel-aged) · **Warehouse** (goods/cask storage) · **Larder** (upgrades Market trickle) · **Quay** (upgrades Harbor trickle) · **Counting-house** (enshrine/standing bonus) · **Cooperage** (barrel capacity, if barrels adopted). ~3 each, ~24 ⚙.

### F. Public Kontor tiles — the shared stack
Strong **public** actions seeded into / added to the shared Kontor stack, interleaved with players' personal enshrined casks. Whichever is on top defines the current Kontor action; enshrining buries it.
- Examples: "*Enshrine +1 standing*", "*Draw 2 recipes*", "*Advance any one brew*", "*Place 1 presence free*", "*Convert grain↔hops*". ~12–16 ⚙.

### G. Starting / setup tiles
Per player: printed **Larder + Quay** twins (on the tableau), the **Gruit baseline + 2 random premium recipes** in the book, **3 `G` · 2 `H`**, **0 VP tokens**. Asymmetric starting brewing-house tiles are a possible variant. ❓

---

## 4. Approximate box footprint

- **2 main boards** (grid + route) · **5 tableau boards**
- **~7 tile families**, on the order of **~150–180 tiles** total (v0.1 estimate ⚙)
- **~100 wooden cubes** (grain/hops) · **~150 player markers** (presence/standing) · **5 workers**

This lands the game in **mid-heavy "Brass-footprint"** territory (per the §19 ambition-tier discussion) — substantial but not a Lacerda-scale component sprawl.

---

## 5. Resolved & still-open

**Resolved (now canonical — see `DESIGN.md` §19, `RULES.md`, `TILES.md`):**
- **Perimeter slots = 8, all open** (2p locks to ~6).
- **Recipe ≠ cask.** A recipe is collected into your **private book**; you brew from it; the cask is the brewed output. Lifecycle: collect recipe → brew → **ship (reach)** *or* **enshrine (standing)**.
- **Goal-matching DNA stays** on the cask standing face — now a **3-way cycle, best-3 score** (`TILES.md` §A).
- **Quality scale 1–5** (the type ladder; Gruit→Hopped fixed, L3–L5 a variable summit).

**Still open ⚙ / ❓:**
1. **Privilege & room tiles:** acquired only at Market, or via their thematic source (London for privileges, a "build" action for rooms)?
2. **Public Kontor stack seeding** — how many public tiles start the stack, and who controls adding them? (Engine seeds 2.)
3. **Type-frontier advance threshold** — how many league sales flip a tier; **value-track length & step**; **VP-token spend sinks** (tokens currently bank-only).
4. **Summit roster per-beer hooks** — the exact mechanical twist each historical beer carries.
