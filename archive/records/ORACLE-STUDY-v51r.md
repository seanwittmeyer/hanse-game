# ORACLE STUDY — v5.1r as played: action arcs · lanes · balance

**Date:** 2026-08-22 · **Called:** the designer — *"Run an oracle sim of the game as is.
Make sure the harness is set up to capture action arcs, dominant strategies/lanes, and
balance issues."* · **Build:** `play.html` `KEY hanse-v51r` (the v5.1 print — RIDER_SCOPE 0).
**Status: FINDINGS, nothing ruled. REPORTED, not retuned (the v76 discipline).**

## 1. Instrument & corpora

`playtests/strategy-probe.js` REFIT to v5.1 (the kept v4.9b instrument): `claimLading` →
`manClaim` (the Order row died at v5.0), `deliverCask`/`brewCommit` hooked, and new capture —
**per-player action arcs** (10 verbs round-stamped → game quarters) · **first-X timing**
(winners vs field) · **relative score-bucket leans** with win rates · **winner-vs-field score
composition** · **modal-port leans** · **the Flight ladder** · **seat fairness / margins /
dead-port rates** · **the Manifest economy**. All counts wrap the engine's own functions —
ground truth, not policy inference.

Corpora (all **0 crashes / 0 deadlocks**; 4-core box, staged for uniform MC contention —
2 greedy processes stage 1, exactly 4 MC processes stage 2):

| arm | file |
|---|---|
| trader OBS 300/count (900 g) | `oracle-v51r-trader-obs.txt` |
| GM oracle 60/count ×3 (`GUILD_MS=120`) | `oracle-v51r-gm-{2,3,4}p.txt` |
| CM deep-check 3p ×24 (`CELLAR_MS=400`) | `oracle-v51r-cm-3p.txt` |
| PATHWAYS 200/lane | `sim-results-vhanse-v51r-pathways200.txt` |

## 2. THE ACTION ARC — the skilled game is an engine-then-harvest crescendo

The greedy tiers play FLAT and front-loaded (brew 2.8 in Q1 tapering; deliveries level all
game). The **Guildmaster plays an arc**: Q1–Q2 quiet accumulation, then everything peaks
together in Q4 — GM 3p per player: deliveries 1.3→**2.5**, loads 1.7→**2.3**, sails
0.6→**1.1**, Manifest claims 0.15→**1.2**, bumps 0.02→**0.6**, builds 0.10→**1.0** (56% of GM
builds land in Q4). The CM shows the same crescendo. The designed Source→Brew→Age→Ship spine
reads as a true dramatic arc under skilled play — the harvest is real, and it's the endgame.

**The cost: skilled play runs LONG.** GM rounds 20.9/20.2/19.4 (2/3/4p) vs greedy ~16/15/15,
and the dice-trigger falls to **70% at GM 2p — 30% of skilled 2p games hit the MAX_ROUND 25
ceiling** (3p 15% · 4p 5%). The CM (pure search, no quality persona) races instead: 16.6
rounds, 100% dice. The greedy pace band (the 89–92% we gate on) understates the skilled table
by ~4–5 rounds; at 2p the backstop is load-bearing. **Watch: the 2p ceiling.**

First-X (GM): winners brew earlier (1.8 vs 2.1), deliver earlier (4.2 vs 4.4), seat earlier —
but commission LATER (8.6 vs 7.8) and build no earlier. Winners run the engine first and buy
tempo late; hull-rushing is the field's habit, not the winner's.

## 3. LANES — what actually wins

Convergent across trader, GM, CM, and PATHWAYS:

- **Majorities + the Flight are the winning finishers.** Winner score composition takes
  +3–9pp more from majorities than the field at every tier/count, and the **5-beer Flight
  wins 58–81% of its seats everywhere** (GM 3p: flight-lean 41.9% win vs 33.3 baseline; CM
  47.1%). The 2p majority lean is outright dominant — **79% win (trader) / 82% (GM)** — the
  sharpest single lane in the game and a 2p balance watch.
- **Raw delivery volume is the trap.** deliv-lean seats win below baseline at every tier and
  count (15–29%), and **Bruges-modal players lose everywhere** (trader 40/29/19% vs 50/33/25
  baselines) despite Bruges being the modal port for 37–54% of seats. Undirected volume — the
  most natural-looking plan — underperforms. This is the depth the design wants, but note how
  wide the trap's mouth is: the plurality of seats fall in it.
