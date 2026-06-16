# Brewhouses of the Hanse — Components, Tiles & Player Board (v1.0 “Living Slots”)

> The physical manifest: **boards · tokens · the tile families · the player brewery board ·
> destinations.** Enumerates *what objects exist and what each does* — the **why** is in
> `DESIGN.md`, the **operational rules** in `RULES.md`, the **plan** in `PLAN.md`. **Every
> count/value is a placeholder ⚙.**
>
> **v1.0 — Living Slots.** The design is locked into the specs; the **`play.html` rebuild is the
> next step.** The last *playable* build is v0.16.1 (archived at `archive/play.html`;
> the v0.16 manifest at `archive/v0.16/COMPONENTS.md`). The headline change: the **8 slots are a
> living, composable commons** — they hold **owned buildings** that modify the casks/ships
> docked to them. **One new tile family (Buildings) absorbs the old neutral buildings, the goal
> tiles, and most upgrades.**

---

## 0. Conventions

- **Goods:** `G` = grain, `H` = hops. The **only** currency (no money; no spendable prestige).
- **Faces:** infrastructure is single-face; a **cask** is a single working face (quality + one
  signature action), scored at its destination, never flipped.
- **The fire rule (one rule for all slots):** when a line is activated, the active player **may
  use each slot on it** — the occupant's action (a **cask**'s signature action, a **ship**'s
  free load) **and** any **building** effect. All resolve **on the active player's turn** — no
  out-of-turn gains.
- **The slot stack (the keystone):** a slot holds up to two layers — a **building** (owned
  modifier) and an **occupant** (a **cask**, or a **ship** that holds casks): *dock → building →
  ship → cargo.* A building modifies the occupant docked on it (§3C).
- **Acquisition (Market):** **recipes & ships** are always-available supply; **buildings** sit
  in a small **face-up display** (4 ⚙, refilling from the Building deck) — **buy + place** one
  (pay its cost), **or earn one free by delivering to London / Novgorod** (and place it). A few
  inherently-private **brewery improvements** are buyable for goods (§3E). Casks are **brewed**.
- **End clock:** the **Sailed-Ships track fills** (a voyage = a full sail, a Charter, or an
  Enshrine) → finish the round → score.

---

## 1. Boards

| Component | Qty | Purpose |
|---|---|---|
| **Main board** | 1 | **The Wharf** — the 2×2 of stations **A Market (Source) · B Brewhouse (Brew) · D Cellar (Age) · C Harbor (Ship)** ringed by **8 slots** (each holds a building and/or an occupant), plus the **Sailed-Ships track** (the end clock, one step per voyage). |
| **Destination board** | 1 | The four **kontore** (Bruges · London · Bergen · Novgorod) + the **Hall**, each with its **quality gate**, small **base value**, **benefit**, and (kontore) a **majority track**. |
| **Player brewery boards** | 4 | Private & untouchable — vessels + recipes + improvements + the **Floor** (§4). |

### The slots — the living, composable ring (8 slots)
**8 slots, 2 beside each line.** Each holds up to a **building** (owned modifier) **+** an
**occupant** (a deployed **cask**, or a **ship** with casks in its berths). A churning,
contested commons: casks deploy in and ship out, ships commission in and sail away, buildings
are placed and **stay** (the authored layer). *(2-player may run ~6 active slots ⚙.)*

---

## 2. Tokens & player bits

| Component | Qty (⚙) | Notes |
|---|---|---|
| **Grain / Hops cubes** | ~60 / ~40 | The only currency + brew inputs. |
| **Worker pawns** | 1 / player | Moved between stations. |
| **Ownership discs** | ~20 / colour | Mark a cask's owner on a slot / on delivery, **and a building's owner.** |
| **Charter contracts** *(small cards)* | ~16 ⚙ | Start **2** / house; spend 1 + a flat `2 G` fare to Charter; buy more at the Market (`1 G`). |
| **Wharfage / score markers** | — | The owner's small points cut when a rival routes through a building (§3C); a score pad/track. |
| **First-player / round marker** | 1 | Turn order (fixed) / round clock. |

