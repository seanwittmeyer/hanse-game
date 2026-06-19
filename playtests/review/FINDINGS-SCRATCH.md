# Review findings scratch — v1.6 "Hops" (KEY v63)  — fast-bot phase

## Engine facts
- 2–4p; clock-dominant (~96–99% clock), pace ~13–18 rounds (in 12–25 band).
- Score = delivery value (base + value-buildings via demand die + wharfage) + majorities + Flight + developer.
- Hall ladder 3/5/7/9 (Q2–Q5). Novgorod value scales Q3→2/Q4→4/Q5→6. Majorities Bruges 4/2/0 · London 5/3/1 · Novgorod 8/5/2 · Bergen 9/5/2. Flight (beers−1)²,min3: 3→4·4→9·5→16.
- SAILED_CAP 6/10/13 (2/3/4p). SEAT_COMP +1G/seat. Occupancy toll 1G.

## GREEDY baseline (sim.js N=1000) — robustness/pace OK
- 0 crash/deadlock all counts. Winner avg score ~41/50/47 (2/3/4p).
- Greedy UNDER-ships Hall (~1% deliveries) — documented blind spot.
- **Seat win-rate (greedy): P1 59/49/40% (2/3/4p) — big first-player edge, spread up to ~25–31pts at 4p.**
- Dest mix shifts: Bruges-heavy at 2p → Novgorod-heavy at 4p.

## PERSONAS (sim.js PERSONAS=1 / CELLAR=1, N=1000) — THE LANE VERDICT
Per-capita win-rate vs fair (volume/demand/prestige/majority [+deep]):
- 2p (fair 50): prestige 55–60% · deep 53.5% · majority ~45–47% · volume 43–47% · demand 42–46%
- 3p (fair 33.3): prestige 37–41% · deep 35.9% · demand 31–33% · majority 31–33% · volume 27–29%
- 4p (fair 25): deep 26.7% · prestige 26.5% · volume 25.1% · majority 23.6% · demand 22.4%
**Pattern: prestige (Hall) + deep (Q5) strongest, dominant heads-up (2p), converge to fair at 4p.**
Mechanism: contested-kontor lanes (volume/maj/demand) need a crowd to pay; the uncontested Hall is player-count-invariant → heads-up the Hall/deep is the meta. Contradicts design's "deep is the slightly-LOWER lane" — true only at 4p.
- Persona seat spread mirrors greedy (P1 ~55/44/43% across 2/3/4p) — **first-player edge persists under personas.**
- prestige avg score LOWER (~27–29 @2p) but win-rate HIGHER → reliable/low-variance + denies opponent.

## TRADER (in-page AI) behavioral arc (sim-analyze N=350/count)
- Openings near-fair (only opens top row Market/Brewhouse; ±2pts).
- Timing: first export recipe ~R2.7 (very early), first voyage ~R4.2, first Hall ~R10.4, first Q4+ ~R11 but **64% NEVER climb Q4+**, upgrades ~88% NEVER.
- Dest/game: bruges 1.9 · hall 1.4 · bergen 1.2 · novgorod 0.8 · london 0.7. (Trader DOES value Hall, unlike greedy.)
- Dest TIMING (arc): Bruges 64% early · Bergen 56% early · London spread · Novgorod mid (56%) · **Hall LATE (54% after R11, 1.2% early).**
- Delivery: 92–99% by full hull; charters 1–8% (rising w/ count). avg 2.5 casks/sail.
- Cask actions: Source dominant. **Survey/'draw' essentially dead (0 drawn). Load under-fired (64% fire/draw).** Wild always used.
- Win correlates: total +9.9 = deliv +4.2 ≈ maj +4.1; casks +1.0; Hall +0.2 (weak); upgrades ~0.
- **Upgrades barely happen** (earned-only via London/Novgorod; ~0.1/game). Extra Vessel/improvements not auto-bought (bot blind spot, but also signals weak pull).

