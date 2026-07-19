# Brewhouses of the Hanse — Turn & Round Rules (v3.4 “Tally Dice”)

> **v3.4 “Tally Dice” (designer-ruled 2026-07-19).** The presence disc and the demand die are
> **ONE component**: each house owns **14 player-colour d6 — the TALLY DICE.** A die from your
> tray rides every deployed cask (face **1** — ownership in plain sight), is **turned to the
> Privilege’s printed N at departure** (one read, unchanged), rides the hull’s berth well, and
> **parks at the destination on delivery** — it IS your presence there, and the same public pool
> is the presence clock. The kontore’s old flat **+1★ base is folded into the die’s floor of 1**
> (a bare delivery pays exactly what it did; a privileged delivery to a flat kontor pays 1 less ⚙
> — the watch item). **No die in the tray → no deploy, no vessel-direct load, no Reach.** The
> oracle evidence: `playtests/dice-experiment/REPORT.md`.

> **Status: live (2026-07-12).** The **v3.0-A “Path A” keystone** (designer-ruled in
> `V3-PATH-A.md`) + **v3.1 “One Row”** (the one-row player board + four dials) + **v3.2 “Three
> Coins”** (designer-ruled off `HALL-STUDY.md` §4E): the Hall becomes the **Guild’s Three Coins**
> board (§7b) and the game gains the **presence clock** — **14 public discs** per house; every
> delivered cask spends one; the last disc placed sets the final round, **alongside** a retuned
> Sailed-Ships track (5/8/10 — ships + charters only; enshrines never tick). Numbers ⚙.
> **The live, playable build is `play.html` (KEY `hanse-v34`).** The prior live build (v2.9.1,
> KEY v94) is archived, playable, at **`archive/v2.9/`**; the v0.16.1 build at `archive/play.html`.
>
> **The eight moves of Path A:**
> 1. **Stations compress to ≤2 printed actions** — each station is a this-or-that face.
> 2. **Slot locality** — a slot’s stop acts **on that slot**; only the stations reach the wharf.
> 3. **Over-deploy** — deploy onto your own lower cask (it is **tapped on the way out**) or onto
>    anyone’s Q1 (it has **soured** — boxed). Tap-the-menu is retired.
> 4. **One-read dice** — a Privilege prints one plain **+N★**; the demand die is set to N at
>    departure (the pips are the ★). The premium/cap/sail-bump arithmetic is deleted.
> 5. **The Hall is a coin board** — quality-gated shelves, each printing THREE coins (v3.2
>    “Three Coins”: **FAME ★ · CRAFT · FAVOR**, each claimable once); an enshrine buys exactly
>    ONE, or launches for ★ = quality (§7b).
> 6. **The Floor is stay-home** — a whole turn on your player board (Age pool + every vessel
>    cask’s action + flip Wilds); flipped tiles score **nothing**.
> 7. **The Flight is (also) an unlock track** — each distinct beer you **brew** (from the 2nd)
>    opens the next covered **Floor slot** (v3.1: one row — no row choice); distinct beers
>    **delivered** still score the ladder.
> 8. **Cask actions are specific gains** — nine concrete verbs; “what do I get” is printed.
>
> **The pitch:** a merchant brewing house at the Wharf, where work runs **Source → Brew → Age →
> Ship.** The soul is the **squeeze** — *you can’t brew everything, and you can’t deliver
> everywhere.* You build advantages on the **living slots** (owned tiles that modify the casks
> and ships docked to them), then choose where your beer pays off: the **Hall’s shelves**
> (prestige + honors) or the contested **kontore** (value + end-game majorities).
> *(Companions: `COMPONENTS.md` — the manifest; `V3-PATH-A.md` — the plan; `DESIGN.md` — the why.)*

---

## 0. What this keystone keeps and changes (read first)

**Keeps:** the 2×2-stations + 8-slot Wharf and the move-then-activate turn; the dual-role cask
(maturing → deployed → delivered); ships that **sail when full**; deploy-first + the Quaymaster
exception + Commission’s vessel door; Privileges-pay-owner / Works-serve-all; the destination
values and majority tiers; the occupancy toll; the ground rent; the warm start; the three-colour
tile taxonomy; the steerable brew piles; the three expansions on their spine; the no-dice-as-
randomizers / no-cards-as-hand / no-money constraints; the sim-gate discipline.

**Changes (the eight moves above), plus the consequences:**
- **Tap** (the Cellar menu verb) is retired — its recall job lives in over-deploy’s tap-out; its
  cash job lives on the Floor (vessel casks fire without discarding).
- **The Gauger’s Office and Festkeller are cut** from the deck; **five new works** join it
  (Pilot’s House · Open Staithe · Rope Walk · Grain Exchange · Mission Quay), and the **Rich
  Berth** is redesigned (a hull docked there sails one berth short).