- **Pip-leaning loses.** bldg-lean (over-indexing on mason's marks) is the most common lean
  (~29–30% of seats) and wins below baseline at 3–4p under every policy (trader 29/17 · GM
  29/19 · CM 19%). PATHWAYS 200 agrees: the **builder persona is COLD — 3p 20% · 4p 17.5%**
  (majority 44/31 · lifter 36/32.5 · breadth 19; 2p exactly 50/50). Builds themselves stay
  load-bearing (0-builders win 17–44% vs baselines; 2+ builders above baseline at most
  counts) — build for effects and tempo, not for pips. The n=200 PATHWAYS settles the n=100
  swing: majority/lifter co-dominant, builder cold.
- **The guild lean is small and strong at 2–3p** (GM 3p 70% n-small · CM 50% · trader 44–53%).

## 4. BALANCE flags (ranked)

1. **Seat gradient at 3–4p.** Trader 900-game read: 3p **39/39/22** · 4p **36/28/18/18** —
   P1 wins twice as often as P4. PATHWAYS 200 corroborates (3p 44/36/20 · 4p 63.5% for
   P1+P2). The GM n=60 arms are too small to confirm (3p 45/23/32 · 4p 26/18/35/20) and the
   CM lands exactly 33/33/33. Verdict: a real greedy-play gradient, oracle-inconclusive —
   the standing warm-start seeding may need a look if a human table echoes it.
2. **Novgorod dead at 2–3p persists UNDER SKILL.** GM 2p dead **26.7%** · CM 3p dead **25%**
   (trader 19.3/15.3; 4p healthy ≤5.7%). Pure search *chooses* not to reach it at 3p. The
   v4.10 gate-3 fix halved the greedy dead rate, but the residual is structural at low
   counts — the fourth kontor at two-three players (Open #8) is now oracle-confirmed.
3. **The dead shelf stays dead at every tier.** Customs 0.02–0.03 · Rich Berth 0.02–0.08 ·
   Capstan 0.02–0.05 · Tollhouse 0.03–0.10 builds/game under GM and CM alike — **the v5.1
   buffs (Customs −2, Rich Berth berth-buy) did not revive them under any policy.** And the
   two NEW tiles are built for the wrong reason: Ropewalk (0.18–0.47 builds) and Weigh House
   (0.20–0.46) tick 0.00–0.29/build — taken as 3-pip annuities, their printed effects almost
   never fire. Six of 17 dealt designs now sit effect-dead.
4. **Builds flow 86–94% through the prize channel** at every tier; the survey (fee) channel
   is 2–7%. Chosen building is marginal — consistent with the rider-scope A/B's flat chosen
   count. The display is a prize menu, not a market.
5. **Specialist sleepers & duds re-confirm.** Skill-gated risers: **Chronicler** (trader Δ≈0
   → GM 2p +8.7/69% · CM +11.2, 3.3 man-lines/g) — the Manifest rework made him a genuine
   skill card; **Alderman** GM 3p +7.1/60%; **Supercargo** CM +12.1/78%. Duds: **Innkeeper**
   negative again (0.0–0.7 ticks/g — the full-house drip barely fires); **Chandler** ~unseated
   (0.01–0.05); **Broker** noisy (trader 2p +7.0 · GM 2p −12.4, n=1) — the alt-upgrade pair
   needs a human read. Two seats beat one beats none everywhere except GM 4p (flat).
6. **The Manifest economy is healthy and scales with skill:** 2.0–2.3 lines/player ·
   2.1–2.4★/line, claims ramping into Q4 (the harvest verb). No repricing signal.

## 5. What this study does NOT flag

Winner totals stay ~58–66 with sane margins (9–20); no runaway-leader signature. The
majority/lifter/flight ecology is plural at 3–4p — no single degenerate line. Brew diversity
holds (Flight 4+ reached by 33–71% of seats). The census/Manifest/primary-alt machinery of
v5.0 shows no pathology under search play.

## 6. Recommendations (PROPOSED — the designer rules)

1. **Human-table the 2p majority lane and the 2p ceiling** before any dial: both flags live
   at 2p, the least-playtested count.
2. **The dead shelf needs a redesign conversation, not another buff** — two buff rounds
   (v4.12b, v5.1) and an oracle later, four tiles are still dead and the two new ones are
   annuities. Candidate frame: effects that fire on the LINE's traffic (the Kiln/Cooperage
   pattern — the proven live designs) rather than on rare ship states.
3. **Watch the 3–4p seat gradient** at the next human table; if it echoes, revisit the
   warm-start seeding (a structure lever, not a value lever — the v0.15 lesson).
4. Novgorod at 2–3p: accept as the priced frontier, or consider a 2–3p-only demand hook
   (e.g. a standing Novgorod Manifest line at low counts) — a study, not a ruling.
5. Keep the Chronicler/Alderman/Supercargo as-is (skill texture working as designed);
   the Innkeeper is the roster's next rework candidate.
