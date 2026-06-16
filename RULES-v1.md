# Brewhouses of the Hanse — v1.0 "Demand" — Turn & Round Rules (FIRST PASS)

> **Status: design spec, first pass (2026-06-16).** This is the paper rulebook for the v1.0
> clean-sheet. It supersedes nothing yet — the live game is v0.16.1 (`RULES.md`,
> `archive/play.html`). Numbers are placeholders ⚙. The companion is `COMPONENTS-v1.md`
> (the physical manifest) and `V1-PLAN.md` (the why/roadmap). HTML pages and `play.html`
> come *after* this spec is agreed.
>
> **The one-line pitch is unchanged:** a merchant brewing house at the Wharf, where work runs
> **Source → Brew → Age → Ship.** What's new in v1.0: **you no longer ship to a fixed price
> list. You ship to *demand* — and players author that demand by building onto the
> destinations.** A cask is worth what the board says it's worth, where and when. *The right
> beer for the right room.*

---

## 0. What changed from v0.16 (read this first)

v1.0 keeps the spine (the Wharf, the dual-role cask, the kontore + the Hall, no dice/cards/
money, medium GWT/Distilled weight) and **reconceives the slot/scoring layer** around
board-authored demand. The deltas:

| Area | v0.16 ("The Wharf") | v1.0 ("Demand") |
|---|---|---|
| **Where value comes from** | a fixed per-cask value table (`Q5 = 5 ★ + a destination modifier`, export premium Q4+1/Q5+2) | **the board.** Buildings (demand tiles) you install at destinations **define what a delivered cask is worth there.** Quality's *delivery* payoff is contextual & high-variance. |
| **The slot ring's job** | a transient cargo/action commons (casks · neutral ships · neutral buildings) | **the cargo/action commons stays** (casks · ships) — but the **neutral buildings are replaced by owned demand-buildings installed on the destinations** (the authored value landscape). |
| **Goals** | 3 goal tiles, best 2 score | **cut** — dissolved into the demand board (the board *is* the shifting set of goals). |
| **Quality's intrinsic value** | the value table + the Flight + the Hall ladder | **the Flight stays** (range reward), **gates stay** (access), **the Hall stays** (prestige). Only the *flat per-cask value table* is relocated to the board. |
| **Majorities** | tiered, ranked, per kontor | **kept, unchanged in spirit** — now explicitly the **stable, board-agnostic floor** (the points you grind when the demand board is cold). |
| **The private floor** | (removed in v0.7) | **returns** as the occupancy fallback — a stable private path for the boutique/deep brewer (§7). |

**Complexity ledger (the governing constraint, `V1-PLAN.md` §7):** v1.0 *adds* one big system
(the demand board) and *removes* two (goal tiles + the per-cask value table) plus the neutral
buildings. Net weight ≈ flat; depth **concentrates** in one legible place — the demand board.

---

## 1. Setup (symmetric)

Each house starts with (⚙, to tune in `COMPONENTS-v1.md`):
- **3 `G` (grain), 2 `H` (hops)**, plus seat compensation **+1 `G` per seat after the first**.
  Storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipes (the symmetric on-ramp). More recipes at the Market.
- **2 open vessels** (brewing throughput; cap 3 — one Extra Vessel upgrade).
- **2 charter contracts** (the scarce relief-valve certificates; buy more at the Market, §6).
- **1 demand tile in hand** ⚙ (a "starting contract with a town") so each house has an
  authorship play available on turn 1.
- A **warm start** so the Wharf is live on turn 1: a guaranteed **Hulk → Bruges** plus one
  more ship dealt onto ring slots; **one Ready Gruit** per house to deploy on turn 1.
- An empty **brewery board** (vessels + upgrade slots + the floor — `COMPONENTS-v1.md` §4).

The shared board is seeded so both layers are alive turn 1:
- **The Wharf** (the 4 stations + the 8-slot ring) seeded with the two warm-start ships,
  spread across different lines (no obvious opening camp).
- **The Demand Board:** all five **destinations open** (Bruges/London/Bergen/Novgorod + the
  Hall). **Seed each kontor with 1 starting demand tile** ⚙ (a face-up neutral demand, owned
  by no one — so the board already *wants* things on turn 1; players add owned demand on top).
