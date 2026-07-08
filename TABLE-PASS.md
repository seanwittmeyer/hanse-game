# The Table Pass — one stop, one seal (the v3.0 exploration)

> **Status: EXPLORATION (2026-07-08) — no rules changed.** Direction-setting off the 2026-07-07
> physical playtest. The brief, in the designer's words: the stations are "too much" (multiple
> options, some multiple actions); deploy-to-anywhere confused the table; the slot stack
> (building + ring + ship + casks + markers + dice) is "a lot" and building swaps force die
> re-calculation; the web build hides all of this — *"the digital game and its hidden states and
> automatic calculations are effectively cheating."* Also: the Hall and the Flight went
> under-explored, shipping stalled, presence/majorities read as the primary goal. Constraint:
> **"We don't want the game to be simpler — we want the decisions to be more strategic between
> easy-to-understand paths that are a puzzle to explore."**
>
> Everything here is a candidate, ⚙ throughout. The recommendation is §6.

---

## 0. The lens: what the table actually pays for

Two currencies the digital build never charges:

1. **Reading cost** — every option printed on a station face, every piece stacked on a slot, is
   re-read every turn by every player. A menu that is one `<div>` on screen is a paragraph of
   iconography on cardboard.
2. **Bookkeeping cost** — every number not printed on a component must be computed, remembered,
   or re-derived. The demand die is *set* (printed ★ + premium, cap 6), *bumped* (at the sail,
   cap 6), *owner-checked*, and *previewed* (players pre-set dice under deployed casks, then
   re-figure them when the building changes). That is arithmetic-as-upkeep — exactly what v2.3
   declared against: *"complexity from strategy, not analysis."*

The founding lesson (DESIGN §8) applies to both: **"Content, not rules — depth belongs in
placement, timing, interaction… not in action complexity."** v0.7 reeled the game in once; the
stations have quietly re-grown since (v1.4.1 Cellar menu · v1.7 Specialists-at-Cellar · v0.16
contracts · v2.6/v2.8 commission wizard). This pass is that lesson applied a second time.

---

## 1. Theme 1 — line activation: the audit

What a station face actually holds today (from `play.html` `STATION_ACTS` / `cellRender`):

| Station | Printed face today | Decision shape at the table |
|---|---|---|
| **Market** | take 2 goods OR acquire ONE tile: recipe · Building (buy **+ place**, maybe overbuild) · **ship commission** (pick of 3 hulls → placement, incl. dockside pickup → **free load**, incl. rival/vessel) · charter contract | 1 choice fanning into 4 shops, one of which is a 3-step wizard |
| **Brewhouse** | Brew (recipe × steerable pile) **AND** Deploy (pick cask → **any** open slot) | two actions, one with an 8-slot scan |
| **Cellar** | a chaining ANY-ORDER menu: Age (3-pt pool, allocate) · **Tap ×N** (each fires a whole sub-action) · buy a Specialist · Blend (exp) | a subgame; the worst offender |
| **Harbor** | ONE of: Load (any deployed cask → any ship) · Enshrine · Charter (2-stage) | one-of-three, but each is a wizard |

A line = **2 of those paragraphs + 2 slots, resolved in any order, all optional**. That's the AP
the table felt. The slots themselves are already right — one thing each (deploy / cask action /
ship load). The stations are the bloat.

## 2. Proposal A — one verb per station; slots act on themselves

### A1. The four faces (each ONE decision, at most a this-or-that)

