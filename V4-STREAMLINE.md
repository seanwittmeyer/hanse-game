# V4 "Bright Beer" — the streamline keystone (plan of attack)

> **Status: PLAN — awaiting designer ruling on the DECIDE list (§8).** Drafted 2026-07-21 off the
> designer's six post-playtest directives. This is a **keystone-scale rebuild** (larger than
> v3.0-A): it cuts the deploy state, the Floor turn, the Hall, and all owner-pays tiles, and
> unifies maturation + value + presence onto the one tally die. Working title *"Bright Beer"*
> (beer clarified in conditioning — the clarity pass). Proposed `KEY hanse-v40`. All numbers ⚙.

---

## 1. The designer's six directives (normalized)

1. **No Floor activation.** The stay-home turn is cut — it added AP and was ignored at the table.
2. **The die is the aging marker AND the value.** A cask's die starts at the printed start value
   (= quality − aging steps), ages up by 1 per age point, and the cask is **Ready when the die
   reaches its quality**. The die is the cask's point value, **hard cap 6** — so buildings can
   lift a humble beer further than a fine one.
3. **All buildings serve everyone; building one pays +3★.** Owner-pays tiles (the Privileges) are
   removed entirely; no ownership tracking. Building actions are drawn from the cask-action verbs.
4. **The Hall is TABLED.** No enshrine, no coins, no prestige lane — for now.
5. **No deploy.** Slots hold **a building and/or a ship (≤1 of each)** — never casks. Activating
   a ship's slot = **load 1 Ready cask from your vessels onto that hull + fire the cask's printed
   action** (cask actions are load bonuses now).
6. **The Floor is 5 fixed spaces: 3 vessel + 2 specialist.** Stations print ONE action each:
   Market *gain 2 goods* · Brewhouse *brew* · Cellar *age +3* · Harbor *commission* (pay `1 G`,
   place a hull from the display, **gain ★ = its capacity**). Ship display widens to **4**, deck
   blends **1/2/3-berth hulls** (a 1-berth sails the moment its single cask boards).
   Recipe faucets: **Bruges' delivery prize + cask actions + building actions** (no Market buy).
   London still grants buildings; **Bergen grants specialists** and keeps the top majority.

---

## 2. What this version IS (the evaluation)

**The one-component game.** The tally die becomes the whole cask lifecycle: set it at brew
(printed start value), turn it up as the beer ages, load it when it reaches quality, lift it past
quality only through buildings (cap 6), park it at the kontor — where its pips ARE the banked ★
and its body IS the majority presence and the end clock. One number is maturation, gate, value,
presence, and clock. That is the strongest component-state statement the game has ever made.

**The cask collapses from 3 states to 2** (maturing → aboard/delivered). Everything the deployed
state carried goes with it: over-deploy, tap-out, souring, the Staithe, slot locality for casks,
rival loading, contestable cargo, deploy-first grammar and both its exception doors. The rules
mass drops enormously; so does AP (stations are single-verb; a line is 2 verbs + ≤2 authored
slot stops).

**The generosity problem is solved by pricing it.** "Why build for rivals?" — because building
pays 3★ now, and you place it on the lines YOU walk. No owner frames, no rent-to-nobody, no
privilege/work split — one green family, one rule.

**The 1-berth hull replaces an entire subsystem.** The Dispatch/charter/contract apparatus
(contracts, fares, the relief-valve rule) is superseded by a *component*: a Skute is a
self-sailing single delivery. Deadlock relief by supply, not rule — exactly the v0.15 lesson
(structure lever, not value lever).

**Kept intact:** the 2×2 + 8-slot Wharf, move-then-activate, row/column choice, the occupancy
toll (§8-D9), sail-when-full, benefits-on-delivery, majorities, the Flight (brewed, (n−1)² min 3),
steerable brew piles, goods-only economy, the dual clock, the warm start, no-money/no-hand
constraints, the sim-gate discipline.

### The honest risks (watch list, in priority order)

