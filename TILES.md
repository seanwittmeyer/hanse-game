# Brewhouses of the Hanse — Tile List (v0.8 — "The Wharf")

> The full deck. Derived from the locked architecture in `DESIGN.md` (**§21, v0.7 — supersedes v0.6/§20 where they conflict**). **Every number is a placeholder ⚙** — this fixes *what each tile is and does*, not final balance. **Five tile families (A casks · B ships · C neutral buildings · D recipes · E upgrades) + the destination board (F) + goals (G).** Casks (A) are the heart; everything else is the lean economy around the **Source → Brew → Age → Ship** work at the Wharf.
>
> **Cut from v0.6:** Fair tiles, route-lane tiles, Privilege tiles (→ folded into E Upgrades/Modifiers), the recipe **card deck** with on-collect boons + the 6-card tuck (→ plain permission tiles), the demand-market value track, the type frontier, aging cubes, and the tableau-twin printing.

---

## 0. Conventions

- **Goods:** `G` = grain, `H` = hops. The only currency (no money; no spendable prestige).
- **Faces:** infrastructure is single-face. **Cask tiles are single working face** now (type · quality · signature action); there is no separate "standing face" — a cask is **scored at its destination**, not flipped. (The v0.6 working↔standing flip is retired with the two value tracks.)
- **The fire rule (one rule for all slots):** when a line is activated, the active player **may use each building in its two slots** — a **cask** (its signature action), a **ship** (a free load), or a **neutral building** (its base action). All resolve **on the active player's turn, for the active player** — **no out-of-turn skims.** Cask & neutral actions are **free and public**.
- **Acquisition (Market, option B):** **recipes & ships** are an *always-available* supply; **upgrades** sit in a small **face-up display** (a row of ~4 ⚙ drawn from a shuffled Upgrade supply, refilling as taken). You **buy** from the display (pay its cost) **or earn** one free by delivering to London/Novgorod — the *same* display, so what you can grab depends on what is face-up. Casks are the exception — you **brew** them from a recipe you hold.
- **The lean (volume vs prestige) is a destination choice,** not a track: ship to a **kontor** for trade value + majorities, or to the **Hall** for prestige. Coupled by shared casks, scarce slots, scarce ships, and the one shared end clock.
- **End clock:** the **Sailed-Ships track fills** → finish the round → score.

---

## A. Cask tiles — the dual-role hero (~60 tiles)

A cask carries: **`TYPE` · `QUALITY` (Q1–Q5, printed, static) · one `SIGNATURE ACTION`.** Brewed from a recipe you hold (never bought), out of the **shared supply with fixed global counts**, so the rare export casks are contested.

**Three states** (`RULES.md` §2): **maturing** (private vessel, ages to Ready) → **on a slot** (a shared slot — your cargo-in-waiting + private inventory + a **public action-building** whose action fires when its line runs) → **delivered** (loaded on a ship, shipped to a destination → scores for its owner → leaves). Shipping converts it; only casks on slots are public/contestable.

### Types, costs & signature actions

> The ladder is **anchored spine + variable export**: **Gruit → Hopped** is fixed and historical (hops is the preservation tech that opens the sea routes); the **export beers each carry a fixed quality** and **3 of the 4 are dealt** each game, so the ladder shape varies. *Which type you brew is an engine choice* — you're deciding which action-building goes on your lines and which destinations you can reach.

| Level | Type | Q | Brew inputs ⚙ | Maturation ⚙ | Signature slot action ⚙ | Reaches (gate) | Qty |
|---|---|---|---|---|---|---|---|
| **L1** | **Gruit Ale** | 1 | `G` | 1 step | **Source** — take 2 goods | Bruges only | 16 |
| **L2** | **Hopped Beer** | 2 | `G H` | 2 | **Age** — advance any 1 of your casks 2 steps | Bruges · London · Bergen · Hall | 20 |
| **L3** | **Broyhan / Keut** | 3 | `G H H` / `G G H` | 2 | **Load** — load a Ready cask onto a ship for free | + Novgorod | 12 |
| **L4** | **Mumme** | 4 | `G G H H` | 3 | **Reach** — +1 presence at a kontor you've delivered to | all | 8 |
| **L5** | **Bock** | 5 | premium; needs **Aging Cellar** | 3 | **Wild** — take any one base verb (Source/Brew/Age/Ship) | all | 4 |

> **Export beers — fixed quality; deal 3 of 4 each game ⚙:** **Broyhan** (Q3) · **Keut** (Q3, a costlier-in-grain alt) · **Mumme** (Q4, Braunschweig) · **Bock** (Q5, Einbeck — needs the Aging Cellar). One is left undealt each game, so the **ladder shape varies**: drop a Q3 → the full Q3→Q4→Q5 climb; drop **Mumme** → no Q4 tier; drop **Bock** → no Q5 tier. The signature action follows the **quality**, not the beer (Q3 Load · Q4 Reach · Q5 Wild), and the two Q3 beers share the Q3 cask pool — only their recipe cost differs.

