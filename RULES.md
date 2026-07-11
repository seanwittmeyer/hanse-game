# Brewhouses of the Hanse — Turn & Round Rules (v3.0-A “Path A”)

> **Status: live (2026-07-11).** This is the canonical rulebook for the **v3.0-A “Path A”
> keystone rebuild** — the follow-through of the 2026-07-11 playtest + fresh-eyes exploration,
> designer-ruled in `V3-PATH-A.md`. Numbers are placeholders ⚙. **The live, playable build is
> `play.html` (KEY `hanse-v3a-v1`).** The prior live build (v2.9.1 “Graded at the Gauge”, KEY
> v94) is archived, playable, at **`archive/v2.9/`**; the v0.16.1 build at `archive/play.html`.
>
> **The eight moves of Path A:**
> 1. **Stations compress to ≤2 printed actions** — each station is a this-or-that face.
> 2. **Slot locality** — a slot’s stop acts **on that slot**; only the stations reach the wharf.
> 3. **Over-deploy** — deploy onto your own lower cask (it is **tapped on the way out**) or onto
>    anyone’s Q1 (it has **soured** — boxed). Tap-the-menu is retired.
> 4. **One-read dice** — a Privilege prints **ONE die number**; the die is set to it at
>    departure. The premium/cap/sail-bump arithmetic is deleted.
> 5. **The Hall is a shelf board** — quality-gated shelves, row ★ 3/5/7/9, one printed bonus per
>    space, claimed with your cube.
> 6. **The Floor is stay-home** — a whole turn on your player board (Age pool + every vessel
>    cask’s action + flip Wilds); flipped tiles score **nothing**.
> 7. **The Flight is (also) an unlock track** — each distinct beer you **brew** (from the 2nd)
>    unlocks a Floor slot; distinct beers **delivered** still score the ladder.
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
- **The floor-points lane is gone** (flips score 0) — a flip is engine, never score.
- **Enshrine + Charter become one Harbor gesture: DISPATCH** (one deployed cask → the Hall,
  free, or a kontor, contract + fare).

---

## 1. Setup (symmetric)

Each house starts with (⚙):
- **3 `G` (grain), 2 `H` (hops)** — equal for every seat. Storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipes (the symmetric on-ramp). More recipes at the Market.
- A **player board** (§8) with printed slot rows under **unlock covers**: **2 open vessel slots**
  (of 4 printed), **2 open Specialist slots** (of 4 printed), a **flip shelf of 2**, and the
  **Flight/unlock strip** (one space per beer type this game).
- **2 charter contracts** (the kontor-Dispatch certificates; buy more at the Market — §6).
- A **warm start** so the Wharf is live turn 1: a guaranteed **Hulk → Bruges** + one more ship
  dealt onto slots (spread across lines); **two NEUTRAL green Buildings** dealt from the deck
  onto open slots (they serve any dock; no owner — overbuilding one still costs the ground rent,
  pays nobody, and the tile is discarded; a Privilege is personal and is never dealt neutral);
  **one Ready Gruit** per house.

Shared board: the **Wharf** (4 stations + 8 slots) with the warm-start ships; the four kontore
(Bruges/London/Bergen/Novgorod) + the **Hall shelf board** (§7b) all open; **deal 3 of the 4
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
> - **You can’t brew everything** — 2 vessels (unlocks to 4), the recipe ladder, and time.
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
- a **ship commission** (`2 G` ⚙ — place a face-up hull on an open slot **or onto a slot whose
  cask can board it** (dockside pickup — the cask loads at once; a rival’s follows the
  rival-loading rules) + a free load: ANY player’s deployed cask or a Ready cask straight from
  YOUR vessels — §6);
- a **charter contract** (`1 G` ⚙ — §6).

