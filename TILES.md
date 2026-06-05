# Brewhouse of the Hanse — Tile List (v0.7 — "The Wharf")

> The full deck. Derived from the locked architecture in `DESIGN.md` (**§21, v0.7 — supersedes v0.6/§20 where they conflict**). **Every number is a placeholder ⚙** — this fixes *what each tile is and does*, not final balance. **Five tile families (A casks · B ships · C neutral buildings · D recipes · E upgrades) + the destination board (F) + goals (G).** Casks (A) are the heart; everything else is the lean economy around the **Source → Brew → Age → Ship** loop.
>
> **Cut from v0.6:** Fair tiles, route-lane tiles, Privilege tiles (→ folded into E Upgrades/Modifiers), the recipe **card deck** with on-collect boons + the 6-card tuck (→ plain permission tiles), the demand-market value track, the type frontier, aging cubes, and the tableau-twin printing.

---

## 0. Conventions

- **Goods:** `G` = grain, `H` = hops. The only currency (no money; no spendable prestige).
- **Faces:** infrastructure is single-face. **Cask tiles are single working face** now (type · quality · signature action); there is no separate "standing face" — a cask is **scored at its destination**, not flipped. (The v0.6 working↔standing flip is retired with the two value tracks.)
- **The fire rule (one rule for the whole ring):** when a line is activated, the active player **may use each building on it** — a **cask** (its signature action), a **ship** (a free load), or a **neutral building** (its base action). All resolve **on the active player's turn, for the active player** — **no out-of-turn skims.** Cask & neutral actions are **free and public**.
- **Acquisition:** recipes, ships, and (some) upgrades enter from a **face-up Market row**, paid in goods at the **Market** cell. Casks are the exception — you **brew** them from a recipe you hold, out of the shared supply.
- **The lean (volume vs prestige) is a destination choice,** not a track: ship to a **kontor** for trade value + majorities, or to the **Hall** for prestige. Coupled by shared casks, scarce wharf slots, scarce ships, and the one shared end clock.
- **End clock:** the **Sailed-Ships track fills** → finish the round → score.

---

## A. Cask tiles — the dual-role hero (~60 tiles)

A cask carries: **`TYPE` · `QUALITY` (Q1–Q5, printed, static) · one `SIGNATURE ACTION`.** Brewed from a recipe you hold (never bought), out of the **shared supply with fixed global counts**, so the rare summit casks are contested.

**Three states** (`RULES.md` §2): **maturing** (private vessel, ages to Ready) → **on the wharf** (a shared ring slot — your cargo-in-waiting + private inventory + a **public action-building** whose action fires when its line runs) → **delivered** (loaded on a ship, shipped to a destination → scores for its owner → leaves). Shipping converts it; only wharf casks are public/contestable.

### Types, costs & signature actions

> The ladder is **anchored spine + variable summit**: **Gruit → Hopped** is fixed and historical (hops is the preservation tech that opens the sea routes); **L3–L5 are dealt** from the Hanse summit roster each game. *Which type you brew is an engine choice* — you're deciding which action-building goes on your circuit and which destinations you can reach.

| Level | Type | Q | Brew inputs ⚙ | Maturation ⚙ | Signature wharf-action ⚙ | Reaches (gate) | Qty |
|---|---|---|---|---|---|---|---|
| **L1** | **Gruit Ale** | 1 | `G` | 1 step | **Source** — take 2 goods | Bruges only | 16 |
| **L2** | **Hopped Beer** | 2 | `G H` | 2 | **Age** — advance any 1 of your casks 2 steps | Bruges · London · Bergen · Hall | 20 |
| **L3** | *summit ⚙* | 3 | `G H H` | 2 | **Load** — load a Ready cask onto a ship for free | + Novgorod | 12 |
| **L4** | *summit ⚙* | 4 | `G G H H` | 3 | **Reach** — +1 presence at a kontor you've delivered to | all | 8 |
| **L5** | *summit ⚙* | 5 | premium; needs **Aging Cellar** | 3 | **Wild** — take any one base verb (Source/Brew/Age/Ship) | all | 4 |

> **Summit roster (dealt to L3–L5 each game) ⚙:** **Bock** (Einbeck), **Mumme** (Braunschweig), **Broyhan** (Hannover), **Keut** (Low Countries) — each could carry a light hook (e.g. Bock needs the Aging Cellar; Mumme = slow but rich). The generic "summit" labels above are reskinned per game.

*Gruit is reach-only and never prestige — cheap engine fuel (its Source action) and cheap local reach (Bruges). That single fact is the Leffe/Westvleteren line drawn in the components.*

---

## B. Ship tiles — owned single-use carriers (~13 tiles)

Built at the **Market** into a wharf slot, **bound to a destination** (inheriting its quality gate). Lifecycle **load → fill → sail:**
- **Load** — via the **Harbor verb** (always available) or a **bonus free load when the ship's line fires** (so you're motivated to place ships on lines you run and to get ships out). You may load **your own** Ready/wharf casks or a **rival's wharf cask** (§ interaction in `RULES.md` §5).
- **Sail** — the instant the ship is **full** (or you **launch it early** at the Harbor): every cask aboard is **delivered** to the bound destination (scores for its owner), and the **ship tile is consumed onto the Sailed-Ships track** (the end clock). Build another to ship again.

