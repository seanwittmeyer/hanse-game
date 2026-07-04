# Brewhouses of the Hanse — Turn & Round Rules (v2.6 “Dockside Pickup”)

> **Status: live (2026-07-04).** This is the canonical rulebook for the *living, composable Wharf
> slots + dead-simple scoring* direction (`PLAN.md`). Numbers are placeholders ⚙. **The live,
> playable build is `play.html` (v2.6 “Dockside Pickup” — Commission may place the hull onto a slot
> whose cask can board it; on v2.5 “Warm Wharf” (2 neutral starting Buildings; greyed-not-hidden
> actions) and v2.4.1 “Three Tiles” — the tile-taxonomy + Floor-lane pass: three
> colour-coded tile types — **PRIVILEGE** (blue, pays its owner only) · **BUILDING** (green, serves
> everyone) · **SPECIALIST** (purple, private, on your brewery board) — London pays a
> Privilege/Building OR a Specialist, the Q3+ **Hire** cask action, and the Floor-lane re-prices; on v2.3 “Privileges & Works” — the delivery-arithmetic keystone on
> top of v2.2 “One Grammar”: value buildings are privileges (owner-only), transforms are works
> (serve any dock), wharfage and the rival-½ are retired, and delivery is always *starting value +
> the one demand die* (a real d6, max 6 — ship-slot value buildings bump the same die at the sail);
> v2.2 carries one load grammar, one gate rule, benefits-when-gained, buildings always placed from
> the display, the Floor as the standing 3rd line; the three
> opt-in expansions — **Specialty Beers** (incl. blending + 3 thematic Buildings), the **Jopenbier**
> capstone, and **The Trade Roads** (an Overland inland map of claimable Staple-Right slots that replaces the kontor majorities) —
> are §12) — these rules are implemented there.** (The prior
> v0.16.1 "The Wharf" build is archived at branch `archive/main-v0.16.1` / `archive/play.html` /
> `archive/v0.16/`.) *(An Inland Road / Option B was prototyped then rolled back — `DESIGN.md` §9; the work is on `archive/option-b-inland`.)*
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
- **Scoring is made legible** (`§11`): three in-game sources banked as you play (Hall = fixed,
  kontor = variable, developer = banked at each overbuild) and two end-game (majorities = count,
  the Flight = range). A player can name their plan on turn 1.

---

## 1. Setup (symmetric)

Each house starts with (⚙):
- **3 `G` (grain), 2 `H` (hops)** — **equal for every seat** (v1.7: seat compensation removed; P1's turn-1
  edge — choosing the line, placing + activating the warm Gruit, no toll — is balance enough, and sim showed
  the old +1 `G`/later-seat over-corrected under strong play). Storage cap 8 ⚙.
- The **Gruit** and **Hopped** recipes (the symmetric on-ramp). More recipes at the Market.
- **2 open vessels** (brewing throughput; cap 3 ⚙).
- **2 charter contracts** (the scarce relief-valve certificates; buy more at the Market — §6).
- A **warm start** so the Wharf is live turn 1: a guaranteed **Hulk → Bruges** + one more ship
  dealt onto slots (spread across lines); **two NEUTRAL green Buildings** dealt from the deck onto
  open slots (v2.5 — they serve any dock; no owner, so overbuilding one banks nothing and discards
  it; a Privilege is personal and is never dealt neutral); **one Ready Gruit** per house.
- An empty **brewery board** (vessels + recipe area — §8). *(v2.2: there is **no starting building**
  and **no buildings-in-hand** anywhere — buildings are always chosen from the display and placed on
  acquisition, §5a. The opening-asymmetry idea may return via an expanded improvements set —
  `DESIGN.md` parking lot.)*

Shared board: the **Wharf** (4 stations + 8 slots) with the warm-start ships; all **five
destinations open** (Bruges/London/Bergen/Novgorod + the Hall); **deal 3 of the 4 export beers**
(the variable quality ladder); shuffle the **Building deck** and deal a face-up **display of 4**
⚙ at the Market (refills from the deck); set the **Sailed-Ships track** to its player-scaled
length (§10). Each player places a worker on any station — **opening placement is free.** Choose
a first player (fixed all game; free opening placement is the seat balancer — v1.7 removed the +1 `G`/seat compensation).

---

## 2. The Wharf — stations & slots (the spine, kept)

```
        A ── B            A  Market   (Source)  → B  Brewhouse (Brew)
        │    │            │                        │
        C ── D            C  Harbor   (Ship)   ←  D  Cellar    (Age)

  Production order A→B→D→C = Source → Brew → Age → Ship   (move where the board is best)
  (orthogonal moves only — never the diagonal)
```

