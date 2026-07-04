# Brewhouses of the Hanse — Design (v2.2 “One Grammar”)

> The working design doc: **why the game is the way it is**, the **current architecture**, the
> **change log**, and the **balance lessons** carried forward. Operational rules live in
> `RULES.md`; the manifest in `COMPONENTS.md`; the active plan in `PLAN.md`.
>
> **This file was compacted (2026-06-16).** The full pre-v1.0 design record — every dated
> session log, the v0.5/v0.6 reach-vs-standing architecture, the blow-by-blow v0.7→v0.16
> epilogues, and the old standalone `CHANGELOG.md` (now folded in below, §9) — is preserved
> verbatim in **`archive/v0.16/DESIGN.md`** and the **`archive/main-v0.16.1`** branch. Nothing
> is lost; this is the slim, current version.
>
> **Authorship:** all commits to this repo are authored as **Sean Wittmeyer** (`sean@wittmeyer.io`).

---

## 1. Snapshot

|               |                                                                                   |
|---------------|-----------------------------------------------------------------------------------|
|**Players**    |2–4                                                                                  |
|**Length**     |≈ 45–60 min at 2p · medium                                                          |
|**Genre**      |Medium euro · engine building · shared action grid (the Wharf) + private brewery    |
|**Weight**     |*Great Western Trail / Distilled* — not Lacerda                                     |
|**Theme**      |A merchant brewing house in the Hanseatic League, c. 1350                           |
|**Status**     |**v2.2 “One Grammar”** — live; the designer-approved **rules-consistency keystone** (one load grammar · one gate rule · benefits-when-gained · buildings display→placed-at-once · the Floor as the standing 3rd line · overbuild one-rule · the demand die a real d6 · Jopenbier in the Flight); **three opt-in New Game toggles** on a new **expansion spine** (a registry + hook seams, so the core stays clean): *Specialty Beers* (the 3-of-7 draft + Blending + 3 thematic Buildings), the *Jopenbier* **Q6 capstone**, and **The Trade Roads** (Overland) — the **Hanse Network**: a tree from **Hamburg** (West to the Bruges gateway → London/Bergen/Rhineland; East = the deep Novgorod haul) that **REPLACES the kontor majorities**. A **voyage** to a kontor pushes your **caravan** one node along its road (**per voyage**, gated by cask quality); reaching a town lets each cask aboard **claim a Staple-Right slot** (a distinct one-shot bonus, flavoured by lane: Rhineland=craft · London=infrastructure · Bergen=logistics · East=points), in load order; a full town pays an overflow bonus. Reach (breadth) and quality (depth, gated) both win. **Base game byte-for-byte unchanged when all off.** Base ruleset: **v1.8 “Quality Pays”**. `play.html` implements all. |

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

## 6. The current architecture (v2.2 “One Grammar”)

Canonical detail is in `PLAN.md` / `RULES.md` / `COMPONENTS.md`; the shape:

- **The Wharf** — four stations (A Market·Source → B Brewhouse·Brew → D Cellar·Age →
  C Harbor·Ship) ringed by **8 slots**. Move orthogonally, then choose one of **three lines** —
  the row, the column, or the **Floor** (v2.2: the standing private 3rd line) — and resolve its
  stops in any order, all optional; the occupancy toll applies to public lines only.
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
- **The Floor** — the standing 3rd line (v2.2): after moving, always choosable instead of the
  row/column — every vessel cask's action + a Wild per flipped building, never tolled
  (engine payoff + the boutique brewer's self-sufficiency; `PLAN.md` §1B).
- **One grammar (v2.2)** — casks leave vessels only by **Deploy or Charter** (Private Quay = the
  invested Harbor exception); every gate check uses **effective quality**; **benefits resolve when
  gained, owner's choice**; **buildings always display → placed at once** (no hand, no starting
  building); **overbuild**: +3★ banked immediately + the tile flips to the owner's floor (self =
  rival; floor full → discard); the **demand die is a real d6, max 6** (building ★ + Q4/Q5
  premium, set not accumulated; destinations are the cask's starting value).
- **Kept from v0.16:** ships sail-when-full; the Charter relief valve (scarce contracts); the
  Sailed-Ships end clock; the no-dice/cards/money constraints.
- **The expansion spine (v2.0):** a tiny `registerExpansion` registry + hook seams
  (`fire`/`collect`/`expSetup`/`expRender`, plus a `reach` re-home hook and a `replacesMajorities`
  flag) so each opt-in module is one self-contained block and the core stays free of scattered
  conditionals. **The Trade Roads** (Overland) is the first module on it: the **Hanse Network** — a tree
  rooted at HAMBURG (West to the Bruges gateway → London/Bergen/Rhineland; East = the deep Novgorod haul)
  that **replaces the kontor majorities**. A **voyage** to a kontor advances your caravan one node along its
  road (**per voyage**, gated by cask quality); reaching a town lets **each cask aboard claim a Staple-Right slot**
  (a one-shot bonus + ★, flavoured by lane — v2.1). Specialty Beers / Jopenbier predate the spine and remain
  inline (a later, optional migration).

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
  to `main`. *(The harnesses drive the live `play.html` engine — they extract its `<script>` and
  run it in a Node `vm`, so they track the current build.)*

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
- **Fixed turn order has a real first-player edge;** **free opening placement** + P1's natural
  turn-1 edge flatten it. (v1.7 REMOVED the +1 `G`/later-seat compensation — it over-corrected under strong play.)
- **Content, not rules.** Depth belongs in placement/timing/interaction and a deck of content
  under one grammar — not in action complexity (the v0.7 reel-in is the founding lesson).

---

## 9. Change log (compact — full rationale in `archive/v0.16/DESIGN.md`)

### Parking lot — recorded for future discussion (NOT yet decided)
- **Delivery arithmetic diet (2026-07-04).** Discuss after the rules-consistency exercise: the delivery moment
  stacks base + building ★ + the Q4/Q5 premium + the rival share + the ship-berth bonus + wharfage — the game's
  heaviest table math, at its payoff moment. To be reworked together with the **rival "reduced effect" rule**
  and **wharfage itself** (owner-full / rival-reduced / the points trickle all need one clearer, simpler
  formulation — revisit as one conversation).
- **Enshrine — public-first vs vessel-direct: RESOLVED (2026-07-04) — deploy-first stands.** Enshrine stays
  from **deployed casks only**; the v0.15 structural throttle (contestable before it scores) is kept and gets
  stated in the rulebook as a principle ("the Hall demands a public showing"). The vessel-direct idea is
  withdrawn; the counterplay to hostile dock-loading is the Charter relief valve + Tap recall.
- **Improvement-tile parity (2026-07-04, designer directive).** The seven private improvements should be
  **equally good — powerful, invested-in flexibility** (Private Quay is the model: a strong unlock you pay
  for). The v1.7 free-starting-improvement study measured them *unequal* (Hop Garden ~+10% win-rate swing …
  Extra Vessel ~−7%). Run a dedicated parity/tuning pass (re-use that study's methodology + persona sims)
  after the rules-consistency change set lands; dials are costs and effect magnitudes, not new rules.
- **The Trade Roads review pass (2026-07-04).** The Overland expansion gets its own dedicated exercise.
  Carry-ins from the consistency audit: Keut's +1 presence is orphaned when majorities are off; Frankfurt's
  free-Q3 can create a 6th delivered beer (the Flight edge); the +2 clock cells have no printed home; the
  free-Improvement grant sits outside the `n − 1` printed supply; several node bonuses auto-resolve where a
  table would offer the owner a choice.
- **Asymmetric starting improvements (variable powers).** Deal each player **two** improvements; they keep
  **one** as a starting private power. Turns the (now symmetric) improvement set into an opening-asymmetry /
  replay lever. Needs: a power set balanced enough that any pair is fair, and a draft/keep-one rule. Open.
- **Starting building — RESOLVED (2026-07-04): there is no starting building.** The "1 random Building in
  hand" setup is cut (with the whole buildings-in-hand concept — buildings are always chosen from the display
  and placed on acquisition). The opening-asymmetry idea it served may return later as a **more diversified /
  expanded improvements set** — fold into the asymmetric-starting-improvements discussion above.


**v2.2 "One Grammar" — the rules-consistency keystone** *(2026-07-04, `play.html` KEY v86)* —
**The designer-approved pass that collapses the grown-per-version verb exceptions into single rules** (the
full audit + decision trail: the 2026-07-04 consistency exercise). The ten changes: **(1) The FLOOR is the
standing 3rd line** — move, then choose *row / column / Floor* (every vessel cask's action + a Wild per
flipped building, any order, all optional, resolved through the normal stops picker); the occupancy toll
applies **only to a public line while sharing the station** (the Floor is never tolled; the old toll-fork UI
state is gone). **(2) One vessel-outlet grammar** — *casks leave your vessels only by Deploy or Charter*;
Private Quay stays as the invested exception (it upgrades your Harbor Load to reach your vessels); the
**commission free-load is deployed-casks-only**. Enshrine stays deployed-only — stated as a principle: *the
Hall demands a public showing.* **(3) One gate rule** — every load/charter/commission check uses **effective
quality** (the raw-q variants in `commEligible`/`commLoad`/`charterDest` are gone; a kilned/Duckstein cask
now charters and commission-loads at its effective quality). **(4) Positional building mods** — a building
modifies whatever is docked on it *now* (`slotEffAct`); the Workshop no longer permanently rewrites a cask's
action, and **Tap fires the modified action**. **(5) Overbuild, one rule** — ANY displacement (self = rival):
the owner banks **+3★ immediately** (benefits-when-gained; the flipped card's printed back is the record),
the tile flips to their floor as a Wild, **discarded if the 4 slots are full** (no hand exists). **(6)
Buildings always from the display, placed at once** — Market buy, London benefit, Survey; the entire
buildings-in-hand concept is CUT (`p.hand`, `placeHeld`, the off-turn `pendingBuilds` queue, both blind deck
draws) and there is **no starting building**. **(7) Benefits resolve when gained, owner's choice** — whoever's
turn it is (Bruges goods-mix · Bergen Reach · London building+placement · **Novgorod refine is now a choice**
of which maturing cask); AI-owned pendings auto-resolve, human-owned pendings **pause an AI's turn via the
human-gate** (the pass-the-device moment). **(8) The demand die is a real d6** — building ★ + the Q4/Q5
premium, SET not accumulated, **hard max 6** (the overflow badge is gone); destinations never touch the die
(they are the cask's *starting value*). **(9) Jopenbier joins the Flight** ("a beer you brew like the
others") — six types with the capstone on, `FLIGHT_PTS[6]=25` (the formula's own (n−1)²; also closes the
6-distinct-beers-scored-zero hole). **(10) A ship sails whenever it becomes full** — including when its
capacity *shrinks* (a Cooperage overbuilt under a part-loaded hull was a strand). Plus dead-state removal:
the Novgorod free-recipe flow, `enterBldgLine`, the `BTGT` 'line' target, `p.commissioned` ("merchant goal").
*Gates (KEY v86):* **`verify-v86` — 26 targeted checks PASS** (Floor stops · toll public-only · overbuild
banking/flip/discard · die cap 6 · commission pool/effQ · vessel-charter effQ · the Cooperage sail · the full
human-gate benefit flow · refine choice · Flight 6→25); base `sim.js 500` → **0 crash/deadlock 2–4p, 98–100%
pace-in-band, clock 96–99%**, seat spreads healthy; `EXPANSION+JOPEN 300` and `OVERLAND 300` → **0
crash/deadlock, pace in band** (one genuine bug caught and fixed at the gate: `aiPickBuilding` made null-safe
for sim/human seats); `ai-render-smoke` **ALL PASS** (its Jopenbier assertion updated to the new Flight rule);
`ai-ladder 600` **PASS — 0 errors, every rung ≥60%** (journeyman 87.7% · trader 71.5% · GM 62.5% · CM 60.0%;
mixed 3–4p tables 0 errors); `ai-tune` (CEM, 10 gens + confirmation) → **KEEP the incumbent `AI_W`** (best
challenger 44.3% vs incumbent — the v2.2 grammar didn't shift the Trader's weight landscape).
*Watch-items for the persona oracle (⚙, recorded not tuned):* the PATHWAYS lanes moved with the die cap +
benefit changes — 2p prestige reads **hot (~56%)** with deep ~53% and majority ~37% (3p ≈ 29/33/36/28/36) —
re-baseline after the parked wharfage/rival-effect and improvement-parity conversations rather than dialing
now; the die cap trims only the top-end premium combos (Connoisseur/kontor charters + Q5 → 6). All numbers ⚙.

**v85 — "Frankfurt opens": the deep-node 2-slot cap is lifted** *(2026-06-28, `play.html` KEY v85)* —
The Trade Roads' deep ◆ terminals were hard-capped at **2 active slots** regardless of player count
(`olSlotsActive`: `if(node.deep)a=Math.min(a,2)`), which orphaned two of **Frankfurt's** four printed
Rhineland slots — its **+2 age** and **+6★** were never claimable. v85 **removes the cap**: every node —
deep or not — now scales **n+1**, bounded by its printed slot count, so **Frankfurt's 4 slots all activate**
(3 at 2p · 4 at 3p+) and **Pskov** stays scarce simply by having a single printed slot. "Deep ◆" now denotes
a high-gate terminal, not a 2-slot cap; scarcity is the slot count. Also folded in — a **physical-component**
change with no engine effect (`play.html` doesn't model the cask supply, so it lives in `COMPONENTS.md` + the
printables): the **cask floor is raised to a minimum of 6 tiles per type** (Bock 4→6, Jopenbier 3→6) for
"more cask tiles." *Gates (KEY v85):* base `sim.js 500` → 0 crash/deadlock 2–4p, pace in band, clock-dominant;
`OVERLAND=1 sim.js 500` → 0 crash/deadlock 2–4p, **100% pace-in-band**, clock 91–97%; `ai-render-smoke` (incl.
Overland + the Cellarmaster with all three expansions) **PASS**. Bump discards stale v84 state.

**v84 — "Cellarmaster bites": the deep-MC rollout policy becomes the Trader** *(2026-06-28, `play.html` KEY v84)* —
The **Cellarmaster** (the deep Monte-Carlo arch-nemesis) ran *journeyman* rollouts, which ship to the first
fillable hull and never model deliberately stacking the rich anchors (Bergen 9 / Novgorod 8) — the lane a strong
human wins on. v84 switches its rollout policy to the **Trader** (`CELLAR_ROLL='trader'`: value-ranked
destinations + `aiMajSwing` + the Hall), so the deep playouts finally price anchor-stacking. Equal-budget A/B
(CMN=30, CELLAR_MS=220): the trader-rollout Cellarmaster beats the Guildmaster **66.7%** (vs the journeyman
rollout's 50%) and plays tighter (rounds 22→18, clock 77%→100%). The Guildmaster keeps its journeyman rollout
(the fast robustness oracle). **AI-only — no rules/engine/state-shape change;** the KEY bump just discards stale
v83 saves. *(The `v2.1.1` repo-wide doc/printables alignment pass rides on this same KEY — no rules change.)*

**v83 — "Free Tap": the Cellar's Tap becomes repeatable (multi-tap per visit)** *(2026-06-27, `play.html` KEY v83)* —
The Cellar **Tap** (discard a Ready cask from a vessel/slot → fire its action once, freeing the vessel or
recalling it off a slot) was **once per visit**. v83 makes it **repeatable**: tap any number of your Ready casks
in one Cellar visit, in any order with **Age** (still once — it's a fixed pool), **Blend**, and **buy-Improvement**
(which already repeated). So *Age · Tap · Tap · buy an Improvement* is one legal visit. **Why:** the once-cap was
an artificial restriction on the only flexible station; lifting it lets a held-cask-heavy brewery cash several
casks' actions (and unclog several vessels) in a turn — a real engine/Floor-adjacent play, and a stronger
relief valve for the wharf-clog Tap was added (v1.3) to cure. **Self-limiting:** each tap *consumes* a cask, so
the option is bounded by your Ready casks (no loop), and tapping spends cargo you could have shipped/enshrined —
a genuine trade-off, not free value. **Engine (small diff):** `cellarCanTap` drops the `usedTap` gate; the render
shows a Tap button per Ready cask every visit; `usedTap` is **repurposed as a throttle that keeps the greedy
AI/sim bot tapping once** (jam-relief) so the v82 robustness/balance profile is preserved for a clean A/B; the MC
`legalActions` already enumerates per-target, so the **strong AI (GM/CM) gains multi-tap** as a real search
option. **Methodology (same as v82):** the greedy bot is throttled → `sim.js` is a no-regression gate only; the
real measure is the **MC oracle** A/B (does multi-tap shift the strong AI's pace — more taps = fewer voyages =
a slower clock? — or its win composition). *Gates (KEY v83):* `verify-cellar` (rewritten test (c): two Ready
Gruits → both tapped in one visit, +4 grain) + `ai-render-smoke` (incl. full Cellarmaster w/ all expansions, now
free to multi-tap) **PASS**; base `sim.js 500` → **0 crash/deadlock 2–4p, ~98–100% pace-in-band, clock-dominant**
(unchanged vs v82, as designed); AI-ladder (**errors 0** across 28 MC rungs; tiers healthy) + GM/CM oracle A/B (v83 vs v82) in
`playtests/oracle-{gm,cm}-v83*.txt`. **Measured verdict (2p oracle, small-N/directional):** multi-tap lengthens
strong-AI games a **mild ~+1.5 rounds** (GM 21.2→22.6, CM 21.1→22.8 — the CM ships slightly fewer casks,
1.7→1.5/player, since a tap spends cargo), still **well inside the 12–25 band** (ceiling 25); GM's **winner
ceiling rose** (29.6→35.7 — it extracts more value from the freed option); upgrade acquisition is ~flat. So the
change reads as a **small buff to the strong-AI's engine play** with a **modest pace cost**, no robustness/ladder
regression. *(Open ⚙: if multi-tap ever pushes strong-AI games to the ceiling systematically, the lever is the
clock `SAILED_CAP`, NOT re-capping Tap — per the lessons; and the greedy bot could be taught to exploit multi-tap
so `sim.js` prices it. At +1.5 rounds, no action needed yet.)*

**v82 — "Scarce Improvements": the private upgrades become a contested deck + display of 4** *(2026-06-27, `play.html` KEY v82)* —
The private brewery improvements were an **always-available catalog** (every house could fit one of each of the 7
types, supply-unlimited). v82 makes them a **shuffled deck of `n − 1` copies of each type** (n = players: 2p →
7 tiles · 3p → 14 · 4p → 21) feeding a **face-up display of 4** at the Cellar that refills from the deck — the
**same deck/display grammar already used for the Buildings** (`buildImpDeck`/`refillImpDisplay`/`takeImpFromDisplay`,
mirroring the building functions; `IMP_DISPLAY=4`). **Only the 4 face-up tiles are buyable**, and with `n − 1`
copies the table **competes** for them — not everyone can fit every improvement, so the engine choice gains the
same scarcity/contention the public slots already have (the 4p ring's tension now reaches the private engine).
Wiring kept the blast radius small: `buyImprovement` takes the tile from the display + refills; `cellarCanImp`,
the in-page `aiCellar`, and the MC `legalActions` all gate on `S.impDisplay`; the Cellarmaster/Guildmaster MC
playouts **shuffle the hidden `impDeck`** per playout (determinized, like the building deck); the render shows
the display with a deck-left count; the debug payload prints it. The Overland "free Improvement" Staple Right
stays a **granted fit** (not a purchase from the display), so the expansion is untouched. **Methodology note (the
key read):** the **greedy sim bot buys ≈0 improvements** (the long-documented blind spot — robustness sim shows
`bought 0.0/game`), so `sim.js` is *inert* to this change and only serves as a no-regression gate; the genuine
measure is the **MC AI (Guildmaster/Cellarmaster) oracle**, which *does* buy improvements via search — so the
ladder + the `sim-analyze` GM/CM cohorts (upgrades/game · first-upgrade timing · win-rate) are the real test.
*Gates (KEY v82):* `verify-cellar` (the Tap→Buy chain, with Granary forced face-up) + `ai-render-smoke` (incl. a
full Cellarmaster game with all three expansions, through the real render layer) **PASS**; base `sim.js` 500 +
OVERLAND 300 → **0 crash/deadlock 2–4p (+5p), 100% pace-in-band, clock-dominant**; AI-ladder + GM/CM oracle A/B
(v82 vs v81) recorded in `playtests/`. *(Open ⚙ for the persona/strong-AI oracle, not the greedy bot: whether
`n − 1` copies + a 4-wide display is the right scarcity, or the display width / copy count wants a tune; and
whether the greedy/persona bot should be taught to value improvements so `sim.js` can price the lane.)*

**v81 — Overland: a human-playtest tuning pass (charter east · Novgorod=quality · n+1 slots · manual brew · free casks)** *(2026-06-22, `play.html` KEY v81)* —
Five interlocking fixes from a live 2p playtest, all ⚙. **(1) The charter opens the EAST at its next road node, not the
kontor sea gate.** Visby's gate is Q2, but the only eastern voyage trigger was shipping/chartering to the **Novgorod
kontor** (Q3 sea gate) — so a Q2 couldn't reach Visby (reachability was effectively Q3 though the board read Q2). A
charter now gates on the **next unreached road node** (`olCharterGate`; east-only — the west kontore already match
their road's early-node gates), so a **Q2 Hopped opens the eastern lane at Visby** early. A *sub-gate* charter advances
the caravan + claims the node but takes **no under-gate kontor sea benefit** (so a Q1 can't farm London's Building, etc.).
**(2) Novgorod pays ★ = the delivered cask's effective quality** (`qpts`: Q3→3 · Q4→4 · Q5→5) — the deep market finally
rewards the climb on arrival (was a flat node ★). **(3) n+1 active slots per node** (2p→3 · 3p/4p→4; deep ◆ stay scarce
at 2) — at 2p the old 2-slot towns felt too rigid to make the network a real space of choice. **(4) The `brew` slot is
MANUAL** for the active player — choose a recipe you hold + pay it (via the existing brew picker; off-turn/AI/sim
auto-brew the highest affordable, so harness coverage holds). **(5) NEW free-cask slots** rack a **free Gruit** (Cologne)
/ **free Q3** (Frankfurt) straight into an open vessel — the Rhineland *craft* lane gets a way to cellar a cask without
the Q2→Q5 procession (Frankfurt traded its flat-points slot for the free Q3, keeping its enshrine outlet). *Decisions
taken with the designer mid-playtest:* Novgorod-only quality scaling (not the whole east, for now); free casks on the
Rhineland craft lane. *Gated (KEY v81):* syntax + `ai-render-smoke` (real layer, all three expansions) PASS; `sim.js`
base + OVERLAND **0 crash/deadlock 2–4p**, pace in band, clock-dominant; targeted unit checks confirm the Q2→Visby
charter, n+1 counts, Novgorod qpts (Q5→5/Q3→3), and the free casks. Synced to `printables.html` (the tech-tree diagram)
+ `RULES.md`/`COMPONENTS.md` §12. *(Open ⚙ for the persona oracle, not the greedy bot: whether the whole east should
scale by quality, the exact free-cask placements, and a richer "skip the procession" high-recipe slot if the manual
brew + recipe/quality slots still feel insufficient in play.)*

**v80 — Overland: the western 4-player slot duplicates the lane signature** *(2026-06-22, `play.html` KEY v80)* —
A small Trade Roads tune. A town's active slot count scales with player count (2p→2 … 4p→4) for **supply** (more
claimants need more slots, else everyone is shoved to overflow); the marginal **4th slot** had been a generic
**+★ points** filler everywhere. The **western** towns now make that 4p slot a **duplicate of the lane's signature
bonus** instead — **Cologne/Tønsberg → a 2nd brew · Antwerp → a 2nd Building to hand · London → a 2nd free
Improvement · Bergen → a 2nd vessel** — so the extra-at-4p slot *reinforces lane identity* rather than paying
anonymous points. The **East stays as-is** (it IS the depth/**points** lane, and its non-points actions are uneven —
Visby's best is a weak +2 age), and the deep ◆ nodes (Frankfurt/Pskov, capped at 2 active slots) are untouched.
Only 4p games change; 2p/3p are byte-identical. *(Lesson applied: the 4th slot's job is supply-scaling, not a points
buff — so a lane-signature duplicate serves that job and the theme better than filler points.)* Sim-gated (KEY v80):
base + OVERLAND **0 crash/deadlock 2–4p**, pace in band, clock-dominant; AI ladder + render-smoke clean.

**v2.1 “Staple Rights” — The Trade Roads, REDESIGNED to claimable slots** *(2026-06-21, `play.html` KEY v79)* —
**Table feedback retired the founder/recurring-perk town model in favour of a slot-claim model** (the Hanse
*Stapelrecht*). Each **town** now carries **2–4 PRINTED SLOTS**, each a **distinct ONE-SHOT bonus** drawn from
across the game and **flavoured by lane** — so the lane choice is an identity, not a number: **Rhineland =
knowledge/craft** (recipe · +quality · +age · free brew), **London = infrastructure** (Buildings to hand · goods),
**Bergen = logistics** (contracts · goods), **East = depth/value** (vessel · +quality · big points; **Pskov = pure
points**). **Claiming:** movement stays **one node per voyage per owner** (quality gates depth — the anti-flatness
rule kept), then **each cask aboard claims a slot at that node, in LOAD ORDER** (first loaded picks first); a 2-cask
voyage to your frontier = two slots. The **active player picks** an open slot (a new `olclaim` picker on the
sail-resolution pending queue, mirroring the Bergen-reach/London-building flow); rivals & the AI auto-pick the
highest-value open slot. **Never nothing:** a full town pays the line's small **overflow** bonus and your road
still extends. Active slot count **scales with player count** (2p→2 … 4p→4); the deep ◆ towns (Frankfurt/Pskov)
stay **scarce at 2**. **The Rhine Charter** added: a **Q4+** Charter takes the *Rhine road* — the cask delivers at
Bruges (full keystone) but the caravan **leaps Hamburg→Cologne, skipping the contested Bruges node** (marked
satisfied, so later Bruges voyages continue to Frankfurt) — the quality brewer's express. **Why the change:**
the recurring perks (esp. `refine` = +1 age **every turn**) were exactly the *per-turn tabletop upkeep* a physical
euro should avoid, and the founder/half-★ model was a flat winner-take-all race; discrete on-arrival slot bonuses
fix both and make each lane *play* differently. The motivating diagnostics were three real 2p games (a Jopenbier
capstone that fell flat — its dock-cellar vintage never accrued because a deployed cask is shipped immediately —
and two Overland games whose recurring perks read as upkeep). *Composes with the v1.4.1 Flexible Cellar* (below).
*Scoring* is still the inland network ★ (node delivery pts + slot bonuses, banked live) replacing majorities.
*Sim-gated (KEY v79, `sim-results-v79.txt`):* base regression + OVERLAND both **0 crash/deadlock 2–4p**, pace
**100% in the 12–25 band** (avg ~18–20 rounds), clock-dominant; `ai-render-smoke` drives the **slot picker + the
Rhine leap** and a full Cellarmaster game with all three expansions on through the **real** render layer; the AI
ladder is clean (0 errors). *Open ⚙ (for the persona oracle, not the greedy bot):* the exact slot magnitudes &
per-lane delivery points (first pass — East currently the point-heavy lane by design); a **manual bonus-resolution**
picker for the choice-bearing slots (v1 auto-resolves the bonus, the player only picks *which slot*); whether to
bump core-city delivery points to sharpen the lane point-gradient.

**v76 EXPERIMENT — the Brewhouse↔Cellar grid swap: TESTED, then REVERTED** *(2026-06-21, sim-gated, not shipped)* —
A playtest hypothesis — swap the Brewhouse(Brew) and Cellar(Age) stations in the 2×2. A mirror-match A/B (360 games,
gm+cm × 2–4p, `playtests/sim-results-v76-swap-ab.txt`) showed it **breaks clock-dominance**: GM games end on the
sailed-ships clock only **23–50%** of the time (base 83–97%), drift ~2–4 rounds to the round ceiling, and score
~2–6 pts lower. **Cause (line-usage probe, real turns only):** the swap pulls **Brew off its shared line with
Source** — you can no longer gather goods *and* brew them in one activation, so Brew firing falls ~28%→22% and the
whole engine slows. (The Age↔Ship split first blamed was a red herring — Age+Ship is the *least*-used line, ~18–21%;
aging is free anyway.) **Lesson:** the load-bearing line is **Source+Brew** (the engine's heartbeat), not the
delivery pairing — and *balancing for its own sake can flatten the texture that makes the game fun*; the occupancy
toll + variable slots already supply the interesting friction. Reverted; the Flexible Cellar (below) was kept and
shipped standalone.

**v1.4.1 “Flexible Cellar” — the Cellar visit becomes an any-order, chaining menu** *(2026-06-21, `play.html` KEY v78)* —
A small UI/flow fix to a too-rigid station. The
Cellar **forced Age first, then exactly ONE of { Tap, buy Improvement }** — which blocked legitimate combos. It is
now a **flexible menu worked through in ANY ORDER until Done — { Age · Tap a cask · Blend (expansion) · buy an
Improvement }** — and, crucially, the steps **chain**: what one step produces is available to a later step *in the
same visit*. The two motivating combos now work: **Tap → Buy** (Tap a Gruit for **+2 goods**, then buy a private
Improvement with that grain) and **Tap → Age** (Tap a "wild" cask to **brew**, then use the Cellar's **Age** on the
freshly-brewed cask). **Age & Tap stay once-per-visit** (Age grants the fixed pool; Tap is the relief valve); Blend
and Improvement-buy repeat while legal (self-limited by Ready casks / goods / the `IMP_AREA_CAP`). *No new powers —
just the removal of the artificial ordering and the "one-of" restriction.* **Engine note:** the menu re-uses the
legacy `UI.sub==='tap'` literal (so the in-page AI and the headless sim/bot keep driving it unchanged) with its real
state on a persistent `UI.cellar` record; each menu choice routes back through `resume('cellarmenu')` so the visit
continues, and the menu auto-exits to the line once no legal option remains. `snapshot()` is taken before every
mutating step, so Undo unwinds one menu step at a time. *Gates (KEY v77):* render-smoke **PASS** (incl. the Blend
path + a Cellarmaster game with all three expansions on); sim 300 = **0 crash/deadlock 2–4p**, clock-dominant
(2p 100% · 3p 96% · 4p 95.7%), pace in band; AI ladder clean. The greedy bots age-first-then-tap/buy exactly as
before (no behavior/pace regression); the new chaining is a human/strong-AI affordance. *(Gates re-confirmed at
KEY v78 after the v76 swap was reverted: render-smoke PASS, sim 300 clock-dominant 2p 96% · 3p 95% · 4p 96%.)*

**v2.0 “The Trade Roads” (Overland) — the inland geography as the Hanse NETWORK** *(2026-06-20, `play.html` KEY v75)* —
The third opt-in expansion, and the successful re-take of the inland geography on the lesson the earlier attempts
taught: **a second geography must be powered by the engine's output and feed back into it — route THROUGH the
keystone, never beside it.** It lands on a small **EXPANSION SPINE** (a `registerExpansion` registry +
`fire`/`collect`/`expSetup`/`expRender` hook seams) so the whole feature is **one self-contained block** the core
never tangles with — adding the next expansion is append-a-module; removing one is delete-a-block.
*The model* (a first **siloed-roads** cut — 4 independent linear tracks, KEY v74 — was reworked at the table's
request into a connected map): the board is a **tree rooted at HAMBURG (home)** with **two roads from the start** —
**West** to the **Bruges gateway** (which branches to **London**, **Bergen**, and the **Rhineland** spur) and
**East** on the long deep haul to **Novgorod**. London/Bergen routes pass *through* Bruges (the gateway is
structurally first); Novgorod is the independent deep lane.
*The loop (rides the Ship action — no new station):* a **VOYAGE** to a kontor (one ship, any casks — full keystone:
demand die · Q4/Q5 premium · the Flight; or a Charter) advances each owner's **caravan ONE node** along that
kontor's route — **per voyage, not per cask** (the fix for the old "2 casks = 2 towns" flatness: casks drive
*value*, voyages drive *depth*). **Quality GATES depth** (you only step onto a node a cask on that voyage can
clear), so **reach (breadth) and quality (depth) both win**. **Presence markers ARE the caravan trail**
(repurposed from the now-majority-less barrels) — the board shows who's gone where & how deep.
Reaching a node, **each cask aboard CLAIMS an open Staple-Right SLOT there, in load order** (v2.1 — the
founder/recurring-perk model was retired as per-turn tabletop upkeep): a **distinct ONE-SHOT bonus** + the node's
delivery ★, **flavoured by lane** — **Rhineland = craft** (recipe · a brew action · +age) · **London =
infrastructure** (a Building — from the display, placed at once (v2.2) · a free Improvement) · **Bergen = logistics** (charter contracts · goods · a
vessel) · **East = depth/value** (a vessel · +quality · big points). A full node pays the line's small **overflow**
(never nothing); active slot count **scales with player count** and the deep ◆ terminals (Frankfurt/Pskov) stay
**scarce**. **Bruges is the lone no-slots gateway** (recipe OR 2 goods); the other kontore — **London/Bergen/Novgorod**
— now **also carry slots**, claimed when the caravan reaches them, on top of their base sea benefit. **Frankfurt** is
a points + free-**Enshrine** outlet; **Pskov** is just a delivery (**one slot +8★, then +5★** each later visit). The
**Rhine Charter** (a Q4+ Charter) skips Bruges → Cologne. **Kontor majorities turn OFF** (`replacesMajorities`);
**Reach / Bergen's benefit re-home** to a caravan road step via the `reach`/`voyage` hooks (no orphans). The caravan
rides voyages so it's **clock-tied** (every step is a Sailed-Ships tick); `SAILED_CAP` **+2** pays it back.
*Gates (KEY v75):* base + EXPANSION **unchanged**; **OVERLAND 300 → 0 crash/deadlock 2–4p, 100% pace-in-band,
clock-dominant**, winner inland **~17–19★** (the siloed cut's ~33★ over-weight corrected); render-smoke clean incl.
a **full Trade Roads test** (voyage → reach the gateway → 2nd voyage founds a town → score → majorities off → salt
perk) + a Cellarmaster game with **all three** expansions on; **ladder PASS, errors 0**. *Watch-items (tuning, ⚙):*
the West-broad/East-deep ★ balance; 2p clock length (clock bonus trimmed 3→2); whether the deep East (Pskov, Q5)
is reachable enough in human play; a road-beer specialty + richer cross-road set-scoring are noted future
extensions. **Specialty Beers & Jopenbier remain inline** (pre-spine) — an optional later migration, not required.

**v1.9 “Beer Atlas” — Option A complete (blending + thematic Buildings); Inland Road / Option B rolled back** *(2026-06-20, `play.html` KEY v73)* —
Two things happened here, recorded together because the second is the reason the first was re-done cleanly.
**(A) Option A is completed** with the two pieces that were "staged next" after the capstone: **Blending** — a
**Cellar** action (with Specialty Beers on): combine **two Ready vessel casks → one premium cask at +1 quality**
(the higher +1, cap Q5; it inherits the higher beer), in a freed vessel — the deep player's *active* turn (reach
Q5 without Bock; a use for two aged casks). A human Cellar action; the v1 AI skips it (a forced render-smoke test
covers the engine). And **three thematic Buildings**, in the deck only when Specialty Beers is on (`exp:true`):
**Salt House** (a cask shipped from here → its owner +1 G +1 H on delivery), **Smoke Kiln** (+1 quality, cap Q5,
via `caskEffQ`), **Parti-Gyle Tun** (deploy a cask here → a free small Gruit to an open vessel; added to
`aiPickBuilding`'s preference). *Gates (KEY v73, `sim-results-v73.txt`):* base + EXPANSION **0 crash/deadlock
2–4p, pace in band**; render-smoke clean incl. the **BLEND test** (two Q3 → a Q4) + a Cellarmaster game with both
expansions on; ladder errors 0. With this, **Option A — the Beer Atlas — is complete**: characters (Specialty
Beers) + a depth capstone (Jopenbier) + the combo/throughput polish (blending + thematic Buildings).
**(B) The Inland Road (Option B) was ROLLED BACK.** It was prototyped across v69–v72 (an additive overland
tech-ladder → a contested charter board → a version that *replaced* the kontor majorities). A post-build audit
found it **sat beside the engine, not through it**: a caravanned cask never ran `deliverCask`, so it **bypassed
the keystone** (value-buildings, the demand die, the Q4/Q5 quality premium) and **never counted for the Flight**;
the v72 "replace majorities" move then **deleted a tuned lane** (Volume — one of the five) for an untuned
charter-count race, orphaning Reach/Keut/presence and mis-counterweighting the Hall. Rather than surgically
unpick it from the latest build, we **reset `main` to the foundation (`82e9aa9`)** — base + Quality Pays +
Specialty Beers + Jopenbier — and **re-applied only the genuine Option-A work** (blending + thematic Buildings),
which had been entangled with the Inland commit `1d8328f`. The Inland work is **preserved on
`archive/option-b-inland`** for a future, properly-integrated Option B. **Lesson:** a second geography must
*express* the engine (route through buildings · let quality/premium matter · feed the Flight) and **extend** a
lane rather than delete one — and keep expansion modules in **separate commits** so one can be dropped without
unpicking another. All numbers ⚙.

**v1.9 “Jopenbier” — the EXPANSION CAPSTONE (a 2nd opt-in toggle)** *(2026-06-20, `play.html` KEY v68)* — **The
depth counterweight that completes the roster arc: a slow, dear, super-valuable Q6 “vintage” beer (Danzig).**
Where the three Specialty Beers add *breadth* (characters across the low/mid band), Jopenbier is the all-in
*deep* play — two incompatible plans on turn one. Its own toggle, independent of Specialty Beers. Design calls,
each chosen to avoid rippling a tuned system: **(1) “Q6” is display-only — scored SELF-CONTAINED** (`deliverCask`
special-cases it: `JOPEN_BASE` 8 at a kontor / `JOPEN_HALL` 9 enshrined, never the Q-keyed Hall/Novgorod/premium
tables), so a sixth rung can’t leak into any balance dial. **(2) Aging-as-value (the novelty the game lacked):**
once DEPLOYED it *cellars on the dock* — **+1★ vintage per owner-turn, cap 5** (`jopenVintageTick` in `endTurn`),
folded into its delivered value; the longer (riskier) you hold it the bigger the payoff, and it stays
contestable on the slot (a rival can hijack-ship it to deny the peak). **(3) Floor synergy:** pinned to
**Source**, so the long ready-4 maturation funds itself on the Floor (the existing vessels-power-the-Floor rule
does the work — no new code). **(4) Always *acquirable*, not drafted** (the looming moonshot every game it’s on)
and **excluded from the Flight** (a capstone, not part of your range — this also dodges the `FLIGHT_PTS[6]`
edge). **(5) The race-to-end:** the slowness + the visible recipe give the end-clock a second job — rivals push
the Sailed-Ships track to deny a maturing Jopenbier. *Gates (KEY v68, `sim-results-v68.txt`):* base regression +
EXPANSION + JOPEN all **0 crash/deadlock** 2–4p, pace in band; `ai-render-smoke` drives the capstone end-to-end
(banks `JOPEN_BASE`+vintage, records Q6, Flight-excluded) through the **real** render layer; ladder 0 errors.
*Note (AI wired — KEY v68 follow-up):* the **Cellarmaster, the deep MC-rollout, and the `sim.js` deep persona
now pursue the capstone** — acquire → bank 4 hops → brew → **cellar-then-cash** (`aiJopenHold`: hold a deployed
Jopenbier until ripe or ending, never strand it; `caskValueAt` prices it self-contained so a ripe one ranks
right). Oracle (`JOPEN=1 CELLAR=1 PERSONAS=1`, `sim-results-v68-jopenbier-ai.txt`): the deep lane lands it
~**0.07–0.11/game** (a rarely-completed moonshot, by design) with **0 crash/deadlock** and the **deep lane
unchanged — slightly-below-fair, do not buff to fair**. So the strong AI is now a real opponent/oracle for it
(human playtests + sim); tuning the capstone's numbers stays a human/strong-MC table question. All numbers ⚙.
**This completes Option A’s core** (characters + a depth capstone); **blending** and **thematic buildings**
remain as optional future polish.

**v1.9 “Specialty Beers” — EXPANSION (opt-in)** *(2026-06-20, `play.html` KEY v67)* — **The first expansion
module: an opt-in toggle that turns the beer roster from a ladder you climb into characters you main.**
*Diagnosis (the unlock):* the base beers are **rungs, not characters** — the two Q3s are near-duplicates, a
deployed cask's slot-action comes from the shared *quality* pile (so the beer name carries no board identity),
and higher quality is strictly *more*. The game has **exactly one breadth incentive (the Flight) and zero
depth incentive** — so maining a single beer is never correct (Keut, with its bolted-on +1-presence, is the
lone exception that proves the rule). *The fix (this module):* a **New Game checkbox** ("Specialty Beers")
that adds three new pinned-signature beers to the export draft (**3 of 7**, C(7,3)=35 ladders vs the base
C(4,3)=4); **OFF by default → the base game is byte-for-byte unchanged** (the whole point — the expansion
never touches the base unless you opt in). *The agency resolution:* base climb beers **keep the steerable
pile**; a specialty beer is **pinned** (its slot-action is fixed/printed) — this just **generalizes Gruit's
existing `pin:true`**, so drafting a pinned beer *is* the agency, and the Orléans-lite steer is preserved.
The three (each one printed signature, reusing existing engine paths so the blast radius is tiny):
**Gose** (Goslar, Q2 `2G`, no hops — the grain-path) — *Salt Trade:* a kontor delivery throws off **+1G +1H**
(liquidity, via `deliverCask`); **Zerbster** (Zerbst, Q3 `3H` — the hop-bomb) — *Parti-Gyle:* brewing it also
fills an open vessel with a **free small Gruit** (the weak second runnings — throughput + the Flight; lost if
no vessel is open); **Duckstein** (Königslutter, Q2 `1G1H`, ready 2) — *Smoke-Hardy:* ships & scores as **+1
effective quality** (reuses `caskEffQ`, exactly like an innate Malt Kiln — a humble beer that reaches the
Novgorod long-haul). *Sim gates (KEY v67, `sim-results-v67.txt`):* **base regression** clean (0 crash/deadlock
2–4p, pace + behavior identical to the v66 baseline — proves the toggle truly isolates) and **expansion on**
clean (0 crash/deadlock, pace 16–17 rounds in-band); `ai-render-smoke` passes including a forced all-specialty
game through the **real** render layer; the AI ladder shows **0 errors** (the 59% journeyman→trader rung is
the documented v1.3 compression, not a regression — base AI/rules untouched). *Known reads / open ⚙ (for the
persona oracle, not the greedy bot — which can't pilot signatures):* the specialty beers skew lower-quality so
the greedy ceiling dips a touch; **Gose's liquidity** wants a persona/strong-AI check for a goods-snowball;
all magnitudes are first-pass ⚙. *Staged next (Option A's arc, each its own sim-gated increment):* **Jopenbier**
the vintage/"Q6" super-beer (aging-as-value + the Floor-works-while-aging hook + the race-to-end drama, scored
**self-contained** so it can't ripple the Q-keyed tables) → **blending** (the deep player's active turn) →
**thematic buildings** (Parti-Gyle Tun · Salt House · Smoke Kiln). Asymmetry stays a *base*-game item, a
separate axis. *(This is the "Beer Atlas" path — content under one grammar, riding the existing deal-3
machinery. Design discussion + the rejected/deferred forks: the Renown depth-track and the eastern kontor are
held as sim-gated maybes; the destination-board swap is the deliberate heavier horizon.)*

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
(bought for goods at the Market — costs below are the v1.5-era prices, **superseded by v1.7's "−1 G
each, bought at the Cellar" cut**; current costs are `3 G`/`3 G`/`4 G`, see COMPONENTS.md §9): **Harbor Crane** (`4 G`, your Harbor load sets out **2 casks**, not 1),
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

- **Arc analysis (v53/v54):** the **Trader climbs eagerly** (full recipe set ~R8, Q5 ~40%)
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