- **Market — SOURCE.** `Take 2 goods OR buy 1 tile.` (The designer's own example — kept.) The
  four displays (recipes · Wharf tiles · ships · contracts) stay the *variance* surface
  (Orléans-lite, per the no-dice constraint); the station face is one binary. The **commission
  wizard shrinks** because placement work moves to the tile: commission = pay 2G ⚙, put the hull
  on a legal slot; the **free load happens only if placed as a dockside pickup** (the cask under
  it boards) — the separate free-load picker is cut. One gesture: *buy the boat, drop it on the
  dock (on a cask if you like).* ⚙
- **Brewhouse — BREW.** `Brew 1 cask.` Deploy leaves the station entirely (A2). One verb; the
  face-up brew piles carry the steer.
- **Cellar — AGE.** `Age 3 points across your vessels OR fit 1 Specialist.` **Tap is cut from
  the base game** (A3); Blend rides in only with Specialty Beers (the expansion adds a third
  or-branch — opt-in complexity on the spine, like everything else).
- **Harbor — SHIP.** `Send ONE deployed cask: onto a docked ship (free) · to the Hall (Enshrine,
  Q2+) · by Charter (contract + 2G ⚙).` One decision — *which cask, which route.* The three
  verbs collapse into one grammar ("sell one barrel"); Stevedore = send two ⚙; Quaymaster
  unchanged (reach your vessels).

The two-tier reach rule that makes this teachable in one sentence:

> **Slots are local; stations reach the whole wharf.**

### A2. Slot stops act on their own slot (the deploy fix)

The table's complaint — "you activate Deploy *here* but deploy *anywhere*" — is solved by making
every slot stop self-referential:

- **Empty slot stop** → deploy one Ready cask **onto this slot**.
- **Cask slot stop** → that cask's printed action (unchanged). If the cask is a **Q1 and you hold
  a Ready Q4+**, you may take this stop as **spoilage-deploy instead**: dump the stale Q1, your
  premium cask takes this berth (the v2.9 rule, now expressed as an either/or on the stop).
- **Ship slot stop** → load one cask onto **this ship** (already true today).

What this buys: the 8-slot deploy scan disappears; *where you work is where your cask lands*, so
the move choice — which line, whose buildings, which empty slot — becomes the strategic decision
the designer wants sharpened. Placing your privilege beside a line you'll actually fire (the
v1.0 heart) gets *more* load-bearing, not less.

What it costs, honestly:
- **Deploy throughput drops** (you need a line with an open slot). The v1.3 lesson looms: deploy
  friction once seized the whole wharf (slots jam → vessels back up → brewing stalls). Since
  then three valves exist (spoilage · Charter · Enshrine) and the Harbor's unified SEND drains
  slots faster. **This is a sim question, not a debate** — gate: 0 deadlocks, pace in band,
  vessels-clogged-turns not up vs baseline. If it seizes, the release valve is the Brewhouse
  regaining `…OR deploy 1 cask (anywhere)` as its or-branch — still one decision per station. ⚙
- The **deploy-then-fire combo** (drop a cask onto another pending stop, take its action this
  turn) dies by construction. Verdict: a cute trick traded for a teachable grammar — good trade.

### A3. Tap is cut; the Floor absorbs its job (and becomes the line you BUILD)

Tap existed to (a) relieve vessel clog, (b) cash a held cask's action, (c) recall a cask off a
slot. Under this pass: (b) **is the Floor** (every held cask's action, without discarding — 
strictly more interesting); (c) is spoilage + the Harbor's send; (a) is the risk to watch (same
sim gate as A2). Cutting Tap removes a menu, the multi-tap rule, and the modified-action-recall
edge case in one stroke.

And one addition that turns the Floor from a dodge into a destination — **Specialists become
Floor stops where their verb allows** ⚙: the Lagerkeeper *is* an age stop, the Grain Factor a
source stop, the Stevedore a load stop… (pure passives like the Coppersmith stay passive). The
Floor then reads as **the line you built** — vessels + hired specialists + flipped Wilds — and
"fit 1 Specialist" at the Cellar visibly lengthens your private line. The wharf-vs-Floor fork
(the Deep Regrets fork) sharpens by itself: four small public stops on a contested line vs your
own N-stop private line. *I need both; I can only have one now.*

---

## 3. Theme 2 — the slot stack: the audit

What one slot can physically hold today: a **building tile** + its **owner ring** + a **ship
tile** (destination printed) + up to **3 cask cards** in berths, each with an **owner marker** +
a **demand die** (set at load: printed ★ + Q4/Q5 premium, cap 6; bumped at the sail, cap 6;
owner-only) + a **quality-boost marker** (kiln/gauger lifts) + (capstone) a **vintage counter**.
Nine piece-classes, two of which carry *computed* numbers.

