# Brewhouses of the Hanse — The Rules (v5.6 “The Glut”)

*The one rules document. Clean operational rules only — design rationale, decision
history and open watches live in `DESIGN.md`; the physical manifest in `COMPONENTS.md`;
the printed rulebook is `rulebook.html`. Numbers marked ⚙ are tunable placeholders.*

**2–4 players · c. 1350 · you run a merchant brewing house at the Wharf.** Goods are the
only currency — no money, no spendable prestige. The work runs **Source → Brew → Age →
Ship**; the winner is the house with the most ★ when the dice run out.

---

## 1. Setup (symmetric)

Each player starts with (⚙):

- **3 `G` (grain), 2 `H` (hops)** — storage cap 8 ⚙; goods gained above the cap are lost
  (the cube supply itself is not a limit).
- The **Gruit** and **Hopped** recipe **cards**, on the player board's **COLLECTED side** —
  a card completes, moving to the COMPLETED side, when that beer's first cask **loads onto
  a Ship** (the warm Gruit counts once it ships). More recipes are **earned** (§7): Bruges'
  prize, the *Gain 1 recipe* load bonus.
- A **player board** (§8): **3 vessel slots** and **2 specialist seats**, all open from the
  start. The board prints the Flight ladder.
- **13 QUALITY DICE ⚙ (player-colour d6) — the player's whole runway, in public view.** A
  die leaves your tray at **brew** (it IS the cask's aging marker and value), rides the
  Ship's berth, and **parks at the Kontor on delivery** — presence, the ★ scored, and the
  clock, all one component. **No die ever stands on a building.** No die in the tray → no
  brew, no placing presence — and an **EMPTY tray sets the final round (§10).**
- The **hand of 4 dual-use VENTURE tiles** in your colour ring (§5b) — the only buildings
  you will ever build.
- A **warm-start Ready Gruit** in vessel 1 (die at 1).

Shared board:

- The **Wharf** — 4 stations + 8 slots (§2).
- The four **Kontore** (Bruges · London · Bergen · Novgorod) open.
- **Deal 3 of the 4 export beers** (the variable ladder).
- The **cask tiles in six face-up stacks, one per beer**, each shuffled — a full Brew
  SEARCHES its stack, the alternate takes the top tile, and a delivered cask's tile returns
  to the bottom (§3–4).
- The **Ship deck** (Skute 1 · Cog 2 · Hulk 3 berths, each bound for a printed Kontor),
  shuffled; deal a face-up **display of 4** ⚙.
- **Public Works:** shuffle all 13 tiles, draw **3 (2p) / 4 (3–4p) ⚙** and stand them on
  **RANDOM slots** — **the rest become the BAG** (die-less, neutral, §5a; no deck, no
  display; in hall mode the Guild Chancery is guaranteed among them).
- **The Bourse:** lay the strip and set **one price marker per in-play beer except Gruit &
  Jopenbier** on **0** (§5c).
- The **Specialist deck** (5 core designs × max(2, n−1) copies + the 10 guild singles),
  shuffled; deal a **display of 4**.
- The **Manifest deck** (12 ⚙, §7b), shuffled — a card is dealt face-up to **every
  non-Bruges Ship as it enters the display**, and it rides the hull to its slot.
- **Warm start on the slots:** a guaranteed **Hulk → Bruges** + one more dealt ship (a
  non-Bruges warm hull carries its Manifest) — the Public Works furniture already stands.

Each player places a worker on any station — **opening placement free.** First player
fixed all game.

---

## 2. The Wharf — stations & slots (the spine)

```
        A ── B            A  Market   (Source)  → B  Brewhouse (Brew)
        │    │            │                        │
        C ── D            C  Harbor   (Ship)   ←  D  Cellar    (Age)

  Production order A→B→D→C = Source → Brew → Age → Ship   (move where the board is best)
  (orthogonal moves only — never the diagonal)
```

The turn:

1. **Move** your worker to an orthogonally adjacent station (from turn 2) and **choose the
   station's row or its column.** Sharing a station costs **nothing** — move where the
   board is best.
2. **Resolve the line — its two stations and its two slots, in any order; every part
   optional.** A line offers:
   - its **two stations** — **the station under your worker fires its PRIMARY action; the
     line's other station fires its ALTERNATE** (the lesser print — §4);
   - its **two slots** — each offers **a LOAD of the ship docked there** (if a ship stands
     there), each once (§6). **Buildings add no action:** a PUBLIC WORK fires on the slot's
     own traffic by itself; a **VENTURE** on the line offers its **public line** to
     whoever's activation this is (a free stop) and its ringed **owner stops** on the
     OWNER's activations only; the hall Chancery is the one slot action. An empty slot
     does nothing — **author it.**

   **The line is read LIVE:** a Ship commissioned onto a line slot mid-turn — or a Venture
   raised there — opens that slot this same activation (each stop still at most
   once; a ship sailing off closes its stop).

---

## 3. The cask & the die (the soul)

A cask tile prints its **quality Q1–Q6**, its **START DIE value**, and **one load-bonus
action** (printed on the tile taken at brew — the station's full Brew **searches the
beer's stack and chooses the tile**; the alternate Brewhouse and the *Brew 1* load bonus
take the top tile; Gruit is pinned to *Gain 2 goods*). The **quality die on the tile is
aging, boarding, value, presence and clock in one number:**

- **At brew:** take a die from your tray, set it to the printed **start value = quality −
  aging steps**. *(Gruit ages 0 steps — fresh ale, Ready at brew, die 1.)*
- **Aging:** each step turns the die **+1**, **never past the quality** — the cask is
  **READY when die = quality.** **Dice never turn on their own:** the hands on an aging
  die are the **Cellar** (primary 3 · alternate 1 ⚙), the **Age +2** load bonuses, the
  Venture faces — the **Rack House** (an uncapped swap), the **Lagering Cellar** (die
  +1, cap 6), the **Warehouse** (Age 2), the **Assay Loft** (pay 2 `H` — every maturing
  cask straight to Ready) and every **age +1 / +2 public line** (for whoever activates the
  line) — the **Cellarman** (a higher start), and the **Braumeister / Innkeeper** drips
  (+1 at turn start).
- **Loading:** a Ready cask boards a Ship whose **minimum its die meets, read as it
  boards** — after the slot's lifts (a Malt Kiln or Bonded Store here turns the die **+1,
  cap 6**; a Customs House lowers the Ship's minimum by 1, floor 1; a Tollhouse lets the
  loader **shift any Bourse marker ±1**).
