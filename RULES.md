# Brewhouses of the Hanse — Turn & Round Rules (v0.17 “Living Slots” — IN DESIGN)

> **Status: in-design (2026-06-16).** This is the canonical rulebook, edited forward onto the
> **keystone** direction (`PLAN.md`): *living, composable Wharf slots + dead-simple scoring.*
> Numbers are placeholders ⚙. **The live, playable game is still v0.16.1** ("The Wharf"),
> frozen at branch `archive/main-v0.16.1`, playable at `archive/play.html`, and snapshotted in
> `archive/v0.16/`. This document leads the rebuild; `play.html` follows once the rules settle.
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
   hold; opening placement free) — *or, instead of the toll,* **tap your private floor:**
   activate one *maturing* cask's slot-action (the boutique brewer's stable fallback when the
   ring is unfavorable) ⚙. *(The carried v0.1 "alternate action when blocked"; developed into the
   **Floor / private line** — `PLAN.md` §1B.)*
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
   Cellar). Higher quality takes longer. Scores nothing.
2. **Deployed** *(public, on a slot)* — when Ready, deploy it (free) onto an open slot you
   choose. Now it is **cargo-in-waiting**, a **public slot-action**, and **contestable**. *(If
   you deploy onto a slot with a **building**, the building modifies it — §5.)*
3. **Delivered** *(scored, gone)* — shipped to a destination (§6–7). Scores for its owner and
   leaves.

> **The squeeze (state it to players):**
> - **You can't brew everything** — 2 vessels (cap 3), the recipe ladder, and time. A slow Bock
>   ties up a vessel that could have turned two quick casks.
> - **You can't deliver everywhere** — scarce ships and slots, the destination gates, one end
>   clock. *Where* a cask goes is a commitment, not a default.
>
> Choosing your beers and your destinations **is** the game. The living slots are how you tilt
> those choices in your favor.

---

## 4. The four stations (the actions)

### A · Market — *Source & build*
Do **one**: take **2 goods** (any mix), **or acquire one tile** (pay its goods cost ⚙):
- a **recipe** (a brewable quality; export recipes cost more);
- a **building** from the face-up display (`⚙ G` by tier) — **and place it on a slot** (§5);
  *(you may also place a building you already hold, free — the starting tile / a Survey draw);*
- a **ship commission** (`2 G` ⚙ — place a face-up ship on a slot + free-load one Ready cask — §6);
- a **charter contract** (`1 G` ⚙ — §6).

### B · Brewhouse — *Brew*
**Load** one recipe you hold (paying its `G/H`) into an **open vessel** → a young cask at step 0;
draw its slot-action. One load per visit. Recipes are permanent.

### D · Cellar — *Age*
Gain **3 age points** ⚙, allocate across your vessels (each cask also ages **+1** at the start of
your turn). When a cask reaches Ready, deploy it (§3).

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
> slot of a line you fire often is the core optimization (and the heart of v0.17, `PLAN.md` §3).

### 5a. Buildings — the one tile family (owned, authored, two flavors)
Buildings come from the Market display, are **placed on any slot** (empty or occupied), and are
**owned** by the placer. Under **one grammar — "a building modifies the occupant docked on it"**
— a building is one of two flavors (variety = content, not new rules; the deck is in
`COMPONENTS.md`):

- **Value buildings (the "demand"):** the occupant scores **bonus value on delivery.** On a
  **ship**, this is a **rich berth** — *every* cask the ship delivers scores the bonus (the
  three-tier payoff). On a **cask**, that cask delivers for more. *This is the variable kontor
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
| **London** (Steelyard) | Q2 | +1 ★ | take a building/recipe ⚙ | 5 / 3 / 1 |
| **Bergen** (Bryggen) | Q2 | +1 ★ | 2 goods | 9 / 5 / 2 (anchor) |
| **Novgorod** (Long Haul) | Q3 | +2 ★ | take a building/recipe ⚙ | 8 / 5 / 2 |
| **The Hall** (Prestige) | Q2 | **fixed ladder 4/6/8/10 by quality** ⚙ | — (Enshrine) | — |

**Delivery value at a kontor = destination base + the value-building bonuses the cask shipped
through** (§5a). So a kontor delivery is worth **a little by default, a lot when you've routed it
through demand you built.** *(The export-premium table and the Masterpiece from v0.16 are folded
into this / cut — confirm during `COMPONENTS.md`.)*

---

## 8. The brewery (private engine) — vessels · recipes · improvements

Private and safe: **vessels** (start 2, cap 3 ⚙), **recipes**, and the cask-action pool (drawn
at brew, Q2+): `Source · Age · Load · Reach · Convert · Survey (draw a building) · Wild (Q4+)`.
**Most v0.16 upgrades fold into the public building family (§5);** a few inherently-private
improvements (Extra Vessel, faster aging) remain as brewery perks — **how they're acquired
(Market vs delivery-earned) is ⚙ open**, to settle in `COMPONENTS.md`.

---

## 9. Goods & storage

`G` grain · `H` hops — the **only** currency. Storage cap **8** ⚙. No money; no spendable
prestige (delivered/enshrined points are score only).

---

## 10. End of the game (the clock — kept)

The shared **Sailed-Ships track** advances by one on every **voyage** (a ship sailing full, a
Charter, or an Enshrine). When it fills → **finish the round → score.** Length scales by player
count (**~7 / 11 / 14 / 17** for 2/3/4/5p ⚙); a **MAX_ROUND ceiling** (~25 ⚙) backstops a slow
table. Pace target **~12–25 rounds.**

---

## 11. Scoring — the clear spine

**In-game (banked as you play):**
1. **Hall — FIXED.** Each enshrined cask scores its quality's fixed ladder value (4/6/8/10 ⚙).
   *The steady beginner path — low risk, always open.*
2. **Kontore — VARIABLE.** Each delivered cask scores **base + the value-buildings it shipped
   through** (§7), plus any **wharfage cut** you owe/collect (§5b). *The risk/reward path — read
   the board, route your brews.*

**End-game:**
3. **Majorities** — at each kontor, by **delivered-cask count**, tiered (Bruges 4/2/0 · London
   5/3/1 · Novgorod 8/5/2 · Bergen 9/5/2 ⚙; 2p skips 2nd; ties split). *Go big in a few.*
4. **The Flight** — distinct quality tiers delivered: **(tiers−1)², min 3** (3→4 · 4→9 · 5→16).
   *The range reward; the full flight needs a Bock.*

5. **Tiebreak:** most goods, then most casks on slots.

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
