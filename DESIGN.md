# Brewhouses of the Hanse — Design (v1.8 “Quality Pays”)

> The working design doc: **why the game is the way it is**, the **current architecture**, the
> **change log**, and the **balance lessons** carried forward. Operational rules live in
> `RULES.md`; the manifest in `COMPONENTS.md`; the active plan in `PLAN.md`.
>
> **This file was compacted (2026-06-16).** The full pre-v1.0 design record — every dated
> session log, the v0.5/v0.6 reach-vs-standing architecture, the blow-by-blow v0.7→v0.16
> epilogues, and the old standalone `CHANGELOG.md` (now folded in below, §9) — is preserved
> verbatim in **`archive/v0.16/DESIGN.md`** and the **`archive/main-v0.16.1`** branch. Nothing
> is lost; this is the slim, current version.

---

## 1. Snapshot

|               |                                                                                   |
|---------------|-----------------------------------------------------------------------------------|
|**Players**    |2–4                                                                                  |
|**Length**     |≈ 45–60 min at 2p · medium                                                          |
|**Genre**      |Medium euro · engine building · shared action grid (the Wharf) + private brewery    |
|**Weight**     |*Great Western Trail / Distilled* — not Lacerda                                     |
|**Theme**      |A merchant brewing house in the Hanseatic League, c. 1350                           |
|**Status**     |**v1.8 “Quality Pays”** — live; **`play.html` implements it** (value-Buildings now reward the quality climb — a premium cask banks +2★/+3★ at Q4/Q5; the keystone rebuild + demand-dice tracking + printables-tile UI shipped earlier; v1.5 added three private improvements). |

---

## 2. Design pillars (the north star)

1. **The mechanic *is* the theme.** Hopped beer survives the voyage → it *is* the export cargo.
   Nothing is bolted on.
2. **The squeeze is the soul.** *You can't brew everything, and you can't deliver everywhere.*
   Choosing your beers and your destinations is the game.
3. **Crisp turns, deep decisions.** Medium weight: actions are simple; depth lives in placement,
   timing, routing, and interaction — not in turn length or rules mass.
4. **Interaction through a shared board, never take-that.** Occupancy and the living slots
   reshape everyone's options; pressure, never a hard-lock.
5. **Legible scoring.** A player can name how they're winning. Clarity is a feature.

## 3. Hard constraints (solved thematically, not worked around)

- **No dice** — fully deterministic; the managed-uncertainty seat is the *steerable* variance of
  the building/recipe displays and the cask-action draw (Orléans-lite), not randomness.
- **No cards-as-hand** — all cardlike content is tiles (the action system is on the board).
- **No money** — pre-modern barter: **goods (grain `G`, hops `H`) are the only currency;**
  reputation/standing is earned, unspendable score.

## 4. Theme & who you are

c. 1350, the Hanse at its height; Hamburg was literally *"the brewhouse of the Hanse."* The
pivotal innovation is **hopped beer**, which (unlike perishable gruit ale) survives a sea voyage
— a preservable, shippable export. You run a **merchant brewing house**: source grain & hops,
brew, age, and push casks across the Baltic/North-Sea network to the great trading posts
(**kontore** — Bruges · London · Bergen · Novgorod) for value and majorities, or withdraw your
finest into the local guild **Hall** for prestige. The deeper axis is **reach vs reputation**
(industrial Leffe vs Trappist Westvleteren), pulled back into the 14th century.

---

## 5. Design lineage & comps

The target depth and the lessons we steer by (the soul-review the designer ran early in v1.0):

| Comp | Its soul | What we take |
|---|---|---|
| **Lisboa** (Lacerda) | a relentless multi-use squeeze + system interlock | the **cask squeeze** as the soul; the **living slots** as the interlock |
| **Great Western Trail** (Pfister) | a player-built track; tempo; win by several engines | **owned buildings author the shared board**; the **five lanes** |
| **Orléans** (Stockhausen) | steerable variance (bag-building) | the **building/recipe displays + cask-action draw** as managed, not random, variance |
| **Agricola** (Rosenberg) | one rule → a whole decision economy; scarcity/blocking | scarce **vessels/slots/ships** + the **occupancy toll** + clogged-vessel back-pressure |
| **Wingspan** (Hargrave) | a compounding engine; a content spine; "one more turn" | **transform-buildings** + a **building deck** of content under one grammar |
| **Obsession / Viticulture / Unconscious Mind** | theme-mechanism fusion; an approachable bridge | hopped-beer-as-cargo + the **legible scoring spine** |

**Differentiation:** "monks/houses brew beer" is occupied (*Ora et Labora*). Our distinct
ground is the **economic philosophy** — reach-vs-reputation across a beer-trade network —
expressed through the **dual-role cask** and the **player-authored living slots**.

---

## 6. The current architecture (v1.6 “Hops”)

Canonical detail is in `PLAN.md` / `RULES.md` / `COMPONENTS.md`; the shape:

