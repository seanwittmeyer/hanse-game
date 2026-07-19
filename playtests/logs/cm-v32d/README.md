# CM corpus — v3.2d "The Flight on the cards" (KEY `hanse-v32d`)

**Purpose.** A 15-game, strong-play, turn-by-turn corpus for the 2026-07-14 gameplay-quality /
launch-strategy read: every table anchored by **Cellarmaster** seats (the deep-MC arch-nemesis),
with the engine's persona axis supplied by **trader personas** (volume · prestige · majority ·
**racer** — the charter-pump pressure-test) and two **Guildmaster** cross-checks. Pure CM mirrors
run at every player count (2p-1/2 · 3p-1/2 · 4p-1/2).

**Harness.** `playtests/narrate.js` (the canonical `play.html` engine, `KEY hanse-v32d`) with
`MATRIX=playtests/cm-matrix-v32d.json OUT=cm-v32d`. Seeds 7211–7415 (mulberry32, reproducible
per game id). Verify gate green before launch (`verify-v3.js` — 91/91).

**Budgets & contention.** `CELLAR_MS=2500 GUILD_MS=800`, all 15 games launched at once on a
4-core box (≈3.75× oversubscription, uniform across the corpus). The MC budgets are wall-clock,
so contention squeezes *rollouts per decision* (effective ≈600–700 ms CPU per CM decision — above
the 250 ms bulk floor the 2026-07-13 curve flagged as starving the CM, below the 1500 ms in-page
ideal). Within-corpus comparisons are fair (every seat squeezed equally); do not compare absolute
CM strength here against uncontended-rung numbers.

**Known digest caveat.** `narrate.js`'s end-of-game digest predates the v3.2 dual clock: it
labels any ending where `sailed < sailedCap` as "ROUND CEILING". In this corpus most of those
are actually **presence-clock endings** — attribute endings from the in-log lines
(`places their last presence disc — the final round!` vs `The Sailed-Ships track is full`),
not the digest header. `pbp-stats.js` (run with `DIR=cm-v32d`) has the same blind spot in its
`end` column.

**Matrix** (`playtests/cm-matrix-v32d.json`): 
2p — CM mirror ×2 · CM vs racer · CM vs prestige · GM vs CM. 
3p — CM mirror ×2 · V+CM+CM · CM+M+R · CM+GM+CM. 
4p — CM mirror ×2 · CM+V+CM+P · R+CM+GM+CM · V+CM+P+M. 
(31 of 44 seats Cellarmaster. `persona` is a trader-tier knob in the engine; CM/GM are
lean-agnostic search — the matrix supplies persona variety through the trader seats.)
