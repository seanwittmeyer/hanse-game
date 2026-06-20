# Brewhouse Gatekeeper — v2.0 "The Trade Roads" (KEY v75)

> **Run:** 2026-06-20 · **Build reviewed:** v2.0 "The Trade Roads" (base v1.8 "Quality Pays"),
> `play.html` KEY `hanse-hotseat-v75`, just after the Trade Roads → **Hanse Network** rebuild.
> **Skill:** `brewhouse-gatekeeper` (panel + pull-framework + comps).
> **Evidence base — read this first:** every balance/skill number here is **bot data** (the headless
> `sim.js` + the `ai-ladder.js` tiers). That is *analysis*, not table data. The single load-bearing
> question — **is loss legible to a human?** — is explicitly **unmeasured** and marked as such
> throughout. "The structure suggests X" = analysis; anything needing a human table is flagged.

---

## 1. The verdict

**Weak yes — and only because the *base* architecture is genuinely depth-shaped and out-depths
Distilled. It is not shelf-ready, for a specific reason: the game has been tuned exhaustively
against bots and never stress-tested for *legible loss* at a human table — the property that
actually gates retention at this weight.** We've optimized what bots can measure (0 crashes, pace in
the 12–25 band, a clean AI skill gradient) and left unproven what they can't (can a human name the
decision that cost them?). Layering a third expansion on that gap is building variety pull on an
unvalidated depth core. The core has the bones; prove it before adding more rooms.

## 2. The panel

- **The Critic — cautious yes, nervous about sprawl.** The dual-role cask (a brewed cask is your
  *action* on a slot *and* your cargo; shipping it spends it) is a signature the genre doesn't own —
  a real reason to exist next to GWT. But five scoring lanes + three expansions is a lot; it's not yet
  shown that the Flight (Range) lane or the wharfage/developer micro-scoring earn their ink. *Flips to
  yes when every lane forces a coupled choice — especially when Range stops being a delivery byproduct.*
- **The Buyer — yes on the hook, yellow flag on the stack.** "Run a medieval Hanseatic brewing house"
  is a one-sentence pitch to someone who owns 200 games, and no major comp owns the setting. But three
  expansion toggles before a single human playtest reads as "a base that needs expansions," which is a
  reprint/longevity worry. *Flips to yes when a 30-second demo lands the dual-role-cask "aha", base-only.*
- **The Optimizer — interested, unconvinced.** The AI ladder is the best thing in the repo for me:
  stronger tiers beat weaker reliably (journeyman 89.5% → cellarmaster 70% over the GM) = real evidence
  skill converts and the space isn't solved; the demand die makes value computable. But 4p slot-jam + a
  P1 seat skew in the sims, a deep/Hall lane that's *by design* "stars-align" variance, and five lanes
  risking points-salad all worry me. *Flips to yes when 4p is fair and loss is diagnosable at a table.*
- **The Bridge Player — base could work; all-expansions is a wall.** Warm start (turn-1 Ready Gruit, a
  building in hand) + the Hall's printed 3/5/7/9 floor are a decent on-ramp. But Wharf row/col + slots +
  demand dice + five lanes is already chunky, and all three toggles is a wall. *Flips to yes when a
  base-only first game, played badly, is still satisfying and the engine-build payoff is visible.*

**The spread:** no hard no, but three of four are conditional on the *same* two things — human-table
legibility and 4p fairness — and two flag complexity sprawl. The pattern is **"unvalidated + over-built,"**
not design failure.

## 3. Strengths (mechanically, not vibes)

- **The dual-role cask is load-bearing and good.** Same cask = action *and* cargo → a recurring
  hold-vs-ship tension on every cask; nothing is throwaway. This is the GWT-grade idea.
- **Demand dice make the Demand lane legible.** Value rides a physical d6 on the cask; you can *see*
  the ★ before it banks → directly serves legible loss (the player can price the decision).
- **Owned-but-shared slots are real interaction.** Wharfage, loading a rival's cask, racing berths, the
  developer lane on overbuild — opponents pressure you. This is where it beats Distilled's solitaire.
- **The v1.8 quality premium landed.** Q4/Q5 building bonuses make the hops-led climb a coupled
  cost/reward; sims show the ceiling rose with no cheap-Q3 volume leak. The fix did its job.

## 4. Weaknesses and cut corners

- **Five lanes + three expansions = illegible-loss risk** (the most dangerous flaw for this weight).
  Base may be legible; the fully-loaded game is where "lost by 6 across five axes, can't name the line"
  lives. Untested, structurally present.
- **The Network is a tree with one junction sold as a "network/tech-tree."** Mechanically it's four
  linear trunks sharing the Bruges node; cross-road interaction is mostly perk-stacking, not routing.
  Sims: **winner founds ~5 of 7 towns** → low contest / soft runaway risk; the map leader may pull away.
  Better than the siloed version and rides the keystone correctly, but doesn't yet deliver the
  "navigate a contested geography" fantasy the name promises.
- **The Flight (Range) lane may not pay for itself** — distinct beers fall out of climbing the ladder;
  if it scores without a sacrifice, it's a free rider.
