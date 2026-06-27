# Brewhouses of the Hanse — Components, Tiles & Player Board (v2.1 “Staple Rights”)

> The physical manifest: **boards · tokens · the tile families · the player brewery board ·
> destinations.** Enumerates *what objects exist and what each does* — the **why** is in
> `DESIGN.md`, the **operational rules** in `RULES.md`, the **plan** in `PLAN.md`. **Every
> count/value is a placeholder ⚙.**
>
> **v2.1 — The Trade Roads / Staple Rights (live).** The keystone "Living Slots" rebuild shipped and is implemented in
> `play.html`; v0.16.1 is archived at `archive/play.html` (manifest at `archive/v0.16/COMPONENTS.md`).
> The **8 slots are a living, composable commons** — they hold **owned buildings** that modify the
> casks/ships docked to them; **one tile family (Buildings) absorbs the old neutral buildings, the
> goal tiles, and most upgrades.** The **v1.2 headline:** a value building's bonus is tracked by a
> reusable **demand die (d6)** that rides the cask in the ship's berth (pips = the ★ banked on
> delivery — §2).

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
  (pay its cost), **or earn one free by delivering to London** (and place it). A few
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
| **Presence barrels** *(player colour)* | **~9 / colour ⚙ — the TRADE-FACTOR cap** | One token, three lives: it rides your cask as **ownership** on a slot → travels with it on a ship → **plants at the kontor as your presence** on delivery (majorities). **Finite supply = the cap** (v1.1): a kontor delivery / a **+1 Reach** each plant one; out of barrels → you can only Enshrine or stop contesting kontore. **Enshrining (the Hall) returns the barrel** (prestige isn't standing → the Hall is the unlimited overflow). *Personal cap only — not an end-trigger; the Sailed-Ships clock stays the pace dial.* |
| **Building-owner markers** | ~6 / colour | Mark whose building sits on a slot (wharfage + full-vs-reduced effect). |
| **Demand dice (d6)** | **~8 shared ⚙** | The reusable **value-bonus carrier.** When a cask ships through a **value building** it carries a neutral d6 in the ship's berth, **pips = the ★ it banks on delivery** (the building's value + any **Q4/Q5 quality premium**, §3C; a rival route = half rounded up). A **premium capstone** can bank **>6** — the d6 shows up to 6 and the **premium beyond that is read off the cask's printed quality**. The die **returns to the pool** once paid (or if the ship never sails). |
| **Quality-boost markers** | ~6 ⚙ | A small **+1-quality** token a cask carries from a **Malt Kiln / Hop Yard** to delivery (its effective quality — matters for Novgorod's scaling base). |
| **Charter contracts** *(small cards)* | ~16 ⚙ | Start **2** / house; spend 1 + a flat `2 G` fare to Charter; buy more at the Market (`1 G`). |
| **Wharfage / score markers** | — | The owner's small points cut when a rival routes through a building (§3C); a score pad/track. |
| **First-player / round marker** | 1 | Turn order (fixed) / round clock. |

> **No goal tiles, no VP/standing tokens, no demand-market markers, no aging cubes.** Score is
> tallied from delivered casks (value + majority), enshrined casks (Hall), and the Flight.

> **Casks are a shared supply with fixed global counts** (Q1×16 · Q2×20 · Q3×12 · Q4×8 · Q5×4 ⚙),
> **brewed** (never bought) — so the rare export casks are a contested resource.

### Physical-tracking model (the digital-state audit — what records what)
Every property the reference app holds has a physical home (no hidden state):
- **Cask type + quality** → the **cask tile** itself (beer + quality pips printed). **Owner** → a **presence
  barrel** on the tile (above). **Its drawn slot-action** → an **action tile** the cask carries from the
  kettle through its whole life (vessel → slot → ship).
- **Maturation** → **one marker per vessel** on the player board's "ready in 1/2/3" track.
- **The steerable kettle** → a shared **brew display**: the four quality piles (Q2–Q5), each showing its
  **face-up top action tile** (what a cask of that quality would take).
- **Scoring is IN-GAME, on delivery** (advance the score marker), and what a cask captured is **carried on the
  cask, not held in memory.** When a cask **loads off a VALUE building**, it takes a neutral **demand die**
  into the ship's berth, set to the bonus **★** (a d6 — the building's value + any **Q4/Q5 quality premium**;
  a rival-route = half, rounded up — and the building owner takes a +1★ wharfage; a premium capstone >6 reads
  the overflow off the cask's quality). When it **loads off a quality TRANSFORM**
  (Malt Kiln / Hop Yard) it carries a **+1-quality marker** (its effective quality, for Novgorod's scaling
  base). **On delivery** you bank: the destination's value (by the cask's marked quality) **+ the die's pips**
  **+ the ship's rich-berth** (Rich Berth / Festkeller — resolved *live*, the ship is still on its berth, so
  they need no carried token); then **the die and marker return to the pool.** A cask that never sails
  (stranded) never banks — the die just goes back. *(Almoner's wharfage is likewise a live score bump.)*
- **The Flight** → a per-player **5-space Tasting strip** (Gruit + Hopped + the 3 dealt exports); mark a
  beer the first time you deliver it; uncovered spaces = your range.
- **Wharfage** → scored live on the track when a rival routes through your building.
- **Presence** → a **presence barrel** is placed at a kontor **only by delivering a cask there** or by a
  **Reach** (the cask action, the Bergen benefit, the Keut perk) **at a kontor where you already have a
  barrel** — you can't gain a foothold where you've never shipped (v1.2). So a Reach is a dead action until
  your first delivery; no extra component, just the placement rule.
- **The developer bonus** (v1.2; **v1.7 made physical**) → when a **rival overbuilds** your slot, your
  displaced building **FLIPS to its back and goes into your improvements area** — a tile worth **3★** at game
  end **and** carrying a **Wild action** (fired when you work the **Floor**). The improvements area holds at
  most **4** tiles (improvements + flipped, `IMP_AREA_CAP`); if it's full, the displaced tile returns to hand.
  **Self-displacement pays nothing** and returns to hand (you only flip when a *rival* covers you — anti-farm).
- *(Tabled: Keut **set-collection** — would track the count by parking the delivered Keut tiles on a 3-space
  "specialty" strip, viable because casks are type-tiles; deferred in favour of Keut = +1-presence.)*

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
| **Q2** | **Hopped Beer** | `G H` | 1 | + London · Bergen · the Hall | 20 |
| **Q3** | **Broyhan** / **Keut** | `G H H` / `G G H` | 1 / 2 | + Novgorod | 6 / 6 |
| **Q4** | **Mumme** | `G H H H` | 3 | all | 8 |
| **Q5** | **Bock** | `G G H H H` *(ungated)* | 3 | all | 4 |

> **Export beers carry fixed quality; deal 3 of 4 each game** (drop a Q3 → full Q3→Q5 climb;
> drop Mumme → no Q4; drop Bock → no Q5 — the variable ladder shape). Bock is **ungated at 2G3H**
> (v1.6: the export ladder is **hops-led** — Mumme/Bock lean hops, giving hops a real demand so Hop
> Garden is a genuine pick vs Granary; totals unchanged, so the Q5 climb timing holds).

> **Expansion — Specialty Beers (opt-in, v1.9).** A New Game toggle adds **three specialty cask designs** to
> the export draft (deal **3 of 7**; OFF by default → base unchanged). Each is **pinned** (a printed
> slot-action, not steerable — generalizing Gruit's pin) with one always-on signature — *characters, not
> rungs* (`DESIGN.md` §9, v1.9):
>
> | Q | Beer (town) | Brew ⚙ | Matures ⚙ | Pinned act | Signature ⚙ | Qty ⚙ |
> |---|---|---|---|---|---|---|
> | **Q2** | **Gose** (Goslar) | `G G` *(no hops)* | 1 | Source | **Salt Trade** — a kontor delivery → **+1 G +1 H** to the owner (liquidity / grain-path) | 8 |
> | **Q3** | **Zerbster** (Zerbst) | `H H H` | 1 | Load | **Parti-Gyle** — brewing it also yields a **free small Gruit** in an open vessel (throughput + the Flight) | 6 |
> | **Q2** | **Duckstein** (Königslutter) | `G H` | 2 | Reach | **Smoke-Hardy** — ships & scores as **+1 quality** (gates + value; reaches Novgorod) | 8 |
> | **Q6** | **Jopenbier** (Danzig) *— capstone, own toggle* | `G G H H H H` | 4 | Source | **Vintage** — SELF-CONTAINED **8★** kontor / **9★** Hall **+ 1★/owner-turn while deployed** (cap 5); always acquirable; **not** in the draft or the Flight | 3 |
>
> Recipe-buy ⚙: Gose `1 G` · Zerbster `1 H` · Duckstein `1 G` · Jopenbier `1 G 1 H`. Everything else
> (destinations, ships, buildings, the Flight, scoring, the clock) is **unchanged** — pure roster content. The
> **Jopenbier capstone** is a **second, independent toggle** (the deep moonshot; its Q6 is display-only — scored
> self-contained so it never touches the Q-keyed tables). Specialty Beers also adds, **completing Option A**:
> **Blending** — a Cellar *action* (combine **two Ready vessel casks → one premium cask at +1 quality**, cap Q5,
> in a freed vessel; no component) — and **three thematic Buildings** in the deck only when the toggle is on
> (`exp:true`): **Salt House** (a cask shipped from here → its owner +1 G +1 H on delivery), **Smoke Kiln**
> (a cask here ships +1 quality, cap Q5), **Parti-Gyle Tun** (deploy a cask here → a free small Gruit).

### B. Ship tiles — neutral, destination-bound hulls (deck of ~20) — *unchanged*
Hull (**Cog** 2 / **Hulk** 3) + a **kontor** destination printed (Bruges/London/Bergen/Novgorod,
5 each; 11 Cog / 9 Hulk). Off a shuffled deck → a **face-up market of 3**. **Commission** (`2 G`)
places one on a slot + a free berth. **Load** casks (yours or a rival's — you choose the
destination, you take `1 G`, the owner scores). **Sails only when full** → every cask delivers,
in load order. The hull returns to the deck; the voyage ticks the clock. **Dock a ship on your
value-building for a rich berth** (§3C). The **Hall is never a ship destination** (Enshrine).

### C. Building tiles — THE NEW FAMILY (owned, on slots; the authored value layer)
Acquired at the Market (buy + place, or earned by delivering to London), **owned by the
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

> **The quality premium (v1.8 "Quality Pays").** The cask value buildings above (Staple · Charters ·
> Burgomaster · Connoisseur · Hanse Diet) are **no longer capped at their flat ★** — a **premium**
> cask banks **+2★ at Q4** and **+3★ at Q5** on top (`+1★ per tier above Q2, for Q4+`), so the climb
> pays (a Bock through Staple = **6**; Bruges base 1 + Staple 6 + Rich Berth 2 = **9**). The premium
> can push a single delivery's banked ★ above the **d6** — the die shows up to 6 and the **premium
> beyond that is read off the cask's printed quality** (no extra component). The **Reliquary/Hall is
> excluded** (its 3/5/7/9 ladder already scales). The *ship* value buildings (Rich Berth · Festkeller)
> stay flat — they reward **volume** (per cask), not quality.

**Verb 2 — TRANSFORM buildings (change the cask or ship).** *The brewer's craft and the harbor's
works — the things a house actually builds.* *(v1.5: **Lagering Cellar** and **Harbor Crane** left
this public family — they were really private engine perks, not slot authorship — and were reborn as
**private improvements**, bought for goods; see §E.)*

| Building | Effect ⚙ | Flavor | Lane |
|---|---|---|---|
| **Malt Kiln** | a **cask** here ships as **+1 quality** (cap Q5) | kiln-dried malt, a finer brew | range |
| **Hop Yard** | a **Q2+** cask here gains **+1 quality** | fresh hops — the beer that travels | range |
| **Cooperage** | a **ship** here carries **+1 cask** | more barrels, a bigger hold | volume · throughput |
| **Customs House** | a **ship** here may **re-flag its destination** (−1 gate) | papers that send cargo anywhere | routing |
| **Gauger's Office** | a **cask** here **re-qualifies up one gate** | the gauger certifies it fit for the long haul | routing · range |
| **Brewmaster's Workshop** | a **cask** here **gains / upgrades its slot-action** | the master tinkers; every cask leaves better | engine · authorship |

- **Owned, but shared (one universal rule):** the **owner** gets the full effect and docks
  first; a **rival** may dock on it too — they get the effect, and **you (owner) take a small
  “wharfage” cut** (⚙ **+1★**, capped per delivery — **points, never a goods-skim toll**). *Build
  the dock; tax the traffic, gently.*
- **Deck ⚙ ~18 tiles across 15 designs, display 4** — value & transform kept roughly balanced,
  every lane hooked. Counts ⚙: singletons for the swingy/identity tiles (Connoisseur · Hanse
  Diet · Festkeller · Reliquary · Almoner's Stall · Gauger · Hop Yard · Workshop), ~2 of the
  workhorses (Rich Berth · Staple Hall · Burgomaster · Malt Kiln · Cooperage ·
  Customs House), Kontor Charter ×1 each (4). The vocabulary axes (so new tiles
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
| Broyhan / Keut | Q3 | `1 H` / `1 G` | `G H H` / `G G H` |
| Mumme | Q4 | `2 H` | `G H H H` |
| Bock | Q5 | `1 G 1 H` | `G G H H H` |

### E. Private brewery improvements — the small private engine (⚙ — buyable for goods)
The few upgrades that are inherently **private** (don't fit a public slot) stay as brewery
improvements, **bought at the CELLAR for goods** (v1.7 — moved from the Market; distinct from the
earned-and-placed Buildings). The **improvements area holds at most 4 tiles** (`IMP_AREA_CAP`) — these plus any
**flipped buildings** (§2).

> **v82 "Scarce Improvements" — a deck + a face-up display of 4 (`IMP_DISPLAY`), not an open catalog.** The
> improvement tiles form a **shuffled deck of `n − 1` copies of each of the 7 types** (`n` = players: 2p → 7
> tiles · 3p → 14 · 4p → 21), feeding a **face-up display of 4** at the Cellar that refills from the deck — the
> same deck/display grammar as the Buildings (§3C). **Only the 4 face-up tiles are buyable**, so the upgrades are
> now a **contested supply** (with `n − 1` copies, the table competes for them and not everyone fits every one).
> A house still can't own two of the same type. Box add: ~**21 improvement tiles** (3 copies × 7 types covers
> up to 4p). *(The Overland "free Improvement" Staple Right is a granted fit, outside the display.)*

| Improvement | Effect ⚙ | Buy ⚙ (v1.7: −1 G) |
|---|---|---|
| **Extra Vessel** | +1 brewing lane (vessels start 2, cap **3**) | `4 G` |
| **Aging Cellar** | maturation **−1 step** | `4 G` |
| **Granary / Hop Garden** | when you gain grain / hops, +1 extra | `3 G` |
| **Harbor Crane** *(v1.5)* | your **Harbor load sets out 2 casks** (not 1) | `3 G` |
| **Lagering Cellar** *(v1.5)* | each of **your turns**, **+1 age** to one maturing cask | `3 G` |
| **Private Quay** *(v1.5)* | load **Ready casks straight from your vessels** onto ships (skip deploy) | `4 G` |

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
| **Bergen** (Bryggen) | Q2 | +1 ★ | **free Reach** (+1 presence, any kontor you've delivered to) | **9 / 5 / 2** (anchor) |
| **Novgorod** (Long Haul) | Q3 | **scales by Q (Q3→2 · Q4→4 · Q5→6)** | **refine** (a maturing cask **+1 age**) | **8 / 5 / 2** |
| **The Hall** (Prestige) | Q2 | **fixed ladder 3/5/7/9 by quality** | — (local **Enshrine**, no ship) | — |

- **Delivery value at a kontor = base + the value-buildings the cask shipped through.** Low by
  default, big when routed through demand you built. *(The v0.16 per-cask value table + export
  premium are folded into this; the Hall keeps a **fixed** ladder — the legible beginner floor.)*
- **Majorities** (kept from v0.16) = the **stable, board-agnostic floor**, by delivered-cask
  count; tiered/ranked; **2p skips 2nd**; ties split. Re-tune vs the new building-driven value ⚙.
- **Benefits (v1.1 — four distinct lanes):** Bruges → **2 goods** (liquidity); London → **a Building
  to hand** (the deliver → author → deliver-better engine loop); Bergen → **a free Reach** (+1 presence,
  feeds majorities); Novgorod → **refine** (a maturing cask +1 age); the **Hall → fixed prestige** (Enshrine).

### H. End-game scoring — the Flight (kept; the Masterpiece cut)
- **The Flight — your range.** Distinct **beers** delivered, **(beers−1)², min 3** (3→4 · 4→9 · 5→16).
  Always exactly 5 beer types exist (Gruit + Hopped + the 3 dealt exports), so the full flight is always
  reachable (v1.0.1 — was "distinct quality tiers," unobtainable at 5 whenever both Q3 exports were
  dealt). The range lane's reward — deliver the full breadth of the house. *(No tile — a strip
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

### Starting setup (symmetric — no seat compensation)
3 `G` / 2 `H` (**equal for every seat** — v1.7: seat compensation removed) · Gruit + Hopped · 2 vessels · **2 charter
contracts** · **1 building in hand** · a warm start (Hulk → Bruges + 1 ship; 1 Ready Gruit) ·
worker placed free turn 1.

---

## 5. Box footprint (⚙ first pass)

| Family | Count ⚙ | Unique |
|---|---|---|
| A Casks | ~60 | 6 beers |
| B Ships (deck) | 20 | 2 hulls × 4 kontore |
| **C Buildings** | **~18** | **~15 designs** |
| D Recipes (cards) | ~16 | 4 (+2 printed starts) |
| E Improvements | ~21 (deck: `n−1`×7; 3×7 at 4p) | 7 |
| Charter contracts | ~16 | 1 |

Plus 1 main board · 1 destination board · 4 brewery boards · wooden cubes (G/H) · presence
barrels · workers · markers · **~8 demand dice (d6)** · quality-boost markers · **~12 developer 3★ chits**
(displaced-building payout, v1.2). **Medium GWT footprint** — substantial, far short of Lacerda.

**Expansions (opt-in, v2.1) — three independent toggles on a shared expansion spine; the base box is unchanged when all off:**
- **Specialty Beers (the Beer Atlas):** +~25 cask tiles (**Gose ×8 · Zerbster ×6 · Duckstein ×8 · Jopenbier ×3**
  the capstone) + 4 recipe designs/player + **3 thematic Building tiles** (**Salt House · Smoke Kiln · Parti-Gyle
  Tun**, in the deck only when on). Also adds **Blending** (a Cellar *action*, no component). + the **Jopenbier**
  Q6 capstone (its own toggle).
- **The Trade Roads (Overland) — STAPLE RIGHTS; REPLACES the kontor majorities.** Components: **1 inland
  network board** — a **tree rooted at HAMBURG** (home). Two roads leave home: **WEST** to the **Bruges gateway**,
  which branches to **London**, **Bergen**, and the **Rhineland**; and **EAST** on the deep haul to **Novgorod**.
  **Bruges** is the lone **no-slots gateway** (its reward is the recipe-or-2-goods on-ramp); **every other node
  carries Staple-Right SLOTS** — the towns **Cologne · Frankfurt** (Rhineland) · **Antwerp** (London) · **Tønsberg**
  (Bergen) · **Visby · Tallinn · Pskov** (East), **and the kontore London · Bergen · Novgorod** (claimed when the
  caravan reaches them, on top of their base sea benefit). Each slotted node is printed with its **quality gate ·
  base delivery ★ · 2–4 SLOTS** (each a distinct one-shot bonus, **flavoured by lane**) · an **overflow** bonus
  (claimed when the slots are full — "never nothing"). **Frankfurt / Pskov** are ◆ **deep** terminals (high gate,
  **scarce**); **Pskov is just a delivery** — one slot (**+8★**, then **+5★** each later visit). The lane menus:
  **Rhineland = craft** (a recipe · a **free Gruit** (Cologne) / **free Q3** (Frankfurt) racked to cellar · a **brew
  action** (choose + pay) · +2 age), **London = infrastructure** (a Building to hand · a **free Improvement** · goods),
  **Bergen = logistics** (a **charter contract** · goods · a vessel), **East = depth/value** (a vessel · +1 quality ·
  big points; **Novgorod** pays ★ = the **delivered cask's quality**); **Frankfurt** = a **free Q3** + a **free
  Enshrine** (the deep craft/prestige outlet). *(v80: each **western** town's **4th slot DUPLICATES its lane
  signature** — a 2nd brew (Cologne/Tønsberg) · a 2nd Building (Antwerp) · a 2nd Improvement (London) · a 2nd vessel
  (Bergen); the East keeps its **+★** there.)* **Active slot count scales n+1 with player count** (2p→3 … 4p→4;
  deep nodes stay 2) — print 4, cover the high slots for fewer players. Per
  player, **presence markers** are dropped into the **slot they claim** (who holds which Staple Right). The
  **caravan rides the Ship action** — *no new tile/station; movement is per VOYAGE (one ship = ONE node per owner),
  gated by cask quality;* then **each cask aboard claims an open slot at the node reached, in LOAD ORDER**. **Bruges
  delivery = a recipe OR 2 goods** (the knowledge on-ramp, no slots). **A charter opens a road at its NEXT node's
  gate** — a **Q2 charter opens the eastern road at Visby (Q2)** (the Novgorod Q3 sea gate no longer walls it off).
  **The Rhine Charter:** a **Q4+** Charter may skip the Bruges node, leaping the caravan **Hamburg→Cologne** (the cask
  still delivers at Bruges). **OUT when this
  module is on:** the kontor **majority tracks/chart** (the contest moves inland). The network board sits beside
  the destinations board.

The map extends the four kontor identities into lane identities (Bruges = the gateway/recipes · Rhineland = craft ·
London = infrastructure · Bergen = logistics · the East = the deep points road). **Reach (breadth)** and **quality
(depth, gated)** both win. *(v2.1 retired the v2.0 founder/recurring-perk town model for the slot-claim model — see
`DESIGN.md` §9; earlier siloed-roads / Option B cuts are on `archive/option-b-inland`.)*

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
