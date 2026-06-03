# Blend-balance simulation — findings & the structural fork (2026-06-03)

Target (per DESIGN.md "GWT blend ideal"): **no *pure* path wins; the winner runs a blend of two, and the winning blend varies by board.** Tool: `playtests/blend-sim.js` — 3 pure (R/S/E) + 4 blend (RS/RE/SE/RSE) archetypes, random table composition, 500 games/config. Metric: **per-archetype win%** (want pures *below* blends), not reach-vs-standing parity.

## The tuning journey (each fix relocated the runaway)

| Pass | Change | Result |
|---|---|---|
| 0 | v0.3 economy (token faucet on) | pure-standing **75–89%**, reach **9–12%** (dead) |
| 1 | kill passive token faucet, compress tokens, rebalance goals 3R/3S/2E/1N, tighten caps | **standing/engine pures now top (50–81%)**, reach collapses (3–11%) |
| 2 | cap goals to best-3, give reach stackable lane value | **reach runs away (60–82%)** via lane-stacking |
| 3 | cap lane stacking (`LANE_MAX`) | **current best** (below) |

**The lesson, stated plainly:** whichever single scoring axis is left uncapped becomes the dominant strategy. Tokens → standing/goals → reach all took turns running away. A heuristic bot will always find and ride the uncapped axis.

## Current directional config (pass 3)

| | 2p | 3p | 4p |
|---|---|---|---|
| End via 2-of-4-cities | 47% | 54% | 47% |
| Winner was a blend | 47% | 44% | 42% |
| Pure-standing win% | 73% | 52% | 47% |
| Pure-reach win% | 37% | 34% | 35% |
| Archetype win% range | 25–73 | 17–52 | 6–58 |

**Verdict: much healthier than pass 0, but the GWT target is NOT yet met.** Per-archetype, pure **Standing** (and **Engine**, which in this model is "quality+") are still the strongest single archetypes, and **RE/RSE blends are weak**. "Blend won ~44%" only matches the 4/7 share of blend archetypes — blends aren't yet *out*-performing pures per-capita.

## Why — the structural finding (this is a design decision, not a number)

**Standing has two scoring axes; Reach has one; and the value track disciplines neither.**

1. **Goals ride on enshrined casks.** Every enshrine carries a goal, so goal income is gated by — and scales with — the Standing path. A pure-reach player holds **zero goals** (0.0 in every run). So Standing scores on *both* printed standing **and** goals, while Reach scores only on board presence (which is hard-capped by city sizes).
2. **The value-track decay only touches VP tokens, not printed standing.** So flooding one type with enshrines is never punished — Standing ignores the value economy entirely. (This follows directly from the locked rule "cask tiles keep printed VP; tokens are the modifier.")
3. **Net:** Standing is structurally ahead because it has the extra (goal) axis and is immune to saturation. No amount of token/lane tuning fixes this; it just moves the runaway.

## The fork (needs a design decision)

To make *any two of three* viable and board-dependent, one of these structural moves is likely needed:

- **A — Detach goals from enshrines (GWT-style objective tiles).** Goals become separate end-game objectives any path can pursue/claim, not riders on enshrined casks. Cleanest GWT analogue (their objective cards); biggest change to the current "goal-on-the-standing-face" design.
- **B — Give Reach a second axis.** e.g. a "trade-network" score (connected routes / kontor set bonuses) or much heavier majorities, so reach has board-presence *and* a structural bonus to mirror standing's goals.
- **C — Let the value track modulate standing too.** Enshrine value = printed × current value-fraction, so flooding one type discounts its standing — disciplines standing-spam. *Tension:* softens the locked "printed VP" rule.
- **D — Symmetric cross-couplings (rock-paper-scissors).** Re-author goals so reach-goals reward *standing*, standing-goals reward *engine*, engine-goals reward *reach* — a cycle, so each pair is a viable blend. Keeps goals on casks but removes the reach-bias.

My lean: **D + a capped version of A's spirit** — keep goals on casks (thematic, self-documenting) but (i) make the couplings a cycle so no single leg is mandatory, and (ii) keep the best-N goal cap so standing-spam can't run the goal axis away. **B** is a strong complement to give reach its own second axis.

## Fix D applied (cycle the couplings) — result + the deeper realization

Re-authored the goal pool to a **3-way symmetric cycle** (3 reach-rewarding + 3 standing-rewarding + 3 engine-rewarding, all capped, best-3 score), removing the pure-standing volume amplifiers.

**It worked on its target:** pure **Standing** dropped from dominant (89%) to **6–49%** — the goal axis no longer funnels through standing-spam. Blends RS and SE are healthy and the winning blend varies by the goal deal.

**But pure Engine (38–83%) and pure Reach (39–48%) are now the over-performers, which exposed the real structural truth:**

> **The three leanings are NOT orthogonal.** You climb the type ladder *by brewing & banking higher casks* — so an "Engine" player inherently does **Standing** too (pure-E is a disguised SE: it posts stand ≈ 20 and fills both the engine- and standing-rewarding goals). And **both sell-modes mint tokens** (ship → reach + tokens; enshrine → standing + tokens), so "Engine" is not a third *action* — it is a **timing multiplier** on the two real paths.

**Reframed model:** Breweries is **two paths — Reach vs Standing — with engine/value-timing as connective tissue both use.** The GWT "three legs" maps imperfectly; the achievable ideal is **"Reach + Standing, tempo-tuned by engine,"** where pure-Reach and pure-Standing both underperform a reach/standing blend. By that two-axis target the current state is close (RS healthy, both pure extremes beatable); "pure Engine" being strong is an artifact of E overlapping Standing.

**Open design question this raises:** keep Engine as a *multiplier* (accept two scored axes + timing), or make Engine a genuinely *orthogonal third* (e.g. engine = value-timing that scores tokens but does **not** enshrine, with its own non-standing payoff)? This is a conceptual fork, logged for decision.

## What's solid regardless of the fork

- The **v0.3 mechanics interlock** (value decay, frontier loop, 2-of-4 end). Confirmed across all passes.
- **2p caps** `{bruges:4,london:3,bergen:2,novgorod:4}` (3p/4p scaled) make the city-end fire ~half the time; games still run a touch long (~round 27 vs cap 30) — consider a hard round cap or one-more-notch-tighter caps.
- Killing the **passive token faucet** was essential — tokens must stay a *modifier* (~8–14 of a ~50-point score), per the design intent.