> **No goal tiles, no VP/standing tokens, no demand-market markers, no aging cubes.** Score is
> tallied from delivered casks (value + majority), enshrined casks (Hall), and the Flight.

> **Casks are a shared supply with fixed global counts** (Q1×16 · Q2×20 · Q3×12 · Q4×8 · Q5×4 ⚙),
> **brewed** (never bought) — so the rare export casks are a contested resource. Ownership is a
> disc once a cask hits the slots.

---

## 3. The tile families

Four families + destinations. **Casks (A) are the content heart; Buildings (C) are the new
authored layer.** No card deck (recipes/contracts are plain permission/certificate cards).

### A. Cask tiles — the dual-role hero (~60, shared supply) — *unchanged*
Quality **Q1–Q5** (printed, static) + **one signature slot-action** — taken from the **face-up
top tile of its quality pile** when brewed (steerable; §3F), **Gruit pinned to Source +2 goods**.
Three states: maturing (vessel — **powers your Floor**) → deployed (slot) → delivered (scores →
gone). *(The cask is half your impact: brew what, hold which, deploy when — `RULES.md` §3.)*

| Q | Beer | Brew inputs ⚙ | Matures ⚙ | Reaches (gate) | Qty |
|---|---|---|---|---|---|
| **Q1** | **Gruit Ale** | `G` | 1 | Bruges | 16 |
| **Q2** | **Hopped Beer** | `G H` | 2 | + London · Bergen · the Hall | 20 |
| **Q3** | **Broyhan** / **Keut** | `G H H` / `G G H` | 2 | + Novgorod | 6 / 6 |
| **Q4** | **Mumme** | `G G H H` | 3 | all | 8 |
| **Q5** | **Bock** | `G G G H H` *(ungated)* | 3 | all | 4 |

> **Export beers carry fixed quality; deal 3 of 4 each game** (drop a Q3 → full Q3→Q5 climb;
> drop Mumme → no Q4; drop Bock → no Q5 — the variable ladder shape). Bock is **ungated at 3G2H**.

### B. Ship tiles — neutral, destination-bound hulls (deck of ~20) — *unchanged*
Hull (**Cog** 2 / **Hulk** 3) + a **kontor** destination printed (Bruges/London/Bergen/Novgorod,
5 each; 11 Cog / 9 Hulk). Off a shuffled deck → a **face-up market of 3**. **Commission** (`2 G`)
places one on a slot + a free berth. **Load** casks (yours or a rival's — you choose the
destination, you take `1 G`, the owner scores). **Sails only when full** → every cask delivers,
in load order. The hull returns to the deck; the voyage ticks the clock. **Dock a ship on your
value-building for a rich berth** (§3C). The **Hall is never a ship destination** (Enshrine).

### C. Building tiles — THE NEW FAMILY (owned, on slots; the authored value layer)
Acquired at the Market (buy + place, or earned by delivering to London/Novgorod), **owned by the
placer**, placed on any slot. Under **one grammar — "a building modifies the occupant docked on
it"** — each is one of two flavors (variety = content, not new rules):

> **Theme is first-class here.** The original goals & upgrades nailed the Hanseatic flavor; the
> deck carries it forward in *both* the **effects** and the **names** — **trading privileges &
> patrons** for the *value* verb, the **brewer's craft & harbor works** for the *transform* verb.
> Each tile should feel like a real Hanse institution, not a stat block. Names/flavor below are
> the first pass; numbers are ⚙.

**Verb 1 — VALUE buildings (make a delivery pay more — *the demand*).** *Trading privileges,
market rights, and patrons — the institutions of the Hanse.*