- **4p is the weakest count** — sail-when-full + 8 tight slots → ring jams, charters spike, P1 seat
  skew in greedy sims. Possible over-difficulty on tempo + seat unfairness.
- **The deep lane's designed variance flirts with illegible loss.** "Stars-align, don't buff to fair"
  is a defensible identity for one lane, but a deep loss explained by "the casks didn't align" is one a
  heavy player can't diagnose. Keep it; watch it.

## 5. The depth dial

- **Too thin (corner-cut):** Network connectivity; Flight-lane coupling; the 5p mode (already flagged).
- **Too punishing/swingy:** 4p slot starvation + seat skew; the deep/Hall lane (by design).
- **Where skill converts (good news):** the AI ladder shows the core has a ceiling — build→demand→deliver
  is a legible skill expression and better play wins.
- **Is loss legible?** Honest call: **probably yes in the base, at risk with expansions stacked,
  unconfirmed at a human table.** Bots can't feel regret, so they can't certify this. Settle it with the
  §8 test.

## 6. The comp face-off

- **vs. Great Western Trail (the bar).** GWT *wins* on elegance (one signature track runs the whole
  game on multiple live clocks); Brewhouses has more subsystems doing comparable work — more sprawl,
  less refinement. Brewhouses *wins* on theme and **interaction** (shared slots, loading rivals' casks)
  where GWT is near-solitaire, and the dual-role cask is fresh. *Draw* on adaptive mastery. **Why keep
  Brewhouses?** Theme + interaction — *if* the depth proves out. Today GWT wins because its depth is
  *proven* and ours is *projected.*
- **vs. Distilled (the beatable target) — the key finding.** Distilled *wins* on tactile charm, teach
  simplicity, accessibility. Brewhouses *wins* on **depth + legible loss**: no card-market variance,
  coupled slot/building/demand decisions, a measurable skill gradient. **Not** the five-alarm case
  (less deep than Distilled) — plausibly *deeper*. The gap vs Distilled is **warmth/tactility**, not depth.

## 7. Pull diagnosis

**Intended engine: depth** (goods-only economy, no dice-as-randomness, no swingy hand, steerable brew
piles, coupled building→demand — a low-variance depth core, correctly built). **What recent effort is
actually feeding: variety** — the last several cycles all went to expansion *content* (Specialty Beers,
Jopenbier, the Network) while the depth core got **zero human validation**. That's the designer's-fork
trap *forming* (not yet sprung). The tell: if the base can't hold a table alone, retention is secretly
on variety pull and hostage to the expansion calendar. **The question for Sean:** is the base game the
*product* or the *platform*? The build history votes "platform"; the stated thesis (depth, GWT/Distilled)
wants "product."

## 8. The path forward

**Must-fix before shelf-ready**
1. **Validate legible loss at a human table — base only, expansions OFF.** *Problem:* the load-bearing
   retention property is unmeasured (bots can't feel regret). *Move:* after each game, before scores are
   shown, every player writes "the one decision that cost me." *Confirm:* players reliably name a
   *specific, reachable* line (not "bad luck") → depth pull is real. If they shrug, you have illegible
   loss and nothing else here matters.
2. **Settle 4p fairness + slot starvation.** *Problem:* sims show P1 skew + charter spikes at 4p.
   *Move:* watch for "couldn't deploy/ship when I needed to"; lever is slot count or the sail-when-full
   constraint at 4p, not a fee. *Confirm:* seat win-rates flatten, charters/game fall to the 2–3p band.

**Would-elevate-it-to-beat-the-comps**
3. **Make the Network actually contested (or shrink its billing).** *Problem:* winner founds ~5/7 towns
   — low contest, soft runaway, and it's a tree not a network. *Move:* add a genuinely shared junction
   two roads fight over (with an adjacency/set bonus), or rename it "two roads, a wide/deep fork."
   *Confirm:* founders are contested (later-arrival half-★ posts common) and map-leader ≠ winner 1:1.
4. **Prove the Flight lane forces a sacrifice.** *Move:* confirm chasing the 5-beer Flight costs tempo/
   quality elsewhere; if not, raise its cost or fold it in. *Confirm:* big-Flight winners visibly gave
   up Demand or Volume.

**Nice-to-have**
5. Tune the deep lane's variance band so a deep loss is diagnosable ("one Q5 short", not "casks didn't come").
6. The 5p balance pass (already known).

**If you do only one thing:** **stop adding expansions and put the base game in front of your team with
the legible-loss question (#1).** The highest-leverage move isn't a feature — it's converting the evidence
base from bots to humans on the *core*, because that's the input that tells you whether you're building
GWT's successor or Wingspan's.

---

### Scoreboard for the next run (diff against these)
- Legible loss at a human table: **UNTESTED** (the headline gap).
- 4p fairness / slot starvation: **flagged** (P1 skew + charter spikes in greedy sims).
- Network contest: **weak** (winner ~5/7 towns; tree-with-one-junction).
- Flight lane coupling: **unproven**.
- Depth vs Distilled: **plausible win** (no card variance; measurable skill gradient).
- Bot gates (not retention): crashes 0, pace 100% in-band, ladder PASS (every higher tier ≥60% at 2p).
