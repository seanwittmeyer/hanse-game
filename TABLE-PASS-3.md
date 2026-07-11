# The Table Pass, round 3 — one verb per stop, nothing rides the cask (v3.0 direction exploration)

> **Status: EXPLORATION (2026-07-11) — no rules changed.** Re-engaging the two themes of the
> 2026-07-07/08 table pass after the v3.0-A/B builds were shelved (`archive/v3-exploration/` —
> read its README's salvage list; this round treats it as settled evidence). New evidence since
> round 1: the **30-game v94 play-by-play corpus** (`playtests/logs/REVIEW-NOTES-v94.md`, 10 games
> per player count, mixed Trader/GM/CM) and **four human game logs** (`playtests/logs/human/`).
> The designer's brief, verbatim anchors: stations are *"too much… 2 actions max"*; deploy-here-
> but-place-anywhere *"confusing"*; the slot stack is *"finicky and requires a lot to parse"*;
> swapping a building forces everyone to *"re-calculate all the dice"*; the digital build's hidden
> state is *"effectively cheating"*; the Floor should be a *"big decision tension of two good
> things but one turn"*; Hall & Flight went unexplored, shipping stalled, majorities *"almost felt
> like the primary goal"*; and the constraint — *"we don't want the game simpler, we want the
> decisions more strategic between easy-to-understand paths that are a puzzle to explore."*
>
> Everything below is ⚙. Recommendation in §7.

---

## 0. What the new evidence adds to round 1's diagnosis

Round 1 (archived `TABLE-PASS.md` §0) named the two table currencies — reading cost and
bookkeeping cost. The v94 corpus and the human logs sharpen five facts that round 1 could only
assert:

1. **The demand die is invisible even to the machine.** Across 30 sim games, the big die
   cash-ins exist (Bock=12 at Novgorod ×4, Gruit=5 at Bruges) but belong almost entirely to the
   MC seats; the heuristic tiers author privileges and then strand them, and in 2 games *nobody*
   authored value at all — every delivery collapsed to the 1★ floor and the game decided on
   majorities+flight (29-point 3p table). Humans DO route deploys deliberately (all four human
   logs), but their table still fixated on majorities. **The lane most in need of planning is the
   least visible on the table.** The die is not just finicky — it hides the game's ceiling.
2. **Privilege bonfires are the die's newbie trap.** Q5 Bock → Bergen for 1★ (three sim
   sightings; "devastating to read") — the owner-only, capture-at-load rule means a premium cask
   on the wrong tile silently scores nothing, and the loss surfaces only at delivery.
3. **Majorities feel primary because they are the only visible race.** Presence discs on the
   destination board are the one lane with a physical scoreboard. (Round 1 said this; the human
   table's fixation and the sims' Bergen-is-free-money pattern — +9 sole in most games, often via
   Reach chains with barely any Bergen hull traffic — both confirm it.)
4. **The stations' menu depth is where the AP lives, and the Cellar/commission wizards are the
   worst.** The engine audit (`STATION_ACTS` + the sub-state machine): Market = 1 binary fanning
   into four shops, one a 3-step wizard; Cellar = a chaining any-order menu (Age-allocate ·
   Tap×N · Specialist buy · Blend); Harbor = one-of-three, each a 2-stage picker. The corpus
   shows what this permits at the degenerate end: 24–28 Taps per stall game (Tap as idle
   animation), 10-minute mega-turn "resolution sandwiches."
5. **The Floor is a free pass, not a tension.** 28 consecutive no-op Floor turns in the 2p GM
   mirror; 7–10-turn Floor idle loops in four other games; presence ground from the Floor
   without deliveries. The Floor is never tolled, always legal, and does *something* even when
   it does nothing — the opposite of "two good things, one turn."

The founding lesson stands (DESIGN §8: content, not rules; structure levers, not value levers).
Both themes below are structure work.

---

## 1. Theme 1 — line activation: one verb per stop

