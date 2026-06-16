# Brewhouses of the Hanse — Components, Tiles & Player Board (the keystone reset — IN DESIGN)

> The single physical manifest: **boards · tokens · the tile families · the player brewery board
> · destinations.** *What objects exist and what each does* — the **why** is in `PLAN.md`, the
> **operational rules** in `RULES.md`. Every count/value is a placeholder ⚙.
>
> **Status: in-design (2026-06-16).** Edited forward onto the **keystone** (`PLAN.md`): *living,
> composable Wharf slots + dead-simple scoring.* The live, playable game is **v0.16.1**, frozen
> at `archive/main-v0.16.1` / `archive/play.html` and snapshotted in `archive/v0.16/`.
>
> **The headline change:** the old **goal tiles, neutral buildings, and most upgrades collapse
> into ONE new family — Buildings** (family C): owned tiles placed on the Wharf slots that
> **modify the casks and ships docked to them** (a building can host a ship, which holds casks).
> They are the **demand** (variable delivery value) and the **engine** (transforms), authored on
> the living board. *Content lives in the building deck; the rule is one sentence.*

---

## 0. Conventions

- **Goods:** `G` grain · `H` hops — the **only** currency (no money; no spendable prestige).
- **The slot stack (the keystone):** a slot holds up to two layers — a **building** (owned
  modifier) + an **occupant** (a **cask** *or* a **ship**, and a ship holds **casks**). One
  grammar: *a building modifies the occupant docked on it* (`RULES.md` §5).
- **One fire rule:** when a line is activated, the active player **may** use each slot — the
  occupant's action (a cask's signature action, a ship's free-load) **and** any building effect
  — all **on the active player's turn**; no out-of-turn gains.
- **Acquisition (Market):** **recipes & ships** are always-available supply; **buildings** sit in
  a small **face-up display** (~4 ⚙, refilling from the Building deck) — **bought + placed** at
  the Market, **and** handed free by **London / Novgorod** deliveries (the *deliver → author →
  deliver-better* engine loop). Casks are **brewed**, never bought.
- **Scoring is legible** (`RULES.md` §11): in-game = **Hall enshrine (fixed)** + **kontor
  deliver (variable, building-modified)**; end-game = **majorities (count)** + **the Flight
  (range)**.
- **End clock:** the **Sailed-Ships track fills** → finish the round → score.

---

## 1. Boards

| Component | Qty | Purpose |
|---|---|---|
| **Main board** | 1 | **The Wharf** — 2×2 stations (A Market · B Brewhouse · D Cellar · C Harbor) ringed by **8 slots** (the living, composable commons — buildings · casks · ships), plus the **Sailed-Ships track** (end clock; +1 per voyage). |
| **Destination board** | 1 | The four **kontore** + the **Hall**, each with **quality gate**, **base value**, **benefit**, and (kontore) a **majority track**. Delivered casks tally here. *(No "demand slots" — demand lives on the Wharf buildings, not the destinations.)* |
| **Player brewery boards** | N | Private & untouchable — vessels + maturation + recipes + a couple of improvements + storage + **the floor** (maturing casks double as the occupancy fallback, `RULES.md` §2). |

### The slots — the living, composable ring (8 slots)
- **8 slots, 2 beside each line.** Each can carry a **building** (owned modifier) and/or an
  **occupant** (a **deployed cask** — public action + cargo — *or* a **ship** — neutral
  destination-bound hull holding casks). **Most slots are bare casks/ships; a few carry a
  building** ("one or two may be modifiers"). The composable stack is *dock → building → ship →
  cargo*. Buildings are **owned**; rivals may still dock on them (owned-but-shared, §C). One fire
  rule (§0).

---

## 2. Tokens & player bits

