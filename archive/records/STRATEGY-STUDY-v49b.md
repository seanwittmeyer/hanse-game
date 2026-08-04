# STRATEGY STUDY — Buildings & Specialists on v4.9b "Cornerstones"

**Date:** 2026-08-04 · **Build:** `KEY hanse-v49b` · **Requested:** the designer, mid-playtest — *"Run a full oracle sim… Capture some data on what strategies tend to emerge with buildings. Same with specialists — how do players change their behavior when playing with these two systems in the game?"*

**Instrument:** `playtests/strategy-probe.js` (NEW — this study's harness, kept). Drives the canonical `play.html` engine (sim.js scaffolding), wraps `commitBldg` / `bldgTick` / `bldgDepart` / `grantUpgrade` / the behaviour verbs in-scope, and keeps a **per-instance building ledger** (builder, round, start face, ticks split self/other, depart cause + pips) plus per-player verb counters. Modes: `obs` (observational corpus) · `nobuild` / `nospec` (ONE rotating abstainer seat never engages the system — the ablation arms). `LOAD=` pools JSONL shards. sim-analyze.js stays retired (it hooks v3 functions — `deployTo`/`charterDest` — and crashes on v4).

**Corpora (all 0 crashes):** OBS trader 400/count (JSONL kept: `strategy-obs-trader-{2,3,4}p.jsonl`) · NOBUILD 300/count · NOSPEC 300/count · GM oracle 3p×48 + 2p×24 (GUILD_MS=120, 6 shards) · plus the full v4.9b battery re-run (sim 500/count · PATHWAYS 200/lane · ladder · render smoke).

---

## 1. The full battery (oracle gates, 500/count)

- **sim 500/count:** 0 crashes/deadlocks · rounds 11.8 / 11.4 / 11.3 (2/3/4p) · dice-trigger ~99.7% · winner 47.6 / 54.6 / 54.7 · marks 4.9 / 5.5 / 4.9 pips/player · seat spread 4p 24.8/26.4/30.0/18.8 (P4 cold in the greedy tier — persona oracle below is flat).
- **PATHWAYS 200/lane:** 2p 54/46 · 3p 32.5/35/32.5 · **4p 26/26.5/27.5/20** — near-flat; the **builder lane is healthy, not hot** (27.5% at 4p, 32.5% at 3p); breadth 20% = the standing mild cold. Pace 12.0/12.5/11.9, band 52/69.5/57%.
- **Ladder:** jour>app 92.5% · trader>jour **55.0% pooled** (88/160 — the standing lint hover; greedy tiers gate robustness, not strategy) · GM>trader **77.5% pooled** (31/40 @ GUILD_MS=120) · GM/CM: see §5.
- **Render smoke:** ALL PASS (same-day, post-v4.9b engine).

## 2. Buildings — what the greedy table does with the mason's mark (OBS trader, 400/count)

**Volume & channel.** 3.5 / 5.0 / 6.3 owned builds/game (2/3/4p). **83–85% arrive as the London prize**; the fee channel is ~7–9% and free survey takes ~8–9% — "buildings arrive via London" (the flow-probe read) still holds under v4.9b.

**Building is not optional.** Win rate by build count (baselines 50/33.3/25%):

| builds | 2p | 3p | 4p |
|---|---|---|---|
| 0 | 32.7% | 18.6% | 15.0% |
| 1 | 45.5% | 28.9% | 16.3% |
| 2+ | **56.3%** | **39.7%** | **34.1%** |

Winners average **1.9–2.0 builds** (field 1.4–1.6) and bank **6.2–7.6 mark★** (field ~5). The winner's margin decomposes majorities-first (+4–6★), deliveries second (+3–4.5★), marks third (+1.3–2.2★) — the mark is a real pillar (~12% of a winning total) without taking the game over. **WHETHER you build dominates WHEN**: never-build seats win at ~half baseline; first-build-by-r4 vs later is ≈flat (builds spread 10–15% / 25–31% / 30% / 24–35% across game quarters).

**The ablation (NOBUILD, 300/count):** an otherwise-identical trader that never builds wins **28.7 / 16.0 / 12.7%** (≈ HALF baseline at every count), Δtotal −7.4 / −6.1 / −5.7 — and the deficit is **exactly the missing mark economy** (mark★ 0 vs 6.3–6.8; deliveries/brews IDENTICAL to the field). It also forfeits 1.4–1.6 London prizes/game under the v4.9b no-fallback ruling. The building system is a ~6★ pillar you cannot decline.

**Per-tile mark economics** (3p/4p pattern):
- **Malt Kiln is the tick king** — most-built everywhere (0.74/0.92 per game at 3/4p), 2.5–2.9 ticks/build, end pips ~4.5–4.9, ~5 rounds standing. Mission Quay second (1.5 ticks/build). **Assay/Granary/Exchange/Scrivener's** earn 1.9–2.9 ticks/build at 4p — the ms-1/ms-2 utility tier grows as designed.
- **The start-3 tier mostly stands still**: Racking 0.4–0.7 ticks/build · Abbey 0.3–0.4 · Tollhouse 0.04–0.17 · Capstan/Customs ~0.0 — they're banked as **static 3★ annuities** (the printed face IS the value; the traffic never comes). Almoner is the inversion: 3.9–4.0 ticks/build when built, but almost never built (0.08–0.10/game).
- **The table funds the mark.** Self-tick share: **~50% at 2p → ~30% at 3p → ~24% at 4p** — at 4 players, three-quarters of your mark's growth is other people using your building (the designer's "the table benefits" intent, measured). The flip side is the standing **2p tick drought**: half the traffic must be your own.
- **Ephemeral churn works**: Bonded sails away with its hull 28–35% of the time at 3–4p (cashing ~5 pips), Victualling 11–24% (~4.7) — the highest cash-outs on the board; the rest stand at ~3.
- **Overbuild-as-die-denial: unobserved.** 0 on-owned overbuilds in 1,200 games (the greedy AI prefers free slots; on-setup overbuilds only — 8/102/276 as slots tighten). The denial line (tear down a rival's 5-pip mark to cash it early and free the slot) is **untested by bots — a live-table watch**, not a cleared one.

## 3. Specialists — seats, value, and the behaviour shifts (OBS trader)

**Volume & channel.** 3.1 / 4.5 / 6.1 seats/game; **80–84% via the Bergen prize** (the fee channel — Hiring Post + load bonuses — carries ~16–20%). ~62–65% of seats end the game with both chairs filled; 0-seat players win below baseline (42/23/16%).

**Seat rates follow the engine designs**: Grain Factor 0.53/0.71/1.01 per game (2/3/4p) · Cellarman 0.42/0.61/0.92 · Braumeister 0.36/0.59/0.96 · Stevedore 0.33/0.49/0.81 lead; the guild singles trail (Chandler 0.10–0.15, Town Crier 0.05–0.10, Chronicler 0.00–0.03 — his `lading1` gate keeps him a late, rare, winner-biased pick: +7.7 to +14.5 Δtotal on tiny samples).

**Observed value (hold-win vs baseline, Δtotal vs corpus):**
- **Alderman is the standout**: 59.6 / 50.8 / 35.4% hold-win (baselines 50/33.3/25) · Δ +2.9/+5.6/+3.6 — the majority-collector converts the game's biggest scoring pillar. Watch him at a human table.
- The engine four (Grain Factor/Cellarman/Braumeister/Stevedore) all sit mildly positive (+0.6 to +2.5) — steady, unspectacular, well-priced.
- **Supercargo** mixed (−1.5 at 2p, +2.5/+3.9 at 3/4p — he needs rival traffic); **Chandler negative everywhere** (−1.7 to −2.1); **Innkeeper's tile drip barely fires in bot hands** (0.03–0.08 ticks/game — bots don't route casks to the 4th vessel; the human-ceiling line from the SPECIALIST-VALUE-STUDY stands).
- **Town Crier** noisy (66.7% hold-win at 2p on n=21, 15% at 4p).

