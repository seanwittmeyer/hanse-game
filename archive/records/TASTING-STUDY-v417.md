# TASTING STUDY (v4.17 "The Tastings") — is the contest cycle ready for the table?

*Designer-ruled 2026-08-15: "Build B and run a 200 CM/GM each, with some chaos to simulate
some variable humans. I want this tested and iterated before we take it to the printer for
our game night crew."*

**Instrument:** `playtests/tasting-probe.js` (KEPT) — 3p tables of **Cellarmaster (220 ms,
pure search) + Guildmaster (100 ms, the 'quality' persona) + the CHAOS SEAT** (a Trader at
noise 0.15 — that often it takes a random legal action: the variable human — its persona
rotating majority/lifter/builder/breadth/hall per game). Seats rotate per game. Each arm =
200 games (20 shards × 10), three arm-agents × 3 concurrent shards (~9–10 processes on 4
cores — uniform contention; within-corpus reads only).

## §1 · Round 1 — the engagement bracket (3 arms × 200)

| Arm | Config | The question |
|---|---|---|
| `base` | HALL off | the control — pace · ports · seat baselines |
| `tast` | printed defaults (START_INV 1 · 1st ★ 5/5/7/6/7/9) | does the cycle run at the printed numbers? |
| `hot` | START_INV 2 · every 1st ★ +2 | the rich bracket — if benches STILL don't convene, the bottleneck is structural (⚜/Ready-cask supply), not value |

**Pre-registered criteria (set before results):**
1. **Engagement:** benches convene — judged ≥ ~1.5/game at defaults; pours ≥ ~1/player.
2. **Contest, not solitaire:** door-slams present but not dominant (~5–25% of judgings);
   the 1st-place spread not owned by one seat type.
3. **Economics:** hall★ ~4–8 per engaged player · pace within ~1 round of base · Novgorod
   dead-port ≤ base +5 pp.
4. **The chaos seat:** noise must not pay (chaos wins ≤ GM wins) and must not collapse
   (chaos wins > 10%).
5. **No degeneracy:** unconvened ≤ ~1.5/game (few stranded dice); the set rate > 0.

**Round-1 results (600 games · 0 errors):**

| Arm | pace | judged/g | slams/g | unconv/g | hall★ (CM/GM/chaos) | Novgorod dead | category wins |
|---|---|---|---|---|---|---|---|
| base | 14.3 | — | — | — | — | 10.0% | — |
| tast | 14.6 | 0.67 | 0.17 | 0.73 | 2.0 / 2.1 / 2.2 | 14.5% | free 68 · fresh 63 · **others 0** |
| hot | 15.0 | 1.32 | 0.61 | 0.56 | 3.8 / 4.6 / 5.8 | **23.5%** | free 137 · fresh 119 · **dark 1** |

**Findings:**
1. **The category drought is structural, not economic.** Across 400 hall games the
   dark/export/old/master pours essentially never convened (dark won ONCE) — a bench of
   THREE matching Q4+/die-4+ casks never assembles at 3p. The `hot` bracket proves value
   wasn't the lever: doubling the float and the prizes doubled judging but the hard
   categories stayed dead.
2. **`hot` fails two criteria on its own**: Novgorod dead-port 23.5% vs base 10 (the 9/11★
   old/master prizes bid the die-5/6s away from the eastern run — criterion 3 breached) and
   door-slams at 46% of judgings (criterion 2's ceiling is ~25%).
3. Defaults hold pace (+0.3), ports (+4.5 pp — inside the bar) and the slam band (~25%),
   but judged 0.67 < the 1.5 bar and sets never fire — the cycle runs but starves.
4. The chaos seat neither pays nor collapses in either arm (its win share tracks its base
   rate; the GM's low share everywhere is the known budget-under-contention artifact —
   within-corpus deltas only).

**The Round-2 change (implemented): THE HARD POURS BECOME DUELS.** The
dark/export/old/master tiles print a **bench of 2** (free/fresh keep 3; every bench still
caps at 2 at 2p). Two matching ripe casks is a reachable stand-off; three was fantasy. The
tile prints its own bench — no new rules text. Sweepable via `CATB="dark:2,…"`.

## §2 · Round 2 — the duel benches × the invitation float (2 arms × 200)

| Arm | Config | The question |
|---|---|---|
| `duel1` | duel benches (printed) · START_INV 1 | does the duel fix convene the hard pours at the printed float? |
| `duel2` | duel benches · START_INV 2 | is the extra seed ⚜ needed — and what does it cost the ports? |

*(the printed stars stay 5/5/7/6/7/9 — `hot`'s schedule is rejected on the Novgorod read)*

## §3 · Verdict — the game-night print ⚙
