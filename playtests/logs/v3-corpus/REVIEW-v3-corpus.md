# v3-corpus — the first strong-play read on v3.0-A.1 (KEY `hanse-v3a-v2`)

**2026-07-11.** 162 games, 54 per player count, three cohorts per count: **gg** (every seat a
Guildmaster — flat MC), **cc** (every seat a Cellarmaster — deep MC), **mx** (mixed CM + GM +
trader personas). Seeds 261–314 / 361–414 / 461–514 (disjoint from every prior corpus). Run as
18 shards of 9 in 6 serial batches × 3 parallel processes (4 cores; identical contention regime
for every game, so within-corpus comparisons are fair). Budgets = the narrate bulk defaults
(GUILD_MS 120 · CELLAR_MS 200) — the same as the `recheck-v94` corpus, which is the baseline
throughout. **0 crashes, 0 errors, 0 parse failures.** Raw numbers: `ANALYSIS.txt`; per-game
play-by-plays: `pbp-*.log`; matrices: `matrix-*.json`.

## Headlines

1. **The clock is healthy under strong play — the ceiling worry was a greedy-bot artifact.**
   158/162 games ended on the CLOCK (2p 52/54 · 3p 54/54 · 4p 52/54), matching the v94 baseline
   (117/120). The `sim.js` greedy bot's 70% ceiling rate at 4p does not reproduce with real
   tiers. Rounds: 17.4 / 18.3 / 18.5 — inside the 12–25 band, near-identical to v94
   (17.1 / 18.6 / 17.8). **The tempo economy survived the keystone intact.**
2. **The tick composition also carried over almost unchanged** (per game, sails / kontor
   dispatches / enshrines): 2p 3.4/1.3/1.7 (v94: 3.3/1.0/1.9) · 3p 4.5/2.3/3.9 (5.2/1.9/3.7) ·
   4p 6.2/3.0/4.7 (5.9/2.9/4.8). Dispatch unification didn't shift what players do — it just
   collapsed two menus into one gesture.
3. **Every new mechanism sees real play** (per game, ALL cohorts): stay-home Floor turns 2.4 →
   4.8 (2p→4p; ~5–7% of player-turns — deliberate, not default: exactly the design target);
   Flight unlocks 5.0 → 11.8 total marks (vessel row preferred ~5:3 over Specialist); dockside
   pickups 0.7 → 1.6; spoilage 0.2 → 1.6 (the Q1-clearing scales with crowding, as intended);
   tap-outs 0.2 → 0.4 (rarer — the reservation play exists but is an expert move); ground rents
   0.1 → 1.4.
4. **The Hall shelf board spreads exactly as drawn.** Claims per game at 4p: Common 1.2 · Long
   1.8 · Masters 0.9 · High 0.9 — every shelf sees traffic, **overflow never fired once in 162
   games** (never-nothing is a true backstop, not a crutch). The honor economy (555 honors):
   **presence 141** · goods 97 · recipe 69 · +3★ 60 · age 52 · contract 39 · Specialist 37 ·
   unlock 21 · G+H 21 · age-all 13 · Building 5. The presence honor being #1 is load-bearing:
   **the Hall now feeds the majority race** — prestige and volume are coupled through the
   shelves.
5. **Scores came down modestly and the lane mix shifted toward majorities.** Winner averages:
   2p 34.4 (v94 39.0) · 3p 43.0 (47.8) · 4p 43.5 (43.2). Winner lane composition at 2p:
   deliveries 40.8% / majorities 38.2% / flight 20.9% (v94: 49.8/29.6/19.5). Two removals did
   this: the Q4/Q5 die premium (−2/−3★ per premium delivery) and the floor bonus (−~1–3%).
6. **CM >> GM got wider.** In the 42 mixed games with both tiers: CM wins 34 · GM 5 · trader 3;
   per-seat: CM 70% · GM 16% · trader 10%; average score CM 41.4 vs GM 27.0. The deep MC prices
   the new levers (shelf honors, unlocks, dispatch tempo) far better than the flat MC — CC games
   finish in ~15.7 rounds vs GG's ~21, i.e. **the better the play, the faster the clock**.

## Watch-items (ranked)

- **W1 · 2p majority weight.** 8/54 2p games are MAJ-WINs (winner's majorities ≥ half their
  total), heavily in the gg cohort; 2p margins average 15.1. With 2nd place skipped, Bergen 9 +
  Novgorod 8 are winner-take-all slabs, and the presence honor pours fuel on it. Dials, in
  order: the 2p majority tiers (halve the anchor at 2p ⚙), or re-cost the presence honors
  (Long-shelf `place 1 presence` → goods). *Structure before value.*
- **W2 · the demand lane is under-authored by the MC tiers.** Die-sets are only 0.6–1.4/game
  (gg 1.2 · cc 0.8 · mx 0.9) and rents 0.1–2.1 — the MC tiers barely buy Privileges, so
  deliveries run mostly on printed values. This mirrors a known MC bias (the trader authors
  demand; the MCs under-build), so treat the deliveries-% numbers as a floor, not the human
  ceiling — but confirm at the human table that Privileges are worth authoring at one-read
  values (Staple 3 · Charters 4 · Connoisseur 5).
- **W3 · GG slow games.** GM-vs-GM runs 20–22 rounds with 2 ceiling endings at 2p and 2 at 4p
  (the corpus's only 4). The flat MC is weak at closing (known); no rules action — but if human
  tables run long, the `SAILED_CAP` dial is the lever, and these logs are the evidence base.
- **W4 · possible late-seat edge in head-to-heads.** GG 2p: P2 67%; GG 3p: P3 67% (n=18 each —
  weak signal, CC doesn't reproduce it: 50/50 and 28/50/22). Recheck at larger n before acting.
- **W5 · prestige heat, revisited.** The greedy PATHWAYS run flagged the prestige lane hot;
  under strong play the Hall is busy (1.7→4.7 enshrines/game) but hall-heavy winners (5+
  enshrines) appear mostly in cc games where *everyone* enshrines, and no single lane dominates
  winner composition. Keep the §7b dial on standby; the human table decides.

## Cohort character (what each meta looks like)

- **GM-vs-GM** — a volume brawl: most sails (7.1/game at 4p), most spoilage (2.1), most
  Specialist buys (6.3), longest games. GMs under-use the Hall relative to CMs and grind
  majorities; 2p GG produced most of the MAJ-WIN flags.
- **CM-vs-CM** — the sharpest games in the corpus: 15.6–15.9 rounds at every count, heaviest
  Hall usage (2.1→5.8 enshrines/game), most kontor dispatches, fewest wasted turns. This is the
  best preview of expert human play: **dispatch-led tempo, the shelves as the second race.**
- **Mixed** — CM tables the field; the stay-home Floor peaks here (6.7 turns/game at 4p — the
  trader and CM seats both take it when the wharf is bad), and dockside pickups run highest
  (1.0–1.9), i.e. the new commission rule matters most in contested rings.

## Verdict

The keystone holds under the strongest available play: **no crashes, clock-dominant endings,
pace in band, every new mechanism live, no degenerate lane.** The two real tuning candidates
surfaced are 2p majority weight (W1) and the presence honor's coupling into it (same dial).
Nothing here blocks the human table; W1 is the one number I'd consider moving before it.
