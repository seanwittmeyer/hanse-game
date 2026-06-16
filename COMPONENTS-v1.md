# Brewhouses of the Hanse — v1.0 "Demand" — Components (FIRST PASS)

> **Status: design spec, first pass (2026-06-16).** The physical manifest for v1.0. Pairs with
> `RULES-v1.md` (operation) and `V1-PLAN.md` (why). Numbers are placeholders ⚙. The live game
> is v0.16.1 (`COMPONENTS.md`, `archive/play.html`). This document **designs the one new
> component family — the Demand deck — in full**, because that is where v1.0 spends its
> variability budget (content under one grammar, not new rules).

---

## 0. What changed from v0.16 (the manifest delta)

| Family | v0.16 | v1.0 |
|---|---|---|
| Casks | quality + slot-action | **same** (Gruit fixed to Source; Q2+ draw an action) |
| Ships | ~20 neutral destination-bound hulls | **same** |
| **Neutral buildings** | 2–3 seeded on the ring | **REPLACED by Demand tiles** (owned, installed on destinations) |
| **Demand tiles** | — | **NEW deck** (§C) — the authored value landscape |
| Recipes | Gruit/Hopped + 4 export beers | **same** (cask-action "Draw" rethemed, §F) |
| Upgrades | 6 Rooms + 6 Modifiers | **mostly same**, +2 demand-lane upgrades, 1 retheme (§E) |
| **Goals** | 3 dealt, best 2 score | **CUT** (dissolved into the Demand board) |
| Player board | vessels + upgrade slots | **same** + the **floor** is now a used surface (§2) |
| Destinations | value table + majority + benefit | **base value (small/flat) + majority + benefit + a demand stack** (§G) |
| The per-cask **value table** | `Qn = n ★ + dest modifier` | **CUT** — value comes from demand (§C, `RULES-v1.md` §5c) |

---

## 1. Boards

### 1a. Main board — two coupled layers
- **The Wharf** (tactile commons): the 2×2 of stations (A Market · B Brewhouse · D Cellar ·
  C Harbor) ringed by **8 slots**. Holds casks + ships. Unchanged from v0.16.
- **The Demand Board** (strategic layer): the **5 destinations** (Bruges · London · Bergen ·
  Novgorod · the Hall), each printed with its gate / base value / majority track / **demand
  stack** (2–3 tile slots ⚙). This is where buildings are installed and value is authored.
- **The Sailed-Ships track** (the clock): player-scaled length (~7/11/14/17 ⚙).
- **Majority tracks**: one per kontor (delivered-cask count markers).

### 1b. Player brewery board (private)
- **Vessels** — start 2, cap 3 (one Extra Vessel upgrade). Maturing casks live here.
- **Upgrade slots** — installed Rooms/Modifiers.
- **The Floor** — *now a live surface:* your maturing casks double as **private fallback
  actions** (`RULES-v1.md` §7). The board should mark "tap a maturing cask's action" as the
  occupancy alternative to the toll.
- Recipe area, goods store (cap 8, +4 Warehouse), charter-contract holder.

---

## 2. Goods & tokens

- **`G` grain · `H` hops** — the only currency (no money, no spendable prestige). Cap **8** ⚙.
- **★ points** — score only (delivery value, majorities, Flight, Masterpiece, Hall). Tracked
  on a score track / pad.
- **Worker** (1/player) · **vessel/cask markers** · **majority markers** · **Sailed-Ships
  marker** · **demand-claim markers** (to flip a spike to standing) · **charter contracts**.

---

## A. Casks (quality + slot-action) — unchanged

- A cask is **quality Q1–Q5** + **one signature slot-action** drawn at brew (Gruit pinned to
  **Source +2 goods**; Q2+ draw from the action pool §F). Three states (`RULES-v1.md` §3).
- Quality distribution / count: carry v0.16 ⚙ (the brew determines quality via recipe; casks
  are generic markers that take a quality + an action token, as in `play.html`).

## B. Ships (neutral, destination-bound) — unchanged

- **~20 hulls** ⚙: **Cog** (cap 2) · **Hulk** (cap 3); **kontore only** (Bruges/London/Bergen/
  Novgorod, 5 each; the Hall is reached by Enshrine, never a ship). Face-up market of **3**.

## C. Demand tiles (THE NEW FAMILY — owned, installed on destinations)