- **The Wharf** — four stations (A Market·Source → B Brewhouse·Brew → D Cellar·Age →
  C Harbor·Ship) ringed by **8 slots**. Move orthogonally, activate a row/column, resolve up to
  4 stops (slot·station·station·slot); occupancy toll (or the **Floor**, below).
- **The dual-role cask** — quality Q1–Q5 + a slot-action; three states: maturing (private) →
  deployed (public, contestable) → delivered (scored, gone).
- **The keystone — living, composable slots.** A slot holds a **building** (owned modifier) and
  an **occupant** (a cask, or a ship that holds casks): *dock → building → ship → cargo.* A
  building, under one grammar — *"it modifies the occupant docked on it"* — either **boosts a
  delivery's value** (the variable "demand") or **transforms** the occupant (quality / cargo /
  route). **Owned-but-shared:** the owner benefits most; rivals may route through for less + a
  small points "wharfage." Buildings replace v0.16's goal tiles, neutral buildings, and most
  upgrades — one content family under one rule. **A line is half-fixed (its two stations) and
  half-emergent (its two slots), so your engine *grows into the board*** — placing a building
  beside a high-traffic line is the core optimization (the heart of v1.0).
- **Legible scoring.** *In-game:* **Hall enshrine = fixed** (the beginner floor, ladder 3/5/7/9) ·
  **kontor deliver = variable** (base + the value-buildings shipped through, captured-on-ship-through
  onto a **reusable demand die** that rides the cask in the berth — pips = the ★ banked on delivery;
  `COMPONENTS.md §2`). *End-game:* **majorities** (delivered-cask count) + **the Flight** (distinct
  **beers**, (beers−1)², min 3).
- **The five lanes — each a complete path** (no half-measures; braiding emerges, it isn't a
  goal): **Prestige/Hall · Demand/value · Volume/majority · Range/Flight · Authorship/engine.**