| Building | Effect ⚙ | Flavor | Lane |
|---|---|---|---|
| **Rich Berth** | a **ship** here: each cask it delivers **+2★** | the coveted dockside berth — the whole hold fetches more | demand · volume |
| **Staple Hall** | a **cask** here delivers **+3★** (any kontor) | your beer is the staple of the market | demand |
| **Kontor Charter** *(×4: Bruges Hanzehuis · London Steelyard · Bergen Bryggen · Novgorod Peterhof)* | a cask to **its own kontor** from here **+X★** | the Hansa's printed trading privilege | demand · majority |
| **Burgomaster's Favor** | a **cask** here: **+1★ per quality level** | the mayor drinks only your best — and pays for it | demand · range |
| **Connoisseur's Cellar** | a **Q4+** cask here **+4★** | the Ratskeller's discerning palate | demand · range |
| **The Hanse Diet** | a cask here to a kontor **where you lead** **+3★** | the dominant house is feted at the assembly | demand × majority |
| **Festkeller** | a **full** ship here: **+1★ per cask** | a festival demands a full hold | demand × volume |
| **Reliquary** | a **cask** here, when **enshrined**: **+2★** prestige | your finest, consecrated | prestige |
| **Almoner's Stall** | your **wharfage** cut from rivals is **+1★** more | charity that quietly pays | authorship |

**Verb 2 — TRANSFORM buildings (change the cask or ship).** *The brewer's craft and the harbor's
works — the things a house actually builds.*

| Building | Effect ⚙ | Flavor | Lane |
|---|---|---|---|
| **Malt Kiln** | a **cask** here ships as **+1 quality** (cap Q5) | kiln-dried malt, a finer brew | range |
| **Lagering Cellar** | a **cask** here ages **+1 / turn** | cold-stored, it matures to peak faster | range · throughput |
| **Hop Yard** | a **Q2+** cask here gains **+1 quality** | fresh hops — the beer that travels | range |
| **Cooperage** | a **ship** here carries **+1 cask** | more barrels, a bigger hold | volume · throughput |
| **Harbor Crane** | **free-load** a cask when this line fires | the dockside crane does the lifting | tempo |
| **Customs House** | a **ship** here may **re-flag its destination** (−1 gate) | papers that send cargo anywhere | routing |
| **Gauger's Office** | a **cask** here **re-qualifies up one gate** | the gauger certifies it fit for the long haul | routing · range |
| **Brewmaster's Workshop** | a **cask** here **gains / upgrades its slot-action** | the master tinkers; every cask leaves better | engine · authorship |

- **Owned, but shared (one universal rule):** the **owner** gets the full effect and docks
  first; a **rival** may dock on it too — they get the effect, and **you (owner) take a small
  “wharfage” cut** (⚙ **+1★**, capped per delivery — **points, never a goods-skim toll**). *Build
  the dock; tax the traffic, gently.*