The authored value landscape. A demand tile is **acquired at the Market** (`⚙ G` by tier),
**installed onto a destination's demand slot**, and **owned** by the installer. It reads one
**pattern → bounty** under a single grammar, so any tile resolves from one sentence:

> **"When a cask matching `<pattern>` delivers here, its owner scores `<bounty>`; and you, the
> tile's owner, take the kickback."** Most tiles are **two-sided: spike (first match claims it)
> → standing (smaller, every match after).**

- **Universal rules (not per-tile):** the **owner kickback** = ⚙ **+1 `G` per *rival*
  delivery** into the tile (capped — *position + a small kickback, never a scaling toll*); and
  the owner is best placed to **claim the spike first**.

### The starter Demand deck (designed — ⚙ counts/values)

| # | Tile | Pattern (matches) | Spike (first) | Standing (after) | Notes |
|---|---|---|---|---|---|
| 1 | **The Thirst** | any cask | — | **+1 ★ / quality level** | pure standing; rewards high-Q broadly · ×3 |
| 2 | **Craving Q2** | a Q2 cask | **+4 ★** | +2 ★ | the on-ramp spike · ×2 |
| 3 | **Craving Q3** | a Q3 cask | **+5 ★** | +2 ★ | ×2 |
| 4 | **Craving Q4** | a Q4 cask | **+6 ★** | +3 ★ | ×2 |
| 5 | **Connoisseur (Q5)** | a Q5 cask | **+8 ★** | +3 ★ | the rare big read · ×1 |
| 6 | **Premium** | a Q4+ cask | **+5 ★** | +3 ★ | threshold, not exact · ×2 |
| 7 | **The Hub** | any cask | **+3 ★** | +1 ★ | + owner **+1 `G`**/rival delivery (liquidity) · ×2 |
| 8 | **Hopped Style** | any Q2+ ("hopped") | **+4 ★** | +2 ★ | a style demand · ×2 |
| 9 | **Festival** | any 2 casks (same delivery/ship) | **+6 ★** split | +2 ★ | rewards full ships to one room · ×1 ⚙ |
| 10 | **Off-Season** | (seed only) Q3+ → **+0** | — | — | a *cold room* — **neutral setup seed**, not player-installed (denial is out of scope; ⚙) · ×2 |

*Deck size ≈ **18–20 tiles** ⚙ across these designs. The display is **4 face-up**; refills from
the deck.* The vocabulary axes (so new tiles stay one-grammar content): **what matches** (exact
Qn / threshold Q≥n / any / style) × **bounty shape** (flat ★ / ★-per-quality / claim-spike) ×
**who benefits** (owner kickback variants). Add tiles by recombining axes — never by new rules.

> **Why this is the soul:** a Q5 is worth **8 ★** into a *Connoisseur* and **base only** into a
> *Hub* — the **right beer for the right room**, manifested by what the players built. The
> *spike* is the race (read it, ship first); the *standing* is the lasting authored value; the
> *kickback* makes authoring pay even when a rival fills your room.

## D. Recipes — unchanged

- **Gruit** (Q1, grain only — the perishable local on-ramp; fixed Source action) · **Hopped**
  (Q2 — travels). Export beers (deal 3 of 4): **Broyhan** Q3 · **Keut** Q3 · **Mumme** Q4 ·
  **Bock** Q5 (un-gated, 3G2H — a Q5 is now worth chasing only where demand wants it, which is
  the natural throttle the v0.13–v0.14 work was groping for).

## E. Upgrades — Rooms + Modifiers (earned by delivering to London/Novgorod)

Carry the v0.16 set, with the clean-sheet edits:

**Rooms (capability):** Extra Vessel · Aging Cellar (−1 step) · Warehouse → **retheme to
*Factor's Office*** (the near-dead storage upgrade becomes a demand-lane hook: **hold up to 2
demand tiles in hand / install for −1 `G`**) · Quay (load 2/Harbor) · Cooperage (+1 load) ·
Trophy Room (enshrine ×2).