- **The floor-points lane is gone** (seated flips score 0) — a flip is engine, never score. *(v3.3: a displaced tile with **no open Floor slot** is **simply discarded**.)*
- **Enshrine + Charter become one Harbor gesture: DISPATCH** (one deployed cask → the Hall,
  free, or a kontor, contract + fare).

---

## 1. Setup (symmetric)

Each house starts with (⚙):
- **3 `G` (grain), 2 `H` (hops)** — equal for every seat. Storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipe **cards** (the symmetric on-ramp; Gruit dealt flipped to
  its BREWED face — the warm start counts). More recipes at the Market.
- A **player board** (§8) with **ONE Floor row of 7 printed slots** (v3.1 “One Row”): **slots
  1–2 open** (unlock covers on 3–7), **slot 1 printed VESSEL-ONLY** — nothing else prints on it
  (v3.2d: your recipe cards carry the Flight). A slot holds ONE of: a maturing cask (a vessel) ·
  a seated Specialist · a flipped tile.
- **2 charter contracts** (the kontor-Dispatch certificates; buy more at the Market — §6).
- **14 TALLY DICE ⚙ (player-colour d6) — your whole delivery runway, in public view.** A die
  rides every cask you deploy (face 1), turns to a Privilege’s printed N at departure, and
  **parks at the destination on delivery** — presence and value on one component. Every
  delivered cask (kontor or Hall) and every presence bump spends one (§10); tray + at-sea +
  parked is always countable.
- A **warm start** so the Wharf is live turn 1: a guaranteed **Hulk → Bruges** + one more ship
  dealt onto slots (spread across lines); **two NEUTRAL green Buildings** dealt from the deck
  onto open slots (they serve any dock; no owner — overbuilding one still costs the ground rent,
  pays nobody, and the tile is discarded; a Privilege is personal and is never dealt neutral);
  **one Ready Gruit** per house.

Shared board: the **Wharf** (4 stations + 8 slots) with the warm-start ships; the four kontore
(Bruges/London/Bergen/Novgorod) + the **Hall’s Three Coins board** (§7b) all open; **deal 3 of the 4
export beers** (the variable quality ladder); shuffle the **Privileges & Buildings deck** and
deal a face-up **display of 4** ⚙ at the Market; shuffle the **Specialist deck** (n−1 copies of
each of the 7) and deal a face-up **display of 4** at the Cellar; set the **Sailed-Ships track**
to its player-scaled length (§10). Each player places a worker on any station — **opening
placement is free.** First player fixed all game.

---

## 2. The Wharf — stations & slots (the spine)

```
        A ── B            A  Market   (Source)  → B  Brewhouse (Brew)
        │    │            │                        │
        C ── D            C  Harbor   (Ship)   ←  D  Cellar    (Age)

  Production order A→B→D→C = Source → Brew → Age → Ship   (move where the board is best)
  (orthogonal moves only — never the diagonal)
```

The turn (v3.0-A — **move OR stay home**):
1. **Move** your worker to an orthogonally adjacent station (from turn 2) and **choose the
   station’s row or its column** — **or STAY HOME and work your Floor** (§8: the worker keeps
   its station; you skip the wharf entirely this turn). The **1 `G` occupancy toll** ⚙ (capped
   at what you hold; opening placement free) is paid only when you activate a line while a rival
   shares your station — **the Floor is never tolled.** A Floor with no live stop is **not a
   legal choice** (a null Floor is not a line).
2. **Resolve** the line’s stops — **slot · station · station · slot** — **in any order; every
   stop is optional.** Both stations always fire (each a printed this-or-that, §4); the worker
   only gates *which lines are legal*.

**THE LOCALITY RULE (v3.0-A):** ***a slot’s stop acts on that slot; a station’s verb reaches the
whole wharf.*** On a line:
- an **empty (or building-only) slot’s** stop = **deploy a Ready cask HERE** — or, if the
  building prints an action (Rope Walk · Grain Exchange · Mission Quay), take **that** instead
  (a this-or-that on the stop);
- a **ship’s** stop = **load THIS hull** (any eligible cask on the wharf may board it);
- a **cask’s** stop = **its printed action** (building-modified) — or **over-deploy onto it**
  (§3).

The **Brewhouse’s Deploy** and the **Harbor’s Load** remain the two wharf-wide valves behind
locality.

---

## 3. The cask & the squeeze (the soul)

A cask carries a **quality Q1–Q5** (printed) and **one specific-gain action** (drawn at brew
from the face-up pile top; Gruit fixed to **Gain 2 goods** — §8). Three states:

1. **Maturing** *(private, in a vessel)* — ages toward **Ready** (+1 each of your turns + the
   Cellar/Floor). It already works: a vessel cask **powers your Floor** (§8). The catch: it
   occupies the vessel.