- **Deal 3 of the 4 export beers** into play (the variable quality ladder — Broyhan/Keut Q3,
  Mumme Q4, Bock Q5; dropping one varies the climb's top, exactly as v0.16).
- Shuffle the **Demand deck** and the **Upgrade deck**; deal each a small **face-up display**
  at the Market (Demand display **4** ⚙, Upgrade display **4** ⚙); both refill from their decks.
- Set the **Sailed-Ships track** to its player-scaled length (§9). Each player places a worker
  on any station — opening placement is **free** (no occupancy toll). Choose a first player
  (fixed all game; the free placement + the +1 `G`/seat are the seat balancers).

---

## 2. The Wharf — stations & slots (the tactile spine, kept)

```
        A ── B            A  Market   (Source)  → B  Brewhouse (Brew)
        │    │            │                        │
        C ── D            C  Harbor   (Ship)   ←  D  Cellar    (Age)

  Production order A→B→D→C = Source → Brew → Age → Ship   (move where the board is best)
  (orthogonal moves only — never the diagonal)
```

The turn (unchanged from v0.16):
1. **Move** your worker to an orthogonally adjacent station (mandatory from turn 2). If you
   move onto a station a rival occupies, **pay 1 `G` occupancy toll** — *or* take the **private
   floor fallback** instead (§7). Opening placement is free.
2. **Activate** the **row OR column** of your station.
3. **Resolve** the line's up-to-4 stops — **slot · station · station · slot** — in any order.
   Both stations always fire; the worker only gates *which line is legal*. Each slot building
   you **may** use. Base actions always work; slot buildings only *add*.

**A line** = its two stations + any tiles in their two slots. Stations are never closed (no
twins) — the only station cost is the occupancy toll / floor-fallback choice.

---

## 3. The cask — its three states (the dual-role tile)

A cask carries a **quality Q1–Q5** (printed) and **one signature slot-action** (drawn at brew
from a pool — the v0.12 mechanic, kept; Gruit fixed to **Source +2 goods**, Q2+ casks draw).
It lives in exactly one state:

1. **Maturing** *(private, in a vessel)* — brewed at step 0, ages toward **Ready** (+1 each of
   your turns + the Cellar action). Higher quality takes longer. Scores nothing. *(A maturing
   cask is also your **private floor** — §7.)*
2. **Deployed** *(public, on a ring slot)* — the instant it's Ready you deploy it (free). Now
   it's three things at once: **cargo-in-waiting**, a **public slot-action** (its line fires →
   the active player may take it), and a **contestable** target (a rival may load it, §6). It
   scores nothing yet. *(No open slot → it **clogs its vessel** until you free one or ship.)*
3. **Delivered** *(scored, gone)* — loaded onto a ship and **shipped to a destination** (§5–6).
   It scores its **delivery value** there (§5) for its owner and leaves the board.

> The cask only becomes contestable once **deployed** on the public ring. Your brewery
> (maturing casks, recipes, upgrades) is private and untouchable.

---

## 4. The four stations (the actions)

Every base action always works; slot buildings (deployed casks, ships) only add copies.

### A · Market — *Source & author*
Do **one** (one Market visit):
- Take **2 goods** (any mix), **or**
- **Acquire one tile**, paying its goods cost ⚙:
  - a **recipe** (a brewable quality; export recipes cost more) — always in stock;
  - a **ship commission** (`2 G` ⚙ — place one of the 3 face-up ships on a slot + free-load
    one Ready cask aboard; §6);
  - a **charter contract** (`1 G` ⚙ — the scarce relief-valve certificate; §6);
  - a **demand tile** from the face-up Demand display (`⚙ G` by tier) — **and immediately
    install it** onto a destination with an open demand slot (§5). *This is the authorship
    play — the GWT "build the track" move.* (Upgrades are **not** bought — earned by delivery, §7.)

### B · Brewhouse — *Brew*
**Load** one recipe you hold (paying its `G/H` cost) into an **open vessel** → a young cask at
step 0; draw its slot-action. One load per visit. Recipes are permanent.

### D · Cellar — *Age*
Gain **3 age points** ⚙, allocate freely across your vessels. (Each cask also ages **+1** at
the start of your turn.) When a cask reaches Ready, deploy it to an open ring slot.