| Ship | Capacity | Build cost ⚙ | Qty ⚙ |
|---|---|---|---|
| **Cog** | 2 | `2 G` | ~8 |
| **Hulk** | 3 | `3 G` | ~5 |
| **Charter** *(no tile — an outside hull)* | 1 | `2 G` per voyage | — |

> Owning ships is the merchant fantasy the design protects: you build the infrastructure, choose its destination, and a full Hulk is a 3-cask burst — still just **one** Sailed-Ships slot, so the clock stays smooth.
>
> **Charter** is the Harbor's always-available relief valve (`RULES.md` §5): pay `2 G` to ship **one** Ready cask (vessel *or* wharf) on an immediate single-cask voyage — it delivers and consumes one Sailed-Ships slot like any voyage. At one cask for the fare it's **strictly worse per cask** than a Cog/Hulk, so it never displaces owning ships; it exists so the tight ring can't deadlock. No tile, no qty — just an action.

---

## C. Neutral building tiles — the shared base, seeded in the ring (~6 designs ⚙)

Placed in perimeter slots **at setup** (shared, permanent — **2–3 in play per game ⚙**). They keep the wharf alive from turn 1: whoever runs their line may use the action, free. They are the "everyone has the base; your casks/ships are the better versions" floor (the *Great Western Trail* neutral-building idea).

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
| **Recipe · Summit L3** | L3 | `1 G` | `G H H` |
| **Recipe · Summit L4** | L4 | `1 G 1 H` | `G G H H` |
| **Recipe · Summit L5** | L5 | `2 G` | premium (needs Aging Cellar) |

> Start of game: **Gruit + Hopped** (fixed, symmetric — everyone brews turn 1, and *gaining a summit recipe means more*). The summit recipes are the climb to the rich destinations.

---

## E. Upgrade tiles — the private brewery engine (Rooms + Modifiers, ~24 ⚙)

Installed on your brewery board. **Earned mainly by delivering** (the London / Bergen destination benefits) and partly bought at the Market — closing the loop **deliver → upgrade → brew better → deliver better**.

### Rooms (permanent capability)
| Room | Effect ⚙ |
|---|---|
| **Extra Vessel** | +1 brewing lane (start 2, cap 4) |
| **Aging Cellar** | maturation costs 1 fewer step; **unlocks the L5 summit** |
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

| Destination | Gate ⚙ | Delivery value ⚙ | Benefit (owner picks where offered) ⚙ | Majority ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | low (e.g. +2) | **liquidity** — gain goods | small |
| **London** (Steelyard) | Q2 | mid (e.g. +3) | **a brewery Upgrade** (Room/Modifier) | mid |
| **Bergen** (Monopoly) | Q2 | mid (e.g. +3) | **a Modifier** + the richest **majority** | **biggest** |
| **Novgorod** (Long Haul) | Q3 | **high** (e.g. +5) | premium-only — pure value | mid |
| **The Hall** (Prestige) | Q2 | **prestige** ∝ quality (e.g. Q×2) | out of commerce — the scarcity/Westvleteren payout | — |

> **Reach** = your delivered casks across the kontore (value + majorities, the volume lean). **Prestige** = casks shipped to the Hall (the scarcity lean). They never convert; the lean is chosen as you read the board.

---

## G. Goal / objective tiles — the variety layer (~9 ⚙, best few score)

A small pool (shared draft or per-player ⚙) rewarding different shapes, so the winning engine varies by game — the *Great Western Trail* blend ideal. **Only your best few score** ⚙ (keeps goals a bonus, ~⅓ of a score, not the game), and they're authored so a one-note rush fills few of them.

| # | Goal (end-game) ⚙ | Pulls you toward |
|---|---|---|
| 1 | +X per **distinct type** delivered | breadth / climb |
| 2 | +X per cask delivered to **one** kontor | focus / majority |
| 3 | +X per **Q3+** cask delivered | the summit |
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
| D Recipes | ~10 | ~5 |
| E Upgrades (Rooms + Modifiers) | ~24 | ~11 |
| G Goals | ~9 | ~9 |
| **Tile total** | **~120** | **~30 unique** |

**~120 tiles, ~30 unique designs** — *Great Western Trail* tile-scale, down from v0.6's ~150+ across more families. The only "deck-like" thing is the recipe/goal Market supply, and those are plain face-up tiles (no hidden draws, per the no-cards / determinism constraint).

---

## Open tuning notes

1. **Cask action strengths** (Source 2 / Age 2 / free Load / +1 presence / Wild) — chunky without making the ring swingy; whether *every* cask bears an action.
2. **Destination values / gates / majority bonuses** and the **upgrade/modifier** payouts from London/Bergen — the variety heart.
3. **Neutral-building set & count in play**, scaling by player count (ring pressure).
4. **Maturation lengths** vs the Sailed-Ships clock — the pace economy.
5. **Goal count & best-few cap** — the blend lever; shared vs personal.
6. **Rival-ship dials:** loader bonus + best-vs-forced destination value gap (non-destructive interaction).