2. **Deployed** *(public, on a slot)* — set a Ready cask onto a slot: **locally** via that
   slot’s own stop, or **anywhere** via the Brewhouse’s Deploy. A building under it modifies it.
   The cask is now cargo-in-waiting, a public action, and contestable.
   **OVER-DEPLOY (v3.0-A — placement, not a menu):**
   - onto **your own lower-quality cask** → the lesser cask is **TAPPED ON THE WAY OUT**: fire
     its (building-modified) action once, then it is **returned to the box**. Parking a cask =
     reserving the berth + a banked action.
   - onto **anyone’s Q1 (Gruit)** with a higher cask → the stale ale has **SOURED**: it is
     returned to the box, **no action** (spoiled beer serves nobody). Rival non-Q1 casks are
     safe. ⚙
   - The **Open Staithe** (a work) additionally lets an **un-Ready** cask deploy onto it — it
     matures **+1 on its owner’s turn** on the dock, publicly (no action until Ready). A
     **maturing cask is safe from over-deploy** except the Q1 sour rule — there is nothing to
     tap in an unfinished barrel.
3. **Delivered** *(scored, gone)* — dispatched or shipped to a destination (§6–7).

> **Shared supply (⚙):** casks are a shared pool, **brewed never bought**, a **minimum of 6
> tiles per type** (staples deeper: 16 Gruit / 20 Hopped). Counts in `COMPONENTS.md`.

> **The squeeze (state it to players):**
> - **You can’t brew everything** — 2 open Floor slots that vessels, Specialists and flips all
>   compete for (the Flight opens more), the recipe ladder, and time.
> - **You can’t deliver everywhere** — scarce ships and slots, the gates, one clock.
> - **You can’t hold everything** — a Ready cask in a vessel powers your Floor but clogs the
>   vessel; deploying frees it and makes it public.
> - **You can’t be everywhere** — the wharf or your Floor, one worker, one turn.

---

## 4. The four stations (each a printed THIS-or-THAT — one choice per visit)

### A · Market — **SOURCE or ACQUIRE**
**Source:** take **2 goods** (any mix). **Or Acquire ONE tile** (pay its cost ⚙):
- a **recipe** (a brewable quality; export recipes cost more);
- a **Privilege/Building** from the face-up display — **buy it and place it at once** (§5);
- a **ship commission** (`2 G` ⚙ — place a face-up hull on an **open slot** and take the free
  load (ANY player’s deployed cask, or a Ready cask straight from YOUR vessels), **or onto a
  slot whose cask QUALIFIES for the hull’s printed destination** — the dockside pickup: that
  cask boards **as the free load** (no second load; a rival’s follows the rival-loading rules) —
  §6);
- a **charter contract** (`1 G` ⚙ — §6).

### B · Brewhouse — **BREW or DEPLOY**
**Brew:** load one recipe you hold (paying its `G/H`) into an **open vessel** → a young cask at
step 0. It takes the **face-up top action of that quality’s pile** — every pile top is visible,
so you brew toward the action you want (steerable variance). Gruit is pinned to *Gain 2 goods*.
**Brewing a beer type for the first time FLIPS its recipe card to the BREWED face (the big
check) — from the 2nd distinct beer on, each flip grants a FLOOR-SLOT UNLOCK (§8). Your flipped
cards ARE the Flight (§11).**
**Or Deploy:** set one Ready cask onto **any** open slot (over-deploy rules apply) — the
wharf-wide valve behind slot locality.

**Recipe costs** (brew = paid into the vessel; buy = a Market Acquire):

| Recipe | Quality | Brew cost | Ready | Buy (Market) |
|---|---|---|---|---|
| Gruit | Q1 | `G` | 1 | starter |
| Hopped | Q2 | `G H` | 1 | starter |
| Broyhan | Q3 | `G H H` | 1 | `1 H` |
| Keut | Q3 | `G G H` | 2 | `1 G` |
| Mumme | Q4 | `G H H H` | 3 | `2 H` |
| Bock | Q5 | `G G H H H` | 3 (2 with the Cellarman) | `1 G 1 H` |

(Specialty Beers and Jopenbier costs are given with those toggles, §12.)

### D · Cellar — **AGE or UPGRADE**
**Age:** gain **3 age points** ⚙ and allocate them across your maturing vessels (each cask also
ages **+1** automatically at the start of your turn). **Or Upgrade:** buy **one Specialist**
from the face-up display (pay its goods cost) — it **seats in an open Floor slot**, consuming it
(§8 — no seatable slot → no buy; slot 1 is vessel-only). *(With the Specialty Beers toggle,
**Blend** is a third or-branch — §12.)* One choice per visit. **Tap is retired** (§3).

### C · Harbor — **LOAD or DISPATCH**
**Load:** one deployed cask (yours or a rival’s) onto a ship it qualifies for — you choose the
hull; loading a rival’s cask: you take **1 `G`**, the owner scores it on delivery. Ships **sail
only when full**. **Or Dispatch:** send **ONE deployed cask** of yours on its own —
- **to the HALL** (free, no boat): buy ONE coin on the Three Coins board, or launch — §7b; or
- **to a KONTOR** (spend a **charter contract** + the flat **2 `G` fare** ⚙): an immediate
  single-cask voyage — the deadlock relief valve.