### C · Harbor — *Ship*
Do one of (§6 for detail):
- **Load** a deployed cask (yours or a rival's) onto any ship it qualifies for — **you choose
  the ship/destination.** Loading a rival's cask: **you** take a **1 `G` loader bonus**; the
  **owner** scores it on delivery. Ships **sail only when full**; on the last berth, every cask
  aboard **delivers** (value + majority count seal here).
- **Enshrine** at the Hall (local, no ship) — withdraw one of *your* deployed Q2+ casks into
  the Hall for prestige (§5/§6).
- **Charter** — spend a contract + a flat `2 G` fare to send one Ready cask (from a vessel or
  slot) on an immediate single-cask voyage to a **kontor** (the deadlock relief valve).

---

## 5. The Demand Board — where value lives (THE HEART)

This is the v1.0 system. The five **destinations** are the rooms; **demand tiles (buildings)**
are what makes a room *crave* something; a delivered cask is worth **what the demand it
satisfies says it's worth.**

### 5a. Destinations (the rooms — all open from start)
Each destination has three printed properties (⚙, full table in `COMPONENTS-v1.md`):
- a **quality gate** (the climb — better rooms want better beer, e.g. Bruges Q1, London Q2,
  Bergen Q2, Novgorod Q3, the Hall Q2);
- a small **base value** per delivered cask (flat, modest — the guaranteed floor of a delivery);
- a **majority** (tiered, ranked by delivered-cask count — the **stable points floor**, §8);
- a **demand stack**: **up to 2–3 demand-tile slots** ⚙ that hold the installed buildings.

> **Quality is NOT worth a fixed number here.** The base value is small and roughly flat. The
> *real* value of a delivery is whatever **demand tiles** it satisfies. A Q5 delivered where
> nothing craves it earns only base (a **miss**); delivered into a Q5 demand it **spikes**.

### 5b. Demand tiles (the buildings — owned, authored)
A demand tile is acquired at the Market and **installed onto a destination's demand slot**,
**owned by the installer.** Each reads a **pattern → bounty** under one grammar
*(content lives in the variety of tiles, not in new rules — see `COMPONENTS-v1.md` for the deck)*:

| Example demand tile (⚙) | Pattern | Bounty |
|---|---|---|
| **The Thirst** | any cask delivered here | **+1 ★ per quality level** (rewards high Q broadly) |
| **The Craving (Q3)** | a Q3 cask delivered here | **claim +5 ★** (first), then **+2 ★** standing |
| **Premium Steelyard** | a Q4+ cask delivered here | **+3 ★** each |
| **The Hub** | any cask delivered here | **+1 ★** each; owner **+1 `G`** per *rival* delivery |
| **Off-Season** | a Q4+ cask delivered here | **+0** (this room is playing beer-pong) — a *defeater* that occupies a demand slot so the room stays cheap |

- **Live fulfillment (two-sided tiles).** Most demand tiles are **spike-then-standing**: the
  **first** matching delivery **claims** a one-time bounty (the spike); the tile then flips to
  its smaller **standing** side, paying on every later match. **This is the race** — be first
  to read and feed a fat demand. *(One grammar, rich behavior; ⚙ whether all tiles are
  two-sided or some are pure-standing.)*
- **Owned-but-shared (the #3 intent, cleanly).** The tile **serves everyone** (any matching
  delivery scores the bounty for that cask's owner), but **benefits its owner most**: the owner
  (a) is positioned to **claim the spike first**, and (b) takes a **kickback** (⚙ +1 `G` or
  +1 ★) whenever a *rival* delivers into it. **No goods-skim toll** (that caused rich-get-richer
  in v0.6) — the benefit is *position + a capped kickback*, not a tax that scales.
- **Authoring is the strategic spine.** Installing a demand tile is the GWT "build the track"
  move: you **declare a room now wants X**, betting your own pipeline can feed it best — and
  every rival can read it and race you. The board's demands are **what's worth chasing**, and
  the players write them.

### 5c. The delivery-value formula (the keystone)
When a cask **delivers** to a destination, its owner immediately scores:

> **delivery value = destination base + Σ (bounties of the demand tiles it satisfies there)**

and the cask is counted toward that destination's **majority** (scored at end, §8). That's it
for the kontore. (Quality's *other* rewards — the Flight, the Hall — score separately, §8.)

This is the v0.16 `Q5 = 5 ★ + modifier` **relocated onto the board.** Same feel of "a great
delivery," now **manifested by demand** instead of printed on the cask — so reading the board
and **sending the right beer to the right room** is the skill.

### 5d. Dynamic gates (⚙ variant to evaluate)
Baseline: each destination has a **fixed** quality gate (the climb). **Variant:** a demand tile
can *raise or open* what a room will accept this game (e.g. "Novgorod now also craves Q5"),
making the gates themselves board-authored. Flagged for prototype; baseline keeps fixed gates
for legibility.

### 5e. Composable ring slots (⚙ variant — the "slots cascade" idea)
The user's enthusiasm (a slot = a cask, upgraded by a building that modifies it; a ship at a
building that changes its rules) is captured here as an **opt-in extension**, *not* baseline —
to keep the first prototype clean. The grammar would be **one sentence: "the base modifies its
occupant,"** with variety in a small **ring-building deck**: e.g. *Cooperage* (a cask on this
slot ages +1/turn), *Customs House* (a ship on this slot may re-flag its destination), *Crane*
(amplify this slot's cask-action). Evaluate after the demand loop proves out; only adopt if it
adds **content under that single grammar**, not new special-case rules.

---

## 6. Ships, Charter, Enshrine (the cash-out mechanics — kept from v0.16)

- **Ships** are neutral, destination-bound hulls (Cog 2 / Hulk 3) off a shuffled deck; a face-up
  **market of 3** sits at the Market. **Commission** (`2 G`) places one + a free berth.
  **Load** a deployed cask (yours or a rival's) aboard any ship it qualifies for. A ship **sails
  only when full**; on the last berth, **every cask delivers** — value (§5c) + majority count
  seal **on delivery**, paid in **load order** (numbered berths). Loading a rival's cask: you
  take **1 `G`**, the owner scores. The hull returns to the deck; the voyage **advances the
  Sailed-Ships clock**.
- **Charter** — spend a **contract** + flat `2 G` fare → one Ready cask (vessel or slot) on an
  immediate single-cask voyage to a **kontor**. Delivers normally; advances the clock. The
  scarce contract is the throttle; **the deadlock guard** (Move → Market → buy contract →
  charter is always legal).
- **Enshrine** — local Harbor action (no ship/fare): withdraw one of your deployed **Q2+** casks
  into the **Hall** for prestige (§8). Advances the clock. The cask must be **deployed first**
  (so it's publicly contestable — a rival may hijack-load it to a kontor before you enshrine).

---

## 7. The brewery & the private floor (your private engine + the stable fallback)

Your brewery is private and safe: **vessels** (start 2, cap 3), **recipes**, **upgrades**, and
the **floor**.

### Upgrades (earned, not bought)
Two families — **Rooms** (capability) and **Modifiers** (asymmetric perks) — earned **only by
delivering to London / Novgorod** (those rooms hand you a face-up Upgrade tile free; Bruges/
Bergen hand goods). The full set is in `COMPONENTS-v1.md` §3; the v0.16 list largely carries,
with two edits forced by the clean sheet:
- **Cut/retheme** any upgrade tied to a removed system (e.g. nothing keys off the old value
  table). The **Flight/Hall** upgrades stay.
- **Add demand-lane upgrades** (the new lane needs hooks), e.g. *Factor's Office* (install a
  demand tile for 1 less / hold 2 in hand), *Guild Charter* (your demand kickbacks are doubled).
  ⚙ — designed in `COMPONENTS-v1.md`.

### The private floor (the returning fallback — §0)
The **maturing casks in your vessels are your private engine floor.** When you **move onto a
station a rival occupies**, you choose:
- pay the **1 `G` occupancy toll** (the v0.16 default), **or**
- **tap the floor:** activate the **slot-action of one of your maturing casks** once, privately
  (e.g. its Source/Age/Convert) — *no toll, but you spend your fallback for the turn.* ⚙

This gives the **boutique/deep brewer** — who keeps few casks, privately, and may not want to
fight for the contested ring — a **stable alternative path**, exactly the original v0.1 feel.
It is the **one rule v1.0 deliberately adds back** (`V1-PLAN.md` §4); gate its strength so it's
a genuine *alternative*, never strictly better than working the public board. *(⚙ open: whether
the floor is the occupancy-fallback only, or a small always-available private action.)*

---

## 8. Scoring (end-game)

No goal tiles. You score from **what you delivered** + the two intrinsic-quality rewards:

1. **Delivery value** — sum of every delivery's value banked live (§5c): destination base +
   demand bounties claimed. *(This is where the demand lane pays.)*
2. **Majorities** — the **tiered, ranked** majority at *every* kontor, by delivered-cask count
   (⚙ Bruges 4/2/0 · London 5/3/1 · Novgorod 8/5/2 · Bergen 9/5/2 — the rich anchor; 2p skips
   2nd; ties split). **The stable, board-agnostic floor** — the steady/volume lane.
3. **The Flight** — distinct quality tiers (Q1–Q5) among your delivered casks: **(tiers−1)²,
   min 3** (3→4 · 4→9 · 5→16). Quality's **range** reward — intrinsic, kept. The full flight
   needs a Bock. *(The deep lane's reward, independent of demand.)*
4. **The Masterpiece** ⚙ *(reconsider, not cut)* — first to deliver the top dealt tier →
   one-time **+3 ★ + 3 goods**. Pays the climb's tempo back.
5. **The Hall (prestige)** — your **enshrined** casks score the Hall's prestige (⚙ ladder
   4/6/8/10 by quality — a legitimate intrinsic-quality reward, so it may stay scaled; the Hall
   is the **standing demand for your finest**, the one room that always wants quality). The
   deploy-then-enshrine throttle keeps it contestable (§6).
6. **Tiebreak:** most goods, then most casks on slots.

> **The lanes (the GWT braid):** **Majority** (ship wide; steady floor) · **Demand** (read the
> board; volatile spikes — where quality's *delivery* value lives) · **Prestige/Hall** (the
> standing demand for the finest; deep) · **Engine/upgrades** (capacity). No lane wins solo;
> a winning game is usually a **braid of two** (a majority floor + demand spikes, or deep
> Hall + demand-for-quality).

---

## 9. End of the game (the clock — kept)

The shared **Sailed-Ships track** advances by one on every **voyage** (a ship sailing full, a
Charter, **or** an Enshrine). When it fills, **finish the round → score.** Self-accelerating;
length scales steeply by player count (**~7 / 11 / 14 / 17** for 2/3/4/5p ⚙). A **MAX_ROUND
ceiling** ⚙ (~25) backstops a slow table. Pace target: **~12–25 rounds.** *(The demand board's
live-fulfillment tempo is a new pace input — re-measure once the engine exists; the Sailed-Ships
length stays the primary dial.)*

---

## Open / to-tune (the first-pass question list)

The structural calls flagged for the prototype + sim, roughly by leverage:

1. **Demand-tile shape & sizing** — the pattern vocabulary (quality / range / style), spike vs
   standing, bounty magnitudes vs the destination base, deck size & rarity. *The heart; sizes
   everything.* (`COMPONENTS-v1.md` §6.)
2. **Demand-stack capacity per destination** (⚙ 2 vs 3) and whether installing is contested
   (only so many slots → fights over who authors a room).
3. **Owner kickback** (⚙ +1 `G` vs +1 ★, capped) — strong enough to make authoring pay,
   gentle enough to avoid rich-get-richer.
4. **The private floor** — occupancy-fallback only vs a small always-on action; its strength.
5. **Fixed vs dynamic gates** (§5d) and the **composable-ring variant** (§5e) — adopt only if
   they earn their teach.
6. **Destination base values** (small/flat) vs **demand magnitudes** — the dial between "every
   delivery is fine" (flat) and "reading demand is everything" (spiky).
7. **Majority numbers** carried from v0.16 — re-tune once delivery value is board-driven (the
   floor's weight relative to demand changed).
8. **The Hall ladder** (keep 4/6/8/10 scaled, or flatten) and the **Masterpiece** (keep/cut).
9. **End-clock length** under live-fulfillment tempo (re-measure).
10. **Seat fairness** at 4p (the v0.16 watch-item — the demand-authorship race may worsen or
    ease first-player advantage; measure).