The die's actual job is small: **carry one number from the slot to the destination** (capture-on-
ship-through). Everything else — the premium addition, the max-6 clamp, the owner check, the
sail-bump — is arithmetic layered onto that carry. And the "re-calculate on swap" pain is the
*preview*: by the rules nothing recalculates (capture happens at load), but a physical table
naturally pre-sets dice under deployed casks, and every overbuild invalidates them. A memory
device that *looks* live but is rules-frozen is the worst of both.

## 4. Proposal B — three tiers, from a component swap to an architecture fork

### B1 · SEALS — kill the dice, keep the keystone (recommended first move)

Each **Privilege comes with matching seal tokens, its bonus printed on them** (Staple Hall seals
read `+3★`; Bruges Hanzehuis `+4★ Bruges`; Connoisseur `+4★`, Q4+-gated by its tile text…).

- **Load a cask from your privilege → take one of its seals onto the cask card.** The seal *is*
  the die: no setting, no adding, no cap rule, and **nothing ever recalculates** — the seal
  physically left the tile; what happens to the slot afterwards is visibly irrelevant. (The
  capture-on-ship-through moment becomes tactile instead of remembered.)
- **The Q4/Q5 premium becomes the seal's second face** ⚙: seals are two-sided — plain side `+3★`,
  gilt side `+5★ (Q4+)` (values pre-summed at print time). Ship a premium cask → flip the seal
  gilt-up. Zero arithmetic; the climb still pays (v1.8 preserved).