*Gruit is reach-only and never prestige — cheap engine fuel (its Source action) and cheap local reach (Bruges). That single fact is the Leffe/Westvleteren line drawn in the components.*

---

## B. Ship tiles — owned single-use carriers (~13 tiles)

Built at the **Market** into a slot, **bound to a destination** (inheriting its quality gate). Lifecycle **load → fill → sail:**
- **Load** — via the **Harbor verb** (always available) or a **bonus free load when the ship's line fires** (so you're motivated to place ships on lines you run and to get ships out). You load a cask from a slot — **your own** or a **rival's** (§ interaction in `RULES.md` §5). *(A cask must be deployed to a slot first — the gateway; the **Charter** is the only way to ship straight from a vessel.)*
- **Sail** — the instant the ship is **full** (or you **launch it early** at the Harbor): every cask aboard is **delivered** to the bound destination (scores for its owner), and the **ship tile is consumed onto the Sailed-Ships track** (the end clock). Build another to ship again.

| Ship | Capacity | Build cost ⚙ | Qty ⚙ |
|---|---|---|---|
| **Cog** | 2 | `2 G` | ~8 |
| **Hulk** | 3 | `3 G` | ~5 |
| **Charter** *(no tile — an outside hull)* | 1 | `2 G` per voyage | — |

> Owning ships is the merchant fantasy the design protects: you build the infrastructure, choose its destination, and a full Hulk is a 3-cask burst — still just **one** Sailed-Ships slot, so the clock stays smooth.
>
> **Charter** is the Harbor's always-available relief valve (`RULES.md` §5): pay `2 G` to ship **one** Ready cask (vessel *or* slots) on an immediate single-cask voyage — it delivers and consumes one Sailed-Ships slot like any voyage. At one cask for the fare it's **strictly worse per cask** than a Cog/Hulk, so it never displaces owning ships; it exists so the tight slots can't deadlock. No tile, no qty — just an action.

---

## C. Neutral building tiles — the shared base, seeded on the slots (~6 designs ⚙)

Placed in perimeter slots **at setup** (shared, permanent — **2–3 in play per game ⚙**). They keep the slots alive from turn 1: whoever runs their line may use the action, free. They are the "everyone has the base; your casks/ships are the better versions" floor (the *Great Western Trail* neutral-building idea).

| Neutral building | Action (active player) ⚙ |
|---|---|
| **Market Stall** | take 1 good |
| **Cooper** | advance one of your casks 1 step |
| **Crane** | load one Ready cask onto a ship for free |
| **Counting-House** | convert up to 2 goods `G↔H` |
| **Towncrier** | look at / draw a goal-objective ⚙ |
| **Almshouse** | +1 toward a majority you already hold ⚙ |

---

## D. Recipe tiles — permission to brew a type (~10 tiles ⚙)

A small face-up Market supply. A recipe is **only** *a brewable type + its `G/H` cost* — the v0.6 on-collect boons, the 6-card tuck, and frontier-gating are **cut**. Acquired at the **Market**; **permanent** (brewing never consumes it).

| Recipe | Type | Buy cost ⚙ | Brew cost ⚙ |
|---|---|---|---|
| *(start, printed)* | **Gruit** | — | `G` |
| *(start, printed)* | **Hopped** | — | `G H` |
| **Broyhan** | Q3 export | `1 G` | `G H H` |
| **Keut** | Q3 export | `1 G` | `G G H` |
| **Mumme** | Q4 export | `1 G 1 H` | `G G H H` |
| **Bock** | Q5 export | `2 G` | premium (needs Aging Cellar) |

> Start of game: **Gruit + Hopped** (fixed, symmetric — everyone brews turn 1, and *gaining an export recipe means more*). **Print all four export recipes** (you need the physical card for each), but **only 3 of the 4 are dealt into any given game** — the recipes you can buy at the Market this game are the dealt three. They are the climb to the rich destinations.

---

## E. Upgrade tiles — the private brewery engine (Rooms + Modifiers, ~24 ⚙)