- **R1 — Interaction thins.** Lost: contestable deployed casks, rival loading, over-deploy
  denial, privilege authorship. Remaining: the berth race (top off a hull to force a sail),
  the shared building actions + toll, the ship-display draft, majorities. Watch 2p especially
  for solitaire drift. Dials: the toll, majority tiers, display scarcity — NOT new rules.
- **R2 — The win-axis narrows.** The Hall was the uncontested prestige pole of the stated heart
  (volume vs prestige). Tabled, the game scores kontore + engine only. Acceptable for the
  streamline; the seam stays open (§8-D12) — a future Hall can return as a fifth destination.
- **R3 — Untracked points appear.** +3★ builds and commission ★ have no component home (die
  pips only record deliveries). Needs a **score track + cube** in the kit (§7). The hard line
  demands it.
- **R4 — The recipe faucet narrows hard.** No Market buy; recipes flow only from Bruges prizes +
  action verbs. If the faucet under-feeds, the Flight and the brew ladder stall. Dials: Bruges
  prize generosity, verb frequency in the piles/deck, a warm-start recipe deal.
- **R5 — Clock retunes are certain.** Skutes tick the sailed track fast and cheap; dice now
  leave the tray at BREW (the pool is a lifetime brew budget of 14). Both `SAILED_CAP` and
  `PRES_POOL` will need a sim sweep; expect the sailed lengths to rise.
- **R6 — London and Bergen run hot.** London = building + 3★ per delivery; Bergen = specialist +
  the 9/5/2 anchor. Watch both in the first PATHWAYS read; dials are tiers/benefits, not gates.

---

## 3. The die — one number, start to finish

**Start value = quality − aging steps** (printed on the cask tile as a die face). Age points turn
the die up; **maturation stops at quality** (Ready). Buildings may lift the die **past quality at
load time only**, cap **6**. Delivery parks the die showing its face — pips = banked ★.

| Beer | Q | Aging steps | Die starts | Value at Ready | Headroom to 6 |
|---|---|---|---|---|---|
| Gruit | Q1 | **0** (Ready at brew — fresh ale; §8-D1) | 1 | 1 | +5 |
| Hopped | Q2 | 1 | 1 | 2 | +4 |
| Broyhan | Q3 | 1 | **2** (the designer's example) | 3 | +3 |
| Keut | Q3 | 2 | 1 | 3 | +3 |
| Mumme | Q4 | 3 | 1 | 4 | +2 |
| Bock | Q5 | 3 | 2 | 5 | +1 |

- Aging steps are **unchanged from v3.4** (start = Q − ready by construction) — pace holds.
- The Cellarman (−1 step) = **start one higher** (a Bock starts at 3).
- Passive +1 on your turn and the Cellar's 3-point pool both turn dice (any split).
- **Gate checks read the DIE as it boards** (post-building-lift) — one number rules gates and
  value alike (§8-D2). Novgorod's printed scale is cut; its identity = the Q3 gate + the 8/5/2
  majority + its benefit.
- A die in a vessel is out of your tray: **no die in the tray → no brew** (the new physical gate;
  replaces the deploy/vessel-load/Reach gates).

## 4. The turn & the Wharf

1. **Move** orthogonally (from turn 2); choose the station's **row or column**. The `1 G` toll ⚙
   only while sharing the station. *(No Floor option — cut.)*
2. **Resolve the line's 4 stops in any order, all optional:**
   - **Station** — its ONE printed verb: **A Market** gain 2 goods (any mix) · **B Brewhouse**
     brew (pay the recipe into an open vessel; die set to start value; action drawn from the
     quality pile top) · **D Cellar** age 3 points across your vessels · **C Harbor** commission
     (pay `1 G`, place a display hull on a shipless slot, **score ★ = capacity**).
   - **Slot** — fire the building's printed action (if any) **and/or** load THIS hull (if any):
     take 1 Ready cask from your vessels (die ≥ gate after lifts), seat it in the lowest berth,
     **fire its printed load bonus**, sail if full. Empty slots do nothing (author them).

**Ships:** neutral, destination-bound, deck-fed display of **4**. Skute 1 · Cog 2 · Hulk 3
berths ⚙ (deck blend ~6/10/6 ⚙; destination spread weighted as today). Top berth prints the
identity; last cask covers it → sails at once; a Skute therefore sails on its first load. Every
sail (any size) ticks the Sailed-Ships track.

**Cask actions = load bonuses** (drawn at brew from the steerable piles, fired as the cask
boards): *gain 2 goods · age +2 · load 1 more cask · place 1 presence (a tray die, kontor you've
delivered to, parks at face 1 = 1★ ⚙) · gain 1 recipe · gain 1 building (display → any open slot,
+3★) · gain 1 specialist (display) · brew 1*. (Enshrine cut with the Hall; pile gates ⚙ as today.)

## 5. Buildings — one green family

- **Neutral by construction:** anyone's slot stop fires them; builder banks **+3★** at placement
  (score track). No owner, no frames, no rent-to-owner. Placement: any slot without a building;
  overbuild per §8-D4.
- **Two flavors** (the deck ~15–16 ⚙, display of 4 at the Wharf):
  - **Action buildings** (fire on the slot stop — the cask-action verbs): Granary *gain 2
    goods* ×2 · Scrivener's Hall *gain 1 recipe* ×2 · Hiring Post *gain 1 specialist* ×1 ·
    Mission Quay *age +2* ×2 · Almoner's Stall *place 1 presence* ×1 · Brewhouse Annex *brew 1*
    ×1 ⚙.
  - **Load-lift buildings** (passive at their slot — the "improve the humble beer" engine):
    **Malt Kiln** *a cask loading here: die +1 (cap 6)* ×3 · **Cooperage** *ship here: +1 berth*
    ×2 · **Customs House** *ship here boards one gate lower (sells at its die)* ×2 ·
    **Rich Berth** *hull here may sail one short (min 1)* ×1 ⚙.
- **Cut with their systems:** all 12 Privileges · Rope Walk (contracts are gone) · Pilot's House
  · Brewmaster's Workshop (Wilds are gone) · Grain Exchange (Market's any-mix covers it) ⚙.