## JOURNEYMAN vs TRADER (tier contrast)
- Journeyman = PURE kontor volume: Hall 0.0/game, ships Novgorod 2.1, charters 1.2, brews 10.7. Never enshrines.
- Trader edge over JM partly = it VALUES THE HALL + tempo (fewer charters/brews, ships smarter).

## SEAT ORDER — the live question
- Greedy + personas: strong P1 edge (esp. 4p).
- **Cellarmaster mirror 2p (60g): P2 61.7% — REVERSED.** Strong play may flip the bias; SEAT_COMP +1G tuned to weak bot may over-correct at 2p. (Small sample, corroborate.)

## PENDING: 900-game CM/GM/Trader slate (60g × 2/3/4p × {CMvCM,CMvGM,GMvGM,CMvTr,GMvTr})
Questions to answer:
1. Strength ladder under real budget: does CM>GM>Trader hold at all counts? margins?
2. Does strong play confirm prestige/deep meta (CM dest mix, Q5 rate, Hall/g)?
3. Seat fairness under strongest AI (mirror seat win-rates per count).
4. Score composition of the strong winners (deliv/maj/flight/dev) → "how to win" recipe.
5. Is any single lane a near-solve? (CM lane mix concentration.)

## HISTORICAL GROUNDING
### Strength ladder (ai-ladder v61, gates v60)
- App<Jour ~85% · Jour<Trader ~71–72% · App<Trader ~94% — clean lower ladder.
- Trader<GM ~62–63% (@150ms realistic; GM in-page 250ms).
- **CM vs GM is BUDGET-SENSITIVE:** CM@120/GM@40 → CM 71.9% (v60); CM@80/GM@120 → CM 40% (v61, n=10). My run CM=120/GM=80 (CM favored) → expect CM ahead but not blowout. *Finding: "strongest AI" depends on think-time; GM (fast flat-MC) matches CM at equal/lower budget.*
- **GM under-ships the Hall (0.2–0.4/game)** — same blind spot as journeyman rollout; GM leans Bruges-volume. CM is the only tier that prices Hall/deep.

### Lane balance v40 → v63 (PERSONAS)
- v40 had goals(+~17) & a rich upgrade econ (4–7/g); winner ~70. v63: goals cut, upgrades ~0.5/g, winner ~40 → **v63 is a TIGHTER, lower-scoring, more austere game.**
- v40 lanes: 2p majority hot (55), prestige cold (44.6); 3–4p deep/prestige hot, volume/majority cold (4p spread ~15pts).
- **v63: 4p balance GREATLY improved (spread ~4pts, all 22–27%). But 2p flipped to prestige/deep HOT (55–60) — a 2p-prestige regression vs the v1.1 "eased to ~46%" note.**
- v40 "winner lean prestige" 40/59/65% (Hall-dominated meta) → v63 25–29% (less Hall-dominated overall) — yet committed-prestige WINS more at 2p ⇒ **at 2p the Hall is UNDER-CONTESTED but high-EV: commit to it and you win disproportionately.**

## METRIC CORRECTIONS (don't misreport)
- sim.js / sim-analyze "upgrades" = PRIVATE improvements (vessel/cellar/granary/hopgarden/crane/lagering/quay). These are ~0.5/g = **nearly never bought — the private-improvement economy is dead in bot play** (the long-standing "dead upgrade" issue; Floor was meant to revive Extra Vessel).
- PUBLIC Buildings (the keystone green tiles, earned at London/Novgorod or Market-bought) are a SEPARATE thing, NOT in the "upgrades" count. Not directly logged → infer from `developed` score (rival-overbuild) ≈ proxy for slot contention. If developed≈0 everywhere ⇒ buildings placed sparsely / slots rarely contested.
- Trader ships London ~0.7 + Novgorod ~0.8 ≈ ~1.5 building-grants/g → public buildings ARE placed, modestly. Demand persona authors up to 3 value buildings. Don't claim the demand lane is vestigial; it's playable (~43–46% win) but not dominant.
