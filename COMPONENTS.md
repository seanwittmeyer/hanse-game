# Brewhouses of the Hanse — Components (v5.3b “The Bourse”)

> **The box manifest.** What is *in* the game, line by line. **Every count is a placeholder ⚙.**
>
> - Operational rules: `RULES.md` (the one clean rules document). Design rationale & history: `DESIGN.md` §9; the live watches: `DESIGN.md` §10.
> - The live build is `play.html` — **v5.3b “The Bourse”** (`KEY hanse-v53b`) — the source of truth on values and behaviour. This doc enumerates the physical pieces that implement it.
> - **The print kit is `print.html` — the only kit in use** (components.js data is v5.3b; the sheet layouts are the P4 refresh + the 2026-08-18 native-scale pass). Printed copy follows the **Term Registry (`STYLE.md`)**.

---

## 1. Conventions

- **Goods:** `G` = grain, `H` = hops — the only currency. Storage cap 8 ⚙.
- **A line** = two stations + the two slots beside them. A slot holds **a building (bottom)
  and/or a ship (top)** — never casks (there is no deploy).
- **The die is the cask:** set at brew to the printed start value (= quality − aging steps),
  turned up step by step, **Ready at the quality**, lifted past it only by buildings at load
  (cap 6), **parked at the Kontor on delivery** — pips = the ★ scored, body = presence + the clock.
- **End clock (v4.5 — the dice alone):** the first player whose **tray EMPTIES** (its last die
  committed — parked, in a vessel, or aboard a Ship) sets the final round; dice never return,
  so the runway is public and countable. `MAX_ROUND` 25 ⚙ is the rules-side backstop; sails
  end nothing.

---

## 2. Boards

