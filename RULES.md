# Brewhouses of the Hanse — Turn & Round Rules (v1.4 “Deploy”)

> **Status: live (2026-06-18).** This is the canonical rulebook for the *living, composable Wharf
> slots + dead-simple scoring* direction (`PLAN.md`). Numbers are placeholders ⚙. **The live,
> playable build is `play.html` (v1.4 “Deploy”) — these rules are implemented there.** (The prior
> v0.16.1 "The Wharf" build is archived at branch `archive/main-v0.16.1` / `archive/play.html` /
> `archive/v0.16/`.)
>
> **The pitch:** a merchant brewing house at the Wharf, where work runs **Source → Brew → Age →
> Ship.** The soul is the **squeeze** — *you can't brew everything, and you can't deliver
> everywhere.* You build advantages on the **living slots** (owned buildings that modify the
> casks and ships docked to them), then choose where your beer pays off: the steady **Hall**
> (fixed points), or the contested **kontore** (variable *demand* value, and end-game
> majorities). *(Companion: `COMPONENTS.md` — the manifest; `PLAN.md` — the why.)*

---

## 0. What this reset keeps and changes (read first)

**Keeps:** the Wharf and its turn (move · activate a line · resolve stops); the dual-role cask
(maturing → deployed → delivered) + its slot-action; ships that **sail when full**; the
**Charter** relief valve; **Enshrine at the Hall**; **majorities**; **the Flight**; the
no-dice / no-cards / no-money constraints; medium GWT/Distilled weight; the sim-gate discipline.

**Changes (the keystone):**
- The **8 slots become a living, composable commons** — they hold **owned buildings** that
  modify the **casks and ships docked to them** (`§5`). A building can host a ship, which holds
  casks (*dock → building → ship → cargo*).
- **Kontor delivery value becomes building-modified** — the **variable "demand"** (`§7`),
  replacing v0.16's fixed per-cask value table.
- **Goal tiles and neutral buildings dissolve into the one building family** — public, owned,
  authored on the ring. (Most v0.16 *upgrades* fold in too; a few private-brewery improvements
  remain — `§8`, ⚙.)
- **Scoring is made legible** (`§11`): two in-game sources (Hall = fixed, kontor = variable)
  and two end-game (majorities = count, the Flight = range). A player can name their plan
  on turn 1.

---

## 1. Setup (symmetric)

Each house starts with (⚙):
- **3 `G` (grain), 2 `H` (hops)** + seat compensation **+1 `G` per seat after the first**.
  Storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipes (the symmetric on-ramp). More recipes at the Market.
- **2 open vessels** (brewing throughput; cap 3 ⚙).
- **2 charter contracts** (the scarce relief-valve certificates; buy more at the Market — §6).
- **1 building tile in hand** ⚙ (a starting improvement to place — so authorship is live turn 1).
- A **warm start** so the Wharf is live turn 1: a guaranteed **Hulk → Bruges** + one more ship
  dealt onto slots (spread across lines); **one Ready Gruit** per house to deploy on turn 1.
- An empty **brewery board** (vessels + recipe area — §8).

Shared board: the **Wharf** (4 stations + 8 slots) with the warm-start ships; all **five
destinations open** (Bruges/London/Bergen/Novgorod + the Hall); **deal 3 of the 4 export beers**
(the variable quality ladder); shuffle the **Building deck** and deal a face-up **display of 4**
⚙ at the Market (refills from the deck); set the **Sailed-Ships track** to its player-scaled
length (§10). Each player places a worker on any station — **opening placement is free.** Choose
a first player (fixed all game; free placement + the +1 `G`/seat are the seat balancers).

---

## 2. The Wharf — stations & slots (the spine, kept)

```
        A ── B            A  Market   (Source)  → B  Brewhouse (Brew)
        │    │            │                        │
        C ── D            C  Harbor   (Ship)   ←  D  Cellar    (Age)

  Production order A→B→D→C = Source → Brew → Age → Ship   (move where the board is best)
  (orthogonal moves only — never the diagonal)
```