Only the **kontor** route ticks the Sailed-Ships track; the Hall never does. **Every delivered
cask — either route — parks its tally die at the destination** (§10).

> **DEPLOY FIRST — THE VESSEL-OUTLET GRAMMAR.** ***Load and Dispatch take a DEPLOYED cask.***
> A cask must stand on a public slot — contestable, loadable by rivals — before it can go
> anywhere: *a public showing is the price of every sale.* Two doors past the rule:
> - the **Quaymaster** (purple Specialist) is the one invested exception — its owner may Load or
>   Dispatch **straight from their own vessels**;
> - **Commission** is the one universal vessel-direct door — its free load takes ANY player’s
>   deployed cask (rival-loading rules) or a Ready cask straight from YOUR vessels.
>
> **Every gate check uses EFFECTIVE quality** (the kilns, Duckstein — quality lifts count for
> gates AND points; the Customs House instead relieves the ship’s boarding gate).

---

## 5. The living slots — Privileges · Works · casks · ships (THE KEYSTONE)

The 8 slots are a churning, composable commons. Each slot has up to two layers: a **slot tile**
(an owned Privilege or Building) and an **occupant** (a cask, or a ship holding casks). A slot
reads *(bottom → top)*: **`[tile?] + [ship (+ its casks) | cask]`**.

> **Half your line evolves.** A line’s two stations are fixed printed faces; its two slots are
> the half that **grows over the game** — and (new) several works print an **action** on their
> slot’s stop, so authored lines are strictly richer. Buildings loosen what the stations tighten.

### 5a. Three tile types, three colours
- a **PRIVILEGE** (bright **blue**) — owner-only value on the slots (§5b);
- a **BUILDING / work** (**green**) — serves-any-dock transform on the slots;
- a **SPECIALIST** (**purple**) — private, on your player board (§8).

**Tiles always come from the face-up display and are placed the moment gained** (no hand): buy
at the Market, earn free at **London** (owner’s choice, when gained), or via the **Gain 1
building** cask action. The display refills from the deck.

**OVERBUILD — the ground rent.** Placing onto a slot that already has a tile costs the builder
**`1 G` ⚙** (self, rival, or neutral alike; can’t pay → occupied slots aren’t legal targets).
The displaced tile **FLIPS face-down into an open Floor slot of its owner’s** (v3.1: it seats in
the one row — no open seatable slot → the tile is **returned to the box**): a flipped tile is a
**Wild stop on their Floor** and **scores NOTHING at game end** (v3.0-A [ruled] — a flip is engine, never score). Neutral tiles are
discarded. The 8 slots never lock; the churn has a price.

### 5b. Privileges — the ONE-READ die (v3.0-A)
> **A Privilege pays its owner; a Building serves the wharf.** No payments between players.

A Privilege prints its payout in plain sight: **+N★ for the owner’s departing cask.** The
cask’s **tally die** is the carrier — when the **owner’s cask departs that slot** (loaded,
chartered, enshrined), **turn the die to N**; the pips ARE the ★ banked at delivery. One read,
nothing recalculated, no premium arithmetic, no sail-time bump, no cap rule (no tile prints
above +6★). Conditions are printed on the tile and read at departure. **v3.4: a kontor-bound
die never departs below 1** — a bare slot (or a rival’s privilege, which pays its owner
nothing) sends the die at its floor of 1, the old flat kontor base. A Hall-bound die parks as
the spent marker (the Reliquary turns it to 2; otherwise its face doesn’t score — the coins and
launch are the Hall’s printed payout).

| Privilege | Printed bonus ⚙ | Qty ⚙ |
|---|---|---|
| Staple Hall | **+3★** (any kontor) | 2 |
| Burgomaster’s Favor | **+★ = the cask’s quality** | 2 |
| Connoisseur’s Cellar | **+4★**, Q4+ casks only (v3.1 ⚙ 5→4) | 1 |
| London Steelyard / Bergen Bryggen / Novgorod Peterhof | **+4★**, to the printed kontor only | 1 each |
| Bruges Hanzehuis | **+3★**, Bruges only (v3.1 ⚙ 4→3 — Bruges is the Q1 port; its charter pays less, or the 1G Gruit becomes the best cask in the game) | 1 |
| The Hanse Diet | **+2★**, and place 1 presence at the destination | 1 |
| Almoner’s Stall | **+3★** if no presence there | 1 |
| Reliquary | **+2★** when enshrined | 1 |
| Salt House *(exp)* | no ★ — the owner gains +1G +1H at departure | 1 |

*(The quality climb is paid where quality is READ, not computed: Novgorod’s printed scale, the
Hall’s shelf gates, the Connoisseur/Burgomaster tiles. The v1.8 +2/+3 premium formula is
retired.)*

