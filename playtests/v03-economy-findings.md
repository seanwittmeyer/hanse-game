# v0.3 economy simulation — findings (2026-06-03)

Run: `node playtests/v03-sim.js 300 30` (+ `FLAT=1 …` control, + `… 1 30 trace`).

> **Scope.** `v03-sim.js` is an **abstract economic model** of the *new* v0.3 subsystems (recipe book + variable costs, type ladder, type value track, VP tokens, 2-of-4-cities end). It is **not** the full action-grid engine — that lives in `play.html` and is still **v0.2** (see "Engine gap" below). The grid/occupancy loop is exercised separately by `multi-sim.js`. Verdicts here are **directional**.

## Engine gap — `play.html` is v0.2, docs are v0.3

`multi-sim.js` against the live engine confirms the engine predates this design pass. To validate v0.3 in the real grid loop, the engine needs:
- **Recipes:** claim-on-fire slot tiles → a **collected book** with per-instance cost profiles.
- **Type ladder:** add the global frontier (anchored Gruit→Hopped + dealt summit) gating Market recipe supply.
- **Value track + VP tokens:** mint tokens on every ship/enshrine scaled by the type's current value; add the spendable token resource.
- **End trigger:** `endN()` heritage clock + single-route reach clock → **2-of-4-cities saturated**.

## What works (the new mechanics interlock) ✅

- **Value decay is real.** Tokens minted per sale decline early→late: **4.7→2.8→3.1 (2p)**, 4.3→2.3→2.9 (3p), 4.5→2.2→2.6 (4p). The late uptick is *new premium tiers entering hot* — a desirable texture, not a bug.
- **The production→frontier loop fires.** Trace: at 6 league sales L3 (Keut) unlocks and Gruit/Hopped are discounted to the floor (`values=[2,2,7,9,12]`). Avg top tier reached ≈ **L3.7 (2p) / L4.0 (3–4p)** — the summit gets used.
- **The 2-of-4-cities end trigger scales correctly with player count:**

  | Players | ends via 2-of-4-cities | avg ending round |
  |---|---|---|
  | 2p | 29% (rest hit cap) | 29.6 |
  | 3p | 94% | 25.0 |
  | 4p | 100% | 17.7 |

  More players flood cities faster → earlier, reliable ends. **2p is too slow** — it rarely fills two cities, so **2p needs lower route capacities** ⚙ (consistent with the RULES capacity note).
- **VP tokens are a large shared axis earned by BOTH paths** (the intended "both archetypes mint the same currency"): reach books ~12–22 token-VP it had *zero* of in v0.2.

## What's still off — standing > reach (a structural finding) ⚠️

QUALITY/standing still wins **89% (2p) / 75% (3p) / 44% (4p)**; reach archetypes win 9–31%. The **FLAT-value control** (all types start value 7) **barely moved this** (89/80/42%) — so the cause is **not** the per-type value gradient. It is structural:

- **Enshrining is unbounded; shipping is capacity-bounded.** Routes fill (caps 8/6/5/9), after which a reach player *cannot sell* — but a standing player can keep enshrining (and minting tokens + standing + goals) all game. Reach literally runs out of board; standing does not.
- Consequence: even with equal per-sale value, QUALITY out-mints REACH on tokens **and** adds standing+goals on top.

**Important caveat:** this model omits reach's real multipliers — **extra vessels (throughput), ship cap-fire auto-loads, sail dividends, and tolls** — all of which let a reach engine sell *more than one cask per turn-equivalent*. The model caps everyone at ~1 sale/turn, so it **under-models reach**. The real gap is likely narrower.

## Recommended dials to test (in priority order)

1. **Give reach a token-side payoff that scales with its bounded resource:** a **bounty of VP tokens to the player who saturates a city** (closes it / arms the end clock), **majority → VP tokens at end**, and **sail dividends paid in tokens**. This rewards the thing reach is *for* (filling & ending) instead of leaving it stranded.
2. **2p route capacities down** so the 2-of-4 trigger actually fires at 2p (target avg ending round ~18–22).
3. **Implement v0.3 in `play.html`** and re-run `multi-sim.js` before heavy tuning — the reach multipliers (vessels, cap-fire, sail dividends, tolls) are exactly what this abstract model can't see.
4. Watch the **g3 "same-style set" goal** + high-tier value: both push toward *more* standing — they may compound the quality lead.

## Frontier / value constants used (all ⚙)

`START_VAL=[5,6,7,9,12]` · `VAL_FLOOR=[2,2,3,3,4]` · `DECAY=1/sale` · `FRONTIER_UNLOCK` at 6/14/24 cumulative league sales · route caps Bruges 8 · London 6 · Bergen 5 · Novgorod 9.