- **The Floor** — a private line you may run instead of a grid line, powered by your built-up
  brewery (engine payoff + the boutique brewer's self-sufficiency; `PLAN.md` §1B).
- **Kept from v0.16:** ships sail-when-full; the Charter relief valve (scarce contracts); the
  Sailed-Ships end clock; the no-dice/cards/money constraints.

---

## 7. The tooling (how we verify — unchanged through v1.0)

- **`playtests/sim.js`** — drives the *canonical* `play.html` engine headlessly (extract the
  script, run in a `vm`, append a bot in-scope). The **robustness/pace gate**: 0 crashes / 0
  deadlocks across 2–4p, pace in the 12–25-round band. `PERSONAS=1` / `CELLAR=N` commit bots to
  the lanes (the **strategy** oracle — the greedy bot can't judge leans). `sim-analyze.js` =
  openings/timing/sequencing.
- **AI seats** (`AUTOMA.md`): Apprentice / Journeyman / Trader / **Guildmaster** (flat Monte
  Carlo, fast oracle) / **Cellarmaster** (v1.2 — deep Monte Carlo: competent trader+completion-biased
  rollout, determinized decks, sequential halving; beats the GM ~62%). Gates: `ai-ladder.js` (every higher
  tier ≥60% at 2p; the GM & Cellarmaster rungs **sharded**) + `ai-render-smoke.js`. `ai-tune.js` (CEM over
  the Trader weights) re-runs after a balance pass.
- **After any engine change:** bump the save `KEY`, run the gates, save the sim output, publish
  to `main`. *(These harnesses target the v0.16 engine; they'll be re-pointed as v1.0's
  `play.html` is rebuilt.)*

---

## 8. Balance lessons carried forward (the distilled gold)

Hard-won across v0.9→v0.16; they constrain every future change:

- **"No pure path wins."** Balance the *leans*, and measure them with **persona-committed bots**
  (`PERSONAS`/`CELLAR`), never the greedy bot — which is a robustness/pace oracle only and
  systematically under-pilots prestige & deep.
- **Correct *friction* with a *structure* lever, not the *value* lever.** (v0.15: a free local
  Enshrine was fixed by a *structural* throttle — deploy-first, contestable — not a fee.)
- **Bock *total* cost is the WRONG lever for the deep-lane imbalance.** The 3G3H probe (raising the
  TOTAL to 6) was tested and rejected twice (it re-breaks Q5 reachability and the AI ladder, and
  doesn't fix the imbalance). The real axis for that is **Hall-side vs kontore-side.** *(v1.6 nuance:
  shifting Bock's **ratio** while holding the total — 3G2H → **2G3H** — is a different, safe move; it
  was done to give **hops** a demand, not to retune the deep lane, and sim confirmed Q5 timing & the
  ladder held. The lesson stands: don't raise the **total**.)*
- **Majorities reward shipping WIDE** (presence = cask count) — "go for majorities" is a *volume*
  play, not a concentrate-on-one specialist. Big majorities tilt the game to the kontore, so the
  **Hall needs a matching prestige curve** to stay balanced.
- **When the incentive is backwards, find the rule that inverted it** — don't pile on relief
  valves. (v0.16: three patches collapsed into one loop once benefit went back to delivery.)
- **A "sail full" rule structurally lengthens the game;** the clock (`SAILED_CAP`) is the
  round-count lever, not the ship rules.
- **Fixed turn order has a real first-player edge;** **seat compensation (+1 `G` per later seat)**
  + free opening placement flatten it.
- **Content, not rules.** Depth belongs in placement/timing/interaction and a deck of content
  under one grammar — not in action complexity (the v0.7 reel-in is the founding lesson).

---

## 9. Change log (compact — full rationale in `archive/v0.16/DESIGN.md`)

### Parking lot — recorded for future discussion (NOT yet decided)
- **Asymmetric starting improvements (variable powers).** Deal each player **two** improvements; they keep
  **one** as a starting private power. Turns the (now symmetric) improvement set into an opening-asymmetry /
  replay lever. Needs: a power set balanced enough that any pair is fair, and a draft/keep-one rule. Open.
- **Starting building — does it help me or the table?** Each house starts with **1 random Building in hand**
  to author turn 1. Concern: a building I place is a **shared slot** — if I can't get my own cask onto it
  (timing/contention), it can help rivals more than me, and the random tile may not fit my plan. Options to
  revisit: deal a **choice** of starting buildings (draft), or make the opening building **self-favoring**
  somehow, or drop the random start. Open — tie into the asymmetry discussion above.


**v1.8 “Quality Pays”** *(2026-06-19, `play.html` KEY v66)* — **Uncapped the value-Building bonus to reward the
quality climb.** Base kontor values are tiny (Bruges/London/Bergen = 1), so the in-game points live in the
**value-Buildings** — but those were **flat** (Staple +3, charters +4, Connoisseur Q4+→**flat 4**), so a Q5 Bock
banked the same demand as a Q1 Gruit. Quality only paid at Novgorod/Hall → the climb looked unattractive (the
persona oracle confirmed it: even the *deep* lane delivers only ~0.5 Q5/game). Fix: a value-Building now adds a
**quality premium** on top of its printed ★ — **+1★ per tier above Q2, gated at Q4** (Q4 +2★, Q5 +3★). Gated at
Q4 so it rewards the **climb**, not the cheap Q3 volume game; the Hall’s reliquary is excluded (its 3/5/7/9
ladder already scales). A Bock through a value building is now worth its investment — e.g. Bruges base 1 +
Staple 6 + a Rich Berth 2 = **9**. **Sims (persona oracle, 400×3):** lane win-rates & pace hold at **baseline**
(the earlier *ungated* +1-per-tier version leaked into the volume lanes — majority 34→49% at 2p — so it was
re-gated to Q4+); the **quality ceiling rises** (3p winner-max 74→92) while the median is flat (+1). The greedy
bots still don’t *climb* (a known blind spot — the payoff is for human/Cellarmaster play); the sim’s job here
was to prove **no regression**, and it does. *(Parking lot: if play shows the climb still under-rewarded, the
next dial is a steeper premium or scaling the Rich-Berth/Festkeller ship value too — not the base values.)*

**v1.7 “Even Footing”** *(2026-06-19, `play.html` KEY v64)* — A pre-playtest balance/feel pass, grounded in
the v63 strong-AI study (CM/GM/Trader, 900 games + the persona oracle). Four changes: **(1) Seat compensation
REMOVED (`SEAT_COMP` 1→0) — equal starts.** The +1 `G`/later-seat comp was tuned to the *greedy* bot's
first-mover edge, but the strong-AI mirrors showed it OVER-corrects under skilled play (second player won
**~67–72%** at 2p, later seats favored at 3p). P1's turn-1 (choose the line, place + activate the warm Gruit
for 2 goods, no toll) is compensation enough. **(2) Improvements are CHEAPER (−1 `G` each) and bought at the
CELLAR** (alongside Tap), not the Market — the free-starting-improvement experiment showed even a *free*
improvement only swings win-rate ~+10% (Hop Garden, the new #1 in the hops economy) down to −7% (Extra
Vessel), so the real barrier was the *Market action* opportunity cost, not goods. The least-contested Cellar
lowers that bar. **(3) The developer lane made physical — a building a RIVAL overbuilds now FLIPS into its
owner's improvements area:** worth **+3★** at game end AND carrying a **Wild action on its back**, fired when
you work the **Floor** (so being displaced enriches the private alt-line vs paying the toll — the
v0.16-era "alt line" question, given a hook). Self-displacement still pays nothing (anti-farm). **(4) The
improvements area is CAPPED at `IMP_AREA_CAP` = 4** tiles total (bought improvements + flipped buildings), so
the engine is a real choice, not an open buffet. Gates: sim 2–4p 0 crash/deadlock, pace in band; render-smoke
clean (incl. GM/CM); ladder fast tiers hold. *Note: the flipped-building feature is **bot-untestable** — the
AI never overbuilds (developer scored 0 across all 900 v63 games) — so it is crash-validated only; its balance
is a table question. The Wild cadence (Floor-fired) and `IMP_AREA_CAP` are first-pass ⚙.*

**v1.6 “Hops”** *(2026-06-19, `play.html` KEY v63)* — **Economy rebalance: the export ladder is now
HOPS-LED, giving hops a real demand.** Diagnosis: grain was a near-monopoly currency — it pays the
occupancy toll, *every* tile/ship/charter/contract buy, **and** the grain half of every beer, while hops
was spent on almost nothing but the hops half of recipes (Granary ≫ Hop Garden by construction, since
gains are flexible and you'd take grain anyway). Fix (theme: *hops = the beer that travels* → the
currency of range/quality): **Mumme 2G2H → 1G3H**, **Bock 3G2H → 2G3H** (**totals unchanged** — the
rejected 3G3H probe raised the total; this only shifts the ratio, so the Q5 climb timing holds), and the
export **recipe-card buys** lean hops (Broyhan 1H, Mumme 2H, Bock 1G1H; **Keut stays 1G** — the
deliberate grain-path Q3 alternative, so hops is a *choice* not a tax). This makes **Hop Garden** a
genuine pick vs **Granary** without nerfing Granary (you brew far more than you buy, so +1 grain/Source
stays fine). AI/bot Source heuristic now banks hops (target 3) when it owns a hops-led export, so the
climb stays fundable in sim. Gates: sim 2–4p 0 crash/deadlock, pace in band, Q5 still reached; ladder 0
errors + every tier ≥60%; render-smoke clean. *(Recommended follow-up: re-run `ai-tune.js` — the
Trader weights govern destination valuation, not recipe cost, so no retune was forced, but a balance
pass warrants a check.)* Parking-lot items above (asymmetric starting improvements; the random
starting-building question) recorded for later.

**v1.5 “Improvements”** *(2026-06-19, `play.html` KEY v62)* — *(KEY v62 follow-up: **off-turn Building
rewards now queue to the owner.** When a rival tops off and sails a hull carrying your cask, your
London/Novgorod Building benefit no longer auto-grants a **random** tile — it's **queued to the start of
your next turn**, where you choose from the display via the normal picker, same as an on-turn delivery.
An unplaced hand Building scores nothing, so a reward queued past game-end costs nothing — matching the
old outcome. The AI resolves its queue with `aiBenefit` (preference-ranked, no longer random).)* Three new **private brewery improvements**
(bought for goods at the Market): **Harbor Crane** (`4 G`, your Harbor load sets out **2 casks**, not 1),
**Lagering Cellar** (`4 G`, each of **your turns** +1 age to one maturing cask — a *faster-climb* perk,
distinct from Aging Cellar's −1-step), and **Private Quay** (`5 G`, load **Ready casks straight from your
vessels** onto ships — skipping deploy/the slot entirely). Implementation: the load flow now accepts a
**vessel cask-ref (`v:i`)** alongside slot ids (mirrors the existing Charter/Enshrine vessel-load path);
Crane sets `loadsLeft=2` on the Harbor load; Lagering ticks in `endTurn` after the auto-ferment. The first
two are **ex-Buildings reborn**: Harbor Crane and Lagering Cellar were the only two *line-effect* buildings
(awkward in the "a building modifies its docked occupant" grammar), so they left the green public deck for
the purple private set — where a tempo/throughput perk belongs. Values are first-pass ⚙. Robustness re-run
clean (0 crash/deadlock, pace in band 2–4p); the greedy sim bot doesn't proactively buy improvements (a
known blind spot), so the effects are exercised on purchase, not auto-piloted.

**v1.4 “Deploy”** *(2026-06-19, `play.html` KEY v60)* — Made **deploy a first-class line action** (building on
v1.3's "deploy rides the line"). **An empty slot's default line-action IS "Deploy"** (shown as *"{building?}
Deploy"*) — so a line reads e.g. *slot Deploy · station · station · slot Deploy*, and you spend a stop to set
**one** Ready cask onto **any** open slot (several Deploy stops → several casks/turn; the Brewhouse station also
offers Deploy, with its icon now on the board; the Cellar shows the Tap icon). The **combo:** deploying onto
*another* empty slot still pending on the line flips that slot's Deploy into the **cask's action stop** — place
where you'll still act and take the action this turn (control over execution for advanced play). This replaces
v1.3's narrower "deploy here onto the triggering slot only." Rationale: removing the old free/anytime deploy
makes the game **easier to learn and play** (one fewer floating action), and the empty-slot-default framing
makes the line legible — every stop *is* an action. *(In-page shipped; sim harness + AI ladder/oracle re-runs
and the page-doc sweep follow.)*

**v1.3 “Tap a Cask”** *(2026-06-19, `play.html` KEY v59)* — Reworked **deploy** and added **Tap** to cure the
wharf clog/seize (an all-AI game locked up: slots jam → vessels back up → brewing stalls). **Deploy is no
longer a free anytime action** — it rides **line activation**: deploy a Ready cask onto an **empty slot of
the line you fire** (placement becomes a real decision — fire your value-building's line to route demand),
or onto **any** open slot via the **Brewhouse**. New **Tap** (a Cellar action): discard a Ready cask from a
**vessel or a slot**, fire its action once, free the lane / **recall** it off a slot for a better cask. Clock
trimmed (`SAILED_CAP` 7/11/14→6/10/13) since deploy-gating + Tap cut voyages/round; AI re-tuned for the new
model (move-time demand-routing + adopted `ai-tune` weights). Robustness PASS (0 deadlocks 2–4p, clock-
dominant pace ~19–20 rounds). **Known tradeoff:** tying deploy to board position adds variance that
**compresses adjacent AI tiers** — the journeyman→trader rung fell 64%→~57% (even re-tuned it can't reach the
60% gate); the GM still beats the Trader ~62%. For a *human* the same change reads as added placement *depth*
rather than luck — a playtest call.

**v1.2 “Dice” — the Cellarmaster AI** *(2026-06-18, `play.html` KEY v57)* — A new top AI tier above the
Guildmaster, built after diagnosing the GM's strategic blind spot: its flat-MC uses a **journeyman rollout**
(never enshrines, ships cheap volume), so it under-prices the quality/Hall/Novgorod lanes and over-indexes
majorities — exploitable by a committed quality+Hall+Reach plan. The **Cellarmaster** fixes all three weak
axes — a **competent, completion-biased rollout** (Trader + deep climb/enshrine, so the MC can *price* the
deep lanes), **determinized hidden decks per playout** (no RNG-locking), and a **large budget spent by
sequential halving**. Beats the Guildmaster **~62%** head-to-head (throttled bulk budget; stronger in-page);
the Guildmaster is **kept** as the fast robustness oracle. Gates extended: `ai-ladder.js` adds a
`guildmaster vs cellarmaster` rung (shard it — `CMN`/`CELLAR_MS`), `ai-render-smoke.js` runs a cellarmaster
game, `sim-analyze.js` profiles `TIERS=cellarmaster`. Full rationale in `AUTOMA.md` (Phase 3+).

**v1.2 “Dice” — design fixes** *(2026-06-18, `play.html` KEY v56)* — Two table-feedback fixes, sim-gated
(robustness + PATHWAYS + AI ladder, all clean): **(1) the developer lane** — a building a *rival* overbuilds
now scores its owner **+3★** at game end (it served its purpose; you're paid for authoring a slot worth
overbuilding). Self-displacement pays nothing (anti-farm). This gives the **Authorship/engine lane** a
displacement payoff that bites most at 4p, where the ring fills. **(2) presence only where you've delivered**
— a free Reach (the cask action, the Bergen benefit, the Keut perk) can no longer plant presence at a kontor
you've never shipped to (it was letting the Bergen benefit seed unearned majority standing — e.g. a player
holding Novgorod presence with zero Novgorod deliveries). Reach is simply a dead action until your first
delivery — the simple, intuitive rule. Lanes stayed balanced (4p ≈ vol/dem/pres/maj/deep 24/24/26/26/25).
*(Also repaired the stale `sim-analyze.js`/`sim.js` hooks that still referenced v0.16-era functions — goals'
`drawPick`, `almsPick`, `pickCaskAct`, the old `deliverCask` signature — so the GM oracle cohort runs again.)*

**v1.2 “Dice”** *(2026-06-18)* — Shipped the **demand-dice tracking**: a value-building bonus is now
captured-on-ship-through onto a **reusable d6 that rides the cask in the berth** — its **pips = the ★
banked on delivery** — while a quality transform rides a **+1-quality marker**; ship value buildings
and the wharfage cut resolve **live**. This replaced the earlier value-chit denomination idea (one
re-rollable die per cask, no chit-counting). Plus a **`play.html` UI overhaul**: the slots now render
the **real printables tiles** — full-square slots showing cask / ship / building tiles, a **stacked
slot with tap-to-swap**, and the market, brew-pile, and brewery tiles — with **buildings = green,
upgrades = purple**. (Still 2–4p; the v1.1 differentiation pass and scoring tune carry forward.)

**v1.1 SESSION STATE — what shipped + playtest feedback + next steps** *(2026-06-18, `play.html` KEY v50→v55)**
This session implemented the v1.1 differentiation pass (Stage 1) and several fixes/reverts, then a real
2-player table test surfaced the dominant problem to solve next. **Read this before resuming.**

- **SHIPPED to `main` (live, KEY v55):**
  - *The Floor (v50)* — fixed to run **in lieu of** the public line, not in addition (run every vessel cask's
    action instead of the contested line; no toll).
  - *Building economy (v51)* — buildings are gained **to hand**, **placed at the Market**, and **placement
    over an existing building REPLACES it** (the displaced tile returns to its owner's hand; slots never lock).
  - *Tune (v49) + Flight (v52)* — Hall trimmed 4/6/8/10 → **3/5/7/9**; the **Flight counts distinct BEERS**
    (not quality tiers — there are always 5 beer types, so the 5-beer flight is always reachable).
  - *5-player support REMOVED* — the game is **2–4p** (UI, docs, sim/ladder defaults all 2–4p).
  - *Default seats* — names Sean/Olli/Adaline/Jillian; **seats 2 & 3 default to Guildmaster AI**.
  - *Building tiles render as FULL tiles* (not a corner icon) + a tap-free **"Buildings on the Wharf"** panel +
    a **target glyph** (cask/ship/line/owner) — the first pass at the legibility problem (still insufficient — see below).
  - *Stage 1 differentiation (v53)* — the four kontor identities + beer niches **as in the entry below**, EXCEPT:
    **London is to-hand, NOT "on arrival"** (on-arrival would re-open the board-fill the to-hand throttle just
    closed). **Novgorod's benefit is now `age` (refine a maturing cask +1), NOT `recipe`** (v54 — the arc showed
    the free recipe was redundant: players buy recipes cheap by ~R8, before they can reach Novgorod's Q3 gate).
  - *Auto-aging* — tried REMOVED (v54), then **REVERTED (v55)** — see feedback below.

- **THE DOMINANT FEEDBACK (next session's #1 priority): the game is hard to learn and `play.html` LACKS THE
  DATA A PLAYER NEEDS TO PLAY.** Too much to track, not enough surfaced on-screen. This is now the top problem
  — *no more mechanics until the UI/onboarding gives players the information to make decisions.* (The full-tile
  buildings + the Buildings panel + target glyphs were a start; insufficient.) Likely work: a clear turn/legal-
  action surface, per-player "what can I do / what do I have" at a glance, the goods economy and the maturation
  state made obvious, a guided first-game/onboarding, and the player aid pulled into the live flow.

- **Arc analysis (`playtests/gm-arc.js`, v53/v54):** the **Trader climbs eagerly** (full recipe set ~R8, Q5 ~40%)
  but the **Guildmaster oracle stays CHEAP** (~1.3 recipes, Q5 7–27%, climbs late/rarely) — cheap-volume is
  optimal-flexible; **the quality climb is a committed, high-variance lane, not the default** (so the Stage-1
  persona "quality lanes hot" was largely a *forced-persona artifact*, and we did **not** trim quality rewards).
  Buildings are authored **before** the recipe set fills (R1–4 vs R8–16) — healthy.

- **The goods squeeze (from the 2p table test):** income ≈ 2/turn (a Market source) vs Mumme 4 / Bock 5 / ship 2
  / charter 2 → **hand-to-mouth**; a high-Q plan can **starve and strand** (a 2nd Mumme was still maturing when
  the short 2p clock — 7 voyages — ended the game). Auto-aging removal made this worse (it stole the income turns)
  → reverted. **Open levers (decide with intent, sim first):** (a) *fund-the-climb legibility* — teach/strengthen
  the **Gruit + Bruges/Bergen goods loop** that funds high-Q (lean teaching before buffing income); (b) **2p
  runway** — `SAILED_CAP[2]` 7 → 8–9, or accept 2p as the fast/cheap variant.

- **STILL OPEN / queued (after the UI work):**
  1. **Trade-factor presence CAP (Stage 2)** — the finite-barrel cap, *personal-cap-only* (entry below). Reassess
     magnitude now that auto-aging is back and the climb self-limits.
  2. The **goods/income** + **2p clock** levers above.
  3. *"Is the quality climb meant to be the default or a committed option?"* — design-intent question (Trader says
     default, oracle says committed). If "worth it for all," make the climb cheaper/faster, not richer.
  4. Optional: revive **Keut set-collection** (casks are type-tiles → a 3-space strip tracks the count).

- **Physical-tracking model** is recorded in `COMPONENTS.md §2` (casks = type-tiles + an owner barrel that
  becomes kontor presence = the trade-factor cap; the kettle display; per-vessel maturation marker; the Flight
  strip; score-on-delivery). No hidden state.

**v1.1 (IN DESIGN — the differentiation pass)** *(2026-06-17)* — Design review (the designer's read):
with steerable brew piles, beers now differ **only by quality + cost-mix**, so the two Q3s
(Broyhan/Keut) are interchangeable and London/Novgorod collapse into "a building + a similar
majority." The fix — **differentiate by ROLE**: each kontor rewards a different axis, each beer
serves one. Decisions captured (to build as one pass, sim-gated — persona + oracle):

- **Kontor identities — four unique benefits, four lanes:**
  - **Bruges (Hub)** — Q1 gate, **2 goods** (liquidity), low flat value → the *economy* lane.
    **No quality ceiling** (decided): a premium cask at Bruges still earns the Flight (beer-type,
    quality-blind) + majority (count, quality-blind); only the *value* premium is forgone — a real
    tradeoff, not waste. The steep value gradient + the Charter/Enshrine relief valves (anti-strand)
    make floors-only the right call; verify in sim that high-Q→low-value is rare.
  - **London (Steelyard)** — Q2, **take a Building and place it on arrival** (free, immediate — the
    *only* place gaining-and-placing is one step; elsewhere it's to-hand) → the *engine/authorship* lane.
  - **Bergen (Bryggen)** — Q2, **a free Reach** (+1 presence, any kontor) on delivery; the big **9/5/2**
    majority is the draw → the *majority* lane (the benefit compounds the majority you chase).
  - **Novgorod (Peterhof)** — Q3, **a free recipe** (exotic styles) + value **scales with quality**
    (Q3→2 · Q4→4 · **Q5→6**) → the *quality climb* lane; finally the reason to brew Bock.
- **Beer niches (steerable piles KEPT):** Gruit = fuel (keep). **Hopped → fast (ready 1)** (quick Q2
  engine access; sharpens "brew now vs hold"). **Broyhan → fast Q3 (ready 1)** (the rush/tempo Q3).
  **Keut → the +1-presence majority specialist** (DECIDED): a Keut delivered to a kontor plants an
  extra presence (2 standing for 1 cask) — the beer you flood Bergen with. *(Set-collection was the
  other fork; **tabled** — its only elegant counter is the delivered Keut tiles on a 3-space strip, and
  since casks ARE type-identifiable tiles we can revive it later if wanted, but +1-presence needs zero new
  components.)* **Mumme/Bock** = the climb, paid by Novgorod-scaling + the Hall + the Flight. Creates the
  **broad-vs-deep** axis (5 beers → Flight, or one beer flooded into a kontor).
- **Trade-factors (presence markers) — a finite PERSONAL supply (~8–10 ⚙, sim-tuned):** *your delivered
  casks already ARE your presence — this just caps the supply and routes Reach through it.* A **kontor
  delivery** and a **+1 Reach** (Bergen benefit / Keut perk / Reach action) each place **one**; the
  **Hall needs none**. Out of markers → you can only Enshrine or stop contesting kontore. Payoffs:
  (1) gives "+1 presence" a **real cost** (kills the Reach-snowball worry — Reach now trades a future
  delivery for present standing); (2) sharpens **kontore (finite) vs the Hall (unlimited)** with a
  built-in **pivot to prestige** once your standing is spent; (3) caps the volume lane. **PERSONAL CAP
  ONLY** (decided) — *not* an end-trigger; the Sailed-Ships clock stays the single, tuned pace dial. The
  *"last marker → final round"* dual-trigger is a **deferred** option (revisit only after the cap is simmed).

**v1.0 build + first tune (`play.html` KEY v47→v49)** *(2026-06-17)* — The keystone `play.html` rebuild
shipped (two-layer slots; building-driven kontor value; goals/neutrals/most upgrades folded into the
Building family; London/Novgorod → a free Building; steerable brew piles; the Floor; private
improvements). Then two follow-ups: **(a)** *owned-but-shared made real* — a rival routing through your
value building now banks a **reduced** bonus (half) and hands you the **wharfage** (RULES §5b), and the
bots were repointed to **author + route** their own value buildings (the demand lane now self-pilots, so
the lane reads are honest); **(b)** *first balance dial* — the **Hall ladder trimmed 4/6/8/10 → 3/5/7/9**.
The committed-persona PATHWAYS report had the **prestige** lane hot (3p ≈ 50%, fair 33%); the single Hall
trim pulled it back to ~fair and tightened the five lanes across 3–4p (prestige now the slightly-lower,
higher-variance lane *by design*). One dial, sim-gated — per the lessons (§8). *(Guildmaster sims must be
**sharded** — ≤20 games/shard, multiple shards per player count, run in parallel; notes in
`playtests/ai-ladder.js` & `sim-analyze.js`.)*

**v1.0 “Living Slots”** *(2026-06-16)* — The design graduates to **1.0**, locked into the specs
(`RULES.md` / `COMPONENTS.md`); the `play.html` rebuild is the next step. Reset to the bookmarked keystone after a
demand-board detour was tried and abandoned. **Living, composable slots:** owned **buildings**
modify the casks/ships docked to them (one grammar; value-boost *or* transform; owned-but-shared
wharfage), folding goals + neutral buildings + most upgrades into one family. **Legible scoring:**
Hall fixed / kontor variable (building-driven) / majorities + Flight. **Five lanes as complete
paths** + the **Floor** (private line). v0.16 fully archived; top-level files version-stamped
v1.0. See `PLAN.md`.

**v0.16.1** — Bruges/Bergen liquidity = 2 goods of the owner's *choice*; brewing vessel cap 4→3.
**v0.16 “Full Ships”** — Ships **sail only when full** (partial early-launch retired); destination
benefit **and** points seal **on delivery**, in load order (numbered berths); the **Charter** is
gated by a **scarce contract** (start 2, buy `1 G`, flat `2 G` fare — retiring the escalating
fare row). Fixed a backwards incentive (benefit-on-load → never sail).
**v0.15 “Enshrine”** — The **Hall goes local**: Enshrine a deployed Q2+ cask for prestige, no
boat. Throttle is **structural** (deploy-first, contestable), not a fee; ladder re-trimmed to
**4/6/8/10**. Ships/Charter kontore-only. Added **Trophy Room** + **Patron's Favor**. Revived the
under-powered volume lane.
**v0.14** — **Bock un-gated** (3G2H, the Aging Cellar a pathway not a gate) → the Q5 climb
reachable. Pathways resolve to **contested kontore vs the uncontested Hall**; 3G3H probe rejected.
**v0.13** — **The Flight** (range: (tiers−1)², min 3) + **the Masterpiece** + a majority cooldown
— making the quality climb pay.
**v0.12 (.1–.3)** — Rival-loading restored (tactical denial); **variable cask actions** drawn at
brew (decoupled from quality); **Gruit pinned to Source**; **upgrades earned-only** (no goods-buy);
**Hall = printed ladder**; clock re-centered to 7/11/14.
**v0.11 (A & B, .1–.3)** — **Neutral, destination-bound ships** off a shared deck (commission →
load → sail); **ship market of 3**; deck → 20 hulls. Batch A: Towncrier reined in, charter-fare
experiments, the **export premium**. (Printed destinations *removed* a strategy axis → the Trader
rebuilt around "which hull to feed.")
**v0.10** — **Big tiered majorities at every kontor** (Bergen 9/5/2 the anchor); per-cask values
cut so points live in the majority race; Hall bumped to balance.
**v0.9** — **Tiered, ranked majorities** (2p skips 2nd); the **London = engine / Bergen = majority**
split; **seat compensation**. The "prestige is marginal" worry was a greedy-bot artifact (fixed by
persona bots).
**v0.8** — Occupancy toll (the de-rondel dial); the **“Wharf” naming**; export beers carry
**fixed quality, deal 3 of 4**; all six neutral buildings.
**v0.7 “The Wharf”** — A ground-up **reel-in to GWT/Distilled weight** (≈ half the rules cut).
The four-station loop, the dual-role cask in three states, **destinations replace the two value
tracks**, deliver→earn-upgrade, the **Charter** relief valve, the **Sailed-Ships** clock. Cut: the
demand market, type frontier, Fairs, route lanes, the Hall-as-a-station, working-cask Floor, twins,
aging cubes.
**v0.1–v0.6** *(the Lacerda-grade origin, superseded by v0.7)* — The shared 2×2 action grid, the
double-sided cask (working ↔ enshrined), reach-vs-standing tracks, a demand market, the Brewhouse
Floor, recipe cards, ships-as-single-use-carriers. Too much game; the right amount of theme — which
the v0.7 reel-in resolved.

**Tooling milestones:** the headless `sim.js` harness + persona/Cellarmaster lean probes; the
5-tier AI ladder (Apprentice/Journeyman/Trader/**Guildmaster** flat-MC/**Cellarmaster** deep-MC); `sim-analyze.js`;
`ai-tune.js` (CEM). All drive the canonical engine, so every rules revision is absorbed
automatically.

---

## 10. Glossary

- **The Wharf** — the whole core area: the four stations + the 8 slots.
- **Station** — one of the four action spaces (Market · Brewhouse · Cellar · Harbor).
- **Slot** — one of the 8 perimeter spaces; holds a building and/or an occupant (cask/ship).
- **Line** — a row or column: its two stations + their two slots (the 4-stop activation).
- **Cask** — the dual-role tile: quality + a slot-action; maturing → deployed → delivered.
- **Building** — an owned slot tile that modifies the occupant docked on it (value or transform).
- **Wharfage** — the small points cut a building's owner takes when a rival routes through it.
- **The Floor** — your private line: run your built-up brewery instead of a grid line.
- **Kontor** — a foreign trading post (Bruges/London/Bergen/Novgorod); ship there for value +
  majority.
- **The Hall** — the local guild hall; **Enshrine** a cask there for fixed prestige (no ship).
- **The Flight** — the end-game range bonus for distinct **beers** delivered ((beers−1)², min 3).
- **The lanes** — the five complete paths to victory: Prestige/Hall · Demand/value ·
  Volume/majority · Range/Flight · Authorship/engine.