### 1a. The target grammar (two sentences, teachable at the table)

> **Every stop is one verb. Slots are local; stations reach the whole wharf.**

A line = 4 stops (2 slots + 2 stations), each ONE decision — at most a printed this-or-that.
That is the whole rules text for activation.

### 1b. The four station faces (the ⚙ proposal, refined from 3A by the new evidence)

| Station | Face (ONE decision) | What changes vs live |
|---|---|---|
| **Market — SOURCE** | `Take 2 goods OR buy 1 tile` (recipe · Wharf tile · ship · contract) | The four displays stay (they're the variance surface); the **commission wizard dies**: commission = pay 2G, put the hull on a legal slot — **the only free load is the dockside pickup** (place it ON a boardable cask; it boards at once). The separate free-load picker (rival/vessel branches) is cut. |
| **Brewhouse — BREW** | `Brew 1 cask OR deploy 1 Ready cask (any open slot)` | The deploy-anywhere valve LIVES HERE and only here — 3A's A/B measured why it must (slot-local-only deploy overheated prestige at 4p, 48.3% vs fair 25; the valve pulled it to 44.7 with volume +2.4). One decision, and it teaches the two-tier rule by example: the *station* reaches the wharf. |
| **Cellar — AGE** | `Age (3 pts across vessels) OR fit 1 Specialist` | **Tap is cut from the base game.** Blend joins as a third or-branch only with Specialty Beers (opt-in complexity on the spine). |
| **Harbor — SEND** | `Send ONE deployed cask: onto a docked ship (free) · to the Hall (Q2+) · by Charter (contract + 2G)` | The three verbs collapse into one grammar: *sell one barrel — which cask, which route.* Stevedore = send two ⚙; Quaymaster = SEND reaches your vessels (unchanged as the invested exception). |

Why Tap can go, per the corpus: its three jobs are (a) vessel-clog relief — the Floor fires a
held cask's action *without* discarding it (strictly better) and the unified SEND drains slots
faster; (b) cash-a-cask — the Floor again; (c) recall off a slot — spoilage handles Q1 squatters,
SEND handles everything worth money, and the human logs show tap-as-recall was always in service
of (re)deploying a better cask — which slot-local deploy + spoilage now express directly.
The stall games' 25-Tap idle loops disappear with the menu. *(Watch: the v1.3 seize lesson —
gate the cut on vessel-clog turns not rising vs the v94 baseline.)*

### 1c. Slots act on themselves (the deploy/load answer)

The player's complaint — "you activate Deploy here but deploy the cask anywhere" — is fixed by
making every slot stop self-referential (the strongest item on the shelving's salvage list —
"composes with ANY future engine"):

- **Empty slot stop → deploy a Ready cask ONTO THIS SLOT.** Where you work is where the barrel
  lands. Placing a building on a line you'll actually fire becomes *more* load-bearing (the v1.0
  heart, sharpened): the deploy decision collapses from "which of 8 slots" to "which line did I
  choose this turn" — which is the strategic decision the game wants you making anyway.