- Faucets: **London's prize**, the **gain-1-building** verbs (cask + building), nothing else —
  buildings are delivery rewards now, not purchases.

## 6. Destinations, scoring, clocks

| Destination | Gate ⚙ | Value | Prize on delivery ⚙ | Majority ⚙ |
|---|---|---|---|---|
| Bruges | Q1 | the die | **gain 1 recipe** | 4/2/0 |
| London | Q2 | the die | **a building** (display → placed, +3★) | 5/3/1 |
| Bergen | Q2 | the die | **a specialist** (display) | 9/5/2 (anchor) |
| Novgorod | Q3 | the die | **refine** (+2 age points ⚙) | 8/5/2 |

**Score = Σ parked-die pips** (deliveries; presence-bump dice at 1) **+ 3★ per building built +
commission ★ + majorities + the Flight** ((brewed−1)², min 3). Tiebreak: vessel-die sum, then
goods. **Clocks (both public, first fires):** Sailed-Ships ⚙ *retune expected upward* (Skutes
tick fast) + the last tally die parked. `MAX_ROUND` 25 backstop.

**Specialists** (deck n−1, display 4, granted at Bergen/via verbs, **2 seats** per house):
Cellarman (start-die +1) · Grain Factor · Hop Gardener · Stevedore (your ship-slot load sets out
2) ⚙ + up to 2 new designs later. **Cut:** Quaymaster (every load is vessel-direct now) ·
Lagerkeeper (no Floor pool) · Coppersmith (per §8-D6).

## 7. Component consequences (the manifest delta)

**Cut:** the Hall board · all Privilege tiles (12) · charter contracts · owner house tokens ·
cask cubes (coin/launch marking gone) · the cask tile's aging face (the die ages — casks go
**single-faced**: Q pips, printed start-die face, load-bonus action, die seat).
**Changed:** player board → 5 spaces (3 vessel + 2 specialist, §8-D6 covers) · building tiles
lose the owner ring · ship deck adds the **Skute** (2.5×1″ — a lone trigger berth) · display
racks (ships 4).
**Added:** a **score track** strip + 1 cube/house (build ★, commission ★, banked prizes — R3).
**Unchanged:** 14 tally dice/house · recipe cards (double-sided, the Flight) · goods · kontor
mats.