- **Deck ⚙ ~22 tiles across 17 designs, display 4** — value & transform kept roughly balanced,
  every lane hooked. Counts ⚙: singletons for the swingy/identity tiles (Connoisseur · Hanse
  Diet · Festkeller · Reliquary · Almoner's Stall · Gauger · Hop Yard · Workshop), ~2 of the
  workhorses (Rich Berth · Staple Hall · Burgomaster · Malt Kiln · Lagering Cellar · Cooperage ·
  Harbor Crane · Customs House), Kontor Charter ×1 each (4). The vocabulary axes (so new tiles
  stay one-grammar content): **what it touches** (cask / ship) × **what it does** (boost value /
  transform) × **on whom** (owner / shared / a specific kontor).

> **Why this is the keystone:** *what's worth more is what's been built on the living slots* —
> and the players build it (the GWT player-built track). Each building maps to a lane (right
> column), so the **five lanes each have their hooks** (the no-half-measures bar, `PLAN.md` §1A).

### D. Recipe tiles — permission to brew a type (4 export designs / player) — *unchanged*
Start **Gruit + Hopped** (printed); collect exports at the Market. A recipe is just *a brewable
type + its `G/H` cost*; permanent.

| Recipe | Type | Buy ⚙ | Brew ⚙ |
|---|---|---|---|
| Gruit / Hopped | Q1 / Q2 | start | `G` / `G H` |
| Broyhan / Keut | Q3 | `1 G` | `G H H` / `G G H` |
| Mumme | Q4 | `1 G 1 H` | `G G H H` |
| Bock | Q5 | `2 G` | `G G G H H` |

### E. Private brewery improvements — the small private engine (⚙ — buyable for goods)
The few upgrades that are inherently **private** (don't fit a public slot) stay as brewery
improvements, **bought at the Market for goods** (distinct from the earned-and-placed Buildings):

| Improvement | Effect ⚙ | Buy ⚙ |
|---|---|---|
| **Extra Vessel** | +1 brewing lane (vessels start 2, cap **3**) | `5 G` |
| **Aging Cellar** | maturation **−1 step** | `5 G` |
| **Granary / Hop Garden** | when you gain grain / hops, +1 extra | `4 G` |

> Everything else from the v0.16 upgrade list (Quay/Cooperage/Trophy Room/Burgher/Staple/Patron…)
> **folds into the public Building family (§3C)** — capability now lives on the living slots.
>
> **The dead-upgrade lesson (designer playtests):** Extra Vessel and the Warehouse were *never*
> bought across many games. v1.0 **revives Extra Vessel** — vessels now carry **pre-delivery
> value** (they power the **Floor**, §3A / `PLAN.md` §1B), so a vessel-heavy brewery is a real
> engine. **Warehouse (storage cap) stays cut/suspect** (no one ever passed cap 8). So the
> **starting vessel count / cap / whether Extra Vessel repeats** are a live ⚙ — the goal:
> *adding a vessel is a tempting decision*, which it never was.

### F. The cask-action pool — *steerable at the kettle* (Q2+)
Each quality's casks form a pile; **the top tile of every quality pile is face-up**, so when you
brew you **see the action you'd get** and can pick *which* quality to brew partly by it — the
Orléans-lite **steerable-variance** seat (agency, not a blind draw), and the place to read for an
engine-building action. The pool (Q2+): `Source (+2 goods)` · `Age (age a cask +2)` · `Load
(free-load a cask)` · `Reach (+1 presence — majority)` · `Convert (2 goods G↔H)` · **`Survey`
(draw a building to hand)** · `Wild (any base action — Q4+ only)`. **Gruit is fixed to Source.**

### G. Destinations — *where you deliver* (the destination board)
All open from start. Variable kontor value comes from the **buildings** a cask shipped through
(§3C); the base is small and roughly flat.

| Destination | Gate ⚙ | Base value ⚙ | Benefit on delivery ⚙ | Majority (1/2/3) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | +1 ★ | 2 goods, owner's choice | **4 / 2 / 0** |
| **London** (Steelyard) | Q2 | +1 ★ | **take a Building** (free) + place it — the engine loop | **5 / 3 / 1** |
| **Bergen** (Bryggen) | Q2 | +1 ★ | 2 goods | **9 / 5 / 2** (anchor) |
| **Novgorod** (Long Haul) | Q3 | +2 ★ | **take a Building** (free) + place it | **8 / 5 / 2** |
| **The Hall** (Prestige) | Q2 | **fixed ladder 4/6/8/10 by quality** | — (local **Enshrine**, no ship) | — |

- **Delivery value at a kontor = base + the value-buildings the cask shipped through.** Low by
  default, big when routed through demand you built. *(The v0.16 per-cask value table + export
  premium are folded into this; the Hall keeps a **fixed** ladder — the legible beginner floor.)*
- **Majorities** (kept from v0.16) = the **stable, board-agnostic floor**, by delivered-cask
  count; tiered/ranked; **2p skips 2nd**; ties split. Re-tune vs the new building-driven value ⚙.
- **Benefits:** Bruges/Bergen → **goods** (liquidity); **London/Novgorod → a free Building** (the
  deliver → author → deliver-better engine loop); the **Hall → fixed prestige** (Enshrine).

### H. End-game scoring — the Flight (kept; the Masterpiece cut)
- **The Flight — your range.** Distinct quality tiers (Q1–Q5) delivered, **(tiers−1)², min 3**
  (3→4 · 4→9 · 5→16). The deep lane's reward; the full flight needs a Bock. *(No tile — a strip
  on the player board.)*
- *(The **Masterpiece** is **cut** for scoring clarity — folded into the Flight + value-buildings.)*

---

## 4. The player board — the private brewery

```
┌──────────────────────────────────────────────────────────────┐
│  ⚑ HOUSE         STORAGE ▢▢▢▢ ▢▢▢▢  (G/H, cap 8)             │
│  VESSELS (start 2, cap 3)                                      │
│   V1 [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ deploy ]          │
│   V2 [ BREW ]→[ ferment ]→[ AGE ]→[ READY ▸ deploy ]          │
│   V3 ▒ locked — Extra Vessel ▒                                │
│  RECIPES  ▤Gruit ▤Hopped  ▤ ▤ …                               │
│  IMPROVEMENTS  [ ] [ ] …      CONTRACTS  ▣▣                    │
│  THE FLOOR — run your maturing casks' actions as a private     │
│             line (PLAN.md §1B)                                 │
└──────────────────────────────────────────────────────────────┘
```

- **Vessels & maturation** (start 2, cap 3). A Brew loads a recipe into an open vessel at step 0;
  the cask matures (+1/turn + the Cellar). When Ready, **deploy** to a slot. Slots full → the
  Ready cask **clogs its vessel** (the back-pressure).
- **The Floor (new).** Your maturing casks double as a **private line** you may run instead of a
  grid line — the engine-builder's tempo / the boutique brewer's self-sufficiency (`PLAN.md` §1B;
  ⚙ developing).
- **Recipes / Improvements / Contracts / Storage** (cap 8 ⚙).

### Starting setup (symmetric, + seat compensation)
3 `G` / 2 `H` (**+1 `G` per seat after the first**) · Gruit + Hopped · 2 vessels · **2 charter
contracts** · **1 building in hand** · a warm start (Hulk → Bruges + 1 ship; 1 Ready Gruit) ·
worker placed free turn 1.

---

## 5. Box footprint (⚙ first pass)

| Family | Count ⚙ | Unique |
|---|---|---|
| A Casks | ~60 | 6 beers |
| B Ships (deck) | 20 | 2 hulls × 4 kontore |
| **C Buildings** | **~19** | **~11 designs** |
| D Recipes (cards) | ~16 | 4 (+2 printed starts) |
| E Improvements | ~10 | ~4 |
| Charter contracts | ~16 | 1 |

Plus 1 main board · 1 destination board · 4 brewery boards · wooden cubes (G/H) · ownership
discs · workers · markers. **Medium GWT footprint** — substantial, far short of Lacerda.

---

## 6. Removed in v1.0 (folded or cut — preserved in `archive/v0.16/`)

- **Goal tiles** — dissolved into the public **Buildings** (the board is the authored value set).
- **Neutral building tiles** — replaced by the owned **Buildings**.
- **Most upgrade tiles** — folded into **Buildings** (public) or the small **improvements** set.
- **The per-cask value table + the export premium** — value is now building-driven.
- **The Masterpiece** — cut for scoring clarity.

## 7. Resolved & still-open

**Resolved (canonical — `PLAN.md` / `RULES.md`):** the Wharf (stations + composable slots);
the dual-role cask; **buildings modify the occupant docked on them** (one grammar, owned-but-
shared); **legible scoring** (Hall fixed · kontor variable · majorities + Flight); ships
sail-when-full; the Charter; the Sailed-Ships clock.

**Still open ⚙:**
1. **The Building deck** — the value/transform vocabulary, magnitudes, deck size, display width.
   *The keystone's heart.*
2. **Wharfage** — points size & cap (owned-but-shared pays the owner without rich-get-richer).
3. **Three-tier interactions** — building + ship + full cargo can spike; cap/curve ⚙.
4. **Private improvements** (§3E) — which survive, bought vs earned, how many.
5. **Base values vs building bonuses** — the flat-vs-spiky dial; keep the Hall ladder the floor.
6. **Majority numbers** — re-tune vs building-driven value.
7. **The Floor** — full turn-alternative vs occupancy fallback; cost/clock interaction.
8. **Slot pressure** — buildings + casks + ships on 8 slots; tight, never locked.
