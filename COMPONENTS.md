# Brewhouses of the Hanse — Components (v4.2 “Tariff”)

> **v4.2 (designer-ruled 2026-07-26 — the second ruling off playtest #23):** the **fee rides
> the ITEM** — every acquirable recipe card, specialist tile and building tile prints its own
> **wharf fee** ⚙ (a chipless building is free; kontor prizes always free; never a fee to USE
> a building), and **Novgorod’s mat prints value = the die +2★** (the refine prize is out).
>
> **v4.1 (designer-ruled 2026-07-26, off human playtest #23):** **out of the box — the
> Sailed-Ships track** (the tally dice are the ONE end clock); Scrivener’s Hall, the Hiring
> Post and the three acquisition load-bonuses now **print the 1 `G` wharf fee** (paid at the
> wharf, free at the kontor).
>
> **v4.0 (designer-ruled 2026-07-21, off `V4-STREAMLINE.md`):** the streamline keystone. **The
> tally die is the whole cask** — maturation marker, gate, value, presence and clock in one
> number. **Out of the box:** the Hall board · all 12 Privileges · charter contracts · owner
> house tokens · cask cubes · the cask tile’s aging face. **Into the box:** the **Skute**
> (1-berth hull) · the **score track** · single-faced cask tiles printing a **START-DIE** value.
> The v3.4 manifest is preserved in git history.

> **The box manifest.** What is *in* the game, line by line. **Every count is a placeholder ⚙.**
>
> - Operational rules: `RULES.md` (v4.2). Design rationale & history: `DESIGN.md` §9; the ruled v4 plan `V4-STREAMLINE.md`.
> - The live build is `play.html` — **v4.2 “Tariff”** (`KEY hanse-v42c`) — the source of truth on values and behaviour. This doc enumerates the physical pieces that implement it.
> - **The print kit is `printables2.html` — the only kit in use** (components.js data is v4.2; the sheet layouts are the P4 refresh).

---

## 1. Conventions

- **Goods:** `G` = grain, `H` = hops — the only currency. Storage cap 8 ⚙.
- **A line** = two stations + the two slots beside them. A slot holds **a building (bottom)
  and/or a ship (top)** — never casks (there is no deploy).
- **The die is the cask:** set at brew to the printed start value (= quality − aging steps),
  turned up by age points, **Ready at the quality**, lifted past it only by buildings at load
  (cap 6), **parked at the kontor on delivery** — pips = banked ★, body = presence + the clock.
- **End clock (v4.1 — the dice alone):** the **14th tally die a house parks** sets the final
  round; dice never return, so the runway is public and countable. `MAX_ROUND` 25 ⚙ is the
  rules-side backstop; sails end nothing.

---

## 2. Boards

| Board | Qty | Holds |
|---|---|---|
| Main board — **the Wharf** | 1 | 2×2 stations, each printing **ONE action** (Market *Source 2* · Brewhouse *Brew* · Cellar *Age 3* · Harbor *Commission 1G, ★ = berths*), ringed by 8 slots (a building seat + a ship seat each). |
| **Destinations board** | 1 | The four kontor panels — Bruges · London · Bergen · Novgorod — each printing its **gate (die N+)**, its **prize** (recipe / building / specialist — Novgorod instead prints **value = the die +2★**), its **majority tiers** (4/2/0 · 5/3/1 · 9/5/2 · 8/5/2 ⚙) and the **parking field** where delivered dice stand (pips face-up = the banked ★ audit). *(The kit cuts it as one narrow board pairing with Market & Stores.)* |
| Player boards | 4 | **3 vessel slots** (1–2 open; the 3rd under a printed cover “2nd beer”) + **2 specialist seats** (1st open; the 2nd under “3rd beer”). Recipe cards sit beside it. Goods cap 8 printed. |
| **Score track** ring | 1 | A **50-cell ring** (0–49; a lap marker flips +50) wrapping the Market & Stores rim + 1 disc per house — the bank (+3★ builds · ★ = berths on commissions · 1★ bumps) and delivery ★ as they land. *(New in v4.0 — the hard line demands a home for banked points.)* |
| Supply board *(kit)* | 1 | The displays: ships 4 · buildings 4 · specialists 4 · the export recipe row — ringed by the score track. *(The Sailed-Ships clock left with v4.1.)* |

## 3. Common supply

| Component | Qty ⚙ | Purpose |
|---|---|---|
| Grain tokens | 60 | currency |
| Hops tokens | 40 | currency |
| **Tally dice** | **56** (14 × 4 colours) | the cask/presence/clock component — see §1 |
| Score discs (movers) | 4 (1/colour) | the score ring (flip/mark at +50) |
| Worker pawns | 4 (1/colour) | the stations |
| +1-berth / gate markers | — | none: the Kiln turns the die itself; Cooperage/Customs read from the tile |

## 4. Cask tiles (single-faced, 2.4×1″ ⚙)

Each prints: the beer’s name/art · **quality Q1–Q5** · the **START-DIE value** (a printed die
face inside the die seat) · one **load-bonus action** (assigned at brew from the pile tops —
the printed mix per quality is the pile; the three *acquisition* bonuses read **“· its fee”**
— each item’s price is printed on its own card/tile ⚙, v4.2). Shared pool, brewed never
bought; **min 6 tiles/type** (staples deeper: Gruit 16 · Hopped 12 ⚙).

| Beer | Q | Steps | Start die | Brew | Tiles ⚙ |
|---|---|---|---|---|---|
| Gruit | 1 | 0 (Ready at brew) | 1 | `G` | 16 |
| Hopped | 2 | 1 | 1 | `G H` | 12 |
| Broyhan | 3 | 1 | 2 | `G H H` | 6 |
| Keut *(+1 presence on delivery)* | 3 | 2 | 1 | `G G H` | 6 |
| Mumme | 4 | 3 | 1 | `G H H H` | 6 |
| Bock | 5 | 3 | 2 | `G G H H H` | 6 |

## 5. Ship tiles (24 ⚙ — the hull is all berths)

Neutral, destination-bound, deck-fed **display of 4**. The tile is a stack of full-width 1″
berth wells, filled bottom→top; the **top berth prints the identity** (port · gate · the 1 G
commission) and the last cask covers it — **the ship sails at once**. Commission at the Harbor:
pay `1 G`, place on a shipless slot, **bank ★ = the berth count**.

| Hull | Berths | Size | Count ⚙ |
|---|---|---|---|
| **Skute** *(new)* | 1 | 2.5×1″ | 6 — the relief valve as a component (sails on its first load) |
| Cog | 2 | 2.5×2″ | 10 |
| Hulk | 3 | 2.5×3″ | 8 |

Per port: 6 each (Bruges sk1/c3/h2 · London sk2/c2/h2 · Bergen sk1/c3/h2 · Novgorod sk2/c2/h2 ⚙).

## 6. Building tiles (17 ⚙ — ONE green family, 2.5×1.32″)

**No owner, ever** — every building serves whoever activates it; the placer banks **+3★** ⚙
(setup’s two neutral seeds score nobody). Placement is always display → slot, at once; overbuild
for ONE payment ⚙ (v4.2c: a paid fee covers the ground — the `1 G` rent only when an otherwise-free placement overbuilds; displaced tile boxed). Display of 4; free at
**London**, or via the *Gain 1 building* bonus at the **tile’s printed fee** ⚙ (a chipless
tile is free — the tier reads straight off the component). Using a building never costs a fee.

| Building | Qty ⚙ | Effect | Wharf fee ⚙ (chip; — = free) |
|---|---|---|---|
| Granary | 2 | slot stop: **gain 2 goods** | — |
| Scrivener’s Hall | 2 | slot stop: **gain 1 recipe** (at the recipe’s fee) | 1 `G` |
| Mission Quay | 2 | slot stop: **age +2** | — |
| Hiring Post | 1 | slot stop: **gain 1 specialist** (at its fee) | 1 `G` |
| Almoner’s Stall | 1 | slot stop: **place 1 presence** (a tray die) | — |
| Brewhouse Annex | 1 | slot stop: **brew 1** (pay its cost) | 1 `G` |
| **Malt Kiln** | 3 | a cask loading here: **die +1** (cap 6) | 2 `G` |
| Cooperage | 2 | ship here: **+1 berth** | 2 `G` |
| Customs House | 2 | ship here **boards one gate lower** | 2 `G` |
| Rich Berth | 1 | hull here may **sail one berth short** (min 1) | 2 `G` |

## 7. Specialist tiles (4 designs · n−1 copies each · 2×2″ purple)

Free as **Bergen’s prize**; the Hiring Post / *Gain 1 specialist* bonus pay each tile’s
**printed wharf fee** ⚙. **Two seats** per house; never two of a kind.

| Specialist | Effect | Wharf fee ⚙ (v4.2c) |
|---|---|---|
| Cellarman | your dice **start one higher** (never above quality) | 2 `H` |
| Grain Factor | gain grain: **+1 extra** (any faucet) | 1 `G` |
| Hop Gardener | gain hops: **+1 extra** (any faucet) | 2 `H` |
| Stevedore | your ship-slot stop loads **2 casks** | 1 `G` |

## 8. Recipe cards (double-sided — the Flight record)

Starters **Gruit + Hopped** (1 each/house; Gruit dealt flipped = the warm start). Exports
**Broyhan · Keut · Mumme · Bock** — deal 3 of 4 each game; free as **Bruges’ prize**, or gained
at the card’s **printed wharf fee** ⚙ (Broyhan `1H` · Keut `1G` · Mumme `2H` · Bock `1G2H`) via
the *Gain 1 recipe* bonus / Scrivener’s Hall. Flip to the BREWED face on the first brew — the
flipped cards are the Flight ladder **and** the cover-openers (2nd beer → vessel 3 · 3rd →
seat 2).

## 9. Setup (summary — RULES.md §1)

3G 2H each · warm Ready Gruit (die 1) in vessel 1 · 14 dice · displays: ships 4 / buildings 4 /
specialists 4 · wharf seeds: Hulk→Bruges + 1 ship + 2 neutral buildings · worker placed free ·
first player fixed.

## 10. Box delta vs v3.4

**Removed:** the Hall/Three-Coins board · 12 Privilege tiles · ~20 charter contracts · 32 owner
house tokens · 32 cask cubes · the aging faces of every cask tile · the Trade Roads / Specialty
Beers / Jopenbier materials (tabled with their toggles).
**Added:** 6 Skute tiles · the score track + 4 discs · printed start-die faces and covers
(“2nd beer” / “3rd beer”) on the player boards.
**v4.1 delta:** removed — the **Sailed-Ships track** (the dice are the one clock).
**v4.2 delta:** reprinted — recipe cards (the cost panel = the **wharf fee**), specialist tiles
(fee chips), building tiles (per-tile fee chips; free tiles chipless), the acquisition
load-bonus verbs (“· its fee”), and the Novgorod mat (**value = die +2★**; refine out).

## 11. Known gaps ⚙ (the watch list)

1. ~~The **score track** is the one new non-tile component — confirm the strip fits the supply
   board footprint~~ — **RESOLVED (P4):** the kit prints it as the 50-cell ring wrapping the
   Market &amp; Stores rim (movers: 1 sourced disc/colour, lap marker at +50).
2. **Pile mixes** (which load bonuses print at which quality depth) are engine-random top-cards
   today; the physical pile composition wants a printed distribution pass before the next kit.
3. Cask counts (6/type floor) unchanged — re-read after human pace data (brews/game rose ~1).
5. **The dice pool (14) is THE pace dial** (v4.1 — the one clock): first light sims read longer
   games with a real round-25 ceiling share (the greedy bots don’t race the pool); re-read
   after human races before dialing `PRES_POOL`.
4. ~~printables2 lays out v3.4 sheets~~ — **RESOLVED (P4, 2026-07-21):** the kit prints the v4
   set (single-faced casks with printed start dice · Skute/Cog/Hulk sheets · the one green
   building family · 3+2 player boards · the score ring on Market &amp; Stores; the Hall,
   contracts, privilege and cube sheets are out).