- **Ship-berth privileges (Rich Berth · Festkeller) hand their seal at the sail.** Cap rule
  becomes physical: **one dock seal + one berth seal max per cask** ⚙ (replaces "a real d6, max
  6" — scoring = read the destination row, add at most two printed chips).
- **Quality lifts stay markers** (they already were — the kiln's `+1Q` collar); rename for
  language consistency, nothing else changes. Delivery = destination row (at effective quality)
  + seals. The Hall, majorities, the Flight: untouched.

Cost: ~2 seals per privilege copy ≈ **20 small tokens replacing 8 dice + the die rules text**.
Rules deleted: die-setting, the cap-6 clamp, set-not-accumulated, the bump. The engine change is
narrow (capture stores a seal ref instead of a summed number; the sail adds a berth seal instead
of bumping) — fully sim-gateable.

Note what B1 restores: **hard constraint §3 says "No dice."** The demand die always skirted that
(a counter, not a randomizer) — seals put the box back in compliance with its own spine.

### B2 · Score-at-the-source (pay the privilege when the cask deploys/ships, nothing rides) — REJECTED, with reasons

Tempting (zero tokens: bank the ★ on the track the moment your cask ships from your tile), but:
kontor charters lose their routing identity (a Bruges Hanzehuis that pays regardless of where
the cask goes isn't a Bruges privilege); hijack interactions invert (a rival ships your cask —
you already scored, so the theft stops mattering); and it breaks the story that the kontore's
*variable value* is the thing you author. Keep on record as the fallback if seals still read as
too much at the table.

### B3 · The Contract Row — buildings transform-only; demand moves to the destinations (the architecture fork)

The designer's deeper probe — *"are there other ways to manipulate the core loop through
buildings that don't impact cask value?"* — taken seriously:

- **Every slot tile becomes a Building (a work)**: quality (kilns · the gauge), tempo (age on
  dock, goods on deploy), logistics (capacity · gates · Cooperage), standing (reach). The slots
  get radically cleaner — building + occupant, no value layer, nothing rides any cask, ever.
- **Variable value moves to a face-up CONTRACT ROW at the destinations** ⚙: small demand tiles —
  *“Novgorod wants Q4+ · 6★” · “London wants Keut · 4★” · “any kontor, 3 different beers · 7★”* —
  claimed on delivery, refilled from a deck. Delivery = kontor base + the contract you claim.
- What it buys: the cleanest possible table (the whole pile-up gone at the root); a **visible,
  legible demand race** (a face-up row everyone reads — the exact opposite of last night's
  invisible die-planning); a natural home for **set-collection contracts** = a new-feeling lane
  without a new system.
- What it risks: **this deletes the Authorship/Demand keystone as built** — you no longer *build*
  the demand, you race for printed demand. The pre-v1.0 demand-board detour is the standing
  caution (install-slots froze and died); a contract row must be *churning* (claim → refill), not
  install-once. And v1.0 §9 records why fixed/destination-side value was abandoned — the answer
  then was "not living." A refreshing market is living, but it is a **different game** on this
  axis.
- **De-risk path if wanted: prototype it as an opt-in module on the expansion spine** (exactly
  how The Trade Roads was proven) — a toggle that retires privilege scoring and deals the
  contract deck. A/B it at the table against B1 before any base-game decision.

---

## 5. The paths problem (Hall & Flight unexplored; majorities felt primary)

Last night's fixation on presence/majorities is *diagnostic*, not preferential: majorities are
the one lane with a **physical scoreboard the whole table reads** (colored squares on the
destination board). The demand lane's plan lived in un-plannable dice; the Flight is end-game
invisible; the Hall is a purple box with no trophies. Legibility is the fix — not new lanes:

- **Flight milestones** ⚙: the player board already prints the Flight strip — give the 3rd/4th/
  5th distinct beer an immediate small printed perk (goods · a Reach · a free seal…). Mid-game
  feedback makes range a *plan* instead of an end-game surprise.
- **The Hall becomes a shelf** ⚙: enshrined casks physically sit on the Hall's rung-shelves as
  trophies (they already leave the game — give them somewhere to be seen). Rivals' Bocks on the
  9-shelf sell the lane better than any rules text. Values stay put per the pole test (a hot
  lane is fine; only negation triggers a retune).
- **No sixth lane.** Five complete paths at this weight is the right count; B3's contracts (if
  ever taken) *re-express* the demand lane rather than adding one. The pole test is the standing
  bar: fine lines between Floor↔wharf and Hall↔kontore↔charter are healthy tension — rebalance
  only when one pole negates another.
- Beer texture: the table's read matches design intent — base beers are rungs, specialties are
  characters (v1.9's own diagnosis). Direction, not action: fold the *specialty-beer texture*
  standard into any future base-roster revision (more printed identity per beer), don't grow the
  base rules.

---

## 6. The recommendation (opinionated)

**v3.0-candidate = A + B1 together, one KEY, full gates.** They are one idea — *everything you
can do is printed where you do it, and every number you score is printed on a chip you're
holding*:

1. One verb per station (A1) — incl. the unified Harbor SEND and the shrunken commission.
2. Slots act on themselves (A2) — deploy is local; spoilage is the either/or on a Q1 stop.
3. Tap cut; Specialists become Floor stops (A3) — the Floor is the line you build.
4. Seals replace dice (B1) — two-sided for the premium; one dock seal + one berth seal.

Then playtest THAT, and only then decide whether B3 (the Contract Row) is the v4 conversation —
prototyped as a spine module, never as a base-game leap of faith.

**Sim plan (all ⚙ before any human table):** the standing gates (sim 500 0-crash/0-deadlock ·
pace 12–25 · ladder ≥60% · render-smoke) **plus** three targeted reads: (i) vessel-clog turns
and "no open slot" frequency vs v94 baseline (the v1.3 seize watch, A2/A3's risk); (ii)
seals-vs-dice scoring parity on identical seeds (B1 should be near-identity); (iii) PATHWAYS
lane spread + the pole/negation test (the Floor-as-built-line buff needs the watch-item from
DESIGN §9 re-read). Table-only questions: does the one-verb Harbor feel like a loss of freedom
or a relief; do Flight milestones over-steer; does the Hall shelf pull enshrines up on its own.

**What we did NOT change and why:** the grid & line pairings (the v76 lesson — Source+Brew is
the heartbeat); deploy-first (v2.8 — the public showing stays the price of every sale); the
sharing rule (v2.3 — privileges pay owners, works serve all: seals change the *carrier*, not the
rule); the clock; the five lanes.
