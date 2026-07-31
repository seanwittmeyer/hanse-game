# Brewhouses of the Hanse — Turn & Round Rules (v4.4 “Maiden Load”)

> **v4.4 “Maiden Load” (designer-ruled 2026-07-31).** **The commission regains its free
> load:** after paying the 1 `G` and placing the hull (★ = berths banked), the commissioner
> may **at once load ONE Ready cask from their own vessels** onto the new hull — a **normal
> load** (the gate reads the die as it boards, after the slot’s lifts; the cask’s load bonus
> fires; a full hull sails — a Skute immediately). Optional, never forced. Commission +
> Skute = the old charter as pure components (1 `G`, one cask, sails now). The live build is
> `play.html` (**KEY `hanse-v44`**).

> **v4.3 “Open Quay” (designer-ruled 2026-07-26 — the third ruling off playtest #23).** **The
> occupancy toll is CUT:** sharing a station costs nothing — move where the board is best,
> full stop. The interaction lives where the components put it: the **berth race**, the shared
> buildings, the displays/draft and the majorities. *(AI-only, same ruling: the greedy tiers
> are re-taught to the v4 economy — fee-netted values, Flight marginals, horizon sense; the MC
> tiers stay the strategy oracle.)*

> **v4.2 “Tariff” (designer-ruled 2026-07-26 — the second ruling off playtest #23).** Two
> changes on v4.1. **(1) The fee rides the ITEM, not the channel:** every acquirable recipe /
> specialist / building carries its **own printed wharf fee** ⚙ — recipes Broyhan `1H` · Keut
> `1G` · Mumme `2H` · Bock `1G2H`; specialists Cellarman `2H` · Grain Factor `1G` · Hop
> Gardener `2H` · Stevedore `1G` (v4.2c markup); buildings free (chipless) / `1G` / `2G` by tile — paid at
> ANY wharf channel (Scrivener’s Hall · the Hiring Post · the gain load-bonuses). Kontor
> prizes stay free, and there is **never a fee-on-fee**: using a building charges nothing of
> its own. **(2) Novgorod pays the die +2★** — the refine prize is cut; every die parked there
> banks **pips +2** (6–8★ at gate 4), printed on the kontor mat.

> **v4.1 “Counting House” (designer-ruled 2026-07-26, off human playtest #23 — the first v4
> table).** Two changes on the v4.0 spine. **(1) Paid at the wharf, free at the kontor:**
> gaining a **recipe / building / specialist** through a wharf channel — Scrivener’s Hall, the
> Hiring Post, or the *Gain 1 recipe/building/specialist* load bonuses — costs the **1 `G`
> wharf fee** ⚙; the kontor prizes stay free. **(2) The dice are the ONE clock:** the
> Sailed-Ships track is **cut** (trigger and component) — the **14th tally die a house parks**
> sets the final round; dice never return, so the pool is the whole runway (`MAX_ROUND` 25
> stays the rules-side backstop; sails end nothing).

> **v4.0 “Bright Beer” (designer-ruled 2026-07-21, off `archive/records/V4-STREAMLINE.md`).** The streamline
> keystone. **The tally die is the whole cask:** set to the printed **start value at brew**
> (start = quality − aging steps), turned up as the beer ages, **Ready when it reaches the
> quality**, lifted past quality only by buildings (**hard cap 6**), and **parked at the kontor
> on delivery** — pips = the banked ★, the body = presence and the end clock. **There is no
> deploy:** slots hold **a building and/or a ship (≤1 of each)**, never casks; casks go straight
> from your vessels onto hulls. **All buildings serve everyone** and pay their builder **+3★**;
> the owner-pays Privileges are gone. **Stations print ONE action each.** **The Hall is tabled.**
> All numbers ⚙.

> **Status: live.** Supersedes v3.4 “Tally Dice” (`RULES.md` history in git; the v3 line’s plan
> docs — `archive/records/V3-PATH-A.md`, `archive/records/HALL-STUDY.md` — remain as records). Prior playable archives:
> `archive/v2.9/` (v2.9.1) · `archive/play.html` (v0.16.1).

---

## 0. What v4.0 keeps and cuts (read first)

**Keeps:** the 2×2-stations + 8-slot Wharf and move-then-activate; row-or-column lines;
ships that **sail when full**, benefits sealing **on delivery** in load order;
the four kontore and tiered majorities; the steerable brew piles; the Flight on the recipe
cards (distinct beers **BREWED**, (n−1)² min 3); goods as the only currency; the warm start;
the **dice end clock** (v4.1 — the one clock); no dice-as-randomizers (the tally die is a
**marker**, never rolled) · no cards-as-hand · no money.

**Cuts (whole systems):** the **deploy state** and everything on it (over-deploy, tap-out,
souring, the Open Staithe, slot locality for casks, rival loading, deploy-first + both its
exception doors) · the **stay-home Floor turn** (Age pool, vessel-cask Floor actions, flip
Wilds) · the **Hall** (Three Coins, launches, enshrine — tabled, seam kept) · **Dispatch**
(kontor charters, contracts, fares) · all 12 **Privileges** and tile **ownership** (frames,
rent-to-owner) · the Market’s Acquire (recipes/tiles are **earned, not bought**) · the Cellar’s
Specialist buy · the dockside pickup of deployed casks *(the commission’s own free load —
vessel-direct — RETURNED at v4.4)* · the Quaymaster, Lagerkeeper and
Coppersmith · Wilds and face-down flips · the three expansion toggles (**tabled** with the Hall)
· **the Sailed-Ships track** (v4.1 — sails end nothing; the dice are the clock).

---

## 1. Setup (symmetric)

Each house starts with (⚙):
- **3 `G` (grain), 2 `H` (hops)** — storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipe **cards** (Gruit dealt flipped to its BREWED face — the
  warm start counts for the Flight). More recipes are **earned** (§7): Bruges’ prize, cask load
  bonuses, building actions.
- A **player board** (§8): **3 vessel slots** (1–2 open, the 3rd under a cover) and **2
  specialist seats** (the 1st open, the 2nd under a cover). Covers open from the **Flight**:
  your **2nd** distinct beer brewed opens the 3rd vessel; your **3rd** opens the 2nd seat.
- **14 TALLY DICE ⚙ (player-colour d6) — the house’s whole runway, in public view.** A die
  leaves your tray at **brew** (it IS the cask’s maturation marker and value), rides the hull’s
  berth, and **parks at the kontor on delivery** — presence, banked ★ (the pips), and the clock,
  all one component. **No die in the tray → no brew, no presence bump.**
- A **warm-start Ready Gruit** in vessel 1 (die at 1).

Shared board: the **Wharf** (4 stations + 8 slots); the four kontore (Bruges/London/Bergen/
Novgorod) open — **the Hall is off the table**; **deal 3 of the 4 export beers** (the variable
ladder); shuffle the **Ship deck** (Skute 1 · Cog 2 · Hulk 3 berths, destination-bound) and deal
a face-up **market of 4** ⚙; shuffle the **Building deck** (all neutral, §5) and deal a Wharf
**display of 4** ⚙; shuffle the **Specialist deck** (n−1 copies of each of the 4) and deal a
**display of 4**. **Warm start on the slots:** a
guaranteed **Hulk → Bruges** + one more dealt ship, and **two neutral Buildings** dealt from the
deck (setup deals score nobody). Each player places a worker on any station — **opening
placement free.** First player fixed all game.

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
   station’s row or its column.** Sharing a station costs **nothing** (v4.3 — the occupancy
   toll is cut; move where the board is best).
2. **Resolve the line’s stops in any order, every stop optional.** A line offers:
   - its **two stations** — each fires its ONE printed verb (§4);
   - its **two slots** — each offers **the building’s printed action** (if a building stands
     there) **and/or a LOAD of the ship docked there** (if a ship stands there) — each once
     (§5–6). An empty slot does nothing — **author it.**

---

## 3. The cask & the die (the soul)

A cask tile prints its **quality Q1–Q5**, its **START DIE value**, and **one load-bonus action**
(drawn at brew from that quality’s face-up pile top; Gruit pinned to *Gain 2 goods*). The
**tally die on the tile is maturation, gate, value, presence and clock in one number:**

- **At brew:** take a die from your tray, set it to the printed **start value = quality − aging
  steps**. *(Gruit ages 0 steps — fresh ale, Ready at brew, die 1.)*
- **Aging:** each age point turns the die **+1**, **never past the quality** — the cask is
  **READY when die = quality.** (+1 automatic on each of your turns; the Cellar grants 3 ⚙.)
- **Loading:** a Ready cask boards a hull whose **gate its die meets, read as it boards** —
  after the slot’s lifts (a Malt Kiln here turns the die **+1, cap 6**; a Customs House lowers
  the hull’s gate by 1 — the cask sells at its die).
- **Delivery:** the die **parks at the kontor showing its face** — the pips ARE the banked ★
  (never less than 1), the body is your presence there and a beat of the end clock (§10).

| Beer | Q | Aging steps | Die starts | Brew cost | Earned (wharf fee ⚙ · free at Bruges) |
|---|---|---|---|---|---|
| Gruit | Q1 | 0 (Ready at brew) | 1 | `G` | starter |
| Hopped | Q2 | 1 | 1 | `G H` | starter |
| Broyhan | Q3 | 1 | 2 | `G H H` | dealt export · fee `H` |
| Keut | Q3 | 2 | 1 | `G G H` | dealt export · fee `G` |
| Mumme | Q4 | 3 | 1 | `G H H H` | dealt export · fee `H H` |
| Bock | Q5 | 3 | 2 | `G G H H H` | dealt export · fee `G H H` (the premium climb) |

*(The Cellarman starts your dice one higher — a Bock at 3. Cap: a start value never exceeds the
quality. Keut’s printed perk: its delivery also **places 1 presence** — a tray die parks at face 1
at that kontor.)*

> **The squeeze (state it to players):**
> - **You can’t brew everything** — 2 vessels (a 3rd behind the Flight), the recipe faucets,
>   and 14 dice for the whole game.
> - **You can’t deliver everywhere** — the hulls in the market decide which ports are open;
>   berths are shared and race away.
> - **You can’t hold everything** — a Ready cask clogs a vessel until a hull appears; goods cap
>   at 8.
> - **You can’t be everywhere** — one worker, one line a turn; the rest of the board works on your rivals’ clocks.

---

## 4. The four stations — ONE printed action each

- **A · Market — SOURCE:** take **2 goods** (any mix).
- **B · Brewhouse — BREW:** pay a recipe you hold into an **open vessel** + a **tray die** set
  to the start value; the cask takes the **face-up top action** of its quality pile (steerable).
  **First brew of a beer flips its recipe card** — the Flight record and the cover-opener (§8).
- **D · Cellar — AGE:** gain **3 age points** ⚙, split freely across your maturing casks.
- **C · Harbor — COMMISSION:** pay **1 `G`** ⚙, place any one of the **4 display hulls** on a
  slot **without a ship** (a building is fine), and **score ★ = its berth count** (Skute 1 ·
  Cog 2 · Hulk 3). The display refills. Then **one free load** (v4.4): you may at once load
  **1 Ready cask from your vessels** onto the new hull — a normal load (§6; its bonus fires;
  a Skute sails on it). Optional.

---

## 5. The slots & the buildings — one green family

The 8 slots each hold up to **one building** (bottom) and **one ship** (top). **Every building
serves whoever activates it; none has an owner.** Placing one — London’s prize (free) or a *Gain 1
building* action (pay the **tile’s printed wharf fee** ⚙, v4.2 — a chipless tile is free),
always **from the Wharf display of 4, placed at once** — pays the builder **+3★** on the score
track. **Using a building never costs a fee of its own** — at Scrivener’s Hall / the Hiring
Post you pay only the recipe’s / specialist’s printed fee. **Overbuild — ONE payment per
placement (v4.2c):** a fee-paid gain **covers the ground** (no rent); the **1 `G` ⚙ ground
rent** applies only when an otherwise-free placement (London’s prize, or a chipless tile)
lands on a built slot. The displaced tile is **returned to the box**. ⚙ *watch:
if churn mints +3★, the dials are restricting overbuild to a full board or raising the fee.*

**The deck (17 ⚙, all green):**

| Building | Fires | Effect ⚙ | Qty ⚙ | Wharf fee ⚙ |
|---|---|---|---|---|
| Granary | slot stop | **Gain 2 goods** (any mix) | 2 | free |
| Scrivener’s Hall | slot stop | **gain 1 recipe** (at the recipe’s fee) | 2 | 1 `G` |
| Mission Quay | slot stop | **Age +2** (your vessels) | 2 | free |
| Hiring Post | slot stop | **gain 1 specialist** (at its fee) | 1 | 1 `G` |
| Almoner’s Stall | slot stop | **Place 1 presence** (§7) | 1 | free |
| Brewhouse Annex | slot stop | **Brew 1** (pay its cost; tray die) | 1 | 1 `G` |
| **Malt Kiln** | on load here | the boarding cask’s **die +1** (cap 6) | 3 | 2 `G` |
| **Cooperage** | passive | the ship here carries **+1 berth** | 2 | 2 `G` |
| **Customs House** | passive | the ship here **boards one gate lower** (sells at the die) | 2 | 2 `G` |
| **Rich Berth** | passive | the hull here may **sail one berth short** (min 1) | 1 | 2 `G` |

*(Action buildings print the same verbs as the cask piles — the wharf and the cargo speak one
language. The Kiln is the “improve the humble beer” engine: a Gruit can climb to 6; a Bock only
to 6.)*

**One-fire rule:** on a line, the active player may use each slot’s building action once and
load each slot’s ship once — all optional, any order, resolved on the active player’s turn.

---

## 6. Ships & loading (the cash-out)

- **Ships** are neutral, destination-bound hulls off a shuffled deck; a face-up **market of 4**
  ⚙. **Skute 1 · Cog 2 · Hulk 3** berths ⚙ (deck blend **6/10/8** ⚙ — 24 hulls, 6 per port). **Commission** (§4C) places
  one on any shipless slot and scores its capacity.
- **LOAD (a slot stop):** take **one READY cask from YOUR vessels** whose **die meets the
  hull’s gate** (after this slot’s Kiln/Customs), seat it in the lowest berth (the die rides the
  tile), and **fire the cask’s printed load bonus** (§6b). The freed vessel is open again.
  *(The Stevedore sets out **2** casks on your ship-slot stop. The **commission** includes one
  such load onto its new hull — §4C.)*
- **A ship SAILS the moment it is full** — a **Skute sails on its first load.** Each cask aboard
  **delivers in load order**: bank ★ = its die, park the die at the kontor, resolve the port’s
  prize (owner’s choice, **when gained**). The hull returns to the deck.
- Casks are **private until aboard** — there is no loading of rival casks, and nothing on the
  wharf to hijack. The race is for **berths**: topping off a hull sails *everyone’s* cargo, on
  your clock.

### 6b. The load bonuses — eight specific gains (the cask piles ⚙)

| Action | Effect | Pile gate ⚙ |
|---|---|---|
| **Gain 2 goods** | any mix | Q1 (Gruit pin) · Q2+ |
| **Age +2** | 2 age points across your vessels | Q2+ |
| **Load 1 more cask** | onto **any** eligible hull on the wharf (its bonus fires too) | Q2+ |
| **Place 1 presence** | a tray die → a kontor you’ve delivered to (§7) | Q2+ |
| **Gain 1 recipe** | pay the **card’s printed fee** ⚙ — a dealt export | Q2+ |
| **Gain 1 building** | pay the **tile’s printed fee** ⚙ (no chip = free) — display → any legal slot, **+3★** | Q3+ |
| **Gain 1 specialist** | pay the **tile’s printed fee** ⚙ — from the display (open seat required) | Q3+ |
| **Brew 1** | pay its cost into an open vessel (tray die) | Q4+ |

*(Enshrine left with the Hall. Every pile top is face-up — brew toward the bonus you want.
**Paid at the wharf, free at the kontor** (v4.2 — the fee rides the ITEM): the three
acquisition gains cost the chosen item’s **own printed fee**, here and at Scrivener’s Hall /
the Hiring Post — the kontor prizes never do, and no building ever adds a fee of its own.)*

---

## 7. Destinations & prizes

| Destination | Gate ⚙ | Value | Prize on delivery ⚙ | Majority (1/2/3) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | 1 | the die | **Gain 1 recipe** (dealt exports) | 4 / 2 / 0 |
| **London** (Steelyard) | 2 | the die | **A building** (display → placed, **+3★**) | 5 / 3 / 1 |
| **Bergen** (Bryggen) | 2 | the die | **A specialist** (display, free) | 9 / 5 / 2 (anchor) |
| **Novgorod** (Peterhof) | **4** (raised ⚙) | **the die +2★** ⚙ (6–8) | — (the value premium IS the prize) | 8 / 5 / 2 |

- **Gates read the DIE as it boards** (post-lift) — a Kiln’d Hopped (die 3) still misses
  Novgorod; a Kiln’d Broyhan (die 4) makes it. One number rules gates and value alike.
- **Prizes resolve WHEN GAINED, owner’s choice** (a rival tops off a hull carrying your cask →
  you pick your prize right then). No queues.
- **Novgorod’s premium is printed on the mat** (v4.2): every *delivered* die there counts
  **pips +2** — for the score AND the end-game audit. (Gate 4 means delivered dice show 4–6,
  so a face-1 die at Novgorod is always a presence bump, worth its flat 1★.)
- **Presence** = your parked dice there. A **presence bump** (the cask/building action) takes a
  **tray die**, parks it at a kontor you’ve **already delivered to** at **face 1** (it scores
  1★ and counts for the majority and the clock). No tray die → no bump.

---

## 8. The player board (private) — 3 vessels · 2 seats

- **3 vessel slots** — each holds one maturing/Ready cask (its die on the tile). Slots 1–2 open;
  the 3rd opens with your **2nd distinct beer brewed**.
- **2 specialist seats** — the 1st open; the 2nd opens with your **3rd distinct beer brewed**.
  A house never owns two of a type; specialists are **earned free** (Bergen, Hiring Post, the
  cask verb) — never bought.
- **Recipe cards** sit beside the board; **flipped (BREWED) faces are the Flight record** — the
  unlock currency AND the end-game ladder (§11).

**The SPECIALISTS (4 designs ⚙ · deck of n−1 copies each · display of 4 · each prints its
wharf fee ⚙ — free as Bergen’s prize). A taken tile’s gap stands for the rest of the turn —
the display refills from the deck at the END of the turn (v4.4c; ships and buildings refill
at once):**
- **Cellarman** (fee `2H`) — your dice **start one higher** (never above quality; a Bock starts at 3).
- **Grain Factor** (fee `1G`) — whenever you gain grain (any faucet): **+1 `G`**.
- **Hop Gardener** (fee `2H`) — whenever you gain hops (any faucet): **+1 `H`**.
- **Stevedore** (fee `1G`) — your ship-slot stop loads **2 casks** (each fires its bonus).

---

## 9. Goods & storage

`G` grain · `H` hops — the **only** currency. Storage cap **8** ⚙. No money; no spendable
prestige. The faucets: the Market (2 + specialists), Granaries, *Gain 2 goods* load bonuses.

---

## 10. End of the game (the dice clock)

**ONE clock (v4.1): the tally dice.** The player who **parks their 14th die** (delivery or
presence bump) sets the final round (finish the round → score). Dice never return — the pool
is the house’s whole runway, and it is always countable: tray + in play + parked = 14. Sails
end nothing; ships are pure logistics.

A **MAX_ROUND ceiling** (~25 ⚙) backstops a slow table. Pace target **~12–25 rounds.** ⚙ *The
pool size (14) is THE pace dial now.*

---

## 11. Scoring — the clear spine

**In-game (banked on the score track as it happens):**
1. **Deliveries** — ★ = the die, parked at the kontor (the pips remain the audit).
2. **Builds** — **+3★** per building you place (London’s prize included).
3. **Commissions** — ★ = the hull’s berth count (1/2/3).
4. **Presence bumps** — 1★ each (the face-1 die).

**End-game:**
5. **Majorities** — at each kontor, by **parked dice** (Bruges 4/2/0 · London 5/3/1 · Bergen
   9/5/2 · Novgorod 8/5/2 ⚙; 2p skips 2nd; ties split).
6. **The Flight** — distinct beers **BREWED** (your flipped cards): **(beers−1)², min 3**
   (3→4 · 4→9 · 5→16 · 6→25 ⚙).
7. **Tiebreak:** the summed dice in your vessels, then most goods.

> **The legible fork:** ship **wide** (majorities + prizes) or ship **lifted** (Kiln-fed dice,
> the Novgorod bar), **build** (3★ a tile + the lines you author) or **brew broad** (the Flight
> + your covers). A new player picks one; an expert braids two.

---

## 12. Expansions — TABLED (v4.0)

The three toggles (*Specialty Beers* · *Jopenbier* · *The Trade Roads*) are **off the table**
with the Hall: Jopenbier’s dock-vintage rode the deploy state, the Trade Roads replace the
majorities, and both need re-derivation on the v4 spine. The `registerExpansion` seam stays in
the engine; the modules return after the core settles.

---

## Open / to-tune (the ⚙ shortlist)

1. **The clock** — the dice alone (v4.1). The pool (14 ⚙) is THE pace dial. The v4.2b battery:
   3p/4p healthy (dice trigger 60–82%, ~19–18 rounds); 2p runs longer (60–70% reach round 25)
   — **designer-accepted (2026-07-26): longer 2p games are not a concern.** No dial queued.
2. **The recipe faucet** — Bruges + the priced verbs only (v4.1 fee). If the Flight stalls, the
   dials are prize generosity, verb frequency (piles/deck), and the fee — not a Market buy.
3. **Novgorod at gate 4** — is die-4 boarding reachable enough (Mumme+, or Kiln’d Q3)? Its
   pull is now the **+2★ die premium** (6–8★ deliveries, v4.2) + the 8/5/2 majority — watch
   whether +2 overshoots (the dial is the printed premium).
4. **The +3★ build rate** — London deliveries + verbs; watch total build ★ share and overbuild
   churn (dials: fee, display width, restrict-to-full-board).
5. **Bergen heat** — specialist prize + the 9/5/2 anchor (dial: tiers or the prize).
6. **Commission ★ = capacity** — does the Hulk’s 3★ make commissioning self-serving enough at
   every count?
7. **The Skute rate** — deck blend 6/10/8. With the sailed clock cut the Skute is pure
   deadlock relief; too few = the strand risk returns (too many is now merely inefficient).
8. **2p texture** — the thinned interaction set (berths, majorities, the draft): does it
   hold at two?
9. **The fee schedule** ⚙ (v4.2c — per item): recipes `1H`/`1G`/`2H`/`1G2H` · specialists
   `2H`/`1G`/`2H`/`1G` (the −1G markup; Cellarman → `2H`) · buildings free/`1G`/`2G`. Probe
   reads still open: the **2G lift tier prices the wharf channel out** (candidate `1G1H`);
   **grain binding, hops slack** — lean premium fees toward `H`. Parked: a kontor-prize
   surcharge on premium tiles.
10. **The greedy (non-MC) tiers** — re-taught at v4.3 (fee-netted values, Flight marginals,
   horizon sense; both tiers share the new skeleton). Trader>journeyman reads ~55% pooled
   (n=700) — real but under the historic 60% lint, because journeyman inherits the shared
   fee sense. Standing rule stands (designer 2026-07-26: *“I worry we over-index on those AI
   players”*): strategy/balance conclusions lean on the MC tiers, the flow probe and humans;
   the greedy tiers are robustness/pace oracles.