| Board | Qty | Holds |
|---|---|---|
| Main board — **the Wharf** | 1 | 2×2 stations, each printing a **PRIMARY and an ALTERNATE action** (v5.0 · v5.2b — Market *Source 3 / 1* · Brewhouse *Brew: search the stack / the top tile* · Cellar *Age 3 / 1* · Harbor *Commission at the Ship’s printed fee + load 1, no ★ / Load 1 onto any docked Ship*), ringed by 8 slots (a building seat + a ship seat each). |
| **Destinations board** | 1 | The four Kontor panels — Bruges · London · Bergen · Novgorod — each printing its **minimum (die N+)**, its **prize** (recipe / building / specialist — Novgorod instead prints **value = the die +2★**), its **majority tiers** (4/2/0 · 5/3/1 · 9/5/2 · 8/5/2 ⚙) and the **parking field** where delivered dice stand (pips face-up = the scored-★ audit) — plus the **Manifest deck well** (v5.0 — the Order row retired; the demand cards ride the Ships). *(The kit cuts it as one narrow board pairing with Market & Stores.)* |
| **The Bourse strip** *(v5.3 NEW)* | 1 | The beer-value track — **−1 · 0 · +1 · +2 · +3** ⚙, one lane; the **price markers** park on it (markers start at 0). Lives beside Market & Stores. |
| Player boards | 4 | **3 vessel slots + 2 specialist seats — all open from the start** (v45h). The Flight ladder + a printed **Manifest reminder** (v5.0 — claimed demands score at once; the old Orders pile zone is gone). Recipe cards sit beside it. Goods cap 8 printed. |
| **Score track** ring | 1 | A **50-cell ring** (0–49; a lap marker flips +50) wrapping the Market & Stores rim + 1 disc per player — the ★ scored in play (delivery ★ = die + Bourse marker · Manifest demands · Cooperage wharfage · Staple premiums · 1★ placed presence) as they land. *(New in v4.0 — the hard line demands a home for scored ★.)* |
| Market & Stores board *(kit)* | 1 | **17.45×10.8″** — the displays: Ships 4 · Specialists 4 in the main column; the right column is **CASKS & RECIPES** (every beer's face-up pile ON the board — Gruit + Hopped · the dealt Q3 + Q4 beers · the Q5 beer + Jopenbier — beside the four export recipe stacks by tier); ringed by the score track. Cask slots 2.4×1″, recipe slots 1.85×2.55″ — component-true. *(The building display retired at v5.3 — Public Works stand from setup, Ventures live in hand.)* |
| **Player aid** *(kit)* | 3–6 | A **letter TRI-FOLD of three identical double-sided aids** — front: the play face; back: End & Score + the two-column icon legend. Two straight cuts yield three aids; identical panels register under any duplex flip (4p: print two sheets). Rulebook + aid = the complete rules. |

## 3. Common supply

| Component | Qty ⚙ | Purpose |
|---|---|---|
| Grain tokens | 60 | currency |
| Hops tokens | 40 | currency |
| **Quality dice** | **52** (13 × 4 colours ⚙) | the cask/presence/clock component — see §1 (v5.3: no die ever stands on a building) |
| Score discs (movers) | 4 (1/colour) | the score ring (flip/mark at +50) |
| Worker pawns | 4 (1/colour) | the stations |
| **Beer price markers** *(v5.3 NEW)* | **8** (1 per brewable beer; a game uses the in-play beers minus Gruit & Jopenbier — 4 in base) | the Bourse strip — a delivered cask scores **die + marker** |
| +1-berth / minimum markers | — | none: the Kiln turns the die itself; Cooperage/Customs read from the tile |

## 4. Cask tiles (single-faced, 2.4×1″ ⚙)

Each prints: the beer’s name/art · **quality Q1–Q5** · the **START-DIE value** (a printed die
face inside the die seat) · one **load-bonus action** printed on the tile (the tiles stack in **six
face-up, SEARCHABLE stacks, one per beer** — a full Brew searches the stack and CHOOSES its
tile, the alternate Brewhouse takes the top tile, and a delivered cask’s tile returns to the
bottom — v5.0; the printed mix per beer bounds which bonuses exist; the three *acquisition* bonuses read **“· its fee”**
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
| *Gose (exp.)* *(gain 3 goods, any mix — v4.15b)* | 2 | 1 | 1 | `G G` | 8 |
| *Zerbster (exp.)* *(parti-gyle: a free Gruit + Load 1 more — v4.15b)* | 3 | 1 | 2 | `H H H` | 6 |
| *Duckstein (exp.)* *(smoke-hardy: its die +1 as it boards)* | 2 | 1 | 1 | `G H` | 8 |
| *Jopenbier (capstone)* *(the vintage: ages to 6)* | 6 | 4 | 2 | `G G H H H H` | 6 |

*(The four expansion beers ride two opt-in toggles — v4.14; each is PINNED to one printed
load bonus, and the pin IS the signature — v4.15b: Gose → **Gain 3 goods (any mix)** ·
Zerbster → **Parti-gyle: a free Gruit + Load 1 more** · Duckstein → Place 1 presence (free) ·
Jopenbier → Gain 2 goods. **On the Bourse — v5.3:** a dealt specialty beer takes a price
marker at 0 like any export — its brews crash, its arrivals rise, it scores die + marker;
**Jopenbier alone trades OFF the Bourse** — no marker, no crash, no rise: the 6 is
contract-solid, and its tile prints the off-book line.)*

## 5. Ship tiles (24 ⚙ — the Ship is all berths)

Neutral, each bound for a printed Kontor, deck-fed **display of 4**. **Every hull cuts the same
2.5×3″ tile (v4.9b)** — a stack of full-width 1″ berth wells from the top; the space below a
Skute's or Cog's berths simply shows the port art (no seats). Berths fill bottom→top; the
**top berth prints the identity** (the Kontor crest · **both boarding gates — the READY
glyph beside the die minimum** (v5.0) · the **commission fee**) and the last cask covers it — **the ship sails at once**. Commission at the
Harbor: pay the tile’s **printed fee — 2/1/0 `G` by size ⚙ (v4.8; chipless Hulk = free)**,
place on a shipless slot, and (v4.4) you may **load 1 Ready cask onto it at
once** — **no ★ (v4.5b)**: the Ship + the instant load are the whole reward.

| Ship | Berths | Fee ⚙ (v4.8) | Size | Count ⚙ |
|---|---|---|---|---|
| **Skute** *(new)* | 1 | 2 `G` | 2.5×3″ | 6 — the relief valve as a component (sails on its first load) |
| Cog | 2 | 1 `G` | 2.5×3″ | 10 |
| Hulk | 3 | — (chipless) | 2.5×3″ | 8 |

Per Kontor: 6 each (Bruges sk1/c3/h2 · London sk2/c2/h2 · Bergen sk1/c3/h2 · Novgorod sk2/c2/h2 ⚙).

## 6. Building tiles — TWO FAMILIES (v5.3 “The Bourse”)

### 6a. PUBLIC WORKS (print 13 ⚙ / 9 designs · SETUP STANDS 3–4 at random · BROWN, die-less furniture, 2.5×1.32″)

**Nobody builds them, nobody owns them — and none of them lasts (v5.4 THE TIDE, ruled).**
Setup shuffles all 13, draws **3 (2p) / 4 (3–4p) ⚙** onto random slots; **the rest become
the BAG**. **Every Public Work sails with the Ship at its slot** — boxed, never recycled —
and the bag re-furnishes the wharf at the END of the turn until it runs dry, so the late
wharf thins into bare ground (the ground the Ventures inherit; a Venture never sails). Every face is a **passive modifier of its own slot’s traffic** (a cask
loading here · the Ship docked here · a sail from here); no tile adds an action for anyone,
and **no die ever stands on one** — no fee, no maturity, no build channel (the v5.2
investor grammar lived one letter; the printed fee/start-face chips are vestigial until the
next print run). They leave play two ways: **the tide** (a sail from their slot takes the
tile, boxed — the family rule since v5.4), and a full wharf lets an L1 Venture
**redevelop** one (§6b). The colour is **BROWN** (v5.2, ruled — green is a player colour).

| Public Work | Qty ⚙ | Printed face (icons; prose here) | Fee ⚙ | Die starts ⚙ |
|---|---|---|---|---|
| **Malt Kiln** | 2 | a cask loading here: **die +1** (past quality fine; cap 6) | 2 `G` | 2 |
| **Tollhouse** | 1 | **the toll bench (v5.3b):** a cask loading here — the loader **may shift any Bourse marker ±1** | 1 `G` | 3 |
| **Customs House** | 1 | **−1 to the Kontor minimum** at this slot ⚙ (floor 1 — v5.2, ruled: was −2, “almost broken”) | 2 `G` | 3 |
| **Ropewalk** *(v5.2 rework, ruled)* | 1 | a load here: **also load 1 Ready cask onto a DIFFERENT docked Ship** ⚙ (once per load flow) | 2 `G` | 3 |
| Cooperage | 1 | the Ship here: **+1 capacity** (sails only when that berth is also full) · **each cask loaded here: its loader +1★** ⚙ | 2 `G` | 3 |
| **Weigh House** | 1 | **each cask delivered off the Ship here may claim 2 Manifest lines** | 2 `G` | 3 |
| **Staple Houses ×4** *(Bruges Hanzehuis · London Steelyard · Bergen Bryggen · Novgorod Peterhof)* | 4 | *On sail to the tile's Kontor:* **every delivered cask +2★** ⚙ (*Stapelrecht* — the destination premium) | 2 `G` | 2 |
| **Bonded Store** | 1 | a cask loading here: **die +1** (cap 6); as it sails, **every player with a cask aboard gains 2 goods** | 2 `G` | 3 |
| **Victualling Yard** | 1 | a cask loading here: **its load bonus fires TWICE** | 2 `G` | 3 |

*(Retired at v5.2, ruled: Granary · Mission Quay · Racking Hall · Assay House · Abbey Cellar ·
Hop Exchange · Merchants’ Exchange — their ideas move into the Ventures below — plus the
Rich Berth (cut) and the Warping Capstan (expansion lot). The freed art files ride the new
faces as stand-ins; briefs queued in `art/PROMPTS.md`.)*

### 6b. VENTURE tiles (print 16 ⚙ — 4 dual-use designs × 1 ringed set per house · 2.5×1.32″ · DOUBLE-SIDED)

**The only family players build (v5.3).** A Venture wears the **owner’s colour ring** and
carries no die. **Every face prints TWO lines (v5.3, ruled):** a **PUBLIC line** on top —
*gain 1 good · age +1 · Bourse ±1 / ±2* — a free stop for **whoever** activates a line
through the slot, and the **ringed OWNER line** below (the private power; **the owner
collects both**). Each house starts with the same **hand of 4**; a tile plays **L1-side up
onto ANY OPEN SLOT** (THE OPEN GROUND, ruled — only with the wharf FULL may it instead
replace a Public Work, the worn tile boxed; never another player’s L1/L2) or lands
**L2-side up over your own L1** (the spent L1 tile is boxed; the ground is kept). One piece of cardboard, one face per life:
playing a side forfeits the other. **A rival can never overbuild a Venture; an L2 can never
be displaced.** Fees ⚙ **L1 1 `G` · L2 2 `G`** (grain only; waived as the London prize).
Ventures commit **no die** — the clock is untouched.

| Tile (front = L1 · back = L2) | Public line ⚙ (L1 · L2) | L1 owner line ⚙ | L2 owner line ⚙ |
|---|---|---|---|
| **Rack House / Brewery** | age +1 · age +1 | *this line:* swap the dice of 2 of your vessel casks (no quality cap) | *this line:* **you may BREW** (full search; normal costs) |
| **Counting House / Assay Loft** | +1 good · +1 good | *your loads here:* **+1 good** | *this line:* **pay 1 `H` — 1 cask straight to READY** |
| **Factor’s Desk / Staple Rights** | Bourse ±1 · Bourse ±2 | *before loading the Ship here:* **re-deal its Manifest** | *your casks sailed from here:* **+1★ each** ⚙ |
| **Warehouse / Guild Residence** | +1 good · Bourse ±1 | *your loads here:* **+1 cask may board** | *game end:* **2★ per Venture in play** ⚙ |

## 7. Specialist tiles (15 designs — v5.1 · the core 5 × max(2, n−1) + the guild 10 × 1 · 2×2″ purple)

Free as **Bergen’s prize** — v4.7: **per cask** (every cask seats its player one; pick order
= load order; **no seat to fill → the prize pays 2 goods**, 1 `G`+1 `H` — v5.2b, printed on
the mat); the
*Gain 1 specialist* bonus pays each tile’s **printed wharf fee** ⚙ (v5.1: the Hiring Post
retired). **Two seats**
per player; never two of a kind. **No tile prints a requirement** (v4.12 — the gates are
cut; the earn-gate seam stays for future tiles). A taken
tile’s gap refills from the deck at the **end of the turn** (v4.4c — ships/buildings refill
at once). **Every face is a STATION SUPERPOWER (v5.1)** — the host-flow icon leads, minimal text. Print: core five ×3 (covers 4p) · guild ten ×1 (25 tiles).

| Specialist | Effect | Wharf fee ⚙ | Requirement ⚙ |
|---|---|---|---|
| Cellarman | your dice **start one higher** (his Broyhan starts READY — the v45g cap repealed, v4.12) | 2 `H` | — |
| Grain Factor | gain grain: **+1 extra** (any faucet) | 2 `G` *(v4.7)* | — |
| Hop Gardener | gain hops: **+1 extra** (any faucet) | 2 `H` | — |
| Stevedore | **each time you load, load up to 2 casks** (slot load · maiden load · Load bonus — v4.6d) | 1 `G` | — |
| **Braumeister** *(v4.5b)* | start of your turn: **age 1 cask +1** (v4.12 wording — the app ages your ripest) | 1 `G` 1 `H` | — |
| **Guild Scholar** *(v4.6)* | **when gaining recipes, pay no fee** — the `H` = Q−3 fee waived at every channel, Bruges included | 2 `G` | — |
| **Innkeeper** *(v4.12 rework)* | **brewing 3+ casks at once: age one +1 at your turn start** | 2 `G` | — |
| **Supercargo** *(v4.6)* | a Ship sails **your** cask on a **rival’s** turn: gain **1 `G` 1 `H`** | 2 `H` *(v4.7)* | — |
| **Chronicler** *(v5.0 rework)* | **claim a Manifest demand: +2★ at once** ⚙ (no end-record — the ★ bank with the claim) | 1 `G` 1 `H` | — |
| **Alderman** *(v4.6)* | game end: **+2★ per Kontor with 3+ parked dice** | 2 `G` | — |
| **Town Crier** *(v4.6)* | **place a presence die: +2★** ⚙ (the die parks at face 1 — 3★ total; v4.12) | 1 `G` | — |
| **Chandler** *(v5.1 rework)* | **with your STATION Source: may swap 1 `G` ↔ 1 `H`** (once per turn — the swap rides the Market flow) | 1 `G` | — |
| **Shipwright** *(v4.6)* | **when commissioning Ships, pay no fee** (2 `G` on a Skute, nothing on a Hulk; v4.8/v4.12) | 1 `H` | — |
| **Broker** *(v5.1 NEW)* | **your Market ALTERNATE is Source 2** (full strength) ⚙ | 1 `G` | — |
| **Brewer’s Mate** *(v5.1 NEW)* | **your Brewhouse ALTERNATE searches the stack** ⚙ | 1 `H` | — |

## 7b. Manifest cards (12 ⚙ · 2×1.32″ — v5.0, the demand layer; the Order tiles retired)

Each card prints **three demand lines**, each a condition → a printed ★: a **named starter**
(*Gruit → 1★ · Hopped → 2★*), a **quality tier** (*Q2-or-under → 1★ · Q3+ → 2★ · Q4+ → 3★*
— tier language, claimable under every deal), a **die minimum read as the die PARKS**
(*3+ → 1★ · 4+ → 2★ · 5+ → 3★ · 6 → 3★*), or a **combo** — tier AND die on one cask
(*Q3+ & 5+ → 4★ · Q4+ & 5+ → 4★ · Q4+ & 6 → 4★ · Q≤2 & 3+ → 3★*). The full 12-card mix:
`V5-OPEN-WHARF.md` §2.

**One card rides every NON-BRUGES Ship** — dealt face-up as the hull enters the ship
display, docked with it (the card tucks under the hull’s foot on its slot). **Bruges hulls
sail plain.** When the Ship sails, each delivered cask **may claim ONE line it satisfies**
(each line once per voyage; the ★ score at once); the card then returns **UNDER the deck** —
no tile at the seat, the score track is the record. Twelve cards cover the maximum float
(8 slots + the display of 4): the deck is never dry.

**Hall mode (v4.17/v5.0):** every claimed Manifest demand also pays an **⚜ Invitation**
(§7c — the per-Order ⚜ moved to the claim).

## 7c. The Guild Tastings (expansion, v4.17 ⚙)

**1 board** (9.8×7″ letter-cut, **data + slots only** — 2026-08-18: a kontor-style art
header whose foot cells print the shared numbers (pour 1 ⚜ + a cask · 1st ★+the tile ·
2nd 2★ · 3rd 1★ · majority —) · the open row — three component-true tile parkings, the
third badged 3–4p · the **Taproom floor** parking field on a plank, its champion chip
die→crest · the Tasting-deck and ⚜ Invitation-card wells; the rules —
`RULES.md` §12; ruled 2026-08-23: the rulebook carries hall mode only when the expansion
leaves development — rules never ride a board or component) · the **Tasting contest deck: 12 tiles**
(building-cut 2.5×1.32″, the minimal face — 2026-08-18: the category name · the entry
**gate chip** (quality pours the beer glyph — *any*/*1–3*/*4+*; die pours the die glyph —
*4+*/*5+*/*6*) · the tile’s one variable, **1st ★ + the self-tile glyph** · the printed
**horizontal bench** of die squares — free/fresh three (the third badged 3–4p), the
dark/export/old/master pours **two: duels** (v4.17b); the mix: free ×3 · fresh ×3 · dark ×2 ·
export ×2 · old ×1 · master ×1 — 1st ★ 5/5/7/6/7/9 ⚙; the shared ladder prints on the
board, the procedure in the rulebook) · **18 ⚜ Invitation CARDS** (1.85×2.55″ cardstock,
single-sided — a sealed letter, 2026-08-18; a face-up supply — spent cards return; *each
player starts with 2* (v4.17b)) · the **Guild Chancery** building (v4.16b — always dealt in hall mode). The poured die
stands on the tile’s bench in pour order; judged dice stand on the floor (committed, the
clock); the won tiles at the seat are the set record (2 distinct +3★ · 3+ +7★ ⚙). All
contest state is tiles + dice — nothing is remembered.

## 8. Recipe cards (double-sided — the Flight record)

Starters **Gruit + Hopped** (1 each/player; Gruit dealt flipped = the warm start). Exports
**Broyhan · Keut · Mumme · Bock** — deal 3 of 4 each game (**3 of 7 with Specialty Beers on,
≥1 of Mumme/Bock guaranteed** — v4.14); gained at the card’s **printed
wharf fee**, the formula **`H` = Q−3** ⚙ (v4.9c — Broyhan/Keut **chip-less/free** · Mumme `1H` ·
Bock `2H` · the specialty three **free** · Jopenbier `3H`) — **paid at EVERY channel, the Bruges
prize included** (v45e: Bruges grants the pick,
never the waiver), via Bruges / the *Gain 1 recipe* bonus (v5.1: the Scrivener’s Hall retired). **Jopenbier is
never drafted** — its toggle makes it always acquirable (v4.14), and its card carries the
**off-the-Bourse line** (v5.3: no price marker — the plain Q6 die is the whole value; every
other in-play beer’s card trades at die + marker). The card moves to the
board’s **COMPLETED side on that beer’s first LOAD** (v4.9d) — the completed cards are the Flight
ladder (v45h: the covers are off — no unlock duty).

## 9. Setup (summary — RULES.md §1)

3G 2H each · warm Ready Gruit (die 1) in vessel 1 (all 3 vessels + 2 seats open — v45h) · 13
dice · the **hand of 4 ringed Venture tiles** (v5.2) · **Public Works: draw 3 (2p) / 4 (3–4p)
of the 13 at random onto random slots — the rest are the BAG** (v5.4; every tile sails away
with the Ship at its slot and the bag re-furnishes at end of turn until dry) ·
**the Bourse strip: one price marker per in-play beer except Gruit & Jopenbier, at 0** (v5.3)
· **specialist deck 20/20/25 tiles at 2/3/4p** (the core 5 × max(2, n−1) + the guild 10 —
v5.1) · displays: Ships 4 / Specialists 4 · **a Manifest on every non-Bruges hull** (v5.0) ·
wharf seeds: Hulk→Bruges + 1 Ship ·
worker placed free · first player fixed.

## 10. Kit deltas (v5-era — every ruling that touches a printed face lands a note here; older deltas live in git history)

**v5.4 “The Tide” delta (2026-08-23, ruled — REPRINT + one new bit):** the Public Works
become a **BAG**, not a setup deal — add a **draw bag** for them (the kit now needs 3 bags:
Ships · Specialists · Public Works). **Every Public Work reprints without its permanence:**
the *(ephemeral)* tag leaves the **Bonded Store** and **Victualling Yard** faces (the whole
family is ephemeral now, so the word stops distinguishing anything) — the Bonded Store's
face keeps only its **on-sail 2-goods payout**, the Victualling Yard's only its **on-load
×2**. The **Venture sheet reprints**: `Staple Rights`' public line is **±2** (was +2▲ —
up-only, the market's missing brake); its icon wants a new **`bourse-pm2`** glyph (the ±1
glyph stands in — briefed in `art/ICONS.md`). The **cask tiles reprint**: *Open 1 Venture*
drops to **Q2+**, so **Hopped's 12-tile census now prints 2 of them** (the Q2 pool goes
5 verbs → 6; the Venture door was starved, not priced shut). The **player aid + rulebook
reprint** (the tide, the bag, the Q2 verb). Counts otherwise unchanged.