**Modifiers (asymmetric perk):** Granary Right (+1 `G` on grain gains) · Hop Garden (+1 `H`) ·
Patron's Favor (+1 good on enshrine — the prestige hook) · Staple Right (+1 good per kontor
delivery) · Guild Seat (+1 age point) · Burgher Status (+1 presence at every reached kontor —
the majority hook) · **NEW *Guild Charter*** (your demand **kickbacks double**, and you may
claim a spike you didn't load — the demand-authorship hook).

> Coverage after edits: **demand lane** now has *Factor's Office* + *Guild Charter*;
> **majority** has *Burgher Status* + *Staple Right*; **prestige** has *Trophy Room* +
> *Patron's Favor*; **deep/throughput** has *Extra Vessel/Aging Cellar/Quay/Cooperage*. The
> v0.16 majority-coverage gripe is resolved by giving the new lane its own hooks. Supply ⚙ ~2
> each (contestable display). **No goods-buy** — earned by delivery only.

## F. The cask-action pool (drawn at brew, Q2+) — one retheme

`Source (+2 goods)` · `Age (age 1 cask 2 steps)` · `Load (free load onto a ship)` · `Reach
(+1 presence at a reached kontor — majority help)` · `Convert (2 goods G↔H)` · **`Survey`**
(**rethemed from "Draw a goal"** → *draw 1 demand tile to hand*, the authorship feeder) ·
`Wild (any base action — Q4+ only)`.

## G. Destinations (the rooms) — the reconceived table

| Destination | Gate ⚙ | **Base value** ⚙ | Demand slots ⚙ | Benefit on delivery ⚙ | Majority (1st/2nd/3rd) ⚙ |
|---|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | **+1 ★** | 3 | 2 goods, owner's choice (liquidity) | **4 / 2 / 0** |
| **London** (Steelyard) | Q2 | **+1 ★** | 2 | **take 1 Upgrade** (the engine room) | **5 / 3 / 1** |
| **Bergen** (Bryggen) | Q2 | **+1 ★** | 2 | 2 goods, owner's choice | **9 / 5 / 2** (anchor) |
| **Novgorod** (Long Haul) | Q3 | **+2 ★** | 2 | **take 1 Upgrade** (premium) | **8 / 5 / 2** |
| **The Hall** (Prestige) | Q2 | **prestige ladder ⚙ 4/6/8/10 by quality** | — (Enshrine) | — | — |

- **Base value is small and roughly flat** — the *guaranteed* part of a delivery. **The variable
  value is the demand** installed there (§C). This is the literal relocation of v0.16's
  `Qn = n ★ + modifier` onto the board.
- **Benefits unchanged** — Bruges/Bergen → goods (liquidity); London/Novgorod → an Upgrade (the
  deliver→earn-upgrade engine, the only upgrade path). The **Hall** = prestige via Enshrine.
- **Majorities** carried from v0.16 as the **stable floor** — re-tune once demand value is live
  (the floor's weight relative to demand spikes has changed; ⚙).
- **Demand-stack capacity** is a contested resource — only 2–3 slots per room, so **who gets to
  author London** is itself a fight (more so than the wide-open Bruges). ⚙ a key dial.

## 3. Removed components (the clean-sheet cuts)

- **Goal tiles** (the whole deck) — the Demand board is the shifting goal set.
- **Neutral building tiles** — replaced by owned Demand tiles.
- **The per-cask value table** (`Qn = n ★`, export premium Q4+1/Q5+2, Novgorod-pays-high) —
  value is now demand-authored.

## 4. Component-count summary (⚙ first pass)

Boards: 1 main (Wharf + Demand Board + clock + majority tracks) · N player brewery boards.
Tiles: casks (carry v0.16) · ships ~20 · **Demand ~18–20 (NEW)** · recipes 6 · upgrades ~13
designs ×~2 · charter contracts (supply). Tokens: workers · goods cubes (`G`/`H`) · markers
(majority, sailed-ships, demand-claim) · score track.

## 5. Open / to-tune (component dials, mirrors `RULES-v1.md`)

1. **Demand-tile values & deck mix** (§C) — spike vs standing magnitudes vs the small base; deck
   size; display width (4). *The single most important tuning surface.*
2. **Demand-stack capacity** (2 vs 3) per room — the authorship-contention dial.
3. **Owner kickback** form/size (+1 `G` vs +1 ★; cap).
4. **Base values** (flat +1 vs slight quality slope) — how spiky vs how forgiving.
5. **Majority re-tune** against board-driven value (the floor's relative weight).
6. **Upgrade supply/contest** and whether the 2 new demand-lane upgrades pull their weight.
7. **Hall ladder** (scaled vs flat) and **Masterpiece** (keep/cut).
8. **Off-Season / defeaters** — neutral seeds only, or a (risky) player denial lever? Default:
   neutral seeds, to stay non-take-that.