- **Delivery:** the die **parks at the Kontor showing its face** — the ★ scored are **the
  pips + the beer's Bourse marker** (never below 0 — the marker **as printed**; the glut
  lands after the sale, §5c), the
  body is your presence there and a beat of the end clock (§10) — and **the cask's tile
  returns to the bottom of its stack** (the supply breathes).

| Beer | Q | Aging steps | Die starts | Brew cost | Earned (wharf fee `H` = Q−3 ⚙ — every channel, Bruges too) |
|---|---|---|---|---|---|
| Gruit | Q1 | 0 (Ready at brew) | 1 | `G` | starter |
| Hopped | Q2 | 1 | 1 | `G H` | starter |
| Broyhan | Q3 | 1 | 2 | `G H H` | dealt export · **free** |
| Keut | Q3 | 2 | 1 | `G G H` | dealt export · **free** |
| Mumme | Q4 | 3 | 1 | `G H H H` | dealt export · fee `H` |
| Bock | Q5 | 3 | 2 | `G G H H H` | dealt export · fee `H H` (the taxed climb) |
| *Gose* ⚙ | Q2 | 1 | 1 | `G G` | *expansion* export · **free** · Gain 3 goods (§12) |
| *Zerbster* ⚙ | Q3 | 1 | 2 | `H H H` | *expansion* export · **free** · Parti-Gyle (§12) |
| *Duckstein* ⚙ | Q2 | 1 | 1 | `G H` | *expansion* export · **free** · Smoke-Hardy (§12) |
| *Jopenbier* ⚙ | Q6 | 4 | 2 | `G G H H H H` | *capstone* (own toggle) · always acquirable · fee `H H H` (§12) |

*(The Cellarman starts your dice one higher — a Bock at 3, and a Broyhan at 3: **READY at
brew**. A start value never exceeds the quality. Keut's printed perk: its delivery also
**places 1 presence**, free — a tray die parks at face 1 at that Kontor.)*

> **The squeeze (state it to players):**
> - **You can't brew everything** — 3 vessels, the recipe fees, 13 dice for the whole
>   game — and every beer you ship spends its own price.
> - **You can't deliver everywhere** — the hulls in the market decide which ports are
>   open; berths are shared and race away.
> - **You can't hold everything** — a Ready cask clogs a vessel until a hull appears;
>   goods cap at 8.
> - **You can't be everywhere** — one worker, one line a turn; the rest of the board works
>   on your rivals' clocks.

---

## 4. The four stations — a PRIMARY and an ALTERNATE action each

**The station under your worker fires its PRIMARY action; the line's other station fires
its ALTERNATE** — the lesser print (the slots are untouched — Ship loads and Venture lines
resolve at full strength on either line; all numbers ⚙).