**Behaviour deltas (holders vs field, same corpus):**
- **Braumeister holders visit the Cellar less** — manual age allotments 6.0–6.3 vs 7.2–8.0: the passive drip SUBSTITUTES for Age actions (≈1.5 station-visits/game returned to the engine). The clearest behaviour change in the study.
- **Grain Factor / Hop Gardener holders gain no more goods than the field** (gG 7.3 vs 7.5; gH 13.8 vs 14.6) — the multiplier compresses SOURCING (same goods, fewer Market turns), it doesn't inflate stock.
- **Stevedore holders load and deliver more** (loads 6.9 vs 6.5 · delivs 6.5 vs 6.1) — mild but real tempo.
- Seat timing: early seats (≤r4) show a mild edge only at 4p (28.5% vs 23.3% later).

**The ablation (NOSPEC, 300/count):** a trader that never seats anyone loses almost nothing — 46.7 / **35.7 / 28.3%** wins (at 3–4p ABOVE baseline), Δtotal −2.2 / +0.3 / +0.6. The Bergen consolation (≈1.8/game × 2 goods) plus two freed turns covers ~1.5 seats' worth of greedy-tier value. **Read with care:** the free-grant probes (SPECIALIST-VALUE-STUDY) show real per-design ceilings (Supercargo +23, Grain Factor +13.5); what the ablation shows is that under GREEDY play the specialist CHANNEL's marginal value ≈ the consolation goods. The gap between those two numbers is the human-skill headroom — specialists are where a skilled table out-plays the bots, and per §5 the search-based Guildmaster already monetizes them harder.