### 5c. Works — serve any dock; some print an ACTION
| Work | Effect ⚙ | Qty ⚙ |
|---|---|---|
| Malt Kiln | a cask from here ships +1 quality (cap Q5) | 2 |
| Hop Yard | a Q2+ cask from here ships +1 quality | 1 |
| Cooperage | a ship here carries +1 cask | 2 |
| Customs House | a ship here boards casks one gate lower | 2 |
| Brewmaster’s Workshop | a cask docked here acts as Wild while it stays | 1 |
| **Rich Berth′** (redesign) | a hull docked here may **sail one berth short** (min 1) | 2 |
| **Pilot’s House** (new) | when a hull sails from here, the sailer may **re-destination** it to a kontor within one gate step (every cask aboard must meet the new gate) | 1 |
| **Open Staithe** (new) | an **un-Ready** cask may deploy here; +1 maturation on its owner’s turn | 1 |
| **Rope Walk** (new) | its slot’s stop (no occupant): **gain 1 charter contract** | 1 |
| **Grain Exchange** (new) | its slot’s stop (no occupant): **convert up to 2 goods** G↔H | 1 |
| **Mission Quay** (new) | its slot’s stop (no occupant): **age one of your vessel casks +1** | 1 |
| Smoke Kiln / Parti-Gyle Tun *(exp)* | as printed | 1+1 |

**Cut:** the Gauger’s Office (confirmed dud) and the Festkeller (never scored). Base deck = **27
tiles** (12 privileges + 15 works, per the qty columns) ⚙ · Wharf display of 4 · 2 neutral green
works seeded at setup.

### 5d. One-fire rule (kept)
When a line fires, the active player **may** use each of its stops once — the slot’s local stop
(§2) and any building effect — resolving on the active player’s turn. No out-of-turn gains.

---

## 6. Ships · Dispatch (the cash-out)

- **Ships** are neutral, destination-bound hulls (Cog 2 / Hulk 3) off a shuffled deck; a face-up
  **market of 3**. **Commission** (`2 G`) places one on an **open slot + the free load**, or
  **onto a slot whose cask qualifies for the hull’s port** — the pickup consumes the free load
  (§4A). *The squeeze this prints: a wharf of parked Q1 Gruit walls every higher-gate hull off
  the ring (Bruges still boards Q1) — the answer is over-deploying better beer, which sours the
  squatters (§3).* Load deployed casks aboard; a ship
  **sails the moment it is full** → every cask **delivers** (§7), value + majority presence
  sealing **on delivery** in load order. **The hull is the carrier component (v3.4b — ALL
  berths):** the tile is nothing but full-width berth wells, **filled BOTTOM → TOP**; each seats
  the loaded cask TILE itself (its tally die on the tile’s printed seat, any +1Q marker beside
  it). The **TOP berth is the TRIGGER** — it prints the hull’s whole identity (the PORT name ·
  quality gate · commission cost; the hull speaks by its size), needed only while the ship
  loads: **the last cask covers it, and the ship SAILS at once.** The hull returns to the deck; the voyage **advances the clock**.
- **Dispatch — kontor route** (the old Charter): a **contract** + flat `2 G` fare → one of your
  **deployed** Ready casks (the Quaymaster also reaches your vessels) sails alone to a kontor.
  Ticks the Sailed-Ships track.
- **Dispatch — Hall route** (the old Enshrine): free, no boat — a deployed **Q2+** cask is
  presented at the **Three Coins board** (§7b). Deploy-first keeps it contestable — *the Hall
  demands a public showing.* Never ticks the ships track (the tally die it parks is its
  clock).

---

## 7. Destinations & delivery value

| Destination | Gate ⚙ | Value ⚙ (v3.4) | Benefit on delivery ⚙ | Majority (1/2/3) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | the die (≥1) | 2 goods (owner’s choice) | 4 / 2 / 0 |
| **London** (Steelyard) | Q2 | the die (≥1) | a **Privilege/Building** (placed at once) **OR** a **Specialist**, free | 5 / 3 / 1 |
| **Bergen** (Bryggen) | Q2 | the die (≥1) | **free Reach** (+1 presence at a kontor you’ve delivered to) | 9 / 5 / 2 (anchor) |
| **Novgorod** (Peterhof) | Q3 | the die + printed scale: Q3→2 · Q4→4 · Q5→6 | **refine** (a maturing cask +1 age) | 8 / 5 / 2 |
| **The Hall** | Q2 | **ONE coin — FAME ★ 5/7/10/13 ⚙, or a CRAFT/FAVOR power (0★)** — or launch for ★ = quality | — (§7b) | — |

**Delivery = the tally die the cask carries (+ Novgorod’s printed scale).** The die was turned
once, at departure — to the Privilege’s one printed number, or left at its **floor of 1** from a
bare slot (§5b) — nothing else ever touches it. **Every kontor pays at least 1★ per cask** (the
die guarantees it); a quality lift (kiln, Duckstein) counts for gates AND points; a below-gate
cask admitted by the Customs House sells at the die’s 1.