| Component | Qty (⚙) | Notes |
|---|---|---|
| **Grain / Hops cubes** | ~60 / ~40 | Brewing inputs; the medium of exchange. |
| **Worker pawns** | 1 / player | Moved between stations. |
| **Ownership discs** | ~20 / color | Mark a cask's owner on a slot / when delivered; **also mark a building's owner.** |
| **Wharfage markers** | few / color | Track the small **points cut** an owner earns when a rival's cargo delivers through their value-building (§C). |
| **Charter contracts** *(small cards)* | ~20 ⚙ | Scarce certificates: start **2**; spend 1 + flat `2 G` fare to Charter; buy more at the Market (`1 G`). |
| **First-player / round marker** · **Sailed-Ships marker** | 1 each | Fixed turn order / the end clock. |

> **No goal tiles, no neutral-building tiles, no VP/standing/demand/aging tokens.** Score is
> tallied from delivered casks (variable), enshrined casks (fixed), majorities, and the Flight.

> **Casks are a shared supply with fixed global counts** (Q1×16 · Q2×20 · Q3×12 · Q4×8 · Q5×4 ⚙)
> — you **brew** them, so the rare export casks are a **contested** resource. Ownership by disc on
> the slots.

---

## 3. The tile families

Four families + the destination board. **Casks (A) are the content heart of the cargo; Buildings
(C) are the content heart of the board.** No card deck beyond recipes + charter contracts.

### A. Cask tiles — the dual-role hero (~60, shared supply) — KEPT
A cask carries **quality Q1–Q5** + **one signature slot-action** (drawn at brew; Gruit pinned to
Source). Three states: **maturing** (vessel) → **deployed** (slot — cargo + public action +
contestable; *modified if docked on a building*) → **delivered** (scores, leaves).

| Q | Beer | Brew inputs ⚙ | Maturation ⚙ | Signature slot action ⚙ | Gate | Qty |
|---|---|---|---|---|---|---|
| **Q1** | **Gruit Ale** | `G` | 1 | **Source +2 goods** *(fixed)* | Bruges | 16 |
| **Q2** | **Hopped Beer** | `G H` | 2 | *drawn at brew* | Bruges · London · Bergen · Hall | 20 |
| **Q3** | **Broyhan** | `G H H` | 2 | *drawn at brew* | + Novgorod | 6 |
| **Q3** | **Keut** | `G G H` | 2 | *drawn at brew* | + Novgorod | 6 |
| **Q4** | **Mumme** | `G G H H` | 3 | *drawn at brew* | all | 8 |
| **Q5** | **Bock** | `G G G H H` | 3 *(2 w/ Aging Cellar)* | *drawn at brew* (Wild possible) | all | 4 |

> **Deal 3 of 4 export beers each game** (the variable ladder shape). The **cask-action pool**
> (drawn at brew, Q2+): `Source · Age · Load · Reach · Convert · Survey (draw a Building) · Wild
> (Q4+)`. *(Survey rethemed from "draw a goal" — the authorship feeder.)*