The turn (v2.2 — **three lines, one rule**):
1. **Move** your worker to an orthogonally adjacent station (mandatory from turn 2).
2. **Choose one of THREE lines**: the station's **row**, its **column**, or your **FLOOR** —
   the standing private 3rd line (the slot-action of **every cask in your vessels**, plus one
   **Wild** per flipped building — §5a). The **1 `G` occupancy toll** ⚙ (capped at what you
   hold; opening placement free) is paid only when you activate a **public** line while a rival
   shares your station — **the Floor is never tolled**. *(The v0.1 "alternate action when
   blocked," grown into the standing private line — `PLAN.md` §1B.)*
3. **Resolve** the line's stops — a public line's **slot · station · station · slot**, or the
   Floor's cask actions + Wilds — **in any order; every stop is optional.** Both stations always
   fire; the worker only gates *which lines are legal*. Base actions always work; the slots
   only *add*. **Buildings are passive modifiers** — they act on whatever is docked on them,
   never as a stop of their own (a building-only slot's stop is simply Deploy).

**A line** = its two stations + its two slots (still just 4 spaces — one or two of which may be
buildings/modifiers). **Your Floor** = your vessels + your flipped buildings, as a private line.

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
   free/anytime). **Deploy = set one Ready cask onto any slot without a ship or cask in it** (a building
   is fine — it modifies the cask, §5). **An empty slot's default action IS "Deploy"** (it shows as
   *"{building?} Deploy"*): so a line with two open slots reads *slot Deploy · station · station · slot
   Deploy*. Trigger an empty slot's Deploy (or the **Brewhouse**, which also offers Deploy) — with several
   Deploy stops you may place several casks in a turn. **You may use a cask you just placed as long as it
   isn't on the stop you spent to deploy it**: deploy onto *another* empty slot still pending on this line
   and its Deploy flips to the **cask's action stop** — you take that action this turn (you can never
   deploy-and-fire on the *same* slot's single stop). The cask is now **cargo-in-waiting**, a **public
   slot-action**, and **contestable**.
3. **Delivered** *(scored, gone)* — shipped to a destination (§6–7). Scores for its owner and
   leaves.

> **Shared supply (⚙):** casks are a shared pool, **brewed never bought**, stocked at a **minimum
> of 6 tiles per cask type** (the staples Gruit/Hopped run deeper at 16/20; the Jopenbier capstone
> also stocks 6). Counts live in the manifest (`COMPONENTS.md §5`); the digital `play.html` does
> not cap the supply.

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
- a **building** from the face-up display (`⚙ G` by tier) — **buy it and place it on a slot at
  once** (§5; v2.2: buildings are never held — every acquisition is *choose from the display →
  place now*);
- a **ship commission** (`2 G` ⚙ — place a face-up ship on an open slot **or onto a slot whose
  cask can board it** (v2.6 “dockside pickup” — the cask loads at once as a normal load; a
  rival’s follows the rival-loading rules) + free-load one of your **deployed** casks — §6);
- a **charter contract** (`1 G` ⚙ — §6).