## 8. DECIDE — designer rulings needed (defaults ⚙ marked)

- **D1 · Gruit's zero.** Start = Q−steps gives Gruit 0. Default: **Gruit ages 0 steps — Ready at
  brew, die 1** (fresh ale; nicely thematic). Alt: die seats a printed 0 space, first age → 1.
- **D2 · One number for gates.** Gates read the **die at boarding** (post-lift) — a Kiln'd
  Hopped (die 3) boards Novgorod. Default: **yes** (one-number purity; Customs stays the
  gate-relief). Alt: gates read printed Q only.
- **D3 · Novgorod's scale.** Default: **cut** (value = die everywhere; identity = gate + anchor
  majority + refine). Alt: keep a small printed premium. Watch R6/pathways.
- **D4 · Overbuild.** Default: build on **building-less slots only**; if none open, may replace
  for `1 G` (displaced tile boxed — no owner to pay). Keeps the +3★ from minting via churn.
- **D5 · Commission's free load.** Default: **cut** — commission is pay `1 G`, place, score
  capacity; loading is the wharf's job. (The old free-load/dockside-pickup rules retire.)
- **D6 · Floor covers.** Default: vessel slots 1–2 open, **3rd under a cover; specialist seat 1
  open, 2nd under a cover**; the Flight's 2nd and 3rd distinct brews open them (Coppersmith cut).
  Alt: all 5 open from setup (Flight = score only).
- **D7 · Presence-bump dice.** Default: park at **face 1 and score 1★** (one rule, no zones).
  Alt: a separate 0★ standing row per kontor.
- **D8 · Loading rivals' casks.** Default: **gone by construction** (casks are private until
  aboard). Confirm no replacement is wanted.
- **D9 · The toll.** Default: **keep** `1 G` while sharing a station (the last body-contact rule).
- **D10 · Version.** Default: **v4.0, KEY `hanse-v40`** — this supersedes the v3 line's spine.
- **D11 · Expansions.** Default: **all three toggles tabled** with the Hall (Jopenbier's
  dock-vintage and the Trade Roads' majority-replacement both lean on cut systems); re-derive
  post-v4.
- **D12 · The Hall seam.** Tabled, not deleted: keep `DEST.hall` boxed out cleanly so a future
  prestige destination can dock back in.

## 9. Build plan (phases; each publishes to `main`)

- **P0 — this plan.** Designer rules the DECIDE list → freeze the spec.
- **P1 — RULES.md v4.0** (the spec rewrite; source of truth first), + DESIGN.md §6/§9 entry.
- **P2 — `play.html` rebuild** (`KEY hanse-v40`): DATA (styles gain `startDie`; ship deck +
  Skute, display 4; buildings table rebuilt; DEST prizes; Hall/privileges/contracts/deploy state
  out) → turn machine (single-verb stations; slot stop = building act ∧/∨ load; no
  Floor/deploy/dispatch subs) → scoring/clocks. Then the harness: sim bot re-taught the new
  `UI.sub` map; **`verify-v4.js`** (~40 targeted checks: start dice, ready-at-Q, cap 6, +3★,
  commission ★=capacity, Skute insta-sail, gate-reads-die, faucets, tray-gates-brew, clocks).
  **Light gate** per standing rule: verify + `sim.js 3`, crash-free.
- **P3 — COMPONENTS.md** manifest rewrite (§7 delta).
- **P4 — the kit**: `components.js` faces (single-faced casks w/ start-die + action; Skute;
  owner-less buildings; 5-space player board; score track; pull the Hall/privilege/contract
  sheets) → `printables2.html`, then `index.html` + `learn.html`.
- **P5 — on the designer's call:** full battery (sim 500 · PATHWAYS · ladder rebuild for the MC
  tiers, whose `legalActions` shrink dramatically) + the clock/faucet retune sweep (R4/R5/R6).

*(AI note: the greedy bot and fast tiers land in P2; the Guildmaster/Cellarmaster rebuild is P5 —
the search space is much smaller, so they get simpler and stronger.)*
