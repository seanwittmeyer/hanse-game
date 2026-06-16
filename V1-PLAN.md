# Brewhouses of the Hanse — v1.0 "Demand" — clean-sheet plan

> **Status:** planning (opened 2026-06-16). This is the roadmap for a clean-sheet
> reconception. The live game (v0.16.1 "The Wharf") is archived at the git branch
> **`archive/main-v0.16.1`** (commit `31311b7`, `play.html` `KEY = v47`) and stays
> playable on `main` until v1.0 is itself playable. Revert path = that branch.
>
> **Why now.** v0.16's balance work was disciplined and it landed (4 lanes ≈ 25/21/32/21).
> But playing it with humans surfaced the gap the balance numbers can't see: the game's
> *soul* — the public-middle production line and the withdraw-to-Hall move — lives in an
> **object** (the cask) and a **moment** (Enshrine), not in the **turn-to-turn decision**.
> The cask doesn't *bite* every turn the way a Lisboa card or a GWT track does. v1.0 fixes
> that at the root rather than with another balance lever.

---

## 1. The spine — board-authored demand

**The 8 slots stop being a transient cargo commons and become the live, player-authored
demand board.** A cask in a slot **declares what's valuable** (a goal/demand the whole
table can read and race); an owned building under it **shapes that slot's market**;
delivering or enshrining **converts demand into points**. The private brewery floor is the
**stable counterweight** to the contested ring.

This single move does what the v0.16-era review listed as four separate fixes:

1. **The cask bites every turn (the Lisboa squeeze).** Deploying to a slot stops being free
   gravy — it's a *declaration*: you reveal what's in demand, create a contested target,
   expose the cask to rival hijack-loading, and tell rivals where the points are. The
   demand a cask broadcasts is **printed on it, independent of its own quality** (same
   decoupling we already proved with v0.12 cask-actions), so deploying is a real
   information-reveal and commitment, not a self-serving multiplier.
2. **It gives the lanes genuinely different temperaments (the real lane problem).** Today
   "volume" and "majority" collapse into one race because both are just "ship wide." Under
   v1.0 they split by *temperament*: **majorities = the steady, board-agnostic floor**
   (raw cask count, the points you grind when the board is cold), and **demand bounties =
   the volatile, contextual lane where quality lives** (read the room, send the right beer,
   spike or miss). A *braid of two* (GWT-style) — a majority floor plus demand spikes —
   beats a single-lane race.
3. **It is replayability content, not rules.** A deck of demand faces is the
   Wingspan/Orléans content spine the game lacks — dozens of small unique "what's hot"
   pieces, all run through **one** grammar (in slot = demand, delivered = points).
