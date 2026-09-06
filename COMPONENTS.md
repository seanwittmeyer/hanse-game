# Brewhouses of the Hanse — Components (v8.0 “Brewer & Merchant” · §0 is the live delta)

> **The box manifest.** What is *in* the game, line by line. **Every count is a placeholder ⚙.**
>
> - Operational rules: `RULES.md` (the one clean rules document, **v8.0**). Design rationale & history: `DESIGN.md` §9; the v8 program, the designer's review and the implementation plan: `V8-PLAN.md` §12–§13.
> - The live build is `play.html` — **v8.0 “Brewer & Merchant”** (`KEY hanse-v80a`) — the source of truth on values and behaviour.
> - `print.html` and `rulebook.html` are re-derived at the v8 kit pass; until then they describe the v7.0b build and are marked so.
> - **READ §0 FIRST.** §0 states the v8.0 kit truth — what was ADDED, RE-CUT, and RETIRED. §§1–17 below still enumerate the v5.8/v7 body in detail and are superseded where §0 says so; the full section rewrite is the kit pass.

---

## 0. THE v8.0 KIT DELTA (2026-09-06 — the truth of the current build)

**THE BOX, counted against v7.0b ⚙:**

| Component | v7.0b | v8.0 | State |
|---|---|---|---|
| The Wharf board | 1 | 1 | re-printed station faces: Market *Source 2 / Load 1* · Brewhouse *Brew / Build* · Harbor *Commission (must) + Post / Build a Kontor · Raise* · Cellar *Age 3 / Cart 1* |
| The Destinations board | 1 | 0 | **RETIRED** |
| **The sea board** | 0 | 1, double-sided | **NEW** — Hamburg (the Wharf) at the centre · the cart road to Bruges · five segments (W1 the Wadden Coast · W2 the Dover Strait → London; E1 the Skagerrak → Bergen; E1 · E2 the Sound → Novgorod), each printing **one post seat per colour** (side A: 2 seats · side B: 4) · three far Kontor panels (the minimum Q2 · **building slots** 2 on A / 3 on B, the third for 4p · the majority pair · the field · the prize line) · the Bruges panel (**the yard track**: BEST 1–3 · GOOD 4–6 · OK 7+, side A 1–2 / 3–4 / 5+ · **the hall**: 8 places on B / 6 on A, the first three printing 2 · 2 · 1 goods · **the hall die's seat**) |
| Market & Stores board | 1 | 1 | the Bourse lane struck; displays: Ships 3 · Specialists 4 · recipes; the score ring |
| Player boards | 4 | 4 | re-printed: 3 vessels · 2 seats · the **personal supply** space · a rack for the hand of 4 private tiles and the set of 3 Kontor building tiles; no tray graphic |
| Quality dice | 52 | **44** (11 × 4) | ten in the supply + the starter post; the same dice are casks, posts and Kontor building markers |
| **The hall die** | 0 | 1, neutral | **NEW** — stands on the Bruges panel at 2; +1 per present |
| Private building tiles | 16 Ventures | **16** (4 designs × 4 colours, tier 1 / tier 2) | re-faced: Granary / Kaufhaus · Scriptorium / Brewers' Guildhall · Cold Store / Lagering Cellar · Counting House / Shipping Office; **printed points 2 / 4**; no ledger seat, no die |
| **Kontor building tiles** | 0 | **12** (3 designs × 4 colours) | **NEW** — Warehouse (on your landing: +1 `G` 1 `H`) · Kontorhaus (+1 ⚜ more) · Guildhouse (RAISE one die of yours at sea +1); placed in a Kontor slot, marked with the builder's die |
| **Kontor chits** | 0 | 3 | **NEW** — a wild Ship's named Kontor, set on the hull by the first load |
| Public Works | 12 | 12 (7 as filler: Malt Kiln ×2 · Customs House · Ropewalk · Cooperage · Bonded Store · Victualling Yard) | the Weigh House and the four Staple Houses sit out; deal 6 at 2–3p / 4 at 4p; the roster pass comes after the core |
| Ship tiles | 18 | **18** (per far Kontor Cog ×3 · Hulk ×2; wild Cog ×2 · Hulk ×1) | re-faced: no Bruges hulls; the wild face prints a dashed Kontor seat; Cog free · Hulk 1 `G` |
| Cask tiles | 52 | 52 | re-printed on the eight-verb pool (source · age · load · brew · recipe · specialist · build · post); Gruit's sixteen all print *Gain 2 goods* |
| Recipe cards | 24 | 24 | fees only (Broyhan 1 `H` · Keut 1 `G` · Mumme 1 `G` 1 `H` · Bock 1 `G` 2 `H`); no kettle line, no far-dice icons |
| Specialist tiles | 15 designs | **10 singles** | Braumeister · Shipmaster · Cellarman · Stevedore · Agent · Lodesman · Carter · Guildmaster · Chronicler · Alderman |
| **⚜ invitation tokens** | 0 | 16 | **NEW** (wooden, or the contract backs); no cap, no ceiling |
| Contract cards · demand cards · majority ladder markers · private flags · Bourse price markers | 14 · 12 · 4 · 4 · 8 | 0 | **RETIRED** |
| Workers · score discs · goods tokens | as now | as now | kept |
| Player aids | 3–6 | 3–6 | re-printed at the kit pass: the turn · the four verb pairs · the three load conditions · the count · the end |

**Headline:** one new board, one neutral die, twelve small Kontor building tiles, sixteen
tokens, three chits, eight fewer dice, four decks and trackers gone.

**THE RULINGS THAT TOUCH A PRINTED FACE (the v4.13 law — every one lands here):**

- **The dice are a personal supply** (no tray): the player board prints the supply space and
  the line *11 dice · 10 here · 1 at sea*.
- **The sea board prints every home for ownership and every destination**: post seats per
  colour on every segment; building slots with a die seat and a tile seat at every far
  Kontor; the minimum Q2 on every far panel; the yard track's three zones and their prizes;
  the hall's places and the hall die's seat; the cart road; Hamburg.
- **The Kontor building tiles print name + trigger + effect** (*On your landing here:* …) and
  a die seat for the builder's die (the modifier · the pips).
- **The private building tiles print their points** (2 on tier 1, 4 on tier 2) beside the
  station they flank and their line; the ledger seat is struck.
- **The Ship tiles print the Kontor or the wild seat**, the berths and the fee; the Kontor
  minimum leaves the hull (it prints on the panel).
- **The cask tiles print the eight verbs**; LIFT leaves the pool.
- **The Wharf board's station faces**: Source 2 / Load 1 · Brew / Build · Commission (*must*)
  + Post / Build a Kontor · Raise · Age 3 / Cart 1.

**RETIRED (v7 → v8):** the Destinations board · the Bourse track and its markers · contract
cards · demand cards · majority ladder markers · private flags · the Venture ledger dice · the
kettle faces (Mash Tun · Great Copper as licences) · the Weigh House and Staple Houses (until
the roster pass) · SAIL-now as a station verb · presence placement · the Skute · three dice
per player.

---

## 1. Conventions *(v5.8 body — superseded where §0 says so)*

- **Goods:** `G` = grain, `H` = hops — the only currency. Storage cap **8 of each** ⚙ (the per-good reading is the engine's, stated at the v7 rulebook pass).
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
| **Destinations board** | 1 | The four Kontor panels — Bruges · London · Bergen · Novgorod — each printing its **minimum (die N+)**, its **prize as a CHOICE** (*the thing **or** 2★* ⚙ — Novgorod instead prints **value = the die +3★** ⚙ and offers no thing), its **majority tiers** (4/2/0 · 5/3/1 · 9/5/2 · 8/5/2 ⚙) and the **parking field** where delivered dice stand (pips face-up = the scored-★ audit) — **plus THE BOURSE TRACK** (v5.6, ruled: it moved here from its own strip). *(The Manifest deck well left at v5.6 — and the deck itself left the game at v5.7.)* *(The kit cuts it as one narrow board pairing with Market & Stores.)* |
| **The Bourse track** *(v5.3 · MOVED v5.6)* | — | **Prints ON the Destinations board** (v5.6, ruled — the standalone strip leaves the kit). One lane, **−1 · 0 · +1 · +2 · +3** ⚙, **cells wide enough to hold EVERY beer token at once** (they stack up at +3 on setup and spread as the game runs). |
| Player boards | 4 | **3 vessel slots + 2 specialist seats — all open from the start** (v45h). The Flight ladder (the Manifest reminder zone clears at v5.7 with the cards). Recipe cards sit beside it. Goods cap 8 printed. |
| **Score track** ring | 1 | A **50-cell ring** (0–49; a lap marker flips +50) wrapping the Market & Stores rim + 1 disc per player — the ★ scored in play (delivery ★ = die + Bourse marker · Kontor prizes taken as ★ · Cooperage wharfage · Staple premiums · 1★ placed presence) as they land. *(New in v4.0 — the hard line demands a home for scored ★.)* |
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
| **Beer price markers** *(v5.3 · RECUT v5.6)* | **8** (1 per brewable beer; a game uses the in-play beers minus Gruit & Jopenbier — 4 in base) | the Bourse track on the Destinations board — a delivered cask scores **die + marker**. **Each token is COLOUR-MATCHED to its beer AND prints the beer's NAME** (v5.6, ruled — four unlabelled discs on one lane was the legibility failure). **All start at the TOP (+3 ⚙)** and only ever walk down. |
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
| **Weigh House** *(v5.7 re-derived)* | 1 | *On sail:* the Ship here sails **CERTIFIED** — its cargo **does not glut** the Bourse | 2 `G` | 3 |
| **Staple Houses ×4** *(Bruges Hanzehuis · London Steelyard · Bergen Bryggen · Novgorod Peterhof)* | 4 | *On sail to the tile's Kontor:* **every delivered cask +2★** ⚙ (*Stapelrecht* — the destination premium) | 2 `G` | 2 |
| **Bonded Store** | 1 | *On load:* the boarding die **+1** (cap 6) · *On sail:* **every player with a cask aboard gains 2 goods** | 2 `G` | 3 |
| **Victualling Yard** | 1 | *On load:* the boarding cask's **load bonus fires ×2** | 2 `G` | 3 |

*(Retired at v5.2, ruled: Granary · Mission Quay · Racking Hall · Assay House · Abbey Cellar ·
Hop Exchange · Merchants’ Exchange — their ideas move into the Ventures below — plus the
Rich Berth (cut) and the Warping Capstan (expansion lot). The freed art files ride the new
faces as stand-ins; briefs queued in `art/PROMPTS.md`.)*

### 6b. VENTURE tiles (print 16 ⚙ — 4 dual-use designs × 1 ringed set per house · 2.5×1.32″ · DOUBLE-SIDED)

**The only family players build (v5.3).** A Venture wears the **owner’s colour ring** and
carries no die. **The four designs are THEMED (v5.5): brew · age · die · points** — one
piece of cardboard per theme, its **L1 on one face and its own theme’s L2 on the other**,
so “one side facing per theme” is a property of the component, not a rule. **Every face
prints TWO lines (v5.3, ruled):** a **PUBLIC line** on top — *gain 1 good · age +1 / +2 ·
Bourse ±1 / ±2* — a free stop for **whoever** activates a line through the slot, and the
**ringed OWNER line** below (the private power; **the owner collects both**).

Each house starts with the same **hand of 4**. **THREE WAYS ONTO THE WHARF (v5.5, ruled):**

1. **PLAY AN L1** — a hand tile lands **L1-side up on ANY OPEN SLOT** (THE OPEN GROUND —
   only with the wharf FULL may it instead replace a Public Work, the worn tile boxed;
   never another player’s L1/L2). Fee **1 `G`**.
2. **FLIP** — a **standing L1 of yours turns over IN PLACE to its own L2 face**; **no hand
   tile is spent**, the cardboard is the same piece. Fee **2 `G`**. *This is the v5.5
   change: four tiles can become four buildings that each reach L2, instead of collapsing
   into two.*
3. **OVERBUILD** — a **second hand tile lands L2-side up over one of your own L1s** (the
   spent L1 tile is boxed; the ground is kept), which is how a **different** theme’s L2
   reaches ground you already hold. Fee **2 `G`**.

**A rival can never overbuild a Venture; an L2 can never be displaced.** Fees are **grain
only** (waived as the London prize). Ventures commit **no die** — the clock is untouched.

| Theme — one tile (front = L1 · back = L2) | Public line ⚙ (L1 · L2) | L1 owner line ⚙ | L2 owner line ⚙ |
|---|---|---|---|
| **BREW** — Mash Tun / Great Copper | +1 good · **age +2** | *this line:* **you may BREW — the stack’s TOP tile** | *this line:* **gain 2 goods AND you may BREW** (full search; normal costs) |
| **AGE** — Warehouse / Assay Loft | +1 good · age +1 | *this line:* **Age 2**, then load 1 Ready cask onto **ANY** docked Ship | *this line:* **pay 2 `H` — EVERY maturing cask straight to READY** |
| **DIE** — Rack House / Lagering Cellar | age +1 · Bourse ±1 | *this line:* swap the dice of 2 of your vessel casks (no quality cap) | *this line:* one vessel cask’s **die +1** (cap 6 — it may pass its quality) |
| **POINTS** — Counting House / Staple Rights | Bourse ±1 · Bourse ±2 | *your loads here:* **+1★ each** | *your casks sailed from here:* **+2★ each** ⚙ |

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
| **Chronicler** *(v5.7 rework)* | **each cask you deliver: +1★** ⚙ (no end-record — the ★ score with the delivery) | 1 `G` 1 `H` | — |
| **Alderman** *(v4.6)* | game end: **+2★ per Kontor with 3+ parked dice** | 2 `G` | — |
| **Town Crier** *(v4.6)* | **place a presence die: +2★** ⚙ (the die parks at face 1 — 3★ total; v4.12) | 1 `G` | — |
| **Chandler** *(v5.1 rework)* | **with your STATION Source: may swap 1 `G` ↔ 1 `H`** (once per turn — the swap rides the Market flow) | 1 `G` | — |
| **Shipwright** *(v4.6)* | **when commissioning Ships, pay no fee** (2 `G` on a Skute, nothing on a Hulk; v4.8/v4.12) | 1 `H` | — |
| **Broker** *(v5.1 NEW)* | **your Market ALTERNATE is Source 2** (full strength) ⚙ | 1 `G` | — |
| **Brewer’s Mate** *(v5.1 NEW)* | **your Brewhouse ALTERNATE searches the stack** ⚙ | 1 `H` | — |

## 7b. ~~Manifest cards~~ — RETIRED at v5.7

**The 12 demand cards leave the kit** (designer-ruled). v5.6's Bourse is the demand layer now
— public, printed, readable — and the Manifest was the game's fourth answer to *what is this
cask worth?*. It also broke the component-state hard line: three lines, each claimable once
per voyage, with **nothing physical marking a spent one**. Ships are pure logistics: berths, a
destination, a minimum. *(Card faces and data live in git history.)*

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
**the Bourse track (on the Destinations board): one price marker per in-play beer except Gruit & Jopenbier, ALL AT THE TOP (+3 ⚙)** (v5.6)
· **specialist deck 20/20/25 tiles at 2/3/4p** (the core 5 × max(2, n−1) + the guild 10 —
v5.1) · displays: Ships 4 / Specialists 4 ·
wharf seeds: Hulk→Bruges + 1 Ship ·
worker placed free · first player fixed.

## 10. Kit deltas (every ruling that touches a printed face lands a note here; older deltas live in git history)

**v7.0b “Build leaves the counter” delta (2026-09-01, designer-ruled — `KEY hanse-v70b`):**

- **The Wharf board reprints the Market's ALTERNATE seat: BUILD → Source 1** (the
  `goods-1` face). Building is not a station verb — it is **earned**: the only two
  Venture doors are **London's prize** (the fee waived) and a cask's **BUILD load
  bonus** (at the printed face fee). The build fee glossary moves to the aid's Venture
  row and the aid front's Build footer line.
- **The cask tiles reprint the SAIL bonus seat as BUILD** (pool seat 7 of 8; the
  per-beer offsets and counts stand, so each Q3+ census swaps its SAIL tiles for BUILD
  tiles). Sail-early keeps its ONE home: the Harbor's ALTERNATE. Kit surfaces: the
  cask sheets (`components.js` `CASK_POOL`) · the aid back's 8-bonus legend · the aid
  front's stations line · the wharf cross · the checklist wharf row.

**v7.0 “The Guild” delta (2026-08-31, designer-called — the §0 head carries the full kit
picture; this note records the SHARED face re-cuts this pass):**

- **The Specialist tile reprints (`components.js` — same-day, designer-mocked):** the
  TITLE moves to the FOOT, seated just above the action line on the gradient scrim —
  the character portrait's head stays clear; the cost pill alone keeps the top-right
  corner. Layout only — every printed value and word stands.
- **v7.0a (designer-ruled, same day — `KEY hanse-v70a`):** the Brewhouse's ALTERNATE
  reprints as **the second kettle** — a second FULL brew (search, choose) at **the
  recipe's cost + 1 `H`** ⚙, the fee printed on the seat; the top-tile draw retires
  from every channel (one brew grammar — the cask tiles' *Brew 1* bonus and the **Mash
  Tun** L1 face reprint as full brews). **The Specialist FEE PILL retires from the
  tile face** (`components.js`) — Bergen's free prize is the one channel, so a printed
  fee was pure conditional noise (the archived kits carried it; the P5 pass re-cuts).

- **The player-board supply note reprints** (`components.js`, the v7 rulebook pass):
  “goods max 8” → “goods max 8 **each**” — the per-good cap is the engine's reading and
  now the stated one (§1 Conventions).
- **The Venture tile reprints (`components.js` — the ONE home of the face):** the v5.5
  PUBLIC line leaves the foot with the line itself; the bottom-right square is now the
  printed **LEDGER SEAT** (dashed, die-marked) — the tray die stands there at 1, a
  rival's use turns it up (cap 6), the pips score to the owner at the end. The L-chip's
  reminder reprints for the v7 ground fees (open 1 `G` · replace 2 `G` · L2/flip 2 `G`
  ⚙). The action line is unchanged cardboard — v7 opens it to any visitor (own casks;
  the tick is the rent), which is a rules fact, not a face fact.
- **THE P5 KIT PASS LANDED (2026-08-31, this build):** `print.html` cuts the full §0
  kit — **contract cards ×14** (the tri-folded Guild letter: the claim condition + the
  ⚜ Invitation identity; uniform letter back, cardstock) · **demand cards ×12**
  (2.5×1.32″ parchment tile: requirement · the ⚜ PRESENT bonus · the +1★ market line ·
  2 die seats; uniform back, plotter double-sided) · the **Destinations board re-cut**
  (each panel: the printed **6-rung ladder** with its dashed marker seat · the
  lane-gate line · the first-landing letter line · the **demand well**; the factor
  sockets and Kontorhaus lines left) · the **Wharf station faces** (Source 3/Source 1 ·
  Brew/the second kettle · Commission/SAIL-now · Age 3/Load-any) · the **ship deck 18**
  (Cog ×10 free · Hulk ×8 1 `G`, display 3; the Skute sheet retired) · the **Venture
  sheet returns** (4 designs × 4 house rings, L1 front / its own L2 back — the FLIP is
  the cardboard) · **majority ladder markers ×4** + **private flags 1/player** on the
  token sheets · the works sheet at the **12-roster, deal 8, no bag** · the v7 player
  aid (tri-fold, fit-gated) · the v7 checklist and PNG-export manifest. RETIRED from
  the kit whole: the sea map sheet · establishments · closures · house markers · the
  Tastings remnants (`components.js` pruned the same day — the generators live in git
  history). Shared-data re-cuts in `components.js`: `HULL` Cog 0/Hulk 1 `G` (the app's
  hull tiles had still printed the v6 fees — drift caught and closed) · `SHIP_DECK` 18
  · `CASK_POOL` prints the v7 verbs (**LIFT** die+1 · **BUILD** at its fee) in the engine's
  census order · the works roster drops the Tollhouse ⚙ and the Chancery.

**v5.7 “Plain Sail” delta (2026-08-23, ruled — 12 CARDS LEAVE THE KIT):**

- **The 12 Manifest cards are cut.** They were the game's fourth answer to *what is this cask
  worth?* (die · port premium · Bourse marker · Manifest), and v5.6's Bourse does that job
  publicly and readably. They also broke the component-state hard line: three lines each
  claimable once per voyage with **nothing physical marking a spent one**.
- **Ships reprint without their card foot** — no tuck, no demand strip. A hull is berths, a
  destination and a minimum.
- **The Weigh House reprints, re-derived:** *"On sail: this cargo does NOT glut"* (was: each
  cask may claim 2 Manifest lines). It certifies the shipment, so the market does not absorb
  it — the one way to sell without spending the price, and the tool the specialist lane wanted.
- **The Chronicler reprints, re-derived:** *"Deliver a cask: +1★"* ⚙ (was +2★ per Manifest
  claim). Same job — a scoring specialist paid per shipment — on a trigger that still exists.
- **The player board reprints** (the Manifest reminder zone clears). **The player aid and the
  rulebook reprint** (the Manifest rows and §7b go).
- **Hall mode's ⚜ faucet re-homes** to the **voyage** — the first cask you deliver on a sail
  pays one (was: every Manifest claim).
- Counts: **−12 cards.** Nothing else changes.

**v5.6 “The Glut” delta (2026-08-23, ruled — DESTINATIONS BOARD REPRINT · one component
LEAVES the kit):**

- **The Bourse strip is deleted as a separate board** and **reprints as a lane on the
  DESTINATIONS BOARD** (*"The strip we build can simply be added to the destination board"*).
  One track, **−1 … +3** ⚙, and its **cells must be wide enough to hold every beer token at
  once** — on setup they all stack at the top and spread as the game runs.
- **The beer price markers recut:** each token is **colour-matched to its beer AND prints the
  beer's NAME** (*"Beer tokens match color and have a name on them to make it easy to see"*).
  Four unlabelled discs on one shared lane was the legibility failure the designer flagged.
- **The Manifest deck well LEAVES the Destinations board** (*"it didn't really fit there
  anyways"*) — the deck sits loose beside the ship display. Card count unchanged.
- **All four Kontor panels reprint.** Each now prints its prize as a **CHOICE** — *the thing
  **or** 2★* ⚙ — and the **2-goods consolation line is struck everywhere it appeared**
  (Bruges' *no affordable pick*, Bergen's *no seat to fill*). **Bergen prints three options**:
  a specialist · a Bourse shift ±1 · 2★. **Novgorod reprints at +3★** ⚙ per delivered die
  (was +2): without the bump, Bergen taking its prize as ★ strictly dominated it — lower
  minimum, richer majority, same payout, plus an optional specialist.
- **The player aid reprints** (the Kontor table's prize column, the Bourse line). **The
  rulebook reprints** (§the Bourse, §the Kontore, the scoring spine).
- **No cask, ship, building, Venture or specialist face changes.** No count changes anywhere
  except the strip leaving.

**v5.5 “Four Hands” delta (2026-08-23, ruled — VENTURE SHEET REPRINT, counts unchanged):**
the 16 Venture tiles reprint entirely. The four designs **re-derive as themes — brew · age ·
die · points** — and each tile now pairs an **L1 and an L2 of its own theme** on one piece of
cardboard, so the “one side facing per theme” property is carried by the component itself.
Placement gains a **third way, the FLIP**: a standing L1 turns over in place to its own L2
face for the L2 fee, **spending no hand tile** — the tile grammar already supported it (the
back was always its L2), only the rule had forbidden it. **Retired faces:** `Factor's Desk`
(the Manifest re-deal — the Manifest itself is under review), `Guild Residence` (an end-of-
game count, not an engine), `Brewery` (a duplicate of the Brewhouse), and the old
`Warehouse` L1 (+1 cask may board). **New / rebuilt faces:** `Mash Tun` L1 (BREW the top
tile), `Great Copper` L2 (2 goods + a full BREW), `Warehouse` L1 (Age 2 + load onto ANY
docked Ship), `Lagering Cellar` L2 (die +1, cap 6), `Staple Rights` **+2★** per own cask
(was +1★ — an L2 must pay L2 value), `Assay Loft` **2 `H` → EVERY maturing cask READY** (was
1 `H` → one cask), `Counting House` **+1★ per load** (was +1 good). **Public lines reshuffle
to match:** Great Copper prints **age +2** (the existing `station-age-2` glyph — the two-pip
age chip already in the kit), Lagering Cellar and Counting House print **Bourse ±1**, Staple
Rights keeps **±2** (still on the `bourse-pm1` stand-in — `bourse-pm2` remains WANTED). **Art:** six faces keep their existing images; `venture-factor-l1`
(now Mash Tun) and `venture-warehouse-l2` (now Lagering Cellar) ride stand-ins — new briefs
queued in `art/PROMPTS.md`. The **rulebook reprints** (the three ways + a per-theme table);
the **player aid** is unchanged (it never named the faces). No count, size, or foot-colour
change: still **4 designs × 4 ringed houses = 16 tiles, 2.5×1.32″, blue foot**.

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

**The numbered-goods icons land (2026-08-23, ruled — REPRINT, no counts, no rules):** the
art triplet `goods-1` / `goods-2` / `goods-3` exists, so every face that grants a **specific
number** of goods stops borrowing the generic basket and prints its own numeral. **Cask
tiles:** *Gain 2 goods* → `goods-2` (Gruit's pin, every Q2+ census, Jopenbier's pin) ·
Gose's pinned *Gain 3 goods* → `goods-3` (its recipe card too). **Venture faces:** the
`Counting House` owner line and every *gain 1 good* public chip (Counting House L1/L2,
Warehouse L1) → `goods-1` — the Counting House had been printing the plain basket under a
**text “+1” badge**, which a printed face must never do. **Boards & aid:** the Wharf's
Market alt chip and the aid's *Gain 2 goods* legend row follow. The generic **Goods**
legend entry keeps the plain basket — it names the category, not an amount. Same pass:
the **Bonded Store** and **Victualling Yard** faces drop their “it sails away” lines, which
stopped distinguishing anything once the tide became the family rule — each now prints only
what is actually its own (the 2-goods payout · the ×2 load bonus).

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


**v5.8 delta (2026-08-24) — "Pay the Second":** **no new components, three REPRINTS, and one
long-standing kit error corrected.**
- **Player aid reprints** — the Majority row now carries the whole rule: *"by parked dice ·
  none there, none scored · 2p: 1st+2nd"*. The presence gate had been engine-only behaviour
  since the majorities were introduced — a player could not read it off any component, which
  is the component-state line (ruled 2026-07-12). It is printed now. Aid ALL FIT re-checked.
- **Rulebook reprints** — the 2-player sidebar read *"Majorities pay first and third place
  only"*, which was wrong twice over (the engine paid **first only**, and "first and third"
  describes nothing). It now reads **first and second**, and the end-game majority line states
  the presence gate.
- **Destinations board — KIT ERROR CORRECTED:** the printed short note under Novgorod still
  read *"every delivered die scores +2★"*. Novgorod went to **+3★** at v5.6 and the long-form
  note was updated, but the SHORT string is the one that renders. **Any Destinations board
  proofed between v5.6 and v5.8 prints the wrong Novgorod premium — reprint it.**
- The tier triples themselves are UNCHANGED on every face (4/2/0 · 5/3/1 · 9/5/2 · 8/5/2), so
  the boards need no new numbers — only the 2p line and the gate.

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