**Component-copy ruling (2026-08-23, designer-ruled — REPRINT, no counts, no rules):** THE
GOLDEN RULE lands in `STYLE.md` §4c — rules never live on components, boards, or in the play
interface. Every building/Venture face rewords to the **trigger grammar** (*On load · On sail ·
On sail to <Kontor> · On line · At end* — the trigger on its own line when a face carries more
than the bare pair; the cask tiles' icon+text pattern is the model). The **four Staple Houses
take proper names** — Bruges Hanzehuis · London Steelyard · Bergen Bryggen · Novgorod
Peterhof. App tooltips compress to *name (family): trigger, effect*; the Bourse strip drops
its rules paragraph (the teaching lives in the rulebook §8). Face anatomy: the BIG action
icon (≈ two text lines tall) is its own column, the trigger + action stack beside it; titles
print bare — no lucide crest — sized to fit or wrapped to two lines. The Guild Tastings stay OUT of
the printed rulebook while in development (`RULES.md` §12 is their one rules home).

**v5.3b kit pass (2026-08-22 — wording/visual REPRINT, no counts, no rules):** the whole
tile set rewords **icon-first** (icons carry resources/actions; words only where an icon
can’t; never sentences — the v5.1 minimal-text ruling re-enforced after drift) · the
**Venture tiles restyle onto the building-card anatomy** with the **owner’s colour ring
printed as the tile’s inner border** (the family finally shares the buildings’ visual
language) · the **expansion casks/recipes reprint their Bourse lines** (specialty = a
marker at 0; Jopenbier = off the Bourse) · art stand-ins noted in `art/PROMPTS.md`
(Ropewalk/Weigh House briefed but not yet generated; the four Staple crests share one
generic face; the 8 Venture faces borrow retired-tile portraits — generation list filed).

**v5.3b delta (2026-08-22, ruled):** the **Tollhouse reprints as the toll bench** — a load
at its slot lets the loader shift any Bourse marker ±1 (the stamp face retired). One tile.

**v5.3 delta (2026-08-22, ruled — the third letter):** **+1 board strip** (the Bourse) ·
**+8 beer price markers** · the **building deck/display leave the table** (setup stands 3–4
random Public Works; the rest stay boxed) · **Venture tiles reprint** (the public line joins
each face) · **Bergen mat + player aid reprint** (the prize adds *shift any marker ±1*; the
2-goods fallback stays) · the **Wharf/rulebook reprint** (no mason’s die anywhere; the
scorepad drops the Buildings column). Counts otherwise unchanged.

**v5.2b delta (2026-08-22, ruled — the second letter):** REPRINTS, no counts — the **Wharf
board** (Market primary **Source 3** ⚙ — the numbered `goods-3` face is briefed, the plain
basket stands in) · the **Venture sheet + rulebook ladder line** (an L1 REPLACES a Public
Work you invested in — never an open slot) · the **cask-tile grammar note** (*Brew 1* = the
top tile; only the station searches) · the **Bergen mat + player aid** (the 2-goods
fallback line printed: no seat → 1 `G`+1 `H`).

**v5.2 delta (2026-08-22, ruled):** the building family SPLITS — **Public Works** print 13
(brown; Granary · Mission Quay · Racking · Assay · Abbey · Hop Exchange · Merchants'
Exchange · Rich Berth · Capstan leave the box; **+4 Staple Houses**; deal 11) and the
**16 Venture tiles** enter (4 dual-use designs × 4 house-ringed sets, double-sided L1/L2);
the investor's die MATURES at 6; Customs reprints at −1; the Ropewalk reprints as the
cross-quay load. Header/checklist reprint v5.2.

**v5.1 delta (2026-08-19):** **−3 building tiles** (Scrivener's Hall · Hiring Post ·
Almoner's Stall — retired) · **+2 building tiles** (Ropewalk · Weigh House) — the box prints
**19, setup deals 17** ⚙ · the **converted buildings reprint as RIDERS** (`[host icon] here:` +
effect icons, minimal text — Granary · Mission Quay ×2 · Racking · Assay · Abbey · Hop
Exchange · Warping Capstan; Customs prints **−2** · Rich Berth prints the **2 G buy** line) ·
**+2 specialist tiles** (Broker · Brewer's Mate — the roster **15 designs / 25 tiles**, deck
20/20/25 at 2/3/4p) · **specialist tiles reprint** (icon-first station-flow wording; the
**Chandler** swap rides the station Source) · player-aid + rulebook reprints. Presence
placement is FREE everywhere it survives (the priced channel left with the Almoner).

**v5.0 delta (2026-08-18):** **−15 Order tiles · +12 Manifest cards** (2×1.32″ — §7b) · the
**Destinations board reprints** (the Order row → the Manifest deck well) · the **Wharf board
reprints** (every station prints its PRIMARY + ALTERNATE action) · **Ship tiles reprint**
(the trigger berth prints READY + the die minimum — both boarding gates) · the **player
boards reprint** (the Orders pile zone → the Manifest reminder) · the **Chronicler** and
**Merchants’ Exchange** tiles reprint (the v5.0 reworks) · player-aid + rulebook reprints.
Cask counts and mixes unchanged — the stacks are the same tiles, now searched and returned.


## 11. Known gaps ⚙ (the watch list)

1. **Pile mixes** (which load bonuses print at which quality depth) are engine-random top-cards
   today; the physical pile composition wants a printed distribution pass before the next kit.
2. Cask counts (6/type floor) unchanged — re-read after human pace data.
3. **The dice pool (13 ⚙) is THE pace dial** — and v5.3 freed the building duty from the
   dice while the v5.2b sweep recommended 14: re-measure pace on the Bourse build before
   dialing `PRES_POOL` (the pool question lives in `DESIGN.md` §10).
4. **Art stand-ins** — Broker · Brewer's Mate · Guild Chancery · Ropewalk · Weigh House ·
   the four Staple crests · the 8 Venture faces: briefed in `art/PROMPTS.md`, not yet
   generated.