### B · Brewhouse — **BREW or DEPLOY**
**Brew:** load one recipe you hold (paying its `G/H`) into an **open vessel** → a young cask at
step 0. It takes the **face-up top action of that quality’s pile** — every pile top is visible,
so you brew toward the action you want (steerable variance). Gruit is pinned to *Gain 2 goods*.
**Brewing a beer type for the first time marks your Flight strip — from the 2nd distinct beer
on, each new mark grants a FLOOR-SLOT UNLOCK (§8).**
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
from the face-up display (pay its goods cost) into an open Specialist slot on your player board
(§8 — the row is unlockable; full → no buy). *(With the Specialty Beers toggle, **Blend** is a
third or-branch — §12.)* One choice per visit. **Tap is retired** (§3).

### C · Harbor — **LOAD or DISPATCH**
**Load:** one deployed cask (yours or a rival’s) onto a ship it qualifies for — you choose the
hull; loading a rival’s cask: you take **1 `G`**, the owner scores it on delivery. Ships **sail
only when full**. **Or Dispatch:** send **ONE deployed cask** of yours on its own —
- **to the HALL** (free, no boat): claim a shelf space — §7b; or
- **to a KONTOR** (spend a **charter contract** + the flat **2 `G` fare** ⚙): an immediate
  single-cask voyage — the deadlock relief valve.

Both Dispatch routes **advance the clock** (§10).

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
The displaced tile **FLIPS face-down onto its owner’s flip shelf** (max **2** ⚙ — full → the
tile is **returned to the box**): a flipped tile is a **Wild stop on their Floor** and **scores
NOTHING at game end** (v3.0-A [ruled] — a flip is engine, never score). Neutral tiles are
discarded. The 8 slots never lock; the churn has a price.

### 5b. Privileges — the ONE-READ die (v3.0-A)
> **A Privilege pays its owner; a Building serves the wharf.** No payments between players.

A Privilege prints **ONE die number**. When the **owner’s cask departs that slot** (loaded,
chartered, enshrined), its **demand die is SET to that printed number** — one read, nothing
recalculated, no premium arithmetic, no sail-time bump, no cap rule (no tile prints above 6).
Conditions are printed on the tile and read at departure. A rival’s cargo docking there passes
through and banks nothing.

| Privilege | Printed die ⚙ | Qty ⚙ |
|---|---|---|
| Staple Hall | **3** (any kontor) | 2 |
| Burgomaster’s Favor | **= the cask’s quality** (count the pips, max 5) | 2 |
| Connoisseur’s Cellar | **5**, Q4+ casks only | 1 |
| Bruges Hanzehuis / London Steelyard / Bergen Bryggen / Novgorod Peterhof | **4**, to the printed kontor only | 1 each |
| The Hanse Diet | **2** + place 1 presence at the destination | 1 |
| Almoner’s Stall | **3** if you have no presence at the destination yet | 1 |
| Reliquary | **2**, on a Hall dispatch from here | 1 |
| Salt House *(exp)* | no die — owner gains +1G +1H at departure | 1 |

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
  **market of 3**. **Commission** (`2 G`) places one on an open slot — or onto a boardable
  cask’s slot (dockside pickup) — + the free load (§4A). Load deployed casks aboard; a ship
  **sails the moment it is full** → every cask **delivers** (§7), value + majority presence
  sealing **on delivery** in load order. **The hull is the carrier component:** each berth well
  holds the owner’s **cask cube** + the cask’s **demand die** (if set) + any **+1Q marker**; the
  hull prints its destination, gate, and berth numbers. The hull returns to the deck; the voyage
  **advances the clock**.
- **Dispatch — kontor route** (the old Charter): a **contract** + flat `2 G` fare → one of your
  **deployed** Ready casks (the Quaymaster also reaches your vessels) sails alone to a kontor.
  Advances the clock.
- **Dispatch — Hall route** (the old Enshrine): free, no boat — a deployed **Q2+** cask is
  presented at the **Hall shelf board** (§7b). Deploy-first keeps it contestable — *the Hall
  demands a public showing.* Advances the clock.

---

## 7. Destinations & delivery value

