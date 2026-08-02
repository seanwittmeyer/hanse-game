# Brewhouses of the Hanse — Components (v4.6 “Guildbook”)

> **v4.6b (designer-ruled 2026-08-02):** the **Bergen mat line is REPRINTED** — the v4.5b
> “≤1 specialist per ship” was a misread. The mat now reads: **“every house with a cask
> aboard seats a specialist — max 1 per house per ship”** (pick order = load order). No
> counts change.

> **v4.6 (designer-ruled 2026-08-02 — off the `archive/records/AGRICOLA-STUDY.md` markup):**
> the Agricola program. **Into the box:** 8 **GUILD specialist** designs at 1 tile each
> (Guild Scholar · Innkeeper · Supercargo · Chronicler · Alderman · Town Crier · Chandler ·
> Shipwright — three print **SEAT-GATES**; two print **end-game ★** lines) · 3 building
> designs (**Victualling Yard** — the second EPHEMERAL · **Merchants’ Exchange** · **Warping
> Capstan**). The building box now prints **20 tiles — SETUP DEALS 17** ⚙ (≥1 Kiln + ≥1
> Mission Quay guaranteed; 3 sit out each game). Specialist decks: the core 5 keep
> max(2, n−1) copies; the guild 8 are singles.

> **v4.5b (designer-ruled 2026-07-31 — off gatekeeper review #2 + playtest #24):** the #24
> program. **Out of the box:** the commission ★ mint (rules-side) · automatic aging
> (rules-side) · the **Brewhouse Annex** · 1 each of Granary / Scrivener’s Hall / Malt Kiln /
> Cooperage / Customs House. **Into the box:** the **LADING deck (15 order tiles ⚙, row of
> 3)** · 5 new building designs — **Racking Hall · Assay House ×2 · Hop Exchange · Tollhouse ·
> Bonded Store** (the ephemeral trial — it sails away with its hull) · the **Braumeister**
> specialist (5th design) · specialist decks at **max(2, n−1) copies** per design (2p adds a
> copy). Bergen’s mat gains the line **“≤1 specialist per ship.”**

> **v4.5 (designer-ruled 2026-07-31 — off human playtest #24):** **12 tally dice** per house
> (was 14 — the box sheds 8 dice), and the end clock reads the **TRAY**: the first house whose
> tray empties (every die committed — parked or riding) sets the final round.

> **v4.4 (designer-ruled 2026-07-31):** the **commission’s free load returns** — no component
> change beyond the reprint of the **player aid** and the Wharf board’s Harbor caption (pay
> 1 `G` · place the hull · bank ★ = berths · **load 1 Ready cask at once**, optional).
>
> **v4.3 (designer-ruled 2026-07-26 — the third ruling off playtest #23):** the **occupancy
> toll is CUT** — no component change beyond the reprint of the **player aid** (the toll step
> is gone; sharing a station costs nothing).

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
> **v4.0 (designer-ruled 2026-07-21, off `archive/records/V4-STREAMLINE.md`):** the streamline keystone. **The
> tally die is the whole cask** — maturation marker, gate, value, presence and clock in one
> number. **Out of the box:** the Hall board · all 12 Privileges · charter contracts · owner
> house tokens · cask cubes · the cask tile’s aging face. **Into the box:** the **Skute**
> (1-berth hull) · the **score track** · single-faced cask tiles printing a **START-DIE** value.
> The v3.4 manifest is preserved in git history.

> **The box manifest.** What is *in* the game, line by line. **Every count is a placeholder ⚙.**
>
> - Operational rules: `RULES.md` (its header states the current version). Design rationale & history: `DESIGN.md` §9; the ruled v4 plan `archive/records/V4-STREAMLINE.md`.
> - The live build is `play.html` — **v4.5b “Open Orders”**, the v45h letter (`KEY hanse-v45h`) — the source of truth on values and behaviour. This doc enumerates the physical pieces that implement it.
> - **The print kit is `print.html` — the only kit in use** (components.js data is v4.5b/v45h; the sheet layouts are the P4 refresh).

---

## 1. Conventions

- **Goods:** `G` = grain, `H` = hops — the only currency. Storage cap 8 ⚙.
- **A line** = two stations + the two slots beside them. A slot holds **a building (bottom)
  and/or a ship (top)** — never casks (there is no deploy).
- **The die is the cask:** set at brew to the printed start value (= quality − aging steps),
  turned up by age points, **Ready at the quality**, lifted past it only by buildings at load
  (cap 6), **parked at the kontor on delivery** — pips = banked ★, body = presence + the clock.
- **End clock (v4.5 — the dice alone):** the first house whose **tray EMPTIES** (its last die
  committed — parked, in a vessel, or aboard a hull) sets the final round; dice never return,
  so the runway is public and countable. `MAX_ROUND` 25 ⚙ is the rules-side backstop; sails
  end nothing.

---

## 2. Boards

| Board | Qty | Holds |
|---|---|---|
| Main board — **the Wharf** | 1 | 2×2 stations, each printing **ONE action** (Market *Source 2* · Brewhouse *Brew* · Cellar *Age 3* · Harbor *Commission 1G + load 1 — no ★* — v4.5b), ringed by 8 slots (a building seat + a ship seat each). |
| **Destinations board** | 1 | The four kontor panels — Bruges · London · Bergen · Novgorod — each printing its **gate (die N+)**, its **prize** (recipe / building / specialist — Novgorod instead prints **value = the die +2★**), its **majority tiers** (4/2/0 · 5/3/1 · 9/5/2 · 8/5/2 ⚙) and the **parking field** where delivered dice stand (pips face-up = the banked ★ audit). *(The kit cuts it as one narrow board pairing with Market & Stores.)* |
| Player boards | 4 | **3 vessel slots + 2 specialist seats — all open from the start** (v45h: the printed covers are off for now). Recipe cards sit beside it. Goods cap 8 printed. |
| **Score track** ring | 1 | A **50-cell ring** (0–49; a lap marker flips +50) wrapping the Market & Stores rim + 1 disc per house — the bank (+3★ builds · lading ★ · Tollhouse stamps · 1★ bumps) and delivery ★ as they land. *(New in v4.0 — the hard line demands a home for banked points.)* |
| Supply board *(kit)* | 1 | The displays: ships 4 · buildings 4 · specialists 4 · **the lading row of 3** (v4.5b) · the export recipe row — ringed by the score track. *(The Sailed-Ships clock left with v4.1.)* |

## 3. Common supply

| Component | Qty ⚙ | Purpose |
|---|---|---|
| Grain tokens | 60 | currency |
| Hops tokens | 40 | currency |
| **Tally dice** | **48** (12 × 4 colours ⚙ — v4.5) | the cask/presence/clock component — see §1 |
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
pay `1 G`, place on a shipless slot, and (v4.4) you may **load 1 Ready cask onto it at
once** — **no ★ (v4.5b)**: the hull + the instant load are the whole reward.

| Hull | Berths | Size | Count ⚙ |
|---|---|---|---|
| **Skute** *(new)* | 1 | 2.5×1″ | 6 — the relief valve as a component (sails on its first load) |
| Cog | 2 | 2.5×2″ | 10 |
| Hulk | 3 | 2.5×3″ | 8 |

Per port: 6 each (Bruges sk1/c3/h2 · London sk2/c2/h2 · Bergen sk1/c3/h2 · Novgorod sk2/c2/h2 ⚙).

## 6. Building tiles (print 20 ⚙ · DEAL 17 each game — v4.6 · ONE green family, 2.5×1.32″)

**No owner, ever** — every building serves whoever activates it; the placer banks **+3★** ⚙
(setup’s two neutral seeds score nobody). Placement is always display → slot, at once; overbuild
for ONE payment ⚙ (v4.2c: a paid fee covers the ground — the `1 G` rent only when an otherwise-free placement overbuilds; displaced tile boxed). Display of 4; free at
**London**, or via the *Gain 1 building* bonus at the **tile’s printed fee** ⚙ (a chipless
tile is free — the tier reads straight off the component). Using a building never costs a fee.

The v4.5b **dice pass** + the v45d **power ladder** (designer-ruled 2026-08-01): 9 die-touching designs; **fees print in grain only** — hops are spent USING the power tiles (Hop Exchange ≤2 `H`/use · Abbey Cellar 3 `H`/use), never buying them. **v4.6: shuffle all 20, deal 17 into the game** (≥1 Malt Kiln + ≥1 Mission Quay guaranteed; the other 3 stay boxed) — every wharf a different economy.

| Building | Qty ⚙ | Effect | Wharf fee ⚙ (chip; — = free) |
|---|---|---|---|
| Granary | 1 | slot stop: **gain 2 goods** | — |
| Scrivener’s Hall | 1 | slot stop: **gain 1 recipe** (at the recipe’s fee) | 1 `G` |
| Mission Quay | 2 | slot stop: **age +2** | — |
| Hiring Post | 1 | slot stop: **gain 1 specialist** (at its fee) | 1 `G` |
| Almoner’s Stall | 1 | slot stop: **place 1 presence** (a tray die) | — |
| **Racking Hall** *(power)* | 1 | slot stop: **swap the dice of ANY two of your vessel casks — no quality cap** (the beer transfers; cap 6) | 3 `G` |
| **Assay House** | 1 | slot stop: **turn one of your maturing dice ±1** (never above its quality, never below 1 — v45c) | 1 `G` |
| **Abbey Cellar** *(power, v45d)* | 1 | slot stop: **pay 3 `H` — ALL your maturing casks age to READY** | 2 `G` |
| **Hop Exchange** *(power, v45d)* | 1 | slot stop: **pay up to 2 `H` — vessel dice +1 per hop** (past quality fine; cap 6) | 2 `G` |
| **Malt Kiln** | 2 | a cask loading here: **die +1** (cap 6) | 2 `G` |
| **Tollhouse** | 1 | a cask loading here **may turn its die −1** (never below the gate): **bank +3★ at once** | 1 `G` |
| **Bonded Store** | 1 | a cask loading here: **die +1** (cap 6); **when this hull sails the Store sails with it** (boxed) — every house with a cask aboard gains 2 goods | 2 `G` |
| Cooperage | 1 | ship here: **+1 berth** | 2 `G` |
| Customs House | 1 | ship here **boards one gate lower** | 2 `G` |
| Rich Berth | 1 | hull here may **sail one berth short** (min 1) | 2 `G` |
| **Victualling Yard** *(v4.6 · ephemeral)* | 1 | a cask loading here: **its load bonus fires TWICE**; when this hull sails the Yard **sails with it** (boxed) | 2 `G` |
| **Merchants’ Exchange** *(v4.6)* | 1 | slot stop: **cycle 1 open lading** to its deck’s bottom — the replacement posts at once | 2 `G` |
| **Warping Capstan** *(v4.6)* | 1 | slot stop: **move one EMPTY hull** to any shipless slot | 2 `G` |

## 7. Specialist tiles (13 designs — v4.6 · the core 5 × max(2, n−1) + the guild 8 × 1 · 2×2″ purple)

Free as **Bergen’s prize** — v4.6b: **every house with a cask aboard seats ONE** (max 1 per
house per ship; pick order = load order); the
Hiring Post / *Gain 1 specialist* bonus pay each tile’s **printed wharf fee** ⚙. **Two seats**
per house; never two of a kind. **Three guild tiles print a SEAT-GATE** ⚙ — the condition
must read true off your components before the tile may be seated (any channel). A taken
tile’s gap refills from the deck at the **end of the turn** (v4.4c — ships/buildings refill
at once). Print: core five ×3 (covers 4p) · guild eight ×1.

| Specialist | Effect | Wharf fee ⚙ | Seat-gate ⚙ |
|---|---|---|---|
| Cellarman | your dice **start one higher** (a Q3+ export never starts Ready — v45g) | 2 `H` | — |
| Grain Factor | gain grain: **+1 extra** (any faucet) | 1 `G` | — |
| Hop Gardener | gain hops: **+1 extra** (any faucet) | 2 `H` | — |
| Stevedore | your ship-slot stop loads **2 casks** | 1 `G` | — |
| **Braumeister** *(v4.5b)* | start of your turn: **your ripest maturing cask ages +1** | 1 `G` 1 `H` | — |
| **Guild Scholar** *(v4.6)* | **your recipes are FREE** — the `H` = Q−2 fee waived at every channel, Bruges included | 2 `G` | — |
| **Innkeeper** *(v4.6)* | **this tile is a 4th VESSEL** — one cask matures on the card | 2 `G` | 3 distinct beers brewed |
| **Supercargo** *(v4.6)* | a hull sails **your** cask on a **rival’s** turn: gain **1 `G` 1 `H`** | 1 `H` | — |
| **Chronicler** *(v4.6)* | game end: **+1★ per claimed lading (max +5)** | 1 `G` 1 `H` | a lading claimed |
| **Alderman** *(v4.6)* | game end: **+2★ per kontor with 3+ parked dice** | 2 `G` | — |
| **Town Crier** *(v4.6)* | your presence bumps park at **FACE 2** (2★ each) | 1 `G` | delivered to 2 kontore |
| **Chandler** *(v4.6)* | once per turn: **swap 1 `G` ↔ 1 `H`** with the stores | 1 `G` | — |
| **Shipwright** *(v4.6)* | **your commissions are free** (the 1 `G` waived) | 1 `H` | — |

## 7b. Lading tiles (15 ⚙ · row of 3 · 2×0.9″ — v4.5b, the order layer)

Each prints a **kontor** (or *any*), a **condition** — a die minimum (*die 4+*) or a named
beer — and a reward (**2–5★** ⚙). Deliver a qualifying cask at that kontor → **claim the
tile**: it comes to your seat (the audit), the ★ bank at once. **One per delivered cask.**
The row refills from the deck at the **end of the turn**; claimed tiles never return.

Schedule ⚙: Bruges — die 3+→2★ · die 4+→3★ · Keut→3★ · die 5+→4★ · London — die 4+→3★ ·
die 5+→4★ · Broyhan→3★ · die 6→5★ · Bergen — die 4+→3★ · die 5+→4★ · Mumme→4★ · Novgorod —
die 5+→3★ · Bock→4★ · die 6→4★ · any kontor — die 6→3★.

## 8. Recipe cards (double-sided — the Flight record)

Starters **Gruit + Hopped** (1 each/house; Gruit dealt flipped = the warm start). Exports
**Broyhan · Keut · Mumme · Bock** — deal 3 of 4 each game; gained at the card’s **printed
wharf fee**, now the formula **`H` = Q−2** ⚙ (Broyhan/Keut `1H` · Mumme `2H` · Bock `3H`) —
**paid at EVERY channel, the Bruges prize included** (v45e: Bruges grants the pick, never the
waiver), via Bruges / the *Gain 1 recipe* bonus / Scrivener’s Hall. Flip to the BREWED face on the first brew — the
flipped cards are the Flight ladder (v45h: the covers are off — no unlock duty).

## 9. Setup (summary — RULES.md §1)

3G 2H each · warm Ready Gruit (die 1) in vessel 1 (all 3 vessels + 2 seats open — v45h) · 12
dice · **building deck: deal 17 of the 20 printed** (≥1 Kiln + ≥1 Mission Quay — v4.6) ·
displays: ships 4 / buildings 4 / specialists 4 / **ladings 3** · wharf seeds: Hulk→Bruges + 1 ship + 2 neutral buildings ·
worker placed free · first player fixed.

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
**v4.3 delta:** reprinted — the **player aid** (the occupancy-toll step is gone).
**v4.4 delta:** reprinted — the **player aid** + the Wharf board’s Harbor caption (the
commission’s free load returns).
**v4.4c delta:** rules-only — the **specialist display refills at end of turn** (no reprint).
**v4.5 delta:** −8 tally dice (**12/house**); the end clock reads the **empty tray** (rules +
player-aid reprint).
**v4.5b delta:** **+15 lading tiles** (the order row) · building deck reprint (5 new designs
in, the Annex + 5 duplicate tiles out — still 17) · **+Braumeister** tiles (5th specialist
design; decks now max(2, n−1) copies) · Harbor caption reprint (no ★) · Bergen mat line
(“≤1 specialist per ship”) · player-aid reprint (no auto-age; ladings).
**2026-08-01 letters delta (v45d/e/g/h):** reprinted — **building tiles** (the v45d power
ladder: fees in GRAIN only · Racking Hall uncapped 3 `G` · Tollhouse **+3★** · Abbey Cellar
in, one Assay out · Hop Exchange the pay-hops slot action) · **recipe cards** (the fee is the
formula **`H` = Q−2**, paid at every channel — the Bruges mat drops “free”, v45e) · the
**Cellarman** tile (a Q3+ export never starts Ready — v45g) · **player boards** (all 3
vessels + both seats print OPEN — the covers leave the board, v45h) · the **player aid**.
**v4.6 delta:** **+8 guild specialist tiles** (1 each; three print seat-gates, two print
end-game ★ lines) · **+3 building tiles** (Victualling Yard · Merchants’ Exchange · Warping
Capstan — the building box prints 20, **setup deals 17** ⚙) · player-aid reprint (the Guild
end-score line · the deal-17 setup step).
**v4.6b delta:** **Bergen mat reprint** — the prize line corrected to “every house with a
cask aboard seats a specialist — max 1 per house per ship” (the v4.5b “≤1 per ship” was a
misread) · player-aid reprint (the Bergen prize row). No counts change.
**v4.6c delta:** player-aid reprint only — the turn step gains “the line is read LIVE: a
hull or building landing on a line slot mid-turn opens its stop.” No components change.

## 11. Known gaps ⚙ (the watch list)

1. ~~The **score track** is the one new non-tile component — confirm the strip fits the supply
   board footprint~~ — **RESOLVED (P4):** the kit prints it as the 50-cell ring wrapping the
   Market &amp; Stores rim (movers: 1 sourced disc/colour, lap marker at +50).
2. **Pile mixes** (which load bonuses print at which quality depth) are engine-random top-cards
   today; the physical pile composition wants a printed distribution pass before the next kit.
3. Cask counts (6/type floor) unchanged — re-read after human pace data (brews/game rose ~1).
5. **The dice pool (12 ⚙, v4.5) is THE pace dial** — cut from 14 off playtest #24, with the
   trigger moved to the **empty tray** (commitment, not parked-out); re-read pace at the next
   human table before dialing `PRES_POOL` again.
4. ~~printables2 lays out v3.4 sheets~~ — **RESOLVED (P4, 2026-07-21):** the kit prints the v4
   set (single-faced casks with printed start dice · Skute/Cog/Hulk sheets · the one green
   building family · 3+2 player boards · the score ring on Market &amp; Stores; the Hall,
   contracts, privilege and cube sheets are out).
