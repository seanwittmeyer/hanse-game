# v31-pressure — the racer pressure test on v3.1 “One Row” (KEY `hanse-v31`)

**2026-07-12.** 126 games, 42 per player count, five cohorts: **rc** (racer vs Cellarmasters) ·
**rg** (racer vs Guildmasters) · **rt** (racer vs the volume/prestige/majority personas) · **cc**
(CM-vs-CM) · **mx** (mixed). Seeds 561+/661+/761+ (disjoint from every prior corpus). Run fanned
out in parallel shards (max-parallel discipline adopted mid-run — the standing rule is now in
`CLAUDE.md`); bulk budgets GUILD_MS 120 · CELLAR_MS 200. **0 crashes, 0 errors, 126/126 parsed.**
Raw: `ANALYSIS.txt` · `BEHAVIOR.txt` · `RACER.txt` · per-game `pbp-*.log`.

The **racer** is the new trader persona built from the 2026-07-12 human playtest's winning line:
author a kontor-charter Privilege first, pump cheap fast casks through it, race the clock.

## Headlines

1. **The engine is stable under adversarial play.** 0 crashes/deadlocks in 126 games; **122/126
   ended on the clock**; rounds 15.8–20.1 by cohort (band 12–25); winner averages tight across
   counts (41.5 / 44.0 / 45.9). The v3.1 keystone (one-row board) introduced no degenerate state.
2. **The charter-pump line is ANSWERED at 2p.** The racer went **0/8 vs the Cellarmaster** (avg
   15.5 vs 55.6!), 0/6 vs the GM, and 1/6 even against plain traders at 2p. The v3.1 dials
   (Hanzehuis die 3, 2p clock 7) plus real counterplay — the CM braids Bock shelves + Bergen
   presence + majorities — bury the mechanical version of the human line. At 3p the racer is
   competitive (50% vs GMs, 67% vs personas): the pump scales with OPEN slots, and crowded rings
   punish it. *Caveat: the heuristic racer is a far weaker executor than the human who invented
   the line — this says the line is answerable, not that it's dead.*
3. **The one-row Flight forcing is live everywhere:** 6.1 / 8.9 / 11.5 cover-opens per game at
   2/3/4p — every table brews for unlocks now. Specialist buys still happen (1.4–3.9/game) inside
   the tighter row; nobody bricked their board (the slot-1 rule held in 61 verify checks and 126
   games).
4. **The Floor is a real, used, non-dominant line — and it's the RETREAT, not the engine.**
   Stay-home turns: 1.7 / 5.0 / 7.6 per game at 2/3/4p (peaks at 10.6 in 4p mixed — the crowded
   ring pushes players home). Winners average **1.0** Floor turns vs losers **1.9**: floor-heavy
   play correlates with losing the wharf, exactly the positional price as designed. The racer
   uses it most (3.0/seat — pump upkeep); the CM least (0.8).
5. **The lanes braid rather than dominate.** Winner lane mix is stable at every count (~45%
   deliveries · ~33% majorities · ~22% flight). Hall share of winners' deliveries is 24%; seats
   at 1–66% hall share win ~40%, **pure-Hall (67%+) wins only 14%** — deep stays the stars-align
   lane, not a trap-free highway. Premium gradient: 0 Q4+ → 18% win, 3+ → 49%.
6. **Tier variety reads clearly at the table.** CM 71% per-seat in mixed (avg 43.6), GM 25%
   (32.0), traders 13% (28.3). CM-vs-CM games are the sharpest (15.8–15.9 rounds at 3/4p, heavy
   Hall + dispatch tempo); GM tables sail more and grind majorities; the racer floods the board
   with cheap brews (9.3/seat, the most in the corpus).

## What looks out of place (ranked, with the dial if one is warranted)

- **W1 · the Masters'-Shelf presence honor still couples prestige into majorities.** The CM's
  signature move this corpus: enshrine a **Q5 Bock on the LOWER Masters' Shelf for `place 2
  presence`** (not the High Board) — prestige buying the majority race. Thematically defensible
  ("renown opens doors") but it is the single strongest honor and the engine behind several
  MAJ-WIN flags (2p-cc-2/3, 3p-rg-2/3). Dial candidate: swap `pres2` → a goods/tempo honor, or
  move it to the Long Shelf. *Structure, not value.*
- **W2 · London is the soft port** — only 12% of winner deliveries (Bruges 27 · Bergen 20 ·
  Novgorod 17 · Hall 24). Its benefit (a free tile) is engine rather than points, and the one-row
  board made tiles scarcer to *seat*. Watch one more corpus before touching; if it persists, the
  dial is London's majority tier (5/3/1 → 6/3/1 ⚙), not its value.
- **W3 · MC tiers still under-author demand** (die-sets 0.7–1.3/game; the racer and mixed tables
  double it). Known MC bias, worse post-nerf. Treat delivery-lane numbers as a floor; the human
  table authors more.
- **W4 · small-n seat skews in CC:** 2p P1 75%, 3p P1 75% (n=8 each; 4p inverts to P4 50%).
  Noise-level, but 2p P1 skew has appeared twice now — recheck at n≥30 before acting.
- **W5 · 2p margins are wide in mixed cohorts** (avg 22.7) — mostly CM blowouts of weaker seats,
  not a rules issue; 3p/4p margins are healthy (10.0 / 7.5).

## Theme & feel notes

- Nothing in the corpus plays against the fiction: hulls sail full, charters spend contracts,
  the Hall's shelves fill top-down with the climb, souring Q1s clear the wharf. The one
  borderline read stays the **presence honor** (W1) and, at the component level, the
  **Coppersmith** now "opens a cover" — the kettle-maker building you shelf-room is a slight
  stretch; acceptable, but if a cleaner identity appears (e.g. "your brews may share a slot"),
  it's the tile to revisit.
- **Hopped is the tempo beer, not the money beer** (0.76★/brew-good, worst in the corpus, yet
  the most-brewed at 768) — it buys unlocks and flights. Bock remains the best cask in the game
  (4.39★/kontor, 7.62★/hall, 46% winner hands) — the climb pays, as designed.

## The oracle rungs (full-budget retest)

- Bulk-budget full ladder (n=600 fast tiers): **0 errors**, apprentice < journeyman < trader <
  GM all ≥60%. The GM-vs-CM rung read 50% at the starved bulk budget (n=10, CELLAR_MS 80) — the
  known harness artifact.
- **Full-budget retest (6 parallel shards, GUILD_MS/CELLAR_MS 250, n=60): the CM beats the GM
  43/60 = 71.7%** (shards: 80/50/50/80/80/90; avg score CM 40.4 vs GM 28.1; 0 errors; clock
  95%). **The ladder is fully ordered at realistic budgets** — apprentice < journeyman < trader
  < Guildmaster < Cellarmaster. The bulk-budget 50% was the documented starvation artifact
  (n=10 at CELLAR_MS 80); the v3.1 keystone did NOT break the top tier.

## Verdict

**Stable.** No crashes, clock-dominant endings at every count, pace in band, all lanes braided,
every v3.1 mechanism live (one-row forcing, auto-unlocks, trimmed shelves, the 7-clock), and the
strongest known human line loses to strong counterplay while remaining playable at 3p+. The two
real tuning candidates are the Masters'-Shelf presence honor (W1) and London's softness (W2) —
both structural, neither urgent before the next human table.