- **Cask slot stop → that cask's printed action** (unchanged). If it holds a Q1 and you have a
  Ready Q4+, the stop may instead be taken as **spoilage-deploy** (the v2.9 rule expressed as the
  stop's either/or).
- **Ship slot stop → load one cask onto THIS ship** (already true today).

**Should the Harbor's Load also be line-restricted? No.** Keep the two-tier rule clean: slots
local, stations global. A wharf where *nothing* reaches across kills the "move to where the
board is best" spine — the Harbor is the one place you pay a whole station stop to route
anything anywhere, and the line-restriction question the player raised is really about the
*slot* stops, which 1c answers. (Restricting the Harbor too was effectively 3A-as-shelved's
harshest reading; the 4p persona A/B is the evidence against it.)

What this costs, honestly (same ledger as round 1): deploy throughput drops (you need a line
with an open slot — the Brewhouse or-branch is the pressure valve); the deploy-then-fire combo
dies (a cute trick traded for a teachable grammar — good trade); and the wharf-jam terminal
state (v94's one real structural hole — a fully-built, fully-parked ring with no hulls) must be
re-simmed under the new drains. SEND + spoilage-on-the-stop + dockside-only-free-load all pull
casks *off* the ring faster than live v94; the sim gates below check it.

### 1d. What round 3 adds to 3A: price the cheap ticks while we're here

The v94 corpus's loudest *systemic* finding is that the clock is opt-in and bimodal (R9–R25 on
identical caps; enshrine = 8/13 ticks in the 9-round game; four ceiling stalls). The activation
rework is the right moment to give the clock a floor and a ceiling *structurally*:

- **The SEND face prices routes by what they are:** ship-load = free (the shared-hull economy
  is what we want more of) · Enshrine = local, no fare, **ticks the clock only from Q3+** ⚙
  (a Q2 enshrine still pays its 3★ but is "beneath the town's notice" — no tick); Charter =
  contract + 2G, always ticks. One printed asterisk on the Hall row; kills the Q2-enshrine
  clock-spam AND the trailing player's "end it from 41 down" blunder in one move, without
  touching Hall values (structure, not value).
- **Warm start ships count for the clock only when they sail with ≥2 casks aboard** ⚙ — or
  simpler: seed ONE warm hull, not two (the R9/R10 games got 4 free ticks by R4 off warm-start
  ballast). Dial, sim-gated.

*(Alternative rejected: raising SAILED_CAP — the same cap produced both R9 and R25; the
problem is tick price, not track length.)*

---

## 2. Theme 2 — the slot stack: get the numbers off the casks

### 2a. The audit, restated with the round-2 lesson

One slot today: building + owner ring + ship + up to 3 cask cards + owner markers + demand
die(s) + quality-boost marker + (capstone) vintage counter — nine piece-classes, two carrying
*computed* numbers. The die's whole job is to carry one number from slot to destination; the
set/premium/cap/bump/owner-check rules are arithmetic layered on the carry, and the "re-calc on
swap" pain is the *preview* habit (rules-frozen, table-live — the worst of both).

The shelving's verdict on 3A's seals: right idea, wrong denomination — per-privilege printed
values re-created the lookup problem. The salvage list already names the fix; round 3 goes one
step further with a second candidate that removes the carrier entirely.

### 2b. Candidate U — **Uniform Seals** (the salvage-list fix, minimum distance from live)

ONE game-wide seal value pair: plain **+3★** / gilt **+5★** (gilt when the shipping cask is
effective Q4+) ⚙. Privileges differ ONLY by **condition and cost** — never by value:

| Privilege (redrawn) | Condition to hand its seal ⚙ |
|---|---|
| Staple Hall | any kontor |
| Kontor charters (Hanzehuis/Steelyard/Bryggen/Peterhof) | its kontor only (cheaper tile) |
| Connoisseur's Cellar | Q4+ casks only (its seal is always gilt) |
| Hanse Diet / Almoner's Stall | where you lead / don't lead (read at delivery) |
| Reliquary | on Enshrine only |
| Rich Berth / Festkeller | handed at the sail (berth seal; Festkeller: hulks) |

Rules deleted: die-setting, the premium addition, the cap-6 clamp, set-not-accumulated, the
sail bump. Rules added: *"take a seal when your cask ships from your privilege; max one dock
seal + one berth seal per cask; Q4+ flips it gilt."* Nothing ever recalculates — the seal
physically leaves the tile, so a later overbuild is visibly irrelevant. Scoring = destination
row + at most two chips you're holding. ~20 tokens replace 8 dice + the die rules text, and the
box returns to compliance with its own "no dice" constraint.

Cost, honestly: tile variety compresses (value spikiness was part of Burgomaster's/Connoisseur's
identity); the +1★-per-quality Burgomaster has no uniform expression and would retire or become
a condition tile. The corpus says this costs less than it looks: Burgomaster's Favor was the
strongest tile in the box (three CM wins routed through it) *because* of its arithmetic — the
very thing the table can't afford.

### 2c. Candidate K — **the Brokered Contract** (privileges hold contracts; nothing rides the cask)

The new idea this round, answering the deeper question — *"are there other ways to manipulate
the core loop through buildings that don't impact cask value?"* — while keeping authorship:

- A face-up **contract row** (small tiles) sits by the destination board: *"Novgorod · Q4+ ·
  6★" · "London · any · 4★" · "Bruges · Keut · 5★" · "any kontor · 3rd distinct beer · 5★"* ⚙,
  refilled from a deck.
- A **privilege no longer prints ★.** It prints a **broker condition**: *"may HOLD one contract
  for {its kontor / any kontor / Q4+ / the Hall}"*. Buying/authoring the privilege is how you
  **reserve** demand: take a matching face-up contract, tuck it under your tile.
- **Fill it by shipping YOUR cask from that slot to the contract's destination** meeting its
  condition — on delivery you take the contract tile itself into your score pile (its printed
  ★ is the score; flip it face-down, done). The row refills.
- A rival's cask docking there does nothing (privilege = owner-only, unchanged); **hijacking
  still matters** (a rival who ships your cask to the *wrong* destination leaves your contract
  unfilled — same denial as today, now visible on the table); **overbuild** returns the held
  contract to the row (no arithmetic, no re-calculation — the displaced tile flips to the floor
  as today).

What K buys over U: **zero riders on casks** (no seals, no dice — the cask card is just a cask);
demand becomes **plannable and public** ("I'm brewing toward that 6★ Novgorod contract" is a
readable table statement — the exact legibility majorities have and the die never had); the
privilege keeps its authorship identity (*you* chose which demand to corner, and parked it on a
line you fire); Q4/Q5 pays through contract conditions (premium contracts demand premium beer —
the climb's reward becomes *access*, not arithmetic); and set-collection contracts give the
"other paths" texture (§4) with no new system. It also fixes the bonfire trap at the root: a
premium cask on the wrong tile is *visibly* not filling anything before you ship it.

What K costs: privileges gain a two-step life (reserve → fill) — one more state than U, though
it's a state shown by a physical tile sitting under another; the contract deck is new content
to design and balance (the v1.0 demand-board caution applies: the row must **churn**, claim →
refill, never install-and-sit); and ship-berth privileges (Rich Berth/Festkeller) don't map —
they'd retire or become works (e.g. Rich Berth → "a ship here may hold +1 contract's cask"…
or simply retire; the corpus shows they rarely scored anyway).

**B3 (all buildings become works, contracts free-floating at the destinations) stays on the
shelf as the architecture fork** — K is deliberately the halfway house that keeps the keystone:
demand is still authored onto the living slots, but the *number* lives on a tile that moves,
never on a die that computes. If K plays well and the privileges still feel like overhead, B3
is the next notch; if K feels like too much motion, U is the retreat that still kills the dice.

### 2d. What the transform half looks like either way

Works are already clean (quality collars, capacity, gates, Wild) and the corpus's happiest
sightings are transform-flavored (kiln lifts scoring at Hall and Novgorod; Cooperage's 4-cask
Hulk; Customs admissions). Two notes:
- **Gauger's Office** is confirmed dead weight in play (authored ~8×, scored ~once across 30
  games; the Malt Kiln does its job cheaper). Under either candidate, retire it or give it a
  distinct identity (e.g. *"a cask from here may fill a contract one quality below its demand"*
  under K — the assay office that certifies close-enough beer ⚙).