Installed on your brewery board. **Earned mainly by delivering** (the London / Novgorod destination benefits) and bought only at a **dear price (4–5 `G` ⚙**, ≈ a kontor delivery's goods) at the Market — so the cycle **deliver → upgrade → brew better → deliver better** is the privileged path, with buying a costed bootstrap/fallback.

### Rooms (permanent capability)
| Room | Effect ⚙ |
|---|---|
| **Extra Vessel** | +1 brewing lane (start 2, cap 4) |
| **Aging Cellar** | maturation costs 1 fewer step; **unlocks the L5 export** |
| **Warehouse** | +4 goods storage |
| **Quay** | a stronger Harbor (e.g., load 2 in one Harbor visit, or deploy further) ⚙ |
| **Cooperage** | a free load each turn ⚙ |

### Modifiers (asymmetric perks — these subsume the old Privileges)
| Modifier | Effect ⚙ |
|---|---|
| **Granary Right** | when you gain grain, +1 extra |
| **Hop Garden** | when you gain hops, +1 extra |
| **Royal Patent** | your ships sail with +1 capacity |
| **Staple Right** | +1 good when you deliver to a kontor |
| **Guild Seat** | +1 advance point at the Cellar |
| **Burgher Status** | +majority help at scoring ⚙ |

---

## F. Destinations — *where you ship is the lean* (the destination board)

All **open from the start** (route-lane tiles cut — variety over limitation). Differentiated by a **quality gate** (the only climb-limiter — better places want better beer) and a unique **benefit**. **The cask's owner always scores the delivery and picks any offered benefit — even when a rival shipped it.**

| Destination | Gate ⚙ | Delivery value ⚙ | Benefit (owner picks where offered) ⚙ | Majority — 1st/2nd/3rd ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | low (e.g. +2) | **liquidity** — gain goods | small (2) |
| **London** (Steelyard) | Q2 | mid (e.g. +3) | **the engine** — take an Upgrade from the display | small (2) |
| **Bergen** (Monopoly) | Q2 | mid (e.g. +3) | *(no upgrade)* — its whole draw is the majority | **richest (10/6/3)** |
| **Novgorod** (Long Haul) | Q3 | **high** (e.g. +5) | premium — top value **+ take an Upgrade from the display** | small (3) |
| **The Hall** (Prestige) | Q2 | **prestige** ∝ quality (e.g. Q×2) | out of commerce — the scarcity/Westvleteren payout | — |

> **Majorities are tiered & ranked (Lacerda-style):** 1st/2nd/3rd by delivered-cask count take the kontor's tiers; **2-player skips 2nd** (winner-take-all); ties split the occupied tiers ⚙. The rich majority is **concentrated at Bergen** (its monopoly identity) so the majority *lean* is viable without the broad tiered payouts over-feeding the volume lean and starving prestige (sim-validated). **London (engine — accessible upgrades)** and **Bergen (majority, no upgrade)** are now distinct, not clones.
> **Reach** = your delivered casks across the kontore (value + majorities, the volume lean). **Prestige** = casks shipped to the Hall (the scarcity lean). They never convert; the lean is chosen as you read the board.

---

## G. Goal / objective tiles — the variety layer (~9 ⚙, best few score)

A small pool (shared draft or per-player ⚙) rewarding different shapes, so the winning engine varies by game — the *Great Western Trail* blend ideal. **Only your best few score** ⚙ (keeps goals a bonus, ~⅓ of a score, not the game), and they're authored so a one-note rush fills few of them.

| # | Goal (end-game) ⚙ | Pulls you toward |
|---|---|---|
| 1 | +X per **distinct type** delivered | breadth / climb |
| 2 | +X per cask delivered to **one** kontor | focus / majority |
| 3 | +X per **Q3+** cask delivered | the export |
| 4 | +X per **ship you sailed** | the merchant engine |
| 5 | +X per cask shipped to the **Hall** | prestige |
| 6 | +X per **kontor where you hold presence** | spread |
| 7 | +X per **Upgrade** on your brewery | engine depth |
| 8 | +X per **majority** you hold | commitment |
| 9 | +X flat | safe / scarcity |

---

## Deck size — the reel-in, in numbers

| Family | Count ⚙ | Unique designs |
|---|---|---|
| A Casks | ~60 | ~5 types × actions |
| B Ships | ~13 | 2 (Cog · Hulk) |
| C Neutral buildings | ~6 in box (2–3 in play) | ~6 |
| D Recipes | ~10 | ~6 (Gruit · Hopped · Broyhan · Keut · Mumme · Bock) |
| E Upgrades (Rooms + Modifiers) | ~24 | ~11 |
| G Goals | ~9 | ~9 |
| **Tile total** | **~120** | **~30 unique** |

**~120 tiles, ~30 unique designs** — *Great Western Trail* tile-scale, down from v0.6's ~150+ across more families. The only "deck-like" thing is the recipe/goal Market supply, and those are plain face-up tiles (no hidden draws, per the no-cards / determinism constraint).

---

## Open tuning notes

1. **Cask action strengths** (Source 2 / Age 2 / free Load / +1 presence / Wild) — chunky without making the slots swingy; whether *every* cask bears an action.
2. **Destination values / gates / tiered-majority tiers** and the **upgrade** payouts from London/Novgorod (Bergen = majority, no upgrade) — the variety heart. *(v0.9: majorities are tiered/ranked, concentrated at Bergen; see `CHANGELOG`/`DESIGN §21`.)*
3. **Neutral-building set & count in play**, scaling by player count (ring pressure).
4. **Maturation lengths** vs the Sailed-Ships clock — the pace economy.
5. **Goal count & best-few cap** — the blend lever; shared vs personal.
6. **Rival-ship dials:** loader bonus + best-vs-forced destination value gap (non-destructive interaction).