4. **It restores authorship of the scoring landscape (GWT's built track).** Players write
   what scores by what they deploy — the original §19 vision, reborn clean.

## 2. Pillars for v1.0 (carry forward + new)

- **(carry) The mechanic is the theme.** Hopped beer survives the voyage → it's the export.
  Demand = what the kontore want this season. Nothing bolted on.
- **(carry) Crisp turns, deep decisions.** Medium weight, GWT/Distilled — depth in
  placement/timing/interaction, not turn length or rules mass.
- **(carry) Interaction through a shared board, never take-that hard-locks.**
- **(NEW) Depth in ONE place.** Concentrate richness in the slot (demand + composable
  building). Everything else gets *simpler* to pay for it.
- **(NEW) Content, not rules.** We are at high complexity; v1.0 spends its variability
  budget on **decks of small unique pieces under one grammar**, not new subsystems. The
  test for every piece: *can a new player resolve it from the single grammar with no
  reference?* If no, it's a rule — cut it.
- **(NEW) The cask must bite every turn.** If deploying a cask isn't a real, rivalrous
  decision, the design has failed its own premise.

## 3. What's KEPT (the clean sheet is the slot/scoring layer, not the game)

- The **theme & setting** (1350 Hanse, the merchant brewing house, hopped-beer-as-cargo).
- The **Wharf**: the shared 2×2 of stations (Market·Brewhouse·Cellar·Harbor) ringed by 8
  slots; orthogonal move; activate row XOR column; resolve the line's stops.
- The **Source → Brew → Age → Ship** spine and the **dual-role cask** (maturing → on a slot
  → delivered). The cask is *more* central in v1.0, not less.
- The **four kontore** (Bruges/London/Bergen/Novgorod) and **the Hall / local Enshrine** as
  destinations — but their **scoring is reconceived** (majorities kept; per-cask delivery
  value relocated to the board; the Flight kept; Hall reconceived; §5).
- The hard constraints: **no dice, no cards-as-hand, no money** (goods are the only
  currency; standing is unspendable score).
- The **sim-gate discipline**: nothing ships without `sim.js` (crash/deadlock-free, pace in
  band) + PATHWAYS lane balance + `ai-ladder`. Clean sheet ≠ throwing away the lessons.

## 4. What's RECONCEIVED / ON THE TABLE

- **Slot role → demand board + composable owned buildings.** A slot reads
  `[base/owned building] + [occupant: cask or ship]`, with **one universal rule: the base
  modifies its occupant.** Variety lives in the *building deck* (content), not in
  special-case interactions (rules). Owned (greater benefit to owner, still serves all), but
  the "serves all" routes through the **demand system**, not a revived goods-skim
  (rich-get-richer was why v0.7 cut skims).
- **Scoring → demand-driven.** Goal tiles **dissolve into the demand board** (the slots
  *are* the goals now), and the **flat per-cask delivery value** (quality number + dest
  modifier) is **relocated to the board** — the demand/building defines what a delivered
  cask is worth. Quality keeps its other jobs (the **Flight**, gates, the Hall); majorities
  stay as the stable floor. See §5.
- **The cask-action pool folds into the demand face.** One tile per cask carries both its
  demand broadcast and (optionally) its slot-action — fewer things printed, more meaning each.
- **The private fallback returns (deliberately).** Casks in your vessels become **stable
  private actions** you can take when the contested ring is blocked/unfavorable — the
  boutique brewer working their own floor. This is the one place we *add* a rule back; it
  earns its keep now because the ring is a high-variance demand/contest layer and the deep
  lane needs a stable counterweight. Gate it as "the deep lane's anchor," not a universal
  alt-action.
- **Ship / Charter economy simplified.** Once the ring's role is "scoring rubric you author"
  rather than "scarce cargo space you deadlock on," the relief-valve scaffolding (charter
  contracts, sail-full bookkeeping) can shrink. Revisit after the demand loop is felt.

## 5. LOCKED decisions (2026-06-16)

**F1 — Demand → points: LIVE FULFILLMENT.** A demand sitting in a slot pays a bounty the
moment you deliver a matching cask, then is consumed and refreshes. A flowing, GWT-tempo
economy; the cask bites *now*. Intrinsic value is gone (see the philosophy below), so the
bounty *is* where points come from on the demand side.

**F2 — Scoring radius: REPLACE goals AND intrinsic quality-value; KEEP majorities.**
- **Goal tiles dissolve** into the demand board (the slots *are* the goals).
- **The flat per-cask delivery value is relocated to the board.** Previously a delivered
  cask scored its quality number + a destination modifier (`Q5 = 5 + dest`). That value now
  comes from the **demand/building at the destination** — a quality is worth what the board
  says it's worth, *where and when*. A high-Q cask becomes **high-variance value**: big in a
  room that craves it, weak in one that doesn't. (The old flat premium — Q4+1/Q5+2,
  Novgorod-pays-high — folds into this.)
- **Quality keeps its other jobs — it is NOT worthless by default.** **The Flight stays**
  (a range/set-collection reward — breadth, not "higher = more"); quality still **gates**
  where you can ship (dynamic demand gates); the **Hall** still rewards your finest
  (prestige; ladder ⚙TBD in §22). **The Masterpiece stays on the table** (reconsider, not cut).
- **Majorities stay** — raw delivered-cask count at each kontor — as the **stable,
  board-agnostic points floor**: the way to score when the demand board isn't going your
  way. The steady lane.