### B · Brewhouse — *Brew (+ deploy anywhere)*
**Load** one recipe you hold (paying its `G/H`) into an **open vessel** → a young cask at step 0.
The cask takes its slot-action from the **face-up top tile of that quality's pile** — and **the
top tile of *every* quality pile is visible**, so you **see the action you'd get** and can choose
*which* quality to brew partly by it (steerable variance — agency at the kettle, no blind draw).
One load per visit; Gruit is fixed to Source. Recipes are permanent. **You may also DEPLOY** a Ready
cask onto **any** open slot here (the cask-hub's flexible placement — v1.3).

**Recipe costs** (brew cost = paid from hand into the vessel; buy cost = a Market action to add the
recipe card to your rack — Gruit/Hopped start known):

| Recipe | Quality | Brew cost | Ready | Buy (Market) |
|---|---|---|---|---|
| Gruit | Q1 | `G` | 1 | starter |
| Hopped | Q2 | `G H` | 1 | starter |
| Broyhan | Q3 | `G H H` | 1 | `1 H` |
| Keut | Q3 | `G G H` | 2 | `1 G` |
| Mumme | Q4 | `G H H H` | 3 | `2 H` |
| Bock | Q5 | `G G H H H` | 3 (2 with the Cellarman) | `1 G 1 H` |

(Specialty Beers and Jopenbier costs are given with those toggles, §12.)

### Cellar — *a flexible menu: Age · Tap · buy an Improvement (any order, chained)* (v1.4.1)
The Cellar visit is a small **menu you work through in ANY ORDER** until you choose **Done** — and the
steps **chain** (resources/casks one step produces are available to the next *in the same visit*). The menu:
- **Age** — gain **3 age points** ⚙ and allocate across your vessels (each cask also ages **+1** at the
  start of your turn). Once per visit.
- **Tap casks** (v1.3 · **v83: repeatable**) — take a Ready cask **from a vessel** *or* one of **your
  slots**, fire its slot-action **once**, then **discard** it — freeing the vessel, or **recalling** it off a
  slot (clearing the slot for a better cask). **The tapped action is the building-modified action** (v2.2 —
  e.g. a cask docked on the Brewmaster's Workshop taps a Wild; one rule: whatever fires a cask's action
  fires the modified one, §5a). The relief valve / repositioning tool. **v83: you may Tap any
  number of casks per visit**, in any order with Age / Blend / buy-Improvement (the old "one Tap per visit"
  cap is retired) — so e.g. *Age · Tap · Tap · buy an Improvement* is one legal Cellar visit ⚙.
- **Buy a private Improvement** (v1.7 — moved from the Market; §8) — pay its goods cost into your
  improvements area (cap **4** ⚙).
- **Blend** (Specialty Beers expansion only) — combine two Ready vessel casks into one premium cask
  (§12).

**Order is free and the steps feed each other.** Two worked examples: **Tap → Buy** — Tap a cask whose
action yields goods (e.g. a Gruit → **+2 goods**) to gain the grain you need, *then* buy an Improvement
with it; **Tap → Age** — Tap a "wild" cask to **brew** a beer, *then* use the Cellar's **Age** to age that
freshly-brewed cask. *(No more forced Age-first, no more "only one of Tap / Improvement".)*

### C · Harbor — *Ship*
**Load** a deployed cask (yours or a rival's) onto a ship it qualifies for (you choose the
ship/destination; loading a rival's cask: you take **1 `G`**, the owner scores it on delivery);
ships **sail only when full**. **Or Enshrine** at the Hall (§6). **Or Charter** (§6).

> **THE ONE VESSEL-OUTLET GRAMMAR (v2.2).** *A cask leaves your vessels only two ways: **Deploy**
> it, or **Charter** it.* Every load verb on the board — the Harbor Load, a cask's free-Load
> action, a ship's line-fire, the commission free-load — touches **deployed** casks only.
> the **Quaymaster** (ex Private Quay) is the invested exception: it opens **both private outlets** —
> **Load OR Enshrine straight from your vessels** (v2.7). For everyone else **Enshrine takes deployed
> casks only** — *the Hall demands a public showing* (the deploy-first principle, kept deliberately;
> the Quaymaster is the paid way past it). **Every gate check uses EFFECTIVE
> quality** (kilns, Duckstein, Customs/Gauger — one rule for every verb).

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

### 5a. The slot tiles — Privileges & Buildings (owned, authored)
> **THREE TILE TYPES, THREE COLOURS (v2.4.1).** Every non-cask tile you can own is one of three
> first-class types, told apart at a glance: a **PRIVILEGE** (bright **blue**) — an owner-only
> value tile on the slots; a **BUILDING** (**green**) — a serves-any-dock transform tile on the
> slots; a **SPECIALIST** (**purple**) — a private tile on your brewery board (§8). Privileges
> and Buildings share the slot grammar below (the **Wharf display** of 4 · buy + place ·
> overbuild · ownership); Specialists live on your player board and power the Floor.
**Buildings always come from the face-up display, and you place them the moment you gain them**
(v2.2 — there is no hand): **buy** one at the Market (pay + place), **earn** one free when you
deliver to **London** (§7 — choose from the display and place it *when gained*, whoever's turn it
is), or **Survey** (the cask action — choose from the display and place it, free). The display
refills from the shuffled deck after every take.

**OVERBUILD — one rule (v2.2).** You may place onto **any** slot. Placing onto a slot that already
has a building **displaces** it: the displaced building's **owner banks +3★ immediately** on the
score track (self-overbuild included — the tile's back is the printed record), and the tile
**FLIPS into their improvements/floor slots** carrying a **Wild action on its back** (fired when
they work the **Floor**). If their 4 slots are **full, the flipped tile is discarded** (the +3★
still banks). So the 8 slots never lock, nothing needs remembering, and being overbuilt always
pays. Each building is **owned** by its placer.

Under **one grammar — "a building modifies the occupant docked on it NOW"** (v2.2: modification is
**positional** — nothing is ever rewritten; a cask on the Brewmaster's Workshop acts as Wild *while
it stays*) — a building is one of two flavors (variety = content, not new rules; the deck is in
`COMPONENTS.md`). **Each building targets a specific occupant** (shown by a glyph): most are
**cask** tiles, a few are **ship** tiles (the rich berths **Rich Berth/Festkeller** +
**Cooperage/Customs House**), one is **owner-passive** (Almoner's Stall). A building does nothing
for the wrong occupant, and is **never a stop of its own** — a building-only slot's line stop is
simply Deploy. *(v1.5: the two old **line-effect** buildings, **Harbor Crane** and **Lagering
Cellar**, were really private engine perks — they became **private improvements**, §8.)*

- **Value buildings (the "demand") — PRIVILEGES.** The occupant scores **bonus value on
  delivery — for the building's OWNER only** (§5b). On a **cask**, the bonus is **captured as
  the cask ships through** the building and carried on a **reusable demand die** that rides the
  cask in the berth — **a real d6 (v2.2): the building's printed ★ plus the quality premium
  (§7), SET when captured, never accumulated, hard max 6.** On a **ship**, a value building is
  a **rich berth** that **bumps the SAME die at the sail** (v2.3 — e.g. Rich Berth: each of the
  owner's casks' dice **+2**; a cask with no die takes one at the bump value; **the one die
  stays capped at 6**). Destinations never touch the die — they are the cask's *starting value*.
  (A quality transform instead rides a +1-quality marker.) *This is the variable kontor value —
  what's worth chasing, authored on the living board.*
- **Transform buildings — WORKS.** The occupant is **changed, whoever it belongs to** (§5b).
  E.g. a docked cask **ships at +1 quality / acts as Wild**; a docked ship **carries +1 cask /
  lowers its quality gate.** The engine/"get-ahead" layer.

### 5b. Privileges & Buildings — the one sharing rule (v2.3)
**The type printed on the tile IS the sharing rule** — one sentence covers all 21 slot tiles:

> **A Privilege pays its owner; a Building serves the wharf.**

- A **PRIVILEGE** (blue) is a personal grant (a Staple Hall, a kontor charter, a patron's
  favor). **Only the owner's cargo banks its ★.** A rival may still dock a cask or
  ship there (the slots are shared ground), but their cargo passes through and **banks nothing**
  — no die is set, and **nothing is paid to anyone.**
- A **BUILDING** (green) is physical infrastructure (a kiln, a hop yard, a cooperage, a
  customs house). **It serves whoever docks on it,** at full effect.

There are **no payments between players at delivery** — the old rival-½ share and the
"wharfage" points trickle are **retired** (they were arithmetic where the game wanted a rule).
The building contest is **structural**: dock on a rival's privilege to **deny it** (they can
clear you by loading your cask away — §4C), **overbuild** it (+3★ to the displaced owner, §5a),
or make them pay the **occupancy toll** on your station.

### 5c. One-fire rule (kept)
When a line fires, the active player **may** use each slot on it — the occupant's action (a
cask's slot-action, a ship's free-load) **and** any building effect — resolving **on the active
player's turn.** No out-of-turn gains.

---

## 6. Ships · Charter · Enshrine (the cash-out — kept)

- **Ships** are neutral, destination-bound hulls (Cog 2 / Hulk 3) off a shuffled deck; a face-up
  **market of 3**. **Commission** (`2 G`) places one on an open slot — **or onto a slot whose cask can board it**
  (v2.6 **dockside pickup**: the cask loads at once, its dock privilege captured; a rival’s cask
  follows the rival-loading rules — owner scores, you chose the destination + take the `1 G`;
  a hull filled by the pickup sails immediately) — **+ a free load of one of your DEPLOYED
  casks** (v2.2 — the vessel-outlet grammar, §4C). Load deployed casks aboard; a ship
  **sails the moment it is full** (v2.2: including when its capacity *shrinks* — e.g. a Cooperage
  overbuilt under a part-loaded hull) → every cask **delivers**, value (§7) + majority
  count sealing **on delivery** in load order. **Dock a ship on your value-building for a rich
  berth** (§5a). The hull returns to the deck; the voyage **advances the clock** (§10).
- **Charter** — spend a **contract** + flat `2 G` fare → one Ready cask (**vessel or slot** — the
  Charter and Deploy are the only two doors out of your vessels) on an immediate single-cask
  voyage to a **kontor**. The deadlock guard (always-legal escape).
- **Enshrine** — local Harbor action (no ship/fare): withdraw a deployed **Q2+** cask into the
  **Hall** for **fixed** prestige (§11). Deploy-first keeps it contestable — *the Hall demands a
  public showing.* Advances the clock.

---

## 7. Destinations & delivery value (the variable score)

Five destinations, all open from start (⚙ table in `COMPONENTS.md`):

| Destination | Gate ⚙ | Base value ⚙ | Benefit on delivery ⚙ | Majority (1/2/3) ⚙ |
|---|---|---|---|---|
| **Bruges** (Hub) | Q1 | +1 ★ | 2 goods (owner's choice) | 4 / 2 / 0 |
| **London** (Steelyard) | Q2 | +1 ★ | a **Privilege/Building** (placed at once) **OR** a **Specialist**, free ⚙ | 5 / 3 / 1 |
| **Bergen** (Bryggen) | Q2 | +1 ★ | **free Reach** (+1 presence, any kontor *you've delivered to*) | 9 / 5 / 2 (anchor) |
| **Novgorod** (Peterhof) | Q3 | scales by Q (Q3→2 · Q4→4 · Q5→6) | **refine** (a maturing cask **+1 age**) | 8 / 5 / 2 |
| **The Hall** (Prestige) | Q2 | **fixed ladder 3/5/7/9 by quality** ⚙ | — (Enshrine) | — |

**Delivery = the destination's STARTING VALUE + the demand die in the berth** (v2.2 — the whole
table procedure in one sentence). The destination's printed value (Novgorod's Q-scaling included)
is the cask's starting value; the **die** carries everything the *board* added.

**The quality premium (v1.8 "Quality Pays" · v2.2 "part of the die").** A value building rewards
the **climb**: it pays its printed value for Q1–Q3, but a **Q4** cask banks **+2★** and a **Q5**
cask **+3★** on top — and **the premium is part of the die**: set the d6 to *printed ★ + premium*
when the cask ships through, **hard max 6** (a real d6 — e.g. Connoisseur 4 + Q5 premium 3 caps at
6). The die is **set, never accumulated** — the most recent modification wins, **only your own
value buildings set your dice** (§5b), and a ship-slot rich berth **bumps the same die at the
sail** — the one die never exceeds 6. So a Bock routed through demand is worth its investment —
e.g. *Bruges starting value 1 + a Staple die (3 + premium 3, capped) = **7***. The **Hall's
reliquary is excluded** — its fixed 3/5/7/9 prestige ladder already scales with quality. *(The
export-premium table and the Masterpiece from v0.16 are folded into this / cut.)*

**Benefits resolve WHEN GAINED, owner's choice (v2.2).** Every on-delivery benefit is taken by the
cask's **owner, immediately, whoever's turn it is** (a rival tops off a hull carrying your cask →
you choose your benefit right then): **Bruges** — 2 goods, any mix; **London** — choose a **Privilege or Building** from the Wharf display **and place it
now** (§5a) **or take an eligible Specialist** from the Cellar display, free (v2.4); **Bergen** — a
free Reach at a kontor you've delivered to; **Novgorod** — refine: **you choose which** of your
maturing casks ages +1. No
queues, no deferred choices, nothing to remember between turns.

---

## 8. The brewery (private engine) — vessels · recipes · improvements

Private and safe: **vessels** (start 2, cap 3 ⚙), **recipes**, and the **cask-action pool** —
now **steerable**: the top tile of each quality pile is face-up, so you brew toward the actions
you want (Q2+ draw `Source · Age · Load · Reach · Convert · Survey (a slot tile, placed) · Hire (a
Specialist, free — Q3+ only, v2.4) · Wild (Q4+)`; Gruit fixed to Source).

**Vessels now carry pre-delivery value** — they power the **Floor** (§3, `PLAN.md` §1B) — which
finally gives the **Coppersmith** (+1 vessel) a real pull (more vessels = a bigger held engine *and* more brewing
throughput). So the **starting count / cap / whether the Coppersmith repeats** are a live ⚙ to
retune: in early playtests the extra vessel and the Warehouse were *never* bought (dead upgrades); the Floor
fixes it, and storage-cap upgrades stay suspect unless they earn their place.
**Most v0.16 upgrades fold into the public building family (§5).**

**The SPECIALISTS (the purple private tiles — bought at the CELLAR for goods, hired free via the Q3+
Hire action, or taken as London's benefit; the v2.4 re-prices lift the floor ⚙; v2.6.1 persona names):**
**Coppersmith** (+1 vessel, `3 G`), **Cellarman** (maturation −1 step, `4 G`), **Grain Factor** (+1 extra
grain, `3 G`), **Hop Gardener** (+1 extra hops, `4 G` — the parity probe's outlier pays a premium in the
hops-led economy), **Stevedore** (your Harbor load sets out **2 casks**, `3 G`), **Lagerkeeper** (each of
**your turns**, **EVERY** maturing cask **+1 age**, `2 G` — the Floor-lane keystone), and **Quaymaster** (**Load OR Enshrine** Ready casks **straight from your vessels**, `3 G` — the paid door past Deploy, v2.7).
Your **improvements area holds at most 4 tiles** (these + any flipped buildings, §5) — so the engine is a real
choice, not a buffet. *(v1.7 moved the buy from the Market to the Cellar — sim showed the barrier was the
Market action's opportunity cost, not the goods. The free-starting-improvement study made **Hop Gardener** the
strongest in the hops economy.)*

**v82 "Scarce Improvements" — the improvements are now a SHUFFLED DECK + a face-up DISPLAY of 4, not an
always-available catalog.** The deck holds **`n − 1` copies of each of the 7 improvement types** (`n` = player
count: 2p → 1 each = 7 tiles · 3p → 2 each = 14 · 4p → 3 each = 21), shuffled; deal **4 face-up** at the Cellar,
refilling from the deck as tiles are bought (mirrors the Building deck/display, §5a). **Only what's face-up is
buyable** — so the private upgrades become a **contested supply**: with `n − 1` copies the table races for them,
and not everyone can fit every improvement (the 4-player ring's slot-contention now reaches the private engine).
A player still cannot own two of the same type (a face-up tile they already own shows greyed). Everything else
holds — the Cellar buy, the `4 G`/`3 G` costs, the 4-tile area cap. *(The Overland "free Improvement" Staple
Right stays a free fit — a granted upgrade, not a purchase from the display.)*

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
2. **Kontore — VARIABLE.** Each delivered cask scores **its destination's starting value + the
   demand die in its berth** (§7) — nothing else, ever. *The risk/reward path — read the board,
   route your brews through your own privileges.*
3. **The developer bonus** (v1.2 · v2.2: banked immediately) — **+3★** ⚙ the moment one of your
   buildings is **overbuilt** — self or rival (§5a). *The crowded-ring / authorship reward.*

**End-game:**
4. **Majorities** — at each kontor, by **delivered-cask count**, tiered (Bruges 4/2/0 · London
   5/3/1 · Novgorod 8/5/2 · Bergen 9/5/2 ⚙; 2p skips 2nd; ties split). *Go big in a few.*
5. **The Flight** — distinct **beers** delivered: **(beers−1)², min 3** (3→4 · 4→9 · 5→16 ·
   **6→25 with the Jopenbier capstone in play** — v2.2: the capstone **counts**; it's a beer you
   brew like the others). The base game always has exactly **five beer types** (Gruit + Hopped +
   the 3 dealt exports), so the full base flight is **always reachable** ⚙. *The range reward —
   deliver the full breadth of the house.*

> **Presence is standing earned by trade.** A **Reach** (the cask slot-action, the Bergen benefit, the
> Keut perk) can add presence **only at a kontor you've already delivered a cask to** — you can't gain a
> foothold somewhere you've never shipped (v1.2; thematic + fair). Reach is simply a dead action until your
> first delivery.

6. **Tiebreak:** the combined **quality of your deployed casks on slots** (built but not yet delivered — you must still deliver to actually bank them), then most goods.

> **The legible fork:** the **Hall** is the fixed floor; the **kontore** offer **two** ways to
> win — chase **demand** (variable, in-game, via the buildings you author) **or** grind
> **majorities** (count, end-game). The Flight rewards going deep. A new player picks one; an
> expert braids two. That clarity is the point.

---

## 12. Expansions (opt-in toggles)

*Three independent **New Game toggles**, mixable freely, on a shared **expansion spine** (a registry + hook seams,
so each module is one self-contained block and the base stays untouched): **(1) Specialty Beers** (below),
**(2) the Jopenbier capstone**, **(3) The Trade Roads** — the inland map of claimable Staple-Right slots that replaces the kontor majorities.*

### Specialty Beers

A modular, **opt-in** expansion, switched on by a **New Game checkbox**. **OFF by default → the base game is
exactly as above (§1–11), byte-for-byte.** ON → three new **specialty beers** join the export draft, so you
**deal 3 of 7** (vs the base 3 of 4), with a guarantee of **≥1 base Q4+** (Mumme/Bock) so the quality climb,
the Hall's high rungs, and Novgorod's scaling stay meaningful. The point: turn the roster from a quality
*ladder you climb* into *characters you main*. Each specialty beer is **pinned** (its slot-action is fixed &
printed — the base climb beers still draw from the **steerable pile**, so the Orléans-lite agency is untouched;
this simply generalizes Gruit's existing pin) and carries **one always-on signature**, so leaning a beer pays
*during* play, not just at scoring.

| Beer (town) | Q · ready · brew ⚙ | Pinned action | Signature ⚙ |
|---|---|---|---|
| **Gose** (Goslar) | Q2 · 1 · `2G` (no hops) | Source | **Salt Trade** — a kontor delivery throws off **+1 G +1 H** to the owner (liquidity; the grain-path beer) |
| **Zerbster** (Zerbst) | Q3 · 1 · `3H` | Load | **Parti-Gyle** — brewing it also fills an open vessel with a **free small Gruit** (the weak second runnings → throughput + the Flight; lost if no vessel is open) |
| **Duckstein** (Königslutter) | Q2 · 2 · `1G 1H` | Reach | **Smoke-Hardy** — ships & scores as **+1 quality** (gates *and* value — reaches the Novgorod long-haul; a humble beer that travels like a fine export) |

Recipe buys ⚙: Gose `1 G` · Zerbster `1 H` · Duckstein `1 G`. Everything else — destinations, majorities, the
Flight, the clock, scoring, the Hall — is **unchanged**; the expansion is pure roster content under the
existing grammar (the "Beer Atlas" path).

**Specialty Beers also adds (completing Option A):**
- **Blending** — a **Cellar** action: combine **two Ready vessel casks → one premium cask at +1 quality** (the
  higher of the two +1, cap Q5; it inherits the higher beer), in a freed vessel. The deep player's *active*
  turn — reach Q5 without Bock, and a use for two aged casks (you trade two deliveries for one finer one).
- **Three thematic Buildings** join the building deck (alongside the base family): **Salt House** (a cask
  shipped from here → its owner gains **+1 G +1 H** on delivery, the salt trade), **Smoke Kiln** (a cask here
  **ships +1 quality**, cap Q5 — smoke-cured), **Parti-Gyle Tun** (deploy a cask here → a **free small Gruit**
  to an open vessel). All ⚙. *(The v1 AI uses the buildings but doesn't yet blend — a follow-up.)*

### Capstone — Jopenbier (a second, independent toggle)

A separate **New Game toggle** (on with or without Specialty Beers): the **vintage super-beer** (Danzig) — the
*deep* counterweight to the breadth above (two incompatible plans on turn one). **Q6** (display only), **slow**
(ready 4), **dear** (`2G 4H`), and **always acquirable** when on (not in the draft) — the looming moonshot. It
is **scored self-contained** — a big fixed ★ that never touches the Hall/Novgorod/premium tables (so a "Q6"
can't ripple anything): **8★ at a kontor / 9★ enshrined**, **plus a "vintage" bonus**. *Aging-as-value (new):*
once **deployed**, it **cellars on the dock for +1★ per your turn (cap +5)** — the longer (riskier) you hold it,
the bigger the payoff, and it stays **contestable** (a rival can hijack-ship it to deny your peak). Pinned to
**Source**, so the long maturation **funds itself on the Floor**. **Counts for the Flight** (v2.2 — "a beer
you brew like the others"; with the toggle on there are SIX types and the 6-beer flight pays **25**);
counts as a normal cask for majority. The slowness + the visible recipe give the
**end-clock a second job** — rivals push the Sailed-Ships track to deny a maturing Jopenbier (the race-to-end).
All numbers ⚙ (`JOPEN_BASE` 8 · `JOPEN_HALL` 9 · vintage cap 5 · ready 4).

### The Trade Roads — Staple Rights (Overland, the third toggle)

The heaviest module, and the one that **REPLACES the kontor majorities** (they turn **OFF** when it's on; the
control contest moves inland). It adds an **inland trade network — a tree rooted at HAMBURG (home).** Two roads
lead out: **West** to the **Bruges gateway**, which fans out to **London**, **Bergen**, and the **Rhineland**; and
**East** on the long deep haul to **Novgorod**. **Bruges** is the lone pure waypoint — the no-slots gateway
(recipe-or-goods); **every other node, including the London/Bergen/Novgorod kontore, carries Staple Right slots**
(the kontore keep their base sea-delivery benefit *and* offer slots when your caravan reaches them). **No new
station, no new action — it rides the Harbor's Ship.**

- **Movement is per VOYAGE, ONE node per owner.** When a ship **sails** to a kontor (the normal full-ship sail —
  fully through the demand die / quality premium / the Flight — *or* a single-cask **Charter**), **each owner aboard
  advances their caravan exactly ONE node** along that kontor's route. A 3-cask Hulk = **one** step. *(Per owner: a
  rival whose cask you carried advances too, resolved in load order.)* Casks **never buy depth** — only **quality**
  (the gate) and **repeated voyages** (the clock) do. This is the anti-flatness rule.
- **Each cask then CLAIMS a Staple Right.** Every one of that owner's casks aboard claims an open **slot** at the
  node reached, **in load order** (first loaded picks first): it scores the node's **delivery ★** + a **one-shot
  slot bonus** + drops a presence marker. So a 2-cask voyage to your frontier town = **two slots** there. The
  **active player picks** an open slot; rivals (off-turn) and the AI auto-pick.
- **Quality gates depth.** You step onto the next node only if a cask on that voyage **meets its quality gate** —
  the deep towns need a high-Q beer; voyages (the clock) buy the distance. Reach (breadth) and quality (depth) are
  both required. **A charter opens a road at its NEXT node's gate** — so a **Q2 charter opens the eastern road at
  Visby (Q2)**; the Novgorod kontor's Q3 sea gate no longer walls off the cheap entry (a sub-gate charter advances
  the caravan + claims the node, but earns no under-gate kontor sea benefit).
- **Never nothing.** A town whose slots are all claimed pays the line's small **overflow** bonus, and your road
  still extends — every voyage that reaches a node pays *something*.
- **Distinct slots, flavoured by LANE** (2–4 per node; *active count scales **n+1** with player count* — 2p uses **3**
  slots, 3p/4p use 4, bounded by a node's printed slots). The deep ◆ nodes are **high-gate terminals**; scarcity comes from a
  node's slot count — **Pskov** is the scarce one (a single slot), **Frankfurt** the rich 4-slot Rhineland outlet. Slots are
  listed best-first. The lane identity lives in the slot menu:
  - **Rhineland — KNOWLEDGE/CRAFT** *(Bruges voyages)*: **Cologne** (Q2 · +2★ · `recipe · a free Gruit · brew · brew`)
    → **Frankfurt** — *the deep craft/prestige outlet* (Q3 · +3★ · ◆ · `a free Q3 · a free Enshrine · +2 age · +6★`).
  - **London — INFRASTRUCTURE** *(London voyages, through Bruges)*: **Antwerp** (Q2 · +2★ · `a Building (display → placed) ·
    brew a beer · +3 goods · a Building (display → placed)`) → **London** (kontor · Q2 · **+3★** · `a Building (display → placed) · a free Improvement · +3 goods · a free Improvement`).
  - **Bergen — LOGISTICS** *(Bergen voyages, through Bruges)*: **Tønsberg** (Q2 · +2★ · `+1 charter contract · brew a beer ·
    +2 G · brew a beer`) → **Bergen** (kontor · Q2 · **+3★** · `+1 charter contract · +3 goods · +1 vessel · +1 vessel`).
  - **East — DEPTH/VALUE** *(Novgorod voyages)*: **Visby** (Q2 · +2★ · `+2 G · a free road step · +2 age · +3★`) →
    **Tallinn** (Q3 · +3★ · `+1 vessel · +1 quality · brew a beer · +5★`) → **Novgorod** (kontor · Q3 · **★ = delivered quality** · `+1 quality ·
    +1 vessel · +2 age · +5★`) → **Pskov** — *just a delivery* (Q5 · ◆ · **one slot +8★**, every later delivery **+5★**).
  - **The 4th slot** (each slot list's last entry; opens at **3p+** now that active slots scale **n+1** — 2p→3, 3p/4p→4):
    the **western** towns DUPLICATE the lane's signature bonus there (a 2nd brew · 2nd Building · 2nd Improvement · 2nd vessel)
    rather than a generic points slot — the extra 4p slot reinforces the lane's identity. The **East** (the depth/**points** lane)
    and the deep ◆ nodes keep their **+★** there.
  - The **brew** slot is a **Brewhouse action** — the active player **chooses a recipe they hold and pays it** into an
    open vessel (the brew picker; off-turn/AI auto-brew the highest affordable). The **free Gruit / free Q3** slots
    instead rack a free cask (no recipe, no cost) straight to a vessel to cellar. **London's free Improvement** fits a
    private Cellar upgrade gratis; **Frankfurt's Enshrine** presents a deployed Q2+ cask to the Hall, no boat.
- **Lane economics:** the **East** pays the most in points (the deep money lane, capped by **Pskov**); the
  **Rhineland** is **the craft road** (recipes/brew/age → fund the climb, then cash big at Frankfurt or enshrine
  there); **London** buys the board + your engine (buildings + a free Improvement → demand on every delivery);
  **Bergen** buys throughput (contracts/goods/a vessel → more voyages → more depth). Each western line carries **a
  brew action** at its first town (Cologne/Antwerp/Tønsberg), and Tallinn on the East. *Name your plan turn one.*
- **Bruges = the knowledge on-ramp** (core, no slots): a delivery there lets the owner **choose a recipe** (a dealt
  export you lack) **OR 2 goods** — hot and contested early, self-diminishing as recipes fill.
- **The Rhine Charter** (the bypass): a **Charter** carrying a **Q4+** cask may take the **Rhine road** — the cask
  delivers at Bruges (full keystone), but the caravan **leaps Hamburg → Cologne, skipping the contested Bruges
  node** (Bruges is marked *satisfied*, so later Bruges voyages continue to Frankfurt). The quality brewer's
  express into the Rhineland.
- **Re-homed benefits/actions (no orphans):** **Bergen's** benefit and the **Reach** cask-action become **+1
  caravan road step toward a city you choose** (capped at Q3 gates — a free step builds breadth, it can't steal the
  deep Q5 prize). Everything that fed the old majorities now feeds the network.
- **Scoring (replaces majorities):** the inland network ★ = the **node delivery points + the slot bonuses** you
  claimed (banked as you play). The **Hall** stays the deliberate non-delivery prestige lane.

Movement rides voyages, so it's **clock-tied** — every step is a Sailed-Ships tick, so *invest carefully or you
run the clock out*; the Sailed-Ships length is **+2** to pay back the inland investment. All numbers ⚙. Sim-gated
(KEY v76): 0 crash/deadlock 2–4p, 100% pace-in-band, clock-dominant; render-smoke (incl. the slot picker + the
Rhine leap) + ladder clean. See `DESIGN.md` §9 (v2.1). *(Lesson honored: a second geography must run THROUGH the
keystone — delivery, quality, the demand die — and EXTEND a lane, not sit beside the engine.)*

---

## Open / to-tune

1. **The building deck** — the value/transform vocabulary, magnitudes, deck size, display width.
   *The keystone's heart* (`COMPONENTS.md`). v2.3 magnitudes to watch: the redesigned
   **Festkeller** (Hulk +3) and **Almoner** (+3 where you don't lead).
2. **Three-tier interactions** — building+ship+casks edge cases are now bounded by the **one-die
   cap** (a rich berth bumps the same d6, max 6); confirm the cap reads cleanly at the table.
3. **Private improvements** (§8) — which (if any) stay private vs fold into buildings; how earned.
4. **Base values vs building bonuses** — the flat-vs-spiky dial; keep the Hall's fixed ladder the
   legible floor.
5. **Majority numbers** — re-tune now that kontor value is building-driven.
6. **Cuts to confirm** — export premium, the Masterpiece (fold into buildings/Flight?).
7. **Slot pressure** — buildings + casks + ships sharing 8 slots; keep it tight but never locked.
