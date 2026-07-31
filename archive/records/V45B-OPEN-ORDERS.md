# V4.5b "Open Orders" — the #24 program (designer-ruled 2026-07-31)

> The designer's rulings off gatekeeper review #2 + playtest #24, with his caveats absorbed:
> #24 over-weights one game (the double goods-specialist stack, a 3-tile specialist display,
> both Mission Quays dealt, an AI blind to distant goals) — so the moves below are structural,
> not value-tuned to that single table. Implemented as the completion of **v4.5**
> (KEY `hanse-v45b`). Tabled from the review: pile-top pick-of-two (§8.7) · dead-prize patch
> (§8.8).

## Plan of attack

1. **Commission de-mint** — the ★=berths income is CUT; the commission's reward IS the
   instant load (v4.4's free load stands). Commissions bank nothing.
2. **Auto-aging CUT** — dice turn only when something turns them. The Cellar stays at **3**
   (designer-ruled; no compensation raise). The aging looseners stay in the box: Mission Quay
   (+2), the Age+2 load bonuses, the Cellarman (fewer steps), and the new **Braumeister**
   specialist (a rules-clean auto-age replacement you must EARN).
3. **The dice pass** — the building deck's center of mass moves to die-manipulation (list
   below), balanced against the whole Source→Brew→Age→Ship loop: aging support kept (MQ ×2),
   goods faucets thinned (the economy was loose), the lifts kept, one **ephemeral** trial
   design (the designer's Orléans-events idea: a building that SAILS AWAY with its ship,
   paying the players who contributed).
4. **Specialists** — deck of **max(2, n−1)** copies/type (2p stops being literally thin);
   **5th design: Braumeister**; and (designer-ruled) **Bergen grants at most ONE specialist
   per ship sailed** — later casks on the same hull get no specialist prize (the per-die
   expansion is a recorded dial).
5. **LADINGS — the new order layer** (the designer's pick, and the Hall's spiritual
   replacement). Design answer to his question: they are **both** — each lading is a tile
   with a printed fixed reward, but the face-up **row of 3 makes every kontor's delivery
   value a variable economy**: the row is what turns "which prize do I want" into "Bruges
   for the recipe or London for the 4★ order?" Claim = deliver a qualifying cask (die/beer
   condition) at the named kontor; the tile comes to you (the record), the ★ bank at once;
   the row refills at END of turn (the v4.4c rhythm). One lading per delivered cask.

## The digest — what changes on the table

**CUT:** commission ★ income · automatic aging · Brewhouse Annex (echo verb) · one each of
Granary/Scrivener's/Cooperage/Customs/Malt Kiln (deck rebalance below).

**NEW COMPONENTS:** the **Ladings** deck (15 ⚙, row of 3) · 5 new building designs ·
the Braumeister specialist tile (n-scaled copies).

**THE BUILDING DECK (17 ⚙) — 8 of 17 touch a die (was 3):**

| Building | Qty | Fires | Effect ⚙ | Fee ⚙ |
|---|---|---|---|---|
| Granary | 1 | slot stop | gain 2 goods (any mix) | — |
| Scrivener's Hall | 1 | slot stop | gain 1 recipe (its fee) | 1G |
| Mission Quay | 2 | slot stop | age +2 (your vessels) | — |
| Hiring Post | 1 | slot stop | gain 1 specialist (its fee) | 1G |
| Almoner's Stall | 1 | slot stop | place 1 presence (a tray die) | — |
| **Racking Hall** | 1 | slot stop | **swap the dice of two of your maturing casks** | 1G |
| **Assay House** | 2 | slot stop | **turn one of your maturing dice ±1** (≤ quality, ≥ start floor 1) | 1H |
| Malt Kiln | 2 | on load | boarding die **+1** (cap 6) | 2G |
| **Hop Exchange** | 1 | on load | **may pay 1H → boarding die +1** (cap 6; stacks after a Kiln route) | 1G1H |
| **Tollhouse** | 1 | on load | **may turn the boarding die −1 (min 1) → bank +2★** (pips for track) | 1G |
| Cooperage | 1 | passive | ship here +1 berth | 2G |
| Customs House | 1 | passive | ship here boards one gate lower | 2G |
| Rich Berth | 1 | passive | hull may sail one berth short (min 1) | 2G |
| **Bonded Store** *(ephemeral trial)* | 1 | on load / at sail | boarding die **+1** (cap 6); **when the hull here sails, the Store sails with it** (boxed) and **every player with a cask aboard gains 2 goods** | 1G1H |

**THE LADINGS (15 ⚙ · row of 3 · claim on a qualifying delivery · refill end of turn):**
Bruges — die 3+→2★ · die 4+→3★ · Keut→3★ · die 5+→4★ · London — die 4+→3★ · die 5+→4★ ·
Broyhan→3★ · die 6→5★ · Bergen — die 4+→3★ · die 5+→4★ · Mumme→4★ · Novgorod — die 5+→3★ ·
Bock→4★ · die 6→4★ · any-kontor die 6→3★. *(Novgorod's run lean — its +2 premium already
pays; the whole schedule ⚙.)*

**THE SPECIALISTS (5 designs · max(2, n−1) copies · Bergen ≤1/ship):** Cellarman 2H ·
Grain Factor 1G · Hop Gardener 2H · Stevedore 1G · **Braumeister 1G1H — at the start of your
turn, your ripest maturing cask ages +1** (deterministic: the die closest to Ready; the earned
heir of the cut auto-age).

**Scoring spine after the de-mint:** deliveries (the die, once) + builds (+3★) + bumps (1★)
+ **ladings** (printed ★) + majorities + the Flight. Commissions pay in tempo, not points.

## The volume-vs-quality question (designer's standing worry)

Is there a real volume path? After this program the answer is *structurally yes, and now
throttled honestly*: with auto-age cut, **brewing is the volume line's rate limit** (Gruit is
Ready at brew — zero aging; Hopped needs 1 point) while **aging is the quality line's**
(Bock needs 3 points routed through Cellar/MQ/Braumeister). Volume pays through bumps,
low-die ladings (die 3+/beer orders), Bruges/London majorities, and the Flight; quality pays
through pips, Novgorod's premium, high-die ladings, and Bergen's anchor. The 12-die pool
prices both: volume spends dice fast (races the clock it benefits from), quality spends few
(but must FINISH before a volume player empties a tray). The PATHWAYS oracle (majority
persona ≈ volume · lifter ≈ quality) is the standing gauge — read after this program lands.

## Gates & the oracle plan

Light gates on landing (verify + sim). Then the short PARALLEL oracle (sim/personas/MC
shards concurrently), AI revision from its reads (greedy + MC tiers taught: no commission ★,
lading targeting, rack/assay/toll/hop-exchange use, Braumeister), then the FULL battery as
parallel background agents (sim 500 · PATHWAYS 200 · ladder shards · render-smoke).