- **Cooperage under sail-when-full is an anti-synergy** (a bigger hull is a slower clock — 12
  rounds to fill in one game). Candidate re-text: *"a ship here sails when one berth short"* ⚙
  (the cooper's crew finishes the stowage) — turns the tile from a trap into a tempo work.

---

## 3. The Floor — from free pass to the second good thing

The brief: *"the thing you need to do sometimes, but it means you can't visit the wharf."* The
corpus shows the live Floor fails both halves: rarely *needed* (idle loops, whiff turns), never
*costly* (no toll, no movement, always legal).

The package (mostly salvage, one new piece):

1. **Specialists become Floor stops** (3A's A3, kept): Grain Factor = a source stop, Lagerkeeper
   = an age-all stop, Stevedore = SEND×2 lives on the Harbor… the Floor is **the line you
   build** — vessels + hired specialists + flipped Wilds. "Fit 1 Specialist" at the Cellar
   visibly lengthens your private line; the purple tiles stop being passive bookkeeping.
2. **The worker goes HOME to work the Floor.** Physically move your pawn off the wharf onto
   your player board. Next turn you **re-enter at any station (like the opening placement)** —
   which is a real cost (you surrender your board position and your rivals see the wharf open
   up) and a real texture (re-entry placement is a fresh strategic choice). One component
   gesture carries the whole tension: *my pawn is either on the wharf or at home.* ⚙
3. **A Floor turn must DO something**: you may only choose the Floor if at least one stop has a
   legal effect (matches the greyed-not-hidden philosophy; kills the null-pass stall that fed
   the 2p-10 mutual freeze — with 1d's tick floor this closes both stall doors).
4. **Flipped Wilds pay no goods on the Floor** ⚙ — a flipped tile is banked end-game value (+3★)
   and floor-capacity pressure, not a 2G/turn engine. This is the single lever that breaks the
   survey→overbuild→Wild-farm loop (3p-8's self-funding churn) without touching the ground rent.

Together: the Floor is *strong when built* (specialists + held casks), *spatially costly*
(re-entry), and *never a null move*. The "I need the Floor this turn AND the Harbor this turn"
agony is exactly what 2 buys.

---

## 4. Paths to victory — legibility first, then one new texture

Round 1's diagnosis holds and the corpus strengthens it: majorities felt primary because they
are the only lane with a public scoreboard. Before adding paths, make the existing five visible:

- **The contract row (K) makes the demand lane a public race** — the biggest single legibility
  win available, and it's the same change as Theme 2.
- **Flight milestones** ⚙ (3rd beer +1G+1H · 4th +1 contract · 5th a free Reach — printed on the
  player board's Flight strip): mid-game feedback turns range into a plan. (3A shipped these;
  keep.)
- **The Hall becomes a shelf**: enshrined casks physically stand on the Hall board's rung
  shelves. Rivals' Bocks on the 9-rung sell the lane better than rules text. (Keep values put —
  the pole test; the lane runs hot in sims *because bots underprice logistics*, and the human
  table underused it for visibility reasons.)
- **One new texture, not a sixth system:** if K is taken, **set-collection contracts** ("3
  distinct beers to Bruges · 7★", "a cask to every kontor · 9★") add the puzzle-path gamers
  chase — inside the demand lane's components. If U is taken instead, the same texture can ride
  2–3 **Guild Charter tiles** dealt face-up at setup (public end-game goals ⚙) — but note that
  goals were cut in v1.0 for scoring clarity; only revive as *public, few, and large-print*.
- **Majority pressure valve** (the corpus's Bergen-is-free-money + Floor-ground-presence
  findings): presence from Reach caps at **+2 per kontor beyond deliveries** ⚙ — presence stays
  earned by trade, Reach becomes reinforcement rather than a parallel engine. Dial, sim-gated.

---

## 5. What this does to the beers (brief)

The table's read — base beers are rungs, specialties are characters — matches v1.9's own
diagnosis; no base-roster change in this pass. But both Theme-2 candidates *feed* beer identity
for free: contracts can demand named beers (Keut to Bruges — suddenly Keut has a second
identity beyond +1 presence), and gilt seals make Q4/Q5 physically shinier. The
specialty-beer texture standard (printed identity per beer) remains the direction for any
future base-roster revision.

---

## 6. Component ledger (the finicky-ness scorecard)

| Piece-class on a slot | live v94 | with U (seals) | with K (contracts) |
|---|---|---|---|
| Building tile + owner ring | ✓ | ✓ | ✓ |
| Ship + cask cards + owner markers | ✓ | ✓ | ✓ |
| Demand die per loaded cask | ✓ | — | — |
| Die preview under deployed casks | habit | — | — |
| Seal chips riding cask cards | — | ✓ (≤2/cask) | — |
| Contract tile tucked under privilege | — | — | ✓ (≤1/privilege) |
| Quality-boost marker | ✓ | ✓ | ✓ |
| Re-calculation on overbuild | **yes** | **never** | **never** (contract returns to row) |
| Arithmetic at delivery | base+die (set/cap/bump) | row + ≤2 printed chips | row + the tile's printed ★ |

Either candidate deletes the two computed-number carriers; K additionally empties the cask
cards themselves.

---

## 7. Recommendation (opinionated) & the plan

**Package: A′ + K + the Floor package** —
1. One verb per stop (§1b) with slots-act-on-themselves (§1c) and the Brewhouse valve.
2. Tick pricing on SEND + one warm hull (§1d) — the pace floor the corpus demands.
3. The Brokered Contract (§2c) — privileges hold contracts; nothing rides the cask. *(Fallback
   staged and cheap: if contracts read as too much motion at the table, U (uniform seals) slots
   into the same activation rework with zero other changes.)*
4. The Floor: specialists as stops · worker-goes-home · no null Floor · Wilds pay no goods (§3).
5. Legibility set: Flight milestones · the Hall shelf · the contract row as the demand
   scoreboard (§4).

Why this shape: every piece is a **structure lever** (DESIGN §8); every number a player scores
is printed on a tile they physically take; every action is printed where it happens; and the
three complaints of the playtest — station AP, slot finick, invisible paths — are each answered
by the *same* small set of moves rather than three patches.

**How it lands (the shelving's process lesson, taken seriously):** the v3.0-A/B builds died of
display/mechanics drift — built fast, iterated in the engine, never re-anchored to the screen.
Round 3 goes the other way:
1. **Paper first.** One session of the designer + this doc + the printables kit mocked by hand
   (contract tiles = penciled card stock). The K-vs-U call and the Floor re-entry feel are
   table questions; no code until they're answered.
2. **Then one build, spec-complete before coding**: RULES-v3 draft → COMPONENTS-v3 draft →
   `play.html` fork with the board-first UI grammar from the salvage list (glowing stops, picks
   on the pieces). Display and engine land together per feature or the feature doesn't land.
3. **Gates**: the standing set (sim 500 0-crash/0-deadlock · pace 12–25 · ladder ≥60% ·
   render-smoke) plus the targeted reads — vessel-clog/deploy-lock turns vs the v94 baseline
   (the 1c/Tap-cut risk); tick-floor effect on the R9/R10 fast tables and the R25 stalls;
   PATHWAYS spread + the negation test (prestige will read hot — judge by negation, not
   win-rate deltas); contract-row churn rate (no install-and-sit).
4. **Then the human table again**, with the §4 legibility set in cardboard.

**Not changed, and why:** the 2×2 grid + line pairings (v76: Source+Brew is the heartbeat — and
the shelving confirmed the grid-plus-ring IS the game's point); deploy-first (v2.8 — the public
showing stays the price of every sale; SEND inherits it); privileges-pay-owner (v2.3 — both
candidates keep the sharing rule, they change the carrier); the five lanes (no sixth system);
the expansions (Specialty Beers/Jopenbier/Trade Roads ride along — Jopenbier's vintage counter
is the one rider that survives on a cask, and it's the capstone's whole identity).