The turn:
1. **Move** your worker to an orthogonally adjacent station (mandatory from turn 2). Moving
   onto a station a rival occupies costs the **1 `G` occupancy toll** ⚙ (capped at what you
   hold; opening placement free) **and then you work that public line as normal** — *or,*
   **work your private floor instead:** **in lieu of the public line** (you forgo both its
   stations and both its slots, and pay no toll), run the **slot-action of every cask on your
   brewery floor** (each cask in your vessels). The Floor is your whole action that turn — the
   boutique brewer's stable fallback when the ring is unfavorable ⚙. *(The carried v0.1
   "alternate action when blocked"; developed into the **Floor / private line** — `PLAN.md`
   §1B.)*
2. **Activate** the **row OR column** of your station.
3. **Resolve** that line's up-to-4 stops — **slot · station · station · slot** — in any order.
   Both stations always fire; the worker only gates *which line is legal*. Each slot you **may**
   use (its occupant's action + any building effect — §5). Base actions always work; the slots
   only *add*.

**A line** = its two stations + its two slots (still just 4 spaces — one or two of which may be
buildings/modifiers).

---

## 3. The cask & the squeeze (the soul)

A cask carries a **quality Q1–Q5** (printed) and **one signature slot-action** (drawn at brew;
Gruit fixed to **Source +2 goods**, Q2+ draw from the pool — §8). Three states:

1. **Maturing** *(private, in a vessel)* — ages toward **Ready** (+1 each of your turns + the
   Cellar). Higher quality takes longer. Scores nothing yet — **but it already works:** a cask in
   a vessel **powers your Floor** (its action, run as your private line — §8, `PLAN.md` §1B), so
   it earns value *before* it ships. The catch: it **occupies the vessel** (no new brew there
   until you deploy or ship it).
2. **Deployed** *(public, on a slot)* — when Ready, **deploy** it as a **line action** (v1.4 — no longer
   free/anytime). **An empty slot's default action IS "Deploy"** (it shows as *"{building?} Deploy"*): so
   a line with two open slots reads *slot Deploy · station · station · slot Deploy*. Trigger an empty
   slot's Deploy (or the **Brewhouse**, which also offers Deploy) to set **one** Ready cask onto **any**
   open slot — with several Deploy stops you may place several casks in a turn. **Combo:** deploy onto
   *another* empty slot still pending on this line and its Deploy flips to the **cask's action stop** — so
   you take that action this turn. The cask is now **cargo-in-waiting**, a **public slot-action**, and
   **contestable**. *(If you deploy onto a slot with a **building**, the building modifies it — §5.)*
3. **Delivered** *(scored, gone)* — shipped to a destination (§6–7). Scores for its owner and
   leaves.

> **The squeeze (state it to players):**
> - **You can't brew everything** — 2 vessels (cap 3), the recipe ladder, and time. A slow Bock
>   ties up a vessel that could have turned two quick casks.
> - **You can't deliver everywhere** — scarce ships and slots, the destination gates, one end
>   clock. *Where* a cask goes is a commitment, not a default.
>
> - **You can't hold everything** — a Ready cask in a vessel powers your **Floor** (§8) but
>   **clogs the vessel**; deploying frees the space and makes it public cargo, but spends its
>   private value. *Brew what · hold which · deploy when* is the engine-builder's puzzle.
>
> Choosing your beers and destinations — and **how you use each cask before it ships** — **is**
> the game. The living slots and your Floor are how you tilt those choices in your favor.

---

## 4. The four stations (the actions)

### A · Market — *Source & build*
Do **one**: take **2 goods** (any mix), **or acquire one tile** (pay its goods cost ⚙):
- a **recipe** (a brewable quality; export recipes cost more);
- a **building** from the face-up display (`⚙ G` by tier) — **buy and place it on a slot** (§5);
  *(or **place a building from your hand** — earned at London/Novgorod or via Survey — free);*
  *(you may also place a building you already hold, free — the starting tile / a Survey draw);*
- a **ship commission** (`2 G` ⚙ — place a face-up ship on a slot + free-load one Ready cask — §6);
- a **charter contract** (`1 G` ⚙ — §6).

### B · Brewhouse — *Brew (+ deploy anywhere)*
**Load** one recipe you hold (paying its `G/H`) into an **open vessel** → a young cask at step 0.
The cask takes its slot-action from the **face-up top tile of that quality's pile** — and **the
top tile of *every* quality pile is visible**, so you **see the action you'd get** and can choose
*which* quality to brew partly by it (steerable variance — agency at the kettle, no blind draw).
One load per visit; Gruit is fixed to Source. Recipes are permanent. **You may also DEPLOY** a Ready
cask onto **any** open slot here (the cask-hub's flexible placement — v1.3).

### D · Cellar — *Age (+ Tap)*
Gain **3 age points** ⚙, allocate across your vessels (each cask also ages **+1** at the start of
your turn). Then you **may TAP one cask** (v1.3): take a Ready cask **from a vessel** *or* one of
**your slots**, fire its slot-action **once**, then **discard** it — freeing the vessel, or **recalling**
it off a slot (clearing the slot for a better cask). The relief valve / repositioning tool; one Tap per visit ⚙.

### C · Harbor — *Ship*
**Load** a deployed cask (yours or a rival's) onto a ship it qualifies for (you choose the
ship/destination; loading a rival's cask: you take **1 `G`**, the owner scores it on delivery);
ships **sail only when full**. **Or Enshrine** at the Hall (§6). **Or Charter** (§6).

---

## 5. The living slots — buildings · casks · ships (THE KEYSTONE)

The 8 slots are a churning, **composable** commons. Each slot has up to two layers:

- a **building** (an **owned** modifier — the "dock improvement"), and
- an **occupant**: a **cask** *or* a **ship** (and a ship holds **casks** in its berths).

So a slot reads *(bottom → top)*: **`[building?] + [ship (+ its casks) | cask]`** — the
three-tier *dock → building → ship → cargo* stack. Most slots are bare casks/ships; a few carry
a building.

> **Half your line evolves.** A line's two *stations* are fixed base actions; its two *slots*
> are the half that **grows over the game.** Each slot belongs to **one** line (its row *xor*
> column), so **placing a building commits it to a line** — landing a high-impact modifier on a
> slot of a line you fire often is the core optimization (and the heart of v1.0, `PLAN.md` §3).

### 5a. Buildings — the one tile family (owned, authored, two flavors)
You **gain** buildings to your **hand** — buy one at the Market, or **take one free to hand** when you
deliver to London/Novgorod (§7) or draw one with **Survey**. **You always choose which building** from
the face-up display: if your cask is delivered on **someone else's turn** (a rival topped off and sailed
a hull your cask rode), the choice is **queued to the start of your next turn** — you pick then, from the
display as it stands. You **place** a held building **at the Market** (a free acquire option) onto **any
slot**. **Placing onto a slot that already has a building
REPLACES it** — the displaced tile returns to its **owner's hand** (so the 8 slots never lock; the
contest is over prime slot/line positions, and nothing is destroyed). **If a *rival* displaced it, the
owner also scores it for end-game prestige** (⚙ **+3★** — *the developer lane*: the building served its
purpose, and you are paid for authoring a slot worth overbuilding; **self-displacement pays nothing**, so
you can't farm it by overbuilding your own). Each building is **owned** by its
placer. Under **one grammar — "a building modifies the occupant docked on it"** — a building is one of
two flavors (variety = content, not new rules; the deck is in `COMPONENTS.md`). **Each building targets a
specific occupant** (shown by a glyph): most are **cask** tiles, a few are **ship** tiles (the rich
berths **Rich Berth/Festkeller** + **Cooperage/Customs House**), one is **owner-passive** (Almoner's
Stall). A building does nothing for the wrong occupant. *(v1.5: the two old **line-effect** buildings,
**Harbor Crane** and **Lagering Cellar**, were really private engine perks — they left the public deck
and became **private improvements**, bought for goods at the Market; see §8.)*

- **Value buildings (the "demand"):** the occupant scores **bonus value on delivery.** On a
  **ship**, this is a **rich berth** — *every* cask the ship delivers scores the bonus (the
  three-tier payoff). On a **cask**, that cask delivers for more. The bonus is **captured as the
  cask ships through** the building and carried on a **reusable demand die (d6)** that rides the
  cask in the berth — its **pips = the ★ banked on delivery** (a quality transform instead rides a
  +1-quality marker; the full physical model is in `COMPONENTS.md §2`). *This is the variable kontor
  value — what's worth chasing, authored on the living board.*
- **Transform buildings:** the occupant is **changed.** E.g. a docked cask **ages faster / gains
  +1 quality / gains a second action**; a docked ship **carries +1 cask / may re-flag its
  destination / lowers its quality gate.** The engine/"get-ahead" layer.

### 5b. Owned, but shared (the GWT/Keyflower feel — points, not a toll)
A building **serves the whole ring**, but **benefits its owner most:**
- **The owner** gets the building's **full effect** and may always dock their own cargo on it.
- **A rival** may dock their cask/ship on your building too (the slots are shared) — they get a
  **reduced effect**, and **you (owner) take a small points cut** ⚙ when their cargo delivers
  through it (a "wharfage" — **points, capped — never a goods-skim**, which caused
  rich-get-richer in v0.6). *Build the dock; tax the traffic — gently.*

### 5c. One-fire rule (kept)
When a line fires, the active player **may** use each slot on it — the occupant's action (a
cask's slot-action, a ship's free-load) **and** any building effect — resolving **on the active
player's turn.** No out-of-turn gains.

---

## 6. Ships · Charter · Enshrine (the cash-out — kept)

- **Ships** are neutral, destination-bound hulls (Cog 2 / Hulk 3) off a shuffled deck; a face-up
  **market of 3**. **Commission** (`2 G`) places one on a slot **+ a free berth.** Load deployed
  casks aboard; a ship **sails only when full** → every cask **delivers**, value (§7) + majority
  count sealing **on delivery** in load order. **Dock a ship on your value-building for a rich
  berth** (§5a). The hull returns to the deck; the voyage **advances the clock** (§10).
- **Charter** — spend a **contract** + flat `2 G` fare → one Ready cask on an immediate
  single-cask voyage to a **kontor**. The deadlock guard (always-legal escape).
- **Enshrine** — local Harbor action (no ship/fare): withdraw a deployed **Q2+** cask into the
  **Hall** for **fixed** prestige (§11). Deploy-first keeps it contestable. Advances the clock.

---

## 7. Destinations & delivery value (the variable score)

Five destinations, all open from start (⚙ table in `COMPONENTS.md`):

| Destination | Gate ⚙ | Base value ⚙ | Benefit on delivery ⚙ | Majority (1/2/3) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | +1 ★ | 2 goods (owner's choice) | 4 / 2 / 0 |
| **London** (Steelyard) | Q2 | +1 ★ | take a building **to hand** ⚙ | 5 / 3 / 1 |
| **Bergen** (Bryggen) | Q2 | +1 ★ | **free Reach** (+1 presence, any kontor *you've delivered to*) | 9 / 5 / 2 (anchor) |
| **Novgorod** (Peterhof) | Q3 | scales by Q (Q3→2 · Q4→4 · Q5→6) | **refine** (a maturing cask **+1 age**) | 8 / 5 / 2 |
| **The Hall** (Prestige) | Q2 | **fixed ladder 3/5/7/9 by quality** ⚙ | — (Enshrine) | — |

**Delivery value at a kontor = destination base + the value-building bonuses the cask shipped
through** (§5a) — those bonuses are captured-on-ship-through onto the cask's **demand die** (pips =
★, §5a). So a kontor delivery is worth **a little by default, a lot when you've routed it
through demand you built.** *(The export-premium table and the Masterpiece from v0.16 are folded
into this / cut — confirm during `COMPONENTS.md`.)*

---

## 8. The brewery (private engine) — vessels · recipes · improvements

Private and safe: **vessels** (start 2, cap 3 ⚙), **recipes**, and the **cask-action pool** —
now **steerable**: the top tile of each quality pile is face-up, so you brew toward the actions
you want (Q2+ draw `Source · Age · Load · Reach · Convert · Survey (draw a building) · Wild (Q4+)`;
Gruit fixed to Source).

**Vessels now carry pre-delivery value** — they power the **Floor** (§3, `PLAN.md` §1B) — which
finally gives **Extra Vessel** a real pull (more vessels = a bigger held engine *and* more brewing
throughput). So the **starting count / cap / whether Extra Vessel repeats** are a live ⚙ to
retune: in playtests Extra Vessel and the Warehouse were *never* bought (dead upgrades); the Floor
fixes Extra Vessel, and storage-cap upgrades stay suspect unless they earn their place.
**Most v0.16 upgrades fold into the public building family (§5).**

**The improvements (bought at the Market for goods ⚙):** Extra Vessel (`5 G`), Aging Cellar
(maturation −1 step, `5 G`), Granary Right / Hop Garden (+1 extra grain / hops, `4 G` each), and the
**v1.5** additions — **Harbor Crane** (your Harbor load sets out **2 casks**, not 1, `4 G`),
**Lagering Cellar** (each of **your turns**, **+1 age** to one maturing cask, `4 G`), and **Private
Quay** (load **Ready casks straight from your vessels** onto ships — skipping deploy, `5 G`). *(v1.5
moved Harbor Crane & Lagering Cellar out of the public Building deck — they were private engine perks,
not slot authorship — see §5.)*

---

## 9. Goods & storage

`G` grain · `H` hops — the **only** currency. Storage cap **8** ⚙. No money; no spendable
prestige (delivered/enshrined points are score only).

---

## 10. End of the game (the clock — kept)

The shared **Sailed-Ships track** advances by one on every **voyage** (a ship sailing full, a
Charter, or an Enshrine). When it fills → **finish the round → score.** Length scales by player
count (**~6 / 10 / 13** for 2/3/4p ⚙ — trimmed one each in v1.3, since deploy-via-line + Tap cut
voyages-per-round); a **MAX_ROUND ceiling** (~25 ⚙) backstops a slow
table. Pace target **~12–25 rounds.**

---

## 11. Scoring — the clear spine

**In-game (banked as you play):**
1. **Hall — FIXED.** Each enshrined cask scores its quality's fixed ladder value (3/5/7/9 ⚙).
   *The steady beginner path — low risk, always open.*
2. **Kontore — VARIABLE.** Each delivered cask scores **base + the value-buildings it shipped
   through** (§7), plus any **wharfage cut** you owe/collect (§5b). *The risk/reward path — read
   the board, route your brews.*

**End-game:**
3. **Majorities** — at each kontor, by **delivered-cask count**, tiered (Bruges 4/2/0 · London
   5/3/1 · Novgorod 8/5/2 · Bergen 9/5/2 ⚙; 2p skips 2nd; ties split). *Go big in a few.*
4. **The Flight** — distinct **beers** delivered: **(beers−1)², min 3** (3→4 · 4→9 · 5→16). There are
   always exactly **five beer types** (Gruit + Hopped + the 3 dealt exports), so the full 5-beer flight is
   **always reachable** ⚙. *(v1.0.1: was "distinct quality tiers," which could cap at 4 whenever both Q3
   exports were dealt and Q4/Q5 was out — so the range reward is now per beer, not per quality level.)*
   *The range reward — deliver the full breadth of the house.*
5. **The developer bonus** (v1.2) — **+3★** ⚙ for each of your buildings a **rival overbuilt** (§5a).
   *The crowded-ring / authorship reward — author prime slots and let the contest pay you out.*

> **Presence is standing earned by trade.** A **Reach** (the cask slot-action, the Bergen benefit, the
> Keut perk) can add presence **only at a kontor you've already delivered a cask to** — you can't gain a
> foothold somewhere you've never shipped (v1.2; thematic + fair). Reach is simply a dead action until your
> first delivery.

6. **Tiebreak:** most goods, then most casks on slots.

> **The legible fork:** the **Hall** is the fixed floor; the **kontore** offer **two** ways to
> win — chase **demand** (variable, in-game, via the buildings you author) **or** grind
> **majorities** (count, end-game). The Flight rewards going deep. A new player picks one; an
> expert braids two. That clarity is the point.

---

## Open / to-tune

1. **The building deck** — the value/transform vocabulary, magnitudes, deck size, display width.
   *The keystone's heart* (`COMPONENTS.md`).
2. **Wharfage cut** (§5b) — points size & cap, so owned-but-shared pays the owner without
   rich-get-richer.
3. **Three-tier interactions** — building+ship+casks edge cases (rich berth + a full Hulk could
   spike hard); cap or curve ⚙.
4. **Private improvements** (§8) — which (if any) stay private vs fold into buildings; how earned.
5. **Base values vs building bonuses** — the flat-vs-spiky dial; keep the Hall's fixed ladder the
   legible floor.
6. **Majority numbers** — re-tune now that kontor value is building-driven.
7. **Cuts to confirm** — export premium, the Masterpiece (fold into buildings/Flight?).
8. **Slot pressure** — buildings + casks + ships sharing 8 slots; keep it tight but never locked.