### The philosophy — "the right beer for the right room"
*Quality is a construct; the board manifests or defeats it.* A Bock isn't worth more because
it's a Bock — it's worth a lot **only when a room demands it**, and a miss when it doesn't
(you don't serve Leffe at the beer-pong table). **Where you send a cask is a read, not a
ladder.** Quality becomes **high-variance**: few rooms want your finest, but those that do
pay big; cheap-and-cheerful finds a buyer almost anywhere but never spikes. This *is* the
original Westvleteren-vs-Leffe axis (DESIGN §4), reframed from "deep vs wide" to "read the
room." **Scope it carefully:** it's the **delivery value** that's contextual — quality's
*range* reward (the Flight), its *access* (gates), and its *prestige* (the Hall) remain
intrinsic. A climber is still rewarded; what's gone is only the *guarantee* that a higher
number pays more at the dock — that payoff now has to be *manifested* by the board.

### The lane map that falls out
- **Majority lane** — ship wide; steady, board-agnostic floor. The safe play / catch-up.
- **Demand lane** — read the board, send the right beer to the right room; volatile bounties.
  *This is where quality's delivery value lives* (contextually). The skill lane. (The
  **Flight** still rewards building the full range across it.)
- **Prestige / the Hall** — the one *standing* demand for your finest: a capped, throttled
  outlet that anchors the deep/boutique brewer, so quality has a floor even when the board is
  cold. Reconceived (not a by-quality ladder); the deploy-then-enshrine throttle and
  clock-advance survive. ⚙ to-spec in §22.
- **Engine / upgrades** — capacity to do the above better.
The **braid** (GWT goal): majority floor + demand spikes, or commit deep to Hall + demand-
for-quality. No lane wins solo.

### Consequent calls (my resolutions — redline freely)
- **Destination quality-gates become dynamic demand, not static thresholds.** A kontor wants
  a given quality *this season* (a demand face), not forever — consistent with "the board
  manifests or defeats quality."
- **The Hall survives, reconceived** as the standing quality-demand (capped/throttled) — keeps
  the deep lane a home and the theme intact. Whether it keeps a by-quality prestige ladder or
  flattens is ⚙TBD in §22 (it's a legitimate intrinsic-quality reward, so it may stay scaled).
- **Bock/recipe costs unchanged for now** (3G2H, ungated). With value now contextual, the
  reachability question changes shape; revisit after the demand loop is felt.

## 6. Roadmap (phased; one spine at a time, each sim-gated)

- **Phase 0 — Archive. ✓ (this session.)** `archive/main-v0.16.1` branch on origin; local
  `v0.16.1` tag (proxy blocked the tag push — branch is the canonical revert point).
- **Phase 1 — Lock the spine.** F1/F2 locked (§5). Write the detailed mechanic spec as a new
  `DESIGN.md` §22 (demand grammar + faces, the slot composition rule, the private floor,
  the reconceived Hall, majorities-as-floor, lane braiding, end clock). Paper-first; ⚙.
- **Phase 2 — Components & content.** The demand deck, the building deck (one grammar, many
  cards), the quality ladder under demand, in `COMPONENTS.md` terms. This is where the
  "content not rules" budget is spent.
- **Phase 3 — Prototype engine.** Build v1.0 as a **sandbox `play-v1.html`** forked from
  `play.html`, published to `main` alongside the live game — so you can playtest v1.0
  progress at `/play-v1.html` while `/play.html` keeps serving v0.16.1 untouched. (Honors
  "the user only sees `main`" without breaking the live game.)
- **Phase 4 — Harness.** Port `playtests/sim.js` to drive the new engine; gates:
  crash/deadlock-free, pace in band (~12–25 rounds), **4 genuinely distinct lanes**
  (PATHWAYS), `ai-ladder`. Re-tune from there.
- **Phase 5 — Publish.** When v1.0 is playable and gate-clean, rebuild `learn`/`index`/
  `printables`, promote `play-v1.html` → `play.html`, and fast-forward `main`.

## 7. Guardrails

- **Clean sheet ≠ amnesia.** The v0.13→v0.16 lessons hold: correct *friction* with a
  *structure* lever not a value lever; one rebalance dial at a time; the win-axis is
  contested-kontore vs uncontested-Hall (demand now braids across it).
- **The complexity ledger.** Every rule added must be funded by a rule removed (goals→demand,
  cask-action→demand face, neutral→owned, ship economy shrink). If the ledger goes negative,
  stop.
- **Sim-gate everything**, exactly as today. Paper → spec → sandbox → sim → publish.