| Destination | Gate ⚙ | Value ⚙ | Benefit on delivery ⚙ | Majority (1/2/3) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | +1 ★ | 2 goods (owner’s choice) | 4 / 2 / 0 |
| **London** (Steelyard) | Q2 | +1 ★ | a **Privilege/Building** (placed at once) **OR** a **Specialist**, free | 5 / 3 / 1 |
| **Bergen** (Bryggen) | Q2 | +1 ★ | **free Reach** (+1 presence at a kontor you’ve delivered to) | 9 / 5 / 2 (anchor) |
| **Novgorod** (Peterhof) | Q3 | scales: Q3→2 · Q4→4 · Q5→6 · floor 1 | **refine** (a maturing cask +1 age) | 8 / 5 / 2 |
| **The Hall** | Q2 | **shelf row ★ 3/5/7/9** + the space’s honor | — (§7b) | — |

**Delivery = the destination’s printed value + the demand die in the berth.** The die was set
once, at departure, to the Privilege’s one printed number (§5b) — nothing else ever touches it.
**Every kontor pays at least 1★ per cask**; a quality lift (kiln, Duckstein) counts for gates
AND points; only a below-gate cask admitted by the Customs House sells at the 1★ floor.

**Benefits resolve WHEN GAINED, owner’s choice** — whoever’s turn it is (a rival tops off a hull
carrying your cask → you choose your benefit right then). No queues, nothing to remember.

> **Presence is standing earned by trade.** A **Reach** (the cask action, Bergen’s benefit) adds
> presence **only at a kontor you’ve already delivered to** — and bonus presence can never push
> a kontor’s total past the printed disc supply (**12** ⚙ per kontor; deliveries always count).

## 7b. The Hall — the shelf board (v3.0-A)

The Hall is a printed board of **four quality-gated shelves**; each shelf prints its **row ★**
and a row of **bonus spaces** (active spaces scale ≈ n+1 with player count ⚙, bounded by the
printed row):

| Shelf | Gate | Row ★ ⚙ | Space honors (one icon each) ⚙ |
|---|---|---|---|
| **The High Board** | Q5 | **9** | unlock 1 Floor slot · +3★ · gain 1 Building (free, placed) |
| **The Masters’ Shelf** | Q4 | **7** | gain 1 Specialist (free) · place 2 presence · age ALL vessels +1 |
| **The Long Shelf** | Q3 | **5** | place 1 presence · gain 1 recipe (free) · +3 goods · age a cask +2 |
| **The Common Shelf** | Q2 | **3** | +2 goods · +1 contract · age a cask +2 · +1G +1H · +2 goods |

**Enshrining (a Hall Dispatch, or the Q4+ cask action):** choose any **OPEN space on a shelf
whose gate your cask’s effective quality meets** — a Bock may take a Common-Shelf space for its
honor instead of the High Board’s glory. Bank the **row ★** (+ the Reliquary’s die if dispatched
from it), take the **space’s one honor**, and **mark the space with your cube** — the trophy and
the record. The cask retires to the box.

**Never nothing:** if every shelf you qualify for is full, enshrine anyway for the **best
qualifying row’s ★** — no honor, no cube. The Hall stays the always-open outlet; only the honors
are scarce. *(Guardrail ⚙: the Common Shelf stays goods/tempo only — never engine pieces.)*

---

## 8. The player board (private engine) — the Floor · vessels · Specialists · the Flight strip

Your player board carries the **slot rows** (printed, under unlock covers), the **flip shelf**,
and the **Flight/unlock strip**:

- **VESSEL row** — start **2 open of 4 printed** ⚙. A vessel holds one maturing/Ready cask.
- **SPECIALIST row** — start **2 open of 4 printed** ⚙. Bought at the Cellar (Upgrade), hired
  via the **Gain 1 specialist** cask action, or London’s benefit.
- **FLIP SHELF** — **2 spaces**, never grows. Displaced slot tiles land here face-down (§5a);
  each is a Wild stop on your Floor; **they score nothing**.
- **THE FLIGHT/UNLOCK STRIP** — one space per beer type this game (5 base; 6 with Jopenbier).
  Mark a beer when you **first BREW it**; from your **2nd distinct beer on, each new mark grants
  ONE UNLOCK: remove a cover from the vessel row or the Specialist row, your choice.** Distinct
  beers **DELIVERED** still score the Flight ladder (§11) — one strip, two mark states.

