# Brewhouse of the Hanse — Components & Tile Deck (v0.1 draft)

> First-pass manifest derived from the locked architecture in `DESIGN.md` (§19). **All counts and values are placeholders for balancing** — the goal here is to enumerate *what objects exist and what each does*, not to be balanced yet. Anything marked ⚙ is a tuning dial; anything marked ❓ is an open question.

---

## 1. Boards

| Component | Qty | Purpose |
|---|---|---|
| **Main board** | 1 | The 2×2 action grid (A Market · B Brewhouse · C Harbor · D Kontor), the perimeter slots, and the Kontor stack area. |
| **Harbor / Route board** | 1 | Home port + four routes radiating to the kontore through waypoints; presence spaces; per-route value tracks; per-kontor majority & standing tracks. May be one board with the main board or a separate panel. ❓ |
| **Player tableau boards** | 5 | Each: the **brewing track** (LOAD → FERMENT → AGE → READY), **room/upgrade slots**, goods/cask storage, and printed starting **larder** (Market trickle) + **dock** (Harbor trickle). |
| **Scoring track** | 1 | Standing/score margin track (around the route board or its own strip). |

### Perimeter slots ❓
- The original "scoring-pile variant" darkened slots s4/s5 because D was a *passive* score pile. **D is now a stood-on action cell**, so this needs reconciling: likely **8 live slots** again, or keep 6 for board tension. *(Open — affects route/ship/privilege tile economy.)*

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
| **First-player / round marker** | 1 | Turn order / round clock. |
| **Empty barrels** | deferred ❓ | Optional capacity constraint (Vinhos-style) — held for later. |

> **Casks are *not* a generic token** — each cask is a tile (the dual-role hero, §3-A). You don't draw casks; you brew them.

---

## 3. The Tile Deck

Seven tile families. Families A–C are the content heart; D–G are the engine/economy layer.

### A. Cask tiles — the dual-role hero (brewing deck)
Double-sided. **Working face** (on the board = *reach*): style + **quality value** + the market demand it can satisfy. **Standing face** (enshrined in the Kontor stack = *standing*): standing value (+ optional goal/demand, carrying forward the old goal-matching DNA). Acquired as an unbrewed *recipe* at the Market, matured on the brewing track, shipped, then optionally enshrined.

| Style | Quality ⚙ | Inputs | Brew path | Enshrine? | Qty ⚙ |
|---|---|---|---|---|---|
| **Gruit Ale** | 1 | grain | LOAD→FERMENT→READY | ❌ (perishable) | ~20 |
| **Hopped Beer** | 2 | grain + hops | LOAD→FERMENT→AGE→READY | ✅ | ~24 |
| **Dubbel** | 3 | grain + hops×2 | + longer AGE | ✅ | ~12 |
| **Tripel** | 4 | grain×2 + hops×2 | + longer AGE | ✅ (high) | ~8 |
| **Barrel-aged / Bock** | 5 | premium; needs Aging Cellar room | longest AGE | ✅ (rare, big) | ~4 |

*Gruit is the commodity workhorse for early reach; the high styles are scarce, slow, and the standing engine.*

### B. Route tiles — perimeter-slot infrastructure (the scoring landscape)
Placed in a perimeter slot (committed to row XOR column). Two jobs: **(1)** raise that route's end-game value on the Harbor board; **(2)** modify the Harbor line when fired (e.g., +1 ship step / +1 cargo toward that kontor). Owned & taxable when a rival fires the line.

| Route | Flavor | Value tiers ⚙ | Qty ⚙ |
|---|---|---|---|
| **Bergen (Monopoly)** | short/narrow; control locks a resource/toll | +2 / +3 | ~5 |
| **Novgorod (Long Haul)** | longest; highest payout; demands high quality | +3 / +4 / +5 | ~6 |
| **Bruges (Hub)** | wide; many small payoffs; takes middling quality | +1 / +2 | ~7 |
| **London (Steelyard)** | pays in privilege tiles | +2 / +privilege | ~5 |

### C. Ship tiles — perimeter-slot infrastructure
Modify shipping/Harbor. Owned & taxable.
- **+1 Range** (advance an extra presence step) · **+1 Cargo** (ship 2 casks) · **Toll Exemption** (ignore one toll/skim) · **Pilot** (reach a waypoint bonus). ~12 total ⚙.

### D. Privilege tiles — Steelyard rewards / engine perks
Gained mainly via the **London** route. Ongoing or one-shot: market discount, free brew-track advance, extra worker move, skim immunity, draw bonus. ~12 ⚙. ❓ slot-resident vs tableau-resident.

### E. Room / Upgrade tiles — tableau engine
Installed into tableau room slots; this is where **depth** lives.
- **Extra Vessel** (parallel brewing capacity) · **Faster Fermenter** (auto-advance FERMENT) · **Aging Cellar** (shortens AGE; unlocks Barrel-aged) · **Warehouse** (goods/cask storage) · **Larder** (upgrades Market trickle) · **Quay** (upgrades Harbor trickle) · **Counting-house** (enshrine/standing bonus) · **Cooperage** (barrel capacity, if barrels adopted). ~3 each, ~24 ⚙.

### F. Public Kontor tiles — the shared stack
Strong **public** actions seeded into / added to the shared Kontor stack, interleaved with players' personal enshrined casks. Whichever is on top defines the current Kontor action; enshrining buries it.
- Examples: "*Enshrine +1 standing*", "*Draw 2 recipes*", "*Advance any one brew*", "*Place 1 presence free*", "*Convert grain↔hops*". ~12–16 ⚙.

### G. Starting / setup tiles
Per player: printed **starting larder + dock** (on the tableau), **1 starting recipe**, a small goods stake. Asymmetric starting brewing-house tiles are a possible variant. ❓

---

## 4. Approximate box footprint

- **2 main boards** (grid + route) · **5 tableau boards**
- **~7 tile families**, on the order of **~150–180 tiles** total (v0.1 estimate ⚙)
- **~100 wooden cubes** (grain/hops) · **~150 player markers** (presence/standing) · **5 workers**

This lands the game in **mid-heavy "Brass-footprint"** territory (per the §19 ambition-tier discussion) — substantial but not a Lacerda-scale component sprawl.

---

## 5. Open questions for the next pass

1. **Perimeter slot count** (6 vs 8) — blocks the route/ship/privilege economy.
2. **Cask tile = recipe tile** confirmed? (working assumption: one object, acquired unbrewed → brewed → shipped → enshrined.)
3. **Does the old goal-matching DNA live on the cask standing face** (enshrined casks set demands that working casks fulfill), or is that cut for v1?
4. **Quality scale granularity** — 1–5 as drafted, or coarser (just gruit / hopped / premium)?
5. **Privilege & room tiles:** acquired only at Market, or via their thematic source (London for privileges, a "build" action for rooms)?
6. **Public Kontor stack seeding** — how many public tiles start the stack, and who controls adding them?