**Benefits resolve WHEN GAINED, owner’s choice** — whoever’s turn it is (a rival tops off a hull
carrying your cask → you choose your benefit right then). No queues, nothing to remember.

> **Presence is standing earned by trade — and the discs are the clock (v3.2).** A **Reach**
> (the cask action, Bergen’s benefit) adds presence **only at a kontor you’ve already delivered
> to**, and it **spends a disc from your pool of 14** like any delivery — no discs left, no
> Reach. The pool is the printed wall: bonus presence can never outrun the supply.

## 7b. The Hall — the Guild’s Three Coins (v3.2)

The Hall is a printed board of **four quality-gated shelves**; each shelf prints **three
COINS — FAME ★ · CRAFT · FAVOR — and each coin is claimable ONCE per game** (mark it with your
cask cube; 12 coins on the board, ever). An enshrined cask buys **exactly one coin** — the
points and the powers are unbundled; a cask never takes both:

| Shelf | Gate | FAME ⚙ | CRAFT (a power, now — 0★) ⚙ | FAVOR (a thing, free — 0★) ⚙ |
|---|---|---|---|---|
| **The High Board** | Q5 | **13★** | the Lagerkeeper’s Miracle — age ALL your casks to Ready | a Building (placed) or a Specialist, free |
| **The Masters’ Shelf** | Q4 | **10★** | the Stevedore’s Shift — load 2 casks, free | **the Masters’ passage — a free kontor delivery, NOW** (no contract, no fare; it is a voyage: it ticks the ships track and spends its own disc) |
| **The Long Shelf** | Q3 | **7★** | the Double Gyle — brew twice, now | gain **2 recipes**, free |
| **The Common Shelf** | Q2 | **5★** | the Guild’s Batch — +1G +1H & brew one, now | **+4 goods** |

**Enshrining (a Hall Dispatch, or the Q4+ cask action):** present a deployed cask whose
**effective quality meets the shelf’s gate** (a Bock may buy a lower shelf’s coin — reach digs
down, never up), take the **one coin**, cube it. A FAME coin banks the printed ★ (+ the
Reliquary’s die if dispatched from it); a CRAFT/FAVOR coin banks **0★** — the cask bought the
power. The cask retires to the box.

**The launch — never nothing, always open:** with or without coins left, a cask may instead
**launch** for **★ = its quality** (no coin) — **place one of your cask cubes in its quality
shelf’s LAUNCH ROW** (the 4th printed zone; the public record of the Hall’s traffic). Once the
coins you covet are gone, the Hall remains the volume outlet at a fair, flat rate.

**No tick, but a die:** the Hall never advances the Sailed-Ships track — but every enshrine
and every launch is a delivery, and **parks a tally die** (§10). *(Guardrail ⚙: the Common
Shelf stays goods/tempo only — never engine pieces.)*

---

## 8. The player board (private engine) — ONE Floor row (v3.1 “One Row” · v3.2d: the Flight lives on your recipe cards)

Your player board is **a single Floor line of 7 printed slots ⚙** — nothing else prints on it.
Your recipe cards sit beside it; **flipped (BREWED) cards are the Flight record**. Every private
thing you own competes for the same row:

- **A slot holds ONE of:** a **maturing/Ready cask** (the slot is a vessel) · a **seated
  Specialist tile** · a **flipped tile** (face-down, a Floor Wild). Tiles are permanent once
  seated; a cask frees its slot when it deploys.
- **Slots 1–2 open at start ⚙; covers on 3–7.** **SLOT 1 IS PRINTED VESSEL-ONLY** — Specialists
  and flips may never take your **last** brewing slot (you cannot build yourself out of beer):
  a tile may only seat while at least one other vessel-capable slot remains.
- **Opening covers:** each **new distinct beer you BREW** (from the 2nd on — your flipped
  recipe cards are the record) opens the next cover **automatically**; the **Coppersmith** Specialist opens one
  too. *(The Flight is the forcing mechanism: seat an upgrade early and you brew one-at-a-time
  until your next new beer opens the room.)*
- **THE FLIGHT ON THE CARDS (v3.2d)** — recipe cards are **double-sided**: flip a card to its
  **BREWED** face (the big check) the first time you brew that beer. The flipped cards are the
  unlock currency AND the scoring record — the Flight ladder (§11) counts distinct beers
  **BREWED** ⚙. *(One record, carried by the card in front of you — no strip, no memory.)*

**THE FLOOR — stay home to work it.** Choosing the Floor instead of moving (§2) is a whole turn
on your board, any order, all optional:
1. **AGE 3 points ⚙** across your vessels (the Floor adopts the Cellar’s signature; the
   **Lagerkeeper** Specialist adds +2 to this pool);
2. **every vessel cask’s printed action** (the cask stays — holding casks powers the house);
3. **one Wild per flipped tile** in the row.

