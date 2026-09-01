# Brewhouses of the Hanse — The Rules (v7.0 "The Guild" · TEST BUILD)

*The one rules document. Clean operational rules only — the v7 program, its reflection,
its mechanic sheet and its red-team record live in `V7-PLAN.md`; design rationale in
`DESIGN.md`; the frozen v5.8 game at `archive/v5/` and the frozen v6.5b test build at
`archive/v6/`. Numbers marked ⚙ are tunable placeholders. This is the v7.0 TEST BUILD:
`play.html`, this document, `COMPONENTS.md` §0, `STYLE.md` §4e, the print kit
(`print.html`) and the rulebook (`rulebook.html`) are all current.*

**2–4 players · c. 1350 · you run a merchant brewing house of the Hanseatic League.**
Goods are the only currency — no money, no spendable prestige. The work runs **Source →
Brew → Age → Ship**; casks sail to the four Kontore, the market only falls, and the
guild's halls pay the brewer who arrives invited. The winner is the player with the most
★ when the dice run out.

---

## 1. Setup (symmetric)

Each player starts with (⚙):

- **3 `G` (grain), 2 `H` (hops)** — storage cap **8 of each good** ⚙.
- The **Gruit** and **Hopped** recipe cards (COLLECTED side; a card completes on that
  beer's first **load**). More recipes are earned (§9).
- A **player board**: 3 vessel slots · 2 specialist seats, all open.
- **13 QUALITY DICE ⚙ — the whole runway, public.** A die leaves the tray at brew (it IS
  the cask) or at a Venture build (it becomes the **ledger die**) and never returns. An
  **EMPTY tray sets the final round** (§14).
- The **hand of 4 Venture tiles** ringed in your colour — one per theme (brew · age ·
  die · points), each tile an L1 face and its own theme's L2 face (§5).
- **1 PRIVATE FLAG** in your colour (§7).
- A **warm-start Ready Gruit** in vessel 1 (die at 1).

Shared board:

- **The Wharf** — 4 stations ringed by 8 slots; each station is flanked by exactly two
  slots (§3).
- **Public Works: shuffle the 12-tile roster ⚙ and deal 8 — one onto every slot.**
  Nothing ever refills a slot: the tide (§7) and the Ventures' replace-builds (§5)
  strip the wharf into the ground the engine game is played on.
- The **Destinations board** — the four **Kontor panels** (Bruges · London · Bergen ·
  Novgorod), each printing its **minimum**, its **prize line**, its **DEMAND well**,
  its **MAJORITY LADDER** (marker on step 1), its **parking field**, its
  **first-landing letter** line — and, on the far panels, the **lane gate** (§6).
  **The Bourse track** prints beside them: one marker per in-play beer except Gruit
  (and Jopenbier), **all opening at the TOP (+3 ⚙)**. The market only falls (§8).
- **Deal 3 of the 4 export beers** (the variable ladder). **Cask tiles** in face-up
  searchable stacks, one per beer (a full Brew searches; delivered tiles return to the
  bottom).
- The **Ship deck** (Cog 2 berths, free · Hulk 3 berths, 1 `G` ⚙; each hull bound for a
  printed Kontor), display of **3** ⚙.
- The **Contract deck** (14 cards ⚙), shuffled; display of **3** ⚙.
- The **Demand deck** (its own deck ⚙: one **type card per DEALT export** (+3★ each;
  undealt exports' cards to the box) · *Q2+* +2★ ×2 · *Q2–3* +3★ ×2 · *Q4+* +4★ ×2 ·
  *die 5+* +5★ ×2), shuffled; **deal 1 demand card face-up into each Kontor's well**.
- The **Specialist deck** (15 designs ⚙), display of 4.
- Warm start: a **Hulk → Bruges** docks at **s6** and the deck's next **Bruges- or
  Bergen-bound** Ship at **s7** ⚙.

Workers start OFF the board — each seat's first turn PLACES its worker on any station
(§2), in turn order, so later seats read the opening wharf before choosing. First
player fixed.

---

## 2. The turn — MOVE · WORK THE STATION

On your turn:

1. **MOVE** — move your worker to an **adjacent station** (orthogonal — the diagonal
   never connects; turn 1 places anywhere). **The move is the turn** — there is no
   staying put. Sharing a station costs nothing.
2. **WORK THE STATION** — resolve its stops **in any order, all optional**, each at
   most once:
   - its printed **PRIMARY** action;
   - its printed **ALTERNATE** action;
   - **each of its two flanking slots** — **load one Ready cask** onto the Ship docked
     there (§7);
   - **each flanking VENTURE's printed action** (yours or a rival's — a rival's use
     ticks the owner's ledger, §5).

**The station is read LIVE** — a Ship commissioned onto a flanking slot, or a Venture
built there, opens that stop this same visit **if that slot's stop has not been used**:
a stop is per-slot, and once used it stays used this visit.

---

## 3. The Wharf — four stations, eight slots

```
        A ── B            A  Market   (Source)   B  Brewhouse (Brew)
        │    │
        C ── D            C  Harbor   (Ship)     D  Cellar    (Age)
```

Each station prints **TWO single verbs** — its PRIMARY and its ALTERNATE, the station's
own lesser counter. A visit works both. Never a menu:

| Station | PRIMARY | ALTERNATE (the same visit) |
|---|---|---|
| **A · Market** — *the merchant's desk* | **SOURCE 3** — take **3 goods**, any mix | **BUILD** — place or advance ONE of your Venture tiles; the fee prints on the face going down (§5) |
| **B · Brewhouse** — *the double kettle* | **BREW** — pay a recipe into an open vessel + a tray die at the printed start value; **search the beer's stack — choose the tile** | **BREW** — *the second kettle*: a second full brew (search, choose), at **the recipe's cost + 1 `H`** ⚙ |
| **C · Harbor** — *the shipmaster's desk* | **COMMISSION** — pay the Ship's printed fee (Cog free · Hulk 1 `G` ⚙), place it on an eligible slot, **one free load onto it** (§7); you may plant your **private flag** for +1 `G` ⚙ | **SAIL** — **ANY docked Ship carrying 1+ of YOUR casks** sails NOW, even unfull, free ⚙ (a flagged hull sails early only for its owner) |
| **D · Cellar** | **AGE 3** — turn your aging dice up three steps, split freely | **LOAD 1** Ready cask onto **any** docked Ship |

**The slots flank the stations** (each slot serves exactly one): Market **s1·s8** ·
Brewhouse **s2·s3** · Harbor **s6·s7** · Cellar **s4·s5**.

**Slots hold a building (bottom) and/or a Ship (top) — never casks.** The building is a
**Public Work** (shared, dealt at setup) or a **Venture** (private, built in play — §5).

**The Public Works** (die-less, passive on their own slot's traffic, free for whoever's
traffic it is):

- **Malt Kiln** (×2): a cask loading here — its die **+1** (past its quality is fine;
  cap 6).
- **Customs House**: the Kontor minimum of the Ship docked here is **−1** (floor 1).
- **Ropewalk**: a load here — you may **also load 1 Ready cask onto a DIFFERENT docked
  Ship** (once per load flow; a normal load in every respect).
- **Cooperage**: the Ship here has **+1 berth** (it sails full only when that berth is
  also full) · each cask loaded here pays its loader **+1★**.
- **Weigh House**: *On sail from this slot:* the cargo is **CERTIFIED** — it does not
  glut (§8).
- **Staple Houses** (×4 — Bruges Hanzehuis · London Steelyard · Bergen Bryggen ·
  Novgorod Peterhof): *On sail from this slot to the tile's Kontor:* **every cask
  aboard +2★** ⚙.
- **Bonded Store**: *On load here:* the boarding die **+1** (cap 6) · *On sail from
  this slot:* **every player with a cask aboard gains 2 goods**.
- **Victualling Yard**: *On load here:* the boarding cask's **load bonus fires ×2**
  (LIFT included).

**The tide: every Public Work departs with the Ship that sails from its slot** (boxed,
gone for good — nothing refills).

---

## 4. The cask & the die (unchanged law)

Exactly as v5.8, whole: **the die is the cask** — set at brew to the printed start value
(quality − aging steps), aged up to the quality (**READY**), never turning on its own;
lifts push it past the quality (cap 6); **a Kontor's minimum reads the die as it
boards**; a landing parks the die at the Kontor — pips, presence, majority weight and
the clock in one component. The beer table, brew costs and recipe fees (`H` = Q−3, paid
at every channel) carry from v5.8 unchanged.

**The eight load bonuses (v7 pool ⚙):** *Gain 2 goods · Age +2 · Load 1 more (onto any
eligible docked Ship — a normal load; its cask's bonus fires too) · Place 1 presence ·
Gain 1 recipe (its printed fee) · Brew 1 (a full brew — search, at its cost) · **LIFT** (this cask's die +1,
cap 6 — applied **as it boards**, before the minimum reads) · **SAIL** (after boarding,
you may sail this Ship now, even unfull)*. A bonus fires as its cask boards (after any
sail it completes; LIFT alone applies at boarding). Specialists, buildings and
invitations never print on cask tiles.

**Contracts ride the load (§10):** after your cask boards, if the load matches a
contract in the display **and you have not yet claimed one this turn** ⚙, you may
**claim ONE matching card** to hand. Then any full Ship sails; then the load bonus
fires.

---

## 5. The Ventures — the engine you build

The only buildings players build. Your hand of **4 themed dual-use tiles** (brew · age ·
die · points; L1 one face, the same theme's L2 the other) enters via the Market's
**BUILD** verb or **London's prize** (§9). **BUILD = place or advance ONE of your
Venture tiles; the fee prints on the face going down:**

- **PLAY an L1** onto an **open slot (1 `G` ⚙)** — or onto a slot with a **Public Work,
  REPLACING it (2 `G` ⚙; the worn tile is boxed)**. Never onto a rival's Venture. A
  docked Ship above is fine. Stand a **tray die on the tile at face 1 — the LEDGER
  DIE.** The die is committed (the clock, §14).
- **FLIP** — your standing L1 turns over in place to its own L2 (2 `G` ⚙). No hand tile
  is spent.
- **OVERBUILD** — a second hand tile lands L2-side up on your own L1 (2 `G` ⚙; that L1
  is boxed). This is how a *different* theme's L2 reaches ground you hold.

**One ledger die per ground, for life:** it keeps its pips through the FLIP and the
overbuild; no second die ever stands on one slot. A rival's Venture is never overbuilt,
replaced or displaced; the tide never takes a Venture.

**THE LEDGER: each time a Venture serves a RIVAL — its action used by them, or its
printed trigger fired by their traffic — the ledger die turns +1 (cap 6; each rival
serve past the cap pays the owner 1★ at once ⚙). The owner's own use is free and ticks
nothing. At game end the owner scores the ledger die's pips** (a die still at face 1
scores 1★ — the founding pip).

**A Venture's action is open to the whole table** — whoever works the adjacent station
may use it, once per visit (§2) — **and it always operates on the USING player's own
components** (their vessels, their dice, their goods).

| Theme | L1 | L2 |
|---|---|---|
| **brew** | **Mash Tun** — BREW: a full brew (your recipe, your cost) | **Great Copper** — gain 2 goods AND BREW |
| **age** | **Warehouse** — Age 2 (your casks), then load 1 of your Ready casks onto ANY eligible docked Ship | **Assay Loft** — pay 2 `H`: EVERY one of your maturing casks straight to READY |
| **die** | **Rack House** — swap the dice of 2 of your vessel casks | **Lagering Cellar** — one of your vessel casks' die +1 (cap 6, past its quality) |
| **points** | **Counting House** — *trigger:* a rival's load at this slot ticks the ledger; **your** loads here **+1★** each | **Staple Rights** — *trigger:* your casks sailed from this slot **+2★** each; a rival's sail from this slot ticks the ledger once |

*(The points faces are triggers, not actions — they fire on their printed events; a
rival firing one ticks the ledger like a use.)*

---

## 6. The lanes — your own chart of the sea

Four lanes in two branches: **Bruges → London** (west) and **Bergen → Novgorod** (east).

- **Bruges and Bergen are open to every player from setup.**
- **London and Novgorod open PER PLAYER and stay a developing track:** you may
  **commission** a Ship bound there, or **load** a cask onto one, only while **your
  parked dice at the branch's gateway OUTNUMBER your parked dice at the far Kontor
  itself** (London ← Bruges · Novgorod ← Bergen). Your first London delivery takes one
  Bruges die; your third takes three. The two piles ARE the tracker — anyone reads the
  gate by comparing them. **A die on a demand card's seat is a parked die of its
  Kontor** (here and everywhere).

---

## 7. Ships, loading, sailing

Ships are shared hulls, each bound for a printed Kontor: **Cog 2 berths (free) · Hulk 3
berths (1 `G`)** ⚙, display of 3.

- **COMMISSION** (the Harbor): pay the printed fee, place the hull on a **shipless slot
  — or a slot holding an EMPTY Ship, which returns to the deck** ⚙ (an unloaded hull
  never blockades the wharf). Your lane must be open for its Kontor (§6). Then **one
  free load onto it** from your vessels — **a LOAD in every respect** (Ready, the
  minimum, the lane, slot passives, contracts, its bonus). **The private flag:** at
  commission you may pay **+1 `G`** ⚙ and plant your flag — **only your casks may
  board this hull, and only you may SAIL it early**. The flag returns when it sails.
  One flag per player.
- **LOAD** (a flanking stop, the Cellar's LOAD-any, or a bonus): one Ready cask from
  YOUR vessels whose die (as it boards, after lifts) meets the Kontor's minimum. Your
  lane must be open (§6). Casks are private until they board — the interaction is the
  **berth race**: topping off a shared hull sails everyone's cargo on your clock.
- **A full Ship SAILS AT ONCE.** The Harbor's ALTERNATE also sails **any docked Ship
  carrying 1+ of YOUR casks** early — unfull, free ⚙ (a flagged hull: only its owner).
- **Sailing:** the slot's Public Work departs with the Ship (the tide — boxed; the
  Weigh House certifies as it goes; the Staple House and Bonded Store pay at departure
  as printed; a Staple Rights Venture pays its owner as printed). Then each cask aboard
  **LANDS in boarding order** (§9). The Ship returns to the deck; the display refills
  at once.

---

## 8. The Bourse — the market only falls

One track (−1…+3 ⚙) on the Destinations board, a named marker per in-play beer except
Gruit & Jopenbier, **all opening at the top (+3 ⚙)**.

- **A DELIVERED cask scores die + marker as printed at landing** (floor 0).
- **SCORE, THEN THE GLUT:** after a sail's casks resolve, **each beer TYPE with at
  least one DELIVERED cask steps its marker down ONE** (never per cask). **A CERTIFIED
  cargo does not glut at all. A PRESENTED cask neither reads the marker nor counts
  toward the glut** — but a delivered cask of the same beer in the same sail still
  gluts it.
- **The market never rises on its own, and no station moves it.** The only hand: the
  **Coper** specialist ⚙ — after the glut of a sail that landed your cask (any turn),
  step ONE beer you landed back +1.

---

## 9. The Kontore — every landing is a choice

When your cask **LANDS** at a Kontor it resolves, in boarding order, as ONE of:

**A · DELIVER.** Score **die + marker** (§8) — at **Novgorod add its printed +3★ ⚙
premium** (stated once, here: the premium rides every DELIVER there and never a
PRESENT). If the Kontor's demand card **matches** the cask, score **+1★** more (the
demand's printed market line ⚙). Park the die in the Kontor's field. Then take the
Kontor's **prize** — one of:
- **the port's thing** (below);
- **2★** ⚙;
- **refresh the demand** ⚙ — the well's card goes under the demand deck and a fresh
  one deals at once (the dud-card valve; only while **no die sits on the card** — a
  seated card is spoken for).
Novgorod prints **no prize line at all** — its premium is the whole payment.

| Kontor | Minimum ⚙ | Lane | The port's thing ⚙ | Ladder base (1st/2nd) ⚙ |
|---|---|---|---|---|
| **Bruges** | 1 | open | **Gain 1 recipe** (its `H` = Q−3 fee; Q3s free) | 3 / 1 |
| **London** | 2 | ← Bruges gate | **One BUILD** (play / FLIP / overbuild), **fee waived** (an L1 still stands a tray die; no legal build → the other arms) | 4 / 2 |
| **Bergen** | 2 | open | **A specialist** (free, open seat) | 5 / 2 |
| **Novgorod** | **3** | ← Bergen gate | — (no prize; **+3★ per delivered die**) | 5 / 2 |

**B · PRESENT (the hall).** If you hold an **⚜ invitation** (§10), the cask **matches
the Kontor's demand card**, and the card has an open seat: spend the ⚜ — score **die +
the card's printed bonus ★** (the demand card IS the hall's price: no marker, no glut,
no premium, no prize). **Park the die ON the demand card's seat** — presence, majority
weight and the lane gates read it like any parked die. Each open seat admits one cask;
the same player may fill both. Spending the ⚜ **advances this Kontor's MAJORITY LADDER
one step** and the spent card returns under the contract deck. A demand card with both
seats ⚙ filled retires at once (its dice slide to the parking field); a fresh demand
card deals into the well at **end of turn**. **No card in the well, or no open seat →
no present at that Kontor.**

**The first-landing letter ⚙:** the first time YOUR cask lands at a Kontor (no die of
yours parked there before this sail — a PRESENT counts), **draw 1 contract from the
deck** to hand, after the sail fully resolves.

**Presence** = your parked dice (field + demand seats). Placing presence (the load
bonus; Keut's perk) parks a tray die at face 1, free, only where you have landed.

---

## 10. Contracts & invitations — one card, four lives

- **The display** holds 3 face-up contracts ⚙. Each prints a **load condition** ⚙
  (*a Q1–2 / Q3 / Q4+ cask · a die-4+ cask · onto a Hulk · bound for <Kontor>*).
- **CLAIM:** when your load matches a displayed contract, you may take ONE matching
  card — **at most one claim per turn** ⚙. The display refills at end of turn.
- **In hand the card is an ⚜ INVITATION — kept face-up** (the race is public), spent
  to PRESENT (§9). No hand limit ⚙.
- **Spent**, it advances the ladder where it was spent, then recycles under the
  contract deck. *(CLAIM is from the display, on a load; the letter's DRAW is from the
  deck — the Herald pays on CLAIMS only.)*

## 11. The majority ladders

Each Kontor panel prints a **6-step ladder** ⚙ of 1st/2nd payouts with a marker on step
1. **Every ⚜ spent there advances the marker** (never back; past the top it stays). At
game end each Kontor pays its marker's printed pair to the two leading players by
parked dice — **no parked dice there, no share** ⚙; ties split the summed places; third
place pays nothing at any player count.

Ladders ⚙ — Bruges **3/1 · 4/2 · 5/2 · 6/3 · 8/4 · 9/4** · London **4/2 · 5/2 · 6/3 ·
7/3 · 9/4 · 10/5** · Bergen & Novgorod **5/2 · 6/3 · 7/3 · 8/4 · 10/5 · 11/5**.

## 12. The player board & the specialists

3 vessels · 2 seats, as v5.8. Specialists are earned (Bergen's prize, free), never
bought. The v6 sea singles (Pilot · Surveyor · Wharfinger) retire; the roster ⚙:

- **The core five** (max(2, n−1) copies): Cellarman · Grain Factor · Hop Gardener ·
  Stevedore · Braumeister — unchanged from v5.8.
- **The guild singles:** Guild Scholar · Innkeeper · **Supercargo** (a Ship sails your
  cask on a rival's turn: gain 1 `G` 1 `H`) · Chronicler (**+1★ per cask you LAND** —
  delivered or presented) · Alderman · Town Crier · **Chandler** (with your station
  Source: may swap 1 `G` ↔ 1 `H`) · Shipwright (commission: the hull's fee waived; the
  flag's 1 `G` still paid ⚙) · **Coper** ⚙ *(new — the market's one hand)*: after the
  glut of a sail that landed your cask, step ONE beer you landed **+1** · **Herald** ⚙
  *(new)*: each time you CLAIM a contract, gain **1 `G` 1 `H`**.

## 13. Goods & storage

`G` grain · `H` hops — the only currency. Cap **8 of each** ⚙. Faucets: the Market, load bonuses,
prizes, the Bonded Store, the Herald. Drains: brews, commissions & flags, Venture fees,
recipe fees.

## 14. End of the game (the dice clock)

**ONE clock: the first EMPTY TRAY** — every die committed (in a vessel, aboard a Ship,
standing on a Venture as a ledger, or parked). Finish the round so every seat has equal
turns, then score. Dice never return. **MAX_ROUND 22 ⚙** backstops. **Cargo still
aboard docked Ships at the end scores nothing** ⚙ — sail before the tray empties. (The
Flight still counts such a beer: it qualified on the LOAD, when its card moved.)

## 15. Scoring

1. **Landings** — DELIVER: die + marker (+ Novgorod's premium; + the demand's +1★ on a
   match) · PRESENT: die + the demand card's bonus — scored as they happen.
2. **Scored in play** — prizes taken as ★ · Cooperage wharfage · Staple premiums ·
   Counting House / Staple Rights ★ · ledger overflow ★ · Chronicler ★ · placed
   presence (1★; Town Crier +2★).
3. **Majorities** — each Kontor's ladder, at its marker's step (1st/2nd · the presence
   gate · ties split).
4. **The Ventures** — each standing Venture's **ledger die pips** to its owner.
5. **The Flight** — distinct beers SHIPPED (qualifying on the load): (n−1)², min 3 ⚙.
6. **The Guild** — the Alderman's printed line.
7. Tiebreak: vessel dice, then goods.

*(Every value above is read off standing components: parked dice, ledger dice, the
ladder markers, the completed cards. Nothing is remembered.)*

## 16. Expansions

**Specialty Beers** and **Jopenbier** ride unchanged (their toggles; pinned bonuses; a
dealt specialty takes a marker at +3 like any export and a demand type card if printed
⚙; Jopenbier trades off the Bourse and presents only against die/quality bands).
**The Guild Tastings expansion retires** — the halls are core now. The Trade Roads seam
stays tabled.
