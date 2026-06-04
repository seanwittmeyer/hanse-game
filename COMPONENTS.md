# Brewhouse of the Hanse — Components & Tile Deck (v0.6)

> Manifest derived from the locked architecture in `DESIGN.md` (§20, v0.6 — **supersedes v0.5/§19 where they conflict**). **All counts and values are placeholders for balancing** — the goal here is to enumerate *what objects exist and what each does*, not to be balanced yet. Anything marked ⚙ is a tuning dial; anything marked ❓ is an open question.
>
> **v0.6 headline shifts:** the player board's dedicated slots collapse into **4 multi-use Brewhouse Floor slots** (Room *or* working Cask); recipes move **tile → a face-up Market card deck** (one-time boon + permanent tucked brew strip); ships become **single-use destination carriers** that retire to the **Sailed-Ships track** (the new primary end clock); casks gain **aging cubes** and **ownership discs**. The **spine is unchanged.**

---

## 1. Boards

| Component | Qty | Purpose |
|---|---|---|
| **Main board** | 1 | The 2×2 action grid — **A Market · B Harbor · C Hall · D Brewhouse** (build×cash-out diagonals: builders Market+Brewhouse *pump* the market, cash-outs Harbor+Hall *realize & lower* it) — the 8 shared perimeter slots, the **Sailed-Ships track**, and the standing-stack area. |
| **Harbor / Route board** | 1 | Home port + four routes radiating to the **kontore** (Bergen/London/Bruges/Novgorod = reach destinations) through waypoints; presence spaces; per-route value tracks; per-kontor majority tracks. Each route carries a **destination bonus** (owner banks it when a ship sails there) and a **differentiated lane skim**. |
| **Sailed-Ships track** | 1 (shared) | A row of slots on the shared board — the **primary end clock**. Each ship that fills and sails retires its consumed tile to one slot; when the track fills, the end is triggered (`DESIGN.md` §20-F). **Self-accelerating** (the more the table ships, the sooner it ends). Length is the master dial: **~6 / 8 / 10 / 12 slots for 2 / 3 / 4 / 5p ⚙.** *(Optional flourish ⚙: milestone slots advance the type frontier / refill the Market.)* |
| **Player tableau boards** | 5 | Each: the **brewing track** (LOAD → FERMENT → AGE → READY), **vessel lanes** (start 1, cap 3), the **Brewhouse Floor** (**4 multi-use slots**, each holding **either a Room or a working Cask**), **recipe-strip tuck guides** along the bottom edge (Lisboa-style, **6 soft cap**), a **standing track** (your banked standing total) + a small **goal row** (enshrined casks' face-up goals), goods storage, and the printed **Larder** (Market twin) + **Quay** (Harbor twin). |
| **Demand market track** | 1 | A shared value track with **one marker per beer type** — a cask's enshrine payout = its type's current value. Realizing a type (deploy *or* enshrine) ticks it **down**; collecting its recipe card or a Fair pump ticks it **up**. Doubles as the type-frontier display. |

### Perimeter slots
- **8 live slots, all open** (**2-player locks some to ~6**). They hold a **churning mix**: **deployed casks** (your *reach* — they fire actions and are enshrine-able by anyone), **Fair tiles** (the paid market-pump lever), **route lanes** (open & value a route, fire a differentiated skim), and **ships** (single-use destination carriers — load → fill → sail, then the tile leaves for the Sailed-Ships track). Casks and ships are the transient flow (enshrined / sailed off the board); lanes and Fairs are sticky. Recipes are **not** slot tiles (they are Market cards tucked under your board).

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
| **Standing track markers** | 1 / player | Sit on each player's standing track; advance by a type's market value at each enshrine. *(Standing is the variable value, banked — there are no separate VP tokens; the demand market drives this number directly.)* |
| **Demand-market markers** | 1 / type | Sit on the shared value track; move up (recipe-card collect / Fair pump) and down (realize a type). |
| **Aging cubes** | ~30 (shared) | **One per brew in flight** — placed on a brewing cask to count its **Age dwell** (Gruit skip · L2/L3 1 · L4 2 · L5 3 pips). Quality is *printed on the tile*; age is *position + cube*. Returns to supply when the cask reaches Ready. |
| **Ownership discs** | ~20 / player color | Mark a **deployed cask's owner** in a shared perimeter slot (working casks on your Floor and enshrined casks in your goal row are owned by location, so need no disc). |
| **First-player / round marker** | 1 | Turn order / round clock. |
| **Empty barrels** | deferred ❓ | Optional capacity constraint (Vinhos-style) — held for later. |

> **Casks are *not* a generic token** — each cask is a tile (the dual-role hero, §3-A) drawn from a **shared supply with fixed global counts** (L1×16 · L2×20 · L3×12 · L4×8 · L5×4). You don't buy casks; you **brew** them, so the rare summit casks are a *contested* resource. There are **no per-player cask colors** — ownership of a deployed cask is shown by an ownership disc.

---

## 3. The Tile Deck (+ one card deck)

Six tile families plus one **card** deck. Family A (casks) is the content heart; the rest is the engine/economy layer. **Recipes are no longer tiles** (v0.6) — they are the face-up Market **card** deck (§C′).

### A. Cask tiles — the dual-role hero (shared brewing supply)
Double-sided. **Working/reach face**: type + **quality** (printed, Q1–Q5, static) + a **line action**. **Standing face** (enshrined): a **goal** (the cycled goal-matching DNA). Brewed (never bought) from a **tucked recipe strip** (§C′) out of the **shared supply**, then a Ready cask lives in one of **three states** (`RULES.md` §2): **working** (a **Brewhouse Floor** slot — engine, soups up a station), **reach** (deployed to a shared perimeter slot — it *is* your presence and fires an action; enshrine-able by anyone, owner marked by a disc), or **standing** (enshrined — the owner banks the type's current **market value**). A cask is only ever one at a time; enshrining converts it (its board presence leaves). **Age** is tracked by position on the brewing track + an aging cube (§2); **quality** is fixed at brew.

Beer is **two layers — type + recipe** (`TILES.md` §A): a **type** is a global quality rung; a **recipe** is a collected instance of a type with its own cost profile. The ladder is **anchored spine + variable summit** — **L1 Gruit → L2 Hopped** is fixed and historical (hops is the preservation tech that opens the sea routes), and **L3–L5 are dealt each game** from the historical Hanse summit roster.

| Level | Type | Quality ⚙ | Inputs ⚙ | Brew steps | Enshrine? | Base standing ⚙ | Qty ⚙ |
|---|---|---|---|---|---|---|---|
| **L1** | **Gruit Ale** | 1 | grain | 2 (skips AGE) | ❌ (perishable) | — | 16 |
| **L2** | **Hopped Beer** | 2 | grain + hops | 3 | ✅ | 3 | 20 |
| **L3** | *summit ⚙* | 3 | grain + hops×2 | 3 | ✅ | 5 | 12 |
| **L4** | *summit ⚙* | 4 | grain×2 + hops×2 | 4 | ✅ | 7 | 8 |
| **L5** | *summit ⚙* | 5 | premium; needs Aging Cellar room | 5 | ✅ (rare, big) | 10 | 4 |

> **Shared pool, fixed global counts (v0.6 LOCKED):** the Qty column is the **whole-game supply** drawn from by all players — not a per-player allotment. A player's cap is "what's left to brew." The scarce summit casks (L4/L5) are therefore a contested resource.

> **Summit roster (dealt to L3–L5 in variable order each game) ⚙:** real Hanse export beers — **Bock** (Einbeck), **Mumme** (Braunschweig), **Broyhan** (Hannover), **Keut** (Low Countries). Each carries a light mechanical hook (e.g. the top rung needs the Aging Cellar). Reskins the anachronistic *Dubbel/Tripel* placeholders.

*Gruit is the commodity workhorse for early reach; the summit types are scarce, slow, and the standing engine.*

### B. Route tiles — perimeter-slot infrastructure (the scoring landscape)
Placed in a perimeter slot (committed to row XOR column). Two jobs: **(1)** raise that route's end-game value on the Harbor board; **(2)** fire a **differentiated, per-kontor skim** when the line runs (v0.6 — no longer a flat +1`G`). Owned & taxable when a rival fires the line. Each route is also a **ship destination** (its quality gate is inherited by any ship built to it).

| Route | Flavor | Value tiers ⚙ | Lane line action (owner) ⚙ | Qty ⚙ |
|---|---|---|---|---|
| **Bruges (Hub)** | wide; many small payoffs; takes middling quality; **only kontor reachable by Harbor direct-deploy** | +1 / +2 | **+1`G`** (liquidity) | ~7 |
| **London (Steelyard)** | pays in privilege | +2 / +privilege | **advance/draw on the Privilege track** | ~5 |
| **Bergen (Monopoly)** | short/narrow; control locks a toll | +2 / +3 | **toll** — a rival who delivers/loads to Bergen pays the lane owner a good | ~5 |
| **Novgorod (Long Haul)** | longest; highest payout; demands high quality | +3 / +4 / +5 | **+1`H` or advance a brew a step** | ~6 |

### B′. Fair tiles — the paid market lever (NEW v0.5)
A slot tile. Its **line action lets the active player pay 1 `G` to raise one beer type's market value +1**; the **fee goes to the Fair's owner** (the owner pays the supply when self-using). The toll-baron stall: build it on a line you run — ideally a **Hall line**, so you can **pump → enshrine high in one activation** before rivals react. ~4 ⚙.

### C. Ship tiles — single-use destination carriers (v0.6)
A slot tile **built (Market) tied to a destination kontor**, inheriting that route's **quality gate**, with **capacity Cog 2 / Hulk 3**. Lifecycle: **load → fill → sail.** When the ship's line fires (by *anyone*), the active player may load one Ready cask that meets the gate; the **loader takes a small benefit, the owner skims a good** (toll-baron). The instant the ship is **full** it sails — every cask aboard **drops as presence (reach)** at the destination, the **owner banks the per-kontor destination bonus**, and the **ship tile is consumed to the shared Sailed-Ships track** (a new ship must be built). *(Relief valve: the owner may launch a partial ship early via a Harbor action.)* Ships are now the only way to reach **London / Bergen / Novgorod**; the Quay room upgrades Harbor direct-deploy to any open route (the builder's alternative to ships).
- **Cog** (capacity 2) · **Hulk** (capacity 3). Single-use, so **more copies than v0.5**: **Cog ~8 · Hulk ~5 ⚙.** *(The Toll Exemption and Pilot tiles are retired with the faucet framing.)*

### C′. Recipe cards — the dual-use Market deck (v0.6 — cards, not tiles)
Recipes are a **small face-up CARD deck**, acquired **only at the Market**, frontier-gated. Each card is dual-use (rhyming with the dual-role cask):
- **On collect — a big one-time boon** (≈ a free action), scaling by tier: **L2 *Stocked Pantry*** (+2`G` 2`H`) · **L3 *Brewmaster's Push*** (advance 3 across vessels) · **L4 *Grand Market*** (take 2 goods + buy one slot tile at −1) · **L5 *Master's Privilege*** (choose one: advance 3 / +2`G`2`H` / free Market / free Harbor deploy). Boons grant **resources / tempo / small presence only — never standing or VP**.
- **Permanent brew strip:** the card **tucks under the bottom edge of the board** (Lisboa-style), showing only **type + cost profile** (`n G · n H · n steps`); your fanned row of strips **is** your recipe book, brewable forever.
- **Soft cap = 6 tuck guides;** a 7th collect forces discarding a strip (lose that brewable type). **Collecting still pumps the type +1** (respecting the `pump ≤ drop` guardrail).
- Start: **Gruit baseline** (printed on the board, always brewable) **+ 2 random premium recipe cards.** Deck ~**14 cards ⚙** (variants per tier). *(Removes recipe tiles from the box.)*

### D. Privilege tiles — Steelyard rewards / engine perks
Gained mainly via the **London** route. Ongoing or one-shot: market discount, free brew-track advance, extra worker move, skim immunity, draw bonus. ~12 ⚙. ❓ slot-resident vs tableau-resident.

### E. Room / Upgrade tiles — tableau engine
Installed into a **Brewhouse Floor slot** (one of 4, shared with working casks — building a room spends a contested Floor square); this is where **depth** lives.
- **Extra Vessel** (a parallel brewing lane — note v0.6: **as a Room it consumes a Floor slot**, the "build wide vs deep" squeeze) · **Faster Fermenter** (auto-advance FERMENT) · **Aging Cellar** (shortens AGE; unlocks Barrel-aged) · **Warehouse** (goods/cask storage) · **Larder** (upgrades the Market alternate) · **Quay** (**upgrades Harbor direct-deploy from Bruges-only to any open route** — the builder's alternative to running ships) · **Counting-house** (enshrine/standing bonus) · **Cooperage** (barrel capacity, if barrels adopted). ~3 each, ~24 ⚙.

### F. Public Hall tiles — *deprecated in v0.5* ❓
The old shared-stack "top tile = current action" mechanic is **retired** — the standing stack is now pure sediment (value lives on each player's standing track; goals sit face-up in a personal row). These public-action tiles are cut, or kept only as optional **one-time setup bonuses** if a shared-action element is wanted back. ⚙

### G. Starting / setup tiles
Per player: printed **Larder + Quay** twins (on the tableau), the **Gruit baseline + 2 random premium recipes** in the book, **3 `G` · 2 `H`**, **0 VP tokens**. Asymmetric starting brewing-house tiles are a possible variant. ❓

---

## 4. Approximate box footprint

- **2 main boards** (grid + route, the latter carrying the **Sailed-Ships track**) · **5 tableau boards**
- **6 tile families + 1 card deck** (recipe tiles retired → ~14-card Market deck), on the order of **~150–170 tiles** total (v0.6 estimate ⚙ — recipe tiles removed, ship tiles up since single-use)
- **~100 wooden cubes** (grain/hops) · **~150 player markers** (presence/standing) · **~30 aging cubes + ~20 ownership discs/color** (v0.6) · **5 workers**

This lands the game in **mid-heavy "Brass-footprint"** territory (per the §19 ambition-tier discussion) — substantial but not a Lacerda-scale component sprawl.

---

## 5. Resolved & still-open

**Resolved (now canonical — see `DESIGN.md` §20, `RULES.md`, `TILES.md`):**
- **Perimeter slots = 8, all open** (2p locks to ~6).
- **Recipe ≠ cask.** A recipe is a **face-up Market card** (§C′) with a one-time on-collect boon + a permanent tucked brew strip; you brew from the strip; the cask is the brewed output. Lifecycle: collect recipe card → brew → **deploy/sail (reach)** *or* **enshrine (standing)**.
- **The Brewhouse Floor = 4 multi-use slots** (Room *or* working Cask); vessels separate (1→3, Extra Vessel is a Room).
- **Ships are single-use destination carriers** → consumed to the **Sailed-Ships track** (the primary end clock); **city saturation is no longer an end trigger.**
- **Goal-matching DNA stays** on the cask standing face — now a **3-way cycle, best-3 score** (`TILES.md` §A).
- **Quality scale 1–5** (the type ladder; Gruit→Hopped fixed, L3–L5 a variable summit).

**Still open ⚙ / ❓:**
1. **Privilege & room tiles:** acquired only at Market, or via their thematic source (London for privileges, a "build" action for rooms)?
2. **Sailed-Ships slot counts** (~6/8/10/12) **& the enshrined-cask backstop number** — the two end-clock dials; plus the optional milestone flourish.
3. **Type-frontier advance threshold** — how many realizations flip a tier; **value-track length & step**; ship build cost vs single-use payoff; destination-bonus magnitudes; how hard the 6-card recipe cap bites.
4. **Summit roster per-beer hooks** — the exact mechanical twist each historical beer carries.