| Station | PRIMARY (your worker here) | ALTERNATE (the line's other station) |
|---|---|---|
| **A · Market — SOURCE** | take **3 goods** (any mix ⚙) | take **1 good** ⚙ |
| **B · Brewhouse — BREW** | pay a recipe you hold into an **open vessel** + a **tray die** set to the start value, and **SEARCH that beer's stack — choose the tile** (its printed bonus rides the cask) | the same brew, but the cask takes **the stack's TOP tile** |
| **D · Cellar — AGE** | **Age 3** ⚙ — turn your aging dice up three steps, split freely | **Age 1** ⚙ |
| **C · Harbor — COMMISSION** | pay the Ship's **printed fee** — **Skute 2 `G` · Cog 1 `G` · Hulk free** ⚙ — place it on a slot **without a Ship** (the display refills), then **one free load** (1 Ready cask from your vessels; its bonus fires; a Skute sails on it). **No ★** — tempo, not points | **Load 1 Ready cask onto ANY docked Ship** ⚙ — a normal load (§6: both gates read as it boards; the bonus fires; the Stevedore lifts every load flow to 2) |

*(An **empty stack** = that beer cannot brew right now — every tile is out riding a cask;
tiles come home on delivery. **The search belongs to the station:** the Brewhouse primary
and the **Great Copper** Venture search the stack; the alternate Brewhouse, the **Mash
Tun** Venture AND the *Brew 1* load bonus take the **top tile** blind. The alternate Harbor load is the wharf-wide relief
valve — the demand is still the docked hulls' minimums and Manifests.)*

---

## 5. The slots & the buildings — PUBLIC WORKS & VENTURES

The 8 slots each hold up to **one building** (bottom) and **one ship** (top). Buildings
come in **two families**, and every face is a **modifier of its own slot** — a cask
loading here, the Ship docked here, a sail from here. **A building never adds an action
or a step for anyone**: the line always reads *two station actions + two slots* (the
exceptions are free stops, never actions — your own Venture's ringed stop, and every
Venture's public line).

### 5a. Public Works — the shared brown family: the wharf itself

**Nobody builds them, nobody owns them — and none of them lasts.** Setup shuffles all 13
tiles, draws **3 (2p) / 4 (3–4p) ⚙** onto **random slots**; the rest become the **BAG**. A
Public Work is die-less **furniture**: every face fires passively on its own slot's
traffic — whoever's cask, Ship or sail it is — and using one is always free.

- **No die, no fee, no maturity, no build channel.**
- **THE TIDE — every Public Work sails.** When a Ship sails from a slot, it takes that
  slot's Public Work with it. The tile is **boxed: it never comes back.** Whatever the
  tile was owed it has already paid — the premiums, the lifts and the Manifest doubling
  all resolve while it still stands, and *then* it goes.
- **The wharf re-furnishes at the END of the turn:** draw from the bag onto slots with no
  building until **3 (2p) / 4 (3–4p) ⚙** stand again. The gap therefore stands for the
  rest of the turn the tile sailed on — everyone sees what burned out, and an **L1 Venture
  may claim that cleared ground** before the tide fills it (§5b).
- **The bag runs dry.** Burned tiles never return, so the wharf is rich in furniture early
  and **thins into bare ground late** — the ground the Ventures inherit. A Venture is
  never taken by the tide.
- **Read the deal, but don't marry it:** the tiles standing now ARE this game's wharf, and
  a tile that runs hot burns out on the very voyage it fuels.

**The box prints 13 tiles / 9 designs ⚙ — setup stands 3–4 at random:**

| Public Work | Fires | Effect ⚙ (the tile prints icons — this column is the prose) | Qty ⚙ |
|---|---|---|---|
| **Malt Kiln** | on load here | the boarding cask's **die +1** (past quality is fine; cap 6) | 2 |
| **Tollhouse** | on load here | **the toll bench:** the loader **may shift any Bourse marker ±1** (resolves as the load flow closes) | 1 |
| **Customs House** | passive | **−1 to the Kontor minimum** at this slot ⚙ (floor 1; READY is still required) | 1 |
| **Ropewalk** | on load here | a load here: **you may also load 1 Ready cask onto a DIFFERENT docked Ship** ⚙ (once per load flow here) | 1 |
| **Cooperage** | passive · on load | the Ship here: **+1 capacity** (it sails only when that berth is also full) — and each cask loaded here scores its loader **+1★** ⚙ | 1 |
| **Weigh House** | at sail | **each cask delivered off the Ship here may claim TWO Manifest lines** (each line still once per voyage) | 1 |
| **Staple Houses ×4** *(Bruges Hanzehuis · London Steelyard · Bergen Bryggen · Novgorod Peterhof)* | at sail | a Ship sailing from this slot **to the tile's Kontor**: **every delivered cask banks +2★** ⚙ (*Stapelrecht* — the destination premium) | 4 |
| **Bonded Store** | on load · at sail | the boarding die **+1** (cap 6); as it sails, **every player with a cask aboard gains 2 goods** | 1 |
| **Victualling Yard** | on load | the boarding cask's **load bonus fires TWICE** | 1 |

### 5b. Ventures — your private buildings: the only family you build

Each house starts with an **identical hand of 4 DUAL-USE Venture tiles**, ringed in the
owner's colour, **no die**. The four are **THEMED — brew · age · die · points** — and each
tile pairs an **L1** and an **L2 of its own theme**: one piece of cardboard, one face up at
a time, so "one side facing per theme" needs no rule. **Every face prints TWO lines:**

- **The PUBLIC line** (top — simple ⚙: *gain 1 good* · *age +1 / +2* · *shift the Bourse
  ±1 / ±2*): a **free stop for WHOEVER activates a line through the slot**, once per
  activation. Your private house greases the whole wharf.
- **The OWNER line** (ringed): the private power below — stops, loads and premiums that
  serve the owner alone. **The owner's activation collects both lines.**

Placement — **THREE WAYS** (fees in grain ⚙, **waived as the London prize**):

- **THE OPEN GROUND — play an L1.** A tile plays from your hand **L1-side up onto any open
  slot** (fee **1 `G`**). Only when **every slot is full** may it instead **replace a
  Public Work** (the worn furniture is boxed; one payment, no rent). **Never another
  player's L1/L2.**
- **THE FLIP — turn your own L1 over, in place.** Pay the **L2 fee (2 `G`)** and a
  **standing L1 of yours turns over to its own L2 face** on the same slot. **No hand tile
  is spent.** This is what gets buildings out: each of your four tiles can reach its own
  L2, instead of four tiles collapsing into two buildings.
- **THE OVERBUILD — a different theme's L2 onto ground you hold.** Spend a **second hand
  tile L2-side up** onto **one of your own L1s** (fee 2 `G`); the spent L1 tile is
  **boxed**, the ground is kept. That tile's L1 face is forfeit.

**An L2 can never be displaced by anyone.** The **owner-only stops** open only when the
OWNER activates a line through them — once per activation, like any stop.

| Theme — one tile | Public line ⚙ (L1 · L2) | **L1** owner line ⚙ (fee 1 `G`) | **L2** owner line ⚙ (fee 2 `G`) |
|---|---|---|---|
| **BREW** — Mash Tun / Great Copper | +1 good · **age +2** | *Activating this line:* **you may BREW — the stack's TOP tile** | *Activating this line:* **gain 2 goods AND you may BREW** (a full search of the stack; normal costs) |
| **AGE** — Warehouse / Assay Loft | +1 good · age +1 | *Activating this line:* **Age 2**, then **you may load 1 Ready cask onto ANY docked Ship** | *Activating this line:* **pay 2 `H` — EVERY maturing cask of yours goes straight to READY** |
| **DIE** — Rack House / Lagering Cellar | age +1 · Bourse ±1 | *Activating this line:* **swap the dice of two of your vessel casks** — no quality cap | *Activating this line:* **one of your vessel casks: die +1** (cap 6 — it may pass its quality) |
| **POINTS** — Counting House / Staple Rights | Bourse ±1 · Bourse ±2 | *Your loads at this slot:* **+1★ each** | *Ships sailing from this slot:* **your casks bank +2★ each** ⚙ |

### 5c. THE BOURSE — the beer-value market

**One shared track — −1 · 0 · +1 · +2 · +3 ⚙ — printed on the Destinations board, with a
price marker per in-play beer except Gruit and Jopenbier** (the commodity floor and the
plain capstone trade off-book). **Every marker starts at the TOP (+3 ⚙).**

**THE MARKET ONLY FALLS ON ITS OWN.** Scarcity is where the game begins; every shipment
spends it.

- **A delivered cask scores its DIE + its beer's MARKER** (never below 0; the Novgorod
  +3★, Staple premiums and Manifest ★ ride on top). The die itself never moves — gates,
  presence, majorities and the clock still read the die alone.
- **SCORE, THEN THE GLUT:** every cask aboard delivers **at the marker printed right now** —
  then, once the sail has resolved, **each beer TYPE that was aboard steps down ONE**
  (floor −1 ⚙). **One step per beer, however many casks of it rode.** A three-cask hull of
  one beer costs the market a single step; a mixed hull steps each beer it carried.
- **You cash the price you could read.** The marker on the board when you load is the
  marker you are paid — no arithmetic, no arrival bonus to compute.
- **The only way UP is a SHIFT**, and shifts belong to **buildings and private Venture
  lines** — the Ventures' **public lines** print **±1** and **±2**, the **Tollhouse** pays
  its loader a **±1** (the toll bench), and **Bergen's prize** moves any marker **±1**.
  Holding a price up is an engine you build, not something that happens to you.

> **Read the market before you brew.** First to a beer cashes it at the top; the fourth
> shipment sells into the crater. The beer nobody has sailed is still worth +3.

**One-fire rule:** on a line, the active player may load each slot's ship once, fire each
slot action once (the hall Chancery is the only one), collect each Venture's public line
once, and fire each of their own Venture stops once — all optional, any order, read LIVE
(§2): a Ship or Venture landing on a line slot mid-turn opens its stop.

---

## 6. Ships & loading (the cash-out)

- **Ships** are neutral, each bound for a printed Kontor, off a shuffled deck; a face-up
  **display of 4** ⚙. **Skute 1 · Cog 2 · Hulk 3** berths ⚙ (deck blend **6/10/8** ⚙ —
  24 Ships, 6 per Kontor). **Commission** (§4C) pays the Ship's **printed fee (2/1/0 `G`
  by size)** and places it on any shipless slot; it scores nothing.
- **LOAD (resolve a slot with a docked Ship):** take **one READY cask from YOUR
  vessels** whose **die meets the Ship's minimum** (after this slot's lifts — Kiln /
  Bonded Store; the Customs House lowers the minimum by 1, floor 1; the Tollhouse offers
  its Bourse shift), seat it in the lowest berth (the die rides the tile), and **fire the
  cask's printed load bonus** (§6b) — **after any sail the load completes** (deliveries
  and prizes resolve first, then the bonus). A load at the **Ropewalk** also loads **1
  Ready cask onto a DIFFERENT docked Ship** (once per flow); your **Counting House** banks
  **+1★** per load at its slot; a cask delivered off the **Weigh House's** Ship may claim **two**
  Manifest lines (§5a). **A beer's FIRST load moves its recipe card to the board's
  COMPLETED side — the Flight record.** The freed vessel is open again. *(The Stevedore
  loads **2** in EVERY load flow. The **commission** includes one such load onto its new
  Ship — §4C.)*
