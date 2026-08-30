# Brewhouses of the Hanse — The Rules (v6.4 "The Voyage" · TEST BUILD)

*The one rules document. Clean operational rules only — the v6 program and its
constitution live in `V6-PLAN.md`; design rationale in `DESIGN.md`; the frozen v5.8 game
(rules, kit, engine) at `archive/v5/`. Numbers marked ⚙ are tunable placeholders. This is
the Phase 3 TEST BUILD: `play.html`, the print kit, the manifest and this document are
current; the rulebook still describes v5.8 until Phase 2 reprints it.*

**2–4 players · c. 1350 · you run a merchant brewing house on the Hanse's sea lanes.**
Goods are the only currency — no money, no spendable prestige. The work runs **Brew fast,
sail far** — casks cross a map to the four Kontore, and **the price is set the day you
make port.** The winner is the house with the most ★ when the dice run out.

---

## 1. Setup (symmetric)

Each player starts with (⚙):

- **3 `G` (grain), 2 `H` (hops)** — storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipe cards (COLLECTED side; a card completes on that
  beer's first **load**). More recipes are earned (§8).
- A **player board**: 3 vessel slots · 2 specialist seats, all open.
- **13 QUALITY DICE ⚙ — the whole runway, public.** A die leaves the tray at brew (it IS
  the cask), rides the Ship across the sea, and parks at the Kontor on landing. An
  **EMPTY tray sets the final round** (§11).
- **6 HOUSE MARKERS ⚙** in your colour — they stand as **posts** on the sea map and
  **factors** at the Kontore (§6).
- A **warm-start Ready Gruit** in vessel 1 (die at 1).

Shared board:

- **The Wharf** — 4 stations and 8 slots; each slot sits on exactly one of the four **lines** (§3).
- **THE SEA MAP** (§5) — the four **lanes** out of the Wharf through the **waypoint legs**
  (**Wadden Coast · Dover Strait · Skagen · the Sound**) to the four Kontore. At setup
  the **Wadden Coast and Skagen are open**; **Dover Strait and the Sound are CLOSED**
  (closure tiles on the map; chart fee printed: 2 `G` ⚙ each). Bruges and Bergen are
  reachable from the first sail; London and Novgorod wait on a chart.
- The four **Kontore** (Bruges · London · Bergen · Novgorod), each with **2 factor
  seats** ⚙ printed on its panel — and its **KONTORHAUS power** printed beside them (§6).
- **The ESTABLISHMENT supply** beside the map: **3 designs × 2 tiles each ⚙** (Toll
  Court · Victualling Post · Pilot's Rest) — the post upgrades, first come first served
  (§6).
- **Deal 3 of the 4 export beers** (the variable ladder). **Cask tiles** in face-up
  searchable stacks, one per beer (as v5.8: full Brew searches, delivered tiles return
  to the bottom).
- The **Ship deck** (Skute 1 · Cog 2 · Hulk 3 berths, each bound for a printed Kontor),
  display of 4 ⚙.
- **Public Works:** draw **3 (2p) / 4 (3–4p) ⚙** of 13 onto random slots; the rest are
  the BAG (the tide, as v5.8: a Work departs with the Ship at its slot, boxed; the bag
  re-furnishes at end of turn).
- **The Bourse** on the Destinations board: one marker per in-play beer except Gruit
  (and Jopenbier), **all opening at the TOP (+3 ⚙)**. The market only falls on its own.
- The **Specialist deck** (15 designs ⚙), display of 4.
- Warm start: a **Hulk → Bruges** + one more dealt Ship dock at the wharf.

Each player places a worker on any station — opening placement free. First player fixed.

---

## 2. The turn — MOVE · LINE · STOPS

On your turn:

1. **MOVE** — move your worker to an **adjacent station** (orthogonal — the diagonal
   never connects; turn 1 places anywhere). **The move is the turn** — there is no
   staying put. Sharing a station costs nothing.
2. **LINE** — activate the **row or the column** through your station: its two
   stations and its two **end slots** (§3).
3. **STOPS** — resolve the line **in any order, all optional**, each stop at most once:
   - **your station** works its printed **PRIMARY** action;
   - the line's **other station** works its printed **ALTERNATE** action;
   - **each end slot** — **load one Ready cask** onto the Ship docked there (§4).

**The worker stands on the half it worked:** each station tile is split on the diagonal
into a **row half and a column half**. Place your worker on the half facing your line —
the standing pawn is the whole table's record of which line each house worked, until its
next move.

**The line is read LIVE** — a Ship commissioned onto one of the active line's end slots
mid-turn opens that slot's load stop this same activation.

*(v6.3: the line activation returns — two moves, two lines, a handful of stops; every
stop is a single verb, so the choices stay few and the turns stay fast.)*

**THE CURRENT (the drift):** at the start of the **first player's turn each round**,
**every Ship at sea advances one leg, together, in one sweep** — lane order Bruges →
London → Bergen → Novgorod, the Ship nearest its Kontor first ⚙. A closed passage halts
a Ship where it stands. Landings resolve in the sweep's order (§5). Nothing is
remembered: the round marker is the current's clock, the map is the tracker.

---

## 3. The Wharf — four stations, eight slots

```
        A ── B            A  Market   (Source)   B  Brewhouse (Brew)
        │    │
        C ── D            C  Harbor   (Ship)     D  Cellar    (Age)
```

Each station prints **TWO single verbs**: the **PRIMARY** fires for the worker standing
on it; the **ALTERNATE** is that station's **own lesser counter**, served when it is read
**across the line** (v6.4 — the street model: your worker walks a street, works its main
building in full, and picks something up at the far shop's counter in passing). Never a
menu — the line position names the verb:

| Station | PRIMARY (your worker here) | ALTERNATE (read across the line) |
|---|---|---|
| **A · Market** — *the merchant's desk* | **SOURCE 3** — take **3 goods**, any mix | **CHART** — open a passage / raise a post or factor / upgrade one (§6) |
| **B · Brewhouse** | **BREW** — pay a recipe into an open vessel + a tray die at the printed start value; **search the beer's stack — choose the tile** (its load bonus rides the cask) | **TRADE** — factor-gated: shift any beer's marker **±1** (±2 with the Bergen Kontorhaus) (§7) |
| **C · Harbor** — *the shipmaster's desk* | **COMMISSION** — pay the Ship's printed fee (Skute 2 `G` · Cog 1 `G` · Hulk free ⚙), place it on a shipless slot, **one free load onto it** | **SAIL** — advance **any one Ship at sea** one leg (§5); free with a cask of **yours** aboard, else **1 `G`** ⚙ (the push); a closed passage blocks |
| **D · Cellar** | **AGE 3** — turn your aging dice up three steps, split freely | **LOAD 1** Ready cask onto **any** docked Ship — the cellar rolls one out to the quay |

The pairings read off the board — from the Market, the row: Source + Trade (the
merchant's day) · from the Harbor, the row: Commission + Load (the cellar hands a cask
across the street) · from the Cellar, the row: Age + Sail (ripen the stock, push the
fleet) · from the Brewhouse, the column: Brew + Load — every line is a working turn.

**The CHART action in full:** pay the printed fee to **open a closed passage** (your
post stands there free — the charter's privilege), **place a post** on an open waypoint
(1 `G` ⚙, open seat required), **seat a factor** at a Kontor you have delivered to
(3 `G` ⚙, open seat required) — or **UPGRADE a marker you already have**: a post onto an
**establishment** tile (2 `G` ⚙) or a factor to its Kontor's **Kontorhaus** (3 `G` ⚙) (§6).

**The lines** (each slot belongs to exactly one): top row **A+B** (ends s8·s3) · bottom
row **C+D** (ends s7·s4) · left column **A+C** (ends s1·s6) · right column **B+D** (ends
s2·s5). Each end slot of the active line offers **one load** of the Ship docked there.

**Slots hold a Public Work (bottom) and/or a Ship (top) — never casks.** The Public
Works are as v5.8: die-less neutral furniture, passive on their own slot's traffic
(Kiln die +1 at load · Tollhouse loader shifts ±1 · Customs minimum −1 · Ropewalk
cross-load · Cooperage +1 berth +1★/load · **Weigh House: the departing cargo is
CERTIFIED — the tile rides the Ship and its landing does not glut** · Staple House +2★
⚙/cask on a matching departure · Bonded die +1 & 2 goods to every shipper at departure ·
Victualling bonus ×2), and **every one departs with the Ship at its slot** (boxed — the
tide; the bag re-furnishes at end of turn).

*(The v5 Venture family — the hand of four wharf tiles, public lines, the FLIP — is
retired from play in v6.0. Its ideas live on as the map's posts and factors. The tiles
stay in the box pending the Phase 2 re-derivation.)*

---

## 4. The cask & the die (unchanged law)

Exactly as v5.8, whole: **the die is the cask** — set at brew to the printed start value
(quality − aging steps), aged up to the quality (**READY**), never turning on its own;
load-side lifts push past it (cap 6); **a Kontor's minimum reads the die as it boards**;
the die rides the Ship across the map and **parks at the Kontor on landing** — pips,
presence, majority weight and the clock in one component. The beer table, brew costs,
recipe fees (`H` = Q−3, paid at every channel), the eight load bonuses and the searchable
stacks all carry from v5.8 unchanged, with ONE re-derivation:

- The **Open 1 Venture** load bonus becomes **CHART 1 — take one Chart action, its fee
  waived** ⚙ (open a passage · place a post · seat a factor; the eligibility rules of §6
  still apply).

Keut's printed perk (its landing also places 1 presence), Gruit's pin, and the
Specialty-Beers/Jopenbier toggles ride along unchanged.

---

## 5. The sea — lanes, voyages, landings (the second loop)

**The map:** four lanes out of the Wharf —

```
  WHARF ── Wadden Coast ── BRUGES
              └── Dover Strait ── LONDON
  WHARF ── Skagen ── BERGEN
              └── the Sound ── NOVGOROD
```

- **DEPARTURE.** A Ship **departs the moment it is full** (a Skute on its first load):
  it leaves its slot and stands on its lane's **first waypoint** at once. The slot's
  Public Work departs with it (the tide — boxed; the Weigh House rides ON the Ship,
  certifying it; the Staple House and Bonded Store pay at departure as printed).
- **AT SEA.** The Ship advances one leg per **current** (§2) and per **SAIL** (the
  Harbor's printed ALTERNATE, §3). Its dice ride in public view. A **closed passage**
  ahead halts it until charted.
- **POST RENT.** When a Ship **enters a waypoint**, each **post** standing there pays
  its owner **1 `G`** ⚙ from the supply (once per Ship per waypoint). An **establishment**
  standing there serves its owner as printed on its tile (§6) — the Pilot's Rest resolves
  as the Ship enters: it advances **one extra leg at once** (a closed passage still
  blocks; the extra leg can be the landing).
- **LANDING.** Advancing past the last waypoint lands the Ship at its Kontor. Each cask
  aboard **delivers in boarding order**: score **★ = its die + its beer's marker AS
  PRINTED AT LANDING** (floor 0; Novgorod +3★ ⚙ on top), park the die, take the Kontor's
  prize (**the Kontor's thing OR 2★** ⚙, owner's choice — §8). **Then the glut:** each
  beer TYPE that was aboard steps its marker down ONE (never per cask; a **CERTIFIED**
  cargo does not glut). Then any **factor step** (§6). The Ship returns to the deck.
- **You cash the price on the day you make port** — the marker can move (TRADE, the
  toll bench, Bergen's prize, rival landings) while your cargo is at sea. That window
  is the market game.
- **END-GAME CARGO:** after the final round, every Ship still at sea **lands at once**
  (lane order): each cask scores **its die only** — no marker, no premium, no prize —
  and parks (presence and majorities count). No glut. ⚙

---

## 6. Posts & factors — developing the network

Your 6 house markers ⚙ serve two jobs, both placed with the **CHART** action — taken at
the **Market** (§3), or position-free via the *Chart 1* load bonus and **London's
prize**:

- **A POST** stands on a waypoint (2 seats per waypoint ⚙ · 1 at 2p ⚙; fee 1 `G` ⚙;
  free when you're the one who **opens** a closed passage). It pays you **1 `G`** ⚙ each
  time **any** Ship enters that waypoint. Your route earns even on rivals' cargo.
- **A FACTOR** sits at a Kontor's printed seat (2 per Kontor ⚙; fee 3 `G` ⚙; you must
  have **delivered there** before). Two powers, both printed on the panel:
  - **The factor's step:** after **your** Ship lands there and the glut resolves, step
    the marker of **one beer you landed** back **+1** ⚙.
  - **The trading license:** any seated factor (anywhere) unlocks the **TRADE** action
    (the Brewhouse's printed ALTERNATE, §3).

Posts and factors are never displaced, never lost, and carry no die.

### The upgrades (v6.1) — deepening a standing marker

Both upgrades are **CHART actions** (the Market's ALTERNATE, or the *Chart 1* bonus, or London's
prize).
An upgrade spends **no house marker** — the standing marker deepens in place, and the
flipped/underlaid **tile IS the state**. Each marker upgrades **once**; upgrades are
never displaced or lost.

**A post → an ESTABLISHMENT** (fee 2 `G` ⚙): take any establishment tile from the supply
(**2 of each design** ⚙ — when they're gone, they're gone) and seat your post on it. It
keeps collecting its toll, plus the tile's printed line:

| Establishment (qty 2 ⚙) | Printed line |
|---|---|
| **Toll Court** | Your toll here is **2 `G`** (any entering Ship) |
| **Victualling Post** | A Ship carrying **your** cask enters here: gain **1 `G` 1 `H`** |
| **Pilot's Rest** | A Ship carrying **your** cask enters here: it **advances one extra leg** at once |

**A factor → the KONTORHAUS** (fee 3 `G` ⚙): flip your seated factor to its Kontorhaus
side. It keeps the license and the factor's step, plus **that Kontor's power, printed on
the Kontor panel** — four seats, four different engines:

| Kontor | The Kontorhaus power ⚙ |
|---|---|
| **Bruges** | Your casks landing here: **gain 1 `G` each** |
| **London** | Your **CHART actions pay no fee** (passages, posts, factors, upgrades) |
| **Bergen** | Your **TRADE shifts a marker ±2** |
| **Novgorod** | Your casks landing here: **+1★ each** (banked) |

---

## 7. The Bourse — the glut & the trade (v5.6 law + the new supply)

One track (−1…+3 ⚙) on the Destinations board, a marker per in-play beer except Gruit &
Jopenbier, **all opening at the top (+3 ⚙)**. **A landed cask scores die + marker as
printed at landing** (§5). **The market only falls on its own** — one step per beer type
per landing. The ways UP are actions and posts you build: **TRADE** (the Brewhouse's ALTERNATE; ±1,
factor-gated) ·
**the factor's step** (+1 after your landing) · the **Tollhouse** bench (loader ±1) ·
**Bergen's prize** (±1 per cask, as v5.8) · the **Bergen Kontorhaus** (your TRADE moves
±2 — §6). Holding a price up is an engine you build.

---

## 8. The Kontore & prizes

| Kontor | Minimum ⚙ | Lane | Prize per cask ⚙ | Majority (1/2/3) ⚙ |
|---|---|---|---|---|
| **Bruges** | 1 | Wadden Coast (open) | **Gain 1 recipe** (its `H` = Q−3 fee; Q3s free) — OR 2★ | 4 / 2 / 0 |
| **London** | 2 | + Dover Strait (closed) | **A free CHART** — any Chart action (§6, upgrades included), the fee waived — OR 2★ | 5 / 3 / 1 |
| **Bergen** | 2 | Skagen (open) | **A specialist** (free) · OR **shift any marker ±1** · OR 2★ | 9 / 5 / 2 |
| **Novgorod** | **3** | + the Sound (closed) | — **+3★ per delivered die** ⚙ (no thing; the Kontor that pays only ★) | 8 / 5 / 2 |

Prizes resolve when gained, owner's choice, boarding order — as v5.8. Presence = parked
dice; placing presence is free and flows only through casks (the load bonus · Keut).
Majorities pay at every count; 2p pays 1st and 2nd; **no parked dice at a Kontor, no
share of it**.

---

## 9. The player board & the specialists

3 vessels · 2 seats, as v5.8. Specialists are earned (Bergen's prize free · the *Gain 1
specialist* bonus at the printed fee). The roster carries from v5.8 with **four
re-derivations** for the sea (⚙, names provisional):

- **Pilot** *(replaces the Broker)* — at your turn start: **advance one Ship carrying
  your cask one leg** (closures still block). Fee 1 `G` ⚙.
- **Surveyor** *(replaces the Brewer's Mate)* — **your CHART passage-and-post fees are
  waived, the post upgrade included** (the factor-side fees still apply). Fee 1 `H` ⚙.
- **Supercargo** *(re-derived)* — each time a Ship carrying **your** cask **lands** on a
  turn that is not yours (the current included): gain **1 `G` 1 `H`**.
- **Wharfinger** *(v6.1 — replaces the Chandler's swap)* — **your posts' tolls pay +1
  `G`** (the Toll Court's 2 `G` becomes 3 `G`). Fee 1 `G` ⚙.

Everyone else — Cellarman, Grain Factor, Hop Gardener, Stevedore, Braumeister, Guild
Scholar, Innkeeper, Chronicler (+1★/landed cask), Alderman, Town Crier, Shipwright — is
unchanged from v5.8.

---

## 10. Goods & storage

`G` grain · `H` hops — the only currency. Cap 8 ⚙. The faucets: the Market, the load
bonuses, **post rent & the establishments**, prizes. The drains: brews, commissions,
recipe/specialist fees, **charts, posts, factors, upgrades, pushes**.

---

## 11. End of the game (the dice clock)

**ONE clock: the first EMPTY TRAY** — every die committed (in a vessel, aboard a Ship at
the wharf **or at sea**, or parked). Finish the round, land the end-game cargo (§5),
score. Dice never return. **MAX_ROUND 40 ⚙** backstops (the fast turn spins more, smaller
rounds than v5.8; pace target ~18–40 rounds ⚙, re-read at Phase 4).

## 12. Scoring

1. **Landings** — die + marker at landing (Novgorod +3★ ⚙), scored as they happen.
2. **Scored in play** — prizes taken as ★ · Cooperage wharfage · Staple premiums ·
   Chronicler ★ · the Novgorod Kontorhaus ★ · placed presence (1★; Town Crier +2★).
3. **Majorities** — by parked dice (4/2/0 · 5/3/1 · 9/5/2 · 8/5/2 ⚙; 2p pays two places).
4. **The Flight** — distinct beers SHIPPED: (n−1)², min 3 ⚙.
5. **The Guild** — the Alderman's printed line.
6. Tiebreak: vessel dice, then goods.

*(Every value above is read off standing components: the parked dice, the markers, the
posts and factors, the completed cards. Nothing is remembered.)*

## 13. Expansions

**Specialty Beers** and **Jopenbier** ride unchanged (roster content under the same
grammar). **The Guild Tastings are OFF in the v6.0 test build** (their pour grammar rode
the retired line-activation; they re-derive at Phase 2 or retire). The Trade Roads seam
stays tabled.