### B. Ship tiles — NEUTRAL, destination-bound hulls (~20) — KEPT
Printed with hull (**Cog** cap 2 · **Hulk** cap 3) and a **kontor destination** (Bruges/London/
Bergen/Novgorod, 5 each; never the Hall). Face-up **market of 3** + 2 warm-start hulls on slots.
**Commission** (`2 G`): place one on a slot + a free berth. **Load** deployed casks (yours or a
rival's — you take `1 G`, owner scores); a ship **sails only when full** → every cask delivers in
load order; the hull returns to the deck; the voyage advances the clock. **Charter** (1 contract +
`2 G`) = a single-cask kontor voyage (the deadlock relief valve). **Dock a ship on your
value-building for a rich berth** (§C — the three-tier payoff).

### C. Building tiles — the NEW family (owned, on the living slots) — THE KEYSTONE
Replaces the old **goal tiles + neutral buildings + most upgrades.** Acquired at the Market
(bought from the display *or* earned via London/Novgorod) and **placed on any slot** (empty or
occupied), **owned** by the placer. **One grammar:** *a building modifies the occupant docked on
it* — and on a **ship**, the effect applies to **every cask aboard.** Two flavors:

**Value buildings — the "demand" (boost delivery value):**
| Building ⚙ | Effect (its docked occupant) | ×⚙ |
|---|---|---|
| **Rich Berth** | a docked **ship**: every cask it delivers **+2 ★** | 3 |
| **Staple House** | a docked **cask**: delivers **+3 ★** | 2 |
| **Kontor Privilege** (one per kontor) | casks shipped through here to **<that kontor>** **+3 ★** | 4 (1 each) |
| **Connoisseur's Cellar** | a docked **Q4+ cask**: delivers **+4 ★** | 2 |
| **Festival Wharf** | a docked **ship**: **+1 ★ per cask**, ramping with the load (rewards full hulls) | 1 |

**Transform buildings — change the occupant:**
| Building ⚙ | Effect | ×⚙ |
|---|---|---|
| **Kiln** | a docked **cask** ships at **+1 quality** (a step up the ladder) | 2 |
| **Cooperage** | a docked **ship** carries **+1 cask** (capacity) | 2 |
| **Customs House** | a docked **ship** may **re-flag its destination** / **−1 gate** | 2 |
| **Aging Loft** | a docked **cask** ages **+1/turn** (faster Ready) | 2 |
| **Workshop** | a docked **cask** **gains / upgrades its slot-action** | 1 |

- **Owned, but shared (wharfage):** the **owner** gets the full effect and docks first; a **rival**
  may dock on it too and **also** gets the effect, but the **owner takes a small points cut** ⚙
  (**+1 ★ per rival delivery through a value-building**, capped — *points, never a goods toll*).
  Build the dock; tax the traffic — gently. *(⚙ open: whether a rival's effect is reduced vs full.)*
- **Deck ~18–20 tiles**, face-up **display of 4**. Add variety by **recombining the axes**
  (*what it hosts* × *value/transform* × *which casks/kontore*) — **content, not new rules.**

> **The lanes, through the buildings:** *Rich Berth / Festival Wharf* feed **demand+volume** (fat
> hulls); *Connoisseur's Cellar / Kiln* feed **range/deep** (the climb); *Kontor Privilege* feeds
> **majority** (pile into one kontor); *Cooperage / Customs* are pure **tempo/engine**. The
> building you can grab depends on the display *and* on reaching London/Novgorod — contested.

### D. Recipe tiles — permission to brew (4 export designs) — KEPT
A small face-up Market supply (cards tucking under the brewery board). **Type + `G/H` cost,**
permanent. Start **Gruit + Hopped**; collect exports to climb.

| Recipe | Type | Buy ⚙ | Brew ⚙ |
|---|---|---|---|
| Gruit *(start)* | Q1 | — | `G` |
| Hopped *(start)* | Q2 | — | `G H` |
| Broyhan | Q3 | `1 G` | `G H H` |
| Keut | Q3 | `1 G` | `G G H` |
| Mumme | Q4 | `1 G 1 H` | `G G H H` |
| Bock | Q5 | `2 G` | `G G G H H` |

### E. Private brewery improvements — a tiny set (⚙)
Most v0.16 upgrades folded into Buildings (§C, public). A few **inherently-private** ones remain
on your brewery board: **Extra Vessel** (cap 2→3) · **Aging Cellar** (−1 maturation step) ·
**Warehouse** (storage 8→12). **How acquired is ⚙ open** — buyable at the Market for goods (simple)
or earned by delivery. Kept small on purpose (content-not-rules).

## F. Destinations — the rooms (the destination board) — RECONCEIVED
All open from start. **The kontor delivery value is small-and-flat by default + whatever
value-buildings the cargo shipped through** (`RULES.md` §7). The Hall pays a **fixed ladder.**

| Destination | Gate ⚙ | Base value ⚙ | Majority 1/2/3 ⚙ | Benefit on delivery ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | +1 ★ | 4 / 2 / 0 | 2 goods (owner's choice) |
| **London** (Steelyard) | Q2 | +1 ★ | 5 / 3 / 1 | **take a Building** (free) + place — the engine loop |
| **Bergen** (Bryggen) | Q2 | +1 ★ | **9 / 5 / 2** (anchor) | 2 goods |
| **Novgorod** (Long Haul) | Q3 | +2 ★ | 8 / 5 / 2 | **take a Building** (free) + place |
| **The Hall** (Prestige) | Q2 | **fixed ladder 4/6/8/10 by quality** ⚙ | — | — (local Enshrine) |

> **Majorities** (end-game, by delivered count): tiered/ranked; 2p skips 2nd; ties split. Bergen
> the rich anchor. **Benefits pair off:** Bruges/Bergen → goods (liquidity); London/Novgorod →
> **a Building** (the deliver → author → deliver-better engine — replacing v0.16's "take an
> Upgrade"). The **export premium and the Masterpiece are CUT** — the climb now pays through
> *value-buildings* (e.g. Connoisseur's Cellar) + **the Flight**, keeping scoring clean.

### G. End-game scoring — the Flight (range) — KEPT
- **The Flight — your range.** Distinct quality tiers (Q1–Q5) delivered, **(tiers − 1)², min 3**:
  **3 → 4 · 4 → 9 · 5 → 16** ⚙. The full flight needs a **Bock**. The deep/range reward,
  independent of demand. *(The Masterpiece is cut — folded into this + value-buildings.)*

---

## 4. The player board — the private brewery

```
┌──────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE crest        STORAGE ▢▢▢▢ ▢▢▢▢  (G/H, cap 8)         │
│  VESSELS  (start 2, cap 3)                                     │
│   Vessel 1  [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ slots ]     │
│   Vessel 2  [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ slots ]     │
│   Vessel 3  ▒▒ locked — Extra Vessel improvement ▒▒           │
│        (THE FLOOR: a maturing cask can be tapped as the        │
│         occupancy fallback — RULES.md §2)                      │
│  RECIPES  ▤Gruit ▤Hopped …      IMPROVEMENTS  [ ] [ ] [ ]      │
└──────────────────────────────────────────────────────────────┘
```

- **Vessels & maturation (start 2, cap 3).** Brew → matures to Ready (+1/turn + the Cellar) →
  deploy to a slot. Full slots → the Ready cask **clogs its vessel** (the back-pressure). **The
  maturing casks are also the *floor*** — tappable as the occupancy fallback (`RULES.md` §2).
- **Recipes** (Gruit + Hopped to start) · **Improvements** (the tiny private set, §E) ·
  **Storage** cap 8 (Warehouse +4; overflow lost — contains rich-get-richer).
- **Seat compensation:** **+1 `G` per seat after the first** (fixed turn order balancer); free
  opening worker placement.

---

## 5. Box footprint (⚙ first pass)

| Family | Count ⚙ | Unique |
|---|---|---|
| A Casks | 60 | 6 beers × actions |
| B Ships | 20 | Cog/Hulk × 4 kontore |
| **C Buildings (NEW)** | **~18–20** | **~11 designs (value + transform)** |
| D Recipes (cards) | ~20 | 4 exports (+2 printed) |
| E Private improvements | ~6 | 3 (Extra Vessel/Aging Cellar/Warehouse) |
| Charter contracts (cards) | ~20 | 1 |

**Removed vs v0.16:** goal tiles (18), neutral-building tiles (6), the per-cask value table, the
export premium, the Masterpiece, and the large upgrade family (folded into Buildings). Plus 1 main
board · 1 destination board · N brewery boards · wooden cubes · ownership/wharfage discs ·
workers · markers. **Medium GWT footprint** — and **fewer distinct tile families than v0.16**
(four, not five-plus-goals), the content concentrated in the Building deck.

---

## 6. Still-open ⚙

1. **The Building deck** — value/transform vocabulary, magnitudes, deck size, display width. *The
   keystone's heart.*
2. **Wharfage cut** — size/cap and whether a rival's building effect is full or reduced.
3. **Three-tier spikes** — Rich Berth/Festival on a full Hulk could over-reward; cap or curve.
4. **Private improvements** (§E) — which stay private; bought (goods) vs earned (delivery).
5. **Base values vs building bonuses** — the flat-vs-spiky dial; keep the Hall ladder the floor.
6. **Majority tiers** — re-tune now that kontor value is building-driven.
7. **Slot pressure** — buildings + casks + ships on 8 slots; tight but never locked (2p/5p scaling).
8. **The Flight / Hall ladder** numbers vs the new in-game economy.