- **A ship SAILS the moment it is full** — a **Skute sails on its first load.** Each cask
  aboard **delivers in boarding order**: score ★ = its die + its beer's marker **as printed**,
  park the die at the Kontor, take the Kontor's prize (**the port's thing OR 2★** ⚙ — owner's
  choice, **when gained**; **every cask takes one**; boarding order = pick order), and the cask
  **may claim ONE demand line of this Ship's Manifest it satisfies** (§7b — owner's choice;
  each line once per voyage). **Then the glut:** each beer TYPE that was aboard steps its
  marker down one (§5c). The Ship returns to the bottom of the deck; **the slot's Public Work
  sails away with it, boxed** (§5a — the tide).
- Casks are **private until aboard** — there is no loading of rival casks, and nothing on
  the wharf to hijack. The race is for **berths**: topping off a Ship sails *everyone's*
  cargo, on your clock.

### 6b. The load bonuses — eight specific gains (the cask piles ⚙)

| Action | Effect | Pile minimum ⚙ |
|---|---|---|
| **Gain 2 goods** | any mix | Q1 (Gruit pin) · Q2+ |
| **Age +2** | 2 steps across your vessels | Q2+ |
| **Load 1 more cask** | onto **any** eligible Ship on the wharf (its bonus fires too) | Q2+ |
| **Place 1 presence** | a tray die → a Kontor you've delivered to (§7) — **free** (presence flows only through casks) | Q2+ |
| **Gain 1 recipe** | pay the **card's printed fee** ⚙ — a dealt export | Q2+ |
| **Open 1 Venture** | a tile from your hand at its fee ⚙ (L1 1 `G` on open ground · L2 2 `G` over your own L1) — the Public Works are never built | **Q2+** |
| **Gain 1 specialist** | pay the **tile's printed fee** ⚙ — from the display (open seat required) | Q3+ |
| **Brew 1** | pay its cost into an open vessel (tray die) — the **TOP tile** of the stack (only the station's full Brew searches) | Q3+ |

*(Every stack is face-up and searchable — a full brew picks its bonus outright. **Paid at
the wharf, free at the Kontor** — the fee rides the ITEM: the three acquisition gains cost
the chosen item's **own printed fee**; the load bonuses are the wharf channel. London's
and Bergen's prizes waive it — **a recipe's fee (`H` = Q−3, the Q3s free) is paid
everywhere, the Bruges prize included.** No building ever adds a fee of its own.)*

---

## 7. The Kontore & prizes (the Destinations board)

| Kontor | Minimum ⚙ | Value | Prize on delivery ⚙ | Majority (1/2/3) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | 1 | the die + Bourse | **Gain 1 recipe** — dealt exports, at its `H` = Q−3 fee (the Q3s free) — **OR 2★** ⚙ | 4 / 2 / 0 |
| **London** (Steelyard) | 2 | the die + Bourse | **A Venture** — from your hand, **the fee waived** (L1 · the FLIP · an overbuild) — **OR 2★** ⚙ | 5 / 3 / 1 |
| **Bergen** (Bryggen) | 2 | the die + Bourse | **A specialist** (display, free) · **OR shift any Bourse marker ±1** · **OR 2★** ⚙ | 9 / 5 / 2 (anchor) |
| **Novgorod** (Peterhof) | **3** (the export band ⚙) | **the die + Bourse, +3★** ⚙ | — **the port that only pays money, and pays the most** | 8 / 5 / 2 |

**EVERY PRIZE IS THE PORT'S THING *OR* ★ — per cask, your choice, resolved in boarding
order.** There is **no consolation**: a full specialist bench, a hand with no playable
Venture, a shelf of every recipe — none of them punishes you any more, because the ★ was
always on the table. A two-cask hull to Bergen can seat a specialist on one and bank the ★
on the other, **and both dice park for the majority.**

- **The minimum reads the DIE as it boards** (post-lift) — a Kiln'd Hopped (die 3) makes
  Novgorod; a Kiln'd Gruit (die 2) cannot. One number rules boarding and value alike.
- **Prizes resolve WHEN GAINED, owner's choice** (a rival tops off a Ship carrying your
  cask → you pick your prize right then). No queues.