*The positional price is the tension: a Floor turn is a turn not spent on the wharf — and every
seated tile is a vessel you don’t have.*

**The SPECIALISTS (7 designs · scarce deck of n−1 copies each · display of 4 at the Cellar):**
**Coppersmith** (**+1 Floor slot** — opens the next cover, seats no tile, `3 G` — the paid
shortcut past the unlock track), **Cellarman** (maturation −1 step, `4 G`), **Grain Factor**
(+1 extra grain, `3 G`), **Hop Gardener** (+1 extra hops, `4 G`), **Stevedore** (your Harbor
Load sets out 2 casks, `3 G`), **Lagerkeeper** (**+2 to your Floor’s Age pool**, `2 G`), and
**Quaymaster** (Load/Dispatch straight from your vessels, `3 G` — the deploy-first exception).
A player never owns two of a type. **Each seated Specialist occupies a Floor slot** (the
Coppersmith excepted — it is pure capacity).

**The CASK ACTIONS — nine specific gains** (steerable piles unchanged: the top of each quality
pile is face-up; Gruit pinned):

| Action | Effect | Pile gate ⚙ |
|---|---|---|
| **Gain 2 goods** | any mix | Q1 (Gruit pin) · Q2+ |
| **Age a cask +2** | one vessel cask | Q2+ |
| **Load 1 cask** | onto any eligible hull, free | Q2+ |
| **Place 1 presence** | at a kontor you’ve delivered to | Q2+ |
| **Gain 1 recipe** | a dealt-export recipe card, **free** ⚙ | Q2+ |
| **Gain 1 building** | from the Wharf display, placed at once (rent applies) | Q3+ |
| **Gain 1 specialist** | from the Cellar display, free | Q3+ |
| **Brew 1 cask** | pay its cost into an open vessel | Q4+ |
| **Enshrine 1 cask** | dispatch one deployed Q2+ cask to the Hall (ticks the clock) | Q4+ |

**Cut:** Convert (→ the Grain Exchange work) · pool-Wild (Wild survives only as the Workshop’s
dock effect and the flipped tiles’ Floor stops).

---

## 9. Goods & storage

`G` grain · `H` hops — the **only** currency. Storage cap **8** ⚙. No money; no spendable
prestige.

---

## 10. End of the game (the DUAL clock, v3.2)

Two public clocks run side by side; **the first to fire ends the game** (finish the round →
score):

1. **The Sailed-Ships track** — advances by one on every **voyage**: a ship sailing full or a
   kontor Dispatch (charter, including the Masters’ passage). **Enshrines never tick.** Length
   **5 / 8 / 10** for 2/3/4p ⚙ (v3.2 retune — the track lost the enshrine ticks; +2 with The
   Trade Roads).
2. **The presence clock — the tally dice (v3.4)** — each house owns **14 player-colour d6 ⚙,
   in public view**. A die leaves your **tray** when a cask deploys (it rides the cask, then the
   berth), and **parks at the destination on delivery** — every delivered cask (kontor or Hall)
   and every presence bump (Reach, Keut, honors) parks one. The player who places their **last**
   die sets the final round. **No die in the tray → no deploy, no vessel-direct load, no
   Reach** (Tap-outs, sourings and displacements return dice to the tray). *The tension is the
   point: fight for kontor majorities die by die, or bank guaranteed ★ — the same 14 dice pay
   for both, and everyone can count yours: tray + at sea + parked.*

A **MAX_ROUND ceiling** (~25 ⚙) backstops a slow table. Pace target **~12–25 rounds.**

---

## 11. Scoring — the clear spine

**In-game (banked as you play):**
1. **The Hall — the Three Coins.** A FAME coin banked its shelf’s **★ (5/7/10/13 ⚙)**; a
   CRAFT/FAVOR coin banked its power instead; a launch banked **★ = quality** (§7b). *The
   prestige lane — visible, claimable once, and hot early: the best coins go to the quick.*
2. **Kontore — the die.** Each delivered cask scores **the tally die it carries (+ Novgorod’s
   printed scale)** (§7) — never less than 1★, the die’s own floor. *The volume/demand lane —
   author privileges, route your brews through them.*

**End-game:**
3. **Majorities** — at each kontor, by **delivered-cask count** (presence), tiered (Bruges 4/2/0
   · London 5/3/1 · Novgorod 8/5/2 · Bergen 9/5/2 ⚙; 2p skips 2nd; ties split).
4. **The Flight** — distinct **beers BREWED** (your flipped recipe cards ⚙ v3.2d):
   **(beers−1)², min 3** (3→4 · 4→9 · 5→16 ·
   6→25 with the Jopenbier capstone). *Brewing them also unlocked your Floor along the way (§8).*

*(The floor/developer points lane is **gone** — seated flips score nothing; they are engine. A displaced tile that finds **no open Floor slot** is simply discarded.)*

5. **Tiebreak:** the combined quality of your deployed casks on slots, then most goods.