## 4. The two systems interact

Build-count and seat-count correlate with each other (both ride deliveries — London and Bergen prizes arrive on the same voyages), so §2/§3's observational gradients partly share one cause: **more sails → more prizes → more of both systems.** The ablations exist to break that circle, and they split it cleanly: forced NO-building costs ~half your win chance; forced NO-specialists costs ≈nothing (greedy). The building system is load-bearing; the specialist system is texture + skill headroom at greedy strength.

## 5. The Guildmaster oracle (search-based play, GUILD_MS=120)

<!-- GM-SLOT -->

## 6. Verdicts & watches (for the parking-lot roster rethink)

1. **The mark schedule works as priced** — utility tiles tick 1.5–3×/build and grow past their faces; the start-3 tier converts to static ~3★ annuities. If the roster rethink wants the power tiles to *live* rather than *sit*, the lever is traffic (verbs players repeat), not the start face.
2. **Racking/Tollhouse/Capstan/Customs remain the dead shelf** (0.0–0.7 ticks; Capstan ~0.05 uses/game in the 500-sim) — the same four the utilization read flagged at v45d. Roster-rethink candidates #1.
3. **The ephemerals already ARE the tycoon seed**: Bonded/Victualling post the best cash-outs (~5 pips inside ~4 rounds) at 28–35%/11–24% sail-away rates. A "real-estate" lane wants more of this churn shape.
4. **Overbuild-as-denial**: zero bot evidence — needs a live table read before any rule reaction.
5. **2p tick drought confirmed structurally** (self-share ~50%): if 2p marks feel dead at the table, consider a 2p-only dial (e.g. marks tick on setup-tile use too, or a 2p start-face +1) — NOT a global change.
6. **Alderman** is the specialist to watch at a human table (majority-pillar converter, +5.6Δ at 3p); **Chandler** reads weak everywhere; **Innkeeper** still needs human hands to matter.
7. **Specialist channel vs consolation**: at greedy strength the Bergen prize ≈ 2 goods. No action ruled — the human game is the target — but if live play ever shows seats declined for goods, the consolation is the dial (designer scope-flag from v4.9b stands: Bruges/Bergen consolations unchanged).

**Files:** `strategy-obs-v49b.txt` · `strategy-nobuild-v49b.txt` · `strategy-nospec-v49b.txt` · `strategy-obs-trader-{2,3,4}p.jsonl` · `strategy-gm-pooled-v49b.txt` · `sim-results-v49b-full.txt` · `pathways-vhanse-v49b.txt` · `ladder-v49b-*.txt`.