- **Novgorod's premium is printed on the mat**: every *delivered* die there counts **pips
  +3** ⚙ — for the score AND the end-game audit. It offers no thing to choose against, and
  its +3 out-pays any other port's ★ option: that is its whole identity, bought with the
  highest minimum in the game. (Minimum 3 means delivered dice show 3–6, so a face-1 die at
  Novgorod is always placed presence, worth its flat 1★.)
- **Presence** = your parked dice there. **Placing presence** is **free — and flows ONLY
  through casks**: the *Place 1 presence* load bonus, Keut's printed perk, and the
  champion's tour (§12). Take a **tray die**, park it at a Kontor you've **already
  delivered to** at **face 1** (1★ + majority weight + the clock; a seated Town Crier adds
  +2★ per die). No tray die → no placing presence.

### 7b. Manifests — the demand cards on the Ships

A shuffled **Manifest deck (12 ⚙)** sits by the Destinations board. **Every NON-BRUGES
Ship carries one** — dealt face-up the moment the hull enters the ship display (the
warm-start hulls included), riding with it to its slot. **Bruges hulls sail plain** (its
recipe prize and gate 1+ are the whole invitation). Each card prints **three demand
lines** — a named starter beer, a quality tier, a die minimum, or a combo — each with a
printed ★ value:

- **Claim = a qualifying delivery.** When the Ship sails, each delivered cask **may claim
  ONE line it satisfies** (owner's choice, resolved in boarding order): the ★ **score at
  once** to the track. **Each line pays once per voyage** — a full Hulk can claim up to
  three *different* lines; two casks never split one line.
- **Die lines read the PARKED face** — the die exactly as it parks, after every lift
  (before Novgorod's +2★ premium and the Bourse marker). **Quality tiers read the cask**
  (*Q2 or under · Q3+ · Q4+* — tier language, claimable under every deal); **a combo reads
  tier AND die on the same cask.**
- **Purely a bonus — never a gate.** Boarding still needs BOTH printed gates: the cask
  **READY** (die at its quality) AND its die at the Kontor's minimum as it boards. The
  Customs House lowers only the Kontor minimum, never READY. The Ship's trigger berth
  prints both.
- **The card recycles:** as the sail resolves, the card returns **under the deck**,
  pristine — no tile comes to your seat; the score track is the whole record. The next
  hull to enter the display draws the next card. *(Twelve cards cover the maximum float —
  8 slots + a display of 4 — so a non-Bruges hull is never dealt dry.)*
- **The Manifest is the variable economy** — the demand rides the very hull you race to
  fill: the same die-5 Bock is worth more on a Ship whose card prints *Q4+ & die 5+ → 4★*.
  Read the hulls before you brew, lift and load — the Manifest you can satisfy is worth
  more than the one you cannot.

**The line vocabulary ⚙:** named starters *Gruit → 1★ · Hopped → 2★* · quality tiers
*Q2-or-under → 1★ · Q3+ → 2★ · Q4+ → 3★* · die *3+ → 1★ · 4+ → 2★ · 5+ → 3★ · 6 → 3★* ·
combos *Q3+ & die 5+ → 4★ · Q4+ & die 5+ → 4★ · Q4+ & die 6 → 4★ · Q≤2 & die 3+ → 3★*
(the lifted-fresh line). Each card mixes three.

*(**Hall mode:** every claimed Manifest demand also pays an ⚜ Invitation — §12.)*

---

## 8. The player board (private) — 3 vessels · 2 seats

- **3 vessel slots** — each holds one aging/Ready cask (its die on the tile). All open
  from the start.
- **2 specialist seats** — both open from the start. A player never owns two of a type;
  specialists are **earned** (Bergen's prize free, or the *Gain 1 specialist* load bonus
  at the printed fee) — never bought at a market.
- **Recipe cards** sit BESIDE the board: **COLLECTED to its LEFT** until that beer's first
  cask **loads onto a Ship**, then moved to the **COMPLETED pile on its RIGHT** — **the
  completed cards ARE the Flight record.** The board itself prints the Flight ladder
  (beers shipped 1–5 → 0/0/4/9/16★ ⚙), the ★ score seat and the dice/grain/hops supply
  ledge — §11 read straight off the table.

**The SPECIALISTS (15 designs ⚙ — the 5 CORE at max(2, n−1) copies + the 10 GUILD at 1
copy each · display of 4 · each prints its wharf fee ⚙ — free as Bergen's prize, per
cask). Every tile is a STATION SUPERPOWER: its print names the flow it upgrades,
icon-first. No tile prints a requirement. A taken tile's gap stands for the rest of the
turn — the display refills from the deck at the END of the turn (the ship display refills
at once):**

*The core five (the drip floor):*

- **Cellarman** (fee `2H`) — your dice **start one higher** (never above quality; a Bock
  starts at 3 — and a Broyhan at 3, **Ready at brew**).
- **Grain Factor** (fee `2G`) — each time you gain grain (any faucet): **+1 `G`**.
- **Hop Gardener** (fee `2H`) — each time you gain hops (any faucet): **+1 `H`**.
- **Stevedore** (fee `1G`) — **each time you load, you may load 2 casks** (the slot load,
  the commission's maiden load, and the *Load* bonus alike; each cask fires its bonus).
- **Braumeister** (fee `1G` `1H`) — **at the start of your turn, age 1 cask +1** (the app
  ages your ripest — the die closest to Ready).

*The guild ten (one copy each):*

- **Guild Scholar** (fee `2G`) — **when gaining recipes, pay no fee**: the `H` = Q−3 fee
  is waived at every channel, the Bruges prize included.
- **Innkeeper** (fee `2G`) — **with 3+ casks in your vessels at turn start, the ripest
  maturing cask ages +1** (the Braumeister's tick may stack).
- **Supercargo** (fee `2H`) — each time a Ship carrying **your** cask sails on a
  **rival's** turn: gain **1 `G` 1 `H`**.
- **Chronicler** (fee `1G` `1H`) — **claim a Manifest demand: +2★ at once** ⚙.
- **Alderman** (fee `2G`) — **game end: +2★ per Kontor where you have 3+ parked dice** ⚙.
- **Town Crier** (fee `1G`) — **each presence die you place scores +2★** ⚙ (the die parks
  at face 1 as ever, so a placement banks 3★ total; still one die, one clock beat;
  delivery-bound as ever).
- **Chandler** (fee `1G`) — **when you take the STATION Source action, you may also swap
  1 `G` ↔ 1 `H`** with the stores (once per turn; the Grain Factor / Hop Gardener drips
  apply — that is the combo).
- **Shipwright** (fee `1H`) — **when commissioning Ships, pay no fee** (the Ship's printed
  `G` fee is waived: 2 `G` on a Skute, nothing on a Hulk).
- **Broker** (fee `1G` ⚙) — **your Market ALTERNATE is Source 2** (standing anywhere on
  the Market's lines, your echo sources near the primary).
- **Brewer's Mate** (fee `1H` ⚙) — **your Brewhouse ALTERNATE searches the stack** (never
  the top tile blind — the search from across the line).

---

## 9. Goods & storage

`G` grain · `H` hops — the **only** currency. Storage cap **8** ⚙. No money; no spendable
prestige. The faucets: the Market (Source 3 ⚙, + specialists), the *Gain 2/3 goods* load
bonuses, the **Great Copper**, the Ventures' *+1 good* public lines, the consolation prizes.

---

## 10. End of the game (the dice clock)

**ONE clock: the first EMPTY TRAY.** The moment a player **commits its last quality die**
— to a brew, a placed presence, or with every remaining die already riding
vessels/Ships — its **tray reads 0** and the final round is set (finish the round →
score). Parked-out is NOT required: dice aboard unfilled Ships count as committed. Dice
never return — the 13 dice are the player's whole runway, always countable: tray + in
play + parked = **13** ⚙ (no die ever stands on a building). Sails end nothing; ships are
pure logistics.

A **MAX_ROUND ceiling** (~25 ⚙) backstops a slow table. Pace target **~12–25 rounds.**
*The tray size (13 dice ⚙) is THE pace dial.*

---

## 11. Scoring — the clear spine

**Scored in play (onto the score track as it happens):**

1. **Deliveries + the Bourse** — ★ = the die **+ the beer's Bourse marker** (never below
   0), parked at the Kontor; Novgorod +3★ ⚙ on top. The dice on the mats and the markers
   on the track are the audit — the Bourse pays at the moment of sale, no memory.
2. **Manifest demands** — the claimed line's printed ★ (a seated Chronicler adds +2★ per
   claim; the card recycles — the score track is the record).
3. **Cooperage wharfage** — **+1★** per cask loaded at its slot ⚙.
4. **Placed presence** — 1★ each (the face-1 die; a seated Town Crier adds +2★ per die).
5. **Kontor prizes taken as ★** — **+2★** ⚙ for each cask that declined its port's thing.
6. **Staple premiums** — the Staple House pays **+2★** ⚙ per cask off a matching-Kontor
   sail (any house's casks); **Staple Rights** pays its owner **+2★** ⚙ per own cask off
   its slot. The **Counting House** banks **+1★** ⚙ per cask the owner loads at its slot.

*(Commissions score **nothing**. The score track + your parked dice remain the whole
audit trail; no memory required.)*

**End-game:**

7. **Majorities** — at each Kontor, by **parked dice** (Bruges 4/2/0 · London 5/3/1 ·
   Bergen 9/5/2 · Novgorod 8/5/2 ⚙; 2p skips 2nd; ties split).
8. **The Flight** — distinct beers **SHIPPED** (the completed cards on your board):
   **(beers−1)², min 3** (3→4 · 4→9 · 5→16 · 6→25 ⚙).
9. **The Guild** — a seated **Alderman** (+2★ per Kontor with 3+ parked dice ⚙) scores
   its printed line. The audit is the tiles and dice on the table.
10. **Tiebreak:** the summed dice in your vessels, then most goods.

> **The legible fork:** ship **wide** (majorities + prizes) or ship **lifted** (Kiln-fed
> dice, the Novgorod bar), **work the Bourse** (contrarian brews · shifts · timed sails)
> or **brew broad** (the Flight). A new player picks one; an expert braids two.

---

## 12. Expansions (opt-in toggles)

*Independent **New Game toggles**, freely mixable. With all off the base game is
unchanged. Everything else — Kontore, majorities, Manifests, the Flight, the clock,
scoring — runs as written: the expansions are roster content under the existing grammar.
Every expansion beer is **pinned**: all its cask tiles print the same load bonus
(drafting a pinned beer IS the agency — the Gruit rule, generalized). **The Bourse
follows the standard rule:** a dealt specialty beer takes its **price marker at 0** like
any export — its brews crash it, its landings lift it, its casks sell at **die + marker**;
**Jopenbier alone (with Gruit) trades off-book** — no marker, ever: the plain die is the
price.*

### Specialty Beers

Setup deals **3 of 7** exports (the base four + these three), guaranteeing **at least one
of Mumme/Bock** ⚙ so the quality climb, Novgorod's traffic and the pinnacle stay
meaningful. Recipe fees ride the standard formula (`H` = Q−3 — all three **free**), paid
at every channel. A dealt specialty beer **joins the Bourse at 0** (its marker is in the
box when it isn't dealt).

| Beer (town) | Q · steps · brew ⚙ | The pinned bonus IS the signature |
|---|---|---|
| **Gose** (Goslar) | Q2 · 1 · `G G` (no hops) | ***Gain any 3 goods*** — the better Gruit when you have the grain (the goods drips apply) |
| **Zerbster** (Zerbst) | Q3 · 1 · `H H H` (no grain) | ***Parti-gyle:* a free Gruit + Load 1 more** — as its cask boards, you **may** fill an open vessel with a free **Gruit** (no goods, but a **tray die**; Ready at 1), then load 1 more cask onto any eligible Ship (the fresh Gruit itself qualifies at a die-1 port) |
| **Duckstein** (Königslutter) | Q2 · 1 · `G H` | ***Place 1 presence*** *(free)* + **Smoke-Hardy** — its die turns **+1 as it boards** (cap 6): read for the minimum AND parked as the value. The race cask — a Q2 that makes Novgorod's 3+ band; a Malt Kiln under the Ship stacks (boards at 4) |

### Jopenbier — the capstone (a second, independent toggle)

The **Q6 vintage** of Danzig — the all-in deep plan. **Never drafted:** with the toggle on
it is **always acquirable** at every recipe channel (Bruges' prize · the *Gain 1 recipe*
bonus) at its printed fee **3 `H`** ⚙ (the formula; the Guild Scholar waives). Brew
**2 `G` 4 `H`** ⚙; the die starts at **2** and wants **four aging steps** — the longest
climb in the game (the Cellarman starts it at 3). Ready at **6**: it delivers **6★
anywhere, 8★ at Novgorod**, qualifies for every die-6 Manifest line, and counts for the
Flight as a **sixth beer** (6 shipped → **25★** ⚙). Building lifts are void on it (the
cap is 6). **It trades OFF the Bourse:** no marker — its brews crash nothing, its
landings lift nothing, and its price never moves; the capstone's 6 is contract-solid.

### The Guild Tastings (a third toggle)

**The Hall as a cycle of public contests.** With the toggle on:

- **Setup:** shuffle the **Tasting deck (12 ⚙)** and lay out the open row — **2 Tastings
  at 2p · 3 at 3–4p** ⚙. Each player takes **2 ⚜ Invitations** ⚙. **Every claimed
  Manifest demand also pays an ⚜ Invitation**, and the **Guild Chancery** is guaranteed
  among the setup Public Works (resolve its slot: gain 1 ⚜).
- **Pour (during your turn, any number):** spend **1 ⚜ + one Ready cask from your vessels
  that matches the Tasting's printed category**. Its die stands on the tile's **next
  empty bench space** — pour order runs left→right, visible. The die is committed (a
  clock beat); the cask's load bonus does **not** fire (the tasting takes the cask
  whole). Pouring twice into one Tasting is legal — each pour costs ⚜ + a die.
- **The bench filling IS the judging** — the moment the last space fills, rank the bench:
  **highest die takes 1st** — the tile's printed ★ **and the tile itself** (keep it at
  your seat, the record); **2nd scores 2★ · 3rd 1★** ⚙. **Ties go to the earlier pour.**
  All ★ score at once; the judged dice slide to the **Taproom floor** strip (committed,
  standing — the audit). The judged Tasting is **replaced from the deck at end of turn**.
- **The champion's tour:** the **winning** cask's die does not stay on the floor — it
  **parks as presence (face 1) at a Kontor its owner has delivered to** (owner's choice;
  majority weight, no ★, no Town Crier — this is not *placing presence*). Never delivered
  anywhere → the tour lapses and the die stays on the floor.
- **The door-slam:** filling the last space forces the judging — a leader locks the vote
  with any qualifying second die; a rival forces the count before your Bock is Ready.
  Every open bench is a stand-off; read *who can still brew what* before you pour.
- **Unconvened at game end** — a bench that never filled: **each die on it scores 1★
  flat** (the tasting never convened; no free solo wins). ⚙
- **Sets (game end):** the won tiles at your seat — **2 distinct categories +3★ · 3 or
  more +7★** ⚙. The Hall pays **no majority**; the Tastings compete with the Kontor race
  for the same ripe dice — the fork is the point.

**The Tasting deck (12 ⚙):**

| Tasting | Enter with | Tiles | Bench ⚙ | 1st ⚙ |
|---|---|---|---|---|
| **the Free Pour** | any Ready cask | 3 | 3 | 5★ + the tile |
| **the Fresh Pour** | quality 3 or under | 3 | 3 | 5★ + the tile |
| **the Dark Pour** | quality 4 or higher | 2 | **2 (a duel)** | 7★ + the tile |
| **the Export Pour** | poured at die 4+ | 2 | **2 (a duel)** | 6★ + the tile |
| **the Old Pour** | poured at die 5+ | 1 | **2 (a duel)** | 7★ + the tile |
| **the Master's Pour** | poured at die 6 | 1 | **2 (a duel)** | 9★ + the tile |

*(2nd 2★ · 3rd 1★ ⚙; every bench caps at 2 at 2p. The tile prints its own bench. The dark
pour always has a lane — the export deal guarantees a Q4+ beer. The die is read as it
POURS; there are no load lifts here.)*

### The Trade Roads — TABLED

The Overland module (an inland map of claimable Staple-Right slots replacing the
majorities) awaits its re-derivation. The `registerExpansion` seam carries it, dormant.