> **The legible fork:** the **Hall shelves** are the visible prestige race; the **kontore**
> offer **demand** (in-game, authored) or **majorities** (end-game, counted). The Flight rewards
> breadth twice — as engine (unlocks) and as score. A new player picks one; an expert braids two.

---

## 12. Expansions (opt-in toggles)

*Three independent **New Game toggles**, mixable freely, on a shared **expansion spine**. Base
game byte-for-byte unchanged when all off.*

### Specialty Beers

ON → three specialty beers join the export draft (**deal 3 of 7**, ≥1 base Q4+ guaranteed). Each
is **pinned** (its action printed, like Gruit) and carries **one always-on signature**:

| Beer (town) | Q · ready · brew ⚙ | Pinned action | Signature ⚙ |
|---|---|---|---|
| **Gose** (Goslar) | Q2 · 1 · `2G` | Gain 2 goods | **Salt Trade** — a kontor delivery throws off +1G +1H to the owner |
| **Zerbster** (Zerbst) | Q3 · 1 · `3H` | Load 1 cask | **Parti-Gyle** — brewing it also fills an open vessel with a free small Gruit |
| **Duckstein** (Königslutter) | Q2 · 2 · `1G 1H` | Place 1 presence | **Smoke-Hardy** — ships & scores as +1 quality |

Recipe buys ⚙: Gose `1 G` · Zerbster `1 H` · Duckstein `1 G`.

**Also adds:** **Blending** — a Cellar or-branch: combine two Ready vessel casks → one premium
cask at +1 quality (the higher +1, cap Q5), in a freed vessel. And **three thematic tiles** in
the deck: **Salt House** (privilege — goods, no die) · **Smoke Kiln** (work — +1 quality) ·
**Parti-Gyle Tun** (work — a free small Gruit on deploy).

### Capstone — Jopenbier (a second, independent toggle)

The **vintage super-beer** (Danzig): **Q6** (display), slow (ready 4), dear (`2G 4H`), always
acquirable when on. **Scored self-contained** (8★ kontor / 9★ enshrined ⚙ + the vintage bonus:
once deployed, +1★ per your turn on the dock, cap +5 — contestable the whole time). Pinned to
*Gain 2 goods*, so the long maturation funds itself on the Floor. **Counts for the Flight**
(6 types → the 6-beer flight pays 25) and grants a Flight unlock when brewed. At the Hall it
takes any shelf (its quality outranks every gate); its ★ stay self-contained.

### The Trade Roads — Staple Rights (Overland, the third toggle)

The heaviest module — **REPLACES the kontor majorities** (they turn OFF; the control contest
moves inland). An inland network rooted at **Hamburg**: West through the **Bruges gateway** to
London/Bergen/the Rhineland; East the deep haul to Novgorod/Pskov. **No new station — it rides
the Harbor’s voyages:** each sail/kontor-Dispatch advances each owner aboard **one node** along
that kontor’s route (quality gates depth); each cask aboard then **claims a Staple-Right slot**
at the node (node ★ + a one-shot printed bonus, in load order; never-nothing overflow). The
**Rhine Charter**: a Q4+ kontor Dispatch may skip Bruges → Cologne. Sailed-Ships **+2**.
Full node/slot tables: `COMPONENTS.md` §Overland and the in-game panel. *(Unchanged by v3.0-A
except: Frankfurt’s “free Enshrine” slot now grants a free Hall Dispatch — the Three Coins
board applies; Reach re-homes to road steps as before.)*

---

## Open / to-tune (the ⚙ shortlist)

1. **Market V1** — fold the Specialist buy into ACQUIRE, thinning the Cellar? (paper table)
2. **Or/and defaults per station** — the ≤2-printed-actions cap is the rule; whether Harbor may
   do both Load AND Dispatch in one visit is a table dial (engine default: one choice).
3. **The carrier** — die = bonus-only d6 (current) vs die = total; manifest row vs tuck.
4. **The climb’s payout** — with the premium formula retired, does Q4/Q5 still pay enough
   through Novgorod/the Hall/Connoisseur/Burgomaster? (first PATHWAYS read)
5. **Floor churn** — buildings gained from Floor turns/game (the survey-loop watch).
6. **The Flight double-pay** — unlocks AND points; trim the ladder if breadth double-pays.
7. **Enshrine-as-cask-action** (Q4+) — a free line-fired enshrine (no tick) — watch its tempo.
8. **The coin race** — 12 one-shot coins at every count: is the Hall hot enough early at 2p,
   and does the launch rate (★ = quality) hold up as the late-game floor? The Common Shelf
   stays goods-only.
9. **Ship-channel guarantee** — commissioning onto building-only slots (open).
10. **The dual clock** — `SAILED_CAP` 5/8/10 vs the 14-disc pool: the corpus splits its endings
    between the two triggers (by design); watch which one the table actually races, and the
    ceiling share, once human pace data lands.