**THE FLOOR — stay home to work it (v3.0-A).** Choosing the Floor instead of moving (§2) is a
whole turn on your board, any order, all optional:
1. **AGE 3 points ⚙** across your vessels (the Floor adopts the Cellar’s signature; the
   **Lagerkeeper** Specialist adds +2 to this pool);
2. **every vessel cask’s printed action** (the cask stays — holding casks powers the house);
3. **one Wild per flipped tile** (max 2).

*The positional price is the tension: a Floor turn is a turn not spent on the wharf.*

**The SPECIALISTS (7 designs · scarce deck of n−1 copies each · display of 4 at the Cellar):**
**Coppersmith** (+1 vessel slot **directly**, `3 G` — the paid shortcut past the unlock track),
**Cellarman** (maturation −1 step, `4 G`), **Grain Factor** (+1 extra grain, `3 G`),
**Hop Gardener** (+1 extra hops, `4 G`), **Stevedore** (your Harbor Load sets out 2 casks,
`3 G`), **Lagerkeeper** (**+2 to your Floor’s Age pool**, `2 G` — v3.0-A rework), and
**Quaymaster** (Load/Dispatch straight from your vessels, `3 G` — the deploy-first exception).
A player never owns two of a type.

**The CASK ACTIONS — nine specific gains** (steerable piles unchanged: the top of each quality
pile is face-up; Gruit pinned):

| Action | Effect | Pile gate ⚙ |
|---|---|---|
| **Gain 2 goods** | any mix | Q1 (Gruit pin) · Q2+ |
| **Age a cask +2** | one vessel cask | Q2+ |
| **Load 1 cask** | onto any eligible hull, free | Q2+ |
| **Place 1 presence** | at a kontor you’ve delivered to | Q2+ |
| **Gain 1 recipe** | a dealt-export recipe card at its buy cost **−1G** ⚙ | Q2+ |
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

## 10. End of the game (the clock)

The shared **Sailed-Ships track** advances by one on every **dispatch** — a ship sailing full, a
kontor Dispatch (charter), or a Hall Dispatch (enshrine). When it fills → **finish the round →
score.** Length **6 / 10 / 13** for 2/3/4p ⚙ (+2 with The Trade Roads); a **MAX_ROUND ceiling**
(~25 ⚙) backstops a slow table. Pace target **~12–25 rounds.**

---

## 11. Scoring — the clear spine

**In-game (banked as you play):**
1. **The Hall — shelf rows.** Each enshrined cask banks its shelf’s **row ★ (3/5/7/9)** + took
   its space’s honor when placed (§7b). *The prestige lane — visible, claimable, always open.*
2. **Kontore — value + die.** Each delivered cask scores **its destination’s printed value +
   the one demand die** (§7) — never less than 1★. *The volume/demand lane — author privileges,
   route your brews through them.*

**End-game:**
3. **Majorities** — at each kontor, by **delivered-cask count** (presence), tiered (Bruges 4/2/0
   · London 5/3/1 · Novgorod 8/5/2 · Bergen 9/5/2 ⚙; 2p skips 2nd; ties split).
4. **The Flight** — distinct **beers delivered**: **(beers−1)², min 3** (3→4 · 4→9 · 5→16 ·
   6→25 with the Jopenbier capstone). *Brewing them also unlocked your Floor along the way (§8).*

*(The floor/developer points lane is **gone** — flipped tiles score nothing; they are engine.)*

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
except: Frankfurt’s “free Enshrine” slot now grants a free Hall Dispatch — the shelf board
applies; Reach re-homes to road steps as before.)*

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
7. **Enshrine-as-cask-action** (Q4+) — does a line-fired clock tick feel right?
8. **Hall shelf counts** — n+1 active spaces; the pole test (does contesting honors negate late
   enshrines?); the Common Shelf stays goods-only.
9. **Ship-channel guarantee** — commissioning onto building-only slots (open).
10. **Clock lengths** — the greedy-bot corpus runs ceiling-heavy at 3–4p ⚙; watch `SAILED_CAP`
    once human/table pace data lands.
